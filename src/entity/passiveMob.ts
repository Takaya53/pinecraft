import type { Vec3i } from "../core/constants.ts";
import type { CollisionWorld } from "../physics/playerPhysics.ts";
import { selectGoal, type AiGoal } from "./goalSelector.ts";

export type PassiveMobRole = "cow" | "pig";
export type PassiveMobGoal = "idle" | "wander" | "avoid_player" | "panic";

export type PassiveMob = {
  id: number;
  role: PassiveMobRole;
  position: Vec3i;
  velocity: Vec3i;
  health: number;
  ageSeconds: number;
  hurtTimeSeconds: number;
  wanderAngle: number;
  wanderSeconds: number;
  panicAngle: number;
  panicSeconds: number;
  activeGoal: PassiveMobGoal;
};

export type PassiveMobDamageResult = {
  mob: PassiveMob | null;
  died: boolean;
};

const GRAVITY = 22;
const WALK_SPEED = 1.25;
const FLEE_SPEED = 2.7;
const FLEE_RANGE = 4.8;
const SPAWN_INTERVAL_SECONDS = 7;
const DEFAULT_MAX_MOBS = 10;
const STEP_HEIGHT = 1;

export class PassiveMobWorld {
  mobs: PassiveMob[];
  nextId: number;
  spawnCooldownSeconds: number;
  maxMobs: number;

  constructor(options: { maxMobs?: number } = {}) {
    this.mobs = [];
    this.nextId = 1;
    this.spawnCooldownSeconds = 1.5;
    this.maxMobs = options.maxMobs ?? DEFAULT_MAX_MOBS;
  }

  spawn(options: { role?: PassiveMobRole; position: Vec3i }): PassiveMob {
    const mob: PassiveMob = {
      id: this.nextId,
      role: options.role ?? "cow",
      position: { ...options.position },
      velocity: { x: 0, y: 0, z: 0 },
      health: options.role === "pig" ? 10 : 12,
      ageSeconds: 0,
      hurtTimeSeconds: 0,
      wanderAngle: stableUnit(options.position.x, options.position.y, options.position.z) * Math.PI * 2,
      wanderSeconds: 0.5,
      panicAngle: 0,
      panicSeconds: 0,
      activeGoal: "idle"
    };
    this.nextId += 1;
    this.mobs.push(mob);
    return mob;
  }

  step(world: CollisionWorld, playerPosition: Vec3i, deltaSeconds: number, options: { allowSpawning?: boolean } = {}): PassiveMob[] {
    const spawned: PassiveMob[] = [];
    this.spawnCooldownSeconds = Math.max(0, this.spawnCooldownSeconds - deltaSeconds);
    if (options.allowSpawning && this.mobs.length < this.maxMobs && this.spawnCooldownSeconds <= 0) {
      const mob = this.trySpawnAroundPlayer(world, playerPosition);
      if (mob) {
        spawned.push(mob);
      }
      this.spawnCooldownSeconds = SPAWN_INTERVAL_SECONDS;
    }

    for (const mob of this.mobs) {
      mob.ageSeconds += deltaSeconds;
      mob.hurtTimeSeconds = Math.max(0, mob.hurtTimeSeconds - deltaSeconds);
      mob.panicSeconds = Math.max(0, mob.panicSeconds - deltaSeconds);
      mob.wanderSeconds = Math.max(0, mob.wanderSeconds - deltaSeconds);
      stepPassiveMobPhysics(world, mob, playerPosition, deltaSeconds);
    }
    return spawned;
  }

  damageMob(id: number, amount: number, knockback: Vec3i): PassiveMobDamageResult {
    const mob = this.mobs.find((candidate) => candidate.id === id) ?? null;
    if (!mob) {
      return { mob: null, died: false };
    }

    mob.health = Math.max(0, mob.health - Math.max(0, amount));
    mob.hurtTimeSeconds = 0.24;
    mob.panicSeconds = 3.5;
    if (Math.hypot(knockback.x, knockback.z) > 0.001) {
      mob.panicAngle = Math.atan2(knockback.z, knockback.x);
    } else {
      mob.panicAngle = stableUnit(mob.id, Math.floor(mob.ageSeconds * 10), 89) * Math.PI * 2;
    }
    mob.velocity.x = knockback.x;
    mob.velocity.y = Math.max(mob.velocity.y, knockback.y);
    mob.velocity.z = knockback.z;

    if (mob.health > 0) {
      return { mob, died: false };
    }

    this.mobs = this.mobs.filter((candidate) => candidate.id !== id);
    return { mob, died: true };
  }

