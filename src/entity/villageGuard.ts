import type { Vec3i } from "../core/constants.ts";
import type { VillageSite } from "../generation/overworldGenerator.ts";
import type { CollisionWorld } from "../physics/playerPhysics.ts";
import { selectGoal, type AiGoal } from "./goalSelector.ts";

export type VillageGuardGoal = "idle" | "patrol" | "attack" | "path_attack" | "knockback";

export type VillageGuard = {
  id: number;
  villageId: string;
  position: Vec3i;
  velocity: Vec3i;
  home: Vec3i;
  patrolTarget: Vec3i;
  health: number;
  ageSeconds: number;
  hurtTimeSeconds: number;
  knockbackSeconds: number;
  attackCooldownSeconds: number;
  swingSeconds: number;
  playerAngerSeconds: number;
  activeGoal: VillageGuardGoal;
  targetKind: "hostile" | "player" | null;
  targetMobId: number | null;
  path: Vec3i[];
  pathTarget: Vec3i | null;
  pathCooldownSeconds: number;
  alarmSeconds: number;
  alarmPoint: Vec3i | null;
};

export type VillageGuardHostileTarget = {
  id: number;
  position: Vec3i;
};

export type VillageGuardAttack = {
  guardId: number;
  mobId: number;
  damage: number;
  position: Vec3i;
  knockback: Vec3i;
};

export type VillageGuardStepResult = {
  attacks: VillageGuardAttack[];
  playerAttacks: VillageGuardPlayerAttack[];
  playerDamage: number;
};

export type VillageGuardDamageResult = {
  guard: VillageGuard | null;
  died: boolean;
};

export type VillageGuardPlayerAttack = {
  guardId: number;
  damage: number;
  position: Vec3i;
};

const GRAVITY = 22;
const WALK_SPEED = 1.65;
const ATTACK_SPEED = 2.55;
const TARGET_RANGE = 18;
const ATTACK_RANGE = 1.85;
const ATTACK_DAMAGE = 8;
const PLAYER_ATTACK_DAMAGE = 7;
const ATTACK_COOLDOWN_SECONDS = 1.35;
const STEP_HEIGHT = 1;
const GUARD_HEIGHT = 2.65;
const PATH_NODE_REACHED_DISTANCE = 0.24;
const PATH_SEARCH_PADDING = 7;
const PATH_MAX_NODES = 240;
const PATH_MAX_LENGTH = 30;
const PATH_RECALCULATE_SECONDS = 0.65;
const ROOF_ESCAPE_SEARCH_RADIUS = 16;
const ROOF_ESCAPE_VERTICAL_RANGE = 24;

export class VillageGuardWorld {
  guards: VillageGuard[];
  nextId: number;
  private guardedVillageIds: Set<string>;

  constructor() {
    this.guards = [];
    this.nextId = 1;
    this.guardedVillageIds = new Set();
  }

  ensureVillage(site: VillageSite, world: CollisionWorld, villagerCount: number): VillageGuard[] {
    if (villagerCount < 3 || this.guardedVillageIds.has(site.id)) {
      return [];
    }
    const position = findGuardSpawnPosition(world, site);
    if (!position) {
      return [];
    }
    this.guardedVillageIds.add(site.id);
    const guard = this.spawn({
      villageId: site.id,
      position,
      home: { x: site.centerX + 0.5, y: site.centerY, z: site.centerZ + 0.5 }
    });
    return [guard];
  }

  spawn(options: { villageId: string; position: Vec3i; home?: Vec3i }): VillageGuard {
    const guard: VillageGuard = {
      id: this.nextId,
      villageId: options.villageId,
      position: { ...options.position },
      velocity: { x: 0, y: 0, z: 0 },
      home: options.home ? { ...options.home } : { ...options.position },
      patrolTarget: options.home ? { ...options.home } : { ...options.position },
      health: 100,
      ageSeconds: 0,
      hurtTimeSeconds: 0,
      knockbackSeconds: 0,
      attackCooldownSeconds: 0.4,
      swingSeconds: 0,
      playerAngerSeconds: 0,
      activeGoal: "idle",
      targetKind: null,
      targetMobId: null,
      path: [],
      pathTarget: null,
      pathCooldownSeconds: 0,
      alarmSeconds: 0,
      alarmPoint: null
    };
    this.nextId += 1;
    this.guards.push(guard);
    this.guardedVillageIds.add(options.villageId);
    return guard;
  }

