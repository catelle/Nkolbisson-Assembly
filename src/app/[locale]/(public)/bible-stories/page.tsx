import { BookOpen } from "lucide-react";
import StoryList from "@/components/site/story-list";
import { getCopy } from "@/lib/copy";
import { getStories, getStoryTags } from "@/lib/content";

export default async function BibleStoriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const copy = getCopy(locale);
  const stories = await getStories(locale);
  const tags = await getStoryTags(locale);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-12 px-4 pb-24 pt-12 md:px-6">
      <div className="rounded-[32px] bg-sky-950 px-8 py-10 text-white shadow-lg shadow-sky-950/25">
        <div className="flex items-center gap-3 text-yellow-200">
          <BookOpen className="h-6 w-6" />
          <span className="text-xs font-semibold uppercase tracking-[0.3em]">{copy.storiesPage.label}</span>
        </div>
        <h1 className="mt-4 font-display text-4xl">{copy.storiesPage.title}</h1>
        <p className="mt-3 text-sm text-sky-100/80">{copy.storiesPage.description}</p>
      </div>

      <StoryList
        stories={stories}
        tags={tags}
        locale={locale}
        labels={{
          searchLabel: copy.storiesPage.searchLabel,
          searchPlaceholder: copy.storiesPage.searchPlaceholder,
          filterLabel: copy.storiesPage.filterLabel,
          filterAll: copy.storiesPage.filterAll,
          noResults: copy.storiesPage.noResults
        }}
      />
    </div>
  );
}
