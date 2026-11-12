import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { serviceCategories } from '../data/servicesData';
import { ServiceCard } from '../components/cards/ServiceCard';
import { ServiceBanners } from '../components/common/ServiceBanners';
import { ADCSLogo } from '../components/branding';
import { ADCS_BRAND_IDENTITY } from '../config/brandAssets';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  Building2,
  Search,
  Landmark,
  Monitor,
  Briefcase,
  FileText,
  Zap,
  Plane,
  Key,
  Hammer,
  Truck,
  Coins,
  Shield,
  Code2,
  Users2,
  GraduationCap,
  Compass,
  CheckCircle2,
  MapPin,
  Award,
  BookOpen,
  QrCode,
  FileCheck2,
  Layers,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    services,
    setIsSearchOpen,
    setIsQuantumAIOpen,
    openQuantumAI,
    setIsTrackerOpen,
    workstations,
    applications,
    language,
    whiteLabelConfig,
  } = useApp();
  const navigate = useNavigate();

  const availableWorkstations = workstations.filter((w) => w.status === 'available').length;
  const popularServices = services.slice(0, 8);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Landmark': return <Landmark size={22} />;
      case 'Monitor': return <Monitor size={22} />;
      case 'Briefcase': return <Briefcase size={22} />;
      case 'FileText': return <FileText size={22} />;
      case 'Zap': return <Zap size={22} />;
      case 'Plane': return <Plane size={22} />;
      case 'Building2': return <Building2 size={22} />;
      case 'Key': return <Key size={22} />;
      case 'Hammer': return <Hammer size={22} />;
      case 'ShieldCheck': return <ShieldCheck size={22} />;
      case 'Truck': return <Truck size={22} />;
      case 'Coins': return <Coins size={22} />;
      case 'Shield': return <Shield size={22} />;
      case 'Code2': return <Code2 size={22} />;
      case 'Users2': return <Users2 size={22} />;
      case 'GraduationCap': return <GraduationCap size={22} />;
      default: return <Sparkles size={22} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', paddingBottom: '3rem' }}>
      {/* 1. ENTERPRISE HERO SECTION — DEEP NAVY + ROYAL BLUE + SUBTLE GOLD */}
      <section
        style={{
          position: 'relative',
          padding: '3.75rem 0 4rem',
          background: 'linear-gradient(135deg, #031126 0%, #061A36 58%, #075ACB 100%)',
          color: '#FFFFFF',
          borderBottom: '3px solid #D6A12B',
          overflow: 'hidden',
        }}
      >
        <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.22fr 0.78fr',
              gap: '2.75rem',
              alignItems: 'center',
            }}
            className="hero-grid"
          >
            {/* Left Column: Master Brand Identity + Headlines + Primary Actions */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  padding: '0.35rem 0.9rem',
                  borderRadius: '999px',
                  background: 'rgba(214, 161, 43, 0.16)',
                  border: '1px solid rgba(243, 212, 119, 0.45)',
                  color: '#F3D477',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  marginBottom: '1.15rem',
                }}
              >
                <ShieldCheck size={15} />
                <span>{ADCS_BRAND_IDENTITY.slogan}</span>
              </div>

              <h1
                style={{
                  fontSize: 'clamp(2.1rem, 4.3vw, 3.3rem)',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  lineHeight: 1.12,
                  marginBottom: '0.65rem',
                }}
              >
                {whiteLabelConfig.brandName || ADCS_BRAND_IDENTITY.legalName}
              </h1>

              <p
                style={{
                  fontSize: 'clamp(1.2rem, 2.2vw, 1.55rem)',
                  fontWeight: 700,
                  color: '#F3D477',
                  marginBottom: '0.85rem',
                }}
              >
                {language === 'hi' ? ADCS_BRAND_IDENTITY.heroHeadlineHindi : ADCS_BRAND_IDENTITY.heroHeadline}
              </p>

              <p
                style={{
                  fontSize: '1.02rem',
                  color: '#D4E0EE',
                  maxWidth: '640px',
                  lineHeight: 1.65,
                  marginBottom: '1.85rem',
                }}
              >
                Unified citizen documentation, assisted Kendra counters, enterprise SaaS, accredited skill credentials, and tracked service workflows under one verified platform.
              </p>

              {/* Primary Actions required by Section 5 */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', marginBottom: '2rem' }}>
                <Link
                  to="/services"
                  className="btn-gold"
                  style={{ padding: '0.8rem 1.5rem', fontSize: '0.96rem' }}
                >
                  <span>{language === 'hi' ? 'सभी सेवाएँ देखें' : 'Explore All Services'}</span>
                  <ArrowRight size={17} />
                </Link>

                <button
                  type="button"
                  onClick={() => setIsQuantumAIOpen(true)}
                  className="btn-primary"
                  style={{
                    padding: '0.8rem 1.5rem',
                    fontSize: '0.96rem',
                    background: '#0878F9',
                    borderColor: '#60A5FA',
                  }}
                >
                  <Sparkles size={17} />
                  <span>Ask QUANTUM AI</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsTrackerOpen(true)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.8rem 1.4rem',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.35)',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '0.94rem',
                  }}
                >
                  <Compass size={17} color="#F3D477" />
                  <span>Track Application</span>
                </button>
              </div>

              {/* Search Prompt Bar */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                style={{
                  width: '100%',
                  maxWidth: '560px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.75rem',
                  padding: '0.85rem 1.15rem',
                  borderRadius: '12px',
                  background: '#FFFFFF',
                  color: '#55677D',
                  boxShadow: '0 10px 28px rgba(3, 17, 38, 0.28)',
                  textAlign: 'left',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 600, fontSize: '0.92rem' }}>
                  <Search size={18} color="#075ACB" />
                  <span>Search PAN, GST, Aadhaar assist, Rent Agreement, Courses...</span>
                </span>
                <span style={{ background: '#075ACB', color: '#FFFFFF', padding: '0.3rem 0.7rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700 }}>
                  Search
                </span>
              </button>
            </div>

            {/* Right Column: Official Master Logo Display + Digital Ecosystem Pulse (Live Store State Only) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(214, 161, 43, 0.38)',
                  borderRadius: '18px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <ADCSLogo variant="dark" theme="dark" customSrc={whiteLabelConfig.darkLogoUrl} height={190} />
              </div>

              <div
                style={{
                  background: 'var(--adcs-surface)',
                  color: 'var(--adcs-text)',
                  borderRadius: '16px',
                  padding: '1.35rem',
                  border: '1px solid var(--adcs-border)',
                  boxShadow: 'var(--adcs-shadow-lg)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.9rem' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--adcs-text)', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <Layers size={16} color="#075ACB" />
                    <span>DIGITAL ECOSYSTEM PULSE</span>
                  </div>
                  <span className="badge-green">LIVE WORKSPACE</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                  <div style={{ padding: '0.75rem', borderRadius: '10px', background: 'var(--adcs-background)', border: '1px solid var(--adcs-border)' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--adcs-muted)', fontWeight: 700 }}>MASTER SECTORS</div>
                    <div style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--adcs-blue-light)' }}>
                      {serviceCategories.length}
                    </div>
                  </div>
                  <div style={{ padding: '0.75rem', borderRadius: '10px', background: 'var(--adcs-background)', border: '1px solid var(--adcs-border)' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--adcs-muted)', fontWeight: 700 }}>CATALOG SERVICES</div>
                    <div style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--adcs-text)' }}>
                      {services.length}
                    </div>
                  </div>
                  <div style={{ padding: '0.75rem', borderRadius: '10px', background: 'var(--adcs-background)', border: '1px solid var(--adcs-border)' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--adcs-muted)', fontWeight: 700 }}>ACTIVE CAFÉ DESKS</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--adcs-success)' }}>
                      {availableWorkstations}/{workstations.length} Ready
                    </div>
                  </div>
                  <div style={{ padding: '0.75rem', borderRadius: '10px', background: 'var(--adcs-background)', border: '1px solid var(--adcs-border)' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--adcs-muted)', fontWeight: 700 }}>QUEUE RECORDS</div>
                    <div className="adcs-gold-accent-text" style={{ fontSize: '1.15rem', fontWeight: 800 }}>
                      {applications.length} Tracked
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1B. MULTI-SERVICE CAMPAIGN BANNERS CAROUSEL */}
      <section className="container-wide" style={{ marginTop: '-1.5rem' }}>
        <ServiceBanners mode="carousel" />
      </section>

      {/* 2. 16 MASTER SERVICE SECTORS */}
      <section className="container-wide">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem' }}>
          <div>
            <span className="badge-pill" style={{ marginBottom: '0.5rem' }}>
              UNIFIED SERVICE ARCHITECTURE
            </span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 900 }}>
              16 Master Service Sectors
            </h2>
            <p style={{ color: 'var(--adcs-muted)', fontSize: '0.96rem', marginTop: '0.25rem' }}>
              Every citizen, business, real-estate, and technical workflow organized clearly across 16 dedicated vertical portals.
            </p>
          </div>
          <Link to="/services" className="btn-secondary">
            <span>Browse Full Catalog</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid-4">
          {serviceCategories.map((cat) => (
            <Link
              key={cat.id}
              to={cat.route || `/services?category=${cat.id}`}
              className="card adcs-card-interactive"
              style={{
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
                textDecoration: 'none',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: 'var(--adcs-primary-soft)',
                    color: '#075ACB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {getCategoryIcon(cat.icon)}
                </div>
                <ArrowRight size={16} color="var(--adcs-muted)" />
              </div>
              <div style={{ fontWeight: 800, fontSize: '0.98rem', color: 'var(--adcs-text)' }}>
                {language === 'hi' && cat.nameHi ? cat.nameHi : cat.name}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--adcs-muted)', lineHeight: 1.45 }}>
                {cat.description}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. MOST REQUESTED SERVICES */}
      <section className="container-wide">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem' }}>
          <div>
            <span className="badge-gold" style={{ marginBottom: '0.5rem' }}>FAST-TRACK DIGITAL COUNTER</span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 900 }}>
              Most Requested Services
            </h2>
          </div>
          <Link to="/services" className="btn-primary">
            <span>Apply or Request Online</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid-4">
          {popularServices.map((srv) => (
            <ServiceCard key={srv.id} service={srv} />
          ))}
        </div>
      </section>

      {/* 4. DOCUMENT ASSISTANCE & QUANTUM AI SPLIT */}
      <section className="container-wide">
        <div className="grid-2">
          {/* Document Assistance */}
          <div className="card" style={{ padding: '2rem', borderTop: '4px solid #075ACB' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#075ACB', fontWeight: 800, fontSize: '0.8rem', marginBottom: '0.6rem' }}>
              <FileCheck2 size={18} />
              <span>ASSISTED DOCUMENTATION & VAULT</span>
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.65rem' }}>
              Structured Document Assistance & Receipts
            </h3>
            <p style={{ color: 'var(--adcs-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Prepare compliant applications, generate corporate letterheads, issue ADCS training credentials, and maintain verified payment receipts without altering official source records.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <Link to="/documents" className="btn-primary">
                Open Document Center
              </Link>
              <Link to="/verify-certificate" className="btn-secondary">
                <QrCode size={16} /> Verify ADCS Certificate
              </Link>
            </div>
          </div>

          {/* QUANTUM AI */}
          <div
            style={{
              background: 'linear-gradient(135deg, #061A36 0%, #031126 100%)',
              color: '#FFFFFF',
              borderRadius: '16px',
              padding: '2rem',
              border: '1px solid rgba(214, 161, 43, 0.45)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', color: '#F3D477', fontWeight: 800, fontSize: '0.8rem', marginBottom: '0.6rem' }}>
              <Sparkles size={17} />
              <span>ADCS INTELLIGENT ROUTING</span>
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#FFFFFF', marginBottom: '0.65rem' }}>
              QUANTUM AI — Instant Eligibility & Checklist Guide
            </h3>
            <p style={{ color: '#CBD5E1', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Ask in English or Hindi for exact required documents, Turn-Around-Time, statutory vs. service fees, or automated service routing across all 16 ADCS sectors.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => openQuantumAI('Documents required for New PAN or Passport renewal')}
                className="btn-gold"
              >
                Launch QUANTUM AI
              </button>
              <Link
                to="/quantum-ai"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.65rem 1.2rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.35)',
                  color: '#FFFFFF',
                  fontWeight: 700,
                }}
              >
                Explore AI Console
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ACADEMY OF EXCELLENCE & ASTROLOGY SUITE */}
      <section className="container-wide">
        <div className="grid-2">
          <div className="card" style={{ padding: '2rem', borderTop: '4px solid #D6A12B' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#946809', fontWeight: 800, fontSize: '0.8rem', marginBottom: '0.6rem' }}>
              <Award size={18} color="#D6A12B" />
              <span>ADCS ACADEMY OF EXCELLENCE</span>
            </div>
            <h3 style={{ fontSize: '1.45rem', fontWeight: 900, marginBottom: '0.65rem' }}>
              Skill Development & QR-Verified Credentials
            </h3>
            <p style={{ color: 'var(--adcs-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Complete structured modules in Applied AI, CSC/e-Gov Operations, CCTV Engineering, and Full-Stack Basics with digitally signed ADCS Academy certificates.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <Link to="/portal/student" className="btn-navy">
                <BookOpen size={16} /> Student Academy LMS
              </Link>
              <Link to="/portal/instructor" className="btn-secondary">
                Instructor Portal
              </Link>
            </div>
          </div>

          <div className="card" style={{ padding: '2rem', borderTop: '4px solid #061A36' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#075ACB', fontWeight: 800, fontSize: '0.8rem', marginBottom: '0.6rem' }}>
              <Compass size={18} />
              <span>VEDIC ASTROLOGY & CONSULTATION</span>
            </div>
            <h3 style={{ fontSize: '1.45rem', fontWeight: 900, marginBottom: '0.65rem' }}>
              Janam Kundli, 36 Guna Milan & Report Desk
            </h3>
            <p style={{ color: 'var(--adcs-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Generate planetary Lagna charts, Ashtakoota matchmaking compatibility summaries, daily Panchang, and printable ADCS Kundli reports.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <Link to="/astrology/kundli" className="btn-primary">
                Generate Janam Kundli
              </Link>
              <Link to="/astrology" className="btn-secondary">
                Astrology Suite
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FRANCHISE SUPER NETWORK & PARTNER ECOSYSTEM */}
      <section className="container-wide">
        <div
          className="card hero-grid"
          style={{
            padding: '2.25rem',
            gap: '2rem',
            alignItems: 'center',
            borderLeft: '5px solid #D6A12B',
          }}
        >
          <div>
            <span className="badge-pill" style={{ marginBottom: '0.65rem' }}>
              PARTNER & FRANCHISE ECOSYSTEM
            </span>
            <h2 style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2rem)', fontWeight: 900, marginBottom: '0.75rem' }}>
              Operate an Authorized ADCS Kendra or Partner Desk
            </h2>
            <p style={{ color: 'var(--adcs-muted)', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '1.25rem' }}>
              Equip local digital service centers with unified VLE POS billing, application queues, print/scan workstation controls, and distributor settlement ledgers.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <Link to="/franchise" className="btn-primary">
                Explore Franchise Models
              </Link>
              <Link to="/partner/dashboard" className="btn-secondary">
                Partner Portal
              </Link>
              <Link to="/locations" className="btn-secondary">
                <MapPin size={15} /> Locate Center
              </Link>
            </div>
          </div>

          <div
            style={{
              background: 'var(--adcs-background)',
              borderRadius: '14px',
              padding: '1.35rem',
              border: '1px solid var(--adcs-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
            }}
          >
            <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--adcs-text)' }}>
              OPERATIONAL CAPABILITIES INCLUDED
            </div>
            {[
              { label: 'Service Verticals', val: `${serviceCategories.length} Sectors (${services.length} Items)` },
              { label: 'Center Tooling', val: 'POS + Cyber Café + CRM/ERP' },
              { label: 'Billing Compliance', val: 'Itemized GST Receipts' },
              { label: 'Support Window', val: 'Mon–Sun Helpdesk Access' },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', gap: '0.75rem' }}>
                <span style={{ color: 'var(--adcs-muted)' }}>{item.label}:</span>
                <strong style={{ color: 'var(--adcs-text)', textAlign: 'right' }}>{item.val}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. VERIFIED ENTERPRISE INTEGRITY PILLARS (Zero fabricated testimonials) */}
      <section className="container-wide">
        <div
          style={{
            background: '#061A36',
            color: '#FFFFFF',
            borderRadius: '16px',
            padding: '2rem',
            border: '1px solid rgba(214, 161, 43, 0.35)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.55rem', fontWeight: 900, color: '#FFFFFF' }}>
              Platform Governance & Service Standards
            </h2>
            <p style={{ color: '#CBD5E1', fontSize: '0.9rem', marginTop: '0.3rem' }}>
              Designed for accuracy, clear documentation separation, and accountable digital operations.
            </p>
          </div>
          <div className="grid-3">
            {[
              {
                icon: <CheckCircle2 size={20} color="#F3D477" />,
                title: 'Authentic Source Documents',
                desc: 'ADCS branding appears strictly on ADCS receipts, cover summaries, certificates, and letterheads—never altered onto government IDs.',
              },
              {
                icon: <Clock size={20} color="#0878F9" />,
                title: 'Immutable Audit Trail',
                desc: 'Certificates preserve original issue records and maintain cryptographic hashes on controlled branding reissues.',
              },
              {
                icon: <ShieldCheck size={20} color="#34D399" />,
                title: 'Role-Based Portal Isolation',
                desc: 'Citizen, Kendra, Affiliate, Instructor, and Enterprise administrative tools enforce strict access boundaries.',
              },
            ].map((card) => (
              <div
                key={card.title}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                }}
              >
                <div style={{ marginBottom: '0.6rem' }}>{card.icon}</div>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: '#FFFFFF', marginBottom: '0.4rem' }}>{card.title}</div>
                <div style={{ fontSize: '0.82rem', color: '#CBD5E1', lineHeight: 1.55 }}>{card.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};
