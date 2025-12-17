import Link from "next/link";
import {
  CalendarCheck,
  FileDown,
  Monitor,
  ShieldCheck,
} from "lucide-react";

const steps = [
  {
    title: "Request an appointment",
    desc: "Choose telehealth or in-person and share your availability.",
  },
  {
    title: "Complete the intake",
    desc: "A brief form to understand your goals, history, and current medications.",
  },
  {
    title: "First visit",
    desc: "Thoughtful evaluation, recommendations, and clear follow-up plan if care is a good fit.",
  },
];

const forms = [
  { label: "Intake form (PDF)", href: "/forms/intake.pdf" },
  { label: "Consent to treat (PDF)", href: "/forms/consent.pdf" },
  { label: "HIPAA notice (PDF)", href: "/forms/hipaa.pdf" },
];

const telehealthChecklist = [
  "Quiet, private space with reliable internet.",
  "Test your camera and audio before the visit.",
  "Have your ID and current medication list ready.",
  "Join a few minutes early to check your connection.",
];

const policies = [
  "This practice is outpatient only; emergencies are referred to 911 or the nearest ER.",
  "Cancellations: please provide at least 24 hours’ notice.",
  "Payment and insurance details are reviewed before scheduling.",
  "Telehealth availability depends on your location and licensure (MA & NH).",
];

export default function NewPatientsPage() {
  return (
    <main className="bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-6xl px-6 py-14 md:py-18">
        <div className="rounded-3xl bg-gradient-to-r from-slate-100 via-white to-slate-100 px-6 py-10 text-slate-900 shadow-lg ring-1 ring-slate-200 md:px-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
                New patients
              </p>
              <h1 className="text-3xl font-semibold md:text-4xl">
                What to expect as a new patient
              </h1>
              <p className="max-w-3xl text-base text-slate-600">
                A simple, paced process for telehealth or in-person visits. Here are the steps, forms, and details to help you get started.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-teal-500 px-5 py-3 text-sm font-semibold text-slate-950 hover-lift hover-glow-invert transition hover:bg-teal-400 focus:outline-none focus:ring-4 focus:ring-teal-200"
            >
              Request an appointment
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 md:items-start">
          <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="rounded-xl bg-teal-50 p-2 ring-1 ring-teal-100">
                <CalendarCheck className="h-5 w-5 text-teal-700" />
              </span>
              <h2 className="text-lg font-semibold text-slate-900">Process</h2>
            </div>
            <ol className="mt-4 space-y-3 text-sm text-slate-700">
              {steps.map((step, idx) => (
                <li key={step.title} className="flex gap-3 rounded-2xl bg-slate-50 px-3 py-2 ring-1 ring-slate-200">
                  <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-teal-50 text-xs font-semibold text-teal-700 ring-1 ring-teal-100">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-slate-900">{step.title}</p>
                    <p className="text-slate-600">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="rounded-xl bg-teal-50 p-2 ring-1 ring-teal-100">
                <FileDown className="h-5 w-5 text-teal-700" />
              </span>
              <h2 className="text-lg font-semibold text-slate-900">
                Forms download
              </h2>
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Complete these ahead of your visit if provided. We can also share them securely after scheduling.
            </p>
            <div className="mt-4 grid gap-3 text-sm text-teal-700">
              {forms.map((form) => (
                <Link
                  key={form.href}
                  href={form.href}
                  className="inline-flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 hover-lift hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-teal-100"
                >
                  <span className="font-semibold text-slate-900">
                    {form.label}
                  </span>
                  <span className="text-xs font-semibold text-teal-700">
                    Download
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 md:items-start">
          <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="rounded-xl bg-teal-50 p-2 ring-1 ring-teal-100">
                <Monitor className="h-5 w-5 text-teal-700" />
              </span>
              <h2 className="text-lg font-semibold text-slate-900">
                Telehealth checklist
              </h2>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {telehealthChecklist.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-200" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-xs text-slate-700 ring-1 ring-slate-200">
              Tip: Join a few minutes early to confirm your camera, mic, and connection.
            </div>
          </div>

          <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="rounded-xl bg-teal-50 p-2 ring-1 ring-teal-100">
                <ShieldCheck className="h-5 w-5 text-teal-700" />
              </span>
              <h2 className="text-lg font-semibold text-slate-900">
                Policies
              </h2>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {policies.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-200" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/fees-and-insurance"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover-link-underline"
            >
              View fees &amp; insurance →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
