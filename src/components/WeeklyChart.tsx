"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { parseISO, isSameDay, subDays } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

// --- CONFIGURATION ---
const chartConfig = {
  in: {
    label: "Consumed",
    color: "hsl(24.6 95% 53.1%)", // Orange
  },
  out: {
    label: "Burned",
    color: "#ef4444", // Red
  },
  done: {
    label: "Tasks Done",
    color: "#8b5cf6", // Violet
  },
  pending: {
    label: "Tasks Pending",
    color: "#eab308", // Yellow/Amber
  },
} satisfies ChartConfig;

export default function WeeklyChart({ logs, tasks = [] }: { logs: any[]; tasks?: any[] }) {
  // 1. View States
  const [activeView, setActiveView] = React.useState<"calories" | "tasks">("calories");
  
  // Sub-toggles
  const [activeCalorieMetric, setActiveCalorieMetric] = React.useState<"in" | "out">("in");
  const [activeTaskMetric, setActiveTaskMetric] = React.useState<"done" | "pending">("done");
  
  // 2. Time Range State (Default: 7 Days)
  const [timeRange, setTimeRange] = React.useState<"7d" | "30d" | "90d">("7d");

  // 3. Process Data based on Range
  const chartData = React.useMemo(() => {
    const today = new Date();
    const daysToSubtract = timeRange === "90d" ? 90 : timeRange === "30d" ? 30 : 7;
    const dataPoints = [];

    for (let i = daysToSubtract - 1; i >= 0; i--) {
      const d = subDays(today, i);
      dataPoints.push(d);
    }

    return dataPoints.map((dayDate) => {
      // Filter Logs
      const dayLogs = logs.filter((log) => {
        const logDate = typeof log.date === "string" ? parseISO(log.date) : log.date;
        return isSameDay(dayDate, logDate);
      });

      const totalIn = dayLogs.reduce((acc, log) => acc + (log.totalCaloriesIn || 0), 0);
      const totalOut = dayLogs.reduce((acc, log) => acc + (log.totalCaloriesOut || 0), 0);

      // Filter Tasks (Done vs Pending)
      const dayTasks = tasks.filter((task) => {
        const taskDateVal = task.date || task.startTime;
        if (!taskDateVal) return false;
        const taskDate = typeof taskDateVal === "string" ? parseISO(taskDateVal) : taskDateVal;
        return isSameDay(dayDate, taskDate);
      });

      const doneCount = dayTasks.filter(t => t.isCompleted).length;
      const pendingCount = dayTasks.filter(t => !t.isCompleted).length;

      return {
        date: dayDate.toISOString(),
        in: totalIn,
        out: totalOut,
        done: doneCount,
        pending: pendingCount,
      };
    });
  }, [logs, tasks, timeRange]);

  // 4. Calculate Totals (Dynamic based on range)
  const total = React.useMemo(
    () => ({
      in: chartData.reduce((acc, curr) => acc + curr.in, 0),
      out: chartData.reduce((acc, curr) => acc + curr.out, 0),
      done: chartData.reduce((acc, curr) => acc + curr.done, 0),
      pending: chartData.reduce((acc, curr) => acc + curr.pending, 0),
    }),
    [chartData]
  );

  // Helper to determine the active data key for the line
  const currentDataKey = activeView === 'calories' ? activeCalorieMetric : activeTaskMetric;

  return (
    <Card className="border-border/50 bg-card/50 shadow-sm h-full">
      <CardHeader className="flex flex-col items-stretch border-b border-border/40 p-0 sm:flex-row">
        
        {/* Title Section */}
        <div className="flex flex-1 flex-col justify-center gap-1 px-4 py-3 sm:py-4">
          <CardTitle className="text-base">History</CardTitle>
          <CardDescription className="text-xs">
            {timeRange === "7d" ? "Last 7 days" : timeRange === "30d" ? "Last 30 days" : "Last 3 months"}
          </CardDescription>
        </div>

        {/* Totals Display */}
        <div className="flex">
            {activeView === 'tasks' ? (
                <>
                    <button
                        data-active={activeTaskMetric === "done"}
                        className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-4 py-2 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-t-0 sm:border-l sm:px-6 sm:py-4 transition-all"
                        onClick={() => setActiveTaskMetric("done")}
                    >
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                            {chartConfig.done.label}
                        </span>
                        <span className="text-lg font-bold leading-none sm:text-2xl">
                            {total.done.toLocaleString()}
                        </span>
                    </button>
                    <button
                        data-active={activeTaskMetric === "pending"}
                        className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-4 py-2 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-t-0 sm:border-l sm:px-6 sm:py-4 transition-all"
                        onClick={() => setActiveTaskMetric("pending")}
                    >
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                            {chartConfig.pending.label}
                        </span>
                        <span className="text-lg font-bold leading-none sm:text-2xl">
                            {total.pending.toLocaleString()}
                        </span>
                    </button>
                </>
            ) : (
                <>
                    <button
                        data-active={activeCalorieMetric === "in"}
                        className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-4 py-2 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-t-0 sm:border-l sm:px-6 sm:py-4 transition-all"
                        onClick={() => setActiveCalorieMetric("in")}
                    >
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                        {chartConfig.in.label}
                        </span>
                        <span className="text-lg font-bold leading-none sm:text-2xl">
                        {total.in.toLocaleString()}
                        </span>
                    </button>
                    <button
                        data-active={activeCalorieMetric === "out"}
                        className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-4 py-2 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-t-0 sm:border-l sm:px-6 sm:py-4 transition-all"
                        onClick={() => setActiveCalorieMetric("out")}
                    >
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                        {chartConfig.out.label}
                        </span>
                        <span className="text-lg font-bold leading-none sm:text-2xl">
                        {total.out.toLocaleString()}
                        </span>
                    </button>
                </>
            )}
        </div>
      </CardHeader>

      <CardContent className="px-2 sm:p-4">
        
        {/* Controls Row: View Type (Left) + Time Range (Right) */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 px-2">
            
            {/* View Switcher */}
            <div className="bg-muted/50 p-0.5 rounded-lg flex gap-1">
                <button 
                    onClick={() => setActiveView("calories")}
                    className={`text-[10px] px-2 py-1 rounded-md transition-all ${activeView === 'calories' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                    Calories
                </button>
                <button 
                    onClick={() => setActiveView("tasks")}
                    className={`text-[10px] px-2 py-1 rounded-md transition-all ${activeView === 'tasks' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                    Tasks
                </button>
            </div>

            {/* Time Range Switcher */}
            <div className="bg-muted/50 p-0.5 rounded-lg flex gap-1">
                <button 
                    onClick={() => setTimeRange("7d")}
                    className={`text-[10px] px-2 py-1 rounded-md transition-all ${timeRange === '7d' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                    7D
                </button>
                <button 
                    onClick={() => setTimeRange("30d")}
                    className={`text-[10px] px-2 py-1 rounded-md transition-all ${timeRange === '30d' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                    30D
                </button>
                <button 
                    onClick={() => setTimeRange("90d")}
                    className={`text-[10px] px-2 py-1 rounded-md transition-all ${timeRange === '90d' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                    3M
                </button>
            </div>
        </div>

        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[200px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 0,
              right: 0,
              top: 5,
              bottom: 0
            }}
          >
            <CartesianGrid vertical={false} stroke="var(--border)" opacity={0.4} />
            
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                // Adjust label based on range
                if (timeRange === "7d") {
                    return date.toLocaleDateString("en-US", { weekday: "short" }); // Mon, Tue
                }
                return date.toLocaleDateString("en-US", { day: "numeric", month: "short" }); // Jun 1
              }}
              tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
            />
            
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[140px]"
                  nameKey={currentDataKey}
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            
            <Line
              dataKey={currentDataKey}
              type="monotone"
              stroke={`var(--color-${currentDataKey})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}