"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListTodo, Check, Clock, ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";

export function PendingTasksList({ tasks, onToggle, onSubToggle }: { tasks: any[]; onToggle: any; onSubToggle: any }) {
  const pendingCount = tasks.filter(t => !t.isCompleted).length;

    // Inside PendingTasksList function
    const [activeTab, setActiveTab] = useState("tasks"); // Default to 'tasks'

    const habits = tasks.filter(t => t.priority === 'HABIT');
    const regularTasks = tasks.filter(t => t.priority !== 'HABIT');

    // Decide what to show based on the tab
    const displayedTasks = activeTab === "habits" ? habits : regularTasks;

  return (
    <div className="h-full">
      <Card className="bg-card border-2 border-border/60 shadow-sm h-full flex flex-col">
        <CardHeader className="pb-3 border-b border-border/40 bg-secondary/5 space-y-3">
            {/* Existing Title */}
            <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center justify-between">
                <span className="flex items-center gap-2"><ListTodo className="w-4 h-4 text-primary" /> Pending</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-mono">
                    {pendingCount}
                </span>
            </CardTitle>

            {/* 👇 NEW: Toggle Buttons (Segmented Control) */}
            <div className="flex p-1 bg-secondary/20 rounded-lg border border-border/50">
                <button 
                    onClick={() => setActiveTab("tasks")}
                    className={`flex-1 text-xs font-semibold py-1.5 rounded-md transition-all duration-200 ${
                        activeTab === "tasks" 
                        ? "bg-background text-foreground shadow-sm ring-1 ring-border/50" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                    Tasks ({regularTasks.length})
                </button>
                <button 
                    onClick={() => setActiveTab("habits")}
                    className={`flex-1 text-xs font-semibold py-1.5 rounded-md transition-all duration-200 ${
                        activeTab === "habits" 
                        ? "bg-background text-foreground shadow-sm ring-1 ring-border/50" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                    Habits ({habits.length})
                </button>
            </div>
        </CardHeader>

        <CardContent className="p-0 flex-1 min-h-[300px] max-h-[400px] overflow-y-auto custom-scrollbar">
          {tasks.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground/60 p-8">
              <Check className="w-12 h-12 mb-3 opacity-20" />
              <p className="text-sm font-medium text-center">All caught up!<br/>Enjoy your day.</p>
            </div>
          ) : (
            <div className="divide-y divide-border/40">
                {/* 👇 Show Empty State for specific tab if needed */}
                {displayedTasks.length === 0 && (
                    <div className="py-12 text-center text-xs text-muted-foreground italic">
                        No pending {activeTab}.
                    </div>
                )}
                
                {/* 👇 Map the filtered list */}
                {displayedTasks.map((task) => (
                    <DashboardTaskItem key={task.id} task={task} onToggle={onToggle} onSubToggle={onSubToggle} />
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function DashboardTaskItem({ task, onToggle, onSubToggle }: any) {
    const [expanded, setExpanded] = useState(false);
    const badgeColors: any = {
        HIGH: "bg-red-500/10 text-red-500 border-red-500/20",
        MEDIUM: "bg-orange-500/10 text-orange-500 border-orange-500/20",
        LOW: "bg-blue-500/10 text-blue-500 border-blue-500/20",
        HABIT: "bg-violet-500/10 text-violet-500 border-violet-500/20"
    };

    return (
        <div className="p-3 hover:bg-secondary/30 transition-colors group">
            <div className="flex items-start gap-3">
                <Checkbox 
                    checked={task.isCompleted} 
                    onCheckedChange={() => onToggle(task.id, task.isCompleted)}
                    className="mt-1 w-4 h-4 rounded-full data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className={`text-sm font-medium leading-snug truncate pr-2 ${task.isCompleted ? "line-through text-muted-foreground opacity-70" : ""}`}>
                                {task.title}
                            </p>
                            <div className="flex items-center gap-2 mt-1">

                                <span className="text-[10px] text-muted-foreground flex items-center bg-secondary/50 px-1.5 rounded">
                                    {/* You can use date-fns relative formatting like 'isToday' or simple formatting */}
                                    {format(new Date(task.date), "MMM d")}
                                </span>

                                {task.startTime && (
                                    <span className="text-[10px] text-muted-foreground flex items-center bg-secondary/50 px-1.5 rounded">
                                        <Clock className="w-2.5 h-2.5 mr-1" />
                                        {format(new Date(task.startTime), "h:mm a")}
                                    </span>
                                )}
                                <span className={`text-[9px] px-1.5 py-0 rounded border font-semibold tracking-wide uppercase ${badgeColors[task.priority] || badgeColors.LOW}`}>
                                    {task.priority}
                                </span>
                            </div>
                        </div>
                        
                        {(task.description || task.subtasks.length > 0) && (
                            <button 
                                onClick={() => setExpanded(!expanded)}
                                className={`text-muted-foreground hover:text-foreground transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                            >
                                <ChevronDown className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {expanded && task.subtasks.length > 0 && (
                        <div className="mt-3 space-y-2 pl-1 border-l-2 border-border/50 ml-1">
                            {task.subtasks.map((st: any) => (
                                <div key={st.id} className="flex items-center gap-2">
                                    <Checkbox 
                                        className="w-3 h-3 rounded-[2px]"
                                        checked={st.isCompleted}
                                        onCheckedChange={() => onSubToggle(task.id, st.id, st.isCompleted)}
                                    />
                                    <span className={`text-xs ${st.isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                                        {st.title}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    {expanded && task.description && (
                        <p className="text-xs text-muted-foreground mt-2 bg-secondary/30 p-2 rounded">
                            {task.description}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}