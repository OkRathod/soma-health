"use client";

import { useEffect, useState } from "react";
import { subDays, startOfDay, endOfDay, isToday } from "date-fns";
import { AlertTriangle, Check, Flame, Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DNALoader } from "@/components/dna-loader";
import WeeklyChart from "@/components/WeeklyChart";

// Components
import { QuoteBanner } from "@/components/dashboard/QuoteBanner";
import { QuickLog } from "@/components/dashboard/QuickLog";
import { EnergyRing } from "@/components/dashboard/EnergyRing";
import { NetBalanceCard } from "@/components/dashboard/NetBalanceCard";
import { HydrationCard } from "@/components/dashboard/HydrationCard";
import { PendingTasksList } from "@/components/dashboard/PendingTasksList";
import { X } from "lucide-react"; 

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


  // Add this helper function
const sortTasks = (tasks: any[]) => {
  const priorityOrder: any = { HIGH: 1, MEDIUM: 2, LOW: 3, HABIT: 4 };
  
  return [...tasks].sort((a, b) => {
    // 1. Sort by Completion: Active first, Completed last
    if (a.isCompleted !== b.isCompleted) return a.isCompleted ? 1 : -1;
    
    // 2. Sort by Priority
    const pA = priorityOrder[a.priority] || 99;
    const pB = priorityOrder[b.priority] || 99;
    return pA - pB;
  });
};


async function fetchLogs() {
    try {
      // 👇 NEW: Define the 90-day range (same as tasks)
      const today = new Date();
      const fromDate = startOfDay(subDays(today, 90)).toISOString();
      const toDate = endOfDay(today).toISOString();

      // 👇 NEW: Pass 'from' and 'to' to the API
      const res = await fetch(
        `/api/get-logs?userId=${USER_ID}&from=${fromDate}&to=${toDate}`
      );
      
      const data = await res.json();

      if (res.ok && data.success) {
        setLogs(data.logs);
        calculateSummary(data.logs); // This helper filters for "Today" internally, so it won't break
      }
    } catch (error) { 
      console.error("Error fetching logs", error); 
    }
  }


// 👇 UPDATED: Fetch Last 7 Days
  async function fetchTasks() {
    try {
      const today = new Date();
      const lastWeek = subDays(today, 90); // Go back 6 days

      // Call the new Range API
      const res = await fetch(
        `/api/tasks?from=${startOfDay(lastWeek).toISOString()}&to=${endOfDay(today).toISOString()}`, 
        { cache: 'no-store' }
      );
      const data = await res.json();
      
      if (data.success) {
        setAllWeeklyTasks(data.tasks);

        // 👇 CHANGED: Removed "!t.isCompleted &&" so we keep completed tasks too
        const todaysTasks = data.tasks.filter((t: any) => isToday(new Date(t.date)));
        
        // 👇 CHANGED: Use the sort helper
        setPendingTasks(sortTasks(todaysTasks));
      }
    } catch (e) { console.error("Task fetch error", e); }
  }

  // 👇 NEW: Handle Task Completion (Disappear logic)
  async function toggleTask(id: string, currentStatus: boolean) {
    // 👇 CHANGED: Map to update status, then re-sort to move to bottom
      setPendingTasks(prev => {
        const updated = prev.map(t => t.id === id ? { ...t, isCompleted: !currentStatus } : t);
        return sortTasks(updated);
      });

      // Keep the rest of your logic (updating charts & DB)
      setAllWeeklyTasks(prev => prev.map(t => t.id === id ? { ...t, isCompleted: !currentStatus } : t));
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

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 font-sans text-foreground pb-32 md:pb-12">
      <main className="max-w-6xl mx-auto space-y-6 md:space-y-8 animate-in fade-in duration-500">
        
        {/* 1. Date Header */}
        <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground/80">
                Today, {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </h1>
        </div>

        {/* 👇 RESTORE BANNER (ADD THIS BACK) */}
        {user?.scheduledForDeletion && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 animate-in slide-in-from-top-2 mb-4">
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

        {/* 2. Quick Log (Top on Desktop) */}
        <div className="hidden md:block">
            <QuickLog value={newLogText} onChange={setNewLogText} onLog={handleAddLog} isProcessing={isProcessing} />
        </div>

        {/* 3. MIDDLE SECTION: Energy/Hydro (Left) & Tasks (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            
            {/* LEFT: Net Balance & Hydration */}
            <div className="lg:col-span-7 space-y-6 flex flex-col">
                
                {/* HERO: Energy Core */}
                <div className="bg-card border-2 border-border/60 rounded-3xl p-6 shadow-sm relative overflow-hidden flex-1 flex flex-col justify-center">
                    
                    {/* GRID LOGIC:
                        - Mobile (default): 2 columns. Net Balance takes full width (col-span-2). Rings take 1 col each.
                        - Desktop (md): 3 columns. Everything takes 1 col.
                    */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 items-center">
                        
                        {/* Middle: Net Balance (Mobile: Top / Desktop: Center) */}
                        {/* On mobile, this spans both columns (col-span-2) to sit on top */}
                        <div className="col-span-2 md:col-span-1 md:order-2">
                            <NetBalanceCard inVal={summary.in} outVal={summary.out} goal={summary.goal} />
                        </div>

                        {/* Ring 1: Calories In (Mobile: Left / Desktop: Left) */}
                        <div className="col-span-1 md:order-1 flex justify-center">
                            <EnergyRing 
                                value={summary.in} 
                                max={summary.goal} 
                                label="Consumed" 
                                color="hsl(24.6 95% 53.1%)" 
                                icon={<Cookie className="w-4 h-4"/>}
                            />
                        </div>

                        {/* Ring 2: Calories Out (Mobile: Right / Desktop: Right) */}
                        <div className="col-span-1 md:order-3 flex justify-center">
                            <EnergyRing 
                                value={summary.out} 
                                max={summary.goal + 500} 
                                label="Burned" 
                                color="#ef4444" 
                                icon={<Flame className="w-4 h-4"/>}
                            />
                        </div>
                    </div>
                </div>

                {/* Hydration */}
                <HydrationCard total={waterTotal} onAdd={handleAddWater} />
            </div>

            {/* RIGHT: Pending Tasks */}
            <div className="lg:col-span-5 flex flex-col h-full">
                <PendingTasksList tasks={pendingTasks} onToggle={toggleTask} onSubToggle={toggleSubtask} />
            </div>
        </div>

        {/* 4. BOTTOM SECTION: Quote (25%) & Chart (75%) */}
        <div className="flex flex-col gap-6">
            
            {/* Quote Banner - Full Width */}
            <div className="w-full">
                <QuoteBanner quote={quote} />
            </div>

            {/* Weekly Chart - Full Width */}
            <div className="w-full">
                <div className="bg-card border border-border/50 rounded-2xl p-4 shadow-sm">
                    <WeeklyChart logs={logs} tasks={allWeeklyTasks} />
                </div>
            </div>
        </div>

        {/* MOBILE STICKY LOG */}
        <div className="md:hidden">
             <QuickLog value={newLogText} onChange={setNewLogText} onLog={handleAddLog} isProcessing={isProcessing} />
        </div>

      </main>

      {/* Modals */}
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

      {showRestoreModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-xl shadow-2xl max-w-sm w-full p-6 text-center space-y-6">
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