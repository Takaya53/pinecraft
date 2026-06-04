import test from "node:test";
import assert from "node:assert/strict";
import { createDefaultBlockRegistry } from "../block/blockRegistry.ts";
import { WORLD_MAX_Y } from "../core/constants.ts";
import { LightEngine } from "../lighting/lightEngine.ts";
import { World } from "../world/World.ts";

test("World creates chunks and maps negative coordinates correctly", () => {
  const registry = createDefaultBlockRegistry();
  const world = new World({ seed: "world-test", blockRegistry: registry });
  const stone = registry.resolveState("stone");

  world.setStateId(-1, 64, -17, stone);

  assert.equal(world.getStateId(-1, 64, -17), stone);
  assert.ok(world.getChunk(-1, -2));
});

test("World treats open doors as passable and closed doors as solid", () => {
  const registry = createDefaultBlockRegistry();
  const world = new World({ seed: "door-collision", blockRegistry: registry });
  const closedDoor = registry.resolveState("door", { facing: "north", half: "lower", open: false });
  const openDoor = registry.resolveState("door", { facing: "north", half: "lower", open: true });

  world.setStateId(2, 64, 2, closedDoor);
  assert.equal(world.isSolidBlockLoaded(2, 64, 2), true);

  world.setStateId(2, 64, 2, openDoor);
  assert.equal(world.isSolidBlockLoaded(2, 64, 2), false);
});

test("LightEngine initializes vertical sky light and solid occlusion", () => {
  const registry = createDefaultBlockRegistry();
  const world = new World({ seed: "light-test", blockRegistry: registry });
  const chunk = world.getOrCreateChunk(0, 0);
  const stone = registry.resolveState("stone");
  const lightEngine = new LightEngine(registry);

  for (let z = 0; z < 16; z += 1) {
    for (let x = 0; x < 16; x += 1) {
      chunk.setStateId(x, 70, z, stone);
    }
  }
  lightEngine.recomputeChunkLocal(chunk);

  assert.equal(chunk.getSkyLight(8, WORLD_MAX_Y, 8), 15);
  assert.equal(chunk.getSkyLight(8, 71, 8), 15);
  assert.equal(chunk.getSkyLight(8, 70, 8), 0);
  assert.equal(chunk.getSkyLight(8, 69, 8), 0);
  assert.equal(chunk.status, "LIT");
});

test("LightEngine propagates block light through transparent blocks", () => {
  const registry = createDefaultBlockRegistry();
  const world = new World({ seed: "lamp-test", blockRegistry: registry });
  const chunk = world.getOrCreateChunk(0, 0);
  const lamp = registry.resolveState("lamp");
  const lightEngine = new LightEngine(registry);

  chunk.setStateId(8, 64, 8, lamp);
  lightEngine.recomputeChunkLocal(chunk);

  assert.equal(chunk.getBlockLight(8, 64, 8), 15);
  assert.equal(chunk.getBlockLight(9, 64, 8), 14);
  assert.equal(chunk.getBlockLight(10, 64, 8), 13);
});
