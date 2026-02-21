/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { getCopy } from "@/lib/copy";
import { getStoryBySlug } from "@/lib/content";
import StoryBlocks from "@/components/site/story-blocks";
import { notFound } from "next/navigation";

export default async function StoryDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const copy = getCopy(locale);
  const story = await getStoryBySlug(locale, slug);

  if (!story) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-10 px-4 pb-24 pt-10 md:px-6">
      <Link href={`/${locale}/bible-stories`} className="inline-flex items-center gap-2 text-sm text-sky-900">
        <ArrowLeft className="h-4 w-4" /> {copy.common.backToStories}
      </Link>

      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-yellow-700">{story.tags.join(" - ")}</p>
        <h1 className="font-display text-4xl text-sky-950">{story.title}</h1>
        <p className="text-lg text-sky-900/70">{story.subtitle}</p>
        <div className="flex items-center gap-2 text-xs text-sky-900/60">
          <Clock className="h-4 w-4" /> {story.readingTime} {copy.common.readingTime}
        </div>
      </div>

      <img
        src={story.hero}
        alt={story.title}
        className="h-72 w-full rounded-[32px] object-cover shadow-lg shadow-sky-950/10"
      />

      <StoryBlocks blocks={story.blocks} />
    </div>
  );
}
