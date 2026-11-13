export type UserRole = 
  | 'customer' 
  | 'vle' 
  | 'cafe_operator' 
  | 'franchise' 
  | 'distributor'
  | 'affiliate'
  | 'executive'
  | 'partner' 
  | 'admin'
  | 'advocate'
  | 'instructor'
  | 'student'
  | 'technician'
  | 'finance'
  | 'employee';

export type Language = 'en' | 'hi';

export type ServiceCategoryKey = 
  | 'government' 
  | 'cyber-cafe' 
  | 'business' 
  | 'documents' 
  | 'bills' 
  | 'travel' 
  | 'property' 
  | 'rental' 
  | 'construction' 
  | 'cctv' 
  | 'courier' 
  | 'finance' 
  | 'insurance' 
  | 'website-it' 
  | 'consulting' 
  | 'education'
  | 'astrology';

export interface ServiceCategory {
  id: ServiceCategoryKey;
  name: string;
  nameHi: string;
  description: string;
  descriptionHi: string;
  icon: string;
  route: string;
  count: number;
}

export interface CustomFormField {
  id: string;
  label: string;
  labelHi?: string;
  type: 'text' | 'number' | 'file' | 'date' | 'select' | 'textarea';
  required: boolean;
  placeholder?: string;
  placeholderHi?: string;
  options?: string[];
  optionsHi?: string[];
  helpText?: string;
  helpTextHi?: string;
  validationRegex?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  titleHi: string;
  category: ServiceCategoryKey;
  description: string;
  descriptionHi: string;
  icon: string;
  basePrice: number;
  govtFee?: number;
  professionalFee?: number;
  timeline: string;
  timelineHi: string;
  requiredDocs: string[];
  requiredDocsHi: string[];
  badge?: 'Assisted Service' | 'Official Partner' | 'Instant' | 'Most Popular' | 'Verified';
  slug: string;
  isCustomCreated?: boolean;
  customFields?: CustomFormField[];
  officialPortalUrl?: string;
}

export type ApplicationStatus = 
  | 'Submitted' 
  | 'Document Verification' 
  | 'Executive Assigned' 
  | 'In Processing' 
  | 'Government Scrutiny' 
  | 'Completed' 
  | 'Rejected';

export interface TrackingStep {
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  date: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

export interface UploadedDocumentRecord {
  id: string;
  documentKey: string;
  name: string;
  fileName: string;
  size: string;
  fileType: string;
  category: 'Identity' | 'Address' | 'DOB' | 'Land' | 'Medical' | 'Income' | 'Photo' | 'Legal' | 'Business' | 'Tax' | 'Property' | 'Education' | 'Other';
  uploadDate: string;
  status: 'verified' | 'pending' | 'flagged';
  ocrConfidence?: number;
  sha256?: string;
  previewUrl?: string;
  dataUrl?: string;
  source?: 'upload' | 'digilocker';
}

export interface Application {
  id: string; // e.g. AD-APP-8942
  serviceId: string;
  serviceName: string;
  category: ServiceCategoryKey;
  applicantName: string;
  applicantPhone: string;
  applicantEmail: string;
  city: string;
  state: string;
  status: ApplicationStatus;
  submittedAt: string;
  updatedAt: string;
  assignedTo?: string;
  feePaid: number;
  utrNumber?: string;
  transactionId?: string;
  paymentStatus?: 'UTR_SUBMITTED' | 'VERIFIED' | 'REJECTED';
  paymentMode?: string;
  aiRoutingNote?: string;
  documentsUploaded: string[];
  uploadedDocumentRecords?: UploadedDocumentRecord[];
  formData?: Record<string, any>;
  notes?: string;
  trackingSteps: TrackingStep[];
}

export interface DocumentItem {
  id: string;
  name: string;
  category: 'Identity' | 'Address' | 'Business' | 'Tax' | 'Property' | 'Education' | 'Other';
  fileType: string;
  uploadDate: string;
  expiryDate?: string;
  status: 'verified' | 'pending' | 'flagged';
  size: string;
  ocrConfidence?: number;
}

export interface Workstation {
  id: string; // e.g. PC-01
  name: string;
  ip: string;
  status: 'available' | 'in-use' | 'maintenance' | 'reserved';
  currentSession?: {
    customerName: string;
    phone: string;
    startTime: string;
    elapsedMinutes: number;
    activeTask: string;
    hourlyRate: number;
  };
}

export interface PrintScanJob {
  id: string;
  type: 'B/W Print' | 'Color Print' | 'Scan' | 'Lamination' | 'Spiral Binding';
  customerName: string;
  pages: number;
  copies: number;
  ratePerPage: number;
  totalCost: number;
  status: 'Completed' | 'Printing' | 'Queued';
  timestamp: string;
}

export interface PropertyItem {
  id: string;
  title: string;
  purpose: 'buy' | 'rent';
  type: 'Residential Flat' | 'Independent House' | 'Commercial Office' | 'Retail Shop' | 'Industrial Plot';
  price: number;
  priceFormatted: string;
  location: string;
  city: string;
  areaSqFt: number;
  bhk?: string;
  furnishing?: string;
  image: string;
  isVerified: boolean;
}

export interface RentalAgreement {
  id: string;
  propertyTitle: string;
  ownerName: string;
  tenantName: string;
  tenantPhone: string;
  monthlyRent: number;
  securityDeposit: number;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Under Review' | 'Completed';
  nextDueDate: string;
}

export interface CourierShipment {
  id: string;
  awb: string;
  senderName: string;
  senderCity: string;
  receiverName: string;
  receiverCity: string;
  serviceType: 'Express Air' | 'Surface Cargo' | 'Local Same-Day' | 'B2B Freight';
  weightKg: number;
  price: number;
  status: 'Booked' | 'Picked Up' | 'In Transit' | 'Out for Delivery' | 'Delivered';
  currentLocation: string;
  expectedDelivery: string;
  timeline: {
    stage: string;
    location: string;
    timestamp: string;
    done: boolean;
  }[];
}

export interface ConstructionEstimate {
  id: string;
  clientName: string;
  projectType: 'Independent Villa' | 'Multi-Story Apartment' | 'Commercial Complex' | 'Interior Renovation';
  areaSqFt: number;
  qualityGrade: 'Standard' | 'Premium' | 'Luxury';
  ratePerSqFt: number;
  totalEstimate: number;
  durationMonths: number;
  status: 'Quotation' | 'BOQ Finalized' | 'In Progress' | 'Completed';
}

export interface CRMLead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  serviceInterested: string;
  estimatedValue: number;
  stage: 'New' | 'Contacted' | 'Proposal' | 'Negotiation' | 'Won' | 'Lost';
  assignedExecutive: string;
  createdDate: string;
}

