# Villa Solmare — Ultra-Luxury Coastal Architectural Sanctuary

> **Owner & Lead Architect:** Md Sahadat Hossain (**Sahadat vai**)  
> **Location:** Inani Beach, Marine Drive, Cox's Bazar / Barura, Comilla, Bangladesh  
> **Nightly Rate:** ৳85,000 / night (Bangladeshi Taka — BDT)  
> **Engineering Standard:** `21st.dev` Design Engineering & Full-Stack Architecture  

---

## 🌟 Overview

**Villa Solmare** is a world-class architectural web masterpiece engineered with Next.js 14 (App Router), TypeScript, Tailwind CSS, Fraunces Display Serif typography, and high-performance WebGL / Canvas rendering.

The codebase features:
1. **Multi-Pass Strided Canvas Scrubber**: 64-frame arrival sequence loaded via non-blocking strided passes (`8 -> 4 -> 2 -> 1`) with parallel worker pipelines, 0.18 LERP inertia smoothing, and nearest-loaded neighbor fallback.
2. **IntersectionObserver Tone Adaptation**: Dynamic top header that switches between light frosted glass (over dark video/drone footage) and ivory travertine glass (over daylight sections).
3. **Day & Night Mediterranean/Coastal Mode**: Smooth HSL CSS variable transitions between Roman Travertine ivory and Starlit Midnight Coast palettes.
4. **Interactive Virtual Walkthrough**: 192-frame stepped HUD with live room specifications, photo transitions, and deep architectural details.
5. **Native `<dialog>` Bento Photo Gallery**: Ultra-high resolution architectural and interior photos with `--ease-door` slide-up physics.
6. **Square Root Distance Scaling**: Visual travel progress bars calibrated for local destinations (Inani Beach, Marine Drive, Himchari Eco Park, Cox's Bazar Airport).
7. **Twin-Lane Infinite Marquee**: Verified guest reviews flowing across two counter-directional lanes with user play/pause toggle.
8. **Cinematic Sunset Video & Dynamic Booking Engine**: Scroll-triggered playback unlock, live nights and price calculation in Bangladeshi Taka (`৳` BDT), and dual API / mailto handling.
9. **Zero-Jank CSS Grid Accordion**: Morphing crosshair icons and `inert` focus management for seamless FAQ accessibility.
10. **JSON-LD 3-Tier SEO Graph**: Full Schema.org metadata for `WebSite`, `VacationRental`, and `FAQPage`.
11. **Comprehensive Admin Dashboard (`/admin`)**: Real-time content and rate management with secure session authentication.
12. **Clean Slash Navigation**: Direct URL routing (`/the-house`, `/inside`, `/amenities`, `/guests`, `/stay`, `/faq`) without hash fragments.

---

## 🚀 Getting Started

### Development Server
```bash
npm run dev
# or
npx next dev -p 3000
```
Open [http://localhost:3000](http://localhost:3000) to view the sanctuary.

### Production Build & Serve
```bash
npm run build
npm run start
```

### Admin Panel
Navigate to [http://localhost:3000/admin](http://localhost:3000/admin)  
- **Username:** `admin`  
- **Password:** `440055`  

---

## 📁 Architecture & File Structure

```
Villa Solmare/
├── public/
│   ├── media/
│   │   ├── arrival/        # 64 canvas frames (d1920 & mobile)
│   │   ├── walk/           # 192 walkthrough frames (d1920 & mobile)
│   │   └── sunset/         # desktop.mp4 & mobile.mp4 ambient sunset loop
│   └── fonts/              # Fraunces & Geist WOFF2 fonts
├── src/
│   ├── app/
│   │   ├── [section]/      # Clean dynamic slash routes
│   │   ├── admin/          # Admin management dashboard
│   │   ├── api/            # Booking and config CRUD endpoints
│   │   ├── privacy/        # Privacy notice
│   │   ├── globals.css     # Design tokens, --ease-door, .roll, .fill-btn
│   │   ├── layout.tsx      # Fraunces + Geist fonts, JSON-LD Schema
│   │   └── page.tsx        # Single-page cinematic scroll orchestrator
│   ├── components/         # 1:1 Modular architectural components
│   ├── config/             # solmare.config.ts (Dynamic architectural schema)
│   ├── data/               # site-config.json (Live admin configurable state)
│   └── lib/                # Utility helpers, BDT currency formatter
```

---

## 👨‍💻 Author

Crafted with excellence by **Md Sahadat Hossain (Sahadat vai)**  
- Instagram: [@stlsahadat](https://www.instagram.com/stlsahadat/)  
- Address: Barura, Comilla, Bangladesh  
