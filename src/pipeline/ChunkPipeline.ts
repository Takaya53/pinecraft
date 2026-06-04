import { BlockRegistry } from "../block/blockRegistry.ts";
import type { StateId } from "../block/blockState.ts";
import { WORLD_MAX_Y, WORLD_MIN_Y, worldToChunkCoord, worldToLocalBlockCoord } from "../core/constants.ts";
import { LightEngine } from "../lighting/lightEngine.ts";
import { ChunkMesher, type ChunkMesh } from "../meshing/chunkMesher.ts";
import { ChunkColumn } from "../world/Chunk.ts";
import { World } from "../world/World.ts";

export type ChunkGenerator = (chunk: ChunkColumn, world: World) => void;

export type PipelineChunkResult = {
  chunk: ChunkColumn;
  mesh: ChunkMesh | null;
};

export class ChunkPipeline {
  world: World;
  registry: BlockRegistry;
  lightEngine: LightEngine;
  mesher: ChunkMesher;
  generator: ChunkGenerator;
  meshes: Map<string, ChunkMesh>;

  constructor(options: {
    world: World;
    generator: ChunkGenerator;
    lightEngine?: LightEngine;
    mesher?: ChunkMesher;
  }) {
    this.world = options.world;
    this.registry = this.world.blockRegistry;
    this.lightEngine = options.lightEngine ?? new LightEngine(this.registry);
    this.mesher = options.mesher ?? new ChunkMesher(this.registry);
    this.generator = options.generator;
    this.meshes = new Map();
  }

  ensureChunkFull(chunkX: number, chunkZ: number): PipelineChunkResult {
    const chunk = this.world.getOrCreateChunk(chunkX, chunkZ);

    this.advanceGenerated(chunk);
    if (chunk.status === "LIGHT_PENDING") {
      this.lightEngine.recomputeChunkLocal(chunk);
    }

    if (chunk.status === "LIT") {
      this.meshes.set(meshKey(chunkX, chunkZ), this.mesher.buildChunkMesh(chunk, this.world));
      chunk.advanceStatus("FULL");
    }

    return {
      chunk,
      mesh: this.meshes.get(meshKey(chunkX, chunkZ)) ?? null
    };
  }

  remeshChunk(chunkX: number, chunkZ: number): ChunkMesh {
    const chunk = this.world.getOrCreateChunk(chunkX, chunkZ);
    this.lightEngine.recomputeChunkLocal(chunk);
    const mesh = this.mesher.buildChunkMesh(chunk, this.world);
    this.meshes.set(meshKey(chunkX, chunkZ), mesh);
    chunk.markStatusAtLeast("FULL");
    return mesh;
  }

  setBlockAndRemesh(worldX: number, worldY: number, worldZ: number, stateId: StateId): PipelineChunkResult[] {
    if (worldY < WORLD_MIN_Y || worldY > WORLD_MAX_Y) {
      return [];
    }

    this.world.setStateId(worldX, worldY, worldZ, stateId);
    const centerChunkX = worldToChunkCoord(worldX);
    const centerChunkZ = worldToChunkCoord(worldZ);
    const localX = worldToLocalBlockCoord(worldX);
    const localZ = worldToLocalBlockCoord(worldZ);
    const chunksToRemesh = new Set<string>([meshKey(centerChunkX, centerChunkZ)]);

    if (localX === 0) chunksToRemesh.add(meshKey(centerChunkX - 1, centerChunkZ));
    if (localX === 15) chunksToRemesh.add(meshKey(centerChunkX + 1, centerChunkZ));
    if (localZ === 0) chunksToRemesh.add(meshKey(centerChunkX, centerChunkZ - 1));
    if (localZ === 15) chunksToRemesh.add(meshKey(centerChunkX, centerChunkZ + 1));

    const results: PipelineChunkResult[] = [];
    for (const key of chunksToRemesh) {
      const [chunkX, chunkZ] = key.split(",").map(Number);
      const chunk = this.world.getChunk(chunkX, chunkZ);
      if (!chunk) {
        continue;
      }
      results.push({ chunk, mesh: this.remeshChunk(chunkX, chunkZ) });
    }
    return results;
  }

  advanceGenerated(chunk: ChunkColumn): void {
    if (chunk.status === "UNLOADED") {
      chunk.advanceStatus("BIOMES");
    }
    if (chunk.status === "BIOMES") {
      chunk.advanceStatus("NOISE");
    }
    if (chunk.status === "NOISE") {
      chunk.advanceStatus("SURFACE");
    }
    if (chunk.status === "SURFACE") {
      chunk.advanceStatus("CARVERS");
    }
    if (chunk.status === "CARVERS") {
      chunk.advanceStatus("FEATURES");
      this.generator(chunk, this.world);
    }
    if (chunk.status === "FEATURES") {
      chunk.advanceStatus("LIGHT_PENDING");
    }
  }

  ensureAreaFull(minChunkX: number, maxChunkX: number, minChunkZ: number, maxChunkZ: number): PipelineChunkResult[] {
    const chunks = this.ensureAreaReadyForMeshing(minChunkX, maxChunkX, minChunkZ, maxChunkZ);

    return chunks.map((chunk) => {
      if (chunk.status === "LIT") {
        this.meshes.set(meshKey(chunk.chunkX, chunk.chunkZ), this.mesher.buildChunkMesh(chunk, this.world));
        chunk.advanceStatus("FULL");
      }
      return {
        chunk,
        mesh: this.meshes.get(meshKey(chunk.chunkX, chunk.chunkZ)) ?? null
      };
    });
  }

  ensureAreaReadyForMeshing(minChunkX: number, maxChunkX: number, minChunkZ: number, maxChunkZ: number): ChunkColumn[] {
    const chunks: ChunkColumn[] = [];

    for (let chunkZ = minChunkZ; chunkZ <= maxChunkZ; chunkZ += 1) {
      for (let chunkX = minChunkX; chunkX <= maxChunkX; chunkX += 1) {
        const chunk = this.world.getOrCreateChunk(chunkX, chunkZ);
        this.advanceGenerated(chunk);
        chunks.push(chunk);
      }
    }

    for (const chunk of chunks) {
      if (chunk.status === "LIGHT_PENDING") {
        this.lightEngine.recomputeChunkLocal(chunk);
      }
    }

    return chunks;
  }
}

export function meshKey(chunkX: number, chunkZ: number): string {
  return `${chunkX},${chunkZ}`;
}
