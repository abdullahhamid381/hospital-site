import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { About } from "@/components/sections/about";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { ServicesSection } from "@/components/sections/services-section";
import { DepartmentsSection } from "@/components/sections/departments-section";
import { DoctorsSection } from "@/components/sections/doctors-section";
import { AppointmentSection } from "@/components/sections/appointment-section";
import { Emergency } from "@/components/sections/emergency";
import { FacilitiesSection } from "@/components/sections/facilities-section";
import { Technology } from "@/components/sections/technology";
import { PackagesSection } from "@/components/sections/packages-section";
import { Journey } from "@/components/sections/journey";
import { ImpactSection } from "@/components/sections/impact-section";
import { Testimonials } from "@/components/sections/testimonials";
import { SuccessStories } from "@/components/sections/success-stories";
import { Partners } from "@/components/sections/partners";
import { BlogSection } from "@/components/sections/blog-section";
import { FAQSection } from "@/components/sections/faq-section";
import { FinalCTA } from "@/components/sections/final-cta";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <WhyChooseUs />
      <ServicesSection />
      <DepartmentsSection />
      <DoctorsSection />
      <AppointmentSection />
      <Emergency />
      <FacilitiesSection />
      <Technology />
      <PackagesSection />
      <Journey />
      <ImpactSection />
      <Testimonials />
      <SuccessStories />
      <Partners />
      <BlogSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
