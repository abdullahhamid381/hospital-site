"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/lib/icon-map";
import { JOURNEY_STEPS } from "@/lib/data/misc";

export function Journey() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.8", "end 0.4"],
  });
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="py-24 md:py-32 bg-white">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Patient Journey"
            title="Your Path to Better Health"
            description="Five clear steps guide every patient from first contact to full recovery."
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <div ref={trackRef} className="relative mt-20">
          {/* Desktop: horizontal stepper */}
          <div className="hidden md:block">
            <div className="relative grid grid-cols-5 gap-4">
              <div className="absolute left-[10%] right-[10%] top-7 h-px bg-border" />
              <motion.div
                className="absolute left-[10%] right-[10%] top-7 h-px origin-left bg-primary"
                style={{ scaleX: lineProgress }}
              />

              {JOURNEY_STEPS.map((s, i) => (
                <Reveal key={s.step} delay={i * 0.1} className="group relative flex flex-col items-center text-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ type: "spring", stiffness: 260, damping: 18, delay: i * 0.1 }}
                    className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary bg-bg text-primary shadow-(--shadow-soft) transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-(--glow-primary)"
                  >
                    <Icon name={s.icon} className="h-6 w-6" />
                    <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white ring-4 ring-bg-secondary">
                      {s.step}
                    </span>
                  </motion.div>
                  <h3 className="mt-5 font-display text-base font-bold text-text">{s.title}</h3>
                  <p className="mt-1.5 max-w-47.5 text-sm leading-relaxed text-text-muted">{s.detail}</p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Mobile: vertical stepper */}
          <div className="md:hidden">
            <div className="relative pl-17">
              <div className="absolute left-5.5 top-1 bottom-1 w-px bg-border" />
              <motion.div
                className="absolute left-5.5 top-1 bottom-1 w-px origin-top bg-primary"
                style={{ scaleY: lineProgress }}
              />
              <div className="space-y-9">
                {JOURNEY_STEPS.map((s, i) => (
                  <Reveal key={s.step} delay={i * 0.08} className="group relative">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ type: "spring", stiffness: 260, damping: 18, delay: i * 0.08 }}
                      className="absolute -left-17 top-0 flex h-11 w-11 items-center justify-center rounded-full border-2 border-primary bg-bg text-primary shadow-(--shadow-soft)"
                    >
                      <Icon name={s.icon} className="h-5 w-5" />
                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white ring-4 ring-bg-secondary">
                        {s.step}
                      </span>
                    </motion.div>
                    <h3 className="font-display text-lg font-bold text-text">{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{s.detail}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
