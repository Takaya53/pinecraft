const MASK_64 = (1n << 64n) - 1n;
const SPLITMIX_INCREMENT = 0x9e3779b97f4a7c15n;
const FNV_OFFSET = 0xcbf29ce484222325n;
const FNV_PRIME = 0x100000001b3n;

export type SeedInput = bigint | number | string;

export function normalizeSeed(seed: SeedInput): bigint {
  if (typeof seed === "bigint") {
    return seed & MASK_64;
  }

  if (typeof seed === "number") {
    if (!Number.isFinite(seed)) {
      throw new RangeError(`seed must be finite: ${seed}`);
    }
    return BigInt(Math.trunc(seed)) & MASK_64;
  }

  let hash = FNV_OFFSET;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= BigInt(seed.charCodeAt(index));
    hash = (hash * FNV_PRIME) & MASK_64;
  }
  return hash;
}

export function mix64(value: bigint): bigint {
  let z = value & MASK_64;
  z = ((z ^ (z >> 30n)) * 0xbf58476d1ce4e5b9n) & MASK_64;
  z = ((z ^ (z >> 27n)) * 0x94d049bb133111ebn) & MASK_64;
  return (z ^ (z >> 31n)) & MASK_64;
}

export function deriveSeed(seed: SeedInput, salt: string): bigint {
  return mix64(normalizeSeed(seed) ^ normalizeSeed(salt));
}

export class SplitMix64 {
  state: bigint;

  constructor(seed: SeedInput) {
    this.state = normalizeSeed(seed);
  }

  nextBigUint64(): bigint {
    this.state = (this.state + SPLITMIX_INCREMENT) & MASK_64;
    return mix64(this.state);
  }

  nextFloat(): number {
    const high53Bits = this.nextBigUint64() >> 11n;
    return Number(high53Bits) / 9007199254740992;
  }

  nextInt(maxExclusive: number): number {
    if (!Number.isInteger(maxExclusive) || maxExclusive <= 0) {
      throw new RangeError(`maxExclusive must be a positive integer: ${maxExclusive}`);
    }
    return Math.floor(this.nextFloat() * maxExclusive);
  }

  fork(salt: string): SplitMix64 {
    return new SplitMix64(deriveSeed(this.nextBigUint64(), salt));
  }
}
