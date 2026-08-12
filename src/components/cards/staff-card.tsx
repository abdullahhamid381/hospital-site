import Link from "next/link";
import Image from "next/image";
import { resolveImageSrc, isUnsplashSrc } from "@/lib/image-src";
import { staffCategoryLabel, type StaffMember } from "@/lib/data/staff";
import { Button } from "@/components/ui/button";

export function StaffCard({ staff }: { staff: StaffMember }) {
  const imageSrc = resolveImageSrc(staff.image, 560);
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-elevated)]">
      <Link href={`/staff/${staff.slug}`} className="relative block h-72 overflow-hidden bg-soft-gray">
        <Image
          src={imageSrc}
          alt={staff.name}
          fill
          unoptimized={!isUnsplashSrc(imageSrc)}
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
          {staffCategoryLabel(staff.category)}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex-1">
          <Link href={`/staff/${staff.slug}`}>
            <h3 className="font-display text-base font-bold text-text transition-colors hover:text-primary">{staff.name}</h3>
          </Link>
          <p className="mt-1 text-sm font-medium text-primary">{staff.role}</p>
          {(staff.department || staff.experience) && (
            <p className="mt-2 text-sm text-text-muted">
              {staff.department}
              {staff.department && staff.experience && " · "}
              {staff.experience}
            </p>
          )}
        </div>
        <div className="mt-5 flex items-center gap-2">
          <Button href={`/staff/${staff.slug}`} variant="outline" size="sm" className="flex-1">
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
