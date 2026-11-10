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
const DB_FILE = path.join(DATA_DIR, 'store.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
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
app.post('/api/ai/chat', (req, res) => {
  const { message, activeAgent = 'Universal', language = 'en' } = req.body;
  const q = String(message || '').toLowerCase();

  let agentName = 'QUANTUM Multi-Agent Brain';
  let governanceLevel = 'READ';
  let replyText = '';
  let suggestedAction = null;

  if (activeAgent === 'Document AI' || q.includes('pan') || q.includes('aadhaar') || q.includes('ocr') || q.includes('दस्तावेज़')) {
    agentName = 'Document AI & OCR Scrutinizer';
    governanceLevel = 'RECOMMEND';
    replyText = language === 'hi'
      ? 'दस्तावेज़ ओसीआर इंजन सक्रिय है। आधार कार्ड (12-अंक Verhoeff एल्गोरिथ्म), पैन कार्ड (ABCDE1234F प्रारूप) एवं जीएसटी सत्यापन हेतु तैयार है।'
      : 'Document AI Engine active. Verhoeff checksum algorithm loaded for 12-digit Aadhaar, Form 49A PAN pattern matching, and GSTIN jurisdictional validation.';
    suggestedAction = { label: 'Open Document Center', actionType: 'navigate', targetPayload: '/documents' };
  } else if (activeAgent === 'Quote AI' || q.includes('cctv') || q.includes('camera') || q.includes('construction') || q.includes('कोटेशन')) {
    agentName = 'Quote AI & Dynamic BoQ Engine';
    governanceLevel = 'DRAFT';
    replyText = language === 'hi'
      ? 'सीसीटीवी एवं इंफ्रास्ट्रक्चर एस्टीमेट तैयार: 4 एचडी नाइट विज़न कैमरा + 1TB सर्विलांस HDD + 4CH DVR = ₹12,499 (Same day installation included).'
      : 'Instant BoQ Generated: 4x HD Night-Vision Cameras + 1TB Surveillance HDD + 4CH DVR = ₹12,499 (Inclusive of cabling, installation & mobile live view setup).';
    suggestedAction = { label: 'View CCTV Packages', actionType: 'navigate', targetPayload: '/cctv' };
  } else if (activeAgent === 'Admin Copilot' || q.includes('pending') || q.includes('audit') || q.includes('commission') || q.includes('लंबित')) {
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

  res.json({
    success: true,
    agentName,
    text: replyText,
    governanceLevel,
    suggestedAction,
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

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`  AKUL DRAVIN CLOUD AI • ENTERPRISE API GATEWAY`);
  console.log(`  Listening on: http://localhost:${PORT}`);
  console.log(`  Healthcheck:  http://localhost:${PORT}/api/health`);
  console.log(`  Real-time SSE: http://localhost:${PORT}/api/events`);
  console.log(`====================================================`);
});
