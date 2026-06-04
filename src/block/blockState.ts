export type BlockPropertyValue = string | number | boolean;
export type BlockProperties = Record<string, BlockPropertyValue>;
export type StateId = number;

export const AIR_STATE_ID = 0;

export function canonicalPropertyEntries(properties: BlockProperties = {}): [string, BlockPropertyValue][] {
  return Object.keys(properties)
    .sort()
    .map((key) => [key, properties[key]]);
}

export function canonicalStateKey(typeId: string, properties: BlockProperties = {}): string {
  const entries = canonicalPropertyEntries(properties);
  if (entries.length === 0) {
    return typeId;
  }
  const encoded = entries.map(([key, value]) => `${key}=${String(value)}`).join(",");
  return `${typeId}[${encoded}]`;
}

export function cloneProperties(properties: BlockProperties = {}): BlockProperties {
  return Object.fromEntries(canonicalPropertyEntries(properties));
}
