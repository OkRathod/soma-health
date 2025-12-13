"use client";

import { useEffect, useState, useMemo} from "react";
import { useUser } from "@clerk/nextjs";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Calendar as CalendarIcon, Clock , Trash2, Check, AlertTriangle, X, Plus, PenLine, ChevronDown} from "lucide-react";
import { DNALoader } from "@/components/dna-loader";
import { Button } from "@/components/ui/button"; // Import Button
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"; 
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Utensils, ListTodo, Activity } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export default function HistoryPage() {
  const { user, isLoaded } = useUser();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

// 👇 MODAL STATES
  const [simpleModal, setSimpleModal] = useState<{ title: string; msg: string; isError?: boolean } | null>(null);
  const [logToDelete, setLogToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

// 👇 NEW: ADD LOG STATE
  const [isAdding, setIsAdding] = useState(false); 
  const [newLogText, setNewLogText] = useState("");
  const [isSavingLog, setIsSavingLog] = useState(false);
  
  // Inside HistoryPage component, near other state variables
  const [tasks, setTasks] = useState<any[]>([]); // 👈 NEW: Store history tasks


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
          const res = await fetch(`/api/tasks?date=${date.toISOString()}`);
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
      const res = await fetch(`/api/get-logs?userId=${user?.id}`);
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

  // 👇 NEW: Layout Engine for Timeline (Same as Tasks Page)
  const positionedTasks = useMemo(() => {
    if (loading || tasks.length === 0) return [];

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
  }, [tasks, loading]);

  // 👇 NEW COMPONENT: Handles Expand/Collapse Logic
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
                          <div className="bg-secondary/20 p-3 rounded-lg border border-border/40 text-sm leading-relaxed shadow-sm">
                              "{log.rawText}"
                          </div>

                          {/* AI Feedback */}
                          {log.aiFeedback && (
                              <div className="bg-primary/5 px-3 py-2 rounded-lg border border-primary/10 text-xs italic text-muted-foreground shadow-sm">
                                  <span className="font-semibold text-primary not-italic mr-1">Coach:</span>
                                  {log.aiFeedback}
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
            setSimpleModal({ title: "Success", msg: "Entry added successfully!" });
            setNewLogText("");
            setIsAdding(false);
            fetchLogs(); // 👈 Refresh list to show the new card immediately
        } else {
            setSimpleModal({ 
                title: data.error || "Processing Failed", 
                msg: data.details || "The AI could not process your log. Please try again.", 
                isError: true 
            });
        }
    } catch (e) {
        setSimpleModal({ 
            title: "Connection Error", 
            msg: "Could not reach the server. Please check your internet connection.", 
            isError: true 
        });
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
          setSimpleModal({ title: "Deleted", msg: "Record removed successfully." });
        } else {
          setLogToDelete(null);
          setSimpleModal({ title: "Error", msg: "Failed to delete log.", isError: true });
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

  if (!isLoaded || loading) return <DNALoader />;

  // Helper: Check if selected date is in the future
  const isFutureDate = date ? date > new Date() : false;

  return (
    <div className="min-h-screen bg-background p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
           <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
             <Clock className="w-8 h-8 text-primary" /> History
           </h1>
           <p className="text-muted-foreground">Review your past days and track your consistency.</p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 items-start">
          
          {/* LEFT: Calendar Card */}
          <div className="flex flex-col gap-4">
            <Card className="border-border bg-card shadow-sm w-fit mx-auto md:mx-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border-0"
                    
                    // 👇 ADD THESE 3 LINES
                    captionLayout="dropdown-buttons"
                    fromYear={2024} 
                    toYear={new Date().getFullYear() + 100} // Always shows up to next year

                    // 👇 2. TELL CALENDAR WHICH DATES HAVE HISTORY
                    modifiers={{ hasHistory: daysWithHistory }}
                    
                    // 👇 3. STYLE THOSE DATES (Light Circle)
                    modifiersClassNames={{ 
                        hasHistory: "bg-primary/10 font-bold text-primary rounded-full transition-all hover:bg-primary/30 hover:scale-110 cursor-pointer aria-selected:!bg-primary aria-selected:!text-primary-foreground aria-selected:hover:!bg-primary/70 aria-selected:hover:!scale-110" 
                    }}
                />
            </Card>
            <div className="text-center text-sm text-muted-foreground hidden md:block">
                {date ? format(date, "MMMM do, yyyy") : "Select a date"}
            </div>
          </div>

          {/* RIGHT: Timeline Feed */}
              <div className="space-y-6 w-full">
                  
                  {/* TABS SYSTEM WRAPPER */}
                  <Tabs defaultValue="diet" className="w-full">
                      
                      {/* HEADER & TOGGLE */}
                      <div className="flex flex-col gap-4 border-b border-border pb-4">
                          <div className="flex items-center justify-between">
                              <h2 className="text-xl font-semibold text-foreground">
                                  {date ? format(date, "EEEE, MMMM do") : "Select a Date"}
                              </h2>
                              
                              {/* Global Add Entry Button (Only shows if valid date) */}
                              {date && !isFutureDate && (
                                  <Button size="sm" onClick={() => setIsAdding(true)} className="gap-2 shadow-sm">
                                      <Plus className="w-4 h-4" /> <span className="hidden sm:inline">Add Entry</span>
                                  </Button>
                              )}
                          </div>

                          {/* THE TOGGLE BUTTONS */}
                          <TabsList className="grid w-full grid-cols-3">
                              <TabsTrigger value="diet" className="gap-2 cursor-pointer"><Utensils className="w-4 h-4"/> Diet</TabsTrigger>
                              <TabsTrigger value="tasks" className="gap-2 cursor-pointer"><ListTodo className="w-4 h-4"/> Tasks</TabsTrigger>
                              <TabsTrigger value="timeline" className="gap-2 cursor-pointer"><Activity className="w-4 h-4"/> Timeline</TabsTrigger>
                          </TabsList>
                      </div>

                      {/* === VIEW 1: DIET (Restored Full Detail) === */}
                      <TabsContent value="diet" className="mt-4 animate-in fade-in slide-in-from-bottom-2">
                          {filteredLogs.length === 0 ? (
                              <div className="flex flex-col items-center justify-center py-20 text-muted-foreground bg-muted/20 rounded-xl border border-dashed border-border">
                                  <CalendarIcon className="w-10 h-10 mb-3 opacity-20" />
                                  {isFutureDate ? (
                                      <p>You cannot log activity for the future.</p>
                                  ) : (
                                      <>
                                          <p>No activity recorded for this day.</p>
                                          <Button variant="link" onClick={() => setIsAdding(true)} className="mt-2 text-primary">
                                              Add an entry now
                                          </Button>
                                      </>
                                  )}
                              </div>
                          ) : (
                              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                                  {filteredLogs.map((log) => (
                                      <HistoryLogCard 
                                          key={log.id} 
                                          log={log} 
                                          onDelete={askToDelete} // Pass your delete handler function
                                      />
                                  ))}
                              </div>
                          )}
                      </TabsContent>

                      {/* === VIEW 2: TASKS (Corrected Logic) === */}

                      <TabsContent value="tasks" className="mt-4 space-y-3 animate-in fade-in slide-in-from-bottom-2">
                          {tasks.length === 0 ? (
                              <div className="text-center py-12 text-muted-foreground bg-muted/10 rounded-xl border border-dashed">
                                  No tasks found for this day.
                              </div>
                          ) : (
                              <div className="max-h-[600px] overflow-y-auto pr-2 custom-scrollbar space-y-3">
                                  {tasks.map(task => (
                                      <div 
                                          key={task.id} 
                                          // Added cursor-pointer to the whole card so it feels interactive
                                          className="flex items-start gap-3 p-3 bg-card border border-border rounded-lg shadow-sm hover:border-primary/30 transition-colors group"
                                      >
                                          {/* 👇 REPLACED STATIC DOT WITH INTERACTIVE CHECKBOX */}
                                          <div className="mt-1">
                                              <Checkbox 
                                                  checked={task.isCompleted} 
                                                  onCheckedChange={() => toggleTaskHistory(task.id, task.isCompleted)}
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
                                                  <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground border px-1.5 rounded ml-2 shrink-0">
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
                                      </div>
                                  ))}
                              </div>
                          )}
                      </TabsContent>

                      {/* === VIEW 3: TIMELINE (Visual Match with Tasks Page) === */}
                      <TabsContent value="timeline" className="mt-4 animate-in fade-in slide-in-from-bottom-2">
                          <div className="relative h-[1440px] border rounded-xl bg-card/30 overflow-hidden shadow-inner">
                              
                              {/* 24 Hour Grid Lines */}
                              {Array.from({length: 24}).map((_, i) => (
                                  <div key={i} className="absolute left-0 w-full border-t border-border/30 h-[60px]" style={{ top: `${i * 60}px` }}>
                                      <span className="text-[10px] text-muted-foreground pl-2 pt-1 block bg-background/50 w-fit pr-2 rounded-br font-mono">
                                          {i === 0 ? "12 AM" : i < 12 ? `${i} AM` : i === 12 ? "12 PM" : `${i-12} PM`}
                                      </span>
                                  </div>
                              ))}

                              {/* Task Blocks (Using Smart Layout) */}
                              {positionedTasks.map((task: any) => {
                                  const d = new Date(task.startTime);
                                  // 60px per hour. Top = (Hours * 60) + Mins
                                  const topPos = (d.getHours() * 60) + d.getMinutes();
                                  const height = task.duration;

                                  // Dynamic Horizontal Positioning
                                  // Left Padding = 4rem (approx 64px) for time labels
                                  const widthVal = `calc((100% - 5rem) / ${task.totalCols})`;
                                  const leftVal = `calc(4rem + ((100% - 5rem) / ${task.totalCols} * ${task.colIndex}))`;

                                  return (
                                      <div 
                                          key={task.id}
                                          className={`absolute rounded-lg border-l-[4px] px-2 py-1 text-xs shadow-sm overflow-hidden border
                                              ${task.priority === 'HIGH' ? 'bg-red-500/10 border-red-500 border-l-red-500 text-red-700 dark:text-red-300' : 
                                                task.priority === 'MEDIUM' ? 'bg-orange-500/10 border-orange-500 border-l-orange-500 text-orange-700 dark:text-orange-300' :
                                                task.priority === 'HABIT' ? 'bg-violet-500/10 border-violet-500 border-l-violet-500 text-violet-700 dark:text-violet-300' :
                                                'bg-blue-500/10 border-blue-500 border-l-blue-500 text-blue-700 dark:text-blue-300'}
                                              ${task.isCompleted ? 'opacity-60 grayscale' : 'opacity-90'}
                                          `}
                                          style={{ 
                                              top: `${topPos}px`, 
                                              height: `${Math.max(30, height)}px`, // Min height 30px
                                              width: widthVal,
                                              left: leftVal,
                                              zIndex: 10 + task.colIndex
                                          }} 
                                      >
                                          <div className="flex justify-between items-start h-full gap-1">
                                              <div className="font-semibold truncate flex items-center gap-1 min-w-0">
                                                  {task.isCompleted && <Check className="w-3 h-3 flex-shrink-0" />}
                                                  <span className="truncate">{task.title}</span>
                                              </div>
                                              {/* Only show time if space permits */}
                                              {(height > 30 && task.totalCols < 3) && (
                                                  <div className="opacity-70 font-mono text-[9px] bg-background/50 px-1 rounded flex-shrink-0">
                                                      {d.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                                                  </div>
                                              )}
                                          </div>
                                      </div>
                                  )
                              })}
                          </div>
                      </TabsContent>

                  </Tabs>
              </div>
        </div>

      </div>

      {/* 5. DELETE CONFIRMATION MODAL */}
      {logToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-popover text-popover-foreground rounded-xl shadow-2xl max-w-sm w-full p-6 text-center space-y-6 animate-in zoom-in-95 border border-border">
             <div className="mx-auto bg-destructive/10 h-12 w-12 rounded-full flex items-center justify-center">
                <Trash2 className="h-6 w-6 text-destructive" />
             </div>
             <div className="space-y-2">
               <h3 className="text-lg font-bold">Delete Record?</h3>
               <p className="text-sm text-muted-foreground">
                 Are you sure you want to remove this log? This action cannot be undone.
               </p>
             </div>
             <div className="flex gap-3 justify-center">
               <Button 
                 variant="outline" 
                 onClick={() => setLogToDelete(null)} 
                 className="w-auto"
                 disabled={isDeleting}
               >
                 Cancel
               </Button>
               <Button 
                 variant="destructive"
                 onClick={confirmDelete} 
                 className="w-auto"
                 disabled={isDeleting}
               >
                 {isDeleting ? <Loader2 className="w-4 h-4 animate-spin mr-2"/> : "Yes, Delete"}
               </Button>
             </div>
          </div>
        </div>
      )}

      <Dialog open={isAdding} onOpenChange={setIsAdding}>
        <DialogContent className="sm:max-w-md bg-card border-border">
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                    <PenLine className="w-5 h-5 text-primary" />
                    Add Entry for {date ? format(date, "MMM do") : ""}
                </DialogTitle>
                {/* 👇 ADD THIS DESCRIPTION COMPONENT */}
            <DialogDescription>
                Type what you ate or how you exercised. AI will calculate the stats.
            </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <Textarea 
                    placeholder="E.g. I ate a cheese sandwich and ran 2km..." 
                    value={newLogText}
                    onChange={(e) => setNewLogText(e.target.value)}
                    className="min-h-[100px] resize-none bg-background focus:ring-primary"
                />
                <p className="text-xs text-muted-foreground">
                    This will be processed by AI and added to your history without overwriting existing data.
                </p>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={() => setIsAdding(false)} disabled={isSavingLog}>Cancel</Button>
                <Button onClick={handleAddLog} disabled={isSavingLog || !newLogText.trim()}>
                    {isSavingLog ? <Loader2 className="w-4 h-4 animate-spin mr-2"/> : "Save Entry"}
                </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 6. SUCCESS / ERROR MODAL */}
      {simpleModal && (
         <div className="fixed inset-0 z-150 flex items-end md:items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-popover text-popover-foreground rounded-xl shadow-2xl max-w-sm w-full p-6 relative animate-in slide-in-from-bottom-8 md:zoom-in-95 border border-border">
                <button onClick={() => setSimpleModal(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
                    <X className="w-5 h-5" />
                </button>
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
                    <Button onClick={() => setSimpleModal(null)} variant={simpleModal.isError ? "destructive" : "default"}>
                        Okay
                    </Button>
                </div>
            </div>
         </div>
      )}

    </div>
  );
}

