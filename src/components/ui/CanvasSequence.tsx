"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

const PORTRAIT_QUERY = "(orientation: portrait) and (max-width: 900px)";

export function useMediaQuery(query: string, defaultState = false) {
  const [matches, setMatches] = useState(defaultState);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

export function usePortrait() {
  return useMediaQuery(PORTRAIT_QUERY);
}

export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

export function useSaveData() {
  const [saveData, setSaveData] = useState(false);
  useEffect(() => {
    const conn = (navigator as any).connection;
    setSaveData(!!conn?.saveData);
  }, []);
  return saveData;
}

let avifSupportedPromise: Promise<boolean> | null = null;
function checkAvifSupport(): Promise<boolean> {
  if (!avifSupportedPromise) {
    avifSupportedPromise = new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img.width > 0);
      img.onerror = () => resolve(false);
      img.src =
        "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=";
    });
  }
  return avifSupportedPromise;
}

const pad4 = (num: number) => String(num).padStart(4, "0");
const clamp01 = (val: number) => Math.min(1, Math.max(0, val));

export interface SequenceConfig {
  dir: string;
  fps: number;
  frames: number;
  formats: string[];
  desktop: { dir: string; width: number; height: number }[];
  mobile: { dir: string; width: number; height: number };
}

export interface StepRange {
  from: number;
  to: number;
  name?: string;
  italian?: string;
  text?: string;
}

interface CanvasSequenceProps {
  id: string;
  label: string;
  sequence: SequenceConfig;
  alt: string;
  screens?: number;
  steps?: StepRange[];
  fadeOut?: boolean;
  priority?: boolean;
  static?: boolean;
  loadingLabel?: string;
  children?: (state: { step: number; ready: boolean; progress: number }) => React.ReactNode;
  className?: string;
}

