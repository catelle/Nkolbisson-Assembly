import MinistriesManager from "@/components/admin/ministries-manager";

export default async function AdminMinistriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <MinistriesManager locale={locale} />;
}
