"use client";

import { useEffect, useState, useMemo} from "react";
import { useUser } from "@clerk/nextjs";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Calendar as CalendarIcon, Clock , Trash2, Check, AlertTriangle, X, Plus, PenLine, ChevronDown, LayoutGrid, List } from "lucide-react";
import { MessageSquare, Target, Utensils, Activity, Flame, ChevronRight } from "lucide-react";
import { DNALoader } from "@/components/dna-loader";
import { Button } from "@/components/ui/button"; // Import Button
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"; 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddLogDialog } from "@/components/history/add-log-dialog";
import { HistoryTaskList } from "@/components/history/history-task-list";
import { HistoryTimeline } from "@/components/history/history-timeline";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner"; // 👈 Add this
import { Footprints } from "lucide-react"; // 👈 Add Footprints
import { AddTaskDialog } from "@/components/tasks/add-task-dialog";
import { getDailySteps } from "@/app/actions/steps"; // 👈 Import the action we made earlier

export default function HistoryPage() {
  const { user, isLoaded } = useUser();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

// 👇 MODAL STATES
  const [simpleModal, setSimpleModal] = useState<{ title: string; msg: string; isError?: boolean } | null>(null);
  const [logToDelete, setLogToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  //   Track which tab is open so the button knows what to do
  const [activeTab, setActiveTab] = useState("diet");

  // Task specific states
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

// 👇 NEW: ADD LOG STATE
  const [isAdding, setIsAdding] = useState(false); 
  const [newLogText, setNewLogText] = useState("");
  const [isSavingLog, setIsSavingLog] = useState(false);
  
  // Inside HistoryPage component, near other state variables
  const [tasks, setTasks] = useState<any[]>([]); // 👈 NEW: Store history tasks
  const [newSubtask, setNewSubtask] = useState({ title: "", targetValue: "", unit: "" });
  const [dailySteps, setDailySteps] = useState(0);

  const [newTask, setNewTask] = useState({
      title: "", 
      description: "", 
      priority: "MEDIUM", 
      isRecurring: false, 
      date: format(new Date(), "yyyy-MM-dd"), // Default date
      startTime: "", 
      duration: "60", 
      subtasks: [] as any[] 
  });

  // 👇 1. New State for Layout Preference
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [isMounted, setIsMounted] = useState(false);

  // 👇 2. Load saved preference on mount
  useEffect(() => {
    const savedView = localStorage.getItem("dietViewMode");
    if (savedView === "grid" || savedView === "list") {
      setViewMode(savedView);
    }
    setIsMounted(true);
  }, []);

  // 👇 3. Handle saving the preference
  const handleViewChange = (mode: "list" | "grid") => {
    setViewMode(mode);
    localStorage.setItem("dietViewMode", mode);
  };


async function handleAddTask() {
  // Check against full object title
  if (!newTask.title.trim() || !date || !user) return;
  
  try {
    const res = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify({
        ...newTask, // Spread all fields (description, priority, etc.)
        userId: user.id,
        // Override date with the history page's selected date context
        date: format(date, "yyyy-MM-dd"), 
        isCompleted: false
      })
    });
    
    if (res.ok) {
        toast.success("Task added to history");
        // Reset form
        setNewTask({ 
            title: "", description: "", priority: "MEDIUM", isRecurring: false, 
            date: format(date, "yyyy-MM-dd"), startTime: "", duration: "60", subtasks: [] 
        });
        setIsAddingTask(false);
        fetchTasks(); 
    }
  } catch (e) {
    console.error(e);
  }
}
// 2. Delete a Task
async function confirmDeleteTask() {
    if (!taskToDelete) return;
    setIsDeleting(true);
    try {
        await fetch(`/api/tasks?taskId=${taskToDelete}`, { method: "DELETE" });
        setTasks(prev => prev.filter(t => t.id !== taskToDelete));
        toast.success("Task deleted");
    } catch (e) {
        toast.error("Could not delete task");
    } finally {
        setIsDeleting(false);
        setTaskToDelete(null);
    }
}

  const filteredHistoryTasks = useMemo(() => {
    if (!date) return [];
    const target = format(date, "yyyy-MM-dd");

    return tasks.filter(t =>
        format(new Date(t.date), "yyyy-MM-dd") === target
    );
    }, [tasks, date]);



  useEffect(() => {
      if (!isLoaded || !user) return;
      
      setLoading(true);
      // 👇 CHANGED: Fetch both in parallel
      Promise.all([fetchLogs(), fetchTasks()]).finally(() => setLoading(false));
  }, [isLoaded, user, date]); // Added 'date' to dependencies so it refetches on change

  // 👇 NEW: Helper function to fetch tasks
  async function fetchTasks() {
      try {
          if(!date) return;
          // Reusing your existing Tasks API!
          const res = await fetch(`/api/tasks?date=${format(date, "yyyy-MM-dd")}`);
          const data = await res.json();
          if (data.success) setTasks(data.tasks);
      } catch (e) { console.error("Failed to fetch tasks", e); }
  }

  // 👇 NEW: Handle toggling tasks from history
  async function toggleTaskHistory(taskId: string, currentStatus: boolean) {
    // 1. Optimistic Update (Update UI instantly)
    setTasks(prev => prev.map(t => 
        t.id === taskId ? { ...t, isCompleted: !currentStatus } : t
    ));

    // 2. Sync with Database
    try {
        await fetch("/api/tasks", { 
            method: "PATCH", 
            body: JSON.stringify({ taskId, isCompleted: !currentStatus }) 
        });
    } catch (e) {
        console.error("Failed to update task", e);
    }
  }

