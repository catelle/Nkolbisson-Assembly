"use client";

import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

export default function ThemePage() {
  const [theme, setTheme] = useState({ text: { fr: "", en: "" }, image: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/theme")
      .then((res) => res.json())
      .then((data) => {
        if (data.text && data.image) setTheme(data);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/theme", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(theme)
    });
    setSaving(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/media/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (data.url) setTheme({ ...theme, image: data.url });
  };

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-sky-900/70 p-6">
        <div className="flex items-center gap-3 text-yellow-400">
          <Sparkles className="h-6 w-6" />
          <h1 className="text-2xl font-semibold text-white">Theme du mois</h1>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-sky-900/70 p-6 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-sky-300 mb-2">Texte (Francais)</label>
          <input
            type="text"
            value={theme.text.fr}
            onChange={(e) => setTheme({ ...theme, text: { ...theme.text, fr: e.target.value } })}
            className="w-full rounded-2xl border border-white/10 bg-sky-950/50 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-sky-300 mb-2">Text (English)</label>
          <input
            type="text"
            value={theme.text.en}
            onChange={(e) => setTheme({ ...theme, text: { ...theme.text, en: e.target.value } })}
            className="w-full rounded-2xl border border-white/10 bg-sky-950/50 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-sky-300 mb-2">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full rounded-2xl border border-white/10 bg-sky-950/50 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-yellow-400"
          />
          {theme.image && (
            <img src={theme.image} alt="Theme" className="mt-4 h-48 w-full rounded-2xl object-cover" />
          )}
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-full bg-yellow-500 px-6 py-3 text-sm font-semibold text-sky-950 hover:bg-yellow-400 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
