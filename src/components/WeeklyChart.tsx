"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { parseISO, isSameDay, subDays } from "date-fns";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Segmented } from "@/components/layout/page";
import { cn } from "@/lib/utils";

// Series colours come from design tokens so the chart follows the theme.
const chartConfig = {
  in: { label: "Consumed", color: "var(--foreground)" },
  out: { label: "Burned", color: "var(--burn)" },
  done: { label: "Tasks done", color: "var(--success)" },
  pending: { label: "Tasks pending", color: "var(--energy)" },
  protein: { label: "Protein", color: "var(--protein)" },
  carbs: { label: "Carbs", color: "var(--carbs)" },
  fats: { label: "Fats", color: "var(--fats)" },
} satisfies ChartConfig;

type MetricKey = keyof typeof chartConfig;

/** Selectable total. The active one decides which series the chart draws. */
function MetricButton({
  active,
  onClick,
  label,
  value,
  unit,
  color,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  value: string;
  unit?: string;
  color: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "min-w-[7.5rem] flex-1 rounded-2xl border px-4 py-3 text-left transition-colors",
        active ? "border-foreground/70 bg-card" : "border-transparent bg-surface hover:border-border"
      )}
    >
      <span className="label-mono flex items-center gap-2">
        <span className="size-2 rounded-full" style={{ background: color }} />
        {label}
      </span>
      <span className="numeral mt-2 block text-2xl sm:text-[1.75rem]">
        {value}
        {unit && <span className="ml-0.5 text-sm font-normal tracking-normal text-muted-foreground">{unit}</span>}
      </span>
    </button>
  );
}

export default function WeeklyChart({ logs, tasks = [] }: { logs: any[]; tasks?: any[] }) {
  // 1. View state
  const [activeView, setActiveView] = React.useState<"calories" | "macros" | "tasks">("calories");
  
  // Sub-toggles
  const [activeCalorieMetric, setActiveCalorieMetric] = React.useState<"in" | "out">("in");
  const [activeTaskMetric, setActiveTaskMetric] = React.useState<"done" | "pending">("done");
  const [activeMacroMetric, setActiveMacroMetric] = React.useState<"protein" | "carbs" | "fats">("protein");
  
  // 2. Time Range State
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

      // Macros are summed from each log's parsed foods
      let dailyProtein = 0;
      let dailyCarbs = 0;
      let dailyFats = 0;

      dayLogs.forEach((log) => {
        if (log.parsedData?.foods && Array.isArray(log.parsedData.foods)) {
          log.parsedData.foods.forEach((food: any) => {
            dailyProtein += food.protein || 0;
            dailyCarbs += food.carbs || 0;
            dailyFats += food.fats || 0;
          });
        }
      });

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
        protein: dailyProtein,
        carbs: dailyCarbs,
        fats: dailyFats,
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
      protein: chartData.reduce((acc, curr) => acc + curr.protein, 0),
      carbs: chartData.reduce((acc, curr) => acc + curr.carbs, 0),
      fats: chartData.reduce((acc, curr) => acc + curr.fats, 0),
    }),
    [chartData]
  );

  // Helper to determine the active data key for the line
  const currentDataKey = 
    activeView === 'calories' ? activeCalorieMetric : 
    activeView === 'macros' ? activeMacroMetric : 
    activeTaskMetric;

  const metrics: { key: MetricKey; value: string; unit?: string; onClick: () => void }[] =
    activeView === "tasks"
      ? [
          { key: "done", value: total.done.toLocaleString(), onClick: () => setActiveTaskMetric("done") },
          { key: "pending", value: total.pending.toLocaleString(), onClick: () => setActiveTaskMetric("pending") },
        ]
      : activeView === "macros"
        ? [
            { key: "protein", value: Math.round(total.protein).toLocaleString(), unit: "g", onClick: () => setActiveMacroMetric("protein") },
            { key: "carbs", value: Math.round(total.carbs).toLocaleString(), unit: "g", onClick: () => setActiveMacroMetric("carbs") },
            { key: "fats", value: Math.round(total.fats).toLocaleString(), unit: "g", onClick: () => setActiveMacroMetric("fats") },
          ]
        : [
            { key: "in", value: total.in.toLocaleString(), unit: "kcal", onClick: () => setActiveCalorieMetric("in") },
            { key: "out", value: total.out.toLocaleString(), unit: "kcal", onClick: () => setActiveCalorieMetric("out") },
          ];

  const rangeLabel = timeRange === "7d" ? "Last 7 days" : timeRange === "30d" ? "Last 30 days" : "Last 3 months";

  return (
    <section className="panel p-5 md:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="label-mono">Trends</p>
          <h2 className="mt-2 text-lg font-medium tracking-[-0.02em]">{rangeLabel}</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Segmented
            size="sm"
            value={activeView}
            onChange={setActiveView}
            options={[
              { value: "calories", label: "Calories" },
              { value: "macros", label: "Macros" },
              { value: "tasks", label: "Tasks" },
            ]}
          />
          <Segmented
            size="sm"
            value={timeRange}
            onChange={setTimeRange}
            options={[
              { value: "7d", label: "7D" },
              { value: "30d", label: "30D" },
              { value: "90d", label: "3M" },
            ]}
          />
        </div>
      </div>

      <div className="no-scrollbar -mx-1 mt-5 flex gap-2 overflow-x-auto px-1">
        {metrics.map((m) => (
          <MetricButton
            key={m.key}
            active={currentDataKey === m.key}
            onClick={m.onClick}
            label={chartConfig[m.key].label}
            value={m.value}
            unit={m.unit}
            color={chartConfig[m.key].color}
          />
        ))}
      </div>

      <ChartContainer config={chartConfig} className="mt-5 aspect-auto h-[220px] w-full">
        <AreaChart accessibilityLayer data={chartData} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
          <defs>
            <linearGradient id="soma-trend-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={`var(--color-${currentDataKey})`} stopOpacity={0.16} />
              <stop offset="100%" stopColor={`var(--color-${currentDataKey})`} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="2 4" />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            minTickGap={32}
            tickFormatter={(value) => {
              const date = new Date(value);
              if (timeRange === "7d") return date.toLocaleDateString("en-US", { weekday: "short" });
              return date.toLocaleDateString("en-US", { day: "numeric", month: "short" });
            }}
            tick={{ fontSize: 11, fill: "var(--muted-foreground)", fontFamily: "var(--font-mono)" }}
          />
          <ChartTooltip
            cursor={{ stroke: "var(--foreground)", strokeOpacity: 0.25, strokeDasharray: "3 3" }}
            content={
              <ChartTooltipContent
                className="w-[150px]"
                nameKey={currentDataKey}
                labelFormatter={(value) =>
                  new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                }
                formatter={(value, name) => {
                  const suffix = activeView === "macros" ? "g" : "";
                  return [
                    <span key={name as string} className="font-medium tabular-nums">
                      {Math.round(value as number)}
                      {suffix}
                    </span>,
                    chartConfig[name as keyof typeof chartConfig]?.label || name,
                  ];
                }}
              />
            }
          />
          <Area
            dataKey={currentDataKey}
            type="monotone"
            stroke={`var(--color-${currentDataKey})`}
            strokeWidth={2}
            fill="url(#soma-trend-fill)"
            dot={timeRange === "7d" ? { r: 3, strokeWidth: 0, fill: `var(--color-${currentDataKey})` } : false}
            activeDot={{ r: 5, strokeWidth: 2, stroke: "var(--card)" }}
          />
        </AreaChart>
      </ChartContainer>
    </section>
  );
}
