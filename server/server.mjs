import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { validateVerhoeff } from './verhoeff.mjs';
import { calculateKundliReport, calculateAshtakootMatch } from './astrologyEngine.mjs';
import { createPaymentOrder, verifyPayment } from './paymentsEngine.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Persistent Data Store Directory & File
const DATA_DIR = path.join(__dirname, 'data');
const VAULT_DIR = path.join(DATA_DIR, 'vault');
const DB_FILE = path.join(DATA_DIR, 'store.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(VAULT_DIR)) {
  fs.mkdirSync(VAULT_DIR, { recursive: true });
}

// Initial Database Seeds
const initialDB = {
  services: [
    {
      id: 'srv-pan-new',
      title: 'New PAN Card (Form 49A)',
      titleHi: 'नया पैन कार्ड (फॉर्म 49A)',
      category: 'government',
      description: 'Instant paperless Aadhaar-based PAN application and physical PVC card delivery.',
      price: 107,
      timeline: '2-3 Working Days',
      requiredDocuments: ['Aadhaar Card', 'Passport Photo', 'Digital Signature'],
      commissionRate: 20
    },
    {
      id: 'srv-passport-fresh',
      title: 'Fresh Tatkaal / Normal Passport',
      titleHi: 'नया पासपोर्ट आवेदन',
      category: 'government',
      description: 'Online registration, appointment booking at PSK, and document pre-verification.',
      price: 1500,
      timeline: '7-14 Days',
      requiredDocuments: ['Aadhaar Card', 'Birth Certificate / 10th Marks Sheet', 'Address Proof'],
      commissionRate: 150
    },
    {
      id: 'srv-company-pvt-ltd',
      title: 'Private Limited Company Incorporation',
      titleHi: 'प्राइवेट लिमिटेड कंपनी पंजीकरण',
      category: 'business',
      description: 'Complete MCA SPICe+ filing, RUN name reservation, DIN, MOA/AOA, and Certificate of Incorporation.',
      price: 6999,
      timeline: '5-7 Days',
      requiredDocuments: ['Director PAN & Aadhaar', 'Bank Statement', 'Electricity Bill / Rent Agreement'],
      commissionRate: 1000
    },
    {
      id: 'srv-cctv-4cam',
      title: '4-Camera HD Night Vision Setup',
      titleHi: '4 कैमरा एचडी सीसीटीवी सेटअप',
      category: 'cctv',
      description: '4x 2MP dome/bullet cameras, 4-channel DVR, 1TB surveillance HDD, 50m cable, and full mobile live view setup.',
      price: 12499,
      timeline: 'Same Day Installation',
      requiredDocuments: ['Installation Site Address Proof', 'Contact Person Details'],
      commissionRate: 1200
    }
  ],
  applications: [
    {
      id: 'APP-10029',
      trackingNumber: 'AD-APP-10029',
      serviceId: 'srv-pan-new',
      serviceName: 'New PAN Card (Form 49A)',
      customerName: 'Rahul Sharma',
      phone: '+91 98765 43210',
      status: 'APPROVED',
      appliedDate: '2026-11-09T10:30:00.000Z',
      assignedRole: 'VLE Operator - Delhi Hub',
      notes: 'Aadhaar biometric pre-verification completed.'
    },
    {
      id: 'APP-10030',
      trackingNumber: 'AD-APP-10030',
      serviceId: 'srv-company-pvt-ltd',
      serviceName: 'Private Limited Company Incorporation',
      customerName: 'Ananya Verma',
      phone: '+91 91234 56789',
      status: 'PROCESSING',
      appliedDate: '2026-11-10T08:15:00.000Z',
      assignedRole: 'Corporate Legal Desk',
      notes: 'ROC SPICe+ form Part B under review.'
    }
  ],
  transactions: [
    {
      id: 'pay_ad_init_01',
      orderId: 'order_ad_init_01',
      amount: 107,
      paymentMethod: 'upi',
      status: 'PAID',
      invoiceNumber: 'INV-AD-2026-10001',
      paidAt: '2026-11-09T10:30:00.000Z'
    }
  ],
  auditLogs: [
    {
      id: 'AUD-501',
      action: 'System Boot & Enterprise API Initialized',
      actor: 'AKUL DRAVIN CLOUD AI Engine',
      role: 'SUPER_ADMIN',
      target: 'Core Microservices',
      status: 'SUCCESS',
      timestamp: new Date().toISOString()
    }
  ],
  users: [
    {
      id: 'usr-admin-01',
      name: 'Dr. Akul Dravin (Super Admin)',
      phone: '9876543210',
      role: 'super_admin',
      walletBalance: 250000
    }
  ]
};

// Database Read / Write Helpers
function readDB() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(initialDB, null, 2), 'utf-8');
      return initialDB;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (!parsed.transactions) parsed.transactions = initialDB.transactions;
    if (!parsed.crmLeads) parsed.crmLeads = [];
    if (!parsed.journals) parsed.journals = [];
    if (!parsed.tickets) parsed.tickets = [];
    if (!parsed.campaigns) parsed.campaigns = [];
    if (!parsed.downlines) parsed.downlines = [];
    if (!parsed.affiliates) parsed.affiliates = [];
    if (!parsed.employees) parsed.employees = [
      { id: 'EMP-01', name: 'Vikram Malhotra', role: 'Operations Lead', department: 'Citizen Services', attendanceStatus: 'Present', phone: '+91 98111 22334', email: 'vikram@akuldravin.com', joinDate: '2024-03-15', salary: 45000 },
      { id: 'EMP-02', name: 'Neha Singhal', role: 'Senior Legal Associate', department: 'Legal & ROC', attendanceStatus: 'Present', phone: '+91 98222 33445', email: 'neha@akuldravin.com', joinDate: '2024-06-01', salary: 55000 },
      { id: 'EMP-03', name: 'Rohan Mehra', role: 'Cyber Café Supervisor', department: 'Hardware & Network', attendanceStatus: 'Present', phone: '+91 98333 44556', email: 'rohan@akuldravin.com', joinDate: '2024-08-10', salary: 32000 }
    ];
    if (!parsed.inventory) parsed.inventory = [
      { id: 'INV-01', itemName: 'PVC Smart Cards for Aadhaar/PAN', category: 'Stationery', stockQuantity: 450, unit: 'Pieces', reorderLevel: 100, unitPrice: 15 },
      { id: 'INV-02', itemName: 'A4 75 GSM High-Speed Paper Reams', category: 'Paper', stockQuantity: 28, unit: 'Reams', reorderLevel: 10, unitPrice: 320 },
      { id: 'INV-03', itemName: 'Thermal Receipt Rolls 3-Inch', category: 'Hardware', stockQuantity: 65, unit: 'Rolls', reorderLevel: 20, unitPrice: 45 },
      { id: 'INV-04', itemName: 'Mantra MFS100 Biometric Scanner', category: 'Hardware', stockQuantity: 12, unit: 'Units', reorderLevel: 5, unitPrice: 2450 },
      { id: 'INV-05', itemName: 'ProxKey Plus WatchData USB Tokens', category: 'Hardware', stockQuantity: 34, unit: 'Tokens', reorderLevel: 10, unitPrice: 650 }
    ];
    if (!parsed.documents) parsed.documents = [];
    if (!parsed.whiteLabel) parsed.whiteLabel = {
      brandName: 'AKUL DRAVIN DIGITAL SERVICES',
      tagline: 'One Platform. Every Service.',
      primaryColor: '#1D4ED8',
      accentColor: '#F59E0B',
      customDomain: 'cloud.akuldravin.com',
      invoiceHeader: 'AKUL DRAVIN GROUP • GSTIN: 07AAAAA0000A1Z5'
    };
    if (!parsed.workstations) parsed.workstations = [
      { id: 'PC-01', status: 'in-use', ip: '192.168.1.101', currentSession: { customerName: 'Rajesh Kumar', phone: '+91 98765 00001', startTime: '11:15 AM', elapsedMinutes: 45, activeTask: 'SSC CGL Application Form', hourlyRate: 40 } },
      { id: 'PC-02', status: 'available', ip: '192.168.1.102' },
      { id: 'PC-03', status: 'in-use', ip: '192.168.1.103', currentSession: { customerName: 'Amit Verma', phone: '+91 98765 00002', startTime: '11:30 AM', elapsedMinutes: 30, activeTask: 'PAN Form 49A Upload', hourlyRate: 40 } },
      { id: 'PC-04', status: 'available', ip: '192.168.1.104' },
      { id: 'PC-05', status: 'in-use', ip: '192.168.1.105', currentSession: { customerName: 'Priya Sharma', phone: '+91 98765 00003', startTime: '11:45 AM', elapsedMinutes: 15, activeTask: 'EPFO KYC Verification', hourlyRate: 40 } },
      { id: 'PC-06', status: 'in-use', ip: '192.168.1.106', currentSession: { customerName: 'Deepak Patel', phone: '+91 98765 00004', startTime: '11:10 AM', elapsedMinutes: 50, activeTask: 'Railway RRB NTPC Admit Card', hourlyRate: 40 } },
      { id: 'PC-07', status: 'available', ip: '192.168.1.107' },
      { id: 'PC-08', status: 'available', ip: '192.168.1.108' }
    ];
    return parsed;
  } catch (err) {
    console.error('Error reading DB, falling back to in-memory store:', err);
    return initialDB;
  }
}

function writeDB(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing DB:', err);
  }
}

// -------------------------------------------------------------
// REAL-TIME SERVER-SENT EVENTS (SSE) EVENT BUS
// -------------------------------------------------------------
const sseClients = new Set();

export function broadcastEvent(type, payload) {
  const data = JSON.stringify({ type, payload, timestamp: new Date().toISOString() });
  for (const client of sseClients) {
    try {
      client.write(`event: ${type}\ndata: ${data}\n\n`);
    } catch (err) {
      sseClients.delete(client);
    }
  }
}

// SSE Connection Endpoint
app.get('/api/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  sseClients.add(res);

  // Initial Handshake
  res.write(`event: connected\ndata: ${JSON.stringify({ status: 'CONNECTED', activeClients: sseClients.size, timestamp: new Date().toISOString() })}\n\n`);

  // Heartbeat ping every 25 seconds
  const heartbeat = setInterval(() => {
    res.write(`:ping\n\n`);
  }, 25000);

  req.on('close', () => {
    clearInterval(heartbeat);
    sseClients.delete(res);
  });
});

// -------------------------------------------------------------
// REST API ENDPOINTS
// -------------------------------------------------------------

