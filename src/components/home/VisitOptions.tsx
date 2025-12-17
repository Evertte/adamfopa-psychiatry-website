import {
  ArrowRight,
  Building2,
  Check,
  MapPin,
  Shield,
  Video,
} from "lucide-react";
import { visitOptions } from "@/content/home";

function OptionCard({
  title,
  desc,
  bullets,
  href,
  badges,
  tone,
  Icon,
}: {
  title: string;
  desc: string;
  bullets: string[];
  href: string;
  badges?: string[];
  tone: "telehealth" | "inperson";
  Icon: React.ComponentType<{ className?: string }>;
}) {
  const isTelehealth = tone === "telehealth";
  const baseCard =
    "group relative overflow-hidden rounded-3xl border p-8 shadow-sm hover-lift focus:outline-none focus:ring-4 focus:ring-teal-100";
  const cardTone = isTelehealth
    ? "border-teal-100/70 bg-gradient-to-br from-teal-50/80 via-white to-white"
    : "border-slate-200 bg-gradient-to-br from-slate-50/80 via-white to-white";

  return (
    <a
      href={href}
      className={`${baseCard} ${cardTone}`}
    >
      <div className="absolute right-4 top-4 h-8 w-8 rounded-full bg-white/60 blur-xl" />
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
              isTelehealth ? "bg-teal-50 text-teal-700 ring-1 ring-teal-100" : "bg-slate-100 text-slate-800 ring-1 ring-slate-200"
            }`}
          >
            <Icon className="h-5 w-5" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {desc}
            </p>
          </div>
        </div>

        <span className="text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-teal-700">
          →
        </span>
      </div>

      <div className="mt-5 grid gap-2">
        {bullets.map((b) => (
          <div
            key={b}
            className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-2 text-sm text-slate-800 ring-1 ring-slate-200"
          >
            <Check className="h-4 w-4 text-teal-600" />
            <span>{b}</span>
          </div>
        ))}
      </div>

      {badges && badges.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {badges.map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center gap-1 rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200"
            >
              <Shield className="h-3.5 w-3.5 text-teal-600" />
              {badge}
            </span>
          ))}
        </div>
      )}

      <div className="mt-6 border-t border-slate-100 pt-4">
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold hover-link-underline ${
            isTelehealth
              ? "bg-teal-50 text-teal-800 ring-1 ring-teal-100"
              : "bg-slate-100 text-slate-900 ring-1 ring-slate-200"
          }`}
        >
          {isTelehealth ? "Schedule telehealth" : "Schedule in-person"}
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </a>
  );
}

export default function VisitOptions() {
  const iconMap = {
    Telehealth: Video,
    "In-person": Building2,
  } as const;

  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-14 md:py-18">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
              Visit options
            </p>
            <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
              Choose the visit style that fits you best
            </h2>
            <p className="text-base text-slate-600">
              Both telehealth and in-person appointments follow the same thoughtful, paced approach with time for your questions.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
            Superbills available • Secure video visits
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {visitOptions.map((option) => {
            const Icon = iconMap[option.title as keyof typeof iconMap] ?? MapPin;
            const tone = option.title.toLowerCase().includes("telehealth")
              ? "telehealth"
              : "inperson";
            return (
              <OptionCard
                key={option.title}
                title={option.title}
                desc={option.desc}
                bullets={option.bullets}
                badges={option.badges}
                href={option.href}
                tone={tone}
                Icon={Icon}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
