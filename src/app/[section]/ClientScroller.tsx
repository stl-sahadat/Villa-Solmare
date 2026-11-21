"use client";

import { useEffect } from "react";

export default function ClientScroller({ targetId }: { targetId: string }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [targetId]);

  return null;
}
