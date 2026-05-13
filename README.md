<!-- # Balaji Tour & Travel Line

> *Unveiling Luxury, Crafting Journeys*

A modern, frontend-only marketing website for **Balaji Tour & Travel Line** — a Delhi NCR–based Tempo Traveller, SUV, and luxury coach rental business with 25+ years of road experience.

Built as a clean, production-ready rebuild of the legacy WordPress site, this codebase is self-contained, easy to maintain, and deployable to any static host.

---

## ✨ Tech Stack

- **Next.js 15** (App Router, React Server Components)
- **React 19**
- **TypeScript** (strict mode)
- **Tailwind CSS** (custom saffron/crimson brand palette)
- **Framer Motion** (animations)
- **Lucide React** (icons)
- **next/font** (Fraunces + Plus Jakarta Sans)

No backend. No database. No CMS. All content lives in typed JSON-shaped TypeScript files under `src/data/`.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 20 LTS** or newer
- **npm** 10+ (or pnpm / yarn)

### Install & Run

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:3000)
npm run dev

# 3. Build for production
npm run build

# 4. Start the production server locally
npm run start

# 5. Lint
npm run lint
```

That's it. No `.env` file needed.

---

## 📁 Project Structure

```
balaji-tour-travel/
├── public/
│   ├── gallery/        ← Drop gallery images here (auto-detected)
│   ├── fleet/          ← Optional: custom vehicle photos
│   ├── about/          ← Optional: team/office photos
│   └── images/         ← Optional: misc site images
│
├── src/
│   ├── app/                    ← Next.js App Router pages
│   │   ├── layout.tsx          ← Root layout (fonts, navbar, footer)
│   │   ├── page.tsx            ← Home page
│   │   ├── globals.css         ← Tailwind + design tokens
│   │   ├── not-found.tsx       ← 404 page
│   │   ├── fleet/
│   │   │   ├── page.tsx        ← Fleet hub (3 categories)
│   │   │   ├── suv/page.tsx
│   │   │   ├── tempo-traveller/page.tsx
│   │   │   └── luxury-coaches/page.tsx
│   │   ├── destinations/page.tsx
│   │   ├── gallery/page.tsx
│   │   ├── about/page.tsx
│   │   └── contact/page.tsx
│   │
│   ├── components/
│   │   ├── layout/             ← Navbar, Footer
│   │   ├── sections/           ← Home-page sections (Hero, Stats, etc.)
│   │   └── ui/                 ← Reusable UI (VehicleCard, MasonryGallery, ...)
│   │
│   ├── data/                   ← ⭐ Edit these to update site content
│   │   ├── vehicles.ts         ← Fleet inventory
│   │   ├── destinations.ts     ← Tour destinations
│   │   ├── testimonials.ts     ← Customer reviews
│   │   ├── features.ts         ← "Why Choose Us" cards
│   │   └── routes.ts           ← Enquiry estimator routes + pricing
│   │
│   ├── constants/
│   │   └── site.ts             ← Phone, email, address, nav items
│   │
│   ├── lib/
│   │   ├── utils.ts            ← cn(), formatPrice, formatNumber
│   │   └── gallery.ts          ← Reads /public/gallery at build time
│   │
│   └── types/index.ts          ← Shared TypeScript interfaces
│
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
└── package.json
```

---

## 🖼️ Gallery — Auto-Detection (Important!)

The gallery page **automatically picks up any image** dropped into `/public/gallery/`. No code changes needed.

**How to add new gallery photos:**

1. Drop image files (`.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`) into `/public/gallery/`.
2. Use descriptive filenames — they become the alt text. Example:
   - `tempo-traveller-jaipur-trip.jpg` → alt text: *"Tempo Traveller Jaipur Trip"*
3. Rebuild and deploy. The masonry grid updates automatically.

That's the entire workflow. The site supports ~100 images comfortably.

**How it works:** `src/lib/gallery.ts` reads the folder via `fs.readdirSync` at build time. The gallery page is marked `force-static`, so it's compiled once per deploy with zero runtime cost.

---

## ✏️ Editing Content

All site content is in plain TypeScript files. No CMS login, no database.

| What to change                                | Edit this file                |
| --------------------------------------------- | ----------------------------- |
| Phone, email, address, social links           | `src/constants/site.ts`       |
| Headline stats (years, coaches, customers)    | `src/constants/site.ts`       |
| Add/remove vehicles, change pricing           | `src/data/vehicles.ts`        |
| Add/remove tour destinations                  | `src/data/destinations.ts`    |
| Add testimonials                              | `src/data/testimonials.ts`    |
| Edit "Why Choose Us" cards                    | `src/data/features.ts`        |
| Add routes / change per-km pricing            | `src/data/routes.ts`          |
| Hero copy, intro copy                         | `src/components/sections/Hero.tsx`, `Introduction.tsx` |
| About-page story                              | `src/app/about/page.tsx`      |
| Navigation menu items                         | `src/constants/site.ts` → `NAV_ITEMS` |

Each data file is fully typed — the editor will warn you if you forget a field.

---

## 🎨 Design System

**Colours** (defined in `tailwind.config.ts`):

- `saffron` (50–950) — primary brand orange
- `crimson` (50–950) — accent red
- `ink` (50–950) — text / dark neutrals
- `cream` (`#fdfaf5`) — warm background

