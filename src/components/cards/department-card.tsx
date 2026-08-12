import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users } from "lucide-react";
import { unsplash } from "@/lib/unsplash";
import type { Department } from "@/lib/data/departments";

export function DepartmentCard({ dept }: { dept: Department }) {
  return (
    <Link
      href={`/departments/${dept.slug}`}
      className="group flex h-full w-[280px] shrink-0 flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-elevated)] md:w-auto"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={unsplash(dept.image, 640)}
          alt={dept.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
        <span className="absolute bottom-3 left-4 flex items-center gap-1.5 text-xs font-medium text-white/90">
          <Users className="h-3.5 w-3.5" /> {dept.specialists} Specialists
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-base font-bold text-text">{dept.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">{dept.short}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          View Department <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
