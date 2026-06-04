import * as THREE from "three";
import { SoundEngine, type BlockSoundGroup } from "../audio/soundEngine.ts";
import { createDefaultBlockRegistry } from "../block/blockRegistry.ts";
import { AIR_STATE_ID, type StateId } from "../block/blockState.ts";
import { CHUNK_SIZE, WORLD_MIN_Y, worldToChunkCoord } from "../core/constants.ts";
import { DroppedItemWorld, type DroppedItem } from "../entity/droppedItem.ts";
import { HostileMobWorld, revealHostileMobByBell, type HostileMob, type HostileProjectile } from "../entity/hostileMob.ts";
import { PassiveMobWorld, type PassiveMob } from "../entity/passiveMob.ts";
import { alertVillageGuardByBell, VillageGuardWorld, type VillageGuard } from "../entity/villageGuard.ts";
import {
  addVillagerFood,
  addVillagerTradeXp,
  adjustVillagerReputation,
  alertVillagerByBell,
  canUseVillagerTrade,
  recordVillagerTrade,
  tradePriceMultiplierForReputation,
  VillagerWorld,
  villagerFoodCount,
  villagerXpForNextLevel,
  villagerTradeUsesRemaining,
  type VillagerTradeLevel,
  type Villager
} from "../entity/villager.ts";
import { OverworldGenerator } from "../generation/overworldGenerator.ts";
import { type ChunkMesh, meshFaceCount } from "../meshing/chunkMesher.ts";
import { PlayerPhysics } from "../physics/playerPhysics.ts";
import { deathMessage, type DeathCause } from "../player/deathMessage.ts";
import { PlayerInventory, type ArmorMetadata, type ArmorSlotName, type HotbarSlot } from "../player/inventory.ts";
import { SurvivalStats } from "../player/survivalStats.ts";
import { ChunkDeltaStore, createStoredChunkDeltas, type StoredChunkDeltas } from "../persistence/chunkDeltaStore.ts";
import { cloneHotbar, createChunkSaveV0, isWorldSaveV0, type ContainerSaveV0, type WorldSaveV0 } from "../persistence/saveFormat.ts";
import { LocalStorageAdapter } from "../persistence/storageAdapter.ts";
import { ChunkPipeline, meshKey } from "../pipeline/ChunkPipeline.ts";
import { chunkMeshToThree } from "../render/meshToThree.ts";
import { canSleepAtTime, DayNightCycle, type DayNightVisuals, wakeTimeAfterSleep } from "../world/dayNightCycle.ts";
import { applyFluidEdits, simulateFluids } from "../world/fluidSimulation.ts";
import { World } from "../world/World.ts";
import { voxelRaycast } from "../world/raycast.ts";
import { hydrateChunkDataTransfer, type ChunkDataTransfer } from "../worker/chunkDataTransfer.ts";
import "./styles.css";

if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => {
      // The game still runs online if the host blocks service workers.
    });
  });
}

type CombatParticle = {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  ageSeconds: number;
  lifetimeSeconds: number;
};

type LocalAabb = {
  minX: number;
  minY: number;
  minZ: number;
  maxX: number;
  maxY: number;
  maxZ: number;
};

type Vec3Like = {
  x: number;
  y: number;
  z: number;
};

type CraftingRecipe = {
  id: string;
  label: string;
  gridSize: 0 | 2 | 3;
  station?: CraftingMode;
  ingredients: { label: string; count: number }[];
  output: () => HotbarSlot;
};

type TradeRecipe = {
  id: string;
  villager: Villager["profession"];
  label: string;
  maxUses: number;
  requiredLevel: VillagerTradeLevel;
  xp: number;
  ingredients: { label: string; count: number }[];
  output: () => HotbarSlot;
};

type RecipeIngredient = {
  label: string;
  count: number;
};

type ChunkObjectBuildTask = {
  chunkX: number;
  chunkZ: number;
  mesh: ChunkMesh;
};

type MobileInputState = {
  forward: number;
  strafe: number;
  jump: boolean;
  sprint: boolean;
  movePointerId: number | null;
  moveCenterX: number;
  moveCenterY: number;
  lookPointerId: number | null;
  lookX: number;
  lookY: number;
};

type PerfSampleBuffer = {
  samples: Float32Array;
  index: number;
  count: number;
  last: number;
};

type CraftingMode = "player" | "workbench" | "furnace" | "chest" | "trade";
type EquippedArmor = Record<ArmorSlotName, ArmorMetadata | null>;
type DoorFacing = "north" | "south" | "east" | "west";
type ChunkMeshWorkerResponse =
  | {
      type: "chunkMeshed";
      id: string;
      chunkX: number;
      chunkZ: number;
      mesh: ChunkMesh;
      chunkData: ChunkDataTransfer;
    }
  | {
      type: "jobFailed";
      id: string;
      message: string;
    };

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) {
  throw new Error("missing app root");
}

const registry = createDefaultBlockRegistry();
const seed = "viewer-seed";
const world = new World({ seed, blockRegistry: registry });
const generator = new OverworldGenerator({ seed, registry });
const chunkDeltaStore = new ChunkDeltaStore();
const searchParams = new URLSearchParams(window.location.search);
const storage = new LocalStorageAdapter();
const storageKey = { worldId: `overworld:${seed}` };
const pipeline = new ChunkPipeline({
  world,
  generator: (chunk) => {
    generator.generateChunk(chunk, world);
    chunkDeltaStore.applyToChunk(chunk, registry);
  }
});

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x9cc7ec);
const dayNight = new DayNightCycle(searchParams.get("startNight") === "1" ? 13000 : 1000);
const sound = new SoundEngine();

const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1200);

const renderer = new THREE.WebGLRenderer({ antialias: true });
const maxPixelRatio = searchParams.get("highRes") === "1" ? 2 : 1.5;
renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxPixelRatio));
renderer.setSize(window.innerWidth, window.innerHeight);
app.appendChild(renderer.domElement);
app.addEventListener("pointerdown", () => sound.resumeFromGesture(), { capture: true });

const worldTint = document.createElement("div");
worldTint.className = "world-tint";
app.appendChild(worldTint);

const underwaterTint = document.createElement("div");
underwaterTint.className = "underwater-tint";
app.appendChild(underwaterTint);

const gameNotice = document.createElement("div");
gameNotice.className = "game-notice";
app.appendChild(gameNotice);
let gameNoticeTimeout: number | null = null;

const sunlight = new THREE.DirectionalLight(0xffffff, 1.8);
sunlight.position.set(30, 80, 20);
scene.add(sunlight);
const ambientLight = new THREE.AmbientLight(0x7f8fa6, 0.8);
scene.add(ambientLight);
const sceneBackgroundColor = scene.background instanceof THREE.Color ? scene.background : new THREE.Color(0x9cc7ec);
scene.background = sceneBackgroundColor;
const sunSprite = createCelestialSprite("sun");
const moonSprite = createCelestialSprite("moon");
scene.add(sunSprite, moonSprite);
const cameraDirection = new THREE.Vector3();
let currentDayNightVisuals: DayNightVisuals = dayNight.visuals();

const initialChunkRadius = 0;
const chunkRadius = 5;
const chunkDataKeepRadius = chunkRadius + 3;
const maxChunkStagesPerFrame = 1;
const generatedChunks = pipeline.ensureAreaFull(-initialChunkRadius, initialChunkRadius, -initialChunkRadius, initialChunkRadius);
const chunkObjects = new Map<string, THREE.Group>();
const chunkLoadQueue = new Map<string, { chunkX: number; chunkZ: number }>();
const chunkMeshJobs = new Map<string, string>();
const chunkMeshJobStartedAt = new Map<string, number>();
const chunkMeshJobWorkerIndex = new Map<string, number>();
const chunkRemeshRequests = new Set<string>();
const completedChunkMeshes = new Map<string, ChunkMesh>();
const chunkObjectBuildQueue = new Map<string, ChunkObjectBuildTask>();
const chunkFaceCounts = new Map<string, number>();
const chunkSectionCounts = new Map<string, number>();
const fluidMaterials = new Set<THREE.MeshBasicMaterial>();
let nextChunkMeshJobId = 1;
const chunkMeshWorkers = createChunkMeshWorkers();
const chunkMeshWorkerLoads = new Array(chunkMeshWorkers.length).fill(0);
let nextChunkMeshWorkerIndex = 0;
const droppedItems = new DroppedItemWorld();
const droppedItemObjects = new Map<number, THREE.Group>();
const hostileMobs = new HostileMobWorld();
const hostileMobObjects = new Map<number, THREE.Group>();
const hostileProjectileObjects = new Map<number, THREE.Group>();
const passiveMobs = new PassiveMobWorld();
const passiveMobObjects = new Map<number, THREE.Group>();
const villagers = new VillagerWorld();
const villagerObjects = new Map<number, THREE.Group>();
const villageGuards = new VillageGuardWorld();
const villageGuardObjects = new Map<number, THREE.Group>();
const combatParticles: CombatParticle[] = [];
let totalFaces = 0;
let visibleSectionMeshes = 0;
let villagerSpawnScanSeconds = 0;
const scannedVillageChunkKeys = new Set<string>();
const VILLAGER_VISUAL_Y_OFFSET = 0.035;
const frameTimeStats = createPerfBuffer(180);
const longFrameTimeStats = createPerfBuffer(900);
const chunkObjectBuildStats = createPerfBuffer(80);
const workerMeshLatencyStats = createPerfBuffer(80);
const chunkQueueStats = createPerfBuffer(180);
const terrainPreloadStats = createPerfBuffer(180);
const physicsStats = createPerfBuffer(180);
const fluidStats = createPerfBuffer(80);
const mobStats = createPerfBuffer(120);
const renderStats = createPerfBuffer(180);
const longAnimationFrameStats = createPerfBuffer(120);
let latestPerfSnapshot: Record<string, unknown> = {};
(window as unknown as { __pinecraftPerf?: () => Record<string, unknown> }).__pinecraftPerf = () => latestPerfSnapshot;
installLongAnimationFrameObserver();
for (const result of generatedChunks) {
  if (!result.mesh) {
    continue;
  }
  addOrReplaceChunkObject(result.chunk.chunkX, result.chunk.chunkZ, result.mesh);
}
recalculateTotalFaces();

const initialSpawn = findOpenSpawn();
let spawn = { ...initialSpawn };
const player = new PlayerPhysics(spawn);
const survival = new SurvivalStats();
let loadedCenterChunkX = worldToChunkCoord(Math.floor(player.state.position.x));
let loadedCenterChunkZ = worldToChunkCoord(Math.floor(player.state.position.z));
let smoothedEyeY = player.eyePosition().y;
let fallPeakY = player.state.position.y;
let yaw = yawForDirection(dayNight.visuals().sunDirection);
let pitch = pitchForDirection(dayNight.visuals().sunDirection);
updateLoadedChunksAroundPlayer(true);
let lastFrameTime = performance.now();
let wasJumpPressed = false;
let gameOver = false;
let gameStarted = false;
let hasEnteredWorld = false;
let pauseOpen = false;
let pointerLockWasActive = false;
let suppressPauseOnPointerUnlock = false;
let saveStatusTimeout: number | null = null;
const keys = new Set<string>();
let selectedBlock: ReturnType<typeof voxelRaycast> = null;
let footstepTimer = 0;
let fluidTickAccumulator = 0;
let cropTickAccumulator = 0;
let farmerWorkAccumulator = 0;
let nextFarmerWorkIndex = 0;
let collisionPreloadAccumulator = 0;
let lastCollisionPreloadKey = "";
let hudUpdateAccumulator = 0;
const HOTBAR_SIZE = 9;
const INVENTORY_SIZE = 36;
const CHEST_SIZE = 27;
const BELL_ALERT_RADIUS = 34;
const BELL_GUARD_ALERT_RADIUS = 48;
const BELL_HOSTILE_REVEAL_RADIUS = 48;
const FARMER_WORK_INTERVAL_SECONDS = 0.55;
const FARMER_WORK_SEARCH_RADIUS = 12;
const FARMER_WORK_ACTION_RANGE = 2.45;
const inventory = new PlayerInventory(createDefaultHotbar(), 0);
const containers = new Map<string, HotbarSlot[]>();
let activeContainerKey: string | null = null;
let activeTradingVillagerId: number | null = null;
const villagerOpenedDoorTimers = new Map<string, number>();
const equippedArmor: EquippedArmor = {
  helmet: null,
  chestplate: null,
  leggings: null,
  boots: null
};
const craftingRecipes: CraftingRecipe[] = [
  {
    id: "planks",
    label: "木材 x4",
    gridSize: 2,
    ingredients: [
      { label: "log", count: 1 }
    ],
    output: () => hotbarSlot("planks", registry.resolveState("planks"), 4)
  },
  {
    id: "stick",
    label: "棒 x4",
    gridSize: 2,
    ingredients: [
      { label: "planks", count: 2 }
    ],
    output: () => itemSlot("stick", 4)
  },
  {
    id: "crafting_table",
    label: "作業台",
    gridSize: 2,
    ingredients: [
      { label: "planks", count: 4 }
    ],
    output: () => hotbarSlot("crafting_table", registry.resolveState("crafting_table"), 1)
  },
  {
    id: "wood_sword",
    label: "木の剣",
    gridSize: 3,
    ingredients: [
      { label: "planks", count: 2 },
      { label: "stick", count: 1 }
    ],
    output: () => toolSlot("wood_sword", "sword", "wood", 5, 1, 59)
  },
  {
    id: "wood_pickaxe",
    label: "木のツルハシ",
    gridSize: 3,
    ingredients: [
      { label: "planks", count: 3 },
      { label: "stick", count: 2 }
    ],
    output: () => toolSlot("wood_pickaxe", "pickaxe", "wood", 3, 2.0, 59)
  },
  {
    id: "wood_axe",
    label: "木の斧",
    gridSize: 3,
    ingredients: [
      { label: "planks", count: 3 },
      { label: "stick", count: 2 }
    ],
    output: () => toolSlot("wood_axe", "axe", "wood", 6, 2.2, 59)
  },
  {
    id: "wood_shovel",
    label: "木のシャベル",
    gridSize: 3,
    ingredients: [
      { label: "planks", count: 1 },
      { label: "stick", count: 2 }
    ],
    output: () => toolSlot("wood_shovel", "shovel", "wood", 4, 1.8, 59)
  },
  {
    id: "wood_hoe",
    label: "木のクワ",
    gridSize: 3,
    ingredients: [
      { label: "planks", count: 2 },
      { label: "stick", count: 2 }
    ],
    output: () => toolSlot("wood_hoe", "hoe", "wood", 2, 1.4, 59)
  },
  {
    id: "stone_sword",
    label: "石の剣",
    gridSize: 3,
    ingredients: [
      { label: "stone", count: 2 },
      { label: "stick", count: 1 }
    ],
    output: () => toolSlot("stone_sword", "sword", "stone", 7, 1, 131)
  },
  {
    id: "stone_pickaxe",
    label: "石のツルハシ",
    gridSize: 3,
    ingredients: [
      { label: "stone", count: 3 },
      { label: "stick", count: 2 }
    ],
    output: () => toolSlot("stone_pickaxe", "pickaxe", "stone", 5, 3.2, 131)
  },
  {
    id: "stone_axe",
    label: "石の斧",
    gridSize: 3,
    ingredients: [
      { label: "stone", count: 3 },
      { label: "stick", count: 2 }
    ],
    output: () => toolSlot("stone_axe", "axe", "stone", 8, 3.8, 131)
  },
  {
    id: "stone_shovel",
    label: "石のシャベル",
    gridSize: 3,
    ingredients: [
      { label: "stone", count: 1 },
      { label: "stick", count: 2 }
    ],
    output: () => toolSlot("stone_shovel", "shovel", "stone", 5, 3.0, 131)
  },
  {
    id: "stone_hoe",
    label: "石のクワ",
    gridSize: 3,
    ingredients: [
      { label: "stone", count: 2 },
      { label: "stick", count: 2 }
    ],
    output: () => toolSlot("stone_hoe", "hoe", "stone", 3, 2.2, 131)
  },
  {
    id: "furnace",
    label: "かまど",
    gridSize: 3,
    ingredients: [
      { label: "cobblestone", count: 8 }
    ],
    output: () => hotbarSlot("furnace", registry.resolveState("furnace"), 1)
  },
  {
    id: "chest",
    label: "チェスト",
    gridSize: 3,
    ingredients: [
      { label: "planks", count: 8 }
    ],
    output: () => hotbarSlot("chest", registry.resolveState("chest"), 1)
  },
  {
    id: "door",
    label: "ドア x3",
    gridSize: 3,
    ingredients: [
      { label: "planks", count: 6 }
    ],
    output: () => hotbarSlot("door", registry.resolveState("door"), 3)
  },
  {
    id: "bread",
    label: "パン",
    gridSize: 3,
    ingredients: [
      { label: "wheat", count: 3 }
    ],
    output: () => foodSlot("bread", 1, 5, 0.6)
  },
  {
    id: "torch",
    label: "松明 x4",
    gridSize: 3,
    ingredients: [
      { label: "coal", count: 1 },
      { label: "stick", count: 1 }
    ],
    output: () => hotbarSlot("torch", registry.resolveState("torch"), 4)
  },
  {
    id: "iron_ingot",
    label: "鉄インゴット",
    gridSize: 0,
    station: "furnace",
    ingredients: [
      { label: "raw_iron", count: 1 },
      { label: "coal", count: 1 }
    ],
    output: () => itemSlot("iron_ingot", 1)
  },
  {
    id: "gold_ingot",
    label: "金インゴット",
    gridSize: 0,
    station: "furnace",
    ingredients: [
      { label: "raw_gold", count: 1 },
      { label: "coal", count: 1 }
    ],
    output: () => itemSlot("gold_ingot", 1)
  },
  {
    id: "cooked_beef",
    label: "ステーキ",
    gridSize: 0,
    station: "furnace",
    ingredients: [
      { label: "raw_beef", count: 1 },
      { label: "coal", count: 1 }
    ],
    output: () => foodSlot("cooked_beef", 1, 8, 0.8)
  },
  {
    id: "cooked_porkchop",
    label: "焼き豚",
    gridSize: 0,
    station: "furnace",
    ingredients: [
      { label: "raw_porkchop", count: 1 },
      { label: "coal", count: 1 }
    ],
    output: () => foodSlot("cooked_porkchop", 1, 8, 0.8)
  },
  {
    id: "iron_sword",
    label: "鉄の剣",
    gridSize: 3,
    ingredients: [
      { label: "iron_ingot", count: 2 },
      { label: "stick", count: 1 }
    ],
    output: () => toolSlot("iron_sword", "sword", "iron", 9, 1, 250)
  },
  {
    id: "iron_pickaxe",
    label: "鉄のツルハシ",
    gridSize: 3,
    ingredients: [
      { label: "iron_ingot", count: 3 },
      { label: "stick", count: 2 }
    ],
    output: () => toolSlot("iron_pickaxe", "pickaxe", "iron", 6, 5.2, 250)
  },
  {
    id: "iron_axe",
    label: "鉄の斧",
    gridSize: 3,
    ingredients: [
      { label: "iron_ingot", count: 3 },
      { label: "stick", count: 2 }
    ],
    output: () => toolSlot("iron_axe", "axe", "iron", 9, 5.5, 250)
  },
  {
    id: "iron_shovel",
    label: "鉄のシャベル",
    gridSize: 3,
    ingredients: [
      { label: "iron_ingot", count: 1 },
      { label: "stick", count: 2 }
    ],
    output: () => toolSlot("iron_shovel", "shovel", "iron", 6, 4.6, 250)
  },
  {
    id: "iron_hoe",
    label: "鉄のクワ",
    gridSize: 3,
    ingredients: [
      { label: "iron_ingot", count: 2 },
      { label: "stick", count: 2 }
    ],
    output: () => toolSlot("iron_hoe", "hoe", "iron", 4, 3.2, 250)
  },
  {
    id: "iron_helmet",
    label: "鉄のヘルメット",
    gridSize: 3,
    ingredients: [
      { label: "iron_ingot", count: 5 }
    ],
    output: () => armorSlot("iron_helmet", "helmet", 2, 165)
  },
  {
    id: "iron_chestplate",
    label: "鉄のチェストプレート",
    gridSize: 3,
    ingredients: [
      { label: "iron_ingot", count: 8 }
    ],
    output: () => armorSlot("iron_chestplate", "chestplate", 6, 240)
  },
  {
    id: "iron_leggings",
    label: "鉄のレギンス",
    gridSize: 3,
    ingredients: [
      { label: "iron_ingot", count: 7 }
    ],
    output: () => armorSlot("iron_leggings", "leggings", 5, 225)
  },
  {
    id: "iron_boots",
    label: "鉄のブーツ",
    gridSize: 3,
    ingredients: [
      { label: "iron_ingot", count: 4 }
    ],
    output: () => armorSlot("iron_boots", "boots", 2, 195)
  }
];

const tradeRecipes: TradeRecipe[] = [
  {
    id: "farmer_apple",
    villager: "farmer",
    label: "リンゴ x3",
    maxUses: 8,
    requiredLevel: 1,
    xp: 2,
    ingredients: [
      { label: "emerald", count: 1 }
    ],
    output: () => foodSlot("apple", 3, 4, 0.3)
  },
  {
    id: "farmer_emerald_for_logs",
    villager: "farmer",
    label: "エメラルド",
    maxUses: 6,
    requiredLevel: 1,
    xp: 3,
    ingredients: [
      { label: "log", count: 12 }
    ],
    output: () => itemSlot("emerald", 1)
  },
  {
    id: "librarian_torches",
    villager: "librarian",
    label: "松明 x12",
    maxUses: 8,
    requiredLevel: 1,
    xp: 2,
    ingredients: [
      { label: "emerald", count: 1 },
      { label: "coal", count: 1 }
    ],
    output: () => hotbarSlot("torch", registry.resolveState("torch"), 12)
  },
  {
    id: "librarian_emerald_for_coal",
    villager: "librarian",
    label: "エメラルド",
    maxUses: 6,
    requiredLevel: 1,
    xp: 3,
    ingredients: [
      { label: "coal", count: 10 }
    ],
    output: () => itemSlot("emerald", 1)
  },
  {
    id: "mason_emerald_for_cobble",
    villager: "mason",
    label: "エメラルド",
    maxUses: 6,
    requiredLevel: 1,
    xp: 3,
    ingredients: [
      { label: "cobblestone", count: 18 }
    ],
    output: () => itemSlot("emerald", 1)
  },
  {
    id: "mason_stone_bundle",
    villager: "mason",
    label: "石 x24",
    maxUses: 8,
    requiredLevel: 1,
    xp: 2,
    ingredients: [
      { label: "emerald", count: 1 }
    ],
    output: () => hotbarSlot("stone", registry.resolveState("stone"), 24)
  },
  {
    id: "farmer_bread",
    villager: "farmer",
    label: "パン x4",
    maxUses: 6,
    requiredLevel: 2,
    xp: 5,
    ingredients: [
      { label: "emerald", count: 1 },
      { label: "wheat", count: 3 }
    ],
    output: () => foodSlot("bread", 4, 5, 0.6)
  },
  {
    id: "librarian_lamp",
    villager: "librarian",
    label: "ランプ",
    maxUses: 5,
    requiredLevel: 2,
    xp: 6,
    ingredients: [
      { label: "emerald", count: 2 },
      { label: "coal", count: 2 }
    ],
    output: () => hotbarSlot("lamp", registry.resolveState("lamp"), 1)
  },
  {
    id: "mason_stonecutter",
    villager: "mason",
    label: "石切台",
    maxUses: 4,
    requiredLevel: 2,
    xp: 6,
    ingredients: [
      { label: "emerald", count: 2 },
      { label: "cobblestone", count: 8 }
    ],
    output: () => hotbarSlot("stonecutter", registry.resolveState("stonecutter"), 1)
  }
];
let isMining = false;
let miningTargetKey: string | null = null;
let miningProgress = 0;
let miningSoundTimer = 0;
let attackCooldownSeconds = 0;
let craftingOpen = false;
let craftingMode: CraftingMode = "player";

const highlight = new THREE.LineSegments(
  new THREE.EdgesGeometry(new THREE.BoxGeometry(1.02, 1.02, 1.02)),
  new THREE.LineBasicMaterial({ color: 0xf4f7ff, linewidth: 2 })
);
highlight.visible = false;
scene.add(highlight);

const miningOverlayMaterial = new THREE.LineBasicMaterial({
  color: 0x101010,
  transparent: true,
  opacity: 0
});
const miningOverlay = new THREE.LineSegments(
  new THREE.EdgesGeometry(new THREE.BoxGeometry(1.06, 1.06, 1.06)),
  miningOverlayMaterial
);
miningOverlay.visible = false;
scene.add(miningOverlay);

const debugGridEnabled = searchParams.get("debugGrid") === "1";
if (debugGridEnabled) {
  const grid = new THREE.GridHelper(64, 64, 0x2e3440, 0x74808a);
  grid.position.set(8, 63.01, 8);
  scene.add(grid);
}

const hud = document.createElement("div");
hud.className = "hud";
hud.textContent = `Phase 1 terrain | seed: ${seed} | chunks: ${generatedChunks.length} | faces: ${totalFaces}${
  debugGridEnabled ? " | debug grid" : ""
}`;
app.appendChild(hud);

const crosshair = document.createElement("div");
crosshair.className = "crosshair";
app.appendChild(crosshair);

const miningBar = document.createElement("div");
miningBar.className = "mining-bar";
miningBar.innerHTML = `<div class="mining-bar-fill"></div>`;
app.appendChild(miningBar);

const damageFlash = document.createElement("div");
damageFlash.className = "damage-flash";
app.appendChild(damageFlash);

const eatEffect = document.createElement("div");
eatEffect.className = "eat-effect";
eatEffect.textContent = "+";
app.appendChild(eatEffect);

const attackSwipe = document.createElement("div");
attackSwipe.className = "attack-swipe";
app.appendChild(attackSwipe);

const heldItem = document.createElement("div");
heldItem.className = "held-item";
heldItem.innerHTML = `<div class="held-arm"></div><div class="held-item-icon"></div>`;
app.appendChild(heldItem);

const survivalHud = document.createElement("div");
survivalHud.className = "survival-hud";
survivalHud.innerHTML = `<div class="air"></div><div class="armor"></div><div class="hearts"></div><div class="hunger"></div>`;
app.appendChild(survivalHud);
const survivalAir = survivalHud.querySelector<HTMLElement>(".air");
const survivalArmor = survivalHud.querySelector<HTMLElement>(".armor");
const survivalHearts = survivalHud.querySelector<HTMLElement>(".hearts");
const survivalHunger = survivalHud.querySelector<HTMLElement>(".hunger");
let lastAirHtml = "";
let lastArmorHtml = "";
let lastHeartsHtml = "";
let lastHungerHtml = "";
let lastAirVisible = false;
let lastAirTicksValue = -1;
let lastArmorValue = -1;
let lastHealthValue = -1;
let lastFoodLevelValue = -1;
const mobileInput: MobileInputState = {
  forward: 0,
  strafe: 0,
  jump: false,
  sprint: false,
  movePointerId: null,
  moveCenterX: 0,
  moveCenterY: 0,
  lookPointerId: null,
  lookX: 0,
  lookY: 0
};
const mobileCapable = navigator.maxTouchPoints > 0 || window.matchMedia("(pointer: coarse)").matches;
let lastTouchInputAt = 0;
updateSurvivalHud();

const gameOverOverlay = document.createElement("div");
gameOverOverlay.className = "game-over";
gameOverOverlay.innerHTML = `
  <div class="game-over-panel">
    <h1>Game Over</h1>
    <p class="game-over-message">力尽きました</p>
    <button type="button">Respawn</button>
  </div>
`;
const gameOverMessage = gameOverOverlay.querySelector<HTMLParagraphElement>(".game-over-message");
const respawnButton = gameOverOverlay.querySelector<HTMLButtonElement>("button");
respawnButton?.addEventListener("click", () => respawnPlayer());
app.appendChild(gameOverOverlay);

const pauseOverlay = document.createElement("div");
pauseOverlay.className = "pause-menu";
pauseOverlay.innerHTML = `
  <div class="pause-panel">
    <h2>Game Menu</h2>
    <button type="button" data-action="resume">ゲームに戻る</button>
    <button type="button" data-action="save">保存</button>
    <button type="button" data-action="export">保存データを書き出す</button>
    <button type="button" data-action="import">保存データを読み込む</button>
    <button type="button" data-action="save-title">保存してタイトルへ</button>
    <button type="button" data-action="title">タイトルへ戻る</button>
    <p>Esc で閉じる</p>
  </div>
`;
pauseOverlay.querySelector<HTMLButtonElement>('[data-action="resume"]')?.addEventListener("click", () => closePauseMenu());
pauseOverlay.querySelector<HTMLButtonElement>('[data-action="save"]')?.addEventListener("click", () => void saveGame());
pauseOverlay.querySelector<HTMLButtonElement>('[data-action="export"]')?.addEventListener("click", () => void exportSave());
pauseOverlay.querySelector<HTMLButtonElement>('[data-action="import"]')?.addEventListener("click", () => openSaveImportPicker());
pauseOverlay.querySelector<HTMLButtonElement>('[data-action="save-title"]')?.addEventListener("click", () => void saveAndReturnToTitle());
pauseOverlay.querySelector<HTMLButtonElement>('[data-action="title"]')?.addEventListener("click", () => void returnToTitleScreen("タイトルへ戻りました"));
app.appendChild(pauseOverlay);

