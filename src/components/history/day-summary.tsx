"use client";

import { Droplets, Flame, Footprints, Utensils } from "lucide-react";
import { StatTile } from "@/components/layout/page";

/**
 * Totals for the selected day, derived from that day's logs:
 * calories in / out, water, steps and a macro split.
 */
export function DaySummary({ logs, steps }: { logs: any[]; steps: number }) {
  let caloriesIn = 0;
  let caloriesOut = 0;
  let water = 0;
  let protein = 0;
  let carbs = 0;
  let fats = 0;

  logs.forEach((log) => {
    caloriesIn += log.totalCaloriesIn || 0;
    caloriesOut += log.totalCaloriesOut || 0;
    water += log.waterMl || 0;
    if (Array.isArray(log.parsedData?.foods)) {
      log.parsedData.foods.forEach((food: any) => {
        protein += Number(food.protein) || 0;
        carbs += Number(food.carbs) || 0;
        fats += Number(food.fats) || 0;
      });
    }
  });

  const macros = [
    { key: "protein", label: "Protein", value: protein, color: "var(--protein)" },
    { key: "carbs", label: "Carbs", value: carbs, color: "var(--carbs)" },
    { key: "fats", label: "Fats", value: fats, color: "var(--fats)" },
  ];
  const macroTotal = protein + carbs + fats;

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-12">
      <StatTile
        className="lg:col-span-2"
        tone="ink"
        label="Eaten"
        icon={<Utensils className="size-3.5" />}
        value={caloriesIn.toLocaleString()}
        unit="kcal"
      />
      <StatTile
        className="lg:col-span-2"
        label="Burned"
        icon={<Flame className="size-3.5 text-burn" />}
        value={caloriesOut.toLocaleString()}
        unit="kcal"
      />
      <StatTile
        className="lg:col-span-2"
        label="Water"
        icon={<Droplets className="size-3.5 text-water" />}
        value={water.toLocaleString()}
        unit="ml"
      />
      <StatTile
        className="lg:col-span-2"
        label="Steps"
        icon={<Footprints className="size-3.5 text-energy" />}
        value={steps.toLocaleString()}
      />

      <div className="col-span-2 flex min-h-[128px] flex-col justify-between gap-4 rounded-3xl bg-surface p-4 md:p-5 lg:col-span-4">
        <div className="flex h-2 gap-0.5 overflow-hidden rounded-full bg-card" aria-hidden="true">
          {macroTotal > 0 &&
            macros.map((m) => (
              <span
                key={m.key}
                className="h-full rounded-full"
                style={{ width: `${(m.value / macroTotal) * 100}%`, background: m.color }}
              />
            ))}
        </div>
        <dl className="grid grid-cols-3 gap-3">
          {macros.map((m) => (
            <div key={m.key} className="min-w-0">
              <dt className="label-mono flex items-center gap-1.5">
                <span className="size-2 shrink-0 rounded-full" style={{ background: m.color }} />
                {m.label}
              </dt>
              <dd className="numeral mt-2 text-3xl md:text-[2.25rem]">
                {Math.round(m.value)}
                <span className="ml-0.5 text-sm font-normal tracking-normal text-muted-foreground">g</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
