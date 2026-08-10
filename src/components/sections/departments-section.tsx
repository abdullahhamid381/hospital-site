import { Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { DepartmentCard } from "@/components/cards/department-card";
import { Button } from "@/components/ui/button";
import { DEPARTMENTS } from "@/lib/data/departments";
import { ArrowRight } from "lucide-react";

export function DepartmentsSection({ limit = 6 }: { limit?: number }) {
  return (
    <section className="bg-bg-secondary py-24 md:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <SectionHeading eyebrow="Departments" title="Specialized Care, Department by Department" />
          </Reveal>
          <Reveal delay={0.1}>
            <Button href="/departments" variant="outline" icon={<ArrowRight className="h-4 w-4" />}>
              All Departments
            </Button>
          </Reveal>
        </div>
      </Container>

      <div className="mt-14 flex gap-5 overflow-x-auto px-6 pb-4 md:hidden [&::-webkit-scrollbar]:hidden">
        {DEPARTMENTS.slice(0, limit).map((d) => (
          <DepartmentCard key={d.slug} dept={d} />
        ))}
      </div>

      <Container className="mt-14 hidden md:block">
        <div className="grid grid-cols-3 gap-6">
          {DEPARTMENTS.slice(0, limit).map((d) => (
            <Reveal key={d.slug}>
              <DepartmentCard dept={d} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
