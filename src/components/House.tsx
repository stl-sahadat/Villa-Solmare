"use client";

import React, { useId } from "react";
import { villa } from "@/config/solmare.config";
import { Slate } from "@/components/ui/Slate";
import { Reveal } from "@/components/ui/Reveal";
import { Picture } from "@/components/ui/Picture";
import { Counter } from "@/components/ui/Counter";
import { useLanguage } from "@/context/LanguageContext";

export interface HouseProps {
  id?: string;
  index?: string;
  label?: string;
  heading?: string;
  text?: string;
  facts?: typeof villa.intro.facts;
  photo?: (typeof villa.photos)[0];
  static?: boolean;
}

export function House({
  id = villa.intro.id,
  index = villa.intro.index,
  label = villa.intro.label,
  heading = villa.intro.heading,
  text = villa.intro.text,
  facts = villa.intro.facts,
  photo = villa.photos.find((p) => p.name === villa.intro.photo) ?? villa.photos[0],
  static: isStatic,
}: HouseProps) {
  const { lang, t } = useLanguage();
  const displayLabel = label === villa.intro.label ? t.intro.label : label;
  const displayHeading = heading === villa.intro.heading ? t.intro.heading : heading;
  const displayText = text === villa.intro.text ? t.intro.text : text;
  const displayFacts = facts === villa.intro.facts ? t.intro.facts : facts;

  const headingId = useId();
  const formatFact = (val: number) => val.toLocaleString(lang === "bn" ? "bn-BD" : "en-GB");

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="bg-background py-16 text-foreground sm:py-24 md:py-36 px-5 sm:px-8 md:px-12"
    >
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-7">
          <Slate index={index} label={displayLabel} className="text-muted-foreground" />
          <Reveal variant="rise" static={isStatic} as="h2" className="mt-6">
            <span id={headingId} className="block text-[clamp(2.3rem,4.6vw,4.25rem)]">
              {displayHeading}
            </span>
          </Reveal>
          <p className="mt-8 max-w-[52ch] text-lg text-muted-foreground md:text-xl">{displayText}</p>
        </div>

        <div className="overflow-hidden rounded-2xl md:col-span-5 md:mt-10">
          <Picture
            name={photo.name}
            alt={photo.alt}
            sizes="(min-width: 768px) 40vw, 100vw"
            className={`aspect-[4/5] w-full object-cover ${isStatic ? "" : "scroll-zoom"}`}
          />
        </div>
      </div>

      <dl className="mx-auto mt-12 grid max-w-7xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:mt-24 md:grid-cols-5">
        {displayFacts.map((fact, idx) => (
          <div
            key={fact.label}
            className={`flex flex-col-reverse justify-between gap-6 bg-background p-5 md:p-7 ${
              idx === displayFacts.length - 1 && displayFacts.length % 2 ? "col-span-2 md:col-span-1" : ""
            }`}
          >
            <dt className="text-sm text-muted-foreground">{fact.label}</dt>
            <dd className="tnum font-display text-[clamp(2.6rem,4.5vw,4rem)] leading-none font-[340]">
              <Counter value={fact.value} static={isStatic} format={formatFact} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default House;
