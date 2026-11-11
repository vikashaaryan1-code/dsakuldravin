import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { ServiceCard } from '../components/cards/ServiceCard';
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
  Calculator
} from 'lucide-react';

export const GovernmentServicesPage: React.FC = () => {
  const { services, language } = useApp();
  const [selectedSubCat, setSelectedSubCat] = useState<'all' | 'identity' | 'certificates' | 'employment' | 'welfare'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Interactive Scheme Matcher State
  const [citizenProfile, setCitizenProfile] = useState<'farmer' | 'worker' | 'women' | 'student' | 'general'>('farmer');
  const [incomeRange, setIncomeRange] = useState<'bpl' | 'middle' | 'higher'>('bpl');

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
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.6rem' }}>
            {language === 'hi' ? 'पात्र सरकारी योजनाएं एवं आर्थिक लाभ:' : 'Eligible Central & State Welfare Benefits:'}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {citizenProfile === 'farmer' && (
              <>
                <span style={{ background: '#064E3B', color: '#6EE7B7', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}>
                  ✓ PM Kisan Samman Nidhi (₹6,000/वर्ष DBT)
                </span>
                <span style={{ background: '#064E3B', color: '#6EE7B7', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}>
                  ✓ PM Fasal Bima Yojana (फसल नुकसान बीमा)
                </span>
              </>
            )}
            {citizenProfile === 'worker' && (
              <>
                <span style={{ background: '#1E3A8A', color: '#93C5FD', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}>
                  ✓ E-Shram Accident Cover (₹2,00,000 बीमा)
                </span>
                <span style={{ background: '#1E3A8A', color: '#93C5FD', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}>
                  ✓ PM Shram Yogi Maandhan (₹3,000/माह पेंशन)
                </span>
              </>
            )}
            {citizenProfile === 'women' && (
              <>
                <span style={{ background: '#701A75', color: '#F472B6', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}>
                  ✓ Sukanya Samriddhi Yojana (8.2% ब्याज दर)
                </span>
                <span style={{ background: '#701A75', color: '#F472B6', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}>
                  ✓ PM Ujjwala 2.0 (मुफ्त गैस कनेक्शन)
                </span>
              </>
            )}
            {incomeRange === 'bpl' && (
              <>
                <span style={{ background: '#14532D', color: '#86EFAC', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}>
                  ✓ Ayushman Bharat ABHA (₹5,00,000 मुफ्त इलाज)
                </span>
                <span style={{ background: '#14532D', color: '#86EFAC', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}>
                  ✓ NFSA राशन कार्ड (मुफ्त खाद्यान्न योजना)
                </span>
              </>
            )}
            <span style={{ background: '#374151', color: '#E5E7EB', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}>
              ✓ DigiLocker सुरक्षित डिजिटल दस्तावेज वॉल्ट
            </span>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid-3" style={{ gap: '1.5rem', marginBottom: '3rem' }}>
        {filteredServices.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
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
