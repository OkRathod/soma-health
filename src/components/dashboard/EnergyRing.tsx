"use client";

import { 
  Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart, PolarAngleAxis 
} from "recharts";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";

interface EnergyRingProps {
  value: number;
  max: number;
  label: string;
  color: string;
  icon?: React.ReactNode;
}

export function EnergyRing({ value, max, label, color, icon }: EnergyRingProps) {
  const chartData = [{ activity: "energy", value: value, fill: color }];
  const chartConfig = { energy: { label: label, color: color } } satisfies ChartConfig;

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="relative z-10">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[140px] w-[140px]">
          <RadialBarChart 
            data={chartData} 
            startAngle={90} 
            endAngle={90 + 360} 
            innerRadius={55} 
            outerRadius={75}
          >
            {/* Background Track */}
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted/5 last:fill-background"
              polarRadius={[60, 50]} 
            />
            
            {/* Scale Axis */}
            <PolarAngleAxis type="number" domain={[0, max]} angleAxisId={0} tick={false} />
            
            {/* Data Bar */}
            <RadialBar 
              dataKey="value" 
              background 
              cornerRadius={20} 
              fill={color}
            />
            
            {/* Center Text */}
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        
                        {/* 1. Main Value */}
                        <tspan 
                            x={viewBox.cx} 
                            y={(viewBox.cy || 0) - 6} 
                            className="fill-foreground text-xl font-bold tracking-tighter"
                        >
                          {value.toLocaleString()}
                        </tspan>

                        {/* 2. Goal (New) */}
                        <tspan 
                            x={viewBox.cx} 
                            y={(viewBox.cy || 0) + 12} 
                            className="fill-muted-foreground text-[10px] font-medium"
                        >
                           / {max.toLocaleString()}
                        </tspan>

                        {/* 3. Label */}
                        <tspan 
                            x={viewBox.cx} 
                            y={(viewBox.cy || 0) + 26} 
                            className="fill-muted-foreground text-[9px] uppercase tracking-widest opacity-70"
                        >
                          {label}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </div>

      {/* Floating Icon */}
      {icon && (
        <div className="absolute -bottom-3 p-1.5 bg-card rounded-full shadow border border-border/50 text-muted-foreground/80">
            {icon}
        </div>
      )}
    </div>
  );
}