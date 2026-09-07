"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container, Badge } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  IMPACT_CATEGORIES,
  IMPACT_FALLBACK,
  IMPACT_PERIODS,
  type ImpactCategoryKey,
  type ImpactPeriod,
} from "@/lib/data/impact";

const SIZE = 240;
const CENTER = SIZE / 2;
const RADIUS = 92;
const STROKE = 30;
const GAP_FRACTION = 0.01;

const HIGHLIGHTS = [
  { value: "20+", label: "Years of Excellence" },
  { value: "100+", label: "Medical Professionals" },
];

function toISODate(d: Date) {
  return d.toISOString().slice(0, 10);
}

function todayISO() {
  return toISODate(new Date());
}

function isoMonthsAgo(months: number) {
  const d = new Date();
  d.setMonth(d.getMonth() - months);
  return toISODate(d);
}

function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const duration = 900;
    const start = performance.now();
    let raf: number;
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active]);
  return value;
}

export function ImpactSection() {
  const [period, setPeriod] = useState<ImpactPeriod>("yearly");
  const [customFrom, setCustomFrom] = useState(() => isoMonthsAgo(1));
  const [customTo, setCustomTo] = useState(() => todayISO());
  const [hovered, setHovered] = useState<string | null>(null);
  const [totals, setTotals] = useState<Record<ImpactCategoryKey, number>>(IMPACT_FALLBACK);
  const [loading, startTransition] = useTransition();

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const range = useMemo(() => {
    if (period === "yearly") return { from: isoMonthsAgo(12), to: todayISO() };
    if (period === "5year") return { from: isoMonthsAgo(60), to: todayISO() };
    return { from: customFrom, to: customTo };
  }, [period, customFrom, customTo]);

  useEffect(() => {
    if (range.from > range.to) return;
    let ignore = false;
    startTransition(async () => {
      try {
        const res = await fetch(`/api/impact?from=${range.from}&to=${range.to}`);
        const data = await res.json();
        if (!ignore && data?.totals) setTotals(data.totals);
      } catch (err) {
        if (!ignore) console.error(err);
      }
    });
    return () => {
      ignore = true;
    };
  }, [range.from, range.to]);

  const total = useMemo(
    () => IMPACT_CATEGORIES.reduce((sum, c) => sum + (totals[c.key] ?? 0), 0),
    [totals]
  );
  const displayTotal = useCountUp(total, inView);

  const segments = useMemo(() => {
    const withFractions = IMPACT_CATEGORIES.map((c) => {
      const value = totals[c.key] ?? 0;
      const fraction = total > 0 ? value / total : 0;
      return { ...c, value, fraction, pct: total > 0 ? (fraction * 100).toFixed(1) : "0.0" };
    });
    return withFractions.map((s, i) => ({
      ...s,
      offset: withFractions.slice(0, i).reduce((sum, x) => sum + x.fraction, 0),
    }));
  }, [totals, total]);

  return (
    <section className="bg-bg-secondary py-24 md:py-32">
      <Container>
        <div ref={ref} className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Badge>Our Impact</Badge>
            <h2 className="section-headline text-balance mt-5 font-bold text-text">
              Real Care, Measured in Outcomes
            </h2>
            <p className="mt-5 text-base leading-relaxed text-text-muted">
              Every consultation, test, and procedure reflects our commitment to accessible, quality healthcare.
              Here&apos;s how our services break down, and how that adds up over time.
            </p>

            <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-border border-l-4 border-l-primary bg-card p-6 sm:flex-row sm:items-center sm:gap-10">
              {HIGHLIGHTS.map((h) => (
                <div key={h.label}>
                  <p className="font-display text-4xl font-extrabold text-text">{h.value}</p>
                  <p className="mt-1.5 text-sm text-text-muted">{h.label}</p>
                </div>
              ))}
            </div>

            <Button href="/services" variant="dark" className="mt-9" icon={<ArrowRight className="h-4 w-4" />}>
              Explore Our Services
            </Button>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[28px] border border-border bg-card p-7 shadow-(--shadow-soft) md:p-9">
              <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Report period">
                {IMPACT_PERIODS.map((p) => (
                  <button
                    key={p.key}
                    role="tab"
                    aria-selected={period === p.key}
                    onClick={() => setPeriod(p.key)}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] transition-colors duration-200",
                      period === p.key
                        ? "border-primary bg-primary text-white"
                        : "border-border text-text-muted hover:border-primary/40 hover:text-text"
                    )}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {period === "custom" && (
                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                  <label className="flex items-center gap-2 text-text-muted">
                    From
                    <input
                      type="date"
                      value={customFrom}
                      max={customTo}
                      onChange={(e) => setCustomFrom(e.target.value)}
                      className="rounded-lg border border-border bg-bg px-2.5 py-1.5 text-text outline-none focus:border-primary"
                    />
                  </label>
                  <label className="flex items-center gap-2 text-text-muted">
                    To
                    <input
                      type="date"
                      value={customTo}
                      min={customFrom}
                      max={todayISO()}
                      onChange={(e) => setCustomTo(e.target.value)}
                      className="rounded-lg border border-border bg-bg px-2.5 py-1.5 text-text outline-none focus:border-primary"
                    />
                  </label>
                </div>
              )}

              <div
                className={cn(
                  "mt-8 flex flex-col items-center gap-8 sm:flex-row sm:items-center sm:justify-center md:gap-10 transition-opacity duration-300",
                  loading && "opacity-60"
                )}
              >
                <div className="relative shrink-0" style={{ width: SIZE, height: SIZE }}>
                  <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
                    <circle
                      cx={CENTER}
                      cy={CENTER}
                      r={RADIUS}
                      fill="none"
                      stroke="var(--color-border)"
                      strokeWidth={STROKE}
                    />
                    <g transform={`rotate(-90 ${CENTER} ${CENTER})`}>
                      {segments.map((s) => (
                        <motion.circle
                          key={s.key}
                          cx={CENTER}
                          cy={CENTER}
                          r={RADIUS}
                          fill="none"
                          stroke={s.color}
                          strokeLinecap="round"
                          initial={false}
                          animate={{
                            pathOffset: s.offset,
                            pathLength: Math.max(s.fraction - GAP_FRACTION, 0.003),
                            strokeWidth: hovered === null || hovered === s.key ? STROKE : STROKE - 8,
                            opacity: hovered === null || hovered === s.key ? 1 : 0.4,
                          }}
                          transition={{
                            pathOffset: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                            pathLength: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                            strokeWidth: { duration: 0.2, ease: "easeOut" },
                            opacity: { duration: 0.2, ease: "easeOut" },
                          }}
                          onMouseEnter={() => setHovered(s.key)}
                          onMouseLeave={() => setHovered(null)}
                          onFocus={() => setHovered(s.key)}
                          onBlur={() => setHovered(null)}
                          tabIndex={0}
                          role="img"
                          aria-label={`${s.label}: ${s.value.toLocaleString()} (${s.pct}%)`}
                          className="cursor-pointer outline-none"
                        />
                      ))}
                    </g>
                  </svg>
                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="font-display text-3xl font-extrabold text-text">
                      {displayTotal.toLocaleString()}
                    </span>
                    <span className="mt-1 text-xs text-text-muted">Total Patients</span>
                  </div>
                </div>

                <ul className="flex w-full flex-col gap-1 sm:w-auto">
                  {segments.map((s) => (
                    <li
                      key={s.key}
                      onMouseEnter={() => setHovered(s.key)}
                      onMouseLeave={() => setHovered(null)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-2.5 py-2 transition-colors duration-200",
                        hovered === s.key && "bg-bg-secondary"
                      )}
                    >
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: s.color }}
                      />
                      <span className="flex-1 text-sm text-text">{s.label}</span>
                      <span className="text-sm font-semibold text-text">{s.value.toLocaleString()}</span>
                      <span className="w-12 shrink-0 text-right text-xs text-text-muted">{s.pct}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
