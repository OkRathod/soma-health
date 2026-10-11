"use client";

import { useState } from "react";
import { ChevronDown, Clock, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CheckDot, priorityTone } from "@/components/tasks/check-dot";

const iconButton =
  "grid size-9 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground";

/** One task as a list row: check, title, meta, row actions and expandable details. */
export function TaskCard({ task, onToggle, onSubToggle, onSubProgress, onDelete, onEdit }: any) {
    const [expanded, setExpanded] = useState(false);

    const subtasks: any[] = task.subtasks ?? [];
    const hasMore = Boolean(task.description) || subtasks.length > 0;

    return (
        <div className="group py-2.5 pl-2.5 pr-3 md:pl-3.5 md:pr-4">
            <div className="flex items-start gap-1">
                <CheckDot
                    checked={task.isCompleted}
                    onChange={() => onToggle(task.id, task.isCompleted)}
                    label={`Mark "${task.title}" ${task.isCompleted ? "not done" : "done"}`}
                />

                <div className="min-w-0 flex-1 py-2">
                    <h3
                        className={cn(
                            "line-clamp-2 text-wrap break-words text-[15px] font-medium leading-snug",
                            task.isCompleted && "text-muted-foreground line-through"
                        )}
                    >
                        {task.title}
                    </h3>

                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                        {task.startTime && (
                            <span className="inline-flex items-center gap-1 tabular-nums">
                                <Clock className="size-3" />
                                {format(new Date(task.startTime), "h:mm a")}
                            </span>
                        )}
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

                <div className="flex shrink-0 items-center pt-0.5">
                    <div
                        className={cn(
                            "flex items-center transition-opacity duration-200",
                            !expanded && "md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100"
                        )}
                    >
                        <button type="button" aria-label="Edit task" className={iconButton} onClick={() => onEdit(task)}>
                            <Pencil className="size-4" />
                        </button>
                        <button
                            type="button"
                            aria-label="Delete task"
                            className={cn(iconButton, "hover:bg-priority-high-bg hover:text-destructive")}
                            onClick={() => onDelete(task.id)}
                        >
                            <Trash2 className="size-4" />
                        </button>
                    </div>
                    {hasMore && (
                        <button
                            type="button"
                            aria-expanded={expanded}
                            aria-label={expanded ? "Hide details" : "Show details"}
                            className={iconButton}
                            onClick={() => setExpanded(!expanded)}
                        >
                            <ChevronDown className={cn("size-4 transition-transform duration-200", expanded && "rotate-180")} />
                        </button>
                    )}
                </div>
            </div>

            {expanded && (
                <div className="animate-fade-in mb-1.5 ml-11 mt-1 space-y-2">
                    {task.description && (
                        <p className="rounded-2xl bg-surface px-3.5 py-2.5 text-sm leading-relaxed text-muted-foreground">
                            {task.description}
                        </p>
                    )}

                    {subtasks.length > 0 && (
                        <div className="-ml-1.5 space-y-0.5">
                            {subtasks.map((st: any) => (
                                <div key={st.id} className="flex items-center gap-1.5">
                                    <CheckDot
                                        small
                                        checked={st.isCompleted}
                                        onChange={() => onSubToggle(task.id, st.id, st.isCompleted)}
                                        label={`Mark "${st.title}" ${st.isCompleted ? "not done" : "done"}`}
                                    />
                                    <span
                                        className={cn(
                                            "min-w-0 flex-1 truncate text-sm",
                                            st.isCompleted && "text-muted-foreground line-through"
                                        )}
                                    >
                                        {st.title}
                                    </span>

                                    {st.targetValue ? (
                                        <div
                                            className="flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-card py-0.5 pl-1 pr-3"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <input
                                                type="number"
                                                aria-label={`Progress for ${st.title}`}
                                                className="h-7 w-12 rounded-full bg-surface text-center font-mono text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                                value={st.currentValue || 0}
                                                onChange={(e) => {
                                                    const val = parseInt(e.target.value);
                                                    if (!isNaN(val)) onSubProgress(task.id, st.id, val);
                                                }}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                            <span className="text-xs tabular-nums text-muted-foreground">
                                                / {st.targetValue} {st.unit}
                                            </span>
                                        </div>
                                    ) : null}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
