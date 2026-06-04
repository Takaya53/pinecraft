import type { SeedInput } from "../core/random.ts";
import type { ArmorMetadata, ArmorSlotName, HotbarSlot } from "../player/inventory.ts";
import type { ChunkStatus } from "../world/ChunkStatus.ts";
import type { ChunkBlockDelta, ChunkColumn } from "../world/Chunk.ts";

export const SAVE_FORMAT_VERSION = 0;

export type BlockDelta = ChunkBlockDelta;

export type ChunkSaveV0 = {
  chunkX: number;
  chunkZ: number;
  status: ChunkStatus;
  blockDeltas: BlockDelta[];
};

export type ContainerSaveV0 = {
  x: number;
  y: number;
  z: number;
  slots: HotbarSlot[];
};

export type PlayerSaveV0 = {
  position: { x: number; y: number; z: number };
  velocity: { x: number; y: number; z: number };
  respawnPoint?: { x: number; y: number; z: number };
  health: number;
  foodLevel: number;
  saturation: number;
  exhaustion: number;
  airTicks: number;
  selectedHotbarSlot: number;
  hotbar: HotbarSlot[];
  equippedArmor?: Partial<Record<ArmorSlotName, ArmorMetadata | null>>;
};

export type WorldSaveV0 = {
  version: typeof SAVE_FORMAT_VERSION;
  seed: string;
  dimensionId: string;
  time: number;
  chunks: ChunkSaveV0[];
  containers?: ContainerSaveV0[];
  player: PlayerSaveV0;
};

export function createEmptyWorldSave(seed: SeedInput, dimensionId = "overworld"): WorldSaveV0 {
  return {
    version: SAVE_FORMAT_VERSION,
    seed: String(seed),
    dimensionId,
    time: 0,
    chunks: [],
    containers: [],
    player: {
      position: { x: 0, y: 80, z: 0 },
      velocity: { x: 0, y: 0, z: 0 },
      respawnPoint: { x: 0, y: 80, z: 0 },
      health: 20,
      foodLevel: 20,
      saturation: 5,
      exhaustion: 0,
      airTicks: 300,
      selectedHotbarSlot: 0,
      hotbar: [],
      equippedArmor: {}
    }
  };
}

export function createChunkSaveV0(
  chunk: ChunkColumn,
  blockDeltas: BlockDelta[] = Array.from(chunk.blockDeltas.values())
): ChunkSaveV0 {
  return {
    chunkX: chunk.chunkX,
    chunkZ: chunk.chunkZ,
    status: chunk.status,
    blockDeltas
  };
}

export function cloneHotbar(slots: readonly HotbarSlot[]): HotbarSlot[] {
  return slots.map((slot) => ({
    ...slot,
    food: slot.food ? { ...slot.food } : undefined,
    item: slot.item ? { ...slot.item } : undefined,
    tool: slot.tool ? { ...slot.tool } : undefined,
    armor: slot.armor ? { ...slot.armor } : undefined
  }));
}

export function isWorldSaveV0(value: unknown): value is WorldSaveV0 {
  if (!isRecord(value) || value.version !== SAVE_FORMAT_VERSION) {
    return false;
  }

  if (typeof value.seed !== "string" || typeof value.dimensionId !== "string" || !isFiniteNumber(value.time)) {
    return false;
  }

  if (!Array.isArray(value.chunks) || !value.chunks.every(isChunkSaveV0)) {
    return false;
  }

  if ("containers" in value && value.containers !== undefined && !isContainerSaveArray(value.containers)) {
    return false;
  }

  return isPlayerSaveV0(value.player);
}

function isChunkSaveV0(value: unknown): value is ChunkSaveV0 {
  if (!isRecord(value)) {
    return false;
  }
  return Number.isInteger(value.chunkX)
    && Number.isInteger(value.chunkZ)
    && typeof value.status === "string"
    && Array.isArray(value.blockDeltas)
    && value.blockDeltas.every(isBlockDelta);
}

function isBlockDelta(value: unknown): value is BlockDelta {
  if (!isRecord(value)) {
    return false;
  }
  return Number.isInteger(value.localX)
    && Number.isInteger(value.worldY)
    && Number.isInteger(value.localZ)
    && Number.isInteger(value.stateId);
}

