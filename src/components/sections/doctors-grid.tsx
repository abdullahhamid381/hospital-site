"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal, StaggerGroup } from "@/components/ui/reveal";
import { DoctorCard } from "@/components/cards/doctor-card";
import { cn } from "@/lib/utils";
import type { Doctor } from "@/lib/data/doctors";

const PER_PAGE = 8;

export function DoctorsGrid({ doctors }: { doctors: Doctor[] }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(doctors.length / PER_PAGE));
  const current = doctors.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function goTo(target: number) {
    const next = Math.min(Math.max(target, 1), totalPages);
    if (next === page) return;
    setPage(next);
    document.getElementById("doctors-grid-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div>
      <div id="doctors-grid-top" className="scroll-mt-28" />
      <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {current.map((d) => (
          <Reveal key={d.slug}>
            <DoctorCard doctor={d} />
          </Reveal>
        ))}
      </StaggerGroup>

      {totalPages > 1 && (
        <nav aria-label="Doctors pagination" className="mt-14 flex items-center justify-center gap-2">
          <button
            onClick={() => goTo(page - 1)}
            disabled={page === 1}
            aria-label="Previous page"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text transition-colors hover:border-primary hover:text-primary disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i + 1)}
              aria-current={page === i + 1 ? "page" : undefined}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition-colors",
                page === i + 1
                  ? "border-primary bg-primary text-white"
                  : "border-border text-text hover:border-primary hover:text-primary"
              )}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => goTo(page + 1)}
            disabled={page === totalPages}
            aria-label="Next page"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text transition-colors hover:border-primary hover:text-primary disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </nav>
      )}
    </div>
  );
}
