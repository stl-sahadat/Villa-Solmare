"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { villa, navigation } from "@/config/solmare.config";
import { money } from "@/lib/utils";
import { Roll } from "@/components/ui/Roll";
import { useLanguage } from "@/context/LanguageContext";

function getStoredTheme(): string {
  if (typeof window === "undefined") return "system";
  try {
    const stored = localStorage.getItem("villa-theme");
    if (stored) return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "day";
  } catch {
    return "day";
  }
}

function ThemeToggle({
  labels,
  className = "",
}: {
  labels: { day: string; night: string; action: string };
  className?: string;
}) {
  const [theme, setTheme] = useState("day");

  useEffect(() => {
    setTheme(getStoredTheme());
  }, []);

  const isNight = theme === "night";

  const toggle = () => {
    const next = getStoredTheme() === "night" ? "day" : "night";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("villa-theme", next);
    } catch {}
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={labels.action}
      aria-pressed={isNight}
      title={isNight ? labels.day : labels.night}
      className={`group flex h-11 items-center gap-2 rounded-full px-3 text-[0.95rem] ${className}`}
    >
      <span aria-hidden="true" className="relative block h-[18px] w-[18px] rounded-full border border-current">
        <span
          className="absolute inset-0 rounded-full bg-current transition-transform duration-700 [transition-timing-function:var(--ease-door)]"
          style={{
            transform: isNight ? "translate(0,0) scale(1)" : "translate(45%,-45%) scale(0)",
            transformOrigin: "100% 0%",
          }}
        />
        <span
          className="absolute inset-[3px] rounded-full bg-current transition-transform duration-700 [transition-timing-function:var(--ease-door)]"
          style={{ transform: isNight ? "scale(0)" : "scale(1)" }}
        />
      </span>
      <span className="hidden sm:inline font-sans">{isNight ? labels.day : labels.night}</span>
    </button>
  );
}

function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <button
      type="button"
      onClick={() => setLang(lang === "en" ? "bn" : "en")}
      aria-label={lang === "en" ? "বাংলায় পরিবর্তন করুন" : "Switch to English"}
      title={lang === "en" ? "বাংলায় পড়ুন" : "Read in English"}
      className={`group flex h-11 items-center gap-1.5 rounded-full px-3 text-[0.88rem] transition-colors duration-500 hover:opacity-100 ${className}`}
    >
      <span className="font-sans flex items-center gap-1">
        <span className={lang === "en" ? "font-semibold text-current" : "opacity-45 hover:opacity-75"}>EN</span>
        <span className="opacity-30">/</span>
        <span className={lang === "bn" ? "font-semibold text-current" : "opacity-45 hover:opacity-75"}>বাংলা</span>
      </span>
    </button>
  );
}

export interface HeaderProps {
  name?: string;
  items?: typeof navigation;
  bookHref?: string;
  priceFrom?: number;
  currency?: string;
  minNights?: number;
  phone?: string;
  email?: string;
  ui?: typeof villa.ui;
  mediaBase?: string;
  hideBarNear?: string;
  static?: boolean;
}

