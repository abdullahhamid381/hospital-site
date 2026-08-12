import Link from "next/link";
import Image from "next/image";
import { Stethoscope, Building2, Clock3, Eye } from "lucide-react";
import { resolveImageSrc, isUnsplashSrc } from "@/lib/image-src";
import type { Doctor } from "@/lib/data/doctors";
import { Button } from "@/components/ui/button";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  const imageSrc = resolveImageSrc(doctor.image, 560);
  const hasDistinctExperience = /\d/.test(doctor.experience) && doctor.experience !== doctor.specialization;

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-elevated)]">
      <div className="absolute inset-x-0 top-0 z-10 h-[3px] scale-x-0 rounded-t-2xl bg-primary transition-transform duration-300 group-hover:scale-x-100" />
      <Link href={`/doctors/${doctor.slug}`} className="relative block h-72 overflow-hidden bg-soft-gray">
        <Image
          src={imageSrc}
          alt={doctor.name}
          fill
          unoptimized={!isUnsplashSrc(imageSrc)}
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
          <Building2 className="h-3 w-3" />
          {doctor.department}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex-1">
          <Link href={`/doctors/${doctor.slug}`}>
            <h3 className="font-display text-base font-bold text-text transition-colors hover:text-primary">{doctor.name}</h3>
          </Link>

          <p className="mt-2 flex items-start gap-1.5 text-sm font-medium text-primary">
            <Stethoscope className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>{doctor.specialization}</span>
          </p>

          {hasDistinctExperience && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-text-muted">
              <Clock3 className="h-3.5 w-3.5 shrink-0 text-primary/70" />
              {doctor.experience}
            </p>
          )}
        </div>

        <div className="mt-5 border-t border-border pt-5">
          <Button href={`/doctors/${doctor.slug}`} size="sm" className="w-full" icon={<Eye className="h-3.5 w-3.5" />}>
            View Profile
          </Button>
        </div>
      </div>
    </div>
  );
}
