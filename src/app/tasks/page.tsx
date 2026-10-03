"use client";

import { useState, useEffect } from "react";
import { format, isToday } from "date-fns";
import { Plus, Repeat, AlignLeft, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddTaskDialog } from "@/components/tasks/add-task-dialog";
import { TaskList } from "@/components/tasks/task-list";
import { TimelineView } from "@/components/tasks/timeline-view";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { SomaLoader as DNALoader } from "@/components/soma-loader";
import { ensureTodaysHabits } from "@/app/actions/habits";

export default function TasksPage() {

//###################################################################################################################################################
// STATES & REFS

  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newSubtask, setNewSubtask] = useState({ title: "", targetValue: "", unit: "" });
  const [newTask, setNewTask] = useState({title: "", description: "", priority: "LOW", isRecurring: false, date: format(new Date(), "yyyy-MM-dd"), startTime: "", duration: "60", subtasks: [] as any[] });
  const [mobileView, setMobileView] = useState<"list" | "timeline">("list");
  const [activeTab, setActiveTab] = useState("tasks");
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

// ##################################################################################################################################################
// FUNCTIONS

// Fetch tasks for the selected date. When the selected date is TODAY we first
// run ensureTodaysHabits() — the same idempotent safety-net the dashboard uses —
// so habit instances exist even when the user opens /tasks before /dashboard.
useEffect(() => {
    const timer = setTimeout(async () => {
        try {
            if (isToday(selectedDate)) {
                await ensureTodaysHabits(
                    Intl.DateTimeFormat().resolvedOptions().timeZone
                ).catch(() => {});
            }
        } finally {
            fetchTasks();
        }
    }, 400);

    return () => clearTimeout(timer);
}, [selectedDate]);

