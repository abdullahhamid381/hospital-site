import type { Doctor } from "@/lib/data/doctors";
import type { Department } from "@/lib/data/departments";

function normalizedDeptName(dept: Department): string {
  return dept.name.replace(" Department", "").trim().toLowerCase();
}

/** Doctors whose `department` field exactly matches this department (case-insensitive). */
export function matchDepartmentDoctors(dept: Department, doctors: Doctor[]): Doctor[] {
  const name = normalizedDeptName(dept);
  return doctors.filter((d) => d.department.trim().toLowerCase() === name);
}

/** Same department, with `specialists` overridden by the real doctor count when any are on file. */
export function withLiveSpecialistCount(dept: Department, doctors: Doctor[]): Department {
  const matched = matchDepartmentDoctors(dept, doctors);
  return matched.length > 0 ? { ...dept, specialists: matched.length } : dept;
}
