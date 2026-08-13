"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const MAX_BYTES = 10 * 1024 * 1024; // 10MB — short hero clips only; larger videos should be hosted elsewhere and linked by URL

const inputClass =
  "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-primary";

export function VideoField({
  label,
  value,
  onChange,
  aspectClassName = "aspect-4/5",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  aspectClassName?: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      setError("Please choose a video file.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("Video must be 10MB or smaller — for longer videos, host it elsewhere and paste the direct link instead.");
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.onload = () => onChange(String(reader.result));
    reader.onerror = () => setError("Could not read that file.");
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <label className="flex flex-col gap-1.5 text-xs font-medium text-text-muted">
        {label}
        <div className="flex gap-2">
          <input
            className={inputClass}
            value={value}
            onChange={(e) => {
              setError(null);
              onChange(e.target.value);
            }}
            placeholder="Direct video URL (.mp4/.webm), optional"
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="shrink-0 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-text transition-colors hover:border-primary hover:text-primary"
          >
            Browse…
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              aria-label="Remove video"
              className="flex shrink-0 items-center justify-center rounded-lg border border-border px-2.5 text-text-muted transition-colors hover:border-primary hover:text-primary"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </label>
      <input ref={fileRef} type="file" accept="video/*" className="hidden" onChange={handleFile} />
      {error ? (
        <p className="mt-1.5 text-xs text-primary">{error}</p>
      ) : (
        <p className="mt-1.5 text-xs text-text-muted">
          Optional — paste a direct video link, or upload a short clip (max 10MB). Leave blank to show the photo instead.
        </p>
      )}
      {value && (
        <div className={cn("relative mt-3 w-full overflow-hidden rounded-xl border border-border bg-black", aspectClassName)}>
          <video src={value} controls muted className="h-full w-full object-cover" />
        </div>
      )}
    </div>
  );
}
