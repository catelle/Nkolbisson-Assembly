import MediaManager from "@/components/admin/media-manager";

export default async function AdminMediaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <MediaManager locale={locale} />;
}
