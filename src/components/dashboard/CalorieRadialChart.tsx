"use client";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { 
  Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart, PolarAngleAxis 
} from "recharts";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";

export function CalorieRadialChart({ current, goal }: { current: number; goal: number }) {
  const chartData = [{ activity: "calories", value: current, fill: "var(--color-calories)" }];
  
  const chartConfig = {
    calories: { label: "Calories", color: "hsl(24.6 95% 53.1%)" },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col bg-card border-border/60 shadow-sm hover:shadow-md transition-all">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">Calories In</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <RadialBarChart data={chartData} startAngle={90} endAngle={450} innerRadius={80} outerRadius={110}>
            <PolarAngleAxis type="number" domain={[0, goal]} angleAxisId={0} tick={false} />
            <PolarGrid gridType="circle" radialLines={false} stroke="none" className="first:fill-muted/20 last:fill-background" polarRadius={[86, 74]} />
            <RadialBar dataKey="value" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-4xl font-bold">
                          {current.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground text-sm">
                          / {goal.toLocaleString()} kcal
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          {current > goal ? (
            <span className="text-red-500 flex items-center gap-1">Over goal by {current - goal} <TrendingUp className="h-4 w-4" /></span>
          ) : (
            <span className="text-emerald-500 flex items-center gap-1">{goal - current} remaining</span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}