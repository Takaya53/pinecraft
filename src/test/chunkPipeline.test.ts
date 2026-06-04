import test from "node:test";
import assert from "node:assert/strict";
import { createDefaultBlockRegistry } from "../block/blockRegistry.ts";
import { AIR_STATE_ID } from "../block/blockState.ts";
import { ChunkPipeline } from "../pipeline/ChunkPipeline.ts";
import { meshFaceCount } from "../meshing/chunkMesher.ts";
import { World } from "../world/World.ts";

test("ChunkPipeline advances a chunk through light and mesh stages", () => {
  const registry = createDefaultBlockRegistry();
  const world = new World({ seed: "pipeline", blockRegistry: registry });
  const stone = registry.resolveState("stone");
  const pipeline = new ChunkPipeline({
    world,
    generator: (chunk) => {
      chunk.setStateId(8, 64, 8, stone);
    }
  });

  const result = pipeline.ensureChunkFull(0, 0);

  assert.equal(result.chunk.status, "FULL");
  assert.ok(result.mesh);
  assert.equal(meshFaceCount(result.mesh), 6);
});

test("ChunkPipeline remeshes after block edits", () => {
  const registry = createDefaultBlockRegistry();
  const world = new World({ seed: "pipeline-edit", blockRegistry: registry });
  const stone = registry.resolveState("stone");
  const pipeline = new ChunkPipeline({
    world,
    generator: (chunk) => {
      chunk.setStateId(8, 64, 8, stone);
    }
  });

  pipeline.ensureChunkFull(0, 0);
  world.setStateId(9, 64, 8, stone);
  const mesh = pipeline.remeshChunk(0, 0);

  assert.equal(meshFaceCount(mesh), 10);
});

test("ChunkPipeline can generate an area before meshing boundary chunks", () => {
  const registry = createDefaultBlockRegistry();
  const world = new World({ seed: "pipeline-area", blockRegistry: registry });
  const stone = registry.resolveState("stone");
  const pipeline = new ChunkPipeline({
    world,
    generator: (chunk) => {
      if (chunk.chunkX === 0) {
        chunk.setStateId(15, 64, 8, stone);
      }
      if (chunk.chunkX === 1) {
        chunk.setStateId(0, 64, 8, stone);
      }
    }
  });

  const results = pipeline.ensureAreaFull(0, 1, 0, 0);
  const first = results.find((result) => result.chunk.chunkX === 0);

  assert.ok(first?.mesh);
  assert.equal(meshFaceCount(first.mesh), 5);
});

test("ChunkPipeline can prepare neighbor chunks without meshing every chunk", () => {
  const registry = createDefaultBlockRegistry();
  const world = new World({ seed: "pipeline-area-ready", blockRegistry: registry });
  const stone = registry.resolveState("stone");
  const pipeline = new ChunkPipeline({
    world,
    generator: (chunk) => {
      if (chunk.chunkX === 0) {
        chunk.setStateId(15, 64, 8, stone);
      }
      if (chunk.chunkX === 1) {
        chunk.setStateId(0, 64, 8, stone);
      }
    }
  });

  const chunks = pipeline.ensureAreaReadyForMeshing(0, 1, 0, 0);
  const mesh = pipeline.remeshChunk(0, 0);

  assert.equal(chunks.length, 2);
  assert.equal(world.getChunk(1, 0)?.status, "LIT");
  assert.equal(pipeline.meshes.has("1,0"), false);
  assert.equal(meshFaceCount(mesh), 5);
});

test("ChunkPipeline setBlockAndRemesh updates world state and mesh", () => {
  const registry = createDefaultBlockRegistry();
  const world = new World({ seed: "pipeline-set-block", blockRegistry: registry });
  const stone = registry.resolveState("stone");
  const pipeline = new ChunkPipeline({
    world,
    generator: (chunk) => {
      chunk.setStateId(8, 64, 8, stone);
    }
  });

  pipeline.ensureChunkFull(0, 0);
  const results = pipeline.setBlockAndRemesh(8, 64, 8, AIR_STATE_ID);

  assert.equal(world.getStateId(8, 64, 8), AIR_STATE_ID);
  assert.equal(results.length, 1);
  assert.ok(results[0].mesh);
  assert.equal(meshFaceCount(results[0].mesh), 0);
});

test("ChunkPipeline setBlockAndRemesh remeshes loaded neighbors on chunk edges", () => {
  const registry = createDefaultBlockRegistry();
  const world = new World({ seed: "pipeline-edge-edit", blockRegistry: registry });
  const stone = registry.resolveState("stone");
  const pipeline = new ChunkPipeline({
    world,
    generator: (chunk) => {
      if (chunk.chunkX === 0) {
        chunk.setStateId(15, 64, 8, stone);
      }
      if (chunk.chunkX === 1) {
        chunk.setStateId(0, 64, 8, stone);
      }
    }
  });

  pipeline.ensureAreaFull(0, 1, 0, 0);
  const results = pipeline.setBlockAndRemesh(15, 64, 8, AIR_STATE_ID);

  assert.equal(results.length, 2);
  assert.deepEqual(
    results.map((result) => result.chunk.chunkX).sort(),
    [0, 1]
  );
  assert.equal(meshFaceCount(pipeline.meshes.get("1,0")!), 6);
});