  step(
    world: CollisionWorld,
    deltaSeconds: number,
    targets: readonly VillageGuardHostileTarget[],
    options: { playerPosition?: Vec3i } = {}
  ): VillageGuardStepResult {
    const attacks: VillageGuardAttack[] = [];
    const playerAttacks: VillageGuardPlayerAttack[] = [];
    let playerDamage = 0;
    for (const guard of this.guards) {
      repairGuardStanding(world, guard);
      guard.ageSeconds += deltaSeconds;
      guard.hurtTimeSeconds = Math.max(0, guard.hurtTimeSeconds - deltaSeconds);
      guard.knockbackSeconds = Math.max(0, guard.knockbackSeconds - deltaSeconds);
      guard.playerAngerSeconds = Math.max(0, guard.playerAngerSeconds - deltaSeconds);
      guard.attackCooldownSeconds = Math.max(0, guard.attackCooldownSeconds - deltaSeconds);
      guard.swingSeconds = Math.max(0, guard.swingSeconds - deltaSeconds);
      guard.pathCooldownSeconds = Math.max(0, guard.pathCooldownSeconds - deltaSeconds);
      guard.alarmSeconds = Math.max(0, guard.alarmSeconds - deltaSeconds);
      if (guard.alarmSeconds <= 0) {
        guard.alarmPoint = null;
      }
      const target = selectTarget(guard, targets, options.playerPosition);
      guard.targetKind = target?.kind ?? null;
      guard.targetMobId = target?.kind === "hostile" ? target.id : null;
      if (guard.knockbackSeconds > 0) {
        guard.activeGoal = "knockback";
        guard.velocity.x *= Math.max(0, 1 - 3.2 * deltaSeconds);
        guard.velocity.z *= Math.max(0, 1 - 3.2 * deltaSeconds);
      } else {
        const movementTarget = target ? movementTargetForGuard(world, guard, target.position) : null;
        const intentTarget = target && movementTarget ? { ...target, position: movementTarget } : null;
        const intent = selectVillageGuardIntent({ guard, target: intentTarget });
        guard.activeGoal = intent.goal;
        if (target && movementTarget && !sameBlockishPoint(movementTarget, target.position) && intent.goal === "attack") {
          guard.activeGoal = "path_attack";
        }
        guard.velocity.x = intent.velocityX;
        guard.velocity.z = intent.velocityZ;
      }

      if (target && guard.knockbackSeconds <= 0) {
        const horizontal = distance2d(guard.position, target.position);
        const vertical = Math.abs(guard.position.y - target.position.y);
        if (horizontal <= ATTACK_RANGE && vertical <= 2.2 && guard.attackCooldownSeconds <= 0) {
          guard.attackCooldownSeconds = ATTACK_COOLDOWN_SECONDS;
          guard.swingSeconds = 0.38;
          const push = normalizedHorizontal(target.position.x - guard.position.x, target.position.z - guard.position.z);
          if (target.kind === "player") {
            playerDamage += PLAYER_ATTACK_DAMAGE;
            playerAttacks.push({
              guardId: guard.id,
              damage: PLAYER_ATTACK_DAMAGE,
              position: { ...target.position }
            });
          } else {
            attacks.push({
              guardId: guard.id,
              mobId: target.id,
              damage: ATTACK_DAMAGE,
              position: { ...target.position },
              knockback: { x: push.x * 7.2, y: 6.6, z: push.z * 7.2 }
            });
          }
        }
      }

      stepGuardPhysics(world, guard, deltaSeconds, target?.position ?? guard.patrolTarget);
      repairGuardStanding(world, guard);
    }
    return { attacks, playerAttacks, playerDamage };
  }

