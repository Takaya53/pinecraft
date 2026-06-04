import { CHUNK_SIZE, WORLD_MAX_Y, WORLD_MIN_Y, worldToChunkCoord, worldToLocalBlockCoord } from "../core/constants.ts";
import type { BlockRegistry } from "../block/blockRegistry.ts";
import type { StateId } from "../block/blockState.ts";
import type { World } from "./World.ts";

export type FluidEdit = {
  x: number;
  y: number;
  z: number;
  stateId: StateId;
};

export type FluidSimulationOptions = {
  centerX: number;
  centerZ: number;
  radiusChunks: number;
  maxEdits?: number;
  maxColumnScans?: number;
};

const HORIZONTAL_DIRECTIONS = [
  { x: 1, z: 0 },
  { x: -1, z: 0 },
  { x: 0, z: 1 },
  { x: 0, z: -1 }
] as const;

const orderedChunkOffsetCache = new Map<number, readonly { x: number; z: number }[]>();
const orderedLocalColumnCache = new Map<string, readonly { x: number; z: number }[]>();

export function simulateFluids(
  world: World,
  registry: BlockRegistry,
  options: FluidSimulationOptions
): FluidEdit[] {
  const edits: FluidEdit[] = [];
  const maxEdits = options.maxEdits ?? 48;
  const water = registry.resolveState("water", { level: 0 });
  const lava = registry.resolveState("lava", { level: 0 });
  const centerChunkX = worldToChunkCoord(options.centerX);
  const centerChunkZ = worldToChunkCoord(options.centerZ);
  const centerLocalX = worldToLocalBlockCoord(options.centerX);
  const centerLocalZ = worldToLocalBlockCoord(options.centerZ);
  const maxColumnScans = options.maxColumnScans ?? Infinity;
  let scannedColumns = 0;

  for (const offset of orderedChunkOffsets(options.radiusChunks)) {
    const chunkX = centerChunkX + offset.x;
    const chunkZ = centerChunkZ + offset.z;
    const chunk = world.getChunk(chunkX, chunkZ);
    if (!chunk) {
      continue;
    }
    const columns = orderedLocalColumns(
      chunkX === centerChunkX ? centerLocalX : CHUNK_SIZE / 2,
      chunkZ === centerChunkZ ? centerLocalZ : CHUNK_SIZE / 2
    );
    for (const column of columns) {
      scannedColumns += 1;
      if (scannedColumns > maxColumnScans) {
        return edits.slice(0, maxEdits);
      }
      const localX = column.x;
      const localZ = column.z;
      const worldX = chunkX * CHUNK_SIZE + localX;
      const worldZ = chunkZ * CHUNK_SIZE + localZ;
      const top = Math.max(chunk.heightmaps.get("WORLD_SURFACE", localX, localZ), WORLD_MIN_Y);
      for (let worldY = Math.min(WORLD_MAX_Y, top + 2); worldY >= WORLD_MIN_Y; worldY -= 1) {
        const stateId = chunk.getStateId(localX, worldY, localZ);
        const state = registry.getState(stateId);
        if (state.typeId !== "water" && state.typeId !== "lava") {
          continue;
        }
        pushFluidEdits(world, registry, edits, {
          x: worldX,
          y: worldY,
          z: worldZ,
          typeId: state.typeId,
          stateId,
          sourceStateId: state.typeId === "water" ? water : lava,
          maxLevel: state.typeId === "water" ? 7 : 4
        });
        if (edits.length >= maxEdits) {
          return edits.slice(0, maxEdits);
        }
      }
    }
  }

  return edits;
}

function orderedChunkOffsets(radiusChunks: number): readonly { x: number; z: number }[] {
  const cached = orderedChunkOffsetCache.get(radiusChunks);
  if (cached) {
    return cached;
  }
  const offsets = [];
  for (let z = -radiusChunks; z <= radiusChunks; z += 1) {
    for (let x = -radiusChunks; x <= radiusChunks; x += 1) {
      offsets.push({ x, z });
    }
  }
  offsets.sort((a, b) => a.x * a.x + a.z * a.z - (b.x * b.x + b.z * b.z));
  orderedChunkOffsetCache.set(radiusChunks, offsets);
  return offsets;
}

