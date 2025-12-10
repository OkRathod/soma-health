"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; //  New hook to check current page
import { Activity, Settings } from "lucide-react"; //  Import Settings icon
import { motion } from "framer-motion";

export function Navbar() {
  const pathname = usePathname(); // Get current URL (e.g., "/dashboard" or "/settings")

  return (
    <nav className="fixed z-50 
      bottom-8 left-0 right-0 flex justify-center
      md:top-0 md:bottom-0 md:left-8 md:right-auto md:flex-col md:justify-center
      pointer-events-none 
    ">
      
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        
        className="flex items-center justify-center p-2 gap-3
          bg-card
          border border-border
          shadow-[0_8px_30px_rgb(0,0,0,0.12)]
          rounded-full 
          pointer-events-auto
          /* Mobile: Horizontal Row */
          flex-row 
          /* Desktop: Vertical Column */
          md:flex-col
        "
      >
        
        {/* 1. Health Button */}
        <NavItem 
          href="/dashboard" 
          icon={<Activity className="w-6 h-6" />} 
          label="Health" 
          isActive={pathname === "/dashboard"} // Auto-highlight
        />

        {/* 2. Settings Button (New!) */}
        <NavItem 
          href="/settings" 
          icon={<Settings className="w-6 h-6" />} 
          label="Settings" 
          isActive={pathname === "/settings"} // Auto-highlight
        />
        
      </motion.div>
    </nav>
  );
}

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

      {/* Tooltip */}
      <div className="absolute left-14 top-1/2 -translate-y-1/2 hidden md:block overflow-hidden pointer-events-none">
        <span className="block bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-[-10px] group-hover:translate-x-0">
          {label}
        </span>
      </div>
    </Link>
  );
}