import test from "node:test";
import assert from "node:assert/strict";
import { createDefaultBlockRegistry } from "../block/blockRegistry.ts";
import { PlayerPhysics } from "../physics/playerPhysics.ts";
import { World } from "../world/World.ts";
import { voxelRaycast } from "../world/raycast.ts";

test("voxelRaycast hits the first solid block and reports entry normal", () => {
  const registry = createDefaultBlockRegistry();
  const world = new World({ seed: "raycast", blockRegistry: registry });
  const stone = registry.resolveState("stone");
  world.setStateId(3, 64, 0, stone);

  const hit = voxelRaycast(
    world,
    { x: 0.5, y: 64.5, z: 0.5 },
    { x: 1, y: 0, z: 0 },
    6
  );

  assert.ok(hit);
  assert.deepEqual(hit.block, { x: 3, y: 64, z: 0 });
  assert.deepEqual(hit.normal, { x: -1, y: 0, z: 0 });
});

test("PlayerPhysics falls onto a solid floor", () => {
  const registry = createDefaultBlockRegistry();
  const world = new World({ seed: "physics-floor", blockRegistry: registry });
  const stone = registry.resolveState("stone");
  for (let z = -2; z <= 2; z += 1) {
    for (let x = -2; x <= 2; x += 1) {
      world.setStateId(x, 63, z, stone);
    }
  }

  const player = new PlayerPhysics({ x: 0.5, y: 66, z: 0.5 });
  for (let step = 0; step < 80; step += 1) {
    player.step(world, { forward: 0, strafe: 0, jump: false, yaw: 0 }, 1 / 20);
  }

  assert.equal(player.state.onGround, true);
  assert.ok(Math.abs(player.state.position.y - 64) < 0.001);
});

test("PlayerPhysics resolves horizontal wall collision", () => {
  const registry = createDefaultBlockRegistry();
  const world = new World({ seed: "physics-wall", blockRegistry: registry });
  const stone = registry.resolveState("stone");
  world.setStateId(1, 64, 0, stone);
  world.setStateId(1, 65, 0, stone);

  const player = new PlayerPhysics({ x: 0.5, y: 64, z: 0.5 });
  player.state.onGround = true;
  player.step(world, { forward: 0, strafe: 1, jump: false, yaw: 0 }, 1);

  assert.ok(player.state.position.x < 0.71);
});

test("PlayerPhysics auto-steps up one full block when walking into terrain", () => {
  const registry = createDefaultBlockRegistry();
  const world = new World({ seed: "physics-auto-step", blockRegistry: registry });
  const stone = registry.resolveState("stone");
  for (let z = -1; z <= 1; z += 1) {
    for (let x = -1; x <= 2; x += 1) {
      world.setStateId(x, 63, z, stone);
    }
  }
  world.setStateId(1, 64, 0, stone);

  const player = new PlayerPhysics({ x: 0.5, y: 64, z: 0.5 });
  player.state.onGround = true;
  player.step(world, { forward: 0, strafe: 1, jump: false, yaw: 0 }, 0.25);
  player.step(world, { forward: 0, strafe: 0, jump: false, yaw: 0 }, 0.05);

  assert.ok(player.state.position.x > 1.2);
  assert.ok(Math.abs(player.state.position.y - 65) < 0.02);
  assert.equal(player.state.onGround, true);
});

test("PlayerPhysics forward movement follows camera yaw", () => {
  const registry = createDefaultBlockRegistry();
  const world = new World({ seed: "physics-forward", blockRegistry: registry });
  const player = new PlayerPhysics({ x: 0.5, y: 80, z: 0.5 });

  player.step(world, { forward: 1, strafe: 0, jump: false, yaw: 0 }, 0.25);

  assert.ok(player.state.position.z < 0.5);
});

test("PlayerPhysics slows and damps falling while swimming in water", () => {
  const registry = createDefaultBlockRegistry();
  const world = new World({ seed: "physics-water", blockRegistry: registry });
  const water = registry.resolveState("water", { level: 0 });
  for (let y = 63; y <= 66; y += 1) {
    for (let x = -1; x <= 3; x += 1) {
      world.setStateId(x, y, 0, water);
    }
  }

  const dryPlayer = new PlayerPhysics({ x: 8.5, y: 64, z: 0.5 });
  dryPlayer.step(world, { forward: 0, strafe: 1, jump: false, yaw: 0 }, 0.5);

  const wetPlayer = new PlayerPhysics({ x: 0.5, y: 64, z: 0.5 });
  wetPlayer.state.velocity.y = -20;
  wetPlayer.step(world, { forward: 0, strafe: 1, jump: false, yaw: 0 }, 0.5);

  assert.equal(wetPlayer.state.inWater, true);
  assert.ok(wetPlayer.state.position.x - 0.5 < dryPlayer.state.position.x - 8.5);
  assert.ok(wetPlayer.state.velocity.y > -4);
});

test("PlayerPhysics swims upward while jump is held in water", () => {
  const registry = createDefaultBlockRegistry();
  const world = new World({ seed: "physics-swim-up", blockRegistry: registry });
  const water = registry.resolveState("water", { level: 0 });
  for (let y = 63; y <= 68; y += 1) {
    world.setStateId(0, y, 0, water);
  }

  const player = new PlayerPhysics({ x: 0.5, y: 64, z: 0.5 });
  player.step(world, { forward: 0, strafe: 0, jump: true, yaw: 0 }, 0.25);

  assert.equal(player.state.inWater, true);
  assert.equal(player.state.eyesInWater, true);
  assert.ok(player.state.velocity.y > 0);
  assert.ok(player.state.position.y > 64);
});
