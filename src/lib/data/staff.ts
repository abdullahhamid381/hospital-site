export type StaffCategory = "leadership" | "nursing" | "academic" | "general";

export const STAFF_CATEGORIES: { key: StaffCategory; label: string }[] = [
  { key: "leadership", label: "Leadership & Administration" },
  { key: "nursing", label: "Nursing & Clinical Support" },
  { key: "academic", label: "Academic & Teaching Faculty" },
  { key: "general", label: "General Staff" },
];

export function staffCategoryLabel(key: StaffCategory): string {
  return STAFF_CATEGORIES.find((c) => c.key === key)?.label ?? key;
}

export type Qualification = { degree: string; institution: string; year: string };
export type ExpertiseItem = { title: string; detail: string };
export type ResponsibilityItem = { title: string; detail: string };
export type TimelineEntry = { period: string; title: string; place: string; detail: string };
export type ScheduleEntry = { day: string; time: string; location: string };
export type Publication = { title: string; journal: string; year: string; link: string };
export type Award = { title: string; org: string; year: string; detail: string };
export type Membership = { title: string; org: string };

export type StaffMember = {
  id: number;
  slug: string;
  name: string;
  role: string;
  category: StaffCategory;
  department: string;
  image: string;
  experience: string;
  shortBio: string;
  biography: string;
  qualifications: Qualification[];
  languages: string[];
  expertise: ExpertiseItem[];
  responsibilities: ResponsibilityItem[];
  experienceTimeline: TimelineEntry[];
  schedule: ScheduleEntry[];
  publications: Publication[];
  awards: Award[];
  memberships: Membership[];
  email: string;
  phone: string;
  office: string;
  appointmentEnabled: boolean;
  featured: boolean;
  sortOrder: number;
  isVisible: boolean;
  createdAt: string | null;
  updatedAt: string | null;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isArrayOf<T>(value: unknown, max: number, isItem: (v: unknown) => v is T): value is T[] {
  if (!Array.isArray(value) || value.length > max) return false;
  return value.every(isItem);
}

export function isValidQualifications(value: unknown): value is Qualification[] {
  return isArrayOf(value, 12, (v): v is Qualification => {
    const q = v as Partial<Qualification> | null;
    return !!q && isNonEmptyString(q.degree) && isNonEmptyString(q.institution) && isNonEmptyString(q.year);
  });
}

export function isValidStringList(value: unknown, max = 10): value is string[] {
  return isArrayOf(value, max, (v): v is string => isNonEmptyString(v));
}

export function isValidTitleDetailList(value: unknown, max = 12): value is { title: string; detail: string }[] {
  return isArrayOf(value, max, (v): v is { title: string; detail: string } => {
    const i = v as Partial<{ title: string; detail: string }> | null;
    return !!i && isNonEmptyString(i.title) && isNonEmptyString(i.detail);
  });
}

export function isValidTimeline(value: unknown): value is TimelineEntry[] {
  return isArrayOf(value, 12, (v): v is TimelineEntry => {
    const t = v as Partial<TimelineEntry> | null;
    return !!t && isNonEmptyString(t.period) && isNonEmptyString(t.title) && isNonEmptyString(t.place) && isNonEmptyString(t.detail);
  });
}

export function isValidSchedule(value: unknown): value is ScheduleEntry[] {
  return isArrayOf(value, 14, (v): v is ScheduleEntry => {
    const s = v as Partial<ScheduleEntry> | null;
    return !!s && isNonEmptyString(s.day) && isNonEmptyString(s.time) && isNonEmptyString(s.location);
  });
}

export function isValidPublications(value: unknown): value is Publication[] {
  return isArrayOf(value, 20, (v): v is Publication => {
    const p = v as Partial<Publication> | null;
    return !!p && isNonEmptyString(p.title) && isNonEmptyString(p.journal) && isNonEmptyString(p.year) && typeof p.link === "string";
  });
}

export function isValidAwards(value: unknown): value is Award[] {
  return isArrayOf(value, 20, (v): v is Award => {
    const a = v as Partial<Award> | null;
    return !!a && isNonEmptyString(a.title) && isNonEmptyString(a.org) && isNonEmptyString(a.year) && typeof a.detail === "string";
  });
}

export function isValidMemberships(value: unknown): value is Membership[] {
  return isArrayOf(value, 20, (v): v is Membership => {
    const m = v as Partial<Membership> | null;
    return !!m && isNonEmptyString(m.title) && isNonEmptyString(m.org);
  });
}

type DefaultStaffEntry = Omit<StaffMember, "id" | "sortOrder" | "isVisible" | "createdAt" | "updatedAt">;

/** In-memory fallback/seed source, used when staff_members is empty. */
export const DEFAULT_STAFF: StaffMember[] = ([
  {
    slug: "dr-nasreen-iqbal",
    name: "Dr. Nasreen Iqbal",
    role: "Chief Executive Officer & Medical Director",
    category: "leadership",
    department: "Executive Administration",
    image: "photo-1559839734-2b71ea197ec2",
    experience: "22+ Years",
    shortBio: "Leads hospital strategy and clinical governance, with two decades of experience in healthcare administration.",
    biography:
      "Dr. Nasreen Iqbal oversees the hospital's clinical and operational strategy, having spent over two decades bridging medical practice and healthcare management. She joined as a consultant physician before moving into executive leadership, and now focuses on quality of care, accreditation, and long-term capacity planning.\n\nHer leadership philosophy centers on keeping frontline clinical staff empowered while ensuring the hospital meets the highest standards of patient safety and governance.",
    qualifications: [
      { degree: "MBBS", institution: "King Edward Medical University", year: "1998" },
      { degree: "MHA (Healthcare Administration)", institution: "Aga Khan University", year: "2006" },
    ],
    languages: ["English", "Urdu"],
    expertise: [
      { title: "Clinical Governance", detail: "Setting and auditing hospital-wide quality and safety standards." },
      { title: "Strategic Planning", detail: "Long-term capacity, service-line, and accreditation planning." },
    ],
    responsibilities: [
      { title: "Executive Leadership", detail: "Overall accountability for clinical and operational performance." },
      { title: "Accreditation & Compliance", detail: "Ensures the hospital meets national healthcare quality standards." },
    ],
    experienceTimeline: [
      { period: "2015 — Present", title: "Chief Executive Officer & Medical Director", place: "AMM Hospital", detail: "Executive oversight of hospital operations and clinical strategy." },
      { period: "2006 — 2015", title: "Deputy Medical Director", place: "AMM Hospital", detail: "Led quality improvement and accreditation initiatives." },
      { period: "1998 — 2006", title: "Consultant Physician", place: "Regional Teaching Hospital", detail: "General medicine consultant with a focus on internal medicine." },
    ],
    schedule: [],
    publications: [],
    awards: [
      { title: "Healthcare Leadership Excellence Award", org: "Pakistan Healthcare Forum", year: "2021", detail: "Recognized for hospital-wide quality improvement initiatives." },
    ],
    memberships: [
      { title: "Fellow", org: "Pakistan Medical Association" },
      { title: "Member", org: "International Hospital Federation" },
    ],
    email: "ceo@ammhospital.pk",
    phone: "+92 300 0000101",
    office: "Administration Block, Room 101",
    appointmentEnabled: false,
    featured: true,
  },
  {
    slug: "kashif-raza",
    name: "Kashif Raza",
    role: "Chief Administrative Officer",
    category: "leadership",
    department: "Hospital Administration",
    image: "photo-1612349317150-e413f6a5b16d",
    experience: "17+ Years",
    shortBio: "Oversees hospital operations, facilities, and administrative services across all departments.",
    biography:
      "Kashif Raza manages the day-to-day administrative operations of the hospital, including facilities management, procurement, and cross-department coordination. With a background in healthcare operations management, he focuses on making sure clinical teams have the resources and infrastructure they need.",
    qualifications: [
      { degree: "MBA (Healthcare Management)", institution: "LUMS", year: "2009" },
    ],
    languages: ["English", "Urdu", "Punjabi"],
    expertise: [
      { title: "Operations Management", detail: "Coordinating administrative functions across all hospital departments." },
      { title: "Facilities & Procurement", detail: "Infrastructure planning and vendor management." },
    ],
    responsibilities: [
      { title: "Facilities Management", detail: "Maintenance, safety, and infrastructure across the hospital campus." },
      { title: "Budget Oversight", detail: "Departmental budgeting and resource allocation." },
    ],
    experienceTimeline: [
      { period: "2012 — Present", title: "Chief Administrative Officer", place: "AMM Hospital", detail: "Leads administrative operations hospital-wide." },
      { period: "2007 — 2012", title: "Operations Manager", place: "AMM Hospital", detail: "Managed facilities and support services." },
    ],
    schedule: [],
    publications: [],
    awards: [],
    memberships: [{ title: "Member", org: "Healthcare Financial Management Association" }],
    email: "admin.office@ammhospital.pk",
    phone: "+92 300 0000102",
    office: "Administration Block, Room 104",
    appointmentEnabled: false,
    featured: false,
  },
  {
    slug: "farah-yousaf",
    name: "Farah Yousaf",
    role: "Chief Nursing Officer",
    category: "nursing",
    department: "Nursing Services",
    image: "photo-1594824476967-48c8b964273f",
    experience: "19+ Years",
    shortBio: "Leads nursing services hospital-wide, with a focus on patient safety and clinical excellence in nursing care.",
    biography:
      "Farah Yousaf leads the hospital's nursing department, setting standards for patient care, infection control, and staff development across every ward. She began her career as a bedside nurse in the ICU and has spent the last decade in nursing leadership roles, mentoring nursing staff and modernizing care protocols.",
    qualifications: [
      { degree: "BScN", institution: "University of Health Sciences Lahore", year: "2005" },
      { degree: "MScN (Nursing Administration)", institution: "Aga Khan University", year: "2013" },
    ],
    languages: ["English", "Urdu"],
    expertise: [
      { title: "Patient Safety", detail: "Hospital-wide nursing safety protocols and incident reduction." },
      { title: "Infection Control", detail: "Ward-level infection prevention standards and audits." },
      { title: "Staff Development", detail: "Nursing training, mentorship, and continuing education." },
    ],
    responsibilities: [
      { title: "Nursing Leadership", detail: "Oversees nursing staff and standards across all departments." },
      { title: "Quality Improvement", detail: "Leads nursing-related quality and safety initiatives." },
    ],
    experienceTimeline: [
      { period: "2018 — Present", title: "Chief Nursing Officer", place: "AMM Hospital", detail: "Hospital-wide nursing leadership." },
      { period: "2013 — 2018", title: "Nursing Supervisor, ICU", place: "AMM Hospital", detail: "Led critical care nursing teams." },
      { period: "2005 — 2013", title: "Staff Nurse, ICU", place: "AMM Hospital", detail: "Bedside critical care nursing." },
    ],
    schedule: [
      { day: "Monday – Friday", time: "8:00 AM – 4:00 PM", location: "Nursing Administration Office" },
    ],
    publications: [],
    awards: [
      { title: "Excellence in Nursing Leadership", org: "Pakistan Nursing Council", year: "2020", detail: "Recognized for hospital-wide nursing quality initiatives." },
    ],
    memberships: [{ title: "Member", org: "Pakistan Nursing Council" }],
    email: "nursing.office@ammhospital.pk",
    phone: "+92 300 0000103",
    office: "Nursing Administration, 2nd Floor",
    appointmentEnabled: false,
    featured: true,
  },
  {
    slug: "adeel-anwar",
    name: "Adeel Anwar",
    role: "Senior Charge Nurse, ICU",
    category: "nursing",
    department: "Intensive Care Unit",
    image: "photo-1582750433449-648ed127bb54",
    experience: "12+ Years",
    shortBio: "Coordinates day-to-day critical care nursing in the ICU, specializing in ventilator management and patient monitoring.",
    biography:
      "Adeel Anwar leads the nursing team in the Intensive Care Unit, coordinating shift schedules, patient monitoring protocols, and critical-care training for junior nursing staff. He is certified in advanced critical care nursing and has been part of the ICU team since it was established.",
    qualifications: [
      { degree: "BScN", institution: "University of Health Sciences Lahore", year: "2012" },
      { degree: "Critical Care Nursing Certification", institution: "Shifa College of Nursing", year: "2016" },
    ],
    languages: ["English", "Urdu"],
    expertise: [
      { title: "Critical Care Nursing", detail: "Advanced monitoring and care for critically ill patients." },
      { title: "Ventilator Management", detail: "Coordinating respiratory support protocols with physicians." },
    ],
    responsibilities: [{ title: "Shift Coordination", detail: "Manages ICU nursing shift schedules and staffing." }],
    experienceTimeline: [
      { period: "2019 — Present", title: "Senior Charge Nurse, ICU", place: "AMM Hospital", detail: "Leads ICU nursing shift operations." },
      { period: "2012 — 2019", title: "Staff Nurse, ICU", place: "AMM Hospital", detail: "Critical care bedside nursing." },
    ],
    schedule: [
      { day: "Rotating Shifts", time: "As scheduled", location: "Intensive Care Unit" },
    ],
    publications: [],
    awards: [],
    memberships: [],
    email: "icu.nursing@ammhospital.pk",
    phone: "+92 300 0000104",
    office: "ICU Nursing Station",
    appointmentEnabled: false,
    featured: false,
  },
  {
    slug: "prof-zubair-ahmed",
    name: "Prof. Dr. Zubair Ahmed",
    role: "Professor of Medicine & Director of Medical Education",
    category: "academic",
    department: "Medical Education",
    image: "photo-1622902046580-2b47f47f5471",
    experience: "25+ Years",
    shortBio: "Directs medical education and training programmes while continuing to see patients as a senior internal medicine consultant.",
    biography:
      "Prof. Dr. Zubair Ahmed directs the hospital's medical education programme, overseeing training for residents and continuing education for consultant staff, while maintaining an active internal medicine clinical practice. He has published widely on postgraduate medical training and chronic disease management.",
    qualifications: [
      { degree: "MBBS", institution: "King Edward Medical University", year: "1993" },
      { degree: "FCPS (Internal Medicine)", institution: "College of Physicians & Surgeons Pakistan", year: "1999" },
      { degree: "PhD (Medical Education)", institution: "University of Health Sciences Lahore", year: "2011" },
    ],
    languages: ["English", "Urdu"],
    expertise: [
      { title: "Postgraduate Medical Training", detail: "Curriculum design and residency programme oversight." },
      { title: "Internal Medicine", detail: "Chronic disease management and general internal medicine consultation." },
    ],
    responsibilities: [
      { title: "Medical Education Leadership", detail: "Oversees resident training and continuing medical education." },
      { title: "Curriculum Development", detail: "Designs and reviews postgraduate training curricula." },
    ],
    experienceTimeline: [
      { period: "2014 — Present", title: "Professor & Director of Medical Education", place: "AMM Hospital", detail: "Leads medical education and training programmes." },
      { period: "2005 — 2014", title: "Associate Professor of Medicine", place: "AMM Hospital", detail: "Internal medicine teaching and clinical practice." },
      { period: "1999 — 2005", title: "Consultant Physician", place: "Regional Teaching Hospital", detail: "General internal medicine consultant." },
    ],
    schedule: [
      { day: "Monday, Wednesday", time: "2:00 PM – 5:00 PM", location: "Internal Medicine OPD" },
      { day: "Tuesday, Thursday", time: "9:00 AM – 12:00 PM", location: "Medical Education Office" },
    ],
    publications: [
      { title: "Postgraduate Medical Training Outcomes in Tertiary Care Hospitals", journal: "Journal of Pakistan Medical Association", year: "2019", link: "" },
      { title: "Chronic Disease Management in Resource-Limited Settings", journal: "International Journal of Internal Medicine", year: "2016", link: "" },
    ],
    awards: [
      { title: "Excellence in Medical Education", org: "Pakistan Medical & Dental Council", year: "2018", detail: "Recognized for contributions to postgraduate training." },
    ],
    memberships: [
      { title: "Fellow", org: "College of Physicians & Surgeons Pakistan" },
      { title: "Member", org: "Pakistan Society of Internal Medicine" },
    ],
    email: "medical.education@ammhospital.pk",
    phone: "+92 300 0000105",
    office: "Medical Education Block, Room 210",
    appointmentEnabled: true,
    featured: true,
  },
  {
    slug: "dr-rabia-sultan",
    name: "Dr. Rabia Sultan",
    role: "Associate Professor & Clinical Training Coordinator",
    category: "academic",
    department: "Clinical Training",
    image: "photo-1573496359142-b8d87734a5a2",
    experience: "14+ Years",
    shortBio: "Coordinates clinical training for medical students and residents while practicing as a general medicine consultant.",
    biography:
      "Dr. Rabia Sultan coordinates hands-on clinical training for medical students and residents rotating through the hospital, and consults in general medicine. She is particularly focused on strengthening clinical examination skills and evidence-based practice among trainees.",
    qualifications: [
      { degree: "MBBS", institution: "Allama Iqbal Medical College", year: "2004" },
      { degree: "FCPS (General Medicine)", institution: "College of Physicians & Surgeons Pakistan", year: "2010" },
    ],
    languages: ["English", "Urdu"],
    expertise: [
      { title: "Clinical Skills Training", detail: "Bedside teaching and clinical examination training for trainees." },
      { title: "General Medicine", detail: "Outpatient consultation and chronic disease management." },
    ],
    responsibilities: [{ title: "Clinical Training Coordination", detail: "Organizes ward rotations and bedside teaching schedules." }],
    experienceTimeline: [
      { period: "2017 — Present", title: "Associate Professor & Clinical Training Coordinator", place: "AMM Hospital", detail: "Coordinates trainee clinical rotations." },
      { period: "2010 — 2017", title: "Assistant Professor of Medicine", place: "AMM Hospital", detail: "General medicine consultant and teaching faculty." },
    ],
    schedule: [{ day: "Monday, Thursday", time: "10:00 AM – 1:00 PM", location: "General Medicine OPD" }],
    publications: [
      { title: "Improving Bedside Teaching Outcomes for Undergraduate Medical Students", journal: "Pakistan Journal of Medical Education", year: "2020", link: "" },
    ],
    awards: [],
    memberships: [{ title: "Member", org: "Pakistan Society of Internal Medicine" }],
    email: "clinical.training@ammhospital.pk",
    phone: "+92 300 0000106",
    office: "Medical Education Block, Room 214",
    appointmentEnabled: true,
    featured: false,
  },
  {
    slug: "waqas-nadeem",
    name: "Waqas Nadeem",
    role: "Head of Patient Services",
    category: "general",
    department: "Patient Services",
    image: "photo-1607990281513-2c110a25bd8c",
    experience: "10+ Years",
    shortBio: "Leads front-desk registration, patient experience, and support services across the hospital.",
    biography:
      "Waqas Nadeem oversees patient registration, front-desk operations, and overall patient experience at the hospital, working closely with clinical departments to reduce wait times and improve communication with patients and families.",
    qualifications: [{ degree: "BBA", institution: "Punjab University", year: "2013" }],
    languages: ["English", "Urdu", "Punjabi"],
    expertise: [{ title: "Patient Experience", detail: "Front-desk service standards and patient communication." }],
    responsibilities: [
      { title: "Registration & Front Desk", detail: "Oversees patient registration and front-desk operations." },
      { title: "Patient Experience", detail: "Coordinates improvements to patient journey and communication." },
    ],
    experienceTimeline: [
      { period: "2019 — Present", title: "Head of Patient Services", place: "AMM Hospital", detail: "Leads patient registration and front-desk teams." },
      { period: "2014 — 2019", title: "Patient Services Supervisor", place: "AMM Hospital", detail: "Supervised front-desk and registration staff." },
    ],
    schedule: [],
    publications: [],
    awards: [],
    memberships: [],
    email: "patient.services@ammhospital.pk",
    phone: "+92 300 0000107",
    office: "Main Reception, Ground Floor",
    appointmentEnabled: false,
    featured: false,
  },
  {
    slug: "sadia-kamal",
    name: "Sadia Kamal",
    role: "Human Resources Manager",
    category: "general",
    department: "Human Resources",
    image: "photo-1537368910025-700350fe46c7",
    experience: "9+ Years",
    shortBio: "Manages recruitment, staff development, and HR operations for the hospital's clinical and non-clinical teams.",
    biography:
      "Sadia Kamal leads the hospital's human resources function, from recruitment and onboarding to staff development and workplace policy, supporting both clinical and administrative teams across the organization.",
    qualifications: [{ degree: "MBA (Human Resource Management)", institution: "LUMS", year: "2015" }],
    languages: ["English", "Urdu"],
    expertise: [{ title: "Talent Acquisition", detail: "Recruitment and onboarding for clinical and support roles." }],
    responsibilities: [
      { title: "Recruitment", detail: "Manages hiring across clinical and administrative departments." },
      { title: "Staff Development", detail: "Coordinates training and professional development programmes." },
    ],
    experienceTimeline: [
      { period: "2020 — Present", title: "Human Resources Manager", place: "AMM Hospital", detail: "Leads HR operations hospital-wide." },
      { period: "2015 — 2020", title: "HR Officer", place: "AMM Hospital", detail: "Recruitment and employee relations." },
    ],
    schedule: [],
    publications: [],
    awards: [],
    memberships: [],
    email: "hr@ammhospital.pk",
    phone: "+92 300 0000108",
    office: "Administration Block, Room 108",
    appointmentEnabled: false,
    featured: false,
  },
] satisfies DefaultStaffEntry[]).map((s, i) => ({
  ...s,
  id: i + 1,
  sortOrder: i,
  isVisible: true,
  createdAt: null,
  updatedAt: null,
}));
