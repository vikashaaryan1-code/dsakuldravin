# ADCS Multi-Viewport Visual Regression & Print PDF Report

**Verification Method:** Headless Google Chrome (`--headless=new`) driven over Chrome DevTools Protocol (CDP) against live Vite frontend (`http://localhost:3000`) and Express API (`http://localhost:5000`).  
**Script:** `verify_cdp.mjs` (final run executed after all UI/CSS/Navbar edits).

---

## 1. Responsive Homepage & Logo Integrity Results

| Viewport | Dimensions | `scrollWidth` vs `innerWidth` | Horizontal Overflow | `<img>` Broken Count | Hero Copy Verified | Guest Admin Leak |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Desktop** | `1440 × 900` | `1432 / 1440` | `false` (`overflowEls: []`) | `0` (`imgCount: 4`) | Yes (`AKUL DRAVIN DIGITAL SERVICES` & `HAR KAAM DIGITAL`) | None (`false`) |
| **Tablet** | `768 × 1024` | `760 / 768` | `false` (`overflowEls: []`) | `0` (`imgCount: 4`) | Yes | None (`false`) |
| **Mobile** | `375 × 812` | `375 / 375` | `false` (`overflowEls: []`) | `0` (`imgCount: 4`) | Yes | None (`false`) |

### Visual Findings Caught & Fixed During CDP Testing
1. **Footer Image Lazy-Loading:** Footer `<ADCSLogo />` initially showed `complete: false` until scrolled; updated `ADCSLogo.tsx` to `loading="eager"` so every page finishes with zero incomplete images immediately on load.
2. **Mobile 375px Horizontal Overflow:** Found initial overflow from an inline 2-column hero grid (`scrollWidth: 474`) and subsequently right-side `GlassNavbar` `⌘K` / desktop actions (`scrollWidth: 403`). Moved hero layout to responsive `.hero-grid` in `design-system.css` and applied `.hide-mobile` cleanly on desktop shortcuts in `GlassNavbar.tsx` -> verified `scrollWidth: 375` (`overflow: false`).
3. **Dark Mode Pulse Counter Contrast:** Visual screenshot inspection of `home_dark.png` revealed low contrast on `MASTER SECTORS` (`#075ACB`) and `CATALOG SERVICES` (`#061A36`) on `#061A36` surfaces. Switched counters in `HomePage.tsx` to `--adcs-blue-light`, `--adcs-text`, `--adcs-success` (`#34D399` in dark mode), and `.adcs-gold-accent-text` (`#F3D477` in dark mode), and re-verified `home_dark.png` visually (`dataTheme: "dark"`, `bodyBg: "rgb(3, 17, 38)"`).

---

## 2. 25-Route SPA Sweep & Runtime Diagnostics

All 25 routes audited under CDP (`/`, `/services`, `/government`, `/business`, `/login`, `/documents`, `/verify-certificate`, `/astrology`, `/astrology/certificate`, `/portal/customer`, `/digitalseva`, `/portal/cyber-cafe`, `/portal/franchise`, `/portal/distributor`, `/portal/affiliate`, `/portal/executive`, `/portal/partner`, `/portal/advocate`, `/portal/instructor`, `/portal/student`, `/portal/technician`, `/finance-portal`, `/portal/employee`, `/portal/admin`, `/erp`):
- **Broken Images (`broken`):** `0` across every route
- **Horizontal Overflow (`overflow`):** `false` across all 25 routes
- **Console Errors (`consoleErrors`):** `[]` (0)
- **Uncaught Exceptions (`pageExceptions`):** `[]` (0)
- **Failed Static / Branding Network Requests (`failedNetwork`):** `[]` (0)
- **Favicon Verified:** `/branding/favicon.ico`

---

## 3. Sample A4 PDFs Generated & Inspected

### Chrome `Page.printToPDF` Outputs
- `sample_academy_certificate_A4.pdf` — `1,574,903` bytes (A4 Landscape, crisp vector text, SVG QR code, official ADCS certificate seal & SHA-256 hash)
- `sample_astrology_certificate_A4.pdf` — `2,391,963` bytes (A4 Vedic Kundli / Gemstone Certificate preview)
- `sample_official_letterhead_A4.pdf` — `1,745,464` bytes (A4 Enterprise Letterhead & Documents hub)

### Node Adobe Acrobat `%PDF-1.4` Script (`scripts/generate_acrobat_pdf.cjs`)
- `Vedic_Janam_Kundli_Certificate.pdf` — generated with exit code `0`
- `AD_DIGITAL_Website_Audit_Deployment_Report.pdf` — generated with exit code `0`
