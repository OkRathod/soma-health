"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BookOpen,
  CalendarHeart,
  ClockFading,
  FileText,
  History,
  House,
  LayoutGrid,
  ListTodo,
  MessageSquarePlus,
  Repeat,
  UserCog,
  X,
  ArrowUpRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Logo, SomaMark } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type NavItem = { href: string; label: string; icon: React.ComponentType<{ className?: string }>; hint?: string };

/** Everything reachable from the shell. Order here is the order on screen. */
const PRIMARY: NavItem[] = [
  { href: "/dashboard", label: "Today", icon: House },
  { href: "/tasks", label: "Tasks", icon: ListTodo },
  { href: "/habits", label: "Habits", icon: Repeat },
  { href: "/deadlines", label: "Deadlines", icon: ClockFading },
  { href: "/notes", label: "Notes", icon: FileText },
  { href: "/history", label: "History", icon: History },
  { href: "/analysis", label: "Analysis", icon: CalendarHeart },
];

const SECONDARY: NavItem[] = [
  { href: "/guides", label: "Guides", icon: BookOpen, hint: "How to get the most out of Somafit" },
  { href: "/feedback", label: "Feedback", icon: MessageSquarePlus, hint: "Tell us what to build next" },
  { href: "/settings", label: "Account", icon: UserCog, hint: "Profile, goals and preferences" },
];

/** The four destinations that live permanently in the mobile dock. */
const DOCK: NavItem[] = [PRIMARY[0], PRIMARY[1], PRIMARY[2], PRIMARY[3]];
/** Everything else goes in the "More" sheet. */
const SHEET: NavItem[] = [PRIMARY[4], PRIMARY[5], PRIMARY[6], ...SECONDARY];

function useIsActive() {
  const pathname = usePathname() ?? "";
  return (href: string) => {
    if (href === "/settings") return pathname === "/settings" || pathname === "/profile";
    return pathname === href || pathname.startsWith(href + "/");
  };
}

function Avatar({ user, size = 36 }: { user: any; size?: number }) {
  const initial = user?.name?.charAt(0) || user?.email?.charAt(0) || "S";
  return (
    <span
      className="relative grid shrink-0 place-items-center overflow-hidden rounded-full bg-lime font-mono text-xs font-medium uppercase text-lime-foreground ring-1 ring-foreground/10"
      style={{ width: size, height: size }}
    >
      {user?.image ? <Image src={user.image} alt="" fill sizes="40px" className="object-cover" /> : initial}
    </span>
  );
}

