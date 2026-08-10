import Link from "next/link";
import Image from "next/image";
import { unsplash } from "@/lib/unsplash";
import type { Doctor } from "@/lib/data/doctors";
import { Button } from "@/components/ui/button";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-elevated)]">
      <Link href={`/doctors/${doctor.slug}`} className="relative block h-72 overflow-hidden bg-soft-gray">
        <Image
          src={unsplash(doctor.image, 560)}
          alt={doctor.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <Link href={`/doctors/${doctor.slug}`}>
          <h3 className="font-display text-base font-bold text-text hover:text-primary transition-colors">{doctor.name}</h3>
        </Link>
        <p className="mt-1 text-sm text-primary font-medium">{doctor.specialization}</p>
        <p className="mt-2 text-sm text-text-muted">{doctor.experience}</p>
        <div className="mt-5 flex items-center gap-2">
          <Button href={`/doctors/${doctor.slug}`} variant="outline" size="sm" className="flex-1">
            View Profile
          </Button>
          <Button href="/appointment" size="sm" className="flex-1">
            Book
          </Button>
        </div>
      </div>
    </div>
  );
}
