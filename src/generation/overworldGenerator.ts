import {
  CHUNK_SIZE,
  WORLD_MIN_Y,
  type Vec3i
} from "../core/constants.ts";
import { createNoiseSampler, type NoiseSampler } from "../core/noise.ts";
import { deriveSeed, SplitMix64, type SeedInput } from "../core/random.ts";
import { BlockRegistry } from "../block/blockRegistry.ts";
import { ChunkColumn } from "../world/Chunk.ts";
import type { World } from "../world/World.ts";
import { BiomeSampler, type BiomeBlend, type ClimateSample } from "./biome.ts";

const STARTER_CAVE_ENTRANCE = { x: 12, z: 12 };
const STARTER_CAVE_LENGTH = 28;
const VILLAGE_SPACING_CHUNKS = 8;
const VILLAGE_RADIUS_CHUNKS = 2;

export type VillageProfession = "farmer" | "librarian" | "mason";

export type VillageWorkstation = {
  profession: VillageProfession;
  position: Vec3i;
};

export type VillageSite = {
  id: string;
  centerX: number;
  centerZ: number;
  centerY: number;
  biomeId: "plains" | "forest" | "desert";
  villagerPositions: Vec3i[];
  homePositions?: Vec3i[];
  workstations?: VillageWorkstation[];
};

type VillageHousePlan = {
  offsetX: number;
  offsetZ: number;
  width: number;
  depth: number;
  profession?: VillageProfession;
};

const VILLAGE_HOUSES: readonly VillageHousePlan[] = [
  { offsetX: -13, offsetZ: -9, width: 7, depth: 6, profession: "farmer" },
  { offsetX: 8, offsetZ: -10, width: 7, depth: 6, profession: "librarian" },
  { offsetX: -12, offsetZ: 8, width: 8, depth: 6, profession: "mason" },
  { offsetX: 9, offsetZ: 8, width: 7, depth: 7, profession: "farmer" }
];

export type TerrainSample = {
  height: number;
  climate: ClimateSample;
  biome: BiomeBlend;
  riverStrength: number;
  lakeStrength: number;
};

export type OverworldGeneratorOptions = {
  seed: SeedInput;
  registry: BlockRegistry;
  seaLevel?: number;
  minTerrainY?: number;
};

export class OverworldGenerator {
  seed: SeedInput;
  registry: BlockRegistry;
  seaLevel: number;
  minTerrainY: number;
  continentalness: NoiseSampler;
  erosion: NoiseSampler;
  weirdness: NoiseSampler;
  detail: NoiseSampler;
  river: NoiseSampler;
  lake: NoiseSampler;
  caveShape: NoiseSampler;
  caveDetail: NoiseSampler;
  caveMouth: NoiseSampler;
  ravine: NoiseSampler;
  lavaPocket: NoiseSampler;
  biomeSampler: BiomeSampler;
  stone: number;
  dirt: number;
  grass: number;
  sand: number;
  gravel: number;
  snow: number;
  water: number;
  lava: number;
  log: number;
  leaves: number;
  planks: number;
  cobblestone: number;
  torch: number;
  lamp: number;
  coalOre: number;
  ironOre: number;
  goldOre: number;
  diamondOre: number;
  bed: number;
  doorNorthLowerOpen: number;
  doorNorthUpperOpen: number;
  doorSouthLowerOpen: number;
  doorSouthUpperOpen: number;
  composter: number;
  lectern: number;
  stonecutter: number;
  farmland: number;
  wheat: number;
  bell: number;
  private starterCaveEntranceSurfaceY: number | null = null;

