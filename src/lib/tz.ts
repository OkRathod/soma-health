// src/lib/tz.ts
// Timezone-aware day boundaries WITHOUT extra deps (uses Intl).
// We store per-day rows at the UTC-midnight of the user's LOCAL calendar day,
// which is consistent with how tasks/logs are already stored via startOfDay().

/** Returns the user's local calendar date as a UTC-midnight Date. */
export function localDayStart(timezone: string, now: Date = new Date()): Date {
  const tz = safeTz(timezone);
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);

  const y = parts.find((p) => p.type === "year")!.value;
  const m = parts.find((p) => p.type === "month")!.value;
  const d = parts.find((p) => p.type === "day")!.value;
  return new Date(`${y}-${m}-${d}T00:00:00.000Z`);
}

/** Day-of-week (0=Sun..6=Sat) for a UTC-midnight day-start produced above. */
export function dayOfWeek(dayStart: Date): number {
  return dayStart.getUTCDay();
}

/** Current local hour (0-23) in a timezone — used for quiet-hours checks. */
export function localHour(timezone: string, now: Date = new Date()): number {
  const tz = safeTz(timezone);
  const h = new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    hour: "2-digit",
    hour12: false,
  }).format(now);
  return parseInt(h, 10) % 24;
}

function safeTz(tz: string): string {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: tz });
    return tz;
  } catch {
    return "UTC";
  }
}