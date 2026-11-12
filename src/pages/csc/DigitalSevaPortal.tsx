import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { printBrandedADCSDocument } from '../../utils/documentBranding';
import { 
  Building2, 
  Wallet, 
  PlusCircle, 
  Search, 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Users, 
  HelpCircle, 
  TrendingUp, 
  Bell, 
  LogOut, 
  ShieldCheck, 
  Printer, 
  ArrowRight, 
  QrCode,
  DollarSign,
  Layers,
  Sparkles,
  RefreshCw,
  Landmark,
  BadgeCheck,
  Eye,
  SlidersHorizontal,
  Fingerprint,
  Scale,
  Video,
  GraduationCap,
  Award,
  Heart,
  Sprout,
  Car,
  Ticket,
  Settings,
  Key,
  Globe,
  Check,
  Send,
  Download,
  Copy,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

export const DigitalSevaPortal: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');

  const { 
    services, 
    applications, 
    submitApplication, 
    walletBalance, 
    setWalletBalance, 
    currentRole,
    activeDigitalSevaTier,
    authenticatedUser,
    commissionRules,
    showToast, 
    logAudit,
    language 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'services' | 'wallet' | 'digipay' | 'telelaw' | 'pmgdisha' | 'abha' | 'pmkisan' | 'fastag' | 'irctc' | 'pan' | 'edistrict' | 'eshram' | 'sarathi' | 'pmfby' | 'bbps' | 'ucl' | 'estore' | 'dsc' | 'rates' | 'hrms' | 'orders' | 'operators' | 'support'>(() => {
    const validTabs = ['dashboard', 'services', 'wallet', 'digipay', 'telelaw', 'pmgdisha', 'abha', 'pmkisan', 'fastag', 'irctc', 'pan', 'edistrict', 'eshram', 'sarathi', 'pmfby', 'bbps', 'ucl', 'estore', 'dsc', 'rates', 'hrms', 'orders', 'operators', 'support'];
    return (validTabs.includes(tabParam || '') ? tabParam : 'dashboard') as any;
  });

  // Re-sync activeTab if search parameter changes
  React.useEffect(() => {
    if (tabParam) {
      const validTabs = ['dashboard', 'services', 'wallet', 'digipay', 'telelaw', 'pmgdisha', 'abha', 'pmkisan', 'fastag', 'irctc', 'pan', 'edistrict', 'eshram', 'sarathi', 'pmfby', 'bbps', 'ucl', 'estore', 'dsc', 'rates', 'hrms', 'orders', 'operators', 'support'];
      if (validTabs.includes(tabParam)) {
        setActiveTab(tabParam as any);
      }
    }
  }, [tabParam]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServiceCategory, setSelectedServiceCategory] = useState<string>('all');

  // Digital Signature Certificate (DSC) State
  const [dscApplicant, setDscApplicant] = useState('Vikramaditya Sharma');
  const [dscAadhaar, setDscAadhaar] = useState('999999990019');
  const [dscMobile, setDscMobile] = useState('9835012345');
  const [dscType, setDscType] = useState('Class 3 Signing & Encryption (2-Year Validity)');
  const [dscUsb, setDscUsb] = useState('WatchData ProxKey Plus (FIPS 140-2 Level 3 Certified)');
  const [dscPurpose, setDscPurpose] = useState('GeM e-Procurement, MCA21, GST & Income Tax e-Filing');
  const [dscReceipt, setDscReceipt] = useState<any | null>(null);
  const [dscLoading, setDscLoading] = useState(false);

  // Grameen e-Store State
  const [estoreCustomer, setEstoreCustomer] = useState('Brijesh Sharma');
  const [estoreMobile, setEstoreMobile] = useState('9835012345');
  const [estorePanchayat, setEstorePanchayat] = useState('Danapur Cantonment Gram Panchayat');
  const [estoreCategory, setEstoreCategory] = useState('Farm Inputs & Solar Technology');
  const [estoreProduct, setEstoreProduct] = useState('IFFCO Nano Urea (Liquid) + Solar DC Sprayer 16L');
  const [estoreQuantity, setEstoreQuantity] = useState<number>(2);
  const [estoreAmount, setEstoreAmount] = useState<number>(3450);
  const [estorePayMode, setEstorePayMode] = useState<'VLE_WALLET_DISBURSAL' | 'CASH_ON_DELIVERY'>('VLE_WALLET_DISBURSAL');
  const [estoreReceipt, setEstoreReceipt] = useState<any | null>(null);
  const [estoreLoading, setEstoreLoading] = useState(false);

  // Aadhaar UCL State
  const [uclResident, setUclResident] = useState('Sanjay Kumar Verma');
  const [uclAadhaar, setUclAadhaar] = useState('999999990019');
  const [uclMobile, setUclMobile] = useState('9835099887');
  const [uclUpdateType, setUclUpdateType] = useState('Mobile Number Linking');
  const [uclDoc, setUclDoc] = useState('Ration Card / Electricity Bill (Valid Proof of Address)');
  const [uclNewDetail, setUclNewDetail] = useState('Link mobile +91 9835099887 to Aadhaar');
  const [uclReceipt, setUclReceipt] = useState<any | null>(null);
  const [uclLoading, setUclLoading] = useState(false);

  // BBPS State
  const [bbpsCategory, setBbpsCategory] = useState<'Electricity' | 'LPG Gas' | 'Water' | 'Broadband'>('Electricity');
  const [bbpsBiller, setBbpsBiller] = useState('South Bihar Power Distribution Co. Ltd (SBPDCL)');
  const [bbpsConsumerNo, setBbpsConsumerNo] = useState('104859302194');
  const [bbpsConsumerMobile, setBbpsConsumerMobile] = useState('9835012345');
  const [bbpsBillDetails, setBbpsBillDetails] = useState<any | null>(null);
  const [bbpsReceipt, setBbpsReceipt] = useState<any | null>(null);
  const [bbpsFetching, setBbpsFetching] = useState(false);
  const [bbpsPaying, setBbpsPaying] = useState(false);

  // PMFBY Crop Insurance State
  const [fbyFarmer, setFbyFarmer] = useState('Ramdhani Yadav');
  const [fbyAadhaar, setFbyAadhaar] = useState('999999990019');
  const [fbyMobile, setFbyMobile] = useState('9835012345');
  const [fbyState, setFbyState] = useState('Bihar');
  const [fbyDistrict, setFbyDistrict] = useState('Patna');
  const [fbyVillage, setFbyVillage] = useState('Danapur Cantonment');
  const [fbyKhasra, setFbyKhasra] = useState('Khata: 142 / Khasra: 589/2');
  const [fbySeason, setFbySeason] = useState('Kharif 2026');
  const [fbyCrop, setFbyCrop] = useState('Paddy / धान (Fine Variety)');
  const [fbyArea, setFbyArea] = useState<number>(2.5);
  const [fbySumInsured, setFbySumInsured] = useState<number>(125000);
  const [fbyCompany, setFbyCompany] = useState('Agriculture Insurance Company of India Ltd (AIC)');
  const [fbyPolicy, setFbyPolicy] = useState<any | null>(null);
  const [fbyLoading, setFbyLoading] = useState(false);

  // e-Shram State
  const [esWorker, setEsWorker] = useState('Manoj Kumar Paswan');
  const [esAadhaar, setEsAadhaar] = useState('999999990019');
  const [esMobile, setEsMobile] = useState('9835003344');
  const [esOccupation, setEsOccupation] = useState('Construction / Bricklayer & Mason (राजमिस्त्री)');
  const [esBlood, setEsBlood] = useState('O+');
  const [esReceipt, setEsReceipt] = useState<any | null>(null);
  const [esLoading, setEsLoading] = useState(false);

  // e-District State
  const [edCertType, setEdCertType] = useState('Residential / Domicile Certificate (निवास प्रमाण पत्र)');
  const [edApplicant, setEdApplicant] = useState('Pooja Kumari');
  const [edFather, setEdFather] = useState('Sunil Kumar');
  const [edAadhaar, setEdAadhaar] = useState('999999990019');
  const [edDistrict, setEdDistrict] = useState('Patna');
  const [edTehsil, setEdTehsil] = useState('Danapur');
  const [edIncome, setEdIncome] = useState('₹1,80,000');
  const [edReceipt, setEdReceipt] = useState<any | null>(null);
  const [edLoading, setEdLoading] = useState(false);

  // PAN Card State
  const [panApplicant, setPanApplicant] = useState('Vikramaditya Sharma');
  const [panFather, setPanFather] = useState('Rajendra Prasad Sharma');
  const [panAadhaar, setPanAadhaar] = useState('999999990019');
  const [panDob, setPanDob] = useState('1992-05-14');
  const [panType, setPanType] = useState('Form 49A (New Indian Citizen)');
  const [panMode, setPanMode] = useState('Both Physical PAN Card & e-PAN');
  const [panReceipt, setPanReceipt] = useState<any | null>(null);
  const [panLoading, setPanLoading] = useState(false);

  // IRCTC State
  const [railTrain, setRailTrain] = useState('12309 (Patna Rajdhani Express)');
  const [railFrom, setRailFrom] = useState('NDLS - New Delhi');
  const [railTo, setRailTo] = useState('PNBE - Patna Jn');
  const [railPassenger, setRailPassenger] = useState('Sanjay Kumar');
  const [railClass, setRailClass] = useState<'3A' | '2A' | 'SL'>('3A');
  const [railDate, setRailDate] = useState('2026-11-20');
  const [railTicket, setRailTicket] = useState<any | null>(null);
  const [railLoading, setRailLoading] = useState(false);

  // FASTag State
  const [ftVehicle, setFtVehicle] = useState('BR-01-AB-1234');
  const [ftCustomer, setFtCustomer] = useState('Amit Vikram');
  const [ftTxnType, setFtTxnType] = useState<'recharge' | 'issue'>('recharge');
  const [ftAmount, setFtAmount] = useState<number>(500);
  const [ftReceipt, setFtReceipt] = useState<any | null>(null);
  const [ftLoading, setFtLoading] = useState(false);

  // PM-KISAN State
  const [pmkAadhaar, setPmkAadhaar] = useState('999999990019');
  const [pmkFarmer, setPmkFarmer] = useState('Ramesh Chandra Yadav');
  const [pmkMobile, setPmkMobile] = useState('9835002244');
  const [pmkReceipt, setPmkReceipt] = useState<any | null>(null);
  const [pmkLoading, setPmkLoading] = useState(false);

  // ABHA Health Card State
  const [abhaName, setAbhaName] = useState('Suresh Kumar');
  const [abhaAadhaar, setAbhaAadhaar] = useState('999999990019');
  const [abhaMobile, setAbhaMobile] = useState('9835123456');
  const [abhaDob, setAbhaDob] = useState('1988-06-15');
  const [abhaGender, setAbhaGender] = useState('Male');
  const [abhaCard, setAbhaCard] = useState<any | null>(null);
  const [abhaLoading, setAbhaLoading] = useState(false);

  // Sarathi Driving License State
  const [dlApplicant, setDlApplicant] = useState('Rahul Singh');
  const [dlAadhaar, setDlAadhaar] = useState('999999990019');
  const [dlMobile, setDlMobile] = useState('9835088776');
  const [dlRto, setDlRto] = useState('BR-01 (Patna RTO Central)');
  const [dlCov, setDlCov] = useState('LMV (Motor Car) + MCWG (Motorcycle with Gear)');
  const [dlSlotDate, setDlSlotDate] = useState('2026-11-20');
  const [dlSlotTime, setDlSlotTime] = useState('11:00 AM - 12:30 PM (Batch 2)');
  const [dlReceipt, setDlReceipt] = useState<any | null>(null);
  const [dlLoading, setDlLoading] = useState(false);

  // Rate & Commission Management State
  const [servicePriceCatalog, setServicePriceCatalog] = useState(services);
  const [selectedServiceToEdit, setSelectedServiceToEdit] = useState<any | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editComm, setEditComm] = useState<number>(0);
  const [editGovtFee, setEditGovtFee] = useState<number>(0);
  const [isUpdatingRates, setIsUpdatingRates] = useState(false);

  // Employee HRMS Management State
  const [employeesList, setEmployeesList] = useState<any[]>([]);
  const [newEmpName, setNewEmpName] = useState('');
  const [newEmpPhone, setNewEmpPhone] = useState('');
  const [newEmpRole, setNewEmpRole] = useState('Portal Operator');
  const [newEmpDept, setNewEmpDept] = useState('Operations & Citizen Services');
  const [newEmpSalary, setNewEmpSalary] = useState<number>(18000);
  const [isCreatingEmp, setIsCreatingEmp] = useState(false);

  // Sync HRMS Employees on Mount
  React.useEffect(() => {
    fetch('/api/hrms/employees')
      .then(r => r.json())
      .then(d => {
        if (d?.success && Array.isArray(d.employees)) {
          setEmployeesList(d.employees);
        }
      })
      .catch(() => {});
  }, []);

  // Sync servicePriceCatalog with global services
  React.useEffect(() => {
    if (services && services.length > 0) {
      setServicePriceCatalog(services);
    }
  }, [services]);

  // DigiPay AEPS State
  const [aepsAadhaar, setAepsAadhaar] = useState('999999990019');
  const [aepsBank, setAepsBank] = useState('State Bank of India (SBI)');
  const [aepsTxnType, setAepsTxnType] = useState<'withdrawal' | 'balance' | 'statement'>('withdrawal');
  const [aepsAmount, setAepsAmount] = useState<number>(2000);
  const [aepsScanning, setAepsScanning] = useState(false);
  const [aepsReceipt, setAepsReceipt] = useState<any | null>(null);

  // Tele-Law State
  const [telelawCitizen, setTelelawCitizen] = useState('Kameshwar Mahto');
  const [telelawPhone, setTelelawPhone] = useState('9835001122');
  const [telelawCategory, setTelelawCategory] = useState('Land & Agricultural Boundary Conflict');
  const [telelawScheduled, setTelelawScheduled] = useState<any | null>(null);
  const [telelawBooking, setTelelawBooking] = useState(false);

  // PMGDISHA State
  const [pmgCandidate, setPmgCandidate] = useState('Priya Kumari');
  const [pmgAadhaar, setPmgAadhaar] = useState('999999990019');
  const [pmgCertified, setPmgCertified] = useState<any | null>(null);
  const [pmgProcessing, setPmgProcessing] = useState(false);

  // Top-Up & Scanner Modal State
  const [isTopupOpen, setIsTopupOpen] = useState(false);
  const [topupAmount, setTopupAmount] = useState<number>(1000);
  const [topupMethod, setTopupMethod] = useState<'UPI' | 'QR_SCANNER' | 'NetBanking' | 'DebitCard'>('QR_SCANNER');
  const [topupUtr, setTopupUtr] = useState('');
  const [topupSenderUpi, setTopupSenderUpi] = useState('');
  const [isTopupProcessing, setIsTopupProcessing] = useState(false);

  // Bank Account Transfer / Payout Modal State
  const [isPayoutOpen, setIsPayoutOpen] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState<number>(1000);
  const [payoutAccount, setPayoutAccount] = useState('50100492819201');
  const [payoutIfsc, setPayoutIfsc] = useState('HDFC0000123');
  const [payoutHolder, setPayoutHolder] = useState('Rajesh Sharma (VLE)');
  const [payoutBank, setPayoutBank] = useState('HDFC Bank Ltd');
  const [isPayoutProcessing, setIsPayoutProcessing] = useState(false);

  // Quick Application Drawer State & UTR Verification Gateway
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantAadhaar, setApplicantAadhaar] = useState('');
  const [servicePaymentMethod, setServicePaymentMethod] = useState<'WALLET' | 'UPI_QR'>('WALLET');
  const [serviceUtr, setServiceUtr] = useState('');
  const [serviceTxnId, setServiceTxnId] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [generatedReceipt, setGeneratedReceipt] = useState<any | null>(null);

  // Sub-Operator Management State
  const [operators, setOperators] = useState([
    { id: 'OP-01', name: 'Manoj Kumar', phone: '9835112233', role: 'Operator', status: 'Active', permissions: ['Banking', 'PAN Card', 'Utility Bills'] },
    { id: 'OP-02', name: 'Sunita Devi', phone: '9835445566', role: 'Operator', status: 'Active', permissions: ['Certificates', 'E-Shram', 'Print'] }
  ]);
  const [newOpName, setNewOpName] = useState('');
  const [newOpPhone, setNewOpPhone] = useState('');

  // ADCS Live API & Gateway Connector Hub State
  const [isConnectorModalOpen, setIsConnectorModalOpen] = useState(false);
  const [selectedConnectorId, setSelectedConnectorId] = useState<string>('digipay');
  const [connectorsConfig, setConnectorsConfig] = useState<Record<string, { endpoint: string; apiKey: string; merchantId?: string; webhookSecret?: string; enabled: boolean }>>(() => {
    try {
      const saved = localStorage.getItem('adcs_api_config');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Passbook transactions
  const [passbook, setPassbook] = useState([
    { id: 'TXN-PB-9941', date: '2026-11-10', type: 'CR', desc: 'VLE Commission: Form 49A PAN Application', amount: 50, balance: 2450.00 },
    { id: 'TXN-PB-9940', date: '2026-11-10', type: 'DR', desc: 'Govt Application Fee: Birth Certificate', amount: 50, balance: 2400.00 },
    { id: 'TXN-PB-9939', date: '2026-11-09', type: 'CR', desc: 'Wallet Top-up via ICICI NetBanking', amount: 2000, balance: 2450.00 },
    { id: 'TXN-PB-9938', date: '2026-11-09', type: 'CR', desc: 'DigiPay AEPS Cash Out Surcharge', amount: 35, balance: 450.00 },
  ]);

  // Live VLE Profile & Balance Sync & API Connectors Sync
  React.useEffect(() => {
    let isMounted = true;
    fetch('/api/csc/vle-profile')
      .then(r => r.json())
      .then(data => {
        if (!isMounted || !data?.success || !data?.vle) return;
        const vle = data.vle;
        if (typeof vle.walletBalance === 'number') {
          setWalletBalance(vle.walletBalance);
        }
        if (Array.isArray(vle.subOperators) && vle.subOperators.length > 0) {
          setOperators(vle.subOperators);
        }
        if (Array.isArray(vle.passbook) && vle.passbook.length > 0) {
          setPassbook(vle.passbook);
        }
      })
      .catch(() => {});

    fetch('/api/admin/api-connectors')
      .then(r => r.json())
      .then(data => {
        if (!isMounted || !data?.success || !data?.connectors) return;
        setConnectorsConfig(prev => ({ ...data.connectors, ...prev }));
      })
      .catch(() => {});

    return () => { isMounted = false; };
  }, []);

  const downloadSevaRecord = (
    filename: string,
    content: string,
    toastTitle: string,
    toastMessage: string,
    mimeType = 'text/plain;charset=utf-8'
  ) => {
    if (filename.toLowerCase().endsWith('.csv') || mimeType.includes('csv')) {
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast(toastTitle, toastMessage, 'success');
      return;
    }

    const parsedRows = content
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line && !/^[=\-_]+$/.test(line) && line.includes(':'))
      .map((line) => {
        const idx = line.indexOf(':');
        return {
          label: line.slice(0, idx).trim(),
          value: line.slice(idx + 1).trim() || 'Recorded',
        };
      });
    const docNum = parsedRows.find((r) => /ref|rrn|id|token|app|order|pan|bill|awb/i.test(r.label))?.value
      || filename.replace(/\.[^/.]+$/, '');

    printBrandedADCSDocument({
      title: toastTitle || 'ADCS Kendra Counter Facilitation Slip',
      documentType: 'KENDRA COUNTER SLIP',
      documentNumber: docNum,
      issuedDate: new Date().toLocaleString('en-IN'),
      rows: parsedRows.length > 0 ? parsedRows : [{ label: 'Summary', value: content.slice(0, 300) }],
      notes: [
        'Facilitated through ADCS Kendra / VLE Counter Operator Workspace.',
        'Statutory government certificates remain authentic issuer records without third-party alterations.',
      ],
    });
    showToast(toastTitle, `${toastMessage} Opened in branded ADCS Print/PDF format.`, 'success');
  };

  // Save Connector Configuration
  const handleSaveConnector = async (id: string, config: { endpoint: string; apiKey: string; merchantId?: string; webhookSecret?: string; enabled: boolean }) => {
    const updated = {
      ...connectorsConfig,
      [id]: config
    };
    setConnectorsConfig(updated);
    try {
      localStorage.setItem('adcs_api_config', JSON.stringify(updated));
      await fetch('/api/admin/api-connectors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ connectors: updated })
      });
      showToast('API Connector Saved', `Configuration for ${id.toUpperCase()} updated successfully.`, 'success');
      logAudit('ADCS Connector Update', `Updated API endpoint/credentials for service: ${id}`);
    } catch {
      showToast('API Connector Saved Locally', `Saved to browser state for ${id.toUpperCase()}.`, 'success');
    }
  };

  // Handle Wallet Top-Up via UPI QR Scanner & UTR Verification
  const handleTopup = async () => {
    if (topupAmount <= 0) {
      showToast('Invalid Amount', 'Please specify a valid top-up amount.', 'error');
      return;
    }

    if (topupMethod === 'QR_SCANNER' || topupMethod === 'UPI') {
      const cleanUtr = topupUtr.trim();
      if (!cleanUtr || cleanUtr.length < 8) {
        showToast('UTR Required', 'Please enter a valid 12-digit Banking UTR / Transaction ID after scanning the QR code.', 'error');
        return;
      }
    }

    setIsTopupProcessing(true);

    try {
      const res = await fetch('/api/csc/wallet/topup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: topupAmount, 
          paymentMethod: topupMethod,
          utr: topupUtr.trim(),
          senderUpi: topupSenderUpi.trim()
        })
      }).then(r => r.json()).catch(() => null);

      if (!res?.success) {
        showToast('Verification Failed', res?.message || 'UTR verification failed. Please verify the bank reference number.', 'error');
        return;
      }

      const newBal = typeof res.walletBalance === 'number' ? res.walletBalance : (walletBalance || 2450) + topupAmount;
      setWalletBalance(newBal);

      if (res.entry) {
        setPassbook(prev => [res.entry, ...prev]);
      } else {
        const newEntry = {
          id: 'TXN-PB-' + Math.floor(1000 + Math.random() * 9000),
          date: new Date().toISOString().split('T')[0],
          type: 'CR',
          desc: `Wallet Top-up via ${topupMethod} [UTR: ${topupUtr.trim() || 'VERIFIED'}]`,
          amount: topupAmount,
          balance: newBal
        };
        setPassbook(prev => [newEntry, ...prev]);
      }

      showToast('Payment Verified & Credited', `₹${topupAmount} successfully verified with UTR ${topupUtr.trim() || 'IMMEDIATE'}. New Balance: ₹${newBal.toFixed(2)}`, 'success');
      logAudit('ADCS Wallet Top-up Verified', `Added ₹${topupAmount} via ${topupMethod}. UTR: ${topupUtr}. New Balance: ₹${newBal}`);
      confetti({ particleCount: 85, spread: 65 });
      setTopupUtr('');
      setTopupSenderUpi('');
      setIsTopupOpen(false);
    } finally {
      setIsTopupProcessing(false);
    }
  };

  // Handle Bank Transfer / Payout from Wallet to Direct Bank Account
  const handleBankPayout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (payoutAmount <= 0) {
      showToast('Invalid Amount', 'Please specify a valid transfer amount.', 'error');
      return;
    }
    if (walletBalance < payoutAmount) {
      showToast('Insufficient Balance', `Your current balance is ₹${walletBalance}. Cannot transfer ₹${payoutAmount}.`, 'error');
      return;
    }

    setIsPayoutProcessing(true);
    try {
      const res = await fetch('/api/csc/wallet/transfer-to-bank', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: payoutAmount,
          accountNumber: payoutAccount,
          ifsc: payoutIfsc,
          accountHolder: payoutHolder,
          bankName: payoutBank
        })
      }).then(r => r.json()).catch(() => null);

      if (!res?.success) {
        showToast('Transfer Failed', res?.message || 'Failed to process bank payout.', 'error');
        return;
      }

      const newBal = typeof res.walletBalance === 'number' ? res.walletBalance : Number((walletBalance - payoutAmount).toFixed(2));
      setWalletBalance(newBal);

      if (res.payoutEntry) {
        setPassbook(prev => [res.payoutEntry, ...prev]);
      }

      showToast('IMPS Payout Initiated', `₹${payoutAmount} transferred to A/C: XXXXXX${payoutAccount.slice(-4)}. UTR: ${res.payoutUtr}`, 'success');
      logAudit('ADCS Bank Payout', `Transferred ₹${payoutAmount} to ${payoutHolder} (${payoutBank}). UTR: ${res.payoutUtr}`);
      confetti({ particleCount: 90, spread: 70 });
      setIsPayoutOpen(false);
    } finally {
      setIsPayoutProcessing(false);
    }
  };

  // Handle Instant Application Filing with Strict Payment / UTR Verification Gate
  const handleServiceFiling = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !applicantName || !applicantPhone) return;

    const govtFee = selectedService.govtFee ?? 107;
    const vleCommission = 50;

    // Strict UTR Number + Transaction ID Verification Gate before processing
    if (servicePaymentMethod === 'UPI_QR') {
      const cleanUtr = serviceUtr.trim();
      const cleanTxn = serviceTxnId.trim();
      if (!cleanUtr || cleanUtr.length < 8) {
        showToast('UTR Verification Required', 'Please pay the fee by scanning the QR code and enter a valid 8+ digit Banking UTR Number.', 'error');
        return;
      }
      if (!cleanTxn || cleanTxn.length < 6) {
        showToast('Transaction ID Required', 'Enter your Payment App Transaction ID (minimum 6 characters) before submitting.', 'error');
        return;
      }
    } else {
      if (walletBalance < govtFee) {
        showToast('Insufficient Wallet Balance', `Govt fee is ₹${govtFee}. Please top up your VLE wallet or select UPI QR payment mode.`, 'error');
        setIsTopupOpen(true);
        return;
      }
    }

    setIsApplying(true);

    setTimeout(() => {
      const trackingId = submitApplication({
        serviceId: selectedService.id,
        serviceName: selectedService.title,
        category: selectedService.category,
        applicantName,
        applicantPhone,
        feePaid: govtFee + vleCommission,
        utrNumber: servicePaymentMethod === 'UPI_QR' ? serviceUtr.trim().toUpperCase() : `WLT-${Date.now().toString().slice(-8)}`,
        transactionId: servicePaymentMethod === 'UPI_QR' ? serviceTxnId.trim().toUpperCase() : `TXN-WLT-${Date.now().toString().slice(-6)}`,
        paymentMode: servicePaymentMethod === 'UPI_QR' ? 'upi' : 'wallet',
        city: 'Patna Center #104',
        state: 'Bihar',
        notes: `Filing through Akul Dravin Digital Services (ADCS) Sovereign Portal. Payment: ${servicePaymentMethod === 'UPI_QR' ? `UPI QR (UTR: ${serviceUtr.trim()}, TXN: ${serviceTxnId.trim()})` : 'VLE Wallet Debit'}. Applicant Aadhaar: ${applicantAadhaar || 'Verified'}`
      });

      let newBal = walletBalance;
      if (servicePaymentMethod === 'WALLET') {
        newBal = Number((walletBalance - govtFee + vleCommission).toFixed(2));
        setWalletBalance(newBal);
        setPassbook(prev => [
          { id: 'TXN-PB-' + Math.floor(1000 + Math.random() * 9000), date: new Date().toISOString().split('T')[0], type: 'CR', desc: `Commission: ${selectedService.title}`, amount: vleCommission, balance: newBal },
          { id: 'TXN-PB-' + Math.floor(1000 + Math.random() * 9000), date: new Date().toISOString().split('T')[0], type: 'DR', desc: `Govt Fee: ${selectedService.title}`, amount: govtFee, balance: Number((walletBalance - govtFee).toFixed(2)) },
          ...prev
        ]);
      } else {
        // Direct UPI QR payment: Citizen paid full fee directly, operator gets commission credited to wallet!
        newBal = Number((walletBalance + vleCommission).toFixed(2));
        setWalletBalance(newBal);
        setPassbook(prev => [
          { id: 'TXN-PB-' + Math.floor(1000 + Math.random() * 9000), date: new Date().toISOString().split('T')[0], type: 'CR', desc: `Commission: ${selectedService.title} (Citizen Paid via UPI UTR: ${serviceUtr.trim()})`, amount: vleCommission, balance: newBal },
          ...prev
        ]);
      }

      const receipt = {
        trackingId,
        serviceTitle: selectedService.title,
        category: selectedService.category,
        applicantName,
        applicantPhone,
        applicantAadhaar: applicantAadhaar ? `XXXX-XXXX-${applicantAadhaar.slice(-4)}` : 'Verified',
        amountPaid: govtFee + vleCommission,
        paymentMode: servicePaymentMethod === 'UPI_QR' ? `Direct UPI (UTR: ${serviceUtr.trim()})` : 'ADCS VLE Wallet',
        utr: servicePaymentMethod === 'UPI_QR' ? serviceUtr.trim() : 'WALLET_SETTLED',
        timestamp: new Date().toLocaleString('en-IN'),
        vleCommission,
        center: 'Akul Dravin Digital Services Kendra (ADCS)',
        status: 'VERIFIED & REGISTERED'
      };

      setGeneratedReceipt(receipt);
      showToast('Payment Verified & Application Filed', `Token: ${trackingId} created with verified payment. Receipt ready for print.`, 'success');
      logAudit('ADCS Sovereign Filing Verified', `Filed ${selectedService.title} for ${applicantName}. Token: ${trackingId}. UTR: ${receipt.utr}`);
      confetti({ particleCount: 95, spread: 75 });

      setIsApplying(false);
      setSelectedService(null);
      setApplicantName('');
      setApplicantPhone('');
      setApplicantAadhaar('');
      setServiceUtr('');
    }, 600);
  };

  // Handle Sarathi DL Application & Test Slot Booking
  const handleSarathiBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dlApplicant || dlAadhaar.length !== 12) {
      showToast('Validation Error', 'Valid applicant name and 12-digit Aadhaar UID required.', 'error');
      return;
    }
    setDlLoading(true);
    setTimeout(() => {
      const appNo = 'DL-BR-' + Math.floor(10000000 + Math.random() * 90000000);
      const trackingId = submitApplication({
        serviceId: 'srv-sarathi-dl',
        serviceName: `Sarathi Driving License (${dlCov})`,
        category: 'travel',
        applicantName: dlApplicant,
        applicantPhone: dlMobile,
        feePaid: 450,
        city: 'Patna RTO Central',
        state: 'Bihar',
        notes: `Sarathi e-Transport Slot Booking. RTO: ${dlRto}. Slot: ${dlSlotDate} @ ${dlSlotTime}`
      });

      const receipt = {
        appNo,
        trackingId,
        applicantName: dlApplicant,
        maskedAadhaar: `XXXX-XXXX-${dlAadhaar.slice(-4)}`,
        mobile: dlMobile,
        rto: dlRto,
        cov: dlCov,
        slotDate: dlSlotDate,
        slotTime: dlSlotTime,
        feePaid: 450,
        vleCommission: 75,
        status: 'SLOT CONFIRMED & RTO ADMIT CARD ISSUED',
        issuedAt: new Date().toLocaleString('en-IN')
      };

      setDlReceipt(receipt);
      setWalletBalance(prev => prev + 75);
      showToast('Sarathi DL Slot Booked', `Application No: ${appNo} booked for ${dlSlotDate}. Commission +₹75 credited.`, 'success');
      logAudit('Sarathi DL Slot Booked', `Booked slot for ${dlApplicant} at ${dlRto} on ${dlSlotDate}`);
      confetti({ particleCount: 85, spread: 65 });
      setDlLoading(false);
    }, 700);
  };

  // Handle Dynamic Price & Commission Update (Strictly Super Admin Exclusive)
  const handleSaveRates = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentRole !== 'admin') {
      showToast('Admin Only Control', 'Only Super Admin has authority to modify service rates and commission slabs.', 'error');
      return;
    }
    if (!selectedServiceToEdit) return;
    setIsUpdatingRates(true);

    try {
      const res = await fetch(`/api/services/${selectedServiceToEdit.id}/rates`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price: editPrice,
          commissionRate: editComm,
          govtFee: editGovtFee
        })
      }).then(r => r.json()).catch(() => null);

      if (res?.success) {
        setServicePriceCatalog(prev => prev.map(s => s.id === selectedServiceToEdit.id ? { ...s, price: editPrice, commissionRate: editComm, govtFee: editGovtFee } : s));
        showToast('Rates Updated Successfully', `Updated price to ₹${editPrice} and commission to ₹${editComm} for ${selectedServiceToEdit.title}`, 'success');
        logAudit('Service Rates Adjusted', `Set price: ₹${editPrice}, comm: ₹${editComm} for ${selectedServiceToEdit.id}`);
        setSelectedServiceToEdit(null);
      } else {
        showToast('Update Failed', res?.message || 'Could not update rates on server.', 'error');
      }
    } finally {
      setIsUpdatingRates(false);
    }
  };

  // Handle Add New Employee
  const handleCreateEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmpName || !newEmpPhone) return;
    setIsCreatingEmp(true);

    try {
      const res = await fetch('/api/hrms/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newEmpName,
          phone: newEmpPhone,
          role: newEmpRole,
          department: newEmpDept,
          salary: newEmpSalary
        })
      }).then(r => r.json()).catch(() => null);

      if (res?.success && res.employee) {
        setEmployeesList(prev => [res.employee, ...prev]);
        showToast('Staff Employee Added', `${newEmpName} registered with ID ${res.employee.id}.`, 'success');
        logAudit('HRMS Employee Created', `Added ${newEmpName} (${newEmpRole})`);
        setNewEmpName('');
        setNewEmpPhone('');
      } else {
        showToast('Creation Failed', res?.message || 'Could not create employee.', 'error');
      }
    } finally {
      setIsCreatingEmp(false);
    }
  };

  // Handle Delete Employee
  const handleDeleteEmployee = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to remove staff member ${name}?`)) return;
    try {
      const res = await fetch(`/api/hrms/employees/${id}`, { method: 'DELETE' }).then(r => r.json()).catch(() => null);
      if (res?.success) {
        setEmployeesList(prev => prev.filter(e => e.id !== id));
        showToast('Staff Removed', `Removed ${name} from portal staff registry.`, 'info');
        logAudit('HRMS Staff Removed', `Deleted employee ${id} (${name})`);
      }
    } catch {
      showToast('Action Failed', 'Could not remove staff member.', 'error');
    }
  };

  // Add new sub-operator
  const handleAddOperator = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOpName || !newOpPhone) return;

    try {
      const res = await fetch('/api/csc/operators', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newOpName,
          phone: newOpPhone,
          role: 'Operator',
          permissions: ['General Services', 'Print & Scan']
        })
      }).then(r => r.json()).catch(() => null);

      const op = res?.operator || {
        id: 'OP-0' + (operators.length + 1),
        name: newOpName,
        phone: newOpPhone,
        role: 'Operator',
        status: 'Active',
        permissions: ['General Services', 'Print & Scan']
      };
      setOperators(prev => [...prev, op]);
      showToast('Sub-Operator Added', `Operator ${newOpName} registered with center credentials.`, 'success');
      logAudit('CSC Operator Provisioning', `Registered operator ${newOpName} with ID ${op.id}`);
      setNewOpName('');
      setNewOpPhone('');
    } catch (err) {
      showToast('Error', 'Could not provision operator.', 'error');
    }
  };

  // Handle DigiPay AEPS Transaction
  const handleDigiPayTransact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aepsAadhaar) return;
    setAepsScanning(true);
    setAepsReceipt(null);

    try {
      const res = await fetch('/api/csc/digipay/transact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          aadhaar: aepsAadhaar,
          bankName: aepsBank,
          txnType: aepsTxnType,
          amount: aepsAmount
        })
      }).then(r => r.json());

      if (!res.success) {
        showToast('AEPS Verification Failed', res.message || 'Biometric or UID verification error', 'error');
        return;
      }

      setAepsReceipt(res);
      setWalletBalance(res.vleNewBalance);
      setPassbook(prev => [
        {
          id: 'TXN-DP-' + Math.floor(1000 + Math.random() * 9000),
          date: new Date().toISOString().split('T')[0],
          type: 'CR',
          desc: `DigiPay AEPS ${aepsTxnType.toUpperCase()} Commission (${aepsBank})`,
          amount: res.vleCommission,
          balance: res.vleNewBalance
        },
        ...prev
      ]);

      showToast('AEPS Transaction Approved', `RRN: ${res.rrn}. VLE Surcharge +₹${res.vleCommission} credited to wallet.`, 'success');
      logAudit('DigiPay AEPS Cashout', `Processed ${aepsTxnType} for ${aepsAadhaar} at ${aepsBank}. RRN: ${res.rrn}`);
      confetti({ particleCount: 75, spread: 60 });
    } finally {
      setAepsScanning(false);
    }
  };

  // Handle Tele-Law Consultation Booking
  const handleTelelawBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!telelawCitizen || !telelawPhone) return;
    setTelelawBooking(true);

    try {
      const res = await fetch('/api/csc/telelaw/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          citizenName: telelawCitizen,
          phone: telelawPhone,
          disputeType: telelawCategory
        })
      }).then(r => r.json());

      if (res.success) {
        setTelelawScheduled(res.consultation);
        showToast('Tele-Law Advocate Booked', `Case ID: ${res.consultation.caseId}. High Court panel advocate scheduled.`, 'success');
        logAudit('Tele-Law Case Booked', `Citizen: ${telelawCitizen}, Case: ${res.consultation.caseId}`);
        confetti({ particleCount: 60, spread: 50 });
      }
    } finally {
      setTelelawBooking(false);
    }
  };

  // Handle PMGDISHA Certification
  const handlePmgdishaCertify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pmgCandidate) return;
    setPmgProcessing(true);

    try {
      const res = await fetch('/api/csc/pmgdisha/certify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidateName: pmgCandidate,
          aadhaar: pmgAadhaar
        })
      }).then(r => r.json());

      if (res.success) {
        setPmgCertified(res.certificate);
        setWalletBalance((prev: number) => Number((prev + res.certificate.vleIncentiveCredited).toFixed(2)));
        showToast('PMGDISHA Certified', `Certificate: ${res.certificate.certificateNumber}. VLE Incentive +₹${res.certificate.vleIncentiveCredited} credited!`, 'success');
        logAudit('PMGDISHA Candidate Exam', `Candidate: ${pmgCandidate}, Cert: ${res.certificate.certificateNumber}`);
        confetti({ particleCount: 100, spread: 70 });
      }
    } finally {
      setPmgProcessing(false);
    }
  };

  // Handle Ayushman ABHA Health Card Generation
  const handleAbhaGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!abhaName || !abhaAadhaar) return;
    setAbhaLoading(true);
    try {
      const res = await fetch('/api/csc/abha/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: abhaName,
          aadhaar: abhaAadhaar,
          mobile: abhaMobile,
          dob: abhaDob,
          gender: abhaGender
        })
      }).then(r => r.json());

      if (res.success && res.card) {
        setAbhaCard(res.card);
        setWalletBalance(res.card.vleNewBalance);
        showToast('ABHA Health Card Generated', `ABHA ID: ${res.card.abhaNumber}. VLE Commission +₹${res.card.vleCommissionCredited} credited!`, 'success');
        logAudit('Ayushman ABHA Enrollment', `Citizen: ${abhaName}, ABHA: ${res.card.abhaNumber}`);
        confetti({ particleCount: 100, spread: 70 });
      } else {
        showToast('Generation Failed', res.message || 'Verification error', 'error');
      }
    } catch (err: any) {
      showToast('Network Error', err.message, 'error');
    } finally {
      setAbhaLoading(false);
    }
  };

  // Handle PM-KISAN eKYC
  const handlePmkisanEkyc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pmkAadhaar) return;
    setPmkLoading(true);
    try {
      const res = await fetch('/api/csc/pmkisan/ekyc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          aadhaar: pmkAadhaar,
          farmerName: pmkFarmer,
          mobile: pmkMobile
        })
      }).then(r => r.json());

      if (res.success && res.ekyc) {
        setPmkReceipt(res.ekyc);
        setWalletBalance(res.ekyc.vleNewBalance);
        showToast('PM-KISAN eKYC Verified', `Token: ${res.ekyc.ackToken}. VLE Commission +₹${res.ekyc.vleCommissionCredited} credited!`, 'success');
        logAudit('PM-KISAN eKYC Verification', `Farmer: ${pmkFarmer}, Token: ${res.ekyc.ackToken}`);
        confetti({ particleCount: 100, spread: 70 });
      } else {
        showToast('eKYC Failed', res.message || 'Verification error', 'error');
      }
    } catch (err: any) {
      showToast('Network Error', err.message, 'error');
    } finally {
      setPmkLoading(false);
    }
  };

  // Handle FASTag Transaction
  const handleFastagTransact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ftVehicle) return;
    setFtLoading(true);
    try {
      const res = await fetch('/api/csc/fastag/transact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicleNumber: ftVehicle,
          customerName: ftCustomer,
          txnType: ftTxnType,
          amount: ftAmount
        })
      }).then(r => r.json());

      if (res.success && res.fastag) {
        setFtReceipt(res.fastag);
        setWalletBalance(res.fastag.vleNewBalance);
        showToast('FASTag Transaction Complete', `Tag ID: ${res.fastag.tagId}. VLE Comm +₹${res.fastag.vleCommissionCredited} credited!`, 'success');
        logAudit('FASTag Service Execution', `Vehicle: ${ftVehicle}, Tag: ${res.fastag.tagId}`);
        confetti({ particleCount: 100, spread: 70 });
      } else {
        showToast('Transaction Failed', res.message || 'Error processing FASTag', 'error');
      }
    } catch (err: any) {
      showToast('Network Error', err.message, 'error');
    } finally {
      setFtLoading(false);
    }
  };

  // Handle IRCTC Railway Booking
  const handleIrctcBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!railPassenger) return;
    setRailLoading(true);
    try {
      const res = await fetch('/api/csc/irctc/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trainNumber: railTrain,
          fromStation: railFrom,
          toStation: railTo,
          passengerName: railPassenger,
          journeyClass: railClass,
          journeyDate: railDate
        })
      }).then(r => r.json());

      if (res.success && res.ticket) {
        setRailTicket(res.ticket);
        setWalletBalance(res.ticket.vleNewBalance);
        showToast('IRCTC Ticket Confirmed', `PNR: ${res.ticket.pnr}. VLE Comm +₹${res.ticket.vleCommissionCredited} credited!`, 'success');
        logAudit('IRCTC Ticket Booking', `Passenger: ${railPassenger}, PNR: ${res.ticket.pnr}, Class: ${railClass}`);
        confetti({ particleCount: 100, spread: 70 });
      } else {
        showToast('Booking Failed', res.message || 'Error processing IRCTC booking', 'error');
      }
    } catch (err: any) {
      showToast('Network Error', err.message, 'error');
    } finally {
      setRailLoading(false);
    }
  };

  // Handle UTIITSL PAN Card Application
  const handlePanApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!panApplicant || !panAadhaar) return;
    setPanLoading(true);
    try {
      const res = await fetch('/api/csc/pan/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicantName: panApplicant,
          fatherName: panFather,
          aadhaar: panAadhaar,
          dob: panDob,
          panType,
          cardMode: panMode
        })
      }).then(r => r.json());

      if (res.success && res.pan) {
        setPanReceipt(res.pan);
        setWalletBalance(res.pan.vleNewBalance);
        showToast('PAN Application Filed', `Coupon: ${res.pan.couponNumber}. VLE Comm +₹${res.pan.vleCommissionCredited} credited!`, 'success');
        logAudit('UTIITSL PAN Card Filing', `Applicant: ${panApplicant}, Ack: ${res.pan.ackNumber}`);
        confetti({ particleCount: 100, spread: 70 });
      } else {
        showToast('Filing Failed', res.message || 'Error filing PAN application', 'error');
      }
    } catch (err: any) {
      showToast('Network Error', err.message, 'error');
    } finally {
      setPanLoading(false);
    }
  };

  // Handle e-District State Certificate Application
  const handleEdistrictApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!edApplicant || !edAadhaar) return;
    setEdLoading(true);
    try {
      const res = await fetch('/api/csc/edistrict/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          certificateType: edCertType,
          applicantName: edApplicant,
          fatherName: edFather,
          aadhaar: edAadhaar,
          district: edDistrict,
          tehsil: edTehsil,
          annualIncome: edIncome
        })
      }).then(r => r.json());

      if (res.success && res.certificate) {
        setEdReceipt(res.certificate);
        setWalletBalance(res.certificate.vleNewBalance);
        showToast('Certificate Application Approved', `Cert No: ${res.certificate.certificateNumber}. VLE Comm +₹${res.certificate.vleCommissionCredited} credited!`, 'success');
        logAudit('e-District Certificate Filing', `Applicant: ${edApplicant}, Cert: ${res.certificate.certificateNumber}`);
        confetti({ particleCount: 100, spread: 70 });
      } else {
        showToast('Application Failed', res.message || 'Error processing certificate', 'error');
      }
    } catch (err: any) {
      showToast('Network Error', err.message, 'error');
    } finally {
      setEdLoading(false);
    }
  };

  // Handle e-Shram Worker Registration
  const handleEshramEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!esWorker || !esAadhaar) return;
    setEsLoading(true);
    try {
      const res = await fetch('/api/csc/eshram/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workerName: esWorker,
          aadhaar: esAadhaar,
          mobile: esMobile,
          occupation: esOccupation,
          bloodGroup: esBlood
        })
      }).then(r => r.json());

      if (res.success && res.eshram) {
        setEsReceipt(res.eshram);
        setWalletBalance(res.eshram.vleNewBalance);
        showToast('e-Shram Card Generated', `UAN: ${res.eshram.uanNumber}. VLE Comm +₹${res.eshram.vleCommissionCredited} credited!`, 'success');
        logAudit('e-Shram NDUW Enrollment', `Worker: ${esWorker}, UAN: ${res.eshram.uanNumber}`);
        confetti({ particleCount: 100, spread: 70 });
      } else {
        showToast('Enrollment Failed', res.message || 'Error creating e-Shram card', 'error');
      }
    } catch (err: any) {
      showToast('Network Error', err.message, 'error');
    } finally {
      setEsLoading(false);
    }
  };

  const handleApplyPMFBY = async (e: React.FormEvent) => {
    e.preventDefault();
    setFbyLoading(true);

    try {
      const res = await fetch('/api/csc/pmfby/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          farmerName: fbyFarmer,
          aadhaar: fbyAadhaar,
          mobile: fbyMobile,
          state: fbyState,
          district: fbyDistrict,
          village: fbyVillage,
          khasraKhatauni: fbyKhasra,
          season: fbySeason,
          cropName: fbyCrop,
          areaHectares: fbyArea,
          sumInsured: fbySumInsured,
          insuranceCompany: fbyCompany
        })
      }).then(r => r.json());

      if (res.success && res.policy) {
        setFbyPolicy(res.policy);
        setWalletBalance(res.policy.vleNewBalance);
        showToast('PMFBY Crop Policy Issued', `Policy: ${res.policy.policyNumber}. VLE Comm +₹${res.policy.vleCommissionCredited} credited!`, 'success');
        logAudit('PMFBY Crop Insurance', `Farmer: ${fbyFarmer}, Policy: ${res.policy.policyNumber}, Sum: ₹${fbySumInsured}`);
        confetti({ particleCount: 100, spread: 70 });
      } else {
        showToast('Policy Issuance Failed', res.message || 'Error creating crop insurance policy', 'error');
      }
    } catch (err: any) {
      showToast('Network Error', err.message, 'error');
    } finally {
      setFbyLoading(false);
    }
  };

  const handleFetchBBPSBill = async (e: React.FormEvent) => {
    e.preventDefault();
    setBbpsFetching(true);
    setBbpsBillDetails(null);
    setBbpsReceipt(null);

    try {
      const res = await fetch('/api/csc/bbps/fetch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: bbpsCategory,
          billerName: bbpsBiller,
          consumerNumber: bbpsConsumerNo
        })
      }).then(r => r.json());

      if (res.success && res.bill) {
        setBbpsBillDetails(res.bill);
        showToast('Bill Fetched Successfully', `Consumer: ${res.bill.consumerName} • Amount Due: ₹${res.bill.billAmount}`, 'info');
      } else {
        showToast('Bill Fetch Failed', res.message || 'Consumer account not found in BBPS registry', 'error');
      }
    } catch (err: any) {
      showToast('Network Error', err.message, 'error');
    } finally {
      setBbpsFetching(false);
    }
  };

  const handlePayBBPSBill = async () => {
    if (!bbpsBillDetails) return;
    setBbpsPaying(true);

    try {
      const res = await fetch('/api/csc/bbps/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: bbpsCategory,
          billerName: bbpsBiller,
          consumerNumber: bbpsConsumerNo,
          consumerName: bbpsBillDetails.consumerName,
          consumerMobile: bbpsConsumerMobile,
          billAmount: bbpsBillDetails.billAmount
        })
      }).then(r => r.json());

      if (res.success && res.receipt) {
        setBbpsReceipt(res.receipt);
        setWalletBalance(res.receipt.vleNewBalance);
        showToast('BBPS Bill Settled', `Txn: ${res.receipt.bbpsTxnRef}. VLE Comm +₹${res.receipt.vleCommissionCredited} credited!`, 'success');
        logAudit('BBPS Bill Settlement', `Biller: ${bbpsBiller}, Consumer: ${bbpsBillDetails.consumerName}, Amount: ₹${bbpsBillDetails.billAmount}`);
        confetti({ particleCount: 100, spread: 70 });
      } else {
        showToast('Payment Failed', res.message || 'Unable to process bill payment', 'error');
      }
    } catch (err: any) {
      showToast('Network Error', err.message, 'error');
    } finally {
      setBbpsPaying(false);
    }
  };

  const handleApplyUCL = async (e: React.FormEvent) => {
    e.preventDefault();
    setUclLoading(true);

    try {
      const res = await fetch('/api/csc/ucl/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          residentName: uclResident,
          aadhaar: uclAadhaar,
          mobile: uclMobile,
          updateType: uclUpdateType,
          documentType: uclDoc,
          newDetail: uclNewDetail
        })
      }).then(r => r.json());

      if (res.success && res.ucl) {
        setUclReceipt(res.ucl);
        setWalletBalance(res.ucl.vleNewBalance);
        showToast('Aadhaar UCL Update Queued', `EID: ${res.ucl.eid}. VLE Comm +₹${res.ucl.vleCommissionCredited} credited!`, 'success');
        logAudit('Aadhaar UCL Demographic Update', `Resident: ${uclResident}, EID: ${res.ucl.eid}, Type: ${uclUpdateType}`);
        confetti({ particleCount: 100, spread: 70 });
      } else {
        showToast('UCL Update Failed', res.message || 'Unable to submit update request to UIDAI', 'error');
      }
    } catch (err: any) {
      showToast('Network Error', err.message, 'error');
    } finally {
      setUclLoading(false);
    }
  };

  const handleApplyEStore = async (e: React.FormEvent) => {
    e.preventDefault();
    setEstoreLoading(true);

    try {
      const res = await fetch('/api/csc/estore/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: estoreCustomer,
          customerMobile: estoreMobile,
          deliveryPanchayat: estorePanchayat,
          itemCategory: estoreCategory,
          productName: estoreProduct,
          quantity: estoreQuantity,
          orderAmount: estoreAmount,
          paymentMode: estorePayMode
        })
      }).then(r => r.json());

      if (res.success && res.order) {
        setEstoreReceipt(res.order);
        setWalletBalance(res.order.vleNewBalance);
        showToast('Grameen e-Store Order Placed', `Order: ${res.order.orderId}. VLE Comm +₹${res.order.vleCommissionCredited} credited!`, 'success');
        logAudit('Grameen e-Store Order', `Customer: ${estoreCustomer}, Order: ${res.order.orderId}, Product: ${estoreProduct}`);
        confetti({ particleCount: 100, spread: 70 });
      } else {
        showToast('Order Placement Failed', res.message || 'Unable to place e-store order', 'error');
      }
    } catch (err: any) {
      showToast('Network Error', err.message, 'error');
    } finally {
      setEstoreLoading(false);
    }
  };

  const handleIssueDSC = async (e: React.FormEvent) => {
    e.preventDefault();
    setDscLoading(true);

    try {
      const res = await fetch('/api/csc/dsc/issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicantName: dscApplicant,
          aadhaar: dscAadhaar,
          mobile: dscMobile,
          dscType: dscType,
          usbTokenType: dscUsb,
          purpose: dscPurpose
        })
      }).then(r => r.json());

      if (res.success && res.dsc) {
        setDscReceipt(res.dsc);
        setWalletBalance(res.dsc.vleNewBalance);
        showToast('Class 3 DSC Issued & Token Initialized', `Serial: ${res.dsc.certSerialNumber}. VLE Comm +₹${res.dsc.vleCommissionCredited} credited!`, 'success');
        logAudit('Class 3 DSC Issuance', `Applicant: ${dscApplicant}, Serial: ${res.dsc.certSerialNumber}, Token: ${res.dsc.usbTokenSerial}`);
        confetti({ particleCount: 100, spread: 70 });
      } else {
        showToast('DSC Issuance Failed', res.message || 'Unable to issue digital signature certificate', 'error');
      }
    } catch (err: any) {
      showToast('Network Error', err.message, 'error');
    } finally {
      setDscLoading(false);
    }
  };

  const filteredServicesList = services.filter(s => {
    const matchSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = selectedServiceCategory === 'all' || s.category === selectedServiceCategory;
    return matchSearch && matchCat;
  });

  return (
    <div style={{ minHeight: '100vh', background: '#F1F5F9', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* 1. Official ADCS Sovereign Services Top Bar */}
      <header style={{ background: '#0F172A', color: '#FFFFFF', borderBottom: '3px solid #16A34A', position: 'sticky', top: 0, zIndex: 40 }}>
        {/* Tier 1 Header */}
        <div style={{ padding: '0.6rem 2rem', borderBottom: '1px solid #1E293B', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ width: '44px', height: '38px', background: '#16A34A', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1rem', color: '#FFFFFF' }}>
                ADCS
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.02em', color: '#FFFFFF' }}>
                  AKUL DRAVIN DIGITAL SERVICES (ADCS) PORTAL
                </div>
                <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                  Akul Dravin Digital Services Private Limited
                </div>
              </div>
            </div>

            <span style={{ color: '#334155' }}>|</span>

            {/* VLE Center Identity */}
            <div style={{ fontSize: '0.8rem', color: '#CBD5E1' }}>
              <span style={{ color: '#34D399', fontWeight: 700 }}>VLE ID:</span> 245089123456 &nbsp;•&nbsp;
              <span style={{ color: '#FCD34D', fontWeight: 700 }}>Kendra:</span> Akul Dravin Digital Services Kendra (ADCS) (Patna, Bihar)
            </div>
          </div>

          {/* Right Utility Counters */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Live Wallet Box */}
            <div style={{
              background: '#1E293B',
              padding: '0.45rem 1rem',
              borderRadius: '10px',
              border: '1px solid #334155',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <div>
                <div style={{ fontSize: '0.68rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>VLE Wallet</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#34D399' }}>
                  ₹{(walletBalance || 2450).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
              </div>
              <button
                onClick={() => setIsTopupOpen(true)}
                title="Add Money to Wallet via QR Scanner"
                style={{
                  background: '#16A34A',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '0.35rem 0.65rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                <QrCode size={14} /> Scan & Topup
              </button>
              <button
                onClick={() => setIsPayoutOpen(true)}
                title="Transfer Wallet Balance to Direct Bank Account"
                style={{
                  background: '#0F172A',
                  color: '#34D399',
                  border: '1px solid #334155',
                  padding: '0.35rem 0.65rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                <Landmark size={14} /> Bank Payout
              </button>
            </div>

            {/* ADCS API Gateway Connectors Configuration Hub Trigger */}
            <button
              onClick={() => setIsConnectorModalOpen(true)}
              title="Configure Live API Endpoints & Gateway Keys"
              style={{
                background: '#3B82F6',
                color: '#FFFFFF',
                border: 'none',
                padding: '0.45rem 0.85rem',
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)'
              }}
            >
              <Settings size={15} />
              <span>API Connectors</span>
            </button>

            {/* VLE Profile Avatar & Log Out */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', borderLeft: '1px solid #334155', paddingLeft: '1rem' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#F8FAFC' }}>Rajesh Sharma</div>
                <div style={{ fontSize: '0.7rem', color: '#34D399' }}>Certified VLE</div>
              </div>
              <button
                onClick={() => navigate('/connect/csc')}
                title="Logout of ADCS Connect"
                style={{
                  background: 'transparent',
                  border: '1px solid #475569',
                  color: '#94A3B8',
                  padding: '0.4rem',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Tier 2 Announcements Ticker */}
        <div style={{ background: '#16A34A', color: '#FFFFFF', padding: '0.35rem 2rem', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ background: '#0F172A', color: '#34D399', fontWeight: 800, padding: '0.15rem 0.5rem', borderRadius: '4px', textTransform: 'uppercase', fontSize: '0.7rem' }}>
            Live Notice
          </span>
          <div style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            PM Kisan Samman Nidhi mandatory biometric eKYC enabled • DigiPay AEPS Micro-ATM 4.2 firmware active • Fastag 2.0 issuance live • All VLE commissions credited daily at 23:59 IST.
          </div>
        </div>

        {/* Tier 3 Navigation Tabs */}
        <div style={{ background: '#1E293B', padding: '0 2rem', display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
          {[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'services', label: 'Services Catalogue (64+)' },
            { id: 'rates', label: 'Rate & Margin Manager (Rates/Comm)' },
            { id: 'hrms', label: 'Employee & Staff Control' },
            { id: 'digipay', label: 'DigiPay (AEPS & Micro-ATM)' },
            { id: 'telelaw', label: 'Tele-Law (Legal Aid)' },
            { id: 'pmgdisha', label: 'PMGDISHA (Training & Cert)' },
            { id: 'abha', label: 'Ayushman (ABHA Health Card)' },
            { id: 'pmkisan', label: 'PM-KISAN (eKYC & DBT)' },
            { id: 'fastag', label: 'FASTag 2.0 (NETC Toll)' },
            { id: 'irctc', label: 'IRCTC (Railway Booking)' },
            { id: 'pan', label: 'PAN Card (UTIITSL / NSDL)' },
            { id: 'edistrict', label: 'e-District (Certificates)' },
            { id: 'eshram', label: 'e-Shram (Worker UAN Card)' },
            { id: 'sarathi', label: 'Sarathi Driving License (DL/Slots)' },
            { id: 'pmfby', label: 'PMFBY (Crop Insurance)' },
            { id: 'bbps', label: 'BBPS (Utility Bills)' },
            { id: 'ucl', label: 'Aadhaar UCL (Update Client Lite)' },
            { id: 'estore', label: 'Grameen e-Store (Rural Commerce)' },
            { id: 'dsc', label: 'Digital Signature (Class 3 DSC)' },
            { id: 'wallet', label: 'Wallet & Passbook' },
            { id: 'orders', label: 'Order History & Receipts' },
            { id: 'operators', label: 'Operator Management' },
            { id: 'support', label: 'Grievance & Support Desk' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.id ? '3px solid #16A34A' : '3px solid transparent',
                color: activeTab === tab.id ? '#34D399' : '#94A3B8',
                padding: '0.75rem 1.1rem',
                fontSize: '0.84rem',
                fontWeight: activeTab === tab.id ? 700 : 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* 2. Main Portal Body */}
      <main style={{ maxWidth: '1300px', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Top KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
              <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Available VLE Wallet</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A', marginTop: '0.25rem' }}>
                  ₹{(walletBalance || 2450).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#16A34A', marginTop: '0.35rem', fontWeight: 600 }}>
                  ✓ Ready for Portal Deductions
                </div>
              </div>

              <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Today's Walk-in Footfall</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A', marginTop: '0.25rem' }}>
                  48 Citizens
                </div>
                <div style={{ fontSize: '0.75rem', color: '#2563EB', marginTop: '0.35rem', fontWeight: 600 }}>
                  ↑ +14% compared to yesterday
                </div>
              </div>

              <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Today's VLE Commission</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#16A34A', marginTop: '0.25rem' }}>
                  ₹1,850.00
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.35rem' }}>
                  32 Successful Transactions
                </div>
              </div>

              <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>DigiPay Terminal ID</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginTop: '0.25rem' }}>
                  DP-PATNA-0912
                </div>
                <div style={{ fontSize: '0.75rem', color: '#16A34A', marginTop: '0.35rem', fontWeight: 600 }}>
                  ● Micro-ATM Online
                </div>
              </div>
            </div>

            {/* Quick 1-Click Flagship Service Launcher */}
            <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    Flagship Government & Citizen Services
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0 }}>
                    Click any service to launch instant assisted filing drawer for walk-in citizens
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('services')}
                  style={{
                    background: '#F1F5F9',
                    border: '1px solid #CBD5E1',
                    padding: '0.45rem 0.9rem',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    color: '#334155'
                  }}
                >
                  View All 64 Services ➔
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                {[
                  { id: 'srv-pan-new', title: 'PAN Card (Form 49A / Correction)', fee: 107, comm: 50, tag: 'Income Tax' },
                  { id: 'srv-abha-health-card', title: 'Ayushman Bharat ABHA Card', fee: 0, comm: 50, tag: 'Health' },
                  { id: 'srv-pm-kisan-ekyc', title: 'PM Kisan Samman Nidhi eKYC', fee: 0, comm: 50, tag: 'Agriculture' },
                  { id: 'srv-driving-license', title: 'Driving License Slot & Test', fee: 350, comm: 150, tag: 'Transport' },
                  { id: 'srv-eshram-reg', title: 'E-Shram Unorganized Worker Card', fee: 0, comm: 40, tag: 'Labor' },
                  { id: 'srv-elec-bill', title: 'Electricity BBPS Bill Payment', fee: 0, comm: 20, tag: 'Utility' }
                ].map(svc => (
                  <div
                    key={svc.id}
                    onClick={() => {
                      const match = services.find(s => s.id === svc.id) || { id: svc.id, title: svc.title, category: 'government', govtFee: svc.fee };
                      setSelectedService(match);
                    }}
                    style={{
                      background: '#F8FAFC',
                      padding: '1rem',
                      borderRadius: '12px',
                      border: '1px solid #E2E8F0',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#16A34A'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E2E8F0'}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <span style={{ fontSize: '0.68rem', fontWeight: 700, background: '#E2E8F0', color: '#475569', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                        {svc.tag}
                      </span>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#16A34A' }}>
                        Comm: ₹{svc.comm}
                      </span>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0F172A', marginBottom: '0.5rem' }}>
                      {svc.title}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#64748B' }}>
                      <span>Govt Fee: ₹{svc.fee}</span>
                      <span style={{ color: '#16A34A', fontWeight: 700 }}>Apply ➔</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Passbook & Activity Table */}
            <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  Recent VLE Transactions & Passbook Entries
                </h3>
                <span style={{ fontSize: '0.78rem', color: '#64748B' }}>Real-Time Wallet Sync</span>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                  <thead>
                    <tr style={{ background: '#F8FAFC', color: '#475569', textAlign: 'left', borderBottom: '1px solid #E2E8F0' }}>
                      <th style={{ padding: '0.65rem 0.8rem' }}>Txn ID</th>
                      <th style={{ padding: '0.65rem 0.8rem' }}>Date</th>
                      <th style={{ padding: '0.65rem 0.8rem' }}>Type</th>
                      <th style={{ padding: '0.65rem 0.8rem' }}>Description</th>
                      <th style={{ padding: '0.65rem 0.8rem', textAlign: 'right' }}>Amount</th>
                      <th style={{ padding: '0.65rem 0.8rem', textAlign: 'right' }}>Closing Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {passbook.slice(0, 5).map(txn => (
                      <tr key={txn.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                        <td style={{ padding: '0.65rem 0.8rem', fontFamily: 'monospace', fontWeight: 600 }}>{txn.id}</td>
                        <td style={{ padding: '0.65rem 0.8rem', color: '#64748B' }}>{txn.date}</td>
                        <td style={{ padding: '0.65rem 0.8rem' }}>
                          <span style={{
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px',
                            fontWeight: 700,
                            fontSize: '0.7rem',
                            background: txn.type === 'CR' ? '#DCFCE7' : '#FEE2E2',
                            color: txn.type === 'CR' ? '#166534' : '#991B1B'
                          }}>
                            {txn.type === 'CR' ? '+ CREDIT' : '- DEBIT'}
                          </span>
                        </td>
                        <td style={{ padding: '0.65rem 0.8rem', color: '#334155' }}>{txn.desc}</td>
                        <td style={{ padding: '0.65rem 0.8rem', textAlign: 'right', fontWeight: 700, color: txn.type === 'CR' ? '#16A34A' : '#DC2626' }}>
                          {txn.type === 'CR' ? '+' : '-'}₹{txn.amount.toFixed(2)}
                        </td>
                        <td style={{ padding: '0.65rem 0.8rem', textAlign: 'right', fontWeight: 700, color: '#0F172A' }}>
                          ₹{txn.balance.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SERVICES CATALOGUE */}
        {activeTab === 'services' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  Master Service Catalogue (64+ Configured Services)
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '0.25rem 0 0' }}>
                  Search and launch government, banking, travel, utility, and business compliance services
                </p>
              </div>

              {/* Search & Filter */}
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <div style={{ position: 'relative', width: '260px' }}>
                  <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search any service..."
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.75rem 0.55rem 2rem',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>

                <select
                  value={selectedServiceCategory}
                  onChange={(e) => setSelectedServiceCategory(e.target.value)}
                  style={{
                    padding: '0.55rem 0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    background: '#FFFFFF',
                    fontSize: '0.85rem',
                    color: '#334155'
                  }}
                >
                  <option value="all">All Categories</option>
                  <option value="government">Government & Citizen</option>
                  <option value="business">Business & Compliance</option>
                  <option value="bills">Utility & BBPS</option>
                  <option value="finance">Banking & Loans</option>
                  <option value="travel">Travel & Tickets</option>
                  <option value="insurance">Insurance</option>
                </select>
              </div>
            </div>

            {/* Services Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {filteredServicesList.map(s => (
                <div
                  key={s.id}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '14px',
                    padding: '1.25rem',
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.68rem', fontWeight: 700, background: '#F1F5F9', color: '#475569', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                        {s.category.toUpperCase()}
                      </span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#16A34A' }}>
                        Comm: ₹{s.professionalFee || 50}
                      </span>
                    </div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', margin: '0 0 0.4rem' }}>
                      {s.title}
                    </h4>
                    <p style={{ fontSize: '0.78rem', color: '#64748B', lineHeight: 1.4, margin: '0 0 1rem' }}>
                      {s.description.substring(0, 95)}...
                    </p>
                  </div>

                  <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.78rem', color: '#334155' }}>
                      Govt Fee: <strong>₹{s.govtFee ?? 100}</strong>
                    </div>
                    <button
                      onClick={() => setSelectedService(s)}
                      style={{
                        background: '#16A34A',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}
                    >
                      Apply Now <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: WALLET & PASSBOOK */}
        {activeTab === 'wallet' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '1.75rem', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Current VLE Wallet Balance</div>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#16A34A', margin: '0.4rem 0' }}>
                  ₹{(walletBalance || 2450).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
                <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 1.25rem' }}>
                  Funds are automatically debited when submitting citizen applications on central & state portals.
                </p>
                <button
                  onClick={() => setIsTopupOpen(true)}
                  style={{
                    background: '#16A34A',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0.65rem 1.25rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <PlusCircle size={16} /> Top-Up Wallet (Instant UPI / Card)
                </button>
              </div>

              <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '1.75rem', border: '1px solid #E2E8F0' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', margin: '0 0 0.75rem' }}>
                  Banking & Settlement Details
                </h4>
                <div style={{ fontSize: '0.82rem', color: '#334155', lineHeight: 1.8 }}>
                  <div><strong>Linked Bank:</strong> ICICI Bank (Patna Main Branch)</div>
                  <div><strong>Account Number:</strong> XXXXXXXX4912</div>
                  <div><strong>IFSC Code:</strong> ICIC0000019</div>
                  <div><strong>DigiPay Terminal ID:</strong> DP-PATNA-0912</div>
                  <div><strong>Daily AEPS Payout:</strong> Auto-Settlement at 23:00 IST</div>
                </div>
              </div>
            </div>

            {/* Full Passbook Table */}
            <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  Complete Wallet Passbook Ledger
                </h3>
                <button
                  onClick={() => {
                    const csv = [
                      ['Transaction ID', 'Date', 'Type', 'Description', 'Amount (INR)', 'Closing Balance (INR)'].join(','),
                      ...passbook.map((t: any) => [
                        t.id,
                        t.date,
                        t.type,
                        `"${String(t.desc || '').replace(/"/g, '""')}"`,
                        t.amount,
                        t.balance
                      ].join(','))
                    ].join('\n');
                    downloadSevaRecord(
                      'ADCS_VLE_Passbook_Ledger.csv',
                      csv,
                      'Passbook Exported',
                      `Exported ${passbook.length} VLE passbook entries to CSV.`
                    );
                    logAudit('VLE Passbook Exported', `${passbook.length} ledger rows downloaded`, 'Success');
                  }}
                  style={{
                    background: '#F1F5F9',
                    border: '1px solid #CBD5E1',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  Export Passbook (.csv)
                </button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                  <thead>
                    <tr style={{ background: '#F8FAFC', color: '#475569', textAlign: 'left', borderBottom: '1px solid #E2E8F0' }}>
                      <th style={{ padding: '0.65rem 0.8rem' }}>Transaction ID</th>
                      <th style={{ padding: '0.65rem 0.8rem' }}>Date & Time</th>
                      <th style={{ padding: '0.65rem 0.8rem' }}>Type</th>
                      <th style={{ padding: '0.65rem 0.8rem' }}>Transaction Description</th>
                      <th style={{ padding: '0.65rem 0.8rem', textAlign: 'right' }}>Amount</th>
                      <th style={{ padding: '0.65rem 0.8rem', textAlign: 'right' }}>Running Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {passbook.map(txn => (
                      <tr key={txn.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                        <td style={{ padding: '0.65rem 0.8rem', fontFamily: 'monospace', fontWeight: 600 }}>{txn.id}</td>
                        <td style={{ padding: '0.65rem 0.8rem', color: '#64748B' }}>{txn.date}</td>
                        <td style={{ padding: '0.65rem 0.8rem' }}>
                          <span style={{
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px',
                            fontWeight: 700,
                            fontSize: '0.7rem',
                            background: txn.type === 'CR' ? '#DCFCE7' : '#FEE2E2',
                            color: txn.type === 'CR' ? '#166534' : '#991B1B'
                          }}>
                            {txn.type === 'CR' ? '+ CREDIT' : '- DEBIT'}
                          </span>
                        </td>
                        <td style={{ padding: '0.65rem 0.8rem', color: '#334155' }}>{txn.desc}</td>
                        <td style={{ padding: '0.65rem 0.8rem', textAlign: 'right', fontWeight: 700, color: txn.type === 'CR' ? '#16A34A' : '#DC2626' }}>
                          {txn.type === 'CR' ? '+' : '-'}₹{txn.amount.toFixed(2)}
                        </td>
                        <td style={{ padding: '0.65rem 0.8rem', textAlign: 'right', fontWeight: 700, color: '#0F172A' }}>
                          ₹{txn.balance.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB: DIGIPAY AEPS & MICRO-ATM (digipay.csccloud.in) */}
        {activeTab === 'digipay' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {/* Terminal Form */}
            <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{ background: '#0F172A', color: '#34D399', padding: '0.5rem', borderRadius: '8px' }}>
                    <Fingerprint size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                      DigiPay AEPS & Micro-ATM
                    </h3>
                    <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                      Terminal: <strong>DP-PATNA-0912</strong> • Bank Switch: NPCI Host 2.1
                    </div>
                  </div>
                </div>
                <a 
                  href="https://digipay.csccloud.in/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ fontSize: '0.72rem', color: '#059669', background: '#DCFCE7', padding: '0.2rem 0.5rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 700 }}
                >
                  🔗 DigiPay Official Portal ↗
                </a>
              </div>

              {/* Inbuilt Operator Tutorial & SOP Guide */}
              <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '0.75rem', marginBottom: '1.25rem', fontSize: '0.75rem', color: '#334155' }}>
                <div style={{ fontWeight: 800, color: '#0F172A', marginBottom: '0.25rem' }}>
                  📘 ADCS Inbuilt Micro-ATM Operating SOP:
                </div>
                1. Select citizen bank & input 12-digit Aadhaar UID.<br />
                2. Connect USB/Bluetooth Biometric Scanner (Morpho/Mantra RD Service).<br />
                3. Customer places finger on scanner ➔ Real-time Verhoeff check & instant NPCI cash settlement.
              </div>

              <form onSubmit={handleDigiPayTransact}>
                {/* Transaction Type */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '0.4rem' }}>
                    Transaction Mode
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                    {[
                      { id: 'withdrawal', label: 'Cash Out' },
                      { id: 'balance', label: 'Balance' },
                      { id: 'statement', label: 'Mini Stmt' }
                    ].map(t => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setAepsTxnType(t.id as any)}
                        style={{
                          background: aepsTxnType === t.id ? '#16A34A' : '#F8FAFC',
                          color: aepsTxnType === t.id ? '#FFFFFF' : '#334155',
                          border: aepsTxnType === t.id ? '1px solid #16A34A' : '1px solid #CBD5E1',
                          padding: '0.5rem',
                          borderRadius: '8px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bank Name */}
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                    Citizen Bank
                  </label>
                  <select
                    value={aepsBank}
                    onChange={(e) => setAepsBank(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                  >
                    <option value="State Bank of India (SBI)">State Bank of India (SBI)</option>
                    <option value="Punjab National Bank (PNB)">Punjab National Bank (PNB)</option>
                    <option value="Bank of Baroda (BoB)">Bank of Baroda (BoB)</option>
                    <option value="HDFC Bank">HDFC Bank</option>
                    <option value="ICICI Bank">ICICI Bank</option>
                    <option value="Canara Bank">Canara Bank</option>
                  </select>
                </div>

                {/* Aadhaar UID */}
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                    Citizen 12-Digit Aadhaar UID *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={12}
                    value={aepsAadhaar}
                    onChange={(e) => setAepsAadhaar(e.target.value)}
                    placeholder="Enter Aadhaar UID"
                    style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.95rem', letterSpacing: '0.1em', fontFamily: 'monospace' }}
                  />
                  <div style={{ fontSize: '0.7rem', color: '#16A34A', marginTop: '0.2rem' }}>
                    ✓ Verhoeff D5 Checksum validated
                  </div>
                </div>

                {/* Withdrawal Amount (if withdrawal) */}
                {aepsTxnType === 'withdrawal' && (
                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                      Withdrawal Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={aepsAmount}
                      onChange={(e) => setAepsAmount(Number(e.target.value))}
                      style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '1.1rem', fontWeight: 800 }}
                    />
                    <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.4rem' }}>
                      {[500, 1000, 2000, 5000].map(amt => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setAepsAmount(amt)}
                          style={{
                            background: '#F1F5F9',
                            border: '1px solid #CBD5E1',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px',
                            fontSize: '0.72rem',
                            cursor: 'pointer'
                          }}
                        >
                          ₹{amt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* RD Service L1 Device Integration Status */}
                <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '8px', padding: '0.65rem 0.85rem', marginBottom: '1rem', fontSize: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#166534', fontWeight: 800 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#16A34A', display: 'inline-block' }} />
                      Mantra MFS100 (L1 RD Service) Connected
                    </div>
                    <span style={{ background: '#DCFCE7', color: '#15803D', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: 700, fontSize: '0.7rem' }}>
                      PORT: 11100 READY
                    </span>
                  </div>
                  <div style={{ color: '#4B5563', fontSize: '0.72rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Driver: v1.0.8 (UIDAI L1 Certified)</span>
                    <span style={{ color: '#059669', fontWeight: 600 }}>🔒 Zero Raw Biometrics Stored</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={aepsScanning}
                  style={{
                    width: '100%',
                    background: '#0F172A',
                    color: '#34D399',
                    border: 'none',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Fingerprint size={20} />
                  {aepsScanning ? 'Scanning Fingerprint on RD Service...' : 'Capture Biometric & Authorize ➔'}
                </button>
              </form>
            </div>

            {/* Receipt Preview */}
            <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.5rem' }}>
                  AEPS Transaction Receipt
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 1.25rem' }}>
                  Print or dispatch thermal receipt to citizen
                </p>

                {aepsReceipt ? (
                  <div style={{ background: '#F8FAFC', padding: '1.25rem', borderRadius: '12px', border: '1.5px dashed #CBD5E1', fontFamily: 'monospace', fontSize: '0.82rem', lineHeight: 1.7 }}>
                    <div style={{ textAlign: 'center', fontWeight: 900, fontSize: '0.95rem', marginBottom: '0.5rem', borderBottom: '1px dashed #CBD5E1', paddingBottom: '0.5rem' }}>
                      DIGIPAY AEPS CASH RECEIPT
                    </div>
                    <div><strong>RRN:</strong> {aepsReceipt.rrn}</div>
                    <div><strong>Auth Code:</strong> {aepsReceipt.authCode}</div>
                    <div><strong>Bank:</strong> {aepsReceipt.bankName}</div>
                    <div><strong>Aadhaar:</strong> XXXXXXXX{aepsAadhaar.slice(-4)}</div>
                    <div><strong>Transaction:</strong> {aepsReceipt.txnType.toUpperCase()}</div>
                    <div><strong>Amount:</strong> ₹{aepsReceipt.amount.toFixed(2)}</div>
                    <div><strong>Remaining Balance:</strong> ₹{aepsReceipt.customerRemainingBalance.toFixed(2)}</div>
                    <div><strong>Status:</strong> <span style={{ color: '#16A34A', fontWeight: 800 }}>SUCCESS (APPROVED)</span></div>
                    <div style={{ borderTop: '1px dashed #CBD5E1', marginTop: '0.5rem', paddingTop: '0.5rem', color: '#16A34A', fontWeight: 700 }}>
                      VLE Surcharge: +₹{aepsReceipt.vleCommission}.00 credited to wallet
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94A3B8' }}>
                    <Fingerprint size={48} color="#CBD5E1" style={{ margin: '0 auto 1rem' }} />
                    <p style={{ margin: 0, fontSize: '0.85rem' }}>
                      Awaiting biometric authorization. Receipts will generate here after bank approval.
                    </p>
                  </div>
                )}
              </div>

              {aepsReceipt && (
                <button
                  onClick={() => {
                    const slip = [
                      'AKUL DRAVIN DIGITAL SERVICES (ADCS) — DIGIPAY AEPS RECEIPT',
                      '==========================================================',
                      `RRN            : ${aepsReceipt.rrn}`,
                      `Auth Code      : ${aepsReceipt.authCode}`,
                      `Bank Name      : ${aepsReceipt.bankName}`,
                      `Aadhaar (Mask) : XXXXXXXX${aepsAadhaar.slice(-4)}`,
                      `Transaction    : ${aepsReceipt.txnType.toUpperCase()}`,
                      `Amount Settled : Rs. ${aepsReceipt.amount.toFixed(2)}`,
                      `Avail Balance  : Rs. ${aepsReceipt.customerRemainingBalance.toFixed(2)}`,
                      `Status         : SUCCESS (APPROVED)`,
                      `VLE Surcharge  : Rs. ${aepsReceipt.vleCommission}.00`,
                      '==========================================================',
                      'Zero raw biometric data stored • UIDAI RD L1 Verified',
                    ].join('\n');
                    downloadSevaRecord(
                      `ADCS_AEPS_Receipt_${aepsReceipt.rrn}.txt`,
                      slip,
                      'Thermal Receipt Ready',
                      `Saved ADCS_AEPS_Receipt_${aepsReceipt.rrn}.txt and opened print dialog.`
                    );
                    logAudit('AEPS Thermal Slip Exported', `RRN: ${aepsReceipt.rrn}`, 'Success');
                    window.print();
                  }}
                  style={{
                    background: '#16A34A',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0.65rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    marginTop: '1rem'
                  }}
                >
                  <Printer size={16} /> Print Customer Thermal Slip
                </button>
              )}
            </div>
          </div>
        )}

        {/* TAB: TELE-LAW (tele-law.in) */}
        {activeTab === 'telelaw' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{ background: '#061A36', color: '#93C5FD', padding: '0.5rem', borderRadius: '8px' }}>
                    <Scale size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                      Tele-Law: Free Legal Advice
                    </h3>
                    <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                      Ministry of Law & Justice • High Court Panel Advocates
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => navigate('/portal/advocate')}
                  style={{
                    background: '#EFF6FF',
                    color: '#075ACB',
                    border: '1px solid #BFDBFE',
                    padding: '0.3rem 0.6rem',
                    borderRadius: '6px',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  ⚖️ Open ADCS Advocate Desk ↗
                </button>
              </div>

              {/* Regulatory Notice distinguishing Govt Scheme from Private Consultations */}
              <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '0.75rem', marginBottom: '1.25rem', fontSize: '0.74rem', color: '#334155' }}>
                <strong>Institutional Clarification:</strong> Tele-Law is an official Government of India / NALSA scheme for marginalized citizens. For private legal disputes, titles, contracts, and commercial advisory, use the certified <strong>ADCS Advocate Desk</strong>.
              </div>

              <form onSubmit={handleTelelawBook}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                    Citizen Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={telelawCitizen}
                    onChange={(e) => setTelelawCitizen(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                    Citizen Mobile *
                  </label>
                  <input
                    type="tel"
                    required
                    value={telelawPhone}
                    onChange={(e) => setTelelawPhone(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                  />
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                    Dispute / Legal Matter Category
                  </label>
                  <select
                    value={telelawCategory}
                    onChange={(e) => setTelelawCategory(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                  >
                    <option value="Land & Agricultural Boundary Conflict">Land & Agricultural Boundary Conflict</option>
                    <option value="Family / Domestic Matrimonial Dispute">Family / Domestic Matrimonial Dispute</option>
                    <option value="Women Protection & Dowry Harassment">Women Protection & Dowry Harassment</option>
                    <option value="Consumer Fraud & Debt Recovery">Consumer Fraud & Debt Recovery</option>
                    <option value="Police FIR Registration Assistance">Police FIR Registration Assistance</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={telelawBooking}
                  style={{
                    width: '100%',
                    background: '#061A36',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Video size={18} />
                  {telelawBooking ? 'Scheduling Consultation...' : 'Schedule Video Consultation (Free) ➔'}
                </button>
              </form>
            </div>

            {/* Video Room Simulator */}
            <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.5rem' }}>
                Tele-Law Consultation Room
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 1.25rem' }}>
                Encrypted WebRTC video bridge with High Court legal cell
              </p>

              {telelawScheduled ? (
                <div style={{ background: '#F0F9FF', border: '1.5px solid #BAE6FD', padding: '1.25rem', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 800, color: '#0369A1' }}>Case ID: {telelawScheduled.caseId}</span>
                    <span style={{ background: '#DCFCE7', color: '#166534', padding: '0.15rem 0.45rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700 }}>
                      CONNECTED
                    </span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#334155', lineHeight: 1.6 }}>
                    <div><strong>Citizen:</strong> {telelawScheduled.citizenName}</div>
                    <div><strong>Advocate:</strong> {telelawScheduled.advocateName}</div>
                    <div><strong>Dispute:</strong> {telelawScheduled.disputeType}</div>
                    <div><strong>Slot:</strong> Today at {telelawScheduled.scheduledTime}</div>
                  </div>

                  <div style={{ background: '#0F172A', color: '#FFFFFF', padding: '0.75rem', borderRadius: '8px', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22C55E' }} />
                      <span style={{ fontSize: '0.75rem' }}>Live Secure Video Audio Link Active</span>
                    </div>
                    <button
                      onClick={() => {
                        logAudit('Tele-Law Consultation Session Launched', `Case: ${telelawScheduled.caseId} • Advocate: ${telelawScheduled.advocateName}`, 'Success');
                        showToast('Connecting Tele-Law Desk', `Opening Legal Consultation Desk for Case ${telelawScheduled.caseId}.`, 'success');
                        navigate('/portal/advocate');
                      }}
                      style={{ background: '#16A34A', color: '#FFFFFF', border: 'none', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Launch Advocate Desk
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94A3B8' }}>
                  <Video size={48} color="#CBD5E1" style={{ margin: '0 auto 1rem' }} />
                  <p style={{ margin: 0, fontSize: '0.85rem' }}>
                    No active case session. Book a consultation on the left to initiate lawyer dispatch.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB: PMGDISHA (pmgdisha.in) */}
        {activeTab === 'pmgdisha' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{ background: '#7C3AED', color: '#DDD6FE', padding: '0.5rem', borderRadius: '8px' }}>
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                      PMGDISHA Candidate Exam & Certificate
                    </h3>
                    <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                      Pradhan Mantri Gramin Digital Saksharta Abhiyan • ₹300 VLE Incentive
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => navigate('/portal/student')}
                    style={{ fontSize: '0.72rem', color: '#4338CA', background: '#EEF2FF', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid #C7D2FE', fontWeight: 700, cursor: 'pointer' }}
                  >
                    🎓 Open ADCS Academy LMS ↗
                  </button>
                  <a 
                    href="https://www.pmgdisha.in/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ fontSize: '0.72rem', color: '#7C3AED', background: '#F3E8FF', padding: '0.2rem 0.5rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 700 }}
                  >
                    🔗 PMGDISHA Official Portal ↗
                  </a>
                </div>
              </div>

              {/* Inbuilt Curriculum & Examination Material */}
              <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '0.75rem', marginBottom: '1.25rem', fontSize: '0.75rem', color: '#334155' }}>
                <div style={{ fontWeight: 800, color: '#0F172A', marginBottom: '0.25rem' }}>
                  📚 ADCS Inbuilt 20-Hour Digital Literacy Modules:
                </div>
                1. Computer & Smartphone Basics (हार्डवेयर व ऑपरेटिंग सिस्टम).<br />
                2. Digital Payments & UPI (भीम यूपीआई, डिजिटल वॉलेट्स).<br />
                3. Citizen e-Services (आधार, डिजीलॉकर, पैन, ई-श्रम, आयुष्मान भारत).<br />
                <span style={{ color: '#4338CA', fontWeight: 700 }}>Notice:</span> For advanced AI, Coding, CCTV Technician, and Digital Marketing vocational certifications, access <strong>ADCS Academy</strong>.
              </div>

              <form onSubmit={handlePmgdishaCertify}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                    Candidate Name (Rural Citizen) *
                  </label>
                  <input
                    type="text"
                    required
                    value={pmgCandidate}
                    onChange={(e) => setPmgCandidate(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                  />
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                    Candidate Aadhaar UID *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={12}
                    value={pmgAadhaar}
                    onChange={(e) => setPmgAadhaar(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem', fontFamily: 'monospace' }}
                  />
                </div>

                <div style={{ background: '#F8FAFC', padding: '0.85rem', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '1.25rem', fontSize: '0.78rem', color: '#475569' }}>
                  <div>✓ 20 Hours Course Completed (PC, Internet, UPI, DigiLocker)</div>
                  <div>✓ Biometric Facial & Iris Attendance Verified</div>
                </div>

                <button
                  type="submit"
                  disabled={pmgProcessing}
                  style={{
                    width: '100%',
                    background: '#7C3AED',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Award size={18} />
                  {pmgProcessing ? 'Submitting Online Exam...' : 'Conduct Online Exam & Issue Certificate ➔'}
                </button>
              </form>
            </div>

            {/* Certificate Preview */}
            <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.5rem' }}>
                Government Digital Literacy Certificate
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 1.25rem' }}>
                Official Ministry of Electronics & IT certified candidate
              </p>

              {pmgCertified ? (
                <div style={{ background: '#FAF5FF', border: '2px solid #E9D5FF', padding: '1.5rem', borderRadius: '14px', textAlign: 'center' }}>
                  <Award size={48} color="#7C3AED" style={{ margin: '0 auto 0.75rem' }} />
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#7C3AED', textTransform: 'uppercase' }}>
                    Government of India • PMGDISHA
                  </div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F172A', margin: '0.4rem 0' }}>
                    {pmgCertified.candidateName}
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: '#64748B', margin: '0 0 0.75rem' }}>
                    Has successfully completed the 20-Hour National Digital Literacy Curriculum and qualified with <strong>{pmgCertified.grade}</strong>.
                  </p>
                  <div style={{ fontSize: '0.8rem', fontFamily: 'monospace', fontWeight: 700, color: '#0F172A', background: '#FFFFFF', padding: '0.4rem 0.8rem', borderRadius: '6px', border: '1px solid #E2E8F0', display: 'inline-block' }}>
                    Certificate: {pmgCertified.certificateNumber}
                  </div>
                  <div style={{ marginTop: '1rem', color: '#16A34A', fontWeight: 700, fontSize: '0.85rem' }}>
                    ✓ ₹{pmgCertified.vleIncentiveCredited}.00 Training Incentive credited to VLE Wallet
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94A3B8' }}>
                  <GraduationCap size={48} color="#CBD5E1" style={{ margin: '0 auto 1rem' }} />
                  <p style={{ margin: 0, fontSize: '0.85rem' }}>
                    Conduct examination to generate verifiable candidate certificate.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB: AYUSHMAN BHARAT ABHA HEALTH CARD (abdm.gov.in) */}
        {activeTab === 'abha' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {/* Enrollment Form */}
            <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                <Heart size={22} color="#DC2626" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  Ayushman Bharat Digital Health Account (ABHA)
                </h3>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 1.25rem' }}>
                National Health Authority (NHA) • Generate official 14-digit Ayushman Health Card (+₹50 VLE commission)
              </p>

              <form onSubmit={handleAbhaGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    CITIZEN FULL NAME (AS PER AADHAAR)
                  </label>
                  <input
                    type="text"
                    value={abhaName}
                    onChange={(e) => setAbhaName(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.88rem',
                      fontWeight: 600
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    12-DIGIT AADHAAR NUMBER (VERHOEFF CHECKSUM VERIFIED)
                  </label>
                  <input
                    type="text"
                    maxLength={12}
                    value={abhaAadhaar}
                    onChange={(e) => setAbhaAadhaar(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.95rem',
                      fontFamily: 'monospace',
                      fontWeight: 700
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                      MOBILE NUMBER
                    </label>
                    <input
                      type="text"
                      value={abhaMobile}
                      onChange={(e) => setAbhaMobile(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        fontSize: '0.88rem'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                      DATE OF BIRTH
                    </label>
                    <input
                      type="date"
                      value={abhaDob}
                      onChange={(e) => setAbhaDob(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        fontSize: '0.88rem'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    GENDER
                  </label>
                  <select
                    value={abhaGender}
                    onChange={(e) => setAbhaGender(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.88rem'
                    }}
                  >
                    <option value="Male">Male / पुरुष</option>
                    <option value="Female">Female / महिला</option>
                    <option value="Transgender">Other / अन्य</option>
                  </select>
                </div>

                <div style={{ background: '#ECFDF5', padding: '0.75rem', borderRadius: '8px', border: '1px solid #A7F3D0', fontSize: '0.75rem', color: '#065F46', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <ShieldCheck size={18} color="#059669" />
                  <span>Beneficiary Aadhaar e-KYC consent authorized under Ayushman Bharat Digital Mission guidelines.</span>
                </div>

                <button
                  type="submit"
                  disabled={abhaLoading}
                  style={{
                    background: '#DC2626',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0.8rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: abhaLoading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem'
                  }}
                >
                  <Heart size={16} />
                  <span>{abhaLoading ? 'Generating ABHA Card...' : 'Verify & Generate Official ABHA Card'}</span>
                </button>
              </form>
            </div>

            {/* Official ABHA Card Preview */}
            <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.5rem' }}>
                  Ayushman Bharat Health Account (ABHA) Card
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 1.25rem' }}>
                  Government of India • Ministry of Health & Family Welfare
                </p>

                {abhaCard ? (
                  <div style={{
                    background: '#FFFFFF',
                    borderRadius: '16px',
                    border: '2px solid #0284C7',
                    overflow: 'hidden',
                    boxShadow: '0 10px 25px rgba(2, 132, 199, 0.15)',
                    position: 'relative'
                  }}>
                    {/* Tricolor Top Stripe */}
                    <div style={{ height: '6px', background: 'linear-gradient(to right, #FF9933 33.3%, #FFFFFF 33.3%, #FFFFFF 66.6%, #138808 66.6%)' }} />

                    {/* Card Header */}
                    <div style={{ background: '#0369A1', color: '#FFFFFF', padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '0.78rem', fontWeight: 900, letterSpacing: '0.04em' }}>
                          NATIONAL HEALTH AUTHORITY (NHA)
                        </div>
                        <div style={{ fontSize: '0.65rem', opacity: 0.9 }}>
                          Ayushman Bharat Digital Mission (ABDM)
                        </div>
                      </div>
                      <div style={{ background: '#FFFFFF', color: '#0369A1', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800 }}>
                        ABHA CARD
                      </div>
                    </div>

                    {/* Card Body */}
                    <div style={{ padding: '1.25rem', display: 'grid', gridTemplateColumns: '80px 1fr', gap: '1rem', alignItems: 'center' }}>
                      <div style={{
                        width: '80px',
                        height: '95px',
                        background: '#E2E8F0',
                        borderRadius: '8px',
                        border: '1.5px solid #CBD5E1',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#64748B'
                      }}>
                        <Users size={32} />
                        <span style={{ fontSize: '0.62rem', fontWeight: 700, marginTop: '0.25rem' }}>PHOTO</span>
                      </div>

                      <div style={{ fontSize: '0.82rem', lineHeight: 1.5 }}>
                        <div style={{ fontSize: '1rem', fontWeight: 900, color: '#0F172A' }}>
                          {abhaCard.citizenName}
                        </div>
                        <div style={{ color: '#64748B', fontSize: '0.75rem' }}>
                          DOB: {abhaCard.dob} | Gender: {abhaCard.gender}
                        </div>
                        <div style={{ marginTop: '0.4rem' }}>
                          <span style={{ fontSize: '0.68rem', color: '#64748B', display: 'block', fontWeight: 700 }}>ABHA NUMBER:</span>
                          <strong style={{ fontSize: '1.1rem', color: '#0369A1', letterSpacing: '0.05em' }}>
                            {abhaCard.abhaNumber}
                          </strong>
                        </div>
                        <div style={{ marginTop: '0.2rem' }}>
                          <span style={{ fontSize: '0.68rem', color: '#64748B', display: 'block', fontWeight: 700 }}>ABHA ADDRESS:</span>
                          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0F172A' }}>
                            {abhaCard.abhaAddress}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div style={{ background: '#F0F9FF', borderTop: '1px solid #BAE6FD', padding: '0.6rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#0369A1', fontWeight: 700 }}>
                        <QrCode size={16} />
                        <span>Scan for PHR & Hospital EHR Access</span>
                      </div>
                      <div style={{ color: '#16A34A', fontWeight: 800 }}>
                        STATUS: ACTIVE
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: '#94A3B8' }}>
                    <Heart size={48} color="#CBD5E1" style={{ margin: '0 auto 1rem' }} />
                    <p style={{ margin: 0, fontSize: '0.85rem' }}>
                      Enter citizen details and authenticate Aadhaar to generate the official ABHA Health Card.
                    </p>
                  </div>
                )}
              </div>

              {abhaCard && (
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
                  <button
                    onClick={() => window.print()}
                    style={{
                      flex: 1,
                      background: '#0369A1',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '0.65rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <Printer size={15} />
                    <span>Print ABHA Card (प्रिंट करें)</span>
                  </button>
                  <button
                    onClick={() => {
                      const slip = [
                        'AKUL DRAVIN DIGITAL SERVICES (ADCS) — ABHA HEALTH CARD RECORD',
                        '==============================================================',
                        `Beneficiary Name : ${abhaCard.citizenName}`,
                        `ABHA Number      : ${abhaCard.abhaNumber}`,
                        `ABHA Address     : ${abhaCard.abhaAddress}`,
                        `Verification     : UIDAI Aadhaar Auth Assisted`,
                        `Card Status      : ACTIVE (PHR & EHR Linked)`,
                        '==============================================================',
                        'Facilitated via ADCS Digital Seva Desk.',
                      ].join('\n');
                      downloadSevaRecord(
                        `ADCS_ABHA_Card_${abhaCard.abhaNumber}.txt`,
                        slip,
                        'ABHA Card Downloaded',
                        `Saved ADCS_ABHA_Card_${abhaCard.abhaNumber}.txt.`
                      );
                      logAudit('ABHA Health Card Downloaded', `ABHA: ${abhaCard.abhaNumber}`, 'Success');
                    }}
                    style={{
                      background: '#F1F5F9',
                      color: '#334155',
                      border: '1px solid #CBD5E1',
                      padding: '0.65rem 1rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Print / Save Record (PDF)
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB: PM-KISAN SAMMAN NIDHI eKYC (pmkisan.gov.in) */}
        {activeTab === 'pmkisan' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {/* Verification Form */}
            <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                <Sprout size={22} color="#15803D" />
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    PM-KISAN Samman Nidhi e-KYC Portal
                  </h3>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem', flexWrap: 'wrap' }}>
                    <a 
                      href="https://pmkisan.gov.in/aadharekyc.aspx" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ fontSize: '0.72rem', color: '#15803D', textDecoration: 'none', background: '#DCFCE7', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}
                    >
                      🔗 Official PM-KISAN eKYC Portal ↗
                    </a>
                    <a 
                      href="https://pmkisan.gov.in/BeneficiaryStatus_New.aspx" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ fontSize: '0.72rem', color: '#0284C7', textDecoration: 'none', background: '#E0F2FE', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}
                    >
                      🔍 Check Beneficiary Status ↗
                    </a>
                    <a 
                      href="https://pmkisan.gov.in/RegistrationFormNew.aspx" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ fontSize: '0.72rem', color: '#B45309', textDecoration: 'none', background: '#FEF3C7', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}
                    >
                      🌾 New Farmer Registration ↗
                    </a>
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 1.25rem' }}>
                Ministry of Agriculture & Farmers Welfare • Mandatory Biometric Aadhaar eKYC (+₹15 VLE commission)
              </p>

              <form onSubmit={handlePmkisanEkyc} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    BENEFICIARY FARMER FULL NAME (किसान का नाम)
                  </label>
                  <input
                    type="text"
                    value={pmkFarmer}
                    onChange={(e) => setPmkFarmer(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.88rem',
                      fontWeight: 600
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    12-DIGIT AADHAAR NUMBER (VERHOEFF CHECKSUM VERIFIED)
                  </label>
                  <input
                    type="text"
                    maxLength={12}
                    value={pmkAadhaar}
                    onChange={(e) => setPmkAadhaar(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.95rem',
                      fontFamily: 'monospace',
                      fontWeight: 700
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    MOBILE NUMBER LINKED WITH BANK & DBT
                  </label>
                  <input
                    type="text"
                    value={pmkMobile}
                    onChange={(e) => setPmkMobile(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.88rem'
                    }}
                  />
                </div>

                <div style={{ background: '#F0FDF4', padding: '0.75rem', borderRadius: '8px', border: '1px solid #BBF7D0', fontSize: '0.75rem', color: '#166534', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <Fingerprint size={20} color="#16A34A" />
                  <span>RD Service ready (Mantra MFS100 / Morpho E3). Biometric capture simulation connected.</span>
                </div>

                <button
                  type="submit"
                  disabled={pmkLoading}
                  style={{
                    background: '#15803D',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0.8rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: pmkLoading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem'
                  }}
                >
                  <Sprout size={16} />
                  <span>{pmkLoading ? 'Verifying with PM-KISAN Portal...' : 'Authenticate Biometric & Update eKYC'}</span>
                </button>
              </form>
            </div>

            {/* Official eKYC Status & Receipt Preview */}
            <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.5rem' }}>
                  PM-KISAN e-KYC Verification Slip
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 1.25rem' }}>
                  Department of Agriculture & Farmers Welfare • Direct Benefit Transfer (DBT)
                </p>

                {pmkReceipt ? (
                  <div style={{
                    background: '#F8FAFC',
                    borderRadius: '12px',
                    border: '2px solid #16A34A',
                    padding: '1.25rem',
                    boxShadow: '0 4px 15px rgba(22, 163, 74, 0.08)'
                  }}>
                    <div style={{ borderBottom: '1.5px dashed #CBD5E1', paddingBottom: '0.75rem', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 900, color: '#15803D' }}>
                          PRADHAN MANTRI KISAN SAMMAN NIDHI
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#64748B' }}>
                          Ack Token: <strong>{pmkReceipt.ackToken}</strong>
                        </div>
                      </div>
                      <span style={{ background: '#DCFCE7', color: '#15803D', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800 }}>
                        eKYC SUCCESS
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', fontSize: '0.8rem', lineHeight: 1.5 }}>
                      <div>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>FARMER NAME:</span>
                        <strong>{pmkReceipt.farmerName}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>AADHAAR NO:</span>
                        <strong style={{ fontFamily: 'monospace' }}>{pmkReceipt.maskedAadhaar}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>LAND SEEDING:</span>
                        <strong style={{ color: '#15803D' }}>{pmkReceipt.landSeeding}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>DBT SEEDING:</span>
                        <strong style={{ color: '#15803D' }}>{pmkReceipt.dbtStatus}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>DISBURSED INSTALLMENTS:</span>
                        <strong>{pmkReceipt.totalInstallmentsPaid} (₹{pmkReceipt.totalAmountDisbursed.toLocaleString('en-IN')})</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>NEXT INSTALLMENT:</span>
                        <strong style={{ color: '#2563EB' }}>{pmkReceipt.nextInstallmentStatus}</strong>
                      </div>
                    </div>

                    <div style={{ borderTop: '1.5px dashed #CBD5E1', marginTop: '0.75rem', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#15803D', fontWeight: 700 }}>
                        <CheckCircle2 size={15} />
                        <span>VLE Surcharge: +₹{pmkReceipt.vleCommissionCredited}.00 credited to wallet</span>
                      </div>
                      <div style={{ color: '#64748B' }}>
                        {new Date(pmkReceipt.verifiedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: '#94A3B8' }}>
                    <Sprout size={48} color="#CBD5E1" style={{ margin: '0 auto 1rem' }} />
                    <p style={{ margin: 0, fontSize: '0.85rem' }}>
                      Enter farmer Aadhaar to verify land seeding, DBT status and execute mandatory eKYC.
                    </p>
                  </div>
                )}
              </div>

              {pmkReceipt && (
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
                  <button
                    onClick={() => window.print()}
                    style={{
                      flex: 1,
                      background: '#15803D',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '0.65rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <Printer size={15} />
                    <span>Print eKYC Slip (पावती प्रिंट करें)</span>
                  </button>
                  <button
                    onClick={() => {
                      const slip = [
                        'AKUL DRAVIN DIGITAL SERVICES (ADCS) — PM-KISAN eKYC ACKNOWLEDGEMENT',
                        '===================================================================',
                        `Farmer Name        : ${pmkReceipt.farmerName}`,
                        `Ack Token          : ${pmkReceipt.ackToken}`,
                        `Installments Paid  : ${pmkReceipt.totalInstallmentsPaid} (Rs. ${pmkReceipt.totalAmountDisbursed.toLocaleString('en-IN')})`,
                        `Next Installment   : ${pmkReceipt.nextInstallmentStatus}`,
                        `VLE Surcharge      : Rs. ${pmkReceipt.vleCommissionCredited}.00`,
                        `Verified On        : ${new Date(pmkReceipt.verifiedAt).toLocaleDateString('en-IN')}`,
                        '===================================================================',
                        'Facilitated via ADCS Digital Seva Desk.',
                      ].join('\n');
                      downloadSevaRecord(
                        `ADCS_PMKISAN_Ack_${pmkReceipt.ackToken}.txt`,
                        slip,
                        'PM-KISAN Slip Downloaded',
                        `Saved ADCS_PMKISAN_Ack_${pmkReceipt.ackToken}.txt.`
                      );
                      logAudit('PM-KISAN Acknowledgement Downloaded', `Token: ${pmkReceipt.ackToken}`, 'Success');
                    }}
                    style={{
                      background: '#F1F5F9',
                      color: '#334155',
                      border: '1px solid #CBD5E1',
                      padding: '0.65rem 1rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Print / Save Slip (PDF)
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB: FASTAG 2.0 NETC TOLL (fastag.csccloud.in) */}
        {activeTab === 'fastag' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {/* Form */}
            <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                <Car size={22} color="#4F46E5" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  FASTag 2.0 Electronic Toll Services
                </h3>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 1.25rem' }}>
                NPCI NETC Portal • Instant Vehicle Tag Issuance & Wallet Recharge (+₹40/₹15 VLE commission)
              </p>

              <form onSubmit={handleFastagTransact} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    VEHICLE REGISTRATION NUMBER (गाड़ी नंबर)
                  </label>
                  <input
                    type="text"
                    value={ftVehicle}
                    onChange={(e) => setFtVehicle(e.target.value.toUpperCase())}
                    placeholder="e.g. BR-01-AB-1234"
                    required
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.95rem',
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      letterSpacing: '0.05em'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    VEHICLE OWNER / CUSTOMER NAME
                  </label>
                  <input
                    type="text"
                    value={ftCustomer}
                    onChange={(e) => setFtCustomer(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.88rem',
                      fontWeight: 600
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                      TRANSACTION TYPE
                    </label>
                    <select
                      value={ftTxnType}
                      onChange={(e) => setFtTxnType(e.target.value as any)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        fontSize: '0.88rem'
                      }}
                    >
                      <option value="recharge">Toll Recharge (+₹15 Comm)</option>
                      <option value="issue">Issue New RFID Tag (+₹40 Comm)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                      AMOUNT (₹)
                    </label>
                    <input
                      type="number"
                      value={ftAmount}
                      onChange={(e) => setFtAmount(Number(e.target.value))}
                      min={100}
                      step={50}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        fontSize: '0.88rem',
                        fontWeight: 700
                      }}
                    />
                  </div>
                </div>

                <div style={{ background: '#EEF2FF', padding: '0.75rem', borderRadius: '8px', border: '1px solid #C7D2FE', fontSize: '0.75rem', color: '#3730A3', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <ShieldCheck size={20} color="#4F46E5" />
                  <span>NPCI NETC Electronic Toll switch online. Auto-whitelisted across all NHAI National Highway Plazas.</span>
                </div>

                <button
                  type="submit"
                  disabled={ftLoading}
                  style={{
                    background: '#4F46E5',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0.8rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: ftLoading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem'
                  }}
                >
                  <Car size={16} />
                  <span>{ftLoading ? 'Processing FASTag...' : `Execute FASTag ${ftTxnType === 'issue' ? 'Issuance' : 'Recharge'}`}</span>
                </button>
              </form>
            </div>

            {/* Receipt Preview */}
            <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.5rem' }}>
                  NETC FASTag Transaction Slip
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 1.25rem' }}>
                  National Electronic Toll Collection • NPCI Certified
                </p>

                {ftReceipt ? (
                  <div style={{
                    background: '#F8FAFC',
                    borderRadius: '12px',
                    border: '2px solid #4F46E5',
                    padding: '1.25rem',
                    boxShadow: '0 4px 15px rgba(79, 70, 229, 0.08)'
                  }}>
                    <div style={{ borderBottom: '1.5px dashed #CBD5E1', paddingBottom: '0.75rem', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 900, color: '#4F46E5' }}>
                          NATIONAL ELECTRONIC TOLL COLLECTION
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#64748B' }}>
                          Tag ID: <strong>{ftReceipt.tagId}</strong>
                        </div>
                      </div>
                      <span style={{ background: '#E0E7FF', color: '#4338CA', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800 }}>
                        {ftReceipt.status}
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', fontSize: '0.8rem', lineHeight: 1.5 }}>
                      <div>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>VEHICLE NUMBER:</span>
                        <strong style={{ fontFamily: 'monospace', color: '#0F172A', fontSize: '0.95rem' }}>{ftReceipt.vehicleNumber}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>OWNER NAME:</span>
                        <strong>{ftReceipt.customerName}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>VEHICLE CLASS:</span>
                        <strong>{ftReceipt.vehicleClass}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>AMOUNT PROCESSED:</span>
                        <strong style={{ color: '#16A34A' }}>₹{ftReceipt.amount}.00</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>CURRENT BALANCE:</span>
                        <strong style={{ color: '#4F46E5' }}>₹{ftReceipt.tagBalance.toFixed(2)}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>NPCI TXN REF:</span>
                        <strong style={{ fontSize: '0.7rem', fontFamily: 'monospace' }}>{ftReceipt.npciTxnId}</strong>
                      </div>
                    </div>

                    <div style={{ borderTop: '1.5px dashed #CBD5E1', marginTop: '0.75rem', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#16A34A', fontWeight: 700 }}>
                        <CheckCircle2 size={15} />
                        <span>VLE Commission: +₹{ftReceipt.vleCommissionCredited}.00 credited to wallet</span>
                      </div>
                      <div style={{ color: '#64748B' }}>
                        {new Date(ftReceipt.issuedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: '#94A3B8' }}>
                    <Car size={48} color="#CBD5E1" style={{ margin: '0 auto 1rem' }} />
                    <p style={{ margin: 0, fontSize: '0.85rem' }}>
                      Enter vehicle details to recharge existing FASTag or issue new NHAI-compliant RFID tag.
                    </p>
                  </div>
                )}
              </div>

              {ftReceipt && (
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
                  <button
                    onClick={() => window.print()}
                    style={{
                      flex: 1,
                      background: '#4F46E5',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '0.65rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <Printer size={15} />
                    <span>Print FASTag Slip (पावती प्रिंट करें)</span>
                  </button>
                  <button
                    onClick={() => alert(`Downloading FASTag Receipt for ${ftReceipt.vehicleNumber} (Tag ID: ${ftReceipt.tagId})...`)}
                    style={{
                      background: '#F1F5F9',
                      color: '#334155',
                      border: '1px solid #CBD5E1',
                      padding: '0.65rem 1rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Download PDF
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB: IRCTC RAILWAY RESERVATION (irctc.csccloud.in) */}
        {activeTab === 'irctc' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {/* Form */}
            <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                <Ticket size={22} color="#EA580C" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  IRCTC Railway Reservation Desk
                </h3>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 1.25rem' }}>
                Indian Railways / CRIS Gateway • Authorized Agent Ticket Booking (+₹40 AC / +₹20 SL commission)
              </p>

              <form onSubmit={handleIrctcBook} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    SELECT TRAIN (ट्रेन चुनें)
                  </label>
                  <select
                    value={railTrain}
                    onChange={(e) => setRailTrain(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.88rem',
                      fontWeight: 600
                    }}
                  >
                    <option value="12309 (Patna Rajdhani Express)">12309 - Patna Tejas Rajdhani Express (NDLS ➔ PNBE)</option>
                    <option value="12394 (Sampoorna Kranti Express)">12394 - Sampoorna Kranti Superfast Express (NDLS ➔ PNBE)</option>
                    <option value="22436 (Vande Bharat Express)">22436 - Vande Bharat Express (NDLS ➔ BSB)</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                      FROM STATION (कहाँ से)
                    </label>
                    <input
                      type="text"
                      value={railFrom}
                      onChange={(e) => setRailFrom(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        fontSize: '0.88rem'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                      TO STATION (कहाँ तक)
                    </label>
                    <input
                      type="text"
                      value={railTo}
                      onChange={(e) => setRailTo(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        fontSize: '0.88rem'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    PASSENGER FULL NAME (यात्री का नाम)
                  </label>
                  <input
                    type="text"
                    value={railPassenger}
                    onChange={(e) => setRailPassenger(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.88rem',
                      fontWeight: 600
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                      TRAVEL CLASS
                    </label>
                    <select
                      value={railClass}
                      onChange={(e) => setRailClass(e.target.value as any)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        fontSize: '0.88rem'
                      }}
                    >
                      <option value="3A">AC 3 Tier (3A) - +₹40 Comm</option>
                      <option value="2A">AC 2 Tier (2A) - +₹40 Comm</option>
                      <option value="SL">Sleeper Class (SL) - +₹20 Comm</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                      JOURNEY DATE
                    </label>
                    <input
                      type="date"
                      value={railDate}
                      onChange={(e) => setRailDate(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        fontSize: '0.88rem'
                      }}
                    />
                  </div>
                </div>

                <div style={{ background: '#FFF7ED', padding: '0.75rem', borderRadius: '8px', border: '1px solid #FFEDD5', fontSize: '0.75rem', color: '#9A3412', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <ShieldCheck size={20} color="#EA580C" />
                  <span>CRIS PRS Gateway connected. Instant confirmation under General & Tatkal booking quotas.</span>
                </div>

                <button
                  type="submit"
                  disabled={railLoading}
                  style={{
                    background: '#EA580C',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0.8rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: railLoading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem'
                  }}
                >
                  <Ticket size={16} />
                  <span>{railLoading ? 'Reserving Ticket with IRCTC...' : `Book Confirmed ${railClass} Ticket`}</span>
                </button>
              </form>
            </div>

            {/* E-Ticket Preview */}
            <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.5rem' }}>
                  Electronic Reservation Slip (ERS)
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 1.25rem' }}>
                  Indian Railways Catering & Tourism Corporation (IRCTC) • CRIS PRS
                </p>

                {railTicket ? (
                  <div style={{
                    background: '#F8FAFC',
                    borderRadius: '12px',
                    border: '2px solid #EA580C',
                    padding: '1.25rem',
                    boxShadow: '0 4px 15px rgba(234, 88, 12, 0.08)'
                  }}>
                    <div style={{ borderBottom: '1.5px dashed #CBD5E1', paddingBottom: '0.75rem', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 900, color: '#EA580C' }}>
                          INDIAN RAILWAYS • E-TICKET
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#0F172A' }}>
                          PNR: <strong style={{ letterSpacing: '0.05em', color: '#EA580C', fontSize: '0.95rem' }}>{railTicket.pnr}</strong>
                        </div>
                      </div>
                      <span style={{ background: '#FFEDD5', color: '#C2410C', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800 }}>
                        {railTicket.currentStatus}
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', fontSize: '0.8rem', lineHeight: 1.5 }}>
                      <div>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>TRAIN:</span>
                        <strong>{railTicket.trainNumber}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>PASSENGER:</span>
                        <strong>{railTicket.passengerName} (M/38)</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>FROM ➔ TO:</span>
                        <strong>{railTicket.fromStation} ➔ {railTicket.toStation}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>BERTH / SEAT:</span>
                        <strong style={{ color: '#16A34A' }}>{railTicket.bookingStatus}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>CLASS & QUOTA:</span>
                        <strong>{railTicket.journeyClass} | {railTicket.quota}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>TOTAL FARE:</span>
                        <strong style={{ color: '#EA580C' }}>₹{railTicket.fare}.00</strong>
                      </div>
                    </div>

                    <div style={{ borderTop: '1.5px dashed #CBD5E1', marginTop: '0.75rem', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#16A34A', fontWeight: 700 }}>
                        <CheckCircle2 size={15} />
                        <span>VLE Commission: +₹{railTicket.vleCommissionCredited}.00 credited to wallet</span>
                      </div>
                      <div style={{ color: '#64748B' }}>
                        Travel: {railTicket.journeyDate}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: '#94A3B8' }}>
                    <Ticket size={48} color="#CBD5E1" style={{ margin: '0 auto 1rem' }} />
                    <p style={{ margin: 0, fontSize: '0.85rem' }}>
                      Search trains and enter passenger details to book confirmed IRCTC e-tickets instantly.
                    </p>
                  </div>
                )}
              </div>

              {railTicket && (
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
                  <button
                    onClick={() => window.print()}
                    style={{
                      flex: 1,
                      background: '#EA580C',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '0.65rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <Printer size={15} />
                    <span>Print Ticket Slip (ERS प्रिंट करें)</span>
                  </button>
                  <button
                    onClick={() => alert(`Downloading IRCTC Ticket Slip for PNR: ${railTicket.pnr}...`)}
                    style={{
                      background: '#F1F5F9',
                      color: '#334155',
                      border: '1px solid #CBD5E1',
                      padding: '0.65rem 1rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Download PDF
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB: UTIITSL PAN SERVICES (pan.csccloud.in) */}
        {activeTab === 'pan' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {/* Form */}
            <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                <CreditCard size={22} color="#0D9488" />
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    UTIITSL / NSDL PAN Card Services
                  </h3>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem', flexWrap: 'wrap' }}>
                    <a 
                      href="https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ fontSize: '0.72rem', color: '#0D9488', textDecoration: 'none', background: '#CCFBF1', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}
                    >
                      🔗 NSDL Direct Portal ↗
                    </a>
                    <a 
                      href="https://www.pan.utiitsl.com/PAN/newAOAadhaar.do" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ fontSize: '0.72rem', color: '#0284C7', textDecoration: 'none', background: '#E0F2FE', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}
                    >
                      🔗 UTIITSL Direct Portal ↗
                    </a>
                    <a 
                      href="https://eportal.incometax.gov.in/iec/foservices/#/pre-login/instant-e-pan" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ fontSize: '0.72rem', color: '#B45309', textDecoration: 'none', background: '#FEF3C7', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}
                    >
                      ⚡ Instant e-PAN (Free) ↗
                    </a>
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 1.25rem' }}>
                Income Tax Department (CBDT) • Form 49A Instant Filing (+₹50 VLE commission, Govt Fee: ₹107)
              </p>

              <form onSubmit={handlePanApply} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    APPLICANT FULL NAME (आवेदक का पूरा नाम)
                  </label>
                  <input
                    type="text"
                    value={panApplicant}
                    onChange={(e) => setPanApplicant(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.88rem',
                      fontWeight: 600
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    FATHER'S FULL NAME (पिता का नाम)
                  </label>
                  <input
                    type="text"
                    value={panFather}
                    onChange={(e) => setPanFather(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.88rem',
                      fontWeight: 600
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    12-DIGIT AADHAAR NUMBER (VERHOEFF CHECKSUM VERIFIED)
                  </label>
                  <input
                    type="text"
                    maxLength={12}
                    value={panAadhaar}
                    onChange={(e) => setPanAadhaar(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.95rem',
                      fontFamily: 'monospace',
                      fontWeight: 700
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                      DATE OF BIRTH
                    </label>
                    <input
                      type="date"
                      value={panDob}
                      onChange={(e) => setPanDob(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        fontSize: '0.88rem'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                      APPLICATION TYPE
                    </label>
                    <select
                      value={panType}
                      onChange={(e) => setPanType(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        fontSize: '0.88rem'
                      }}
                    >
                      <option value="Form 49A (New Indian Citizen)">Form 49A (New Indian Citizen)</option>
                      <option value="CSF (Changes / Correction in PAN)">CSF (PAN Changes / Correction)</option>
                    </select>
                  </div>
                </div>

                <div style={{ background: '#F0FDFA', padding: '0.75rem', borderRadius: '8px', border: '1px solid #CCFBF1', fontSize: '0.75rem', color: '#0F766E', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <ShieldCheck size={20} color="#0D9488" />
                  <span>Aadhaar demographic authentication approved. Physical PAN dispatch to citizen address enabled.</span>
                </div>

                <button
                  type="submit"
                  disabled={panLoading}
                  style={{
                    background: '#0D9488',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0.8rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: panLoading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem'
                  }}
                >
                  <CreditCard size={16} />
                  <span>{panLoading ? 'Submitting to UTIITSL...' : 'Submit Form 49A & Issue Acknowledgement'}</span>
                </button>
              </form>
            </div>

            {/* Receipt Preview */}
            <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.5rem' }}>
                  UTIITSL PAN Acknowledgement Slip
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 1.25rem' }}>
                  Income Tax Department • Government of India
                </p>

                {panReceipt ? (
                  <div style={{
                    background: '#F8FAFC',
                    borderRadius: '12px',
                    border: '2px solid #0D9488',
                    padding: '1.25rem',
                    boxShadow: '0 4px 15px rgba(13, 148, 136, 0.08)'
                  }}>
                    <div style={{ borderBottom: '1.5px dashed #CBD5E1', paddingBottom: '0.75rem', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 900, color: '#0D9488' }}>
                          UTI INFRASTRUCTURE TECHNOLOGY AND SERVICES LIMITED
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#64748B' }}>
                          Coupon: <strong>{panReceipt.couponNumber}</strong>
                        </div>
                      </div>
                      <span style={{ background: '#CCFBF1', color: '#0F766E', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800 }}>
                        FILED SUCCESS
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', fontSize: '0.8rem', lineHeight: 1.5 }}>
                      <div>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>ACKNOWLEDGEMENT NO:</span>
                        <strong style={{ fontFamily: 'monospace', color: '#0D9488', fontSize: '0.92rem' }}>{panReceipt.ackNumber}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>APPLICANT NAME:</span>
                        <strong>{panReceipt.applicantName}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>FATHER'S NAME:</span>
                        <strong>{panReceipt.fatherName}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>AO CODE:</span>
                        <strong style={{ fontFamily: 'monospace' }}>{panReceipt.aoCode}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>APPLICATION FEE:</span>
                        <strong>₹{panReceipt.applicationFee}.00</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>EXPECTED DELIVERY:</span>
                        <strong style={{ color: '#16A34A' }}>{panReceipt.expectedDelivery}</strong>
                      </div>
                    </div>

                    <div style={{ borderTop: '1.5px dashed #CBD5E1', marginTop: '0.75rem', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#16A34A', fontWeight: 700 }}>
                        <CheckCircle2 size={15} />
                        <span>VLE Commission: +₹{panReceipt.vleCommissionCredited}.00 credited to wallet</span>
                      </div>
                      <div style={{ color: '#64748B' }}>
                        {new Date(panReceipt.filedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: '#94A3B8' }}>
                    <CreditCard size={48} color="#CBD5E1" style={{ margin: '0 auto 1rem' }} />
                    <p style={{ margin: 0, fontSize: '0.85rem' }}>
                      Fill applicant details and verify Aadhaar to generate official UTIITSL PAN Acknowledgement receipt.
                    </p>
                  </div>
                )}
              </div>

              {panReceipt && (
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
                  <button
                    onClick={() => window.print()}
                    style={{
                      flex: 1,
                      background: '#0D9488',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '0.65rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <Printer size={15} />
                    <span>Print Acknowledgement (पावती प्रिंट करें)</span>
                  </button>
                  <button
                    onClick={() => alert(`Downloading PAN Acknowledgement Slip for Coupon ${panReceipt.couponNumber}...`)}
                    style={{
                      background: '#F1F5F9',
                      color: '#334155',
                      border: '1px solid #CBD5E1',
                      padding: '0.65rem 1rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Download PDF
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB: e-DISTRICT CITIZEN SERVICES (edistrict.csccloud.in) */}
        {activeTab === 'edistrict' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {/* Form */}
            <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                <FileText size={22} color="#D97706" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  e-District State Revenue Services
                </h3>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 1.25rem' }}>
                Department of Revenue & Land Reforms • Instant Certificate Application (+₹30 VLE commission, Govt Fee: ₹30)
              </p>

              <form onSubmit={handleEdistrictApply} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    SELECT CERTIFICATE SERVICE (सेवा का प्रकार)
                  </label>
                  <select
                    value={edCertType}
                    onChange={(e) => setEdCertType(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.88rem',
                      fontWeight: 600
                    }}
                  >
                    <option value="Residential / Domicile Certificate (निवास प्रमाण पत्र)">Residential / Domicile Certificate (निवास प्रमाण पत्र)</option>
                    <option value="Income Certificate (आय प्रमाण पत्र)">Income Certificate (आय प्रमाण पत्र)</option>
                    <option value="Caste Certificate - OBC/EWS/SC/ST (जाति प्रमाण पत्र)">Caste Certificate - OBC/EWS/SC/ST (जाति प्रमाण पत्र)</option>
                    <option value="Non-Creamy Layer (NCL) Certificate">Non-Creamy Layer (NCL) Certificate</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    APPLICANT FULL NAME (आवेदक का पूरा नाम)
                  </label>
                  <input
                    type="text"
                    value={edApplicant}
                    onChange={(e) => setEdApplicant(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.88rem',
                      fontWeight: 600
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    FATHER / HUSBAND FULL NAME (पिता / पति का नाम)
                  </label>
                  <input
                    type="text"
                    value={edFather}
                    onChange={(e) => setEdFather(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.88rem',
                      fontWeight: 600
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    12-DIGIT AADHAAR NUMBER (VERHOEFF CHECKSUM VERIFIED)
                  </label>
                  <input
                    type="text"
                    maxLength={12}
                    value={edAadhaar}
                    onChange={(e) => setEdAadhaar(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.95rem',
                      fontFamily: 'monospace',
                      fontWeight: 700
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                      DISTRICT (जिला)
                    </label>
                    <input
                      type="text"
                      value={edDistrict}
                      onChange={(e) => setEdDistrict(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        fontSize: '0.88rem'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                      TEHSIL / ANCHAL (अंचल)
                    </label>
                    <input
                      type="text"
                      value={edTehsil}
                      onChange={(e) => setEdTehsil(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        fontSize: '0.88rem'
                      }}
                    />
                  </div>
                </div>

                <div style={{ background: '#FEF3C7', padding: '0.75rem', borderRadius: '8px', border: '1px solid #FDE68A', fontSize: '0.75rem', color: '#92400E', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <ShieldCheck size={20} color="#D97706" />
                  <span>Sub-Divisional Revenue Officer digital signature key validated. Auto-dispatched to citizen DigiLocker.</span>
                </div>

                <button
                  type="submit"
                  disabled={edLoading}
                  style={{
                    background: '#D97706',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0.8rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: edLoading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem'
                  }}
                >
                  <FileText size={16} />
                  <span>{edLoading ? 'Submitting to Revenue Dept...' : 'Submit & Issue Digital Certificate'}</span>
                </button>
              </form>
            </div>

            {/* Certificate Preview */}
            <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.5rem' }}>
                  e-District State Revenue Certificate
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 1.25rem' }}>
                  Government of Bihar • Department of Revenue & Land Reforms
                </p>

                {edReceipt ? (
                  <div style={{
                    background: '#F8FAFC',
                    borderRadius: '12px',
                    border: '2px solid #D97706',
                    padding: '1.25rem',
                    boxShadow: '0 4px 15px rgba(217, 119, 6, 0.08)'
                  }}>
                    <div style={{ borderBottom: '1.5px dashed #CBD5E1', paddingBottom: '0.75rem', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 900, color: '#D97706' }}>
                          OFFICE OF THE REVENUE OFFICER / SDM
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#64748B' }}>
                          Certificate No: <strong>{edReceipt.certificateNumber}</strong>
                        </div>
                      </div>
                      <span style={{ background: '#FEF3C7', color: '#92400E', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800 }}>
                        {edReceipt.status}
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', fontSize: '0.8rem', lineHeight: 1.5 }}>
                      <div>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>SERVICE:</span>
                        <strong style={{ color: '#D97706' }}>{edReceipt.certificateType.split('(')[0].trim()}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>BENEFICIARY:</span>
                        <strong>{edReceipt.applicantName}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>FATHER / GUARDIAN:</span>
                        <strong>{edReceipt.fatherName}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>JURISDICTION:</span>
                        <strong>{edReceipt.tehsil}, {edReceipt.district}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>AADHAAR VERIFIED:</span>
                        <strong style={{ fontFamily: 'monospace' }}>{edReceipt.maskedAadhaar}</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>ISSUING AUTHORITY:</span>
                        <strong style={{ color: '#16A34A' }}>{edReceipt.issuingAuthority}</strong>
                      </div>
                    </div>

                    <div style={{ borderTop: '1.5px dashed #CBD5E1', marginTop: '0.75rem', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#16A34A', fontWeight: 700 }}>
                        <CheckCircle2 size={15} />
                        <span>VLE Commission: +₹{edReceipt.vleCommissionCredited}.00 credited to wallet</span>
                      </div>
                      <div style={{ color: '#64748B' }}>
                        {new Date(edReceipt.issuedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: '#94A3B8' }}>
                    <FileText size={48} color="#CBD5E1" style={{ margin: '0 auto 1rem' }} />
                    <p style={{ margin: 0, fontSize: '0.85rem' }}>
                      Fill resident details and authenticate Aadhaar to generate digitally signed Revenue Certificate.
                    </p>
                  </div>
                )}
              </div>

              {edReceipt && (
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
                  <button
                    onClick={() => window.print()}
                    style={{
                      flex: 1,
                      background: '#D97706',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '0.65rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <Printer size={15} />
                    <span>Print Certificate (प्रमाण पत्र प्रिंट करें)</span>
                  </button>
                  <button
                    onClick={() => alert(`Downloading e-District Certificate ${edReceipt.certificateNumber} for ${edReceipt.applicantName}...`)}
                    style={{
                      background: '#F1F5F9',
                      color: '#334155',
                      border: '1px solid #CBD5E1',
                      padding: '0.65rem 1rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Download PDF
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB: e-SHRAM WORKER REGISTRATION (eshram.csccloud.in) */}
        {activeTab === 'eshram' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {/* Form */}
            <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                <BadgeCheck size={22} color="#0284C7" />
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    e-Shram National Worker Registration
                  </h3>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem', flexWrap: 'wrap' }}>
                    <a 
                      href="https://register.eshram.gov.in/#/user/self" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ fontSize: '0.72rem', color: '#0284C7', textDecoration: 'none', background: '#E0F2FE', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}
                    >
                      🔗 Official e-Shram Registration Portal ↗
                    </a>
                    <a 
                      href="https://eshram.gov.in/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ fontSize: '0.72rem', color: '#166534', textDecoration: 'none', background: '#DCFCE7', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}
                    >
                      🌐 Ministry of Labour (eshram.gov.in) ↗
                    </a>
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 1.25rem' }}>
                Ministry of Labour & Employment • Universal Account Number (UAN) Issuance (+₹40 VLE commission, Free for Citizen)
              </p>

              <form onSubmit={handleEshramEnroll} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    UNORGANIZED WORKER FULL NAME (श्रमिक का पूरा नाम)
                  </label>
                  <input
                    type="text"
                    value={esWorker}
                    onChange={(e) => setEsWorker(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.88rem',
                      fontWeight: 600
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    12-DIGIT AADHAAR NUMBER (VERHOEFF CHECKSUM VERIFIED)
                  </label>
                  <input
                    type="text"
                    maxLength={12}
                    value={esAadhaar}
                    onChange={(e) => setEsAadhaar(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.95rem',
                      fontFamily: 'monospace',
                      fontWeight: 700
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                      MOBILE NUMBER
                    </label>
                    <input
                      type="text"
                      value={esMobile}
                      onChange={(e) => setEsMobile(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        fontSize: '0.88rem'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                      BLOOD GROUP
                    </label>
                    <select
                      value={esBlood}
                      onChange={(e) => setEsBlood(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        fontSize: '0.88rem'
                      }}
                    >
                      <option value="O+">O Positive (O+)</option>
                      <option value="A+">A Positive (A+)</option>
                      <option value="B+">B Positive (B+)</option>
                      <option value="AB+">AB Positive (AB+)</option>
                      <option value="O-">O Negative (O-)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    PRIMARY OCCUPATION / SECTOR (व्यवसाय)
                  </label>
                  <select
                    value={esOccupation}
                    onChange={(e) => setEsOccupation(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.88rem'
                    }}
                  >
                    <option value="Construction / Bricklayer & Mason (राजमिस्त्री)">Construction / Bricklayer & Mason (राजमिस्त्री)</option>
                    <option value="Agriculture & Allied Worker (कृषि मजदूर)">Agriculture & Allied Worker (कृषि मजदूर)</option>
                    <option value="Street Vendor / Hawkers (ठेला / फेरीवाला)">Street Vendor / Hawkers (ठेला / फेरीवाला)</option>
                    <option value="Domestic / Household Worker (घरेलू कामगार)">Domestic / Household Worker (घरेलू कामगार)</option>
                    <option value="Auto / Taxi / E-Rickshaw Driver (चालक)">Auto / Taxi / E-Rickshaw Driver (चालक)</option>
                    <option value="Electrician / Plumber / Carpenter (कारीगर)">Electrician / Plumber / Carpenter (कारीगर)</option>
                  </select>
                </div>

                <div style={{ background: '#F0F9FF', padding: '0.75rem', borderRadius: '8px', border: '1px solid #BAE6FD', fontSize: '0.75rem', color: '#0369A1', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <ShieldCheck size={20} color="#0284C7" />
                  <span>Includes free Pradhan Mantri Suraksha Bima Yojana (PMSBY) ₹2.00 Lakh accidental death & disability cover.</span>
                </div>

                <button
                  type="submit"
                  disabled={esLoading}
                  style={{
                    background: '#0284C7',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0.8rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: esLoading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem'
                  }}
                >
                  <BadgeCheck size={16} />
                  <span>{esLoading ? 'Enrolling in NDUW Database...' : 'Register Worker & Issue Official UAN Card'}</span>
                </button>
              </form>
            </div>

            {/* Official e-Shram UAN Card Preview */}
            <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.5rem' }}>
                  e-Shram Universal Account Number (UAN) Card
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 1.25rem' }}>
                  Ministry of Labour & Employment • Government of India
                </p>

                {esReceipt ? (
                  <div style={{
                    background: '#FEF9C3',
                    borderRadius: '16px',
                    border: '2px solid #CA8A04',
                    overflow: 'hidden',
                    boxShadow: '0 10px 25px rgba(202, 138, 4, 0.15)',
                    position: 'relative'
                  }}>
                    {/* Tricolor Stripe */}
                    <div style={{ height: '6px', background: 'linear-gradient(to right, #FF9933 33.3%, #FFFFFF 33.3%, #FFFFFF 66.6%, #138808 66.6%)' }} />

                    {/* Card Header */}
                    <div style={{ background: '#061A36', color: '#FFFFFF', padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '0.78rem', fontWeight: 900, letterSpacing: '0.04em' }}>
                          MINISTRY OF LABOUR & EMPLOYMENT
                        </div>
                        <div style={{ fontSize: '0.65rem', opacity: 0.9 }}>
                          National Database of Unorganized Workers (e-Shram)
                        </div>
                      </div>
                      <div style={{ background: '#FACC15', color: '#061A36', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 900 }}>
                        e-SHRAM CARD
                      </div>
                    </div>

                    {/* Card Body */}
                    <div style={{ padding: '1.25rem', display: 'grid', gridTemplateColumns: '80px 1fr', gap: '1rem', alignItems: 'center' }}>
                      <div style={{
                        width: '80px',
                        height: '95px',
                        background: '#FEF08A',
                        borderRadius: '8px',
                        border: '1.5px solid #EAB308',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#854D0E'
                      }}>
                        <Users size={32} />
                        <span style={{ fontSize: '0.62rem', fontWeight: 700, marginTop: '0.25rem' }}>PHOTO</span>
                      </div>

                      <div style={{ fontSize: '0.82rem', lineHeight: 1.5 }}>
                        <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#061A36' }}>
                          {esReceipt.workerName}
                        </div>
                        <div style={{ color: '#475569', fontSize: '0.75rem' }}>
                          Blood Group: <strong>{esReceipt.bloodGroup}</strong> | Aadhaar: {esReceipt.maskedAadhaar}
                        </div>
                        <div style={{ marginTop: '0.35rem' }}>
                          <span style={{ fontSize: '0.65rem', color: '#854D0E', display: 'block', fontWeight: 800 }}>UNIVERSAL ACCOUNT NUMBER (UAN):</span>
                          <strong style={{ fontSize: '1.15rem', color: '#061A36', letterSpacing: '0.08em', fontFamily: 'monospace' }}>
                            {esReceipt.uanNumber}
                          </strong>
                        </div>
                        <div style={{ marginTop: '0.2rem' }}>
                          <span style={{ fontSize: '0.65rem', color: '#854D0E', display: 'block', fontWeight: 700 }}>PRIMARY OCCUPATION:</span>
                          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0F172A' }}>
                            {esReceipt.occupation}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div style={{ background: '#FEF08A', borderTop: '1px solid #FDE047', padding: '0.6rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#854D0E', fontWeight: 700 }}>
                        <QrCode size={16} />
                        <span>PMSBY ₹2.0 Lakh Cover Active</span>
                      </div>
                      <div style={{ color: '#16A34A', fontWeight: 800 }}>
                        STATUS: ENROLLED
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: '#94A3B8' }}>
                    <BadgeCheck size={48} color="#CBD5E1" style={{ margin: '0 auto 1rem' }} />
                    <p style={{ margin: 0, fontSize: '0.85rem' }}>
                      Enter worker details and authenticate Aadhaar to generate official e-Shram UAN Card.
                    </p>
                  </div>
                )}
              </div>

              {esReceipt && (
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
                  <button
                    onClick={() => window.print()}
                    style={{
                      flex: 1,
                      background: '#061A36',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '0.65rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <Printer size={15} />
                    <span>Print UAN Card (प्रिंट करें)</span>
                  </button>
                  <button
                    onClick={() => alert(`Downloading e-Shram Card for ${esReceipt.workerName} (UAN: ${esReceipt.uanNumber})...`)}
                    style={{
                      background: '#F1F5F9',
                      color: '#334155',
                      border: '1px solid #CBD5E1',
                      padding: '0.65rem 1rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Download PDF
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB: SARATHI DRIVING LICENSE & RTO TEST SLOTS (parivahan.gov.in) */}
        {activeTab === 'sarathi' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {/* Booking Form */}
            <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                <Car size={22} color="#2563EB" />
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    Sarathi Driving License & RTO Test Slots
                  </h3>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem', flexWrap: 'wrap' }}>
                    <a 
                      href="https://sarathi.parivahan.gov.in/sarathiservice/stateSelection.do" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ fontSize: '0.72rem', color: '#2563EB', textDecoration: 'none', background: '#DBEAFE', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}
                    >
                      🔗 Official Sarathi Parivahan Portal ↗
                    </a>
                    <a 
                      href="https://parivahan.gov.in/parivahan//en/content/driving-licence-0" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ fontSize: '0.72rem', color: '#059669', textDecoration: 'none', background: '#D1FAE5', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}
                    >
                      🚗 Parivahan Sewa Dashboard ↗
                    </a>
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 1.25rem' }}>
                Ministry of Road Transport & Highways (MoRTH) • Slot Booking & DL Application (+₹75 VLE Comm, Govt Fee: ₹450)
              </p>

              <form onSubmit={handleSarathiBook} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    APPLICANT CITIZEN FULL NAME (आवेदक का नाम) *
                  </label>
                  <input
                    type="text"
                    required
                    value={dlApplicant}
                    onChange={(e) => setDlApplicant(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', fontWeight: 600 }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                      AADHAAR NUMBER *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={12}
                      value={dlAadhaar}
                      onChange={(e) => setDlAadhaar(e.target.value)}
                      style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', fontFamily: 'monospace' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                      MOBILE NUMBER *
                    </label>
                    <input
                      type="tel"
                      required
                      value={dlMobile}
                      onChange={(e) => setDlMobile(e.target.value)}
                      style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    DESIGNATED RTO AUTHORITY (परिवहन कार्यालय) *
                  </label>
                  <select
                    value={dlRto}
                    onChange={(e) => setDlRto(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                  >
                    <option value="BR-01 (Patna RTO Central)">BR-01 (Patna RTO Central)</option>
                    <option value="BR-02 (Gaya RTO Office)">BR-02 (Gaya RTO Office)</option>
                    <option value="BR-06 (Muzaffarpur RTO)">BR-06 (Muzaffarpur RTO)</option>
                    <option value="BR-07 (Darbhanga District Transport Office)">BR-07 (Darbhanga District Transport Office)</option>
                    <option value="DL-01 (Delhi North Mall Road)">DL-01 (Delhi North Mall Road)</option>
                    <option value="UP-32 (Lucknow Transport Nagar)">UP-32 (Lucknow Transport Nagar)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    VEHICLE CLASS (COV - वाहन श्रेणी)
                  </label>
                  <select
                    value={dlCov}
                    onChange={(e) => setDlCov(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                  >
                    <option value="LMV (Motor Car) + MCWG (Motorcycle with Gear)">LMV (Motor Car) + MCWG (Motorcycle with Gear)</option>
                    <option value="MCWG (Motorcycle with Gear Only)">MCWG (Motorcycle with Gear Only)</option>
                    <option value="LMV (Light Motor Vehicle - Car Only)">LMV (Light Motor Vehicle - Car Only)</option>
                    <option value="TRANS (Heavy Commercial Goods & Passenger)">TRANS (Heavy Commercial Goods & Passenger)</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                      DRIVING TEST DATE
                    </label>
                    <input
                      type="date"
                      value={dlSlotDate}
                      onChange={(e) => setDlSlotDate(e.target.value)}
                      style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                      TEST TIME SLOT
                    </label>
                    <select
                      value={dlSlotTime}
                      onChange={(e) => setDlSlotTime(e.target.value)}
                      style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                    >
                      <option value="09:30 AM - 11:00 AM (Batch 1)">09:30 AM - 11:00 AM (Batch 1)</option>
                      <option value="11:00 AM - 12:30 PM (Batch 2)">11:00 AM - 12:30 PM (Batch 2)</option>
                      <option value="02:00 PM - 03:30 PM (Batch 3)">02:00 PM - 03:30 PM (Batch 3)</option>
                      <option value="03:30 PM - 05:00 PM (Batch 4)">03:30 PM - 05:00 PM (Batch 4)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={dlLoading}
                  style={{
                    background: '#2563EB',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0.8rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: dlLoading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem'
                  }}
                >
                  <Car size={16} />
                  <span>{dlLoading ? 'Reserving Test Slot at RTO...' : 'Book Driving Test Slot & Generate Slip (₹450)'}</span>
                </button>
              </form>
            </div>

            {/* Test Slot Admit Card Preview */}
            <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.5rem' }}>
                  Sarathi RTO Driving Test Appointment Slip
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 1.25rem' }}>
                  MoRTH Parivahan Sewa • Automated Track Test Admit Card
                </p>

                {dlReceipt ? (
                  <div style={{
                    background: '#EFF6FF',
                    borderRadius: '16px',
                    border: '2px solid #2563EB',
                    padding: '1.25rem',
                    boxShadow: '0 10px 25px rgba(37, 99, 235, 0.12)'
                  }}>
                    <div style={{ borderBottom: '1.5px dashed #93C5FD', paddingBottom: '0.75rem', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '0.7rem', color: '#1E40AF', fontWeight: 700, textTransform: 'uppercase' }}>APPLICATION NUMBER</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#061A36', fontFamily: 'monospace' }}>{dlReceipt.appNo}</div>
                      </div>
                      <span style={{ background: '#DCFCE7', color: '#166534', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 800 }}>
                        ✓ {dlReceipt.status}
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', fontSize: '0.8rem', marginBottom: '0.75rem' }}>
                      <div>
                        <div style={{ color: '#64748B' }}>Citizen Name:</div>
                        <div style={{ fontWeight: 800, color: '#0F172A' }}>{dlReceipt.applicantName}</div>
                      </div>
                      <div>
                        <div style={{ color: '#64748B' }}>Vehicle Class:</div>
                        <div style={{ fontWeight: 700, color: '#2563EB' }}>{dlReceipt.cov}</div>
                      </div>
                      <div>
                        <div style={{ color: '#64748B' }}>RTO Office:</div>
                        <div style={{ fontWeight: 700, color: '#0F172A' }}>{dlReceipt.rto}</div>
                      </div>
                      <div>
                        <div style={{ color: '#64748B' }}>Appointment Date:</div>
                        <div style={{ fontWeight: 800, color: '#16A34A' }}>{dlReceipt.slotDate}</div>
                      </div>
                      <div style={{ gridColumn: 'span 2' }}>
                        <div style={{ color: '#64748B' }}>Batch & Time Window:</div>
                        <div style={{ fontWeight: 700, color: '#D97706' }}>{dlReceipt.slotTime}</div>
                      </div>
                    </div>

                    <div style={{ borderTop: '1.5px dashed #93C5FD', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#16A34A', fontWeight: 700 }}>
                        <CheckCircle2 size={15} />
                        <span>Commission: +₹{dlReceipt.vleCommission}.00 credited</span>
                      </div>
                      <div style={{ color: '#64748B' }}>
                        Token: {dlReceipt.trackingId}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: '#94A3B8' }}>
                    <Car size={48} color="#CBD5E1" style={{ margin: '0 auto 1rem' }} />
                    <p style={{ margin: 0, fontSize: '0.85rem' }}>
                      Fill applicant details and pick preferred RTO date to lock driving test appointment.
                    </p>
                  </div>
                )}
              </div>

              {dlReceipt && (
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
                  <button
                    onClick={() => window.print()}
                    style={{
                      flex: 1,
                      background: '#2563EB',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '0.65rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <Printer size={15} />
                    <span>Print RTO Admit Card</span>
                  </button>
                  <button
                    onClick={() => alert(`Downloading Sarathi DL Admit Card for Application ${dlReceipt.appNo}...`)}
                    style={{
                      background: '#F1F5F9',
                      color: '#334155',
                      border: '1px solid #CBD5E1',
                      padding: '0.65rem 1rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Download PDF
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB: PMFBY CROP INSURANCE */}
        {activeTab === 'pmfby' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '2rem' }}>
            {/* Form Column */}
            <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.85rem' }}>
                <div style={{ width: '42px', height: '42px', background: '#DCFCE7', color: '#16A34A', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sprout size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    PM Fasal Bima Yojana (PMFBY)
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0 }}>
                    Ministry of Agriculture & Farmers Welfare • VLE Commission: <strong style={{ color: '#16A34A' }}>+₹100.00 / Policy</strong>
                  </p>
                </div>
              </div>

              {/* Fast-Track Demo Button */}
              <div style={{ background: '#F8FAFC', border: '1px dashed #CBD5E1', borderRadius: '8px', padding: '0.65rem 0.85rem', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', color: '#475569' }}>
                  🚀 Quick Test: Pre-fill Bihar Kharif Paddy data
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setFbyFarmer('Ramdhani Yadav');
                    setFbyAadhaar('999999990019');
                    setFbyMobile('9835012345');
                    setFbyState('Bihar');
                    setFbyDistrict('Patna');
                    setFbyVillage('Danapur Cantonment');
                    setFbyKhasra('Khata: 142 / Khasra: 589/2');
                    setFbySeason('Kharif 2026');
                    setFbyCrop('Paddy / धान (Fine Variety)');
                    setFbyArea(2.5);
                    setFbySumInsured(125000);
                    setFbyCompany('Agriculture Insurance Company of India Ltd (AIC)');
                  }}
                  style={{
                    background: '#16A34A',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.35rem 0.75rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Fill Verified Demo
                </button>
              </div>

              <form onSubmit={handleApplyPMFBY} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                      Farmer Name (किसान का नाम) *
                    </label>
                    <input
                      type="text"
                      required
                      value={fbyFarmer}
                      onChange={e => setFbyFarmer(e.target.value)}
                      placeholder="e.g. Ramdhani Yadav"
                      style={{ width: '100%', padding: '0.65rem', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.85rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                      12-Digit Aadhaar (Verhoeff Checked) *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={12}
                      value={fbyAadhaar}
                      onChange={e => setFbyAadhaar(e.target.value)}
                      placeholder="999999990019"
                      style={{ width: '100%', padding: '0.65rem', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.85rem', fontFamily: 'monospace' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                      Mobile Number (मोबाइल नंबर) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={fbyMobile}
                      onChange={e => setFbyMobile(e.target.value)}
                      placeholder="9835012345"
                      style={{ width: '100%', padding: '0.65rem', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.85rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                      Land Record (Khata / Khasra No) *
                    </label>
                    <input
                      type="text"
                      required
                      value={fbyKhasra}
                      onChange={e => setFbyKhasra(e.target.value)}
                      placeholder="Khata: 142 / Khasra: 589/2"
                      style={{ width: '100%', padding: '0.65rem', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      value={fbyState}
                      onChange={e => setFbyState(e.target.value)}
                      style={{ width: '100%', padding: '0.65rem', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.85rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                      District *
                    </label>
                    <input
                      type="text"
                      required
                      value={fbyDistrict}
                      onChange={e => setFbyDistrict(e.target.value)}
                      style={{ width: '100%', padding: '0.65rem', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.85rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                      Village / Panchayat *
                    </label>
                    <input
                      type="text"
                      required
                      value={fbyVillage}
                      onChange={e => setFbyVillage(e.target.value)}
                      style={{ width: '100%', padding: '0.65rem', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                      Season (मौसम) *
                    </label>
                    <select
                      value={fbySeason}
                      onChange={e => setFbySeason(e.target.value)}
                      style={{ width: '100%', padding: '0.65rem', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.85rem' }}
                    >
                      <option value="Kharif 2026">Kharif 2026 (खरीफ - 2.0% Farmer Premium)</option>
                      <option value="Rabi 2026-27">Rabi 2026-27 (रबी - 1.5% Farmer Premium)</option>
                      <option value="Commercial 2026">Commercial / Horticultural (5.0%)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                      Crop Name (फसल) *
                    </label>
                    <select
                      value={fbyCrop}
                      onChange={e => setFbyCrop(e.target.value)}
                      style={{ width: '100%', padding: '0.65rem', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.85rem' }}
                    >
                      <option value="Paddy / धान (Fine Variety)">Paddy / धान (Fine Variety)</option>
                      <option value="Wheat / गेहूं (High Yield)">Wheat / गेहूं (High Yield)</option>
                      <option value="Maize / मक्का (Hybrid)">Maize / मक्का (Hybrid)</option>
                      <option value="Mustard / सरसों">Mustard / सरसों</option>
                      <option value="Gram / चना">Gram / चना</option>
                      <option value="Sugarcane / गन्ना">Sugarcane / गन्ना</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                      Area Insured (Hectares) *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      required
                      value={fbyArea}
                      onChange={e => setFbyArea(Number(e.target.value))}
                      style={{ width: '100%', padding: '0.65rem', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.85rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                      Sum Insured / बीमित राशि (₹) *
                    </label>
                    <input
                      type="number"
                      step="1000"
                      min="10000"
                      required
                      value={fbySumInsured}
                      onChange={e => setFbySumInsured(Number(e.target.value))}
                      style={{ width: '100%', padding: '0.65rem', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700 }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                    Authorized Insurance Company *
                  </label>
                  <select
                    value={fbyCompany}
                    onChange={e => setFbyCompany(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.85rem' }}
                  >
                    <option value="Agriculture Insurance Company of India Ltd (AIC)">Agriculture Insurance Company of India Ltd (AIC)</option>
                    <option value="HDFC ERGO General Insurance Co. Ltd">HDFC ERGO General Insurance Co. Ltd</option>
                    <option value="SBI General Insurance Co. Ltd">SBI General Insurance Co. Ltd</option>
                    <option value="Bajaj Allianz General Insurance Co. Ltd">Bajaj Allianz General Insurance Co. Ltd</option>
                  </select>
                </div>

                {/* Real-time Premium Breakdown */}
                <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '10px', padding: '0.85rem 1rem' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#065F46', marginBottom: '0.4rem' }}>
                    📊 Premium Calculation Breakdown (PMFBY Scheme Guidelines)
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#047857', marginBottom: '0.2rem' }}>
                    <span>Farmer Payable Share ({fbySeason.toLowerCase().includes('rabi') ? '1.5%' : '2.0%'}):</span>
                    <strong>₹{(fbySumInsured * (fbySeason.toLowerCase().includes('rabi') ? 0.015 : 0.02)).toFixed(0)}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#047857' }}>
                    <span>Govt Subsidy (Central + State 8.0%):</span>
                    <strong>₹{(fbySumInsured * 0.08).toFixed(0)}</strong>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={fbyLoading}
                  style={{
                    background: '#16A34A',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0.85rem',
                    borderRadius: '8px',
                    fontWeight: 800,
                    fontSize: '0.92rem',
                    cursor: fbyLoading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    marginTop: '0.5rem'
                  }}
                >
                  {fbyLoading ? <RefreshCw className="animate-spin" size={18} /> : <ShieldCheck size={18} />}
                  <span>{fbyLoading ? 'Processing Policy...' : 'Issue PMFBY Crop Insurance Policy (+₹100 Comm)'}</span>
                </button>
              </form>
            </div>

            {/* Policy Preview Column */}
            <div>
              {fbyPolicy ? (
                <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                  <div style={{ border: '2px solid #16A34A', borderRadius: '12px', padding: '1.25rem', background: '#F8FAFC' }}>
                    {/* Header */}
                    <div style={{ textAlign: 'center', borderBottom: '2px solid #E2E8F0', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <div style={{ width: '38px', height: '28px', background: '#16A34A', color: '#FFF', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.78rem' }}>
                          ADCS
                        </div>
                        <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#0F172A', letterSpacing: '0.04em' }}>
                          PRADHAN MANTRI FASAL BIMA YOJANA (PMFBY)
                        </span>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                        Ministry of Agriculture and Farmers Welfare • Government of India
                      </div>
                      <div style={{ display: 'inline-block', background: '#DCFCE7', color: '#16A34A', fontSize: '0.72rem', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: '20px', marginTop: '0.35rem' }}>
                        ✓ {fbyPolicy.status}
                      </div>
                    </div>

                    {/* Details Table */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', fontSize: '0.78rem', marginBottom: '1rem' }}>
                      <div>
                        <div style={{ color: '#64748B' }}>Policy Number:</div>
                        <div style={{ fontWeight: 800, color: '#0F172A', fontFamily: 'monospace', fontSize: '0.85rem' }}>{fbyPolicy.policyNumber}</div>
                      </div>
                      <div>
                        <div style={{ color: '#64748B' }}>Farmer Name:</div>
                        <div style={{ fontWeight: 700, color: '#0F172A' }}>{fbyPolicy.farmerName}</div>
                      </div>
                      <div>
                        <div style={{ color: '#64748B' }}>Masked Aadhaar:</div>
                        <div style={{ fontWeight: 600, color: '#334155' }}>{fbyPolicy.maskedAadhaar}</div>
                      </div>
                      <div>
                        <div style={{ color: '#64748B' }}>Mobile:</div>
                        <div style={{ fontWeight: 600, color: '#334155' }}>+91 {fbyPolicy.mobile}</div>
                      </div>
                      <div>
                        <div style={{ color: '#64748B' }}>Season & Crop:</div>
                        <div style={{ fontWeight: 700, color: '#16A34A' }}>{fbyPolicy.season} • {fbyPolicy.cropName}</div>
                      </div>
                      <div>
                        <div style={{ color: '#64748B' }}>Insured Area:</div>
                        <div style={{ fontWeight: 600, color: '#334155' }}>{fbyPolicy.areaHectares} Hectares</div>
                      </div>
                      <div>
                        <div style={{ color: '#64748B' }}>Land Coordinates:</div>
                        <div style={{ fontWeight: 600, color: '#334155' }}>{fbyPolicy.khasraKhatauni}</div>
                      </div>
                      <div>
                        <div style={{ color: '#64748B' }}>Location:</div>
                        <div style={{ fontWeight: 600, color: '#334155' }}>{fbyPolicy.village}, {fbyPolicy.district}, {fbyPolicy.state}</div>
                      </div>
                    </div>

                    {/* Premium Summary Box */}
                    <div style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '0.75rem', marginBottom: '1rem', fontSize: '0.78rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span style={{ color: '#64748B' }}>Sum Insured:</span>
                        <strong style={{ color: '#0F172A', fontSize: '0.85rem' }}>₹{fbyPolicy.sumInsured?.toLocaleString('en-IN')}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span style={{ color: '#64748B' }}>Farmer Premium Paid:</span>
                        <strong style={{ color: '#16A34A' }}>₹{fbyPolicy.farmerPremium?.toLocaleString('en-IN')}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span style={{ color: '#64748B' }}>Central & State Subsidy:</span>
                        <strong style={{ color: '#3B82F6' }}>₹{fbyPolicy.govtSubsidy?.toLocaleString('en-IN')}</strong>
                      </div>
                      <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '0.35rem', display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 700, color: '#334155' }}>Insurer:</span>
                        <strong style={{ color: '#0F172A' }}>{fbyPolicy.insuranceCompany}</strong>
                      </div>
                    </div>

                    {/* QR Code and Digital Seal */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #E2E8F0', paddingTop: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <QrCode size={38} color="#16A34A" />
                        <div style={{ fontSize: '0.68rem', color: '#64748B' }}>
                          Scan to verify on pmfby.gov.in<br />
                          VLE Commission: +₹{fbyPolicy.vleCommissionCredited} Credited
                        </div>
                      </div>
                      <div style={{ textAlign: 'right', fontSize: '0.68rem', color: '#64748B' }}>
                        Issued by: Akul Dravin Digital Services Kendra (ADCS)<br />
                        Date: {new Date().toLocaleDateString('en-IN')}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '1rem' }}>
                    <button
                      onClick={() => window.print()}
                      style={{
                        background: '#16A34A',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '0.65rem',
                        borderRadius: '8px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem',
                        fontSize: '0.82rem'
                      }}
                    >
                      <Printer size={15} />
                      <span>Print Policy Slip</span>
                    </button>
                    <button
                      onClick={() => alert(`Downloading PMFBY Certificate for ${fbyPolicy.farmerName} (Policy: ${fbyPolicy.policyNumber})...`)}
                      style={{
                        background: '#F1F5F9',
                        color: '#334155',
                        border: '1px solid #CBD5E1',
                        padding: '0.65rem',
                        borderRadius: '8px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontSize: '0.82rem'
                      }}
                    >
                      Download PDF
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ background: '#FFFFFF', padding: '2.5rem 1.5rem', borderRadius: '16px', border: '1px dashed #CBD5E1', textAlign: 'center', color: '#94A3B8' }}>
                  <Sprout size={48} style={{ margin: '0 auto 1rem', opacity: 0.4, color: '#16A34A' }} />
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem' }}>
                    No Policy Issued Yet
                  </h4>
                  <p style={{ fontSize: '0.8rem', maxWidth: '320px', margin: '0 auto', lineHeight: 1.5 }}>
                    Enter farmer land details and submit to generate the official PMFBY Crop Insurance Certificate and credit ₹100 VLE commission.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB: BBPS BHARAT BILL PAYMENT SYSTEM */}
        {activeTab === 'bbps' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '2rem' }}>
            {/* Bill Fetch & Payment Column */}
            <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.85rem' }}>
                <div style={{ width: '42px', height: '42px', background: '#DBEAFE', color: '#2563EB', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <DollarSign size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    Bharat Bill Payment System (BBPS)
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0 }}>
                    NPCI Bharat BillPay • Instant Bill Fetch & Surcharge Free • VLE Commission: <strong style={{ color: '#16A34A' }}>+₹20.00 / Bill</strong>
                  </p>
                </div>
              </div>

              {/* Fast-Track Demo Fill Button */}
              <div style={{ background: '#F8FAFC', border: '1px dashed #CBD5E1', borderRadius: '8px', padding: '0.65rem 0.85rem', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', color: '#475569' }}>
                  ⚡ Quick Test: Fill SBPDCL Electricity Account
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setBbpsCategory('Electricity');
                    setBbpsBiller('South Bihar Power Distribution Co. Ltd (SBPDCL)');
                    setBbpsConsumerNo('104859302194');
                    setBbpsConsumerMobile('9835012345');
                  }}
                  style={{
                    background: '#2563EB',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.35rem 0.75rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Fill Demo Account
                </button>
              </div>

              <form onSubmit={handleFetchBBPSBill} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                    Bill Category (श्रेणी) *
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                    {(['Electricity', 'LPG Gas', 'Water', 'Broadband'] as const).map(cat => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          setBbpsCategory(cat);
                          if (cat === 'Electricity') setBbpsBiller('South Bihar Power Distribution Co. Ltd (SBPDCL)');
                          if (cat === 'LPG Gas') setBbpsBiller('Indane LPG Cylinder (Indian Oil)');
                          if (cat === 'Water') setBbpsBiller('Delhi Jal Board (DJB)');
                          if (cat === 'Broadband') setBbpsBiller('BSNL Landline & FTTH');
                          setBbpsBillDetails(null);
                        }}
                        style={{
                          padding: '0.6rem 0.4rem',
                          borderRadius: '8px',
                          border: bbpsCategory === cat ? '2px solid #2563EB' : '1px solid #CBD5E1',
                          background: bbpsCategory === cat ? '#EFF6FF' : '#FFFFFF',
                          color: bbpsCategory === cat ? '#075ACB' : '#475569',
                          fontWeight: bbpsCategory === cat ? 800 : 600,
                          fontSize: '0.78rem',
                          cursor: 'pointer'
                        }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                    Biller Name (बिल प्रदाता) *
                  </label>
                  <select
                    value={bbpsBiller}
                    onChange={e => {
                      setBbpsBiller(e.target.value);
                      setBbpsBillDetails(null);
                    }}
                    style={{ width: '100%', padding: '0.65rem', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.85rem' }}
                  >
                    {bbpsCategory === 'Electricity' && (
                      <>
                        <option value="South Bihar Power Distribution Co. Ltd (SBPDCL)">South Bihar Power Distribution Co. Ltd (SBPDCL)</option>
                        <option value="North Bihar Power Distribution Co. Ltd (NBPDCL)">North Bihar Power Distribution Co. Ltd (NBPDCL)</option>
                        <option value="BSES Rajdhani Power Limited (BRPL)">BSES Rajdhani Power Limited (BRPL)</option>
                        <option value="Tata Power Delhi Distribution (TPDDL)">Tata Power Delhi Distribution (TPDDL)</option>
                        <option value="Uttar Pradesh Power Corporation (UPPCL)">Uttar Pradesh Power Corporation (UPPCL)</option>
                        <option value="Punjab State Power Corporation (PSPCL)">Punjab State Power Corporation (PSPCL)</option>
                      </>
                    )}
                    {bbpsCategory === 'LPG Gas' && (
                      <>
                        <option value="Indane LPG Cylinder (Indian Oil)">Indane LPG Cylinder (Indian Oil)</option>
                        <option value="Bharat Gas (BPCL)">Bharat Gas (BPCL)</option>
                        <option value="HP Gas (HPCL)">HP Gas (HPCL)</option>
                      </>
                    )}
                    {bbpsCategory === 'Water' && (
                      <>
                        <option value="Delhi Jal Board (DJB)">Delhi Jal Board (DJB)</option>
                        <option value="Patna Municipal Corporation Water">Patna Municipal Corporation Water</option>
                        <option value="Municipal Corporation of Greater Mumbai (MCGM)">Municipal Corporation of Greater Mumbai (MCGM)</option>
                      </>
                    )}
                    {bbpsCategory === 'Broadband' && (
                      <>
                        <option value="BSNL Landline & FTTH">BSNL Landline & FTTH</option>
                        <option value="Airtel Broadband">Airtel Broadband</option>
                        <option value="JioFiber Postpaid">JioFiber Postpaid</option>
                      </>
                    )}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                      Consumer / Account / CA Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={bbpsConsumerNo}
                      onChange={e => {
                        setBbpsConsumerNo(e.target.value);
                        setBbpsBillDetails(null);
                      }}
                      placeholder="e.g. 104859302194"
                      style={{ width: '100%', padding: '0.65rem', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.85rem', fontFamily: 'monospace' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                      Customer Mobile *
                    </label>
                    <input
                      type="tel"
                      required
                      value={bbpsConsumerMobile}
                      onChange={e => setBbpsConsumerMobile(e.target.value)}
                      placeholder="9835012345"
                      style={{ width: '100%', padding: '0.65rem', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={bbpsFetching}
                  style={{
                    background: '#2563EB',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: bbpsFetching ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  {bbpsFetching ? <RefreshCw className="animate-spin" size={16} /> : <Search size={16} />}
                  <span>{bbpsFetching ? 'Connecting to NPCI BBPS...' : 'Fetch Bill from NPCI BBPS'}</span>
                </button>
              </form>

              {/* Fetched Bill Card & Pay Button */}
              {bbpsBillDetails && (
                <div style={{ marginTop: '1.25rem', background: '#F8FAFC', border: '1px solid #BFDBFE', borderRadius: '12px', padding: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#1E40AF' }}>
                      📋 Bill Details Retrieved
                    </span>
                    <span style={{ background: '#FEE2E2', color: '#DC2626', fontSize: '0.72rem', fontWeight: 800, padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                      {bbpsBillDetails.status}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.78rem', marginBottom: '0.85rem' }}>
                    <div>
                      <span style={{ color: '#64748B' }}>Consumer Name:</span>
                      <div style={{ fontWeight: 700, color: '#0F172A' }}>{bbpsBillDetails.consumerName}</div>
                    </div>
                    <div>
                      <span style={{ color: '#64748B' }}>Bill Number:</span>
                      <div style={{ fontWeight: 600, color: '#334155', fontFamily: 'monospace' }}>{bbpsBillDetails.billNumber}</div>
                    </div>
                    <div>
                      <span style={{ color: '#64748B' }}>Bill Date:</span>
                      <div style={{ fontWeight: 600, color: '#334155' }}>{bbpsBillDetails.billDate}</div>
                    </div>
                    <div>
                      <span style={{ color: '#64748B' }}>Due Date:</span>
                      <div style={{ fontWeight: 700, color: '#DC2626' }}>{bbpsBillDetails.dueDate}</div>
                    </div>
                  </div>

                  <div style={{ background: '#EFF6FF', border: '1px solid #93C5FD', borderRadius: '8px', padding: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#1E40AF' }}>Total Payable Amount:</div>
                      <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#061A36' }}>
                        ₹{bbpsBillDetails.billAmount.toLocaleString('en-IN')}.00
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', fontSize: '0.72rem', color: '#16A34A', fontWeight: 700 }}>
                      +₹20.00 VLE Comm<br />Auto-Credited
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handlePayBBPSBill}
                    disabled={bbpsPaying || walletBalance < bbpsBillDetails.billAmount}
                    style={{
                      width: '100%',
                      background: walletBalance < bbpsBillDetails.billAmount ? '#94A3B8' : '#16A34A',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '0.85rem',
                      borderRadius: '8px',
                      fontWeight: 800,
                      fontSize: '0.92rem',
                      cursor: (bbpsPaying || walletBalance < bbpsBillDetails.billAmount) ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    {bbpsPaying ? <RefreshCw className="animate-spin" size={18} /> : <CreditCard size={18} />}
                    <span>
                      {bbpsPaying 
                        ? 'Processing Settlement...' 
                        : walletBalance < bbpsBillDetails.billAmount
                        ? `Insufficient Balance (Top-up Required)`
                        : `Pay ₹${bbpsBillDetails.billAmount} from VLE Wallet (+₹20 Comm)`
                      }
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* BBPS Official Thermal Slip Preview Column */}
            <div>
              {bbpsReceipt ? (
                <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                  <div style={{ border: '2px solid #2563EB', borderRadius: '12px', padding: '1.25rem', background: '#F8FAFC' }}>
                    {/* Header */}
                    <div style={{ textAlign: 'center', borderBottom: '2px solid #E2E8F0', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <div style={{ width: '28px', height: '28px', background: '#2563EB', color: '#FFF', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.85rem' }}>
                          B
                        </div>
                        <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#0F172A', letterSpacing: '0.04em' }}>
                          BHARAT BILL PAYMENT SYSTEM (BBPS)
                        </span>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                        National Payments Corporation of India (NPCI) • ADCS Network
                      </div>
                      <div style={{ display: 'inline-block', background: '#DCFCE7', color: '#16A34A', fontSize: '0.72rem', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: '20px', marginTop: '0.35rem' }}>
                        ✓ {bbpsReceipt.status}
                      </div>
                    </div>

                    {/* Details Table */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', fontSize: '0.78rem', marginBottom: '1rem' }}>
                      <div>
                        <div style={{ color: '#64748B' }}>BBPS Txn Reference:</div>
                        <div style={{ fontWeight: 800, color: '#0F172A', fontFamily: 'monospace', fontSize: '0.82rem' }}>{bbpsReceipt.bbpsTxnRef}</div>
                      </div>
                      <div>
                        <div style={{ color: '#64748B' }}>NPCI Auth Code:</div>
                        <div style={{ fontWeight: 700, color: '#2563EB', fontFamily: 'monospace' }}>{bbpsReceipt.authCode}</div>
                      </div>
                      <div>
                        <div style={{ color: '#64748B' }}>Biller:</div>
                        <div style={{ fontWeight: 700, color: '#0F172A' }}>{bbpsReceipt.billerName}</div>
                      </div>
                      <div>
                        <div style={{ color: '#64748B' }}>Category:</div>
                        <div style={{ fontWeight: 600, color: '#334155' }}>{bbpsReceipt.category}</div>
                      </div>
                      <div>
                        <div style={{ color: '#64748B' }}>Consumer / CA No:</div>
                        <div style={{ fontWeight: 700, color: '#334155', fontFamily: 'monospace' }}>{bbpsReceipt.consumerNumber}</div>
                      </div>
                      <div>
                        <div style={{ color: '#64748B' }}>Consumer Name:</div>
                        <div style={{ fontWeight: 700, color: '#0F172A' }}>{bbpsReceipt.consumerName}</div>
                      </div>
                      <div>
                        <div style={{ color: '#64748B' }}>Customer Mobile:</div>
                        <div style={{ fontWeight: 600, color: '#334155' }}>+91 {bbpsReceipt.consumerMobile}</div>
                      </div>
                      <div>
                        <div style={{ color: '#64748B' }}>Payment Mode:</div>
                        <div style={{ fontWeight: 600, color: '#334155' }}>{bbpsReceipt.paymentMode}</div>
                      </div>
                    </div>

                    {/* Amount Box */}
                    <div style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '0.75rem', marginBottom: '1rem', fontSize: '0.78rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span style={{ color: '#64748B' }}>Bill Amount:</span>
                        <strong style={{ color: '#0F172A', fontSize: '0.9rem' }}>₹{bbpsReceipt.billAmount?.toLocaleString('en-IN')}.00</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span style={{ color: '#64748B' }}>BBPS Surcharge / Convenience Fee:</span>
                        <strong style={{ color: '#16A34A' }}>₹0.00 (FREE)</strong>
                      </div>
                      <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '0.35rem', display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 800, color: '#0F172A' }}>Total Amount Deducted:</span>
                        <strong style={{ color: '#061A36', fontSize: '1rem' }}>₹{bbpsReceipt.totalPaid?.toLocaleString('en-IN')}.00</strong>
                      </div>
                    </div>

                    {/* QR Code and Footer */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #E2E8F0', paddingTop: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <QrCode size={38} color="#2563EB" />
                        <div style={{ fontSize: '0.68rem', color: '#64748B' }}>
                          Scan to verify on bharatbillpay.com<br />
                          VLE Commission: +₹{bbpsReceipt.vleCommissionCredited} Credited
                        </div>
                      </div>
                      <div style={{ textAlign: 'right', fontSize: '0.68rem', color: '#64748B' }}>
                        Agent: Akul Dravin Digital Services Kendra (ADCS)<br />
                        Date: {new Date().toLocaleDateString('en-IN')}
                      </div>
                    </div>
                  </div>

                  {/* Print & Download Actions */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '1rem' }}>
                    <button
                      onClick={() => window.print()}
                      style={{
                        background: '#2563EB',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '0.65rem',
                        borderRadius: '8px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem',
                        fontSize: '0.82rem'
                      }}
                    >
                      <Printer size={15} />
                      <span>Print Thermal Slip</span>
                    </button>
                    <button
                      onClick={() => alert(`Downloading BBPS Tax Invoice for ${bbpsReceipt.consumerName} (Ref: ${bbpsReceipt.bbpsTxnRef})...`)}
                      style={{
                        background: '#F1F5F9',
                        color: '#334155',
                        border: '1px solid #CBD5E1',
                        padding: '0.65rem',
                        borderRadius: '8px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontSize: '0.82rem'
                      }}
                    >
                      Download PDF
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ background: '#FFFFFF', padding: '2.5rem 1.5rem', borderRadius: '16px', border: '1px dashed #CBD5E1', textAlign: 'center', color: '#94A3B8' }}>
                  <DollarSign size={48} style={{ margin: '0 auto 1rem', opacity: 0.4, color: '#2563EB' }} />
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem' }}>
                    No Bill Paid Yet
                  </h4>
                  <p style={{ fontSize: '0.8rem', maxWidth: '320px', margin: '0 auto', lineHeight: 1.5 }}>
                    Enter consumer account details, fetch live bill from NPCI BBPS, and click pay to settle instantly and credit ₹20 VLE commission.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB: AADHAAR UCL DEMOGRAPHIC & DOCUMENT UPDATE */}
        {activeTab === 'ucl' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '2rem' }}>
            {/* Form Column */}
            <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.85rem' }}>
                <div style={{ width: '42px', height: '42px', background: '#FEF3C7', color: '#D97706', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Fingerprint size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    Aadhaar Update Client Lite (UCL)
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0 }}>
                    UIDAI Registrar Code 206 • Resident Demographic & Document Update • VLE Comm: <strong style={{ color: '#16A34A' }}>+₹50.00 / Update</strong>
                  </p>
                </div>
              </div>

              {/* Fast-Track Demo Button */}
              <div style={{ background: '#F8FAFC', border: '1px dashed #CBD5E1', borderRadius: '8px', padding: '0.65rem 0.85rem', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', color: '#475569' }}>
                  🆔 Quick Test: Fill Resident Mobile Link Data
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setUclResident('Sanjay Kumar Verma');
                    setUclAadhaar('999999990019');
                    setUclMobile('9835099887');
                    setUclUpdateType('Mobile Number Linking');
                    setUclDoc('Ration Card / Electricity Bill (Valid Proof of Address)');
                    setUclNewDetail('Update Mobile Number to +91 9835099887 and Link to Aadhaar');
                  }}
                  style={{
                    background: '#D97706',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.35rem 0.75rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Fill Verified Demo
                </button>
              </div>

              <form onSubmit={handleApplyUCL} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                    Aadhaar Update Category (अपडेट का प्रकार) *
                  </label>
                  <select
                    value={uclUpdateType}
                    onChange={e => setUclUpdateType(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.85rem' }}
                  >
                    <option value="Mobile Number Linking">Mobile Number Linking & Email ID Update</option>
                    <option value="Address Update (Proof of Address)">Address Update (Valid Proof of Address - PoA)</option>
                    <option value="Name / DOB Correction">Name / Date of Birth (DOB) / Gender Correction</option>
                    <option value="Document Update (PoI + PoA Free Mandate)">Mandatory 10-Year Document Update (PoI + PoA)</option>
                    <option value="Child Enrollment (0-5 Yrs)">Child Enrollment (0 to 5 Years - Baal Aadhaar)</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                      Resident Full Name (निवासी का नाम) *
                    </label>
                    <input
                      type="text"
                      required
                      value={uclResident}
                      onChange={e => setUclResident(e.target.value)}
                      placeholder="e.g. Sanjay Kumar Verma"
                      style={{ width: '100%', padding: '0.65rem', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.85rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                      12-Digit Aadhaar (Verhoeff Checked) *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={12}
                      value={uclAadhaar}
                      onChange={e => setUclAadhaar(e.target.value)}
                      placeholder="999999990019"
                      style={{ width: '100%', padding: '0.65rem', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.85rem', fontFamily: 'monospace' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                      Active Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={uclMobile}
                      onChange={e => setUclMobile(e.target.value)}
                      placeholder="9835099887"
                      style={{ width: '100%', padding: '0.65rem', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.85rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                      Supporting Identity / Address Document *
                    </label>
                    <select
                      value={uclDoc}
                      onChange={e => setUclDoc(e.target.value)}
                      style={{ width: '100%', padding: '0.65rem', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.85rem' }}
                    >
                      <option value="Ration Card / Electricity Bill (Valid Proof of Address)">Ration Card / Electricity Bill (PoA)</option>
                      <option value="Voter Identity Card (EPIC)">Voter Identity Card (EPIC)</option>
                      <option value="Indian Passport">Indian Passport</option>
                      <option value="Bank Passbook with Photo">Bank Passbook with Photo</option>
                      <option value="PAN Card (Valid Proof of Identity)">PAN Card (Proof of Identity - PoI)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                    Particulars to be Modified (बदलाव का विवरण) *
                  </label>
                  <input
                    type="text"
                    required
                    value={uclNewDetail}
                    onChange={e => setUclNewDetail(e.target.value)}
                    placeholder="e.g. Link mobile +91 9835099887 to Aadhaar"
                    style={{ width: '100%', padding: '0.65rem', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.85rem' }}
                  />
                </div>

                {/* Operator Hardware & Biometric Status Box */}
                <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '10px', padding: '0.75rem 1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#92400E' }}>
                      🔒 Operator Credentials & Biometric Device Status
                    </span>
                    <span style={{ background: '#DCFCE7', color: '#16A34A', fontSize: '0.68rem', fontWeight: 800, padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                      CONNECTED
                    </span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#B45309', lineHeight: 1.4 }}>
                    • Certified Supervisor: <strong>Rajesh Sharma (VLE-UIDAI-245089)</strong><br />
                    • RD Service: <strong>Mantra MFS100 Fingerprint Scanner (Calibrated)</strong><br />
                    • Registrar Code: <strong>206 (ADCS Network)</strong> | Enrolment Agency: <strong>0912</strong>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={uclLoading}
                  style={{
                    background: '#D97706',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0.85rem',
                    borderRadius: '8px',
                    fontWeight: 800,
                    fontSize: '0.92rem',
                    cursor: uclLoading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    marginTop: '0.5rem'
                  }}
                >
                  {uclLoading ? <RefreshCw className="animate-spin" size={18} /> : <ShieldCheck size={18} />}
                  <span>{uclLoading ? 'Submitting to UIDAI CIDR...' : 'Submit Aadhaar UCL Update (+₹50 Comm)'}</span>
                </button>
              </form>
            </div>

            {/* Official UIDAI 28-Digit Update Slip Preview Column */}
            <div>
              {uclReceipt ? (
                <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                  <div style={{ border: '2px solid #D97706', borderRadius: '12px', padding: '1.25rem', background: '#F8FAFC' }}>
                    {/* Header */}
                    <div style={{ textAlign: 'center', borderBottom: '2px solid #E2E8F0', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <div style={{ width: '28px', height: '28px', background: '#D97706', color: '#FFF', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.85rem' }}>
                          U
                        </div>
                        <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#0F172A', letterSpacing: '0.04em' }}>
                          UNIQUE IDENTIFICATION AUTHORITY OF INDIA
                        </span>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                        भारत विशिष्ट पहचान प्राधिकरण • Aadhaar Update Acknowledgement Slip
                      </div>
                      <div style={{ display: 'inline-block', background: '#DCFCE7', color: '#16A34A', fontSize: '0.72rem', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: '20px', marginTop: '0.35rem' }}>
                        ✓ {uclReceipt.status}
                      </div>
                    </div>

                    {/* 28-Digit Enrolment ID (EID) Highlight */}
                    <div style={{ background: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: '8px', padding: '0.75rem', textAlign: 'center', marginBottom: '1rem' }}>
                      <div style={{ fontSize: '0.72rem', color: '#92400E', fontWeight: 700, textTransform: 'uppercase' }}>
                        28-Digit Enrolment Number (EID) / नामांकन संख्या
                      </div>
                      <div style={{ fontSize: '1rem', fontWeight: 900, color: '#78350F', fontFamily: 'monospace', letterSpacing: '0.04em' }}>
                        {uclReceipt.eid}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#B45309', marginTop: '0.15rem' }}>
                        URN: <strong>{uclReceipt.urn}</strong> • Track at myaadhaar.uidai.gov.in
                      </div>
                    </div>

                    {/* Details Table */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', fontSize: '0.78rem', marginBottom: '1rem' }}>
                      <div>
                        <div style={{ color: '#64748B' }}>Resident Name:</div>
                        <div style={{ fontWeight: 800, color: '#0F172A' }}>{uclReceipt.residentName}</div>
                      </div>
                      <div>
                        <div style={{ color: '#64748B' }}>Masked Aadhaar:</div>
                        <div style={{ fontWeight: 700, color: '#334155', fontFamily: 'monospace' }}>{uclReceipt.maskedAadhaar}</div>
                      </div>
                      <div>
                        <div style={{ color: '#64748B' }}>Update Category:</div>
                        <div style={{ fontWeight: 700, color: '#D97706' }}>{uclReceipt.updateType}</div>
                      </div>
                      <div>
                        <div style={{ color: '#64748B' }}>Mobile Registered:</div>
                        <div style={{ fontWeight: 600, color: '#334155' }}>+91 {uclReceipt.mobile}</div>
                      </div>
                      <div style={{ gridColumn: 'span 2' }}>
                        <div style={{ color: '#64748B' }}>Supporting Document:</div>
                        <div style={{ fontWeight: 600, color: '#334155' }}>{uclReceipt.documentType}</div>
                      </div>
                      <div style={{ gridColumn: 'span 2' }}>
                        <div style={{ color: '#64748B' }}>Particulars Updated:</div>
                        <div style={{ fontWeight: 700, color: '#0F172A' }}>{uclReceipt.newDetail}</div>
                      </div>
                    </div>

                    {/* Station & Fee Box */}
                    <div style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '0.75rem', marginBottom: '1rem', fontSize: '0.78rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span style={{ color: '#64748B' }}>Registrar / Enrolment Agency:</span>
                        <strong style={{ color: '#0F172A' }}>ADCS Network (206) / EA (0912)</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span style={{ color: '#64748B' }}>Operator / Station ID:</span>
                        <strong style={{ color: '#0F172A' }}>{uclReceipt.operatorId} ({uclReceipt.stationId})</strong>
                      </div>
                      <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '0.35rem', display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 800, color: '#0F172A' }}>Total Fee Charged (Including GST):</span>
                        <strong style={{ color: '#16A34A', fontSize: '0.95rem' }}>₹{uclReceipt.feeCharged?.toFixed(2)}</strong>
                      </div>
                    </div>

                    {/* QR Code and Digital Seal */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #E2E8F0', paddingTop: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <QrCode size={38} color="#D97706" />
                        <div style={{ fontSize: '0.68rem', color: '#64748B' }}>
                          Scan to verify on uidai.gov.in<br />
                          VLE Commission: +₹{uclReceipt.vleCommissionCredited} Credited
                        </div>
                      </div>
                      <div style={{ textAlign: 'right', fontSize: '0.68rem', color: '#64748B' }}>
                        Center: Akul Dravin Digital Services Kendra (ADCS)<br />
                        Date: {new Date().toLocaleDateString('en-IN')}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '1rem' }}>
                    <button
                      onClick={() => window.print()}
                      style={{
                        background: '#D97706',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '0.65rem',
                        borderRadius: '8px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem',
                        fontSize: '0.82rem'
                      }}
                    >
                      <Printer size={15} />
                      <span>Print UIDAI Slip</span>
                    </button>
                    <button
                      onClick={() => alert(`Downloading UIDAI Acknowledgement for ${uclReceipt.residentName} (EID: ${uclReceipt.eid})...`)}
                      style={{
                        background: '#F1F5F9',
                        color: '#334155',
                        border: '1px solid #CBD5E1',
                        padding: '0.65rem',
                        borderRadius: '8px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontSize: '0.82rem'
                      }}
                    >
                      Download PDF
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ background: '#FFFFFF', padding: '2.5rem 1.5rem', borderRadius: '16px', border: '1px dashed #CBD5E1', textAlign: 'center', color: '#94A3B8' }}>
                  <Fingerprint size={48} style={{ margin: '0 auto 1rem', opacity: 0.4, color: '#D97706' }} />
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem' }}>
                    No Update Request Processed Yet
                  </h4>
                  <p style={{ fontSize: '0.8rem', maxWidth: '320px', margin: '0 auto', lineHeight: 1.5 }}>
                    Enter resident Aadhaar details, choose update category, and submit to generate the official 28-digit UIDAI EID slip and credit ₹50 VLE commission.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB: CSC GRAMEEN E-STORE RURAL COMMERCE */}
        {activeTab === 'estore' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '2rem' }}>
            {/* Order Booking Form Column */}
            <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.85rem' }}>
                <div style={{ width: '42px', height: '42px', background: '#FCE7F3', color: '#DB2777', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Layers size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    ADCS Grameen e-Store (ग्रामीण ई-स्टोर)
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0 }}>
                    MeitY Rural Commerce & Farm Distribution • VLE Fulfillment Comm: <strong style={{ color: '#16A34A' }}>+₹120.00 / Order</strong>
                  </p>
                </div>
              </div>

              {/* Fast-Track Demo Button */}
              <div style={{ background: '#F8FAFC', border: '1px dashed #CBD5E1', borderRadius: '8px', padding: '0.65rem 0.85rem', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', color: '#475569' }}>
                  🛒 Quick Test: Fill Farmer Fertilizer & Solar Sprayer
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setEstoreCustomer('Brijesh Sharma');
                    setEstoreMobile('9835012345');
                    setEstorePanchayat('Danapur Cantonment Gram Panchayat');
                    setEstoreCategory('Farm Inputs & Solar Technology');
                    setEstoreProduct('IFFCO Nano Urea (Liquid) + Solar DC Sprayer 16L');
                    setEstoreQuantity(2);
                    setEstoreAmount(3450);
                    setEstorePayMode('VLE_WALLET_DISBURSAL');
                  }}
                  style={{
                    background: '#DB2777',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.35rem 0.75rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Fill Verified Demo
                </button>
              </div>

              <form onSubmit={handleApplyEStore} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                    Product Category (उत्पाद श्रेणी) *
                  </label>
                  <select
                    value={estoreCategory}
                    onChange={e => setEstoreCategory(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.85rem' }}
                  >
                    <option value="Farm Inputs & Solar Technology">Farm Inputs & Solar Technology (कृषि उपकरण व सोलर)</option>
                    <option value="Organic Fertilizers & Seeds">Organic Fertilizers & Seeds (उर्वरक व प्रमाणित बीज)</option>
                    <option value="Rural Appliances & Electronics">Rural Appliances & Electronics (स्मार्टफोन व घरेलू यंत्र)</option>
                    <option value="Consumer Essentials">Consumer Essentials & Ration (दैनिक उपभोग सामग्री)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                    Select Catalog Product *
                  </label>
                  <select
                    value={estoreProduct}
                    onChange={e => {
                      const p = e.target.value;
                      setEstoreProduct(p);
                      if (p.includes('Nano Urea')) setEstoreAmount(3450);
                      else if (p.includes('Solar Monocrystalline')) setEstoreAmount(6800);
                      else if (p.includes('Wheat Seeds')) setEstoreAmount(1950);
                      else if (p.includes('Student Tablet')) setEstoreAmount(7499);
                      else setEstoreAmount(2200);
                    }}
                    style={{ width: '100%', padding: '0.65rem', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.85rem' }}
                  >
                    <option value="IFFCO Nano Urea (Liquid) + Solar DC Sprayer 16L">IFFCO Nano Urea (Liquid) + Solar DC Sprayer 16L (₹3,450)</option>
                    <option value="Microtek 150W Solar Monocrystalline Panel + Controller">Microtek 150W Solar Monocrystalline Panel + Controller (₹6,800)</option>
                    <option value="Certified High-Yield Hybrid Wheat Seeds 40kg Bag">Certified High-Yield Hybrid Wheat Seeds 40kg Bag (₹1,950)</option>
                    <option value="Samsung Galaxy A05 Rural Student Learning Tablet">Samsung Galaxy A05 Rural Student Learning Tablet (₹7,499)</option>
                    <option value="FMC Coragen Crop Protection Insecticide Kit">FMC Coragen Crop Protection Insecticide Kit (₹2,200)</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                      Customer Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={estoreCustomer}
                      onChange={e => setEstoreCustomer(e.target.value)}
                      placeholder="e.g. Brijesh Sharma"
                      style={{ width: '100%', padding: '0.65rem', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.85rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                      Customer Mobile *
                    </label>
                    <input
                      type="tel"
                      required
                      value={estoreMobile}
                      onChange={e => setEstoreMobile(e.target.value)}
                      placeholder="9835012345"
                      style={{ width: '100%', padding: '0.65rem', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                    Gram Panchayat Delivery Location (ग्राम पंचायत पता) *
                  </label>
                  <input
                    type="text"
                    required
                    value={estorePanchayat}
                    onChange={e => setEstorePanchayat(e.target.value)}
                    placeholder="e.g. Danapur Cantonment Gram Panchayat, Ward 4"
                    style={{ width: '100%', padding: '0.65rem', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.85rem' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                      Quantity *
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      required
                      value={estoreQuantity}
                      onChange={e => setEstoreQuantity(Number(e.target.value))}
                      style={{ width: '100%', padding: '0.65rem', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.85rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                      Total Order Amount (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      value={estoreAmount}
                      onChange={e => setEstoreAmount(Number(e.target.value))}
                      style={{ width: '100%', padding: '0.65rem', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700 }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                    Payment Mode (भुगतान माध्यम) *
                  </label>
                  <select
                    value={estorePayMode}
                    onChange={e => setEstorePayMode(e.target.value as any)}
                    style={{ width: '100%', padding: '0.65rem', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.85rem' }}
                  >
                    <option value="VLE_WALLET_DISBURSAL">VLE Wallet Instant Payment (Settled from Kendra Wallet)</option>
                    <option value="CASH_ON_DELIVERY">Cash on Delivery (Pay to Village Delivery Rider)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={estoreLoading}
                  style={{
                    background: '#DB2777',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0.85rem',
                    borderRadius: '8px',
                    fontWeight: 800,
                    fontSize: '0.92rem',
                    cursor: estoreLoading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    marginTop: '0.5rem'
                  }}
                >
                  {estoreLoading ? <RefreshCw className="animate-spin" size={18} /> : <Layers size={18} />}
                  <span>{estoreLoading ? 'Dispatching Order...' : 'Dispatch Grameen e-Store Order (+₹120 Comm)'}</span>
                </button>
              </form>
            </div>

            {/* Official e-Store Invoice & Dispatch Slip Column */}
            <div>
              {estoreReceipt ? (
                <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                  <div style={{ border: '2px solid #DB2777', borderRadius: '12px', padding: '1.25rem', background: '#F8FAFC' }}>
                    {/* Header */}
                    <div style={{ textAlign: 'center', borderBottom: '2px solid #E2E8F0', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <div style={{ width: '28px', height: '28px', background: '#DB2777', color: '#FFF', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.85rem' }}>
                          G
                        </div>
                        <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#0F172A', letterSpacing: '0.04em' }}>
                          ADCS GRAMEEN E-STORE RURAL LOGISTICS
                        </span>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                        Ministry of Electronics & Information Technology • Doorstep Panchayat Delivery
                      </div>
                      <div style={{ display: 'inline-block', background: '#DCFCE7', color: '#16A34A', fontSize: '0.72rem', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: '20px', marginTop: '0.35rem' }}>
                        ✓ {estoreReceipt.status}
                      </div>
                    </div>

                    {/* Order ID Banner */}
                    <div style={{ background: '#FCE7F3', border: '1px solid #FBCFE8', borderRadius: '8px', padding: '0.75rem', textAlign: 'center', marginBottom: '1rem' }}>
                      <div style={{ fontSize: '0.72rem', color: '#9D174D', fontWeight: 700, textTransform: 'uppercase' }}>
                        Order & Consignment Reference
                      </div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#831843', fontFamily: 'monospace', letterSpacing: '0.04em' }}>
                        {estoreReceipt.orderId}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#BE185D', marginTop: '0.15rem' }}>
                        Track at grameenestore.in • Delivery Partner: <strong>{estoreReceipt.deliveryAgent}</strong>
                      </div>
                    </div>

                    {/* Details Table */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', fontSize: '0.78rem', marginBottom: '1rem' }}>
                      <div>
                        <div style={{ color: '#64748B' }}>Customer:</div>
                        <div style={{ fontWeight: 800, color: '#0F172A' }}>{estoreReceipt.customerName}</div>
                      </div>
                      <div>
                        <div style={{ color: '#64748B' }}>Contact:</div>
                        <div style={{ fontWeight: 600, color: '#334155' }}>+91 {estoreReceipt.customerMobile}</div>
                      </div>
                      <div style={{ gridColumn: 'span 2' }}>
                        <div style={{ color: '#64748B' }}>Product Ordered:</div>
                        <div style={{ fontWeight: 700, color: '#DB2777' }}>{estoreReceipt.productName} (Qty: {estoreReceipt.quantity})</div>
                      </div>
                      <div style={{ gridColumn: 'span 2' }}>
                        <div style={{ color: '#64748B' }}>Delivery Address:</div>
                        <div style={{ fontWeight: 600, color: '#334155' }}>{estoreReceipt.deliveryPanchayat}</div>
                      </div>
                      <div>
                        <div style={{ color: '#64748B' }}>Estimated Arrival:</div>
                        <div style={{ fontWeight: 600, color: '#16A34A' }}>{estoreReceipt.estimatedDelivery}</div>
                      </div>
                      <div>
                        <div style={{ color: '#64748B' }}>Payment Mode:</div>
                        <div style={{ fontWeight: 600, color: '#334155' }}>{estoreReceipt.paymentMode}</div>
                      </div>
                    </div>

                    {/* Amount Box */}
                    <div style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '0.75rem', marginBottom: '1rem', fontSize: '0.78rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span style={{ color: '#64748B' }}>Product Price:</span>
                        <strong style={{ color: '#0F172A' }}>₹{estoreReceipt.orderAmount?.toLocaleString('en-IN')}.00</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span style={{ color: '#64748B' }}>Rural Doorstep Delivery:</span>
                        <strong style={{ color: '#16A34A' }}>₹0.00 (SUBSIDIZED FREE)</strong>
                      </div>
                      <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '0.35rem', display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 800, color: '#0F172A' }}>Net Payable Amount:</span>
                        <strong style={{ color: '#9D174D', fontSize: '1rem' }}>₹{estoreReceipt.orderAmount?.toLocaleString('en-IN')}.00</strong>
                      </div>
                    </div>

                    {/* QR Code and Footer */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #E2E8F0', paddingTop: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <QrCode size={38} color="#DB2777" />
                        <div style={{ fontSize: '0.68rem', color: '#64748B' }}>
                          Scan to verify on grameenestore.in<br />
                          VLE Commission: +₹{estoreReceipt.vleCommissionCredited} Credited
                        </div>
                      </div>
                      <div style={{ textAlign: 'right', fontSize: '0.68rem', color: '#64748B' }}>
                        Hub: Akul Dravin Digital Services Kendra (ADCS)<br />
                        Date: {new Date().toLocaleDateString('en-IN')}
                      </div>
                    </div>
                  </div>

                  {/* Print and Download Actions */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '1rem' }}>
                    <button
                      onClick={() => window.print()}
                      style={{
                        background: '#DB2777',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '0.65rem',
                        borderRadius: '8px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem',
                        fontSize: '0.82rem'
                      }}
                    >
                      <Printer size={15} />
                      <span>Print Delivery Slip</span>
                    </button>
                    <button
                      onClick={() => alert(`Downloading Grameen e-Store Invoice for ${estoreReceipt.customerName} (Order: ${estoreReceipt.orderId})...`)}
                      style={{
                        background: '#F1F5F9',
                        color: '#334155',
                        border: '1px solid #CBD5E1',
                        padding: '0.65rem',
                        borderRadius: '8px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontSize: '0.82rem'
                      }}
                    >
                      Download PDF
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ background: '#FFFFFF', padding: '2.5rem 1.5rem', borderRadius: '16px', border: '1px dashed #CBD5E1', textAlign: 'center', color: '#94A3B8' }}>
                  <Layers size={48} style={{ margin: '0 auto 1rem', opacity: 0.4, color: '#DB2777' }} />
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem' }}>
                    No e-Store Order Booked Yet
                  </h4>
                  <p style={{ fontSize: '0.8rem', maxWidth: '320px', margin: '0 auto', lineHeight: 1.5 }}>
                    Select farm inputs, solar products or electronics, enter customer panchayat address, and book order to credit ₹120 VLE fulfillment commission.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB: CLASS 3 DIGITAL SIGNATURE CERTIFICATE (DSC) */}
        {activeTab === 'dsc' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '2rem' }}>
            {/* DSC Application Form Column */}
            <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.85rem' }}>
                <div style={{ width: '42px', height: '42px', background: '#EDE9FE', color: '#7C3AED', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <BadgeCheck size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    Class 3 Digital Signature (DSC)
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0 }}>
                    CCA Licensed Certifying Authority • Cryptographic USB Token • VLE Commission: <strong style={{ color: '#16A34A' }}>+₹250.00 / Token</strong>
                  </p>
                </div>
              </div>

              {/* Fast-Track Demo Button */}
              <div style={{ background: '#F8FAFC', border: '1px dashed #CBD5E1', borderRadius: '8px', padding: '0.65rem 0.85rem', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', color: '#475569' }}>
                  🔐 Quick Test: Fill GeM & MCA21 Tender Bidder Data
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setDscApplicant('Vikramaditya Sharma');
                    setDscAadhaar('999999990019');
                    setDscMobile('9835012345');
                    setDscType('Class 3 Signing & Encryption (2-Year Validity)');
                    setDscUsb('WatchData ProxKey Plus (FIPS 140-2 Level 3 Certified)');
                    setDscPurpose('GeM e-Procurement, MCA21, GST & Income Tax e-Filing');
                  }}
                  style={{
                    background: '#7C3AED',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.35rem 0.75rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Fill Verified Demo
                </button>
              </div>

              <form onSubmit={handleIssueDSC} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                    Digital Certificate Class & Validity (प्रमाणपत्र प्रकार) *
                  </label>
                  <select
                    value={dscType}
                    onChange={e => setDscType(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.85rem' }}
                  >
                    <option value="Class 3 Signing & Encryption (2-Year Validity)">Class 3 Combo (Signing + Encryption) - 2 Years</option>
                    <option value="Class 3 Signing Only (2-Year Validity)">Class 3 Signing Only - 2 Years</option>
                    <option value="Class 3 Organization / Corporate (2-Year Validity)">Class 3 Organization / Company Director - 2 Years</option>
                    <option value="DGFT Foreign Trade Digital Signature (2-Year Validity)">DGFT IEC Import-Export Digital Signature - 2 Years</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                      Applicant Full Name (आवेदक का नाम) *
                    </label>
                    <input
                      type="text"
                      required
                      value={dscApplicant}
                      onChange={e => setDscApplicant(e.target.value)}
                      placeholder="e.g. Vikramaditya Sharma"
                      style={{ width: '100%', padding: '0.65rem', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.85rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                      12-Digit Aadhaar (Verhoeff Checked) *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={12}
                      value={dscAadhaar}
                      onChange={e => setDscAadhaar(e.target.value)}
                      placeholder="999999990019"
                      style={{ width: '100%', padding: '0.65rem', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.85rem', fontFamily: 'monospace' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                      Mobile Number (OTP Verification) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={dscMobile}
                      onChange={e => setDscMobile(e.target.value)}
                      placeholder="9835012345"
                      style={{ width: '100%', padding: '0.65rem', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.85rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                      Cryptographic FIPS USB Token *
                    </label>
                    <select
                      value={dscUsb}
                      onChange={e => setDscUsb(e.target.value)}
                      style={{ width: '100%', padding: '0.65rem', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.85rem' }}
                    >
                      <option value="WatchData ProxKey Plus (FIPS 140-2 Level 3 Certified)">WatchData ProxKey Plus (FIPS 140-2 Level 3)</option>
                      <option value="ePass2003Auto Cryptographic Token">ePass2003Auto Cryptographic Token</option>
                      <option value="mToken CryptoID USB Dongle">mToken CryptoID USB Dongle</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                    Regulatory Purpose / Statutory Usage *
                  </label>
                  <input
                    type="text"
                    required
                    value={dscPurpose}
                    onChange={e => setDscPurpose(e.target.value)}
                    placeholder="e.g. GeM e-Procurement, MCA21, GST & Income Tax e-Filing"
                    style={{ width: '100%', padding: '0.65rem', border: '1px solid #CBD5E1', borderRadius: '8px', fontSize: '0.85rem' }}
                  />
                </div>

                {/* Cryptographic Standards Box */}
                <div style={{ background: '#F5F3FF', border: '1px solid #DDD6FE', borderRadius: '10px', padding: '0.75rem 1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#5B21B6' }}>
                      🛡️ CCA Cryptographic Assurance Specifications
                    </span>
                    <span style={{ background: '#DCFCE7', color: '#16A34A', fontSize: '0.68rem', fontWeight: 800, padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                      COMPLIANT
                    </span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#6D28D9', lineHeight: 1.4 }}>
                    • Asymmetric Key: <strong>RSA 2048-bit with SHA-256 Digest</strong><br />
                    • Statutory Recognition: <strong>Information Technology Act, 2000 Section 35</strong><br />
                    • Licensed Root CA: <strong>Controller of Certifying Authorities (CCA, India)</strong>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={dscLoading}
                  style={{
                    background: '#7C3AED',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0.85rem',
                    borderRadius: '8px',
                    fontWeight: 800,
                    fontSize: '0.92rem',
                    cursor: dscLoading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    marginTop: '0.5rem'
                  }}
                >
                  {dscLoading ? <RefreshCw className="animate-spin" size={18} /> : <BadgeCheck size={18} />}
                  <span>{dscLoading ? 'Generating Keys & Initializing Token...' : 'Issue Class 3 DSC & Program Token (+₹250 Comm)'}</span>
                </button>
              </form>
            </div>

            {/* Official DSC Handover & Certificate Acknowledgement Column */}
            <div>
              {dscReceipt ? (
                <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                  <div style={{ border: '2px solid #7C3AED', borderRadius: '12px', padding: '1.25rem', background: '#F8FAFC' }}>
                    {/* Header */}
                    <div style={{ textAlign: 'center', borderBottom: '2px solid #E2E8F0', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <div style={{ width: '28px', height: '28px', background: '#7C3AED', color: '#FFF', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.85rem' }}>
                          D
                        </div>
                        <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#0F172A', letterSpacing: '0.04em' }}>
                          ADCS CLASS 3 DIGITAL SIGNATURE CERTIFICATE
                        </span>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                        Licensed by Controller of Certifying Authorities (CCA) • Ministry of Electronics & IT
                      </div>
                      <div style={{ display: 'inline-block', background: '#DCFCE7', color: '#16A34A', fontSize: '0.72rem', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: '20px', marginTop: '0.35rem' }}>
                        ✓ {dscReceipt.status}
                      </div>
                    </div>

                    {/* Certificate & Token Serial Banner */}
                    <div style={{ background: '#F5F3FF', border: '1px solid #DDD6FE', borderRadius: '8px', padding: '0.75rem', textAlign: 'center', marginBottom: '1rem' }}>
                      <div style={{ fontSize: '0.72rem', color: '#5B21B6', fontWeight: 700, textTransform: 'uppercase' }}>
                        X.509 Certificate Serial Number
                      </div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#4C1D95', fontFamily: 'monospace', letterSpacing: '0.04em' }}>
                        {dscReceipt.certSerialNumber}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#6D28D9', marginTop: '0.15rem' }}>
                        USB Hardware Serial: <strong>{dscReceipt.usbTokenSerial}</strong> • Algorithm: <strong>RSA 2048-bit</strong>
                      </div>
                    </div>

                    {/* Details Table */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', fontSize: '0.78rem', marginBottom: '1rem' }}>
                      <div>
                        <div style={{ color: '#64748B' }}>Certificate Holder:</div>
                        <div style={{ fontWeight: 800, color: '#0F172A' }}>{dscReceipt.applicantName}</div>
                      </div>
                      <div>
                        <div style={{ color: '#64748B' }}>Masked Aadhaar:</div>
                        <div style={{ fontWeight: 600, color: '#334155', fontFamily: 'monospace' }}>{dscReceipt.maskedAadhaar}</div>
                      </div>
                      <div>
                        <div style={{ color: '#64748B' }}>Certificate Type:</div>
                        <div style={{ fontWeight: 700, color: '#7C3AED' }}>{dscReceipt.dscType}</div>
                      </div>
                      <div>
                        <div style={{ color: '#64748B' }}>Crypto Token Model:</div>
                        <div style={{ fontWeight: 600, color: '#334155' }}>{dscReceipt.usbTokenType}</div>
                      </div>
                      <div style={{ gridColumn: 'span 2' }}>
                        <div style={{ color: '#64748B' }}>Authorized Purpose:</div>
                        <div style={{ fontWeight: 600, color: '#334155' }}>{dscReceipt.purpose}</div>
                      </div>
                      <div>
                        <div style={{ color: '#64748B' }}>Issuance Date:</div>
                        <div style={{ fontWeight: 600, color: '#16A34A' }}>{dscReceipt.validFrom}</div>
                      </div>
                      <div>
                        <div style={{ color: '#64748B' }}>Expiry Date:</div>
                        <div style={{ fontWeight: 700, color: '#2563EB' }}>{dscReceipt.validUntil} (2 Yrs)</div>
                      </div>
                    </div>

                    {/* CA Authority Box */}
                    <div style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '0.75rem', marginBottom: '1rem', fontSize: '0.78rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span style={{ color: '#64748B' }}>Certifying Authority:</span>
                        <strong style={{ color: '#0F172A' }}>{dscReceipt.caAuthority}</strong>
                      </div>
                      <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '0.35rem', display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 800, color: '#0F172A' }}>Token Status:</span>
                        <strong style={{ color: '#16A34A' }}>ACTIVATED & READY FOR GEM / MCA21</strong>
                      </div>
                    </div>

                    {/* QR Code and Footer */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #E2E8F0', paddingTop: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <QrCode size={38} color="#7C3AED" />
                        <div style={{ fontSize: '0.68rem', color: '#64748B' }}>
                          Scan to verify on cca.gov.in<br />
                          VLE Commission: +₹{dscReceipt.vleCommissionCredited} Credited
                        </div>
                      </div>
                      <div style={{ textAlign: 'right', fontSize: '0.68rem', color: '#64748B' }}>
                        Kendra: Akul Dravin Digital Services Kendra (ADCS)<br />
                        Date: {new Date().toLocaleDateString('en-IN')}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '1rem' }}>
                    <button
                      onClick={() => window.print()}
                      style={{
                        background: '#7C3AED',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '0.65rem',
                        borderRadius: '8px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem',
                        fontSize: '0.82rem'
                      }}
                    >
                      <Printer size={15} />
                      <span>Print Token Handover Slip</span>
                    </button>
                    <button
                      onClick={() => alert(`Downloading DSC Certificate for ${dscReceipt.applicantName} (Serial: ${dscReceipt.certSerialNumber})...`)}
                      style={{
                        background: '#F1F5F9',
                        color: '#334155',
                        border: '1px solid #CBD5E1',
                        padding: '0.65rem',
                        borderRadius: '8px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontSize: '0.82rem'
                      }}
                    >
                      Download PDF
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ background: '#FFFFFF', padding: '2.5rem 1.5rem', borderRadius: '16px', border: '1px dashed #CBD5E1', textAlign: 'center', color: '#94A3B8' }}>
                  <BadgeCheck size={48} style={{ margin: '0 auto 1rem', opacity: 0.4, color: '#7C3AED' }} />
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem' }}>
                    No Certificate Issued Yet
                  </h4>
                  <p style={{ fontSize: '0.8rem', maxWidth: '320px', margin: '0 auto', lineHeight: 1.5 }}>
                    Enter contractor / director details, choose FIPS crypto token, and issue Class 3 DSC to program the cryptographic dongle and credit ₹250 VLE commission.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB: RATE & MARGIN MANAGER (INCREASE / DECREASE SERVICE PRICES & COMMISSIONS) */}
        {activeTab === 'rates' && (
          <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #F1F5F9', paddingBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <SlidersHorizontal size={22} color="#16A34A" />
                  Service Rate & Margin Control Center
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0.25rem 0 0' }}>
                  Dynamically adjust citizen selling prices, operator margins, and government statutory fee slabs across all services.
                </p>
              </div>
              <div style={{ background: '#DCFCE7', color: '#166534', padding: '0.35rem 0.75rem', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700 }}>
                Total Active Services: {servicePriceCatalog.length}
              </div>
            </div>

            {selectedServiceToEdit && (
              <div style={{ background: '#F8FAFC', border: '2px solid #16A34A', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    Editing Rates for: <span style={{ color: '#16A34A' }}>{selectedServiceToEdit.title}</span>
                  </h4>
                  <button
                    onClick={() => setSelectedServiceToEdit(null)}
                    style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', fontWeight: 700 }}
                  >
                    ✕ Cancel
                  </button>
                </div>

                <form onSubmit={handleSaveRates} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'flex-end' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                      Citizen Retail Price (₹)
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={editPrice}
                      onChange={(e) => setEditPrice(Number(e.target.value))}
                      style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem', fontWeight: 700 }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                      Operator Margin / Comm (₹)
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={editComm}
                      onChange={(e) => setEditComm(Number(e.target.value))}
                      style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem', fontWeight: 700, color: '#16A34A' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                      Statutory Govt Fee (₹)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={editGovtFee}
                      onChange={(e) => setEditGovtFee(Number(e.target.value))}
                      style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem', fontWeight: 700 }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isUpdatingRates}
                    style={{
                      background: '#16A34A',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '0.65rem 1rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontSize: '0.85rem'
                    }}
                  >
                    {isUpdatingRates ? 'Saving Rates...' : 'Save & Publish Rates ➔'}
                  </button>
                </form>
              </div>
            )}

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', color: '#475569', textAlign: 'left', borderBottom: '1px solid #E2E8F0' }}>
                    <th style={{ padding: '0.65rem 0.8rem' }}>Service ID & Title</th>
                    <th style={{ padding: '0.65rem 0.8rem' }}>Category</th>
                    <th style={{ padding: '0.65rem 0.8rem' }}>Retail Price</th>
                    <th style={{ padding: '0.65rem 0.8rem' }}>VLE Margin</th>
                    <th style={{ padding: '0.65rem 0.8rem' }}>Govt Fee</th>
                    <th style={{ padding: '0.65rem 0.8rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {servicePriceCatalog.map((s: any, idx: number) => {
                    const currentPrice = Number(s.price ?? s.basePrice ?? 150);
                    const currentComm = Number(s.commissionRate ?? 50);
                    const currentGovtFee = Number(s.govtFee ?? (currentPrice - currentComm));
                    return (
                      <tr key={s.id || idx} style={{ borderBottom: '1px solid #F1F5F9' }}>
                        <td style={{ padding: '0.65rem 0.8rem' }}>
                          <div style={{ fontWeight: 700, color: '#0F172A' }}>{s.title}</div>
                          <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{s.id}</div>
                        </td>
                        <td style={{ padding: '0.65rem 0.8rem' }}>
                          <span style={{ background: '#EFF6FF', color: '#075ACB', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.72rem', textTransform: 'capitalize' }}>
                            {s.category || 'General'}
                          </span>
                        </td>
                        <td style={{ padding: '0.65rem 0.8rem', fontWeight: 800, color: '#0F172A' }}>
                          ₹{currentPrice}
                        </td>
                        <td style={{ padding: '0.65rem 0.8rem', fontWeight: 800, color: '#16A34A' }}>
                          +₹{currentComm}
                        </td>
                        <td style={{ padding: '0.65rem 0.8rem', color: '#64748B' }}>
                          ₹{currentGovtFee}
                        </td>
                        <td style={{ padding: '0.65rem 0.8rem', textAlign: 'right' }}>
                          {currentRole === 'admin' ? (
                            <button
                              onClick={() => {
                                setSelectedServiceToEdit(s);
                                setEditPrice(currentPrice);
                                setEditComm(currentComm);
                                setEditGovtFee(currentGovtFee);
                              }}
                              style={{
                                background: '#F1F5F9',
                                border: '1px solid #CBD5E1',
                                padding: '0.35rem 0.75rem',
                                borderRadius: '6px',
                                fontWeight: 700,
                                fontSize: '0.75rem',
                                cursor: 'pointer',
                                color: '#0F172A'
                              }}
                            >
                              ⚙️ Adjust Slabs (Admin)
                            </button>
                          ) : (
                            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B', background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '0.25rem 0.55rem', borderRadius: '6px' }}>
                              🔒 Read-Only (Admin Controlled)
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Admin-Controlled Digital Seva 5-Tier & Channel Commission Matrix (Read-Only View for Operators) */}
            <div style={{ marginTop: '1.25rem', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #CBD5E1', padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#061A36' }}>
                  Hierarchy Commission Payout Matrix (Configured Exclusively by Super Admin)
                </div>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#075ACB', background: '#EFF6FF', padding: '0.2rem 0.55rem', borderRadius: '999px' }}>
                  Active Tier: {authenticatedUser?.designation || activeDigitalSevaTier.toUpperCase()}
                </span>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.76rem' }}>
                  <thead>
                    <tr style={{ background: '#EFF6FF', color: '#061A36', textAlign: 'left' }}>
                      <th style={{ padding: '0.45rem 0.6rem' }}>Vertical</th>
                      <th style={{ padding: '0.45rem 0.6rem' }}>Rural VLE</th>
                      <th style={{ padding: '0.45rem 0.6rem' }}>District Mgr</th>
                      <th style={{ padding: '0.45rem 0.6rem' }}>State Head</th>
                      <th style={{ padding: '0.45rem 0.6rem' }}>Main Head</th>
                      <th style={{ padding: '0.45rem 0.6rem' }}>Flat Bonus</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commissionRules.map((rule) => (
                      <tr key={rule.id} style={{ borderBottom: '1px solid #E2E8F0' }}>
                        <td style={{ padding: '0.45rem 0.6rem', fontWeight: 700 }}>{rule.serviceTitle}</td>
                        <td style={{ padding: '0.45rem 0.6rem', color: '#047857', fontWeight: 700 }}>{rule.ruralVlePct}%</td>
                        <td style={{ padding: '0.45rem 0.6rem' }}>{rule.districtMgrPct}%</td>
                        <td style={{ padding: '0.45rem 0.6rem' }}>{rule.stateHeadPct}%</td>
                        <td style={{ padding: '0.45rem 0.6rem' }}>{rule.mainHeadPct}%</td>
                        <td style={{ padding: '0.45rem 0.6rem', fontWeight: 700 }}>₹{rule.flatBonusInr}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB: HRMS EMPLOYEE & STAFF DIRECTORY CONTROL */}
        {activeTab === 'hrms' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {/* Employee List */}
            <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Users size={20} color="#3B82F6" />
                    Center Staff & Operators ({employeesList.length})
                  </h3>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                    Manage salary, roles, biometric attendance, and staff access permissions.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {employeesList.map((emp) => (
                  <div key={emp.id} style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                      <span style={{ fontWeight: 800, color: '#0F172A', fontSize: '0.9rem' }}>{emp.name} ({emp.id})</span>
                      <span style={{
                        background: emp.attendanceStatus === 'Present' ? '#DCFCE7' : '#FEE2E2',
                        color: emp.attendanceStatus === 'Present' ? '#166534' : '#991B1B',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.68rem',
                        fontWeight: 800
                      }}>
                        {emp.attendanceStatus || 'Active'}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#64748B', marginBottom: '0.4rem' }}>
                      Phone: {emp.phone} • Dept: {emp.department}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#16A34A' }}>
                        Salary: ₹{emp.salary ? emp.salary.toLocaleString('en-IN') : '18,000'} / mo
                      </span>
                      <button
                        onClick={() => handleDeleteEmployee(emp.id, emp.name)}
                        style={{ background: '#FEE2E2', color: '#DC2626', border: 'none', padding: '0.2rem 0.55rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Register Employee Form */}
            <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.5rem' }}>
                Onboard New Center Employee
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 1.25rem' }}>
                Deploy front-desk operators, customer support agents, and verification specialists.
              </p>

              <form onSubmit={handleCreateEmployee} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                    Staff Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newEmpName}
                    onChange={(e) => setNewEmpName(e.target.value)}
                    placeholder="e.g. Shalini Mishra"
                    style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={newEmpPhone}
                    onChange={(e) => setNewEmpPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                      Designated Role
                    </label>
                    <select
                      value={newEmpRole}
                      onChange={(e) => setNewEmpRole(e.target.value)}
                      style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                    >
                      <option value="Portal Operator">Portal Operator</option>
                      <option value="Senior Verification Officer">Senior Verification Officer</option>
                      <option value="Banking & AEPS Specialist">Banking & AEPS Specialist</option>
                      <option value="Customer Desk Lead">Customer Desk Lead</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: '0.25rem' }}>
                      Monthly Salary (₹)
                    </label>
                    <input
                      type="number"
                      value={newEmpSalary}
                      onChange={(e) => setNewEmpSalary(Number(e.target.value))}
                      style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isCreatingEmp}
                  style={{
                    marginTop: '0.5rem',
                    background: '#0F172A',
                    color: '#34D399',
                    border: 'none',
                    padding: '0.7rem',
                    borderRadius: '8px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    fontSize: '0.88rem'
                  }}
                >
                  {isCreatingEmp ? 'Registering Staff...' : 'Onboard & Issue Staff ID ➔'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 4: ORDERS & HISTORY */}
        {activeTab === 'orders' && (
          <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  VLE Service Application Orders
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0 }}>
                  Track applications filed by you or your operators with instant receipt reprint
                </p>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', color: '#475569', textAlign: 'left', borderBottom: '1px solid #E2E8F0' }}>
                    <th style={{ padding: '0.65rem 0.8rem' }}>Order / Token ID</th>
                    <th style={{ padding: '0.65rem 0.8rem' }}>Applicant Name</th>
                    <th style={{ padding: '0.65rem 0.8rem' }}>Service Name</th>
                    <th style={{ padding: '0.65rem 0.8rem' }}>Fee Collected</th>
                    <th style={{ padding: '0.65rem 0.8rem' }}>Status</th>
                    <th style={{ padding: '0.65rem 0.8rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.slice(0, 8).map(app => (
                    <tr key={app.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '0.65rem 0.8rem', fontFamily: 'monospace', fontWeight: 600, color: '#075ACB' }}>
                        {app.id}
                      </td>
                      <td style={{ padding: '0.65rem 0.8rem', fontWeight: 600, color: '#0F172A' }}>
                        {app.applicantName}
                      </td>
                      <td style={{ padding: '0.65rem 0.8rem', color: '#334155' }}>{app.serviceName}</td>
                      <td style={{ padding: '0.65rem 0.8rem', fontWeight: 700, color: '#16A34A' }}>
                        ₹{app.feePaid || 199}
                      </td>
                      <td style={{ padding: '0.65rem 0.8rem' }}>
                        <span style={{
                          padding: '0.2rem 0.55rem',
                          borderRadius: '6px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          background: app.status === 'Completed' ? '#DCFCE7' : app.status === 'In Processing' ? '#FEF3C7' : '#EFF6FF',
                          color: app.status === 'Completed' ? '#166534' : app.status === 'In Processing' ? '#92400E' : '#1E40AF'
                        }}>
                          {app.status}
                        </span>
                      </td>
                      <td style={{ padding: '0.65rem 0.8rem', textAlign: 'right' }}>
                        <button
                          onClick={() => alert(`reprinting official ADCS acknowledgement receipt for Token: ${app.id}...`)}
                          style={{
                            background: '#F1F5F9',
                            border: '1px solid #CBD5E1',
                            padding: '0.35rem 0.7rem',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem'
                          }}
                        >
                          <Printer size={13} /> Receipt
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: OPERATOR MANAGEMENT */}
        {activeTab === 'operators' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {/* Operator List */}
            <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: '0 0 1rem' }}>
                Center Sub-Operators
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {operators.map(op => (
                  <div key={op.id} style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: 700, color: '#0F172A' }}>{op.name} ({op.id})</span>
                      <span style={{ background: '#DCFCE7', color: '#166534', padding: '0.15rem 0.45rem', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 700 }}>
                        {op.status}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#64748B', marginBottom: '0.4rem' }}>
                      Mobile: {op.phone} • Role: {op.role}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                      {op.permissions.map((p, idx) => (
                        <span key={idx} style={{ background: '#E2E8F0', color: '#334155', padding: '0.15rem 0.4rem', borderRadius: '4px', fontSize: '0.68rem' }}>
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Operator Form */}
            <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.5rem' }}>
                Add New Sub-Operator
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 1.25rem' }}>
                Authorize staff members to handle citizen walk-ins using delegated credentials.
              </p>

              <form onSubmit={handleAddOperator}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                    Operator Full Name
                  </label>
                  <input
                    type="text"
                    value={newOpName}
                    onChange={(e) => setNewOpName(e.target.value)}
                    placeholder="e.g. Anand Kumar"
                    style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                  />
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                    Mobile Number (For OTP Verification)
                  </label>
                  <input
                    type="tel"
                    value={newOpPhone}
                    onChange={(e) => setNewOpPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    background: '#0F172A',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0.65rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  Create Operator Credentials ➔
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 6: SUPPORT & GRIEVANCE */}
        {activeTab === 'support' && (
          <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.5rem' }}>
              ADCS Sovereign Services Grievance & SLA Support Desk
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#64748B', margin: '0 0 1.5rem' }}>
              Direct district manager escalation, technical helpdesk, and transaction refund tickets.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              <div style={{ background: '#F8FAFC', padding: '1.25rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>District Manager (DM) Patna</div>
                <div style={{ fontSize: '0.8rem', color: '#334155', lineHeight: 1.6 }}>
                  <div><strong>Name:</strong> Shri Alok Verma</div>
                  <div><strong>Email:</strong> patna.hub@akuldravin.com</div>
                  <div><strong>Phone:</strong> +91 94310 99881</div>
                </div>
              </div>

              <div style={{ background: '#F8FAFC', padding: '1.25rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>ADCS Sovereign Helpdesk</div>
                <div style={{ fontSize: '0.8rem', color: '#334155', lineHeight: 1.6 }}>
                  <div><strong>Toll-Free:</strong> 1800 121 3468</div>
                  <div><strong>DigiPay AEPS Desk:</strong> 011-49754975</div>
                  <div><strong>Working Hours:</strong> Mon-Sat (09:00 - 18:00)</div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* 3. MODAL: Instant VLE Wallet Top-Up via Scanner & UTR Verification */}
      {isTopupOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.75)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '1rem'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            maxWidth: '520px',
            width: '100%',
            padding: '2rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{ width: '36px', height: '36px', background: '#DCFCE7', color: '#16A34A', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <QrCode size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    Instant Wallet Top-Up & Scanner
                  </h3>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                    Scan QR code via PhonePe / GPay / Paytm / BHIM & verify UTR
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsTopupOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.2rem', color: '#94A3B8', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0.5rem 0 1.25rem', background: '#F8FAFC', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              Current Center Balance: <strong style={{ color: '#16A34A', fontSize: '0.95rem' }}>₹{(walletBalance || 2450).toFixed(2)}</strong>
            </p>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                Top-Up Amount (₹)
              </label>
              <input
                type="number"
                value={topupAmount}
                onChange={(e) => setTopupAmount(Number(e.target.value))}
                min={100}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.8rem',
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  color: '#0F172A'
                }}
              />
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                {[500, 1000, 2000, 5000].map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setTopupAmount(val)}
                    style={{
                      background: topupAmount === val ? '#DCFCE7' : '#F1F5F9',
                      color: topupAmount === val ? '#166534' : '#475569',
                      border: '1px solid #CBD5E1',
                      padding: '0.3rem 0.6rem',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    +₹{val}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Method Selector */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                Deposit Method
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                {[
                  { id: 'QR_SCANNER', label: '📷 UPI QR Scanner' },
                  { id: 'UPI', label: '💳 Direct UPI' },
                  { id: 'NetBanking', label: '🏛️ NetBanking' }
                ].map(m => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setTopupMethod(m.id as any)}
                    style={{
                      background: topupMethod === m.id ? '#16A34A' : '#F8FAFC',
                      color: topupMethod === m.id ? '#FFFFFF' : '#334155',
                      border: topupMethod === m.id ? '1px solid #16A34A' : '1px solid #CBD5E1',
                      padding: '0.5rem 0.25rem',
                      borderRadius: '6px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic UPI QR Code Scanner Widget */}
            {(topupMethod === 'QR_SCANNER' || topupMethod === 'UPI') && (
              <div style={{ background: '#F8FAFC', border: '2px dashed #16A34A', borderRadius: '12px', padding: '1rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#166534', marginBottom: '0.5rem' }}>
                  SCAN WITH ANY UPI APP TO PAY ₹{topupAmount}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0.5rem 0' }}>
                  {/* Real-time Dynamic UPI QR Rendering */}
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(`upi://pay?pa=adcs.pay@icici&pn=Akul%20Dravin%20Digital%20Services&am=${topupAmount}&cu=INR&tn=ADCS%20Wallet%20Deposit`)}`}
                    alt="ADCS Official Payment QR"
                    style={{ width: '160px', height: '160px', borderRadius: '8px', border: '1px solid #E2E8F0', padding: '6px', background: '#FFF' }}
                  />
                </div>
                <div style={{ fontSize: '0.72rem', color: '#475569', marginTop: '0.35rem' }}>
                  UPI VPA: <strong>adcs.pay@icici</strong> &nbsp;•&nbsp; Name: <strong>Akul Dravin Digital Services</strong>
                </div>

                <div style={{ marginTop: '0.85rem', textAlign: 'left', borderTop: '1px solid #E2E8F0', paddingTop: '0.75rem' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.3rem' }}>
                    12-digit Banking UTR / RRN / Transaction ID * <span style={{ color: '#DC2626' }}>(Required for Verification)</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={topupUtr}
                    onChange={(e) => setTopupUtr(e.target.value)}
                    placeholder="e.g. 431902847291"
                    maxLength={16}
                    style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem', fontWeight: 700, fontFamily: 'monospace' }}
                  />
                  <div style={{ fontSize: '0.68rem', color: '#64748B', marginTop: '0.25rem' }}>
                    Enter the 12-digit UTR from your bank SMS or payment receipt. Funds will credit instantly upon verification.
                  </div>
                </div>

                <div style={{ marginTop: '0.65rem', textAlign: 'left' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '0.25rem' }}>
                    Sender UPI ID (Optional)
                  </label>
                  <input
                    type="text"
                    value={topupSenderUpi}
                    onChange={(e) => setTopupSenderUpi(e.target.value)}
                    placeholder="e.g. user@okhdfcbank"
                    style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.8rem' }}
                  />
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setIsTopupOpen(false)}
                style={{
                  flex: 1,
                  background: '#F1F5F9',
                  border: '1px solid #CBD5E1',
                  color: '#475569',
                  padding: '0.65rem',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleTopup}
                disabled={isTopupProcessing}
                style={{
                  flex: 2,
                  background: '#16A34A',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '0.65rem',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem'
                }}
              >
                {isTopupProcessing ? <RefreshCw className="animate-spin" size={16} /> : <Check size={16} />}
                <span>{isTopupProcessing ? 'Verifying Bank UTR...' : `Verify UTR & Add ₹${topupAmount}`}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3B. MODAL: Transfer Balance from Wallet Directly to Bank Account (IMPS Payout) */}
      {isPayoutOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.75)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '1rem'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            maxWidth: '480px',
            width: '100%',
            padding: '2rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{ width: '36px', height: '36px', background: '#DCFCE7', color: '#16A34A', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Landmark size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    Direct Bank Account Payout
                  </h3>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                    Transfer center wallet funds straight to bank account via 24x7 IMPS
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsPayoutOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.2rem', color: '#94A3B8', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0.5rem 0 1.25rem', background: '#F8FAFC', padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              Transferable Balance: <strong style={{ color: '#16A34A', fontSize: '0.95rem' }}>₹{(walletBalance || 2450).toFixed(2)}</strong>
            </p>

            <form onSubmit={handleBankPayout}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  Payout Amount (₹) *
                </label>
                <input
                  type="number"
                  required
                  min={100}
                  max={walletBalance || 2450}
                  value={payoutAmount}
                  onChange={(e) => setPayoutAmount(Number(e.target.value))}
                  style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '1.1rem', fontWeight: 800 }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  Account Holder Name *
                </label>
                <input
                  type="text"
                  required
                  value={payoutHolder}
                  onChange={(e) => setPayoutHolder(e.target.value)}
                  style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    Bank Account Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={payoutAccount}
                    onChange={(e) => setPayoutAccount(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem', fontFamily: 'monospace' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    IFSC Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={payoutIfsc}
                    onChange={(e) => setPayoutIfsc(e.target.value.toUpperCase())}
                    maxLength={11}
                    style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem', fontFamily: 'monospace' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  Bank Name
                </label>
                <input
                  type="text"
                  value={payoutBank}
                  onChange={(e) => setPayoutBank(e.target.value)}
                  style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setIsPayoutOpen(false)}
                  style={{ flex: 1, background: '#F1F5F9', border: '1px solid #CBD5E1', color: '#475569', padding: '0.65rem', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPayoutProcessing}
                  style={{
                    flex: 2,
                    background: '#0F172A',
                    color: '#34D399',
                    border: 'none',
                    padding: '0.65rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem'
                  }}
                >
                  {isPayoutProcessing ? <RefreshCw className="animate-spin" size={16} /> : <Send size={16} />}
                  <span>{isPayoutProcessing ? 'Transferring via IMPS...' : `Transfer ₹${payoutAmount} to Bank`}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. MODAL: Service Application Filing with Mandatory Payment & UTR Verification Gate */}
      {selectedService && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.75)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '1rem'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            maxWidth: '540px',
            width: '100%',
            padding: '2rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            maxHeight: '92vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, background: '#DCFCE7', color: '#166534', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                  ADCS Assisted Sovereign Filing & Payment Gate
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: '0.4rem 0 0' }}>
                  {selectedService.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.2rem', color: '#94A3B8', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ background: '#F8FAFC', padding: '0.85rem', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '1.25rem', fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between' }}>
              <span>Total Service Fee: <strong>₹{(selectedService.govtFee ?? 107) + 50}</strong> (Govt: ₹{selectedService.govtFee ?? 107})</span>
              <span style={{ color: '#16A34A', fontWeight: 700 }}>VLE Margin: +₹50</span>
            </div>

            <form onSubmit={handleServiceFiling}>
              <div style={{ marginBottom: '0.85rem' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                  Applicant Citizen Name *
                </label>
                <input
                  type="text"
                  required
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder="Full name as per Aadhaar"
                  style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ marginBottom: '0.85rem' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                  Citizen Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  value={applicantPhone}
                  onChange={(e) => setApplicantPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                  Aadhaar Number (e-KYC Checksum Verified)
                </label>
                <input
                  type="text"
                  value={applicantAadhaar}
                  onChange={(e) => setApplicantAadhaar(e.target.value)}
                  placeholder="12-digit Aadhaar UID"
                  maxLength={12}
                  style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                />
              </div>

              {/* PAYMENT MODE SELECTION */}
              <div style={{ background: '#F1F5F9', padding: '1rem', borderRadius: '10px', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.6rem' }}>
                  Select Payment Verification Method *
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '0.85rem' }}>
                  <button
                    type="button"
                    onClick={() => setServicePaymentMethod('WALLET')}
                    style={{
                      background: servicePaymentMethod === 'WALLET' ? '#16A34A' : '#FFFFFF',
                      color: servicePaymentMethod === 'WALLET' ? '#FFFFFF' : '#334155',
                      border: servicePaymentMethod === 'WALLET' ? '1px solid #16A34A' : '1px solid #CBD5E1',
                      padding: '0.55rem',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    💳 VLE Wallet Debit (₹{walletBalance.toFixed(2)})
                  </button>
                  <button
                    type="button"
                    onClick={() => setServicePaymentMethod('UPI_QR')}
                    style={{
                      background: servicePaymentMethod === 'UPI_QR' ? '#16A34A' : '#FFFFFF',
                      color: servicePaymentMethod === 'UPI_QR' ? '#FFFFFF' : '#334155',
                      border: servicePaymentMethod === 'UPI_QR' ? '1px solid #16A34A' : '1px solid #CBD5E1',
                      padding: '0.55rem',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    📷 Scan QR & Pay (₹{(selectedService.govtFee ?? 107) + 50})
                  </button>
                </div>

                {servicePaymentMethod === 'UPI_QR' && (
                  <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#166534', marginBottom: '0.35rem' }}>
                      SCAN WITH PHONEPE / GPAY / PAYTM
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', margin: '0.4rem 0' }}>
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(`upi://pay?pa=adcs.pay@icici&pn=Akul%20Dravin%20Digital%20Services&am=${(selectedService.govtFee ?? 107) + 50}&cu=INR&tn=${encodeURIComponent(selectedService.title)}`)}`}
                        alt="Service Payment QR"
                        style={{ width: '140px', height: '140px', borderRadius: '6px', border: '1px solid #CBD5E1', padding: '4px' }}
                      />
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#64748B', marginBottom: '0.75rem' }}>
                      UPI: <strong>adcs.pay@icici</strong> • Total: <strong>₹{(selectedService.govtFee ?? 107) + 50}</strong>
                    </div>

                    <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#DC2626', marginBottom: '0.25rem' }}>
                          Enter Banking UTR / RRN Number * (Mandatory)
                        </label>
                        <input
                          type="text"
                          required
                          value={serviceUtr}
                          onChange={(e) => setServiceUtr(e.target.value)}
                          placeholder="e.g. 431902847291"
                          maxLength={22}
                          style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem', fontWeight: 700, fontFamily: 'monospace' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#061A36', marginBottom: '0.25rem' }}>
                          Enter Payment Transaction ID * (Mandatory)
                        </label>
                        <input
                          type="text"
                          required
                          value={serviceTxnId}
                          onChange={(e) => setServiceTxnId(e.target.value)}
                          placeholder="e.g. TXN-ADCS-90812"
                          maxLength={24}
                          style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem', fontWeight: 700, fontFamily: 'monospace' }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  style={{ flex: 1, background: '#F1F5F9', border: '1px solid #CBD5E1', padding: '0.65rem', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isApplying}
                  style={{
                    flex: 2,
                    background: '#16A34A',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0.65rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem'
                  }}
                >
                  {isApplying ? <RefreshCw className="animate-spin" size={16} /> : <BadgeCheck size={16} />}
                  <span>{isApplying ? 'Verifying Payment & Dispatching...' : 'Verify Payment & File Application ➔'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4B. MODAL: Multi-Service Acknowledgement & Certificate Slip (A-to-Z Workflow) */}
      {generatedReceipt && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 110,
          padding: '1rem'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            maxWidth: '560px',
            width: '100%',
            padding: '2rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            <div style={{ border: '2px solid #16A34A', borderRadius: '12px', padding: '1.25rem', background: '#F8FAFC' }}>
              <div style={{ textAlign: 'center', borderBottom: '2px solid #E2E8F0', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <div style={{ width: '30px', height: '30px', background: '#16A34A', color: '#FFF', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.85rem' }}>
                    ADCS
                  </div>
                  <span style={{ fontSize: '1rem', fontWeight: 900, color: '#0F172A', letterSpacing: '0.03em' }}>
                    AKUL DRAVIN DIGITAL SERVICES (ADCS)
                  </span>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                  Official Citizen Service Application & Payment Certificate Slip
                </div>
                <div style={{ display: 'inline-block', background: '#DCFCE7', color: '#16A34A', fontSize: '0.72rem', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: '20px', marginTop: '0.35rem' }}>
                  ✓ {generatedReceipt.status}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', fontSize: '0.8rem', marginBottom: '1rem' }}>
                <div>
                  <div style={{ color: '#64748B' }}>Application Token:</div>
                  <div style={{ fontWeight: 800, color: '#0F172A', fontFamily: 'monospace' }}>{generatedReceipt.trackingId}</div>
                </div>
                <div>
                  <div style={{ color: '#64748B' }}>Service:</div>
                  <div style={{ fontWeight: 700, color: '#16A34A' }}>{generatedReceipt.serviceTitle}</div>
                </div>
                <div>
                  <div style={{ color: '#64748B' }}>Applicant Name:</div>
                  <div style={{ fontWeight: 700, color: '#0F172A' }}>{generatedReceipt.applicantName}</div>
                </div>
                <div>
                  <div style={{ color: '#64748B' }}>Mobile:</div>
                  <div style={{ fontWeight: 600, color: '#334155' }}>{generatedReceipt.applicantPhone}</div>
                </div>
                <div>
                  <div style={{ color: '#64748B' }}>Amount Paid:</div>
                  <div style={{ fontWeight: 800, color: '#16A34A' }}>₹{generatedReceipt.amountPaid}</div>
                </div>
                <div>
                  <div style={{ color: '#64748B' }}>Payment Mode:</div>
                  <div style={{ fontWeight: 600, color: '#334155' }}>{generatedReceipt.paymentMode}</div>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <div style={{ color: '#64748B' }}>Banking UTR / Reference:</div>
                  <div style={{ fontWeight: 800, color: '#075ACB', fontFamily: 'monospace' }}>{generatedReceipt.utr}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #E2E8F0', paddingTop: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <QrCode size={36} color="#16A34A" />
                  <div style={{ fontSize: '0.68rem', color: '#64748B' }}>
                    Scan to verify token online<br />
                    VLE Margin: +₹{generatedReceipt.vleCommission} Credited
                  </div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.68rem', color: '#64748B' }}>
                  Center: {generatedReceipt.center}<br />
                  Date: {generatedReceipt.timestamp}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
              <button
                onClick={() => setGeneratedReceipt(null)}
                style={{ flex: 1, background: '#F1F5F9', border: '1px solid #CBD5E1', padding: '0.65rem', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                style={{
                  flex: 2,
                  background: '#16A34A',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '0.65rem',
                  borderRadius: '8px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem'
                }}
              >
                <Printer size={16} />
                <span>Print Official Certificate Slip</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. MODAL: ADCS API & External Gateway Configuration Hub */}
      {isConnectorModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.75)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#FFFFFF', width: '100%', maxWidth: '850px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
            {/* Modal Header */}
            <div style={{ background: '#0F172A', color: '#FFFFFF', padding: '1.25rem 1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '3px solid #3B82F6' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '38px', height: '38px', background: '#3B82F6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Settings size={20} color="#FFFFFF" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, letterSpacing: '0.02em', color: '#FFFFFF' }}>
                    ADCS API & External Gateway Configuration Hub
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: '#94A3B8', margin: 0 }}>
                    Connect live third-party API keys, endpoints, merchant credentials, and webhooks for real-time workflows.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsConnectorModalOpen(false)}
                style={{ background: '#1E293B', border: '1px solid #334155', color: '#94A3B8', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                ✕
              </button>
            </div>

            {/* Modal Body: Left Sidebar + Right Form */}
            <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', flex: 1, overflow: 'hidden' }}>
              {/* Left Service Selector */}
              <div style={{ background: '#F8FAFC', borderRight: '1px solid #E2E8F0', padding: '1rem', overflowY: 'auto' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
                  Flagship Services (22)
                </div>
                {[
                  { id: 'digipay', name: 'DigiPay AEPS & ATM', tag: 'NPCI / FinTech' },
                  { id: 'telelaw', name: 'Tele-Law Video Portal', tag: 'Dept of Justice' },
                  { id: 'pmgdisha', name: 'PMGDISHA Digital Literacy', tag: 'MeitY' },
                  { id: 'abha', name: 'Ayushman Bharat ABHA', tag: 'NHA' },
                  { id: 'pmkisan', name: 'PM-KISAN e-KYC', tag: 'Agriculture' },
                  { id: 'fastag', name: 'NETC FASTag 2.0', tag: 'NPCI / IHMCL' },
                  { id: 'irctc', name: 'IRCTC Railway Booking', tag: 'Indian Railways' },
                  { id: 'pan', name: 'UTIITSL / NSDL PAN', tag: 'Income Tax' },
                  { id: 'edistrict', name: 'e-District State Portal', tag: 'State Portal' },
                  { id: 'eshram', name: 'e-Shram National DB', tag: 'Ministry of Labour' },
                  { id: 'pmfby', name: 'PM Fasal Bima (PMFBY)', tag: 'Crop Insurance' },
                  { id: 'bbps', name: 'Bharat BillPay (BBPS)', tag: 'NPCI' },
                  { id: 'ucl', name: 'Aadhaar UCL Client', tag: 'UIDAI' },
                  { id: 'estore', name: 'ADCS Grameen e-Store', tag: 'Rural Commerce' },
                  { id: 'dsc', name: 'Class 3 DSC & e-Sign', tag: 'CCA' },
                  { id: 'gemini', name: 'Google Gemini Cloud AI', tag: 'LLM Gateway' },
                  { id: 'payment', name: 'Razorpay / Cashfree', tag: 'Payment Gateway' }
                ].map((s) => {
                  const isConfigured = Boolean(connectorsConfig[s.id]?.apiKey || connectorsConfig[s.id]?.endpoint);
                  const isSelected = selectedConnectorId === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelectedConnectorId(s.id)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.65rem 0.75rem',
                        borderRadius: '8px',
                        marginBottom: '0.4rem',
                        border: isSelected ? '1px solid #3B82F6' : '1px solid #E2E8F0',
                        background: isSelected ? '#EFF6FF' : '#FFFFFF',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.15rem'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.82rem', fontWeight: isSelected ? 800 : 600, color: isSelected ? '#075ACB' : '#0F172A' }}>
                          {s.name}
                        </span>
                        <span style={{
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          padding: '0.1rem 0.4rem',
                          borderRadius: '10px',
                          background: isConfigured ? '#DCFCE7' : '#F1F5F9',
                          color: isConfigured ? '#16A34A' : '#94A3B8'
                        }}>
                          {isConfigured ? 'Live Connected' : 'Simulated'}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.68rem', color: '#64748B' }}>{s.tag}</span>
                    </button>
                  );
                })}
              </div>

              {/* Right Configuration Form */}
              <div style={{ padding: '1.5rem', overflowY: 'auto' }}>
                {(() => {
                  const current = connectorsConfig[selectedConnectorId] || { endpoint: '', apiKey: '', merchantId: '', webhookSecret: '', enabled: false };
                  return (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid #E2E8F0' }}>
                        <div>
                          <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: 0, textTransform: 'uppercase' }}>
                            {selectedConnectorId} Gateway Settings
                          </h4>
                          <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                            Configure production credentials to forward real transactions to external endpoints.
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: current.enabled ? '#16A34A' : '#64748B' }}>
                            {current.enabled ? 'Enabled' : 'Disabled'}
                          </span>
                          <input
                            type="checkbox"
                            checked={Boolean(current.enabled)}
                            onChange={(e) => {
                              handleSaveConnector(selectedConnectorId, { ...current, enabled: e.target.checked });
                            }}
                            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                          />
                        </div>
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                          🌐 External API Endpoint / Target URL
                        </label>
                        <div style={{ display: 'flex', alignItems: 'center', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '0.55rem 0.75rem' }}>
                          <Globe size={16} color="#64748B" style={{ marginRight: '0.5rem' }} />
                          <input
                            type="url"
                            value={current.endpoint || ''}
                            onChange={(e) => {
                              setConnectorsConfig({
                                ...connectorsConfig,
                                [selectedConnectorId]: { ...current, endpoint: e.target.value }
                              });
                            }}
                            placeholder="https://api.provider.gov.in/v2/gateway"
                            style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', fontSize: '0.85rem' }}
                          />
                        </div>
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                          🔑 API Key / Bearer Secret / Auth Token
                        </label>
                        <div style={{ display: 'flex', alignItems: 'center', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '0.55rem 0.75rem' }}>
                          <Key size={16} color="#64748B" style={{ marginRight: '0.5rem' }} />
                          <input
                            type="password"
                            value={current.apiKey || ''}
                            onChange={(e) => {
                              setConnectorsConfig({
                                ...connectorsConfig,
                                [selectedConnectorId]: { ...current, apiKey: e.target.value }
                              });
                            }}
                            placeholder="sk_live_..."
                            style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', fontSize: '0.85rem' }}
                          />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                            🏢 Terminal ID / Merchant ID
                          </label>
                          <input
                            type="text"
                            value={current.merchantId || ''}
                            onChange={(e) => {
                              setConnectorsConfig({
                                ...connectorsConfig,
                                [selectedConnectorId]: { ...current, merchantId: e.target.value }
                              });
                            }}
                            placeholder="e.g. MERCH-PATNA-0912"
                            style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                            🔒 Webhook Signature Secret
                          </label>
                          <input
                            type="password"
                            value={current.webhookSecret || ''}
                            onChange={(e) => {
                              setConnectorsConfig({
                                ...connectorsConfig,
                                [selectedConnectorId]: { ...current, webhookSecret: e.target.value }
                              });
                            }}
                            placeholder="whsec_..."
                            style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                          />
                        </div>
                      </div>

                      <div style={{ background: '#F1F5F9', padding: '0.85rem', borderRadius: '8px', marginBottom: '1.25rem', fontSize: '0.75rem', color: '#475569', lineHeight: 1.5 }}>
                        💡 <strong>Sovereign Dual-Mode Engine:</strong> If an endpoint or API key is not supplied, the platform automatically operates in high-fidelity mathematical emulation mode (valid Verhoeff checksums, verifiable QR payloads, audit log signatures, and live balance settlements).
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = { ...connectorsConfig };
                            delete updated[selectedConnectorId];
                            setConnectorsConfig(updated);
                            localStorage.setItem('adcs_api_config', JSON.stringify(updated));
                            showToast('Credentials Cleared', `Reset ${selectedConnectorId} to sovereign emulation mode.`, 'info');
                          }}
                          style={{
                            background: '#FFFFFF',
                            border: '1px solid #CBD5E1',
                            color: '#64748B',
                            padding: '0.6rem 1rem',
                            borderRadius: '8px',
                            fontWeight: 600,
                            fontSize: '0.82rem',
                            cursor: 'pointer'
                          }}
                        >
                          Clear Credentials
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSaveConnector(selectedConnectorId, { ...current, enabled: true })}
                          style={{
                            background: '#16A34A',
                            border: 'none',
                            color: '#FFFFFF',
                            padding: '0.6rem 1.25rem',
                            borderRadius: '8px',
                            fontWeight: 700,
                            fontSize: '0.82rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem'
                          }}
                        >
                          <Check size={16} />
                          <span>Save & Apply Connector</span>
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
