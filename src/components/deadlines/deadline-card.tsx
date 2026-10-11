"use client";

import { useState } from "react";
import { format, formatDistanceToNowStrict } from "date-fns";
import { AlertTriangle, Check, ChevronDown, MoreVertical, Pencil, Timer, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useCountdown } from "@/hooks/use-countdown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toggleDeadline, deleteDeadline, toggleSubtask } from "@/app/actions/deadlines";
import { EditDeadlineDialog } from "@/components/deadlines/edit-deadline-dialog";
import { cn } from "@/lib/utils";

/**
 * Splits the countdown string ("3d 14h 22m 10s") into number/unit pairs so the
 * figures can be set large and the units small.
 */
function parseCountdown(value: string) {
  return value
    .split(" ")
    .map((token) => /^(\d+)([a-z]+)$/.exec(token))
    .filter((m): m is RegExpExecArray => Boolean(m))
    .map((m) => ({ n: m[1], unit: m[2] }));
}

/**
 * One deadline: title, live countdown, time-elapsed bar and subtask checklist.
 * The card lays itself out from its own width (container query), so the same
 * component serves the two-column grid and the full-width list.
 *
 * `featured` marks the single most urgent active deadline (lime panel).
 */
export function DeadlineCard({ data, onUpdate, isHistory, featured }: any) {
  const { timeLeft, isExpired } = useCountdown(data.targetDate);
  const [expanded, setExpanded] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Progress = share of the start → due window that has elapsed
  const start = new Date(data.startDate).getTime();
  const end = data.targetDate ? new Date(data.targetDate).getTime() : null;
  const now = new Date().getTime();

  let progress = 0;
  if (end) {
    const totalDuration = end - start;
    const elapsed = now - start;
    progress = Math.max(0, Math.min((elapsed / totalDuration) * 100, 100)); // Clamp between 0-100
  }

  const isDone = Boolean(data.isCompleted);
  const isOverdue = !isDone && Boolean(data.targetDate) && (isExpired || (end !== null && end <= now));
  const hoursLeft = end ? (end - now) / 36e5 : null;
  const isSoon = !isDone && !isOverdue && end !== null && (progress > 75 || (hoursLeft !== null && hoursLeft < 48));
  const isLime = Boolean(featured) && !isDone && !isOverdue;

  const hasCountdown = Boolean(data.targetDate) && !isDone;

  const subtasks: any[] = data.subtasks ?? [];
  const subDone = subtasks.filter((t) => t.isCompleted).length;

  const sub = isLime ? "text-lime-foreground/70" : "text-muted-foreground";
  const track = isLime ? "bg-lime-foreground/15" : "bg-surface";
  const fill = isLime ? "bg-lime-foreground" : isSoon ? "bg-energy" : "bg-foreground";
  const hairline = isLime ? "border-lime-foreground/15" : "border-border";
  const ghostHover = isLime ? "hover:bg-lime-foreground/10" : "hover:bg-accent";

  const parts = parseCountdown(timeLeft);
  const bigParts = parts.slice(0, 2);
  const restParts = parts.slice(2);

  // Actions
  const handleMainToggle = async () => {
    try {
        await toggleDeadline(data.id, !data.isCompleted);
        toast.success(data.isCompleted ? "Marked as active" : "Deadline completed");
        onUpdate();
    } catch (e) { toast.error("Failed to update status"); }
  };

  const handleSubtaskToggle = async (subId: string, currentStatus: boolean) => {
    try {
        await toggleSubtask(subId, !currentStatus);
        onUpdate();
    } catch (e) { toast.error("Failed to update subtask"); }
  };

  const handleDelete = async () => {
     try {
         await deleteDeadline(data.id);
         toast.success("Deadline deleted");
         onUpdate();
     } catch (e) { toast.error("Failed to delete"); }
  };

  const chip = "inline-flex h-6 items-center gap-1 rounded-full px-2.5 font-mono text-[10px] uppercase tracking-[0.08em]";

  return (
    <article
      data-history={isHistory ? "" : undefined}
      className={cn(
        "@container h-full p-5 md:p-6",
        isLime && "panel-lime border border-transparent",
        isDone && "rounded-[calc(var(--radius)+6px)] border border-border bg-transparent",
        !isLime && !isDone && "panel",
        isOverdue && "border-destructive/40"
      )}
    >
      <div className={cn("grid gap-5", hasCountdown && "@2xl:grid-cols-[minmax(0,1fr)_minmax(0,19rem)] @2xl:gap-x-8")}>
        {/* Title row */}
        <header className="flex items-start gap-3">
          <button
            type="button"
            role="checkbox"
            aria-checked={isDone}
            aria-label={`Mark "${data.title}" ${isDone ? "active" : "complete"}`}
            onClick={handleMainToggle}
            className="-m-2 grid size-10 shrink-0 place-items-center rounded-full"
          >
            <span
              className={cn(
                "grid size-6 place-items-center rounded-full border transition-colors",
                isDone
                  ? "border-transparent bg-lime text-lime-foreground"
                  : isLime
                    ? "border-lime-foreground/45 hover:border-lime-foreground"
                    : "border-input bg-card hover:border-foreground/50"
              )}
            >
              {isDone && <Check className="size-3.5" strokeWidth={3} />}
            </span>
          </button>

          <div className="min-w-0 flex-1">
            <h3
              className={cn(
                "text-lg font-medium leading-snug tracking-[-0.02em] [overflow-wrap:anywhere]",
                isDone && "text-muted-foreground line-through"
              )}
            >
              {data.title}
            </h3>
            {(isOverdue || isSoon || isDone || !data.targetDate) && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {isOverdue && (
                  <span className={cn(chip, "bg-priority-high-bg text-priority-high")}>
                    <AlertTriangle className="size-3" /> Overdue
                  </span>
                )}
                {isSoon && (
                  <span
                    className={cn(
                      chip,
                      isLime ? "bg-lime-foreground text-lime" : "bg-priority-medium-bg text-priority-medium"
                    )}
                  >
                    Due soon
                  </span>
                )}
                {!data.targetDate && !isDone && <span className={cn(chip, "bg-surface text-muted-foreground")}>Open-ended</span>}
                {isDone && <span className={cn(chip, "bg-surface text-muted-foreground")}>Completed</span>}
              </div>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label="Deadline options"
                className={cn(
                  "-mr-2 -mt-2 grid size-10 shrink-0 place-items-center rounded-full transition-colors",
                  sub,
                  ghostHover
                )}
              >
                <MoreVertical className="size-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44 rounded-2xl p-1.5 shadow-float">
              <DropdownMenuItem onClick={() => setIsEditOpen(true)} className="cursor-pointer rounded-xl px-3 py-2.5">
                <Pencil /> Edit deadline
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDelete}
                variant="destructive"
                className="cursor-pointer rounded-xl px-3 py-2.5"
              >
                <Trash2 /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Countdown */}
        {hasCountdown && (
          <div className="@2xl:col-start-2 @2xl:row-span-2 @2xl:row-start-1">
            <div className={cn("@2xl:h-full @2xl:border-l @2xl:pl-8", hairline)}>
              <p className={cn("flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em]", isOverdue ? "text-destructive" : sub)}>
                {isOverdue ? <AlertTriangle className="size-3.5" /> : <Timer className="size-3.5" />}
                {isOverdue ? "Overdue by" : "Time left"}
              </p>

              {isOverdue ? (
                <p className="numeral mt-3 text-[2.75rem] text-destructive">
                  {(() => {
                    const [n, ...unit] = formatDistanceToNowStrict(new Date(data.targetDate)).split(" ");
                    return (
                      <>
                        {n}
                        <span className="ml-1.5 text-lg font-normal tracking-normal">{unit.join(" ")}</span>
                      </>
                    );
                  })()}
                </p>
              ) : (
                <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1" aria-live="off">
                  <p className="numeral text-[2.75rem] @sm:text-[3.25rem]">
                    {bigParts.length === 0
                      ? "--"
                      : bigParts.map((p, i) => (
                          <span key={p.unit} className={i > 0 ? "ml-2.5" : undefined}>
                            {p.n.padStart(2, "0")}
                            <span className="ml-0.5 text-lg font-normal tracking-normal">{p.unit}</span>
                          </span>
                        ))}
                  </p>
                  {restParts.length > 0 && (
                    <p className={cn("font-mono text-[13px] tabular-nums", sub)}>
                      {restParts.map((p) => `${p.n.padStart(2, "0")}${p.unit}`).join(" ")}
                    </p>
                  )}
                </div>
              )}

              <div
                className={cn("mt-4 h-1.5 overflow-hidden rounded-full", track)}
                role="progressbar"
                aria-label="Time elapsed"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress)}
              >
                <div
                  className={cn("h-full rounded-full transition-[width] duration-1000 ease-out", isOverdue ? "bg-destructive" : fill)}
                  style={{ width: `${isOverdue ? 100 : progress}%` }}
                />
              </div>
              <div className={cn("mt-2 flex justify-between gap-3 text-xs tabular-nums", sub)}>
                <span>{isOverdue ? "Time is up" : `${progress.toFixed(1)}% elapsed`}</span>
                <span>{isOverdue ? format(new Date(data.targetDate), "MMM d, h:mm a") : `${100 - Math.round(progress)}% left`}</span>
              </div>
            </div>
          </div>
        )}

        {/* Subtasks + dates */}
        <div className="flex flex-col gap-4 @2xl:col-start-1">
          {subtasks.length > 0 && (
            <div className={cn("overflow-hidden rounded-2xl border", hairline)}>
              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded}
                className={cn("flex min-h-12 w-full items-center gap-3 px-3.5 py-2.5 text-left transition-colors", ghostHover)}
              >
                <span className="text-sm font-medium">
                  {subDone === subtasks.length ? "All steps done" : "Steps"}
                </span>
                <span className="flex min-w-0 flex-1 items-center gap-1" aria-hidden="true">
                  {subtasks.slice(0, 16).map((t) => (
                    <span
                      key={t.id}
                      className={cn(
                        "h-1.5 max-w-6 flex-1 rounded-full",
                        t.isCompleted ? (isLime ? "bg-lime-foreground" : isDone ? "bg-muted-foreground/50" : "bg-foreground") : track
                      )}
                    />
                  ))}
                </span>
                <span className={cn("shrink-0 font-mono text-xs tabular-nums", sub)}>
                  {subDone}/{subtasks.length}
                </span>
                <ChevronDown className={cn("size-4 shrink-0 transition-transform duration-200", sub, expanded && "rotate-180")} />
              </button>

              {expanded && (
                <ul className={cn("border-t py-1", hairline)}>
                  {subtasks.map((task: any) => (
                    <li key={task.id}>
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={task.isCompleted}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSubtaskToggle(task.id, task.isCompleted);
                        }}
                        className={cn("flex min-h-10 w-full items-center gap-3 px-3.5 py-2 text-left text-sm transition-colors", ghostHover)}
                      >
                        <span
                          className={cn(
                            "grid size-5 shrink-0 place-items-center rounded-full border transition-colors",
                            task.isCompleted
                              ? isLime
                                ? "border-transparent bg-lime-foreground text-lime"
                                : isDone
                                  ? "border-transparent bg-surface text-muted-foreground"
                                  : "border-transparent bg-lime text-lime-foreground"
                              : isLime
                                ? "border-lime-foreground/45"
                                : "border-input bg-card"
                          )}
                        >
                          {task.isCompleted && <Check className="size-3" strokeWidth={3} />}
                        </span>
                        <span className={cn("min-w-0 flex-1 leading-snug [overflow-wrap:anywhere]", task.isCompleted && cn("line-through", sub))}>
                          {task.title}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <dl className={cn("mt-auto flex flex-wrap gap-x-6 gap-y-2 text-[13px]", sub)}>
            <div className="flex items-baseline gap-2">
              <dt className={cn("font-mono text-[11px] uppercase tracking-[0.1em]", sub)}>Started</dt>
              <dd className={cn("tabular-nums", !isDone && (isLime ? "text-lime-foreground" : "text-foreground"))}>
                {format(new Date(data.startDate), "MMM d, yyyy")}
              </dd>
            </div>
            {data.targetDate && (
              <div className="flex items-baseline gap-2">
                <dt className={cn("font-mono text-[11px] uppercase tracking-[0.1em]", sub)}>Due</dt>
                <dd className={cn("tabular-nums", !isDone && (isLime ? "text-lime-foreground" : "text-foreground"))}>
                  {format(new Date(data.targetDate), "MMM d, h:mm a")}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      <EditDeadlineDialog
         open={isEditOpen}
         onOpenChange={setIsEditOpen}
         data={data}
         onSave={onUpdate}
      />
    </article>
  );
}
