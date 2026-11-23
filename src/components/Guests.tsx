"use client";

import React, { useId, useState } from "react";
import { villa } from "@/config/solmare.config";
import { Slate } from "@/components/ui/Slate";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icons";
import { useReducedMotion } from "@/components/ui/CanvasSequence";
import { useLanguage } from "@/context/LanguageContext";

function StarRating({ value = 5, className = "" }: { value?: number; className?: string }) {
  return (
    <span className={`flex gap-0.5 ${className}`} aria-hidden="true">
      {Array.from({ length: 5 }, (_, idx) => (
        <Icon key={idx} name="star" filled={true} className={`h-3.5 w-3.5 ${idx < value ? "" : "opacity-25"}`} />
      ))}
    </span>
  );
}

function ReviewCard({ r, nights }: { r: (typeof villa.guests.items)[0]; nights: (n: number) => string }) {
  return (
    <figure className="flex h-full w-[18.5rem] shrink-0 flex-col justify-between gap-6 rounded-2xl border border-border bg-card p-6 text-card-foreground">
      <blockquote className="text-base leading-relaxed text-foreground">
        “{r.quote}”
      </blockquote>
      <figcaption className="flex items-center justify-between gap-3 text-sm">
        <div>
          <cite className="font-semibold not-italic text-foreground">{r.author}</cite>
          <span className="block text-xs text-muted-foreground">
            {r.from} · {r.when}
          </span>
        </div>
        <span className="tnum rounded-full border border-border/80 bg-background/50 px-2.5 py-1 text-xs text-muted-foreground">
          {nights(r.nights)}
        </span>
      </figcaption>
    </figure>
  );
}

export interface GuestsProps {
  id?: string;
  index?: string;
  label?: string;
  heading?: string;
  rating?: string;
  count?: string;
  source?: string;
  items?: typeof villa.guests.items;
  nights?: (n: number) => string;
  ui?: typeof villa.ui;
  speed?: number;
  static?: boolean;
}

export function Guests({
  id = villa.guests.id,
  index = villa.guests.index,
  label = villa.guests.label,
  heading = villa.guests.heading,
  rating = villa.guests.rating,
  count = villa.guests.count,
  source = villa.guests.source,
  items = villa.guests.items,
  nights = villa.guests.nights,
  ui = villa.ui,
  speed = 70,
  static: isStatic,
}: GuestsProps) {
  const { lang, t } = useLanguage();
  const displayLabel = label === villa.guests.label ? t.guests.label : label;
  const displayHeading = heading === villa.guests.heading ? t.guests.heading : heading;
  const displayRating = rating === villa.guests.rating ? t.guests.rating : rating;
  const displayCount = count === villa.guests.count ? t.guests.count : count;
  const displaySource = source === villa.guests.source ? t.guests.source : source;
  const displayNights = nights === villa.guests.nights ? t.guests.nights : nights;
  const displayItems = items === villa.guests.items ? t.guests.items : items;

  const headingId = useId();
  const reducedMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);
  const shouldAnimate = !isStatic && !reducedMotion;

  const half = Math.ceil(displayItems.length / 2);
  const lanes = [displayItems.slice(0, half), displayItems.slice(half)];
  const padding = "px-5 sm:px-8 md:px-12";

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="overflow-hidden bg-background py-16 text-foreground sm:py-24 md:py-36"
    >
      <div className={`mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-10 ${padding}`}>
        <div>
          <Slate index={index} label={displayLabel} className="text-muted-foreground" />
          <Reveal variant="rise" static={isStatic} as="h2" className="mt-6">
            <span id={headingId} className="block max-w-[16ch] text-[clamp(2.3rem,4.6vw,4.25rem)]">
              {displayHeading}
            </span>
          </Reveal>
        </div>

        <div className="flex items-center gap-5">
          <p className="tnum font-display text-[clamp(3.5rem,6vw,5rem)] leading-none font-[340]">
            {displayRating}
          </p>
          <div>
            <StarRating className="text-foreground [&_svg]:h-4 [&_svg]:w-4" />
            <p className="mt-2 font-medium">{displayCount}</p>
            <p className="max-w-[24ch] text-sm text-muted-foreground">{displaySource}</p>
          </div>
        </div>
      </div>

      {/* Screen reader full reviews list */}
      <ul className="sr-only">
        {displayItems.map((r) => (
          <li key={r.author}>
            “{r.quote}” {r.author}, {r.from}, {r.when}, {displayNights(r.nights)}.
          </li>
        ))}
      </ul>

      {/* Marquee Rows with Mask Fade */}
      <div
        aria-hidden="true"
        className="group mt-14 grid gap-3 md:mt-20 [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]"
      >
        {lanes.map((lane, laneIdx) => (
          <div
            key={laneIdx}
            className={shouldAnimate ? "overflow-hidden" : "no-scrollbar overflow-x-auto px-5 sm:px-8 md:px-12"}
          >
            <div
              className={`flex w-max gap-3 ${
                shouldAnimate
                  ? "animate-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]"
                  : ""
              }`}
              style={{
                "--marquee-duration": `${speed + 12 * laneIdx}s`,
                "--marquee-gap": "0.75rem",
                animationDirection: laneIdx % 2 ? "reverse" : "normal",
                animationPlayState: isPaused ? "paused" : undefined,
              } as React.CSSProperties}
            >
              {(shouldAnimate ? [...lane, ...lane] : lane).map((r, itemIdx) => (
                <ReviewCard key={`${r.author}-${itemIdx}`} r={r} nights={displayNights} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Play / Pause Toggle Button */}
      {shouldAnimate && (
        <div className={`mx-auto mt-6 flex max-w-7xl justify-end ${padding}`}>
          <button
            type="button"
            onClick={() => setIsPaused((p) => !p)}
            aria-pressed={isPaused}
            className="flex h-10 items-center gap-2 rounded-full border border-border bg-card px-4 text-xs uppercase tracking-wider font-medium text-foreground transition-colors hover:bg-muted"
          >
            {isPaused ? (
              <>
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span>{ui.play}</span>
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
                <span>{ui.pause}</span>
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
}

export default Guests;