const titleScreen = document.createElement("div");
titleScreen.className = "title-screen visible";
titleScreen.innerHTML = `
  <canvas class="title-panorama" width="768" height="432" aria-hidden="true"></canvas>
  <div class="title-vignette"></div>
  <div class="title-content">
    <div class="title-logo" aria-label="PINECRAFT">
      <span>PINECRAFT</span>
    </div>
    <div class="title-splash">Needles included!</div>
    <div class="title-menu">
      <button type="button" data-action="continue">続きから</button>
      <button type="button" data-action="new">新しく始める</button>
      <button type="button" data-action="import">保存データを取り込む</button>
      <button type="button" data-action="delete">保存データを削除</button>
    </div>
    <div class="title-submenu">
      <span>WASD 移動</span>
      <span>Mouse 視点</span>
      <span>F5 保存</span>
      <span>F9 読込</span>
    </div>
  </div>
  <div class="title-footer">
    <span>Voxel Survival Prototype</span>
    <span>Java Edition inspired systems</span>
  </div>
`;
const titleContinueButton = titleScreen.querySelector<HTMLButtonElement>('[data-action="continue"]');
const titleNewButton = titleScreen.querySelector<HTMLButtonElement>('[data-action="new"]');
const titleImportButton = titleScreen.querySelector<HTMLButtonElement>('[data-action="import"]');
const titleDeleteButton = titleScreen.querySelector<HTMLButtonElement>('[data-action="delete"]');
titleContinueButton?.addEventListener("click", () => void continueFromTitle());
titleNewButton?.addEventListener("click", () => startNewWorldFromTitle());
titleImportButton?.addEventListener("click", () => openSaveImportPicker());
titleDeleteButton?.addEventListener("click", () => void deleteSave({ refreshTitle: true }));
app.appendChild(titleScreen);
const titlePanoramaCanvas = titleScreen.querySelector<HTMLCanvasElement>(".title-panorama");
if (titlePanoramaCanvas) {
  renderTitlePanoramaFromWorld(titlePanoramaCanvas);
}

const hotbarElement = document.createElement("div");
hotbarElement.className = "hotbar";
const hotbarSlots = Array.from({ length: HOTBAR_SIZE }, (_, index) => {
  const slot = document.createElement("button");
  slot.className = "hotbar-slot";
  slot.type = "button";
  slot.title = inventory.slots[index]?.label ?? "empty";
  slot.innerHTML = `<span class="hotbar-key">${index + 1}</span><span class="hotbar-item"></span><span class="hotbar-count"></span>`;
  slot.addEventListener("click", () => {
    if (!gameStarted) {
      return;
    }
    selectHotbarSlot(index);
    requestPointerLockSafe();
  });
  hotbarElement.appendChild(slot);
  return slot;
});
app.appendChild(hotbarElement);

const craftingPanel = document.createElement("div");
craftingPanel.className = "crafting-panel";
app.appendChild(craftingPanel);
updateHotbar();
updateCraftingPanel();

const controlsHelp = document.createElement("div");
controlsHelp.className = "controls-help";
controlsHelp.innerHTML = [
  "<strong>操作</strong>",
  "WASD 移動",
  "Mouse 視点",
  "左長押し 採掘",
  "右クリック 設置/食べる/装備",
  "村人 右クリック 取引",
  "左クリック 敵を攻撃",
  "1-9 スロット選択",
  "E/I インベントリ",
  "取引画面 Esc/×で閉じる",
  "作業台 右クリック",
  "Space ジャンプ",
  "Shift ダッシュ",
  "スマホ 左スティック移動",
  "スマホ 右側ドラッグ視点",
  "スマホ A/B 採掘/設置",
  "N 夜にする",
  "F5 保存",
  "F9 読込",
  "Esc メニュー"
].map((line) => `<div>${line}</div>`).join("");
app.appendChild(controlsHelp);

const mobileControls = createMobileControls();
app.appendChild(mobileControls);

const savePanel = document.createElement("div");
savePanel.className = "save-panel";
savePanel.innerHTML = `
  <button type="button" data-action="save">Save</button>
  <button type="button" data-action="load">Load</button>
  <button type="button" data-action="export">Export</button>
  <button type="button" data-action="import">Import</button>
  <button type="button" data-action="delete">Reset Save</button>
  <span class="save-status">未保存</span>
`;
const saveStatus = savePanel.querySelector<HTMLElement>(".save-status");
savePanel.querySelector<HTMLButtonElement>('[data-action="save"]')?.addEventListener("click", () => void saveGame());
savePanel.querySelector<HTMLButtonElement>('[data-action="load"]')?.addEventListener("click", () => void loadGame());
savePanel.querySelector<HTMLButtonElement>('[data-action="export"]')?.addEventListener("click", () => void exportSave());
savePanel.querySelector<HTMLButtonElement>('[data-action="import"]')?.addEventListener("click", () => openSaveImportPicker());
savePanel.querySelector<HTMLButtonElement>('[data-action="delete"]')?.addEventListener("click", () => void deleteSave());
app.appendChild(savePanel);

const saveImportInput = document.createElement("input");
saveImportInput.type = "file";
saveImportInput.accept = "application/json,.json";
saveImportInput.className = "save-import-input";
saveImportInput.addEventListener("change", () => void importSelectedSaveFile());
app.appendChild(saveImportInput);

window.addEventListener("keydown", (event) => {
  sound.resumeFromGesture();
  if (!gameStarted) {
    if (event.code === "Enter" || event.code === "NumpadEnter") {
      event.preventDefault();
      if (titleContinueButton && !titleContinueButton.disabled) {
        void continueFromTitle();
      } else {
        startNewWorldFromTitle();
      }
    }
    return;
  }
  if (event.code === "Escape") {
    event.preventDefault();
    if (craftingOpen) {
      closeCraftingPanel({ requestPointerLock: true });
      return;
    }
    if (pauseOpen) {
      closePauseMenu();
    } else if (!gameOver) {
      openPauseMenu();
    }
    return;
  }
  if (event.code === "F5") {
    event.preventDefault();
    void saveGame();
    return;
  }
  if (event.code === "F9") {
    event.preventDefault();
    void loadGame();
    return;
  }
  if (gameOver) {
    return;
  }
  const digit = digitKeyToIndex(event.code);
  if (digit !== null && digit < HOTBAR_SIZE) {
    selectHotbarSlot(digit);
  }
  if (event.code === "KeyN") {
    dayNight.timeOfDay = 13000;
  }
  if (event.code === "KeyE" || event.code === "KeyI") {
    event.preventDefault();
    toggleCraftingPanel();
    return;
  }
  keys.add(event.code);
  if (event.code === "Space") {
    event.preventDefault();
  }
});

window.addEventListener("keyup", (event) => {
  keys.delete(event.code);
});

renderer.domElement.addEventListener("click", () => {
  sound.resumeFromGesture();
  if (shouldIgnoreSyntheticMouse()) {
    return;
  }
  if (!gameStarted) {
    return;
  }
  if (pauseOpen) {
    return;
  }
  if (gameOver) {
    return;
  }
  requestPointerLockSafe();
});

renderer.domElement.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

renderer.domElement.addEventListener("mousedown", (event) => {
  sound.resumeFromGesture();
  if (shouldIgnoreSyntheticMouse()) {
    return;
  }
  if (!gameStarted) {
    return;
  }
  if (pauseOpen) {
    return;
  }
  if (gameOver) {
    return;
  }
  if (document.pointerLockElement !== renderer.domElement) {
    requestPointerLockSafe();
    return;
  }
  if (event.button === 0) {
    handlePrimaryActionStart();
    return;
  }
  if (event.button === 2) {
    handleSecondaryAction();
  }
});

window.addEventListener("mouseup", (event) => {
  if (event.button === 0) {
    cancelMining();
  }
});

document.addEventListener("pointerlockchange", () => {
  const locked = document.pointerLockElement === renderer.domElement;
  if (!locked) {
    cancelMining();
    if (pointerLockWasActive && gameStarted && !gameOver && !craftingOpen && !pauseOpen) {
      if (suppressPauseOnPointerUnlock) {
        suppressPauseOnPointerUnlock = false;
      } else {
        openPauseMenu({ pointerAlreadyReleased: true });
      }
    }
  }
  pointerLockWasActive = locked;
});

window.addEventListener("mousemove", (event) => {
  if (!gameStarted) {
    return;
  }
  if (pauseOpen) {
    return;
  }
  if (gameOver) {
    return;
  }
  if (document.pointerLockElement !== renderer.domElement) {
    return;
  }
  yaw -= event.movementX * 0.0022;
  pitch -= event.movementY * 0.0022;
  pitch = Math.max(-Math.PI / 2 + 0.01, Math.min(Math.PI / 2 - 0.01, pitch));
});

renderer.domElement.addEventListener("pointerdown", (event) => {
  if (!isTouchPointer(event) || event.target !== renderer.domElement || !gameStarted || pauseOpen || gameOver) {
    return;
  }
  markTouchInput();
  mobileInput.lookPointerId = event.pointerId;
  mobileInput.lookX = event.clientX;
  mobileInput.lookY = event.clientY;
  renderer.domElement.setPointerCapture(event.pointerId);
});

renderer.domElement.addEventListener("pointermove", (event) => {
  if (!isTouchPointer(event) || mobileInput.lookPointerId !== event.pointerId || pauseOpen || gameOver) {
    return;
  }
  markTouchInput();
  const deltaX = event.clientX - mobileInput.lookX;
  const deltaY = event.clientY - mobileInput.lookY;
  mobileInput.lookX = event.clientX;
  mobileInput.lookY = event.clientY;
  yaw -= deltaX * 0.0042;
  pitch -= deltaY * 0.0042;
  pitch = Math.max(-Math.PI / 2 + 0.01, Math.min(Math.PI / 2 - 0.01, pitch));
});

renderer.domElement.addEventListener("pointerup", (event) => {
  if (mobileInput.lookPointerId === event.pointerId) {
    mobileInput.lookPointerId = null;
  }
});

renderer.domElement.addEventListener("pointercancel", (event) => {
  if (mobileInput.lookPointerId === event.pointerId) {
    mobileInput.lookPointerId = null;
  }
});

function requestPointerLockSafe(): void {
  const result = renderer.domElement.requestPointerLock() as Promise<void> | void;
  result?.catch(() => {
    // Embedded preview surfaces can deny pointer lock; keyboard and HUD still work.
  });
}

function exitPointerLockSafe(): void {
  const result = document.exitPointerLock() as Promise<void> | void;
  result?.catch(() => {
    // Ignore races where the browser has already released pointer lock.
  });
}

function releasePointerLockForUi(): void {
  if (document.pointerLockElement !== renderer.domElement) {
    return;
  }
  suppressPauseOnPointerUnlock = true;
  exitPointerLockSafe();
}

function createMobileControls(): HTMLElement {
  const controls = document.createElement("div");
  controls.className = "mobile-controls";
  controls.innerHTML = `
    <div class="mobile-joystick" data-mobile-control="move" aria-label="移動">
      <div class="mobile-joystick-knob"></div>
    </div>
    <div class="mobile-buttons" data-mobile-control="buttons">
      <button type="button" class="mobile-button small" data-action="pause" aria-label="メニュー">☰</button>
      <button type="button" class="mobile-button small" data-action="craft" aria-label="クラフト">E</button>
      <button type="button" class="mobile-button" data-action="sprint" aria-label="ダッシュ">RUN</button>
      <button type="button" class="mobile-button" data-action="jump" aria-label="ジャンプ">JMP</button>
      <button type="button" class="mobile-button primary" data-action="attack" aria-label="攻撃と採掘">A</button>
      <button type="button" class="mobile-button secondary" data-action="place" aria-label="設置と食べる">B</button>
    </div>
  `;

  const joystick = controls.querySelector<HTMLElement>(".mobile-joystick");
  const knob = controls.querySelector<HTMLElement>(".mobile-joystick-knob");
  joystick?.addEventListener("pointerdown", (event) => {
    if (!isTouchPointer(event) && event.pointerType !== "mouse") {
      return;
    }
    markTouchInput();
    event.preventDefault();
    mobileInput.movePointerId = event.pointerId;
    const bounds = joystick.getBoundingClientRect();
    mobileInput.moveCenterX = bounds.left + bounds.width / 2;
    mobileInput.moveCenterY = bounds.top + bounds.height / 2;
    joystick.setPointerCapture(event.pointerId);
    updateMobileMove(event.clientX, event.clientY, knob);
  });
  joystick?.addEventListener("pointermove", (event) => {
    if (mobileInput.movePointerId !== event.pointerId) {
      return;
    }
    markTouchInput();
    event.preventDefault();
    updateMobileMove(event.clientX, event.clientY, knob);
  });
  const stopMove = (event: PointerEvent) => {
    if (mobileInput.movePointerId !== event.pointerId) {
      return;
    }
    markTouchInput();
    mobileInput.movePointerId = null;
    mobileInput.forward = 0;
    mobileInput.strafe = 0;
    if (knob) {
      knob.style.transform = "translate(-50%, -50%)";
    }
  };
  joystick?.addEventListener("pointerup", stopMove);
  joystick?.addEventListener("pointercancel", stopMove);

  bindMobileButton(controls, "attack", {
    down: handlePrimaryActionStart,
    up: handlePrimaryActionEnd
  });
  bindMobileButton(controls, "place", { down: handleSecondaryAction });
  bindMobileButton(controls, "jump", {
    down: () => {
      mobileInput.jump = true;
    },
    up: () => {
      mobileInput.jump = false;
    }
  });
  bindMobileButton(controls, "sprint", {
    down: () => {
      mobileInput.sprint = true;
    },
    up: () => {
      mobileInput.sprint = false;
    }
  });
  bindMobileButton(controls, "craft", { down: toggleCraftingPanel });
  bindMobileButton(controls, "pause", {
    down: () => {
      if (pauseOpen) {
        closePauseMenu();
      } else if (gameStarted && !gameOver) {
        openPauseMenu({ pointerAlreadyReleased: true });
      }
    }
  });

  controls.classList.toggle("enabled", mobileCapable);
  return controls;
}

function bindMobileButton(
  root: HTMLElement,
  action: string,
  handlers: { down?: () => void; up?: () => void }
): void {
  const button = root.querySelector<HTMLButtonElement>(`[data-action="${action}"]`);
  if (!button) {
    return;
  }
  button.addEventListener("pointerdown", (event) => {
    markTouchInput();
    event.preventDefault();
    button.setPointerCapture(event.pointerId);
    button.classList.add("pressed");
    handlers.down?.();
  });
  const release = (event: PointerEvent) => {
    markTouchInput();
    event.preventDefault();
    button.classList.remove("pressed");
    handlers.up?.();
  };
  button.addEventListener("pointerup", release);
  button.addEventListener("pointercancel", release);
}

function updateMobileMove(clientX: number, clientY: number, knob: HTMLElement | null): void {
  const radius = 54;
  const deltaX = clientX - mobileInput.moveCenterX;
  const deltaY = clientY - mobileInput.moveCenterY;
  const distance = Math.min(radius, Math.hypot(deltaX, deltaY));
  const angle = Math.atan2(deltaY, deltaX);
  const x = Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance;
  const normalizedX = Math.abs(x) < 8 ? 0 : x / radius;
  const normalizedY = Math.abs(y) < 8 ? 0 : y / radius;
  mobileInput.strafe = normalizedX;
  mobileInput.forward = -normalizedY;
  if (knob) {
    knob.style.transform = `translate(calc(-50% + ${x.toFixed(1)}px), calc(-50% + ${y.toFixed(1)}px))`;
  }
}

function isTouchPointer(event: PointerEvent): boolean {
  return event.pointerType === "touch" || event.pointerType === "pen";
}

function markTouchInput(): void {
  lastTouchInputAt = performance.now();
}

function shouldIgnoreSyntheticMouse(): boolean {
  return mobileCapable && performance.now() - lastTouchInputAt < 700;
}

function clampInput(value: number): number {
  return Math.max(-1, Math.min(1, value));
}

function handlePrimaryActionStart(): void {
  sound.resumeFromGesture();
  if (!gameStarted || pauseOpen || gameOver || craftingOpen) {
    return;
  }
  if (tryAttackMob()) {
    cancelMining();
    return;
  }
  isMining = true;
}

function handlePrimaryActionEnd(): void {
  cancelMining();
}

function handleSecondaryAction(): void {
  sound.resumeFromGesture();
  if (!gameStarted || pauseOpen || gameOver) {
    return;
  }
  const selectedSlot = inventory.selectedSlot();
  const selectedTypeId = selectedBlock ? registry.getState(selectedBlock.stateId).typeId : null;
  if (selectedTypeId === "door" && selectedBlock) {
    toggleDoorBlock(selectedBlock.block.x, selectedBlock.block.y, selectedBlock.block.z, selectedBlock.stateId);
    return;
  }
  if (selectedTypeId === "bell" && selectedBlock) {
    ringBellBlock(selectedBlock.block.x, selectedBlock.block.y, selectedBlock.block.z);
    return;
  }
  if (selectedSlot.armor) {
    equipSelectedArmor();
    return;
  }
  const targetVillager = findTargetVillager();
  if (targetVillager && targetVillager.distance < (selectedBlock?.distance ?? Infinity) + 0.05) {
    openTradePanel(targetVillager.villager.id);
    return;
  }
  if (selectedTypeId === "bed" && selectedBlock) {
    tryUseBed(selectedBlock.block.x, selectedBlock.block.y, selectedBlock.block.z);
    return;
  }
  if (selectedTypeId === "farmland" && selectedBlock && selectedSlot.item?.id === "seeds") {
    plantWheatOnFarmland(selectedBlock.block.x, selectedBlock.block.y, selectedBlock.block.z);
    return;
  }
  if ((selectedTypeId === "grass" || selectedTypeId === "dirt") && selectedBlock && selectedSlot.tool?.kind === "hoe") {
    tillSoil(selectedBlock.block.x, selectedBlock.block.y, selectedBlock.block.z);
    return;
  }
  if (selectedTypeId === "crafting_table") {
    openCraftingPanel("workbench");
    return;
  }
  if (selectedTypeId === "furnace") {
    openCraftingPanel("furnace");
    return;
  }
  if (selectedTypeId === "chest" && selectedBlock) {
    openChestPanel(selectedBlock.block.x, selectedBlock.block.y, selectedBlock.block.z);
    return;
  }
  if (selectedSlot.food) {
    eatSelectedFood();
    return;
  }
  if (!selectedBlock) {
    return;
  }
  const target = {
    x: selectedBlock.block.x + selectedBlock.normal.x,
    y: selectedBlock.block.y + selectedBlock.normal.y,
    z: selectedBlock.block.z + selectedBlock.normal.z
  };
  if (selectedSlot.stateId !== null && registry.getState(selectedSlot.stateId).typeId === "door") {
    tryPlaceDoor(target.x, target.y, target.z);
    return;
  }
  if (!canPlaceAt(target.x, target.y, target.z)) {
    return;
  }
  const stateId = inventory.removeOneSelected();
  if (stateId === null) {
    updateHotbar();
    return;
  }
  applyBlockEdit(target.x, target.y, target.z, stateId);
  sound.playPlace(soundGroupForState(stateId));
  playHeldAnimation("place");
  updateHotbar();
}

function tryUseBed(x: number, y: number, z: number): void {
  if (!canSleepAtTime(dayNight.timeOfDay)) {
    setRespawnPointFromBed(x, y, z);
    showGameNotice("リスポーン地点を設定しました。夜だけ眠れます。");
    return;
  }
  if (isMonsterNearBed(x, y, z)) {
    showGameNotice("近くにモンスターがいるため眠れません");
    return;
  }
  setRespawnPointFromBed(x, y, z);
  dayNight.timeOfDay = wakeTimeAfterSleep();
  currentDayNightVisuals = dayNight.visuals();
  updateDayNight(0);
  clearHostileMobs();
  survival.reset({
    ...survival.state,
    airTicks: 300
  });
  updateSurvivalHud();
  showGameNotice("夜を明かしました", { sleeping: true });
}

function plantWheatOnFarmland(x: number, y: number, z: number): void {
  const cropY = y + 1;
  if (world.getStateIdIfLoaded(x, cropY, z) !== AIR_STATE_ID) {
    return;
  }
  if (!inventory.removeItems([{ label: "seeds", count: 1 }])) {
    return;
  }
  applyBlockEdit(x, cropY, z, registry.resolveState("wheat", { age: 0 }));
  sound.playPlace("grass");
  playHeldAnimation("place");
  updateHotbar();
}

function tillSoil(x: number, y: number, z: number): void {
  if (world.getStateIdIfLoaded(x, y + 1, z) !== AIR_STATE_ID) {
    showGameNotice("上が空いていないため耕せません");
    return;
  }
  applyBlockEdit(x, y, z, registry.resolveState("farmland"));
  damageSelectedToolIfPresent(1);
  survival.addExhaustion(0.005);
  sound.playPlace("dirt");
  playHeldAnimation("mine");
  updateHotbar();
}

function tryPlaceDoor(x: number, y: number, z: number): void {
  if (!canPlaceAt(x, y, z) || !canPlaceAt(x, y + 1, z)) {
    showGameNotice("ドアを置くには2ブロック分の空きが必要です");
    return;
  }
  const removedStateId = inventory.removeOneSelected();
  if (removedStateId === null) {
    updateHotbar();
    return;
  }
  const facing = doorFacingFromYaw(yaw);
  applyBlockEdit(x, y, z, registry.resolveState("door", { facing, half: "lower", open: false }));
  applyBlockEdit(x, y + 1, z, registry.resolveState("door", { facing, half: "upper", open: false }));
  sound.playPlace("wood");
  playHeldAnimation("place");
  updateHotbar();
}

function toggleDoorBlock(x: number, y: number, z: number, stateId: StateId): void {
  const state = registry.getState(stateId);
  if (state.typeId !== "door") {
    return;
  }
  setDoorOpenFromState(x, y, z, stateId, state.properties.open !== true);
  sound.playPlace("wood");
  playHeldAnimation("place");
}

function ringBellBlock(x: number, y: number, z: number): void {
  const position = { x: x + 0.5, y: y + 0.5, z: z + 0.5 };
  const villagerCount = alertVillagersToBell(position);
  const guardCount = alertVillageGuardsToBell(position);
  const revealedCount = revealHostilesByBell(position);
  spawnBellParticles(position);
  sound.playBell();
  playHeldAnimation("place");
  const total = villagerCount + guardCount;
  if (total > 0 || revealedCount > 0) {
    const villagerText = villagerCount > 0 ? `${villagerCount}人が避難` : "";
    const guardText = guardCount > 0 ? `${guardCount}人が警戒` : "";
    const hostileText = revealedCount > 0 ? `敵${revealedCount}体を発見` : "";
    showGameNotice(`鐘が鳴りました。${[villagerText, guardText, hostileText].filter(Boolean).join(" / ")}`);
  } else {
    showGameNotice("鐘が鳴りました");
  }
}

function alertVillagersToBell(position: Vec3Like): number {
  let affected = 0;
  for (const villager of villagers.villagers) {
    if (distance3(position, villager.position) > BELL_ALERT_RADIUS) {
      continue;
    }
    alertVillagerByBell(villager, position, 9);
    affected += 1;
  }
  return affected;
}

function alertVillageGuardsToBell(position: Vec3Like): number {
  let affected = 0;
  for (const guard of villageGuards.guards) {
    if (distance3(position, guard.position) > BELL_GUARD_ALERT_RADIUS) {
      continue;
    }
    const target = bellGatherTarget(position, guard.id + 700) ?? { x: position.x, y: guard.home.y, z: position.z };
    alertVillageGuardByBell(guard, position, target, 14);
    affected += 1;
  }
  return affected;
}

function revealHostilesByBell(position: Vec3Like): number {
  let affected = 0;
  for (const mob of hostileMobs.mobs) {
    if (distance3(position, mob.position) > BELL_HOSTILE_REVEAL_RADIUS) {
      continue;
    }
    revealHostileMobByBell(mob, 10);
    affected += 1;
  }
  return affected;
}

function bellGatherTarget(position: Vec3Like, salt: number): Vec3Like | null {
  const baseX = Math.floor(position.x);
  const baseZ = Math.floor(position.z);
  const offsets: { x: number; z: number }[] = [];
  for (let radius = 2; radius <= 7; radius += 1) {
    for (let step = 0; step < 8; step += 1) {
      const angle = ((step + salt * 0.37) / 8) * Math.PI * 2;
      offsets.push({
        x: Math.round(Math.cos(angle) * radius),
        z: Math.round(Math.sin(angle) * radius)
      });
    }
  }
  offsets.sort((left, right) => stableBellSort(left, right, salt));
  for (const offset of offsets) {
    const blockX = baseX + offset.x;
    const blockZ = baseZ + offset.z;
    const surfaceY = world.getMotionBlockingHeightLoaded(blockX, blockZ);
    if (surfaceY === null || surfaceY === undefined) {
      continue;
    }
    if (surfaceY > Math.floor(position.y)) {
      continue;
    }
    const standY = surfaceY + 1;
    if (Math.abs(standY - position.y) > 6) {
      continue;
    }
    if (world.isSolidBlockLoaded(blockX, standY, blockZ) || world.isSolidBlockLoaded(blockX, standY + 1, blockZ)) {
      continue;
    }
    if (world.isFluidBlockLoaded?.(blockX, standY, blockZ)) {
      continue;
    }
    return { x: blockX + 0.5, y: standY, z: blockZ + 0.5 };
  }
  return null;
}

function stableBellSort(left: { x: number; z: number }, right: { x: number; z: number }, salt: number): number {
  const leftValue = Math.sin((left.x * 31 + left.z * 17 + salt * 13) * 12.9898);
  const rightValue = Math.sin((right.x * 31 + right.z * 17 + salt * 13) * 12.9898);
  return leftValue - rightValue;
}

function spawnBellParticles(position: Vec3Like): void {
  spawnCombatParticles(
    { x: position.x, y: position.y + 0.12, z: position.z },
    14,
    [0xffd166, 0xd9a640, 0x8b5a1d]
  );
}

function distance3(left: Vec3Like, right: Vec3Like): number {
  return Math.hypot(left.x - right.x, left.y - right.y, left.z - right.z);
}

function setDoorOpenFromState(x: number, y: number, z: number, stateId: StateId, open: boolean): void {
  const state = registry.getState(stateId);
  if (state.typeId !== "door") {
    return;
  }
  const lowerY = state.properties.half === "upper" ? y - 1 : y;
  const lowerStateId = world.getStateIdIfLoaded(x, lowerY, z);
  const upperStateId = world.getStateIdIfLoaded(x, lowerY + 1, z);
  const referenceState = lowerStateId !== null && registry.getState(lowerStateId).typeId === "door"
    ? registry.getState(lowerStateId)
    : state;
  const facing = coerceDoorFacing(referenceState.properties.facing);
  toggleDoorHalf(x, lowerY, z, lowerStateId, facing, open);
  toggleDoorHalf(x, lowerY + 1, z, upperStateId, facing, open);
}

function toggleDoorHalf(x: number, y: number, z: number, stateId: StateId | null, facing: DoorFacing, open: boolean): void {
  if (stateId === null) {
    return;
  }
  const state = registry.getState(stateId);
  if (state.typeId !== "door") {
    return;
  }
  const half = state.properties.half === "upper" ? "upper" : "lower";
  applyBlockEdit(x, y, z, registry.resolveState("door", { facing, half, open }));
}

function doorFacingFromYaw(angle: number): DoorFacing {
  const normalized = ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  const quarter = Math.round(normalized / (Math.PI / 2)) % 4;
  switch (quarter) {
    case 0:
      return "south";
    case 1:
      return "east";
    case 2:
      return "north";
    default:
      return "west";
  }
}

function coerceDoorFacing(value: unknown): DoorFacing {
  return value === "north" || value === "south" || value === "east" || value === "west" ? value : "north";
}

function setRespawnPointFromBed(x: number, y: number, z: number): void {
  spawn = findSafeRespawnNearBed(x, y, z) ?? { x: x + 0.5, y: y + 1, z: z + 0.5 };
}

function findSafeRespawnNearBed(x: number, y: number, z: number): { x: number; y: number; z: number } | null {
  const candidates = [
    { x: x + 1, z },
    { x: x - 1, z },
    { x, z: z + 1 },
    { x, z: z - 1 },
    { x: x + 1, z: z + 1 },
    { x: x - 1, z: z - 1 },
    { x: x + 1, z: z - 1 },
    { x: x - 1, z: z + 1 }
  ];
  for (const candidate of candidates) {
    const surfaceY = world.getMotionBlockingHeightLoaded(candidate.x, candidate.z);
    if (surfaceY === null || surfaceY === undefined) {
      continue;
    }
    const standY = surfaceY + 1;
    if (Math.abs(standY - (y + 1)) > 2) {
      continue;
    }
    if (!world.isSolidBlockLoaded(candidate.x, standY, candidate.z) && !world.isSolidBlockLoaded(candidate.x, standY + 1, candidate.z)) {
      return { x: candidate.x + 0.5, y: standY, z: candidate.z + 0.5 };
    }
  }
  return null;
}

function isMonsterNearBed(x: number, y: number, z: number): boolean {
  return hostileMobs.mobs.some((mob) => {
    const horizontalDistance = Math.hypot(mob.position.x - (x + 0.5), mob.position.z - (z + 0.5));
    return horizontalDistance <= 8 && Math.abs(mob.position.y - y) <= 5;
  });
}

function showGameNotice(message: string, options: { sleeping?: boolean } = {}): void {
  gameNotice.textContent = message;
  gameNotice.classList.toggle("sleeping", Boolean(options.sleeping));
  gameNotice.classList.add("visible");
  if (gameNoticeTimeout !== null) {
    window.clearTimeout(gameNoticeTimeout);
  }
  gameNoticeTimeout = window.setTimeout(() => {
    gameNotice.classList.remove("visible", "sleeping");
  }, options.sleeping ? 1900 : 1500);
}

