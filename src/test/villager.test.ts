import assert from "node:assert/strict";
import test from "node:test";
import {
  addVillagerFood,
  addVillagerTradeXp,
  adjustVillagerReputation,
  alertVillagerByBell,
  canUseVillagerTrade,
  recordVillagerTrade,
  tradePriceMultiplierForReputation,
  VillagerWorld,
  villagerFoodCount,
  villagerLevelForXp,
  villagerTradeUsesRemaining
} from "../entity/villager.ts";

test("VillagerWorld spawns each village only once", () => {
  const villagers = new VillagerWorld();
  const site = {
    id: "0,0",
    centerX: 8,
    centerZ: 8,
    centerY: 65,
    biomeId: "plains" as const,
    villagerPositions: [
      { x: 7, y: 65, z: 8 },
      { x: 9, y: 65, z: 8 },
      { x: 8, y: 65, z: 10 }
    ]
  };

  assert.equal(villagers.ensureVillage(site).length, 3);
  assert.equal(villagers.ensureVillage(site).length, 0);
  assert.equal(villagers.villagers.length, 3);
});

test("VillagerWorld keeps villagers near loaded village surfaces", () => {
  const villagers = new VillagerWorld();
  villagers.ensureVillage({
    id: "flat",
    centerX: 8,
    centerZ: 8,
    centerY: 65,
    biomeId: "plains",
    villagerPositions: [{ x: 8, y: 65, z: 8 }]
  });
  const world = {
    isSolidBlockLoaded: (_x: number, y: number, _z: number) => y === 64,
    getMotionBlockingHeightLoaded: () => 64
  };

  villagers.step(world, 1);

  assert.equal(villagers.villagers[0].position.y, 65);
  assert.ok(Math.hypot(
    villagers.villagers[0].position.x - villagers.villagers[0].home.x,
    villagers.villagers[0].position.z - villagers.villagers[0].home.z
  ) <= 14);
});

test("VillagerWorld avoids stepping into blocked footprint corners", () => {
  const villagers = new VillagerWorld();
  villagers.ensureVillage({
    id: "corner",
    centerX: 8,
    centerZ: 8,
    centerY: 65,
    biomeId: "plains",
    villagerPositions: [{ x: 8, y: 65, z: 8 }]
  });
  villagers.villagers[0].target = { x: 9.2, y: 65, z: 8.5 };
  const world = {
    isSolidBlockLoaded: (x: number, y: number, z: number) => y === 64 || (x === 9 && y === 65 && z === 8),
    getMotionBlockingHeightLoaded: () => 64
  };

  villagers.step(world, 1);

  assert.ok(villagers.villagers[0].position.x < 8.9);
});

test("VillagerWorld spawns villagers on nearby safe ground instead of a pit", () => {
  const villagers = new VillagerWorld();
  const world = createPitWorld(8, 8);

  villagers.ensureVillage({
    id: "pit-spawn",
    centerX: 8,
    centerZ: 8,
    centerY: 64,
    biomeId: "plains",
    villagerPositions: [{ x: 8, y: 64, z: 8 }]
  }, world);

  assert.equal(villagers.villagers[0].position.y, 65);
});

test("VillagerWorld prefers valid indoor floor points below village roofs", () => {
  const villagers = new VillagerWorld();
  const world = createRoofedRoomWorld(8, 8, 65, 69);

  villagers.ensureVillage({
    id: "roofed-room",
    centerX: 8,
    centerZ: 8,
    centerY: 65,
    biomeId: "plains",
    villagerPositions: [{ x: 8, y: 65, z: 8 }],
    homePositions: [{ x: 8, y: 65, z: 8 }],
    workstations: [{ profession: "farmer", position: { x: 8, y: 65, z: 8 } }]
  }, world);

  assert.equal(villagers.villagers[0].position.y, 65);
  assert.equal(villagers.villagers[0].home.y, 65);
  assert.equal(villagers.villagers[0].workstation?.y, 65);
});

