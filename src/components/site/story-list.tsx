"use client";

import { useMemo, useState } from "react";
import type { Story } from "@/lib/types";
import { StoryCard } from "@/components/site/cards";

export default function StoryList({
  stories,
  tags,
  locale,
  labels
}: {
  stories: Story[];
  tags: string[];
  locale: string;
  labels: {
    searchLabel: string;
    searchPlaceholder: string;
    filterLabel: string;
    filterAll: string;
    noResults: string;
  };
}) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("all");

  const filtered = useMemo(() => {
    return stories
      .filter((story) => (tag === "all" ? true : story.tags.includes(tag)))
      .filter((story) => {
        if (!query.trim()) return true;
        const haystack = `${story.title} ${story.subtitle}`.toLowerCase();
        return haystack.includes(query.trim().toLowerCase());
      });
  }, [stories, tag, query]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 rounded-3xl border border-sky-900/10 bg-white/90 p-6 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-900/60">
            {labels.searchLabel}
          </label>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={labels.searchPlaceholder}
            className="mt-2 w-full rounded-2xl border border-sky-900/10 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-900/60">
            {labels.filterLabel}
          </label>
          <select
            value={tag}
            onChange={(event) => setTag(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-sky-900/10 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="all">{labels.filterAll}</option>
            {tags.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-sky-900/20 bg-white/80 p-8 text-center text-sm text-sky-900/60">
          {labels.noResults}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {filtered.map((story) => (
            <StoryCard key={story.id} story={story} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
