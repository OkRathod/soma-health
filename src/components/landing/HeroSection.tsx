"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Droplets, Flame, Footprints, Sparkles, Timer } from "lucide-react";
import { ArrowLink } from "@/components/ui/arrow-link";
import { InstallPWA } from "@/components/install-pwa";

const ease = [0.22, 1, 0.36, 1] as const;

/* ---------------------------------------------------------------------------
   Product vignettes. These are real UI fragments drawn in code (not
   screenshots) so the hero always matches the shipped design system.
--------------------------------------------------------------------------- */

type Tone = "paper" | "ink" | "lime";
const shellTone: Record<Tone, string> = {
  paper: "border-black/5 bg-[#fbfaf6] text-[#171713]",
  ink: "border-white/10 bg-[#171713] text-[#f3f2ec]",
  lime: "border-black/10 bg-[#d4f560] text-[#171713]",
};

function CardShell({ children, tone = "paper" }: { children: React.ReactNode; tone?: Tone }) {
  return (
    <div
      className={`w-[236px] shrink-0 rounded-[1.6rem] border p-4 shadow-[0_24px_60px_-18px_rgba(0,0,0,0.55)] ${shellTone[tone]}`}
    >
      {children}
    </div>
  );
}

function BalanceCard() {
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <CardShell>
      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#6d6c62]">Net balance</p>
      <div className="mt-3 flex items-center gap-4">
        <svg width="84" height="84" viewBox="0 0 84 84" aria-hidden="true">
          <circle cx="42" cy="42" r={r} fill="none" stroke="#e4e2d7" strokeWidth="9" />
          <circle
            cx="42" cy="42" r={r} fill="none" stroke="#171713" strokeWidth="9" strokeLinecap="round"
            strokeDasharray={c} strokeDashoffset={c * 0.38} transform="rotate(-90 42 42)"
          />
        </svg>
        <div>
          <p className="text-[2rem] font-medium leading-none tracking-[-0.05em]">1,540</p>
          <p className="mt-1 text-xs text-[#6d6c62]">of 2,500 kcal</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-1.5 text-center">
        {[
          ["P", "96g"],
          ["C", "184g"],
          ["F", "48g"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-xl bg-[#ebe9e0] py-1.5">
            <p className="font-mono text-[9px] text-[#6d6c62]">{k}</p>
            <p className="text-xs font-medium">{v}</p>
          </div>
        ))}
      </div>
    </CardShell>
  );
}

