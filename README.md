# Villa Solmare - Ultra-Luxury Coastal Architectural Sanctuary

## 1. Executive Summary

Villa Solmare is a luxury coastal architectural sanctuary situated on the cliffs overlooking the Bay of Bengal near Inani Beach, Marine Drive, Cox's Bazar, Bangladesh.

Engineered under the direct leadership of Md Sahadat Hossain (Sahadat vai) following the 21st.dev Design Engineering standard, this web application delivers an authentic 1:1 architectural template clone of Villa Aurelia. The system integrates Next.js 15, React 19, strict TypeScript, Tailwind CSS, Fraunces serif typography, a 64-frame multi-pass strided canvas arrival sequence, a 192-frame virtual room walkthrough, an ambient sunset loop, and an interactive administrative management suite.

---

## 2. Technical Documentation Index

Detailed architectural and operational specifications are maintained across dedicated documentation files:

* [AI Developer Guide](docs/AI_DEVELOPER_GUIDE.md): Principal stakeholder profile, communication boundaries, operational workflows, and repository mapping.
* [System Architecture](docs/ARCHITECTURE.md): Subsystems, canvas rendering mechanics, LERP inertia easing, tone-sensing header, and tech matrix.
* [Database & Schemas](docs/DATABASE_SCHEMA.md): JSON persistence layer, domain schemas, booking validation structures, and mutation lifecycles.
* [Deployment Guide](docs/DEPLOYMENT_GUIDE.md): Production builds, PM2 process management, Nginx reverse proxy configuration, and caching rules.
* [Security Specifications](docs/SECURITY_SPECS.md): Authentication models, HttpOnly cookie lifecycle, input boundary validation, and privacy governance.

---

## 3. Key Architectural Highlights

* Multi-Pass Strided Canvas Scrubber: 64-frame arrival sequence loaded asynchronously via non-blocking strides (8 -> 4 -> 2 -> 1) with nearest-neighbor interpolation.
* 192-Frame Virtual Room Walkthrough: Stepped HUD tracking Living Room, Kitchen, and Master Bedroom suite with a native dialog Bento gallery.
* Real-Time BDT Currency Engine: Nightly rate set at 85,000 BDT (Bangladeshi Taka) with live calendar calculation and zero hidden charges.
* Tone-Adaptive Frosted Glass Header: Automatically alternates between high-contrast dark glass over drone footage and ivory travertine over daytime sections.
* Comprehensive Administrative Suite (/admin): Real-time content and pricing updates with password protection (440055) and session cookie validation.
* Hybrid Route Architecture: Unbroken cinematic narrative on root (/) alongside dedicated static pages (/the-house, /inside, /amenities, /guests, /stay, /faq).

---

## 4. Complete Repository Directory Tree

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
|   |   |-- layout.tsx          # Root layout and Schema.org metadata
|   |   |-- page.tsx            # Cinematic single-page orchestrator
|   |   |-- privacy/            # Privacy notice (/privacy)
|   |   |-- stay/               # Dedicated Booking Engine page (/stay)
|   |   `-- the-house/          # Dedicated Architectural House page (/the-house)
|   |-- components/             # Modular architectural components
|   |-- config/                 # solmare.config.ts (Strict domain schema)
|   |-- data/                   # site-config.json (Live persistent data)
|   |-- lib/                    # Class merge & BDT currency utilities
|   `-- types/                  # Strict TypeScript domain interfaces
|-- next.config.mjs
|-- package.json
|-- postcss.config.js
|-- tailwind.config.ts
`-- tsconfig.json
```

---

## 5. Quick Start

### 5.1 Prerequisites
* Node.js: Version 20.x or 24.x LTS
* Package Manager: npm 10.x or higher

### 5.2 Installation
```bash
npm install
```

### 5.3 Local Development
```bash
npm run dev
```
Open http://localhost:3000 in your browser.

### 5.4 Production Build
```bash
npm run build
npm run start -- -p 3000
```

---

## 6. Administrative Credentials

The administrative dashboard is available at `/admin`:
* Path: http://localhost:3000/admin
* Username: `admin`
* Password: `440055`

---

## 7. Ownership & Credits

* Architectural Conception & Ownership: Md Sahadat Hossain (Sahadat vai)
* Location: Barura, Comilla / Inani Beach, Cox's Bazar, Bangladesh
* Instagram: https://www.instagram.com/stlsahadat/
* Engineering Standard: 21st.dev Design Engineer
