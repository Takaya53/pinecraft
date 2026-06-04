import type { ChunkStatus } from "../world/ChunkStatus.ts";
import type { ChunkMesh } from "../meshing/chunkMesher.ts";

export type WorkerJobId = string;

export type SharedSectionBuffers = {
  blocks: SharedArrayBuffer;
  skyLight: SharedArrayBuffer;
  blockLight: SharedArrayBuffer;
};

export type GenerateChunkJob = {
  type: "generateChunk";
  id: WorkerJobId;
  seed: string;
  dimensionId: string;
  chunkX: number;
  chunkZ: number;
  targetStatus: ChunkStatus;
};

export type MeshChunkJob = {
  type: "meshChunk";
  id: WorkerJobId;
  chunkX: number;
  chunkZ: number;
  status: ChunkStatus;
  sections: SharedSectionBuffers[];
};

export type LightChunkJob = {
  type: "lightChunk";
  id: WorkerJobId;
  chunkX: number;
  chunkZ: number;
  sections: SharedSectionBuffers[];
};

export type WorkerJob = GenerateChunkJob | MeshChunkJob | LightChunkJob;

export type WorkerJobResult =
  | { type: "chunkGenerated"; id: WorkerJobId; chunkX: number; chunkZ: number; status: ChunkStatus }
  | { type: "chunkMeshed"; id: WorkerJobId; chunkX: number; chunkZ: number; mesh: ChunkMesh }
  | { type: "chunkLit"; id: WorkerJobId; chunkX: number; chunkZ: number }
  | { type: "jobFailed"; id: WorkerJobId; message: string };
