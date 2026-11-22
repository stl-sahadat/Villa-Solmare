import React from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Walk from "@/components/Walk";
import Footer from "@/components/Footer";
import { villa, navigation } from "@/config/solmare.config";

export const metadata: Metadata = {
  title: `Inside the Sanctuary | Virtual Walkthrough | ${villa.site.name}`,
  description: "A virtual architectural walkthrough through the living room, artisanal kitchen, and master bedroom suite overlooking the Bay of Bengal.",
  alternates: {
    canonical: `${villa.site.url}/inside`,
  },
  openGraph: {
    title: `Inside the Sanctuary | ${villa.site.name}`,
    description: "Explore the crafted stone interiors, linen canopy beds, and panoramic terrace.",
    url: `${villa.site.url}/inside`,
    siteName: villa.site.name,
    images: [{ url: villa.site.ogImage, width: 1200, height: 630, alt: "Inside Villa Solmare" }],
  },
};

export default function InsidePage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-primary/20 selection:text-foreground">
      <Header items={navigation} />
      <main className="pt-24 md:pt-32">
        <Walk />
      </main>
      <Footer />
    </div>
  );
}
