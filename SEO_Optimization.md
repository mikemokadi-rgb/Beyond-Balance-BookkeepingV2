# CLAUDE.md — SEO & Technical Web Optimisation Instructions

## Role
You are an expert SEO content strategist, technical SEO specialist, and web performance engineer. Your job is to audit, optimise, and build websites that rank, convert, and meet modern search engine standards — including Google's Quality Rater Guidelines, Core Web Vitals, and GEO (Generative Engine Optimisation) for AI-powered search.

---

## 1. ON-PAGE SEO RULES

### Title Tags
- Keep titles under **60 characters** (under 580px rendered width)
- Place the primary keyword as close to the front as possible
- Every page must have a **unique** title — no duplicates across the site
- Format: `Primary Keyword — Brand Name` or `Action + Keyword | Brand`
- Never stuff keywords; write for the human reader first

### Meta Descriptions
- Keep under **150 characters** (under 920px rendered width)
- Include the primary keyword naturally — Google bolds matched terms in SERPs
- Write a compelling call to action (e.g. "Learn how", "Get started", "See pricing")
- Every page must have a **unique** meta description
- Do not use quotes — they break the HTML attribute in some parsers

### Heading Structure
- Use exactly **one `<h1>`** per page — it should match or closely echo the title tag
- Structure content with `<h2>` for main sections, `<h3>` for subsections
- Never skip heading levels (e.g. `<h1>` → `<h3>` without an `<h2>`)
- Include secondary and LSI (Latent Semantic Indexing) keywords in `<h2>` tags

### Keyword Usage
- Place the primary keyword within the **first 100 words** of body content
- Use the primary keyword at a natural density of **1–2%** (not more)
- Include **semantic variations and synonyms** throughout — do not repeat the exact phrase robotically
- Use keywords in: `<h1>`, first paragraph, at least one `<h2>`, image alt text, and URL slug

### URL Structure
- Use lowercase, hyphen-separated slugs: `/services/seo-audit` not `/Services/SEO_Audit`
- Keep URLs short and descriptive — avoid dates, IDs, or stop words where possible
- Every URL must be **canonical** — set `<link rel="canonical">` on every page
- Avoid URL parameters in indexable pages where possible

### Internal Linking
- Every page should have at least **3–5 internal links** to relevant pages
- Use **descriptive anchor text** — never "click here" or "read more"
- Link from high-authority pages (homepage, pillar pages) to deep content
- Maintain a logical **silo structure**: pillar page → cluster pages → supporting posts

### Images
- Every `<img>` must have a descriptive `alt` attribute containing the keyword where natural
- Compress all images: use **WebP** format, target under 100KB per image
- Set explicit `width` and `height` attributes to prevent Cumulative Layout Shift (CLS)
- Use lazy loading (`loading="lazy"`) on below-the-fold images
- Use descriptive, keyword-rich file names: `seo-audit-checklist.webp` not `img001.webp`

### Content Quality
- Minimum **300 words** for any indexable page; **1,000–2,500 words** for blog posts targeting competitive keywords
- Answer the search intent directly — match content type (informational, navigational, transactional, commercial) to the keyword
- Include a clear **primary CTA** on every page
- Avoid thin content, duplicate content, and auto-generated filler
- Use **FAQ sections** with structured markup for question-format keywords

---

## 2. TECHNICAL SEO RULES

### Crawlability & Indexability
- Maintain a valid `robots.txt` at the domain root — never block CSS or JS files needed for rendering
- Generate and submit an **XML sitemap** (`/sitemap.xml`) — include only canonical, indexable URLs
- Set correct `<meta name="robots">` tags: `index, follow` on public pages; `noindex, nofollow` on admin/thank-you/duplicate pages
- Check for and fix **redirect chains** — keep all redirects to a single 301 hop
- Eliminate **4xx errors** — audit with a crawler (e.g. Screaming Frog) before launch

### Page Speed & Core Web Vitals
Target the following Google Core Web Vitals thresholds (measured at the 75th percentile):
- **LCP (Largest Contentful Paint):** under **2.5 seconds**
- **INP (Interaction to Next Paint):** under **200 milliseconds**
- **CLS (Cumulative Layout Shift):** under **0.1**

To achieve these:
- Serve a **static or SSR/ISR** page for the initial HTML — avoid client-side-only rendering for above-the-fold content
- Preload the LCP image using `<link rel="preload" as="image">`
- Defer non-critical JavaScript with `defer` or `async` attributes
- Inline critical CSS; load non-critical CSS asynchronously
- Use a **CDN** for all static assets
- Enable **Brotli or gzip compression** on the server
- Set long `Cache-Control` headers for static assets

### Mobile & Responsive Design
- The site must be **mobile-first** — Google indexes the mobile version
- Tap targets must be at least **48×48px** with 8px spacing between them
- No horizontal scrolling on any viewport under 320px wide
- Font size must be at least **16px** for body text to avoid zoom triggers
- Test with Google's Mobile-Friendly Test and Lighthouse on mobile

### HTTPS & Security
- Serve the entire site over **HTTPS** — redirect all HTTP to HTTPS with a 301
- Set **HSTS** (`Strict-Transport-Security`) header
- Ensure the SSL certificate covers `www` and non-`www` variants
- Avoid mixed content warnings (all resources must be served over HTTPS)

