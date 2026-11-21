import React from "react";
import Link from "next/link";
import { villa } from "@/config/solmare.config";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-20 md:py-32">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← {villa.notFound.back}
        </Link>

        <h1 className="font-display text-4xl md:text-5xl font-[340]">{villa.privacy.title}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">{villa.privacy.description}</p>

        <div className="border-t border-border pt-8 space-y-6 text-muted-foreground leading-relaxed text-base">
          <p>
            When you submit a reservation inquiry for {villa.site.name}, the information provided (your name, email
            address, phone number, stay dates, and any optional notes) is collected solely for the purpose of communicating
            with you regarding your booking request, verifying calendar availability, and arranging your bespoke stay.
          </p>

          <p>
            Your personal information will never be sold, rented, or distributed to third-party advertisers. All records are
            managed securely with the highest data protection and privacy standards.
          </p>

          <p>
            You have the right to request access to, correction of, or deletion of your personal data at any time by
            contacting our property team at{" "}
            <a href={`mailto:${villa.contact.email}`} className="text-foreground underline">
              {villa.contact.email}
            </a>
            .
          </p>

          <div className="pt-4 text-xs font-mono text-muted-foreground border-t border-border/50">
            Address: Barura, Comilla, Bangladesh
          </div>
        </div>
      </div>
    </div>
  );
}
