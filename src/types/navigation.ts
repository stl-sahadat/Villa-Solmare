/**
 * Villa Solmare — Navigation Types
 */

export type SectionSlug = "the-house" | "inside" | "amenities" | "guests" | "stay" | "faq";

export interface NavigationLink {
  href: string;
  label: string;
  still: string;
  slug: SectionSlug;
}
