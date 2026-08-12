import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/primitives";
import { Reveal, StaggerGroup } from "@/components/ui/reveal";
import { DepartmentCard } from "@/components/cards/department-card";
import { FinalCTA } from "@/components/sections/final-cta";
import { DEPARTMENTS } from "@/lib/data/departments";
import { getDoctors } from "@/lib/doctors";
import { withLiveSpecialistCount } from "@/lib/departments";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Departments",
  description: "Browse specialized medical departments, each staffed by experienced consultants and modern equipment.",
};

export default async function DepartmentsPage() {
  const doctors = (await getDoctors()).filter((d) => d.isVisible);
  const departments = DEPARTMENTS.map((d) => withLiveSpecialistCount(d, doctors));

  return (
    <>
      <PageHero
        eyebrow="Departments"
        title="Specialized Care, Department by Department"
        description="Every department is staffed by experienced consultants and equipped with modern diagnostic and treatment technology."
      />
      <section className="py-24 md:py-32">
        <Container>
          <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((d) => (
              <Reveal key={d.slug}>
                <DepartmentCard dept={d} />
              </Reveal>
            ))}
          </StaggerGroup>
        </Container>
      </section>
      <FinalCTA />
    </>
  );
}
