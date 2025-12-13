// "use client";

// import { useState, useEffect, useRef } from "react";
// import { format } from "date-fns";
// import { 
//   Plus, Check, Calendar as CalendarIcon, Clock, AlertCircle, 
//   Repeat, ChevronDown, ChevronUp, Trash2, Edit2 
// } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Checkbox } from "@/components/ui/checkbox";
// import {DNALoader} from "@/components/dna-loader"; // Adjusted import to default
// import { Badge } from "@/components/ui/badge";

// export default function TasksPage() {
//   const [tasks, setTasks] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedDate, setSelectedDate] = useState(new Date());
  
//   // Modal State
//   const [isAdding, setIsAdding] = useState(false);
//   const [editingId, setEditingId] = useState<string | null>(null); // 👈 Track if editing

//   const [newTask, setNewTask] = useState({
//     title: "", description: "", priority: "LOW", 
//     isRecurring: false, startTime: "", subtasks: [] as any[]
//   });
//   const [newSubtask, setNewSubtask] = useState({ title: "", targetValue: "", unit: "" });

//   // 👇 Add this Ref to track the last date we fetched
//   const lastFetchedDate = useRef<string | null>(null);

//   useEffect(() => {
//     const dateStr = selectedDate.toISOString();

//     // If we already fetched for this date, stop!
//     if (lastFetchedDate.current === dateStr) return;

//     lastFetchedDate.current = dateStr; // Mark as fetched
//     fetchTasks();
//   }, [selectedDate]);

//   async function fetchTasks() {
//     setLoading(true);
//     try {
//         const res = await fetch(`/api/tasks?date=${selectedDate.toISOString()}`);
//         const data = await res.json();
//         if (data.success) setTasks(data.tasks);
//     } catch (e) { console.error(e); }
//     finally { setLoading(false); }
//   }

//   async function handleCreateTask() {
//     const res = await fetch("/api/tasks", {
//         method: "POST",
//         body: JSON.stringify({
//             ...newTask,
//             date: selectedDate,
//             startTime: newTask.startTime ? new Date(`${selectedDate.toDateString()} ${newTask.startTime}`) : null
//         })
//     });
//     const data = await res.json();
//     if (data.success) {
//         setIsAdding(false);
//         setNewTask({ title: "", description: "", priority: "LOW", isRecurring: false, startTime: "", subtasks: [] });
//         fetchTasks();
//     } else {
//         alert(data.error); 
//     }
//   }

// // 👇 1. Fix openEditModal to correctly set the ID and Mode
//   function openEditModal(task: any) {
//       setEditingId(task.id); // Set the ID so we know it's an Edit
//       setNewTask({
//           title: task.title,
//           description: task.description || "",
//           priority: task.priority,
//           isRecurring: task.priority === "HABIT" || task.isRecurring, 
//           startTime: task.startTime ? format(new Date(task.startTime), "HH:mm") : "",
//           // 👇 FIX: Load existing subtasks into the modal so we can see/edit them
//           subtasks: task.subtasks || []
//       });
//       setIsAdding(true); // Open Modal
//   }

// async function handleSaveTask() {
//     // 1. Logic to force priority change if "Recurring" is unchecked
//     let finalPriority = newTask.priority;
//     if (!newTask.isRecurring && newTask.priority === "HABIT") {
//         finalPriority = "LOW"; 
//     } else if (newTask.isRecurring) {
//         finalPriority = "HABIT";
//     }

//     // 2. Identify NEW subtasks (the ones you just added in the modal)
//     // Existing subtasks have an 'id'. New ones do not.
//     const newSubtasksToAdd = newTask.subtasks.filter((st: any) => !st.id);

//     const payload = {
//         title: newTask.title,
//         description: newTask.description,
//         priority: finalPriority,
//         isRecurring: newTask.isRecurring,
//         date: selectedDate,
//         startTime: newTask.startTime ? new Date(`${selectedDate.toDateString()} ${newTask.startTime}`) : null,
        
//         // 👇 FIX: Send the list of NEW subtasks to the backend
//         newSubtasks: newSubtasksToAdd,
        
//         // For 'Create' mode, we still send all subtasks as usual
//         subtasks: newTask.subtasks 
//     };

