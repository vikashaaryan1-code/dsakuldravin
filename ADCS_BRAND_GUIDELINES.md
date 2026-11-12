# ADCS Brand Guidelines

**Organization:** AKUL DRAVIN DIGITAL SERVICES  
**Short Name:** ADCS  
**Division:** AKUL DRAVIN GROUP OF ENTERPRISES  
**Official Slogan:** HAR KAAM DIGITAL • HAR SAMADHAAN EK JAGAH (`हर काम डिजिटल • हर समाधान एक जगह`)  
**Hero Positioning:** One Platform. Every Service.

---

## 1. Master Brand Identity & Logo Integrity

The single source of truth for the ADCS visual identity is the official master logo artwork stored verbatim at:
- `public/branding/adcs-logo-original.jpg` (Master archival original)
- `public/branding/adcs-logo-master.png` (Transparent-background high-resolution master PNG)

### Non-Negotiable Rules
1. **No Redrawing or AI Recreation:** All web, portal, mobile, document, and certificate surfaces must render the derived variants of the official artwork via `<ADCSLogo />` (`src/components/branding/ADCSLogo.tsx`) or `ADCS_LOGO_ASSETS` (`src/config/brandAssets.ts`).
2. **No Distortion:** Never stretch horizontally or vertically; always preserve `object-fit: contain`.
3. **Complete Artwork Preservation:** Never crop out essential emblem, wordmark, or tagline geometry on `full`, `light`, `dark`, `header`, `footer`, `certificate`, or `login` variants. Only `compact` / `icon` / favicons isolate the emblem mark cleanly for constrained spaces.
4. **White-Label Override Governance:** Authorized Super Admins may preview temporary white-label overrides in `SuperAdminPortal.tsx` and `/api/admin/whitelabel`, backed by persistent reset back to official `ADCS_LOGO_ASSETS`.

---

## 2. Official Brand Color Palette

All colors are centrally defined in `src/styles/brand-tokens.css` and `ADCS_COLORS` (`src/config/brandAssets.ts`).

| Role | Token | Hex Value | Approved Usage |
| :--- | :--- | :--- | :--- |
| **Royal Blue** | `--adcs-primary` | `#075ACB` | Primary buttons, active navigation states, links, focus borders, selected tabs |
| **Royal Blue Hover** | `--adcs-primary-hover` | `#064BA8` | Interactive hover/pressed state for primary buttons and links |
| **Electric Blue** | `--adcs-blue-light` | `#0878F9` | Highlight glyphs, WCAG keyboard focus rings, dark-mode stat values |
| **Deep Navy** | `--adcs-navy` | `#061A36` | Hero backgrounds, dark theme surfaces, executive headers, typography |
| **Midnight Navy** | `--adcs-navy-deep` | `#031126` | Footer, dark-mode canvas `--adcs-background`, top bar & deep surfaces |
| **Metallic Gold** | `--adcs-gold` | `#D6A12B` | Ornamental certificate outlines, premium highlights, borders, achievement rules |
| **Champagne Gold** | `--adcs-gold-light` | `#F3D477` | Hero gold headline accents, dark-surface gold text (`>= 4.5:1` on Navy) |
| **Accessible Gold Text** | `--adcs-gold-dark` | `#946809` | High-contrast gold label accents on light/white surfaces (light mode only) |
| **Premium White** | `--adcs-surface` | `#FFFFFF` | Light cards, forms, data tables, A4 printable certificates & documents |
| **Soft Background** | `--adcs-background` | `#F5F8FC` | Light application canvas & document table header fills |
| **Text Primary** | `--adcs-text` | `#14243A` | Primary body copy and headings in light mode |
| **Accessible Slate** | `--adcs-muted` | `#55677D` | Muted subtitles and metadata (`>= 4.5:1` WCAG 2.2 AA contrast) |
| **Neutral Slate** | `neutralSlate` | `#64748B` | Secondary palette constant in `brandAssets.ts` |
| **Border Subtle** | `--adcs-border` | `#DCE4EF` | Card dividers, form borders, table gridlines |

### Contrast & Restraint Rules
- Metallic Gold (`#D6A12B`) is **prohibited** for small body text on `#FFFFFF` or `#F5F8FC`. Use `#061A36`, `#14243A`, `#075ACB`, or `--adcs-gold-dark` (`#946809`) via `.adcs-gold-accent-text`.
- Avoid unrestrained gradients, neon glows, or decorative animations that impair legibility or violate `prefers-reduced-motion`.

---

## 3. Typography & Voice

- **Display / Headings (`--adcs-font-display`):** `'Outfit', 'Plus Jakarta Sans', 'Noto Sans Devanagari', sans-serif`
- **Body / UI (`--adcs-font-sans`):** `'Plus Jakarta Sans', 'Inter', 'Noto Sans Devanagari', -apple-system, BlinkMacSystemFont, sans-serif`
- **Monospace IDs & Hashes (`--adcs-font-mono`):** `'JetBrains Mono', 'Fira Code', ui-monospace, SFMono-Regular, monospace`
- **Factual Honesty Standard:** Never publish fabricated citizen metrics, fake VLE counts, unverified SLA uptime percentages, unverified revenue figures, or unverified third-party certification claims (such as `ISO`) on marketing pages or portals.

---

## 4. Document & Third-Party Boundary

- **ADCS Branding Allowed On:** Academy completion/skill certificates, vocational/internship credentials, ADCS official receipts, GST invoices, tax slips, quotations, letterheads, CSC Seva slips, PAN assisted-service acknowledgement slips, and customer work orders/job cards.
- **Strictly Prohibited:** Never stamp or overlay the ADCS logo over government-issued source identity documents (Aadhaar cards, PAN cards, Passports, driving licenses, third-party bank certificates, or statutory examination boards). Assisted citizen outputs must explicitly state that they are assisted-service acknowledgements or ADCS private credentials.
