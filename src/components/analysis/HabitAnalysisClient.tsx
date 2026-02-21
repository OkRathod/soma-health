"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, Trophy, CheckCircle2, ChevronLeft, ChevronRight, Activity } from "lucide-react";
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
  isSameMonth
} from "date-fns";
import { DNALoader } from "../dna-loader";

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

  const selectedHabit = habits.find(h => h.title === selectedTitle);

  return (
    <div className="max-w-5xl mx-auto p-4 pb-28 md:p-8 md:pb-8 space-y-6 animate-in fade-in duration-500">
      
      {/* HEADER & DROPDOWN */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-border/40 pb-6">
          {/* <div>
              <h1 className="text-3xl font-bold tracking-tight">Habit Analysis</h1>
              <p className="text-muted-foreground mt-1">Select a habit to view your streaks and history.</p>
          </div> */}

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
      
      {/* MAIN CONTENT AREA */}
      <div>
        {selectedHabit ? (
          <HabitAnalysisCard key={selectedHabit.title} habit={selectedHabit} />
        ) : (
          <div className="py-16 flex flex-col items-center justify-center text-muted-foreground bg-card border border-dashed border-border/60 rounded-xl shadow-sm">
            <Activity className="w-12 h-12 mb-3 opacity-20" />
            <p className="font-medium text-foreground">No habits tracked yet.</p>
            <p className="text-sm mt-1">Mark a task as a "Habit" to start analyzing your data!</p>
          </div>
        )}
      </div>
    </div>
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
    return habit.completedDates?.some((completedDateString: string) => 
      isSameDay(new Date(completedDateString), targetDate)
    ) || false; 
  };

  return (
    <Card className="bg-card border-border/60 shadow-sm transition-all overflow-hidden">
      <CardHeader className="pb-4 border-b border-border/40 bg-secondary/5">
        <CardTitle className="text-xl font-bold text-foreground capitalize tracking-wide flex items-center justify-between">
          {habit.title} Overview
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
            
          {/* LEFT SIDE: VERTICAL STATS WITH GLOW (Unchanged) */}
          <div className="w-full md:w-1/3 flex flex-col gap-4">
            {/* ... (Keep the existing glowing stats code here) ... */}
            <div className="relative group overflow-hidden rounded-2xl border border-orange-500/30 shadow-lg shadow-orange-500/20 transition-all hover:shadow-orange-500/40">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/40 via-transparent to-transparent blur-2xl opacity-70 -z-10 pointer-events-none" />
              <div className="relative z-10 p-5 flex flex-col items-center">
                <Flame className="w-6 h-6 text-orange-500 mb-2 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                <p className="text-3xl font-black text-foreground leading-none mb-1 drop-shadow-sm">{habit.currentStreak}</p>
                <p className="text-xs uppercase font-bold text-orange-500/80 tracking-wider">Current Streak</p>
               </div>
            </div>
            <div className="relative group overflow-hidden rounded-2xl border border-violet-500/30 shadow-lg shadow-violet-500/20 transition-all hover:shadow-violet-500/40">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-500/40 via-transparent to-transparent blur-2xl opacity-70 -z-10 pointer-events-none" />
               <div className="relative z-10 p-5 flex flex-col items-center">
                <Trophy className="w-6 h-6 text-violet-500 mb-2 drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
                <p className="text-3xl font-black text-foreground leading-none mb-1 drop-shadow-sm">{habit.longestStreak}</p>
                <p className="text-xs uppercase font-bold text-violet-500/80 tracking-wider">Longest Streak</p>
               </div>
            </div>
            <div className="relative group overflow-hidden rounded-2xl border border-emerald-500/30 shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/40">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/40 via-transparent to-transparent blur-2xl opacity-70 -z-10 pointer-events-none" />
               <div className="relative z-10 p-5 flex flex-col items-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 mb-2 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                <p className="text-3xl font-black text-foreground leading-none mb-1 drop-shadow-sm">{habit.totalCompletions}</p>
                <p className="text-xs uppercase font-bold text-emerald-500/80 tracking-wider">Total Done</p>
               </div>
            </div>
          </div>

          {/* RIGHT SIDE: COMPACT CALENDAR WITH GLOW & SPARKLE */}
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
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <div key={day} className="text-center text-[11px] font-bold text-muted-foreground/60 uppercase tracking-wider">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1.5">
                {emptyDaysPadding.map(empty => (
                  <div key={`empty-${empty}`} className="aspect-square rounded-lg opacity-0" />
                ))}
                {daysInMonth.map(date => {
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
                      {/* ✨ The Sparkle Animation ✨ */}
                      {/* {completed && (
                        <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/80 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                        </span>
                      )} */}
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