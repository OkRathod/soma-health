"use client";

import { useMemo, useState, useEffect } from "react";
import { Check } from "lucide-react";
import { format } from "date-fns";

export function TimelineView({ tasks, loading, onTimeSlotClick, onDropTask, draggedTaskId, onEdit }: any) {
  
  // 1. Current Time Line Indicator (Internal Component)
function CurrentTimeLine() {
    const [top, setTop] = useState(0);
    
    useEffect(() => {
        const update = () => {
            const now = new Date();
            // Calculate current minute of the day (e.g. 14:30 = 14*60 + 30 = 870px)
            setTop((now.getHours() * 60) + now.getMinutes());
        };
        update();
        // Update every minute
        const interval = setInterval(update, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute left-0 right-0 border-t-2 border-red-500 z-40 pointer-events-none flex items-center" style={{ top: `${top}px` }}>
            <div className="absolute -left-1 w-2 h-2 bg-red-500 rounded-full" />
        </div>
    );
}


  // 2. Layout Logic (Same as before)
  const positionedTasks = useMemo(() => {
    if (loading || tasks.length === 0) return [];
    
    const validTasks = tasks
      .filter((t: any) => t.startTime)
      .map((t: any) => ({
        ...t,
        start: new Date(t.startTime).getTime(),
        end: new Date(t.startTime).getTime() + (t.durationMins || 60) * 60000,
        duration: t.durationMins || 60
      }))
      .sort((a: any, b: any) => a.start - b.start);

    const columns: number[] = [];
    const withColIndex = validTasks.map((task: any) => {
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

    const finalTasks: any[] = [];
    let currentCluster: any[] = [];
    let clusterEnd = 0;

    withColIndex.forEach((task: any) => {
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
  }, [tasks, loading]);

  return (
    <div className="min-h-[1440px] w-full max-w-3xl bg-card border-x border-border/30 relative shadow-sm">
        {/* Grid Generation */}
        {Array.from({ length: 24 }).map((_, hour) => (
            <div 
                key={hour} 
                className="h-[60px] flex group relative border-b border-border/30 hover:bg-accent/5 transition-colors"
                onClick={() => onTimeSlotClick(`${hour.toString().padStart(2, '0')}:00`)}
                onDragOver={(e) => e.preventDefault()} 
                onDrop={(e) => onDropTask(e, hour)} 
            >
                <div className="w-20 flex-shrink-0 text-xs text-muted-foreground pt-0 pr-4 text-right font-mono select-none relative -top-2">
                    {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
                </div>
                <div className="flex-1 relative border-t border-border/30 group-hover:border-primary/30 transition-colors">
                    <div className="hidden group-hover:flex absolute inset-0 items-center pl-4 opacity-50">
                        <span className="text-[10px] text-primary bg-primary/5 px-2 py-1 rounded">Click to add task at {hour}:00</span>
                    </div>
                </div>
            </div>
        ))}

        {/* Tasks Renderer */}
        {positionedTasks.map((task: any) => {
            const dateObj = new Date(task.startTime);
            const topPosition = (dateObj.getHours() * 60) + dateObj.getMinutes() + 16;
            const height = task.duration;
            const widthVal = `calc((100% - 8rem) / ${task.totalCols})`;
            const leftVal = `calc(6rem + ((100% - 8rem) / ${task.totalCols} * ${task.colIndex}))`;
            const priorityStyles: Record<string, string> = {
                HIGH:   "bg-priority-high-bg border-l-priority-high text-priority-high",
                MEDIUM: "bg-priority-medium-bg border-l-priority-medium text-priority-medium",
                HABIT:  "bg-priority-habit-bg border-l-priority-habit text-priority-habit",
                LOW:    "bg-priority-low-bg border-l-priority-low text-priority-low"
            };

            return (
                <div 
                    key={task.id}
                    draggable
                    onDragStart={(e) => { e.stopPropagation(); /* parent drag handler needs to know ID from prop if needed */ }}
                    onDragOver={(e) => e.preventDefault()} 
                    // Note: Drag start logic is usually on the container or passed down. For simple view, we just render.
                    
                    className={`
                        absolute rounded-l border-l-[4px] px-2 py-1 text-xs shadow-sm cursor-move hover:shadow-md hover:z-50 transition-all overflow-hidden
                        ${priorityStyles[task.priority] || priorityStyles.LOW}
                        ${task.isCompleted ? 'opacity-60 grayscale' : 'opacity-100'}
                        ${draggedTaskId === task.id ? 'opacity-50 border-dashed' : ''} 
                    `}
                    style={{ top: `${topPosition}px`, height: `${height}px`, width: widthVal, left: leftVal, zIndex: 10 + task.colIndex }}
                    onClick={(e) => { e.stopPropagation(); onEdit(task); }}
                >
                    <div className="flex justify-between items-start h-full gap-1 pointer-events-none">
                        <div className="font-semibold truncate flex items-center gap-1 min-w-0">
                            {task.isCompleted && <Check className="w-3 h-3 flex-shrink-0" />}
                            <span className="truncate">{task.title}</span>
                        </div>
                        {(height > 30 && task.totalCols < 3) && (
                            <div className="opacity-70 font-mono text-[9px] bg-background/50 px-1 rounded flex-shrink-0">
                                {format(dateObj, "h:mm")}
                            </div>
                        )}
                    </div>
                </div>
            )
        })}
        <CurrentTimeLine />
    </div>
  );
}