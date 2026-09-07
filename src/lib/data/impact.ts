export type ImpactPeriod = "today" | "month" | "custom";

export const IMPACT_PERIODS: { key: ImpactPeriod; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "month", label: "Last Month" },
  { key: "custom", label: "Custom Range" },
];

export const IMPACT_CATEGORIES = [
  { key: "opd", label: "Outpatient Consultations", color: "var(--color-chart-1)" },
  { key: "diagnostics", label: "Diagnostics & Lab", color: "var(--color-chart-2)" },
  { key: "emergency", label: "Emergency Care", color: "var(--color-chart-3)" },
  { key: "ipd", label: "Inpatient Care", color: "var(--color-chart-4)" },
  { key: "surgical", label: "Surgical Procedures", color: "var(--color-chart-5)" },
] as const;

export type ImpactCategoryKey = (typeof IMPACT_CATEGORIES)[number]["key"];

// Shown while the first live request is in flight, or if it fails.
export const IMPACT_FALLBACK: Record<ImpactCategoryKey, number> = {
  opd: 28000,
  diagnostics: 12500,
  emergency: 7200,
  ipd: 4800,
  surgical: 1500,
};
