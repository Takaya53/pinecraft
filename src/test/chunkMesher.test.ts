import test from "node:test";
import assert from "node:assert/strict";
import { createDefaultBlockRegistry } from "../block/blockRegistry.ts";
import { LightEngine } from "../lighting/lightEngine.ts";
import { calculateVertexAo, aoToBrightness } from "../meshing/ao.ts";
import { ChunkMesher, meshFaceCount, meshLayerFaceCount } from "../meshing/chunkMesher.ts";
import { World } from "../world/World.ts";

test("calculateVertexAo follows Minecraft-style side/corner rules", () => {
  assert.equal(calculateVertexAo({ side1: false, side2: false, corner: false }), 3);
  assert.equal(calculateVertexAo({ side1: true, side2: false, corner: false }), 2);
  assert.equal(calculateVertexAo({ side1: false, side2: true, corner: true }), 1);
  assert.equal(calculateVertexAo({ side1: true, side2: true, corner: false }), 0);
  assert.equal(aoToBrightness(3), 1);
});

test("ChunkMesher emits six faces for a single solid block", () => {
  const registry = createDefaultBlockRegistry();
  const world = new World({ seed: "mesh-single", blockRegistry: registry });
  const chunk = world.getOrCreateChunk(0, 0);
  const stone = registry.resolveState("stone");
  const mesher = new ChunkMesher(registry);

  chunk.setStateId(8, 64, 8, stone);
  const mesh = mesher.buildChunkMesh(chunk);

  assert.equal(meshFaceCount(mesh), 6);
  assert.equal(meshLayerFaceCount(mesh.solid), 6);
  assert.equal(mesh.solid.positions.length, 6 * 4 * 3);
  assert.equal(mesh.solid.indices.length, 6 * 6);
});

test("ChunkMesher triangle winding matches emitted normals", () => {
  const registry = createDefaultBlockRegistry();
  const world = new World({ seed: "mesh-winding", blockRegistry: registry });
  const chunk = world.getOrCreateChunk(0, 0);
  const stone = registry.resolveState("stone");
  const mesher = new ChunkMesher(registry);

  chunk.setStateId(8, 64, 8, stone);
  const mesh = mesher.buildChunkMesh(chunk);

  for (let faceIndex = 0; faceIndex < mesh.solid.faceDirections.length; faceIndex += 1) {
    const vertexOffset = faceIndex * 4 * 3;
    const normalOffset = faceIndex * 4 * 3;
    const firstIndex = mesh.solid.indices[faceIndex * 6];
    const secondIndex = mesh.solid.indices[faceIndex * 6 + 1];
    const thirdIndex = mesh.solid.indices[faceIndex * 6 + 2];
    const a = readVec(mesh.solid.positions, firstIndex * 3);
    const b = readVec(mesh.solid.positions, secondIndex * 3);
    const c = readVec(mesh.solid.positions, thirdIndex * 3);
    const normal = readVec(mesh.solid.normals, normalOffset);
    const triangleNormal = cross(subtract(b, a), subtract(c, a));

    assert.ok(dot(triangleNormal, normal) > 0, `bad winding for ${mesh.solid.faceDirections[faceIndex]}`);
    assert.ok(vertexOffset >= 0);
  }
});

test("ChunkMesher culls the internal face between adjacent opaque blocks", () => {
  const registry = createDefaultBlockRegistry();
  const world = new World({ seed: "mesh-cull", blockRegistry: registry });
  const chunk = world.getOrCreateChunk(0, 0);
  const stone = registry.resolveState("stone");
  const mesher = new ChunkMesher(registry);

  chunk.setStateId(8, 64, 8, stone);
  chunk.setStateId(9, 64, 8, stone);
  const mesh = mesher.buildChunkMesh(chunk);

  assert.equal(meshFaceCount(mesh), 10);
});

function readVec(values: number[], offset: number): { x: number; y: number; z: number } {
  return {
    x: values[offset],
    y: values[offset + 1],
    z: values[offset + 2]
  };
}

function subtract(
  left: { x: number; y: number; z: number },
  right: { x: number; y: number; z: number }
): { x: number; y: number; z: number } {
  return {
    x: left.x - right.x,
    y: left.y - right.y,
    z: left.z - right.z
  };
}

