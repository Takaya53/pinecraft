export type OcclusionSample = {
  side1: boolean;
  side2: boolean;
  corner: boolean;
};

export function calculateVertexAo(sample: OcclusionSample): number {
  if (sample.side1 && sample.side2) {
    return 0;
  }
  return 3 - Number(sample.side1) - Number(sample.side2) - Number(sample.corner);
}

export function aoToBrightness(ao: number): number {
  if (!Number.isInteger(ao) || ao < 0 || ao > 3) {
    throw new RangeError(`ao must be 0..3: ${ao}`);
  }
  return (ao + 1) / 4;
}
