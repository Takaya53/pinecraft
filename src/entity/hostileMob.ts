import { WORLD_MAX_Y, type Vec3i } from "../core/constants.ts";
import type { CollisionWorld } from "../physics/playerPhysics.ts";
import { selectGoal, type AiGoal } from "./goalSelector.ts";

export type HostileMobRole = "zombie" | "skeleton";
export type HostileMobGoal = "idle" | "knockback" | "chase" | "path_chase" | "skeleton_backoff" | "skeleton_strafe";

export type HostileMob = {
  id: number;
  role: HostileMobRole;
  position: Vec3i;
  velocity: Vec3i;
  health: number;
  ageSeconds: number;
  hurtTimeSeconds: number;
  knockbackSeconds: number;
  fireTimeSeconds: number;
  burnDamageTimerSeconds: number;
  attackCooldownSeconds: number;
  strafeClockwise: boolean;
  strafeSeconds: number;
  activeGoal: HostileMobGoal;
  path: Vec3i[];
  pathTarget: Vec3i | null;
  pathCooldownSeconds: number;
  bellRevealSeconds: number;
};

export type HostileProjectile = {
  id: number;
  ownerId: number;
  role: "arrow";
  position: Vec3i;
  velocity: Vec3i;
  ageSeconds: number;
};

export type HostileMobStepResult = {
  spawned: HostileMob[];
  attackedIds: number[];
  villagerAttacks: HostileVillagerAttack[];
  guardAttacks: HostileGuardAttack[];
  burningIds: number[];
  died: HostileMob[];
  damage: number;
  projectilesSpawned: HostileProjectile[];
  projectileHits: HostileProjectile[];
  projectileDamage: number;
};

export type HostileMobVillagerTarget = {
  id: number;
  position: Vec3i;
};

export type HostileMobGuardTarget = {
  id: number;
  position: Vec3i;
};

export type HostileVillagerAttack = {
  mobId: number;
  villagerId: number;
  damage: number;
  position: Vec3i;
};

export type HostileGuardAttack = {
  mobId: number;
  guardId: number;
  damage: number;
  position: Vec3i;
};

export type HostileMobDamageResult = {
  mob: HostileMob | null;
  died: boolean;
};

const GRAVITY = 22;
const WALK_SPEED = 2.15;
const TRACKING_RANGE = 28;
const ATTACK_RANGE = 1.25;
const ATTACK_DAMAGE = 2;
const ATTACK_COOLDOWN_SECONDS = 1.15;
const SKELETON_KEEP_DISTANCE = 8;
const SKELETON_SHOOT_RANGE = 22;
const SKELETON_ATTACK_COOLDOWN_SECONDS = 2.15;
const ARROW_SPEED = 10.8;
const ARROW_DAMAGE = 3;
const ARROW_MAX_AGE_SECONDS = 5;
const ARROW_GRAVITY = 4.2;
const BURN_DAMAGE = 2;
const BURN_DAMAGE_INTERVAL_SECONDS = 1;
const SPAWN_INTERVAL_SECONDS = 5;
const DEFAULT_MAX_MOBS = 8;
const STEP_HEIGHT = 1;
const PATH_NODE_REACHED_DISTANCE = 0.2;
const PATH_SEARCH_PADDING = 7;
const PATH_MAX_NODES = 260;
const PATH_MAX_LENGTH = 34;
const PATH_RECALCULATE_SECONDS = 0.55;

export type HostileMobWorldOptions = {
  maxMobs?: number;
  spawnIntervalSeconds?: number;
};

export class HostileMobWorld {
  mobs: HostileMob[];
  projectiles: HostileProjectile[];
  nextId: number;
  nextProjectileId: number;
  spawnCooldownSeconds: number;
  maxMobs: number;
  spawnIntervalSeconds: number;

  constructor(options: HostileMobWorldOptions = {}) {
    this.mobs = [];
    this.projectiles = [];
    this.nextId = 1;
    this.nextProjectileId = 1;
    this.spawnCooldownSeconds = 1;
    this.maxMobs = options.maxMobs ?? DEFAULT_MAX_MOBS;
    this.spawnIntervalSeconds = options.spawnIntervalSeconds ?? SPAWN_INTERVAL_SECONDS;
  }