// 1. Healthcheck
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    version: '1.0.0',
    platform: 'AKUL DRAVIN CLOUD AI',
    timestamp: new Date().toISOString(),
    uptimeSeconds: process.uptime(),
    realtimeClients: sseClients.size,
    modules: ['Marketplace', 'Vedic Astrology', 'Quantum Multi-Agent AI', 'Document Scrutiny', 'Audit Ledger', 'Unified Payment Gateway', 'Real-Time SSE Sync']
  });
});

// 2. Services Catalog
app.get('/api/services', (req, res) => {
  const db = readDB();
  const { category } = req.query;
  let result = db.services || [];
  if (category) {
    result = result.filter(s => s.category.toLowerCase() === String(category).toLowerCase());
  }
  res.json({ success: true, count: result.length, services: result });
});

app.post('/api/services', (req, res) => {
  const db = readDB();
  const newService = {
    id: req.body.id || 'srv-' + Date.now(),
    title: req.body.title || 'Custom Service',
    titleHi: req.body.titleHi || req.body.title || 'कस्टम सेवा',
    category: req.body.category || 'business',
    description: req.body.description || '',
    price: Number(req.body.price) || 0,
    timeline: req.body.timeline || '2-4 Days',
    requiredDocuments: req.body.requiredDocuments || ['Aadhaar Card'],
    commissionRate: Number(req.body.commissionRate) || 0
  };

  db.services = [newService, ...(db.services || [])];
  writeDB(db);
  broadcastEvent('service:created', newService);
  res.status(201).json({ success: true, service: newService });
});

// 3. Applications
app.get('/api/applications', (req, res) => {
  const db = readDB();
  res.json({ success: true, count: db.applications.length, applications: db.applications });
});

app.post('/api/applications', (req, res) => {
  const db = readDB();
  const trackingNumber = 'AD-APP-' + Math.floor(10000 + Math.random() * 90000);
  const newApp = {
    id: 'APP-' + Math.floor(10000 + Math.random() * 90000),
    trackingNumber,
    serviceId: req.body.serviceId || 'srv-pan-new',
    serviceName: req.body.serviceName || 'Standard Digital Service',
    customerName: req.body.customerName || 'Citizen Applicant',
    phone: req.body.phone || '+91 9876543210',
    status: 'SUBMITTED',
    appliedDate: new Date().toISOString(),
    assignedRole: 'Central Operations Desk',
    notes: req.body.notes || 'Application received via Cloud AI portal.',
    formData: req.body.formData || {}
  };

  db.applications = [newApp, ...(db.applications || [])];

  // Audit log
  db.auditLogs.unshift({
    id: 'AUD-' + Date.now(),
    action: 'New Application Submitted',
    actor: newApp.customerName,
    role: 'CUSTOMER',
    target: trackingNumber,
    status: 'SUCCESS',
    timestamp: new Date().toISOString()
  });

  writeDB(db);
  broadcastEvent('application:created', newApp);
  res.status(201).json({ success: true, application: newApp, trackingNumber });
});

app.patch('/api/applications/:id/status', (req, res) => {
  const db = readDB();
  const { id } = req.params;
  const { status, notes, actorRole } = req.body;

  const appIndex = db.applications.findIndex(a => a.id === id || a.trackingNumber === id);
  if (appIndex === -1) {
    return res.status(404).json({ success: false, message: 'Application not found' });
  }

  db.applications[appIndex].status = status;
  if (notes) db.applications[appIndex].notes = notes;

  db.auditLogs.unshift({
    id: 'AUD-' + Date.now(),
    action: `Application Status Changed to ${status}`,
    actor: actorRole || 'OPERATOR',
    role: actorRole || 'OPERATOR',
    target: db.applications[appIndex].trackingNumber,
    status: 'SUCCESS',
    timestamp: new Date().toISOString()
  });

  writeDB(db);
  broadcastEvent('application:status_changed', db.applications[appIndex]);
  res.json({ success: true, application: db.applications[appIndex] });
});

// 4. Tracking
app.get('/api/applications/track/:trackingNumber', (req, res) => {
  const db = readDB();
  const { trackingNumber } = req.params;
  const match = db.applications.find(a => 
    a.trackingNumber.toUpperCase() === trackingNumber.toUpperCase() ||
    a.id.toUpperCase() === trackingNumber.toUpperCase()
  );

  if (!match) {
    return res.status(404).json({ success: false, message: 'Tracking record not found' });
  }
  res.json({ success: true, record: match });
});

// 5. Authentication & OTP
app.post('/api/auth/login', (req, res) => {
  const { phone, role = 'customer' } = req.body;
  if (!phone) return res.status(400).json({ success: false, message: 'Phone number required' });

  res.json({
    success: true,
    message: 'OTP generated and dispatched',
    phone,
    role,
    testOtpHint: '7729'
  });
});

app.post('/api/auth/verify-otp', (req, res) => {
  const { phone, otp, role = 'customer' } = req.body;
  if (otp !== '7729' && otp !== '1234') {
    return res.status(401).json({ success: false, message: 'Invalid OTP code' });
  }

  const token = 'jwt-ad-' + Buffer.from(`${phone}:${role}:${Date.now()}`).toString('base64');
  res.json({
    success: true,
    token,
    user: {
      phone,
      role,
      name: role === 'super_admin' ? 'Dr. Akul Dravin' : 'Registered Citizen',
      walletBalance: 15400
    }
  });
});

// 6. Vedic Astrology API
app.get('/api/astrology/kundli', (req, res) => {
  const { birthDate, birthTime, birthPlace } = req.query;
  const kundli = calculateKundliReport(birthDate, birthTime, birthPlace);
  res.json({ success: true, kundli });
});

app.post('/api/astrology/match', (req, res) => {
  const { boy, girl } = req.body;
  const matchResult = calculateAshtakootMatch(boy, girl);
  res.json({ success: true, matchResult });
});

// 7. Quantum AI Autonomous Multi-Agent Engine
app.post('/api/ai/chat', async (req, res) => {
  const { message, activeAgent = 'Universal', language = 'en' } = req.body;
  const q = String(message || '').toLowerCase();

  let agentName = 'QUANTUM Multi-Agent Brain';
  let governanceLevel = 'READ';
  let replyText = '';
  let suggestedAction = null;

  if (activeAgent === 'Document AI' || (activeAgent === 'Universal' && (/\b(pan|aadhaar|ocr)\b/i.test(q) || q.includes('दस्तावेज़')))) {
    agentName = 'Document AI & OCR Scrutinizer';
    governanceLevel = 'RECOMMEND';
    replyText = language === 'hi'
      ? 'दस्तावेज़ ओसीआर इंजन सक्रिय है। आधार कार्ड (12-अंक Verhoeff एल्गोरिथ्म), पैन कार्ड (ABCDE1234F प्रारूप) एवं जीएसटी सत्यापन हेतु तैयार है।'
      : 'Document AI Engine active. Verhoeff checksum algorithm loaded for 12-digit Aadhaar, Form 49A PAN pattern matching, and GSTIN jurisdictional validation.';
    suggestedAction = { label: 'Open Document Center', actionType: 'navigate', targetPayload: '/documents' };
  } else if (activeAgent === 'Quote AI' || (activeAgent === 'Universal' && (/\b(cctv|camera|construction|boq|quote|quotation)\b/i.test(q) || q.includes('कोटेशन')))) {
    agentName = 'Quote AI & Dynamic BoQ Engine';
    governanceLevel = 'DRAFT';
    replyText = language === 'hi'
      ? 'सीसीटीवी एवं इंफ्रास्ट्रक्चर एस्टीमेट तैयार: 4 एचडी नाइट विज़न कैमरा + 1TB सर्विलांस HDD + 4CH DVR = ₹12,499 (Same day installation included).'
      : 'Instant BoQ Generated: 4x HD Night-Vision Cameras + 1TB Surveillance HDD + 4CH DVR = ₹12,499 (Inclusive of cabling, installation & mobile live view setup).';
    suggestedAction = { label: 'View CCTV Packages', actionType: 'navigate', targetPayload: '/cctv' };
  } else if (activeAgent === 'Admin Copilot' || (activeAgent === 'Universal' && (/\b(pending|audit|commission|admin)\b/i.test(q) || q.includes('लंबित')))) {
    agentName = 'Admin Copilot & Enterprise Governance';
    governanceLevel = 'APPROVAL REQUIRED';
    replyText = language === 'hi'
      ? 'प्रशासनिक स्थिति: 2 सक्रिय आवेदन विचाराधीन हैं। वीएलई कमीशन बैच ऑटो-सुलझाव के लिए तैयार है। ऑडिट लॉग 100% सुचारू है।'
      : 'Executive Status: 2 applications currently pending review. VLE Commission batch settlement of ₹14,800 prepared for approval. Audit logs tamper-free.';
    suggestedAction = { label: 'Open Admin Portal', actionType: 'navigate', targetPayload: '/admin' };
  } else {
    agentName = 'Universal AI Assistant';
    governanceLevel = 'READ';
    replyText = language === 'hi'
      ? `नमस्ते! मैं कुल डिजिटल सेवाओं, कंपनी इनकॉर्पोरेशन, सरकारी योजनाओं और ट्रैकिंग में आपकी सहायता कर सकता हूँ। ("${message}")`
      : `AKUL DRAVIN CLOUD AI at your service. Orchestrating solutions for citizen services, legal incorporation, and logistics for: "${message}".`;
    suggestedAction = { label: 'Browse Marketplace', actionType: 'navigate', targetPayload: '/services' };
  }

  // Live Cloud AI Integration (Google Gemini API) if API key is provided
  let isLiveCloudAI = false;
  if (process.env.GEMINI_API_KEY) {
    try {
      const prompt = `You are the sovereign AI engine for AKUL DRAVIN CLOUD AI / DIGITAL SERVICES (भारत का अग्रणी डिजिटल सेवा एवं वैदिक ज्योतिष महामंच).
You act in the role of '${agentName}' (${activeAgent}).
Language requested: ${language === 'hi' ? 'Hindi (हिन्दी)' : 'English'}.
User message: "${message}".
Provide a concise, professional, authoritative, and helpful response suitable for enterprise citizen services, e-governance, CSC, and digital workflows in India. Keep response within 2-4 sentences.`;

      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
      const geminiRes = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 250, temperature: 0.4 }
        })
      });
      if (geminiRes.ok) {
        const data = await geminiRes.json();
        const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidateText && candidateText.trim()) {
          replyText = candidateText.trim();
          isLiveCloudAI = true;
        }
      }
    } catch (err) {
      console.warn('[Cloud AI] Gemini API call bypassed, falling back to heuristic brain:', err.message);
    }
  }

  res.json({
    success: true,
    agentName,
    text: replyText,
    governanceLevel,
    suggestedAction,
    isLiveCloudAI,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });
});

