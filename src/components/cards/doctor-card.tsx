import Link from "next/link";
import Image from "next/image";
import { resolveImageSrc, isUnsplashSrc } from "@/lib/image-src";
import type { Doctor } from "@/lib/data/doctors";
import { Button } from "@/components/ui/button";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  const imageSrc = resolveImageSrc(doctor.image, 560);
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-elevated)]">
      <Link href={`/doctors/${doctor.slug}`} className="relative block h-72 overflow-hidden bg-soft-gray">
        <Image
          src={imageSrc}
          alt={doctor.name}
          fill
          unoptimized={!isUnsplashSrc(imageSrc)}
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex-1">
          <Link href={`/doctors/${doctor.slug}`}>
            <h3 className="font-display text-base font-bold text-text hover:text-primary transition-colors">{doctor.name}</h3>
          </Link>
          <p className="mt-1 text-sm text-primary font-medium">{doctor.specialization}</p>
          <p className="mt-2 text-sm text-text-muted">{doctor.experience}</p>
        </div>
        <div className="mt-5 flex items-center gap-2">
          <Button href={`/doctors/${doctor.slug}`} variant="outline" size="sm" className="flex-1">
            View Profile
          </Button>
          <Button href="/contact" size="sm" className="flex-1">
            Contact
          </Button>
        </div>
      </div>
    </div>
  );
}
