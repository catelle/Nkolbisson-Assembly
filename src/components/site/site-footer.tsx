import Link from "next/link";
import { getCopy } from "@/lib/copy";
import { getSite } from "@/lib/site";

export default function SiteFooter({ locale }: { locale: string }) {
  const site = getSite(locale);
  const copy = getCopy(locale);
  return (
    <footer className="border-t border-sky-900/10 bg-sky-950 text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 md:grid-cols-3 md:px-6">
        <div>
          <p className="font-display text-2xl">{site.name}</p>
          <p className="mt-3 text-sm text-sky-100/80">{site.tagline}</p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-100/80">
            {copy.common.navigation}
          </p>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            {site.nav.map((item) => (
              <Link key={item.href} href={`/${locale}/${item.href}`} className="text-sky-50/80">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-100/80">
            {copy.common.contact}
          </p>
          <div className="mt-4 space-y-2 text-sm text-sky-50/80">
            <p>{site.contact.address}</p>
            <p>{site.contact.phone}</p>
            <p>{site.contact.email}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-sky-900/20 py-6 text-center text-xs text-sky-100/60">
        {copy.common.copyright}
      </div>
    </footer>
  );
}