//     let res;
//     if (editingId) {
//         // UPDATE
//         res = await fetch("/api/tasks", {
//             method: "PATCH",
//             body: JSON.stringify({ taskId: editingId, ...payload })
//         });
//     } else {
//         // CREATE
//         res = await fetch("/api/tasks", {
//             method: "POST",
//             body: JSON.stringify(payload)
//         });
//     }

//     const data = await res.json();
//     if (data.success) {
//         setIsAdding(false);
//         resetForm();
//         fetchTasks();
//     } else {
//         alert(data.error || "Operation failed"); 
//     }
//   }

// // 👇 3. Ensure resetForm clears the editingId
//   function resetForm() {
//       setNewTask({ 
//           title: "", 
//           description: "", 
//           priority: "LOW", 
//           isRecurring: false, 
//           startTime: "", 
//           subtasks: [] 
//       });
//       setNewSubtask({ title: "", targetValue: "", unit: "" });
//       setEditingId(null); // Critical: Reset to "Create Mode"
//   }

//   async function toggleTask(id: string, currentStatus: boolean) {
//     // Optimistic Update
//     setTasks(prev => prev.map(t => t.id === id ? { ...t, isCompleted: !currentStatus } : t));
//     await fetch("/api/tasks", { 
//         method: "PATCH", 
//         body: JSON.stringify({ taskId: id, isCompleted: !currentStatus }) 
//     });
//   }

//   // 👇 NEW: Handle Subtask Ticking
//   async function toggleSubtask(taskId: string, subtaskId: string, currentStatus: boolean) {
//      // Optimistic Update for Subtasks
//      setTasks(prev => prev.map(t => {
//          if (t.id !== taskId) return t;
//          return {
//              ...t,
//              subtasks: t.subtasks.map((st: any) => 
//                  st.id === subtaskId ? { ...st, isCompleted: !currentStatus } : st
//              )
//          };
//      }));

//           await fetch("/api/tasks", { 
//         method: "PATCH", 
//         body: JSON.stringify({ 
//             taskId, // Still needed for auth context usually, but API handles logic
//             subtaskId, 
//             isCompleted: !currentStatus 
//         }) 
//     });
//   }

// // 👇 NEW: Handle Progress Update (e.g. 5/10 reps)
//   async function updateSubtaskProgress(taskId: string, subtaskId: string, newValue: number) {
//      // Optimistic Update
//      setTasks(prev => prev.map(t => {
//          if (t.id !== taskId) return t;
//          return {
//              ...t,
//              subtasks: t.subtasks.map((st: any) => 
//                  st.id === subtaskId ? { ...st, currentValue: newValue } : st
//              )
//          };
//      }));

//      // Send to API
//      await fetch("/api/tasks", { 
//         method: "PATCH", 
//         body: JSON.stringify({ taskId, subtaskId, subtaskValue: newValue }) 
//     });
//   }



//   async function handleDeleteTask(taskId: string) {
//     if (!confirm("Are you sure you want to delete this task?")) return;

//     // Optimistic Update (Remove from UI immediately)
//     setTasks(prev => prev.filter(t => t.id !== taskId));

//     try {
//         const res = await fetch(`/api/tasks?id=${taskId}`, { method: "DELETE" });
//         const data = await res.json();
        
//         if (!data.success) {
//             // Revert if failed
//             alert("Failed to delete task.");
//             fetchTasks(); 
//         }
//     } catch (e) {
//         console.error("Delete error", e);
//     }
//   }

//   return (
// <div className="min-h-screen bg-background p-4 md:p-8 font-sans text-foreground pb-24">
//       <div className="max-w-3xl mx-auto space-y-6">
        
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//             <div>
//                 <h1 className="text-3xl font-bold flex items-center gap-2">
//                    <Check className="w-8 h-8 text-primary" /> My Schedule
//                 </h1>
//                 <p className="text-muted-foreground">{format(selectedDate, "EEEE, MMMM do")}</p>
//             </div>
            
