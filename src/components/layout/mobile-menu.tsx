"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Phone, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/data/site";
import { Button } from "@/components/ui/button";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] bg-bg md:hidden"
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-border">
            <span className="font-display font-bold text-text">{SITE.shortName}</span>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-col px-6 py-8">
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06 * i, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={link.href}
                  className="block border-b border-border py-4 text-2xl font-display font-semibold text-text hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="px-6 flex flex-col gap-4 mt-auto absolute bottom-8 left-0 right-0">
            <a href={`tel:${SITE.emergencyPhone.replace(/\s/g, "")}`} className="flex items-center justify-center gap-2 text-sm text-text-muted">
              <Phone className="h-4 w-4 text-primary" /> {SITE.emergencyPhone}
            </a>
            <Button href="/appointment" className="w-full">
              Book an Appointment
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
