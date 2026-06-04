export const CHUNK_STATUSES = [
  "UNLOADED",
  "BIOMES",
  "NOISE",
  "SURFACE",
  "CARVERS",
  "FEATURES",
  "LIGHT_PENDING",
  "LIT",
  "FULL"
] as const;

export type ChunkStatus = (typeof CHUNK_STATUSES)[number];

const STATUS_ORDER = new Map<ChunkStatus, number>(
  CHUNK_STATUSES.map((status, index) => [status, index])
);

export function chunkStatusOrder(status: ChunkStatus): number {
  const order = STATUS_ORDER.get(status);
  if (order === undefined) {
    throw new Error(`unknown chunk status: ${status}`);
  }
  return order;
}

export function isChunkStatusAtLeast(status: ChunkStatus, minimum: ChunkStatus): boolean {
  return chunkStatusOrder(status) >= chunkStatusOrder(minimum);
}

export function canAdvanceChunkStatus(from: ChunkStatus, to: ChunkStatus): boolean {
  return chunkStatusOrder(to) === chunkStatusOrder(from) + 1;
}

export function nextChunkStatus(status: ChunkStatus): ChunkStatus | null {
  const nextIndex = chunkStatusOrder(status) + 1;
  return CHUNK_STATUSES[nextIndex] ?? null;
}

export function assertCanAdvanceChunkStatus(from: ChunkStatus, to: ChunkStatus): void {
  if (!canAdvanceChunkStatus(from, to)) {
    throw new Error(`invalid chunk status transition: ${from} -> ${to}`);
  }
}