function cross(
  left: { x: number; y: number; z: number },
  right: { x: number; y: number; z: number }
): { x: number; y: number; z: number } {
  return {
    x: left.y * right.z - left.z * right.y,
    y: left.z * right.x - left.x * right.z,
    z: left.x * right.y - left.y * right.x
  };
}

function dot(
  left: { x: number; y: number; z: number },
  right: { x: number; y: number; z: number }
): number {
  return left.x * right.x + left.y * right.y + left.z * right.z;
}

function maxLocalAxis(values: ArrayLike<number>, axis: 0 | 1 | 2, origin: number): number {
  let max = -Infinity;
  for (let index = axis; index < values.length; index += 3) {
    max = Math.max(max, Number(values[index]) - origin);
  }
  return max;
}

test("ChunkMesher culls faces across loaded chunk boundaries", () => {
  const registry = createDefaultBlockRegistry();
  const world = new World({ seed: "mesh-cross-chunk", blockRegistry: registry });
  const chunk = world.getOrCreateChunk(0, 0);
  const neighbor = world.getOrCreateChunk(1, 0);
  const stone = registry.resolveState("stone");
  const mesher = new ChunkMesher(registry);

  chunk.setStateId(15, 64, 8, stone);
  neighbor.setStateId(0, 64, 8, stone);
  const mesh = mesher.buildChunkMesh(chunk, world);

  assert.equal(meshFaceCount(mesh), 5);
});

test("ChunkMesher assigns cutout blocks to the cutout layer", () => {
  const registry = createDefaultBlockRegistry();
  const world = new World({ seed: "mesh-cutout", blockRegistry: registry });
  const chunk = world.getOrCreateChunk(0, 0);
  const leaves = registry.resolveState("leaves");
  const mesher = new ChunkMesher(registry);

  chunk.setStateId(8, 64, 8, leaves);
  const mesh = mesher.buildChunkMesh(chunk);

  assert.equal(meshLayerFaceCount(mesh.cutout), 6);
  assert.equal(meshLayerFaceCount(mesh.solid), 0);
});

test("ChunkMesher renders doors as thin panels and rotates open doors", () => {
  const registry = createDefaultBlockRegistry();
  const closedWorld = new World({ seed: "mesh-door-closed", blockRegistry: registry });
  const closedChunk = closedWorld.getOrCreateChunk(0, 0);
  const openWorld = new World({ seed: "mesh-door-open", blockRegistry: registry });
  const openChunk = openWorld.getOrCreateChunk(0, 0);
  const closedDoor = registry.resolveState("door", { facing: "north", half: "lower", open: false });
  const openDoor = registry.resolveState("door", { facing: "north", half: "lower", open: true });
  const mesher = new ChunkMesher(registry);

  closedChunk.setStateId(8, 64, 8, closedDoor);
  openChunk.setStateId(8, 64, 8, openDoor);
  const closedMesh = mesher.buildChunkMesh(closedChunk);
  const openMesh = mesher.buildChunkMesh(openChunk);

  assert.equal(meshLayerFaceCount(closedMesh.cutout), 6);
  assert.equal(meshLayerFaceCount(openMesh.cutout), 6);
  assert.ok(maxLocalAxis(closedMesh.cutout.positions, 2, 8) <= 0.2);
  assert.ok(maxLocalAxis(openMesh.cutout.positions, 0, 8) <= 0.2);
});

test("ChunkMesher renders bells as hanging multi-part cutout models", () => {
  const registry = createDefaultBlockRegistry();
  const world = new World({ seed: "mesh-bell", blockRegistry: registry });
  const chunk = world.getOrCreateChunk(0, 0);
  const bell = registry.resolveState("bell");
  const mesher = new ChunkMesher(registry);

  chunk.setStateId(8, 64, 8, bell);
  const mesh = mesher.buildChunkMesh(chunk);

  assert.equal(meshLayerFaceCount(mesh.cutout), 30);
  assert.equal(meshLayerFaceCount(mesh.solid), 0);
  assert.ok(maxLocalAxis(mesh.cutout.positions, 0, 8) <= 0.86);
  assert.ok(maxLocalAxis(mesh.cutout.positions, 1, 64) <= 1);
  assert.ok(maxLocalAxis(mesh.cutout.positions, 2, 8) <= 0.88);
});

