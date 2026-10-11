"use client";

/** Daily quote, set in the display serif on an ink panel. */
export function QuoteBanner({ quote }: { quote: { quote: string; author: string } }) {
  return (
    <figure className="panel-ink flex h-full flex-col justify-between gap-8 p-5 md:p-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-foreground/50">Thought for today</p>
      <div>
        <blockquote className="font-display text-[1.7rem] leading-[1.12] tracking-[-0.01em] text-ink-foreground">
          <span className="text-lime">“</span>
          {quote.quote}
          <span className="text-lime">”</span>
        </blockquote>
        {quote.author && (
          <figcaption className="mt-4 text-sm text-ink-foreground/55">— {quote.author}</figcaption>
        )}
      </div>
    </figure>
  );
}
