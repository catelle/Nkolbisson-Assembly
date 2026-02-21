/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Event, Ministry, Story, Update } from "@/lib/types";

export function EventCard({ event, locale }: { event: Event; locale: string }) {
  const dateLocale = locale === "en" ? "en-US" : "fr-FR";
  return (
    <div className="group rounded-3xl border border-yellow-900/10 bg-white p-5 shadow-sm transition hover:-transky-y-1 hover:shadow-lg">
      <img
        src={event.image}
        alt={event.title}
        className="h-40 w-full rounded-2xl object-cover"
        loading="lazy"
      />
      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-700">
          {event.ministry}
        </p>
        <h3 className="mt-2 font-display text-xl text-sky-950">{event.title}</h3>
        <p className="mt-2 text-sm text-sky-900/70">{event.description}</p>
        <div className="mt-4 text-xs text-sky-900/70">
          <p>{new Date(event.startAt).toLocaleString(dateLocale, { dateStyle: "long", timeStyle: "short" })}</p>
          <p>{event.location}</p>
        </div>
      </div>
    </div>
  );
}

export function MinistryCard({ ministry }: { ministry: Ministry }) {
  return (
    <div className="rounded-3xl border border-sky-900/10 bg-white p-6 shadow-sm">
      <img
        src={ministry.image}
        alt={ministry.name}
        className="h-36 w-full rounded-2xl object-cover"
        loading="lazy"
      />
      <h3 className="mt-4 font-display text-xl text-sky-950">{ministry.name}</h3>
      <p className="mt-2 text-sm text-sky-900/70">{ministry.summary}</p>
      <div className="mt-3 text-xs text-sky-900/70">
        <p>Responsable: {ministry.leader}</p>
        <p>{ministry.meetingTime}</p>
      </div>
      <p className="mt-4 text-sm text-sky-900/80">{ministry.latestUpdate}</p>
    </div>
  );
}

export function UpdateCard({ update, locale }: { update: Update; locale: string }) {
  const dateLocale = locale === "en" ? "en-US" : "fr-FR";
  return (
    <Link
      href={`/${locale}/news/${update.slug}`}
      className="group rounded-3xl border border-sky-900/10 bg-white p-5 shadow-sm transition hover:-transky-y-1 hover:shadow-lg"
    >
      <img
        src={update.cover}
        alt={update.title}
        className="h-40 w-full rounded-2xl object-cover"
        loading="lazy"
      />
      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
          {new Date(update.publishedAt).toLocaleDateString(dateLocale, { dateStyle: "medium" })}
        </p>
        <h3 className="mt-2 font-display text-xl text-sky-950">{update.title}</h3>
        <p className="mt-2 text-sm text-sky-900/70">{update.excerpt}</p>
      </div>
    </Link>
  );
}

export function StoryCard({ story, locale }: { story: Story; locale: string }) {
  const readingLabel = locale === "en" ? "min read" : "min de lecture";
  return (
    <Link
      href={`/${locale}/bible-stories/${story.slug}`}
      className="group rounded-3xl border border-sky-900/10 bg-white p-5 shadow-sm transition hover:-transky-y-1 hover:shadow-lg"
    >
      <img
        src={story.hero}
        alt={story.title}
        className="h-40 w-full rounded-2xl object-cover"
        loading="lazy"
      />
      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-700">
          {story.tags.join(" - ")}
        </p>
        <h3 className="mt-2 font-display text-xl text-sky-950">{story.title}</h3>
        <p className="mt-2 text-sm text-sky-900/70">{story.subtitle}</p>
        <p className="mt-3 text-xs text-sky-900/60">{story.readingTime} {readingLabel}</p>
      </div>
    </Link>
  );
}
