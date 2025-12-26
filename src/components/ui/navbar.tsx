"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { 
  History, 
  House, 
  User, 
  ListTodo, 
  BookOpen, 
  Settings, 
  ChevronRight,
  Menu,
  X,
  MessageSquarePlus,
  ClockFadingIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Monoton } from "next/font/google";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility, or remove if not
const monoton = Monoton({ 
  weight: "400", 
  subsets: ["latin"] 
});

export function Navbar({ user }: { user: any }) {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false); // Controls Sidebar Expansion
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hide on Landing Page & Auth Pages
  if (pathname === "/" || pathname.startsWith("/sign-")) {
    return null;
  }

  // ALL LINKS (Unified for the sidebar)
  const links = [
    { href: "/dashboard", icon: <House className="w-5 h-5" />, label: "Home" },
    { href: "/tasks", icon: <ListTodo className="w-5 h-5" />, label: "Tasks" },
    { href: "/history", icon: <History className="w-5 h-5" />, label: "History" },
    { href: "/deadlines", icon: <ClockFadingIcon className="w-5 h-5" />, label: "Deadlines" },
    { href: "/profile", icon: <User className="w-5 h-5" />, label: "Profile" },
    { type: "spacer" }, // Visual separator
    { href: "/guides", icon: <BookOpen className="w-5 h-5" />, label: "Guides" },
    { href: "/settings", icon: <Settings className="w-5 h-5" />, label: "Settings" },
    { href: "/feedback", icon: <MessageSquarePlus className="w-5 h-5" />, label: "Feedback" },
  ];

  return (
    <>
      {/* =========================================================
          DESKTOP SIDEBAR (Visible on md and up)
      ========================================================= */}
      <motion.nav
        initial={false}
        animate={{ width: isExpanded ? 240 : 80 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="hidden md:flex fixed left-0 top-0 bottom-0 z-50 flex-col bg-card border-r border-border shadow-sm h-screen"
      >
        {/* LOGO / BRAND AREA */}
        <div className="h-16 flex items-center justify-start border-b border-border/40 relative">
            <Link href="/" className="z-10">
              <div className="relative px-10 w-14 h-14 cursor-pointer transition-transform hover:scale-105">
                <Image 
                  src="/logo2.webp" 
                  alt="Soma Logo" 
                  fill 
                  className="object-contain rounded-" 
                  priority
                />
              </div>
            </Link>
           
           {/* Expansion Text */}
           {/* <AnimatePresence>
             {isExpanded && (
              <span className={`${monoton.className} text-3xl text-foreground pt-1`}>
               SOMAFIT
            </span>
             )}
           </AnimatePresence> */}

           {/* EXPAND TOGGLE BUTTON */}
           <button
             onClick={() => setIsExpanded(!isExpanded)}
             className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-background border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-primary shadow-sm z-50 hover:scale-110 transition-transform"
           >
             <ChevronRight className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
           </button>
        </div>

        {/* NAVIGATION LINKS */}
        <div className={`flex-1 flex flex-col gap-2 p-3 py-6 ${isExpanded ? "overflow-y-auto" : "overflow-hidden"}`}>
          {links.map((link, i) => {
            if (link.type === "spacer") {
                return <div key={i} className="flex-1" />; // Pushes bottom items down
            }
            
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href!}
                className={`
                  relative flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group
                  ${isActive 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }
                `}
              >
                {/* Icon Container - Always centered when collapsed */}
                <div className="min-w-[24px] flex justify-center">
                    {link.icon}
                </div>

                {/* Text Label - Animate opacity/width */}
                <AnimatePresence mode="popLayout">
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="whitespace-nowrap font-medium text-sm"
                    >
                      {link.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Collapsed Tooltip (Hover only) */}
                {!isExpanded && (
                    <div className="absolute left-full ml-4 px-2 py-1 bg-popover text-popover-foreground text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-sm whitespace-nowrap z-50">
                        {link.label}
                    </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* FOOTER AREA */}
        <div className="p-4 border-t border-border/40">
            <div className={`flex items-center gap-3 ${!isExpanded && "justify-center"}`}>
                <div className="w-8 h-8 rounded-full bg-secondary overflow-hidden relative">
                    {user?.image ? (
                        <Image 
                            src={user.image} 
                            alt={user.name || "User"} 
                            fill 
                            className="object-cover" 
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white">
                            {user?.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                    )}
                </div>
                {isExpanded && (
                    <div className="flex flex-col overflow-hidden">
                        {/* <span className="text-sm font-semibold truncate">
                            {user?.name || "User"}
                        </span> */}
                        <span className="text-sm font-semibold truncate">
                            {user?.email || "Free Plan"}
                        </span>
                        <span className="text-xs text-muted-foreground truncate ">
                            "Free Plan"
                        </span>
                    </div>
                )}
            </div>
        </div>
      </motion.nav>


      {/* =========================================================
          MOBILE BOTTOM BAR (Visible on small screens)
      ========================================================= */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-t border-border pb-safe">
        <div className="flex justify-around items-center h-16 px-2">
          {links.slice(0, 4).map((link: any) => (
             <Link 
                key={link.href} 
                href={link.href}
                className={`flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors ${
                    pathname === link.href ? "text-primary" : "text-muted-foreground"
                }`}
             >
                {link.icon}
                <span className="text-[10px] font-medium">{link.label}</span>
             </Link>
          ))}
          
          {/* Mobile Menu Trigger & Popup */}
          <div className="relative flex flex-col items-center justify-center w-16 h-full">
            
            {/* 1. The Popup Menu (Appears above the button) */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <>
                  {/* Invisible Backdrop to close menu when clicking outside */}
                  <div className="fixed inset-0 z-40" onClick={() => setIsMobileMenuOpen(false)} />

                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute bottom-full right-0 mb-3 bg-popover/95 backdrop-blur-md border border-border rounded-xl shadow-2xl p-1.5 min-w-[150px] flex flex-col gap-1 z-[100]"
                  >
                    {/* Profile Link */}
                    <Link 
                        href="/profile" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-popover-foreground hover:bg-secondary/80 rounded-lg transition-colors"
                    >
                        <User className="w-4 h-4" /> Profile
                    </Link>

                    {/* Settings Link */}
                    <Link 
                        href="/settings" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-popover-foreground hover:bg-secondary/80 rounded-lg transition-colors"
                    >
                        <Settings className="w-4 h-4" /> Settings
                    </Link>
                    
                    <Link 
                        href="/feedback" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-popover-foreground hover:bg-secondary/80 rounded-lg transition-colors"
                    >
                        <MessageSquarePlus className="w-4 h-4" /> Feedback
                    </Link>
                    
                    <Link 
                        href="/guides" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-popover-foreground hover:bg-secondary/80 rounded-lg transition-colors"
                    >
                        <BookOpen className="w-4 h-4" /> Guides
                    </Link>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* 2. The Button Trigger */}
            <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${isMobileMenuOpen ? "text-primary" : "text-muted-foreground"}`}
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