//             <Dialog open={isAdding} onOpenChange={(open) => {
//                 setIsAdding(open);
//                 if (!open) resetForm();
//             }}>
//                 <DialogTrigger asChild>
//                     <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
//                         <Plus className="w-4 h-4" /> Add Task
//                     </Button>
//                 </DialogTrigger>
//                 <DialogContent className="max-w-lg bg-card border-border">
//                     <DialogHeader>
//                         <DialogTitle>{editingId ? "Edit Task" : "Create New Task"}</DialogTitle>
//                     </DialogHeader>
                    
//                     <div className="space-y-4 py-4">
//                         <div className="grid gap-2">
//                             <label className="text-sm font-medium">Title</label>
//                             <Input 
//                                 value={newTask.title} 
//                                 onChange={e => setNewTask({...newTask, title: e.target.value})}
//                             />
//                         </div>
                        
//                         <div className="grid grid-cols-2 gap-4">
//                             <div className="grid gap-2">
//                                 <label className="text-sm font-medium">Priority</label>
//                                 <Select 
//                                     // If currently HABIT, show nothing or allow user to pick new
//                                     value={newTask.priority === "HABIT" ? undefined : newTask.priority} 
//                                     onValueChange={v => setNewTask({...newTask, priority: v})}
//                                     disabled={newTask.isRecurring} 
//                                 >
//                                     <SelectTrigger><SelectValue placeholder="Select Priority" /></SelectTrigger>
//                                     <SelectContent>
//                                         <SelectItem value="HIGH">High (Max 3)</SelectItem>
//                                         <SelectItem value="MEDIUM">Medium (Max 5)</SelectItem>
//                                         <SelectItem value="LOW">Low</SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                             </div>
//                             <div className="grid gap-2">
//                                 <label className="text-sm font-medium">Time</label>
//                                 <Input 
//                                     type="time" 
//                                     value={newTask.startTime} 
//                                     onChange={e => setNewTask({...newTask, startTime: e.target.value})} 
//                                 />
//                             </div>
//                         </div>

//                         {/* Always show Recurring checkbox now, so they can toggle it off */}
//                         <div className="flex items-center space-x-2 border p-3 rounded-md">
//                             <Checkbox 
//                                 id="recurring" 
//                                 checked={newTask.isRecurring}
//                                 onCheckedChange={(c) => setNewTask({...newTask, isRecurring: !!c})}
//                             />
//                             <label htmlFor="recurring" className="text-sm font-medium leading-none cursor-pointer">
//                                 Mark as Daily Habit
//                                 <p className="text-xs text-muted-foreground font-normal mt-1">
//                                     Repeats every day automatically.
//                                 </p>
//                             </label>
//                         </div>

//                         <div className="grid gap-2">
//                             <label className="text-sm font-medium">Description</label>
//                             <Textarea 
//                                 value={newTask.description} 
//                                 onChange={e => setNewTask({...newTask, description: e.target.value})}
//                             />
//                         </div>

//                         {/* 👇 RESTORED: Subtask Editor in Modal */}
//                         <div className="bg-secondary/20 p-3 rounded-md space-y-3">
//                             <label className="text-sm font-medium flex items-center gap-2">
//                                 <div className="h-1 w-1 bg-primary rounded-full"/> Subtasks / Checklist
//                             </label>
//                             <div className="flex gap-2">
//                                 <Input 
//                                     placeholder="Name (e.g. Pushups)" className="h-8 text-sm"
//                                     value={newSubtask.title}
//                                     onChange={e => setNewSubtask({...newSubtask, title: e.target.value})}
//                                 />
//                                 <Input 
//                                     placeholder="Target" className="h-8 w-20 text-sm"
//                                     type="number"
//                                     value={newSubtask.targetValue}
//                                     onChange={e => setNewSubtask({...newSubtask, targetValue: e.target.value})}
//                                 />
//                                 <Button size="sm" onClick={() => {
//                                     if(!newSubtask.title) return;
//                                     setNewTask({ ...newTask, subtasks: [...newTask.subtasks, { ...newSubtask }] });
//                                     setNewSubtask({ title: "", targetValue: "", unit: "" });
//                                 }}>Add</Button>
//                             </div>
//                             {newTask.subtasks.length > 0 && (
//                                 <div className="space-y-1">
//                                     {newTask.subtasks.map((st, i) => (
//                                         <div key={i} className="text-xs flex justify-between bg-background p-2 rounded border">
//                                             <span>{st.title}</span>
//                                             {st.targetValue && <span className="text-muted-foreground">Target: {st.targetValue}</span>}
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>

