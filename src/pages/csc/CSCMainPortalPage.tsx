import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  FileText, 
  UserPlus, 
  ArrowRight, 
  Search, 
  Globe, 
  Smartphone, 
  Award, 
  BookOpen, 
  CreditCard,
  Sparkles,
  ExternalLink,
  Laptop
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../store/AppContext';

export const CSCMainPortalPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast, logAudit } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'schemes' | 'register' | 'locate'>('overview');

  // VLE Registration Form State
  const [tecNumber, setTecNumber] = useState('TEC-2024-90218');
  const [vleName, setVleName] = useState('Dr. Akul Dravin');
  const [vleMobile, setVleMobile] = useState('9876543210');
  const [vleEmail, setVleEmail] = useState('akul.dravin@example.com');
  const [vleState, setVleState] = useState('Bihar');
  const [vleDistrict, setVleDistrict] = useState('Patna');
  const [centerAddress, setCenterAddress] = useState('Shop No. 12, Main Market, Danapur');
  const [regResult, setRegResult] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Center Locator State
  const [searchDistrict, setSearchDistrict] = useState('Patna');
  const [searchPincode, setSearchPincode] = useState('800001');

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tecNumber || !vleMobile) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:5000/api/csc/register-vle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tecNumber,
          name: vleName,
          mobile: vleMobile,
          email: vleEmail,
          state: vleState,
          district: vleDistrict,
          centerAddress
        })
      }).then(r => r.json()).catch(() => null);

      const generated = res?.registration || {
        refNumber: 'VLE-REG-2026-' + Math.floor(10000 + Math.random() * 90000),
        status: 'SUBMITTED',
        stage: 'Under District Manager Verification',
        submittedAt: new Date().toISOString()
      };

      setRegResult(generated);
      showToast('VLE Application Filed', `Reference No: ${generated.refNumber} generated. Under DM verification.`, 'success');
      logAudit('CSC VLE Registration', `Submitted application with TEC: ${tecNumber} for ${vleName}`);
      confetti({ particleCount: 80, spread: 60 });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* 1. National Tricolor Government Strip */}
      <div style={{ height: '4px', background: 'linear-gradient(to right, #FF9933 33%, #FFFFFF 33%, #FFFFFF 66%, #138808 66%)' }} />

      {/* 2. Official CSC Header */}
      <header style={{ background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '0.8rem 2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ width: '48px', height: '48px', background: '#16A34A', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: 900, fontSize: '1.4rem' }}>
              CSC
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.25rem', color: '#0F172A', letterSpacing: '0.01em' }}>
                COMMON SERVICES CENTERS
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                Digital India • Ministry of Electronics & IT • Government of India
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => navigate('/connect/csc')}
              style={{
                background: '#16A34A',
                color: '#FFFFFF',
                border: 'none',
                padding: '0.55rem 1.25rem',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: '0 4px 12px rgba(22, 163, 74, 0.25)'
              }}
            >
              CSC Connect Login ➔
            </button>

            <button
              onClick={() => navigate('/digitalseva')}
              style={{
                background: '#0F172A',
                color: '#FFFFFF',
                border: 'none',
                padding: '0.55rem 1.25rem',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              Digital Seva Portal
            </button>
          </div>
        </div>
      </header>

      {/* 3. Sub-Navigation */}
      <nav style={{ background: '#0F172A', color: '#FFFFFF', padding: '0 2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', gap: '1rem' }}>
          {[
            { id: 'overview', label: 'Ecosystem Overview' },
            { id: 'schemes', label: 'National Schemes (DigiPay, PMGDisha)' },
            { id: 'register', label: 'VLE Registration (register.csc.gov.in)' },
            { id: 'locate', label: 'Locate Nearest CSC Kendra' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.id ? '3px solid #16A34A' : '3px solid transparent',
                color: activeTab === tab.id ? '#34D399' : '#94A3B8',
                padding: '0.75rem 1rem',
                fontSize: '0.85rem',
                fontWeight: activeTab === tab.id ? 700 : 500,
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* 4. Main Content Area */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div>
            {/* Hero Banner */}
            <div style={{
              background: 'linear-gradient(135deg, #0A192F 0%, #172554 60%, #16A34A 100%)',
              color: '#FFFFFF',
              borderRadius: '20px',
              padding: '3rem 2.5rem',
              marginBottom: '2.5rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
            }}>
              <span style={{ background: '#16A34A', color: '#FFFFFF', fontSize: '0.72rem', fontWeight: 800, padding: '0.25rem 0.65rem', borderRadius: '4px', textTransform: 'uppercase' }}>
                Pan-India Digital Infrastructure
              </span>
              <h1 style={{ fontSize: '2.4rem', fontWeight: 900, margin: '0.75rem 0 0.5rem', lineHeight: 1.2 }}>
                Empowering Rural India Through Digital Seva Kendras
              </h1>
              <p style={{ fontSize: '1rem', color: '#CBD5E1', maxWidth: '750px', lineHeight: 1.6, margin: '0 0 1.75rem' }}>
                A strategic cornerstone of the Digital India programme. Access hundreds of Central and State government services, banking, insurance, telemedicine, and education at your doorstep.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => navigate('/connect/csc')}
                  style={{
                    background: '#FFFFFF',
                    color: '#0F172A',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '10px',
                    fontWeight: 800,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  Enter CSC Connect (OAuth SSO) <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => setActiveTab('register')}
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255,255,255,0.3)',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    cursor: 'pointer'
                  }}
                >
                  Apply for New VLE Kendra
                </button>
              </div>
            </div>

            {/* National Statistics Strip */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
              {[
                { label: 'Active CSC Kendras', val: '5,50,000+', desc: 'Across 28 States & 8 UTs' },
                { label: 'Gram Panchayats Covered', val: '2,50,000+', desc: '100% Rural Penetration' },
                { label: 'Monthly Financial GTV', val: '₹14,500 Cr+', desc: 'AEPS, BBPS & DBT Transfers' },
                { label: 'Women VLE Entrepreneurs', val: '85,000+', desc: 'Leading Rural Digital Economy' }
              ].map((stat, idx) => (
                <div key={idx} style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>{stat.label}</div>
                  <div style={{ fontSize: '1.7rem', fontWeight: 900, color: '#16A34A', margin: '0.3rem 0' }}>{stat.val}</div>
                  <div style={{ fontSize: '0.78rem', color: '#334155' }}>{stat.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SCHEMES TAB */}
        {activeTab === 'schemes' && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '1.5rem' }}>
              Flagship Government Schemes Operational on Digital Seva
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {[
                { title: 'DigiPay (AEPS & Micro-ATM)', desc: 'Biometric Aadhaar Enabled Payment System allowing cash deposit, cash withdrawal, and balance inquiry for all 54 commercial banks.', tag: 'Financial Inclusion', comm: 'Up to ₹15 per tx' },
                { title: 'Tele-Law: Access to Justice', desc: 'Connecting rural citizens with Panel Lawyers of the High Court & Supreme Court via video consultation through the nearest VLE center.', tag: 'Ministry of Law', comm: '₹30 per case' },
                { title: 'PMGDISHA (Digital Literacy)', desc: 'Pradhan Mantri Gramin Digital Saksharta Abhiyan training 6 crore rural households in computers, smartphones, and online banking.', tag: 'Education', comm: '₹300 per certified candidate' },
                { title: 'Ayushman Bharat PM-JAY', desc: 'Creation of 14-digit ABHA IDs and golden cards offering ₹5,00,000 per family per year for secondary and tertiary care hospitalization.', tag: 'Health', comm: '₹50 per issuance' },
                { title: 'PM Kisan Samman Nidhi', desc: 'Mandatory biometric eKYC, new farmer enrollment, and bank DBT seeding for ₹6,000 annual farmer assistance.', tag: 'Agriculture', comm: '₹50 per eKYC' },
                { title: 'CSC Grameen e-Store', desc: 'Hyperlocal e-commerce app connecting rural grocery shops, farmers, and self-help groups for doorstep delivery.', tag: 'E-Commerce', comm: 'Margin on product sale' }
              ].map((scheme, idx) => (
                <div key={idx} style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, background: '#DCFCE7', color: '#166534', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                      {scheme.tag}
                    </span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#16A34A' }}>
                      {scheme.comm}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.5rem' }}>
                    {scheme.title}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: '#64748B', lineHeight: 1.5, margin: '0 0 1rem' }}>
                    {scheme.desc}
                  </p>
                  <button
                    onClick={() => navigate('/digitalseva')}
                    style={{
                      background: '#F1F5F9',
                      border: '1px solid #CBD5E1',
                      padding: '0.45rem 0.9rem',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      color: '#0F172A',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    Launch on Digital Seva ➔
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* REGISTER VLE TAB */}
        {activeTab === 'register' && (
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <div style={{ background: '#FFFFFF', padding: '2rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 15px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ background: '#16A34A', color: '#FFFFFF', padding: '0.5rem', borderRadius: '10px' }}>
                  <FileText size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    VLE Registration (register.csc.gov.in)
                  </h2>
                  <p style={{ fontSize: '0.82rem', color: '#64748B', margin: 0 }}>
                    Official application for setting up an authorized Common Services Center
                  </p>
                </div>
              </div>

              {regResult ? (
                <div style={{ background: '#F0FDF4', border: '1.5px solid #86EFAC', borderRadius: '12px', padding: '1.75rem', textAlign: 'center' }}>
                  <div style={{ width: '56px', height: '56px', background: '#16A34A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                    <CheckCircle2 size={32} color="#FFFFFF" />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#166534', margin: '0 0 0.5rem' }}>
                    VLE Application Submitted Successfully!
                  </h3>
                  <div style={{ fontSize: '1rem', fontFamily: 'monospace', fontWeight: 800, color: '#0F172A', background: '#FFFFFF', padding: '0.65rem 1rem', borderRadius: '8px', border: '1px solid #CBD5E1', display: 'inline-block', margin: '0.5rem 0' }}>
                    Reference No: {regResult.refNumber}
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#475569', margin: '0.5rem 0 1.5rem' }}>
                    Status: <strong>{regResult.stage}</strong>. The District Manager will visit your shop premises for physical GPS verification within 7 working days.
                  </p>
                  <button
                    onClick={() => navigate('/connect/csc')}
                    style={{
                      background: '#16A34A',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '0.7rem 1.5rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Proceed to CSC Connect Login ➔
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRegisterSubmit}>
                  {/* Step 1: TEC Certificate */}
                  <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '10px', border: '1px solid #E2E8F0', marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.35rem' }}>
                      Telecentre Entrepreneur Course (TEC) Certificate Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={tecNumber}
                      onChange={(e) => setTecNumber(e.target.value)}
                      placeholder="e.g. TEC-2024-XXXXX"
                      style={{ width: '100%', padding: '0.65rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                    />
                    <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '0.3rem' }}>
                      Mandatory as per CSC SPV guidelines. Get certified at teccertificate.com.
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                        Applicant Name (As on Aadhaar) *
                      </label>
                      <input
                        type="text"
                        required
                        value={vleName}
                        onChange={(e) => setVleName(e.target.value)}
                        style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                        Mobile Number (Aadhaar Linked) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={vleMobile}
                        onChange={(e) => setVleMobile(e.target.value)}
                        style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                        State *
                      </label>
                      <input
                        type="text"
                        required
                        value={vleState}
                        onChange={(e) => setVleState(e.target.value)}
                        style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                        District *
                      </label>
                      <input
                        type="text"
                        required
                        value={vleDistrict}
                        onChange={(e) => setVleDistrict(e.target.value)}
                        style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                      Proposed CSC Kendra Shop Address (with Geotag Lat/Long) *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={centerAddress}
                      onChange={(e) => setCenterAddress(e.target.value)}
                      style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      background: '#16A34A',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      cursor: 'pointer'
                    }}
                  >
                    {isSubmitting ? 'Submitting Application...' : 'Submit VLE Registration Application ➔'}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* LOCATE KENDRA TAB */}
        {activeTab === 'locate' && (
          <div style={{ background: '#FFFFFF', padding: '2rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.5rem' }}>
              Locate Your Nearest Authorized CSC Kendra
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '0 0 1.5rem' }}>
              Search across 5,50,000+ certified VLE centers for biometric services, certificates, and DigiPay ATM cashouts.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <input
                type="text"
                value={searchDistrict}
                onChange={(e) => setSearchDistrict(e.target.value)}
                placeholder="Enter District (e.g. Patna)"
                style={{ flex: 1, minWidth: '200px', padding: '0.65rem 0.8rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
              />
              <input
                type="text"
                value={searchPincode}
                onChange={(e) => setSearchPincode(e.target.value)}
                placeholder="Enter 6-digit Pincode"
                maxLength={6}
                style={{ flex: 1, minWidth: '200px', padding: '0.65rem 0.8rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
              />
              <button
                style={{
                  background: '#0F172A',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '0.65rem 1.5rem',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Find Centers
              </button>
            </div>

            {/* Mock Center Results */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
              {[
                { name: 'Akul Dravin Digital Seva Kendra', id: '245089123456', vle: 'Rajesh Sharma', addr: 'Shop No. 12, Main Market, Danapur, Patna - 800001', dist: '0.4 km away', phone: '+91 98765 43210' },
                { name: 'Shree Balaji CSC Center', id: '245089998124', vle: 'Anand Verma', addr: 'Opposite Block Office, Bailey Road, Patna - 800014', dist: '1.8 km away', phone: '+91 98351 00221' },
                { name: 'Patna Gramin Seva Kendra', id: '245081124590', vle: 'Pooja Kumari', addr: 'Near State Bank, Saguna More, Patna - 801503', dist: '3.2 km away', phone: '+91 94310 88771' }
              ].map((c, idx) => (
                <div key={idx} style={{ background: '#F8FAFC', padding: '1.25rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#16A34A', background: '#DCFCE7', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                      Certified Active
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>{c.dist}</span>
                  </div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.25rem' }}>{c.name}</h4>
                  <div style={{ fontSize: '0.75rem', color: '#475569', marginBottom: '0.3rem' }}><strong>VLE:</strong> {c.vle} (ID: {c.id})</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', marginBottom: '0.5rem' }}>{c.addr}</div>
                  <div style={{ fontSize: '0.78rem', color: '#16A34A', fontWeight: 700 }}>📞 {c.phone}</div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
