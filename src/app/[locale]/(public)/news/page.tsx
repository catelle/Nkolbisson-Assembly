import { Newspaper } from "lucide-react";
import { getCopy } from "@/lib/copy";
import { getUpdates } from "@/lib/content";
import { UpdateCard } from "@/components/site/cards";

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const copy = getCopy(locale);
  const updates = await getUpdates(locale);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-12 px-4 pb-24 pt-12 md:px-6">
      <div className="rounded-[32px] bg-white/90 p-8 shadow-sm">
        <div className="flex items-center gap-3 text-yellow-700">
          <Newspaper className="h-6 w-6" />
          <span className="text-xs font-semibold uppercase tracking-[0.3em]">{copy.newsPage.label}</span>
        </div>
        <h1 className="mt-4 font-display text-4xl text-sky-950">{copy.newsPage.title}</h1>
        <p className="mt-3 text-sm text-sky-900/70">{copy.newsPage.description}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {updates.map((update) => (
          <UpdateCard key={update.id} update={update} locale={locale} />
        ))}
      </div>
    </div>
  );
}
