import test from "node:test";
import assert from "node:assert/strict";
import { createNoiseSampler } from "../core/noise.ts";
import {
  DensityEvaluator,
  createOverworldDensityGraph,
  density
} from "../generation/densityFunction.ts";

test("DensityFunction evaluates graph nodes deterministically", () => {
  const graph = density.add(
    density.constant(2),
    density.mul(density.constant(3), density.constant(4))
  );
  const evaluator = new DensityEvaluator();
  const value = evaluator.evaluate(graph, {
    x: 0,
    y: 0,
    z: 0,
    samplers: new Map()
  });

  assert.equal(value, 14);
});

test("overworld density graph is bounded and seed deterministic", () => {
  const graph = createOverworldDensityGraph();
  const samplers = new Map([
    ["continentalness", createNoiseSampler("seed:continentalness")],
    ["erosion", createNoiseSampler("seed:erosion")],
    ["weirdness", createNoiseSampler("seed:weirdness")],
    ["jaggedness", createNoiseSampler("seed:jaggedness")],
    ["base3d", createNoiseSampler("seed:base3d")]
  ]);
  const evaluatorA = new DensityEvaluator();
  const evaluatorB = new DensityEvaluator();
  const context = { x: 128, y: 72, z: -256, samplers };

  const a = evaluatorA.evaluate(graph, context);
  const b = evaluatorB.evaluate(graph, context);

  assert.equal(a, b);
  assert.ok(a >= -1 && a <= 1);
});
