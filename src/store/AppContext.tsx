import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, 
  Language, 
  ServiceItem, 
  Application, 
  CartItem, 
  Workstation, 
  PrintScanJob, 
  PropertyItem, 
  CourierShipment, 
  CRMLead, 
  EmployeeRecord, 
  InventoryRecord, 
  AuditLogItem, 
  DocumentItem,
  NotificationItem,
  ApplicationStatus,
  DoubleEntryJournal,
  SupportTicket,
  MarketingCampaign,
  DistributorDownline,
  AffiliateReferral,
  ApiConnectorProvider,
  WhiteLabelConfig,
  BrandAuditEntry,
  AuthUserAccount,
  UTRPaymentProof,
  PricingPlanItem,
  CommissionRule,
  AISystemControlConfig,
  ServiceBannerItem,
  LoginPanelKey,
  PermissionFlag,
  DigitalSevaTier
} from '../types';
import {
  DEFAULT_AI_CONTROL_CONFIG,
  DEFAULT_COMMISSION_RULES,
  DEFAULT_PRICING_PLANS,
  DEFAULT_USER_ACCOUNTS,
  LOGIN_PANELS,
  SERVICE_BANNERS
} from '../config/governanceCatalog';
import { initialServicesCatalog } from '../data/servicesData';
import { 
  initialApplications, 
  initialWorkstations, 
  initialPrintJobs, 
  initialProperties, 
  initialShipments, 
  initialCRMLeads, 
  initialEmployees, 
  initialInventory, 
  initialAuditLogs,
  initialCustomerDocuments
} from '../data/initialState';
import {
  initialWhiteLabelConfig,
  initialDoubleEntryJournals,
  initialSupportTickets,
  initialMarketingCampaigns,
  initialDistributorDownlines,
  initialAffiliateReferrals,
  initialApiProviders
} from '../data/initialEnterpriseData';
import { translations } from '../data/translations';
import { apiClient } from '../services/apiClient';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['en'];
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  walletBalance: number;
  setWalletBalance: React.Dispatch<React.SetStateAction<number>>;
  
  // Services & Zero-code marketplace
  services: ServiceItem[];
  addCustomService: (newService: ServiceItem) => void;

  // Applications & Workflow
  applications: Application[];
  submitApplication: (appData: Partial<Application>) => string;
  updateApplicationStatus: (appId: string, status: ApplicationStatus, notes?: string) => void;

  // Cart & Unified Checkout
  cart: CartItem[];
  addToCart: (service: ServiceItem) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartTotal: number;

  // Cyber Cafe System
  workstations: Workstation[];
  startWorkstationSession: (pcId: string, customerName: string, phone: string, task: string) => void;
  stopWorkstationSession: (pcId: string) => number; // returns bill
  printJobs: PrintScanJob[];
  addPrintJob: (job: Omit<PrintScanJob, 'id' | 'timestamp'>) => void;

  // Property Marketplace
  properties: PropertyItem[];

  // Logistics / Courier
  shipments: CourierShipment[];
  bookShipment: (shipmentData: Omit<CourierShipment, 'id' | 'awb' | 'status' | 'timeline'>) => string;

  // CRM & Business
  crmLeads: CRMLead[];
  addLead: (lead: Omit<CRMLead, 'id' | 'createdDate'>) => void;
  updateLeadStage: (leadId: string, stage: CRMLead['stage']) => void;

  // HRMS
  employees: EmployeeRecord[];
  toggleEmployeeAttendance: (empId: string) => void;

  // ERP Inventory
  inventory: InventoryRecord[];
  updateInventoryStock: (invId: string, delta: number) => void;

  // Documents & Vault
  documents: DocumentItem[];
  uploadDocument: (doc: Omit<DocumentItem, 'id' | 'uploadDate'>) => void;
  deleteDocument: (docId: string) => void;

  // Audit Logs
  auditLogs: AuditLogItem[];
  logAudit: (action: string, target: string, status?: AuditLogItem['status']) => void;

  // Modals & UI Triggers
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isQuantumAIOpen: boolean;
  setIsQuantumAIOpen: (open: boolean) => void;
  quantumAIPendingPrompt: string;
  setQuantumAIPendingPrompt: (prompt: string) => void;
  openQuantumAI: (initialPrompt?: string) => void;
  isTrackerOpen: boolean;
  setIsTrackerOpen: (open: boolean) => void;
  activeTrackerQuery: string;
  setActiveTrackerQuery: (query: string) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isApplyModalOpen: boolean;
  setIsApplyModalOpen: (open: boolean) => void;
  selectedServiceForApply: ServiceItem | null;
  openApplyModal: (service: ServiceItem) => void;

  // Toast Notifications
  toasts: NotificationItem[];
  showToast: (title: string, message: string, type?: NotificationItem['type']) => void;

  // Enterprise Double-Entry Ledger & Accounting
  doubleEntryJournals: DoubleEntryJournal[];
  recordJournalEntry: (entry: Omit<DoubleEntryJournal, 'id' | 'cryptographicHash' | 'balanced' | 'totalDebit' | 'totalCredit'>) => void;

  // Support & SLA Ticket Operations
  supportTickets: SupportTicket[];
  createSupportTicket: (ticket: Omit<SupportTicket, 'id' | 'createdAt' | 'status' | 'slaRemainingHours' | 'messages'> & { initialMessage: string }) => void;
  replySupportTicket: (ticketId: string, text: string) => void;
  resolveSupportTicket: (ticketId: string) => void;

  // Advanced Marketing Automation
  marketingCampaigns: MarketingCampaign[];
  createMarketingCampaign: (campaign: Omit<MarketingCampaign, 'id' | 'status' | 'sentCount' | 'deliveredCount' | 'conversionCount'>) => void;
  launchCampaign: (campaignId: string) => void;

  // Distributor Network & Downlines
  distributorDownlines: DistributorDownline[];
  addDownlineFranchise: (franchise: Omit<DistributorDownline, 'id' | 'monthlyGtv' | 'commissionEarned' | 'status'>) => void;

  // Affiliate & Referral Marketplace
  affiliateReferrals: AffiliateReferral[];
  requestAffiliatePayout: (amount: number) => void;

  // API Integration Studio
  apiProviders: ApiConnectorProvider[];
  toggleApiProviderMode: (providerId: string) => void;
  updateApiProviderStatus: (providerId: string, status: ApiConnectorProvider['status']) => void;

  // Enterprise Brand Management & Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  whiteLabelConfig: WhiteLabelConfig;
  updateWhiteLabelConfig: (config: Partial<WhiteLabelConfig>) => void;
  publishWhiteLabelConfig: (config: Partial<WhiteLabelConfig>, actor?: string) => Promise<void>;
  brandAuditLog: BrandAuditEntry[];

  // Strict Role-Locked Security, Digital Seva Tiers & Admin RBAC
  userAccounts: AuthUserAccount[];
  authenticatedUser: AuthUserAccount | null;
  isAuthenticated: boolean;
  activeDigitalSevaTier: DigitalSevaTier;
  requestedAuthPanel: LoginPanelKey;
  setRequestedAuthPanel: (panel: LoginPanelKey) => void;
  loginWithPanelCredentials: (
    panelKey: LoginPanelKey,
    loginId: string,
    password: string
  ) => Promise<{ ok: boolean; message: string; redirectTo?: string; user?: AuthUserAccount }>;
  logoutSession: () => void;
  hasPermission: (perm: PermissionFlag) => boolean;
  updateUserAccountAccess: (accountId: string, patch: Partial<AuthUserAccount>) => void;
  createManagedAccount: (account: Omit<AuthUserAccount, 'id'>) => void;

  // Mandatory Payment -> UTR + Transaction ID Gate & Verification
  utrPayments: UTRPaymentProof[];
  submitUtrPayment: (proof: Omit<UTRPaymentProof, 'id' | 'paidAt' | 'paymentStatus' | 'aiRiskFlag'>) => UTRPaymentProof;
  verifyUtrPayment: (paymentId: string, status: 'VERIFIED' | 'REJECTED', notes?: string) => void;

  // Multi-Tier Pricing Plans
  pricingPlans: PricingPlanItem[];
  activeUserPlanId: string;
  activatePlanWithUtr: (planId: string, utrNumber: string, transactionId: string, paymentMethod: 'upi' | 'bank_transfer' | 'card' | 'wallet') => void;

  // Admin-Only Commission Controls
  commissionRules: CommissionRule[];
  updateCommissionRule: (ruleId: string, patch: Partial<CommissionRule>) => boolean;

  // Autonomous QUANTUM AI System Governance
  aiControlConfig: AISystemControlConfig;
  updateAiControlConfig: (patch: Partial<AISystemControlConfig>) => boolean;

  // Multi-Service Promotional Banners
  serviceBanners: ServiceBannerItem[];
  saveServiceBanner: (banner: ServiceBannerItem) => void;
}

