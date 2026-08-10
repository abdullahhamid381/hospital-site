"use client";

import { useState, type FormEvent } from "react";
import { CalendarCheck, Clock3, ShieldCheck, Siren, CheckCircle2 } from "lucide-react";
import { DEPARTMENTS } from "@/lib/data/departments";
import { DOCTORS } from "@/lib/data/doctors";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FieldErrors = Partial<Record<"name" | "phone" | "email" | "department" | "date", string>>;

const inputClass =
  "w-full rounded-xl border bg-card px-4 py-3 text-sm text-text placeholder:text-text-muted outline-none transition-colors focus:border-primary";

export function AppointmentForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: FieldErrors = {};

    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const email = String(data.get("email") || "").trim();
    const department = String(data.get("department") || "");
    const date = String(data.get("date") || "");

    if (name.length < 2) next.name = "Please enter your full name.";
    if (!/^[0-9+\s-]{7,15}$/.test(phone)) next.phone = "Enter a valid phone number.";
    if (email && !/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address.";
    if (!department) next.department = "Please select a department.";
    if (!date) next.date = "Please choose a preferred date.";

    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSubmitted(true);
      e.currentTarget.reset();
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-border bg-card p-12 text-center">
        <CheckCircle2 className="h-12 w-12 text-primary" />
        <h3 className="mt-5 font-display text-xl font-bold text-text">Appointment Request Received</h3>
        <p className="mt-2 max-w-sm text-sm text-text-muted">
          Our patient care team will contact you shortly to confirm your appointment details.
        </p>
        <Button className="mt-6" onClick={() => setSubmitted(false)}>
          Book Another Appointment
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
      <form onSubmit={handleSubmit} noValidate className="rounded-3xl border border-border bg-card p-7 md:p-10">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-text">Patient Name</label>
            <input name="name" className={cn(inputClass, errors.name ? "border-primary" : "border-border")} placeholder="Full name" />
            {errors.name && <p className="mt-1 text-xs text-primary">{errors.name}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-text">Phone</label>
            <input name="phone" className={cn(inputClass, errors.phone ? "border-primary" : "border-border")} placeholder="03XX XXXXXXX" />
            {errors.phone && <p className="mt-1 text-xs text-primary">{errors.phone}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-text">Email (optional)</label>
            <input name="email" type="email" className={cn(inputClass, errors.email ? "border-primary" : "border-border")} placeholder="you@example.com" />
            {errors.email && <p className="mt-1 text-xs text-primary">{errors.email}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-text">Department</label>
            <select name="department" className={cn(inputClass, errors.department ? "border-primary" : "border-border")} defaultValue="">
              <option value="" disabled>Select department</option>
              {DEPARTMENTS.map((d) => (
                <option key={d.slug} value={d.name}>{d.name}</option>
              ))}
            </select>
            {errors.department && <p className="mt-1 text-xs text-primary">{errors.department}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-text">Doctor (optional)</label>
            <select name="doctor" className={cn(inputClass, "border-border")} defaultValue="">
              <option value="">No preference</option>
              {DOCTORS.map((d) => (
                <option key={d.slug} value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-text">Preferred Date</label>
            <input name="date" type="date" className={cn(inputClass, errors.date ? "border-primary" : "border-border")} />
            {errors.date && <p className="mt-1 text-xs text-primary">{errors.date}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-text">Preferred Time</label>
            <input name="time" type="time" className={cn(inputClass, "border-border")} />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs font-semibold text-text">Message (optional)</label>
            <textarea name="message" rows={4} className={cn(inputClass, "border-border resize-none")} placeholder="Tell us briefly about your concern" />
          </div>
        </div>
        <Button type="submit" size="lg" className="mt-7 w-full sm:w-auto" icon={<CalendarCheck className="h-4 w-4" />}>
          Book Appointment
        </Button>
      </form>

      <div className="space-y-4">
        {[
          { icon: Siren, title: "24/7 Emergency", detail: "Round-the-clock emergency response." },
          { icon: Clock3, title: "Quick Response", detail: "Confirmation within one business hour." },
          { icon: ShieldCheck, title: "Expert Doctors", detail: "100+ qualified specialists on staff." },
          { icon: CheckCircle2, title: "Secure Patient Care", detail: "Your information stays confidential." },
        ].map((item) => (
          <div key={item.title} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
              <item.icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-text">{item.title}</p>
              <p className="mt-0.5 text-xs text-text-muted">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
