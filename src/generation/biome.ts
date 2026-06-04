import { createNoiseSampler, type NoiseSampler } from "../core/noise.ts";
import { deriveSeed, type SeedInput } from "../core/random.ts";

export type BiomeId =
  | "ocean"
  | "river"
  | "beach"
  | "plains"
  | "forest"
  | "desert"
  | "snowy_plains"
  | "mountains";

export type ClimateSample = {
  continentalness: number;
  erosion: number;
  temperature: number;
  humidity: number;
  weirdness: number;
};

export type BiomeDefinition = {
  id: BiomeId;
  temperature: number;
  humidity: number;
  continentalness: number;
  erosion: number;
  weirdness: number;
  surfaceOffset: number;
  treeDensity: number;
  top: "grass" | "sand" | "snow";
  filler: "dirt" | "sand" | "stone";
};

export type BiomeBlend = {
  primary: BiomeDefinition;
  weights: Map<BiomeId, number>;
  surfaceOffset: number;
  treeDensity: number;
  top: BiomeDefinition["top"];
  filler: BiomeDefinition["filler"];
};

export const BIOMES: readonly BiomeDefinition[] = [
  {
    id: "ocean",
    temperature: 0,
    humidity: 0.1,
    continentalness: -0.85,
    erosion: 0.4,
    weirdness: 0,
    surfaceOffset: -11,
    treeDensity: 0,
    top: "sand",
    filler: "sand"
  },
  {
    id: "river",
    temperature: 0,
    humidity: 0.25,
    continentalness: -0.15,
    erosion: 0.8,
    weirdness: 0,
    surfaceOffset: -8,
    treeDensity: 0,
    top: "sand",
    filler: "sand"
  },
  {
    id: "beach",
    temperature: 0.25,
    humidity: 0.1,
    continentalness: -0.28,
    erosion: 0.2,
    weirdness: 0,
    surfaceOffset: -3,
    treeDensity: 0.002,
    top: "sand",
    filler: "sand"
  },
  {
    id: "plains",
    temperature: 0.25,
    humidity: 0,
    continentalness: 0.25,
    erosion: 0.2,
    weirdness: -0.1,
    surfaceOffset: 0,
    treeDensity: 0.008,
    top: "grass",
    filler: "dirt"
  },
  {
    id: "forest",
    temperature: 0.1,
    humidity: 0.65,
    continentalness: 0.3,
    erosion: -0.1,
    weirdness: 0,
    surfaceOffset: 2,
    treeDensity: 0.032,
    top: "grass",
    filler: "dirt"
  },
  {
    id: "desert",
    temperature: 0.82,
    humidity: -0.75,
    continentalness: 0.2,
    erosion: 0.15,
    weirdness: -0.1,
    surfaceOffset: -1,
    treeDensity: 0.001,
    top: "sand",
    filler: "sand"
  },
  {
    id: "snowy_plains",
    temperature: -0.72,
    humidity: 0.2,
    continentalness: 0.22,
    erosion: 0.18,
    weirdness: -0.1,
    surfaceOffset: 1,
    treeDensity: 0.006,
    top: "snow",
    filler: "dirt"
  },
  {
    id: "mountains",
    temperature: -0.35,
    humidity: 0.15,
    continentalness: 0.68,
    erosion: -0.75,
    weirdness: 0.72,
    surfaceOffset: 13,
    treeDensity: 0.01,
    top: "snow",
    filler: "stone"
  }
];

export class BiomeSampler {
  continentalness: NoiseSampler;
  erosion: NoiseSampler;
  temperature: NoiseSampler;
  humidity: NoiseSampler;
  weirdness: NoiseSampler;

  constructor(seed: SeedInput) {
    this.continentalness = createNoiseSampler(deriveSeed(seed, "biome-continentalness"));
    this.erosion = createNoiseSampler(deriveSeed(seed, "biome-erosion"));
    this.temperature = createNoiseSampler(deriveSeed(seed, "biome-temperature"));
    this.humidity = createNoiseSampler(deriveSeed(seed, "biome-humidity"));
    this.weirdness = createNoiseSampler(deriveSeed(seed, "biome-weirdness"));
  }

  sampleClimate(worldX: number, worldZ: number): ClimateSample {
    return {
      continentalness: this.continentalness.noise2(worldX * 0.0016, worldZ * 0.0016),
      erosion: this.erosion.noise2(worldX * 0.0024, worldZ * 0.0024),
      temperature: this.temperature.noise2(worldX * 0.0018, worldZ * 0.0018),
      humidity: this.humidity.noise2(worldX * 0.002, worldZ * 0.002),
      weirdness: this.weirdness.noise2(worldX * 0.0022, worldZ * 0.0022)
    };
  }

  blend(climate: ClimateSample, riverStrength: number): BiomeBlend {
    const candidates = BIOMES.map((biome) => {
      const distance = climateDistance(climate, biome) + (biome.id === "river" ? (1 - riverStrength) * 2.5 : 0);
      return { biome, distance };
    }).sort((a, b) => a.distance - b.distance);

    const selected = candidates.slice(0, 4);
    const weights = new Map<BiomeId, number>();
    let totalWeight = 0;
    for (const candidate of selected) {
      const weight = 1 / Math.max(0.0001, candidate.distance * candidate.distance);
      weights.set(candidate.biome.id, weight);
      totalWeight += weight;
    }

    let surfaceOffset = 0;
    let treeDensity = 0;
    for (const candidate of selected) {
      const weight = (weights.get(candidate.biome.id) ?? 0) / totalWeight;
      weights.set(candidate.biome.id, weight);
      surfaceOffset += candidate.biome.surfaceOffset * weight;
      treeDensity += candidate.biome.treeDensity * weight;
    }

    const primary = riverStrength > 0.62
      ? BIOMES.find((biome) => biome.id === "river") ?? selected[0].biome
      : selected[0].biome;

    return {
      primary,
      weights,
      surfaceOffset,
      treeDensity,
      top: primary.top,
      filler: primary.filler
    };
  }
}

function climateDistance(climate: ClimateSample, biome: BiomeDefinition): number {
  return Math.hypot(
    (climate.continentalness - biome.continentalness) * 1.35,
    (climate.erosion - biome.erosion) * 0.95,
    (climate.temperature - biome.temperature) * 1.1,
    (climate.humidity - biome.humidity) * 0.9,
    (climate.weirdness - biome.weirdness) * 0.7
  );
}