  spawn(options: { role?: HostileMobRole; position: Vec3i }): HostileMob {
    const mob: HostileMob = {
      id: this.nextId,
      role: options.role ?? "zombie",
      position: { ...options.position },
      velocity: { x: 0, y: 0, z: 0 },
      health: 20,
      ageSeconds: 0,
      hurtTimeSeconds: 0,
      knockbackSeconds: 0,
      fireTimeSeconds: 0,
      burnDamageTimerSeconds: 0,
      attackCooldownSeconds: options.role === "skeleton" ? 1.2 : 0.5,
      strafeClockwise: stableUnit(this.nextId, options.position.x, options.position.z) > 0.5,
      strafeSeconds: 1.2,
      activeGoal: "idle",
      path: [],
      pathTarget: null,
      pathCooldownSeconds: 0,
      bellRevealSeconds: 0
    };
    this.nextId += 1;
    this.mobs.push(mob);
    return mob;
  }

  step(
    world: CollisionWorld,
    playerPosition: Vec3i,
    deltaSeconds: number,
    options: {
      allowSpawning?: boolean;
      burnInDaylight?: boolean;
      villagerTargets?: readonly HostileMobVillagerTarget[];
      guardTargets?: readonly HostileMobGuardTarget[];
    } = {}
  ): HostileMobStepResult {
    const spawned: HostileMob[] = [];
    this.spawnCooldownSeconds = Math.max(0, this.spawnCooldownSeconds - deltaSeconds);
    if (options.allowSpawning && this.mobs.length < this.maxMobs && this.spawnCooldownSeconds <= 0) {
      const mob = this.trySpawnAroundPlayer(world, playerPosition);
      if (mob) {
        spawned.push(mob);
      }
      this.spawnCooldownSeconds = this.spawnIntervalSeconds;
    }

    const attackedIds: number[] = [];
    const villagerAttacks: HostileVillagerAttack[] = [];
    const guardAttacks: HostileGuardAttack[] = [];
    const burningIds: number[] = [];
    const died: HostileMob[] = [];
    const projectilesSpawned: HostileProjectile[] = [];
    let damage = 0;
    for (const mob of this.mobs) {
      mob.ageSeconds += deltaSeconds;
      mob.hurtTimeSeconds = Math.max(0, mob.hurtTimeSeconds - deltaSeconds);
      mob.knockbackSeconds = Math.max(0, mob.knockbackSeconds - deltaSeconds);
      mob.fireTimeSeconds = Math.max(0, mob.fireTimeSeconds - deltaSeconds);
      mob.attackCooldownSeconds = Math.max(0, mob.attackCooldownSeconds - deltaSeconds);
      mob.pathCooldownSeconds = Math.max(0, mob.pathCooldownSeconds - deltaSeconds);
      mob.bellRevealSeconds = Math.max(0, mob.bellRevealSeconds - deltaSeconds);

      if (options.burnInDaylight && isExposedToSky(world, mob)) {
        mob.fireTimeSeconds = 0.35;
        mob.burnDamageTimerSeconds += deltaSeconds;
        burningIds.push(mob.id);
        if (mob.burnDamageTimerSeconds >= BURN_DAMAGE_INTERVAL_SECONDS) {
          mob.burnDamageTimerSeconds = 0;
          mob.health = Math.max(0, mob.health - BURN_DAMAGE);
          mob.hurtTimeSeconds = 0.2;
          if (mob.health <= 0) {
            died.push(mob);
            continue;
          }
        }
      } else {
        mob.burnDamageTimerSeconds = 0;
      }

      const target = selectHostileTarget(mob, playerPosition, options.villagerTargets ?? [], options.guardTargets ?? []);
      const distanceToPlayer = distance3d(mob.position, playerPosition);
      stepMobPhysics(world, mob, target.position, deltaSeconds);
      if (mob.role === "skeleton" && shouldSkeletonShoot(world, mob, playerPosition, distanceToPlayer)) {
        if (mob.attackCooldownSeconds <= 0) {
          mob.attackCooldownSeconds = SKELETON_ATTACK_COOLDOWN_SECONDS;
          const projectile = this.spawnArrow(mob, playerPosition);
          projectilesSpawned.push(projectile);
        }
        continue;
      }
      const attackDistance = distance2d(mob.position, target.position);
      const verticalDistance = Math.abs(mob.position.y - target.position.y);
      if (attackDistance <= ATTACK_RANGE && verticalDistance < 1.8) {
        if (mob.attackCooldownSeconds <= 0) {
          mob.attackCooldownSeconds = ATTACK_COOLDOWN_SECONDS;
          if (target.kind === "villager") {
            villagerAttacks.push({
              mobId: mob.id,
              villagerId: target.id,
              damage: ATTACK_DAMAGE,
              position: { ...target.position }
            });
          } else if (target.kind === "guard") {
            guardAttacks.push({
              mobId: mob.id,
              guardId: target.id,
              damage: ATTACK_DAMAGE,
              position: { ...target.position }
            });
          } else {
            attackedIds.push(mob.id);
            damage += ATTACK_DAMAGE;
          }
        }
      }
    }

    if (died.length > 0) {
      const deadIds = new Set(died.map((mob) => mob.id));
      this.mobs = this.mobs.filter((mob) => !deadIds.has(mob.id));
    }

    const projectileResult = this.stepProjectiles(world, playerPosition, deltaSeconds);

    return {
      spawned,
      attackedIds,
      villagerAttacks,
      guardAttacks,
      burningIds,
      died,
      damage,
      projectilesSpawned,
      projectileHits: projectileResult.hits,
      projectileDamage: projectileResult.damage
    };
  }

