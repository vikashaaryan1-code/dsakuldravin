export interface OfficialPortalEntry {
  portalName: string;
  authority: string;
  url: string;
  purpose: string;
  statePortals?: Record<string, { name: string; url: string }>;
  complianceNotice: string;
  complianceNoticeHi: string;
}

export const STATE_EDISTRICT_PORTALS: Record<string, { name: string; url: string }> = {
  'Bihar': { name: 'RTPS / ServicePlus Bihar', url: 'https://serviceonline.bihar.gov.in/' },
  'Uttar Pradesh': { name: 'e-District Uttar Pradesh', url: 'https://edistrict.up.gov.in/' },
  'Jharkhand': { name: 'Jharsewa (e-District Jharkhand)', url: 'https://jharsewa.jharkhand.gov.in/' },
  'Delhi': { name: 'e-District Delhi NCT', url: 'https://edistrict.delhigovt.nic.in/' },
  'Maharashtra': { name: 'Aaple Sarkar Maharashtra', url: 'https://aaplesarkar.mahaonline.gov.in/' },
  'Karnataka': { name: 'Seva Sindhu Karnataka', url: 'https://sevasindhu.karnataka.gov.in/' },
  'Rajasthan': { name: 'e-Mitra Rajasthan', url: 'https://emitra.rajasthan.gov.in/' },
  'Madhya Pradesh': { name: 'MP e-District Portal', url: 'https://mpedistrict.gov.in/' },
  'West Bengal': { name: 'e-District West Bengal', url: 'https://edistrict.wb.gov.in/' },
  'Gujarat': { name: 'Digital Gujarat Portal', url: 'https://www.digitalgujarat.gov.in/' },
};

