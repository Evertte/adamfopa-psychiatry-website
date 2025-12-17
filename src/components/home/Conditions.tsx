import { conditionGroups } from "@/content/home";

export default function Conditions() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-14 md:py-18">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
            Conditions commonly treated
          </p>
          <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
            Focused on concerns adults face most
          </h2>
          <p className="max-w-2xl text-base text-slate-600">
            Care is individualized and guided by a comprehensive psychiatric evaluation. Medication plans are collaborative and paced.
          </p>
        </div>

        <div className="rounded-full bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
          Telehealth &amp; in-person options
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {conditionGroups.map((group) => (
          <div
            key={group.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover-lift"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">
                {group.title}
              </h3>
              <span className="h-2 w-2 rounded-full bg-teal-500" />
            </div>

            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {group.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
        This practice provides outpatient psychiatric care. If you are experiencing a mental health emergency, please call 911 or visit the nearest emergency room.
      </div>
    </section>
  );
}