  constructor(options: OverworldGeneratorOptions) {
    this.seed = options.seed;
    this.registry = options.registry;
    this.seaLevel = options.seaLevel ?? 63;
    this.minTerrainY = options.minTerrainY ?? 40;
    this.continentalness = createNoiseSampler(deriveSeed(this.seed, "continentalness"));
    this.erosion = createNoiseSampler(deriveSeed(this.seed, "erosion"));
    this.weirdness = createNoiseSampler(deriveSeed(this.seed, "weirdness"));
    this.detail = createNoiseSampler(deriveSeed(this.seed, "surface-detail"));
    this.river = createNoiseSampler(deriveSeed(this.seed, "river-network"));
    this.lake = createNoiseSampler(deriveSeed(this.seed, "lake-basins"));
    this.caveShape = createNoiseSampler(deriveSeed(this.seed, "cave-shape"));
    this.caveDetail = createNoiseSampler(deriveSeed(this.seed, "cave-detail"));
    this.caveMouth = createNoiseSampler(deriveSeed(this.seed, "cave-mouth"));
    this.ravine = createNoiseSampler(deriveSeed(this.seed, "ravine"));
    this.lavaPocket = createNoiseSampler(deriveSeed(this.seed, "lava-pocket"));
    this.biomeSampler = new BiomeSampler(this.seed);
    this.stone = this.registry.resolveState("stone");
    this.dirt = this.registry.resolveState("dirt");
    this.grass = this.registry.resolveState("grass");
    this.sand = this.registry.resolveState("sand");
    this.gravel = this.registry.resolveState("gravel");
    this.snow = this.registry.resolveState("snow");
    this.water = this.registry.resolveState("water", { level: 0 });
    this.lava = this.registry.resolveState("lava", { level: 0 });
    this.log = this.registry.resolveState("log");
    this.leaves = this.registry.resolveState("leaves", { distance: 7, persistent: true });
    this.planks = this.registry.resolveState("planks");
    this.cobblestone = this.registry.resolveState("cobblestone");
    this.torch = this.registry.resolveState("torch");
    this.lamp = this.registry.resolveState("lamp");
    this.coalOre = this.registry.resolveState("coal_ore");
    this.ironOre = this.registry.resolveState("iron_ore");
    this.goldOre = this.registry.resolveState("gold_ore");
    this.diamondOre = this.registry.resolveState("diamond_ore");
    this.bed = this.registry.resolveState("bed");
    this.doorNorthLowerOpen = this.registry.resolveState("door", { facing: "north", half: "lower", open: true });
    this.doorNorthUpperOpen = this.registry.resolveState("door", { facing: "north", half: "upper", open: true });
    this.doorSouthLowerOpen = this.registry.resolveState("door", { facing: "south", half: "lower", open: true });
    this.doorSouthUpperOpen = this.registry.resolveState("door", { facing: "south", half: "upper", open: true });
    this.composter = this.registry.resolveState("composter");
    this.lectern = this.registry.resolveState("lectern");
    this.stonecutter = this.registry.resolveState("stonecutter");
    this.farmland = this.registry.resolveState("farmland");
    this.wheat = this.registry.resolveState("wheat", { age: 7 });
    this.bell = this.registry.resolveState("bell");
  }

  generateChunk(chunk: ChunkColumn, _world?: World): void {
    for (let localZ = 0; localZ < CHUNK_SIZE; localZ += 1) {
      for (let localX = 0; localX < CHUNK_SIZE; localX += 1) {
        const worldX = chunk.chunkX * CHUNK_SIZE + localX;
        const worldZ = chunk.chunkZ * CHUNK_SIZE + localZ;
        const terrain = this.sampleTerrain(worldX, worldZ);
        this.fillColumn(chunk, localX, localZ, worldX, worldZ, terrain);
      }
    }

    this.placeTrees(chunk);
    this.placeStructures(chunk);
    chunk.recomputeHeightmapsFromRegistry(this.registry);
    chunk.dirty = false;
    chunk.blockDeltas.clear();
  }

  sampleSurfaceHeight(worldX: number, worldZ: number): number {
    return this.sampleTerrain(worldX, worldZ).height;
  }

  sampleTerrain(worldX: number, worldZ: number): TerrainSample {
    const climate = this.biomeSampler.sampleClimate(worldX, worldZ);
    const continentalness = blendNoise(climate.continentalness, this.continentalness.noise2(worldX * 0.0022, worldZ * 0.0022), 0.35);
    const erosion = blendNoise(climate.erosion, this.erosion.noise2(worldX * 0.006, worldZ * 0.006), 0.25);
    const weirdness = blendNoise(climate.weirdness, this.weirdness.noise2(worldX * 0.011, worldZ * 0.011), 0.35);
    const detail = this.detail.noise2(worldX * 0.045, worldZ * 0.045);
    const riverSignal = this.river.noise2(worldX * 0.0065, worldZ * 0.0065) + detail * 0.12;
    const lakeSignal = this.lake.noise2(worldX * 0.0032, worldZ * 0.0032);
    const landMask = smoothstep(-0.34, 0.15, continentalness);
    const riverStrength = (1 - smoothstep(0.018, 0.12, Math.abs(riverSignal))) * landMask;
    const lakeStrength = smoothstep(0.68, 0.9, lakeSignal) * landMask * smoothstep(-0.2, 0.65, erosion);
    const biome = this.biomeSampler.blend({ ...climate, continentalness, erosion, weirdness }, riverStrength);

    const continents = smoothstep(-0.35, 0.85, continentalness);
    const oceanDepth = 1 - smoothstep(-0.62, -0.08, continentalness);
    const erosionFactor = 1 - smoothstep(-0.25, 0.8, erosion);
    const peaks = Math.max(0, weirdness) ** 2;
    const landFactor = 1 - oceanDepth * 0.72;
    const base = 46 + continents * 32 - oceanDepth * 10;
    const hills = erosionFactor * 15 * landFactor;
    const ridges = peaks * 20 * landFactor;
    const roughness = detail * (2.2 + continents * 1.8);
    const waterCarve = riverStrength * 11 + lakeStrength * 7;
    let height = clampInt(Math.round(base + hills + ridges + roughness + biome.surfaceOffset - waterCarve), this.minTerrainY, 128);
    if (biome.primary.id === "ocean") {
      height = Math.min(height, this.seaLevel - 5);
    }
    if (riverStrength > 0.62) {
      height = Math.min(height, this.seaLevel - 2);
    }
    if (lakeStrength > 0.74) {
      height = Math.min(height, this.seaLevel - 1);
    }

    return {
      height,
      climate,
      biome,
      riverStrength,
      lakeStrength
    };
  }

