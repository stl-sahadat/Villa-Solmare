"use client";

import React from "react";
import { CanvasSequence } from "@/components/ui/CanvasSequence";
import { Reveal } from "@/components/ui/Reveal";
import { villa } from "@/config/solmare.config";

export function Arrival({
  name = villa.site.name,
  sequence = villa.media.arrival,
  eyebrow = villa.arrival.eyebrow,
  tagline = villa.arrival.tagline,
  hint = villa.arrival.hint,
  alt = villa.arrival.alt,
  screens = villa.arrival.screens,
  loadingLabel = villa.ui.loading,
  static: isStatic,
}: {
  name?: string;
  sequence?: typeof villa.media.arrival;
  eyebrow?: string;
  tagline?: string;
  hint?: string;
  alt?: string;
  screens?: number;
  loadingLabel?: string;
  static?: boolean;
}) {
  const steps = [{ from: 0, to: 0.2 }];

  return (
    <CanvasSequence
      id="top"
      label={name}
      sequence={sequence}
      alt={alt}
      screens={screens}
      steps={steps}
      priority={true}
      static={isStatic}
      loadingLabel={loadingLabel}
    >
      {({ step, ready }) => {
        const isOpen = ready && (isStatic || step === 0);
        return (
          <>
            {/* Bottom Gradient Overlay */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-screen/90 via-screen/45 to-transparent transition-opacity duration-700"
              style={{ opacity: isOpen || !ready ? 1 : 0 }}
            />

            {/* Typography Content */}
            <div className="absolute inset-x-0 bottom-0 pb-[calc(2.25rem+env(safe-area-inset-bottom))] md:pb-12 px-5 sm:px-8 md:px-12">
              <Reveal variant="rise" open={isOpen} static={isStatic}>
                <span lang="it" className="font-display text-xl italic text-screen-foreground md:text-2xl">
                  {eyebrow}
                </span>
              </Reveal>

              <Reveal variant="rise" open={isOpen} delay={80} static={isStatic} as="h1" className="mt-1">
                <span className="block font-display text-[clamp(3.75rem,14vw,13.5rem)] leading-[0.88] font-[340] tracking-[-0.035em]">
                  {name}
                </span>
              </Reveal>

              <div className="mt-5 flex flex-wrap items-end justify-between gap-6 md:mt-7">
                <Reveal variant="rise" open={isOpen} delay={160} static={isStatic} className="max-w-[30ch]">
                  <p className="text-lg text-screen-foreground md:text-xl">{tagline}</p>
                </Reveal>

                <Reveal variant="rise" open={isOpen} delay={220} static={isStatic} className="hidden md:block">
                  <span className="flex items-center gap-3 text-sm text-screen-foreground">
                    {hint}
                    <span
                      aria-hidden="true"
                      className="relative block h-10 w-px overflow-hidden bg-screen-foreground/30"
                    >
                      <span className="absolute inset-x-0 top-0 h-1/2 bg-screen-foreground motion-safe:animate-[scroll-hint_2s_var(--ease-door)_infinite]" />
                    </span>
                  </span>
                </Reveal>
              </div>
            </div>
          </>
        );
      }}
    </CanvasSequence>
  );
}

export default Arrival;
