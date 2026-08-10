"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { FAQS } from "@/lib/data/misc";
import { cn } from "@/lib/utils";

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-bg-secondary py-24 md:py-32">
      <Container className="max-w-3xl">
        <Reveal>
          <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" align="center" className="mx-auto" />
        </Reveal>

        <div className="mt-14 space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={faq.question} delay={i * 0.04} className="overflow-hidden rounded-2xl border border-border bg-card">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-sm font-bold text-text">{faq.question}</span>
                  <Plus className={cn("h-4 w-4 shrink-0 text-primary transition-transform duration-300", isOpen && "rotate-45")} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-text-muted">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
