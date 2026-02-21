import { getLocale, type Locale } from "@/lib/locale";

const siteByLocale: Record<Locale, {
  name: string;
  shortName: string;
  location: string;
  tagline: string;
  nav: { href: string; label: string }[];
  adminNav: { href: string; label: string }[];
}> = {
  fr: {
    name: "Assemblee CMCI Nkolbisson",
    shortName: "CMCI Nkolbisson",
    location: "Yaounde, Nkolbisson",
    tagline:
      "Assemblee locale de la Communaute Missionnaire Chretienne Internationale (CMCI).",
    nav: [
      { href: "", label: "Accueil" },
      { href: "events", label: "Evenements" },
      { href: "ministries", label: "Ministeres" },
      { href: "bible-stories", label: "Histoires bibliques" },
      { href: "news", label: "Actualites" },
      { href: "questions", label: "Q&R" }
    ],
    adminNav: [
      { href: "/admin", label: "Tableau de bord" },
      { href: "/admin/events", label: "Evenements" },
      { href: "/admin/ministries", label: "Ministeres" },
      { href: "/admin/stories", label: "Histoires" },
      { href: "/admin/updates", label: "Actualites" },
      { href: "/admin/questions", label: "Questions" },
      { href: "/admin/theme", label: "Theme du mois" },
      { href: "/admin/media", label: "Medias" },
      { href: "/admin/users", label: "Utilisateurs" }
    ]
  },
  en: {
    name: "CMFI Nkolbisson Assembly",
    shortName: "CMFI Nkolbisson",
    location: "Yaounde, Nkolbisson",
    tagline:
      "Local assembly of Christian Missionary Fellowship International (CMFI).",
    nav: [
      { href: "", label: "Home" },
      { href: "events", label: "Events" },
      { href: "ministries", label: "Ministries" },
      { href: "bible-stories", label: "Bible stories" },
      { href: "news", label: "News" },
      { href: "questions", label: "Q&A" }
    ],
    adminNav: [
      { href: "/admin", label: "Dashboard" },
      { href: "/admin/events", label: "Events" },
      { href: "/admin/ministries", label: "Ministries" },
      { href: "/admin/stories", label: "Stories" },
      { href: "/admin/updates", label: "News" },
      { href: "/admin/questions", label: "Questions" },
      { href: "/admin/theme", label: "Theme of month" },
      { href: "/admin/media", label: "Media" },
      { href: "/admin/users", label: "Users" }
    ]
  }
};

export const siteContact = {
  address: "Nkolbisson, Yaounde - Cameroon",
  phone: "+237 6 90 00 00 00",
  email: "contact@cmfi-nkolbisson.org"
};

export function getSite(locale?: string) {
  const lang = getLocale(locale);
  return {
    ...siteByLocale[lang],
    contact: siteContact
  };
}
