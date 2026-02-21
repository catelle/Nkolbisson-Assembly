import UpdatesManager from "@/components/admin/updates-manager";

export default async function AdminUpdatesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <UpdatesManager locale={locale} />;
}
