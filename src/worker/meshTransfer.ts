import {
  type ChunkMesh,
  type ChunkMeshRenderSection,
  createEmptyChunkMesh,
  type MeshFaceDirection,
  type MeshFaceDirectionArray,
  type MeshLayer,
  type MeshRenderLayer,
  type RenderableChunkMesh
} from "../meshing/chunkMesher.ts";
import type { BlockRegistry } from "../block/blockRegistry.ts";
import { LIGHT_MAX } from "../core/constants.ts";
import { aoToBrightness } from "../meshing/ao.ts";
import { TERRAIN_TILE_KEYS, type TerrainTileKey } from "../render/terrainTiles.ts";

const LAYERS: readonly MeshRenderLayer[] = ["solid", "cutout", "translucent", "fluid"];
const SECTION_HEIGHT = 16;
const TILE_SIZE = 16;
type TileKey = TerrainTileKey;
type Rgb = { r: number; g: number; b: number };

const LAYER_COLORS: Record<MeshRenderLayer, Rgb> = {
  solid: rgb(0x8f8f86),
  cutout: rgb(0x4f9a47),
  translucent: rgb(0xa8d8ff),
  fluid: rgb(0x3d74d8)
};
const FACE_DIRECTION_CODES: Record<MeshFaceDirection, number> = {
  east: 0,
  west: 1,
  up: 2,
  down: 3,
  south: 4,
  north: 5
};

export const FACE_DIRECTIONS_BY_CODE: readonly MeshFaceDirection[] = [
  "east",
  "west",
  "up",
  "down",
  "south",
  "north"
];

export type TransferableChunkMesh = RenderableChunkMesh;

export function packChunkMeshForTransfer(
  mesh: ChunkMesh,
  registry?: BlockRegistry
): { mesh: TransferableChunkMesh; transfer: Transferable[] } {
  const transfer: Transferable[] = [];
  const renderSections = splitChunkMeshForTransfer(mesh, registry, transfer);
  return {
    mesh: {
      ...createEmptyChunkMesh(),
      renderSections
    },
    transfer
  };
}

function splitChunkMeshForTransfer(
  mesh: ChunkMesh,
  registry: BlockRegistry | undefined,
  transfer: Transferable[]
): ChunkMeshRenderSection[] {
  const sectionYs = new Set<number>();
  for (const layerName of LAYERS) {
    const layer = mesh[layerName];
    for (let faceIndex = 0; faceIndex < layer.faceDirections.length; faceIndex += 1) {
      sectionYs.add(faceSectionY(layer.positions, faceIndex));
    }
  }

  return Array.from(sectionYs)
    .sort((a, b) => a - b)
    .map((sectionY) => ({
      sectionY,
      layers: Object.fromEntries(
        LAYERS.map((layerName) => [layerName, packLayerSection(mesh[layerName], layerName, sectionY, registry, transfer)])
      ) as Record<MeshRenderLayer, MeshLayer>
    }));
}

function packLayerSection(
  layer: MeshLayer,
  layerName: MeshRenderLayer,
  sectionY: number,
  registry: BlockRegistry | undefined,
  transfer: Transferable[]
): MeshLayer {
  let faceCount = 0;
  for (let faceIndex = 0; faceIndex < layer.faceDirections.length; faceIndex += 1) {
    if (faceSectionY(layer.positions, faceIndex) === sectionY) {
      faceCount += 1;
    }
  }
  const packed = createPackedLayer(faceCount, Boolean(registry));
  if (faceCount === 0) {
    transferPackedLayer(packed, transfer);
    return packed;
  }

  let targetFace = 0;
  for (let faceIndex = 0; faceIndex < layer.faceDirections.length; faceIndex += 1) {
    if (faceSectionY(layer.positions, faceIndex) !== sectionY) {
      continue;
    }
    copyFaceToPackedLayer(layer, layerName, faceIndex, targetFace, packed, registry);
    targetFace += 1;
  }
  transferPackedLayer(packed, transfer);
  return packed;
}

function createPackedLayer(faceCount: number, includeRenderAttributes: boolean): MeshLayer {
  const vertexCount = faceCount * 4;
  return {
    positions: new Float32Array(vertexCount * 3),
    normals: new Float32Array(vertexCount * 3),
    indices: new Uint32Array(faceCount * 6),
    stateIds: new Uint16Array(vertexCount),
    skyLight: new Uint8Array(vertexCount),
    blockLight: new Uint8Array(vertexCount),
    ao: new Uint8Array(vertexCount),
    faceDirections: new Uint8Array(faceCount),
    colors: includeRenderAttributes ? new Float32Array(vertexCount * 3) : undefined,
    uvs: includeRenderAttributes ? new Float32Array(vertexCount * 2) : undefined
  };
}

