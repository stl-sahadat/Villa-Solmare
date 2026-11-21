import React from "react";

const ICON_PATHS: Record<string, string> = {
  wifi: "M2.5 9a14 14 0 0 1 19 0M5.5 12.5a9.5 9.5 0 0 1 13 0M8.5 16a5 5 0 0 1 7 0M12 19.5h.01",
  snow: "M12 2v20M3.3 7l17.4 10M3.3 17l17.4-10M9 4l3 2 3-2M9 20l3-2 3 2",
  kitchen: "M4 3h16v18H4zM4 9h16M8 6h.01M11 6h.01M8 13v4",
  washer: "M4 3h16v18H4zM4 7h16M7 5h.01M12 10a4 4 0 1 0 0 8 4 4 0 0 0 0-8",
  linen: "M3 7h18v10H3zM3 11h18M7 7V5h10v2",
  sun: "M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10M12 1.5v2M12 20.5v2M1.5 12h2M20.5 12h2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M4.6 19.4L6 18M18 6l1.4-1.4",
  tree: "M12 22v-7M12 15c-4 0-7-2.5-7-6.5S8 2 12 2s7 2.5 7 6.5-3 6.5-7 6.5M9 22h6",
  shower: "M6 22V6a3 3 0 0 1 6 0M9.5 9h5M12 12v.01M15 12v.01M13.5 15v.01M16.5 15v.01M18 12v.01",
  grill: "M4 9h16a8 8 0 0 1-16 0M8 17l-2 5M16 17l2 5M9 5c0-1 1-1 1-2M14 5c0-1 1-1 1-2",
  car: "M3 16V11l2.5-5h13L21 11v5H3zM3 16v2h3v-2M18 16v2h3v-2M7 13h.01M17 13h.01",
  chef: "M6 13a4 4 0 0 1 .6-7.9A5 5 0 0 1 16 4a4 4 0 0 1 2 9v7H6zM6 17h12",
  plane: "M10.5 21l1.5-1 1.5 1v-4l7-3v-2l-7 1V5.5a1.5 1.5 0 0 0-3 0V13l-7-1v2l7 3z",
  boat: "M3 17l2 4h14l2-4H3zM12 3v14M12 3l6 11H12",
  cot: "M3 6v14M21 6v14M3 16h18M3 10h18M8 10v6M13 10v6M18 10v6",
  check: "M5 12.5l4.5 4.5L19 7.5",
  star: "M12 2.8l2.8 5.8 6.4.9-4.6 4.5 1.1 6.3L12 17.3l-5.7 3 1.1-6.3-4.6-4.5 6.4-.9z",
  grid: "M3 3h7.5v7.5H3zM13.5 3H21v7.5h-7.5zM3 13.5h7.5V21H3zM13.5 13.5H21V21h-7.5z",
  arrow: "M5 12h14M13 6l6 6-6 6",
};

export interface IconProps {
  name: string;
  className?: string;
  filled?: boolean;
}

export function Icon({ name, className = "h-6 w-6", filled = false }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.5 * (filled ? 0 : 1)}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={ICON_PATHS[name] ?? ICON_PATHS.check} />
    </svg>
  );
}

// Named alias for convenience
export const Icons = {
  Icon,
};
