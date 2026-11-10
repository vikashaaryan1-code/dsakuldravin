import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { ServiceCard } from '../components/cards/ServiceCard';
import { 
  Code2, 
  Globe, 
  Server, 
  Mail, 
  Smartphone, 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const WebsiteITPage: React.FC = () => {
  const { services, addToCart, showToast, language } = useApp();
  const [domainSearch, setDomainSearch] = useState('');
  const [domainAvailable, setDomainAvailable] = useState<boolean | null>(null);

  const itPackages = [
    {
      title: 'Business Starter Web Package',
      price: 4999,
      period: 'One-time setup',
      features: ['5-Page Responsive Web Design', 'Custom .in / .com Domain (1 Yr)', 'Free SSL Certificate', '5 Corporate Business Emails', 'Google Business Profile Setup'],
      isPopular: true,
    },
    {
      title: 'E-Commerce Super Store',
      price: 14999,
      period: 'One-time setup',
      features: ['Unlimited Products & Categories', 'Payment Gateway (Razorpay/UPI)', 'Automated GST Invoicing', 'Integrated Courier & Pincode Check', 'Mobile App PWA Ready'],
    },
    {
      title: 'Enterprise Custom SaaS / ERP',
      price: 29999,
      period: 'Base architecture',
      features: ['Role-Based Multi-User Portals', 'Integrated CRM & HRMS Modules', 'PostgreSQL Cloud Database', 'Quantum AI Copilot Integration', 'Annual Maintenance & Updates'],
    }
  ];

  const handleDomainCheck = () => {
    if (!domainSearch) return;
    setDomainAvailable(true);
    showToast('Domain Available!', `${domainSearch}.in is available for registration at ₹599/yr.`, 'success');
  };

  const handleSelectPackage = (pkg: typeof itPackages[0]) => {
    addToCart({
      id: 'it-pkg-' + Date.now(),
      title: pkg.title,
      titleHi: pkg.title,
      category: 'website-it',
      description: pkg.features.join(', '),
      descriptionHi: 'वेबसाइट, डोमेन, होस्टिंग एवं ईमेल सुइट।',
      icon: 'Globe',
      basePrice: pkg.price,
      timeline: '3 - 7 Working Days',
      timelineHi: '3 से 7 कार्य दिवस',
      requiredDocs: ['Company Logo & Content Details'],
      requiredDocsHi: ['लोगो एवं सामग्री'],
      slug: 'business-website-package',
    });
    confetti({ particleCount: 70, spread: 60 });
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
          <Code2 size={14} />
          <span>FULL-STACK WEB, CLOUD HOSTING & ENTERPRISE SAAS</span>
        </div>

        <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 900, marginBottom: '0.75rem', color: '#FFFFFF' }}>
          {language === 'hi' ? 'वेबसाइट, सॉफ्टवेयर एवं क्लाउड आईटी' : 'Web, Cloud & Software Marketplace'}
        </h1>
        <p style={{ fontSize: '1rem', color: '#CBD5E1', maxWidth: '640px', lineHeight: 1.6 }}>
          Custom mobile-responsive websites, business domain registration, cloud VPS hosting, corporate email suites, and modular CRM/HRMS/ERP SaaS platforms.
        </p>
      </div>

      {/* Domain Lookup Bar */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        padding: '1.75rem 2rem',
        boxShadow: '0 4px 20px rgba(10, 25, 47, 0.05)',
        border: '1px solid #E2E8F0',
        marginBottom: '3rem',
      }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0A192F', marginBottom: '0.75rem' }}>
          Search Custom Business Domain (.in / .com / .org)
        </h3>
        <div style={{ display: 'flex', gap: '0.75rem', maxWidth: '620px' }}>
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: '#F8FAFC',
            padding: '0.6rem 1rem',
            borderRadius: '10px',
            border: '1px solid #CBD5E1',
          }}>
            <Globe size={18} color="#1D4ED8" />
            <input
              type="text"
              value={domainSearch}
              onChange={(e) => setDomainSearch(e.target.value)}
              placeholder="e.g. mycompanyname"
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.9rem', fontWeight: 600 }}
              onKeyDown={(e) => e.key === 'Enter' && handleDomainCheck()}
            />
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748B' }}>.in</span>
          </div>

          <button
            onClick={handleDomainCheck}
            className="btn-primary"
          >
            Check Availability
          </button>
        </div>

        {domainAvailable && (
          <div style={{
            marginTop: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#059669',
            fontSize: '0.85rem',
            fontWeight: 600,
          }}>
            <CheckCircle2 size={16} />
            <span>Congratulations! <strong>{domainSearch}.in</strong> is available at ₹599/yr.</span>
          </div>
        )}
      </div>

      {/* Website & Software Packages */}
      <div className="grid-3" style={{ gap: '1.5rem', marginBottom: '3.5rem' }}>
        {itPackages.map((pkg, idx) => (
          <div
            key={idx}
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              padding: '2rem',
              border: pkg.isPopular ? '2px solid #1D4ED8' : '1px solid #E2E8F0',
              boxShadow: pkg.isPopular ? '0 12px 30px rgba(29, 78, 216, 0.12)' : '0 4px 16px rgba(0,0,0,0.04)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
            }}
          >
            {pkg.isPopular && (
              <span className="badge badge-blue" style={{ position: 'absolute', top: '-12px', right: '1.5rem' }}>
                Most Popular
              </span>
            )}

            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0A192F', marginBottom: '0.5rem' }}>
                {pkg.title}
              </h3>
              <div style={{ marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: 900, color: '#0A192F' }}>
                  ₹{pkg.price.toLocaleString('en-IN')}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#64748B', marginLeft: '0.35rem' }}>
                  {pkg.period}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.75rem' }}>
                {pkg.features.map((feat, fIdx) => (
                  <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: '#334155' }}>
                    <CheckCircle2 size={15} color="#059669" style={{ flexShrink: 0 }} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleSelectPackage(pkg)}
              className={pkg.isPopular ? 'btn-gold' : 'btn-primary'}
              style={{ width: '100%', justifyContent: 'center', fontWeight: 800 }}
            >
              <span>Add Package to Cart</span>
              <ArrowRight size={15} />
            </button>
          </div>
        ))}
      </div>

      {/* IT, Cloud & Software Services Catalog */}
      <div style={{ marginTop: '2rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <span className="badge badge-gold" style={{ marginBottom: '0.4rem' }}>CATALOG SERVICES</span>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0A192F' }}>
            {language === 'hi' ? 'क्लाउड एवं सॉफ्टवेयर सेवाएं' : 'Custom Cloud, Hosting & SaaS Services'}
          </h2>
        </div>

        <div className="grid-3" style={{ gap: '1.5rem' }}>
          {services.filter(s => s.category === 'website-it').map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};