  fillColumn(
    chunk: ChunkColumn,
    localX: number,
    localZ: number,
    worldX: number,
    worldZ: number,
    terrain: TerrainSample
  ): void {
    const height = terrain.height;
    const beach = height <= this.seaLevel + 1 || terrain.biome.primary.id === "beach" || terrain.riverStrength > 0.48;
    const stoneFloor = Math.max(WORLD_MIN_Y, height - 5);
    const topState = beach ? this.sand : terrain.biome.top === "snow" ? this.snow : terrain.biome.top === "sand" ? this.sand : this.grass;
    const fillerState = beach ? this.sand : terrain.biome.filler === "sand" ? this.sand : terrain.biome.filler === "stone" ? this.stone : this.dirt;

    for (let worldY = WORLD_MIN_Y; worldY <= height; worldY += 1) {
      let state = this.stone;
      if (worldY >= height - 3) {
        state = fillerState;
      }
      if (worldY === height) {
        state = topState;
      }
      if (worldY < this.seaLevel - 5 && worldY >= height - 1 && terrain.biome.primary.id === "ocean") {
        state = this.shouldPlaceGravelPatch(worldX, worldY, worldZ) ? this.gravel : this.sand;
      }

      if (this.shouldCarveCave(worldX, worldY, worldZ, height)) {
        chunk.setGeneratedStateId(localX, worldY, localZ, this.shouldFillCaveWithLava(worldX, worldY, worldZ) ? this.lava : 0);
        continue;
      }

      if (worldY < stoneFloor && this.shouldPlaceOre(worldX, worldY, worldZ, "diamond")) {
        state = this.diamondOre;
      } else if (worldY < stoneFloor && this.shouldPlaceOre(worldX, worldY, worldZ, "gold")) {
        state = this.goldOre;
      } else if (worldY < stoneFloor && this.shouldPlaceOre(worldX, worldY, worldZ, "iron")) {
        state = this.ironOre;
      } else if (worldY < stoneFloor && this.shouldPlaceOre(worldX, worldY, worldZ, "coal")) {
        state = this.coalOre;
      }

      chunk.setGeneratedStateId(localX, worldY, localZ, state);
    }

    for (let worldY = height + 1; worldY <= this.seaLevel; worldY += 1) {
      chunk.setGeneratedStateId(localX, worldY, localZ, this.water);
    }

    const motionSurface = Math.max(height, height < this.seaLevel ? this.seaLevel : height);
    chunk.heightmaps.set("WORLD_SURFACE", localX, localZ, motionSurface);
    chunk.heightmaps.set("OCEAN_FLOOR", localX, localZ, height);
    chunk.heightmaps.set("MOTION_BLOCKING", localX, localZ, motionSurface);
    chunk.heightmaps.set("MOTION_BLOCKING_NO_LEAVES", localX, localZ, motionSurface);
  }

  placeTrees(chunk: ChunkColumn): void {
    for (let localZ = 2; localZ < CHUNK_SIZE - 2; localZ += 1) {
      for (let localX = 2; localX < CHUNK_SIZE - 2; localX += 1) {
        const worldX = chunk.chunkX * CHUNK_SIZE + localX;
        const worldZ = chunk.chunkZ * CHUNK_SIZE + localZ;
        const terrain = this.sampleTerrain(worldX, worldZ);
        const height = terrain.height;
        if (height <= this.seaLevel + 2) {
          continue;
        }
        if (chunk.getStateId(localX, height, localZ) !== this.grass && chunk.getStateId(localX, height, localZ) !== this.snow) {
          continue;
        }

        const random = new SplitMix64(deriveSeed(this.seed, `tree:${worldX},${worldZ}`));
        if (random.nextFloat() > terrain.biome.treeDensity) {
          continue;
        }

        this.placeTree(chunk, { x: localX, y: height + 1, z: localZ }, 4 + random.nextInt(2));
      }
    }
  }

  placeTree(chunk: ChunkColumn, base: Vec3i, trunkHeight: number): void {
    for (let offset = 0; offset < trunkHeight; offset += 1) {
      const worldY = base.y + offset;
      chunk.setGeneratedStateId(base.x, worldY, base.z, this.log);
      setHeightmapMax(chunk, base.x, base.z, worldY, { includeNoLeaves: true });
    }

    const canopyY = base.y + trunkHeight;
    for (let dy = -2; dy <= 1; dy += 1) {
      const radius = dy === 1 ? 1 : 2;
      for (let dz = -radius; dz <= radius; dz += 1) {
        for (let dx = -radius; dx <= radius; dx += 1) {
          const localX = base.x + dx;
          const localZ = base.z + dz;
          const worldY = canopyY + dy;
          if (localX < 0 || localX >= CHUNK_SIZE || localZ < 0 || localZ >= CHUNK_SIZE) {
            continue;
          }
          if (Math.abs(dx) === radius && Math.abs(dz) === radius && dy > -2) {
            continue;
          }
          if (chunk.getStateId(localX, worldY, localZ) !== 0) {
            continue;
          }
          chunk.setGeneratedStateId(localX, worldY, localZ, this.leaves);
          setHeightmapMax(chunk, localX, localZ, worldY, { includeNoLeaves: false });
        }
      }
    }
  }