export interface EmployeeRecord {
  id: string;
  name: string;
  email: string;
  department: 'Operations' | 'Citizen Services' | 'Legal & Tax' | 'IT & Software' | 'Field Services';
  designation: string;
  status: 'Active' | 'On Leave' | 'Field Visit';
  attendanceStatus: 'Present' | 'Late' | 'Absent';
  salary: number;
  performanceScore: number;
}

export interface InventoryRecord {
  id: string;
  sku: string;
  name: string;
  category: 'Paper & Stationery' | 'Printer Toner & Cartridge' | 'CCTV & Hardware' | 'Lamination & Binding';
  stockQuantity: number;
  minReorderLevel: number;
  unitCost: number;
}

export interface CartItem {
  id: string;
  serviceId: string;
  title: string;
  category: ServiceCategoryKey;
  price: number;
  govtFee: number;
  professionalFee: number;
}

export interface AuditLogItem {
  id: string;
  actor: string;
  role: UserRole;
  action: string;
  target: string;
  ipAddress: string;
  timestamp: string;
  status: 'Success' | 'Warning' | 'Blocked';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

export interface JournalLine {
  accountCode: string; // e.g. 1010, 2010, 4010
  accountName: string;
  debit: number;
  credit: number;
}

export interface DoubleEntryJournal {
  id: string;
  date: string;
  reference: string;
  description: string;
  lines: JournalLine[];
  totalDebit: number;
  totalCredit: number;
  balanced: boolean;
  cryptographicHash: string;
}

export interface SupportTicket {
  id: string; // e.g. TKT-8901
  customerName: string;
  customerPhone: string;
  serviceCategory: string;
  subject: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical SLA';
  status: 'Open' | 'In Progress' | 'Escalated' | 'Resolved';
  assignedAgent: string;
  slaRemainingHours: number;
  createdAt: string;
  messages: {
    sender: string;
    role: string;
    text: string;
    timestamp: string;
  }[];
}

export interface MarketingCampaign {
  id: string;
  name: string;
  channel: 'Email' | 'SMS' | 'WhatsApp Business' | 'Push';
  audienceSegment: 'All Citizens' | 'VLE Franchisees' | 'Pending Documents' | 'Tax Compliance Leads';
  status: 'Draft' | 'Scheduled' | 'Active' | 'Completed';
  scheduledDate: string;
  targetCount: number;
  sentCount: number;
  deliveredCount: number;
  conversionCount: number;
  templateText: string;
}

export interface DistributorDownline {
  id: string;
  franchiseName: string;
  location: string;
  vleCount: number;
  monthlyGtv: number;
  overrideCommissionRate: number;
  commissionEarned: number;
  status: 'Active' | 'Suspended';
}

export interface AffiliateReferral {
  id: string;
  referralCode: string;
  customerName: string;
  serviceEnquired: string;
  status: 'Lead' | 'Purchased' | 'Settled';
  orderValue: number;
  commissionAmount: number;
  date: string;
}

export interface ApiConnectorProvider {
  id: string;
  name: string;
  category: 'Recharge' | 'BBPS' | 'AEPS' | 'PAN' | 'KYC' | 'Payment Gateway' | 'WhatsApp' | 'Travel';
  baseUrl: string;
  status: 'Online' | 'Degraded' | 'Offline' | 'Sandbox Active';
  mode: 'Sandbox' | 'Production';
  latencyMs: number;
  successRate: number;
  retryAttempts: number;
  timeoutSeconds: number;
  webhookUrl: string;
}

export interface WhiteLabelConfig {
  brandName: string;
  shortName?: string;
  tagline: string;
  taglineHi: string;
  logoUrl?: string;
  darkLogoUrl?: string;
  emblemUrl?: string;
  certificateLogoUrl?: string;
  primaryColor: string;
  accentColor: string;
  navyColor?: string;
  customDomain: string;
  supportPhone: string;
  supportEmail: string;
  registeredAddress?: string;
  invoiceHeader: string;
  footerText?: string;
  gstin: string;
  approvedSignatoryName?: string;
  approvedSignatoryDesignation?: string;
  certificateTemplateStyle?: 'classic-navy-gold' | 'executive-royal' | 'minimal-enterprise';
  letterheadTemplateStyle?: 'corporate-navy' | 'royal-accent';
  invoiceTemplateStyle?: 'gst-standard' | 'compact-thermal';
  watermarkEnabled?: boolean;
  approvalStatus?: 'DRAFT' | 'PENDING_APPROVAL' | 'PUBLISHED';
  version?: number;
  lastPublishedAt?: string;
  lastPublishedBy?: string;
}

export interface BrandAuditEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: 'BRAND_DRAFT_SAVED' | 'BRAND_PUBLISHED' | 'CERTIFICATE_REISSUED' | 'TEMPLATE_UPDATED';
  summary: string;
  version: number;
}

