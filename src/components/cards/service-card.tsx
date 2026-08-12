import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Icon } from "@/lib/icon-map";
import type { Service } from "@/lib/data/services";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[var(--shadow-elevated)]"
    >
      <div className="absolute inset-x-0 top-0 h-[3px] scale-x-0 rounded-t-2xl bg-primary transition-transform duration-300 group-hover:scale-x-100" />
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
        <Icon name={service.icon} className="h-6 w-6" />
      </div>
      <h3 className="mt-5 font-display text-lg font-bold text-text">{service.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">{service.short}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
        Learn More
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}
