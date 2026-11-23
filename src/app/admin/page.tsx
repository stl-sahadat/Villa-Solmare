"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import type { AdminTab } from "@/types";

interface SiteConfig {
  site: {
    name: string;
    title: string;
    description: string;
    url: string;
    lang: string;
  };
  arrival: {
    eyebrow: string;
    tagline: string;
    hint: string;
  };
  booking: {
    priceFrom: number;
    currency: string;
    maxGuests: number;
    minNights: number;
    checkIn: string;
    checkOut: string;
  };
  owner: {
    name: string;
    phone: string;
    whatsapp: string;
    email: string;
    instagram: string;
    street: string;
    city: string;
    country: string;
  };
  intro: {
    heading: string;
    text: string;
    facts: { value: number; label: string }[];
  };
  walk: {
    rooms: { from: number; to: number; name: string; italian: string; text: string }[];
  };
  amenities: {
    group: string;
    photo: string;
    items: { icon: string; label: string }[];
  }[];
  area: {
    heading: string;
    text: string;
    places: { name: string; minutes: number; by: string }[];
  };
  guests: {
    heading: string;
    rating: string;
    count: string;
    source: string;
    items: {
      author: string;
      from: string;
      when: string;
      nights: number;
      quote: string;
    }[];
  };
  faq: {
    heading: string;
    items: { q: string; a: string }[];
  };
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [activeTab, setActiveTab] = useState<AdminTab>("general");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  // Check auth status on mount
  useEffect(() => {
    fetch("/api/admin/auth")
      .then((res) => {
        if (res.ok) {
          setIsAuthenticated(true);
          loadConfig();
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(() => setIsAuthenticated(false));
  }, []);

  const loadConfig = () => {
    fetch("/api/admin/config")
      .then((res) => res.json())
      .then((data) => setConfig(data))
      .catch((err) => console.error("Error loading config:", err));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
        loadConfig();
      } else {
        const data = await res.json();
        setLoginError(data.error || "Invalid username or password");
      }
    } catch {
      setLoginError("Connection error. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setIsAuthenticated(false);
  };

  const handleSave = async () => {
    if (!config) return;
    setIsSaving(true);
    setSaveSuccess(false);
    setSaveError("");

    try {
      const res = await fetch("/api/admin/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 4000);
      } else {
        const err = await res.json();
        setSaveError(err.error || "Failed to save changes");
      }
    } catch {
      setSaveError("Network error. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Helper updates
  const updateField = (path: string[], value: unknown) => {
    if (!config) return;
    const next = JSON.parse(JSON.stringify(config)) as Record<string, any>;
    let cur = next;
    for (let i = 0; i < path.length - 1; i++) {
      cur = cur[path[i]];
    }
    cur[path[path.length - 1]] = value;
    setConfig(next as unknown as SiteConfig);
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-foreground">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-primary animate-ping" />
          <span className="font-display text-xl tracking-wide">Loading Sanctuary Admin...</span>
        </div>
      </div>
    );
  }

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6 selection:bg-primary/20">
        <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />

          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-[0.25em] text-primary font-medium block">
              Architectural Portal
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-[340] text-foreground mt-2">
              Villa Solmare
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Administrator Management Suite</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full h-12 px-4 rounded-xl border border-input bg-background text-foreground transition-all focus:border-ring focus:ring-2 focus:ring-ring/20 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className="w-full h-12 px-4 rounded-xl border border-input bg-background text-foreground transition-all focus:border-ring focus:ring-2 focus:ring-ring/20 outline-none"
              />
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-xs">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full h-12 mt-2 rounded-xl bg-primary text-primary-foreground font-medium transition-transform duration-200 active:scale-[0.98] hover:opacity-95 shadow-md flex items-center justify-center gap-2"
            >
              {isLoggingIn ? "Verifying..." : "Access Admin Console"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-border/70 text-center">
            <Link
              href="/"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Return to Villa Solmare Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-foreground">
        <span className="font-display text-xl">Loading configuration...</span>
      </div>
    );
  }

  // DASHBOARD SCREEN
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-card/90 backdrop-blur-md border-b border-border px-6 md:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-display text-2xl font-[340] hover:opacity-80 transition-opacity">
            {config.site.name}
          </Link>
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-xs font-mono uppercase bg-primary/10 text-primary border border-primary/20">
            Admin Suite
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:flex h-9 items-center px-4 rounded-full border border-border text-xs font-medium hover:bg-muted transition-colors"
          >
            Live Site ↗
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="h-9 px-4 rounded-full bg-muted text-muted-foreground hover:text-foreground text-xs font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Navigation Sidebar Tabs */}
        <aside className="md:col-span-3 space-y-1">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold px-3 mb-3">
            Configuration Modules
          </p>
          {[
            { id: "general", label: "🏛️ Site & Pricing" },
            { id: "owner", label: "👤 Owner & Contact" },
            { id: "intro", label: "🏡 The House (Intro)" },
            { id: "walk", label: "🚪 Inside Walkthrough" },
            { id: "amenities", label: "🌿 Amenities & Area" },
            { id: "guests", label: "⭐ Guest Reviews" },
            { id: "faq", label: "❓ FAQ Accordion" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as AdminTab)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-card"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </aside>

        {/* Content Tab Panels */}
        <main className="md:col-span-9 bg-card rounded-2xl border border-border p-6 md:p-8 space-y-8">
          {/* TAB 1: SITE & PRICING */}
          {activeTab === "general" && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-2xl font-[340]">Site & Booking Parameters</h2>
                <p className="text-sm text-muted-foreground">Core naming, branding, and rates</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                    Villa Name
                  </label>
                  <input
                    type="text"
                    value={config.site.name}
                    onChange={(e) => updateField(["site", "name"], e.target.value)}
                    className="w-full h-11 px-3.5 rounded-lg border border-input bg-background text-foreground text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                    Arrival Eyebrow
                  </label>
                  <input
                    type="text"
                    value={config.arrival.eyebrow}
                    onChange={(e) => updateField(["arrival", "eyebrow"], e.target.value)}
                    className="w-full h-11 px-3.5 rounded-lg border border-input bg-background text-foreground text-sm font-display italic"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                    Tagline (Arrival Hero)
                  </label>
                  <input
                    type="text"
                    value={config.arrival.tagline}
                    onChange={(e) => updateField(["arrival", "tagline"], e.target.value)}
                    className="w-full h-11 px-3.5 rounded-lg border border-input bg-background text-foreground text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                      Nightly Rate (BDT ৳)
                    </label>
                    <input
                      type="number"
                      value={config.booking.priceFrom}
                      onChange={(e) => updateField(["booking", "priceFrom"], Number(e.target.value))}
                      className="w-full h-11 px-3.5 rounded-lg border border-input bg-background text-foreground text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                      Currency (e.g. BDT)
                    </label>
                    <input
                      type="text"
                      value={config.booking.currency || "BDT"}
                      onChange={(e) => updateField(["booking", "currency"], e.target.value)}
                      placeholder="BDT"
                      className="w-full h-11 px-3.5 rounded-lg border border-input bg-background text-foreground text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                    Minimum Nights Stay
                  </label>
                  <input
                    type="number"
                    value={config.booking.minNights}
                    onChange={(e) => updateField(["booking", "minNights"], Number(e.target.value))}
                    className="w-full h-11 px-3.5 rounded-lg border border-input bg-background text-foreground text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                    Check-in Time
                  </label>
                  <input
                    type="text"
                    value={config.booking.checkIn}
                    onChange={(e) => updateField(["booking", "checkIn"], e.target.value)}
                    className="w-full h-11 px-3.5 rounded-lg border border-input bg-background text-foreground text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                    Checkout Time
                  </label>
                  <input
                    type="text"
                    value={config.booking.checkOut}
                    onChange={(e) => updateField(["booking", "checkOut"], e.target.value)}
                    className="w-full h-11 px-3.5 rounded-lg border border-input bg-background text-foreground text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                    SEO Meta Description
                  </label>
                  <textarea
                    rows={2}
                    value={config.site.description}
                    onChange={(e) => updateField(["site", "description"], e.target.value)}
                    className="w-full p-3 rounded-lg border border-input bg-background text-foreground text-sm resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: OWNER & CONTACT */}
          {activeTab === "owner" && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-2xl font-[340]">Owner & Contact Details</h2>
                <p className="text-sm text-muted-foreground">Communication channels & property address</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                    Owner Name
                  </label>
                  <input
                    type="text"
                    value={config.owner.name}
                    onChange={(e) => updateField(["owner", "name"], e.target.value)}
                    className="w-full h-11 px-3.5 rounded-lg border border-input bg-background text-foreground text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                    Phone Number (Masked)
                  </label>
                  <input
                    type="text"
                    value={config.owner.phone}
                    onChange={(e) => updateField(["owner", "phone"], e.target.value)}
                    className="w-full h-11 px-3.5 rounded-lg border border-input bg-background text-foreground text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                    WhatsApp Link Number
                  </label>
                  <input
                    type="text"
                    value={config.owner.whatsapp}
                    onChange={(e) => updateField(["owner", "whatsapp"], e.target.value)}
                    className="w-full h-11 px-3.5 rounded-lg border border-input bg-background text-foreground text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                    Contact Email (Gmail)
                  </label>
                  <input
                    type="text"
                    value={config.owner.email}
                    onChange={(e) => updateField(["owner", "email"], e.target.value)}
                    className="w-full h-11 px-3.5 rounded-lg border border-input bg-background text-foreground text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                    Instagram Handle
                  </label>
                  <div className="flex">
                    <span className="h-11 px-3 inline-flex items-center rounded-l-lg border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                      @
                    </span>
                    <input
                      type="text"
                      value={config.owner.instagram}
                      onChange={(e) => updateField(["owner", "instagram"], e.target.value)}
                      className="w-full h-11 px-3.5 rounded-r-lg border border-input bg-background text-foreground text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                    Street / Area
                  </label>
                  <input
                    type="text"
                    value={config.owner.street}
                    onChange={(e) => updateField(["owner", "street"], e.target.value)}
                    className="w-full h-11 px-3.5 rounded-lg border border-input bg-background text-foreground text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                    City / District
                  </label>
                  <input
                    type="text"
                    value={config.owner.city}
                    onChange={(e) => updateField(["owner", "city"], e.target.value)}
                    className="w-full h-11 px-3.5 rounded-lg border border-input bg-background text-foreground text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                    Country
                  </label>
                  <input
                    type="text"
                    value={config.owner.country}
                    onChange={(e) => updateField(["owner", "country"], e.target.value)}
                    className="w-full h-11 px-3.5 rounded-lg border border-input bg-background text-foreground text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: THE HOUSE (INTRO) */}
          {activeTab === "intro" && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-2xl font-[340]">Section 01: The House</h2>
                <p className="text-sm text-muted-foreground">Architectural narrative and numerical facts</p>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                  Heading
                </label>
                <input
                  type="text"
                  value={config.intro.heading}
                  onChange={(e) => updateField(["intro", "heading"], e.target.value)}
                  className="w-full h-11 px-3.5 rounded-lg border border-input bg-background text-foreground text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                  Description Text
                </label>
                <textarea
                  rows={3}
                  value={config.intro.text}
                  onChange={(e) => updateField(["intro", "text"], e.target.value)}
                  className="w-full p-3 rounded-lg border border-input bg-background text-foreground text-sm resize-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm uppercase tracking-wider font-semibold text-foreground">
                    Facts Counters
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      const newFacts = [...config.intro.facts, { value: 0, label: "New Fact" }];
                      updateField(["intro", "facts"], newFacts);
                    }}
                    className="px-3 py-1 rounded-md bg-primary text-primary-foreground text-xs font-medium"
                  >
                    + Add Fact
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {config.intro.facts.map((fact, idx) => (
                    <div key={idx} className="p-3 rounded-xl border border-border bg-background flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground font-mono">#{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const newFacts = config.intro.facts.filter((_, i) => i !== idx);
                            updateField(["intro", "facts"], newFacts);
                          }}
                          className="text-red-500 hover:text-red-700 text-xs"
                        >
                          ✕ Delete
                        </button>
                      </div>
                      <input
                        type="number"
                        value={fact.value}
                        onChange={(e) => {
                          const newFacts = [...config.intro.facts];
                          newFacts[idx].value = Number(e.target.value);
                          updateField(["intro", "facts"], newFacts);
                        }}
                        className="h-9 px-2 rounded border border-input bg-card text-foreground text-sm"
                        placeholder="Value"
                      />
                      <input
                        type="text"
                        value={fact.label}
                        onChange={(e) => {
                          const newFacts = [...config.intro.facts];
                          newFacts[idx].label = e.target.value;
                          updateField(["intro", "facts"], newFacts);
                        }}
                        className="h-9 px-2 rounded border border-input bg-card text-foreground text-sm"
                        placeholder="Label"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: INSIDE WALK */}
          {activeTab === "walk" && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-2xl font-[340]">Section 02: Inside Walkthrough</h2>
                <p className="text-sm text-muted-foreground">Scrub sequence room narratives & HUD labels</p>
              </div>

              <div className="space-y-4">
                {config.walk.rooms.map((room, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-border bg-background space-y-3">
                    <div className="flex items-center justify-between border-b border-border/60 pb-2">
                      <span className="font-display font-medium text-foreground">Room 0{idx + 1}</span>
                      <span className="text-xs font-mono text-muted-foreground">
                        Scrub range: {Math.round(room.from * 100)}% – {Math.round(room.to * 100)}%
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                          Room Name
                        </label>
                        <input
                          type="text"
                          value={room.name}
                          onChange={(e) => {
                            const newRooms = [...config.walk.rooms];
                            newRooms[idx].name = e.target.value;
                            updateField(["walk", "rooms"], newRooms);
                          }}
                          className="w-full h-10 px-3 rounded border border-input bg-card text-foreground text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                          Italian Subtitle
                        </label>
                        <input
                          type="text"
                          value={room.italian}
                          onChange={(e) => {
                            const newRooms = [...config.walk.rooms];
                            newRooms[idx].italian = e.target.value;
                            updateField(["walk", "rooms"], newRooms);
                          }}
                          className="w-full h-10 px-3 rounded border border-input bg-card text-foreground text-sm font-display italic"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                          Room Description
                        </label>
                        <textarea
                          rows={2}
                          value={room.text}
                          onChange={(e) => {
                            const newRooms = [...config.walk.rooms];
                            newRooms[idx].text = e.target.value;
                            updateField(["walk", "rooms"], newRooms);
                          }}
                          className="w-full p-2.5 rounded border border-input bg-card text-foreground text-sm resize-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: AMENITIES & AREA */}
          {activeTab === "amenities" && (
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-2xl font-[340]">Section 03: Amenities & Area</h2>
                <p className="text-sm text-muted-foreground">Feature groupings and surrounding destinations</p>
              </div>

              {/* Amenities Groups */}
              <div className="space-y-4">
                <h3 className="text-sm uppercase tracking-wider font-semibold text-foreground">
                  Amenities Groups
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {config.amenities.map((group, gIdx) => (
                    <div key={gIdx} className="p-4 rounded-xl border border-border bg-background space-y-3">
                      <div className="flex items-center justify-between border-b border-border/60 pb-2">
                        <input
                          type="text"
                          value={group.group}
                          onChange={(e) => {
                            const newAmenities = [...config.amenities];
                            newAmenities[gIdx].group = e.target.value;
                            updateField(["amenities"], newAmenities);
                          }}
                          className="font-display font-medium text-foreground bg-transparent border-b border-input text-base"
                        />
                      </div>

                      <ul className="space-y-2">
                        {group.items.map((item, iIdx) => (
                          <li key={iIdx} className="flex items-center gap-2">
                            <span className="text-xs font-mono text-muted-foreground w-12 truncate">
                              {item.icon}
                            </span>
                            <input
                              type="text"
                              value={item.label}
                              onChange={(e) => {
                                const newAmenities = [...config.amenities];
                                newAmenities[gIdx].items[iIdx].label = e.target.value;
                                updateField(["amenities"], newAmenities);
                              }}
                              className="h-8 px-2 w-full rounded border border-input bg-card text-foreground text-xs"
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Around the House Section */}
              <div className="space-y-4 pt-4 border-t border-border">
                <h3 className="text-sm uppercase tracking-wider font-semibold text-foreground">
                  Around The House (Destinations)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                      Section Heading
                    </label>
                    <input
                      type="text"
                      value={config.area.heading}
                      onChange={(e) => updateField(["area", "heading"], e.target.value)}
                      className="w-full h-10 px-3 rounded border border-input bg-background text-foreground text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                      Summary Text
                    </label>
                    <input
                      type="text"
                      value={config.area.text}
                      onChange={(e) => updateField(["area", "text"], e.target.value)}
                      className="w-full h-10 px-3 rounded border border-input bg-background text-foreground text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  {config.area.places.map((place, idx) => (
                    <div key={idx} className="p-3 rounded-lg border border-border bg-background flex flex-wrap items-center gap-3">
                      <input
                        type="text"
                        value={place.name}
                        onChange={(e) => {
                          const newPlaces = [...config.area.places];
                          newPlaces[idx].name = e.target.value;
                          updateField(["area", "places"], newPlaces);
                        }}
                        className="h-9 px-2 flex-1 min-w-[140px] rounded border border-input bg-card text-foreground text-sm"
                        placeholder="Destination"
                      />
                      <input
                        type="number"
                        value={place.minutes}
                        onChange={(e) => {
                          const newPlaces = [...config.area.places];
                          newPlaces[idx].minutes = Number(e.target.value);
                          updateField(["area", "places"], newPlaces);
                        }}
                        className="h-9 px-2 w-20 rounded border border-input bg-card text-foreground text-sm"
                        placeholder="Min"
                      />
                      <input
                        type="text"
                        value={place.by}
                        onChange={(e) => {
                          const newPlaces = [...config.area.places];
                          newPlaces[idx].by = e.target.value;
                          updateField(["area", "places"], newPlaces);
                        }}
                        className="h-9 px-2 w-28 rounded border border-input bg-card text-foreground text-sm"
                        placeholder="e.g. on foot"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: GUEST REVIEWS */}
          {activeTab === "guests" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-2xl font-[340]">Section 04: Guest Reviews</h2>
                  <p className="text-sm text-muted-foreground">Manage ratings and infinite marquee quotes</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newItems = [
                      {
                        author: "New Guest",
                        from: "London",
                        when: "October 2026",
                        nights: 5,
                        quote: "A peaceful sanctuary above the sea.",
                      },
                      ...config.guests.items,
                    ];
                    updateField(["guests", "items"], newItems);
                  }}
                  className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-medium shadow-sm hover:opacity-95"
                >
                  + Add Review
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                    Rating Score
                  </label>
                  <input
                    type="text"
                    value={config.guests.rating}
                    onChange={(e) => updateField(["guests", "rating"], e.target.value)}
                    className="w-full h-10 px-3 rounded border border-input bg-background text-foreground text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                    Review Count Label
                  </label>
                  <input
                    type="text"
                    value={config.guests.count}
                    onChange={(e) => updateField(["guests", "count"], e.target.value)}
                    className="w-full h-10 px-3 rounded border border-input bg-background text-foreground text-sm"
                  />
                </div>
              </div>

              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
                {config.guests.items.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-border bg-background space-y-3">
                    <div className="flex items-center justify-between border-b border-border/60 pb-2">
                      <span className="font-semibold text-foreground text-sm">
                        {item.author} ({item.from})
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const newItems = config.guests.items.filter((_, i) => i !== idx);
                          updateField(["guests", "items"], newItems);
                        }}
                        className="text-red-500 hover:text-red-700 text-xs"
                      >
                        ✕ Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={item.author}
                        onChange={(e) => {
                          const newItems = [...config.guests.items];
                          newItems[idx].author = e.target.value;
                          updateField(["guests", "items"], newItems);
                        }}
                        className="h-9 px-2 rounded border border-input bg-card text-foreground text-xs"
                        placeholder="Author"
                      />
                      <input
                        type="text"
                        value={item.from}
                        onChange={(e) => {
                          const newItems = [...config.guests.items];
                          newItems[idx].from = e.target.value;
                          updateField(["guests", "items"], newItems);
                        }}
                        className="h-9 px-2 rounded border border-input bg-card text-foreground text-xs"
                        placeholder="City"
                      />
                      <input
                        type="number"
                        value={item.nights}
                        onChange={(e) => {
                          const newItems = [...config.guests.items];
                          newItems[idx].nights = Number(e.target.value);
                          updateField(["guests", "items"], newItems);
                        }}
                        className="h-9 px-2 rounded border border-input bg-card text-foreground text-xs"
                        placeholder="Nights"
                      />
                    </div>

                    <textarea
                      rows={2}
                      value={item.quote}
                      onChange={(e) => {
                        const newItems = [...config.guests.items];
                        newItems[idx].quote = e.target.value;
                        updateField(["guests", "items"], newItems);
                      }}
                      className="w-full p-2.5 rounded border border-input bg-card text-foreground text-sm resize-none"
                      placeholder="Quote"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: FAQ ACCORDION */}
          {activeTab === "faq" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-2xl font-[340]">Section 06: FAQ Accordion</h2>
                  <p className="text-sm text-muted-foreground">Manage frequently asked questions & answers</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newFaq = [
                      ...config.faq.items,
                      { q: "New Question?", a: "Answer text goes here." },
                    ];
                    updateField(["faq", "items"], newFaq);
                  }}
                  className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-medium shadow-sm hover:opacity-95"
                >
                  + Add Question
                </button>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                  FAQ Section Heading
                </label>
                <input
                  type="text"
                  value={config.faq.heading}
                  onChange={(e) => updateField(["faq", "heading"], e.target.value)}
                  className="w-full h-10 px-3 rounded border border-input bg-background text-foreground text-sm"
                />
              </div>

              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
                {config.faq.items.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-border bg-background space-y-3">
                    <div className="flex items-center justify-between border-b border-border/60 pb-2">
                      <span className="text-xs uppercase tracking-wider text-primary font-semibold">
                        Question #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const newFaq = config.faq.items.filter((_, i) => i !== idx);
                          updateField(["faq", "items"], newFaq);
                        }}
                        className="text-red-500 hover:text-red-700 text-xs"
                      >
                        ✕ Delete
                      </button>
                    </div>

                    <input
                      type="text"
                      value={item.q}
                      onChange={(e) => {
                        const newFaq = [...config.faq.items];
                        newFaq[idx].q = e.target.value;
                        updateField(["faq", "items"], newFaq);
                      }}
                      className="w-full h-10 px-3 rounded border border-input bg-card text-foreground text-sm font-medium"
                      placeholder="Question"
                    />

                    <textarea
                      rows={2}
                      value={item.a}
                      onChange={(e) => {
                        const newFaq = [...config.faq.items];
                        newFaq[idx].a = e.target.value;
                        updateField(["faq", "items"], newFaq);
                      }}
                      className="w-full p-2.5 rounded border border-input bg-card text-foreground text-sm resize-none"
                      placeholder="Answer"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sticky Save Changes Action Bar */}
          <div className="pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {saveSuccess && (
                <span className="text-xs font-semibold text-green-600 bg-green-500/10 px-3 py-1.5 rounded-lg border border-green-500/20">
                  ✓ All modifications successfully saved and live on site!
                </span>
              )}
              {saveError && (
                <span className="text-xs font-semibold text-red-600 bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20">
                  {saveError}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="h-12 px-8 rounded-full bg-primary text-primary-foreground font-medium text-sm transition-transform active:scale-[0.98] hover:opacity-95 shadow-lg flex items-center gap-2"
            >
              {isSaving ? "Publishing Updates..." : "Save Changes"}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
