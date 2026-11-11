# AKUL DRAVIN DIGITAL SERVICES (ADCS)
## Enterprise Master Architecture & Production Runbook
*“हर काम डिजिटल • हर समाधान एक जगह”*

---

### 1. Executive Summary & Brand Architecture

**Akul Dravin Digital Services Private Limited (ADCS)** is an assisted digital service, e-governance, and business operating platform designed for Pan-India deployment across Tier 1 to Tier 4 locations. 

The platform operates under strict statutory standards:
- **UIDAI Aadhaar Act Compliance**: Exclusively utilizes **L1 Registered Device (RD)** specifications. Raw biometric fingerprints are never stored or captured in database records; all authentication operates via encrypted PID blocks generated directly in secure hardware.
- **DPDP Act 2025 Compliance**: Enforces explicit citizen consent logging, purpose limitation, tamper-evident SHA-256 document hashing, and strict role-based access control (RBAC).
- **Double-Entry General Ledger**: Every financial transaction (VLE wallet top-up, AEPS cash-out, BBPS bill settlement) is audited through balanced debit-and-credit journal entries (`Debit = Credit`).
- **Bar Council of India (BCI) Rule 36**: Legal consultations are structured as confidential, private advocate appointments without touting, solicitation, or public advertising.
- **Vocational Skills Certification**: All certificates issued under ADCS Academy represent private professional competency credentials with public QR code cryptographic verification.

---

### 2. Multi-Tenant 15-Role Portal Matrix

| Role Key | Portal Name | Route Path | Target User & Primary Workflow |
| :--- | :--- | :--- | :--- |
| `customer` | **Customer Portal** | `/portal/customer` | Citizen document vault, service tracking, invoice downloads. |
| `vle` | **ADCS Kendra** | `/digitalseva` | Core assisted service counter: 64+ catalogue, DigiPay, BBPS. |
| `cafe_operator` | **Cyber Café Console** | `/portal/cyber-cafe` | Workstation booking, printing POS, document scanning queue. |
| `franchise` | **Franchise Owner** | `/portal/franchise` | District / Tehsil Kendra monitoring, royalty splits, revenue analytics. |
| `distributor` | **Distributor Hub** | `/portal/distributor` | Hardware distribution, paper/toner supplies, inventory ledger. |
| `affiliate` | **Affiliate Portal** | `/portal/affiliate` | Referral links, social media campaign tracking, commission payouts. |
| `executive` | **Service Executive** | `/portal/executive` | Field operations, physical document pickup, KYC verification. |
| `partner` | **Partner Portal** | `/portal/partner` | B2B API access, white-label client management, commercial SLA. |
| `admin` | **Super Admin** | `/portal/admin` | Sovereign platform control, audit logs, API connectors, pricing. |
| `advocate` | **Advocate Portal** | `/portal/advocate` | Confidential legal desk, case intake, client video consultation. |
| `instructor` | **Instructor Portal** | `/portal/instructor` | Course syllabus authoring, quiz management, proctoring reviews. |
| `student` | **Student Portal** | `/portal/student` | 4 vocational tracks, 16 A-to-Z modules, online proctored exams. |
| `technician` | **Technician Portal** | `/portal/technician` | CCTV & network installation dispatch, site survey, BoQ sign-off. |
| `finance` | **Finance Portal** | `/portal/finance` | General ledger, tax invoices, GST reconciliation, bank payouts. |
| `employee` | **HRMS Portal** | `/portal/employee` | Corporate workspace, biometric attendance, payroll slips. |

---

### 3. Technical Stack & Architecture

```
                    ┌──────────────────────────────────────────────┐
                    │               CLIENT DEVICES                 │
                    │   VLE Desktop / Mobile / Citizen Browser     │
                    └──────────────────────┬───────────────────────┘
                                           │
                                HTTPS / WSS / TLS 1.3
                                           │
            ┌──────────────────────────────┴──────────────────────────────┐
            ▼                                                             ▼
┌───────────────────────┐                                     ┌───────────────────────┐
│   VITE WEB CLIENT     │                                     │  EXPRESS API GATEWAY  │
│      (Port 3000)      │ ─── Proxied API & Event Requests ─► │      (Port 5000)      │
│  React 18 / TS / CSS  │                                     │ Node.js ESM / REST    │
└───────────────────────┘                                     └───────────┬───────────┘
                                                                          │
                                              ┌───────────────────────────┴───────────────────────────┐
                                              ▼                                                       ▼
                                  ┌───────────────────────┐                               ┌───────────────────────┐
                                  │   ACID JSON STORE     │                               │  L1 RD SERVICE SWITCH │
                                  │ server/data/store.json│                               │ 127.0.0.1:11100 Local │
                                  │ Journals/Passbook/Cert│                               │ Mantra/Morpho Enc PID │
                                  └───────────────────────┘                               └───────────────────────┘
```

