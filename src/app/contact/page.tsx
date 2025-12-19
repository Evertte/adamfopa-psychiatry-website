import ContactForm from "./ContactForm";

export default async function ContactPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const visitParam = typeof params?.visit === "string" ? params.visit : "";
  const defaultVisit =
    visitParam === "telehealth"
      ? "telehealth"
      : visitParam === "inperson"
        ? "inperson"
        : "";
  const mapSrc =
    "https://www.google.com/maps?q=1097+Central+Street+Leominster+MA&output=embed";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="bg-white/70">
        <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
              Request an appointment
            </p>
            <h1 className="text-3xl font-semibold md:text-4xl">
              Contact Adamfopa Psychiatry
            </h1>
            <p className="max-w-3xl text-base text-slate-600">
              Telehealth and in-person options. Average response is typically within one business day.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <a
                href="tel:+19786483935"
                className="inline-flex items-center justify-center rounded-full bg-teal-500 px-5 py-3 text-sm font-semibold text-slate-950 hover-lift hover-glow-invert transition hover:bg-teal-400 focus:outline-none focus:ring-4 focus:ring-teal-200"
              >
                Call the practice
              </a>
              <span className="text-xs text-slate-600">
                Prefer to talk? Call for quick scheduling questions or book via the form below if you prefer email.
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
            <span className="rounded-full bg-slate-100 px-3 py-1 ring-1 ring-slate-200">
              Secure form
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 ring-1 ring-slate-200">
              Licensed in MA &amp; NH
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 ring-1 ring-slate-200">
              Telehealth instructions provided after scheduling
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-14">
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <ContactForm defaultVisit={defaultVisit} />
        </div>

        <p className="mt-4 text-xs text-slate-500">
          Please do not include sensitive medical details in this form. This website form is not for emergencies. If you are in crisis, call 911 or go to the nearest emergency room.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-900">
            Office location (in-person visits)
          </p>
          <p className="mt-1 text-sm text-slate-600">
            1097 Central Street, Leominster, MA. Telehealth available across MA &amp; NH.
          </p>
          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
            <iframe
              title="1097 Central Street, Leominster, MA office map"
              src={mapSrc}
              width="100%"
              height="320"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0 }}
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </main>
  );
}
