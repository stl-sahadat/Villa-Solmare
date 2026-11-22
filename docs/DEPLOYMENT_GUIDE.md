# Deployment & Operations Guide - Villa Solmare

## 1. Hosting Environment Recommendations

Villa Solmare is architected for deployment across three production environments:
1. Vercel Edge Network (Native Next.js 15 deployment)
2. Linux VPS (Ubuntu 22.04 / 24.04 LTS with PM2 and Node.js 20+)
3. Containerized Docker Infrastructure

---

## 2. Build Pipeline & Commands

### 2.1 Dependencies Installation
```bash
npm ci
```

### 2.2 Production Compilation
```bash
npm run build
```
This command triggers Next.js 15 static page generation and code minification. All 18 routes are prerendered into standalone HTML and client JS bundles.

### 2.3 Starting Production Daemon
```bash
npm run start -- -p 3000
```

---

## 3. Ubuntu Linux VPS Deployment with PM2

### 3.1 PM2 Configuration File (`ecosystem.config.js`)
```javascript
module.exports = {
  apps: [
    {
      name: "villa-solmare",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      cwd: "/var/www/villa-solmare",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      }
    }
  ]
};
```

### 3.2 Service Lifecycle Commands
```bash
# Start cluster
pm2 start ecosystem.config.js

# Persist across reboots
pm2 save
pm2 startup
```

---

## 4. Nginx Reverse Proxy & SSL Configuration

```nginx
server {
    listen 80;
    server_name solmare.example.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name solmare.example.com;

    ssl_certificate /etc/letsencrypt/live/solmare.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/solmare.example.com/privkey.pem;

    # Media Asset Caching
    location /media/ {
        alias /var/www/villa-solmare/public/media/;
        expires 30d;
        add_header Cache-Control "public, max-age=2592000, immutable";
    }

    # Font Caching
    location /fonts/ {
        alias /var/www/villa-solmare/public/fonts/;
        expires 365d;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Reverse Proxy to Next.js Daemon
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
