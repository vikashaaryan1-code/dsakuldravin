# AKUL DRAVIN DIGITAL SERVICES (ADCS) • DOCUMENT REQUIREMENTS & COLLECTION MATRIX
**Document Reference:** ADCS-DOC-MATRIX-2026-V1  
**Target Specification:** Enterprise Universal Document Engine, OCR Scrutiny & Vault Architecture  
**Regulatory Framework:** Information Technology Act 2000, DPDP Act 2025 (Section 6 Purpose Limitation)

---

## 1. Dual Ingestion Architecture

Every application workflow in ADCS supports dual statutory document collection channels:

```text
                      [ CITIZEN INTAKE WORKFLOW ]
                                   │
         ┌─────────────────────────┴─────────────────────────┐
         ▼                                                   ▼
   [ OPTION A: DIRECT UPLOAD ]                   [ OPTION B: DIGILOCKER FETCH ]
   ├── Local File Picker (PDF, JPG, PNG)         ├── Approved API Partner Integration
   ├── Camera / Scanner Integration              ├── OAuth 2.0 User Consent Redirect
   ├── Client-side MIME & Size Validation        ├── Scope Selection (Aadhaar, Marks, DL)
   └── Cryptographic SHA-256 Hashing             └── Cryptographically Verified XML/PDF
         │                                                   │
         └─────────────────────────┬─────────────────────────┘
                                   ▼
                   [ QUANTUM AI SCRUTINY ENGINE ]
                   ├── Verhoeff Dihedral D5 Checksum (UIDAI)
                   ├── Tax Deduction PAN Format Validation
                   ├── OCR Field Extraction & Mismatch Alert
                   └── Human Review & Mandatory Confirmation
                                   ▼
                   [ ENCRYPTED CITIZEN VAULT ]
```

---

## 2. Ingestion Options Specification

### Option A: Direct Secure Upload
- **Supported Formats:** `application/pdf`, `image/jpeg`, `image/png`, `image/webp`.
- **File Constraints:** Min 50 KB (ensures OCR readability), Max 5 MB per file.
- **Bi-Directional Image Capture:** Dual front-side and reverse-side scanning for cards (Aadhaar, Driving Licence, Voter ID).
- **Client-Side Image Pre-Processing:** Automatic contrast optimization and rotation correction prior to transmission.
- **Integrity Validation:** SHA-256 hash computed immediately on upload; stored in immutable audit ledger to guarantee zero tampering.

### Option B: DigiLocker Consent Gateway
- **Regulatory Requirement:** Explicit consent record capturing timestamp, IP address, and applicant UID token under DPDP Rules 2025.
- **Allowed Document Scopes:** Class X Marksheet (for ECNR proof), Vehicle Registration Certificate (RC), Driving Licence, Domicile Certificate.
- **Aadhaar Vault Compliance:** Aadhaar XML masked to last 4 digits (`XXXXXXXX0019`); zero raw UID storage in unencrypted database fields.

---

## 3. Quantum AI Document Assistant & Scrutiny Engine

1. **Automated Optical Character Recognition (OCR):**
   - Extracts Applicant Full Name, Father's Name, Date of Birth (DOB), and Address.
   - Computes OCR confidence score (0 - 100%). Filings with confidence < 85% prompt manual re-upload.
2. **Mathematical Checksum Scrutiny:**
   - **Aadhaar UID:** Evaluated via Dihedral D5 Verhoeff permutation algorithm (`validateVerhoeff(uid)`). Immediate error flagged on single-digit entry errors.
   - **PAN Card:** Evaluated against statutory regex `[A-Z]{5}[0-9]{4}[A-Z]{1}` (4th character applicant entity type, 5th character applicant surname initial).
   - **GSTIN:** Evaluated against 15-character statutory alphanumeric format.
3. **Cross-Document Consistency Guard:**
   - Detects name spelling discrepancies between Aadhaar and secondary certificates (e.g. "Rakesh Kumar" vs "Rakesh K. Sharma").
   - Presents a **Human Confirmation Review Screen** where the applicant explicitly verifies or corrects mapped fields before statutory submission.

---

## 4. Encrypted Document Vault Organization

Every registered citizen and enterprise customer is provisioned a hierarchical, AES-256 encrypted storage vault:

```text
/customer_vault/{customer_uuid}/
├── 01_identity/
│   ├── aadhaar_masked_verified.pdf
│   └── pan_card_verified.pdf
├── 02_address_proof/
│   ├── electricity_bill_danapur.pdf
│   └── bank_passbook_attested.pdf
├── 03_educational/
│   ├── 10th_marksheet_bseb.pdf
│   └── graduation_degree_certificate.pdf
├── 04_certificates/
│   ├── bihar_rtps_domicile_signed.pdf
│   └── ews_income_certificate.pdf
├── 05_business_legal/
│   ├── gst_registration_certificate.pdf
│   └── udyam_msme_memorandum.pdf
└── 06_issued_receipts/
    ├── gst_tax_invoice_inv_2026_01.pdf
    └── official_kendra_slip_rcp_01.pdf
```

### Vault Capabilities:
- **Expiry Alerts:** Automated WhatsApp/SMS reminders 30 days prior to the expiration of documents (e.g. Income Certificate 1-year validity, Driving Licence, Passport).
- **Access Audit Log:** Detailed chronological history recording every view, download, or verification handoff.
- **Consent Revocation:** One-click option for citizen to revoke partner access or delete temporary uploads under Right to Erasure.
