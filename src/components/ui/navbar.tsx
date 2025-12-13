"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { 
  History, 
  House, 
  User, 
  ListTodo, 
  BookOpen, 
  MoreHorizontal, 
  Settings, 
  LogOut,
  Globe 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Hide on Landing Page & Auth Pages
  if (pathname === "/" || pathname.startsWith("/sign-")) {
    return null;
  }

  // 1. PRIMARY LINKS (Always Visible)
  const primaryLinks = [
    { href: "/dashboard", icon: <House className="w-6 h-6" />, label: "Home" },
    { href: "/tasks", icon: <ListTodo className="w-6 h-6" />, label: "Tasks" },
    { href: "/history", icon: <History className="w-6 h-6" />, label: "History" },
    { href: "/guides", icon: <BookOpen className="w-6 h-6" />, label: "Guides" },
  ];

  // 2. SECONDARY LINKS (Hidden in Menu)
  const menuLinks = [
    { href: "/profile", icon: <User className="w-5 h-5" />, label: "Profile" },
    { href: "/settings", icon: <Settings className="w-5 h-5" />, label: "Settings" },
    { href: "/", icon: <Globe className="w-5 h-5" />, label: "Landing Page" }, // Public Home
  ];

  return (
    <>
      <nav className="fixed z-50 
        bottom-8 left-0 right-0 flex justify-center
        md:top-0 md:bottom-0 md:left-8 md:right-auto md:flex-col md:justify-center
        pointer-events-none 
      ">
        
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center justify-center p-2 gap-2
            bg-card/80 backdrop-blur-lg
            border border-border/50
            shadow-[0_8px_30px_rgb(0,0,0,0.12)]
            rounded-full 
            pointer-events-auto
            flex-row md:flex-col relative
          "
        >
          
          {/* RENDER PRIMARY LINKS */}
          {primaryLinks.map((link) => (
            <NavItem 
              key={link.href}
              href={link.href} 
              icon={link.icon} 
              label={link.label} 
              isActive={pathname === link.href} 
            />
          ))}

          {/* DIVIDER (Desktop Only) */}
          <div className="hidden md:block w-8 h-[1px] bg-border my-1" />
          <div className="md:hidden w-[1px] h-8 bg-border mx-1" />

          {/* MORE BUTTON (Toggles Menu) */}
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`
                w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200
                ${isMenuOpen ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"}
              `}
            >
              <MoreHorizontal className="w-6 h-6" />
            </button>

            {/* THE POPUP MENU */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: -15 }} // Moves up on Mobile
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  className="absolute 
                    bottom-full left-1/2 -translate-x-1/2 mb-4 
                    md:bottom-auto md:left-full md:top-0 md:translate-x-4 md:translate-y-0
                    bg-popover border border-border rounded-xl shadow-xl p-2 w-48
                    flex flex-col gap-1 overflow-hidden z-50
                  "
                >
                  {menuLinks.map((link) => (
                    <Link 
                      key={link.href} 
                      href={link.href} 
                      onClick={() => setIsMenuOpen(false)} // Close on click
                      className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-popover-foreground hover:bg-secondary rounded-lg transition-colors"
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </motion.div>
      </nav>
      
      {/* CLICK OUTSIDE OVERLAY (Closes menu if you click background) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)} />
      )}
    </>
  );
}

// --- SUBCOMPONENT ---
function NavItem({ href, icon, label, isActive }: { href: string, icon: any, label: string, isActive?: boolean }) {
  return (
    <Link href={href} className="relative group">
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={`
          w-12 h-12 flex items-center justify-center rounded-full relative z-10 transition-colors duration-200
          ${isActive 
            ? "bg-primary text-primary-foreground shadow-lg" 
            : "text-muted-foreground hover:bg-secondary"
          }
        `}
      >
        {icon}
      </motion.div>

      {/* Desktop Tooltip */}
      <div className="absolute left-14 top-1/2 -translate-y-1/2 hidden md:block overflow-hidden pointer-events-none">
        <span className="block bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-[-10px] group-hover:translate-x-0 whitespace-nowrap">
          {label}
        </span>
      </div>
    </Link>
  );
}