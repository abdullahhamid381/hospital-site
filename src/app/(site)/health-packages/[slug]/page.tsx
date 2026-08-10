import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Container, Badge } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { PACKAGES, getPackageBySlug } from "@/lib/data/packages";
import { PackageCard } from "@/components/cards/misc-cards";

export function generateStaticParams() {
  return PACKAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) return {};
  return { title: pkg.name, description: pkg.short };
}

export default async function PackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  if (!pkg) notFound();

  const related = PACKAGES.filter((p) => p.slug !== pkg.slug).slice(0, 3);

  return (
    <>
      <section className="border-b border-border py-20 md:py-28">
        <Container className="max-w-2xl">
          <Reveal>
            <Badge>Health Package</Badge>
            <h1 className="section-headline text-balance mt-5 font-bold text-text">{pkg.name}</h1>
            <p className="mt-4 text-base leading-relaxed text-text-muted">{pkg.short}</p>
            <p className="mt-6 font-display text-4xl font-extrabold text-primary">{pkg.price}</p>

            <h2 className="mt-10 font-display text-xl font-bold text-text">Included Tests</h2>
            <ul className="mt-5 space-y-3">
              {pkg.tests.map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm text-text">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" /> {t}
                </li>
              ))}
            </ul>

            <Button href="/appointment" size="lg" className="mt-8">Book This Package</Button>
          </Reveal>
        </Container>
      </section>

      <section className="bg-bg-secondary py-24 md:py-32">
        <Container>
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-text">Other Packages</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {related.map((p) => (
              <Reveal key={p.slug}>
                <PackageCard pkg={p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
