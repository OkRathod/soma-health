"use client";

import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { 
  Plus, Check, Calendar as CalendarIcon, Clock, AlertCircle, 
  Repeat, ChevronDown, ChevronUp, Trash2, Edit2 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {DNALoader} from "@/components/dna-loader"; // Adjusted import to default
import { Badge } from "@/components/ui/badge";

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Modal State
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null); // 👈 Track if editing

  const [newTask, setNewTask] = useState({
    title: "", description: "", priority: "LOW", 
    isRecurring: false, startTime: "", subtasks: [] as any[]
  });
  const [newSubtask, setNewSubtask] = useState({ title: "", targetValue: "", unit: "" });

  // 👇 Add this Ref to track the last date we fetched
  const lastFetchedDate = useRef<string | null>(null);

  useEffect(() => {
    const dateStr = selectedDate.toISOString();

    // If we already fetched for this date, stop!
    if (lastFetchedDate.current === dateStr) return;

    lastFetchedDate.current = dateStr; // Mark as fetched
    fetchTasks();
  }, [selectedDate]);

  async function fetchTasks() {
    setLoading(true);
    try {
        const res = await fetch(`/api/tasks?date=${selectedDate.toISOString()}`);
        const data = await res.json();
        if (data.success) setTasks(data.tasks);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }

  async function handleCreateTask() {
    const res = await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify({
            ...newTask,
            date: selectedDate,
            startTime: newTask.startTime ? new Date(`${selectedDate.toDateString()} ${newTask.startTime}`) : null
        })
    });
    const data = await res.json();
    if (data.success) {
        setIsAdding(false);
        setNewTask({ title: "", description: "", priority: "LOW", isRecurring: false, startTime: "", subtasks: [] });
        fetchTasks();
    } else {
        alert(data.error); 
    }
  }

// 👇 1. Fix openEditModal to correctly set the ID and Mode
  function openEditModal(task: any) {
      setEditingId(task.id); // Set the ID so we know it's an Edit
      setNewTask({
          title: task.title,
          description: task.description || "",
          priority: task.priority,
          isRecurring: task.priority === "HABIT" || task.isRecurring, 
          startTime: task.startTime ? format(new Date(task.startTime), "HH:mm") : "",
          subtasks: [] // We don't support editing subtasks in the modal yet to keep it simple
      });
      setIsAdding(true); // Open Modal
  }

