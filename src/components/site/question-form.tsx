"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function QuestionForm({
  labels
}: {
  labels: {
    formLabel: string;
    formPlaceholder: string;
    formNote: string;
    submit: string;
    success: string;
    loginHint: string;
    chatLink: string;
    loginHref: string;
    chatHref: string;
    loginLabel: string;
    chatLabel: string;
  };
}) {
  const { data: session } = useSession();
  const [question, setQuestion] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!question.trim()) return;
    setLoading(true);

    await fetch("/api/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        questionText: question,
        isAnonymous: !session,
        isPublic
      })
    });

    setQuestion("");
    setLoading(false);
    alert(labels.success);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-sky-900/10 bg-white/90 p-8 shadow-sm">
      <label className="text-sm font-semibold text-sky-950">{labels.formLabel}</label>
      <textarea
        required
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
        rows={6}
        placeholder={labels.formPlaceholder}
        className="mt-3 w-full rounded-2xl border border-sky-900/10 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
      />
      
      <div className="mt-4 space-y-2">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="visibility"
            checked={isPublic}
            onChange={() => setIsPublic(true)}
            className="h-4 w-4 text-sky-900"
          />
          <span className="text-sm text-sky-950">
            <strong>Public</strong> - La réponse sera visible par tous / Answer will be visible to everyone
          </span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="visibility"
            checked={!isPublic}
            onChange={() => setIsPublic(false)}
            className="h-4 w-4 text-sky-900"
          />
          <span className="text-sm text-sky-950">
            <strong>Privé/Chat</strong> - Discussion privée avec l&apos;équipe / Private chat with team
          </span>
        </label>
      </div>
      
      <p className="mt-3 text-xs text-sky-900/60">{labels.formNote}</p>
      {!session ? (
        <p className="mt-2 text-xs text-sky-900/60">
          {labels.loginHint}{" "}
          <Link href={labels.loginHref} className="font-semibold text-sky-900 underline">
            {labels.loginLabel}
          </Link>
        </p>
      ) : (
        <p className="mt-2 text-xs text-sky-900/60">
          {labels.chatLink}{" "}
          <Link href={labels.chatHref} className="font-semibold text-sky-900 underline">
            {labels.chatLabel}
          </Link>
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="mt-6 rounded-full bg-sky-900 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-800 disabled:opacity-50"
      >
        {loading ? "..." : labels.submit}
      </button>
    </form>
  );
}
