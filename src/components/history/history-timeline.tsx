"use client";

import { useMemo } from "react";
import { Check } from "lucide-react";

export function HistoryTimeline({ tasks }: { tasks: any[] }) {
   // 👇 NEW: Layout Engine for Timeline (Same as Tasks Page)
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
    <div className="relative h-[1440px] border rounded-xl bg-card/30 overflow-hidden shadow-inner">
        {/* 24 Hour Grid Lines - Quieter */}
        {Array.from({length: 24}).map((_, i) => (
            <div key={i} className="absolute left-0 w-full border-t border-border/10 h-[60px]" style={{ top: `${i * 60}px` }}>
                <span className="text-[10px] text-muted-foreground/30 pl-2 pt-1 block font-mono">
                    {i === 0 ? "12 AM" : i < 12 ? `${i} AM` : i === 12 ? "12 PM" : `${i-12} PM`}
                </span>
            </div>
        ))}

        {/* Task Blocks */}
        {positionedTasks.map((task: any) => {
            const d = new Date(task.startTime);
            const topPos = (d.getHours() * 60) + d.getMinutes();
            const height = task.duration;
            const widthVal = `calc((100% - 5rem) / ${task.totalCols})`;
            const leftVal = `calc(4rem + ((100% - 5rem) / ${task.totalCols} * ${task.colIndex}))`;
            const styleVariant = 
            task.priority === 'HIGH' ? 'border-l-red-500/70 bg-red-500/5' : 
            task.priority === 'MEDIUM' ? 'border-l-orange-500/70 bg-orange-500/5' :
            task.priority === 'HABIT' ? 'border-l-violet-500/70 bg-violet-500/5' :
            'border-l-blue-500/70 bg-blue-500/5'; // Low

            return (
              <div 
                  key={task.id}
                  className={`
                      absolute rounded-r-sm border-l-[3px] px-3 py-1.5 text-xs 
                      transition-all hover:brightness-95 hover:z-20 cursor-pointer
                      ${styleVariant}
                      ${task.isCompleted ? 'opacity-50 grayscale-[0.5]' : 'opacity-90'}
                  `}
                  style={{ 
                      top: `${topPos}px`, 
                      height: `${Math.max(30, height)}px`, 
                      width: widthVal,
                      left: leftVal,
                      zIndex: 10 + task.colIndex
                  }} 
              >
                  <div className="flex flex-col h-full justify-between">
                      {/* Title - Darker text for readability */}
                      <span className="font-medium text-foreground/90 truncate leading-tight">
                          {task.title}
                      </span>
                      
                      {/* Time - Only show if tall enough */}
                      {(height > 40) && (
                          <span className="text-[9px] text-muted-foreground/60 font-mono">
                              {d.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                          </span>
                      )}
                  </div>
              </div>
          )
        })}
    </div>
  );
}