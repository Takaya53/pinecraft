import type { NoiseSampler } from "../core/noise.ts";

export type DensityContext = {
  x: number;
  y: number;
  z: number;
  samplers: Map<string, NoiseSampler>;
};

export type SplinePoint = {
  location: number;
  value: number;
};

export type DensityNode =
  | { type: "constant"; value: number }
  | { type: "add"; left: DensityNode; right: DensityNode }
  | { type: "mul"; left: DensityNode; right: DensityNode }
  | { type: "clamp"; input: DensityNode; min: number; max: number }
  | { type: "lerp"; t: DensityNode; from: DensityNode; to: DensityNode }
  | {
      type: "noise";
      sampler: string;
      xzScale: number;
      yScale: number;
      amplitude?: number;
    }
  | {
      type: "yClampedGradient";
      fromY: number;
      toY: number;
      fromValue: number;
      toValue: number;
    }
  | { type: "spline"; input: DensityNode; points: readonly SplinePoint[] }
  | { type: "cache2d"; key: string; input: DensityNode }
  | { type: "cacheOnce"; key: string; input: DensityNode };

export class DensityEvaluator {
  cache2d: Map<string, number>;
  cacheOnce: Map<string, number>;

  constructor() {
    this.cache2d = new Map();
    this.cacheOnce = new Map();
  }

  reset(): void {
    this.cache2d.clear();
    this.cacheOnce.clear();
  }

  evaluate(node: DensityNode, context: DensityContext): number {
    switch (node.type) {
      case "constant":
        return node.value;
      case "add":
        return this.evaluate(node.left, context) + this.evaluate(node.right, context);
      case "mul":
        return this.evaluate(node.left, context) * this.evaluate(node.right, context);
      case "clamp":
        return clamp(this.evaluate(node.input, context), node.min, node.max);
      case "lerp":
        return lerp(
          this.evaluate(node.from, context),
          this.evaluate(node.to, context),
          this.evaluate(node.t, context)
        );
      case "noise": {
        const sampler = context.samplers.get(node.sampler);
        if (!sampler) {
          throw new Error(`missing density noise sampler: ${node.sampler}`);
        }
        const amplitude = node.amplitude ?? 1;
        return (
          sampler.noise3(
            context.x * node.xzScale,
            context.y * node.yScale,
            context.z * node.xzScale
          ) * amplitude
        );
      }
      case "yClampedGradient": {
        const t = inverseLerp(node.fromY, node.toY, context.y);
        return lerp(node.fromValue, node.toValue, clamp(t, 0, 1));
      }
      case "spline":
        return evaluateSpline(this.evaluate(node.input, context), node.points);
      case "cache2d": {
        const key = `${node.key}:${context.x},${context.z}`;
        const cached = this.cache2d.get(key);
        if (cached !== undefined) {
          return cached;
        }
        const value = this.evaluate(node.input, context);
        this.cache2d.set(key, value);
        return value;
      }
      case "cacheOnce": {
        const key = `${node.key}:${context.x},${context.y},${context.z}`;
        const cached = this.cacheOnce.get(key);
        if (cached !== undefined) {
          return cached;
        }
        const value = this.evaluate(node.input, context);
        this.cacheOnce.set(key, value);
        return value;
      }
      default:
        assertNever(node);
    }
  }
}

export const density = {
  constant(value: number): DensityNode {
    return { type: "constant", value };
  },
  add(left: DensityNode, right: DensityNode): DensityNode {
    return { type: "add", left, right };
  },
  mul(left: DensityNode, right: DensityNode): DensityNode {
    return { type: "mul", left, right };
  },
  clamp(input: DensityNode, min: number, max: number): DensityNode {
    return { type: "clamp", input, min, max };
  },
  lerp(t: DensityNode, from: DensityNode, to: DensityNode): DensityNode {
    return { type: "lerp", t, from, to };
  },
  noise(sampler: string, xzScale: number, yScale: number, amplitude = 1): DensityNode {
    return { type: "noise", sampler, xzScale, yScale, amplitude };
  },
  yClampedGradient(
    fromY: number,
    toY: number,
    fromValue: number,
    toValue: number
  ): DensityNode {
    return { type: "yClampedGradient", fromY, toY, fromValue, toValue };
  },
  spline(input: DensityNode, points: readonly SplinePoint[]): DensityNode {
    return { type: "spline", input, points };
  },
  cache2d(key: string, input: DensityNode): DensityNode {
    return { type: "cache2d", key, input };
  },
  cacheOnce(key: string, input: DensityNode): DensityNode {
    return { type: "cacheOnce", key, input };
  }
};

export function createOverworldDensityGraph(): DensityNode {
  const continentalness = density.cache2d(
    "continentalness",
    density.noise("continentalness", 0.0012, 0, 1)
  );
  const erosion = density.cache2d("erosion", density.noise("erosion", 0.0018, 0, 1));
  const weirdness = density.cache2d("weirdness", density.noise("weirdness", 0.002, 0, 1));

  const offset = density.spline(continentalness, [
    { location: -1, value: -0.45 },
    { location: -0.25, value: -0.12 },
    { location: 0.35, value: 0.08 },
    { location: 1, value: 0.22 }
  ]);

  const factor = density.spline(erosion, [
    { location: -1, value: 1.25 },
    { location: 0, value: 0.85 },
    { location: 1, value: 0.35 }
  ]);

  const jaggedness = density.mul(
    density.spline(weirdness, [
      { location: -1, value: 0 },
      { location: 0.35, value: 0.04 },
      { location: 1, value: 0.18 }
    ]),
    density.noise("jaggedness", 0.012, 0.018, 1)
  );

  const verticalGradient = density.yClampedGradient(-64, 320, 1.2, -1.2);
  const baseNoise = density.noise("base3d", 0.006, 0.006, 0.65);

  return density.cacheOnce(
    "overworld-final-density",
    density.clamp(
      density.add(
        density.add(verticalGradient, offset),
        density.add(density.mul(baseNoise, factor), jaggedness)
      ),
      -1,
      1
    )
  );
}

function evaluateSpline(input: number, points: readonly SplinePoint[]): number {
  if (points.length === 0) {
    throw new Error("spline requires at least one point");
  }

  const sorted = [...points].sort((a, b) => a.location - b.location);
  if (input <= sorted[0].location) {
    return sorted[0].value;
  }

  for (let index = 1; index < sorted.length; index += 1) {
    const previous = sorted[index - 1];
    const current = sorted[index];
    if (input <= current.location) {
      return lerp(
        previous.value,
        current.value,
        inverseLerp(previous.location, current.location, input)
      );
    }
  }

  return sorted[sorted.length - 1].value;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}

function inverseLerp(from: number, to: number, value: number): number {
  if (from === to) {
    return 0;
  }
  return (value - from) / (to - from);
}

function assertNever(value: never): never {
  throw new Error(`unknown density node: ${JSON.stringify(value)}`);
}
