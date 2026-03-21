# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> Beyond Balance Bookkeeping — Website Build Instructions. Contains all brand guidelines,
> approved website copy, design system tokens, and build rules needed to develop and iterate
> on the Beyond Balance Bookkeeping website. Read this file before making any changes to the site.

---

## Development

### Active File
**`index-v4.html` is the current working version.** Earlier files (`index.html`, `index-v2.html`, `index-v3.html`) are reference snapshots — do not edit them unless explicitly asked.

### Local Dev Server
```bash
node serve.mjs          # starts at http://localhost:3000
PORT=8080 node serve.mjs  # custom port
```
The server (`serve.mjs`) is a plain Node.js HTTP server — no build step, no hot reload. Refresh the browser manually after edits.

> **Important:** Always use the HTTP server when taking Puppeteer screenshots. `file://` URLs cause Chromium to block local image loads via cross-origin restrictions, so images with `loading="lazy"` will not render.

### Screenshots
Two Puppeteer tools are available:

```bash
# Full-page screenshot (auto-increments filename → "temporary screenshots/screenshot-N.png")
node screenshot.mjs                          # captures http://localhost:3000
node screenshot.mjs http://localhost:3000 mobile   # adds label suffix

# Section-level screenshots (requires server running on port 8743)
npx http-server . -p 8743 -s &
node tools/screenshot-sections.js           # saves to .tmp/screenshots/
```

**Lazy-load caveat:** `loading="lazy"` on below-fold images means Puppeteer won't load them until they're in the viewport. Before capturing any section screenshot, scroll through the full page first:
```js
for (let y = 0; y < document.body.scrollHeight; y += 600) {
  window.scrollTo(0, y);
  await new Promise(r => setTimeout(r, 80));
}
```
Then use `getBoundingClientRect() + window.scrollY` for absolute page coordinates when clipping.

### File Structure (actual)
```
Client Sites - Wandile/
├── CLAUDE.md                  ← this file
├── SEO_Optimization.md        ← SEO workflow rules (read before any SEO changes)
├── index-v4.html              ← ACTIVE: current site
├── index-v3.html              ← reference snapshot
├── index-v2.html              ← reference snapshot
├── index.html                 ← original/reference
├── sitemap.xml                ← XML sitemap (single URL, update lastmod on deploy)
├── robots.txt                 ← crawler directives + sitemap pointer
├── serve.mjs                  ← Node HTTP dev server (port 3000)
├── screenshot.mjs             ← full-page Puppeteer capture
├── tools/
│   └── screenshot-sections.js ← section-level Puppeteer capture
├── Brand_Assets/
│   ├── Logo.png               ← brand logo (555×692px, dark navy bg)
│   ├── Eddie - Head Shot.png  ← founder headshot
│   └── WhatsApp Image *.jpeg  ← alternate photo (legacy)
├── temporary screenshots/     ← screenshot.mjs output
├── .tmp/screenshots/          ← tools/screenshot-sections.js output
└── node_modules/              ← puppeteer (installed)
```

### CSS Architecture
All CSS is inlined inside a `<style>` block in the `<head>` of `index-v4.html` — there is no external stylesheet. Tailwind CDN is loaded for utility classes, but custom component styles (cards, hero, founder section, nav, animations) are written in vanilla CSS inside that `<style>` block. Edit there directly.

### Key Section IDs (anchor nav targets)
| ID | Section |
|----|---------|
| `#hero` | Hero / above fold |
| `#trust` | Trust bar |
| `#services` | Services card grid |
| `#about` | Why Choose Us (logo left, value props right) |
| `#founder` | Our Story / Founder bio (headshot left, bio right) |
| `#clients` | Who We Serve |
| `#software` | Software Tools |
| `#pricing` | Pricing tiers |
| `#resources` | Blog / Resources cards |
| `#contact` | Contact / CTA |

---

## 1. Brand Identity

### Company
- **Name:** Beyond Balance Bookkeeping
- **Tagline:** Bookkeeping. Accounting. Advisory.
- **Location:** Houston, TX (serves Houston metro, remote available nationwide)
- **Founded:** 2025
- **Phone:** 713-992-1716
- **Email:** eddiembatha@gmail.com
- **Website:** beyondbalancebookkeeping.com

### Brand Positioning
Beyond Balance is a Houston-based bookkeeping, accounting, and advisory firm built for small business owners, freelancers, independent contractors, and entrepreneurs. The brand promise is: *"From messy books to tax-ready financials."* The tone is professional but approachable — no jargon, no gatekeeping. The founder (Wandile / Eddie Mbatha) is hands-on and positions the firm as a partner, not a vendor.

