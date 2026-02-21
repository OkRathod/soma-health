"use client";

import { useMemo, useState, useEffect } from "react";
import { Check } from "lucide-react";
import { format } from "date-fns";

export function TimelineView({ tasks, loading, onTimeSlotClick, onDropTask, draggedTaskId, onEdit }: any) {
  
  // 1. Current Time Line Indicator
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
          <div className="absolute left-0 right-0 border-t-2 border-red-500 z-40 pointer-events-none flex items-center" style={{ top: `${top}px` }}>
              <div className="absolute left-[76px] w-2 h-2 bg-red-500 rounded-full" />
          </div>
      );
  }

  // 2. Bulletproof Overlap Clustering Logic
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

  return (
    <div className="min-h-[1440px] w-full max-w-4xl bg-card border-x border-border/40 relative shadow-sm">
        
        {/* Background Grid */}
        {Array.from({ length: 24 }).map((_, hour) => (
            <div 
                key={hour} 
                className="h-[60px] flex group relative border-b border-border/30 hover:bg-accent/10 transition-colors box-border"
                onClick={() => onTimeSlotClick(`${hour.toString().padStart(2, '0')}:00`)}
                onDragOver={(e) => e.preventDefault()} 
                onDrop={(e) => onDropTask(e, hour)} 
            >
                {/* 80px (w-20) left gutter for Time Labels */}
                <div className="w-[80px] flex-shrink-0 text-xs text-muted-foreground pt-0 pr-4 text-right font-mono select-none relative -top-2">
                    {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
                </div>
                <div className="flex-1 relative border-l border-border/40 group-hover:border-primary/30 transition-colors">
                    <div className="hidden group-hover:flex absolute inset-0 items-center pl-4 opacity-50">
                        <span className="text-[10px] text-primary bg-primary/10 px-2 py-1 rounded font-medium tracking-wide">
                            Click to add task at {hour === 0 ? 12 : hour > 12 ? hour - 12 : hour}:00 {hour >= 12 ? 'PM' : 'AM'}
                        </span>
                    </div>
                </div>
            </div>
        ))}

        {/* Overlapping Tasks Renderer */}
        {positionedTasks.map((task: any) => {
            const dateObj = new Date(task.start);
            const endDateObj = new Date(task.end);
            
            const topPosition = (dateObj.getHours() * 60) + dateObj.getMinutes();
            const height = task.duration;
            
            // EXACT CSS Math: 80px offset matches the time label column width perfectly
            const widthVal = `calc((100% - 80px) / ${task.totalCols} - 4px)`;
            const leftVal = `calc(80px + ((100% - 80px) / ${task.totalCols} * ${task.colIndex}) + 2px)`; 
            
            const priorityStyles: Record<string, string> = {
                HIGH:   "bg-red-500/10 border-l-red-500 text-red-700 dark:text-red-400",
                MEDIUM: "bg-amber-500/10 border-l-amber-500 text-amber-700 dark:text-amber-400",
                HABIT:  "bg-emerald-500/10 border-l-emerald-500 text-emerald-700 dark:text-emerald-400",
                LOW:    "bg-blue-500/10 border-l-blue-500 text-blue-700 dark:text-blue-400"
            };

            return (
                <div 
                    key={task.id}
                    draggable
                    onDragStart={(e) => { e.stopPropagation(); }}
                    onDragOver={(e) => e.preventDefault()} 
                    className={`
                        absolute rounded-r-lg border-l-[4px] px-2.5 py-1.5 shadow-sm cursor-pointer hover:shadow-md hover:z-50 transition-all overflow-hidden flex flex-col justify-between
                        ${priorityStyles[task.priority] || priorityStyles.LOW}
                        ${task.isCompleted ? 'opacity-50 grayscale bg-muted text-muted-foreground border-l-muted-foreground' : 'opacity-100'}
                        ${draggedTaskId === task.id ? 'opacity-50 border-dashed' : ''} 
                    `}
                    style={{ 
                        top: `${topPosition}px`, 
                        height: `${height}px`, 
                        width: widthVal, 
                        left: leftVal, 
                        zIndex: 10 + task.colIndex 
                    }}
                    onClick={(e) => { e.stopPropagation(); onEdit(task); }}
                >
                    <div className="font-bold text-[11px] sm:text-xs flex items-start gap-1.5 leading-tight min-w-0">
                        {task.isCompleted && <Check className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />}
                        <span className="line-clamp-2">{task.title}</span>
                    </div>
                    
                    {/* 👇 Display Start Time - End Time */}
                    {height >= 35 && (
                        <div className="opacity-80 font-mono text-[9px] sm:text-[10px] mt-auto truncate text-foreground/80 font-medium">
                            {format(dateObj, "h:mm a")} - {format(endDateObj, "h:mm a")}
                        </div>
                    )}
                </div>
            )
        })}
        <CurrentTimeLine />
    </div>
  );
}