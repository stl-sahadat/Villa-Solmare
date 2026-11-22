import React from "react";
import { notFound } from "next/navigation";
import ClientScroller from "./ClientScroller";
import HomePage from "../page";

const VALID_SECTIONS = [
  "the-house",
  "inside",
  "amenities",
  "guests",
  "stay",
  "questions",
  "faq",
  "house",
] as const;

export function generateStaticParams(): { section: string }[] {
  return VALID_SECTIONS.map((section) => ({ section }));
}

interface SectionPageProps {
  params: Promise<{ section: string }>;
}

export default async function SectionPage({ params }: SectionPageProps) {
  const { section } = await params;

  if (!VALID_SECTIONS.includes(section as (typeof VALID_SECTIONS)[number])) {
    notFound();
  }

  let targetId = section;
  if (targetId === "faq") targetId = "questions";
  if (targetId === "house") targetId = "the-house";

  return (
    <>
      <ClientScroller targetId={targetId} />
      <HomePage />
    </>
  );
}