### Target Audience
1. Small business owners (brick-and-mortar, service-based, e-commerce) in Houston
2. Entrepreneurs and startups needing investor-ready financials
3. Independent contractors and freelancers (1099 workers)
4. Gig workers (rideshare, delivery, platform-based income)

### Voice & Tone
- **Confident but not arrogant** — "We handle the numbers so you can grow."
- **Direct and clear** — No accounting jargon unless explained
- **Action-oriented** — Every section drives toward booking a consultation
- **Warm and personal** — First-person plural ("we"), second-person ("you/your")

---

## 2. Design System

### Color Palette

```css
:root {
  /* Primary — Deep Navy */
  --navy-deep:   #0A1940;
  --navy-mid:    #0D2154;

  /* Accent — Royal Blue */
  --royal:       #2B5AA8;

  /* Accent — Sky Blue (primary CTA color) */
  --sky:         #6A9FD4;

  /* Accent — Ice Blue */
  --ice:         #A8C8EC;

  /* Neutrals */
  --off-white:   #F0F5FB;
  --white:       #FFFFFF;

  /* Shadows */
  --shadow-dark: rgba(10,25,64,0.40);
  --shadow-blue: rgba(43,90,168,0.28);
}
```

**Usage Rules:**
- Dark sections: `--navy-deep` background, white text, `--sky` accents
- Light sections: `--off-white` background, `--navy-deep` text, `--royal` accents
- Primary buttons: `--sky` background, `--navy-deep` text
- Ghost buttons: transparent background, white border, white text
- Card backgrounds: `--navy-mid`
- Subtle text: `--ice` on dark, `#506080` on light
- Decorative circles: `--royal` at low opacity (0.07–0.15)

### Typography

```css
/* Display / Headings */
font-family: 'Barlow Condensed', sans-serif;
/* Weights: 600 (eyebrow labels), 700 (subheadings), 800 (main headings) */
text-transform: uppercase;
letter-spacing: -0.02em to 0.2em (varies by context);

/* Body / Paragraphs */
font-family: 'Inter', sans-serif;
/* Weights: 400 (body), 500 (nav links, labels), 600 (badges) */
line-height: 1.7;
```

**Google Fonts Import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
```

### Wordmark
The brand wordmark renders as two stacked words:
- **BEYOND** — white (`#FFFFFF`)
- **BALANCE** — sky blue (`#6A9FD4`)
- Font: Barlow Condensed, weight 800, uppercase

### Component Patterns

**Section Headings:**
- Eyebrow label: Barlow Condensed 600, 0.9rem, letter-spacing 0.2em, uppercase, `--sky` (dark) or `--royal` (light)
- Main heading: Barlow Condensed 800, clamp(2rem, 4vw, 2.75rem), uppercase
- Supporting text: Inter 400, 0.975rem, 60% opacity

**Service Cards:**
- Background: `--navy-mid`
- Border: 1px solid `rgba(43,90,168,0.25)`
- Border-radius: 16px
- Padding: 1.5rem
- Hover: translateY(-5px) + stronger shadow
- Decorative circle in top-right corner at 15% opacity

**Buttons:**
- Primary: pill shape (border-radius: 999px), sky background, navy text, uppercase
- Ghost: pill shape, transparent, white border, white text
- Hover: translateY(-2px), enhanced shadow or border-color shift

**Decorative Circles:**
- Absolute positioned, border-radius 50%, `--royal` background
- Animated with gentle float keyframes (22–30s duration)
- Opacity range: 0.07–0.15
- Used in hero, services, clients, and contact sections

---

## 3. Approved Website Copy

### PAGE 1: HOME

**NAVBAR**
Beyond Balance | Services | About | Who We Serve | Contact | [Book a Call] (CTA button)

**HERO — EYEBROW**
Houston's Trusted Bookkeeping & Accounting Firm

**HERO — MAIN HEADLINE**
BEYOND BALANCE

**HERO — SUBHEADLINE**
Bookkeeping, Accounting & Advisory Services

**HERO — BODY (short)**
For your tax-ready financial statements.

**HERO — BODY (expanded)**
From messy books to tax-ready financials — our Houston bookkeeping and accounting services handle the numbers so you can focus on growing your business. Serving small businesses, freelancers, independent contractors, and entrepreneurs across Houston, TX.

**PRIMARY CTA**
[ Book a Free Consultation ]

**SECONDARY CTA**
[ See Our Services ]

---

**TRUST BAR**
✓ QuickBooks Online Certified | ✓ TaxAct Professional | ✓ Trusted by Houston Businesses

---

**SECTION: SERVICES (Card Grid)**

