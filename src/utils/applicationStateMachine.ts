/**
 * ADCS ULTIMATE • MASTER APPLICATION LIFECYCLE & STATE MACHINE (PRD Part F, §33)
 * Enforces strict transitions, 4 distinct identifiers, and status metadata across all 17 sectors.
 */

import { ApplicationStatus } from '../types';

export interface ApplicationStatusMeta {
  code: ApplicationStatus;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  color: string;
  bgColor: string;
  borderColor: string;
  badgeBg?: string;
  badgeColor?: string;
  badgeText?: string;
  isTerminal?: boolean;
  nextAllowedStatuses: ApplicationStatus[];
}

export const APPLICATION_STATUS_REGISTRY: Record<ApplicationStatus, ApplicationStatusMeta> = {
  DRAFT: {
    code: 'DRAFT',
    title: 'Draft in Progress',
    titleHi: 'प्रारूप (अपूर्ण)',
    description: 'Application intake started. Additional fields or document attachments pending.',
    descriptionHi: 'आवेदन पत्र भरा जा रहा है। जानकारी या दस्तावेज़ अभी बाकी हैं।',
    color: '#64748B',
    bgColor: '#F1F5F9',
    borderColor: '#CBD5E1',
    nextAllowedStatuses: ['DOCUMENTS_PENDING', 'READY_FOR_PAYMENT', 'CLOSED'],
  },
  DOCUMENTS_PENDING: {
    code: 'DOCUMENTS_PENDING',
    title: 'Documents Pending',
    titleHi: 'दस्तावेज़ अपलोड बाकी',
    description: 'Mandatory statutory documents must be attached before fee settlement.',
    descriptionHi: 'शुल्क भुगतान से पूर्व आवश्यक दस्तावेज़ अपलोड करना अनिवार्य है।',
    color: '#D97706',
    bgColor: '#FEF3C7',
    borderColor: '#FCD34D',
    nextAllowedStatuses: ['READY_FOR_PAYMENT', 'DRAFT', 'CLOSED'],
  },
  READY_FOR_PAYMENT: {
    code: 'READY_FOR_PAYMENT',
    title: 'Ready for Payment',
    titleHi: 'भुगतान हेतु तैयार',
    description: 'Intake and document checklist validated. Awaiting UTR / gateway checkout.',
    descriptionHi: 'दस्तावेज़ पूर्ण हुए। आवेदन शुल्क भुगतान की प्रतीक्षा है।',
    color: '#0284C7',
    bgColor: '#E0F2FE',
    borderColor: '#BAE6FD',
    nextAllowedStatuses: ['PAYMENT_PENDING', 'PAID_SUBMISSION_PENDING', 'DRAFT', 'CLOSED'],
  },
  PAYMENT_PENDING: {
    code: 'PAYMENT_PENDING',
    title: 'Payment Verification Pending',
    titleHi: 'भुगतान सत्यापन प्रगति पर',
    description: 'UTR proof submitted. Bank ledger reconciliation in progress.',
    descriptionHi: 'यूटीआर नंबर प्राप्त हुआ। बैंक मिलान व सत्यापन किया जा रहा है।',
    color: '#7C3AED',
    bgColor: '#EDE9FE',
    borderColor: '#DDD6FE',
    nextAllowedStatuses: ['PAYMENT_FAILED', 'PAID_SUBMISSION_PENDING', 'SUBMITTED', 'READY_FOR_PAYMENT'],
  },
  PAYMENT_FAILED: {
    code: 'PAYMENT_FAILED',
    title: 'Payment Failed / Rejected',
    titleHi: 'भुगतान असफल',
    description: 'UTR verification failed or transaction timed out. Application retained.',
    descriptionHi: 'भुगतान अस्वीकृत हुआ। कृपया वैध यूटीआर दर्ज करें या पुनः प्रयास करें।',
    color: '#DC2626',
    bgColor: '#FEE2E2',
    borderColor: '#FCA5A5',
    nextAllowedStatuses: ['READY_FOR_PAYMENT', 'PAYMENT_PENDING', 'CLOSED'],
  },
  PAID_SUBMISSION_PENDING: {
    code: 'PAID_SUBMISSION_PENDING',
    title: 'Paid • Submission Pending',
    titleHi: 'भुगतान सफल • सबमिशन प्रतीक्षित',
    description: 'Payment settled. Application queue is finalizing digital seal and receipt.',
    descriptionHi: 'भुगतान सत्यापित। सिस्टम रसीद एवं टोकन तैयार कर रहा है।',
    color: '#0D9488',
    bgColor: '#CCFBF1',
    borderColor: '#99F6E4',
    nextAllowedStatuses: ['SUBMITTED', 'UNDER_REVIEW'],
  },
  SUBMITTED: {
    code: 'SUBMITTED',
    title: 'Submitted to ADCS',
    titleHi: 'आवेदन जमा हुआ',
    description: 'Application successfully assigned to regional verification queue.',
    descriptionHi: 'आवेदन स्वीकार हुआ और क्षेत्रीय समीक्षा कतार में आवंटित है।',
    color: '#059669',
    bgColor: '#DCFCE7',
    borderColor: '#86EFAC',
    nextAllowedStatuses: ['UNDER_REVIEW', 'CORRECTION_REQUIRED', 'READY_FOR_PROVIDER', 'REJECTED'],
  },
  UNDER_REVIEW: {
    code: 'UNDER_REVIEW',
    title: 'Under Review & Scrutiny',
    titleHi: 'दस्तावेज़ समीक्षाधीन',
    description: 'ADCS scrutiny officer inspecting resolution clarity, MIME integrity & checksums.',
    descriptionHi: 'अधिकारी द्वारा दस्तावेज़ों की गुणवत्ता, वैधता व पात्रता की जांच जारी है।',
    color: '#075ACB',
    bgColor: '#EFF6FF',
    borderColor: '#BFDBFE',
    nextAllowedStatuses: ['CORRECTION_REQUIRED', 'READY_FOR_PROVIDER', 'APPOINTMENT_SCHEDULED', 'REJECTED'],
  },
  CORRECTION_REQUIRED: {
    code: 'CORRECTION_REQUIRED',
    title: 'Correction Required',
    titleHi: 'संशोधन / पुनः अपलोड आवश्यक',
    description: 'Reviewer flagged specific document or field discrepancy. Action required.',
    descriptionHi: 'अस्पष्ट दस्तावेज़ अथवा विवरण में त्रुटि के कारण संशोधन आवश्यक है।',
    color: '#EA580C',
    bgColor: '#FFEDD5',
    borderColor: '#FDBA74',
    nextAllowedStatuses: ['RESUBMITTED', 'UNDER_REVIEW', 'REJECTED'],
  },
  RESUBMITTED: {
    code: 'RESUBMITTED',
    title: 'Correction Resubmitted',
    titleHi: 'संशोधन पुनः प्रस्तुत',
    description: 'Applicant provided updated records. Priority scrutiny queue assigned.',
    descriptionHi: 'सुधारे गए दस्तावेज़ प्राप्त हुए। प्राथमिकता से पुनः समीक्षा जारी है।',
    color: '#0284C7',
    bgColor: '#E0F2FE',
    borderColor: '#BAE6FD',
    nextAllowedStatuses: ['UNDER_REVIEW', 'READY_FOR_PROVIDER', 'CORRECTION_REQUIRED'],
  },
  READY_FOR_PROVIDER: {
    code: 'READY_FOR_PROVIDER',
    title: 'Approved for Official Filing',
    titleHi: 'आधिकारिक फाइलिंग हेतु स्वीकृत',
    description: 'Pre-scrutiny passed. Dossier staged for authorized portal handoff / dispatch.',
    descriptionHi: 'आंतरिक समीक्षा पूर्ण। संबंधित आधिकारिक पोर्टल हेतु विवरण तैयार है।',
    color: '#16A34A',
    bgColor: '#DCFCE7',
    borderColor: '#86EFAC',
    nextAllowedStatuses: ['PROVIDER_PROCESSING', 'EXTERNAL_QUERY', 'APPOINTMENT_SCHEDULED'],
  },
  PROVIDER_PROCESSING: {
    code: 'PROVIDER_PROCESSING',
    title: 'Official Department Processing',
    titleHi: 'सरकारी / पार्टनर विभाग में प्रक्रियाधीन',
    description: 'Filing logged with competent authority. External reference assigned.',
    descriptionHi: 'आधिकारिक विभाग/पोर्टल में आवेदन दर्ज। बाहरी संदर्भ संख्या आवंटित है।',
    color: '#4F46E5',
    bgColor: '#EEF2FF',
    borderColor: '#C7D2FE',
    nextAllowedStatuses: ['EXTERNAL_QUERY', 'APPOINTMENT_SCHEDULED', 'APPROVED', 'REJECTED'],
  },
  EXTERNAL_QUERY: {
    code: 'EXTERNAL_QUERY',
    title: 'Official Department Query',
    titleHi: 'विभाग द्वारा अतिरिक्त जानकारी की मांग',
    description: 'Competent government authority raised inquiry or document objection.',
    descriptionHi: 'संबंधित विभाग/मंत्रालय ने अतिरिक्त साक्ष्य अथवा स्पष्टीकरण मांगा है।',
    color: '#D97706',
    bgColor: '#FEF3C7',
    borderColor: '#FCD34D',
    nextAllowedStatuses: ['PROVIDER_PROCESSING', 'UNDER_REVIEW', 'REJECTED'],
  },
  APPOINTMENT_SCHEDULED: {
    code: 'APPOINTMENT_SCHEDULED',
    title: 'Appointment Scheduled',
    titleHi: 'अपॉइंटमेंट स्लॉट निर्धारित',
    description: 'Center slot booked (PSK, UIDAI, RTO or Site Survey). Slip available in downloads.',
    descriptionHi: 'केंद्र स्लॉट बुक हुआ। अपॉइंटमेंट रसीद डाउनलोड केंद्र में उपलब्ध है।',
    color: '#0D9488',
    bgColor: '#CCFBF1',
    borderColor: '#99F6E4',
    nextAllowedStatuses: ['PROVIDER_PROCESSING', 'APPROVED', 'ISSUED'],
  },
  APPROVED: {
    code: 'APPROVED',
    title: 'Approved by Authority',
    titleHi: 'सक्षम प्राधिकारी द्वारा स्वीकृत',
    description: 'Statutory approval confirmed. Certificate generation in progress.',
    descriptionHi: 'आवेदन को आधिकारिक स्वीकृति मिल चुकी है। प्रमाणपत्र जारी किया जा रहा है।',
    color: '#15803D',
    bgColor: '#DCFCE7',
    borderColor: '#86EFAC',
    nextAllowedStatuses: ['ISSUED', 'DELIVERED'],
  },
  REJECTED: {
    code: 'REJECTED',
    title: 'Rejected with Explanation',
    titleHi: 'आवेदन निरस्त / अस्वीकृत',
    description: 'Application rejected by authority. Detailed reason and appeal guidance logged.',
    descriptionHi: 'विभाग द्वारा आवेदन अस्वीकृत किया गया। कारण एवं अपील सहायता उपलब्ध है।',
    color: '#B91C1C',
    bgColor: '#FEE2E2',
    borderColor: '#FCA5A5',
    isTerminal: true,
    nextAllowedStatuses: ['CLOSED', 'DRAFT'],
  },
  ISSUED: {
    code: 'ISSUED',
    title: 'Document / Certificate Issued',
    titleHi: 'प्रमाणपत्र / कार्ड जारी हुआ',
    description: 'Official deliverable generated by authority and vaulted in ADCS secure store.',
    descriptionHi: 'आधिकारिक प्रमाण पत्र/कार्ड जारी हो चुका है एवं वॉल्ट में सुरक्षित है।',
    color: '#059669',
    bgColor: '#ECFDF5',
    borderColor: '#6EE7B7',
    nextAllowedStatuses: ['DELIVERED', 'CLOSED'],
  },
  DELIVERED: {
    code: 'DELIVERED',
    title: 'Final Deliverable Available',
    titleHi: 'दस्तावेज़ उपलब्ध / प्रेषित',
    description: 'Available for instant digital download and physical dispatch tracking.',
    descriptionHi: 'डिजिटल प्रति डाउनलोड हेतु उपलब्ध है एवं भौतिक कार्ड प्रेषित किया गया।',
    color: '#065F46',
    bgColor: '#D1FAE5',
    borderColor: '#34D399',
    isTerminal: true,
    nextAllowedStatuses: ['CLOSED'],
  },
  CLOSED: {
    code: 'CLOSED',
    title: 'Lifecycle Closed',
    titleHi: 'कार्य पूर्ण / बंद',
    description: 'All milestones completed and customer confirmation recorded.',
    descriptionHi: 'सभी चरण सफलतापूर्वक पूर्ण एवं सुरक्षित संग्रहित।',
    color: '#334155',
    bgColor: '#F1F5F9',
    borderColor: '#94A3B8',
    isTerminal: true,
    nextAllowedStatuses: [],
  },

  // Legacy mappings for backward compatibility
  Submitted: {
    code: 'SUBMITTED',
    title: 'Submitted to ADCS',
    titleHi: 'आवेदन जमा हुआ',
    description: 'Application successfully assigned to regional verification queue.',
    descriptionHi: 'आवेदन स्वीकार हुआ और क्षेत्रीय समीक्षा कतार में आवंटित है।',
    color: '#059669',
    bgColor: '#DCFCE7',
    borderColor: '#86EFAC',
    nextAllowedStatuses: ['UNDER_REVIEW', 'CORRECTION_REQUIRED', 'READY_FOR_PROVIDER'],
  },
  'Document Verification': {
    code: 'UNDER_REVIEW',
    title: 'Document Verification',
    titleHi: 'दस्तावेज़ सत्यापन',
    description: 'Scrutiny officer inspecting uploaded records and checksums.',
    descriptionHi: 'दस्तावेज़ों की जाँच प्रगति पर है।',
    color: '#075ACB',
    bgColor: '#EFF6FF',
    borderColor: '#BFDBFE',
    nextAllowedStatuses: ['CORRECTION_REQUIRED', 'READY_FOR_PROVIDER'],
  },
  'Executive Assigned': {
    code: 'UNDER_REVIEW',
    title: 'Executive Assigned',
    titleHi: 'कार्यपालक आवंटित',
    description: 'Assigned to senior operations desk for pre-scrutiny.',
    descriptionHi: 'कार्यपालक द्वारा समीक्षा जारी है।',
    color: '#0284C7',
    bgColor: '#E0F2FE',
    borderColor: '#BAE6FD',
    nextAllowedStatuses: ['READY_FOR_PROVIDER', 'CORRECTION_REQUIRED'],
  },
  'In Processing': {
    code: 'PROVIDER_PROCESSING',
    title: 'In Processing',
    titleHi: 'प्रक्रियाधीन',
    description: 'Filing in progress with government / partner portal.',
    descriptionHi: 'आधिकारिक पोर्टल पर प्रक्रिया जारी है।',
    color: '#4F46E5',
    bgColor: '#EEF2FF',
    borderColor: '#C7D2FE',
    nextAllowedStatuses: ['APPROVED', 'ISSUED'],
  },
  'Government Scrutiny': {
    code: 'PROVIDER_PROCESSING',
    title: 'Government Scrutiny',
    titleHi: 'सरकारी समीक्षा',
    description: 'Pending review by competent government officer / SDM / DSO.',
    descriptionHi: 'सरकारी अधिकारी द्वारा अंतिम समीक्षा जारी है।',
    color: '#7C3AED',
    bgColor: '#EDE9FE',
    borderColor: '#DDD6FE',
    nextAllowedStatuses: ['APPROVED', 'EXTERNAL_QUERY', 'REJECTED'],
  },
  Completed: {
    code: 'DELIVERED',
    title: 'Completed & Delivered',
    titleHi: 'पूर्ण एवं प्राप्त',
    description: 'Final deliverable generated and confirmed.',
    descriptionHi: 'दस्तावेज़ सफलतापूर्वक तैयार एवं उपलब्ध है।',
    color: '#065F46',
    bgColor: '#D1FAE5',
    borderColor: '#34D399',
    isTerminal: true,
    nextAllowedStatuses: ['CLOSED'],
  },
  Rejected: {
    code: 'REJECTED',
    title: 'Rejected',
    titleHi: 'निरस्त',
    description: 'Application rejected with formal explanation.',
    descriptionHi: 'आवेदन निरस्त किया गया।',
    color: '#B91C1C',
    bgColor: '#FEE2E2',
    borderColor: '#FCA5A5',
    isTerminal: true,
    nextAllowedStatuses: ['CLOSED'],
  },
};

