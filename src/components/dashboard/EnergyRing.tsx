"use client";

interface EnergyRingProps {
  value: number;
  max: number;
  label: string;
  /** Any CSS colour, normally a token such as `var(--foreground)` or `var(--burn)`. */
  color: string;
  icon?: React.ReactNode;
  size?: number;
}

/**
 * Progress ring for a single calorie figure (consumed or burned).
 * Plain SVG — no chart library needed for one arc.
 */
export function EnergyRing({ value, max, label, color, icon, size = 132 }: EnergyRingProps) {
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = max > 0 ? Math.min(value / max, 1) : 0;

  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${label}: ${value.toLocaleString()} of ${max.toLocaleString()} kilocalories`}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
          style={{ transition: "stroke-dashoffset 900ms cubic-bezier(0.22,1,0.36,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {icon && <span className="mb-1 text-muted-foreground [&_svg]:size-4">{icon}</span>}
        <span className="numeral text-[1.6rem]">{value.toLocaleString()}</span>
        <span className="mt-1 font-mono text-[10px] text-muted-foreground">/ {max.toLocaleString()}</span>
      </div>
    </div>
  );
}
