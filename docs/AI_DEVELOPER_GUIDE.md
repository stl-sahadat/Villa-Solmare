# AI Developer Guide - Villa Solmare

## 1. Principal Stakeholder Profile

* Full Name: Md Sahadat Hossain
* Required Form of Address: Sahadat vai or Sir
* Primary Language: Bengali (Bangla)
* Secondary Technical Language: English
* Architectural Philosophy: 21st.dev Design Engineering standard. Clean, modular, type-safe full-stack software development with ultra-realistic visual aesthetics, cinematic motion, and strict performance constraints.

---

## 2. Immutable Constitutional Rules

1. Respectful Communication:
   Always address the stakeholder as "Sahadat vai" or "Sir". Never use generic or informal titles.
   When Sahadat vai communicates in Bengali, always respond fluently in Bengali.

2. Zero-Emoji Documentation Standard:
   All technical documentation files under `docs/` and root documentation must adhere to the strict zero-emoji corporate engineering standard.

3. Complete Type Safety:
   TypeScript `strict` mode is mandatory. Never use `any` types. All domain models, parameters, state updates, and API responses must have strict interfaces defined in `src/types/`.

4. Design & Performance Benchmarks:
   60 to 120 FPS render targets. Multi-pass strided canvas scrubbing (`8 -> 4 -> 2 -> 1`), LERP inertia smoothing, and non-blocking asynchronous asset loading.

5. Single-Page and Multi-Page Coexistence:
   The application simultaneously supports the cinematic continuous scroll experience (`/`) and dedicated individual routes (`/the-house`, `/inside`, `/amenities`, `/guests`, `/stay`, `/faq`).

---

## 3. Repository Architecture Map

```
src/
|-- app/
|   |-- [section]/           Dynamic section scroller route handler (Next.js 15 async params)
|   |-- admin/               Interactive administrative management suite (/admin)
|   |-- amenities/           Dedicated Amenities and Area surroundings page
|   |-- api/
|   |   |-- admin/auth/      Session token authentication handler (Next.js 15 async cookies)
|   |   |-- admin/config/    Runtime JSON configuration read/write handler
|   |   |-- booking/         Dynamic booking reservation validator & quotation engine
|   |   `-- config/          Public read-only configuration provider
|   |-- faq/                 Dedicated Frequently Asked Questions page
|   |-- globals.css          Tailwind core, design tokens, --ease-door, cubic-bezier physics
|   |-- guests/              Dedicated Guest reviews & verified testimonials page
|   |-- inside/              Dedicated Virtual walkthrough interior page
|   |-- layout.tsx           Next.js 15 Root Layout, metadata, viewport, JSON-LD Schema.org
|   |-- page.tsx             Main cinematic single-page scroll orchestrator
|   |-- privacy/             Dedicated consumer privacy and data governance notice
|   |-- stay/                Dedicated reservation and booking engine page
|   `-- the-house/           Dedicated architectural heritage showcase page
|-- components/
|   |-- Arrival.tsx          64-frame interactive canvas arrival sequence
|   |-- Book.tsx             Dynamic BDT rate calculator and booking form card
|   |-- Details.tsx          Amenities Bento grid and distance progress bars
|   |-- Faq.tsx              Zero-jank accessible accordion with morphing crosshairs
|   |-- Footer.tsx           Watermark reveal, contact coordinates, copyright
|   |-- Guests.tsx           Twin-lane infinite marquee guest review stream
|   |-- Header.tsx           Adaptive glass header with tone sensing & mobile floating bar
|   |-- House.tsx            Architectural narrative and specification counters
|   |-- Walk.tsx             192-frame virtual room walkthrough with dialog gallery
|   `-- ui/                  Primitives (CanvasPlayer, Counter, Slate, Reveal, Roll, Icons)
|-- config/
|   `-- solmare.config.ts    Strongly typed architectural domain schema (implements VillaConfig)
|-- data/
|   `-- site-config.json     Live persistent runtime configuration file
|-- lib/
|   `-- utils.ts             Class merge utility and BDT currency formatter
`-- types/                   Domain definitions (villa, booking, admin, navigation)
```

---

## 4. High-Frequency Workflows

### 4.1 Modifying Site Content or Pricing
1. Modify `src/data/site-config.json` directly or use the `/admin` interface.
2. `src/config/solmare.config.ts` dynamically ingests and types `site-config.json`.
3. Changes immediately reflect across Server Components and Client Components upon compilation.

### 4.2 Building and Validating
Always verify strict TypeScript compilation before building:
```bash
npx tsc --noEmit
npm run build
```

### 4.3 Launching the Production Daemon
```bash
npm run start -- -p 3000
```
