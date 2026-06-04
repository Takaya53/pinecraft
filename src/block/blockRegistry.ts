import {
  AIR_STATE_ID,
  canonicalStateKey,
  cloneProperties,
  type BlockProperties,
  type BlockPropertyValue,
  type StateId
} from "./blockState.ts";

export type BlockPropertySchema = Record<string, readonly BlockPropertyValue[]>;

export type BlockDefinition = {
  id: string;
  properties?: BlockPropertySchema;
  defaultProperties?: BlockProperties;
  opacity: number;
  lightEmission: number;
  hardness: number;
  collision: "none" | "solid" | "fluid";
  renderLayer: "none" | "solid" | "cutout" | "translucent" | "fluid";
  soundGroup?: "grass" | "dirt" | "sand" | "stone" | "wood" | "leaves" | "glass";
  liquid?: boolean;
  replaceable?: boolean;
  heightmap?: {
    worldSurface?: boolean;
    oceanFloor?: boolean;
    motionBlocking?: boolean;
    motionBlockingNoLeaves?: boolean;
  };
};

export type RegisteredBlockState = {
  id: StateId;
  typeId: string;
  properties: BlockProperties;
  key: string;
};

export class BlockRegistry {
  definitions: Map<string, BlockDefinition>;
  states: RegisteredBlockState[];
  stateIdsByKey: Map<string, StateId>;
  defaultStateByType: Map<string, StateId>;

  constructor(definitions: readonly BlockDefinition[]) {
    this.definitions = new Map();
    this.states = [];
    this.stateIdsByKey = new Map();
    this.defaultStateByType = new Map();

    for (const definition of definitions) {
      this.register(definition);
    }

    const air = this.resolveState("air");
    if (air !== AIR_STATE_ID) {
      throw new Error(`air state must be ${AIR_STATE_ID}, got ${air}`);
    }
  }

  register(definition: BlockDefinition): void {
    if (this.definitions.has(definition.id)) {
      throw new Error(`duplicate block definition: ${definition.id}`);
    }
    validateDefinition(definition);
    this.definitions.set(definition.id, definition);

    const variants = enumeratePropertyVariants(definition.properties ?? {});
    for (const properties of variants) {
      const key = canonicalStateKey(definition.id, properties);
      const id = this.states.length;
      this.states.push({
        id,
        typeId: definition.id,
        properties: cloneProperties(properties),
        key
      });
      this.stateIdsByKey.set(key, id);
    }

    const defaultProperties = normalizeProperties(definition, definition.defaultProperties ?? {});
    const defaultKey = canonicalStateKey(definition.id, defaultProperties);
    const defaultState = this.stateIdsByKey.get(defaultKey);
    if (defaultState === undefined) {
      throw new Error(`default state was not generated: ${defaultKey}`);
    }
    this.defaultStateByType.set(definition.id, defaultState);
  }

  resolveState(typeId: string, properties: BlockProperties = {}): StateId {
    const definition = this.requireDefinition(typeId);
    const normalized = normalizeProperties(definition, {
      ...this.getState(this.getDefaultState(typeId)).properties,
      ...properties
    });
    const key = canonicalStateKey(typeId, normalized);
    const stateId = this.stateIdsByKey.get(key);
    if (stateId === undefined) {
      throw new Error(`unknown block state: ${key}`);
    }
    return stateId;
  }

  getState(stateId: StateId): RegisteredBlockState {
    const state = this.states[stateId];
    if (!state) {
      throw new RangeError(`unknown state id: ${stateId}`);
    }
    return state;
  }

  getDefinitionForState(stateId: StateId): BlockDefinition {
    return this.requireDefinition(this.getState(stateId).typeId);
  }

  getDefaultState(typeId: string): StateId {
    const stateId = this.defaultStateByType.get(typeId);
    if (stateId === undefined) {
      throw new Error(`unknown block type: ${typeId}`);
    }
    return stateId;
  }

  isAir(stateId: StateId): boolean {
    return stateId === AIR_STATE_ID;
  }

  requireDefinition(typeId: string): BlockDefinition {
    const definition = this.definitions.get(typeId);
    if (!definition) {
      throw new Error(`unknown block type: ${typeId}`);
    }
    return definition;
  }
}

