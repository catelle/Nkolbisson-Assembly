import EventsManager from "@/components/admin/events-manager";

export default async function AdminEventsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <EventsManager locale={locale} />;
}