test("VillagerWorld rescues villagers already standing on village roofs", () => {
  const villagers = new VillagerWorld();
  const world = createRoofedRoomWorld(8, 8, 65, 69);

  villagers.ensureVillage({
    id: "roof-rescue",
    centerX: 8,
    centerZ: 8,
    centerY: 65,
    biomeId: "plains",
    villagerPositions: [{ x: 8, y: 65, z: 8 }],
    homePositions: [{ x: 8, y: 65, z: 8 }],
    workstations: [{ profession: "farmer", position: { x: 8, y: 65, z: 8 } }]
  }, world);

  const villager = villagers.villagers[0];
  villager.position = { x: 8.5, y: 70, z: 8.5 };
  villager.target = { ...villager.position };
  villagers.step(world, 0.1, { timeOfDay: 3000 });

  assert.equal(villager.position.y, 65);
});

test("VillagerWorld does not accept flat village roofs as spawn or rescue surfaces", () => {
  const villagers = new VillagerWorld();
  const world = createRoofDeckWorld(8, 8, 69);

  villagers.ensureVillage({
    id: "roof-deck",
    centerX: 8,
    centerZ: 8,
    centerY: 70,
    biomeId: "plains",
    villagerPositions: [{ x: 8, y: 70, z: 8 }],
    homePositions: [{ x: 12, y: 65, z: 8 }]
  }, world);

  assert.equal(villagers.villagers[0].position.y, 65);
});

test("VillagerWorld evacuates villagers from broad village roofs", () => {
  const villagers = new VillagerWorld();
  const world = createRoofDeckWorld(8, 8, 69, 5);

  villagers.ensureVillage({
    id: "wide-roof-escape",
    centerX: 8,
    centerZ: 8,
    centerY: 70,
    biomeId: "plains",
    villagerPositions: [{ x: 14, y: 65, z: 8 }],
    homePositions: [{ x: 14, y: 65, z: 8 }]
  }, world);

  const villager = villagers.villagers[0];
  villager.position = { x: 8.5, y: 70, z: 8.5 };
  villager.target = { ...villager.position };

  villagers.step(world, 0.1, { timeOfDay: 3000 });

  assert.equal(villager.position.y, 65);
  assert.equal(Math.floor(villager.position.x), 14);
});

test("VillagerWorld evacuates villagers from supported roof edges", () => {
  const villagers = new VillagerWorld();
  const world = createSupportedRoofWorld(8, 8, 65, 69);

  villagers.ensureVillage({
    id: "supported-roof-edge-escape",
    centerX: 8,
    centerZ: 8,
    centerY: 65,
    biomeId: "plains",
    villagerPositions: [{ x: 14, y: 65, z: 8 }],
    homePositions: [{ x: 14, y: 65, z: 8 }]
  }, world);

  const villager = villagers.villagers[0];
  villager.position = { x: 6.5, y: 70, z: 8.5 };
  villager.target = { ...villager.position };

  villagers.step(world, 0.1, { timeOfDay: 3000 });

  assert.equal(villager.position.y, 65);
  assert.equal(Math.floor(villager.position.x), 14);
});

test("VillagerWorld rescues villagers that slip into narrow holes", () => {
  const villagers = new VillagerWorld();
  villagers.ensureVillage({
    id: "pit-rescue",
    centerX: 8,
    centerZ: 8,
    centerY: 65,
    biomeId: "plains",
    villagerPositions: [{ x: 8, y: 65, z: 8 }],
    homePositions: [{ x: 9, y: 65, z: 8 }]
  });
  const villager = villagers.villagers[0];
  villager.position = { x: 8.5, y: 64, z: 8.5 };
  villager.target = { x: 8.5, y: 64, z: 8.5 };

  villagers.step(createPitWorld(8, 8), 0.1);

  assert.equal(villager.position.y, 65);
  assert.notDeepEqual([Math.floor(villager.position.x), Math.floor(villager.position.z)], [8, 8]);
});

test("VillagerWorld routes around village obstacles instead of giving up", () => {
  const villagers = new VillagerWorld();
  villagers.ensureVillage({
    id: "path",
    centerX: 8,
    centerZ: 8,
    centerY: 65,
    biomeId: "plains",
    villagerPositions: [{ x: 8, y: 65, z: 8 }],
    homePositions: [{ x: 11, y: 65, z: 8 }]
  });
  const villager = villagers.villagers[0];
  villager.idleSeconds = 20;
  villager.target = { x: 11.5, y: 65, z: 8.5 };

  const world = {
    isSolidBlockLoaded: (x: number, y: number, z: number) => y === 64 || (x === 9 && y >= 65 && y <= 66 && z === 8),
    getMotionBlockingHeightLoaded: (_x: number, _z: number) => 64
  };

  let routedAroundObstacle = false;
  for (let index = 0; index < 90; index += 1) {
    villagers.step(world, 0.1);
    villager.idleSeconds = 20;
    if (villager.position.x > 10.5 && Math.abs(villager.position.z - 8.5) < 1.2) {
      routedAroundObstacle = true;
      break;
    }
  }

  assert.equal(routedAroundObstacle, true);
});

