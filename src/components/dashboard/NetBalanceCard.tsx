"use client";

import { Activity, BatteryCharging, BatteryWarning, Zap } from "lucide-react";

interface NetBalanceProps {
  inVal: number;
  outVal: number;
  goal: number;
}

/**
 * Headline number of the dashboard: calories in minus calories out, plus a
 * one-line verdict. Pure presentation — the thresholds below are the whole
 * "engine".
 */
export function NetBalanceCard({ inVal, outVal, goal }: NetBalanceProps) {
  const net = inVal - outVal;

  let status = "Balanced";
  let Icon = Activity;
  let tone = "bg-surface text-foreground";
  let message = "You're balanced today. Keep it here for good recovery.";

  if (net < -600) {
    status = "Under-fuelled";
    Icon = BatteryWarning;
    tone = "bg-priority-medium-bg text-priority-medium";
    message = "Output is high. A small carb-rich meal would steady your energy.";
  } else if (inVal > goal + 300) {
    status = "Surplus";
    Icon = Zap;
    tone = "bg-priority-high-bg text-priority-high";
    message = "You're past today's intake goal. Some light movement helps rebalance.";
  } else if (net > -200 && net < 400) {
    status = "In the zone";
    Icon = BatteryCharging;
    tone = "bg-lime text-lime-foreground";
  }

  const remaining = Math.max(goal - inVal, 0);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-3">
        <p className="label-mono">Net balance</p>
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${tone}`}>
          <Icon className="size-3.5" />
          {status}
        </span>
      </div>

      <p className="numeral mt-5 text-[4.25rem] sm:text-[5.5rem]">
        {net > 0 ? "+" : net < 0 ? "−" : ""}
        {Math.abs(net).toLocaleString()}
        <span className="ml-2 text-base font-normal tracking-normal text-muted-foreground">kcal</span>
      </p>

      <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">{message}</p>

      <dl className="mt-auto grid grid-cols-2 border-t border-border pt-4 text-sm">
        <div>
          <dt className="label-mono">Goal</dt>
          <dd className="mt-1.5 font-medium tabular-nums">{goal.toLocaleString()} kcal</dd>
        </div>
        <div className="border-l border-border pl-4">
          <dt className="label-mono">Left to eat</dt>
          <dd className="mt-1.5 font-medium tabular-nums">{remaining.toLocaleString()} kcal</dd>
        </div>
      </dl>
    </div>
  );
}