export function CanvasSequence({
  id,
  label,
  sequence,
  alt,
  screens = 3,
  steps = [],
  fadeOut,
  priority,
  static: isStatic,
  loadingLabel = "Loading the footage",
  children,
  className = "",
}: CanvasSequenceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);

  const [isReady, setIsReady] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(0);

  const isPortrait = usePortrait();
  const reducedMotion = useReducedMotion();
  const saveData = useSaveData();
  const shouldAnimate = !isStatic && !reducedMotion && !saveData;

  const framesRef = useRef<(HTMLImageElement | null)[]>([]);
  const loadedCountRef = useRef(0);
  const smoothedProgressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const lastDrawnFrameRef = useRef(-1);

  // Active resolution config based on portrait / desktop width
  const totalFrames = sequence.frames;

  useEffect(() => {
    if (!shouldAnimate) return;

    const sectionEl = sectionRef.current;
    const canvasEl = canvasRef.current;
    const stickyEl = stickyRef.current;
    if (!sectionEl || !canvasEl || !stickyEl) return;

    const ctx = canvasEl.getContext("2d", { alpha: false });
    if (!ctx) return;

    framesRef.current = Array(totalFrames).fill(null);
    loadedCountRef.current = 0;
    lastDrawnFrameRef.current = -1;

    let isCancelled = false;
    let isLoopRunning = false;
    let rafId = 0;
    let isVisibleInViewport = false;
    let lastStepIndex = -1;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const activeRes = isPortrait
      ? sequence.mobile
      : [...sequence.desktop].reverse().find((res) => res.width >= window.innerWidth * dpr) ??
        sequence.desktop[0];

    const resizeCanvas = () => {
      const cw = stickyEl.clientWidth;
      const ch = stickyEl.clientHeight;
      canvasEl.width = Math.round(cw * dpr);
      canvasEl.height = Math.round(ch * dpr);
      canvasEl.style.width = `${cw}px`;
      canvasEl.style.height = `${ch}px`;
      lastDrawnFrameRef.current = -1;
      drawCurrentFrame(true);
    };

    // Nearest Loaded Neighbor Draw
    const drawCurrentFrame = (force = false) => {
      const targetExact = Math.round(smoothedProgressRef.current * (totalFrames - 1));

      // Find nearest loaded frame index
      let nearestIndex = -1;
      for (let offset = 0; offset < totalFrames; offset++) {
        if (framesRef.current[targetExact + offset]) {
          nearestIndex = targetExact + offset;
          break;
        }
        if (framesRef.current[targetExact - offset]) {
          nearestIndex = targetExact - offset;
          break;
        }
      }

      if (nearestIndex < 0) return;

      // Async decode adjacent frames for silky smooth scrubs
      for (const adj of [nearestIndex + 1, nearestIndex + 2, nearestIndex - 1, nearestIndex + 3]) {
        if (framesRef.current[adj]) {
          framesRef.current[adj]?.decode?.().catch(() => {});
        }
      }

      if (!force && nearestIndex === lastDrawnFrameRef.current) return;

      const img = framesRef.current[nearestIndex];
      if (!img) return;

      const cw = canvasEl.width;
      const ch = canvasEl.height;
      const scale = Math.max(cw / activeRes.width, ch / activeRes.height);
      const dw = activeRes.width * scale;
      const dh = activeRes.height * scale;

      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
      lastDrawnFrameRef.current = nearestIndex;
    };

    const updateScrollProgress = () => {
      const rect = sectionEl.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      targetProgressRef.current = scrollable > 0 ? clamp01(-rect.top / scrollable) : 0;
    };

    const updateCSSVariablesAndSteps = () => {
      const p = smoothedProgressRef.current;
      stickyEl.style.setProperty("--p", p.toFixed(4));

      if (fadeRef.current && fadeOut) {
        fadeRef.current.style.opacity = String(clamp01((p - 0.85) / 0.15));
      }

      const stepIdx = steps.findIndex((s) => p >= s.from && p < s.to);
      if (stepIdx !== lastStepIndex) {
        lastStepIndex = stepIdx;
        setCurrentStep(stepIdx);
        setCurrentProgress(p);
      }
    };

    const renderLoop = () => {
      const diff = targetProgressRef.current - smoothedProgressRef.current;
      // 0.18 LERP smoothing factor
      smoothedProgressRef.current =
        Math.abs(diff) < 0.0005 ? targetProgressRef.current : smoothedProgressRef.current + 0.18 * diff;

      drawCurrentFrame();
      updateCSSVariablesAndSteps();

      if (smoothedProgressRef.current !== targetProgressRef.current && isVisibleInViewport) {
        rafId = requestAnimationFrame(renderLoop);
      } else {
        isLoopRunning = false;
      }
    };

    const scheduleRender = () => {
      updateScrollProgress();
      if (!isLoopRunning && isVisibleInViewport) {
        isLoopRunning = true;
        rafId = requestAnimationFrame(renderLoop);
      }
    };

    // Strided multi-pass loading: 8 -> 4 -> 2 -> 1
    const loadFramesWithFormat = async (format: string) => {
      const order: number[] = [];
      const visited = new Uint8Array(totalFrames);
      for (const stride of [8, 4, 2, 1]) {
        for (let i = 0; i < totalFrames; i += stride) {
          if (!visited[i]) {
            visited[i] = 1;
            order.push(i);
          }
        }
      }
      if (!visited[totalFrames - 1]) order.push(totalFrames - 1);

      let pointer = 0;
      const worker = async () => {
        while (pointer < order.length && !isCancelled) {
          const frameIndex = order[pointer++];
          const img = new Image();
          img.decoding = "async";
          img.src = `${sequence.dir}/${activeRes.dir}/${pad4(frameIndex + 1)}.${format}`;

          try {
            await img.decode();
          } catch {
            continue;
          }

          if (isCancelled) return;
          framesRef.current[frameIndex] = img;
          loadedCountRef.current++;

          stickyEl.style.setProperty("--loaded", (loadedCountRef.current / totalFrames).toFixed(3));

          if (loadedCountRef.current === 1) {
            setIsReady(true);
            scheduleRender();
            drawCurrentFrame(true);
          } else if (!isLoopRunning) {
            drawCurrentFrame();
          }
        }
      };

      await Promise.all(Array.from({ length: 6 }, worker));
    };

    const startPreloading = async () => {
      const avifSupported = sequence.formats.includes("avif") && (await checkAvifSupport());
      if (isCancelled) return;
      const format = avifSupported ? "avif" : "webp";
      loadFramesWithFormat(format);
    };

    const prefetchObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          prefetchObserver.disconnect();
          startPreloading();
        }
      },
      { rootMargin: priority ? "0px" : "120% 0px" }
    );

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisibleInViewport = entry.isIntersecting;
      if (isVisibleInViewport) {
        scheduleRender();
      } else {
        isLoopRunning = false;
        cancelAnimationFrame(rafId);
      }
    });

    prefetchObserver.observe(sectionEl);
    visibilityObserver.observe(sectionEl);

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(stickyEl);

    resizeCanvas();
    updateScrollProgress();
    smoothedProgressRef.current = targetProgressRef.current;
    updateCSSVariablesAndSteps();

    window.addEventListener("scroll", scheduleRender, { passive: true });
    window.addEventListener("resize", scheduleRender);

    return () => {
      isCancelled = true;
      isLoopRunning = false;
      cancelAnimationFrame(rafId);
      prefetchObserver.disconnect();
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("scroll", scheduleRender);
      window.removeEventListener("resize", scheduleRender);
      framesRef.current = [];
      setIsReady(false);
    };
  }, [sequence, isPortrait, priority, shouldAnimate, steps, totalFrames, fadeOut]);

  const desktopPrimary = sequence.desktop[0];
  const mobilePrimary = sequence.mobile;
  const posterPath = (res: { dir: string }, ext: string) => `${sequence.dir}/${res.dir}/0001.${ext}`;
  const totalHeight = isStatic ? "100svh" : `${100 * screens}svh`;

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-label={label}
      data-tone="footage"
      className={`relative bg-screen text-screen-foreground ${className}`}
      style={{ height: totalHeight }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-svh overflow-hidden bg-screen"
        style={{ "--p": 0, "--loaded": 0 } as React.CSSProperties}
      >
        {/* Baseline Static Poster Picture */}
        <picture>
          {sequence.formats.includes("avif") && (
            <source media={PORTRAIT_QUERY} type="image/avif" srcSet={posterPath(mobilePrimary, "avif")} />
          )}
          <source media={PORTRAIT_QUERY} type="image/webp" srcSet={posterPath(mobilePrimary, "webp")} />
          {sequence.formats.includes("avif") && (
            <source type="image/avif" srcSet={posterPath(desktopPrimary, "avif")} />
          )}
          <img
            src={posterPath(desktopPrimary, "webp")}
            alt={alt}
            width={desktopPrimary.width}
            height={desktopPrimary.height}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </picture>

        {/* High-Performance Canvas Scrubber */}
        {shouldAnimate && (
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="absolute inset-0 h-full w-full transition-opacity duration-700"
            style={{ opacity: isReady ? 1 : 0 }}
          />
        )}

        {/* Top Strided Loading Progress Line */}
        {shouldAnimate && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left bg-screen-foreground/70 transition-opacity duration-700"
            style={{
              transform: "scaleX(var(--loaded))",
              opacity: "calc(1 - var(--loaded))",
            }}
          />
        )}

        {shouldAnimate && !isReady && (
          <span className="sr-only" role="status">
            {loadingLabel}
          </span>
        )}

        {children?.({ step: currentStep, ready: isReady || !shouldAnimate, progress: currentProgress })}

        {fadeOut && (
          <div ref={fadeRef} className="pointer-events-none absolute inset-0 bg-background opacity-0" />
        )}
      </div>
    </section>
  );
}
