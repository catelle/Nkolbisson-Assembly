import { CalendarDays } from "lucide-react";
import EventsList from "@/components/site/events-list";
import { getCopy } from "@/lib/copy";
import { getEventMinistries, getEvents } from "@/lib/content";

export default async function EventsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const copy = getCopy(locale);
  const events = await getEvents(locale);
  const ministries = await getEventMinistries(locale);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-12 px-4 pb-24 pt-12 md:px-6">
      <div className="rounded-[32px] bg-sky-950 px-8 py-10 text-white shadow-lg shadow-sky-950/25">
        <div className="flex items-center gap-3 text-yellow-200">
          <CalendarDays className="h-6 w-6" />
          <span className="text-xs font-semibold uppercase tracking-[0.3em]">{copy.eventsPage.label}</span>
        </div>
        <h1 className="mt-4 font-display text-4xl">{copy.eventsPage.title}</h1>
        <p className="mt-3 text-sm text-sky-100/80">{copy.eventsPage.description}</p>
      </div>

      <EventsList events={events} ministries={ministries} locale={locale} labels={copy.eventsFilters} />
    </div>
  );
}
