"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Flame,
  Trophy,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Activity,
  Sparkles,
  Utensils,
  Target,
  TrendingUp,
  CalendarDays,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  isSameDay,
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  addMonths,
  subMonths,
  isFuture,
  isToday,
  isSameMonth,
} from "date-fns";
import { DNALoader } from "@/components/soma-loader";

export default function HabitAnalysisClient({ userId }: { userId: string }) {
  const [habits, setHabits] = useState<any[]>([]);
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHabitData() {
      const res = await fetch(`/api/habits/analysis?userId=${userId}`);
      const data = await res.json();
      if (data.success && data.habits.length > 0) {
        setHabits(data.habits);
        setSelectedTitle(data.habits[0].title);
      }
      setLoading(false);
    }
    fetchHabitData();
  }, [userId]);

  if (loading) return <DNALoader />;

  const selectedHabit = habits.find((h) => h.title === selectedTitle);

  return (
    <div className="max-w-5xl mx-auto p-4 pb-28 md:p-8 md:pb-8 space-y-8 animate-fade-in">

      {/* PAGE HEADER */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Analysis</h1>
        <p className="text-muted-foreground mt-1 text-sm md:text-base">
          Your week at a glance, plus streaks and history for every habit.
        </p>
      </div>

      {/* WEEKLY RECAP */}
      <WeeklyRecap />

      {/* HABIT SELECTOR */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-border/50 pb-6">
        <div>
          <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" /> Habit Streaks
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Select a habit to view its calendar and streaks.
          </p>
        </div>

        {habits.length > 0 && (
          <div className="w-full md:w-[250px]">
            <label className="text-xs font-semibold text-muted-foreground mb-1.5 block uppercase tracking-wider">
              Select Habit
            </label>
            <Select value={selectedTitle} onValueChange={setSelectedTitle}>
              <SelectTrigger className="w-full bg-card border-border/60 shadow-sm font-medium">
                <SelectValue placeholder="Choose a habit..." />
              </SelectTrigger>
              <SelectContent>
                {habits.map((habit, idx) => (
                  <SelectItem key={idx} value={habit.title} className="capitalize">
                    {habit.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* HABIT CALENDAR */}
      <div>
        {selectedHabit ? (
          <HabitAnalysisCard key={selectedHabit.title} habit={selectedHabit} />
        ) : (
          <div className="py-16 flex flex-col items-center justify-center text-muted-foreground bg-card border border-dashed border-border/60 rounded-xl shadow-sm animate-scale-in">
            <Activity className="w-12 h-12 mb-3 opacity-20" />
            <p className="font-medium text-foreground">No habits tracked yet.</p>
            <p className="text-sm mt-1">Mark a task as a "Habit" to start analyzing your data!</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   WEEKLY RECAP CARD
============================================================ */
function WeeklyRecap() {
  const [recap, setRecap] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetch("/api/weekly-recap")
      .then((r) => r.json())
      .then((d) => {
        if (alive && d.success) setRecap(d.recap);
      })
      .catch(() => {})
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  const headline = (() => {
    if (!recap) return "";
    if (recap.logCount === 0 && recap.totalTasks === 0)
      return "A quiet week — log a meal or complete a task to kick things off.";
    const parts: string[] = [];
    if (recap.completionRate >= 70) parts.push("You're crushing your tasks");
    else if (recap.completedTasks > 0) parts.push("Steady progress on your tasks");
    if (recap.logCount >= 5) parts.push("and staying consistent with logging");
    else if (recap.logCount > 0) parts.push("and keeping an eye on nutrition");
    const base = parts.join(" ") || "Here's how your last 7 days shaped up";
    return `${base}. Keep the momentum going!`;
  })();

  return (
    <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/[0.06] via-card to-card shadow-sm animate-scale-in">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base md:text-lg">
          <span className="grid place-items-center w-8 h-8 rounded-lg bg-primary/10 text-primary">
            <Sparkles className="w-4 h-4" />
          </span>
          Weekly Recap
          <span className="ml-auto text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            Last 7 days
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-[86px] rounded-xl bg-secondary/50 shimmer" />
            ))}
          </div>
        ) : !recap ? (
          <p className="text-sm text-muted-foreground">Couldn't load your recap right now.</p>
        ) : (
          <>
            <p className="text-sm md:text-[15px] text-foreground/90 leading-relaxed italic">
              "{headline}"
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 stagger">
              <RecapStat
                icon={<Utensils className="w-4 h-4" />}
                tone="text-primary bg-primary/10"
                value={recap.logCount}
                label="Meals Logged"
              />
              <RecapStat
                icon={<CheckCircle2 className="w-4 h-4" />}
                tone="text-emerald-500 bg-emerald-500/10"
                value={`${recap.completedTasks}/${recap.totalTasks}`}
                label={`Tasks · ${recap.completionRate}%`}
              />
              <RecapStat
                icon={<Flame className="w-4 h-4" />}
                tone="text-orange-500 bg-orange-500/10"
                value={recap.caloriesOut.toLocaleString()}
                label="Kcal Burned"
              />
              <RecapStat
                icon={<TrendingUp className="w-4 h-4" />}
                tone={
                  recap.net >= 0
                    ? "text-rose-500 bg-rose-500/10"
                    : "text-emerald-500 bg-emerald-500/10"
                }
                value={`${recap.net >= 0 ? "+" : ""}${recap.net.toLocaleString()}`}
                label="Net Balance"
              />
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" /> Avg daily intake:{" "}
                <strong className="text-foreground">
                  {recap.avgDailyCalories.toLocaleString()} kcal
                </strong>
              </span>
              {recap.mostActiveDay && (
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5" /> Most active:{" "}
                  <strong className="text-foreground">{recap.mostActiveDay}</strong>
                </span>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function RecapStat({
  icon,
  value,
  label,
  tone,
}: {
  icon: ReactNode;
  value: ReactNode;
  label: string;
  tone: string;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-3.5 hover-lift">
      <div className={`grid place-items-center w-8 h-8 rounded-lg mb-2 ${tone}`}>{icon}</div>
      <p className="text-xl font-bold leading-none text-foreground">{value}</p>
      <p className="text-[11px] font-medium text-muted-foreground mt-1.5">{label}</p>
    </div>
  );
}

/* ============================================================
   HABIT CALENDAR CARD (unchanged logic, refreshed styling)
============================================================ */
function HabitAnalysisCard({ habit }: { habit: any }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const startingDayIndex = getDay(monthStart);
  const emptyDaysPadding = Array.from({ length: startingDayIndex }).map((_, i) => i);

  const isCompletedOnDate = (targetDate: Date) => {
    return (
      habit.completedDates?.some((completedDateString: string) =>
        isSameDay(new Date(completedDateString), targetDate)
      ) || false
    );
  };

  return (
    <Card className="bg-card border-border/60 shadow-sm transition-all overflow-hidden animate-fade-up">
      <CardHeader className="pb-4 border-b border-border/40 bg-secondary/10">
        <CardTitle className="text-xl font-bold text-foreground capitalize tracking-tight flex items-center justify-between">
          {habit.title} Overview
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">

          {/* LEFT: STATS */}
          <div className="w-full md:w-1/3 flex flex-col gap-4">
            <div className="relative group overflow-hidden rounded-2xl border border-orange-500/30 shadow-lg shadow-orange-500/20 transition-all hover:shadow-orange-500/40 hover-lift">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/40 via-transparent to-transparent blur-2xl opacity-70 -z-10 pointer-events-none" />
              <div className="relative z-10 p-5 flex flex-col items-center">
                <Flame className="w-6 h-6 text-orange-500 mb-2 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                <p className="text-3xl font-black text-foreground leading-none mb-1 drop-shadow-sm">{habit.currentStreak}</p>
                <p className="text-xs uppercase font-bold text-orange-500/80 tracking-wider">Current Streak</p>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-2xl border border-violet-500/30 shadow-lg shadow-violet-500/20 transition-all hover:shadow-violet-500/40 hover-lift">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-500/40 via-transparent to-transparent blur-2xl opacity-70 -z-10 pointer-events-none" />
              <div className="relative z-10 p-5 flex flex-col items-center">
                <Trophy className="w-6 h-6 text-violet-500 mb-2 drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
                <p className="text-3xl font-black text-foreground leading-none mb-1 drop-shadow-sm">{habit.longestStreak}</p>
                <p className="text-xs uppercase font-bold text-violet-500/80 tracking-wider">Longest Streak</p>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-2xl border border-emerald-500/30 shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/40 hover-lift">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/40 via-transparent to-transparent blur-2xl opacity-70 -z-10 pointer-events-none" />
              <div className="relative z-10 p-5 flex flex-col items-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 mb-2 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                <p className="text-3xl font-black text-foreground leading-none mb-1 drop-shadow-sm">{habit.totalCompletions}</p>
                <p className="text-xs uppercase font-bold text-emerald-500/80 tracking-wider">Total Done</p>
              </div>
            </div>
          </div>

          {/* RIGHT: CALENDAR */}
          <div className="w-full md:w-2/3 flex justify-center md:justify-start">
            <div className="bg-background border border-border/50 rounded-2xl p-5 md:p-6 shadow-sm w-full max-w-[400px]">
              <div className="flex items-center justify-between mb-6">
                <p className="font-bold text-base text-foreground uppercase tracking-widest">
                  {format(currentDate, "MMMM yyyy")}
                </p>
                <div className="flex gap-1.5">
                  <Button variant="outline" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={handlePrevMonth}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    onClick={handleNextMonth}
                    disabled={isSameMonth(currentDate, new Date())}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1.5 mb-2">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                  <div key={day} className="text-center text-[11px] font-bold text-muted-foreground/60 uppercase tracking-wider">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1.5">
                {emptyDaysPadding.map((empty) => (
                  <div key={`empty-${empty}`} className="aspect-square rounded-lg opacity-0" />
                ))}
                {daysInMonth.map((date) => {
                  const completed = isCompletedOnDate(date);
                  const isFutureDate = isFuture(date) && !isToday(date);
                  const isTodayDate = isToday(date);

                  return (
                    <div
                      key={date.toISOString()}
                      className={`
                        aspect-square rounded-lg flex items-center justify-center text-xs md:text-sm transition-all relative font-bold
                        ${completed
                          ? "bg-primary text-primary-foreground scale-110 shadow-[0_0_12px_var(--primary)] z-10"
                          : "bg-secondary/40 text-muted-foreground hover:bg-secondary/60 font-semibold"
                        }
                        ${isFutureDate ? "opacity-30 bg-transparent border border-dashed border-border/50 text-muted-foreground/50" : ""}
                        ${isTodayDate && !completed ? "border-2 border-primary/50 text-primary bg-primary/5" : ""}
                      `}
                    >
                      {format(date, "d")}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}