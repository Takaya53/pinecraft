import type { Vec3i } from "../core/constants.ts";
import type { StateId } from "../block/blockState.ts";

export type RaycastWorld = {
  getStateIdIfLoaded(worldX: number, worldY: number, worldZ: number): StateId | null;
  blockRegistry: {
    getDefinitionForState(stateId: StateId): { collision: "none" | "solid" | "fluid" };
  };
};

export type VoxelRaycastHit = {
  block: Vec3i;
  normal: Vec3i;
  distance: number;
  stateId: StateId;
};

export function voxelRaycast(
  world: RaycastWorld,
  origin: Vec3i,
  direction: Vec3i,
  maxDistance: number
): VoxelRaycastHit | null {
  const length = Math.hypot(direction.x, direction.y, direction.z);
  if (length === 0) {
    return null;
  }

  const dir = {
    x: direction.x / length,
    y: direction.y / length,
    z: direction.z / length
  };

  let blockX = Math.floor(origin.x);
  let blockY = Math.floor(origin.y);
  let blockZ = Math.floor(origin.z);
  let normal = { x: 0, y: 0, z: 0 };
  let distance = 0;

  const stepX = sign(dir.x);
  const stepY = sign(dir.y);
  const stepZ = sign(dir.z);
  const tDeltaX = stepX === 0 ? Infinity : Math.abs(1 / dir.x);
  const tDeltaY = stepY === 0 ? Infinity : Math.abs(1 / dir.y);
  const tDeltaZ = stepZ === 0 ? Infinity : Math.abs(1 / dir.z);
  let tMaxX = firstBoundaryDistance(origin.x, blockX, dir.x, stepX);
  let tMaxY = firstBoundaryDistance(origin.y, blockY, dir.y, stepY);
  let tMaxZ = firstBoundaryDistance(origin.z, blockZ, dir.z, stepZ);

  while (distance <= maxDistance) {
    const stateId = world.getStateIdIfLoaded(blockX, blockY, blockZ);
    if (stateId !== null && world.blockRegistry.getDefinitionForState(stateId).collision === "solid") {
      return {
        block: { x: blockX, y: blockY, z: blockZ },
        normal,
        distance,
        stateId
      };
    }

    if (tMaxX < tMaxY && tMaxX < tMaxZ) {
      blockX += stepX;
      distance = tMaxX;
      tMaxX += tDeltaX;
      normal = { x: -stepX, y: 0, z: 0 };
    } else if (tMaxY < tMaxZ) {
      blockY += stepY;
      distance = tMaxY;
      tMaxY += tDeltaY;
      normal = { x: 0, y: -stepY, z: 0 };
    } else {
      blockZ += stepZ;
      distance = tMaxZ;
      tMaxZ += tDeltaZ;
      normal = { x: 0, y: 0, z: -stepZ };
    }
  }

  return null;
}

function sign(value: number): -1 | 0 | 1 {
  if (value > 0) {
    return 1;
  }
  if (value < 0) {
    return -1;
  }
  return 0;
}

function firstBoundaryDistance(origin: number, block: number, direction: number, step: -1 | 0 | 1): number {
  if (step === 0) {
    return Infinity;
  }
  const boundary = step > 0 ? block + 1 : block;
  return (boundary - origin) / direction;
}
