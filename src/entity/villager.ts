import type { Vec3i } from "../core/constants.ts";
import type { CollisionWorld } from "../physics/playerPhysics.ts";
import type { VillageProfession, VillageSite, VillageWorkstation } from "../generation/overworldGenerator.ts";
import { selectGoal, type AiGoal } from "./goalSelector.ts";

export type VillagerGoal = "idle" | "wander" | "work" | "meet" | "home" | "sleep" | "avoid_threat";
export type VillagerSchedule = "morning" | "work" | "meet" | "home" | "sleep";
export type VillagerTradeLevel = 1 | 2 | 3 | 4 | 5;

export type Villager = {
  id: number;
  villageId: string;
  position: Vec3i;
  home: Vec3i;
  homeValid: boolean;
  meetingPoint: Vec3i;
  workstation: Vec3i | null;
  target: Vec3i;
  schedule: VillagerSchedule;
  ageSeconds: number;
  idleSeconds: number;
  repathCooldownSeconds: number;
  health: number;
  hurtTimeSeconds: number;
  profession: VillageProfession;
  activeGoal: VillagerGoal;
  path: Vec3i[];
  pathTarget: Vec3i | null;
  tradeUses: Record<string, number>;
  tradeXp: number;
  tradeLevel: VillagerTradeLevel;
  reputation: number;
  carriedFood: Record<string, number>;
  foodShareCooldownSeconds: number;
  foodShareFlashSeconds: number;
  gossipCooldownSeconds: number;
  restocksThisWorkday: number;
  restockCooldownSeconds: number;
  bellAlarmSeconds: number;
  bellAlarmSource: Vec3i | null;
};

export type VillagerDamageResult = {
  villager: Villager | null;
  died: boolean;
};

const WALK_SPEED = 1.35;
const PANIC_SPEED = 2.15;
const HOME_RADIUS = 14;
const TARGET_REACHED_DISTANCE = 0.8;
const THREAT_RANGE = 12;
const FOOT_RADIUS = 0.32;
const SAFE_SURFACE_SEARCH_RADIUS = 4;
const RESCUE_VERTICAL_RANGE = 5;
const ROOF_ESCAPE_SEARCH_RADIUS = 14;
const ROOF_ESCAPE_VERTICAL_RANGE = 24;
const PATH_NODE_REACHED_DISTANCE = 0.18;
const PATH_SEARCH_PADDING = 7;
const PATH_MAX_NODES = 220;
const PATH_MAX_LENGTH = 28;
const REPATH_COOLDOWN_SECONDS = 0.45;
const TRADE_RESTOCK_DISTANCE = 2.1;
const TRADE_RESTOCK_COOLDOWN_SECONDS = 8;
const TRADE_RESTOCKS_PER_WORKDAY = 2;
const VILLAGER_DAY_LENGTH_TICKS = 24000;
const VILLAGER_TRADE_LEVEL_THRESHOLDS: readonly number[] = [0, 10, 30, 70, 150];
const MIN_REPUTATION = -30;
const MAX_REPUTATION = 30;
const GOSSIP_RANGE = 5.4;
const GOSSIP_COOLDOWN_SECONDS = 7;
const GOSSIP_TRANSFER_STEP = 2;
const ROOF_INTERIOR_SCAN_DEPTH = 7;

export class VillagerWorld {
  villagers: Villager[];
  private nextId: number;
  private spawnedVillageIds: Set<string>;
  private villageHomes: Map<string, Vec3i[]>;
  private villageWorkstations: Map<string, VillageWorkstation[]>;

  constructor() {
    this.villagers = [];
    this.nextId = 1;
    this.spawnedVillageIds = new Set();
    this.villageHomes = new Map();
    this.villageWorkstations = new Map();
  }

  ensureVillage(site: VillageSite, world?: CollisionWorld): Villager[] {
    this.villageHomes.set(site.id, (site.homePositions ?? site.villagerPositions).map((position) => ({ ...position })));
    if (site.workstations) {
      this.villageWorkstations.set(site.id, site.workstations.map((workstation) => ({
        profession: workstation.profession,
        position: { ...workstation.position }
      })));
    }
    if (this.spawnedVillageIds.has(site.id)) {
      return [];
    }
    this.spawnedVillageIds.add(site.id);
    const spawned: Villager[] = [];
    const professions: Villager["profession"][] = ["farmer", "librarian", "mason"];
    for (let index = 0; index < site.villagerPositions.length; index += 1) {
      const position = site.villagerPositions[index];
      const spawnPoint = safePointFromSite(world, position, SAFE_SURFACE_SEARCH_RADIUS) ?? pointFromSite(position);
      const homePoint = safePointFromSite(world, site.homePositions?.[index] ?? position, SAFE_SURFACE_SEARCH_RADIUS) ?? pointFromSite(site.homePositions?.[index] ?? position);
      const workstationPoint = nullableSafePointFromSite(
        world,
        site.workstations?.find((workstation) => workstation.profession === professions[index % professions.length])?.position
      );
      const villager: Villager = {
        id: this.nextId,
        villageId: site.id,
        position: { ...spawnPoint },
        home: homePoint,
        homeValid: true,
        meetingPoint: safePointFromSite(world, { x: site.centerX, y: site.centerY, z: site.centerZ }, SAFE_SURFACE_SEARCH_RADIUS) ??
          pointFromSite({ x: site.centerX, y: site.centerY, z: site.centerZ }),
        workstation: workstationPoint,
        target: { ...spawnPoint },
        schedule: "morning",
        ageSeconds: 0,
        idleSeconds: 0.5 + index * 0.45,
        repathCooldownSeconds: 0,
        health: 20,
        hurtTimeSeconds: 0,
        profession: professions[index % professions.length],
        activeGoal: "idle",
        path: [],
        pathTarget: null,
        tradeUses: {},
        tradeXp: 0,
        tradeLevel: 1,
        reputation: 0,
        carriedFood: {},
        foodShareCooldownSeconds: 0,
        foodShareFlashSeconds: 0,
        gossipCooldownSeconds: 0,
        restocksThisWorkday: 0,
        restockCooldownSeconds: 0,
        bellAlarmSeconds: 0,
        bellAlarmSource: null
      };
      this.nextId += 1;
      this.villagers.push(villager);
      spawned.push(villager);
    }
    return spawned;
  }