function orderedLocalColumns(centerX: number, centerZ: number): readonly { x: number; z: number }[] {
  const cacheKey = `${Math.round(centerX * 2) / 2},${Math.round(centerZ * 2) / 2}`;
  const cached = orderedLocalColumnCache.get(cacheKey);
  if (cached) {
    return cached;
  }
  const columns = [];
  for (let z = 0; z < CHUNK_SIZE; z += 1) {
    for (let x = 0; x < CHUNK_SIZE; x += 1) {
      columns.push({ x, z });
    }
  }
  return columns.sort((a, b) => {
    const adx = a.x + 0.5 - centerX;
    const adz = a.z + 0.5 - centerZ;
    const bdx = b.x + 0.5 - centerX;
    const bdz = b.z + 0.5 - centerZ;
    return adx * adx + adz * adz - (bdx * bdx + bdz * bdz);
  });
  orderedLocalColumnCache.set(cacheKey, columns);
  return columns;
}

function pushFluidEdits(
  world: World,
  registry: BlockRegistry,
  edits: FluidEdit[],
  source: {
    x: number;
    y: number;
    z: number;
    typeId: "water" | "lava";
    stateId: StateId;
    sourceStateId: StateId;
    maxLevel: number;
  }
): void {
  const level = Number(registry.getState(source.stateId).properties.level ?? 0);
  const below = { x: source.x, y: source.y - 1, z: source.z };
  if (below.y >= WORLD_MIN_Y && canFluidReplace(world, registry, below.x, below.y, below.z, source.typeId)) {
    edits.push({ ...below, stateId: source.sourceStateId });
    return;
  }

  if (level >= source.maxLevel) {
    return;
  }

  const nextLevel = level + 1;
  const nextStateId = registry.resolveState(source.typeId, { level: nextLevel });
  for (const direction of HORIZONTAL_DIRECTIONS) {
    const target = {
      x: source.x + direction.x,
      y: source.y,
      z: source.z + direction.z
    };
    if (canFluidReplace(world, registry, target.x, target.y, target.z, source.typeId)) {
      edits.push({ ...target, stateId: nextStateId });
    }
  }
}

function canFluidReplace(
  world: World,
  registry: BlockRegistry,
  worldX: number,
  worldY: number,
  worldZ: number,
  typeId: "water" | "lava"
): boolean {
  if (worldY < WORLD_MIN_Y || worldY > WORLD_MAX_Y) {
    return false;
  }
  const stateId = world.getStateIdIfLoaded(worldX, worldY, worldZ);
  if (stateId === null) {
    return false;
  }
  const state = registry.getState(stateId);
  if (state.typeId === typeId) {
    const currentLevel = Number(state.properties.level ?? 0);
    return currentLevel > 0;
  }
  const definition = registry.getDefinitionForState(stateId);
  return definition.replaceable === true || definition.renderLayer === "none";
}

export function applyFluidEdits(world: World, edits: readonly FluidEdit[]): Set<string> {
  const changedChunks = new Set<string>();
  for (const edit of edits) {
    world.setStateId(edit.x, edit.y, edit.z, edit.stateId);
    changedChunks.add(`${worldToChunkCoord(edit.x)},${worldToChunkCoord(edit.z)}`);
    if (worldToLocalBlockCoord(edit.x) === 0) changedChunks.add(`${worldToChunkCoord(edit.x) - 1},${worldToChunkCoord(edit.z)}`);
    if (worldToLocalBlockCoord(edit.x) === CHUNK_SIZE - 1) changedChunks.add(`${worldToChunkCoord(edit.x) + 1},${worldToChunkCoord(edit.z)}`);
    if (worldToLocalBlockCoord(edit.z) === 0) changedChunks.add(`${worldToChunkCoord(edit.x)},${worldToChunkCoord(edit.z) - 1}`);
    if (worldToLocalBlockCoord(edit.z) === CHUNK_SIZE - 1) changedChunks.add(`${worldToChunkCoord(edit.x)},${worldToChunkCoord(edit.z) + 1}`);
  }
  return changedChunks;
}