async function handleDropTask(e: React.DragEvent, hour: number) {
      e.preventDefault();
      if (!draggedTaskId) return;

      const taskToUpdate = tasks.find(t => t.id === draggedTaskId);
      if (!taskToUpdate) return;

      const newStartTime = new Date(selectedDate);
      newStartTime.setHours(hour);
      newStartTime.setMinutes(0);
      newStartTime.setSeconds(0);

      setTasks(prev => prev.map(t =>
          t.id === draggedTaskId ? { ...t, startTime: newStartTime } : t
      ));

      await fetch("/api/tasks", {
          method: "PATCH",
          body: JSON.stringify({
              taskId: draggedTaskId,
              startTime: newStartTime
          })
      });

      setDraggedTaskId(null);
  }


  function openAddModalAtTime(timeString: string) {
      setEditingId(null);
      setNewTask({
          title: "",
          description: "",
          priority: "LOW",
          isRecurring: false,
          date: format(selectedDate, "yyyy-MM-dd"),
          startTime: timeString,
          duration: "60",
          subtasks: []
      });
      setNewSubtask({ title: "", targetValue: "", unit: "" });
      setIsAdding(true);
  }


  const filteredTasks = tasks.filter(t => {
      if (activeTab === 'habits') return t.priority === "HABIT" || t.isRecurring;
      return t.priority !== "HABIT" && !t.isRecurring;
  });


  async function fetchTasks() {
    setLoading(true);
    try {
        const res = await fetch(`/api/tasks?date=${format(selectedDate, "yyyy-MM-dd")}`);
        const data = await res.json();
        if (data.success) setTasks(data.tasks);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }


  function openEditModal(task: any) {
      setEditingId(task.id);
      setNewTask({
          title: task.title,
          description: task.description || "",
          priority: task.priority,
          isRecurring: task.priority === "HABIT" || task.isRecurring,
          date: task.date ? format(new Date(task.date), "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"),
          startTime: task.startTime ? format(new Date(task.startTime), "HH:mm") : "",
          duration: task.durationMins ? task.durationMins.toString() : "60",
          subtasks: task.subtasks || []
      });
      setIsAdding(true);
  }


  async function handleSaveTask() {
    let finalPriority = newTask.priority;
    if (!newTask.isRecurring && newTask.priority === "HABIT") {
        finalPriority = "LOW";
    } else if (newTask.isRecurring) {
        finalPriority = "HABIT";
    }

    const newSubtasksToAdd = newTask.subtasks.filter((st: any) => !st.id);
    const targetDateObj = new Date(newTask.date);
    const startTimeObj = newTask.startTime
        ? new Date(`${newTask.date}T${newTask.startTime}`)
        : null;

    const payload = {
        title: newTask.title,
        description: newTask.description,
        priority: finalPriority,
        isRecurring: newTask.isRecurring,

        date: targetDateObj,
        startTime: startTimeObj,
        duration: newTask.duration ? parseInt(newTask.duration) : 60,

        newSubtasks: newSubtasksToAdd,
        subtasks: newTask.subtasks
    };

    let res;
    if (editingId) {
        res = await fetch("/api/tasks", {
            method: "PATCH",
            body: JSON.stringify({ taskId: editingId, ...payload })
        });
    } else {
        res = await fetch("/api/tasks", {
            method: "POST",
            body: JSON.stringify(payload)
        });
    }

    const data = await res.json();
    if (data.success) {
        setIsAdding(false);
        resetForm();
        fetchTasks();
    } else {
        alert(data.error || "Operation failed");
    }
  }


  function resetForm() {
      setNewTask({
          title: "",
          description: "",
          priority: "LOW",
          isRecurring: false,
          date: format(selectedDate, "yyyy-MM-dd"),
          startTime: "",
          duration: "60",
          subtasks: []
      });
      setNewSubtask({ title: "", targetValue: "", unit: "" });
      setEditingId(null);
  }



  async function toggleTask(id: string, currentStatus: boolean) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, isCompleted: !currentStatus } : t));
    await fetch("/api/tasks", {
        method: "PATCH",
        body: JSON.stringify({ taskId: id, isCompleted: !currentStatus })
    });
  }


  async function toggleSubtask(taskId: string, subtaskId: string, currentStatus: boolean) {
     setTasks(prev => prev.map(t => {
         if (t.id !== taskId) return t;
         return {
             ...t,
             subtasks: t.subtasks.map((st: any) =>
                 st.id === subtaskId ? { ...st, isCompleted: !currentStatus } : st
             )
         };
     }));

     await fetch("/api/tasks", {
        method: "PATCH",
        body: JSON.stringify({ taskId, subtaskId, isCompleted: !currentStatus })
    });
  }


  async function updateSubtaskProgress(taskId: string, subtaskId: string, newValue: number) {
     setTasks(prev => prev.map(t => {
         if (t.id !== taskId) return t;
         return {
             ...t,
             subtasks: t.subtasks.map((st: any) =>
                 st.id === subtaskId ? { ...st, currentValue: newValue } : st
             )
         };
     }));

     await fetch("/api/tasks", {
        method: "PATCH",
        body: JSON.stringify({ taskId, subtaskId, subtaskValue: newValue })
    });
  }


  async function handleDeleteTask(taskId: string) {
    if (!confirm("Are you sure you want to delete this task?")) return;
    setTasks(prev => prev.filter(t => t.id !== taskId));
    await fetch(`/api/tasks?id=${taskId}`, { method: "DELETE" });
  }

