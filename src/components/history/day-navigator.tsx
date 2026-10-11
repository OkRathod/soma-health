"use client";

import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const stepButton =
  "grid size-10 shrink-0 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent disabled:opacity-45";

/**
 * Day picker for the History toolbar: previous day, calendar popover, next day.
 * Days that have at least one log carry a small dot in the calendar.
 */
export function DayNavigator({
  date,
  onChange,
  daysWithHistory,
}: {
  date: Date | undefined;
  onChange: (date: Date | undefined) => void;
  daysWithHistory: Date[];
}) {
  return (
    <div className="flex shrink-0 items-center gap-1.5">
      <button
        type="button"
        aria-label="Previous day"
        disabled={!date}
        onClick={() => date && onChange(addDays(date, -1))}
        className={stepButton}
      >
        <ChevronLeft className="size-4" />
      </button>

      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              "inline-flex h-10 min-w-0 flex-1 items-center gap-2 whitespace-nowrap rounded-full border border-border bg-card px-4 text-sm font-medium transition-colors hover:bg-accent",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="size-4 text-muted-foreground" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
            <ChevronDown className="ml-auto size-4 text-muted-foreground" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto rounded-3xl border-border p-1 shadow-float" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onChange}
            initialFocus
            fromYear={2024}
            toYear={new Date().getFullYear() + 5}
            modifiers={{ hasHistory: daysWithHistory }}
            modifiersClassNames={{
              hasHistory:
                "font-medium after:absolute after:bottom-1 after:left-1/2 after:size-1 after:-translate-x-1/2 after:rounded-full after:bg-current relative",
            }}
          />
        </PopoverContent>
      </Popover>

      <button
        type="button"
        aria-label="Next day"
        disabled={!date}
        onClick={() => date && onChange(addDays(date, 1))}
        className={stepButton}
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
}
