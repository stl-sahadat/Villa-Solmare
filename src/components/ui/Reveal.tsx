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

export interface RevealProps {
  children: React.ReactNode;
  variant?: "open" | "door" | "rise";
  delay?: number;
  open?: boolean;
  static?: boolean;
  as?: React.ElementType;
  className?: string;
  innerClassName?: string;
  style?: React.CSSProperties;
}

export function Reveal({
  children,
  variant = "open",
  delay = 0,
  open,
  static: isStatic,
  as: Component = "div",
  className = "",
  innerClassName = "",
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const isOpen = isStatic || (mounted && (open ?? inView));

  const clipPathMap = {
    open: "inset(50% 0 50% 0)",
    door: "inset(0 100% 0 0)",
    rise: "inset(0 -0.2em -0.15em 0)",
  };

  const transformMap = {
    open: "scale(1.04)",
    door: "translateX(-6%)",
    rise: "translateY(110%)",
  };

  return (
    <Component
      ref={ref}
      className={className}
      style={{
        ...style,
        clipPath: isOpen
          ? variant === "rise"
            ? "inset(0 -0.2em -0.15em 0)"
            : "inset(0 0 0 0)"
          : clipPathMap[variant],
        transition: isStatic ? "none" : `clip-path 900ms var(--ease-door) ${delay}ms`,
      }}
    >
      <span
        className={`block ${innerClassName}`}
        style={{
          transform: isOpen ? "none" : transformMap[variant],
          transformOrigin: variant === "door" ? "left center" : "center",
          transition: isStatic ? "none" : `transform 900ms var(--ease-door) ${delay}ms`,
        }}
      >
        {children}
      </span>
    </Component>
  );
}
