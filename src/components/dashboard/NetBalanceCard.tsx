"use client";
import { Card } from "@/components/ui/card";
import { Activity, BatteryCharging, BatteryWarning, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface NetBalanceProps {
  inVal: number;
  outVal: number;
  goal: number;
}

export function NetBalanceCard({ inVal, outVal, goal }: NetBalanceProps) {
  const net = inVal - outVal;
  
  // 🧠 AI VERDICT ENGINE
  let status = "Balanced";
  // Default: Blue theme
  let statusColor = "bg-blue-500/10 text-blue-600 border-blue-500/20";
  let Icon = Activity;
  let message = "You're balanced today. Maintain this for optimal recovery.";

  // Logic: 
  if (net < -600) {
    status = "Under-Fueled";
    statusColor = "bg-orange-500/10 text-orange-600 border-orange-500/20";
    Icon = BatteryWarning;
    message = "Output is high. A small carb-rich meal would stabilize energy.";
  } else if (inVal > goal + 300) {
    status = "Surplus";
    statusColor = "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
    Icon = Zap;
    message = "You've exceeded intake. Light movement can help rebalance.";
  } else if (net > -200 && net < 400) {
     // Sweet spot
     statusColor = "bg-primary/10 text-primary border-primary/20";
     Icon = BatteryCharging;
  }

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="relative z-20"
    >
        {/* Removed glowColor and shadow-xl, reverted to standard shadow-sm */}
        <Card className="relative overflow-hidden p-6 flex flex-col items-center justify-center text-center gap-2 border-2 border-border shadow-sm bg-card/50 backdrop-blur-md">
        
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Net Balance</span>
        
        <div className="flex flex-col items-center">
            <div className="flex items-baseline gap-1">
                <span className={`text-5xl font-extrabold tracking-tighter ${net > 0 ? 'text-foreground' : 'text-muted-foreground'}`}>
                {net > 0 ? "+" : ""}{net}
                </span>
                <span className="text-sm text-muted-foreground font-medium">kcal</span>
            </div>
            
            <span className="text-[10px] font-medium text-muted-foreground/60 mt-1 uppercase tracking-wider">
                Goal: {goal.toLocaleString()}
            </span>
        </div>

        {/* Verdict Badge */}
        <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold border ${statusColor} shadow-sm mt-2`}>
            <Icon className="w-3.5 h-3.5" />
            {status}
        </div>

        {/* The Insight */}
        <p className="text-xs text-muted-foreground mt-1 max-w-[220px] leading-relaxed font-medium">
            {message}
        </p>
        </Card>
    </motion.div>
  );
}