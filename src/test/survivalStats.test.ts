import test from "node:test";
import assert from "node:assert/strict";
import { SurvivalStats } from "../player/survivalStats.ts";

test("SurvivalStats consumes exhaustion before visible food level", () => {
  const stats = new SurvivalStats({ foodLevel: 20, saturation: 2, exhaustion: 0 });

  stats.addExhaustion(4);
  assert.equal(stats.state.saturation, 1);
  assert.equal(stats.state.foodLevel, 20);

  stats.addExhaustion(8);
  assert.equal(stats.state.saturation, 0);
  assert.equal(stats.state.foodLevel, 19);
});

test("SurvivalStats applies fall damage after three safe blocks", () => {
  const stats = new SurvivalStats();

  assert.equal(stats.applyFallDamage(3.8), 0);
  assert.equal(stats.applyFallDamage(6.2), 3);
  assert.equal(stats.state.health, 17);
});

test("SurvivalStats exposes death and can reset after respawn", () => {
  const stats = new SurvivalStats();

  stats.applyDamage(40);
  assert.equal(stats.isDead(), true);
  stats.tick(10);
  assert.equal(stats.state.health, 0);

  stats.reset();
  assert.equal(stats.isDead(), false);
  assert.equal(stats.state.health, 20);
  assert.equal(stats.state.foodLevel, 20);
  assert.equal(stats.state.airTicks, 300);
});

test("SurvivalStats eating restores food and saturation within Java-style bounds", () => {
  const stats = new SurvivalStats({ foodLevel: 14, saturation: 0 });

  stats.eat(4, 0.3);

  assert.equal(stats.state.foodLevel, 18);
  assert.equal(stats.state.saturation, 2.4);
  assert.equal(stats.canEat(), true);

  stats.eat(10, 1);
  assert.equal(stats.state.foodLevel, 20);
  assert.equal(stats.state.saturation, 20);
  assert.equal(stats.canEat(), false);
});

test("SurvivalStats regenerates and starves over time", () => {
  const stats = new SurvivalStats({ health: 18, foodLevel: 20, saturation: 5 });

  stats.tick(4);
  assert.equal(stats.state.health, 19);
  assert.ok(stats.state.exhaustion > 0);

  const starving = new SurvivalStats({ health: 10, foodLevel: 0, saturation: 0 });
  starving.tick(4);
  assert.equal(starving.state.health, 9);
});

test("SurvivalStats drains air underwater and applies drowning damage", () => {
  const stats = new SurvivalStats({ foodLevel: 10, saturation: 0 });

  stats.tick(10, { eyesInWater: true });
  assert.equal(stats.state.airTicks, 100);

  const firstDrowning = stats.tick(6, { eyesInWater: true });
  assert.equal(stats.state.airTicks, 0);
  assert.equal(firstDrowning.drowningDamage, 2);
  assert.equal(stats.state.health, 18);

  stats.tick(1, { eyesInWater: false });
  assert.equal(stats.state.airTicks, 80);
});
