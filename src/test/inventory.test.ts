import test from "node:test";
import assert from "node:assert/strict";
import { PlayerInventory } from "../player/inventory.ts";

test("PlayerInventory removes selected items and clears empty slots", () => {
  const inventory = new PlayerInventory([
    { label: "stone", stateId: 3, count: 1, maxStackSize: 64 },
    { label: "empty", stateId: null, count: 0, maxStackSize: 64 }
  ]);

  assert.equal(inventory.removeOneSelected(), 3);
  assert.deepEqual(inventory.selectedSlot(), {
    label: "empty",
    stateId: null,
    count: 0,
    maxStackSize: 64
  });
  assert.equal(inventory.removeOneSelected(), null);
});

test("PlayerInventory stacks drops into matching and empty hotbar slots", () => {
  const inventory = new PlayerInventory([
    { label: "stone", stateId: 3, count: 63, maxStackSize: 64 },
    { label: "empty", stateId: null, count: 0, maxStackSize: 64 }
  ]);

  assert.equal(inventory.addStack(3, "stone", 2), true);

  assert.equal(inventory.slots[0].count, 64);
  assert.deepEqual(inventory.slots[1], {
    label: "stone",
    stateId: 3,
    count: 1,
    maxStackSize: 64
  });
});

test("PlayerInventory consumes selected food without requiring a block state", () => {
  const inventory = new PlayerInventory([
    {
      label: "apple",
      stateId: null,
      count: 2,
      maxStackSize: 64,
      food: { nutrition: 4, saturationModifier: 0.3 }
    }
  ]);

  const consumed = inventory.consumeOneSelected();

  assert.equal(consumed?.label, "apple");
  assert.equal(consumed?.food?.nutrition, 4);
  assert.equal(inventory.selectedSlot().count, 1);
});

test("PlayerInventory does not overwrite food slots when adding block stacks", () => {
  const inventory = new PlayerInventory([
    {
      label: "apple",
      stateId: null,
      count: 8,
      maxStackSize: 64,
      food: { nutrition: 4, saturationModifier: 0.3 }
    },
    { label: "empty", stateId: null, count: 0, maxStackSize: 64 }
  ]);

  assert.equal(inventory.addStack(3, "stone", 1), true);

  assert.equal(inventory.slots[0].label, "apple");
  assert.equal(inventory.slots[0].count, 8);
  assert.equal(inventory.slots[1].label, "stone");
  assert.equal(inventory.slots[1].stateId, 3);
});

test("PlayerInventory stacks picked up food into existing food slots", () => {
  const inventory = new PlayerInventory([
    {
      label: "apple",
      stateId: null,
      count: 8,
      maxStackSize: 64,
      food: { nutrition: 4, saturationModifier: 0.3 }
    },
    { label: "empty", stateId: null, count: 0, maxStackSize: 64 }
  ]);

  assert.equal(inventory.addFoodStack("apple", { nutrition: 4, saturationModifier: 0.3 }, 2), true);

  assert.equal(inventory.slots[0].label, "apple");
  assert.equal(inventory.slots[0].count, 10);
  assert.equal(inventory.slots[1].label, "empty");
});

test("PlayerInventory stacks material items without treating them as empty", () => {
  const inventory = new PlayerInventory([
    { label: "coal", stateId: null, count: 2, maxStackSize: 64, item: { id: "coal", kind: "material" } },
    { label: "empty", stateId: null, count: 0, maxStackSize: 64 }
  ]);

  assert.equal(inventory.addItemStack("coal", 3), true);
  assert.equal(inventory.addStack(3, "stone", 1), true);

  assert.equal(inventory.slots[0].label, "coal");
  assert.equal(inventory.slots[0].count, 5);
  assert.equal(inventory.slots[1].label, "stone");
});

test("PlayerInventory removes material ingredients by label", () => {
  const inventory = new PlayerInventory([
    { label: "stick", stateId: null, count: 4, maxStackSize: 64, item: { id: "stick", kind: "material" } }
  ]);

  assert.equal(inventory.hasItems([{ label: "stick", count: 2 }]), true);
  assert.equal(inventory.removeItems([{ label: "stick", count: 2 }]), true);
  assert.equal(inventory.countItem("stick"), 2);
});

