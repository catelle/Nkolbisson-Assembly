"use client";

import { useEffect, useState } from "react";
import { getCopy } from "@/lib/copy";
import { useSession } from "next-auth/react";

type QuestionDoc = {
  _id: string;
  questionText: string;
  createdAt: string;
  status: "new" | "answered" | "private";
  publicAnswer?: string;
  userId?: string;
  isAnonymous: boolean;
};

type MessageDoc = {
  _id: string;
  questionId: string;
  senderRole: "admin" | "user";
  senderId?: string;
  text: string;
  createdAt: string;
};

export default function QuestionsManager({ locale }: { locale: string }) {
  const copy = getCopy(locale);
  const { data: session } = useSession();
  const [questions, setQuestions] = useState<QuestionDoc[]>([]);
  const [selected, setSelected] = useState<QuestionDoc | null>(null);
  const [messages, setMessages] = useState<MessageDoc[]>([]);
  const [reply, setReply] = useState("");
  const [publicAnswer, setPublicAnswer] = useState("");

  const loadQuestions = async () => {
    const res = await fetch("/api/questions", { cache: "no-store" });
    if (!res.ok) return;
    const data = await res.json();
    setQuestions(data);
  };

  const loadMessages = async (questionId: string) => {
    const res = await fetch(`/api/questions/${questionId}/messages`, { cache: "no-store" });
    if (!res.ok) return;
    const data = await res.json();
    setMessages(data);
  };

  useEffect(() => {
    if (session?.user?.role === "admin") {
      loadQuestions();
    }
  }, [session]);

  const handleSelect = (question: QuestionDoc) => {
    setSelected(question);
    setPublicAnswer(question.publicAnswer || "");
    loadMessages(question._id);
  };

  const handleSend = async () => {
    if (!selected || !reply.trim()) return;
    await fetch(`/api/questions/${selected._id}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: reply })
    });
    setReply("");
    loadMessages(selected._id);
  };

  const handlePublish = async () => {
    if (!selected || !publicAnswer.trim()) return;
    await fetch(`/api/questions/${selected._id}/answer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answerText: publicAnswer, isPublic: true })
    });
    loadQuestions();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-4">
        {questions.map((question) => (
          <button
            type="button"
            key={question._id}
            onClick={() => handleSelect(question)}
            className={`w-full rounded-3xl border border-white/10 bg-sky-900/60 p-5 text-left transition ${
              selected?._id === question._id ? "border-yellow-400/60" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.3em] text-sky-400">{question.status}</p>
              <p className="text-xs text-sky-500">{question.createdAt}</p>
            </div>
            <p className="mt-2 text-sm text-white">{question.questionText}</p>
          </button>
        ))}
      </div>

      <div className="space-y-6">
        <div className="rounded-3xl border border-white/10 bg-sky-900/70 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-sky-400">{copy.admin.questions.replyTitle}</p>
          <textarea
            rows={4}
            value={publicAnswer}
            onChange={(event) => setPublicAnswer(event.target.value)}
            placeholder={copy.admin.questions.replyPlaceholder}
            className="mt-3 w-full rounded-2xl border border-white/10 bg-sky-900 px-4 py-3 text-sm text-white"
          />
          <button
            type="button"
            onClick={handlePublish}
            className="mt-4 rounded-full bg-yellow-500 px-4 py-2 text-xs font-semibold text-sky-950"
          >
            {copy.admin.questions.publish}
          </button>
        </div>

        <div className="rounded-3xl border border-white/10 bg-sky-900/70 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-sky-400">Chat</p>
          <div className="mt-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message._id}
                className={`rounded-2xl px-4 py-2 text-sm ${
                  message.senderRole === "admin"
                    ? "bg-yellow-500/20 text-white"
                    : "bg-white/10 text-sky-100"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <input
              value={reply}
              onChange={(event) => setReply(event.target.value)}
              placeholder={copy.admin.questions.replyPlaceholder}
              className="flex-1 rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
            />
            <button
              type="button"
              onClick={handleSend}
              className="rounded-full bg-yellow-500 px-4 py-2 text-xs font-semibold text-sky-950"
            >
              {copy.admin.questions.reply}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