test("ChunkMesher keeps trunk and ground ranges when leaves raise world surface", () => {
  const registry = createDefaultBlockRegistry();
  const world = new World({ seed: "mesh-tree-range", blockRegistry: registry });
  const chunk = world.getOrCreateChunk(0, 0);
  const grass = registry.resolveState("grass");
  const log = registry.resolveState("log");
  const leaves = registry.resolveState("leaves");
  const mesher = new ChunkMesher(registry);

  chunk.setStateId(8, 64, 8, grass);
  for (let y = 65; y <= 69; y += 1) {
    chunk.setStateId(8, y, 8, log);
  }
  chunk.setStateId(8, 72, 8, leaves);
  chunk.heightmaps.set("WORLD_SURFACE", 8, 8, 72);
  chunk.heightmaps.set("OCEAN_FLOOR", 8, 8, 64);
  chunk.heightmaps.set("MOTION_BLOCKING", 8, 8, 72);
  chunk.heightmaps.set("MOTION_BLOCKING_NO_LEAVES", 8, 8, 69);

  const mesh = mesher.buildChunkMesh(chunk, world);

  assert.ok(mesh.solid.stateIds.includes(grass));
  assert.ok(mesh.solid.stateIds.includes(log));
  assert.ok(mesh.cutout.stateIds.includes(leaves));
});

test("ChunkMesher includes generated cave walls below the surface range", () => {
  const registry = createDefaultBlockRegistry();
  const world = new World({ seed: "mesh-generated-cave", blockRegistry: registry });
  const chunk = world.getOrCreateChunk(0, 0);
  const air = registry.resolveState("air");
  const stone = registry.resolveState("stone");
  const mesher = new ChunkMesher(registry);

  for (let localX = 7; localX <= 9; localX += 1) {
    for (let localZ = 7; localZ <= 9; localZ += 1) {
      for (let worldY = 40; worldY <= 56; worldY += 1) {
        chunk.setGeneratedStateId(localX, worldY, localZ, stone);
      }
    }
  }
  chunk.setGeneratedStateId(8, 45, 8, air);
  chunk.recomputeHeightmapsFromRegistry(registry);

  const mesh = mesher.buildChunkMesh(chunk, world);
  const hasDeepCaveVertex = mesh.solid.positions.some((value, index) => {
    return index % 3 === 1 && value >= 45 && value <= 46;
  });

  assert.ok(hasDeepCaveVertex);
});

test("ChunkMesher culls internal faces between adjacent cutout blocks", () => {
  const registry = createDefaultBlockRegistry();
  const world = new World({ seed: "mesh-cutout-cull", blockRegistry: registry });
  const chunk = world.getOrCreateChunk(0, 0);
  const leaves = registry.resolveState("leaves");
  const mesher = new ChunkMesher(registry);

  chunk.setStateId(8, 64, 8, leaves);
  chunk.setStateId(9, 64, 8, leaves);
  const mesh = mesher.buildChunkMesh(chunk);

  assert.equal(meshLayerFaceCount(mesh.cutout), 10);
});


test("ChunkMesher samples vertex AO from blocks around the exposed face", () => {
  const registry = createDefaultBlockRegistry();
  const world = new World({ seed: "mesh-ao", blockRegistry: registry });
  const chunk = world.getOrCreateChunk(0, 0);
  const stone = registry.resolveState("stone");
  const mesher = new ChunkMesher(registry);

  chunk.setStateId(8, 64, 8, stone);
  chunk.setStateId(9, 65, 8, stone);
  chunk.setStateId(8, 65, 9, stone);
  chunk.setStateId(9, 65, 9, stone);
  const mesh = mesher.buildChunkMesh(chunk);

  assert.ok(mesh.solid.ao.some((ao) => ao === 0));
  assert.ok(mesh.solid.ao.some((ao) => ao === 3));
});

test("ChunkMesher writes light samples onto face vertices", () => {
  const registry = createDefaultBlockRegistry();
  const world = new World({ seed: "mesh-light", blockRegistry: registry });
  const chunk = world.getOrCreateChunk(0, 0);
  const lamp = registry.resolveState("lamp");
  const lightEngine = new LightEngine(registry);
  const mesher = new ChunkMesher(registry);

  chunk.setStateId(8, 64, 8, lamp);
  lightEngine.recomputeChunkLocal(chunk);
  const mesh = mesher.buildChunkMesh(chunk);

  assert.equal(Math.max(...mesh.solid.blockLight), 14);
  assert.ok(mesh.solid.skyLight.every((light) => light >= 0 && light <= 15));
});
