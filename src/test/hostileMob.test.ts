import test from "node:test";
import assert from "node:assert/strict";
import { HostileMobWorld, revealHostileMobByBell } from "../entity/hostileMob.ts";
import type { CollisionWorld } from "../physics/playerPhysics.ts";

const flatWorld: CollisionWorld = {
  isSolidBlockLoaded(_x, y, _z) {
    return y <= 0;
  }
};

test("HostileMobWorld moves mobs toward the player", () => {
  const mobs = new HostileMobWorld({ maxMobs: 4 });
  const mob = mobs.spawn({ position: { x: 8, y: 1, z: 0 } });

  mobs.step(flatWorld, { x: 0, y: 1, z: 0 }, 0.5);

  assert.ok(mob.position.x < 8);
});

test("HostileMobWorld steps up one block while chasing", () => {
  const stepWorld: CollisionWorld = {
    isSolidBlockLoaded(x, y, _z) {
      return y <= 0 || (x === 1 && y === 1);
    }
  };
  const mobs = new HostileMobWorld({ maxMobs: 4 });
  const mob = mobs.spawn({ position: { x: 0.5, y: 1, z: 0.5 } });

  mobs.step(stepWorld, { x: 4, y: 2, z: 0.5 }, 0.35);

  assert.ok(mob.position.x > 1);
  assert.equal(mob.position.y, 2);
});

test("HostileMobWorld does not step into a blocked head space", () => {
  const blockedStepWorld: CollisionWorld = {
    isSolidBlockLoaded(x, y, _z) {
      return y <= 0 || (x === 1 && (y === 1 || y === 3));
    }
  };
  const mobs = new HostileMobWorld({ maxMobs: 4 });
  const mob = mobs.spawn({ position: { x: 0.5, y: 1, z: 0.5 } });

  mobs.step(blockedStepWorld, { x: 4, y: 2, z: 0.5 }, 0.35);

  assert.ok(mob.position.x < 1);
  assert.equal(mob.position.y, 1);
});

test("HostileMobWorld reports contact damage after cooldown", () => {
  const mobs = new HostileMobWorld({ maxMobs: 4 });
  const mob = mobs.spawn({ position: { x: 0.8, y: 1, z: 0 } });
  mob.attackCooldownSeconds = 0;

  const result = mobs.step(flatWorld, { x: 0, y: 1, z: 0 }, 0.1);

  assert.deepEqual(result.attackedIds, [mob.id]);
  assert.equal(result.damage, 2);
});

test("zombie mobs chase a nearer villager target", () => {
  const mobs = new HostileMobWorld({ maxMobs: 4 });
  const mob = mobs.spawn({ role: "zombie", position: { x: 0, y: 1, z: 0 } });

  mobs.step(flatWorld, { x: 0, y: 1, z: 20 }, 0.5, {
    villagerTargets: [{ id: 7, position: { x: 5, y: 1, z: 0 } }]
  });

  assert.ok(mob.position.x > 0.5);
  assert.ok(Math.abs(mob.position.z) < 0.2);
});

test("zombie mobs path around simple walls while chasing", () => {
  const wallWorld: CollisionWorld = {
    isSolidBlockLoaded(x, y, z) {
      return y <= 0 || (x === 3 && z >= -1 && z <= 1 && y >= 1 && y <= 2);
    }
  };
  const mobs = new HostileMobWorld({ maxMobs: 4 });
  const mob = mobs.spawn({ role: "zombie", position: { x: 0.5, y: 1, z: 0.5 } });
  const player = { x: 7.5, y: 1, z: 0.5 };
  let crossedWall = false;
  let usedPath = false;

  for (let index = 0; index < 90; index += 1) {
    mobs.step(wallWorld, player, 0.1);
    usedPath ||= mob.activeGoal === "path_chase";
    if (mob.position.x > 4 && Math.abs(mob.position.z) > 1.1) {
      crossedWall = true;
      break;
    }
  }

  assert.equal(crossedWall, true);
  assert.equal(usedPath, true);
});

test("zombie mobs can damage villager targets without damaging the player", () => {
  const mobs = new HostileMobWorld({ maxMobs: 4 });
  const mob = mobs.spawn({ role: "zombie", position: { x: 0.8, y: 1, z: 0 } });
  mob.attackCooldownSeconds = 0;

  const result = mobs.step(flatWorld, { x: 20, y: 1, z: 20 }, 0.1, {
    villagerTargets: [{ id: 7, position: { x: 0, y: 1, z: 0 } }]
  });

  assert.equal(result.damage, 0);
  assert.deepEqual(result.attackedIds, []);
  assert.deepEqual(result.villagerAttacks.map((attack) => [attack.mobId, attack.villagerId, attack.damage]), [[mob.id, 7, 2]]);
});

