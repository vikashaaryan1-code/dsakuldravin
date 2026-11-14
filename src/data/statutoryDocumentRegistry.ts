/**
 * AKUL DRAVIN DIGITAL SERVICES (ADCS) • STATUTORY DOCUMENT & INTAKE REGISTRY
 * Deep statutory document checklists, MIME constraints, and official portal intake forms
 * for Indian Government & Citizen Services (UIDAI, MEA, Parivahan, RTPS, ECI, e-Shram, PM-Kisan, NHA).
 */

import { CustomFormField } from '../types';

export interface StatutoryDocumentRequirement {
  id: string;
  name: string;
  nameHi: string;
  category: 'Identity' | 'Address' | 'DOB' | 'Land' | 'Medical' | 'Income' | 'Photo' | 'Legal' | 'Education' | 'Business' | 'Other';
  description: string;
  descriptionHi: string;
  acceptedFormats: string[];
  maxSizeBytes: number;
  isMandatory: boolean;
}

export interface ServiceStatutoryProfile {
  serviceId: string;
  slug: string;
  officialAuthority: string;
  officialPortalUrl: string;
  statutoryGovtFee: number;
  adcsFacilitationFee: number;
  slaTimeline: string;
  slaTimelineHi: string;
  intakeFields: CustomFormField[];
  documentChecklist: StatutoryDocumentRequirement[];
  statutoryGuidelines: string[];
  statutoryGuidelinesHi: string[];
}

