"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { format } from "date-fns";
import { Plus, Repeat, AlignLeft, ChevronDown} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddTaskDialog } from "@/components/tasks/add-task-dialog";
import { TaskList } from "@/components/tasks/task-list";
import { TimelineView } from "@/components/tasks/timeline-view";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar"; // Ensure you have this component
import { cn } from "@/lib/utils";

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
  const lastFetchedDate = useRef<string | null>(null);
  const [mobileView, setMobileView] = useState<"list" | "timeline">("list");
  const [activeTab, setActiveTab] = useState("tasks"); 
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

// ##################################################################################################################################################
// FUNCTIONS

useEffect(() => {
      const dateStr = selectedDate.toISOString();
      if (lastFetchedDate.current === dateStr) return;
      lastFetchedDate.current = dateStr;
      fetchTasks();
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


  const positionedTasks = useMemo(() => {
    if (loading || tasks.length === 0) return [];

    const validTasks = tasks
      .filter(t => t.startTime)
      .map(t => ({
        ...t,
        start: new Date(t.startTime).getTime(),
        end: new Date(t.startTime).getTime() + (t.durationMins || 60) * 60000,
        duration: t.durationMins || 60
      }))
      .sort((a, b) => a.start - b.start);

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
  }, [tasks, loading]);

return (
    <div className="h-screen bg-background text-foreground flex flex-col overflow-hidden">
        
        {/* 1. Header (Cleaned up) */}
        <header className="h-16 border-b border-border/40 bg-background/60 backdrop-blur-sm flex items-center justify-between px-4 md:px-6 shrink-0 z-10 gap-4">
            <div className="flex items-center gap-3 overflow-hidden">
                <div className="min-w-0 flex items-center gap-2">
                    
                    {/* 👇 NEW: Date Picker Popover */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="ghost"
                                className={cn(
                                    "pl-0 text-l md:text-2xl font-bold tracking-tight text-foreground/80 hover:bg-transparent hover:text-primary transition-colors justify-start h-auto p-0"
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
                                onSelect={(date) => date && setSelectedDate(date)} // Update state on selection
                                initialFocus
                                fromYear={2024} 
                                toYear={new Date().getFullYear() + 5}
                                className="rounded-md border-0"
                            />
                        </PopoverContent>
                    </Popover>

                </div>
            </div>

            <div className="flex md:hidden bg-secondary/50 p-1 rounded-lg border border-border/40">
                <button
                onClick={() => setMobileView("list")}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                    mobileView === "list"
                    ? "bg-background shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
                    : "text-muted-foreground"
                }`}
                >
                List
                </button>
                <button
                onClick={() => setMobileView("timeline")}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                    mobileView === "timeline"
                    ? "bg-background shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
                    : "text-muted-foreground"
                }`}
                >
                Time
                </button>
            </div>
        </header>


        {/* 2. Main Content */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
            
            {/* === Left Column (List) === */}
            <aside className={`
                w-full md:w-[400px] xl:w-[450px] border-r border-border/40 bg-background/50 flex-col shrink-0 relative
                ${mobileView === 'list' ? 'flex h-full' : 'hidden md:flex'}
            `}>
                {/* Tabs Header */}
                <div className="p-4 border-b border-border/40 shrink-0">
                    <Tabs defaultValue="tasks" value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="tasks" className="gap-2"><AlignLeft className="w-4 h-4"/> Tasks</TabsTrigger>
                            <TabsTrigger value="habits" className="gap-2"><Repeat className="w-4 h-4"/> Habits</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                {/* Scrollable List Area (Now has padding-bottom for the button) */}
                <div className="flex-1 overflow-y-auto pb-40 md:pb-24 custom-scrollbar"> 
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

                {/* 👇 STICKY ADD BUTTON (Bottom of List) */}
                <div className="absolute bottom-[calc(4rem+env(safe-area-inset-bottom))] md:bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent pt-10 z-20">
                    <Button 
                        onClick={() => { resetForm(); setIsAdding(true); }} 
                        className="w-full shadow-xl shadow-primary/20 h-12 text-sm font-semibold rounded-xl"
                    >
                        <Plus className="w-5 h-5 mr-2" /> Add New Task
                    </Button>
                </div>
            </aside>

            {/* === Right Column (Timeline) === */}
            <main className={`
                flex-1 overflow-y-auto bg-background/50 relative custom-scrollbar flex justify-center pt-3 pb-24 md:pb-5
                ${mobileView === 'timeline' ? 'flex' : 'hidden md:flex'}
            `}>
                <TimelineView 
                    tasks={tasks}
                    loading={loading}
                    onTimeSlotClick={openAddModalAtTime}
                    onDropTask={handleDropTask}
                    draggedTaskId={draggedTaskId}
                    onEdit={openEditModal}
                />
            </main>
        </div>

        {/* 3. Dialog Component */}
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