test("VillagerWorld follows work, meet, home, and sleep schedules", () => {
  const villagers = new VillagerWorld();
  villagers.ensureVillage({
    id: "schedule",
    centerX: 8,
    centerZ: 8,
    centerY: 65,
    biomeId: "plains",
    villagerPositions: [{ x: 8, y: 65, z: 8 }],
    homePositions: [{ x: 8, y: 65, z: 8 }],
    workstations: [{ profession: "farmer", position: { x: 14, y: 65, z: 8 } }]
  });
  const villager = villagers.villagers[0];
  const world = createFlatWorld();

  villagers.step(world, 0.1, { timeOfDay: 3000 });
  assert.equal(villager.schedule, "work");
  assert.equal(villager.activeGoal, "work");
  assert.ok(villager.target.x > 13);

  villagers.step(world, 0.1, { timeOfDay: 9500 });
  assert.equal(villager.schedule, "meet");
  assert.equal(villager.activeGoal, "meet");
  assert.ok(Math.hypot(villager.target.x - villager.meetingPoint.x, villager.target.z - villager.meetingPoint.z) <= 6);

  villager.position = { x: 12.5, y: 65, z: 8.5 };
  villagers.step(world, 0.1, { timeOfDay: 11500 });
  assert.equal(villager.schedule, "home");
  assert.equal(villager.activeGoal, "home");
  assert.ok(villager.target.x < 9);

  villagers.step(world, 0.1, { timeOfDay: 18000 });
  assert.equal(villager.schedule, "sleep");
  assert.equal(villager.activeGoal, "sleep");
  assert.ok(villager.target.x < 9);
});

test("VillagerWorld clears a workstation when its job block is missing", () => {
  const villagers = new VillagerWorld();
  villagers.ensureVillage({
    id: "lost-job-site",
    centerX: 8,
    centerZ: 8,
    centerY: 65,
    biomeId: "plains",
    villagerPositions: [{ x: 8, y: 65, z: 8 }],
    homePositions: [{ x: 8, y: 65, z: 8 }],
    workstations: [{ profession: "farmer", position: { x: 14, y: 65, z: 8 } }]
  });
  const villager = villagers.villagers[0];

  villagers.step(createProfessionWorld(new Map()), 0.1, { timeOfDay: 3000 });

  assert.equal(villager.workstation, null);
  assert.equal(villager.activeGoal === "work", false);
});

test("VillagerWorld reassigns villagers to an available matching workstation", () => {
  const villagers = new VillagerWorld();
  villagers.ensureVillage({
    id: "new-job-site",
    centerX: 8,
    centerZ: 8,
    centerY: 65,
    biomeId: "plains",
    villagerPositions: [{ x: 8, y: 65, z: 8 }],
    homePositions: [{ x: 8, y: 65, z: 8 }],
    workstations: [
      { profession: "farmer", position: { x: 14, y: 65, z: 8 } },
      { profession: "farmer", position: { x: 16, y: 65, z: 8 } }
    ]
  });
  const villager = villagers.villagers[0];
  const world = createProfessionWorld(new Map([["16,65,8", "composter"]]));

  villagers.step(world, 0.1, { timeOfDay: 3000 });

  assert.notEqual(villager.workstation, null);
  assert.equal(Math.floor(villager.workstation!.x), 16);
  assert.equal(villager.activeGoal, "work");
});

test("VillagerWorld marks homes invalid when the bed is missing", () => {
  const villagers = new VillagerWorld();
  villagers.ensureVillage({
    id: "lost-bed",
    centerX: 8,
    centerZ: 8,
    centerY: 65,
    biomeId: "plains",
    villagerPositions: [{ x: 8, y: 65, z: 8 }],
    homePositions: [{ x: 11, y: 65, z: 8 }]
  });
  const villager = villagers.villagers[0];

  villagers.step(createProfessionWorld(new Map()), 0.1, { timeOfDay: 18000 });

  assert.equal(villager.homeValid, false);
  assert.notEqual(Math.floor(villager.target.x), Math.floor(villager.home.x));
});

