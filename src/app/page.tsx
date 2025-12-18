import Hero from "@/components/home/Hero";
import VisitOptions from "@/components/home/VisitOptions";
import HowItWorks from "@/components/home/HowItWorks";
import Conditions from "@/components/home/Conditions";
import ProviderPreview from "@/components/home/ProviderPreview";
import FAQ from "@/components/home/FAQ";
import Image from "next/image";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
                Trusted &amp; featured on
              </p>
              <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">
                Psychology Today and Headway approved
              </h2>
              <p className="text-sm text-slate-600">
                Adamfopa Psychiatry, PLLC is recognized by nationally respected directories for delivering ethical, high-quality mental health care.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://www.psychologytoday.com/us/psychiatrists/edmund-adem-clinton-ma/1508770"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 shadow-sm hover-lift"
              >
                <Image
                  src="/psychology-today-badge.png"
                  alt="Psychology Today badge"
                  width={160}
                  height={60}
                  className="h-12 w-auto object-contain"
                />
              </a>
              <a
                href="https://care.headway.co/providers/edmund-adem?utm_source=pem&utm_medium=direct_link&utm_campaign=129389"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 shadow-sm hover-lift"
              >
                <Image
                  src="/headway-badge.png"
                  alt="Headway badge"
                  width={160}
                  height={60}
                  className="h-12 w-auto object-contain"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
      <VisitOptions />
      <HowItWorks />
      <Conditions />
      <ProviderPreview />
      <FAQ />
    </main>
  );
}
