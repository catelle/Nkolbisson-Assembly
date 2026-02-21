import Link from "next/link";
import AdminGuard from "@/components/site/admin-guard";
import AdminLogout from "@/components/site/admin-logout";
import { getCopy } from "@/lib/copy";
import { getSite } from "@/lib/site";

export default async function AdminLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const copy = getCopy(locale);
  const site = getSite(locale);
  return (
    <div className="min-h-screen bg-sky-950 text-sky-100">
      <div className="mx-auto flex w-full max-w-7xl gap-8 px-4 py-10 md:px-6">
        <AdminGuard locale={locale}>
          <aside className="hidden w-64 flex-col gap-6 rounded-3xl border border-white/10 bg-sky-900/60 p-6 md:flex">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-sky-400">{copy.admin.space}</p>
              <p className="mt-2 font-display text-xl">{site.shortName}</p>
            </div>
            <nav className="flex flex-col gap-3 text-sm text-sky-200/80">
              {site.adminNav.map((item) => (
                <Link key={item.href} href={`/${locale}${item.href}`} className="hover:text-white">
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto text-xs text-sky-400">{copy.admin.roleLabel}</div>
          </aside>

          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-sky-400">{copy.admin.dashboardLabel}</p>
                <p className="mt-2 text-lg font-semibold text-white">{copy.admin.dashboardTitle}</p>
              </div>
              <AdminLogout locale={locale} />
            </div>
            {children}
          </div>
        </AdminGuard>
      </div>
    </div>
  );
}
