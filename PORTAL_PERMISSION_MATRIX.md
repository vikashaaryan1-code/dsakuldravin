# AKUL DRAVIN DIGITAL SERVICES (ADCS) • PORTAL PERMISSION & RBAC MATRIX
**Document Reference:** ADCS-SEC-RBAC-2026-V1  
**Target Specification:** 15 Isolated Role Portals, Unified SSO & Permission Boundaries  
**Security Standard:** OAuth 2.0 / OIDC, JWT with RS256/HS256, Principle of Least Privilege (PoLP)

---

## 1. Unified Identity & SSO Architecture (ADCS Connect)

All 15 portals in the ADCS Super Platform share a single centralized identity store (`users`), but operate under strict role-based access control (RBAC). 

```text
                                [ ADCS CONNECT SSO ]
                           (OAuth 2.0 / Bearer JWT / MFA)
                                         │
    ┌──────────────────────────┬─────────┴─────────┬──────────────────────────┐
    ▼                          ▼                   ▼                          ▼
[ CITIZEN TIER ]       [ OPERATOR TIER ]   [ CHANNEL TIER ]          [ GOVERNANCE TIER ]
• Customer Portal      • ADCS Kendra (VLE) • Franchise Portal        • Operations Hub
• Public Discovery     • Cyber Café Console• Distributor Hub         • Admin Control Tower
• Academy Student      • Field Technician  • Affiliate Portal        • Super Admin
• Advocate Client      • LMS Instructor    • B2B Commercial Partner  • Finance Ledger
```

**SSO Invariant:** Authenticating through ADCS Connect grants a verified session identity, but access to individual portals is strictly gated by assigned role claims in the JWT token. No staff member or operator receives Super Admin privileges automatically.

---

## 2. 15-Portal Role Permission Matrix

| Portal # | Portal Name | URL Namespace | Primary Role Key | MFA Required | Key Permissions & Capabilities |
| :---: | :--- | :--- | :--- | :---: | :--- |
| **01** | **Public Website** | `/`, `/services`, `/track` | `anonymous` / `public` | No | Service discovery, fee transparency, blog, public tracking, PNR inquiry. |
| **02** | **Customer Portal** | `/portal/customer` | `customer` | Optional | Profile, KYC vault, application status, payment history, downloadable receipts. |
| **03** | **ADCS Kendra** | `/digitalseva`, `/portal/kendra` | `vle_operator` | Yes (OTP) | Assisted citizen form filing, counter cash collection, thermal receipt slips, passbook. |
| **04** | **Cyber Café Console** | `/portal/cyber-cafe` | `cafe_operator` | Yes (OTP) | PC workstation reservation (PC-01..08), session timers, Xerox/printing POS billing. |
| **05** | **Franchise Owner** | `/portal/franchise` | `franchise_owner` | Yes (OTP) | Branch setup, Kendra counter monitoring, commission settlement, local marketing. |
| **06** | **Distributor Hub** | `/portal/distributor` | `distributor` | Yes (OTP) | Territory franchise onboarding, downline network, commission overrides, audits. |
| **07** | **Affiliate Portal** | `/portal/affiliate` | `affiliate` | No | Unique tracking links, campaign banners, click analytics, commission payout requests. |
| **08** | **Service Executive** | `/portal/technician`, `/portal/employee` | `technician` / `field_agent`| Yes (Device) | CCTV installation jobs, physical site surveys, hardware configuration, customer sign-off. |
| **09** | **ADCS Connect** | `/csc/login`, `/portal/connect` | `all_authenticated` | Yes (OTP) | Single sign-on, session revocation, device security audit, profile verification. |
| **10** | **ADCS Hub** | `/portal/hub`, `/admin/operations` | `ops_manager` | Yes (TOTP) | Service orchestration, queue management, SLA escalation, regional load balancing. |
| **11** | **Partner Portal** | `/portal/partner` | `commercial_partner` | Yes (TOTP) | API key provisioning, contract terms, bulk volume pricing, SLA reporting. |
| **12** | **Provider Portal** | `/portal/provider` | `service_provider` | Yes (TOTP) | Banking, carrier, and insurer fulfillment, reconciliation, dispute resolution. |
| **13** | **ADCS Academy** | `/portal/student`, `/portal/instructor` | `student` / `instructor` | No | 16-module course LMS, practical labs, timed quizzes, proctored exams, certificate generation. |
| **14** | **Admin Control Tower** | `/portal/admin`, `/finance-portal` | `finance_admin` / `admin` | Yes (TOTP) | General ledger (`Debit == Credit`), customer complaints, pricing override, CRM pipeline. |
| **15** | **Super Admin** | `/portal/super-admin` | `super_admin` | Mandatory | Global white-label branding, zero-code service studio, tenant provisioning, system logs. |

---

## 3. Session Security & Revocation Policies

1. **Token Lifetime:**
   - Access Token: 60 minutes.
   - Refresh Token: 7 days with sliding-window rotation and IP fingerprint validation.
2. **Privileged Escalation Guard:**
   - Any access to `/portal/admin`, `/portal/super-admin`, or `/finance-portal` requires an active TOTP session.
3. **Emergency Session Kill Switch:**
   - Super Admin can invalidate all active sessions for a specific user, tenant, or global platform immediately via `/api/auth/revoke-all`.
