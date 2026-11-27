# Villa Solmare

[![Live Production](https://img.shields.io/badge/Production-villa--solmare.pages.dev-2ea44f?style=for-the-badge&logo=cloudflare)](https://villa-solmare.pages.dev)
[![GitHub Repository](https://img.shields.io/badge/GitHub-stl--sahadat%2FVilla--Solmare-181717?style=for-the-badge&logo=github)](https://github.com/stl-sahadat/Villa-Solmare)
[![Framework](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Runtime](https://img.shields.io/badge/React-19.3-blue?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)

> Production URL: [https://villa-solmare.pages.dev](https://villa-solmare.pages.dev)  
> Repository: [https://github.com/stl-sahadat/Villa-Solmare](https://github.com/stl-sahadat/Villa-Solmare)  
> Administration Portal: [https://villa-solmare.pages.dev/admin](https://villa-solmare.pages.dev/admin)

---

## 1. Overview

Villa Solmare is an architectural sanctuary web application inspired by coastal clifftop aesthetics above the Bay of Bengal, near Inani Beach, Cox's Bazar, Bangladesh.

Engineered under the leadership of Md Sahadat Hossain following high-performance design engineering standards, the project features a responsive modern stack with Next.js 15, React 19, strict TypeScript, Tailwind CSS, Fraunces serif typography, and custom Charukola artistic Bengali typography. The platform incorporates multi-pass progressive canvas scrubbers, stepped virtual walkthroughs, bilingual translation mechanics, dynamic reservation fee calculation in Bangladeshi Taka (BDT), and a serverless administrative management suite deployed to Cloudflare Pages edge infrastructure.

---

## 2. Key Capabilities

### 2.1 Multi-Pass Canvas Arrival Scrubber
* 64-frame sequence loaded asynchronously using non-blocking strided passes (8 -> 4 -> 2 -> 1).
* Smooth wheel and touch scrub velocity with linear interpolation (LERP) easing.
* Automatic fallback handling for constrained network environments.

### 2.2 Virtual Room Walkthrough
* 192-frame interactive walkthrough spanning Living Room, Kitchen, and Master Bedroom suites.
* Stepped head-up display (HUD) tracking room metrics, amenities, and spatial dimensions.
* Fullscreen bento photo gallery modal with backdrop filters and keyboard navigation.

### 2.3 Bilingual Localization Engine
* Clean header language toggle featuring an Earth vector icon.
* Immediate switching between English and authentic literary Bengali without page reloads.
* Specialized Charukola Round and Charukola Unicode typography rendered dynamically when Bengali is active.

### 2.4 Real-Time Reservation Engine
* Dynamic calendar calculation with check-in, checkout, and night counting.
* Nightly rates defined in Bangladeshi Taka (BDT) with upfront transparent pricing.
* Client-side and edge-level input validation preventing invalid date ordering or excessive guest counts.

### 2.5 Administrative Management Suite
* Dedicated administrative portal accessible via `/admin`.
* Secure cookie-based authentication with cryptographic session cookies.
* Live customization of property rates, guest limits, seasonal pricing, and contact records.

---

## 3. Technology Stack

| Layer | Technologies |
| :--- | :--- |
| Framework | Next.js 15 (App Router, Server Components, API Handlers) |
| Core Library | React 19 |
| Language | TypeScript 5.6 (Strict Type Checking) |
| Styling | Tailwind CSS 3.4, PostCSS, Custom CSS Variables |
| Animation & Interaction | Framer Motion, Canvas 2D API, Custom Easing Physics |
| Typography | Fraunces Serif, Geist Sans, Charukola Round, Charukola Unicode |
| Edge Infrastructure | Cloudflare Pages, Cloudflare Edge Workers (`_worker.js`) |
| Version Control | Git, GitHub |

---

## 4. Repository Structure

```
Villa Solmare/
|-- .env.example              # Template for environment variables
|-- .gitignore                # Git ignore configuration
|-- README.md                 # Primary documentation
|-- docs/                     # Technical architecture specifications
|   |-- AI_DEVELOPER_GUIDE.md # Workflow and developer instructions
|   |-- ARCHITECTURE.md       # Deep architectural breakdown
|   |-- DATABASE_SCHEMA.md    # Configuration data structures
|   |-- DEPLOYMENT_GUIDE.md   # Deployment pipeline procedures
|   `-- SECURITY_SPECS.md     # Security and governance rules
|-- public/                   # Static production assets
|   |-- favicon.ico           # Application favicon
|   |-- fonts/                # Self-hosted web fonts
|   |-- media/                # Arrival frames, walkthrough frames, video loops
|   `-- og.jpg                # OpenGraph preview asset
|-- scripts/
|   `-- build_cloudflare.js   # Cloudflare Pages build and packaging pipeline
|-- src/
|   |-- app/
|   |   |-- [section]/        # Dynamic route scroller
|   |   |-- admin/            # Administrative management dashboard
|   |   |-- amenities/        # Amenities page
|   |   |-- api/              # Serverless API routes (auth, booking, config)
|   |   |-- faq/              # Frequently asked questions page
|   |   |-- globals.css       # Design tokens, keyframes, and font imports
|   |   |-- guests/           # Reviews and testimonials page
|   |   |-- inside/           # Walkthrough page
|   |   |-- layout.tsx        # Root HTML layout and metadata
|   |   |-- page.tsx          # Main interactive landing page
|   |   |-- privacy/          # Privacy policy page
|   |   |-- stay/             # Booking and reservation page
|   |   `-- the-house/        # Architecture overview page
|   |-- components/           # Reusable UI components
|   |-- config/               # Application configuration and initial state
|   |-- context/              # LanguageContext for stateful localization
|   |-- data/                 # Translations and static fallback datasets
|   |-- lib/                  # Utility functions and class mergers
|   `-- types/                # TypeScript interface declarations
|-- next.config.mjs           # Next.js runtime configuration
|-- package.json              # Project dependencies and script commands
|-- tailwind.config.ts        # Tailwind theme and font definitions
`-- tsconfig.json             # TypeScript configuration
```

---

## 5. Getting Started

### 5.1 System Prerequisites
* Node.js: Version 20.x or 24.x LTS
* Package Manager: npm 10.x or higher

### 5.2 Local Setup
1. Clone the repository:
```bash
git clone https://github.com/stl-sahadat/Villa-Solmare.git
cd Villa-Solmare
```

2. Install dependencies:
```bash
npm install
```

3. Setup environment variables:
```bash
cp .env.example .env.local
```
Update `.env.local` with your designated local configuration parameters.

4. Start development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 6. Build and Deployment

### 6.1 Production Build
Generate an optimized production build locally:
```bash
npm run build
```

### 6.2 Cloudflare Pages Edge Deployment
Package and deploy the production bundle directly to Cloudflare Pages:
```bash
npm run deploy:cf
```
The packaging script executes:
1. Compilation of static routes and assets.
2. Generation of cache headers (`_headers`) and API routing rules (`_routes.json`).
3. Assembly of the edge handler (`pages-dist/_worker.js`).
4. Direct publication to Cloudflare Pages.

---

## 7. Security and Governance

* **Zero Credentials in Version Control:** Passwords, API tokens, and secret identifiers must never be committed to repository history.
* **Environment Variable Governance:** Administrative credentials and deployment parameters are managed exclusively through environment variables and Cloudflare dashboard secrets.
* **HTTP-Only Session Management:** Authentication cookies are marked with `HttpOnly`, `SameSite=Lax`, and `Secure` attributes to mitigate cross-site scripting risks.
* **Input Boundary Sanitization:** Serverless endpoints validate email formats, date sequences, and numerical guest boundaries.

For comprehensive security specifications, consult [docs/SECURITY_SPECS.md](docs/SECURITY_SPECS.md).

---

## 8. Dedicated Documentation Index

Detailed architectural and procedural documents are maintained in the `docs` directory:
* [Architecture Blueprint](docs/ARCHITECTURE.md) - Subsystems, rendering mechanics, and component hierarchy.
* [Developer Guide](docs/AI_DEVELOPER_GUIDE.md) - Workflows, coding conventions, and developer guidelines.
* [Database & Schemas](docs/DATABASE_SCHEMA.md) - Schema structures, models, and data flow.
* [Deployment Guide](docs/DEPLOYMENT_GUIDE.md) - Production environment configurations and edge caching.
* [Security Specifications](docs/SECURITY_SPECS.md) - Authentication, cookie rules, and data governance.

---

## 9. Project Ownership & Credits

* **Conception and Architectural Direction:** Md Sahadat Hossain
* **Production Live URL:** [https://villa-solmare.pages.dev](https://villa-solmare.pages.dev)
* **GitHub Repository:** [https://github.com/stl-sahadat/Villa-Solmare](https://github.com/stl-sahadat/Villa-Solmare)
* **Property Setting:** Inani Beach, Cox's Bazar / Barura, Comilla, Bangladesh
* **Engineering Standards:** 21st.dev Design Engineering Standards
