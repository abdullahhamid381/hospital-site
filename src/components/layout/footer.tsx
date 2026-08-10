import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SITE, FOOTER_QUICK_LINKS, FOOTER_PATIENT_LINKS, LEGAL_LINKS } from "@/lib/data/site";
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from "@/components/icons/social-icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-[1320px] px-6 md:px-10 pt-20 pb-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/images/logo.png" alt={SITE.name} width={38} height={38} className="h-9 w-9 object-contain" />
              <span className="font-display text-base font-bold">{SITE.shortName}</span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-white/60 max-w-xs">
              Delivering trusted medical care through experienced specialists, advanced technology, and patient-centered healthcare.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[
                { icon: FacebookIcon, href: SITE.social.facebook },
                { icon: InstagramIcon, href: SITE.social.instagram },
                { icon: LinkedinIcon, href: SITE.social.linkedin },
                { icon: YoutubeIcon, href: SITE.social.youtube },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 hover:border-primary hover:text-primary transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">Quick Links</h4>
            <ul className="mt-5 space-y-3">
              {FOOTER_QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/70 hover:text-primary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">Patient Services</h4>
            <ul className="mt-5 space-y-3">
              {FOOTER_PATIENT_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/70 hover:text-primary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">Contact</h4>
            <ul className="mt-5 space-y-4 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                {SITE.address}
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                {SITE.phone}
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                {SITE.email}
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                {SITE.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse items-center gap-4 border-t border-white/10 pt-8 md:flex-row md:justify-between">
          <p className="text-xs text-white/50">
            © {year} {SITE.name}. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="text-xs text-white/50 hover:text-primary transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center border-t border-white/10 pt-6">
          <p className="text-xs text-white/40">
            System Powered By{" "}
            <a
              href="http://krexen.com/"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-white/60 hover:text-primary transition-colors"
            >
              Krexen Technologies
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
