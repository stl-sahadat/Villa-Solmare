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
];

export function generateStaticParams() {
  return VALID_SECTIONS.map((section) => ({ section }));
}

export default function SectionPage({ params }: { params: { section: string } }) {
  if (!VALID_SECTIONS.includes(params.section)) {
    notFound();
  }

  let targetId = params.section;
  if (targetId === "faq") targetId = "questions";
  if (targetId === "house") targetId = "the-house";

  return (
    <>
      <ClientScroller targetId={targetId} />
      <HomePage />
    </>
  );
}
