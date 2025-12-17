import Link from "next/link";
import Image from "next/image";
import { Check, MapPin, Phone, ShieldCheck } from "lucide-react";

const highlights = [
  "Patient-first, paced visits",
  "Medication management with clear follow-up",
  "Collaborative with your care team",
];

export default function AboutPage() {
  return (
    <main className="bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-6xl px-6 py-14 md:py-18">
        <div className="grid gap-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:grid-cols-[0.9fr_1.1fr] md:items-center md:p-10">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
            <Image
              src="/adamfopa.png"
              alt="Adam Fopa, MD"
              width={720}
              height={900}
              className="h-[400px] w-full object-cover object-top md:h-[520px]"
              priority
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/50 via-slate-950/15 to-transparent p-5 text-white">
              <p className="text-base font-semibold">Adam Fopa, MD</p>
              <p className="text-sm text-slate-100">
                Adult outpatient psychiatry • Telehealth &amp; in-person
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
                About
              </p>
              <h1 className="text-3xl font-semibold md:text-4xl">
                Patient-focused outpatient psychiatry
              </h1>
              <p className="text-base text-slate-600">
                Calm, collaborative visits with clear communication, thoughtful prescribing, and coordination with your PCP or therapist when helpful.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-800">
              <span className="rounded-full bg-slate-100 px-3 py-1 ring-1 ring-slate-200">
                Board certified
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 ring-1 ring-slate-200">
                Telehealth &amp; in-person
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 ring-1 ring-slate-200">
                Licensed in MA &amp; NH
              </span>
            </div>

            <div className="grid gap-2 text-sm text-slate-700">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="inline-flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2 ring-1 ring-slate-200"
                >
                  <Check className="h-4 w-4 text-teal-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              Approach: respectful, paced visits with time for questions, clear next steps, and medication decisions made collaboratively.
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-teal-500 px-5 py-3 text-sm font-semibold text-slate-950 hover-lift hover-glow-invert transition hover:bg-teal-400 focus:outline-none focus:ring-4 focus:ring-teal-200"
              >
                Request appointment
              </Link>
              <Link
                href="tel:+15085551234"
                className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover-link-underline"
              >
                <Phone className="h-4 w-4" />
                Call (508) 555-1234
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 md:items-start">
          <div className="flex h-full flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <ShieldCheck className="h-5 w-5 text-teal-700" />
              Licensure &amp; telehealth
            </div>
            <p className="text-sm text-slate-700">
              Licensed to provide outpatient psychiatric care in Massachusetts and New Hampshire, with both telehealth and in-person options.
            </p>
            <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700 ring-1 ring-slate-200">
              <MapPin className="mr-2 inline-block h-4 w-4 text-teal-700" />
              In-person: Leominster, MA • Telehealth: MA &amp; NH
            </div>
          </div>

          <div className="flex h-full flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold text-slate-900">Availability</div>
            <p className="text-sm text-slate-700">
              Response is typically within one business day. Telehealth instructions and in-person details are provided after scheduling.
            </p>
            <Link
              href="/contact"
              className="inline-flex w-fit items-center justify-center rounded-full bg-teal-500 px-5 py-3 text-sm font-semibold text-slate-950 hover-lift hover-glow-invert transition hover:bg-teal-400 focus:outline-none focus:ring-4 focus:ring-teal-200"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