// 8. Document Scrutiny & Verhoeff Validation
app.post('/api/ai/document-scrutiny', (req, res) => {
  const { docType, docNumber } = req.body;
  const num = String(docNumber || '').trim();

  let isValid = false;
  let reason = '';

  if (docType === 'aadhaar') {
    const cleanNum = num.replace(/[\s-]/g, '');
    if (cleanNum.length !== 12 || !/^\d+$/.test(cleanNum)) {
      isValid = false;
      reason = 'Aadhaar must be exactly 12 digits.';
    } else {
      isValid = validateVerhoeff(cleanNum);
      reason = isValid ? 'Verhoeff group D5 mathematical checksum verified.' : 'Invalid Aadhaar Verhoeff checksum digit.';
    }
  } else if (docType === 'pan') {
    isValid = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(num.toUpperCase());
    reason = isValid ? 'Income Tax Department PAN format valid.' : 'Invalid PAN format. Must be 5 letters, 4 numbers, 1 letter (e.g. ABCDE1234F).';
  } else if (docType === 'gstin') {
    isValid = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(num.toUpperCase());
    reason = isValid ? 'Valid Indian GSTIN structure with valid state code prefix.' : 'Invalid GSTIN structure.';
  } else {
    isValid = num.length >= 4;
    reason = isValid ? 'Document format accepted.' : 'Invalid document number.';
  }

  res.json({
    success: true,
    docType,
    docNumber: num,
    isValid,
    reason,
    analyzedAt: new Date().toISOString()
  });
});

// 9. Audit Logs
app.get('/api/audit-logs', (req, res) => {
  const db = readDB();
  res.json({ success: true, count: db.auditLogs.length, auditLogs: db.auditLogs });
});

// 10. Super Admin Enterprise Stats
app.get('/api/stats', (req, res) => {
  const db = readDB();
  res.json({
    success: true,
    stats: {
      totalServices: db.services.length,
      totalApplications: db.applications.length,
      pendingApplications: db.applications.filter(a => a.status === 'SUBMITTED' || a.status === 'PROCESSING').length,
      approvedApplications: db.applications.filter(a => a.status === 'APPROVED' || a.status === 'COMPLETED').length,
      totalAuditLogs: db.auditLogs.length,
      totalTransactions: (db.transactions || []).length,
      platformStatus: 'OPERATIONAL 99.98%'
    }
  });
});

// 11. Unified Payments & UPI QR Gateway
app.post('/api/payments/create-order', (req, res) => {
  const { amount, currency = 'INR', customerName, customerPhone, items } = req.body;
  if (!amount || Number(amount) <= 0) {
    return res.status(400).json({ success: false, message: 'Valid payment amount required' });
  }

  const order = createPaymentOrder({ amount, currency, customerName, customerPhone, items });
  res.status(201).json({ success: true, order });
});

app.post('/api/payments/verify', (req, res) => {
  const db = readDB();
  const { orderId, paymentId, paymentMethod = 'upi', amount, items = [] } = req.body;

  const verification = verifyPayment({ orderId, paymentId, paymentMethod });

  if (!db.transactions) db.transactions = [];
  const txnRecord = {
    ...verification,
    amount: Number(amount) || 0,
    items,
    id: verification.paymentId
  };

  db.transactions.unshift(txnRecord);

  // Audit log
  db.auditLogs.unshift({
    id: 'AUD-' + Date.now(),
    action: `Payment Verified (₹${amount}) via ${paymentMethod.toUpperCase()}`,
    actor: 'Unified Payment Gateway',
    role: 'FINANCE_SYSTEM',
    target: verification.invoiceNumber,
    status: 'SUCCESS',
    timestamp: new Date().toISOString()
  });

  writeDB(db);

  // Broadcast real-time SSE event to all connected portals
  broadcastEvent('payment:completed', txnRecord);

  res.json({ success: true, transaction: txnRecord });
});

app.get('/api/payments/history', (req, res) => {
  const db = readDB();
  res.json({ success: true, count: (db.transactions || []).length, transactions: db.transactions || [] });
});

// 9. CRM Leads API
app.get('/api/crm/leads', (req, res) => {
  const db = readDB();
  res.json({ success: true, count: (db.crmLeads || []).length, leads: db.crmLeads || [] });
});

app.post('/api/crm/leads', (req, res) => {
  const db = readDB();
  if (!db.crmLeads) db.crmLeads = [];
  const newLead = {
    id: req.body.id || 'LEAD-' + Math.floor(1000 + Math.random() * 9000),
    name: req.body.name || 'New Client',
    company: req.body.company || 'Self / Individual',
    phone: req.body.phone || '',
    email: req.body.email || `${(req.body.name || 'client').toLowerCase().replace(/\s+/g, '')}@example.com`,
    serviceInterested: req.body.serviceInterested || 'General Service',
    estimatedValue: Number(req.body.estimatedValue) || 10000,
    stage: req.body.stage || 'New',
    assignedExecutive: req.body.assignedExecutive || 'Senior Account Manager',
    createdAt: new Date().toISOString()
  };
  db.crmLeads.unshift(newLead);
  writeDB(db);
  broadcastEvent('crm:lead_created', newLead);
  res.status(201).json({ success: true, lead: newLead });
});

app.patch('/api/crm/leads/:id/stage', (req, res) => {
  const db = readDB();
  if (!db.crmLeads) db.crmLeads = [];
  const lead = db.crmLeads.find(l => l.id === req.params.id);
  if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
  lead.stage = req.body.stage;
  writeDB(db);
  broadcastEvent('crm:stage_updated', lead);
  res.json({ success: true, lead });
});

// 10. Cyber Cafe Workstations API
app.get('/api/cyber-cafe/workstations', (req, res) => {
  const db = readDB();
  res.json({ success: true, count: (db.workstations || []).length, workstations: db.workstations || [] });
});

app.post('/api/cyber-cafe/workstations/:id/start', (req, res) => {
  const db = readDB();
  if (!db.workstations) db.workstations = [];
  let station = db.workstations.find(w => w.id === req.params.id);
  if (!station) {
    station = { id: req.params.id, status: 'available', ip: '192.168.1.10' };
    db.workstations.push(station);
  }
  station.status = 'in-use';
  station.currentSession = {
    customerName: req.body.customerName || 'Walk-in Citizen',
    phone: req.body.phone || '+91 98000 00000',
    startTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    elapsedMinutes: 1,
    activeTask: req.body.task || 'Internet & Digital Portal Access',
    hourlyRate: 40
  };
  writeDB(db);
  broadcastEvent('workstation:session_started', station);
  res.json({ success: true, station });
});

app.post('/api/cyber-cafe/workstations/:id/stop', (req, res) => {
  const db = readDB();
  if (!db.workstations) db.workstations = [];
  const station = db.workstations.find(w => w.id === req.params.id);
  if (!station) return res.status(404).json({ success: false, message: 'Station not found' });
  const bill = station.currentSession ? Math.max(20, Math.ceil((station.currentSession.elapsedMinutes / 60) * station.currentSession.hourlyRate)) : 40;
  station.status = 'available';
  station.currentSession = undefined;
  writeDB(db);
  broadcastEvent('workstation:session_stopped', { stationId: req.params.id, bill });
  res.json({ success: true, station, bill });
});

// 11. FinTech Double-Entry Ledger API
app.get('/api/finance/ledger', (req, res) => {
  const db = readDB();
  res.json({ success: true, count: (db.journals || []).length, journals: db.journals || [] });
});

app.post('/api/finance/ledger', (req, res) => {
  const db = readDB();
  if (!db.journals) db.journals = [];
  const { reference, description, lines = [] } = req.body;
  const totalDebit = lines.reduce((sum, l) => sum + (Number(l.debit) || 0), 0);
  const totalCredit = lines.reduce((sum, l) => sum + (Number(l.credit) || 0), 0);
  const balanced = Math.abs(totalDebit - totalCredit) < 0.01;

  const newJournal = {
    id: req.body.id || 'JRN-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000),
    date: req.body.date || new Date().toISOString().substring(0, 10),
    reference: reference || 'GEN-VCH',
    description: description || 'General Ledger Transaction',
    lines,
    totalDebit,
    totalCredit,
    balanced,
    cryptographicHash: 'hash_' + Math.random().toString(36).substring(2, 12)
  };

  db.journals.unshift(newJournal);
  writeDB(db);
  broadcastEvent('ledger:entry_posted', newJournal);
  res.status(201).json({ success: true, journal: newJournal });
});

// 12. Support & SLA Incident Tickets API
app.get('/api/support/tickets', (req, res) => {
  const db = readDB();
  res.json({ success: true, count: (db.tickets || []).length, tickets: db.tickets || [] });
});

