"use client";

export function QuoteBanner({ quote }: { quote: { quote: string; author: string } }) {
  return (
    <div className="relative overflow-hidden border-2 border-border/60 rounded-2xl bg-[var(--quote-bg)] px-6 py-5 flex flex-row gap-4 shadow-sm transition-all hover:shadow-md w-full items-start">
      
      {/* Decorative Quote Mark - Smaller & Elegant */}
      <span className="text-7xl leading-none font-serif text-[var(--quote-accent)] select-none pointer-events-none -mt-1 shrink-0 opacity-90">
        “
      </span>

      {/* Text Content */}
      <div className="flex flex-col gap-3 z-10 w-full pt-1">
        <p className="text-xl font-serif text-[var(--quote-text)] leading-relaxed italic">
          {quote.quote}
        </p>
        
        {quote.author && (
          <p className="text-sm font-medium text-[var(--quote-author)] self-end uppercase tracking-wider opacity-90">
            — {quote.author}
          </p>
        )}
      </div>
    </div>
  );
}