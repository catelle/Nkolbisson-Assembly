"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { getLocaleFromPathname } from "@/lib/locale";
import { getCopy } from "@/lib/copy";

type LocalizedText = {
  fr: string;
  en: string;
};

type PrayerSubject = {
  _id: string;
  title: LocalizedText;
  description?: LocalizedText;
  active: boolean;
};

type Registration = {
  subjectId: string;
  subjectTitle: string;
  name: string;
  email: string;
  whatsapp: string;
};

type PrayerMessage = {
  _id: string;
  subjectId: string;
  title?: string;
  text: string;
  createdAt: string;
};

const STORAGE_KEY = "prayerLineRegistrations";

const pickText = (value: LocalizedText | undefined, locale: string) => {
  if (!value) return "";
  return value[locale as "fr" | "en"] || value.fr || "";
};

const loadRegistrations = () => {
  if (typeof window === "undefined") return [] as Registration[];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as Registration[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveRegistrations = (items: Registration[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export default function PrayerLinePage() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const copy = getCopy(locale);
  const isFr = locale === "fr";
  const { data: session, status } = useSession();
  const [subjects, setSubjects] = useState<PrayerSubject[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<PrayerSubject | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [messagesBySubject, setMessagesBySubject] = useState<Record<string, PrayerMessage[]>>({});

  const registeredSubjects = useMemo(
    () => new Set(registrations.map((item) => item.subjectId)),
    [registrations]
  );

  const loadSubjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/prayer/subjects", { cache: "no-store" });
      if (!res.ok) return;
      const data = (await res.json()) as PrayerSubject[];
      setSubjects(data);
      if (!selectedSubject && data.length) {
        setSelectedSubject(data[0]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubjects();
  }, []);

  useEffect(() => {
    setRegistrations(loadRegistrations());
  }, []);

  useEffect(() => {
    if (session?.user?.name && !name) {
      setName(session.user.name);
    }
    if (session?.user?.email && !email) {
      setEmail(session.user.email);
    }
  }, [session, name, email]);

  useEffect(() => {
    if (registrations.length === 0) {
      setMessagesBySubject({});
      return;
    }
    const loadMessages = async () => {
      const entries = await Promise.all(
        registrations.map(async (item) => {
          const res = await fetch(`/api/prayer/subjects/${item.subjectId}/messages`, { cache: "no-store" });
          const data = res.ok ? ((await res.json()) as PrayerMessage[]) : [];
          return [item.subjectId, data] as const;
        })
      );
      const next: Record<string, PrayerMessage[]> = {};
      entries.forEach(([subjectId, list]) => {
        next[subjectId] = list;
      });
      setMessagesBySubject(next);
    };
    loadMessages();
  }, [registrations]);

  const handleRegister = async () => {
    if (!selectedSubject) return;
    const requiresWhatsapp = status !== "authenticated";
    if (!name.trim() || !email.trim() || (requiresWhatsapp && !whatsapp.trim())) return;

    setSubmitting(true);
    setMessage("");
    try {
      const res = await fetch(`/api/prayer/subjects/${selectedSubject._id}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, whatsapp })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage(data?.error || "Registration failed.");
        return;
      }

      const already = registrations.some(
        (item) => item.subjectId === selectedSubject._id && item.email === email.trim().toLowerCase()
      );

      if (data?.alreadyRegistered || already) {
        setMessage(copy.prayerLinePage.alreadyRegistered);
        return;
      }

      const next = [
        {
          subjectId: selectedSubject._id,
          subjectTitle: pickText(selectedSubject.title, locale),
          name: name.trim(),
          email: email.trim().toLowerCase(),
          whatsapp: whatsapp.trim()
        },
        ...registrations
      ];
      setRegistrations(next);
      saveRegistrations(next);
      setMessage(copy.prayerLinePage.registered);
      setName("");
      setEmail("");
      setWhatsapp("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-10 px-4 pb-24 pt-12 md:px-6">
      <div className="rounded-3xl bg-sky-950 px-8 py-10 text-white">
        <p className="text-xs uppercase tracking-[0.3em] text-sky-300">{copy.prayerLinePage.label}</p>
        <h1 className="mt-3 font-display text-3xl">{copy.prayerLinePage.title}</h1>
        <p className="mt-2 text-sm text-sky-100/80">{copy.prayerLinePage.description}</p>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-sky-950">{copy.prayerLinePage.subjectsTitle}</h2>
        </div>
        {loading ? (
          <div className="rounded-3xl border border-sky-900/10 bg-white p-6 text-sm text-sky-700">Loading...</div>
        ) : subjects.length === 0 ? (
          <div className="rounded-3xl border border-sky-900/10 bg-white p-6 text-sm text-sky-700">
            {copy.prayerLinePage.noSubjects}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {subjects.map((subject) => {
              const title = pickText(subject.title, locale);
              const description = pickText(subject.description, locale);
              return (
                <div key={subject._id} className="rounded-3xl border border-sky-900/10 bg-white p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-sky-950">{title}</h3>
                      {description ? <p className="mt-2 text-sm text-sky-700">{description}</p> : null}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSubject(subject);
                        setMessage("");
                      }}
                      className="rounded-full bg-yellow-500 px-4 py-2 text-xs font-semibold text-sky-950"
                    >
                      {copy.prayerLinePage.join}
                    </button>
                  </div>
                  {registeredSubjects.has(subject._id) ? (
                    <p className="mt-3 text-xs text-emerald-700">{copy.prayerLinePage.registered}</p>
                  ) : null}
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="rounded-3xl border border-sky-900/10 bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sky-500">{copy.prayerLinePage.join}</p>
            <p className="mt-2 text-lg font-semibold text-sky-950">
              {selectedSubject ? pickText(selectedSubject.title, locale) : copy.prayerLinePage.subjectsTitle}
            </p>
          </div>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-sky-500">{copy.prayerLinePage.nameLabel}</label>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-sky-900/10 px-3 py-2 text-sm text-sky-950"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-sky-500">{copy.prayerLinePage.emailLabel}</label>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-sky-900/10 px-3 py-2 text-sm text-sky-950"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-sky-500">
              {copy.prayerLinePage.whatsappLabel}
              {status === "authenticated" ? (isFr ? " (optionnel)" : " (optional)") : ""}
            </label>
            <input
              value={whatsapp}
              onChange={(event) => setWhatsapp(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-sky-900/10 px-3 py-2 text-sm text-sky-950"
            />
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={!selectedSubject || submitting}
            onClick={handleRegister}
            className="rounded-full bg-sky-900 px-5 py-2 text-xs font-semibold text-white disabled:opacity-50"
          >
            {copy.prayerLinePage.register}
          </button>
          {message ? <span className="text-xs text-sky-700">{message}</span> : null}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-sky-950">{copy.prayerLinePage.mySubjects}</h2>
        {registrations.length === 0 ? (
          <div className="rounded-3xl border border-sky-900/10 bg-white p-6 text-sm text-sky-700">
            {copy.prayerLinePage.noMessages}
          </div>
        ) : (
          <div className="space-y-4">
            {registrations.map((registration) => {
              const subjectMessages = messagesBySubject[registration.subjectId] || [];
              return (
                <div key={registration.subjectId} className="rounded-3xl border border-sky-900/10 bg-white p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-sky-500">
                        {copy.prayerLinePage.messagesTitle}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold text-sky-950">{registration.subjectTitle}</h3>
                    </div>
                    <div className="text-xs text-sky-500">
                      {registration.email} · {registration.whatsapp}
                    </div>
                  </div>
                  <div className="mt-4 space-y-3">
                    {subjectMessages.length === 0 ? (
                      <p className="text-sm text-sky-700">{copy.prayerLinePage.noMessages}</p>
                    ) : (
                      subjectMessages.map((item) => (
                        <div key={item._id} className="rounded-2xl bg-sky-50 px-4 py-3 text-sm text-sky-900">
                          {item.title ? <p className="text-xs uppercase text-sky-500">{item.title}</p> : null}
                          <p className="mt-1">{item.text}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
