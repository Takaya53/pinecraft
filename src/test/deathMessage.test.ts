import test from "node:test";
import assert from "node:assert/strict";
import { deathMessage } from "../player/deathMessage.ts";

test("death messages describe the actual damage source", () => {
  assert.equal(deathMessage("fall"), "高所からの落下で力尽きました");
  assert.equal(deathMessage("zombie"), "ゾンビに倒されました");
  assert.equal(deathMessage("skeleton"), "スケルトンの矢に射抜かれました");
  assert.equal(deathMessage("drowning"), "溺れて力尽きました");
  assert.equal(deathMessage("guard"), "村の守護者に倒されました");
  assert.equal(deathMessage("generic"), "力尽きました");
});
