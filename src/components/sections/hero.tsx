"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarCheck, Siren, Stethoscope, Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/primitives";
import { unsplash } from "@/lib/unsplash";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-14 pb-24 md:pt-20 md:pb-32">
      <div
        className="pointer-events-none absolute -top-24 right-[-10%] h-[520px] w-[520px] rotate-45 rounded-[80px]"
        style={{ background: "linear-gradient(135deg, var(--color-primary) 0%, transparent 70%)", opacity: 0.08 }}
      />
      <div
        className="pointer-events-none absolute top-40 right-10 hidden md:block h-24 w-24 rotate-45 rounded-2xl border border-primary/20"
      />

      <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-14 px-6 md:px-10 lg:grid-cols-2 lg:gap-10">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <Badge>Trusted Healthcare • 24/7</Badge>
          <h1 className="hero-headline text-balance mt-6 font-extrabold text-text">
            Advanced Healthcare.
            <br />
            <span className="text-primary">Compassionate</span> Care.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-text-muted">
            Delivering trusted medical care through experienced specialists, advanced technology, and patient-centered healthcare — every hour of every day.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href="/appointment" size="lg" icon={<CalendarCheck className="h-4 w-4" />}>
              Book an Appointment
            </Button>
            <Button href="/services" variant="outline" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
              Explore Our Services
            </Button>
          </div>
          <Link href="/doctors" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-text hover:text-primary transition-colors">
            <Stethoscope className="h-4 w-4 text-primary" /> Meet Our Doctors
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] border border-border shadow-[var(--shadow-elevated)]">
            <Image
              src={unsplash("photo-1631217868264-e5b90bb7e133", 900)}
              alt="Doctor providing patient care at the hospital"
              fill
              priority
              className="object-cover"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute -left-6 top-10 hidden sm:flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-[var(--shadow-elevated)]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-primary">
              <Siren className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs text-text-muted">Emergency</p>
              <p className="text-sm font-bold text-text">24/7 Open</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="absolute -right-4 bottom-24 hidden sm:flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-[var(--shadow-elevated)]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-primary">
              <CalendarCheck className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs text-text-muted">Appointments</p>
              <p className="text-sm font-bold text-text">Same-Day Slots</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="absolute -bottom-8 left-8 flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-[var(--shadow-elevated)]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-primary">
              <Clock3 className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs text-text-muted">Doctor Availability</p>
              <p className="text-sm font-bold text-text">100+ On Call</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
