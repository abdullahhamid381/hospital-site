"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { TestimonialCard } from "@/components/cards/misc-cards";
import { TESTIMONIALS } from "@/lib/data/misc";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const perPage = 1;
  const total = TESTIMONIALS.length;

  function next() {
    setIndex((i) => (i + perPage) % total);
  }
  function prev() {
    setIndex((i) => (i - perPage + total) % total);
  }

  return (
    <section className="py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Testimonials" title="What Our Patients Say" align="center" className="mx-auto" />
        </Reveal>

        <div className="mt-14 mx-auto max-w-xl">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <TestimonialCard testimonial={TESTIMONIALS[index]} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text hover:border-primary hover:text-primary transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-1.5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-primary" : "w-1.5 bg-border"}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text hover:border-primary hover:text-primary transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