test("PlayerInventory damages selected tools and clears broken tools", () => {
  const inventory = new PlayerInventory([
    {
      label: "stone_sword",
      stateId: null,
      count: 1,
      maxStackSize: 1,
      tool: {
        kind: "sword",
        level: "stone",
        attackDamage: 7,
        miningSpeed: 1,
        durability: 2,
        maxDurability: 131
      }
    }
  ]);

  assert.equal(inventory.damageSelectedTool(), false);
  assert.equal(inventory.selectedSlot().tool?.durability, 1);
  assert.equal(inventory.damageSelectedTool(), true);
  assert.deepEqual(inventory.selectedSlot(), {
    label: "empty",
    stateId: null,
    count: 0,
    maxStackSize: 64
  });
});

test("PlayerInventory does not treat tools as placeable blocks", () => {
  const inventory = new PlayerInventory([
    {
      label: "stone_pickaxe",
      stateId: null,
      count: 1,
      maxStackSize: 1,
      tool: {
        kind: "pickaxe",
        level: "stone",
        attackDamage: 5,
        miningSpeed: 3.2,
        durability: 131,
        maxDurability: 131
      }
    }
  ]);

  assert.equal(inventory.removeOneSelected(), null);
  assert.equal(inventory.selectedSlot().label, "stone_pickaxe");
});

test("PlayerInventory counts and removes non-tool ingredients by label", () => {
  const inventory = new PlayerInventory([
    { label: "stone", stateId: 3, count: 2, maxStackSize: 64 },
    { label: "stone", stateId: 3, count: 4, maxStackSize: 64 },
    {
      label: "stone_sword",
      stateId: null,
      count: 1,
      maxStackSize: 1,
      tool: {
        kind: "sword",
        level: "stone",
        attackDamage: 7,
        miningSpeed: 1,
        durability: 131,
        maxDurability: 131
      }
    }
  ]);

  assert.equal(inventory.countItem("stone"), 6);
  assert.equal(inventory.removeItems([{ label: "stone", count: 5 }]), true);
  assert.equal(inventory.countItem("stone"), 1);
  assert.equal(inventory.countItem("stone_sword"), 0);
});

test("PlayerInventory adds crafted tools only to empty slots", () => {
  const inventory = new PlayerInventory([
    { label: "stone", stateId: 3, count: 64, maxStackSize: 64 },
    { label: "empty", stateId: null, count: 0, maxStackSize: 64 }
  ]);

  assert.equal(inventory.addToolStack({
    label: "stone_sword",
    stateId: null,
    count: 1,
    maxStackSize: 1,
    tool: {
      kind: "sword",
      level: "stone",
      attackDamage: 7,
      miningSpeed: 1,
      durability: 131,
      maxDurability: 131
    }
  }), true);

  assert.equal(inventory.slots[1].label, "stone_sword");
  assert.equal(inventory.slots[1].tool?.kind, "sword");
});

test("PlayerInventory treats armor as non-placeable single-slot equipment", () => {
  const inventory = new PlayerInventory([
    {
      label: "iron_helmet",
      stateId: null,
      count: 1,
      maxStackSize: 1,
      armor: {
        slot: "helmet",
        material: "iron",
        points: 2,
        durability: 165,
        maxDurability: 165
      }
    },
    { label: "empty", stateId: null, count: 0, maxStackSize: 64 }
  ]);

  assert.equal(inventory.removeOneSelected(), null);
  const taken = inventory.takeSelectedArmorStack();

  assert.equal(taken?.armor?.slot, "helmet");
  assert.deepEqual(inventory.slots[0], {
    label: "empty",
    stateId: null,
    count: 0,
    maxStackSize: 64
  });
  assert.equal(inventory.addArmorStack(taken!), true);
  assert.equal(inventory.slots[0].label, "iron_helmet");
  assert.equal(inventory.slots[0].armor?.points, 2);
});
