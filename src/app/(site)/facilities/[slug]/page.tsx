import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Container, Badge } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { unsplash } from "@/lib/unsplash";
import { FACILITIES, getFacilityBySlug } from "@/lib/data/facilities";
import { FacilityCard } from "@/components/cards/misc-cards";

export function generateStaticParams() {
  return FACILITIES.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const facility = getFacilityBySlug(slug);
  if (!facility) return {};
  return { title: facility.name, description: facility.short };
}

export default async function FacilityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const facility = getFacilityBySlug(slug);
  if (!facility) notFound();

  const related = FACILITIES.filter((f) => f.slug !== facility.slug).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="relative h-72 md:h-96">
          <Image src={unsplash(facility.image, 1400)} alt={facility.name} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
          <Container className="relative flex h-full flex-col justify-end pb-10">
            <Reveal>
              <Badge className="border-white/20 bg-white/10 text-white">Facility</Badge>
              <h1 className="section-headline text-balance mt-4 font-bold text-white">{facility.name}</h1>
            </Reveal>
          </Container>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <Container className="max-w-3xl">
          <Reveal>
            <p className="text-base leading-relaxed text-text-muted">{facility.description}</p>
            <Button href="/contact" size="lg" className="mt-8" icon={<ArrowRight className="h-4 w-4" />}>
              Contact Us
            </Button>
          </Reveal>
        </Container>
      </section>

      <section className="bg-bg-secondary py-24 md:py-32">
        <Container>
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-text">Other Facilities</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {related.map((f) => (
              <Reveal key={f.slug}>
                <FacilityCard facility={f} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
