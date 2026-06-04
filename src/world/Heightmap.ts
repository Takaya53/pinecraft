import {
  CHUNK_SIZE,
  WORLD_MIN_Y,
  WORLD_MAX_Y,
  assertInRange,
  requireSharedArrayBuffer
} from "../core/constants.ts";

export const HEIGHTMAP_TYPES = [
  "WORLD_SURFACE",
  "OCEAN_FLOOR",
  "MOTION_BLOCKING",
  "MOTION_BLOCKING_NO_LEAVES"
] as const;

export type HeightmapType = (typeof HEIGHTMAP_TYPES)[number];
export type HeightPredicate = (stateId: number) => boolean;
export type StateAtWorldY = (worldY: number) => number;

const CHUNK_AREA = CHUNK_SIZE * CHUNK_SIZE;
const EMPTY_HEIGHT = WORLD_MIN_Y - 1;

export class HeightmapSet {
  maps: Map<HeightmapType, Int16Array>;

  constructor() {
    this.maps = new Map();
    for (const type of HEIGHTMAP_TYPES) {
      const buffer = new (requireSharedArrayBuffer())(CHUNK_AREA * Int16Array.BYTES_PER_ELEMENT);
      const map = new Int16Array(buffer);
      map.fill(EMPTY_HEIGHT);
      this.maps.set(type, map);
    }
  }

  get(type: HeightmapType, x: number, z: number): number {
    return this.requireMap(type)[heightmapIndex(x, z)];
  }

  set(type: HeightmapType, x: number, z: number, worldY: number): void {
    assertInRange("worldY", worldY, EMPTY_HEIGHT, WORLD_MAX_Y);
    Atomics.store(this.requireMap(type), heightmapIndex(x, z), worldY);
  }

  recomputeColumn(
    type: HeightmapType,
    x: number,
    z: number,
    stateAtWorldY: StateAtWorldY,
    predicate: HeightPredicate
  ): number {
    for (let worldY = WORLD_MAX_Y; worldY >= WORLD_MIN_Y; worldY -= 1) {
      if (predicate(stateAtWorldY(worldY))) {
        this.set(type, x, z, worldY);
        return worldY;
      }
    }

    this.set(type, x, z, EMPTY_HEIGHT);
    return EMPTY_HEIGHT;
  }

  requireMap(type: HeightmapType): Int16Array {
    const map = this.maps.get(type);
    if (!map) {
      throw new Error(`unknown heightmap type: ${type}`);
    }
    return map;
  }
}

export function heightmapIndex(x: number, z: number): number {
  assertInRange("x", x, 0, CHUNK_SIZE - 1);
  assertInRange("z", z, 0, CHUNK_SIZE - 1);
  return (z << 4) | x;
}
