import assert from "node:assert/strict";
import test from "node:test";
import { alertVillageGuardByBell, VillageGuardWorld } from "../entity/villageGuard.ts";
import type { VillageSite } from "../generation/overworldGenerator.ts";
import type { CollisionWorld } from "../physics/playerPhysics.ts";

const flatWorld: CollisionWorld = {
  isSolidBlockLoaded: (_x: number, y: number, _z: number) => y <= 0,
  getMotionBlockingHeightLoaded: () => 0
};

const site: VillageSite = {
  id: "0,0",
  centerX: 8,
  centerZ: 8,
  centerY: 1,
  biomeId: "plains",
  villagerPositions: [
    { x: 7, y: 1, z: 8 },
    { x: 9, y: 1, z: 8 },
    { x: 8, y: 1, z: 10 }
  ]
};

test("VillageGuardWorld spawns one guard for a populated village", () => {
  const guards = new VillageGuardWorld();

  assert.equal(guards.ensureVillage(site, flatWorld, 2).length, 0);
  assert.equal(guards.ensureVillage(site, flatWorld, 3).length, 1);
  assert.equal(guards.ensureVillage(site, flatWorld, 3).length, 0);
  assert.equal(guards.guards.length, 1);
});

test("VillageGuardWorld avoids spawning guards on village roofs", () => {
  const guards = new VillageGuardWorld();
  const roofWorld = createGuardRoofWorld(8, 8, 65, 69);
  const roofSite: VillageSite = {
    ...site,
    centerY: 65
  };

  const [guard] = guards.ensureVillage(roofSite, roofWorld, 3);

  assert.equal(guard.position.y, 65);
});

test("VillageGuardWorld evacuates guards already standing on village roofs", () => {
  const guards = new VillageGuardWorld();
  const roofWorld = createGuardRoofWorld(8, 8, 65, 69);
  const guard = guards.spawn({
    villageId: "manual",
    position: { x: 8.5, y: 70, z: 8.5 },
    home: { x: 14.5, y: 65, z: 8.5 }
  });

  guards.step(roofWorld, 0.1, []);

  assert.equal(guard.position.y, 65);
  assert.equal(Math.floor(guard.position.x), 14);
});

test("VillageGuardWorld chases nearby zombie targets", () => {
  const guards = new VillageGuardWorld();
  const guard = guards.ensureVillage(site, flatWorld, 3)[0];
  const startX = guard.position.x;

  guards.step(flatWorld, 0.5, [{ id: 4, position: { x: startX + 7, y: 1, z: guard.position.z } }]);

  assert.equal(guard.activeGoal, "attack");
  assert.ok(guard.position.x > startX);
  assert.equal(guard.targetMobId, 4);
});

test("VillageGuardWorld paths around simple walls while defending", () => {
  const wallWorld: CollisionWorld = {
    isSolidBlockLoaded(x, y, z) {
      return y <= 0 || (x === 3 && z >= -1 && z <= 1 && y >= 1 && y <= 3);
    },
    getMotionBlockingHeightLoaded: () => 0
  };
  const guards = new VillageGuardWorld();
  const guard = guards.spawn({ villageId: "manual", position: { x: 0.5, y: 1, z: 0.5 } });
  const target = { id: 42, position: { x: 7.5, y: 1, z: 0.5 } };
  let usedPath = false;
  let crossedWall = false;

  for (let index = 0; index < 90; index += 1) {
    guards.step(wallWorld, 0.1, [target]);
    usedPath ||= guard.activeGoal === "path_attack";
    if (guard.position.x > 4 && Math.abs(guard.position.z) > 1.1) {
      crossedWall = true;
      break;
    }
  }

  assert.equal(usedPath, true);
  assert.equal(crossedWall, true);
});

test("VillageGuardWorld reports attacks against close zombie targets", () => {
  const guards = new VillageGuardWorld();
  const guard = guards.spawn({ villageId: "manual", position: { x: 0, y: 1, z: 0 } });
  guard.attackCooldownSeconds = 0;

  const result = guards.step(flatWorld, 0.1, [{ id: 9, position: { x: 1, y: 1, z: 0 } }]);

  assert.deepEqual(result.attacks.map((attack) => [attack.guardId, attack.mobId, attack.damage]), [[guard.id, 9, 8]]);
  assert.ok(result.attacks[0].knockback.x > 0);
  assert.ok(result.attacks[0].knockback.y > 0);
  assert.ok(guard.swingSeconds > 0);
});