**Fonts:**

- **Fraunces** — display serif (headlines, italic accents)
- **Plus Jakarta Sans** — body text

**Reusable utility classes** in `globals.css`:

- `.btn-primary`, `.btn-secondary`, `.btn-ghost` — pill buttons
- `.eyebrow` — small uppercase tracking label
- `.text-gradient-saffron` — saffron→crimson gradient text
- `.card-base` — standard rounded card

---

## 🚢 Deployment

### Vercel (recommended — zero config)

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Vercel auto-detects Next.js. Click **Deploy**. Done.

### Netlify

1. Push to GitHub.
2. New site → connect repo.
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Install the [Next.js Runtime plugin](https://docs.netlify.com/integrations/frameworks/next-js/overview/) (Netlify suggests it automatically).

### Static export (GitHub Pages / S3 / any static host)

Add to `next.config.mjs`:

```js
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // ... keep existing config
};
```

Then `npm run build` produces a static `out/` folder you can upload anywhere.

> Note: static export disables Next/Image optimisation. For a small image library this is fine; for 100+ images, prefer Vercel/Netlify.

---

## 🔌 Enquiry Estimator

The home page includes a frontend-only estimator that calculates trip distance, time, and approximate cost based on:

- **Source** & **destination** → `src/data/routes.ts` (`distanceKm`, `estimatedHours`)
- **Vehicle** → `PRICING_PER_KM` in the same file

To add a new route:

```ts
// src/data/routes.ts
{
  id: 'delhi-to-shimla',
  source: 'Delhi NCR',
  destination: 'Shimla',
  distanceKm: 343,
  estimatedHours: 7,
  popularStops: ['Chandigarh', 'Solan'],
}
```

To change pricing for a vehicle, edit the `PRICING_PER_KM` record.

---

## 📞 WhatsApp & Call CTAs

Click-to-call (`tel:`) and WhatsApp (`wa.me`) links are wired throughout — phone numbers are pulled from `src/constants/site.ts`. Update the `CONTACT` object once and they propagate everywhere (navbar, footer, contact page, floating WhatsApp button, final CTA).

---

## ♿ Accessibility & SEO

- Semantic HTML throughout (`<nav>`, `<main>`, `<section>`, `<article>`)
- Alt text on every image
- Keyboard-navigable navbar and gallery lightbox
- Per-page `metadata` exports for SEO titles and descriptions
- Lighthouse-friendly: lazy-loaded images, optimized fonts, no render-blocking JS

---

## 📜 License

Proprietary. © Balaji Tour & Travel Line. Source code transferred to the client upon delivery.

---

## 🛟 Quick Troubleshooting

**Gallery is empty?** Drop images into `/public/gallery/` and rebuild. The page also falls back to Unsplash placeholders if the folder is empty.

**Images not loading from external URLs?** Check `next.config.mjs` → `images.remotePatterns` and add the domain.

**Fonts look wrong?** Make sure you have an internet connection on first build — `next/font` fetches fonts from Google Fonts at build time and self-hosts them.

**TypeScript errors after editing data files?** Check `src/types/index.ts` for the expected shape, or just look at the existing entries as templates. -->
