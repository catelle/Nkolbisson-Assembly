import QuestionsManager from "@/components/admin/questions-manager";

export default async function AdminQuestionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <QuestionsManager locale={locale} />;
}