//                         {/* 👇 CRITICAL FIX: Calls handleSaveTask, NOT handleCreateTask */}
//                         <Button className="w-full" onClick={handleSaveTask}>
//                             {editingId ? "Save Changes" : "Create Task"}
//                         </Button>
//                     </div>
//                 </DialogContent>
//             </Dialog>
//         </div>

//         {/* TASK LIST */}
//         {loading ? <DNALoader /> : (
//             <div className="space-y-4">
                
//                 {/* HABITS SECTION */}
//                 {tasks.some(t => t.priority === "HABIT") && (
//                     <div className="space-y-2">
//                         <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Daily Habits</h2>
//                         {tasks.filter(t => t.priority === "HABIT").map(task => (
//                             <TaskCard key={task.id} task={task} onToggle={toggleTask} onSubToggle={toggleSubtask}  onDelete={handleDeleteTask} onEdit={openEditModal} onSubProgress={updateSubtaskProgress}/>
//                         ))}
//                     </div>
//                 )}

//                 {/* SCHEDULE SECTION */}
//                 <div className="space-y-2">
//                      <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Tasks & Schedule</h2>
//                      {tasks.filter(t => t.priority !== "HABIT").length === 0 && (
//                          <div className="text-center py-10 text-muted-foreground text-sm border-dashed border rounded-xl">
//                              No tasks scheduled for today.
//                          </div>
//                      )}
//                      {tasks.filter(t => t.priority !== "HABIT").map(task => (
//                             <TaskCard key={task.id} task={task} onToggle={toggleTask} onSubToggle={toggleSubtask} onDelete={handleDeleteTask} onEdit={openEditModal} onSubProgress={updateSubtaskProgress}/>
//                      ))}
//                 </div>

//             </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function TaskCard({ task, onToggle, onSubToggle, onSubProgress, onDelete, onEdit }: any) {
//     const [expanded, setExpanded] = useState(false);

//     return (
//         <Card className={`transition-all ${task.isCompleted ? 'opacity-60 bg-muted/30' : 'bg-card'}`}>
//             <CardContent className="p-4">
//                 <div className="flex items-start gap-3">
//                     <Checkbox 
//                         checked={task.isCompleted} 
//                         onCheckedChange={() => onToggle(task.id, task.isCompleted)}
//                         className="mt-1 w-5 h-5 rounded-full"
//                     />
                    
//                     <div className="flex-1 space-y-1">
//                         <div className="flex justify-between items-start">
//                             <div>
//                                 <h3 className={`font-semibold ${task.isCompleted ? 'line-through text-muted-foreground' : ''}`}>
//                                     {task.title}
//                                 </h3>
//                                 <div className="flex items-center gap-2 mt-1">
//                                     {task.startTime && (
//                                         <div className="flex items-center text-xs text-muted-foreground">
//                                             <Clock className="w-3 h-3 mr-1" />
//                                             {format(new Date(task.startTime), "h:mm a")}
//                                         </div>
//                                     )}
//                                     <span className={`text-[10px] px-2 rounded-full border ${
//                                         task.priority === 'HIGH' ? 'bg-red-50 text-red-600 border-red-200' : 
//                                         task.priority === 'MEDIUM' ? 'bg-orange-50 text-orange-600 border-orange-200' :
//                                         task.priority === 'HABIT' ? 'bg-purple-50 text-purple-600 border-purple-200' :
//                                         'bg-blue-50 text-blue-600 border-blue-200'
//                                     }`}>
//                                         {task.priority}
//                                     </span>
//                                 </div>
//                             </div>
                            
//                             <div className="flex items-center gap-1">
//                                 {/* Edit Button */}
//                                 <Button 
//                                     variant="ghost" 
//                                     size="icon" 
//                                     className="h-6 w-6 text-muted-foreground hover:text-blue-600 hover:bg-blue-50" 
//                                     onClick={() => onEdit(task)}
//                                 >
//                                     <Edit2 className="w-3 h-3" />
//                                 </Button>

