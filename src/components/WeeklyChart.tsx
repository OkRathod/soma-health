"use client";

import { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Make sure you have shadcn tabs

// 👇 Update props to accept 'tasks'
export default function WeeklyChart({ logs, tasks = [] }: { logs: any[], tasks?: any[] }) {
  
  const [viewMode, setViewMode] = useState<"calories" | "tasks">("calories");

  // 1. Process Data: Group logs AND tasks by Date
  const chartData = useMemo(() => {
    const today = new Date();
    const last7Days = [];

    // A. Initialize last 7 days
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      last7Days.push(d);
    }

    // B. Group data
    return last7Days.map(dayDate => {
      // Create local date string key (e.g., "Mon Dec 08 2025")
      const dateStr = dayDate.toDateString(); 

      // 1. Calculate Calories
      const dayLogs = logs.filter(log => new Date(log.date).toDateString() === dateStr);
      const totalIn = dayLogs.reduce((acc, log) => acc + log.totalCaloriesIn, 0);
      const totalOut = dayLogs.reduce((acc, log) => acc + log.totalCaloriesOut, 0);

      // 2. Calculate Tasks (Count ONLY completed tasks for this day)
      // We look at the 'date' field of the task, assuming tasks have a 'date' field
      const completedTasksCount = tasks.filter(task => {
        // Ensure task is completed AND matches the date
        const taskDate = new Date(task.date || task.startTime); // Handle potential date field variance
        return task.isCompleted && taskDate.toDateString() === dateStr;
      }).length;

      return {
        day: dayDate.toLocaleDateString('en-US', { weekday: 'short' }), // "Mon"
        in: totalIn,
        out: totalOut,
        tasks: completedTasksCount,
        fullDate: dateStr
      };
    });
  }, [logs, tasks]); // Re-run when logs OR tasks change

  return (
    <Card className="border-border bg-card shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold text-card-foreground">Weekly Progress</CardTitle>
        
        {/* 👇 TOGGLE SWITCH */}
        <Tabs defaultValue="calories" onValueChange={(val) => setViewMode(val as any)} className="w-auto">
            <TabsList className="grid w-full grid-cols-2 h-8">
                <TabsTrigger value="calories" className="text-xs px-2">Calories</TabsTrigger>
                <TabsTrigger value="tasks" className="text-xs px-2">Tasks</TabsTrigger>
            </TabsList>
        </Tabs>
      </CardHeader>
      
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} 
                // Allow integers only for tasks view
                allowDecimals={viewMode === 'calories'}
              />
              
              <Tooltip 
                cursor={{ fill: 'var(--muted)' }}
                contentStyle={{ 
                    borderRadius: '8px', 
                    border: '1px solid var(--border)', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    backgroundColor: 'var(--card)',
                    color: 'var(--card-foreground)'
                }}
              />
              <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }}/>
              
              {/* CONDITIONAL RENDERING BASED ON TOGGLE */}
              {viewMode === 'calories' ? (
                <>
                    <Bar 
                        dataKey="in" 
                        name="Calories In" 
                        fill="var(--primary)" 
                        radius={[4, 4, 0, 0]} 
                        barSize={20}
                        animationDuration={500}
                    />
                    <Bar 
                        dataKey="out" 
                        name="Calories Burned" 
                        fill="#10b981" // Hardcoded emerald-500 for safety, or use var(--success)
                        radius={[4, 4, 0, 0]} 
                        barSize={20}
                        animationDuration={500}
                    />
                </>
              ) : (
                <Bar 
                    dataKey="tasks" 
                    name="Tasks Completed" 
                    fill="#8b5cf6" // Violet color for tasks
                    radius={[4, 4, 0, 0]} 
                    barSize={30}
                    animationDuration={500}
                />
              )}

            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}