test("VillageGuardWorld patrols around a bell alarm point", () => {
  const guards = new VillageGuardWorld();
  const guard = guards.spawn({
    villageId: "manual",
    position: { x: 0.5, y: 1, z: 0.5 },
    home: { x: 0.5, y: 1, z: 0.5 }
  });

  alertVillageGuardByBell(
    guard,
    { x: 8.5, y: 1, z: 0.5 },
    { x: 8.5, y: 1, z: 0.5 },
    6
  );
  guards.step(flatWorld, 0.5, []);

  assert.ok(guard.alarmSeconds > 0);
  assert.notEqual(guard.alarmPoint, null);
  assert.equal(guard.activeGoal, "patrol");
  assert.ok(guard.position.x > 0.5);
  assert.ok(Math.hypot(guard.patrolTarget.x - 8.5, guard.patrolTarget.z - 0.5) < 7);
});

test("VillageGuardWorld applies damage and removes killed guards", () => {
  const guards = new VillageGuardWorld();
  const guard = guards.spawn({ villageId: "manual", position: { x: 0, y: 1, z: 0 } });

  const hurt = guards.damageGuard(guard.id, 12, { x: 2, y: 1.5, z: 0 });
  assert.equal(hurt.died, false);
  assert.equal(guard.health, 88);
  assert.ok(guard.hurtTimeSeconds > 0);
  assert.ok(guard.knockbackSeconds > 0);
  assert.ok(guard.velocity.x > 0);

  const killed = guards.damageGuard(guard.id, 120, { x: 0, y: 0, z: 0 });
  assert.equal(killed.died, true);
  assert.equal(guards.guards.length, 0);
});

test("VillageGuardWorld attacks the player after being provoked", () => {
  const guards = new VillageGuardWorld();
  const guard = guards.spawn({ villageId: "manual", position: { x: 0, y: 1, z: 0 } });

  guards.damageGuard(guard.id, 1, { x: 0, y: 0, z: 0 }, { angerAtPlayer: true });
  guard.knockbackSeconds = 0;
  guard.attackCooldownSeconds = 0;
  const result = guards.step(flatWorld, 0.1, [], { playerPosition: { x: 1, y: 1, z: 0 } });

  assert.equal(guard.targetKind, "player");
  assert.equal(result.playerDamage, 7);
  assert.deepEqual(result.playerAttacks.map((attack) => [attack.guardId, attack.damage]), [[guard.id, 7]]);
});

function createGuardRoofWorld(roofX: number, roofZ: number, floorY: number, roofY: number): CollisionWorld {
  return {
    isSolidBlockLoaded: (x: number, y: number, z: number) => {
      const onRoof = Math.abs(x - roofX) <= 4 && Math.abs(z - roofZ) <= 4;
      const onWall = (Math.abs(x - roofX) === 3 || Math.abs(z - roofZ) === 3) && Math.abs(x - roofX) <= 3 && Math.abs(z - roofZ) <= 3;
      if (onRoof && y === roofY) {
        return true;
      }
      if (onWall && y >= floorY && y < roofY) {
        return true;
      }
      return y === floorY - 1;
    },
    getBlockTypeIdLoaded: (x: number, y: number, z: number) => {
      const onRoof = Math.abs(x - roofX) <= 4 && Math.abs(z - roofZ) <= 4;
      const onWall = (Math.abs(x - roofX) === 3 || Math.abs(z - roofZ) === 3) && Math.abs(x - roofX) <= 3 && Math.abs(z - roofZ) <= 3;
      if (onRoof && y === roofY) {
        return "cobblestone";
      }
      if (onWall && y >= floorY && y < roofY) {
        return "planks";
      }
      return null;
    },
    getMotionBlockingHeightLoaded: (x: number, z: number) =>
      Math.abs(x - roofX) <= 4 && Math.abs(z - roofZ) <= 4 ? roofY : floorY - 1
  };
}
