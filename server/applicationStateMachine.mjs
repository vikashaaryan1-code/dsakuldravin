/**
 * ADCS ULTIMATE • Master Application Lifecycle & State Machine (Backend Edition)
 * PRD Part F, §33: Strict transition matrix, 4 Distinct Identifiers & Status Registry
 */

export const APPLICATION_STATUS_REGISTRY = {
  DRAFT: {
    code: 'DRAFT',
    title: 'Draft in Progress',
    titleHi: 'प्रारूप (अपूर्ण)',
    nextAllowedStatuses: ['DOCUMENTS_PENDING', 'READY_FOR_PAYMENT', 'CLOSED'],
  },
  DOCUMENTS_PENDING: {
    code: 'DOCUMENTS_PENDING',
    title: 'Documents Pending',
    titleHi: 'दस्तावेज़ अपलोड बाकी',
    nextAllowedStatuses: ['READY_FOR_PAYMENT', 'DRAFT', 'CLOSED'],
  },
  READY_FOR_PAYMENT: {
    code: 'READY_FOR_PAYMENT',
    title: 'Ready for Payment',
    titleHi: 'भुगतान हेतु तैयार',
    nextAllowedStatuses: ['PAYMENT_PENDING', 'PAID_SUBMISSION_PENDING', 'DRAFT', 'CLOSED'],
  },
  PAYMENT_PENDING: {
    code: 'PAYMENT_PENDING',
    title: 'Payment Verification Pending',
    titleHi: 'भुगतान सत्यापन प्रगति पर',
    nextAllowedStatuses: ['PAYMENT_FAILED', 'PAID_SUBMISSION_PENDING', 'SUBMITTED', 'READY_FOR_PAYMENT'],
  },
  PAYMENT_FAILED: {
    code: 'PAYMENT_FAILED',
    title: 'Payment Failed / Rejected',
    titleHi: 'भुगतान असफल',
    nextAllowedStatuses: ['READY_FOR_PAYMENT', 'PAYMENT_PENDING', 'CLOSED'],
  },
  PAID_SUBMISSION_PENDING: {
    code: 'PAID_SUBMISSION_PENDING',
    title: 'Paid • Submission Pending',
    titleHi: 'भुगतान सफल • सबमिशन प्रतीक्षित',
    nextAllowedStatuses: ['SUBMITTED', 'UNDER_REVIEW'],
  },
  SUBMITTED: {
    code: 'SUBMITTED',
    title: 'Submitted to ADCS',
    titleHi: 'आवेदन जमा हुआ',
    nextAllowedStatuses: ['UNDER_REVIEW', 'UNDER_VERIFICATION', 'CORRECTION_REQUIRED', 'READY_FOR_PROVIDER', 'REJECTED'],
  },
  UNDER_REVIEW: {
    code: 'UNDER_REVIEW',
    title: 'Under Review & Scrutiny',
    titleHi: 'दस्तावेज़ समीक्षाधीन',
    nextAllowedStatuses: ['CORRECTION_REQUIRED', 'READY_FOR_PROVIDER', 'APPOINTMENT_SCHEDULED', 'REJECTED'],
  },
  CORRECTION_REQUIRED: {
    code: 'CORRECTION_REQUIRED',
    title: 'Correction Required',
    titleHi: 'संशोधन / पुनः अपलोड आवश्यक',
    nextAllowedStatuses: ['RESUBMITTED', 'UNDER_REVIEW', 'REJECTED'],
  },
  RESUBMITTED: {
    code: 'RESUBMITTED',
    title: 'Correction Resubmitted',
    titleHi: 'संशोधन पुनः प्रस्तुत',
    nextAllowedStatuses: ['UNDER_REVIEW', 'READY_FOR_PROVIDER', 'CORRECTION_REQUIRED'],
  },
  READY_FOR_PROVIDER: {
    code: 'READY_FOR_PROVIDER',
    title: 'Approved for Official Filing',
    titleHi: 'आधिकारिक फाइलिंग हेतु स्वीकृत',
    nextAllowedStatuses: ['PROVIDER_PROCESSING', 'EXTERNAL_QUERY', 'APPOINTMENT_SCHEDULED'],
  },
  PROVIDER_PROCESSING: {
    code: 'PROVIDER_PROCESSING',
    title: 'Official Department Processing',
    titleHi: 'सरकारी / पार्टनर विभाग में प्रक्रियाधीन',
    nextAllowedStatuses: ['EXTERNAL_QUERY', 'APPOINTMENT_SCHEDULED', 'APPROVED', 'REJECTED'],
  },
  EXTERNAL_QUERY: {
    code: 'EXTERNAL_QUERY',
    title: 'Official Department Query',
    titleHi: 'विभाग द्वारा अतिरिक्त जानकारी की मांग',
    nextAllowedStatuses: ['PROVIDER_PROCESSING', 'UNDER_REVIEW', 'REJECTED'],
  },
  APPOINTMENT_SCHEDULED: {
    code: 'APPOINTMENT_SCHEDULED',
    title: 'Appointment Scheduled',
    titleHi: 'अपॉइंटमेंट स्लॉट निर्धारित',
    nextAllowedStatuses: ['PROVIDER_PROCESSING', 'APPROVED', 'ISSUED'],
  },
  APPROVED: {
    code: 'APPROVED',
    title: 'Approved by Authority',
    titleHi: 'सक्षम प्राधिकारी द्वारा स्वीकृत',
    nextAllowedStatuses: ['ISSUED', 'DELIVERED'],
  },
  REJECTED: {
    code: 'REJECTED',
    title: 'Rejected with Explanation',
    titleHi: 'आवेदन निरस्त / अस्वीकृत',
    isTerminal: true,
    nextAllowedStatuses: ['CLOSED', 'DRAFT'],
  },
  ISSUED: {
    code: 'ISSUED',
    title: 'Document / Certificate Issued',
    titleHi: 'प्रमाणपत्र / कार्ड जारी हुआ',
    nextAllowedStatuses: ['DELIVERED', 'CLOSED'],
  },
  DELIVERED: {
    code: 'DELIVERED',
    title: 'Final Deliverable Available',
    titleHi: 'दस्तावेज़ उपलब्ध / प्रेषित',
    isTerminal: true,
    nextAllowedStatuses: ['CLOSED'],
  },
  CLOSED: {
    code: 'CLOSED',
    title: 'Lifecycle Closed',
    titleHi: 'कार्य पूर्ण / बंद',
    isTerminal: true,
    nextAllowedStatuses: [],
  },
  // Legacy aliases
  UNDER_VERIFICATION: {
    code: 'UNDER_REVIEW',
    title: 'Under Verification',
    titleHi: 'सत्यापन प्रक्रियाधीन',
    nextAllowedStatuses: ['GOVT_PORTAL_FILED', 'PROVIDER_PROCESSING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED'],
  },
  GOVT_PORTAL_FILED: {
    code: 'PROVIDER_PROCESSING',
    title: 'Filed on Government Portal',
    titleHi: 'सरकारी पोर्टल पर दर्ज',
    nextAllowedStatuses: ['APPROVED_CERTIFICATE_ISSUED', 'PROVIDER_PROCESSING', 'APPROVED', 'EXTERNAL_QUERY', 'REJECTED'],
  },
  APPROVED_CERTIFICATE_ISSUED: {
    code: 'ISSUED',
    title: 'Approved & Certificate Issued',
    titleHi: 'स्वीकृत एवं प्रमाणपत्र जारी',
    nextAllowedStatuses: ['DELIVERED', 'CLOSED'],
  },
  'In Processing': {
    code: 'UNDER_REVIEW',
    title: 'In Processing',
    titleHi: 'प्रक्रियाधीन',
    nextAllowedStatuses: ['Completed', 'Rejected', 'CORRECTION_REQUIRED', 'READY_FOR_PROVIDER'],
  },
  Completed: {
    code: 'DELIVERED',
    title: 'Completed',
    titleHi: 'पूर्ण',
    isTerminal: true,
    nextAllowedStatuses: ['CLOSED'],
  },
  Rejected: {
    code: 'REJECTED',
    title: 'Rejected',
    titleHi: 'अस्वीकृत',
    isTerminal: true,
    nextAllowedStatuses: ['CLOSED'],
  }
};