//                                 {/* Delete Button */}
//                                 <Button 
//                                     variant="ghost" 
//                                     size="icon" 
//                                     className="h-6 w-6 text-muted-foreground hover:text-red-600 hover:bg-red-50" 
//                                     onClick={() => onDelete(task.id)}
//                                 >
//                                     <Trash2 className="w-3 h-3" />
//                                 </Button>

//                                 {/* Expand Button */}
//                                 {(task.description || task.subtasks.length > 0) && (
//                                     <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground" onClick={() => setExpanded(!expanded)}>
//                                         {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
//                                     </Button>
//                                 )}
//                             </div>
//                         </div>

//                         {/* EXPANDABLE CONTENT */}
//                         {expanded && (
//                             <div className="pt-3 border-t mt-3 animate-in slide-in-from-top-2">
//                                 {task.description && (
//                                     <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
//                                 )}
                                
//                                 {task.subtasks.length > 0 && (
//                                     <div className="space-y-2 bg-secondary/10 p-2 rounded-lg">
//                                         {task.subtasks.map((st: any) => (
//                                             <div key={st.id} className="flex items-center gap-2 text-sm">
//                                                 {/* 👇 FIXED: Subtask Checkbox now works! */}
//                                                 <Checkbox 
//                                                     checked={st.isCompleted}
//                                                     onCheckedChange={() => onSubToggle(task.id, st.id, st.isCompleted)}
//                                                 />
//                                                 <span className={st.isCompleted ? "line-through opacity-50 transition-all" : "transition-all"}>{st.title}</span>
//                                                 {/* 👇 FIXED: Editable Input for Progress */}
//                                                 {st.targetValue ? (
//                                                     <div className="ml-auto flex items-center gap-1" onClick={e => e.stopPropagation()}>
//                                                         <input 
//                                                             type="number"
//                                                             className="w-12 h-6 text-xs border rounded px-1 text-center bg-background focus:ring-1 focus:ring-primary outline-none"
//                                                             value={st.currentValue || 0}
//                                                             onChange={(e) => {
//                                                                 const val = parseInt(e.target.value);
//                                                                 if (!isNaN(val)) onSubProgress(task.id, st.id, val);
//                                                             }}
//                                                         />
//                                                         <span className="text-xs text-muted-foreground">/ {st.targetValue} {st.unit}</span>
//                                                     </div>
//                                                 ) : null}
//                                             </div>
//                                         ))}
//                                     </div>
//                                 )}
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </CardContent>
//         </Card>
//     );
// }


// ##### UI Imporved Code #### Above is Functionaly working code 

"use client";

