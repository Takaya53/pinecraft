import {
  WORLD_MAX_Y,
  WORLD_MIN_Y,
  chunkKey,
  worldToChunkCoord,
  worldToLocalBlockCoord
} from "../core/constants.ts";
import { type StateId } from "../block/blockState.ts";
import { BlockRegistry, createDefaultBlockRegistry } from "../block/blockRegistry.ts";
import { DimensionRegistry, OVERWORLD_DIMENSION, type DimensionType } from "./Dimension.ts";
import { ChunkColumn } from "./Chunk.ts";

export type WorldOptions = {
  seed: string | number | bigint;
  blockRegistry?: BlockRegistry;
  dimensionRegistry?: DimensionRegistry;
  dimensionId?: string;
};

export class World {
  seed: string | number | bigint;
  blockRegistry: BlockRegistry;
  dimensionRegistry: DimensionRegistry;
  dimension: DimensionType;
  chunks: Map<string, ChunkColumn>;

  constructor(options: WorldOptions) {
    this.seed = options.seed;
    this.blockRegistry = options.blockRegistry ?? createDefaultBlockRegistry();
    this.dimensionRegistry = options.dimensionRegistry ?? new DimensionRegistry([OVERWORLD_DIMENSION]);
    this.dimension = this.dimensionRegistry.get(options.dimensionId ?? "overworld");
    this.chunks = new Map();
  }

  getChunk(chunkX: number, chunkZ: number): ChunkColumn | undefined {
    return this.chunks.get(chunkKey(chunkX, chunkZ));
  }

  getOrCreateChunk(chunkX: number, chunkZ: number): ChunkColumn {
    const key = chunkKey(chunkX, chunkZ);
    let chunk = this.chunks.get(key);
    if (!chunk) {
      chunk = new ChunkColumn({ chunkX, chunkZ });
      this.chunks.set(key, chunk);
    }
    return chunk;
  }

  unloadChunk(chunkX: number, chunkZ: number): ChunkColumn | undefined {
    const key = chunkKey(chunkX, chunkZ);
    const chunk = this.chunks.get(key);
    this.chunks.delete(key);
    return chunk;
  }

  getStateId(worldX: number, worldY: number, worldZ: number): StateId {
    const chunk = this.getOrCreateChunk(worldToChunkCoord(worldX), worldToChunkCoord(worldZ));
    return chunk.getStateId(
      worldToLocalBlockCoord(worldX),
      worldY,
      worldToLocalBlockCoord(worldZ)
    );
  }

  getStateIdIfLoaded(worldX: number, worldY: number, worldZ: number): StateId | null {
    if (worldY < WORLD_MIN_Y || worldY > WORLD_MAX_Y) {
      return null;
    }
    const chunk = this.getChunk(worldToChunkCoord(worldX), worldToChunkCoord(worldZ));
    if (!chunk) {
      return null;
    }
    return chunk.getStateId(
      worldToLocalBlockCoord(worldX),
      worldY,
      worldToLocalBlockCoord(worldZ)
    );
  }

  getBlockTypeIdLoaded(worldX: number, worldY: number, worldZ: number): string | null {
    const stateId = this.getStateIdIfLoaded(worldX, worldY, worldZ);
    if (stateId === null) {
      return null;
    }
    return this.blockRegistry.getState(stateId).typeId;
  }

  isSolidBlockLoaded(worldX: number, worldY: number, worldZ: number): boolean {
    const stateId = this.getStateIdIfLoaded(worldX, worldY, worldZ);
    if (stateId === null) {
      return false;
    }
    const state = this.blockRegistry.getState(stateId);
    if (state.typeId === "door" && state.properties.open === true) {
      return false;
    }
    return this.blockRegistry.getDefinitionForState(stateId).collision === "solid";
  }

  isFluidBlockLoaded(worldX: number, worldY: number, worldZ: number): boolean {
    const stateId = this.getStateIdIfLoaded(worldX, worldY, worldZ);
    if (stateId === null) {
      return false;
    }
    return this.blockRegistry.getDefinitionForState(stateId).collision === "fluid";
  }

  getBlockLightLevelLoaded(worldX: number, worldY: number, worldZ: number): number {
    if (worldY < WORLD_MIN_Y || worldY > WORLD_MAX_Y) {
      return 0;
    }
    const chunk = this.getChunk(worldToChunkCoord(worldX), worldToChunkCoord(worldZ));
    if (!chunk) {
      return 0;
    }
    return chunk.getBlockLight(
      worldToLocalBlockCoord(worldX),
      worldY,
      worldToLocalBlockCoord(worldZ)
    );
  }

  getMotionBlockingHeightLoaded(worldX: number, worldZ: number): number | null {
    const chunk = this.getChunk(worldToChunkCoord(worldX), worldToChunkCoord(worldZ));
    if (!chunk) {
      return null;
    }
    return chunk.heightmaps.get(
      "MOTION_BLOCKING_NO_LEAVES",
      worldToLocalBlockCoord(worldX),
      worldToLocalBlockCoord(worldZ)
    );
  }

  setStateId(worldX: number, worldY: number, worldZ: number, stateId: StateId): void {
    const chunk = this.getOrCreateChunk(worldToChunkCoord(worldX), worldToChunkCoord(worldZ));
    chunk.setStateId(
      worldToLocalBlockCoord(worldX),
      worldY,
      worldToLocalBlockCoord(worldZ),
      stateId
    );
  }
}