  shouldCarveCave(worldX: number, worldY: number, worldZ: number, surfaceHeight: number): boolean {
    if (worldY <= WORLD_MIN_Y + 5 || worldY > surfaceHeight) {
      return false;
    }

    if (this.shouldCarveStarterCave(worldX, worldY, worldZ)) {
      return true;
    }
    if (surfaceHeight <= this.seaLevel + 2) {
      return false;
    }
    if (this.shouldCarveRavine(worldX, worldY, worldZ, surfaceHeight)) {
      return true;
    }

    const depth = surfaceHeight - worldY;
    if (depth < 14) {
      return false;
    }

    const depthFactor = smoothstep(14, 34, depth) * smoothstep(WORLD_MIN_Y + 10, WORLD_MIN_Y + 34, worldY);
    if (depthFactor <= 0) {
      return false;
    }

    const tunnel = this.caveShape.noise3(worldX * 0.026, worldY * 0.038, worldZ * 0.026);
    const roughness = this.caveDetail.noise3(worldX * 0.074, worldY * 0.06, worldZ * 0.074);
    const chamber = this.caveMouth.noise3(worldX * 0.015, worldY * 0.018, worldZ * 0.015);
    const threshold = 0.038 + depthFactor * 0.024;

    const spaghetti = Math.abs(tunnel + roughness * 0.22) < threshold;
    const chamberOpen = chamber > 0.86 && Math.abs(tunnel) < 0.28;
    const noodle = Math.abs(this.caveDetail.noise3(worldX * 0.045, worldY * 0.12, worldZ * 0.045)) < 0.018 && depthFactor > 0.7;

    return spaghetti || chamberOpen || noodle;
  }

  shouldPlaceOre(worldX: number, worldY: number, worldZ: number, kind: "coal" | "iron" | "gold" | "diamond"): boolean {
    const value = this.detail.noise3(worldX * 0.085, worldY * 0.085, worldZ * 0.085);
    const rareValue = this.weirdness.noise3(worldX * 0.12, worldY * 0.12, worldZ * 0.12);
    const vein = Math.abs(this.caveDetail.noise3(worldX * 0.18, worldY * 0.18, worldZ * 0.18));
    if (kind === "coal") {
      const heightBias = smoothstep(24, 96, worldY) * (1 - smoothstep(128, 176, worldY));
      return worldY > 0 && worldY < 160 && value > 0.72 - heightBias * 0.07 && vein < 0.6;
    }
    if (kind === "iron") {
      const midBias = 1 - Math.min(1, Math.abs(worldY - 16) / 70);
      return worldY > -48 && worldY < 112 && value < -0.76 + midBias * 0.05 && vein < 0.58;
    }
    if (kind === "gold") {
      const lowBias = 1 - smoothstep(24, 64, worldY);
      return worldY > -64 && worldY < 48 && value > 0.79 - lowBias * 0.04 && rareValue > 0.32 && vein < 0.5;
    }
    const deepBias = 1 - smoothstep(-52, 20, worldY);
    return worldY > -64 && worldY < 20 && value < -0.84 + deepBias * 0.05 && rareValue < -0.38 && vein < 0.42;
  }

  shouldPlaceGravelPatch(worldX: number, worldY: number, worldZ: number): boolean {
    return this.detail.noise3(worldX * 0.08, worldY * 0.08, worldZ * 0.08) > 0.42;
  }

  shouldFillCaveWithLava(worldX: number, worldY: number, worldZ: number): boolean {
    if (worldY > WORLD_MIN_Y + 13) {
      return false;
    }
    return this.lavaPocket.noise3(worldX * 0.035, worldY * 0.045, worldZ * 0.035) > 0.58;
  }

  shouldCarveRavine(worldX: number, worldY: number, worldZ: number, surfaceHeight: number): boolean {
    const depth = surfaceHeight - worldY;
    if (depth < 10 || depth > 52) {
      return false;
    }
    const axis = this.ravine.noise2(worldX * 0.004, worldZ * 0.004);
    const cross = this.ravine.noise2(worldX * 0.014 + 40, worldZ * 0.014 - 40);
    const vertical = Math.abs(worldY - (surfaceHeight - 24 - axis * 8));
    const width = 0.03 + smoothstep(14, 28, depth) * 0.055;
    return Math.abs(cross) < width && vertical < 12;
  }

