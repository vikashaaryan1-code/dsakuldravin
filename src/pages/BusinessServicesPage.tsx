import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { ServiceCard } from '../components/cards/ServiceCard';
import { 
  Briefcase, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Building, 
  Receipt, 
  Award, 
  Key, 
  Scale, 
  TrendingUp, 
  Sparkles,
  FileCheck2,
  ExternalLink
} from 'lucide-react';

export const BusinessServicesPage: React.FC = () => {
  const { services, openApplyModal, language } = useApp();
  const [activeTab, setActiveTab] = useState<'incorporation' | 'tax' | 'intellectual' | 'compliance'>('incorporation');

  const businessServices = services.filter(s => s.category === 'business');

  const comparisonTiers = [
    {
      name: 'Sole Proprietorship',
      bestFor: 'Individual Traders & Small Shops',
      timeline: '2 - 3 Days',
      price: '₹1,499',
      features: ['MSME / Udyam Certificate', 'GST Registration', 'Current Bank Account Letter', 'Zero Annual ROC Filings'],
      slug: 'udyam-registration',
    },
    {
      name: 'Private Limited Company',
      bestFor: 'Startups & Scalable Ventures',
      timeline: '7 - 10 Days',
      price: '₹6,999',
      isPopular: true,
      features: ['2 Director DINs & Digital Signatures', 'Name Approval & MOA/AOA', 'PAN, TAN, EPFO & ESIC', 'Eligible for Angel / VC Funding'],
      slug: 'pvt-ltd-incorporation',
    },
    {
      name: 'Limited Liability Partnership (LLP)',
      bestFor: 'Professional Firms & Consultancies',
      timeline: '5 - 7 Days',
      price: '₹4,999',
      features: ['2 DPINs & Class 3 DSC', 'LLP Agreement Drafting', 'Limited Liability Protection', 'Lower ROC Compliance Burden'],
      slug: 'llp-incorporation',
    },
    {
      name: 'One Person Company (OPC)',
      bestFor: 'Solo Entrepreneurs wanting Pvt Ltd status',
      timeline: '7 - 10 Days',
      price: '₹5,999',
      features: ['1 Director + 1 Nominee', 'Separate Legal Entity', 'Corporate Identity Number', 'Seamless Conversion to Pvt Ltd'],
      slug: 'opc-incorporation',
    }
  ];

  return (
    <div className="container-wide" style={{ padding: '2.5rem 1.5rem 4rem' }}>
      {/* Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0A192F 0%, #0D2137 60%, #1D4ED8 100%)',
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
          <Briefcase size={14} />
          <span>CORPORATE COMPLIANCE & LEGAL ACCELERATION</span>
        </div>

        <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 900, marginBottom: '0.75rem', color: '#FFFFFF' }}>
          {language === 'hi' ? 'कंपनी रजिस्ट्रेशन एवं बिज़नेस समाधान' : 'Business Setup & Compliance'}
        </h1>
        <p style={{ fontSize: '1rem', color: '#CBD5E1', maxWidth: '640px', lineHeight: 1.6 }}>
          End-to-end corporate registration (Pvt Ltd, LLP, OPC), GST registration & monthly filings, MSME Udyam, Class 3 DSC, Trademark protection, and full-stack accounting.
        </p>
      </div>

      {/* COMPARISON TIERS (Section 12) */}
      <div style={{ marginBottom: '4rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="badge badge-gold">INCORPORATION MATRIX</span>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0A192F', marginTop: '0.4rem' }}>
            Choose Your Business Entity Structure
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#64748B', maxWidth: '580px', margin: '0.4rem auto 0' }}>
            Compare legal structures, compliance liabilities, and investor readiness.
          </p>
        </div>

        <div className="grid-4" style={{ gap: '1.25rem' }}>
          {comparisonTiers.map((tier, idx) => (
            <div
              key={idx}
              style={{
                background: '#FFFFFF',
                borderRadius: '18px',
                padding: '1.75rem',
                border: tier.isPopular ? '2px solid #1D4ED8' : '1px solid #E2E8F0',
                boxShadow: tier.isPopular ? '0 12px 30px rgba(29, 78, 216, 0.12)' : '0 4px 16px rgba(0,0,0,0.04)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {tier.isPopular && (
                <span className="badge badge-blue" style={{ position: 'absolute', top: '-12px', right: '1.5rem' }}>
                  Most Recommended
                </span>
              )}

              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0A192F', marginBottom: '0.25rem' }}>
                  {tier.name}
                </h3>
                <div style={{ fontSize: '0.78rem', color: '#64748B', marginBottom: '1.25rem' }}>
                  {tier.bestFor}
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0A192F' }}>
                    {tier.price}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>
                    Timeline: {tier.timeline}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
                  {tier.features.map((feat, fIdx) => (
                    <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: '#334155' }}>
                      <CheckCircle2 size={15} color="#059669" style={{ flexShrink: 0 }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  const srv = services.find(s => s.slug === tier.slug) || services[0];
                  openApplyModal(srv);
                }}
                className={tier.isPopular ? 'btn-primary' : 'btn-secondary'}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>Incorporate Now</span>
                <ArrowRight size={15} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ALL BUSINESS SERVICES CATALOG */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <span className="badge badge-blue">ALL BUSINESS VERTICALS</span>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0A192F', marginTop: '0.25rem' }}>
              Full-Stack Business Setup & Filings
            </h2>
          </div>
        </div>

        <div className="grid-3" style={{ gap: '1.5rem' }}>
          {businessServices.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>

      {/* Authorized Statutory Corporate & Tax Registration Portals */}
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
          <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#1D4ED8', textTransform: 'uppercase' }}>
            AUTHORIZED CORPORATE, TAX & FOOD LICENSE PORTALS (MCA V3 / GSTN / FSSAI / UDYAM)
          </div>
          <div style={{ fontSize: '0.84rem', color: '#475569', marginTop: '0.2rem' }}>
            Direct official portal links for company name reservation (SPICe+), GSTIN search, FoSCoS food licensing, and Udyam certificate verification.
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
          {[
            { label: 'MCA V3 Portal', url: 'https://www.mca.gov.in/' },
            { label: 'GST Portal (GSTN)', url: 'https://www.gst.gov.in/' },
            { label: 'FSSAI FoSCoS', url: 'https://foscos.fssai.gov.in/' },
            { label: 'Udyam MSME Registration', url: 'https://udyamregistration.gov.in/' },
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
