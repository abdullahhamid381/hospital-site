import Image from "next/image";
import { Container, Badge } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icon-map";
import { unsplash } from "@/lib/unsplash";
import { getAboutContent } from "@/lib/about";

export async function About() {
  const content = await getAboutContent();

  return (
    <section className="py-24 md:py-32">
      <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="relative aspect-4/5 w-full overflow-hidden rounded-[28px] border border-border">
            <Image
              src={unsplash(content.imageId, 900)}
              alt="Hospital reception and interior"
              fill
              className="object-cover"
            />
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

          <Button href="/about" variant="dark" className="mt-9">
            Learn More About Us
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
