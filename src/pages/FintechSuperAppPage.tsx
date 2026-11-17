import { AtoZ3DGlassServicesHub } from '../components/fintech/AtoZ3DGlassServicesHub';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { printBrandedADCSDocument } from '../utils/documentBranding';
import { validateVerhoeff } from '../utils/verhoeff';
import { serviceCategories } from '../data/servicesData';
import { ServiceCard } from '../components/cards/ServiceCard';
import { ServiceBanners } from '../components/common/ServiceBanners';
import { 
  Smartphone, 
  Building2, 
  QrCode, 
  Wallet, 
  Zap, 
  Tv, 
  Car, 
  Flame, 
  Droplet, 
  Wifi, 
  CreditCard, 
  Coins, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Key, 
  Volume2, 
  RotateCcw, 
  Download, 
  Copy, 
  Check, 
  Fingerprint, 
  Search, 
  Settings, 
  Send,
  Layers,
  Sparkles,
  RefreshCw,
  FileText,
  Landmark,
  Monitor,
  Briefcase,
  FileCheck2,
  Award,
  BookOpen,
  Compass,
  MapPin,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const FintechSuperAppPage: React.FC = () => {
  const { 
    walletBalance, 
    setWalletBalance, 
    showToast, 
    logAudit, 
    recordJournalEntry, 
    language,
    services,
    openQuantumAI,
    setIsQuantumAIOpen,
    setIsTrackerOpen,
    setIsSearchOpen
  } = useApp();

  const popularServices = services.slice(0, 8);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Landmark': return <Landmark size={22} />;
      case 'Monitor': return <Monitor size={22} />;
      case 'Briefcase': return <Briefcase size={22} />;
      case 'FileText': return <FileText size={22} />;
      case 'Zap': return <Zap size={22} />;
      case 'Plane': return <Send size={22} />;
      case 'Building2': return <Building2 size={22} />;
      case 'Coins': return <Coins size={22} />;
      case 'Shield': return <ShieldCheck size={22} />;
      case 'ShieldCheck': return <ShieldCheck size={22} />;
      default: return <Sparkles size={22} />;
    }
  };

  // Active Hub Tab
  const [activeTab, setActiveTab] = useState<'superapp' | 'dmt' | 'aeps' | 'bbps' | 'soundbox' | 'apikeys'>('superapp');

  // -------------------------------------------------------------
  // 1. API GATEWAY KEYS STATE (User-configurable live credentials)
  // -------------------------------------------------------------
  const [apiGatewayConfig, setApiGatewayConfig] = useState(() => {
    const saved = localStorage.getItem('adcs_fintech_gateway_keys');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return {
      mode: 'sandbox', // 'sandbox' | 'live'
      dmtProvider: 'PaySprint / Eko',
      dmtPartnerId: '',
      dmtApiKey: '',
      dmtSecretKey: '',
      aepsProvider: 'PaySprint / Fino Payments Bank',
      aepsBcId: '',
      aepsTerminalId: '',
      aepsAuthKey: '',
      bbpsProvider: 'NPCI Bharat BillPay / Setu',
      bbpsAgentId: '',
      bbpsCertKey: '',
      upiProvider: 'PhonePe PG / Paytm PG',
      upiMerchantId: 'MERCHANT_ADCS_01',
      upiSaltKey: '',
      smsProvider: 'Fast2SMS / MSG91',
      smsAuthKey: '',
    };
  });

  const [keysSaved, setKeysSaved] = useState(false);

  const handleSaveApiKeys = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('adcs_fintech_gateway_keys', JSON.stringify(apiGatewayConfig));
    setKeysSaved(true);
    showToast('API Credentials Updated', `Fintech Gateway configured in ${apiGatewayConfig.mode.toUpperCase()} mode.`, 'success');
    logAudit('Fintech API Credentials Saved', `Provider: ${apiGatewayConfig.dmtProvider}, Mode: ${apiGatewayConfig.mode}`);
    setTimeout(() => setKeysSaved(false), 2500);
  };

  // -------------------------------------------------------------
  // 2. DMT (DOMESTIC MONEY TRANSFER) STATE
  // -------------------------------------------------------------
  const [senderMobile, setSenderMobile] = useState('9876543210');
  const [senderName, setSenderName] = useState('Rahul Kumar');
  const [beneficiaryName, setBeneficiaryName] = useState('Sunil Verma');
  const [beneficiaryAccount, setBeneficiaryAccount] = useState('50100492819284');
  const [beneficiaryIfsc, setBeneficiaryIfsc] = useState('HDFC0000123');
  const [transferAmount, setTransferAmount] = useState<number>(2500);
  const [dmtTransferType, setDmtTransferType] = useState<'IMPS' | 'NEFT'>('IMPS');
  const [isProcessingDmt, setIsProcessingDmt] = useState(false);
  const [dmtSuccessReceipt, setDmtSuccessReceipt] = useState<any | null>(null);

  const handleExecuteDmt = () => {
    if (!beneficiaryAccount || !beneficiaryIfsc || transferAmount <= 0) {
      showToast('Validation Error', 'Enter valid beneficiary account, IFSC and transfer amount.', 'warning');
      return;
    }
    const totalDeduct = transferAmount + 10; // Rs 10 standard DMT fee
    if (walletBalance < totalDeduct) {
      showToast('Insufficient Balance', `Required ₹${totalDeduct} (Amount + ₹10 DMT fee), Available: ₹${walletBalance}`, 'error');
      return;
    }

    setIsProcessingDmt(true);
    setTimeout(() => {
      setIsProcessingDmt(false);
      setWalletBalance(prev => Math.max(0, prev - totalDeduct));
      
      const utr = 'UTR' + Math.floor(100000000000 + Math.random() * 900000000000);
      const receipt = {
        txnId: 'DMT-' + Date.now().toString().slice(-8),
        utr,
        senderMobile,
        senderName,
        beneficiaryName,
        beneficiaryAccount,
        beneficiaryIfsc,
        amount: transferAmount,
        fee: 10,
        mode: dmtTransferType,
        status: 'SUCCESS',
        timestamp: new Date().toLocaleString('en-IN')
      };
      setDmtSuccessReceipt(receipt);

      recordJournalEntry({
        reference: utr,
        description: `DMT ${dmtTransferType} to ${beneficiaryName} (${beneficiaryAccount})`,
        date: new Date().toISOString(),
        lines: [
          { accountCode: '2010', accountName: 'Customer / VLE Wallet Liability', debit: totalDeduct, credit: 0 },
          { accountCode: '1020', accountName: 'NPCI IMPS Settlement Clearing', debit: 0, credit: transferAmount },
          { accountCode: '4010', accountName: 'DMT Convenience Fee Income', debit: 0, credit: 10 }
        ]
      });

      confetti({ particleCount: 80, spread: 60 });
      showToast('Transfer Successful!', `₹${transferAmount} sent via ${dmtTransferType}. UTR: ${utr}`, 'success');
    }, 1200);
  };

  // -------------------------------------------------------------
  // 3. AEPS (AADHAAR ENABLED PAYMENT SYSTEM) STATE
  // -------------------------------------------------------------
  const [aepsTxnType, setAepsTxnType] = useState<'CW' | 'BE' | 'MS' | 'AP'>('CW'); // Cash Withdrawal, Balance Enquiry, Mini Statement, Aadhaar Pay
  const [aepsAadhaar, setAepsAadhaar] = useState('999999990019');
  const [aepsBank, setAepsBank] = useState('State Bank of India (SBI)');
  const [aepsDevice, setAepsDevice] = useState('Mantra MFS100 RD Service');
  const [aepsAmount, setAepsAmount] = useState<number>(1000);
  const [isScanningFinger, setIsScanningFinger] = useState(false);
  const [aepsReceipt, setAepsReceipt] = useState<any | null>(null);

  const handleExecuteAeps = () => {
    const cleanAadhaar = aepsAadhaar.replace(/\s+/g, '');
    if (cleanAadhaar.length !== 12 || !validateVerhoeff(cleanAadhaar)) {
      showToast('Invalid Aadhaar', 'Please enter a valid 12-digit Aadhaar number with correct Verhoeff checksum.', 'error');
      return;
    }

    setIsScanningFinger(true);
    setTimeout(() => {
      setIsScanningFinger(false);
      const rrn = 'NPCI-AEPS-' + Math.floor(100000000000 + Math.random() * 900000000000);
      const commission = aepsTxnType === 'CW' ? 12 : aepsTxnType === 'MS' ? 5 : 2;

      // In Cash Withdrawal, VLE wallet is credited with cash withdrawn + commission
      if (aepsTxnType === 'CW') {
        setWalletBalance(prev => prev + aepsAmount + commission);
      } else {
        setWalletBalance(prev => prev + commission);
      }

      const receipt = {
        rrn,
        authCode: 'AUTH' + Math.floor(100000 + Math.random() * 900000),
        txnType: aepsTxnType === 'CW' ? 'CASH WITHDRAWAL' : aepsTxnType === 'BE' ? 'BALANCE ENQUIRY' : aepsTxnType === 'MS' ? 'MINI STATEMENT' : 'AADHAAR PAY',
        aadhaarMasked: `XXXX-XXXX-${cleanAadhaar.slice(-4)}`,
        bank: aepsBank,
        device: aepsDevice,
        amount: aepsTxnType === 'CW' || aepsTxnType === 'AP' ? aepsAmount : 0,
        commission,
        customerLedgerBalance: Math.floor(4500 + Math.random() * 25000),
        status: 'TRANSACTION APPROVED (NPCI SWITCH 00)',
        timestamp: new Date().toLocaleString('en-IN')
      };
      setAepsReceipt(receipt);

      confetti({ particleCount: 70, spread: 50 });
      showToast('AEPS Approved', `NPCI RRN: ${rrn}. Commission of ₹${commission} credited to wallet!`, 'success');
    }, 1500);
  };

  // -------------------------------------------------------------
  // 4. SOUNDBOX SIMULATOR STATE
  // -------------------------------------------------------------
  const [soundboxAmount, setSoundboxAmount] = useState<number>(500);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleTriggerSoundbox = (amt: number) => {
    setIsPlayingAudio(true);
    // Speech synthesis audio trigger in Hindi & English
    if ('speechSynthesis' in window) {
      const msg = new SpeechSynthesisUtterance(`Akul Dravin Digital Services par ${amt} rupaye prapt hue. Received ${amt} rupees on Akul Dravin.`);
      msg.lang = 'hi-IN';
      msg.rate = 0.95;
      window.speechSynthesis.speak(msg);
    }
    showToast('Soundbox Alert', `🔊 "Akul Dravin पर ₹${amt} प्राप्त हुए!"`, 'info');
    setTimeout(() => setIsPlayingAudio(false), 2500);
  };

  // QR Modal State
  const [customQrAmount, setCustomQrAmount] = useState<number>(0);
  const merchantVpa = 'vikashaaryan@ptaxis';
  const merchantName = 'Vikash Kumar';

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', paddingBottom: '5rem' }}>
      {/* 1. SIGNATURE PHONEPE & PAYTM APP HEADER */}
      <div style={{
        background: 'linear-gradient(135deg, #061A36 0%, #075ACB 50%, #5B21B6 100%)',
        color: '#FFFFFF',
        padding: '2.5rem 1.5rem 3.5rem',
        borderRadius: '0 0 32px 32px',
        boxShadow: '0 12px 32px rgba(6, 26, 54, 0.25)',
      }}>
        <div className="container-wide">
          {/* Top User Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.15)',
                border: '2px solid #F3D477',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '1.1rem',
                color: '#FFFFFF'
              }}>
                AD
              </div>
              <div>
                <div style={{ fontSize: '1.15rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span>AKUL DRAVIN PAY</span>
                  <span style={{ fontSize: '0.65rem', background: '#F59E0B', color: '#061A36', padding: '0.15rem 0.5rem', borderRadius: '999px', fontWeight: 800 }}>
                    {language === 'hi' ? 'सुपर-ऐप' : 'SUPER-APP'}
                  </span>
                </div>
                <div style={{ fontSize: '0.76rem', color: '#CBD5E1' }}>
                  {language === 'hi' ? 'यूपीआई • आधार एटीएम • मनी ट्रांसफर • बिल भुगतान • साउंडबॉक्स • 24K गोल्ड' : 'UPI • AEPS • DMT • BBPS • SOUNDBOX • GOLD'}
                </div>
              </div>
            </div>

            {/* Wallet Balance Chip */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem',
              background: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)',
              padding: '0.5rem 1.15rem',
              borderRadius: '999px',
              border: '1px solid rgba(255, 255, 255, 0.25)'
            }}>
              <Wallet size={18} color="#F3D477" />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.68rem', color: '#D4E0EE', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{language === 'hi' ? 'एडीसीएस वॉलेट' : 'ADCS Wallet'}</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#FFFFFF' }}>₹{walletBalance.toLocaleString('en-IN')}</div>
              </div>
              <button
                onClick={() => {
                  setWalletBalance(prev => prev + 2000);
                  showToast('Wallet Top-Up', '₹2,000 added to your ADCS wallet via UPI.', 'success');
                }}
                style={{
                  background: '#F3D477',
                  color: '#061A36',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '0.3rem 0.75rem',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                {language === 'hi' ? '+ टॉप-अप' : '+ Top Up'}
              </button>
            </div>
          </div>

          {/* 3D Glass Universal A to Z Services Hub with Rich Template Banners */}
          <AtoZ3DGlassServicesHub 
            currentHubTab={activeTab}
            onSelectTab={(tab) => setActiveTab(tab)}
          />
        </div>
      </div>

      {/* 2. MAIN INTERACTIVE CONTENT AREA */}
      <div className="container-wide" style={{ marginTop: '-1.5rem' }}>

        {activeTab !== 'superapp' && (
          <div style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <button
              onClick={() => setActiveTab('superapp')}
              style={{
                background: '#FFFFFF',
                color: '#075ACB',
                border: '1.5px solid #00BAF2',
                borderRadius: '999px',
                padding: '0.5rem 1.25rem',
                fontSize: '0.82rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                boxShadow: '0 4px 14px rgba(0, 186, 242, 0.25)'
              }}
            >
              <span>&larr;</span>
              <span>{language === 'hi' ? 'सभी ए टू जेड सेवाएँ देखें (Back to All Services)' : 'Return to All A to Z Services Overview'}</span>
            </button>

            <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 700 }}>
              Active Terminal: <strong style={{ color: '#075ACB', textTransform: 'uppercase' }}>{activeTab}</strong>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 1: SUPER-APP HOMEPAGE OVERVIEW */}
        {/* ========================================================= */}
        {activeTab === 'superapp' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Promo Banner Card */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '1.75rem 2rem',
              boxShadow: '0 8px 24px rgba(3, 17, 38, 0.06)',
              border: '1px solid #E2E8F0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1.25rem'
            }}>
              <div>
                <span style={{ fontSize: '0.76rem', fontWeight: 800, color: '#075ACB', background: '#EFF6FF', padding: '0.25rem 0.75rem', borderRadius: '999px' }}>
                  {language === 'hi' ? 'त्वरित निपटान • 0% सुविधा शुल्क' : 'INSTANT SETTLEMENT • 0% CONVENIENCE FEE'}
                </span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#061A36', marginTop: '0.45rem', marginBottom: '0.35rem' }}>
                  {language === 'hi' ? 'एकीकृत भारतीय फिनटेक व डिजिटल सेवा केंद्र' : 'Unified Indian FinTech Ecosystem'}
                </h2>
                <p style={{ color: '#64748B', fontSize: '0.92rem', maxWidth: '580px', margin: 0 }}>
                  {language === 'hi' ? 'मनी ट्रांसफर (DMT), आधार एटीएम (AEPS) निकासी, भारत बिल पे (BBPS), लाइव साउंडबॉक्स वॉइस अलर्ट एवं डेवलपर API गेटवे।' : 'Manage Money Transfers (DMT), Aadhaar Cashout (AEPS), Bharat Bill Payments (BBPS), Live Soundbox Voice Notifications, and Plug-and-Play API Keys.'}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setActiveTab('dmt')}
                  className="btn-primary"
                  style={{ borderRadius: '12px' }}
                >
                  <Send size={16} /> {language === 'hi' ? 'DMT ट्रांसफर डेस्क' : 'Open DMT Desk'}
                </button>
                <button
                  onClick={() => setActiveTab('aeps')}
                  className="btn-gold"
                  style={{ borderRadius: '12px' }}
                >
                  <Fingerprint size={16} /> {language === 'hi' ? 'AEPS आधार ATM' : 'Open AEPS ATM'}
                </button>
              </div>
            </div>

            {/* Quick 8-Grid BBPS Categories */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              padding: '2rem',
              border: '1px solid #E2E8F0',
              boxShadow: '0 8px 24px rgba(3, 17, 38, 0.06)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#061A36', margin: 0 }}>
                    {language === 'hi' ? 'रिचार्ज एवं उपयोगिता बिल भुगतान (भारत बिल पे)' : 'Recharges & Bill Payments (BBPS)'}
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: '#64748B' }}>{language === 'hi' ? 'NPCI द्वारा अधिकृत भारत बिलपे नेटवर्क' : 'NPCI Authorized Bharat BillPay Network'}</div>
                </div>
                <button
                  onClick={() => setActiveTab('bbps')}
                  style={{ background: 'none', border: 'none', color: '#075ACB', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  {language === 'hi' ? 'सभी बिल देखें &rarr;' : 'View All Bills &rarr;'}
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '1rem' }}>
                {[
                  { name: 'Mobile', desc: 'Prepaid & Postpaid', icon: <Smartphone size={22} color="#075ACB" />, bg: '#EFF6FF' },
                  { name: 'Electricity', desc: 'All Discoms', icon: <Zap size={22} color="#D97706" />, bg: '#FEF3C7' },
                  { name: 'DTH TV', desc: 'Tata Play, Airtel', icon: <Tv size={22} color="#7C3AED" />, bg: '#EDE9FE' },
                  { name: 'FASTag', desc: 'NETC Instant', icon: <Car size={22} color="#059669" />, bg: '#ECFDF5' },
                  { name: 'LPG Gas', desc: 'Book Cylinder', icon: <Flame size={22} color="#EA580C" />, bg: '#FFEDD5' },
                  { name: 'Water', desc: 'Municipal Boards', icon: <Droplet size={22} color="#0284C7" />, bg: '#E0F2FE' },
                  { name: 'Broadband', desc: 'Fiber Internet', icon: <Wifi size={22} color="#4F46E5" />, bg: '#EEF2FF' },
                  { name: 'Credit Card', desc: 'Visa / RuPay', icon: <CreditCard size={22} color="#BE185D" />, bg: '#FCE7F3' },
                ].map(item => (
                  <button
                    key={item.name}
                    onClick={() => setActiveTab('bbps')}
                    style={{
                      background: item.bg,
                      border: '1px solid rgba(0,0,0,0.06)',
                      borderRadius: '16px',
                      padding: '1.15rem 0.65rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.45rem',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    {item.icon}
                    <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#061A36' }}>{item.name}</div>
                    <div style={{ fontSize: '0.66rem', color: '#64748B' }}>{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Wealth & Lending (PhonePe Style 24K Gold & Instant Loans) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {/* Digital Gold Card */}
              <div style={{
                background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
                borderRadius: '24px',
                padding: '2rem',
                border: '1.5px solid #FCD34D'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', color: '#B45309', fontWeight: 800, fontSize: '0.78rem', marginBottom: '0.5rem' }}>
                  <Coins size={16} />
                  <span>{language === 'hi' ? '24K 99.99% शुद्ध डिजिटल गोल्ड' : '24K 99.99% PURE DIGITAL GOLD'}</span>
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#78350F', marginBottom: '0.45rem' }}>
                  {language === 'hi' ? '₹10 से डिजिटल गोल्ड में निवेश शुरू करें' : 'Invest in Gold Starting at ₹10'}
                </h3>
                <p style={{ fontSize: '0.86rem', color: '#92400E', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  {language === 'hi' ? 'ब्रिंक्स वॉल्ट में 100% बीमित। जब चाहें बेचें या असली सोने के सिक्कों में बदलें।' : "Insured in world-class Brink's vaults. Instant liquidity—sell anytime or convert to physical gold coins."}
                </p>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={() => {
                      if (walletBalance < 100) {
                        showToast('Low Balance', 'Wallet balance below ₹100. Top up wallet first.', 'warning');
                        return;
                      }
                      setWalletBalance(prev => prev - 100);
                      showToast('Gold Purchased!', '0.0134 gm 24K Gold allocated to your vault.', 'success');
                    }}
                    className="btn-gold"
                    style={{ borderRadius: '10px', fontSize: '0.86rem' }}
                  >
                    {language === 'hi' ? '₹100 का सोना खरीदें' : 'Buy ₹100 Gold'}
                  </button>
                  <button
                    onClick={() => {
                      if (walletBalance < 500) {
                        showToast('Low Balance', 'Wallet balance below ₹500. Top up wallet first.', 'warning');
                        return;
                      }
                      setWalletBalance(prev => prev - 500);
                      showToast('Gold Purchased!', '0.0671 gm 24K Gold allocated to your vault.', 'success');
                    }}
                    className="btn-navy"
                    style={{ borderRadius: '10px', fontSize: '0.86rem' }}
                  >
                    {language === 'hi' ? '₹500 का सोना खरीदें' : 'Buy ₹500 Gold'}
                  </button>
                </div>
              </div>

              {/* Instant Loan Card */}
              <div style={{
                background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
                borderRadius: '24px',
                padding: '2rem',
                border: '1.5px solid #86EFAC'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', color: '#15803D', fontWeight: 800, fontSize: '0.78rem', marginBottom: '0.5rem' }}>
                  <ShieldCheck size={16} />
                  <span>{language === 'hi' ? 'पूर्व-स्वीकृत मुद्रा व एमएसएमई लोन' : 'PRE-APPROVED MUDRA & MSME LOANS'}</span>
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#14532D', marginBottom: '0.45rem' }}>
                  {language === 'hi' ? '₹5 लाख तक त्वरित बिजनेस क्रेडिट' : 'Instant Business Credit Up to ₹5 Lakhs'}
                </h3>
                <p style={{ fontSize: '0.86rem', color: '#166534', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  {language === 'hi' ? 'आधार व पैन द्वारा 100% पेपरलेस सत्यापन, 0% प्रीपेमेंट पेनल्टी एवं कम ब्याज दर।' : '100% paperless Aadhaar + PAN verification with 0% foreclosure charges and low interest rates from partner banks.'}
                </p>
                <button
                  onClick={() => {
                    showToast('Loan Eligibility Check', 'Credit Score: 785 (Excellent). You are pre-approved for ₹2,50,000 Mudra Loan!', 'success');
                  }}
                  className="btn-primary"
                  style={{ borderRadius: '10px', fontSize: '0.86rem', background: '#16A34A', borderColor: '#16A34A' }}
                >
                  {language === 'hi' ? 'त्वरित प्री-अप्रूव्ड लिमिट जांचें &rarr;' : 'Check Instant Pre-Approved Limit &rarr;'}
                </button>
              </div>
            </div>

            {/* MULTI-SERVICE CAMPAIGN BANNERS CAROUSEL */}
            <div style={{ marginTop: '1rem' }}>
              <ServiceBanners mode="carousel" />
            </div>

            {/* 16 MASTER SERVICE SECTORS */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem' }}>
                <div>
                  <span className="badge-pill" style={{ marginBottom: '0.5rem' }}>
                    {language === 'hi' ? 'एकीकृत सेवा व्यवस्था' : 'UNIFIED SERVICE ARCHITECTURE'}
                  </span>
                  <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 900, color: 'var(--adcs-text)' }}>
                    {language === 'hi' ? '16 मुख्य सेवा क्षेत्र' : '16 Master Service Sectors'}
                  </h2>
                  <p style={{ color: 'var(--adcs-muted)', fontSize: '0.96rem', marginTop: '0.25rem' }}>
                    {language === 'hi' ? 'नागरिक, व्यापार, संपत्ति व तकनीकी सुविधाओं का 16 समर्पित पोर्टल्स में सुव्यवस्थित वर्गीकरण।' : 'Every citizen, business, real-estate, and technical workflow organized clearly across 16 dedicated vertical portals.'}
                  </p>
                </div>
                <Link to="/services" className="btn-secondary">
                  <span>{language === 'hi' ? 'पूरा कैटलॉग देखें' : 'Browse Full Catalog'}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="grid-4">
                {serviceCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={cat.route || `/services?category=${cat.id}`}
                    className="card adcs-card-interactive"
                    style={{
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.65rem',
                      textDecoration: 'none',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '10px',
                          background: 'var(--adcs-primary-soft)',
                          color: '#075ACB',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {getCategoryIcon(cat.icon)}
                      </div>
                      <ArrowRight size={16} color="var(--adcs-muted)" />
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.98rem', color: 'var(--adcs-text)' }}>
                      {language === 'hi' && cat.nameHi ? cat.nameHi : cat.name}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--adcs-muted)', lineHeight: 1.45 }}>
                      {cat.description}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* MOST REQUESTED SERVICES */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem' }}>
                <div>
                  <span className="badge-gold" style={{ marginBottom: '0.5rem' }}>{language === 'hi' ? 'फास्ट-ट्रैक डिजिटल काउंटर' : 'FAST-TRACK DIGITAL COUNTER'}</span>
                  <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 900, color: 'var(--adcs-text)' }}>
                    {language === 'hi' ? 'सर्वाधिक लोकप्रिय एवं त्वरित सेवाएँ' : 'Most Requested Services'}
                  </h2>
                </div>
                <Link to="/services" className="btn-primary">
                  <span>{language === 'hi' ? 'ऑनलाइन आवेदन करें' : 'Apply or Request Online'}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="grid-4">
                {popularServices.map((srv) => (
                  <ServiceCard key={srv.id} service={srv} />
                ))}
              </div>
            </div>

            {/* DOCUMENT ASSISTANCE & QUANTUM AI SPLIT */}
            <div className="grid-2">
              <div className="card" style={{ padding: '2rem', borderTop: '4px solid #075ACB' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#075ACB', fontWeight: 800, fontSize: '0.8rem', marginBottom: '0.6rem' }}>
                  <FileCheck2 size={18} />
                  <span>ASSISTED DOCUMENTATION & VAULT</span>
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.65rem', color: 'var(--adcs-text)' }}>
                  Structured Document Assistance & Receipts
                </h3>
                <p style={{ color: 'var(--adcs-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  Prepare compliant applications, generate corporate letterheads, issue ADCS training credentials, and maintain verified payment receipts without altering official source records.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <Link to="/documents" className="btn-primary">
                    Open Document Center
                  </Link>
                  <Link to="/verify-certificate" className="btn-secondary">
                    <QrCode size={16} /> Verify ADCS Certificate
                  </Link>
                </div>
              </div>

              <div
                style={{
                  background: 'linear-gradient(135deg, #061A36 0%, #031126 100%)',
                  color: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '2rem',
                  border: '1px solid rgba(214, 161, 43, 0.45)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', color: '#F3D477', fontWeight: 800, fontSize: '0.8rem', marginBottom: '0.6rem' }}>
                  <Sparkles size={17} />
                  <span>ADCS INTELLIGENT ROUTING</span>
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#FFFFFF', marginBottom: '0.65rem' }}>
                  QUANTUM AI — Instant Eligibility & Checklist Guide
                </h3>
                <p style={{ color: '#CBD5E1', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  Ask in English or Hindi for exact required documents, Turn-Around-Time, statutory vs. service fees, or automated service routing across all 16 ADCS sectors.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={() => openQuantumAI('Documents required for New PAN or Passport renewal')}
                    className="btn-gold"
                  >
                    Launch QUANTUM AI
                  </button>
                  <Link
                    to="/quantum-ai"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.65rem 1.2rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.35)',
                      color: '#FFFFFF',
                      fontWeight: 700,
                    }}
                  >
                    Explore AI Console
                  </Link>
                </div>
              </div>
            </div>

            {/* ACADEMY LMS & VEDIC ASTROLOGY SPLIT */}
            <div className="grid-2">
              <div className="card" style={{ padding: '2rem', borderTop: '4px solid #D6A12B' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#946809', fontWeight: 800, fontSize: '0.8rem', marginBottom: '0.6rem' }}>
                  <Award size={18} color="#D6A12B" />
                  <span>ADCS ACADEMY OF EXCELLENCE</span>
                </div>
                <h3 style={{ fontSize: '1.45rem', fontWeight: 900, marginBottom: '0.65rem', color: 'var(--adcs-text)' }}>
                  Skill Development & QR-Verified Credentials
                </h3>
                <p style={{ color: 'var(--adcs-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  Complete structured modules in Applied AI, CSC/e-Gov Operations, CCTV Engineering, and Full-Stack Basics with digitally signed ADCS Academy certificates.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <Link to="/portal/student" className="btn-navy">
                    <BookOpen size={16} /> Student Academy LMS
                  </Link>
                  <Link to="/portal/instructor" className="btn-secondary">
                    Instructor Portal
                  </Link>
                </div>
              </div>

              <div className="card" style={{ padding: '2rem', borderTop: '4px solid #061A36' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#075ACB', fontWeight: 800, fontSize: '0.8rem', marginBottom: '0.6rem' }}>
                  <Compass size={18} />
                  <span>VEDIC ASTROLOGY & CONSULTATION</span>
                </div>
                <h3 style={{ fontSize: '1.45rem', fontWeight: 900, marginBottom: '0.65rem', color: 'var(--adcs-text)' }}>
                  Janam Kundli, 36 Guna Milan & Report Desk
                </h3>
                <p style={{ color: 'var(--adcs-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  Generate planetary Lagna charts, Ashtakoota matchmaking compatibility summaries, daily Panchang, and printable ADCS Kundli reports.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <Link to="/astrology/kundli" className="btn-primary">
                    Generate Janam Kundli
                  </Link>
                  <Link to="/astrology" className="btn-secondary">
                    Astrology Suite
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: DMT (DOMESTIC MONEY TRANSFER - IMPS / NEFT) */}
        {/* ========================================================= */}
        {activeTab === 'dmt' && (
          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: '2.5rem',
            border: '1px solid #E2E8F0',
            boxShadow: '0 8px 30px rgba(3, 17, 38, 0.06)',
            maxWidth: '820px',
            margin: '0 auto'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#075ACB' }}>
                <Send size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#061A36', margin: 0 }}>
                  Domestic Money Transfer (DMT)
                </h3>
                <div style={{ fontSize: '0.8rem', color: '#64748B' }}>Instant 24x7 IMPS Bank Transfer to Any Account in India</div>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #F1F5F9', margin: '1.5rem 0' }} />

            {!dmtSuccessReceipt ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Sender Mobile Number (Remitter)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={senderMobile}
                      onChange={(e) => setSenderMobile(e.target.value)}
                      placeholder="10-digit mobile"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Sender Full Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="Remitter Name"
                    />
                  </div>
                </div>

                <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '1.25rem', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#061A36', marginBottom: '0.85rem' }}>
                    Beneficiary Account Details
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Beneficiary Account Holder Name</label>
                      <input
                        type="text"
                        className="form-input"
                        value={beneficiaryName}
                        onChange={(e) => setBeneficiaryName(e.target.value)}
                        placeholder="Name as per Bank Record"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Bank Account Number</label>
                      <input
                        type="text"
                        className="form-input"
                        value={beneficiaryAccount}
                        onChange={(e) => setBeneficiaryAccount(e.target.value)}
                        placeholder="Account Number"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Bank IFSC Code</label>
                      <input
                        type="text"
                        className="form-input"
                        value={beneficiaryIfsc}
                        onChange={(e) => setBeneficiaryIfsc(e.target.value.toUpperCase())}
                        placeholder="e.g. HDFC0000123"
                      />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem', alignItems: 'flex-end' }}>
                  <div className="form-group">
                    <label className="form-label">Transfer Amount (₹)</label>
                    <input
                      type="number"
                      className="form-input"
                      value={transferAmount}
                      onChange={(e) => setTransferAmount(Number(e.target.value))}
                      placeholder="Amount to send"
                      min={100}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Transfer Channel</label>
                    <select
                      className="form-select"
                      value={dmtTransferType}
                      onChange={(e) => setDmtTransferType(e.target.value as any)}
                    >
                      <option value="IMPS">IMPS (Instant Settlement 24x7)</option>
                      <option value="NEFT">NEFT (Batch Settlement)</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#EFF6FF', padding: '0.85rem 1.15rem', borderRadius: '12px', fontSize: '0.84rem' }}>
                  <span style={{ color: '#1E40AF', fontWeight: 600 }}>DMT Service Fee: ₹10.00 | Total Wallet Debit: ₹{transferAmount + 10}</span>
                  <span style={{ color: '#075ACB', fontWeight: 800 }}>Available: ₹{walletBalance.toLocaleString('en-IN')}</span>
                </div>

                <button
                  onClick={handleExecuteDmt}
                  disabled={isProcessingDmt}
                  className="btn-primary"
                  style={{ padding: '0.9rem', fontSize: '1rem', fontWeight: 800, borderRadius: '12px' }}
                >
                  {isProcessingDmt ? 'Processing IMPS Transfer with Bank Switch...' : `Send ₹${transferAmount} via ${dmtTransferType} Now`}
                </button>
              </div>
            ) : (
              /* DMT Success Receipt */
              <div style={{ textAlign: 'center', animation: 'fadeIn 0.2s ease-out' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                  <CheckCircle2 size={32} />
                </div>
                <h4 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#061A36', margin: 0 }}>
                  ₹{dmtSuccessReceipt.amount.toLocaleString('en-IN')} Sent Successfully!
                </h4>
                <div style={{ color: '#16A34A', fontWeight: 700, fontSize: '0.88rem', marginTop: '0.25rem' }}>
                  Bank UTR: {dmtSuccessReceipt.utr}
                </div>

                <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '1.25rem', margin: '1.5rem 0', textAlign: 'left', border: '1px solid #E2E8F0', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', fontSize: '0.84rem' }}>
                  <div><span style={{ color: '#64748B' }}>Beneficiary Name:</span> <strong style={{ color: '#061A36' }}>{dmtSuccessReceipt.beneficiaryName}</strong></div>
                  <div><span style={{ color: '#64748B' }}>Account No:</span> <strong style={{ color: '#061A36' }}>{dmtSuccessReceipt.beneficiaryAccount}</strong></div>
                  <div><span style={{ color: '#64748B' }}>IFSC Code:</span> <strong style={{ color: '#061A36' }}>{dmtSuccessReceipt.beneficiaryIfsc}</strong></div>
                  <div><span style={{ color: '#64748B' }}>Channel:</span> <strong style={{ color: '#061A36' }}>{dmtSuccessReceipt.mode}</strong></div>
                  <div><span style={{ color: '#64748B' }}>Transaction ID:</span> <strong style={{ color: '#061A36' }}>{dmtSuccessReceipt.txnId}</strong></div>
                  <div><span style={{ color: '#64748B' }}>Timestamp:</span> <strong style={{ color: '#061A36' }}>{dmtSuccessReceipt.timestamp}</strong></div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                  <button
                    onClick={() => {
                      printBrandedADCSDocument({
                        title: 'Domestic Money Transfer (DMT) Customer Receipt',
                        documentType: 'IMPS BANK TRANSFER RECEIPT',
                        documentNumber: dmtSuccessReceipt.txnId,
                        issuedDate: dmtSuccessReceipt.timestamp,
                        rows: [
                          { label: 'Sender Name', value: dmtSuccessReceipt.senderName },
                          { label: 'Sender Mobile', value: dmtSuccessReceipt.senderMobile },
                          { label: 'Beneficiary Name', value: dmtSuccessReceipt.beneficiaryName },
                          { label: 'Beneficiary Account', value: dmtSuccessReceipt.beneficiaryAccount },
                          { label: 'Beneficiary IFSC', value: dmtSuccessReceipt.beneficiaryIfsc },
                          { label: 'Bank UTR / Reference', value: dmtSuccessReceipt.utr },
                          { label: 'Transfer Mode', value: dmtSuccessReceipt.mode },
                        ],
                        amountSummary: {
                          subtotal: dmtSuccessReceipt.amount,
                          tax: dmtSuccessReceipt.fee,
                          total: dmtSuccessReceipt.amount + dmtSuccessReceipt.fee,
                          currency: '₹',
                          paymentStatus: 'SETTLED VIA IMPS'
                        }
                      });
                    }}
                    className="btn-navy"
                  >
                    <Download size={16} /> Print Official Receipt
                  </button>
                  <button
                    onClick={() => setDmtSuccessReceipt(null)}
                    className="btn-secondary"
                  >
                    <RotateCcw size={16} /> Make Another Transfer
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: AEPS (AADHAAR ENABLED PAYMENT SYSTEM) */}
        {/* ========================================================= */}
        {activeTab === 'aeps' && (
          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: '2.5rem',
            border: '1px solid #E2E8F0',
            boxShadow: '0 8px 30px rgba(3, 17, 38, 0.06)',
            maxWidth: '820px',
            margin: '0 auto'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16A34A' }}>
                <Fingerprint size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#061A36', margin: 0 }}>
                  Aadhaar ATM & AEPS Terminal
                </h3>
                <div style={{ fontSize: '0.8rem', color: '#64748B' }}>NPCI DigiPay Certified Biometric Cash Withdrawal & Balance Inquiry</div>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #F1F5F9', margin: '1.5rem 0' }} />

            {!aepsReceipt ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Transaction Mode Selector */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
                  {[
                    { id: 'CW', label: 'Cash Withdrawal', icon: <Wallet size={16} /> },
                    { id: 'BE', label: 'Balance Inquiry', icon: <Search size={16} /> },
                    { id: 'MS', label: 'Mini Statement', icon: <FileText size={16} /> },
                    { id: 'AP', label: 'Aadhaar Pay', icon: <CreditCard size={16} /> },
                  ].map(m => (
                    <button
                      key={m.id}
                      onClick={() => setAepsTxnType(m.id as any)}
                      style={{
                        padding: '0.75rem 0.5rem',
                        borderRadius: '12px',
                        border: aepsTxnType === m.id ? '2px solid #16A34A' : '1px solid #E2E8F0',
                        background: aepsTxnType === m.id ? '#DCFCE7' : '#F8FAFC',
                        color: aepsTxnType === m.id ? '#15803D' : '#475569',
                        fontWeight: 800,
                        fontSize: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem',
                        cursor: 'pointer'
                      }}
                    >
                      {m.icon}
                      <span>{m.label}</span>
                    </button>
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Customer 12-Digit Aadhaar Number *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={aepsAadhaar}
                      onChange={(e) => setAepsAadhaar(e.target.value)}
                      placeholder="e.g. 999999990019"
                      maxLength={12}
                    />
                    <span style={{ fontSize: '0.72rem', color: '#16A34A', marginTop: '0.2rem', display: 'block' }}>
                      ✓ Verhoeff Dihedral D5 check enabled (UIDAI compliant)
                    </span>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Select Customer Bank *</label>
                    <select
                      className="form-select"
                      value={aepsBank}
                      onChange={(e) => setAepsBank(e.target.value)}
                    >
                      <option value="State Bank of India (SBI)">State Bank of India (SBI)</option>
                      <option value="Punjab National Bank (PNB)">Punjab National Bank (PNB)</option>
                      <option value="Bank of Baroda (BOB)">Bank of Baroda (BOB)</option>
                      <option value="HDFC Bank">HDFC Bank</option>
                      <option value="ICICI Bank">ICICI Bank</option>
                      <option value="Canara Bank">Canara Bank</option>
                      <option value="Union Bank of India">Union Bank of India</option>
                      <option value="Dakshin Bihar Gramin Bank">Dakshin Bihar Gramin Bank</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Biometric RD Service Device *</label>
                    <select
                      className="form-select"
                      value={aepsDevice}
                      onChange={(e) => setAepsDevice(e.target.value)}
                    >
                      <option value="Mantra MFS100 RD Service">Mantra MFS100 (UIDAI L1 Certified)</option>
                      <option value="Morpho MSO 1300 E3">Morpho Safran MSO 1300 E3</option>
                      <option value="Startek FM220U">Startek FM220U Biometric Scanner</option>
                      <option value="SecuGen Hamster Pro 20">SecuGen Hamster Pro 20</option>
                    </select>
                  </div>

                  {(aepsTxnType === 'CW' || aepsTxnType === 'AP') && (
                    <div className="form-group">
                      <label className="form-label">Cash Amount (₹) *</label>
                      <input
                        type="number"
                        className="form-input"
                        value={aepsAmount}
                        onChange={(e) => setAepsAmount(Number(e.target.value))}
                        step={100}
                        min={100}
                        max={10000}
                      />
                    </div>
                  )}
                </div>

                <button
                  onClick={handleExecuteAeps}
                  disabled={isScanningFinger}
                  className="btn-primary"
                  style={{
                    padding: '0.95rem',
                    fontSize: '1rem',
                    fontWeight: 800,
                    borderRadius: '12px',
                    background: '#16A34A',
                    borderColor: '#16A34A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Fingerprint size={20} />
                  <span>{isScanningFinger ? 'Scanning Biometric on Mantra Device...' : 'Capture Fingerprint & Authorize with NPCI'}</span>
                </button>
              </div>
            ) : (
              /* AEPS Success Slip */
              <div style={{ textAlign: 'center', animation: 'fadeIn 0.2s ease-out' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                  <CheckCircle2 size={32} />
                </div>
                <h4 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#061A36', margin: 0 }}>
                  AEPS {aepsReceipt.txnType} Approved
                </h4>
                <div style={{ color: '#16A34A', fontWeight: 700, fontSize: '0.88rem', marginTop: '0.25rem' }}>
                  RRN: {aepsReceipt.rrn} • Auth: {aepsReceipt.authCode}
                </div>

                <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '1.25rem', margin: '1.5rem 0', textAlign: 'left', border: '1px solid #E2E8F0', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', fontSize: '0.84rem' }}>
                  <div><span style={{ color: '#64748B' }}>Customer Aadhaar:</span> <strong style={{ color: '#061A36' }}>{aepsReceipt.aadhaarMasked}</strong></div>
                  <div><span style={{ color: '#64748B' }}>Bank:</span> <strong style={{ color: '#061A36' }}>{aepsReceipt.bank}</strong></div>
                  <div><span style={{ color: '#64748B' }}>Transacted Amount:</span> <strong style={{ color: '#061A36' }}>₹{aepsReceipt.amount}</strong></div>
                  <div><span style={{ color: '#64748B' }}>VLE Commission:</span> <strong style={{ color: '#16A34A' }}>+₹{aepsReceipt.commission}</strong></div>
                  <div><span style={{ color: '#64748B' }}>Remaining Balance:</span> <strong style={{ color: '#061A36' }}>₹{aepsReceipt.customerLedgerBalance}</strong></div>
                  <div><span style={{ color: '#64748B' }}>Switch Status:</span> <strong style={{ color: '#16A34A' }}>NPCI SWITCH 00 (SUCCESS)</strong></div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                  <button
                    onClick={() => {
                      printBrandedADCSDocument({
                        title: 'Aadhaar Enabled Payment System (AEPS) Cash Receipt',
                        documentType: 'AEPS DIGIPAY TRANSACTION SLIP',
                        documentNumber: aepsReceipt.rrn,
                        issuedDate: aepsReceipt.timestamp,
                        rows: [
                          { label: 'Customer Aadhaar', value: aepsReceipt.aadhaarMasked },
                          { label: 'Customer Bank', value: aepsReceipt.bank },
                          { label: 'Transaction Type', value: aepsReceipt.txnType },
                          { label: 'NPCI RRN', value: aepsReceipt.rrn },
                          { label: 'Auth Approval Code', value: aepsReceipt.authCode },
                          { label: 'RD Device', value: aepsReceipt.device },
                        ],
                        amountSummary: {
                          subtotal: aepsReceipt.amount,
                          tax: 0,
                          total: aepsReceipt.amount,
                          currency: '₹',
                          paymentStatus: 'APPROVED BY NPCI SWITCH'
                        }
                      });
                    }}
                    className="btn-navy"
                  >
                    <Download size={16} /> Print Thermal Slip
                  </button>
                  <button
                    onClick={() => setAepsReceipt(null)}
                    className="btn-secondary"
                  >
                    <RotateCcw size={16} /> New AEPS Transaction
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: BBPS (BHARAT BILL PAYMENT SYSTEM - FULL GRID) */}
        {/* ========================================================= */}
        {activeTab === 'bbps' && (
          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: '2.5rem',
            border: '1px solid #E2E8F0',
            boxShadow: '0 8px 30px rgba(3, 17, 38, 0.06)',
            maxWidth: '920px',
            margin: '0 auto'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D97706' }}>
                <Zap size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#061A36', margin: 0 }}>
                  Bharat Bill Payment System (BBPS)
                </h3>
                <div style={{ fontSize: '0.8rem', color: '#64748B' }}>NPCI Certified Utility Billing, Recharges & State Discom Settlements</div>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #F1F5F9', margin: '1.5rem 0' }} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { name: 'Electricity', icon: <Zap size={20} color="#D97706" /> },
                { name: 'Mobile Recharge', icon: <Smartphone size={20} color="#075ACB" /> },
                { name: 'DTH TV', icon: <Tv size={20} color="#7C3AED" /> },
                { name: 'FASTag', icon: <Car size={20} color="#059669" /> },
                { name: 'LPG Gas', icon: <Flame size={20} color="#EA580C" /> },
                { name: 'Water Bill', icon: <Droplet size={20} color="#0284C7" /> },
              ].map(cat => (
                <div
                  key={cat.name}
                  style={{
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '14px',
                    padding: '1rem',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  {cat.icon}
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#061A36' }}>{cat.name}</span>
                </div>
              ))}
            </div>

            <div style={{ background: '#EFF6FF', borderRadius: '16px', padding: '1.5rem', border: '1px solid #BFDBFE', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div style={{ fontWeight: 800, color: '#1E40AF', fontSize: '1rem' }}>
                  Looking for the Dedicated Interactive BBPS Simulator?
                </div>
                <div style={{ color: '#3B82F6', fontSize: '0.85rem' }}>
                  Explore dynamic bill fetching across all state boards with printable GST receipts.
                </div>
              </div>
              <a
                href="/bills"
                className="btn-primary"
                style={{ borderRadius: '10px' }}
              >
                Open Full BBPS Desk &rarr;
              </a>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: SOUNDBOX & UPI QR VOICE ALERTS */}
        {/* ========================================================= */}
        {activeTab === 'soundbox' && (
          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: '2.5rem',
            border: '1px solid #E2E8F0',
            boxShadow: '0 8px 30px rgba(3, 17, 38, 0.06)',
            maxWidth: '780px',
            margin: '0 auto'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#EDE9FE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7C3AED' }}>
                <Volume2 size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#061A36', margin: 0 }}>
                  Paytm / PhonePe Soundbox & Voice Alerts
                </h3>
                <div style={{ fontSize: '0.8rem', color: '#64748B' }}>Instant Bilingual Audio Confirmation (Hindi + English) on Every UPI Payment</div>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #F1F5F9', margin: '1.5rem 0' }} />

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              {/* Soundbox Physical Graphic */}
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '24px',
                background: 'linear-gradient(135deg, #075ACB 0%, #061A36 100%)',
                color: '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
                boxShadow: isPlayingAudio ? '0 0 30px #075ACB' : '0 8px 24px rgba(6, 26, 54, 0.2)',
                animation: isPlayingAudio ? 'pulse 0.8s infinite' : 'none',
                border: '3px solid #F3D477'
              }}>
                <Volume2 size={44} color="#F3D477" />
                <span style={{ fontSize: '0.72rem', fontWeight: 900, marginTop: '0.3rem', letterSpacing: '0.05em' }}>ADCS BOX</span>
              </div>

              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#061A36', marginBottom: '0.4rem' }}>
                Simulate Soundbox Broadcast
              </div>
              <p style={{ color: '#64748B', fontSize: '0.88rem', maxWidth: '440px', margin: '0 auto 1.5rem' }}>
                Click below to test the instant high-volume payment alert generated when a customer scans your QR code.
              </p>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                {[100, 250, 500, 1000, 2500].map(amt => (
                  <button
                    key={amt}
                    onClick={() => handleTriggerSoundbox(amt)}
                    style={{
                      background: '#EFF6FF',
                      border: '1px solid #075ACB',
                      color: '#075ACB',
                      fontWeight: 800,
                      borderRadius: '12px',
                      padding: '0.65rem 1.15rem',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    🔊 Test ₹{amt}
                  </button>
                ))}
              </div>
            </div>

            {/* Merchant Static UPI QR Standee */}
            <div style={{
              background: '#F8FAFC',
              borderRadius: '24px',
              padding: '1.75rem',
              border: '2px solid #00BAF2',
              textAlign: 'center',
              boxShadow: '0 8px 30px rgba(0, 186, 242, 0.12)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem', marginBottom: '0.4rem' }}>
                <span style={{ fontWeight: 900, color: '#002E6E', fontSize: '1.1rem' }}>
                  {merchantName}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', background: '#0284C7', color: '#FFFFFF', borderRadius: '999px', padding: '1px 7px', fontSize: '0.68rem', fontWeight: 800 }}>✓ Verified</span>
              </div>
              <div style={{ fontSize: '0.82rem', color: '#00BAF2', fontWeight: 800, marginBottom: '1rem' }}>
                Official Paytm UPI Standee • {merchantVpa}
              </div>

              <div style={{
                maxWidth: '280px',
                margin: '0 auto',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 10px 28px rgba(0,0,0,0.12)',
                border: '2px solid #00BAF2'
              }}>
                <img
                  src="/paytm-qr-vikash.jpg"
                  alt="Vikash Kumar Official Paytm UPI QR Standee"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>

              <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '1rem' }}>
                Scan with <strong>Paytm, PhonePe, Google Pay, BHIM</strong> or Any Bank UPI App
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: API KEYS & GATEWAY CONFIGURATION PANEL */}
        {/* ========================================================= */}
        {activeTab === 'apikeys' && (
          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            padding: '2.5rem',
            border: '1px solid #E2E8F0',
            boxShadow: '0 8px 30px rgba(3, 17, 38, 0.06)',
            maxWidth: '860px',
            margin: '0 auto'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#075ACB' }}>
                <Key size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#061A36', margin: 0 }}>
                  Fintech API Gateway & Secret Keys Hub
                </h3>
                <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
                  Connect your live DMT, AEPS, BBPS, and UPI Gateway API credentials here
                </div>
              </div>
            </div>

            <div style={{
              background: '#EFF6FF',
              borderRadius: '14px',
              padding: '1rem 1.25rem',
              border: '1px solid #BFDBFE',
              margin: '1.25rem 0 1.75rem',
              fontSize: '0.86rem',
              color: '#1E40AF',
              lineHeight: 1.55
            }}>
              💡 <strong>API Credentials Ready:</strong> Whenever you receive your live credentials from your API provider (e.g. PaySprint, Eko, Fino, NPCI, or PhonePe/Paytm PG), enter them below and hit <strong>"Save API Keys"</strong>. When left empty, the engine automatically operates in full sandbox simulation mode so all workflows continue to work.
            </div>

            <form onSubmit={handleSaveApiKeys} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Gateway Mode Switch */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8FAFC', padding: '1rem', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                <div>
                  <div style={{ fontWeight: 800, color: '#061A36', fontSize: '0.94rem' }}>Environment Mode</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748B' }}>Switch between Sandbox simulation and Production live gateways</div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setApiGatewayConfig((c: any) => ({ ...c, mode: 'sandbox' }))}
                    style={{
                      padding: '0.45rem 1rem',
                      borderRadius: '8px',
                      border: apiGatewayConfig.mode === 'sandbox' ? '2px solid #075ACB' : '1px solid #E2E8F0',
                      background: apiGatewayConfig.mode === 'sandbox' ? '#EFF6FF' : '#FFFFFF',
                      color: apiGatewayConfig.mode === 'sandbox' ? '#075ACB' : '#64748B',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      cursor: 'pointer'
                    }}
                  >
                    Sandbox Demo
                  </button>
                  <button
                    type="button"
                    onClick={() => setApiGatewayConfig((c: any) => ({ ...c, mode: 'live' }))}
                    style={{
                      padding: '0.45rem 1rem',
                      borderRadius: '8px',
                      border: apiGatewayConfig.mode === 'live' ? '2px solid #16A34A' : '1px solid #E2E8F0',
                      background: apiGatewayConfig.mode === 'live' ? '#DCFCE7' : '#FFFFFF',
                      color: apiGatewayConfig.mode === 'live' ? '#16A34A' : '#64748B',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      cursor: 'pointer'
                    }}
                  >
                    Live Production
                  </button>
                </div>
              </div>

              {/* 1. DMT Credentials */}
              <div style={{ border: '1px solid #E2E8F0', borderRadius: '16px', padding: '1.25rem' }}>
                <div style={{ fontWeight: 800, color: '#061A36', fontSize: '0.94rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Send size={16} color="#075ACB" />
                  <span>DMT (Money Transfer) API Gateway</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
                  <div className="form-group">
                    <label className="form-label">Provider Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={apiGatewayConfig.dmtProvider}
                      onChange={(e) => setApiGatewayConfig({ ...apiGatewayConfig, dmtProvider: e.target.value })}
                      placeholder="e.g. PaySprint / Eko / InstantPay"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Partner / Corporate ID</label>
                    <input
                      type="text"
                      className="form-input"
                      value={apiGatewayConfig.dmtPartnerId}
                      onChange={(e) => setApiGatewayConfig({ ...apiGatewayConfig, dmtPartnerId: e.target.value })}
                      placeholder="Enter Partner ID"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">API Key / Token</label>
                    <input
                      type="password"
                      className="form-input"
                      value={apiGatewayConfig.dmtApiKey}
                      onChange={(e) => setApiGatewayConfig({ ...apiGatewayConfig, dmtApiKey: e.target.value })}
                      placeholder="••••••••••••••••"
                    />
                  </div>
                </div>
              </div>

              {/* 2. AEPS Credentials */}
              <div style={{ border: '1px solid #E2E8F0', borderRadius: '16px', padding: '1.25rem' }}>
                <div style={{ fontWeight: 800, color: '#061A36', fontSize: '0.94rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Fingerprint size={16} color="#16A34A" />
                  <span>AEPS (Aadhaar ATM) API Gateway</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
                  <div className="form-group">
                    <label className="form-label">AEPS Provider</label>
                    <input
                      type="text"
                      className="form-input"
                      value={apiGatewayConfig.aepsProvider}
                      onChange={(e) => setApiGatewayConfig({ ...apiGatewayConfig, aepsProvider: e.target.value })}
                      placeholder="e.g. PaySprint / Fino / ICICI Bank"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">BC / Agent ID</label>
                    <input
                      type="text"
                      className="form-input"
                      value={apiGatewayConfig.aepsBcId}
                      onChange={(e) => setApiGatewayConfig({ ...apiGatewayConfig, aepsBcId: e.target.value })}
                      placeholder="Business Correspondent ID"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Terminal / Device Auth Key</label>
                    <input
                      type="password"
                      className="form-input"
                      value={apiGatewayConfig.aepsAuthKey}
                      onChange={(e) => setApiGatewayConfig({ ...apiGatewayConfig, aepsAuthKey: e.target.value })}
                      placeholder="••••••••••••••••"
                    />
                  </div>
                </div>
              </div>

              {/* 3. BBPS Credentials */}
              <div style={{ border: '1px solid #E2E8F0', borderRadius: '16px', padding: '1.25rem' }}>
                <div style={{ fontWeight: 800, color: '#061A36', fontSize: '0.94rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Zap size={16} color="#D97706" />
                  <span>BBPS (Bharat BillPay) API Gateway</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
                  <div className="form-group">
                    <label className="form-label">BBPS Operating Unit (BOU)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={apiGatewayConfig.bbpsProvider}
                      onChange={(e) => setApiGatewayConfig({ ...apiGatewayConfig, bbpsProvider: e.target.value })}
                      placeholder="e.g. NPCI BBPS / Setu"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Agent Institution (AI) ID</label>
                    <input
                      type="text"
                      className="form-input"
                      value={apiGatewayConfig.bbpsAgentId}
                      onChange={(e) => setApiGatewayConfig({ ...apiGatewayConfig, bbpsAgentId: e.target.value })}
                      placeholder="e.g. AI-ADCS-09821"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Certificate / Secret Token</label>
                    <input
                      type="password"
                      className="form-input"
                      value={apiGatewayConfig.bbpsCertKey}
                      onChange={(e) => setApiGatewayConfig({ ...apiGatewayConfig, bbpsCertKey: e.target.value })}
                      placeholder="••••••••••••••••"
                    />
                  </div>
                </div>
              </div>

              {/* 4. UPI PG Credentials */}
              <div style={{ border: '1px solid #E2E8F0', borderRadius: '16px', padding: '1.25rem' }}>
                <div style={{ fontWeight: 800, color: '#061A36', fontSize: '0.94rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CreditCard size={16} color="#7C3AED" />
                  <span>UPI Payment Gateway (PhonePe / Paytm PG)</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
                  <div className="form-group">
                    <label className="form-label">Payment Gateway Provider</label>
                    <input
                      type="text"
                      className="form-input"
                      value={apiGatewayConfig.upiProvider}
                      onChange={(e) => setApiGatewayConfig({ ...apiGatewayConfig, upiProvider: e.target.value })}
                      placeholder="e.g. PhonePe PG / Paytm PG / Razorpay"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Merchant ID (MID)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={apiGatewayConfig.upiMerchantId}
                      onChange={(e) => setApiGatewayConfig({ ...apiGatewayConfig, upiMerchantId: e.target.value })}
                      placeholder="Enter Merchant ID"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Salt Key / Secret</label>
                    <input
                      type="password"
                      className="form-input"
                      value={apiGatewayConfig.upiSaltKey}
                      onChange={(e) => setApiGatewayConfig({ ...apiGatewayConfig, upiSaltKey: e.target.value })}
                      placeholder="••••••••••••••••"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn-gold"
                style={{ padding: '0.95rem', fontSize: '1rem', fontWeight: 800, borderRadius: '12px', width: '100%' }}
              >
                {keysSaved ? '✓ API Credentials Successfully Saved!' : 'Save & Activate Fintech API Gateway Keys'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
