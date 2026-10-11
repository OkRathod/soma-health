"use client";

import { useMemo, useState, useEffect } from "react";
import { Check, Plus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export function TimelineView({ tasks, loading, onTimeSlotClick, onDropTask, draggedTaskId, onEdit }: any) {
  
  // 1. Current time indicator
  function CurrentTimeLine() {
      const [top, setTop] = useState(0);
      
      useEffect(() => {
          const update = () => {
              const now = new Date();
              setTop((now.getHours() * 60) + now.getMinutes());
          };
          update();
          const interval = setInterval(update, 60000);
          return () => clearInterval(interval);
      }, []);

      return (
          <div
              className="pointer-events-none absolute left-[var(--tl-gutter)] right-0 z-40 h-px bg-foreground"
              style={{ top: `${top}px` }}
          >
              <span className="absolute -left-[5px] -top-[4.5px] size-2.5 rounded-full border-2 border-foreground bg-lime" />
          </div>
      );
  }

  // 2. Overlap clustering
  const positionedTasks = useMemo(() => {
    if (loading || !tasks || tasks.length === 0) return [];
    
    // Normalize data: Ensure we have valid start/end times in MS
    const normalized = tasks.filter((t: any) => t.startTime).map((t: any) => {
        const start = new Date(t.startTime).getTime();
        // Support both durationMins and duration properties
        const duration = Number(t.durationMins || t.duration || 60); 
        return {
            ...t,
            start,
            end: start + (duration * 60000),
            duration
        };
    }).sort((a: any, b: any) => a.start - b.start);

    // Group tasks that overlap into clusters
    const clusters: any[][] = [];
    let currentCluster: any[] = [];
    let clusterEnd = 0;

    normalized.forEach((task: any) => {
       if (currentCluster.length > 0 && task.start >= clusterEnd) {
           clusters.push(currentCluster);
           currentCluster = [task];
           clusterEnd = task.end;
       } else {
           currentCluster.push(task);
           if (task.end > clusterEnd) clusterEnd = task.end;
       }
    });
    if (currentCluster.length > 0) clusters.push(currentCluster);

    // Assign safe columns within each cluster
    const finalTasks: any[] = [];
    clusters.forEach(cluster => {
        const columns: number[] = []; 
        cluster.forEach(task => {
            let placed = false;
            for (let i = 0; i < columns.length; i++) {
                if (task.start >= columns[i]) {
                    task.colIndex = i;
                    columns[i] = task.end;
                    placed = true;
                    break;
                }
            }
            if (!placed) {
                task.colIndex = columns.length;
                columns.push(task.end);
            }
        });

        // Apply total columns so CSS knows how thin to make the bars
        const totalCols = columns.length;
        cluster.forEach(task => {
            task.totalCols = totalCols;
            finalTasks.push(task);
        });
    });

    return finalTasks;
  }, [tasks, loading]);

  const hourLabel = (hour: number) =>
    hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`;

  const priorityStyles: Record<string, string> = {
    HIGH: "bg-priority-high-bg border-l-priority-high text-priority-high",
    MEDIUM: "bg-priority-medium-bg border-l-priority-medium text-priority-medium",
    HABIT: "bg-priority-habit-bg border-l-priority-habit text-priority-habit",
    LOW: "bg-priority-low-bg border-l-priority-low text-priority-low",
  };

  return (
    <div className="w-full pb-2 pt-4 [--tl-gutter:3.5rem] sm:[--tl-gutter:4.5rem]">
      {/* One hour is 60px tall, so a minute maps to exactly one pixel. */}
      <div className="relative min-h-[1440px] w-full">
        {/* Hour grid */}
        {Array.from({ length: 24 }).map((_, hour) => (
          <div
            key={hour}
            className="group relative box-border flex h-[60px] cursor-pointer"
            onClick={() => onTimeSlotClick(`${hour.toString().padStart(2, "0")}:00`)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDropTask(e, hour)}
          >
            <div className="relative -top-[7px] w-[var(--tl-gutter)] shrink-0 select-none pr-3 text-right font-mono text-[11px] leading-none text-muted-foreground">
              {hourLabel(hour)}
            </div>
            <div className="relative flex-1 border-t border-border transition-colors group-hover:bg-surface/70">
              <span className="absolute inset-y-0 left-3 hidden items-center gap-1.5 text-xs text-muted-foreground group-hover:flex">
                <Plus className="size-3.5" />
                Add a task at {hourLabel(hour)}
              </span>
            </div>
          </div>
        ))}

        {/* Scheduled tasks, split into columns where they overlap */}
        {positionedTasks.map((task: any) => {
          const dateObj = new Date(task.start);
          const endDateObj = new Date(task.end);

          const topPosition = dateObj.getHours() * 60 + dateObj.getMinutes();
          const height = task.duration;

          // The gutter offset matches the width of the time label column.
          const widthVal = `calc((100% - var(--tl-gutter)) / ${task.totalCols} - 4px)`;
          const leftVal = `calc(var(--tl-gutter) + ((100% - var(--tl-gutter)) / ${task.totalCols} * ${task.colIndex}) + 4px)`;

          return (
            <div
              key={task.id}
              draggable
              onDragStart={(e) => {
                e.stopPropagation();
              }}
              onDragOver={(e) => e.preventDefault()}
              className={cn(
                "absolute flex cursor-pointer flex-col justify-between overflow-hidden rounded-xl border-l-[3px] px-2.5 py-1.5 transition-shadow hover:z-50 hover:shadow-float",
                task.isCompleted
                  ? "border-l-muted-foreground/50 bg-surface text-muted-foreground"
                  : priorityStyles[task.priority] || priorityStyles.LOW,
                draggedTaskId === task.id && "opacity-50"
              )}
              style={{
                top: `${topPosition + 1}px`,
                height: `${Math.max(height - 2, 18)}px`,
                width: widthVal,
                left: leftVal,
                zIndex: 10 + task.colIndex,
              }}
              onClick={(e) => {
                e.stopPropagation();
                onEdit(task);
              }}
            >
              <div className="flex min-w-0 items-start gap-1.5 text-[13px] font-medium leading-tight">
                {task.isCompleted && <Check className="mt-0.5 size-3.5 shrink-0" />}
                <span className={cn(height >= 50 ? "line-clamp-2" : "truncate", task.isCompleted && "line-through")}>
                  {task.title}
                </span>
              </div>

              {height >= 50 && (
                <div className="mt-auto truncate font-mono text-[11px] opacity-80">
                  {format(dateObj, "h:mm a")} - {format(endDateObj, "h:mm a")}
                </div>
              )}
            </div>
          );
        })}
        <CurrentTimeLine />
      </div>
    </div>
  );
}
