"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export function HistoryLogCard({ log, onDelete }: { log: any, onDelete: (id: string) => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card 
      className={`bg-card border-border shadow-sm transition-all group relative cursor-pointer ${expanded ? 'ring-1 ring-primary/20' : 'hover:shadow-md'}`}
      onClick={() => setExpanded(!expanded)}
    >
      <CardContent className="flex gap-5 relative group transition-all">
        {/* TIME COLUMN */}
        <div className="flex flex-col items-center min-w-[70px] pr-5 border-r border-border/40">
          <div className="text-sm font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md shadow-sm">
            {new Date(log.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className={`w-[3px] mt-3 rounded-full bg-gradient-to-b from-primary/40 to-primary/10 transition-all duration-300 ${expanded ? "h-24 opacity-100" : "h-10 opacity-70"}`} />
        </div>

        {/* CONTENT COLUMN */}
        <div className="flex-1 space-y-3 pr-10">
          <div className="flex justify-between items-start">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono font-semibold text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20 shadow-sm">
                +{log.totalCaloriesIn} <span className="text-muted-foreground ml-1">kcal</span>
              </span>
              {log.totalCaloriesOut > 0 && (
                <span className="text-[11px] font-mono font-semibold text-success bg-success/10 px-2 py-1 rounded border border-success/20 shadow-sm">
                  -{log.totalCaloriesOut}
                </span>
              )}
              {log.waterMl > 0 && (
                <span className="text-[11px] font-mono font-semibold text-info bg-info/10 px-2 py-1 rounded border border-info/20 shadow-sm">
                  {log.waterMl}ml
                </span>
              )}
            </div>
          </div>

          {!expanded && (
            <p className="text-sm text-foreground/80 line-clamp-1 italic">"{log.rawText}"</p>
          )}

          {expanded && (
            <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="bg-secondary/20 p-3 rounded-lg border border-border/40 text-sm leading-relaxed shadow-sm">
                "{log.rawText}"
              </div>
              {log.aiFeedback && (
                <div className="bg-primary/5 px-3 py-2 rounded-lg border border-primary/10 text-xs italic text-muted-foreground shadow-sm">
                  <span className="font-semibold text-primary not-italic mr-1">Coach:</span>
                  {log.aiFeedback}
                </div>
              )}
            </div>
          )}
        </div>

        {/* DELETE BUTTON */}
        <div className={`absolute top-3 right-3 transition-opacity duration-200 ${expanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 shadow-sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(log.id);
            }}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}