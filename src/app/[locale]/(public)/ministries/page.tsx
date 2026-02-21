import { HeartHandshake } from "lucide-react";
import { getCopy } from "@/lib/copy";
import { getMinistries } from "@/lib/content";
import { MinistryCard } from "@/components/site/cards";

export default async function MinistriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const copy = getCopy(locale);
  const ministries = await getMinistries(locale);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-12 px-4 pb-24 pt-12 md:px-6">
      <div className="grid gap-6 rounded-[32px] bg-white/90 p-8 shadow-sm md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="flex items-center gap-3 text-yellow-700">
            <HeartHandshake className="h-6 w-6" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em]">{copy.ministriesPage.label}</span>
          </div>
          <h1 className="mt-4 font-display text-4xl text-sky-950">{copy.ministriesPage.title}</h1>
          <p className="mt-3 text-sm text-sky-900/70">{copy.ministriesPage.description}</p>
        </div>
        <div className="rounded-3xl bg-sky-950 p-6 text-white">
          <p className="text-sm font-semibold">{copy.ministriesPage.calloutTitle}</p>
          <p className="mt-2 text-sm text-sky-100/80">{copy.ministriesPage.calloutText}</p>
          <p className="mt-4 text-xs text-sky-100/70">{copy.ministriesPage.calloutFooter}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {ministries.map((ministry) => (
          <MinistryCard key={ministry.id} ministry={ministry} />
        ))}
      </div>
    </div>
  );
}
