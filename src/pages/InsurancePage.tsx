import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
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
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const InsurancePage: React.FC = () => {
  const { services, showToast, logAudit, language } = useApp();
  const [activeType, setActiveType] = useState<'health' | 'term' | 'motor' | 'shop'>('health');
  const [proposerAge, setProposerAge] = useState(32);
  const [sumInsured, setSumInsured] = useState('₹10 Lakhs');
  const [issuedPolicy, setIssuedPolicy] = useState<any | null>(null);

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

  const handleBuyPolicy = (quote: any) => {
    const policyNum = 'AD-POL-' + Math.floor(100000 + Math.random() * 900000);
    setIssuedPolicy({
      policyNumber: policyNum,
      insurer: quote.insurer,
      plan: quote.plan,
      premium: quote.premium,
      sumInsured,
    });
    logAudit(`Insurance Policy Bound: ${policyNum}`, `${quote.insurer} (${quote.plan})`);
    showToast('Insurance Proposal Accepted!', `Policy ${policyNum} issued and saved to Document Vault.`, 'success');
    confetti({ particleCount: 75, spread: 60 });
  };

  return (
    <div className="container-wide" style={{ padding: '2.5rem 1.5rem 4rem' }}>
      {/* Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0A192F 0%, #0D2137 60%, #1D4ED8 100%)',
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
              background: activeType === t.id ? '#1D4ED8' : '#FFFFFF',
              color: activeType === t.id ? '#FFFFFF' : '#475569',
              border: '1px solid',
              borderColor: activeType === t.id ? '#1D4ED8' : '#CBD5E1',
              transition: 'all 0.15s',
            }}
          >
            {t.icon}
            <span>{t.label}</span>
          </button>
        ))}
      </div>

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

          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0A192F', marginBottom: '0.25rem' }}>
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
              <span style={{ fontWeight: 800, color: '#1D4ED8' }}>{issuedPolicy.policyNumber}</span>
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
              <span style={{ fontWeight: 800, color: '#0A192F' }}>₹{issuedPolicy.premium.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <button
            onClick={() => setIssuedPolicy(null)}
            className="btn-secondary"
          >
            Compare More Plans
          </button>
        </div>
      ) : (
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0A192F', marginBottom: '1.25rem' }}>
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
                    <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0A192F' }}>{q.insurer}</span>
                    <span className="badge badge-gold">{q.tag}</span>
                  </div>
                  <div style={{ fontSize: '0.88rem', color: '#1D4ED8', fontWeight: 600 }}>
                    {q.plan}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '0.25rem' }}>
                    {q.highlight}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Annual Premium</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0A192F' }}>
                      ₹{q.premium.toLocaleString('en-IN')}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: '#059669' }}>Includes 18% GST</div>
                  </div>

                  <button
                    onClick={() => handleBuyPolicy(q)}
                    className="btn-gold"
                    style={{ fontWeight: 800 }}
                  >
                    <span>Instant Proposal</span>
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
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0A192F' }}>
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
    </div>
  );
};
