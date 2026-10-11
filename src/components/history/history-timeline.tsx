"use client";

import { useMemo } from "react";

export function HistoryTimeline({ tasks }: { tasks: any[] }) {
  // Layout engine for the timeline (same as the Tasks page)
  const positionedTasks = useMemo(() => {
    if (tasks.length === 0) return [];

    // 1. Sort by Start Time
    const validTasks = tasks
      .filter(t => t.startTime)
      .map(t => ({
        ...t,
        start: new Date(t.startTime).getTime(),
        end: new Date(t.startTime).getTime() + (t.durationMins || 60) * 60000,
        duration: t.durationMins || 60
      }))
      .sort((a, b) => a.start - b.start);

    // 2. Assign Columns (Greedy Packing)
    const columns: number[] = [];
    const withColIndex = validTasks.map(task => {
      let colIndex = -1;
      for (let i = 0; i < columns.length; i++) {
        if (task.start >= columns[i]) {
          colIndex = i;
          columns[i] = task.end;
          break;
        }
      }
      if (colIndex === -1) {
        colIndex = columns.length;
        columns.push(task.end);
      }
      return { ...task, colIndex };
    });

    // 3. Group into Clusters & Calculate Widths
    const finalTasks: any[] = [];
    let currentCluster: any[] = [];
    let clusterEnd = 0;

    withColIndex.forEach((task) => {
       if (currentCluster.length > 0 && task.start >= clusterEnd) {
           const maxCol = Math.max(...currentCluster.map(t => t.colIndex));
           currentCluster.forEach(t => finalTasks.push({ ...t, totalCols: maxCol + 1 }));
           currentCluster = [task];
           clusterEnd = task.end;
       } else {
           currentCluster.push(task);
           if (task.end > clusterEnd) clusterEnd = task.end;
       }
    });

    if (currentCluster.length > 0) {
        const maxCol = Math.max(...currentCluster.map(t => t.colIndex));
        currentCluster.forEach(t => finalTasks.push({ ...t, totalCols: maxCol + 1 }));
    }

    return finalTasks;
  }, [tasks]);

  return (
    <div className="panel relative h-[1440px] overflow-hidden">
      {/* 24 hour grid */}
      {Array.from({ length: 24 }).map((_, i) => (
        <div
          key={i}
          className={`absolute left-0 h-[60px] w-full ${i === 0 ? "" : "border-t border-border"}`}
          style={{ top: `${i * 60}px` }}
        >
          <span className="label-mono block pl-3 pt-1.5 text-[10px]">
            {i === 0 ? "12 AM" : i < 12 ? `${i} AM` : i === 12 ? "12 PM" : `${i - 12} PM`}
          </span>
        </div>
      ))}

      {/* Task blocks */}
      {positionedTasks.map((task: any) => {
        const d = new Date(task.startTime);
        const topPos = d.getHours() * 60 + d.getMinutes();
        const height = task.duration;
        const widthVal = `calc((100% - 5rem) / ${task.totalCols})`;
        const leftVal = `calc(4rem + ((100% - 5rem) / ${task.totalCols} * ${task.colIndex}))`;
        const styleVariant =
          task.priority === "HIGH"
            ? "border-l-priority-high bg-priority-high-bg"
            : task.priority === "MEDIUM"
              ? "border-l-priority-medium bg-priority-medium-bg"
              : task.priority === "HABIT"
                ? "border-l-priority-habit bg-priority-habit-bg"
                : "border-l-priority-low bg-priority-low-bg";

        return (
          <div
            key={task.id}
            className={`absolute cursor-pointer overflow-hidden rounded-lg border-l-[3px] px-3 py-1.5 text-[13px] ring-1 ring-card transition-opacity hover:z-20 hover:opacity-100 ${styleVariant} ${task.isCompleted ? "opacity-55" : "opacity-95"}`}
            style={{
              top: `${topPos}px`,
              height: `${Math.max(30, height)}px`,
              width: widthVal,
              left: leftVal,
              zIndex: 10 + task.colIndex,
            }}
          >
            <div className="flex h-full flex-col justify-between">
              <span className={`truncate font-medium leading-tight ${task.isCompleted ? "line-through" : ""}`}>
                {task.title}
              </span>

              {/* Time, only when the block is tall enough */}
              {height > 40 && (
                <span className="font-mono text-[11px] text-muted-foreground">
                  {d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