test("zombie mobs can chase and damage guard targets", () => {
  const mobs = new HostileMobWorld({ maxMobs: 4 });
  const mob = mobs.spawn({ role: "zombie", position: { x: 0.8, y: 1, z: 0 } });
  mob.attackCooldownSeconds = 0;

  const result = mobs.step(flatWorld, { x: 20, y: 1, z: 20 }, 0.1, {
    guardTargets: [{ id: 12, position: { x: 0, y: 1, z: 0 } }]
  });

  assert.equal(result.damage, 0);
  assert.equal(result.villagerAttacks.length, 0);
  assert.deepEqual(result.guardAttacks.map((attack) => [attack.mobId, attack.guardId, attack.damage]), [[mob.id, 12, 2]]);
});

test("skeleton mobs ignore villager melee targets", () => {
  const mobs = new HostileMobWorld({ maxMobs: 4 });
  const mob = mobs.spawn({ role: "skeleton", position: { x: 0.8, y: 1, z: 0 } });
  mob.attackCooldownSeconds = 0;

  const result = mobs.step(flatWorld, { x: 9, y: 1, z: 0 }, 0.1, {
    villagerTargets: [{ id: 7, position: { x: 0, y: 1, z: 0 } }]
  });

  assert.equal(result.villagerAttacks.length, 0);
  assert.equal(result.damage, 0);
  assert.equal(result.projectilesSpawned[0].ownerId, mob.id);
});

test("skeleton mobs keep distance and shoot arrows", () => {
  const mobs = new HostileMobWorld({ maxMobs: 4 });
  const mob = mobs.spawn({ role: "skeleton", position: { x: 10, y: 1, z: 0 } });
  mob.attackCooldownSeconds = 0;

  const result = mobs.step(flatWorld, { x: 0, y: 1, z: 0 }, 0.1);

  assert.equal(result.projectilesSpawned.length, 1);
  assert.equal(result.projectilesSpawned[0].ownerId, mob.id);
  assert.equal(result.damage, 0);
});

test("skeleton mobs strafe while holding a shooting distance", () => {
  const mobs = new HostileMobWorld({ maxMobs: 4 });
  const mob = mobs.spawn({ role: "skeleton", position: { x: 8, y: 1, z: 0 } });

  mobs.step(flatWorld, { x: 0, y: 1, z: 0 }, 0.35);

  assert.equal(mob.activeGoal, "skeleton_strafe");
  assert.notEqual(Math.round(mob.position.z * 1000), 0);
});

test("skeleton arrows damage the player and disappear", () => {
  const mobs = new HostileMobWorld({ maxMobs: 4 });
  const mob = mobs.spawn({ role: "skeleton", position: { x: 7, y: 1, z: 0 } });
  mob.attackCooldownSeconds = 0;

  mobs.step(flatWorld, { x: 0, y: 1, z: 0 }, 0.05);
  let damage = 0;
  for (let step = 0; step < 24; step += 1) {
    const result = mobs.step(flatWorld, { x: 0, y: 1, z: 0 }, 0.05, { allowSpawning: false });
    damage += result.projectileDamage;
    if (damage > 0) {
      break;
    }
  }

  assert.equal(damage, 3);
  assert.equal(mobs.projectiles.length, 0);
});

test("HostileMobWorld burns exposed mobs in daylight", () => {
  const mobs = new HostileMobWorld({ maxMobs: 4 });
  const mob = mobs.spawn({ position: { x: 0, y: 1, z: 0 } });

  const result = mobs.step(flatWorld, { x: 12, y: 1, z: 0 }, 1.1, { burnInDaylight: true });

  assert.deepEqual(result.burningIds, [mob.id]);
  assert.equal(result.died.length, 0);
  assert.equal(mob.health, 18);
  assert.ok(mob.fireTimeSeconds > 0);
});

