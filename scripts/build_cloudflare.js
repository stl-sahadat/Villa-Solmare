import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.resolve(__dirname, '..');
const distDir = path.join(baseDir, 'pages-dist');

console.log('🚀 Preparing Cloudflare Pages production distribution for Villa Solmare...');

// 1. Clean and recreate distDir
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// 2. Copy public assets (media, fonts, og.jpg, favicon.ico)
const publicDir = path.join(baseDir, 'public');
if (fs.existsSync(publicDir)) {
  fs.cpSync(publicDir, distDir, { recursive: true });
  console.log('✓ Copied public assets (media, fonts, images)');
}

// 3. Copy .next/static to _next/static
const nextStatic = path.join(baseDir, '.next/static');
if (fs.existsSync(nextStatic)) {
  fs.mkdirSync(path.join(distDir, '_next'), { recursive: true });
  fs.cpSync(nextStatic, path.join(distDir, '_next/static'), { recursive: true });
  console.log('✓ Copied Next.js static chunks to _next/static');
}

// 4. Copy prerendered HTML pages
const appServerDir = path.join(baseDir, '.next/server/app');
const pages = [
  'index',
  'the-house',
  'inside',
  'amenities',
  'guests',
  'stay',
  'faq',
  'admin',
  'privacy',
  '_not-found'
];

for (const p of pages) {
  const htmlFile = `${p}.html`;
  const src = path.join(appServerDir, htmlFile);
  if (fs.existsSync(src)) {
    if (p === 'index') {
      fs.copyFileSync(src, path.join(distDir, 'index.html'));
    } else if (p === '_not-found') {
      fs.copyFileSync(src, path.join(distDir, '404.html'));
    } else {
      fs.copyFileSync(src, path.join(distDir, `${p}.html`));
    }
    console.log(`✓ Copied ${htmlFile}`);
  }
}

// 5. Embed site config
const siteConfigPath = path.join(baseDir, 'src/data/site-config.json');
let siteConfig = {};
if (fs.existsSync(siteConfigPath)) {
  siteConfig = JSON.parse(fs.readFileSync(siteConfigPath, 'utf-8'));
  fs.writeFileSync(path.join(distDir, 'site-config.json'), JSON.stringify(siteConfig, null, 2));
}

// 6. Write _headers for high-performance CDN caching
const headersContent = `/*
  Access-Control-Allow-Origin: *
/_next/static/*
  Cache-Control: public, max-age=31536000, immutable
/fonts/*
  Cache-Control: public, max-age=31536000, immutable
/media/*
  Cache-Control: public, max-age=2592000, immutable
`;
fs.writeFileSync(path.join(distDir, '_headers'), headersContent);
console.log('✓ Generated _headers (immutable CDN caching)');

// 7. Write _routes.json (Worker ONLY executes for /api/*)
const routesConfig = {
  version: 1,
  include: ['/api/*'],
  exclude: []
};
fs.writeFileSync(path.join(distDir, '_routes.json'), JSON.stringify(routesConfig, null, 2));
console.log('✓ Generated _routes.json (Worker strictly for /api/*)');

