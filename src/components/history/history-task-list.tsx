"use client";

import { Check, Clock, ListChecks, Trash2 } from "lucide-react";
import { EmptyState } from "@/components/layout/page";
import { cn } from "@/lib/utils";

const priorityTone: Record<string, string> = {
  HIGH: "bg-priority-high-bg text-priority-high",
  MEDIUM: "bg-priority-medium-bg text-priority-medium",
  LOW: "bg-priority-low-bg text-priority-low",
  HABIT: "bg-priority-habit-bg text-priority-habit",
};

export function HistoryTaskList({ tasks, onToggle, onDelete }: { tasks: any[], onToggle: (id: string, status: boolean) => void, onDelete: (id: string) => void }) {
  if (tasks.length === 0) {
    return (
      <EmptyState
        icon={<ListChecks />}
        title="No tasks found for this day."
        description="Tasks and habits scheduled for the selected date show up here."
      />
    );
  }

  const done = tasks.filter((t) => t.isCompleted).length;

  return (
    <section className="panel overflow-hidden">
      <header className="flex items-center justify-between gap-3 px-4 py-4 md:px-6">
        <p className="label-mono">Tasks</p>
        <p className="text-sm tabular-nums text-muted-foreground">
          {done} of {tasks.length} done
        </p>
      </header>

      <ul className="custom-scrollbar max-h-[600px] divide-y divide-border overflow-y-auto border-t border-border">
        {tasks.map((task) => (
          <li key={task.id} className="group flex items-start gap-3 px-4 py-3 md:px-6">
            <button
              type="button"
              role="checkbox"
              aria-checked={task.isCompleted}
              aria-label={`Mark "${task.title}" ${task.isCompleted ? "not done" : "done"}`}
              onClick={() => onToggle(task.id, task.isCompleted)}
              className="-m-2 grid size-10 shrink-0 place-items-center rounded-full"
            >
              <span
                className={cn(
                  "grid size-6 place-items-center rounded-full border transition-colors",
                  task.isCompleted
                    ? "border-transparent bg-lime text-lime-foreground"
                    : "border-input bg-card group-hover:border-foreground/50"
                )}
              >
                {task.isCompleted && <Check className="size-3.5" strokeWidth={3} />}
              </span>
            </button>

            <div className="min-w-0 flex-1">
              <p
                className={cn(
                  "truncate text-[15px] font-medium leading-snug",
                  task.isCompleted && "text-muted-foreground line-through"
                )}
              >
                {task.title}
              </p>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                {task.startTime && (
                  <span className="inline-flex items-center gap-1 tabular-nums">
                    <Clock className="size-3" />
                    {new Date(task.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    {task.durationMins && <span className="opacity-70">({task.durationMins}m)</span>}
                  </span>
                )}
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em]",
                    priorityTone[task.priority] ?? "bg-surface text-muted-foreground"
                  )}
                >
                  {task.priority}
                </span>
              </div>
            </div>

            <button
              type="button"
              aria-label="Delete task"
              className="-mr-1.5 grid size-10 shrink-0 place-items-center rounded-full text-muted-foreground transition-[opacity,color,background-color] hover:bg-priority-high-bg hover:text-destructive focus-visible:opacity-100 md:opacity-0 md:group-hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(task.id);
              }}
            >
              <Trash2 className="size-4" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
