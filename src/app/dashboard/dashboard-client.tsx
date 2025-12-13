"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea"; // Ensure you have this or use standard textarea
import { Loader2, Send, AlertTriangle, X, Check, Flame, Droplets, Utensils, Activity, TrendingUp, Plus, ListTodo, Clock, ChevronDown} from "lucide-react";
import Link from "next/link";
import WeeklyChart from "@/components/WeeklyChart";
import Image from "next/image";
import {DNALoader} from "@/components/dna-loader";
import { Checkbox } from "@/components/ui/checkbox";
import { format, subDays, startOfDay, endOfDay, isToday } from "date-fns";
import { Quote } from "lucide-react";


// 🔴 KEEP YOUR ID HERE
export default function DashboardClient({ user }: { user: any }) {
  // 👇 USE THE REAL ID
  const USER_ID = user.id;   
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({ in: 0, out: 0, goal: 2500 });
  const [waterTotal, setWaterTotal] = useState(0);
  const [isRestoring, setIsRestoring] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);

  // 👇 New State for Tasks
  const [allWeeklyTasks, setAllWeeklyTasks] = useState<any[]>([]); 
  const [pendingTasks, setPendingTasks] = useState<any[]>([]); // Derived for sidebar

  // Inside DashboardClient component
  const [quote, setQuote] = useState({ quote: "Loading motivation...", author: "" });
  
  // New State for Input
  const [newLogText, setNewLogText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Data State
  const [chartData, setChartData] = useState<any[]>([]);
  const [stats, setStats] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
    water: 0,
    streak: 0
  });


  // 👇 NEW: STATE FOR GENERIC SUCCESS/ERROR MODALS
  // This replaces ugly browser alerts for things like "Settings Saved"
  const [simpleModal, setSimpleModal] = useState<{ title: string; msg: string; isError?: boolean } | null>(null);

  useEffect(() => {
      // 👇 FIX: Call both functions in parallel
      Promise.all([fetchLogs(), fetchTasks()]).finally(() => setLoading(false));
    }, []);


  // Inside useEffect or a new useEffect
  useEffect(() => {
      async function getQuote() {
          try {
              const res = await fetch('/api/quote');
              const data = await res.json();
              if (data.quote) setQuote(data);
          } catch (e) {
              console.error("Quote error", e);
          }
      }
      getQuote();
  }, []);

  async function fetchLogs() {
    try {
      const res = await fetch(`/api/get-logs?userId=${USER_ID}`);
      const data = await res.json();

      if (res.ok && data.success) {
        setLogs(data.logs);
        calculateSummary(data.logs);
      } else {
        // 👇 HANDLE API ERRORS (e.g. "User not found", "DB Error")
        setSimpleModal({ 
          title: "Error Loading Data", 
          msg: data.error || "Failed to retrieve your history logs.", 
          isError: true 
        });
      }
    } catch (error) {
      // 👇 HANDLE NETWORK ERRORS (e.g. Internet disconnected)
      setSimpleModal({ 
        title: "Connection Error", 
        msg: "Could not reach the server. Please check your internet.", 
        isError: true 
      });
    } finally {
      setLoading(false);
    }
  }


