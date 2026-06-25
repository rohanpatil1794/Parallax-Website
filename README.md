# Travello — Trekking & Expedition Website

A production-ready **frontend** for a trekking company, built with **Next.js (App Router)**, **Tailwind CSS**, and **GSAP**. It preserves the original 3D parallax hero and grows it into a full, deployable marketing + booking UI.

> Data layer is **UI-only** for now. All trek content lives in `lib/treks.js` as mock data, and all forms simulate submission on the client. The shape is ready to be swapped for **Supabase** later without touching the components.

## ✨ What's inside

| Capability | Where |
| --- | --- |
| **Explore treks** | `/treks` — filterable grid of every expedition |
| **View trek details** | `/treks/[slug]` — full itinerary, inclusions, sticky booking card. Also previewable inline by expanding any card. |
| **Book a trek** | `/book` — booking form with **UPI / credit / debit** payment UI (no real processing) |
| **Parallax home** | `/` — the original mouse-driven 3D parallax hero that **blurs on scroll** to reveal trek cards |
| Gallery (lightbox) | `/gallery` |
| About us | `/about` |
| Contact us + FAQs | `/contact` |
| Terms & policies | `/terms` |

## 🎨 Design system

Generated with the `ui-ux-pro-max` skill for an adventure/outdoor brand:

- **Style:** Motion-Driven (parallax, scroll reveal, entrance animation)
- **Palette:** Sky blue `#0EA5E9` primary · adventure orange `#F97316` CTA · deep-ink `#0C4A6E` text
- **Type:** Outfit (display) + Inter (body), via `next/font`
- **Narrative:** dark, misty hero → blurs away into bright "clear skies" content

## 🗂 Project structure

```
app/
  layout.jsx              # fonts, <Header/>, <Footer/>, metadata
  page.jsx                # home: parallax hero + scroll-reveal treks + sections
  globals.css             # Tailwind + button system + reduced-motion
  treks/page.jsx          # all treks (filterable)
  treks/[slug]/page.jsx   # trek detail (static-generated per trek)
  gallery/page.jsx
  about/page.jsx
  contact/page.jsx
  book/page.jsx           # booking form (Suspense-wrapped for search params)
  terms/page.jsx
  not-found.jsx
components/
  Header.jsx              # responsive, scroll-aware, transparent over hero
  Footer.jsx              # Customer Support · About Us · Terms · Contact Info
  ParallaxHero.jsx        # ported parallax + GSAP entrance + scroll-blur
  ParallaxHero.module.css # layer geometry (ported from the original style.css)
  TrekCard.jsx            # collapsed ⇄ expanded (in-place detail reveal)
  TreksExplorer.jsx       # difficulty filter
  BookingForm.jsx         # UPI/card UI, validation, success state
  GalleryGrid.jsx         # masonry + keyboard-driven lightbox
  ContactForm.jsx
  PageHero.jsx, Logo.jsx
lib/
  treks.js                # mock trek catalogue (swap for Supabase later)
  site.js                 # nav + footer config
public/
  parallax/               # the original mountain/fog/sky PNG layers
  treks/                  # trek photography
```

## 🚀 Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Build for production:

```bash
npm run build
npm run start
```

## 🔌 Wiring up Supabase later

Replace the synchronous helpers in `lib/treks.js` (`getAllTreks`, `getTrekBySlug`) with Supabase queries and make the consuming Server Components `async`. Point the booking + contact form `onSubmit` handlers at a Supabase insert / route handler. No UI changes required.

## ♿ Accessibility & UX notes

- Respects `prefers-reduced-motion` (mouse parallax, GSAP entrance and scroll-blur all soften/disable).
- Keyboard-operable cards, gallery lightbox, and forms; visible focus rings throughout.
- `next/image` for all content photography; SVG (Lucide) icons, never emoji.
- Responsive at 375 / 768 / 1024 / 1440px.

---

The original vanilla build (`index.html`, `style.css`, `js/app.js`) is kept at the repo root for reference; the parallax layer art now lives in `public/parallax/`.
