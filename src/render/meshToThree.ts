import * as THREE from "three";
import { LIGHT_MAX } from "../core/constants.ts";
import { type ChunkMesh, type MeshFaceDirection, type MeshFaceDirectionArray, type MeshLayer } from "../meshing/chunkMesher.ts";
import { aoToBrightness } from "../meshing/ao.ts";
import type { BlockRegistry } from "../block/blockRegistry.ts";
import { FACE_DIRECTIONS_BY_CODE } from "../worker/meshTransfer.ts";
import { TERRAIN_TILE_KEYS, type TerrainTileKey } from "./terrainTiles.ts";

const LAYER_COLORS = {
  solid: new THREE.Color(0x8f8f86),
  cutout: new THREE.Color(0x4f9a47),
  translucent: new THREE.Color(0xa8d8ff),
  fluid: new THREE.Color(0x3d74d8)
};

const LAYERS = ["solid", "cutout", "translucent", "fluid"] as const;
const SECTION_HEIGHT = 16;
const TILE_SIZE = 16;
type TileKey = TerrainTileKey;

let terrainAtlasTexture: THREE.CanvasTexture | null = null;
let waterSurfaceTexture: THREE.CanvasTexture | null = null;
const sharedLayerMaterials = new Map<keyof ChunkMesh, THREE.MeshBasicMaterial>();
const stateColorCache = new Map<string, THREE.Color>();
const tileForStateCache = new Map<string, TileKey>();
const FACE_DIRECTION_CODES: Record<MeshFaceDirection, number> = {
  east: 0,
  west: 1,
  up: 2,
  down: 3,
  south: 4,
  north: 5
};

export function chunkMeshToThree(mesh: ChunkMesh, registry?: BlockRegistry): THREE.Group {
  const group = new THREE.Group();
  group.name = "chunk-mesh";
  const atlas = getTerrainAtlasTexture();
  const water = getWaterSurfaceTexture();

  if (mesh.renderSections && mesh.renderSections.length > 0) {
    for (const section of mesh.renderSections) {
      for (const layerName of LAYERS) {
        const layer = section.layers[layerName];
        if (layer.indices.length === 0) {
          continue;
        }
        const material = getSharedLayerMaterial(layerName, layerName === "fluid" ? water : atlas);
        const geometry = meshLayerToGeometry(layer, LAYER_COLORS[layerName], registry, layerName, section.sectionY);
        const object = new THREE.Mesh(geometry, material);
        object.name = `chunk-layer-${layerName}-section-${section.sectionY}`;
        group.add(object);
      }
    }
    return group;
  }

  for (const layerName of LAYERS) {
    const layer = mesh[layerName];
    if (layer.indices.length === 0) {
      continue;
    }

    const material = getSharedLayerMaterial(layerName, layerName === "fluid" ? water : atlas);
    for (const section of splitLayerByVerticalSection(layer)) {
      const geometry = meshLayerToGeometry(section.layer, LAYER_COLORS[layerName], registry, layerName, section.sectionY);
      const object = new THREE.Mesh(geometry, material);
      object.name = `chunk-layer-${layerName}-section-${section.sectionY}`;
      group.add(object);
    }
  }

  return group;
}

function splitLayerByVerticalSection(layer: MeshLayer): { sectionY: number; layer: MeshLayer }[] {
  const faceCount = layer.faceDirections.length;
  if (faceCount === 0) {
    return [];
  }

  const counts = new Map<number, number>();
  for (let faceIndex = 0; faceIndex < faceCount; faceIndex += 1) {
    const sectionY = faceSectionY(layer.positions, faceIndex);
    counts.set(sectionY, (counts.get(sectionY) ?? 0) + 1);
  }

  if (counts.size === 1) {
    return [{ sectionY: counts.keys().next().value as number, layer }];
  }

  const sections = new Map<number, SectionLayerBuilder>();
  for (const [sectionY, count] of counts) {
    sections.set(sectionY, createSectionLayerBuilder(sectionY, count, Boolean(layer.colors), Boolean(layer.uvs)));
  }

  for (let faceIndex = 0; faceIndex < faceCount; faceIndex += 1) {
    const sectionY = faceSectionY(layer.positions, faceIndex);
    const builder = sections.get(sectionY);
    if (!builder) {
      continue;
    }
    copyFaceToSection(layer, faceIndex, builder);
  }

  return Array.from(sections.values())
    .sort((a, b) => a.sectionY - b.sectionY)
    .map((builder) => ({
      sectionY: builder.sectionY,
      layer: {
        positions: builder.positions,
        normals: builder.normals,
        indices: builder.indices,
        stateIds: builder.stateIds,
        skyLight: builder.skyLight,
        blockLight: builder.blockLight,
        ao: builder.ao,
        faceDirections: builder.faceDirections,
        colors: builder.colors,
        uvs: builder.uvs
      }
    }));
}