// 👇 FIXED: This function now handles the Logic Shift correctly
  async function handleSaveTask() {
    // Logic: If user Unchecks "Recurring", force priority out of "HABIT" mode
    // otherwise it stays stuck in the "Habits" UI section.
    let finalPriority = newTask.priority;
    if (!newTask.isRecurring && newTask.priority === "HABIT") {
        finalPriority = "LOW"; // Default to LOW if converting Habit -> Normal Task
    } else if (newTask.isRecurring) {
        finalPriority = "HABIT"; // Force HABIT if Recurring is checked
    }

    const payload = {
        title: newTask.title,
        description: newTask.description,
        priority: finalPriority, // Use calculated priority
        isRecurring: newTask.isRecurring,
        date: selectedDate,
        startTime: newTask.startTime ? new Date(`${selectedDate.toDateString()} ${newTask.startTime}`) : null,
        // Only include subtasks if it's a NEW task
        subtasks: editingId ? undefined : newTask.subtasks 
    };

    let res;
    if (editingId) {
        // UPDATE Existing
        res = await fetch("/api/tasks", {
            method: "PATCH",
            body: JSON.stringify({ taskId: editingId, ...payload })
        });
    } else {
        // CREATE New
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

// 👇 3. Ensure resetForm clears the editingId
  function resetForm() {
      setNewTask({ 
          title: "", 
          description: "", 
          priority: "LOW", 
          isRecurring: false, 
          startTime: "", 
          subtasks: [] 
      });
      setNewSubtask({ title: "", targetValue: "", unit: "" });
      setEditingId(null); // Critical: Reset to "Create Mode"
  }

  async function toggleTask(id: string, currentStatus: boolean) {
    // Optimistic Update
    setTasks(prev => prev.map(t => t.id === id ? { ...t, isCompleted: !currentStatus } : t));
    await fetch("/api/tasks", { 
        method: "PATCH", 
        body: JSON.stringify({ taskId: id, isCompleted: !currentStatus }) 
    });
  }

  // 👇 NEW: Handle Subtask Ticking
  async function toggleSubtask(taskId: string, subtaskId: string, currentStatus: boolean) {
     // Optimistic Update for Subtasks
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
        body: JSON.stringify({ 
            taskId, // Still needed for auth context usually, but API handles logic
            subtaskId, 
            isCompleted: !currentStatus 
        }) 
    });
  }

  async function handleDeleteTask(taskId: string) {
    if (!confirm("Are you sure you want to delete this task?")) return;

    // Optimistic Update (Remove from UI immediately)
    setTasks(prev => prev.filter(t => t.id !== taskId));

    try {
        const res = await fetch(`/api/tasks?id=${taskId}`, { method: "DELETE" });
        const data = await res.json();
        
        if (!data.success) {
            // Revert if failed
            alert("Failed to delete task.");
            fetchTasks(); 
        }
    } catch (e) {
        console.error("Delete error", e);
    }
  }

  return (
<div className="min-h-screen bg-background p-4 md:p-8 font-sans text-foreground pb-24">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold flex items-center gap-2">
                   <Check className="w-8 h-8 text-primary" /> My Schedule
                </h1>
                <p className="text-muted-foreground">{format(selectedDate, "EEEE, MMMM do")}</p>
            </div>
            
            <Dialog open={isAdding} onOpenChange={(open) => {
                setIsAdding(open);
                if (!open) resetForm();
            }}>
                <DialogTrigger asChild>
                    <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                        <Plus className="w-4 h-4" /> Add Task
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg bg-card border-border">
                    <DialogHeader>
                        <DialogTitle>{editingId ? "Edit Task" : "Create New Task"}</DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-4">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Title</label>
                            <Input 
                                value={newTask.title} 
                                onChange={e => setNewTask({...newTask, title: e.target.value})}
                            />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">Priority</label>
                                <Select 
                                    // If currently HABIT, show nothing or allow user to pick new
                                    value={newTask.priority === "HABIT" ? undefined : newTask.priority} 
                                    onValueChange={v => setNewTask({...newTask, priority: v})}
                                    disabled={newTask.isRecurring} 
                                >
                                    <SelectTrigger><SelectValue placeholder="Select Priority" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="HIGH">High (Max 3)</SelectItem>
                                        <SelectItem value="MEDIUM">Medium (Max 5)</SelectItem>
                                        <SelectItem value="LOW">Low</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">Time</label>
                                <Input 
                                    type="time" 
                                    value={newTask.startTime} 
                                    onChange={e => setNewTask({...newTask, startTime: e.target.value})} 
                                />
                            </div>
                        </div>

                        {/* Always show Recurring checkbox now, so they can toggle it off */}
                        <div className="flex items-center space-x-2 border p-3 rounded-md">
                            <Checkbox 
                                id="recurring" 
                                checked={newTask.isRecurring}
                                onCheckedChange={(c) => setNewTask({...newTask, isRecurring: !!c})}
                            />
                            <label htmlFor="recurring" className="text-sm font-medium leading-none cursor-pointer">
                                Mark as Daily Habit
                                <p className="text-xs text-muted-foreground font-normal mt-1">
                                    Repeats every day automatically.
                                </p>
                            </label>
                        </div>

                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Description</label>
                            <Textarea 
                                value={newTask.description} 
                                onChange={e => setNewTask({...newTask, description: e.target.value})}
                            />
                        </div>

                        {/* Only show Subtasks adder if creating NEW (simplified) */}
                        {!editingId && (
                            <div className="bg-secondary/20 p-3 rounded-md space-y-3">
                                {/* ... Subtask Inputs ... */}
                                <label className="text-sm font-medium">Subtasks</label>
                                <div className="flex gap-2">
                                    <Input 
                                        placeholder="Name" className="h-8 text-sm"
                                        value={newSubtask.title}
                                        onChange={e => setNewSubtask({...newSubtask, title: e.target.value})}
                                    />
                                    <Button size="sm" onClick={() => {
                                        if(!newSubtask.title) return;
                                        setNewTask({ ...newTask, subtasks: [...newTask.subtasks, { ...newSubtask }] });
                                        setNewSubtask({ title: "", targetValue: "", unit: "" });
                                    }}>Add</Button>
                                </div>
                                {newTask.subtasks.map((st, i) => <div key={i} className="text-xs">{st.title}</div>)}
                            </div>
                        )}

                        {/* 👇 CRITICAL FIX: Calls handleSaveTask, NOT handleCreateTask */}
                        <Button className="w-full" onClick={handleSaveTask}>
                            {editingId ? "Save Changes" : "Create Task"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>

        {/* TASK LIST */}
        {loading ? <DNALoader /> : (
            <div className="space-y-4">
                
                {/* HABITS SECTION */}
                {tasks.some(t => t.priority === "HABIT") && (
                    <div className="space-y-2">
                        <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Daily Habits</h2>
                        {tasks.filter(t => t.priority === "HABIT").map(task => (
                            <TaskCard key={task.id} task={task} onToggle={toggleTask} onSubToggle={toggleSubtask} onDelete={handleDeleteTask} onEdit={openEditModal} />
                        ))}
                    </div>
                )}

                {/* SCHEDULE SECTION */}
                <div className="space-y-2">
                     <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Tasks & Schedule</h2>
                     {tasks.filter(t => t.priority !== "HABIT").length === 0 && (
                         <div className="text-center py-10 text-muted-foreground text-sm border-dashed border rounded-xl">
                             No tasks scheduled for today.
                         </div>
                     )}
                     {tasks.filter(t => t.priority !== "HABIT").map(task => (
                            <TaskCard key={task.id} task={task} onToggle={toggleTask} onSubToggle={toggleSubtask} onDelete={handleDeleteTask} onEdit={openEditModal} />
                     ))}
                </div>

            </div>
        )}
      </div>
    </div>
  );
}