import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { 
  Plus, Check, Calendar as CalendarIcon, Clock, AlertCircle, 
  Repeat, ChevronDown, ChevronUp, Trash2, Edit2, Layers, Sparkles 
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

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Modal State
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // 👇 UPDATED STATE: Added 'date' field
  const [newTask, setNewTask] = useState({
    title: "", 
    description: "", 
    priority: "LOW", 
    isRecurring: false, 
    date: format(new Date(), "yyyy-MM-dd"), // Default to Today
    startTime: "", 
    subtasks: [] as any[]
  });

  const [newSubtask, setNewSubtask] = useState({ title: "", targetValue: "", unit: "" });

  const lastFetchedDate = useRef<string | null>(null);

  useEffect(() => {
    const dateStr = selectedDate.toISOString();
    if (lastFetchedDate.current === dateStr) return;
    lastFetchedDate.current = dateStr;
    fetchTasks();
  }, [selectedDate]);

  async function fetchTasks() {
    setLoading(true);
    try {
        const res = await fetch(`/api/tasks?date=${selectedDate.toISOString()}`, { cache: 'no-store' });
        const data = await res.json();
        if (data.success) setTasks(data.tasks);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }

  // 👇 UPDATED: Load the task's specific date into the input
  function openEditModal(task: any) {
      setEditingId(task.id);
      setNewTask({
          title: task.title,
          description: task.description || "",
          priority: task.priority,
          isRecurring: task.priority === "HABIT" || task.isRecurring, 
          // Format date for the input (YYYY-MM-DD)
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
    // 👇 UPDATED: Use the specific date from the modal input
    // We combine the Date Input (YYYY-MM-DD) with the Start Time Input (HH:mm)
    // to create a proper Date object for the backend.
    const targetDateObj = new Date(newTask.date); 
    const startTimeObj = newTask.startTime 
        ? new Date(`${newTask.date}T${newTask.startTime}`) 
        : null;

    const payload = {
        title: newTask.title,
        description: newTask.description,
        priority: finalPriority,
        isRecurring: newTask.isRecurring,
        
        date: targetDateObj, // Send the chosen date
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
        fetchTasks(); // Refresh list to show changes
    } else {
        alert(data.error || "Operation failed"); 
    }
  }

// 👇 UPDATED: Reset form to use the currently Viewed Date
  function resetForm() {
      setNewTask({ 
          title: "", 
          description: "", 
          priority: "LOW", 
          isRecurring: false, 
          date: format(selectedDate, "yyyy-MM-dd"), // Default to the date you are viewing
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
    <div className="min-h-screen bg-background p-4 md:p-8 font-sans text-foreground pb-32">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-border/40 pb-6">
            <div className="space-y-1">
                <h1 className="text-3xl md:text-4xl font-extrabold flex items-center gap-3 tracking-tight text-foreground">
                   <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <Check className="w-8 h-8" /> 
                   </div>
                   My Schedule
                </h1>
                <p className="text-muted-foreground text-lg pl-1 font-medium">
                    {format(selectedDate, "EEEE, MMMM do")}
                </p>
            </div>
            
            <Dialog open={isAdding} onOpenChange={(open) => {
                setIsAdding(open);
                if (!open) resetForm();
            }}>
                <DialogTrigger asChild>
                    <Button size="lg" className="gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                        <Plus className="w-5 h-5" /> New Task
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg bg-card border-border sm:rounded-xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold flex items-center gap-2">
                            {editingId ? <Edit2 className="w-5 h-5 text-primary"/> : <Sparkles className="w-5 h-5 text-primary"/>}
                            {editingId ? "Edit Task" : "Create New Task"}
                        </DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-5 py-2">
                        <div className="grid gap-2">
                            <label className="text-sm font-semibold text-foreground/80">Title</label>
                            <Input 
                                className="bg-secondary/30 border-transparent focus:border-primary focus:bg-background transition-all"
                                placeholder="What needs to be done?"
                                value={newTask.title} 
                                onChange={e => setNewTask({...newTask, title: e.target.value})}
                            />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <label className="text-sm font-semibold text-foreground/80">Priority</label>
                                <Select 
                                    value={newTask.priority === "HABIT" && !newTask.isRecurring ? "LOW" : newTask.priority} 
                                    onValueChange={v => setNewTask({...newTask, priority: v})}
                                    disabled={newTask.isRecurring} 
                                >
                                    <SelectTrigger className="bg-secondary/30 border-transparent"><SelectValue placeholder="Select" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="HIGH">High (Max 3)</SelectItem>
                                        <SelectItem value="MEDIUM">Medium (Max 5)</SelectItem>
                                        <SelectItem value="LOW">Low</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <label className="text-sm font-semibold text-foreground/80">Date</label>
                                    <Input 
                                        className="bg-secondary/30 border-transparent focus:border-primary focus:bg-background transition-all"
                                        type="date" 
                                        value={newTask.date} 
                                        onChange={e => setNewTask({...newTask, date: e.target.value})} 
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <label className="text-sm font-semibold text-foreground/80">Time</label>
                                    <Input 
                                        className="bg-secondary/30 border-transparent focus:border-primary focus:bg-background transition-all"
                                        type="time" 
                                        value={newTask.startTime} 
                                        onChange={e => setNewTask({...newTask, startTime: e.target.value})} 
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start space-x-3 border border-border/50 bg-card p-4 rounded-lg shadow-sm">
                            <Checkbox 
                                id="recurring" 
                                className="mt-1"
                                checked={newTask.isRecurring}
                                onCheckedChange={(c) => setNewTask({...newTask, isRecurring: !!c})}
                            />
                            <div className="grid gap-1.5 leading-none">
                                <label htmlFor="recurring" className="text-sm font-medium leading-none cursor-pointer">
                                    Mark as Daily Habit
                                </label>
                                <p className="text-xs text-muted-foreground">
                                    This task will repeat every day automatically.
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <label className="text-sm font-semibold text-foreground/80">Description</label>
                            <Textarea 
                                className="bg-secondary/30 border-transparent focus:border-primary focus:bg-background transition-all resize-none min-h-[80px]"
                                placeholder="Add details..."
                                value={newTask.description} 
                                onChange={e => setNewTask({...newTask, description: e.target.value})}
                            />
                        </div>

                        <div className="bg-secondary/20 p-4 rounded-lg space-y-4 border border-border/50">
                            <label className="text-sm font-semibold flex items-center gap-2 text-foreground/80">
                                <Layers className="w-4 h-4 text-primary" /> Subtasks
                            </label>
                            <div className="flex gap-2">
                                <Input 
                                    placeholder="Name (e.g. Pushups)" className="h-9 text-sm bg-background"
                                    value={newSubtask.title}
                                    onChange={e => setNewSubtask({...newSubtask, title: e.target.value})}
                                />
                                <Input 
                                    placeholder="Target" className="h-9 w-24 text-sm bg-background"
                                    type="number"
                                    value={newSubtask.targetValue}
                                    onChange={e => setNewSubtask({...newSubtask, targetValue: e.target.value})}
                                />
                                <Button size="sm" onClick={() => {
                                    if(!newSubtask.title) return;
                                    setNewTask({ ...newTask, subtasks: [...newTask.subtasks, { ...newSubtask }] });
                                    setNewSubtask({ title: "", targetValue: "", unit: "" });
                                }}>Add</Button>
                            </div>
                            
                            {newTask.subtasks.length > 0 && (
                                <div className="space-y-2 mt-2">
                                    {newTask.subtasks.map((st, i) => (
                                        <div key={i} className="text-xs flex justify-between items-center bg-background p-2 px-3 rounded-md border shadow-sm animate-in slide-in-from-left-2">
                                            <span className="font-medium truncate max-w-[70%]">{st.title}</span>
                                            {st.targetValue && <Badge variant="secondary" className="text-[10px] h-5">Target: {st.targetValue}</Badge>}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Button className="w-full text-base font-semibold py-5" onClick={handleSaveTask}>
                            {editingId ? "Save Changes" : "Create Task"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>

        {/* LOADING STATE */}
        {loading ? <DNALoader /> : (
            <div className="space-y-10 animate-in fade-in duration-500">
                
                {/* HABITS SECTION */}
                {tasks.some(t => t.priority === "HABIT") && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-border/40">
                            <div className="h-2 w-2 rounded-full bg-violet-500" />
                            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Daily Habits</h2>
                        </div>
                        <div className="grid gap-3">
                            {tasks.filter(t => t.priority === "HABIT").map(task => (
                                <TaskCard 
                                    key={task.id} task={task} 
                                    onToggle={toggleTask} 
                                    onSubToggle={toggleSubtask} 
                                    onSubProgress={updateSubtaskProgress}
                                    onDelete={handleDeleteTask} onEdit={openEditModal} 
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* SCHEDULE SECTION */}
                <div className="space-y-4">
                     <div className="flex items-center gap-2 pb-2 border-b border-border/40">
                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                        <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Today's Schedule</h2>
                     </div>
                     
                     {tasks.filter(t => t.priority !== "HABIT").length === 0 && (
                         <div className="flex flex-col items-center justify-center py-16 text-muted-foreground/60 border-2 border-dashed border-border/60 rounded-xl bg-card/30">
                             <CalendarIcon className="w-12 h-12 mb-3 opacity-20" />
                             <p className="text-sm font-medium">No tasks scheduled for today.</p>
                         </div>
                     )}
                     
                     <div className="grid gap-3">
                        {tasks.filter(t => t.priority !== "HABIT").map(task => (
                                <TaskCard 
                                    key={task.id} task={task} 
                                    onToggle={toggleTask} 
                                    onSubToggle={toggleSubtask} 
                                    onSubProgress={updateSubtaskProgress}
                                    onDelete={handleDeleteTask} onEdit={openEditModal} 
                                />
                        ))}
                     </div>
                </div>
            </div>
        )}
      </div>
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