app.post('/api/support/tickets', (req, res) => {
  const db = readDB();
  if (!db.tickets) db.tickets = [];
  const newTicket = {
    id: 'TKT-' + Math.floor(1000 + Math.random() * 9000),
    customerName: req.body.customerName || 'Citizen',
    customerPhone: req.body.customerPhone || '',
    serviceCategory: req.body.serviceCategory || 'General Assistance',
    subject: req.body.subject || 'Portal Issue',
    priority: req.body.priority || 'High',
    status: 'Open',
    assignedAgent: req.body.assignedAgent || 'Priority Desk Agent',
    slaRemainingHours: 4.0,
    createdAt: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    messages: [
      {
        sender: req.body.customerName || 'Citizen',
        role: 'Citizen',
        text: req.body.initialMessage || 'Assistance requested.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]
  };

  db.tickets.unshift(newTicket);
  writeDB(db);
  broadcastEvent('support:ticket_created', newTicket);
  res.status(201).json({ success: true, ticket: newTicket });
});

// 13. Marketing Automation Campaigns API
app.get('/api/marketing/campaigns', (req, res) => {
  const db = readDB();
  res.json({ success: true, count: (db.campaigns || []).length, campaigns: db.campaigns || [] });
});

app.post('/api/marketing/campaigns', (req, res) => {
  const db = readDB();
  if (!db.campaigns) db.campaigns = [];
  const newCampaign = {
    id: req.body.id || 'CMP-' + new Date().getFullYear() + '-' + Math.floor(10 + Math.random() * 90),
    name: req.body.name,
    channel: req.body.channel || 'WhatsApp Business',
    audienceSegment: req.body.audienceSegment || 'All Citizens',
    status: req.body.status || 'Scheduled',
    scheduledDate: req.body.scheduledDate || new Date().toISOString().substring(0, 10),
    targetCount: Number(req.body.targetCount) || 5000,
    sentCount: Number(req.body.sentCount) || 0,
    deliveredCount: Number(req.body.deliveredCount) || 0,
    conversionCount: Number(req.body.conversionCount) || 0,
    templateText: req.body.templateText || ''
  };

  db.campaigns.unshift(newCampaign);
  writeDB(db);
  broadcastEvent('marketing:campaign_created', newCampaign);
  res.status(201).json({ success: true, campaign: newCampaign });
});

// 14. White-Label SaaS Settings API
app.get('/api/admin/whitelabel', (req, res) => {
  const db = readDB();
  res.json({ success: true, config: db.whiteLabel || {} });
});

app.post('/api/admin/whitelabel', (req, res) => {
  const db = readDB();
  db.whiteLabel = { ...(db.whiteLabel || {}), ...req.body };
  writeDB(db);
  broadcastEvent('whitelabel:updated', db.whiteLabel);
  res.json({ success: true, config: db.whiteLabel });
});

// 14B. Citizen Document Vault & Upload Engine
app.get('/api/documents', (req, res) => {
  const db = readDB();
  res.json({ success: true, count: (db.documents || []).length, documents: db.documents || [] });
});

app.post('/api/documents/upload', (req, res) => {
  const { applicantName, docType, fileName, fileBase64, mimeType, serviceId } = req.body;
  if (!fileName) {
    return res.status(400).json({ success: false, message: 'File name is required' });
  }

  const db = readDB();
  if (!db.documents) db.documents = [];

  const docId = 'DOC-' + Date.now();
  let fileSize = 1024;

  if (fileBase64) {
    try {
      const buffer = Buffer.from(fileBase64.replace(/^data:[^;]+;base64,/, ''), 'base64');
      fileSize = buffer.length;
      if (fileSize > 10 * 1024 * 1024) {
        return res.status(413).json({ success: false, message: 'File exceeds 10MB limit' });
      }
      const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
      const filePath = path.join(VAULT_DIR, `${docId}_${safeName}`);
      fs.writeFileSync(filePath, buffer);
    } catch (err) {
      console.warn('Error saving vault file to disk:', err.message);
    }
  }

  const newDoc = {
    id: docId,
    applicantName: applicantName || 'Citizen Applicant',
    docType: docType || 'identity_proof',
    fileName,
    fileSize,
    mimeType: mimeType || 'application/pdf',
    uploadedAt: new Date().toISOString(),
    checksum: 'SHA256:' + Buffer.from(fileName + docId).toString('hex').slice(0, 16),
    status: 'VERIFIED',
    serviceId: serviceId || 'srv-general'
  };

  db.documents.unshift(newDoc);
  writeDB(db);
  broadcastEvent('document:uploaded', newDoc);
  res.status(201).json({ success: true, document: newDoc });
});

// 14C. Enterprise HRMS (Human Resource Management) API
app.get('/api/hrms/employees', (req, res) => {
  const db = readDB();
  res.json({ success: true, count: (db.employees || []).length, employees: db.employees || [] });
});

app.post('/api/hrms/employees', (req, res) => {
  const db = readDB();
  if (!db.employees) db.employees = [];
  const newEmp = {
    id: req.body.id || 'EMP-' + Math.floor(100 + Math.random() * 900),
    name: req.body.name,
    role: req.body.role || 'Associate',
    department: req.body.department || 'Operations',
    attendanceStatus: req.body.attendanceStatus || 'Present',
    phone: req.body.phone || '+91 98000 00000',
    email: req.body.email || `${(req.body.name || 'emp').toLowerCase().replace(/\s+/g, '')}@akuldravin.com`,
    joinDate: req.body.joinDate || new Date().toISOString().substring(0, 10),
    salary: Number(req.body.salary) || 30000
  };
  db.employees.unshift(newEmp);
  writeDB(db);
  broadcastEvent('hrms:employee_created', newEmp);
  res.status(201).json({ success: true, employee: newEmp });
});

app.post('/api/hrms/employees/:id/attendance', (req, res) => {
  const db = readDB();
  if (!db.employees) db.employees = [];
  const emp = db.employees.find(e => e.id === req.params.id);
  if (!emp) return res.status(404).json({ success: false, message: 'Employee not found' });
  const nextStatus = req.body.status || (emp.attendanceStatus === 'Present' ? 'Absent' : 'Present');
  emp.attendanceStatus = nextStatus;
  writeDB(db);
  broadcastEvent('hrms:attendance_updated', { id: emp.id, status: nextStatus, timestamp: new Date().toISOString() });
  res.json({ success: true, employee: emp });
});

// 14D. Enterprise ERP (Inventory & Stock Control) API
app.get('/api/erp/inventory', (req, res) => {
  const db = readDB();
  res.json({ success: true, count: (db.inventory || []).length, inventory: db.inventory || [] });
});

app.post('/api/erp/inventory', (req, res) => {
  const db = readDB();
  if (!db.inventory) db.inventory = [];
  const newItem = {
    id: req.body.id || 'INV-' + Math.floor(100 + Math.random() * 900),
    itemName: req.body.itemName,
    category: req.body.category || 'General',
    stockQuantity: Number(req.body.stockQuantity) || 0,
    unit: req.body.unit || 'Units',
    reorderLevel: Number(req.body.reorderLevel) || 10,
    unitPrice: Number(req.body.unitPrice) || 100
  };
  db.inventory.unshift(newItem);
  writeDB(db);
  broadcastEvent('erp:inventory_created', newItem);
  res.status(201).json({ success: true, item: newItem });
});

app.patch('/api/erp/inventory/:id/stock', (req, res) => {
  const db = readDB();
  if (!db.inventory) db.inventory = [];
  const item = db.inventory.find(i => i.id === req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Inventory item not found' });
  if (req.body.delta !== undefined) {
    item.stockQuantity = Math.max(0, item.stockQuantity + Number(req.body.delta));
  } else if (req.body.stockQuantity !== undefined) {
    item.stockQuantity = Math.max(0, Number(req.body.stockQuantity));
  }
  writeDB(db);
  broadcastEvent('erp:stock_updated', item);
  res.json({ success: true, item });
});

// 15. CSC Connect OAuth 2.0 & Digital Seva Engine
const DEFAULT_VLE_PROFILE = {
  cscId: '245089123456',
  vleName: 'Rajesh Sharma',
  email: 'vle.rajesh.sharma@csc.gov.in',
  phone: '9876543210',
  centerName: 'Akul Dravin Digital Seva Kendra',
  district: 'Patna',
  state: 'Bihar',
  pincode: '800001',
  walletBalance: 2450.00,
  digiPayTerminalId: 'DP-PATNA-0912',
  tecNumber: 'TEC-2024-889123',
  subOperators: [
    { id: 'OP-01', name: 'Manoj Kumar', phone: '9835112233', role: 'Operator', permissions: ['Banking', 'PanCard', 'Utility'] }
  ],
  passbook: [
    { id: 'TXN-PB-101', date: new Date().toISOString().split('T')[0], type: 'CR', description: 'Commission: Form 49A PAN Application', amount: 50, balance: 2450.00 },
    { id: 'TXN-PB-100', date: new Date().toISOString().split('T')[0], type: 'DR', description: 'Wallet Debit: Govt Fee for Birth Certificate', amount: 50, balance: 2400.00 }
  ]
};

app.post('/api/csc/authorize', (req, res) => {
  const { username, password, clientId, redirectUri, state } = req.body;
  if (!username) {
    return res.status(400).json({ success: false, message: 'CSC ID or Username is required' });
  }

  const authCode = 'csc_code_' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
  const db = readDB();
  if (!db.cscAuthCodes) db.cscAuthCodes = {};
  db.cscAuthCodes[authCode] = {
    username,
    clientId: clientId || '0f8ca686-5a31-46b8-bb51-d9834ba9fa9d',
    createdAt: Date.now()
  };
  writeDB(db);

  res.json({
    success: true,
    code: authCode,
    state: state || '89850',
    redirectUri: redirectUri || 'https://digitalseva.csc.gov.in/auth/callback/'
  });
});

app.post('/api/csc/token', (req, res) => {
  const { code } = req.body;
  const db = readDB();
  const dbVle = db.vleProfile || DEFAULT_VLE_PROFILE;

  const accessToken = 'csc_jwt_token_' + Math.random().toString(36).substring(2) + '_' + Date.now();
  res.json({
    success: true,
    tokenType: 'Bearer',
    accessToken,
    expiresIn: 86400,
    vle: dbVle
  });
});

app.get('/api/csc/vle-profile', (req, res) => {
  const db = readDB();
  res.json({ success: true, vle: db.vleProfile || DEFAULT_VLE_PROFILE });
});

app.post('/api/csc/wallet/topup', (req, res) => {
  const { amount, paymentMethod = 'UPI' } = req.body;
  const numAmount = Number(amount);
  if (!numAmount || numAmount <= 0) {
    return res.status(400).json({ success: false, message: 'Valid amount is required' });
  }

  const db = readDB();
  if (!db.vleProfile) db.vleProfile = { ...DEFAULT_VLE_PROFILE };
  db.vleProfile.walletBalance = Number((db.vleProfile.walletBalance + numAmount).toFixed(2));
  
  const passbookEntry = {
    id: 'TXN-PB-' + Math.floor(1000 + Math.random() * 9000),
    date: new Date().toISOString().split('T')[0],
    type: 'CR',
    description: `Wallet Top-up via ${paymentMethod}`,
    amount: numAmount,
    balance: db.vleProfile.walletBalance
  };
  db.vleProfile.passbook.unshift(passbookEntry);
  writeDB(db);

  broadcastEvent('csc:wallet_updated', { walletBalance: db.vleProfile.walletBalance, entry: passbookEntry });
  res.json({ success: true, walletBalance: db.vleProfile.walletBalance, entry: passbookEntry });
});

app.post('/api/csc/operators', (req, res) => {
  const { name, phone, permissions = ['General'] } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ success: false, message: 'Name and phone are required' });
  }

  const db = readDB();
  if (!db.vleProfile) db.vleProfile = { ...DEFAULT_VLE_PROFILE };
  const newOp = {
    id: 'OP-0' + (db.vleProfile.subOperators.length + 1),
    name,
    phone,
    role: 'Operator',
    permissions
  };
  db.vleProfile.subOperators.push(newOp);
  writeDB(db);

  res.status(201).json({ success: true, operator: newOp, total: db.vleProfile.subOperators.length });
});

