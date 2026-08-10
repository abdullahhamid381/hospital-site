import { Phone, Siren, CalendarCheck } from "lucide-react";
import { SITE } from "@/lib/data/site";
import Link from "next/link";

export function AnnouncementBar() {
  return (
    <div className="hidden md:block bg-black text-white">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-10 py-2 text-xs">
        <div className="flex items-center gap-2 text-white/80">
          <Siren className="h-3.5 w-3.5 text-primary" />
          <span>24/7 Emergency Care</span>
          <span className="text-white/30">•</span>
          <span>Available 24 Hours · 7 Days a Week</span>
        </div>
        <div className="flex items-center gap-5">
          <a href={`tel:${SITE.emergencyPhone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 text-white/80 hover:text-primary transition-colors">
            <Phone className="h-3.5 w-3.5" />
            {SITE.emergencyPhone}
          </a>
          <Link href="/appointment" className="flex items-center gap-1.5 text-white/80 hover:text-primary transition-colors">
            <CalendarCheck className="h-3.5 w-3.5" />
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  );
}
