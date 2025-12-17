import Link from "next/link";

const services = [
  {
    title: "Initial psychiatric evaluation",
    desc: "A thorough intake to understand your history, goals, and current concerns. Includes a collaborative treatment plan.",
    length: "60–75 minutes",
  },
  {
    title: "Medication management follow-up",
    desc: "Focused visits to review response, side effects, and adjust medications as needed with clear next steps.",
    length: "25–30 minutes",
  },
  {
    title: "Consultation / second opinion",
    desc: "A concise review of current treatment with recommendations you can discuss with your care team.",
    length: "45–60 minutes",
  },
];

const expectations = [
  "Telehealth and in-person options; same paced approach either way.",
  "Clear communication on next steps and follow-up timing.",
  "Coordination with your therapist or PCP when helpful.",
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

        <div className="mt-10 grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">What to expect</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {expectations.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-200" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/new-patients"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover-link-underline"
            >
              New patient details →
            </Link>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">Duration &amp; fees</p>
            <p className="mt-2 text-sm text-slate-600">
              Visit length varies by service. For current fees, insurance, and payment details, see our fees and insurance page.
            </p>
            <Link
              href="/fees-and-insurance"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover-link-underline"
            >
              View fees &amp; insurance →
            </Link>
          </div>
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
