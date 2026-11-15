import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../store/AppContext';
import { 
  Smartphone, 
  Zap, 
  Tv, 
  CreditCard, 
  Flame, 
  Droplet, 
  Wifi, 
  Car, 
  FileText, 
  Compass, 
  Building2, 
  QrCode, 
  Wallet, 
  ShieldCheck, 
  Coins, 
  Plane, 
  Train, 
  Bus, 
  Monitor, 
  Sparkles, 
  Gift, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Landmark,
  User,
  HeartHandshake,
  Award,
  Clock,
  Shield,
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';

export const FintechSuperAppGrid: React.FC = () => {
  const navigate = useNavigate();
  const { 
    walletBalance, 
    setIsCartOpen, 
    setIsTrackerOpen, 
    setIsQuantumAIOpen, 
    openApplyModal, 
    services, 
    applications,
    showToast,
    language 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'recharge' | 'gov' | 'loans' | 'travel'>('all');
  const [showQrModal, setShowQrModal] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  const merchantVpa = 'akuldravin@icici';

  const handleCopyUpi = () => {
    navigator.clipboard?.writeText(merchantVpa);
    setCopiedUpi(true);
    showToast('UPI VPA Copied', `${merchantVpa} copied to clipboard`, 'success');
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  // 1. Paytm/PhonePe The 4 Classic Money & Quick Actions
  const quickMoneyActions = [
    {
      id: 'to-mobile',
      title: language === 'hi' ? 'मोबाइल / VLE' : 'To Mobile / VLE',
      subtitle: language === 'hi' ? 'तुरंत ट्रांसफर' : 'Instant Transfer',
      icon: <Smartphone size={24} color="#FFFFFF" />,
      bg: 'linear-gradient(135deg, #075ACB 0%, #0878F9 100%)',
      action: () => {
        showToast('P2P & VLE Transfer', 'Enter 10-digit mobile number or VLE Operator ID to send funds.', 'info');
        navigate('/bills');
      }
    },
    {
      id: 'to-bank',
      title: language === 'hi' ? 'बैंक खाता / AEPS' : 'To Bank / AEPS',
      subtitle: language === 'hi' ? 'आधार निकासी' : 'DigiPay Cashout',
      icon: <Building2 size={24} color="#FFFFFF" />,
      bg: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
      action: () => navigate('/digitalseva')
    },
    {
      id: 'track-status',
      title: language === 'hi' ? 'स्टेटस ट्रैक करें' : 'Track Status / ARN',
      subtitle: language === 'hi' ? '4 टोकन ट्रैकर' : 'Live Multi-Token',
      icon: <Compass size={24} color="#FFFFFF" />,
      bg: 'linear-gradient(135deg, #0D9488 0%, #059669 100%)',
      action: () => setIsTrackerOpen(true)
    },
    {
      id: 'check-balance',
      title: language === 'hi' ? 'बैलेंस / पासबुक' : 'Check Balance',
      subtitle: language === 'hi' ? 'लेज़र पासबुक' : 'Passbook & History',
      icon: <Wallet size={24} color="#FFFFFF" />,
      bg: 'linear-gradient(135deg, #D97706 0%, #D6A12B 100%)',
      action: () => navigate('/customer/dashboard')
    }
  ];

  // 2. Recharge & Bill Payments (Paytm / PhonePe BBPS 8-Grid)
  const rechargeBillItems = [
    {
      id: 'mobile-recharge',
      title: language === 'hi' ? 'मोबाइल रिचार्ज' : 'Mobile Recharge',
      desc: 'Jio, Airtel, Vi, BSNL',
      icon: <Smartphone size={22} color="#075ACB" />,
      iconBg: '#EFF6FF',
      badge: 'PROMO 10%',
      badgeColor: '#075ACB',
      path: '/bills'
    },
    {
      id: 'electricity',
      title: language === 'hi' ? 'बिजली बिल' : 'Electricity Bill',
      desc: 'All State Discoms',
      icon: <Zap size={22} color="#D97706" />,
      iconBg: '#FEF3C7',
      badge: 'BBPS',
      badgeColor: '#059669',
      path: '/bills'
    },
    {
      id: 'dth',
      title: language === 'hi' ? 'DTH रिचार्ज' : 'DTH Cable TV',
      desc: 'Tata Play, Airtel, Dish',
      icon: <Tv size={22} color="#7C3AED" />,
      iconBg: '#EDE9FE',
      path: '/bills'
    },
    {
      id: 'fastag',
      title: language === 'hi' ? 'FASTag रिचार्ज' : 'FASTag Recharge',
      desc: 'NHAI NETC Instant',
      icon: <Car size={22} color="#059669" />,
      iconBg: '#ECFDF5',
      badge: 'INSTANT',
      badgeColor: '#059669',
      path: '/bills'
    },
    {
      id: 'gas-cylinder',
      title: language === 'hi' ? 'गैस सिलिंडर' : 'Book Cylinder',
      desc: 'Indane, HP, Bharat Gas',
      icon: <Flame size={22} color="#EA580C" />,
      iconBg: '#FFF7ED',
      path: '/bills'
    },
    {
      id: 'credit-card',
      title: language === 'hi' ? 'क्रेडिट कार्ड' : 'Credit Card Bill',
      desc: 'Visa, Mastercard, RuPay',
      icon: <CreditCard size={22} color="#2563EB" />,
      iconBg: '#EFF6FF',
      path: '/bills'
    },
    {
      id: 'water',
      title: language === 'hi' ? 'पानी एवं नगर निगम' : 'Water & Municipal',
      desc: 'Piped Water Boards',
      icon: <Droplet size={22} color="#0284C7" />,
      iconBg: '#E0F2FE',
      path: '/bills'
    },
    {
      id: 'broadband',
      title: language === 'hi' ? 'ब्रॉडबैंड / WiFi' : 'Broadband / WiFi',
      desc: 'Fiber Net & Landline',
      icon: <Wifi size={22} color="#4F46E5" />,
      iconBg: '#EEF2FF',
      path: '/bills'
    }
  ];

  // 3. Digital India & Government G2C Services (CSC Style)
  const govServicesItems = [
    {
      id: 'pan-card',
      title: language === 'hi' ? 'नया पैन कार्ड (49A)' : 'PAN Card (Form 49A)',
      desc: 'Paperless Aadhaar e-PAN & PVC',
      icon: <FileText size={22} color="#075ACB" />,
      iconBg: '#EFF6FF',
      price: '₹120',
      badge: 'MOST POPULAR',
      serviceId: 'srv-pan-new'
    },
    {
      id: 'passport',
      title: language === 'hi' ? 'पासपोर्ट आवेदन' : 'Fresh Passport Seva',
      desc: 'Tatkaal & Normal PSK Slot',
      icon: <Plane size={22} color="#D97706" />,
      iconBg: '#FEF3C7',
      price: '₹1,500',
      serviceId: 'srv-passport-fresh'
    },
    {
      id: 'rtps-income',
      title: language === 'hi' ? 'आय / जाति / निवास' : 'Income / Caste / Domicile',
      desc: 'State e-District RTPS Portal',
      icon: <Landmark size={22} color="#059669" />,
      iconBg: '#ECFDF5',
      price: '₹149',
      badge: 'TEHSILDAR SIGNED',
      serviceId: 'gov-income-caste-domicile'
    },
    {
      id: 'pm-solar',
      title: language === 'hi' ? 'पीएम सूर्य घर मुफ्त बिजली' : 'PM Surya Ghar Solar',
      desc: 'Up to ₹78,000 Govt Subsidy',
      icon: <Zap size={22} color="#F59E0B" />,
      iconBg: '#FEF3C7',
      price: 'FREE ASSIST',
      badge: 'SUBSIDY',
      serviceId: 'srv-pm-surya-ghar'
    },
    {
      id: 'abha-card',
      title: language === 'hi' ? 'आयुष्मान ABHA कार्ड' : 'Ayushman ABHA Card',
      desc: '14-Digit Health ID & PM-JAY',
      icon: <ShieldCheck size={22} color="#0D9488" />,
      iconBg: '#CCFBF1',
      price: '₹50',
      serviceId: 'srv-abha-health-card'
    },
    {
      id: 'company-reg',
      title: language === 'hi' ? 'प्राइवेट लिमिटेड कंपनी' : 'Pvt Ltd Company MCA',
      desc: 'SPICe+ RUN, DIN & COI Kit',
      icon: <Building2 size={22} color="#7C3AED" />,
      iconBg: '#EDE9FE',
      price: '₹6,999',
      serviceId: 'srv-company-pvt-ltd'
    }
  ];

  // 4. Financial Services & Insurance (PhonePe Wealth & Lending Hub)
  const financialItems = [
    {
      id: 'instant-loan',
      title: language === 'hi' ? 'त्वरित पर्सनल / मुद्रा लोन' : 'Instant Cash / Mudra Loan',
      desc: 'Pre-approved ₹10K - ₹10 Lakhs in 2 mins',
      icon: <Coins size={22} color="#D97706" />,
      iconBg: '#FEF3C7',
      badge: 'LOW APR',
      path: '/finance'
    },
    {
      id: 'vehicle-insurance',
      title: language === 'hi' ? 'बाइक / कार बीमा' : 'Bike & Car Insurance',
      desc: 'Instant Policy PDF • Zero Paperwork',
      icon: <ShieldCheck size={22} color="#059669" />,
      iconBg: '#ECFDF5',
      badge: 'INSTANT POLICY',
      path: '/insurance'
    },
    {
      id: 'health-cover',
      title: language === 'hi' ? 'स्वास्थ्य एवं टर्म बीमा' : 'Health & Term Life',
      desc: 'Cashless hospital network across India',
      icon: <HeartHandshake size={22} color="#DC2626" />,
      iconBg: '#FEE2E2',
      path: '/insurance'
    },
    {
      id: 'digital-gold',
      title: language === 'hi' ? '24K डिजिटल गोल्ड' : '24K Digital Gold (99.9%)',
      desc: 'Buy, Sell & Safe Vault storage from ₹10',
      icon: <Award size={22} color="#D6A12B" />,
      iconBg: '#FFFBEB',
      badge: 'VAULT CERTIFIED',
      path: '/services'
    }
  ];

  // 5. Transit & Travel (Paytm Travel Hub)
  const travelTransitItems = [
    {
      id: 'train-tickets',
      title: language === 'hi' ? 'ट्रेन / IRCTC टिकट' : 'IRCTC Train Booking',
      desc: 'Tatkaal & Confirmed Seat Assist',
      icon: <Train size={22} color="#DC2626" />,
      iconBg: '#FEE2E2',
      badge: 'ZERO PAYMENT FEE',
      path: '/travel'
    },
    {
      id: 'flights',
      title: language === 'hi' ? 'हवाई जहाज टिकट' : 'Flight Bookings',
      desc: 'Domestic & International lowest fares',
      icon: <Plane size={22} color="#075ACB" />,
      iconBg: '#EFF6FF',
      badge: 'UP TO ₹1,200 OFF',
      path: '/travel'
    },
    {
      id: 'buses',
      title: language === 'hi' ? 'बस टिकट' : 'Intercity Bus',
      desc: 'AC Sleeper, Volvo & State Transport',
      icon: <Bus size={22} color="#059669" />,
      iconBg: '#ECFDF5',
      path: '/travel'
    },
    {
      id: 'cyber-cafe-desk',
      title: language === 'hi' ? 'साइबर कैफ़े PC बुकिंग' : 'Cyber Café Workstation',
      desc: 'High-speed internet, exam forms & print',
      icon: <Monitor size={22} color="#4F46E5" />,
      iconBg: '#EEF2FF',
      badge: 'LIVE SLOTS',
      path: '/cyber-cafe'
    }
  ];

  const handleServiceClick = (srvId?: string, path?: string) => {
    if (srvId) {
      const match = services.find(s => s.id === srvId) || services[0];
      if (match) {
        openApplyModal(match);
        return;
      }
    }
    if (path) {
      navigate(path);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* ------------------------------------------------------------- */}
      {/* 1. PAYTM / PHONEPE SUPER-APP HERO BANNER & MONEY ACTIONS CARD */}
      {/* ------------------------------------------------------------- */}
      <div 
        style={{
          background: 'linear-gradient(135deg, #031126 0%, #061A36 45%, #075ACB 100%)',
          borderRadius: '24px',
          padding: '1.75rem',
          color: '#FFFFFF',
          boxShadow: '0 16px 36px rgba(6, 26, 54, 0.28)',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(214, 161, 43, 0.35)',
        }}
      >
        {/* Decorative background glow circles */}
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '220px',
          height: '220px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(8, 120, 249, 0.35) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          left: '20%',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(214, 161, 43, 0.22) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        {/* Top Bar: User/Merchant Info + Wallet Balance + Scan QR Button */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.75rem',
          position: 'relative',
          zIndex: 1,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #D6A12B 0%, #F3D477 100%)',
              color: '#061A36',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '1.25rem',
              boxShadow: '0 4px 12px rgba(214, 161, 43, 0.4)',
              border: '2px solid #FFFFFF'
            }}>
              AD
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <span style={{ fontWeight: 800, fontSize: '1.05rem', color: '#FFFFFF' }}>
                  AKUL DRAVIN CLOUD AI
                </span>
                <span style={{
                  background: 'rgba(52, 211, 153, 0.2)',
                  color: '#34D399',
                  border: '1px solid #34D399',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  padding: '0.15rem 0.5rem',
                  borderRadius: '999px',
                }}>
                  VERIFIED
                </span>
              </div>
              <div style={{ fontSize: '0.78rem', color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.15rem' }}>
                <span>UPI ID: {merchantVpa}</span>
                <button 
                  onClick={handleCopyUpi} 
                  style={{ background: 'none', border: 'none', color: '#F3D477', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                  title="Copy UPI ID"
                >
                  {copiedUpi ? <Check size={13} color="#34D399" /> : <Copy size={13} />}
                </button>
              </div>
            </div>
          </div>

          {/* Wallet Balance Widget & Scan Any QR button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(8px)',
              borderRadius: '14px',
              padding: '0.5rem 1rem',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start'
            }}>
              <span style={{ fontSize: '0.68rem', color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {language === 'hi' ? 'वॉलेट एवं AEPS बैलेंस' : 'Wallet & AEPS Balance'}
              </span>
              <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#F3D477' }}>
                ₹{walletBalance.toLocaleString('en-IN')}
              </span>
            </div>

            <button
              onClick={() => setShowQrModal(true)}
              style={{
                background: '#FFFFFF',
                color: '#061A36',
                border: 'none',
                borderRadius: '14px',
                padding: '0.65rem 1.1rem',
                fontWeight: 800,
                fontSize: '0.86rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                cursor: 'pointer',
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <QrCode size={18} color="#075ACB" />
              <span>{language === 'hi' ? 'QR स्कैन करें' : 'Scan Any QR'}</span>
            </button>
          </div>
        </div>

        {/* The 4 Big Actions (PhonePe & Paytm style) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          position: 'relative',
          zIndex: 1,
        }}>
          {quickMoneyActions.map((action) => (
            <div
              key={action.id}
              onClick={action.action}
              style={{
                background: 'rgba(255, 255, 255, 0.07)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                padding: '1.15rem 1rem',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.14)';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = '#F3D477';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.07)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.14)';
              }}
            >
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '14px',
                background: action.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)'
              }}>
                {action.icon}
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#FFFFFF', lineHeight: 1.25 }}>
                  {action.title}
                </div>
                <div style={{ fontSize: '0.74rem', color: '#CBD5E1', marginTop: '0.2rem' }}>
                  {action.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. RECHARGE & BILL PAYMENTS SECTION (PAYTM & PHONEPE BBPS) */}
      {/* ------------------------------------------------------------- */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '1.75rem',
        border: '1px solid #E2E8F0',
        boxShadow: '0 4px 20px rgba(6, 26, 54, 0.05)',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem',
          borderBottom: '1px solid #F1F5F9',
          paddingBottom: '1rem',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#075ACB'
              }} />
              <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#061A36', margin: 0 }}>
                {language === 'hi' ? 'रिचार्ज एवं बिल भुगतान' : 'Recharge & Pay Bills'}
              </h2>
              <span style={{
                background: '#ECFDF5',
                color: '#059669',
                border: '1px solid #A7F3D0',
                fontSize: '0.68rem',
                fontWeight: 800,
                padding: '0.15rem 0.55rem',
                borderRadius: '999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}>
                <CheckCircle2 size={11} />
                <span>BBPS ASSURED</span>
              </span>
            </div>
            <p style={{ fontSize: '0.84rem', color: '#64748B', marginTop: '0.25rem', marginBottom: 0 }}>
              {language === 'hi' 
                ? 'बिजली, मोबाइल, डीटीएच, फास्टैग एवं गैस सिलिंडर का त्वरित भुगतान • तत्काल रसीद एवं रिवॉर्ड्स'
                : 'Instant settlement for Electricity, Mobile, DTH, FASTag & Gas Cylinder with authentic BBPS receipts.'}
            </p>
          </div>

          <button
            onClick={() => navigate('/bills')}
            style={{
              background: '#F8FAFC',
              border: '1px solid #CBD5E1',
              color: '#075ACB',
              fontWeight: 700,
              fontSize: '0.84rem',
              padding: '0.5rem 1rem',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              cursor: 'pointer'
            }}
          >
            <span>{language === 'hi' ? 'सभी बिल देखें' : 'View All Bills'}</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* 8-Grid of Bill Payment Services */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '1.25rem',
        }}>
          {rechargeBillItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleServiceClick(undefined, item.path)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '1.1rem 0.5rem',
                borderRadius: '18px',
                border: '1px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.18s ease-in-out',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#F8FAFC';
                e.currentTarget.style.borderColor = '#BFDBFE';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {item.badge && (
                <span style={{
                  position: 'absolute',
                  top: '4px',
                  right: '8px',
                  background: item.badgeColor,
                  color: '#FFFFFF',
                  fontSize: '0.62rem',
                  fontWeight: 900,
                  padding: '0.1rem 0.4rem',
                  borderRadius: '999px',
                  letterSpacing: '0.02em',
                }}>
                  {item.badge}
                </span>
              )}
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '18px',
                background: item.iconBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.75rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
                border: '1px solid rgba(0, 0, 0, 0.05)',
              }}>
                {item.icon}
              </div>
              <div style={{ fontWeight: 800, fontSize: '0.86rem', color: '#061A36', lineHeight: 1.25 }}>
                {item.title}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '0.2rem' }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. DIGITAL INDIA & GOVERNMENT CITIZEN SERVICES (CSC KENDRA) */}
      {/* ------------------------------------------------------------- */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '1.75rem',
        border: '1px solid #E2E8F0',
        boxShadow: '0 4px 20px rgba(6, 26, 54, 0.05)',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem',
          borderBottom: '1px solid #F1F5F9',
          paddingBottom: '1rem',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#D97706'
              }} />
              <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#061A36', margin: 0 }}>
                {language === 'hi' ? 'सरकारी एवं नागरिक ई-सेवाएँ' : 'Government & Citizen Services'}
              </h2>
              <span style={{
                background: '#FEF3C7',
                color: '#D97706',
                border: '1px solid #FCD34D',
                fontSize: '0.68rem',
                fontWeight: 800,
                padding: '0.15rem 0.55rem',
                borderRadius: '999px',
              }}>
                DIGITAL INDIA KENDRA
              </span>
            </div>
            <p style={{ fontSize: '0.84rem', color: '#64748B', marginTop: '0.25rem', marginBottom: 0 }}>
              {language === 'hi'
                ? 'पैन कार्ड, तत्काल पासपोर्ट, आय-जाति प्रमाण पत्र, एवं पीएम सोलर योजना का त्वरित आवेदन'
                : 'Instant assisted filing for PAN, Passport, Income/Caste Certificates & PM Solar Subsidies.'}
            </p>
          </div>

          <button
            onClick={() => navigate('/government')}
            style={{
              background: '#075ACB',
              border: 'none',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.84rem',
              padding: '0.5rem 1.1rem',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              cursor: 'pointer'
            }}
          >
            <span>{language === 'hi' ? 'सभी सरकारी सेवाएँ' : 'All Govt Services'}</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* 6-Card Grid of Govt Services */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.15rem',
        }}>
          {govServicesItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleServiceClick(item.serviceId)}
              style={{
                background: '#F8FAFC',
                borderRadius: '16px',
                padding: '1.25rem',
                border: '1.5px solid #E2E8F0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
                cursor: 'pointer',
                transition: 'all 0.18s ease-in-out',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.borderColor = '#075ACB';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(7, 90, 203, 0.12)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#F8FAFC';
                e.currentTarget.style.borderColor = '#E2E8F0';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: item.iconBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  border: '1px solid rgba(0,0,0,0.05)'
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.94rem', color: '#061A36' }}>
                      {item.title}
                    </div>
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#64748B', marginTop: '0.15rem' }}>
                    {item.desc}
                  </div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#075ACB', marginTop: '0.35rem' }}>
                    Fee: {item.price}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem' }}>
                {item.badge && (
                  <span style={{
                    background: '#EDE9FE',
                    color: '#7C3AED',
                    fontSize: '0.62rem',
                    fontWeight: 800,
                    padding: '0.15rem 0.45rem',
                    borderRadius: '999px',
                    whiteSpace: 'nowrap'
                  }}>
                    {item.badge}
                  </span>
                )}
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#075ACB'
                }}>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4. FINANCIAL SERVICES, LOANS & INSURANCE (PHONEPE WEALTH HUB) */}
      {/* ------------------------------------------------------------- */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem',
      }}>
        {/* Wealth & Loans Card */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          padding: '1.75rem',
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 20px rgba(6, 26, 54, 0.05)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Coins size={20} color="#D97706" />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#061A36', margin: 0 }}>
                {language === 'hi' ? 'लोन एवं वित्तीय सेवाएँ' : 'Financial Services & Loans'}
              </h3>
            </div>
            <button 
              onClick={() => navigate('/finance')}
              style={{ background: 'none', border: 'none', color: '#075ACB', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}
            >
              Explore Loans ➔
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {financialItems.slice(0, 2).map((item) => (
              <div
                key={item.id}
                onClick={() => handleServiceClick(undefined, item.path)}
                style={{
                  padding: '1rem',
                  borderRadius: '14px',
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: item.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#061A36' }}>{item.title}</div>
                    <div style={{ fontSize: '0.74rem', color: '#64748B' }}>{item.desc}</div>
                  </div>
                </div>
                <ArrowRight size={15} color="#94A3B8" />
              </div>
            ))}
          </div>
        </div>

        {/* Insurance & Protection Card */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          padding: '1.75rem',
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 20px rgba(6, 26, 54, 0.05)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={20} color="#059669" />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#061A36', margin: 0 }}>
                {language === 'hi' ? 'बीमा एवं सुरक्षा' : 'Insurance & Protection'}
              </h3>
            </div>
            <button 
              onClick={() => navigate('/insurance')}
              style={{ background: 'none', border: 'none', color: '#075ACB', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}
            >
              View Plans ➔
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {financialItems.slice(2, 4).map((item) => (
              <div
                key={item.id}
                onClick={() => handleServiceClick(undefined, item.path)}
                style={{
                  padding: '1rem',
                  borderRadius: '14px',
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: item.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#061A36' }}>{item.title}</div>
                    <div style={{ fontSize: '0.74rem', color: '#64748B' }}>{item.desc}</div>
                  </div>
                </div>
                <ArrowRight size={15} color="#94A3B8" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 5. TRANSIT, TRAVEL & ASTROLOGY SUPER CARDS (PAYTM TRAVEL) */}
      {/* ------------------------------------------------------------- */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '1.75rem',
        border: '1px solid #E2E8F0',
        boxShadow: '0 4px 20px rgba(6, 26, 54, 0.05)',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem',
          borderBottom: '1px solid #F1F5F9',
          paddingBottom: '1rem',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <Plane size={20} color="#075ACB" />
              <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#061A36', margin: 0 }}>
                {language === 'hi' ? 'यात्रा, टिकटिंग एवं साइबर कैफ़े' : 'Transit, Travel & Cyber Café'}
              </h2>
            </div>
            <p style={{ fontSize: '0.84rem', color: '#64748B', marginTop: '0.25rem', marginBottom: 0 }}>
              {language === 'hi' 
                ? 'आईआरसीटीसी ट्रेन बुकिंग, फ्लाइट, बस टिकट एवं स्थानीय साइबर कैफ़े वर्कस्टेशन'
                : 'IRCTC trains, domestic flights, intercity buses, and local cyber café PC terminals.'}
            </p>
          </div>

          <button
            onClick={() => navigate('/travel')}
            style={{
              background: '#F8FAFC',
              border: '1px solid #CBD5E1',
              color: '#075ACB',
              fontWeight: 700,
              fontSize: '0.84rem',
              padding: '0.5rem 1rem',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              cursor: 'pointer'
            }}
          >
            <span>Book Travel ➔</span>
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
        }}>
          {travelTransitItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleServiceClick(undefined, item.path)}
              style={{
                background: '#F8FAFC',
                borderRadius: '16px',
                padding: '1.25rem',
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.18s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.borderColor = '#075ACB';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(7, 90, 203, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#F8FAFC';
                e.currentTarget.style.borderColor = '#E2E8F0';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: item.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {item.icon}
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#061A36' }}>{item.title}</div>
                <div style={{ fontSize: '0.74rem', color: '#64748B', marginTop: '0.15rem' }}>{item.desc}</div>
                {item.badge && (
                  <span style={{ fontSize: '0.62rem', fontWeight: 800, color: '#059669', background: '#DCFCE7', padding: '0.1rem 0.35rem', borderRadius: '4px', marginTop: '0.35rem', display: 'inline-block' }}>
                    {item.badge}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 6. REWARDS & CASHBACK TICKER (PHONEPE SCRATCH CARD STYLE) */}
      {/* ------------------------------------------------------------- */}
      <div style={{
        background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
        borderRadius: '18px',
        padding: '1.25rem 1.5rem',
        border: '1.5px solid #F59E0B',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: '#D97706',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(217, 119, 6, 0.3)'
          }}>
            <Gift size={22} />
          </div>
          <div>
            <div style={{ fontWeight: 900, fontSize: '0.98rem', color: '#78350F' }}>
              {language === 'hi' 
                ? '🎉 हर बिल भुगतान एवं सरकारी सेवा पर ₹50 - ₹500 तक का कैशबैक रिवॉर्ड!'
                : '🎉 Guaranteed ₹50 to ₹500 Cashback Scratch Cards on every bill payment & citizen service!'}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#92400E', marginTop: '0.2rem' }}>
              Directly credited to your ADCS Kendra Wallet • Zero transaction charges on RuPay UPI.
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsCartOpen(true)}
          style={{
            background: '#B45309',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '10px',
            padding: '0.55rem 1.15rem',
            fontWeight: 800,
            fontSize: '0.84rem',
            cursor: 'pointer'
          }}
        >
          Check My Rewards ➔
        </button>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 7. INSTANT UPI QR MODAL (PHONEPE / PAYTM SCAN DIALOG) */}
      {/* ------------------------------------------------------------- */}
      {showQrModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(3, 17, 38, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999,
          padding: '1rem',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            maxWidth: '440px',
            width: '100%',
            padding: '2rem',
            boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
            textAlign: 'center',
            position: 'relative'
          }}>
            <button
              onClick={() => setShowQrModal(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: '#F1F5F9',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#64748B'
              }}
            >
              ✕
            </button>

            <div style={{
              display: 'inline-flex',
              padding: '0.35rem 0.85rem',
              borderRadius: '999px',
              background: '#EFF6FF',
              color: '#075ACB',
              fontWeight: 800,
              fontSize: '0.76rem',
              marginBottom: '1rem',
              alignItems: 'center',
              gap: '0.35rem'
            }}>
              <QrCode size={14} />
              <span>BHARAT INTEROPERABLE UPI QR</span>
            </div>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#061A36', margin: '0 0 0.5rem 0' }}>
              Scan with Any UPI App
            </h3>
            <p style={{ fontSize: '0.84rem', color: '#64748B', marginBottom: '1.5rem' }}>
              Paytm, PhonePe, Google Pay, BHIM, CRED or Any Bank App
            </p>

            {/* Generated UPI QR Code SVG */}
            <div style={{
              display: 'inline-block',
              padding: '1.25rem',
              background: '#FFFFFF',
              borderRadius: '20px',
              border: '2px solid #075ACB',
              boxShadow: '0 8px 24px rgba(7, 90, 203, 0.15)',
              marginBottom: '1.25rem'
            }}>
              <svg width="200" height="200" viewBox="0 0 200 200">
                <rect width="200" height="200" fill="#FFFFFF" />
                {/* QR corner blocks */}
                <rect x="15" y="15" width="55" height="55" rx="8" fill="#061A36" />
                <rect x="25" y="25" width="35" height="35" rx="4" fill="#FFFFFF" />
                <rect x="33" y="33" width="19" height="19" rx="2" fill="#075ACB" />

                <rect x="130" y="15" width="55" height="55" rx="8" fill="#061A36" />
                <rect x="140" y="25" width="35" height="35" rx="4" fill="#FFFFFF" />
                <rect x="148" y="33" width="19" height="19" rx="2" fill="#075ACB" />

                <rect x="15" y="130" width="55" height="55" rx="8" fill="#061A36" />
                <rect x="25" y="140" width="35" height="35" rx="4" fill="#FFFFFF" />
                <rect x="33" y="148" width="19" height="19" rx="2" fill="#075ACB" />

                {/* Central brand emblem */}
                <circle cx="100" cy="100" r="22" fill="#075ACB" />
                <text x="100" y="106" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="900" fontFamily="sans-serif">AD</text>

                {/* Data Matrix Dots */}
                <rect x="80" y="20" width="10" height="10" fill="#061A36" />
                <rect x="100" y="25" width="10" height="10" fill="#075ACB" />
                <rect x="85" y="45" width="10" height="10" fill="#061A36" />
                <rect x="105" y="55" width="10" height="10" fill="#075ACB" />
                <rect x="25" y="85" width="10" height="10" fill="#061A36" />
                <rect x="45" y="100" width="10" height="10" fill="#075ACB" />
                <rect x="140" y="85" width="10" height="10" fill="#061A36" />
                <rect x="160" y="100" width="10" height="10" fill="#075ACB" />
                <rect x="85" y="140" width="10" height="10" fill="#061A36" />
                <rect x="105" y="155" width="10" height="10" fill="#075ACB" />
                <rect x="140" y="140" width="10" height="10" fill="#061A36" />
                <rect x="160" y="155" width="10" height="10" fill="#075ACB" />
              </svg>
            </div>

            <div style={{
              background: '#F8FAFC',
              borderRadius: '12px',
              padding: '0.65rem 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
              border: '1px solid #E2E8F0'
            }}>
              <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#334155' }}>
                {merchantVpa}
              </span>
              <button
                onClick={handleCopyUpi}
                style={{
                  background: copiedUpi ? '#10B981' : '#075ACB',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.35rem 0.65rem',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {copiedUpi ? 'Copied!' : 'Copy VPA'}
              </button>
            </div>

            <div style={{ fontSize: '0.74rem', color: '#94A3B8' }}>
              AKUL DRAVIN DIGITAL SERVICES PRIVATE LIMITED • NPCI Compliant
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
