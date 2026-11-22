import React from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Details from "@/components/Details";
import Footer from "@/components/Footer";
import { villa, navigation } from "@/config/solmare.config";

export const metadata: Metadata = {
  title: `Amenities & Surroundings | ${villa.site.name}`,
  description: `${villa.details.heading} — Private sea-view terrace, private chef, airport transfers, and beach proximity in Bangladesh.`,
  alternates: {
    canonical: `${villa.site.url}/amenities`,
  },
  openGraph: {
    title: `Amenities & Surroundings | ${villa.site.name}`,
    description: "Every luxury essential provided: fibre Wi-Fi, private chef, chauffeur pickup, and coastal gardens.",
    url: `${villa.site.url}/amenities`,
    siteName: villa.site.name,
    images: [{ url: villa.site.ogImage, width: 1200, height: 630, alt: "Amenities at Villa Solmare" }],
  },
};

export default function AmenitiesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-primary/20 selection:text-foreground">
      <Header items={navigation} />
      <main className="pt-24 md:pt-32">
        <Details />
      </main>
      <Footer />
    </div>
  );
}
