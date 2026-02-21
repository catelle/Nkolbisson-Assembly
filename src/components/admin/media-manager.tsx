"use client";

import { useEffect, useState } from "react";
import { getCopy } from "@/lib/copy";

type MediaFile = {
  name: string;
  url: string;
  createdAt: string;
};

export default function MediaManager({ locale }: { locale: string }) {
  const copy = getCopy(locale);
  const [uploads, setUploads] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(false);
  const [error, setError] = useState("");

  const loadMedia = async () => {
    setLoadingList(true);
    setError("");
    try {
      const res = await fetch("/api/media");
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to load media");
      }
      const data = await res.json();
      setUploads(Array.isArray(data) ? data : []);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load media";
      setError(message);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);

    try {
      const res = await fetch("/api/media/upload", {
        method: "POST",
        body: formData
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Upload failed");
      }

      await res.json();
      await loadMedia();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      setError(message);
    } finally {
      setLoading(false);
      event.target.value = "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-sky-900/70 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sky-400">{copy.admin.media.label}</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">{copy.admin.media.title}</h2>
          </div>
          <label className="rounded-full bg-yellow-500 px-4 py-2 text-xs font-semibold text-sky-950">
            {loading ? "..." : copy.admin.media.upload}
            <input type="file" className="hidden" onChange={handleUpload} />
          </label>
        </div>
      </div>

      {error ? (
        <div className="rounded-3xl border border-white/10 bg-yellow-500/10 p-6 text-sm text-yellow-200">
          {error}
        </div>
      ) : null}

      {loadingList ? (
        <div className="rounded-3xl border border-white/10 bg-sky-900/60 p-6 text-sm text-sky-200">
          Loading media...
        </div>
      ) : uploads.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-sky-900/60 p-6 text-sm text-sky-200">
          Upload images to Supabase storage. The generated URLs will appear here.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {uploads.map((file) => (
            <div key={file.name} className="rounded-3xl border border-white/10 bg-sky-900/60 p-4">
              <img src={file.url} alt={file.name} className="h-40 w-full rounded-2xl object-cover" />
              <p className="mt-3 break-all text-xs text-sky-300">{file.url}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
