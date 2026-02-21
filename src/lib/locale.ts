export type Locale = "fr" | "en";

export function getLocale(locale?: string): Locale {
  return locale === "en" ? "en" : "fr";
}

export function getDateLocale(locale?: string) {
  return getLocale(locale) === "en" ? "en-US" : "fr-FR";
}

export function getLocaleFromPathname(pathname?: string | null): Locale {
  if (!pathname) return "fr";
  const match = pathname.match(/^\/(fr|en)(?=\/|$)/);
  return match?.[1] === "en" ? "en" : "fr";
}
