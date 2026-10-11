import { cn } from "@/lib/utils";

/**
 * Somafit brand lockup.
 * `SomaMark` is the standalone glyph: a lime tile with an ink "S" stroke, so it
 * reads on paper, ink and photo backgrounds alike. `Logo` pairs it with the
 * serif wordmark, which inherits `currentColor`.
 */
export function SomaMark({ className, size = 28 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      <rect width="32" height="32" rx="10" fill="var(--lime)" />
      <path
        d="M21.5 11.2c-1.2-1.6-3.1-2.5-5.4-2.5-3.1 0-5.3 1.7-5.3 4.1 0 5 10.6 2.300 10.600 7.700 0 2.300-2.200 4-5.300 4-2.500 0-4.600-1-5.800-2.800"
        stroke="#171713"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({
  className,
  size = 28,
  showWordmark = true,
}: {
  className?: string;
  size?: number;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <SomaMark size={size} />
      {showWordmark && (
        <span
          className="font-display leading-none tracking-[-0.02em]"
          style={{ fontSize: Math.round(size * 0.82) }}
        >
          Somafit
        </span>
      )}
    </span>
  );
}
