import {
  CHUNK_SIZE,
  WORLD_MAX_Y,
  WORLD_MIN_Y,
  worldToChunkCoord,
  worldToLocalBlockCoord,
  type Vec3i
} from "../core/constants.ts";
import { BlockRegistry, type BlockDefinition } from "../block/blockRegistry.ts";
import { type RegisteredBlockState } from "../block/blockRegistry.ts";
import { type StateId } from "../block/blockState.ts";
import { ChunkColumn } from "../world/Chunk.ts";
import type { World } from "../world/World.ts";
import { calculateVertexAo } from "./ao.ts";

export type MeshRenderLayer = "solid" | "cutout" | "translucent" | "fluid";

export type MeshFaceDirection = "east" | "west" | "up" | "down" | "south" | "north";

export type MeshNumericArray = number[] | Float32Array | Uint32Array | Uint16Array | Uint8Array;
export type MeshFaceDirectionArray = MeshFaceDirection[] | Uint8Array;

export type MeshLayer = {
  positions: MeshNumericArray;
  normals: MeshNumericArray;
  indices: MeshNumericArray;
  stateIds: MeshNumericArray;
  skyLight: MeshNumericArray;
  blockLight: MeshNumericArray;
  ao: MeshNumericArray;
  faceDirections: MeshFaceDirectionArray;
  colors?: MeshNumericArray;
  uvs?: MeshNumericArray;
};

export type ChunkMeshRenderSection = {
  sectionY: number;
  layers: Record<MeshRenderLayer, MeshLayer>;
};

type WritableMeshLayer = {
  positions: number[];
  normals: number[];
  indices: number[];
  stateIds: StateId[];
  skyLight: number[];
  blockLight: number[];
  ao: number[];
  faceDirections: MeshFaceDirection[];
};

export type ChunkMesh = Record<MeshRenderLayer, MeshLayer> & { renderSections?: ChunkMeshRenderSection[] };
export type RenderableChunkMesh = ChunkMesh;
type WritableChunkMesh = Record<MeshRenderLayer, WritableMeshLayer>;

type FaceDefinition = {
  direction: MeshFaceDirection;
  normal: Vec3i;
  u: Vec3i;
  v: Vec3i;
  corners: readonly [number, number][];
  vertices: readonly Vec3i[];
};

const LAYERS: readonly MeshRenderLayer[] = ["solid", "cutout", "translucent", "fluid"];
const DOOR_THICKNESS = 0.1875;

const FACE_DEFINITIONS: readonly FaceDefinition[] = [
  {
    direction: "east",
    normal: { x: 1, y: 0, z: 0 },
    u: { x: 0, y: 0, z: 1 },
    v: { x: 0, y: 1, z: 0 },
    corners: [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, 1]
    ],
    vertices: [
      { x: 1, y: 0, z: 0 },
      { x: 1, y: 0, z: 1 },
      { x: 1, y: 1, z: 1 },
      { x: 1, y: 1, z: 0 }
    ]
  },
  {
    direction: "west",
    normal: { x: -1, y: 0, z: 0 },
    u: { x: 0, y: 0, z: -1 },
    v: { x: 0, y: 1, z: 0 },
    corners: [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, 1]
    ],
    vertices: [
      { x: 0, y: 0, z: 1 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 1, z: 0 },
      { x: 0, y: 1, z: 1 }
    ]
  },
  {
    direction: "up",
    normal: { x: 0, y: 1, z: 0 },
    u: { x: 1, y: 0, z: 0 },
    v: { x: 0, y: 0, z: 1 },
    corners: [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, 1]
    ],
    vertices: [
      { x: 0, y: 1, z: 0 },
      { x: 1, y: 1, z: 0 },
      { x: 1, y: 1, z: 1 },
      { x: 0, y: 1, z: 1 }
    ]
  },
  {
    direction: "down",
    normal: { x: 0, y: -1, z: 0 },
    u: { x: 1, y: 0, z: 0 },
    v: { x: 0, y: 0, z: -1 },
    corners: [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, 1]
    ],
    vertices: [
      { x: 0, y: 0, z: 1 },
      { x: 1, y: 0, z: 1 },
      { x: 1, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 }
    ]
  },
  {
    direction: "south",
    normal: { x: 0, y: 0, z: 1 },
    u: { x: -1, y: 0, z: 0 },
    v: { x: 0, y: 1, z: 0 },
    corners: [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, 1]
    ],
    vertices: [
      { x: 1, y: 0, z: 1 },
      { x: 0, y: 0, z: 1 },
      { x: 0, y: 1, z: 1 },
      { x: 1, y: 1, z: 1 }
    ]
  },
  {
    direction: "north",
    normal: { x: 0, y: 0, z: -1 },
    u: { x: 1, y: 0, z: 0 },
    v: { x: 0, y: 1, z: 0 },
    corners: [
      [-1, -1],
      [1, -1],
      [1, 1],
      [-1, 1]
    ],
    vertices: [
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: 1, y: 1, z: 0 },
      { x: 0, y: 1, z: 0 }
    ]
  }
];

