"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { resolveImageSrc } from "@/lib/image-src";
import { cn } from "@/lib/utils";

const MAX_BYTES = 2 * 1024 * 1024; // 2MB — keeps admin requests comfortably under typical serverless body limits

const inputClass =
  "w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-primary";

export function ImageField({
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

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("Image must be 2MB or smaller.");
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
            placeholder="Unsplash photo ID or image URL"
            required
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="shrink-0 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-text transition-colors hover:border-primary hover:text-primary"
          >
            Browse…
          </button>
        </div>
      </label>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      {error ? (
        <p className="mt-1.5 text-xs text-primary">{error}</p>
      ) : (
        <p className="mt-1.5 text-xs text-text-muted">Paste an Unsplash photo ID / image URL, or upload a photo from your computer.</p>
      )}
      <div className={cn("relative mt-3 w-full overflow-hidden rounded-xl border border-border", aspectClassName)}>
        {value && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={resolveImageSrc(value, 400)} alt="" className="h-full w-full object-cover" />
        )}
      </div>
    </div>
  );
}
