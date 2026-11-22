"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { clamp, lerp } from "@/lib/utils";

interface CanvasPlayerProps {
  totalFrames: number;
  progress: number; // 0 to 1
  framePrefix?: string;
  className?: string;
  fallbackImage?: string;
  onLoadProgress?: (percent: number) => void;
  renderCustomScene?: (ctx: CanvasRenderingContext2D, width: number, height: number, progress: number) => void;
}

export function CanvasPlayer({
  totalFrames = 64,
  progress,
  framePrefix,
  className = "",
  fallbackImage,
  onLoadProgress,
  renderCustomScene,
}: CanvasPlayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>(new Array(totalFrames).fill(null));
  const [loadedPercent, setLoadedPercent] = useState(0);
  const currentRenderIndexRef = useRef(0);
  const smoothedProgressRef = useRef(progress);
  const targetProgressRef = useRef(progress);
  const rafIdRef = useRef<number | null>(null);
  const fallbackImgRef = useRef<HTMLImageElement | null>(null);
  const dimsRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });

  // Keep targetProgressRef updated
  useEffect(() => {
    targetProgressRef.current = progress;
  }, [progress]);

  // 1. Multi-pass Stride Generation (8 -> 4 -> 2 -> 1)
  const getLoadOrder = useCallback((count: number): number[] => {
    const order: number[] = [];
    const visited = new Uint8Array(count);
    const strides = [8, 4, 2, 1];

    for (const stride of strides) {
      for (let i = 0; i < count; i += stride) {
        if (!visited[i]) {
          visited[i] = 1;
          order.push(i);
        }
      }
    }
    if (!visited[count - 1]) order.push(count - 1);
    return order;
  }, []);

  // Multi-worker frame loader
  useEffect(() => {
    if (!framePrefix) {
      setLoadedPercent(100);
      onLoadProgress?.(100);
      return;
    }

    let cancelled = false;
    const loadOrder = getLoadOrder(totalFrames);
    let pointer = 0;
    let loadedCount = 0;

    const worker = async () => {
      while (pointer < loadOrder.length && !cancelled) {
        const frameIndex = loadOrder[pointer++];
        const img = new Image();
        img.decoding = "async";
        const paddedNum = (frameIndex + 1).toString().padStart(4, "0");
        img.src = `${framePrefix}${paddedNum}.webp`;

        try {
          await img.decode();
          if (!cancelled) {
            framesRef.current[frameIndex] = img;
            loadedCount++;
            const pct = Math.round((loadedCount / totalFrames) * 100);
            setLoadedPercent(pct);
            onLoadProgress?.(pct);
            // Trigger render if idle to display freshly loaded neighbor
            if (rafIdRef.current === null) {
              scheduleRender();
            }
          }
        } catch {
          // If frame missing, continue gracefully
        }
      }
    };

    const workerCount = Math.min(6, loadOrder.length);
    Promise.all(Array.from({ length: workerCount }, worker));

    return () => {
      cancelled = true;
    };
  }, [totalFrames, framePrefix, getLoadOrder, onLoadProgress]);

  // Load fallback image if provided
  useEffect(() => {
    if (fallbackImage) {
      const img = new Image();
      img.src = fallbackImage;
      img.onload = () => {
        fallbackImgRef.current = img;
        if (rafIdRef.current === null) {
          scheduleRender();
        }
      };
    }
  }, [fallbackImage]);

  // Canvas draw frame helper
  const drawCover = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      img: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
      cw: number,
      ch: number
    ) => {
      const imgWidth = "videoWidth" in img ? (img as HTMLVideoElement).videoWidth : img.width;
      const imgHeight = "videoHeight" in img ? (img as HTMLVideoElement).videoHeight : img.height;
      if (!imgWidth || !imgHeight) return;

      const imgRatio = imgWidth / imgHeight;
      const canvasRatio = cw / ch;

      let drawWidth = cw;
      let drawHeight = ch;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        drawHeight = cw / imgRatio;
        offsetY = (ch - drawHeight) / 2;
      } else {
        drawWidth = ch * imgRatio;
        offsetX = (cw - drawWidth) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    },
    []
  );

  // Resize listener using ResizeObserver to eliminate forced reflow in rAF
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateDimensions = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const targetW = Math.round(rect.width * dpr);
      const targetH = Math.round(rect.height * dpr);

      if (targetW > 0 && targetH > 0) {
        dimsRef.current = { w: targetW, h: targetH };
        if (canvas.width !== targetW || canvas.height !== targetH) {
          canvas.width = targetW;
          canvas.height = targetH;
        }
      }
    };

    updateDimensions();

    const ro = new ResizeObserver(() => {
      updateDimensions();
      scheduleRender();
    });
    ro.observe(canvas);

    window.addEventListener("resize", updateDimensions, { passive: true });

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const targetProgress = clamp(targetProgressRef.current, 0, 1);
    const delta = targetProgress - smoothedProgressRef.current;
    const isAtTarget = Math.abs(delta) < 0.0005;

    if (isAtTarget) {
      smoothedProgressRef.current = targetProgress;
    } else {
      smoothedProgressRef.current += delta * 0.18;
    }

    const p = smoothedProgressRef.current;
    const { w, h } = dimsRef.current;
    if (w === 0 || h === 0) return;

    const exactFrame = p * (totalFrames - 1);
    const targetIndex = Math.round(exactFrame);

    // Check if exact frame is loaded
    let frameToDraw = framesRef.current[targetIndex];

    // 3. Nearest Loaded Neighbor Fallback
    if (!frameToDraw) {
      let minDiff = Infinity;
      let nearestIndex = -1;
      for (let i = 0; i < totalFrames; i++) {
        if (framesRef.current[i]) {
          const diff = Math.abs(i - targetIndex);
          if (diff < minDiff) {
            minDiff = diff;
            nearestIndex = i;
          }
        }
      }
      if (nearestIndex !== -1) {
        frameToDraw = framesRef.current[nearestIndex];
      }
    }

    if (frameToDraw) {
      drawCover(ctx, frameToDraw, w, h);
    } else if (fallbackImgRef.current) {
      drawCover(ctx, fallbackImgRef.current, w, h);
    } else if (renderCustomScene) {
      renderCustomScene(ctx, w, h, p);
    } else {
      // Fallback procedural Amalfi Golden Hour render
      drawProceduralAmalfi(ctx, w, h, p);
    }

    currentRenderIndexRef.current = targetIndex;

    // Continue animation only if still moving toward target
    if (!isAtTarget) {
      rafIdRef.current = requestAnimationFrame(renderFrame);
    } else {
      rafIdRef.current = null;
    }
  }, [totalFrames, drawCover, renderCustomScene]);

  const scheduleRender = useCallback(() => {
    if (rafIdRef.current === null) {
      rafIdRef.current = requestAnimationFrame(renderFrame);
    }
  }, [renderFrame]);

  // Trigger render whenever progress changes
  useEffect(() => {
    scheduleRender();
  }, [progress, scheduleRender]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`block w-full h-full object-cover pointer-events-none select-none ${className}`}
      style={{
        transform: "translate3d(0, 0, 0)",
        willChange: "transform",
      }}
    />
  );
}

