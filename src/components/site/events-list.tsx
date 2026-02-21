"use client";

import { useMemo, useState } from "react";
import type { Event } from "@/lib/types";
import { EventCard } from "@/components/site/cards";

export default function EventsList({
  events,
  ministries,
  locale,
  labels
}: {
  events: Event[];
  ministries: string[];
  locale: string;
  labels: {
    searchLabel: string;
    searchPlaceholder: string;
    ministryLabel: string;
    periodLabel: string;
    upcoming: string;
    past: string;
    all: string;
    noResults: string;
  };
}) {
  const safeEvents = Array.isArray(events) ? events : [];
  const safeMinistries = Array.isArray(ministries) ? ministries : [];
  const [query, setQuery] = useState("");
  const [ministry, setMinistry] = useState("all");
  const [timing, setTiming] = useState("upcoming");

  const filtered = useMemo(() => {
    const now = new Date();
    return safeEvents
      .filter((event) => (ministry === "all" ? true : event.ministry === ministry))
      .filter((event) => {
        if (!query.trim()) return true;
        const haystack = `${event.title} ${event.description} ${event.location}`.toLowerCase();
        return haystack.includes(query.trim().toLowerCase());
      })
      .filter((event) => {
        if (timing === "all") return true;
        const start = new Date(event.startAt);
        return timing === "upcoming" ? start >= now : start < now;
      });
  }, [safeEvents, ministry, query, timing]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 rounded-3xl border border-sky-900/10 bg-white/90 p-6 md:grid-cols-[1.2fr_0.8fr_0.6fr]">
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
            {labels.ministryLabel}
          </label>
          <select
            value={ministry}
            onChange={(event) => setMinistry(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-sky-900/10 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="all">{labels.all}</option>
            {safeMinistries.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-900/60">
            {labels.periodLabel}
          </label>
          <select
            value={timing}
            onChange={(event) => setTiming(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-sky-900/10 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="upcoming">{labels.upcoming}</option>
            <option value="past">{labels.past}</option>
            <option value="all">{labels.all}</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-sky-900/20 bg-white/80 p-8 text-center text-sm text-sky-900/60">
          {labels.noResults}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