async function fetchLogs() {
    try {
      // 👇 FIX: Define a start date far in the past (e.g., Jan 1, 2024)
      // This ensures the API returns ALL your history, not just the last 14 days.
      const fromDate = new Date("2024-01-01").toISOString();
      const toDate = new Date().toISOString(); // Today

      // 👇 Pass 'from' and 'to' to bypass the "take: 14" limit on the server
      const res = await fetch(`/api/get-logs?userId=${user?.id}&from=${fromDate}&to=${toDate}`);
      
      const data = await res.json();
      if (data.success) {
        setLogs(data.logs);
      }
    } catch (error) {
      console.error("Failed to fetch logs");
    } finally {
      setLoading(false);
    }
  }

  // 👇 NEW: Helper to fetch steps
  async function fetchSteps() {
    if (!date) return;
    try {
        // We pass the specific date to your server action
        // Note: You might need to update getDailySteps to accept a date parameter if it doesn't already
        // If your getDailySteps only gets "today", you might need to tweak it or use an API route.
        // Assuming getDailySteps handles the date logic or we pass it:
        const res = await getDailySteps(date); 
        setDailySteps(res.steps);
    } catch (e) {
        console.error("Failed to fetch steps");
    }
  }

  useEffect(() => {
      if (!isLoaded || !user) return;
      
      setLoading(true);
      // 👇 CHANGED: Add fetchSteps to the parallel execution
      Promise.all([fetchLogs(), fetchTasks(), fetchSteps()]).finally(() => setLoading(false));
  }, [isLoaded, user, date]);

 

  // 👇 NEW COMPONENT: Handles Expand/Collapse Logic


  // 👇 NEW: HANDLE ADD LOG (BACKFILL)
  async function handleAddLog() {

    // 👇 ADD 'user' to this check
    if (!newLogText.trim() || !date || !user) {
        return;
    }
    
    setIsSavingLog(true);
    try {
        const res = await fetch("/api/process-log", { 
            method: "POST",
            body: JSON.stringify({
                userText: newLogText,
                userId: user.id,
                date: date.toISOString() // 👈 IMPORTANT: Sends the selected calendar date
            })
        });

        const data = await res.json();
        
        if (data.success) {
            toast.success("Entry added successfully!");
            setNewLogText("");
            setIsAdding(false);
            fetchLogs(); // 👈 Refresh list to show the new card immediately
        } else {
            toast.error(data.error || "Processing Failed", {
                description: data.details
            });
        }
    } catch (e) {
        toast.error("Connection Error"); // 👈 Changed
    } finally {
        setIsSavingLog(false);
    }
  }

  // 👇 1. OPEN CONFIRM MODAL
    function askToDelete(logId: string) {
      setLogToDelete(logId);
    }

  // 👇 2. CONFIRM DELETE
    async function confirmDelete() {
      if (!logToDelete) return;
      setIsDeleting(true);
      try {
        const res = await fetch(`/api/delete-log?id=${logToDelete}&userId=${user?.id}`, {
          method: "DELETE",
        });
        const data = await res.json();

        if (data.success) {
          setLogs((prev) => prev.filter((log) => log.id !== logToDelete));
          setLogToDelete(null);
          toast.success("Record removed successfully");
        } else {
          setLogToDelete(null);
          toast.error("Failed to delete log");
        }
      } catch (error) {
          setLogToDelete(null);
          setSimpleModal({ title: "Error", msg: "Server error.", isError: true });
      } finally {
        setIsDeleting(false);
      }
    }

  // 👇 3. MIDNIGHT FIX (Normalizes dates so blue dots show up)
    const daysWithHistory = logs.map(log => {
      const d = new Date(log.date);
      d.setHours(0, 0, 0, 0);
      return d;
    });

  // Filter logs for the selected date
  const filteredLogs = logs.filter((log) => {
    if (!date) return false;
    const logDate = new Date(log.date).toDateString();
    const selectedDate = date.toDateString();
    return logDate === selectedDate;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Sort Morning -> Night

if (!isLoaded || loading || !isMounted) return <DNALoader />;

  // Helper: Check if selected date is in the future
  const isFutureDate = date ? date > new Date() : false;

 return (
    <div className="min-h-screen bg-background p-6 md:p-10 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* 1. TOP HEADER - Clean & Unified */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-6">
           <div>
               <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                  History
               </h1>
               <p className="text-muted-foreground mt-1">Review your daily timeline.</p>
           </div>

           {/* 👇 UNIFIED DATE PICKER (Visible on ALL screens) */}
           <div className="flex items-center gap-3">
                {/* 👇 NEW: Steps Display Badge */}
                <div className="hidden sm:flex items-center gap-2 bg-orange-500/10 text-orange-600 px-3 py-2 rounded-md border border-orange-500/20">
                    <Footprints className="w-4 h-4" />
                    <span className="font-mono font-bold">{dailySteps.toLocaleString()}</span>
                    <span className="text-xs opacity-80">steps</span>
                </div>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[240px] justify-start text-left font-normal bg-card hover:bg-accent/50 border-border shadow-sm h-10",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                      <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 border-border shadow-xl" align="end">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      fromYear={2024} 
                      toYear={new Date().getFullYear() + 5}
                      modifiers={{ hasHistory: daysWithHistory }}
                      modifiersClassNames={{ hasHistory: "bg-primary/10 font-bold text-primary rounded-full" }}
                    />
                  </PopoverContent>
                </Popover>

                {/* Add Entry Button */}
                {/* {date && !isFutureDate && (
                    <Button onClick={() => setIsAdding(true)} className="gap-2 shadow-sm h-10">
                        <Plus className="w-4 h-4" /> <span className="hidden sm:inline">Add Entry</span>
                    </Button>
                )} */}
           </div>
        </div>

        {/* 2. MAIN CONTENT - Full Width Now */}
        <div className="space-y-6">
            <Tabs defaultValue="diet" className="w-full" onValueChange={(val) => setActiveTab(val)}>
                
                <div className="flex flex-col gap-4 border-b border-border pb-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-foreground">
                            {date ? format(date, "EEEE, MMMM do") : "Select a Date"}
                        </h2>
                        
                        {/* 2. Make the button smart */}
                        {date && !isFutureDate && activeTab !== 'timeline' && (
                            <Button 
                                size="sm" 
                                // Logic: Tasks tab -> Add Task, Diet tab -> Add Log
                                onClick={() => activeTab === 'tasks' ? setIsAddingTask(true) : setIsAdding(true)} 
                                className="gap-2 shadow-sm"
                            >
                                <Plus className="w-4 h-4" /> 
                                <span className="hidden sm:inline">
                                    {activeTab === 'tasks' ? "Add Task" : "Add Log"}
                                </span>
                            </Button>
                        )}
                    </div>
                    <TabsList className="bg-transparent border-b border-border/40 p-0 h-auto gap-6 rounded-none w-full justify-start">
                        <TabsTrigger value="diet" className="rounded-none border-b-2 border-transparent px-0 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                            Diet
                        </TabsTrigger>
                        <TabsTrigger value="tasks" className="rounded-none border-b-2 border-transparent px-0 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                            Tasks
                        </TabsTrigger>
                        <TabsTrigger value="timeline" className="rounded-none border-b-2 border-transparent px-0 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none">
                            Timeline
                        </TabsTrigger>
                    </TabsList>
                </div>

                {/* --- TABS CONTENT (Same as before) --- */}
                <TabsContent value="diet" className="mt-6 animate-in fade-in slide-in-from-bottom-2">
                    {filteredLogs.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-border">
                            <CalendarIcon className="w-10 h-10 mb-3 opacity-20" />
                            <p>No activity recorded.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* 👇 THE TOGGLE SWITCH (Only shows on md screens and up) */}
                            <div className="hidden md:flex justify-end">
                                <div className="flex items-center bg-muted/30 p-1 rounded-lg border border-border/50">
                                    <Button
                                        variant={viewMode === "list" ? "secondary" : "ghost"}
                                        size="sm"
                                        className={`h-8 px-3 gap-2 ${viewMode === "list" ? 'shadow-sm' : 'text-muted-foreground'}`}
                                        onClick={() => handleViewChange("list")}
                                    >
                                        <List className="w-4 h-4" /> List
                                    </Button>
                                    <Button
                                        variant={viewMode === "grid" ? "secondary" : "ghost"}
                                        size="sm"
                                        className={`h-8 px-3 gap-2 ${viewMode === "grid" ? 'shadow-sm' : 'text-muted-foreground'}`}
                                        onClick={() => handleViewChange("grid")}
                                    >
                                        <LayoutGrid className="w-4 h-4" /> Grid
                                    </Button>
                                </div>
                            </div>

                            {/* 👇 DYNAMIC LAYOUT CLASSES */}
                            <div className={
                                viewMode === "list" 
                                ? "flex flex-col gap-4 w-full" 
                                : "grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
                            }>
                                {filteredLogs.map((log) => (
                                    <HistoryLogCard key={log.id} log={log} onDelete={(id) => setLogToDelete(id)} />
                                ))}
                            </div>
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="tasks" className="mt-6 animate-in fade-in slide-in-from-bottom-2">
                        {/* 👇 Pass the delete handler to the list */}
                        <HistoryTaskList 
                            tasks={filteredHistoryTasks} 
                            onToggle={toggleTaskHistory} 
                            onDelete={(id) => setTaskToDelete(id)} 
                        />
                    </TabsContent>

                <TabsContent value="timeline" className="mt-6 animate-in fade-in slide-in-from-bottom-2">
                    <HistoryTimeline tasks={tasks} />
                </TabsContent>
            </Tabs>
        </div>

      </div>
      {/* --- MODALS --- */}
      <AddLogDialog 
        isOpen={isAdding} 
        onOpenChange={setIsAdding} 
        date={date} 
        text={newLogText} 
        onTextChange={setNewLogText} 
        onSave={handleAddLog} 
        isSaving={isSavingLog} 
      />

      {logToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-popover text-popover-foreground rounded-xl shadow-2xl max-w-sm w-full p-6 text-center space-y-6 border border-border">
             <div className="mx-auto bg-destructive/10 h-12 w-12 rounded-full flex items-center justify-center"><Trash2 className="h-6 w-6 text-destructive" /></div>
             <div className="space-y-2"><h3 className="text-lg font-bold">Delete Record?</h3><p className="text-sm text-muted-foreground">This cannot be undone.</p></div>
             <div className="flex gap-3 justify-center">
               <Button variant="outline" onClick={() => setLogToDelete(null)} disabled={isDeleting}>Cancel</Button>
               <Button variant="destructive" onClick={confirmDelete} disabled={isDeleting}>
                 {isDeleting ? <Loader2 className="w-4 h-4 animate-spin"/> : "Delete"}
               </Button>
             </div>
          </div>
        </div>
      )}

      {/* {simpleModal && (
         <div className="fixed inset-0 z-150 flex items-end md:items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-popover text-popover-foreground rounded-xl shadow-2xl max-w-sm w-full p-6 relative border border-border">
                <button onClick={() => setSimpleModal(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
                <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full shrink-0 ${simpleModal.isError ? 'bg-destructive/10 text-destructive' : 'bg-success/10 text-success'}`}>
                        {simpleModal.isError ? <AlertTriangle className="w-6 h-6"/> : <Check className="w-6 h-6"/>}
                    </div>
                    <div className="space-y-1 pt-1">
                        <h3 className="text-lg font-bold">{simpleModal.title}</h3>
                        <p className="text-sm text-muted-foreground">{simpleModal.msg}</p>
                    </div>
                </div>
                <div className="mt-6 flex justify-end">
                    <Button onClick={() => setSimpleModal(null)} variant={simpleModal.isError ? "destructive" : "default"}>Okay</Button>
                </div>
            </div>
         </div>
      )} */}

    {/* Replace old manual Dialog with this Component */}
    <AddTaskDialog 
        isOpen={isAddingTask} 
        onOpenChange={setIsAddingTask}
        task={newTask}
        setTask={setNewTask}
        subtask={newSubtask}
        setSubtask={setNewSubtask}
        onSave={handleAddTask}
        isEditing={false} // History page usually just adds new tasks
    />

    {/* 7. TASK DELETE CONFIRMATION MODAL */}
      {taskToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-popover text-popover-foreground rounded-xl shadow-2xl max-w-sm w-full p-6 text-center space-y-6 border border-border animate-in zoom-in-95">
             <div className="mx-auto bg-destructive/10 h-12 w-12 rounded-full flex items-center justify-center">
                <Trash2 className="h-6 w-6 text-destructive" />
             </div>
             <div className="space-y-2">
                <h3 className="text-lg font-bold">Delete Task?</h3>
                <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
             </div>
             <div className="flex gap-3 justify-center">
               <Button 
                 variant="outline" 
                 onClick={() => setTaskToDelete(null)} 
                 disabled={isDeleting}
               >
                 Cancel
               </Button>
               <Button 
                 variant="destructive" 
                 onClick={confirmDeleteTask} 
                 disabled={isDeleting}
               >
                 {isDeleting ? <Loader2 className="w-4 h-4 animate-spin mr-2"/> : "Yes, Delete"}
               </Button>
             </div>
          </div>
        </div>
      )}

    </div>
  );
}


