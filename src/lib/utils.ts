import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const formatters = new Map<string, Intl.NumberFormat>();

export function money(amount: number, currency = "BDT"): string {
  if (currency === "BDT" || currency === "Tk" || currency === "৳") {
    return `৳${amount.toLocaleString("en-US")}`;
  }
  let fmt = formatters.get(currency);
  if (!fmt) {
    fmt = new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    });
    formatters.set(currency, fmt);
  }
  return fmt.format(amount);
}

export function formatCurrency(amount: number, currency = "BDT"): string {
  return money(amount, currency);
}

export const pad4 = (num: number) => String(num).padStart(4, "0");
export const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);
export const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;
