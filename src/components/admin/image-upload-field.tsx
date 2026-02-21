/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, useId, useState, useEffect } from "react";

type Props = {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  helper?: string;
};

type MediaFile = {
  name: string;
  url: string;
  createdAt: string;
};

export default function ImageUploadField({ label, value = "", onChange, helper }: Props) {
  const inputId = useId();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [showLibrary, setShowLibrary] = useState(false);
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);

  const loadMedia = useCallback(async () => {
    setLoadingMedia(true);
    try {
      const res = await fetch("/api/media");
      if (res.ok) {
        const data = await res.json();
        setMedia(data);
      }
    } catch (err) {
      console.error("Failed to load media", err);
    }
    setLoadingMedia(false);
  }, []);

  useEffect(() => {
    if (showLibrary && media.length === 0) {
      loadMedia();
    }
  }, [showLibrary, media.length, loadMedia]);

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/media/upload", {
        method: "POST",
        body: formData
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Upload failed");
      }

      const data = (await res.json()) as { url?: string };
      if (data.url) {
        onChange(data.url);
        loadMedia();
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      setError(message);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <label htmlFor={inputId} className="text-xs uppercase tracking-[0.2em] text-sky-300">
        {label}
      </label>
      <input
        id={inputId}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="https://"
        className="w-full rounded-2xl border border-white/10 bg-sky-900 px-3 py-2 text-sm text-white"
      />
      <div className="flex flex-wrap items-center gap-3 text-xs text-sky-300">
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="rounded-full border border-white/20 px-3 py-2 text-xs text-sky-100 file:mr-3 file:rounded-full file:border-0 file:bg-yellow-500 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-sky-950"
        />
        <button
          type="button"
          onClick={() => setShowLibrary(!showLibrary)}
          className="rounded-full border border-white/20 px-3 py-2 text-xs text-sky-100 hover:bg-white/10"
        >
          {showLibrary ? "Hide Library" : "Choose from Library"}
        </button>
        <span>{uploading ? "Uploading..." : "Upload new image"}</span>
      </div>
      {helper ? <p className="text-xs text-sky-400">{helper}</p> : null}
      {error ? <p className="text-xs text-yellow-300">{error}</p> : null}
      
      {showLibrary && (
        <div className="rounded-2xl border border-white/10 bg-sky-950/50 p-4">
          {loadingMedia ? (
            <p className="text-xs text-sky-300">Loading...</p>
          ) : media.length === 0 ? (
            <p className="text-xs text-sky-300">No images in library</p>
          ) : (
            <div className="grid grid-cols-4 gap-3">
              {media.map((file) => (
                <button
                  key={file.name}
                  type="button"
                  onClick={() => {
                    onChange(file.url);
                    setShowLibrary(false);
                  }}
                  className="group relative aspect-square overflow-hidden rounded-xl border-2 border-transparent hover:border-yellow-400"
                >
                  <img src={file.url} alt={file.name} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      
      {value ? (
        <img src={value} alt={label} className="h-32 w-full rounded-2xl object-cover" />
      ) : null}
    </div>
  );
}
