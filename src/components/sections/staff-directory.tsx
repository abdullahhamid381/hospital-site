"use client";

import { useMemo, useState } from "react";
import { Search, X, Users } from "lucide-react";
import { Container } from "@/components/ui/primitives";
import { Reveal, StaggerGroup } from "@/components/ui/reveal";
import { StaffCard } from "@/components/cards/staff-card";
import { STAFF_CATEGORIES, type StaffMember } from "@/lib/data/staff";
import { cn } from "@/lib/utils";

type SortKey = "featured" | "name" | "experience";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Recommended" },
  { key: "name", label: "Name (A–Z)" },
  { key: "experience", label: "Experience" },
];

function experienceYears(value: string): number {
  const match = value.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

export function StaffDirectory({ staff }: { staff: StaffMember[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("featured");

  const filtered = useMemo(() => {
    let list = staff;
    if (category !== "all") list = list.filter((s) => s.category === category);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (s) => s.name.toLowerCase().includes(q) || s.role.toLowerCase().includes(q) || s.department.toLowerCase().includes(q)
      );
    }
    const sorted = [...list];
    if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "experience") sorted.sort((a, b) => experienceYears(b.experience) - experienceYears(a.experience));
    else sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
    return sorted;
  }, [staff, category, query, sort]);

  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, role, or department…"
            className="w-full rounded-full border border-border bg-card py-3.5 pl-11 pr-11 text-sm text-text outline-none focus:border-primary"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategory("all")}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-semibold transition-colors",
                category === "all" ? "border-primary bg-primary text-white" : "border-border text-text hover:border-primary hover:text-primary"
              )}
            >
              All
            </button>
            {STAFF_CATEGORIES.map((c) => (
              <button
                key={c.key}
                onClick={() => setCategory(c.key)}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs font-semibold transition-colors",
                  category === c.key ? "border-primary bg-primary text-white" : "border-border text-text hover:border-primary hover:text-primary"
                )}
              >
                {c.label}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 text-xs font-medium text-text-muted">
            Sort by
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-full border border-border bg-card px-3 py-2 text-xs font-semibold text-text outline-none focus:border-primary"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.key} value={o.key}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <p className="mt-6 text-sm text-text-muted">
          {filtered.length} {filtered.length === 1 ? "result" : "results"}
        </p>

        {filtered.length === 0 ? (
          <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-border py-20 text-center">
            <Users className="h-10 w-10 text-text-muted" />
            <h3 className="mt-4 font-display text-lg font-bold text-text">No Staff Found</h3>
            <p className="mt-2 max-w-sm text-sm text-text-muted">
              We couldn&apos;t find anyone matching your search. Try another category or clear your filters.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setCategory("all");
              }}
              className="mt-6 rounded-full border border-border px-5 py-2 text-sm font-semibold text-text transition-colors hover:border-primary hover:text-primary"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <StaggerGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((s) => (
              <Reveal key={s.slug}>
                <StaffCard staff={s} />
              </Reveal>
            ))}
          </StaggerGroup>
        )}
      </Container>
    </section>
  );
}
