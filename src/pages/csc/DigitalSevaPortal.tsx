import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
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
  Ticket
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Link, useNavigate } from 'react-router-dom';

export const DigitalSevaPortal: React.FC = () => {
  const navigate = useNavigate();
  const { 
    services, 
    applications, 
    submitApplication, 
    walletBalance, 
    setWalletBalance, 
    showToast, 
    logAudit,
    language 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'services' | 'wallet' | 'digipay' | 'telelaw' | 'pmgdisha' | 'abha' | 'pmkisan' | 'fastag' | 'irctc' | 'orders' | 'operators' | 'support'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServiceCategory, setSelectedServiceCategory] = useState<string>('all');

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

  // Top-Up Modal State
  const [isTopupOpen, setIsTopupOpen] = useState(false);
  const [topupAmount, setTopupAmount] = useState<number>(1000);
  const [topupMethod, setTopupMethod] = useState<'UPI' | 'NetBanking' | 'DebitCard'>('UPI');
  const [isTopupProcessing, setIsTopupProcessing] = useState(false);

  // Quick Application Drawer State
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantAadhaar, setApplicantAadhaar] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  // Sub-Operator Management State
  const [operators, setOperators] = useState([
    { id: 'OP-01', name: 'Manoj Kumar', phone: '9835112233', role: 'Operator', status: 'Active', permissions: ['Banking', 'PAN Card', 'Utility Bills'] },
    { id: 'OP-02', name: 'Sunita Devi', phone: '9835445566', role: 'Operator', status: 'Active', permissions: ['Certificates', 'E-Shram', 'Print'] }
  ]);
  const [newOpName, setNewOpName] = useState('');
  const [newOpPhone, setNewOpPhone] = useState('');

  // Passbook transactions
  const [passbook, setPassbook] = useState([
    { id: 'TXN-PB-9941', date: '2026-11-10', type: 'CR', desc: 'VLE Commission: Form 49A PAN Application', amount: 50, balance: 2450.00 },
    { id: 'TXN-PB-9940', date: '2026-11-10', type: 'DR', desc: 'Govt Application Fee: Birth Certificate', amount: 50, balance: 2400.00 },
    { id: 'TXN-PB-9939', date: '2026-11-09', type: 'CR', desc: 'Wallet Top-up via ICICI NetBanking', amount: 2000, balance: 2450.00 },
    { id: 'TXN-PB-9938', date: '2026-11-09', type: 'CR', desc: 'DigiPay AEPS Cash Out Surcharge', amount: 35, balance: 450.00 },
  ]);

  // Handle Wallet Top-Up
  const handleTopup = async () => {
    if (topupAmount <= 0) return;
    setIsTopupProcessing(true);

    try {
      const res = await fetch('http://localhost:5000/api/csc/wallet/topup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: topupAmount, paymentMethod: topupMethod })
      }).then(r => r.json()).catch(() => null);

      const newBal = (walletBalance || 2450) + topupAmount;
      setWalletBalance(newBal);

      const newEntry = {
        id: 'TXN-PB-' + Math.floor(1000 + Math.random() * 9000),
        date: new Date().toISOString().split('T')[0],
        type: 'CR',
        desc: `Wallet Top-up via ${topupMethod}`,
        amount: topupAmount,
        balance: newBal
      };
      setPassbook(prev => [newEntry, ...prev]);

      showToast('Wallet Top-Up Successful', `₹${topupAmount} added to your VLE Wallet. New Balance: ₹${newBal.toFixed(2)}`, 'success');
      logAudit('CSC VLE Wallet Top-up', `Added ₹${topupAmount} via ${topupMethod}. Current Balance: ₹${newBal}`);
      confetti({ particleCount: 70, spread: 60 });
      setIsTopupOpen(false);
    } finally {
      setIsTopupProcessing(false);
    }
  };

  // Handle Instant Application Filing
  const handleServiceFiling = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !applicantName || !applicantPhone) return;

    const govtFee = selectedService.govtFee ?? 107;
    const vleCommission = 50;

    if (walletBalance < govtFee) {
      showToast('Insufficient Wallet Balance', `Govt fee is ₹${govtFee}. Please top up your VLE wallet.`, 'error');
      setIsTopupOpen(true);
      return;
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
        city: 'Patna Center #104',
        state: 'Bihar',
        notes: `Filing through Digital Seva Portal. Applicant Aadhaar: ${applicantAadhaar || 'Verified'}`
      });

      // Deduct govt fee and credit commission
      const newBal = Number((walletBalance - govtFee + vleCommission).toFixed(2));
      setWalletBalance(newBal);

      setPassbook(prev => [
        { id: 'TXN-PB-' + Math.floor(1000 + Math.random() * 9000), date: new Date().toISOString().split('T')[0], type: 'CR', desc: `Commission: ${selectedService.title}`, amount: vleCommission, balance: newBal },
        { id: 'TXN-PB-' + Math.floor(1000 + Math.random() * 9000), date: new Date().toISOString().split('T')[0], type: 'DR', desc: `Govt Fee: ${selectedService.title}`, amount: govtFee, balance: Number((walletBalance - govtFee).toFixed(2)) },
        ...prev
      ]);

      showToast('Service Application Submitted', `Token: ${trackingId} generated. Receipt dispatched to customer.`, 'success');
      logAudit('Digital Seva Service Filing', `Filed ${selectedService.title} for ${applicantName}. Token: ${trackingId}`);
      confetti({ particleCount: 90, spread: 70 });

      setIsApplying(false);
      setSelectedService(null);
      setApplicantName('');
      setApplicantPhone('');
      setApplicantAadhaar('');
    }, 600);
  };

  // Add new sub-operator
  const handleAddOperator = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOpName || !newOpPhone) return;

    const newOp = {
      id: 'OP-0' + (operators.length + 1),
      name: newOpName,
      phone: newOpPhone,
      role: 'Operator',
      status: 'Active',
      permissions: ['General Services', 'Print & Scan']
    };
    setOperators(prev => [...prev, newOp]);
    showToast('Sub-Operator Added', `Operator ${newOpName} registered with center credentials.`, 'success');
    setNewOpName('');
    setNewOpPhone('');
  };

  // Handle DigiPay AEPS Transaction
  const handleDigiPayTransact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aepsAadhaar) return;
    setAepsScanning(true);
    setAepsReceipt(null);

    try {
      const res = await fetch('http://localhost:5000/api/csc/digipay/transact', {
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
      const res = await fetch('http://localhost:5000/api/csc/telelaw/book', {
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
      const res = await fetch('http://localhost:5000/api/csc/pmgdisha/certify', {
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
      const res = await fetch('http://localhost:5000/api/csc/abha/create', {
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
      const res = await fetch('http://localhost:5000/api/csc/pmkisan/ekyc', {
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
      const res = await fetch('http://localhost:5000/api/csc/fastag/transact', {
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
      const res = await fetch('http://localhost:5000/api/csc/irctc/book', {
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

  const filteredServicesList = services.filter(s => {
    const matchSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = selectedServiceCategory === 'all' || s.category === selectedServiceCategory;
    return matchSearch && matchCat;
  });

  return (
    <div style={{ minHeight: '100vh', background: '#F1F5F9', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* 1. Official CSC Digital Seva Top Bar */}
      <header style={{ background: '#0F172A', color: '#FFFFFF', borderBottom: '3px solid #16A34A', position: 'sticky', top: 0, zIndex: 40 }}>
        {/* Tier 1 Header */}
        <div style={{ padding: '0.6rem 2rem', borderBottom: '1px solid #1E293B', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ width: '38px', height: '38px', background: '#16A34A', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.2rem', color: '#FFFFFF' }}>
                CSC
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.02em', color: '#FFFFFF' }}>
                  DIGITAL SEVA PORTAL
                </div>
                <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                  CSC e-Governance Services India Limited
                </div>
              </div>
            </div>

            <span style={{ color: '#334155' }}>|</span>

            {/* VLE Center Identity */}
            <div style={{ fontSize: '0.8rem', color: '#CBD5E1' }}>
              <span style={{ color: '#34D399', fontWeight: 700 }}>VLE ID:</span> 245089123456 &nbsp;•&nbsp;
              <span style={{ color: '#FCD34D', fontWeight: 700 }}>Kendra:</span> Akul Dravin Digital Seva Kendra (Patna, Bihar)
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
                title="Add Money to Wallet"
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
                <PlusCircle size={14} /> Topup
              </button>
            </div>

            {/* VLE Profile Avatar & Log Out */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', borderLeft: '1px solid #334155', paddingLeft: '1rem' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#F8FAFC' }}>Rajesh Sharma</div>
                <div style={{ fontSize: '0.7rem', color: '#34D399' }}>Certified VLE</div>
              </div>
              <button
                onClick={() => navigate('/connect/csc')}
                title="Logout of CSC Connect"
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
            { id: 'digipay', label: 'DigiPay (AEPS & Micro-ATM)' },
            { id: 'telelaw', label: 'Tele-Law (Legal Aid)' },
            { id: 'pmgdisha', label: 'PMGDISHA (Training & Cert)' },
            { id: 'abha', label: 'Ayushman (ABHA Health Card)' },
            { id: 'pmkisan', label: 'PM-KISAN (eKYC & DBT)' },
            { id: 'fastag', label: 'FASTag 2.0 (NETC Toll)' },
            { id: 'irctc', label: 'IRCTC (Railway Booking)' },
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
                  onClick={() => alert('Downloading official VLE Passbook PDF statement...')}
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
                  Export PDF Statement
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
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
                  onClick={() => alert(`Printing DigiPay thermal slip for RRN: ${aepsReceipt.rrn}...`)}
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                <div style={{ background: '#1E3A8A', color: '#93C5FD', padding: '0.5rem', borderRadius: '8px' }}>
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
                    background: '#1E3A8A',
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
                      onClick={() => alert(`Joining High Court Panel Video Session for Case ${telelawScheduled.caseId}...`)}
                      style={{ background: '#16A34A', color: '#FFFFFF', border: 'none', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Launch Call
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
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
                    onClick={() => alert(`Downloading ABHA Card PDF for ${abhaCard.citizenName} (ABHA: ${abhaCard.abhaNumber})...`)}
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

        {/* TAB: PM-KISAN SAMMAN NIDHI eKYC (pmkisan.gov.in) */}
        {activeTab === 'pmkisan' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {/* Verification Form */}
            <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                <Sprout size={22} color="#15803D" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  PM-KISAN Samman Nidhi e-KYC Portal
                </h3>
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
                    onClick={() => alert(`Downloading PM-KISAN Acknowledgement Slip for ${pmkReceipt.farmerName} (Token: ${pmkReceipt.ackToken})...`)}
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
                      <td style={{ padding: '0.65rem 0.8rem', fontFamily: 'monospace', fontWeight: 600, color: '#1D4ED8' }}>
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
                          onClick={() => alert(`Reprinting official CSC acknowledgement receipt for Token: ${app.id}...`)}
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
              CSC Digital Seva Grievance & SLA Support Desk
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#64748B', margin: '0 0 1.5rem' }}>
              Direct district manager escalation, technical helpdesk, and transaction refund tickets.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              <div style={{ background: '#F8FAFC', padding: '1.25rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>District Manager (DM) Patna</div>
                <div style={{ fontSize: '0.8rem', color: '#334155', lineHeight: 1.6 }}>
                  <div><strong>Name:</strong> Shri Alok Verma</div>
                  <div><strong>Email:</strong> dm.patna@csc.gov.in</div>
                  <div><strong>Phone:</strong> +91 94310 99881</div>
                </div>
              </div>

              <div style={{ background: '#F8FAFC', padding: '1.25rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>CSC Central Helpdesk</div>
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

      {/* 3. MODAL: Instant VLE Wallet Top-Up */}
      {isTopupOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '1rem'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            maxWidth: '440px',
            width: '100%',
            padding: '2rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.25)'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.5rem' }}>
              Add Funds to VLE Wallet
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 1.25rem' }}>
              Current Balance: <strong>₹{(walletBalance || 2450).toFixed(2)}</strong>
            </p>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '0.4rem' }}>
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
                  border: '1px solid #CBD5E1'
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

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '0.4rem' }}>
                Payment Method
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                {[
                  { id: 'UPI', label: 'UPI / QR' },
                  { id: 'NetBanking', label: 'NetBanking' },
                  { id: 'DebitCard', label: 'Debit Card' }
                ].map(m => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setTopupMethod(m.id as any)}
                    style={{
                      background: topupMethod === m.id ? '#16A34A' : '#F8FAFC',
                      color: topupMethod === m.id ? '#FFFFFF' : '#334155',
                      border: topupMethod === m.id ? '1px solid #16A34A' : '1px solid #CBD5E1',
                      padding: '0.5rem',
                      borderRadius: '6px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

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
                  cursor: 'pointer'
                }}
              >
                {isTopupProcessing ? 'Processing Payment...' : `Confirm & Add ₹${topupAmount}`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. MODAL: Instant Service Application Filing Drawer */}
      {selectedService && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.7)',
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
            boxShadow: '0 20px 40px rgba(0,0,0,0.25)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, background: '#DCFCE7', color: '#166534', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                  CSC Assisted Portal Filing
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
              <span>Govt Official Fee: <strong>₹{selectedService.govtFee ?? 107}</strong></span>
              <span style={{ color: '#16A34A', fontWeight: 700 }}>Your Commission: +₹50</span>
            </div>

            <form onSubmit={handleServiceFiling}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                  Applicant Citizen Name
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

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                  Citizen Mobile Number
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

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                  Aadhaar Number (Optional for e-KYC validation)
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
                    cursor: 'pointer'
                  }}
                >
                  {isApplying ? 'Submitting & Printing...' : `Submit & Deduct ₹${selectedService.govtFee ?? 107}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
