export type Department = {
  slug: string;
  name: string;
  short: string;
  overview: string;
  specialists: number;
  hours: string;
  services: string[];
  image: string;
};

export const DEPARTMENTS: Department[] = [
  {
    slug: "cardiology",
    name: "Cardiology Department",
    short: "Heart health from diagnostics to interventional cardiac care.",
    overview:
      "The Cardiology Department brings together interventional cardiologists, sonographers, and rehabilitation specialists under one roof, supported by a fully equipped catheterization lab.",
    specialists: 6,
    hours: "Mon–Sat, 9:00 AM – 8:00 PM",
    services: ["Echocardiography", "Angiography", "Cardiac Rehabilitation", "Preventive Screening"],
    image: "photo-1628595351029-c2bf17511435",
  },
  {
    slug: "emergency",
    name: "Emergency Department",
    short: "24/7 trauma and critical care response.",
    overview:
      "Our Emergency Department is staffed around the clock with trauma-trained physicians, a dedicated resuscitation bay, and direct access to imaging and the operating theatre.",
    specialists: 10,
    hours: "Open 24 hours, every day",
    services: ["Trauma Response", "Critical Care Stabilization", "Rapid Diagnostics", "Ambulance Coordination"],
    image: "photo-1587351021355-a479a299d2f9",
  },
  {
    slug: "surgical",
    name: "Surgical Department",
    short: "Modern operation theatres for elective and emergency surgery.",
    overview:
      "The Surgical Department operates four modern theatres equipped for general, orthopedic, and minimally invasive procedures, backed by a dedicated post-op recovery ward.",
    specialists: 8,
    hours: "Scheduled surgeries daily · Emergency on-call 24/7",
    services: ["General Surgery", "Laparoscopic Surgery", "Orthopedic Surgery", "Post-Op Recovery"],
    image: "photo-1551076805-e1869033e561",
  },
  {
    slug: "pediatrics",
    name: "Pediatrics Department",
    short: "Complete child healthcare in a warm, family-centered setting.",
    overview:
      "Our Pediatrics Department cares for newborns through adolescents, with a dedicated neonatal care unit and a child-friendly ward designed to ease anxiety.",
    specialists: 5,
    hours: "Mon–Sat, 8:00 AM – 9:00 PM",
    services: ["Newborn Care", "Vaccination", "Growth Monitoring", "Adolescent Health"],
    image: "photo-1584515979956-d9f6e5d09982",
  },
  {
    slug: "gynecology",
    name: "Gynecology Department",
    short: "Women's health across every life stage.",
    overview:
      "The Gynecology Department provides prenatal, postnatal, and general reproductive health services, with an in-house ultrasound suite and dedicated labor rooms.",
    specialists: 5,
    hours: "Mon–Sat, 9:00 AM – 8:00 PM",
    services: ["Prenatal Care", "Labor & Delivery", "Gynecological Surgery", "Fertility Counselling"],
    image: "photo-1622253692010-333f2da6031d",
  },
  {
    slug: "neurology",
    name: "Neurology Department",
    short: "Brain and nervous system diagnostics and treatment.",
    overview:
      "Our Neurology Department is equipped for stroke response and long-term management of neurological conditions, with EEG and imaging available on-site.",
    specialists: 4,
    hours: "Mon–Fri, 9:00 AM – 6:00 PM",
    services: ["Stroke Care", "EEG Diagnostics", "Movement Disorders", "Neuro-Rehabilitation"],
    image: "photo-1559757175-5700dde675bc",
  },
  {
    slug: "orthopedics",
    name: "Orthopedics Department",
    short: "Bone, joint, and musculoskeletal treatment.",
    overview:
      "The Orthopedics Department treats fractures, joint conditions, and sports injuries, with a joint-replacement programme and on-site physiotherapy.",
    specialists: 5,
    hours: "Mon–Sat, 9:00 AM – 8:00 PM",
    services: ["Joint Replacement", "Fracture Care", "Sports Medicine", "Physiotherapy"],
    image: "photo-1579684385127-1ef15d508118",
  },
  {
    slug: "radiology",
    name: "Radiology Department",
    short: "Full digital imaging suite for accurate diagnostics.",
    overview:
      "Our Radiology Department houses digital X-ray, CT, ultrasound, and MRI, with radiologist-reviewed reporting available same-day for most studies.",
    specialists: 4,
    hours: "Open 24 hours, every day",
    services: ["X-Ray", "CT Scan", "MRI", "Ultrasound"],
    image: "photo-1516549655169-df83a0774514",
  },
  {
    slug: "laboratory",
    name: "Laboratory Department",
    short: "Accredited pathology and diagnostic testing.",
    overview:
      "The Laboratory Department offers a comprehensive test menu with rapid turnaround, home sample collection, and digital report delivery.",
    specialists: 6,
    hours: "Open 24 hours, every day",
    services: ["Blood Testing", "Microbiology", "Histopathology", "Home Sample Collection"],
    image: "photo-1579154204601-01588f351e67",
  },
  {
    slug: "pharmacy",
    name: "Pharmacy Department",
    short: "In-house pharmacy for every prescription need.",
    overview:
      "Our Pharmacy Department stocks a wide range of prescription and essential medicines, with pharmacist-led counselling for safe, informed use.",
    specialists: 3,
    hours: "Open 24 hours, every day",
    services: ["Prescription Dispensing", "Medication Counselling", "Home Delivery", "Inventory Assurance"],
    image: "photo-1587854692152-cbe660dbde88",
  },
];

export function getDepartmentBySlug(slug: string) {
  return DEPARTMENTS.find((d) => d.slug === slug);
}
