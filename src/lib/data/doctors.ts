export type Doctor = {
  slug: string;
  name: string;
  specialization: string;
  department: string;
  experience: string;
  qualifications: string[];
  languages: string[];
  availableDays: string;
  availableTimings: string;
  bio: string;
  expertise: string[];
  image: string;
};

export const DOCTORS: Doctor[] = [
  {
    slug: "dr-imran-farooq",
    name: "Dr. Imran Farooq",
    specialization: "Consultant Cardiologist",
    department: "Cardiology",
    experience: "16+ Years Experience",
    qualifications: ["MBBS", "FCPS (Cardiology)", "Fellowship in Interventional Cardiology"],
    languages: ["English", "Urdu", "Punjabi"],
    availableDays: "Mon, Wed, Fri",
    availableTimings: "10:00 AM – 4:00 PM",
    bio: "Dr. Imran Farooq has led complex interventional cardiology procedures for over 16 years, with a focus on preventive heart health and minimally invasive treatment.",
    expertise: ["Angioplasty", "Echocardiography", "Preventive Cardiology", "Arrhythmia Management"],
    image: "photo-1622902046580-2b47f47f5471",
  },
  {
    slug: "dr-sana-malik",
    name: "Dr. Sana Malik",
    specialization: "Consultant Gynecologist",
    department: "Gynecology",
    experience: "12+ Years Experience",
    qualifications: ["MBBS", "FCPS (Gynecology & Obstetrics)"],
    languages: ["English", "Urdu"],
    availableDays: "Mon–Sat",
    availableTimings: "9:00 AM – 3:00 PM",
    bio: "Dr. Sana Malik specializes in high-risk pregnancy management and minimally invasive gynecological surgery, with a patient-first approach to women's health.",
    expertise: ["High-Risk Pregnancy", "Laparoscopic Surgery", "Fertility Counselling", "Prenatal Care"],
    image: "photo-1594824476967-48c8b964273f",
  },
  {
    slug: "dr-bilal-ahmed",
    name: "Dr. Bilal Ahmed",
    specialization: "Consultant Orthopedic Surgeon",
    department: "Orthopedics",
    experience: "14+ Years Experience",
    qualifications: ["MBBS", "FCPS (Orthopedic Surgery)"],
    languages: ["English", "Urdu"],
    availableDays: "Tue, Thu, Sat",
    availableTimings: "11:00 AM – 5:00 PM",
    bio: "Dr. Bilal Ahmed focuses on joint replacement and sports injury care, combining surgical precision with structured post-operative rehabilitation.",
    expertise: ["Joint Replacement", "Sports Injuries", "Fracture Management", "Arthroscopy"],
    image: "photo-1537368910025-700350fe46c7",
  },
  {
    slug: "dr-ayesha-raza",
    name: "Dr. Ayesha Raza",
    specialization: "Consultant Pediatrician",
    department: "Pediatrics",
    experience: "10+ Years Experience",
    qualifications: ["MBBS", "FCPS (Pediatrics)"],
    languages: ["English", "Urdu", "Saraiki"],
    availableDays: "Mon–Sat",
    availableTimings: "9:00 AM – 2:00 PM",
    bio: "Dr. Ayesha Raza brings a gentle, family-centered approach to newborn and child healthcare, with a particular interest in early developmental screening.",
    expertise: ["Newborn Care", "Vaccination", "Developmental Screening", "Pediatric Nutrition"],
    image: "photo-1559839734-2b71ea197ec2",
  },
  {
    slug: "dr-usman-tariq",
    name: "Dr. Usman Tariq",
    specialization: "Consultant Neurologist",
    department: "Neurology",
    experience: "13+ Years Experience",
    qualifications: ["MBBS", "FCPS (Neurology)"],
    languages: ["English", "Urdu"],
    availableDays: "Mon, Tue, Thu",
    availableTimings: "10:00 AM – 4:00 PM",
    bio: "Dr. Usman Tariq specializes in stroke care and movement disorders, leading the hospital's neuro-rehabilitation programme.",
    expertise: ["Stroke Management", "Epilepsy", "Movement Disorders", "EEG Diagnostics"],
    image: "photo-1612349317150-e413f6a5b16d",
  },
  {
    slug: "dr-hina-shah",
    name: "Dr. Hina Shah",
    specialization: "Consultant Dermatologist",
    department: "Dermatology",
    experience: "9+ Years Experience",
    qualifications: ["MBBS", "FCPS (Dermatology)"],
    languages: ["English", "Urdu"],
    availableDays: "Mon, Wed, Fri, Sat",
    availableTimings: "12:00 PM – 6:00 PM",
    bio: "Dr. Hina Shah treats a wide range of medical and cosmetic skin conditions, with particular expertise in laser-based dermatological procedures.",
    expertise: ["Acne & Eczema", "Laser Treatments", "Cosmetic Dermatology", "Allergy Testing"],
    image: "photo-1582750433449-648ed127bb54",
  },
  {
    slug: "dr-fahad-siddiqui",
    name: "Dr. Fahad Siddiqui",
    specialization: "Consultant General Surgeon",
    department: "General Surgery",
    experience: "15+ Years Experience",
    qualifications: ["MBBS", "FCPS (General Surgery)"],
    languages: ["English", "Urdu"],
    availableDays: "Mon–Fri",
    availableTimings: "9:00 AM – 3:00 PM",
    bio: "Dr. Fahad Siddiqui performs a broad range of general and laparoscopic surgical procedures, prioritizing minimally invasive techniques for faster recovery.",
    expertise: ["Laparoscopic Surgery", "Hernia Repair", "Gallbladder Surgery", "Emergency Surgery"],
    image: "photo-1573496359142-b8d87734a5a2",
  },
  {
    slug: "dr-mariam-qureshi",
    name: "Dr. Mariam Qureshi",
    specialization: "Consultant Internal Medicine",
    department: "Internal Medicine",
    experience: "11+ Years Experience",
    qualifications: ["MBBS", "FCPS (Internal Medicine)"],
    languages: ["English", "Urdu", "Punjabi"],
    availableDays: "Mon–Sat",
    availableTimings: "9:00 AM – 4:00 PM",
    bio: "Dr. Mariam Qureshi manages chronic conditions such as diabetes and hypertension with a focus on sustainable, preventive care plans.",
    expertise: ["Diabetes Management", "Hypertension", "Preventive Screening", "Chronic Disease Care"],
    image: "photo-1607990281513-2c110a25bd8c",
  },
];

export function getDoctorBySlug(slug: string) {
  return DOCTORS.find((d) => d.slug === slug);
}
