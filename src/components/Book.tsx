"use client";

import React, { useState, useEffect, useRef, useId } from "react";
import { villa } from "@/config/solmare.config";
import { money } from "@/lib/utils";
import { Slate } from "@/components/ui/Slate";
import { Reveal } from "@/components/ui/Reveal";
import { Roll } from "@/components/ui/Roll";
import { usePortrait, useReducedMotion, useSaveData } from "@/components/ui/CanvasSequence";

export interface BookProps {
  id?: string;
  copy?: typeof villa.book;
  clip?: typeof villa.media.sunset;
  booking?: typeof villa.booking;
  email?: string;
  siteName?: string;
  privacyUrl?: string;
  ui?: typeof villa.ui;
  static?: boolean;
}

export function Book({
  id = villa.book.id,
  copy = villa.book,
  clip = villa.media.sunset,
  booking = villa.booking,
  email = villa.contact.email,
  siteName = villa.site.name,
  privacyUrl = villa.legal.privacyUrl,
  ui = villa.ui,
  static: isStatic,
}: BookProps) {
  const fields = copy.fields;
  const headingId = useId();
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [canLoadVideo, setCanLoadVideo] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const isPortrait = usePortrait();
  const reducedMotion = useReducedMotion();
  const saveData = useSaveData();
  const shouldAnimate = !isStatic && !reducedMotion && !saveData;

  const orientationKey = isPortrait ? "mobile" : "desktop";
  const clipConfig = clip[orientationKey];

  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "mail" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [minDate, setMinDate] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  useEffect(() => {
    setMinDate(new Date().toISOString().slice(0, 10));
  }, []);

  // Unlock trigger after 1600ms intersection
  useEffect(() => {
    if (!shouldAnimate || unlocked) return;
    const el = sectionRef.current;
    if (!el) return;

    let timer = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        window.clearTimeout(timer);
        if (entry.isIntersecting) {
          timer = window.setTimeout(() => setUnlocked(true), 1600);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [shouldAnimate, unlocked]);

  // Video play / pause on intersection
  useEffect(() => {
    if (!shouldAnimate) return;
    const el = sectionRef.current;
    if (!el) return;

    const loadObs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setCanLoadVideo(true);
        loadObs.disconnect();
      }
    }, { rootMargin: "100% 0px" });

    const playObs = new IntersectionObserver(([entry]) => {
      const vid = videoRef.current;
      if (!vid) return;
      if (entry.isIntersecting && !vid.ended) {
        vid.play().catch(() => setUnlocked(true));
      } else if (!entry.isIntersecting) {
        vid.pause();
      }
    }, { threshold: 0.5 });

    loadObs.observe(el);
    playObs.observe(el);

    return () => {
      loadObs.disconnect();
      playObs.disconnect();
    };
  }, [shouldAnimate]);

  const nights = checkIn && checkOut ? Math.round((Date.parse(checkOut) - Date.parse(checkIn)) / 864e5) : 0;
  const isFormReady = isStatic || !shouldAnimate || videoEnded || unlocked;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    setErrorMessage("");
    if (nights < 1) {
      setErrorMessage(copy.errors.dates);
      return;
    }

    const emailBody = [
      `${fields.arrival}: ${data.arrival}`,
      `${fields.departure}: ${data.departure} (${copy.nights(nights)})`,
      `${fields.guests}: ${data.guests}`,
      `${fields.name}: ${data.name}`,
      `${fields.email}: ${data.email}`,
      "",
      data.message ?? "",
    ].join("\n");

    if (!booking.endpoint) {
      const subject = `${siteName}: ${data.arrival} to ${data.departure}`;
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        emailBody
      )}`;
      setFormStatus("mail");
      return;
    }

    setFormStatus("sending");
    try {
      const res = await fetch(booking.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, nights }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setCheckIn("");
      setCheckOut("");
      setFormStatus("sent");
    } catch {
      setFormStatus("error");
    }
  };

  const posterState = shouldAnimate ? "poster" : "end";
  const posterPath = (device: string) => `${clip.dir}/${posterState}-${device}`;
  const hasAvifPoster = clip.posterFormats.includes("avif");

  return (
    <section id={id} aria-labelledby={`${headingId}-h`} className="relative isolate bg-screen text-screen-foreground">
      {/* Background Video / Picture Container */}
      <div
        ref={sectionRef}
        data-tone="footage"
        className="relative h-[72svh] overflow-hidden md:absolute md:inset-0 md:h-auto"
      >
        <picture>
          {hasAvifPoster && (
            <source
              media="(orientation: portrait) and (max-width: 900px)"
              type="image/avif"
              srcSet={`${posterPath("mobile")}.avif`}
            />
          )}
          <source
            media="(orientation: portrait) and (max-width: 900px)"
            type="image/webp"
            srcSet={`${posterPath("mobile")}.webp`}
          />
          {hasAvifPoster && <source type="image/avif" srcSet={`${posterPath("desktop")}.avif`} />}
          <img
            src={`${posterPath("desktop")}.webp`}
            alt={copy.alt}
            width={clip.desktop.width}
            height={clip.desktop.height}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </picture>

        {shouldAnimate && canLoadVideo && (
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
            width={clipConfig.width}
            height={clipConfig.height}
            onCanPlay={(e) => {
              const rect = sectionRef.current?.getBoundingClientRect();
              if (rect && rect.top < 0.5 * window.innerHeight && rect.bottom > 0.5 * window.innerHeight) {
                e.currentTarget.play().catch(() => {});
              }
            }}
            onTimeUpdate={(e) => {
              const vid = e.currentTarget;
              if (vid.duration && vid.currentTime / vid.duration > 0.22) {
                setUnlocked(true);
              }
            }}
            onEnded={() => setVideoEnded(true)}
            className="absolute inset-0 h-full w-full object-cover"
          >
            {clipConfig.webm && (
              <source src={`${clip.dir}/${orientationKey}.webm`} type='video/webm; codecs="av01.0.08M.08"' />
            )}
            <source src={`${clip.dir}/${orientationKey}.mp4`} type="video/mp4" />
          </video>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-screen via-screen/10 to-transparent md:bg-gradient-to-r md:from-screen/85 md:via-screen/40 md:to-transparent" />

        {shouldAnimate && videoEnded && (
          <button
            type="button"
            onClick={() => {
              const vid = videoRef.current;
              if (vid) {
                vid.currentTime = 0;
                setVideoEnded(false);
                vid.play().catch(() => {});
              }
            }}
            className="absolute top-24 right-5 z-10 h-10 rounded-full border border-screen-foreground/50 px-4 text-sm transition-colors hover:bg-screen-foreground hover:text-screen sm:right-8 md:right-12"
          >
            {ui.replay}
          </button>
        )}
      </div>

      {/* Booking Form Layout */}
      <div className="relative -mt-44 grid gap-10 px-5 pb-12 sm:px-8 md:mt-0 md:min-h-svh md:grid-cols-[1fr_minmax(0,27rem)] md:items-center md:gap-16 md:px-12 md:py-32">
        <span aria-hidden="true" data-tone="dark" className="pointer-events-none absolute inset-0 md:hidden" />

        {/* Left Column Copy */}
        <div className="text-screen-foreground">
          <Slate index={copy.index} label={copy.label} />
          <Reveal variant="rise" static={isStatic} className="mt-6">
            <span lang="it" className="font-display text-2xl italic">
              {copy.eyebrow}
            </span>
          </Reveal>
          <Reveal variant="rise" static={isStatic} delay={80} as="h2" className="mt-1">
            <span id={`${headingId}-h`} className="block max-w-[11ch] text-[clamp(3rem,7vw,6.25rem)] leading-[0.95] font-[340]">
              {copy.heading}
            </span>
          </Reveal>
          <p className="mt-6 max-w-[38ch] text-lg text-screen-foreground/90">{copy.text}</p>
        </div>

        {/* Right Column Booking Card */}
        <div onFocusCapture={() => setUnlocked(true)}>
          <Reveal open={!!isFormReady || undefined} static={isStatic} className="rounded-[1.75rem]">
            <div className="rounded-[1.75rem] border border-border bg-card p-5 text-card-foreground shadow-[0_40px_90px_-30px_color-mix(in_srgb,var(--color-screen)_70%,transparent)] sm:p-7">
              {/* Header Price Info */}
              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="tnum text-2xl font-[340] sm:text-3xl text-foreground">
                    {money(booking.priceFrom, booking.currency)}
                  </span>
                  <span className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                    বাংলাদেশ টাকা
                  </span>
                  <span className="text-muted-foreground text-sm"> / {copy.perNight}</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 grid gap-4 text-sm">
                {/* Dates: Check-in / Checkout */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor={`${headingId}-arrival`} className="block px-4 pt-2.5 pb-2 text-xs font-semibold tracking-[0.02em]">
                      {fields.arrival}
                    </label>
                    <input
                      id={`${headingId}-arrival`}
                      name="arrival"
                      type="date"
                      required
                      min={minDate}
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="h-12 w-full rounded-xl border border-input bg-background px-4 text-foreground transition-colors placeholder:text-muted-foreground focus:border-ring focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-ring/30"
                    />
                  </div>

                  <div>
                    <label htmlFor={`${headingId}-departure`} className="block px-4 pt-2.5 pb-2 text-xs font-semibold tracking-[0.02em]">
                      {fields.departure}
                    </label>
                    <input
                      id={`${headingId}-departure`}
                      name="departure"
                      type="date"
                      required
                      min={checkIn || minDate}
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="h-12 w-full rounded-xl border border-input bg-background px-4 text-foreground transition-colors placeholder:text-muted-foreground focus:border-ring focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-ring/30"
                    />
                  </div>
                </div>

                {/* Guests */}
                <div>
                  <label htmlFor={`${headingId}-guests`} className="block px-4 pt-2.5 pb-2 text-xs font-semibold tracking-[0.02em]">
                    {fields.guests}
                  </label>
                  <select
                    id={`${headingId}-guests`}
                    name="guests"
                    defaultValue="2"
                    className="h-12 w-full rounded-xl border border-input bg-background px-4 text-foreground transition-colors focus:border-ring focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-ring/30"
                  >
                    {Array.from({ length: booking.maxGuests }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {copy.guestsOption(n)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Contact: Name & Email */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor={`${headingId}-name`} className="block px-4 pt-2.5 pb-2 text-xs font-semibold tracking-[0.02em]">
                      {fields.name}
                    </label>
                    <input
                      id={`${headingId}-name`}
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      className="h-12 w-full rounded-xl border border-input bg-background px-4 text-foreground transition-colors placeholder:text-muted-foreground focus:border-ring focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-ring/30"
                    />
                  </div>

                  <div>
                    <label htmlFor={`${headingId}-email`} className="block px-4 pt-2.5 pb-2 text-xs font-semibold tracking-[0.02em]">
                      {fields.email}
                    </label>
                    <input
                      id={`${headingId}-email`}
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="h-12 w-full rounded-xl border border-input bg-background px-4 text-foreground transition-colors placeholder:text-muted-foreground focus:border-ring focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-ring/30"
                    />
                  </div>
                </div>

                {/* Optional Message */}
                <div>
                  <label htmlFor={`${headingId}-message`} className="block px-4 pt-2.5 pb-2 text-xs font-semibold tracking-[0.02em]">
                    {fields.message}
                  </label>
                  <textarea
                    id={`${headingId}-message`}
                    name="message"
                    rows={2}
                    className="w-full rounded-xl border border-input bg-background p-4 text-foreground transition-colors placeholder:text-muted-foreground focus:border-ring focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-ring/30 resize-none"
                  />
                </div>

                {/* Dynamic Price Calculation Row */}
                {nights > 0 && (
                  <div className="rounded-xl border border-border bg-background/50 p-4">
                    <div className="flex items-center justify-between text-base">
                      <span>{copy.estimateLabel(copy.nights(nights), money(booking.priceFrom, booking.currency))}</span>
                      <span className="font-semibold text-foreground">
                        {money(nights * booking.priceFrom, booking.currency)}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{copy.estimateNote}</p>
                    {nights < booking.minNights && (
                      <p className="mt-2 text-xs text-amber-600 font-medium">
                        {copy.minNightsNote(booking.minNights)}
                      </p>
                    )}
                  </div>
                )}

                {/* Privacy Consent */}
                <div className="flex items-start gap-3 pt-2">
                  <input
                    id={`${headingId}-consent`}
                    name="consent"
                    type="checkbox"
                    required
                    className="mt-1 h-4 w-4 rounded border-input text-primary focus:ring-ring"
                  />
                  <label htmlFor={`${headingId}-consent`} className="text-xs text-muted-foreground leading-normal">
                    {fields.consent}{" "}
                    <a href={privacyUrl} className="underline hover:text-foreground">
                      {fields.privacy}
                    </a>
                  </label>
                </div>

                {/* Error & Success Messages */}
                {errorMessage && (
                  <p className="rounded-lg bg-red-500/10 p-3 text-xs text-red-500">{errorMessage}</p>
                )}
                {formStatus === "mail" && (
                  <p className="rounded-lg bg-green-500/10 p-3 text-xs text-green-600">{copy.mailOpened}</p>
                )}
                {formStatus === "sent" && (
                  <p className="rounded-lg bg-green-500/10 p-3 text-xs text-green-600">{copy.sent}</p>
                )}
                {formStatus === "error" && (
                  <p className="rounded-lg bg-red-500/10 p-3 text-xs text-red-500">
                    {copy.errors.network}{" "}
                    <a href={`mailto:${email}`} className="underline">
                      {email}
                    </a>
                  </p>
                )}

                {/* Submit Button with Roll */}
                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="fill-btn mt-2 flex h-14 w-full items-center justify-center rounded-xl bg-primary font-medium text-primary-foreground shadow-md transition-transform active:scale-[0.98] disabled:opacity-50"
                >
                  <Roll>{formStatus === "sending" ? copy.sending : copy.submit}</Roll>
                </button>

                <p className="text-center text-xs text-muted-foreground">{copy.noCharge}</p>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
