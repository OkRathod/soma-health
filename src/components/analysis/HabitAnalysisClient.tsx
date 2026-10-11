"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Flame, Trophy, CheckCircle2, ChevronLeft, ChevronRight, Activity, CalendarDays } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { SomaLoader as DNALoader } from "@/components/soma-loader";
import { PageShell, PageHeader, Panel, PanelHeader, StatTile, EmptyState } from "@/components/layout/page";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

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

  if (loading) return <DNALoader label="Loading your streaks" />;

  const selectedHabit = habits.find((h) => h.title === selectedTitle);

  return (
    <PageShell>
      <PageHeader
        eyebrow="Analysis"
        title={
          <>
            How your habits <em>hold</em>
          </>
        }
        description="Pick a habit to see its streaks and a month-by-month record of the days you showed up."
        actions={
          habits.length > 0 && (
            <div className="w-full md:w-[260px]">
              <label htmlFor="habit-picker" className="label-mono mb-2 block">
                Habit
              </label>
              <Select value={selectedTitle} onValueChange={setSelectedTitle}>
                <SelectTrigger id="habit-picker" className="w-full rounded-full px-4 font-medium capitalize">
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
          )
        }
        className="[&>div:last-child]:w-full md:[&>div:last-child]:w-auto"
      />

      {selectedHabit ? (
        <HabitAnalysisCard key={selectedHabit.title} habit={selectedHabit} />
      ) : (
        <EmptyState
          icon={<Activity />}
          title="No habits tracked yet"
          description="Create a habit and complete it once. Its streaks and history will show up here."
          action={
            <Button asChild variant="outline">
              <Link href="/habits">Go to habits</Link>
            </Button>
          }
        />
      )}
    </PageShell>
  );
}

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

  // Display-only figures for the month in view, derived from the same data.
  const cells = daysInMonth.map((date) => ({
    date,
    completed: isCompletedOnDate(date),
    isFutureDate: isFuture(date) && !isToday(date),
    isTodayDate: isToday(date),
  }));
  const elapsed = cells.filter((c) => !c.isFutureDate);
  const doneThisMonth = elapsed.filter((c) => c.completed).length;
  const monthRate = elapsed.length ? Math.round((doneThisMonth / elapsed.length) * 100) : 0;
  const byWeekday = WEEKDAYS.map((label, d) => {
    const days = elapsed.filter((c) => getDay(c.date) === d);
    const done = days.filter((c) => c.completed).length;
    return { label, done, total: days.length };
  });

  return (
    <div className="space-y-3 md:space-y-4">
      <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        <StatTile
          tone="lime"
          label="Current streak"
          value={habit.currentStreak}
          unit={habit.currentStreak === 1 ? "day" : "days"}
          icon={<Flame className="size-3.5" />}
        />
        <StatTile
          label="Longest streak"
          value={habit.longestStreak}
          unit={habit.longestStreak === 1 ? "day" : "days"}
          icon={<Trophy className="size-3.5" />}
        />
        <StatTile
          label="Total done"
          value={habit.totalCompletions}
          unit={habit.totalCompletions === 1 ? "day" : "days"}
          icon={<CheckCircle2 className="size-3.5" />}
        />
        <StatTile
          label={format(currentDate, "MMMM")}
          value={doneThisMonth}
          unit={`/ ${elapsed.length}`}
          hint={`${monthRate}% of days completed`}
          icon={<CalendarDays className="size-3.5" />}
        />
      </div>

      <div className="grid gap-3 md:gap-4 lg:grid-cols-12">
        {/* Monthly heatmap */}
        <Panel className="lg:col-span-7">
          <PanelHeader
            label={<span className="capitalize">{habit.title}</span>}
            title={format(currentDate, "MMMM yyyy")}
            action={
              <div className="flex gap-1.5">
                <Button variant="outline" size="icon" onClick={handlePrevMonth} aria-label="Previous month">
                  <ChevronLeft />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNextMonth}
                  disabled={isSameMonth(currentDate, new Date())}
                  aria-label="Next month"
                >
                  <ChevronRight />
                </Button>
              </div>
            }
          />

          <div className="mb-2 grid grid-cols-7 gap-1.5 sm:gap-2">
            {WEEKDAYS.map((day) => (
              <div key={day} className="label-mono text-center">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {emptyDaysPadding.map((empty) => (
              <div key={`empty-${empty}`} aria-hidden="true" />
            ))}
            {cells.map(({ date, completed, isFutureDate, isTodayDate }) => (
              <div
                key={date.toISOString()}
                title={`${format(date, "EEE, MMM d")}: ${
                  completed ? "done" : isFutureDate ? "upcoming" : "not done"
                }`}
                className={cn(
                  "grid aspect-square place-items-center rounded-xl text-[13px] tabular-nums transition-colors sm:aspect-auto sm:h-14 sm:rounded-2xl sm:text-sm",
                  completed
                    ? "bg-primary font-medium text-primary-foreground"
                    : isFutureDate
                      ? "border border-dashed border-border text-muted-foreground/60"
                      : "bg-surface text-muted-foreground",
                  isTodayDate && "ring-2 ring-foreground ring-offset-2 ring-offset-card"
                )}
              >
                {format(date, "d")}
              </div>
            ))}
          </div>

          <ul className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-4 text-[13px] text-muted-foreground">
            <li className="inline-flex items-center gap-2">
              <span className="size-3.5 rounded-[5px] bg-primary" /> Done
            </li>
            <li className="inline-flex items-center gap-2">
              <span className="size-3.5 rounded-[5px] bg-surface" /> Missed
            </li>
            <li className="inline-flex items-center gap-2">
              <span className="size-3.5 rounded-[5px] border border-dashed border-input" /> Upcoming
            </li>
            <li className="inline-flex items-center gap-2">
              <span className="size-3 rounded-[4px] bg-surface ring-2 ring-foreground ring-offset-1 ring-offset-card" /> Today
            </li>
          </ul>
        </Panel>

        {/* Month summary */}
        <Panel className="flex flex-col lg:col-span-5">
          <PanelHeader label={format(currentDate, "MMMM yyyy")} title="Consistency" />

          <p className="numeral text-5xl md:text-6xl">
            {monthRate}
            <span className="ml-1 text-base font-normal tracking-normal text-muted-foreground">%</span>
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {doneThisMonth} of {elapsed.length} day{elapsed.length === 1 ? "" : "s"} completed in{" "}
            {format(currentDate, "MMMM")}.
          </p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface" aria-hidden="true">
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-700"
              style={{ width: `${monthRate}%` }}
            />
          </div>

          <div className="mt-6 rounded-3xl bg-surface p-4 md:mt-auto md:p-5">
            <p className="label-mono">By weekday</p>
            <div className="mt-4 grid grid-cols-7 gap-1.5 sm:gap-2">
              {byWeekday.map((w, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="flex h-16 w-full max-w-9 items-end overflow-hidden rounded-lg bg-card" aria-hidden="true">
                    <div
                      className="w-full rounded-lg bg-primary transition-[height] duration-700"
                      style={{ height: `${w.total ? (w.done / w.total) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="text-[13px] tabular-nums">
                    {w.total ? w.done : "–"}
                    {w.total > 0 && <span className="text-muted-foreground">/{w.total}</span>}
                  </span>
                  <span className="label-mono">{w.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
