import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { ArrowUpRight, Check } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { guides } from "@/lib/guides";
import { prisma } from "@/lib/prisma";
import { PageShell, PageHeader } from "@/components/layout/page";
import { SomaMark } from "@/components/brand/logo";

export const metadata: Metadata = {
  title: "Soma Guides | Health & Productivity Strategies",
  description: "Master your metabolism and productivity with our expert guides and protocols.",
};

export default async function GuidesIndex() {
  // Guides are public; read state only exists for signed-in readers.
  const { userId } = await auth();

  let readSlugs = new Set<string>();

  if (userId) {
    const readRecords = await prisma.userReadGuide.findMany({
      where: { userId },
      select: { guideSlug: true }
    });
    // A Set gives O(1) lookups while rendering the list
    readSlugs = new Set(readRecords.map((r: { guideSlug: string }) => r.guideSlug));
  }

  const readCount = guides.filter((g) => readSlugs.has(g.slug)).length;

  return (
    <PageShell>
      <PageHeader
        eyebrow="Guides"
        title={
          <>
            Small changes. <em>Better days.</em>
          </>
        }
        description="Science for your body, your habits, and your everyday life."
        actions={
          <p className="label-mono">
            {userId
              ? `${readCount} of ${guides.length} read`
              : `${guides.length} ${guides.length === 1 ? "guide" : "guides"}`}
          </p>
        }
      />

      <ol className="panel divide-y divide-border overflow-hidden">
        {guides.map((guide, i) => {
          const isRead = readSlugs.has(guide.slug);
          return (
            <li key={guide.slug}>
              <Link
                href={`/guides/${guide.slug}`}
                className="group grid gap-4 p-4 transition-colors hover:bg-surface/60 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-6 sm:p-5 lg:grid-cols-[2.5rem_17rem_minmax(0,1fr)_auto] lg:items-center lg:gap-8 lg:p-6"
              >
                <span className="hidden font-mono text-xs tabular-nums text-muted-foreground lg:block">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="relative block aspect-[16/10] overflow-hidden rounded-2xl bg-surface">
                  {guide.image ? (
                    <Image
                      src={guide.image}
                      alt={guide.title}
                      fill
                      sizes="(min-width: 1024px) 272px, (min-width: 640px) 208px, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <span className="dot-grid absolute inset-0 grid place-items-center">
                      <SomaMark size={44} />
                    </span>
                  )}
                </span>

                <span className="block min-w-0">
                  <span className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="label-mono">
                      {guide.date} <span className="mx-1 opacity-50">/</span> {guide.readTime}
                    </span>
                    {isRead && (
                      <span className="inline-flex h-6 items-center gap-1 rounded-full bg-lime px-2.5 font-mono text-[11px] uppercase tracking-[0.1em] text-lime-foreground">
                        <Check className="size-3" /> Read
                      </span>
                    )}
                  </span>
                  <span className="mt-2.5 block font-display text-[1.75rem] leading-[1.08] tracking-[-0.02em] md:text-[2rem]">
                    {guide.title}
                  </span>
                  <span className="mt-2 block max-w-xl text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {guide.description}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium lg:hidden">
                    Read guide <ArrowUpRight className="size-4" />
                  </span>
                </span>

                <span
                  className="hidden size-11 place-items-center rounded-full border border-border transition-[transform,background-color,color,border-color] duration-300 ease-out group-hover:rotate-45 group-hover:border-transparent group-hover:bg-foreground group-hover:text-background lg:grid"
                  aria-hidden="true"
                >
                  <ArrowUpRight className="size-4" />
                </span>
              </Link>
            </li>
          );
        })}
      </ol>

      {!userId && (
        <div className="mt-4 flex flex-col gap-4 rounded-3xl bg-surface p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
          <div>
            <p className="text-[15px] font-medium">Keep track of what you have read</p>
            <p className="mt-1 text-sm text-muted-foreground">A free account remembers your place across guides.</p>
          </div>
          <Link
            href="/sign-up"
            className="press inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-full bg-primary px-4.5 text-sm font-medium text-primary-foreground"
          >
            Create free account <ArrowUpRight className="size-4" />
          </Link>
        </div>
      )}
    </PageShell>
  );
}
