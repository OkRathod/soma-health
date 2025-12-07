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
    // Create an empty map for the last 7 days
    const last7Days = new Map();
    const today = new Date();
    
    // Initialize last 7 days with 0
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateKey = d.toISOString().split('T')[0]; // "2025-12-08"
      last7Days.set(dateKey, {
        day: days[d.getDay()], // "Mon"
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
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-800">Weekly Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 12 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 12 }} 
              />
              <Tooltip 
                cursor={{ fill: '#f1f5f9' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }}/>
              
              {/* Calories In (Dark Blue) */}
              <Bar 
                dataKey="in" 
                name="Calories In" 
                fill="#0f172a" 
                radius={[4, 4, 0, 0]} 
                barSize={20}
              />
              
              {/* Calories Out (Green) */}
              <Bar 
                dataKey="out" 
                name="Calories Burned" 
                fill="#10b981" 
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