export class ChunkMesher {
  registry: BlockRegistry;

  constructor(registry: BlockRegistry) {
    this.registry = registry;
  }

  buildChunkMesh(chunk: ChunkColumn, world?: World): ChunkMesh {
    const mesh = createEmptyChunkMesh();

    for (let localZ = 0; localZ < CHUNK_SIZE; localZ += 1) {
      for (let localX = 0; localX < CHUNK_SIZE; localX += 1) {
        const range = this.columnMeshRange(chunk, localX, localZ, world);
        if (!range) {
          continue;
        }
        for (let worldY = range.minY; worldY <= range.maxY; worldY += 1) {
          const stateId = chunk.getStateId(localX, worldY, localZ);
          const definition = this.registry.getDefinitionForState(stateId);
          if (definition.renderLayer === "none") {
            continue;
          }

          const layer = mesh[definition.renderLayer];
          const state = this.registry.getState(stateId);
          if (state.typeId === "door") {
            emitDoorBlock(layer, chunk, this, localX, worldY, localZ, stateId, state, world);
            continue;
          }
          if (state.typeId === "bell") {
            emitBellBlock(layer, chunk, this, localX, worldY, localZ, stateId, world);
            continue;
          }
          for (const face of FACE_DEFINITIONS) {
            if (!this.shouldEmitFace(chunk, localX, worldY, localZ, definition, face.normal, world)) {
              continue;
            }
            emitFace(layer, chunk, this, localX, worldY, localZ, stateId, face, world);
          }
        }
      }
    }

    return mesh;
  }

  shouldEmitFace(
    chunk: ChunkColumn,
    localX: number,
    worldY: number,
    localZ: number,
    current: BlockDefinition,
    normal: Vec3i,
    world?: World
  ): boolean {
    const neighbor = this.sampleDefinition(
      chunk,
      localX + normal.x,
      worldY + normal.y,
      localZ + normal.z,
      world
    );
    if (!neighbor) {
      return true;
    }
    if (neighbor.renderLayer === "none") {
      return true;
    }
    if (shouldCullSameLayerFace(current, neighbor)) {
      return false;
    }
    if (current.renderLayer === "fluid" && neighbor.renderLayer === "fluid") {
      return false;
    }
    return !fullyOccludesFace(neighbor);
  }

  occludesAo(chunk: ChunkColumn, localX: number, worldY: number, localZ: number, world?: World): boolean {
    const definition = this.sampleDefinition(chunk, localX, worldY, localZ, world);
    return definition ? fullyOccludesFace(definition) : false;
  }

  sampleDefinition(
    chunk: ChunkColumn,
    localX: number,
    worldY: number,
    localZ: number,
    world?: World
  ): BlockDefinition | null {
    if (!isInsideChunk(localX, worldY, localZ)) {
      if (!world || worldY < WORLD_MIN_Y || worldY > WORLD_MAX_Y) {
        return null;
      }
      const stateId = world.getStateIdIfLoaded(
        chunk.chunkX * CHUNK_SIZE + localX,
        worldY,
        chunk.chunkZ * CHUNK_SIZE + localZ
      );
      return stateId === null ? null : this.registry.getDefinitionForState(stateId);
    }
    return this.registry.getDefinitionForState(chunk.getStateId(localX, worldY, localZ));
  }