export function Header({
  name = villa.site.name,
  items = navigation,
  bookHref = `#${villa.book.id}`,
  priceFrom = villa.booking.priceFrom,
  currency = villa.booking.currency,
  minNights = villa.booking.minNights,
  phone = villa.contact.phone,
  email = villa.contact.email,
  ui = villa.ui,
  mediaBase = "/media",
  hideBarNear = `#${villa.book.id}`,
  static: isStatic,
}: HeaderProps) {
  const { lang, t } = useLanguage();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [tone, setTone] = useState<"footage" | "dark" | "light">("footage");
  const [isBarVisible, setIsBarVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(0);

  const navLabelMap: Record<string, string> = {
    "the-house": t.nav.theHouse,
    "inside": t.nav.inside,
    "amenities": t.nav.amenities,
    "guests": t.nav.guests,
    "stay": t.nav.stay,
  };

  const scrollToSection = (targetId: string) => {
    const cleanId = targetId.replace(/^[/#]+/, "");
    if (!cleanId || cleanId === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(cleanId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Tone detection observer
  useEffect(() => {
    if (isStatic) return;

    let observer: IntersectionObserver | null = null;
    const footageSet = new Set<Element>();
    const darkSet = new Set<Element>();

    const updateTone = () => {
      observer?.disconnect();
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const targetSet = entry.target.getAttribute("data-tone") === "footage" ? footageSet : darkSet;
            if (entry.isIntersecting) {
              targetSet.add(entry.target);
            } else {
              targetSet.delete(entry.target);
            }
          }
          setTone(darkSet.size > 0 ? "dark" : footageSet.size > 0 ? "footage" : "light");
        },
        { rootMargin: `0px 0px -${Math.max(0, window.innerHeight - 64)}px 0px` }
      );

      document.querySelectorAll('[data-tone="footage"], [data-tone="dark"]').forEach((el) => {
        observer?.observe(el);
      });
    };

    updateTone();
    window.addEventListener("resize", updateTone);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", updateTone);
    };
  }, [isStatic]);

  // Floating mobile bar visibility observer
  useEffect(() => {
    if (isStatic) return;

    let isNearBooking = false;
    const checkScroll = () => {
      setIsBarVisible(window.scrollY > 0.5 * window.innerHeight && !isNearBooking);
    };

    const target = hideBarNear ? document.querySelector(hideBarNear) : null;
    const nearObserver = new IntersectionObserver(([entry]) => {
      isNearBooking = entry.isIntersecting;
      checkScroll();
    });

    if (target) nearObserver.observe(target);
    checkScroll();

    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => {
      nearObserver.disconnect();
      window.removeEventListener("scroll", checkScroll);
    };
  }, [hideBarNear, isStatic]);

  const openMenu = useCallback(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
      requestAnimationFrame(() => requestAnimationFrame(() => setIsMenuOpen(true)));
    }
  }, []);

  const closeMenu = useCallback(() => {
    const dialog = dialogRef.current;
    if (dialog && dialog.open) {
      setIsMenuOpen(false);
      window.setTimeout(() => dialog.close(), 700);
    }
  }, []);

  const isDarkTone = tone !== "light" && !isStatic;
  const isBackdropVisible = tone !== "footage" || isStatic;

  return (
    <>
      {/* Accessibility Skip Link */}
      <a
        href="#main"
        className="fixed top-3 left-3 z-[60] -translate-y-24 rounded-full bg-foreground px-4 py-2 text-sm text-background focus:translate-y-0"
      >
        {ui.skip}
      </a>

      {/* Top Glass / Shadow Backdrops */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-x-0 top-0 z-40 h-24 backdrop-blur-md transition-[opacity,background-color] duration-500 [mask-image:linear-gradient(to_bottom,#000_45%,transparent)] md:h-28 ${
          tone === "dark" ? "bg-screen/50" : "bg-background/40"
        } ${isBackdropVisible ? "opacity-100" : "opacity-0"}`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-x-0 top-0 z-40 h-28 bg-gradient-to-b from-screen/55 to-transparent transition-opacity duration-500 ${
          tone === "footage" ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Main Sticky Header */}
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
          isDarkTone
            ? "text-screen-foreground [text-shadow:0_1px_12px_color-mix(in_srgb,var(--color-screen)_35%,transparent)]"
            : "text-foreground"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-5 sm:px-8 md:h-20 md:px-12">
          {/* Brand Name with Roll Effect */}
          <a href="/" onClick={(e) => { e.preventDefault(); scrollToSection("top"); }} className="font-display text-2xl md:text-[1.7rem]">
            <Roll>{name}</Roll>
          </a>

          {/* Right Header Navigation & Actions */}
          <div className="flex items-center gap-1 md:gap-3">
            <ThemeToggle labels={{ day: t.ui.day, night: t.ui.night, action: t.ui.theme }} />
            <LanguageToggle />

            <a
              href={bookHref}
              className={`fill-btn hidden h-11 items-center rounded-full border px-5 text-[0.95rem] [text-shadow:none] transition-colors duration-500 md:inline-flex ${
                isDarkTone
                  ? "border-screen-foreground text-screen-foreground [--fill:var(--color-screen-foreground)] hover:text-screen focus-visible:text-screen"
                  : "border-primary bg-primary text-primary-foreground [--fill:var(--color-foreground)] hover:text-background focus-visible:text-background"
              }`}
            >
              {t.ui.book}
            </a>

            <button
              type="button"
              aria-haspopup="dialog"
              aria-expanded={isMenuOpen}
              aria-controls="site-menu"
              onClick={openMenu}
              className="flex h-11 items-center gap-3 rounded-full px-3 text-[0.95rem]"
            >
              <Roll>{t.ui.menu}</Roll>
              <span aria-hidden="true" className="flex w-6 flex-col gap-[5px]">
                <span className="h-px w-full bg-current" />
                <span className="h-px w-2/3 self-end bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Editorial Menu Dialog */}
      <dialog
        ref={dialogRef}
        id="site-menu"
        aria-label={ui.menu}
        onCancel={(e) => {
          e.preventDefault();
          closeMenu();
        }}
        onClick={(e) => e.target === e.currentTarget && closeMenu()}
        className="fixed inset-0 m-0 h-dvh w-screen overflow-hidden bg-transparent p-0 backdrop:bg-black/60 backdrop:backdrop-blur-sm"
      >
        <div
          className="absolute inset-x-0 bottom-0 max-h-[92dvh] overflow-y-auto overscroll-contain rounded-t-[1.75rem] bg-screen text-screen-foreground transition-[transform,clip-path] duration-700 [transition-timing-function:var(--ease-door)] md:inset-0 md:max-h-none md:rounded-none md:[--menu-clip:100%] md:[--menu-y:0%]"
          style={{
            transform: isMenuOpen ? "translateY(0)" : "translateY(var(--menu-y, 100%))",
            clipPath: isMenuOpen ? "inset(0 0 0 0)" : "inset(0 0 var(--menu-clip, 0%) 0)",
          }}
        >
          <div className="flex h-full min-h-[60dvh] flex-col px-5 pt-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))] sm:px-8 md:min-h-screen md:px-12 md:pt-0 md:pb-10">
            {/* Mobile Sheet Pull Indicator */}
            <div
              className="mx-auto mb-2 h-1 w-10 rounded-full bg-screen-foreground/25 md:hidden"
              aria-hidden="true"
            />

            {/* Modal Header */}
            <div className="flex h-14 items-center justify-between md:h-20">
              <span className="font-display text-2xl md:text-[1.7rem]">{name}</span>
              <div className="flex items-center gap-2">
                <LanguageToggle />
                <button
                  type="button"
                  onClick={closeMenu}
                  className="flex h-11 items-center gap-3 rounded-full px-3 text-[0.95rem]"
                >
                  <Roll>{t.ui.close}</Roll>
                  <span aria-hidden="true" className="relative block h-4 w-4">
                    <span className="absolute top-1/2 left-0 h-px w-full rotate-45 bg-current" />
                    <span className="absolute top-1/2 left-0 h-px w-full -rotate-45 bg-current" />
                  </span>
                </button>
              </div>
            </div>

            {/* Menu Body */}
            <div className="grid flex-1 gap-10 py-6 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-16 md:py-10">
              {/* Left Column: Numbered Links */}
              <ul className="flex flex-col gap-1 md:gap-2">
                {items.map((item, idx) => (
                  <li key={item.href} className="overflow-hidden">
                    <a
                      href={`/${item.href.replace(/^[/#]+/, "")}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.href);
                        closeMenu();
                      }}
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onFocus={() => setHoveredIndex(idx)}
                      className={`flex items-baseline gap-4 font-display text-[clamp(2.6rem,6.5vw,5.75rem)] leading-[1.08] transition-[transform,color] duration-700 [transition-timing-function:var(--ease-door)] ${
                        hoveredIndex === idx ? "text-screen-foreground" : "text-screen-foreground/70"
                      }`}
                      style={{
                        transform: isMenuOpen || isStatic ? "translateY(0)" : "translateY(110%)",
                        transitionDelay: isMenuOpen ? `${180 + 60 * idx}ms, 0ms` : "0ms",
                      }}
                    >
                      <span className="tnum font-sans text-sm text-screen-foreground/70">
                        0{idx + 1}
                      </span>
                      <Roll>{navLabelMap[item.slug || ""] || item.label}</Roll>
                    </a>
                  </li>
                ))}
              </ul>

              {/* Right Column: Live Photo Still Preview */}
              <div className="relative hidden aspect-[4/5] max-h-[68dvh] overflow-hidden rounded-2xl md:block">
                {items.map((item, idx) => (
                  <img
                    key={item.href}
                    src={`${mediaBase}/${item.still}-800.webp`}
                    alt=""
                    width={800}
                    height={450}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[600ms,1200ms] [transition-timing-function:ease,var(--ease-door)]"
                    style={{
                      opacity: hoveredIndex === idx ? 1 : 0,
                      transform: hoveredIndex === idx ? "scale(1)" : "scale(1.06)",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Mobile Booking CTA */}
            <a
              href="/stay"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("stay");
                closeMenu();
              }}
              className="mb-6 flex h-14 items-center justify-center rounded-full bg-primary font-medium text-primary-foreground transition-transform active:scale-[0.98] md:hidden"
            >
              {t.ui.book}
            </a>

            {/* Modal Bottom Contact */}
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-t border-screen-foreground/15 pt-5 text-sm text-screen-foreground/80">
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-screen-foreground">
                <Roll>{phone}</Roll>
              </a>
              <a href={`mailto:${email}`} className="hover:text-screen-foreground">
                <Roll>{email}</Roll>
              </a>
            </div>
          </div>
        </div>
      </dialog>

      {/* Floating Bottom Booking Bar for Mobile */}
      {!isStatic && (
        <div
          inert={!isBarVisible ? true : undefined}
          className={`fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-30 rounded-full border border-border/70 bg-background/85 py-2 pr-2 pl-5 text-foreground shadow-[0_18px_40px_-16px_color-mix(in_srgb,var(--color-screen)_55%,transparent)] backdrop-blur-xl backdrop-saturate-150 transition-[transform,opacity] duration-500 [transition-timing-function:var(--ease-spring)] md:hidden ${
            isBarVisible ? "translate-y-0 opacity-100" : "translate-y-[150%] opacity-0"
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <p className="leading-tight">
              <span className="tnum font-semibold">{money(priceFrom, currency)}</span>
              <span className="text-muted-foreground"> / {t.ui.perNight}</span>
              <span className="block text-xs text-muted-foreground">{t.ui.minStay(minNights)}</span>
            </p>
            <a
              href="/stay"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("stay");
              }}
              className="flex h-12 items-center rounded-full bg-primary px-6 font-medium text-primary-foreground transition-transform active:scale-[0.96]"
            >
              {t.ui.book}
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
