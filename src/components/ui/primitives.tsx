import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1320px] px-6 md:px-10", className)}>{children}</div>;
}

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-light px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary",
        className
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && <Badge className={cn(light && "border-white/20 bg-white/10 text-white")}>{eyebrow}</Badge>}
      <h2 className={cn("section-headline text-balance mt-5 font-bold", light ? "text-white" : "text-text")}>
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-base leading-relaxed", light ? "text-white/70" : "text-text-muted")}>
          {description}
        </p>
      )}
    </div>
  );
}

export function Divider({ className }: { className?: string }) {
  return <div className={cn("h-px w-full bg-border", className)} />;
}
