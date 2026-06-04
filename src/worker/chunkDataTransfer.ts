import { SECTION_VOLUME } from "../core/constants.ts";
import { ChunkColumn } from "../world/Chunk.ts";
import { HEIGHTMAP_TYPES, type HeightmapType } from "../world/Heightmap.ts";
import { PackedArray } from "../world/packedArray.ts";
import type { ChunkStatus } from "../world/ChunkStatus.ts";
import type { StateId } from "../block/blockState.ts";

export type SectionBlockTransfer = {
  sectionY: number;
  palette: StateId[];
  bitsPerEntry: number;
  words: BigUint64Array;
};

export type HeightmapTransfer = {
  type: HeightmapType;
  values: Int16Array;
};

export type ChunkDataTransfer = {
  chunkX: number;
  chunkZ: number;
  status: ChunkStatus;
  sections: SectionBlockTransfer[];
  heightmaps: HeightmapTransfer[];
};

export function packChunkDataForTransfer(chunk: ChunkColumn): { data: ChunkDataTransfer; transfer: Transferable[] } {
  const transfer: Transferable[] = [];
  const sections = chunk.sections.map((section) => {
    const words = new BigUint64Array(section.blocks.words.length);
    words.set(section.blocks.words);
    transfer.push(words.buffer);
    return {
      sectionY: section.sectionY,
      palette: [...section.palette],
      bitsPerEntry: section.blocks.bitsPerEntry,
      words
    };
  });

  const heightmaps = HEIGHTMAP_TYPES.map((type) => {
    const source = chunk.heightmaps.requireMap(type);
    const values = new Int16Array(source.length);
    values.set(source);
    transfer.push(values.buffer);
    return { type, values };
  });

  return {
    data: {
      chunkX: chunk.chunkX,
      chunkZ: chunk.chunkZ,
      status: chunk.status,
      sections,
      heightmaps
    },
    transfer
  };
}

export function hydrateChunkDataTransfer(chunk: ChunkColumn, data: ChunkDataTransfer): void {
  if (chunk.blockDeltas.size > 0) {
    return;
  }

  for (const sectionData of data.sections) {
    const section = chunk.getSection(sectionData.sectionY);
    section.palette = [...sectionData.palette];
    section.paletteIndexByState = new Map(section.palette.map((stateId, index) => [stateId, index]));
    section.blocks = new PackedArray(SECTION_VOLUME, sectionData.bitsPerEntry);
    section.blocks.words.set(sectionData.words);
  }

  for (const heightmapData of data.heightmaps) {
    chunk.heightmaps.requireMap(heightmapData.type).set(heightmapData.values);
  }

  chunk.status = data.status;
  chunk.dirty = false;
}
