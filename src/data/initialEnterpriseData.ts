import { 
  DoubleEntryJournal, 
  SupportTicket, 
  MarketingCampaign, 
  DistributorDownline, 
  AffiliateReferral, 
  ApiConnectorProvider, 
  WhiteLabelConfig 
} from '../types';

export const initialWhiteLabelConfig: WhiteLabelConfig = {
  brandName: 'AKUL DRAVIN DIGITAL SERVICES',
  tagline: 'One Platform. Every Service.',
  taglineHi: 'हर काम डिजिटल • हर समाधान एक जगह',
  primaryColor: '#1D4ED8',
  accentColor: '#F59E0B',
  customDomain: 'cloud.akuldravin.com',
  supportPhone: '+91 98765 43210',
  supportEmail: 'contact@akuldravin.com',
  invoiceHeader: 'AKUL DRAVIN GROUP OF ENTERPRISES • GSTIN: 07AAAAA0000A1Z5',
  gstin: '07AAAAA0000A1Z5'
};

export const initialDoubleEntryJournals: DoubleEntryJournal[] = [
  {
    id: 'JRN-2026-0091',
    date: '2026-11-10',
    reference: 'INV-AD-2026-87285',
    description: 'Pvt Ltd Company Incorporation Fee settled via UPI Gateway',
    lines: [
      { accountCode: '1010', accountName: 'Gateway Clearing Account', debit: 6999, credit: 0 },
      { accountCode: '4010', accountName: 'Platform Professional Fee Revenue', debit: 0, credit: 5931.36 },
      { accountCode: '2050', accountName: 'Output GST Payable (18%)', debit: 0, credit: 1067.64 }
    ],
    totalDebit: 6999,
    totalCredit: 6999,
    balanced: true,
    cryptographicHash: 'a89f30b91d294bc172810a99182374e2'
  },
  {
    id: 'JRN-2026-0092',
    date: '2026-11-10',
    reference: 'COM-VLE-DEL-4102',
    description: 'VLE Commission Disbursal for Aadhaar Assisted Service',
    lines: [
      { accountCode: '5020', accountName: 'VLE Commission Expense', debit: 450, credit: 0 },
      { accountCode: '2010', accountName: 'VLE Partner Wallet Balance', debit: 0, credit: 450 }
    ],
    totalDebit: 450,
    totalCredit: 450,
    balanced: true,
    cryptographicHash: 'f492b72183c79a93e8201a0198273612'
  },
  {
    id: 'JRN-2026-0093',
    date: '2026-11-09',
    reference: 'INV-AD-2026-81044',
    description: '4-Camera CCTV Hardware Procurement & Installation Advance',
    lines: [
      { accountCode: '1010', accountName: 'Gateway Clearing Account', debit: 12499, credit: 0 },
      { accountCode: '4020', accountName: 'Hardware & CCTV Installation Revenue', debit: 0, credit: 10592.37 },
      { accountCode: '2050', accountName: 'Output GST Payable (18%)', debit: 0, credit: 1906.63 }
    ],
    totalDebit: 12499,
    totalCredit: 12499,
    balanced: true,
    cryptographicHash: 'c71289ae4081b29a109823481237ef81'
  }
];