function animate(): void {
  const now = performance.now();
  const deltaSeconds = Math.min(0.05, (now - lastFrameTime) / 1000);
  lastFrameTime = now;
  const frameMs = deltaSeconds * 1000;
  recordPerfSample(frameTimeStats, frameMs);
  recordPerfSample(longFrameTimeStats, frameMs);

  const forward = clampInput(Number(keys.has("KeyW")) - Number(keys.has("KeyS")) + mobileInput.forward);
  const strafe = clampInput(Number(keys.has("KeyD")) - Number(keys.has("KeyA")) + mobileInput.strafe);
  const wasOnGround = player.state.onGround;
  const jumpPressed = keys.has("Space") || mobileInput.jump;
  const sprinting = keys.has("ShiftLeft") || keys.has("ShiftRight") || mobileInput.sprint;
  const moving = forward !== 0 || strafe !== 0;
  attackCooldownSeconds = Math.max(0, attackCooldownSeconds - deltaSeconds);
  if (gameStarted && !pauseOpen && !gameOver) {
    const preloadStartedAt = performance.now();
    maybeEnsureCollisionTerrainAhead(forward, strafe, deltaSeconds);
    recordPerfSample(terrainPreloadStats, performance.now() - preloadStartedAt);
    const physicsStartedAt = performance.now();
    player.step(world, {
      forward,
      strafe,
      jump: jumpPressed,
      sprint: sprinting,
      yaw
    }, deltaSeconds);
    recordPerfSample(physicsStats, performance.now() - physicsStartedAt);
    updateLoadedChunksAroundPlayer();
    rescuePlayerFromUnloadedVoid();
    const fluidStartedAt = performance.now();
    updateFluidSimulation(deltaSeconds);
    recordPerfSample(fluidStats, performance.now() - fluidStartedAt);
    updateCropGrowth(deltaSeconds);
    updateSurvivalFromMovement(deltaSeconds, wasOnGround, jumpPressed, sprinting, moving);
    updateFootstepSound(deltaSeconds, sprinting, moving);
    const survivalTick = survival.tick(deltaSeconds, { eyesInWater: player.state.eyesInWater });
    if (survivalTick.drowningDamage > 0) {
      playDamageEffect();
      sound.playDamage();
      if (survival.isDead()) {
        enterGameOver("drowning");
      }
    }
    updateDayNight(deltaSeconds);
    const mobStartedAt = performance.now();
    updateHostileMobs(deltaSeconds);
    updatePassiveMobs(deltaSeconds);
    updateVillagers(deltaSeconds);
    updateFarmerWork(deltaSeconds);
    updateVillageGuards(deltaSeconds);
    recordPerfSample(mobStats, performance.now() - mobStartedAt);
    if (survival.isDead()) {
      enterGameOver("generic");
    }
  } else {
    updateDayNight(deltaSeconds);
  }

  const eye = player.eyePosition();
  if (Math.abs(eye.y - smoothedEyeY) > 2.5 || eye.y < smoothedEyeY) {
    smoothedEyeY = eye.y;
  } else {
    smoothedEyeY += (eye.y - smoothedEyeY) * Math.min(1, deltaSeconds * 10);
  }
  camera.position.set(eye.x, smoothedEyeY, eye.z);
  camera.rotation.order = "YXZ";
  camera.rotation.y = yaw;
  camera.rotation.x = pitch;

  camera.getWorldDirection(cameraDirection);
  selectedBlock = gameStarted && !pauseOpen
    ? voxelRaycast(
      world,
      { x: eye.x, y: smoothedEyeY, z: eye.z },
      { x: cameraDirection.x, y: cameraDirection.y, z: cameraDirection.z },
      6
    )
    : null;
  if (selectedBlock) {
    highlight.visible = true;
    highlight.position.set(
      selectedBlock.block.x + 0.5,
      selectedBlock.block.y + 0.5,
      selectedBlock.block.z + 0.5
    );
  } else {
    highlight.visible = false;
  }
  if (gameStarted && !pauseOpen && !gameOver) {
    updateMining(deltaSeconds);
  }
  if (gameStarted && !pauseOpen) {
    updateDroppedItems(deltaSeconds);
  }
  syncHostileMobObjects();
  syncPassiveMobObjects();
  syncVillagerObjects();
  syncVillageGuardObjects();
  updateCombatParticles(deltaSeconds);
  updateSurvivalHud();
  updateUnderwaterVisuals();
  updateWaterAnimation(now / 1000);

  updateDebugHud(deltaSeconds);
  const renderStartedAt = performance.now();
  renderer.render(scene, camera);
  recordPerfSample(renderStats, performance.now() - renderStartedAt);
  if (!gameOver) {
    const elapsedBeforeStreaming = performance.now() - now;
    if (elapsedBeforeStreaming < 10) {
      const chunkQueueStartedAt = performance.now();
      processChunkLoadQueue(adaptiveChunkStageBudget(deltaSeconds));
      processChunkObjectBuildQueue(adaptiveChunkObjectBuildBudget(deltaSeconds));
      recordPerfSample(chunkQueueStats, performance.now() - chunkQueueStartedAt);
    } else {
      recordPerfSample(chunkQueueStats, 0);
    }
  }
  requestAnimationFrame(animate);
}

function updateDayNight(deltaSeconds: number): void {
  dayNight.advance(deltaSeconds);
  const visuals = dayNight.visuals();
  currentDayNightVisuals = visuals;
  sceneBackgroundColor.setHex(visuals.skyColor);
  sunlight.intensity = visuals.sunlightIntensity;
  ambientLight.intensity = visuals.ambientIntensity;
  sunlight.position.set(visuals.sunDirection.x * 80, visuals.sunDirection.y * 90, visuals.sunDirection.z * 80);
  worldTint.style.opacity = String(visuals.skyDarkness);
  positionCelestialSprite(sunSprite, visuals.sunDirection, visuals.sunVisible, 38);
  positionCelestialSprite(moonSprite, visuals.moonDirection, visuals.moonVisible, 30);
}

function updateDebugHud(deltaSeconds: number): void {
  hudUpdateAccumulator += deltaSeconds;
  if (hudUpdateAccumulator < 0.2) {
    return;
  }
  hudUpdateAccumulator = 0;
  const currentTerrain = generator.sampleTerrain(Math.floor(player.state.position.x), Math.floor(player.state.position.z));
  const frameSummary = summarizePerf(frameTimeStats);
  const longFrameSummary = summarizePerf(longFrameTimeStats);
  const buildSummary = summarizePerf(chunkObjectBuildStats);
  const workerSummary = summarizePerf(workerMeshLatencyStats);
  const chunkSummary = summarizePerf(chunkQueueStats);
  const preloadSummary = summarizePerf(terrainPreloadStats);
  const physicsSummary = summarizePerf(physicsStats);
  const fluidSummary = summarizePerf(fluidStats);
  const mobSummary = summarizePerf(mobStats);
  const renderSummary = summarizePerf(renderStats);
  const loafSummary = summarizePerf(longAnimationFrameStats);
  latestPerfSnapshot = {
    chunks: chunkObjects.size,
    sections: visibleSectionMeshes,
    loading: chunkLoadQueue.size,
    remesh: chunkRemeshRequests.size,
    jobs: chunkMeshJobs.size,
    building: chunkObjectBuildQueue.size,
    frame: frameSummary,
    longFrame: longFrameSummary,
    chunkQueue: chunkSummary,
    terrainPreload: preloadSummary,
    physics: physicsSummary,
    fluid: fluidSummary,
    mob: mobSummary,
    render: renderSummary,
    longAnimationFrame: loafSummary,
    chunkBuild: buildSummary,
    worker: workerSummary,
    faces: totalFaces,
    worldChunks: world.chunks.size
  };
  hud.textContent = `Phase 1 walk | seed: ${seed} | chunks: ${chunkObjects.size} | sections: ${visibleSectionMeshes} | loading: ${chunkLoadQueue.size} | remesh: ${chunkRemeshRequests.size} | jobs: ${chunkMeshJobs.size}/${chunkMeshJobBacklogLimit()} | building: ${chunkObjectBuildQueue.size} | fps: ${Math.round(
    1000 / Math.max(1, frameSummary.average)
  )} | p95: ${frameSummary.p95.toFixed(1)}ms | p99: ${longFrameSummary.p99.toFixed(
    1
  )}ms | max: ${longFrameSummary.max.toFixed(1)}ms | spikes: ${longFrameSummary.spikes} | q: ${chunkSummary.last.toFixed(
    1
  )} | preload: ${preloadSummary.last.toFixed(1)} | phys: ${physicsSummary.last.toFixed(1)} | fluid: ${fluidSummary.last.toFixed(
    1
  )} | mob: ${mobSummary.last.toFixed(1)} | render: ${renderSummary.last.toFixed(1)} | build: ${buildSummary.last.toFixed(
    1
  )}ms | worker: ${workerSummary.average.toFixed(
    0
  )}ms | loaf: ${loafSummary.last.toFixed(1)}/${loafSummary.max.toFixed(1)} | faces: ${totalFaces} | biome: ${currentTerrain.biome.primary.id} | pos: ${player.state.position.x.toFixed(
    1
  )}, ${player.state.position.y.toFixed(1)}, ${player.state.position.z.toFixed(1)} | slot ${
    inventory.selectedIndex + 1
  }: ${inventory.selectedSlot().label} | mobs: ${hostileMobs.mobs.length} | villagers: ${villagers.villagers.length} | guards: ${villageGuards.guards.length} | world: ${world.chunks.size} | saved: ${
    chunkDeltaStore.size
  }${player.state.inWater ? " | water" : ""} | time: ${Math.floor(dayNight.timeOfDay)}${
    debugGridEnabled ? " | debug grid" : ""
  }`;
}

function installLongAnimationFrameObserver(): void {
  if (!("PerformanceObserver" in window)) {
    return;
  }
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!gameStarted) {
          continue;
        }
        recordPerfSample(longAnimationFrameStats, entry.duration);
      }
    });
    observer.observe({ type: "long-animation-frame", buffered: true });
  } catch {
    // Browsers without LoAF support still use the manual frame-time counters above.
  }
}

function resetRuntimePerfStats(): void {
  for (const buffer of [
    frameTimeStats,
    longFrameTimeStats,
    chunkObjectBuildStats,
    workerMeshLatencyStats,
    chunkQueueStats,
    terrainPreloadStats,
    physicsStats,
    fluidStats,
    mobStats,
    renderStats,
    longAnimationFrameStats
  ]) {
    resetPerfBuffer(buffer);
  }
}

function resetPerfBuffer(buffer: PerfSampleBuffer): void {
  buffer.samples.fill(0);
  buffer.index = 0;
  buffer.count = 0;
  buffer.last = 0;
}

function createPerfBuffer(size: number): PerfSampleBuffer {
  return {
    samples: new Float32Array(size),
    index: 0,
    count: 0,
    last: 0
  };
}

function recordPerfSample(buffer: PerfSampleBuffer, value: number): void {
  buffer.samples[buffer.index] = value;
  buffer.index = (buffer.index + 1) % buffer.samples.length;
  buffer.count = Math.min(buffer.count + 1, buffer.samples.length);
  buffer.last = value;
}

function summarizePerf(buffer: PerfSampleBuffer): {
  average: number;
  p95: number;
  p99: number;
  max: number;
  last: number;
  spikes: number;
} {
  if (buffer.count === 0) {
    return { average: 0, p95: 0, p99: 0, max: 0, last: 0, spikes: 0 };
  }
  const values = Array.from(buffer.samples.slice(0, buffer.count)).sort((a, b) => a - b);
  const total = values.reduce((sum, value) => sum + value, 0);
  return {
    average: total / values.length,
    p95: values[Math.min(values.length - 1, Math.floor(values.length * 0.95))],
    p99: values[Math.min(values.length - 1, Math.floor(values.length * 0.99))],
    max: values[values.length - 1],
    last: buffer.last,
    spikes: values.filter((value) => value > 34).length
  };
}

function createCelestialSprite(kind: "sun" | "moon"): THREE.Sprite {
  const canvas = document.createElement("canvas");
  canvas.width = 16;
  canvas.height = 16;
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("failed to create celestial texture context");
  }
  context.imageSmoothingEnabled = false;
  if (kind === "sun") {
    context.fillStyle = "#fff7d2";
    context.fillRect(3, 3, 10, 10);
    context.fillStyle = "#ffffff";
    context.fillRect(4, 4, 8, 8);
  } else {
    context.fillStyle = "#d8dee9";
    context.fillRect(3, 3, 10, 10);
    context.fillStyle = "#8d96a6";
    context.fillRect(4, 5, 3, 2);
    context.fillRect(9, 8, 2, 3);
    context.clearRect(10, 3, 3, 10);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
    depthTest: true
  });
  const sprite = new THREE.Sprite(material);
  sprite.name = kind;
  return sprite;
}

function positionCelestialSprite(
  sprite: THREE.Sprite,
  direction: { x: number; y: number; z: number },
  visible: boolean,
  size: number
): void {
  const normalized = new THREE.Vector3(direction.x, direction.y, direction.z).normalize();
  sprite.visible = visible;
  sprite.position.set(
    camera.position.x + normalized.x * 520,
    camera.position.y + normalized.y * 520,
    camera.position.z + normalized.z * 520
  );
  sprite.scale.set(size, size, 1);
}

function updateSurvivalFromMovement(
  deltaSeconds: number,
  wasOnGround: boolean,
  jumpPressed: boolean,
  sprinting: boolean,
  moving: boolean
): void {
  if (moving && player.state.onGround) {
    survival.addExhaustion((sprinting ? 0.10 : 0.01) * deltaSeconds);
  }
  if (jumpPressed && !wasJumpPressed && wasOnGround) {
    survival.addExhaustion(sprinting ? 0.2 : 0.05);
  }
  wasJumpPressed = jumpPressed;

  if (player.state.inWater) {
    fallPeakY = player.state.position.y;
    return;
  }

  if (player.state.onGround) {
    if (!wasOnGround) {
      const damage = survival.applyFallDamage(fallPeakY - player.state.position.y);
      if (damage > 0) {
        playDamageEffect();
        sound.playDamage();
        if (survival.isDead()) {
          enterGameOver("fall");
        }
      }
    }
    fallPeakY = player.state.position.y;
  } else if (wasOnGround) {
    fallPeakY = player.state.position.y;
  } else {
    fallPeakY = Math.max(fallPeakY, player.state.position.y);
  }
}

function updateUnderwaterVisuals(): void {
  const opacity = player.state.eyesInWater ? 0.48 : player.state.inWater ? 0.16 : 0;
  underwaterTint.style.opacity = String(opacity);
}

function updateFootstepSound(deltaSeconds: number, sprinting: boolean, moving: boolean): void {
  if (!moving || !player.state.onGround) {
    footstepTimer = 0;
    return;
  }

  footstepTimer -= deltaSeconds;
  if (footstepTimer > 0) {
    return;
  }

  sound.playStep(soundGroupUnderPlayer());
  footstepTimer = sprinting ? 0.28 : 0.42;
}

function enterGameOver(cause: DeathCause = "generic"): void {
  if (gameOver) {
    return;
  }
  gameOver = true;
  updateGameOverMessage(cause);
  sound.playDeath();
  keys.clear();
  cancelMining();
  highlight.visible = false;
  pauseOpen = false;
  pauseOverlay.classList.remove("visible");
  if (document.pointerLockElement === renderer.domElement) {
    releasePointerLockForUi();
  }
  gameOverOverlay.classList.add("visible");
}

function updateGameOverMessage(cause: DeathCause): void {
  if (!gameOverMessage) {
    return;
  }
  gameOverMessage.textContent = deathMessage(cause);
}

function respawnPlayer(): void {
  gameOver = false;
  pauseOpen = false;
  pauseOverlay.classList.remove("visible");
  survival.reset();
  player.state.position = { ...spawn };
  player.state.velocity = { x: 0, y: 0, z: 0 };
  player.state.onGround = false;
  smoothedEyeY = player.eyePosition().y;
  fallPeakY = player.state.position.y;
  wasJumpPressed = false;
  keys.clear();
  cancelMining();
  clearHostileMobs();
  clearPassiveMobs();
  updateSurvivalHud();
  gameOverOverlay.classList.remove("visible");
}

function openPauseMenu(options: { pointerAlreadyReleased?: boolean } = {}): void {
  if (!gameStarted || gameOver || pauseOpen) {
    return;
  }
  pauseOpen = true;
  keys.clear();
  cancelMining();
  closeCraftingPanel({ requestPointerLock: false });
  highlight.visible = false;
  pauseOverlay.classList.add("visible");
  if (!options.pointerAlreadyReleased) {
    releasePointerLockForUi();
  }
}

function closePauseMenu(): void {
  if (!pauseOpen) {
    return;
  }
  pauseOpen = false;
  pauseOverlay.classList.remove("visible");
  requestPointerLockSafe();
}

async function saveAndReturnToTitle(): Promise<void> {
  await saveGame();
  await returnToTitleScreen("保存してタイトルへ戻りました");
}

async function returnToTitleScreen(status: string): Promise<void> {
  gameStarted = false;
  pauseOpen = false;
  gameOver = false;
  keys.clear();
  cancelMining();
  closeCraftingPanel({ requestPointerLock: false });
  updateCraftingPanel();
  highlight.visible = false;
  pauseOverlay.classList.remove("visible");
  gameOverOverlay.classList.remove("visible");
  titleScreen.classList.add("visible");
  app.classList.add("title-active");
  savePanel.classList.remove("visible");
  releasePointerLockForUi();
  updateTitlePanorama();
  await refreshTitleScreen();
  setSaveStatus(status);
}

async function saveGame(): Promise<void> {
  if (!gameStarted) {
    return;
  }
  try {
    await storage.saveWorld(storageKey, createCurrentWorldSave());
    setSaveStatus("保存しました");
  } catch (error) {
    console.warn("save failed", error);
    setSaveStatus("保存に失敗しました");
  }
}

async function loadGame(options: { silent?: boolean } = {}): Promise<boolean> {
  try {
    const save = await storage.loadWorld(storageKey);
    if (!save) {
      if (!options.silent) {
        setSaveStatus("保存データがありません");
      }
      return false;
    }
    applyWorldSave(save);
    setSaveStatus(options.silent ? "保存データを自動読込しました" : "読込しました");
    return true;
  } catch (error) {
    console.warn("load failed", error);
    setSaveStatus("読込に失敗しました");
    return false;
  }
}

async function deleteSave(options: { refreshTitle?: boolean } = {}): Promise<void> {
  try {
    await storage.deleteWorld(storageKey);
    setSaveStatus("保存データを削除しました");
    if (options.refreshTitle) {
      await refreshTitleScreen();
    }
  } catch (error) {
    console.warn("delete save failed", error);
    setSaveStatus("削除に失敗しました");
  }
}

