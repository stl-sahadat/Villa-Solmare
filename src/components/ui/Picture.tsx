"use client";

import React from "react";

export interface PictureProps {
  name: string;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
  base?: string;
}

export function Picture({
  name,
  alt,
  sizes = "100vw",
  className = "",
  priority = false,
  base = "/media",
}: PictureProps) {
  const getSrcSet = (format: string) =>
    `${base}/${name}-800.${format} 800w, ${base}/${name}-1600.${format} 1600w`;

  return (
    <picture>
      <source type="image/avif" srcSet={getSrcSet("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={getSrcSet("webp")} sizes={sizes} />
      <img
        src={`${base}/${name}-1600.webp`}
        alt={alt}
        width={1600}
        height={900}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={className}
      />
    </picture>
  );
}