  step(world: CollisionWorld, deltaSeconds: number, options: { night?: boolean; timeOfDay?: number; threats?: readonly Vec3i[] } = {}): void {
    for (const villager of this.villagers) {
      villager.ageSeconds += deltaSeconds;
      villager.idleSeconds = Math.max(0, villager.idleSeconds - deltaSeconds);
      villager.repathCooldownSeconds = Math.max(0, villager.repathCooldownSeconds - deltaSeconds);
      villager.restockCooldownSeconds = Math.max(0, villager.restockCooldownSeconds - deltaSeconds);
      villager.foodShareCooldownSeconds = Math.max(0, villager.foodShareCooldownSeconds - deltaSeconds);
      villager.foodShareFlashSeconds = Math.max(0, villager.foodShareFlashSeconds - deltaSeconds);
      villager.gossipCooldownSeconds = Math.max(0, villager.gossipCooldownSeconds - deltaSeconds);
      villager.hurtTimeSeconds = Math.max(0, villager.hurtTimeSeconds - deltaSeconds);
      villager.bellAlarmSeconds = Math.max(0, villager.bellAlarmSeconds - deltaSeconds);
      if (villager.bellAlarmSeconds <= 0) {
        villager.bellAlarmSource = null;
      }
      const schedule = scheduleForTime(options.timeOfDay, options.night === true);
      const scheduleChanged = schedule !== villager.schedule;
      if (scheduleChanged) {
        villager.schedule = schedule;
        if (schedule !== "work") {
          villager.restocksThisWorkday = 0;
          villager.restockCooldownSeconds = 0;
        }
        villager.idleSeconds = 0;
        clearPath(villager);
      }
      maintainWorkstationClaim(world, villager, this.villagers, this.villageWorkstations.get(villager.villageId) ?? []);
      maintainHomeClaim(world, villager, this.villagers, this.villageHomes.get(villager.villageId) ?? []);
      const distanceToTarget = Math.hypot(villager.target.x - villager.position.x, villager.target.z - villager.position.z);
      const intent = selectVillagerIntent({
        world,
        villager,
        schedule,
        scheduleChanged,
        nearestThreat: findNearestThreat(world, villager, options.threats ?? []),
        shouldPickTarget: distanceToTarget < TARGET_REACHED_DISTANCE || villager.idleSeconds <= 0
      });
      villager.activeGoal = intent.goal;
      if (intent.target) {
        if (!sameBlockishPoint(villager.target, intent.target)) {
          clearPath(villager);
        }
        villager.target = intent.target;
      }
      if (intent.idleSeconds !== null) {
        villager.idleSeconds = Math.max(villager.idleSeconds, intent.idleSeconds);
      }
      moveVillager(world, villager, deltaSeconds, intent.speed);
      maybeRestockTrades(villager);
    }
    shareGossipAtMeetings(this.villagers);
    shareFoodAtMeetings(this.villagers);
  }

  damageVillager(id: number, amount: number): VillagerDamageResult {
    const villager = this.villagers.find((candidate) => candidate.id === id) ?? null;
    if (!villager) {
      return { villager: null, died: false };
    }
    villager.health = Math.max(0, villager.health - Math.max(0, amount));
    villager.hurtTimeSeconds = 0.28;
    villager.idleSeconds = 0;
    if (villager.health > 0) {
      return { villager, died: false };
    }
    this.villagers = this.villagers.filter((candidate) => candidate.id !== id);
    return { villager, died: true };
  }

  clear(): void {
    this.villagers = [];
    this.nextId = 1;
    this.spawnedVillageIds.clear();
    this.villageHomes.clear();
    this.villageWorkstations.clear();
  }
}

export function villagerTradeUsesRemaining(villager: Villager, tradeId: string, maxUses: number): number {
  return Math.max(0, Math.max(0, maxUses) - (villager.tradeUses[tradeId] ?? 0));
}

export function canUseVillagerTrade(villager: Villager, tradeId: string, maxUses: number): boolean {
  return villagerTradeUsesRemaining(villager, tradeId, maxUses) > 0;
}

export function recordVillagerTrade(villager: Villager, tradeId: string, maxUses: number): boolean {
  if (!canUseVillagerTrade(villager, tradeId, maxUses)) {
    return false;
  }
  villager.tradeUses[tradeId] = (villager.tradeUses[tradeId] ?? 0) + 1;
  return true;
}

export function addVillagerTradeXp(villager: Villager, amount: number): VillagerTradeLevel {
  villager.tradeXp = Math.max(0, villager.tradeXp + Math.max(0, amount));
  villager.tradeLevel = villagerLevelForXp(villager.tradeXp);
  return villager.tradeLevel;
}

export function villagerLevelForXp(xp: number): VillagerTradeLevel {
  const value = Math.max(0, xp);
  if (value >= VILLAGER_TRADE_LEVEL_THRESHOLDS[4]) {
    return 5;
  }
  if (value >= VILLAGER_TRADE_LEVEL_THRESHOLDS[3]) {
    return 4;
  }
  if (value >= VILLAGER_TRADE_LEVEL_THRESHOLDS[2]) {
    return 3;
  }
  if (value >= VILLAGER_TRADE_LEVEL_THRESHOLDS[1]) {
    return 2;
  }
  return 1;
}