async function exportSave(): Promise<void> {
  try {
    const save = gameStarted ? createCurrentWorldSave() : await storage.loadWorld(storageKey);
    if (!save) {
      setSaveStatus("書き出す保存データがありません");
      return;
    }
    if (gameStarted) {
      await storage.saveWorld(storageKey, save);
    }

    const blob = new Blob([JSON.stringify(save, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = createSaveExportFileName(save);
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 5000);
    setSaveStatus("保存データを書き出しました");
  } catch (error) {
    console.warn("export save failed", error);
    setSaveStatus("書き出しに失敗しました");
  }
}

function openSaveImportPicker(): void {
  saveImportInput.value = "";
  saveImportInput.click();
}

async function importSelectedSaveFile(): Promise<void> {
  const file = saveImportInput.files?.[0];
  if (!file) {
    return;
  }

  try {
    const save = parseImportedSave(await file.text());
    await storage.saveWorld(storageKey, save);
    applyWorldSave(save);
    startGameFromTitle("保存データを取り込みました");
    await refreshTitleScreen();
  } catch (error) {
    console.warn("import save failed", error);
    setSaveStatus("取り込みに失敗しました");
    await refreshTitleScreen();
  }
}

function parseImportedSave(text: string): WorldSaveV0 {
  const parsed = JSON.parse(text) as unknown;
  if (!isWorldSaveV0(parsed)) {
    throw new Error("unsupported or malformed world save");
  }
  return parsed;
}

function createSaveExportFileName(save: WorldSaveV0): string {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const seedName = save.seed.replace(/[^a-z0-9_-]+/gi, "-").replace(/^-+|-+$/g, "").slice(0, 32) || "world";
  return `pinecraft-${seedName}-${stamp}.json`;
}

async function initializeTitleScreen(): Promise<void> {
  gameStarted = false;
  app.classList.add("title-active");
  titleScreen.classList.add("visible");
  savePanel.classList.remove("visible");
  keys.clear();
  cancelMining();
  updateTitlePanorama();
  await refreshTitleScreen();
}

async function refreshTitleScreen(): Promise<void> {
  const hasSave = await storage.loadWorld(storageKey) !== null;
  if (titleContinueButton) {
    titleContinueButton.disabled = !hasSave;
    titleContinueButton.textContent = hasSave ? "続きから" : "続きから（保存なし）";
  }
  if (titleDeleteButton) {
    titleDeleteButton.disabled = !hasSave;
  }
}

async function continueFromTitle(): Promise<void> {
  const loaded = await loadGame({ silent: true });
  if (!loaded) {
    await refreshTitleScreen();
    return;
  }
  startGameFromTitle("読込しました");
}

function startNewWorldFromTitle(): void {
  if (hasEnteredWorld) {
    resetWorldToFreshStart();
  } else {
    updateLoadedChunksAroundPlayer(true);
  }
  startGameFromTitle("新しいワールドを開始しました");
}

function startGameFromTitle(status: string): void {
  resetRuntimePerfStats();
  gameStarted = true;
  pauseOpen = false;
  pauseOverlay.classList.remove("visible");
  app.classList.remove("title-active");
  titleScreen.classList.remove("visible");
  savePanel.classList.add("visible");
  hasEnteredWorld = true;
  setSaveStatus(status);
  requestPointerLockSafe();
}

function resetWorldToFreshStart(): void {
  gameOver = false;
  pauseOpen = false;
  pauseOverlay.classList.remove("visible");
  gameOverOverlay.classList.remove("visible");
  keys.clear();
  cancelMining();
  clearHostileMobs();
  clearPassiveMobs();
  clearVillagers();
  clearVillageGuards();
  clearDroppedItems();
  containers.clear();
  activeTradingVillagerId = null;
  clearChunkObjects();
  world.chunks.clear();
  pipeline.meshes.clear();
  chunkLoadQueue.clear();
  completedChunkMeshes.clear();
  chunkMeshJobs.clear();
  chunkMeshJobStartedAt.clear();
  chunkRemeshRequests.clear();
  chunkDeltaStore.replace([]);
  spawn = { ...initialSpawn };
  player.state.position = { ...spawn };
  player.state.velocity = { x: 0, y: 0, z: 0 };
  player.state.onGround = false;
  player.state.inWater = false;
  player.state.eyesInWater = false;
  survival.reset();
  restoreHotbar(createDefaultHotbar(), 0);
  restoreEquippedArmor({});
  dayNight.timeOfDay = searchParams.get("startNight") === "1" ? 13000 : 1000;
  loadedCenterChunkX = worldToChunkCoord(Math.floor(player.state.position.x));
  loadedCenterChunkZ = worldToChunkCoord(Math.floor(player.state.position.z));
  rebuildVisibleChunksAround(loadedCenterChunkX, loadedCenterChunkZ);
  smoothedEyeY = player.eyePosition().y;
  fallPeakY = player.state.position.y;
  wasJumpPressed = false;
  updateHotbar();
  updateCraftingPanel();
  updateSurvivalHud();
}

function createCurrentWorldSave(): WorldSaveV0 {
  const chunkSaves = new Map<string, ReturnType<typeof createChunkSaveV0>>();
  for (const entry of chunkDeltaStore.entries()) {
    chunkSaves.set(meshKey(entry.chunkX, entry.chunkZ), {
      chunkX: entry.chunkX,
      chunkZ: entry.chunkZ,
      status: "FULL",
      blockDeltas: entry.blockDeltas
    });
  }
  for (const chunk of world.chunks.values()) {
    if (chunk.blockDeltas.size === 0) {
      continue;
    }
    chunkSaves.set(meshKey(chunk.chunkX, chunk.chunkZ), createChunkSaveV0(chunk));
  }

  return {
    version: 0,
    seed,
    dimensionId: world.dimension.id,
    time: dayNight.timeOfDay,
    chunks: Array.from(chunkSaves.values()),
    containers: serializeContainers(),
    player: {
      position: { ...player.state.position },
      velocity: { ...player.state.velocity },
      respawnPoint: { ...spawn },
      health: survival.state.health,
      foodLevel: survival.state.foodLevel,
      saturation: survival.state.saturation,
      exhaustion: survival.state.exhaustion,
      airTicks: survival.state.airTicks,
      selectedHotbarSlot: inventory.selectedIndex,
      hotbar: cloneHotbar(inventory.slots),
      equippedArmor: cloneEquippedArmor()
    }
  };
}

function applyWorldSave(save: WorldSaveV0): void {
  gameOver = false;
  pauseOpen = false;
  pauseOverlay.classList.remove("visible");
  gameOverOverlay.classList.remove("visible");
  keys.clear();
  cancelMining();
  clearHostileMobs();
  clearPassiveMobs();
  clearVillagers();
  clearVillageGuards();
  clearDroppedItems();
  containers.clear();
  activeTradingVillagerId = null;
  clearChunkObjects();
  world.chunks.clear();
  pipeline.meshes.clear();
  chunkLoadQueue.clear();
  completedChunkMeshes.clear();
  chunkMeshJobs.clear();
  chunkMeshJobStartedAt.clear();
  chunkRemeshRequests.clear();
  chunkDeltaStore.replace(save.chunks.map((chunk) => ({
    chunkX: chunk.chunkX,
    chunkZ: chunk.chunkZ,
    blockDeltas: chunk.blockDeltas
  })));
  restoreContainers(save.containers ?? []);

  spawn = { ...(save.player.respawnPoint ?? initialSpawn) };
  player.state.position = { ...save.player.position };
  player.state.velocity = { ...save.player.velocity };
  player.state.onGround = false;
  player.state.inWater = false;
  player.state.eyesInWater = false;
  survival.reset({
    health: save.player.health,
    foodLevel: save.player.foodLevel,
    saturation: save.player.saturation,
    exhaustion: save.player.exhaustion,
    airTicks: save.player.airTicks
  });
  if (save.player.hotbar.length > 0) {
    restoreHotbar(save.player.hotbar, save.player.selectedHotbarSlot);
  } else {
    inventory.select(Math.max(0, Math.min(HOTBAR_SIZE - 1, save.player.selectedHotbarSlot)));
  }
  restoreEquippedArmor(save.player.equippedArmor ?? {});
  dayNight.timeOfDay = save.time;
  loadedCenterChunkX = worldToChunkCoord(Math.floor(player.state.position.x));
  loadedCenterChunkZ = worldToChunkCoord(Math.floor(player.state.position.z));
  rebuildVisibleChunksAround(loadedCenterChunkX, loadedCenterChunkZ);
  smoothedEyeY = player.eyePosition().y;
  fallPeakY = player.state.position.y;
  wasJumpPressed = false;
  updateHotbar();
  updateCraftingPanel();
  updateSurvivalHud();
}

function restoreHotbar(slots: readonly HotbarSlot[], selectedIndex: number): void {
  const restored = cloneHotbar(slots);
  for (let index = 0; index < inventory.slots.length; index += 1) {
    inventory.slots[index] = restored[index] ?? hotbarSlot("empty", null, 0);
  }
  inventory.select(Math.max(0, Math.min(HOTBAR_SIZE - 1, selectedIndex)));
}

function serializeContainers(): ContainerSaveV0[] {
  const saves: ContainerSaveV0[] = [];
  for (const [key, slots] of containers) {
    if (slots.every(isEmptyInventorySlot)) {
      continue;
    }
    const [x, y, z] = key.split(",").map(Number);
    if (![x, y, z].every(Number.isInteger)) {
      continue;
    }
    saves.push({ x, y, z, slots: cloneHotbar(slots) });
  }
  return saves;
}

function restoreContainers(saves: readonly ContainerSaveV0[]): void {
  containers.clear();
  for (const save of saves) {
    const slots = createEmptySlots(CHEST_SIZE);
    const restored = cloneHotbar(save.slots);
    for (let index = 0; index < slots.length; index += 1) {
      slots[index] = restored[index] ?? hotbarSlot("empty", null, 0);
    }
    containers.set(blockKey(save.x, save.y, save.z), slots);
  }
}

function cloneEquippedArmor(): Partial<Record<ArmorSlotName, ArmorMetadata | null>> {
  return {
    helmet: equippedArmor.helmet ? { ...equippedArmor.helmet } : null,
    chestplate: equippedArmor.chestplate ? { ...equippedArmor.chestplate } : null,
    leggings: equippedArmor.leggings ? { ...equippedArmor.leggings } : null,
    boots: equippedArmor.boots ? { ...equippedArmor.boots } : null
  };
}

function restoreEquippedArmor(armor: Partial<Record<ArmorSlotName, ArmorMetadata | null>>): void {
  equippedArmor.helmet = armor.helmet ? { ...armor.helmet } : null;
  equippedArmor.chestplate = armor.chestplate ? { ...armor.chestplate } : null;
  equippedArmor.leggings = armor.leggings ? { ...armor.leggings } : null;
  equippedArmor.boots = armor.boots ? { ...armor.boots } : null;
  lastArmorValue = -1;
}

function rebuildVisibleChunksAround(centerChunkX: number, centerChunkZ: number): void {
  const results = pipeline.ensureAreaFull(
    centerChunkX - initialChunkRadius,
    centerChunkX + initialChunkRadius,
    centerChunkZ - initialChunkRadius,
    centerChunkZ + initialChunkRadius
  );
  for (const result of results) {
    if (result.mesh) {
      addOrReplaceChunkObject(result.chunk.chunkX, result.chunk.chunkZ, result.mesh);
    }
  }
  recalculateTotalFaces();
  updateLoadedChunksAroundPlayer(true);
}

function clearChunkObjects(): void {
  for (const object of chunkObjects.values()) {
    scene.remove(object);
    disposeChunkObject(object);
  }
  chunkObjects.clear();
  chunkObjectBuildQueue.clear();
  chunkFaceCounts.clear();
  chunkSectionCounts.clear();
  totalFaces = 0;
  visibleSectionMeshes = 0;
  fluidMaterials.clear();
}

function clearDroppedItems(): void {
  droppedItems.items = [];
  for (const object of droppedItemObjects.values()) {
    scene.remove(object);
    disposeChunkObject(object);
  }
  droppedItemObjects.clear();
}

function setSaveStatus(message: string): void {
  if (!saveStatus) {
    return;
  }
  saveStatus.textContent = message;
  savePanel.classList.add("saved");
  if (saveStatusTimeout !== null) {
    window.clearTimeout(saveStatusTimeout);
  }
  saveStatusTimeout = window.setTimeout(() => {
    savePanel.classList.remove("saved");
  }, 1600);
}

function updateTitlePanorama(): void {
  if (!titlePanoramaCanvas) {
    return;
  }
  renderTitlePanoramaFromWorld(titlePanoramaCanvas);
}

function renderTitlePanoramaFromWorld(canvas: HTMLCanvasElement): void {
  const context = canvas.getContext("2d");
  if (!context) {
    return;
  }

  const captureScale = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.min(1920, Math.max(960, Math.round(window.innerWidth * captureScale)));
  const height = Math.min(1440, Math.max(720, Math.round(window.innerHeight * captureScale)));
  canvas.width = width;
  canvas.height = height;
  context.imageSmoothingEnabled = true;

  const aerialCamera = new THREE.PerspectiveCamera(66, width / height, 0.1, 1200);
  const target = new THREE.Vector3(player.state.position.x, player.state.position.y + 8, player.state.position.z);
  const orbitSeconds = performance.now() / 1000;
  const slowAngle = -0.72 + Math.sin(orbitSeconds * 0.06) * 0.05;
  const distance = 44;
  aerialCamera.position.set(
    target.x + Math.cos(slowAngle) * distance,
    target.y + 40,
    target.z + Math.sin(slowAngle) * distance
  );
  aerialCamera.lookAt(target.x + 10, target.y - 18, target.z - 8);

  const previousSize = renderer.getSize(new THREE.Vector2());
  const previousPixelRatio = renderer.getPixelRatio();
  const previousAspect = camera.aspect;
  const previousCameraPosition = camera.position.clone();
  const previousCameraRotation = camera.rotation.clone();
  const previousBackground = scene.background;
  const previousSunlightIntensity = sunlight.intensity;
  const previousSunlightPosition = sunlight.position.clone();
  const previousAmbientIntensity = ambientLight.intensity;
  const previousSunVisible = sunSprite.visible;
  const previousMoonVisible = moonSprite.visible;

  scene.background = new THREE.Color(0x96c8f0);
  sunlight.intensity = 1.85;
  sunlight.position.set(60, 112, 38);
  ambientLight.intensity = 0.95;
  sunSprite.visible = false;
  moonSprite.visible = false;
  renderer.setPixelRatio(1);
  renderer.setSize(width, height, false);
  renderer.render(scene, aerialCamera);
  context.drawImage(renderer.domElement, 0, 0, width, height);
  renderer.setPixelRatio(previousPixelRatio);
  renderer.setSize(previousSize.x, previousSize.y, false);

  scene.background = previousBackground;
  sunlight.intensity = previousSunlightIntensity;
  sunlight.position.copy(previousSunlightPosition);
  ambientLight.intensity = previousAmbientIntensity;
  sunSprite.visible = previousSunVisible;
  moonSprite.visible = previousMoonVisible;
  camera.aspect = previousAspect;
  camera.position.copy(previousCameraPosition);
  camera.rotation.copy(previousCameraRotation);
  camera.updateProjectionMatrix();

  const vignette = context.createRadialGradient(width * 0.5, height * 0.48, height * 0.28, width * 0.5, height * 0.48, height * 0.76);
  vignette.addColorStop(0, "rgb(255 255 255 / 0%)");
  vignette.addColorStop(1, "rgb(0 0 0 / 36%)");
  context.fillStyle = vignette;
  context.fillRect(0, 0, width, height);
}

function applyBlockEdit(worldX: number, worldY: number, worldZ: number, stateId: StateId): void {
  const results = pipeline.setBlockAndRemesh(worldX, worldY, worldZ, stateId);
  for (const result of results) {
    if (result.mesh) {
      addOrReplaceChunkObject(result.chunk.chunkX, result.chunk.chunkZ, result.mesh);
    }
  }
  recalculateTotalFaces();
}

function eatSelectedFood(): void {
  if (!survival.canEat()) {
    return;
  }
  const consumed = inventory.consumeOneSelected();
  if (!consumed?.food) {
    return;
  }
  survival.eat(consumed.food.nutrition, consumed.food.saturationModifier);
  updateHotbar();
  updateSurvivalHud();
  playEatEffect();
  playHeldAnimation("eat");
  sound.playEat();
}

function equipSelectedArmor(): void {
  const selectedArmor = inventory.selectedSlot().armor;
  if (!selectedArmor) {
    return;
  }
  const taken = inventory.takeSelectedArmorStack();
  if (!taken?.armor) {
    return;
  }

  const slotName = taken.armor.slot;
  const previous = equippedArmor[slotName];
  equippedArmor[slotName] = { ...taken.armor };
  if (previous) {
    const returned = inventory.addArmorStack(armorSlot(armorLabelForSlot(previous.slot), previous.slot, previous.points, previous.maxDurability, previous.durability));
    if (!returned) {
      const selectedSlot = inventory.selectedSlot();
      selectedSlot.label = armorLabelForSlot(previous.slot);
      selectedSlot.stateId = null;
      selectedSlot.count = 1;
      selectedSlot.maxStackSize = 1;
      selectedSlot.armor = { ...previous };
    }
  }

  lastArmorValue = -1;
  updateHotbar();
  updateSurvivalHud();
  playHeldAnimation("place");
  sound.playPickup();
}

function armorLabelForSlot(slot: ArmorSlotName): string {
  return `iron_${slot}`;
}

function canPlaceAt(worldX: number, worldY: number, worldZ: number): boolean {
  const existing = world.getStateIdIfLoaded(worldX, worldY, worldZ);
  if (existing === null) {
    return false;
  }
  const definition = registry.getDefinitionForState(existing);
  return definition.replaceable === true || definition.renderLayer === "none";
}

function updateMining(deltaSeconds: number): void {
  if (!isMining || !selectedBlock) {
    cancelMiningVisuals();
    return;
  }

  const targetKey = blockKey(selectedBlock.block.x, selectedBlock.block.y, selectedBlock.block.z);
  if (targetKey !== miningTargetKey) {
    miningTargetKey = targetKey;
    miningProgress = 0;
    miningSoundTimer = 0;
  }

  const blockTypeId = registry.getState(selectedBlock.stateId).typeId;
  const definition = registry.getDefinitionForState(selectedBlock.stateId);
  const requiredSeconds = miningSecondsForBlock(blockTypeId, definition.hardness);
  miningProgress = Math.min(1, miningProgress + deltaSeconds / requiredSeconds);
  miningSoundTimer -= deltaSeconds;
  if (miningSoundTimer <= 0) {
    sound.playMineHit(soundGroupForState(selectedBlock.stateId));
    playHeldAnimation("mine");
    miningSoundTimer = 0.22;
  }
  updateMiningVisuals();

  if (miningProgress < 1) {
    return;
  }

  const minedStateId = selectedBlock.stateId;
  const minedBlock = { ...selectedBlock.block };
  if (registry.getState(minedStateId).typeId === "door") {
    removeDoorPair(minedBlock.x, minedBlock.y, minedBlock.z, minedStateId);
    sound.playBlockBreak(soundGroupForState(minedStateId));
    damageSelectedToolIfPresent(1);
    spawnDroppedItem(registry.resolveState("door"), {
      x: minedBlock.x + 0.5,
      y: minedBlock.y + 0.72,
      z: minedBlock.z + 0.5
    });
    updateHotbar();
    cancelMining();
    return;
  }
  applyBlockEdit(minedBlock.x, minedBlock.y, minedBlock.z, AIR_STATE_ID);
  sound.playBlockBreak(soundGroupForState(minedStateId));
  damageSelectedToolIfPresent(1);
  spawnLootForBlock(minedStateId, {
    x: minedBlock.x + 0.5,
    y: minedBlock.y + 0.72,
    z: minedBlock.z + 0.5
  });
  updateHotbar();
  cancelMining();
}

function removeDoorPair(x: number, y: number, z: number, stateId: StateId): void {
  const state = registry.getState(stateId);
  const lowerY = state.properties.half === "upper" ? y - 1 : y;
  const lowerStateId = world.getStateIdIfLoaded(x, lowerY, z);
  const upperStateId = world.getStateIdIfLoaded(x, lowerY + 1, z);
  if (lowerStateId !== null && registry.getState(lowerStateId).typeId === "door") {
    applyBlockEdit(x, lowerY, z, AIR_STATE_ID);
  }
  if (upperStateId !== null && registry.getState(upperStateId).typeId === "door") {
    applyBlockEdit(x, lowerY + 1, z, AIR_STATE_ID);
  }
}

function tryAttackMob(): boolean {
  if (attackCooldownSeconds > 0) {
    return false;
  }

  const direction = new THREE.Vector3();
  camera.getWorldDirection(direction);
  const eye = player.eyePosition();
  const target = findTargetMob(
    { x: eye.x, y: smoothedEyeY, z: eye.z },
    { x: direction.x, y: direction.y, z: direction.z },
    3.25
  );
  if (!target) {
    return false;
  }

  const blockDistance = selectedBlock?.distance ?? Infinity;
  if (blockDistance < target.distance - 0.12) {
    return false;
  }

  const damage = attackDamageForSelectedSlot();
  const targetPosition = target.kind === "guard" ? target.guard.position : target.mob.position;
  const push = normalizedHorizontal(
    targetPosition.x - player.state.position.x,
    targetPosition.z - player.state.position.z
  );
  const knockback = {
    x: push.x * 5.4,
    y: 4.8,
    z: push.z * 5.4
  };
  const result = target.kind === "hostile"
    ? hostileMobs.damageMob(target.mob.id, damage, knockback)
    : target.kind === "passive"
      ? passiveMobs.damageMob(target.mob.id, damage, knockback)
      : villageGuards.damageGuard(target.guard.id, damage, knockback, { angerAtPlayer: true });
  if (target.kind === "guard") {
    adjustVillageReputation(target.guard.villageId, result.died ? -18 : -8);
  }

  attackCooldownSeconds = 0.48;
  playAttackSwipe(true);
  playHeldAnimation("attack");
  sound.playMobHit();
  spawnCombatParticles(
    targetPosition,
    result.died ? 18 : 9,
    target.kind === "hostile"
      ? [0x1f5b35, 0xb93a3a, 0x5a1616]
      : target.kind === "guard"
        ? [0xd8d9d2, 0xaeb6bc, 0xb93a3a]
        : [0xd8c3a0, 0xb55b55, 0x5f3026]
  );
  if (result.died) {
    sound.playMobDeath();
    if (target.kind === "passive") {
      spawnPassiveMobLoot(target.mob);
    } else if (target.kind === "guard") {
      spawnGuardLoot(target.guard);
    } else {
      spawnFoodDrop("apple", { nutrition: 4, saturationModifier: 0.3 }, {
        x: target.mob.position.x,
        y: target.mob.position.y + 0.9,
        z: target.mob.position.z
      });
    }
  }
  damageSelectedToolIfPresent(1);
  updateHotbar();
  return true;
}

function spawnGuardLoot(guard: VillageGuard): void {
  const count = 3 + Math.floor(hashUnit(guard.position.x, guard.position.y, guard.position.z) * 3);
  spawnItemDrop("iron_ingot", {
    x: guard.position.x,
    y: guard.position.y + 1.2,
    z: guard.position.z
  }, count);
}

function spawnPassiveMobLoot(mob: PassiveMob): void {
  const label = mob.role === "pig" ? "raw_porkchop" : "raw_beef";
  spawnFoodDrop(label, foodMetadataForLabel(label), {
    x: mob.position.x,
    y: mob.position.y + 0.9,
    z: mob.position.z
  });
}

function findTargetMob(
  origin: { x: number; y: number; z: number },
  direction: { x: number; y: number; z: number },
  maxDistance: number
):
  | { kind: "hostile"; mob: HostileMob; distance: number }
  | { kind: "passive"; mob: PassiveMob; distance: number }
  | { kind: "guard"; guard: VillageGuard; distance: number }
  | null {
  let best:
    | { kind: "hostile"; mob: HostileMob; distance: number }
    | { kind: "passive"; mob: PassiveMob; distance: number }
    | { kind: "guard"; guard: VillageGuard; distance: number }
    | null = null;
  for (const mob of hostileMobs.mobs) {
    const distance = rayAabbDistance(origin, direction, {
      minX: mob.position.x - 0.42,
      minY: mob.position.y,
      minZ: mob.position.z - 0.42,
      maxX: mob.position.x + 0.42,
      maxY: mob.position.y + 2.12,
      maxZ: mob.position.z + 0.42
    });
    if (distance === null || distance > maxDistance) {
      continue;
    }
    if (!best || distance < best.distance) {
      best = { kind: "hostile", mob, distance };
    }
  }
  for (const mob of passiveMobs.mobs) {
    const distance = rayAabbDistance(origin, direction, {
      minX: mob.position.x - 0.48,
      minY: mob.position.y,
      minZ: mob.position.z - 0.48,
      maxX: mob.position.x + 0.48,
      maxY: mob.position.y + 1.5,
      maxZ: mob.position.z + 0.48
    });
    if (distance === null || distance > maxDistance) {
      continue;
    }
    if (!best || distance < best.distance) {
      best = { kind: "passive", mob, distance };
    }
  }
  for (const guard of villageGuards.guards) {
    const distance = rayAabbDistance(origin, direction, {
      minX: guard.position.x - 0.68,
      minY: guard.position.y,
      minZ: guard.position.z - 0.68,
      maxX: guard.position.x + 0.68,
      maxY: guard.position.y + 2.8,
      maxZ: guard.position.z + 0.68
    });
    if (distance === null || distance > maxDistance) {
      continue;
    }
    if (!best || distance < best.distance) {
      best = { kind: "guard", guard, distance };
    }
  }
  return best;
}

function findTargetVillager(maxDistance = 4.2): { villager: Villager; distance: number } | null {
  const direction = new THREE.Vector3();
  camera.getWorldDirection(direction);
  const eye = player.eyePosition();
  let best: { villager: Villager; distance: number } | null = null;
  for (const villager of villagers.villagers) {
    const distance = rayAabbDistance(
      { x: eye.x, y: smoothedEyeY, z: eye.z },
      { x: direction.x, y: direction.y, z: direction.z },
      {
        minX: villager.position.x - 0.42,
        minY: villager.position.y,
        minZ: villager.position.z - 0.42,
        maxX: villager.position.x + 0.42,
        maxY: villager.position.y + 2.18,
        maxZ: villager.position.z + 0.42
      }
    );
    if (distance === null || distance > maxDistance) {
      continue;
    }
    if (!best || distance < best.distance) {
      best = { villager, distance };
    }
  }
  return best;
}

function attackDamageForSelectedSlot(): number {
  const slot = inventory.selectedSlot();
  if (slot.tool) {
    return slot.tool.attackDamage;
  }
  if (slot.stateId === null) {
    return 4;
  }
  const typeId = registry.getState(slot.stateId).typeId;
  if (typeId === "stone" || typeId === "log") {
    return 5;
  }
  return 4;
}

function playAttackSwipe(hit: boolean): void {
  attackSwipe.classList.remove("hit", "miss");
  restartCssAnimation(attackSwipe, hit ? "hit" : "miss");
  sound.playSwing();
}

function playHeldAnimation(kind: "attack" | "mine" | "place" | "eat"): void {
  heldItem.classList.remove("held-attack", "held-mine", "held-place", "held-eat");
  restartCssAnimation(heldItem, `held-${kind}`);
}

function spawnCombatParticles(
  position: { x: number; y: number; z: number },
  count: number,
  colors: number[] = [0x1f5b35, 0xb93a3a]
): void {
  for (let index = 0; index < count; index += 1) {
    const material = new THREE.MeshBasicMaterial({
      color: colors[index % colors.length],
      transparent: true,
      opacity: 0.95
    });
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.09, 0.09), material);
    mesh.position.set(
      position.x + (Math.random() - 0.5) * 0.36,
      position.y + 0.95 + Math.random() * 0.72,
      position.z + (Math.random() - 0.5) * 0.36
    );
    scene.add(mesh);
    combatParticles.push({
      mesh,
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 3.4,
        1.6 + Math.random() * 2.8,
        (Math.random() - 0.5) * 3.4
      ),
      ageSeconds: 0,
      lifetimeSeconds: 0.42 + Math.random() * 0.26
    });
  }
}

function spawnBurnParticles(position: { x: number; y: number; z: number }, count: number): void {
  spawnCombatParticles(
    { x: position.x, y: position.y + 0.18, z: position.z },
    count,
    [0xff7a18, 0xffd166, 0x2b2b2b]
  );
}

function updateCombatParticles(deltaSeconds: number): void {
  for (let index = combatParticles.length - 1; index >= 0; index -= 1) {
    const particle = combatParticles[index];
    particle.ageSeconds += deltaSeconds;
    particle.velocity.y -= 7.5 * deltaSeconds;
    particle.mesh.position.addScaledVector(particle.velocity, deltaSeconds);
    particle.mesh.rotation.x += deltaSeconds * 7;
    particle.mesh.rotation.y += deltaSeconds * 9;
    const material = particle.mesh.material;
    if (material instanceof THREE.MeshBasicMaterial) {
      material.opacity = Math.max(0, 1 - particle.ageSeconds / particle.lifetimeSeconds);
    }
    if (particle.ageSeconds < particle.lifetimeSeconds) {
      continue;
    }
    scene.remove(particle.mesh);
    particle.mesh.geometry.dispose();
    if (particle.mesh.material instanceof THREE.Material) {
      particle.mesh.material.dispose();
    }
    combatParticles.splice(index, 1);
  }
}

function normalizedHorizontal(x: number, z: number): { x: number; z: number } {
  const length = Math.hypot(x, z);
  if (length < 0.001) {
    return { x: -Math.sin(yaw), z: -Math.cos(yaw) };
  }
  return { x: x / length, z: z / length };
}

function rayAabbDistance(
  origin: { x: number; y: number; z: number },
  direction: { x: number; y: number; z: number },
  aabb: LocalAabb
): number | null {
  const length = Math.hypot(direction.x, direction.y, direction.z);
  if (length === 0) {
    return null;
  }
  const dir = {
    x: direction.x / length,
    y: direction.y / length,
    z: direction.z / length
  };
  let tMin = 0;
  let tMax = Infinity;

  const axes = [
    ["x", aabb.minX, aabb.maxX],
    ["y", aabb.minY, aabb.maxY],
    ["z", aabb.minZ, aabb.maxZ]
  ] as const;

  for (const [axis, min, max] of axes) {
    const originValue = origin[axis];
    const directionValue = dir[axis];
    if (Math.abs(directionValue) < 0.000001) {
      if (originValue < min || originValue > max) {
        return null;
      }
      continue;
    }
    const t1 = (min - originValue) / directionValue;
    const t2 = (max - originValue) / directionValue;
    tMin = Math.max(tMin, Math.min(t1, t2));
    tMax = Math.min(tMax, Math.max(t1, t2));
    if (tMax < tMin) {
      return null;
    }
  }

  return tMin >= 0 ? tMin : tMax >= 0 ? tMax : null;
}

function updateMiningVisuals(): void {
  if (!selectedBlock) {
    cancelMiningVisuals();
    return;
  }
  miningOverlay.visible = true;
  miningOverlay.position.set(
    selectedBlock.block.x + 0.5,
    selectedBlock.block.y + 0.5,
    selectedBlock.block.z + 0.5
  );
  miningOverlayMaterial.opacity = 0.15 + miningProgress * 0.72;
  miningBar.classList.add("visible");
  const fill = miningBar.querySelector<HTMLElement>(".mining-bar-fill");
  if (fill) {
    fill.style.transform = `scaleX(${miningProgress})`;
  }
}

function cancelMining(): void {
  isMining = false;
  miningTargetKey = null;
  miningProgress = 0;
  miningSoundTimer = 0;
  cancelMiningVisuals();
}

function cancelMiningVisuals(): void {
  miningOverlay.visible = false;
  miningOverlayMaterial.opacity = 0;
  miningBar.classList.remove("visible");
  const fill = miningBar.querySelector<HTMLElement>(".mining-bar-fill");
  if (fill) {
    fill.style.transform = "scaleX(0)";
  }
}

function miningSecondsForBlock(typeId: string, hardness: number): number {
  const slot = inventory.selectedSlot();
  const toolMultiplier = toolSpeedMultiplierForBlock(typeId, slot.tool);
  return Math.max(0.12, (hardness * 0.55) / toolMultiplier);
}

function toolSpeedMultiplierForBlock(typeId: string, tool: HotbarSlot["tool"] | undefined): number {
  if (!tool) {
    return 1;
  }
  if (tool.kind === "pickaxe" && pickaxeEffectiveBlock(typeId)) {
    return tool.miningSpeed;
  }
  if (tool.kind === "axe" && axeEffectiveBlock(typeId)) {
    return tool.miningSpeed;
  }
  if (tool.kind === "shovel" && shovelEffectiveBlock(typeId)) {
    return tool.miningSpeed;
  }
  if (tool.kind === "sword" && typeId === "leaves") {
    return 1.5;
  }
  return 1;
}

function blockKey(worldX: number, worldY: number, worldZ: number): string {
  return `${worldX},${worldY},${worldZ}`;
}

function spawnDroppedItem(stateId: StateId, position: { x: number; y: number; z: number }): void {
  const item = droppedItems.spawn({
    stateId,
    label: labelForState(stateId),
    position,
    velocity: {
      x: (hashUnit(position.x, position.y, position.z) - 0.5) * 1.4,
      y: 2.3,
      z: (hashUnit(position.z, position.x, position.y) - 0.5) * 1.4
    }
  });
  addDroppedItemObject(item);
}

function spawnItemDrop(
  label: string,
  position: { x: number; y: number; z: number },
  count = 1
): void {
  const item = droppedItems.spawn({
    stateId: null,
    label,
    count,
    item: { id: label, kind: "material" },
    position,
    velocity: {
      x: (hashUnit(position.x, position.y, position.z) - 0.5) * 1.4,
      y: 2.3,
      z: (hashUnit(position.z, position.x, position.y) - 0.5) * 1.4
    }
  });
  addDroppedItemObject(item);
}

function spawnSlotDrop(slot: HotbarSlot, position: { x: number; y: number; z: number }): void {
  if (isEmptyInventorySlot(slot)) {
    return;
  }
  if (slot.stateId !== null) {
    const item = droppedItems.spawn({
      stateId: slot.stateId,
      label: slot.label,
      count: slot.count,
      maxStackSize: slot.maxStackSize,
      position,
      velocity: {
        x: (hashUnit(position.x, position.y, position.z) - 0.5) * 1.4,
        y: 2.3,
        z: (hashUnit(position.z, position.x, position.y) - 0.5) * 1.4
      }
    });
    addDroppedItemObject(item);
    return;
  }
  const item = droppedItems.spawn({
    stateId: null,
    label: slot.label,
    count: slot.count,
    maxStackSize: slot.maxStackSize,
    food: slot.food,
    item: slot.item,
    tool: slot.tool,
    armor: slot.armor,
    position,
    velocity: {
      x: (hashUnit(position.x, position.y, position.z) - 0.5) * 1.4,
      y: 2.3,
      z: (hashUnit(position.z, position.x, position.y) - 0.5) * 1.4
    }
  });
  addDroppedItemObject(item);
}

function spawnLootForBlock(stateId: StateId, position: { x: number; y: number; z: number }): void {
  const typeId = registry.getState(stateId).typeId;
  const heldTool = inventory.selectedSlot().tool;
  if (!canHarvestBlock(typeId, heldTool)) {
    return;
  }
  if (typeId === "coal_ore") {
    spawnItemDrop("coal", position);
    return;
  }
  if (typeId === "iron_ore") {
    spawnItemDrop("raw_iron", position);
    return;
  }
  if (typeId === "gold_ore") {
    spawnItemDrop("raw_gold", position);
    return;
  }
  if (typeId === "diamond_ore") {
    spawnItemDrop("diamond", position);
    return;
  }
  if (typeId === "stone") {
    spawnDroppedItem(registry.resolveState("cobblestone"), position);
    return;
  }
  if (typeId === "farmland") {
    spawnDroppedItem(registry.resolveState("dirt"), position);
    return;
  }
  if (typeId === "wheat") {
    const age = registry.getState(stateId).properties.age;
    const mature = typeof age === "number" && age >= 7;
    if (mature) {
      spawnItemDrop("wheat", position, 1);
      spawnItemDrop("seeds", position, 1 + Math.floor(hashUnit(position.x, position.y + 4, position.z) * 3));
    } else if (hashUnit(position.x, position.y, position.z) > 0.25) {
      spawnItemDrop("seeds", position, 1);
    }
    return;
  }
  if (typeId === "leaves") {
    if (hashUnit(position.x, position.y, position.z) > 0.74) {
      spawnFoodDrop("apple", { nutrition: 4, saturationModifier: 0.3 }, position);
    }
    return;
  }
  if (typeId === "chest") {
    const key = blockKey(Math.floor(position.x), Math.floor(position.y), Math.floor(position.z));
    const slots = containers.get(key);
    if (slots) {
      for (const slot of slots) {
        spawnSlotDrop(slot, position);
      }
      containers.delete(key);
    }
  }
  spawnDroppedItem(stateId, position);
}

function canHarvestBlock(typeId: string, tool: HotbarSlot["tool"] | undefined): boolean {
  if (!requiresPickaxe(typeId)) {
    return true;
  }
  if (tool?.kind !== "pickaxe") {
    return false;
  }
  if (typeId === "iron_ore") {
    return toolLevelRank(tool.level) >= toolLevelRank("stone");
  }
  if (typeId === "gold_ore" || typeId === "diamond_ore") {
    return toolLevelRank(tool.level) >= toolLevelRank("iron");
  }
  return true;
}

function toolLevelRank(level: NonNullable<HotbarSlot["tool"]>["level"]): number {
  switch (level) {
    case "wood":
      return 0;
    case "stone":
      return 1;
    case "iron":
      return 2;
  }
}

function requiresPickaxe(typeId: string): boolean {
  return pickaxeEffectiveBlock(typeId);
}

function pickaxeEffectiveBlock(typeId: string): boolean {
  return [
    "stone",
    "cobblestone",
    "coal_ore",
    "iron_ore",
    "gold_ore",
    "diamond_ore",
    "furnace"
  ].includes(typeId);
}

function axeEffectiveBlock(typeId: string): boolean {
  return [
    "log",
    "planks",
    "crafting_table",
    "chest"
  ].includes(typeId);
}

function shovelEffectiveBlock(typeId: string): boolean {
  return [
    "dirt",
    "grass",
    "sand",
    "gravel",
    "snow"
  ].includes(typeId);
}

function updateDroppedItems(deltaSeconds: number): void {
  const result = droppedItems.step(world, inventory, player.state.position, deltaSeconds);
  for (const item of droppedItems.items) {
    const object = droppedItemObjects.get(item.id) ?? addDroppedItemObject(item);
    object.position.set(item.position.x, item.position.y, item.position.z);
    object.rotation.y = item.ageSeconds * 2.8;
    object.rotation.x = Math.sin(item.ageSeconds * 3.2) * 0.12;
  }
  for (const pickedUpId of result.pickedUpIds) {
    const object = droppedItemObjects.get(pickedUpId);
    if (!object) {
      continue;
    }
    scene.remove(object);
    disposeChunkObject(object);
    droppedItemObjects.delete(pickedUpId);
  }
  if (result.pickedUpIds.length > 0) {
    sound.playPickup();
    updateHotbar();
  }
}

function spawnFoodDrop(
  label: string,
  food: NonNullable<HotbarSlot["food"]>,
  position: { x: number; y: number; z: number }
): void {
  const item = droppedItems.spawn({
    stateId: null,
    label,
    food,
    position,
    velocity: {
      x: (hashUnit(position.x, position.y, position.z) - 0.5) * 1.1,
      y: 2.8,
      z: (hashUnit(position.z, position.x, position.y) - 0.5) * 1.1
    }
  });
  addDroppedItemObject(item);
}

function foodMetadataForLabel(label: string): NonNullable<HotbarSlot["food"]> {
  switch (label) {
    case "raw_beef":
    case "raw_porkchop":
      return { nutrition: 3, saturationModifier: 0.3 };
    case "cooked_beef":
    case "cooked_porkchop":
      return { nutrition: 8, saturationModifier: 0.8 };
    case "bread":
      return { nutrition: 5, saturationModifier: 0.6 };
    default:
      return { nutrition: 4, saturationModifier: 0.3 };
  }
}

function updateHostileMobs(deltaSeconds: number): void {
  const visuals = currentDayNightVisuals;
  const result = hostileMobs.step(world, player.state.position, deltaSeconds, {
    allowSpawning: visuals.phase === "night" || isPlayerInDarkUnderground(),
    burnInDaylight: visuals.skyLightLevel >= 15 && visuals.sunDirection.y > 0.12,
    villagerTargets: villagers.villagers.map((villager) => ({ id: villager.id, position: villager.position })),
    guardTargets: villageGuards.guards.map((guard) => ({ id: guard.id, position: guard.position }))
  });
  for (const mobId of result.burningIds) {
    const mob = hostileMobs.mobs.find((candidate) => candidate.id === mobId);
    if (mob) {
      spawnBurnParticles(mob.position, 2);
    }
  }
  for (const mob of result.died) {
    spawnBurnParticles(mob.position, 18);
    sound.playMobDeath();
  }
  for (const attack of result.villagerAttacks) {
    const damageResult = villagers.damageVillager(attack.villagerId, attack.damage);
    if (!damageResult.villager) {
      continue;
    }
    sound.playDamage();
    spawnCombatParticles(
      damageResult.villager.position,
      damageResult.died ? 18 : 8,
      [0xb88962, 0xb93a3a, 0x5a1616]
    );
    if (damageResult.died) {
      sound.playMobDeath();
      if (activeTradingVillagerId === attack.villagerId) {
        activeTradingVillagerId = null;
        craftingOpen = false;
        updateCraftingPanel();
      }
    }
  }
  for (const attack of result.guardAttacks) {
    const attacker = hostileMobs.mobs.find((mob) => mob.id === attack.mobId) ?? null;
    const push = attacker
      ? normalizedHorizontal(attack.position.x - attacker.position.x, attack.position.z - attacker.position.z)
      : { x: 0, z: 0 };
    const damageResult = villageGuards.damageGuard(attack.guardId, attack.damage, {
      x: push.x * 2.8,
      y: 2.6,
      z: push.z * 2.8
    });
    if (!damageResult.guard) {
      continue;
    }
    sound.playDamage();
    spawnCombatParticles(
      damageResult.guard.position,
      damageResult.died ? 22 : 8,
      [0xd8d9d2, 0xaeb6bc, 0xb93a3a]
    );
    if (damageResult.died) {
      sound.playMobDeath();
    }
  }
  if (result.damage > 0) {
    const damage = applyArmorMitigatedDamage(result.damage);
    if (damage > 0) {
      survival.applyDamage(damage);
      playDamageEffect();
      sound.playDamage();
      if (survival.isDead()) {
        enterGameOver("zombie");
      }
    }
  }
  if (result.projectileDamage > 0) {
    const damage = applyArmorMitigatedDamage(result.projectileDamage);
    if (damage > 0) {
      survival.applyDamage(damage);
      playDamageEffect();
      sound.playDamage();
    }
    for (const projectile of result.projectileHits) {
      spawnCombatParticles(projectile.position, 6, [0xd8d8d8, 0x8b6f55, 0x4a4038]);
    }
    if (damage > 0 && survival.isDead()) {
      enterGameOver("skeleton");
    }
  }
  syncHostileProjectiles();
}

