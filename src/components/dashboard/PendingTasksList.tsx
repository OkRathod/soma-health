"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, ChevronDown, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const priorityTone: Record<string, string> = {
  HIGH: "bg-priority-high-bg text-priority-high",
  MEDIUM: "bg-priority-medium-bg text-priority-medium",
  LOW: "bg-priority-low-bg text-priority-low",
  HABIT: "bg-priority-habit-bg text-priority-habit",
};

/** Round check control shared by tasks and subtasks. */
function CheckDot({
  checked,
  onChange,
  label,
  small,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  small?: boolean;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={cn(
        "grid shrink-0 place-items-center rounded-full border transition-colors",
        small ? "size-5" : "size-6",
        checked
          ? "border-transparent bg-lime text-lime-foreground"
          : "border-input bg-card hover:border-foreground/50"
      )}
    >
      {checked && <Check className={small ? "size-3" : "size-3.5"} strokeWidth={3} />}
    </button>
  );
}

/**
 * "Today" list on the dashboard: today's tasks and habit instances with
 * inline completion. Tabs split one-off tasks from recurring habits.
 */
export function PendingTasksList({
  tasks,
  onToggle,
  onSubToggle,
}: {
  tasks: any[];
  onToggle: any;
  onSubToggle: any;
}) {
  const [activeTab, setActiveTab] = useState<"tasks" | "habits">("tasks");

  const habits = tasks.filter((t) => t.priority === "HABIT");
  const regularTasks = tasks.filter((t) => t.priority !== "HABIT");
  const displayed = activeTab === "habits" ? habits : regularTasks;

  const done = tasks.filter((t) => t.isCompleted).length;
  const pct = tasks.length ? Math.round((done / tasks.length) * 100) : 0;

  return (
    <section className="panel flex h-full flex-col overflow-hidden">
      <header className="p-5 pb-4 md:p-6 md:pb-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="label-mono">Today&apos;s plan</p>
            <p className="mt-2 text-lg font-medium tracking-[-0.02em]">
              {tasks.length === 0 ? "Nothing scheduled" : `${done} of ${tasks.length} done`}
            </p>
          </div>
          <Link
            href="/tasks"
            aria-label="Open tasks"
            className="grid size-9 place-items-center rounded-full bg-surface text-foreground transition-transform duration-300 hover:rotate-45"
          >
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-surface" aria-hidden="true">
          <div
            className="h-full rounded-full bg-foreground transition-[width] duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className="mt-4 flex rounded-full bg-surface p-1" role="tablist">
          {(
            [
              ["tasks", `Tasks · ${regularTasks.length}`],
              ["habits", `Habits · ${habits.length}`],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={activeTab === key}
              onClick={() => setActiveTab(key)}
              className={cn(
                "h-9 flex-1 rounded-full text-[13px] font-medium transition-colors",
                activeTab === key
                  ? "bg-ink text-ink-foreground dark:bg-lime dark:text-lime-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <div className="custom-scrollbar min-h-[220px] flex-1 overflow-y-auto border-t border-border">
        {displayed.length === 0 ? (
          <div className="flex h-full min-h-[220px] flex-col items-center justify-center px-8 text-center">
            <p className="font-display text-2xl">
              {tasks.length === 0 ? "A clear day." : `No ${activeTab} today.`}
            </p>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {activeTab === "habits" ? "Create a habit and it will show up here every day." : "Add a task to give the day some shape."}
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {displayed.map((task) => (
              <DashboardTaskItem key={task.id} task={task} onToggle={onToggle} onSubToggle={onSubToggle} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function DashboardTaskItem({ task, onToggle, onSubToggle }: any) {
  const [expanded, setExpanded] = useState(false);
  const subtasks: any[] = task.subtasks ?? [];
  const hasMore = Boolean(task.description) || subtasks.length > 0;

  return (
    <li className="px-5 py-3.5 md:px-6">
      <div className="flex items-start gap-3">
        <span className="pt-0.5">
          <CheckDot
            checked={task.isCompleted}
            onChange={() => onToggle(task.id, task.isCompleted)}
            label={`Mark "${task.title}" ${task.isCompleted ? "not done" : "done"}`}
          />
        </span>

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
                {format(new Date(task.startTime), "h:mm a")}
              </span>
            )}
            <span>{format(new Date(task.date), "MMM d")}</span>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em]",
                priorityTone[task.priority] ?? priorityTone.LOW
              )}
            >
              {task.priority}
            </span>
            {subtasks.length > 0 && (
              <span className="tabular-nums">
                {subtasks.filter((s) => s.isCompleted).length}/{subtasks.length}
              </span>
            )}
          </div>
        </div>

        {hasMore && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-label={expanded ? "Hide details" : "Show details"}
            className="-mr-1.5 grid size-9 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <ChevronDown className={cn("size-4 transition-transform duration-200", expanded && "rotate-180")} />
          </button>
        )}
      </div>

      {expanded && (
        <div className="ml-9 mt-3 space-y-2.5">
          {task.description && (
            <p className="rounded-2xl bg-surface px-3.5 py-2.5 text-sm leading-relaxed text-muted-foreground">
              {task.description}
            </p>
          )}
          {subtasks.map((st: any) => (
            <div key={st.id} className="flex items-center gap-2.5">
              <CheckDot
                small
                checked={st.isCompleted}
                onChange={() => onSubToggle(task.id, st.id, st.isCompleted)}
                label={`Mark "${st.title}" ${st.isCompleted ? "not done" : "done"}`}
              />
              <span className={cn("text-sm", st.isCompleted && "text-muted-foreground line-through")}>{st.title}</span>
            </div>
          ))}
        </div>
      )}
    </li>
  );
}