export const initialSupportTickets: SupportTicket[] = [
  {
    id: 'TKT-8901',
    customerName: 'Sunil Paswan',
    customerPhone: '+91 98102 33441',
    serviceCategory: 'Government Services',
    subject: 'Aadhaar address update acknowledgment slip missing',
    priority: 'High',
    status: 'In Progress',
    assignedAgent: 'Rameshwar Nath (SLA L2)',
    slaRemainingHours: 3.5,
    createdAt: '2026-11-10 11:20 AM',
    messages: [
      { sender: 'Sunil Paswan', role: 'Citizen', text: 'Namaste sir, I applied for address correction yesterday but did not receive the URN slip.', timestamp: '11:20 AM' },
      { sender: 'Rameshwar Nath', role: 'Executive', text: 'Checking your portal packet now. UIDAI server took 12 mins to sync; packet validated.', timestamp: '11:35 AM' }
    ]
  },
  {
    id: 'TKT-8902',
    customerName: 'Pooja Khandelwal',
    customerPhone: '+91 98221 55667',
    serviceCategory: 'Business Services',
    subject: 'SPICe+ Part B DIN validation resubmission',
    priority: 'Critical SLA',
    status: 'Open',
    assignedAgent: 'Adv. Neha Tandon (MCA Panel)',
    slaRemainingHours: 1.2,
    createdAt: '2026-11-10 01:15 PM',
    messages: [
      { sender: 'Pooja Khandelwal', role: 'Director', text: 'MCA portal showed resubmission query regarding Director address proof utility bill age.', timestamp: '01:15 PM' }
    ]
  },
  {
    id: 'TKT-8903',
    customerName: 'Anand Kumar',
    customerPhone: '+91 98330 77889',
    serviceCategory: 'Cyber Café Workstations',
    subject: 'Seat PC-04 scanner document dpi adjustment',
    priority: 'Medium',
    status: 'Resolved',
    assignedAgent: 'Akash Operator',
    slaRemainingHours: 0,
    createdAt: '2026-11-09 04:30 PM',
    messages: [
      { sender: 'Anand Kumar', role: 'Student', text: 'Need 300 DPI greyscale scan for UPSC CSE form signature.', timestamp: '04:30 PM' },
      { sender: 'Akash Operator', role: 'Cafe Tech', text: 'Scanner preset calibrated to 300 DPI 50KB JPEG output. Successfully uploaded.', timestamp: '04:45 PM' }
    ]
  }
];

export const initialMarketingCampaigns: MarketingCampaign[] = [
  {
    id: 'CMP-2026-01',
    name: 'Diwali Pan-India VLE Franchise Grant',
    channel: 'WhatsApp Business',
    audienceSegment: 'VLE Franchisees',
    status: 'Active',
    scheduledDate: '2026-11-10',
    targetCount: 5200,
    sentCount: 4890,
    deliveredCount: 4810,
    conversionCount: 342,
    templateText: 'Namaste! Expand your digital seva center with 150+ citizen services. Guaranteed commission payouts. Tap to review franchise proposal kit.'
  },
  {
    id: 'CMP-2026-02',
    name: 'GST Annual Return Filing Reminder (GSTR-9)',
    channel: 'Email',
    audienceSegment: 'Tax Compliance Leads',
    status: 'Active',
    scheduledDate: '2026-11-08',
    targetCount: 3100,
    sentCount: 3100,
    deliveredCount: 3045,
    conversionCount: 418,
    templateText: 'Dear Business Owner, Avoid penal interest. Our Chartered Accountants will file your GSTR-9 with 100% ITC matching.'
  },
  {
    id: 'CMP-2026-03',
    name: 'Winter CCTV Surveillance Package Alert',
    channel: 'SMS',
    audienceSegment: 'All Citizens',
    status: 'Scheduled',
    scheduledDate: '2026-11-15',
    targetCount: 15000,
    sentCount: 0,
    deliveredCount: 0,
    conversionCount: 0,
    templateText: 'Protect your property! 4-Camera HD Night Vision CCTV with 1TB HDD & mobile app view @ flat ₹12,499. Book site visit on Akul Dravin Services.'
  }
];

export const initialDistributorDownlines: DistributorDownline[] = [
  {
    id: 'DST-FRN-101',
    franchiseName: 'Patna Central Digital Seva Kendra',
    location: 'Patna, Bihar',
    vleCount: 42,
    monthlyGtv: 1850000,
    overrideCommissionRate: 2.5,
    commissionEarned: 46250,
    status: 'Active'
  },
  {
    id: 'DST-FRN-102',
    franchiseName: 'Ranchi South District Hub',
    location: 'Ranchi, Jharkhand',
    vleCount: 28,
    monthlyGtv: 1240000,
    overrideCommissionRate: 2.5,
    commissionEarned: 31000,
    status: 'Active'
  },
  {
    id: 'DST-FRN-103',
    franchiseName: 'Varanasi Smart Citizen Center',
    location: 'Varanasi, Uttar Pradesh',
    vleCount: 36,
    monthlyGtv: 1620000,
    overrideCommissionRate: 2.5,
    commissionEarned: 40500,
    status: 'Active'
  },
  {
    id: 'DST-FRN-104',
    franchiseName: 'Janakpuri West Cyber Super Hub',
    location: 'New Delhi',
    vleCount: 19,
    monthlyGtv: 940000,
    overrideCommissionRate: 2.5,
    commissionEarned: 23500,
    status: 'Active'
  }
];

