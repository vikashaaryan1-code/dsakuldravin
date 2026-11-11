# AKUL DRAVIN DIGITAL SERVICES (ADCS) • UNIVERSAL SERVICE CATALOG RESEARCH
**Platform:** ADCS Digital Super Platform  
**Document Code:** ADCS-DOC-CATALOG-2026-V1  
**Last Verified Date:** 11 November 2026  
**Regulatory Baseline:** IT Act 2000, DPDP Act 2025, MCA SPICe+, UIDAI L1, IRDAI Web Aggregator Rules, RBI Digital Lending Directions 2025

---

## 1. Catalog Architecture & Unified Field Specification

Every service in the ADCS Super Platform is managed dynamically through a centralized, database-driven catalog schema:

```typescript
export interface UniversalServiceRecord {
  service_code: string;           // E.g., 'SRV-GOV-PAN-49A'
  sector_id: string;              // Sector code (1 to 16)
  service_name: string;           // English title
  service_name_hi: string;        // Hindi title
  description: string;            // Functional scope
  category: string;               // High-level category
  applicable_states: string[];    // Array of state codes or ['ALL_INDIA']
  applicant_types: string[];      // ['INDIVIDUAL', 'HUf', 'COMPANY', 'FIRM', 'TRUST', 'MINOR']
  eligibility_rules: string[];    // Statutory eligibility conditions
  required_documents: string[];   // Mandatory proof items
  optional_documents: string[];   // Supplementary documents
  conditional_documents: string[];// Documents required under specific conditions
  form_schema: Record<string, any>; // JSON-Schema dynamic form definitions
  official_fee: number;           // Actual statutory government fee (₹)
  adcs_fee: number;               // ADCS assisted facilitation fee (₹)
  processing_estimate: string;    // Realistic turnaround time (SLA)
  official_url: string;           // Authoritative government/provider URL
  provider_id: string;            // Authorized upstream entity (Protean, UTIITSL, UIDAI, etc.)
  integration_mode: 'api_native' | 'official_sso_deeplink' | 'assisted_manual';
  consent_required: boolean;      // DPDP Purpose-limitation consent
  terms_version: string;          // Terms & conditions revision code
  status: 'active' | 'maintenance' | 'deprecated';
  last_verified_at: string;       // ISO 8601 statutory verification timestamp
}
```

---

## 2. Comprehensive 16-Sector Service Specifications

### Sector 01: Government & Citizen Services (G2C)
#### Service 1.1: New PAN Card (Form 49A / 49AA)
- **service_code:** `SRV-GOV-PAN-NEW`
- **sector_id:** `SEC-01-GOV`
- **service_name:** New PAN Card Application / Correction
- **service_name_hi:** नया पैन कार्ड आवेदन एवं सुधार सहायता
- **category:** Identity & Taxation
- **applicable_states:** `['ALL_INDIA']`
- **applicant_types:** `['INDIVIDUAL', 'MINOR', 'HUF', 'COMPANY']`
- **eligibility_rules:** Indian citizen or entity without existing PAN; minors require parent/guardian authorization.
- **required_documents:** Aadhaar Card with linked mobile, passport-size color photograph, specimen signature.
- **optional_documents:** Driving Licence, Voter ID Card, Bank Passbook with photo.
- **conditional_documents:** Minor's Birth Certificate and Father/Mother Aadhaar (if applicant age < 18).
- **official_fee:** ₹107.00 (Standard physical card delivery + e-PAN dispatch).
- **adcs_fee:** ₹92.00 (Assisted digital filing, scrutiny & tracking). Total: ₹199.00.
- **processing_estimate:** 3 - 7 Business Days (e-PAN dispatched within 48 hours).
- **official_url:** `https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html` / `https://www.pan.utiitsl.com/`
- **provider_id:** `Protean eGov Technologies & UTIITSL`
- **integration_mode:** `assisted_manual` & `official_sso_deeplink`
- **consent_required:** True
- **last_verified_at:** 2026-11-11T10:00:00Z

#### Service 1.2: Tatkal / Fresh Passport Appointment Assistance
- **service_code:** `SRV-GOV-PASS-FRESH`
- **sector_id:** `SEC-01-GOV`
- **service_name:** Fresh / Re-issue Passport Appointment & Slot Booking
- **service_name_hi:** नया / नवीनीकरण पासपोर्ट स्लॉट बुकिंग एवं फॉर्म सहायता
- **required_documents:** Aadhaar Card, 10th Standard Marksheet / Passing Certificate (for Non-ECR status), Current Address Proof.
- **official_fee:** ₹1,500.00 (Standard 36-page passport paid directly at Passport Seva).
- **adcs_fee:** ₹699.00 (Assisted document scrutiny, application filing & slot booking).
- **processing_estimate:** 2 - 4 Weeks (subject to police verification).
- **official_url:** `https://www.passportindia.gov.in/`
- **provider_id:** `Ministry of External Affairs (CPV Division)`
- **integration_mode:** `official_sso_deeplink`
- **consent_required:** True