// 👇 UPDATED: Fetch Last 7 Days
  async function fetchTasks() {
    try {
      const today = new Date();
      const lastWeek = subDays(today, 6); // Go back 6 days

      // Call the new Range API
      const res = await fetch(
        `/api/tasks?from=${startOfDay(lastWeek).toISOString()}&to=${endOfDay(today).toISOString()}`, 
        { cache: 'no-store' }
      );
      const data = await res.json();
      
      if (data.success) {
        // 1. Store EVERYTHING for the Chart
        setAllWeeklyTasks(data.tasks);

        // 2. Filter for the Sidebar (Only Today's Pending items)
        const pending = data.tasks.filter((t: any) => 
            !t.isCompleted && isToday(new Date(t.date))
        );
        
        // Sort Pending Tasks
        const priorityOrder: any = { HIGH: 1, MEDIUM: 2, LOW: 3, HABIT: 4 };
        pending.sort((a: any, b: any) => {
            const pA = priorityOrder[a.priority] || 99;
            const pB = priorityOrder[b.priority] || 99;
            return pA - pB;
        });

        setPendingTasks(pending);
      }
    } catch (e) { console.error("Task fetch error", e); }
  }

  // 👇 NEW: Handle Task Completion (Disappear logic)
  async function toggleTask(id: string, currentStatus: boolean) {
// Remove from sidebar immediately
    setPendingTasks(prev => prev.filter(t => t.id !== id));
    
    // Also update the main list so the Chart updates live (optional but nice)
    setAllWeeklyTasks(prev => prev.map(t => t.id === id ? { ...t, isCompleted: !currentStatus } : t));

    // Sync with DB
    await fetch("/api/tasks", { 
        method: "PATCH", 
        body: JSON.stringify({ taskId: id, isCompleted: !currentStatus }) 
    });
  }

  // 👇 NEW: Handle Subtask Completion (Keep in list, just check box)
  async function toggleSubtask(taskId: string, subtaskId: string, currentStatus: boolean) {
     setPendingTasks(prev => prev.map(t => {
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

  async function handleRestoreAccount() {
      // We close the modal first (if open)
      setShowRestoreModal(false); 
      
      setIsRestoring(true);
      try {
        const res = await fetch("/api/user/restore", { method: "POST" });
        if (res.ok) {
          setSimpleModal({ title: "Welcome Back!", msg: "Your account is fully active again." });
          
          // Slight delay before reload so they can read the success message
          setTimeout(() => window.location.reload(), 2000);
        } else {
          setSimpleModal({ title: "Error", msg: "Failed to restore account.", isError: true });
        }
      } catch (e) {
        console.error(e);
        setSimpleModal({ title: "Error", msg: "Server error.", isError: true });
      } finally {
        setIsRestoring(false);
      }
    }

  function calculateSummary(logs: any[]) {
    let totalIn = 0;
    let totalOut = 0;
    let water = 0;
    
    // Get "Today" as a simple string (e.g., "12/9/2025")
    // This uses your computer's local time, so it resets exactly at YOUR midnight.
    const todayStr = new Date().toLocaleDateString();

    logs.forEach(log => {
      // Convert the log's date to the same string format
      const logDateStr = new Date(log.date).toLocaleDateString();

      // 🛑 THE FIX: Only add numbers if the dates match!
      if (logDateStr === todayStr) {
        totalIn += log.totalCaloriesIn;
        totalOut += log.totalCaloriesOut;
        if (log.waterMl) water += log.waterMl;
      }
    });

    setSummary(prev => ({ ...prev, in: totalIn, out: totalOut }));
    setWaterTotal(water);
  }

async function handleAddWater() {
    try {
      // Optimistic update: Update the UI immediately before the API responds
      setWaterTotal(prev => prev + 250);
      
      const res = await fetch("/api/log-water", {
        method: "POST",
        body: JSON.stringify({
          userId: USER_ID,
          amount: 250
        }),
      });
      
      const data = await res.json();
      if (data.success) {
        fetchLogs(); // Sync with real database data
      }
    } catch (err) {
      setSimpleModal({ title: "Error", msg: "Failed to add water log.", isError: true });
    }
  }

  async function handleAddLog() {
    if (!newLogText.trim()) return;
    setIsProcessing(true);

    try {
      const res = await fetch("/api/process-log", {
        method: "POST",
        body: JSON.stringify({
          userId: USER_ID,
          userText: newLogText,
          userTimezone: "Asia/Kolkata", // You can make this dynamic later
        }),
      });

      const data = await res.json();
      if (data.success) {
        setNewLogText(""); // Clear input
        fetchLogs(); // Refresh data immediately
      }
    } catch (err) {
      setSimpleModal({ title: "Error", msg: "Failed to add log.", isError: true });
    } finally {
      setIsProcessing(false);
    }
  }

  if (loading) {
    return <DNALoader />;
  }
// --- UI HELPERS ---
  const caloriePercent = Math.min(Math.round((summary.in / summary.goal) * 100), 100);
  const netCals = summary.in - summary.out;

 return (
    <div className="min-h-screen bg-background p-4 md:p-8 font-sans text-foreground pb-24">
      <main className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-border/40 pb-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground mt-1">Here is your daily health overview.</p>
            </div>
        </div>


        {/* QUOTE OF THE DAY BANNER */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-blue-500/10 border border-violet-500/20 p-6 flex items-start gap-4 shadow-sm">
            <div className="absolute -top-4 -right-4 opacity-5">
                <Quote className="w-24 h-24 rotate-12" />
            </div>
            
            <div className="bg-background/80 p-2 rounded-full shadow-sm border border-border/50 backdrop-blur-sm mt-1">
                <Quote className="w-5 h-5 text-violet-500" />
            </div>

            <div className="relative p-6 rounded-xl bg-gradient-to-br from-background to-secondary/20 border border-border/50 shadow-sm overflow-hidden group">
                {/* Soft Glow Behind Quote */}
                <div className="absolute inset-0 bg-primary/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Accent Bar */}
                <div className="absolute left-0 top-0 h-full w-1 bg-primary/60 rounded-r-full opacity-70 group-hover:w-1.5 transition-all duration-500" />

                {/* Quote Text */}
                <div 
                    className="space-y-2 relative z-10 animate-[fadeUp_0.8s_ease-out]"
                >
                    <p className="text-xl md:text-2xl font-quote text-foreground italic tracking-wide leading-relaxed">
                        “{quote.quote}”
                    </p>

                    {/* Optional Author */}
                    {quote.author && (
                        <p className="text-sm text-muted-foreground font-semibold font-sans tracking-wide animate-[fadeIn_1s_ease-out_0.4s_forwards] opacity-0">
                            — {quote.author}
                        </p>
                    )}
                </div>
            </div>

        </div>

        {/* RESTORE BANNER */}
        {user?.scheduledForDeletion && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 animate-in slide-in-from-top-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-destructive/20 rounded-full flex items-center justify-center text-destructive">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-destructive">Account Scheduled for Deletion</p>
                <p className="text-sm text-foreground/80">
                  You have until <span className="font-semibold">{new Date(user.scheduledForDeletion).toLocaleDateString()}</span> to restore your account.
                </p>
              </div>
            </div>
            <Button onClick={() => setShowRestoreModal(true)} disabled={isRestoring} variant="destructive" className="w-full md:w-auto">
              {isRestoring ? "Restoring..." : "Undo Deletion"}
            </Button>
          </div>
        )}

        {/* 1. QUICK LOG INPUT (Full Width) */}
        <section className="bg-card p-1 rounded-2xl shadow-sm border border-border/50 bg-gradient-to-br from-card to-secondary/10">
          <div className="p-4 md:p-5 space-y-3">
            <label className="text-sm font-semibold text-foreground/80 flex items-center gap-2">
                <div className="p-1.5 bg-primary/10 rounded-md text-primary"><Utensils className="w-4 h-4"/></div>
                Quick Log Meal or Activity
            </label>
            <div className="relative">
                <textarea
                value={newLogText}
                onChange={(e) => setNewLogText(e.target.value)}
                placeholder="e.g. I ate 2 eggs and toast, then walked for 30 mins..."
                className="w-full min-h-[80px] p-4 pr-16 rounded-xl border border-border bg-background/50 focus:bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none shadow-inner"
                />
                <div className="absolute bottom-3 right-3">
                    <Button 
                        onClick={handleAddLog} 
                        disabled={isProcessing || !newLogText.trim()}
                        size="sm"
                        className="h-9 px-4 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 rounded-lg transition-all active:scale-95"
                    >
                        {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <div className="flex items-center gap-2">Log <Send className="w-3.5 h-3.5" /></div>}
                    </Button>
                </div>
            </div>
          </div>
        </section>

        {/* 2. MAIN SPLIT: Stats (Left) & Tasks (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* --- LEFT SIDE: STATS (2x2 Matrix) --- */}
            <div className="lg:col-span-7 xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Calories In */}
                <Card className="bg-card border-border/60 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Utensils className="w-16 h-16" />
                    </div>
                    <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Calories In</CardTitle>
                        {/* <Utensils className="w-4 h-4 text-orange-500" /> */}
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-foreground tracking-tight">{summary.in}</div>
                        <div className="mt-3 space-y-1.5">
                            <Progress value={caloriePercent} className="h-2 bg-secondary" indicatorClassName="bg-gradient-to-r from-orange-400 to-orange-600" />
                            <p className="text-xs text-muted-foreground text-right font-medium">{caloriePercent}% of goal</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Calories Burned */}
                <Card className="bg-card border-border/60 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Flame className="w-16 h-16" />
                    </div>
                    <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Burned</CardTitle>
                        {/* <Flame className="w-4 h-4 text-red-500" /> */}
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-foreground tracking-tight">{summary.out}</div>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <Activity className="w-3 h-3 text-emerald-500" /> Active Energy
                        </p>
                    </CardContent>
                </Card>

                {/* Net Balance */}
                <Card className="bg-card border-border/60 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <TrendingUp className="w-16 h-16" />
                    </div>
                    <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Net Balance</CardTitle>
                        {/* <TrendingUp className="w-4 h-4 text-blue-500" /> */}
                    </CardHeader>
                    <CardContent>
                        <div className={`text-3xl font-bold tracking-tight ${netCals > summary.goal ? 'text-red-500' : 'text-foreground'}`}>
                            {netCals}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Calories Remaining</p>
                    </CardContent>
                </Card>

                {/* Hydration */}
                <Card className="bg-card border-border/60 shadow-sm hover:shadow-md transition-all relative overflow-hidden group border-b-4 border-b-blue-500/50">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Droplets className="w-16 h-16 text-blue-500" />
                    </div>
                    <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-sm font-medium text-blue-500">Hydration</CardTitle>
                        {/* <Droplets className="w-4 h-4 text-blue-500" /> */}
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-foreground tracking-tight">
                            {waterTotal} <span className="text-lg font-normal text-muted-foreground">ml</span>
                        </div>
                        <Button 
                            onClick={handleAddWater} 
                            size="sm" 
                            variant="outline"
                            disabled={true} 
                            className="disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50 mt-3 w-full border-blue-500/20 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:text-blue-500 group-hover:border-blue-500/40 transition-all"
                        >
                            <Plus className="w-3.5 h-3.5 mr-2" /> Add 250ml
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* --- RIGHT SIDE: PENDING TASKS LIST --- */}
            <div className="lg:col-span-5 xl:col-span-4 h-full">
                <Card className="bg-card border-border/60 shadow-sm h-full flex flex-col">
                    <CardHeader className="pb-2 border-b border-border/40 bg-secondary/5">
                        <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center justify-between">
                            <span className="flex items-center gap-2"><ListTodo className="w-4 h-4 text-primary" /> Pending Tasks</span>
                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-mono">{pendingTasks.length}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 flex-1 min-h-[300px] max-h-[400px] overflow-y-auto custom-scrollbar">
                        {pendingTasks.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-muted-foreground/60 p-8">
                                <Check className="w-12 h-12 mb-3 opacity-20" />
                                <p className="text-sm font-medium text-center">All caught up!<br/>Enjoy your day.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-border/40">
                                {pendingTasks.map(task => (
                                    <DashboardTaskItem 
                                        key={task.id} 
                                        task={task} 
                                        onToggle={toggleTask} 
                                        onSubToggle={toggleSubtask} 
                                    />
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

        </div>

        {/* 3. CHART SECTION (Bottom) */}
        <section className="bg-card border border-border/50 rounded-2xl shadow-sm p-2">
            <WeeklyChart logs={logs} tasks={allWeeklyTasks} />
        </section>

      </main>

      {/* 👇 GENERIC SUCCESS/ERROR MODAL */}
      {simpleModal && (
         <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-sm p-6 relative animate-in slide-in-from-bottom-8 md:zoom-in-95">
                <button onClick={() => setSimpleModal(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"><X className="w-5 h-5" /></button>
                <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full shrink-0 ${simpleModal.isError ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                        {simpleModal.isError ? <AlertTriangle className="w-6 h-6"/> : <Check className="w-6 h-6"/>}
                    </div>
                    <div className="space-y-1 pt-1">
                        <h3 className="text-lg font-bold text-foreground">{simpleModal.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{simpleModal.msg}</p>
                    </div>
                </div>
                <div className="mt-6 flex justify-end">
                    <Button onClick={() => setSimpleModal(null)} variant={simpleModal.isError ? "destructive" : "default"} className="px-6">Okay</Button>
                </div>
            </div>
         </div>
      )}

      {/* 👇 RESTORE CONFIRMATION MODAL */}
      {showRestoreModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-xl shadow-2xl max-w-sm w-full p-6 text-center space-y-6 animate-in zoom-in-95">
             <div className="mx-auto bg-blue-500/10 h-14 w-14 rounded-full flex items-center justify-center">
                <Check className="h-7 w-7 text-blue-500" />
             </div>
             <div className="space-y-2">
               <h3 className="text-xl font-bold text-foreground">Restore Account?</h3>
               <p className="text-sm text-muted-foreground">This will cancel the deletion process.</p>
             </div>
             <div className="grid grid-cols-2 gap-3">
               <Button variant="outline" onClick={() => setShowRestoreModal(false)}>Cancel</Button>
               <Button onClick={handleRestoreAccount}>Yes, Restore</Button>
             </div>
          </div>
        </div>
      )}

    </div>
  );
}

// 👇 SMALL HELPER COMPONENT FOR TASK ITEMS
function DashboardTaskItem({ task, onToggle, onSubToggle }: any) {
    const [expanded, setExpanded] = useState(false);

    // Color Badges
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
                            <p className="text-sm font-medium leading-snug truncate pr-2">{task.title}</p>
                            <div className="flex items-center gap-2 mt-1">
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

                    {/* Subtasks Dropdown */}
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