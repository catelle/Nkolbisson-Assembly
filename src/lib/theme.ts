import { getDb } from "@/lib/mongo";
import { getLocale } from "@/lib/locale";
import { unstable_noStore as noStore } from "next/cache";

export async function getTheme(locale?: string) {
  noStore();
  const db = await getDb();
  const theme = await db.collection("theme").findOne({});
  const lang = getLocale(locale);
  
  if (!theme || !theme.text) {
    return { text: "", image: "/images/hero-nkolbisson.svg" };
  }
  
  return {
    text: theme.text[lang] || theme.text.fr || "",
    image: theme.image || "/images/hero-nkolbisson.svg"
  };
}
