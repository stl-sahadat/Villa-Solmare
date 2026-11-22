"use client";

import React, { useId } from "react";
import { villa } from "@/config/solmare.config";
import { Slate } from "@/components/ui/Slate";
import { Reveal } from "@/components/ui/Reveal";
import { Picture } from "@/components/ui/Picture";
import { Icon } from "@/components/ui/Icons";
import { Counter } from "@/components/ui/Counter";

export interface DetailsProps {
  id?: string;
  index?: string;
  label?: string;
  heading?: string;
  amenities?: typeof villa.details.amenities;
  area?: typeof villa.details.area;
  mapsUrl?: string;
  mediaBase?: string;
  static?: boolean;
}

export function Details({
  id = villa.details.id,
  index = villa.details.index,
  label = villa.details.label,
  heading = villa.details.heading,
  amenities = villa.details.amenities,
  area = villa.details.area,
  mapsUrl = villa.contact.mapsUrl,
  mediaBase = "/media",
  static: isStatic,
}: DetailsProps) {
  const headingId = useId();
  const sortedPlaces = [...area.places].sort((a, b) => a.minutes - b.minutes);
  const maxMinutes = Math.max(...sortedPlaces.map((p) => p.minutes));

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="bg-background py-16 text-foreground sm:py-24 md:py-36 px-5 sm:px-8 md:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <Slate index={index} label={label} className="text-muted-foreground" />
        <Reveal variant="rise" static={isStatic} as="h2" className="mt-6">
          <span id={headingId} className="block max-w-[18ch] text-[clamp(2.3rem,4.6vw,4.25rem)]">
            {heading}
          </span>
        </Reveal>

        {/* 3 Horizontal / Grid Amenities Cards */}
        <ul className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 md:mx-0 md:mt-20 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
          {amenities.map((group) => (
            <li
              key={group.group}
              className="w-[84%] shrink-0 snap-start overflow-hidden rounded-2xl border border-border bg-card text-card-foreground sm:w-[60%] md:w-auto"
            >
              <div className="overflow-hidden">
                <Picture
                  name={group.photo}
                  alt=""
                  base={mediaBase}
                  sizes="(min-width: 768px) 33vw, 84vw"
                  className={`aspect-[16/10] w-full object-cover ${isStatic ? "" : "scroll-zoom"}`}
                />
              </div>

              <div className="p-5 md:p-7">
                <h3 className="text-[1.6rem] md:text-[1.75rem] font-display">{group.group}</h3>
                <ul className="mt-4 grid gap-3.5 md:mt-5">
                  {group.items.map((item) => (
                    <li key={item.label} className="flex items-center gap-3.5">
                      <Icon name={item.icon} className="h-6 w-6 shrink-0" />
                      <span>{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>

        {/* Around the House Section with Sqrt Distance Scaling */}
        <div className="mt-16 grid gap-8 md:mt-32 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <h3 className="text-[clamp(1.9rem,3.2vw,2.75rem)] font-display">{area.heading}</h3>
            <p className="mt-4 max-w-[44ch] text-lg text-muted-foreground">{area.text}</p>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex h-12 items-center gap-2 rounded-full border border-foreground px-6 font-medium transition-[color,background-color,transform] hover:bg-foreground hover:text-background active:scale-[0.97]"
            >
              <span>{area.openMaps}</span>
              <Icon name="arrow" className="h-4 w-4" />
            </a>
          </div>

          <ol className="grid gap-5 md:col-span-7" aria-label={area.heading}>
            {sortedPlaces.map((place) => (
              <li key={place.name}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-lg">{place.name}</span>
                  <span className="tnum shrink-0 text-muted-foreground">
                    <span className="font-display text-2xl text-foreground">
                      <Counter value={place.minutes} static={isStatic} duration={900} />
                    </span>{" "}
                    {area.minutes} {place.by}
                  </span>
                </div>
                <div className="relative mt-2.5 h-[3px] rounded-full bg-muted" aria-hidden="true">
                  <span
                    className="absolute inset-y-0 left-0 block"
                    style={{ width: `${6 + 94 * Math.sqrt(place.minutes / maxMinutes)}%` }}
                  >
                    <span className={`block h-[3px] rounded-full bg-primary ${isStatic ? "" : "scroll-grow"}`} />
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Details;
