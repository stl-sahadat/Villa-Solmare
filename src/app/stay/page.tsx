import React from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Book from "@/components/Book";
import Footer from "@/components/Footer";
import { villa, navigation } from "@/config/solmare.config";

export const metadata: Metadata = {
  title: `Book Your Stay | Reservations | ${villa.site.name}`,
  description: `Reserve your stay at ${villa.site.name}. Rates from ৳85,000 / night with dynamic calculation and zero hidden charges.`,
  alternates: {
    canonical: `${villa.site.url}/stay`,
  },
  openGraph: {
    title: `Book Your Stay | ${villa.site.name}`,
    description: "Submit your reservation inquiry with instant BDT rates and calendar verification.",
    url: `${villa.site.url}/stay`,
    siteName: villa.site.name,
    images: [{ url: villa.site.ogImage, width: 1200, height: 630, alt: "Book Your Stay at Villa Solmare" }],
  },
};

export default function StayPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-primary/20 selection:text-foreground">
      <Header items={navigation} />
      <main className="pt-24 md:pt-32">
        <Book />
      </main>
      <Footer />
    </div>
  );
}