  damageMob(id: number, amount: number, knockback: Vec3i): HostileMobDamageResult {
    const mob = this.mobs.find((candidate) => candidate.id === id) ?? null;
    if (!mob) {
      return { mob: null, died: false };
    }

    mob.health = Math.max(0, mob.health - Math.max(0, amount));
    mob.hurtTimeSeconds = 0.24;
    mob.knockbackSeconds = 0.22;
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
    this.projectiles = [];
    this.spawnCooldownSeconds = 1;
  }

  private spawnArrow(mob: HostileMob, playerPosition: Vec3i): HostileProjectile {
    const origin = { x: mob.position.x, y: mob.position.y + 1.52, z: mob.position.z };
    const target = { x: playerPosition.x, y: playerPosition.y + 1.12, z: playerPosition.z };
    const distance = Math.max(1, distance3d(origin, target));
    const velocity = {
      x: ((target.x - origin.x) / distance) * ARROW_SPEED,
      y: ((target.y - origin.y) / distance) * ARROW_SPEED + Math.min(1.2, distance * 0.035),
      z: ((target.z - origin.z) / distance) * ARROW_SPEED
    };
    const projectile: HostileProjectile = {
      id: this.nextProjectileId,
      ownerId: mob.id,
      role: "arrow",
      position: origin,
      velocity,
      ageSeconds: 0
    };
    this.nextProjectileId += 1;
    this.projectiles.push(projectile);
    return projectile;
  }

  private stepProjectiles(
    world: CollisionWorld,
    playerPosition: Vec3i,
    deltaSeconds: number
  ): { hits: HostileProjectile[]; damage: number } {
    const hits: HostileProjectile[] = [];
    const alive: HostileProjectile[] = [];
    let damage = 0;

    for (const projectile of this.projectiles) {
      projectile.ageSeconds += deltaSeconds;
      projectile.velocity.y -= ARROW_GRAVITY * deltaSeconds;
      projectile.position.x += projectile.velocity.x * deltaSeconds;
      projectile.position.y += projectile.velocity.y * deltaSeconds;
      projectile.position.z += projectile.velocity.z * deltaSeconds;

      if (projectile.ageSeconds > ARROW_MAX_AGE_SECONDS) {
        continue;
      }
      if (world.isSolidBlockLoaded(Math.floor(projectile.position.x), Math.floor(projectile.position.y), Math.floor(projectile.position.z))) {
        continue;
      }
      if (arrowHitsPlayer(projectile, playerPosition)) {
        hits.push(projectile);
        damage += ARROW_DAMAGE;
        continue;
      }

      alive.push(projectile);
    }

    this.projectiles = alive;
    return { hits, damage };
  }

