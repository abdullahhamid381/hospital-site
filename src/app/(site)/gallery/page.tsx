"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Container, Badge } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { unsplash } from "@/lib/unsplash";
import { GALLERY } from "@/lib/data/misc";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", ...Array.from(new Set(GALLERY.map((g) => g.category)))];

export default function GalleryPage() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const items = active === "All" ? GALLERY : GALLERY.filter((g) => g.category === active);

  function showNext() {
    if (lightbox === null) return;
    setLightbox((lightbox + 1) % items.length);
  }
  function showPrev() {
    if (lightbox === null) return;
    setLightbox((lightbox - 1 + items.length) % items.length);
  }

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-bg-secondary py-20 md:py-28">
        <Container>
          <Reveal>
            <Badge>Gallery</Badge>
            <h1 className="section-headline text-balance mt-5 max-w-2xl font-bold text-text">A Look Inside Our Hospital</h1>
          </Reveal>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs font-semibold transition-colors",
                  active === c ? "border-primary bg-primary text-white" : "border-border text-text hover:border-primary hover:text-primary"
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
            {items.map((item, i) => (
              <button
                key={item.caption + i}
                onClick={() => setLightbox(i)}
                className="group relative block w-full overflow-hidden rounded-2xl border border-border"
                style={{ breakInside: "avoid" }}
              >
                <div className={cn("relative w-full", i % 3 === 0 ? "aspect-[3/4]" : "aspect-[4/3]")}>
                  <Image
                    src={unsplash(item.image, 700)}
                    alt={item.caption}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/30" />
                  <span className="absolute bottom-3 left-4 right-4 text-left text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                    {item.caption}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </Container>
      </section>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-6"
            onClick={() => setLightbox(null)}
          >
            <button onClick={() => setLightbox(null)} className="absolute right-6 top-6 text-white/70 hover:text-white">
              <X className="h-7 w-7" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); showPrev(); }}
              className="absolute left-4 md:left-10 text-white/70 hover:text-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="relative aspect-[4/3] w-full max-w-3xl overflow-hidden rounded-2xl"
            >
              <Image src={unsplash(items[lightbox].image, 1400)} alt={items[lightbox].caption} fill className="object-cover" />
            </motion.div>
            <button
              onClick={(e) => { e.stopPropagation(); showNext(); }}
              className="absolute right-4 md:right-10 text-white/70 hover:text-white"
              aria-label="Next image"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
