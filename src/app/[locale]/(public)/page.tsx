/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowRight, Calendar, HeartHandshake, MapPin, MessageSquare, Sparkles } from "lucide-react";
import { getCopy } from "@/lib/copy";
import {
  getEvents,
  getMinistries,
  getPublicAnswers,
  getPublicQuestions,
  getStories,
  getUpdates
} from "@/lib/content";
import { getTheme } from "@/lib/theme";
import { getSite } from "@/lib/site";
import { EventCard, MinistryCard, StoryCard, UpdateCard } from "@/components/site/cards";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const copy = getCopy(locale);
  const site = getSite(locale);
  const theme = await getTheme(locale);
  const updates = await getUpdates(locale);
  const events = await getEvents(locale);
  const ministries = await getMinistries(locale);
  const stories = await getStories(locale);
  const answers = await getPublicAnswers();
  const questions = await getPublicQuestions();

  return (
    <div className="space-y-24 pb-24">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-sky-800" />
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-20 md:grid-cols-[1.1fr_0.9fr] md:px-6">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-yellow-200">
              <Sparkles className="h-4 w-4" />
              {copy.home.badge}
            </div>
            <h1 className="mt-6 font-display text-4xl leading-tight md:text-5xl">{copy.home.heroTitle}</h1>
            <p className="mt-4 text-lg text-sky-100/90">{copy.home.heroDescription}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={`/${locale}/events`}
                className="rounded-full bg-yellow-500 px-6 py-3 text-sm font-semibold text-sky-950 shadow-lg shadow-yellow-500/30 transition hover:bg-yellow-400"
              >
                {copy.home.heroPrimary}
              </Link>
              <Link
                href={`/${locale}/bible-stories`}
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {copy.home.heroSecondary}
              </Link>
            </div>
            <div className="mt-10 grid gap-4 text-sm text-sky-100/80 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3">
                <Calendar className="h-5 w-5 text-yellow-200" />
                {copy.home.highlightOne}
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3">
                <MapPin className="h-5 w-5 text-yellow-200" />
                {copy.home.highlightTwo}
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-6 left-6 h-24 w-24 rounded-full bg-yellow-400/20 blur-2xl" />
            <img
              src={theme.image}
              alt={site.name}
              className="animate-fade-in h-full w-full rounded-[32px] object-cover shadow-2xl shadow-sky-950/40"
            />
            <div className="absolute -bottom-6 right-6 hidden rounded-3xl bg-white/90 p-4 text-xs text-sky-900/80 shadow-lg md:block">
              <p className="font-semibold text-sky-950">{copy.home.themeLabel}</p>
              <p>{theme.text || copy.home.themeText}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-yellow-700">{copy.home.newsLabel}</p>
            <h2 className="mt-2 font-display text-3xl text-sky-950">{copy.home.newsTitle}</h2>
          </div>
          <Link href={`/${locale}/news`} className="text-sm font-semibold text-sky-900">
            {copy.common.seeAllNews} <ArrowRight className="ml-1 inline h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {updates.slice(0, 3).map((update) => (
            <UpdateCard key={update.id} update={update} locale={locale} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-yellow-700">{copy.home.eventsLabel}</p>
            <h2 className="mt-2 font-display text-3xl text-sky-950">{copy.home.eventsTitle}</h2>
          </div>
          <Link href={`/${locale}/events`} className="text-sm font-semibold text-sky-900">
            {copy.common.fullCalendar} <ArrowRight className="ml-1 inline h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {events.slice(0, 4).map((event) => (
            <EventCard key={event.id} event={event} locale={locale} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-yellow-700">{copy.home.ministriesLabel}</p>
            <h2 className="mt-2 font-display text-3xl text-sky-950">{copy.home.ministriesTitle}</h2>
            <p className="mt-4 text-sm text-sky-900/70">{copy.home.ministriesDescription}</p>
            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-4 rounded-3xl border border-sky-900/10 bg-white/80 p-4">
                <HeartHandshake className="h-6 w-6 text-yellow-600" />
                <div>
                  <p className="font-semibold text-sky-950">{copy.home.ministriesCardOneTitle}</p>
                  <p className="text-sm text-sky-900/70">{copy.home.ministriesCardOneText}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-3xl border border-sky-900/10 bg-white/80 p-4">
                <MessageSquare className="h-6 w-6 text-yellow-600" />
                <div>
                  <p className="font-semibold text-sky-950">{copy.home.ministriesCardTwoTitle}</p>
                  <p className="text-sm text-sky-900/70">{copy.home.ministriesCardTwoText}</p>
                </div>
              </div>
            </div>
            <Link
              href={`/${locale}/ministries`}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-900"
            >
              {copy.common.exploreMinistries} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6">
            {ministries.slice(0, 2).map((ministry) => (
              <MinistryCard key={ministry.id} ministry={ministry} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[32px] bg-sky-950 p-8 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-yellow-200">{copy.home.storiesLabel}</p>
            <h2 className="mt-3 font-display text-3xl">{copy.home.storiesTitle}</h2>
            <p className="mt-4 text-sm text-sky-100/80">{copy.home.storiesDescription}</p>
            <Link
              href={`/${locale}/bible-stories`}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-yellow-500 px-5 py-2 text-sm font-semibold text-sky-950"
            >
              {copy.common.seeAllStories} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {stories.slice(0, 2).map((story) => (
              <StoryCard key={story.id} story={story} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="rounded-[32px] border border-sky-900/10 bg-white/90 p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-yellow-700">
                {copy.home.questionsLabel}
              </p>
              <h2 className="mt-2 font-display text-3xl text-sky-950">{copy.home.questionsTitle}</h2>
              <p className="mt-3 text-sm text-sky-900/70">{copy.home.questionsDescription}</p>
            </div>
            <Link
              href={`/${locale}/questions`}
              className="rounded-full bg-sky-900 px-6 py-3 text-sm font-semibold text-white"
            >
              {copy.common.askQuestion}
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {answers.map((answer) => {
              const question = questions.find((item) => item.id === answer.questionId);
              return (
                <div key={answer.id} className="rounded-3xl border border-sky-900/10 bg-white p-5">
                  <p className="text-sm text-sky-900/70">{copy.common.question}</p>
                  <p className="mt-1 font-semibold text-sky-950">{question?.questionText}</p>
                  <p className="mt-3 text-sm text-sky-900/70">{copy.common.answer}</p>
                  <p className="mt-1 text-sm text-sky-900/80">{answer.answerText}</p>
                  <p className="mt-3 text-xs text-sky-900/50">{answer.answeredBy}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
