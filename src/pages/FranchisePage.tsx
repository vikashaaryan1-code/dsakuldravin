import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { printBrandedADCSDocument } from '../utils/documentBranding';
import { 
  Building, 
  Award, 
  TrendingUp, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  DollarSign,
  Sparkles,
  Users,
  Download,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const FranchisePage: React.FC = () => {
  const { showToast, logAudit, submitApplication, addLead, language } = useApp();

  // Calculator State
  const [dailyFootfall, setDailyFootfall] = useState<number>(50); // 50 customers/day
  const [avgTicketCommission, setAvgTicketCommission] = useState<number>(95); // ₹95/tx
  const monthlyRevenue = dailyFootfall * avgTicketCommission * 26; // 26 working days
  const estimatedNetProfit = Math.round(monthlyRevenue * 0.72); // ~72% margin after basic internet/power

  // Application Form State
  const [selectedTier, setSelectedTier] = useState('Gold Business Hub');
  const [applicantName, setApplicantName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Bihar');
  const [pincode, setPincode] = useState('');
  const [shopArea, setShopArea] = useState('150 - 300 sq.ft');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const franchiseTiers = [
    {
      tier: 'Silver Digital Center',
      investment: '₹49,000',
      invNum: 49000,
      bestFor: 'Existing Cyber Cafes & Photostat Shops',
      features: ['150+ Citizen & Seva Services', 'Akul Dravin Authorized Center Glow-Sign Board', 'VLE POS Portal with Instant Wallet', 'Basic Biometric Device & Scanner Training'],
    },
    {
      tier: 'Gold Business Hub',
      investment: '₹1,25,000',
      invNum: 125000,
      bestFor: 'Town Market Commercial Shops (200+ sq.ft)',
      isPopular: true,
      features: ['All Citizen + Business + GST + Loans Services', 'Full Store Branding & Acrylic Interior Kit', 'Courier Booking Hub & Scale Integration', 'Dedicated Regional Relationship Officer'],
    },
    {
      tier: 'Platinum Master Territory',
      investment: '₹3,50,000',
      invNum: 350000,
      bestFor: 'District Headquarter Operators / Mini Franchisors',
      features: ['Exclusive Pincode / Tehsil Rights', 'Override Royalty on Sub-VLE Transactions', 'CCTV & Turnkey Construction Master Franchise', 'Co-branded Field Marketing Vehicle Campaigns'],
    }
  ];

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    if (!applicantName.trim() || !/^[6-9]\d{9}$/.test(cleanPhone)) {
      showToast('Invalid Contact Details', 'Please enter full applicant name and a valid 10-digit mobile number.', 'error');
      return;
    }
    if (!/^[1-9][0-9]{5}$/.test(pincode.trim())) {
      showToast('Invalid PIN Code', 'Please enter a valid 6-digit Indian PIN code for territory clearance.', 'error');
      return;
    }

    const tierObj = franchiseTiers.find(t => t.tier === selectedTier) || franchiseTiers[1];
    const appId = submitApplication({
      serviceId: 'srv-franchise-license',
      serviceName: `Franchise License: ${selectedTier}`,
      category: 'business',
      applicantName: applicantName.trim(),
      applicantPhone: `+91 ${cleanPhone}`,
      city: city.trim() || 'Patna',
      state,
      feePaid: 0,
      documentsUploaded: ['Shop_Agreement_Premises.pdf'],
      notes: `Tier: ${selectedTier}, PIN: ${pincode.trim()}, Area: ${shopArea}, Est Profit: ₹${estimatedNetProfit.toLocaleString('en-IN')}/mo`,
    });

    addLead({
      name: applicantName.trim(),
      company: `${selectedTier} — ${city} (${pincode.trim()})`,
      email: 'franchise.desk@akuldravindigital.com',
      phone: `+91 ${cleanPhone}`,
      serviceInterested: `${selectedTier} Territory License`,
      estimatedValue: tierObj.invNum,
      stage: 'Proposal',
      assignedExecutive: 'ADCS Franchise Expansion Desk',
    });

    setSubmittedRef(appId);
    confetti({ particleCount: 90, spread: 60 });
    logAudit(`Franchise Application Submitted (${appId}): ${applicantName}`, `Tier: ${selectedTier}, City: ${city}, PIN: ${pincode}`);
    showToast('Franchise Application Received!', `Tracking ID ${appId} logged for PIN ${pincode} territory clearance.`, 'success');
  };

  const handleDownloadProposal = () => {
    if (!submittedRef) return;
    printBrandedADCSDocument({
      title: 'ADCS Authorized Franchise Territory Application Slip',
      documentType: 'FRANCHISE APPLICATION',
      documentNumber: submittedRef,
      issuedDate: new Date().toLocaleString('en-IN'),
      rows: [
        { label: 'Applicant Name', value: applicantName },
        { label: 'Registered Mobile (WhatsApp)', value: phone },
        { label: 'Selected Franchise Model', value: selectedTier },
        { label: 'Proposed Territory', value: `${city}, ${state} — PIN ${pincode}` },
        { label: 'Center Carpet Area', value: shopArea },
        { label: 'Scenario Projection Note', value: `Illustrative Scenario: ₹${estimatedNetProfit.toLocaleString('en-IN')}/mo (${dailyFootfall} walk-ins/day)` },
      ],
      notes: [
        'Territorial allotment is subject to formal premise inspection and KYC clearance by Akul Dravin Digital Services.',
      ],
      verificationUrl: `${typeof window !== 'undefined' ? window.location.origin : 'https://akuldravindigital.com'}/track?id=${encodeURIComponent(submittedRef)}`,
    });
  };

  return (
    <div className="container-wide" style={{ padding: '2.5rem 1.5rem 4rem' }}>
      {/* Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #061A36 0%, #031126 60%, #075ACB 100%)',
        borderRadius: '24px',
        padding: '3rem 2.5rem',
        color: '#FFFFFF',
        marginBottom: '3rem',
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
          <Award size={14} />
          <span>FRANCHISE PARTNERSHIP OPPORTUNITY</span>
        </div>

        <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 900, marginBottom: '0.75rem', color: '#FFFFFF' }}>
          {language === 'hi' ? 'अकुल द्राविन डिजिटल फ्रैंचाइज़ी नेटवर्क' : 'Franchise Super Network'}
        </h1>
        <p style={{ fontSize: '1rem', color: '#CBD5E1', maxWidth: '640px', lineHeight: 1.6 }}>
          Own a high-margin digital business center in your city or town. Deliver 150+ essential digital, financial, legal, courier, and technical services with proven technology.
        </p>
      </div>

      {/* INTERACTIVE EARNINGS ESTIMATOR */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '2.5rem',
        border: '1.5px solid #FDE68A',
        boxShadow: '0 8px 30px rgba(245, 158, 11, 0.1)',
        marginBottom: '3.5rem',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span className="badge badge-gold">PROFIT ESTIMATOR</span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#061A36', marginTop: '0.4rem' }}>
            Calculate Your Branch Monthly Earnings
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#64748B' }}>
            Adjust daily customer walk-ins to project potential revenue and take-home profits.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '2.5rem',
          alignItems: 'center',
        }} className="hero-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span className="form-label">Estimated Daily Center Walk-ins:</span>
                <span style={{ fontWeight: 800, color: '#075ACB', fontSize: '1.1rem' }}>
                  {dailyFootfall} Customers / Day
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="250"
                step="5"
                value={dailyFootfall}
                onChange={(e) => setDailyFootfall(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#075ACB' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748B' }}>
                <span>10 (Village/Town)</span>
                <span>100 (Market)</span>
                <span>250+ (City Hub)</span>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span className="form-label">Average Commission & Service Margin per Transaction:</span>
                <span style={{ fontWeight: 800, color: '#D97706', fontSize: '1.1rem' }}>
                  ₹{avgTicketCommission}
                </span>
              </div>
              <input
                type="range"
                min="30"
                max="300"
                step="5"
                value={avgTicketCommission}
                onChange={(e) => setAvgTicketCommission(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#D97706' }}
              />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #061A36 0%, #031126 100%)',
            borderRadius: '20px',
            padding: '2rem',
            color: '#FFFFFF',
            border: '1px solid rgba(245, 158, 11, 0.4)',
          }}>
            <div style={{ fontSize: '0.78rem', color: '#F59E0B', fontWeight: 700, textTransform: 'uppercase' }}>
              PROJECTED MONTHLY NET PROFIT:
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#FFFFFF', margin: '0.2rem 0 1.25rem' }}>
              ₹{estimatedNetProfit.toLocaleString('en-IN')}
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem',
              padding: '1rem 0',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              marginBottom: '1.5rem',
              fontSize: '0.82rem',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94A3B8' }}>Gross Service Revenue:</span>
                <span style={{ fontWeight: 700 }}>₹{monthlyRevenue.toLocaleString('en-IN')} / mo</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94A3B8' }}>Working Days:</span>
                <span style={{ fontWeight: 700 }}>26 Days / Month</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94A3B8' }}>Payback Period:</span>
                <span style={{ fontWeight: 700, color: '#10B981' }}>2 to 4 Months</span>
              </div>
            </div>

            <a href="#apply-form" className="btn-gold" style={{ width: '100%', textAlign: 'center', fontWeight: 800 }}>
              Apply for Branch License
            </a>
          </div>
        </div>
      </div>

      {/* FRANCHISE TIERS */}
      <div style={{ marginBottom: '4rem' }}>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#061A36', marginBottom: '1.5rem', textAlign: 'center' }}>
          Franchise Investment Packages
        </h3>

        <div className="grid-3" style={{ gap: '1.5rem' }}>
          {franchiseTiers.map((t, idx) => (
            <div
              key={idx}
              style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                padding: '2rem',
                border: t.isPopular ? '2px solid #075ACB' : '1px solid #E2E8F0',
                boxShadow: t.isPopular ? '0 12px 30px rgba(29, 78, 216, 0.12)' : '0 4px 16px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
              }}
            >
              {t.isPopular && (
                <span className="badge badge-blue" style={{ position: 'absolute', top: '-12px', right: '1.5rem' }}>
                  Most Recommended
                </span>
              )}

              <div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#061A36', marginBottom: '0.25rem' }}>{t.tier}</h4>
                <div style={{ fontSize: '0.78rem', color: '#64748B', marginBottom: '1.25rem' }}>{t.bestFor}</div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '2rem', fontWeight: 900, color: '#061A36' }}>{t.investment}</span>
                  <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>One-time setup fee + GST</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
                  {t.features.map((f, fIdx) => (
                    <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: '#334155' }}>
                      <CheckCircle2 size={15} color="#059669" style={{ flexShrink: 0 }} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="#apply-form"
                onClick={() => setSelectedTier(t.tier)}
                className={t.isPopular ? 'btn-gold' : 'btn-primary'}
                style={{ textAlign: 'center', fontWeight: 800 }}
              >
                Select {t.tier.split(' ')[0]}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* FRANCHISE APPLICATION FORM */}
      <div id="apply-form" style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '2.5rem',
        border: '1px solid #E2E8F0',
        maxWidth: '720px',
        margin: '0 auto',
        boxShadow: '0 8px 30px rgba(0,0,0,0.05)',
      }}>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#061A36', marginBottom: '0.5rem', textAlign: 'center' }}>
          Apply for Akul Dravin Digital Branch
        </h3>
        <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.75rem', textAlign: 'center' }}>
          Fill in your location details for preliminary territory pin-code clearance.
        </p>

        {submittedRef ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: '#DCFCE7',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
            }}>
              <CheckCircle2 size={36} />
            </div>
            <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#061A36' }}>
              Application Successfully Submitted!
            </h4>
            <p style={{ fontSize: '0.88rem', color: '#475569', marginTop: '0.4rem', marginBottom: '1.25rem' }}>
              Tracking Reference: <strong style={{ color: '#075ACB' }}>{submittedRef}</strong> ({selectedTier} • PIN {pincode}).
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={handleDownloadProposal} className="btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontWeight: 800 }}>
                <Download size={15} />
                <span>Download Dossier</span>
              </button>
              <Link to={`/track?id=${encodeURIComponent(submittedRef)}`} className="btn-primary" style={{ textDecoration: 'none' }}>
                Track Approval Status
              </Link>
              <button onClick={() => setSubmittedRef(null)} className="btn-secondary">
                New Inquiry
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleApply} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label">Selected Franchise Package</label>
              <select className="form-select" value={selectedTier} onChange={(e) => setSelectedTier(e.target.value)}>
                {franchiseTiers.map(t => (
                  <option key={t.tier} value={t.tier}>{t.tier} ({t.investment})</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Full Name of Branch Applicant *</label>
              <input
                type="text"
                required
                className="form-input"
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                placeholder="e.g. Rakesh Ranjan"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Mobile Number (WhatsApp) *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 XXXXX"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Proposed PIN Code *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="e.g. 800001"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">State</label>
                <select className="form-select" value={state} onChange={(e) => setState(e.target.value)}>
                  <option value="Bihar">Bihar</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Maharashtra">Maharashtra</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">City / Town *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Patna"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Available Commercial Carpet Area</label>
              <select className="form-select" value={shopArea} onChange={(e) => setShopArea(e.target.value)}>
                <option value="100 - 200 sq.ft">100 - 200 sq.ft (Counter / Cyber Booth)</option>
                <option value="200 - 500 sq.ft">200 - 500 sq.ft (Full Service Business Hub)</option>
                <option value="500+ sq.ft">500+ sq.ft (Master District Office)</option>
              </select>
            </div>

            <button type="submit" className="btn-gold btn-lg" style={{ fontWeight: 800 }}>
              Submit Branch License Application
            </button>
          </form>
        )}
      </div>

      {/* Authorized CSC / MSME / Startup India Partner Ecosystem Portals */}
      <div style={{
        marginTop: '3rem',
        background: '#F8FAFC',
        borderRadius: '18px',
        padding: '1.5rem 2rem',
        border: '1px solid #E2E8F0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div>
          <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#075ACB', textTransform: 'uppercase' }}>
            AUTHORIZED DIGITAL KENDRA, MSME & STARTUP ECOSYSTEM PORTALS
          </div>
          <div style={{ fontSize: '0.84rem', color: '#475569', marginTop: '0.2rem' }}>
            Official portals for CSC Digital Seva registration, MSME Udyam licensing, and Startup India recognition.
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
          {[
            { label: 'Digital Seva CSC', url: 'https://digitalseva.csc.gov.in/' },
            { label: 'Udyam MSME Registration', url: 'https://udyamregistration.gov.in/' },
            { label: 'Startup India Portal', url: 'https://www.startupindia.gov.in/' },
          ].map(p => (
            <a
              key={p.label}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none' }}
            >
              <span>{p.label}</span>
              <ExternalLink size={13} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
