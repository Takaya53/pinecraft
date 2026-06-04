import test from "node:test";
import assert from "node:assert/strict";
import { WORLD_HEIGHT } from "../core/constants.ts";
import { DimensionRegistry, OVERWORLD_DIMENSION } from "../world/Dimension.ts";
import { HeightmapSet, heightmapIndex } from "../world/Heightmap.ts";

test("HeightmapSet stores all required Java-style heightmap channels", () => {
  const heightmaps = new HeightmapSet();
  heightmaps.set("WORLD_SURFACE", 1, 2, 70);
  heightmaps.set("OCEAN_FLOOR", 1, 2, 48);

  assert.equal(heightmaps.get("WORLD_SURFACE", 1, 2), 70);
  assert.equal(heightmaps.get("OCEAN_FLOOR", 1, 2), 48);
  assert.equal(heightmapIndex(15, 15), 255);
});

test("HeightmapSet can recompute a column with a predicate", () => {
  const heightmaps = new HeightmapSet();
  const top = heightmaps.recomputeColumn(
    "MOTION_BLOCKING",
    0,
    0,
    (worldY) => (worldY <= 63 ? 1 : 0),
    (stateId) => stateId !== 0
  );

  assert.equal(top, 63);
});

test("DimensionRegistry exposes the overworld boundary", () => {
  const registry = new DimensionRegistry();
  const overworld = registry.get("overworld");

  assert.equal(overworld.height, WORLD_HEIGHT);
  assert.deepEqual(overworld, OVERWORLD_DIMENSION);
});
