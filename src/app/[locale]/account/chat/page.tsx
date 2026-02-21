"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getCopy } from "@/lib/copy";
import { getLocaleFromPathname } from "@/lib/locale";
import LanguageSwitch from "@/components/site/language-switch";

type QuestionDoc = {
  _id: string;
  questionText: string;
  createdAt: string;
  status: "new" | "answered" | "private";
};

type MessageDoc = {
  _id: string;
  questionId: string;
  senderRole: "admin" | "user";
  text: string;
  createdAt: string;
};

export default function ChatPage() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const copy = getCopy(locale);
  const isFr = locale === "fr";
  const { status } = useSession();
  const [questions, setQuestions] = useState<QuestionDoc[]>([]);
  const [selected, setSelected] = useState<QuestionDoc | null>(null);
  const [messages, setMessages] = useState<MessageDoc[]>([]);
  const [message, setMessage] = useState("");

  const loadQuestions = async () => {
    const res = await fetch("/api/questions", { cache: "no-store" });
    if (!res.ok) return;
    const data = await res.json();
    setQuestions(data);
    if (data.length && !selected) {
      setSelected(data[0]);
    }
  };

  const loadMessages = async (questionId: string) => {
    const res = await fetch(`/api/questions/${questionId}/messages`, { cache: "no-store" });
    if (!res.ok) return;
    const data = await res.json();
    setMessages(data);
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace(`/${locale}/account/login`);
      return;
    }
    if (status === "authenticated") {
      loadQuestions();
    }
  }, [locale, router, status]);

  useEffect(() => {
    if (selected) {
      loadMessages(selected._id);
    }
  }, [selected]);

  const handleSend = async () => {
    if (!selected || !message.trim()) return;
    await fetch(`/api/questions/${selected._id}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: message })
    });
    setMessage("");
    loadMessages(selected._id);
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-4 pb-24 pt-12 md:px-6">
      <div className="rounded-3xl bg-sky-950 px-8 py-10 text-white">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl">{copy.common.chatLabel}</h1>
            <p className="mt-2 text-sm text-sky-100/80">
              {isFr
                ? "Discutez avec l'equipe pastorale au sujet de vos questions."
                : "Chat with the pastoral team about your questions."}
            </p>
          </div>
          <LanguageSwitch locale={locale} variant="dark" />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          {questions.map((question) => (
            <button
              type="button"
              key={question._id}
              onClick={() => setSelected(question)}
              className={`w-full rounded-3xl border border-sky-900/10 bg-white p-5 text-left ${
                selected?._id === question._id ? "border-yellow-400" : ""
              }`}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-sky-900/60">
                {isFr
                  ? question.status === "answered"
                    ? "Repondu"
                    : question.status === "private"
                      ? "Prive"
                      : "Nouveau"
                  : question.status}
              </p>
              <p className="mt-2 text-sm text-sky-950">{question.questionText}</p>
            </button>
          ))}
        </div>

        <div className="rounded-3xl border border-sky-900/10 bg-white p-6">
          <div className="space-y-3">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`rounded-2xl px-4 py-2 text-sm ${
                  msg.senderRole === "user" ? "bg-sky-100 text-sky-950" : "bg-yellow-100 text-sky-950"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder={isFr ? "Ecrivez un message..." : "Write a message..."}
              className="flex-1 rounded-2xl border border-sky-900/10 px-3 py-2 text-sm text-sky-950"
            />
            <button
              type="button"
              onClick={handleSend}
              className="rounded-full bg-sky-900 px-4 py-2 text-xs font-semibold text-white"
            >
              {isFr ? "Envoyer" : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