export const STATUTORY_REGISTRY: Record<string, ServiceStatutoryProfile> = {
  // 1. PAN Card (Form 49A / 49AA / Correction)
  'srv-pan-new': {
    serviceId: 'srv-pan-new',
    slug: 'new-pan-card',
    officialAuthority: 'Income Tax Department (UTIITSL / Protean eGov)',
    officialPortalUrl: 'https://www.pan.utiitsl.com/',
    statutoryGovtFee: 107,
    adcsFacilitationFee: 92,
    slaTimeline: '2 - 3 Working Days (e-PAN) • 7 - 10 Days (PVC Physical Card)',
    slaTimelineHi: '2 - 3 कार्य दिवस (e-PAN) • 7 - 10 दिन (भौतिक PVC कार्ड)',
    intakeFields: [
      {
        id: 'panCategory',
        label: 'Applicant Category',
        labelHi: 'आवेदक श्रेणी',
        type: 'select',
        required: true,
        options: ['Individual (व्यक्तिगत)', 'HUF (हिंदू अविभाजित परिवार)', 'Firm / LLP (फर्म)', 'Company (कंपनी)', 'Trust (ट्रस्ट)'],
        helpText: 'Select category as per Income Tax Form 49A rules.',
      },
      {
        id: 'panType',
        label: 'PAN Application Type',
        labelHi: 'आवेदन का प्रकार',
        type: 'select',
        required: true,
        options: ['New PAN Card (Form 49A) - नया पैन कार्ड', 'PAN Correction / Update (CSF) - सुधार', 'Reprint / Lost PAN - डुप्लीकेट'],
      },
      {
        id: 'fatherName',
        label: "Father's Full Name (or Mother's if single parent)",
        labelHi: 'पिता का पूरा नाम',
        type: 'text',
        required: true,
        placeholder: 'e.g. Ramesh Chandra Verma',
        helpText: 'Mandatory for all individual PAN applicants.',
      },
      {
        id: 'dob',
        label: 'Date of Birth / Incorporation',
        labelHi: 'जन्म तिथि',
        type: 'date',
        required: true,
      },
      {
        id: 'gender',
        label: 'Gender',
        labelHi: 'लिंग',
        type: 'select',
        required: true,
        options: ['Male (पुरुष)', 'Female (महिला)', 'Transgender (अन्य)'],
      },
      {
        id: 'aadhaarNumber',
        label: '12-Digit Aadhaar Number',
        labelHi: '12-अंकीय आधार संख्या',
        type: 'text',
        required: true,
        placeholder: 'XXXX XXXX XXXX',
        helpText: 'Aadhaar is mandatory for Indian citizens under Section 139AA.',
      },
      {
        id: 'deliveryMode',
        label: 'PAN Card Format Desired',
        labelHi: 'पैन कार्ड का प्रारूप',
        type: 'select',
        required: true,
        options: ['Physical PVC Card + e-PAN (Doorstep Delivery)', 'e-PAN Only (Digital PDF by Email)'],
      },
    ],
    documentChecklist: [
      {
        id: 'doc-pan-poi',
        name: 'Proof of Identity (PoI)',
        nameHi: 'पहचान का प्रमाण',
        category: 'Identity',
        description: 'Clear color copy of Aadhaar Card, Voter ID, Passport, or Driving License.',
        descriptionHi: 'आधार कार्ड, मतदाता पहचान पत्र, पासपोर्ट अथवा ड्राइविंग लाइसेंस।',
        acceptedFormats: ['.pdf', '.jpg', '.jpeg', '.png'],
        maxSizeBytes: 5 * 1024 * 1024,
        isMandatory: true,
      },
      {
        id: 'doc-pan-poa',
        name: 'Proof of Address (PoA)',
        nameHi: 'पते का प्रमाण',
        category: 'Address',
        description: 'Aadhaar Card, Electricity/Water Bill (<3 months old), or Bank Statement.',
        descriptionHi: 'आधार कार्ड, बिजली/पानी बिल (3 माह से कम पुराना) अथवा बैंक खाता विवरणी।',
        acceptedFormats: ['.pdf', '.jpg', '.jpeg', '.png'],
        maxSizeBytes: 5 * 1024 * 1024,
        isMandatory: true,
      },
      {
        id: 'doc-pan-pod',
        name: 'Proof of Date of Birth (PoD)',
        nameHi: 'जन्म तिथि का प्रमाण',
        category: 'DOB',
        description: 'Aadhaar Card, 10th School Passing Marksheet, or Birth Certificate.',
        descriptionHi: 'आधार कार्ड, 10वीं कक्षा की मार्कशीट अथवा जन्म प्रमाण पत्र।',
        acceptedFormats: ['.pdf', '.jpg', '.jpeg', '.png'],
        maxSizeBytes: 5 * 1024 * 1024,
        isMandatory: true,
      },
      {
        id: 'doc-pan-photo',
        name: 'Passport Size Photograph',
        nameHi: 'पासपोर्ट आकार का फोटो',
        category: 'Photo',
        description: 'Recent color photograph with white background (3.5cm x 2.5cm, 300 DPI).',
        descriptionHi: 'सफेद पृष्ठभूमि वाली हालिया रंगीन फोटो (3.5 x 2.5 सेमी, स्पष्ट चेहरा)।',
        acceptedFormats: ['.jpg', '.jpeg', '.png'],
        maxSizeBytes: 2 * 1024 * 1024,
        isMandatory: true,
      },
      {
        id: 'doc-pan-sign',
        name: 'Applicant Signature Specimen',
        nameHi: 'आवेदक हस्ताक्षर नमूना',
        category: 'Identity',
        description: 'Signature in black or dark blue ink on clean white paper.',
        descriptionHi: 'सफेद कागज पर काली या नीली स्याही से स्पष्ट हस्ताक्षर।',
        acceptedFormats: ['.jpg', '.jpeg', '.png'],
        maxSizeBytes: 2 * 1024 * 1024,
        isMandatory: true,
      },
    ],
    statutoryGuidelines: [
      'Zero Aadhaar-PAN mismatch: Name, Father Name, and DOB must match Aadhaar database exactly.',
      'Physical PVC card will be dispatched via India Post Speed Post to the address recorded in Aadhaar.',
      'Instant e-PAN is delivered to applicant email within 2-3 business days upon verification.',
    ],
    statutoryGuidelinesHi: [
      'आधार व पैन में नाम, पिता का नाम व जन्मतिथि शत-प्रतिशत समान होनी चाहिए।',
      'भौतिक पीवीसी कार्ड भारतीय डाक स्पीड पोस्ट द्वारा आधार पते पर भेजा जाएगा।',
      'सत्यापन उपरांत 2-3 कार्य दिवसों में ई-पैन आवेदक के ईमेल पर प्राप्त हो जाता है।',
    ],
  },

  // 2. Fresh Tatkaal / Normal Passport Assistance
  'srv-passport-assist': {
    serviceId: 'srv-passport-assist',
    slug: 'passport-assistance',
    officialAuthority: 'Passport Seva (Ministry of External Affairs - MEA)',
    officialPortalUrl: 'https://www.passportindia.gov.in/',
    statutoryGovtFee: 1500,
    adcsFacilitationFee: 699,
    slaTimeline: 'Normal: 2 - 4 Weeks • Tatkaal: 3 - 7 Working Days',
    slaTimelineHi: 'सामान्य: 2 - 4 सप्ताह • तत्काल: 3 - 7 कार्य दिवस',
    intakeFields: [
      {
        id: 'passportApplicationType',
        label: 'Application Scheme',
        labelHi: 'आवेदन योजना',
        type: 'select',
        required: true,
        options: ['Normal Passport (सामान्य पासपोर्ट - ₹1500 Govt Fee)', 'Tatkaal Passport (तत्काल पासपोर्ट - ₹3500 Total Govt Fee)'],
      },
      {
        id: 'bookletType',
        label: 'Passport Booklet Size',
        labelHi: 'पुस्तिका का प्रकार',
        type: 'select',
        required: true,
        options: ['36 Pages (Standard Traveler)', '60 Pages (Frequent Flyer)'],
      },
      {
        id: 'maritalStatus',
        label: 'Marital Status',
        labelHi: 'वैवाहिक स्थिति',
        type: 'select',
        required: true,
        options: ['Single (अविवाहित)', 'Married (विवाहित)', 'Divorced (तलाकशुदा)', 'Widowed (विधवा/विधुर)'],
      },
      {
        id: 'spouseName',
        label: 'Spouse Full Name (if married)',
        labelHi: 'पति/पत्नी का नाम',
        type: 'text',
        required: false,
        placeholder: 'e.g. Priya Sharma',
      },
      {
        id: 'employmentType',
        label: 'Employment / Profession Type',
        labelHi: 'रोजगार का प्रकार',
        type: 'select',
        required: true,
        options: [
          'Private Sector Employee (निजी क्षेत्र)',
          'Government / PSU Employee (सरकारी कर्मचारी - NOC Required)',
          'Self-Employed / Business (स्व-रोजगार/व्यापारी)',
          'Student (विद्यार्थी)',
          'Homemaker (गृहणी)',
          'Retired / Other (सेवानिवृत्त/अन्य)',
        ],
      },
      {
        id: 'educationQualification',
        label: 'Educational Qualification (for ECNR status)',
        labelHi: 'शैक्षणिक योग्यता (ईसीएनआर स्थिति)',
        type: 'select',
        required: true,
        options: [
          'Graduate & Above (स्नातक या उच्च - ECNR Eligible)',
          '10th Pass (Matriculation) & Above (10वीं पास - ECNR Eligible)',
          'Between 8th and 9th Standard (8वीं-9वीं पास - ECR Category)',
          'Below 8th Standard (8वीं से कम - ECR Category)',
        ],
        helpText: '10th pass candidates are exempted from Emigration Check (Non-ECR stamp).',
      },
      {
        id: 'nearestPoliceStation',
        label: 'Nearest Police Station (for Police Verification)',
        labelHi: 'निकटतम पुलिस स्टेशन (सत्यापन हेतु)',
        type: 'text',
        required: true,
        placeholder: 'e.g. Kotwali Police Station, Patna',
      },
      {
        id: 'emergencyContact',
        label: 'Emergency Contact Person & Phone Number',
        labelHi: 'आपातकालीन संपर्क व्यक्ति व मोबाइल नंबर',
        type: 'text',
        required: true,
        placeholder: 'Name, Relationship, Mobile (e.g. Ramesh Verma - Brother - 9876543210)',
      },
    ],
    documentChecklist: [
      {
        id: 'doc-pass-poa',
        name: 'Proof of Present Address',
        nameHi: 'वर्तमान पते का प्रमाण',
        category: 'Address',
        description: 'Aadhaar Card, Active Bank Passbook with photo, or Electricity/Water bill.',
        descriptionHi: 'आधार कार्ड, फोटो सहित बैंक पासबुक, अथवा बिजली/पानी बिल।',
        acceptedFormats: ['.pdf', '.jpg', '.jpeg', '.png'],
        maxSizeBytes: 5 * 1024 * 1024,
        isMandatory: true,
      },
      {
        id: 'doc-pass-pod',
        name: 'Proof of Date of Birth (PoD)',
        nameHi: 'जन्म तिथि का प्रमाण',
        category: 'DOB',
        description: 'Birth Certificate issued by Municipal Authority or 10th School Leaving Certificate.',
        descriptionHi: 'नगर निगम जन्म प्रमाण पत्र अथवा 10वीं कक्षा का विद्यालय परित्याग प्रमाण पत्र।',
        acceptedFormats: ['.pdf', '.jpg', '.jpeg', '.png'],
        maxSizeBytes: 5 * 1024 * 1024,
        isMandatory: true,
      },
      {
        id: 'doc-pass-ecnr',
        name: 'ECNR Educational Qualification Proof',
        nameHi: 'ईसीएनआर शैक्षणिक प्रमाण',
        category: 'Education',
        description: 'Class 10th Marksheet/Passing Certificate or Higher University Degree.',
        descriptionHi: '10वीं बोर्ड अंकतालिका अथवा विश्वविद्यालय डिग्री (नॉन-ईसीआर पासपोर्ट हेतु)।',
        acceptedFormats: ['.pdf', '.jpg', '.jpeg', '.png'],
        maxSizeBytes: 5 * 1024 * 1024,
        isMandatory: true,
      },
      {
        id: 'doc-pass-annexure',
        name: 'Annexure F / Tatkaal Verification Proof (if Tatkaal)',
        nameHi: 'तत्काल सत्यापन प्रमाण / शपथ पत्र',
        category: 'Legal',
        description: 'Standard Annexure declaration for Tatkaal expedited processing.',
        descriptionHi: 'तत्काल श्रेणी आवेदन हेतु अनिवार्य स्वघोषणा पत्र।',
        acceptedFormats: ['.pdf', '.jpg', '.jpeg'],
        maxSizeBytes: 5 * 1024 * 1024,
        isMandatory: false,
      },
    ],
    statutoryGuidelines: [
      'Applicant must physically attend biometric and photograph appointment at the designated PSK / POPSK.',
      'Carry original documents to the Passport Seva Kendra on appointment day.',
      'Police verification will be initiated automatically by the Passport Office post-biometrics.',
    ],
    statutoryGuidelinesHi: [
      'आवेदक को अपॉइंटमेंट के दिन पासपोर्ट सेवा केंद्र (PSK) में स्वयं उपस्थित होना अनिवार्य है।',
      'अपॉइंटमेंट के दिन सभी मूल दस्तावेज (Originals) साथ ले जाना आवश्यक है।',
      'बायोमेट्रिक्स के बाद संबंधित थाने द्वारा पुलिस सत्यापन किया जाएगा।',
    ],
  },

  // 3. Income / Caste / Domicile Certificate (State e-District / RTPS / ServicePlus)
  'srv-income-cert': {
    serviceId: 'srv-income-cert',
    slug: 'state-certificates',
    officialAuthority: 'State Revenue Department (e-District / RTPS / ServicePlus)',
    officialPortalUrl: 'https://serviceonline.gov.in/',
    statutoryGovtFee: 30,
    adcsFacilitationFee: 119,
    slaTimeline: '7 - 14 Working Days (Digital Certificate Download)',
    slaTimelineHi: '7 - 14 कार्य दिवस (डिजिटल प्रमाण पत्र डाउनलोड)',
    intakeFields: [
      {
        id: 'certType',
        label: 'Statutory Certificate Requested',
        labelHi: 'प्रमाण पत्र का प्रकार',
        type: 'select',
        required: true,
        options: [
          'Residential / Domicile Certificate (निवास प्रमाण पत्र)',
          'Income Certificate (आय प्रमाण पत्र)',
          'Caste Certificate (जाति प्रमाण पत्र - SC/ST/OBC/EBC)',
          'Non-Creamy Layer OBC Certificate (ओबीसी नॉन-क्रीमी लेयर)',
          'Economically Weaker Section (EWS) Certificate (ईडब्ल्यूएस प्रमाण पत्र)',
        ],
      },
      {
        id: 'issuingLevel',
        label: 'Authority Level Desired',
        labelHi: 'जारीकर्ता स्तर',
        type: 'select',
        required: true,
        options: [
          'Revenue Officer (RO) / Circle Officer (CO) Level - अंचल अधिकारी स्तर',
          'Sub-Divisional Officer (SDO) Level - अनुमंडल पदाधिकारी स्तर',
          'District Magistrate (DM) Level - जिलाधिकारी स्तर',
        ],
      },
      {
        id: 'fatherHusbandName',
        label: "Father's / Husband's Full Name",
        labelHi: 'पिता अथवा पति का नाम',
        type: 'text',
        required: true,
        placeholder: 'e.g. Shri Mahendra Prasad',
      },
      {
        id: 'motherName',
        label: "Mother's Full Name",
        labelHi: 'माता का नाम',
        type: 'text',
        required: true,
        placeholder: 'e.g. Smt. Kanti Devi',
      },
      {
        id: 'casteCategory',
        label: 'Caste & Category (जाति एवं वर्ग)',
        labelHi: 'जाति व वर्ग',
        type: 'text',
        required: true,
        placeholder: 'e.g. Kurmi / Yadav / Rajput / Chamar / Teli (BC-2 / EBC / SC / ST / General)',
      },
      {
        id: 'annualIncomeBreakdown',
        label: 'Annual Family Income (in ₹)',
        labelHi: 'वार्षिक पारिवारिक आय (रुपये में)',
        type: 'number',
        required: true,
        placeholder: 'e.g. 120000',
        helpText: 'Sum of income from agriculture, business, profession & other sources.',
      },
      {
        id: 'tehsilBlock',
        label: 'Tehsil / Anchal / Block Name',
        labelHi: 'तहसील / अंचल / प्रखंड का नाम',
        type: 'text',
        required: true,
        placeholder: 'e.g. Danapur Block',
      },
      {
        id: 'villageWard',
        label: 'Village / Ward & Police Station (Thana)',
        labelHi: 'ग्राम / वार्ड एवं थाना',
        type: 'text',
        required: true,
        placeholder: 'e.g. Khagaul, Thana: Danapur',
      },
      {
        id: 'certPurpose',
        label: 'Purpose of Certificate',
        labelHi: 'प्रमाण पत्र का प्रयोजन',
        type: 'select',
        required: true,
        options: [
          'Higher Education Admission (उच्च शिक्षा नामांकन)',
          'Government Employment / Competitive Exam (सरकारी नौकरी)',
          'Scholarship / Fee Concession (छात्रवृत्ति)',
          'Welfare Scheme Subsidy (कल्याणकारी योजना)',
          'Bank Loan / General Verification (ऋण अथवा सामान्य प्रयोजन)',
        ],
      },
    ],
    documentChecklist: [
      {
        id: 'doc-cert-aadhaar',
        name: 'Aadhaar Card of Applicant',
        nameHi: 'आवेदक का आधार कार्ड',
        category: 'Identity',
        description: 'Both front and back color scan with address clearly visible.',
        descriptionHi: 'पते सहित दोनों ओर का स्पष्ट रंगीन आधार कार्ड स्कैन।',
        acceptedFormats: ['.pdf', '.jpg', '.jpeg', '.png'],
        maxSizeBytes: 5 * 1024 * 1024,
        isMandatory: true,
      },
      {
        id: 'doc-cert-residence',
        name: 'Proof of Residence (Land Record / LPC / Electricity Bill)',
        nameHi: 'निवास प्रमाण (खतियान / रसीद / बिजली बिल)',
        category: 'Address',
        description: 'Land possession certificate (LPC), Khatiyan, recent electricity bill or ration card.',
        descriptionHi: 'जमीन का खतियान/रसीद, बिजली बिल अथवा राशन कार्ड।',
        acceptedFormats: ['.pdf', '.jpg', '.jpeg', '.png'],
        maxSizeBytes: 5 * 1024 * 1024,
        isMandatory: true,
      },
      {
        id: 'doc-cert-lineage',
        name: "Father's Caste / Revenue Record (for Caste Certificate)",
        nameHi: 'पिता का जाति प्रमाण अथवा खतियान नकल',
        category: 'Legal',
        description: "Father's previous caste certificate, land revenue Khatiyan or Parivar register copy.",
        descriptionHi: 'पिता का जाति प्रमाण पत्र अथवा पुश्तैनी खतियान (जाति प्रमाण पत्र हेतु)।',
        acceptedFormats: ['.pdf', '.jpg', '.jpeg'],
        maxSizeBytes: 5 * 1024 * 1024,
        isMandatory: false,
      },
      {
        id: 'doc-cert-selfdec',
        name: 'Signed Self-Declaration Form (स्वप्रमाणित शपथ पत्र)',
        nameHi: 'स्वप्रमाणित घोषणा पत्र',
        category: 'Legal',
        description: 'Statutory Form with applicant signature declaring true income & permanent residence.',
        descriptionHi: 'आवेदक के हस्ताक्षर सहित वेदोक्त स्वप्रमाणित शपथ पत्र।',
        acceptedFormats: ['.pdf', '.jpg', '.jpeg', '.png'],
        maxSizeBytes: 5 * 1024 * 1024,
        isMandatory: true,
      },
      {
        id: 'doc-cert-photo',
        name: 'Passport Size Photograph',
        nameHi: 'पासपोर्ट फोटो',
        category: 'Photo',
        description: 'Recent passport photo with applicant face clearly identifiable.',
        descriptionHi: 'आवेदक का हालिया स्पष्ट पासपोर्ट फोटो।',
        acceptedFormats: ['.jpg', '.jpeg', '.png'],
        maxSizeBytes: 2 * 1024 * 1024,
        isMandatory: true,
      },
    ],
    statutoryGuidelines: [
      'Certificate will bear official state digital signature (PKI QR Code) recognized across all Indian government bodies.',
      'Processing is conducted through Revenue Inspector and Circle Officer reporting.',
      'Issued certificate can be authenticated on the official state ServicePlus portal via Application Reference Number.',
    ],
    statutoryGuidelinesHi: [
      'प्रमाण पत्र पर राज्य सरकार का आधिकारिक डिजिटल हस्ताक्षर एवं क्यूआर कोड अंकित रहेगा।',
      'राजस्व कर्मचारी व अंचल अधिकारी की जांच के उपरांत प्रमाण पत्र जारी होता है।',
      'जारी प्रमाण पत्र को राज्य के आधिकारिक सर्विसप्लस पोर्टल पर सीधे सत्यापित किया जा सकता है।',
    ],
  },

  // 4. E-Shram & Labour Welfare Registration
  'srv-eshram-reg': {
    serviceId: 'srv-eshram-reg',
    slug: 'eshram-card',
    officialAuthority: 'Ministry of Labour & Employment, Govt. of India',
    officialPortalUrl: 'https://eshram.gov.in/',
    statutoryGovtFee: 0,
    adcsFacilitationFee: 50,
    slaTimeline: 'Instant (15 - 20 Minutes) • 12-Digit UAN Card Generation',
    slaTimelineHi: 'त्वरित (15 - 20 मिनट) • 12-अंकीय UAN कार्ड निर्माण',
    intakeFields: [
      {
        id: 'aadhaarMobile',
        label: 'Aadhaar-Linked Active Mobile Number',
        labelHi: 'आधार से जुड़ा मोबाइल नंबर',
        type: 'text',
        required: true,
        placeholder: '+91 98765 43210',
        helpText: 'OTP verification is mandatory for e-Shram registration.',
      },
      {
        id: 'primaryOccupation',
        label: 'Primary Occupation / Sector',
        labelHi: 'मुख्य व्यवसाय / कार्य का क्षेत्र',
        type: 'select',
        required: true,
        options: [
          'Agriculture & Allied (कृषि एवं संबद्ध क्षेत्र)',
          'Construction Worker / Mason (निर्माण श्रमिक / राजमिस्त्री)',
          'Driver / Automobile / Transport (चालक / ऑटो रिक्शा / परिवहन)',
          'Domestic & Household Worker (घरेलू कामगार)',
          'Street Vendor / Small Shopkeeper (रेहड़ी-पटरी / छोटा दुकानदार)',
          'Garment / Textile / Tailoring (सिलाई-कढ़ाई / वस्त्र)',
          'Carpenter / Plumber / Electrician (बढ़ई / प्लंबर / इलेक्ट्रीशियन)',
          'Healthcare / Sanitation / Beauty (सफाई कर्मी / सुरक्षा गार्ड)',
        ],
      },
      {
        id: 'workExperienceYears',
        label: 'Work Experience in Occupation (in Years)',
        labelHi: 'कार्य अनुभव (वर्षों में)',
        type: 'number',
        required: true,
        placeholder: 'e.g. 5',
      },
      {
        id: 'monthlyIncomeRange',
        label: 'Monthly Income Range',
        labelHi: 'मासिक आय सीमा',
        type: 'select',
        required: true,
        options: [
          'Less than ₹10,000 / month (₹10,000 से कम)',
          '₹10,001 - ₹15,000 / month (₹10,001 से ₹15,000)',
          '₹15,001 - ₹18,000 / month',
        ],
      },
      {
        id: 'bankAccountNo',
        label: 'Bank Account Number (for Direct Benefit Transfer - DBT)',
        labelHi: 'बैंक खाता संख्या (डीबीटी लाभ हेतु)',
        type: 'text',
        required: true,
        placeholder: 'e.g. 30891002345678',
      },
      {
        id: 'bankIfsc',
        label: 'Bank IFSC Code',
        labelHi: 'बैंक आईएफएससी कोड',
        type: 'text',
        required: true,
        placeholder: 'e.g. SBIN0001234',
      },
      {
        id: 'nomineeDetails',
        label: 'Nominee Name, Relation & Date of Birth',
        labelHi: 'नॉमिनी का नाम, संबंध व जन्मतिथि',
        type: 'text',
        required: true,
        placeholder: 'e.g. Sunita Devi (Wife) - 15/08/1988',
        helpText: 'Accidental insurance (PMSBY ₹2 Lakh) requires nominee designation.',
      },
    ],
    documentChecklist: [
      {
        id: 'doc-eshram-aadhaar',
        name: 'Aadhaar Card (Linked with Active Mobile)',
        nameHi: 'आधार कार्ड (सक्रिय मोबाइल लिंक)',
        category: 'Identity',
        description: 'Aadhaar card copy of unorganized worker aged 16 to 59 years.',
        descriptionHi: '16 से 59 वर्ष आयु वर्ग के असंगठित कामगार का आधार कार्ड।',
        acceptedFormats: ['.pdf', '.jpg', '.jpeg', '.png'],
        maxSizeBytes: 5 * 1024 * 1024,
        isMandatory: true,
      },
      {
        id: 'doc-eshram-bank',
        name: 'Bank Passbook / Account Statement',
        nameHi: 'बैंक पासबुक अथवा बैंक स्टेटमेंट',
        category: 'Income',
        description: 'First page of passbook showing clear Account Number, Name & IFSC code.',
        descriptionHi: 'खाता धारक का नाम, खाता संख्या एवं IFSC दर्शाती पासबुक की प्रति।',
        acceptedFormats: ['.pdf', '.jpg', '.jpeg', '.png'],
        maxSizeBytes: 5 * 1024 * 1024,
        isMandatory: true,
      },
    ],
    statutoryGuidelines: [
      'Worker must not be an EPFO / ESIC member or income tax payee.',
      'Entitles holder to ₹2,00,000 accidental death/disability insurance under PMSBY.',
      'Universal 12-digit UAN Card is generated instantly upon Aadhaar OTP authentication.',
    ],
    statutoryGuidelinesHi: [
      'श्रमिक ईपीएफओ (EPFO) अथवा ईएसआईसी (ESIC) का सदस्य या आयकर दाता नहीं होना चाहिए।',
      'पीएम सुरक्षा बीमा योजना के तहत ₹2 लाख का दुर्घटना बीमा स्वतः सम्मिलित होता है।',
      'आधार OTP सत्यापन के तुरंत बाद 12 अंकों का राष्ट्रीय UAN कार्ड जारी हो जाता है।',
    ],
  },

  // 5. Aadhaar Card Demographic & Address Update Help
  'srv-aadhaar-update': {
    serviceId: 'srv-aadhaar-update',
    slug: 'aadhaar-card-update',
    officialAuthority: 'Unique Identification Authority of India (UIDAI myAadhaar)',
    officialPortalUrl: 'https://myaadhaar.uidai.gov.in/',
    statutoryGovtFee: 50,
    adcsFacilitationFee: 99,
    slaTimeline: '5 - 10 Working Days (UIDAI Central Processing)',
    slaTimelineHi: '5 - 10 कार्य दिवस (यूआईडीएआई केंद्रीय प्रक्रमण)',
    intakeFields: [
      {
        id: 'aadhaarNumber',
        label: '12-Digit Existing Aadhaar Number',
        labelHi: '12-अंकीय आधार संख्या',
        type: 'text',
        required: true,
        placeholder: 'XXXX XXXX XXXX',
      },
      {
        id: 'updateType',
        label: 'Type of Update Needed',
        labelHi: 'सुधार का प्रकार',
        type: 'select',
        required: true,
        options: [
          'Address Update Online (Proof of Address based - घर बैठे ऑनलाइन)',
          'Name / Date of Birth / Gender Correction (दस्तावेज आधारित)',
          'Mobile Number / Email Seeding (Aadhaar Seva Kendra Appointment)',
          'Mandatory Biometric Update for Children (Age 5 / 15 years)',
          'PVC Smart Card Order (Official Watermarked Plastic Card)',
        ],
      },
      {
        id: 'careOf',
        label: 'Care Of (C/O - Father / Husband Name)',
        labelHi: 'संरक्षक का नाम (C/O)',
        type: 'text',
        required: true,
        placeholder: 'e.g. C/O Rameshwar Nath',
      },
      {
        id: 'newFullAddress',
        label: 'New Complete Address with House/Ward/Locality',
        labelHi: 'नया पूर्ण पता (मकान सं, मोहल्ला, वार्ड)',
        type: 'textarea',
        required: true,
        placeholder: 'House No., Building Name, Street / Road, Area / Mohalla, Post Office',
      },
      {
        id: 'pincode',
        label: '6-Digit Postal PIN Code',
        labelHi: '6-अंकीय पिन कोड',
        type: 'text',
        required: true,
        placeholder: 'e.g. 801503',
      },
      {
        id: 'selectedPoaType',
        label: 'Supporting Document Being Submitted',
        labelHi: 'प्रस्तुत किया जाने वाला प्रमाण',
        type: 'select',
        required: true,
        options: [
          'Electricity Bill (Less than 3 months old)',
          'Water Bill (Less than 3 months old)',
          'Valid Registered Rent Agreement',
          'Bank Account Passbook / Statement with Photo & Stamp',
          'Voter ID Card (EPIC)',
          'Domicile / Residence Certificate with Photo',
          'Gazetted Officer / MP / MLA Certificate (UIDAI Standard Format)',
        ],
      },
    ],
    documentChecklist: [
      {
        id: 'doc-aadhaar-poa',
        name: 'Valid Proof of Address (PoA) Document',
        nameHi: 'वैध पता प्रमाण पत्र',
        category: 'Address',
        description: 'UIDAI approved document showing applicant name and exact new address.',
        descriptionHi: 'यूआईडीएआई मान्य सूची अनुसार नया पता दर्शाने वाला आधिकारिक दस्तावेज।',
        acceptedFormats: ['.pdf', '.jpg', '.jpeg', '.png'],
        maxSizeBytes: 5 * 1024 * 1024,
        isMandatory: true,
      },
      {
        id: 'doc-aadhaar-current',
        name: 'Copy of Existing Aadhaar Card',
        nameHi: 'वर्तमान आधार कार्ड की प्रति',
        category: 'Identity',
        description: 'Clear image of current Aadhaar card for demographic mapping.',
        descriptionHi: 'वर्तमान आधार कार्ड की दोनों तरफ की स्पष्ट प्रति।',
        acceptedFormats: ['.pdf', '.jpg', '.jpeg', '.png'],
        maxSizeBytes: 5 * 1024 * 1024,
        isMandatory: true,
      },
    ],
    statutoryGuidelines: [
      'Document must be in applicant own name. If living in rented premises, registered rent agreement is required.',
      'Demographic update OTP is dispatched only to the mobile number registered with UIDAI.',
      'Biometric and iris updates require physical presence at an authorized Aadhaar Seva Kendra (ASK).',
    ],
    statutoryGuidelinesHi: [
      'दस्तावेज पर आवेदक का नाम व नया पता बिल्कुल स्पष्ट होना चाहिए।',
      'ऑनलाइन सुधार हेतु ओटीपी केवल आधार से लिंक मोबाइल नंबर पर ही प्राप्त होगा।',
      'बायोमेट्रिक अथवा फिंगरप्रिंट अपडेट हेतु आधार सेवा केंद्र पर जाना आवश्यक होगा।',
    ],
  },

  // 6. New Voter ID Card (Form 6) & NVSP Correction (Form 8)
  'srv-voter-card': {
    serviceId: 'srv-voter-card',
    slug: 'voter-id-card',
    officialAuthority: 'Election Commission of India (ECI Voters Service Portal)',
    officialPortalUrl: 'https://voters.eci.gov.in/',
    statutoryGovtFee: 0,
    adcsFacilitationFee: 99,
    slaTimeline: '15 - 30 Working Days • ECI Field Verification by BLO',
    slaTimelineHi: '15 - 30 कार्य दिवस • बीएलओ द्वारा स्थानीय सत्यापन',
    intakeFields: [
      {
        id: 'voterFormType',
        label: 'Statutory Electoral Form',
        labelHi: 'मतदाता प्रपत्र का प्रकार',
        type: 'select',
        required: true,
        options: [
          'Form 6: New Elector Registration (Age 18+ - नया मतदाता)',
          'Form 8: Correction of Entries (Name/DOB/Photo/Address) - सुधार',
          'Form 8: Shifting of Residence within/outside Constituency - स्थानांतरण',
          'Form 6A: Overseas Elector Registration (NRI Elector - प्रवासी)',
        ],
      },
      {
        id: 'assemblyConstituency',
        label: 'Assembly Constituency (AC Name & Number)',
        labelHi: 'विधानसभा निर्वाचन क्षेत्र (नाम व संख्या)',
        type: 'text',
        required: true,
        placeholder: 'e.g. 182 - Danapur Assembly Constituency',
      },
      {
        id: 'relativeNameAndType',
        label: 'Relative Name & Relation (Father / Mother / Husband)',
        labelHi: 'संबंधी का नाम व संबंध (पिता/माता/पति)',
        type: 'text',
        required: true,
        placeholder: 'e.g. Subhash Singh (Father)',
      },
      {
        id: 'dob',
        label: 'Date of Birth (Must be 18+ on qualifying date)',
        labelHi: 'जन्म तिथि (18 वर्ष पूर्ण)',
        type: 'date',
        required: true,
      },
      {
        id: 'existingEpicNo',
        label: 'Existing EPIC / Voter ID Number (if Form 8 Correction/Shifting)',
        labelHi: 'मौजूदा वोटर कार्ड संख्या (यदि सुधार हो)',
        type: 'text',
        required: false,
        placeholder: 'e.g. ABC1234567',
      },
      {
        id: 'disabilityDeclaration',
        label: 'Disability Specification (if applicable)',
        labelHi: 'दिव्यांगता विवरण (यदि लागू हो)',
        type: 'select',
        required: false,
        options: ['None (कोई नहीं)', 'Locomotor (चलने में असमर्थ)', 'Visual (दृष्टिबाधित)', 'Deaf & Dumb (मूक-बधिर)'],
      },
    ],
    documentChecklist: [
      {
        id: 'doc-voter-age',
        name: 'Proof of Age / Date of Birth',
        nameHi: 'आयु / जन्म तिथि का प्रमाण',
        category: 'DOB',
        description: 'Birth Certificate, 10th School Marksheet, Aadhaar Card, or PAN Card.',
        descriptionHi: 'जन्म प्रमाण पत्र, 10वीं की अंकतालिका, आधार कार्ड अथवा पैन कार्ड।',
        acceptedFormats: ['.pdf', '.jpg', '.jpeg', '.png'],
        maxSizeBytes: 5 * 1024 * 1024,
        isMandatory: true,
      },
      {
        id: 'doc-voter-address',
        name: 'Proof of Ordinary Residence',
        nameHi: 'स्थानीय निवास का प्रमाण',
        category: 'Address',
        description: 'Water/Electricity/Gas Bill, Bank Passbook, Aadhaar, or Passport.',
        descriptionHi: 'पानी/बिजली बिल, बैंक पासबुक, आधार कार्ड अथवा वैध राशन कार्ड।',
        acceptedFormats: ['.pdf', '.jpg', '.jpeg', '.png'],
        maxSizeBytes: 5 * 1024 * 1024,
        isMandatory: true,
      },
      {
        id: 'doc-voter-photo',
        name: 'Passport Size Photograph (White Background)',
        nameHi: 'पासपोर्ट साइज रंगीन फोटो',
        category: 'Photo',
        description: 'Color portrait photograph with white background (size < 2MB).',
        descriptionHi: 'सफेद बैकग्राउंड वाली स्पष्ट रंगीन फोटो।',
        acceptedFormats: ['.jpg', '.jpeg', '.png'],
        maxSizeBytes: 2 * 1024 * 1024,
        isMandatory: true,
      },
    ],
    statutoryGuidelines: [
      'Applicant will receive an official ECI Reference ID for tracking on voters.eci.gov.in.',
      'Booth Level Officer (BLO) will conduct home verification before final approval.',
      'Digital e-EPIC can be downloaded instantly once application is sanctioned by ERO.',
    ],
    statutoryGuidelinesHi: [
      'आवेदन उपरांत भारत निर्वाचन आयोग की आधिकारिक ट्रैकिंग संदर्भ संख्या प्राप्त होगी।',
      'स्वीकृति से पूर्व संबंधित बीएलओ (BLO) द्वारा भौतिक गृह सत्यापन किया जा सकता है।',
      'स्वीकृति मिलते ही डिजिटल e-EPIC मतदाता पहचान पत्र तुरंत डाउनलोड किया जा सकेगा।',
    ],
  },

  // 7. Ayushman Bharat Golden Card & ABHA ID (PM-JAY ₹5L Health)
  'srv-ayushman-card': {
    serviceId: 'srv-ayushman-card',
    slug: 'ayushman-golden-card',
    officialAuthority: 'National Health Authority (NHA Beneficiary Portal)',
    officialPortalUrl: 'https://beneficiary.nha.gov.in/',
    statutoryGovtFee: 0,
    adcsFacilitationFee: 49,
    slaTimeline: 'Instant (20 Minutes) • PVC Golden Card Generation',
    slaTimelineHi: 'त्वरित (20 मिनट) • ₹5 लाख पीवीसी गोल्डन हेल्थ कार्ड',
    intakeFields: [
      {
        id: 'schemeIdentificationMode',
        label: 'Beneficiary Search Parameter',
        labelHi: 'खोज का आधार',
        type: 'select',
        required: true,
        options: [
          'Ration Card Number (NFSA Ration Card - राशन कार्ड संख्या)',
          'Aadhaar Number (Family Head / Beneficiary Aadhaar)',
          'PM-JAY Family ID / HH ID (SECC 2011 Letter)',
          'Location Search (District, Block, Village)',
        ],
      },
      {
        id: 'rationOrFamilyId',
        label: 'Ration Card No. / Family ID Number',
        labelHi: 'राशन कार्ड नंबर / फैमिली आईडी',
        type: 'text',
        required: true,
        placeholder: 'e.g. 102409823145',
      },
      {
        id: 'beneficiaryAadhaar',
        label: 'Beneficiary 12-Digit Aadhaar Number',
        labelHi: 'लाभार्थी का आधार नंबर',
        type: 'text',
        required: true,
        placeholder: 'XXXX XXXX XXXX',
      },
      {
        id: 'abhaNumber',
        label: '14-Digit ABHA ID (if already generated)',
        labelHi: '14-अंकीय आभा आईडी (यदि उपलब्ध हो)',
        type: 'text',
        required: false,
        placeholder: 'e.g. 91-1234-5678-9012',
        helpText: 'Leave empty to generate new ABHA health identity automatically.',
      },
    ],
    documentChecklist: [
      {
        id: 'doc-ayush-ration',
        name: 'Ration Card / PM Letter (Showing Family Name)',
        nameHi: 'राशन कार्ड अथवा पीएम पत्र',
        category: 'Identity',
        description: 'NFSA Ration card or official PM-JAY letter listing eligible family members.',
        descriptionHi: 'पात्र परिवार के सदस्यों की सूची दर्शाने वाला राशन कार्ड अथवा सरकारी पत्र।',
        acceptedFormats: ['.pdf', '.jpg', '.jpeg', '.png'],
        maxSizeBytes: 5 * 1024 * 1024,
        isMandatory: true,
      },
      {
        id: 'doc-ayush-aadhaar',
        name: 'Aadhaar Card of Individual Beneficiary',
        nameHi: 'लाभार्थी का आधार कार्ड',
        category: 'Identity',
        description: 'Aadhaar card of the family member for whom Golden Card is being printed.',
        descriptionHi: 'जिस सदस्य का गोल्डन कार्ड बनना है, उसका वैध आधार कार्ड।',
        acceptedFormats: ['.pdf', '.jpg', '.jpeg', '.png'],
        maxSizeBytes: 5 * 1024 * 1024,
        isMandatory: true,
      },
    ],
    statutoryGuidelines: [
      'Provides cashless hospital treatment up to ₹5,00,000 per family per year in empanelled hospitals.',
      'Requires Aadhaar OTP or biometric authentication on NHA Beneficiary portal.',
      'Senior citizens aged 70+ are now covered under Ayushman Vay Vandana with separate ₹5L top-up.',
    ],
    statutoryGuidelinesHi: [
      'सूचीबद्ध अस्पतालों में प्रति परिवार प्रति वर्ष ₹5,00,000 तक का मुफ्त कैशलेस इलाज उपलब्ध।',
      'एनएचए पोर्टल पर आधार ओटीपी अथवा फिंगरप्रिंट सत्यापन अनिवार्य है।',
      '70 वर्ष या अधिक आयु के वरिष्ठ नागरिकों के लिए ₹5 लाख का पृथक वंदना टॉप-अप उपलब्ध।',
    ],
  },

  // 8. Driving License Learning, Permanent & RTO Slot Booking
  'srv-driving-license': {
    serviceId: 'srv-driving-license',
    slug: 'driving-license-sarathi',
    officialAuthority: 'Ministry of Road Transport & Highways (MoRTH Sarathi Parivahan)',
    officialPortalUrl: 'https://parivahan.gov.in/',
    statutoryGovtFee: 350,
    adcsFacilitationFee: 299,
    slaTimeline: 'Learner: 3 - 7 Working Days • Permanent: Post RTO Driving Test',
    slaTimelineHi: 'लर्निंग: 3 - 7 कार्य दिवस • पक्का: आरटीओ टेस्ट उपरांत',
    intakeFields: [
      {
        id: 'licenseServiceType',
        label: 'Driving License Service Desired',
        labelHi: 'लाइसेंस सेवा का प्रकार',
        type: 'select',
        required: true,
        options: [
          'New Learner License (LL - नया लर्निंग लाइसेंस)',
          'Permanent Driving License (DL - पक्का लाइसेंस)',
          'Renewal of Driving License (लाइसेंस नवीनीकरण)',
          'Change of Address in DL (पते में संशोधन)',
          'International Driving Permit (IDP - अंतरराष्ट्रीय परमिट)',
        ],
      },
      {
        id: 'rtoJurisdiction',
        label: 'RTO Office & District Code',
        labelHi: 'संबंधित आरटीओ कार्यालय व कोड',
        type: 'text',
        required: true,
        placeholder: 'e.g. BR-01 Patna RTO / UP-14 Ghaziabad RTO',
      },
      {
        id: 'vehicleClasses',
        label: 'Vehicle Class Category',
        labelHi: 'वाहन श्रेणी',
        type: 'select',
        required: true,
        options: [
          'MCWG + LMV (Both Two Wheeler with Gear & Four Wheeler Car)',
          'MCWG (Two Wheeler with Gear - Motorcycle)',
          'MCWOG (Two Wheeler without Gear - Scooter/Moped)',
          'LMV (Four Wheeler Light Motor Vehicle - Car/Jeep)',
          'Transport / Commercial Vehicle (TR/HMV - Commercial)',
        ],
      },
      {
        id: 'bloodGroup',
        label: 'Applicant Blood Group',
        labelHi: 'रक्त समूह (Blood Group)',
        type: 'select',
        required: true,
        options: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-', 'Unknown'],
        helpText: 'Statutory field printed on the official Driving License smart card.',
      },
      {
        id: 'educationLevel',
        label: 'Educational Level',
        labelHi: 'शैक्षणिक योग्यता',
        type: 'select',
        required: true,
        options: ['10th Pass & Above', '8th Pass', 'Below 8th', 'Illiterate'],
      },
      {
        id: 'organDonorConsent',
        label: 'Willingness to Donate Organs in case of accidental death?',
        labelHi: 'अंगदान की सहमति (दुर्घटना उपरांत)',
        type: 'select',
        required: true,
        options: ['Yes (हाँ, सहमति है)', 'No (नहीं)'],
      },
    ],
    documentChecklist: [
      {
        id: 'doc-dl-age',
        name: 'Proof of Age / DOB',
        nameHi: 'आयु / जन्म तिथि का प्रमाण',
        category: 'DOB',
        description: '10th School Passing Marksheet, Birth Certificate, or Aadhaar Card.',
        descriptionHi: '10वीं बोर्ड मार्कशीट, जन्म प्रमाण पत्र अथवा आधार कार्ड।',
        acceptedFormats: ['.pdf', '.jpg', '.jpeg', '.png'],
        maxSizeBytes: 5 * 1024 * 1024,
        isMandatory: true,
      },
      {
        id: 'doc-dl-address',
        name: 'Proof of Address (PoA)',
        nameHi: 'पते का प्रमाण',
        category: 'Address',
        description: 'Aadhaar Card, Voter ID, Passport, or Electricity Bill.',
        descriptionHi: 'आधार कार्ड, वोटर कार्ड, पासपोर्ट अथवा बिजली बिल।',
        acceptedFormats: ['.pdf', '.jpg', '.jpeg', '.png'],
        maxSizeBytes: 5 * 1024 * 1024,
        isMandatory: true,
      },
      {
        id: 'doc-dl-medical',
        name: 'Form 1 (Self Declaration) / Form 1A Medical Fitness Certificate',
        nameHi: 'मेडिकल फिटनेस फॉर्म 1/1A',
        category: 'Medical',
        description: 'Signed Form 1 physical fitness declaration (Form 1A by MBBS doctor if age > 40 or commercial).',
        descriptionHi: 'शारीरिक फिटनेस स्व-घोषणा फॉर्म 1 (40 वर्ष से अधिक होने पर चिकित्सक प्रमाणित फॉर्म 1A)।',
        acceptedFormats: ['.pdf', '.jpg', '.jpeg', '.png'],
        maxSizeBytes: 5 * 1024 * 1024,
        isMandatory: true,
      },
      {
        id: 'doc-dl-photo-sign',
        name: 'Passport Photo & Signature Specimen',
        nameHi: 'पासपोर्ट फोटो व हस्ताक्षर नमूना',
        category: 'Photo',
        description: 'Clear photograph and signature on clean white paper.',
        descriptionHi: 'पासपोर्ट साइज फोटो एवं सफेद कागज पर किए गए हस्ताक्षर।',
        acceptedFormats: ['.jpg', '.jpeg', '.png'],
        maxSizeBytes: 2 * 1024 * 1024,
        isMandatory: true,
      },
    ],
    statutoryGuidelines: [
      'Learner license online test can be taken from home or Kendra using Aadhaar contactless authentication.',
      'Permanent license requires mandatory physical vehicle driving test at the RTO track after 30 days of LL.',
      'Driving without a valid license attracts statutory fine under Section 181 of the Motor Vehicles Act.',
    ],
    statutoryGuidelinesHi: [
      'लर्निंग लाइसेंस ऑनलाइन टेस्ट आधार ई-केवाईसी द्वारा घर अथवा केंद्र से दिया जा सकता है।',
      'पक्का लाइसेंस प्राप्त करने हेतु लर्निंग बनने के 30 दिन बाद आरटीओ ट्रैक पर ड्राइविंग टेस्ट देना अनिवार्य है।',
      'बिना वैध लाइसेंस वाहन चलाना मोटर वाहन अधिनियम की धारा 181 के तहत दंडनीय है।',
    ],
  },

  // 9. PM Kisan Samman Nidhi eKYC & Land Record Seeding
  'srv-pm-kisan-ekyc': {
    serviceId: 'srv-pm-kisan-ekyc',
    slug: 'pm-kisan-ekyc-seeding',
    officialAuthority: 'Department of Agriculture & Farmers Welfare (pmkisan.gov.in)',
    officialPortalUrl: 'https://pmkisan.gov.in/',
    statutoryGovtFee: 0,
    adcsFacilitationFee: 50,
    slaTimeline: 'Same Day Biometric Verification • Next Installment DBT',
    slaTimelineHi: 'समान दिवस बायोमेट्रिक सत्यापन • आगामी किस्त डीबीटी',
    intakeFields: [
      {
        id: 'farmerRegistrationNo',
        label: 'Farmer Registration Number / Mobile / Aadhaar',
        labelHi: 'किसान पंजीकरण संख्या / मोबाइल / आधार',
        type: 'text',
        required: true,
        placeholder: 'e.g. BR123456789 or 9876543210',
      },
      {
        id: 'serviceAction',
        label: 'Action Required on PM-Kisan',
        labelHi: 'आवश्यक कार्रवाई',
        type: 'select',
        required: true,
        options: [
          'Biometric OTP / RD Service eKYC (किस्त चालू करने हेतु eKYC)',
          'Land Seeding / Khatauni Record Verification (भूमि सत्यापन)',
          'Aadhaar NPCI Bank Account DBT Seeding (बैंक खाता लिंक)',
          'New Farmer Registration (नया किसान पंजीकरण)',
        ],
      },
      {
        id: 'landKhataNo',
        label: 'Revenue Khata / Jamabandi Number',
        labelHi: 'राजस्व खाता / जमाबंदी संख्या',
        type: 'text',
        required: true,
        placeholder: 'e.g. Khata No: 42, Khasra No: 184/2',
      },
      {
        id: 'landAreaHectares',
        label: 'Total Cultivable Land Holding (in Hectares)',
        labelHi: 'कुल कृषि भूमि (हेक्टेयर में)',
        type: 'number',
        required: true,
        placeholder: 'e.g. 1.25',
      },
      {
        id: 'bankAccountAndIfsc',
        label: 'Aadhaar-Seeded Bank Account Number & IFSC',
        labelHi: 'आधार से जुड़ा बैंक खाता संख्या व IFSC',
        type: 'text',
        required: true,
        placeholder: 'Account No & Bank IFSC Code',
      },
    ],
    documentChecklist: [
      {
        id: 'doc-kisan-land',
        name: 'Certified Land Ownership Record (Khatauni / Khasra / Jamabandi)',
        nameHi: 'जमीन की खतौनी / खसरा / जमाबंदी नकल',
        category: 'Land',
        description: 'Latest certified land record document showing farmer name as landholder.',
        descriptionHi: 'किसान के नाम से दर्ज अद्यतन प्रमाणित खतौनी/खसरा/जमाबंदी नकल।',
        acceptedFormats: ['.pdf', '.jpg', '.jpeg', '.png'],
        maxSizeBytes: 5 * 1024 * 1024,
        isMandatory: true,
      },
      {
        id: 'doc-kisan-aadhaar',
        name: 'Aadhaar Card of Landholding Farmer',
        nameHi: 'किसान का आधार कार्ड',
        category: 'Identity',
        description: 'Aadhaar card linked with bank account and active mobile.',
        descriptionHi: 'मोबाइल व बैंक से लिंक किसान का आधार कार्ड।',
        acceptedFormats: ['.pdf', '.jpg', '.jpeg', '.png'],
        maxSizeBytes: 5 * 1024 * 1024,
        isMandatory: true,
      },
      {
        id: 'doc-kisan-bank',
        name: 'Bank Passbook Copy (NPCI DBT Seeded)',
        nameHi: 'बैंक पासबुक (एनपीसीआई डीबीटी सत्यापित)',
        category: 'Income',
        description: 'First page of passbook showing account number, name & branch IFSC.',
        descriptionHi: 'खाता नंबर व IFSC कोड स्पष्ट दर्शाती बैंक पासबुक की प्रति।',
        acceptedFormats: ['.pdf', '.jpg', '.jpeg', '.png'],
        maxSizeBytes: 5 * 1024 * 1024,
        isMandatory: true,
      },
    ],
    statutoryGuidelines: [
      'Provides ₹6,000 per year in 3 equal installments of ₹2,000 directly via Aadhaar DBT.',
      'Mandatory eKYC and Land Seeding are required to unfreeze stopped installments.',
      'Institutional landholders and serving/retired government officers are excluded from scheme benefits.',
    ],
    statutoryGuidelinesHi: [
      'सालाना ₹6,000 की राशि ₹2,000 की तीन किस्तों में सीधे किसान के आधार बैंक खाते में डीबीटी होती है।',
      'रुकी हुई किस्तों को पुनः चालू कराने हेतु ई-केवाईसी व भू-सत्यापन (Land Seeding) अनिवार्य है।',
      'संवैधानिक पदधारक एवं सेवारत/सेवानिवृत्त सरकारी कर्मचारी योजना के पात्र नहीं हैं।',
    ],
  },

  // 10. Ration Card Member Addition, Split & NFSA E-Kyc
  'srv-ration-card-update': {
    serviceId: 'srv-ration-card-update',
    slug: 'ration-card-member-addition',
    officialAuthority: 'Department of Food & Public Distribution (NFSA / State Food Portal)',
    officialPortalUrl: 'https://nfsa.gov.in/',
    statutoryGovtFee: 50,
    adcsFacilitationFee: 100,
    slaTimeline: '7 - 15 Working Days • Supply Inspector Verification',
    slaTimelineHi: '7 - 15 कार्य दिवस • आपूर्ति निरीक्षक द्वारा सत्यापन',
    intakeFields: [
      {
        id: 'rationCardNo',
        label: 'Existing Ration Card Number',
        labelHi: 'मौजूदा राशन कार्ड संख्या',
        type: 'text',
        required: true,
        placeholder: 'e.g. 1024009823145',
      },
      {
        id: 'rationCardType',
        label: 'Ration Card Category',
        labelHi: 'राशन कार्ड की श्रेणी',
        type: 'select',
        required: true,
        options: [
          'PHH (Priority Household - प्राथमिकता परिवार राशन कार्ड)',
          'AAY (Antyodaya Anna Yojana - अंत्योदय गुलाबी/पीला कार्ड)',
          'BPL / White Card (गरीबी रेखा से नीचे)',
          'APL / Non-Subsidized (सामान्य राशन कार्ड)',
        ],
      },
      {
        id: 'headOfFamilyName',
        label: 'Head of Family Name (महिला मुखिया का नाम)',
        labelHi: 'परिवार की मुखिया का नाम',
        type: 'text',
        required: true,
        placeholder: 'e.g. Smt. Shanti Devi',
        helpText: 'Under NFSA 2013, the eldest adult woman is statutory head of household.',
      },
      {
        id: 'changeType',
        label: 'Modification Requested',
        labelHi: 'संशोधन का प्रकार',
        type: 'select',
        required: true,
        options: [
          'Add New Member: Newborn Child (बच्चे का नाम जोड़ना)',
          'Add New Member: Newly Married Daughter-in-Law (नवविवाहित वधू का नाम जोड़ना)',
          'Split Family / New Ration Card Unit (अलग राशन कार्ड बनाना)',
          'Delete / Surrender Member (सदस्य का नाम हटाना)',
          'Change Fair Price Shop (डीलर/दुकान स्थानांतरण)',
        ],
      },
      {
        id: 'newMemberName',
        label: 'New Member Full Name & Gender',
        labelHi: 'नए सदस्य का पूरा नाम व लिंग',
        type: 'text',
        required: true,
        placeholder: 'e.g. Aarav Kumar (Male / Son)',
      },
      {
        id: 'newMemberAadhaar',
        label: 'New Member 12-Digit Aadhaar Number',
        labelHi: 'नए सदस्य का आधार नंबर',
        type: 'text',
        required: true,
        placeholder: 'XXXX XXXX XXXX',
      },
      {
        id: 'relationshipWithHead',
        label: 'Relationship with Head of Household',
        labelHi: 'मुखिया से संबंध',
        type: 'select',
        required: true,
        options: ['Son (पुत्र)', 'Daughter (पुत्री)', 'Wife (पत्नी)', 'Daughter-in-Law (पुत्रवधू)', 'Mother (माता)', 'Father (पिता)', 'Grandchild (पोता/पोती)'],
      },
    ],
    documentChecklist: [
      {
        id: 'doc-rat-existing',
        name: 'Copy of Existing Ration Card (All Pages)',
        nameHi: 'मौजूदा राशन कार्ड की पूर्ण प्रति',
        category: 'Legal',
        description: 'Clear scan of existing ration card showing family member listing and FPS dealer details.',
        descriptionHi: 'परिवार के सदस्यों की सूची व डीलर का विवरण दर्शाती राशन कार्ड की प्रति।',
        acceptedFormats: ['.pdf', '.jpg', '.jpeg', '.png'],
        maxSizeBytes: 5 * 1024 * 1024,
        isMandatory: true,
      },
      {
        id: 'doc-rat-aadhaar-new',
        name: 'Aadhaar Card of New Member',
        nameHi: 'नए सदस्य का आधार कार्ड',
        category: 'Identity',
        description: 'Aadhaar card copy of the new member being added.',
        descriptionHi: 'जोड़े जाने वाले नए सदस्य का स्पष्ट आधार कार्ड।',
        acceptedFormats: ['.pdf', '.jpg', '.jpeg', '.png'],
        maxSizeBytes: 5 * 1024 * 1024,
        isMandatory: true,
      },
      {
        id: 'doc-rat-relation-proof',
        name: 'Relationship Proof (Birth Certificate / Marriage Certificate)',
        nameHi: 'संबंध का प्रमाण (जन्म प्रमाण पत्र / विवाह प्रमाण पत्र)',
        category: 'Legal',
        description: 'Official birth certificate for child OR marriage certificate / parivahan receipt for newly married spouse.',
        descriptionHi: 'बच्चे के लिए नगर निगम/पंचायत जन्म प्रमाण पत्र अथवा वधू हेतु विवाह प्रमाण पत्र।',
        acceptedFormats: ['.pdf', '.jpg', '.jpeg', '.png'],
        maxSizeBytes: 5 * 1024 * 1024,
        isMandatory: true,
      },
      {
        id: 'doc-rat-surrender',
        name: 'Surrender / Deletion Certificate from previous Ration Card (if married)',
        nameHi: 'पुराने राशन कार्ड से नाम कटने का प्रमाण (यदि विवाहित)',
        category: 'Legal',
        description: 'Surrender receipt confirming deletion of name from maternal home ration card.',
        descriptionHi: 'मायके के राशन कार्ड से नाम विलोपन का सरकारी प्रमाण पत्र।',
        acceptedFormats: ['.pdf', '.jpg', '.jpeg'],
        maxSizeBytes: 5 * 1024 * 1024,
        isMandatory: false,
      },
    ],
    statutoryGuidelines: [
      'Under One Nation One Ration Card (ONORC), ration can be collected from any PDS shop across India.',
      'Mandatory Aadhaar e-KYC must be completed for all family members above 5 years of age.',
      'Approval is granted by the District Supply Officer (DSO) post-field scrutiny by Supply Inspector.',
    ],
    statutoryGuidelinesHi: [
      'वन नेशन वन राशन कार्ड योजना के तहत भारत में किसी भी राशन डीलर से राशन प्राप्त किया जा सकता है।',
      '5 वर्ष से अधिक आयु के सभी सदस्यों का आधार ई-केवाईसी होना अनिवार्य है।',
      'आपूर्ति निरीक्षक की जांच के उपरांत जिला आपूर्ति अधिकारी द्वारा नई यूनिट स्वीकृत की जाती है।',
    ],
  },

  // 11. Private Limited Company Incorporation (MCA SPICe+)
  'srv-pvt-ltd': {
    serviceId: 'srv-pvt-ltd',
    slug: 'pvt-ltd-incorporation',
    officialAuthority: 'Ministry of Corporate Affairs (MCA) • Registrar of Companies',
    officialPortalUrl: 'https://www.mca.gov.in/',
    statutoryGovtFee: 1500,
    adcsFacilitationFee: 5499,
    slaTimeline: '7 - 10 Working Days',
    slaTimelineHi: '7 से 10 कार्य दिवस',
    intakeFields: [
      {
        id: 'companyNameOpt1',
        label: 'Proposed Company Name (Option 1)',
        labelHi: 'प्रस्तावित कंपनी नाम (विकल्प 1)',
        type: 'text',
        required: true,
        placeholder: 'e.g. Acme Technologies Private Limited',
        helpText: 'Must end with Private Limited and comply with MCA naming guidelines.',
      },
      {
        id: 'companyNameOpt2',
        label: 'Proposed Company Name (Option 2)',
        labelHi: 'प्रस्तावित कंपनी नाम (विकल्प 2)',
        type: 'text',
        required: true,
        placeholder: 'e.g. Acme Innovations Private Limited',
      },
      {
        id: 'directorCount',
        label: 'Number of Directors',
        labelHi: 'निदेशकों की संख्या',
        type: 'select',
        required: true,
        options: ['2 Directors (न्यूनतम)', '3 Directors', '4 Directors', '5+ Directors'],
      },
      {
        id: 'authorizedCapital',
        label: 'Authorized Share Capital',
        labelHi: 'अधिकृत शेयर पूंजी',
        type: 'select',
        required: true,
        options: ['₹1,00,000 (Standard Zero MCA Stamp Duty)', '₹5,00,000', '₹10,00,000', '₹50,00,000+'],
      },
      {
        id: 'businessActivity',
        label: 'Main Business Objects & Industry',
        labelHi: 'मुख्य व्यापारिक उद्देश्य व उद्योग',
        type: 'textarea',
        required: true,
        placeholder: 'Describe core commercial products/services for MOA drafting...',
      },
    ],
    documentChecklist: [
      {
        id: 'doc-mca-pan-directors',
        name: 'PAN Card of all Proposed Directors',
        nameHi: 'सभी निदेशकों का पैन कार्ड',
        category: 'Identity',
        description: 'Self-attested clear copy of PAN for Director 1 and Director 2.',
        descriptionHi: 'निदेशक 1 एवं 2 का स्वहस्ताक्षरित स्पष्ट पैन कार्ड।',
        acceptedFormats: ['.pdf', '.jpg', '.jpeg', '.png'],
        maxSizeBytes: 5 * 1024 * 1024,
        isMandatory: true,
      },
      {
        id: 'doc-mca-address-directors',
        name: 'Identity & Address Proof of Directors (Aadhaar / Passport / Voter ID)',
        nameHi: 'निदेशकों का पहचान व पते का प्रमाण (आधार/पासपोर्ट/वोटर आईडी)',
        category: 'Address',
        description: 'Address proof not older than 2 months showing applicant residential address.',
        descriptionHi: '2 महीने से पुराना न हो, जिसमें वर्तमान आवासीय पता दर्ज हो।',
        acceptedFormats: ['.pdf', '.jpg', '.jpeg', '.png'],
        maxSizeBytes: 5 * 1024 * 1024,
        isMandatory: true,
      },
      {
        id: 'doc-mca-bank-statement',
        name: 'Director Personal Bank Statement / Electricity Bill',
        nameHi: 'निदेशक का बैंक स्टेटमेंट / बिजली बिल',
        category: 'Address',
        description: 'Bank statement of last 2 months with latest transactions.',
        descriptionHi: 'पिछले 2 माह का बैंक स्टेटमेंट अथवा बिजली बिल।',
        acceptedFormats: ['.pdf', '.jpg', '.jpeg'],
        maxSizeBytes: 5 * 1024 * 1024,
        isMandatory: true,
      },
      {
        id: 'doc-mca-office-proof',
        name: 'Registered Office Electricity Bill & NOC from Landlord',
        nameHi: 'रजिस्टर्ड ऑफिस का बिजली बिल एवं मकान मालिक की एनओसी',
        category: 'Business',
        description: 'Recent electricity bill of office premises along with signed NOC from property owner.',
        descriptionHi: 'ऑफिस का नवीनतम बिजली बिल एवं संपत्ति स्वामी द्वारा हस्ताक्षरित अनापत्ति प्रमाण पत्र।',
        acceptedFormats: ['.pdf', '.jpg', '.jpeg'],
        maxSizeBytes: 5 * 1024 * 1024,
        isMandatory: true,
      },
    ],
    statutoryGuidelines: [
      'Digital Signature Certificate (DSC Class 3) is mandatory for at least one director to sign SPICe+ forms.',
      'All registered companies receive Certificate of Incorporation (COI), PAN, TAN, EPFO, ESIC & bank account in unified SPICe+.',
      'Annual RoC compliance filing is mandatory from the financial year of incorporation.',
    ],
    statutoryGuidelinesHi: [
      'SPICe+ फॉर्म डिजिटल हस्ताक्षर करने हेतु कम से कम एक निदेशक का क्लास-3 डीएससी अनिवार्य है।',
      'सफल पंजीकरण पर निगमन प्रमाणपत्र (COI), पैन, टैन, ईपीएफओ एवं ईएसआईसी एक साथ जारी होते हैं।',
      'निगमन के वर्ष से ही वार्षिक RoC फाइलिंग अनिवार्य हो जाती है।',
    ],
  },

  // 12. GST New Registration
  'srv-gst-reg': {
    serviceId: 'srv-gst-reg',
    slug: 'gst-registration',
    officialAuthority: 'Goods & Services Tax Network (GSTN) • CBIC',
    officialPortalUrl: 'https://www.gst.gov.in/',
    statutoryGovtFee: 0,
    adcsFacilitationFee: 999,
    slaTimeline: '3 - 6 Working Days',
    slaTimelineHi: '3 से 6 कार्य दिवस',
    intakeFields: [
      {
        id: 'constitutionOfBiz',
        label: 'Constitution of Business',
        labelHi: 'व्यापार का प्रकार',
        type: 'select',
        required: true,
        options: ['Proprietorship (व्यक्तिगत)', 'Partnership Firm (साझेदारी)', 'Private Limited Company', 'LLP', 'Society / Trust'],
      },
      {
        id: 'tradeName',
        label: 'Trade / Business Name',
        labelHi: 'व्यापारिक / फर्म का नाम',
        type: 'text',
        required: true,
        placeholder: 'e.g. Verma Enterprises',
      },
      {
        id: 'hsnCodes',
        label: 'Top 5 Goods / Services (HSN / SAC Codes)',
        labelHi: 'मुख्य वस्तुएं / सेवाएं (HSN / SAC कोड)',
        type: 'textarea',
        required: true,
        placeholder: 'e.g. 8471 (Computers), 9983 (IT Services)',
      },
      {
        id: 'premisesNature',
        label: 'Nature of Possession of Premises',
        labelHi: 'व्यापारिक स्थल का प्रकार',
        type: 'select',
        required: true,
        options: ['Rented (किराए पर)', 'Owned (स्वयं का)', 'Consent / Shared', 'Leased'],
      },
    ],
    documentChecklist: [
      {
        id: 'doc-gst-pan',
        name: 'PAN Card of Proprietor / Partners / Company',
        nameHi: 'व्यापारी / फर्म का पैन कार्ड',
        category: 'Identity',
        description: 'PAN card of the business entity or sole proprietor.',
        descriptionHi: 'प्रोपराइटर या व्यावसायिक संस्था का पैन कार्ड।',
        acceptedFormats: ['.pdf', '.jpg', '.jpeg', '.png'],
        maxSizeBytes: 5 * 1024 * 1024,
        isMandatory: true,
      },
      {
        id: 'doc-gst-aadhaar',
        name: 'Aadhaar Card with Mobile OTP Linking',
        nameHi: 'आधार कार्ड (मोबाइल लिंक अनिवार्य)',
        category: 'Identity',
        description: 'Aadhaar card of authorized signatory for instant Aadhaar Authentication.',
        descriptionHi: 'अधिकृत हस्ताक्षरकर्ता का आधार कार्ड (बायोमेट्रिक/ओटीपी सत्यापन हेतु)।',
        acceptedFormats: ['.pdf', '.jpg', '.jpeg', '.png'],
        maxSizeBytes: 5 * 1024 * 1024,
        isMandatory: true,
      },
      {
        id: 'doc-gst-bank-proof',
        name: 'Bank Account Cancelled Cheque / Passbook',
        nameHi: 'बैंक खाता कैंसिल्ड चेक / पासबुक प्रति',
        category: 'Business',
        description: 'Cancelled cheque showing Account Number, IFSC and Name of account holder.',
        descriptionHi: 'खाता संख्या, आईएफएससी व खाताधारक का नाम प्रदर्शित करने वाला चेक।',
        acceptedFormats: ['.pdf', '.jpg', '.jpeg', '.png'],
        maxSizeBytes: 5 * 1024 * 1024,
        isMandatory: true,
      },
      {
        id: 'doc-gst-premises-proof',
        name: 'Business Premises Electricity Bill & Rent Agreement',
        nameHi: 'दुकान/ऑफिस का बिजली बिल एवं किरायानामा',
        category: 'Address',
        description: 'Electricity bill not older than 2 months and notarized rent agreement if rented.',
        descriptionHi: 'व्यापारिक स्थल का बिजली बिल एवं नोटरी किरायानामा (यदि किराए पर हो)।',
        acceptedFormats: ['.pdf', '.jpg', '.jpeg'],
        maxSizeBytes: 5 * 1024 * 1024,
        isMandatory: true,
      },
    ],
    statutoryGuidelines: [
      'Aadhaar Authentication is mandatory for instant GST approval without physical site inspection.',
      'Mandatory threshold for goods is ₹40 Lakhs turnover (₹20 Lakhs in special states) and ₹20 Lakhs for services.',
      'GST returns must be filed monthly/quarterly irrespective of business turnover (Nil return mandatory if zero sales).',
    ],
    statutoryGuidelinesHi: [
      'बिना भौतिक निरीक्षण के त्वरित जीएसटी आवंटन हेतु आधार प्रमाणीकरण अनिवार्य है।',
      'वस्तुओं के लिए 40 लाख एवं सेवाओं के लिए 20 लाख से अधिक टर्नओवर पर जीएसटी अनिवार्य है।',
      'बिक्री शून्य होने पर भी निल (Nil) जीएसटी रिटर्न दाखिल करना कानूनी रूप से अनिवार्य है।',
    ],
  },

  // 13. Online E-Stamp Rent Agreement
  'srv-rent-agreement': {
    serviceId: 'srv-rent-agreement',
    slug: 'online-rent-agreement',
    officialAuthority: 'State Revenue & Registration Department • Stock Holding (SHCIL)',
    officialPortalUrl: 'https://www.shcilestamp.com/',
    statutoryGovtFee: 100,
    adcsFacilitationFee: 399,
    slaTimeline: '2 - 4 Hours',
    slaTimelineHi: '2 से 4 घंटे',
    intakeFields: [
      {
        id: 'landlordName',
        label: 'Landlord / Property Owner Full Name',
        labelHi: 'मकान मालिक का पूरा नाम',
        type: 'text',
        required: true,
        placeholder: 'e.g. Ramesh Kumar Singh',
      },
      {
        id: 'tenantName',
        label: 'Tenant Full Name',
        labelHi: 'किरायेदार का पूरा नाम',
        type: 'text',
        required: true,
        placeholder: 'e.g. Rahul Verma',
      },
      {
        id: 'monthlyRent',
        label: 'Monthly Rent Amount (₹)',
        labelHi: 'मासिक किराया राशि (₹)',
        type: 'number',
        required: true,
        placeholder: 'e.g. 12000',
      },
      {
        id: 'securityDeposit',
        label: 'Security Deposit Amount (₹)',
        labelHi: 'सुरक्षा राशि (डिपॉजिट ₹)',
        type: 'number',
        required: true,
        placeholder: 'e.g. 24000',
      },
      {
        id: 'agreementDuration',
        label: 'Agreement Duration',
        labelHi: 'एग्रीमेंट की अवधि',
        type: 'select',
        required: true,
        options: ['11 Months (मानक)', '22 Months', '33 Months', '5 Years (Commercial)'],
      },
      {
        id: 'propertyAddress',
        label: 'Rented Property Complete Address with PIN',
        labelHi: 'किराए पर दी जाने वाली संपत्ति का पूरा पता',
        type: 'textarea',
        required: true,
        placeholder: 'Flat No, Building, Street, Landmark, City, State, PIN...',
      },
    ],
    documentChecklist: [
      {
        id: 'doc-rent-owner-id',
        name: 'Landlord Aadhaar Card & Ownership Proof',
        nameHi: 'मकान मालिक का आधार कार्ड व स्वामित्व प्रमाण',
        category: 'Identity',
        description: 'Aadhaar copy of owner and electricity bill / municipal tax receipt of property.',
        descriptionHi: 'मकान मालिक का आधार एवं संपत्ति की बिजली रसीद/होल्डिंग टैक्स रसीद।',
        acceptedFormats: ['.pdf', '.jpg', '.jpeg', '.png'],
        maxSizeBytes: 5 * 1024 * 1024,
        isMandatory: true,
      },
      {
        id: 'doc-rent-tenant-id',
        name: 'Tenant Aadhaar Card & Permanent Address Proof',
        nameHi: 'किरायेदार का आधार कार्ड व स्थायी पता प्रमाण',
        category: 'Identity',
        description: 'Aadhaar card / Voter ID of tenant showing permanent hometown address.',
        descriptionHi: 'किरायेदार का आधार अथवा वोटर कार्ड जिसमें स्थायी पता दर्ज हो।',
        acceptedFormats: ['.pdf', '.jpg', '.jpeg', '.png'],
        maxSizeBytes: 5 * 1024 * 1024,
        isMandatory: true,
      },
      {
        id: 'doc-rent-photos',
        name: 'Passport Photos of Landlord & Tenant',
        nameHi: 'मकान मालिक एवं किरायेदार की पासपोर्ट फोटो',
        category: 'Photo',
        description: 'Recent passport size photos for agreement stamping and notarization.',
        descriptionHi: 'स्टाम्प पेपर एवं नोटरी प्रमाणीकरण हेतु नवीनतम रंगीन फोटो।',
        acceptedFormats: ['.jpg', '.jpeg', '.png'],
        maxSizeBytes: 5 * 1024 * 1024,
        isMandatory: false,
      },
    ],
    statutoryGuidelines: [
      'Under the Indian Stamp Act, 11-month rent agreements are executed on non-judicial e-stamp paper to avoid compulsory registration.',
      'Accepted as valid proof of address for Bank Account, Passport PSK, Gas connection & Wi-Fi.',
      'Security deposit refund clauses and 1-month notice period are standard statutory terms.',
    ],
    statutoryGuidelinesHi: [
      'भारतीय स्टाम्प अधिनियम के तहत 11 माह का अनुबंध ई-स्टैम्प पेपर पर मान्य एवं कानूनी रूप से बाध्यकारी है।',
      'बैंक खाता खोलने, पासपोर्ट सेवा केंद्र, गैस कनेक्शन एवं ड्राइविंग लाइसेंस हेतु वैध पते का प्रमाण है।',
      'सुरक्षा राशि वापसी एवं 1 माह का पूर्व नोटिस मानक वैधानिक नियम हैं।',
    ],
  },
};