function HistoryLogCard({ log, onDelete }: { log: any, onDelete: (id: string) => void }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <Card 
            className={`bg-card border-border shadow-sm transition-all group relative cursor-pointer ${expanded ? 'ring-1 ring-primary/20' : 'hover:shadow-md'}`}
            onClick={() => setExpanded(!expanded)}
        >
            <CardContent className="flex gap-5 relative group transition-all">

              {/* TIME COLUMN */}
              <div className="flex flex-col items-center min-w-[70px] pr-5 border-r border-border/40">
                  {/* Time */}
                  <div className="text-sm font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md shadow-sm">
                      {new Date(log.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>

                  {/* Vertical Line */}
                  <div
                      className={`
                          w-[3px] mt-3 rounded-full bg-gradient-to-b from-primary/40 to-primary/10
                          transition-all duration-300 
                          ${expanded ? "h-24 opacity-100" : "h-10 opacity-70"}
                      `}
                  />
              </div>

              {/* CONTENT COLUMN */}
              <div className="flex-1 space-y-3 pr-10">
                  
                  {/* Header Metrics */}
                  <div className="flex justify-between items-start">
                      
                      {/* Metric Badges */}
                      <div className="flex flex-wrap items-center gap-2">

                          {/* Calories In */}
                          <span className="text-[11px] font-mono font-semibold text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20 shadow-sm">
                              +{log.totalCaloriesIn}
                              <span className="text-muted-foreground ml-1">kcal</span>
                          </span>

                          {/* Calories Out */}
                          {log.totalCaloriesOut > 0 && (
                              <span className="text-[11px] font-mono font-semibold text-success bg-success/10 px-2 py-1 rounded border border-success/20 shadow-sm">
                                  -{log.totalCaloriesOut}
                              </span>
                          )}

                          {/* Water */}
                          {log.waterMl > 0 && (
                              <span className="text-[11px] font-mono font-semibold text-info bg-info/10 px-2 py-1 rounded border border-info/20 shadow-sm">
                                  {log.waterMl}ml
                              </span>
                          )}
                      </div>

                      {/* Chevron */}
                      {/* <button className="transition-transform duration-300 text-muted-foreground">
                          <ChevronDown className={`w-5 h-5 ${expanded ? "rotate-180" : ""}`} />
                      </button> */}
                  </div>

                  {/* COLLAPSED PREVIEW */}
                  {!expanded && (
                      <p className="text-sm text-foreground/80 line-clamp-1 italic">
                          "{log.rawText}"
                      </p>
                  )}

                  {/* EXPANDED SECTION */}
                  {expanded && (
                        <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                            
                            {/* Main text */}
                            <div className="bg-secondary/20 p-3 sm:p-4 rounded-lg border border-border/40 text-sm leading-relaxed shadow-sm">
                                "{log.rawText}"
                            </div>

                            {/* AI Feedback */}
                            {log.parsedData && (
                                <div className="mt-4 space-y-3 sm:space-y-4 border-t border-border/40 pt-4">
                                    
                                    {/* 1. AI COACH FEEDBACK */}
                                    {(log.aiFeedback || log.parsedData.ai_feedback) && (
                                        <div className="bg-primary/5 p-3 sm:p-4 rounded-xl border border-primary/10 shadow-sm">
                                            <div className="font-bold text-primary flex items-center gap-2 mb-2 text-xs sm:text-sm uppercase tracking-wider">
                                                <MessageSquare className="w-4 h-4 shrink-0" /> Coach Analysis
                                            </div>
                                            <p className="text-xs sm:text-sm italic text-muted-foreground leading-relaxed">
                                                "{log.aiFeedback || log.parsedData.ai_feedback}"
                                            </p>
                                        </div>
                                    )}

                                    {/* 2. THE NEXT ACTIONABLE STEP */}
                                    {log.parsedData.next_step && (
                                        <div className="bg-emerald-500/10 p-3 sm:p-4 rounded-xl border border-emerald-500/20 shadow-sm">
                                            <div className="font-bold text-emerald-600 dark:text-emerald-500 flex items-center gap-2 mb-1.5 text-xs sm:text-sm uppercase tracking-wider">
                                                <Target className="w-4 h-4 shrink-0" /> Next Step
                                            </div>
                                            <p className="text-xs sm:text-sm font-medium text-foreground leading-snug">
                                                {log.parsedData.next_step}
                                            </p>
                                        </div>
                                    )}

                                    {/* 3. CALORIE SUMMARY TABS */}
                                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                        <div className="bg-secondary/30 p-2.5 sm:p-3 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between border border-border/50 gap-1">
                                            <span className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                                                <Utensils className="w-3.5 h-3.5" /> In
                                            </span>
                                            <span className="font-bold text-orange-500 text-sm sm:text-base">{log.totalCaloriesIn} kcal</span>
                                        </div>
                                        <div className="bg-secondary/30 p-2.5 sm:p-3 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between border border-border/50 gap-1">
                                            <span className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                                                <Flame className="w-3.5 h-3.5" /> Out
                                            </span>
                                            <span className="font-bold text-red-500 text-sm sm:text-base">{log.totalCaloriesOut} kcal</span>
                                        </div>
                                    </div>

                                    {/* 4. FOODS LOGGED TABLE */}
                                    {log.parsedData.foods && log.parsedData.foods.length > 0 && (
                                        <div className="space-y-2">
                                            <h4 className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wider pl-1">
                                                Foods Tracked
                                            </h4>
                                            <div className="divide-y divide-border/50 border border-border/50 rounded-xl overflow-hidden bg-card">
                                                {log.parsedData.foods.map((food: any, i: number) => (
                                                    <div key={i} className="p-2.5 sm:p-3 flex flex-col gap-1.5 sm:flex-row sm:items-center justify-between hover:bg-secondary/10 transition-colors">
                                                        <div className="flex items-start justify-between sm:block w-full sm:w-auto gap-2">
                                                            <span className="font-semibold text-xs sm:text-sm leading-tight">{food.name}</span>
                                                            <span className="sm:hidden bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold px-1.5 py-0.5 rounded text-[10px] whitespace-nowrap shrink-0">
                                                                {food.calories} kcal
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] sm:text-xs">
                                                            <span className="text-muted-foreground"><strong className="text-foreground">{food.protein}g</strong> Pro</span>
                                                            <span className="text-muted-foreground"><strong className="text-foreground">{food.carbs}g</strong> Carbs</span>
                                                            <span className="text-muted-foreground"><strong className="text-foreground">{food.fats}g</strong> Fat</span>
                                                            <span className="hidden sm:inline-flex bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold px-2 py-0.5 rounded-md ml-auto whitespace-nowrap">
                                                                {food.calories} kcal
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* 5. EXERCISES LOGGED TABLE */}
                                    {log.parsedData.exercises && log.parsedData.exercises.length > 0 && (
                                        <div className="space-y-2">
                                            <h4 className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wider pl-1">
                                                Activity Tracked
                                            </h4>
                                            <div className="divide-y divide-border/50 border border-border/50 rounded-xl overflow-hidden bg-card">
                                                {log.parsedData.exercises.map((exercise: any, i: number) => (
                                                    <div key={i} className="p-2.5 sm:p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 hover:bg-secondary/10 transition-colors">
                                                        <span className="font-semibold text-xs sm:text-sm leading-tight">{exercise.name}</span>
                                                        <div className="flex items-center justify-between sm:justify-end gap-3 text-[11px] sm:text-xs w-full sm:w-auto">
                                                            <span className="text-muted-foreground font-medium">{exercise.duration_minutes} mins</span>
                                                            <span className="bg-red-500/10 text-red-600 dark:text-red-400 font-bold px-1.5 sm:px-2 py-0.5 rounded sm:rounded-md whitespace-nowrap">
                                                                {exercise.calories_burned} kcal
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* 👇 6. AI DISCLAIMER (NEW) */}
                                    <div className="mt-5 pt-4 border-t border-border/40 flex items-start gap-2 sm:gap-3 text-[10px] sm:text-[11px] text-muted-foreground/60 italic leading-snug">
                                        <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-70" />
                                        <p>
                                            The values provided above are approximate estimations generated by AI and are not exact. The organization does not assume any responsibility for their absolute accuracy.
                                        </p>
                                    </div>
                                    
                                </div>
                            )}
                        </div>
                    )}
              </div>

              {/* DELETE BUTTON */}
              <div
                  className={`
                      absolute top-3 right-3 transition-opacity duration-200
                      ${expanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
                  `}
              >
                  <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 shadow-sm"
                      onClick={(e) => {
                          e.stopPropagation();
                          onDelete(log.id);
                      }}
                  >
                      <Trash2 className="w-4 h-4" />
                  </Button>
              </div>

          </CardContent>

        </Card>
    );
}