  placeStructures(chunk: ChunkColumn): void {
    this.placeDungeon(chunk);
    this.placeMineshaft(chunk);
    this.placeVillage(chunk);
  }

  placeDungeon(chunk: ChunkColumn): void {
    const random = new SplitMix64(deriveSeed(this.seed, `dungeon:${chunk.chunkX},${chunk.chunkZ}`));
    if (random.nextFloat() > 0.055) {
      return;
    }
    const centerX = 4 + random.nextInt(8);
    const centerZ = 4 + random.nextInt(8);
    const surfaceY = chunk.heightmaps.get("OCEAN_FLOOR", centerX, centerZ);
    const centerY = Math.max(WORLD_MIN_Y + 12, surfaceY - 18 - random.nextInt(22));
    for (let z = centerZ - 3; z <= centerZ + 3; z += 1) {
      for (let x = centerX - 3; x <= centerX + 3; x += 1) {
        if (!insideChunk(x, z)) {
          continue;
        }
        for (let y = centerY - 1; y <= centerY + 3; y += 1) {
          const edge = x === centerX - 3 || x === centerX + 3 || z === centerZ - 3 || z === centerZ + 3 || y === centerY - 1 || y === centerY + 3;
          chunk.setGeneratedStateId(x, y, z, edge ? this.cobblestone : 0);
        }
      }
    }
    chunk.setGeneratedStateId(centerX, centerY, centerZ, this.lamp);
  }

  placeMineshaft(chunk: ChunkColumn): void {
    const random = new SplitMix64(deriveSeed(this.seed, `mineshaft:${chunk.chunkX},${chunk.chunkZ}`));
    if (random.nextFloat() > 0.13) {
      return;
    }
    const z = 3 + random.nextInt(10);
    const y = Math.max(WORLD_MIN_Y + 14, Math.min(52, chunk.heightmaps.get("OCEAN_FLOOR", 8, z) - 24));
    for (let x = 1; x < CHUNK_SIZE - 1; x += 1) {
      for (let dy = 0; dy <= 2; dy += 1) {
        for (let dz = -1; dz <= 1; dz += 1) {
          chunk.setGeneratedStateId(x, y + dy, z + dz, 0);
        }
      }
      if (x % 5 === 0) {
        chunk.setGeneratedStateId(x, y, z - 1, this.planks);
        chunk.setGeneratedStateId(x, y + 1, z - 1, this.planks);
        chunk.setGeneratedStateId(x, y, z + 1, this.planks);
        chunk.setGeneratedStateId(x, y + 1, z + 1, this.planks);
        chunk.setGeneratedStateId(x, y + 2, z, this.planks);
      }
    }
  }

  placeVillage(chunk: ChunkColumn): void {
    for (const site of this.villageSitesForChunk(chunk.chunkX, chunk.chunkZ)) {
      this.placeVillageRoads(chunk, site);
      this.placeVillageWell(chunk, site);
      this.placeVillageFarm(chunk, site, { offsetX: -4, offsetZ: -19, width: 9, depth: 7 });
      for (const house of VILLAGE_HOUSES) {
        this.placeVillageHouse(chunk, site, house);
      }
    }
  }

  villageSitesForChunk(chunkX: number, chunkZ: number): VillageSite[] {
    const sites: VillageSite[] = [];
    const regionX = Math.floor(chunkX / VILLAGE_SPACING_CHUNKS);
    const regionZ = Math.floor(chunkZ / VILLAGE_SPACING_CHUNKS);
    for (let rz = regionZ - 1; rz <= regionZ + 1; rz += 1) {
      for (let rx = regionX - 1; rx <= regionX + 1; rx += 1) {
        const site = this.villageSiteForRegion(rx, rz);
        if (!site) {
          continue;
        }
        const siteChunkX = Math.floor(site.centerX / CHUNK_SIZE);
        const siteChunkZ = Math.floor(site.centerZ / CHUNK_SIZE);
        if (Math.abs(chunkX - siteChunkX) <= VILLAGE_RADIUS_CHUNKS && Math.abs(chunkZ - siteChunkZ) <= VILLAGE_RADIUS_CHUNKS) {
          sites.push(site);
        }
      }
    }
    return sites;
  }

