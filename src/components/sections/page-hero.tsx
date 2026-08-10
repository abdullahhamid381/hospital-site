import { Container, Badge } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";

export function PageHero({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-bg-secondary py-20 md:py-28">
      <div
        className="pointer-events-none absolute -top-20 right-[-8%] h-80 w-80 rotate-45 rounded-[64px]"
        style={{ background: "var(--color-primary)", opacity: 0.06 }}
      />
      <Container className="relative">
        <Reveal>
          <Badge>{eyebrow}</Badge>
          <h1 className="section-headline text-balance mt-5 max-w-2xl font-bold text-text">{title}</h1>
          {description && <p className="mt-4 max-w-xl text-base leading-relaxed text-text-muted">{description}</p>}
        </Reveal>
      </Container>
    </section>
  );
}
