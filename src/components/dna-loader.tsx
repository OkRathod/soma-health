import React from "react";

export function DNALoader() {
  // We create 12 pairs of dots
  const dots = Array.from({ length: 12 });

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background gap-8">
      
      {/* The DNA Container */}
      <div className="relative flex items-center justify-center h-16 w-48">
        {dots.map((_, i) => (
          <div key={i} className="absolute h-full" style={{ left: `${i * 15}px` }}>
            {/* Strand 1 (Blue) */}
            <div
              className="dna-dot h-3 w-3 bg-info shadow-sm"
              style={{
                animation: "strand1 2s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite",
                animationDelay: `${i * 0.15}s`,
              }}
            />
            {/* Strand 2 (Light Blue) */}
            <div
              className="dna-dot h-3 w-3 bg-info/40"
              style={{
                animation: "strand2 2s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite",
                animationDelay: `${i * 0.15}s`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Loading Text */}
      {/* <div className="flex flex-col items-center gap-1">
        <p className="text-xs font-medium text-blue-400 uppercase tracking-widest">Loading Settings...</p>
      </div> */}
    </div>
  );
}