function copyFaceToPackedLayer(
  source: MeshLayer,
  layerName: MeshRenderLayer,
  sourceFace: number,
  targetFace: number,
  target: MeshLayer,
  registry: BlockRegistry | undefined
): void {
  const sourceVertex = sourceFace * 4;
  const targetVertex = targetFace * 4;
  copyNumbers(source.positions, sourceVertex * 3, target.positions, targetVertex * 3, 12);
  copyNumbers(source.normals, sourceVertex * 3, target.normals, targetVertex * 3, 12);
  copyNumbers(source.stateIds, sourceVertex, target.stateIds, targetVertex, 4);
  copyNumbers(source.skyLight, sourceVertex, target.skyLight, targetVertex, 4);
  copyNumbers(source.blockLight, sourceVertex, target.blockLight, targetVertex, 4);
  copyNumbers(source.ao, sourceVertex, target.ao, targetVertex, 4);
  (target.faceDirections as Uint8Array)[targetFace] = faceDirectionCodeAt(source.faceDirections, sourceFace);

  const firstVertex = targetFace * 4;
  const indexOffset = targetFace * 6;
  target.indices[indexOffset] = firstVertex;
  target.indices[indexOffset + 1] = firstVertex + 2;
  target.indices[indexOffset + 2] = firstVertex + 1;
  target.indices[indexOffset + 3] = firstVertex;
  target.indices[indexOffset + 4] = firstVertex + 3;
  target.indices[indexOffset + 5] = firstVertex + 2;

  if (registry && target.colors && target.uvs) {
    writeFaceColors(source, sourceVertex, target.colors, targetVertex, registry, layerName);
    writeFaceUvs(source, sourceVertex, sourceFace, target.uvs, targetVertex, registry, layerName);
  }
}

function writeFaceColors(
  source: MeshLayer,
  sourceVertex: number,
  targetColors: MeshLayer["colors"],
  targetVertex: number,
  registry: BlockRegistry,
  layerName: MeshRenderLayer
): void {
  if (!targetColors) {
    return;
  }
  const fallback = LAYER_COLORS[layerName];
  for (let vertex = 0; vertex < 4; vertex += 1) {
    const sourceIndex = sourceVertex + vertex;
    const light = Math.max(source.skyLight[sourceIndex], source.blockLight[sourceIndex]) / LIGHT_MAX;
    const brightness = Math.max(0.12, light * aoToBrightness(source.ao[sourceIndex]));
    const color = colorForState(registry, source.stateIds[sourceIndex], fallback);
    const offset = (targetVertex + vertex) * 3;
    targetColors[offset] = color.r * brightness;
    targetColors[offset + 1] = color.g * brightness;
    targetColors[offset + 2] = color.b * brightness;
  }
}

function writeFaceUvs(
  source: MeshLayer,
  sourceVertex: number,
  sourceFace: number,
  targetUvs: MeshLayer["uvs"],
  targetVertex: number,
  registry: BlockRegistry,
  layerName: MeshRenderLayer
): void {
  if (!targetUvs) {
    return;
  }
  const vertexUvOrder = [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1]
  ] as const;
  const direction = faceDirectionAt(source.faceDirections, sourceFace);
  const tileKey = tileForState(registry, source.stateIds[sourceVertex], direction);
  for (let vertex = 0; vertex < 4; vertex += 1) {
    const [u, v] = vertexUvOrder[vertex];
    const uv = layerName === "fluid" ? { u, v } : tileUv(tileKey, u, v);
    const offset = (targetVertex + vertex) * 2;
    targetUvs[offset] = uv.u;
    targetUvs[offset + 1] = uv.v;
  }
}

function transferPackedLayer(layer: MeshLayer, transfer: Transferable[]): void {
  const positions = layer.positions as Float32Array;
  const normals = layer.normals as Float32Array;
  const indices = layer.indices as Uint32Array;
  const stateIds = layer.stateIds as Uint16Array;
  const skyLight = layer.skyLight as Uint8Array;
  const blockLight = layer.blockLight as Uint8Array;
  const ao = layer.ao as Uint8Array;
  const faceDirections = layer.faceDirections as Uint8Array;
  transfer.push(
    positions.buffer,
    normals.buffer,
    indices.buffer,
    stateIds.buffer,
    skyLight.buffer,
    blockLight.buffer,
    ao.buffer,
    faceDirections.buffer
  );
  if (layer.colors) {
    transfer.push((layer.colors as Float32Array).buffer);
  }
  if (layer.uvs) {
    transfer.push((layer.uvs as Float32Array).buffer);
  }
}

