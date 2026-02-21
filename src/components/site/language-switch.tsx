"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCopy } from "@/lib/copy";
import { getLocale, getLocaleFromPathname } from "@/lib/locale";

type Variant = "light" | "dark";

export default function LanguageSwitch({
  locale,
  variant = "light",
  className = ""
}: {
  locale?: string;
  variant?: Variant;
  className?: string;
}) {
  const pathname = usePathname();
  const currentLocale = getLocale(locale ?? getLocaleFromPathname(pathname));
  const nextLocale = currentLocale === "fr" ? "en" : "fr";
  const copy = getCopy(currentLocale);
  const label = nextLocale.toUpperCase();

  const basePath = pathname || "/";
  const hasLocale = /^\/(fr|en)(?=\/|$)/.test(basePath);
  const href = hasLocale
    ? basePath.replace(/^\/(fr|en)(?=\/|$)/, `/${nextLocale}`)
    : `/${nextLocale}${basePath === "/" ? "" : basePath}`;

  const baseClasses =
    "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] transition";
  const variantClasses =
    variant === "dark"
      ? "border-white/30 text-white hover:bg-white hover:text-sky-950"
      : "border-sky-900/20 text-sky-900 hover:bg-sky-900 hover:text-white";

  return (
    <Link
      href={href}
      className={`${baseClasses} ${variantClasses} ${className}`.trim()}
      aria-label={`${copy.common.languageSwitch}: ${label}`}
    >
      {label}
    </Link>
  );
}