export function villagerXpForNextLevel(villager: Villager): number | null {
  return VILLAGER_TRADE_LEVEL_THRESHOLDS[villager.tradeLevel] ?? null;
}

export function adjustVillagerReputation(villager: Villager, amount: number): number {
  villager.reputation = clampReputation(villager.reputation + amount);
  return villager.reputation;
}

export function addVillagerFood(villager: Villager, foodId: string, count: number): number {
  const normalizedCount = Math.max(0, Math.floor(count));
  if (normalizedCount <= 0) {
    return villager.carriedFood[foodId] ?? 0;
  }
  villager.carriedFood[foodId] = (villager.carriedFood[foodId] ?? 0) + normalizedCount;
  return villager.carriedFood[foodId];
}

export function villagerFoodCount(villager: Villager, foodId: string): number {
  return villager.carriedFood[foodId] ?? 0;
}

export function alertVillagerByBell(villager: Villager, source: Vec3i, durationSeconds = 9): void {
  villager.bellAlarmSeconds = Math.max(villager.bellAlarmSeconds, Math.max(0, durationSeconds));
  villager.bellAlarmSource = { ...source };
  villager.idleSeconds = 0;
  villager.repathCooldownSeconds = 0;
  clearPath(villager);
}

export function tradePriceMultiplierForReputation(reputation: number): number {
  const value = clampReputation(reputation);
  if (value >= 0) {
    return Math.max(0.7, 1 - value * 0.012);
  }
  return Math.min(1.9, 1 + Math.abs(value) * 0.035);
}

function clampReputation(value: number): number {
  return Math.max(MIN_REPUTATION, Math.min(MAX_REPUTATION, value));
}

type VillagerIntentContext = {
  world: CollisionWorld;
  villager: Villager;
  schedule: VillagerSchedule;
  scheduleChanged: boolean;
  nearestThreat: Vec3i | null;
  shouldPickTarget: boolean;
};

type VillagerIntent = {
  goal: VillagerGoal;
  target: Vec3i | null;
  speed: number;
  idleSeconds: number | null;
};

const VILLAGER_GOALS: readonly AiGoal<VillagerIntentContext, VillagerIntent>[] = [
  {
    id: "avoid_threat",
    priority: 0,
    canRun: ({ nearestThreat }) => nearestThreat !== null,
    run: ({ world, villager, nearestThreat }) => ({
      goal: "avoid_threat",
      target: chooseFleeTarget(world, villager, nearestThreat ?? villager.position),
      speed: PANIC_SPEED,
      idleSeconds: 0.45
    })
  },
  {
    id: "bell_alarm",
    priority: 1,
    canRun: ({ villager }) => villager.bellAlarmSeconds > 0,
    run: ({ world, villager }) => ({
      goal: "home",
      target: homeTargetForVillager(world, villager),
      speed: PANIC_SPEED * 0.92,
      idleSeconds: 0.35
    })
  },
  {
    id: "sleep",
    priority: 2,
    canRun: ({ schedule }) => schedule === "sleep",
    run: ({ world, villager }) => ({
      goal: "sleep",
      target: homeTargetForVillager(world, villager),
      speed: WALK_SPEED * 1.25,
      idleSeconds: 2.8
    })
  },
  {
    id: "home",
    priority: 3,
    canRun: ({ schedule, shouldPickTarget, scheduleChanged }) => schedule === "home" && (shouldPickTarget || scheduleChanged),
    run: ({ world, villager }) => ({
      goal: "home",
      target: homeTargetForVillager(world, villager),
      speed: WALK_SPEED * 1.12,
      idleSeconds: 1.4
    })
  },
  {
    id: "work",
    priority: 4,
    canRun: ({ schedule, villager, shouldPickTarget, scheduleChanged }) => schedule === "work" && villager.workstation !== null && (shouldPickTarget || scheduleChanged),
    run: ({ world, villager }) => ({
      goal: "work",
      target: surfaceAdjustedTarget(world, villager.workstation ?? villager.home) ?? { ...villager.home },
      speed: WALK_SPEED,
      idleSeconds: 3.5 + stableUnit(villager.id, Math.floor(villager.ageSeconds * 0.1), 71) * 2.5
    })
  },
  {
    id: "meet",
    priority: 5,
    canRun: ({ schedule, shouldPickTarget, scheduleChanged }) => schedule === "meet" && (shouldPickTarget || scheduleChanged),
    run: ({ world, villager }) => ({
      goal: "meet",
      target: socialTarget(world, villager),
      speed: WALK_SPEED * 0.92,
      idleSeconds: 2.4 + stableUnit(villager.id, Math.floor(villager.ageSeconds * 0.2), 91) * 2
    })
  },
  {
    id: "day_target",
    priority: 6,
    canRun: ({ shouldPickTarget }) => shouldPickTarget,
    run: ({ world, villager }) => {
      const target = chooseDayTarget(world, villager);
      return {
        goal: target.goal,
        target: target.position,
        speed: WALK_SPEED,
        idleSeconds: 2.2 + stableUnit(villager.id, Math.floor(villager.ageSeconds * 0.2), 0) * 2.4
      };
    }
  }
];

function selectVillagerIntent(context: VillagerIntentContext): VillagerIntent {
  return selectGoal(VILLAGER_GOALS, context, {
    goal: context.villager.activeGoal === "avoid_threat" ? "idle" : context.villager.activeGoal,
    target: null,
    speed: WALK_SPEED,
    idleSeconds: null
  });
}

function scheduleForTime(timeOfDay: number | undefined, night: boolean): VillagerSchedule {
  if (timeOfDay === undefined) {
    return night ? "sleep" : "work";
  }
  const time = ((timeOfDay % VILLAGER_DAY_LENGTH_TICKS) + VILLAGER_DAY_LENGTH_TICKS) % VILLAGER_DAY_LENGTH_TICKS;
  if (time >= 12542 && time < 23000) {
    return "sleep";
  }
  if (time >= 11000 && time < 12542) {
    return "home";
  }
  if (time >= 9000 && time < 11000) {
    return "meet";
  }
  if (time >= 2000 && time < 9000) {
    return "work";
  }
  return "morning";
}