  columnMeshRange(
    chunk: ChunkColumn,
    localX: number,
    localZ: number,
    world?: World
  ): { minY: number; maxY: number } | null {
    let minY = WORLD_MAX_Y;
    let maxY = WORLD_MIN_Y;
    let hasRange = false;
    const registry = this.registry;

    const includeY = (worldY: number, padding = 2) => {
      if (worldY < WORLD_MIN_Y || worldY > WORLD_MAX_Y) {
        return;
      }
      minY = Math.min(minY, Math.max(WORLD_MIN_Y, worldY - padding));
      maxY = Math.max(maxY, Math.min(WORLD_MAX_Y, worldY + padding));
      hasRange = true;
    };

    const includeSurfaces = (sampleLocalX: number, sampleLocalZ: number) => {
      const surfaces = surfaceHeightsAt(chunk, sampleLocalX, sampleLocalZ, world);
      if (!surfaces) {
        return;
      }
      includeY(surfaces.worldSurface);
      includeY(surfaces.oceanFloor);
      if (surfaces.motionBlockingNoLeaves > surfaces.oceanFloor + 3) {
        includeRange(surfaces.oceanFloor - 2, surfaces.motionBlockingNoLeaves + 2);
      } else {
        includeY(surfaces.motionBlockingNoLeaves);
      }
    };

    includeSurfaces(localX, localZ);
    includeSurfaces(localX - 1, localZ);
    includeSurfaces(localX + 1, localZ);
    includeSurfaces(localX, localZ - 1);
    includeSurfaces(localX, localZ + 1);
    includeGeneratedCaveFaces(localX, localZ);

    if (localX === 0 || localX === CHUNK_SIZE - 1 || localZ === 0 || localZ === CHUNK_SIZE - 1) {
      const surfaceY = chunk.heightmaps.get("WORLD_SURFACE", localX, localZ);
      if (surfaceY >= WORLD_MIN_Y && touchesMissingNeighbor(chunk, localX, localZ, world)) {
        minY = WORLD_MIN_Y;
        maxY = Math.max(maxY, Math.min(WORLD_MAX_Y, surfaceY + 2));
        hasRange = true;
      }
    }

    for (const delta of chunk.blockDeltas.values()) {
      if (Math.abs(delta.localX - localX) <= 1 && Math.abs(delta.localZ - localZ) <= 1) {
        includeY(delta.worldY, 3);
      }
    }

    return hasRange ? { minY, maxY } : null;

    function includeRange(fromY: number, toY: number) {
      minY = Math.min(minY, Math.max(WORLD_MIN_Y, fromY));
      maxY = Math.max(maxY, Math.min(WORLD_MAX_Y, toY));
      hasRange = true;
    }

    function includeGeneratedCaveFaces(sampleLocalX: number, sampleLocalZ: number) {
      const surfaces = surfaceHeightsAt(chunk, sampleLocalX, sampleLocalZ, world);
      if (!surfaces) {
        return;
      }
      const scanTop = Math.min(WORLD_MAX_Y, surfaces.motionBlockingNoLeaves - 1);
      for (let worldY = WORLD_MIN_Y; worldY <= scanTop; worldY += 1) {
        const stateId = chunk.getStateId(sampleLocalX, worldY, sampleLocalZ);
        const definition = registry.getDefinitionForState(stateId);
        if (definition.renderLayer === "none") {
          continue;
        }
        if (hasLoadedEmptyNeighbor(chunk, sampleLocalX, worldY, sampleLocalZ, registry, world)) {
          includeY(worldY, 1);
        }
      }
    }
  }
}