function updatePassiveMobs(deltaSeconds: number): void {
  passiveMobs.step(world, player.state.position, deltaSeconds, {
    allowSpawning: currentDayNightVisuals.phase !== "night"
  });
}

function applyArmorMitigatedDamage(amount: number): number {
  const points = totalArmorPoints();
  const reduction = Math.min(0.8, points * 0.04);
  const mitigated = Math.max(0, Math.ceil(amount * (1 - reduction)));
  if (points > 0 && amount > 0) {
    damageEquippedArmor(Math.max(1, Math.ceil(amount)));
  }
  return mitigated;
}

function totalArmorPoints(): number {
  return Object.values(equippedArmor).reduce((total, armor) => total + (armor?.points ?? 0), 0);
}

function damageEquippedArmor(amount: number): void {
  const slots: ArmorSlotName[] = ["helmet", "chestplate", "leggings", "boots"];
  for (const slot of slots) {
    const armor = equippedArmor[slot];
    if (!armor) {
      continue;
    }
    armor.durability = Math.max(0, armor.durability - amount);
    if (armor.durability <= 0) {
      equippedArmor[slot] = null;
    }
  }
  lastArmorValue = -1;
  updateSurvivalHud();
}

function isPlayerInDarkUnderground(): boolean {
  const x = Math.floor(player.state.position.x);
  const y = Math.floor(player.eyePosition().y);
  const z = Math.floor(player.state.position.z);
  const chunk = world.getChunk(worldToChunkCoord(x), worldToChunkCoord(z));
  if (!chunk) {
    return false;
  }
  const localX = ((x % 16) + 16) % 16;
  const localZ = ((z % 16) + 16) % 16;
  const surfaceY = chunk.heightmaps.get("MOTION_BLOCKING_NO_LEAVES", localX, localZ);
  if (y > surfaceY - 5) {
    return false;
  }
  return world.getBlockLightLevelLoaded(x, y, z) <= 7;
}

function updateVillagers(deltaSeconds: number): void {
  villagerSpawnScanSeconds -= deltaSeconds;
  if (villagerSpawnScanSeconds <= 0) {
    villagerSpawnScanSeconds = 1.5;
    syncVillageSpawns();
  }
  villagers.step(world, deltaSeconds, {
    night: currentDayNightVisuals.phase === "night",
    timeOfDay: dayNight.timeOfDay,
    threats: hostileMobs.mobs.filter((mob) => mob.role === "zombie").map((mob) => mob.position)
  });
  updateVillagerDoors(deltaSeconds);
}

function updateVillagerDoors(deltaSeconds: number): void {
  for (const [key, seconds] of Array.from(villagerOpenedDoorTimers.entries())) {
    const nextSeconds = seconds - deltaSeconds;
    if (nextSeconds > 0) {
      villagerOpenedDoorTimers.set(key, nextSeconds);
      continue;
    }
    const [x, y, z] = key.split(",").map(Number);
    if (isPlayerNearDoor(x, y, z) || isVillagerNearDoor(x, y, z)) {
      villagerOpenedDoorTimers.set(key, 1.1);
      continue;
    }
    const stateId = world.getStateIdIfLoaded(x, y, z);
    if (stateId !== null && registry.getState(stateId).typeId === "door" && registry.getState(stateId).properties.open === true) {
      setDoorOpenFromState(x, y, z, stateId, false);
      sound.playPlace("wood");
    }
    villagerOpenedDoorTimers.delete(key);
  }

  for (const villager of villagers.villagers) {
    openNearestClosedDoorForVillager(villager);
  }
}

function openNearestClosedDoorForVillager(villager: Villager): void {
  const baseX = Math.floor(villager.position.x);
  const baseY = Math.floor(villager.position.y);
  const baseZ = Math.floor(villager.position.z);
  for (let dy = 0; dy <= 2; dy += 1) {
    for (let dz = -1; dz <= 1; dz += 1) {
      for (let dx = -1; dx <= 1; dx += 1) {
        const x = baseX + dx;
        const y = baseY + dy;
        const z = baseZ + dz;
        const stateId = world.getStateIdIfLoaded(x, y, z);
        if (stateId === null) {
          continue;
        }
        const state = registry.getState(stateId);
        if (state.typeId !== "door" || state.properties.open === true) {
          continue;
        }
        setDoorOpenFromState(x, y, z, stateId, true);
        const lowerY = state.properties.half === "upper" ? y - 1 : y;
        villagerOpenedDoorTimers.set(blockKey(x, lowerY, z), 2.4);
        sound.playPlace("wood");
        return;
      }
    }
  }
}

function isPlayerNearDoor(x: number, y: number, z: number): boolean {
  return Math.hypot(player.state.position.x - (x + 0.5), player.state.position.y - y, player.state.position.z - (z + 0.5)) < 2.1;
}

function isVillagerNearDoor(x: number, y: number, z: number): boolean {
  return villagers.villagers.some((villager) =>
    Math.hypot(villager.position.x - (x + 0.5), villager.position.y - y, villager.position.z - (z + 0.5)) < 1.7
  );
}

function updateVillageGuards(deltaSeconds: number): void {
  const result = villageGuards.step(
    world,
    deltaSeconds,
    hostileMobs.mobs
      .filter((mob) => mob.role === "zombie")
      .map((mob) => ({ id: mob.id, position: mob.position })),
    { playerPosition: player.state.position }
  );
  for (const attack of result.attacks) {
    const damageResult = hostileMobs.damageMob(attack.mobId, attack.damage, attack.knockback);
    if (!damageResult.mob) {
      continue;
    }
    sound.playMobHit();
    spawnCombatParticles(
      damageResult.mob.position,
      damageResult.died ? 20 : 10,
      [0xd8d8d8, 0xaeb6bc, 0xb93a3a]
    );
    if (damageResult.died) {
      sound.playMobDeath();
    }
  }
  if (result.playerDamage > 0) {
    const damage = applyArmorMitigatedDamage(result.playerDamage);
    if (damage > 0) {
      survival.applyDamage(damage);
      playDamageEffect();
      sound.playDamage();
    }
    for (const attack of result.playerAttacks) {
      spawnCombatParticles(attack.position, 7, [0xd8d9d2, 0xaeb6bc, 0xb93a3a]);
    }
    if (damage > 0 && survival.isDead()) {
      enterGameOver("guard");
    }
  }
}

function syncVillageSpawns(): void {
  for (const chunk of world.chunks.values()) {
    const key = meshKey(chunk.chunkX, chunk.chunkZ);
    if (scannedVillageChunkKeys.has(key)) {
      continue;
    }
    scannedVillageChunkKeys.add(key);
    for (const site of generator.villageSitesForChunk(chunk.chunkX, chunk.chunkZ)) {
      villagers.ensureVillage(site, world);
      const villagerCount = villagers.villagers.filter((villager) => villager.villageId === site.id).length;
      villageGuards.ensureVillage(site, world, villagerCount);
    }
  }
}

function syncVillagerObjects(): void {
  const aliveIds = new Set<number>();
  for (const villager of villagers.villagers) {
    aliveIds.add(villager.id);
    const object = villagerObjects.get(villager.id) ?? addVillagerObject(villager);
    const movedDx = villager.position.x - object.position.x;
    const movedDz = villager.position.z - object.position.z;
    object.position.set(villager.position.x, villager.position.y + VILLAGER_VISUAL_Y_OFFSET, villager.position.z);
    const pathTarget = villager.path[0] ?? null;
    let faceDx = movedDx;
    let faceDz = movedDz;
    if (Math.hypot(faceDx, faceDz) <= 0.015 && pathTarget) {
      faceDx = pathTarget.x - villager.position.x;
      faceDz = pathTarget.z - villager.position.z;
    }
    if (Math.hypot(faceDx, faceDz) <= 0.015) {
      faceDx = villager.target.x - villager.position.x;
      faceDz = villager.target.z - villager.position.z;
    }
    if (Math.hypot(faceDx, faceDz) > 0.05) {
      object.rotation.y = entityYawToward(faceDx, faceDz);
    } else {
      object.rotation.y = entityYawToward(
        player.state.position.x - villager.position.x,
        player.state.position.z - villager.position.z
      );
    }
    object.userData.villagerAge = villager.ageSeconds;
    const sleeping = villager.activeGoal === "sleep" && Math.hypot(villager.position.x - villager.home.x, villager.position.z - villager.home.z) < 1.35;
    object.rotation.z = sleeping ? 1.34 : 0;
    object.position.y = villager.position.y + VILLAGER_VISUAL_Y_OFFSET + (sleeping ? 0.18 : 0);
    const hurtFlash = object.children.find((child) => child.name === "villager-hurt-flash");
    if (hurtFlash) {
      hurtFlash.visible = villager.hurtTimeSeconds > 0;
    }
    const arms = object.children.filter((child) => child.name === "villager-arm");
    const alarmed = villager.bellAlarmSeconds > 0 || villager.activeGoal === "avoid_threat";
    const carryingFood = villagerFoodCount(villager, "wheat") > 0;
    arms.forEach((arm, index) => {
      arm.rotation.x = alarmed
        ? -1.02 + Math.sin(villager.ageSeconds * 9 + index * Math.PI) * 0.22
        : carryingFood
          ? -0.96 + Math.sin(villager.ageSeconds * 5.8 + index * 0.5) * 0.1
          : -0.82 + Math.sin(villager.ageSeconds * 4 + index * 0.5) * 0.08;
    });
    const alertIcon = object.getObjectByName("villager-alert-icon");
    if (alertIcon) {
      alertIcon.visible = alarmed && !sleeping;
      alertIcon.position.y = 2.58 + Math.sin(villager.ageSeconds * 7) * 0.06;
      alertIcon.scale.setScalar(1 + Math.sin(villager.ageSeconds * 10) * 0.08);
    }
    const levelPips = object.children.filter((child) => child.name === "villager-level-pip");
    levelPips.forEach((pip, index) => {
      pip.visible = index < villager.tradeLevel;
    });
    const carriedCrop = object.getObjectByName("villager-carried-crop");
    if (carriedCrop) {
      carriedCrop.visible = carryingFood || villager.foodShareFlashSeconds > 0;
      carriedCrop.position.y = 1.0 + (villager.foodShareFlashSeconds > 0 ? Math.sin(villager.ageSeconds * 18) * 0.045 : 0);
      carriedCrop.scale.setScalar(villager.foodShareFlashSeconds > 0 ? 1.16 : 1);
    }
    object.scale.setScalar(villager.hurtTimeSeconds > 0 ? 1.04 : alarmed ? 1.02 : villager.foodShareFlashSeconds > 0 ? 1.015 : 1);
  }

  for (const [id, object] of villagerObjects) {
    if (aliveIds.has(id)) {
      continue;
    }
    scene.remove(object);
    disposeChunkObject(object);
    villagerObjects.delete(id);
  }
}

function addVillagerObject(villager: Villager): THREE.Group {
  const group = new THREE.Group();
  group.name = "villager";
  group.position.set(villager.position.x, villager.position.y + VILLAGER_VISUAL_Y_OFFSET, villager.position.z);

  const robeColor = villager.profession === "farmer" ? 0x7d8f36 : villager.profession === "librarian" ? 0x8f4e35 : 0x6f7072;
  const skinMaterial = new THREE.MeshLambertMaterial({ color: 0xb88962 });
  const robeMaterial = new THREE.MeshLambertMaterial({ color: robeColor });
  const beltMaterial = new THREE.MeshLambertMaterial({ color: 0x3a2417 });
  const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x3d261c });
  const eyeSparkMaterial = new THREE.MeshBasicMaterial({ color: 0xf7ead6 });
  const cheekMaterial = new THREE.MeshBasicMaterial({ color: 0xd69a78, transparent: true, opacity: 0.72 });
  const mouthMaterial = new THREE.MeshBasicMaterial({ color: 0x6c3a2a });
  const hurtFlashMaterial = new THREE.MeshBasicMaterial({
    color: 0xff2b2b,
    transparent: true,
    opacity: 0.28,
    depthWrite: false
  });

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.64, 0.64), skinMaterial);
  head.position.set(0, 1.82, 0);
  group.add(head);

  const nose = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.16, 0.1), skinMaterial);
  nose.position.set(0, 1.76, -0.37);
  group.add(nose);

  const body = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.88, 0.42), robeMaterial);
  body.position.set(0, 1.07, 0);
  group.add(body);

  const belt = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.08, 0.45), beltMaterial);
  belt.position.set(0, 0.91, -0.01);
  group.add(belt);

  const leftArm = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.82, 0.22), robeMaterial);
  leftArm.name = "villager-arm";
  leftArm.position.set(-0.44, 1.18, -0.18);
  leftArm.rotation.z = -0.35;
  group.add(leftArm);

  const rightArm = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.82, 0.22), robeMaterial);
  rightArm.name = "villager-arm";
  rightArm.position.set(0.44, 1.18, -0.18);
  rightArm.rotation.z = 0.35;
  group.add(rightArm);

  const leftLeg = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.72, 0.26), robeMaterial);
  leftLeg.position.set(-0.15, 0.36, 0);
  group.add(leftLeg);

  const rightLeg = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.72, 0.26), robeMaterial);
  rightLeg.position.set(0.15, 0.36, 0);
  group.add(rightLeg);

  const leftEye = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.07, 0.022), eyeMaterial);
  leftEye.position.set(-0.14, 1.9, -0.333);
  group.add(leftEye);

  const rightEye = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.07, 0.022), eyeMaterial);
  rightEye.position.set(0.14, 1.9, -0.333);
  group.add(rightEye);

  const leftSpark = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.022, 0.024), eyeSparkMaterial);
  leftSpark.position.set(-0.125, 1.915, -0.346);
  group.add(leftSpark);

  const rightSpark = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.022, 0.024), eyeSparkMaterial);
  rightSpark.position.set(0.155, 1.915, -0.346);
  group.add(rightSpark);

  const leftCheek = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.045, 0.018), cheekMaterial);
  leftCheek.position.set(-0.22, 1.76, -0.335);
  group.add(leftCheek);

  const rightCheek = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.045, 0.018), cheekMaterial);
  rightCheek.position.set(0.22, 1.76, -0.335);
  group.add(rightCheek);

  const mouth = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.035, 0.02), mouthMaterial);
  mouth.position.set(0, 1.66, -0.338);
  group.add(mouth);

  addVillagerProfessionDetails(group, villager);

  const hurtFlash = new THREE.Mesh(new THREE.BoxGeometry(0.86, 2.14, 0.58), hurtFlashMaterial);
  hurtFlash.name = "villager-hurt-flash";
  hurtFlash.position.set(0, 1.08, 0);
  hurtFlash.visible = false;
  group.add(hurtFlash);

  const alertMaterial = new THREE.MeshBasicMaterial({ color: 0xffd34d, transparent: true, opacity: 0.95 });
  const alertIcon = new THREE.Group();
  alertIcon.name = "villager-alert-icon";
  alertIcon.position.set(0, 2.58, -0.08);
  alertIcon.visible = false;
  const alertStem = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.34, 0.04), alertMaterial);
  alertStem.position.set(0, 0.09, 0);
  alertIcon.add(alertStem);
  const alertDot = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.08, 0.04), alertMaterial);
  alertDot.position.set(0, -0.16, 0);
  alertIcon.add(alertDot);
  group.add(alertIcon);

  const carriedCrop = new THREE.Group();
  carriedCrop.name = "villager-carried-crop";
  carriedCrop.position.set(0.45, 1.0, -0.34);
  carriedCrop.rotation.z = -0.34;
  carriedCrop.visible = false;
  const cropStemMaterial = new THREE.MeshLambertMaterial({ color: 0xb9923f });
  const cropHeadMaterial = new THREE.MeshLambertMaterial({ color: 0xe0c766 });
  for (let index = 0; index < 3; index += 1) {
    const stem = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.28, 0.025), cropStemMaterial);
    stem.position.set((index - 1) * 0.055, 0, 0);
    stem.rotation.z = (index - 1) * 0.18;
    carriedCrop.add(stem);
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.09, 0.045), cropHeadMaterial);
    head.position.set((index - 1) * 0.06, 0.17, 0);
    head.rotation.z = (index - 1) * 0.18;
    carriedCrop.add(head);
  }
  group.add(carriedCrop);

  villagerObjects.set(villager.id, group);
  scene.add(group);
  return group;
}

function addVillagerProfessionDetails(group: THREE.Group, villager: Villager): void {
  const badgeMaterial = new THREE.MeshBasicMaterial({ color: villagerProfessionAccent(villager.profession) });
  const darkMaterial = new THREE.MeshBasicMaterial({ color: 0x24170f });

  if (villager.profession === "farmer") {
    const strawMaterial = new THREE.MeshLambertMaterial({ color: 0xd7b85f });
    const hatBandMaterial = new THREE.MeshLambertMaterial({ color: 0x6e4a22 });
    const brim = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.08, 0.78), strawMaterial);
    brim.position.set(0, 2.18, -0.01);
    group.add(brim);
    const crown = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.18, 0.48), strawMaterial);
    crown.position.set(0, 2.3, -0.01);
    group.add(crown);
    const band = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.045, 0.5), hatBandMaterial);
    band.position.set(0, 2.225, -0.012);
    group.add(band);
  } else if (villager.profession === "librarian") {
    const glassMaterial = new THREE.MeshBasicMaterial({ color: 0xf0ead6 });
    for (const x of [-0.14, 0.14]) {
      const lens = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.14, 0.018), glassMaterial);
      lens.position.set(x, 1.9, -0.352);
      group.add(lens);
    }
    const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.025, 0.018), glassMaterial);
    bridge.position.set(0, 1.9, -0.354);
    group.add(bridge);
    const bookCover = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.28, 0.06), new THREE.MeshLambertMaterial({ color: 0x6a2d3a }));
    bookCover.position.set(0.37, 1.0, -0.34);
    bookCover.rotation.z = -0.18;
    group.add(bookCover);
    const bookPages = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.22, 0.025), new THREE.MeshLambertMaterial({ color: 0xeadfc5 }));
    bookPages.position.set(0.37, 1.0, -0.375);
    bookPages.rotation.z = -0.18;
    group.add(bookPages);
  } else {
    const apronMaterial = new THREE.MeshLambertMaterial({ color: 0x55585a });
    const apron = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.52, 0.045), apronMaterial);
    apron.position.set(0, 1.12, -0.238);
    group.add(apron);
    const malletHandle = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.36, 0.055), new THREE.MeshLambertMaterial({ color: 0x6b4428 }));
    malletHandle.position.set(-0.39, 1.04, -0.32);
    malletHandle.rotation.z = -0.5;
    group.add(malletHandle);
    const malletHead = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.1, 0.09), new THREE.MeshLambertMaterial({ color: 0x8f9290 }));
    malletHead.position.set(-0.48, 1.18, -0.35);
    malletHead.rotation.z = -0.5;
    group.add(malletHead);
  }

  const badgeBack = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.13, 0.025), darkMaterial);
  badgeBack.position.set(0, 1.34, -0.235);
  group.add(badgeBack);
  for (let index = 0; index < 5; index += 1) {
    const pip = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.045, 0.028), badgeMaterial);
    pip.name = "villager-level-pip";
    pip.position.set(-0.084 + index * 0.042, 1.34, -0.252);
    pip.visible = index < villager.tradeLevel;
    group.add(pip);
  }
}

function villagerProfessionAccent(profession: Villager["profession"]): number {
  switch (profession) {
    case "farmer":
      return 0xe6c85b;
    case "librarian":
      return 0x8ac6ff;
    case "mason":
      return 0xd0d0c8;
  }
}

function clearVillagers(): void {
  villagers.clear();
  villagerOpenedDoorTimers.clear();
  for (const object of villagerObjects.values()) {
    scene.remove(object);
    disposeChunkObject(object);
  }
  villagerObjects.clear();
  villagerSpawnScanSeconds = 0;
  scannedVillageChunkKeys.clear();
}

function syncVillageGuardObjects(): void {
  const aliveIds = new Set<number>();
  for (const guard of villageGuards.guards) {
    aliveIds.add(guard.id);
    const object = villageGuardObjects.get(guard.id) ?? addVillageGuardObject(guard);
    const movedDx = guard.position.x - object.position.x;
    const movedDz = guard.position.z - object.position.z;
    object.position.set(guard.position.x, guard.position.y, guard.position.z);
    const target = guard.targetKind === "hostile" && guard.targetMobId !== null
      ? hostileMobs.mobs.find((mob) => mob.id === guard.targetMobId) ?? null
      : null;
    const pathTarget = guard.path[0] ?? null;
    let faceDx = movedDx;
    let faceDz = movedDz;
    if (Math.hypot(faceDx, faceDz) <= 0.015 && pathTarget) {
      faceDx = pathTarget.x - guard.position.x;
      faceDz = pathTarget.z - guard.position.z;
    }
    if (Math.hypot(faceDx, faceDz) <= 0.015 && guard.targetKind === "player") {
      faceDx = player.state.position.x - guard.position.x;
      faceDz = player.state.position.z - guard.position.z;
    } else if (Math.hypot(faceDx, faceDz) <= 0.015 && target) {
      faceDx = target.position.x - guard.position.x;
      faceDz = target.position.z - guard.position.z;
    }
    if (Math.hypot(faceDx, faceDz) <= 0.015) {
      faceDx = guard.velocity.x;
      faceDz = guard.velocity.z;
    }
    if (Math.hypot(faceDx, faceDz) > 0.05) {
      object.rotation.y = entityYawToward(faceDx, faceDz);
    }

    const healthFill = object.getObjectByName("guard-health-fill");
    if (healthFill) {
      healthFill.scale.x = Math.max(0.02, guard.health / 100);
    }
    const hurtFlash = object.getObjectByName("guard-hurt-flash");
    if (hurtFlash) {
      hurtFlash.visible = guard.hurtTimeSeconds > 0;
    }
    const alarmed = guard.alarmSeconds > 0 || guard.targetKind !== null;
    const alertIcon = object.getObjectByName("guard-alert-icon");
    if (alertIcon) {
      alertIcon.visible = alarmed;
      alertIcon.position.y = 3.08 + Math.sin(guard.ageSeconds * 8) * 0.055;
      alertIcon.scale.setScalar(1 + Math.sin(guard.ageSeconds * 11) * 0.08);
    }
    object.scale.setScalar(guard.hurtTimeSeconds > 0 ? 1.035 : alarmed ? 1.018 : 1);

    const leftArm = object.getObjectByName("guard-left-arm");
    const rightArm = object.getObjectByName("guard-right-arm");
    const speed = Math.hypot(guard.velocity.x, guard.velocity.z);
    if (leftArm) {
      leftArm.rotation.x = guard.swingSeconds > 0
        ? -1.45 + Math.sin(guard.swingSeconds * 22) * 0.25
        : alarmed
          ? -0.48 + Math.sin(guard.ageSeconds * 7.2) * Math.min(0.28, speed * 0.13)
          : Math.sin(guard.ageSeconds * 4.5) * Math.min(0.22, speed * 0.1);
    }
    if (rightArm) {
      rightArm.rotation.x = guard.swingSeconds > 0
        ? -1.25 + Math.sin(guard.swingSeconds * 24) * 0.25
        : alarmed
          ? -0.36 + Math.sin(guard.ageSeconds * 7.2 + Math.PI) * Math.min(0.28, speed * 0.13)
          : Math.sin(guard.ageSeconds * 4.5 + Math.PI) * Math.min(0.22, speed * 0.1);
    }
    const legs = object.children.filter((child) => child.name === "guard-leg");
    legs.forEach((leg, index) => {
      leg.rotation.x = Math.sin(guard.ageSeconds * 4.4 + index * Math.PI) * Math.min(0.26, speed * 0.12);
    });
  }

  for (const [id, object] of villageGuardObjects) {
    if (aliveIds.has(id)) {
      continue;
    }
    scene.remove(object);
    disposeChunkObject(object);
    villageGuardObjects.delete(id);
  }
}

function addVillageGuardObject(guard: VillageGuard): THREE.Group {
  const group = new THREE.Group();
  group.name = "village-guard";
  group.position.set(guard.position.x, guard.position.y, guard.position.z);

  const ironMaterial = new THREE.MeshLambertMaterial({ color: 0xd8d9d2 });
  const shadowMaterial = new THREE.MeshLambertMaterial({ color: 0xb4b7af });
  const vineMaterial = new THREE.MeshLambertMaterial({ color: 0x4e8f4f });
  const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0xba3a32 });

  const body = new THREE.Mesh(new THREE.BoxGeometry(1.02, 1.18, 0.56), ironMaterial);
  body.position.set(0, 1.48, 0);
  group.add(body);

  const chestPlate = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.24, 0.04), shadowMaterial);
  chestPlate.position.set(0, 1.68, -0.3);
  group.add(chestPlate);

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.64, 0.62), ironMaterial);
  head.position.set(0, 2.34, -0.03);
  group.add(head);

  const brow = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.08, 0.04), shadowMaterial);
  brow.position.set(0, 2.45, -0.36);
  group.add(brow);

  const leftEye = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.03), eyeMaterial);
  leftEye.position.set(-0.16, 2.36, -0.36);
  group.add(leftEye);
  const rightEye = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.03), eyeMaterial);
  rightEye.position.set(0.16, 2.36, -0.36);
  group.add(rightEye);

  const nose = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.22, 0.14), shadowMaterial);
  nose.position.set(0, 2.25, -0.42);
  group.add(nose);

  const leftArm = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.42, 0.32), ironMaterial);
  leftArm.name = "guard-left-arm";
  leftArm.position.set(-0.72, 1.28, -0.03);
  group.add(leftArm);

  const rightArm = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.42, 0.32), ironMaterial);
  rightArm.name = "guard-right-arm";
  rightArm.position.set(0.72, 1.28, -0.03);
  group.add(rightArm);

  const leftLeg = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.88, 0.34), shadowMaterial);
  leftLeg.name = "guard-leg";
  leftLeg.position.set(-0.24, 0.44, 0);
  group.add(leftLeg);

  const rightLeg = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.88, 0.34), shadowMaterial);
  rightLeg.name = "guard-leg";
  rightLeg.position.set(0.24, 0.44, 0);
  group.add(rightLeg);

  for (const [x, y, z, width, height] of [
    [-0.32, 1.94, -0.315, 0.08, 0.38],
    [0.24, 1.2, -0.315, 0.07, 0.46],
    [-0.76, 1.24, -0.22, 0.055, 0.52]
  ] as const) {
    const vine = new THREE.Mesh(new THREE.BoxGeometry(width, height, 0.035), vineMaterial);
    vine.position.set(x, y, z);
    group.add(vine);
  }

  const hurtFlash = new THREE.Mesh(
    new THREE.BoxGeometry(1.28, 2.72, 0.76),
    new THREE.MeshBasicMaterial({ color: 0xffdddd, transparent: true, opacity: 0.32, depthWrite: false })
  );
  hurtFlash.name = "guard-hurt-flash";
  hurtFlash.position.set(0, 1.36, 0);
  hurtFlash.visible = false;
  group.add(hurtFlash);

  const healthBack = new THREE.Mesh(
    new THREE.BoxGeometry(1.08, 0.06, 0.035),
    new THREE.MeshBasicMaterial({ color: 0x161616 })
  );
  healthBack.position.set(0, 2.86, 0);
  group.add(healthBack);

  const healthFill = new THREE.Mesh(
    new THREE.BoxGeometry(1.02, 0.038, 0.04),
    new THREE.MeshBasicMaterial({ color: 0xbfd7c3 })
  );
  healthFill.name = "guard-health-fill";
  healthFill.position.set(0, 2.86, -0.004);
  group.add(healthFill);

  const alertMaterial = new THREE.MeshBasicMaterial({ color: 0xff5a4d, transparent: true, opacity: 0.94 });
  const alertIcon = new THREE.Group();
  alertIcon.name = "guard-alert-icon";
  alertIcon.position.set(0, 3.08, -0.08);
  alertIcon.visible = false;
  const alertStem = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.38, 0.045), alertMaterial);
  alertStem.position.set(0, 0.11, 0);
  alertIcon.add(alertStem);
  const alertDot = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.09, 0.045), alertMaterial);
  alertDot.position.set(0, -0.18, 0);
  alertIcon.add(alertDot);
  group.add(alertIcon);

  villageGuardObjects.set(guard.id, group);
  scene.add(group);
  return group;
}

function clearVillageGuards(): void {
  villageGuards.clear();
  for (const object of villageGuardObjects.values()) {
    scene.remove(object);
    disposeChunkObject(object);
  }
  villageGuardObjects.clear();
}

function entityYawToward(dx: number, dz: number): number {
  return Math.atan2(dx, dz) + Math.PI;
}

function syncPassiveMobObjects(): void {
  const aliveIds = new Set<number>();
  for (const mob of passiveMobs.mobs) {
    aliveIds.add(mob.id);
    const object = passiveMobObjects.get(mob.id) ?? addPassiveMobObject(mob);
    object.position.set(mob.position.x, mob.position.y, mob.position.z);
    const speed = Math.hypot(mob.velocity.x, mob.velocity.z);
    if (speed > 0.05) {
      object.rotation.y = Math.atan2(mob.velocity.x, mob.velocity.z);
    }
    const hurtFlash = object.getObjectByName("passive-hurt-flash");
    if (hurtFlash) {
      hurtFlash.visible = mob.hurtTimeSeconds > 0;
    }
    object.scale.setScalar(mob.hurtTimeSeconds > 0 ? 1.04 : 1);
    const legs = object.children.filter((child) => child.name === "passive-leg");
    legs.forEach((leg, index) => {
      leg.rotation.x = Math.sin(mob.ageSeconds * 6 + index * Math.PI) * Math.min(0.42, speed * 0.18);
    });
  }

  for (const [id, object] of passiveMobObjects) {
    if (aliveIds.has(id)) {
      continue;
    }
    scene.remove(object);
    disposeChunkObject(object);
    passiveMobObjects.delete(id);
  }
}