function TaskCard({ task, onToggle, onSubToggle, onDelete, onEdit }: { task: any, onToggle: any, onSubToggle: any, onDelete: any, onEdit: any }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <Card className={`transition-all ${task.isCompleted ? 'opacity-60 bg-muted/30' : 'bg-card'}`}>
            <CardContent className="p-4">
                <div className="flex items-start gap-3">
                    <Checkbox 
                        checked={task.isCompleted} 
                        onCheckedChange={() => onToggle(task.id, task.isCompleted)}
                        className="mt-1 w-5 h-5 rounded-full"
                    />
                    
                    <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className={`font-semibold ${task.isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                                    {task.title}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                    {task.startTime && (
                                        <div className="flex items-center text-xs text-muted-foreground">
                                            <Clock className="w-3 h-3 mr-1" />
                                            {format(new Date(task.startTime), "h:mm a")}
                                        </div>
                                    )}
                                    <span className={`text-[10px] px-2 rounded-full border ${
                                        task.priority === 'HIGH' ? 'bg-red-50 text-red-600 border-red-200' : 
                                        task.priority === 'MEDIUM' ? 'bg-orange-50 text-orange-600 border-orange-200' :
                                        task.priority === 'HABIT' ? 'bg-purple-50 text-purple-600 border-purple-200' :
                                        'bg-blue-50 text-blue-600 border-blue-200'
                                    }`}>
                                        {task.priority}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-1">
                                {/* Edit Button */}
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-6 w-6 text-muted-foreground hover:text-blue-600 hover:bg-blue-50" 
                                    onClick={() => onEdit(task)}
                                >
                                    <Edit2 className="w-3 h-3" />
                                </Button>

                                {/* Delete Button */}
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-6 w-6 text-muted-foreground hover:text-red-600 hover:bg-red-50" 
                                    onClick={() => onDelete(task.id)}
                                >
                                    <Trash2 className="w-3 h-3" />
                                </Button>

                                {/* Expand Button */}
                                {(task.description || task.subtasks.length > 0) && (
                                    <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground" onClick={() => setExpanded(!expanded)}>
                                        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* EXPANDABLE CONTENT */}
                        {expanded && (
                            <div className="pt-3 border-t mt-3 animate-in slide-in-from-top-2">
                                {task.description && (
                                    <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                                )}
                                
                                {task.subtasks.length > 0 && (
                                    <div className="space-y-2 bg-secondary/10 p-2 rounded-lg">
                                        {task.subtasks.map((st: any) => (
                                            <div key={st.id} className="flex items-center gap-2 text-sm">
                                                {/* 👇 FIXED: Subtask Checkbox now works! */}
                                                <Checkbox 
                                                    checked={st.isCompleted}
                                                    onCheckedChange={() => onSubToggle(task.id, st.id, st.isCompleted)}
                                                />
                                                <span className={st.isCompleted ? "line-through opacity-50 transition-all" : "transition-all"}>{st.title}</span>
                                                {st.targetValue && (
                                                    <span className="ml-auto text-xs font-mono bg-background px-1 rounded border">
                                                        {st.currentValue || 0}/{st.targetValue} {st.unit}
                                                    </span>
                                                )}
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
    );
}