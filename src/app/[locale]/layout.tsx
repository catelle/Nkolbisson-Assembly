import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Manrope, Playfair_Display } from "next/font/google";
import AppSessionProvider from "@/components/site/session-provider";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"]
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700"]
});

export const metadata: Metadata = {
  title: "CMCI / CMFI Nkolbisson",
  description: "Local church assembly in Nkolbisson with news, events, ministries, and Bible stories."
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${manrope.variable} ${playfair.variable} font-sans antialiased`}>
        <AppSessionProvider>
          <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        </AppSessionProvider>
      </body>
    </html>
  );
}
