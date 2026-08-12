import { Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal, StaggerGroup } from "@/components/ui/reveal";
import { DoctorCard } from "@/components/cards/doctor-card";
import { Button } from "@/components/ui/button";
import { getDoctors } from "@/lib/doctors";
import { ArrowRight } from "lucide-react";

export async function DoctorsSection({ limit = 4 }: { limit?: number }) {
  const doctors = (await getDoctors()).filter((d) => d.isVisible);

  return (
    <section className="py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Our Doctors"
            title="Meet Our Complete Medical Team"
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.slice(0, limit).map((d) => (
            <Reveal key={d.slug}>
              <DoctorCard doctor={d} />
            </Reveal>
          ))}
        </StaggerGroup>

        <div className="mt-14 flex justify-center">
          <Button href="/doctors" variant="outline" icon={<ArrowRight className="h-4 w-4" />}>
            View All Doctors
          </Button>
        </div>
      </Container>
    </section>
  );
}