export const DEFAULT_BLOCK_DEFINITIONS: readonly BlockDefinition[] = [
  {
    id: "air",
    opacity: 0,
    lightEmission: 0,
    hardness: 0,
    collision: "none",
    renderLayer: "none",
    replaceable: true
  },
  {
    id: "stone",
    opacity: 15,
    lightEmission: 0,
    hardness: 1.5,
    collision: "solid",
    renderLayer: "solid",
    soundGroup: "stone"
  },
  {
    id: "dirt",
    opacity: 15,
    lightEmission: 0,
    hardness: 0.5,
    collision: "solid",
    renderLayer: "solid",
    soundGroup: "dirt"
  },
  {
    id: "grass",
    properties: { snowy: [false, true] },
    defaultProperties: { snowy: false },
    opacity: 15,
    lightEmission: 0,
    hardness: 0.6,
    collision: "solid",
    renderLayer: "solid",
    soundGroup: "grass"
  },
  {
    id: "sand",
    opacity: 15,
    lightEmission: 0,
    hardness: 0.5,
    collision: "solid",
    renderLayer: "solid",
    soundGroup: "sand"
  },
  {
    id: "water",
    properties: { level: rangeInclusive(0, 15) },
    defaultProperties: { level: 0 },
    opacity: 1,
    lightEmission: 0,
    hardness: 100,
    collision: "fluid",
    renderLayer: "fluid",
    soundGroup: "sand",
    liquid: true,
    replaceable: true
  },
  {
    id: "log",
    properties: { axis: ["x", "y", "z"] },
    defaultProperties: { axis: "y" },
    opacity: 15,
    lightEmission: 0,
    hardness: 2,
    collision: "solid",
    renderLayer: "solid",
    soundGroup: "wood"
  },
  {
    id: "leaves",
    properties: {
      distance: rangeInclusive(1, 7),
      persistent: [false, true]
    },
    defaultProperties: { distance: 7, persistent: false },
    opacity: 1,
    lightEmission: 0,
    hardness: 0.2,
    collision: "solid",
    renderLayer: "cutout",
    soundGroup: "leaves"
  },
  {
    id: "coal_ore",
    opacity: 15,
    lightEmission: 0,
    hardness: 3,
    collision: "solid",
    renderLayer: "solid",
    soundGroup: "stone"
  },
  {
    id: "iron_ore",
    opacity: 15,
    lightEmission: 0,
    hardness: 3,
    collision: "solid",
    renderLayer: "solid",
    soundGroup: "stone"
  },
  {
    id: "gold_ore",
    opacity: 15,
    lightEmission: 0,
    hardness: 3,
    collision: "solid",
    renderLayer: "solid",
    soundGroup: "stone"
  },
  {
    id: "diamond_ore",
    opacity: 15,
    lightEmission: 0,
    hardness: 3,
    collision: "solid",
    renderLayer: "solid",
    soundGroup: "stone"
  },
  {
    id: "torch",
    opacity: 0,
    lightEmission: 14,
    hardness: 0.1,
    collision: "none",
    renderLayer: "cutout",
    soundGroup: "wood"
  },
  {
    id: "lamp",
    opacity: 15,
    lightEmission: 15,
    hardness: 0.3,
    collision: "solid",
    renderLayer: "solid",
    soundGroup: "glass"
  },
  {
    id: "crafting_table",
    opacity: 15,
    lightEmission: 0,
    hardness: 2.5,
    collision: "solid",
    renderLayer: "solid",
    soundGroup: "wood"
  },
  {
    id: "gravel",
    opacity: 15,
    lightEmission: 0,
    hardness: 0.6,
    collision: "solid",
    renderLayer: "solid",
    soundGroup: "stone"
  },
  {
    id: "snow",
    opacity: 15,
    lightEmission: 0,
    hardness: 0.2,
    collision: "solid",
    renderLayer: "solid",
    soundGroup: "sand"
  },
  {
    id: "lava",
    properties: { level: rangeInclusive(0, 15) },
    defaultProperties: { level: 0 },
    opacity: 3,
    lightEmission: 15,
    hardness: 100,
    collision: "fluid",
    renderLayer: "fluid",
    soundGroup: "stone",
    liquid: true,
    replaceable: true
  },
  {
    id: "planks",
    opacity: 15,
    lightEmission: 0,
    hardness: 2,
    collision: "solid",
    renderLayer: "solid",
    soundGroup: "wood"
  },
  {
    id: "cobblestone",
    opacity: 15,
    lightEmission: 0,
    hardness: 2,
    collision: "solid",
    renderLayer: "solid",
    soundGroup: "stone"
  },
  {
    id: "furnace",
    opacity: 15,
    lightEmission: 0,
    hardness: 3.5,
    collision: "solid",
    renderLayer: "solid",
    soundGroup: "stone"
  },
  {
    id: "chest",
    opacity: 15,
    lightEmission: 0,
    hardness: 2.5,
    collision: "solid",
    renderLayer: "solid",
    soundGroup: "wood"
  },
  {
    id: "bed",
    opacity: 15,
    lightEmission: 0,
    hardness: 0.2,
    collision: "solid",
    renderLayer: "solid",
    soundGroup: "wood"
  },
  {
    id: "composter",
    opacity: 15,
    lightEmission: 0,
    hardness: 0.6,
    collision: "solid",
    renderLayer: "solid",
    soundGroup: "wood"
  },
  {
    id: "lectern",
    opacity: 15,
    lightEmission: 0,
    hardness: 2.5,
    collision: "solid",
    renderLayer: "solid",
    soundGroup: "wood"
  },
  {
    id: "stonecutter",
    opacity: 15,
    lightEmission: 0,
    hardness: 3.5,
    collision: "solid",
    renderLayer: "solid",
    soundGroup: "stone"
  },
  {
    id: "farmland",
    opacity: 15,
    lightEmission: 0,
    hardness: 0.6,
    collision: "solid",
    renderLayer: "solid",
    soundGroup: "dirt"
  },
  {
    id: "wheat",
    properties: { age: rangeInclusive(0, 7) },
    defaultProperties: { age: 7 },
    opacity: 0,
    lightEmission: 0,
    hardness: 0.1,
    collision: "none",
    renderLayer: "cutout",
    soundGroup: "grass"
  },
  {
    id: "door",
    properties: {
      facing: ["north", "south", "east", "west"],
      half: ["lower", "upper"],
      open: [false, true]
    },
    defaultProperties: { facing: "north", half: "lower", open: false },
    opacity: 0,
    lightEmission: 0,
    hardness: 3,
    collision: "solid",
    renderLayer: "cutout",
    soundGroup: "wood"
  },
  {
    id: "bell",
    opacity: 0,
    lightEmission: 0,
    hardness: 5,
    collision: "none",
    renderLayer: "cutout",
    soundGroup: "stone"
  }
];

