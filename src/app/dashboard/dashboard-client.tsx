"use client";

import { useEffect, useState } from "react";
import { subDays, startOfDay, endOfDay, isToday } from "date-fns";
import { AlertTriangle, Check, Flame, Cookie, MessageSquare, Target, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SomaLoader as DNALoader } from "@/components/soma-loader";
import WeeklyChart from "@/components/WeeklyChart";

// Components
import { QuoteBanner } from "@/components/dashboard/QuoteBanner";
import { QuickLog } from "@/components/dashboard/QuickLog";
import { EnergyRing } from "@/components/dashboard/EnergyRing";
import { NetBalanceCard } from "@/components/dashboard/NetBalanceCard";
import { HydrationCard } from "@/components/dashboard/HydrationCard";
import { PendingTasksList } from "@/components/dashboard/PendingTasksList";
import { X } from "lucide-react";
import { CompleteProfileModal } from "@/components/complete-profile-modal";
import { StepTracker } from "@/components/dashboard/step-tracker";
import { toast } from "sonner"; // Assuming you have sonner installed
// Add this near your other component imports (like QuoteBanner, QuickLog, etc.)
import { ensureTodaysHabits } from "@/app/actions/habits";

export default function DashboardClient({ user }: { user: any }) {
  const USER_ID = user.id;   
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // 👇 UPDATED: Added macros to the summary state
  const [summary, setSummary] = useState({
        in: 0, out: 0,
        goal: user?.dailyCalorieGoal ?? 2000,
        protein: 0, carbs: 0, fats: 0,
        });
  
  const [waterTotal, setWaterTotal] = useState(0);
  const [isRestoring, setIsRestoring] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);

  const [allWeeklyTasks, setAllWeeklyTasks] = useState<any[]>([]); 
  const [pendingTasks, setPendingTasks] = useState<any[]>([]); 
  const [quote, setQuote] = useState({ quote: "Loading motivation...", author: "" });
  const [profileStatus, setProfileStatus] = useState<any>(null);

  const [newLogText, setNewLogText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const [chartData, setChartData] = useState<any[]>([]);
  const [stats, setStats] = useState({ calories: 0, protein: 0, carbs: 0, fats: 0, water: 0, streak: 0 });

  const [simpleModal, setSimpleModal] = useState<{ title: string; msg: string; isError?: boolean } | null>(null);
  
  // 👇 NEW: State to hold the AI Coach Feedback
  const [feedbackModal, setFeedbackModal] = useState<any | null>(null);

  useEffect(() => {
    async function checkProfile() {
      const res = await fetch("/api/profile-status");
      const data = await res.json();
      setProfileStatus(data);
    }
    checkProfile();
  }, []);

  useEffect(() => {
      // Safety net: generate today's habits from templates if the cron hasn't
      // run yet. Idempotent — safe on every load, never duplicates.
      ensureTodaysHabits(Intl.DateTimeFormat().resolvedOptions().timeZone)
        .then((r) => { if (r?.created) fetchTasks(); })
        .catch(() => {});

      Promise.all([fetchLogs(), fetchTasks()]).finally(() => setLoading(false));
  }, []);

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

  const sortTasks = (tasks: any[]) => {
    const priorityOrder: any = { HIGH: 1, MEDIUM: 2, LOW: 3, HABIT: 4 };
    return [...tasks].sort((a, b) => {
      if (a.isCompleted !== b.isCompleted) return a.isCompleted ? 1 : -1;
      const pA = priorityOrder[a.priority] || 99;
      const pB = priorityOrder[b.priority] || 99;
      return pA - pB;
    });
  };

  async function fetchLogs() {
    try {
      const today = new Date();
      const fromDate = startOfDay(subDays(today, 90)).toISOString();
      const toDate = endOfDay(today).toISOString();

      const res = await fetch(
        `/api/get-logs?from=${fromDate}&to=${toDate}`
      );
      
      const data = await res.json();

      if (res.ok && data.success) {
        setLogs(data.logs);
        calculateSummary(data.logs); 
      }
    } catch (error) { 
      console.error("Error fetching logs", error); 
    }
  }

  async function fetchTasks() {
    try {
      const today = new Date();
      const lastWeek = subDays(today, 90); 
      const res = await fetch(
        `/api/tasks?from=${startOfDay(lastWeek).toISOString()}&to=${endOfDay(today).toISOString()}`, 
        { cache: 'no-store' }
      );
      const data = await res.json();
      
      if (data.success) {
        setAllWeeklyTasks(data.tasks);
        const todaysTasks = data.tasks.filter((t: any) => isToday(new Date(t.date)));
        setPendingTasks(sortTasks(todaysTasks));
      }
    } catch (e) { console.error("Task fetch error", e); }
  }

  async function toggleTask(id: string, currentStatus: boolean) {
      setPendingTasks(prev => {
        const updated = prev.map(t => t.id === id ? { ...t, isCompleted: !currentStatus } : t);
        return sortTasks(updated);
      });
      setAllWeeklyTasks(prev => prev.map(t => t.id === id ? { ...t, isCompleted: !currentStatus } : t));
      await fetch("/api/tasks", { 
          method: "PATCH", 
          body: JSON.stringify({ taskId: id, isCompleted: !currentStatus }) 
      });
  }

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
      setShowRestoreModal(false); 
      setIsRestoring(true);
      try {
        const res = await fetch("/api/user/restore", { method: "POST" });
        if (res.ok) {
          setSimpleModal({ title: "Welcome Back!", msg: "Your account is fully active again." });
          setTimeout(() => window.location.reload(), 2000);
        } else {
          setSimpleModal({ title: "Error", msg: "Failed to restore account.", isError: true });
        }
      } catch (e) {
        setSimpleModal({ title: "Error", msg: "Server error.", isError: true });
      } finally {
        setIsRestoring(false);
      }
    }

  // 👇 UPDATED: Added Macro Parsing logic
  function calculateSummary(logs: any[]) {
    let totalIn = 0;
    let totalOut = 0;
    let water = 0;
    let totalPro = 0;
    let totalCarbs = 0;
    let totalFats = 0;
    
    const todayStr = new Date().toLocaleDateString();

    logs.forEach(log => {
      const logDateStr = new Date(log.date).toLocaleDateString();

      if (logDateStr === todayStr) {
        totalIn += log.totalCaloriesIn;
        totalOut += log.totalCaloriesOut;
        if (log.waterMl) water += log.waterMl;

        // Parse macros from the foods array
        if (log.parsedData?.foods && Array.isArray(log.parsedData.foods)) {
            log.parsedData.foods.forEach((food: any) => {
                totalPro += food.protein || 0;
                totalCarbs += food.carbs || 0;
                totalFats += food.fats || 0;
            });
        }
      }
    });

    setSummary(prev => ({ 
        ...prev, 
        in: totalIn, 
        out: totalOut, 
        protein: totalPro, 
        carbs: totalCarbs, 
        fats: totalFats 
    }));
    setWaterTotal(water);
  }

  async function handleAddWater() {
    try {
      setWaterTotal(prev => prev + 250);
      const res = await fetch("/api/log-water", {
        method: "POST",
        body: JSON.stringify({ amount: 250 }),
      });
      const data = await res.json();
      if (data.success) fetchLogs(); 
    } catch (err) {
      setSimpleModal({ title: "Error", msg: "Failed to add water log.", isError: true });
    }
  }

  // 👇 UPDATED: Handles AI Feedback Extraction & Triggers the Modal
  async function handleAddLog() {
    if (!newLogText.trim()) return;
    setIsProcessing(true);

    try {
      const res = await fetch("/api/process-log", {
        method: "POST",
        body: JSON.stringify({
          userText: newLogText,
          userTimezone: "Asia/Kolkata", 
          date: new Date().toISOString() // Pass date to ensure proper logging
        }),
      });

      const data = await res.json();
      if (data.success) {
        setNewLogText(""); 
        fetchLogs(); 
        
        if (data.log?.parsedData) {
            // Pass the entire log object to the modal
            setFeedbackModal(data.log);
        } else {
            toast.success("Log processed successfully!");
        }
      } else {
          toast.error("Failed to process log: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      setSimpleModal({ title: "Error", msg: "Failed to add log.", isError: true });
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 font-sans text-foreground pb-32 md:pb-12">
      {profileStatus && !profileStatus.isComplete && (
        <CompleteProfileModal userId={user.id} missingFields={profileStatus.missing} />
      )}

      <main className="max-w-6xl mx-auto space-y-6 md:space-y-8">
        {loading && <DNALoader />}
        
        {/* 1. Date Header */}
        <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground/80">
                Today, {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </h1>
        </div>


        {/* RESTORE BANNER */}
        {user?.scheduledForDeletion && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 ">
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
        <div className="hidden md:flex flex-col gap-2.5">
            <QuickLog value={newLogText} onChange={setNewLogText} onLog={handleAddLog} isProcessing={isProcessing} />
            
            {/* Desktop AI Disclaimer */}
            <div className="flex items-start gap-2 text-[11px] text-muted-foreground/50 italic px-2">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-70" />
                <p>
                    The values provided above are approximate estimations generated by AI and are not exact. The organization does not assume any responsibility for their absolute accuracy.
                </p>
            </div>
        </div>

        {/* 3. MIDDLE SECTION: Energy/Hydro (Left) & Tasks (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* LEFT: Net Balance & Hydration */}
            <div className="lg:col-span-7 space-y-6 flex flex-col">
                
                {/* HERO: Unified Nutrition & Energy Core */}
                <div className="bg-card border border-border/60 rounded-[2rem] p-4 sm:p-6 md:p-8 shadow-sm flex flex-col gap-6 relative overflow-hidden group">
                    
                    {/* Background Ambient Glow for the whole card */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50 pointer-events-none" />

                    {/* TOP: Calories & Balance Island */}
                    <div className="relative grid grid-cols-2 md:grid-cols-3 items-center gap-6 sm:gap-4 bg-secondary/10 p-5 sm:p-6 rounded-3xl border border-border/40 shadow-inner z-10 justify-items-center">
                        
                        {/* Net Balance Center (Spans full width on Mobile, Middle on Desktop) */}
                        <div className="col-span-2 md:col-span-1 md:order-2 w-full flex justify-center relative z-10">
                            <NetBalanceCard inVal={summary.in} outVal={summary.out} goal={summary.goal} />
                        </div>

                        {/* Consumed Ring + Glow (Left side on mobile and desktop) */}
                        <div className="col-span-1 md:order-1 flex flex-col items-center gap-3 relative w-full">
                            <div className="absolute inset-0 bg-orange-500/20 blur-2xl rounded-full scale-110 opacity-40 mix-blend-screen pointer-events-none" />
                            <span className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-widest relative z-10">Consumed</span>
                            <div className="relative z-10 drop-shadow-[0_0_12px_rgba(249,115,22,0.3)]">
                                <EnergyRing 
                                    value={summary.in} 
                                    max={summary.goal} 
                                    label="" 
                                    color="hsl(24.6 95% 53.1%)" 
                                    icon={<Cookie className="w-4 h-4 sm:w-5 sm:h-5"/>}
                                />
                            </div>
                        </div>

                        {/* Burned Ring + Glow (Right side on mobile and desktop) */}
                        <div className="col-span-1 md:order-3 flex flex-col items-center gap-3 relative w-full">
                            <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full scale-110 opacity-40 mix-blend-screen pointer-events-none" />
                            <span className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-widest relative z-10">Burned</span>
                            <div className="relative z-10 drop-shadow-[0_0_12px_rgba(239,68,68,0.3)]">
                                <EnergyRing 
                                    value={summary.out} 
                                    max={summary.goal + 500} 
                                    label="" 
                                    color="#ef4444" 
                                    icon={<Flame className="w-4 h-4 sm:w-5 sm:h-5"/>}
                                />
                            </div>
                        </div>
                    </div>

                    {/* BOTTOM: Vibrant Macro Tracker */}
                    <div className="grid grid-cols-3 gap-3 md:gap-5 relative z-10">
                        {/* Protein Glow Box */}
                        <div className="relative overflow-hidden bg-blue-500/10 border border-blue-500/30 rounded-2xl md:rounded-3xl p-4 md:p-5 flex flex-col items-center justify-center text-blue-600 dark:text-blue-400 shadow-lg shadow-blue-500/10 transition-all hover:scale-[1.03] hover:shadow-blue-500/20">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent opacity-60 pointer-events-none" />
                            <span className="text-[9px] md:text-xs font-bold uppercase tracking-widest mb-1.5 opacity-80 relative z-10">Protein</span>
                            <span className="text-2xl md:text-4xl font-black tabular-nums leading-none relative z-10 drop-shadow-sm">
                                {Math.round(summary.protein)}<span className="text-xs md:text-sm font-semibold opacity-70 ml-0.5">g</span>
                            </span>
                        </div>

                        {/* Carbs Glow Box */}
                        <div className="relative overflow-hidden bg-emerald-500/10 border border-emerald-500/30 rounded-2xl md:rounded-3xl p-4 md:p-5 flex flex-col items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-lg shadow-emerald-500/10 transition-all hover:scale-[1.03] hover:shadow-emerald-500/20">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent opacity-60 pointer-events-none" />
                            <span className="text-[9px] md:text-xs font-bold uppercase tracking-widest mb-1.5 opacity-80 relative z-10">Carbs</span>
                            <span className="text-2xl md:text-4xl font-black tabular-nums leading-none relative z-10 drop-shadow-sm">
                                {Math.round(summary.carbs)}<span className="text-xs md:text-sm font-semibold opacity-70 ml-0.5">g</span>
                            </span>
                        </div>

                        {/* Fats Glow Box */}
                        <div className="relative overflow-hidden bg-amber-500/10 border border-amber-500/30 rounded-2xl md:rounded-3xl p-4 md:p-5 flex flex-col items-center justify-center text-amber-600 dark:text-amber-400 shadow-lg shadow-amber-500/10 transition-all hover:scale-[1.03] hover:shadow-amber-500/20">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent opacity-60 pointer-events-none" />
                            <span className="text-[9px] md:text-xs font-bold uppercase tracking-widest mb-1.5 opacity-80 relative z-10">Fats</span>
                            <span className="text-2xl md:text-4xl font-black tabular-nums leading-none relative z-10 drop-shadow-sm">
                                {Math.round(summary.fats)}<span className="text-xs md:text-sm font-semibold opacity-70 ml-0.5">g</span>
                            </span>
                        </div>
                    </div>

                    {/* 👇 NEW: AI Disclaimer (Mobile Only) tucked inside the card */}
                    <div className="md:hidden mt-2 pt-4 border-t border-border/40 flex items-start gap-2 text-[10px] text-muted-foreground/50 italic relative z-10">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-70" />
                        <p className="leading-snug">
                            The values provided above are approximate estimations generated by AI and are not exact. The organization does not assume any responsibility for their absolute accuracy.
                        </p>
                    </div>

                </div>

                <HydrationCard total={waterTotal} onAdd={handleAddWater} />
                <StepTracker />
            </div>

            {/* RIGHT: Pending Tasks (Strict Fixed Height) */}
            <div className="lg:col-span-5 flex flex-col h-[600px] overflow-hidden rounded-3xl bg-card border border-border/60 shadow-sm">
                <div className="h-full overflow-y-auto pr-1 pb-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-border/50 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-border">
                    <PendingTasksList tasks={pendingTasks} onToggle={toggleTask} onSubToggle={toggleSubtask} />
                </div>
            </div>
        </div>

        {/* 4. BOTTOM SECTION: Quote (25%) & Chart (75%) */}
        <div className="flex flex-col gap-6">
            <div className="w-full">
                <QuoteBanner quote={quote} />
            </div>

            <div className="w-full">
                <div className="bg-card border border-border/50 rounded-2xl p-4 shadow-sm">
                    {/* The logs passed down here now natively contain macros for the chart to use */}
                    <WeeklyChart logs={logs} tasks={allWeeklyTasks} />
                </div>
            </div>
        </div>

        {/* MOBILE STICKY LOG & DISCLAIMER */}
        <div className="md:hidden flex flex-col gap-3">
             <QuickLog value={newLogText} onChange={setNewLogText} onLog={handleAddLog} isProcessing={isProcessing} />
             
             {/* Mobile AI Disclaimer */}
             <div className="flex items-start gap-2 text-[10px] text-muted-foreground/50 italic px-2 mb-4">
                 <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5 opacity-70" />
                 <p leading-tight>
                     The values provided above are approximate estimations generated by AI and are not exact. The organization does not assume any responsibility for their absolute accuracy.
                 </p>
             </div>
        </div>

      </main>

      {/* --- MODALS --- */}

      {/* 👇 AI COACH FEEDBACK REPORT MODAL */}
      {feedbackModal && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="bg-card border border-primary/30 rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-in zoom-in-95 max-h-[90vh] overflow-y-auto overflow-x-hidden">
                  
                  <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-primary" /> Log Analysis
                  </h3>
                  
                  <div className="space-y-4 mb-6">
                      {/* Coach Feedback */}
                      {(feedbackModal.aiFeedback || feedbackModal.parsedData?.ai_feedback) && (
                          <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                              <p className="text-sm italic text-muted-foreground leading-relaxed">
                                  "{feedbackModal.aiFeedback || feedbackModal.parsedData.ai_feedback}"
                              </p>
                          </div>
                      )}

                      {/* Next Step */}
                      {feedbackModal.parsedData?.next_step && (
                          <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
                              <div className="font-bold text-emerald-600 dark:text-emerald-500 flex items-center gap-2 mb-1 text-sm uppercase tracking-wider">
                                  <Target className="w-4 h-4 shrink-0" /> Next Step
                              </div>
                              <p className="text-sm font-medium text-foreground leading-snug">
                                  {feedbackModal.parsedData.next_step}
                              </p>
                          </div>
                      )}

                      {/* Calories Summary */}
                      <div className="grid grid-cols-2 gap-3">
                          <div className="bg-secondary/30 p-3 rounded-lg flex items-center justify-between border border-border/50">
                              <span className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1.5"><Utensils className="w-3.5 h-3.5" /> In</span>
                              <span className="font-bold text-orange-500">{feedbackModal.totalCaloriesIn} kcal</span>
                          </div>
                          <div className="bg-secondary/30 p-3 rounded-lg flex items-center justify-between border border-border/50">
                              <span className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1.5"><Flame className="w-3.5 h-3.5" /> Out</span>
                              <span className="font-bold text-red-500">{feedbackModal.totalCaloriesOut} kcal</span>
                          </div>
                      </div>

                      {/* Foods Processed */}
                      {feedbackModal.parsedData?.foods?.length > 0 && (
                          <div>
                              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Items Tracked</h4>
                              <div className="divide-y divide-border/50 border border-border/50 rounded-xl overflow-hidden bg-background">
                                  {feedbackModal.parsedData.foods.map((food: any, i: number) => (
                                      <div key={i} className="p-3 flex flex-col gap-1 text-sm">
                                          <div className="flex justify-between items-start">
                                              <span className="font-semibold">{food.name}</span>
                                              <span className="font-bold text-orange-500">{food.calories} kcal</span>
                                          </div>
                                          <div className="flex gap-3 text-xs text-muted-foreground">
                                              <span>Pro: <strong className="text-foreground">{food.protein}g</strong></span>
                                              <span>Carbs: <strong className="text-foreground">{food.carbs}g</strong></span>
                                              <span>Fat: <strong className="text-foreground">{food.fats}g</strong></span>
                                          </div>
                                      </div>
                                  ))}
                              </div>
                          </div>
                      )}
                  </div>
                  
                  <div className="flex justify-end pt-4 border-t border-border/50">
                      <Button onClick={() => setFeedbackModal(null)} className="px-8 font-bold w-full sm:w-auto">
                          Done
                      </Button>
                  </div>
              </div>
          </div>
      )}

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