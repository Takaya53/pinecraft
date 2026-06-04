import test from "node:test";
import assert from "node:assert/strict";
import {
  cloneHotbar,
  createEmptyWorldSave,
  createChunkSaveV0,
  isWorldSaveV0,
  SAVE_FORMAT_VERSION
} from "../persistence/saveFormat.ts";
import { LocalStorageAdapter, MemoryStorageAdapter } from "../persistence/storageAdapter.ts";
import { ChunkColumn } from "../world/Chunk.ts";
import { createEmptyChunkMesh } from "../meshing/chunkMesher.ts";
import type { WorkerJob, WorkerJobResult } from "../worker/jobs.ts";

test("save format v0 captures world and chunk metadata", () => {
  const save = createEmptyWorldSave("save-seed");
  const chunk = new ChunkColumn({ chunkX: 2, chunkZ: -3 });
  chunk.status = "FULL";
  chunk.setStateId(1, 64, 2, 3);
  const chunkSave = createChunkSaveV0(chunk);

  assert.equal(save.version, SAVE_FORMAT_VERSION);
  assert.equal(save.seed, "save-seed");
  assert.equal(save.player.airTicks, 300);
  assert.deepEqual(save.player.hotbar, []);
  assert.deepEqual(chunkSave.blockDeltas[0], { localX: 1, worldY: 64, localZ: 2, stateId: 3 });
});

test("memory storage adapter clones world saves", async () => {
  const adapter = new MemoryStorageAdapter();
  const save = createEmptyWorldSave("memory-seed");
  await adapter.saveWorld({ worldId: "world" }, save);

  save.time = 99;
  const loaded = await adapter.loadWorld({ worldId: "world" });

  assert.equal(loaded?.time, 0);
  assert.equal(loaded?.seed, "memory-seed");
});

test("local storage adapter round-trips world saves under a scoped key", async () => {
  const backing = new Map<string, string>();
  const adapter = new LocalStorageAdapter({
    prefix: "test-save",
    storage: {
      getItem: (key) => backing.get(key) ?? null,
      setItem: (key, value) => backing.set(key, value),
      removeItem: (key) => backing.delete(key)
    }
  });
  const save = createEmptyWorldSave("local-seed");
  save.player.position = { x: 11, y: 72, z: -4 };

  await adapter.saveWorld({ worldId: "slot-1" }, save);
  save.player.position.x = 99;
  const loaded = await adapter.loadWorld({ worldId: "slot-1" });

  assert.equal(loaded?.player.position.x, 11);
  assert.equal(backing.has("test-save:slot-1"), true);

  await adapter.deleteWorld({ worldId: "slot-1" });
  assert.equal(await adapter.loadWorld({ worldId: "slot-1" }), null);
});

test("world save validator rejects malformed imports", () => {
  const save = createEmptyWorldSave("import-seed");
  save.player.hotbar = [
    {
      label: "iron_pickaxe",
      stateId: null,
      count: 1,
      maxStackSize: 1,
      tool: { kind: "pickaxe", level: "iron", attackDamage: 6, miningSpeed: 5.2, durability: 250, maxDurability: 250 }
    },
    {
      label: "wood_shovel",
      stateId: null,
      count: 1,
      maxStackSize: 1,
      tool: { kind: "shovel", level: "wood", attackDamage: 4, miningSpeed: 1.8, durability: 59, maxDurability: 59 }
    },
    {
      label: "stone_axe",
      stateId: null,
      count: 1,
      maxStackSize: 1,
      tool: { kind: "axe", level: "stone", attackDamage: 8, miningSpeed: 3.8, durability: 131, maxDurability: 131 }
    }
  ];
  save.player.equippedArmor = {
    chestplate: { slot: "chestplate", material: "iron", points: 6, durability: 240, maxDurability: 240 }
  };
  save.containers = [
    {
      x: 4,
      y: 65,
      z: -2,
      slots: [
        { label: "cobblestone", stateId: 17, count: 32, maxStackSize: 64 },
        { label: "empty", stateId: null, count: 0, maxStackSize: 64 }
      ]
    }
  ];

  assert.equal(isWorldSaveV0(save), true);
  assert.equal(isWorldSaveV0({ ...save, version: 999 }), false);
  assert.equal(isWorldSaveV0({ ...save, player: { ...save.player, position: { x: 0, y: "bad", z: 0 } } }), false);
  assert.equal(isWorldSaveV0({ ...save, chunks: [{ chunkX: 0, chunkZ: 0, status: "FULL", blockDeltas: [{}] }] }), false);
  assert.equal(isWorldSaveV0({ ...save, containers: [{ x: 0, y: 64, z: 0, slots: [{}] }] }), false);
});

test("local storage adapter rejects malformed world saves", async () => {
  const backing = new Map<string, string>();
  const adapter = new LocalStorageAdapter({
    prefix: "test-save",
    storage: {
      getItem: (key) => backing.get(key) ?? null,
      setItem: (key, value) => backing.set(key, value),
      removeItem: (key) => backing.delete(key)
    }
  });
  backing.set("test-save:slot-1", JSON.stringify({ version: 0, seed: "bad" }));

  await assert.rejects(() => adapter.loadWorld({ worldId: "slot-1" }), /malformed/);
});

test("cloneHotbar preserves nested item metadata without sharing references", () => {
  const hotbar = cloneHotbar([
    {
      label: "stone_sword",
      stateId: null,
      count: 1,
      maxStackSize: 1,
      tool: { kind: "sword", level: "stone", attackDamage: 7, miningSpeed: 1, durability: 88, maxDurability: 131 }
    }
  ]);

  hotbar[0].tool!.durability = 1;
  const secondClone = cloneHotbar(hotbar);
  hotbar[0].tool!.durability = 0;

  assert.equal(secondClone[0].tool?.durability, 1);

  const armorHotbar = cloneHotbar([
    {
      label: "iron_boots",
      stateId: null,
      count: 1,
      maxStackSize: 1,
      armor: { slot: "boots", material: "iron", points: 2, durability: 195, maxDurability: 195 }
    }
  ]);
  armorHotbar[0].armor!.durability = 12;
  const armorClone = cloneHotbar(armorHotbar);
  armorHotbar[0].armor!.durability = 0;

  assert.equal(armorClone[0].armor?.durability, 12);
});

test("worker job boundary includes chunk generation target status", () => {
  const job: WorkerJob = {
    type: "generateChunk",
    id: "job-1",
    seed: "worker-seed",
    dimensionId: "overworld",
    chunkX: 0,
    chunkZ: 0,
    targetStatus: "LIGHT_PENDING"
  };

  assert.equal(job.type, "generateChunk");
  assert.equal(job.targetStatus, "LIGHT_PENDING");
});

test("worker mesh result carries renderer-independent mesh data", () => {
  const result: WorkerJobResult = {
    type: "chunkMeshed",
    id: "mesh-1",
    chunkX: 0,
    chunkZ: 0,
    mesh: createEmptyChunkMesh()
  };

  assert.equal(result.mesh.solid.positions.length, 0);
});