#### Service 1.3: State e-District Income / Caste / Residence Certificate (RTPS Bihar)
- **service_code:** `SRV-GOV-EDIST-CERT`
- **sector_id:** `SEC-01-GOV`
- **service_name:** Bihar RTPS Income, Caste & Domicile Certificates
- **service_name_hi:** बिहार आरटीपीएस आय, जाति एवं निवास प्रमाण पत्र
- **required_documents:** Aadhaar Card, Swagoshna Patra (Self-Declaration), Land Revenue Receipt / Khatiyan copy.
- **official_fee:** ₹0.00 (Statutory state government service is completely free of charge).
- **adcs_fee:** ₹60.00 (Assisted documentation, Hindi typing, digital photo sizing & VLE scanning).
- **processing_estimate:** 10 - 14 Business Days (CO/SDM digital signature).
- **official_url:** `https://serviceonline.bihar.gov.in/`
- **provider_id:** `Bihar Administrative Reforms Society (ServicePlus)`
- **integration_mode:** `assisted_manual`
- **consent_required:** True

---

### Sector 02: Cyber Café & Online Workstation Services
- **service_code:** `SRV-CAFE-STATION-METER`
- **service_name:** High-Speed Secure PC Workstation Rental
- **service_name_hi:** हाई-स्पीड इंटरनेट पीसी वर्कस्टेशन सत्र
- **fee_model:** ₹30/hour (Metered in 15-minute increments).
- **features:** Hardware-locked browser sandbox, automatic session cleanup upon logout, high-speed fiber connectivity, print queue integration.

---

### Sector 03: Business Setup & Corporate Compliance
- **service_code:** `SRV-BIZ-PVT-LTD`
- **service_name:** Private Limited Company Incorporation (MCA SPICe+ Part A & B)
- **service_name_hi:** प्राइवेट लिमिटेड कंपनी निगमन (MCA SPICe+)
- **required_documents:** Director PAN, Aadhaar, Bank Statement (< 2 months old), Electricity Bill of Registered Office, Rent Agreement & NOC.
- **official_fee:** ₹1,000 - ₹2,000 (MCA ROC stamp duty depending on authorized capital and state).
- **adcs_fee:** ₹6,999.00 (Includes 2 DSCs, 2 DINs, Name Reservation, MOA/AOA drafting & PAN/TAN/EPFO/ESIC registration).
- **processing_estimate:** 5 - 7 Business Days.
- **official_url:** `https://www.mca.gov.in/content/mca/global/en/home.html`
- **integration_mode:** `assisted_manual`

---

### Sector 04: Document Studio & Cloud Vault
- **service_code:** `SRV-DOC-AFFIDAVIT-DRAFT`
- **service_name:** Bilingual Legal Affidavit & Agreement Drafting
- **service_name_hi:** कानूनी हलफनामा एवं अनुबंध प्रारूपण
- **features:** Notary-ready format, e-stamp integration, English to Hindi translation, PDF export with digital verification hash.

---

### Sector 05: Recharge & Bharat Bill Payment System (BBPS)
- **service_code:** `SRV-UTIL-BBPS-ELECTRICITY`
- **service_name:** Electricity, Water, Gas & Municipal Tax Payment
- **service_name_hi:** बिजली, जल, गैस एवं नगर निगम बिल भुगतान
- **integration_mode:** `api_native` (NPCI Bharat BillPay Switch).
- **receipt:** Instant BBPS Transaction Reference Number and stamped receipt.

---

### Sector 06: Travel & IRCTC Railway Ticketing Desk
- **service_code:** `SRV-TRV-IRCTC-TATKAL`
- **service_name:** Railway General & Tatkal Booking Assistance
- **service_name_hi:** भारतीय रेल सामान्य एवं तत्काल टिकट सहायता
- **compliance_rule:** Strictly compliant with Railway Board Circular 08/2025; passenger Aadhaar authentication enforced; zero automated CAPTCHA bypass.
- **official_url:** `https://www.irctc.co.in/` / `https://www.operations.irctc.co.in/AgentInterface/`

---

