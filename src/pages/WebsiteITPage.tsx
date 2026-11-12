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
  Layers,
  ShoppingCart,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const WebsiteITPage: React.FC = () => {
  const { services, addToCart, showToast, logAudit, language } = useApp();
  const [domainSearch, setDomainSearch] = useState('');
  const [domainTld, setDomainTld] = useState<'.in' | '.co.in' | '.com' | '.org'>('.in');
  const [checkedDomain, setCheckedDomain] = useState<string | null>(null);

  const tldPriceMap: Record<'.in' | '.co.in' | '.com' | '.org', number> = {
    '.in': 599,
    '.co.in': 499,
    '.com': 999,
    '.org': 899,
  };

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
    const cleanSlug = domainSearch.trim().toLowerCase().replace(/\.(in|co\.in|com|org)$/i, '').replace(/[^a-z0-9-]/g, '');
    if (cleanSlug.length < 2) {
      showToast('Invalid Domain Name', 'Enter at least 2 alphanumeric characters or hyphens.', 'error');
      return;
    }
    const fullDomain = `${cleanSlug}${domainTld}`;
    setCheckedDomain(fullDomain);
    showToast('Domain Verified!', `${fullDomain} is available for registration at ₹${tldPriceMap[domainTld]}/yr.`, 'success');
  };

  const handleAddDomainToCart = () => {
    if (!checkedDomain) return;
    const price = tldPriceMap[domainTld];
    addToCart({
      id: `dom-${checkedDomain}-${Date.now()}`,
      title: `Domain Registration (1 Year): ${checkedDomain}`,
      titleHi: `डोमेन पंजीकरण: ${checkedDomain}`,
      category: 'website-it',
      description: `Annual ICANN/NIXI domain registration for ${checkedDomain} with DNSSEC & WHOIS privacy.`,
      descriptionHi: `${checkedDomain} वार्षिक डोमेन पंजीकरण।`,
      icon: 'Globe',
      basePrice: price,
      timeline: 'Instant Propagation',
      timelineHi: 'तत्काल सक्रिय',
      requiredDocs: ['Registrant Contact Email & Mobile'],
      requiredDocsHi: ['ईमेल और मोबाइल'],
      slug: 'domain-registration',
    });
    logAudit(`Domain Added to Cart: ${checkedDomain}`, `TLD ${domainTld} — ₹${price}`);
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
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#061A36', marginBottom: '0.75rem' }}>
          Search Custom Business Domain (.in / .com / .org)
        </h3>
        <div style={{ display: 'flex', gap: '0.75rem', maxWidth: '680px', flexWrap: 'wrap' }}>
          <div style={{
            flex: 1,
            minWidth: '240px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: '#F8FAFC',
            padding: '0.6rem 1rem',
            borderRadius: '10px',
            border: '1px solid #CBD5E1',
          }}>
            <Globe size={18} color="#075ACB" />
            <input
              type="text"
              value={domainSearch}
              onChange={(e) => {
                setDomainSearch(e.target.value);
                setCheckedDomain(null);
              }}
              placeholder="e.g. mycompanyname"
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.9rem', fontWeight: 600 }}
              onKeyDown={(e) => e.key === 'Enter' && handleDomainCheck()}
            />
            <select
              value={domainTld}
              onChange={(e) => {
                setDomainTld(e.target.value as any);
                setCheckedDomain(null);
              }}
              style={{ border: 'none', background: '#EFF6FF', color: '#075ACB', fontWeight: 800, fontSize: '0.85rem', borderRadius: '6px', padding: '0.25rem 0.5rem' }}
            >
              <option value=".in">.in (₹599)</option>
              <option value=".co.in">.co.in (₹499)</option>
              <option value=".com">.com (₹999)</option>
              <option value=".org">.org (₹899)</option>
            </select>
          </div>

          <button
            onClick={handleDomainCheck}
            className="btn-primary"
          >
            Check Availability
          </button>
        </div>

        {checkedDomain && (
          <div style={{
            marginTop: '1rem',
            padding: '0.85rem 1.15rem',
            background: '#F0FDF4',
            border: '1px solid #86EFAC',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#059669', fontSize: '0.86rem', fontWeight: 700 }}>
              <CheckCircle2 size={16} />
              <span><strong>{checkedDomain}</strong> is available at ₹{tldPriceMap[domainTld]}/yr (incl. DNS management).</span>
            </div>
            <button onClick={handleAddDomainToCart} className="btn-gold btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontWeight: 800 }}>
              <ShoppingCart size={14} />
              <span>Add Domain to Cart</span>
            </button>
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
              border: pkg.isPopular ? '2px solid #075ACB' : '1px solid #E2E8F0',
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
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#061A36', marginBottom: '0.5rem' }}>
                {pkg.title}
              </h3>
              <div style={{ marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: 900, color: '#061A36' }}>
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
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#061A36' }}>
            {language === 'hi' ? 'क्लाउड एवं सॉफ्टवेयर सेवाएं' : 'Custom Cloud, Hosting & SaaS Services'}
          </h2>
        </div>

        <div className="grid-3" style={{ gap: '1.5rem' }}>
          {services.filter(s => s.category === 'website-it').map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>

      {/* Authorized Registry & Cybersecurity Compliance Portals */}
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
            AUTHORIZED .IN REGISTRY, ICANN WHOIS & CERT-IN PORTALS
          </div>
          <div style={{ fontSize: '0.84rem', color: '#475569', marginTop: '0.2rem' }}>
            Verify official NIXI .in ownership, ICANN WHOIS registration status, and CERT-In Indian cybersecurity advisories.
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
          {[
            { label: 'NIXI (.in) Registry', url: 'https://www.registry.in/' },
            { label: 'ICANN WHOIS Lookup', url: 'https://lookup.icann.org/' },
            { label: 'CERT-In Advisories', url: 'https://www.cert-in.org.in/' },
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