function hasLoadedEmptyNeighbor(
  chunk: ChunkColumn,
  localX: number,
  worldY: number,
  localZ: number,
  registry: BlockRegistry,
  world?: World
): boolean {
  for (const face of FACE_DEFINITIONS) {
    const sampleLocalX = localX + face.normal.x;
    const sampleWorldY = worldY + face.normal.y;
    const sampleLocalZ = localZ + face.normal.z;
    if (!isInsideChunk(sampleLocalX, sampleWorldY, sampleLocalZ)) {
      if (!world || sampleWorldY < WORLD_MIN_Y || sampleWorldY > WORLD_MAX_Y) {
        continue;
      }
      const stateId = world.getStateIdIfLoaded(
        chunk.chunkX * CHUNK_SIZE + sampleLocalX,
        sampleWorldY,
        chunk.chunkZ * CHUNK_SIZE + sampleLocalZ
      );
      if (stateId === null) {
        continue;
      }
      const definition = registry.getDefinitionForState(stateId);
      if (definition.renderLayer === "none" || definition.renderLayer === "fluid") {
        return true;
      }
      continue;
    }

    const stateId = chunk.getStateId(sampleLocalX, sampleWorldY, sampleLocalZ);
    const definition = registry.getDefinitionForState(stateId);
    if (definition.renderLayer === "none" || definition.renderLayer === "fluid") {
      return true;
    }
  }
  return false;
}

function surfaceHeightsAt(
  chunk: ChunkColumn,
  localX: number,
  localZ: number,
  world?: World
): { worldSurface: number; oceanFloor: number; motionBlockingNoLeaves: number } | null {
  if (localX >= 0 && localX < CHUNK_SIZE && localZ >= 0 && localZ < CHUNK_SIZE) {
    return readSurfaceHeights(chunk, localX, localZ);
  }
  if (!world) {
    return null;
  }

  const worldX = chunk.chunkX * CHUNK_SIZE + localX;
  const worldZ = chunk.chunkZ * CHUNK_SIZE + localZ;
  const neighbor = world.getChunk(worldToChunkCoord(worldX), worldToChunkCoord(worldZ));
  if (!neighbor) {
    return null;
  }
  return readSurfaceHeights(neighbor, worldToLocalBlockCoord(worldX), worldToLocalBlockCoord(worldZ));
}

function readSurfaceHeights(
  chunk: ChunkColumn,
  localX: number,
  localZ: number
): { worldSurface: number; oceanFloor: number; motionBlockingNoLeaves: number } | null {
  const worldSurface = chunk.heightmaps.get("WORLD_SURFACE", localX, localZ);
  const oceanFloor = chunk.heightmaps.get("OCEAN_FLOOR", localX, localZ);
  const motionBlockingNoLeaves = chunk.heightmaps.get("MOTION_BLOCKING_NO_LEAVES", localX, localZ);
  if (worldSurface < WORLD_MIN_Y && oceanFloor < WORLD_MIN_Y && motionBlockingNoLeaves < WORLD_MIN_Y) {
    return null;
  }
  return {
    worldSurface: Math.max(WORLD_MIN_Y, worldSurface),
    oceanFloor: Math.max(WORLD_MIN_Y, oceanFloor),
    motionBlockingNoLeaves: Math.max(WORLD_MIN_Y, motionBlockingNoLeaves)
  };
}

function touchesMissingNeighbor(chunk: ChunkColumn, localX: number, localZ: number, world?: World): boolean {
  if (!world) {
    return true;
  }

  const checks = [
    localX === 0 ? { x: -1, z: localZ } : null,
    localX === CHUNK_SIZE - 1 ? { x: CHUNK_SIZE, z: localZ } : null,
    localZ === 0 ? { x: localX, z: -1 } : null,
    localZ === CHUNK_SIZE - 1 ? { x: localX, z: CHUNK_SIZE } : null
  ];

  return checks.some((check) => {
    if (!check) {
      return false;
    }
    const worldX = chunk.chunkX * CHUNK_SIZE + check.x;
    const worldZ = chunk.chunkZ * CHUNK_SIZE + check.z;
    return !world.getChunk(worldToChunkCoord(worldX), worldToChunkCoord(worldZ));
  });
}

export function createEmptyChunkMesh(): ChunkMesh {
  return Object.fromEntries(LAYERS.map((layer) => [layer, createEmptyMeshLayer()])) as WritableChunkMesh;
}

