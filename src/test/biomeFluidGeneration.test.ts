import test from "node:test";
import assert from "node:assert/strict";
import { createDefaultBlockRegistry } from "../block/blockRegistry.ts";
import { BiomeSampler } from "../generation/biome.ts";
import { OverworldGenerator } from "../generation/overworldGenerator.ts";
import { applyFluidEdits, simulateFluids } from "../world/fluidSimulation.ts";
import { World } from "../world/World.ts";

test("BiomeSampler blends nearby climate targets deterministically", () => {
  const sampler = new BiomeSampler("biome-seed");
  const climate = sampler.sampleClimate(1200, -350);
  const a = sampler.blend(climate, 0);
  const b = sampler.blend(climate, 0);

  assert.equal(a.primary.id, b.primary.id);
  assert.equal(a.weights.size, b.weights.size);
  assert.ok([...a.weights.values()].reduce((sum, value) => sum + value, 0) > 0.99);
});

test("OverworldGenerator exposes multiple biome surface materials across distance", () => {
  const registry = createDefaultBlockRegistry();
  const generator = new OverworldGenerator({ seed: "biome-surfaces", registry });
  const surfaces = new Set<string>();

  for (let z = -1600; z <= 1600; z += 160) {
    for (let x = -1600; x <= 1600; x += 160) {
      surfaces.add(generator.sampleTerrain(x, z).biome.top);
    }
  }

  assert.ok(surfaces.has("grass"));
  assert.ok(surfaces.has("sand"));
  assert.ok(surfaces.has("snow"));
});

test("OverworldGenerator creates water-shaped river or lake basins", () => {
  const registry = createDefaultBlockRegistry();
  const generator = new OverworldGenerator({ seed: "water-basins", registry });
  let foundWaterBasin = false;

  for (let z = -900; z <= 900 && !foundWaterBasin; z += 45) {
    for (let x = -900; x <= 900; x += 45) {
      const terrain = generator.sampleTerrain(x, z);
      if (terrain.height < generator.seaLevel && (terrain.riverStrength > 0.45 || terrain.lakeStrength > 0.55)) {
        foundWaterBasin = true;
        break;
      }
    }
  }

  assert.equal(foundWaterBasin, true);
});

test("fluid simulation spreads water downward before lateral flow", () => {
  const registry = createDefaultBlockRegistry();
  const world = new World({ seed: "fluid", blockRegistry: registry });
  const water = registry.resolveState("water", { level: 0 });
  const chunk = world.getOrCreateChunk(0, 0);
  chunk.setStateId(8, 65, 8, water);
  chunk.heightmaps.set("WORLD_SURFACE", 8, 8, 65);

  const edits = simulateFluids(world, registry, { centerX: 8, centerZ: 8, radiusChunks: 0, maxEdits: 4 });
  assert.deepEqual(edits[0], { x: 8, y: 64, z: 8, stateId: water });

  applyFluidEdits(world, edits);
  assert.equal(world.getStateId(8, 64, 8), water);
});