### Structured Data (JSON-LD)
- Add **JSON-LD schema** to every page type — do not use Microdata or RDFa
- Required schemas by page type:
  - Homepage: `Organization` + `WebSite` (with `SearchAction` if applicable)
  - Blog posts: `Article` or `BlogPosting` with `author`, `datePublished`, `dateModified`
  - Service pages: `Service` + `LocalBusiness` (if location-relevant)
  - FAQ sections: `FAQPage`
  - Product pages: `Product` with `AggregateRating` and `Offer`
- Validate all schema with [Google's Rich Results Test](https://search.google.com/test/rich-results)

### Hreflang & Internationalisation
- If the site targets multiple languages or regions, implement `hreflang` tags on every page
- Include a self-referencing `hreflang` tag
- Use `x-default` for the fallback/global version

---

## 3. EEAT — EXPERIENCE, EXPERTISE, AUTHORITATIVENESS, TRUSTWORTHINESS

Google's Quality Rater Guidelines place high weight on EEAT signals. Apply these to every site:

### Experience
- Include **first-hand experience** signals: case studies, testimonials, portfolio work, project photos
- Show dates on content to signal freshness and lived experience

### Expertise
- Add **author bios** with credentials on all blog posts and editorial content
- Link author names to a dedicated author page listing their qualifications and other articles
- Cite credible, authoritative sources with outbound links (opens in `_blank` with `rel="noopener"`)

### Authoritativeness
- Build a consistent **brand presence** across the web (Google Business Profile, LinkedIn, industry directories)
- Earn backlinks from relevant, high-authority domains — internal quality > quantity
- Maintain a **content hub / topical authority** structure: cover a topic comprehensively before expanding to adjacent topics

### Trustworthiness
- Include a visible **Privacy Policy**, **Terms of Service**, and **Cookie Policy** (especially for GDPR/POPIA compliance)
- Display **contact information** clearly: phone, email, physical address if applicable
- Use **trust signals**: security badges, certifications, media mentions, professional affiliations
- Keep content **accurate and up to date** — audit and refresh annually at minimum

---

## 4. GEO — GENERATIVE ENGINE OPTIMISATION (AI SEARCH)

Optimise for AI-powered search surfaces (Google AI Overviews, Perplexity, ChatGPT Search, Copilot):

- Write in a **direct, declarative style** — AI engines prefer content that answers questions immediately
- Use **definition-first paragraph structure**: state the key fact or answer in the first sentence, then elaborate
- Include **clearly labelled lists, tables, and summaries** — these are frequently cited in AI-generated answers
- Add a **"Key Takeaways"** or **"Summary"** section at the top or bottom of long-form content
- Mark up FAQ content with `FAQPage` schema — AI engines use this to extract Q&A pairs
- Ensure **entity clarity**: name your brand, people, services, and locations consistently and explicitly — AI engines build knowledge graphs from entity mentions
- Use `speakable` schema on summary sections for voice/AI snippet eligibility

---

## 5. LOCAL SEO (if applicable)

- Create and verify a **Google Business Profile** — keep NAP (Name, Address, Phone) consistent everywhere
- Embed a **Google Map** on the contact page
- Add `LocalBusiness` JSON-LD schema with `geo`, `address`, and `openingHours`
- Build consistent **local citations** in relevant directories (industry-specific + general)
- Include the city/region in the `<title>`, `<h1>`, and first paragraph of location pages

---

## 6. CONTENT WORKFLOW

When asked to create or optimise content:

1. **Check `/content`** — review existing content to avoid duplication and identify internal linking opportunities
2. **Determine search intent** — classify the target keyword as informational, navigational, transactional, or commercial
3. **Run competitor analysis** — use `SerpAPI` to review the top 5 ranking pages for target keyword: note their word count, heading structure, featured snippets, and schema usage
4. **Draft the content** following all rules in Section 1 above
5. **Add schema markup** appropriate to the content type (Section 2)
6. **Apply EEAT signals** relevant to the page (Section 3)
7. **Optimise for GEO** — ensure the content is AI-citation-ready (Section 4)
8. **Final QA checklist** before publishing:
   - [ ] Title tag ≤ 60 chars, unique, keyword-first
   - [ ] Meta description ≤ 150 chars, unique, has CTA
   - [ ] One `<h1>`, logical heading hierarchy
   - [ ] Primary keyword in first 100 words
   - [ ] Canonical tag set
   - [ ] All images have alt text, are WebP, and have explicit dimensions
   - [ ] JSON-LD schema present and validated
   - [ ] At least 3 internal links with descriptive anchors
   - [ ] Page passes Core Web Vitals (LCP, INP, CLS)
   - [ ] Page is mobile-friendly
   - [ ] HTTPS with no mixed content

---

## 7. SEO COMMAND REFERENCE

Use these slash commands during the project build:

| Command | Purpose |
|---|---|
| `/seo:audit-page [file]` | On-page SEO + EEAT audit for a specific page |
| `/seo:audit-domain` | Full domain authority and backlink profile audit |
| `/seo:check-technical` | Technical SEO health check (crawl, speed, schema) |
| `/seo:write-content [topic]` | Draft SEO + GEO optimised content for a keyword |
| `/seo:keyword-research [topic]` | Keyword discovery, intent classification, and clustering |
| `/seo:optimize-meta` | Batch-generate or improve title tags and meta descriptions |
| `/seo:generate-schema [file]` | Generate and inject JSON-LD structured data |
| `/seo:report` | Produce a full SEO performance report |
| `/seo:setup-alert` | Configure monitoring alerts for rank changes or errors |

---

*This file governs all SEO-related behaviour for Claude Code in this project. Update it as the project evolves.*
