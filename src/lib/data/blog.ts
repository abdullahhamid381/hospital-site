export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readingTime: string;
  author: string;
  excerpt: string;
  content: string[];
  image: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "understanding-blood-pressure",
    title: "Understanding Blood Pressure: What Your Numbers Mean",
    category: "Heart Health",
    date: "2026-06-12",
    readingTime: "5 min read",
    author: "Dr. Imran Farooq",
    excerpt: "A clear guide to reading your blood pressure numbers and knowing when to be concerned.",
    content: [
      "Blood pressure is measured using two numbers: systolic and diastolic. Understanding what these represent is the first step to managing your cardiovascular health.",
      "A normal reading generally falls below 120/80 mmHg. Readings consistently above this may indicate hypertension, which increases the risk of heart disease and stroke over time.",
      "Regular monitoring, a balanced diet, and routine checkups with your physician are the most effective ways to keep your blood pressure within a healthy range.",
    ],
    image: "photo-1631815589968-fdb09a223b1e",
  },
  {
    slug: "childhood-vaccination-schedule",
    title: "The Complete Childhood Vaccination Schedule",
    category: "Children's Health",
    date: "2026-06-05",
    readingTime: "6 min read",
    author: "Dr. Ayesha Raza",
    excerpt: "A parent's guide to keeping your child's immunizations on track from birth to adolescence.",
    content: [
      "Vaccines protect children from serious, preventable diseases. Following a structured schedule ensures immunity builds at the right stages of development.",
      "Missed doses can be caught up, but staying on schedule offers the best protection during the periods children are most vulnerable.",
      "Our pediatric team maintains detailed vaccination records and sends reminders so no dose is missed.",
    ],
    image: "photo-1584515979956-d9f6e5d09982",
  },
  {
    slug: "eating-for-a-healthy-heart",
    title: "Eating for a Healthy Heart",
    category: "Nutrition",
    date: "2026-05-28",
    readingTime: "4 min read",
    author: "Hospital Nutrition Team",
    excerpt: "Simple dietary changes that make a measurable difference to cardiovascular health.",
    content: [
      "A heart-healthy diet emphasizes whole grains, vegetables, lean proteins, and healthy fats while limiting sodium and processed foods.",
      "Small, consistent changes — like swapping refined oils for healthier alternatives — compound into meaningful long-term benefits.",
      "Our nutrition team offers personalized dietary counselling alongside cardiology consultations for patients managing heart conditions.",
    ],
    image: "photo-1490645935967-10de6ba17061",
  },
  {
    slug: "managing-stress-and-mental-wellness",
    title: "Managing Stress in Daily Life",
    category: "Mental Wellness",
    date: "2026-05-14",
    readingTime: "5 min read",
    author: "Hospital Wellness Team",
    excerpt: "Practical strategies for recognizing and managing everyday stress before it affects your health.",
    content: [
      "Chronic stress affects sleep, digestion, and cardiovascular health. Recognizing the early signs is key to managing it effectively.",
      "Structured routines, physical activity, and open conversations with a healthcare provider all play a role in maintaining mental wellness.",
      "If stress begins to interfere with daily functioning, a consultation with our internal medicine team is a good first step.",
    ],
    image: "photo-1499209974431-9dddcece7f88",
  },
  {
    slug: "womens-health-checkups-by-age",
    title: "Women's Health Checkups by Age",
    category: "Women's Health",
    date: "2026-04-30",
    readingTime: "6 min read",
    author: "Dr. Sana Malik",
    excerpt: "A guide to the screenings women should prioritize at each stage of life.",
    content: [
      "Recommended screenings evolve with age, from routine reproductive health checks in your twenties to bone density screening later in life.",
      "Annual checkups help catch potential concerns early, when they are most treatable.",
      "Our gynecology department offers age-appropriate screening packages designed around these guidelines.",
    ],
    image: "photo-1571772805064-207c8435df79",
  },
  {
    slug: "hospital-expands-radiology-suite",
    title: "Hospital Expands Digital Radiology Suite",
    category: "Hospital Updates",
    date: "2026-04-18",
    readingTime: "3 min read",
    author: "Hospital Communications",
    excerpt: "New digital imaging equipment now allows for faster, more accurate diagnostics on-site.",
    content: [
      "Our radiology department has expanded with new digital X-ray and CT equipment, reducing wait times for imaging results.",
      "The upgrade supports faster diagnosis across every department, from emergency care to orthopedics.",
      "Patients can now expect same-day reporting for most standard imaging studies.",
    ],
    image: "photo-1516549655169-df83a0774514",
  },
];

export function getBlogPostBySlug(slug: string) {
  return BLOG_POSTS.find((b) => b.slug === slug);
}
