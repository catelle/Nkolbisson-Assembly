"use client";

import { useEffect, useState } from "react";
import { getCopy } from "@/lib/copy";
import { useSession } from "next-auth/react";
import ImageUploadField from "@/components/admin/image-upload-field";

type LocalizedText = { fr: string; en: string };

type UpdateDoc = {
  _id?: string;
  title: LocalizedText;
  slug: string;
  excerpt: LocalizedText;
  content: { fr: string[]; en: string[] };
  tags: { fr: string[]; en: string[] };
  cover?: string;
  publishedAt?: string;
  status: "draft" | "published";
};

const emptyUpdate: UpdateDoc = {
  title: { fr: "", en: "" },
  slug: "",
  excerpt: { fr: "", en: "" },
  content: { fr: [], en: [] },
  tags: { fr: [], en: [] },
  cover: "",
  publishedAt: "",
  status: "draft"
};

export default function UpdatesManager({ locale }: { locale: string }) {
  const copy = getCopy(locale);
  const { data: session } = useSession();
  const [items, setItems] = useState<UpdateDoc[]>([]);
  const [current, setCurrent] = useState<UpdateDoc>(emptyUpdate);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const load = async () => {
    const res = await fetch("/api/updates", { cache: "no-store" });
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
    const payload = {
      ...current,
      content: {
        fr: current.content.fr,
        en: current.content.en
      },
      tags: {
        fr: current.tags.fr,
        en: current.tags.en
      }
    };

    if (editingId) {
      await fetch(`/api/updates/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } else {
      await fetch("/api/updates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    }

    setCurrent(emptyUpdate);
    setEditingId(null);
    setShowForm(false);
    load();
  };

  const handleEdit = (item: UpdateDoc) => {
    setCurrent({
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt,
      content: item.content,
      tags: item.tags,
      cover: item.cover || "",
      publishedAt: item.publishedAt || "",
      status: item.status
    });
    setEditingId(item._id || null);
    setShowForm(true);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    await fetch(`/api/updates/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-sky-900/70 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sky-400">{copy.admin.updates.label}</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">{copy.admin.updates.title}</h2>
          </div>
          <button
            type="button"
            onClick={() => {
              if (showForm) {
                setShowForm(false);
                setEditingId(null);
                setCurrent(emptyUpdate);
                return;
              }
              setEditingId(null);
              setCurrent(emptyUpdate);
              setShowForm(true);
            }}
            className="rounded-full bg-yellow-500 px-4 py-2 text-xs font-semibold text-sky-950"
          >
            {showForm ? "Close form" : copy.admin.updates.add}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item._id} className="rounded-3xl border border-white/10 bg-sky-900/60 p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-sky-400">{item.tags?.fr?.join(" - ")}</p>
                <h3 className="mt-1 text-lg font-semibold text-white">{item.title?.fr}</h3>
                <p className="mt-2 text-sm text-sky-300">{item.excerpt?.fr}</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleEdit(item)}
                  className="rounded-full border border-white/20 px-3 py-1 text-xs text-white"
                >
                  {copy.admin.updates.edit}
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item._id)}
                  className="rounded-full border border-white/20 px-3 py-1 text-xs text-white"
                >
                  {copy.admin.updates.remove}
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
              {editingId ? copy.admin.updates.edit : copy.admin.updates.add}
            </p>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setCurrent(emptyUpdate);
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
                value={current.title.fr}
                onChange={(event) => setCurrent({ ...current, title: { ...current.title, fr: event.target.value } })}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-sky-300">Title (EN)</label>
              <input
                value={current.title.en}
                onChange={(event) => setCurrent({ ...current, title: { ...current.title, en: event.target.value } })}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-sky-300">Slug</label>
              <input
                value={current.slug}
                onChange={(event) => setCurrent({ ...current, slug: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-sky-300">Status</label>
              <select
                value={current.status}
                onChange={(event) => setCurrent({ ...current, status: event.target.value as "draft" | "published" })}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="text-xs uppercase tracking-[0.2em] text-sky-300">Resume (FR)</label>
              <textarea
                value={current.excerpt.fr}
                onChange={(event) =>
                  setCurrent({ ...current, excerpt: { ...current.excerpt, fr: event.target.value } })
                }
                className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs uppercase tracking-[0.2em] text-sky-300">Excerpt (EN)</label>
              <textarea
                value={current.excerpt.en}
                onChange={(event) =>
                  setCurrent({ ...current, excerpt: { ...current.excerpt, en: event.target.value } })
                }
                className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-sky-300">Tags FR (comma)</label>
              <input
                value={current.tags.fr.join(", ")}
                onChange={(event) =>
                  setCurrent({
                    ...current,
                    tags: {
                      ...current.tags,
                      fr: event.target.value.split(",").map((t) => t.trim()).filter(Boolean)
                    }
                  })
                }
                className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-sky-300">Tags EN (comma)</label>
              <input
                value={current.tags.en.join(", ")}
                onChange={(event) =>
                  setCurrent({
                    ...current,
                    tags: {
                      ...current.tags,
                      en: event.target.value.split(",").map((t) => t.trim()).filter(Boolean)
                    }
                  })
                }
                className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
              />
            </div>
            <div className="md:col-span-2">
              <ImageUploadField
                label="Cover image"
                value={current.cover}
                onChange={(value) => setCurrent({ ...current, cover: value })}
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-sky-300">Published at</label>
              <input
                type="date"
                value={current.publishedAt}
                onChange={(event) => setCurrent({ ...current, publishedAt: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs uppercase tracking-[0.2em] text-sky-300">Content FR (line per paragraph)</label>
              <textarea
                value={current.content.fr.join("\n")}
                onChange={(event) =>
                  setCurrent({
                    ...current,
                    content: { ...current.content, fr: event.target.value.split("\n").filter(Boolean) }
                  })
                }
                rows={4}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs uppercase tracking-[0.2em] text-sky-300">Content EN (line per paragraph)</label>
              <textarea
                value={current.content.en.join("\n")}
                onChange={(event) =>
                  setCurrent({
                    ...current,
                    content: { ...current.content, en: event.target.value.split("\n").filter(Boolean) }
                  })
                }
                rows={4}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
              />
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button className="rounded-full bg-yellow-500 px-4 py-2 text-xs font-semibold text-sky-950" type="submit">
              {copy.admin.updates.add}
            </button>
            {editingId ? (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setCurrent(emptyUpdate);
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
