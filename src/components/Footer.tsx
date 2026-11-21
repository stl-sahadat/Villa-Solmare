"use client";

import React, { useRef, useEffect, useState } from "react";
import { villa } from "@/config/solmare.config";
import { Roll } from "@/components/ui/Roll";

export interface FooterProps {
  name?: string;
  contact?: typeof villa.contact;
  legal?: typeof villa.legal;
  footer?: typeof villa.footer;
  privacyLabel?: string;
  static?: boolean;
}

export function Footer({
  name = villa.site.name,
  contact = villa.contact,
  legal = villa.legal,
  footer = villa.footer,
  privacyLabel = villa.book.fields.privacy,
  static: isStatic,
}: FooterProps) {
  const wordmarkRef = useRef<HTMLParagraphElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (isStatic) return;
    const el = wordmarkRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { rootMargin: "0px 0px -5% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isStatic]);

  const currentYear = new Date().getFullYear();
  const padding = "px-5 sm:px-8 md:px-12";
  const linkHover =
    "relative after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 after:[transition-timing-function:var(--ease-door)] hover:after:scale-x-100 focus-visible:after:scale-x-100";

  return (
    <footer className="overflow-hidden bg-card text-card-foreground">
      <div className={`mx-auto grid max-w-7xl gap-10 pt-16 sm:grid-cols-2 md:grid-cols-12 md:pt-24 ${padding}`}>
        {/* Brand & Description */}
        <div className="md:col-span-5">
          <p className="font-display text-3xl">{name}</p>
          <p className="mt-3 max-w-[30ch] text-muted-foreground">{villa.site.description}</p>
        </div>

        {/* Contact Links */}
        <div className="md:col-span-3 md:col-start-7">
          <h2 className="text-sm font-medium text-muted-foreground font-sans tracking-normal">
            {footer.contact}
          </h2>
          <ul className="mt-4 grid gap-1.5 text-lg">
            <li>
              <a href={`tel:${contact.phone.replace(/[\s-]/g, "")}`} className={linkHover}>
                <Roll>{contact.phone}</Roll>
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${contact.whatsapp}`}
                rel="noopener noreferrer"
                target="_blank"
                className={linkHover}
              >
                <Roll>WhatsApp</Roll>
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className={`${linkHover} break-all`}>
                <Roll>{contact.email}</Roll>
              </a>
            </li>
            <li>
              <a
                href={`https://www.instagram.com/${contact.instagram}/`}
                rel="noopener noreferrer"
                target="_blank"
                className={linkHover}
              >
                <Roll>Instagram</Roll>
              </a>
            </li>
          </ul>
        </div>

        {/* Address */}
        <div className="md:col-span-3">
          <h2 className="text-sm font-medium text-muted-foreground font-sans tracking-normal">
            {footer.address}
          </h2>
          <address className="mt-4 text-lg leading-relaxed not-italic">
            {contact.address.street}
            <br />
            {contact.address.city}
            <br />
            {contact.address.countryName}
          </address>
        </div>
      </div>

      {/* Giant Architectural Wordmark */}
      <p
        ref={wordmarkRef}
        aria-hidden="true"
        className="mt-16 px-3 text-center font-display text-[clamp(3.6rem,16.5vw,17rem)] leading-[0.8] font-[340] tracking-[-0.045em] whitespace-nowrap select-none pointer-events-none md:mt-24"
        style={{
          clipPath: isInView || isStatic ? "inset(0 0 -0.1em 0)" : "inset(100% 0 -0.1em 0)",
          transition: isStatic ? "none" : "clip-path 1400ms var(--ease-door)",
        }}
      >
        {name}
      </p>

      {/* Copyright Sub-Bar */}
      <div
        className={`mx-auto mt-10 flex max-w-7xl flex-wrap justify-between gap-x-8 gap-y-2 border-t border-border pt-6 pb-28 text-sm text-muted-foreground md:pb-8 ${padding}`}
      >
        <p>
          © {currentYear} {legal.owner}. {footer.rights}
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {legal.cin ? (
            <span className="tnum">CIN {legal.cin}</span>
          ) : null}
          <a href={legal.privacyUrl} className={linkHover}>
            {privacyLabel}
          </a>
          {footer.credit && (
            <a
              href={footer.credit.href}
              target="_blank"
              rel="noopener noreferrer"
              className={linkHover}
            >
              {footer.credit.label}
            </a>
          )}
        </div>
        {footer.note ? <p className="w-full text-xs">{footer.note}</p> : null}
      </div>
    </footer>
  );
}
