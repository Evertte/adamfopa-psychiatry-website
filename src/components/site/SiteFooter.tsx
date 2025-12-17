import Link from "next/link";

const links = [
  { label: "Services", href: "/services" },
  { label: "New Patients", href: "/new-patients" },
  { label: "Fees & Insurance", href: "/fees-and-insurance" },
  { label: "Contact", href: "/contact" },
];

export default function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-slate-200 bg-white text-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div className="space-y-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500 text-sm font-semibold text-slate-950">
              AP
            </div>
            <p className="text-sm font-semibold">Adamfopa Psychiatry, PLLC</p>
            <p className="text-sm text-slate-600">
              Private outpatient psychiatry with telehealth and in-person options across MA &amp; NH.
            </p>
            <Link
              href="/contact"
              className="inline-flex w-fit items-center justify-center rounded-full bg-teal-500 px-5 py-3 text-sm font-semibold text-slate-950 hover-lift hover-glow-invert transition hover:bg-teal-400 focus:outline-none focus:ring-4 focus:ring-teal-200"
            >
              Request appointment
            </Link>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold">Explore</p>
            <div className="grid gap-2 text-sm text-slate-700">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover-link-underline hover:text-teal-700"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold">Contact</p>
            <div className="text-sm text-slate-700">
              <p>(508) 555-1234</p>
              <p>info@adamfopa.com</p>
              <p className="mt-2">Leominster, MA</p>
              <p>Licensed in MA &amp; NH</p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold">Practice notes</p>
            <div className="text-sm text-slate-700">
              <p>Average response: &lt; 24 hours</p>
              <p>Telehealth instructions after scheduling</p>
              <p className="mt-2">
                Not for emergencies. Call 911 or visit the nearest ER if in crisis.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-xs text-slate-500 md:flex md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Adamfopa Psychiatry, PLLC. All rights reserved.</p>
          <div className="mt-3 flex gap-4 md:mt-0">
            <Link href="/privacy" className="hover-link-underline hover:text-teal-700">
              Privacy
            </Link>
            <Link href="/terms" className="hover-link-underline hover:text-teal-700">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
