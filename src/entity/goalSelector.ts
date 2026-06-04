export type AiGoal<TContext, TResult> = {
  id: string;
  priority: number;
  canRun: (context: TContext) => boolean;
  run: (context: TContext) => TResult;
};

export function selectGoal<TContext, TResult>(
  goals: readonly AiGoal<TContext, TResult>[],
  context: TContext,
  fallback: TResult
): TResult {
  let selected: AiGoal<TContext, TResult> | null = null;
  for (const goal of goals) {
    if (!goal.canRun(context)) {
      continue;
    }
    if (!selected || goal.priority < selected.priority) {
      selected = goal;
    }
  }
  return selected ? selected.run(context) : fallback;
}
