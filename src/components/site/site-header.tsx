"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { getCopy } from "@/lib/copy";
import { getSite } from "@/lib/site";
import LanguageSwitch from "@/components/site/language-switch";

export default function SiteHeader({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);

  const site = getSite(locale);
  const copy = getCopy(locale);
  const navItems = site.nav;

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-3 font-semibold text-sky-950"
        >
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-sky-900 text-white">AC</span>
          <span className="font-display text-lg md:text-xl">{site.shortName}</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={`/${locale}/${item.href}`}
              className="text-sky-950/80 transition hover:text-sky-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitch locale={locale} />
          <Link
            href={`/${locale}/ask`}
            className="rounded-full border border-sky-900 px-4 py-2 text-sm font-semibold text-sky-900 transition hover:bg-sky-900 hover:text-white"
          >
            {copy.common.askQuestion}
          </Link>
          <Link
            href={`/${locale}/events`}
            className="rounded-full bg-yellow-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-yellow-600/20 transition hover:bg-yellow-500"
          >
            {copy.common.eventsCta}
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-sky-900/20 text-sky-950 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={copy.common.menuLabel}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-sky-900/10 bg-white/95 px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-4 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}/${item.href}`}
                className="text-sky-950/80"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-3">
            <LanguageSwitch locale={locale} className="w-fit" />
            <Link
              href={`/${locale}/ask`}
              className="rounded-full border border-sky-900 px-4 py-2 text-sm font-semibold text-sky-900"
              onClick={() => setOpen(false)}
            >
              {copy.common.askQuestion}
            </Link>
            <Link
              href={`/${locale}/events`}
              className="rounded-full bg-yellow-600 px-4 py-2 text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              {copy.common.eventsCta}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
