import type { Metadata } from "next";
import { Stethoscope } from "lucide-react";
import { Container } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center py-24">
      <Container className="max-w-lg text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light text-primary">
          <Stethoscope className="h-8 w-8" />
        </span>
        <p className="mt-8 font-display text-7xl font-extrabold text-primary">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-text">Looks like this page needs medical attention.</h1>
        <p className="mt-3 text-sm text-text-muted">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <Button href="/" size="lg" className="mt-8">Return Home</Button>
      </Container>
    </section>
  );
}