function maybeRestockTrades(villager: Villager): void {
  if (
    villager.schedule !== "work" ||
    !villager.workstation ||
    Object.keys(villager.tradeUses).length === 0 ||
    villager.restocksThisWorkday >= TRADE_RESTOCKS_PER_WORKDAY ||
    villager.restockCooldownSeconds > 0
  ) {
    return;
  }
  const distance = Math.hypot(villager.position.x - villager.workstation.x, villager.position.z - villager.workstation.z);
  if (distance > TRADE_RESTOCK_DISTANCE || Math.abs(villager.position.y - villager.workstation.y) > 2) {
    return;
  }
  villager.tradeUses = {};
  villager.restocksThisWorkday += 1;
  villager.restockCooldownSeconds = TRADE_RESTOCK_COOLDOWN_SECONDS;
}

function shareGossipAtMeetings(villagers: Villager[]): void {
  const eligible = villagers.filter((villager) =>
    villager.schedule === "meet" &&
    villager.activeGoal === "meet" &&
    villager.gossipCooldownSeconds <= 0 &&
    distance2d(villager.position, villager.meetingPoint) <= GOSSIP_RANGE
  );
  const updates = new Map<number, number>();
  const cooldownIds = new Set<number>();
  for (let leftIndex = 0; leftIndex < eligible.length; leftIndex += 1) {
    const left = eligible[leftIndex];
    for (let rightIndex = leftIndex + 1; rightIndex < eligible.length; rightIndex += 1) {
      const right = eligible[rightIndex];
      if (left.villageId !== right.villageId || distance2d(left.position, right.position) > GOSSIP_RANGE) {
        continue;
      }
      const leftReputation = updates.get(left.id) ?? left.reputation;
      const rightReputation = updates.get(right.id) ?? right.reputation;
      const difference = leftReputation - rightReputation;
      if (Math.abs(difference) < 2) {
        continue;
      }
      const transfer = Math.sign(difference) * Math.min(GOSSIP_TRANSFER_STEP, Math.floor(Math.abs(difference) / 2));
      updates.set(left.id, clampReputation(leftReputation - transfer));
      updates.set(right.id, clampReputation(rightReputation + transfer));
      cooldownIds.add(left.id);
      cooldownIds.add(right.id);
    }
  }
  for (const villager of villagers) {
    const reputation = updates.get(villager.id);
    if (reputation !== undefined) {
      villager.reputation = reputation;
    }
    if (cooldownIds.has(villager.id)) {
      villager.gossipCooldownSeconds = GOSSIP_COOLDOWN_SECONDS;
    }
  }
}

function shareFoodAtMeetings(villagers: Villager[]): void {
  const eligible = villagers.filter((villager) =>
    villager.schedule === "meet" &&
    villager.activeGoal === "meet" &&
    villager.foodShareCooldownSeconds <= 0 &&
    distance2d(villager.position, villager.meetingPoint) <= GOSSIP_RANGE
  );
  for (const donor of eligible) {
    const wheat = donor.carriedFood.wheat ?? 0;
    if (wheat < 3) {
      continue;
    }
    const receiver = eligible.find((candidate) =>
      candidate.id !== donor.id &&
      candidate.villageId === donor.villageId &&
      distance2d(candidate.position, donor.position) <= GOSSIP_RANGE &&
      (candidate.carriedFood.wheat ?? 0) + 2 < wheat
    );
    if (!receiver) {
      continue;
    }
    donor.carriedFood.wheat = wheat - 1;
    receiver.carriedFood.wheat = (receiver.carriedFood.wheat ?? 0) + 1;
    donor.foodShareCooldownSeconds = 5;
    receiver.foodShareCooldownSeconds = 4;
    donor.foodShareFlashSeconds = 0.75;
    receiver.foodShareFlashSeconds = 0.75;
  }
}

function maintainWorkstationClaim(
  world: CollisionWorld,
  villager: Villager,
  villagers: readonly Villager[],
  workstations: readonly VillageWorkstation[]
): void {
  if (!world.getBlockTypeIdLoaded || workstations.length === 0) {
    return;
  }
  if (villager.workstation && !workstationExistsNear(world, villager.profession, villager.workstation)) {
    villager.workstation = null;
    villager.restocksThisWorkday = 0;
    villager.restockCooldownSeconds = 0;
    clearPath(villager);
  }
  if (villager.workstation) {
    return;
  }
  const replacement = findAvailableWorkstation(world, villager, villagers, workstations);
  if (!replacement) {
    return;
  }
  villager.workstation =
    safePointFromSite(world, replacement.position, 2) ??
    pointFromSite(replacement.position);
  villager.idleSeconds = 0;
  clearPath(villager);
}

function maintainHomeClaim(
  world: CollisionWorld,
  villager: Villager,
  villagers: readonly Villager[],
  homeCandidates: readonly Vec3i[]
): void {
  if (!world.getBlockTypeIdLoaded || homeCandidates.length === 0) {
    return;
  }
  if (villager.homeValid && !bedExistsNear(world, villager.home)) {
    villager.homeValid = false;
    clearPath(villager);
  }
  if (villager.homeValid) {
    return;
  }
  const replacement = findAvailableHome(world, villager, villagers, homeCandidates);
  if (!replacement) {
    return;
  }
  villager.home =
    safePointFromSite(world, replacement, 2) ??
    pointFromSite(replacement);
  villager.homeValid = true;
  villager.idleSeconds = 0;
  clearPath(villager);
}

