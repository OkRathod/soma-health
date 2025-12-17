"use client";

import { Check } from "lucide-react";
import { TaskCard } from "@/components/tasks/task-card"; // Assuming you have this from earlier

export function TaskList({ loading, tasks, activeTab, onDragStart, onToggle, onSubToggle, onSubProgress, onDelete, onEdit }: any) {
  return (
    <div className="flex-1 overflow-y-auto p-4 pt-6 space-y-3 custom-scrollbar">
      {loading ? (
        <div className="text-center py-10 text-muted-foreground animate-pulse">Loading tasks...</div>
      ) : (
        <>
          {tasks.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm flex flex-col items-center gap-2">
              <div className="p-3 bg-secondary/20 rounded-full"><Check className="w-6 h-6 opacity-30" /></div>
              No {activeTab} for today.
            </div>
          )}
          {tasks.map((task: any) => (
            <div 
              key={task.id} 
              draggable 
              onDragStart={() => onDragStart(task.id)}
              className="cursor-move"
            >
              <TaskCard 
                task={task} 
                onToggle={onToggle} 
                onSubToggle={onSubToggle} 
                onSubProgress={onSubProgress} 
                onDelete={onDelete} 
                onEdit={onEdit} 
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
}