  private villageSiteForRegion(regionX: number, regionZ: number): VillageSite | null {
    const starterVillage = regionX === 0 && regionZ === 0;
    const random = new SplitMix64(deriveSeed(this.seed, `village:${regionX},${regionZ}`));
    if (!starterVillage && random.nextFloat() > 0.42) {
      return null;
    }
    const chunkX = starterVillage
      ? 2
      : regionX * VILLAGE_SPACING_CHUNKS + 2 + random.nextInt(VILLAGE_SPACING_CHUNKS - 4);
    const chunkZ = starterVillage
      ? 2
      : regionZ * VILLAGE_SPACING_CHUNKS + 2 + random.nextInt(VILLAGE_SPACING_CHUNKS - 4);
    const centerX = chunkX * CHUNK_SIZE + 8;
    const centerZ = chunkZ * CHUNK_SIZE + 8;
    const terrain = this.sampleTerrain(centerX, centerZ);
    if (!isVillageBiome(terrain.biome.primary.id) || terrain.height <= this.seaLevel + 2) {
      return null;
    }
    const homePositions = VILLAGE_HOUSES.slice(0, 3).map((house) => this.villageStandingPoint(centerX, centerZ, house, "home"));
    const workstations = VILLAGE_HOUSES
      .filter((house): house is VillageHousePlan & { profession: VillageProfession } => Boolean(house.profession))
      .map((house) => ({
        profession: house.profession,
        position: this.villageStandingPoint(centerX, centerZ, house, "work")
      }));
    return {
      id: `${regionX},${regionZ}`,
      centerX,
      centerZ,
      centerY: terrain.height + 1,
      biomeId: terrain.biome.primary.id,
      villagerPositions: [
        { x: centerX - 4, y: terrain.height + 1, z: centerZ },
        { x: centerX + 5, y: terrain.height + 1, z: centerZ - 3 },
        { x: centerX - 2, y: terrain.height + 1, z: centerZ + 5 }
      ],
      homePositions,
      workstations
    };
  }

  private villageStandingPoint(
    centerX: number,
    centerZ: number,
    house: { offsetX: number; offsetZ: number; width: number; depth: number },
    kind: "home" | "work"
  ): Vec3i {
    const minX = centerX + house.offsetX;
    const minZ = centerZ + house.offsetZ;
    const maxX = minX + house.width - 1;
    const maxZ = minZ + house.depth - 1;
    const standingX = kind === "home" ? minX + 2 : maxX - 2;
    const standingZ = kind === "home" ? maxZ - 3 : minZ + 2;
    const terrain = this.sampleTerrain(Math.floor((minX + maxX) / 2), Math.floor((minZ + maxZ) / 2));
    return { x: standingX, y: terrain.height + 1, z: standingZ };
  }

  private placeVillageRoads(chunk: ChunkColumn, site: VillageSite): void {
    const roadState = site.biomeId === "desert" ? this.sand : this.gravel;
    for (let offset = -20; offset <= 20; offset += 1) {
      for (let width = -1; width <= 1; width += 1) {
        this.placeRoadBlock(chunk, site.centerX + offset, site.centerZ + width, roadState);
        this.placeRoadBlock(chunk, site.centerX + width, site.centerZ + offset, roadState);
      }
    }
  }

  private placeRoadBlock(chunk: ChunkColumn, worldX: number, worldZ: number, stateId: number): void {
    if (!worldXZInsideChunk(chunk, worldX, worldZ)) {
      return;
    }
    const terrain = this.sampleTerrain(worldX, worldZ);
    if (terrain.height <= this.seaLevel + 1) {
      return;
    }
    this.setGeneratedWorldBlock(chunk, worldX, terrain.height, worldZ, stateId, { includeNoLeaves: true });
    this.setGeneratedWorldBlock(chunk, worldX, terrain.height + 1, worldZ, 0, { includeNoLeaves: true });
    this.setGeneratedWorldBlock(chunk, worldX, terrain.height + 2, worldZ, 0, { includeNoLeaves: true });
  }

  private placeVillageWell(chunk: ChunkColumn, site: VillageSite): void {
    const y = site.centerY;
    for (let z = -2; z <= 2; z += 1) {
      for (let x = -2; x <= 2; x += 1) {
        const edge = Math.abs(x) === 2 || Math.abs(z) === 2;
        this.setGeneratedWorldBlock(chunk, site.centerX + x, y - 1, site.centerZ + z, edge ? this.cobblestone : this.water, { includeNoLeaves: true });
        if (edge && (Math.abs(x) === 2 || Math.abs(z) === 2)) {
          this.setGeneratedWorldBlock(chunk, site.centerX + x, y, site.centerZ + z, this.cobblestone, { includeNoLeaves: true });
        }
      }
    }
    for (const [x, z] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
      this.setGeneratedWorldBlock(chunk, site.centerX + x, y + 1, site.centerZ + z, this.log, { includeNoLeaves: true });
      this.setGeneratedWorldBlock(chunk, site.centerX + x, y + 2, site.centerZ + z, this.log, { includeNoLeaves: true });
    }
    for (let z = -2; z <= 2; z += 1) {
      for (let x = -2; x <= 2; x += 1) {
        this.setGeneratedWorldBlock(chunk, site.centerX + x, y + 3, site.centerZ + z, this.cobblestone, { includeNoLeaves: true });
      }
    }
    this.setGeneratedWorldBlock(chunk, site.centerX, y + 2, site.centerZ, this.bell, { includeNoLeaves: true, includeHeightmap: false });
  }