// Architectural Procedural Amalfi Coast Canvas Generator
// Used as seamless fallback if images are loading or in offline mode
function drawProceduralAmalfi(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  p: number
) {
  // Horizon Sky Gradient (Amalfi Golden Hour into Dusk)
  const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.65);
  // Shift from warm Italian gold into deep Mediterranean twilight based on p
  const r1 = Math.round(lerp(230, 35, p));
  const g1 = Math.round(lerp(180, 20, p));
  const b1 = Math.round(lerp(140, 30, p));
  skyGrad.addColorStop(0, `rgb(${r1}, ${g1}, ${b1})`);
  skyGrad.addColorStop(0.5, `rgb(${Math.round(r1 * 0.85)}, ${Math.round(g1 * 0.7)}, ${Math.round(b1 * 0.9)})`);
  skyGrad.addColorStop(1, `rgb(${Math.round(lerp(190, 20, p))}, ${Math.round(lerp(110, 15, p))}, ${Math.round(lerp(70, 25, p))})`);

  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, h);

  // Sea Gradient (Tyrrhenian Blue to Emerald Deep)
  const seaGrad = ctx.createLinearGradient(0, h * 0.55, 0, h);
  const seaR = Math.round(lerp(18, 10, p));
  const seaG = Math.round(lerp(45, 18, p));
  const seaB = Math.round(lerp(72, 35, p));
  seaGrad.addColorStop(0, `rgb(${seaR}, ${seaG}, ${seaB})`);
  seaGrad.addColorStop(1, `rgb(${Math.round(seaR * 0.6)}, ${Math.round(seaG * 0.5)}, ${Math.round(seaB * 0.6)})`);

  ctx.fillStyle = seaGrad;
  ctx.fillRect(0, h * 0.55, w, h * 0.45);

  // Sun / Moon Glow
  const sunX = w * (0.68 - p * 0.15);
  const sunY = h * (0.42 + p * 0.18);
  const sunRadius = Math.max(w * 0.18, 120);
  const sunGlow = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, sunRadius);
  sunGlow.addColorStop(0, `rgba(255, 235, 180, ${lerp(0.85, 0.2, p)})`);
  sunGlow.addColorStop(0.4, `rgba(255, 180, 110, ${lerp(0.4, 0.05, p)})`);
  sunGlow.addColorStop(1, "rgba(255, 150, 80, 0)");

  ctx.fillStyle = sunGlow;
  ctx.beginPath();
  ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
  ctx.fill();

  // Distant Amalfi Cliffs (Layer 1)
  ctx.fillStyle = `rgba(${Math.round(lerp(45, 15, p))}, ${Math.round(lerp(35, 12, p))}, ${Math.round(lerp(30, 18, p))}, 0.7)`;
  ctx.beginPath();
  ctx.moveTo(0, h * 0.58);
  ctx.bezierCurveTo(w * 0.2, h * 0.52, w * 0.4, h * 0.54, w * 0.6, h * 0.56);
  ctx.lineTo(w * 0.6, h * 0.65);
  ctx.lineTo(0, h * 0.65);
  ctx.closePath();
  ctx.fill();

  // Foreground Clifftop Architecture & Villa Solmare Travertine Balcony
  const stoneGrad = ctx.createLinearGradient(0, h * 0.6, 0, h);
  const stoneL = Math.round(lerp(180, 30, p));
  stoneGrad.addColorStop(0, `rgb(${stoneL}, ${Math.round(stoneL * 0.9)}, ${Math.round(stoneL * 0.78)})`);
  stoneGrad.addColorStop(1, `rgb(${Math.round(stoneL * 0.7)}, ${Math.round(stoneL * 0.6)}, ${Math.round(stoneL * 0.5)})`);

  // Stone Balustrade & Cantilevered Infinity Edge
  ctx.fillStyle = stoneGrad;
  ctx.beginPath();
  ctx.moveTo(w * 0.25, h);
  ctx.lineTo(w * 0.35, h * 0.72);
  ctx.lineTo(w, h * 0.68);
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.fill();

  // Water Reflection Shimmer on Terrace Pool Edge
  const poolGrad = ctx.createLinearGradient(w * 0.38, h * 0.74, w * 0.95, h * 0.88);
  poolGrad.addColorStop(0, `rgba(64, 180, 200, ${lerp(0.65, 0.3, p)})`);
  poolGrad.addColorStop(1, `rgba(20, 90, 120, ${lerp(0.85, 0.4, p)})`);
  ctx.fillStyle = poolGrad;
  ctx.beginPath();
  ctx.moveTo(w * 0.38, h * 0.74);
  ctx.lineTo(w * 0.95, h * 0.7);
  ctx.lineTo(w * 0.98, h * 0.88);
  ctx.lineTo(w * 0.45, h * 0.92);
  ctx.closePath();
  ctx.fill();

  // Subtle Atmospheric Vignette
  const vignette = ctx.createRadialGradient(w * 0.5, h * 0.5, w * 0.3, w * 0.5, h * 0.5, w * 0.75);
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(1, `rgba(15, 8, 4, ${lerp(0.35, 0.6, p)})`);
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, w, h);
}
