"use client";

import { useState } from "react";
import { ArrowRight, Phone, Play, X } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Container, Badge, SectionHeading } from "@/components/ui/primitives";
import { Reveal, StaggerGroup } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/cards/misc-cards";
import { Icon } from "@/lib/icon-map";
import { resolveImageSrc, isUnsplashSrc } from "@/lib/image-src";
import { PageHero } from "@/components/sections/page-hero";
import { cn } from "@/lib/utils";
import type {
  AboutSection,
  CardsContent,
  CTAContent,
  IntroContent,
  RichTextContent,
  StatsContent,
} from "@/lib/data/about-sections";

export function AboutIntroBlock({ content }: { content: IntroContent }) {
  const imageSrc = resolveImageSrc(content.imageId, 900);
  const hasVideo = Boolean(content.videoUrl);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <section className="py-24 md:py-32">
      <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div
            className={cn(
              "relative aspect-4/5 w-full overflow-hidden rounded-[28px] border border-border shadow-[var(--shadow-elevated)]",
              hasVideo && "group cursor-pointer"
            )}
            onClick={hasVideo ? () => setLightboxOpen(true) : undefined}
            role={hasVideo ? "button" : undefined}
            aria-label={hasVideo ? "Play hospital tour video" : undefined}
          >
            {hasVideo ? (
              <>
                <video
                  src={content.videoUrl}
                  poster={imageSrc}
                  muted
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-black/60 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                  Hospital Tour
                </span>
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <span className="relative flex h-20 w-20 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/30" />
                    <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-xl backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                      <Play className="ml-1 h-6 w-6 fill-primary text-primary" />
                    </span>
                  </span>
                </div>
              </>
            ) : (
              <Image
                src={imageSrc}
                alt="Hospital reception and interior"
                fill
                unoptimized={!isUnsplashSrc(imageSrc)}
                className="object-cover"
              />
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Badge>{content.badge}</Badge>
          <h2 className="section-headline text-balance mt-5 font-bold text-text">{content.heading}</h2>
          <p className="mt-5 text-base leading-relaxed text-text-muted">{content.paragraph1}</p>
          <p className="mt-4 text-base leading-relaxed text-text-muted">{content.paragraph2}</p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {content.features.map((f) => (
              <div key={f.title} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
                <Icon name={f.icon} className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm font-medium text-text">{f.title}</span>
              </div>
            ))}
          </div>

          <Button href={content.ctaHref} variant="dark" className="mt-9">
            {content.ctaLabel}
          </Button>
        </Reveal>
      </Container>

      <AnimatePresence>
        {hasVideo && lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-10"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              aria-label="Close video"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 md:right-8 md:top-8"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: "spring", damping: 26, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
            >
              <video
                src={content.videoUrl}
                poster={imageSrc}
                controls
                autoPlay
                playsInline
                className="h-full w-full bg-black object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export function AboutStatsBlock({ content }: { content: StatsContent }) {
  return (
    <section className="border-y border-border bg-bg-secondary py-14">
      <Container>
        <div className="grid grid-cols-2 gap-y-10 md:grid-cols-5 md:gap-8">
          {content.items.map((s, i) => (
            <StatCard key={s.label} value={s.value} suffix={s.suffix} label={s.label} delay={i * 0.1} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export function AboutCardsBlock({ content }: { content: CardsContent }) {
  return (
    <section className="bg-whie py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={content.eyebrow} title={content.heading} align="center" className="mx-auto" />
        </Reveal>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.items.map((item) => (
            <Reveal
              key={item.title}
              className="group rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[var(--shadow-elevated)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary transition-transform duration-300 group-hover:scale-110">
                <Icon name={item.icon} className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-base font-bold text-text">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.detail}</p>
              <div className="mt-5 h-0.5 w-8 bg-primary transition-all duration-300 group-hover:w-14" />
            </Reveal>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}

export function AboutRichTextBlock({ content }: { content: RichTextContent }) {
  const paragraphs = content.body.split(/\n{2,}/).filter(Boolean);
  return (
    <section className="py-24 md:py-32">
      <Container className="max-w-3xl">
        <Reveal>
          <SectionHeading eyebrow={content.eyebrow} title={content.heading} />
        </Reveal>
        <Reveal delay={0.1} className="mt-6 flex flex-col gap-4">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-base leading-relaxed text-text-muted whitespace-pre-line">
              {p}
            </p>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

export function AboutCTABlock({ content }: { content: CTAContent }) {
  return (
    <section className="relative overflow-hidden bg-black py-24 md:py-32">
      <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rotate-45 rounded-[48px] border border-primary/20" />
      <div
        className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rotate-45 rounded-[64px]"
        style={{ background: "var(--color-primary)", opacity: 0.12 }}
      />
      <Container className="relative text-center">
        <Reveal>
          <h2 className="section-headline text-balance mx-auto max-w-2xl font-bold text-white">{content.heading}</h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href={content.primaryHref} size="lg" icon={<ArrowRight className="h-4 w-4" />}>
            {content.primaryLabel}
          </Button>
          <Button
            href={content.secondaryHref}
            variant="outline"
            size="lg"
            className="border-white/20 text-white hover:border-primary hover:text-primary"
            icon={<Phone className="h-4 w-4" />}
          >
            {content.secondaryLabel}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}

export function AboutSectionRenderer({ section }: { section: AboutSection }) {
  switch (section.type) {
    case "hero": {
      const c = section.content as { eyebrow: string; title: string; description: string };
      return <PageHero eyebrow={c.eyebrow} title={c.title} description={c.description} />;
    }
    case "intro":
      return <AboutIntroBlock content={section.content as IntroContent} />;
    case "stats":
      return <AboutStatsBlock content={section.content as StatsContent} />;
    case "cards":
      return <AboutCardsBlock content={section.content as CardsContent} />;
    case "richtext":
      return <AboutRichTextBlock content={section.content as RichTextContent} />;
    case "cta":
      return <AboutCTABlock content={section.content as CTAContent} />;
    default:
      return null;
  }
}
