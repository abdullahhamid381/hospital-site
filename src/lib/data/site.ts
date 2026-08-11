export const SITE = {
  name: "Azhar Mehboob Memorial Hospital",
  shortName: "AMM Hospital",
  tagline: "Advanced Healthcare. Compassionate Care.",
  phone: "+92 300 1234567",
  emergencyPhone: "+92 300 9998877",
  email: "info@ammhospital.pk",
  emergencyEmail: "emergency@ammhospital.pk",
  address: "Circular Road, Bhakkar, Punjab, Pakistan",
  hours: "OPD: Mon–Sat, 8:00 AM – 10:00 PM · Emergency: 24/7, all week",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13456.0!2d71.0645!3d31.6285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBhakkar!5e0!3m2!1sen!2s!4v1700000000000",
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com",
  },
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Departments", href: "/departments" },
  { label: "Doctors", href: "/doctors" },
  { label: "Faculty", href: "/staff" },
  { label: "Facilities", href: "/facilities" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Doctors", href: "/doctors" },
  { label: "Departments", href: "/departments" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_PATIENT_LINKS = [
  { label: "Appointments", href: "/appointment" },
  { label: "Health Packages", href: "/health-packages" },
  { label: "Emergency Care", href: "/emergency-care" },
  { label: "Insurance", href: "/insurance" },
  { label: "Patient Information", href: "/patient-information" },
] as const;

export const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-conditions" },
  { label: "Accessibility", href: "/accessibility" },
] as const;
