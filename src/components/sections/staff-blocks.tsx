import { CheckCircle2, ExternalLink, Award as AwardIcon, GraduationCap } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import type {
  Qualification,
  ExpertiseItem,
  ResponsibilityItem,
  TimelineEntry,
  ScheduleEntry,
  Publication,
  Award as AwardEntry,
  Membership,
} from "@/lib/data/staff";

export function TitleDetailGrid({ items }: { items: (ExpertiseItem | ResponsibilityItem)[] }) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.title} className="rounded-xl border border-border bg-card p-5">
          <p className="text-sm font-bold text-text">{item.title}</p>
          <p className="mt-1.5 text-sm text-text-muted">{item.detail}</p>
        </div>
      ))}
    </div>
  );
}

export function QualificationList({ items }: { items: Qualification[] }) {
  return (
    <div className="mt-6 flex flex-col gap-4">
      {items.map((q, i) => (
        <Reveal key={`${q.degree}-${i}`} delay={i * 0.05} className="flex items-start gap-4">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-primary text-primary">
            <GraduationCap className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-bold text-text">{q.degree}</p>
            <p className="mt-0.5 text-sm text-text-muted">
              {q.institution} {q.year && <>· {q.year}</>}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function ExperienceTimeline({ items }: { items: TimelineEntry[] }) {
  return (
    <div className="mt-6 flex flex-col gap-6">
      {items.map((entry, i) => (
        <Reveal key={`${entry.title}-${i}`} delay={i * 0.06} className="flex gap-4">
          <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">{entry.period}</p>
            <p className="mt-1 text-sm font-bold text-text">{entry.title}</p>
            <p className="text-sm text-text-muted">{entry.place}</p>
            {entry.detail && <p className="mt-1.5 text-sm text-text-muted">{entry.detail}</p>}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function ScheduleTable({ items }: { items: ScheduleEntry[] }) {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-border">
      {items.map((entry, i) => {
        const isToday = entry.day.toLowerCase().includes(today.toLowerCase());
        return (
          <div
            key={`${entry.day}-${i}`}
            className={`flex flex-col gap-1 border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between ${
              i > 0 ? "border-t" : ""
            } ${isToday ? "bg-primary-light" : "bg-card"}`}
          >
            <div>
              <p className="text-sm font-bold text-text">
                {entry.day} {isToday && <span className="ml-2 text-xs font-semibold text-primary">Today</span>}
              </p>
              <p className="text-sm text-text-muted">{entry.location}</p>
            </div>
            <p className="text-sm font-medium text-text">{entry.time}</p>
          </div>
        );
      })}
    </div>
  );
}

export function PublicationList({ items }: { items: Publication[] }) {
  return (
    <div className="mt-6 flex flex-col gap-4">
      {items.map((p, i) => (
        <div key={`${p.title}-${i}`} className="rounded-xl border border-border bg-card p-5">
          <p className="text-sm font-bold text-text">{p.title}</p>
          <p className="mt-1 text-sm text-text-muted">
            {p.journal} {p.year && <>· {p.year}</>}
          </p>
          {p.link && (
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
            >
              View Publication <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

export function AwardList({ items }: { items: AwardEntry[] }) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((a, i) => (
        <div key={`${a.title}-${i}`} className="flex gap-3 rounded-xl border border-border bg-card p-5">
          <AwardIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-bold text-text">{a.title}</p>
            <p className="mt-0.5 text-sm text-text-muted">
              {a.org} {a.year && <>· {a.year}</>}
            </p>
            {a.detail && <p className="mt-1.5 text-sm text-text-muted">{a.detail}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

export function MembershipList({ items }: { items: Membership[] }) {
  return (
    <ul className="mt-6 flex flex-col gap-3">
      {items.map((m, i) => (
        <li key={`${m.title}-${i}`} className="flex items-center gap-3 text-sm text-text">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
          <span className="font-semibold">{m.title}</span>
          <span className="text-text-muted">— {m.org}</span>
        </li>
      ))}
    </ul>
  );
}