#### Frontend Specs
- **Runtime**: React 18 with TypeScript 5
- **Build System**: Vite 5 with code splitting and gzip chunking
- **Styling**: Modern CSS clamp typography, high-contrast dark/light accents, mobile bottom bar navigation
- **Icons**: Lucide React

#### Backend Gateway Specs
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express 4 with body parser and CORS
- **Event Bus**: Server-Sent Events (SSE) on `/api/events` for real-time order and ledger updates
- **Cryptography**: Node.js native `crypto` (SHA-256 for document seals and HMAC-SHA256 for payment verification)

---

### 4. Production Deployment Guide

#### 4.1 Prerequisites
```powershell
node -v    # Must be v18.0.0 or higher
npm -v     # Must be v9.0.0 or higher
git --version
```

#### 4.2 Installation & Build
```powershell
# Clone repository
git clone https://github.com/akuldravin/adcs-platform.git
cd "c:\Projects\AD DDIGITAL"

# Install dependencies
npm install

# Run automated tests and 15 launch gates check
npm test
node scripts/verify_15_launch_gates.mjs

# Build production bundle
npm run build
```

#### 4.3 Running with PM2 Process Manager
```powershell
# Install PM2 globally if not present
npm install -g pm2

# Start both API Gateway and Frontend server
pm2 start server/server.mjs --name "adcs-backend"
pm2 start "npm run preview -- --port 3000 --host 0.0.0.0" --name "adcs-frontend"

# Save process list for system reboot auto-start
pm2 save
pm2 startup
```

#### 4.4 Nginx Reverse Proxy Configuration (Production SSL)
```nginx
server {
    listen 80;
    server_name akuldravin.com www.akuldravin.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name akuldravin.com www.akuldravin.com;

    ssl_certificate /etc/letsencrypt/live/akuldravin.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/akuldravin.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Frontend Static App
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # API Gateway
    location /api/ {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Real-Time Server-Sent Events (SSE)
    location /api/events {
        proxy_pass http://127.0.0.1:5000/api/events;
        proxy_http_version 1.1;
        proxy_set_header Connection '';
        proxy_buffering off;
        proxy_cache off;
        proxy_read_timeout 86400s;
    }
}
```

---

### 5. Daily Counter Close Runbook for VLE Operators

1. **Morning Protocol (08:30 AM IST)**:
   - Verify power backup / inverter and internet connection.
   - Run biometric device self-test: Open [DigiPay Tab](http://127.0.0.1:3000/digitalseva?tab=digipay) -> Verify Mantra MFS100 status is `READY`.
   - Count physical cash drawer float (e.g. ₹20,000 opening cash for AEPS cash-outs).
2. **Day Operations (09:00 AM - 07:00 PM IST)**:
   - Provide citizen services: PAN card, FASTag, e-District certificates, and cash withdrawals.
   - Every transaction generates an instant thermal receipt with RRN and GST invoice.
3. **Evening Settlement & Counter Close (07:30 PM IST)**:
   - Reconcile General Ledger: Total AEPS Cash Disbursed + Opening Float = Cash in Drawer.
   - Initiate Bank Payout: Transfer accumulated VLE wallet balance to registered bank account.
   - Download Daily Audit Register from Admin Portal for statutory compliance.

---

### 6. Emergency Recovery & Disaster Protocol

- **Database Backup Path**: `server/data/store.json`
- **Hourly Snapshot Script**:
  ```powershell
  # Creates timestamped backup in backups/ directory
  node -e "const fs=require('fs'); fs.copyFileSync('server/data/store.json', 'server/data/backups/store_' + Date.now() + '.json'); console.log('Backup complete');"
  ```
- **Recovery Procedure**:
  1. Stop backend: `pm2 stop adcs-backend`
  2. Restore last verified snapshot: `copy server\data\backups\store_TIMESTAMP.json server\data\store.json`
  3. Verify ledger equilibrium: `node scripts/run_tests.mjs`
  4. Restart backend: `pm2 restart adcs-backend`

---
*Akul Dravin Digital Services Private Limited • Confidential & Proprietary*
