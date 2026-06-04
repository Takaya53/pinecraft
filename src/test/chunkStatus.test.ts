import test from "node:test";
import assert from "node:assert/strict";
import {
  assertCanAdvanceChunkStatus,
  canAdvanceChunkStatus,
  isChunkStatusAtLeast,
  nextChunkStatus
} from "../world/ChunkStatus.ts";

test("ChunkStatus advances one generation stage at a time", () => {
  assert.equal(nextChunkStatus("UNLOADED"), "BIOMES");
  assert.equal(canAdvanceChunkStatus("BIOMES", "NOISE"), true);
  assert.equal(canAdvanceChunkStatus("BIOMES", "SURFACE"), false);
  assert.equal(isChunkStatusAtLeast("LIT", "LIGHT_PENDING"), true);
  assert.throws(() => assertCanAdvanceChunkStatus("UNLOADED", "NOISE"), /invalid/);
});
