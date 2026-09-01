# Kanyakumari Safety Pins — B2B Wholesale Ordering Platform

A modern, fast, and frictionless local B2B wholesale ordering platform for **Kanyakumari Safety Pins** — delivering across Nagercoil, Marthandam, Thuckalay, Colachel, and the entire Kanyakumari district, Tamil Nadu.

---

## ⚡ Core Ordering Experience

Designed for local retail shops, tailors, garment units, and textile businesses:
- **Fast 4-Step Quick Wholesale Order**: Choose Pin → Select Size → Choose Pack Quantity → Add to Order
- **Persistent Order Drawer**: Review items, adjust pack counts, and submit shop details in 10 seconds
- **Local Kanyakumari District Delivery**: Direct delivery to Nagercoil, Marthandam, Thuckalay, Colachel, Karungal, Kuzhithurai, Suchindram, Aralvaimozhi, Padmanabhapuram, Kaliyakkavilai, Kulasekharam, Monday Market, and surrounding areas
- **Direct WhatsApp Order Integration**: Instant 1-click order submission to local dispatch (+91 98765 43210)

---

## 📦 Wholesale Product Line

1. **Standard Steel Safety Pins (Mirror Nickel Plated)** — Sizes #000 to #5 (19mm to 65mm)
2. **Pure Brass Golden Safety Pins** — 100% Rustproof for coastal humidity & silk sarees
3. **Bunched Ring Packs on Master Safety Pin** — 12 / 24 pins per ring bunch for fast garment tagging
4. **Pear / Bulb / Gourd Hangtag Pins** — Teardrop shape for apparel price tickets
5. **Tailor Combo Assorted Boxes** — 5 essential sizes combo for tailoring shops
6. **Heavy-Duty Industrial Laundry Pins** — Extra-gauge pins for commercial wash bags & canvas

---

## 🚀 Vercel Deployment

This project is built with **Vite + React + TypeScript** and deploys as a static Single Page Application (SPA).

| Setting | Value |
|---|---|
| **Framework Preset** | `Vite` |
| **Build Command** | `pnpm run build` (or `npm run build`) |
| **Output Directory** | `dist` |
| **Install Command** | `pnpm install` |

### Client Routing (`vercel.json`)
The included `vercel.json` provides client-side SPA routing:
```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 🛠️ Local Development

```bash
# Install dependencies
pnpm install

# Run dev server
pnpm run dev

# Run production build
pnpm run build

# Run typecheck
pnpm run typecheck
```