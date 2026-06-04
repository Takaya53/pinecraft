import { LIGHT_MAX, LIGHT_MIN, requireSharedArrayBuffer } from "../core/constants.ts";

export class NibbleArray {
  length: number;
  bytes: Uint8Array;

  constructor(length: number, buffer?: SharedArrayBuffer) {
    if (!Number.isInteger(length) || length <= 0) {
      throw new RangeError(`nibble array length must be positive: ${length}`);
    }
    this.length = length;
    const byteLength = Math.ceil(length / 2);
    const backingBuffer = buffer ?? new (requireSharedArrayBuffer())(byteLength);
    this.bytes = new Uint8Array(backingBuffer);

    if (this.bytes.length !== byteLength) {
      throw new RangeError(`buffer has ${this.bytes.length} bytes, expected ${byteLength}`);
    }
  }

  get(index: number): number {
    this.assertIndex(index);
    const byteIndex = index >> 1;
    const byte = Atomics.load(this.bytes, byteIndex);
    return index & 1 ? (byte >> 4) & 0x0f : byte & 0x0f;
  }

  set(index: number, value: number): void {
    this.assertIndex(index);
    this.assertValue(value);
    const byteIndex = index >> 1;
    const current = Atomics.load(this.bytes, byteIndex);
    const next =
      index & 1 ? (current & 0x0f) | (value << 4) : (current & 0xf0) | value;
    Atomics.store(this.bytes, byteIndex, next);
  }

  fill(value: number): void {
    this.assertValue(value);
    const packed = value | (value << 4);
    for (let index = 0; index < this.bytes.length; index += 1) {
      Atomics.store(this.bytes, index, packed);
    }
  }

  assertIndex(index: number): void {
    if (!Number.isInteger(index) || index < 0 || index >= this.length) {
      throw new RangeError(`nibble index out of range: ${index}`);
    }
  }

  assertValue(value: number): void {
    if (!Number.isInteger(value) || value < LIGHT_MIN || value > LIGHT_MAX) {
      throw new RangeError(`nibble value must be ${LIGHT_MIN}..${LIGHT_MAX}: ${value}`);
    }
  }
}
