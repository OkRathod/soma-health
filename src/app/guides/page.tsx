import Link from "next/link";
import { guides } from "@/lib/guides";
import { ArrowRight, BookOpen, ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import { auth } from "@clerk/nextjs/server"; // 👈 Import Server Auth
import { CheckCircle2 } from "lucide-react"; // Import Check Icon
import { prisma } from "@/lib/prisma"; // Import DB client
import Image from "next/image";


export const metadata: Metadata = {
  title: "Soma Guides | Health & Productivity Strategies",
  description: "Master your metabolism and productivity with our expert guides and protocols.",
};

// 👇 Make the component async to use await auth()
export default async function GuidesIndex() {
  // 👇 Check if user is signed in on the server
  const { userId } = await auth();
  
  // Define destination based on auth status
  const backLink = userId ? "/dashboard" : "/";
  const backLabel = userId ? "Back to Dashboard" : "Back to Home";

  // 👇 NEW: Fetch list of read guides for this user
  let readSlugs = new Set<string>();
  
  if (userId) {
    const readRecords = await prisma.userReadGuide.findMany({
      where: { userId },
      select: { guideSlug: true }
    });
    // Create a Set for instant O(1) lookups
    readSlugs = new Set(readRecords.map(r => r.guideSlug));
  }

  return (
    <div className="min-h-screen bg-background pt-12 pb-16 px-6">
      <div className="container mx-auto max-w-5xl">
        
        {/* 👇 DYNAMIC BACK BUTTON */}
        {/* <div className="mb-12">
            <Button asChild variant="ghost" className="pl-0 text-muted-foreground hover:text-foreground">
                <Link href={backLink}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> {backLabel}
                </Link>
            </Button>
        </div> */}

        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <BookOpen className="w-4 h-4" /> Knowledge Center
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Small Changes. Better Days.
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Science for your body, your habits, and your everyday life.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides.map((guide) => {
            const isRead = readSlugs.has(guide.slug);
            return (
        <Link 
            key={guide.slug} 
            href={`/guides/${guide.slug}`}
            className={`group flex flex-col h-full bg-card border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 relative
                ${isRead ? 'border-primary/40 bg-primary/5' : 'border-border'} 
            `}
        >
            {/* 👇 "READ" BADGE (Absolute positioned) */}
            {isRead && (
                <div className="absolute top-4 right-4 z-10 bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 backdrop-blur-md">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Read
                </div>
            )}
              {/* Image Placeholder */}
              <div className="relative h-48 bg-secondary/50 flex items-center justify-center text-muted-foreground group-hover:bg-secondary/70 transition-colors overflow-hidden">
                {/* 👇 CONDITIONAL LOGIC */}
                 {guide.image ? (
                    <Image 
                      src={guide.image} 
                      alt={guide.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                 ) : (
                    <span className="text-4xl">🧬</span>
                 )}
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <span>{guide.date}</span>
                  <span>{guide.readTime}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {guide.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
                  {guide.description}
                </p>
                <div className="flex items-center text-sm font-medium text-primary mt-auto">
                  Read Protocol <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
        </Link>
    );
      })}
        </div>

      </div>
    </div>
  );
}