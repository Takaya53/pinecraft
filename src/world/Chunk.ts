import {
  CHUNK_SIZE,
  SECTION_SIZE,
  WORLD_MAX_SECTION_Y,
  WORLD_MAX_Y,
  WORLD_MIN_SECTION_Y,
  WORLD_MIN_Y,
  WORLD_SECTION_COUNT,
  assertInRange,
  sectionYToIndex,
  worldYToLocalBlockY,
  worldYToSectionY
} from "../core/constants.ts";
import type { BlockRegistry } from "../block/blockRegistry.ts";
import { AIR_STATE_ID, type StateId } from "../block/blockState.ts";
import {
  assertCanAdvanceChunkStatus,
  isChunkStatusAtLeast,
  type ChunkStatus
} from "./ChunkStatus.ts";
import { HeightmapSet, type HeightPredicate, type HeightmapType } from "./Heightmap.ts";
import { Section } from "./Section.ts";

export type ChunkBlockDelta = {
  localX: number;
  worldY: number;
  localZ: number;
  stateId: StateId;
};

export class ChunkColumn {
  chunkX: number;
  chunkZ: number;
  status: ChunkStatus;
  sections: Section[];
  heightmaps: HeightmapSet;
  blockDeltas: Map<string, ChunkBlockDelta>;
  dirty: boolean;

  constructor(options: { chunkX: number; chunkZ: number; defaultStateId?: StateId }) {
    this.chunkX = options.chunkX;
    this.chunkZ = options.chunkZ;
    this.status = "UNLOADED";
    this.sections = [];
    this.heightmaps = new HeightmapSet();
    this.blockDeltas = new Map();
    this.dirty = false;

    for (let index = 0; index < WORLD_SECTION_COUNT; index += 1) {
      this.sections.push(
        new Section({
          sectionY: WORLD_MIN_SECTION_Y + index,
          defaultStateId: options.defaultStateId ?? AIR_STATE_ID
        })
      );
    }
  }

  getSection(sectionY: number): Section {
    assertInRange("sectionY", sectionY, WORLD_MIN_SECTION_Y, WORLD_MAX_SECTION_Y);
    return this.sections[sectionYToIndex(sectionY)];
  }

  getSectionForWorldY(worldY: number): Section {
    assertInRange("worldY", worldY, WORLD_MIN_Y, WORLD_MAX_Y);
    return this.getSection(worldYToSectionY(worldY));
  }

  getStateId(localX: number, worldY: number, localZ: number): StateId {
    assertLocalChunkXZ(localX, localZ);
    const section = this.getSectionForWorldY(worldY);
    return section.getStateId(localX, worldYToLocalBlockY(worldY), localZ);
  }

  setStateId(localX: number, worldY: number, localZ: number, stateId: StateId): void {
    assertLocalChunkXZ(localX, localZ);
    const section = this.getSectionForWorldY(worldY);
    section.setStateId(localX, worldYToLocalBlockY(worldY), localZ, stateId);
    this.blockDeltas.set(deltaKey(localX, worldY, localZ), {
      localX,
      worldY,
      localZ,
      stateId
    });
    this.dirty = true;
  }

  setGeneratedStateId(localX: number, worldY: number, localZ: number, stateId: StateId): void {
    assertLocalChunkXZ(localX, localZ);
    const section = this.getSectionForWorldY(worldY);
    section.setStateId(localX, worldYToLocalBlockY(worldY), localZ, stateId);
    this.dirty = true;
  }

  getSkyLight(localX: number, worldY: number, localZ: number): number {
    assertLocalChunkXZ(localX, localZ);
    const section = this.getSectionForWorldY(worldY);
    return section.getSkyLight(localX, worldYToLocalBlockY(worldY), localZ);
  }

  setSkyLight(localX: number, worldY: number, localZ: number, value: number): void {
    assertLocalChunkXZ(localX, localZ);
    const section = this.getSectionForWorldY(worldY);
    section.setSkyLight(localX, worldYToLocalBlockY(worldY), localZ, value);
  }

  getBlockLight(localX: number, worldY: number, localZ: number): number {
    assertLocalChunkXZ(localX, localZ);
    const section = this.getSectionForWorldY(worldY);
    return section.getBlockLight(localX, worldYToLocalBlockY(worldY), localZ);
  }

  setBlockLight(localX: number, worldY: number, localZ: number, value: number): void {
    assertLocalChunkXZ(localX, localZ);
    const section = this.getSectionForWorldY(worldY);
    section.setBlockLight(localX, worldYToLocalBlockY(worldY), localZ, value);
  }

  fillState(stateId: StateId): void {
    for (const section of this.sections) {
      section.fillState(stateId);
      section.skyLight.fill(0);
      section.blockLight.fill(0);
    }
    this.blockDeltas.clear();
    this.dirty = true;
  }

  advanceStatus(to: ChunkStatus): void {
    assertCanAdvanceChunkStatus(this.status, to);
    this.status = to;
  }

  markStatusAtLeast(status: ChunkStatus): void {
    if (!isChunkStatusAtLeast(this.status, status)) {
      this.status = status;
    }
  }

  recomputeHeightmap(
    type: HeightmapType,
    localX: number,
    localZ: number,
    predicate: HeightPredicate
  ): number {
    assertLocalChunkXZ(localX, localZ);
    return this.heightmaps.recomputeColumn(
      type,
      localX,
      localZ,
      (worldY) => this.getStateId(localX, worldY, localZ),
      predicate
    );
  }

  recomputeHeightmapsFromRegistry(registry: BlockRegistry): void {
    for (let localZ = 0; localZ < CHUNK_SIZE; localZ += 1) {
      for (let localX = 0; localX < CHUNK_SIZE; localX += 1) {
        this.recomputeHeightmap("WORLD_SURFACE", localX, localZ, (stateId) => {
          const definition = registry.getDefinitionForState(stateId);
          return definition.renderLayer !== "none";
        });
        this.recomputeHeightmap("OCEAN_FLOOR", localX, localZ, (stateId) => {
          const definition = registry.getDefinitionForState(stateId);
          return definition.renderLayer !== "none" && !definition.liquid;
        });
        this.recomputeHeightmap("MOTION_BLOCKING", localX, localZ, (stateId) => {
          const definition = registry.getDefinitionForState(stateId);
          return definition.collision !== "none" || definition.liquid === true;
        });
        this.recomputeHeightmap("MOTION_BLOCKING_NO_LEAVES", localX, localZ, (stateId) => {
          const state = registry.getState(stateId);
          const definition = registry.getDefinitionForState(stateId);
          return state.typeId !== "leaves" && (definition.collision !== "none" || definition.liquid === true);
        });
      }
    }
  }
}

export function assertLocalChunkXZ(localX: number, localZ: number): void {
  assertInRange("localX", localX, 0, CHUNK_SIZE - 1);
  assertInRange("localZ", localZ, 0, CHUNK_SIZE - 1);
}

export function forEachChunkBlock(callback: (localX: number, worldY: number, localZ: number) => void): void {
  for (let worldY = WORLD_MIN_Y; worldY <= WORLD_MAX_Y; worldY += 1) {
    for (let localZ = 0; localZ < SECTION_SIZE; localZ += 1) {
      for (let localX = 0; localX < SECTION_SIZE; localX += 1) {
        callback(localX, worldY, localZ);
      }
    }
  }
}

function deltaKey(localX: number, worldY: number, localZ: number): string {
  return `${localX},${worldY},${localZ}`;
}
