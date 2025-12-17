export const heroContent = {
  overline: "Adamfopa Psychiatry, PLLC",
  title: "Private Outpatient Psychiatry Care",
  subtitle:
    "Telehealth and in-person visits with a collaborative, patient-first approach. Together we’ll design a plan that fits your goals and pace.",
  primaryCta: { label: "Request an appointment", href: "/contact" },
  secondaryCta: { label: "Call the practice", href: "tel:+15085551234" },
  stats: [
    { label: "Visit options", value: "Telehealth &   in-person" },
    { label: "Licensed in", value: "MA & NH" },
    { label: "Response time", value: "less than 24 hours" },
  ],
};

export const visitOptions = [
  {
    title: "Telehealth",
    desc: "Secure video visits from home with clear next steps and simple follow-up.",
    bullets: [
      "Available across MA & NH",
      "HIPAA-compliant platform",
      "Flexible scheduling",
    ],
    href: "/contact?visit=telehealth",
    badges: ["Secure video", "Superbills available"],
  },
  {
    title: "In-person",
    desc: "Office visits in a calm setting for those who prefer face-to-face conversations.",
    bullets: [
      "Leominster, MA office",
      "Convenient to Worcester area",
      "Accessible building",
    ],
    href: "/contact?visit=inperson",
    badges: ["Calm office", "Easy parking"],
  },
];

export const howItWorks = [
  {
    n: "1",
    title: "Request & schedule",
    desc: "Choose telehealth or in-person; we’ll confirm a time and share simple instructions.",
  },
  {
    n: "2",
    title: "Brief intake",
    desc: "A short form so we understand your goals and history before you arrive.",
  },
  {
    n: "3",
    title: "First visit",
    desc: "Thoughtful evaluation, clear recommendations, and next steps if we’re a good fit.",
  },
];

export const conditionGroups = [
  {
    title: "Mood & anxiety",
    items: ["Depression", "Generalized anxiety", "Panic symptoms", "OCD"],
  },
  {
    title: "Attention & focus",
    items: ["Adult ADHD", "Executive functioning concerns", "Motivation"],
  },
  {
    title: "Sleep & wellness",
    items: ["Insomnia", "Shift-work sleep challenges", "Stress & burnout"],
  },
  {
    title: "Stabilization & management",
    items: [
      "Bipolar spectrum",
      "Medication management",
      "Medication questions/second opinions",
    ],
  },
];

export const faqItems = [
  {
    q: "Do you accept insurance?",
    a: "We can review insurance and payment options during scheduling. If you are out-of-network, we may be able to provide a superbill upon request.",
  },
  {
    q: "How does telehealth work?",
    a: "Telehealth visits are held securely by video. After scheduling, you will receive simple instructions and what to expect before your appointment.",
  },
  {
    q: "What happens during the first visit?",
    a: "The first visit includes a thoughtful evaluation, discussion of your goals, and a plan for next steps if care is a good fit.",
  },
  {
    q: "What if I’m in crisis?",
    a: "If you are in immediate danger or experiencing a mental health emergency, please call 911 or go to the nearest emergency room.",
  },
];