  private trySpawnAroundPlayer(world: CollisionWorld, playerPosition: Vec3i): HostileMob | null {
    for (let attempt = 0; attempt < 12; attempt += 1) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 12 + Math.random() * 14;
      const x = Math.floor(playerPosition.x + Math.cos(angle) * radius);
      const z = Math.floor(playerPosition.z + Math.sin(angle) * radius);
      const y = findSpawnY(world, x, Math.floor(playerPosition.y) + 8, z);
      if (y === null) {
        continue;
      }
      const role: HostileMobRole = Math.random() < 0.28 ? "skeleton" : "zombie";
      return this.spawn({ role, position: { x: x + 0.5, y, z: z + 0.5 } });
    }
    return null;
  }
}

export function revealHostileMobByBell(mob: HostileMob, durationSeconds = 10): void {
  mob.bellRevealSeconds = Math.max(mob.bellRevealSeconds, Math.max(0, durationSeconds));
}

type HostileTarget =
  | { kind: "player"; id: 0; position: Vec3i }
  | { kind: "villager"; id: number; position: Vec3i }
  | { kind: "guard"; id: number; position: Vec3i };

function selectHostileTarget(
  mob: HostileMob,
  playerPosition: Vec3i,
  villagerTargets: readonly HostileMobVillagerTarget[],
  guardTargets: readonly HostileMobGuardTarget[]
): HostileTarget {
  const playerTarget: HostileTarget = { kind: "player", id: 0, position: playerPosition };
  if (mob.role !== "zombie") {
    return playerTarget;
  }

  let best: HostileTarget = playerTarget;
  let bestDistance = distance3d(mob.position, playerPosition);
  for (const villager of villagerTargets) {
    const distance = distance3d(mob.position, villager.position);
    if (distance > TRACKING_RANGE || distance >= bestDistance) {
      continue;
    }
    best = { kind: "villager", id: villager.id, position: villager.position };
    bestDistance = distance;
  }
  for (const guard of guardTargets) {
    const distance = distance3d(mob.position, guard.position);
    if (distance > TRACKING_RANGE || distance >= bestDistance) {
      continue;
    }
    best = { kind: "guard", id: guard.id, position: guard.position };
    bestDistance = distance;
  }
  return best;
}

type HostileMoveContext = {
  world: CollisionWorld;
  mob: HostileMob;
  playerPosition: Vec3i;
  distanceToPlayer: number;
  deltaSeconds: number;
};

type HostileMoveIntent = {
  goal: HostileMobGoal;
  velocityX: number;
  velocityZ: number;
  dampKnockback?: boolean;
};