export const initialAffiliateReferrals: AffiliateReferral[] = [
  {
    id: 'AFF-REF-701',
    referralCode: 'AD-REF-RAHUL99',
    customerName: 'Manish Chawla',
    serviceEnquired: 'Pvt Ltd Company Incorporation',
    status: 'Settled',
    orderValue: 6999,
    commissionAmount: 700,
    date: '2026-11-09'
  },
  {
    id: 'AFF-REF-702',
    referralCode: 'AD-REF-RAHUL99',
    customerName: 'Geeta Kumari',
    serviceEnquired: 'Passport Tatkaal Appointment',
    status: 'Purchased',
    orderValue: 1500,
    commissionAmount: 150,
    date: '2026-11-10'
  },
  {
    id: 'AFF-REF-703',
    referralCode: 'AD-REF-PRIYA10',
    customerName: 'Vikram Rajput',
    serviceEnquired: '8-Camera NVR Commercial CCTV',
    status: 'Lead',
    orderValue: 24999,
    commissionAmount: 1250,
    date: '2026-11-10'
  }
];

export const initialApiProviders: ApiConnectorProvider[] = [
  {
    id: 'prv-bbps-npc',
    name: 'NPCI Bharat BillPay (BBPS) Central Switch',
    category: 'BBPS',
    baseUrl: 'https://api.bbps.npci.org.in/v2',
    status: 'Online',
    mode: 'Production',
    latencyMs: 142,
    successRate: 99.8,
    retryAttempts: 3,
    timeoutSeconds: 8,
    webhookUrl: 'https://cloud.akuldravin.com/api/webhooks/bbps'
  },
  {
    id: 'prv-nsdl-pan',
    name: 'NSDL / Protean PAN Verification Gateway',
    category: 'PAN',
    baseUrl: 'https://tin.tin.nsdl.com/pan/api/v1',
    status: 'Online',
    mode: 'Production',
    latencyMs: 185,
    successRate: 99.4,
    retryAttempts: 2,
    timeoutSeconds: 10,
    webhookUrl: 'https://cloud.akuldravin.com/api/webhooks/pan'
  },
  {
    id: 'prv-aeps-icici',
    name: 'ICICI Bank Micro-ATM & AEPS Switch',
    category: 'AEPS',
    baseUrl: 'https://corporate.icicibank.com/aeps/v3',
    status: 'Online',
    mode: 'Production',
    latencyMs: 210,
    successRate: 99.1,
    retryAttempts: 3,
    timeoutSeconds: 12,
    webhookUrl: 'https://cloud.akuldravin.com/api/webhooks/aeps'
  },
  {
    id: 'prv-razorpay-upi',
    name: 'Razorpay Enterprise NPCI UPI Intent & Virtual VPA',
    category: 'Payment Gateway',
    baseUrl: 'https://api.razorpay.com/v1',
    status: 'Online',
    mode: 'Production',
    latencyMs: 88,
    successRate: 99.9,
    retryAttempts: 3,
    timeoutSeconds: 6,
    webhookUrl: 'https://cloud.akuldravin.com/api/payments/webhook'
  },
  {
    id: 'prv-whatsapp-meta',
    name: 'Meta Cloud API (Official WhatsApp Business Platform)',
    category: 'WhatsApp',
    baseUrl: 'https://graph.facebook.com/v20.0/messages',
    status: 'Online',
    mode: 'Production',
    latencyMs: 125,
    successRate: 99.7,
    retryAttempts: 2,
    timeoutSeconds: 5,
    webhookUrl: 'https://cloud.akuldravin.com/api/webhooks/whatsapp'
  }
];
