"use client";

import { MessageCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function FloatingChatButton({ locale }: { locale: string }) {
  const { data: session } = useSession();
  const [showTooltip, setShowTooltip] = useState(false);

  const labels = {
    fr: {
      chat: "Chat avec l'équipe",
      login: "Connectez-vous pour discuter"
    },
    en: {
      chat: "Chat with team",
      login: "Login to chat"
    }
  };

  const copy = labels[locale as keyof typeof labels] || labels.fr;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {showTooltip && (
        <div className="absolute bottom-16 right-0 mb-2 whitespace-nowrap rounded-2xl bg-sky-950 px-4 py-2 text-sm text-white shadow-lg">
          {session ? copy.chat : copy.login}
        </div>
      )}
      
      <Link
        href={session ? `/${locale}/account/chat` : `/${locale}/account/login`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-500 text-sky-950 shadow-lg transition hover:bg-yellow-400 hover:scale-110"
      >
        <MessageCircle className="h-6 w-6" />
      </Link>
    </div>
  );
}
