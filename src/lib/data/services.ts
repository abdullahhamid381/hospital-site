export type Service = {
  slug: string;
  name: string;
  icon: string;
  short: string;
  description: string;
  benefits: string[];
  process: { title: string; detail: string }[];
  image: string;
};

export const SERVICES: Service[] = [
  {
    slug: "emergency-care",
    name: "Emergency Care",
    icon: "Siren",
    short: "Round-the-clock trauma and critical care with rapid response teams.",
    description:
      "Our emergency department operates every hour of every day, staffed by trauma-trained physicians and equipped for critical interventions, from cardiac events to major trauma.",
    benefits: ["Sub-10-minute triage", "On-site trauma surgeons", "Dedicated ambulance bay", "Level II trauma equipment"],
    process: [
      { title: "Triage", detail: "Immediate severity assessment on arrival." },
      { title: "Stabilization", detail: "Vitals secured, diagnostics ordered." },
      { title: "Treatment", detail: "Specialist-led intervention begins." },
      { title: "Transition", detail: "Admission, observation, or discharge plan." },
    ],
    image: "photo-1587351021355-a479a299d2f9",
  },
  {
    slug: "cardiology",
    name: "Cardiology",
    icon: "HeartPulse",
    short: "Comprehensive heart care from diagnostics to interventional procedures.",
    description:
      "Our cardiology unit combines advanced imaging with an experienced interventional team to diagnose and treat conditions ranging from arrhythmia to coronary artery disease.",
    benefits: ["Echocardiography on-site", "Catheterization lab", "Preventive risk screening", "Post-cardiac rehab"],
    process: [
      { title: "Consultation", detail: "Detailed history and risk profiling." },
      { title: "Diagnostics", detail: "ECG, echo, or stress testing as needed." },
      { title: "Intervention", detail: "Medical or surgical treatment plan." },
      { title: "Recovery", detail: "Structured rehabilitation and monitoring." },
    ],
    image: "photo-1628595351029-c2bf17511435",
  },
  {
    slug: "neurology",
    name: "Neurology",
    icon: "Brain",
    short: "Diagnosis and treatment of conditions affecting the brain and nervous system.",
    description:
      "From stroke response to chronic neurological disorders, our neurology team pairs advanced imaging with individualized long-term treatment planning.",
    benefits: ["Stroke-ready protocols", "EEG & EMG diagnostics", "Movement disorder clinic", "Neuro-rehabilitation"],
    process: [
      { title: "Assessment", detail: "Neurological exam and history." },
      { title: "Imaging", detail: "CT, MRI, or EEG as indicated." },
      { title: "Diagnosis", detail: "Findings reviewed with specialist." },
      { title: "Care Plan", detail: "Ongoing management or therapy." },
    ],
    image: "photo-1559757175-5700dde675bc",
  },
  {
    slug: "orthopedics",
    name: "Orthopedics",
    icon: "Bone",
    short: "Bone, joint, and musculoskeletal care from sprains to joint replacement.",
    description:
      "Our orthopedic surgeons treat sports injuries, degenerative joint conditions, and fractures using both conservative and surgical approaches.",
    benefits: ["Joint replacement program", "Sports injury clinic", "On-site physiotherapy", "Minimally invasive surgery"],
    process: [
      { title: "Evaluation", detail: "Physical exam and imaging review." },
      { title: "Treatment Plan", detail: "Conservative or surgical pathway." },
      { title: "Procedure", detail: "Surgery or therapy as required." },
      { title: "Rehabilitation", detail: "Guided recovery programme." },
    ],
    image: "photo-1579684385127-1ef15d508118",
  },
  {
    slug: "general-surgery",
    name: "General Surgery",
    icon: "Stethoscope",
    short: "Elective and emergency surgical care across a wide range of conditions.",
    description:
      "Our surgical team performs a broad range of procedures using modern minimally invasive techniques wherever possible, reducing recovery time.",
    benefits: ["Laparoscopic surgery", "Pre-op counselling", "Dedicated recovery ward", "24/7 surgical on-call"],
    process: [
      { title: "Consultation", detail: "Surgical suitability assessed." },
      { title: "Pre-Op Planning", detail: "Tests and anaesthesia review." },
      { title: "Surgery", detail: "Procedure in modern OT suite." },
      { title: "Recovery", detail: "Monitored post-operative care." },
    ],
    image: "photo-1551076805-e1869033e561",
  },
  {
    slug: "pediatrics",
    name: "Pediatrics",
    icon: "Baby",
    short: "Complete child healthcare from newborn screening to adolescent care.",
    description:
      "Our pediatric department provides gentle, family-centered care for infants, children, and adolescents, including vaccination and growth monitoring.",
    benefits: ["Newborn care unit", "Vaccination programme", "Growth & development tracking", "Child-friendly ward"],
    process: [
      { title: "Check-Up", detail: "Growth and development review." },
      { title: "Screening", detail: "Age-appropriate assessments." },
      { title: "Treatment", detail: "Care tailored to the child." },
      { title: "Follow-Up", detail: "Ongoing wellness visits." },
    ],
    image: "photo-1584515979956-d9f6e5d09982",
  },
  {
    slug: "gynecology",
    name: "Gynecology",
    icon: "Flower2",
    short: "Women's health services spanning prenatal care to gynecological surgery.",
    description:
      "Our gynecology unit offers comprehensive reproductive health services, from routine screening to high-risk pregnancy management and surgery.",
    benefits: ["Prenatal & postnatal care", "Ultrasound on-site", "Minimally invasive surgery", "Fertility counselling"],
    process: [
      { title: "Consultation", detail: "History and examination." },
      { title: "Screening", detail: "Relevant diagnostic testing." },
      { title: "Care Plan", detail: "Personalized treatment path." },
      { title: "Ongoing Care", detail: "Ante/postnatal follow-up." },
    ],
    image: "photo-1622253692010-333f2da6031d",
  },
  {
    slug: "dermatology",
    name: "Dermatology",
    icon: "Sparkles",
    short: "Skin, hair, and nail care for medical and cosmetic conditions.",
    description:
      "Our dermatology clinic treats acne, eczema, psoriasis, and skin infections, alongside cosmetic and laser-based procedures.",
    benefits: ["Medical & cosmetic care", "Laser treatments", "Allergy patch testing", "Minor skin procedures"],
    process: [
      { title: "Consultation", detail: "Skin assessment and history." },
      { title: "Diagnosis", detail: "Testing where required." },
      { title: "Treatment", detail: "Topical, oral, or procedural." },
      { title: "Follow-Up", detail: "Progress review visits." },
    ],
    image: "photo-1512290923902-8a9f81dc236c",
  },
  {
    slug: "ent",
    name: "ENT",
    icon: "Ear",
    short: "Ear, nose, and throat care for all ages.",
    description:
      "Our ENT specialists manage hearing conditions, sinus disorders, and throat conditions using modern diagnostic and surgical equipment.",
    benefits: ["Audiometry testing", "Endoscopic evaluation", "Sinus surgery", "Pediatric ENT care"],
    process: [
      { title: "Examination", detail: "ENT-specific assessment." },
      { title: "Diagnostics", detail: "Hearing or imaging tests." },
      { title: "Treatment", detail: "Medical or surgical care." },
      { title: "Review", detail: "Recovery and hearing checks." },
    ],
    image: "photo-1559757175-0eb30cd8c063",
  },
  {
    slug: "internal-medicine",
    name: "Internal Medicine",
    icon: "ClipboardPlus",
    short: "Adult primary and preventive care for chronic and acute conditions.",
    description:
      "Our internists manage diabetes, hypertension, and other chronic conditions with a focus on long-term preventive health.",
    benefits: ["Chronic disease management", "Annual health screening", "Coordinated specialist referral", "Preventive counselling"],
    process: [
      { title: "Initial Visit", detail: "Full health assessment." },
      { title: "Diagnostics", detail: "Lab work and screening." },
      { title: "Management Plan", detail: "Ongoing treatment strategy." },
      { title: "Monitoring", detail: "Scheduled follow-up visits." },
    ],
    image: "photo-1550831107-1553da8c8464",
  },
  {
    slug: "radiology",
    name: "Radiology",
    icon: "Scan",
    short: "Digital imaging and diagnostics including X-ray, CT, and MRI.",
    description:
      "Our radiology department delivers fast, accurate imaging with digital reporting, supporting every clinical department in the hospital.",
    benefits: ["Digital X-ray & CT", "MRI diagnostics", "Same-day reporting", "Radiologist-reviewed results"],
    process: [
      { title: "Referral", detail: "Scan ordered by your physician." },
      { title: "Imaging", detail: "Scan performed by technologist." },
      { title: "Reporting", detail: "Radiologist review and report." },
      { title: "Consultation", detail: "Results discussed with your doctor." },
    ],
    image: "photo-1516549655169-df83a0774514",
  },
  {
    slug: "laboratory",
    name: "Laboratory",
    icon: "TestTube",
    short: "Accredited pathology and diagnostic testing services.",
    description:
      "Our laboratory provides a full range of diagnostic testing with rapid turnaround, supporting accurate and timely clinical decisions.",
    benefits: ["Wide test menu", "Rapid turnaround", "Home sample collection", "Digital report delivery"],
    process: [
      { title: "Sample Collection", detail: "In-lab or home collection." },
      { title: "Processing", detail: "Accredited lab analysis." },
      { title: "Reporting", detail: "Digital results delivered." },
      { title: "Consultation", detail: "Review with your physician." },
    ],
    image: "photo-1579154204601-01588f351e67",
  },
  {
    slug: "pharmacy",
    name: "Pharmacy",
    icon: "Pill",
    short: "In-house pharmacy stocked with prescription and essential medicines.",
    description:
      "Our on-site pharmacy fills prescriptions promptly and provides medication counselling for patients across all departments.",
    benefits: ["24/7 availability", "Prescription verification", "Medication counselling", "Home delivery option"],
    process: [
      { title: "Prescription", detail: "Received from your doctor." },
      { title: "Verification", detail: "Pharmacist reviews dosage." },
      { title: "Dispensing", detail: "Medicines prepared for pickup." },
      { title: "Counselling", detail: "Usage guidance provided." },
    ],
    image: "photo-1587854692152-cbe660dbde88",
  },
  {
    slug: "dental-care",
    name: "Dental Care",
    icon: "Smile",
    short: "General and cosmetic dentistry for the whole family.",
    description:
      "Our dental unit provides routine checkups, restorative treatment, and cosmetic dentistry in a comfortable, modern setting.",
    benefits: ["Routine & restorative care", "Digital dental X-ray", "Cosmetic dentistry", "Pediatric dentistry"],
    process: [
      { title: "Check-Up", detail: "Oral exam and X-ray if needed." },
      { title: "Diagnosis", detail: "Treatment options discussed." },
      { title: "Treatment", detail: "Procedure performed comfortably." },
      { title: "Follow-Up", detail: "Recovery and maintenance care." },
    ],
    image: "photo-1600959907703-125ba1374a12",
  },
  {
    slug: "physiotherapy",
    name: "Physiotherapy",
    icon: "Activity",
    short: "Rehabilitation and movement therapy for injury and chronic pain.",
    description:
      "Our physiotherapy team designs individualized rehabilitation programmes for post-surgical recovery, sports injuries, and chronic pain.",
    benefits: ["Individualized programmes", "Post-surgical rehab", "Sports injury therapy", "Pain management"],
    process: [
      { title: "Assessment", detail: "Mobility and pain evaluation." },
      { title: "Programme Design", detail: "Tailored therapy plan." },
      { title: "Sessions", detail: "Guided therapy sessions." },
      { title: "Progress Review", detail: "Plan adjusted as you improve." },
    ],
    image: "photo-1571019613454-1cb2f99b2d8b",
  },
  {
    slug: "urology",
    name: "Urology",
    icon: "Droplets",
    short: "Diagnosis and treatment of urinary and reproductive tract conditions.",
    description:
      "Our urology team treats conditions of the kidney, bladder, and urinary tract with both medical and minimally invasive surgical options.",
    benefits: ["Kidney stone management", "Minimally invasive surgery", "Prostate health screening", "Continence care"],
    process: [
      { title: "Consultation", detail: "Symptom review and history." },
      { title: "Diagnostics", detail: "Imaging or lab testing." },
      { title: "Treatment", detail: "Medical or surgical plan." },
      { title: "Follow-Up", detail: "Recovery monitoring." },
    ],
    image: "photo-1666214280391-8ff5bd3c0bf0",
  },
];

export function getServiceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
