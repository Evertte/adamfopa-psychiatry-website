import Hero from "@/components/home/Hero";
import VisitOptions from "@/components/home/VisitOptions";
import HowItWorks from "@/components/home/HowItWorks";
import Conditions from "@/components/home/Conditions";
import ProviderPreview from "@/components/home/ProviderPreview";
import FAQ from "@/components/home/FAQ";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <VisitOptions />
      <HowItWorks />
      <Conditions />
      <ProviderPreview />
      <FAQ />
    </main>
  );
}
