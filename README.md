# Villa Solmare — Ultra-Luxury Coastal Architectural Sanctuary

[![Live Production](https://img.shields.io/badge/Live_Site-villa--solmare--deu.pages.dev-2ea44f?style=for-the-badge&logo=cloudflare)](https://villa-solmare-deu.pages.dev)
[![GitHub](https://img.shields.io/badge/GitHub-stl--sahadat%2FVilla--Solmare-181717?style=for-the-badge&logo=github)](https://github.com/stl-sahadat/Villa-Solmare)
[![Next.js 15](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![React 19](https://img.shields.io/badge/React-19.3-blue?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)

> 🌐 **Live Cloudflare Pages Production:** [https://villa-solmare-deu.pages.dev](https://villa-solmare-deu.pages.dev) (Primary) / [https://villa-solmare.pages.dev](https://villa-solmare.pages.dev)  
> 🔒 **Admin Management Suite:** [https://villa-solmare-deu.pages.dev/admin](https://villa-solmare-deu.pages.dev/admin)

---

## 1. Executive Summary

Villa Solmare is an ultra-luxury coastal stone sanctuary situated on the clifftops overlooking the Bay of Bengal near Inani Beach, Marine Drive, Cox's Bazar, Bangladesh.

Engineered under the direct leadership of **Md Sahadat Hossain (Sahadat vai)** adhering strictly to the **21st.dev Design Engineering standard**, this application delivers an authentic 1:1 architectural template clone of Villa Aurelia. The system integrates Next.js 15, React 19, strict TypeScript, Tailwind CSS, Fraunces serif typography, a 64-frame multi-pass strided canvas arrival sequence, a 192-frame virtual room walkthrough, an ambient sunset loop, a dynamic bilingual localization engine (English & authentic literary Bengali), and an interactive administrative management suite with Cloudflare Edge runtime capabilities.

---

## 2. Live Page Routes & Endpoints

| Section / Feature | Route Path | Live URL |
| :--- | :--- | :--- |
| **Home (Cinematic Narrative)** | `/` | [https://villa-solmare-deu.pages.dev/](https://villa-solmare-deu.pages.dev/) |
| **The House & Architecture** | `/the-house` | [https://villa-solmare-deu.pages.dev/the-house](https://villa-solmare-deu.pages.dev/the-house) |
| **Inside & Virtual Walkthrough** | `/inside` | [https://villa-solmare-deu.pages.dev/inside](https://villa-solmare-deu.pages.dev/inside) |
| **Amenities & Surrounding Area** | `/amenities` | [https://villa-solmare-deu.pages.dev/amenities](https://villa-solmare-deu.pages.dev/amenities) |
| **Guest Reviews & Testimonials** | `/guests` | [https://villa-solmare-deu.pages.dev/guests](https://villa-solmare-deu.pages.dev/guests) |
| **Plan Your Stay (Booking Engine)** | `/stay` | [https://villa-solmare-deu.pages.dev/stay](https://villa-solmare-deu.pages.dev/stay) |
| **Frequently Asked Questions** | `/faq` | [https://villa-solmare-deu.pages.dev/faq](https://villa-solmare-deu.pages.dev/faq) |
| **Administrative Dashboard** | `/admin` | [https://villa-solmare-deu.pages.dev/admin](https://villa-solmare-deu.pages.dev/admin) |
| **Privacy Notice** | `/privacy` | [https://villa-solmare-deu.pages.dev/privacy](https://villa-solmare-deu.pages.dev/privacy) |

---

## 3. Key Architectural Highlights

* **Multi-Pass Strided Canvas Scrubber:** 64-frame arrival sequence loaded asynchronously via non-blocking strides ($8 \to 4 \to 2 \to 1$) with nearest-neighbor interpolation.
* **192-Frame Virtual Room Walkthrough:** Stepped HUD tracking Living Room, Kitchen, and Master Bedroom suite with a native dialog Bento gallery.
* **Bilingual Translation Engine (EN / বাংলা):** Seamless language switcher (`EN` / `বাংলা`) in the header and menu. Pure international luxury English by default; switches to natural, authentic, literary Bengali without robotic word-by-word artifacts.
* **Real-Time BDT Currency Engine:** Nightly rate set at ৳85,000 BDT (Bangladeshi Taka) with live calendar calculation and zero hidden charges.
* **Tone-Adaptive Frosted Glass Header:** Automatically alternates between high-contrast dark glass over drone footage and ivory travertine over daytime sections.
* **Comprehensive Administrative Suite (`/admin`):** Real-time content and pricing updates with password protection (`440055`) and session cookie validation.
* **Cloudflare Pages Global Edge Distribution:** Deployed directly to Cloudflare Pages edge network with serverless edge worker (`_worker.js`) executing API requests with sub-millisecond latency.

---

## 4. Technical Documentation Index

Detailed architectural and operational specifications are maintained across dedicated documentation files:

* [AI Developer Guide](docs/AI_DEVELOPER_GUIDE.md): Principal stakeholder profile, communication boundaries, operational workflows, and repository mapping.
* [System Architecture](docs/ARCHITECTURE.md): Subsystems, canvas rendering mechanics, LERP inertia easing, tone-sensing header, and tech matrix.
* [Database & Schemas](docs/DATABASE_SCHEMA.md): JSON persistence layer, domain schemas, booking validation structures, and mutation lifecycles.
* [Deployment Guide](docs/DEPLOYMENT_GUIDE.md): Production builds, Cloudflare Pages edge distribution, and caching rules.
* [Security Specifications](docs/SECURITY_SPECS.md): Authentication models, HttpOnly cookie lifecycle, input boundary validation, and privacy governance.

---

## 5. Repository Directory Tree

```
Villa Solmare/
|-- README.md
|-- docs/
|   |-- AI_DEVELOPER_GUIDE.md
|   |-- ARCHITECTURE.md
|   |-- DATABASE_SCHEMA.md
|   |-- DEPLOYMENT_GUIDE.md
|   `-- SECURITY_SPECS.md
|-- public/
|   |-- favicon.ico
|   |-- fonts/
|   |   |-- fraunces.woff2
|   |   |-- fraunces-italic.woff2
|   |   `-- geist.woff2
|   |-- media/
|   |   |-- arrival/            # 64 frames (d1920 & mobile)
|   |   |-- walk/               # 192 walkthrough frames (d1920 & mobile)
|   |   |-- sunset/             # desktop.mp4 & mobile.mp4
|   |   `-- photos/             # Architectural stills
|   `-- og.jpg
|-- scripts/
|   `-- build_cloudflare.js     # Cloudflare Pages edge distributor & packager
|-- src/
|   |-- app/
|   |   |-- [section]/          # Next.js 15 dynamic scroller (async params)
|   |   |-- admin/              # Management suite (/admin)
|   |   |-- amenities/          # Dedicated Amenities page (/amenities)
|   |   |-- api/
|   |   |   |-- admin/auth/     # Session authentication handler
|   |   |   |-- admin/config/   # Administrative JSON config updater
|   |   |   |-- booking/        # Live reservation and quote handler
|   |   |   `-- config/         # Public configuration endpoint
|   |   |-- faq/                # Dedicated FAQ page (/faq)
|   |   |-- globals.css         # Design tokens and custom easing curves
|   |   |-- guests/             # Dedicated Guest Reviews page (/guests)
|   |   |-- inside/             # Dedicated Virtual Walkthrough page (/inside)
|   |   |-- layout.tsx          # Root layout, language provider & Schema.org metadata
|   |   |-- page.tsx            # Cinematic single-page orchestrator
|   |   |-- privacy/            # Privacy notice (/privacy)
|   |   |-- stay/               # Dedicated Booking Engine page (/stay)
|   |   `-- the-house/          # Dedicated Architectural House page (/the-house)
|   |-- components/             # Modular architectural components
|   |-- config/                 # solmare.config.ts (Strict domain schema)
|   |-- context/                # LanguageContext.tsx (Bilingual EN/BN reactive state)
|   |-- data/                   # site-config.json & translations.ts
|   |-- lib/                    # Class merge & BDT currency utilities
|   `-- types/                  # Strict TypeScript domain interfaces
|-- next.config.mjs
|-- package.json
|-- postcss.config.js
|-- tailwind.config.ts
`-- tsconfig.json
```

---

## 6. Quick Start & Deployment

### 6.1 Prerequisites
* Node.js: Version 20.x or 24.x LTS
* Package Manager: npm 10.x or higher

### 6.2 Installation
```bash
npm install
```

### 6.3 Local Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6.4 Cloudflare Pages Deployment
To build and deploy directly to the live Cloudflare Pages production environment:
```bash
npm run deploy:cf
```
This script executes:
1. `next build` static export generation
2. Packaging of clean HTML routing and asset hashes
3. Edge Worker bundle assembly (`pages-dist/_worker.js`)
4. Direct atomic deployment to Cloudflare Pages (`villa-solmare.pages.dev`)

---

## 7. Administrative Credentials

The administrative dashboard is available at `/admin`:
* **Live URL:** [https://villa-solmare.pages.dev/admin](https://villa-solmare.pages.dev/admin)
* **Local URL:** [http://localhost:3000/admin](http://localhost:3000/admin)
* **Username:** `admin`
* **Password:** `440055`

---

## 8. Ownership & Credits

* **Architectural Conception & Ownership:** Md Sahadat Hossain (Sahadat vai)
* **Live Production:** [https://villa-solmare.pages.dev](https://villa-solmare.pages.dev)
* **GitHub Repository:** [https://github.com/stl-sahadat/Villa-Solmare](https://github.com/stl-sahadat/Villa-Solmare)
* **Location:** Barura, Comilla / Inani Beach, Cox's Bazar, Bangladesh
* **Instagram:** [@stlsahadat](https://www.instagram.com/stlsahadat/)
* **Engineering Standard:** 21st.dev Design Engineer
