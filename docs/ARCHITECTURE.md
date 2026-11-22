# System Architecture - Villa Solmare

## 1. System Overview

Villa Solmare is an ultra-luxury architectural web sanctuary designed following the 21st.dev Design Engineering standard. It combines high-performance WebGL / HTML5 Canvas rendering pipelines with Next.js 15 (App Router), React 19, TypeScript 5, and Tailwind CSS.

---

## 2. High-Level Subsystem Diagram

```
+-----------------------------------------------------------------------------------+
|                                  Client Layer                                     |
|                                                                                   |
|  +--------------------+  +--------------------+  +-----------------------------+  |
|  | Multi-Pass Scrubber|  | Virtual Walkthrough|  | Dynamic BDT Booking Engine  |  |
|  | (64 AVIF Frames)   |  | (192 AVIF Frames)  |  | (Calculations, Quoting)     |  |
|  +--------------------+  +--------------------+  +-----------------------------+  |
|           |                        |                           |                  |
|           v                        v                           v                  |
|  +-----------------------------------------------------------------------------+  |
|  |                 Tone-Adaptive Frosted Travertine Glass Header               |  |
|  +-----------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|                           Next.js 15 (App Router) Subsystem                       |
|                                                                                   |
|  +------------------------+  +------------------------+  +---------------------+  |
|  | Single-Page Orchestrator| | Dedicated Static Pages |  | Admin Suite         |  |
|  | (/)                    |  | (/the-house, /stay,etc)|  | (/admin)            |  |
|  +------------------------+  +------------------------+  +---------------------+  |
|                                        |                                          |
|                                        v                                          |
|  +-----------------------------------------------------------------------------+  |
|  |                           Edge & Node Route Handlers                        |  |
|  |   /api/booking   |   /api/config   |   /api/admin/auth   |   /api/admin/config  |  |
|  +-----------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|                               Persistence Layer                                   |
|                                                                                   |
|   src/data/site-config.json <=========> src/config/solmare.config.ts (Typed Schema)|
+-----------------------------------------------------------------------------------+
```

---

## 3. Rendering Pipeline Mechanics

### 3.1 Multi-Pass Strided Canvas Scrubber (`CanvasSequence.tsx`)
The scrubber loads 64 sequence frames through a non-blocking 4-pass strided algorithm:
* Pass 1: Stride 8 (Frames 1, 9, 17, 25, 33, 41, 49, 57, 64) - Rapid preliminary interactive surface in under 200ms.
* Pass 2: Stride 4 (Frames 5, 13, 21, 29, 37, 45, 53, 61) - Mid-density interpolation.
* Pass 3: Stride 2 (Even frames) - High-density motion clarity.
* Pass 4: Stride 1 (Full sequence completion) - True 60 FPS pixel fidelity.

If the user scrubs before the full sequence is downloaded, the renderer falls back to the nearest loaded neighbor using binary search, completely preventing blank frames or render stalling.

### 3.2 LERP Inertia Smoothing
User scroll input is decoupled from canvas redraws via a 0.18 Linear Interpolation (LERP) easing function:
```typescript
currentProgress = lerp(currentProgress, targetProgress, 0.18);
```
This produces cinematic optical resistance identical to luxury camera dolly tracks.

### 3.3 Tone-Adaptive Glass Header
Header transparency and background color dynamically calculate their appearance through an IntersectionObserver watching `data-tone` attributes on sections:
* `data-tone="dark"` or `"footage"`: Header transitions to a high-contrast dark frosted slate (`bg-background/25` with `backdrop-blur-xl`).
* `data-tone="light"`: Header transitions to an ivory roman travertine glass (`bg-background/80` with `border-border/70`).

---

## 4. Multi-Page and Single-Page Hybrid Model

The application resolves routes using two complementary patterns:
1. Root Route (`/`): Delivers the continuous, cinematic scroll story with all 6 architectural chapters assembled into an unbroken timeline.
2. Dedicated Routes (`/the-house`, `/inside`, `/amenities`, `/guests`, `/stay`, `/faq`): Deliver focused, isolated architectural views with dedicated metadata, canonical tags, and OpenGraph headers.

---

## 5. Technology Stack Specification Matrix

| Layer | Technology | Specification / Version |
| :--- | :--- | :--- |
| Framework | Next.js (App Router) | 15.5.x |
| Core Library | React | 19.3.x |
| Language | TypeScript | 5.6.x (Strict Mode) |
| Styling Engine | Tailwind CSS | 3.4.x |
| Motion Engine | Framer Motion & CSS Variables | 11.11.x |
| Typography | Fraunces Display & Geist Sans | Self-hosted WOFF2 |
| Image Optimization | AVIF & WebP multi-tier | Fallback architecture |
