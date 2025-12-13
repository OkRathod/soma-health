import { getGuide, guides } from "@/lib/guides";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

// 1. Dynamic SEO Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  
  return {
    title: `${guide.title} | Soma`,
    description: guide.description,
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) return notFound();

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-6">
      <article className="container mx-auto max-w-3xl">
        
        {/* Back Button */}
        <Link 
          href="/guides" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Guides
        </Link>

        {/* Article Header */}
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

        {/* Article Content - The 'prose' class does the magic */}
        <div 
          className="
            prose prose-lg dark:prose-invert max-w-none 
            prose-headings:font-bold prose-h1:text-primary prose-a:text-info prose-strong:text-foreground
            prose-blockquote:border-l-primary prose-blockquote:bg-secondary/20 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:not-italic prose-blockquote:rounded-r-lg
          "
          dangerouslySetInnerHTML={{ __html: guide.content }} 
        />

        {/* Call to Action at Bottom */}
        <div className="mt-16 p-8 bg-secondary/30 border border-border rounded-2xl text-center">
          <h3 className="text-2xl font-bold mb-3">Ready to optimize your day?</h3>
          <p className="text-muted-foreground mb-6">Start applying the Soma Protocol right now.</p>
          <Link 
            href="/dashboard" 
            className="inline-flex items-center justify-center h-10 px-8 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            Go to Dashboard
          </Link>
        </div>

      </article>
    </div>
  );
}

// 2. Generate Static Paths (for super fast loading)
export async function generateStaticParams() {
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}