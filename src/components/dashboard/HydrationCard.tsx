"use client";

import { Droplets, Plus } from "lucide-react";

/**
 * Water intake for today. One tap adds a 250 ml glass. `goal` defaults to
 * 2.5 L and is overridden by the user's own water goal when the dashboard
 * passes it in.
 */
export function HydrationCard({
  total,
  onAdd,
  goal = 2500,
}: {
  total: number;
  onAdd: () => void;
  goal?: number;
}) {
  const glasses = Math.max(Math.ceil(goal / 250), 1);
  const filled = Math.min(Math.floor(total / 250), glasses);
  const litres = (total / 1000).toFixed(total % 1000 === 0 ? 0 : 2).replace(/0$/, "");

  return (
    <section className="panel flex flex-col p-5 md:p-6">
      <div className="flex items-center justify-between">
        <p className="label-mono flex items-center gap-2">
          <Droplets className="size-3.5 text-water" /> Water
        </p>
        <span className="font-mono text-[11px] text-muted-foreground">goal {(goal / 1000).toString()} L</span>
      </div>

      <p className="numeral mt-5 text-5xl">
        {litres}
        <span className="ml-1.5 text-base font-normal tracking-normal text-muted-foreground">L</span>
      </p>

      {/* One cell per 250 ml glass */}
      <div
        className="mt-5 grid gap-1"
        style={{ gridTemplateColumns: `repeat(${glasses}, minmax(0, 1fr))` }}
        role="img"
        aria-label={`${filled} of ${glasses} glasses`}
      >
        {Array.from({ length: glasses }).map((_, i) => (
          <span
            key={i}
            className={`h-7 rounded-md transition-colors duration-500 ${i < filled ? "bg-water" : "bg-surface"}`}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={onAdd}
        className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border text-sm font-medium transition-colors hover:border-foreground/30 hover:bg-accent press md:mt-auto"
      >
        <Plus className="size-4" /> Add 250 ml
      </button>
    </section>
  );
}
