"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { ArrowRight, Star, Quote, Briefcase, MapPin } from "lucide-react";
import { unsplash } from "@/lib/unsplash";
import type { Facility } from "@/lib/data/facilities";
import type { BlogPost } from "@/lib/data/blog";
import type { Testimonial } from "@/lib/data/misc";
import type { HealthPackage } from "@/lib/data/packages";
import type { CareerListing } from "@/lib/data/misc";
import { Button } from "@/components/ui/button";

export function FacilityCard({ facility }: { facility: Facility }) {
  return (
    <Link
      href={`/facilities/${facility.slug}`}
      className="group relative flex h-72 shrink-0 w-[280px] flex-col justify-end overflow-hidden rounded-2xl md:w-auto"
    >
      <Image
        src={unsplash(facility.image, 640)}
        alt={facility.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      <div className="relative z-10 p-5">
        <h3 className="font-display text-base font-bold text-white">{facility.name}</h3>
        <p className="mt-1 text-xs text-white/70 line-clamp-2">{facility.short}</p>
      </div>
    </Link>
  );
}

export function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-elevated)] ${
        featured ? "md:flex-row" : ""
      }`}
    >
      <div className={`relative overflow-hidden ${featured ? "h-64 md:h-auto md:w-1/2" : "h-52"}`}>
        <Image
          src={unsplash(post.image, 800)}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-xs text-text-muted">
          <span className="rounded-full bg-primary-light px-3 py-1 font-semibold text-primary">{post.category}</span>
          <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
        </div>
        <h3 className={`mt-3 font-display font-bold text-text group-hover:text-primary transition-colors ${featured ? "text-2xl" : "text-lg"}`}>
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">{post.excerpt}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          Read More <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-8">
      <Quote className="h-8 w-8 text-primary/25" />
      <p className="mt-4 flex-1 text-[15px] leading-relaxed text-text">{testimonial.review}</p>
      <div className="mt-6 flex items-center gap-3">
        <div className="relative h-11 w-11 overflow-hidden rounded-full">
          <Image src={unsplash(testimonial.image, 120)} alt={testimonial.name} fill className="object-cover" />
        </div>
        <div>
          <p className="text-sm font-semibold text-text">{testimonial.name}</p>
          <p className="text-xs text-text-muted">{testimonial.service}</p>
        </div>
        <div className="ml-auto flex gap-0.5">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function PackageCard({ pkg }: { pkg: HealthPackage }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[var(--shadow-elevated)]">
      <h3 className="font-display text-lg font-bold text-text">{pkg.name}</h3>
      <p className="mt-1 text-sm text-text-muted">{pkg.short}</p>
      <p className="mt-4 font-display text-2xl font-extrabold text-primary">{pkg.price}</p>
      <ul className="mt-5 flex-1 space-y-2.5">
        {pkg.tests.map((t) => (
          <li key={t} className="flex items-start gap-2 text-sm text-text-muted">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            {t}
          </li>
        ))}
      </ul>
      <Button href={`/health-packages/${pkg.slug}`} variant="outline" className="mt-6 w-full">
        View Package
      </Button>
    </div>
  );
}

export function StatCard({ value, suffix, label, delay = 0 }: { value: number; suffix: string; label: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now() + delay * 1000;
    let raf: number;
    function tick(now: number) {
      const progress = Math.min(Math.max((now - start) / duration, 0), 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, delay]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <p className="font-display text-4xl md:text-5xl font-extrabold text-text">
        {count}
        <span className="text-primary">{suffix}</span>
      </p>
      <p className="mt-2 text-sm text-text-muted">{label}</p>
    </div>
  );
}

export function JobCard({ job }: { job: CareerListing }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="font-display text-base font-bold text-text">{job.title}</h3>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-muted">
          <span className="flex items-center gap-1.5">
            <Briefcase className="h-3.5 w-3.5 text-primary" /> {job.department}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-primary" /> {job.location}
          </span>
          <span className="rounded-full bg-primary-light px-2.5 py-0.5 font-semibold text-primary">{job.type}</span>
        </div>
      </div>
      <div className="flex gap-2">
        <Button href="/careers" variant="outline" size="sm">
          View Position
        </Button>
        <Button href="/contact" size="sm">
          Apply Now
        </Button>
      </div>
    </div>
  );
}
