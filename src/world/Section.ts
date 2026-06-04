import { blockIndex, SECTION_VOLUME, assertInteger } from "../core/constants.ts";
import { AIR_STATE_ID, type StateId } from "../block/blockState.ts";
import { NibbleArray } from "./nibbleArray.ts";
import { PackedArray, bitsNeededForPaletteSize } from "./packedArray.ts";

export type SectionSnapshot = {
  sectionY: number;
  palette: StateId[];
  blocks: ReturnType<PackedArray["snapshot"]>;
  skyLight: number[];
  blockLight: number[];
};

export class Section {
  sectionY: number;
  palette: StateId[];
  paletteIndexByState: Map<StateId, number>;
  blocks: PackedArray;
  skyLight: NibbleArray;
  blockLight: NibbleArray;

  constructor(options: { sectionY: number; defaultStateId?: StateId }) {
    assertInteger("sectionY", options.sectionY);
    const defaultStateId = options.defaultStateId ?? AIR_STATE_ID;
    this.sectionY = options.sectionY;
    this.palette = [defaultStateId];
    this.paletteIndexByState = new Map([[defaultStateId, 0]]);
    this.blocks = new PackedArray(SECTION_VOLUME, 4);
    this.skyLight = new NibbleArray(SECTION_VOLUME);
    this.blockLight = new NibbleArray(SECTION_VOLUME);
  }

  getStateId(x: number, y: number, z: number): StateId {
    return this.getStateIdByIndex(blockIndex(x, y, z));
  }

  setStateId(x: number, y: number, z: number, stateId: StateId): void {
    this.setStateIdByIndex(blockIndex(x, y, z), stateId);
  }

  getStateIdByIndex(index: number): StateId {
    const paletteIndex = this.blocks.get(index);
    const stateId = this.palette[paletteIndex];
    if (stateId === undefined) {
      throw new Error(`section palette index missing: ${paletteIndex}`);
    }
    return stateId;
  }

  setStateIdByIndex(index: number, stateId: StateId): void {
    assertInteger("stateId", stateId);
    const paletteIndex = this.getOrInsertPaletteIndex(stateId);
    this.blocks.set(index, paletteIndex);
  }

  getSkyLight(x: number, y: number, z: number): number {
    return this.skyLight.get(blockIndex(x, y, z));
  }

  setSkyLight(x: number, y: number, z: number, value: number): void {
    this.skyLight.set(blockIndex(x, y, z), value);
  }

  getBlockLight(x: number, y: number, z: number): number {
    return this.blockLight.get(blockIndex(x, y, z));
  }

  setBlockLight(x: number, y: number, z: number, value: number): void {
    this.blockLight.set(blockIndex(x, y, z), value);
  }

  fillState(stateId: StateId): void {
    this.palette = [stateId];
    this.paletteIndexByState = new Map([[stateId, 0]]);
    this.blocks = new PackedArray(SECTION_VOLUME, 4);
  }

  snapshot(): SectionSnapshot {
    const skyLight = [];
    const blockLight = [];
    for (let index = 0; index < SECTION_VOLUME; index += 1) {
      skyLight.push(this.skyLight.get(index));
      blockLight.push(this.blockLight.get(index));
    }

    return {
      sectionY: this.sectionY,
      palette: [...this.palette],
      blocks: this.blocks.snapshot(),
      skyLight,
      blockLight
    };
  }

  getOrInsertPaletteIndex(stateId: StateId): number {
    const existing = this.paletteIndexByState.get(stateId);
    if (existing !== undefined) {
      return existing;
    }

    const paletteIndex = this.palette.length;
    this.palette.push(stateId);
    this.paletteIndexByState.set(stateId, paletteIndex);

    const requiredBits = bitsNeededForPaletteSize(this.palette.length);
    if (requiredBits > this.blocks.bitsPerEntry) {
      this.blocks = this.blocks.resize(requiredBits);
    }

    return paletteIndex;
  }
}
