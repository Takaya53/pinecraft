import {
  CHUNK_SIZE,
  LIGHT_MAX,
  WORLD_MAX_Y,
  WORLD_MIN_Y
} from "../core/constants.ts";
import { BlockRegistry } from "../block/blockRegistry.ts";
import { ChunkColumn, forEachChunkBlock } from "../world/Chunk.ts";

type LightNode = {
  x: number;
  y: number;
  z: number;
  level: number;
};

const DIRECTIONS = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1]
] as const;

export class LightEngine {
  registry: BlockRegistry;

  constructor(registry: BlockRegistry) {
    this.registry = registry;
  }

  recomputeChunkLocal(chunk: ChunkColumn): void {
    this.clearLights(chunk);
    if (hasGeneratedHeightmap(chunk)) {
      this.initializeHeightmapSkyLight(chunk);
      this.initializeBlockLightFromDeltas(chunk);
    } else {
      this.initializeVerticalSkyLight(chunk);
      this.propagateSkyLight(chunk);
      this.initializeBlockLight(chunk);
    }
    chunk.markStatusAtLeast("LIT");
  }

  clearLights(chunk: ChunkColumn): void {
    for (const section of chunk.sections) {
      section.skyLight.fill(0);
      section.blockLight.fill(0);
    }
  }

  initializeVerticalSkyLight(chunk: ChunkColumn): void {
    for (let localX = 0; localX < CHUNK_SIZE; localX += 1) {
      for (let localZ = 0; localZ < CHUNK_SIZE; localZ += 1) {
        let light = LIGHT_MAX;
        for (let worldY = WORLD_MAX_Y; worldY >= WORLD_MIN_Y; worldY -= 1) {
          const opacity = this.opacity(chunk.getStateId(localX, worldY, localZ));
          if (opacity >= LIGHT_MAX) {
            light = 0;
            chunk.setSkyLight(localX, worldY, localZ, 0);
            continue;
          }

          chunk.setSkyLight(localX, worldY, localZ, light);
          if (opacity > 0) {
            light = Math.max(0, light - opacity);
          }
        }
      }
    }
  }

  propagateSkyLight(chunk: ChunkColumn): void {
    const queue: LightNode[] = [];
    forEachChunkBlock((x, y, z) => {
      const level = chunk.getSkyLight(x, y, z);
      if (level > 1) {
        queue.push({ x, y, z, level });
      }
    });
    this.propagate(chunk, "sky", queue);
  }

  initializeBlockLight(chunk: ChunkColumn): void {
    const queue: LightNode[] = [];

    forEachChunkBlock((x, y, z) => {
      const emission = this.registry.getDefinitionForState(chunk.getStateId(x, y, z)).lightEmission;
      if (emission > 0) {
        chunk.setBlockLight(x, y, z, emission);
        queue.push({ x, y, z, level: emission });
      }
    });

    this.propagate(chunk, "block", queue);
  }

  initializeHeightmapSkyLight(chunk: ChunkColumn): void {
    for (let localX = 0; localX < CHUNK_SIZE; localX += 1) {
      for (let localZ = 0; localZ < CHUNK_SIZE; localZ += 1) {
        const surfaceY = chunk.heightmaps.get("WORLD_SURFACE", localX, localZ);
        const maxNeighborY = maxColumnSurfaceY(chunk, localX, localZ);
        const minLightY = Math.max(WORLD_MIN_Y, surfaceY);
        const maxLightY = Math.min(WORLD_MAX_Y, Math.max(surfaceY + 2, maxNeighborY + 2));

        for (let worldY = minLightY; worldY <= maxLightY; worldY += 1) {
          const opacity = this.opacity(chunk.getStateId(localX, worldY, localZ));
          chunk.setSkyLight(localX, worldY, localZ, opacity >= LIGHT_MAX ? 0 : LIGHT_MAX);
        }
      }
    }
  }

  initializeBlockLightFromDeltas(chunk: ChunkColumn): void {
    const queue: LightNode[] = [];

    for (const delta of chunk.blockDeltas.values()) {
      const emission = this.registry.getDefinitionForState(delta.stateId).lightEmission;
      if (emission <= 0) {
        continue;
      }
      chunk.setBlockLight(delta.localX, delta.worldY, delta.localZ, emission);
      queue.push({ x: delta.localX, y: delta.worldY, z: delta.localZ, level: emission });
    }

    this.propagate(chunk, "block", queue);
  }

  propagate(chunk: ChunkColumn, channel: "sky" | "block", queue: LightNode[]): void {
    let cursor = 0;
    while (cursor < queue.length) {
      const current = queue[cursor];
      cursor += 1;

      const currentStored =
        channel === "sky"
          ? chunk.getSkyLight(current.x, current.y, current.z)
          : chunk.getBlockLight(current.x, current.y, current.z);
      if (currentStored !== current.level) {
        continue;
      }

      for (const [dx, dy, dz] of DIRECTIONS) {
        const nextX = current.x + dx;
        const nextY = current.y + dy;
        const nextZ = current.z + dz;
        if (!isInsideChunk(nextX, nextY, nextZ)) {
          continue;
        }

        const opacity = this.opacity(chunk.getStateId(nextX, nextY, nextZ));
        const attenuation = Math.max(1, opacity);
        const nextLevel = current.level - attenuation;
        if (nextLevel <= 0) {
          continue;
        }

        const previous =
          channel === "sky"
            ? chunk.getSkyLight(nextX, nextY, nextZ)
            : chunk.getBlockLight(nextX, nextY, nextZ);
        if (nextLevel <= previous) {
          continue;
        }

        if (channel === "sky") {
          chunk.setSkyLight(nextX, nextY, nextZ, nextLevel);
        } else {
          chunk.setBlockLight(nextX, nextY, nextZ, nextLevel);
        }
        queue.push({ x: nextX, y: nextY, z: nextZ, level: nextLevel });
      }
    }
  }

  opacity(stateId: number): number {
    return this.registry.getDefinitionForState(stateId).opacity;
  }
}

function hasGeneratedHeightmap(chunk: ChunkColumn): boolean {
  for (let localX = 0; localX < CHUNK_SIZE; localX += 1) {
    for (let localZ = 0; localZ < CHUNK_SIZE; localZ += 1) {
      if (chunk.heightmaps.get("WORLD_SURFACE", localX, localZ) >= WORLD_MIN_Y) {
        return true;
      }
    }
  }
  return false;
}

function maxColumnSurfaceY(chunk: ChunkColumn, localX: number, localZ: number): number {
  let maxY = chunk.heightmaps.get("WORLD_SURFACE", localX, localZ);
  const neighbors = [
    [localX - 1, localZ],
    [localX + 1, localZ],
    [localX, localZ - 1],
    [localX, localZ + 1]
  ] as const;

  for (const [neighborX, neighborZ] of neighbors) {
    if (neighborX < 0 || neighborX >= CHUNK_SIZE || neighborZ < 0 || neighborZ >= CHUNK_SIZE) {
      continue;
    }
    maxY = Math.max(maxY, chunk.heightmaps.get("WORLD_SURFACE", neighborX, neighborZ));
  }
  return maxY;
}

function isInsideChunk(localX: number, worldY: number, localZ: number): boolean {
  return (
    localX >= 0 &&
    localX < CHUNK_SIZE &&
    localZ >= 0 &&
    localZ < CHUNK_SIZE &&
    worldY >= WORLD_MIN_Y &&
    worldY <= WORLD_MAX_Y
  );
}
