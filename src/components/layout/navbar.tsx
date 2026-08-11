"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/data/site";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";
  const solid = scrolled || !isHome;

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          solid
            ? "border-b border-border bg-bg/85 backdrop-blur-lg shadow-[var(--shadow-soft)]"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-6 md:px-10 py-4">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image src="/images/logo.png" alt={SITE.name} width={36} height={36} className="h-9 w-9 object-contain" priority />
            <span className="font-display text-[15px] font-bold leading-tight text-text hidden sm:block">
              {SITE.shortName}
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-3.5 py-2 text-[13.5px] font-medium transition-colors",
                    active ? "text-primary" : "text-text hover:text-primary"
                  )}
                >
                  {link.label}
                  {active && <span className="absolute left-3.5 right-3.5 -bottom-0.5 h-[2px] rounded-full bg-primary" />}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle className="hidden md:flex" />
            <Button href="/contact" size="sm" className="hidden md:inline-flex">
              Contact Us
            </Button>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="flex lg:hidden h-10 w-10 items-center justify-center rounded-full border border-border text-text"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
