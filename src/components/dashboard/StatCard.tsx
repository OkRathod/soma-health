"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  subtext: React.ReactNode;
  icon?: React.ReactNode;
  valueColor?: string;
}

export function StatCard({ title, value, subtext, icon, valueColor = "text-foreground" }: StatCardProps) {
  return (
    <Card className="bg-card border-border/60 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
      {icon && (
        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
          {icon}
        </div>
      )}
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-3xl font-bold tracking-tight ${valueColor}`}>{value}</div>
        <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
          {subtext}
        </div>
      </CardContent>
    </Card>
  );
}