import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Container, Badge } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icon-map";
import { resolveImageSrc, isUnsplashSrc } from "@/lib/image-src";
import { getServices, getServiceBySlug } from "@/lib/services";
import { getDoctors } from "@/lib/doctors";
import { DoctorCard } from "@/components/cards/doctor-card";
import { FAQSection } from "@/components/sections/faq-section";
import { ServiceCard } from "@/components/cards/service-card";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return { title: service.name, description: service.short };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const related = (await getServices()).filter((s) => s.isVisible && s.slug !== service.slug).slice(0, 3);
  const doctors = (await getDoctors()).filter((d) => d.isVisible).slice(0, 3);
  const imageSrc = resolveImageSrc(service.image, 900);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border py-20 md:py-28">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light text-primary">
              <Icon name={service.icon} className="h-7 w-7" />
            </div>
            <Badge className="mt-6">Service</Badge>
            <h1 className="section-headline text-balance mt-4 font-bold text-text">{service.name}</h1>
            <p className="mt-4 text-base leading-relaxed text-text-muted">{service.description}</p>
            <Button href="/contact" size="lg" className="mt-8">Contact Us</Button>
          </Reveal>
          <Reveal delay={0.1} className="relative aspect-4/3 overflow-hidden rounded-[28px] border border-border">
            <Image src={imageSrc} alt={service.name} fill unoptimized={!isUnsplashSrc(imageSrc)} className="object-cover" />
          </Reveal>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container className="grid grid-cols-1 gap-14 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-text">Key Benefits</h2>
            <ul className="mt-6 space-y-4">
              {service.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-text-muted">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-2xl font-bold text-text">Treatment Process</h2>
            <div className="mt-6 space-y-5">
              {service.process.map((step, i) => (
                <div key={step.title} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-primary font-display text-sm font-bold text-primary">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-text">{step.title}</p>
                    <p className="mt-1 text-sm text-text-muted">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-bg-secondary py-24 md:py-32">
        <Container>
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-text">Specialists for This Service</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {doctors.map((d) => (
              <Reveal key={d.slug}>
                <DoctorCard doctor={d} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-text">Related Services</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {related.map((s) => (
              <Reveal key={s.slug}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <FAQSection />

      <section className="bg-black py-20">
        <Container className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <h2 className="font-display text-2xl font-bold text-white">Ready to book {service.name.toLowerCase()}?</h2>
          <Button href="/contact" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
            Contact Us
          </Button>
        </Container>
      </section>
    </>
  );
}
