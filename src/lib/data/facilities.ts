export type Facility = {
  slug: string;
  name: string;
  short: string;
  description: string;
  image: string;
};

export const FACILITIES: Facility[] = [
  {
    slug: "operation-theaters",
    name: "Modern Operation Theaters",
    short: "Four fully equipped OTs for general and specialized surgery.",
    description:
      "Our operation theatres are fitted with modern surgical and anaesthesia equipment, laminar airflow systems, and dedicated sterilization protocols to ensure patient safety.",
    image: "photo-1551190822-a9333d879b1f",
  },
  {
    slug: "icu",
    name: "Intensive Care Unit",
    short: "24/7 critical care with continuous monitoring.",
    description:
      "Our ICU provides round-the-clock critical care with ventilator support, continuous monitoring, and a dedicated critical-care nursing team.",
    image: "photo-1516549655169-df83a0774514",
  },
  {
    slug: "ccu",
    name: "Cardiac Care Unit",
    short: "Specialized monitoring for cardiac patients.",
    description:
      "The CCU is equipped for continuous cardiac monitoring and rapid intervention, staffed by cardiology-trained nurses and physicians.",
    image: "photo-1628595351029-c2bf17511435",
  },
  {
    slug: "emergency-department",
    name: "Emergency Department",
    short: "24/7 emergency response with dedicated trauma bay.",
    description:
      "Our emergency department is designed for rapid triage and treatment, with direct access to imaging, the laboratory, and operating theatres.",
    image: "photo-1587351021355-a479a299d2f9",
  },
  {
    slug: "private-rooms",
    name: "Private Rooms",
    short: "Comfortable single-occupancy recovery suites.",
    description:
      "Private rooms offer a quiet recovery environment with attached washrooms, a dedicated attendant area, and round-the-clock nursing care.",
    image: "photo-1586773860418-d37222d8fce3",
  },
  {
    slug: "patient-rooms",
    name: "Patient Rooms",
    short: "Shared and semi-private accommodation options.",
    description:
      "Our general patient rooms are designed for comfort and easy nursing access, with natural light and a calm, clean environment.",
    image: "photo-1519494026892-80bbd2d6fd0d",
  },
  {
    slug: "diagnostic-center",
    name: "Diagnostic Center",
    short: "One-stop imaging and testing under one roof.",
    description:
      "The diagnostic center houses radiology and laboratory services together, streamlining the path from referral to results.",
    image: "photo-1579154204601-01588f351e67",
  },
  {
    slug: "pharmacy",
    name: "Pharmacy",
    short: "In-house pharmacy open around the clock.",
    description:
      "Our pharmacy stocks a broad range of prescription and essential medicines, with pharmacist-led counselling available at all hours.",
    image: "photo-1587854692152-cbe660dbde88",
  },
  {
    slug: "laboratory",
    name: "Laboratory",
    short: "Accredited testing with rapid turnaround.",
    description:
      "Our laboratory processes a wide test menu on-site, with digital reporting for fast, accurate results.",
    image: "photo-1579165466741-7f35e4755660",
  },
  {
    slug: "waiting-areas",
    name: "Waiting Areas",
    short: "Comfortable, spacious areas for patients and families.",
    description:
      "Our waiting areas are designed for comfort, with clear wayfinding, seating for families, and calm, natural lighting.",
    image: "photo-1519494026892-80bbd2d6fd0d",
  },
  {
    slug: "cafeteria",
    name: "Cafeteria",
    short: "On-site dining for patients, visitors, and staff.",
    description:
      "Our cafeteria offers a range of nutritious meal options for patients' families and staff throughout the day.",
    image: "photo-1552566626-52f8b828add9",
  },
  {
    slug: "parking",
    name: "Parking",
    short: "Ample, secure on-site parking.",
    description:
      "Secure, well-lit parking is available on-site for patients and visitors, with dedicated spaces close to the main entrance.",
    image: "photo-1470224114660-3f6686c562eb",
  },
  {
    slug: "ambulance",
    name: "Ambulance Service",
    short: "24/7 emergency ambulance dispatch.",
    description:
      "Our ambulance fleet is equipped for emergency transport with trained paramedics, dispatched around the clock.",
    image: "photo-1587745416684-47953f16f02f",
  },
];

export function getFacilityBySlug(slug: string) {
  return FACILITIES.find((f) => f.slug === slug);
}
