import test from "node:test";
import assert from "node:assert/strict";
import { createDefaultBlockRegistry } from "../block/blockRegistry.ts";
import { AIR_STATE_ID } from "../block/blockState.ts";
import { ChunkDeltaStore, applyStoredChunkDeltas, createStoredChunkDeltas } from "../persistence/chunkDeltaStore.ts";
import { ChunkPipeline, meshKey } from "../pipeline/ChunkPipeline.ts";
import { ChunkColumn } from "../world/Chunk.ts";
import { World } from "../world/World.ts";

test("ChunkDeltaStore captures and reapplies edited blocks", () => {
  const registry = createDefaultBlockRegistry();
  const chunk = new ChunkColumn({ chunkX: 2, chunkZ: -1 });
  const stone = registry.resolveState("stone");
  const dirt = registry.resolveState("dirt");

  chunk.setGeneratedStateId(4, 64, 5, stone);
  chunk.setStateId(4, 64, 5, dirt);
  const store = new ChunkDeltaStore();
  store.capture(chunk);

  const regenerated = new ChunkColumn({ chunkX: 2, chunkZ: -1 });
  regenerated.setGeneratedStateId(4, 64, 5, stone);
  store.applyToChunk(regenerated, registry);

  assert.equal(regenerated.getStateId(4, 64, 5), dirt);
  assert.equal(regenerated.blockDeltas.size, 1);
});

test("stored chunk deltas can be sent as worker-safe payloads", () => {
  const registry = createDefaultBlockRegistry();
  const chunk = new ChunkColumn({ chunkX: 0, chunkZ: 0 });
  const grass = registry.resolveState("grass");

  chunk.setStateId(8, 70, 8, grass);
  const payload = createStoredChunkDeltas(chunk);
  const regenerated = new ChunkColumn({ chunkX: 0, chunkZ: 0 });
  applyStoredChunkDeltas(regenerated, payload.blockDeltas, registry);

  assert.deepEqual(payload.blockDeltas[0], { localX: 8, worldY: 70, localZ: 8, stateId: grass });
  assert.equal(regenerated.getStateId(8, 70, 8), grass);
});

test("ChunkPipeline can regenerate an unloaded chunk with saved player edits", () => {
  const registry = createDefaultBlockRegistry();
  const world = new World({ seed: "delta-store-pipeline", blockRegistry: registry });
  const store = new ChunkDeltaStore();
  const stone = registry.resolveState("stone");
  const dirt = registry.resolveState("dirt");
  const pipeline = new ChunkPipeline({
    world,
    generator: (chunk) => {
      chunk.setGeneratedStateId(8, 64, 8, stone);
      chunk.recomputeHeightmapsFromRegistry(registry);
      store.applyToChunk(chunk, registry);
    }
  });

  pipeline.ensureChunkFull(0, 0);
  world.setStateId(8, 64, 8, dirt);
  store.capture(world.getChunk(0, 0)!);
  world.unloadChunk(0, 0);
  pipeline.meshes.delete(meshKey(0, 0));

  pipeline.ensureChunkFull(0, 0);

  assert.equal(world.getStateId(8, 64, 8), dirt);
  assert.notEqual(world.getStateId(8, 64, 8), AIR_STATE_ID);
});