type SectionLayerBuilder = {
  sectionY: number;
  nextFace: number;
  positions: Float32Array;
  normals: Float32Array;
  indices: Uint32Array;
  stateIds: Uint16Array;
  skyLight: Uint8Array;
  blockLight: Uint8Array;
  ao: Uint8Array;
  faceDirections: Uint8Array;
  colors?: Float32Array;
  uvs?: Float32Array;
};

function createSectionLayerBuilder(
  sectionY: number,
  faceCount: number,
  includeColors: boolean,
  includeUvs: boolean
): SectionLayerBuilder {
  const vertexCount = faceCount * 4;
  return {
    sectionY,
    nextFace: 0,
    positions: new Float32Array(vertexCount * 3),
    normals: new Float32Array(vertexCount * 3),
    indices: new Uint32Array(faceCount * 6),
    stateIds: new Uint16Array(vertexCount),
    skyLight: new Uint8Array(vertexCount),
    blockLight: new Uint8Array(vertexCount),
    ao: new Uint8Array(vertexCount),
    faceDirections: new Uint8Array(faceCount),
    colors: includeColors ? new Float32Array(vertexCount * 3) : undefined,
    uvs: includeUvs ? new Float32Array(vertexCount * 2) : undefined
  };
}

function copyFaceToSection(layer: MeshLayer, faceIndex: number, builder: SectionLayerBuilder): void {
  const targetFace = builder.nextFace;
  builder.nextFace += 1;
  const sourceVertex = faceIndex * 4;
  const targetVertex = targetFace * 4;

  copyNumbers(layer.positions, sourceVertex * 3, builder.positions, targetVertex * 3, 12);
  copyNumbers(layer.normals, sourceVertex * 3, builder.normals, targetVertex * 3, 12);
  copyNumbers(layer.stateIds, sourceVertex, builder.stateIds, targetVertex, 4);
  copyNumbers(layer.skyLight, sourceVertex, builder.skyLight, targetVertex, 4);
  copyNumbers(layer.blockLight, sourceVertex, builder.blockLight, targetVertex, 4);
  copyNumbers(layer.ao, sourceVertex, builder.ao, targetVertex, 4);
  if (layer.colors && builder.colors) {
    copyNumbers(layer.colors, sourceVertex * 3, builder.colors, targetVertex * 3, 12);
  }
  if (layer.uvs && builder.uvs) {
    copyNumbers(layer.uvs, sourceVertex * 2, builder.uvs, targetVertex * 2, 8);
  }

  const firstVertex = targetFace * 4;
  const indexOffset = targetFace * 6;
  builder.indices[indexOffset] = firstVertex;
  builder.indices[indexOffset + 1] = firstVertex + 2;
  builder.indices[indexOffset + 2] = firstVertex + 1;
  builder.indices[indexOffset + 3] = firstVertex;
  builder.indices[indexOffset + 4] = firstVertex + 3;
  builder.indices[indexOffset + 5] = firstVertex + 2;
  builder.faceDirections[targetFace] = faceDirectionCodeAt(layer.faceDirections, faceIndex);
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

function faceSectionY(positions: ArrayLike<number>, faceIndex: number): number {
  const vertexOffset = faceIndex * 12;
  let minY = positions[vertexOffset + 1];
  minY = Math.min(minY, positions[vertexOffset + 4], positions[vertexOffset + 7], positions[vertexOffset + 10]);
  return Math.floor(minY / SECTION_HEIGHT);
}

export function meshLayerToGeometry(
  layer: MeshLayer,
  baseColor: THREE.Color,
  registry?: BlockRegistry,
  layerName: keyof ChunkMesh = "solid",
  sectionY?: number
): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();
  const colors = layer.colors ?? buildLayerColors(layer, baseColor, registry);
  const uvs = layer.uvs ?? buildLayerUvs(layer, registry, layerName);

  geometry.setAttribute("position", float32Attribute(layer.positions, 3));
  geometry.setAttribute("normal", float32Attribute(layer.normals, 3));
  geometry.setAttribute("color", float32Attribute(colors, 3));
  geometry.setAttribute("uv", float32Attribute(uvs, 2));
  if (layer.indices instanceof Uint32Array || layer.indices instanceof Uint16Array) {
    geometry.setIndex(new THREE.BufferAttribute(layer.indices, 1));
  } else {
    geometry.setIndex(layer.indices);
  }
  if (sectionY === undefined) {
    geometry.computeBoundingSphere();
  } else {
    geometry.boundingSphere = new THREE.Sphere(
      new THREE.Vector3(8, sectionY * SECTION_HEIGHT + SECTION_HEIGHT / 2, 8),
      15
    );
  }
  return geometry;
}

