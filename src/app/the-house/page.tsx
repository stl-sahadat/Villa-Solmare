import React from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import House from "@/components/House";
import Footer from "@/components/Footer";
import { villa, navigation } from "@/config/solmare.config";

export const metadata: Metadata = {
  title: `The House & Architecture | ${villa.site.name}`,
  description: `${villa.intro.heading} — ${villa.intro.text}`,
  alternates: {
    canonical: `${villa.site.url}/the-house`,
  },
  openGraph: {
    title: `The House & Architecture | ${villa.site.name}`,
    description: villa.intro.text,
    url: `${villa.site.url}/the-house`,
    siteName: villa.site.name,
    images: [{ url: villa.site.ogImage, width: 1200, height: 630, alt: villa.intro.heading }],
  },
};

export default function TheHousePage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-primary/20 selection:text-foreground">
      <Header items={navigation} />
      <main className="pt-24 md:pt-32">
        <House />
      </main>
      <Footer />
    </div>
  );
}
