"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

const links = [
  { href: "#tour", label: "Product" },
  { href: "#modules", label: "Modules" },
  { href: "#how", label: "How it works" },
  { href: "/guides", label: "Guides" },
];

/**
 * Landing navbar. Sits transparent over the hero photo, then condenses into a
 * paper-coloured glass pill once the visitor scrolls past the fold.
 */
export function Navbar() {
  const { isSignedIn } = useAuth();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onDark = !solid && !open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
      <div
        className={cn(
          "mx-auto flex items-center justify-between rounded-full pl-4 pr-1.5 transition-[max-width,height,background-color,box-shadow,border-color] duration-500 ease-out sm:pl-5",
          solid || open
            ? "glass h-14 max-w-4xl shadow-float"
            : "h-16 max-w-[1320px] border border-white/15 bg-white/[0.08] backdrop-blur-md"
        )}
      >
        <Link href="/" aria-label="Somafit home" className={cn("transition-colors", onDark ? "text-white" : "text-foreground")}>
          <Logo size={28} className="text-current" />
        </Link>

        <nav aria-label="Sections" className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-full px-3.5 py-2 font-mono text-[11.5px] uppercase tracking-[0.12em] transition-colors",
                onDark ? "text-white/75 hover:text-white" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          {!isSignedIn && (
            <Link
              href="/sign-in"
              className={cn(
                "hidden h-10 items-center rounded-full px-4 text-sm font-medium transition-colors sm:inline-flex",
                onDark ? "text-white/85 hover:text-white" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Sign in
            </Link>
          )}
          <Link
            href={isSignedIn ? "/dashboard" : "/sign-up"}
            className="group inline-flex h-11 items-center gap-2.5 rounded-full bg-lime pl-4 pr-1.5 text-sm font-medium text-lime-foreground press"
          >
            {isSignedIn ? "Open app" : "Get started"}
            <span className="grid size-8 place-items-center rounded-full bg-ink text-lime transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="size-4" />
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={cn(
              "ml-0.5 grid size-11 place-items-center rounded-full md:hidden",
              onDark ? "bg-white/15 text-white" : "bg-surface text-foreground"
            )}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Sections"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="glass mx-auto mt-2 max-w-4xl rounded-[1.75rem] p-2 shadow-float md:hidden"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-2xl text-foreground hover:bg-accent"
              >
                {l.label}
                <ArrowUpRight className="size-4 text-muted-foreground" />
              </Link>
            ))}
            {!isSignedIn && (
              <Link
                href="/sign-in"
                onClick={() => setOpen(false)}
                className="mt-1 flex h-12 items-center justify-center rounded-full border border-border text-sm font-medium"
              >
                Sign in
              </Link>
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
