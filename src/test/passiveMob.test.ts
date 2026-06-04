import assert from "node:assert/strict";
import test from "node:test";
import { PassiveMobWorld } from "../entity/passiveMob.ts";
import type { CollisionWorld } from "../physics/playerPhysics.ts";

const flatWorld: CollisionWorld = {
  isSolidBlockLoaded: (_x: number, y: number, _z: number) => y === 64,
  getMotionBlockingHeightLoaded: () => 64,
  getBlockLightLevelLoaded: () => 15
};

test("PassiveMobWorld spawns daylight animals on loaded surfaces", () => {
  const animals = new PassiveMobWorld({ maxMobs: 2 });
  animals.spawnCooldownSeconds = 0;

  const spawned = animals.step(flatWorld, { x: 0, y: 65, z: 0 }, 1, { allowSpawning: true });

  assert.equal(spawned.length, 1);
  assert.equal(animals.mobs.length, 1);
  assert.ok(animals.mobs[0].position.y >= 65);
});

test("PassiveMobWorld moves away from nearby player", () => {
  const animals = new PassiveMobWorld();
  const cow = animals.spawn({ role: "cow", position: { x: 2, y: 65, z: 0 } });

  animals.step(flatWorld, { x: 0, y: 65, z: 0 }, 0.5);

  assert.ok(cow.position.x > 2);
  assert.equal(cow.activeGoal, "avoid_player");
});

test("PassiveMobWorld makes hurt animals panic even away from the player", () => {
  const animals = new PassiveMobWorld();
  const cow = animals.spawn({ role: "cow", position: { x: 0, y: 65, z: 0 } });

  animals.damageMob(cow.id, 1, { x: 2.5, y: 0, z: 0 });
  animals.step(flatWorld, { x: 30, y: 65, z: 0 }, 0.35);

  assert.equal(cow.activeGoal, "panic");
  assert.ok(cow.position.x > 0);
});

test("PassiveMobWorld removes animals killed by player damage", () => {
  const animals = new PassiveMobWorld();
  const pig = animals.spawn({ role: "pig", position: { x: 0, y: 65, z: 0 } });

  const result = animals.damageMob(pig.id, 20, { x: 0, y: 0, z: 0 });

  assert.equal(result.died, true);
  assert.equal(animals.mobs.length, 0);
});
