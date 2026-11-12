# ADCS Enterprise Design System Architecture

The ADCS frontend (`src/`) consumes a layered, CSS-custom-property-driven Design System imported globally via `src/index.css`.

---

## 1. Core Stylesheet Stack (`src/styles/`)

| File | Responsibility |
| :--- | :--- |
| `src/styles/brand-tokens.css` | `:root` tokens for colors, status badges (`--adcs-success`, `--adcs-warning`, `--adcs-danger`, `--adcs-info`), typography families, spacing scale (`4px` to `64px`), radii (`4px` to `9999px`), shadows, focus ring, transitions, and legacy variable aliases (`--navy-dark`, `--royal-blue`, etc.). |
| `src/styles/theme.css` | Light/Dark theme switcher definitions (`[data-theme='dark']`, `.adcs-theme-dark`), `.adcs-surface-navy`, `.adcs-surface-light`, `.adcs-surface-soft`, and adaptive `.adcs-gold-accent-text` rules. |
| `src/styles/global-styles.css` | Box model reset, base HTML/body rules (`overflow-x: hidden`), accessible `:focus-visible` outlines, `.adcs-skip-link` skip-navigation anchor, custom scrollbar styling, `@media (prefers-reduced-motion: reduce)` safeguards, and `@media print` A4 formatting rules (`@page { size: A4; margin: 12mm; }`). |
| `src/styles/design-system.css` | Reusable UI component primitives, grid helpers (`.container-wide`, `.hero-grid`, `.grid-4`), buttons (`.btn-primary`, `.btn-secondary`, `.btn-gold`, `.btn-outline-light`), `.card` / `.adcs-card-interactive`, `.badge-pill` / `.badge-green`, `.input` states, `.table-container` / `.adcs-table`, modal shells, and responsive tablet (`<= 1024px`) / mobile (`<= 768px`) overrides. |

---

## 2. Reusable Branding Component Suite (`src/components/branding/`)

Exported cleanly via `src/components/branding/index.ts`:

| Component | File | Key Props & Features |
| :--- | :--- | :--- |
| `<ADCSLogo />` | `ADCSLogo.tsx` | Supports `variant`: `'full' \| 'compact' \| 'icon' \| 'header' \| 'footer' \| 'document' \| 'certificate' \| 'print' \| 'dark' \| 'light' \| 'login' \| 'splash'`, `theme`, `height`, `width`, `customSrc`, `decorative`. Uses `loading="eager"` and fallback handling so footer and print images always complete cleanly. |
| `<BrandHeader />` | `BrandShells.tsx` | Light/dark enterprise header banner pairing `<ADCSLogo />`, title, slogan subtitle, and optional `rightSlot`. |
| `<BrandFooter />` | `BrandShells.tsx` | Branded enterprise document/portal footer showing legal entity, GSTIN, support phone, email, and trust registry notice. |
| `<BrandWatermark />` | `BrandShells.tsx` | Centered low-opacity (`0.04`–`0.045`) decorative ADCS emblem watermark (`aria-hidden="true"`, `pointer-events: none`). |
| `<ADCSQrCode />` | `BrandShells.tsx` | Deterministic 21×21 SVG QR matrix encoding certificate/document verification strings with `7×7` finder patterns (`#061A36` modules on `#FFFFFF` card) so QR verification codes render sharply at any zoom or PDF DPI. |
| `<DocumentHeader />` | `DocumentHeader.tsx` | Standardized print/PDF letterhead banner with logo, legal address, GSTIN/CIN metadata row, document type pill, document serial number, issue date, center/branch tag, and QR verification code. |
| `<CertificateBranding />` | `CertificateBranding.tsx` | Complete A4 landscape/portrait certificate sheet with `#061A36` double border, `#D6A12B` inner outline, `#F3D477` accents, `<BrandWatermark />`, `<ADCSLogo variant="certificate" />`, signatory block, `<ADCSQrCode />`, SHA-256 checksum, version badge (`v1`, `v2`, etc.), reissue audit metadata panel, and credential-type authenticity disclaimer. |

---

## 3. Navigation, Dark Mode & Permission Isolation

- **Global Top Bar (`RoleSwitcherBar.tsx`)**: Quick workspace switcher with permission-aware role visibility, live wallet display, Light/Dark (`data-theme`) toggle backed by `localStorage.getItem('adcs_theme')`, and EN/HI switcher.
- **Primary Navbar (`GlassNavbar.tsx`)**: Integrates `<ADCSLogo variant="header" />`, 16-sector mega menu, responsive mobile drawer, Command Search (`⌘K`), QUANTUM AI modal trigger, Cart badge, Workspace CTA, and Login button. Zero horizontal overflow verified down to `375px`.
- **Permission-Aware Guest Experience**: Both `GlassNavbar.tsx` and `Footer.tsx` exclude staff/admin/finance links (`Super Admin`, `Finance Clearing`, `Executive`, `Employee`) from unauthenticated guest views.
- **Mobile Navigation (`MobileBottomNav.tsx`)**: Persistent thumb-accessible 5-action mobile bar (`Home`, `Services`, `Track`, `QUANTUM AI`, `Portal`).