/**
 * Validates whether a state transition is permitted by the state machine
 */
export function canTransition(current: ApplicationStatus, next: ApplicationStatus): boolean {
  if (current === next) return true;
  const meta = APPLICATION_STATUS_REGISTRY[current];
  if (!meta) return true;
  return meta.nextAllowedStatuses.includes(next);
}

/**
 * Normalizes legacy or modern status tokens into a canonical PRD metadata item
 */
export function getStatusMeta(status: ApplicationStatus | string): ApplicationStatusMeta {
  const normalized = (status || 'SUBMITTED') as ApplicationStatus;
  const base = APPLICATION_STATUS_REGISTRY[normalized] || APPLICATION_STATUS_REGISTRY['SUBMITTED'];
  return {
    ...base,
    badgeBg: base.bgColor,
    badgeColor: base.color,
    badgeText: base.title,
  };
}

/**
 * Generates the 4 distinct ADCS application identifiers required by PRD Part A, §3
 */
export function generateApplicationIdentifiers(sectorKey = 'APP'): {
  applicationId: string;
  adcsAppId: string;
  paymentOrderId: string;
  adcsReceiptNumber: string;
} {
  const year = new Date().getFullYear();
  const randomSuffix = String(Math.floor(100000 + Math.random() * 900000));
  const appId = `ADCS-${year}-${randomSuffix}`;
  
  return {
    applicationId: appId,
    adcsAppId: appId,
    paymentOrderId: `PAY-${year}-${randomSuffix}`,
    adcsReceiptNumber: `REC-${year}-${randomSuffix}`,
  };
}
