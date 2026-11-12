# 🚀 AKUL DRAVIN CLOUD AI • एंटरप्राइज फुल-स्टैक डिप्लॉयमेंट गाइड (Production Deployment Guide)

यह दस्तावेज़ **AKUL DRAVIN CLOUD AI / DIGITAL SERVICES** एवं इसके **वैदिक ज्योतिष महामंच, स्वायत्त मल्टी-एजेंट क्वांटम एआई (Quantum AI) एवं एंटरप्राइज एपीआई गेटवे (API Gateway)** को स्थानीय अथवा क्लाउड सर्वर (AWS, DigitalOcean, Vercel, Docker, GitHub Actions) पर प्रत्यक्ष रूप से तैनात करने की संपूर्ण निर्देशिका है।

---

## 📋 पूर्व-आवश्यकताएं (Prerequisites)
- **Node.js**: v18.x या v20.x (Node 20 LTS अनुशंसित)
- **NPM**: v9.x या v10.x
- **Docker & Docker Compose** (कंटेनर डिप्लॉयमेंट के लिए)
- **Git**

---

## 🏗️ वास्तुकला (System Architecture)

```
┌────────────────────────────────────────────────────────┐
│      AKUL DRAVIN CLOUD AI • PRESENTATION LAYER         │
│  (React 18 + Vite 5 + Code-Split Route Modules + CSS)  │
│        Port: 3000 (Dev) / Port: 80 (Nginx Prod)        │
└───────────────────────────┬────────────────────────────┘
                            │ /api/ Reverse Proxy
┌───────────────────────────▼────────────────────────────┐
│         ENTERPRISE REST & AUTONOMOUS AI GATEWAY        │
│          (Express + Verhoeff D5 Checksum Engine)       │
│                     Port: 5000                         │
├────────────────────────────────────────────────────────┤
│  • Microservices: Marketplace, Apps, Auth, Logistics   │
│  • Quantum Multi-Agent AI (Universal, Docs, Quotes)    │
│  • Vedic Astrology Engine (Lagna, Dasha, Guna Match)   │
│  • Persistent File Store & Tamper-Evident Audit Ledger │
└────────────────────────────────────────────────────────┘
```

---

## 🛠️ स्थानीय परिनियोजन (Local Setup & Run)

```bash
# 1. रिपॉजिटरी में निर्भरताएं स्थापित करें
npm install

# 2. स्वचालित 50-पॉइंट फुल-स्टैक टेस्ट सूट चलाएं (Unit & Integration verification)
npm test

# 3. संपूर्ण एंड-टू-एंड 8-चरणीय ऑटोमेशन सिमुलेशन चलाएं
npm run simulate

# 4. एंटरप्राइज एपीआई गेटवे प्रारंभ करें (टर्मिनल 1)
npm run server
# एपीआई गेटवे http://localhost:5000 पर सक्रिय होगा (Double-Entry Ledger, Support SLA Desk, Marketing, White-label)

# 5. फ्रंटएंड डेवलपमेंट सर्वर प्रारंभ करें (टर्मिनल 2)
npm run dev
# पोर्टल स्थानीय रूप से http://localhost:3000 (या 3001) पर उपलब्ध होगा

# 6. प्रोडक्शन बंडल बनाएँ (Vite + TypeScript Check)
npm run build
```

---

## ⚡ Coolify Subdomain 1-Click Deployment

Coolify पर अपने किसी भी Subdomain (जैसे `https://portal.yourdomain.com` या `https://adcs.yourdomain.com`) पर डिप्लॉय करने के लिए:
1. **DNS Setup:** अपने Domain Registrar / Cloudflare में सबडोमेन (`portal`) के लिए एक **A Record** बनाएँ जो आपके Coolify VPS के Public IP पर पॉइंट करे। (Cloudflare Proxy ON हो तो SSL मोड **Full / Full (Strict)** रखें)।
2. **Coolify Application बनाएँ:** Coolify Dashboard → **Projects** → **+ Add New Resource** → **Public / Private Repository** (अपना Git repo URL व branch चुनें)।
3. **Build Pack चुनें (तीनों विकल्प समर्थित हैं):**
   - **Recommended — Build Pack: `Dockerfile`**:
     - `Dockerfile` फ्रंटएंड (`npm run build` → `dist/`) बिल्ड करता है और एक ही कंटेनर में Express (`server/server.mjs`) द्वारा `/` (SPA) व `/api/*` दोनों सर्व करता है।
     - **Ports Exposes:** `5000` सेट करें।
   - **विकल्प 2 — Build Pack: `Nixpacks`**:
     - **Install Command:** `npm ci`
     - **Build Command:** `npm run build`
     - **Start Command:** `npm start`
     - **Ports Exposes:** `5000`
   - **विकल्प 3 — Build Pack: `Docker Compose`** (`docker-compose.yml` उपयोग करता है, बिना होस्ट पोर्ट कन्फ्लिक्ट के `expose: ["5000"]` और परसिस्टेंट वॉल्यूम `adcs_data:/app/server/data` के साथ)।
