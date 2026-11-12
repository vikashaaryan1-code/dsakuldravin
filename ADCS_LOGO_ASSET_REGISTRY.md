# ADCS Logo Asset Registry

All logo files reside in `public/branding/` (plus root mirror `public/favicon.ico`) and are indexed canonically in `src/config/brandAssets.ts` (`ADCS_LOGO_ASSETS`).

---

## 1. Master Artwork & Derived Variants Inventory

Exact on-disk files verified in `public/branding/`:

| Asset Constant (`ADCS_LOGO_ASSETS`) | Public Path | Byte Size | Intended Usage & Variants |
| :--- | :--- | ---: | :--- |
| `originalJpg` | `/branding/adcs-logo-original.jpg` | 246,898 | Archival unmodified source artwork copy |
| `master` | `/branding/adcs-logo-master.png` | 736,948 | High-res transparent PNG (`full` default) |
| `light` | `/branding/adcs-logo-light.png` | 740,560 | Optimized contrast on white/light surfaces (`#FFFFFF`, `#F5F8FC`) |
| `dark` | `/branding/adcs-logo-dark.png` | 742,441 | Optimized light wordmark visibility on Navy/Dark (`#061A36`, `#031126`) |
| `emblem` | `/branding/adcs-logo-emblem.png` | 204,691 | Compact AD + orbiting node emblem (`compact`, `icon`, watermarks) |
| `header` | `/branding/adcs-logo-header.png` | 294,469 | Web navbar horizontal/header sizing (`header`) |
| `footer` | `/branding/adcs-logo-footer.png` | 297,415 | Global dark footer slot (`footer`) |
| `certificate` | `/branding/adcs-logo-certificate.png` | 651,440 | High-DPI print artwork (`certificate`, `document`, `print`) |
| `login` | `/branding/adcs-logo-login.png` | 448,556 | Auth, CSC Connect SSO, and portal onboarding (`login`, `splash`) |
| `favicon32` | `/branding/adcs-favicon-32.png` | 1,895 | Standard browser 32×32 PNG icon |
| `icon192` | `/branding/adcs-icon-192.png` | 29,354 | PWA Manifest 192×192 app icon |
| `icon512` | `/branding/adcs-icon-512.png` | 154,832 | PWA Manifest 512×512 maskable/app icon |
| `faviconIco` | `/branding/favicon.ico` | 12,702 | Multi-size Windows/browser `.ico` (also mirrored to `public/favicon.ico`) |

---

## 2. HTML & PWA Registration

- `index.html`: Sets title `AKUL DRAVIN DIGITAL SERVICES | हर काम डिजिटल • हर समाधान एक जगह | वैदिक ज्योतिष एवं डिजिटल सेवा`, binds `<link rel="icon" type="image/x-icon" href="/branding/favicon.ico" />`, Apple Touch Icon, and `<link rel="manifest" href="/manifest.json" />`.
- `public/manifest.json`: Configured with ADCS short/full names, theme color `#061A36`, background `#F5F8FC`, and `adcs-icon-192.png` + `adcs-icon-512.png`.

---

## 3. Centralized Mapping Rules (`ADCSLogo.tsx`)

- Light-background automatic routing: `'full' | 'light' | 'header' | 'document' | 'certificate' | 'print' | 'login' | 'splash'` map to white/light-optimized PNGs unless `theme === 'dark'` overrides `'header' | 'full' | 'login' | 'splash'` to `ADCS_LOGO_ASSETS.dark`.
- `'compact' | 'icon'` always resolve to `ADCS_LOGO_ASSETS.emblem`.
- Super Admin `whiteLabelConfig` (`customSrc` override from `AppContext`) cleanly falls back to `ADCS_LOGO_ASSETS.master` / variant asset if unset or on image error.
