import test from "node:test";
import assert from "node:assert/strict";
import { SplitMix64 } from "../core/random.ts";
import { createNoiseSampler } from "../core/noise.ts";

test("SplitMix64 is deterministic for string seeds", () => {
  const a = new SplitMix64("phase-zero");
  const b = new SplitMix64("phase-zero");
  assert.equal(a.nextBigUint64(), b.nextBigUint64());
  assert.equal(a.nextBigUint64(), b.nextBigUint64());
});

test("seeded noise is deterministic and bounded", () => {
  const a = createNoiseSampler("terrain");
  const b = createNoiseSampler("terrain");
  const value2 = a.noise2(12.25, -3.5);
  const value3 = a.noise3(1.25, 64.5, -9.75);

  assert.equal(value2, b.noise2(12.25, -3.5));
  assert.equal(value3, b.noise3(1.25, 64.5, -9.75));
  assert.ok(value2 >= -1 && value2 <= 1);
  assert.ok(value3 >= -1 && value3 <= 1);
});
