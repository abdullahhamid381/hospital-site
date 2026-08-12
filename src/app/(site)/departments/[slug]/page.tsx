import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Users, Clock3, ArrowRight, Siren } from "lucide-react";
import { Container, Badge } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { unsplash } from "@/lib/unsplash";
import { getDepartmentBySlug } from "@/lib/data/departments";
import { getDoctors } from "@/lib/doctors";
import { matchDepartmentDoctors, withLiveSpecialistCount } from "@/lib/departments";
import { DoctorCard } from "@/components/cards/doctor-card";
import { FAQSection } from "@/components/sections/faq-section";
import { SITE } from "@/lib/data/site";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const dept = getDepartmentBySlug(slug);
  if (!dept) return {};
  return { title: dept.name, description: dept.short };
}

export default async function DepartmentDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dept = getDepartmentBySlug(slug);
  if (!dept) notFound();

  const allDoctors = (await getDoctors()).filter((d) => d.isVisible);
  const doctors = matchDepartmentDoctors(dept, allDoctors).slice(0, 3);
  const liveDept = withLiveSpecialistCount(dept, allDoctors);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="relative h-72 md:h-96">
          <Image src={unsplash(dept.image, 1400)} alt={dept.name} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
          <Container className="relative flex h-full flex-col justify-end pb-10">
            <Reveal>
              <Badge className="border-white/20 bg-white/10 text-white">Department</Badge>
              <h1 className="section-headline text-balance mt-4 font-bold text-white">{dept.name}</h1>
            </Reveal>
          </Container>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <Container className="grid grid-cols-1 gap-14 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-text">Overview</h2>
            <p className="mt-4 text-base leading-relaxed text-text-muted">{dept.overview}</p>

            <h3 className="mt-10 font-display text-xl font-bold text-text">Services</h3>
            <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {dept.services.map((s) => (
                <li key={s} className="rounded-xl border border-border bg-card px-4 py-3 text-sm text-text">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-text-muted">Specialists</p>
                  <p className="text-sm font-bold text-text">{liveDept.specialists} Consultants</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <Clock3 className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-text-muted">Opening Hours</p>
                  <p className="text-sm font-bold text-text">{dept.hours}</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <Siren className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-text-muted">Emergency Line</p>
                  <p className="text-sm font-bold text-text">{SITE.emergencyPhone}</p>
                </div>
              </div>
            </div>
            <Button href="/contact" size="lg" className="w-full">Contact Us</Button>
          </Reveal>
        </Container>
      </section>

      <section className="bg-bg-secondary py-24 md:py-32">
        <Container>
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-text">Department Doctors</h2>
          </Reveal>
          {doctors.length > 0 ? (
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {doctors.map((d) => (
                <Reveal key={d.slug}>
                  <DoctorCard doctor={d} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal delay={0.1} className="mt-10 rounded-2xl border border-dashed border-border p-10 text-center">
              <p className="text-sm text-text-muted">
                No doctors are currently listed for this department. Visit our{" "}
                <Link href="/doctors" className="font-semibold text-primary hover:underline">
                  full doctors directory
                </Link>{" "}
                or contact the hospital for assistance.
              </p>
            </Reveal>
          )}
        </Container>
      </section>

      <FAQSection />

      <section className="bg-black py-20">
        <Container className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <h2 className="font-display text-2xl font-bold text-white">Need care from {dept.name}?</h2>
          <Button href="/contact" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
            Contact Us
          </Button>
        </Container>
      </section>
    </>
  );
}