export const defaultAppContextValue: AppContextType = {
  language: 'en',
  setLanguage: () => {},
  t: translations.en,
  currentRole: 'customer',
  setCurrentRole: () => {},
  walletBalance: 2450,
  setWalletBalance: () => {},
  services: initialServicesCatalog,
  addCustomService: () => {},
  applications: initialApplications,
  submitApplication: () => 'AD-APP-' + Math.floor(10000 + Math.random() * 90000),
  updateApplicationStatus: () => {},
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  cartTotal: 0,
  workstations: initialWorkstations,
  startWorkstationSession: () => {},
  stopWorkstationSession: () => 0,
  printJobs: initialPrintJobs,
  addPrintJob: () => {},
  properties: initialProperties,
  shipments: initialShipments,
  bookShipment: () => 'AWB' + Math.floor(100000 + Math.random() * 900000),
  crmLeads: initialCRMLeads,
  addLead: () => {},
  updateLeadStage: () => {},
  employees: initialEmployees,
  toggleEmployeeAttendance: () => {},
  inventory: initialInventory,
  updateInventoryStock: () => {},
  documents: initialCustomerDocuments,
  uploadDocument: () => {},
  deleteDocument: () => {},
  auditLogs: initialAuditLogs,
  logAudit: () => {},
  isSearchOpen: false,
  setIsSearchOpen: () => {},
  isCartOpen: false,
  setIsCartOpen: () => {},
  isQuantumAIOpen: false,
  setIsQuantumAIOpen: () => {},
  quantumAIPendingPrompt: '',
  setQuantumAIPendingPrompt: () => {},
  openQuantumAI: () => {},
  isTrackerOpen: false,
  setIsTrackerOpen: () => {},
  activeTrackerQuery: '',
  setActiveTrackerQuery: () => {},
  isAuthModalOpen: false,
  setIsAuthModalOpen: () => {},
  isApplyModalOpen: false,
  setIsApplyModalOpen: () => {},
  selectedServiceForApply: null,
  openApplyModal: () => {},
  toasts: [],
  showToast: () => {},
  doubleEntryJournals: initialDoubleEntryJournals,
  recordJournalEntry: () => {},
  supportTickets: initialSupportTickets,
  createSupportTicket: () => {},
  replySupportTicket: () => {},
  resolveSupportTicket: () => {},
  marketingCampaigns: initialMarketingCampaigns,
  createMarketingCampaign: () => {},
  launchCampaign: () => {},
  distributorDownlines: initialDistributorDownlines,
  addDownlineFranchise: () => {},
  affiliateReferrals: initialAffiliateReferrals,
  requestAffiliatePayout: () => {},
  apiProviders: initialApiProviders,
  toggleApiProviderMode: () => {},
  updateApiProviderStatus: () => {},
  theme: 'light',
  toggleTheme: () => {},
  setTheme: () => {},
  whiteLabelConfig: initialWhiteLabelConfig,
  updateWhiteLabelConfig: () => {},
  publishWhiteLabelConfig: async () => {},
  brandAuditLog: [],
  userAccounts: DEFAULT_USER_ACCOUNTS,
  authenticatedUser: null,
  isAuthenticated: false,
  activeDigitalSevaTier: 'none',
  requestedAuthPanel: 'customer',
  setRequestedAuthPanel: () => {},
  loginWithPanelCredentials: async () => ({ ok: false, message: 'Unavailable' }),
  logoutSession: () => {},
  hasPermission: () => false,
  updateUserAccountAccess: () => {},
  createManagedAccount: () => {},
  utrPayments: [],
  submitUtrPayment: (p) => ({
    ...p,
    id: `UTR-${Date.now()}`,
    paidAt: new Date().toISOString(),
    paymentStatus: 'UTR_SUBMITTED',
    aiRiskFlag: 'LOW_RISK',
  }),
  verifyUtrPayment: () => {},
  pricingPlans: DEFAULT_PRICING_PLANS,
  activeUserPlanId: 'plan-citizen-free',
  activatePlanWithUtr: () => {},
  commissionRules: DEFAULT_COMMISSION_RULES,
  updateCommissionRule: () => false,
  aiControlConfig: DEFAULT_AI_CONTROL_CONFIG,
  updateAiControlConfig: () => false,
  serviceBanners: SERVICE_BANNERS,
  saveServiceBanner: () => {},
};

