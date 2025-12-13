"use client";

import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { 
  Plus, Check, Calendar as CalendarIcon, Clock, AlertCircle, 
  Repeat, ChevronDown, ChevronUp, Trash2, Edit2, Layers, Sparkles, AlignLeft, GripVertical 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {DNALoader} from "@/components/dna-loader"; 
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newSubtask, setNewSubtask] = useState({ title: "", targetValue: "", unit: "" });
  const [newTask, setNewTask] = useState({title: "", description: "", priority: "LOW", isRecurring: false, date: format(new Date(), "yyyy-MM-dd"), startTime: "", subtasks: [] as any[] });
  const lastFetchedDate = useRef<string | null>(null);
  // 👇 NEW: State to toggle views on mobile (List vs Timeline)
  const [mobileView, setMobileView] = useState<"list" | "timeline">("list");
  // NEW: State for the Toggle Switch
  const [activeTab, setActiveTab] = useState("tasks"); // 'tasks' | 'habits'


  // ... existing state ...
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  // 👇 NEW: Handle Dropping a Task onto a Time Slot
  async function handleDropTask(e: React.DragEvent, hour: number) {
      e.preventDefault();
      if (!draggedTaskId) return;

      const taskToUpdate = tasks.find(t => t.id === draggedTaskId);
      if (!taskToUpdate) return;

      // Construct new date object based on the drop slot (e.g., today at 14:00)
      const newStartTime = new Date(selectedDate);
      newStartTime.setHours(hour);
      newStartTime.setMinutes(0); // Default to top of the hour
      newStartTime.setSeconds(0);

      // Optimistic Update (Instant UI change)
      setTasks(prev => prev.map(t => 
          t.id === draggedTaskId ? { ...t, startTime: newStartTime } : t
      ));

      // API Update
      await fetch("/api/tasks", { 
          method: "PATCH", 
          body: JSON.stringify({ 
              taskId: draggedTaskId, 
              startTime: newStartTime 
          }) 
      });
      
      setDraggedTaskId(null);
  }
  
  useEffect(() => {
        const dateStr = selectedDate.toISOString();
        if (lastFetchedDate.current === dateStr) return;
        lastFetchedDate.current = dateStr;
        fetchTasks();
    }, [selectedDate]);