  clear(): void {
    this.mobs = [];
    this.spawnCooldownSeconds = 1.5;
  }

  private trySpawnAroundPlayer(world: CollisionWorld, playerPosition: Vec3i): PassiveMob | null {
    for (let attempt = 0; attempt < 12; attempt += 1) {
      const angle = stableUnit(playerPosition.x, playerPosition.z, attempt + this.nextId) * Math.PI * 2;
      const radius = 10 + stableUnit(playerPosition.z, attempt, this.nextId) * 18;
      const x = Math.floor(playerPosition.x + Math.cos(angle) * radius);
      const z = Math.floor(playerPosition.z + Math.sin(angle) * radius);
      const y = findSurfaceSpawnY(world, x, z);
      if (y === null) {
        continue;
      }
      const role: PassiveMobRole = stableUnit(x, y, z) < 0.58 ? "cow" : "pig";
      return this.spawn({ role, position: { x: x + 0.5, y, z: z + 0.5 } });
    }
    return null;
  }
}

type PassiveMoveContext = {
  mob: PassiveMob;
  playerPosition: Vec3i;
  distanceToPlayer: number;
  playerDx: number;
  playerDz: number;
};

type PassiveMoveIntent = {
  goal: PassiveMobGoal;
  velocityX: number;
  velocityZ: number;
};

const PASSIVE_MOVE_GOALS: readonly AiGoal<PassiveMoveContext, PassiveMoveIntent>[] = [
  {
    id: "panic",
    priority: 0,
    canRun: ({ mob }) => mob.panicSeconds > 0,
    run: ({ mob }) => {
      const jitter = (stableUnit(mob.id, Math.floor(mob.ageSeconds * 12), 101) - 0.5) * 0.7;
      const angle = mob.panicAngle + jitter;
      return {
        goal: "panic",
        velocityX: Math.cos(angle) * FLEE_SPEED * 1.25,
        velocityZ: Math.sin(angle) * FLEE_SPEED * 1.25
      };
    }
  },
  {
    id: "avoid_player",
    priority: 1,
    canRun: ({ distanceToPlayer }) => distanceToPlayer > 0.001 && distanceToPlayer < FLEE_RANGE,
    run: ({ distanceToPlayer, playerDx, playerDz, mob }) => {
      mob.wanderSeconds = 0.8;
      return {
        goal: "avoid_player",
        velocityX: (playerDx / distanceToPlayer) * FLEE_SPEED,
        velocityZ: (playerDz / distanceToPlayer) * FLEE_SPEED
      };
    }
  },
  {
    id: "wander",
    priority: 4,
    canRun: () => true,
    run: ({ mob }) => {
      if (mob.wanderSeconds <= 0) {
        mob.wanderAngle = stableUnit(mob.id, Math.floor(mob.ageSeconds * 10), 31) * Math.PI * 2;
        mob.wanderSeconds = 1.5 + stableUnit(mob.id, Math.floor(mob.ageSeconds * 10), 47) * 2.5;
      }
      const moving = stableUnit(mob.id, Math.floor(mob.ageSeconds * 2), 61) > 0.28;
      return {
        goal: moving ? "wander" : "idle",
        velocityX: moving ? Math.cos(mob.wanderAngle) * WALK_SPEED : 0,
        velocityZ: moving ? Math.sin(mob.wanderAngle) * WALK_SPEED : 0
      };
    }
  }
];