function isContainerSaveArray(value: unknown): value is ContainerSaveV0[] {
  return Array.isArray(value) && value.every(isContainerSaveV0);
}

function isContainerSaveV0(value: unknown): value is ContainerSaveV0 {
  if (!isRecord(value)) {
    return false;
  }
  return Number.isInteger(value.x)
    && Number.isInteger(value.y)
    && Number.isInteger(value.z)
    && Array.isArray(value.slots)
    && value.slots.every(isHotbarSlot);
}

function isPlayerSaveV0(value: unknown): value is PlayerSaveV0 {
  if (!isRecord(value)) {
    return false;
  }
  return isVector3(value.position)
    && isVector3(value.velocity)
    && (!("respawnPoint" in value) || value.respawnPoint === undefined || isVector3(value.respawnPoint))
    && isFiniteNumber(value.health)
    && isFiniteNumber(value.foodLevel)
    && isFiniteNumber(value.saturation)
    && isFiniteNumber(value.exhaustion)
    && isFiniteNumber(value.airTicks)
    && Number.isInteger(value.selectedHotbarSlot)
    && Array.isArray(value.hotbar)
    && value.hotbar.every(isHotbarSlot)
    && (!("equippedArmor" in value) || value.equippedArmor === undefined || isEquippedArmor(value.equippedArmor));
}

function isHotbarSlot(value: unknown): value is HotbarSlot {
  if (!isRecord(value)) {
    return false;
  }
  if (typeof value.label !== "string" || !(value.stateId === null || Number.isInteger(value.stateId))) {
    return false;
  }
  if (!isFiniteNumber(value.count) || !isFiniteNumber(value.maxStackSize)) {
    return false;
  }
  if ("food" in value && value.food !== undefined && !isFoodMetadata(value.food)) {
    return false;
  }
  if ("item" in value && value.item !== undefined && !isItemMetadata(value.item)) {
    return false;
  }
  if ("tool" in value && value.tool !== undefined && !isToolMetadata(value.tool)) {
    return false;
  }
  return !("armor" in value && value.armor !== undefined && !isArmorMetadata(value.armor));
}

function isFoodMetadata(value: unknown): value is NonNullable<HotbarSlot["food"]> {
  return isRecord(value) && isFiniteNumber(value.nutrition) && isFiniteNumber(value.saturationModifier);
}

function isItemMetadata(value: unknown): value is NonNullable<HotbarSlot["item"]> {
  return isRecord(value) && typeof value.id === "string" && value.kind === "material";
}

function isToolMetadata(value: unknown): value is NonNullable<HotbarSlot["tool"]> {
  if (!isRecord(value)) {
    return false;
  }
  const validKind = value.kind === "sword"
    || value.kind === "pickaxe"
    || value.kind === "axe"
    || value.kind === "shovel"
    || value.kind === "hoe";
  const validLevel = value.level === "wood" || value.level === "stone" || value.level === "iron";
  return validKind
    && validLevel
    && isFiniteNumber(value.attackDamage)
    && isFiniteNumber(value.miningSpeed)
    && isFiniteNumber(value.durability)
    && isFiniteNumber(value.maxDurability);
}

function isEquippedArmor(value: unknown): value is Partial<Record<ArmorSlotName, ArmorMetadata | null>> {
  if (!isRecord(value)) {
    return false;
  }
  return ["helmet", "chestplate", "leggings", "boots"].every((slot) => {
    const armor = value[slot];
    return armor === undefined || armor === null || isArmorMetadata(armor);
  });
}

function isArmorMetadata(value: unknown): value is ArmorMetadata {
  if (!isRecord(value)) {
    return false;
  }
  const validSlot = value.slot === "helmet"
    || value.slot === "chestplate"
    || value.slot === "leggings"
    || value.slot === "boots";
  return validSlot
    && value.material === "iron"
    && isFiniteNumber(value.points)
    && isFiniteNumber(value.durability)
    && isFiniteNumber(value.maxDurability);
}

function isVector3(value: unknown): value is { x: number; y: number; z: number } {
  return isRecord(value) && isFiniteNumber(value.x) && isFiniteNumber(value.y) && isFiniteNumber(value.z);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}
