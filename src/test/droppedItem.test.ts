import test from "node:test";
import assert from "node:assert/strict";
import { PlayerInventory } from "../player/inventory.ts";
import { DroppedItemWorld } from "../entity/droppedItem.ts";

const emptyWorld = {
  isSolidBlockLoaded: () => false
};

test("DroppedItemWorld waits for pickup delay before adding to inventory", () => {
  const inventory = new PlayerInventory([
    { label: "empty", stateId: null, count: 0, maxStackSize: 64 }
  ]);
  const items = new DroppedItemWorld();
  items.spawn({
    stateId: 3,
    label: "stone",
    position: { x: 0, y: 0, z: 0 },
    velocity: { x: 0, y: 0, z: 0 },
    pickupDelaySeconds: 0.5
  });

  assert.deepEqual(items.step(emptyWorld, inventory, { x: 0, y: 0, z: 0 }, 0.25).pickedUpIds, []);
  assert.equal(inventory.slots[0].stateId, null);

  const result = items.step(emptyWorld, inventory, items.items[0].position, 0.3);

  assert.equal(result.pickedUpIds.length, 1);
  assert.equal(inventory.slots[0].stateId, 3);
  assert.equal(inventory.slots[0].count, 1);
  assert.equal(items.items.length, 0);
});

test("DroppedItemWorld keeps items when the inventory has no room", () => {
  const inventory = new PlayerInventory([
    { label: "stone", stateId: 3, count: 64, maxStackSize: 64 }
  ]);
  const items = new DroppedItemWorld();
  items.spawn({
    stateId: 4,
    label: "dirt",
    position: { x: 0, y: 0, z: 0 },
    velocity: { x: 0, y: 0, z: 0 },
    pickupDelaySeconds: 0
  });

  const result = items.step(emptyWorld, inventory, { x: 0, y: 0, z: 0 }, 0.1);

  assert.deepEqual(result.pickedUpIds, []);
  assert.equal(items.items.length, 1);
});

test("DroppedItemWorld can pick up food drops", () => {
  const inventory = new PlayerInventory([
    {
      label: "apple",
      stateId: null,
      count: 1,
      maxStackSize: 64,
      food: { nutrition: 4, saturationModifier: 0.3 }
    }
  ]);
  const items = new DroppedItemWorld();
  items.spawn({
    stateId: null,
    label: "apple",
    food: { nutrition: 4, saturationModifier: 0.3 },
    position: { x: 0, y: 0, z: 0 },
    velocity: { x: 0, y: 0, z: 0 },
    pickupDelaySeconds: 0
  });

  const result = items.step(emptyWorld, inventory, { x: 0, y: 0, z: 0 }, 0.1);

  assert.equal(result.pickedUpIds.length, 1);
  assert.equal(inventory.slots[0].count, 2);
  assert.equal(items.items.length, 0);
});

test("DroppedItemWorld can pick up material item drops", () => {
  const inventory = new PlayerInventory([
    { label: "empty", stateId: null, count: 0, maxStackSize: 64 }
  ]);
  const items = new DroppedItemWorld();
  items.spawn({
    stateId: null,
    label: "coal",
    item: { id: "coal", kind: "material" },
    count: 3,
    position: { x: 0, y: 0, z: 0 },
    velocity: { x: 0, y: 0, z: 0 },
    pickupDelaySeconds: 0
  });

  const result = items.step(emptyWorld, inventory, { x: 0, y: 0, z: 0 }, 0.1);

  assert.equal(result.pickedUpIds.length, 1);
  assert.equal(inventory.slots[0].label, "coal");
  assert.equal(inventory.slots[0].count, 3);
  assert.equal(inventory.slots[0].item?.id, "coal");
});

test("DroppedItemWorld can pick up tool and armor drops", () => {
  const inventory = new PlayerInventory([
    { label: "empty", stateId: null, count: 0, maxStackSize: 64 },
    { label: "empty", stateId: null, count: 0, maxStackSize: 64 }
  ]);
  const items = new DroppedItemWorld();
  items.spawn({
    stateId: null,
    label: "iron_sword",
    tool: { kind: "sword", level: "iron", attackDamage: 9, miningSpeed: 1, durability: 250, maxDurability: 250 },
    position: { x: 0, y: 2, z: 0 },
    pickupDelaySeconds: 0
  });
  items.spawn({
    stateId: null,
    label: "iron_helmet",
    armor: { slot: "helmet", material: "iron", points: 2, durability: 165, maxDurability: 165 },
    position: { x: 0.2, y: 2, z: 0 },
    pickupDelaySeconds: 0
  });

  const result = items.step(emptyWorld, inventory, { x: 0, y: 2, z: 0 }, 0.1);

  assert.equal(result.pickedUpIds.length, 2);
  assert.equal(inventory.slots[0].tool?.level, "iron");
  assert.equal(inventory.slots[1].armor?.slot, "helmet");
});
