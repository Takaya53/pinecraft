import { SplitMix64, type SeedInput } from "./random.ts";

const F2 = 0.5 * (Math.sqrt(3) - 1);
const G2 = (3 - Math.sqrt(3)) / 6;
const F3 = 1 / 3;
const G3 = 1 / 6;

const GRADIENTS_2D = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [Math.SQRT1_2, Math.SQRT1_2],
  [-Math.SQRT1_2, Math.SQRT1_2],
  [Math.SQRT1_2, -Math.SQRT1_2],
  [-Math.SQRT1_2, -Math.SQRT1_2]
];

const GRADIENTS_3D = [
  [1, 1, 0],
  [-1, 1, 0],
  [1, -1, 0],
  [-1, -1, 0],
  [1, 0, 1],
  [-1, 0, 1],
  [1, 0, -1],
  [-1, 0, -1],
  [0, 1, 1],
  [0, -1, 1],
  [0, 1, -1],
  [0, -1, -1]
];

export type NoiseSampler = {
  noise2(x: number, y: number): number;
  noise3(x: number, y: number, z: number): number;
};

export class OpenSimplex2Noise implements NoiseSampler {
  perm: Uint8Array;

  constructor(seed: SeedInput) {
    const random = new SplitMix64(seed);
    const source = new Uint8Array(256);
    for (let index = 0; index < source.length; index += 1) {
      source[index] = index;
    }

    for (let index = source.length - 1; index > 0; index -= 1) {
      const swapIndex = random.nextInt(index + 1);
      const temp = source[index];
      source[index] = source[swapIndex];
      source[swapIndex] = temp;
    }

    this.perm = new Uint8Array(512);
    for (let index = 0; index < this.perm.length; index += 1) {
      this.perm[index] = source[index & 255];
    }
  }

  noise2(x: number, y: number): number {
    const skew = (x + y) * F2;
    const i = Math.floor(x + skew);
    const j = Math.floor(y + skew);
    const unskew = (i + j) * G2;
    const x0 = x - (i - unskew);
    const y0 = y - (j - unskew);

    const i1 = x0 > y0 ? 1 : 0;
    const j1 = x0 > y0 ? 0 : 1;

    const x1 = x0 - i1 + G2;
    const y1 = y0 - j1 + G2;
    const x2 = x0 - 1 + 2 * G2;
    const y2 = y0 - 1 + 2 * G2;

    const ii = i & 255;
    const jj = j & 255;

    const n0 = this.corner2(ii, jj, x0, y0);
    const n1 = this.corner2(ii + i1, jj + j1, x1, y1);
    const n2 = this.corner2(ii + 1, jj + 1, x2, y2);

    return clampNoise((n0 + n1 + n2) * 70);
  }

  noise3(x: number, y: number, z: number): number {
    const skew = (x + y + z) * F3;
    const i = Math.floor(x + skew);
    const j = Math.floor(y + skew);
    const k = Math.floor(z + skew);
    const unskew = (i + j + k) * G3;
    const x0 = x - (i - unskew);
    const y0 = y - (j - unskew);
    const z0 = z - (k - unskew);

    let i1 = 0;
    let j1 = 0;
    let k1 = 0;
    let i2 = 0;
    let j2 = 0;
    let k2 = 0;

    if (x0 >= y0) {
      if (y0 >= z0) {
        i1 = 1;
        i2 = 1;
        j2 = 1;
      } else if (x0 >= z0) {
        i1 = 1;
        i2 = 1;
        k2 = 1;
      } else {
        k1 = 1;
        i2 = 1;
        k2 = 1;
      }
    } else if (y0 < z0) {
      k1 = 1;
      j2 = 1;
      k2 = 1;
    } else if (x0 < z0) {
      j1 = 1;
      j2 = 1;
      k2 = 1;
    } else {
      j1 = 1;
      i2 = 1;
      j2 = 1;
    }

    const x1 = x0 - i1 + G3;
    const y1 = y0 - j1 + G3;
    const z1 = z0 - k1 + G3;
    const x2 = x0 - i2 + 2 * G3;
    const y2 = y0 - j2 + 2 * G3;
    const z2 = z0 - k2 + 2 * G3;
    const x3 = x0 - 1 + 3 * G3;
    const y3 = y0 - 1 + 3 * G3;
    const z3 = z0 - 1 + 3 * G3;

    const ii = i & 255;
    const jj = j & 255;
    const kk = k & 255;

    const n0 = this.corner3(ii, jj, kk, x0, y0, z0);
    const n1 = this.corner3(ii + i1, jj + j1, kk + k1, x1, y1, z1);
    const n2 = this.corner3(ii + i2, jj + j2, kk + k2, x2, y2, z2);
    const n3 = this.corner3(ii + 1, jj + 1, kk + 1, x3, y3, z3);

    return clampNoise((n0 + n1 + n2 + n3) * 32);
  }

  corner2(i: number, j: number, x: number, y: number): number {
    const t = 0.5 - x * x - y * y;
    if (t < 0) {
      return 0;
    }

    const gradient = GRADIENTS_2D[this.perm[i + this.perm[j]] % GRADIENTS_2D.length];
    const t2 = t * t;
    return t2 * t2 * (gradient[0] * x + gradient[1] * y);
  }

  corner3(i: number, j: number, k: number, x: number, y: number, z: number): number {
    const t = 0.6 - x * x - y * y - z * z;
    if (t < 0) {
      return 0;
    }

    const gradient = GRADIENTS_3D[this.perm[i + this.perm[j + this.perm[k]]] % GRADIENTS_3D.length];
    const t2 = t * t;
    return t2 * t2 * (gradient[0] * x + gradient[1] * y + gradient[2] * z);
  }
}

export function createNoiseSampler(seed: SeedInput): NoiseSampler {
  return new OpenSimplex2Noise(seed);
}

function clampNoise(value: number): number {
  if (value < -1) {
    return -1;
  }
  if (value > 1) {
    return 1;
  }
  return value;
}