function colorForState(registry: BlockRegistry, stateId: number, fallback: Rgb): Rgb {
  const typeId = registry.getState(stateId).typeId;
  switch (typeId) {
    case "grass":
      return rgb(0x5f9f4a);
    case "dirt":
      return rgb(0x765039);
    case "stone":
      return rgb(0x858585);
    case "sand":
      return rgb(0xd7c37b);
    case "gravel":
      return rgb(0x7b7b75);
    case "snow":
      return rgb(0xe6edf1);
    case "water":
      return rgb(0x386ed8);
    case "lava":
      return rgb(0xff6f1a);
    case "log":
      return rgb(0x7a5735);
    case "planks":
      return rgb(0xb7844e);
    case "cobblestone":
      return rgb(0x74746f);
    case "leaves":
      return rgb(0x3f8f43);
    case "coal_ore":
      return rgb(0x4f4f4f);
    case "iron_ore":
      return rgb(0xa78668);
    case "gold_ore":
      return rgb(0xd2a747);
    case "diamond_ore":
      return rgb(0x63cdd0);
    case "torch":
      return rgb(0xffc857);
    case "lamp":
      return rgb(0xffd166);
    case "crafting_table":
      return rgb(0x9b6a3b);
    case "furnace":
      return rgb(0x5d5d58);
    case "chest":
      return rgb(0xa66d35);
    case "bed":
      return rgb(0xb73535);
    case "door":
      return rgb(0x8f5a2f);
    case "bell":
      return rgb(0xd9a640);
    case "composter":
      return rgb(0x8b5c31);
    case "lectern":
      return rgb(0x9a6a3e);
    case "stonecutter":
      return rgb(0x8b8a82);
    case "farmland":
      return rgb(0x6b4a2f);
    case "wheat":
      return rgb(0xd9b64a);
    default:
      return fallback;
  }
}

function tileForState(registry: BlockRegistry, stateId: number, faceDirection: MeshFaceDirection): TileKey {
  const typeId = registry.getState(stateId).typeId;
  switch (typeId) {
    case "grass":
      return faceDirection === "up" ? "grass_top" : faceDirection === "down" ? "dirt" : "grass_side";
    case "dirt":
      return "dirt";
    case "stone":
      return "stone";
    case "sand":
      return "sand";
    case "gravel":
      return "gravel";
    case "snow":
      return "snow";
    case "water":
      return "water";
    case "lava":
      return "lava";
    case "log":
      return faceDirection === "up" || faceDirection === "down" ? "log_top" : "log_side";
    case "planks":
      return "planks";
    case "cobblestone":
      return "cobblestone";
    case "leaves":
      return "leaves";
    case "coal_ore":
      return "coal_ore";
    case "iron_ore":
      return "iron_ore";
    case "gold_ore":
      return "gold_ore";
    case "diamond_ore":
      return "diamond_ore";
    case "torch":
      return "torch";
    case "lamp":
      return "lamp";
    case "crafting_table":
      return faceDirection === "up" ? "crafting_table" : "log_side";
    case "furnace":
      return "furnace";
    case "chest":
      return "chest";
    case "bed":
      return "bed";
    case "door":
      return "door";
    case "bell":
      return "bell";
    case "composter":
      return faceDirection === "up" ? "dirt" : "composter";
    case "lectern":
      return faceDirection === "up" ? "lectern" : "planks";
    case "stonecutter":
      return faceDirection === "up" ? "stonecutter" : "cobblestone";
    case "farmland":
      return faceDirection === "up" ? "farmland" : "dirt";
    case "wheat": {
      const age = registry.getState(stateId).properties.age;
      if (typeof age === "number" && age < 3) {
        return "wheat_young";
      }
      if (typeof age === "number" && age < 6) {
        return "wheat_mid";
      }
      return "wheat";
    }
    default:
      return "stone";
  }
}

function tileUv(tileKey: TileKey, u: number, v: number): { u: number; v: number } {
  const tileIndex = TERRAIN_TILE_KEYS.indexOf(tileKey);
  const atlasWidth = TERRAIN_TILE_KEYS.length * TILE_SIZE;
  const halfPixelU = 0.5 / atlasWidth;
  const halfPixelV = 0.5 / TILE_SIZE;
  const minU = tileIndex / TERRAIN_TILE_KEYS.length + halfPixelU;
  const maxU = (tileIndex + 1) / TERRAIN_TILE_KEYS.length - halfPixelU;
  const minV = halfPixelV;
  const maxV = 1 - halfPixelV;
  return {
    u: minU + (maxU - minU) * u,
    v: minV + (maxV - minV) * v
  };
}

function rgb(hex: number): Rgb {
  return {
    r: ((hex >> 16) & 0xff) / 255,
    g: ((hex >> 8) & 0xff) / 255,
    b: (hex & 0xff) / 255
  };
}

function faceDirectionAt(directions: MeshFaceDirectionArray, index: number): MeshFaceDirection {
  const value = directions[index];
  return typeof value === "number" ? FACE_DIRECTIONS_BY_CODE[value] : value;
}

function faceDirectionCodeAt(directions: MeshFaceDirectionArray, index: number): number {
  const value = directions[index];
  return typeof value === "number" ? value : FACE_DIRECTION_CODES[value];
}

function faceSectionY(positions: ArrayLike<number>, faceIndex: number): number {
  const vertexOffset = faceIndex * 12;
  let minY = positions[vertexOffset + 1];
  minY = Math.min(minY, positions[vertexOffset + 4], positions[vertexOffset + 7], positions[vertexOffset + 10]);
  return Math.floor(minY / SECTION_HEIGHT);
}

function copyNumbers(
  source: ArrayLike<number>,
  sourceOffset: number,
  target: { [index: number]: number },
  targetOffset: number,
  count: number
): void {
  for (let index = 0; index < count; index += 1) {
    target[targetOffset + index] = source[sourceOffset + index];
  }
}
