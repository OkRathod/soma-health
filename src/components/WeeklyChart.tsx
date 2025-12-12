"use client";

import { useMemo } from "react";
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

export default function WeeklyChart({ logs }: { logs: any[] }) {
  
  // 1. Process Data: Group logs by Date using Local Timezone
  // We use useMemo so this heavy calculation only runs when 'logs' change
  const chartData = useMemo(() => {
    const today = new Date();
    const last7Days = [];

    // A. Initialize last 7 days (Empty Array)
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      last7Days.push(d);
    }

    // B. Group data
    return last7Days.map(dayDate => {
      // Create a key based on LOCAL browser time (e.g., "Mon Dec 08 2025")
      // This is crucial. DB stores UTC, but we want to group by what the USER sees.
      const dateStr = dayDate.toDateString(); 

      // Find logs that match this specific local date string
      const dayLogs = logs.filter(log => new Date(log.date).toDateString() === dateStr);

      // Sum values
      const totalIn = dayLogs.reduce((acc, log) => acc + log.totalCaloriesIn, 0);
      const totalOut = dayLogs.reduce((acc, log) => acc + log.totalCaloriesOut, 0);

      return {
        day: dayDate.toLocaleDateString('en-US', { weekday: 'short' }), // "Mon", "Tue"
        in: totalIn,
        out: totalOut,
        fullDate: dateStr // helpful for debugging if needed
      };
    });
  }, [logs]);

  return (
    <Card className="border-border bg-card shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-card-foreground">Weekly Progress</CardTitle>
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
              
              {/* Calories In (Primary) */}
              <Bar 
                dataKey="in" 
                name="Calories In" 
                fill="var(--primary)" 
                radius={[4, 4, 0, 0]} 
                barSize={20}
              />
              
              {/* Calories Out (Success/Green) */}
              <Bar 
                dataKey="out" 
                name="Calories Burned" 
                fill="var(--success)" 
                radius={[4, 4, 0, 0]} 
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}