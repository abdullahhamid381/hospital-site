import { ArrowRight, Phone } from "lucide-react";
import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-black py-24 md:py-32">
      <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rotate-45 rounded-[48px] border border-primary/20" />
      <div
        className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rotate-45 rounded-[64px]"
        style={{ background: "var(--color-primary)", opacity: 0.12 }}
      />
      <Container className="relative text-center">
        <Reveal>
          <h2 className="section-headline text-balance mx-auto max-w-2xl font-bold text-white">
            Your Health Deserves Exceptional Care.
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/appointment" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
            Book an Appointment
          </Button>
          <Button href="/contact" variant="outline" size="lg" className="border-white/20 text-white hover:border-primary hover:text-primary" icon={<Phone className="h-4 w-4" />}>
            Contact Us
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
