export const TICKS_PER_SECOND = 20;

export const CHUNK_SIZE = 16;
export const SECTION_SIZE = 16;
export const SECTION_VOLUME = SECTION_SIZE * SECTION_SIZE * SECTION_SIZE;

export const WORLD_MIN_Y = -64;
export const WORLD_MAX_Y = 319;
export const WORLD_HEIGHT = WORLD_MAX_Y - WORLD_MIN_Y + 1;
export const WORLD_MIN_SECTION_Y = Math.floor(WORLD_MIN_Y / SECTION_SIZE);
export const WORLD_MAX_SECTION_Y = Math.floor(WORLD_MAX_Y / SECTION_SIZE);
export const WORLD_SECTION_COUNT = WORLD_MAX_SECTION_Y - WORLD_MIN_SECTION_Y + 1;

export const LIGHT_MIN = 0;
export const LIGHT_MAX = 15;

export type Vec3i = {
  x: number;
  y: number;
  z: number;
};

export function assertInteger(name: string, value: number): void {
  if (!Number.isInteger(value)) {
    throw new RangeError(`${name} must be an integer: ${value}`);
  }
}

export function assertInRange(name: string, value: number, min: number, max: number): void {
  assertInteger(name, value);
  if (value < min || value > max) {
    throw new RangeError(`${name} must be in ${min}..${max}: ${value}`);
  }
}

export function floorDiv(value: number, divisor: number): number {
  assertInteger("value", value);
  assertInteger("divisor", divisor);
  if (divisor <= 0) {
    throw new RangeError(`divisor must be positive: ${divisor}`);
  }
  return Math.floor(value / divisor);
}

export function floorMod(value: number, divisor: number): number {
  const result = value - floorDiv(value, divisor) * divisor;
  return result === divisor ? 0 : result;
}

export function worldToChunkCoord(blockCoord: number): number {
  return floorDiv(blockCoord, CHUNK_SIZE);
}

export function worldToLocalBlockCoord(blockCoord: number): number {
  return floorMod(blockCoord, CHUNK_SIZE);
}

export function worldYToSectionY(blockY: number): number {
  assertInteger("blockY", blockY);
  return floorDiv(blockY, SECTION_SIZE);
}

export function sectionYToIndex(sectionY: number): number {
  assertInteger("sectionY", sectionY);
  const index = sectionY - WORLD_MIN_SECTION_Y;
  assertInRange("section index", index, 0, WORLD_SECTION_COUNT - 1);
  return index;
}

export function worldYToSectionIndex(blockY: number): number {
  assertInRange("blockY", blockY, WORLD_MIN_Y, WORLD_MAX_Y);
  return sectionYToIndex(worldYToSectionY(blockY));
}

export function worldYToLocalBlockY(blockY: number): number {
  return worldToLocalBlockCoord(blockY);
}

export function assertLocalBlockCoord(name: string, value: number): void {
  assertInRange(name, value, 0, SECTION_SIZE - 1);
}

export function blockIndex(x: number, y: number, z: number): number {
  assertLocalBlockCoord("x", x);
  assertLocalBlockCoord("y", y);
  assertLocalBlockCoord("z", z);
  return (y << 8) | (z << 4) | x;
}

export function decodeBlockIndex(index: number): Vec3i {
  assertInRange("block index", index, 0, SECTION_VOLUME - 1);
  return {
    x: index & 0x0f,
    y: (index >> 8) & 0x0f,
    z: (index >> 4) & 0x0f
  };
}

export function chunkKey(chunkX: number, chunkZ: number): string {
  assertInteger("chunkX", chunkX);
  assertInteger("chunkZ", chunkZ);
  return `${chunkX},${chunkZ}`;
}

export function requireSharedArrayBuffer(): typeof SharedArrayBuffer {
  if (typeof SharedArrayBuffer === "undefined") {
    throw new Error("SharedArrayBuffer is required for engine storage");
  }
  return SharedArrayBuffer;
}
