export type HealthPackage = {
  slug: string;
  name: string;
  price: string;
  short: string;
  tests: string[];
};

export const PACKAGES: HealthPackage[] = [
  {
    slug: "basic-health-checkup",
    name: "Basic Health Checkup",
    price: "Rs. 3,500",
    short: "Essential screening for general wellness.",
    tests: ["Complete Blood Count", "Blood Sugar (Fasting)", "Urinalysis", "Blood Pressure Check", "BMI Assessment"],
  },
  {
    slug: "executive-health-package",
    name: "Executive Health Package",
    price: "Rs. 12,000",
    short: "Comprehensive screening for busy professionals.",
    tests: ["Full Body Panel", "Lipid Profile", "Liver & Kidney Function", "ECG", "Chest X-Ray", "Physician Consultation"],
  },
  {
    slug: "complete-family-package",
    name: "Complete Family Package",
    price: "Rs. 18,000",
    short: "Shared screening plan for up to four family members.",
    tests: ["Individual Blood Panels", "Blood Pressure Checks", "BMI Assessment", "Pediatric Screening", "Family Consultation"],
  },
  {
    slug: "womens-health-package",
    name: "Women's Health Package",
    price: "Rs. 9,500",
    short: "Focused screening for reproductive and hormonal health.",
    tests: ["Pap Smear", "Breast Examination", "Hormonal Panel", "Bone Density Screening", "Gynecology Consultation"],
  },
  {
    slug: "mens-health-package",
    name: "Men's Health Package",
    price: "Rs. 9,000",
    short: "Screening focused on cardiac and prostate health.",
    tests: ["Prostate Screening (PSA)", "Lipid Profile", "ECG", "Blood Sugar", "Physician Consultation"],
  },
  {
    slug: "senior-citizen-package",
    name: "Senior Citizen Package",
    price: "Rs. 14,000",
    short: "Comprehensive screening tailored for age 60+.",
    tests: ["Full Body Panel", "ECG", "Bone Density", "Vision & Hearing Check", "Geriatric Consultation"],
  },
  {
    slug: "diabetes-screening",
    name: "Diabetes Screening",
    price: "Rs. 4,000",
    short: "Focused screening for diabetes risk and management.",
    tests: ["Fasting Blood Sugar", "HbA1c", "Lipid Profile", "Kidney Function", "Physician Consultation"],
  },
  {
    slug: "heart-health-package",
    name: "Heart Health Package",
    price: "Rs. 11,000",
    short: "Cardiac risk assessment and screening.",
    tests: ["ECG", "Echocardiography", "Lipid Profile", "Cardiac Risk Assessment", "Cardiologist Consultation"],
  },
];

export function getPackageBySlug(slug: string) {
  return PACKAGES.find((p) => p.slug === slug);
}
