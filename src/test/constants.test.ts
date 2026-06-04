import test from "node:test";
import assert from "node:assert/strict";
import {
  blockIndex,
  decodeBlockIndex,
  floorDiv,
  floorMod,
  worldToChunkCoord,
  worldToLocalBlockCoord,
  worldYToSectionIndex,
  WORLD_SECTION_COUNT
} from "../core/constants.ts";

test("blockIndex uses fixed YZX order", () => {
  assert.equal(blockIndex(1, 2, 3), (2 << 8) | (3 << 4) | 1);
  assert.deepEqual(decodeBlockIndex(blockIndex(15, 14, 13)), { x: 15, y: 14, z: 13 });
});

test("floor coordinate helpers handle negative world coordinates", () => {
  assert.equal(floorDiv(-1, 16), -1);
  assert.equal(floorMod(-1, 16), 15);
  assert.equal(worldToChunkCoord(-17), -2);
  assert.equal(worldToLocalBlockCoord(-17), 15);
});

test("world Y maps into the 24 section overworld range", () => {
  assert.equal(WORLD_SECTION_COUNT, 24);
  assert.equal(worldYToSectionIndex(-64), 0);
  assert.equal(worldYToSectionIndex(319), 23);
});
