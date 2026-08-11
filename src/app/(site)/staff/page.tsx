import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/primitives";
import { StatCard } from "@/components/cards/misc-cards";
import { StaffDirectory } from "@/components/sections/staff-directory";
import { FinalCTA } from "@/components/sections/final-cta";
import { getStaffMembers } from "@/lib/staff";
import { SITE } from "@/lib/data/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Faculty",
  description: `Meet the leadership, nursing, academic faculty, and support staff behind ${SITE.name}.`,
};

export default async function StaffPage() {
  const staff = (await getStaffMembers()).filter((s) => s.isVisible);

  const departmentCount = new Set(staff.map((s) => s.department).filter(Boolean)).size;
  const categoryCount = new Set(staff.map((s) => s.category)).size;

  const stats = [
    { value: staff.length, suffix: "+", label: "Faculty & Staff" },
    { value: departmentCount, suffix: "", label: "Departments Represented" },
    { value: categoryCount, suffix: "", label: "Staff Categories" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Our Faculty"
        title="Our Faculty"
        description="Leadership, nursing and clinical support, academic faculty, and the wider team dedicated to running the hospital every day."
      />

      <section className="border-b border-border bg-bg-secondary py-14">
        <Container>
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-3">
            {stats.map((s, i) => (
              <StatCard key={s.label} value={s.value} suffix={s.suffix} label={s.label} delay={i * 0.1} />
            ))}
          </div>
        </Container>
      </section>

      <StaffDirectory staff={staff} />
      <FinalCTA />
    </>
  );
}
