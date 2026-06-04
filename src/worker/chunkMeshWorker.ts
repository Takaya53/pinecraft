import { createDefaultBlockRegistry } from "../block/blockRegistry.ts";
import { OverworldGenerator } from "../generation/overworldGenerator.ts";
import { type ChunkMesh } from "../meshing/chunkMesher.ts";
import { applyStoredChunkDeltas, type StoredChunkDeltas } from "../persistence/chunkDeltaStore.ts";
import { ChunkPipeline, meshKey } from "../pipeline/ChunkPipeline.ts";
import { World } from "../world/World.ts";
import { packChunkDataForTransfer, type ChunkDataTransfer } from "./chunkDataTransfer.ts";
import { packChunkMeshForTransfer } from "./meshTransfer.ts";

type ChunkMeshWorkerRequest = {
  id: string;
  seed: string;
  chunkX: number;
  chunkZ: number;
  chunkDeltas?: StoredChunkDeltas[];
};

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

type WorkerContext = {
  registry: ReturnType<typeof createDefaultBlockRegistry>;
  world: World;
  generator: OverworldGenerator;
  pipeline: ChunkPipeline;
};

let cachedSeed: string | null = null;
let cachedContext: WorkerContext | null = null;
let activeDeltaMap = new Map<string, StoredChunkDeltas>();

self.onmessage = (event: MessageEvent<ChunkMeshWorkerRequest>) => {
  const job = event.data;
  try {
    const context = workerContextForSeed(job.seed);
    activeDeltaMap = new Map((job.chunkDeltas ?? []).map((entry) => [meshKey(entry.chunkX, entry.chunkZ), entry]));
    applyDeltasToCachedChunks(context);

    context.pipeline.ensureAreaReadyForMeshing(job.chunkX - 1, job.chunkX + 1, job.chunkZ - 1, job.chunkZ + 1);
    const mesh = context.pipeline.remeshChunk(job.chunkX, job.chunkZ);
    const chunk = context.world.getOrCreateChunk(job.chunkX, job.chunkZ);

    const packed = packChunkMeshForTransfer(mesh, context.registry);
    const packedChunk = packChunkDataForTransfer(chunk);
    const response: ChunkMeshWorkerResponse = {
      type: "chunkMeshed",
      id: job.id,
      chunkX: job.chunkX,
      chunkZ: job.chunkZ,
      mesh: packed.mesh,
      chunkData: packedChunk.data
    };
    self.postMessage(response, [...packed.transfer, ...packedChunk.transfer]);
  } catch (error) {
    const response: ChunkMeshWorkerResponse = {
      type: "jobFailed",
      id: job.id,
      message: error instanceof Error ? error.message : String(error)
    };
    self.postMessage(response);
  }
};

function workerContextForSeed(seed: string): WorkerContext {
  if (cachedContext && cachedSeed === seed) {
    return cachedContext;
  }

  const registry = createDefaultBlockRegistry();
  const world = new World({ seed, blockRegistry: registry });
  const generator = new OverworldGenerator({ seed, registry });
  const pipeline = new ChunkPipeline({
    world,
    generator: (chunk) => {
      generator.generateChunk(chunk, world);
      const deltas = activeDeltaMap.get(meshKey(chunk.chunkX, chunk.chunkZ));
      if (deltas) {
        applyStoredChunkDeltas(chunk, deltas.blockDeltas, registry);
      }
    }
  });

  cachedSeed = seed;
  cachedContext = { registry, world, generator, pipeline };
  return cachedContext;
}

function applyDeltasToCachedChunks(context: WorkerContext): void {
  for (const entry of activeDeltaMap.values()) {
    const chunk = context.world.getChunk(entry.chunkX, entry.chunkZ);
    if (!chunk) {
      continue;
    }
    applyStoredChunkDeltas(chunk, entry.blockDeltas, context.registry);
    context.pipeline.meshes.delete(meshKey(entry.chunkX, entry.chunkZ));
  }
}
