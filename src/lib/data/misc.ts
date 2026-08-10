export type Testimonial = {
  name: string;
  service: string;
  rating: number;
  review: string;
  image: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Nadia Aslam",
    service: "Gynecology & Delivery",
    rating: 5,
    review:
      "From my first prenatal visit to delivery, the gynecology team made me feel genuinely cared for. Every question was answered with patience.",
    image: "photo-1544005313-94ddf0286df2",
  },
  {
    name: "Waqas Iqbal",
    service: "Cardiology",
    rating: 5,
    review:
      "The cardiology team caught a condition during a routine screening that I had no symptoms for. That early detection made all the difference.",
    image: "photo-1500648767791-00dcc994a43e",
  },
  {
    name: "Farah Naz",
    service: "Pediatrics",
    rating: 5,
    review:
      "My son was nervous about his checkup, but the pediatric team was so gentle and warm that he asked when we could come back.",
    image: "photo-1489424731084-a5d8b219a5bb",
  },
  {
    name: "Tariq Mehmood",
    service: "Emergency Care",
    rating: 5,
    review:
      "The emergency team responded within minutes of our arrival. Their calm, decisive care made an incredibly stressful night manageable.",
    image: "photo-1472099645785-5658abf4ff4e",
  },
  {
    name: "Sadia Hameed",
    service: "Orthopedics",
    rating: 4,
    review:
      "My knee replacement recovery was smoother than I expected, thanks to a clear rehabilitation plan and a supportive physiotherapy team.",
    image: "photo-1517841905240-472988babdf9",
  },
];

export type SuccessStory = {
  title: string;
  category: string;
  summary: string;
  image: string;
};

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    title: "Successful Cardiac Care",
    category: "Cardiology",
    summary:
      "A 58-year-old patient with a blocked coronary artery underwent a timely angioplasty and returned to full activity within weeks, guided by our cardiac rehabilitation programme.",
    image: "photo-1628595351029-c2bf17511435",
  },
  {
    title: "Advanced Surgical Treatment",
    category: "General Surgery",
    summary:
      "A complex gallbladder case was managed laparoscopically, reducing what would traditionally be a lengthy recovery to just days in hospital.",
    image: "photo-1551076805-e1869033e561",
  },
  {
    title: "Emergency Response Success",
    category: "Emergency Care",
    summary:
      "Rapid triage and stabilization following a road traffic accident allowed for immediate surgical intervention, resulting in a full recovery.",
    image: "photo-1587351021355-a479a299d2f9",
  },
  {
    title: "Patient Recovery Journey",
    category: "Orthopedics",
    summary:
      "A structured rehabilitation programme following hip replacement surgery helped a senior patient regain independent mobility within three months.",
    image: "photo-1579684385127-1ef15d508118",
  },
];

export type FAQ = { question: string; answer: string };

export const FAQS: FAQ[] = [
  {
    question: "How can I book an appointment?",
    answer:
      "You can book an appointment through our online appointment form, by calling our front desk, or by visiting the hospital directly.",
  },
  {
    question: "Is emergency care available 24/7?",
    answer:
      "Yes, our Emergency Department is staffed and open around the clock, every day of the year.",
  },
  {
    question: "How do I find a doctor?",
    answer:
      "Visit our Doctors page to browse specialists by department, experience, and availability, then book directly from their profile.",
  },
  {
    question: "What departments are available?",
    answer:
      "We operate over 25 specialized departments including Cardiology, Neurology, Orthopedics, Pediatrics, and more. See our Departments page for the full list.",
  },
  {
    question: "Do you accept insurance?",
    answer:
      "We work with a range of insurance and healthcare partners. Visit our Insurance page or contact our billing desk to confirm your provider.",
  },
  {
    question: "How can I contact the hospital?",
    answer:
      "You can reach us by phone, email, or through the contact form on our Contact page. Our emergency line is available 24/7.",
  },
  {
    question: "Can I view my medical reports online?",
    answer:
      "Digital report delivery is available for laboratory and radiology results. Speak with our front desk about accessing your reports.",
  },
  {
    question: "What are the visiting hours?",
    answer:
      "General visiting hours run from 4:00 PM to 7:00 PM daily. ICU and CCU visiting hours are more limited — please check with nursing staff.",
  },
];

export type GalleryItem = { category: string; caption: string; image: string };