/**
 * Universal Service & Statutory Profile Resolver (PRD Part B, §5)
 * Dynamically resolves or synthesizes compliant profiles for ALL 59 services across ALL 17 sectors.
 */
export function resolveStatutoryProfile(serviceIdOrSlug: string, fallbackCategory?: string, fallbackService?: any): ServiceStatutoryProfile {
  // 1. Direct registry hit
  if (STATUTORY_REGISTRY[serviceIdOrSlug]) {
    return STATUTORY_REGISTRY[serviceIdOrSlug];
  }

  const key = (serviceIdOrSlug || '').toLowerCase();

  // 2. Exact keyword matching
  if (key.includes('passport')) return STATUTORY_REGISTRY['srv-passport-assist'];
  if (key.includes('pan') || key.includes('49a')) return STATUTORY_REGISTRY['srv-pan-new'];
  if (key.includes('income') || key.includes('caste') || key.includes('domicile') || key.includes('cert')) return STATUTORY_REGISTRY['srv-income-cert'];
  if (key.includes('eshram') || key.includes('shram')) return STATUTORY_REGISTRY['srv-eshram-reg'];
  if (key.includes('aadhaar')) return STATUTORY_REGISTRY['srv-aadhaar-update'];
  if (key.includes('voter') || key.includes('epic') || key.includes('nvsp')) return STATUTORY_REGISTRY['srv-voter-card'];
  if (key.includes('ayushman') || key.includes('abha') || key.includes('golden')) return STATUTORY_REGISTRY['srv-ayushman-card'];
  if (key.includes('driving') || key.includes('dl') || key.includes('sarathi')) return STATUTORY_REGISTRY['srv-driving-license'];
  if (key.includes('pmkisan') || key.includes('kisan')) return STATUTORY_REGISTRY['srv-pm-kisan-ekyc'];
  if (key.includes('ration') || key.includes('nfsa')) return STATUTORY_REGISTRY['srv-ration-card-update'];
  if (key.includes('pvt-ltd') || key.includes('company') || key.includes('incorporat')) return STATUTORY_REGISTRY['srv-pvt-ltd'];
  if (key.includes('gst')) return STATUTORY_REGISTRY['srv-gst-reg'];
  if (key.includes('rent') || key.includes('tenant')) return STATUTORY_REGISTRY['srv-rent-agreement'];

  // 3. Dynamic Sector-Compliant Synthesis (guarantees 100% service coverage)
  const category = fallbackCategory || fallbackService?.category || 'business';
  const title = fallbackService?.title || serviceIdOrSlug.replace(/-/g, ' ').toUpperCase();
  const titleHi = fallbackService?.titleHi || title;
  const basePrice = fallbackService?.basePrice || 199;
  const govtFee = fallbackService?.govtFee || 0;
  const timeline = fallbackService?.timeline || '2 - 5 Working Days';
  const timelineHi = fallbackService?.timelineHi || '2 से 5 कार्य दिवस';

  let authority = 'Competent Regulatory Authority';
  let portalUrl = 'https://india.gov.in';

  if (category === 'travel') {
    authority = 'Indian Railway Catering & Tourism Corp (IRCTC) / DGCA';
    portalUrl = 'https://www.irctc.co.in/';
  } else if (category === 'bills') {
    authority = 'Bharat Bill Payment System (BBPS) • NPCI';
    portalUrl = 'https://www.bharatbillpay.com/';
  } else if (category === 'business') {
    authority = 'Ministry of Corporate Affairs (MCA) / MSME';
    portalUrl = 'https://www.mca.gov.in/';
  } else if (category === 'finance') {
    authority = 'Reserve Bank of India (RBI) Regulated Lending Partners';
    portalUrl = 'https://rbi.org.in/';
  } else if (category === 'insurance') {
    authority = 'Insurance Regulatory & Development Authority (IRDAI)';
    portalUrl = 'https://irdai.gov.in/';
  } else if (category === 'cctv') {
    authority = 'ADCS Certified Smart Surveillance Network';
    portalUrl = 'https://ds.akuldravin.com/cctv';
  } else if (category === 'construction') {
    authority = 'Municipal Corporation / Town Planning Authority';
    portalUrl = 'https://ds.akuldravin.com/construction';
  } else if (category === 'courier') {
    authority = 'ADCS Express Cargo & Logistics Super Hub';
    portalUrl = 'https://ds.akuldravin.com/courier';
  } else if (category === 'astrology') {
    authority = 'Vedic Astrological Council & Bureau of Indian Standards (BIS)';
    portalUrl = 'https://ds.akuldravin.com/astrology';
  } else if (category === 'consulting') {
    authority = 'Institute of Chartered Accountants (ICAI) / Bar Council';
    portalUrl = 'https://www.icai.org/';
  }

  const rawDocs: string[] = fallbackService?.requiredDocs || [
    'Aadhaar Card / Government Photo ID',
    'Address Proof of Applicant',
    'Service-Specific Supporting Records'
  ];

  return {
    serviceId: serviceIdOrSlug,
    slug: fallbackService?.slug || serviceIdOrSlug,
    officialAuthority: authority,
    officialPortalUrl: portalUrl,
    statutoryGovtFee: govtFee,
    adcsFacilitationFee: basePrice,
    slaTimeline: timeline,
    slaTimelineHi: timelineHi,
    intakeFields: [
      {
        id: 'applicantCategory',
        label: 'Applicant / Beneficiary Category',
        labelHi: 'आवेदक / लाभार्थी श्रेणी',
        type: 'select',
        required: true,
        options: ['Individual (व्यक्तिगत)', 'Business / Proprietor (व्यापार)', 'Commercial Firm / Entity'],
        helpText: 'Select category for correct statutory filing parameters.',
      },
      {
        id: 'primaryIdentifier',
        label: 'Aadhaar / Primary Identity Number',
        labelHi: 'आधार / प्राथमिक पहचान संख्या',
        type: 'text',
        required: true,
        placeholder: '12-digit Aadhaar or PAN number',
      },
      {
        id: 'serviceRequirements',
        label: 'Specific Requirements / Remarks',
        labelHi: 'विशिष्ट आवश्यकताएं / टिप्पणी',
        type: 'textarea',
        required: false,
        placeholder: 'Provide any specific instructions or requirements...',
      },
    ],
    documentChecklist: rawDocs.map((docName, idx) => ({
      id: `doc-${idx + 1}-${serviceIdOrSlug}`,
      name: docName,
      nameHi: (fallbackService?.requiredDocsHi && fallbackService.requiredDocsHi[idx]) || docName,
      category: idx === 0 ? 'Identity' : idx === 1 ? 'Address' : 'Business',
      description: `Mandatory verification record: ${docName}`,
      descriptionHi: `सत्यापन हेतु आवश्यक आधिकारिक रिकॉर्ड: ${docName}`,
      acceptedFormats: ['.pdf', '.jpg', '.jpeg', '.png'],
      maxSizeBytes: 5 * 1024 * 1024,
      isMandatory: idx === 0,
    })),
    statutoryGuidelines: [
      `Assisted preparation executed under ADCS DPDP Act 2025 compliance protocol.`,
      `Statutory approvals and certificates belong solely to ${authority}.`,
      `Final status updates and tracking receipts are permanently vaulted in your ADCS console.`
    ],
    statutoryGuidelinesHi: [
      `डिजिटल पर्सनल डेटा प्रोटेक्शन एक्ट 2025 के मानकों के तहत सुरक्षित आवेदन प्रक्रिया।`,
      `वैधानिक निर्णय एवं अंतिम प्रमाणपत्र संबंधित सक्षम प्राधिकारी (${authority}) द्वारा जारी किया जाता है।`,
      `आवेदन की पावती एवं ट्रैकिंग विवरण आपके एडीसीएस कंसोल में सुरक्षित रहेगा।`
    ],
  };
}
