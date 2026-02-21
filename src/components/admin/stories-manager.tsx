"use client";

import { useEffect, useState } from "react";
import { getCopy } from "@/lib/copy";
import { useSession } from "next-auth/react";
import ImageUploadField from "@/components/admin/image-upload-field";

type LocalizedText = { fr: string; en: string };

type StoryBlock = {
  id: string;
  type: "paragraph" | "subtitle" | "image" | "image_text";
  text?: LocalizedText;
  image?: string;
  caption?: LocalizedText;
  align?: "left" | "right" | "center";
};

type StoryDoc = {
  _id?: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  slug: string;
  readingTime: number;
  tags: { fr: string[]; en: string[] };
  hero?: string;
  blocks: StoryBlock[];
  publishedAt?: string;
  status: "draft" | "published";
};

const emptyStory: StoryDoc = {
  title: { fr: "", en: "" },
  subtitle: { fr: "", en: "" },
  slug: "",
  readingTime: 5,
  tags: { fr: [], en: [] },
  hero: "",
  blocks: [],
  publishedAt: "",
  status: "draft"
};

export default function StoriesManager({ locale }: { locale: string }) {
  const copy = getCopy(locale);
  const { data: session } = useSession();
  const [items, setItems] = useState<StoryDoc[]>([]);
  const [current, setCurrent] = useState<StoryDoc>(emptyStory);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newBlockType, setNewBlockType] = useState<StoryBlock["type"]>("paragraph");
  const [showForm, setShowForm] = useState(false);

  const createBlock = (type: StoryBlock["type"]): StoryBlock => ({
    id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    type,
    text: type === "image" ? undefined : { fr: "", en: "" },
    image: type === "image" || type === "image_text" ? "" : undefined,
    caption: type === "image" || type === "image_text" ? { fr: "", en: "" } : undefined,
    align: type === "image_text" ? "left" : undefined
  });

  const updateBlock = (index: number, patch: Partial<StoryBlock>) => {
    setCurrent((prev) => {
      const blocks = [...prev.blocks];
      blocks[index] = { ...blocks[index], ...patch };
      return { ...prev, blocks };
    });
  };

  const moveBlock = (from: number, to: number) => {
    setCurrent((prev) => {
      const blocks = [...prev.blocks];
      const [item] = blocks.splice(from, 1);
      blocks.splice(to, 0, item);
      return { ...prev, blocks };
    });
  };

  const removeBlock = (index: number) => {
    setCurrent((prev) => {
      const blocks = [...prev.blocks];
      blocks.splice(index, 1);
      return { ...prev, blocks };
    });
  };

  const load = async () => {
    const res = await fetch("/api/stories", { cache: "no-store" });
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
      await fetch(`/api/stories/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } else {
      await fetch("/api/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    }

    setCurrent(emptyStory);
    setEditingId(null);
    setShowForm(false);
    load();
  };

  const handleEdit = (item: StoryDoc) => {
    setCurrent({
      title: item.title,
      subtitle: item.subtitle,
      slug: item.slug,
      readingTime: item.readingTime,
      tags: item.tags,
      hero: item.hero || "",
      blocks: item.blocks || [],
      publishedAt: item.publishedAt || "",
      status: item.status
    });
    setEditingId(item._id || null);
    setShowForm(true);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    await fetch(`/api/stories/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-sky-900/70 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sky-400">{copy.admin.stories.label}</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">{copy.admin.stories.title}</h2>
          </div>
          <button
            type="button"
            onClick={() => {
              if (showForm) {
                setShowForm(false);
                setEditingId(null);
                setCurrent(emptyStory);
                return;
              }
              setEditingId(null);
              setCurrent(emptyStory);
              setShowForm(true);
            }}
            className="rounded-full bg-yellow-500 px-4 py-2 text-xs font-semibold text-sky-950"
          >
            {showForm ? "Close form" : copy.admin.stories.add}
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
                <p className="mt-2 text-sm text-sky-300">{item.subtitle?.fr}</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleEdit(item)}
                  className="rounded-full border border-white/20 px-3 py-1 text-xs text-white"
                >
                  {copy.admin.stories.edit}
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item._id)}
                  className="rounded-full border border-white/20 px-3 py-1 text-xs text-white"
                >
                  {copy.admin.stories.remove}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm ? (
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-sky-900/70 p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.3em] text-sky-400">
                {editingId ? copy.admin.stories.edit : copy.admin.stories.add}
              </p>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setCurrent(emptyStory);
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
                <label className="text-xs uppercase tracking-[0.2em] text-sky-300">Sous-titre (FR)</label>
                <input
                  value={current.subtitle.fr}
                  onChange={(event) =>
                    setCurrent({ ...current, subtitle: { ...current.subtitle, fr: event.target.value } })
                  }
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-sky-300">Subtitle (EN)</label>
                <input
                  value={current.subtitle.en}
                  onChange={(event) =>
                    setCurrent({ ...current, subtitle: { ...current.subtitle, en: event.target.value } })
                  }
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
                <label className="text-xs uppercase tracking-[0.2em] text-sky-300">Reading time</label>
                <input
                  type="number"
                  value={current.readingTime}
                  onChange={(event) => setCurrent({ ...current, readingTime: Number(event.target.value) })}
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
                  label="Hero image"
                  value={current.hero}
                  onChange={(value) => setCurrent({ ...current, hero: value })}
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
            </div>
            <div className="mt-6 flex gap-3">
              <button className="rounded-full bg-yellow-500 px-4 py-2 text-xs font-semibold text-sky-950" type="submit">
                {copy.admin.stories.add}
              </button>
              {editingId ? (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setCurrent(emptyStory);
                  }}
                  className="rounded-full border border-white/20 px-4 py-2 text-xs text-white"
                >
                  Reset
                </button>
              ) : null}
            </div>
          </form>

          <div className="rounded-3xl border border-white/10 bg-sky-900/60 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-sky-400">Story blocks</p>
                <p className="mt-1 text-sm text-sky-200/80">Add subtitles, paragraphs, and images in order.</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <select
                  value={newBlockType}
                  onChange={(event) => setNewBlockType(event.target.value as StoryBlock["type"])}
                  className="rounded-full border border-white/20 bg-sky-900 px-4 py-2 text-xs text-white"
                >
                  <option value="subtitle">Subtitle</option>
                  <option value="paragraph">Paragraph</option>
                  <option value="image">Image</option>
                  <option value="image_text">Image + Text</option>
                </select>
                <button
                  type="button"
                  onClick={() =>
                    setCurrent((prev) => ({ ...prev, blocks: [...prev.blocks, createBlock(newBlockType)] }))
                  }
                  className="rounded-full bg-yellow-500 px-4 py-2 text-xs font-semibold text-sky-950"
                >
                  Add block
                </button>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {current.blocks.map((block, index) => {
                const textValue = block.text ?? { fr: "", en: "" };
                const captionValue = block.caption ?? { fr: "", en: "" };
                return (
                  <div key={block.id} className="rounded-3xl border border-white/10 bg-sky-900/70 p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-xs uppercase tracking-[0.3em] text-sky-400">
                        Block {index + 1} - {block.type.replace("_", " ")}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => moveBlock(index, Math.max(0, index - 1))}
                          className="rounded-full border border-white/20 px-3 py-1 text-xs text-white"
                        >
                          Up
                        </button>
                        <button
                          type="button"
                          onClick={() => moveBlock(index, Math.min(current.blocks.length - 1, index + 1))}
                          className="rounded-full border border-white/20 px-3 py-1 text-xs text-white"
                        >
                          Down
                        </button>
                        <button
                          type="button"
                          onClick={() => removeBlock(index)}
                          className="rounded-full border border-white/20 px-3 py-1 text-xs text-white"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    {block.type === "subtitle" ? (
                      <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="text-xs uppercase tracking-[0.2em] text-sky-300">Subtitle (FR)</label>
                          <input
                            value={textValue.fr}
                            onChange={(event) =>
                              updateBlock(index, { text: { ...textValue, fr: event.target.value } })
                            }
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
                          />
                        </div>
                        <div>
                          <label className="text-xs uppercase tracking-[0.2em] text-sky-300">Subtitle (EN)</label>
                          <input
                            value={textValue.en}
                            onChange={(event) =>
                              updateBlock(index, { text: { ...textValue, en: event.target.value } })
                            }
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
                          />
                        </div>
                      </div>
                    ) : null}

                    {block.type === "paragraph" ? (
                      <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="text-xs uppercase tracking-[0.2em] text-sky-300">Paragraph (FR)</label>
                          <textarea
                            value={textValue.fr}
                            onChange={(event) =>
                              updateBlock(index, { text: { ...textValue, fr: event.target.value } })
                            }
                            rows={4}
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
                          />
                        </div>
                        <div>
                          <label className="text-xs uppercase tracking-[0.2em] text-sky-300">Paragraph (EN)</label>
                          <textarea
                            value={textValue.en}
                            onChange={(event) =>
                              updateBlock(index, { text: { ...textValue, en: event.target.value } })
                            }
                            rows={4}
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
                          />
                        </div>
                      </div>
                    ) : null}

                    {block.type === "image" ? (
                      <div className="mt-4 space-y-4">
                        <ImageUploadField
                          label="Image"
                          value={block.image}
                          onChange={(value) => updateBlock(index, { image: value })}
                        />
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <label className="text-xs uppercase tracking-[0.2em] text-sky-300">Caption (FR)</label>
                            <input
                              value={captionValue.fr}
                              onChange={(event) =>
                                updateBlock(index, { caption: { ...captionValue, fr: event.target.value } })
                              }
                              className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
                            />
                          </div>
                          <div>
                            <label className="text-xs uppercase tracking-[0.2em] text-sky-300">Caption (EN)</label>
                            <input
                              value={captionValue.en}
                              onChange={(event) =>
                                updateBlock(index, { caption: { ...captionValue, en: event.target.value } })
                              }
                              className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
                            />
                          </div>
                        </div>
                      </div>
                    ) : null}

                    {block.type === "image_text" ? (
                      <div className="mt-4 space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <label className="text-xs uppercase tracking-[0.2em] text-sky-300">Text (FR)</label>
                            <textarea
                              value={textValue.fr}
                              onChange={(event) =>
                                updateBlock(index, { text: { ...textValue, fr: event.target.value } })
                              }
                              rows={4}
                              className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
                            />
                          </div>
                          <div>
                            <label className="text-xs uppercase tracking-[0.2em] text-sky-300">Text (EN)</label>
                            <textarea
                              value={textValue.en}
                              onChange={(event) =>
                                updateBlock(index, { text: { ...textValue, en: event.target.value } })
                              }
                              rows={4}
                              className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
                            />
                          </div>
                        </div>
                        <ImageUploadField
                          label="Image"
                          value={block.image}
                          onChange={(value) => updateBlock(index, { image: value })}
                        />
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <label className="text-xs uppercase tracking-[0.2em] text-sky-300">Caption (FR)</label>
                            <input
                              value={captionValue.fr}
                              onChange={(event) =>
                                updateBlock(index, { caption: { ...captionValue, fr: event.target.value } })
                              }
                              className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
                            />
                          </div>
                          <div>
                            <label className="text-xs uppercase tracking-[0.2em] text-sky-300">Caption (EN)</label>
                            <input
                              value={captionValue.en}
                              onChange={(event) =>
                                updateBlock(index, { caption: { ...captionValue, en: event.target.value } })
                              }
                              className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs uppercase tracking-[0.2em] text-sky-300">Image alignment</label>
                          <select
                            value={block.align || "left"}
                            onChange={(event) =>
                              updateBlock(index, { align: event.target.value as "left" | "right" | "center" })
                            }
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
                          >
                            <option value="left">Left</option>
                            <option value="right">Right</option>
                          </select>
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