// 8. Generate _worker.js Edge handler for Cloudflare Pages (API handling only)
const workerCode = `// Cloudflare Pages Edge Worker for Villa Solmare API
const ADMIN_USER = typeof env !== "undefined" && env.ADMIN_USERNAME ? env.ADMIN_USERNAME : "admin";
const ADMIN_PASS = typeof env !== "undefined" && env.ADMIN_PASSWORD ? env.ADMIN_PASSWORD : "440055";
const SESSION_COOKIE_NAME = "solmare_admin_session";
const SESSION_TOKEN = "solmare_authenticated_session_token_xyz987";

let runtimeConfig = ${JSON.stringify(siteConfig, null, 2)};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // 1. API: /api/config
    if (path === "/api/config" && request.method === "GET") {
      return new Response(JSON.stringify(runtimeConfig), {
        headers: { "Content-Type": "application/json", "Cache-Control": "no-cache", "Access-Control-Allow-Origin": "*" }
      });
    }

    // 2. API: /api/booking (POST)
    if (path === "/api/booking" && request.method === "POST") {
      try {
        const body = await request.json();
        const { arrival, departure, guests, name, email, checkIn, checkOut } = body;
        const startDateStr = arrival || checkIn;
        const endDateStr = departure || checkOut;
        const guestInput = guests || 2;
        const guestName = name;
        const guestEmail = email;

        if (!startDateStr || !endDateStr || !guestName || !guestEmail) {
          return new Response(JSON.stringify({
            success: false,
            message: "Validation failed",
            error: "Please fill in all required fields (dates, name, and email)."
          }), { status: 400, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
        }

        const startDate = new Date(startDateStr);
        const endDate = new Date(endDateStr);
        const diffTime = endDate.getTime() - startDate.getTime();
        const nights = Math.round(diffTime / (1000 * 60 * 60 * 24));

        if (nights < 1) {
          return new Response(JSON.stringify({
            success: false,
            message: "Validation failed",
            error: "Checkout date must be after check-in date."
          }), { status: 400, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
        }

        const rate = runtimeConfig.booking?.priceFrom || 85000;
        const totalEstimate = nights * rate;
        const bookingReference = \`VS-\${Date.now().toString().slice(-6)}-\${Math.random().toString(36).substring(2, 5).toUpperCase()}\`;

        return new Response(JSON.stringify({
          success: true,
          bookingReference,
          message: runtimeConfig.book?.sent || "Request sent. We will reply within 24 hours.",
          details: {
            property: runtimeConfig.site?.name || "Villa Solmare",
            arrival: startDateStr,
            departure: endDateStr,
            nights,
            guests: Number(guestInput),
            guestName,
            guestEmail,
            ratePerNight: rate,
            estimatedTotal: totalEstimate
          }
        }), { status: 200, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
      } catch (err) {
        return new Response(JSON.stringify({ success: false, error: "Invalid booking payload" }), {
          status: 400,
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
        });
      }
    }

    // 3. API: /api/admin/auth
    if (path === "/api/admin/auth") {
      if (request.method === "POST") {
        try {
          const { username, password } = await request.json();
          if (username === ADMIN_USER && password === ADMIN_PASS) {
            return new Response(JSON.stringify({ success: true, message: "Authenticated successfully" }), {
              status: 200,
              headers: {
                "Content-Type": "application/json",
                "Set-Cookie": \`\${SESSION_COOKIE_NAME}=\${SESSION_TOKEN}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800\`
              }
            });
          }
          return new Response(JSON.stringify({ success: false, error: "Invalid username or password" }), {
            status: 401,
            headers: { "Content-Type": "application/json" }
          });
        } catch {
          return new Response(JSON.stringify({ success: false, error: "Auth failed" }), { status: 500 });
        }
      }

      if (request.method === "GET") {
        const cookie = request.headers.get("Cookie") || "";
        const isAuth = cookie.includes(\`\${SESSION_COOKIE_NAME}=\${SESSION_TOKEN}\`);
        return new Response(JSON.stringify({ authenticated: isAuth }), {
          status: isAuth ? 200 : 401,
          headers: { "Content-Type": "application/json" }
        });
      }

      if (request.method === "DELETE") {
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Set-Cookie": \`\${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; Max-Age=0\`
          }
        });
      }
    }

    // 4. API: /api/admin/config
    if (path === "/api/admin/config") {
      const cookie = request.headers.get("Cookie") || "";
      const isAuth = cookie.includes(\`\${SESSION_COOKIE_NAME}=\${SESSION_TOKEN}\`);

      if (!isAuth) {
        return new Response(JSON.stringify({ success: false, message: "Unauthorized access" }), {
          status: 401,
          headers: { "Content-Type": "application/json" }
        });
      }

      if (request.method === "GET") {
        return new Response(JSON.stringify(runtimeConfig), {
          headers: { "Content-Type": "application/json" }
        });
      }

      if (request.method === "POST") {
        try {
          const newConfig = await request.json();
          runtimeConfig = { ...runtimeConfig, ...newConfig };
          return new Response(JSON.stringify({ success: true, message: "Configuration updated successfully" }), {
            headers: { "Content-Type": "application/json" }
          });
        } catch (err) {
          return new Response(JSON.stringify({ success: false, error: "Failed to update config" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
          });
        }
      }
    }

    // Default Asset Serving fallback
    return env.ASSETS.fetch(request);
  }
};
`;

fs.writeFileSync(path.join(distDir, '_worker.js'), workerCode);
console.log('✓ Generated _worker.js Edge handler');

console.log('🎉 Cloudflare Pages distribution bundle ready in pages-dist/');
