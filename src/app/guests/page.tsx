import React from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Guests from "@/components/Guests";
import Footer from "@/components/Footer";
import { villa, navigation } from "@/config/solmare.config";

export const metadata: Metadata = {
  title: `Guest Reviews & Experiences | ${villa.site.name}`,
  description: `${villa.guests.heading} Rated ${villa.guests.rating}/5 across ${villa.guests.count} from stays booked direct and luxury partners.`,
  alternates: {
    canonical: `${villa.site.url}/guests`,
  },
  openGraph: {
    title: `Guest Reviews | ${villa.site.name}`,
    description: "Read verified guest experiences and memories from luxury stays at Villa Solmare.",
    url: `${villa.site.url}/guests`,
    siteName: villa.site.name,
    images: [{ url: villa.site.ogImage, width: 1200, height: 630, alt: "Guest Reviews" }],
  },
};

export default function GuestsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-primary/20 selection:text-foreground">
      <Header items={navigation} />
      <main className="pt-24 md:pt-32">
        <Guests />
      </main>
      <Footer />
    </div>
  );
}
