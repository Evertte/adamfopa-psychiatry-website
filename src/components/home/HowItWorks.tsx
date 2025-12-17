import { CalendarDays, ClipboardList, Stethoscope } from "lucide-react";
import { howItWorks } from "@/content/home";

function Step({
  n,
  title,
  desc,
  Icon,
}: {
  n: string;
  title: string;
  desc: string;
  Icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="group relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover-lift focus-within:ring-4 focus-within:ring-teal-100">
      <div className="absolute left-6 top-6 flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 ring-1 ring-teal-100">
        <Icon className="h-5 w-5" />
      </div>
      <div className="ml-16">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 items-center rounded-full bg-slate-100 px-2.5 text-xs font-semibold text-slate-700">
            Step {n}
          </span>
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">{desc}</p>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-18">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
              What to expect
            </p>
            <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
              A clear path from request to first visit
            </h2>
            <p className="text-base text-slate-600">
              Steps are paced and collaborative so you always know what comes next.
            </p>
          </div>

          <a
            href="/new-patients"
            className="text-sm font-semibold text-teal-700 hover:text-teal-800"
          >
            New patient info →
          </a>
        </div>

        <div className="relative mt-8 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm">
          <div className="pointer-events-none absolute left-10 right-10 top-1/2 hidden -translate-y-1/2 md:block">
            <div className="mx-auto h-px max-w-5xl bg-slate-200" />
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {howItWorks.map((step) => {
              const iconMap = {
                "1": CalendarDays,
                "2": ClipboardList,
                "3": Stethoscope,
              } as const;
              const Icon = iconMap[step.n as keyof typeof iconMap] ?? CalendarDays;
              return (
                <Step
                  key={step.n}
                  n={step.n}
                  title={step.title}
                  desc={step.desc}
                  Icon={Icon}
                />
              );
            })}
          </div>

          <p className="mt-6 text-sm text-slate-600">
            Expect clear communication, paced visits, and coordinated care when helpful.
          </p>
        </div>
      </div>
    </section>
  );
}