const AppContext = createContext<AppContextType>(defaultAppContextValue);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Persistent Settings
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('ad_language') as Language) || 'en';
  });

  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    return (localStorage.getItem('ad_current_role') as UserRole) || 'customer';
  });

  const [walletBalance, setWalletBalance] = useState<number>(() => {
    const saved = localStorage.getItem('ad_wallet_balance');
    return saved ? Number(saved) : 2450;
  });

  // Services
  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const saved = localStorage.getItem('ad_services_catalog');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((s: any) => ({
            ...s,
            basePrice: Number(s.basePrice ?? s.price ?? 0),
            requiredDocs: Array.isArray(s.requiredDocs) && s.requiredDocs.length > 0 ? s.requiredDocs : ['Aadhaar Card', 'Passport Photo'],
            requiredDocsHi: Array.isArray(s.requiredDocsHi) && s.requiredDocsHi.length > 0 ? s.requiredDocsHi : ['आधार कार्ड', 'पासपोर्ट फोटो'],
            timeline: s.timeline || '2-4 Working Days',
            timelineHi: s.timelineHi || '2-4 कार्य दिवस'
          }));
        }
      }
    } catch (e) {
      console.warn('Failed to parse cached services catalog, resetting to initial', e);
    }
    return initialServicesCatalog;
  });

  // Applications
  const [applications, setApplications] = useState<Application[]>(() => {
    try {
      const saved = localStorage.getItem('ad_applications');
      return saved ? JSON.parse(saved) : initialApplications;
    } catch (e) {
      return initialApplications;
    }
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ad_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Workstations
  const [workstations, setWorkstations] = useState<Workstation[]>(initialWorkstations);
  const [printJobs, setPrintJobs] = useState<PrintScanJob[]>(initialPrintJobs);

  // Other Entities
  const [properties] = useState<PropertyItem[]>(initialProperties);
  const [shipments, setShipments] = useState<CourierShipment[]>(initialShipments);
  const [crmLeads, setCrmLeads] = useState<CRMLead[]>(initialCRMLeads);
  const [employees, setEmployees] = useState<EmployeeRecord[]>(initialEmployees);
  const [inventory, setInventory] = useState<InventoryRecord[]>(initialInventory);
  const [documents, setDocuments] = useState<DocumentItem[]>(initialCustomerDocuments);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(initialAuditLogs);

  // Strict Role-Locked Accounts, Digital Seva Hierarchy & Governance State
  const [userAccounts, setUserAccounts] = useState<AuthUserAccount[]>(() => {
    try {
      const saved = localStorage.getItem('adcs_user_accounts');
      return saved ? JSON.parse(saved) : DEFAULT_USER_ACCOUNTS;
    } catch {
      return DEFAULT_USER_ACCOUNTS;
    }
  });
  const [authenticatedUser, setAuthenticatedUser] = useState<AuthUserAccount | null>(() => {
    try {
      const saved = localStorage.getItem('adcs_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [activeDigitalSevaTier, setActiveDigitalSevaTier] = useState<DigitalSevaTier>(() => {
    return (localStorage.getItem('adcs_seva_tier') as DigitalSevaTier) || 'none';
  });
  const [requestedAuthPanel, setRequestedAuthPanel] = useState<LoginPanelKey>('customer');

  // Mandatory UTR + Transaction ID Ledger
  const [utrPayments, setUtrPayments] = useState<UTRPaymentProof[]>(() => {
    try {
      const saved = localStorage.getItem('adcs_utr_payments');
      return saved ? JSON.parse(saved) : [
        {
          id: 'UTR-REC-1001',
          orderId: 'AD-APP-8942',
          utrNumber: '431209845123',
          transactionId: 'TXN-ADCS-89420',
          paymentMethod: 'upi',
          amountPaid: 107,
          serviceTitle: 'New PAN Card (Form 49A)',
          applicantName: 'Rahul Sharma',
          applicantPhone: '+91 98765 43210',
          paidAt: '2026-11-11T11:20:00.000Z',
          paymentStatus: 'VERIFIED',
          verifiedBy: 'Dr. Akul Dravin (Super Admin)',
          verifiedAt: '2026-11-11T11:25:00.000Z',
          aiRiskFlag: 'VERIFIED_MATCH',
        },
      ];
    } catch {
      return [];
    }
  });

  // Multi-Tier Pricing Plans, Admin-Only Commissions, AI Governance & Multi-Service Banners
  const [pricingPlans] = useState<PricingPlanItem[]>(DEFAULT_PRICING_PLANS);
  const [activeUserPlanId, setActiveUserPlanId] = useState<string>(() => {
    return localStorage.getItem('adcs_active_plan_id') || 'plan-citizen-free';
  });
  const [commissionRules, setCommissionRules] = useState<CommissionRule[]>(() => {
    try {
      const saved = localStorage.getItem('adcs_commission_rules');
      return saved ? JSON.parse(saved) : DEFAULT_COMMISSION_RULES;
    } catch {
      return DEFAULT_COMMISSION_RULES;
    }
  });
  const [aiControlConfig, setAiControlConfig] = useState<AISystemControlConfig>(() => {
    try {
      const saved = localStorage.getItem('adcs_ai_control');
      return saved ? JSON.parse(saved) : DEFAULT_AI_CONTROL_CONFIG;
    } catch {
      return DEFAULT_AI_CONTROL_CONFIG;
    }
  });
  const [serviceBanners, setServiceBanners] = useState<ServiceBannerItem[]>(() => {
    try {
      const saved = localStorage.getItem('adcs_service_banners');
      return saved ? JSON.parse(saved) : SERVICE_BANNERS;
    } catch {
      return SERVICE_BANNERS;
    }
  });

  // Enterprise Subsystems & Theme
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('adcs_theme');
    return saved === 'dark' ? 'dark' : 'light';
  });
  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  const [whiteLabelConfig, setWhiteLabelConfig] = useState<WhiteLabelConfig>(() => {
    try {
      const saved = localStorage.getItem('ad_whitelabel_config');
      return saved ? { ...initialWhiteLabelConfig, ...JSON.parse(saved) } : initialWhiteLabelConfig;
    } catch (e) {
      return initialWhiteLabelConfig;
    }
  });
  const [brandAuditLog, setBrandAuditLog] = useState<BrandAuditEntry[]>(() => {
    try {
      const saved = localStorage.getItem('adcs_brand_audit_log');
      return saved ? JSON.parse(saved) : [
        {
          id: 'br-aud-1',
          timestamp: '2026-04-01T10:00:00Z',
          actor: 'Super Admin Controller',
          action: 'BRAND_PUBLISHED',
          summary: 'Published Official ADCS Master Brand System v1.0 (#075ACB / #061A36 / #D6A12B)',
          version: 1
        }
      ];
    } catch {
      return [];
    }
  });
  const [doubleEntryJournals, setDoubleEntryJournals] = useState<DoubleEntryJournal[]>(initialDoubleEntryJournals);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(initialSupportTickets);
  const [marketingCampaigns, setMarketingCampaigns] = useState<MarketingCampaign[]>(initialMarketingCampaigns);
  const [distributorDownlines, setDistributorDownlines] = useState<DistributorDownline[]>(initialDistributorDownlines);
  const [affiliateReferrals, setAffiliateReferrals] = useState<AffiliateReferral[]>(initialAffiliateReferrals);
  const [apiProviders, setApiProviders] = useState<ApiConnectorProvider[]>(initialApiProviders);

  // UI States
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuantumAIOpen, setIsQuantumAIOpen] = useState(false);
  const [quantumAIPendingPrompt, setQuantumAIPendingPrompt] = useState('');

  const openQuantumAI = (initialPrompt?: string) => {
    if (initialPrompt && initialPrompt.trim()) {
      setQuantumAIPendingPrompt(initialPrompt.trim());
    }
    setIsQuantumAIOpen(true);
  };
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [activeTrackerQuery, setActiveTrackerQuery] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedServiceForApply, setSelectedServiceForApply] = useState<ServiceItem | null>(null);
  const [toasts, setToasts] = useState<NotificationItem[]>([]);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('ad_language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('adcs_theme', theme);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('ad_current_role', currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem('ad_services_catalog', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('ad_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('ad_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('ad_wallet_balance', walletBalance.toString());
  }, [walletBalance]);

  // Live Real-Time Multi-Tenant Server-Sent Events (SSE) Synchronization & Hydration
  useEffect(() => {
    let isMounted = true;
    const hydrateFromServer = async () => {
      try {
        const [servicesRes, appsRes, stationsRes, leadsRes, empRes, invRes] = await Promise.allSettled([
          apiClient.getServices(),
          apiClient.getApplications(),
          apiClient.getWorkstations(),
          apiClient.getCRMLeads(),
          apiClient.getEmployees(),
          apiClient.getInventory()
        ]);

        if (!isMounted) return;

        if (servicesRes.status === 'fulfilled' && servicesRes.value?.services?.length) {
          setServices(prev => {
            const serverServices = servicesRes.value!.services.map((s: any) => ({
              ...s,
              basePrice: Number(s.basePrice ?? s.price ?? 0),
              requiredDocs: Array.isArray(s.requiredDocs) && s.requiredDocs.length > 0 ? s.requiredDocs : ['Aadhaar Card', 'Passport Photo'],
              requiredDocsHi: Array.isArray(s.requiredDocsHi) && s.requiredDocsHi.length > 0 ? s.requiredDocsHi : ['आधार कार्ड', 'पासपोर्ट फोटो'],
              timeline: s.timeline || '2-4 Working Days',
              timelineHi: s.timelineHi || '2-4 कार्य दिवस'
            }));
            const existingIds = new Set(serverServices.map((s: any) => s.id));
            const uniqueLocal = prev.filter(s => !existingIds.has(s.id));
            return [...serverServices, ...uniqueLocal];
          });
        }

        if (appsRes.status === 'fulfilled' && appsRes.value?.applications?.length) {
          setApplications(prev => {
            const seen = new Set<string>();
            const dedupedServer = appsRes.value!.applications.filter((a: any) => {
              if (!a?.id || seen.has(a.id)) return false;
              seen.add(a.id);
              return true;
            });
            const uniqueLocal = prev.filter(a => a?.id && !seen.has(a.id));
            return [...dedupedServer, ...uniqueLocal];
          });
        }

        if (stationsRes.status === 'fulfilled' && stationsRes.value?.workstations?.length) {
          setWorkstations(stationsRes.value!.workstations);
        }

        if (leadsRes.status === 'fulfilled' && leadsRes.value?.leads?.length) {
          setCrmLeads(leadsRes.value!.leads);
        }

        if (empRes.status === 'fulfilled' && empRes.value?.employees?.length) {
          setEmployees(empRes.value!.employees);
        }

        if (invRes.status === 'fulfilled' && invRes.value?.inventory?.length) {
          setInventory(invRes.value!.inventory);
        }
      } catch (err) {
        console.info('[AppContext] Server hydration skipped, running in sovereign local mode');
      }
    };

    hydrateFromServer();

    const unsubscribe = apiClient.subscribeToEvents((event) => {
      if (event.type === 'application:created') {
        const payload = event.payload;
        showToast('Real-Time Application Event', `Token ${payload?.trackingNumber || 'New Application'} received across network.`, 'info');
      } else if (event.type === 'payment:completed') {
        const payload = event.payload;
        showToast('Real-Time Payment Verified', `Tax Invoice ${payload?.invoiceNumber || ''} (₹${payload?.amount || 0}) settled via UPI.`, 'success');
      } else if (event.type === 'application:status_changed') {
        const payload = event.payload;
        showToast('Status Updated', `Application ${payload?.trackingNumber} moved to ${payload?.status}.`, 'info');
      } else if (event.type === 'workstation:session_started') {
        const payload = event.payload;
        setWorkstations(prev => prev.map(w => w.id === payload.id ? { ...w, ...payload } : w));
        showToast('Workstation Active', `${payload.id} session engaged for ${payload.currentSession?.customerName || 'Citizen'}.`, 'info');
      } else if (event.type === 'workstation:session_stopped') {
        const payload = event.payload;
        setWorkstations(prev => prev.map(w => w.id === payload.stationId ? { ...w, status: 'available', currentSession: undefined } : w));
        showToast('Workstation Freed', `${payload.stationId} released. Bill: ₹${payload.bill}`, 'info');
      } else if (event.type === 'crm:lead_created') {
        const payload = event.payload;
        setCrmLeads(prev => [payload, ...prev.filter(l => l.id !== payload.id)]);
      } else if (event.type === 'crm:stage_updated') {
        const payload = event.payload;
        setCrmLeads(prev => prev.map(l => l.id === payload.id ? { ...l, stage: payload.stage } : l));
      } else if (event.type === 'document:uploaded') {
        const payload = event.payload;
        setDocuments(prev => [payload, ...prev.filter(d => d.id !== payload.id)]);
        showToast('Document Vault', `Document "${payload.fileName}" verified and vaulted.`, 'info');
      } else if (event.type === 'hrms:attendance_updated') {
        const payload = event.payload;
        setEmployees(prev => prev.map(e => e.id === payload.id ? { ...e, attendanceStatus: payload.status } : e));
      } else if (event.type === 'hrms:employee_created') {
        const payload = event.payload;
        setEmployees(prev => [payload, ...prev.filter(e => e.id !== payload.id)]);
      } else if (event.type === 'erp:stock_updated') {
        const payload = event.payload;
        setInventory(prev => prev.map(i => i.id === payload.id ? { ...i, stockQuantity: payload.stockQuantity } : i));
      } else if (event.type === 'erp:inventory_created') {
        const payload = event.payload;
        setInventory(prev => [payload, ...prev.filter(i => i.id !== payload.id)]);
      }
    });

    return () => {
      isMounted = false;
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  const showToast = (title: string, message: string, type: NotificationItem['type'] = 'info') => {
    const newToast: NotificationItem = {
      id: 'toast-' + Date.now() + Math.random(),
      title,
      message,
      type,
      timestamp: new Date().toLocaleTimeString(),
      read: false,
    };
    setToasts(prev => [newToast, ...prev.slice(0, 4)]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== newToast.id));
    }, 4500);
  };

  const logAudit = (action: string, target: string, status: AuditLogItem['status'] = 'Success') => {
    const newLog: AuditLogItem = {
      id: 'AUD-' + Math.floor(1000 + Math.random() * 9000),
      actor: currentRole === 'admin' ? 'Super Admin' : `${currentRole.toUpperCase()} User`,
      role: currentRole,
      action,
      target,
      ipAddress: '103.21.144.' + Math.floor(10 + Math.random() * 80),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      status,
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Add Custom Service (Zero-Code Engine)
  const addCustomService = (newService: ServiceItem) => {
    setServices(prev => [newService, ...prev]);
    logAudit(`Created New Dynamic Service: ${newService.title}`, 'Service Marketplace Engine');
    showToast('Service Created Successfully', `"${newService.title}" is now live across the platform.`, 'success');
  };

  // Submit Application
  const submitApplication = (appData: Partial<Application>): string => {
    const newId = 'AD-APP-' + Math.floor(1000 + Math.random() * 9000);
    const newApp: Application = {
      id: newId,
      serviceId: appData.serviceId || 'srv-custom',
      serviceName: appData.serviceName || 'Service Request',
      category: appData.category || 'government',
      applicantName: appData.applicantName || 'Applicant',
      applicantPhone: appData.applicantPhone || '+91 98000 00000',
      applicantEmail: appData.applicantEmail || 'user@akuldravin.com',
      city: appData.city || 'Patna',
      state: appData.state || 'Bihar',
      status: 'Submitted',
      submittedAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
      assignedTo: aiControlConfig.autonomousRoutingEnabled
        ? `QUANTUM AI Routed • ${appData.assignedTo || 'Regional Hub Executive'}`
        : (appData.assignedTo || 'Regional Hub Executive'),
      feePaid: appData.feePaid || 0,
      utrNumber: appData.utrNumber,
      transactionId: appData.transactionId,
      paymentStatus: appData.utrNumber ? (appData.paymentStatus || 'UTR_SUBMITTED') : undefined,
      paymentMode: appData.paymentMode,
      aiRoutingNote: aiControlConfig.autonomousRoutingEnabled
        ? 'AI Routing + UTR Screening Active'
        : undefined,
      documentsUploaded: appData.documentsUploaded || ['Uploaded_Document_1.pdf'],
      uploadedDocumentRecords: appData.uploadedDocumentRecords,
      formData: appData.formData,
      notes: appData.notes || 'Initial submission verified by Quantum Document AI.',
      trackingSteps: [
        {
          title: appData.utrNumber ? `Payment Proof Logged (UTR: ${appData.utrNumber})` : 'Application Created',
          titleHi: appData.utrNumber ? `भुगतान यूटीआर दर्ज (${appData.utrNumber})` : 'आवेदन दर्ज हुआ',
          description: appData.utrNumber
            ? `Transaction ${appData.transactionId || 'TXN'} logged for verification before execution.`
            : 'Application received and token assigned.',
          descriptionHi: 'आवेदन एवं भुगतान विवरण प्राप्त हुआ एवं टोकन आवंटित हुआ।',
          date: 'Just now',
          isCompleted: true,
          isCurrent: true,
        },
        {
          title: 'Document Scrutiny',
          titleHi: 'दस्तावेज़ समीक्षा',
          description: 'Simulated OCR checking document validity and format match.',
          descriptionHi: 'दस्तावेज़ों की जाँच प्रगति पर है।',
          date: 'Pending',
          isCompleted: false,
          isCurrent: false,
        },
        {
          title: 'Executive Processing',
          titleHi: 'कार्यपालक प्रक्रिया',
          description: 'Official filing & submission with government/partner.',
          descriptionHi: 'आधिकारिक पोर्टल पर प्रक्रिया।',
          date: 'Pending',
          isCompleted: false,
          isCurrent: false,
        },
        {
          title: 'Completion & Dispatch',
          titleHi: 'पूर्ण एवं प्रेषित',
          description: 'Digital delivery to customer vault and doorstep dispatch.',
          descriptionHi: 'डिजिटल डिलीवरी एवं होम डिलीवरी।',
          date: 'Pending',
          isCompleted: false,
          isCurrent: false,
        }
      ]
    };

    setApplications(prev => [newApp, ...prev]);
    if (newApp.utrNumber && newApp.transactionId) {
      const paymentEntry: UTRPaymentProof = {
        id: `UTR-REC-${Date.now()}`,
        orderId: newId,
        utrNumber: newApp.utrNumber,
        transactionId: newApp.transactionId,
        paymentMethod: (newApp.paymentMode as UTRPaymentProof['paymentMethod']) || 'upi',
        amountPaid: newApp.feePaid || 0,
        serviceTitle: newApp.serviceName,
        applicantName: newApp.applicantName,
        applicantPhone: newApp.applicantPhone,
        paidAt: new Date().toISOString(),
        paymentStatus: newApp.paymentStatus || 'UTR_SUBMITTED',
        aiRiskFlag: aiControlConfig.autoUtrScrutinyEnabled && newApp.utrNumber.length >= 10 ? 'LOW_RISK' : 'REVIEW_REQUIRED',
      };
      setUtrPayments(prev => {
        const next = [paymentEntry, ...prev].slice(0, 100);
        try { localStorage.setItem('adcs_utr_payments', JSON.stringify(next)); } catch {}
        return next;
      });
    }
    logAudit(`Application Generated: ${newId}`, `Service: ${newApp.serviceName}${newApp.utrNumber ? ` (UTR: ${newApp.utrNumber})` : ''}`);
    showToast('Application Submitted!', `Your tracking ID is ${newId}. Check Live Tracking.`, 'success');

    // Asynchronously dispatch to Backend API Gateway
    apiClient.submitApplication({
      id: newId,
      serviceId: newApp.serviceId,
      serviceName: newApp.serviceName,
      customerName: newApp.applicantName,
      phone: newApp.applicantPhone,
      utrNumber: newApp.utrNumber,
      transactionId: newApp.transactionId,
      notes: newApp.notes
    }).catch(() => {});

    return newId;
  };

  const updateApplicationStatus = (appId: string, status: ApplicationStatus, notes?: string) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          status,
          updatedAt: new Date().toLocaleString(),
          notes: notes || app.notes,
        };
      }
      return app;
    }));
    logAudit(`Updated Status of ${appId} to ${status}`, 'Application Queue');
    showToast('Status Updated', `Application ${appId} changed to ${status}.`, 'info');

    // Asynchronously dispatch to Backend API Gateway
    apiClient.updateApplicationStatus(appId, status, notes, currentRole).catch(() => {});
  };

  // Cart operations
  const addToCart = (service: ServiceItem) => {
    const newItem: CartItem = {
      id: 'cart-' + Date.now() + Math.random(),
      serviceId: service.id,
      title: service.title,
      category: service.category,
      price: service.basePrice,
      govtFee: service.govtFee || 0,
      professionalFee: service.professionalFee || 0,
    };
    setCart(prev => [...prev, newItem]);
    showToast('Added to Cart', `${service.title} was added to your unified cart.`, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  // Workstation PC session control
  const startWorkstationSession = (pcId: string, customerName: string, phone: string, task: string) => {
    setWorkstations(prev => prev.map(pc => {
      if (pc.id === pcId) {
        return {
          ...pc,
          status: 'in-use',
          currentSession: {
            customerName,
            phone,
            startTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            elapsedMinutes: 1,
            activeTask: task,
            hourlyRate: 40,
          }
        };
      }
      return pc;
    }));
    apiClient.startWorkstationSession(pcId, { customerName, phone, task }).catch(() => {});
    logAudit(`Started Workstation Session on ${pcId}`, `Customer: ${customerName}`);
    showToast('Session Started', `${pcId} is now active for ${customerName}.`, 'success');
  };

  const stopWorkstationSession = (pcId: string): number => {
    let bill = 40;
    setWorkstations(prev => prev.map(pc => {
      if (pc.id === pcId) {
        if (pc.currentSession) {
          bill = Math.max(20, Math.ceil((pc.currentSession.elapsedMinutes / 60) * pc.currentSession.hourlyRate));
        }
        return {
          ...pc,
          status: 'available',
          currentSession: undefined,
        };
      }
      return pc;
    }));
    apiClient.stopWorkstationSession(pcId).catch(() => {});
    logAudit(`Ended Workstation Session on ${pcId}`, `Bill Generated: ₹${bill}`);
    showToast('Session Completed', `${pcId} freed. Final Bill: ₹${bill}`, 'info');
    return bill;
  };

  const addPrintJob = (job: Omit<PrintScanJob, 'id' | 'timestamp'>) => {
    const newJob: PrintScanJob = {
      ...job,
      id: 'PJ-' + Math.floor(1000 + Math.random() * 9000),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setPrintJobs(prev => [newJob, ...prev]);
    showToast('Print/Scan Job Queued', `Job ${newJob.id} added. Total: ₹${newJob.totalCost}`, 'success');
  };

  // Courier booking
  const bookShipment = (data: Omit<CourierShipment, 'id' | 'awb' | 'status' | 'timeline'>): string => {
    const newAwb = 'AD-EXP-' + Math.floor(100000 + Math.random() * 900000);
    const newShipment: CourierShipment = {
      ...data,
      id: 'SHP-' + Math.floor(10000 + Math.random() * 90000),
      awb: newAwb,
      status: 'Booked',
      timeline: [
        {
          stage: 'Shipment Booked & Barcode Created',
          location: data.senderCity + ' Center',
          timestamp: 'Just now',
          done: true,
        },
        {
          stage: 'Dispatched to Air/Surface Sorting Hub',
          location: 'Regional Logistics Center',
          timestamp: 'Pending Pickup',
          done: false,
        },
        {
          stage: 'In Transit',
          location: 'National Transit Hub',
          timestamp: 'Expected in 24h',
          done: false,
        },
        {
          stage: 'Delivered to Consignee',
          location: data.receiverCity,
          timestamp: data.expectedDelivery,
          done: false,
        }
      ]
    };
    setShipments(prev => [newShipment, ...prev]);
    logAudit(`Booked Parcel Shipment with AWB ${newAwb}`, `To: ${data.receiverCity}`);
    showToast('Shipment Booked!', `AWB Code: ${newAwb}. You can track it anytime.`, 'success');
    return newAwb;
  };

  // CRM
  const addLead = (lead: Omit<CRMLead, 'id' | 'createdDate'>) => {
    const newLead: CRMLead = {
      ...lead,
      id: 'LEAD-' + Math.floor(100 + Math.random() * 900),
      createdDate: new Date().toLocaleDateString(),
    };
    setCrmLeads(prev => [newLead, ...prev]);
    apiClient.createCRMLead(newLead).catch(() => {});
    showToast('CRM Lead Created', `Lead for ${lead.company} registered.`, 'success');
  };

  const updateLeadStage = (leadId: string, stage: CRMLead['stage']) => {
    setCrmLeads(prev => prev.map(l => l.id === leadId ? { ...l, stage } : l));
    apiClient.updateCRMLeadStage(leadId, stage).catch(() => {});
  };

  // HRMS Attendance
  const toggleEmployeeAttendance = (empId: string) => {
    let nextStatus: 'Present' | 'Absent' = 'Present';
    setEmployees(prev => prev.map(emp => {
      if (emp.id === empId) {
        nextStatus = emp.attendanceStatus === 'Present' ? 'Absent' : 'Present';
        return { ...emp, attendanceStatus: nextStatus };
      }
      return emp;
    }));
    apiClient.toggleEmployeeAttendance(empId, nextStatus).catch(() => {});
    showToast('Attendance Updated', `Staff member attendance logged.`, 'info');
  };

  // Inventory
  const updateInventoryStock = (invId: string, delta: number) => {
    setInventory(prev => prev.map(item => {
      if (item.id === invId) {
        return { ...item, stockQuantity: Math.max(0, item.stockQuantity + delta) };
      }
      return item;
    }));
    apiClient.updateInventoryStock(invId, { delta }).catch(() => {});
    showToast('Inventory Stock Adjusted', `Stock quantity updated.`, 'info');
  };

  // Documents
  const uploadDocument = (doc: Omit<DocumentItem, 'id' | 'uploadDate'>) => {
    const newDoc: DocumentItem = {
      ...doc,
      id: 'DOC-' + Math.floor(100 + Math.random() * 900),
      uploadDate: new Date().toISOString().substring(0, 10),
    };
    setDocuments(prev => [newDoc, ...prev]);
    apiClient.uploadDocument({
      fileName: doc.name,
      docType: doc.category || doc.fileType,
      applicantName: 'Citizen Applicant'
    }).catch(() => {});
    showToast('Document Uploaded to Vault', `${doc.name} saved to local prototype vault.`, 'success');
  };

  const deleteDocument = (docId: string) => {
    setDocuments(prev => prev.filter(d => d.id !== docId));
    showToast('Document Removed', 'File deleted from vault.', 'info');
  };

  // Enterprise Double-Entry Ledger
  const recordJournalEntry = (entry: Omit<DoubleEntryJournal, 'id' | 'cryptographicHash' | 'balanced' | 'totalDebit' | 'totalCredit'>) => {
    const totalDebit = entry.lines.reduce((sum, l) => sum + (l.debit || 0), 0);
    const totalCredit = entry.lines.reduce((sum, l) => sum + (l.credit || 0), 0);
    const balanced = Math.abs(totalDebit - totalCredit) < 0.01;
    const newJournal: DoubleEntryJournal = {
      ...entry,
      id: 'JRN-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000),
      totalDebit,
      totalCredit,
      balanced,
      cryptographicHash: 'hash_' + Math.random().toString(36).substring(2, 12)
    };
    setDoubleEntryJournals(prev => [newJournal, ...prev]);
    logAudit('DOUBLE_ENTRY_JOURNAL', `Posted Journal Entry ${newJournal.id} (Debit: ₹${totalDebit}, Credit: ₹${totalCredit})`, balanced ? 'Success' : 'Warning');
    showToast('Journal Entry Recorded', `Transaction reference ${entry.reference} posted to General Ledger.`, balanced ? 'success' : 'warning');
  };

  // Support Tickets
  const createSupportTicket = (ticket: Omit<SupportTicket, 'id' | 'createdAt' | 'status' | 'slaRemainingHours' | 'messages'> & { initialMessage: string }) => {
    const newTicket: SupportTicket = {
      ...ticket,
      id: 'TKT-' + Math.floor(1000 + Math.random() * 9000),
      createdAt: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Open',
      slaRemainingHours: 4.0,
      messages: [
        { sender: ticket.customerName, role: 'Citizen', text: ticket.initialMessage, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]
    };
    setSupportTickets(prev => [newTicket, ...prev]);
    showToast('Support Ticket Raised', `Ticket #${newTicket.id} created with 4-hour SLA guarantee.`, 'success');
  };

  const replySupportTicket = (ticketId: string, text: string) => {
    setSupportTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          status: 'In Progress',
          messages: [
            ...t.messages,
            { sender: 'Executive Support', role: 'Support Agent', text, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
          ]
        };
      }
      return t;
    }));
    showToast('Reply Sent', `Message added to ticket #${ticketId}.`, 'info');
  };

  const resolveSupportTicket = (ticketId: string) => {
    setSupportTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: 'Resolved', slaRemainingHours: 0 } : t));
    showToast('Ticket Resolved', `Ticket #${ticketId} marked as successfully resolved.`, 'success');
  };

  // Marketing Automation
  const createMarketingCampaign = (campaign: Omit<MarketingCampaign, 'id' | 'status' | 'sentCount' | 'deliveredCount' | 'conversionCount'>) => {
    const newCampaign: MarketingCampaign = {
      ...campaign,
      id: 'CMP-' + new Date().getFullYear() + '-' + Math.floor(10 + Math.random() * 90),
      status: 'Scheduled',
      sentCount: 0,
      deliveredCount: 0,
      conversionCount: 0
    };
    setMarketingCampaigns(prev => [newCampaign, ...prev]);
    showToast('Campaign Scheduled', `"${campaign.name}" configured for dispatch across ${campaign.channel}.`, 'success');
  };

  const launchCampaign = (campaignId: string) => {
    setMarketingCampaigns(prev => prev.map(c => {
      if (c.id === campaignId) {
        const sent = c.targetCount;
        const delivered = Math.floor(sent * 0.98);
        const conversion = Math.floor(delivered * 0.08);
        return {
          ...c,
          status: 'Active',
          sentCount: sent,
          deliveredCount: delivered,
          conversionCount: conversion
        };
      }
      return c;
    }));
    showToast('Campaign Dispatched', `Broadcast delivered via verified provider switch.`, 'success');
  };

  // Distributor
  const addDownlineFranchise = (franchise: Omit<DistributorDownline, 'id' | 'monthlyGtv' | 'commissionEarned' | 'status'>) => {
    const newFranchise: DistributorDownline = {
      ...franchise,
      id: 'DST-FRN-' + Math.floor(100 + Math.random() * 900),
      monthlyGtv: 500000,
      commissionEarned: Math.floor(500000 * (franchise.overrideCommissionRate / 100)),
      status: 'Active'
    };
    setDistributorDownlines(prev => [newFranchise, ...prev]);
    showToast('Franchise Onboarded', `${franchise.franchiseName} added to distributor network.`, 'success');
  };

  // Affiliate
  const requestAffiliatePayout = (amount: number) => {
    showToast('Withdrawal Submitted', `Payout request for ₹${amount.toLocaleString('en-IN')} submitted to Finance Portal for NEFT/IMPS transfer.`, 'success');
  };

  // API Providers
  const toggleApiProviderMode = (providerId: string) => {
    setApiProviders(prev => prev.map(p => {
      if (p.id === providerId) {
        const nextMode = p.mode === 'Sandbox' ? 'Production' : 'Sandbox';
        return { ...p, mode: nextMode };
      }
      return p;
    }));
    showToast('Connector Mode Toggled', `Switched connector operational environment.`, 'info');
  };

  const updateApiProviderStatus = (providerId: string, status: ApiConnectorProvider['status']) => {
    setApiProviders(prev => prev.map(p => p.id === providerId ? { ...p, status } : p));
  };

  // White Label / Enterprise Brand Management
  const updateWhiteLabelConfig = (config: Partial<WhiteLabelConfig>) => {
    setWhiteLabelConfig(prev => {
      const updated: WhiteLabelConfig = { ...prev, ...config };
      localStorage.setItem('ad_whitelabel_config', JSON.stringify(updated));
      return updated;
    });
    showToast('Brand Configuration Updated', 'ADCS brand settings saved locally.', 'success');
  };

  const publishWhiteLabelConfig = async (config: Partial<WhiteLabelConfig>, actor = 'Super Admin') => {
    const nextVersion = (whiteLabelConfig.version || 1) + 1;
    const timestamp = new Date().toISOString();
    const published: WhiteLabelConfig = {
      ...whiteLabelConfig,
      ...config,
      approvalStatus: 'PUBLISHED',
      version: nextVersion,
      lastPublishedAt: timestamp,
      lastPublishedBy: actor,
    };
    setWhiteLabelConfig(published);
    localStorage.setItem('ad_whitelabel_config', JSON.stringify(published));

    const entry: BrandAuditEntry = {
      id: `br-aud-${Date.now()}`,
      timestamp,
      actor,
      action: 'BRAND_PUBLISHED',
      summary: `Published Brand Configuration v${nextVersion} (${published.brandName})`,
      version: nextVersion,
    };
    setBrandAuditLog(prev => {
      const nextLog = [entry, ...prev].slice(0, 50);
      localStorage.setItem('adcs_brand_audit_log', JSON.stringify(nextLog));
      return nextLog;
    });

    try {
      await fetch('/api/admin/whitelabel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...published, actor }),
      });
    } catch {
      // Offline / frontend-only safe fallback
    }
    showToast('Brand Configuration Published', `Live across portals & templates (v${nextVersion}.0).`, 'success');
  };

  // Strict Role-Locked Login Authentication (Blocks Cross-Panel Login)
  const loginWithPanelCredentials = async (
    panelKey: LoginPanelKey,
    loginId: string,
    password: string
  ): Promise<{ ok: boolean; message: string; redirectTo?: string; user?: AuthUserAccount }> => {
    const normalizedId = loginId.trim().toUpperCase();
    const targetPanel = LOGIN_PANELS.find((p) => p.panelKey === panelKey);

    if (!normalizedId || !password) {
      return { ok: false, message: 'Login ID and Password are required.' };
    }

    const foundAccount = userAccounts.find(
      (acc) => acc.loginId.toUpperCase() === normalizedId
    );

    if (!foundAccount || foundAccount.password !== password) {
      logAudit(`Failed Panel Login Attempt (${normalizedId})`, `Panel: ${panelKey}`, 'Blocked');
      return { ok: false, message: 'Invalid Login ID or Password. Please verify credentials.' };
    }

    if (foundAccount.status === 'Suspended') {
      logAudit(`Suspended Account Login Blocked (${normalizedId})`, `Panel: ${panelKey}`, 'Blocked');
      return { ok: false, message: 'Account suspended by Super Admin. Contact Governance Desk.' };
    }

    // Strict Single-Panel Lock Enforcement
    if (foundAccount.panelKey !== panelKey) {
      const ownedPanel = LOGIN_PANELS.find((p) => p.panelKey === foundAccount.panelKey);
      const errMsg = `Access Denied: Account "${foundAccount.loginId}" is strictly bound to "${ownedPanel?.title || foundAccount.panelKey}" (${foundAccount.designation}) and cannot log into "${targetPanel?.title || panelKey}".`;
      logAudit(`Cross-Panel Intrusion Blocked (${normalizedId})`, `Tried ${panelKey}, Owned ${foundAccount.panelKey}`, 'Blocked');
      return { ok: false, message: errMsg };
    }

    // Optional Backend Synchronization (non-blocking if offline)
    try {
      await fetch('/api/auth/panel-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ panelKey, loginId: foundAccount.loginId, password }),
      });
    } catch {}

    setAuthenticatedUser(foundAccount);
    setCurrentRole(foundAccount.role);
    setActiveDigitalSevaTier(foundAccount.digitalSevaTier);
    setWalletBalance(foundAccount.walletBalance);
    try {
      localStorage.setItem('adcs_auth_user', JSON.stringify(foundAccount));
      localStorage.setItem('adcs_seva_tier', foundAccount.digitalSevaTier);
    } catch {}

    logAudit(`Authenticated (${foundAccount.designation})`, `Panel: ${targetPanel?.title || panelKey}`);
    showToast('Authenticated Successfully', `${foundAccount.name} • ${foundAccount.department}`, 'success');
    return {
      ok: true,
      message: 'Authenticated cleanly',
      redirectTo: targetPanel?.defaultRoute || '/',
      user: foundAccount,
    };
  };

  const logoutSession = () => {
    setAuthenticatedUser(null);
    setCurrentRole('customer');
    setActiveDigitalSevaTier('none');
    try {
      localStorage.removeItem('adcs_auth_user');
      localStorage.setItem('adcs_seva_tier', 'none');
    } catch {}
    showToast('Signed Out', 'Secure workspace session terminated.', 'info');
  };

  const hasPermission = (perm: PermissionFlag): boolean => {
    if (currentRole === 'admin') return true;
    if (authenticatedUser) {
      return authenticatedUser.permissions.includes(perm);
    }
    return perm === 'view_services' || perm === 'export_reports';
  };

  const updateUserAccountAccess = (accountId: string, patch: Partial<AuthUserAccount>) => {
    if (currentRole !== 'admin') {
      showToast('Admin Only', 'Only Super Admin can alter user roles, designations, or access.', 'error');
      return;
    }
    setUserAccounts((prev) => {
      const next = prev.map((u) => (u.id === accountId ? { ...u, ...patch } : u));
      try { localStorage.setItem('adcs_user_accounts', JSON.stringify(next)); } catch {}
      return next;
    });
    if (authenticatedUser?.id === accountId) {
      const updated = { ...authenticatedUser, ...patch };
      setAuthenticatedUser(updated);
      try { localStorage.setItem('adcs_auth_user', JSON.stringify(updated)); } catch {}
    }
    logAudit(`Admin Updated Access Control (${accountId})`, `Fields: ${Object.keys(patch).join(', ')}`);
    showToast('Access Matrix Updated', 'Permissions, designation, or department saved.', 'success');
  };

  const createManagedAccount = (account: Omit<AuthUserAccount, 'id'>) => {
    if (currentRole !== 'admin') {
      showToast('Admin Only', 'Only Super Admin can provision new portal credentials.', 'error');
      return;
    }
    const created: AuthUserAccount = { ...account, id: `acc-${Date.now()}` };
    setUserAccounts((prev) => {
      const next = [created, ...prev];
      try { localStorage.setItem('adcs_user_accounts', JSON.stringify(next)); } catch {}
      return next;
    });
    logAudit(`Provisioned Credentials (${created.loginId})`, `Panel: ${created.panelKey} • Dept: ${created.department}`);
    showToast('Account Provisioned', `${created.loginId} created and strictly locked to ${created.designation}.`, 'success');
  };

  const submitUtrPayment = (
    proof: Omit<UTRPaymentProof, 'id' | 'paidAt' | 'paymentStatus' | 'aiRiskFlag'>
  ): UTRPaymentProof => {
    const duplicate = utrPayments.some((u) => u.utrNumber === proof.utrNumber.toUpperCase());
    const entry: UTRPaymentProof = {
      ...proof,
      id: `UTR-${Date.now()}`,
      utrNumber: proof.utrNumber.toUpperCase(),
      transactionId: proof.transactionId.toUpperCase(),
      paidAt: new Date().toISOString(),
      paymentStatus: 'UTR_SUBMITTED',
      aiRiskFlag: duplicate ? 'REVIEW_REQUIRED' : proof.utrNumber.length >= 10 ? 'LOW_RISK' : 'REVIEW_REQUIRED',
    };
    setUtrPayments((prev) => {
      const next = [entry, ...prev].slice(0, 100);
      try { localStorage.setItem('adcs_utr_payments', JSON.stringify(next)); } catch {}
      return next;
    });
    logAudit(`UTR Submitted (${entry.utrNumber})`, `Txn: ${entry.transactionId} • ₹${entry.amountPaid}`);
    return entry;
  };

  const verifyUtrPayment = (paymentId: string, status: 'VERIFIED' | 'REJECTED', notes?: string) => {
    if (!hasPermission('verify_utr_payments') && currentRole !== 'admin') {
      showToast('Permission Required', 'UTR verification requires Admin or authorized Finance permission.', 'error');
      return;
    }
    const target = utrPayments.find((u) => u.id === paymentId);
    setUtrPayments((prev) => {
      const next = prev.map((u) =>
        u.id === paymentId
          ? {
              ...u,
              paymentStatus: status,
              verifiedBy: authenticatedUser?.name || 'Super Admin',
              verifiedAt: new Date().toISOString(),
              aiRiskFlag: status === 'VERIFIED' ? ('VERIFIED_MATCH' as const) : ('REVIEW_REQUIRED' as const),
            }
          : u
      );
      try { localStorage.setItem('adcs_utr_payments', JSON.stringify(next)); } catch {}
      return next;
    });
    if (target) {
      setApplications((prev) =>
        prev.map((a) =>
          a.id === target.orderId
            ? {
                ...a,
                paymentStatus: status,
                status: status === 'VERIFIED' ? 'In Processing' : 'Rejected',
                notes: notes || `UTR ${target.utrNumber} ${status} by ${authenticatedUser?.name || 'Super Admin'}.`,
              }
            : a
        )
      );
    }
    logAudit(`UTR ${status}: ${target?.utrNumber || paymentId}`, `Order: ${target?.orderId || 'Direct'}`, status === 'VERIFIED' ? 'Success' : 'Warning');
    showToast(`UTR ${status}`, `${target?.utrNumber || paymentId} marked as ${status}.`, status === 'VERIFIED' ? 'success' : 'warning');
  };

  const activatePlanWithUtr = (
    planId: string,
    utrNumber: string,
    transactionId: string,
    paymentMethod: 'upi' | 'bank_transfer' | 'card' | 'wallet'
  ) => {
    const plan = pricingPlans.find((p) => p.id === planId);
    if (!plan) return;
    submitUtrPayment({
      orderId: `PLAN-${planId}-${Date.now()}`,
      utrNumber,
      transactionId,
      paymentMethod,
      amountPaid: plan.priceMonthly,
      serviceTitle: `Subscription Activation: ${plan.name}`,
      applicantName: authenticatedUser?.name || 'ADCS Member',
    });
    setActiveUserPlanId(planId);
    try { localStorage.setItem('adcs_active_plan_id', planId); } catch {}
    showToast('Plan Proof Submitted', `${plan.name} activated pending UTR confirmation (${utrNumber}).`, 'success');
  };

  const updateCommissionRule = (ruleId: string, patch: Partial<CommissionRule>): boolean => {
    if (currentRole !== 'admin') {
      logAudit(`Unauthorized Commission Edit Blocked`, `Role: ${currentRole}`, 'Blocked');
      showToast('Access Denied', 'Only Super Admin can configure or modify commissions.', 'error');
      return false;
    }
    setCommissionRules((prev) => {
      const next = prev.map((r) =>
        r.id === ruleId
          ? {
              ...r,
              ...patch,
              updatedAt: new Date().toISOString(),
              updatedBy: authenticatedUser?.name || 'Dr. Akul Dravin (Super Admin)',
            }
          : r
      );
      try { localStorage.setItem('adcs_commission_rules', JSON.stringify(next)); } catch {}
      return next;
    });
    logAudit(`Admin Updated Commission Rule (${ruleId})`, `Fields: ${Object.keys(patch).join(', ')}`);
    showToast('Commission Slab Updated', 'Saved securely by Super Admin across all portals.', 'success');
    return true;
  };

  const updateAiControlConfig = (patch: Partial<AISystemControlConfig>): boolean => {
    if (currentRole !== 'admin') {
      logAudit(`Unauthorized AI Control Toggle Blocked`, `Role: ${currentRole}`, 'Blocked');
      showToast('Admin Only', 'Only Super Admin can alter QUANTUM AI autonomous system controls.', 'error');
      return false;
    }
    setAiControlConfig((prev) => {
      const next: AISystemControlConfig = {
        ...prev,
        ...patch,
        lastSyncedAt: new Date().toISOString(),
        lastModifiedBy: authenticatedUser?.name || 'Super Admin',
      };
      try { localStorage.setItem('adcs_ai_control', JSON.stringify(next)); } catch {}
      return next;
    });
    logAudit(`QUANTUM AI Governance Updated`, `Controls: ${Object.keys(patch).join(', ')}`);
    showToast('AI System Controls Updated', 'Autonomous orchestration policy synchronized.', 'success');
    return true;
  };

  const saveServiceBanner = (banner: ServiceBannerItem) => {
    if (currentRole !== 'admin' && !hasPermission('manage_banners')) {
      showToast('Access Denied', 'Only Super Admin or Banner Managers can edit campaign banners.', 'error');
      return;
    }
    setServiceBanners((prev) => {
      const exists = prev.some((b) => b.id === banner.id);
      const next = exists ? prev.map((b) => (b.id === banner.id ? banner : b)) : [banner, ...prev];
      try { localStorage.setItem('adcs_service_banners', JSON.stringify(next)); } catch {}
      return next;
    });
    showToast('Banner Saved', `"${banner.title}" updated across campaign strips.`, 'success');
  };

  const openApplyModal = (service: ServiceItem) => {
    setSelectedServiceForApply(service);
    setIsApplyModalOpen(true);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
        currentRole,
        setCurrentRole,
        walletBalance,
        setWalletBalance,
        services,
        addCustomService,
        applications,
        submitApplication,
        updateApplicationStatus,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartTotal,
        workstations,
        startWorkstationSession,
        stopWorkstationSession,
        printJobs,
        addPrintJob,
        properties,
        shipments,
        bookShipment,
        crmLeads,
        addLead,
        updateLeadStage,
        employees,
        toggleEmployeeAttendance,
        inventory,
        updateInventoryStock,
        documents,
        uploadDocument,
        deleteDocument,
        auditLogs,
        logAudit,
        isSearchOpen,
        setIsSearchOpen,
        isCartOpen,
        setIsCartOpen,
        isQuantumAIOpen,
        setIsQuantumAIOpen,
        quantumAIPendingPrompt,
        setQuantumAIPendingPrompt,
        openQuantumAI,
        isTrackerOpen,
        setIsTrackerOpen,
        activeTrackerQuery,
        setActiveTrackerQuery,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isApplyModalOpen,
        setIsApplyModalOpen,
        selectedServiceForApply,
        openApplyModal,
        toasts,
        showToast,
        doubleEntryJournals,
        recordJournalEntry,
        supportTickets,
        createSupportTicket,
        replySupportTicket,
        resolveSupportTicket,
        marketingCampaigns,
        createMarketingCampaign,
        launchCampaign,
        distributorDownlines,
        addDownlineFranchise,
        affiliateReferrals,
        requestAffiliatePayout,
        apiProviders,
        toggleApiProviderMode,
        updateApiProviderStatus,
        theme,
        toggleTheme,
        setTheme,
        whiteLabelConfig,
        updateWhiteLabelConfig,
        publishWhiteLabelConfig,
        brandAuditLog,
        userAccounts,
        authenticatedUser,
        isAuthenticated: Boolean(authenticatedUser),
        activeDigitalSevaTier,
        requestedAuthPanel,
        setRequestedAuthPanel,
        loginWithPanelCredentials,
        logoutSession,
        hasPermission,
        updateUserAccountAccess,
        createManagedAccount,
        utrPayments,
        submitUtrPayment,
        verifyUtrPayment,
        pricingPlans,
        activeUserPlanId,
        activatePlanWithUtr,
        commissionRules,
        updateCommissionRule,
        aiControlConfig,
        updateAiControlConfig,
        serviceBanners,
        saveServiceBanner,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  return context || defaultAppContextValue;
};