const HOSTILE_MOVE_GOALS: readonly AiGoal<HostileMoveContext, HostileMoveIntent>[] = [
  {
    id: "knockback",
    priority: 0,
    canRun: ({ mob }) => mob.knockbackSeconds > 0,
    run: () => ({ goal: "knockback", velocityX: 0, velocityZ: 0, dampKnockback: true })
  },
  {
    id: "skeleton_backoff",
    priority: 1,
    canRun: ({ mob, distanceToPlayer }) => mob.role === "skeleton" && distanceToPlayer > 0.001 && distanceToPlayer < SKELETON_KEEP_DISTANCE - 2,
    run: ({ mob, playerPosition, distanceToPlayer }) => {
      const dx = mob.position.x - playerPosition.x;
      const dz = mob.position.z - playerPosition.z;
      const speed = WALK_SPEED * 0.78;
      return {
        goal: "skeleton_backoff",
        velocityX: (dx / distanceToPlayer) * speed,
        velocityZ: (dz / distanceToPlayer) * speed
      };
    }
  },
  {
    id: "skeleton_strafe",
    priority: 2,
    canRun: ({ world, mob, playerPosition, distanceToPlayer }) =>
      mob.role === "skeleton" &&
      distanceToPlayer >= SKELETON_KEEP_DISTANCE - 2 &&
      distanceToPlayer <= SKELETON_SHOOT_RANGE &&
      hasLineOfSight(world, { x: mob.position.x, y: mob.position.y + 1.55, z: mob.position.z }, {
        x: playerPosition.x,
        y: playerPosition.y + 1.15,
        z: playerPosition.z
      }),
    run: ({ mob, playerPosition, distanceToPlayer }) => {
      const toPlayerX = (playerPosition.x - mob.position.x) / Math.max(0.001, distanceToPlayer);
      const toPlayerZ = (playerPosition.z - mob.position.z) / Math.max(0.001, distanceToPlayer);
      const side = mob.strafeClockwise ? 1 : -1;
      const strafeX = -toPlayerZ * side;
      const strafeZ = toPlayerX * side;
      const rangeBias = skeletonRangeBias(distanceToPlayer);
      const speed = WALK_SPEED * 0.62;
      return {
        goal: "skeleton_strafe",
        velocityX: strafeX * speed + toPlayerX * rangeBias,
        velocityZ: strafeZ * speed + toPlayerZ * rangeBias
      };
    }
  },
  {
    id: "chase",
    priority: 3,
    canRun: ({ distanceToPlayer }) => distanceToPlayer <= TRACKING_RANGE && distanceToPlayer > 0.001,
    run: ({ mob, playerPosition, distanceToPlayer }) => ({
      goal: "chase",
      velocityX: ((playerPosition.x - mob.position.x) / distanceToPlayer) * (mob.role === "skeleton" ? WALK_SPEED * 0.82 : WALK_SPEED),
      velocityZ: ((playerPosition.z - mob.position.z) / distanceToPlayer) * (mob.role === "skeleton" ? WALK_SPEED * 0.82 : WALK_SPEED)
    })
  }
];

function stepMobPhysics(world: CollisionWorld, mob: HostileMob, playerPosition: Vec3i, deltaSeconds: number): void {
  const movementTarget = movementTargetForMob(world, mob, playerPosition);
  const distanceToPlayer = distance2d(mob.position, movementTarget);
  const intent = selectHostileMoveIntent({ world, mob, playerPosition: movementTarget, distanceToPlayer, deltaSeconds });
  mob.activeGoal = intent.goal;
  if (mob.role === "zombie" && movementTarget !== playerPosition && intent.goal === "chase") {
    mob.activeGoal = "path_chase";
  }
  if (intent.dampKnockback) {
    mob.velocity.x *= Math.max(0, 1 - 3.8 * deltaSeconds);
    mob.velocity.z *= Math.max(0, 1 - 3.8 * deltaSeconds);
  } else {
    mob.velocity.x = intent.velocityX;
    mob.velocity.z = intent.velocityZ;
  }

  mob.velocity.y -= GRAVITY * deltaSeconds;
  const nextX = mob.position.x + mob.velocity.x * deltaSeconds;
  const nextZ = mob.position.z + mob.velocity.z * deltaSeconds;
  if (canOccupy(world, nextX, mob.position.y, nextZ)) {
    mob.position.x = nextX;
    mob.position.z = nextZ;
  } else if (
    isOnGround(world, mob) &&
    canOccupy(world, nextX, mob.position.y + STEP_HEIGHT, nextZ) &&
    world.isSolidBlockLoaded(Math.floor(nextX), Math.floor(mob.position.y), Math.floor(nextZ))
  ) {
    mob.position.x = nextX;
    mob.position.y += STEP_HEIGHT;
    mob.position.z = nextZ;
    mob.velocity.y = Math.max(0, mob.velocity.y);
  } else if (mob.role === "zombie" && intent.goal === "chase") {
    const path = mob.pathCooldownSeconds <= 0 ? findPath(world, mob.position, playerPosition) : [];
    mob.pathCooldownSeconds = PATH_RECALCULATE_SECONDS;
    if (path.length > 0) {
      mob.path = path;
      mob.pathTarget = { ...playerPosition };
      mob.activeGoal = "path_chase";
    }
  }

  moveMobVertically(world, mob, deltaSeconds);
}

function selectHostileMoveIntent(context: HostileMoveContext): HostileMoveIntent {
  updateSkeletonStrafeState(context.mob, context.deltaSeconds);
  return selectGoal(HOSTILE_MOVE_GOALS, context, { goal: "idle", velocityX: 0, velocityZ: 0 });
}

