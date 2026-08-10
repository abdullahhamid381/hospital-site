import { Siren, Phone, Clock3, Ambulance, HeartPulse } from "lucide-react";
import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/data/site";

const POINTS = [
  { icon: Phone, label: "Emergency Number", value: SITE.emergencyPhone },
  { icon: Clock3, label: "Availability", value: "24 Hours, 7 Days" },
  { icon: Ambulance, label: "Ambulance Support", value: "Rapid Dispatch" },
  { icon: HeartPulse, label: "Critical Care", value: "On-Site ICU/CCU" },
];

export function Emergency() {
  return (
    <section className="relative overflow-hidden bg-black py-24 md:py-32">
      <div
        className="pointer-events-none absolute -top-32 left-1/3 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{ background: "var(--color-primary)", opacity: 0.18 }}
      />
      <Container className="relative">
        <Reveal className="mx-auto max-w-xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            <Siren className="h-3.5 w-3.5" /> Emergency
          </span>
          <h2 className="section-headline text-balance mt-5 font-bold text-white">24/7 Emergency Care</h2>
          <p className="mt-4 text-base leading-relaxed text-white/70">
            Our emergency team is ready around the clock to provide rapid and compassionate medical attention, whenever you need it most.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-4">
          {POINTS.map((p, i) => (
            <Reveal key={p.label} delay={i * 0.08} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
              <p.icon className="mx-auto h-6 w-6 text-primary" />
              <p className="mt-3 text-xs text-white/50">{p.label}</p>
              <p className="mt-1 text-sm font-bold text-white">{p.value}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3} className="mt-12 flex justify-center">
          <Button href={`tel:${SITE.emergencyPhone.replace(/\s/g, "")}`} size="lg" icon={<Phone className="h-4 w-4" />}>
            Call Emergency
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