test("VillagerWorld reassigns homeless villagers to an available bed", () => {
  const villagers = new VillagerWorld();
  villagers.ensureVillage({
    id: "new-bed",
    centerX: 8,
    centerZ: 8,
    centerY: 65,
    biomeId: "plains",
    villagerPositions: [{ x: 8, y: 65, z: 8 }],
    homePositions: [
      { x: 8, y: 65, z: 8 },
      { x: 12, y: 65, z: 8 }
    ]
  });
  const villager = villagers.villagers[0];
  const world = createProfessionWorld(new Map([["12,65,8", "bed"]]));

  villagers.step(world, 0.1, { timeOfDay: 18000 });

  assert.equal(villager.homeValid, true);
  assert.equal(Math.floor(villager.home.x), 12);
  assert.equal(villager.activeGoal, "sleep");
});

test("VillagerWorld tracks trade uses and restocks near workstations", () => {
  const villagers = new VillagerWorld();
  villagers.ensureVillage({
    id: "trade-stock",
    centerX: 8,
    centerZ: 8,
    centerY: 65,
    biomeId: "plains",
    villagerPositions: [{ x: 8, y: 65, z: 8 }],
    homePositions: [{ x: 8, y: 65, z: 8 }],
    workstations: [{ profession: "farmer", position: { x: 9, y: 65, z: 8 } }]
  });
  const villager = villagers.villagers[0];

  assert.equal(villagerTradeUsesRemaining(villager, "farmer_apple", 2), 2);
  assert.equal(recordVillagerTrade(villager, "farmer_apple", 2), true);
  assert.equal(recordVillagerTrade(villager, "farmer_apple", 2), true);
  assert.equal(canUseVillagerTrade(villager, "farmer_apple", 2), false);
  assert.equal(recordVillagerTrade(villager, "farmer_apple", 2), false);

  villager.position = { x: 9.5, y: 65, z: 8.5 };
  villager.target = { ...villager.position };
  villagers.step(createFlatWorld(), 0.1, { timeOfDay: 3000 });

  assert.equal(villagerTradeUsesRemaining(villager, "farmer_apple", 2), 2);
  assert.equal(villager.restocksThisWorkday, 1);
});

test("VillagerWorld levels villagers through trade experience", () => {
  const villagers = new VillagerWorld();
  villagers.ensureVillage({
    id: "trade-level",
    centerX: 8,
    centerZ: 8,
    centerY: 65,
    biomeId: "plains",
    villagerPositions: [{ x: 8, y: 65, z: 8 }]
  });
  const villager = villagers.villagers[0];

  assert.equal(villager.tradeLevel, 1);
  assert.equal(villagerLevelForXp(9), 1);
  assert.equal(addVillagerTradeXp(villager, 10), 2);
  assert.equal(villager.tradeLevel, 2);
  assert.equal(villager.tradeXp, 10);
  assert.equal(addVillagerTradeXp(villager, 140), 5);
  assert.equal(villager.tradeLevel, 5);
});

test("VillagerWorld clamps reputation and exposes price multipliers", () => {
  const villagers = new VillagerWorld();
  villagers.ensureVillage({
    id: "reputation",
    centerX: 8,
    centerZ: 8,
    centerY: 65,
    biomeId: "plains",
    villagerPositions: [{ x: 8, y: 65, z: 8 }]
  });
  const villager = villagers.villagers[0];

  assert.equal(adjustVillagerReputation(villager, 99), 30);
  assert.ok(tradePriceMultiplierForReputation(villager.reputation) < 1);
  assert.equal(adjustVillagerReputation(villager, -99), -30);
  assert.ok(tradePriceMultiplierForReputation(villager.reputation) > 1);
  assert.equal(tradePriceMultiplierForReputation(0), 1);
});