function buildLayerColors(layer: MeshLayer, baseColor: THREE.Color, registry?: BlockRegistry): Float32Array {
  const colors = new Float32Array(layer.stateIds.length * 3);
  for (let index = 0; index < layer.stateIds.length; index += 1) {
    const light = Math.max(layer.skyLight[index], layer.blockLight[index]) / LIGHT_MAX;
    const ao = aoToBrightness(layer.ao[index]);
    const brightness = Math.max(0.12, light * ao);
    const color = registry ? colorForState(registry, layer.stateIds[index], baseColor) : baseColor;
    const colorOffset = index * 3;
    colors[colorOffset] = color.r * brightness;
    colors[colorOffset + 1] = color.g * brightness;
    colors[colorOffset + 2] = color.b * brightness;
  }
  return colors;
}

function buildLayerUvs(
  layer: MeshLayer,
  registry?: BlockRegistry,
  layerName: keyof ChunkMesh = "solid"
): Float32Array {
  const uvs = new Float32Array(layer.stateIds.length * 2);
  const vertexUvOrder = [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1]
  ] as const;
  for (let faceIndex = 0; faceIndex < layer.faceDirections.length; faceIndex += 1) {
    const stateId = layer.stateIds[faceIndex * 4];
    const faceDirection = faceDirectionAt(layer.faceDirections, faceIndex);
    const tileKey = registry ? cachedTileForState(registry, stateId, faceDirection) : "stone";
    for (let cornerIndex = 0; cornerIndex < vertexUvOrder.length; cornerIndex += 1) {
      const [u, v] = vertexUvOrder[cornerIndex];
      const uv = layerName === "fluid" ? { u, v } : tileUv(tileKey, u, v);
      const uvOffset = (faceIndex * 4 + cornerIndex) * 2;
      uvs[uvOffset] = uv.u;
      uvs[uvOffset + 1] = uv.v;
    }
  }
  return uvs;
}

function float32Attribute(values: ArrayLike<number>, itemSize: number): THREE.BufferAttribute {
  if (values instanceof Float32Array) {
    return new THREE.BufferAttribute(values, itemSize);
  }
  return new THREE.Float32BufferAttribute(values, itemSize);
}

function faceDirectionAt(directions: MeshFaceDirectionArray, index: number): MeshFaceDirection {
  const value = directions[index];
  return typeof value === "number" ? FACE_DIRECTIONS_BY_CODE[value] : value;
}

function faceDirectionCodeAt(directions: MeshFaceDirectionArray, index: number): number {
  const value = directions[index];
  return typeof value === "number" ? value : FACE_DIRECTION_CODES[value];
}

