import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { printBrandedADCSDocument } from '../utils/documentBranding';
import { UTRPaymentGate, UTRPaymentSubmission } from '../components/common/UTRPaymentGate';
import { ServiceBanners } from '../components/common/ServiceBanners';
import { PricingPlanItem } from '../types';
import {
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Download,
  ExternalLink,
  Crown,
  X,
  Lock,
} from 'lucide-react';

const PLAN_GROUP_TABS: { key: PricingPlanItem['targetGroup']; label: string; sub: string }[] = [
  { key: 'citizen_retailer', label: 'Citizen & Retailer', sub: 'Personal & Retail Desk' },
  { key: 'vle_rural', label: 'Rural VLE Kendra', sub: 'Panchayat Seva Tier' },
  { key: 'district_state', label: 'District / State / Main Head', sub: 'Digital Seva Command' },
  { key: 'cyber_franchise', label: 'Cyber Café & Franchise', sub: 'Local Center Suites' },
  { key: 'business_distributor', label: 'Distributor & Enterprise', sub: 'B2B, API & Territory' },
];

export const PricingPage: React.FC = () => {
  const {
    services,
    openApplyModal,
    language,
    pricingPlans,
    activeUserPlanId,
    activatePlanWithUtr,
    commissionRules,
  } = useApp();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [planGroup, setPlanGroup] = useState<PricingPlanItem['targetGroup']>('citizen_retailer');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [activatingPlan, setActivatingPlan] = useState<PricingPlanItem | null>(null);

  const visiblePlans = pricingPlans.filter((p) => p.targetGroup === planGroup);

  const filtered = services.filter(s => {
    const matchSearch = s.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === 'all' || s.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const handleDownloadTariffSchedule = () => {
    printBrandedADCSDocument({
      title: `Transparent Service Tariff Schedule (${selectedCategory.toUpperCase()})`,
      documentType: 'OFFICIAL TARIFF SCHEDULE',
      documentNumber: `TRF-${selectedCategory.toUpperCase()}`,
      issuedDate: new Date().toLocaleString('en-IN'),
      rows: filtered.slice(0, 40).map((s, idx) => ({
        label: `${String(idx + 1).padStart(2, '0')}. ${s.title}`,
        value: `[${s.category}] Govt: ₹${s.govtFee || 0} | Platform: ₹${s.professionalFee || s.basePrice} | Total: ${s.basePrice === 0 ? 'Free Consult' : `₹${s.basePrice}`} (${s.timeline})`,
      })),
      notes: [
        'Billing formula: Statutory Govt Fee + ADCS Professional Facilitation Fee + Applicable GST.',
      ],
    });
  };

  return (
    <div className="container-wide" style={{ padding: '2.5rem 1.5rem 4rem' }}>
      <div style={{
        background: 'linear-gradient(135deg, #061A36 0%, #031126 60%, #075ACB 100%)',
        borderRadius: '24px',
        padding: '3rem 2.5rem',
        color: '#FFFFFF',
        marginBottom: '2.5rem',
        textAlign: 'center',
      }}>
        <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>100% TRANSPARENCY</span>
        <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 900, marginBottom: '0.75rem', color: '#FFFFFF' }}>
          {language === 'hi' ? 'पारदर्शी सेवा शुल्क सूचकांक' : 'Transparent Pricing & Tariff Index'}
        </h1>
        <p style={{ fontSize: '1rem', color: '#CBD5E1', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
          Itemized government fees, professional consultation, and platform service charges. Zero hidden surcharges.
        </p>
      </div>

      {/* Multi-Service Campaign Banners */}
      <ServiceBanners sectorFilter="pricing" mode="strip" />

      {/* Multi-Tier & Role-Based Pricing Plans Matrix */}
      <section style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <span className="badge badge-gold" style={{ marginBottom: '0.35rem' }}>MULTI-ROLE &amp; HIERARCHY SUBSCRIPTION MATRIX</span>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#061A36', margin: 0 }}>
              Plans Tailored for Every Ecosystem Role &amp; Digital Seva Tier
            </h2>
          </div>
          <div style={{ display: 'inline-flex', background: '#E2E8F0', padding: '4px', borderRadius: '10px', gap: '4px' }}>
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              style={{
                padding: '0.45rem 0.9rem',
                borderRadius: '8px',
                border: 'none',
                background: billingCycle === 'monthly' ? '#075ACB' : 'transparent',
                color: billingCycle === 'monthly' ? '#fff' : '#334155',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
              }}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('annual')}
              style={{
                padding: '0.45rem 0.9rem',
                borderRadius: '8px',
                border: 'none',
                background: billingCycle === 'annual' ? '#075ACB' : 'transparent',
                color: billingCycle === 'annual' ? '#fff' : '#334155',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
              }}
            >
              Annual (Save up to 17%)
            </button>
          </div>
        </div>

        {/* Role / Tier Group Selector Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          {PLAN_GROUP_TABS.map((t) => {
            const active = planGroup === t.key;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setPlanGroup(t.key)}
                style={{
                  padding: '0.65rem 1rem',
                  borderRadius: '12px',
                  border: active ? '2px solid #075ACB' : '1px solid #CBD5E1',
                  background: active ? '#061A36' : '#FFFFFF',
                  color: active ? '#FFFFFF' : '#1E293B',
                  textAlign: 'left',
                  cursor: 'pointer',
                  minWidth: '175px',
                  flexShrink: 0,
                }}
              >
                <div style={{ fontSize: '0.82rem', fontWeight: 800 }}>{t.label}</div>
                <div style={{ fontSize: '0.7rem', color: active ? '#F3D477' : '#64748B' }}>{t.sub}</div>
              </button>
            );
          })}
        </div>

        {/* Plans Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {visiblePlans.map((plan) => {
            const price = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;
            const isCurrent = activeUserPlanId === plan.id;
            return (
              <div
                key={plan.id}
                style={{
                  background: plan.highlight ? 'linear-gradient(180deg, #061A36 0%, #0A254D 100%)' : '#FFFFFF',
                  color: plan.highlight ? '#FFFFFF' : '#061A36',
                  borderRadius: '18px',
                  padding: '1.5rem',
                  border: plan.highlight ? '2px solid #D6A12B' : '1px solid #DCE4EF',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: plan.highlight ? '0 14px 32px rgba(6,26,54,0.18)' : '0 4px 16px rgba(6,26,54,0.04)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        padding: '0.2rem 0.6rem',
                        borderRadius: '999px',
                        background: plan.highlight ? 'rgba(214,161,43,0.22)' : '#EFF6FF',
                        color: plan.highlight ? '#F3D477' : '#075ACB',
                      }}
                    >
                      {plan.tierBadge}
                    </span>
                    {isCurrent && (
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#10B981' }}>ACTIVE PLAN</span>
                    )}
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: plan.highlight ? '#FFFFFF' : '#061A36', margin: '0 0 0.2rem' }}>
                    {plan.name}
                  </h3>
                  <div style={{ fontSize: '0.76rem', color: plan.highlight ? '#CBD5E1' : '#64748B', marginBottom: '1rem' }}>
                    {plan.maxApplications}
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: plan.highlight ? '#F3D477' : '#075ACB', marginBottom: '1rem' }}>
                    {price === 0 ? '₹0' : `₹${price.toLocaleString('en-IN')}`}
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: plan.highlight ? '#CBD5E1' : '#64748B' }}>
                      /{billingCycle === 'annual' ? 'year' : 'month'}
                    </span>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.8rem' }}>
                    {plan.features.map((f, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem' }}>
                        <CheckCircle2 size={15} color={plan.highlight ? '#F3D477' : '#10B981'} style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => setActivatingPlan(plan)}
                  className={plan.highlight ? 'btn-gold' : 'btn-primary'}
                  style={{ width: '100%', padding: '0.7rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
                >
                  <Crown size={15} />
                  <span>{isCurrent ? 'Renew / Upgrade with UTR' : 'Activate via UTR & Txn ID'}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Read-Only Admin-Set Commission Slab Summary */}
        <div style={{ marginTop: '1.5rem', background: '#FFFFFF', borderRadius: '16px', padding: '1.25rem', border: '1px solid #DCE4EF' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <div style={{ fontWeight: 800, color: '#061A36', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Lock size={15} color="#075ACB" /> Live Network Commission Entitlements (Configured Exclusively by Super Admin)
            </div>
            <span className="badge badge-blue">Read-Only Rate Schedule</span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', color: '#475569', textAlign: 'left', borderBottom: '1px solid #E2E8F0' }}>
                  <th style={{ padding: '0.5rem 0.7rem' }}>Sector Vertical</th>
                  <th style={{ padding: '0.5rem 0.7rem' }}>Rural VLE</th>
                  <th style={{ padding: '0.5rem 0.7rem' }}>District Mgr</th>
                  <th style={{ padding: '0.5rem 0.7rem' }}>State Head</th>
                  <th style={{ padding: '0.5rem 0.7rem' }}>Main Head</th>
                  <th style={{ padding: '0.5rem 0.7rem' }}>Distributor</th>
                  <th style={{ padding: '0.5rem 0.7rem' }}>Franchise</th>
                  <th style={{ padding: '0.5rem 0.7rem' }}>Flat Bonus</th>
                </tr>
              </thead>
              <tbody>
                {commissionRules.map((c) => (
                  <tr key={c.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '0.5rem 0.7rem', fontWeight: 700, color: '#061A36' }}>{c.serviceTitle}</td>
                    <td style={{ padding: '0.5rem 0.7rem', color: '#047857', fontWeight: 700 }}>{c.ruralVlePct}%</td>
                    <td style={{ padding: '0.5rem 0.7rem' }}>{c.districtMgrPct}%</td>
                    <td style={{ padding: '0.5rem 0.7rem' }}>{c.stateHeadPct}%</td>
                    <td style={{ padding: '0.5rem 0.7rem' }}>{c.mainHeadPct}%</td>
                    <td style={{ padding: '0.5rem 0.7rem' }}>{c.distributorPct}%</td>
                    <td style={{ padding: '0.5rem 0.7rem' }}>{c.franchisePct}%</td>
                    <td style={{ padding: '0.5rem 0.7rem', fontWeight: 700 }}>₹{c.flatBonusInr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing Formula Callout (Section 37) */}
      <div style={{
        background: '#EFF6FF',
        borderRadius: '16px',
        padding: '1.25rem 1.75rem',
        border: '1px solid #BFDBFE',
        marginBottom: '2.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Sparkles size={22} color="#075ACB" />
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#061A36' }}>
              Universal Pricing Formula Engine
            </div>
            <div style={{ fontSize: '0.8rem', color: '#1E40AF', marginTop: '0.1rem' }}>
              Base Fee + Statutory Government Fee + Professional Fee + Tax (GST) - Discount = Final Price
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          <span className="badge badge-blue">ITC Input Tax Credit Applicable</span>
          <a
            href="https://www.gst.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.35rem 0.7rem',
              borderRadius: '8px',
              border: '1px solid #93C5FD',
              background: '#FFFFFF',
              color: '#075ACB',
              fontSize: '0.75rem',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            <span>GSTN Portal</span>
            <ExternalLink size={12} />
          </a>
          <button
            type="button"
            onClick={handleDownloadTariffSchedule}
            className="btn-primary btn-sm"
            style={{ gap: '0.35rem' }}
          >
            <Download size={13} />
            <span>Print / Export Tariff (PDF)</span>
          </button>
        </div>
      </div>

      {/* Search and Category Filter */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2rem',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: '#FFFFFF',
          padding: '0.55rem 1rem',
          borderRadius: '10px',
          border: '1px solid #CBD5E1',
          width: '320px',
        }}>
          <Search size={16} color="#64748B" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search price for any service..."
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.85rem' }}
          />
        </div>

        <select
          className="form-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ width: 'auto', padding: '0.55rem 1rem' }}
        >
          <option value="all">All Sectors ({services.length})</option>
          <option value="government">Government Services</option>
          <option value="business">Business &amp; Incorporation</option>
          <option value="documents">Document &amp; Drafting Studio</option>
          <option value="bills">BBPS Utility Bills</option>
          <option value="travel">Travel &amp; Rail Desk</option>
          <option value="cyber-cafe">Cyber Café &amp; Xerox</option>
          <option value="property">Property Marketplace</option>
          <option value="rental">Rental &amp; HRA Agreements</option>
          <option value="construction">Construction &amp; BOQ</option>
          <option value="cctv">CCTV &amp; Hardware</option>
          <option value="courier">Courier &amp; Logistics</option>
          <option value="finance">Loans &amp; Credit Desk</option>
          <option value="insurance">Insurance POSP</option>
          <option value="website-it">IT &amp; Software</option>
          <option value="consulting">Consulting &amp; Advisory</option>
        </select>
      </div>

      {/* Pricing Data Table */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid #E2E8F0',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '1rem 1.5rem' }}>Service Offering</th>
                <th style={{ padding: '1rem' }}>Category</th>
                <th style={{ padding: '1rem' }}>Govt / Portal Fee</th>
                <th style={{ padding: '1rem' }}>Platform Fee</th>
                <th style={{ padding: '1rem' }}>Total Starting Fee</th>
                <th style={{ padding: '1rem' }}>SLA Timeline</th>
                <th style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr
                  key={s.id}
                  style={{ borderBottom: '1px solid #F1F5F9', transition: 'background 0.1s' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFC'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ fontWeight: 700, color: '#061A36' }}>{s.title}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{s.requiredDocs.length} Verification Documents</div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span className="badge badge-gray" style={{ textTransform: 'capitalize' }}>
                      {s.category.replace('-', ' ')}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', color: '#64748B' }}>
                    {s.govtFee && s.govtFee > 0 ? `₹${s.govtFee}` : '₹0 (Included)'}
                  </td>
                  <td style={{ padding: '1rem', color: '#64748B' }}>
                    ₹{s.professionalFee || s.basePrice}
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 800, color: '#061A36', fontSize: '0.98rem' }}>
                    {s.basePrice === 0 ? 'Free Consultation' : `₹${s.basePrice.toLocaleString('en-IN')}`}
                  </td>
                  <td style={{ padding: '1rem', color: '#475569', fontSize: '0.82rem' }}>
                    <Clock size={13} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle', color: '#D97706' }} />
                    {s.timeline}
                  </td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    <button
                      onClick={() => openApplyModal(s)}
                      className="btn-primary btn-sm"
                    >
                      <span>Apply</span>
                      <ArrowRight size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Plan Activation UTR & Transaction ID Modal */}
      {activatingPlan && (
        <div
          onClick={() => setActivatingPlan(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(3, 17, 38, 0.78)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              maxWidth: '520px',
              width: '100%',
              maxHeight: '92vh',
              overflowY: 'auto',
              padding: '1.5rem',
              border: '1px solid #DCE4EF',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#075ACB' }}>PLAN ACTIVATION &amp; UTR PROOF</div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#061A36', margin: 0 }}>{activatingPlan.name}</h3>
              </div>
              <button type="button" onClick={() => setActivatingPlan(null)} style={{ background: '#F1F5F9', border: 'none', borderRadius: '999px', padding: '0.4rem', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>
            <UTRPaymentGate
              amount={billingCycle === 'annual' ? activatingPlan.priceAnnual : activatingPlan.priceMonthly}
              serviceTitle={`${activatingPlan.name} (${billingCycle.toUpperCase()})`}
              ctaLabel="Verify UTR & Activate Plan"
              cancelLabel="Cancel"
              onCancel={() => setActivatingPlan(null)}
              onVerifiedSubmit={(proof: UTRPaymentSubmission) => {
                activatePlanWithUtr(activatingPlan.id, proof.utrNumber, proof.transactionId, proof.paymentMethod);
                setActivatingPlan(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