return (
    <div className="h-screen bg-background text-foreground flex flex-col overflow-hidden">
        {loading && <DNALoader/>}
        {/* 1. Header */}
        <header className="h-16 border-b border-border/50 bg-background/70 backdrop-blur-md flex items-center justify-between px-4 md:px-6 shrink-0 z-10 gap-4">
            <div className="flex items-center gap-3 overflow-hidden">
                <div className="min-w-0 flex items-center gap-2">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="ghost"
                                className={cn(
                                    "pl-0 text-lg md:text-2xl font-bold tracking-tight text-foreground/90 hover:bg-transparent hover:text-primary transition-colors justify-start h-auto p-0"
                                )}
                            >
                                <span className="truncate">
                                    {format(selectedDate, "EEEE, MMM do, yyyy")}
                                </span>
                                <ChevronDown className="ml-2 h-5 w-5 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 border-border" align="start">
                            <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={(date) => date && setSelectedDate(date)}
                                initialFocus
                                fromYear={2024}
                                toYear={new Date().getFullYear() + 5}
                                className="rounded-md border-0"
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <div className="flex md:hidden bg-secondary/60 p-1 rounded-lg border border-border/50">
                <button
                onClick={() => setMobileView("list")}
                className={cn(
                    "px-3 py-1 text-xs font-semibold rounded-md transition-all press",
                    mobileView === "list" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"
                )}
                >
                List
                </button>
                <button
                onClick={() => setMobileView("timeline")}
                className={cn(
                    "px-3 py-1 text-xs font-semibold rounded-md transition-all press",
                    mobileView === "timeline" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"
                )}
                >
                Time
                </button>
            </div>
        </header>


        {/* 2. Main Content */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">

            {/* === Left Column (List) === */}
            <aside className={cn(
                "w-full md:w-[400px] xl:w-[450px] border-r border-border/50 bg-background/40 flex-col shrink-0 relative",
                mobileView === 'list' ? 'flex h-full' : 'hidden md:flex'
            )}>
                {/* Tabs Header */}
                <div className="p-4 border-b border-border/50 shrink-0">
                    <Tabs defaultValue="tasks" value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="tasks" className="gap-2"><AlignLeft className="w-4 h-4"/> Tasks</TabsTrigger>
                            <TabsTrigger value="habits" className="gap-2"><Repeat className="w-4 h-4"/> Habits</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                {/* Scrollable List Area */}
                <div className="flex-1 overflow-y-auto pb-40 md:pb-24 custom-scrollbar animate-fade-in">
                    <TaskList
                        loading={loading}
                        tasks={filteredTasks}
                        activeTab={activeTab}
                        onDragStart={setDraggedTaskId}
                        onToggle={toggleTask}
                        onSubToggle={toggleSubtask}
                        onSubProgress={updateSubtaskProgress}
                        onDelete={handleDeleteTask}
                        onEdit={openEditModal}
                    />
                </div>

                {/* STICKY ADD BUTTON */}
                <div className="absolute bottom-[calc(4rem+env(safe-area-inset-bottom))] md:bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent pt-10 z-20">
                    <Button
                        onClick={() => { resetForm(); setIsAdding(true); }}
                        className="w-full shadow-xl shadow-primary/25 h-12 text-sm font-semibold rounded-xl hover-lift"
                    >
                        <Plus className="w-5 h-5 mr-2" /> Add New Task
                    </Button>
                </div>
            </aside>

            {/* === Right Column (Timeline) === */}
            <main className={cn(
                "flex-1 overflow-y-auto bg-background/40 relative custom-scrollbar flex justify-center pt-3 pb-24 md:pb-5",
                mobileView === 'timeline' ? 'flex' : 'hidden md:flex'
            )}>
                <TimelineView
                    tasks={filteredTasks}
                    loading={loading}
                    onTimeSlotClick={openAddModalAtTime}
                    onDropTask={handleDropTask}
                    draggedTaskId={draggedTaskId}
                    onEdit={openEditModal}
                />
            </main>
        </div>

        {/* 3. Dialog */}
        <AddTaskDialog
            isOpen={isAdding}
            onOpenChange={(open: boolean) => { setIsAdding(open); if(!open) resetForm(); }}
            task={newTask}
            setTask={setNewTask}
            subtask={newSubtask}
            setSubtask={setNewSubtask}
            onSave={handleSaveTask}
            isEditing={!!editingId}
        />
    </div>
  );
}