function getSharedLayerMaterial(layerName: keyof ChunkMesh, map: THREE.Texture): THREE.MeshBasicMaterial {
  const existing = sharedLayerMaterials.get(layerName);
  if (existing) {
    return existing;
  }

  const material = new THREE.MeshBasicMaterial({
    map,
    vertexColors: true,
    transparent: layerName === "translucent" || layerName === "fluid",
    opacity: layerName === "fluid" ? 0.56 : 1,
    alphaTest: layerName === "cutout" ? 0.35 : 0,
    depthWrite: layerName !== "fluid",
    side: THREE.FrontSide
  });
  material.userData.sharedTerrainMaterial = true;
  sharedLayerMaterials.set(layerName, material);
  return material;
}

function colorForState(registry: BlockRegistry, stateId: number, fallback: THREE.Color): THREE.Color {
  const typeId = registry.getState(stateId).typeId;
  const cached = stateColorCache.get(typeId);
  if (cached) {
    return cached;
  }
  let color: THREE.Color;
  switch (typeId) {
    case "grass":
      color = new THREE.Color(0x5f9f4a);
      break;
    case "dirt":
      color = new THREE.Color(0x765039);
      break;
    case "stone":
      color = new THREE.Color(0x858585);
      break;
    case "sand":
      color = new THREE.Color(0xd7c37b);
      break;
    case "gravel":
      color = new THREE.Color(0x7b7b75);
      break;
    case "snow":
      color = new THREE.Color(0xe6edf1);
      break;
    case "water":
      color = new THREE.Color(0x386ed8);
      break;
    case "lava":
      color = new THREE.Color(0xff6f1a);
      break;
    case "log":
      color = new THREE.Color(0x7a5735);
      break;
    case "planks":
      color = new THREE.Color(0xb7844e);
      break;
    case "cobblestone":
      color = new THREE.Color(0x74746f);
      break;
    case "leaves":
      color = new THREE.Color(0x3f8f43);
      break;
    case "coal_ore":
      color = new THREE.Color(0x4f4f4f);
      break;
    case "iron_ore":
      color = new THREE.Color(0xa78668);
      break;
    case "gold_ore":
      color = new THREE.Color(0xd2a747);
      break;
    case "diamond_ore":
      color = new THREE.Color(0x63cdd0);
      break;
    case "torch":
      color = new THREE.Color(0xffc857);
      break;
    case "lamp":
      color = new THREE.Color(0xffd166);
      break;
    case "crafting_table":
      color = new THREE.Color(0x9b6a3b);
      break;
    case "furnace":
      color = new THREE.Color(0x5d5d58);
      break;
    case "chest":
      color = new THREE.Color(0xa66d35);
      break;
    case "bed":
      color = new THREE.Color(0xb73535);
      break;
    case "door":
      color = new THREE.Color(0x8f5a2f);
      break;
    case "bell":
      color = new THREE.Color(0xd9a640);
      break;
    case "composter":
      color = new THREE.Color(0x8b5c31);
      break;
    case "lectern":
      color = new THREE.Color(0x9a6a3e);
      break;
    case "stonecutter":
      color = new THREE.Color(0x8b8a82);
      break;
    case "farmland":
      color = new THREE.Color(0x6b4a2f);
      break;
    case "wheat":
      color = new THREE.Color(0xd9b64a);
      break;
    default:
      color = fallback;
  }
  stateColorCache.set(typeId, color);
  return color;
}

