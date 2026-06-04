import test from "node:test";
import assert from "node:assert/strict";
import { TickScheduler, TICK_PHASES } from "../core/tick.ts";

test("TickScheduler runs phases in the fixed Java-style hierarchy", () => {
  const scheduler = new TickScheduler<{ events: string[] }>();
  const context = { events: [] };

  for (const phase of TICK_PHASES) {
    scheduler.on(phase, (_context, info) => {
      _context.events.push(`${info.tick}:${info.phase}`);
    });
  }

  scheduler.step(context);
  assert.deepEqual(
    context.events,
    TICK_PHASES.map((phase) => `0:${phase}`)
  );
});

test("TickScheduler runs scheduled work in its target phase", () => {
  const scheduler = new TickScheduler<{ events: string[] }>();
  const context = { events: [] };

  scheduler.on("fluid", (_context) => {
    _context.events.push("fluid-handler");
  });
  scheduler.schedule(1, "fluid", (_context) => {
    _context.events.push("scheduled-fluid");
  });

  scheduler.stepMany(context, 2);
  assert.deepEqual(context.events, ["fluid-handler", "scheduled-fluid", "fluid-handler"]);
});