function LogCard() {
  return (
    <CardShell tone="ink">
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-white/55">
        <Sparkles className="size-3 text-[#d4f560]" /> Quick log
      </div>
      <p className="mt-3 text-[15px] leading-snug">
        “Two eggs, toast and a black coffee. Then a 30 min run.”
      </p>
      <div className="mt-4 space-y-1.5">
        <div className="flex items-center justify-between rounded-xl bg-white/[0.07] px-3 py-2 text-xs">
          <span className="text-white/60">Breakfast</span>
          <span>+ 310 kcal</span>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-[#d4f560] px-3 py-2 text-xs text-[#171713]">
          <span className="flex items-center gap-1.5"><Flame className="size-3" /> Run</span>
          <span>− 290 kcal</span>
        </div>
      </div>
    </CardShell>
  );
}

function HabitCard() {
  const days = [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2];
  return (
    <CardShell>
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#6d6c62]">Morning stretch</p>
        <span className="rounded-full bg-[#d4f560] px-2 py-0.5 font-mono text-[10px]">9 day streak</span>
      </div>
      <div className="mt-4 grid grid-cols-7 gap-1.5">
        {days.map((d, i) => (
          <span
            key={i}
            className="aspect-square rounded-[7px]"
            style={{ background: d === 2 ? "#d4f560" : d ? "#171713" : "#e4e2d7" }}
          />
        ))}
      </div>
      <p className="mt-3 text-xs text-[#6d6c62]">19 of the last 21 days</p>
    </CardShell>
  );
}

function DeadlineCard() {
  return (
    <CardShell tone="lime">
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#171713]/65">
        <Timer className="size-3" /> Deadline
      </div>
      <p className="mt-3 text-[15px] font-medium leading-tight">Portfolio v2 launch</p>
      <p className="mt-4 text-[2.4rem] font-medium leading-none tracking-[-0.05em]">
        03<span className="text-lg tracking-normal">d</span> 14<span className="text-lg tracking-normal">h</span>
      </p>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#171713]/15">
        <div className="h-full w-[72%] rounded-full bg-[#171713]" />
      </div>
      <p className="mt-2 text-xs text-[#171713]/65">5 of 7 subtasks done</p>
    </CardShell>
  );
}

function TodayCard() {
  const rows: [string, boolean][] = [
    ["Deep work — pitch deck", true],
    ["Gym: push day", true],
    ["Call the accountant", false],
  ];
  return (
    <CardShell>
      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#6d6c62]">Today · 2 of 3</p>
      <ul className="mt-3 space-y-2">
        {rows.map(([t, done]) => (
          <li key={t} className="flex items-center gap-2.5 text-[13px]">
            <span
              className={`grid size-5 shrink-0 place-items-center rounded-full border ${
                done ? "border-[#171713] bg-[#171713] text-[#d4f560]" : "border-[#d3d0c2]"
              }`}
            >
              {done && <Check className="size-3" strokeWidth={3} />}
            </span>
            <span className={done ? "text-[#6d6c62] line-through" : ""}>{t}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex gap-1.5">
        <span className="flex flex-1 items-center gap-1.5 rounded-xl bg-[#ebe9e0] px-2.5 py-2 text-xs">
          <Droplets className="size-3.5" /> 1.5 L
        </span>
        <span className="flex flex-1 items-center gap-1.5 rounded-xl bg-[#ebe9e0] px-2.5 py-2 text-xs">
          <Footprints className="size-3.5" /> 6,204
        </span>
      </div>
    </CardShell>
  );
}

const cards = [
  { el: <HabitCard />, rot: -9, y: 46 },
  { el: <LogCard />, rot: -4, y: 14 },
  { el: <BalanceCard />, rot: 0, y: 0 },
  { el: <DeadlineCard />, rot: 4, y: 14 },
  { el: <TodayCard />, rot: 9, y: 46 },
];

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.defaultMuted = true;
    v.muted = true;
    v.play().catch(() => {
      /* autoplay blocked — the ink backdrop stands in */
    });
  }, []);

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease },
  });

  return (
    <section className="p-2 sm:p-3">
      <div className="relative isolate flex min-h-[calc(100svh-1rem)] flex-col overflow-hidden rounded-[1.75rem] bg-ink text-white sm:min-h-[calc(100svh-1.5rem)] sm:rounded-[2.25rem]">
        {/* Backdrop: film, then two scrims so type always clears AA contrast */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        >
          <source src="https://somafit-01.s3.ap-south-1.amazonaws.com/hero-video+(1).mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 -z-10 bg-[#0d0d0b]/55" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0d0d0b]/70 via-transparent to-[#0d0d0b]/85" />

        {/* Copy */}
        <div className="mx-auto grid w-full max-w-[1320px] flex-1 content-end gap-8 px-5 pb-10 pt-32 sm:px-8 md:grid-cols-12 md:items-end md:gap-10 md:pb-14 md:pt-40 lg:px-10">
          <div className="md:col-span-7">
            <motion.p {...rise(0.05)} className="eyebrow !text-white/75">
              AI health &amp; focus workspace
            </motion.p>
            <motion.h1
              {...rise(0.12)}
              className="display mt-5 text-[3.1rem] sm:text-7xl lg:text-[6.25rem]"
            >
              A calm system for your body <em className="text-lime">and</em> your day.
            </motion.h1>
          </div>

          <div className="md:col-span-5 md:pb-3">
            <motion.p {...rise(0.22)} className="max-w-md text-base leading-relaxed text-white/80 sm:text-lg">
              Log a meal the way you&apos;d text a friend. Plan the day on one timeline. Watch habits,
              deadlines and notes stay in step — in a single quiet workspace.
            </motion.p>
            <motion.div {...rise(0.32)} className="mt-7 flex flex-wrap items-center gap-3">
              <ArrowLink href="/sign-up" tone="lime" size="lg">
                Start for free
              </ArrowLink>
              <ArrowLink href="/guides" tone="ghost" size="lg">
                Read the guides
              </ArrowLink>
              <InstallPWA />
            </motion.div>
          </div>
        </div>

        {/* Product fan */}
        <div className="relative -mb-10 overflow-hidden pb-4 sm:-mb-12" aria-hidden="true">
          <div className="no-scrollbar flex justify-start gap-3 overflow-x-auto px-5 pt-6 sm:gap-4 sm:px-8 xl:justify-center xl:overflow-visible">
            {cards.map((c, i) => (
              <motion.div
                key={i}
                initial={reduce ? false : { opacity: 0, y: 80, rotate: 0 }}
                animate={{ opacity: 1, y: c.y, rotate: c.rot }}
                transition={{ duration: 1.1, delay: 0.35 + i * 0.07, ease }}
                whileHover={{ y: c.y - 14, transition: { duration: 0.3 } }}
                className="origin-bottom"
              >
                {c.el}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
