import test from "node:test";
import assert from "node:assert/strict";
import { createDefaultBlockRegistry } from "../block/blockRegistry.ts";
import { OverworldGenerator } from "../generation/overworldGenerator.ts";
import { meshFaceCount } from "../meshing/chunkMesher.ts";
import { ChunkPipeline } from "../pipeline/ChunkPipeline.ts";
import { ChunkColumn } from "../world/Chunk.ts";
import { World } from "../world/World.ts";
import { WORLD_MIN_Y } from "../core/constants.ts";

test("OverworldGenerator samples deterministic surface heights for a seed", () => {
  const registry = createDefaultBlockRegistry();
  const a = new OverworldGenerator({ seed: "terrain-seed", registry });
  const b = new OverworldGenerator({ seed: "terrain-seed", registry });

  assert.equal(a.sampleSurfaceHeight(0, 0), b.sampleSurfaceHeight(0, 0));
  assert.equal(a.sampleSurfaceHeight(1234, -567), b.sampleSurfaceHeight(1234, -567));
});

test("OverworldGenerator fills a chunk and recomputes heightmaps", () => {
  const registry = createDefaultBlockRegistry();
  const generator = new OverworldGenerator({ seed: "terrain-fill", registry });
  const chunk = new ChunkColumn({ chunkX: 0, chunkZ: 0 });

  generator.generateChunk(chunk);
  const surfaceY = chunk.heightmaps.get("WORLD_SURFACE", 8, 8);
  const surfaceState = registry.getState(chunk.getStateId(8, surfaceY, 8));

  assert.ok(surfaceY >= 40);
  assert.notEqual(surfaceState.typeId, "air");
  assert.equal(chunk.blockDeltas.size, 0);
});

test("OverworldGenerator carves caves below the surface", () => {
  const registry = createDefaultBlockRegistry();
  const generator = new OverworldGenerator({ seed: "terrain-fill", registry });
  const chunk = new ChunkColumn({ chunkX: 0, chunkZ: 0 });

  generator.generateChunk(chunk);

  let caveAirBlocks = 0;
  let sampledUndergroundBlocks = 0;
  for (let localZ = 0; localZ < 16; localZ += 1) {
    for (let localX = 0; localX < 16; localX += 1) {
      const surfaceY = chunk.heightmaps.get("WORLD_SURFACE", localX, localZ);
      for (let worldY = WORLD_MIN_Y + 6; worldY < surfaceY - 8; worldY += 1) {
        sampledUndergroundBlocks += 1;
        if (registry.getState(chunk.getStateId(localX, worldY, localZ)).typeId === "air") {
          caveAirBlocks += 1;
        }
      }
    }
  }

  assert.ok(caveAirBlocks > 0);
  assert.ok(caveAirBlocks / sampledUndergroundBlocks < 0.14);
});

test("OverworldGenerator opens a starter cave near spawn", () => {
  const registry = createDefaultBlockRegistry();
  const generator = new OverworldGenerator({ seed: "terrain-fill", registry });
  const chunk = new ChunkColumn({ chunkX: 0, chunkZ: 0 });

  generator.generateChunk(chunk);

  const entranceWorldX = 12;
  const entranceWorldZ = 12;
  const localX = entranceWorldX;
  const localZ = entranceWorldZ;
  const originalSurfaceY = generator.sampleSurfaceHeight(entranceWorldX, entranceWorldZ);
  let openBlocks = 0;
  for (let worldY = originalSurfaceY - 7; worldY <= originalSurfaceY; worldY += 1) {
    if (registry.getState(chunk.getStateId(localX, worldY, localZ)).typeId === "air") {
      openBlocks += 1;
    }
  }

  assert.ok(openBlocks >= 3);
});

test("OverworldGenerator keeps the starter cave mouth narrow", () => {
  const registry = createDefaultBlockRegistry();
  const generator = new OverworldGenerator({ seed: "terrain-fill", registry });
  const chunk = new ChunkColumn({ chunkX: 0, chunkZ: 0 });

  generator.generateChunk(chunk);

  let nearSurfaceAirBlocks = 0;
  for (let localZ = 0; localZ < 16; localZ += 1) {
    for (let localX = 0; localX < 16; localX += 1) {
      const worldX = localX;
      const worldZ = localZ;
      const surfaceY = generator.sampleSurfaceHeight(worldX, worldZ);
      for (let worldY = surfaceY - 7; worldY <= surfaceY; worldY += 1) {
        if (registry.getState(chunk.getStateId(localX, worldY, localZ)).typeId === "air") {
          nearSurfaceAirBlocks += 1;
        }
      }
    }
  }

  assert.ok(nearSurfaceAirBlocks < 96);
});

test("OverworldGenerator distributes rare underground ores", () => {
  const registry = createDefaultBlockRegistry();
  const generator = new OverworldGenerator({ seed: "terrain-fill", registry });
  const chunk = new ChunkColumn({ chunkX: 0, chunkZ: 0 });

  generator.generateChunk(chunk);

  const found = new Set<string>();
  for (let localZ = 0; localZ < 16; localZ += 1) {
    for (let localX = 0; localX < 16; localX += 1) {
      const surfaceY = chunk.heightmaps.get("WORLD_SURFACE", localX, localZ);
      for (let worldY = WORLD_MIN_Y + 6; worldY < surfaceY - 8; worldY += 1) {
        const typeId = registry.getState(chunk.getStateId(localX, worldY, localZ)).typeId;
        if (typeId === "gold_ore" || typeId === "diamond_ore") {
          found.add(typeId);
        }
      }
    }
  }

  assert.equal(found.has("gold_ore"), true);
  assert.equal(found.has("diamond_ore"), true);
});