function findAvailableHome(
  world: CollisionWorld,
  villager: Villager,
  villagers: readonly Villager[],
  homeCandidates: readonly Vec3i[]
): Vec3i | null {
  let best: { home: Vec3i; distance: number } | null = null;
  for (const candidate of homeCandidates) {
    if (!bedExistsNear(world, candidate)) {
      continue;
    }
    const standingPoint = safePointFromSite(world, candidate, 2) ?? pointFromSite(candidate);
    const claimed = villagers.some((other) =>
      other.id !== villager.id &&
      other.homeValid &&
      sameBlockishPoint(other.home, standingPoint)
    );
    if (claimed) {
      continue;
    }
    const distance = distance2d(villager.position, standingPoint);
    if (!best || distance < best.distance) {
      best = { home: candidate, distance };
    }
  }
  return best?.home ?? null;
}

function findAvailableWorkstation(
  world: CollisionWorld,
  villager: Villager,
  villagers: readonly Villager[],
  workstations: readonly VillageWorkstation[]
): VillageWorkstation | null {
  let best: { workstation: VillageWorkstation; distance: number } | null = null;
  for (const workstation of workstations) {
    if (workstation.profession !== villager.profession || !workstationExistsNear(world, villager.profession, workstation.position)) {
      continue;
    }
    const standingPoint = safePointFromSite(world, workstation.position, 2) ?? pointFromSite(workstation.position);
    const claimed = villagers.some((candidate) =>
      candidate.id !== villager.id &&
      candidate.workstation !== null &&
      sameBlockishPoint(candidate.workstation, standingPoint)
    );
    if (claimed) {
      continue;
    }
    const distance = distance2d(villager.position, standingPoint);
    if (!best || distance < best.distance) {
      best = { workstation, distance };
    }
  }
  return best?.workstation ?? null;
}

function workstationExistsNear(world: CollisionWorld, profession: VillageProfession, position: Vec3i): boolean {
  const expectedType = workstationTypeForProfession(profession);
  for (let dy = -1; dy <= 1; dy += 1) {
    for (let dz = -1; dz <= 1; dz += 1) {
      for (let dx = -1; dx <= 1; dx += 1) {
        const typeId = world.getBlockTypeIdLoaded?.(
          Math.floor(position.x) + dx,
          Math.floor(position.y) + dy,
          Math.floor(position.z) + dz
        );
        if (typeId === expectedType) {
          return true;
        }
      }
    }
  }
  return false;
}

function bedExistsNear(world: CollisionWorld, position: Vec3i): boolean {
  for (let dy = -1; dy <= 1; dy += 1) {
    for (let dz = -2; dz <= 2; dz += 1) {
      for (let dx = -2; dx <= 2; dx += 1) {
        const typeId = world.getBlockTypeIdLoaded?.(
          Math.floor(position.x) + dx,
          Math.floor(position.y) + dy,
          Math.floor(position.z) + dz
        );
        if (typeId === "bed") {
          return true;
        }
      }
    }
  }
  return false;
}

function workstationTypeForProfession(profession: VillageProfession): "composter" | "lectern" | "stonecutter" {
  switch (profession) {
    case "farmer":
      return "composter";
    case "librarian":
      return "lectern";
    case "mason":
      return "stonecutter";
  }
}

function pointFromSite(point: Vec3i): Vec3i {
  return { x: point.x + 0.5, y: point.y, z: point.z + 0.5 };
}

function safePointFromSite(world: CollisionWorld | undefined, point: Vec3i, searchRadius: number): Vec3i | null {
  const base = pointFromSite(point);
  if (!world) {
    return base;
  }
  const direct = directStandingPoint(world, base);
  if (direct) {
    return direct;
  }
  return safeStandingPointNear(world, base, searchRadius, RESCUE_VERTICAL_RANGE);
}

function nullableSafePointFromSite(world: CollisionWorld | undefined, point: Vec3i | null | undefined): Vec3i | null {
  if (!point) {
    return null;
  }
  return safePointFromSite(world, point, SAFE_SURFACE_SEARCH_RADIUS) ?? pointFromSite(point);
}

function chooseDayTarget(world: CollisionWorld, villager: Villager): { goal: "work" | "wander"; position: Vec3i } {
  const salt = Math.floor(villager.ageSeconds * 0.13) + villager.id * 23;
  if (villager.workstation && stableUnit(villager.id, salt, 41) < 0.45) {
    const workstationTarget = surfaceAdjustedTarget(world, villager.workstation);
    if (workstationTarget && Math.abs(workstationTarget.y - villager.home.y) <= 3) {
      return { goal: "work", position: workstationTarget };
    }
  }
  return { goal: "wander", position: chooseWanderTarget(world, villager) };
}

function homeTargetForVillager(world: CollisionWorld, villager: Villager): Vec3i {
  const target = villager.homeValid ? villager.home : villager.meetingPoint;
  return surfaceAdjustedTarget(world, target) ?? { ...target };
}

function socialTarget(world: CollisionWorld, villager: Villager): Vec3i {
  const salt = Math.floor(villager.ageSeconds * 0.15) + villager.id * 13;
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const angle = stableUnit(villager.id, salt, attempt + 401) * Math.PI * 2;
    const radius = 1.4 + stableUnit(salt, villager.id, attempt + 409) * 4.2;
    const x = villager.meetingPoint.x + Math.cos(angle) * radius;
    const z = villager.meetingPoint.z + Math.sin(angle) * radius;
    const y = standYFor(world, x, z);
    if (y !== null && Math.abs(y - villager.meetingPoint.y) <= 3 && canStandAt(world, x, y, z)) {
      return { x, y, z };
    }
  }
  return surfaceAdjustedTarget(world, villager.meetingPoint) ?? { ...villager.meetingPoint };
}

