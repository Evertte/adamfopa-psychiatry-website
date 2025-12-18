import Link from "next/link";
import Image from "next/image";

const services = [
  {
    title: "Initial psychiatric evaluation",
    desc: "A thorough intake to understand your history, goals, and current concerns. Includes a collaborative treatment plan.",
    length: "Time depends on condition",
  },
  {
    title: "Medication management follow-up",
    desc: "Focused visits to review response, side effects, and adjust medications as needed with clear next steps.",
    length: "Time depends on condition",
  },
  {
    title: "Consultation / second opinion",
    desc: "A concise review of current treatment with recommendations you can discuss with your care team.",
    length: "Time depends on condition",
  },
];

const expectations = [
  "Telehealth and in-person options; same paced approach either way.",
  "Clear communication on next steps and follow-up timing.",
  "Coordination with your therapist or PCP when helpful.",
];

const specialties = [
  "ADHD",
  "Anxiety",
  "Bipolar Disorder",
  "Borderline Personality (BPD)",
  "Chronic Impulsivity",
  "Coping Skills",
  "Depression",
  "Developmental Disorders",
  "Dissociative Disorders (DID)",
  "Family Conflict",
  "Mood Disorders",
  "Obsessive-Compulsive (OCD)",
  "Oppositional Defiance (ODD)",
  "Psychosis",
  "Sleep or Insomnia",
  "Stress",
  "Suicidal Ideation",
  "Trauma and PTSD",
];

export default function ServicesPage() {
  return (
    <main className="bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-6xl px-6 py-14 md:py-18">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
            Services
          </p>
          <h1 className="text-3xl font-semibold md:text-4xl">
            Care tailored to where you are
          </h1>
          <p className="max-w-3xl text-base text-slate-600">
            Thoughtful evaluation, medication management, and collaborative planning for adults, with options for telehealth and in-person visits.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-stretch">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm md:order-1">
            <Image
              src="/service.png"
              alt="Care approach"
              width={900}
              height={700}
              className="h-[360px] w-full object-cover md:h-[460px]"
            />
          </div>

          <div className="flex h-full flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:order-2">
            <div>
              <p className="text-sm font-semibold text-slate-900">Approach</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                My approach is rooted in trauma-informed care and grounded in empathy, respect, and non-judgment. I strive to create a welcoming space where you feel safe, seen, and heard. Every step of our work together is designed to support your autonomy and personal growth.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-800">
                <span className="rounded-full bg-slate-100 px-3 py-1 ring-1 ring-slate-200">
                  Telehealth &amp; in-person
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 ring-1 ring-slate-200">
                  Licensed in MA &amp; NH
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 ring-1 ring-slate-200">
                  Insurance accepted
                </span>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-sm font-semibold text-slate-900">
                  What to expect
                </p>
                <ul className="mt-2 space-y-2 text-sm text-slate-600">
                  {expectations.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-200" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/new-patients"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover-link-underline"
                >
                  New patient details →
                </Link>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-sm font-semibold text-slate-900">
                  Duration &amp; fees
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  Visit length varies by service. Fees and insurance are reviewed and verified before scheduling.
                </p>
                <Link
                  href="/fees-and-insurance"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover-link-underline"
                >
                  View fees &amp; insurance →
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
                Specialties &amp; expertise
              </p>
              <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
                Areas of focus
              </h2>
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {specialties.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover-lift"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {service.desc}
              </p>
              <div className="mt-auto pt-4">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-800">
                  <span className="rounded-full bg-slate-100 px-3 py-1 ring-1 ring-slate-200">
                    {service.length}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 ring-1 ring-slate-200">
                    Telehealth &amp; in-person
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-30 bg-white/90 px-6 py-3 shadow-[0_-8px_30px_-24px_rgba(15,23,42,0.45)] backdrop-blur md:inset-auto md:bottom-6 md:left-1/2 md:w-auto md:-translate-x-1/2 md:rounded-full md:border md:border-slate-200 md:px-6 md:py-2">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 md:gap-4">
          <div className="hidden text-xs font-semibold uppercase tracking-wide text-slate-600 md:block">
            Ready to schedule?
          </div>
          <div className="flex flex-1 items-center justify-end gap-2">
            <Link
              href="/contact?visit=telehealth"
              className="inline-flex items-center justify-center rounded-full bg-teal-500 px-4 py-2 text-sm font-semibold text-slate-950 hover-lift hover-glow-invert transition hover:bg-teal-400 focus:outline-none focus:ring-4 focus:ring-teal-200"
            >
              Request telehealth
            </Link>
            <Link
              href="/contact?visit=inperson"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover-lift hover-glow transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-teal-100"
            >
              Request in-person
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