export interface CertificateReissueEntry {
  version: number;
  reason: string;
  reissuedBy: string;
  reissuedAt: string;
  previousHash?: string;
  newHash: string;
}

export interface AdvocateProfile {
  id: string;
  name: string;
  barCouncilNumber: string;
  stateBarCouncil: string;
  experienceYears: number;
  specialization: string[];
  languages: string[];
  consultationFee: number;
  availableDays: string[];
  availableTimeSlots: string[];
  status: 'VERIFIED' | 'PENDING' | 'SUSPENDED';
}

export interface LegalCaseEnquiry {
  id: string;
  caseToken: string;
  citizenName: string;
  citizenPhone: string;
  category: 'Property' | 'Matrimonial' | 'Consumer' | 'Employment' | 'Business' | 'Civil' | 'Documentation' | 'Tele-Law Govt Aid';
  type: 'ADCS Private Consultation' | 'Official Tele-Law Government Scheme';
  description: string;
  assignedAdvocateId?: string;
  assignedAdvocateName?: string;
  appointmentDateTime?: string;
  meetingLink?: string;
  status: 'SUBMITTED' | 'SCHEDULED' | 'IN_CONSULTATION' | 'COMPLETED' | 'CLOSED';
  caseNotes?: string[];
  feePaid: number;
}

export interface AcademyCourse {
  id: string;
  code: string;
  title: string;
  titleHi: string;
  category: 'AI' | 'Foundational' | 'Programming' | 'Marketing' | 'Business' | 'Vocational';
  durationHours: number;
  modulesCount: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: number;
  isFree?: boolean;
  syllabus: string[];
  enrolledStudentsCount: number;
  passingScorePercent: number;
}

export interface AcademyCertificate {
  certificateId: string;
  studentName: string;
  studentAadhaarMasked: string;
  courseTitle: string;
  courseCode: string;
  issuedDate: string;
  grade: 'Distinction' | 'Grade A' | 'Grade B' | 'Pass';
  issuerName: string;
  issuerDesignation: string;
  verificationUrl: string;
  qrCodeData: string;
  status: 'VALID' | 'REVOKED';
  isPrivateTrainingCert: true;
  versionNumber?: number;
  documentHash?: string;
  reissueHistory?: CertificateReissueEntry[];
}

