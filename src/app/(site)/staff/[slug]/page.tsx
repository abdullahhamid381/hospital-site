import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Mail, Phone, MapPin, Languages, GraduationCap } from "lucide-react";
import { Container, Badge } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { AppointmentForm } from "@/components/sections/appointment-form";
import { StaffCard } from "@/components/cards/staff-card";
import {
  TitleDetailGrid,
  QualificationList,
  ExperienceTimeline,
  ScheduleTable,
  PublicationList,
  AwardList,
  MembershipList,
} from "@/components/sections/staff-blocks";
import { resolveImageSrc, isUnsplashSrc } from "@/lib/image-src";
import { getStaffMembers, getStaffBySlug } from "@/lib/staff";
import { staffCategoryLabel } from "@/lib/data/staff";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const staff = await getStaffBySlug(slug);
  if (!staff) return {};
  return { title: staff.name, description: `${staff.role}${staff.experience ? ` — ${staff.experience}` : ""}` };
}

export default async function StaffDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const staff = await getStaffBySlug(slug);
  if (!staff) notFound();

  const allStaff = await getStaffMembers();
  const related = allStaff
    .filter((s) => s.isVisible && s.slug !== staff.slug && (s.category === staff.category || s.department === staff.department))
    .slice(0, 3);

  const imageSrc = resolveImageSrc(staff.image, 700);
  const biographyParagraphs = staff.biography.split(/\n{2,}/).filter(Boolean);

  return (
    <>
      <Container className="pt-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-text-muted">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link href="/staff" className="hover:text-primary">Staff & Faculty</Link>
          <span>/</span>
          <span className="text-text">{staff.name}</span>
        </nav>
      </Container>

      <section className="border-b border-border py-10 md:py-16">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[380px_1fr]">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative aspect-4/5 overflow-hidden rounded-[28px] border border-border">
              <Image src={imageSrc} alt={staff.name} fill unoptimized={!isUnsplashSrc(imageSrc)} className="object-cover" />
            </div>
            <div className="mt-6 rounded-2xl border border-border bg-card p-6">
              <div className="space-y-4 text-sm">
                {staff.department && (
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 shrink-0 text-primary" />
                    <span className="text-text-muted">{staff.department}</span>
                  </div>
                )}
                {staff.languages.length > 0 && (
                  <div className="flex items-center gap-3">
                    <Languages className="h-4 w-4 shrink-0 text-primary" />
                    <span className="text-text-muted">{staff.languages.join(", ")}</span>
                  </div>
                )}
                {staff.qualifications.length > 0 && (
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-4 w-4 shrink-0 text-primary" />
                    <span className="text-text-muted">{staff.qualifications.length} Qualification{staff.qualifications.length > 1 ? "s" : ""}</span>
                  </div>
                )}
              </div>
              {staff.appointmentEnabled ? (
                <Button href="#book" className="mt-6 w-full">Book Appointment</Button>
              ) : (
                <Button href="#contact" className="mt-6 w-full">Contact</Button>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Badge>{staffCategoryLabel(staff.category)}</Badge>
            <h1 className="section-headline text-balance mt-5 font-bold text-text">{staff.name}</h1>
            <p className="mt-2 text-lg font-semibold text-primary">{staff.role}</p>
            {staff.experience && <p className="mt-1 text-sm text-text-muted">{staff.experience}</p>}

            <h2 className="mt-10 font-display text-xl font-bold text-text">About {staff.name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">{staff.shortBio}</p>
            <div className="mt-4 flex flex-col gap-4">
              {biographyParagraphs.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-text-muted whitespace-pre-line">
                  {p}
                </p>
              ))}
            </div>

            {staff.expertise.length > 0 && (
              <>
                <h2 className="mt-10 font-display text-xl font-bold text-text">Areas of Expertise</h2>
                <TitleDetailGrid items={staff.expertise} />
              </>
            )}

            {staff.qualifications.length > 0 && (
              <>
                <h2 className="mt-10 font-display text-xl font-bold text-text">Qualifications</h2>
                <QualificationList items={staff.qualifications} />
              </>
            )}

            {staff.experienceTimeline.length > 0 && (
              <>
                <h2 className="mt-10 font-display text-xl font-bold text-text">Professional Experience</h2>
                <ExperienceTimeline items={staff.experienceTimeline} />
              </>
            )}

            {staff.responsibilities.length > 0 && (
              <>
                <h2 className="mt-10 font-display text-xl font-bold text-text">Responsibilities</h2>
                <TitleDetailGrid items={staff.responsibilities} />
              </>
            )}

            {staff.schedule.length > 0 && (
              <>
                <h2 className="mt-10 font-display text-xl font-bold text-text">Weekly Schedule</h2>
                <ScheduleTable items={staff.schedule} />
              </>
            )}

            {staff.publications.length > 0 && (
              <>
                <h2 className="mt-10 font-display text-xl font-bold text-text">Publications</h2>
                <PublicationList items={staff.publications} />
              </>
            )}

            {staff.awards.length > 0 && (
              <>
                <h2 className="mt-10 font-display text-xl font-bold text-text">Awards & Achievements</h2>
                <AwardList items={staff.awards} />
              </>
            )}

            {staff.memberships.length > 0 && (
              <>
                <h2 className="mt-10 font-display text-xl font-bold text-text">Professional Memberships</h2>
                <MembershipList items={staff.memberships} />
              </>
            )}
          </Reveal>
        </Container>
      </section>

      <section id="contact" className="scroll-mt-24 bg-bg-secondary py-24 md:py-32">
        <Container>
          <Reveal>
            <h2 className="section-headline text-balance font-bold text-text">Contact {staff.name}</h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {staff.email && (
              <a href={`mailto:${staff.email}`} className="flex items-center gap-3 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary">
                <Mail className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm text-text">{staff.email}</span>
              </a>
            )}
            {staff.phone && (
              <a href={`tel:${staff.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary">
                <Phone className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm text-text">{staff.phone}</span>
              </a>
            )}
            {staff.office && (
              <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-5">
                <MapPin className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm text-text">{staff.office}</span>
              </div>
            )}
            {!staff.email && !staff.phone && !staff.office && (
              <p className="text-sm text-text-muted sm:col-span-3">
                Reach {staff.name} through the hospital&apos;s main contact channels.
              </p>
            )}
          </Reveal>
          <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact" variant="outline">Contact Hospital</Button>
            <Button href="/contact">Get Directions</Button>
          </Reveal>
        </Container>
      </section>

      {staff.appointmentEnabled && (
        <section id="book" className="scroll-mt-24 py-24 md:py-32">
          <Container>
            <Reveal>
              <h2 className="section-headline text-balance font-bold text-text">Book with {staff.name}</h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-12">
              <AppointmentForm />
            </Reveal>
          </Container>
        </section>
      )}

      {related.length > 0 && (
        <section className="border-t border-border py-24 md:py-32">
          <Container>
            <Reveal>
              <h2 className="section-headline text-balance font-bold text-text">You May Also Be Interested In</h2>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {related.map((s) => (
                <Reveal key={s.slug}>
                  <StaffCard staff={s} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
