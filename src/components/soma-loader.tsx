"use client";

/**
 * SomaLoader — the app's only loading indicator.
 * A thin ink ring with a lime tracer. Works inline or as a full-screen veil.
 * The veil is deliberately light (no heavy blur) so the page underneath stays
 * readable while data arrives.
 *
 *   <SomaLoader />                    // full-screen veil
 *   <SomaLoader inline size={32} />   // inline spinner
 *   <SomaLoader label="Analysing…" />
 */
export function SomaLoader({
  size = 44,
  inline = false,
  label,
}: {
  size?: number;
  inline?: boolean;
  label?: string;
}) {
  const core = (
    <span
      className="relative inline-grid place-items-center"
      style={{ width: size, height: size }}
      role="status"
      aria-live="polite"
      aria-label={label ?? "Loading"}
    >
      <svg viewBox="0 0 48 48" width={size} height={size} style={{ animation: "soma-orbit 0.9s linear infinite" }}>
        <circle cx="24" cy="24" r="20" fill="none" stroke="var(--border)" strokeWidth="4" />
        <circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke="var(--foreground)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="34 126"
        />
      </svg>
      <span className="absolute size-1.5 rounded-full bg-lime ring-1 ring-foreground/20" />
    </span>
  );

  if (inline) {
    return (
      <span className="inline-flex items-center gap-3">
        {core}
        {label && <span className="text-sm text-muted-foreground">{label}</span>}
      </span>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-background/75 backdrop-blur-[2px] animate-fade-in">
      <div className="flex flex-col items-center gap-4">
        {core}
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          {label ?? "Loading your day"}
        </p>
      </div>
    </div>
  );
}

// Back-compat alias so existing imports of DNALoader keep working.
export const DNALoader = SomaLoader;
