# AKUL DRAVIN DIGITAL SERVICES (ADCS)
## Microservice API Contract & Developer Integration Guide

---

### 1. Overview & Authentication

The ADCS API Gateway operates over HTTP/HTTPS with JSON payloads.
All protected endpoints accept a standard Bearer JWT header:
```http
Authorization: Bearer jwt-ad-<session-token>
```

#### Base URLs:
- **Local Development**: `http://127.0.0.1:5000`
- **Production Gateway**: `https://api.akuldravin.com`

---

### 2. Core API Endpoints

#### 2.1 System Health & Diagnostics
- **`GET /api/health`**
  - **Response**: `{ status: "ONLINE", platform: "AKUL DRAVIN CLOUD AI", uptimeSeconds: 3100, modules: [...] }`

#### 2.2 CSC Kendra VLE Profile
- **`GET /api/csc/vle-profile`**
  - **Response**: `{ success: true, vle: { cscId, vleName, centerName, walletBalance, digiPayTerminalId, passbook } }`

#### 2.3 DigiPay AEPS Biometric L1 Engine
- **`GET /api/digipay/device-status`**
  - **Response**: `{ success: true, device: { vendor: "Mantra", model: "MFS100", rdServiceStatus: "READY", port: 11100 } }`
- **`POST /api/digipay/rd-service-capture`**
  - **Request**: `{ vendor: "Mantra", port: 11100, isConnected: true }`
  - **Response**: `{ success: true, encryptedPidData: "<PidData>...", sessionKey: "ENC-KEY-...", timestamp }`
- **`POST /api/csc/digipay/transact`**
  - **Request**: `{ aadhaar: "999999990019", bankName: "State Bank of India", txnType: "withdrawal", amount: 1500 }`
  - **Response**: `{ success: true, rrn: "NPCI...", authCode: "AUTH...", amount: 1500, vleCommission: 15, customerRemainingBalance }`

#### 2.4 Double-Entry General Ledger
- **`POST /api/finance/ledger`**
  - **Request**:
    ```json
    {
      "reference": "VLE-TOPUP-431902",
      "description": "VLE Wallet Instant Top-Up via Bank Switch",
      "lines": [
        { "account": "1010-CASH-AT-BANK", "debit": 2500, "credit": 0 },
        { "account": "2020-VLE-WALLET-LIABILITY", "debit": 0, "credit": 2500 }
      ]
    }
    ```
  - **Response**: `{ success: true, journal: { id, totalDebit, totalCredit, balanced: true, cryptographicHash } }`

#### 2.5 ADCS Academy LMS & Certifications
- **`GET /api/academy/courses`**
  - **Response**: `{ success: true, courses: [ { id: "CRS-AI-101", title, duration, passingScore }, ... ] }`
- **`POST /api/academy/submit-exam`**
  - **Request**: `{ studentName: "Suman Saurabh", courseId: "CRS-COMP-102", answers: { "1": "A", "2": "A", ... } }`
  - **Response**: `{ success: true, passed: true, percentage: 88, certificate: { certificateId, studentName, grade, sha256Proof } }`
- **`GET /api/academy/certificates/verify/:certId`**
  - **Response**: `{ success: true, certificate: { certificateId, studentName, courseTitle, status: "VALID", sha256Proof } }`

#### 2.6 Real-Time Event Bus (Server-Sent Events)
- **`GET /api/events`**
  - Opens persistent HTTP SSE stream emitting JSON events:
    - `csc:digipay_transaction`
    - `ledger:entry_posted`
    - `application:status_updated`
    - `wallet:balance_credited`

---
*Akul Dravin Digital Services Private Limited • All Rights Reserved*