test("VillagerWorld shares reputation gossip during meeting time", () => {
  const villagers = new VillagerWorld();
  villagers.ensureVillage({
    id: "gossip",
    centerX: 8,
    centerZ: 8,
    centerY: 65,
    biomeId: "plains",
    villagerPositions: [
      { x: 7, y: 65, z: 8 },
      { x: 8, y: 65, z: 8 },
      { x: 9, y: 65, z: 8 }
    ],
    homePositions: [
      { x: 7, y: 65, z: 8 },
      { x: 8, y: 65, z: 8 },
      { x: 9, y: 65, z: 8 }
    ]
  });
  const [first, second] = villagers.villagers;
  first.position = { x: 8.1, y: 65, z: 8.1 };
  second.position = { x: 8.8, y: 65, z: 8.1 };
  first.reputation = 20;
  second.reputation = 0;

  villagers.step(createFlatWorld(), 0.1, { timeOfDay: 9500 });

  assert.ok(first.reputation < 20);
  assert.ok(second.reputation > 0);
  assert.ok(first.gossipCooldownSeconds > 0);
  assert.ok(second.gossipCooldownSeconds > 0);
});

test("VillagerWorld does not share gossip outside meeting time", () => {
  const villagers = new VillagerWorld();
  villagers.ensureVillage({
    id: "quiet-gossip",
    centerX: 8,
    centerZ: 8,
    centerY: 65,
    biomeId: "plains",
    villagerPositions: [
      { x: 7, y: 65, z: 8 },
      { x: 8, y: 65, z: 8 }
    ]
  });
  const [first, second] = villagers.villagers;
  first.position = { x: 8.1, y: 65, z: 8.1 };
  second.position = { x: 8.8, y: 65, z: 8.1 };
  first.reputation = -20;
  second.reputation = 0;

  villagers.step(createFlatWorld(), 0.1, { timeOfDay: 3000 });

  assert.equal(first.reputation, -20);
  assert.equal(second.reputation, 0);
});

test("VillagerWorld shares carried wheat during meeting time", () => {
  const villagers = new VillagerWorld();
  villagers.ensureVillage({
    id: "food-share",
    centerX: 8,
    centerZ: 8,
    centerY: 65,
    biomeId: "plains",
    villagerPositions: [
      { x: 7, y: 65, z: 8 },
      { x: 8, y: 65, z: 8 },
      { x: 9, y: 65, z: 8 }
    ],
    homePositions: [
      { x: 7, y: 65, z: 8 },
      { x: 8, y: 65, z: 8 },
      { x: 9, y: 65, z: 8 }
    ]
  });
  const [farmer, neighbor] = villagers.villagers;
  farmer.position = { x: 8.1, y: 65, z: 8.1 };
  neighbor.position = { x: 8.8, y: 65, z: 8.1 };
  addVillagerFood(farmer, "wheat", 4);

  villagers.step(createFlatWorld(), 0.1, { timeOfDay: 9500 });

  assert.equal(villagerFoodCount(farmer, "wheat"), 3);
  assert.equal(villagerFoodCount(neighbor, "wheat"), 1);
  assert.ok(farmer.foodShareCooldownSeconds > 0);
  assert.ok(neighbor.foodShareFlashSeconds > 0);
});

test("VillagerWorld lets visible threats override the daily schedule", () => {
  const villagers = new VillagerWorld();
  villagers.ensureVillage({
    id: "schedule-threat",
    centerX: 8,
    centerZ: 8,
    centerY: 65,
    biomeId: "plains",
    villagerPositions: [{ x: 8, y: 65, z: 8 }],
    homePositions: [{ x: 8, y: 65, z: 8 }],
    workstations: [{ profession: "farmer", position: { x: 14, y: 65, z: 8 } }]
  });
  const villager = villagers.villagers[0];

  villagers.step(createFlatWorld(), 0.1, { timeOfDay: 3000, threats: [{ x: 6.5, y: 65, z: 8.5 }] });

  assert.equal(villager.schedule, "work");
  assert.equal(villager.activeGoal, "avoid_threat");
  assert.notEqual(Math.floor(villager.target.x), 14);
});