  private placeVillageFarm(
    chunk: ChunkColumn,
    site: VillageSite,
    farm: { offsetX: number; offsetZ: number; width: number; depth: number }
  ): void {
    const minX = site.centerX + farm.offsetX;
    const minZ = site.centerZ + farm.offsetZ;
    const maxX = minX + farm.width - 1;
    const maxZ = minZ + farm.depth - 1;
    const centerX = Math.floor((minX + maxX) / 2);
    const centerZ = Math.floor((minZ + maxZ) / 2);
    const terrain = this.sampleTerrain(centerX, centerZ);
    if (terrain.height <= this.seaLevel + 1) {
      return;
    }
    const cropY = terrain.height + 1;
    const waterZ = centerZ;
    for (let worldZ = minZ - 1; worldZ <= maxZ + 1; worldZ += 1) {
      for (let worldX = minX - 1; worldX <= maxX + 1; worldX += 1) {
        const border = worldX < minX || worldX > maxX || worldZ < minZ || worldZ > maxZ;
        const state = border ? this.log : worldZ === waterZ ? this.water : this.farmland;
        this.setGeneratedWorldBlock(chunk, worldX, cropY - 1, worldZ, state, { includeNoLeaves: true });
        this.setGeneratedWorldBlock(chunk, worldX, cropY, worldZ, 0, { includeNoLeaves: true });
        this.setGeneratedWorldBlock(chunk, worldX, cropY + 1, worldZ, 0, { includeNoLeaves: true });
        if (!border && worldZ !== waterZ && (worldX + worldZ) % 5 !== 0) {
          this.setGeneratedWorldBlock(chunk, worldX, cropY, worldZ, this.wheat, { includeNoLeaves: false, includeHeightmap: false });
        }
      }
    }
  }

  private placeVillageHouse(
    chunk: ChunkColumn,
    site: VillageSite,
    house: { offsetX: number; offsetZ: number; width: number; depth: number; profession?: VillageProfession }
  ): void {
    const minX = site.centerX + house.offsetX;
    const minZ = site.centerZ + house.offsetZ;
    const maxX = minX + house.width - 1;
    const maxZ = minZ + house.depth - 1;
    const centerX = Math.floor((minX + maxX) / 2);
    const centerZ = Math.floor((minZ + maxZ) / 2);
    const terrain = this.sampleTerrain(centerX, centerZ);
    if (terrain.height <= this.seaLevel + 1) {
      return;
    }
    const floorY = terrain.height + 1;
    const desert = site.biomeId === "desert";
    const floor = desert ? this.sand : this.planks;
    const wall = desert ? this.sand : this.planks;
    const roof = desert ? this.sand : this.cobblestone;
    const doorOnNorth = centerZ < site.centerZ;
    const doorX = centerX;
    const doorZ = doorOnNorth ? minZ : maxZ;

    for (let worldZ = minZ - 1; worldZ <= maxZ + 1; worldZ += 1) {
      for (let worldX = minX - 1; worldX <= maxX + 1; worldX += 1) {
        const overhang = worldX < minX || worldX > maxX || worldZ < minZ || worldZ > maxZ;
        if (!overhang) {
          this.setGeneratedWorldBlock(chunk, worldX, floorY - 1, worldZ, floor, { includeNoLeaves: true });
          for (let y = floorY; y <= floorY + 3; y += 1) {
            const edge = worldX === minX || worldX === maxX || worldZ === minZ || worldZ === maxZ;
            const door = worldX === doorX && worldZ === doorZ && y <= floorY + 1;
            const window = edge && !door && y === floorY + 2 && ((worldX + worldZ) % 3 === 0);
            this.setGeneratedWorldBlock(chunk, worldX, y, worldZ, edge && !door && !window ? wall : 0, { includeNoLeaves: true });
          }
        }
        this.setGeneratedWorldBlock(chunk, worldX, floorY + 4, worldZ, roof, { includeNoLeaves: true });
      }
    }
    this.setGeneratedWorldBlock(chunk, doorX, floorY, doorZ, 0, { includeNoLeaves: true });
    this.setGeneratedWorldBlock(chunk, doorX, floorY + 1, doorZ, 0, { includeNoLeaves: true });
    this.setGeneratedWorldBlock(
      chunk,
      doorX,
      floorY,
      doorZ,
      doorOnNorth ? this.doorNorthLowerOpen : this.doorSouthLowerOpen,
      { includeNoLeaves: true, includeHeightmap: false }
    );
    this.setGeneratedWorldBlock(
      chunk,
      doorX,
      floorY + 1,
      doorZ,
      doorOnNorth ? this.doorNorthUpperOpen : this.doorSouthUpperOpen,
      { includeNoLeaves: true, includeHeightmap: false }
    );
    this.setGeneratedWorldBlock(chunk, doorX, floorY + 2, doorZ, this.torch, { includeNoLeaves: true });
    this.placeVillageInterior(chunk, house.profession, minX, maxX, minZ, maxZ, floorY);
  }

