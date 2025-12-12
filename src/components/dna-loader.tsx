// import React from "react";

// export function DNALoader() {
//   // We create 12 pairs of dots
//   const dots = Array.from({ length: 12 });

//   return (
//     <div className="flex h-screen w-full flex-col items-center justify-center bg-background gap-8">
      
//       {/* The DNA Container */}
//       <div className="relative flex items-center justify-center h-16 w-48">
//         {dots.map((_, i) => (
//           <div key={i} className="absolute h-full" style={{ left: `${i * 15}px` }}>
//             {/* Strand 1 (Blue) */}
//             <div
//               className="dna-dot h-3 w-3 bg-info shadow-sm"
//               style={{
//                 animation: "strand1 2s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite",
//                 animationDelay: `${i * 0.15}s`,
//               }}
//             />
//             {/* Strand 2 (Light Blue) */}
//             <div
//               className="dna-dot h-3 w-3 bg-info/40"
//               style={{
//                 animation: "strand2 2s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite",
//                 animationDelay: `${i * 0.15}s`,
//               }}
//             />
//           </div>
//         ))}
//       </div>

//       {/* Loading Text */}
//       {/* <div className="flex flex-col items-center gap-1">
//         <p className="text-xs font-medium text-blue-400 uppercase tracking-widest">Loading Settings...</p>
//       </div> */}
//     </div>
//   );
// }

export function DNALoader() {
  const dots = Array.from({ length: 12 });

  return (
    // 👇 FIX: 'fixed inset-0 z-[9999]' forces it to cover the WHOLE screen
    // This ignores all padding and sits on top of the Sidebar/Navbar
    <div className="fixed inset-0 z-[9999] flex h-screen w-screen flex-col items-center justify-center bg-background gap-8">
      
      {/* Container (h-20 w-60) */}
      <div className="relative flex items-center justify-center h-20 w-60 perspective-[200px]">
        {dots.map((_, i) => (
          <div 
            key={i} 
            className="absolute h-full w-4 flex flex-col justify-between items-center"
            style={{ 
              left: `${i * 18}px`, 
              animation: "spinPair 4s linear infinite", 
              animationDelay: `${i * -0.3}s`, 
            }}
          >
            <div className="h-3 w-3 rounded-full bg-info shadow-sm" />
            <div className="w-[1px] h-full bg-info/20" />
            <div className="h-3 w-3 rounded-full bg-info/40" />
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-1 animate-pulse">
        {/* Optional text */}
      </div>
    </div>
  );
}