"use client";

import { useEffect, useState } from "react";
import { getCopy } from "@/lib/copy";
import { useSession } from "next-auth/react";
import ImageUploadField from "@/components/admin/image-upload-field";

type LocalizedText = { fr: string; en: string };

type EventDoc = {
  _id?: string;
  title: LocalizedText;
  description: LocalizedText;
  location: LocalizedText;
  ministry: LocalizedText;
  startAt: string;
  endAt?: string;
  image?: string;
  status: "draft" | "published";
};

const emptyEvent: EventDoc = {
  title: { fr: "", en: "" },
  description: { fr: "", en: "" },
  location: { fr: "", en: "" },
  ministry: { fr: "", en: "" },
  startAt: "",
  endAt: "",
  image: "",
  status: "draft"
};

export default function EventsManager({ locale }: { locale: string }) {
  const copy = getCopy(locale);
  const { data: session } = useSession();
  const [events, setEvents] = useState<EventDoc[]>([]);
  const [current, setCurrent] = useState<EventDoc>(emptyEvent);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const load = async () => {
    const res = await fetch("/api/events", { cache: "no-store" });
    if (!res.ok) return;
    const data = await res.json();
    setEvents(data);
  };

  useEffect(() => {
    if (session?.user?.role === "admin") {
      load();
    }
  }, [session]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const payload = {
      ...current,
      endAt: current.endAt || undefined
    };

    if (editingId) {
      await fetch(`/api/events/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } else {
      await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    }

    setCurrent(emptyEvent);
    setEditingId(null);
    setLoading(false);
    setShowForm(false);
    load();
  };

  const handleEdit = (item: EventDoc) => {
    setCurrent({
      title: item.title,
      description: item.description,
      location: item.location,
      ministry: item.ministry,
      startAt: item.startAt,
      endAt: item.endAt || "",
      image: item.image || "",
      status: item.status
    });
    setEditingId(item._id || null);
    setShowForm(true);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    await fetch(`/api/events/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-sky-900/70 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sky-400">{copy.admin.events.label}</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">{copy.admin.events.title}</h2>
          </div>
          <button
            type="button"
            onClick={() => {
              if (showForm) {
                setShowForm(false);
                setEditingId(null);
                setCurrent(emptyEvent);
                return;
              }
              setEditingId(null);
              setCurrent(emptyEvent);
              setShowForm(true);
            }}
            className="rounded-full bg-yellow-500 px-4 py-2 text-xs font-semibold text-sky-950"
          >
            {showForm ? "Close form" : copy.admin.events.add}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {events.map((item) => (
          <div key={item._id} className="rounded-3xl border border-white/10 bg-sky-900/60 p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-sky-400">{item.ministry?.fr}</p>
                <h3 className="mt-1 text-lg font-semibold text-white">{item.title?.fr}</h3>
                <p className="mt-2 text-sm text-sky-300">{item.location?.fr}</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleEdit(item)}
                  className="rounded-full border border-white/20 px-3 py-1 text-xs text-white"
                >
                  {copy.admin.events.edit}
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item._id)}
                  className="rounded-full border border-white/20 px-3 py-1 text-xs text-white"
                >
                  {copy.admin.events.remove}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm ? (
        <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-sky-900/70 p-6">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.3em] text-sky-400">
              {editingId ? copy.admin.events.edit : copy.admin.events.add}
            </p>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setCurrent(emptyEvent);
              }}
              className="rounded-full border border-white/20 px-4 py-2 text-xs text-white"
            >
              Close
            </button>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-sky-300">{copy.admin.events.label} (FR)</label>
              <input
                value={current.title.fr}
                onChange={(event) => setCurrent({ ...current, title: { ...current.title, fr: event.target.value } })}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-sky-300">{copy.admin.events.label} (EN)</label>
              <input
                value={current.title.en}
                onChange={(event) => setCurrent({ ...current, title: { ...current.title, en: event.target.value } })}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-sky-300">Description (FR)</label>
              <textarea
                value={current.description.fr}
                onChange={(event) =>
                  setCurrent({ ...current, description: { ...current.description, fr: event.target.value } })
                }
                className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-sky-300">Description (EN)</label>
              <textarea
                value={current.description.en}
                onChange={(event) =>
                  setCurrent({ ...current, description: { ...current.description, en: event.target.value } })
                }
                className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-sky-300">Lieu (FR)</label>
              <input
                value={current.location.fr}
                onChange={(event) =>
                  setCurrent({ ...current, location: { ...current.location, fr: event.target.value } })
                }
                className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-sky-300">Location (EN)</label>
              <input
                value={current.location.en}
                onChange={(event) =>
                  setCurrent({ ...current, location: { ...current.location, en: event.target.value } })
                }
                className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-sky-300">Ministere (FR)</label>
              <input
                value={current.ministry.fr}
                onChange={(event) =>
                  setCurrent({ ...current, ministry: { ...current.ministry, fr: event.target.value } })
                }
                className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-sky-300">Ministry (EN)</label>
              <input
                value={current.ministry.en}
                onChange={(event) =>
                  setCurrent({ ...current, ministry: { ...current.ministry, en: event.target.value } })
                }
                className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-sky-300">Start</label>
              <input
                type="datetime-local"
                value={current.startAt}
                onChange={(event) => setCurrent({ ...current, startAt: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-sky-300">End</label>
              <input
                type="datetime-local"
                value={current.endAt}
                onChange={(event) => setCurrent({ ...current, endAt: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
              />
            </div>
            <div className="md:col-span-2">
              <ImageUploadField
                label="Image"
                value={current.image}
                onChange={(value) => setCurrent({ ...current, image: value })}
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-sky-300">Status</label>
              <select
                value={current.status}
                onChange={(event) =>
                  setCurrent({ ...current, status: event.target.value as "draft" | "published" })
                }
                className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button className="rounded-full bg-yellow-500 px-4 py-2 text-xs font-semibold text-sky-950" type="submit">
              {loading ? "..." : copy.admin.events.add}
            </button>
            {editingId ? (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setCurrent(emptyEvent);
                }}
                className="rounded-full border border-white/20 px-4 py-2 text-xs text-white"
              >
                Reset
              </button>
            ) : null}
          </div>
        </form>
      ) : null}
    </div>
  );
}
