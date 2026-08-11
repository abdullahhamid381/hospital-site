import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { GraduationCap, Clock3, CalendarDays, Languages, Star } from "lucide-react";
import { Container, Badge } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { AppointmentForm } from "@/components/sections/appointment-form";
import { unsplash } from "@/lib/unsplash";
import { DOCTORS, getDoctorBySlug } from "@/lib/data/doctors";
import { TESTIMONIALS } from "@/lib/data/misc";
import { TestimonialCard } from "@/components/cards/misc-cards";

export function generateStaticParams() {
  return DOCTORS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doctor = getDoctorBySlug(slug);
  if (!doctor) return {};
  return { title: doctor.name, description: `${doctor.specialization} — ${doctor.experience}` };
}

export default async function DoctorProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doctor = getDoctorBySlug(slug);
  if (!doctor) notFound();

  return (
    <>
      <section className="border-b border-border py-16 md:py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[380px_1fr]">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-border">
              <Image src={unsplash(doctor.image, 700)} alt={doctor.name} fill className="object-cover" />
            </div>
            <div className="mt-6 rounded-2xl border border-border bg-card p-6">
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <CalendarDays className="h-4 w-4 shrink-0 text-primary" />
                  <span className="text-text-muted">{doctor.availableDays}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock3 className="h-4 w-4 shrink-0 text-primary" />
                  <span className="text-text-muted">{doctor.availableTimings}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Languages className="h-4 w-4 shrink-0 text-primary" />
                  <span className="text-text-muted">{doctor.languages.join(", ")}</span>
                </div>
              </div>
              <Button href="#book" className="mt-6 w-full">Contact Us</Button>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Badge>{doctor.department}</Badge>
            <h1 className="section-headline text-balance mt-5 font-bold text-text">{doctor.name}</h1>
            <p className="mt-2 text-lg font-semibold text-primary">{doctor.specialization}</p>
            <p className="mt-1 text-sm text-text-muted">{doctor.experience}</p>

            <div className="mt-6 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
              <span className="ml-2 text-xs text-text-muted">Highly rated by patients</span>
            </div>

            <h2 className="mt-10 font-display text-xl font-bold text-text">Biography</h2>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">{doctor.bio}</p>

            <h2 className="mt-10 flex items-center gap-2 font-display text-xl font-bold text-text">
              <GraduationCap className="h-5 w-5 text-primary" /> Qualifications
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {doctor.qualifications.map((q) => (
                <li key={q} className="rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-text">
                  {q}
                </li>
              ))}
            </ul>

            <h2 className="mt-10 font-display text-xl font-bold text-text">Areas of Expertise</h2>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {doctor.expertise.map((e) => (
                <li key={e} className="rounded-xl border border-border bg-card px-4 py-3 text-sm text-text">
                  {e}
                </li>
              ))}
            </ul>

            <h2 className="mt-10 font-display text-xl font-bold text-text">Patient Reviews</h2>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {TESTIMONIALS.slice(0, 2).map((t) => (
                <TestimonialCard key={t.name} testimonial={t} />
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section id="book" className="bg-bg-secondary py-24 md:py-32 scroll-mt-24">
        <Container>
          <Reveal>
            <h2 className="section-headline text-balance font-bold text-text">Contact {doctor.name}</h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <AppointmentForm />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