export function Navbar({ user }: { user: any }) {
  const pathname = usePathname() ?? "";
  const isActive = useIsActive();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Condense the desktop bar once the page has moved.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the sheet is open (its links close it on tap).
  useEffect(() => {
    if (!sheetOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSheetOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [sheetOpen]);

  if (pathname === "/" || pathname.startsWith("/sign-")) return null;

  // Signed-out visitors (public guides): brand + a way in, nothing else.
  if (!user) {
    return (
      <header className="sticky top-0 z-50 px-3 pt-3 md:px-6">
        <div className="glass mx-auto flex h-14 max-w-[1240px] items-center justify-between rounded-full pl-4 pr-2 shadow-float">
          <Link href="/" aria-label="Somafit home">
            <Logo size={26} />
          </Link>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Link
              href="/sign-in"
              className="hidden h-10 items-center rounded-full px-4 text-sm font-medium text-muted-foreground hover:text-foreground sm:inline-flex"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex h-10 items-center gap-1.5 rounded-full bg-lime px-4 text-sm font-medium text-lime-foreground press"
            >
              Get started <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </header>
    );
  }

  const moreActive = SHEET.some((i) => isActive(i.href));

  return (
    <>
      {/* =========================================================
          DESKTOP — floating pill bar
      ========================================================= */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 hidden px-6 pt-4 md:block">
        <nav
          aria-label="Primary"
          className={cn(
            "glass pointer-events-auto mx-auto flex items-center justify-between gap-3 rounded-full pl-4 pr-2 transition-[height,max-width,box-shadow] duration-300 ease-out",
            scrolled ? "h-[52px] max-w-[1120px] shadow-float" : "h-[60px] max-w-[1240px] shadow-card"
          )}
        >
          <Link href="/dashboard" aria-label="Somafit — today" className="shrink-0">
            <span className="lg:hidden"><SomaMark size={28} className="text-foreground" /></span>
            <span className="hidden lg:inline-flex"><Logo size={26} /></span>
          </Link>

          <ul className="flex items-center gap-0.5">
            {PRIMARY.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    title={item.label}
                    className={cn(
                      "relative flex h-10 items-center gap-2 rounded-full px-3 text-[13px] font-medium transition-colors xl:px-3.5",
                      active
                        ? "text-ink-foreground dark:text-lime-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-ink dark:bg-lime"
                        transition={{ type: "spring", stiffness: 480, damping: 38 }}
                      />
                    )}
                    <Icon className="relative z-10 size-4 shrink-0" />
                    <span className={cn("relative z-10", !active && "hidden xl:inline")}>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex shrink-0 items-center gap-0.5">
            <DropdownMenu>
              <DropdownMenuTrigger
                aria-label="More"
                className={cn(
                  "flex h-10 items-center gap-2 rounded-full px-3 text-[13px] font-medium outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring lg:px-3.5",
                  isActive("/guides") || isActive("/feedback") ? "bg-accent text-foreground" : "text-muted-foreground"
                )}
              >
                <LayoutGrid className="size-4" /> <span className="hidden lg:inline">More</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={12} className="w-72 rounded-3xl p-2">
                {SECONDARY.map((item) => {
                  const Icon = item.icon;
                  return (
                    <DropdownMenuItem key={item.href} asChild className="cursor-pointer rounded-2xl p-2.5">
                      <Link href={item.href} className="flex items-start gap-3">
                        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface text-foreground">
                          <Icon className="size-4" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-medium text-foreground">{item.label}</span>
                          <span className="block text-xs text-muted-foreground">{item.hint}</span>
                        </span>
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
            <ThemeToggle />
            <Link
              href="/settings"
              aria-label="Account"
              className={cn(
                "ml-1 rounded-full p-0.5 transition-shadow hover:ring-2 hover:ring-foreground/15",
                isActive("/settings") && "ring-2 ring-foreground/60"
              )}
            >
              <Avatar user={user} />
            </Link>
          </div>
        </nav>
      </header>

      {/* =========================================================
          MOBILE — quiet top bar (in flow) + floating dock
      ========================================================= */}
      <header className="flex h-14 items-center justify-between px-4 pt-safe md:hidden">
        <Link href="/dashboard" aria-label="Somafit — today">
          <Logo size={26} />
        </Link>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Link href="/settings" aria-label="Account" className="rounded-full p-0.5">
            <Avatar user={user} size={34} />
          </Link>
        </div>
      </header>

      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
      >
        <div className="mx-auto flex h-[62px] max-w-md items-center justify-between gap-1 rounded-full border border-white/10 bg-ink p-1.5 text-ink-foreground shadow-float">
          {DOCK.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                aria-label={item.label}
                className={cn(
                  "relative flex h-full items-center justify-center gap-2 rounded-full text-[13px] font-medium transition-[flex-grow,color] duration-300",
                  active ? "grow-[2.2] basis-0 text-lime-foreground" : "grow basis-0 text-ink-foreground/55"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="dock-active"
                    className="absolute inset-0 rounded-full bg-lime"
                    transition={{ type: "spring", stiffness: 460, damping: 36 }}
                  />
                )}
                <Icon className="relative z-10 size-5 shrink-0" />
                {active && <span className="relative z-10">{item.label}</span>}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            aria-label="More destinations"
            aria-expanded={sheetOpen}
            className={cn(
              "relative flex h-full grow basis-0 items-center justify-center gap-2 rounded-full text-[13px] font-medium",
              moreActive ? "grow-[2.2] bg-lime text-lime-foreground" : "text-ink-foreground/55"
            )}
          >
            <LayoutGrid className="size-5" />
            {moreActive && <span>{SHEET.find((i) => isActive(i.href))?.label}</span>}
          </button>
        </div>
      </nav>

      {/* MORE SHEET */}
      <AnimatePresence>
        {sheetOpen && (
          <div className="fixed inset-0 z-[60] md:hidden" role="dialog" aria-modal="true" aria-label="More destinations">
            <motion.button
              type="button"
              aria-label="Close"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSheetOpen(false)}
              className="absolute inset-0 bg-[var(--overlay)] backdrop-blur-[3px]"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 38 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.5 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 90 || info.velocity.y > 500) setSheetOpen(false);
              }}
              className="absolute inset-x-0 bottom-0 rounded-t-[2rem] border-t border-border bg-card px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3 shadow-float"
            >
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border" />
              <div className="mb-4 flex items-center justify-between px-1">
                <p className="eyebrow">Everything else</p>
                <button
                  type="button"
                  onClick={() => setSheetOpen(false)}
                  aria-label="Close"
                  className="grid size-9 place-items-center rounded-full bg-surface text-muted-foreground"
                >
                  <X className="size-4" />
                </button>
              </div>
              <ul className="grid grid-cols-3 gap-2">
                {SHEET.map((item) => {
                  const active = isActive(item.href);
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setSheetOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex aspect-[1/0.9] flex-col justify-between rounded-3xl p-3.5 text-left press",
                          active ? "bg-lime text-lime-foreground" : "bg-surface text-foreground"
                        )}
                      >
                        <Icon className="size-5" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <Link
                href="/settings"
                onClick={() => setSheetOpen(false)}
                className="mt-3 flex items-center gap-3 rounded-3xl border border-border p-3"
              >
                <Avatar user={user} size={40} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{user?.name || "Your account"}</span>
                  <span className="block truncate text-xs text-muted-foreground">{user?.email}</span>
                </span>
                <ArrowUpRight className="size-4 text-muted-foreground" />
              </Link>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
