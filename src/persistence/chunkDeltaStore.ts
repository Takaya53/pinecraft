import { chunkKey } from "../core/constants.ts";
import type { BlockRegistry } from "../block/blockRegistry.ts";
import type { ChunkBlockDelta, ChunkColumn } from "../world/Chunk.ts";

export type StoredChunkDeltas = {
  chunkX: number;
  chunkZ: number;
  blockDeltas: ChunkBlockDelta[];
};

export class ChunkDeltaStore {
  private chunks: Map<string, StoredChunkDeltas>;

  constructor(entries: StoredChunkDeltas[] = []) {
    this.chunks = new Map();
    for (const entry of entries) {
      this.set(entry);
    }
  }

  get size(): number {
    return this.chunks.size;
  }

  entries(): StoredChunkDeltas[] {
    return Array.from(this.chunks.values()).map((entry) => cloneEntry(entry)!);
  }

  replace(entries: StoredChunkDeltas[]): void {
    this.chunks.clear();
    for (const entry of entries) {
      this.set(entry);
    }
  }

  get(chunkX: number, chunkZ: number): StoredChunkDeltas | null {
    return cloneEntry(this.chunks.get(chunkKey(chunkX, chunkZ)) ?? null);
  }

  set(entry: StoredChunkDeltas): void {
    if (entry.blockDeltas.length === 0) {
      this.chunks.delete(chunkKey(entry.chunkX, entry.chunkZ));
      return;
    }
    this.chunks.set(chunkKey(entry.chunkX, entry.chunkZ), cloneEntry(entry)!);
  }

  capture(chunk: ChunkColumn): void {
    this.set(createStoredChunkDeltas(chunk));
  }

  applyToChunk(chunk: ChunkColumn, registry: BlockRegistry): void {
    const entry = this.chunks.get(chunkKey(chunk.chunkX, chunk.chunkZ));
    if (!entry) {
      return;
    }
    applyStoredChunkDeltas(chunk, entry.blockDeltas, registry);
  }
}

export function createStoredChunkDeltas(chunk: ChunkColumn): StoredChunkDeltas {
  return {
    chunkX: chunk.chunkX,
    chunkZ: chunk.chunkZ,
    blockDeltas: Array.from(chunk.blockDeltas.values()).map((delta) => ({ ...delta }))
  };
}

export function applyStoredChunkDeltas(
  chunk: ChunkColumn,
  blockDeltas: ChunkBlockDelta[],
  registry: BlockRegistry
): void {
  for (const delta of blockDeltas) {
    chunk.setStateId(delta.localX, delta.worldY, delta.localZ, delta.stateId);
  }
  if (blockDeltas.length > 0) {
    chunk.recomputeHeightmapsFromRegistry(registry);
  }
}

function cloneEntry(entry: StoredChunkDeltas | null): StoredChunkDeltas | null {
  if (!entry) {
    return null;
  }
  return {
    chunkX: entry.chunkX,
    chunkZ: entry.chunkZ,
    blockDeltas: entry.blockDeltas.map((delta) => ({ ...delta }))
  };
}
