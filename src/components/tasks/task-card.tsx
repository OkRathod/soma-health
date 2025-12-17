"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, ChevronDown, Clock } from "lucide-react";
import { format } from "date-fns";

export function TaskCard({ task, onToggle, onSubToggle, onSubProgress, onDelete, onEdit }: any) {
    const [expanded, setExpanded] = useState(false);

    // Dynamic Border Color
    const getPriorityColor = (p: string) => {
        if (p === 'HIGH') return 'border-l-destructive/60 hover:border-l-destructive';
        if (p === 'MEDIUM') return 'border-l-orange-500/60 hover:border-l-orange-500';
        if (p === 'HABIT') return 'border-l-violet-500/60 hover:border-l-violet-500';
        return 'border-l-primary/30 hover:border-l-primary';
    };

    // Semantic Badge Styles
    const getBadgeStyle = (p: string) => {
        if (p === 'HIGH') return 'bg-destructive/15 text-destructive border-destructive/20';
        if (p === 'MEDIUM') return 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20';
        if (p === 'HABIT') return 'bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/20';
        return 'bg-secondary text-secondary-foreground border-border';
    };

    return (
        <Card className={`group relative overflow-hidden transition-all duration-300 border-l-[3px] shadow-sm hover:shadow-md ${task.isCompleted ? 'opacity-60 bg-muted/40' : 'bg-card'} ${getPriorityColor(task.priority)}`}>
            {/* 👇 CHANGED: Reduced padding from p-4 to p-3 */}
            <CardContent className="p-3">
                <div className="flex items-start gap-3">
                    {/* Checkbox */}
                    <div className="pt-0.5">
                        <Checkbox 
                            checked={task.isCompleted} 
                            onCheckedChange={() => onToggle(task.id, task.isCompleted)}
                            className="w-4 h-4 transition-transform active:scale-95 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                    </div>
                    
                    <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-start">
                            <div className="space-y-0.5"> {/* 👇 Tighter vertical spacing */}
                                <h3 className={`font-semibold text-sm leading-tight transition-all ${task.isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                                    {task.title}
                                </h3>
                                
                                <div className="flex flex-wrap items-center gap-1.5">
                                    {task.startTime && (
                                        <div className="flex items-center text-[10px] font-medium text-muted-foreground bg-secondary/50 px-1.5 py-0.5 rounded-md">
                                            <Clock className="w-2.5 h-2.5 mr-1 opacity-70" />
                                            {format(new Date(task.startTime), "h:mm a")}
                                        </div>
                                    )}
                                    {/* 👇 Smaller Badge Padding */}
                                    <span className={`text-[9px] px-1.5 py-0 rounded border font-semibold tracking-wide uppercase ${getBadgeStyle(task.priority)}`}>
                                        {task.priority}
                                    </span>
                                </div>
                            </div>
                            
                            {/* Hover Actions - More compact buttons */}
                            <div className={`flex items-center gap-0.5 transition-opacity duration-200 ${expanded ? 'opacity-100' : 'opacity-100 md:opacity-0 md:group-hover:opacity-100'}`}>
                                <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors" onClick={() => onEdit(task)}>
                                    <Edit2 className="w-3 h-3"/>
                                </Button>
                                <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors" onClick={() => onDelete(task.id)}>
                                    <Trash2 className="w-3 h-3"/>
                                </Button>
                                {(task.description || task.subtasks.length > 0) && (
                                    <Button variant="ghost" size="icon" className={`h-6 w-6 text-muted-foreground transition-transform duration-200 ${expanded ? 'rotate-180 bg-secondary' : ''}`} onClick={() => setExpanded(!expanded)}>
                                        <ChevronDown className="w-3.5 h-3.5" />
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Expandable Content */}
                        {expanded && (
                            <div className="pt-2 mt-2 border-t border-border/40 animate-in slide-in-from-top-1">
                                {task.description && (
                                    <p className="text-xs text-muted-foreground mb-2 leading-relaxed bg-secondary/20 p-2 rounded-md">
                                        {task.description}
                                    </p>
                                )}
                                
                                {task.subtasks.length > 0 && (
                                    <div className="space-y-2 pl-2 border-l-2 border-border/60">
                                        {task.subtasks.map((st: any) => (
                                            <div key={st.id} className="flex items-center gap-2 text-xs group/sub">
                                                <Checkbox 
                                                    className="w-3.5 h-3.5"
                                                    checked={st.isCompleted}
                                                    onCheckedChange={() => onSubToggle(task.id, st.id, st.isCompleted)}
                                                />
                                                <span className={`transition-all ${st.isCompleted ? "line-through opacity-50 text-muted-foreground" : "text-foreground"}`}>
                                                    {st.title}
                                                </span>
                                                
                                                {st.targetValue ? (
                                                    <div className="ml-auto flex items-center gap-1 bg-background border rounded px-1.5 py-0 shadow-sm" onClick={e => e.stopPropagation()}>
                                                        <input 
                                                            type="number"
                                                            // 👇 UPDATED: Increased width (w-12), height (h-6), and text size (text-xs)
                                                            className="w-12 h-6 text-xs text-center bg-transparent border border-border/50 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none font-mono transition-all"
                                                            value={st.currentValue || 0}
                                                            onChange={(e) => {
                                                                const val = parseInt(e.target.value);
                                                                if (!isNaN(val)) onSubProgress(task.id, st.id, val);
                                                            }}
                                                            onClick={e => e.stopPropagation()} // Prevent card collapse when clicking input
                                                        />
                                                        <span className="text-xs text-muted-foreground border-l pl-1 font-medium">
                                                            / {st.targetValue} {st.unit}
                                                        </span>
                                                    </div>
                                                ) : null}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}