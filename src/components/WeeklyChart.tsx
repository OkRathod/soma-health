"use client";

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

// Helper to format date as "Mon", "Tue"
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function WeeklyChart({ logs }: { logs: any[] }) {
  // 1. Process Data: Group logs by Date
  const chartData = processLogs(logs);

  function processLogs(logs: any[]) {
    const last7Days = new Map();
    const today = new Date();
    
    // Initialize last 7 days with 0
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateKey = d.toISOString().split('T')[0];
      last7Days.set(dateKey, {
        day: days[d.getDay()],
        in: 0,
        out: 0
      });
    }

    // Fill in actual data
    logs.forEach(log => {
      const dateKey = new Date(log.date).toISOString().split('T')[0];
      if (last7Days.has(dateKey)) {
        const entry = last7Days.get(dateKey);
        entry.in += log.totalCaloriesIn;
        entry.out += log.totalCaloriesOut;
      }
    });

    return Array.from(last7Days.values());
  }

  return (
    // 1. REPLACED: border-slate-200 -> border-border, added bg-card
    <Card className="border-border bg-card shadow-sm">
      <CardHeader>
        {/* 2. REPLACED: text-slate-800 -> text-card-foreground */}
        <CardTitle className="text-lg font-semibold text-card-foreground">Weekly Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              
              {/* 3. REPLACED: stroke="#e2e8f0" -> stroke="var(--border)" */}
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                // 4. REPLACED: fill: '#64748b' -> fill: 'var(--muted-foreground)'
                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                // 5. REPLACED: fill: '#64748b' -> fill: 'var(--muted-foreground)'
                tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} 
              />
              
              <Tooltip 
                // 6. REPLACED: fill: '#f1f5f9' -> fill: 'var(--muted)'
                cursor={{ fill: 'var(--muted)' }}
                // We manually set the tooltip background to match the theme
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
              {/* 7. REPLACED: fill="#0f172a" -> fill="var(--primary)" */}
              <Bar 
                dataKey="in" 
                name="Calories In" 
                fill="var(--primary)" 
                radius={[4, 4, 0, 0]} 
                barSize={20}
              />
              
              {/* Calories Out (Success/Green) */}
              {/* 8. REPLACED: fill="#10b981" -> fill="var(--success)" */}
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