function chooseWanderTarget(world: CollisionWorld, villager: Villager): Vec3i {
  const salt = Math.floor(villager.ageSeconds * 10) + villager.id * 17;
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const angle = stableUnit(villager.id, salt, attempt) * Math.PI * 2;
    const radius = 3 + stableUnit(salt, villager.id, attempt + 11) * HOME_RADIUS;
    const x = villager.home.x + Math.cos(angle) * radius;
    const z = villager.home.z + Math.sin(angle) * radius;
    const y = standYFor(world, x, z);
    if (y === null) {
      continue;
    }
    if (Math.abs(y - villager.home.y) > 3) {
      continue;
    }
    if (canStandAt(world, x, y, z)) {
      return { x, y, z };
    }
  }
  return { ...villager.home };
}

function surfaceAdjustedTarget(world: CollisionWorld, target: Vec3i): Vec3i | null {
  const y = standYFor(world, target.x, target.z);
  if (y === null || !canStandAt(world, target.x, y, target.z)) {
    return null;
  }
  return { x: target.x, y, z: target.z };
}

function chooseFleeTarget(world: CollisionWorld, villager: Villager, threat: Vec3i): Vec3i {
  const dx = villager.position.x - threat.x;
  const dz = villager.position.z - threat.z;
  const baseAngle = Math.hypot(dx, dz) > 0.001
    ? Math.atan2(dz, dx)
    : stableUnit(villager.id, Math.floor(villager.ageSeconds * 10), 199) * Math.PI * 2;
  const salt = Math.floor(villager.ageSeconds * 10) + villager.id * 37;
  for (let attempt = 0; attempt < 9; attempt += 1) {
    const spread = (attempt - 4) * 0.38;
    const angle = baseAngle + spread;
    const radius = 6 + stableUnit(villager.id, salt, attempt + 211) * 5;
    const x = villager.position.x + Math.cos(angle) * radius;
    const z = villager.position.z + Math.sin(angle) * radius;
    const y = standYFor(world, x, z);
    if (y === null || Math.abs(y - villager.position.y) > 2) {
      continue;
    }
    if (canStandAt(world, x, y, z)) {
      return { x, y, z };
    }
  }
  return surfaceAdjustedTarget(world, villager.home) ?? { ...villager.home };
}

function moveVillager(world: CollisionWorld, villager: Villager, deltaSeconds: number, speed: number): void {
  repairVillagerStanding(world, villager);
  refreshPathTarget(villager);
  const moveTarget = nextPathTarget(villager);
  const dx = moveTarget.x - villager.position.x;
  const dz = moveTarget.z - villager.position.z;
  const distance = Math.hypot(dx, dz);
  if (distance < 0.05) {
    if (villager.path.length > 0) {
      villager.path.shift();
    }
    snapVillagerToSurface(world, villager);
    return;
  }
  const step = Math.min(distance, speed * deltaSeconds);
  const nextX = villager.position.x + (dx / distance) * step;
  const nextZ = villager.position.z + (dz / distance) * step;
  const nextY = standYFor(world, nextX, nextZ);
  if (nextY !== null && Math.abs(nextY - villager.position.y) <= 1.1 && canStandAt(world, nextX, nextY, nextZ)) {
    villager.position.x = nextX;
    villager.position.y = nextY;
    villager.position.z = nextZ;
  } else {
    const path = villager.repathCooldownSeconds <= 0 ? findPath(world, villager.position, villager.target) : [];
    villager.repathCooldownSeconds = REPATH_COOLDOWN_SECONDS;
    if (path.length > 0) {
      villager.path = path;
      villager.pathTarget = { ...villager.target };
    } else {
      villager.target = surfaceAdjustedTarget(world, villager.home) ?? { ...villager.home };
      clearPath(villager);
    }
  }
  snapVillagerToSurface(world, villager);
}

function findNearestThreat(world: CollisionWorld, villager: Villager, threats: readonly Vec3i[]): Vec3i | null {
  let best: { position: Vec3i; distance: number } | null = null;
  for (const threat of threats) {
    const distance = Math.hypot(threat.x - villager.position.x, threat.y - villager.position.y, threat.z - villager.position.z);
    if (distance > THREAT_RANGE || (best && distance >= best.distance)) {
      continue;
    }
    if (!hasLineOfSight(world, { x: villager.position.x, y: villager.position.y + 1.5, z: villager.position.z }, {
      x: threat.x,
      y: threat.y + 1.4,
      z: threat.z
    })) {
      continue;
    }
    best = { position: threat, distance };
  }
  return best?.position ?? null;
}

