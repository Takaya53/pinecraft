import { TICKS_PER_SECOND, assertInteger } from "./constants.ts";

export const TICK_PHASES = [
  "entity",
  "scheduledBlock",
  "randomBlock",
  "fluid",
  "chunk",
  "spawning"
] as const;

export type TickPhase = (typeof TICK_PHASES)[number];

export type TickInfo = {
  tick: number;
  phase: TickPhase;
  ticksPerSecond: number;
  randomTickSpeed: number;
};

export type TickHandler<TContext> = (context: TContext, info: TickInfo) => void;

type ScheduledTask<TContext> = {
  phase: TickPhase;
  handler: TickHandler<TContext>;
};

export class TickScheduler<TContext = unknown> {
  currentTick: number;
  randomTickSpeed: number;
  phaseHandlers: Map<TickPhase, Set<TickHandler<TContext>>>;
  scheduledTasks: Map<number, ScheduledTask<TContext>[]>;

  constructor(options: { randomTickSpeed?: number } = {}) {
    this.currentTick = 0;
    this.randomTickSpeed = options.randomTickSpeed ?? 3;
    this.phaseHandlers = new Map();
    this.scheduledTasks = new Map();

    for (const phase of TICK_PHASES) {
      this.phaseHandlers.set(phase, new Set());
    }
  }

  on(phase: TickPhase, handler: TickHandler<TContext>): () => void {
    const handlers = this.phaseHandlers.get(phase);
    if (!handlers) {
      throw new Error(`unknown tick phase: ${phase}`);
    }
    handlers.add(handler);
    return () => {
      handlers.delete(handler);
    };
  }

  schedule(delayTicks: number, phase: TickPhase, handler: TickHandler<TContext>): void {
    assertInteger("delayTicks", delayTicks);
    if (delayTicks < 0) {
      throw new RangeError(`delayTicks must be >= 0: ${delayTicks}`);
    }
    if (!this.phaseHandlers.has(phase)) {
      throw new Error(`unknown tick phase: ${phase}`);
    }

    const targetTick = this.currentTick + delayTicks;
    const tasks = this.scheduledTasks.get(targetTick) ?? [];
    tasks.push({ phase, handler });
    this.scheduledTasks.set(targetTick, tasks);
  }

  step(context: TContext): void {
    const tick = this.currentTick;
    const dueTasks = this.scheduledTasks.get(tick) ?? [];
    this.scheduledTasks.delete(tick);

    for (const phase of TICK_PHASES) {
      const info = {
        tick,
        phase,
        ticksPerSecond: TICKS_PER_SECOND,
        randomTickSpeed: this.randomTickSpeed
      };

      for (const task of dueTasks) {
        if (task.phase === phase) {
          task.handler(context, info);
        }
      }

      for (const handler of this.phaseHandlers.get(phase) ?? []) {
        handler(context, info);
      }
    }

    this.currentTick += 1;
  }

  stepMany(context: TContext, count: number): void {
    assertInteger("count", count);
    if (count < 0) {
      throw new RangeError(`count must be >= 0: ${count}`);
    }
    for (let index = 0; index < count; index += 1) {
      this.step(context);
    }
  }
}