function cachedTileForState(registry: BlockRegistry, stateId: number, faceDirection: MeshFaceDirection): TileKey {
  const key = `${stateId}:${faceDirection}`;
  const cached = tileForStateCache.get(key);
  if (cached) {
    return cached;
  }
  const tile = tileForState(registry, stateId, faceDirection);
  tileForStateCache.set(key, tile);
  return tile;
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
      return faceDirection === "up" || faceDirection === "down" ? "cobblestone" : "furnace";
    case "chest":
      return faceDirection === "up" || faceDirection === "down" ? "planks" : "chest";
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

function getTerrainAtlasTexture(): THREE.CanvasTexture {
  if (terrainAtlasTexture) {
    return terrainAtlasTexture;
  }

  const canvas = document.createElement("canvas");
  canvas.width = TERRAIN_TILE_KEYS.length * TILE_SIZE;
  canvas.height = TILE_SIZE;
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("failed to create terrain atlas context");
  }
  context.imageSmoothingEnabled = false;

  TERRAIN_TILE_KEYS.forEach((key, tileIndex) => drawTile(context, key, tileIndex * TILE_SIZE, 0));

  terrainAtlasTexture = new THREE.CanvasTexture(canvas);
  terrainAtlasTexture.colorSpace = THREE.SRGBColorSpace;
  terrainAtlasTexture.magFilter = THREE.NearestFilter;
  terrainAtlasTexture.minFilter = THREE.NearestFilter;
  terrainAtlasTexture.generateMipmaps = false;
  return terrainAtlasTexture;
}

function getWaterSurfaceTexture(): THREE.CanvasTexture {
  if (waterSurfaceTexture) {
    return waterSurfaceTexture;
  }

  const canvas = document.createElement("canvas");
  canvas.width = TILE_SIZE;
  canvas.height = TILE_SIZE;
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("failed to create water texture context");
  }
  context.imageSmoothingEnabled = false;
  drawTile(context, "water", 0, 0);

  waterSurfaceTexture = new THREE.CanvasTexture(canvas);
  waterSurfaceTexture.colorSpace = THREE.SRGBColorSpace;
  waterSurfaceTexture.magFilter = THREE.NearestFilter;
  waterSurfaceTexture.minFilter = THREE.NearestFilter;
  waterSurfaceTexture.wrapS = THREE.RepeatWrapping;
  waterSurfaceTexture.wrapT = THREE.RepeatWrapping;
  waterSurfaceTexture.generateMipmaps = false;
  return waterSurfaceTexture;
}

function drawTile(context: CanvasRenderingContext2D, key: TileKey, offsetX: number, offsetY: number): void {
  for (let y = 0; y < TILE_SIZE; y += 1) {
    for (let x = 0; x < TILE_SIZE; x += 1) {
      context.fillStyle = pixelColor(key, x, y);
      context.fillRect(offsetX + x, offsetY + y, 1, 1);
    }
  }
}