app.post('/api/csc/register-vle', (req, res) => {
  const { tecNumber, name, mobile, email, state, district, centerAddress, latitude, longitude } = req.body;
  if (!tecNumber || !mobile) {
    return res.status(400).json({ success: false, message: 'TEC Certificate Number and Mobile are required' });
  }

  const db = readDB();
  if (!db.vleRegistrations) db.vleRegistrations = [];
  const refNumber = 'VLE-REG-' + new Date().getFullYear() + '-' + Math.floor(10000 + Math.random() * 90000);
  const registration = {
    refNumber,
    tecNumber,
    name: name || 'Applicant VLE',
    mobile,
    email,
    state,
    district,
    centerAddress,
    coordinates: { latitude: latitude || 25.5941, longitude: longitude || 85.1376 },
    status: 'SUBMITTED',
    stage: 'Under District Manager Verification',
    submittedAt: new Date().toISOString()
  };
  db.vleRegistrations.unshift(registration);
  writeDB(db);

  res.status(201).json({ success: true, registration });
});

// 16. DigiPay AEPS Engine (digipay.csccloud.in)
app.post('/api/csc/digipay/transact', (req, res) => {
  const { aadhaar, bankName, txnType = 'withdrawal', amount = 1000 } = req.body;
  const cleanAadhaar = String(aadhaar || '').replace(/\s+/g, '');
  
  if (cleanAadhaar.length !== 12 || !validateVerhoeff(cleanAadhaar)) {
    return res.status(400).json({ success: false, message: 'Invalid Aadhaar UID Verhoeff checksum digit' });
  }

  const rrn = 'NPCI' + Math.floor(100000000000 + Math.random() * 900000000000);
  const authCode = 'AUTH' + Math.floor(100000 + Math.random() * 900000);
  const commission = txnType === 'withdrawal' ? 15 : txnType === 'statement' ? 5 : 2;

  const db = readDB();
  if (!db.vleProfile) db.vleProfile = { ...DEFAULT_VLE_PROFILE };
  db.vleProfile.walletBalance = Number((db.vleProfile.walletBalance + commission).toFixed(2));

  const passbookEntry = {
    id: 'TXN-DP-' + Math.floor(1000 + Math.random() * 9000),
    date: new Date().toISOString().split('T')[0],
    type: 'CR',
    desc: `DigiPay AEPS ${txnType.toUpperCase()} Commission (${bankName})`,
    amount: commission,
    balance: db.vleProfile.walletBalance
  };
  db.vleProfile.passbook.unshift(passbookEntry);
  writeDB(db);

  broadcastEvent('csc:digipay_transaction', { rrn, txnType, amount, commission });

  res.json({
    success: true,
    rrn,
    authCode,
    txnType,
    amount: Number(amount),
    bankName: bankName || 'State Bank of India',
    vleCommission: commission,
    vleNewBalance: db.vleProfile.walletBalance,
    terminalId: db.vleProfile.digiPayTerminalId,
    customerRemainingBalance: Math.floor(4500 + Math.random() * 25000),
    timestamp: new Date().toISOString()
  });
});

