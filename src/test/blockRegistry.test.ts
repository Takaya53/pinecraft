import test from "node:test";
import assert from "node:assert/strict";
import { createDefaultBlockRegistry } from "../block/blockRegistry.ts";
import { AIR_STATE_ID } from "../block/blockState.ts";

test("default registry keeps air at state id 0", () => {
  const registry = createDefaultBlockRegistry();
  assert.equal(registry.resolveState("air"), AIR_STATE_ID);
  assert.equal(registry.isAir(AIR_STATE_ID), true);
});

test("default registry appends new terrain blocks without shifting old state ids", () => {
  const registry = createDefaultBlockRegistry();
  assert.equal(registry.resolveState("stone"), 1);
  assert.equal(registry.resolveState("sand"), 5);
  assert.equal(registry.resolveState("water", { level: 0 }), 6);
  assert.equal(registry.resolveState("log"), 23);
  assert.ok(registry.resolveState("gravel") > registry.resolveState("crafting_table"));
  assert.ok(registry.resolveState("door") > registry.resolveState("wheat"));
  assert.ok(registry.resolveState("bell") > registry.resolveState("door"));
});

test("BlockState resolves typed properties deterministically", () => {
  const registry = createDefaultBlockRegistry();
  const logX = registry.resolveState("log", { axis: "x" });
  const logY = registry.resolveState("log");
  const water0 = registry.resolveState("water", { level: 0 });
  const water15 = registry.resolveState("water", { level: 15 });
  const wheat0 = registry.resolveState("wheat", { age: 0 });
  const wheat7 = registry.resolveState("wheat", { age: 7 });
  const closedDoor = registry.resolveState("door", { facing: "north", half: "lower", open: false });
  const openDoor = registry.resolveState("door", { facing: "north", half: "lower", open: true });

  assert.notEqual(logX, logY);
  assert.notEqual(water0, water15);
  assert.notEqual(wheat0, wheat7);
  assert.notEqual(closedDoor, openDoor);
  assert.deepEqual(registry.getState(logX).properties, { axis: "x" });
  assert.deepEqual(registry.getState(wheat0).properties, { age: 0 });
  assert.deepEqual(registry.getState(openDoor).properties, { facing: "north", half: "lower", open: true });
});

test("BlockState rejects unknown properties", () => {
  const registry = createDefaultBlockRegistry();
  assert.throws(() => registry.resolveState("stone", { axis: "x" }), /unknown property/);
  assert.throws(() => registry.resolveState("water", { level: 16 }), /invalid value/);
  assert.throws(() => registry.resolveState("wheat", { age: 8 }), /invalid value/);
  assert.throws(() => registry.resolveState("door", { facing: "up" }), /invalid value/);
});
