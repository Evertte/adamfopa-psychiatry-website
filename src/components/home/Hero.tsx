import Image from "next/image";
import { heroContent } from "@/content/home";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0">
        <Image
          src="/hero.jpg"
          alt="Calm clinic setting."
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/55 to-slate-950/30" />
      </div>

      <div className="relative mx-auto flex min-h-[560px] max-w-6xl items-center px-6 py-20 md:py-24">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-100 ring-1 ring-white/15 backdrop-blur">
            {heroContent.overline}
          </div>
          <h1 className="text-4xl font-semibold leading-tight md:text-[44px] md:leading-[1.1]">
            {heroContent.title}
          </h1>
          <p className="text-lg leading-relaxed text-slate-100">
            {heroContent.subtitle}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={heroContent.primaryCta.href}
              className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-teal-400 px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-sm hover-lift hover-glow-invert transition hover:bg-teal-300 focus:outline-none focus:ring-4 focus:ring-teal-200"
            >
              {heroContent.primaryCta.label}
            </a>
            <a
              href={heroContent.secondaryCta.href}
              className="inline-flex min-w-[180px] items-center justify-center rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold text-white hover-lift hover-glow transition hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-white/30"
            >
              {heroContent.secondaryCta.label}
            </a>
          </div>

          <p className="text-xs font-semibold uppercase tracking-wide text-teal-100">
            Serving patients across Massachusetts &amp; New Hampshire
          </p>

          <div className="w-full max-w-xl">
            <div className="rounded-3xl border border-white/12 bg-white/10 p-4 backdrop-blur shadow-xl">
              <div className="grid gap-2 sm:grid-cols-3">
                {heroContent.stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl bg-white/12 px-4 py-3 text-sm ring-1 ring-white/12"
                  >
                    <p className="text-slate-200">{item.label}</p>
                    <p className="font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
