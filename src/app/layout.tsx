import type { Metadata, Viewport } from "next";
import "./globals.css";
import { villa } from "@/config/solmare.config";
import { LanguageProvider } from "@/context/LanguageContext";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4EADC" },
    { media: "(prefers-color-scheme: dark)", color: "#1A100A" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(villa.site.url),
  title: villa.site.title,
  description: villa.site.description,
  applicationName: villa.site.name,
  robots: { index: true, follow: true, "max-image-preview": "large" },
  category: "travel",
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    title: villa.site.title,
    description: villa.site.description,
    url: villa.site.url,
    siteName: villa.site.name,
    locale: "en_GB",
    type: "website",
    images: [{ url: villa.site.ogImage, width: 1200, height: 630, alt: villa.book.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: villa.site.title,
    description: villa.site.description,
    images: [villa.site.ogImage],
  },
  alternates: {
    canonical: villa.site.url,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${villa.site.url}/#website`,
      url: `${villa.site.url}/`,
      name: villa.site.name,
      inLanguage: "en",
      about: { "@id": `${villa.site.url}/#villa` },
    },
    {
      "@type": "VacationRental",
      "@id": `${villa.site.url}/#villa`,
      name: villa.site.name,
      description: villa.site.description,
      url: `${villa.site.url}/`,
      priceRange: `BDT ${villa.booking.priceFrom}+`,
      checkinTime: villa.booking.checkIn,
      checkoutTime: villa.booking.checkOut,
      
      address: {
        "@type": "PostalAddress",
        streetAddress: villa.contact.address.street,
        addressLocality: villa.contact.address.city,
        addressRegion: villa.contact.address.region,
        postalCode: villa.contact.address.postalCode,
        addressCountry: villa.contact.address.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: villa.contact.geo.lat,
        longitude: villa.contact.geo.lng,
      },
      containsPlace: {
        "@type": "Accommodation",
        additionalType: "EntirePlace",
        numberOfBedrooms: villa.rooms.bedrooms,
        numberOfBathroomsTotal: villa.rooms.bathrooms,
        occupancy: { "@type": "QuantitativeValue", value: villa.rooms.guests },
        floorSize: { "@type": "QuantitativeValue", value: villa.rooms.sqm, unitCode: "MTK" },
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${villa.site.url}/#faq`,
      mainEntity: villa.faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/fraunces.woff2" as="font" crossOrigin="" type="font/woff2" />
        <link
          rel="preload"
          href="/fonts/fraunces-italic.woff2"
          as="font"
          crossOrigin=""
          type="font/woff2"
        />
        <link rel="preload" href="/fonts/geist.woff2" as="font" crossOrigin="" type="font/woff2" />
        <link rel="preload" href="/fonts/charukola-round.ttf" as="font" crossOrigin="" type="font/ttf" />
        {/* Anti-FOUC theme & lang hydration script matching original */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=document.documentElement,s=localStorage.getItem("villa-theme"),c="system";var t=s||(c!=="system"?c:(matchMedia("(prefers-color-scheme: dark)").matches?"night":"day"));d.dataset.theme=t;var l=localStorage.getItem("villa-lang");if(l){d.lang=l;d.dataset.lang=l;if(l==="bn"){d.classList.add("font-bangla");}}}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
