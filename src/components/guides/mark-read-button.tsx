"use client";

import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import { markGuideAsRead } from "@/app/actions";
import { useTransition } from "react";

export function MarkReadButton({ slug, isRead }: { slug: string, isRead: boolean }) {
  const [isPending, startTransition] = useTransition();

  if (isRead) {
    return (
      <Button variant="lime" disabled className="disabled:opacity-100">
        <Check /> Marked as read
      </Button>
    );
  }

  return (
    <Button
      onClick={() => startTransition(() => markGuideAsRead(slug))}
      disabled={isPending}
    >
      {isPending ? <Loader2 className="size-4 animate-spin" /> : <Check />}
      Mark as read
    </Button>
  );
}