const OFFICIAL_PORTAL_REGISTRY: Array<{ match: string[]; entry: OfficialPortalEntry }> = [
  {
    match: ['passport'],
    entry: {
      portalName: 'Passport Seva (Ministry of External Affairs)',
      authority: 'Ministry of External Affairs, Govt. of India',
      url: 'https://www.passportindia.gov.in/',
      purpose: 'Normal & Tatkal Passport Filing, Fee Challan & PSK/POPSK Appointment Booking',
      complianceNotice: 'Applicant must complete final OTP login, biometric verification & photograph capture in person at the designated PSK/POPSK.',
      complianceNoticeHi: 'आवेदक को आधिकारिक पासपोर्ट सेवा पोर्टल पर अंतिम OTP सत्यापन एवं पासपोर्ट सेवा केंद्र (PSK) पर बायोमेट्रिक उपस्थित होना अनिवार्य है।',
    },
  },
  {
    match: ['income', 'caste', 'domicile', 'state-certificates', 'birth', 'death'],
    entry: {
      portalName: 'State e-District / ServicePlus Citizen Portal',
      authority: 'State Revenue / Tehsildar / SDM Authority',
      url: 'https://serviceonline.gov.in/',
      purpose: 'Income, Caste, Domicile & Statutory Revenue Certificate Issuance',
      statePortals: STATE_EDISTRICT_PORTALS,
      complianceNotice: 'ADCS prepares verified scans and pre-scrutiny data; final submission & Aadhaar e-Sign/OTP occur directly on the State e-District portal.',
      complianceNoticeHi: 'ADCS केवल दस्तावेज़ जांच एवं डेटा तैयारी में सहायता करता है; अंतिम सबमिशन व OTP राज्य के आधिकारिक e-District पोर्टल पर ही होता है।',
    },
  },
  {
    match: ['aadhaar', 'uidai'],
    entry: {
      portalName: 'myAadhaar (UIDAI)',
      authority: 'Unique Identification Authority of India',
      url: 'https://myaadhaar.uidai.gov.in/',
      purpose: 'Address Update, PVC Order & Demographic Document Update',
      complianceNotice: 'Strict UIDAI compliance: OTP authentication happens solely on myaadhaar.uidai.gov.in. Biometric updates require physical Aadhaar Seva Kendra visit.',
      complianceNoticeHi: 'UIDAI नियमों के अनुसार केवल आवेदक के OTP द्वारा myAadhaar पोर्टल पर ही अपडेट संभव है। बायोमेट्रिक के लिए केंद्र पर जाना आवश्यक है।',
    },
  },
  {
    match: ['eshram', 'labour'],
    entry: {
      portalName: 'e-Shram National Portal',
      authority: 'Ministry of Labour & Employment, Govt. of India',
      url: 'https://eshram.gov.in/',
      purpose: 'Unorganized Worker UAN Registration & PMSBY Cover',
      complianceNotice: 'Aadhaar OTP verification is completed directly by the worker on eshram.gov.in without third-party credential bypass.',
      complianceNoticeHi: 'श्रमिक के आधार-लिंक्ड मोबाइल OTP सत्यापन द्वारा ही आधिकारिक eshram.gov.in पोर्टल पर UAN कार्ड जारी होता है।',
    },
  },
  {
    match: ['ayushman', 'abha', 'pmjay'],
    entry: {
      portalName: 'NHA Beneficiary Portal (PM-JAY)',
      authority: 'National Health Authority, Govt. of India',
      url: 'https://beneficiary.nha.gov.in/',
      purpose: 'Ayushman Bharat ₹5 Lakh Health Cover e-KYC & Card Download',
      complianceNotice: 'Beneficiary eligibility & Aadhaar e-KYC OTP/RD authentication take place directly via NHA Beneficiary Portal.',
      complianceNoticeHi: 'लाभार्थी पात्रता व e-KYC सत्यापन सीधे NHA के आधिकारिक पोर्टल पर OTP या पंजीकृत बायोमेट्रिक से होता है।',
    },
  },
  {
    match: ['voter', 'epic'],
    entry: {
      portalName: 'Voters’ Service Portal (ECI)',
      authority: 'Election Commission of India',
      url: 'https://voters.eci.gov.in/',
      purpose: 'Form 6 New Voter Registration, Form 8 Correction & e-EPIC Download',
      complianceNotice: 'Statutory Form 6/8 verification is conducted directly by the Electoral Registration Officer (ERO) / BLO.',
      complianceNoticeHi: 'मतदाता पंजीकरण व सुधार का अंतिम सत्यापन भारत निर्वाचन आयोग के पोर्टल व ERO/BLO द्वारा किया जाता है।',
    },
  },
  {
    match: ['driving', 'dl', 'parivahan', 'vahan'],
    entry: {
      portalName: 'Parivahan Sewa (Sarathi / Vahan)',
      authority: 'Ministry of Road Transport & Highways (MoRTH)',
      url: 'https://parivahan.gov.in/',
      purpose: 'Learner License, Permanent DL, RC Renewal & Challan Services',
      complianceNotice: 'Driving skill test & Aadhaar contactless e-KYC are governed strictly by State RTO rules on parivahan.gov.in.',
      complianceNoticeHi: 'ड्राइविंग लाइसेंस टेस्ट व RTO अनुमोदन केवल parivahan.gov.in पोर्टल व क्षेत्रीय RTO के अधीन हैं।',
    },
  },
  {
    match: ['ration', 'nfsa'],
    entry: {
      portalName: 'NFSA National Food Security Portal',
      authority: 'Department of Food & Public Distribution',
      url: 'https://nfsa.gov.in/',
      purpose: 'New Ration Card, Member Addition & ONORC Portability',
      complianceNotice: 'Ration entitlement approval rests solely with the District Supply Officer / State Food Department.',
      complianceNoticeHi: 'राशन कार्ड स्वीकृति व यूनिट जोड़ने का अधिकार संबंधित राज्य खाद्य विभाग एवं जिला आपूर्ति अधिकारी के पास है।',
    },
  },
  {
    match: ['gst'],
    entry: {
      portalName: 'GST Common Portal',
      authority: 'Goods and Services Tax Network (GSTN)',
      url: 'https://www.gst.gov.in/',
      purpose: 'GSTIN New Registration (REG-01), GSTR-1/3B Filing & LUT',
      complianceNotice: 'Taxpayer OTP / DSC / EVC authorization occurs directly on gst.gov.in without credential storage.',
      complianceNoticeHi: 'GST पंजीकरण व रिटर्न दाखिल करने हेतु करदाता का OTP/DSC सत्यापन सीधे gst.gov.in पर होता है।',
    },
  },
  {
    match: ['msme', 'udyam'],
    entry: {
      portalName: 'Udyam Registration Portal',
      authority: 'Ministry of MSME, Govt. of India',
      url: 'https://udyamregistration.gov.in/',
      purpose: 'Zero-Fee Statutory MSME Udyam Certificate Generation',
      complianceNotice: 'Udyam portal itself charges zero government fee; ADCS fee covers assisted NIC code classification & documentation.',
      complianceNoticeHi: 'उद्यम पोर्टल पर सरकारी शुल्क शून्य है; ADCS शुल्क केवल सही NIC कोड चयन और दस्तावेज़ सहायता हेतु है।',
    },
  },
  {
    match: ['itr', 'tax', 'income-tax'],
    entry: {
      portalName: 'Income Tax e-Filing Portal',
      authority: 'Income Tax Department, CBDT',
      url: 'https://www.incometax.gov.in/',
      purpose: 'ITR Filing, Form 26AS / AIS Reconciliation & Aadhaar-PAN Linking',
      complianceNotice: 'Final ITR e-Verification (Aadhaar OTP / NetBanking EVC) must be authorized directly by the assessee on incometax.gov.in.',
      complianceNoticeHi: 'ITR दाखिल करने के बाद अंतिम e-Verification करदाता द्वारा स्वयं incometax.gov.in पर OTP/EVC से किया जाता है।',
    },
  },
  {
    match: ['travel', 'train', 'irctc', 'flight', 'bus'],
    entry: {
      portalName: 'IRCTC Next Generation e-Ticketing / Authorized GDS',
      authority: 'Indian Railways (IRCTC) / IATA Authorized Agents',
      url: 'https://www.irctc.co.in/',
      purpose: 'Train Reservation, PNR Status & Travel Assistance',
      complianceNotice: 'Authorized agent booking only; user personal IRCTC credentials or security CAPTCHAs are never automated or bypassed.',
      complianceNoticeHi: 'टिकट बुकिंग केवल अधिकृत एजेंट या यात्री के स्वयं के आधिकारिक पोर्टल लॉगिन के माध्यम से ही की जाती है।',
    },
  },
];

export function resolveOfficialPortal(slugOrTitle: string, state?: string): OfficialPortalEntry | null {
  const key = (slugOrTitle || '').toLowerCase();
  const found = OFFICIAL_PORTAL_REGISTRY.find(item => item.match.some(m => key.includes(m)));
  if (!found) return null;

  const entry = { ...found.entry };
  if (entry.statePortals && state && entry.statePortals[state]) {
    const st = entry.statePortals[state];
    entry.portalName = `${st.name} (${state})`;
    entry.url = st.url;
  }
  return entry;
}