4. **Subdomain Configure करें:** Coolify App Settings → **General → Domains** में `https://portal.yourdomain.com` डालें और **Generate Domain / Save** करें (Coolify Traefik स्वचालित Let's Encrypt HTTPS SSL प्रमाणपत्र जारी करेगा)।
5. **Healthcheck & Persistent Storage:**
   - **Healthcheck:** Enabled, Path: `/api/health`, Port: `5000`.
   - **Persistent Storage (Volume):** Source `/app/server/data` माउंट करें ताकि एप्लिकेशन, यूज़र अकाउंट्स, UTR पेमेंट्स और दस्तावेज़ री-डिप्लॉय के बाद भी सुरक्षित रहें।
6. **Environment Variables:** `NODE_ENV=production`, `PORT=5000`, `JWT_SECRET=<strong-random-secret>` और वैकल्पिक गेटवे कुंजियाँ (`.env.example` देखें) जोड़ें।
7. **Deploy** पर क्लिक करें! आपका पूरा प्लेटफ़ॉर्म (`https://portal.yourdomain.com` और `https://portal.yourdomain.com/api/health`) एक ही सबडोमेन पर लाइव हो जाएगा।

---

## 📦 प्रोडक्शन बिल्ड एवं एक्रोबैट पीडीएफ निर्माण (Production Build & Acrobat PDF)

```bash
# 1. टाइपस्क्रिप्ट एवं Vite कोड-स्प्लिट प्रोडक्शन बिल्ड
npm run build

# 2. Adobe Acrobat प्रमाणित PDF सर्टिफिकेट्स एवं ऑडिट रिपोर्ट का निर्माण
node scripts/generate_acrobat_pdf.cjs

# 3. प्रोडक्शन प्रीव्यू का परीक्षण
npm run preview
```

बिल्ड होने के बाद:
- `dist/` फ़ोल्डर में सभी पेजों के पृथक-पृथक उच्च-गति चंक्स (2 kB - 38 kB) उत्पन्न होंगे।
- `Vedic_Janam_Kundli_Certificate.pdf` एवं `AD_DIGITAL_Website_Audit_Deployment_Report.pdf` रूट व `dist/` में उपलब्ध होंगी जिन्हें सीधे Adobe Acrobat DC में खोला जा सकता है।

---

## 🐳 Docker एवं एक-क्लिक कंटेनर डिप्लॉयमेंट (One-Click Multi-Container Deployment)

```bash
# Docker Compose के माध्यम से वेब एवं एपीआई दोनों कंटेनर एक साथ प्रारंभ करें
docker-compose up -d --build

# कंटेनर की स्थिति जांचें
docker ps
# वेब पोर्टल: http://localhost:80
# एपीआई गेटवे: http://localhost:5000/api/health
```

---

## 🔄 CI/CD पाइपलाइन (GitHub Actions)
प्रोजेक्ट में `.github/workflows/deploy.yml` पहले से कॉन्फ़िगर है।
- जैसे ही `main` शाखा में कोड पुश होगा, GitHub Actions स्वचालित रूप से:
  1. निर्भरताएं इंस्टॉल करेगा
  2. संपूर्ण टेस्ट सूट (`node scripts/run_tests.mjs`) चलाएगा
  3. प्रोडक्शन बिल्ड (`npm run build`) बनाएगा
  4. एक्रोबैट पीडीएफ फाइलें जेनरेट करेगा
  5. प्रोडक्शन आर्टिफैक्ट को डाउनलोड व डिप्लॉय के लिए तैयार करेगा।

---

## 📞 तकनीकी सहायता एवं संपर्क
- **कंपनी:** AKUL DRAVIN CLOUD AI & DIGITAL SERVICES PVT. LTD.
- **ईमेल:** support@ad-digital.in