test("OverworldGenerator places lightweight structures in eligible chunks", () => {
  const registry = createDefaultBlockRegistry();
  const generator = new OverworldGenerator({ seed: "structure-pass", registry });
  const structureBlocks = new Set(["planks", "cobblestone", "lamp"]);
  let foundStructureBlock = false;

  for (let chunkZ = -4; chunkZ <= 4 && !foundStructureBlock; chunkZ += 1) {
    for (let chunkX = -4; chunkX <= 4 && !foundStructureBlock; chunkX += 1) {
      const chunk = new ChunkColumn({ chunkX, chunkZ });
      generator.generateChunk(chunk);
      for (let localZ = 0; localZ < 16 && !foundStructureBlock; localZ += 1) {
        for (let localX = 0; localX < 16 && !foundStructureBlock; localX += 1) {
          const surfaceY = chunk.heightmaps.get("WORLD_SURFACE", localX, localZ);
          for (let worldY = WORLD_MIN_Y + 6; worldY <= surfaceY + 5; worldY += 1) {
            const typeId = registry.getState(chunk.getStateId(localX, worldY, localZ)).typeId;
            if (structureBlocks.has(typeId)) {
              foundStructureBlock = true;
              break;
            }
          }
        }
      }
    }
  }

  assert.equal(foundStructureBlock, true);
});

test("OverworldGenerator creates multi-building village sites", () => {
  const registry = createDefaultBlockRegistry();
  const generator = new OverworldGenerator({ seed: "village-pass", registry });
  let villageChunk: { chunkX: number; chunkZ: number } | null = null;

  for (let chunkZ = -16; chunkZ <= 16 && !villageChunk; chunkZ += 1) {
    for (let chunkX = -16; chunkX <= 16 && !villageChunk; chunkX += 1) {
      if (generator.villageSitesForChunk(chunkX, chunkZ).length > 0) {
        villageChunk = { chunkX, chunkZ };
      }
    }
  }

  assert.notEqual(villageChunk, null);
  const villageBlocks = new Map<string, number>();
  for (let dz = -2; dz <= 2; dz += 1) {
    for (let dx = -2; dx <= 2; dx += 1) {
      const chunk = new ChunkColumn({ chunkX: villageChunk!.chunkX + dx, chunkZ: villageChunk!.chunkZ + dz });
      generator.generateChunk(chunk);
      for (let localZ = 0; localZ < 16; localZ += 1) {
        for (let localX = 0; localX < 16; localX += 1) {
          const surfaceY = chunk.heightmaps.get("WORLD_SURFACE", localX, localZ);
          for (let worldY = WORLD_MIN_Y + 6; worldY <= surfaceY + 6; worldY += 1) {
            const typeId = registry.getState(chunk.getStateId(localX, worldY, localZ)).typeId;
            if ([
              "planks",
              "cobblestone",
              "gravel",
              "sand",
              "torch",
              "water",
              "bed",
              "door",
              "bell",
              "composter",
              "lectern",
              "stonecutter",
              "farmland",
              "wheat"
            ].includes(typeId)) {
              villageBlocks.set(typeId, (villageBlocks.get(typeId) ?? 0) + 1);
            }
          }
        }
      }
    }
  }

  assert.ok((villageBlocks.get("planks") ?? 0) > 20 || (villageBlocks.get("sand") ?? 0) > 20);
  assert.ok((villageBlocks.get("cobblestone") ?? 0) > 10);
  assert.ok((villageBlocks.get("gravel") ?? 0) > 10 || (villageBlocks.get("water") ?? 0) > 0);
  assert.ok((villageBlocks.get("bed") ?? 0) > 0);
  assert.ok((villageBlocks.get("door") ?? 0) > 0);
  assert.ok((villageBlocks.get("bell") ?? 0) > 0);
  assert.ok(
    (villageBlocks.get("composter") ?? 0) > 0 ||
      (villageBlocks.get("lectern") ?? 0) > 0 ||
      (villageBlocks.get("stonecutter") ?? 0) > 0
  );
  assert.ok((villageBlocks.get("farmland") ?? 0) > 0);
  assert.ok((villageBlocks.get("wheat") ?? 0) > 0);
});

test("OverworldGenerator works through ChunkPipeline to produce mesh", () => {
  const registry = createDefaultBlockRegistry();
  const seed = "terrain-pipeline";
  const world = new World({ seed, blockRegistry: registry });
  const generator = new OverworldGenerator({ seed, registry });
  const pipeline = new ChunkPipeline({
    world,
    generator: (chunk) => generator.generateChunk(chunk, world)
  });

  const result = pipeline.ensureChunkFull(0, 0);

  assert.equal(result.chunk.status, "FULL");
  assert.ok(result.mesh);
  assert.ok(meshFaceCount(result.mesh) > 0);
});