function addPassiveMobObject(mob: PassiveMob): THREE.Group {
  const group = new THREE.Group();
  group.name = "passive-mob";
  group.position.set(mob.position.x, mob.position.y, mob.position.z);

  const pig = mob.role === "pig";
  const bodyMaterial = new THREE.MeshLambertMaterial({ color: pig ? 0xeaa0a9 : 0xf0eadc });
  const patchMaterial = new THREE.MeshLambertMaterial({ color: pig ? 0xd5808d : 0x3a3029 });
  const snoutMaterial = new THREE.MeshLambertMaterial({ color: pig ? 0xd98691 : 0xd9b38f });
  const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x1c1512 });

  const body = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.72, 1.14), bodyMaterial);
  body.position.set(0, 0.78, 0);
  group.add(body);

  if (!pig) {
    const patchA = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.28, 0.03), patchMaterial);
    patchA.position.set(-0.2, 0.92, -0.585);
    group.add(patchA);
    const patchB = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.3, 0.36), patchMaterial);
    patchB.position.set(0.465, 0.76, 0.18);
    group.add(patchB);
  }

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.54, 0.52), bodyMaterial);
  head.position.set(0, 1.08, -0.74);
  group.add(head);

  const snout = new THREE.Mesh(new THREE.BoxGeometry(pig ? 0.34 : 0.24, pig ? 0.22 : 0.18, 0.16), snoutMaterial);
  snout.position.set(0, 1.02, -1.04);
  group.add(snout);

  const leftEye = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.055, 0.022), eyeMaterial);
  leftEye.position.set(-0.14, 1.18, -1.01);
  group.add(leftEye);
  const rightEye = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.055, 0.022), eyeMaterial);
  rightEye.position.set(0.14, 1.18, -1.01);
  group.add(rightEye);

  for (const [x, z] of [[-0.28, -0.33], [0.28, -0.33], [-0.28, 0.36], [0.28, 0.36]]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.58, 0.2), pig ? bodyMaterial : patchMaterial);
    leg.name = "passive-leg";
    leg.position.set(x, 0.29, z);
    group.add(leg);
  }

  const hurt = new THREE.Mesh(
    new THREE.BoxGeometry(1.02, 0.82, 1.28),
    new THREE.MeshBasicMaterial({ color: 0xffdddd, transparent: true, opacity: 0.36 })
  );
  hurt.name = "passive-hurt-flash";
  hurt.position.set(0, 0.78, 0);
  hurt.visible = false;
  group.add(hurt);

  passiveMobObjects.set(mob.id, group);
  scene.add(group);
  return group;
}

function syncHostileMobObjects(): void {
  const aliveIds = new Set<number>();
  for (const mob of hostileMobs.mobs) {
    aliveIds.add(mob.id);
    const object = hostileMobObjects.get(mob.id) ?? addHostileMobObject(mob);
    object.position.set(mob.position.x, mob.position.y, mob.position.z);
    const dx = player.state.position.x - mob.position.x;
    const dz = player.state.position.z - mob.position.z;
    object.rotation.y = Math.atan2(dx, dz);
    object.userData.mobAge = mob.ageSeconds;
    object.userData.mobRole = mob.role;
    const healthFill = object.getObjectByName("mob-health-fill");
    if (healthFill) {
      healthFill.scale.x = Math.max(0.02, mob.health / 20);
    }
    const hurtFlash = object.getObjectByName("mob-hurt-flash");
    if (hurtFlash) {
      hurtFlash.visible = mob.hurtTimeSeconds > 0;
    }
    const fire = object.getObjectByName("mob-fire");
    if (fire) {
      fire.visible = mob.fireTimeSeconds > 0;
      fire.scale.y = 0.92 + Math.sin(mob.ageSeconds * 18) * 0.08;
    }
    const revealed = mob.bellRevealSeconds > 0;
    const revealMarker = object.getObjectByName("mob-bell-reveal-marker");
    if (revealMarker) {
      revealMarker.visible = revealed;
      revealMarker.position.y = 2.52 + Math.sin(mob.ageSeconds * 9) * 0.05;
      revealMarker.scale.setScalar(1 + Math.sin(mob.ageSeconds * 12) * 0.07);
    }
    const revealRing = object.getObjectByName("mob-bell-reveal-ring");
    if (revealRing) {
      revealRing.visible = revealed;
      revealRing.rotation.y = mob.ageSeconds * 2.2;
    }
    object.scale.setScalar(mob.hurtTimeSeconds > 0 ? 1.06 : revealed ? 1.025 : 1);
    const arms = object.children.filter((child) => child.name === "mob-arm");
    arms.forEach((arm, index) => {
      arm.rotation.x = mob.role === "skeleton"
        ? -0.82 + Math.sin(mob.ageSeconds * 9 + index * Math.PI) * 0.12
        : Math.sin(mob.ageSeconds * 7 + index * Math.PI) * 0.35;
    });
  }

  for (const [id, object] of hostileMobObjects) {
    if (aliveIds.has(id)) {
      continue;
    }
    scene.remove(object);
    disposeChunkObject(object);
    hostileMobObjects.delete(id);
  }
}

function addHostileMobObject(mob: HostileMob): THREE.Group {
  const group = new THREE.Group();
  group.name = "hostile-mob";
  group.position.set(mob.position.x, mob.position.y, mob.position.z);

  const skeleton = mob.role === "skeleton";
  const bodyMaterial = new THREE.MeshLambertMaterial({ color: skeleton ? 0xd8d2bd : 0x3f7f54 });
  const shirtMaterial = new THREE.MeshLambertMaterial({ color: skeleton ? 0xc7c0aa : 0x315a78 });
  const pantsMaterial = new THREE.MeshLambertMaterial({ color: skeleton ? 0x9d947e : 0x2e3f70 });
  const eyeMaterial = new THREE.MeshBasicMaterial({ color: skeleton ? 0x161616 : 0xffe6a8 });

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.62, 0.62), bodyMaterial);
  head.position.set(0, 1.78, 0);
  group.add(head);

  const body = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.78, 0.34), shirtMaterial);
  body.position.set(0, 1.08, 0);
  group.add(body);

  const leftArm = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.78, 0.22), bodyMaterial);
  leftArm.name = "mob-arm";
  leftArm.position.set(-0.52, 1.14, -0.08);
  group.add(leftArm);

  const rightArm = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.78, 0.22), bodyMaterial);
  rightArm.name = "mob-arm";
  rightArm.position.set(0.52, 1.14, -0.08);
  group.add(rightArm);

  const leftLeg = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.78, 0.24), pantsMaterial);
  leftLeg.position.set(-0.18, 0.38, 0);
  group.add(leftLeg);

  const rightLeg = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.78, 0.24), pantsMaterial);
  rightLeg.position.set(0.18, 0.38, 0);
  group.add(rightLeg);

  const leftEye = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.09, 0.02), eyeMaterial);
  leftEye.position.set(-0.14, 1.86, -0.32);
  group.add(leftEye);

  const rightEye = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.09, 0.02), eyeMaterial);
  rightEye.position.set(0.14, 1.86, -0.32);
  group.add(rightEye);

  if (skeleton) {
    const bowMaterial = new THREE.MeshLambertMaterial({ color: 0x6b4428 });
    const stringMaterial = new THREE.MeshBasicMaterial({ color: 0xdad2c4 });
    const bow = new THREE.Group();
    bow.name = "mob-bow";
    bow.position.set(0.58, 1.24, -0.32);
    bow.rotation.z = -0.28;
    const upper = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.56, 0.055), bowMaterial);
    upper.position.set(0, 0.2, 0);
    upper.rotation.z = 0.28;
    bow.add(upper);
    const lower = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.56, 0.055), bowMaterial);
    lower.position.set(0, -0.2, 0);
    lower.rotation.z = -0.28;
    bow.add(lower);
    const string = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.84, 0.025), stringMaterial);
    string.position.set(-0.13, 0, 0);
    bow.add(string);
    group.add(bow);
  }

  const fire = new THREE.Group();
  fire.name = "mob-fire";
  fire.visible = false;
  const flameOuterMaterial = new THREE.MeshBasicMaterial({ color: 0xff7a18, transparent: true, opacity: 0.64 });
  const flameInnerMaterial = new THREE.MeshBasicMaterial({ color: 0xfff1a8, transparent: true, opacity: 0.72 });
  const flameOuter = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.7, 0.08), flameOuterMaterial);
  flameOuter.position.set(0, 0.95, -0.34);
  flameOuter.rotation.z = 0.16;
  fire.add(flameOuter);
  const flameInner = new THREE.Mesh(new THREE.BoxGeometry(0.54, 1.25, 0.09), flameInnerMaterial);
  flameInner.position.set(0.02, 0.9, -0.39);
  flameInner.rotation.z = -0.14;
  fire.add(flameInner);
  group.add(fire);

  const hurtFlash = new THREE.Mesh(
    new THREE.BoxGeometry(0.84, 2.04, 0.46),
    new THREE.MeshBasicMaterial({ color: 0xff3344, transparent: true, opacity: 0.42 })
  );
  hurtFlash.name = "mob-hurt-flash";
  hurtFlash.position.set(0, 1.02, 0);
  hurtFlash.visible = false;
  group.add(hurtFlash);

  const healthBack = new THREE.Mesh(
    new THREE.BoxGeometry(0.82, 0.06, 0.035),
    new THREE.MeshBasicMaterial({ color: 0x161616 })
  );
  healthBack.name = "mob-health-back";
  healthBack.position.set(0, 2.28, 0);
  group.add(healthBack);

  const healthFill = new THREE.Mesh(
    new THREE.BoxGeometry(0.76, 0.038, 0.04),
    new THREE.MeshBasicMaterial({ color: 0xd84f4f })
  );
  healthFill.name = "mob-health-fill";
  healthFill.position.set(0, 2.28, -0.004);
  group.add(healthFill);

  const revealMaterial = new THREE.MeshBasicMaterial({ color: 0xffc247, transparent: true, opacity: 0.9, depthWrite: false });
  const revealMarker = new THREE.Group();
  revealMarker.name = "mob-bell-reveal-marker";
  revealMarker.position.set(0, 2.52, -0.05);
  revealMarker.visible = false;
  const markerStem = new THREE.Mesh(new THREE.BoxGeometry(0.085, 0.34, 0.045), revealMaterial);
  markerStem.position.set(0, 0.08, 0);
  revealMarker.add(markerStem);
  const markerDot = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.09, 0.045), revealMaterial);
  markerDot.position.set(0, -0.17, 0);
  revealMarker.add(markerDot);
  group.add(revealMarker);

  const revealRing = new THREE.Group();
  revealRing.name = "mob-bell-reveal-ring";
  revealRing.position.set(0, 0.12, 0);
  revealRing.visible = false;
  for (let index = 0; index < 4; index += 1) {
    const segment = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.035, 0.045), revealMaterial);
    segment.position.set(index < 2 ? 0 : index === 2 ? -0.38 : 0.38, 0, index < 2 ? (index === 0 ? -0.38 : 0.38) : 0);
    segment.rotation.y = index < 2 ? 0 : Math.PI / 2;
    revealRing.add(segment);
  }
  group.add(revealRing);

  hostileMobObjects.set(mob.id, group);
  scene.add(group);
  return group;
}

function syncHostileProjectiles(): void {
  const aliveIds = new Set<number>();
  for (const projectile of hostileMobs.projectiles) {
    aliveIds.add(projectile.id);
    const object = hostileProjectileObjects.get(projectile.id) ?? addHostileProjectileObject(projectile);
    object.position.set(projectile.position.x, projectile.position.y, projectile.position.z);
    object.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      new THREE.Vector3(projectile.velocity.x, projectile.velocity.y, projectile.velocity.z).normalize()
    );
  }

  for (const [id, object] of hostileProjectileObjects) {
    if (aliveIds.has(id)) {
      continue;
    }
    scene.remove(object);
    disposeChunkObject(object);
    hostileProjectileObjects.delete(id);
  }
}

function addHostileProjectileObject(projectile: HostileProjectile): THREE.Group {
  const group = new THREE.Group();
  group.name = "hostile-projectile";
  group.position.set(projectile.position.x, projectile.position.y, projectile.position.z);

  const shaft = new THREE.Mesh(
    new THREE.BoxGeometry(0.045, 0.045, 0.72),
    new THREE.MeshLambertMaterial({ color: 0x6a4a2d })
  );
  group.add(shaft);
  const tip = new THREE.Mesh(
    new THREE.BoxGeometry(0.075, 0.075, 0.12),
    new THREE.MeshLambertMaterial({ color: 0xcfd4d9 })
  );
  tip.position.z = 0.42;
  group.add(tip);
  const fletching = new THREE.Mesh(
    new THREE.BoxGeometry(0.16, 0.055, 0.12),
    new THREE.MeshLambertMaterial({ color: 0xe8e8df })
  );
  fletching.position.z = -0.36;
  group.add(fletching);

  hostileProjectileObjects.set(projectile.id, group);
  scene.add(group);
  return group;
}

function clearHostileMobs(): void {
  hostileMobs.clear();
  for (const object of hostileMobObjects.values()) {
    scene.remove(object);
    disposeChunkObject(object);
  }
  hostileMobObjects.clear();
  for (const object of hostileProjectileObjects.values()) {
    scene.remove(object);
    disposeChunkObject(object);
  }
  hostileProjectileObjects.clear();
}

function clearPassiveMobs(): void {
  passiveMobs.clear();
  for (const object of passiveMobObjects.values()) {
    scene.remove(object);
    disposeChunkObject(object);
  }
  passiveMobObjects.clear();
}

function addDroppedItemObject(item: DroppedItem): THREE.Group {
  const group = new THREE.Group();
  group.name = "dropped-item";
  group.position.set(item.position.x, item.position.y, item.position.z);

  const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(colorForDroppedItem(item)),
    transparent: true,
    opacity: 0.95
  });
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.28, 0.28), material);
  mesh.name = `dropped-${item.label}`;
  group.add(mesh);

  droppedItemObjects.set(item.id, group);
  scene.add(group);
  return group;
}

function hashUnit(x: number, y: number, z: number): number {
  let value = Math.imul(Math.floor(x * 97), 73856093);
  value ^= Math.imul(Math.floor(y * 97), 19349663);
  value ^= Math.imul(Math.floor(z * 97), 83492791);
  value = Math.imul(value ^ (value >>> 13), 1274126177);
  return ((value ^ (value >>> 16)) >>> 0) / 0xffffffff;
}

function addOrReplaceChunkObject(chunkX: number, chunkZ: number, mesh: ChunkMesh): void {
  const key = meshKey(chunkX, chunkZ);
  const existing = chunkObjects.get(key);
  if (existing) {
    scene.remove(existing);
    disposeChunkObject(existing);
  }

  const chunkObject = chunkMeshToThree(mesh, registry);
  chunkObject.position.set(chunkX * 16, 0, chunkZ * 16);
  registerFluidMaterials(chunkObject);
  chunkObjects.set(key, chunkObject);
  scene.add(chunkObject);
  const previousFaceCount = chunkFaceCounts.get(key) ?? 0;
  const nextFaceCount = meshFaceCount(mesh);
  chunkFaceCounts.set(key, nextFaceCount);
  totalFaces += nextFaceCount - previousFaceCount;
  const previousSectionCount = chunkSectionCounts.get(key) ?? 0;
  const nextSectionCount = chunkObject.children.length;
  chunkSectionCounts.set(key, nextSectionCount);
  visibleSectionMeshes += nextSectionCount - previousSectionCount;
}

function registerFluidMaterials(object: THREE.Object3D): void {
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh) || !child.name.startsWith("chunk-layer-fluid")) {
      return;
    }
    const materials = Array.isArray(child.material) ? child.material : [child.material];
    for (const material of materials) {
      if (material instanceof THREE.MeshBasicMaterial) {
        fluidMaterials.add(material);
      }
    }
  });
}

function updateLoadedChunksAroundPlayer(force = false): void {
  const centerChunkX = worldToChunkCoord(Math.floor(player.state.position.x));
  const centerChunkZ = worldToChunkCoord(Math.floor(player.state.position.z));
  if (!force && centerChunkX === loadedCenterChunkX && centerChunkZ === loadedCenterChunkZ) {
    return;
  }

  loadedCenterChunkX = centerChunkX;
  loadedCenterChunkZ = centerChunkZ;
  enqueueChunksAround(centerChunkX, centerChunkZ);
  pruneDistantChunkObjects(centerChunkX, centerChunkZ);
  pruneDistantChunkData(centerChunkX, centerChunkZ);
  recalculateTotalFaces();
}

function maybeEnsureCollisionTerrainAhead(forward: number, strafe: number, deltaSeconds: number): void {
  collisionPreloadAccumulator += deltaSeconds;
  const inputLength = Math.hypot(forward, strafe);
  const centerChunkX = worldToChunkCoord(Math.floor(player.state.position.x));
  const centerChunkZ = worldToChunkCoord(Math.floor(player.state.position.z));
  const probe = collisionPreloadProbe(forward, strafe, inputLength);
  const preloadKey = `${centerChunkX},${centerChunkZ}:${probe.chunkX},${probe.chunkZ}`;
  const maxDelay = inputLength > 0 ? 0.12 : 0.5;
  if (preloadKey === lastCollisionPreloadKey && collisionPreloadAccumulator < maxDelay) {
    return;
  }
  lastCollisionPreloadKey = preloadKey;
  collisionPreloadAccumulator = 0;
  ensureCollisionTerrainNear(player.state.position.x, player.state.position.z, 1);
  if (inputLength > 0) {
    ensureCollisionTerrainNear(probe.worldX, probe.worldZ, 1);
  }
}

function collisionPreloadProbe(
  forward: number,
  strafe: number,
  inputLength: number
): { worldX: number; worldZ: number; chunkX: number; chunkZ: number } {
  if (inputLength <= 0) {
    const worldX = player.state.position.x;
    const worldZ = player.state.position.z;
    return {
      worldX,
      worldZ,
      chunkX: worldToChunkCoord(Math.floor(worldX)),
      chunkZ: worldToChunkCoord(Math.floor(worldZ))
    };
  }
  const normalizedForward = forward / inputLength;
  const normalizedStrafe = strafe / inputLength;
  const probeDistance = CHUNK_SIZE * 0.9;
  const probeX = player.state.position.x + (normalizedStrafe * Math.cos(yaw) - normalizedForward * Math.sin(yaw)) * probeDistance;
  const probeZ = player.state.position.z + (-normalizedStrafe * Math.sin(yaw) - normalizedForward * Math.cos(yaw)) * probeDistance;
  return {
    worldX: probeX,
    worldZ: probeZ,
    chunkX: worldToChunkCoord(Math.floor(probeX)),
    chunkZ: worldToChunkCoord(Math.floor(probeZ))
  };
}

function ensureCollisionTerrainNear(worldX: number, worldZ: number, radiusChunks: number): void {
  const centerChunkX = worldToChunkCoord(Math.floor(worldX));
  const centerChunkZ = worldToChunkCoord(Math.floor(worldZ));
  const targets: { chunkX: number; chunkZ: number; distance: number }[] = [];
  for (let dz = -radiusChunks; dz <= radiusChunks; dz += 1) {
    for (let dx = -radiusChunks; dx <= radiusChunks; dx += 1) {
      targets.push({
        chunkX: centerChunkX + dx,
        chunkZ: centerChunkZ + dz,
        distance: Math.hypot(dx, dz)
      });
    }
  }
  targets.sort((a, b) => a.distance - b.distance);

  let syncGenerated = 0;
  for (const target of targets) {
    const key = meshKey(target.chunkX, target.chunkZ);
    const chunk = world.getChunk(target.chunkX, target.chunkZ);
    if (!chunk && chunkMeshWorkers.length > 0 && target.distance > 0) {
      if (!chunkLoadQueue.has(key) && !chunkObjectBuildQueue.has(key)) {
        chunkLoadQueue.set(key, { chunkX: target.chunkX, chunkZ: target.chunkZ });
      }
      if (!chunkMeshJobs.has(key)) {
        submitChunkMeshJob(key, target);
      }
      continue;
    }
    const liveChunk = chunk ?? world.getOrCreateChunk(target.chunkX, target.chunkZ);
    const needsTerrain = liveChunk.status !== "FULL" && liveChunk.status !== "LIGHT_PENDING" && liveChunk.status !== "LIT";
    if (needsTerrain && syncGenerated < 1 && target.distance === 0) {
      pipeline.advanceGenerated(liveChunk);
      syncGenerated += 1;
    }
    if (!chunkObjects.has(key) && !chunkLoadQueue.has(key) && !chunkObjectBuildQueue.has(key)) {
      chunkLoadQueue.set(key, { chunkX: target.chunkX, chunkZ: target.chunkZ });
    }
  }
}

function enqueueChunksAround(centerChunkX: number, centerChunkZ: number): void {
  const desiredKeys = new Set<string>();
  const candidates: { chunkX: number; chunkZ: number; priority: number }[] = [];
  const viewX = -Math.sin(yaw);
  const viewZ = -Math.cos(yaw);

  for (let dz = -chunkRadius; dz <= chunkRadius; dz += 1) {
    for (let dx = -chunkRadius; dx <= chunkRadius; dx += 1) {
      const chunkX = centerChunkX + dx;
      const chunkZ = centerChunkZ + dz;
      const key = meshKey(chunkX, chunkZ);
      desiredKeys.add(key);
      if (chunkObjects.has(key) || chunkLoadQueue.has(key) || chunkObjectBuildQueue.has(key)) {
        continue;
      }
      const distance = Math.hypot(dx, dz);
      const facing = distance === 0 ? 0 : (dx * viewX + dz * viewZ) / distance;
      candidates.push({
        chunkX,
        chunkZ,
        priority: distance * 3 - Math.max(0, facing) * 2
      });
    }
  }

  for (const key of chunkLoadQueue.keys()) {
    if (!desiredKeys.has(key)) {
      chunkLoadQueue.delete(key);
    }
  }

  for (const key of chunkObjectBuildQueue.keys()) {
    if (!desiredKeys.has(key)) {
      chunkObjectBuildQueue.delete(key);
    }
  }

  candidates.sort((a, b) => a.priority - b.priority);
  for (const candidate of candidates) {
    chunkLoadQueue.set(meshKey(candidate.chunkX, candidate.chunkZ), {
      chunkX: candidate.chunkX,
      chunkZ: candidate.chunkZ
    });
  }
}

function processChunkLoadQueue(maxStages = maxChunkStagesPerFrame): void {
  let processedStages = 0;
  let inspectedEntries = 0;
  const maxInspections = chunkLoadQueue.size;

  while (processedStages < maxStages && chunkLoadQueue.size > 0 && inspectedEntries < maxInspections) {
    const next = chunkLoadQueue.entries().next().value as [string, { chunkX: number; chunkZ: number }] | undefined;
    if (!next) {
      break;
    }
    inspectedEntries += 1;
    const [key, target] = next;
    const completedMesh = completedChunkMeshes.get(key);
    if (completedMesh) {
      completedChunkMeshes.delete(key);
      chunkRemeshRequests.delete(key);
      pipeline.meshes.set(key, completedMesh);
      world.getChunk(target.chunkX, target.chunkZ)?.markStatusAtLeast("FULL");
      enqueueChunkObjectBuild(target.chunkX, target.chunkZ, completedMesh, chunkObjects.has(key));
      chunkLoadQueue.delete(key);
      processedStages += 1;
      continue;
    }
    if (chunkMeshJobs.has(key)) {
      chunkLoadQueue.delete(key);
      chunkLoadQueue.set(key, target);
      continue;
    }
    if (chunkRemeshRequests.has(key)) {
      if (chunkMeshWorkers.length > 0) {
        const submitted = submitChunkMeshJob(key, target);
        chunkLoadQueue.delete(key);
        chunkLoadQueue.set(key, target);
        if (!submitted) {
          break;
        }
        processedStages += 1;
        continue;
      }
      const mesh = pipeline.remeshChunk(target.chunkX, target.chunkZ);
      chunkRemeshRequests.delete(key);
      enqueueChunkObjectBuild(target.chunkX, target.chunkZ, mesh, chunkObjects.has(key));
      chunkLoadQueue.delete(key);
      processedStages += 1;
      continue;
    }
    if (chunkObjects.has(key)) {
      chunkLoadQueue.delete(key);
      continue;
    }
    if (chunkObjectBuildQueue.has(key)) {
      chunkLoadQueue.delete(key);
      continue;
    }
    const chunk = world.getChunk(target.chunkX, target.chunkZ);
    if (!chunk && chunkMeshWorkers.length > 0) {
      const submitted = submitChunkMeshJob(key, target);
      chunkLoadQueue.delete(key);
      chunkLoadQueue.set(key, target);
      if (!submitted) {
        break;
      }
      processedStages += 1;
      continue;
    }
    const liveChunk = chunk ?? world.getOrCreateChunk(target.chunkX, target.chunkZ);
    if (liveChunk.status === "FULL") {
      const mesh = pipeline.meshes.get(key) ?? pipeline.remeshChunk(target.chunkX, target.chunkZ);
      enqueueChunkObjectBuild(target.chunkX, target.chunkZ, mesh);
      chunkLoadQueue.delete(key);
    } else if (liveChunk.status === "LIGHT_PENDING" || liveChunk.status === "LIT") {
      if (chunkMeshWorkers.length > 0) {
        const submitted = submitChunkMeshJob(key, target);
        chunkLoadQueue.delete(key);
        chunkLoadQueue.set(key, target);
        if (!submitted) {
          break;
        }
      } else if (liveChunk.status === "LIGHT_PENDING") {
        pipeline.lightEngine.recomputeChunkLocal(liveChunk);
      } else {
        const mesh = pipeline.mesher.buildChunkMesh(liveChunk, world);
        pipeline.meshes.set(key, mesh);
        liveChunk.advanceStatus("FULL");
        enqueueChunkObjectBuild(target.chunkX, target.chunkZ, mesh);
        chunkLoadQueue.delete(key);
      }
    } else {
      pipeline.advanceGenerated(liveChunk);
    }

    processedStages += 1;
  }
}

function enqueueChunkObjectBuild(chunkX: number, chunkZ: number, mesh: ChunkMesh, deferExisting = false): void {
  const key = meshKey(chunkX, chunkZ);
  if (chunkObjects.has(key) && !deferExisting) {
    addOrReplaceChunkObject(chunkX, chunkZ, mesh);
    return;
  }
  chunkObjectBuildQueue.set(key, { chunkX, chunkZ, mesh });
}

function processChunkObjectBuildQueue(maxBuilds: number): void {
  let built = 0;
  while (built < maxBuilds && chunkObjectBuildQueue.size > 0) {
    const next = takeNearestChunkObjectBuildTask();
    if (!next) {
      break;
    }
    const [key, task] = next;
    chunkObjectBuildQueue.delete(key);
    if (!world.getChunk(task.chunkX, task.chunkZ)) {
      pipeline.meshes.delete(key);
      completedChunkMeshes.delete(key);
      continue;
    }
    const startedAt = performance.now();
    addOrReplaceChunkObject(task.chunkX, task.chunkZ, task.mesh);
    recordPerfSample(chunkObjectBuildStats, performance.now() - startedAt);
    built += 1;
  }
}

function takeNearestChunkObjectBuildTask(): [string, ChunkObjectBuildTask] | null {
  let best: [string, ChunkObjectBuildTask] | null = null;
  let bestScore = Number.POSITIVE_INFINITY;
  const centerChunkX = worldToChunkCoord(Math.floor(player.state.position.x));
  const centerChunkZ = worldToChunkCoord(Math.floor(player.state.position.z));
  const viewX = -Math.sin(yaw);
  const viewZ = -Math.cos(yaw);

  for (const entry of chunkObjectBuildQueue) {
    const [, task] = entry;
    const dx = task.chunkX - centerChunkX;
    const dz = task.chunkZ - centerChunkZ;
    const distance = Math.hypot(dx, dz);
    const facing = distance === 0 ? 0 : (dx * viewX + dz * viewZ) / distance;
    const score = distance * 4 - Math.max(0, facing) * 2;
    if (score < bestScore) {
      best = entry;
      bestScore = score;
    }
  }
  return best;
}

function adaptiveChunkStageBudget(deltaSeconds: number): number {
  if (chunkLoadQueue.size === 0) {
    return 0;
  }
  if (deltaSeconds > 0.026) {
    return 0;
  }
  return maxChunkStagesPerFrame;
}

function adaptiveChunkObjectBuildBudget(deltaSeconds: number): number {
  if (chunkObjectBuildQueue.size === 0) {
    return 0;
  }
  if (!gameStarted) {
    return 3;
  }
  if (deltaSeconds > 0.028) {
    return 0;
  }
  if (chunkObjectBuildQueue.size > 16 && deltaSeconds < 0.017) {
    return 2;
  }
  return 1;
}

function createChunkMeshWorker(): Worker | null {
  if (typeof Worker === "undefined") {
    return null;
  }

  const worker = new Worker(new URL("../worker/chunkMeshWorker.ts", import.meta.url), { type: "module" });
  worker.onmessage = (event: MessageEvent<ChunkMeshWorkerResponse>) => {
    const response = event.data;
    if (response.type === "jobFailed") {
      for (const [key, jobId] of chunkMeshJobs) {
        if (jobId === response.id) {
          chunkMeshJobs.delete(key);
          chunkMeshJobStartedAt.delete(response.id);
          releaseChunkMeshJob(response.id);
          break;
        }
      }
      console.warn(`chunk mesh worker failed: ${response.message}`);
      return;
    }

    const key = meshKey(response.chunkX, response.chunkZ);
    chunkMeshJobs.delete(key);
    const startedAt = chunkMeshJobStartedAt.get(response.id);
    if (startedAt !== undefined) {
      recordPerfSample(workerMeshLatencyStats, performance.now() - startedAt);
      chunkMeshJobStartedAt.delete(response.id);
    }
    releaseChunkMeshJob(response.id);
    if (chunkLoadQueue.has(key) || chunkObjects.has(key)) {
      hydrateWorkerChunkData(response.chunkData);
      completedChunkMeshes.set(key, response.mesh);
    }
  };
  worker.onerror = (event) => {
    console.warn(`chunk mesh worker error: ${event.message}`);
  };
  return worker;
}

function hydrateWorkerChunkData(chunkData: ChunkDataTransfer): void {
  const chunk = world.getOrCreateChunk(chunkData.chunkX, chunkData.chunkZ);
  hydrateChunkDataTransfer(chunk, chunkData);
  chunkDeltaStore.applyToChunk(chunk, registry);
}

function createChunkMeshWorkers(): Worker[] {
  const workerCount = Math.max(1, Math.min(4, navigator.hardwareConcurrency ?? 4));
  const workers: Worker[] = [];
  for (let index = 0; index < workerCount; index += 1) {
    const worker = createChunkMeshWorker();
    if (worker) {
      workers.push(worker);
    }
  }
  return workers;
}

