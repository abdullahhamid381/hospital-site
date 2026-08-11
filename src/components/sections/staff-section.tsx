import { Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal, StaggerGroup } from "@/components/ui/reveal";
import { StaffCard } from "@/components/cards/staff-card";
import { Button } from "@/components/ui/button";
import { getStaffMembers } from "@/lib/staff";
import { ArrowRight } from "lucide-react";

export async function StaffSection({ limit = 4 }: { limit?: number }) {
  const staff = (await getStaffMembers())
    .filter((s) => s.isVisible)
    .sort((a, b) => Number(b.featured) - Number(a.featured));

  if (staff.length === 0) return null;

  return (
    <section className="py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Our Team" title="Meet Our Staff & Faculty" align="center" className="mx-auto" />
        </Reveal>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {staff.slice(0, limit).map((s) => (
            <Reveal key={s.slug}>
              <StaffCard staff={s} />
            </Reveal>
          ))}
        </StaggerGroup>

        <div className="mt-14 flex justify-center">
          <Button href="/staff" variant="outline" icon={<ArrowRight className="h-4 w-4" />}>
            View All Staff & Faculty
          </Button>
        </div>
      </Container>
    </section>
  );
}