Section Eyebrow: What We Do
Section Heading: Our Services Include
Section Subtext: Full-spectrum financial services — from day-to-day bookkeeping to strategic advisory — all under one roof.

| Service              | Icon | Description                                         |
|----------------------|------|-----------------------------------------------------|
| Bookkeeping          | 📒   | Accurate transaction recording and reconciliation.  |
| Clean Ups            | 🧹   | Fix messy books and bring your records up to date.  |
| Property Reporting   | 🏢   | Detailed reporting for real estate and rental properties. |
| AR Management        | 📥   | Track and manage accounts receivable efficiently.   |
| AP Management        | 📤   | Manage vendor payments and accounts payable.        |
| Inventory Management | 📦   | Keep stock levels and costs accurately tracked.     |
| Cash Reporting       | 💵   | Clear visibility into your cash position at all times. |
| Budgeting            | 📊   | Build realistic budgets and financial forecasts.    |
| KPI Analysis         | 📈   | Track the metrics that actually move your business. |
| Check Cutting        | ✂️   | Streamlined check processing and payment management.|
| Bill Pay             | 🏦   | Timely and organized payment of your business bills.|
| 1099 Tracking        | 📋   | Accurate contractor payment tracking for compliance.|
| Reconciliations      | ⚖️   | Bank and account reconciliations every month, on time. |

---

**SECTION: WHY CHOOSE US**

Section Eyebrow: Why Beyond Balance?
Section Heading: Built for Business Owners Who Need More
Section Body: Beyond Balance was built for entrepreneurs who need more than a spreadsheet. We bring structure, accuracy, and strategy to your finances — whether you're cleaning up a backlog or building from scratch.

| Value Prop                  | Detail                                                                          |
|-----------------------------|---------------------------------------------------------------------------------|
| Tax-Ready from Day One      | Books built to support filing, not just tracking. You'll never scramble at tax time again. |
| Startup & Freelancer Friendly | No minimum revenue, no jargon. We work with you at any stage of business.     |
| Full-Spectrum Coverage      | AR, AP, payroll, 1099, budgeting, and advisory — all under one roof, no hand-offs. |
| Software You Already Know   | We work in QuickBooks Online, TaxAct, and Excel — no steep learning curve.     |

---

**SECTION: WHO WE SERVE (Client Tiles)**

Section Eyebrow: Perfect For
Section Heading: Who We Serve
Section Subtext: From side hustles to established businesses — if you need clean, compliant financials, we're your team.

| Client Type                | Icon | Description                                                                             |
|----------------------------|------|-----------------------------------------------------------------------------------------|
| Small Business Owners      | 🏪   | Brick-and-mortar, service-based, or e-commerce — we keep your books tight so you can focus on operations. |
| Entrepreneurs & Startups   | 🚀   | Get investor-ready financials and the structure you need to scale with confidence from day one. |
| Contractors & Freelancers  | 🧑‍💻  | 1099 tracking, expense management, and quarterly estimates — we handle it all so you stay compliant. |
| Gig Workers                | 🚗   | Rideshare, delivery, or platform-based income — we make sense of your earnings and maximize your deductions. |

---

**SECTION: SOFTWARE TOOLS**

Section Eyebrow: Tools We Use
Section Heading: Software We Work In
Section Subtext: Industry-standard tools you already trust — no learning curve, no surprises.

Badges: QuickBooks Online Accountant | TaxAct Professional | Microsoft Excel

---

**SECTION: CONTACT / CTA**

Section Eyebrow: Get Started Today
Section Heading: Ready to Get Your Books Right?
Section Body: Book a free 30-minute consultation. No commitment, no jargon — just a straight conversation about your finances.
Phone: 📞 713 992 1716
Email: ✉️ eddiembatha@gmail.com
CTA Button: [ BOOK NOW ]

---

**FOOTER**
BEYOND BALANCE
© 2026 Beyond Balance Bookkeeping. All rights reserved.
Privacy Policy | Terms of Service

---

## 4. SEO & Metadata

> For detailed SEO rules (title length, meta description, heading structure, GEO optimisation, Local SEO), read **`SEO_Optimization.md`** before making any SEO-related changes.

**Implemented meta tags** (all present in `index-v4.html`):
- `<title>`, `<meta name="description">`, `<meta name="keywords">`, `<meta name="robots">`
- `<link rel="canonical">`, `<link rel="sitemap">`
- `<link rel="preload" as="image">` for Logo.png (LCP hint)
- Full Open Graph set including `og:image`
- Twitter card set including `twitter:image`
- Geo tags: `geo.region`, `geo.placename`

