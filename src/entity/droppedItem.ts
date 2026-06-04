import type { StateId } from "../block/blockState.ts";
import type { Vec3i } from "../core/constants.ts";
import type { CollisionWorld } from "../physics/playerPhysics.ts";
import type { HotbarSlot, PlayerInventory } from "../player/inventory.ts";

export type DroppedItem = {
  id: number;
  stateId: StateId | null;
  label: string;
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
  tool?: HotbarSlot["tool"];
  armor?: HotbarSlot["armor"];
  position: Vec3i;
  velocity: Vec3i;
  ageSeconds: number;
  pickupDelaySeconds: number;
};

export type DroppedItemStepResult = {
  pickedUpIds: number[];
};

const GRAVITY = 18;
const GROUND_OFFSET = 0.12;
const PICKUP_RADIUS = 1.35;
const DEFAULT_PICKUP_DELAY = 0.45;

export class DroppedItemWorld {
  items: DroppedItem[];
  nextId: number;

  constructor() {
    this.items = [];
    this.nextId = 1;
  }

  spawn(options: {
    stateId: StateId | null;
    label: string;
    count?: number;
    maxStackSize?: number;
    food?: DroppedItem["food"];
    item?: DroppedItem["item"];
    tool?: DroppedItem["tool"];
    armor?: DroppedItem["armor"];
    position: Vec3i;
    velocity?: Vec3i;
    pickupDelaySeconds?: number;
  }): DroppedItem {
    const item: DroppedItem = {
      id: this.nextId,
      stateId: options.stateId,
      label: options.label,
      count: options.count ?? 1,
      maxStackSize: options.maxStackSize ?? 64,
      food: options.food ? { ...options.food } : undefined,
      item: options.item ? { ...options.item } : undefined,
      tool: options.tool ? { ...options.tool } : undefined,
      armor: options.armor ? { ...options.armor } : undefined,
      position: { ...options.position },
      velocity: options.velocity ? { ...options.velocity } : { x: 0, y: 2.4, z: 0 },
      ageSeconds: 0,
      pickupDelaySeconds: options.pickupDelaySeconds ?? DEFAULT_PICKUP_DELAY
    };
    this.nextId += 1;
    this.items.push(item);
    return item;
  }

  step(
    world: CollisionWorld,
    inventory: PlayerInventory,
    playerPosition: Vec3i,
    deltaSeconds: number
  ): DroppedItemStepResult {
    const pickedUpIds: number[] = [];

    for (const item of this.items) {
      item.ageSeconds += deltaSeconds;
      item.pickupDelaySeconds = Math.max(0, item.pickupDelaySeconds - deltaSeconds);
      stepItemPhysics(world, item, deltaSeconds);

      if (item.pickupDelaySeconds > 0 || distance(item.position, playerPosition) > PICKUP_RADIUS) {
        continue;
      }
      const pickedUp = item.food
        ? inventory.addFoodStack(item.label, item.food, item.count, item.maxStackSize)
        : item.item
          ? inventory.addItemStack(item.label, item.count, item.maxStackSize)
        : item.tool
          ? inventory.addToolStack({
            label: item.label,
            stateId: null,
            count: 1,
            maxStackSize: 1,
            tool: item.tool
          })
        : item.armor
          ? inventory.addArmorStack({
            label: item.label,
            stateId: null,
            count: 1,
            maxStackSize: 1,
            armor: item.armor
          })
        : item.stateId !== null && inventory.addStack(item.stateId, item.label, item.count, item.maxStackSize);
      if (pickedUp) {
        pickedUpIds.push(item.id);
      }
    }

    if (pickedUpIds.length > 0) {
      const picked = new Set(pickedUpIds);
      this.items = this.items.filter((item) => !picked.has(item.id));
    }

    return { pickedUpIds };
  }
}

function stepItemPhysics(world: CollisionWorld, item: DroppedItem, deltaSeconds: number): void {
  item.velocity.y -= GRAVITY * deltaSeconds;
  item.velocity.x *= Math.max(0, 1 - 2.2 * deltaSeconds);
  item.velocity.z *= Math.max(0, 1 - 2.2 * deltaSeconds);

  item.position.x += item.velocity.x * deltaSeconds;
  item.position.y += item.velocity.y * deltaSeconds;
  item.position.z += item.velocity.z * deltaSeconds;

  const blockX = Math.floor(item.position.x);
  const blockY = Math.floor(item.position.y - GROUND_OFFSET);
  const blockZ = Math.floor(item.position.z);
  if (item.velocity.y <= 0 && world.isSolidBlockLoaded(blockX, blockY, blockZ)) {
    item.position.y = blockY + 1 + GROUND_OFFSET;
    item.velocity.y = 0;
  }
}

function distance(left: Vec3i, right: Vec3i): number {
  return Math.hypot(left.x - right.x, left.y - right.y, left.z - right.z);
}
