"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { DOCTORS } from "@/lib/data/doctors";
import { DEPARTMENTS } from "@/lib/data/departments";
import { BLOG_POSTS } from "@/lib/data/blog";
import { FACILITIES } from "@/lib/data/facilities";

type Result = { label: string; category: string; href: string };

function buildStaticIndex(): Result[] {
  return [
    ...DOCTORS.map((d) => ({ label: d.name, category: "Doctors", href: `/doctors/${d.slug}` })),
    ...DEPARTMENTS.map((d) => ({ label: d.name, category: "Departments", href: `/departments/${d.slug}` })),
    ...BLOG_POSTS.map((b) => ({ label: b.title, category: "Blog", href: `/blog/${b.slug}` })),
    ...FACILITIES.map((f) => ({ label: f.name, category: "Facilities", href: `/facilities/${f.slug}` })),
  ];
}

export function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [services, setServices] = useState<Result[]>([]);
  const [staff, setStaff] = useState<Result[]>([]);
  const staticIndex = useMemo(() => buildStaticIndex(), []);
  const index = useMemo(() => [...staticIndex, ...services, ...staff], [staticIndex, services, staff]);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        const list = (data.services ?? []) as { slug: string; name: string }[];
        setServices(list.map((s) => ({ label: s.name, category: "Services", href: `/services/${s.slug}` })));
      })
      .catch(() => {});

    fetch("/api/staff")
      .then((res) => res.json())
      .then((data) => {
        const list = (data.staff ?? []) as { slug: string; name: string }[];
        setStaff(list.map((s) => ({ label: s.name, category: "Faculty", href: `/staff/${s.slug}` })));
      })
      .catch(() => {});
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return index.filter((r) => r.label.toLowerCase().includes(q)).slice(0, 8);
  }, [query, index]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-start justify-center bg-black/60 backdrop-blur-sm px-4 pt-24"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl rounded-2xl border border-border bg-card shadow-[var(--shadow-elevated)] overflow-hidden"
          >
            <div className="flex items-center gap-3 border-b border-border px-5 py-4">
              <Search className="h-5 w-5 text-text-muted shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search doctors, services, departments…"
                className="w-full bg-transparent text-text placeholder:text-text-muted outline-none text-sm"
              />
              <button onClick={onClose} aria-label="Close search" className="text-text-muted hover:text-primary">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {query.trim() && results.length === 0 && (
                <p className="px-4 py-8 text-center text-sm text-text-muted">No results for &ldquo;{query}&rdquo;.</p>
              )}
              {results.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  onClick={onClose}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-sm text-text hover:bg-soft-gray transition-colors"
                >
                  <span>{r.label}</span>
                  <span className="text-xs uppercase tracking-wide text-text-muted">{r.category}</span>
                </Link>
              ))}
              {!query.trim() && (
                <p className="px-4 py-8 text-center text-sm text-text-muted">Try &ldquo;Cardiology&rdquo; or &ldquo;Dr.&rdquo;</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