export function createDefaultBlockRegistry(): BlockRegistry {
  return new BlockRegistry(DEFAULT_BLOCK_DEFINITIONS);
}

function validateDefinition(definition: BlockDefinition): void {
  if (!definition.id || definition.id.trim() !== definition.id) {
    throw new Error(`invalid block id: ${definition.id}`);
  }
  if (definition.opacity < 0 || definition.opacity > 15) {
    throw new RangeError(`opacity must be 0..15 for ${definition.id}`);
  }
  if (definition.lightEmission < 0 || definition.lightEmission > 15) {
    throw new RangeError(`lightEmission must be 0..15 for ${definition.id}`);
  }
}

function normalizeProperties(definition: BlockDefinition, properties: BlockProperties): BlockProperties {
  const schema = definition.properties ?? {};
  const normalized: BlockProperties = {};

  for (const key of Object.keys(schema).sort()) {
    const allowedValues = schema[key];
    const value = properties[key] ?? definition.defaultProperties?.[key] ?? allowedValues[0];
    if (!allowedValues.includes(value)) {
      throw new Error(`invalid value for ${definition.id}.${key}: ${String(value)}`);
    }
    normalized[key] = value;
  }

  for (const key of Object.keys(properties)) {
    if (!schema[key]) {
      throw new Error(`unknown property for ${definition.id}: ${key}`);
    }
  }

  return normalized;
}

function enumeratePropertyVariants(schema: BlockPropertySchema): BlockProperties[] {
  const keys = Object.keys(schema).sort();
  if (keys.length === 0) {
    return [{}];
  }

  const variants: BlockProperties[] = [];
  const build = (keyIndex: number, current: BlockProperties) => {
    if (keyIndex === keys.length) {
      variants.push(cloneProperties(current));
      return;
    }

    const key = keys[keyIndex];
    for (const value of schema[key]) {
      current[key] = value;
      build(keyIndex + 1, current);
    }
    delete current[key];
  };

  build(0, {});
  return variants;
}

function rangeInclusive(min: number, max: number): number[] {
  const values = [];
  for (let value = min; value <= max; value += 1) {
    values.push(value);
  }
  return values;
}