function updateSkeletonStrafeState(mob: HostileMob, deltaSeconds: number): void {
  if (mob.role !== "skeleton") {
    return;
  }
  mob.strafeSeconds = Math.max(0, mob.strafeSeconds - deltaSeconds);
  if (mob.strafeSeconds > 0) {
    return;
  }
  mob.strafeClockwise = !mob.strafeClockwise;
  mob.strafeSeconds = 1.6 + stableUnit(mob.id, Math.floor(mob.ageSeconds * 4), 173) * 2.4;
}

function movementTargetForMob(world: CollisionWorld, mob: HostileMob, target: Vec3i): Vec3i {
  if (mob.role !== "zombie") {
    return target;
  }
  if (mob.pathTarget && !sameBlockishPoint(mob.pathTarget, target)) {
    clearPath(mob);
  }

  const seesTarget = hasLineOfSight(world, { x: mob.position.x, y: mob.position.y + 1.45, z: mob.position.z }, {
    x: target.x,
    y: target.y + 1.25,
    z: target.z
  });
  if (seesTarget) {
    clearPath(mob);
    return target;
  }

  if (mob.path.length === 0 && mob.pathCooldownSeconds <= 0) {
    const path = findPath(world, mob.position, target);
    mob.pathCooldownSeconds = PATH_RECALCULATE_SECONDS;
    if (path.length > 0) {
      mob.path = path;
      mob.pathTarget = { ...target };
    }
  }

  return nextPathTarget(mob) ?? target;
}

function nextPathTarget(mob: HostileMob): Vec3i | null {
  while (mob.path.length > 0 && distance2d(mob.position, mob.path[0]) < PATH_NODE_REACHED_DISTANCE) {
    mob.path.shift();
  }
  return mob.path[0] ?? null;
}

function clearPath(mob: HostileMob): void {
  mob.path = [];
  mob.pathTarget = null;
}

function canOccupy(world: CollisionWorld, x: number, y: number, z: number): boolean {
  const blockX = Math.floor(x);
  const blockZ = Math.floor(z);
  return (
    !world.isSolidBlockLoaded(blockX, Math.floor(y + 0.2), blockZ) &&
    !world.isSolidBlockLoaded(blockX, Math.floor(y + 1.2), blockZ) &&
    !world.isSolidBlockLoaded(blockX, Math.floor(y + 2), blockZ)
  );
}

type PathNode = {
  x: number;
  z: number;
  y: number;
  g: number;
  f: number;
  parent: PathNode | null;
};

const PATH_NEIGHBORS: readonly [number, number][] = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1]
];

function findPath(world: CollisionWorld, start: Vec3i, goal: Vec3i): Vec3i[] {
  const startX = Math.floor(start.x);
  const startZ = Math.floor(start.z);
  const goalX = Math.floor(goal.x);
  const goalZ = Math.floor(goal.z);
  const startY = standYForPath(world, startX, startZ, start.y);
  const goalY = standYForPath(world, goalX, goalZ, goal.y);
  if (startY === null || goalY === null || (startX === goalX && startZ === goalZ)) {
    return [];
  }

  const minX = Math.min(startX, goalX) - PATH_SEARCH_PADDING;
  const maxX = Math.max(startX, goalX) + PATH_SEARCH_PADDING;
  const minZ = Math.min(startZ, goalZ) - PATH_SEARCH_PADDING;
  const maxZ = Math.max(startZ, goalZ) + PATH_SEARCH_PADDING;
  const open: PathNode[] = [{
    x: startX,
    z: startZ,
    y: startY,
    g: 0,
    f: manhattan(startX, startZ, goalX, goalZ),
    parent: null
  }];
  const bestG = new Map<string, number>([[pathKey(startX, startZ), 0]]);
  const closed = new Set<string>();
  let visited = 0;

  while (open.length > 0 && visited < PATH_MAX_NODES) {
    visited += 1;
    const currentIndex = lowestFIndex(open);
    const current = open.splice(currentIndex, 1)[0];
    const currentKey = pathKey(current.x, current.z);
    if (closed.has(currentKey)) {
      continue;
    }
    closed.add(currentKey);

    if (current.x === goalX && current.z === goalZ) {
      return reconstructPath(current, { x: goal.x, y: goalY, z: goal.z });
    }

    for (const [dx, dz] of PATH_NEIGHBORS) {
      const x = current.x + dx;
      const z = current.z + dz;
      if (x < minX || x > maxX || z < minZ || z > maxZ) {
        continue;
      }
      const key = pathKey(x, z);
      if (closed.has(key)) {
        continue;
      }
      const y = standYForPath(world, x, z, current.y);
      if (y === null || Math.abs(y - current.y) > STEP_HEIGHT + 0.1) {
        continue;
      }
      const g = current.g + 1 + Math.max(0, y - current.y) * 0.4;
      const previousG = bestG.get(key);
      if (previousG !== undefined && previousG <= g) {
        continue;
      }
      bestG.set(key, g);
      open.push({
        x,
        z,
        y,
        g,
        f: g + manhattan(x, z, goalX, goalZ),
        parent: current
      });
    }
  }

  return [];
}