  damageGuard(id: number, amount: number, knockback: Vec3i, options: { angerAtPlayer?: boolean } = {}): VillageGuardDamageResult {
    const guard = this.guards.find((candidate) => candidate.id === id) ?? null;
    if (!guard) {
      return { guard: null, died: false };
    }
    guard.health = Math.max(0, guard.health - Math.max(0, amount));
    guard.hurtTimeSeconds = 0.28;
    guard.knockbackSeconds = 0.18;
    if (options.angerAtPlayer) {
      guard.playerAngerSeconds = 22;
    }
    guard.velocity.x = knockback.x;
    guard.velocity.y = Math.max(guard.velocity.y, knockback.y);
    guard.velocity.z = knockback.z;
    if (guard.health > 0) {
      return { guard, died: false };
    }
    this.guards = this.guards.filter((candidate) => candidate.id !== id);
    return { guard, died: true };
  }

  clear(): void {
    this.guards = [];
    this.nextId = 1;
    this.guardedVillageIds.clear();
  }
}

export function alertVillageGuardByBell(
  guard: VillageGuard,
  source: Vec3i,
  patrolTarget: Vec3i,
  durationSeconds = 14
): void {
  guard.alarmSeconds = Math.max(guard.alarmSeconds, Math.max(0, durationSeconds));
  guard.alarmPoint = { ...source };
  guard.patrolTarget = { ...patrolTarget };
  guard.pathCooldownSeconds = 0;
  clearPath(guard);
}

type VillageGuardContext = {
  guard: VillageGuard;
  target: VillageGuardTarget | null;
};

type VillageGuardTarget =
  | { kind: "hostile"; id: number; position: Vec3i }
  | { kind: "player"; id: 0; position: Vec3i };

type VillageGuardIntent = {
  goal: VillageGuardGoal;
  velocityX: number;
  velocityZ: number;
};

const VILLAGE_GUARD_GOALS: readonly AiGoal<VillageGuardContext, VillageGuardIntent>[] = [
  {
    id: "attack",
    priority: 0,
    canRun: ({ target }) => target !== null,
    run: ({ guard, target }) => {
      const dx = (target?.position.x ?? guard.position.x) - guard.position.x;
      const dz = (target?.position.z ?? guard.position.z) - guard.position.z;
      const distance = Math.max(0.001, Math.hypot(dx, dz));
      const speed = distance <= ATTACK_RANGE && guard.path.length === 0 ? 0 : ATTACK_SPEED;
      return {
        goal: "attack",
        velocityX: (dx / distance) * speed,
        velocityZ: (dz / distance) * speed
      };
    }
  },
  {
    id: "patrol",
    priority: 4,
    canRun: () => true,
    run: ({ guard }) => {
      if (distance2d(guard.position, guard.patrolTarget) < 0.8 || stableUnit(guard.id, Math.floor(guard.ageSeconds * 0.25), 311) < 0.02) {
        guard.patrolTarget = guard.alarmSeconds > 0 ? chooseAlarmPatrolTarget(guard) : choosePatrolTarget(guard);
        clearPath(guard);
      }
      const patrolMoveTarget = nextPathTarget(guard) ?? guard.patrolTarget;
      const dx = patrolMoveTarget.x - guard.position.x;
      const dz = patrolMoveTarget.z - guard.position.z;
      const distance = Math.max(0.001, Math.hypot(dx, dz));
      const moving = distance > 0.8 && stableUnit(guard.id, Math.floor(guard.ageSeconds * 2), 313) > 0.18;
      return {
        goal: moving ? "patrol" : "idle",
        velocityX: moving ? (dx / distance) * WALK_SPEED : 0,
        velocityZ: moving ? (dz / distance) * WALK_SPEED : 0
      };
    }
  }
];

function selectVillageGuardIntent(context: VillageGuardContext): VillageGuardIntent {
  return selectGoal(VILLAGE_GUARD_GOALS, context, { goal: "idle", velocityX: 0, velocityZ: 0 });
}

function selectTarget(
  guard: VillageGuard,
  targets: readonly VillageGuardHostileTarget[],
  playerPosition: Vec3i | undefined
): VillageGuardTarget | null {
  if (guard.playerAngerSeconds > 0 && playerPosition && distance3d(guard.position, playerPosition) <= TARGET_RANGE) {
    return { kind: "player", id: 0, position: playerPosition };
  }
  const hostile = nearestHostileTarget(guard, targets);
  return hostile ? { kind: "hostile", id: hostile.id, position: hostile.position } : null;
}

