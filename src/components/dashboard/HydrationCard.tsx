"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplets, Plus } from "lucide-react";
import { motion } from "framer-motion";

export function HydrationCard({ total, onAdd }: { total: number; onAdd: () => void }) {
  const goal = 2500;
  const percentage = Math.min((total / goal) * 100, 100);

  return (
    <Card className="relative overflow-hidden border-border/60 shadow-sm group">
      
      {/* 🌊 Liquid Fill Animation Background */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 bg-blue-500/10 z-0"
        initial={{ height: "0%" }}
        animate={{ height: `${percentage}%` }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      <CardContent className="p-5 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 rounded-full text-blue-600">
                <Droplets className="w-6 h-6" />
            </div>
            <div>
                <div className="text-2xl font-bold text-foreground tracking-tight flex items-baseline gap-1">
                    {total} <span className="text-sm font-normal text-muted-foreground">/ {goal}ml</span>
                </div>
                <p className="text-xs text-blue-600 font-medium">Daily Hydration</p>
            </div>
        </div>

        <Button 
          onClick={onAdd} 
          size="sm" 
          className="h-10 px-5 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4 mr-1" /> Add
        </Button>
      </CardContent>
    </Card>
  );
}