import { isWorldSaveV0, type WorldSaveV0 } from "./saveFormat.ts";

export type StorageKey = {
  worldId: string;
};

export interface StorageAdapter {
  loadWorld(key: StorageKey): Promise<WorldSaveV0 | null>;
  saveWorld(key: StorageKey, save: WorldSaveV0): Promise<void>;
  deleteWorld(key: StorageKey): Promise<void>;
}

export class MemoryStorageAdapter implements StorageAdapter {
  saves: Map<string, WorldSaveV0>;

  constructor() {
    this.saves = new Map();
  }

  async loadWorld(key: StorageKey): Promise<WorldSaveV0 | null> {
    return cloneSave(this.saves.get(storageKeyToString(key)) ?? null);
  }

  async saveWorld(key: StorageKey, save: WorldSaveV0): Promise<void> {
    this.saves.set(storageKeyToString(key), cloneSave(save));
  }

  async deleteWorld(key: StorageKey): Promise<void> {
    this.saves.delete(storageKeyToString(key));
  }
}

export class LocalStorageAdapter implements StorageAdapter {
  prefix: string;
  storage: Pick<Storage, "getItem" | "setItem" | "removeItem">;

  constructor(options: { prefix?: string; storage?: Pick<Storage, "getItem" | "setItem" | "removeItem"> } = {}) {
    this.prefix = options.prefix ?? "voxel-survival";
    this.storage = options.storage ?? window.localStorage;
  }

  async loadWorld(key: StorageKey): Promise<WorldSaveV0 | null> {
    const raw = this.storage.getItem(this.storageKey(key));
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as unknown;
    if (!isWorldSaveV0(parsed)) {
      throw new Error("unsupported or malformed world save");
    }
    return cloneSave(parsed);
  }

  async saveWorld(key: StorageKey, save: WorldSaveV0): Promise<void> {
    this.storage.setItem(this.storageKey(key), JSON.stringify(save));
  }

  async deleteWorld(key: StorageKey): Promise<void> {
    this.storage.removeItem(this.storageKey(key));
  }

  private storageKey(key: StorageKey): string {
    return `${this.prefix}:${storageKeyToString(key)}`;
  }
}

export function storageKeyToString(key: StorageKey): string {
  return key.worldId;
}

function cloneSave<T extends WorldSaveV0 | null>(save: T): T {
  if (save === null) {
    return null as T;
  }
  return structuredClone(save) as T;
}
