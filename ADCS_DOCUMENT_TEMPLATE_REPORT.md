# ADCS Business Document & Printable Template Report

All system-generated business slips, receipts, GST invoices, quotations, work orders, job cards, and letterheads were migrated away from plain `.txt` downloads to branded, A4 print/PDF-ready HTML documents powered by `printBrandedADCSDocument` (`src/utils/documentBranding.ts`) and `<DocumentHeader />` / `<BrandFooter />`.

---

## 1. Centralized Document Engine (`src/utils/documentBranding.ts` & `DocumentHeader.tsx`)

- **`<DocumentHeader />`:** Renders `<ADCSLogo variant="document" />`, `AKUL DRAVIN DIGITAL SERVICES`, tagline `HAR KAAM DIGITAL • HAR SAMADHAAN EK JAGAH`, corporate address, GSTIN & CIN metadata, document type badge, serial number, issue date, center/branch identifier, and `<ADCSQrCode />`.
- **`printBrandedADCSDocument(opts)`:** Opens an isolated A4 print window referencing `${origin}/branding/adcs-logo-certificate.png`, tabular Key/Value records, payment summary block (Base, GST/Fee, Total, Payment Status), notes, verification QR/link, and disclaimer ready for Print / Save as PDF.
- **`@media print` Global Rules (`src/styles/global-styles.css`):** Sets `@page { size: A4; margin: 12mm; }`, hides navigation/sidebars/buttons (`.adcs-no-print`, `header`, `footer`, `nav`, `.mobile-bottom-nav`, `.role-switcher-bar`), and enforces exact background/border color output (`print-color-adjust: exact`).

---

## 2. Upgraded Document Producers Across Application

| Area | Upgraded Files | Document Types Covered |
| :--- | :--- | :--- |
| **Document Studio & Hub** | `LetterGenerator.tsx`, `DocumentCenterPage.tsx`, `TrackPage.tsx` | Official ADCS Letterheads, Correspondence, Document Receipts, Application Tracking Slips |
| **CSC & Citizen Seva** | `CSCMainPortalPage.tsx`, `DigitalSevaPortal.tsx`, `PANApplicationEngine.tsx`, `GovernmentServicesPage.tsx` | VLE Registration Slips, Seva Acknowledgements (`.csv` bulk ledger preserved; individual slips render branded A4 HTML/PDF), Assisted PAN Form 49A Slips |
| **Checkout & Billing** | `UnifiedCartModal.tsx`, `ServiceApplicationModal.tsx`, `ERPPage.tsx`, `PricingPage.tsx`, `FinancePortal.tsx` | Service Order Receipts, GST Tax Invoices, Quotations, Settlement Statements |
| **All Role Portals** | `CustomerPortal.tsx`, `CyberCafeOperatorPortal.tsx`, `DigitalCenterPortal.tsx`, `TechnicianPortal.tsx`, `FranchisePortal.tsx`, `DistributorPortal.tsx`, `PartnerPortal.tsx`, `EmployeePortal.tsx`, `AdvocatePortal.tsx`, `AffiliatePortal.tsx` | Cyber Café Print/POS Bills, Kendra Job Cards, Technician Field Service Reports, Franchise Onboarding/Agreement Summaries, Commission & Payout Vouchers, Case Intake Slips |
| **16 Vertical Sectors** | `RentalManagementPage.tsx`, `UtilityBillsPage.tsx`, `CourierPage.tsx`, `CyberCafePage.tsx`, `CCTVPage.tsx`, `ConstructionPage.tsx`, `FinanceLoansPage.tsx`, `FranchisePage.tsx`, `InsurancePage.tsx`, `PropertyPage.tsx`, `TravelPage.tsx`, `CRMPage.tsx` | Rent Agreements/Invoices, Utility Bill Receipts, Courier Waybills, CCTV & Construction BoQ Quotations, Loan/Insurance Summaries, Travel Bookings, CRM Export Slips |
