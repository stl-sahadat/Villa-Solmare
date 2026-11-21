"use client";

import React, { useState, useId } from "react";
import { villa } from "@/config/solmare.config";
import { Slate } from "@/components/ui/Slate";
import { Reveal } from "@/components/ui/Reveal";

export interface FaqProps {
  id?: string;
  index?: string;
  label?: string;
  heading?: string;
  items?: typeof villa.faq.items;
  static?: boolean;
}

export function Faq({
  id = villa.faq.id,
  index = villa.faq.index,
  label = villa.faq.label,
  heading = villa.faq.heading,
  items = villa.faq.items,
  static: isStatic,
}: FaqProps) {
  const [openIndex, setOpenIndex] = useState(-1);
  const baseId = useId();
  const padding = "px-5 sm:px-8 md:px-12";

  return (
    <section
      id={id}
      aria-labelledby={`${baseId}-h`}
      className={`bg-background py-16 text-foreground sm:py-24 md:py-36 ${padding}`}
    >
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-12 md:gap-10">
        {/* Left Column: Heading & Slate */}
        <div className="md:col-span-5">
          <Slate index={index} label={label} className="text-muted-foreground" />
          <Reveal variant="rise" static={isStatic} as="h2" className="mt-6">
            <span id={`${baseId}-h`} className="block text-[clamp(2.3rem,4.6vw,4.25rem)]">
              {heading}
            </span>
          </Reveal>
        </div>

        {/* Right Column: Accordion Items */}
        <div className="border-b border-border md:col-span-7">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            const regionId = `${baseId}-a${idx}`;

            return (
              <div key={item.q} className="border-t border-border">
                <h3 className="font-sans">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={regionId}
                    onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-medium md:text-xl"
                  >
                    <span>{item.q}</span>
                    <span aria-hidden="true" className="relative h-4 w-4 shrink-0">
                      <span className="absolute top-1/2 left-0 h-px w-full bg-current" />
                      <span
                        className="absolute top-0 left-1/2 h-full w-px bg-current transition-transform duration-500 [transition-timing-function:var(--ease-door)]"
                        style={{ transform: isOpen ? "scaleY(0)" : "scaleY(1)" }}
                      />
                    </span>
                  </button>
                </h3>

                <div
                  id={regionId}
                  role="region"
                  aria-label={item.q}
                  className="grid transition-[grid-template-rows] duration-700 [transition-timing-function:var(--ease-door)]"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden" {...(!isOpen ? ({ inert: "" } as any) : {})}>
                    <p className="max-w-[60ch] pb-6 text-muted-foreground">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
