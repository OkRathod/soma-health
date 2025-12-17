"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Clock,Trash2} from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export function HistoryTaskList({ tasks, onToggle, onDelete }: { tasks: any[], onToggle: (id: string, status: boolean) => void, onDelete: (id: string) => void }) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground bg-muted/10 rounded-xl border border-dashed">
        No tasks found for this day.
      </div>
    );
  }

  const badgeColors: any = {
    HIGH: "bg-red-500/10 text-red-500 border-red-500/20",
    MEDIUM: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    LOW: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    HABIT: "bg-violet-500/10 text-violet-500 border-violet-500/20"
  };

  return (
    <div className="max-h-[600px] overflow-y-auto pr-2 custom-scrollbar space-y-3">
      {tasks.map(task => (
        
        <div 
          key={task.id} 
          className="flex items-start gap-3 p-3 bg-card border border-border rounded-lg shadow-sm hover:border-primary/30 transition-colors group relative pr-10"
        >
          <div className="mt-1">
            <Checkbox 
              checked={task.isCompleted} 
              onCheckedChange={() => onToggle(task.id, task.isCompleted)}
              className={`w-4 h-4 rounded-full transition-all ${
                task.isCompleted 
                  ? "data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500" 
                  : "border-orange-500/50 data-[state=unchecked]:bg-orange-500/10"
              }`}
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <p className={`text-sm font-medium truncate transition-all ${task.isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                {task.title}
              </p>
              <span className={`text-[10px] uppercase font-bold tracking-wider text-muted-foreground border px-1.5 rounded ml-2 shrink-0 ${badgeColors[task.priority] || ""}`}>
                {task.priority}
              </span>
            </div>
            {task.startTime && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <Clock className="w-3 h-3" />
                {new Date(task.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                {task.durationMins && <span className="opacity-50">({task.durationMins}m)</span>}
              </div>
            )}
          </div>
          {/* 👇 DELETE BUTTON (Visible on Hover) */}
          <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-destructive"
                onClick={(e) => {
                    e.stopPropagation(); // Prevent toggling the task
                    onDelete(task.id);
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
          </div>
        </div>
      ))}
    </div>
  );
}