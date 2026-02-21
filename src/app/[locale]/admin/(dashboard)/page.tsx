import Link from "next/link";
import { CalendarDays, FileText, ImageIcon, MessageSquare, Users, BookOpen } from "lucide-react";
import { getCopy } from "@/lib/copy";

export default async function AdminDashboard({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const copy = getCopy(locale);

  const cards = [
    { label: copy.admin.cards.events, value: "4", href: "events", icon: CalendarDays },
    { label: copy.admin.cards.updates, value: "3", href: "updates", icon: FileText },
    { label: copy.admin.cards.stories, value: "3", href: "stories", icon: BookOpen },
    { label: copy.admin.cards.questions, value: "4", href: "questions", icon: MessageSquare },
    { label: copy.admin.cards.media, value: "14", href: "media", icon: ImageIcon },
    { label: copy.admin.cards.users, value: "2", href: "users", icon: Users }
  ];

  return (
    <div className="grid gap-6">
      <div className="rounded-3xl border border-white/10 bg-sky-900/70 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-sky-400">{copy.admin.quickView}</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">{copy.admin.welcome}</h2>
        <p className="mt-2 text-sm text-sky-300">{copy.admin.welcomeText}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={`/${locale}/admin/${card.href}`}
              className="rounded-3xl border border-white/10 bg-sky-900/70 p-5 transition hover:border-white/30"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-sky-300">{card.label}</p>
                <Icon className="h-5 w-5 text-yellow-400" />
              </div>
              <p className="mt-3 text-3xl font-semibold text-white">{card.value}</p>
              <p className="mt-1 text-xs text-sky-400">{copy.admin.cardHint}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
