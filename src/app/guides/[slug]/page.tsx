import { getGuide, guides } from "@/lib/guides";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, UserPlus } from "lucide-react";
import { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { MarkReadButton } from "@/components/guides/mark-read-button";
import { Button } from "@/components/ui/button";

interface Props {
  params: Promise<{ slug: string }>;
}

// 👇 1. UPDATED METADATA: Includes the Canonical URL
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  
  if (!guide) return {};

  const baseUrl = process.env.NODE_ENV === "development" 
    ? "http://localhost:3000" 
    : "https://www.somafit.in";
  
  const pageUrl = `${baseUrl}/guides/${slug}`;
  
  return {
    title: `${guide.title} | Soma`,
    description: guide.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${guide.title} | Soma`,
      description: guide.description,
      url: pageUrl,
      type: 'article',
    }
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) return notFound();

  // 👇 2. DYNAMIC SERVER RENDERING (Works perfectly without static params)
  const { userId } = await auth();
  let isRead = false;

  // Only check DB if user exists
  if (userId) {
    const record = await prisma.userReadGuide.findUnique({
      where: {
        userId_guideSlug: { userId, guideSlug: slug }
      }
    });
    isRead = !!record;
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-6">
      <article className="container mx-auto max-w-3xl">
        
        {/* Article Header (Visible to All) */}
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            {guide.title}
          </h1>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> {guide.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" /> {guide.readTime}
            </div>
          </div>
        </header>

        {/* Content (Visible to All) */}
        <div 
          className="
            prose prose-lg dark:prose-invert max-w-none text-foreground
            prose-headings:font-bold prose-headings:text-foreground prose-a:text-info prose-strong:text-foreground
            prose-blockquote:border-l-foreground prose-blockquote:bg-secondary/20 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:not-italic prose-blockquote:rounded-r-lg
          "
          dangerouslySetInnerHTML={{ __html: guide.content }} 
        />

        {/* SMART FOOTER: Adapts to User vs Guest */}
        <div className="mt-16 p-8 bg-secondary/30 border border-border rounded-2xl text-center">
          
          {userId ? (
            /* === LOGGED IN VIEW === */
            <>
                <h3 className="text-2xl font-bold mb-3">Finished Reading?</h3>
                <p className="text-muted-foreground mb-6">Mark this protocol as complete.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <MarkReadButton slug={slug} isRead={isRead} />
                    <Link href="/guides" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                        Back to Guides
                    </Link>
                </div>
            </>
          ) : (
            /* === GUEST VIEW === */
            <>
                <h3 className="text-2xl font-bold mb-3">Want to save your progress?</h3>
                <p className="text-muted-foreground mb-6">Create a free account to track completed protocols.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button asChild className="gap-2 shadow-lg shadow-primary/20">
                        <Link href="/sign-up">
                            <UserPlus className="w-4 h-4" /> Create Free Account
                        </Link>
                    </Button>
                    <Button asChild variant="ghost">
                        <Link href="/guides">
                            Back to Guides
                        </Link>
                    </Button>
                </div>
            </>
          )}

        </div>

      </article>
    </div>
  );
}