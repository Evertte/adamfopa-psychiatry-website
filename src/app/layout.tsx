import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import SWRegister from "@/components/site/SWRegister";

export const metadata: Metadata = {
  title: "Adamfopa Outpatient Psychiatry, PLLC",
  description:
    "Outpatient psychiatric care with telehealth and in-person visits. Request an appointment online.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  manifest: "/manifest.webmanifest",
  themeColor: "#0f172a",
  openGraph: {
    title: "Adamfopa Outpatient Psychiatry, PLLC",
    description:
      "Outpatient psychiatric care with telehealth and in-person visits. Request an appointment online.",
    images: [
      {
        url: "/adamfopa.png",
        width: 1200,
        height: 630,
        alt: "Adamfopa Psychiatry",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/adamfopa.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <SiteHeader />
        {children}
        <SiteFooter />
        <SWRegister />
      </body>
    </html>
  );
}