function standYForPath(world: CollisionWorld, blockX: number, blockZ: number, referenceY: number): number | null {
  const surfaceY = world.getMotionBlockingHeightLoaded?.(blockX, blockZ);
  if (surfaceY !== null && surfaceY !== undefined) {
    const y = surfaceY + 1;
    if (Math.abs(y - referenceY) <= STEP_HEIGHT + 1.1 && canOccupy(world, blockX + 0.5, y, blockZ + 0.5)) {
      return y;
    }
  }

  const startY = Math.floor(referenceY) + STEP_HEIGHT;
  const endY = Math.floor(referenceY) - 2;
  for (let y = startY; y >= endY; y -= 1) {
    if (world.isSolidBlockLoaded(blockX, y - 1, blockZ) && canOccupy(world, blockX + 0.5, y, blockZ + 0.5)) {
      return y;
    }
  }
  return null;
}

function reconstructPath(node: PathNode, finalPoint: Vec3i): Vec3i[] {
  const points: Vec3i[] = [];
  let current: PathNode | null = node;
  while (current?.parent) {
    points.push({ x: current.x + 0.5, y: current.y, z: current.z + 0.5 });
    current = current.parent;
  }
  points.reverse();
  if (points.length > 0) {
    points[points.length - 1] = { ...finalPoint };
  }
  return points.slice(0, PATH_MAX_LENGTH);
}

function lowestFIndex(nodes: readonly PathNode[]): number {
  let bestIndex = 0;
  let bestF = nodes[0].f;
  for (let index = 1; index < nodes.length; index += 1) {
    if (nodes[index].f < bestF) {
      bestF = nodes[index].f;
      bestIndex = index;
    }
  }
  return bestIndex;
}

function pathKey(x: number, z: number): string {
  return `${x},${z}`;
}

function manhattan(x: number, z: number, targetX: number, targetZ: number): number {
  return Math.abs(targetX - x) + Math.abs(targetZ - z);
}

function moveMobVertically(world: CollisionWorld, mob: HostileMob, deltaSeconds: number): void {
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
    const currentHeadY = Math.floor(mob.position.y + 2);
    const nextHeadY = Math.floor(nextY + 2);
    for (let y = currentHeadY; y <= nextHeadY; y += 1) {
      if (!world.isSolidBlockLoaded(blockX, y, blockZ)) {
        continue;
      }
      mob.position.y = y - 2.01;
      mob.velocity.y = 0;
      return;
    }
  }

  mob.position.y = nextY;
}

function isOnGround(world: CollisionWorld, mob: HostileMob): boolean {
  return world.isSolidBlockLoaded(
    Math.floor(mob.position.x),
    Math.floor(mob.position.y - 0.04),
    Math.floor(mob.position.z)
  );
}

