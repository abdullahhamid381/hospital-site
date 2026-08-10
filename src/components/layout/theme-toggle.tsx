"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      className={
        "relative flex h-10 w-10 items-center justify-center rounded-full border border-border text-text transition-colors hover:border-primary hover:text-primary " +
        (className ?? "")
      }
    >
      <Sun className="h-[18px] w-[18px] scale-100 dark:scale-0 transition-transform duration-300" />
      <Moon className="absolute h-[18px] w-[18px] scale-0 dark:scale-100 transition-transform duration-300" />
      <span className="sr-only">{theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}</span>
    </button>
  );
}
