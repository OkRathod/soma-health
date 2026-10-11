"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CalendarClock, Flame, History, LayoutDashboard, StickyNote, Timer } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type Media = { type: "video" | "image"; url: string; label: string };

const S3 = "https://somafit-01.s3.ap-south-1.amazonaws.com";

/** One entry per product area. `media` plays in order, then the tour advances. */
const slides: { id: number; title: string; description: string; icon: typeof Flame; media: Media[] }[] = [
  {
    id: 1,
    title: "Command centre",
    description:
      "Calories in and out, macros, water and steps — plus what's still on your plate today — on one screen.",
    icon: LayoutDashboard,
    media: [
      { type: "video", url: `${S3}/dashboard.mp4`, label: "Walkthrough" },
      { type: "image", url: `${S3}/dashboard-3.png`, label: "Overview" },
      { type: "image", url: `${S3}/dashboard-2.png`, label: "AI feedback" },
      { type: "image", url: `${S3}/dashboard-1.png`, label: "Weekly chart" },
      { type: "image", url: `${S3}/dashboard-4.png`, label: "Steps" },
      { type: "image", url: `${S3}/dashboard-5.png`, label: "Tasks" },
    ],
  },
  {
    id: 2,
    title: "24-hour timeline",
    description: "Lay tasks, habits and focus blocks across the day and see where the free time really is.",
    icon: CalendarClock,
    media: [
      { type: "image", url: `${S3}/tasks-1.png`, label: "Habit blocks" },
      { type: "image", url: `${S3}/tasks-2.png`, label: "Task blocks" },
    ],
  },
  {
    id: 3,
    title: "Deep analysis",
    description: "Streaks and a monthly heatmap turn daily discipline into something you can actually see.",
    icon: Flame,
    media: [
      { type: "video", url: `${S3}/analysis-video.mp4`, label: "Heatmap" },
      { type: "image", url: `${S3}/analysis.png`, label: "Consistency" },
    ],
  },
  {
    id: 4,
    title: "Deadline manager",
    description: "Due dates become live countdowns with subtasks, so the important things stay loud.",
    icon: Timer,
    media: [
      { type: "video", url: `${S3}/deadlines-video.mp4`, label: "Active projects" },
      { type: "image", url: `${S3}/deadline-2.png`, label: "Projects" },
      { type: "image", url: `${S3}/deadline-1.png`, label: "Countdowns" },
    ],
  },
  {
    id: 5,
    title: "Rich notes",
    description: "A distraction-free editor for routines, journals and plans — right next to the data.",
    icon: StickyNote,
    media: [{ type: "image", url: `${S3}/notes.png`, label: "Daily journal" }],
  },
  {
    id: 6,
    title: "Complete history",
    description: "A chronological logbook of everything you ate, moved and finished. Scroll back any time.",
    icon: History,
    media: [
      { type: "image", url: `${S3}/history-2.png`, label: "Logbook" },
      { type: "image", url: `${S3}/history-1.png`, label: "Diet" },
      { type: "image", url: `${S3}/history-3.png`, label: "Tasks" },
    ],
  },
];

const IMAGE_MS = 4500;

/**
 * Product tour: a numbered list on the left drives a framed media stage on the
 * right. Auto-advances; pauses while hovered or when the tab is hidden.
 */
