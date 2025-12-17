// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useState } from "react";
// import { 
//   History, 
//   House, 
//   User, 
//   ListTodo, 
//   BookOpen, 
//   MoreHorizontal, 
//   Settings, 
//   LogOut,
//   Globe 
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// export function Navbar() {
//   const pathname = usePathname();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   // Hide on Landing Page & Auth Pages
//   if (pathname === "/" || pathname.startsWith("/sign-")) {
//     return null;
//   }

//   // 1. PRIMARY LINKS (Always Visible)
//   const primaryLinks = [
//     { href: "/dashboard", icon: <House className="w-6 h-6" />, label: "Home" },
//     { href: "/tasks", icon: <ListTodo className="w-6 h-6" />, label: "Tasks" },
//     { href: "/history", icon: <History className="w-6 h-6" />, label: "History" },
//     { href: "/guides", icon: <BookOpen className="w-6 h-6" />, label: "Guides" },
//   ];

//   // 2. SECONDARY LINKS (Hidden in Menu)
//   const menuLinks = [
//     { href: "/profile", icon: <User className="w-5 h-5" />, label: "Profile" },
//     { href: "/settings", icon: <Settings className="w-5 h-5" />, label: "Settings" },
//     { href: "/", icon: <Globe className="w-5 h-5" />, label: "Landing Page" }, // Public Home
//   ];

//   return (
//     <>
//       <nav className="fixed z-50 
//         bottom-8 left-0 right-0 flex justify-center
//         md:top-0 md:bottom-0 md:left-8 md:right-auto md:flex-col md:justify-center
//         pointer-events-none 
//       ">
        
//         <motion.div 
//           initial={{ opacity: 0, y: 20, scale: 0.95 }}
//           animate={{ opacity: 1, y: 0, scale: 1 }}
//           transition={{ duration: 0.5, ease: "easeOut" }}
//           className="flex items-center justify-center p-2 gap-2
//             bg-card/80 backdrop-blur-lg
//             border border-border/50
//             shadow-[0_8px_30px_rgb(0,0,0,0.12)]
//             rounded-full 
//             pointer-events-auto
//             flex-row md:flex-col relative
//           "
//         >
          
//           {/* RENDER PRIMARY LINKS */}
//           {primaryLinks.map((link) => (
//             <NavItem 
//               key={link.href}
//               href={link.href} 
//               icon={link.icon} 
//               label={link.label} 
//               isActive={pathname === link.href} 
//             />
//           ))}

//           {/* DIVIDER (Desktop Only) */}
//           <div className="hidden md:block w-8 h-[1px] bg-border my-1" />
//           <div className="md:hidden w-[1px] h-8 bg-border mx-1" />

//           {/* MORE BUTTON (Toggles Menu) */}
//           <div className="relative">
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className={`
//                 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200
//                 ${isMenuOpen ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"}
//               `}
//             >
//               <MoreHorizontal className="w-6 h-6" />
//             </button>

//             {/* THE POPUP MENU */}
//             <AnimatePresence>
//               {isMenuOpen && (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.9, y: 10 }}
//                   animate={{ opacity: 1, scale: 1, y: -15 }} // Moves up on Mobile
//                   exit={{ opacity: 0, scale: 0.9, y: 10 }}
//                   className="absolute 
//                     bottom-full left-1/2 -translate-x-1/2 mb-4 
//                     md:bottom-auto md:left-full md:top-0 md:translate-x-4 md:translate-y-0
//                     bg-popover border border-border rounded-xl shadow-xl p-2 w-48
//                     flex flex-col gap-1 overflow-hidden z-50
//                   "
//                 >
//                   {menuLinks.map((link) => (
//                     <Link 
//                       key={link.href} 
//                       href={link.href} 
//                       onClick={() => setIsMenuOpen(false)} // Close on click
//                       className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-popover-foreground hover:bg-secondary rounded-lg transition-colors"
//                     >
//                       {link.icon}
//                       {link.label}
//                     </Link>
//                   ))}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//         </motion.div>
//       </nav>
      
//       {/* CLICK OUTSIDE OVERLAY (Closes menu if you click background) */}
//       {isMenuOpen && (
//         <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)} />
//       )}
//     </>
//   );
// }

// // --- SUBCOMPONENT ---
// function NavItem({ href, icon, label, isActive }: { href: string, icon: any, label: string, isActive?: boolean }) {
//   return (
//     <Link href={href} className="relative group">
//       <motion.div
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//         transition={{ type: "spring", stiffness: 400, damping: 17 }}
//         className={`
//           w-12 h-12 flex items-center justify-center rounded-full relative z-10 transition-colors duration-200
//           ${isActive 
//             ? "bg-primary text-primary-foreground shadow-lg" 
//             : "text-muted-foreground hover:bg-secondary"
//           }
//         `}
//       >
//         {icon}
//       </motion.div>

//       {/* Desktop Tooltip */}
//       <div className="absolute left-14 top-1/2 -translate-y-1/2 hidden md:block overflow-hidden pointer-events-none">
//         <span className="block bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-[-10px] group-hover:translate-x-0 whitespace-nowrap">
//           {label}
//         </span>
//       </div>
//     </Link>
//   );
// }

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
  Globe,
  ChevronRight,
  Menu,
  X
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
    { href: "/guides", icon: <BookOpen className="w-5 h-5" />, label: "Guides" },
    { type: "spacer" }, // Visual separator
    { href: "/profile", icon: <User className="w-5 h-5" />, label: "Profile" },
    { href: "/settings", icon: <Settings className="w-5 h-5" />, label: "Settings" },
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
                  src="/logo.png" 
                  alt="Soma Logo" 
                  fill 
                  className="object-contain" 
                  priority
                />
              </div>
            </Link>
           
           {/* Expansion Text */}
           {/* <AnimatePresence>
             {isExpanded && (
            //   <span className={`${monoton.className} text-3xl text-foreground pt-1`}>
            //    SOMA
            // </span>
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
                    className="absolute bottom-full right-0 mb-3 bg-popover/95 backdrop-blur-md border border-border rounded-xl shadow-2xl p-1.5 min-w-[150px] flex flex-col gap-1 z-50"
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