function findSpawnY(world: CollisionWorld, x: number, startY: number, z: number): number | null {
  const surfaceY = world.getMotionBlockingHeightLoaded?.(x, z);
  const cappedStartY = surfaceY === null || surfaceY === undefined ? startY : Math.min(startY, surfaceY + 1);
  for (let y = cappedStartY; y >= -64; y -= 1) {
      if (
        world.isSolidBlockLoaded(x, y - 1, z) &&
        !world.isSolidBlockLoaded(x, y, z) &&
        !world.isSolidBlockLoaded(x, y + 1, z) &&
        (world.getBlockLightLevelLoaded?.(x, y, z) ?? 0) <= 7
      ) {
        return y;
      }
  }
  return null;
}

function isExposedToSky(world: CollisionWorld, mob: HostileMob): boolean {
  const x = Math.floor(mob.position.x);
  const z = Math.floor(mob.position.z);
  const surfaceY = world.getMotionBlockingHeightLoaded?.(x, z);
  if (surfaceY !== null && surfaceY !== undefined) {
    return surfaceY < Math.floor(mob.position.y + 2);
  }
  for (let y = Math.floor(mob.position.y + 2); y <= WORLD_MAX_Y; y += 1) {
    if (world.isSolidBlockLoaded(x, y, z)) {
      return false;
    }
  }
  return true;
}

function shouldSkeletonShoot(world: CollisionWorld, mob: HostileMob, playerPosition: Vec3i, distanceToPlayer: number): boolean {
  return distanceToPlayer >= 4
    && distanceToPlayer <= SKELETON_SHOOT_RANGE
    && Math.abs(mob.position.y - playerPosition.y) <= 4
    && hasLineOfSight(world, { x: mob.position.x, y: mob.position.y + 1.55, z: mob.position.z }, {
      x: playerPosition.x,
      y: playerPosition.y + 1.15,
      z: playerPosition.z
    });
}

function hasLineOfSight(world: CollisionWorld, from: Vec3i, to: Vec3i): boolean {
  const distance = distance3d(from, to);
  const steps = Math.max(1, Math.ceil(distance * 2.5));
  for (let step = 1; step < steps; step += 1) {
    const t = step / steps;
    const x = from.x + (to.x - from.x) * t;
    const y = from.y + (to.y - from.y) * t;
    const z = from.z + (to.z - from.z) * t;
    if (world.isSolidBlockLoaded(Math.floor(x), Math.floor(y), Math.floor(z))) {
      return false;
    }
  }
  return true;
}

function skeletonRangeBias(distanceToPlayer: number): number {
  if (distanceToPlayer < SKELETON_KEEP_DISTANCE) {
    return -WALK_SPEED * 0.42;
  }
  if (distanceToPlayer > SKELETON_KEEP_DISTANCE + 5) {
    return WALK_SPEED * 0.46;
  }
  return 0;
}

function arrowHitsPlayer(projectile: HostileProjectile, playerPosition: Vec3i): boolean {
  const horizontal = Math.hypot(projectile.position.x - playerPosition.x, projectile.position.z - playerPosition.z);
  const vertical = projectile.position.y - (playerPosition.y + 0.95);
  return horizontal <= 0.58 && vertical >= -0.9 && vertical <= 0.95;
}

function distance2d(left: Vec3i, right: Vec3i): number {
  return Math.hypot(left.x - right.x, left.z - right.z);
}

function distance3d(left: Vec3i, right: Vec3i): number {
  return Math.hypot(left.x - right.x, left.y - right.y, left.z - right.z);
}

function sameBlockishPoint(left: Vec3i, right: Vec3i): boolean {
  return Math.floor(left.x) === Math.floor(right.x) &&
    Math.floor(left.y) === Math.floor(right.y) &&
    Math.floor(left.z) === Math.floor(right.z);
}

function stableUnit(a: number, b: number, c: number): number {
  let value = Math.imul(Math.floor(a * 131) + 0x9e3779b9, 0x85ebca6b);
  value ^= Math.imul(Math.floor(b * 137) + 0xc2b2ae35, 0x27d4eb2d);
  value ^= Math.imul(Math.floor(c * 149) + 0x165667b1, 0x9e3779b1);
  value = Math.imul(value ^ (value >>> 15), 0x85ebca6b);
  return ((value ^ (value >>> 13)) >>> 0) / 0xffffffff;
}
