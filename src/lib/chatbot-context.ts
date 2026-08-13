import { SITE } from "@/lib/data/site";
import { DEPARTMENTS } from "@/lib/data/departments";
import { FACILITIES } from "@/lib/data/facilities";
import { PACKAGES } from "@/lib/data/packages";
import { FAQS } from "@/lib/data/misc";
import { getServices } from "@/lib/services";
import { getDoctors } from "@/lib/doctors";
import { getStaffMembers } from "@/lib/staff";

/** Assembles a compact, current snapshot of the hospital's own data for grounding the chatbot's answers. */
export async function buildHospitalContext(): Promise<string> {
  const [services, doctors, staff] = await Promise.all([getServices(), getDoctors(), getStaffMembers()]);

  const visibleServices = services.filter((s) => s.isVisible);
  const visibleDoctors = doctors.filter((d) => d.isVisible);
  const visibleStaff = staff.filter((s) => s.isVisible);

  const lines: string[] = [];

  lines.push("## Hospital Information");
  lines.push(`Name: ${SITE.name} (${SITE.shortName})`);
  lines.push(`Address: ${SITE.address}`);
  lines.push(`Phone: ${SITE.phone}`);
  lines.push(`Emergency Phone: ${SITE.emergencyPhone}`);
  lines.push(`Email: ${SITE.email}`);
  lines.push(`Hours: ${SITE.hours}`);

  lines.push("\n## Doctors");
  for (const d of visibleDoctors) {
    lines.push(
      `- ${d.name} — ${d.specialization} (${d.department}). Available: ${d.availableDays}, ${d.availableTimings}. Qualifications: ${d.qualifications.join(", ")}.`
    );
  }

  lines.push("\n## Departments");
  for (const dept of DEPARTMENTS) {
    lines.push(`- ${dept.name}: ${dept.short} Hours: ${dept.hours}. Services: ${dept.services.join(", ")}.`);
  }

  lines.push("\n## Services");
  for (const s of visibleServices) {
    lines.push(`- ${s.name}: ${s.short}`);
  }

  lines.push("\n## Facilities");
  for (const f of FACILITIES) {
    lines.push(`- ${f.name}: ${f.short}`);
  }

  lines.push("\n## Health Packages");
  for (const p of PACKAGES) {
    lines.push(`- ${p.name} (${p.price}): ${p.short} Includes: ${p.tests.join(", ")}.`);
  }

  if (visibleStaff.length > 0) {
    lines.push("\n## Administration & Staff");
    for (const s of visibleStaff) {
      lines.push(`- ${s.name} — ${s.role}${s.department ? ` (${s.department})` : ""}.`);
    }
  }

  lines.push("\n## Frequently Asked Questions");
  for (const faq of FAQS) {
    lines.push(`Q: ${faq.question}\nA: ${faq.answer}`);
  }

  return lines.join("\n");
}
