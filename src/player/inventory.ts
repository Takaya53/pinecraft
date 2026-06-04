import type { StateId } from "../block/blockState.ts";

export type ArmorSlotName = "helmet" | "chestplate" | "leggings" | "boots";
export type ArmorMetadata = {
  slot: ArmorSlotName;
  material: "iron";
  points: number;
  durability: number;
  maxDurability: number;
};

export type HotbarSlot = {
  label: string;
  stateId: StateId | null;
  count: number;
  maxStackSize: number;
  food?: {
    nutrition: number;
    saturationModifier: number;
  };
  item?: {
    id: string;
    kind: "material";
  };
  tool?: {
    kind: "sword" | "pickaxe" | "axe" | "shovel" | "hoe";
    level: "wood" | "stone" | "iron";
    attackDamage: number;
    miningSpeed: number;
    durability: number;
    maxDurability: number;
  };
  armor?: ArmorMetadata;
};

export class PlayerInventory {
  slots: HotbarSlot[];
  selectedIndex: number;

  constructor(slots: readonly HotbarSlot[], selectedIndex = 0) {
    this.slots = slots.map(cloneSlot);
    this.selectedIndex = selectedIndex;
  }

  select(index: number): void {
    if (!Number.isInteger(index) || index < 0 || index >= this.slots.length) {
      throw new RangeError(`invalid hotbar slot: ${index}`);
    }
    this.selectedIndex = index;
  }

  selectedSlot(): HotbarSlot {
    return this.slots[this.selectedIndex];
  }

  removeOneSelected(): StateId | null {
    const slot = this.selectedSlot();
    if (slot.stateId === null || slot.count <= 0 || slot.tool || slot.armor) {
      return null;
    }

    const stateId = slot.stateId;
    slot.count -= 1;
    if (slot.count <= 0) {
      slot.stateId = null;
      slot.label = "empty";
      slot.count = 0;
      delete slot.food;
      delete slot.item;
      delete slot.tool;
      delete slot.armor;
    }
    return stateId;
  }

  consumeOneSelected(): HotbarSlot | null {
    const slot = this.selectedSlot();
    if (slot.count <= 0 || slot.tool || slot.armor || (slot.stateId === null && !slot.food)) {
      return null;
    }

    const consumed = cloneSlot(slot);
    slot.count -= 1;
    if (slot.count <= 0) {
      slot.stateId = null;
      slot.label = "empty";
      slot.count = 0;
      delete slot.food;
      delete slot.item;
      delete slot.tool;
      delete slot.armor;
    }
    return consumed;
  }

  takeSelectedArmorStack(): HotbarSlot | null {
    const slot = this.selectedSlot();
    if (!slot.armor || slot.count <= 0) {
      return null;
    }
    const taken = cloneSlot(slot);
    clearSlot(slot);
    return taken;
  }

  damageSelectedTool(amount = 1): boolean {
    return this.damageToolAt(this.selectedIndex, amount);
  }

  damageToolAt(index: number, amount = 1): boolean {
    const slot = this.slots[index];
    if (!slot?.tool || amount <= 0) {
      return false;
    }

    slot.tool.durability = Math.max(0, slot.tool.durability - amount);
    if (slot.tool.durability > 0) {
      return false;
    }

    slot.label = "empty";
    slot.stateId = null;
    slot.count = 0;
    slot.maxStackSize = 64;
    delete slot.food;
    delete slot.item;
    delete slot.tool;
    delete slot.armor;
    return true;
  }

  countItem(label: string): number {
    return this.slots.reduce((total, slot) => {
      if (slot.label !== label || slot.tool || slot.armor || slot.count <= 0) {
        return total;
      }
      return total + slot.count;
    }, 0);
  }

  hasItems(items: readonly { label: string; count: number }[]): boolean {
    return items.every((item) => this.countItem(item.label) >= item.count);
  }

  removeItems(items: readonly { label: string; count: number }[]): boolean {
    if (!this.hasItems(items)) {
      return false;
    }

    for (const item of items) {
      let remaining = item.count;
      for (const slot of this.slots) {
        if (slot.label !== item.label || slot.tool || slot.armor || remaining <= 0) {
          continue;
        }
        const removed = Math.min(remaining, slot.count);
        slot.count -= removed;
        remaining -= removed;
        if (slot.count <= 0) {
          clearSlot(slot);
        }
      }
    }

    return true;
  }

