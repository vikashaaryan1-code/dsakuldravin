# Akul Dravin Digital Services (ADCS) • Enterprise Platform
*“हर काम डिजिटल • हर समाधान एक जगह”*

![ADCS Platform](https://img.shields.io/badge/Platform-Akul%20Dravin%20Digital%20Services-blue.svg)
![Launch Gates](https://img.shields.io/badge/Launch%20Gates-15%2F15%20Passed-brightgreen.svg)
![Test Coverage](https://img.shields.io/badge/Tests-81%2F81%20Passed-brightgreen.svg)
![Architecture](https://img.shields.io/badge/Architecture-15%20Role%20Portals-blueviolet.svg)

---

### Quickstart

```bash
# 1. Install dependencies
npm install

# 2. Run automated test suite & launch gates
npm test
npm run test-launch-gates

# 3. Start development server (Port 3000)
npm run dev

# 4. Start production unified API gateway (Port 5000)
npm start
```

---

### Key Portal Routes

| Role | Portal | Live URL |
| :--- | :--- | :--- |
| **VLE Operator** | ADCS Kendra | [http://localhost:3000/digitalseva](http://localhost:3000/digitalseva) |
| **Academy Student** | Student Console | [http://localhost:3000/portal/student](http://localhost:3000/portal/student) |
| **Public Verification** | QR Certificate Verify | [http://localhost:3000/verify-certificate](http://localhost:3000/verify-certificate) |
| **Cyber Café** | Workstation Console | [http://localhost:3000/portal/cyber-cafe](http://localhost:3000/portal/cyber-cafe) |
| **Advocate** | Legal Consultation Desk | [http://localhost:3000/portal/advocate](http://localhost:3000/portal/advocate) |
| **Super Admin** | Sovereign Admin Console | [http://localhost:3000/portal/admin](http://localhost:3000/portal/admin) |

---

### Automated Simulators & Audits

- `npm run test-e2e`: Full 10-step end-to-end integration runner.
- `npm run simulate-walkin`: Walk-in citizen counter simulation (PAN + Domicile + Thermal Receipt).
- `npm run simulate-cafe-legal`: Cyber café workstation metering & BCI Rule 36 legal desk intake.
- `npm run audit:all`: Master 6-suite omni-channel enterprise audit.

---
*Akul Dravin Digital Services Private Limited • Confidential & Proprietary*