function submitChunkMeshJob(key: string, target: { chunkX: number; chunkZ: number }): boolean {
  if (chunkMeshWorkers.length === 0 || chunkMeshJobs.has(key)) {
    return false;
  }
  if (chunkMeshJobs.size >= chunkMeshJobBacklogLimit()) {
    return false;
  }

  const id = `mesh-${nextChunkMeshJobId}`;
  nextChunkMeshJobId += 1;
  chunkMeshJobs.set(key, id);
  chunkMeshJobStartedAt.set(id, performance.now());
  const workerIndex = chooseChunkMeshWorkerIndex(target.chunkX, target.chunkZ);
  const worker = chunkMeshWorkers[workerIndex];
  chunkMeshWorkerLoads[workerIndex] = (chunkMeshWorkerLoads[workerIndex] ?? 0) + 1;
  chunkMeshJobWorkerIndex.set(id, workerIndex);
  worker.postMessage({
    id,
    seed,
    chunkX: target.chunkX,
    chunkZ: target.chunkZ,
    chunkDeltas: collectChunkDeltasForMesh(target.chunkX, target.chunkZ)
  });
  return true;
}

function chooseChunkMeshWorkerIndex(chunkX: number, chunkZ: number): number {
  if (chunkMeshWorkers.length <= 1) {
    return 0;
  }

  const regionX = Math.floor(chunkX / 4);
  const regionZ = Math.floor(chunkZ / 4);
  const preferred = positiveHash2(regionX, regionZ) % chunkMeshWorkers.length;
  const leastLoaded = leastLoadedChunkMeshWorkerIndex();
  if ((chunkMeshWorkerLoads[preferred] ?? 0) <= (chunkMeshWorkerLoads[leastLoaded] ?? 0) + 1) {
    return preferred;
  }
  return leastLoaded;
}

function leastLoadedChunkMeshWorkerIndex(): number {
  let bestIndex = nextChunkMeshWorkerIndex % Math.max(1, chunkMeshWorkers.length);
  let bestLoad = chunkMeshWorkerLoads[bestIndex] ?? 0;
  for (let index = 0; index < chunkMeshWorkers.length; index += 1) {
    const load = chunkMeshWorkerLoads[index] ?? 0;
    if (load < bestLoad) {
      bestLoad = load;
      bestIndex = index;
    }
  }
  nextChunkMeshWorkerIndex = (bestIndex + 1) % Math.max(1, chunkMeshWorkers.length);
  return bestIndex;
}

function releaseChunkMeshJob(jobId: string): void {
  const workerIndex = chunkMeshJobWorkerIndex.get(jobId);
  if (workerIndex === undefined) {
    return;
  }
  chunkMeshJobWorkerIndex.delete(jobId);
  chunkMeshWorkerLoads[workerIndex] = Math.max(0, (chunkMeshWorkerLoads[workerIndex] ?? 0) - 1);
}

function positiveHash2(x: number, z: number): number {
  let value = Math.imul(x, 0x9e3779b1) ^ Math.imul(z, 0x85ebca6b);
  value ^= value >>> 16;
  return value >>> 0;
}

function chunkMeshJobBacklogLimit(): number {
  if (chunkMeshWorkers.length === 0) {
    return 0;
  }
  if (!gameStarted) {
    return chunkMeshWorkers.length * 3;
  }
  if (frameTimeStats.last > 24) {
    return chunkMeshWorkers.length;
  }
  if (frameTimeStats.last > 19) {
    return chunkMeshWorkers.length + 1;
  }
  return chunkMeshWorkers.length * 2;
}

function collectChunkDeltasForMesh(chunkX: number, chunkZ: number): StoredChunkDeltas[] {
  const entries: StoredChunkDeltas[] = [];
  for (let dz = -1; dz <= 1; dz += 1) {
    for (let dx = -1; dx <= 1; dx += 1) {
      const neighborX = chunkX + dx;
      const neighborZ = chunkZ + dz;
      const liveChunk = world.getChunk(neighborX, neighborZ);
      if (liveChunk && liveChunk.blockDeltas.size > 0) {
        entries.push(createStoredChunkDeltas(liveChunk));
        continue;
      }

      const stored = chunkDeltaStore.get(neighborX, neighborZ);
      if (stored) {
        entries.push(stored);
      }
    }
  }
  return entries;
}

function pruneDistantChunkObjects(centerChunkX: number, centerChunkZ: number): void {
  const keepRadius = chunkRadius + 1;
  for (const [key, object] of chunkObjects) {
    const [chunkX, chunkZ] = key.split(",").map(Number);
    if (Math.max(Math.abs(chunkX - centerChunkX), Math.abs(chunkZ - centerChunkZ)) <= keepRadius) {
      continue;
    }
    scene.remove(object);
    disposeChunkObject(object);
    chunkObjects.delete(key);
    totalFaces -= chunkFaceCounts.get(key) ?? 0;
    chunkFaceCounts.delete(key);
    visibleSectionMeshes -= chunkSectionCounts.get(key) ?? 0;
    chunkSectionCounts.delete(key);
    completedChunkMeshes.delete(key);
    chunkRemeshRequests.delete(key);
  }
}

function pruneDistantChunkData(centerChunkX: number, centerChunkZ: number): void {
  for (const [key, chunk] of Array.from(world.chunks)) {
    if (
      Math.max(Math.abs(chunk.chunkX - centerChunkX), Math.abs(chunk.chunkZ - centerChunkZ)) <= chunkDataKeepRadius
    ) {
      continue;
    }

    if (chunk.blockDeltas.size > 0) {
      chunkDeltaStore.capture(chunk);
    }
    world.unloadChunk(chunk.chunkX, chunk.chunkZ);
    pipeline.meshes.delete(key);
    completedChunkMeshes.delete(key);
    chunkLoadQueue.delete(key);
    chunkObjectBuildQueue.delete(key);
    chunkRemeshRequests.delete(key);
    const jobId = chunkMeshJobs.get(key);
    if (jobId) {
      chunkMeshJobStartedAt.delete(jobId);
      chunkMeshJobs.delete(key);
    }
  }
}

function disposeChunkObject(object: THREE.Group): void {
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) {
      return;
    }
    child.geometry.dispose();
    const materials = Array.isArray(child.material) ? child.material : [child.material];
    for (const material of materials) {
      if (material.userData.sharedTerrainMaterial === true) {
        continue;
      }
      if (material instanceof THREE.MeshBasicMaterial) {
        fluidMaterials.delete(material);
        if (child.name.startsWith("chunk-layer-fluid")) {
          material.map?.dispose();
        }
      }
      material.dispose();
    }
  });
}

function updateWaterAnimation(timeSeconds: number): void {
  for (const material of fluidMaterials) {
    if (!material.map) {
      continue;
    }
    material.map.offset.set((timeSeconds * 0.015) % 1, (timeSeconds * 0.009) % 1);
    material.opacity = 0.56 + Math.sin(timeSeconds * 0.8) * 0.025;
  }
}

function updateFluidSimulation(deltaSeconds: number): void {
  fluidTickAccumulator += deltaSeconds;
  if (
    fluidTickAccumulator < 0.35 ||
    chunkLoadQueue.size > 0 ||
    chunkObjectBuildQueue.size > 0 ||
    longFrameTimeStats.last > 28
  ) {
    return;
  }
  fluidTickAccumulator = 0;
  const edits = simulateFluids(world, registry, {
    centerX: Math.floor(player.state.position.x),
    centerZ: Math.floor(player.state.position.z),
    radiusChunks: 1,
    maxEdits: 8,
    maxColumnScans: 96
  });
  if (edits.length === 0) {
    return;
  }
  const changedChunks = applyFluidEdits(world, edits);
  for (const key of changedChunks) {
    const [chunkX, chunkZ] = key.split(",").map(Number);
    if (!chunkObjects.has(key) || !world.getChunk(chunkX, chunkZ)) {
      continue;
    }
    pipeline.meshes.delete(key);
    chunkRemeshRequests.add(key);
    chunkLoadQueue.set(key, { chunkX, chunkZ });
  }
}

function rescuePlayerFromUnloadedVoid(): void {
  if (player.state.position.y >= WORLD_MIN_Y + 2) {
    return;
  }
  const worldX = Math.floor(player.state.position.x);
  const worldZ = Math.floor(player.state.position.z);
  ensureCollisionTerrainNear(worldX, worldZ, 1);
  const chunk = world.getChunk(worldToChunkCoord(worldX), worldToChunkCoord(worldZ));
  if (!chunk) {
    return;
  }
  const localX = positiveMod(worldX, CHUNK_SIZE);
  const localZ = positiveMod(worldZ, CHUNK_SIZE);
  const surfaceY = Math.max(chunk.heightmaps.get("MOTION_BLOCKING_NO_LEAVES", localX, localZ), generator.sampleSurfaceHeight(worldX, worldZ));
  player.state.position = {
    x: player.state.position.x,
    y: surfaceY + 1.02,
    z: player.state.position.z
  };
  player.state.velocity = { x: 0, y: 0, z: 0 };
  player.state.onGround = true;
  fallPeakY = player.state.position.y;
  smoothedEyeY = player.eyePosition().y;
}

function positiveMod(value: number, modulus: number): number {
  return ((value % modulus) + modulus) % modulus;
}

function recalculateTotalFaces(): void {
  totalFaces = 0;
  for (const count of chunkFaceCounts.values()) {
    totalFaces += count;
  }
  visibleSectionMeshes = 0;
  for (const count of chunkSectionCounts.values()) {
    visibleSectionMeshes += count;
  }
}

function updateCropGrowth(deltaSeconds: number): void {
  cropTickAccumulator += deltaSeconds;
  if (cropTickAccumulator < 1.2) {
    return;
  }
  cropTickAccumulator = 0;
  const centerX = Math.floor(player.state.position.x);
  const centerZ = Math.floor(player.state.position.z);
  const centerY = Math.floor(player.state.position.y);
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const x = centerX + Math.floor(hashUnit(centerX, attempt, dayNight.timeOfDay) * 25) - 12;
    const z = centerZ + Math.floor(hashUnit(centerZ, dayNight.timeOfDay, attempt) * 25) - 12;
    const yBase = world.getMotionBlockingHeightLoaded(x, z);
    if (yBase === null || yBase === undefined) {
      continue;
    }
    for (let y = Math.max(WORLD_MIN_Y, Math.min(yBase + 1, centerY + 4)); y >= Math.max(WORLD_MIN_Y, centerY - 8); y -= 1) {
      const stateId = world.getStateIdIfLoaded(x, y, z);
      if (stateId === null) {
        continue;
      }
      const state = registry.getState(stateId);
      if (state.typeId !== "wheat") {
        continue;
      }
      const age = typeof state.properties.age === "number" ? state.properties.age : 7;
      if (age >= 7) {
        break;
      }
      const hydratedBonus = isWaterNearCrop(x, y - 1, z) ? 0.45 : 0.16;
      if (hashUnit(x, y + age, z + Math.floor(dayNight.timeOfDay)) < hydratedBonus) {
        applyBlockEdit(x, y, z, registry.resolveState("wheat", { age: age + 1 }));
      }
      break;
    }
  }
}

type FarmerWorkTarget = {
  kind: "harvest" | "replant";
  cropX: number;
  cropY: number;
  cropZ: number;
  distance: number;
};

function updateFarmerWork(deltaSeconds: number): void {
  farmerWorkAccumulator += deltaSeconds;
  if (farmerWorkAccumulator < FARMER_WORK_INTERVAL_SECONDS) {
    return;
  }
  farmerWorkAccumulator = 0;
  const farmers = villagers.villagers.filter((villager) =>
    villager.profession === "farmer" &&
    villager.schedule === "work" &&
    villager.health > 0 &&
    villager.bellAlarmSeconds <= 0
  );
  if (farmers.length === 0) {
    return;
  }
  const farmer = farmers[nextFarmerWorkIndex % farmers.length];
  nextFarmerWorkIndex = (nextFarmerWorkIndex + 1) % Math.max(1, farmers.length);
  const target = findFarmerWorkTarget(farmer);
  if (!target) {
    return;
  }
  if (target.distance > FARMER_WORK_ACTION_RANGE) {
    sendFarmerToWorkTarget(farmer, target);
    return;
  }
  if (target.kind === "harvest") {
    harvestWheatByFarmer(farmer, target);
    return;
  }
  replantWheatByFarmer(farmer, target);
}

function findFarmerWorkTarget(farmer: Villager): FarmerWorkTarget | null {
  const anchors = [
    farmer.position,
    farmer.workstation,
    farmer.target,
    farmer.meetingPoint
  ].filter((anchor): anchor is Vec3Like => anchor !== null);
  let best: FarmerWorkTarget | null = null;
  for (const anchor of anchors) {
    const anchorX = Math.floor(anchor.x);
    const anchorY = Math.floor(anchor.y);
    const anchorZ = Math.floor(anchor.z);
    for (let dz = -FARMER_WORK_SEARCH_RADIUS; dz <= FARMER_WORK_SEARCH_RADIUS; dz += 1) {
      for (let dx = -FARMER_WORK_SEARCH_RADIUS; dx <= FARMER_WORK_SEARCH_RADIUS; dx += 1) {
        const horizontal = Math.hypot(dx, dz);
        if (horizontal > FARMER_WORK_SEARCH_RADIUS) {
          continue;
        }
        const x = anchorX + dx;
        const z = anchorZ + dz;
        const surfaceY = world.getMotionBlockingHeightLoaded(x, z);
        const minY = Math.max(WORLD_MIN_Y, Math.min(anchorY, surfaceY ?? anchorY) - 4);
        const maxY = Math.max(anchorY, surfaceY ?? anchorY) + 4;
        for (let y = maxY; y >= minY; y -= 1) {
          const candidate = farmerWorkTargetAt(farmer, x, y, z);
          if (!candidate) {
            continue;
          }
          if (!best || workTargetRank(candidate) < workTargetRank(best)) {
            best = candidate;
          }
          break;
        }
      }
    }
  }
  return best;
}

function farmerWorkTargetAt(farmer: Villager, x: number, y: number, z: number): FarmerWorkTarget | null {
  const stateId = world.getStateIdIfLoaded(x, y, z);
  if (stateId === null) {
    return null;
  }
  const state = registry.getState(stateId);
  if (state.typeId === "wheat") {
    const age = typeof state.properties.age === "number" ? state.properties.age : 0;
    if (age < 7) {
      return null;
    }
    return {
      kind: "harvest",
      cropX: x,
      cropY: y,
      cropZ: z,
      distance: distanceToCrop(farmer, x, y, z)
    };
  }
  if (state.typeId !== "farmland" || world.getStateIdIfLoaded(x, y + 1, z) !== AIR_STATE_ID) {
    return null;
  }
  return {
    kind: "replant",
    cropX: x,
    cropY: y + 1,
    cropZ: z,
    distance: distanceToCrop(farmer, x, y + 1, z)
  };
}

function workTargetRank(target: FarmerWorkTarget): number {
  return target.distance + (target.kind === "harvest" ? 0 : 1.2);
}

function distanceToCrop(farmer: Villager, x: number, y: number, z: number): number {
  const horizontal = Math.hypot(farmer.position.x - (x + 0.5), farmer.position.z - (z + 0.5));
  return horizontal + Math.abs(farmer.position.y - y) * 0.45;
}

function sendFarmerToWorkTarget(farmer: Villager, target: FarmerWorkTarget): void {
  farmer.target = { x: target.cropX + 0.5, y: target.cropY, z: target.cropZ + 0.5 };
  farmer.path = [];
  farmer.pathTarget = null;
  farmer.activeGoal = "work";
  farmer.idleSeconds = 0;
}

function harvestWheatByFarmer(farmer: Villager, target: FarmerWorkTarget): void {
  const stateId = world.getStateIdIfLoaded(target.cropX, target.cropY, target.cropZ);
  if (stateId === null || registry.getState(stateId).typeId !== "wheat") {
    return;
  }
  const position = {
    x: target.cropX + 0.5,
    y: target.cropY + 0.45,
    z: target.cropZ + 0.5
  };
  applyBlockEdit(target.cropX, target.cropY, target.cropZ, AIR_STATE_ID);
  spawnItemDrop("wheat", position, 1);
  addVillagerFood(farmer, "wheat", 1);
  const spareSeeds = Math.floor(hashUnit(target.cropX, target.cropY + Math.floor(dayNight.timeOfDay), target.cropZ) * 2);
  if (spareSeeds > 0) {
    spawnItemDrop("seeds", position, spareSeeds);
  }
  if (registry.getState(world.getStateIdIfLoaded(target.cropX, target.cropY - 1, target.cropZ) ?? AIR_STATE_ID).typeId === "farmland") {
    applyBlockEdit(target.cropX, target.cropY, target.cropZ, registry.resolveState("wheat", { age: 0 }));
  }
  markFarmerWorkAnimation(farmer, position, [0xd9c56a, 0x79a844]);
}

function replantWheatByFarmer(farmer: Villager, target: FarmerWorkTarget): void {
  if (
    registry.getState(world.getStateIdIfLoaded(target.cropX, target.cropY - 1, target.cropZ) ?? AIR_STATE_ID).typeId !== "farmland" ||
    world.getStateIdIfLoaded(target.cropX, target.cropY, target.cropZ) !== AIR_STATE_ID
  ) {
    return;
  }
  applyBlockEdit(target.cropX, target.cropY, target.cropZ, registry.resolveState("wheat", { age: 0 }));
  markFarmerWorkAnimation(farmer, { x: target.cropX + 0.5, y: target.cropY + 0.25, z: target.cropZ + 0.5 }, [0x86b957, 0xc8b15a]);
}

function markFarmerWorkAnimation(farmer: Villager, position: Vec3Like, colors: number[]): void {
  farmer.idleSeconds = Math.max(farmer.idleSeconds, 0.8);
  if (Math.hypot(player.state.position.x - position.x, player.state.position.z - position.z) <= 20) {
    sound.playPlace("grass");
  }
  spawnCombatParticles(position, 4, colors);
}

function isWaterNearCrop(x: number, y: number, z: number): boolean {
  for (let dz = -4; dz <= 4; dz += 1) {
    for (let dx = -4; dx <= 4; dx += 1) {
      const stateId = world.getStateIdIfLoaded(x + dx, y, z + dz);
      if (stateId !== null && registry.getState(stateId).typeId === "water") {
        return true;
      }
    }
  }
  return false;
}

function updateHotbar(): void {
  hotbarSlots.forEach((slot, index) => {
    slot.classList.toggle("selected", index === inventory.selectedIndex);
    const itemSlot = inventory.slots[index] ?? hotbarSlot("empty", null, 0);
    const stateId = itemSlot.stateId;
    slot.classList.toggle("empty", stateId === null && !itemSlot.food && !itemSlot.tool && !itemSlot.armor);
    slot.title = itemSlot.label;
    slot.style.setProperty("--slot-color", hotbarColor(itemSlot));
    slot.style.setProperty("--durability", durabilityPercent(itemSlot));
    const item = slot.querySelector<HTMLElement>(".hotbar-item");
    const count = slot.querySelector<HTMLElement>(".hotbar-count");
    slot.classList.toggle("has-durability", !!itemSlot.tool || !!itemSlot.armor);
    if (item) {
      item.className = `hotbar-item ${hotbarItemClass(itemSlot)}`;
    }
    if (count) {
      count.textContent = itemSlot.count > 1 && !itemSlot.tool && !itemSlot.armor ? String(itemSlot.count) : "";
    }
  });
  updateHeldItem();
  updateCraftingPanel();
}

function toggleCraftingPanel(): void {
  if (craftingOpen) {
    closeCraftingPanel({ requestPointerLock: true });
    return;
  }
  openCraftingPanel("player");
}

function closeCraftingPanel(options: { requestPointerLock?: boolean } = {}): void {
  if (!craftingOpen && activeTradingVillagerId === null && activeContainerKey === null) {
    return;
  }
  craftingOpen = false;
  activeTradingVillagerId = null;
  activeContainerKey = null;
  updateCraftingPanel();
  if (options.requestPointerLock && gameStarted && !pauseOpen && !gameOver) {
    requestPointerLockSafe();
  }
}

function openCraftingPanel(mode: CraftingMode): void {
  if (pauseOpen) {
    return;
  }
  if (mode !== "chest") {
    activeContainerKey = null;
  }
  if (mode !== "trade") {
    activeTradingVillagerId = null;
  }
  craftingMode = mode;
  craftingOpen = true;
  if (craftingOpen && document.pointerLockElement === renderer.domElement) {
    releasePointerLockForUi();
  }
  cancelMining();
  updateCraftingPanel();
}

function openChestPanel(worldX: number, worldY: number, worldZ: number): void {
  activeContainerKey = blockKey(worldX, worldY, worldZ);
  if (!containers.has(activeContainerKey)) {
    containers.set(activeContainerKey, createEmptySlots(CHEST_SIZE));
  }
  openCraftingPanel("chest");
}

function openTradePanel(villagerId: number): void {
  activeTradingVillagerId = villagerId;
  openCraftingPanel("trade");
}

function updateCraftingPanel(): void {
  if (!craftingPanel) {
    return;
  }
  craftingPanel.classList.toggle("visible", craftingOpen);
  app.classList.toggle("crafting-open", craftingOpen);
  craftingPanel.replaceChildren();
  craftingPanel.classList.toggle("workbench", craftingMode === "workbench");
  craftingPanel.classList.toggle("furnace", craftingMode === "furnace");
  craftingPanel.classList.toggle("chest", craftingMode === "chest");
  craftingPanel.classList.toggle("trade", craftingMode === "trade");
  craftingPanel.classList.toggle("inventory", craftingMode === "player");

  const header = document.createElement("div");
  header.className = "crafting-header";
  const title = document.createElement("div");
  title.className = "crafting-title";
  title.textContent = craftingPanelTitle();
  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "crafting-close";
  closeButton.title = "閉じる";
  closeButton.textContent = "×";
  closeButton.addEventListener("click", () => closeCraftingPanel({ requestPointerLock: true }));
  header.append(title, closeButton);
  craftingPanel.appendChild(header);

  if (craftingMode === "chest") {
    craftingPanel.appendChild(createChestPanel());
    craftingPanel.appendChild(createInventoryStrip());
    return;
  }

  if (craftingMode === "trade") {
    craftingPanel.appendChild(createTradePanel());
    craftingPanel.appendChild(createInventoryStrip());
    return;
  }

  if (craftingMode === "player") {
    craftingPanel.appendChild(createEquipmentPanel());
  }

  const workspace = document.createElement("div");
  workspace.className = "crafting-workspace";
  const gridClass = craftingMode === "workbench" ? "grid-3" : craftingMode === "furnace" ? "grid-furnace" : "grid-2";
  const gridCells = craftingMode === "workbench" ? 9 : craftingMode === "furnace" ? 2 : 4;
  workspace.innerHTML = `
    <div class="crafting-grid ${gridClass}">
      ${Array.from({ length: gridCells }, (_, index) => `<span class="crafting-cell ${craftingMode === "furnace" && index === 1 ? "fuel-cell" : ""}"></span>`).join("")}
    </div>
    <div class="crafting-arrow"></div>
    <div class="crafting-result-slot"><span class="crafting-output-preview"></span></div>
  `;
  craftingPanel.appendChild(workspace);

  const hint = document.createElement("div");
  hint.className = "crafting-hint";
  hint.textContent = craftingMode === "furnace"
    ? "鉱石素材と石炭を消費してインゴットへ精錬。"
    : craftingMode === "workbench"
      ? "3x3 レシピ"
      : "2x2 クラフトと装備。作業台を置いて右クリックすると3x3。";
  craftingPanel.appendChild(hint);

  if (craftingMode === "player") {
    craftingPanel.appendChild(createInventoryStrip());
  }

  for (const recipe of craftingRecipes.filter(recipeAvailableForStation)) {
    const output = recipe.output();
    const craftable = canCraftRecipe(recipe, output);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "crafting-recipe";
    button.disabled = !craftable;
    button.classList.toggle("locked", !recipeAvailableForStation(recipe));
    button.innerHTML = `
      <span class="crafting-output ${hotbarItemClass(output)}"></span>
      <span class="crafting-name">${recipe.label}</span>
      <span class="crafting-cost">${formatRecipeCost(recipe)}</span>
    `;
    button.addEventListener("click", () => craftRecipe(recipe));
    craftingPanel.appendChild(button);
  }
}

function craftingPanelTitle(): string {
  if (craftingMode === "chest") {
    return "チェスト";
  }
  if (craftingMode === "furnace") {
    return "かまど";
  }
  if (craftingMode === "workbench") {
    return "作業台";
  }
  if (craftingMode === "trade") {
    const villager = activeTradingVillager();
    return villager ? `${villagerProfessionName(villager.profession)}との取引` : "取引";
  }
  return "インベントリ";
}

function createTradePanel(): HTMLElement {
  const container = document.createElement("div");
  container.className = "trade-panel";
  const villager = activeTradingVillager();
  if (!villager) {
    const empty = document.createElement("div");
    empty.className = "crafting-hint";
    empty.textContent = "村人が近くにいません。";
    container.appendChild(empty);
    return container;
  }

  const portrait = document.createElement("div");
  portrait.className = `trade-portrait profession-${villager.profession}`;
  portrait.innerHTML = `
    <span class="trade-face"></span>
    <span class="trade-nose"></span>
    <span class="trade-eye left"></span>
    <span class="trade-eye right"></span>
  `;

  const intro = document.createElement("div");
  intro.className = "trade-intro";
  const nextLevelXp = villagerXpForNextLevel(villager);
  const levelProgress = nextLevelXp === null ? 1 : Math.max(0, Math.min(1, villager.tradeXp / nextLevelXp));
  const reputationLabel = villager.reputation > 0 ? `評判 +${villager.reputation}` : `評判 ${villager.reputation}`;
  const carriedWheat = villagerFoodCount(villager, "wheat");
  intro.innerHTML = `
    <strong>${villagerProfessionName(villager.profession)} Lv.${villager.tradeLevel} ${villagerTradeLevelName(villager.tradeLevel)}</strong>
    <span>${villagerTradeGreeting(villager.profession)}</span>
    <span class="trade-xp"><i style="width: ${Math.round(levelProgress * 100)}%"></i></span>
    <span class="trade-xp-label">${nextLevelXp === null ? "最高レベル" : `経験値 ${villager.tradeXp}/${nextLevelXp}`} / ${reputationLabel}</span>
    ${carriedWheat > 0 ? `<span class="trade-carried">所持作物: 小麦 ${carriedWheat}</span>` : ""}
  `;
  container.append(portrait, intro);

  const help = document.createElement("div");
  help.className = "trade-help";
  help.textContent = "材料が揃った取引をクリック。売り切れは仕事場で補充されます。Esc / × / E / I で閉じます。";
  container.appendChild(help);

  for (const recipe of tradeRecipes.filter((candidate) => candidate.villager === villager.profession)) {
    const output = recipe.output();
    const ingredients = adjustedTradeIngredients(recipe, villager);
    const remainingUses = villagerTradeUsesRemaining(villager, recipe.id, recipe.maxUses);
    const levelLocked = villager.tradeLevel < recipe.requiredLevel;
    const canTrade = canTradeRecipe(recipe, output);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `trade-recipe ${remainingUses <= 0 ? "sold-out" : ""} ${levelLocked ? "level-locked" : ""}`;
    button.disabled = !canTrade;
    button.innerHTML = `
      <span class="trade-cost">${formatIngredientCost(ingredients)}</span>
      <span class="trade-arrow">→</span>
      <span class="crafting-output ${hotbarItemClass(output)}"></span>
      <span class="crafting-name">${recipe.label}</span>
      <span class="trade-stock">${levelLocked ? `Lv.${recipe.requiredLevel}で解放` : remainingUses <= 0 ? "売り切れ" : `在庫 ${remainingUses}/${recipe.maxUses}`}</span>
    `;
    button.addEventListener("click", () => tradeRecipe(recipe));
    container.appendChild(button);
  }
  return container;
}

function activeTradingVillager(): Villager | null {
  return villagers.villagers.find((villager) => villager.id === activeTradingVillagerId) ?? null;
}

function adjustedTradeIngredients(recipe: TradeRecipe, villager: Villager): RecipeIngredient[] {
  const multiplier = tradePriceMultiplierForReputation(villager.reputation);
  return recipe.ingredients.map((ingredient) => ({
    label: ingredient.label,
    count: Math.max(1, Math.ceil(ingredient.count * multiplier))
  }));
}

function canTradeRecipe(recipe: TradeRecipe, output = recipe.output()): boolean {
  const villager = activeTradingVillager();
  if (!villager) {
    return false;
  }
  const ingredients = adjustedTradeIngredients(recipe, villager);
  return villager.tradeLevel >= recipe.requiredLevel &&
    canUseVillagerTrade(villager, recipe.id, recipe.maxUses) &&
    inventory.hasItems(ingredients) &&
    canFitOutput(output);
}

function tradeRecipe(recipe: TradeRecipe): void {
  const villager = activeTradingVillager();
  if (!villager) {
    return;
  }
  const output = recipe.output();
  const ingredients = adjustedTradeIngredients(recipe, villager);
  if (!canTradeRecipe(recipe, output) || !inventory.removeItems(ingredients)) {
    return;
  }
  if (!addCraftedOutput(output)) {
    refundIngredients(ingredients);
    updateCraftingPanel();
    return;
  }
  recordVillagerTrade(villager, recipe.id, recipe.maxUses);
  const beforeLevel = villager.tradeLevel;
  addVillagerTradeXp(villager, recipe.xp);
  adjustVillagerReputation(villager, 1);
  sound.playPickup();
  playHeldAnimation("place");
  const remainingUses = villagerTradeUsesRemaining(villager, recipe.id, recipe.maxUses);
  setSaveStatus(
    villager.tradeLevel > beforeLevel
      ? `${villagerProfessionName(villager.profession)}がLv.${villager.tradeLevel}になりました`
      : remainingUses > 0
        ? "取引しました"
        : "取引が売り切れました"
  );
  updateHotbar();
  updateCraftingPanel();
}

function adjustVillageReputation(villageId: string, amount: number): void {
  for (const villager of villagers.villagers) {
    if (villager.villageId === villageId) {
      adjustVillagerReputation(villager, amount);
    }
  }
}

function villagerProfessionName(profession: Villager["profession"]): string {
  switch (profession) {
    case "farmer":
      return "農民";
    case "librarian":
      return "司書";
    case "mason":
      return "石工";
  }
}

function villagerTradeGreeting(profession: Villager["profession"]): string {
  switch (profession) {
    case "farmer":
      return "食べ物と木材を交換します。";
    case "librarian":
      return "探索に役立つ品を扱っています。";
    case "mason":
      return "石材なら任せてください。";
  }
}

