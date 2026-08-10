import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from around the hospital — facilities, medical technology, and patient care.",
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
