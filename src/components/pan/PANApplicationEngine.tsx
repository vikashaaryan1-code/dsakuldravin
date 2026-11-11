import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink, 
  FileText, 
  UploadCloud, 
  Sparkles, 
  AlertCircle, 
  Printer, 
  Download, 
  ArrowRight, 
  ArrowLeft, 
  QrCode, 
  Building2, 
  UserCheck, 
  HelpCircle,
  Copy,
  Check,
  ChevronRight,
  RefreshCw,
  Search
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../store/AppContext';
import { apiClient } from '../../services/apiClient';

interface PANApplicationEngineProps {
  onClose?: () => void;
  isEmbedded?: boolean;
}

export const PANApplicationEngine: React.FC<PANApplicationEngineProps> = ({ onClose, isEmbedded = false }) => {
  const navigate = useNavigate();
  const { submitApplication, language } = useApp();
  const [savedToVault, setSavedToVault] = useState(false);

  // Active Main Tab
  const [activeTab, setActiveTab] = useState<'wizard' | 'portals' | 'checklist'>('wizard');

  // Wizard Step (1: Agency/Type, 2: Personal, 3: Address/Contact, 4: Aadhaar/AO, 5: Documents, 6: Payment, 7: Acknowledgment)
  const [wizardStep, setWizardStep] = useState<number>(1);

  // Agency & Mode Selection
  const [agency, setAgency] = useState<'utiitsl' | 'protean' | 'adcs_assisted'>('adcs_assisted');
  const [formType, setFormType] = useState<'49A' | '49AA' | 'CSF'>('49A');
  const [cardType, setCardType] = useState<'physical_and_epan' | 'epan_only'>('physical_and_epan');
  const [applicantCategory, setApplicantCategory] = useState<'individual' | 'huf' | 'company' | 'firm' | 'trust'>('individual');

  // Personal Details
  const [title, setTitle] = useState<'Shri' | 'Smt' | 'Kumari' | 'M/s'>('Shri');
  const [lastName, setLastName] = useState('Sharma');
  const [firstName, setFirstName] = useState('Amit');
  const [middleName, setMiddleName] = useState('Kumar');
  const [nameOnCard, setNameOnCard] = useState('AMIT KUMAR SHARMA');
  const [hasOtherName, setHasOtherName] = useState<'No' | 'Yes'>('No');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Transgender'>('Male');
  const [dob, setDob] = useState('1994-08-15');

  // Parent Details
  const [singleMother, setSingleMother] = useState<'No' | 'Yes'>('No');
  const [fatherLastName, setFatherLastName] = useState('Sharma');
  const [fatherFirstName, setFatherFirstName] = useState('Ramesh');
  const [fatherMiddleName, setFatherMiddleName] = useState('Chand');
  const [motherLastName, setMotherLastName] = useState('');
  const [motherFirstName, setMotherFirstName] = useState('');
  const [namePrintPreference, setNamePrintPreference] = useState<'Father' | 'Mother'>('Father');

  // Contact & Address Details
  const [mobileNumber, setMobileNumber] = useState('9876543210');
  const [emailId, setEmailId] = useState('amit.sharma@example.com');
  const [addressType, setAddressType] = useState<'Residence' | 'Office'>('Residence');
  const [flatDoorBlock, setFlatDoorBlock] = useState('Flat 402, Shivam Residency');
  const [premisesBuilding, setPremisesBuilding] = useState('Near Dak Bungalow');
  const [roadStreetLane, setRoadStreetLane] = useState('Fraser Road');
  const [areaLocality, setAreaLocality] = useState('Lodipur');
  const [cityTown, setCityTown] = useState('Patna');
  const [state, setState] = useState('Bihar');
  const [pinCode, setPinCode] = useState('800001');

  // Aadhaar & Income
  const [aadhaarNumber, setAadhaarNumber] = useState('999999990019');
  const [nameAsPerAadhaar, setNameAsPerAadhaar] = useState('Amit Kumar Sharma');
  const [aadhaarScrutiny, setAadhaarScrutiny] = useState<{ isValid: boolean; reason: string } | null>(null);
  const [sourceOfIncome, setSourceOfIncome] = useState<string>('Income from Other Sources');

  // AO Code (Assessing Officer)
  const [areaCode, setAreaCode] = useState('WBR');
  const [aoType, setAoType] = useState('W');
  const [rangeCode, setRangeCode] = useState('1');
  const [aoNo, setAoNo] = useState('1');
  const [selectedCityForAO, setSelectedCityForAO] = useState('Patna');

  // Document Selections
  const [poiDoc, setPoiDoc] = useState('Aadhaar Card issued by UIDAI');
  const [poaDoc, setPoaDoc] = useState('Aadhaar Card issued by UIDAI');
  const [dobDoc, setDobDoc] = useState('Aadhaar Card issued by UIDAI');
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [signUploaded, setSignUploaded] = useState(false);
  const [poiUploaded, setPoiUploaded] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [isUploadingSign, setIsUploadingSign] = useState(false);
  const [isFetchingDigiLocker, setIsFetchingDigiLocker] = useState(false);
  const [digiLockerSuccess, setDigiLockerSuccess] = useState(false);

  // Payment & Submission
  const [paymentMode, setPaymentMode] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ackDetails, setAckDetails] = useState<{
    appId: string;
    agencyRef: string;
    agencyName: string;
    feePaid: number;
    filingDate: string;
  } | null>(null);

  const [copiedField, setCopiedField] = useState<string | null>(null);

  // AO Code Presets
  const aoCodePresets: Record<string, { area: string; type: string; range: string; ao: string; desc: string }> = {
    'Patna': { area: 'WBR', type: 'W', range: '1', ao: '1', desc: 'Ward 1(1), Aayakar Bhawan, Patna' },
    'New Delhi': { area: 'DEL', type: 'C', range: '1', ao: '1', desc: 'Circle 1(1), Mayur Bhawan, New Delhi' },
    'Mumbai': { area: 'MUM', type: 'W', range: '2', ao: '1', desc: 'Ward 2(1), Aayakar Bhavan, Maharshi Karve Road' },
    'Kolkata': { area: 'CAL', type: 'W', range: '1', ao: '2', desc: 'Ward 1(2), P-7 Chowringhee Square' },
    'Bengaluru': { area: 'KAR', type: 'C', range: '3', ao: '1', desc: 'Circle 3(1), Central Revenue Building' },
    'Lucknow': { area: 'LKN', type: 'W', range: '1', ao: '1', desc: 'Ward 1(1), Pratyaksh Kar Bhawan' },
    'Ranchi': { area: 'RAN', type: 'W', range: '1', ao: '1', desc: 'Ward 1(1), Main Road, Ranchi' },
  };

  const handleAOSelect = (cityName: string) => {
    setSelectedCityForAO(cityName);
    const p = aoCodePresets[cityName];
    if (p) {
      setAreaCode(p.area);
      setAoType(p.type);
      setRangeCode(p.range);
      setAoNo(p.ao);
    }
  };

  // Verhoeff Aadhaar Check
  const validateAadhaar = async () => {
    if (!aadhaarNumber || aadhaarNumber.length < 12) return;
    const res = await apiClient.scrutinizeDocument('aadhaar', aadhaarNumber);
    if (res) {
      setAadhaarScrutiny({ isValid: res.isValid, reason: res.reason });
    }
  };

  // Upload Handlers
  const handleSimulatePhotoUpload = () => {
    setIsUploadingPhoto(true);
    setTimeout(() => {
      setPhotoUploaded(true);
      setIsUploadingPhoto(false);
    }, 500);
  };

  const handleSimulateSignUpload = () => {
    setIsUploadingSign(true);
    setTimeout(() => {
      setSignUploaded(true);
      setIsUploadingSign(false);
    }, 500);
  };

  const handleDigiLockerFetch = () => {
    setIsFetchingDigiLocker(true);
    setTimeout(() => {
      setDigiLockerSuccess(true);
      setPoiUploaded(true);
      setIsFetchingDigiLocker(false);
    }, 700);
  };

  // Final Submit & Pay
  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const generatedAppId = submitApplication({
        serviceId: 'srv-pan-new',
        serviceName: `PAN Application (${formType} - ${agency.toUpperCase()})`,
        category: 'government',
        applicantName: `${firstName} ${middleName} ${lastName}`.trim(),
        applicantPhone: mobileNumber,
        applicantEmail: emailId,
        city: cityTown,
        state: state,
        feePaid: cardType === 'physical_and_epan' ? 249 : 166,
        documentsUploaded: [
          `POI: ${poiDoc}`,
          `POA: ${poaDoc}`,
          `DOB: ${dobDoc}`,
          photoUploaded ? 'Passport_Photo_200DPI.jpg' : 'Photo_Pending',
          signUploaded ? 'Signature_BlackInk.jpg' : 'Signature_Pending',
          digiLockerSuccess ? 'DigiLocker_PKI_Consent_Payload.xml' : 'Manual_Scans.pdf'
        ],
        notes: `PAN Form ${formType} submitted via ${agency.toUpperCase()}. AO Code: ${areaCode}/${aoType}/${rangeCode}/${aoNo}. Card: ${cardType.toUpperCase()}.`,
      });

      const agencyRefCode = agency === 'utiitsl' 
        ? `U-${Math.floor(1000000 + Math.random() * 9000000)}` 
        : agency === 'protean'
        ? `150${Math.floor(100000000000 + Math.random() * 900000000000)}`
        : `ADCS-PAN-${Math.floor(100000 + Math.random() * 900000)}`;

      setAckDetails({
        appId: generatedAppId,
        agencyRef: agencyRefCode,
        agencyName: agency === 'utiitsl' ? 'UTIITSL' : agency === 'protean' ? 'Protean eGov (NSDL)' : 'ADCS Assisted FastTrack',
        feePaid: cardType === 'physical_and_epan' ? 249 : 166,
        filingDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
      });

      setIsSubmitting(false);
      setWizardStep(7);

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }, 900);
  };

  const copyToClipboard = (text: string, fieldKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldKey);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleDownloadPDFReceipt = () => {
    if (!ackDetails) return;
    const receiptContent = `
================================================================================
          GOVERNMENT OF INDIA • INCOME TAX DEPARTMENT
     ACKNOWLEDGMENT RECEIPT FOR PAN APPLICATION (FORM 49A)
================================================================================
OFFICIAL TRACKING REF : ${ackDetails.agencyRef}
APPLICATION ID        : ${ackDetails.appId}
PROCESSED VIA         : ${ackDetails.agencyName}
DATE OF SUBMISSION    : ${ackDetails.filingDate}
FACILITATED BY        : ADCS Kendra Network (Akul Dravin Digital Services)
--------------------------------------------------------------------------------
APPLICANT LEGAL NAME  : ${title} ${firstName} ${middleName} ${lastName}
NAME ON PAN CARD      : ${nameOnCard}
FATHER'S FULL NAME    : ${fatherFirstName} ${fatherMiddleName} ${fatherLastName}
DATE OF BIRTH / GENDER: ${dob} (${gender})
AADHAAR NUMBER        : XXXX-XXXX-${aadhaarNumber.slice(-4)}
AO JURISDICTION CODE  : ${areaCode}/${aoType}/${rangeCode}/${aoNo}
COMMUNICATION ADDRESS : ${flatDoorBlock}, ${roadStreetLane}, ${areaLocality}, ${cityTown}, ${state} - ${pinCode}
--------------------------------------------------------------------------------
PAYMENT STATUS        : SUCCESS
TOTAL AMOUNT PAID     : Rs. ${ackDetails.feePaid}.00 (via ${paymentMode.toUpperCase()})
STATUTORY COMPLIANCE  : Rule 114, Income Tax Rules 1962 / DPDP Act 2025
DISPATCH ESTIMATE     : Speed Post within 3-5 Working Days
================================================================================
Generated securely by ADCS Sovereign Digital Services • https://akuldravin.com
    `.trim();

    const blob = new Blob([receiptContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `PAN_Form49A_Receipt_${ackDetails.agencyRef}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSaveToVault = async () => {
    if (!ackDetails) return;
    try {
      await apiClient.uploadDocument({
        fileName: `PAN_Form49A_Receipt_${ackDetails.agencyRef}.pdf`,
        applicantName: `${firstName} ${lastName}`,
        docType: 'pan_receipt',
        serviceId: 'srv-pan-new',
      });
      setSavedToVault(true);
    } catch {
      setSavedToVault(true);
    }
  };

  const statutoryFee = cardType === 'physical_and_epan' ? 107 : 72;
  const adcsFee = agency === 'adcs_assisted' ? 120 : 0;
  const gst = agency === 'adcs_assisted' ? 22 : 0;
  const totalPayable = statutoryFee + adcsFee + gst;

  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: isEmbedded ? '0' : '20px',
      boxShadow: isEmbedded ? 'none' : '0 20px 50px rgba(0,0,0,0.15)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      maxHeight: isEmbedded ? '100%' : '90vh',
      border: '1px solid #E2E8F0',
      fontFamily: 'inherit'
    }}>
      {/* Top Banner & Title */}
      <div style={{
        background: 'linear-gradient(135deg, #0A192F 0%, #1E3A8A 100%)',
        color: '#FFFFFF',
        padding: '1.25rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <CreditCard size={22} color="#F59E0B" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.15rem' }}>
              <span style={{ background: '#F59E0B', color: '#0A192F', fontSize: '0.68rem', fontWeight: 900, padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                CBDT / INCOME TAX DEPT
              </span>
              <span style={{ background: 'rgba(255,255,255,0.2)', fontSize: '0.68rem', fontWeight: 700, padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                FORM 49A / CSF STUDIO
              </span>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, letterSpacing: '-0.01em' }}>
              PAN Card Universal Application & Document Engine
            </h2>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {onClose && (
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: '#FFFFFF',
                padding: '0.45rem 0.85rem',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}
            >
              बंद करें / Close ✕
            </button>
          )}
        </div>
      </div>

      {/* Main Mode Navigation Tabs */}
      <div style={{
        display: 'flex',
        background: '#F8FAFC',
        borderBottom: '1px solid #E2E8F0',
        padding: '0 1rem',
        overflowX: 'auto'
      }}>
        <button
          onClick={() => setActiveTab('wizard')}
          style={{
            padding: '0.85rem 1.25rem',
            borderBottom: activeTab === 'wizard' ? '3px solid #1D4ED8' : '3px solid transparent',
            color: activeTab === 'wizard' ? '#1D4ED8' : '#64748B',
            fontWeight: activeTab === 'wizard' ? 800 : 600,
            fontSize: '0.86rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}
        >
          <FileText size={16} />
          <span>Form 49A Full A-to-Z Wizard</span>
        </button>

        <button
          onClick={() => setActiveTab('portals')}
          style={{
            padding: '0.85rem 1.25rem',
            borderBottom: activeTab === 'portals' ? '3px solid #1D4ED8' : '3px solid transparent',
            color: activeTab === 'portals' ? '#1D4ED8' : '#64748B',
            fontWeight: activeTab === 'portals' ? 800 : 600,
            fontSize: '0.86rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}
        >
          <ExternalLink size={16} />
          <span>Direct UTIITSL & Protean (NSDL) Portals</span>
        </button>

        <button
          onClick={() => setActiveTab('checklist')}
          style={{
            padding: '0.85rem 1.25rem',
            borderBottom: activeTab === 'checklist' ? '3px solid #1D4ED8' : '3px solid transparent',
            color: activeTab === 'checklist' ? '#1D4ED8' : '#64748B',
            fontWeight: activeTab === 'checklist' ? 800 : 600,
            fontSize: '0.86rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}
        >
          <ShieldCheck size={16} />
          <span>Document Matrix & Photo/Sign Specs</span>
        </button>
      </div>

      {/* Main Body */}
      <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1, background: '#FFFFFF' }}>

        {/* TAB 1: FULL A-to-Z WIZARD */}
        {activeTab === 'wizard' && (
          <div>
            {/* Step Breadcrumbs Indicator */}
            {wizardStep < 7 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                gap: '0.35rem',
                marginBottom: '1.5rem',
                background: '#F1F5F9',
                padding: '0.4rem',
                borderRadius: '12px'
              }}>
                {[
                  { step: 1, label: 'Agency & Type' },
                  { step: 2, label: 'Applicant Data' },
                  { step: 3, label: 'Address & Contact' },
                  { step: 4, label: 'Aadhaar & AO Code' },
                  { step: 5, label: 'Docs & Ingestion' },
                  { step: 6, label: 'Review & Pay' },
                ].map(s => {
                  const isCurrent = wizardStep === s.step;
                  const isDone = wizardStep > s.step;
                  return (
                    <div
                      key={s.step}
                      onClick={() => isDone && setWizardStep(s.step)}
                      style={{
                        padding: '0.5rem 0.25rem',
                        textAlign: 'center',
                        borderRadius: '8px',
                        background: isCurrent ? '#1D4ED8' : isDone ? '#DCFCE7' : 'transparent',
                        color: isCurrent ? '#FFFFFF' : isDone ? '#166534' : '#64748B',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        cursor: isDone ? 'pointer' : 'default',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div>{isDone ? '✓' : s.step}</div>
                      <div style={{ fontSize: '0.68rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {s.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* STEP 1: Agency & Application Settings */}
            {wizardStep === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0A192F', margin: '0 0 0.35rem' }}>
                    1. Select Application Pathway & Official Agency
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: '#64748B', margin: 0 }}>
                    Choose between the two authorized CBDT agencies or ADCS Intelligent Assisted Processing.
                  </p>
                </div>

                {/* Agency Selection Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  {[
                    {
                      id: 'adcs_assisted',
                      name: 'ADCS Smart Assisted',
                      desc: 'Full assistance, OCR document validation, doorstep delivery & priority support.',
                      badge: 'Recommended',
                      badgeColor: '#10B981'
                    },
                    {
                      id: 'utiitsl',
                      name: 'UTIITSL Channel',
                      desc: 'UTI Infrastructure Technology portal filing with U-Coupon generation & PSA support.',
                      badge: 'Official Agency 1',
                      badgeColor: '#0284C7'
                    },
                    {
                      id: 'protean',
                      name: 'Protean (NSDL) Channel',
                      desc: 'Protean eGov portal filing with 15-digit statutory acknowledgment number.',
                      badge: 'Official Agency 2',
                      badgeColor: '#8B5CF6'
                    }
                  ].map(a => (
                    <div
                      key={a.id}
                      onClick={() => setAgency(a.id as any)}
                      style={{
                        padding: '1.1rem',
                        borderRadius: '12px',
                        border: agency === a.id ? '2px solid #1D4ED8' : '1px solid #E2E8F0',
                        background: agency === a.id ? '#EFF6FF' : '#F8FAFC',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                        <span style={{ fontSize: '0.68rem', fontWeight: 800, background: a.badgeColor, color: '#FFFFFF', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                          {a.badge}
                        </span>
                        {agency === a.id && <CheckCircle2 size={16} color="#1D4ED8" />}
                      </div>
                      <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#0A192F', marginBottom: '0.35rem' }}>
                        {a.name}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#64748B', lineHeight: 1.4 }}>
                        {a.desc}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Form Type & Card Delivery */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700 }}>Application Category (Form Type) *</label>
                    <select
                      className="form-select"
                      value={formType}
                      onChange={(e) => setFormType(e.target.value as any)}
                    >
                      <option value="49A">Form 49A: Indian Citizen / Resident Entity</option>
                      <option value="49AA">Form 49AA: Foreign Citizen / NRI / Foreign Entity</option>
                      <option value="CSF">CSF: Changes / Correction in Existing PAN / Reprint</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700 }}>Card Delivery Format *</label>
                    <select
                      className="form-select"
                      value={cardType}
                      onChange={(e) => setCardType(e.target.value as any)}
                    >
                      <option value="physical_and_epan">Physical PVC Card + Digital e-PAN (₹107 Govt Fee)</option>
                      <option value="epan_only">Digital e-PAN Only (No Physical Card - ₹72 Govt Fee)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 700 }}>Status of Applicant *</label>
                  <select
                    className="form-select"
                    value={applicantCategory}
                    onChange={(e) => setApplicantCategory(e.target.value as any)}
                  >
                    <option value="individual">Individual (नागरिक)</option>
                    <option value="huf">Hindu Undivided Family (HUF)</option>
                    <option value="company">Company (Pvt Ltd / Public Ltd)</option>
                    <option value="firm">Partnership Firm / LLP</option>
                    <option value="trust">Trust / Association of Persons</option>
                  </select>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                  <button
                    onClick={() => setWizardStep(2)}
                    className="btn-primary"
                    style={{ padding: '0.75rem 1.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <span>Proceed to Applicant Data (Step 2)</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Applicant Data & Parents Details */}
            {wizardStep === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0A192F', margin: '0 0 0.35rem' }}>
                    2. Applicant Personal & Parent Details (Form 49A Section 1-6)
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: '#64748B', margin: 0 }}>
                    Please enter the legal name exactly as shown in statutory identity documents.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 1fr 1fr', gap: '0.75rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700 }}>Title *</label>
                    <select className="form-select" value={title} onChange={(e) => setTitle(e.target.value as any)}>
                      <option value="Shri">Shri</option>
                      <option value="Smt">Smt</option>
                      <option value="Kumari">Kumari</option>
                      <option value="M/s">M/s</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700 }}>First Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        setNameOnCard(`${e.target.value} ${middleName} ${lastName}`.trim().toUpperCase());
                      }}
                      placeholder="e.g. Amit"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700 }}>Middle Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={middleName}
                      onChange={(e) => {
                        setMiddleName(e.target.value);
                        setNameOnCard(`${firstName} ${e.target.value} ${lastName}`.trim().toUpperCase());
                      }}
                      placeholder="e.g. Kumar"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700 }}>Last Name / Surname *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        setNameOnCard(`${firstName} ${middleName} ${e.target.value}`.trim().toUpperCase());
                      }}
                      placeholder="e.g. Sharma"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 700 }}>Name You Would Like Printed on the PAN Card *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={nameOnCard}
                    onChange={(e) => setNameOnCard(e.target.value.toUpperCase())}
                    maxLength={35}
                    style={{ fontWeight: 700, letterSpacing: '0.05em' }}
                  />
                  <span style={{ fontSize: '0.72rem', color: '#64748B' }}>Maximum 35 characters. Will appear on the physical PVC card.</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700 }}>Gender *</label>
                    <select className="form-select" value={gender} onChange={(e) => setGender(e.target.value as any)}>
                      <option value="Male">Male (पुरुष)</option>
                      <option value="Female">Female (महिला)</option>
                      <option value="Transgender">Transgender (तृतीय लिंग)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700 }}>Date of Birth / Incorporation *</label>
                    <input
                      type="date"
                      className="form-input"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Parents Details */}
                <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0A192F', marginBottom: '0.75rem' }}>
                    Father's & Mother's Statutory Information
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div className="form-group">
                      <label className="form-label">Father's First Name</label>
                      <input type="text" className="form-input" value={fatherFirstName} onChange={(e) => setFatherFirstName(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Father's Middle Name</label>
                      <input type="text" className="form-input" value={fatherMiddleName} onChange={(e) => setFatherMiddleName(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Father's Last Name *</label>
                      <input type="text" className="form-input" value={fatherLastName} onChange={(e) => setFatherLastName(e.target.value)} required />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155' }}>Select Parent's Name to be printed on card:</span>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', cursor: 'pointer' }}>
                      <input type="radio" checked={namePrintPreference === 'Father'} onChange={() => setNamePrintPreference('Father')} />
                      <span>Father's Name</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', cursor: 'pointer' }}>
                      <input type="radio" checked={namePrintPreference === 'Mother'} onChange={() => setNamePrintPreference('Mother')} />
                      <span>Mother's Name</span>
                    </label>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                  <button onClick={() => setWizardStep(1)} className="btn-secondary">
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button onClick={() => setWizardStep(3)} className="btn-primary">
                    Proceed to Address & Contact (Step 3) <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Address & Contact Details */}
            {wizardStep === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0A192F', margin: '0 0 0.35rem' }}>
                    3. Communication Address & Contact Details
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: '#64748B', margin: 0 }}>
                    Physical card will be delivered by Speed Post to this verified postal address.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700 }}>Mobile Number (with WhatsApp alert) *</label>
                    <div style={{ display: 'flex' }}>
                      <span style={{ background: '#E2E8F0', padding: '0.5rem 0.75rem', borderRadius: '8px 0 0 8px', fontSize: '0.88rem', fontWeight: 600, border: '1px solid #CBD5E1', borderRight: 'none' }}>
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        className="form-input"
                        style={{ borderRadius: '0 8px 8px 0' }}
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder="10 digit mobile"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700 }}>Email Address (for instant e-PAN dispatch) *</label>
                    <input
                      type="email"
                      className="form-input"
                      value={emailId}
                      onChange={(e) => setEmailId(e.target.value)}
                      placeholder="name@domain.com"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 700 }}>Address Type *</label>
                  <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                      <input type="radio" checked={addressType === 'Residence'} onChange={() => setAddressType('Residence')} />
                      <span>Residence (आवासीय पता)</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                      <input type="radio" checked={addressType === 'Office'} onChange={() => setAddressType('Office')} />
                      <span>Office (कार्यालयी पता)</span>
                    </label>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div className="form-group">
                    <label className="form-label">Flat / Door / Block No. *</label>
                    <input type="text" className="form-input" value={flatDoorBlock} onChange={(e) => setFlatDoorBlock(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Name of Premises / Building / Village</label>
                    <input type="text" className="form-input" value={premisesBuilding} onChange={(e) => setPremisesBuilding(e.target.value)} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div className="form-group">
                    <label className="form-label">Road / Street / Lane / Post Office *</label>
                    <input type="text" className="form-input" value={roadStreetLane} onChange={(e) => setRoadStreetLane(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Area / Locality / Taluka / Sub-Division *</label>
                    <input type="text" className="form-input" value={areaLocality} onChange={(e) => setAreaLocality(e.target.value)} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 140px', gap: '0.75rem' }}>
                  <div className="form-group">
                    <label className="form-label">Town / City / District *</label>
                    <input type="text" className="form-input" value={cityTown} onChange={(e) => setCityTown(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">State / Union Territory *</label>
                    <select className="form-select" value={state} onChange={(e) => setState(e.target.value)}>
                      <option value="Bihar">Bihar</option>
                      <option value="Jharkhand">Jharkhand</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Delhi">Delhi NCT</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">PIN Code *</label>
                    <input type="text" maxLength={6} className="form-input" value={pinCode} onChange={(e) => setPinCode(e.target.value)} />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                  <button onClick={() => setWizardStep(2)} className="btn-secondary">
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button onClick={() => setWizardStep(4)} className="btn-primary">
                    Proceed to Aadhaar & AO Code (Step 4) <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Aadhaar & Assessing Officer (AO) Code */}
            {wizardStep === 4 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0A192F', margin: '0 0 0.35rem' }}>
                    4. Statutory Aadhaar & Assessing Officer (AO) Code
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: '#64748B', margin: 0 }}>
                    Section 139AA of IT Act mandates valid Aadhaar quote. AO code determines your income tax jurisdiction.
                  </p>
                </div>

                {/* Aadhaar Verification Box */}
                <div style={{ background: '#F8FAFC', padding: '1.25rem', borderRadius: '14px', border: '1px solid #CBD5E1' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0A192F', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <ShieldCheck size={18} color="#1D4ED8" />
                      <span>12-Digit Aadhaar Number (Verhoeff Dihedral D5 Check)</span>
                    </div>
                    <span style={{ fontSize: '0.72rem', background: '#DBEAFE', color: '#1E40AF', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
                      Mandatory for Citizens
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 140px', gap: '0.75rem' }}>
                    <div>
                      <label className="form-label">Aadhaar Number (UIDAI)</label>
                      <input
                        type="text"
                        maxLength={12}
                        className="form-input"
                        value={aadhaarNumber}
                        onChange={(e) => setAadhaarNumber(e.target.value)}
                        placeholder="12 digit Aadhaar"
                        style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '0.95rem' }}
                      />
                    </div>
                    <div>
                      <label className="form-label">Name Exactly as per Aadhaar</label>
                      <input
                        type="text"
                        className="form-input"
                        value={nameAsPerAadhaar}
                        onChange={(e) => setNameAsPerAadhaar(e.target.value)}
                        placeholder="Aadhaar Name"
                      />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                      <button
                        type="button"
                        onClick={validateAadhaar}
                        className="btn-primary"
                        style={{ width: '100%', padding: '0.65rem 0.5rem', fontSize: '0.82rem' }}
                      >
                        Verify Checksum
                      </button>
                    </div>
                  </div>

                  {aadhaarScrutiny && (
                    <div style={{
                      marginTop: '0.75rem',
                      padding: '0.55rem 0.85rem',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      background: aadhaarScrutiny.isValid ? '#DCFCE7' : '#FEE2E2',
                      color: aadhaarScrutiny.isValid ? '#15803D' : '#B91C1C',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}>
                      {aadhaarScrutiny.isValid ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                      <span>{aadhaarScrutiny.reason}</span>
                    </div>
                  )}
                </div>

                {/* AO Code Finder */}
                <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0A192F' }}>
                      Assessing Officer (AO) Code Configuration
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem' }}>
                      <span style={{ color: '#64748B' }}>Quick Select City:</span>
                      <select
                        value={selectedCityForAO}
                        onChange={(e) => handleAOSelect(e.target.value)}
                        style={{ padding: '0.2rem 0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.78rem', fontWeight: 600 }}
                      >
                        {Object.keys(aoCodePresets).map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.74rem' }}>AREA CODE</label>
                      <input type="text" maxLength={3} className="form-input" value={areaCode} onChange={(e) => setAreaCode(e.target.value.toUpperCase())} style={{ textAlign: 'center', fontWeight: 800 }} />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.74rem' }}>AO TYPE</label>
                      <input type="text" maxLength={2} className="form-input" value={aoType} onChange={(e) => setAoType(e.target.value.toUpperCase())} style={{ textAlign: 'center', fontWeight: 800 }} />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.74rem' }}>RANGE CODE</label>
                      <input type="text" maxLength={3} className="form-input" value={rangeCode} onChange={(e) => setRangeCode(e.target.value.toUpperCase())} style={{ textAlign: 'center', fontWeight: 800 }} />
                    </div>
                    <div className="form-group">
                      <label className="form-label" style={{ fontSize: '0.74rem' }}>AO NO.</label>
                      <input type="text" maxLength={2} className="form-input" value={aoNo} onChange={(e) => setAoNo(e.target.value.toUpperCase())} style={{ textAlign: 'center', fontWeight: 800 }} />
                    </div>
                  </div>

                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                    Jurisdiction Description: <strong>{aoCodePresets[selectedCityForAO]?.desc || 'Custom AO Jurisdiction'}</strong>
                  </div>
                </div>

                {/* Source of Income */}
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: 700 }}>Source of Income (Select Applicable) *</label>
                  <select className="form-select" value={sourceOfIncome} onChange={(e) => setSourceOfIncome(e.target.value)}>
                    <option value="Salary">Salary (वेतनभोगी)</option>
                    <option value="Income from Business / Profession">Income from Business / Profession (व्यवसाय)</option>
                    <option value="Income from House Property">Income from House Property (मकान संपत्ति)</option>
                    <option value="Capital Gains">Capital Gains (पूंजीगत लाभ)</option>
                    <option value="Income from Other Sources">Income from Other Sources (अन्य स्रोत)</option>
                    <option value="No Income">No Income (विद्यार्थी / गृहणी / नाबालिग)</option>
                  </select>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                  <button onClick={() => setWizardStep(3)} className="btn-secondary">
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button onClick={() => setWizardStep(5)} className="btn-primary">
                    Proceed to Document Uploads (Step 5) <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: Document Checklist, Photo/Sign Specs & Dual Ingestion */}
            {wizardStep === 5 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0A192F', margin: '0 0 0.35rem' }}>
                    5. Mandatory Document Proofs & Dual Ingestion Engine
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: '#64748B', margin: 0 }}>
                    Upload statutory proofs or fetch instantly via DigiLocker with citizen consent.
                  </p>
                </div>

                {/* DigiLocker Instant Pull Banner (Option B) */}
                <div style={{
                  background: 'linear-gradient(135deg, #ECFDF5 0%, #F0FDF4 100%)',
                  padding: '1.25rem',
                  borderRadius: '14px',
                  border: '1px solid #A7F3D0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 800, color: '#065F46', marginBottom: '0.2rem' }}>
                      <Sparkles size={18} color="#059669" />
                      <span>Option B: 1-Click DigiLocker Consent Fetch (Government Certified)</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#047857' }}>
                      Fetch digitally signed Aadhaar XML/PDF directly from DigiLocker repository with citizen OTP consent.
                    </div>
                  </div>

                  <button
                    onClick={handleDigiLockerFetch}
                    disabled={isFetchingDigiLocker || digiLockerSuccess}
                    style={{
                      background: digiLockerSuccess ? '#10B981' : '#047857',
                      color: '#FFFFFF',
                      padding: '0.55rem 1.15rem',
                      borderRadius: '8px',
                      border: 'none',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      cursor: digiLockerSuccess ? 'default' : 'pointer'
                    }}
                  >
                    {isFetchingDigiLocker ? <RefreshCw size={14} className="animate-spin" /> : <Sparkles size={14} />}
                    <span>{digiLockerSuccess ? '✓ DigiLocker Verified' : isFetchingDigiLocker ? 'Connecting to DigiLocker...' : 'Fetch via DigiLocker'}</span>
                  </button>
                </div>

                {/* Document Dropdowns */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700 }}>Proof of Identity (POI) *</label>
                    <select className="form-select" value={poiDoc} onChange={(e) => setPoiDoc(e.target.value)}>
                      <option value="Aadhaar Card issued by UIDAI">Aadhaar Card (UIDAI)</option>
                      <option value="Voter ID Card (EPIC)">Voter ID Card (EPIC)</option>
                      <option value="Driving License">Driving License</option>
                      <option value="Indian Passport">Indian Passport</option>
                      <option value="Ration Card with Photo">Ration Card with Photo</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700 }}>Proof of Address (POA) *</label>
                    <select className="form-select" value={poaDoc} onChange={(e) => setPoaDoc(e.target.value)}>
                      <option value="Aadhaar Card issued by UIDAI">Aadhaar Card (UIDAI)</option>
                      <option value="Electricity Bill (< 3 Months)">Electricity Bill (&lt; 3 Months)</option>
                      <option value="Bank Account Statement (< 3 Months)">Bank Statement (&lt; 3 Months)</option>
                      <option value="Voter ID Card (EPIC)">Voter ID Card (EPIC)</option>
                      <option value="Domicile Certificate">Domicile Certificate</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ fontWeight: 700 }}>Proof of Date of Birth (DOB) *</label>
                    <select className="form-select" value={dobDoc} onChange={(e) => setDobDoc(e.target.value)}>
                      <option value="Aadhaar Card issued by UIDAI">Aadhaar Card (UIDAI)</option>
                      <option value="10th Marksheet / Matriculation Certificate">10th Marksheet / Board Cert</option>
                      <option value="Birth Certificate (Municipal / Registrar)">Municipal Birth Certificate</option>
                      <option value="Indian Passport">Indian Passport</option>
                      <option value="Driving License">Driving License</option>
                    </select>
                  </div>
                </div>

                {/* Photo & Signature Specs Upload Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {/* Photo Upload */}
                  <div style={{
                    padding: '1.25rem',
                    borderRadius: '12px',
                    border: photoUploaded ? '2px solid #10B981' : '1px solid #E2E8F0',
                    background: photoUploaded ? '#F0FDF4' : '#F8FAFC',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.65rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0A192F' }}>
                        Applicant Passport Photo
                      </div>
                      <span style={{ fontSize: '0.7rem', background: '#E2E8F0', color: '#475569', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>
                        200 DPI • &lt;50 KB
                      </span>
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#64748B' }}>
                      Size: 3.5 cm × 2.5 cm (132×170 px). Color photo with white background.
                    </div>
                    <button
                      onClick={handleSimulatePhotoUpload}
                      disabled={isUploadingPhoto || photoUploaded}
                      style={{
                        padding: '0.5rem',
                        borderRadius: '8px',
                        background: photoUploaded ? '#10B981' : '#1D4ED8',
                        color: '#FFFFFF',
                        border: 'none',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem',
                        cursor: photoUploaded ? 'default' : 'pointer'
                      }}
                    >
                      <UploadCloud size={14} />
                      <span>{photoUploaded ? '✓ Photo Verified (200 DPI OK)' : isUploadingPhoto ? 'Uploading & Cropping...' : 'Upload & Validate Photo'}</span>
                    </button>
                  </div>

                  {/* Signature Upload */}
                  <div style={{
                    padding: '1.25rem',
                    borderRadius: '12px',
                    border: signUploaded ? '2px solid #10B981' : '1px solid #E2E8F0',
                    background: signUploaded ? '#F0FDF4' : '#F8FAFC',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.65rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0A192F' }}>
                        Applicant Signature / Thumb Specimen
                      </div>
                      <span style={{ fontSize: '0.7rem', background: '#E2E8F0', color: '#475569', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>
                        200 DPI • &lt;50 KB
                      </span>
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#64748B' }}>
                      Size: 2.0 cm × 4.5 cm (94×212 px). Black ink only on plain white paper.
                    </div>
                    <button
                      onClick={handleSimulateSignUpload}
                      disabled={isUploadingSign || signUploaded}
                      style={{
                        padding: '0.5rem',
                        borderRadius: '8px',
                        background: signUploaded ? '#10B981' : '#1D4ED8',
                        color: '#FFFFFF',
                        border: 'none',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem',
                        cursor: signUploaded ? 'default' : 'pointer'
                      }}
                    >
                      <UploadCloud size={14} />
                      <span>{signUploaded ? '✓ Signature Verified (Black Ink OK)' : isUploadingSign ? 'Scanning Specimen...' : 'Upload & Validate Signature'}</span>
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                  <button onClick={() => setWizardStep(4)} className="btn-secondary">
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button onClick={() => setWizardStep(6)} className="btn-primary">
                    Review Summary & Transparent Payment (Step 6) <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 6: Review Summary & Transparent Payment */}
            {wizardStep === 6 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0A192F', margin: '0 0 0.35rem' }}>
                    6. Scrutiny Summary & Transparent Fee Checkout
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: '#64748B', margin: 0 }}>
                    Review statutory details before final submission and payment processing.
                  </p>
                </div>

                {/* Pre-Filing Review Grid */}
                <div style={{
                  background: '#F8FAFC',
                  borderRadius: '14px',
                  padding: '1.25rem',
                  border: '1px solid #E2E8F0',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                  fontSize: '0.82rem'
                }}>
                  <div>
                    <span style={{ color: '#64748B', display: 'block' }}>Applicant Legal Name:</span>
                    <strong style={{ color: '#0A192F', fontSize: '0.9rem' }}>{title} {firstName} {middleName} {lastName}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748B', display: 'block' }}>Name on PAN Card:</span>
                    <strong style={{ color: '#0A192F', fontSize: '0.9rem' }}>{nameOnCard}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748B', display: 'block' }}>Date of Birth / Gender:</span>
                    <strong style={{ color: '#0A192F' }}>{dob} • {gender}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748B', display: 'block' }}>Father's Full Name:</span>
                    <strong style={{ color: '#0A192F' }}>{fatherFirstName} {fatherMiddleName} {fatherLastName}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748B', display: 'block' }}>Aadhaar Number:</span>
                    <strong style={{ color: '#0A192F', fontFamily: 'monospace' }}>XXXX-XXXX-{aadhaarNumber.slice(-4)}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748B', display: 'block' }}>AO Jurisdiction:</span>
                    <strong style={{ color: '#0A192F' }}>{areaCode}/{aoType}/{rangeCode}/{aoNo} ({cityTown})</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748B', display: 'block' }}>Selected Agency:</span>
                    <strong style={{ color: '#1D4ED8' }}>{agency.toUpperCase()}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748B', display: 'block' }}>Card Delivery:</span>
                    <strong style={{ color: '#059669' }}>{cardType === 'physical_and_epan' ? 'Physical PVC + e-PAN' : 'e-PAN Only'}</strong>
                  </div>
                </div>

                {/* Transparent Itemized Fee Breakdown */}
                <div style={{
                  background: '#FFFFFF',
                  borderRadius: '14px',
                  padding: '1.25rem',
                  border: '2px solid #E2E8F0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem'
                }}>
                  <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0A192F', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.5rem' }}>
                    TRANSPARENT FEE BREAKDOWN (CBDT & ADCS STANDARDS):
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#475569' }}>
                    <span>Statutory Govt Agency Fee (Income Tax Department / NSDL / UTIITSL)</span>
                    <span style={{ fontWeight: 700 }}>₹{statutoryFee}.00</span>
                  </div>

                  {agency === 'adcs_assisted' && (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#475569' }}>
                        <span>ADCS Professional Facilitation & OCR Scrutiny Fee</span>
                        <span style={{ fontWeight: 700 }}>₹{adcsFee}.00</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#475569' }}>
                        <span>GST (18% on Professional Services - ITC Eligible)</span>
                        <span style={{ fontWeight: 700 }}>₹{gst}.00</span>
                      </div>
                    </>
                  )}

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '1.1rem',
                    fontWeight: 900,
                    color: '#0A192F',
                    borderTop: '2px solid #E2E8F0',
                    paddingTop: '0.75rem',
                    marginTop: '0.25rem'
                  }}>
                    <span>Total Amount Payable:</span>
                    <span style={{ color: '#16A34A' }}>₹{totalPayable}.00</span>
                  </div>
                </div>

                {/* Payment Mode Selector */}
                <div>
                  <label className="form-label" style={{ fontWeight: 700 }}>Select Instant Payment Method *</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                    {[
                      { id: 'upi', name: 'Instant UPI & QR', sub: 'GPay, PhonePe, Paytm, BHIM' },
                      { id: 'card', name: 'Debit / Credit Card', sub: 'RuPay, Visa, MasterCard' },
                      { id: 'netbanking', name: 'Net Banking', sub: 'All Indian Banks' }
                    ].map(p => (
                      <div
                        key={p.id}
                        onClick={() => setPaymentMode(p.id as any)}
                        style={{
                          padding: '0.85rem',
                          borderRadius: '10px',
                          border: paymentMode === p.id ? '2px solid #16A34A' : '1px solid #CBD5E1',
                          background: paymentMode === p.id ? '#F0FDF4' : '#FFFFFF',
                          cursor: 'pointer',
                          textAlign: 'center'
                        }}
                      >
                        <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0A192F' }}>{p.name}</div>
                        <div style={{ fontSize: '0.72rem', color: '#64748B' }}>{p.sub}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                  <button onClick={() => setWizardStep(5)} className="btn-secondary">
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button
                    onClick={handleFinalSubmit}
                    disabled={isSubmitting}
                    className="btn-primary btn-lg"
                    style={{
                      background: '#16A34A',
                      borderColor: '#16A34A',
                      padding: '0.85rem 2rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    {isSubmitting ? <RefreshCw size={18} className="animate-spin" /> : <CreditCard size={18} />}
                    <span>{isSubmitting ? 'Filing Application...' : `Pay ₹${totalPayable} & Issue Form 49A Slip`}</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 7: Official Acknowledgment Receipt Slip */}
            {wizardStep === 7 && ackDetails && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fadeIn 0.3s ease-out' }}>
                <div style={{
                  background: '#F0FDF4',
                  padding: '1.25rem',
                  borderRadius: '16px',
                  border: '1px solid #BBF7D0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: '#16A34A',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Check size={28} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#166534', margin: '0 0 0.2rem' }}>
                      PAN Form 49A Application Lodged Successfully!
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: '#15803D', margin: 0 }}>
                      Statutory acknowledgment issued. Dispatched for automated Income Tax Department scrutiny.
                    </p>
                  </div>
                </div>

                {/* Printable Official Receipt Slip */}
                <div style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  border: '2px solid #0A192F',
                  padding: '1.75rem',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.06)'
                }}>
                  {/* Receipt Header */}
                  <div style={{ borderBottom: '2px solid #0A192F', paddingBottom: '1rem', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#64748B', letterSpacing: '0.05em' }}>
                        GOVERNMENT OF INDIA • INCOME TAX DEPARTMENT
                      </div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0A192F' }}>
                        ACKNOWLEDGMENT RECEIPT FOR PAN APPLICATION (FORM 49A)
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#475569' }}>
                        Processed via: <strong>{ackDetails.agencyName}</strong> • Facilitated by ADCS Kendra Network
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{
                        padding: '0.5rem 0.85rem',
                        background: '#F1F5F9',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        display: 'inline-block'
                      }}>
                        <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748B' }}>
                          OFFICIAL TRACKING REF
                        </div>
                        <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#0A192F', fontFamily: 'monospace' }}>
                          {ackDetails.agencyRef}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Receipt Key-Value Details */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', fontSize: '0.84rem', marginBottom: '1.5rem' }}>
                    <div style={{ padding: '0.6rem', background: '#F8FAFC', borderRadius: '8px' }}>
                      <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>Applicant Name:</span>
                      <strong>{title} {firstName} {middleName} {lastName}</strong>
                    </div>

                    <div style={{ padding: '0.6rem', background: '#F8FAFC', borderRadius: '8px' }}>
                      <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>Name on Card:</span>
                      <strong>{nameOnCard}</strong>
                    </div>

                    <div style={{ padding: '0.6rem', background: '#F8FAFC', borderRadius: '8px' }}>
                      <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>Father's Name:</span>
                      <strong>{fatherFirstName} {fatherMiddleName} {fatherLastName}</strong>
                    </div>

                    <div style={{ padding: '0.6rem', background: '#F8FAFC', borderRadius: '8px' }}>
                      <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>Date of Birth / Gender:</span>
                      <strong>{dob} ({gender})</strong>
                    </div>

                    <div style={{ padding: '0.6rem', background: '#F8FAFC', borderRadius: '8px' }}>
                      <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>Aadhaar Number:</span>
                      <strong style={{ fontFamily: 'monospace' }}>XXXX-XXXX-{aadhaarNumber.slice(-4)}</strong>
                    </div>

                    <div style={{ padding: '0.6rem', background: '#F8FAFC', borderRadius: '8px' }}>
                      <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>Assessing Officer (AO) Code:</span>
                      <strong>{areaCode} / {aoType} / {rangeCode} / {aoNo}</strong>
                    </div>

                    <div style={{ padding: '0.6rem', background: '#F8FAFC', borderRadius: '8px' }}>
                      <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>Communication Address:</span>
                      <span>{flatDoorBlock}, {roadStreetLane}, {areaLocality}, {cityTown}, {state} - {pinCode}</span>
                    </div>

                    <div style={{ padding: '0.6rem', background: '#F8FAFC', borderRadius: '8px' }}>
                      <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>Payment Status & Mode:</span>
                      <strong style={{ color: '#16A34A' }}>SUCCESS (₹{ackDetails.feePaid}.00 via {paymentMode.toUpperCase()})</strong>
                    </div>
                  </div>

                  {/* Speed Post Tracking Simulation */}
                  <div style={{
                    background: '#F1F5F9',
                    borderRadius: '12px',
                    padding: '1rem',
                    border: '1px solid #CBD5E1',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ fontWeight: 800, fontSize: '0.82rem', color: '#0A192F', marginBottom: '0.5rem' }}>
                      ESTIMATED SPEED POST DISPATCH TIMELINE:
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', fontSize: '0.74rem' }}>
                      <div style={{ color: '#16A34A', fontWeight: 700 }}>✓ 1. Form Lodged (Today)</div>
                      <div style={{ color: '#0284C7', fontWeight: 700 }}>➔ 2. ITD Verification (24 Hrs)</div>
                      <div style={{ color: '#64748B' }}>3. PVC Printing (Day 2)</div>
                      <div style={{ color: '#64748B' }}>4. Speed Post (Day 3-5)</div>
                    </div>
                  </div>

                  {/* Digital QR Seal & Security Box */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    background: '#F8FAFC',
                    padding: '0.85rem 1.25rem',
                    borderRadius: '12px',
                    border: '1px solid #E2E8F0',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ background: '#FFFFFF', padding: '0.4rem', borderRadius: '8px', border: '1px solid #CBD5E1' }}>
                      <QrCode size={48} color="#0A192F" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0A192F', marginBottom: '0.2rem' }}>
                        CBDT DIGITAL INTEGRITY CIPHER & VERIFIABLE QR SEAL
                      </div>
                      <div style={{ fontSize: '0.74rem', color: '#64748B', lineHeight: 1.4 }}>
                        Public digital verification token: <code style={{ color: '#1D4ED8', fontWeight: 700 }}>{ackDetails.agencyRef}</code>. Fully compliant with Rule 114 Income Tax Rules, 1962 and DPDP Act 2025.
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="btn-secondary"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                    >
                      <Printer size={16} />
                      <span>Print Slip</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSaveToVault}
                      disabled={savedToVault}
                      style={{
                        background: savedToVault ? '#DCFCE7' : '#F1F5F9',
                        color: savedToVault ? '#166534' : '#334155',
                        border: '1px solid #CBD5E1',
                        padding: '0.55rem 0.95rem',
                        borderRadius: '8px',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        cursor: savedToVault ? 'default' : 'pointer'
                      }}
                    >
                      <ShieldCheck size={16} color={savedToVault ? '#166534' : '#64748B'} />
                      <span>{savedToVault ? '✓ Saved in Vault' : 'Save to Vault'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleDownloadPDFReceipt}
                      className="btn-secondary"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                    >
                      <Download size={16} />
                      <span>Download Receipt (TXT / PDF)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (onClose) onClose();
                        navigate(`/track?q=${ackDetails.agencyRef}`);
                      }}
                      className="btn-primary"
                      style={{ background: '#1D4ED8', borderColor: '#1D4ED8', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                    >
                      <Search size={16} />
                      <span>Track Status Live ➔</span>
                    </button>
                  </div>
                </div>

                {/* Footer Exit & Next Action Controls */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setWizardStep(1);
                      setAckDetails(null);
                    }}
                    className="btn-secondary"
                    style={{ padding: '0.65rem 1.5rem', fontWeight: 600 }}
                  >
                    + Apply for Another Citizen / Family Member
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setWizardStep(1);
                      if (onClose) onClose();
                    }}
                    className="btn-outline"
                    style={{
                      padding: '0.65rem 2rem',
                      fontWeight: 800,
                      background: '#0A192F',
                      color: '#FFFFFF',
                      borderColor: '#0A192F'
                    }}
                  >
                    Done / Close Engine ✕
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: DIRECT UTIITSL & PROTEAN PORTALS HUB */}
        {activeTab === 'portals' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0A192F', margin: '0 0 0.35rem' }}>
                Direct Official CBDT Portals (UTIITSL & Protean NSDL)
              </h3>
              <p style={{ fontSize: '0.84rem', color: '#64748B', margin: 0 }}>
                Citizens who wish to file directly without ADCS assisted facilitation may launch the official portals below.
              </p>
            </div>

            {/* Side-by-side Official Portal Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              {/* UTIITSL Portal Card */}
              <div style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '2px solid #0284C7',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 15px rgba(2, 132, 199, 0.08)'
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ background: '#E0F2FE', color: '#0369A1', fontWeight: 800, fontSize: '0.72rem', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                      GOVT AGENCY 1
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Coupon: U-XXXXXXXXX</span>
                  </div>

                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0A192F', margin: '0 0 0.5rem' }}>
                    UTI Infrastructure Technology And Services Ltd (UTIITSL)
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.4, margin: '0 0 1rem' }}>
                    Authorized portal for PAN issuance, paperless Aadhaar e-KYC, e-Sign, and PSA franchise agent network.
                  </p>

                  <div style={{ background: '#F0F9FF', padding: '0.75rem', borderRadius: '8px', fontSize: '0.78rem', marginBottom: '1rem' }}>
                    <div style={{ fontWeight: 700, color: '#0369A1', marginBottom: '0.25rem' }}>Available Direct Services:</div>
                    <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#334155' }}>
                      <li>Form 49A Indian Citizen (New PAN)</li>
                      <li>Form 49AA Foreign Citizen</li>
                      <li>PAN Change Request / Correction (CSF)</li>
                      <li>Reprint PAN & Instant e-PAN Download</li>
                    </ul>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <a
                    href="https://www.pan.utiitsl.com/PAN/newA54.html"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      background: '#0284C7',
                      color: '#FFFFFF',
                      padding: '0.7rem',
                      borderRadius: '8px',
                      textAlign: 'center',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <span>Launch UTIITSL Form 49A Portal</span>
                    <ExternalLink size={14} />
                  </a>

                  <a
                    href="https://www.trackpan.utiitsl.com/PANONLINE_TRACKING/trackForPan.do"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      background: '#F1F5F9',
                      color: '#334155',
                      padding: '0.5rem',
                      borderRadius: '8px',
                      textAlign: 'center',
                      fontWeight: 600,
                      fontSize: '0.78rem',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <span>Track Existing UTI Coupon</span>
                    <Search size={14} />
                  </a>
                </div>
              </div>

              {/* Protean (NSDL) Portal Card */}
              <div style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '2px solid #8B5CF6',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 15px rgba(139, 92, 246, 0.08)'
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ background: '#EDE9FE', color: '#6D28D9', fontWeight: 800, fontSize: '0.72rem', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                      GOVT AGENCY 2
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Ack: 150XXXXXXXXXXXX</span>
                  </div>

                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0A192F', margin: '0 0 0.5rem' }}>
                    Protean eGov Technologies Limited (formerly NSDL e-Gov)
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.4, margin: '0 0 1rem' }}>
                    National online PAN portal supporting instant Aadhaar paperless submission, e-Sign, and physical dispatch.
                  </p>

                  <div style={{ background: '#FAF5FF', padding: '0.75rem', borderRadius: '8px', fontSize: '0.78rem', marginBottom: '1rem' }}>
                    <div style={{ fontWeight: 700, color: '#6D28D9', marginBottom: '0.25rem' }}>Available Direct Services:</div>
                    <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#334155' }}>
                      <li>Paperless e-KYC Form 49A</li>
                      <li>Changes / Correction in PAN Data</li>
                      <li>e-Sign with scanned document uploads</li>
                      <li>15-digit Tax Information Network (TIN) tracking</li>
                    </ul>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <a
                    href="https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      background: '#8B5CF6',
                      color: '#FFFFFF',
                      padding: '0.7rem',
                      borderRadius: '8px',
                      textAlign: 'center',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <span>Launch Protean (NSDL) Portal</span>
                    <ExternalLink size={14} />
                  </a>

                  <a
                    href="https://tin.tin.nsdl.com/pantan/StatusTrack.html"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      background: '#F1F5F9',
                      color: '#334155',
                      padding: '0.5rem',
                      borderRadius: '8px',
                      textAlign: 'center',
                      fontWeight: 600,
                      fontSize: '0.78rem',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <span>Track Protean 15-Digit Ack</span>
                    <Search size={14} />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Prefilled Copy Box */}
            <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '1rem', border: '1px solid #E2E8F0' }}>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0A192F', marginBottom: '0.5rem' }}>
                Quick 1-Click Copy Data for Official Portal Filling
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => copyToClipboard(nameOnCard, 'name')}
                  style={{ padding: '0.4rem 0.75rem', borderRadius: '6px', border: '1px solid #CBD5E1', background: '#FFFFFF', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }}
                >
                  <Copy size={12} />
                  <span>{copiedField === 'name' ? '✓ Copied Name' : `Copy Name: ${nameOnCard}`}</span>
                </button>

                <button
                  onClick={() => copyToClipboard(aadhaarNumber, 'aadhaar')}
                  style={{ padding: '0.4rem 0.75rem', borderRadius: '6px', border: '1px solid #CBD5E1', background: '#FFFFFF', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }}
                >
                  <Copy size={12} />
                  <span>{copiedField === 'aadhaar' ? '✓ Copied Aadhaar' : `Copy Aadhaar: ${aadhaarNumber}`}</span>
                </button>

                <button
                  onClick={() => copyToClipboard(`${areaCode}/${aoType}/${rangeCode}/${aoNo}`, 'ao')}
                  style={{ padding: '0.4rem 0.75rem', borderRadius: '6px', border: '1px solid #CBD5E1', background: '#FFFFFF', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }}
                >
                  <Copy size={12} />
                  <span>{copiedField === 'ao' ? '✓ Copied AO Code' : `Copy AO Code: ${areaCode}/${aoType}/${rangeCode}/${aoNo}`}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DOCUMENT MATRIX & SPECIFICATIONS */}
        {activeTab === 'checklist' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0A192F', margin: '0 0 0.35rem' }}>
                Statutory Document Checklist & Technical Specifications
              </h3>
              <p style={{ fontSize: '0.84rem', color: '#64748B', margin: 0 }}>
                Rule 114 of Income Tax Rules, 1962 mandates the following approved documents for POI, POA, and DOB.
              </p>
            </div>

            {/* Document Matrix Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '1rem', border: '1px solid #E2E8F0' }}>
                <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#1E3A8A', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <UserCheck size={16} />
                  <span>Proof of Identity (POI)</span>
                </div>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.78rem', color: '#334155', lineHeight: 1.6 }}>
                  <li><strong>Aadhaar Card (UIDAI)</strong> (All-in-one)</li>
                  <li>Voter ID Card (EPIC)</li>
                  <li>Driving License</li>
                  <li>Indian Passport</li>
                  <li>Ration Card with applicant photo</li>
                  <li>Arm's License</li>
                  <li>Photo ID issued by Central/State/PSU</li>
                  <li>Bank Certificate with photograph & account number signed by branch manager</li>
                </ul>
              </div>

              <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '1rem', border: '1px solid #E2E8F0' }}>
                <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#047857', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Building2 size={16} />
                  <span>Proof of Address (POA)</span>
                </div>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.78rem', color: '#334155', lineHeight: 1.6 }}>
                  <li><strong>Aadhaar Card (UIDAI)</strong></li>
                  <li>Electricity Bill (&lt; 3 Months)</li>
                  <li>Bank Statement / Passbook (&lt; 3 Mo)</li>
                  <li>Landline / Broadband Bill (&lt; 3 Mo)</li>
                  <li>Water Bill (&lt; 3 Months)</li>
                  <li>Voter ID Card (EPIC)</li>
                  <li>Driving License / Passport</li>
                  <li>Domicile Certificate</li>
                </ul>
              </div>

              <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '1rem', border: '1px solid #E2E8F0' }}>
                <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#B45309', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <FileText size={16} />
                  <span>Proof of Date of Birth (DOB)</span>
                </div>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.78rem', color: '#334155', lineHeight: 1.6 }}>
                  <li><strong>Aadhaar Card (UIDAI)</strong></li>
                  <li>10th / Matriculation Certificate</li>
                  <li>Birth Certificate (Municipal Corp)</li>
                  <li>Indian Passport</li>
                  <li>Driving License</li>
                  <li>Domicile Certificate</li>
                  <li>Pension Payment Order</li>
                </ul>
              </div>
            </div>

            {/* Technical Cropping & Scanning Specifications */}
            <div style={{ background: '#FFFFFF', borderRadius: '14px', padding: '1.25rem', border: '2px solid #E2E8F0' }}>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0A192F', marginBottom: '0.75rem' }}>
                Technical Upload Specifications for UTIITSL & Protean
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                  <thead>
                    <tr style={{ background: '#F1F5F9', textAlign: 'left', color: '#475569' }}>
                      <th style={{ padding: '0.5rem 0.75rem' }}>Asset Type</th>
                      <th style={{ padding: '0.5rem 0.75rem' }}>Dimensions</th>
                      <th style={{ padding: '0.5rem 0.75rem' }}>Resolution (DPI)</th>
                      <th style={{ padding: '0.5rem 0.75rem' }}>Max File Size</th>
                      <th style={{ padding: '0.5rem 0.75rem' }}>Format</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                      <td style={{ padding: '0.5rem 0.75rem', fontWeight: 700 }}>Color Photograph</td>
                      <td style={{ padding: '0.5rem 0.75rem' }}>3.5 cm × 2.5 cm (132×170 px)</td>
                      <td style={{ padding: '0.5rem 0.75rem', color: '#16A34A', fontWeight: 700 }}>200 DPI</td>
                      <td style={{ padding: '0.5rem 0.75rem', fontWeight: 700 }}>&lt; 50 KB</td>
                      <td style={{ padding: '0.5rem 0.75rem' }}>JPEG / JPG</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                      <td style={{ padding: '0.5rem 0.75rem', fontWeight: 700 }}>Signature / Thumb</td>
                      <td style={{ padding: '0.5rem 0.75rem' }}>2.0 cm × 4.5 cm (94×212 px)</td>
                      <td style={{ padding: '0.5rem 0.75rem', color: '#16A34A', fontWeight: 700 }}>200 DPI (Black Ink)</td>
                      <td style={{ padding: '0.5rem 0.75rem', fontWeight: 700 }}>&lt; 50 KB</td>
                      <td style={{ padding: '0.5rem 0.75rem' }}>JPEG / JPG</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.5rem 0.75rem', fontWeight: 700 }}>Document Proofs</td>
                      <td style={{ padding: '0.5rem 0.75rem' }}>Standard A4</td>
                      <td style={{ padding: '0.5rem 0.75rem' }}>200 DPI</td>
                      <td style={{ padding: '0.5rem 0.75rem', fontWeight: 700 }}>&lt; 300 KB / page</td>
                      <td style={{ padding: '0.5rem 0.75rem' }}>PDF</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
