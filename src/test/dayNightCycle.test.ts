import test from "node:test";
import assert from "node:assert/strict";
import { canSleepAtTime, DayNightCycle, phaseForTime, skyLightLevelForTime, wakeTimeAfterSleep } from "../world/dayNightCycle.ts";

test("DayNightCycle advances at 20 game ticks per second and wraps", () => {
  const cycle = new DayNightCycle(23990);

  cycle.advance(1);

  assert.equal(cycle.timeOfDay, 10);
});

test("DayNightCycle produces brighter visuals during the day than at night", () => {
  const day = new DayNightCycle(6000).visuals();
  const night = new DayNightCycle(18000).visuals();

  assert.ok(day.sunlightIntensity > night.sunlightIntensity);
  assert.ok(day.ambientIntensity > night.ambientIntensity);
  assert.notEqual(day.skyColor, night.skyColor);
  assert.equal(day.sunVisible, true);
  assert.equal(night.moonVisible, true);
});

test("DayNightCycle follows Minecraft day phase threshold ticks", () => {
  assert.equal(phaseForTime(0), "day");
  assert.equal(phaseForTime(6000), "day");
  assert.equal(phaseForTime(12000), "sunset");
  assert.equal(phaseForTime(13000), "night");
  assert.equal(phaseForTime(18000), "night");
  assert.equal(phaseForTime(23000), "sunrise");
});

test("DayNightCycle sky light follows clear weather brightness transition ticks", () => {
  assert.equal(skyLightLevelForTime(12039), 15);
  assert.equal(skyLightLevelForTime(13670), 4);
  assert.equal(skyLightLevelForTime(22331), 4);
  assert.equal(skyLightLevelForTime(23961), 15);
  assert.ok(skyLightLevelForTime(13000) < 15);
  assert.ok(skyLightLevelForTime(23216) > 4);
});

test("DayNightCycle allows bed sleep only during night", () => {
  assert.equal(canSleepAtTime(1000), false);
  assert.equal(canSleepAtTime(12541), false);
  assert.equal(canSleepAtTime(12542), true);
  assert.equal(canSleepAtTime(18000), true);
  assert.equal(canSleepAtTime(23000), false);
  assert.equal(wakeTimeAfterSleep(), 1000);
});
