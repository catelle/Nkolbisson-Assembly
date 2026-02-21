"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getCopy } from "@/lib/copy";
import { getLocaleFromPathname } from "@/lib/locale";
import LanguageSwitch from "@/components/site/language-switch";
import { ArrowLeft, Plus } from "lucide-react";

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
  const [showNewQuestion, setShowNewQuestion] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");

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
      const interval = setInterval(() => loadMessages(selected._id), 5000);
      return () => clearInterval(interval);
    }
  }, [selected]);

  const handleSend = async () => {
    if (!selected || !message.trim()) return;
    
    try {
      const res = await fetch(`/api/questions/${selected._id}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: message })
      });
      
      if (!res.ok) {
        console.error("Failed to send message");
        return;
      }
      
      setMessage("");
      await loadMessages(selected._id);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleCreateQuestion = async () => {
    if (!newQuestion.trim()) return;
    
    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionText: newQuestion, isAnonymous: false })
      });
      
      if (!res.ok) {
        console.error("Failed to create question");
        return;
      }
      
      setNewQuestion("");
      setShowNewQuestion(false);
      await loadQuestions();
    } catch (error) {
      console.error("Error creating question:", error);
    }
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
          <div className="flex items-center gap-3">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
              {copy.common.backToHome}
            </Link>
            <LanguageSwitch locale={locale} variant="dark" />
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          <button
            type="button"
            onClick={() => setShowNewQuestion(!showNewQuestion)}
            className="flex w-full items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-yellow-400 bg-yellow-50 p-5 text-sm font-semibold text-sky-950 hover:bg-yellow-100"
          >
            <Plus className="h-5 w-5" />
            {isFr ? "Nouvelle question" : "New question"}
          </button>
          
          {showNewQuestion && (
            <div className="rounded-3xl border border-sky-900/10 bg-white p-5">
              <textarea
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder={isFr ? "Ecrivez votre question..." : "Write your question..."}
                className="w-full rounded-2xl border border-sky-900/10 px-3 py-2 text-sm text-sky-950 outline-none focus:ring-2 focus:ring-yellow-400"
                rows={3}
              />
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={handleCreateQuestion}
                  disabled={!newQuestion.trim()}
                  className="rounded-full bg-sky-900 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-800 disabled:opacity-50"
                >
                  {isFr ? "Creer" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowNewQuestion(false);
                    setNewQuestion("");
                  }}
                  className="rounded-full border border-sky-900/20 px-4 py-2 text-xs font-semibold text-sky-900 hover:bg-sky-50"
                >
                  {isFr ? "Annuler" : "Cancel"}
                </button>
              </div>
            </div>
          )}
          
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
          {selected ? (
            <>
              <div className="mb-4 border-b border-sky-900/10 pb-3">
                <p className="text-xs uppercase tracking-[0.2em] text-sky-900/60">
                  {copy.common.question}
                </p>
                <p className="mt-1 text-sm font-semibold text-sky-950">{selected.questionText}</p>
              </div>
              
              <div className="max-h-96 space-y-3 overflow-y-auto">
                {messages.length === 0 ? (
                  <p className="text-center text-sm text-sky-900/60">
                    {isFr ? "Aucun message" : "No messages"}
                  </p>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg._id}
                      className={`rounded-2xl px-4 py-2 text-sm ${
                        msg.senderRole === "user" ? "ml-auto max-w-[80%] bg-sky-100 text-sky-950" : "mr-auto max-w-[80%] bg-yellow-100 text-sky-950"
                      }`}
                    >
                      {msg.text}
                    </div>
                  ))
                )}
              </div>
              
              <div className="mt-4 flex gap-2">
                <input
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder={isFr ? "Ecrivez un message..." : "Write a message..."}
                  className="flex-1 rounded-2xl border border-sky-900/10 px-3 py-2 text-sm text-sky-950 outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className="rounded-full bg-sky-900 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-800 disabled:opacity-50"
                >
                  {isFr ? "Envoyer" : "Send"}
                </button>
              </div>
            </>
          ) : (
            <p className="text-center text-sm text-sky-900/60">
              {isFr ? "Selectionnez une question" : "Select a question"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