  addToolStack(toolSlot: HotbarSlot): boolean {
    if (!toolSlot.tool || toolSlot.count <= 0) {
      return false;
    }
    for (const slot of this.slots) {
      if (!isEmptySlot(slot)) {
        continue;
      }
      const cloned = cloneSlot(toolSlot);
      slot.label = cloned.label;
      slot.stateId = null;
      slot.count = 1;
      slot.maxStackSize = 1;
      delete slot.food;
      delete slot.item;
      delete slot.armor;
      slot.tool = cloned.tool;
      return true;
    }
    return false;
  }

  addArmorStack(armorSlot: HotbarSlot): boolean {
    if (!armorSlot.armor || armorSlot.count <= 0) {
      return false;
    }
    for (const slot of this.slots) {
      if (!isEmptySlot(slot)) {
        continue;
      }
      const cloned = cloneSlot(armorSlot);
      slot.label = cloned.label;
      slot.stateId = null;
      slot.count = 1;
      slot.maxStackSize = 1;
      delete slot.food;
      delete slot.item;
      delete slot.tool;
      slot.armor = cloned.armor;
      return true;
    }
    return false;
  }

  addItemStack(label: string, count = 1, maxStackSize = 64): boolean {
    let remaining = count;

    for (const slot of this.slots) {
      if (slot.item && slot.label === label && slot.count < slot.maxStackSize) {
        const moved = Math.min(remaining, slot.maxStackSize - slot.count);
        slot.count += moved;
        remaining -= moved;
      }
      if (remaining === 0) {
        return true;
      }
    }

    for (const slot of this.slots) {
      if (isEmptySlot(slot)) {
        const moved = Math.min(remaining, maxStackSize);
        slot.stateId = null;
        slot.label = label;
        slot.count = moved;
        slot.maxStackSize = maxStackSize;
        delete slot.food;
        delete slot.tool;
        delete slot.armor;
        slot.item = { id: label, kind: "material" };
        remaining -= moved;
      }
      if (remaining === 0) {
        return true;
      }
    }

    return false;
  }

  addStack(stateId: StateId, label: string, count = 1, maxStackSize = 64): boolean {
    let remaining = count;

    for (const slot of this.slots) {
      if (slot.stateId === stateId && slot.count < slot.maxStackSize) {
        const moved = Math.min(remaining, slot.maxStackSize - slot.count);
        slot.count += moved;
        remaining -= moved;
      }
      if (remaining === 0) {
        return true;
      }
    }

    for (const slot of this.slots) {
      if (isEmptySlot(slot)) {
        const moved = Math.min(remaining, maxStackSize);
        slot.stateId = stateId;
        slot.label = label;
        slot.count = moved;
        slot.maxStackSize = maxStackSize;
        delete slot.food;
        delete slot.item;
        delete slot.tool;
        delete slot.armor;
        remaining -= moved;
      }
      if (remaining === 0) {
        return true;
      }
    }

    return false;
  }

  addFoodStack(
    label: string,
    food: NonNullable<HotbarSlot["food"]>,
    count = 1,
    maxStackSize = 64
  ): boolean {
    let remaining = count;

    for (const slot of this.slots) {
      if (slot.food && slot.label === label && slot.count < slot.maxStackSize) {
        const moved = Math.min(remaining, slot.maxStackSize - slot.count);
        slot.count += moved;
        remaining -= moved;
      }
      if (remaining === 0) {
        return true;
      }
    }

    for (const slot of this.slots) {
      if (isEmptySlot(slot)) {
        const moved = Math.min(remaining, maxStackSize);
        slot.stateId = null;
        slot.label = label;
        slot.count = moved;
        slot.maxStackSize = maxStackSize;
        delete slot.item;
        delete slot.tool;
        delete slot.armor;
        slot.food = { ...food };
        remaining -= moved;
      }
      if (remaining === 0) {
        return true;
      }
    }

    return false;
  }
}

function isEmptySlot(slot: HotbarSlot): boolean {
  return slot.stateId === null && !slot.food && !slot.item && !slot.tool && !slot.armor && slot.count <= 0;
}

function cloneSlot(slot: HotbarSlot): HotbarSlot {
  return {
    ...slot,
    food: slot.food ? { ...slot.food } : undefined,
    item: slot.item ? { ...slot.item } : undefined,
    tool: slot.tool ? { ...slot.tool } : undefined,
    armor: slot.armor ? { ...slot.armor } : undefined
  };
}

function clearSlot(slot: HotbarSlot): void {
  slot.label = "empty";
  slot.stateId = null;
  slot.count = 0;
  slot.maxStackSize = 64;
  delete slot.food;
  delete slot.item;
  delete slot.tool;
  delete slot.armor;
}