function villagerTradeLevelName(level: VillagerTradeLevel): string {
  switch (level) {
    case 1:
      return "新人";
    case 2:
      return "見習い";
    case 3:
      return "一人前";
    case 4:
      return "熟練";
    case 5:
      return "達人";
  }
}

function createEquipmentPanel(): HTMLElement {
  const panel = document.createElement("div");
  panel.className = "equipment-panel";

  const armorGrid = document.createElement("div");
  armorGrid.className = "equipment-armor-grid";
  const armorSlots: ArmorSlotName[] = ["helmet", "chestplate", "leggings", "boots"];
  for (const slotName of armorSlots) {
    const armor = equippedArmor[slotName];
    const button = document.createElement("button");
    button.type = "button";
    button.className = `equipment-slot ${armor ? "filled" : "empty"}`;
    button.title = armor ? `${armorDisplayName(slotName)}を外す` : armorDisplayName(slotName);
    button.innerHTML = armor
      ? `<span class="crafting-output item-armor item-${armorLabelForSlot(slotName)}"></span><span class="equipment-durability">${Math.ceil((armor.durability / armor.maxDurability) * 100)}%</span>`
      : `<span class="equipment-placeholder">${armorSlotSymbol(slotName)}</span>`;
    button.addEventListener("click", () => unequipArmor(slotName));
    armorGrid.appendChild(button);
  }

  const avatar = document.createElement("div");
  avatar.className = "equipment-avatar";
  avatar.innerHTML = `
    <span class="avatar-head"></span>
    <span class="avatar-body"></span>
    <span class="avatar-arm left"></span>
    <span class="avatar-arm right"></span>
    <span class="avatar-leg left"></span>
    <span class="avatar-leg right"></span>
  `;

  const summary = document.createElement("div");
  summary.className = "equipment-summary";
  summary.innerHTML = `
    <strong>Armor</strong>
    <span>${totalArmorPoints()} / 20</span>
    <small>防具を選んで右クリック、または下の所持品からクリックで装備</small>
  `;

  panel.append(armorGrid, avatar, summary);
  return panel;
}

function createInventoryStrip(): HTMLElement {
  const container = document.createElement("div");
  container.className = "inventory-strip";
  const label = document.createElement("div");
  label.className = "inventory-strip-title";
  label.textContent = "所持品";
  container.appendChild(label);

  const grid = document.createElement("div");
  grid.className = "inventory-strip-grid";
  inventory.slots.forEach((slot, index) => {
    const button = document.createElement("button");
    const empty = slot.count <= 0 || (!slot.tool && !slot.armor && !slot.food && !slot.item && slot.stateId === null);
    button.type = "button";
    button.className = `inventory-slot ${empty ? "empty" : ""} ${index === inventory.selectedIndex ? "selected" : ""}`;
    button.style.setProperty("--slot-color", hotbarColor(slot));
    button.title = empty ? `スロット ${index + 1}` : slot.label;
    button.innerHTML = `
      <span class="inventory-key">${index + 1}</span>
      <span class="hotbar-item ${empty ? "" : hotbarItemClass(slot)}"></span>
      <span class="inventory-count">${slot.count > 1 && !slot.tool && !slot.armor ? slot.count : ""}</span>
    `;
    button.addEventListener("click", () => {
      activateInventorySlot(index);
    });
    grid.appendChild(button);
  });

  container.appendChild(grid);
  return container;
}

function createChestPanel(): HTMLElement {
  const container = document.createElement("div");
  container.className = "chest-panel";
  const label = document.createElement("div");
  label.className = "inventory-strip-title";
  label.textContent = "チェスト";
  container.appendChild(label);

  const slots = activeContainerKey ? containers.get(activeContainerKey) ?? createEmptySlots(CHEST_SIZE) : createEmptySlots(CHEST_SIZE);
  if (activeContainerKey && !containers.has(activeContainerKey)) {
    containers.set(activeContainerKey, slots);
  }

  const grid = document.createElement("div");
  grid.className = "chest-grid";
  slots.forEach((slot, index) => {
    const button = document.createElement("button");
    const empty = isEmptyInventorySlot(slot);
    button.type = "button";
    button.className = `inventory-slot chest-slot ${empty ? "empty" : ""}`;
    button.style.setProperty("--slot-color", hotbarColor(slot));
    button.title = empty ? `チェスト ${index + 1}` : slot.label;
    button.innerHTML = `
      <span class="hotbar-item ${empty ? "" : hotbarItemClass(slot)}"></span>
      <span class="inventory-count">${slot.count > 1 && !slot.tool && !slot.armor ? slot.count : ""}</span>
    `;
    button.addEventListener("click", () => transferChestSlotToInventory(index));
    grid.appendChild(button);
  });

  container.appendChild(grid);
  return container;
}

function transferChestSlotToInventory(index: number): void {
  if (!activeContainerKey) {
    return;
  }
  const slots = containers.get(activeContainerKey);
  const slot = slots?.[index];
  if (!slots || !slot || isEmptyInventorySlot(slot)) {
    return;
  }
  if (!addSlotToInventory(slot)) {
    setSaveStatus("インベントリがいっぱいです");
    return;
  }
  slots[index] = hotbarSlot("empty", null, 0);
  updateHotbar();
  updateCraftingPanel();
  sound.playPickup();
}

function activateInventorySlot(index: number): void {
  if (!Number.isInteger(index) || index < 0 || index >= inventory.slots.length) {
    return;
  }
  if (index < HOTBAR_SIZE) {
    selectHotbarSlot(index);
    if (inventory.selectedSlot().armor) {
      equipSelectedArmor();
    }
    return;
  }

  const slot = inventory.slots[index];
  if (isEmptyInventorySlot(slot)) {
    return;
  }
  if (slot.armor) {
    equipArmorFromInventorySlot(index);
    return;
  }
  if (craftingMode === "chest" && activeContainerKey) {
    transferInventorySlotToChest(index);
    return;
  }

  const selectedIndex = Math.max(0, Math.min(HOTBAR_SIZE - 1, inventory.selectedIndex));
  const selected = cloneHotbar([inventory.slots[selectedIndex]])[0];
  inventory.slots[selectedIndex] = cloneHotbar([slot])[0];
  inventory.slots[index] = selected;
  inventory.select(selectedIndex);
  updateHotbar();
  updateCraftingPanel();
  playHeldAnimation("place");
  sound.playPickup();
}

function transferInventorySlotToChest(index: number): void {
  if (!activeContainerKey) {
    return;
  }
  const slot = inventory.slots[index];
  if (isEmptyInventorySlot(slot)) {
    return;
  }
  const chestSlots = containers.get(activeContainerKey) ?? createEmptySlots(CHEST_SIZE);
  containers.set(activeContainerKey, chestSlots);
  if (!addSlotToSlots(chestSlots, slot)) {
    setSaveStatus("チェストがいっぱいです");
    return;
  }
  inventory.slots[index] = hotbarSlot("empty", null, 0);
  if (index < HOTBAR_SIZE) {
    inventory.select(Math.max(0, Math.min(HOTBAR_SIZE - 1, inventory.selectedIndex)));
  }
  updateHotbar();
  updateCraftingPanel();
  sound.playPickup();
}

function addSlotToInventory(slot: HotbarSlot): boolean {
  if (slot.tool) {
    return inventory.addToolStack(slot);
  }
  if (slot.armor) {
    return inventory.addArmorStack(slot);
  }
  if (slot.food) {
    return inventory.addFoodStack(slot.label, slot.food, slot.count, slot.maxStackSize);
  }
  if (slot.item) {
    return inventory.addItemStack(slot.label, slot.count, slot.maxStackSize);
  }
  if (slot.stateId !== null) {
    return inventory.addStack(slot.stateId, slot.label, slot.count, slot.maxStackSize);
  }
  return true;
}

function addSlotToSlots(slots: HotbarSlot[], source: HotbarSlot): boolean {
  if (!canFitSlotInSlots(slots, source)) {
    return false;
  }
  if (source.tool || source.armor) {
    const empty = slots.findIndex(isEmptyInventorySlot);
    if (empty < 0) {
      return false;
    }
    slots[empty] = cloneSingleSlot(source);
    return true;
  }

  let remaining = source.count;
  for (const slot of slots) {
    if (!canStackSlots(slot, source)) {
      continue;
    }
    const moved = Math.min(remaining, slot.maxStackSize - slot.count);
    slot.count += moved;
    remaining -= moved;
    if (remaining <= 0) {
      return true;
    }
  }

  for (let index = 0; index < slots.length; index += 1) {
    if (!isEmptyInventorySlot(slots[index])) {
      continue;
    }
    const moved = Math.min(remaining, source.maxStackSize);
    const clone = cloneSingleSlot(source);
    clone.count = moved;
    slots[index] = clone;
    remaining -= moved;
    if (remaining <= 0) {
      return true;
    }
  }

  return false;
}

function canFitSlotInSlots(slots: readonly HotbarSlot[], source: HotbarSlot): boolean {
  if (source.tool || source.armor) {
    return slots.some(isEmptyInventorySlot);
  }
  let capacity = 0;
  for (const slot of slots) {
    if (canStackSlots(slot, source)) {
      capacity += slot.maxStackSize - slot.count;
    } else if (isEmptyInventorySlot(slot)) {
      capacity += source.maxStackSize;
    }
    if (capacity >= source.count) {
      return true;
    }
  }
  return false;
}

function canStackSlots(target: HotbarSlot, source: HotbarSlot): boolean {
  if (target.count >= target.maxStackSize || target.maxStackSize !== source.maxStackSize || target.label !== source.label) {
    return false;
  }
  if (target.stateId !== source.stateId) {
    return false;
  }
  if (target.item || source.item) {
    return target.item?.id === source.item?.id && target.item?.kind === source.item?.kind;
  }
  if (target.food || source.food) {
    return Boolean(target.food && source.food)
      && target.food.nutrition === source.food.nutrition
      && target.food.saturationModifier === source.food.saturationModifier;
  }
  return target.stateId !== null;
}

function cloneSingleSlot(slot: HotbarSlot): HotbarSlot {
  return cloneHotbar([slot])[0] ?? hotbarSlot("empty", null, 0);
}

function equipArmorFromInventorySlot(index: number): void {
  const source = inventory.slots[index];
  const armor = source.armor;
  if (!armor) {
    return;
  }

  const previous = equippedArmor[armor.slot];
  equippedArmor[armor.slot] = { ...armor };
  inventory.slots[index] = previous
    ? armorSlot(armorLabelForSlot(previous.slot), previous.slot, previous.points, previous.maxDurability, previous.durability)
    : hotbarSlot("empty", null, 0);

  lastArmorValue = -1;
  updateHotbar();
  updateSurvivalHud();
  updateCraftingPanel();
  playHeldAnimation("place");
  sound.playPickup();
}

function unequipArmor(slotName: ArmorSlotName): void {
  const armor = equippedArmor[slotName];
  if (!armor) {
    return;
  }
  const returned = inventory.addArmorStack(armorSlot(armorLabelForSlot(slotName), slotName, armor.points, armor.maxDurability, armor.durability));
  if (!returned) {
    setSaveStatus("防具を外す空きスロットがありません");
    return;
  }
  equippedArmor[slotName] = null;
  lastArmorValue = -1;
  updateHotbar();
  updateSurvivalHud();
  updateCraftingPanel();
  playHeldAnimation("place");
  sound.playPickup();
}

function armorDisplayName(slot: ArmorSlotName): string {
  switch (slot) {
    case "helmet":
      return "ヘルメット";
    case "chestplate":
      return "チェストプレート";
    case "leggings":
      return "レギンス";
    case "boots":
      return "ブーツ";
  }
}

function armorSlotSymbol(slot: ArmorSlotName): string {
  switch (slot) {
    case "helmet":
      return "◇";
    case "chestplate":
      return "▣";
    case "leggings":
      return "∥";
    case "boots":
      return "▔";
  }
}

function craftRecipe(recipe: CraftingRecipe): void {
  const output = recipe.output();
  if (!canCraftRecipe(recipe, output) || !inventory.removeItems(recipe.ingredients)) {
    return;
  }

  const added = addCraftedOutput(output);
  if (!added) {
    refundIngredients(recipe.ingredients);
    updateCraftingPanel();
    return;
  }

  updateHotbar();
  updateCraftingPanel();
  playHeldAnimation("place");
  sound.playPickup();
}

function canCraftRecipe(recipe: CraftingRecipe, output = recipe.output()): boolean {
  return recipeAvailableForStation(recipe) && inventory.hasItems(recipe.ingredients) && canFitOutput(output);
}

function recipeAvailableForStation(recipe: CraftingRecipe): boolean {
  if (recipe.station) {
    return recipe.station === craftingMode;
  }
  return craftingMode !== "furnace" && recipe.gridSize <= availableCraftingGridSize();
}

function availableCraftingGridSize(): 0 | 2 | 3 {
  return craftingMode === "furnace" ? 0 : craftingMode === "workbench" ? 3 : 2;
}

function canFitOutput(output: HotbarSlot): boolean {
  if (output.tool || output.armor) {
    return inventory.slots.some(isEmptyInventorySlot);
  }
  if (output.item) {
    return inventory.slots.some((slot) =>
      (slot.item && slot.label === output.label && slot.count < slot.maxStackSize) ||
      isEmptyInventorySlot(slot)
    );
  }
  if (output.food) {
    return inventory.slots.some((slot) =>
      (slot.food && slot.label === output.label && slot.count < slot.maxStackSize) ||
      isEmptyInventorySlot(slot)
    );
  }
  if (output.stateId !== null) {
    return inventory.slots.some((slot) =>
      (slot.stateId === output.stateId && slot.count < slot.maxStackSize) ||
      isEmptyInventorySlot(slot)
    );
  }
  return false;
}

function addCraftedOutput(output: HotbarSlot): boolean {
  if (output.tool) {
    return inventory.addToolStack(output);
  }
  if (output.armor) {
    return inventory.addArmorStack(output);
  }
  if (output.item) {
    return inventory.addItemStack(output.label, output.count, output.maxStackSize);
  }
  if (output.food) {
    return inventory.addFoodStack(output.label, output.food, output.count, output.maxStackSize);
  }
  if (output.stateId !== null) {
    return inventory.addStack(output.stateId, output.label, output.count, output.maxStackSize);
  }
  return false;
}

function refundIngredients(ingredients: readonly { label: string; count: number }[]): void {
  for (const ingredient of ingredients) {
    const stateId = stateIdForIngredient(ingredient.label);
    if (stateId !== null) {
      inventory.addStack(stateId, ingredient.label, ingredient.count);
    } else {
      inventory.addItemStack(ingredient.label, ingredient.count);
    }
  }
}

function stateIdForIngredient(label: string): StateId | null {
  switch (label) {
    case "stone":
    case "log":
    case "planks":
    case "crafting_table":
    case "cobblestone":
    case "furnace":
    case "chest":
    case "bed":
    case "door":
    case "composter":
    case "lectern":
    case "stonecutter":
      return registry.resolveState(label);
    default:
      return null;
  }
}

function isEmptyInventorySlot(slot: HotbarSlot): boolean {
  return slot.stateId === null && !slot.food && !slot.item && !slot.tool && !slot.armor && slot.count <= 0;
}

function formatRecipeCost(recipe: { ingredients: readonly { label: string; count: number }[] }): string {
  return formatIngredientCost(recipe.ingredients);
}

function formatIngredientCost(ingredients: readonly RecipeIngredient[]): string {
  return ingredients
    .map((ingredient) => `${displayItemName(ingredient.label)} ${inventory.countItem(ingredient.label)}/${ingredient.count}`)
    .join("  ");
}

function displayItemName(label: string): string {
  switch (label) {
    case "log":
      return "原木";
    case "planks":
      return "木材";
    case "stick":
      return "棒";
    case "stone":
      return "石";
    case "cobblestone":
      return "丸石";
    case "coal":
      return "石炭";
    case "raw_iron":
      return "原鉄";
    case "raw_gold":
      return "原金";
    case "iron_ingot":
      return "鉄";
    case "gold_ingot":
      return "金";
    case "diamond":
      return "ダイヤ";
    case "emerald":
      return "エメラルド";
    case "wheat":
      return "小麦";
    case "seeds":
      return "種";
    case "bread":
      return "パン";
    case "raw_beef":
      return "生の牛肉";
    case "cooked_beef":
      return "ステーキ";
    case "raw_porkchop":
      return "生の豚肉";
    case "cooked_porkchop":
      return "焼き豚";
    case "wood_hoe":
      return "木のクワ";
    case "stone_hoe":
      return "石のクワ";
    case "iron_hoe":
      return "鉄のクワ";
    case "crafting_table":
      return "作業台";
    case "furnace":
      return "かまど";
    case "chest":
      return "チェスト";
    case "bed":
      return "ベッド";
    case "door":
      return "ドア";
    case "bell":
      return "鐘";
    case "composter":
      return "コンポスター";
    case "lectern":
      return "書見台";
    case "stonecutter":
      return "石切台";
    default:
      return label;
  }
}

function updateHeldItem(): void {
  const slot = inventory.selectedSlot();
  const icon = heldItem.querySelector<HTMLElement>(".held-item-icon");
  if (!icon) {
    return;
  }
  const empty = slot.count <= 0 || (!slot.tool && !slot.armor && !slot.food && !slot.item && slot.stateId === null);
  heldItem.classList.toggle("empty", empty);
  heldItem.style.setProperty("--held-color", hotbarColor(slot));
  icon.className = `held-item-icon ${empty ? "" : hotbarItemClass(slot)}`;
}

function updateSurvivalHud(): void {
  if (survivalAir) {
    const airVisible = player.state.eyesInWater || survival.state.airTicks < 300;
    if (survival.state.airTicks !== lastAirTicksValue) {
      const airHtml = renderAirMeter(survival.state.airTicks);
      survivalAir.innerHTML = airHtml;
      lastAirHtml = airHtml;
      lastAirTicksValue = survival.state.airTicks;
    }
    if (airVisible !== lastAirVisible) {
      survivalAir.classList.toggle("visible", airVisible);
      lastAirVisible = airVisible;
    }
  }
  if (survivalHearts) {
    if (survival.state.health !== lastHealthValue) {
      const heartsHtml = renderMeter("heart", survival.state.health);
      survivalHearts.innerHTML = heartsHtml;
      lastHeartsHtml = heartsHtml;
      lastHealthValue = survival.state.health;
    }
  }
  if (survivalArmor) {
    const armorValue = totalArmorPoints();
    if (armorValue !== lastArmorValue) {
      const armorHtml = renderMeter("armor-pip", armorValue);
      survivalArmor.innerHTML = armorHtml;
      lastArmorHtml = armorHtml;
      lastArmorValue = armorValue;
      survivalArmor.classList.toggle("visible", armorValue > 0);
    }
  }
  if (survivalHunger) {
    if (survival.state.foodLevel !== lastFoodLevelValue) {
      const hungerHtml = renderMeter("hunger-pip", survival.state.foodLevel);
      survivalHunger.innerHTML = hungerHtml;
      lastHungerHtml = hungerHtml;
      lastFoodLevelValue = survival.state.foodLevel;
    }
  }
}

function playEatEffect(): void {
  restartCssAnimation(eatEffect, "visible");
  survivalHud.classList.add("fed");
  window.setTimeout(() => survivalHud.classList.remove("fed"), 260);
}

function playDamageEffect(): void {
  restartCssAnimation(damageFlash, "visible");
  survivalHud.classList.add("damaged");
  window.setTimeout(() => survivalHud.classList.remove("damaged"), 320);
}

function restartCssAnimation(element: HTMLElement, className: string): void {
  element.classList.remove(className);
  void element.offsetWidth;
  element.classList.add(className);
}

function renderMeter(className: string, value: number): string {
  const cells = [];
  for (let index = 0; index < 10; index += 1) {
    const remaining = value - index * 2;
    const fillClass = remaining >= 2 ? "full" : remaining >= 1 ? "half" : "empty";
    cells.push(`<span class="${className} ${fillClass}"></span>`);
  }
  return cells.join("");
}

function renderAirMeter(airTicks: number): string {
  const cells = [];
  const airPerBubble = 300 / 10;
  for (let index = 0; index < 10; index += 1) {
    const remaining = airTicks - index * airPerBubble;
    const fillClass = remaining >= airPerBubble ? "full" : remaining > 0 ? "half" : "empty";
    cells.push(`<span class="bubble ${fillClass}"></span>`);
  }
  return cells.join("");
}

function selectHotbarSlot(index: number): void {
  inventory.select(index);
  updateHotbar();
}

function createDefaultHotbar(): HotbarSlot[] {
  const slots = [
    toolSlot("stone_sword", "sword", "stone", 7, 1, 131),
    toolSlot("stone_pickaxe", "pickaxe", "stone", 5, 3.2, 131),
    hotbarSlot("grass", registry.resolveState("grass"), 64),
    hotbarSlot("dirt", registry.resolveState("dirt"), 64),
    hotbarSlot("stone", registry.resolveState("stone"), 64),
    hotbarSlot("sand", registry.resolveState("sand"), 64),
    hotbarSlot("log", registry.resolveState("log"), 32),
    foodSlot("apple", 8, 4, 0.3),
    hotbarSlot("torch", registry.resolveState("torch"), 16)
  ];
  while (slots.length < INVENTORY_SIZE) {
    slots.push(hotbarSlot("empty", null, 0));
  }
  return slots;
}

function createEmptySlots(count: number): HotbarSlot[] {
  return Array.from({ length: count }, () => hotbarSlot("empty", null, 0));
}

function hotbarSlot(label: string, stateId: StateId | null, count: number): HotbarSlot {
  return {
    label,
    stateId,
    count,
    maxStackSize: 64
  };
}

function foodSlot(
  label: string,
  count: number,
  nutrition: number,
  saturationModifier: number
): HotbarSlot {
  return {
    label,
    stateId: null,
    count,
    maxStackSize: 64,
    food: { nutrition, saturationModifier }
  };
}

function toolSlot(
  label: string,
  kind: NonNullable<HotbarSlot["tool"]>["kind"],
  level: NonNullable<HotbarSlot["tool"]>["level"],
  attackDamage: number,
  miningSpeed: number,
  maxDurability: number
): HotbarSlot {
  return {
    label,
    stateId: null,
    count: 1,
    maxStackSize: 1,
    tool: { kind, level, attackDamage, miningSpeed, durability: maxDurability, maxDurability }
  };
}

function armorSlot(
  label: string,
  slot: ArmorSlotName,
  points: number,
  maxDurability: number,
  durability = maxDurability
): HotbarSlot {
  return {
    label,
    stateId: null,
    count: 1,
    maxStackSize: 1,
    armor: { slot, material: "iron", points, durability, maxDurability }
  };
}

function itemSlot(label: string, count: number): HotbarSlot {
  return {
    label,
    stateId: null,
    count,
    maxStackSize: 64,
    item: { id: label, kind: "material" }
  };
}

function hotbarColor(slot: HotbarSlot): string {
  if (slot.tool) {
    return slot.tool.level === "iron" ? "#d8dde0" : slot.tool.level === "stone" ? "#aeb5b9" : "#9a6a3e";
  }
  if (slot.armor) {
    return "#d8dde0";
  }
  if (slot.item) {
    return colorForMaterialItem(slot.item.id);
  }
  if (slot.food) {
    return slot.label === "bread" ? "#c99a4a" : slot.label.startsWith("cooked_") ? "#b86a36" : "#c9352b";
  }
  return slot.stateId === null ? "transparent" : colorForHotbarState(slot.stateId);
}

function hotbarItemClass(slot: HotbarSlot): string {
  if (slot.tool) {
    return `item-tool item-${slot.tool.level}-${slot.tool.kind}`;
  }
  if (slot.armor) {
    return `item-armor item-${slot.label}`;
  }
  if (slot.item) {
    return `item-material item-${slot.item.id}`;
  }
  if (slot.food) {
    return `item-${slot.label}`;
  }
  return slot.stateId === null ? "" : `item-${registry.getState(slot.stateId).typeId}`;
}

function colorForDroppedItem(item: DroppedItem): string {
  if (item.tool) {
    return item.tool.level === "iron" ? "#d8dde0" : item.tool.level === "stone" ? "#aeb5b9" : "#9a6a3e";
  }
  if (item.armor) {
    return "#d8dde0";
  }
  if (item.item) {
    return colorForMaterialItem(item.item.id);
  }
  if (item.food) {
    return item.label === "bread" ? "#c99a4a" : item.label.startsWith("cooked_") ? "#b86a36" : "#c9352b";
  }
  return item.stateId === null ? "#ffffff" : colorForHotbarState(item.stateId);
}

function colorForMaterialItem(id: string): string {
  switch (id) {
    case "coal":
      return "#202124";
    case "raw_iron":
      return "#c08b67";
    case "raw_gold":
      return "#d7a636";
    case "iron_ingot":
      return "#d8dde0";
    case "gold_ingot":
      return "#ffd166";
    case "diamond":
      return "#61d5d8";
    case "emerald":
      return "#39c978";
    case "wheat":
      return "#d9b64a";
    case "seeds":
      return "#8fa84f";
    case "stick":
      return "#9a6a3e";
    default:
      return "#d9dee2";
  }
}

function durabilityPercent(slot: HotbarSlot): string {
  if (slot.tool) {
    return `${Math.max(0, Math.min(100, (slot.tool.durability / slot.tool.maxDurability) * 100))}%`;
  }
  if (slot.armor) {
    return `${Math.max(0, Math.min(100, (slot.armor.durability / slot.armor.maxDurability) * 100))}%`;
  }
  return "0%";
}

function damageSelectedToolIfPresent(amount: number): void {
  inventory.damageSelectedTool(amount);
}

function labelForState(stateId: StateId): string {
  return registry.getState(stateId).typeId;
}

function digitKeyToIndex(code: string): number | null {
  if (!code.startsWith("Digit")) {
    return null;
  }
  const digit = Number(code.slice("Digit".length));
  if (!Number.isInteger(digit) || digit < 1) {
    return null;
  }
  return digit - 1;
}

function colorForHotbarState(stateId: StateId): string {
  const typeId = registry.getState(stateId).typeId;
  switch (typeId) {
    case "grass":
      return "#5f9f4a";
    case "dirt":
      return "#765039";
    case "stone":
      return "#858585";
    case "gold_ore":
      return "#d2a747";
    case "diamond_ore":
      return "#63cdd0";
    case "sand":
      return "#d7c37b";
    case "gravel":
      return "#7b7b75";
    case "snow":
      return "#e6edf1";
    case "water":
      return "#386ed8";
    case "lava":
      return "#ff6f1a";
    case "log":
      return "#7a5735";
    case "planks":
      return "#b7844e";
    case "cobblestone":
      return "#74746f";
    case "leaves":
      return "#3f8f43";
    case "lamp":
      return "#ffd166";
    case "torch":
      return "#ffc857";
    case "crafting_table":
      return "#9b6a3b";
    case "furnace":
      return "#5d5d58";
    case "chest":
      return "#a66d35";
    case "bed":
      return "#b73535";
    case "door":
      return "#9b6a3b";
    case "bell":
      return "#d9a640";
    case "composter":
      return "#8b5c31";
    case "lectern":
      return "#9a6a3e";
    case "stonecutter":
      return "#8b8a82";
    case "farmland":
      return "#6b4a2f";
    case "wheat":
      return "#d9b64a";
    default:
      return "#eef4f8";
  }
}

function soundGroupUnderPlayer(): BlockSoundGroup {
  const stateId = world.getStateIdIfLoaded(
    Math.floor(player.state.position.x),
    Math.floor(player.state.position.y - 0.12),
    Math.floor(player.state.position.z)
  );
  return stateId === null ? "grass" : soundGroupForState(stateId);
}

function soundGroupForState(stateId: StateId): BlockSoundGroup {
  return registry.getDefinitionForState(stateId).soundGroup ?? "stone";
}

function findOpenSpawn(): { x: number; y: number; z: number } {
  const candidates = [];
  for (let z = -8; z <= 24; z += 1) {
    for (let x = -8; x <= 24; x += 1) {
      candidates.push({ x, z, distance: Math.hypot(x - 8, z - 8) });
    }
  }
  candidates.sort((a, b) => a.distance - b.distance);

  for (const candidate of candidates) {
    const chunkX = Math.floor(candidate.x / 16);
    const chunkZ = Math.floor(candidate.z / 16);
    const chunk = world.getChunk(chunkX, chunkZ);
    if (!chunk) {
      continue;
    }
    const localX = ((candidate.x % 16) + 16) % 16;
    const localZ = ((candidate.z % 16) + 16) % 16;
    const surface = chunk.heightmaps.get("MOTION_BLOCKING_NO_LEAVES", localX, localZ);
    const feetY = surface + 1.02;
    const footBlockY = Math.floor(feetY);
    if (!hasOpenSpawnClearance(candidate.x, footBlockY, candidate.z)) {
      continue;
    }
    return { x: candidate.x + 0.5, y: feetY, z: candidate.z + 0.5 };
  }

  return { x: 8.5, y: 90, z: 8.5 };
}

function hasOpenSpawnClearance(worldX: number, footBlockY: number, worldZ: number): boolean {
  for (let dz = -1; dz <= 1; dz += 1) {
    for (let dx = -1; dx <= 1; dx += 1) {
      for (let y = footBlockY; y <= footBlockY + 2; y += 1) {
        if (world.isSolidBlockLoaded(worldX + dx, y, worldZ + dz)) {
          return false;
        }
      }
    }
  }
  return true;
}

function chooseOpenYaw(spawnPosition: { x: number; y: number; z: number }): number {
  let bestYaw = 0;
  let bestDistance = -1;
  for (let index = 0; index < 16; index += 1) {
    const candidateYaw = (index / 16) * Math.PI * 2;
    const direction = {
      x: -Math.sin(candidateYaw),
      y: 0,
      z: -Math.cos(candidateYaw)
    };
    const hit = voxelRaycast(
      world,
      {
        x: spawnPosition.x,
        y: spawnPosition.y + 1.62,
        z: spawnPosition.z
      },
      direction,
      14
    );
    const distance = hit?.distance ?? 14;
    if (distance > bestDistance) {
      bestDistance = distance;
      bestYaw = candidateYaw;
    }
  }
  return bestYaw;
}

function yawForDirection(direction: { x: number; z: number }): number {
  return Math.atan2(-direction.x, -direction.z);
}

function pitchForDirection(direction: { y: number }): number {
  return Math.max(-0.45, Math.min(0.45, Math.asin(direction.y)));
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

void initializeTitleScreen();
animate();