export interface TechnicianJob {
  id: string;
  jobTicketNumber: string;
  customerName: string;
  customerPhone: string;
  serviceCategory: 'CCTV' | 'Networking' | 'Biometric Device' | 'Hardware Repair';
  address: string;
  packageDetails: string;
  assignedTechnicianName: string;
  scheduledTime: string;
  status: 'DISPATCHED' | 'EN_ROUTE' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  checklist: { item: string; completed: boolean }[];
  warrantyMonths: number;
  amount: number;
}

export interface BiometricDeviceState {
  vendor: 'Mantra' | 'Morpho' | 'Startek' | 'SecuGen';
  model: string;
  rdServiceStatus: 'READY' | 'NOT_READY' | 'DISCONNECTED' | 'ERROR';
  port: number;
  driverVersion: string;
  deviceSerial: string;
  lastPingTime: string;
}

export type DigitalSevaTier = 'none' | 'rural' | 'district' | 'state' | 'main_head' | 'super_admin';

export type DepartmentName =
  | 'Sovereign Governance'
  | 'National Command Center'
  | 'State Administration & Policy'
  | 'District Operations & VLE Supervision'
  | 'Rural Digital Seva Kendra'
  | 'Retail & Citizen Services'
  | 'Distribution & Sub-VLE Network'
  | 'Kiosk & Print Operations'
  | 'Regional Franchise Network'
  | 'Legal & Compliance'
  | 'ADCS Academy'
  | 'Field Engineering'
  | 'Finance & Clearing'
  | 'Channel & Affiliate Growth';

export type PermissionFlag =
  | 'view_services'
  | 'process_applications'
  | 'verify_utr_payments'
  | 'view_commissions'
  | 'edit_commissions'
  | 'manage_users_access'
  | 'manage_ai_control'
  | 'access_crm_erp'
  | 'export_reports'
  | 'manage_banners';

export type LoginPanelKey =
  | 'customer'
  | 'vle_rural'
  | 'vle_district'
  | 'vle_state'
  | 'vle_main_head'
  | 'distributor'
  | 'cafe_operator'
  | 'franchise'
  | 'affiliate'
  | 'partner'
  | 'employee'
  | 'finance'
  | 'advocate'
  | 'instructor'
  | 'student'
  | 'technician'
  | 'admin';

export interface AuthUserAccount {
  id: string;
  loginId: string;
  password: string;
  name: string;
  role: UserRole;
  panelKey: LoginPanelKey;
  digitalSevaTier: DigitalSevaTier;
  designation: string;
  department: DepartmentName;
  regionCode: string;
  status: 'Active' | 'Suspended';
  permissions: PermissionFlag[];
  activePlanId?: string;
  walletBalance: number;
}

export interface UTRPaymentProof {
  id: string;
  orderId: string;
  utrNumber: string;
  transactionId: string;
  paymentMethod: 'upi' | 'bank_transfer' | 'card' | 'wallet';
  amountPaid: number;
  serviceTitle: string;
  applicantName: string;
  applicantPhone?: string;
  paidAt: string;
  paymentStatus: 'UTR_SUBMITTED' | 'VERIFIED' | 'REJECTED';
  verifiedBy?: string;
  verifiedAt?: string;
  aiRiskFlag: 'LOW_RISK' | 'REVIEW_REQUIRED' | 'VERIFIED_MATCH';
}

export interface PricingPlanItem {
  id: string;
  targetGroup: 'citizen_retailer' | 'vle_rural' | 'district_state' | 'cyber_franchise' | 'business_distributor';
  name: string;
  nameHi: string;
  tierBadge: string;
  priceMonthly: number;
  priceAnnual: number;
  features: string[];
  maxApplications: string;
  highlight?: boolean;
}

export interface CommissionRule {
  id: string;
  serviceCategory: string;
  serviceTitle: string;
  ruralVlePct: number;
  districtMgrPct: number;
  stateHeadPct: number;
  mainHeadPct: number;
  distributorPct: number;
  franchisePct: number;
  affiliatePct: number;
  platformMarginPct: number;
  flatBonusInr: number;
  updatedAt: string;
  updatedBy: string;
}

export interface AISystemControlConfig {
  autonomousRoutingEnabled: boolean;
  autoUtrScrutinyEnabled: boolean;
  crossPanelIntrusionGuard: boolean;
  commissionAnomalyGuard: boolean;
  slaEscalationEnabled: boolean;
  bilingualAiConcierge: boolean;
  riskThresholdScore: number;
  lastSyncedAt: string;
  lastModifiedBy: string;
}

export interface ServiceBannerItem {
  id: string;
  sectorKey: string;
  title: string;
  titleHi: string;
  subtitle: string;
  subtitleHi: string;
  badge: string;
  ctaLabel: string;
  targetRoute: string;
  serviceId?: string;
  themeVariant: 'navy' | 'royal' | 'gold';
}


