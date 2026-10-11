"use client";

import { useEffect, useState } from "react";
import { subDays, startOfDay, endOfDay, isToday } from "date-fns";
import { AlertTriangle, Check, Cookie, Flame, Info, Target, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { SomaLoader } from "@/components/soma-loader";
import WeeklyChart from "@/components/WeeklyChart";
import { PageShell, PageHeader } from "@/components/layout/page";

import { QuoteBanner } from "@/components/dashboard/QuoteBanner";
import { QuickLog } from "@/components/dashboard/QuickLog";
import { EnergyRing } from "@/components/dashboard/EnergyRing";
import { NetBalanceCard } from "@/components/dashboard/NetBalanceCard";
import { HydrationCard } from "@/components/dashboard/HydrationCard";
import { PendingTasksList } from "@/components/dashboard/PendingTasksList";
import { StepTracker } from "@/components/dashboard/step-tracker";
import { CompleteProfileModal } from "@/components/complete-profile-modal";
import { ensureTodaysHabits } from "@/app/actions/habits";

const AI_DISCLAIMER =
  "Calorie and macro values are AI estimates and are approximate. Somafit does not guarantee their accuracy.";

/** Overlay + sheet used by the three small dashboard dialogs. Bottom sheet on phones, centred from `sm`. */
function Sheet({ children, onClose, wide }: { children: React.ReactNode; onClose?: () => void; wide?: boolean }) {
  return (
    <div
      className="fixed inset-0 z-[150] grid place-items-end bg-[var(--overlay)] backdrop-blur-[3px] animate-fade-in sm:place-items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative max-h-[90dvh] w-full overflow-y-auto rounded-t-[2rem] border border-border bg-card p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-float animate-scale-in sm:rounded-3xl ${wide ? "sm:max-w-lg" : "sm:max-w-sm"}`}
      >
        {children}
      </div>
    </div>
  );
}

function greeting(hour: number) {
  if (hour < 5) return "Still up";
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function DashboardClient({ user }: { user: any }) {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // UPDATED: Added macros to the summary state
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
  
  // NEW: State to hold the AI Coach Feedback
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

  // UPDATED: Added Macro Parsing logic
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

  // UPDATED: Handles AI Feedback Extraction & Triggers the Modal
  async function handleAddLog() {
    if (!newLogText.trim()) return;
    setIsProcessing(true);

    try {
      const res = await fetch("/api/process-log", {
        method: "POST",
        body: JSON.stringify({
          userText: newLogText,
          userTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Kolkata",
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

  // Rendered after mount only, so server and client never disagree about "now".
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);

  const macros = [
    { key: "protein", label: "Protein", value: summary.protein, color: "var(--protein)" },
    { key: "carbs", label: "Carbs", value: summary.carbs, color: "var(--carbs)" },
    { key: "fats", label: "Fats", value: summary.fats, color: "var(--fats)" },
  ];
  const macroTotal = macros.reduce((a, m) => a + m.value, 0);

  return (
    <PageShell>
      {profileStatus && !profileStatus.isComplete && (
        <CompleteProfileModal userId={user.id} missingFields={profileStatus.missing} />
      )}
      {loading && <SomaLoader />}

      <PageHeader
        eyebrow={
          now
            ? now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
            : "Today"
        }
        title={
          <>
            {now ? greeting(now.getHours()) : "Welcome back"}. <em>Here&apos;s today.</em>
          </>
        }
      />

      <div className="space-y-3 md:space-y-4">
        {/* Account-deletion notice */}
        {user?.scheduledForDeletion && (
          <div className="flex flex-col gap-4 rounded-3xl border border-destructive/30 bg-priority-high-bg p-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 size-5 shrink-0 text-destructive" />
              <div>
                <p className="font-medium text-destructive">Account scheduled for deletion</p>
                <p className="mt-0.5 text-sm text-foreground/80">
                  You have until{" "}
                  <span className="font-medium">{new Date(user.scheduledForDeletion).toLocaleDateString()}</span> to
                  restore it.
                </p>
              </div>
            </div>
            <Button
              onClick={() => setShowRestoreModal(true)}
              disabled={isRestoring}
              variant="destructive"
              className="w-full md:w-auto"
            >
              {isRestoring ? "Restoring…" : "Undo deletion"}
            </Button>
          </div>
        )}

        {/* 1 — Composer */}
        <QuickLog value={newLogText} onChange={setNewLogText} onLog={handleAddLog} isProcessing={isProcessing} />

        {/* 2 — Energy (left) and today's plan (right) */}
        <div className="grid gap-3 md:gap-4 lg:grid-cols-12">
          <section className="panel flex flex-col gap-6 p-5 md:p-6 lg:col-span-7">
            <div className="grid gap-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-6">
              <NetBalanceCard inVal={summary.in} outVal={summary.out} goal={summary.goal} />

              <div className="flex items-start justify-around gap-4 sm:flex-col sm:justify-start sm:gap-5">
                <div className="flex flex-col items-center gap-2.5">
                  <EnergyRing
                    value={summary.in}
                    max={summary.goal}
                    label="Consumed"
                    color="var(--foreground)"
                    icon={<Cookie />}
                  />
                  <span className="label-mono">Consumed</span>
                </div>
                <div className="flex flex-col items-center gap-2.5">
                  <EnergyRing
                    value={summary.out}
                    max={summary.goal + 500}
                    label="Burned"
                    color="var(--burn)"
                    icon={<Flame />}
                  />
                  <span className="label-mono">Burned</span>
                </div>
              </div>
            </div>

            {/* Macros: one split bar + three figures */}
            <div className="rounded-3xl bg-surface p-4 md:p-5">
              <div className="flex h-2 gap-0.5 overflow-hidden rounded-full bg-card" aria-hidden="true">
                {macroTotal > 0 &&
                  macros.map((m) => (
                    <span
                      key={m.key}
                      className="h-full rounded-full transition-[width] duration-700"
                      style={{ width: `${(m.value / macroTotal) * 100}%`, background: m.color }}
                    />
                  ))}
              </div>
              <dl className="mt-4 grid grid-cols-3 gap-3">
                {macros.map((m) => (
                  <div key={m.key}>
                    <dt className="label-mono flex items-center gap-1.5">
                      <span className="size-2 rounded-full" style={{ background: m.color }} />
                      {m.label}
                    </dt>
                    <dd className="numeral mt-2 text-3xl md:text-4xl">
                      {Math.round(m.value)}
                      <span className="ml-0.5 text-sm font-normal tracking-normal text-muted-foreground">g</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
              <Info className="mt-0.5 size-3.5 shrink-0" />
              {AI_DISCLAIMER}
            </p>
          </section>

          <div className="h-[520px] lg:col-span-5 lg:h-auto lg:min-h-[560px]">
            <div className="h-full lg:relative">
              <div className="h-full lg:absolute lg:inset-0">
                <PendingTasksList tasks={pendingTasks} onToggle={toggleTask} onSubToggle={toggleSubtask} />
              </div>
            </div>
          </div>
        </div>

        {/* 3 — Water, steps, quote */}
        <div className="grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
          <HydrationCard total={waterTotal} onAdd={handleAddWater} goal={user?.waterGoal ?? 2500} />
          <StepTracker />
          <div className="sm:col-span-2 lg:col-span-1">
            <QuoteBanner quote={quote} />
          </div>
        </div>

        {/* 4 — Trends */}
        <WeeklyChart logs={logs} tasks={allWeeklyTasks} />
      </div>

      {/* ---------- Dialogs ---------- */}

      {/* AI analysis of the entry that was just logged */}
      {feedbackModal && (
        <Sheet wide onClose={() => setFeedbackModal(null)}>
          <p className="eyebrow">Log analysis</p>
          <h3 className="display mt-3 text-4xl">Logged.</h3>

          <div className="mt-5 space-y-3">
            {(feedbackModal.aiFeedback || feedbackModal.parsedData?.ai_feedback) && (
              <p className="rounded-2xl bg-surface p-4 text-[15px] leading-relaxed">
                {feedbackModal.aiFeedback || feedbackModal.parsedData.ai_feedback}
              </p>
            )}

            {feedbackModal.parsedData?.next_step && (
              <div className="rounded-2xl bg-lime p-4 text-lime-foreground">
                <p className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] opacity-70">
                  <Target className="size-3.5" /> Next step
                </p>
                <p className="mt-1.5 text-[15px] font-medium leading-snug">{feedbackModal.parsedData.next_step}</p>
              </div>
            )}

            <dl className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-border p-4">
                <dt className="label-mono">In</dt>
                <dd className="numeral mt-2 text-2xl">
                  {feedbackModal.totalCaloriesIn}
                  <span className="ml-1 text-xs font-normal tracking-normal text-muted-foreground">kcal</span>
                </dd>
              </div>
              <div className="rounded-2xl border border-border p-4">
                <dt className="label-mono">Out</dt>
                <dd className="numeral mt-2 text-2xl text-burn">
                  {feedbackModal.totalCaloriesOut}
                  <span className="ml-1 text-xs font-normal tracking-normal text-muted-foreground">kcal</span>
                </dd>
              </div>
            </dl>

            {feedbackModal.parsedData?.foods?.length > 0 && (
              <div>
                <p className="label-mono mb-2">Items tracked</p>
                <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border">
                  {feedbackModal.parsedData.foods.map((food: any, i: number) => (
                    <li key={i} className="p-3.5 text-sm">
                      <div className="flex items-start justify-between gap-3">
                        <span className="font-medium">{food.name}</span>
                        <span className="shrink-0 tabular-nums">{food.calories} kcal</span>
                      </div>
                      <p className="mt-1 flex gap-3 text-xs text-muted-foreground">
                        <span>P {food.protein}g</span>
                        <span>C {food.carbs}g</span>
                        <span>F {food.fats}g</span>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <Button onClick={() => setFeedbackModal(null)} size="lg" className="mt-6 w-full">
            Done
          </Button>
        </Sheet>
      )}

      {simpleModal && (
        <Sheet onClose={() => setSimpleModal(null)}>
          <button
            onClick={() => setSimpleModal(null)}
            aria-label="Close"
            className="absolute right-4 top-4 grid size-9 place-items-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <X className="size-4" />
          </button>
          <div className="flex items-start gap-4 pr-8">
            <span
              className={`grid size-11 shrink-0 place-items-center rounded-full ${
                simpleModal.isError ? "bg-priority-high-bg text-destructive" : "bg-lime text-lime-foreground"
              }`}
            >
              {simpleModal.isError ? <AlertTriangle className="size-5" /> : <Check className="size-5" />}
            </span>
            <div>
              <h3 className="text-lg font-medium tracking-[-0.02em]">{simpleModal.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{simpleModal.msg}</p>
            </div>
          </div>
          <Button
            onClick={() => setSimpleModal(null)}
            variant={simpleModal.isError ? "destructive" : "default"}
            className="mt-6 w-full sm:ml-auto sm:flex sm:w-auto"
          >
            Okay
          </Button>
        </Sheet>
      )}

      {showRestoreModal && (
        <Sheet onClose={() => setShowRestoreModal(false)}>
          <h3 className="display text-3xl">Restore your account?</h3>
          <p className="mt-2 text-sm text-muted-foreground">This cancels the deletion and keeps all your data.</p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={() => setShowRestoreModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleRestoreAccount}>Yes, restore</Button>
          </div>
        </Sheet>
      )}
    </PageShell>
  );
}