/**
 * Validates whether a state transition from currentStatus to targetStatus is permitted.
 */
export function canTransition(currentStatus, targetStatus) {
  if (!currentStatus || !targetStatus) return false;
  if (currentStatus === targetStatus) return true;

  const currentMeta = APPLICATION_STATUS_REGISTRY[currentStatus];
  if (!currentMeta) return true; // Permissive fallback if unknown status

  return currentMeta.nextAllowedStatuses.includes(targetStatus);
}

/**
 * Generates the 4 Distinct Enterprise Identifiers as mandated by PRD §33:
 * 1. ADCS Application ID (e.g. ADCS-2026-000124)
 * 2. Payment Order ID (e.g. PAY-2026-000124)
 * 3. ADCS Receipt Number (e.g. REC-2026-000124)
 * 4. External Reference Number (ARN/URN/EID - null until submitted to provider)
 */
export function generateApplicationIdentifiers(seedNum) {
  const year = new Date().getFullYear();
  const num = seedNum || Math.floor(100000 + Math.random() * 900000);
  const padNum = String(num).padStart(6, '0');

  const appId = `ADCS-${year}-${padNum}`;
  const paymentOrderId = `PAY-${year}-${padNum}`;
  const adcsReceiptNumber = `REC-${year}-${padNum}`;

  return {
    appId,
    adcsAppId: appId,
    applicationId: appId,
    paymentOrderId,
    adcsReceiptNumber,
    externalReferenceNumber: null,
  };
}
