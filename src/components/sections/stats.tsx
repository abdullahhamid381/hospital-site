import { Container } from "@/components/ui/primitives";
import { StatCard } from "@/components/cards/misc-cards";
import { STATS } from "@/lib/data/stats";

export function Stats() {
  return (
    <section className="border-y border-border bg-bg-secondary py-14">
      <Container>
        <div className="grid grid-cols-2 gap-y-10 md:grid-cols-5 md:gap-8">
          {STATS.map((s, i) => (
            <StatCard key={s.label} value={s.value} suffix={s.suffix} label={s.label} delay={i * 0.1} />
          ))}
        </div>
      </Container>
    </section>
  );
}
