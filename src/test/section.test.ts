import test from "node:test";
import assert from "node:assert/strict";
import { createDefaultBlockRegistry } from "../block/blockRegistry.ts";
import { AIR_STATE_ID } from "../block/blockState.ts";
import { Section } from "../world/Section.ts";
import { PackedArray, wordCountFor } from "../world/packedArray.ts";

test("Section defaults to air and stores palette-backed states", () => {
  const registry = createDefaultBlockRegistry();
  const stone = registry.resolveState("stone");
  const section = new Section({ sectionY: 0 });

  assert.equal(section.getStateId(0, 0, 0), AIR_STATE_ID);
  section.setStateId(1, 2, 3, stone);
  assert.equal(section.getStateId(1, 2, 3), stone);
  assert.equal(section.palette.length, 2);
});

test("Section grows packed bits when palette exceeds 16 states", () => {
  const registry = createDefaultBlockRegistry();
  const section = new Section({ sectionY: 0 });

  for (let stateId = 0; stateId < 17; stateId += 1) {
    section.setStateIdByIndex(stateId, registry.getState(stateId).id);
  }

  assert.equal(section.blocks.bitsPerEntry, 5);
  for (let stateId = 0; stateId < 17; stateId += 1) {
    assert.equal(section.getStateIdByIndex(stateId), stateId);
  }
});

test("PackedArray uses Java 1.16+ style non-crossing word boundaries", () => {
  const packed = new PackedArray(24, 5);
  assert.equal(wordCountFor(24, 5), 2);

  packed.set(11, 17);
  packed.set(12, 23);

  assert.equal(packed.get(11), 17);
  assert.equal(packed.get(12), 23);
});

test("Section stores sky and block light as separate nibble arrays", () => {
  const section = new Section({ sectionY: 0 });
  section.setSkyLight(0, 1, 2, 15);
  section.setBlockLight(0, 1, 2, 7);

  assert.equal(section.getSkyLight(0, 1, 2), 15);
  assert.equal(section.getBlockLight(0, 1, 2), 7);
});
