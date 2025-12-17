import { faqItems } from "@/content/home";

export default function FAQ() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-14 md:py-18">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
            FAQs
          </p>
          <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
            Answers to common questions
          </h2>
          <p className="max-w-2xl text-base text-slate-600">
            How scheduling works, what to expect during visits, and safety details.
          </p>
        </div>
        <div className="rounded-full bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
          Telehealth instructions provided after scheduling
        </div>
      </div>

      <div className="mt-6 grid gap-3">
        {faqItems.map((item) => (
          <details
            key={item.q}
            className="group rounded-3xl border border-slate-200 bg-white p-5 hover-lift"
          >
            <summary className="cursor-pointer list-none">
              <div className="flex items-start justify-between gap-4">
                <span className="text-base font-semibold text-slate-900">
                  {item.q}
                </span>

                <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition group-open:rotate-45">
                  +
                </span>
              </div>
            </summary>

            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {item.a}
            </p>
          </details>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
        For emergencies, call 911. This website form is not monitored for urgent messages.
      </div>
    </section>
  );
}
