"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import {
  History,
  House,
  UserCog,
  ListTodo,
  BookOpen,
  ChevronRight,
  Menu,
  X,
  MessageSquarePlus,
  ClockFadingIcon,
  FileText,
  CalendarHeart,
  Repeat,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function Navbar({ user }: { user: any }) {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false); // Controls Sidebar Expansion
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hide on Landing Page & Auth Pages
  if (pathname === "/" || pathname.startsWith("/sign-")) {
    return null;
  }

  // Primary links (top of the rail)
  const primaryLinks = [
    { href: "/dashboard", icon: <House className="w-5 h-5" />, label: "Home" },
    { href: "/tasks", icon: <ListTodo className="w-5 h-5" />, label: "Tasks" },
    { href: "/habits", icon: <Repeat className="w-5 h-5" />, label: "Habits" },
    { href: "/analysis", icon: <CalendarHeart className="w-5 h-5" />, label: "Analysis" },
    { href: "/deadlines", icon: <ClockFadingIcon className="w-5 h-5" />, label: "Deadlines" },
    { href: "/notes", icon: <FileText className="w-5 h-5" />, label: "Notes" },
    { href: "/history", icon: <History className="w-5 h-5" />, label: "History" },
  ];

  // Secondary links (bottom of the rail). Profile + Settings are merged → "Account".
  const secondaryLinks = [
    { href: "/guides", icon: <BookOpen className="w-5 h-5" />, label: "Guides" },
    { href: "/feedback", icon: <MessageSquarePlus className="w-5 h-5" />, label: "Feedback" },
    { href: "/settings", icon: <UserCog className="w-5 h-5" />, label: "Account" },
  ];

  const isAccountActive = pathname === "/settings" || pathname === "/profile";

  const RailLink = ({ link }: { link: any }) => {
    const isActive =
      link.href === "/settings" ? isAccountActive : pathname === link.href;
    return (
      <Link
        href={link.href}
        className={cn(
          "relative flex items-center gap-3 p-3 rounded-xl transition-colors duration-200 group press",
          isActive
            ? "text-primary-foreground"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        )}
      >
        {/* Animated active pill */}
        {isActive && (
          <motion.span
            layoutId="nav-active"
            className="absolute inset-0 rounded-xl bg-primary shadow-md shadow-primary/25"
            transition={{ type: "spring", stiffness: 500, damping: 34 }}
          />
        )}

        <span className="relative z-10 min-w-[24px] flex justify-center">
          {link.icon}
        </span>

        <AnimatePresence mode="popLayout">
          {isExpanded && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              className="relative z-10 whitespace-nowrap font-medium text-sm"
            >
              {link.label}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Collapsed tooltip */}
        {!isExpanded && (
          <div className="absolute left-full ml-4 px-2.5 py-1.5 bg-popover text-popover-foreground text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg border border-border/60 whitespace-nowrap z-50">
            {link.label}
          </div>
        )}
      </Link>
    );
  };

  return (
    <>
      {/* =========================================================
          DESKTOP SIDEBAR (md and up)
      ========================================================= */}
      <motion.nav
        initial={false}
        animate={{ width: isExpanded ? 240 : 80 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="hidden md:flex fixed left-0 top-0 bottom-0 z-50 flex-col bg-card/80 backdrop-blur-xl border-r border-border/60 shadow-sm h-screen"
      >
        {/* LOGO / BRAND */}
        <div className="h-16 flex items-center justify-start border-b border-border/40 relative">
          <Link href="/" className="z-10">
            <div className="relative px-10 w-14 h-14 cursor-pointer transition-transform hover:scale-105 press">
              <Image src="/logo2.webp" alt="Soma Logo" fill className="object-contain" priority />
            </div>
          </Link>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label="Toggle sidebar"
            className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-background border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 shadow-sm z-50 hover:scale-110 transition-all"
          >
            <ChevronRight className={cn("w-3 h-3 transition-transform duration-300", isExpanded && "rotate-180")} />
          </button>
        </div>

        {/* LINKS */}
        <div className={cn("flex-1 flex flex-col p-3 py-5", isExpanded ? "overflow-y-auto custom-scrollbar" : "overflow-hidden")}>
          <div className="flex flex-col gap-1.5">
            {primaryLinks.map((link) => (
              <RailLink key={link.href} link={link} />
            ))}
          </div>

          <div className="flex-1" />

          <div className="flex flex-col gap-1.5 pt-3 mt-3 border-t border-border/40">
            {secondaryLinks.map((link) => (
              <RailLink key={link.href} link={link} />
            ))}
          </div>
        </div>

        {/* FOOTER / USER */}
        <div className="p-4 border-t border-border/40">
          <Link
            href="/settings"
            className={cn(
              "flex items-center gap-3 rounded-xl p-1.5 -m-1.5 hover:bg-accent transition-colors",
              !isExpanded && "justify-center"
            )}
          >
            <div className="w-9 h-9 rounded-full overflow-hidden relative ring-2 ring-border shrink-0">
              {user?.image ? (
                <Image src={user.image} alt={user.name || "User"} fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary to-[var(--gradient-to)] flex items-center justify-center text-xs font-bold text-primary-foreground">
                  {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
            </div>
            {isExpanded && (
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-semibold truncate">{user?.email || "Your account"}</span>
                <span className="text-xs text-muted-foreground truncate">Free Plan</span>
              </div>
            )}
          </Link>
        </div>
      </motion.nav>

      {/* =========================================================
          MOBILE BOTTOM BAR
      ========================================================= */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/85 backdrop-blur-xl border-t border-border/60 pb-safe">
        <div className="flex justify-around items-center h-16 px-2">
          {primaryLinks.slice(0, 4).map((link: any) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative flex flex-col items-center justify-center w-16 h-full gap-1 press"
              >
                <span className={cn("transition-colors", isActive ? "text-primary" : "text-muted-foreground")}>
                  {link.icon}
                </span>
                <span className={cn("text-[10px] font-medium transition-colors", isActive ? "text-primary" : "text-muted-foreground")}>
                  {link.label}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="mobile-nav-active"
                    className="absolute -top-px h-0.5 w-8 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 500, damping: 34 }}
                  />
                )}
              </Link>
            );
          })}

          {/* Menu trigger + popup */}
          <div className="relative flex flex-col items-center justify-center w-16 h-full">
            <AnimatePresence>
              {isMobileMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsMobileMenuOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute bottom-full right-0 mb-3 bg-popover/95 backdrop-blur-md border border-border rounded-2xl shadow-2xl p-1.5 min-w-[170px] flex flex-col gap-0.5 z-[100]"
                  >
                    {[
                      { href: "/analysis", icon: <CalendarHeart className="w-4 h-4" />, label: "Analysis" },
                      { href: "/deadlines", icon: <ClockFadingIcon className="w-4 h-4" />, label: "Deadlines" },
                      { href: "/notes", icon: <FileText className="w-4 h-4" />, label: "Notes" },
                      { href: "/history", icon: <History className="w-4 h-4" />, label: "History" },
                      { href: "/guides", icon: <BookOpen className="w-4 h-4" />, label: "Guides" },
                      { href: "/settings", icon: <UserCog className="w-4 h-4" />, label: "Account" },
                      { href: "/feedback", icon: <MessageSquarePlus className="w-4 h-4" />, label: "Feedback" },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-colors",
                          (item.href === "/settings" ? isAccountActive : pathname === item.href)
                            ? "bg-primary text-primary-foreground"
                            : "text-popover-foreground hover:bg-accent"
                        )}
                      >
                        {item.icon} {item.label}
                      </Link>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full gap-1 transition-colors press",
                isMobileMenuOpen ? "text-primary" : "text-muted-foreground"
              )}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              <span className="text-[10px] font-medium">Menu</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}