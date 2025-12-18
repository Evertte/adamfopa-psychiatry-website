import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const highlights = [
  "Medication management with clear follow-up",
  "Telehealth & in-person options",
  "Collaborative with your PCP/therapist",
];

const badges = ["Board certified", "Patient-first", "Licensed MA & NH"];

export default function ProviderPreview() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14 md:py-18">
      <div className="grid gap-6 rounded-3xl bg-slate-50 p-6 md:grid-cols-[1fr_1.1fr] md:items-center md:p-10">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <Image
            src="/adamfopa.png"
            alt="Provider portrait."
            width={720}
            height={900}
            className="h-[480px] w-full object-cover object-center md:h-[560px] lg:h-[600px]"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/55 via-slate-950/20 to-transparent p-5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-white">
              <span className="rounded-full bg-white/20 px-3 py-1 ring-1 ring-white/25">
                Telehealth &amp; in-person
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15">
                Licensed MA &amp; NH
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-5 md:max-w-xl">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
              Provider
            </p>
            <h3 className="text-3xl font-semibold text-slate-900">
              Edmund Adem, MSN, RN, PMHNP-BC
            </h3>
            <p className="text-base text-slate-600">
              I am a Psychiatric Nurse Practitioner-BC offering a combination of diverse clinical experience, academic excellence, leadership, compassion, teamwork, collaboration, and strong interpersonal skills. Committed to providing quality, culturally competent, and evidence-based care to assist patients attain optimal outcomes.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-800">
            {badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full bg-white px-3 py-1 ring-1 ring-slate-200"
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="grid gap-2 text-sm text-slate-700">
            {highlights.map((item) => (
              <div
                key={item}
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-3 py-2 ring-1 ring-slate-200"
              >
                <Check className="h-4 w-4 text-teal-600" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover-link-underline"
            >
              View full bio
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-teal-600 px-5 py-3 text-sm font-semibold text-white hover-lift hover-glow-invert transition hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-200"
            >
              Request appointment
            </Link>
          </div>

          <div className="flex flex-wrap gap-3 rounded-2xl bg-white px-4 py-3 text-xs text-slate-700 ring-1 ring-slate-200">
            <span>Average response &lt; 24 hours</span>
            <span className="hidden h-1 w-1 rounded-full bg-slate-300 md:inline-block" />
            <span>Coordinates with your care team when helpful</span>
          </div>
        </div>
      </div>
    </section>
  );
}