function hasLineOfSight(world: CollisionWorld, from: Vec3i, to: Vec3i): boolean {
  const distance = Math.hypot(from.x - to.x, from.y - to.y, from.z - to.z);
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

function snapVillagerToSurface(world: CollisionWorld, villager: Villager): void {
  const y = standYFor(world, villager.position.x, villager.position.z);
  if (y !== null && Math.abs(y - villager.position.y) <= 1.6 && canStandAt(world, villager.position.x, y, villager.position.z)) {
    villager.position.y = y;
    return;
  }
  repairVillagerStanding(world, villager);
}

function repairVillagerStanding(world: CollisionWorld, villager: Villager): void {
  const roofEscape = roofEscapePoint(world, villager);
  if (roofEscape) {
    moveVillagerToRepairPoint(villager, roofEscape);
    return;
  }

  const currentY = standYFor(world, villager.position.x, villager.position.z);
  if (
    currentY !== null &&
    Math.abs(currentY - villager.position.y) <= RESCUE_VERTICAL_RANGE &&
    canStandAt(world, villager.position.x, currentY, villager.position.z)
  ) {
    villager.position.y = currentY;
    return;
  }

  const rescue =
    safeStandingPointNear(world, villager.position, SAFE_SURFACE_SEARCH_RADIUS, RESCUE_VERTICAL_RANGE) ??
    safeStandingPointNear(world, villager.home, SAFE_SURFACE_SEARCH_RADIUS, RESCUE_VERTICAL_RANGE * 2);
  if (!rescue) {
    return;
  }
  moveVillagerToRepairPoint(villager, rescue);
}

function roofEscapePoint(world: CollisionWorld, villager: Villager): Vec3i | null {
  const standingBlockY = Math.floor(villager.position.y) - 1;
  if (
    !isVillageRoofSurface(world, villager.position.x, villager.position.z, standingBlockY) &&
    !isElevatedVillageRoofSheet(world, villager.position.x, villager.position.z, standingBlockY, villager.home.y)
  ) {
    return null;
  }
  return (
    directStandingPoint(world, villager.home) ??
    safeStandingPointNear(world, villager.home, ROOF_ESCAPE_SEARCH_RADIUS, ROOF_ESCAPE_VERTICAL_RANGE) ??
    safeStandingPointNear(world, villager.meetingPoint, ROOF_ESCAPE_SEARCH_RADIUS, ROOF_ESCAPE_VERTICAL_RANGE) ??
    safeStandingPointNear(world, villager.position, ROOF_ESCAPE_SEARCH_RADIUS, ROOF_ESCAPE_VERTICAL_RANGE)
  );
}

function moveVillagerToRepairPoint(villager: Villager, point: Vec3i): void {
  villager.position = { ...point };
  villager.target = { ...point };
  villager.idleSeconds = 0;
  villager.repathCooldownSeconds = 0;
  clearPath(villager);
}

function standYFor(world: CollisionWorld, x: number, z: number): number | null {
  const heights: number[] = [];
  for (const sample of footprintSamples(x, z)) {
    const height = world.getMotionBlockingHeightLoaded?.(Math.floor(sample.x), Math.floor(sample.z));
    if (height === null || height === undefined) {
      return null;
    }
    heights.push(height);
  }
  const min = Math.min(...heights);
  const max = Math.max(...heights);
  if (max - min > 1) {
    return null;
  }
  const centerHeight = world.getMotionBlockingHeightLoaded?.(Math.floor(x), Math.floor(z));
  if (centerHeight === null || centerHeight === undefined) {
    return null;
  }
  const interiorY = interiorStandingYBelowRoof(world, x, z, max);
  if (interiorY !== null) {
    return interiorY;
  }
  if (isVillageRoofSurface(world, x, z, max)) {
    return null;
  }
  if (isNarrowPit(world, Math.floor(x), Math.floor(z), centerHeight)) {
    return null;
  }
  return max + 1;
}

function interiorStandingYBelowRoof(world: CollisionWorld, x: number, z: number, roofY: number): number | null {
  const topType = world.getBlockTypeIdLoaded?.(Math.floor(x), roofY, Math.floor(z));
  if (!isVillageRoofBlock(topType)) {
    return null;
  }
  for (let y = roofY - 1; y >= roofY - ROOF_INTERIOR_SCAN_DEPTH; y -= 1) {
    if (
      canStandAt(world, x, y, z) &&
      hasFootingAt(world, x, y, z) &&
      hasShelterAbove(world, x, y, z, roofY) &&
      !isHorizontallyTrappedAt(world, Math.floor(x), y, Math.floor(z))
    ) {
      return y;
    }
  }
  return null;
}

function isVillageRoofSurface(world: CollisionWorld, x: number, z: number, roofY: number): boolean {
  if (!isVillageRoofSheet(world, x, z, roofY)) {
    return false;
  }
  const blockX = Math.floor(x);
  const blockZ = Math.floor(z);
  let airBelow = 0;
  for (let y = roofY - 1; y >= roofY - 2; y -= 1) {
    if (!world.isSolidBlockLoaded(blockX, y, blockZ)) {
      airBelow += 1;
    }
  }
  return airBelow > 0;
}

function isElevatedVillageRoofSheet(world: CollisionWorld, x: number, z: number, roofY: number, expectedFloorY: number): boolean {
  return roofY >= Math.floor(expectedFloorY) + 3 && isVillageRoofSheet(world, x, z, roofY);
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

function canStandAt(world: CollisionWorld, x: number, y: number, z: number): boolean {
  const blockY = Math.floor(y);
  for (const sample of footprintSamples(x, z)) {
    const blockX = Math.floor(sample.x);
    const blockZ = Math.floor(sample.z);
    if (world.isSolidBlockLoaded(blockX, blockY, blockZ) || world.isSolidBlockLoaded(blockX, blockY + 1, blockZ)) {
      return false;
    }
  }
  return true;
}

function directStandingPoint(world: CollisionWorld, point: Vec3i): Vec3i | null {
  const y = Math.floor(point.y);
  if (!canStandAt(world, point.x, y, point.z)) {
    return null;
  }
  if (!hasFootingAt(world, point.x, y, point.z)) {
    return null;
  }
  if (isVillageRoofSurface(world, point.x, point.z, y - 1)) {
    return null;
  }
  if (isHorizontallyTrappedAt(world, Math.floor(point.x), y, Math.floor(point.z))) {
    return null;
  }
  return { x: point.x, y, z: point.z };
}

function hasFootingAt(world: CollisionWorld, x: number, y: number, z: number): boolean {
  for (const sample of footprintSamples(x, z)) {
    if (!world.isSolidBlockLoaded(Math.floor(sample.x), y - 1, Math.floor(sample.z))) {
      return false;
    }
  }
  return true;
}

function hasShelterAbove(world: CollisionWorld, x: number, y: number, z: number, roofY: number): boolean {
  const blockX = Math.floor(x);
  const blockZ = Math.floor(z);
  for (let checkY = Math.floor(y) + 2; checkY <= roofY; checkY += 1) {
    if (world.isSolidBlockLoaded(blockX, checkY, blockZ)) {
      return true;
    }
  }
  return false;
}

function isHorizontallyTrappedAt(world: CollisionWorld, blockX: number, blockY: number, blockZ: number): boolean {
  let blockedSides = 0;
  for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]] as const) {
    if (
      world.isSolidBlockLoaded(blockX + dx, blockY, blockZ + dz) ||
      world.isSolidBlockLoaded(blockX + dx, blockY + 1, blockZ + dz)
    ) {
      blockedSides += 1;
    }
  }
  return blockedSides >= 3;
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
        const y = standYFor(world, x, z);
        if (y === null || Math.abs(y - origin.y) > maxVerticalDelta || !canStandAt(world, x, y, z)) {
          continue;
        }
        return { x, y, z };
      }
    }
  }
  return null;
}