// 17. Tele-Law Legal Aid Consultation (tele-law.in)
app.post('/api/csc/telelaw/book', (req, res) => {
  const { citizenName, phone, disputeType, advocateName, notes } = req.body;
  if (!citizenName || !phone) {
    return res.status(400).json({ success: false, message: 'Citizen Name and Phone are required' });
  }

  const caseId = 'TL-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
  const consultation = {
    caseId,
    citizenName,
    phone,
    disputeType: disputeType || 'Land & Revenue Conflict',
    advocateName: advocateName || 'Adv. R. C. Mishra (State Legal Services Authority)',
    status: 'SCHEDULED',
    scheduledTime: new Date(Date.now() + 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    notes,
    createdAt: new Date().toISOString()
  };

  const db = readDB();
  if (!db.telelawCases) db.telelawCases = [];
  db.telelawCases.unshift(consultation);
  writeDB(db);

  broadcastEvent('csc:telelaw_booked', consultation);
  res.status(201).json({ success: true, consultation });
});

// 18. PMGDISHA Digital Literacy Candidate Certification (pmgdisha.in)
app.post('/api/csc/pmgdisha/certify', (req, res) => {
  const { candidateName, aadhaar, modulesCompleted = 5 } = req.body;
  if (!candidateName) {
    return res.status(400).json({ success: false, message: 'Candidate name is required' });
  }

  const certNumber = 'PMGD-' + new Date().getFullYear() + '-' + Math.floor(100000 + Math.random() * 900000);
  const db = readDB();
  if (!db.vleProfile) db.vleProfile = { ...DEFAULT_VLE_PROFILE };
  const vleIncentive = 300; // Rs 300 per PMGDISHA certified rural citizen
  db.vleProfile.walletBalance = Number((db.vleProfile.walletBalance + vleIncentive).toFixed(2));

  const passbookEntry = {
    id: 'TXN-PMG-' + Math.floor(1000 + Math.random() * 9000),
    date: new Date().toISOString().split('T')[0],
    type: 'CR',
    desc: `PMGDISHA VLE Training Incentive: Candidate ${candidateName}`,
    amount: vleIncentive,
    balance: db.vleProfile.walletBalance
  };
  db.vleProfile.passbook.unshift(passbookEntry);
  writeDB(db);

  broadcastEvent('csc:pmgdisha_certified', { certNumber, candidateName, vleIncentive });

  res.status(201).json({
    success: true,
    certificate: {
      certificateNumber: certNumber,
      candidateName,
      grade: 'Grade A (Qualified)',
      modulesCompleted,
      vleIncentiveCredited: vleIncentive,
      issuedAt: new Date().toISOString()
    }
  });
});

// 19. Ayushman Bharat Digital Mission (ABDM) ABHA Health Card Generator
app.post('/api/csc/abha/create', (req, res) => {
  const { name, aadhaar, mobile, dob, gender = 'Male' } = req.body;
  if (!name || !aadhaar) {
    return res.status(400).json({ success: false, message: 'Citizen Name and Aadhaar are required' });
  }

  const cleanAadhaar = String(aadhaar).replace(/\s+/g, '');
  if (cleanAadhaar.length === 12 && !validateVerhoeff(cleanAadhaar)) {
    return res.status(400).json({ success: false, message: 'Invalid Aadhaar checksum (Verhoeff validation failed)' });
  }

  const abhaNumber = `91-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
  const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 10);
  const abhaAddress = `${cleanName}${Math.floor(10 + Math.random() * 90)}@abdm`;

  const db = readDB();
  if (!db.vleProfile) db.vleProfile = { ...DEFAULT_VLE_PROFILE };
  const vleCommission = 50; // Rs 50 VLE commission for ABHA Card generation
  db.vleProfile.walletBalance = Number((db.vleProfile.walletBalance + vleCommission).toFixed(2));

  const passbookEntry = {
    id: 'TXN-ABHA-' + Math.floor(1000 + Math.random() * 9000),
    date: new Date().toISOString().split('T')[0],
    type: 'CR',
    desc: `Ayushman ABHA Card Creation: ${name} (${abhaAddress})`,
    amount: vleCommission,
    balance: db.vleProfile.walletBalance
  };
  db.vleProfile.passbook.unshift(passbookEntry);
  writeDB(db);

  broadcastEvent('csc:abha_created', { abhaNumber, abhaAddress, citizenName: name, vleCommission });

  res.status(201).json({
    success: true,
    card: {
      abhaNumber,
      abhaAddress,
      citizenName: name,
      gender,
      dob: dob || '01/01/1990',
      mobile: mobile || '9876543210',
      maskedAadhaar: `XXXX-XXXX-${cleanAadhaar.slice(-4)}`,
      scheme: 'National Health Authority (NHA) • ABDM',
      qrPayload: `ABDM|${abhaNumber}|${abhaAddress}|${name}|ACTIVE`,
      issuedAt: new Date().toISOString(),
      vleCommissionCredited: vleCommission,
      vleNewBalance: db.vleProfile.walletBalance
    }
  });
});

// 20. PM-KISAN Samman Nidhi eKYC & Beneficiary Service (pmkisan.gov.in)
app.post('/api/csc/pmkisan/ekyc', (req, res) => {
  const { aadhaar, farmerName = 'Ramesh Chandra Yadav', mobile = '9835002244' } = req.body;
  const cleanAadhaar = String(aadhaar || '').replace(/\s+/g, '');
  if (!cleanAadhaar || cleanAadhaar.length !== 12) {
    return res.status(400).json({ success: false, message: 'Valid 12-digit Aadhaar number is required' });
  }

  if (!validateVerhoeff(cleanAadhaar)) {
    return res.status(400).json({ success: false, message: 'Invalid Aadhaar checksum (Verhoeff validation failed)' });
  }

  const token = 'PMK-EKYC-2026-' + Math.floor(100000 + Math.random() * 900000);
  const db = readDB();
  if (!db.vleProfile) db.vleProfile = { ...DEFAULT_VLE_PROFILE };
  const vleCommission = 15; // Rs 15 commission per eKYC update
  db.vleProfile.walletBalance = Number((db.vleProfile.walletBalance + vleCommission).toFixed(2));

  const passbookEntry = {
    id: 'TXN-PMK-' + Math.floor(1000 + Math.random() * 9000),
    date: new Date().toISOString().split('T')[0],
    type: 'CR',
    desc: `PM-KISAN eKYC Verification: ${farmerName} (Aadhaar: ...${cleanAadhaar.slice(-4)})`,
    amount: vleCommission,
    balance: db.vleProfile.walletBalance
  };
  db.vleProfile.passbook.unshift(passbookEntry);
  writeDB(db);

  broadcastEvent('csc:pmkisan_ekyc_done', { token, farmerName, cleanAadhaar, vleCommission });

  res.status(200).json({
    success: true,
    ekyc: {
      ackToken: token,
      farmerName,
      maskedAadhaar: `XXXX-XXXX-${cleanAadhaar.slice(-4)}`,
      mobile,
      landSeeding: 'YES (Verified by District Revenue Dept)',
      dbtStatus: 'ACTIVE (Aadhaar-Seeded DBT Account)',
      ekycStatus: 'COMPLETED (SUCCESSFULLY VERIFIED)',
      totalInstallmentsPaid: 17,
      totalAmountDisbursed: 34000,
      nextInstallmentStatus: 'ELIGIBLE FOR UPCOMING RELEASE',
      verifiedAt: new Date().toISOString(),
      vleCommissionCredited: vleCommission,
      vleNewBalance: db.vleProfile.walletBalance
    }
  });
});

// 21. NPCI NETC FASTag Electronic Toll Services (fastag.csccloud.in)
app.post('/api/csc/fastag/transact', (req, res) => {
  const { vehicleNumber, txnType = 'recharge', amount = 500, customerName = 'Amit Vikram' } = req.body;
  if (!vehicleNumber) {
    return res.status(400).json({ success: false, message: 'Vehicle registration number is required' });
  }

  const cleanVehicle = String(vehicleNumber).toUpperCase().trim();
  const numAmount = Number(amount);
  const tagId = 'NETC-TAG-' + Math.floor(10000000 + Math.random() * 90000000);
  const npciTxnId = 'NPCI-FASTAG-' + Math.floor(1000000000 + Math.random() * 9000000000);

  const db = readDB();
  if (!db.vleProfile) db.vleProfile = { ...DEFAULT_VLE_PROFILE };
  const vleCommission = txnType === 'issue' ? 40 : 15;
  db.vleProfile.walletBalance = Number((db.vleProfile.walletBalance + vleCommission).toFixed(2));

  const passbookEntry = {
    id: 'TXN-FT-' + Math.floor(1000 + Math.random() * 9000),
    date: new Date().toISOString().split('T')[0],
    type: 'CR',
    desc: `FASTag ${txnType.toUpperCase()}: ${cleanVehicle} (${customerName})`,
    amount: vleCommission,
    balance: db.vleProfile.walletBalance
  };
  db.vleProfile.passbook.unshift(passbookEntry);
  writeDB(db);

  broadcastEvent('csc:fastag_done', { tagId, npciTxnId, vehicleNumber: cleanVehicle, vleCommission });

  res.status(200).json({
    success: true,
    fastag: {
      tagId,
      npciTxnId,
      vehicleNumber: cleanVehicle,
      customerName,
      vehicleClass: 'VC4 (Car / Jeep / Van)',
      txnType: txnType.toUpperCase(),
      amount: numAmount,
      tagBalance: 1250.00,
      status: 'ACTIVE & TOLL-READY',
      issuedAt: new Date().toISOString(),
      vleCommissionCredited: vleCommission,
      vleNewBalance: db.vleProfile.walletBalance
    }
  });
});

// 22. IRCTC Railway Ticket Reservation Engine (irctc.csccloud.in)
app.post('/api/csc/irctc/book', (req, res) => {
  const { 
    trainNumber = '12309 (Rajdhani Express)', 
    fromStation = 'NDLS - New Delhi', 
    toStation = 'PNBE - Patna Jn', 
    passengerName = 'Sanjay Kumar', 
    journeyClass = '3A', 
    journeyDate = '2026-11-20',
    quota = 'General'
  } = req.body;

  if (!passengerName) {
    return res.status(400).json({ success: false, message: 'Passenger name is required' });
  }

  const pnr = '245-' + Math.floor(1000000 + Math.random() * 9000000);
  const coach = journeyClass === '3A' ? 'B3' : journeyClass === '2A' ? 'A1' : 'S4';
  const berth = Math.floor(10 + Math.random() * 60) + ' (LB - Lower Berth)';
  const fare = journeyClass === '3A' ? 1650 : journeyClass === '2A' ? 2450 : 540;
  const vleCommission = journeyClass === 'SL' ? 20 : 40;

  const db = readDB();
  if (!db.vleProfile) db.vleProfile = { ...DEFAULT_VLE_PROFILE };
  db.vleProfile.walletBalance = Number((db.vleProfile.walletBalance + vleCommission).toFixed(2));

  const passbookEntry = {
    id: 'TXN-RAIL-' + Math.floor(1000 + Math.random() * 9000),
    date: new Date().toISOString().split('T')[0],
    type: 'CR',
    desc: `IRCTC Booking Comm: PNR ${pnr} (${passengerName})`,
    amount: vleCommission,
    balance: db.vleProfile.walletBalance
  };
  db.vleProfile.passbook.unshift(passbookEntry);
  writeDB(db);

  broadcastEvent('csc:irctc_booked', { pnr, passengerName, trainNumber, vleCommission });

  res.status(201).json({
    success: true,
    ticket: {
      pnr,
      trainNumber,
      trainName: 'Patna Tejas Rajdhani Express',
      fromStation,
      toStation,
      passengerName,
      age: 38,
      gender: 'Male',
      journeyDate,
      journeyClass,
      quota,
      bookingStatus: `CNF / ${coach} / ${berth}`,
      currentStatus: 'CONFIRMED',
      fare,
      chartStatus: 'CHART NOT PREPARED',
      qrPayload: `IRCTC|PNR:${pnr}|TRAIN:12309|DATE:${journeyDate}|STATUS:CNF`,
      bookedAt: new Date().toISOString(),
      vleCommissionCredited: vleCommission,
      vleNewBalance: db.vleProfile.walletBalance
    }
  });
});

// 23. UTIITSL / NSDL PAN Card Services Engine (pan.csccloud.in)
app.post('/api/csc/pan/apply', (req, res) => {
  const { 
    applicantName = 'Vikramaditya Sharma', 
    fatherName = 'Rajendra Prasad Sharma', 
    aadhaar = '999999990019', 
    dob = '1992-05-14',
    panType = 'Form 49A (New Indian Citizen)',
    cardMode = 'Both Physical PAN Card & e-PAN'
  } = req.body;

  const cleanAadhaar = String(aadhaar || '').replace(/\s+/g, '');
  if (!applicantName || cleanAadhaar.length !== 12) {
    return res.status(400).json({ success: false, message: 'Valid Applicant Name and 12-digit Aadhaar are required' });
  }

  if (!validateVerhoeff(cleanAadhaar)) {
    return res.status(400).json({ success: false, message: 'Invalid Aadhaar checksum (Verhoeff validation failed)' });
  }

  const ackNumber = '8810' + Math.floor(10000000000 + Math.random() * 90000000000);
  const couponNumber = 'U-2026-' + Math.floor(100000 + Math.random() * 900000);
  const govtFee = 107;
  const vleCommission = 50;

  const db = readDB();
  if (!db.vleProfile) db.vleProfile = { ...DEFAULT_VLE_PROFILE };
  // Wallet receives commission
  db.vleProfile.walletBalance = Number((db.vleProfile.walletBalance + vleCommission).toFixed(2));

  const passbookEntry = {
    id: 'TXN-PAN-' + Math.floor(1000 + Math.random() * 9000),
    date: new Date().toISOString().split('T')[0],
    type: 'CR',
    desc: `UTIITSL PAN Comm: Coupon ${couponNumber} (${applicantName})`,
    amount: vleCommission,
    balance: db.vleProfile.walletBalance
  };
  db.vleProfile.passbook.unshift(passbookEntry);
  writeDB(db);

  broadcastEvent('csc:pan_filed', { ackNumber, couponNumber, applicantName, vleCommission });

  res.status(201).json({
    success: true,
    pan: {
      ackNumber,
      couponNumber,
      applicantName,
      fatherName,
      dob,
      maskedAadhaar: `XXXX-XXXX-${cleanAadhaar.slice(-4)}`,
      panType,
      cardMode,
      applicationFee: govtFee,
      aoCode: 'PTN-W-104-1 (Ward 4(1), Patna)',
      status: 'VERIFIED & DISPATCHED TO INCOME TAX DEPT (CBDT)',
      expectedDelivery: '3 - 5 Working Days (Digital e-PAN to Email)',
      filedAt: new Date().toISOString(),
      vleCommissionCredited: vleCommission,
      vleNewBalance: db.vleProfile.walletBalance
    }
  });
});

// 24. e-District State Citizen Services Engine (edistrict.csccloud.in)
app.post('/api/csc/edistrict/apply', (req, res) => {
  const {
    certificateType = 'Residential / Domicile Certificate (निवास प्रमाण पत्र)',
    applicantName = 'Pooja Kumari',
    fatherName = 'Sunil Kumar',
    aadhaar = '999999990019',
    district = 'Patna',
    tehsil = 'Danapur',
    annualIncome = '₹1,80,000'
  } = req.body;

  const cleanAadhaar = String(aadhaar || '').replace(/\s+/g, '');
  if (!applicantName || cleanAadhaar.length !== 12) {
    return res.status(400).json({ success: false, message: 'Valid Applicant Name and 12-digit Aadhaar are required' });
  }

  if (!validateVerhoeff(cleanAadhaar)) {
    return res.status(400).json({ success: false, message: 'Invalid Aadhaar checksum (Verhoeff validation failed)' });
  }

  const certificateNumber = 'ED-2026-' + Math.floor(100000 + Math.random() * 900000);
  const vleCommission = 30;

  const db = readDB();
  if (!db.vleProfile) db.vleProfile = { ...DEFAULT_VLE_PROFILE };
  db.vleProfile.walletBalance = Number((db.vleProfile.walletBalance + vleCommission).toFixed(2));

  const passbookEntry = {
    id: 'TXN-ED-' + Math.floor(1000 + Math.random() * 9000),
    date: new Date().toISOString().split('T')[0],
    type: 'CR',
    desc: `e-District Service Comm: ${certificateType.split('(')[0].trim()} (${applicantName})`,
    amount: vleCommission,
    balance: db.vleProfile.walletBalance
  };
  db.vleProfile.passbook.unshift(passbookEntry);
  writeDB(db);

  broadcastEvent('csc:edistrict_applied', { certificateNumber, certificateType, applicantName, vleCommission });

  res.status(201).json({
    success: true,
    certificate: {
      certificateNumber,
      certificateType,
      applicantName,
      fatherName,
      district,
      tehsil,
      annualIncome,
      maskedAadhaar: `XXXX-XXXX-${cleanAadhaar.slice(-4)}`,
      issuingAuthority: 'Sub-Divisional Magistrate (SDM) / Revenue Officer, Danapur',
      status: 'DIGITALLY SIGNED & VERIFIED',
      validity: 'Valid across Central & State Govt Institutions',
      issuedAt: new Date().toISOString(),
      qrPayload: `EDISTRICT|CERT:${certificateNumber}|NAME:${applicantName}|DEPT:REVENUE|VERIFIED`,
      vleCommissionCredited: vleCommission,
      vleNewBalance: db.vleProfile.walletBalance
    }
  });
});

// 25. e-Shram National Database of Unorganized Workers (eshram.csccloud.in)
app.post('/api/csc/eshram/enroll', (req, res) => {
  const {
    workerName = 'Manoj Kumar Paswan',
    aadhaar = '999999990019',
    mobile = '9835003344',
    occupation = 'Construction / Bricklayer & Mason (राजमिस्त्री)',
    bloodGroup = 'O+'
  } = req.body;

  const cleanAadhaar = String(aadhaar || '').replace(/\s+/g, '');
  if (!workerName || cleanAadhaar.length !== 12) {
    return res.status(400).json({ success: false, message: 'Valid Worker Name and 12-digit Aadhaar are required' });
  }

  if (!validateVerhoeff(cleanAadhaar)) {
    return res.status(400).json({ success: false, message: 'Invalid Aadhaar checksum (Verhoeff validation failed)' });
  }

  const uanNumber = `1009 ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`;
  const vleCommission = 40; // Rs 40 VLE commission for e-Shram registration

  const db = readDB();
  if (!db.vleProfile) db.vleProfile = { ...DEFAULT_VLE_PROFILE };
  db.vleProfile.walletBalance = Number((db.vleProfile.walletBalance + vleCommission).toFixed(2));

  const passbookEntry = {
    id: 'TXN-ESH-' + Math.floor(1000 + Math.random() * 9000),
    date: new Date().toISOString().split('T')[0],
    type: 'CR',
    desc: `e-Shram UAN Card Comm: ${workerName} (UAN: ${uanNumber})`,
    amount: vleCommission,
    balance: db.vleProfile.walletBalance
  };
  db.vleProfile.passbook.unshift(passbookEntry);
  writeDB(db);

  broadcastEvent('csc:eshram_enrolled', { uanNumber, workerName, occupation, vleCommission });

  res.status(201).json({
    success: true,
    eshram: {
      uanNumber,
      workerName,
      maskedAadhaar: `XXXX-XXXX-${cleanAadhaar.slice(-4)}`,
      mobile,
      occupation,
      bloodGroup,
      benefit: 'Pradhan Mantri Suraksha Bima Yojana (PMSBY) ₹2.00 Lakh Cover Included',
      status: 'ACTIVE & ENROLLED IN NDUW',
      issuedAt: new Date().toISOString(),
      qrPayload: `ESHRAM|UAN:${uanNumber.replace(/\s+/g, '')}|NAME:${workerName}|OCC:${occupation}|ACTIVE`,
      vleCommissionCredited: vleCommission,
      vleNewBalance: db.vleProfile.walletBalance
    }
  });
});

// 26. Pradhan Mantri Fasal Bima Yojana (pmfby.gov.in / insurance.csccloud.in)
app.post('/api/csc/pmfby/apply', (req, res) => {
  const {
    farmerName = 'Ramdhani Yadav',
    aadhaar = '999999990019',
    mobile = '9835012345',
    state = 'Bihar',
    district = 'Patna',
    village = 'Danapur Cantonment',
    khasraKhatauni = 'Khata: 142 / Khasra: 589/2',
    season = 'Kharif 2026',
    cropName = 'Paddy / धान (Fine Variety)',
    areaHectares = 2.5,
    sumInsured = 125000,
    insuranceCompany = 'Agriculture Insurance Company of India Ltd (AIC)'
  } = req.body;

  const cleanAadhaar = String(aadhaar || '').replace(/\s+/g, '');
  if (!farmerName || cleanAadhaar.length !== 12) {
    return res.status(400).json({ success: false, message: 'Farmer name and 12-digit Aadhaar are required' });
  }

  if (!validateVerhoeff(cleanAadhaar)) {
    return res.status(400).json({ success: false, message: 'Invalid Aadhaar checksum (Verhoeff validation failed)' });
  }

  const policyNumber = 'PMFBY-2026-' + Math.floor(100000 + Math.random() * 900000);
  const farmerRate = season.toLowerCase().includes('rabi') ? 0.015 : 0.02; // 1.5% Rabi, 2% Kharif
  const farmerPremium = Math.round(sumInsured * farmerRate);
  const govtSubsidy = Math.round(sumInsured * 0.08); // 8% Govt subsidy share
  const totalPremium = farmerPremium + govtSubsidy;
  const vleCommission = 100; // Rs 100 VLE commission for Crop Insurance filing

  const db = readDB();
  if (!db.vleProfile) db.vleProfile = { ...DEFAULT_VLE_PROFILE };
  db.vleProfile.walletBalance = Number((db.vleProfile.walletBalance + vleCommission).toFixed(2));

  const passbookEntry = {
    id: 'TXN-FBY-' + Math.floor(1000 + Math.random() * 9000),
    date: new Date().toISOString().split('T')[0],
    type: 'CR',
    desc: `PMFBY Crop Insurance Comm: ${farmerName} (${cropName})`,
    amount: vleCommission,
    balance: db.vleProfile.walletBalance
  };
  db.vleProfile.passbook.unshift(passbookEntry);
  writeDB(db);

  broadcastEvent('csc:pmfby_applied', { policyNumber, farmerName, cropName, sumInsured, vleCommission });

  res.status(201).json({
    success: true,
    policy: {
      policyNumber,
      farmerName,
      maskedAadhaar: `XXXX-XXXX-${cleanAadhaar.slice(-4)}`,
      mobile,
      state,
      district,
      village,
      khasraKhatauni,
      season,
      cropName,
      areaHectares,
      sumInsured,
      farmerPremium,
      govtSubsidy,
      totalPremium,
      insuranceCompany,
      status: 'POLICY ISSUED & COVERED UNDER PMFBY',
      issuedAt: new Date().toISOString(),
      qrPayload: `PMFBY|POLICY:${policyNumber}|FARMER:${farmerName}|CROP:${cropName}|SUM:${sumInsured}|ACTIVE`,
      vleCommissionCredited: vleCommission,
      vleNewBalance: db.vleProfile.walletBalance
    }
  });
});

// 27. Bharat Bill Payment System - Bill Fetch (bbps.csccloud.in / bharatbillpay.com)
app.post('/api/csc/bbps/fetch', (req, res) => {
  const {
    category = 'Electricity',
    billerName = 'South Bihar Power Distribution Co. Ltd (SBPDCL)',
    consumerNumber = '104859302194'
  } = req.body;

  if (!consumerNumber || consumerNumber.trim().length < 5) {
    return res.status(400).json({ success: false, message: 'Valid Consumer / Account Number is required' });
  }

  const hash = Array.from(consumerNumber).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const sampleAmounts = [1480, 2350, 890, 3120, 1740, 650];
  const billAmount = sampleAmounts[hash % sampleAmounts.length];
  const sampleNames = ['Mahendra Pratap Singh', 'Sunil Kumar Sharma', 'Shanti Devi', 'Rajendra Prasad Verma', 'Anand Kumar Mishra'];
  const consumerName = sampleNames[hash % sampleNames.length];

  const now = new Date();
  const billDate = new Date(now.getFullYear(), now.getMonth(), 5).toISOString().split('T')[0];
  const dueDate = new Date(now.getFullYear(), now.getMonth(), 25).toISOString().split('T')[0];

  res.json({
    success: true,
    bill: {
      category,
      billerName,
      consumerNumber,
      consumerName,
      billNumber: 'BILL-2026-' + Math.floor(100000 + Math.random() * 900000),
      billDate,
      dueDate,
      billAmount,
      currency: 'INR',
      status: 'UNPAID',
      billerStatus: 'ACTIVE & CONNECTED TO NPCI BBPS'
    }
  });
});

// 28. Bharat Bill Payment System - Instant Bill Payment Settlement
app.post('/api/csc/bbps/pay', (req, res) => {
  const {
    category = 'Electricity',
    billerName = 'South Bihar Power Distribution Co. Ltd (SBPDCL)',
    consumerNumber = '104859302194',
    consumerName = 'Mahendra Pratap Singh',
    consumerMobile = '9835012345',
    billAmount = 1480
  } = req.body;

  const parsedAmount = Number(billAmount);
  if (!consumerNumber || isNaN(parsedAmount) || parsedAmount <= 0) {
    return res.status(400).json({ success: false, message: 'Valid Consumer Number and positive Bill Amount are required' });
  }

  const db = readDB();
  if (!db.vleProfile) db.vleProfile = { ...DEFAULT_VLE_PROFILE };

  if (db.vleProfile.walletBalance < parsedAmount) {
    return res.status(400).json({
      success: false,
      message: `Insufficient VLE wallet balance. Required: ₹${parsedAmount}, Available: ₹${db.vleProfile.walletBalance}. Please top up your wallet.`
    });
  }

  const vleCommission = 20; // Rs 20 BBPS VLE Commission per successful bill payment
  // Net deduction: billAmount deducted, then commission credited
  db.vleProfile.walletBalance = Number((db.vleProfile.walletBalance - parsedAmount + vleCommission).toFixed(2));

  const bbpsTxnRef = 'BBPS-2026-' + Math.floor(1000000000 + Math.random() * 9000000000);
  const authCode = 'AUTH-BBP-' + Math.floor(100000 + Math.random() * 900000);

  // Add Debit Passbook Entry for Bill Payment
  db.vleProfile.passbook.unshift({
    id: 'TXN-BBP-D-' + Math.floor(1000 + Math.random() * 9000),
    date: new Date().toISOString().split('T')[0],
    type: 'DR',
    desc: `BBPS ${category} Bill: ${billerName} (A/C: ${consumerNumber})`,
    amount: parsedAmount,
    balance: Number((db.vleProfile.walletBalance - vleCommission).toFixed(2))
  });

  // Add Credit Passbook Entry for VLE Commission
  db.vleProfile.passbook.unshift({
    id: 'TXN-BBP-C-' + Math.floor(1000 + Math.random() * 9000),
    date: new Date().toISOString().split('T')[0],
    type: 'CR',
    desc: `BBPS VLE Commission: ${consumerName} (${billerName})`,
    amount: vleCommission,
    balance: db.vleProfile.walletBalance
  });

  writeDB(db);

  broadcastEvent('csc:bbps_paid', { bbpsTxnRef, billerName, consumerNumber, billAmount: parsedAmount, vleCommission });

  res.status(201).json({
    success: true,
    receipt: {
      bbpsTxnRef,
      authCode,
      category,
      billerName,
      consumerNumber,
      consumerName,
      consumerMobile,
      billAmount: parsedAmount,
      convenienceFee: 0.00,
      totalPaid: parsedAmount,
      paymentMode: 'CSC_VLE_WALLET_AGENT',
      paymentTimestamp: new Date().toISOString(),
      status: 'PAYMENT SUCCESSFUL & NPCI SETTLED',
      qrPayload: `BBPS|TXN:${bbpsTxnRef}|BILLER:${billerName}|AC:${consumerNumber}|AMT:${parsedAmount}|STATUS:PAID`,
      vleCommissionCredited: vleCommission,
      vleNewBalance: db.vleProfile.walletBalance
    }
  });
});

// 29. Aadhaar Update Client Lite - UCL Demographic & Document Update (ucl.csccloud.in / uidai.gov.in)
app.post('/api/csc/ucl/update', (req, res) => {
  const {
    residentName = 'Sanjay Kumar Verma',
    aadhaar = '999999990019',
    mobile = '9835099887',
    updateType = 'Mobile Number Linking',
    documentType = 'Ration Card / Electricity Bill (Valid Proof of Address)',
    newDetail = 'Mobile updated to +91 9835099887'
  } = req.body;

  const cleanAadhaar = String(aadhaar || '').replace(/\s+/g, '');
  if (!residentName || cleanAadhaar.length !== 12) {
    return res.status(400).json({ success: false, message: 'Valid Resident Name and 12-digit Aadhaar are required' });
  }

  if (!validateVerhoeff(cleanAadhaar)) {
    return res.status(400).json({ success: false, message: 'Invalid Aadhaar checksum (Verhoeff validation failed)' });
  }

  const now = new Date();
  const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
  
  // Official UIDAI 28-Digit Enrolment ID (EID): 14-digit numeric + 14-digit timestamp
  const eidNumberPart = `${Math.floor(1000 + Math.random() * 9000)}/${Math.floor(10000 + Math.random() * 90000)}/${Math.floor(10000 + Math.random() * 90000)}`;
  const eid = `${eidNumberPart} ${dateStr} ${timeStr}`;
  const urn = `URN-${Math.floor(10000000 + Math.random() * 90000000)}`;
  const vleCommission = 50; // Rs 50 VLE commission for UCL demographic update

  const db = readDB();
  if (!db.vleProfile) db.vleProfile = { ...DEFAULT_VLE_PROFILE };
  db.vleProfile.walletBalance = Number((db.vleProfile.walletBalance + vleCommission).toFixed(2));

  const passbookEntry = {
    id: 'TXN-UCL-' + Math.floor(1000 + Math.random() * 9000),
    date: new Date().toISOString().split('T')[0],
    type: 'CR',
    desc: `Aadhaar UCL Update Comm: ${residentName} (${updateType})`,
    amount: vleCommission,
    balance: db.vleProfile.walletBalance
  };
  db.vleProfile.passbook.unshift(passbookEntry);
  writeDB(db);

  broadcastEvent('csc:ucl_updated', { eid, residentName, updateType, urn, vleCommission });

  res.status(201).json({
    success: true,
    ucl: {
      eid,
      urn,
      residentName,
      maskedAadhaar: `XXXX-XXXX-${cleanAadhaar.slice(-4)}`,
      mobile,
      updateType,
      documentType,
      newDetail,
      operatorId: 'VLE-UIDAI-245089',
      operatorName: 'Rajesh Sharma (UIDAI Certified Supervisor)',
      stationId: 'STAT-PATNA-0912',
      registrar: 'CSC e-Governance Services India Limited (Code: 206)',
      enrolmentAgency: 'CSC e-Gov Enrolment Agency (Code: 0912)',
      feeCharged: 50.00,
      status: 'UPDATE REQUEST ACCEPTED & FORWARDED TO UIDAI CIDR',
      timestamp: new Date().toISOString(),
      qrPayload: `UIDAI|EID:${eid.replace(/\s+/g, '_')}|NAME:${residentName}|TYPE:${updateType}|STATUS:ACCEPTED`,
      vleCommissionCredited: vleCommission,
      vleNewBalance: db.vleProfile.walletBalance
    }
  });
});

// 30. CSC Grameen e-Store (grameenestore.in / estore.csccloud.in)
app.post('/api/csc/estore/order', (req, res) => {
  const {
    customerName = 'Brijesh Sharma',
    customerMobile = '9835012345',
    deliveryPanchayat = 'Danapur Cantonment Gram Panchayat',
    itemCategory = 'Farm Inputs & Solar Technology',
    productName = 'IFFCO Nano Urea (Liquid) + Solar DC Sprayer 16L',
    quantity = 2,
    orderAmount = 3450,
    paymentMode = 'VLE_WALLET_DISBURSAL'
  } = req.body;

  const parsedAmount = Number(orderAmount);
  if (!customerName || !customerMobile || isNaN(parsedAmount) || parsedAmount <= 0) {
    return res.status(400).json({ success: false, message: 'Valid customer name, mobile, and order amount are required' });
  }

  const db = readDB();
  if (!db.vleProfile) db.vleProfile = { ...DEFAULT_VLE_PROFILE };

  if (paymentMode === 'VLE_WALLET_DISBURSAL' && db.vleProfile.walletBalance < parsedAmount) {
    return res.status(400).json({
      success: false,
      message: `Insufficient VLE wallet balance. Required: ₹${parsedAmount}, Available: ₹${db.vleProfile.walletBalance}. Please top up your wallet.`
    });
  }

  const orderId = 'ESTORE-2026-' + Math.floor(10000000 + Math.random() * 90000000);
  const vleCommission = 120; // Rs 120 VLE fulfillment & delivery incentive

  if (paymentMode === 'VLE_WALLET_DISBURSAL') {
    db.vleProfile.walletBalance = Number((db.vleProfile.walletBalance - parsedAmount + vleCommission).toFixed(2));
    db.vleProfile.passbook.unshift({
      id: 'TXN-EST-D-' + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toISOString().split('T')[0],
      type: 'DR',
      desc: `Grameen eStore Order: ${productName} (${customerName})`,
      amount: parsedAmount,
      balance: Number((db.vleProfile.walletBalance - vleCommission).toFixed(2))
    });
  } else {
    db.vleProfile.walletBalance = Number((db.vleProfile.walletBalance + vleCommission).toFixed(2));
  }

  db.vleProfile.passbook.unshift({
    id: 'TXN-EST-C-' + Math.floor(1000 + Math.random() * 9000),
    date: new Date().toISOString().split('T')[0],
    type: 'CR',
    desc: `e-Store VLE Delivery Incentive: Order ${orderId}`,
    amount: vleCommission,
    balance: db.vleProfile.walletBalance
  });

  writeDB(db);

  broadcastEvent('csc:estore_ordered', { orderId, customerName, productName, orderAmount: parsedAmount, vleCommission });

  res.status(201).json({
    success: true,
    order: {
      orderId,
      customerName,
      customerMobile,
      deliveryPanchayat,
      itemCategory,
      productName,
      quantity,
      orderAmount: parsedAmount,
      deliveryCharge: 0.00,
      paymentMode,
      deliveryAgent: 'Kiran Devi (Gramin e-Store Village Rider)',
      estimatedDelivery: 'Next Working Day (Doorstep Rural Delivery)',
      status: 'CONFIRMED & DISPATCHED FROM REGIONAL CSC HUB',
      timestamp: new Date().toISOString(),
      qrPayload: `ESTORE|ORDER:${orderId}|CUST:${customerName}|PROD:${productName}|AMT:${parsedAmount}|STATUS:DISPATCHED`,
      vleCommissionCredited: vleCommission,
      vleNewBalance: db.vleProfile.walletBalance
    }
  });
});

// 31. CSC Class 3 Digital Signature Certificate & e-Sign (esigns.csccloud.in / cca.gov.in)
app.post('/api/csc/dsc/issue', (req, res) => {
  const {
    applicantName = 'Vikramaditya Sharma',
    aadhaar = '999999990019',
    mobile = '9835012345',
    dscType = 'Class 3 Signing & Encryption (2-Year Validity)',
    usbTokenType = 'WatchData ProxKey Plus (FIPS 140-2 Level 3 Certified)',
    purpose = 'GeM e-Procurement, MCA21, GST & Income Tax e-Filing'
  } = req.body;

  const cleanAadhaar = String(aadhaar || '').replace(/\s+/g, '');
  if (!applicantName || cleanAadhaar.length !== 12) {
    return res.status(400).json({ success: false, message: 'Valid applicant name and 12-digit Aadhaar are required' });
  }

  if (!validateVerhoeff(cleanAadhaar)) {
    return res.status(400).json({ success: false, message: 'Invalid Aadhaar checksum (Verhoeff validation failed)' });
  }

  const certSerialNumber = 'DSC-2026-' + Array.from({ length: 4 }, () => Math.floor(1000 + Math.random() * 9000).toString(16).toUpperCase()).join('-');
  const usbTokenSerial = 'TOKEN-' + Math.floor(10000000 + Math.random() * 90000000);
  const now = new Date();
  const validFrom = now.toISOString().split('T')[0];
  const validUntil = new Date(now.getFullYear() + 2, now.getMonth(), now.getDate()).toISOString().split('T')[0];
  const vleCommission = 250; // Rs 250 VLE commission for Class 3 DSC issuance

  const db = readDB();
  if (!db.vleProfile) db.vleProfile = { ...DEFAULT_VLE_PROFILE };
  db.vleProfile.walletBalance = Number((db.vleProfile.walletBalance + vleCommission).toFixed(2));

  const passbookEntry = {
    id: 'TXN-DSC-' + Math.floor(1000 + Math.random() * 9000),
    date: new Date().toISOString().split('T')[0],
    type: 'CR',
    desc: `Class 3 DSC Issuance Comm: ${applicantName} (${certSerialNumber})`,
    amount: vleCommission,
    balance: db.vleProfile.walletBalance
  };
  db.vleProfile.passbook.unshift(passbookEntry);
  writeDB(db);

  broadcastEvent('csc:dsc_issued', { certSerialNumber, applicantName, dscType, usbTokenSerial, vleCommission });

  res.status(201).json({
    success: true,
    dsc: {
      certSerialNumber,
      usbTokenSerial,
      applicantName,
      maskedAadhaar: `XXXX-XXXX-${cleanAadhaar.slice(-4)}`,
      mobile,
      dscType,
      usbTokenType,
      purpose,
      caAuthority: 'CSC e-Gov CA / e-Mudhra Limited (Controller of Certifying Authorities - CCA)',
      validFrom,
      validUntil,
      algorithm: 'SHA-256 with RSA 2048-bit Asymmetric Cryptography',
      status: 'ISSUED & PROGRAMMED TO CRYPTOGRAPHIC USB TOKEN',
      issuedAt: new Date().toISOString(),
      qrPayload: `CCA|DSC:${certSerialNumber}|NAME:${applicantName}|TYPE:${dscType}|TOKEN:${usbTokenSerial}|VALID:${validUntil}`,
      vleCommissionCredited: vleCommission,
      vleNewBalance: db.vleProfile.walletBalance
    }
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`  AKUL DRAVIN CLOUD AI • ENTERPRISE API GATEWAY`);
  console.log(`  Listening on: http://localhost:${PORT}`);
  console.log(`  Healthcheck:  http://localhost:${PORT}/api/health`);
  console.log(`  Real-time SSE: http://localhost:${PORT}/api/events`);
  console.log(`====================================================`);
});
