# Travello — Trekking & Expedition Website

A full-stack **trekking company website** with a headless CMS admin panel, built with **Next.js 14 (App Router)**, **Tailwind CSS**, **GSAP**, and **Supabase**.

## ✨ Features

### Public site
| Page | What it does |
| --- | --- |
| `/` | Parallax hero · How it works · Trek cards · Testimonials · Stats · CTA |
| `/treks` | Search + difficulty + region filters · sort by price/duration/rating |
| `/treks/[slug]` | Full itinerary · difficulty meter · packing list · share button · JSON-LD |
| `/book` | Booking form with trek preview sidebar · UPI / credit / debit payment UI |
| `/gallery` | Masonry grid · lightbox with dot indicators, counter, and keyboard nav |
| `/about` | Story · milestones band · values · team cards · certifications · careers |
| `/contact` | Contact cards · Google Maps embed · animated FAQ accordion |
| `/terms` | Terms & policies |

### Global UX
- Floating back-to-top + WhatsApp chat button (appears after 500px scroll)
- Newsletter signup in footer (animated submit + success state)
- Header active-page underline indicator
- Dynamic sitemap at `/sitemap.xml` and robots at `/robots.txt`

### Admin CMS (`/admin`)
Password-protected panel for managing all site content without touching code.

| Section | Capabilities |
| --- | --- |
| **Treks** | Create, edit, delete treks · upload hero images |
| **Gallery** | Add / remove photos · upload images |
| **About** | Edit story, values, team members |
| **Contact** | Update address, phone, email, social links |

Auth is HMAC-signed (Node.js `crypto`), stored as an HttpOnly cookie. Middleware guards all `/admin/*` routes.

## 🗂 Project structure

```
app/
  layout.jsx                    # fonts, <Header/>, <Footer/>, metadata
  page.jsx                      # home: parallax hero + trek cards + sections
  globals.css                   # Tailwind directives + button system
  treks/page.jsx                # all treks (filterable)
  treks/[slug]/page.jsx         # trek detail (ISR, static params from Supabase)
  gallery/page.jsx
  about/page.jsx
  book/page.jsx                 # booking form (Suspense-wrapped)
  contact/page.jsx
  terms/page.jsx
  admin/
    login/page.jsx              # standalone login page
    (shell)/                    # protected: sidebar layout
      page.jsx                  # dashboard with content counts
      treks/                    # trek list + new/edit forms
      gallery/                  # gallery manager
      about/page.jsx            # about editor
      contact/page.jsx          # contact editor
  api/admin/
    login/route.js              # POST: verify creds, set HttpOnly cookie
    logout/route.js             # POST: clear cookie
    treks/route.js              # GET list, POST create
    treks/[slug]/route.js       # GET, PUT, DELETE
    treks/upload/route.js       # POST: image upload
    gallery/route.js            # GET list, POST create
    gallery/[id]/route.js       # PUT, DELETE
    gallery/upload/route.js     # POST: image upload
    about/route.js              # GET, PUT
    contact/route.js            # GET, PUT
components/
  Header.jsx                    # scroll-aware: transparent → frosted → solid white
  Footer.jsx
  ParallaxHero.jsx              # GSAP entrance + mouse parallax + scroll blur
  ParallaxHero.module.css       # layer geometry
  TrekCard.jsx                  # card + blurred modal portal
  TreksExplorer.jsx             # client-side difficulty filter
  BookingForm.jsx               # UPI/card UI, validation
  GalleryGrid.jsx               # masonry + lightbox
  PageHero.jsx
  admin/                        # TrekForm, GalleryManager, etc.
lib/
  supabase.js                   # Supabase server client (service role)
  treks.js                      # getAllTreks, getTrekBySlug, getFeaturedTreks
  serverData.js                 # getAboutData, getGalleryData, getContactData
  trekUtils.js                  # formatPrice, difficultyTone (client-safe)
  auth.js                       # HMAC session sign/verify, requireAdmin
  site.js                       # static nav + footer config
middleware.js                   # redirect guard for /admin/* (Edge runtime)
scripts/
  seed.mjs                      # one-time seed: data/*.json → Supabase
data/
  treks.json                    # source of truth for seed (now in Supabase)
  gallery.json
  about.json
  contact.json
public/
  parallax/                     # mountain/fog/sky PNG layers
  treks/                        # trek photography
```

## 🚀 Getting started

```bash
npm install
```

Create `.env.local`:
```env
ADMIN_SECRET=your-secret-here

NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...
SUPABASE_SERVICE_ROLE_KEY=sb_secret_...
```

Run the Supabase schema (SQL Editor in Supabase dashboard):
```sql
CREATE TABLE IF NOT EXISTS treks (
  slug TEXT PRIMARY KEY, data JSONB NOT NULL,
  position INTEGER NOT NULL DEFAULT 0, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS gallery (
  id TEXT PRIMARY KEY, src TEXT NOT NULL, title TEXT, location TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS about (
  id INTEGER PRIMARY KEY, data JSONB NOT NULL, updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS contact (
  id INTEGER PRIMARY KEY, data JSONB NOT NULL, updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

Seed initial content and start:
```bash
node scripts/seed.mjs
npm run dev      # http://localhost:3000
```

Admin panel at `/admin` — default credentials: `admin` / `admin@123`.

## 🎨 Design system

- **Style:** Motion-Driven — parallax, scroll reveal, entrance animation
- **Palette:** Sky blue `#0EA5E9` (brand) · adventure orange `#F97316` (ember/CTA) · deep-ink `#0C4A6E`
- **Type:** Outfit (display) + Inter (body) via `next/font`
- **Narrative:** dark misty hero → blurs away into bright "clear skies" content

## ♿ Accessibility

- Respects `prefers-reduced-motion` — parallax, GSAP, and scroll blur all soften or disable
- Keyboard-operable cards, lightbox, and forms; visible focus rings throughout
- `next/image` for all photography; Lucide SVG icons throughout
- Responsive at 375 / 768 / 1024 / 1440 px