### Sector 07: Property Marketplace & RERA Due Diligence
- **service_code:** `SRV-PROP-TITLE-SEARCH`
- **service_name:** Land Records & Encumbrance Verification (Bihar Bhumi / Parimarjan)
- **service_name_hi:** भूमि अभिलेख एवं जमाबंदी ऑनलाइन सत्यापन (बिहार भूमि)
- **official_url:** `https://biharbhumi.bihar.gov.in/`

---

### Sector 08: Rental Lifecycle & Tenancy Agreements
- **service_code:** `SRV-RENT-AGREEMENT-STAMP`
- **service_name:** E-Stamped Rental Agreement & Police Verification
- **service_name_hi:** ई-स्टैम्प्ड किराया अनुबंध एवं पुलिस सत्यापन सहायता
- **deliverables:** 11-month lease deed, digital signature, tenant verification docket.

---

### Sector 09: Construction & Architectural Estimation
- **service_code:** `SRV-CONST-BOQ-CALC`
- **service_name:** 2D Floor Plan & Construction BOQ Estimator
- **service_name_hi:** 2D नक्शा एवं निर्माण सामग्री आकलन (BOQ)
- **engine:** Dynamic structural material estimation (Cement, TMT Steel, Sand, Coarse Aggregate, Bricks, Labor).

---

### Sector 10: CCTV & Smart Surveillance Systems
- **service_code:** `SRV-CCTV-4CH-HD`
- **service_name:** 4-Channel HD Night Vision Surveillance Kit & Installation
- **service_name_hi:** 4-कैमरा नाइट विजन सीसीटीवी एवं मोबाइल व्यूइंग सेटअप
- **hardware:** 2MP HD IR Dome/Bullet Cameras, 4CH DVR, 1TB Surveillance HDD, SMPS, 90m Copper Cable, Onsite Setup.

---

### Sector 11: Logistics, Courier & Air Express Freight
- **service_code:** `SRV-LOG-EXPRESS-AWB`
- **service_name:** Domestic Doorstep Parcel Pickup & Air Express Courier
- **service_name_hi:** कूरियर एवं पार्सल लॉजिस्टिक्स (एयर/सरफेस)
- **partners:** India Post Speed Post, Blue Dart Express, Delhivery, DTDC.
- **formula:** IATA volumetric chargeable weight: `(L cm x W cm x H cm) / 5000`.

---

### Sector 12: Finance & Multi-Bank Loan Marketplace
- **service_code:** `SRV-FIN-MSME-LOAN`
- **service_name:** Collateral-Free MSME Business Loan & Mudra Assistance
- **service_name_hi:** एमएसएमई व्यापार ऋण एवं मुद्रा योजना सहायता
- **compliance_notice:** In strict compliance with RBI Digital Lending Directions 2025; ADCS operates strictly as a Lending Service Provider (LSP) and technology facilitator; final appraisal belongs to regulated lenders.

---

### Sector 13: Insurance Marketplace & Mediclaim
- **service_code:** `SRV-INS-HEALTH-SUPER`
- **service_name:** Comprehensive Family Health Mediclaim & Cashless Hospitalization
- **service_name_hi:** पारिवारिक स्वास्थ्य बीमा एवं कैशलेस अस्पताल नेटवर्क
- **solicitation_disclosure:** Insurance products are solicited and serviced exclusively through IRDAI-licensed partners.

---

### Sector 14: IT, Cloud, Web & Software Development
- **service_code:** `SRV-IT-WEB-BUSINESS`
- **service_name:** Custom Business Website, Domain & SSL Hosting
- **service_name_hi:** व्यावसायिक वेबसाइट निर्माण, डोमेन एवं क्लाउड होस्टिंग

---

### Sector 15: Professional Consulting & Legal Desk
- **service_code:** `SRV-LEG-ADVOCATE-CONSULT`
- **service_name:** High Court Advocate Legal Consultation
- **service_name_hi:** पटना उच्च न्यायालय नामांकित अधिवक्ता कानूनी परामर्श
- **compliance_rule:** Strictly compliant with Bar Council of India (BCI) Rule 36; confidential intake docket and WebRTC end-to-end encrypted room.

---

### Sector 16: ADCS Academy LMS & Vocational Certification
- **service_code:** `SRV-ACAD-AI-MASTERY`
- **service_name:** CRS-AI-101: AI Mastery & Prompt Engineering Certification
- **service_name_hi:** एआई मास्टरी एवं प्रॉम्प्ट इंजीनियरिंग वोकेशनल कोर्स
- **certification:** Verifiable vocational credential with cryptographic SHA-256 seal and QR verification portal.
