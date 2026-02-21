import StoriesManager from "@/components/admin/stories-manager";

export default async function AdminStoriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <StoriesManager locale={locale} />;
}
