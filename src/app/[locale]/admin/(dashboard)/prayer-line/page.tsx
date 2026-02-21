import PrayerLineManager from "@/components/admin/prayer-line-manager";

export default async function AdminPrayerLinePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <PrayerLineManager locale={locale} />;
}
