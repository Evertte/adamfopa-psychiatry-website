import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import SWRegister from "@/components/site/SWRegister";
import AssistantWidgetClient from "@/components/assistant/AssistantWidgetClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://adamfopa-psychiatry-website.vercel.app"),
  title: "Adamfopa Outpatient Psychiatry, PLLC | Psychiatry in MA & NH",
  description:
    "Outpatient psychiatric care in Massachusetts and New Hampshire—serving Boston, Worcester, Leominster, Clinton, and beyond. Telehealth and in-person visits with a collaborative, patient-first approach.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  manifest: "/manifest.webmanifest",
  themeColor: "#0f172a",
  verification: {
    google: "DhU1UWmEJ-m_LNsVUUT41Db2v5d0puk966EpQ5PqiLs",
  },
  openGraph: {
    title: "Adamfopa Outpatient Psychiatry, PLLC | Psychiatry in MA & NH",
    description:
      "Outpatient psychiatric care in Massachusetts and New Hampshire—serving Boston, Worcester, Leominster, Clinton, and beyond. Telehealth and in-person visits with a collaborative, patient-first approach.",
    url: "https://adamfopa-psychiatry-website.vercel.app",
    images: [
      {
        url: "https://adamfopa-psychiatry-website.vercel.app/adamfopa.png",
        width: 1200,
        height: 630,
        alt: "Adamfopa Psychiatry",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://adamfopa-psychiatry-website.vercel.app/adamfopa.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <Script
          id="ld-json"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              "@id": "https://adamfopa-psychiatry-website.vercel.app/#org",
              name: "Adamfopa Outpatient Psychiatry, PLLC",
              url: "https://adamfopa-psychiatry-website.vercel.app",
              image: "https://adamfopa-psychiatry-website.vercel.app/adamfopa.png",
              telephone: "+1-978-648-3935",
              email: "adamfopapsychiatry@gmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "1097 Central Street",
                addressLocality: "Leominster",
                addressRegion: "MA",
                addressCountry: "US",
              },
              areaServed: [
                {
                  "@type": "City",
                  name: "Boston",
                  addressRegion: "MA",
                },
                {
                  "@type": "City",
                  name: "Worcester",
                  addressRegion: "MA",
                },
                {
                  "@type": "City",
                  name: "Leominster",
                  addressRegion: "MA",
                },
                {
                  "@type": "City",
                  name: "Clinton",
                  addressRegion: "MA",
                },
                {
                  "@type": "State",
                  name: "Massachusetts",
                },
                {
                  "@type": "State",
                  name: "New Hampshire",
                },
              ],
              medicalSpecialty: [
                "Psychiatry",
                "Telepsychiatry",
                "Medication Management",
              ],
              sameAs: [
                "https://www.psychologytoday.com/us/psychiatrists/edmund-adem-clinton-ma/1508770",
                "https://care.headway.co/providers/edmund-adem?utm_source=pem&utm_medium=direct_link&utm_campaign=129389",
              ],
            }),
          }}
        />
        <SiteHeader />
        {children}
        <SiteFooter />
        <AssistantWidgetClient />
        <SWRegister />
      </body>
    </html>
  );
}