function nearestHostileTarget(guard: VillageGuard, targets: readonly VillageGuardHostileTarget[]): VillageGuardHostileTarget | null {
  let best: { target: VillageGuardHostileTarget; distance: number } | null = null;
  for (const target of targets) {
    const distance = distance3d(guard.position, target.position);
    if (distance > TARGET_RANGE || (best && distance >= best.distance)) {
      continue;
    }
    best = { target, distance };
  }
  return best?.target ?? null;
}

function movementTargetForGuard(world: CollisionWorld, guard: VillageGuard, target: Vec3i): Vec3i {
  if (guard.pathTarget && !sameBlockishPoint(guard.pathTarget, target)) {
    clearPath(guard);
  }
  if (hasLineOfSight(world, { x: guard.position.x, y: guard.position.y + 1.65, z: guard.position.z }, {
    x: target.x,
    y: target.y + 1.25,
    z: target.z
  })) {
    clearPath(guard);
    return target;
  }
  if (guard.path.length === 0 && guard.pathCooldownSeconds <= 0) {
    const path = findPath(world, guard.position, target);
    guard.pathCooldownSeconds = PATH_RECALCULATE_SECONDS;
    if (path.length > 0) {
      guard.path = path;
      guard.pathTarget = { ...target };
    }
  }
  return nextPathTarget(guard) ?? target;
}

function stepGuardPhysics(world: CollisionWorld, guard: VillageGuard, deltaSeconds: number, desiredTarget: Vec3i): void {
  guard.velocity.y -= GRAVITY * deltaSeconds;
  const nextX = guard.position.x + guard.velocity.x * deltaSeconds;
  const nextZ = guard.position.z + guard.velocity.z * deltaSeconds;
  if (canOccupy(world, nextX, guard.position.y, nextZ)) {
    guard.position.x = nextX;
    guard.position.z = nextZ;
  } else if (
    isOnGround(world, guard) &&
    canOccupy(world, nextX, guard.position.y + STEP_HEIGHT, nextZ) &&
    world.isSolidBlockLoaded(Math.floor(nextX), Math.floor(guard.position.y), Math.floor(nextZ))
  ) {
    guard.position.x = nextX;
    guard.position.y += STEP_HEIGHT;
    guard.position.z = nextZ;
    guard.velocity.y = Math.max(0, guard.velocity.y);
  } else if ((guard.activeGoal === "attack" || guard.activeGoal === "path_attack" || guard.activeGoal === "patrol") && guard.pathCooldownSeconds <= 0) {
    const path = findPath(world, guard.position, desiredTarget);
    guard.pathCooldownSeconds = PATH_RECALCULATE_SECONDS;
    if (path.length > 0) {
      guard.path = path;
      guard.pathTarget = { ...desiredTarget };
      if (guard.activeGoal === "attack") {
        guard.activeGoal = "path_attack";
      }
    } else if (guard.activeGoal === "patrol") {
      guard.patrolTarget = choosePatrolTarget(guard);
    }
  } else if (guard.activeGoal === "patrol") {
    guard.patrolTarget = choosePatrolTarget(guard);
  }
  moveGuardVertically(world, guard, deltaSeconds);
}

