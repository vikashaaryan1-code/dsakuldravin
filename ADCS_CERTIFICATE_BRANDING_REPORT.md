# ADCS Certificate Branding & Cryptographic Integrity Report

**Standardized Architecture:** `CertificateBranding` (`src/components/branding/CertificateBranding.tsx`), `computeDocumentHash` (`src/utils/documentBranding.ts`), and Adobe Acrobat generator (`scripts/generate_acrobat_pdf.cjs`).

---

## 1. Mandatory ADCS Certificate Design Elements

Every ADCS-issued credential rendered via `<CertificateBranding />` enforces:
- **Official ADCS Logo:** `<ADCSLogo variant="certificate" />` backed by `public/branding/adcs-logo-certificate.png` (651,440 bytes).
- **Color & Surface Architecture:** `#FFFFFF` paper canvas, `#061A36` deep navy typography and `10px double` frame, `#D6A12B` metallic gold `3px` inner outline rule, `#F3D477` section dividers, and subtle `#075ACB` royal blue accents.
- **Anti-Forgery & Watermark Layer:** `<BrandWatermark opacity={0.04} />` centered behind foreground copy.
- **Complete Credential Metadata:** Organization name, certificate title, unique serial ID (`ADCS-ACAD-...` / credential code), recipient name, course/achievement details, issue date, optional score/grade, approved signatory name & designation (`ADCS_APPROVED_SIGNATORIES`), crisp SVG `<ADCSQrCode />` encoding the verification URL, and SHA-256 document hash (`computeDocumentHash`).
- **Explicit Authenticity Boundary:** Renders a mandatory credential-type declaration clearly distinguishing ADCS private enterprise & academic certificates from statutory government degrees unless explicitly counter-certified.

---

## 2. Updated Certificate Flows & Templates

| Module / Page | Integration Details |
| :--- | :--- |
| `src/components/branding/CertificateBranding.tsx` | Reusable A4 landscape (`1040px`) and portrait (`760px`) React certificate renderer with reissue audit box. |
| `src/pages/AcademyCertificateVerificationPage.tsx` | Renders public registry verification result inside `<CertificateBranding />` (verified visually in Chrome CDP `/verify-certificate` and exported to PDF). |
| `src/pages/portals/StudentPortal.tsx` | Student earned certificates preview & print using `<CertificateBranding />` and branded print flow. |
| `src/pages/documents/CertificateStudio.tsx` | Editable studio supporting Academy completion, Vocational skill, Participation, Internship, and Experience certificates with controlled reissue versioning and SHA-256 recomputation. |
| `src/components/astrology/KundliPrintCertificate.tsx` | Vedic horoscope certificate integrates `<ADCSLogo variant="certificate" />` and `<BrandWatermark />`. |
| `src/pages/astrology/AstroCertificatePage.tsx` | Interactive Vedic Birth Chart & Gemstone Lab Certificate verification desk (`/astrology/certificate`). |
| `scripts/generate_acrobat_pdf.cjs` | Generates Adobe Acrobat-compatible `%PDF-1.4` `Vedic_Janam_Kundli_Certificate.pdf` and `AD_DIGITAL_Website_Audit_Deployment_Report.pdf` updated with ADCS branding. |

---

## 3. Immutable Issue Record & Reissue Protocol

- **No Silent Overwriting:** Existing `v1` issued certificates preserve their original issue timestamp, issuer identity, and verification QR reference inside `AppContext` (`CertificateRecord` + `reissueHistory`).
- **Controlled Versioning:** Reissuing a certificate increments `versionNumber` (`v2+`), records `reason`, `reissuedBy`, `reissuedAt`, and `originalIssueDate` in `reissueMeta`, and recomputes the deterministic SHA-256 checksum via `computeDocumentHash`.
- **Government Document Protection:** Government-issued source documents (Aadhaar, PAN, Passport, third-party marksheets) are never overlaid or modified with ADCS watermarks/logos.