function stepPassiveMobPhysics(world: CollisionWorld, mob: PassiveMob, playerPosition: Vec3i, deltaSeconds: number): void {
  const dx = mob.position.x - playerPosition.x;
  const dz = mob.position.z - playerPosition.z;
  const distanceToPlayer = Math.hypot(dx, dz);
  const intent = selectPassiveMoveIntent({ mob, playerPosition, distanceToPlayer, playerDx: dx, playerDz: dz });
  mob.activeGoal = intent.goal;
  mob.velocity.x = intent.velocityX;
  mob.velocity.z = intent.velocityZ;

  mob.velocity.y -= GRAVITY * deltaSeconds;
  const nextX = mob.position.x + mob.velocity.x * deltaSeconds;
  const nextZ = mob.position.z + mob.velocity.z * deltaSeconds;
  if (canOccupy(world, nextX, mob.position.y, nextZ)) {
    mob.position.x = nextX;
    mob.position.z = nextZ;
  } else if (isOnGround(world, mob) && canOccupy(world, nextX, mob.position.y + STEP_HEIGHT, nextZ)) {
    mob.position.x = nextX;
    mob.position.y += STEP_HEIGHT;
    mob.position.z = nextZ;
    mob.velocity.y = Math.max(0, mob.velocity.y);
  } else {
    mob.wanderSeconds = 0;
  }

  moveMobVertically(world, mob, deltaSeconds);
}

function selectPassiveMoveIntent(context: PassiveMoveContext): PassiveMoveIntent {
  return selectGoal(PASSIVE_MOVE_GOALS, context, { goal: "idle", velocityX: 0, velocityZ: 0 });
}

function canOccupy(world: CollisionWorld, x: number, y: number, z: number): boolean {
  const blockX = Math.floor(x);
  const blockZ = Math.floor(z);
  return (
    !world.isSolidBlockLoaded(blockX, Math.floor(y + 0.15), blockZ) &&
    !world.isSolidBlockLoaded(blockX, Math.floor(y + 0.95), blockZ) &&
    !world.isSolidBlockLoaded(blockX, Math.floor(y + 1.45), blockZ)
  );
}

function moveMobVertically(world: CollisionWorld, mob: PassiveMob, deltaSeconds: number): void {
  const nextY = mob.position.y + mob.velocity.y * deltaSeconds;
  const blockX = Math.floor(mob.position.x);
  const blockZ = Math.floor(mob.position.z);

  if (mob.velocity.y <= 0) {
    const currentFootY = Math.floor(mob.position.y - 0.04);
    const nextFootY = Math.floor(nextY - 0.04);
    for (let y = currentFootY; y >= nextFootY; y -= 1) {
      if (!world.isSolidBlockLoaded(blockX, y, blockZ)) {
        continue;
      }
      mob.position.y = y + 1;
      mob.velocity.y = 0;
      return;
    }
  } else {
    const currentHeadY = Math.floor(mob.position.y + 1.45);
    const nextHeadY = Math.floor(nextY + 1.45);
    for (let y = currentHeadY; y <= nextHeadY; y += 1) {
      if (!world.isSolidBlockLoaded(blockX, y, blockZ)) {
        continue;
      }
      mob.position.y = y - 1.5;
      mob.velocity.y = 0;
      return;
    }
  }

  mob.position.y = nextY;
}

function isOnGround(world: CollisionWorld, mob: PassiveMob): boolean {
  return world.isSolidBlockLoaded(
    Math.floor(mob.position.x),
    Math.floor(mob.position.y - 0.04),
    Math.floor(mob.position.z)
  );
}

function findSurfaceSpawnY(world: CollisionWorld, x: number, z: number): number | null {
  const surfaceY = world.getMotionBlockingHeightLoaded?.(x, z);
  if (surfaceY === null || surfaceY === undefined) {
    return null;
  }
  if (
    world.isSolidBlockLoaded(x, surfaceY, z) &&
    !world.isSolidBlockLoaded(x, surfaceY + 1, z) &&
    !world.isSolidBlockLoaded(x, surfaceY + 2, z) &&
    (world.getBlockLightLevelLoaded?.(x, surfaceY + 1, z) ?? 15) >= 9
  ) {
    return surfaceY + 1;
  }
  return null;
}

function stableUnit(a: number, b: number, c: number): number {
  let value = Math.imul(Math.floor(a * 131) + 0x9e3779b9, 0x85ebca6b);
  value ^= Math.imul(Math.floor(b * 137) + 0xc2b2ae35, 0x27d4eb2d);
  value ^= Math.imul(Math.floor(c * 149) + 0x165667b1, 0x9e3779b1);
  value = Math.imul(value ^ (value >>> 15), 0x85ebca6b);
  return ((value ^ (value >>> 13)) >>> 0) / 0xffffffff;
}
