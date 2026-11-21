"use client";

import React, { useState } from "react";
import { CanvasSequence } from "@/components/ui/CanvasSequence";
import { Slate } from "@/components/ui/Slate";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icons";
import { Picture } from "@/components/ui/Picture";
import { villa } from "@/config/solmare.config";

export interface GalleryDialogProps {
  open: boolean;
  onClose: () => void;
  photos?: typeof villa.photos;
  title?: string;
  count?: (n: number) => string;
  siteName?: string;
  closeLabel?: string;
  mediaBase?: string;
}

export function GalleryDialog({
  open,
  onClose,
  photos = villa.photos,
  title = villa.walk.showAll,
  count = villa.walk.photosCount,
  siteName = villa.site.name,
  closeLabel = villa.ui.close,
  mediaBase = "/media",
}: GalleryDialogProps) {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const [isOpenAnimation, setIsOpenAnimation] = useState(false);

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      if (open && !dialog.open) {
        dialog.showModal();
        requestAnimationFrame(() => setIsOpenAnimation(true));
      } else if (!open && dialog.open) {
        setIsOpenAnimation(false);
        const timer = window.setTimeout(() => dialog.close(), 700);
        return () => window.clearTimeout(timer);
      }
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-label={title}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 m-0 h-dvh w-screen overflow-hidden bg-transparent p-0 backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      <div
        className="absolute inset-x-0 top-[calc(0.75rem+env(safe-area-inset-top))] bottom-0 overflow-y-auto overscroll-contain rounded-t-[2rem] bg-background text-foreground transition-transform duration-[650ms] [transition-timing-function:var(--ease-door)] md:top-6 md:inset-x-6 md:rounded-t-[2rem]"
        style={{ transform: isOpenAnimation ? "translateY(0)" : "translateY(105%)" }}
      >
        <div className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur-xl">
          <div className="mx-auto mt-2.5 h-1 w-10 rounded-full bg-border" aria-hidden="true" />
          <div className="flex h-14 items-center justify-between px-5 sm:px-8 md:h-16 md:px-10">
            <p className="font-display text-xl">
              {siteName}{" "}
              <span className="font-sans text-sm text-muted-foreground">· {count(photos.length)}</span>
            </p>
            <button
              type="button"
              onClick={onClose}
              className="flex h-11 items-center gap-3 rounded-full px-4 transition-colors hover:bg-muted"
            >
              {closeLabel}
              <span aria-hidden="true" className="relative block h-4 w-4">
                <span className="absolute top-1/2 left-0 h-px w-full rotate-45 bg-current" />
                <span className="absolute top-1/2 left-0 h-px w-full -rotate-45 bg-current" />
              </span>
            </button>
          </div>
        </div>

        {open && (
          <ul className="grid gap-2 px-2 pt-2 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:grid-cols-2 sm:gap-3 sm:px-8 sm:py-8 md:px-10 lg:grid-cols-3">
            {photos.map((photo, idx) => (
              <li key={photo.name} className={idx % 5 === 0 ? "sm:col-span-2" : ""}>
                <div className="overflow-hidden rounded-xl">
                  <Picture
                    name={photo.name}
                    alt={photo.alt}
                    base={mediaBase}
                    sizes={
                      idx % 5 === 0
                        ? "(min-width: 1024px) 66vw, 100vw"
                        : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    }
                    className="scroll-zoom aspect-[16/10] h-full w-full object-cover"
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </dialog>
  );
}

export interface WalkProps {
  id?: string;
  index?: string;
  label?: string;
  sequence?: typeof villa.media.walk;
  rooms?: typeof villa.walk.rooms;
  alt?: string;
  screens?: number;
  showAll?: string;
  photos?: typeof villa.photos;
  siteName?: string;
  closeLabel?: string;
  loadingLabel?: string;
  static?: boolean;
}

export function Walk({
  id = villa.walk.id,
  index = villa.walk.index,
  label = villa.walk.label,
  sequence = villa.media.walk,
  rooms = villa.walk.rooms,
  alt = villa.walk.alt,
  screens = villa.walk.screens,
  showAll = villa.walk.showAll,
  photos = villa.photos,
  siteName = villa.site.name,
  closeLabel = villa.ui.close,
  loadingLabel = villa.ui.loading,
  static: isStatic,
}: WalkProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const padding = "px-5 sm:px-8 md:px-12";

  return (
    <>
      <CanvasSequence
        id={id}
        label={label}
        sequence={sequence}
        alt={alt}
        screens={screens}
        steps={rooms}
        static={isStatic}
        loadingLabel={loadingLabel}
      >
        {({ step }) => {
          const activeIndex = isStatic ? 0 : Math.max(step, 0);

          return (
            <>
              {/* Gradients */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-screen/60 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-screen/70 to-transparent" />

              {/* Top-Left Stepper HUD Card */}
              <div
                className={`absolute top-[calc(5.25rem+env(safe-area-inset-top))] left-0 md:top-28 ${padding}`}
              >
                <div className="rounded-2xl border border-screen-foreground/15 bg-screen/55 px-4 py-3 text-screen-foreground backdrop-blur-xl sm:w-[26rem]">
                  <Slate index={index} label={label} />
                  <ol className="mt-3 grid grid-flow-col gap-2" aria-label={label}>
                    {rooms.map((room, idx) => (
                      <li key={room.name} className="min-w-0">
                        <span
                          className="block h-[3px] overflow-hidden rounded-full bg-screen-foreground/25"
                          aria-hidden="true"
                        >
                          <span
                            className="block h-full origin-left bg-screen-foreground"
                            style={{
                              transform: isStatic
                                ? "scaleX(0)"
                                : `scaleX(clamp(0, calc((var(--p) - ${room.from}) / ${
                                    Math.min(room.to, 1) - room.from
                                  }), 1))`,
                            }}
                          />
                        </span>
                        <span
                          className={`mt-2 hidden truncate text-sm transition-colors duration-500 sm:block ${
                            idx === activeIndex
                              ? "text-screen-foreground"
                              : "text-screen-foreground/70"
                          }`}
                          aria-current={idx === activeIndex ? "step" : undefined}
                        >
                          {room.name}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Bottom Room Description Cards & Show All Photos Button */}
              <div
                className={`absolute inset-x-0 bottom-0 pb-[calc(6.75rem+env(safe-area-inset-bottom))] md:pb-12 ${padding}`}
              >
                <div className="flex items-end justify-between gap-6">
                  {/* Left: Active Room Info Box */}
                  <div className="relative grid w-full max-w-xl">
                    {rooms.map((room, idx) => {
                      const isCurrent = idx === activeIndex;
                      return (
                        <div
                          key={room.name}
                          className="col-start-1 row-start-1 self-end"
                          aria-hidden={!isCurrent}
                        >
                          <Reveal open={isCurrent} static={isStatic} className="rounded-2xl">
                            <div className="rounded-2xl border border-screen-foreground/15 bg-screen/55 p-5 text-screen-foreground backdrop-blur-xl md:p-7">
                              <p lang="it" className="font-display text-lg italic opacity-90">
                                {room.italian}
                              </p>
                              <h2 className="mt-1 text-[clamp(2.1rem,5vw,3.75rem)] leading-tight">
                                {room.name}
                              </h2>
                              <p className="mt-3 text-base md:text-lg opacity-85 leading-relaxed">
                                {room.text}
                              </p>
                            </div>
                          </Reveal>
                        </div>
                      );
                    })}
                  </div>

                  {/* Desktop Right Button: Show all photos */}
                  {!isStatic && (
                    <button
                      type="button"
                      onClick={() => setIsGalleryOpen(true)}
                      className="hidden h-12 shrink-0 items-center gap-2 rounded-full bg-screen-foreground px-5 font-medium text-screen transition-transform duration-500 [transition-timing-function:var(--ease-spring)] hover:scale-[1.03] active:scale-[0.97] md:flex"
                    >
                      <Icon name="grid" className="h-4 w-4" />
                      {showAll}
                    </button>
                  )}
                </div>
              </div>

              {/* Mobile Floating Button: Show all photos */}
              {!isStatic && (
                <button
                  type="button"
                  onClick={() => setIsGalleryOpen(true)}
                  className="absolute top-[calc(5.75rem+env(safe-area-inset-top))] right-5 flex h-10 items-center gap-2 rounded-full bg-screen-foreground px-4 text-sm font-medium text-screen transition-transform active:scale-[0.95] md:hidden"
                >
                  <Icon name="grid" className="h-4 w-4" />
                  {showAll}
                </button>
              )}
            </>
          );
        }}
      </CanvasSequence>

      {/* Gallery Dialog */}
      {!isStatic && (
        <GalleryDialog
          open={isGalleryOpen}
          onClose={() => setIsGalleryOpen(false)}
          photos={photos}
          title={showAll}
          siteName={siteName}
          closeLabel={closeLabel}
        />
      )}
    </>
  );
}
