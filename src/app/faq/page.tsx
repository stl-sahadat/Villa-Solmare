import React from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import { villa, navigation } from "@/config/solmare.config";

export const metadata: Metadata = {
  title: `Frequently Asked Questions | ${villa.site.name}`,
  description: "Check-in policies, directions via Marine Drive, airport transfers, amenities, and booking guidance.",
  alternates: {
    canonical: `${villa.site.url}/faq`,
  },
  openGraph: {
    title: `FAQ | ${villa.site.name}`,
    description: "All you need to know before your stay at Villa Solmare.",
    url: `${villa.site.url}/faq`,
    siteName: villa.site.name,
    images: [{ url: villa.site.ogImage, width: 1200, height: 630, alt: "Villa Solmare FAQ" }],
  },
};

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-primary/20 selection:text-foreground">
      <Header items={navigation} />
      <main className="pt-24 md:pt-32">
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