export function FeatureSlider() {
  const [activeId, setActiveId] = useState(1);
  const [inner, setInner] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const raf = useRef<number | null>(null);

  const slide = slides.find((s) => s.id === activeId)!;
  const media = slide.media[inner];

  const next = useCallback(() => {
    setProgress(0);
    if (inner >= slide.media.length - 1) {
      setActiveId((id) => (id === slides.length ? 1 : id + 1));
      setInner(0);
    } else {
      setInner((i) => i + 1);
    }
  }, [inner, slide.media.length]);

  // Timer for still images (videos drive progress from onTimeUpdate).
  useEffect(() => {
    if (media.type === "video" || paused) return;
    let start: number | null = null;
    const from = progress;
    const tick = (t: number) => {
      if (start === null) start = t;
      const p = from + ((t - start) / IMAGE_MS) * 100;
      if (p >= 100) {
        next();
        return;
      }
      setProgress(p);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, inner, paused, media.type]);

  const select = (id: number) => {
    setActiveId(id);
    setInner(0);
    setProgress(0);
  };

  return (
    <section id="tour" className="scroll-mt-24 px-4 pb-20 pt-32 sm:px-6 md:pb-28 md:pt-40 lg:px-10">
      <div className="mx-auto max-w-[1320px]">
        <Reveal className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-4">Product tour</p>
            <h2 className="display max-w-2xl text-[2.6rem] sm:text-6xl">
              See the whole day <em>at a glance.</em>
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-muted-foreground">
            Six views, one login. Pick an area to look around — or leave it running.
          </p>
        </Reveal>

        <Reveal>
          <div
            className="grid gap-3 lg:grid-cols-12 lg:gap-4"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Index */}
            <ol className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:col-span-4 lg:mx-0 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:px-0">
              {slides.map((s, i) => {
                const active = s.id === activeId;
                const Icon = s.icon;
                return (
                  <li key={s.id} className="shrink-0 lg:shrink">
                    <button
                      type="button"
                      onClick={() => select(s.id)}
                      aria-pressed={active}
                      className={cn(
                        "group relative flex w-full items-start gap-3.5 overflow-hidden rounded-full border px-4 py-2.5 text-left transition-colors duration-300 lg:rounded-3xl lg:p-5",
                        active
                          ? "border-transparent bg-ink text-ink-foreground"
                          : "border-border bg-card text-foreground hover:border-foreground/25"
                      )}
                    >
                      <span
                        className={cn(
                          "hidden font-mono text-[11px] tracking-[0.1em] lg:block lg:pt-1",
                          active ? "text-lime" : "text-muted-foreground"
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2 whitespace-nowrap text-sm font-medium lg:text-lg lg:tracking-[-0.02em]">
                          <Icon className={cn("size-4 lg:hidden", active && "text-lime")} />
                          {s.title}
                        </span>
                        <span
                          className={cn(
                            "hidden overflow-hidden text-sm leading-relaxed transition-[max-height,opacity,margin] duration-500 lg:block",
                            active ? "mt-2 max-h-28 text-ink-foreground/65 opacity-100" : "max-h-0 opacity-0"
                          )}
                        >
                          {s.description}
                        </span>
                      </span>
                      <Icon
                        className={cn(
                          "hidden size-5 shrink-0 lg:block",
                          active ? "text-lime" : "text-muted-foreground"
                        )}
                      />
                      {active && (
                        <span
                          aria-hidden="true"
                          className="absolute bottom-0 left-0 hidden h-[3px] bg-lime lg:block"
                          style={{ width: `${((inner + progress / 100) / slide.media.length) * 100}%` }}
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ol>

            {/* Stage */}
            <div className="lg:col-span-8">
              <div className="panel-ink relative overflow-hidden p-2 sm:p-3">
                <div className="flex items-center justify-between px-2 pb-2.5 pt-1 sm:px-3">
                  <div className="flex gap-1.5" aria-hidden="true">
                    <span className="size-2.5 rounded-full bg-white/15" />
                    <span className="size-2.5 rounded-full bg-white/15" />
                    <span className="size-2.5 rounded-full bg-lime" />
                  </div>
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-white/55">
                    {slide.title} · {media.label}
                  </p>
                </div>

                <div className="relative aspect-[16/10] overflow-hidden rounded-[1.1rem] bg-black sm:rounded-[1.4rem]">
                  {slides.map((s) =>
                    s.media.map((m, idx) => {
                      const show = s.id === activeId && idx === inner;
                      // Only mount the active slide's media; neighbours stay unloaded.
                      if (s.id !== activeId) return null;
                      return (
                        <div
                          key={`${s.id}-${idx}`}
                          className={cn(
                            "absolute inset-0 transition-opacity duration-700",
                            show ? "opacity-100" : "pointer-events-none opacity-0"
                          )}
                        >
                          {m.type === "video" ? (
                            <video
                              ref={(el) => {
                                if (!el) return;
                                if (show) el.play().catch(() => {});
                                else {
                                  el.pause();
                                  el.currentTime = 0;
                                }
                              }}
                              src={m.url}
                              muted
                              playsInline
                              preload="metadata"
                              className="h-full w-full object-contain"
                              onTimeUpdate={(e) => {
                                const v = e.currentTarget;
                                if (show && v.duration) setProgress((v.currentTime / v.duration) * 100);
                              }}
                              onEnded={next}
                            />
                          ) : (
                            <Image
                              src={m.url}
                              alt={`${s.title} — ${m.label}`}
                              fill
                              sizes="(min-width: 1024px) 60vw, 100vw"
                              className="object-contain"
                            />
                          )}
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Media scrubber */}
                <div className="flex items-center gap-1.5 px-2 pb-1 pt-3 sm:px-3">
                  {slide.media.map((m, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setInner(idx);
                        setProgress(0);
                      }}
                      aria-label={`Show ${m.label}`}
                      className="group relative h-6 flex-1"
                    >
                      <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-white/15">
                        <span
                          className="block h-full rounded-full bg-lime"
                          style={{ width: idx < inner ? "100%" : idx === inner ? `${progress}%` : "0%" }}
                        />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground lg:hidden">{slide.description}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
