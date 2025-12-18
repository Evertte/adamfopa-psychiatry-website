import { Banknote, CreditCard, FileText, Shield } from "lucide-react";
import Link from "next/link";

const selfPay = [
  { label: "Initial evaluation", href: "/contact" },
  { label: "Follow-up (med management)", href: "/contact" },
  { label: "Consultation / second opinion", href: "/contact" },
];

const payments = [
  "ACH bank transfer",
  "Check",
  "PayPal",
  "Venmo",
];

const acceptedInsurers = [
  "Aetna",
  "Carelon Behavioral Health",
  "Cigna and Evernorth",
  "Optum",
  "Oscar Health",
  "Oxford",
  "Quest Behavior health",
  "Tufts",
];

export default function FeesAndInsurancePage() {
  return (
    <main className="bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-6xl px-6 py-14 md:py-18">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
            Fees &amp; Insurance
          </p>
          <h1 className="text-3xl font-semibold md:text-4xl">
            Transparent fees and flexible options
          </h1>
          <p className="max-w-3xl text-base text-slate-600">
            We’ll review costs, superbill options, and payment methods with you before scheduling so there are no surprises.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 md:items-start">
          <div className="flex h-full flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <Shield className="h-5 w-5 text-teal-700" />
              Insurance accepted
            </div>
            <div className="grid gap-2 md:grid-cols-2">
              {acceptedInsurers.map((name) => (
                <span
                  key={name}
                  className="rounded-2xl bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-800 ring-1 ring-slate-200"
                >
                  {name}
                </span>
              ))}
            </div>
            <p className="text-sm text-slate-700">
              If your insurance isn&apos;t listed, don&apos;t worry—contact the provider to verify.
            </p>
            <Link
              href="/contact"
              className="mt-auto inline-flex w-fit items-center gap-2 text-sm font-semibold text-teal-700 hover-link-underline"
            >
              Verify your insurance →
            </Link>
          </div>

          <div className="flex h-full flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <FileText className="h-5 w-5 text-teal-700" />
              Self-pay pricing
            </div>
            <div className="space-y-2 text-sm text-slate-700">
              {selfPay.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-200"
                >
                  <span className="font-semibold text-slate-900">
                    {item.label}
                  </span>
                  <Link
                    href={item.href}
                    className="text-sm font-semibold text-teal-700 hover-link-underline"
                  >
                    See provider →
                  </Link>
                </div>
              ))}
              <p className="text-xs text-slate-600">
                Rates may vary by visit type and complexity; confirmed prior to scheduling.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2 md:items-start">
          <div className="flex h-full flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <CreditCard className="h-5 w-5 text-teal-700" />
              Payment methods
            </div>
            <ul className="space-y-2 text-sm text-slate-700">
              {payments.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-200" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-slate-600">
              Payment is verified and confirmed by the provider before scheduling.
            </p>
          </div>

          <div className="flex h-full flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <Banknote className="h-5 w-5 text-teal-700" />
              Finances
            </div>
            <p className="text-sm text-slate-700">
              Fees are reviewed with you ahead of time. Sliding scale may be available; ask to see if you are eligible.
            </p>
            <Link
              href="/contact"
              className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-teal-700 hover-link-underline"
            >
              Apply for sliding scale →
            </Link>
            <p className="text-xs text-slate-600">
              We provide receipts and superbills upon request for out-of-network reimbursement and HSA/FSA documentation.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
