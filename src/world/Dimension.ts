import {
  WORLD_HEIGHT,
  WORLD_MAX_Y,
  WORLD_MIN_Y,
  type Vec3i
} from "../core/constants.ts";

export type DimensionType = {
  id: string;
  minY: number;
  maxY: number;
  height: number;
  hasSkyLight: boolean;
  hasCeiling: boolean;
  skyType: "overworld" | "none" | "void";
  timeProgression: "normal" | "fixed";
  generator: string;
  defaultSpawn: Vec3i;
};

export const OVERWORLD_DIMENSION: DimensionType = {
  id: "overworld",
  minY: WORLD_MIN_Y,
  maxY: WORLD_MAX_Y,
  height: WORLD_HEIGHT,
  hasSkyLight: true,
  hasCeiling: false,
  skyType: "overworld",
  timeProgression: "normal",
  generator: "overworld",
  defaultSpawn: { x: 0, y: 80, z: 0 }
};

export class DimensionRegistry {
  dimensions: Map<string, DimensionType>;

  constructor(dimensions: readonly DimensionType[] = [OVERWORLD_DIMENSION]) {
    this.dimensions = new Map();
    for (const dimension of dimensions) {
      this.register(dimension);
    }
  }

  register(dimension: DimensionType): void {
    if (this.dimensions.has(dimension.id)) {
      throw new Error(`duplicate dimension: ${dimension.id}`);
    }
    if (dimension.height !== dimension.maxY - dimension.minY + 1) {
      throw new Error(`invalid dimension height for ${dimension.id}`);
    }
    this.dimensions.set(dimension.id, dimension);
  }

  get(id: string): DimensionType {
    const dimension = this.dimensions.get(id);
    if (!dimension) {
      throw new Error(`unknown dimension: ${id}`);
    }
    return dimension;
  }
}