test("VillagerWorld sends villagers home when a bell alarm is raised", () => {
  const villagers = new VillagerWorld();
  villagers.ensureVillage({
    id: "bell-alarm",
    centerX: 8,
    centerZ: 8,
    centerY: 65,
    biomeId: "plains",
    villagerPositions: [{ x: 12, y: 65, z: 8 }],
    homePositions: [{ x: 8, y: 65, z: 8 }],
    workstations: [{ profession: "farmer", position: { x: 16, y: 65, z: 8 } }]
  });
  const villager = villagers.villagers[0];
  villager.position = { x: 14.5, y: 65, z: 8.5 };
  villager.target = { x: 16.5, y: 65, z: 8.5 };
  alertVillagerByBell(villager, { x: 9.5, y: 66, z: 8.5 }, 4);

  villagers.step(createFlatWorld(), 0.5, { timeOfDay: 3000 });

  assert.equal(villager.schedule, "work");
  assert.equal(villager.activeGoal, "home");
  assert.ok(villager.bellAlarmSeconds > 0);
  assert.ok(villager.target.x < 9);
  assert.ok(villager.position.x < 14.5);
});

test("VillagerWorld sends villagers home at night", () => {
  const villagers = new VillagerWorld();
  villagers.ensureVillage({
    id: "night",
    centerX: 8,
    centerZ: 8,
    centerY: 65,
    biomeId: "plains",
    villagerPositions: [{ x: 8, y: 65, z: 8 }],
    homePositions: [{ x: 8, y: 65, z: 8 }],
    workstations: [{ profession: "farmer", position: { x: 14, y: 65, z: 8 } }]
  });
  const villager = villagers.villagers[0];
  villager.position = { x: 14.5, y: 65, z: 8.5 };
  villager.target = { x: 16.5, y: 65, z: 8.5 };
  const world = {
    isSolidBlockLoaded: (_x: number, y: number, _z: number) => y === 64,
    getMotionBlockingHeightLoaded: () => 64
  };

  villagers.step(world, 1, { night: true });

  assert.ok(villager.target.x < 9);
  assert.ok(villager.position.x < 14.5);
});

test("VillagerWorld makes villagers flee visible hostile threats", () => {
  const villagers = new VillagerWorld();
  villagers.ensureVillage({
    id: "threat",
    centerX: 8,
    centerZ: 8,
    centerY: 65,
    biomeId: "plains",
    villagerPositions: [{ x: 8, y: 65, z: 8 }],
    homePositions: [{ x: 8, y: 65, z: 8 }]
  });
  const villager = villagers.villagers[0];
  const world = {
    isSolidBlockLoaded: (_x: number, y: number, _z: number) => y === 64,
    getMotionBlockingHeightLoaded: () => 64
  };

  villagers.step(world, 0.5, { threats: [{ x: 6.5, y: 65, z: 8.5 }] });

  assert.equal(villager.activeGoal, "avoid_threat");
  assert.ok(villager.position.x > 8.5);
});

test("VillagerWorld applies damage and removes killed villagers", () => {
  const villagers = new VillagerWorld();
  villagers.ensureVillage({
    id: "damage",
    centerX: 8,
    centerZ: 8,
    centerY: 65,
    biomeId: "plains",
    villagerPositions: [{ x: 8, y: 65, z: 8 }]
  });
  const villager = villagers.villagers[0];

  const hurt = villagers.damageVillager(villager.id, 7);
  assert.equal(hurt.died, false);
  assert.equal(villager.health, 13);
  assert.ok(villager.hurtTimeSeconds > 0);

  const killed = villagers.damageVillager(villager.id, 20);
  assert.equal(killed.died, true);
  assert.equal(villagers.villagers.length, 0);
});

function createFlatWorld(): {
  isSolidBlockLoaded(x: number, y: number, z: number): boolean;
  getMotionBlockingHeightLoaded(x: number, z: number): number;
} {
  return {
    isSolidBlockLoaded: (_x: number, y: number, _z: number) => y === 64,
    getMotionBlockingHeightLoaded: () => 64
  };
}

function createProfessionWorld(blockTypes: Map<string, string>): {
  isSolidBlockLoaded(x: number, y: number, z: number): boolean;
  getBlockTypeIdLoaded(x: number, y: number, z: number): string | null;
  getMotionBlockingHeightLoaded(x: number, z: number): number;
} {
  return {
    isSolidBlockLoaded: (_x: number, y: number, _z: number) => y === 64,
    getBlockTypeIdLoaded: (x: number, y: number, z: number) => blockTypes.get(`${x},${y},${z}`) ?? null,
    getMotionBlockingHeightLoaded: () => 64
  };
}

