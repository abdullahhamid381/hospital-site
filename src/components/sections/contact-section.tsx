"use client";

import { useState, type FormEvent } from "react";
import { MapPin, Phone, Siren, Mail, Clock, CheckCircle2 } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/data/site";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-text placeholder:text-text-muted outline-none transition-colors focus:border-primary";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (name.length < 2 || !/^\S+@\S+\.\S+$/.test(email) || message.length < 5) {
      setError("Please fill in your name, a valid email, and a short message.");
      return;
    }
    setError("");
    setSubmitted(true);
    e.currentTarget.reset();
  }

  return (
    <section className="py-24 md:py-32">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Contact" title="We're Here to Help" align="center" className="mx-auto" />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.3fr]">
          <Reveal className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-xs text-text-muted">Address</p>
                  <p className="mt-1 text-sm font-semibold text-text">{SITE.address}</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-xs text-text-muted">Phone</p>
                  <p className="mt-1 text-sm font-semibold text-text">{SITE.phone}</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-start gap-3">
                <Siren className="h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-xs text-text-muted">Emergency</p>
                  <p className="mt-1 text-sm font-semibold text-text">{SITE.emergencyPhone}</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-xs text-text-muted">Email</p>
                  <p className="mt-1 text-sm font-semibold text-text">{SITE.email}</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-xs text-text-muted">Hours</p>
                  <p className="mt-1 text-sm font-semibold text-text">{SITE.hours}</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-border bg-card p-12 text-center">
                <CheckCircle2 className="h-12 w-12 text-primary" />
                <h3 className="mt-5 font-display text-xl font-bold text-text">Message Sent</h3>
                <p className="mt-2 max-w-sm text-sm text-text-muted">Thank you for reaching out — our team will respond shortly.</p>
                <Button className="mt-6" onClick={() => setSubmitted(false)}>Send Another Message</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="rounded-3xl border border-border bg-card p-7 md:p-10">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <input name="name" className={inputClass} placeholder="Full name" />
                  <input name="email" type="email" className={inputClass} placeholder="Email address" />
                  <input name="phone" className={inputClass} placeholder="Phone number" />
                  <input name="subject" className={inputClass} placeholder="Subject" />
                  <textarea name="message" rows={5} className={cn(inputClass, "sm:col-span-2 resize-none")} placeholder="Your message" />
                </div>
                {error && <p className="mt-3 text-xs text-primary">{error}</p>}
                <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto">Send Message</Button>
              </form>
            )}

            <div className="mt-6 h-72 overflow-hidden rounded-2xl border border-border">
              <iframe
                src={SITE.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                title="Hospital location map"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
