import React from "react";

export function Slate({
  index,
  label,
  className = "",
}: {
  index?: string;
  label: string;
  className?: string;
}) {
  return (
    <p className={`flex items-center gap-3 text-sm font-medium tracking-[0.01em] ${className}`}>
      {index && <span className="tnum">{index}</span>}
      {index && <span aria-hidden="true" className="h-px w-8 bg-current opacity-50" />}
      <span>{label}</span>
    </p>
  );
}
