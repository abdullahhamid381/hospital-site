import { Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { AppointmentForm } from "@/components/sections/appointment-form";

export function AppointmentSection() {
  return (
    <section className="bg-bg-secondary py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Appointment" title="Your Health Can't Wait" align="center" className="mx-auto" />
        </Reveal>
        <Reveal delay={0.1} className="mt-14">
          <AppointmentForm />
        </Reveal>
      </Container>
    </section>
  );
}
