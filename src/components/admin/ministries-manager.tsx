"use client";

import { useEffect, useState } from "react";
import { getCopy } from "@/lib/copy";
import { useSession } from "next-auth/react";
import ImageUploadField from "@/components/admin/image-upload-field";

type LocalizedText = { fr: string; en: string };

type MinistryDoc = {
  _id?: string;
  name: LocalizedText;
  summary: LocalizedText;
  leader: LocalizedText;
  meetingTime: LocalizedText;
  latestUpdate: LocalizedText;
  image?: string;
};

const emptyMinistry: MinistryDoc = {
  name: { fr: "", en: "" },
  summary: { fr: "", en: "" },
  leader: { fr: "", en: "" },
  meetingTime: { fr: "", en: "" },
  latestUpdate: { fr: "", en: "" },
  image: ""
};

export default function MinistriesManager({ locale }: { locale: string }) {
  const copy = getCopy(locale);
  const { data: session } = useSession();
  const [items, setItems] = useState<MinistryDoc[]>([]);
  const [current, setCurrent] = useState<MinistryDoc>(emptyMinistry);
  const [editingId, setEditingId] = useState<string | null>(null);

  const load = async () => {
    const res = await fetch("/api/ministries", { cache: "no-store" });
    if (!res.ok) return;
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    if (session?.user?.role === "admin") {
      load();
    }
  }, [session]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const payload = { ...current };

    if (editingId) {
      await fetch(`/api/ministries/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } else {
      await fetch("/api/ministries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    }

    setCurrent(emptyMinistry);
    setEditingId(null);
    load();
  };

  const handleEdit = (item: MinistryDoc) => {
    setCurrent({
      name: item.name,
      summary: item.summary,
      leader: item.leader,
      meetingTime: item.meetingTime,
      latestUpdate: item.latestUpdate,
      image: item.image || ""
    });
    setEditingId(item._id || null);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    await fetch(`/api/ministries/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-sky-900/70 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-sky-300">{copy.admin.ministries.label} (FR)</label>
            <input
              value={current.name.fr}
              onChange={(event) => setCurrent({ ...current, name: { ...current.name, fr: event.target.value } })}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-sky-300">{copy.admin.ministries.label} (EN)</label>
            <input
              value={current.name.en}
              onChange={(event) => setCurrent({ ...current, name: { ...current.name, en: event.target.value } })}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-sky-300">Resume (FR)</label>
            <textarea
              value={current.summary.fr}
              onChange={(event) => setCurrent({ ...current, summary: { ...current.summary, fr: event.target.value } })}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-sky-300">Summary (EN)</label>
            <textarea
              value={current.summary.en}
              onChange={(event) => setCurrent({ ...current, summary: { ...current.summary, en: event.target.value } })}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-sky-300">{copy.admin.ministries.leader} (FR)</label>
            <input
              value={current.leader.fr}
              onChange={(event) => setCurrent({ ...current, leader: { ...current.leader, fr: event.target.value } })}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-sky-300">Leader (EN)</label>
            <input
              value={current.leader.en}
              onChange={(event) => setCurrent({ ...current, leader: { ...current.leader, en: event.target.value } })}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-sky-300">Horaire (FR)</label>
            <input
              value={current.meetingTime.fr}
              onChange={(event) =>
                setCurrent({ ...current, meetingTime: { ...current.meetingTime, fr: event.target.value } })
              }
              className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-sky-300">Meeting (EN)</label>
            <input
              value={current.meetingTime.en}
              onChange={(event) =>
                setCurrent({ ...current, meetingTime: { ...current.meetingTime, en: event.target.value } })
              }
              className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs uppercase tracking-[0.2em] text-sky-300">Update (FR)</label>
            <textarea
              value={current.latestUpdate.fr}
              onChange={(event) =>
                setCurrent({ ...current, latestUpdate: { ...current.latestUpdate, fr: event.target.value } })
              }
              className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs uppercase tracking-[0.2em] text-sky-300">Update (EN)</label>
            <textarea
              value={current.latestUpdate.en}
              onChange={(event) =>
                setCurrent({ ...current, latestUpdate: { ...current.latestUpdate, en: event.target.value } })
              }
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
        </div>
        <div className="mt-6 flex gap-3">
          <button className="rounded-full bg-yellow-500 px-4 py-2 text-xs font-semibold text-sky-950" type="submit">
            {copy.admin.ministries.add}
          </button>
          {editingId ? (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setCurrent(emptyMinistry);
              }}
              className="rounded-full border border-white/20 px-4 py-2 text-xs text-white"
            >
              Reset
            </button>
          ) : null}
        </div>
      </form>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item._id} className="rounded-3xl border border-white/10 bg-sky-900/60 p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-lg font-semibold text-white">{item.name?.fr}</p>
                <p className="mt-2 text-sm text-sky-300">{item.latestUpdate?.fr}</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleEdit(item)}
                  className="rounded-full border border-white/20 px-3 py-1 text-xs text-white"
                >
                  {copy.admin.ministries.edit}
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item._id)}
                  className="rounded-full border border-white/20 px-3 py-1 text-xs text-white"
                >
                  {copy.admin.ministries.remove}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