function pixelColor(key: TileKey, x: number, y: number): string {
  const n = noise2d(x, y, TERRAIN_TILE_KEYS.indexOf(key) * 31 + 17);
  const n2 = noise2d(x * 3, y * 3, TERRAIN_TILE_KEYS.indexOf(key) * 47 + 5);
  switch (key) {
    case "grass_top":
      return mixHex(0x437f35, 0x79b75b, n);
    case "grass_side":
      if (y < 4 || (y < 7 && n2 > 0.62)) {
        return mixHex(0x3f7e34, 0x76b35a, n);
      }
      return dirtPixel(n, n2);
    case "dirt":
      return dirtPixel(n, n2);
    case "stone":
      return mixHex(n2 > 0.78 ? 0x565656 : 0x6f6f6f, n < 0.22 ? 0xa0a0a0 : 0x858585, n);
    case "sand":
      return mixHex(n2 > 0.82 ? 0xb9a85f : 0xd2c17a, n < 0.24 ? 0xf0e3a4 : 0xd8c982, n);
    case "gravel":
      return mixHex(n2 > 0.72 ? 0x4f4f4c : 0x74746f, n < 0.24 ? 0x9c9c95 : 0x7f7f79, n);
    case "snow":
      return mixHex(n2 > 0.82 ? 0xcfd8df : 0xe9f0f3, n < 0.2 ? 0xffffff : 0xdfe8ed, n);
    case "lava":
      if (n2 > 0.72 || (x + y + Math.floor(n * 8)) % 7 === 0) {
        return mixHex(0xffd04a, 0xffff9a, n);
      }
      return mixHex(0xb92f10, 0xff6b1a, n);
    case "log_side":
      return mixHex(x % 5 === 0 || n2 > 0.76 ? 0x4d3421 : 0x744f2d, 0xa37442, n);
    case "log_top": {
      const distance = Math.hypot(x - 7.5, y - 7.5);
      const ring = Math.floor(distance * 1.6) % 3 === 0;
      return mixHex(ring ? 0x9d6d31 : 0xc4974b, 0xe0bf70, n);
    }
    case "planks":
      if (y % 5 === 0 || x % 8 === 0) {
        return mixHex(0x6c4728, 0x9a6638, n);
      }
      return mixHex(0xa87743, 0xd0a05f, n);
    case "cobblestone":
      if ((x + Math.floor(n * 5)) % 7 === 0 || (y + Math.floor(n2 * 4)) % 6 === 0) {
        return mixHex(0x4f4f4b, 0x64645f, n);
      }
      return mixHex(0x6c6c67, 0x96968f, n);
    case "leaves":
      if (n2 < 0.13) {
        return "rgba(29, 71, 31, 0)";
      }
      return mixHex(0x265d2e, n > 0.7 ? 0x5fa14a : 0x3e823b, n);
    case "water":
      return `rgba(${Math.floor(47 + n * 28)}, ${Math.floor(96 + n * 38)}, ${Math.floor(190 + n * 35)}, 180)`;
    case "coal_ore":
      return n2 > 0.73 ? mixHex(0x1f1f1f, 0x3c3c3c, n) : pixelColor("stone", x, y);
    case "iron_ore":
      return n2 > 0.75 ? mixHex(0x9f7356, 0xd0a17a, n) : pixelColor("stone", x, y);
    case "gold_ore":
      return n2 > 0.77 ? mixHex(0xb48223, 0xffd166, n) : pixelColor("stone", x, y);
    case "diamond_ore":
      return n2 > 0.79 ? mixHex(0x3cbfc2, 0xa8fff8, n) : pixelColor("stone", x, y);
    case "torch":
      if (x < 6 || x > 9 || y < 2 || y > 15) {
        return "rgba(0, 0, 0, 0)";
      }
      if (y < 5) {
        return mixHex(0xff8a2a, 0xfff08a, n);
      }
      return mixHex(0x5b3721, 0xa06b38, n);
    case "lamp":
      return mixHex((x + y) % 5 === 0 ? 0x8c5a20 : 0xe0a438, 0xffdb72, n);
    case "crafting_table":
      if (x < 2 || y < 2 || x > 13 || y > 13) {
        return mixHex(0x5a371f, 0x8b5b35, n);
      }
      if (x === 7 || x === 8 || y === 7 || y === 8) {
        return mixHex(0x6e4528, 0xb77a43, n);
      }
      return mixHex(0x9a6a3e, 0xd0a36b, n);
    case "furnace":
      if (x > 3 && x < 12 && y > 4 && y < 13) {
        if (x === 4 || x === 11 || y === 5 || y === 12) {
          return mixHex(0x252525, 0x454545, n);
        }
        return mixHex(0x1b1b1b, n2 > 0.76 ? 0xff8a2a : 0x303030, n);
      }
      return pixelColor("cobblestone", x, y);
    case "chest":
      if (x === 0 || x === 15 || y === 0 || y === 15) {
        return mixHex(0x4a2c18, 0x7c5026, n);
      }
      if (y === 7 || y === 8) {
        return mixHex(0x5b3418, 0x8b5b2a, n);
      }
      if (x > 6 && x < 10 && y > 5 && y < 10) {
        return mixHex(0xc89b4b, 0xffd46b, n);
      }
      return mixHex(0x8d5a2c, 0xc58a46, n);
    case "bed":
      if (y < 4) {
        return mixHex(0xe5dfc8, 0xffffff, n);
      }
      if (x < 2 || x > 13 || y > 13) {
        return mixHex(0x5b2f22, 0x8a4b32, n);
      }
      return mixHex(n2 > 0.76 ? 0x7f2020 : 0xa52828, 0xe05252, n);
    case "door":
      if (x < 2 || x > 13 || y < 1 || y > 14) {
        return mixHex(0x3e2414, 0x6c3f22, n);
      }
      if ((x === 7 || x === 8) && y > 2 && y < 14) {
        return mixHex(0x4c2c18, 0x79502d, n);
      }
      if ((x > 3 && x < 7 && y > 3 && y < 8) || (x > 9 && x < 13 && y > 3 && y < 8)) {
        return mixHex(0x5a321c, 0x8c5d34, n);
      }
      if (x === 12 && y === 8) {
        return mixHex(0xd2aa55, 0xffd66d, n);
      }
      if (n2 < 0.12 && x > 3 && x < 13 && y > 9 && y < 14) {
        return "rgba(0, 0, 0, 0)";
      }
      return mixHex(0x8b552e, 0xbd7a42, n);
    case "composter":
      if (x < 2 || x > 13 || y < 2 || y > 13) {
        return mixHex(0x4b2f18, 0x7a4a27, n);
      }
      if (x % 5 === 0 || y % 5 === 0) {
        return mixHex(0x6d4322, 0xa36a38, n);
      }
      return mixHex(0x3b2717, n2 > 0.72 ? 0x315b24 : 0x614221, n);
    case "lectern":
      if (y < 4) {
        return mixHex(0xc89b58, 0xf2cf86, n);
      }
      if (x < 3 || x > 12) {
        return mixHex(0x4f321c, 0x7e522c, n);
      }
      return pixelColor("planks", x, y);
    case "stonecutter":
      if (y < 5 && Math.abs(x - 7.5) < 5 - y * 0.35) {
        return mixHex(0xb8b8b2, 0xf0eee4, n);
      }
      if (y === 5 || y === 6) {
        return mixHex(0x5c5c58, 0x8d8d86, n);
      }
      return pixelColor("cobblestone", x, y);
    case "farmland":
      if (x % 4 === 0 || x % 4 === 1) {
        return mixHex(0x3f2719, 0x5a3923, n);
      }
      return mixHex(0x6b452c, 0x8c6240, n);
    case "wheat":
      if (n2 < 0.26) {
        return "rgba(0, 0, 0, 0)";
      }
      if (y < 4 || n > 0.7) {
        return mixHex(0xf4d45f, 0xffeba0, n);
      }
      return mixHex(0x8ba64a, 0xd0a844, n);
    case "wheat_mid":
      if (n2 < 0.38 || y < 3) {
        return "rgba(0, 0, 0, 0)";
      }
      return mixHex(0x6f9b3d, 0xd4b548, n);
    case "wheat_young":
      if (n2 < 0.5 || y < 7) {
        return "rgba(0, 0, 0, 0)";
      }
      return mixHex(0x4d8b32, 0xa9be4b, n);
    case "bell":
      if (x < 2 || x > 13 || y < 2 || y > 13) {
        return "rgba(0, 0, 0, 0)";
      }
      if (y < 4 || x < 4 || x > 11) {
        return mixHex(0x7a4f12, 0xb07722, n);
      }
      if (y > 10 && (x < 3 || x > 12)) {
        return "rgba(0, 0, 0, 0)";
      }
      if (y > 11) {
        return mixHex(0x805319, 0xc48a2c, n);
      }
      return mixHex(n2 > 0.72 ? 0x8b5a1d : 0xc4882c, 0xffd166, n);
  }
}

function dirtPixel(n: number, n2: number): string {
  return mixHex(n2 > 0.8 ? 0x4a2f22 : 0x6e4935, n < 0.25 ? 0x9a6b48 : 0x7b563d, n);
}

function mixHex(left: number, right: number, amount: number): string {
  const r = mix((left >> 16) & 0xff, (right >> 16) & 0xff, amount);
  const g = mix((left >> 8) & 0xff, (right >> 8) & 0xff, amount);
  const b = mix(left & 0xff, right & 0xff, amount);
  return `rgb(${r}, ${g}, ${b})`;
}

function mix(left: number, right: number, amount: number): number {
  return Math.round(left + (right - left) * amount);
}

function noise2d(x: number, y: number, seed: number): number {
  let value = Math.imul(x + seed * 101, 374761393) ^ Math.imul(y - seed * 53, 668265263);
  value = Math.imul(value ^ (value >>> 13), 1274126177);
  return ((value ^ (value >>> 16)) >>> 0) / 0xffffffff;
}
