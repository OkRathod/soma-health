import { useState, useEffect } from "react";
import { differenceInSeconds, intervalToDuration, formatDuration } from "date-fns";

export function useCountdown(targetDate: Date | null | string) {
  const [timeLeft, setTimeLeft] = useState("");
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!targetDate) return;

    const tick = () => {
      const now = new Date();
      const end = new Date(targetDate);
      const diff = differenceInSeconds(end, now);

      if (diff <= 0) {
        setIsExpired(true);
        setTimeLeft("00:00:00");
        return;
      }

      const duration = intervalToDuration({ start: now, end: end });

      // 👇 FIX: Added Years and Months to the display logic
      const formatted = [
        duration.years ? `${duration.years}y` : "",
        duration.months ? `${duration.months}mo` : "",
        duration.days ? `${duration.days}d` : "",
        duration.hours ? `${duration.hours}h` : "",
        duration.minutes ? `${duration.minutes}m` : "",
        `${duration.seconds || 0}s`
      ].filter(Boolean).join(" "); // Joins them with spaces

      setTimeLeft(formatted);
    };

    tick(); // Run immediately
    const timer = setInterval(tick, 1000); // Update every second

    return () => clearInterval(timer);
  }, [targetDate]);

  return { timeLeft, isExpired };
}