export function createEmptyMeshLayer(): WritableMeshLayer {
  return {
    positions: [],
    normals: [],
    indices: [],
    stateIds: [],
    skyLight: [],
    blockLight: [],
    ao: [],
    faceDirections: []
  };
}

export function meshLayerFaceCount(layer: MeshLayer): number {
  return layer.indices.length / 6;
}

export function meshFaceCount(mesh: RenderableChunkMesh): number {
  if (mesh.renderSections && mesh.renderSections.length > 0) {
    return mesh.renderSections.reduce(
      (count, section) => count + LAYERS.reduce((layerCount, layer) => layerCount + meshLayerFaceCount(section.layers[layer]), 0),
      0
    );
  }
  return LAYERS.reduce((count, layer) => count + meshLayerFaceCount(mesh[layer]), 0);
}

function emitFace(
  layer: WritableMeshLayer,
  chunk: ChunkColumn,
  mesher: ChunkMesher,
  localX: number,
  worldY: number,
  localZ: number,
  stateId: StateId,
  face: FaceDefinition,
  world?: World
): void {
  const firstVertex = layer.positions.length / 3;
  const light = sampleFaceLight(chunk, localX, worldY, localZ, face.normal);

  for (let vertexIndex = 0; vertexIndex < face.vertices.length; vertexIndex += 1) {
    const vertex = face.vertices[vertexIndex];
    const [uSign, vSign] = face.corners[vertexIndex];
    const ao = sampleVertexAo(chunk, mesher, localX, worldY, localZ, face, uSign, vSign, world);

    layer.positions.push(localX + vertex.x, worldY + vertex.y, localZ + vertex.z);
    layer.normals.push(face.normal.x, face.normal.y, face.normal.z);
    layer.stateIds.push(stateId);
    layer.skyLight.push(light.skyLight);
    layer.blockLight.push(light.blockLight);
    layer.ao.push(ao);
  }

  layer.indices.push(
    firstVertex,
    firstVertex + 2,
    firstVertex + 1,
    firstVertex,
    firstVertex + 3,
    firstVertex + 2
  );
  layer.faceDirections.push(face.direction);
}

type CuboidBounds = {
  minX: number;
  minY: number;
  minZ: number;
  maxX: number;
  maxY: number;
  maxZ: number;
};

function emitDoorBlock(
  layer: WritableMeshLayer,
  chunk: ChunkColumn,
  mesher: ChunkMesher,
  localX: number,
  worldY: number,
  localZ: number,
  stateId: StateId,
  state: RegisteredBlockState,
  world?: World
): void {
  const bounds = doorBoundsForState(state);
  for (const face of FACE_DEFINITIONS) {
    emitCuboidFace(layer, chunk, mesher, localX, worldY, localZ, stateId, face, bounds, world);
  }
}

function emitBellBlock(
  layer: WritableMeshLayer,
  chunk: ChunkColumn,
  mesher: ChunkMesher,
  localX: number,
  worldY: number,
  localZ: number,
  stateId: StateId,
  world?: World
): void {
  const parts: readonly CuboidBounds[] = [
    { minX: 0.36, minY: 0.78, minZ: 0.34, maxX: 0.64, maxY: 1, maxZ: 0.66 },
    { minX: 0.28, minY: 0.58, minZ: 0.26, maxX: 0.72, maxY: 0.84, maxZ: 0.74 },
    { minX: 0.2, minY: 0.28, minZ: 0.18, maxX: 0.8, maxY: 0.64, maxZ: 0.82 },
    { minX: 0.15, minY: 0.18, minZ: 0.13, maxX: 0.85, maxY: 0.34, maxZ: 0.87 },
    { minX: 0.44, minY: 0.08, minZ: 0.42, maxX: 0.56, maxY: 0.22, maxZ: 0.58 }
  ];
  for (const bounds of parts) {
    for (const face of FACE_DEFINITIONS) {
      emitCuboidFace(layer, chunk, mesher, localX, worldY, localZ, stateId, face, bounds, world);
    }
  }
}