type PathNode = {
  x: number;
  z: number;
  y: number;
  g: number;
  f: number;
  parent: PathNode | null;
};

function findPath(world: CollisionWorld, start: Vec3i, goal: Vec3i): Vec3i[] {
  const startPoint = safeStandingPointNear(world, start, 1, RESCUE_VERTICAL_RANGE);
  const goalPoint = safeStandingPointNear(world, goal, 2, RESCUE_VERTICAL_RANGE * 2);
  if (!startPoint || !goalPoint) {
    return [];
  }

  const startX = Math.floor(startPoint.x);
  const startZ = Math.floor(startPoint.z);
  const goalX = Math.floor(goalPoint.x);
  const goalZ = Math.floor(goalPoint.z);
  if (startX === goalX && startZ === goalZ) {
    return [];
  }

  const minX = Math.min(startX, goalX) - PATH_SEARCH_PADDING;
  const maxX = Math.max(startX, goalX) + PATH_SEARCH_PADDING;
  const minZ = Math.min(startZ, goalZ) - PATH_SEARCH_PADDING;
  const maxZ = Math.max(startZ, goalZ) + PATH_SEARCH_PADDING;
  const open: PathNode[] = [{
    x: startX,
    z: startZ,
    y: startPoint.y,
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
      return reconstructPath(current, goalPoint);
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
      const standY = standYFor(world, x + 0.5, z + 0.5);
      if (
        standY === null ||
        Math.abs(standY - current.y) > 1.1 ||
        Math.abs(standY - startPoint.y) > RESCUE_VERTICAL_RANGE ||
        !canStandAt(world, x + 0.5, standY, z + 0.5)
      ) {
        continue;
      }
      const stepCost = 1 + Math.max(0, standY - current.y) * 0.35;
      const g = current.g + stepCost;
      const previousG = bestG.get(key);
      if (previousG !== undefined && previousG <= g) {
        continue;
      }
      bestG.set(key, g);
      open.push({
        x,
        z,
        y: standY,
        g,
        f: g + manhattan(x, z, goalX, goalZ),
        parent: current
      });
    }
  }

  return [];
}

const PATH_NEIGHBORS: readonly [number, number][] = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1]
];

function refreshPathTarget(villager: Villager): void {
  if (villager.pathTarget && !sameBlockishPoint(villager.pathTarget, villager.target)) {
    clearPath(villager);
  }
}

function nextPathTarget(villager: Villager): Vec3i {
  while (villager.path.length > 0 && distance2d(villager.position, villager.path[0]) < PATH_NODE_REACHED_DISTANCE) {
    villager.path.shift();
  }
  return villager.path[0] ?? villager.target;
}

function clearPath(villager: Villager): void {
  villager.path = [];
  villager.pathTarget = null;
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

function distance2d(a: Vec3i, b: Vec3i): number {
  return Math.hypot(a.x - b.x, a.z - b.z);
}

function sameBlockishPoint(a: Vec3i | null, b: Vec3i | null): boolean {
  if (!a || !b) {
    return a === b;
  }
  return Math.floor(a.x) === Math.floor(b.x) && Math.floor(a.y) === Math.floor(b.y) && Math.floor(a.z) === Math.floor(b.z);
}

function isNarrowPit(world: CollisionWorld, blockX: number, blockZ: number, centerHeight: number): boolean {
  const north = loadedHeight(world, blockX, blockZ - 1);
  const south = loadedHeight(world, blockX, blockZ + 1);
  const west = loadedHeight(world, blockX - 1, blockZ);
  const east = loadedHeight(world, blockX + 1, blockZ);
  const higherNorth = north !== null && north > centerHeight;
  const higherSouth = south !== null && south > centerHeight;
  const higherWest = west !== null && west > centerHeight;
  const higherEast = east !== null && east > centerHeight;
  const higherCount = Number(higherNorth) + Number(higherSouth) + Number(higherWest) + Number(higherEast);
  return higherCount >= 3 || (higherNorth && higherSouth) || (higherWest && higherEast);
}

function loadedHeight(world: CollisionWorld, x: number, z: number): number | null {
  const height = world.getMotionBlockingHeightLoaded?.(x, z);
  return height === null || height === undefined ? null : height;
}

function footprintSamples(x: number, z: number): Vec3i[] {
  return [
    { x: x - FOOT_RADIUS, y: 0, z: z - FOOT_RADIUS },
    { x: x + FOOT_RADIUS, y: 0, z: z - FOOT_RADIUS },
    { x: x - FOOT_RADIUS, y: 0, z: z + FOOT_RADIUS },
    { x: x + FOOT_RADIUS, y: 0, z: z + FOOT_RADIUS }
  ];
}

function stableUnit(a: number, b: number, c: number): number {
  let value = Math.imul(a + 0x9e3779b9, 0x85ebca6b);
  value ^= Math.imul(b + 0xc2b2ae35, 0x27d4eb2d);
  value ^= Math.imul(c + 0x165667b1, 0x9e3779b1);
  value = Math.imul(value ^ (value >>> 15), 0x85ebca6b);
  return ((value ^ (value >>> 13)) >>> 0) / 0xffffffff;
}
