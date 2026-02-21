"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getCopy } from "@/lib/copy";

type LocalizedText = {
  fr: string;
  en: string;
};

type PrayerSubject = {
  _id?: string;
  title: LocalizedText;
  description?: LocalizedText;
  active: boolean;
};

type PrayerParticipant = {
  _id: string;
  subjectId: string;
  name: string;
  email: string;
  whatsapp: string;
  createdAt: string;
};

const emptySubject: PrayerSubject = {
  title: { fr: "", en: "" },
  description: { fr: "", en: "" },
  active: true
};

const emailServiceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const emailTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const emailPublicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export default function PrayerLineManager({ locale }: { locale: string }) {
  const copy = getCopy(locale);
  const [subjects, setSubjects] = useState<PrayerSubject[]>([]);
  const [participants, setParticipants] = useState<PrayerParticipant[]>([]);
  const [subjectForm, setSubjectForm] = useState<PrayerSubject>(emptySubject);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showSubjectForm, setShowSubjectForm] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [messageTitle, setMessageTitle] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  const selectedSubject = useMemo(
    () => subjects.find((subject) => subject._id === selectedSubjectId),
    [subjects, selectedSubjectId]
  );
  const subjectMap = useMemo(() => {
    const map = new Map<string, string>();
    subjects.forEach((subject) => {
      const title =
        subject.title[locale as "fr" | "en"] || subject.title.fr || subject.title.en || "Subject";
      if (subject._id) {
        map.set(subject._id, title);
      }
    });
    return map;
  }, [subjects, locale]);

  const loadSubjects = useCallback(async () => {
    const res = await fetch("/api/prayer/subjects", { cache: "no-store" });
    if (!res.ok) return;
    const data = (await res.json()) as PrayerSubject[];
    setSubjects(data);
    setSelectedSubjectId((prev) => {
      if (prev && data.some((subject) => subject._id === prev)) {
        return prev;
      }
      return data[0]?._id || "";
    });
  }, []);

  const loadParticipants = useCallback(async (subjectId?: string) => {
    const url = subjectId ? `/api/prayer/participants?subjectId=${subjectId}` : "/api/prayer/participants";
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return;
    const data = (await res.json()) as PrayerParticipant[];
    setParticipants(data);
  }, []);

  useEffect(() => {
    loadSubjects();
  }, [loadSubjects]);

  useEffect(() => {
    if (selectedSubjectId) {
      loadParticipants(selectedSubjectId);
    } else {
      loadParticipants();
    }
  }, [selectedSubjectId, loadParticipants]);

  const resetForm = () => {
    setSubjectForm(emptySubject);
    setEditingId(null);
  };

  const handleSubjectSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload = {
      title: subjectForm.title,
      description: subjectForm.description,
      active: subjectForm.active
    };

    if (editingId) {
      await fetch(`/api/prayer/subjects/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } else {
      await fetch("/api/prayer/subjects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    }

    resetForm();
    setShowSubjectForm(false);
    loadSubjects();
  };

  const handleEditSubject = (subject: PrayerSubject) => {
    setSubjectForm({
      title: subject.title,
      description: subject.description || { fr: "", en: "" },
      active: subject.active
    });
    setEditingId(subject._id || null);
    setShowSubjectForm(true);
  };

  const handleDeleteSubject = async (id?: string) => {
    if (!id) return;
    await fetch(`/api/prayer/subjects/${id}`, { method: "DELETE" });
    if (selectedSubjectId === id) {
      setSelectedSubjectId("");
    }
    loadSubjects();
    loadParticipants();
  };

  const sendEmail = async (participant: PrayerParticipant) => {
    if (!emailServiceId || !emailTemplateId || !emailPublicKey) {
      return { ok: false, error: "EmailJS is not configured." };
    }

    const subjectTitle = selectedSubject
      ? selectedSubject.title[locale as "fr" | "en"] || selectedSubject.title.fr || selectedSubject.title.en
      : "";

    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: emailServiceId,
        template_id: emailTemplateId,
        user_id: emailPublicKey,
        template_params: {
          to_name: participant.name,
          to_email: participant.email,
          subject_title: subjectTitle,
          subject: messageTitle || subjectTitle,
          message: messageBody
        }
      })
    });

    return { ok: res.ok };
  };

  const handleSendMessage = async () => {
    if (!selectedSubjectId || !messageBody.trim()) return;
    setSending(true);
    setStatus("");
    try {
      const res = await fetch(`/api/prayer/subjects/${selectedSubjectId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: messageTitle, text: messageBody })
      });

      if (!res.ok) {
        setStatus("Failed to send message.");
        return;
      }

      const participantsRes = await fetch(`/api/prayer/participants?subjectId=${selectedSubjectId}`);
      const list = participantsRes.ok ? ((await participantsRes.json()) as PrayerParticipant[]) : [];

      if (!emailServiceId || !emailTemplateId || !emailPublicKey) {
        setStatus("Message saved. EmailJS is not configured.");
        setMessageBody("");
        setMessageTitle("");
        return;
      }

      let failed = 0;
      for (const participant of list) {
        const result = await sendEmail(participant);
        if (!result.ok) failed += 1;
      }

      setStatus(failed ? `Message saved. ${failed} emails failed.` : "Message sent to all participants.");
      setMessageBody("");
      setMessageTitle("");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-sky-900/70 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sky-400">{copy.admin.prayerLine.label}</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">{copy.admin.prayerLine.title}</h2>
          </div>
          <button
            type="button"
            onClick={() => {
              if (showSubjectForm) {
                setShowSubjectForm(false);
                resetForm();
                return;
              }
              resetForm();
              setShowSubjectForm(true);
            }}
            className="rounded-full bg-yellow-500 px-4 py-2 text-xs font-semibold text-sky-950"
          >
            {showSubjectForm ? "Close form" : copy.admin.prayerLine.addSubject}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {subjects.map((subject) => (
          <div key={subject._id} className="rounded-3xl border border-white/10 bg-sky-900/60 p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-sky-400">{copy.admin.prayerLine.subjects}</p>
                <p className="mt-2 text-lg font-semibold text-white">{subject.title.fr}</p>
                <p className="mt-1 text-sm text-sky-300">{subject.title.en}</p>
                <p className="mt-2 text-xs text-sky-400">
                  {copy.admin.prayerLine.activeLabel}: {subject.active ? "Yes" : "No"}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleEditSubject(subject)}
                  className="rounded-full border border-white/20 px-3 py-1 text-xs text-white"
                >
                  {copy.admin.prayerLine.editSubject}
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteSubject(subject._id)}
                  className="rounded-full border border-white/20 px-3 py-1 text-xs text-white"
                >
                  {copy.admin.prayerLine.removeSubject}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showSubjectForm ? (
        <form onSubmit={handleSubjectSubmit} className="rounded-3xl border border-white/10 bg-sky-900/70 p-6">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.3em] text-sky-400">
              {editingId ? copy.admin.prayerLine.editSubject : copy.admin.prayerLine.addSubject}
            </p>
            <button
              type="button"
              onClick={() => {
                setShowSubjectForm(false);
                resetForm();
              }}
              className="rounded-full border border-white/20 px-4 py-2 text-xs text-white"
            >
              Close
            </button>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-sky-300">Titre (FR)</label>
              <input
                value={subjectForm.title.fr}
                onChange={(event) =>
                  setSubjectForm({ ...subjectForm, title: { ...subjectForm.title, fr: event.target.value } })
                }
                className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-sky-300">Title (EN)</label>
              <input
                value={subjectForm.title.en}
                onChange={(event) =>
                  setSubjectForm({ ...subjectForm, title: { ...subjectForm.title, en: event.target.value } })
                }
                className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-sky-300">
                {copy.admin.prayerLine.descriptionLabel} (FR)
              </label>
              <textarea
                value={subjectForm.description?.fr || ""}
                onChange={(event) =>
                  setSubjectForm({
                    ...subjectForm,
                    description: { ...(subjectForm.description || { fr: "", en: "" }), fr: event.target.value }
                  })
                }
                className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-sky-300">
                {copy.admin.prayerLine.descriptionLabel} (EN)
              </label>
              <textarea
                value={subjectForm.description?.en || ""}
                onChange={(event) =>
                  setSubjectForm({
                    ...subjectForm,
                    description: { ...(subjectForm.description || { fr: "", en: "" }), en: event.target.value }
                  })
                }
                className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
              />
            </div>
            <div className="flex items-center gap-3">
              <input
                id="subject-active"
                type="checkbox"
                checked={subjectForm.active}
                onChange={(event) => setSubjectForm({ ...subjectForm, active: event.target.checked })}
              />
              <label htmlFor="subject-active" className="text-xs uppercase tracking-[0.2em] text-sky-300">
                {copy.admin.prayerLine.activeLabel}
              </label>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button className="rounded-full bg-yellow-500 px-4 py-2 text-xs font-semibold text-sky-950" type="submit">
              {editingId ? copy.admin.prayerLine.editSubject : copy.admin.prayerLine.addSubject}
            </button>
          </div>
        </form>
      ) : null}

      <div className="rounded-3xl border border-white/10 bg-sky-900/70 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sky-400">{copy.admin.prayerLine.participants}</p>
            <p className="mt-2 text-lg font-semibold text-white">{copy.admin.prayerLine.participants}</p>
          </div>
          <select
            value={selectedSubjectId}
            onChange={(event) => setSelectedSubjectId(event.target.value)}
            className="rounded-full border border-white/20 bg-sky-900 px-4 py-2 text-xs text-white"
          >
            {subjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {subject.title.fr || subject.title.en}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4 space-y-3">
          {participants.length === 0 ? (
            <p className="text-sm text-sky-300">No participants yet.</p>
          ) : (
            participants.map((item) => (
              <div key={item._id} className="rounded-2xl border border-white/10 bg-sky-900/50 p-4 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white">{item.name}</p>
                    <p className="text-xs text-sky-400">{subjectMap.get(item.subjectId) || item.subjectId}</p>
                    <p className="text-xs text-sky-300">{item.email}</p>
                    <p className="text-xs text-sky-400">{item.whatsapp}</p>
                  </div>
                  <p className="text-xs text-sky-400">{item.createdAt}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-sky-900/70 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sky-400">{copy.admin.prayerLine.messageTitle}</p>
            <p className="mt-2 text-lg font-semibold text-white">{copy.admin.prayerLine.messageTitle}</p>
          </div>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-sky-300">
              {copy.admin.prayerLine.subjectLabel}
            </label>
            <select
              value={selectedSubjectId}
              onChange={(event) => setSelectedSubjectId(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
            >
              {subjects.map((subject) => (
                <option key={subject._id} value={subject._id}>
                  {subject.title.fr || subject.title.en}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-sky-300">
              {copy.admin.prayerLine.messageSubject}
            </label>
            <input
              value={messageTitle}
              onChange={(event) => setMessageTitle(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="text-xs uppercase tracking-[0.2em] text-sky-300">
            {copy.admin.prayerLine.messageBody}
          </label>
          <textarea
            value={messageBody}
            onChange={(event) => setMessageBody(event.target.value)}
            placeholder={copy.admin.prayerLine.messagePlaceholder}
            rows={4}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
          />
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={!selectedSubjectId || !messageBody.trim() || sending}
            onClick={handleSendMessage}
            className="rounded-full bg-yellow-500 px-4 py-2 text-xs font-semibold text-sky-950 disabled:opacity-50"
          >
            {sending ? "..." : copy.admin.prayerLine.send}
          </button>
          {status ? <span className="text-xs text-sky-300">{status}</span> : null}
        </div>
      </div>
    </div>
  );
}
