"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const LINKS = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/new-patients", label: "New Patients" },
  { href: "/fees-and-insurance", label: "Fees & Insurance" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  // Close menu on Escape
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Prevent background scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur relative">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm font-semibold text-slate-900">
          Adamfopa Outpatient Psychiatry, PLLC
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              className="hover-link-underline hover-glow hover:text-slate-900"
              href={l.href}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Link
          href="/contact"
          className="hidden rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover-lift hover-glow-invert transition hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-200 md:inline-flex"
        >
          Request appointment
        </Link>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/contact"
            className="inline-flex rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover-lift hover-glow transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-teal-100"
          >
            Request
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-900 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-teal-100"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel (animated) */}
      <div
        className={[
          "md:hidden",
          "absolute inset-x-0 top-full",
          "transition-all duration-200 ease-out motion-reduce:transition-none",
          open ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
      >
        {/* Backdrop */}
        <button
          aria-label="Close menu backdrop"
          onClick={() => setOpen(false)}
          className={[
            "fixed inset-0 z-40 bg-slate-900/20",
            "transition-opacity duration-200 ease-out motion-reduce:transition-none",
            open ? "opacity-100" : "opacity-0",
          ].join(" ")}
        />

        {/* Panel */}
        <div
          className={[
            "relative z-50 border-t border-slate-200 bg-white",
            "transition-transform transition-opacity duration-200 ease-out motion-reduce:transition-none",
            open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
          ].join(" ")}
        >
          <div className="mx-auto max-w-6xl px-6 py-4">
            <nav className="flex flex-col gap-2">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-900 hover-glow transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-teal-100"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="mt-4 grid gap-2">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex w-full items-center justify-center rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white hover-glow-invert transition hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-200"
              >
                Request appointment
              </Link>

              <a
                href="tel:+10000000000"
                onClick={() => setOpen(false)}
                className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 hover-glow transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-teal-100"
              >
                Call
              </a>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Serving the Worcester area • Licensed in MA &amp; NH
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