function createRoofedRoomWorld(roomX: number, roomZ: number, floorY: number, roofY: number): {
  isSolidBlockLoaded(x: number, y: number, z: number): boolean;
  getBlockTypeIdLoaded(x: number, y: number, z: number): string | null;
  getMotionBlockingHeightLoaded(x: number, z: number): number;
} {
  return {
    isSolidBlockLoaded: (x: number, y: number, z: number) => {
      const insideRoom = Math.abs(x - roomX) <= 1 && Math.abs(z - roomZ) <= 1;
      if (!insideRoom) {
        return y <= 64;
      }
      return y === floorY - 1 || y === roofY;
    },
    getBlockTypeIdLoaded: (x: number, y: number, z: number) => {
      const insideRoom = Math.abs(x - roomX) <= 1 && Math.abs(z - roomZ) <= 1;
      if (insideRoom && y === roofY) {
        return "cobblestone";
      }
      if (insideRoom && y === floorY) {
        return "bed";
      }
      return null;
    },
    getMotionBlockingHeightLoaded: (x: number, z: number) =>
      Math.abs(x - roomX) <= 1 && Math.abs(z - roomZ) <= 1 ? roofY : 64
  };
}

function createRoofDeckWorld(roofX: number, roofZ: number, roofY: number, radius = 1): {
  isSolidBlockLoaded(x: number, y: number, z: number): boolean;
  getBlockTypeIdLoaded(x: number, y: number, z: number): string | null;
  getMotionBlockingHeightLoaded(x: number, z: number): number;
} {
  return {
    isSolidBlockLoaded: (x: number, y: number, z: number) => {
      if (Math.abs(x - roofX) <= radius && Math.abs(z - roofZ) <= radius && y === roofY) {
        return true;
      }
      return y === 64;
    },
    getBlockTypeIdLoaded: (x: number, y: number, z: number) => {
      if (Math.abs(x - roofX) <= radius && Math.abs(z - roofZ) <= radius && y === roofY) {
        return "cobblestone";
      }
      return null;
    },
    getMotionBlockingHeightLoaded: (x: number, z: number) =>
      Math.abs(x - roofX) <= radius && Math.abs(z - roofZ) <= radius ? roofY : 64
  };
}

function createSupportedRoofWorld(roofX: number, roofZ: number, floorY: number, roofY: number): {
  isSolidBlockLoaded(x: number, y: number, z: number): boolean;
  getBlockTypeIdLoaded(x: number, y: number, z: number): string | null;
  getMotionBlockingHeightLoaded(x: number, z: number): number;
} {
  return {
    isSolidBlockLoaded: (x: number, y: number, z: number) => {
      const onRoof = Math.abs(x - roofX) <= 3 && Math.abs(z - roofZ) <= 3;
      const onWall = (Math.abs(x - roofX) === 2 || Math.abs(z - roofZ) === 2) && Math.abs(x - roofX) <= 2 && Math.abs(z - roofZ) <= 2;
      if (onRoof && y === roofY) {
        return true;
      }
      if (onWall && y >= floorY && y < roofY) {
        return true;
      }
      return y === 64;
    },
    getBlockTypeIdLoaded: (x: number, y: number, z: number) => {
      const onRoof = Math.abs(x - roofX) <= 3 && Math.abs(z - roofZ) <= 3;
      const onWall = (Math.abs(x - roofX) === 2 || Math.abs(z - roofZ) === 2) && Math.abs(x - roofX) <= 2 && Math.abs(z - roofZ) <= 2;
      if (onRoof && y === roofY) {
        return "cobblestone";
      }
      if (onWall && y >= floorY && y < roofY) {
        return "planks";
      }
      return null;
    },
    getMotionBlockingHeightLoaded: (x: number, z: number) =>
      Math.abs(x - roofX) <= 3 && Math.abs(z - roofZ) <= 3 ? roofY : 64
  };
}

function createPitWorld(pitX: number, pitZ: number): {
  isSolidBlockLoaded(x: number, y: number, z: number): boolean;
  getMotionBlockingHeightLoaded(x: number, z: number): number;
} {
  const heightAt = (x: number, z: number) => (x === pitX && z === pitZ ? 63 : 64);
  return {
    isSolidBlockLoaded: (x: number, y: number, z: number) => y <= heightAt(x, z),
    getMotionBlockingHeightLoaded: (x: number, z: number) => heightAt(x, z)
  };
}
