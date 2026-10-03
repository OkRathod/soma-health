"use client";

/**
 * SomaLoader — "Pulse Core".
 * A breathing core with an orbiting tracer ring. Uses theme tokens (primary),
 * respects prefers-reduced-motion (via globals.css), and works inline or
 * fullscreen. Drop-in replacement for <DNALoader />.
 *
 * Usage:
 *   <SomaLoader />                       // fullscreen overlay
 *   <SomaLoader inline size={40} />      // inline spinner
 *   <SomaLoader label="Analyzing…" />
 */
export function SomaLoader({
  size = 72,
  inline = false,
  label,
}: {
  size?: number;
  inline?: boolean;
  label?: string;
}) {
  const core = (
    <div
      className="relative grid place-items-center"
      style={{ width: size, height: size }}
      role="status"
      aria-live="polite"
      aria-label={label ?? "Loading"}
    >
      {/* Orbiting tracer ring */}
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className="absolute inset-0"
        style={{ animation: "soma-orbit 2.4s linear infinite" }}
      >
        <circle cx="50" cy="50" r="42" fill="none" stroke="var(--border)" strokeWidth="3" opacity="0.4" />
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="60 300"
          style={{ animation: "soma-trace 2.4s ease-in-out infinite" }}
        />
      </svg>

      {/* Breathing core */}
      <span
        className="rounded-full"
        style={{
          width: size * 0.34,
          height: size * 0.34,
          background: "radial-gradient(circle at 30% 30%, var(--primary), color-mix(in srgb, var(--primary) 55%, transparent))",
          boxShadow: "0 0 24px color-mix(in srgb, var(--primary) 45%, transparent)",
          animation: "soma-pulse 1.6s ease-in-out infinite",
        }}
      />
    </div>
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
    <div className="fixed inset-0 z-[100] grid place-items-center bg-background/70 backdrop-blur-md">
      <div className="flex flex-col items-center gap-4">
        {core}
        <p className="text-sm font-medium tracking-wide text-muted-foreground animate-pulse">
          {label ?? "Loading your day…"}
        </p>
      </div>
    </div>
  );
}

// Back-compat alias so existing imports of DNALoader keep working.
export const DNALoader = SomaLoader;