function emitCuboidFace(
  layer: WritableMeshLayer,
  chunk: ChunkColumn,
  mesher: ChunkMesher,
  localX: number,
  worldY: number,
  localZ: number,
  stateId: StateId,
  face: FaceDefinition,
  bounds: CuboidBounds,
  world?: World
): void {
  const firstVertex = layer.positions.length / 3;
  const light = sampleFaceLight(chunk, localX, worldY, localZ, face.normal);
  const vertices = cuboidFaceVertices(bounds, face.direction);

  for (let vertexIndex = 0; vertexIndex < vertices.length; vertexIndex += 1) {
    const vertex = vertices[vertexIndex];
    const [uSign, vSign] = face.corners[vertexIndex];
    const ao = sampleVertexAo(chunk, mesher, localX, worldY, localZ, face, uSign, vSign, world);

    layer.positions.push(localX + vertex.x, worldY + vertex.y, localZ + vertex.z);
    layer.normals.push(face.normal.x, face.normal.y, face.normal.z);
    layer.stateIds.push(stateId);
    layer.skyLight.push(light.skyLight);
    layer.blockLight.push(light.blockLight);
    layer.ao.push(ao);
  }

  layer.indices.push(
    firstVertex,
    firstVertex + 2,
    firstVertex + 1,
    firstVertex,
    firstVertex + 3,
    firstVertex + 2
  );
  layer.faceDirections.push(face.direction);
}

function cuboidFaceVertices(bounds: CuboidBounds, direction: MeshFaceDirection): readonly Vec3i[] {
  switch (direction) {
    case "east":
      return [
        { x: bounds.maxX, y: bounds.minY, z: bounds.minZ },
        { x: bounds.maxX, y: bounds.minY, z: bounds.maxZ },
        { x: bounds.maxX, y: bounds.maxY, z: bounds.maxZ },
        { x: bounds.maxX, y: bounds.maxY, z: bounds.minZ }
      ];
    case "west":
      return [
        { x: bounds.minX, y: bounds.minY, z: bounds.maxZ },
        { x: bounds.minX, y: bounds.minY, z: bounds.minZ },
        { x: bounds.minX, y: bounds.maxY, z: bounds.minZ },
        { x: bounds.minX, y: bounds.maxY, z: bounds.maxZ }
      ];
    case "up":
      return [
        { x: bounds.minX, y: bounds.maxY, z: bounds.minZ },
        { x: bounds.maxX, y: bounds.maxY, z: bounds.minZ },
        { x: bounds.maxX, y: bounds.maxY, z: bounds.maxZ },
        { x: bounds.minX, y: bounds.maxY, z: bounds.maxZ }
      ];
    case "down":
      return [
        { x: bounds.minX, y: bounds.minY, z: bounds.maxZ },
        { x: bounds.maxX, y: bounds.minY, z: bounds.maxZ },
        { x: bounds.maxX, y: bounds.minY, z: bounds.minZ },
        { x: bounds.minX, y: bounds.minY, z: bounds.minZ }
      ];
    case "south":
      return [
        { x: bounds.maxX, y: bounds.minY, z: bounds.maxZ },
        { x: bounds.minX, y: bounds.minY, z: bounds.maxZ },
        { x: bounds.minX, y: bounds.maxY, z: bounds.maxZ },
        { x: bounds.maxX, y: bounds.maxY, z: bounds.maxZ }
      ];
    case "north":
      return [
        { x: bounds.minX, y: bounds.minY, z: bounds.minZ },
        { x: bounds.maxX, y: bounds.minY, z: bounds.minZ },
        { x: bounds.maxX, y: bounds.maxY, z: bounds.minZ },
        { x: bounds.minX, y: bounds.maxY, z: bounds.minZ }
      ];
  }
}

