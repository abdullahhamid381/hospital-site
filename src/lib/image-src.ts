import { unsplash } from "@/lib/unsplash";

/** Accepts an Unsplash photo id, a full image URL, or an uploaded data: URL. */
export function resolveImageSrc(value: string, width = 800, quality = 80): string {
  if (!value) return "";
  if (/^(https?:|data:)/.test(value)) return value;
  return unsplash(value, width, quality);
}

/** Only Unsplash-sourced images can go through next/image's optimizer (see next.config.ts remotePatterns). */
export function isUnsplashSrc(src: string): boolean {
  return src.startsWith("https://images.unsplash.com/");
}