**JSON-LD — three separate `<script type="application/ld+json">` blocks:**
1. `["AccountingService", "LocalBusiness"]` — includes `geo`, `openingHours`, `founder`, `hasMap`, `sameAs`
2. `WebSite` — declares site entity with publisher
3. `FAQPage` — 4 Q&As covering services, 1099/freelancer, software, getting started

When updating contact info or business hours, update all three JSON-LD blocks and the visible copy simultaneously.

---

## 5. Build Rules

### Tech Stack
- Single-page HTML site (all sections on one page with anchor navigation)
- Tailwind CSS via CDN (`https://cdn.tailwindcss.com`) with custom config
- Vanilla CSS for animations, custom components, and overrides
- No framework required — pure HTML/CSS/JS
- CSS-only mobile hamburger menu (no JavaScript dependency for nav)
- Google Fonts loaded via `<link>` tags

### File Structure
See the **Development** section at the top of this file for the current actual structure.

### Section Order (in index-v4.html)
1. Navigation (sticky top)
2. Hero (full-viewport with SVG logo, decorative circles)
3. Trust Bar (light background, credential badges)
4. How It Works (dark background, 4-step process: Discovery → Setup → Monthly → Tax Ready)
5. Services (dark background, card grid — 13 services)
6. Why Choose Us / About (light background, 2-column with logo + value props)
7. Our Story / Founder bio (dark background, headshot + bio)
8. Testimonials (dark background, client quote cards)
9. Who We Serve (dark background, client tiles)
10. Pricing (dark background, tier cards)
11. Software Tools (light background, badge strip)
12. Blog / Resources (light background, 3 article cards)
13. Contact / CTA (dark background, centered)
14. Footer (darkest background)

### Responsive Breakpoints
- Desktop: 2-column grids, full nav visible
- Tablet (≤1024px): Adjust grid gaps, reduce padding
- Mobile (≤767px): Single column, hamburger nav, reorder hero (logo above text)

### Accessibility
- All images and SVGs must have `role="img"` and `aria-label`
- Nav links need `:focus-visible` outlines
- Buttons need `:focus-visible` with `outline-offset`
- Use semantic HTML: `<nav>`, `<section>`, `<footer>`, `<h1>`–`<h4>`
- Color contrast: all text meets WCAG AA (white on navy-deep passes, ice on navy-mid passes)

### Animation Rules
- Decorative circles: CSS `@keyframes` with gentle translate transforms, 17–30s duration
- Cards/tiles: `translateY(-5px)` on hover with enhanced `box-shadow`
- Buttons: `translateY(-2px)` on hover, `translateY(0)` on active
- All transitions: 150–200ms ease
- No animation on `prefers-reduced-motion: reduce`

### Performance
- Inline all CSS (no external stylesheet beyond Tailwind CDN and Google Fonts)
- SVG logos rendered inline (no external image files for the logo)
- Minimize DOM depth in card grids
- Use `loading="lazy"` on any below-fold images

---

## 6. Iteration Checklist

When making changes to the site, verify:

- [ ] All brand colors match the design system tokens above
- [ ] Typography uses only Barlow Condensed (headings) and Inter (body)
- [ ] Every section has the correct dark/light background pattern
- [ ] CTAs link to `#contact` or `tel:7139921716`
- [ ] Mobile hamburger works without JavaScript
- [ ] Trust bar items wrap cleanly on mobile
- [ ] Service cards maintain consistent height in grid
- [ ] Footer copyright year is current
- [ ] SEO meta tags are present and accurate (consult `SEO_Optimization.md`)
- [ ] All three JSON-LD blocks are valid (LocalBusiness, WebSite, FAQPage)
- [ ] `sitemap.xml` `<lastmod>` updated to deploy date
- [ ] All `<img>` tags have explicit `width` and `height` attributes
- [ ] All interactive elements have focus-visible styles

---

## 7. Future Enhancements

Implemented in `index-v4.html` (not in earlier versions):
- [x] Blog / Resources section (`#resources`) — 3 article cards with inline SVG icons
- [x] Service tier pricing section (`#pricing`)
- [x] Our Story / Founder bio section (`#founder`) with Eddie headshot
- [x] Calendly booking link integration
- [x] How It Works process section (Discovery → Setup & Cleanup → Monthly Bookkeeping → Tax Season Ready)
- [x] Testimonials / social proof section with client quote cards
- [x] Full SEO deployment optimisation (3 JSON-LD blocks, og:image, LCP preload, sitemap.xml, robots.txt)

Not yet implemented — do NOT add unless explicitly asked:
- [ ] Google Analytics / tracking script
- [ ] Contact form with form submission handler
- [ ] Multi-page routing (currently single-page)
- [ ] Google Map embed on contact section
- [ ] WebP conversion of Brand_Assets images
