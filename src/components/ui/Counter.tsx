"use client";

import React, { useEffect, useRef, useState } from "react";

function useInView(ref: React.RefObject<Element | null>, rootMargin = "0px") {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return inView;
}

export interface CounterProps {
  value: number;
  duration?: number;
  static?: boolean;
  className?: string;
  suffix?: string;
  format?: (value: number) => string;
}

export function Counter({
  value,
  duration = 1400,
  static: isStatic,
  className = "",
  suffix = "",
  format = (v) => v.toLocaleString("en-GB"),
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, "0px 0px -15% 0px");
  const [displayValue, setDisplayValue] = useState(isStatic ? value : 0);

  useEffect(() => {
    if (isStatic || !inView) return;

    let rafId = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      // Ease out cubic (power of 3.2 matching original)
      setDisplayValue(Math.round((1 - Math.pow(1 - progress, 3.2)) * value));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, value, duration, isStatic]);

  return (
    <span ref={ref} className={className} aria-label={`${format(value)}${suffix}`}>
      <span aria-hidden="true">
        {format(displayValue)}
        {suffix}
      </span>
    </span>
  );
}
