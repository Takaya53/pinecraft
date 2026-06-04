import type { Vec3i } from "../core/constants.ts";

export type Aabb = {
  minX: number;
  minY: number;
  minZ: number;
  maxX: number;
  maxY: number;
  maxZ: number;
};

export function playerAabb(position: Vec3i, width: number, height: number): Aabb {
  const halfWidth = width / 2;
  return {
    minX: position.x - halfWidth,
    minY: position.y,
    minZ: position.z - halfWidth,
    maxX: position.x + halfWidth,
    maxY: position.y + height,
    maxZ: position.z + halfWidth
  };
}

export function offsetAabb(aabb: Aabb, dx: number, dy: number, dz: number): Aabb {
  return {
    minX: aabb.minX + dx,
    minY: aabb.minY + dy,
    minZ: aabb.minZ + dz,
    maxX: aabb.maxX + dx,
    maxY: aabb.maxY + dy,
    maxZ: aabb.maxZ + dz
  };
}

export function blockIntersectsAabb(blockX: number, blockY: number, blockZ: number, aabb: Aabb): boolean {
  return (
    blockX < aabb.maxX &&
    blockX + 1 > aabb.minX &&
    blockY < aabb.maxY &&
    blockY + 1 > aabb.minY &&
    blockZ < aabb.maxZ &&
    blockZ + 1 > aabb.minZ
  );
}
