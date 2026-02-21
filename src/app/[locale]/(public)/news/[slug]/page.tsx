/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { getCopy } from "@/lib/copy";
import { getUpdateBySlug } from "@/lib/content";
import { getDateLocale } from "@/lib/locale";
import { notFound } from "next/navigation";

export default async function NewsDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const copy = getCopy(locale);
  const update = await getUpdateBySlug(locale, slug);

  if (!update) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-10 px-4 pb-24 pt-10 md:px-6">
      <Link href={`/${locale}/news`} className="inline-flex items-center gap-2 text-sm text-sky-900">
        <ArrowLeft className="h-4 w-4" /> {copy.common.backToNews}
      </Link>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-yellow-700">{update.tags.join(" - ")}</p>
        <h1 className="font-display text-4xl text-sky-950">{update.title}</h1>
        <div className="flex items-center gap-2 text-xs text-sky-900/60">
          <Calendar className="h-4 w-4" />
          {new Date(update.publishedAt).toLocaleDateString(getDateLocale(locale), { dateStyle: "long" })}
        </div>
      </div>

      <img
        src={update.cover}
        alt={update.title}
        className="h-72 w-full rounded-[32px] object-cover shadow-lg shadow-sky-950/10"
      />

      <div className="space-y-6">
        {update.content.map((paragraph, index) => (
          <p key={index} className="text-lg leading-relaxed text-sky-950/80">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
