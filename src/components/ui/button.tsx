import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "dark" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
};

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-deep shadow-[var(--glow-primary)]",
  dark: "bg-black text-white hover:bg-dark-gray dark:bg-white dark:text-black dark:hover:bg-white/90",
  outline:
    "border border-border text-text hover:border-primary hover:text-primary bg-transparent",
  ghost: "text-text hover:text-primary bg-transparent",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3.5 text-sm",
  lg: "px-8 py-4 text-base",
};

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] min-h-11";

export function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  icon,
  href,
  ...rest
}: BaseProps & { href?: string } & ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = cn(base, variantClasses[variant], sizeClasses[size], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
        {icon}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
      {icon}
    </button>
  );
}
