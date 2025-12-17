// components/guides/mark-read-button.tsx
"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, Circle } from "lucide-react";
import { markGuideAsRead } from "@/app/actions";
import { useTransition } from "react";

export function MarkReadButton({ slug, isRead }: { slug: string, isRead: boolean }) {
  const [isPending, startTransition] = useTransition();

  if (isRead) {
    return (
      <Button variant="outline" disabled className="gap-2 border-green-500/20 text-green-600 bg-green-500/10 opacity-100">
        <CheckCircle className="w-4 h-4" /> Protocol Completed
      </Button>
    );
  }

  return (
    <Button 
      onClick={() => startTransition(() => markGuideAsRead(slug))} 
      disabled={isPending}
      className="gap-2"
    >
      {isPending ? <Circle className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
      Mark as Read
    </Button>
  );
}