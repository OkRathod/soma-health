import { getGuide, guides } from "@/lib/guides";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { MarkReadButton } from "@/components/guides/mark-read-button";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/layout/page";

interface Props {
  params: Promise<{ slug: string }>;
}

// Metadata includes the canonical URL
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

  // Rendered dynamically on the server (no static params needed)
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
    <PageShell width="narrow">
      <article>
        <Link
          href="/guides"
          className="-ml-2 inline-flex h-10 items-center gap-1.5 rounded-full px-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> All guides
        </Link>

        {/* Article header (visible to all) */}
        <header className="mb-8 mt-4 border-b border-border pb-8 md:mb-10 md:mt-6 md:pb-10">
          <p className="eyebrow mb-4">Guide</p>
          <h1 className="display text-[2.5rem] sm:text-5xl md:text-[3.5rem]">{guide.title}</h1>
          <p className="label-mono mt-5">
            {guide.date} <span className="mx-1 opacity-50">/</span> {guide.readTime}
          </p>
        </header>

        {/* Content (visible to all) */}
        <div
          className="
            prose max-w-none md:prose-lg
            prose-p:leading-relaxed prose-a:underline-offset-4 prose-a:decoration-foreground/30 hover:prose-a:decoration-foreground
            prose-blockquote:font-display prose-blockquote:text-2xl prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:leading-snug
            prose-img:rounded-2xl
          "
          dangerouslySetInnerHTML={{ __html: guide.content }}
        />

        {/* Footer adapts to reader vs guest */}
        <div className="mt-12 flex flex-col gap-5 rounded-3xl bg-surface p-6 sm:flex-row sm:items-center sm:justify-between md:mt-16 md:p-8">
          {userId ? (
            <>
              <div>
                <h3 className="font-display text-[1.75rem] leading-tight tracking-[-0.02em]">Finished reading?</h3>
                <p className="mt-1 text-sm text-muted-foreground">Mark this guide as complete.</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <MarkReadButton slug={slug} isRead={isRead} />
                <Button asChild variant="ghost">
                  <Link href="/guides">Back to guides</Link>
                </Button>
              </div>
            </>
          ) : (
            <>
              <div>
                <h3 className="font-display text-[1.75rem] leading-tight tracking-[-0.02em]">
                  Want to save your progress?
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">Create a free account to track completed guides.</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button asChild>
                  <Link href="/sign-up">
                    Create free account <ArrowUpRight />
                  </Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link href="/guides">Back to guides</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </article>
    </PageShell>
  );
}
