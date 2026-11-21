import React from "react";
import { Header } from "@/components/Header";
import { Arrival } from "@/components/Arrival";
import { House } from "@/components/House";
import { Walk } from "@/components/Walk";
import { Details } from "@/components/Details";
import { Guests } from "@/components/Guests";
import { Book } from "@/components/Book";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Arrival />
        <House />
        <Walk />
        <Details />
        <Guests />
        <Book />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