test("HostileMobWorld does not burn mobs under a roof", () => {
  const roofedWorld: CollisionWorld = {
    isSolidBlockLoaded(_x, y, _z) {
      return y <= 0 || y === 4;
    }
  };
  const mobs = new HostileMobWorld({ maxMobs: 4 });
  const mob = mobs.spawn({ position: { x: 0, y: 1, z: 0 } });

  const result = mobs.step(roofedWorld, { x: 12, y: 1, z: 0 }, 1.1, { burnInDaylight: true });

  assert.deepEqual(result.burningIds, []);
  assert.equal(mob.health, 20);
});

test("HostileMobWorld removes mobs killed by daylight burn", () => {
  const mobs = new HostileMobWorld({ maxMobs: 4 });
  const mob = mobs.spawn({ position: { x: 0, y: 1, z: 0 } });
  mob.health = 2;

  const result = mobs.step(flatWorld, { x: 12, y: 1, z: 0 }, 1.1, { burnInDaylight: true });

  assert.deepEqual(result.died.map((dead) => dead.id), [mob.id]);
  assert.equal(mobs.mobs.length, 0);
});

test("HostileMobWorld does not burn mobs unless daylight burn is enabled", () => {
  const mobs = new HostileMobWorld({ maxMobs: 4 });
  const mob = mobs.spawn({ position: { x: 0, y: 1, z: 0 } });

  mobs.step(flatWorld, { x: 12, y: 1, z: 0 }, 1.1);

  assert.equal(mob.health, 20);
  assert.equal(mob.fireTimeSeconds, 0);
});

test("HostileMobWorld applies damage, knockback, and removes dead mobs", () => {
  const mobs = new HostileMobWorld({ maxMobs: 4 });
  const mob = mobs.spawn({ position: { x: 1, y: 1, z: 0 } });

  const hurt = mobs.damageMob(mob.id, 7, { x: 3, y: 4, z: 0 });

  assert.equal(hurt.died, false);
  assert.equal(hurt.mob?.health, 13);
  assert.ok(mob.velocity.x > 0);
  assert.ok(mob.hurtTimeSeconds > 0);

  const killed = mobs.damageMob(mob.id, 20, { x: 3, y: 4, z: 0 });

  assert.equal(killed.died, true);
  assert.equal(mobs.mobs.length, 0);
});

test("HostileMobWorld decays bell reveal markers over time", () => {
  const mobs = new HostileMobWorld({ maxMobs: 4 });
  const mob = mobs.spawn({ role: "zombie", position: { x: 4, y: 1, z: 0 } });

  revealHostileMobByBell(mob, 3);
  mobs.step(flatWorld, { x: 0, y: 1, z: 0 }, 1);

  assert.ok(mob.bellRevealSeconds > 1.9);
  assert.ok(mob.bellRevealSeconds <= 2);

  mobs.step(flatWorld, { x: 0, y: 1, z: 0 }, 3);

  assert.equal(mob.bellRevealSeconds, 0);
});

test("HostileMobWorld clear removes active arrows", () => {
  const mobs = new HostileMobWorld({ maxMobs: 4 });
  const mob = mobs.spawn({ role: "skeleton", position: { x: 10, y: 1, z: 0 } });
  mob.attackCooldownSeconds = 0;
  mobs.step(flatWorld, { x: 0, y: 1, z: 0 }, 0.1);

  mobs.clear();

  assert.equal(mobs.mobs.length, 0);
  assert.equal(mobs.projectiles.length, 0);
});

test("HostileMobWorld only spawns through the spawning gate", () => {
  const mobs = new HostileMobWorld({ maxMobs: 4, spawnIntervalSeconds: 0.1 });
  mobs.spawnCooldownSeconds = 0;

  const blocked = mobs.step(flatWorld, { x: 0, y: 1, z: 0 }, 0.1, { allowSpawning: false });
  const allowed = mobs.step(flatWorld, { x: 0, y: 1, z: 0 }, 0.1, { allowSpawning: true });

  assert.equal(blocked.spawned.length, 0);
  assert.equal(allowed.spawned.length, 1);
});

test("HostileMobWorld avoids spawning in torch-lit spaces", () => {
  const brightWorld: CollisionWorld = {
    isSolidBlockLoaded(_x, y, _z) {
      return y <= 0;
    },
    getBlockLightLevelLoaded() {
      return 14;
    }
  };
  const mobs = new HostileMobWorld({ maxMobs: 4, spawnIntervalSeconds: 0.1 });
  mobs.spawnCooldownSeconds = 0;

  const result = mobs.step(brightWorld, { x: 0, y: 1, z: 0 }, 0.1, { allowSpawning: true });

  assert.equal(result.spawned.length, 0);
});