function doorBoundsForState(state: RegisteredBlockState): CuboidBounds {
  const facing = state.properties.facing;
  const open = state.properties.open === true;
  if (open) {
    switch (facing) {
      case "south":
        return { minX: 1 - DOOR_THICKNESS, minY: 0, minZ: 0, maxX: 1, maxY: 1, maxZ: 1 };
      case "east":
        return { minX: 0, minY: 0, minZ: 0, maxX: 1, maxY: 1, maxZ: DOOR_THICKNESS };
      case "west":
        return { minX: 0, minY: 0, minZ: 1 - DOOR_THICKNESS, maxX: 1, maxY: 1, maxZ: 1 };
      case "north":
      default:
        return { minX: 0, minY: 0, minZ: 0, maxX: DOOR_THICKNESS, maxY: 1, maxZ: 1 };
    }
  }
  switch (facing) {
    case "south":
      return { minX: 0, minY: 0, minZ: 1 - DOOR_THICKNESS, maxX: 1, maxY: 1, maxZ: 1 };
    case "east":
      return { minX: 1 - DOOR_THICKNESS, minY: 0, minZ: 0, maxX: 1, maxY: 1, maxZ: 1 };
    case "west":
      return { minX: 0, minY: 0, minZ: 0, maxX: DOOR_THICKNESS, maxY: 1, maxZ: 1 };
    case "north":
    default:
      return { minX: 0, minY: 0, minZ: 0, maxX: 1, maxY: 1, maxZ: DOOR_THICKNESS };
  }
}

function sampleVertexAo(
  chunk: ChunkColumn,
  mesher: ChunkMesher,
  localX: number,
  worldY: number,
  localZ: number,
  face: FaceDefinition,
  uSign: number,
  vSign: number,
  world?: World
): number {
  const base = addVec({ x: localX, y: worldY, z: localZ }, face.normal);
  const side1 = addVec(base, scaleVec(face.u, uSign));
  const side2 = addVec(base, scaleVec(face.v, vSign));
  const corner = addVec(addVec(base, scaleVec(face.u, uSign)), scaleVec(face.v, vSign));

  return calculateVertexAo({
    side1: mesher.occludesAo(chunk, side1.x, side1.y, side1.z, world),
    side2: mesher.occludesAo(chunk, side2.x, side2.y, side2.z, world),
    corner: mesher.occludesAo(chunk, corner.x, corner.y, corner.z, world)
  });
}

function sampleFaceLight(
  chunk: ChunkColumn,
  localX: number,
  worldY: number,
  localZ: number,
  normal: Vec3i
): { skyLight: number; blockLight: number } {
  const sampleX = localX + normal.x;
  const sampleY = worldY + normal.y;
  const sampleZ = localZ + normal.z;

  if (isInsideChunk(sampleX, sampleY, sampleZ)) {
    return {
      skyLight: chunk.getSkyLight(sampleX, sampleY, sampleZ),
      blockLight: chunk.getBlockLight(sampleX, sampleY, sampleZ)
    };
  }

  return {
    skyLight: chunk.getSkyLight(localX, worldY, localZ),
    blockLight: chunk.getBlockLight(localX, worldY, localZ)
  };
}

function fullyOccludesFace(definition: BlockDefinition): boolean {
  return definition.renderLayer === "solid" && definition.opacity >= 15;
}

function shouldCullSameLayerFace(current: BlockDefinition, neighbor: BlockDefinition): boolean {
  if (current.renderLayer !== neighbor.renderLayer) {
    return false;
  }
  if (current.renderLayer === "cutout") {
    return current.opacity > 0 && neighbor.opacity > 0;
  }
  return false;
}

function isInsideChunk(localX: number, worldY: number, localZ: number): boolean {
  return (
    localX >= 0 &&
    localX < CHUNK_SIZE &&
    localZ >= 0 &&
    localZ < CHUNK_SIZE &&
    worldY >= WORLD_MIN_Y &&
    worldY <= WORLD_MAX_Y
  );
}

function addVec(left: Vec3i, right: Vec3i): Vec3i {
  return {
    x: left.x + right.x,
    y: left.y + right.y,
    z: left.z + right.z
  };
}

function scaleVec(vector: Vec3i, scale: number): Vec3i {
  return {
    x: vector.x * scale,
    y: vector.y * scale,
    z: vector.z * scale
  };
}
