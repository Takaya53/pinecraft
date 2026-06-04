import { requireSharedArrayBuffer } from "../core/constants.ts";

export type PackedArraySnapshot = {
  length: number;
  bitsPerEntry: number;
  words: bigint[];
};

export class PackedArray {
  length: number;
  bitsPerEntry: number;
  entriesPerWord: number;
  mask: bigint;
  words: BigUint64Array;

  constructor(length: number, bitsPerEntry: number, buffer?: SharedArrayBuffer) {
    validatePackedArrayConfig(length, bitsPerEntry);
    this.length = length;
    this.bitsPerEntry = bitsPerEntry;
    this.entriesPerWord = Math.floor(64 / bitsPerEntry);
    this.mask = (1n << BigInt(bitsPerEntry)) - 1n;

    const wordCount = wordCountFor(length, bitsPerEntry);
    const backingBuffer =
      buffer ?? new (requireSharedArrayBuffer())(wordCount * BigUint64Array.BYTES_PER_ELEMENT);
    this.words = new BigUint64Array(backingBuffer);

    if (this.words.length !== wordCount) {
      throw new RangeError(`buffer has ${this.words.length} words, expected ${wordCount}`);
    }
  }

  get(index: number): number {
    this.assertIndex(index);
    const wordIndex = Math.floor(index / this.entriesPerWord);
    const shift = BigInt((index % this.entriesPerWord) * this.bitsPerEntry);
    const word = Atomics.load(this.words, wordIndex);
    return Number((word >> shift) & this.mask);
  }

  set(index: number, value: number): void {
    this.assertIndex(index);
    this.assertValue(value);

    const wordIndex = Math.floor(index / this.entriesPerWord);
    const shift = BigInt((index % this.entriesPerWord) * this.bitsPerEntry);
    const clearMask = ~(this.mask << shift);
    const encoded = BigInt(value) << shift;
    const current = Atomics.load(this.words, wordIndex);
    const next = (current & clearMask) | encoded;
    Atomics.store(this.words, wordIndex, next);
  }

  resize(bitsPerEntry: number): PackedArray {
    const resized = new PackedArray(this.length, bitsPerEntry);
    for (let index = 0; index < this.length; index += 1) {
      resized.set(index, this.get(index));
    }
    return resized;
  }

  snapshot(): PackedArraySnapshot {
    return {
      length: this.length,
      bitsPerEntry: this.bitsPerEntry,
      words: Array.from(this.words)
    };
  }

  assertIndex(index: number): void {
    if (!Number.isInteger(index) || index < 0 || index >= this.length) {
      throw new RangeError(`packed index out of range: ${index}`);
    }
  }

  assertValue(value: number): void {
    if (!Number.isInteger(value) || value < 0 || BigInt(value) > this.mask) {
      throw new RangeError(`packed value does not fit in ${this.bitsPerEntry} bits: ${value}`);
    }
  }
}

export function bitsNeededForPaletteSize(size: number): number {
  if (!Number.isInteger(size) || size <= 0) {
    throw new RangeError(`palette size must be positive: ${size}`);
  }
  return Math.max(4, Math.ceil(Math.log2(size)));
}

export function wordCountFor(length: number, bitsPerEntry: number): number {
  validatePackedArrayConfig(length, bitsPerEntry);
  return Math.ceil(length / Math.floor(64 / bitsPerEntry));
}

function validatePackedArrayConfig(length: number, bitsPerEntry: number): void {
  if (!Number.isInteger(length) || length <= 0) {
    throw new RangeError(`length must be positive: ${length}`);
  }
  if (!Number.isInteger(bitsPerEntry) || bitsPerEntry < 1 || bitsPerEntry > 32) {
    throw new RangeError(`bitsPerEntry must be 1..32: ${bitsPerEntry}`);
  }
  if (Math.floor(64 / bitsPerEntry) < 1) {
    throw new RangeError(`bitsPerEntry leaves no entries per word: ${bitsPerEntry}`);
  }
}