export const GALLERY: GalleryItem[] = [
  { category: "Hospital", caption: "Main reception and lobby", image: "photo-1519494026892-80bbd2d6fd0d" },
  { category: "Doctors", caption: "Consultant physicians on rounds", image: "photo-1622902046580-2b47f47f5471" },
  { category: "Facilities", caption: "Modern operation theatre", image: "photo-1551190822-a9333d879b1f" },
  { category: "Medical Technology", caption: "Digital imaging suite", image: "photo-1516549655169-df83a0774514" },
  { category: "Patient Care", caption: "Nursing care on the ward", image: "photo-1538108149393-fbbd81895907" },
  { category: "Hospital", caption: "Private patient room", image: "photo-1586773860418-d37222d8fce3" },
  { category: "Doctors", caption: "Surgical team preparing for theatre", image: "photo-1551076805-e1869033e561" },
  { category: "Facilities", caption: "Intensive Care Unit", image: "photo-1587351021355-a479a299d2f9" },
  { category: "Events", caption: "Community health awareness camp", image: "photo-1576091160399-112ba8d25d1d" },
  { category: "Medical Technology", caption: "Laboratory diagnostics", image: "photo-1579154204601-01588f351e67" },
  { category: "Patient Care", caption: "Pediatric ward", image: "photo-1584515979956-d9f6e5d09982" },
  { category: "Hospital", caption: "Hospital exterior at dusk", image: "photo-1519494080410-f9aa76cb4283" },
];

export type CareerListing = {
  title: string;
  department: string;
  location: string;
  type: string;
};

export const CAREERS: CareerListing[] = [
  { title: "Staff Nurse", department: "Nursing", location: "Bhakkar", type: "Full-Time" },
  { title: "Consultant Radiologist", department: "Radiology", location: "Bhakkar", type: "Full-Time" },
  { title: "Laboratory Technologist", department: "Laboratory", location: "Bhakkar", type: "Full-Time" },
  { title: "Front Desk Officer", department: "Patient Services", location: "Bhakkar", type: "Full-Time" },
  { title: "Pharmacist", department: "Pharmacy", location: "Bhakkar", type: "Full-Time" },
  { title: "Physiotherapist", department: "Rehabilitation", location: "Bhakkar", type: "Part-Time" },
  { title: "Biomedical Engineer", department: "Facilities", location: "Bhakkar", type: "Full-Time" },
  { title: "Billing Executive", department: "Finance", location: "Bhakkar", type: "Full-Time" },
];

export const PARTNERS = [
  "State Life Insurance",
  "Jubilee Health Insurance",
  "EFU Health",
  "Sehat Sahulat Programme",
  "Adamjee Life",
  "TPL Insurance",
] as const;

export const JOURNEY_STEPS = [
  { step: "01", icon: "CalendarCheck", title: "Book Appointment", detail: "Choose a doctor and time that works for you, online or by phone." },
  { step: "02", icon: "Stethoscope", title: "Meet Your Doctor", detail: "A focused consultation to understand your symptoms and history." },
  { step: "03", icon: "FlaskConical", title: "Diagnosis", detail: "Targeted testing and imaging to confirm the right diagnosis." },
  { step: "04", icon: "ClipboardPlus", title: "Treatment Plan", detail: "A personalized plan, whether medical, surgical, or therapeutic." },
  { step: "05", icon: "HeartPulse", title: "Follow-Up", detail: "Ongoing monitoring to support a full and lasting recovery." },
] as const;

export const WHY_CHOOSE_US = [
  { icon: "Stethoscope", title: "Expert Medical Team", detail: "Specialists across 25+ departments with decades of combined experience." },
  { icon: "ScanLine", title: "Advanced Medical Technology", detail: "Digital imaging, modern OTs, and accredited diagnostic labs." },
  { icon: "Siren", title: "24/7 Emergency Care", detail: "Trauma-trained staff and a dedicated emergency department, always open." },
  { icon: "Building2", title: "Modern Facilities", detail: "Private rooms, ICU, CCU, and patient-first spaces throughout." },
  { icon: "HeartHandshake", title: "Personalized Treatment", detail: "Care plans built around your history, not a standard checklist." },
  { icon: "ShieldCheck", title: "Patient Safety", detail: "Rigorous infection control and sterilization protocols at every step." },
  { icon: "Wallet", title: "Affordable Healthcare", detail: "Transparent pricing and health packages designed for real budgets." },
  { icon: "LayoutGrid", title: "Comprehensive Services", detail: "From routine checkups to complex surgery, all under one roof." },
] as const;

export const TECHNOLOGY = [
  { icon: "ScanLine", title: "Advanced Diagnostic Equipment", detail: "Digital X-ray, CT, and ultrasound for precise, fast diagnostics." },
  { icon: "Database", title: "Digital Patient Records", detail: "Secure electronic records accessible across every department." },
  { icon: "Cpu", title: "Modern Surgical Technology", detail: "Laparoscopic and minimally invasive surgical systems." },
  { icon: "Image", title: "Digital Imaging", detail: "High-resolution imaging with radiologist review and reporting." },
  { icon: "FlaskConical", title: "Laboratory Automation", detail: "Automated analyzers for faster, more accurate lab results." },
  { icon: "Activity", title: "Patient Monitoring", detail: "Continuous vital-sign monitoring across ICU and CCU." },
  { icon: "HeartPulse", title: "Modern ICU Equipment", detail: "Ventilators and monitoring systems for critical care." },
] as const;