// 👇 NEW: Helper to open modal from Timeline click
  function openAddModalAtTime(timeString: string) {
      setEditingId(null);
      setNewTask({ 
          title: "", 
          description: "", 
          priority: "LOW", 
          isRecurring: false, 
          date: format(selectedDate, "yyyy-MM-dd"), 
          startTime: timeString, // 👈 Pre-fills the specific hour you clicked
          subtasks: [] 
      });
      setNewSubtask({ title: "", targetValue: "", unit: "" });
      setIsAdding(true);
  }

  // 👇 NEW: Filter logic for the Sidebar Toggle
  const filteredTasks = tasks.filter(t => {
      if (activeTab === 'habits') return t.priority === "HABIT" || t.isRecurring;
      return t.priority !== "HABIT" && !t.isRecurring;
  });

  async function fetchTasks() {
    setLoading(true);
    try {
        const res = await fetch(`/api/tasks?date=${selectedDate.toISOString()}`, { cache: 'no-store' });
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
        
        {/* --- 1. TOP NAVIGATION BAR --- */}
        <header className="h-16 border-b border-border/40 bg-background/50 backdrop-blur-sm flex items-center justify-between px-4 md:px-6 shrink-0 z-10 gap-4 pt-2">
            <div className="flex items-center gap-4 overflow-hidden">
                <div className="p-2 bg-primary/10 rounded-lg text-primary shrink-0">
                    <CalendarIcon className="w-5 h-5" /> 
                </div>
                <div className="min-w-0">
                    <h1 className="text-lg font-bold leading-none tracking-tight truncate">Daily Plan</h1>
                    <p className="text-xs text-muted-foreground font-mono mt-1 truncate">
                        {format(selectedDate, "EEEE, MMMM do, yyyy")}
                    </p>
                </div>
            </div>

            {/* 👇 NEW: Mobile View Toggle (Visible only on small screens) */}
            <div className="flex md:hidden bg-secondary/50 p-1 rounded-lg">
                <button 
                    onClick={() => setMobileView("list")}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${mobileView === 'list' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'}`}
                >
                    List
                </button>
                <button 
                    onClick={() => setMobileView("timeline")}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${mobileView === 'timeline' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'}`}
                >
                    Time
                </button>
            </div>

            {/* Global Actions */}
            <div className="flex items-center gap-3 shrink-0">
                <Button 
                    onClick={() => {
                        resetForm();
                        setIsAdding(true);
                    }} 
                    className="shadow-lg shadow-primary/20 h-8 text-xs md:h-10 md:text-sm"
                >
                    <Plus className="w-4 h-4 md:mr-2" /> Add Item
                </Button>
            </div>
        </header>

        {/* --- 2. MAIN SPLIT CONTENT --- */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
            
            {/* === LEFT COLUMN: LIST VIEW (35%) === */}
            <aside className={`
                w-full md:w-[400px] xl:w-[450px] border-r border-border/40 bg-background/50 flex-col shrink-0
                ${mobileView === 'list' ? 'flex' : 'hidden md:flex'} 
            `}>
                
                {/* Toggle & Staging Area Header */}
                <div className="p-4 border-b border-border/40">
                    <Tabs defaultValue="tasks" value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="tasks" className="gap-2"><AlignLeft className="w-4 h-4"/> Tasks</TabsTrigger>
                            <TabsTrigger value="habits" className="gap-2"><Repeat className="w-4 h-4"/> Habits</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                {/* Scrollable List */}
                <div className="flex-1 overflow-y-auto p-4 pt-6 space-y-3 custom-scrollbar">
                    {loading ? <DNALoader /> : (
                        <>
                            {filteredTasks.length === 0 && (
                                <div className="text-center py-12 text-muted-foreground text-sm flex flex-col items-center gap-2">
                                    <div className="p-3 bg-secondary/20 rounded-full"><Check className="w-6 h-6 opacity-30" /></div>
                                    No {activeTab} for today.
                                </div>
                            )}
                            {filteredTasks.map(task => (
                                <div 
                                    key={task.id} 
                                    draggable 
                                    onDragStart={() => setDraggedTaskId(task.id)}
                                    className="cursor-move" // Visual cue
                                >
                                    <TaskCard 
                                        key={task.id} 
                                        task={task} 
                                        onToggle={toggleTask} 
                                        onSubToggle={toggleSubtask} 
                                        onSubProgress={updateSubtaskProgress} 
                                        onDelete={handleDeleteTask} 
                                        onEdit={openEditModal} 
                                    />
                                </div>
                                
                            ))}
                        </>
                    )}
                </div>
            </aside>

            {/* === RIGHT COLUMN: 24H TIMELINE (65%) === */}
            <main className={`
                flex-1 overflow-y-auto bg-background/50 relative custom-scrollbar flex justify-center pt-3 pb-5
                ${mobileView === 'timeline' ? 'flex' : 'hidden md:flex'}
            `}>
                <div className="min-h-[1440px] w-full max-w-3xl bg-card border-x border-border/30 relative shadow-sm">
                    
                    {/* Timeline Grid Generation */}
                    {Array.from({ length: 24 }).map((_, hour) => (
                        <div 
                            key={hour} 
                            className="h-[60px] flex group relative border-b border-border/30 hover:bg-accent/5 transition-colors" // Added hover effect
                            onClick={() => openAddModalAtTime(`${hour.toString().padStart(2, '0')}:00`)}
                            
                            // 👇 NEW: Drop Handlers
                            onDragOver={(e) => e.preventDefault()} // Allow dropping
                            onDrop={(e) => handleDropTask(e, hour)} // Handle the drop
                        >
                            {/* Time Label */}
                            <div className="w-20 flex-shrink-0 text-xs text-muted-foreground pt-0 pr-4 text-right font-mono select-none relative -top-2">
                                {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
                            </div>
                            
                            {/* Grid Lines */}
                            <div className="flex-1 relative border-t border-border/30 group-hover:border-primary/30 transition-colors">
                                {/* Invisible 'Add' hint on hover */}
                                <div className="hidden group-hover:flex absolute inset-0 items-center pl-4 opacity-50">
                                    <span className="text-[10px] text-primary bg-primary/5 px-2 py-1 rounded">Click to add task at {hour}:00</span>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* --- TASK BLOCKS RENDERER --- */}
                    {!loading && tasks.filter(t => t.startTime).map(task => {
                        // 1. Calculate Vertical Position & Time info
                        const dateObj = new Date(task.startTime);
                        const hours = dateObj.getHours(); // We need this for the drop logic
                        const minutes = dateObj.getMinutes();
                        const topPosition = (hours * 60) + minutes + 16; // +16px top padding offset

                        // 2. Overlap Logic
                        const overlappingTasks = tasks.filter(t => {
                            if (!t.startTime) return false;
                            const tDate = new Date(t.startTime);
                            return tDate.getHours() === hours; 
                        });

                        // 3. Sort & Calculate Width/Left
                        const sortedGroup = overlappingTasks.sort((a, b) => a.id.localeCompare(b.id));
                        const myIndex = sortedGroup.findIndex(t => t.id === task.id);
                        const totalInGroup = sortedGroup.length;

                        // Dynamic width calculation
                        const widthVal = `calc((100% - 8rem) / ${totalInGroup})`;
                        const leftVal = `calc(6rem + ((100% - 8rem) / ${totalInGroup} * ${myIndex}))`;

                        const height = 50; 

                        return (
                            <div 
                                key={task.id}
                                draggable
                                onDragStart={(e) => {
                                    e.stopPropagation(); 
                                    setDraggedTaskId(task.id);
                                }}
                                // 👇 NEW: Allow dropping ONTO other tasks to create overlaps
                                onDragOver={(e) => e.preventDefault()} 
                                onDrop={(e) => {
                                    e.stopPropagation(); // Stop it from bubbling to the grid
                                    handleDropTask(e, hours); // Drop into the SAME hour as this task
                                }}
                                
                                className={`absolute rounded-lg border-l-[4px] px-2 py-1 text-xs shadow-sm cursor-move hover:shadow-md hover:z-50 transition-all overflow-hidden
                                    ${task.priority === 'HIGH' ? 'bg-red-500/10 border-l-red-500 text-red-700 dark:text-red-300' : 
                                    task.priority === 'MEDIUM' ? 'bg-orange-500/10 border-l-orange-500 text-orange-700 dark:text-orange-300' :
                                    task.priority === 'HABIT' ? 'bg-violet-500/10 border-l-violet-500 text-violet-700 dark:text-violet-300' :
                                    'bg-blue-500/10 border-l-blue-500 text-blue-700 dark:text-blue-300'}
                                    ${task.isCompleted ? 'opacity-60 grayscale' : 'opacity-100'}
                                    ${draggedTaskId === task.id ? 'opacity-50 border-dashed' : ''} 
                                `}
                                style={{ 
                                    top: `${topPosition}px`, 
                                    height: `${height}px`,
                                    width: widthVal, 
                                    left: leftVal,
                                    zIndex: 10 // Ensure it sits above grid but below modals
                                }}
                                onClick={(e) => {
                                    e.stopPropagation(); 
                                    openEditModal(task);
                                }}
                            >
                                <div className="flex justify-between items-center h-full gap-1 pointer-events-none">
                                    <div className="font-semibold truncate flex items-center gap-1 min-w-0">
                                        {task.isCompleted && <Check className="w-3 h-3 flex-shrink-0" />}
                                        <span className="truncate">{task.title}</span>
                                    </div>
                                    {totalInGroup < 3 && (
                                        <div className="opacity-70 font-mono text-[9px] bg-background/50 px-1 rounded flex-shrink-0">
                                            {format(dateObj, "h:mm")}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}

                    {/* Current Time Line (Red) */}
                    <CurrentTimeLine />
                </div>
            </main>
        </div>

        {/* --- MODAL (Same as before, just styled) --- */}
        <Dialog open={isAdding} onOpenChange={(open) => { setIsAdding(open); if(!open) resetForm(); }}>
            <DialogContent className="w-[95vw] max-w-lg bg-card border-border sm:rounded-xl max-h-[85vh] flex flex-col p-0 overflow-hidden shadow-xl shadow-primary/10">

                {/* Header */}
                <div className="p-6 pb-3 border-b border-border/40 bg-secondary/20">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold flex items-center gap-2">
                    {editingId ? <Edit2 className="w-5 h-5 text-primary" /> : <Sparkles className="w-5 h-5 text-primary" />}
                    {editingId ? "Edit Task" : "Create New Task"}
                    </DialogTitle>
                </DialogHeader>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 custom-scrollbar">

                {/* Title */}
                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground/80">Title</label>
                    <Input
                    className="bg-secondary/30 border-transparent focus:border-primary focus:bg-background transition-all"
                    placeholder="What needs to be done?"
                    value={newTask.title}
                    onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                    />
                </div>

                {/* Priority + Time Row */}
                <div className="grid grid-cols-2 gap-4">

                    {/* Priority */}
                    <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground/80">Priority</label>
                    <Select
                        value={newTask.priority === "HABIT" && !newTask.isRecurring ? "LOW" : newTask.priority}
                        onValueChange={v => setNewTask({ ...newTask, priority: v })}
                        disabled={newTask.isRecurring}
                    >
                        <SelectTrigger className="bg-secondary/30 border-transparent focus:border-primary">
                        <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="HIGH">High (Max 3)</SelectItem>
                        <SelectItem value="MEDIUM">Medium (Max 5)</SelectItem>
                        <SelectItem value="LOW">Low</SelectItem>
                        </SelectContent>
                    </Select>
                    </div>

                    {/* Date + Time */}
                    <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground/80">Time</label>
                    <div className="flex gap-2">
                        <Input
                        type="date"
                        className="bg-secondary/30 border-transparent focus:border-primary focus:bg-background transition-all flex-1"
                        value={newTask.date}
                        onChange={e => setNewTask({ ...newTask, date: e.target.value })}
                        />
                        <Input
                        type="time"
                        className="bg-secondary/30 border-transparent focus:border-primary focus:bg-background transition-all w-24"
                        value={newTask.startTime}
                        onChange={e => setNewTask({ ...newTask, startTime: e.target.value })}
                        />
                    </div>
                    </div>

                </div>

                {/* Recurring Checkbox */}
                <div className="flex items-start gap-3 border border-border/50 bg-secondary/10 p-4 rounded-lg shadow-sm hover:border-primary/40 transition-colors">
                    <Checkbox
                    id="recurring"
                    className="mt-1 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    checked={newTask.isRecurring}
                    onCheckedChange={(c) => setNewTask({ ...newTask, isRecurring: !!c })}
                    />
                    <div className="space-y-0.5">
                    <label htmlFor="recurring" className="text-sm font-medium cursor-pointer">
                        Mark as Daily Habit
                    </label>
                    <p className="text-xs text-muted-foreground">
                        Repeats every day automatically.
                    </p>
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground/80">Description</label>
                    <Textarea
                    className="bg-secondary/30 border-transparent focus:border-primary focus:bg-background transition-all resize-none min-h-[80px]"
                    placeholder="Add details..."
                    value={newTask.description}
                    onChange={e => setNewTask({ ...newTask, description: e.target.value })}
                    />
                </div>

                {/* Subtasks */}
                <div className="bg-secondary/20 p-4 rounded-lg border border-border/50 space-y-4 shadow-sm">

                    <label className="text-sm font-semibold flex items-center gap-2 text-foreground/80">
                    <Layers className="w-4 h-4 text-primary" /> Subtasks
                    </label>

                    {/* Subtask input row */}
                    <div className="flex gap-2">
                    <Input
                        placeholder="Name (e.g. Pushups)"
                        className="h-9 text-sm bg-background border-transparent focus:border-primary"
                        value={newSubtask.title}
                        onChange={e => setNewSubtask({ ...newSubtask, title: e.target.value })}
                    />
                    <Input
                        placeholder="Target"
                        type="number"
                        className="h-9 w-20 text-sm bg-background border-transparent focus:border-primary"
                        value={newSubtask.targetValue}
                        onChange={e => setNewSubtask({ ...newSubtask, targetValue: e.target.value })}
                    />
                    <Button
                        size="sm"
                        className="h-9"
                        onClick={() => {
                        if (!newSubtask.title) return;
                        setNewTask({ ...newTask, subtasks: [...newTask.subtasks, { ...newSubtask }] });
                        setNewSubtask({ title: "", targetValue: "", unit: "" });
                        }}
                    >
                        Add
                    </Button>
                    </div>

                    {/* Subtask list */}
                    {newTask.subtasks.length > 0 && (
                    <div className="space-y-2 mt-1">
                        {newTask.subtasks.map((st, i) => (
                        <div
                            key={i}
                            className="text-xs flex justify-between items-center bg-background p-2 px-3 rounded-md border shadow-sm animate-in slide-in-from-left-2"
                        >
                            <span className="font-medium truncate max-w-[70%]">{st.title}</span>
                            {st.targetValue && (
                            <Badge variant="secondary" className="text-[10px] h-5">
                                Target: {st.targetValue}
                            </Badge>
                            )}
                        </div>
                        ))}
                    </div>
                    )}

                </div>

                {/* Save Button */}
                <Button
                    className="w-full text-base font-semibold py-5 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
                    onClick={handleSaveTask}
                >
                    {editingId ? "Save Changes" : "Create Task"}
                </Button>

                </div>
            </DialogContent>
            </Dialog>
    </div>
  );
}

// 1. Current Time Line Indicator
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


// ✨ COMPACT TASK CARD
function TaskCard({ task, onToggle, onSubToggle, onSubProgress, onDelete, onEdit }: any) {
    const [expanded, setExpanded] = useState(false);

    // Dynamic Border Color
    const getPriorityColor = (p: string) => {
        if (p === 'HIGH') return 'border-l-destructive/60 hover:border-l-destructive';
        if (p === 'MEDIUM') return 'border-l-orange-500/60 hover:border-l-orange-500';
        if (p === 'HABIT') return 'border-l-violet-500/60 hover:border-l-violet-500';
        return 'border-l-primary/30 hover:border-l-primary';
    };

    // Semantic Badge Styles
    const getBadgeStyle = (p: string) => {
        if (p === 'HIGH') return 'bg-destructive/15 text-destructive border-destructive/20';
        if (p === 'MEDIUM') return 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20';
        if (p === 'HABIT') return 'bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/20';
        return 'bg-secondary text-secondary-foreground border-border';
    };

    return (
        <Card className={`group relative overflow-hidden transition-all duration-300 border-l-[3px] shadow-sm hover:shadow-md ${task.isCompleted ? 'opacity-60 bg-muted/40' : 'bg-card'} ${getPriorityColor(task.priority)}`}>
            {/* 👇 CHANGED: Reduced padding from p-4 to p-3 */}
            <CardContent className="p-3">
                <div className="flex items-start gap-3">
                    {/* Checkbox */}
                    <div className="pt-0.5">
                        <Checkbox 
                            checked={task.isCompleted} 
                            onCheckedChange={() => onToggle(task.id, task.isCompleted)}
                            className="w-4 h-4 transition-transform active:scale-95 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                    </div>
                    
                    <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-start">
                            <div className="space-y-0.5"> {/* 👇 Tighter vertical spacing */}
                                <h3 className={`font-semibold text-sm leading-tight transition-all ${task.isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                                    {task.title}
                                </h3>
                                
                                <div className="flex flex-wrap items-center gap-1.5">
                                    {task.startTime && (
                                        <div className="flex items-center text-[10px] font-medium text-muted-foreground bg-secondary/50 px-1.5 py-0.5 rounded-md">
                                            <Clock className="w-2.5 h-2.5 mr-1 opacity-70" />
                                            {format(new Date(task.startTime), "h:mm a")}
                                        </div>
                                    )}
                                    {/* 👇 Smaller Badge Padding */}
                                    <span className={`text-[9px] px-1.5 py-0 rounded border font-semibold tracking-wide uppercase ${getBadgeStyle(task.priority)}`}>
                                        {task.priority}
                                    </span>
                                </div>
                            </div>
                            
                            {/* Hover Actions - More compact buttons */}
                            <div className={`flex items-center gap-0.5 transition-opacity duration-200 ${expanded ? 'opacity-100' : 'opacity-100 md:opacity-0 md:group-hover:opacity-100'}`}>
                                <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors" onClick={() => onEdit(task)}>
                                    <Edit2 className="w-3 h-3"/>
                                </Button>
                                <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors" onClick={() => onDelete(task.id)}>
                                    <Trash2 className="w-3 h-3"/>
                                </Button>
                                {(task.description || task.subtasks.length > 0) && (
                                    <Button variant="ghost" size="icon" className={`h-6 w-6 text-muted-foreground transition-transform duration-200 ${expanded ? 'rotate-180 bg-secondary' : ''}`} onClick={() => setExpanded(!expanded)}>
                                        <ChevronDown className="w-3.5 h-3.5" />
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Expandable Content */}
                        {expanded && (
                            <div className="pt-2 mt-2 border-t border-border/40 animate-in slide-in-from-top-1">
                                {task.description && (
                                    <p className="text-xs text-muted-foreground mb-2 leading-relaxed bg-secondary/20 p-2 rounded-md">
                                        {task.description}
                                    </p>
                                )}
                                
                                {task.subtasks.length > 0 && (
                                    <div className="space-y-2 pl-2 border-l-2 border-border/60">
                                        {task.subtasks.map((st: any) => (
                                            <div key={st.id} className="flex items-center gap-2 text-xs group/sub">
                                                <Checkbox 
                                                    className="w-3.5 h-3.5"
                                                    checked={st.isCompleted}
                                                    onCheckedChange={() => onSubToggle(task.id, st.id, st.isCompleted)}
                                                />
                                                <span className={`transition-all ${st.isCompleted ? "line-through opacity-50 text-muted-foreground" : "text-foreground"}`}>
                                                    {st.title}
                                                </span>
                                                
                                                {st.targetValue ? (
                                                    <div className="ml-auto flex items-center gap-1 bg-background border rounded px-1.5 py-0 shadow-sm" onClick={e => e.stopPropagation()}>
                                                        <input 
                                                            type="number"
                                                            // 👇 UPDATED: Increased width (w-12), height (h-6), and text size (text-xs)
                                                            className="w-12 h-6 text-xs text-center bg-transparent border border-border/50 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none font-mono transition-all"
                                                            value={st.currentValue || 0}
                                                            onChange={(e) => {
                                                                const val = parseInt(e.target.value);
                                                                if (!isNaN(val)) onSubProgress(task.id, st.id, val);
                                                            }}
                                                            onClick={e => e.stopPropagation()} // Prevent card collapse when clicking input
                                                        />
                                                        <span className="text-xs text-muted-foreground border-l pl-1 font-medium">
                                                            / {st.targetValue} {st.unit}
                                                        </span>
                                                    </div>
                                                ) : null}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}