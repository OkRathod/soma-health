"use client";
import { Button } from "@/components/ui/button";
import { Utensils, Loader2, Send, Mic } from "lucide-react";

interface QuickLogProps {
  value: string;
  onChange: (val: string) => void;
  onLog: () => void;
  isProcessing: boolean;
}

export function QuickLog({ value, onChange, onLog, isProcessing }: QuickLogProps) {
  return (
    <>
      {/* Desktop Version: Inline */}
      <div className="hidden md:block bg-card p-1 rounded-2xl shadow-sm border-2 border-border/50">
        <div className="p-4 space-y-3">
          <label className="text-sm font-semibold text-foreground/80 flex items-center gap-2">
            <div className="p-1.5 bg-primary/10 rounded-md text-primary"><Utensils className="w-4 h-4"/></div>
            Quick Log
          </label>
          <div className="relative">
            <input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onLog()}
              placeholder="Type '2 eggs and toast'..."
              className="w-full h-12 pl-4 pr-24 rounded-xl border border-border bg-background/50 focus:bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-inner"
            />
            <div className="absolute right-1 top-1 bottom-1 flex gap-1">
                <Button 
                onClick={onLog} 
                disabled={isProcessing || !value.trim()}
                size="sm"
                className="h-full px-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg"
                >
                {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Version: Sticky Bottom */}
      <div className="md:hidden fixed bottom-[calc(4rem+env(safe-area-inset-bottom))] left-0 right-0 p-4 bg-background/80 backdrop-blur-xl border-t border-border z-45">
        <div className="relative flex items-center gap-2 max-w-md mx-auto">
            <div className="relative flex-1">
                <input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Log food or workout..."
                    className="w-full h-12 pl-4 pr-12 rounded-full border border-border bg-card text-base focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-lg"
                />
                <Utensils className="absolute right-4 top-3.5 w-5 h-5 text-muted-foreground opacity-50" />
            </div>
            <Button 
                onClick={onLog} 
                disabled={isProcessing || !value.trim()}
                size="icon"
                className="h-12 w-12 rounded-full shrink-0 shadow-lg"
            >
                {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </Button>
        </div>
      </div>
    </>
  );
}