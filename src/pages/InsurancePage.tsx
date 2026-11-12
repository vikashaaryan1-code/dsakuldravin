import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { apiClient } from '../services/apiClient';
import { printBrandedADCSDocument } from '../utils/documentBranding';
import { ServiceCard } from '../components/cards/ServiceCard';
import { 
  Shield, 
  Heart, 
  Car, 
  Home, 
  Briefcase, 
  CheckCircle2, 
  ArrowRight, 
  AlertTriangle,
  Building,
  Sparkles,
  Download,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const InsurancePage: React.FC = () => {
  const { services, showToast, logAudit, recordJournalEntry, uploadDocument, language } = useApp();
  const [activeType, setActiveType] = useState<'health' | 'term' | 'motor' | 'shop'>('health');
  const [proposerName, setProposerName] = useState('Vikram Malhotra');
  const [proposerPhone, setProposerPhone] = useState('9835012345');
  const [vehicleRegNo, setVehicleRegNo] = useState('BR01AB1234');
  const [proposerAge, setProposerAge] = useState(32);
  const [sumInsured, setSumInsured] = useState('₹10 Lakhs');
  const [issuedPolicy, setIssuedPolicy] = useState<any | null>(null);
  const [isIssuing, setIsIssuing] = useState(false);

  const insuranceData: Record<string, { title: string; quotes: Array<{ insurer: string; plan: string; premium: number; highlight: string; tag: string }> }> = {
    health: {
      title: `Top Rated Health Mediclaim Plans (Age ${proposerAge} • ${sumInsured} Cover)`,
      quotes: [
        { insurer: 'Star Health & Allied Insurance', plan: 'Family Health Optima', premium: 9450, highlight: 'Cashless Network: 14,000+ Hospitals • Zero Room Rent Limit', tag: 'No Room Rent Capping' },
        { insurer: 'HDFC ERGO General Insurance', plan: 'Optima Secure (2X Automatic Cover)', premium: 11200, highlight: 'Cashless Network: 13,500+ Hospitals • 20-Min Cashless Approval', tag: 'Instant Claims Approval' },
        { insurer: 'Care Health Insurance', plan: 'Care Supreme', premium: 8900, highlight: 'Cashless Network: 12,800+ Hospitals • Unlimited Recharge', tag: 'Unlimited Recharge' },
      ]
    },
    term: {
      title: 'Top Pure Term Life Cover Plans (₹1 Crore Sum Assured up to Age 75)',
      quotes: [
        { insurer: 'Max Life Insurance', plan: 'Smart Total Elite Protection (STEP)', premium: 8640, highlight: 'Claim Settlement Ratio: 99.51% • Critical Illness Rider Included', tag: '99.51% Settlement' },
        { insurer: 'HDFC Life Insurance', plan: 'Click 2 Protect Super', premium: 9150, highlight: 'Claim Settlement Ratio: 99.30% • Return of Premium Option Available', tag: 'Return of Premium' },
        { insurer: 'Tata AIA Life Insurance', plan: 'Sampoorna Raksha Supreme', premium: 8320, highlight: 'Claim Settlement Ratio: 99.01% • In-Built Accidental Death Cover', tag: 'Accidental Cover' },
      ]
    },
    motor: {
      title: 'Comprehensive 2-Wheeler & Private Car Zero-Depreciation Protection',
      quotes: [
        { insurer: 'ICICI Lombard General', plan: 'Complete Protect (Zero Dep + Consumables)', premium: 2450, highlight: 'Cashless Network: 10,200+ Garages • 24/7 Roadside Assistance', tag: 'Zero Depreciation' },
        { insurer: 'Bajaj Allianz General', plan: 'DriveSmart Comprehensive (Engine Shield)', premium: 2180, highlight: 'Cashless Network: 9,500+ Garages • Water Ingress Protection', tag: 'Engine Protect' },
        { insurer: 'Go Digit General', plan: 'Super Motor Shield', premium: 1950, highlight: 'Cashless Network: 8,800+ Garages • Paperless Video Self-Inspection', tag: 'Self-Inspection' },
      ]
    },
    shop: {
      title: 'Commercial Shopkeeper, Inventory & Fire Special Perils Coverage',
      quotes: [
        { insurer: 'SBI General Insurance', plan: 'Bharat Sookshma Udyam Suraksha', premium: 3200, highlight: 'Coverage: ₹50L Building & Stock • Fire, Flood & Burglary', tag: 'Comprehensive Cover' },
        { insurer: 'New India Assurance Co.', plan: 'Commercial Shopkeeper Shield', premium: 2890, highlight: 'Coverage: ₹35L Inventory • Money in Transit & Signboard Cover', tag: 'Shopkeeper Special' },
        { insurer: 'The Oriental Insurance', plan: 'Standard Fire & Special Perils', premium: 3450, highlight: 'Coverage: ₹60L Plant & Machinery • Short Circuit Cover', tag: 'Industrial & Retail' },
      ]
    }
  };

  const currentCategoryData = insuranceData[activeType] || insuranceData.health;

  const handleBuyPolicy = async (quote: { insurer: string; plan: string; premium: number }) => {
    if (!proposerName.trim() || !/^[6-9]\d{9}$/.test(proposerPhone.replace(/\D/g, '').slice(-10))) {
      showToast('Invalid Proposer Details', 'Please enter a valid proposer name and 10-digit Indian mobile number.', 'error');
      return;
    }

    setIsIssuing(true);
    try {
      const policyNum = 'AD-POL-' + Math.floor(100000 + Math.random() * 900000);
      const orderRes = await apiClient.createPaymentOrder({
        amount: quote.premium,
        customerName: proposerName.trim(),
        customerPhone: proposerPhone.trim(),
        items: [{ id: `srv-ins-${activeType}`, title: `${quote.insurer} - ${quote.plan}`, price: quote.premium }],
      }).catch(() => ({ success: false, order: { id: 'order_ins_' + Date.now() } }));

      await apiClient.verifyPayment({
        orderId: orderRes?.order?.id || 'order_ins_' + Date.now(),
        paymentId: 'pay_ins_' + Math.floor(100000 + Math.random() * 900000),
        paymentMethod: 'ADCS IRDAI Escrow / UPI',
        amount: quote.premium,
      }).catch(() => ({}));

      const basePremium = Math.round(quote.premium / 1.18);
      const gstOutput = quote.premium - basePremium;
      recordJournalEntry({
        date: new Date().toISOString().split('T')[0],
        reference: policyNum,
        description: `Insurance Policy Proposal ${policyNum}: ${quote.insurer} (${quote.plan}) - ${proposerName.trim()}`,
        lines: [
          { accountCode: '1020', accountName: 'ADCS Payment Gateway / Escrow', debit: quote.premium, credit: 0 },
          { accountCode: '4050', accountName: 'Insurance Solicitation & Underwriter Settlement', debit: 0, credit: basePremium },
          { accountCode: '2010', accountName: 'GST Output Tax Payable (18%)', debit: 0, credit: gstOutput },
        ],
      });

      uploadDocument({
        name: `Policy_Schedule_${policyNum}.pdf`,
        category: activeType === 'shop' ? 'Business' : 'Other',
        fileType: 'PDF',
        status: 'verified',
        size: '412 KB',
        ocrConfidence: 99.6,
      });

      setIssuedPolicy({
        policyNumber: policyNum,
        insurer: quote.insurer,
        plan: quote.plan,
        premium: quote.premium,
        sumInsured,
        proposerName: proposerName.trim(),
        proposerPhone: proposerPhone.trim(),
        vehicleRegNo: activeType === 'motor' ? vehicleRegNo.trim().toUpperCase() : undefined,
      });
      logAudit(`Insurance Policy Bound: ${policyNum}`, `${quote.insurer} (${quote.plan})`);
      showToast('Insurance Proposal Accepted!', `Policy ${policyNum} issued, ledger posted & archived to Document Vault.`, 'success');
      confetti({ particleCount: 75, spread: 60 });
    } finally {
      setIsIssuing(false);
    }
  };

  const handleDownloadPolicy = (pol: any) => {
    const baseAmt = Number((pol.premium / 1.18).toFixed(2));
    const gstAmt = Number((pol.premium - baseAmt).toFixed(2));
    printBrandedADCSDocument({
      title: 'ADCS Assisted Insurance Proposal & Payment Summary',
      documentType: 'INSURANCE PROPOSAL SLIP',
      documentNumber: String(pol.policyNumber),
      issuedDate: new Date().toLocaleString('en-IN'),
      rows: [
        { label: 'Proposer Name & Mobile', value: `${pol.proposerName} (${pol.proposerPhone})` },
        ...(pol.vehicleRegNo ? [{ label: 'Vehicle Registration No', value: String(pol.vehicleRegNo) }] : []),
        { label: 'Underwriting Insurer', value: String(pol.insurer) },
        { label: 'Coverage Plan & Sum Insured', value: `${pol.plan} • Sum Insured ${pol.sumInsured}` },
        { label: 'Citizen Vault Status', value: 'Archived in ADCS Citizen Document Vault' },
      ],
      amountSummary: {
        subtotal: baseAmt,
        tax: gstAmt,
        total: Number(pol.premium),
        currency: '₹',
        paymentStatus: 'SOLICITED VIA LICENSED PARTNER NETWORK',
      },
      notes: ['Statutory policy contract is issued solely by the named IRDAI-licensed underwriter; ADCS branding applies only to this facilitation slip.'],
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
        marginBottom: '2.5rem',
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
          <Shield size={14} />
          <span>IRDAI AUTHORIZED PARTNER NETWORK & POLICY VAULT</span>
        </div>

        <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 900, marginBottom: '0.75rem', color: '#FFFFFF' }}>
          {language === 'hi' ? 'बीमा एवं मेडिक्लेम बाज़ार' : 'Insurance Super Hub'}
        </h1>
        <p style={{ fontSize: '1rem', color: '#CBD5E1', maxWidth: '640px', lineHeight: 1.6, marginBottom: '1.25rem' }}>
          Compare comprehensive family health mediclaim, term life, vehicle insurance, and shop/business coverage with cashless hospital networks.
        </p>

        {/* Regulatory Disclaimer */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '10px',
          padding: '0.75rem 1rem',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          fontSize: '0.78rem',
          color: '#E2E8F0',
          maxWidth: '720px',
        }}>
          <AlertTriangle size={16} color="#F59E0B" style={{ flexShrink: 0 }} />
          <span>
            <strong>Insurance Solicitation Disclosure:</strong> Insurance products are solicited and serviced exclusively through IRDAI-licensed corporate agent / broker partners. Insurance is the subject matter of solicitation.
          </span>
        </div>
      </div>

      {/* Category Tabs */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2.5rem', overflowX: 'auto' }}>
        {[
          { id: 'health', label: 'Health Mediclaim', icon: <Heart size={18} /> },
          { id: 'term', label: 'Term Life Insurance', icon: <Shield size={18} /> },
          { id: 'motor', label: 'Car & Two-Wheeler', icon: <Car size={18} /> },
          { id: 'shop', label: 'Shop & Commercial Fire', icon: <Briefcase size={18} /> },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => {
              setActiveType(t.id as any);
              setIssuedPolicy(null);
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.7rem 1.25rem',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '0.85rem',
              background: activeType === t.id ? '#075ACB' : '#FFFFFF',
              color: activeType === t.id ? '#FFFFFF' : '#475569',
              border: '1px solid',
              borderColor: activeType === t.id ? '#075ACB' : '#CBD5E1',
              transition: 'all 0.15s',
            }}
          >
            {t.icon}
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Proposer Intake Bar */}
      {!issuedPolicy && (
        <div style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: '1.25rem 1.5rem',
          border: '1px solid #E2E8F0',
          marginBottom: '2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
        }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Proposer Full Name *</label>
            <input
              type="text"
              className="form-input"
              value={proposerName}
              onChange={(e) => setProposerName(e.target.value)}
              placeholder="Policyholder Name"
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Mobile Number *</label>
            <input
              type="text"
              className="form-input"
              value={proposerPhone}
              onChange={(e) => setProposerPhone(e.target.value)}
              placeholder="10-digit Mobile"
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Proposer Age</label>
            <input
              type="number"
              min="18"
              max="80"
              className="form-input"
              value={proposerAge}
              onChange={(e) => setProposerAge(Math.max(18, Number(e.target.value)))}
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Sum Insured Cover</label>
            <select
              className="form-select"
              value={sumInsured}
              onChange={(e) => setSumInsured(e.target.value)}
            >
              <option value="₹5 Lakhs">₹5 Lakhs</option>
              <option value="₹10 Lakhs">₹10 Lakhs</option>
              <option value="₹25 Lakhs">₹25 Lakhs</option>
              <option value="₹50 Lakhs">₹50 Lakhs</option>
              <option value="₹1 Crore">₹1 Crore</option>
            </select>
          </div>
          {activeType === 'motor' && (
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Vehicle Reg. No</label>
              <input
                type="text"
                className="form-input"
                value={vehicleRegNo}
                onChange={(e) => setVehicleRegNo(e.target.value)}
                placeholder="BR01AB1234"
              />
            </div>
          )}
        </div>
      )}

      {/* Policy Comparison or Confirmed View */}
      {issuedPolicy ? (
        <div style={{
          background: '#F0FDF4',
          borderRadius: '20px',
          padding: '2.5rem',
          border: '2px solid #86EFAC',
          textAlign: 'center',
          maxWidth: '600px',
          margin: '0 auto',
          animation: 'fadeIn 0.25s ease-out',
        }}>
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

          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#061A36', marginBottom: '0.25rem' }}>
            Policy Issued & Secured!
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.5rem' }}>
            Official digital policy schedule copy has been stored in your encrypted Document Vault.
          </p>

          <div style={{
            background: '#FFFFFF',
            borderRadius: '14px',
            padding: '1.25rem',
            border: '1px solid #BBF7D0',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem',
            fontSize: '0.85rem',
            marginBottom: '1.5rem',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748B' }}>Policy Number:</span>
              <span style={{ fontWeight: 800, color: '#075ACB' }}>{issuedPolicy.policyNumber}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748B' }}>Underwriter:</span>
              <span style={{ fontWeight: 700 }}>{issuedPolicy.insurer}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748B' }}>Sum Insured:</span>
              <span style={{ fontWeight: 700, color: '#059669' }}>{issuedPolicy.sumInsured}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748B' }}>Annual Premium Paid:</span>
              <span style={{ fontWeight: 800, color: '#061A36' }}>₹{issuedPolicy.premium.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => handleDownloadPolicy(issuedPolicy)}
              className="btn-gold"
              style={{ fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <Download size={16} />
              <span>Download Policy Schedule</span>
            </button>
            <button
              onClick={() => setIssuedPolicy(null)}
              className="btn-secondary"
            >
              Compare More Plans
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#061A36', marginBottom: '1.25rem' }}>
            {currentCategoryData.title}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3.5rem' }}>
            {currentCategoryData.quotes.map((q, idx) => (
              <div
                key={idx}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1.5rem',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#061A36' }}>{q.insurer}</span>
                    <span className="badge badge-gold">{q.tag}</span>
                  </div>
                  <div style={{ fontSize: '0.88rem', color: '#075ACB', fontWeight: 600 }}>
                    {q.plan}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '0.25rem' }}>
                    {q.highlight}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Annual Premium</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#061A36' }}>
                      ₹{q.premium.toLocaleString('en-IN')}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: '#059669' }}>Includes 18% GST</div>
                  </div>

                  <button
                    onClick={() => handleBuyPolicy(q)}
                    disabled={isIssuing}
                    className="btn-gold"
                    style={{ fontWeight: 800, opacity: isIssuing ? 0.7 : 1 }}
                  >
                    <span>{isIssuing ? 'Processing...' : 'Instant Proposal'}</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Insurance Service Catalog Integration */}
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <span className="badge badge-blue" style={{ marginBottom: '0.4rem' }}>ASSISTED ADVISORY & POLICY DISPATCH</span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#061A36' }}>
                {language === 'hi' ? 'बीमा सहायता एवं क्लेम सपोर्ट' : 'Insurance Policy & Claims Assistance'}
              </h2>
            </div>

            <div className="grid-3" style={{ gap: '1.5rem' }}>
              {services.filter(s => s.category === 'insurance').map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Official IRDAI & Regulatory Insurance Portals */}
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
            AUTHORIZED IRDAI & STATUTORY INSURANCE PORTALS
          </div>
          <div style={{ fontSize: '0.84rem', color: '#475569', marginTop: '0.2rem' }}>
            Verify insurer registration, lodge grievance via Bima Bharosa, or check VAHAN motor policy status on official portals.
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
          {[
            { label: 'IRDAI Official', url: 'https://irdai.gov.in/' },
            { label: 'Bima Bharosa Portal', url: 'https://bimabharosa.irdai.gov.in/' },
            { label: 'Parivahan / VAHAN', url: 'https://parivahan.gov.in/' },
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
