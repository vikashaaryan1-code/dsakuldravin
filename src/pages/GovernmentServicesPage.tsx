import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { ServiceCard } from '../components/cards/ServiceCard';
import { STATE_EDISTRICT_PORTALS } from '../data/officialPortalRegistry';
import { 
  Landmark, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  HelpCircle, 
  Search, 
  AlertTriangle,
  CreditCard,
  BookOpen,
  Users,
  Award,
  Sparkles,
  Calculator,
  ExternalLink,
  Download,
  RotateCcw
} from 'lucide-react';

export const GovernmentServicesPage: React.FC = () => {
  const { services, language, showToast, logAudit } = useApp();
  const [selectedSubCat, setSelectedSubCat] = useState<'all' | 'identity' | 'certificates' | 'employment' | 'welfare'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Interactive Scheme Matcher State
  const [citizenProfile, setCitizenProfile] = useState<'farmer' | 'worker' | 'women' | 'student' | 'general'>('farmer');
  const [incomeRange, setIncomeRange] = useState<'bpl' | 'middle' | 'higher'>('bpl');

  const getMatchedSchemes = () => {
    const list: { label: string; bg: string; color: string }[] = [];
    if (citizenProfile === 'farmer') {
      list.push(
        { label: '✓ PM Kisan Samman Nidhi (₹6,000/वर्ष DBT)', bg: '#064E3B', color: '#6EE7B7' },
        { label: '✓ PM Fasal Bima Yojana (फसल नुकसान बीमा)', bg: '#064E3B', color: '#6EE7B7' }
      );
    }
    if (citizenProfile === 'worker') {
      list.push(
        { label: '✓ E-Shram Accident Cover (₹2,00,000 बीमा)', bg: '#1E3A8A', color: '#93C5FD' },
        { label: '✓ PM Shram Yogi Maandhan (₹3,000/माह पेंशन)', bg: '#1E3A8A', color: '#93C5FD' }
      );
    }
    if (citizenProfile === 'women') {
      list.push(
        { label: '✓ Sukanya Samriddhi Yojana (8.2% ब्याज दर)', bg: '#701A75', color: '#F5D0FE' },
        { label: '✓ PM Ujjwala 2.0 (मुफ्त गैस कनेक्शन)', bg: '#701A75', color: '#F5D0FE' }
      );
    }
    if (citizenProfile === 'student') {
      list.push(
        { label: '✓ National Scholarship Portal (NSP Pre/Post Matric)', bg: '#312E81', color: '#C7D2FE' },
        { label: '✓ PMKVY 4.0 Skill India & Vidyalaxmi Loan', bg: '#312E81', color: '#C7D2FE' }
      );
    }
    if (citizenProfile === 'general') {
      list.push(
        { label: '✓ PM Suraksha & Jeevan Jyoti Bima (PMSBY ₹20 / PMJJBY ₹436)', bg: '#1E293B', color: '#E2E8F0' },
        { label: '✓ Atal Pension Yojana (₹1,000–₹5,000 मासिक पेंशन)', bg: '#1E293B', color: '#E2E8F0' }
      );
    }
    if (incomeRange === 'bpl') {
      list.push(
        { label: '✓ Ayushman Bharat ABHA (₹5,00,000 मुफ्त इलाज)', bg: '#14532D', color: '#86EFAC' },
        { label: '✓ NFSA राशन कार्ड (मुफ्त खाद्यान्न योजना)', bg: '#14532D', color: '#86EFAC' }
      );
    } else if (incomeRange === 'middle') {
      list.push(
        { label: '✓ PM Surya Ghar Muft Bijli Yojana (₹78,000 Solar Subsidy)', bg: '#78350F', color: '#FDE68A' },
        { label: '✓ Income & EWS Certificate Eligibility Desk', bg: '#78350F', color: '#FDE68A' }
      );
    } else {
      list.push(
        { label: '✓ NPS Sovereign Tier-I Tax Deduction (80CCD)', bg: '#1E3A8A', color: '#BFDBFE' },
        { label: '✓ Passport & Fast-Track PAN Compliance', bg: '#1E3A8A', color: '#BFDBFE' }
      );
    }
    list.push({ label: '✓ DigiLocker सुरक्षित डिजिटल दस्तावेज वॉल्ट', bg: '#374151', color: '#E5E7EB' });
    return list;
  };

  const handleDownloadEligibilityChecklist = () => {
    const schemes = getMatchedSchemes();
    const text = [
      'AKUL DRAVIN DIGITAL SERVICES (ADCS) — CITIZEN WELFARE ELIGIBILITY BRIEF',
      '========================================================================',
      `Generated Date   : ${new Date().toISOString().split('T')[0]}`,
      `Citizen Profile  : ${citizenProfile.toUpperCase()}`,
      `Income Bracket   : ${incomeRange.toUpperCase()}`,
      '',
      'RECOMMENDED WELFARE & STATUTORY SCHEMES:',
      ...schemes.map((s, idx) => `  ${idx + 1}. ${s.label.replace(/^✓\s*/, '')}`),
      '',
      'REQUIRED STANDARD KYC DOCUMENTS:',
      '  - Aadhaar Card (linked to active mobile for OTP verification)',
      '  - State Income / Caste / Domicile Certificate (via State e-District)',
      '  - Bank Account Passbook + IFSC for DBT transfers',
      '========================================================================',
      'Note: ADCS provides assisted form facilitation only. Final eligibility and',
      'DBT disbursements rest solely with competent Central/State authorities.',
    ].join('\n');
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ADCS_Welfare_Checklist_${citizenProfile}_${incomeRange}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    logAudit('Citizen Welfare Checklist Generated', `Profile: ${citizenProfile} • Bracket: ${incomeRange}`, 'Success');
    showToast('Eligibility Checklist Ready', `Downloaded ADCS_Welfare_Checklist_${citizenProfile}_${incomeRange}.txt`, 'success');
  };

  const govtServices = services.filter(s => s.category === 'government');

  const filteredServices = govtServices.filter(s => {
    const matchSearch = (
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (selectedSubCat === 'identity') {
      return matchSearch && (
        s.slug.includes('pan') || 
        s.slug.includes('passport') || 
        s.slug.includes('aadhaar') || 
        s.slug.includes('voter') || 
        s.slug.includes('driving') || 
        s.slug.includes('dl')
      );
    }
    if (selectedSubCat === 'certificates') {
      return matchSearch && (
        s.slug.includes('cert') || 
        s.slug.includes('income') || 
        s.slug.includes('ration')
      );
    }
    if (selectedSubCat === 'employment' || selectedSubCat === 'welfare') {
      return matchSearch && (
        s.slug.includes('eshram') || 
        s.slug.includes('welfare') || 
        s.slug.includes('scheme') || 
        s.slug.includes('ayushman') || 
        s.slug.includes('kisan')
      );
    }
    return matchSearch;
  });

  return (
    <div className="container-wide" style={{ padding: '2.5rem 1.5rem 4rem' }}>
      {/* Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0A192F 0%, #0D2137 60%, #1D4ED8 100%)',
        borderRadius: '24px',
        padding: '3rem 2.5rem',
        color: '#FFFFFF',
        marginBottom: '2.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          background: 'rgba(245, 158, 11, 0.2)',
          border: '1px solid #F59E0B',
          borderRadius: '9999px',
          padding: '0.3rem 0.75rem',
          fontSize: '0.78rem',
          fontWeight: 700,
          color: '#F59E0B',
          marginBottom: '1rem',
        }}>
          <ShieldCheck size={14} />
          <span>AUTHORIZED FACILITATOR & CITIZEN ASSISTANCE</span>
        </div>

        <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 900, marginBottom: '0.75rem', color: '#FFFFFF' }}>
          {language === 'hi' ? 'सरकारी एवं नागरिक सहायता सेवाएँ' : 'Government & Citizen Services'}
        </h1>
        <p style={{ fontSize: '1rem', color: '#CBD5E1', maxWidth: '680px', lineHeight: 1.6, marginBottom: '1.5rem' }}>
          Professional assisted online filing, form submissions, appointment bookings, and status tracking for Aadhaar, PAN, Passport, Income & Domicile certificates, and Welfare schemes.
        </p>

        {/* Statutory Notice */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '0.85rem 1.25rem',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          fontSize: '0.78rem',
          color: '#E2E8F0',
          maxWidth: '750px',
        }}>
          <AlertTriangle size={18} color="#F59E0B" style={{ flexShrink: 0 }} />
          <span>
            <strong>Statutory Transparency:</strong> Akul Dravin Digital Services provides technical guidance and assisted application facilitation. We are not a government body. All statutory decisions and approvals belong solely to the respective competent government authorities.
          </span>
        </div>
      </div>

      {/* Direct Studio Quick Launch Toolbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        flexWrap: 'wrap',
        marginBottom: '1.5rem',
        background: '#F8FAFC',
        padding: '0.75rem 1rem',
        borderRadius: '12px',
        border: '1px solid #E2E8F0',
        fontSize: '0.82rem'
      }}>
        <span style={{ fontWeight: 800, color: '#0A192F', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Sparkles size={16} color="#F59E0B" />
          <span>Direct Access Engines:</span>
        </span>
        <Link
          to="/pan"
          style={{
            background: '#1D4ED8',
            color: '#FFFFFF',
            padding: '0.35rem 0.75rem',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            boxShadow: '0 2px 6px rgba(29, 78, 216, 0.2)'
          }}
        >
          <CreditCard size={14} />
          <span>PAN Card Form 49A Studio (UTIITSL / Protean)</span>
        </Link>
        <Link
          to="/digitalseva"
          style={{
            background: '#047857',
            color: '#FFFFFF',
            padding: '0.35rem 0.75rem',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
        >
          <Landmark size={14} />
          <span>ADCS Operator Console (VLE)</span>
        </Link>
        <Link
          to="/documents"
          style={{
            background: '#FFFFFF',
            color: '#334155',
            border: '1px solid #CBD5E1',
            padding: '0.35rem 0.75rem',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
        >
          <FileText size={14} />
          <span>Customer DigiLocker Vault</span>
        </Link>
        <Link
          to="/track"
          style={{
            background: '#FFFFFF',
            color: '#334155',
            border: '1px solid #CBD5E1',
            padding: '0.35rem 0.75rem',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
        >
          <Search size={14} />
          <span>Track Application Status</span>
        </Link>
      </div>

      {/* Subcategory Filter Tabs & Search */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2rem',
      }}>
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
          {[
            { id: 'all', label: 'All Citizen Services' },
            { id: 'identity', label: 'Identity & IDs (PAN, Passport)' },
            { id: 'certificates', label: 'Certificates (Income, Caste, Domicile)' },
            { id: 'employment', label: 'Employment & Welfare (E-Shram)' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedSubCat(tab.id as any)}
              style={{
                padding: '0.6rem 1.1rem',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '0.85rem',
                background: selectedSubCat === tab.id ? '#1D4ED8' : '#FFFFFF',
                color: selectedSubCat === tab.id ? '#FFFFFF' : '#475569',
                border: selectedSubCat === tab.id ? '1px solid #1D4ED8' : '1px solid #CBD5E1',
                boxShadow: selectedSubCat === tab.id ? '0 4px 12px rgba(29, 78, 216, 0.25)' : 'none',
                transition: 'all 0.15s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: '#FFFFFF',
          padding: '0.5rem 0.95rem',
          borderRadius: '10px',
          border: '1px solid #CBD5E1',
          width: '280px',
        }}>
          <Search size={16} color="#64748B" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search citizen services..."
            style={{ border: 'none', outline: 'none', fontSize: '0.85rem', width: '100%' }}
          />
        </div>
      </div>

      {/* INTERACTIVE CITIZEN SCHEME & SUBSIDY RECOMMENDER */}
      <div style={{
        background: 'linear-gradient(135deg, #090E17 0%, #111C30 100%)',
        borderRadius: '20px',
        padding: '2rem',
        marginBottom: '2.5rem',
        border: '1px solid rgba(245, 158, 11, 0.3)',
        color: '#FFFFFF',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{ background: '#F59E0B', padding: '0.5rem', borderRadius: '10px' }}>
            <Sparkles size={22} color="#0A192F" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
              {language === 'hi' ? 'स्मार्ट सरकारी योजना एवं सब्सिडी कैलकुलेटर' : 'Smart Citizen Welfare & Subsidy Matcher'}
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#94A3B8', margin: 0 }}>
              {language === 'hi' 
                ? 'अपनी श्रेणी चुनें और देखें कि आप किन-किन सरकारी लाभों के पात्र हैं।' 
                : 'Select your profile and income bracket to discover direct government financial assistance & welfare schemes.'}
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ fontSize: '0.78rem', color: '#CBD5E1', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
              {language === 'hi' ? 'नागरिक श्रेणी' : 'Citizen Category'}
            </label>
            <select
              value={citizenProfile}
              onChange={(e) => setCitizenProfile(e.target.value as any)}
              style={{
                width: '100%',
                background: '#1E293B',
                color: '#FFFFFF',
                border: '1px solid #334155',
                padding: '0.6rem 0.8rem',
                borderRadius: '8px',
                fontSize: '0.85rem'
              }}
            >
              <option value="farmer">किसान (Farmer / Landholder)</option>
              <option value="worker">श्रमिक / असंगठित कामगार (Daily Wage / Unorganized)</option>
              <option value="women">महिला / परिवार प्रमुख (Women / SHG Member)</option>
              <option value="student">विद्यार्थी (Student / Youth)</option>
              <option value="general">सामान्य नागरिक (General Citizen)</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', color: '#CBD5E1', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
              {language === 'hi' ? 'वार्षिक पारिवारिक आय' : 'Annual Household Income'}
            </label>
            <select
              value={incomeRange}
              onChange={(e) => setIncomeRange(e.target.value as any)}
              style={{
                width: '100%',
                background: '#1E293B',
                color: '#FFFFFF',
                border: '1px solid #334155',
                padding: '0.6rem 0.8rem',
                borderRadius: '8px',
                fontSize: '0.85rem'
              }}
            >
              <option value="bpl">₹2.5 लाख से कम (BPL / EWS Eligibility)</option>
              <option value="middle">₹2.5 लाख से ₹8 लाख (Middle Income Group)</option>
              <option value="higher">₹8 लाख से अधिक (Standard Citizen)</option>
            </select>
          </div>
        </div>

        {/* Dynamic Matched Benefits Badge Grid */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          padding: '1rem 1.25rem',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {language === 'hi' ? 'पात्र सरकारी योजनाएं एवं आर्थिक लाभ:' : 'Eligible Central & State Welfare Benefits:'}
            </div>
            <button
              onClick={handleDownloadEligibilityChecklist}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: '#F59E0B',
                color: '#0A192F',
                border: 'none',
                borderRadius: '8px',
                padding: '0.4rem 0.85rem',
                fontSize: '0.76rem',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              <Download size={13} /> Download Eligibility Checklist (.txt)
            </button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {getMatchedSchemes().map((scheme, idx) => (
              <span
                key={idx}
                style={{
                  background: scheme.bg,
                  color: scheme.color,
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 600
                }}
              >
                {scheme.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length > 0 ? (
        <div className="grid-3" style={{ gap: '1.5rem', marginBottom: '3rem' }}>
          {filteredServices.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      ) : (
        <div style={{
          background: '#F8FAFC',
          border: '1px dashed #CBD5E1',
          borderRadius: '16px',
          padding: '2.5rem',
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0A192F', marginBottom: '0.4rem' }}>
            No matching citizen services found
          </div>
          <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1rem' }}>
            Try clearing your search filter or switch to "All Citizen Services" to view every assisted government desk.
          </p>
          <button
            onClick={() => {
              setSelectedSubCat('all');
              setSearchQuery('');
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: '#1D4ED8',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <RotateCcw size={14} /> Reset Filters
          </button>
        </div>
      )}

      {/* Authorized Official Government Portals & State e-District Directory */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        padding: '2rem',
        border: '1px solid #E2E8F0',
        marginBottom: '2.5rem',
        boxShadow: '0 4px 16px rgba(10, 25, 47, 0.04)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <span className="badge badge-blue" style={{ marginBottom: '0.4rem' }}>STATUTORY TRANSPARENCY DIRECTORY</span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0A192F' }}>
              {language === 'hi' ? 'अधिकृत सरकारी एवं राज्य ई-डिस्ट्रिक्ट पोर्टल लिंक' : 'Authorized National & State e-District Official Portals'}
            </h3>
          </div>
          <span style={{ fontSize: '0.76rem', color: '#047857', fontWeight: 700, background: '#ECFDF5', padding: '0.35rem 0.75rem', borderRadius: '999px', border: '1px solid #A7F3D0' }}>
            Zero OTP / CAPTCHA Bypass • Direct Citizen Handoff
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem', marginBottom: '1.5rem' }}>
          {[
            { name: 'UTIITSL PAN Portal', desc: 'Form 49A / CSF Coupon Filing', url: 'https://www.pan.utiitsl.com/' },
            { name: 'Protean (NSDL) eGov PAN', desc: 'Online New PAN & Reprint', url: 'https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html' },
            { name: 'Passport Seva (MEA)', desc: 'Fresh / Tatkal & PSK Slots', url: 'https://www.passportindia.gov.in/' },
            { name: 'myAadhaar (UIDAI)', desc: 'PVC Card & Address Update', url: 'https://myaadhaar.uidai.gov.in/' },
            { name: 'Voters’ Service Portal (ECI)', desc: 'Form 6/8 & e-EPIC Download', url: 'https://voters.eci.gov.in/' },
            { name: 'Parivahan Sewa (MoRTH)', desc: 'Driving License & Vehicle RC', url: 'https://parivahan.gov.in/' },
            { name: 'e-Shram National Portal', desc: 'Unorganized Worker UAN Card', url: 'https://eshram.gov.in/' },
            { name: 'NHA Ayushman Bharat', desc: 'PM-JAY ₹5L Health Card KYC', url: 'https://beneficiary.nha.gov.in/' },
            { name: 'myScheme Official Finder', desc: 'Central & State Scheme Eligibility', url: 'https://www.myscheme.gov.in/' },
            { name: 'PM-KISAN Samman Nidhi', desc: 'Farmer DBT Status & e-KYC', url: 'https://pmkisan.gov.in/' },
            { name: 'National Scholarship (NSP)', desc: 'Pre/Post Matric & Merit Aid', url: 'https://scholarships.gov.in/' },
            { name: 'UMANG Citizen Portal', desc: 'Unified Central/State Services', url: 'https://web.umang.gov.in/' },
          ].map((portal, i) => (
            <a
              key={i}
              href={portal.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.85rem 1rem',
                borderRadius: '12px',
                border: '1px solid #E2E8F0',
                background: '#F8FAFC',
                textDecoration: 'none',
                transition: 'all 0.15s ease',
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.86rem', color: '#0A192F' }}>{portal.name}</div>
                <div style={{ fontSize: '0.73rem', color: '#64748B' }}>{portal.desc}</div>
              </div>
              <ExternalLink size={15} color="#1D4ED8" />
            </a>
          ))}
        </div>

        <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1rem' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '0.6rem' }}>
            State Revenue / e-District Portals (Income, Caste, Domicile):
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {Object.entries(STATE_EDISTRICT_PORTALS).map(([st, info]) => (
              <a
                key={st}
                href={info.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  color: '#1D4ED8',
                  background: '#EFF6FF',
                  border: '1px solid #BFDBFE',
                  padding: '0.3rem 0.65rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                }}
              >
                <span>{st}: {info.name}</span>
                <ExternalLink size={11} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* SLA & Process Explanation Strip */}
      <div style={{
        background: '#F8FAFC',
        borderRadius: '20px',
        padding: '2.5rem',
        border: '1px solid #E2E8F0',
      }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0A192F', marginBottom: '1.5rem', textAlign: 'center' }}>
          Standard Citizen Assistance Lifecycle
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
        }}>
          {[
            { step: '01', title: 'Document Verification', desc: 'Quantum AI scans documents for clarity and consistency before submission.' },
            { step: '02', title: 'Portal Application Filing', desc: 'Experienced digital executives submit forms on official government portals.' },
            { step: '03', title: 'Appointment & Biometrics', desc: 'Guidance and slot booking for physical biometric capture where required.' },
            { step: '04', title: 'Delivery & Archival', desc: 'Issued certificates delivered digitally to your encrypted Customer Vault.' },
          ].map((item, idx) => (
            <div key={idx} style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#F59E0B', marginBottom: '0.4rem' }}>{item.step}</div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0A192F', marginBottom: '0.25rem' }}>{item.title}</div>
              <p style={{ fontSize: '0.82rem', color: '#64748B', lineHeight: 1.45 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