function canOccupy(world: CollisionWorld, x: number, y: number, z: number): boolean {
  const blockX = Math.floor(x);
  const blockZ = Math.floor(z);
  return (
    !world.isSolidBlockLoaded(blockX, Math.floor(y + 0.2), blockZ) &&
    !world.isSolidBlockLoaded(blockX, Math.floor(y + 1.4), blockZ) &&
    !world.isSolidBlockLoaded(blockX, Math.floor(y + GUARD_HEIGHT), blockZ)
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
      const g = current.g + 1 + Math.max(0, y - current.y) * 0.45;
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
    if (
      Math.abs(y - referenceY) <= STEP_HEIGHT + 1.1 &&
      !isElevatedVillageRoofSurface(world, blockX + 0.5, blockZ + 0.5, surfaceY, referenceY) &&
      canOccupy(world, blockX + 0.5, y, blockZ + 0.5)
    ) {
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

function nextPathTarget(guard: VillageGuard): Vec3i | null {
  while (guard.path.length > 0 && distance2d(guard.position, guard.path[0]) < PATH_NODE_REACHED_DISTANCE) {
    guard.path.shift();
  }
  return guard.path[0] ?? null;
}

function clearPath(guard: VillageGuard): void {
  guard.path = [];
  guard.pathTarget = null;
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

function hasLineOfSight(world: CollisionWorld, from: Vec3i, to: Vec3i): boolean {
  const distance = distance3d(from, to);
  const steps = Math.max(1, Math.ceil(distance * 2));
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

function moveGuardVertically(world: CollisionWorld, guard: VillageGuard, deltaSeconds: number): void {
  const nextY = guard.position.y + guard.velocity.y * deltaSeconds;
  const blockX = Math.floor(guard.position.x);
  const blockZ = Math.floor(guard.position.z);
  if (guard.velocity.y <= 0) {
    const currentFootY = Math.floor(guard.position.y - 0.04);
    const nextFootY = Math.floor(nextY - 0.04);
    for (let y = currentFootY; y >= nextFootY; y -= 1) {
      if (!world.isSolidBlockLoaded(blockX, y, blockZ)) {
        continue;
      }
      guard.position.y = y + 1;
      guard.velocity.y = 0;
      return;
    }
  } else {
    const currentHeadY = Math.floor(guard.position.y + GUARD_HEIGHT);
    const nextHeadY = Math.floor(nextY + GUARD_HEIGHT);
    for (let y = currentHeadY; y <= nextHeadY; y += 1) {
      if (!world.isSolidBlockLoaded(blockX, y, blockZ)) {
        continue;
      }
      guard.position.y = y - GUARD_HEIGHT - 0.01;
      guard.velocity.y = 0;
      return;
    }
  }
  guard.position.y = nextY;
}

function isOnGround(world: CollisionWorld, guard: VillageGuard): boolean {
  return world.isSolidBlockLoaded(
    Math.floor(guard.position.x),
    Math.floor(guard.position.y - 0.04),
    Math.floor(guard.position.z)
  );
}

function repairGuardStanding(world: CollisionWorld, guard: VillageGuard): void {
  const standingBlockY = Math.floor(guard.position.y) - 1;
  if (!isVillageRoofSheet(world, guard.position.x, guard.position.z, standingBlockY)) {
    return;
  }
  const rescue =
    safeStandingPointNear(world, guard.home, ROOF_ESCAPE_SEARCH_RADIUS, ROOF_ESCAPE_VERTICAL_RANGE) ??
    safeStandingPointNear(world, guard.position, ROOF_ESCAPE_SEARCH_RADIUS, ROOF_ESCAPE_VERTICAL_RANGE);
  if (!rescue) {
    return;
  }
  guard.position = { ...rescue };
  guard.velocity = { x: 0, y: 0, z: 0 };
  guard.patrolTarget = { ...rescue };
  guard.pathCooldownSeconds = 0;
  clearPath(guard);
}

function findGuardSpawnPosition(world: CollisionWorld, site: VillageSite): Vec3i | null {
  const candidates = [
    { x: site.centerX + 2.5, z: site.centerZ + 2.5 },
    { x: site.centerX - 2.5, z: site.centerZ + 2.5 },
    { x: site.centerX + 2.5, z: site.centerZ - 2.5 },
    { x: site.centerX - 2.5, z: site.centerZ - 2.5 },
    { x: site.centerX + 0.5, z: site.centerZ + 0.5 }
  ];
  for (const candidate of candidates) {
    const y = standYFor(world, candidate.x, candidate.z, site.centerY);
    if (y !== null && canOccupy(world, candidate.x, y, candidate.z)) {
      return { x: candidate.x, y, z: candidate.z };
    }
  }
  return safeStandingPointNear(world, { x: site.centerX + 0.5, y: site.centerY, z: site.centerZ + 0.5 }, ROOF_ESCAPE_SEARCH_RADIUS, ROOF_ESCAPE_VERTICAL_RANGE);
}

function standYFor(world: CollisionWorld, x: number, z: number, referenceY?: number): number | null {
  const surfaceY = world.getMotionBlockingHeightLoaded?.(Math.floor(x), Math.floor(z));
  if (surfaceY === null || surfaceY === undefined) {
    return null;
  }
  if (referenceY !== undefined && isElevatedVillageRoofSurface(world, x, z, surfaceY, referenceY)) {
    return null;
  }
  return surfaceY + 1;
}

function safeStandingPointNear(world: CollisionWorld, origin: Vec3i, maxRadius: number, maxVerticalDelta: number): Vec3i | null {
  const baseX = Math.floor(origin.x) + 0.5;
  const baseZ = Math.floor(origin.z) + 0.5;
  for (let radius = 0; radius <= maxRadius; radius += 1) {
    for (let dx = -radius; dx <= radius; dx += 1) {
      for (let dz = -radius; dz <= radius; dz += 1) {
        if (Math.max(Math.abs(dx), Math.abs(dz)) !== radius) {
          continue;
        }
        const x = baseX + dx;
        const z = baseZ + dz;
        const y = standYFor(world, x, z, origin.y);
        if (y === null || Math.abs(y - origin.y) > maxVerticalDelta || !canOccupy(world, x, y, z)) {
          continue;
        }
        return { x, y, z };
      }
    }
  }
  return null;
}

function isElevatedVillageRoofSurface(world: CollisionWorld, x: number, z: number, surfaceY: number, referenceY: number): boolean {
  const typeId = world.getBlockTypeIdLoaded?.(Math.floor(x), surfaceY, Math.floor(z));
  if (typeId !== "sand" && isVillageRoofSheet(world, x, z, surfaceY)) {
    return true;
  }
  return surfaceY >= Math.floor(referenceY) + 3 && isVillageRoofSheet(world, x, z, surfaceY);
}

function isVillageRoofSheet(world: CollisionWorld, x: number, z: number, roofY: number): boolean {
  const blockX = Math.floor(x);
  const blockZ = Math.floor(z);
  const topType = world.getBlockTypeIdLoaded?.(blockX, roofY, blockZ);
  if (!isVillageRoofBlock(topType)) {
    return false;
  }
  let matchingRoofNeighbors = 0;
  for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]] as const) {
    if (world.getBlockTypeIdLoaded?.(blockX + dx, roofY, blockZ + dz) === topType) {
      matchingRoofNeighbors += 1;
    }
  }
  return matchingRoofNeighbors >= 2;
}

function isVillageRoofBlock(typeId: string | null | undefined): boolean {
  return typeId === "cobblestone" || typeId === "planks" || typeId === "sand";
}

function choosePatrolTarget(guard: VillageGuard): Vec3i {
  const salt = Math.floor(guard.ageSeconds * 4) + guard.id * 23;
  const angle = stableUnit(guard.id, salt, 331) * Math.PI * 2;
  const radius = 4 + stableUnit(salt, guard.id, 337) * 9;
  return {
    x: guard.home.x + Math.cos(angle) * radius,
    y: guard.home.y,
    z: guard.home.z + Math.sin(angle) * radius
  };
}

function chooseAlarmPatrolTarget(guard: VillageGuard): Vec3i {
  const center = guard.alarmPoint ?? guard.home;
  const salt = Math.floor(guard.ageSeconds * 6) + guard.id * 41;
  const angle = stableUnit(guard.id, salt, 401) * Math.PI * 2;
  const radius = 2.2 + stableUnit(salt, guard.id, 409) * 4.4;
  return {
    x: center.x + Math.cos(angle) * radius,
    y: center.y,
    z: center.z + Math.sin(angle) * radius
  };
}

function normalizedHorizontal(x: number, z: number): { x: number; z: number } {
  const length = Math.hypot(x, z);
  if (length < 0.001) {
    return { x: 0, z: 0 };
  }
  return { x: x / length, z: z / length };
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