  private placeVillageInterior(
    chunk: ChunkColumn,
    profession: VillageProfession | undefined,
    minX: number,
    maxX: number,
    minZ: number,
    maxZ: number,
    floorY: number
  ): void {
    const bedX = minX + 1;
    const bedZ = maxZ - 2;
    const workstationX = maxX - 1;
    const workstationZ = minZ + 2;
    this.setGeneratedWorldBlock(chunk, bedX, floorY, bedZ, this.bed, { includeNoLeaves: true });
    this.setGeneratedWorldBlock(chunk, bedX + 1, floorY, bedZ, this.bed, { includeNoLeaves: true });
    if (!profession) {
      return;
    }
    const workstationState = profession === "farmer"
      ? this.composter
      : profession === "librarian"
        ? this.lectern
        : this.stonecutter;
    this.setGeneratedWorldBlock(chunk, workstationX, floorY, workstationZ, workstationState, { includeNoLeaves: true });
  }

  private setGeneratedWorldBlock(
    chunk: ChunkColumn,
    worldX: number,
    worldY: number,
    worldZ: number,
    stateId: number,
    options: { includeNoLeaves: boolean; includeHeightmap?: boolean }
  ): void {
    if (!worldXZInsideChunk(chunk, worldX, worldZ)) {
      return;
    }
    const localX = worldX - chunk.chunkX * CHUNK_SIZE;
    const localZ = worldZ - chunk.chunkZ * CHUNK_SIZE;
    chunk.setGeneratedStateId(localX, worldY, localZ, stateId);
    if (stateId !== 0 && options.includeHeightmap !== false) {
      setHeightmapMax(chunk, localX, localZ, worldY, options);
    }
  }

  shouldCarveStarterCave(worldX: number, worldY: number, worldZ: number): boolean {
    const entranceDx = worldX - STARTER_CAVE_ENTRANCE.x;
    if (entranceDx < -1 || entranceDx > STARTER_CAVE_LENGTH) {
      return false;
    }

    const entranceSurfaceY = this.starterCaveEntranceSurfaceY ??= this.sampleSurfaceHeight(
      STARTER_CAVE_ENTRANCE.x,
      STARTER_CAVE_ENTRANCE.z
    );
    const progress = Math.max(0, Math.min(1, entranceDx / STARTER_CAVE_LENGTH));
    const pathZ = STARTER_CAVE_ENTRANCE.z + Math.sin(progress * Math.PI * 1.05) * 2.1;
    const tunnelCenterY = entranceSurfaceY - 1.1 - progress * 12;
    const horizontalRadius = progress < 0.12 ? 1.55 : 1.18;
    const verticalRadius = progress < 0.12 ? 2.25 : 1.48;
    const horizontalDistance = Math.abs(worldZ - pathZ) / horizontalRadius;
    const verticalDistance = Math.abs(worldY - tunnelCenterY) / verticalRadius;

    return horizontalDistance * horizontalDistance + verticalDistance * verticalDistance < 1;
  }
}

function smoothstep(edge0: number, edge1: number, value: number): number {
  const t = Math.max(0, Math.min(1, (value - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function clampInt(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function blendNoise(primary: number, secondary: number, secondaryWeight: number): number {
  return primary * (1 - secondaryWeight) + secondary * secondaryWeight;
}

function insideChunk(localX: number, localZ: number): boolean {
  return localX >= 0 && localX < CHUNK_SIZE && localZ >= 0 && localZ < CHUNK_SIZE;
}

function worldXZInsideChunk(chunk: ChunkColumn, worldX: number, worldZ: number): boolean {
  return worldToChunkLocal(worldX, chunk.chunkX) >= 0
    && worldToChunkLocal(worldX, chunk.chunkX) < CHUNK_SIZE
    && worldToChunkLocal(worldZ, chunk.chunkZ) >= 0
    && worldToChunkLocal(worldZ, chunk.chunkZ) < CHUNK_SIZE;
}

function worldToChunkLocal(worldCoord: number, chunkCoord: number): number {
  return worldCoord - chunkCoord * CHUNK_SIZE;
}

function isVillageBiome(id: string): id is VillageSite["biomeId"] {
  return id === "plains" || id === "forest" || id === "desert";
}

function setHeightmapMax(
  chunk: ChunkColumn,
  localX: number,
  localZ: number,
  worldY: number,
  options: { includeNoLeaves: boolean }
): void {
  chunk.heightmaps.set("WORLD_SURFACE", localX, localZ, Math.max(chunk.heightmaps.get("WORLD_SURFACE", localX, localZ), worldY));
  chunk.heightmaps.set(
    "MOTION_BLOCKING",
    localX,
    localZ,
    Math.max(chunk.heightmaps.get("MOTION_BLOCKING", localX, localZ), worldY)
  );
  if (options.includeNoLeaves) {
    chunk.heightmaps.set(
      "MOTION_BLOCKING_NO_LEAVES",
      localX,
      localZ,
      Math.max(chunk.heightmaps.get("MOTION_BLOCKING_NO_LEAVES", localX, localZ), worldY)
    );
  }
}
