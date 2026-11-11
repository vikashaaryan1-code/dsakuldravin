import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { serviceCategories } from '../data/servicesData';
import { ServiceCard } from '../components/cards/ServiceCard';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Users, 
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
  TrendingUp,
  MapPin,
  Laptop,
  Award,
  BookOpen,
  QrCode
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { 
    services, 
    setIsSearchOpen, 
    setIsQuantumAIOpen, 
    openQuantumAI,
    setIsTrackerOpen, 
    workstations,
    startWorkstationSession,
    stopWorkstationSession,
    language,
    t 
  } = useApp();
  const navigate = useNavigate();

  const availableWorkstations = workstations.filter(w => w.status === 'available').length;
  const popularServices = services.slice(0, 8);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Landmark': return <Landmark size={24} />;
      case 'Monitor': return <Monitor size={24} />;
      case 'Briefcase': return <Briefcase size={24} />;
      case 'FileText': return <FileText size={24} />;
      case 'Zap': return <Zap size={24} />;
      case 'Plane': return <Plane size={24} />;
      case 'Building2': return <Building2 size={24} />;
      case 'Key': return <Key size={24} />;
      case 'Hammer': return <Hammer size={24} />;
      case 'ShieldCheck': return <ShieldCheck size={24} />;
      case 'Truck': return <Truck size={24} />;
      case 'Coins': return <Coins size={24} />;
      case 'Shield': return <Shield size={24} />;
      case 'Code2': return <Code2 size={24} />;
      case 'Users2': return <Users2 size={24} />;
      case 'GraduationCap': return <GraduationCap size={24} />;
      default: return <Sparkles size={24} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', paddingBottom: '3rem' }}>
      {/* 1. CINEMATIC HERO SECTION */}
      <section style={{
        position: 'relative',
        padding: '5rem 0 4rem',
        background: 'radial-gradient(circle at 80% 20%, rgba(37, 99, 235, 0.08) 0%, rgba(248, 250, 252, 1) 60%)',
        borderBottom: '1px solid #E2E8F0',
        overflow: 'hidden',
      }}>
        <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '3rem',
            alignItems: 'center',
          }} className="hero-grid">
            {/* Left Column: Headlines & CTAs */}
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#EFF6FF',
                border: '1px solid #BFDBFE',
                borderRadius: '9999px',
                padding: '0.35rem 0.85rem',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#1D4ED8',
                marginBottom: '1.25rem',
              }}>
                <Sparkles size={14} color="#F59E0B" />
                <span>INDIA FIRST • GLOBAL READY • AI-NATIVE DIGITAL SUPER PLATFORM</span>
              </div>

              <h1 style={{
                fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
                fontWeight: 900,
                color: '#0A192F',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                marginBottom: '1.25rem',
              }}>
                {language === 'hi' ? 'आपकी हर ज़रूरत का' : 'Everything You Need.'}
                <br />
                <span className="blue-gradient-text">
                  {language === 'hi' ? 'एक संपूर्ण डिजिटल समाधान।' : 'One Intelligent Platform.'}
                </span>
              </h1>

              <p style={{
                fontSize: '1.08rem',
                color: '#475569',
                lineHeight: 1.6,
                maxWidth: '620px',
                marginBottom: '2rem',
              }}>
                {t.heroSubheadline}
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                <button
                  onClick={() => navigate('/services')}
                  className="btn-primary btn-lg"
                  style={{ gap: '0.6rem' }}
                >
                  <span>{t.exploreServices}</span>
                  <ArrowRight size={18} />
                </button>

                <button
                  onClick={() => openQuantumAI()}
                  className="btn-gold btn-lg"
                  style={{ gap: '0.6rem' }}
                >
                  <Sparkles size={18} />
                  <span>{t.askQuantumAI}</span>
                </button>

                <button
                  onClick={() => setIsTrackerOpen(true)}
                  className="btn-secondary btn-lg"
                  style={{ gap: '0.5rem' }}
                >
                  <Compass size={18} color="#D97706" />
                  <span>{t.trackApplication}</span>
                </button>
              </div>

              {/* Live Mini Search Trigger */}
              <div 
                onClick={() => setIsSearchOpen(true)}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '0.75rem 1.25rem',
                  border: '1px solid #CBD5E1',
                  boxShadow: '0 8px 30px rgba(10, 25, 47, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  maxWidth: '560px',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#1D4ED8'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#CBD5E1'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#64748B' }}>
                  <Search size={18} color="#1D4ED8" />
                  <span style={{ fontSize: '0.92rem', fontWeight: 500 }}>
                    {language === 'hi' ? 'खोजें: "मुझे कंपनी शुरू करनी है" या "CCTV लगवाना है"...' : 'Search any service or ask in natural language...'}
                  </span>
                </div>
                <span 
                  className="badge badge-blue"
                  onClick={(e) => {
                    e.stopPropagation();
                    openQuantumAI();
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  Ask AI
                </span>
              </div>
            </div>

            {/* Right Column: Interactive Ecosystem Dashboard Card */}
            <div>
              <div style={{
                background: '#FFFFFF',
                borderRadius: '24px',
                padding: '2rem',
                boxShadow: '0 20px 50px rgba(10, 25, 47, 0.1)',
                border: '1px solid #E2E8F0',
                position: 'relative',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '1.25rem',
                  borderBottom: '1px solid #F1F5F9',
                  marginBottom: '1.5rem',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: '#10B981',
                      boxShadow: '0 0 8px #10B981',
                    }} />
                    <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0A192F' }}>
                      DIGITAL ECOSYSTEM PULSE
                    </span>
                  </div>
                  <span className="badge badge-green">99.98% System Uptime</span>
                </div>

                {/* Quick Real-Time Metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Active VLE Branches</div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#1D4ED8', marginTop: '0.2rem' }}>
                      2,450+
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#059669', marginTop: '0.2rem' }}>Across 28 States</div>
                  </div>

                  <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Cyber Café Workstations</div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#D97706', marginTop: '0.2rem' }}>
                      {availableWorkstations} Available
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '0.2rem' }}>Ready for booking</div>
                  </div>
                </div>

                {/* Live Workstation status preview */}
                <div style={{
                  background: 'linear-gradient(135deg, #0A192F 0%, #0D2137 100%)',
                  borderRadius: '16px',
                  padding: '1.25rem',
                  color: '#FFFFFF',
                  marginBottom: '1.25rem',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', fontWeight: 700 }}>
                      <Monitor size={16} color="#F59E0B" />
                      <span>Cyber Café Live Workstation Console</span>
                    </div>
                    <Link to="/cyber-cafe" style={{ fontSize: '0.75rem', color: '#93C5FD', textDecoration: 'underline' }}>
                      Open Console ➔
                    </Link>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                    {workstations.slice(0, 8).map(pc => {
                      const isAvail = pc.status === 'available';
                      return (
                        <div
                          key={pc.id}
                          onClick={() => {
                            if (isAvail) {
                              startWorkstationSession(pc.id, 'Citizen Walk-in', '+91 98000 00000', 'Internet & Service Portal Access');
                            } else {
                              stopWorkstationSession(pc.id);
                            }
                          }}
                          style={{
                            background: isAvail ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                            border: isAvail ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(239, 68, 68, 0.4)',
                            borderRadius: '8px',
                            padding: '0.4rem 0.2rem',
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                          }}
                          title={isAvail ? `Click to activate ${pc.id}` : `Occupied by ${pc.currentSession?.customerName || 'Citizen'}. Click to release seat & bill.`}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: isAvail ? '#34D399' : '#FCA5A5' }}>
                            {pc.id}
                          </div>
                          <div style={{ fontSize: '0.62rem', color: '#94A3B8' }}>
                            {isAvail ? 'FREE (Book)' : 'IN-USE (Free)'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Direct Role Switch Callout */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  background: '#EFF6FF',
                  border: '1px solid #BFDBFE',
                  fontSize: '0.82rem',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1D4ED8', fontWeight: 600 }}>
                    <Laptop size={16} />
                    <span>Manage as VLE, Franchise or Admin</span>
                  </div>
                  <Link to="/admin/dashboard" style={{ fontWeight: 700, color: '#1D4ED8' }}>
                    Portals ➔
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST STRIP (Section 8) */}
      <section className="container-wide">
        <div style={{
          background: '#FFFFFF',
          borderRadius: '18px',
          padding: '1.5rem 2rem',
          boxShadow: '0 4px 20px rgba(10, 25, 47, 0.05)',
          border: '1px solid #E2E8F0',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '1.25rem',
          textAlign: 'center',
        }}>
          {[
            { label: t.trustFast, icon: <Clock size={20} color="#1D4ED8" /> },
            { label: t.trustPricing, icon: <CheckCircle2 size={20} color="#059669" /> },
            { label: t.trustSecure, icon: <ShieldCheck size={20} color="#D97706" /> },
            { label: t.trustExpert, icon: <Users size={20} color="#7C3AED" /> },
            { label: t.trustPanIndia, icon: <MapPin size={20} color="#2563EB" /> },
            { label: t.trustAI, icon: <Sparkles size={20} color="#EA580C" /> },
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: '#F8FAFC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {item.icon}
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0A192F' }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. 16-SECTOR SERVICE MARKETPLACE GRID */}
      <section className="container-wide">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>UNLIMITED MARKETPLACE</span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0A192F' }}>
            {language === 'hi' ? '16 प्रमुख डिजिटल एवं व्यापारिक क्षेत्र' : '16 Master Service & Business Sectors'}
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#64748B', maxWidth: '640px', margin: '0.5rem auto 0' }}>
            From birth certificate to corporate incorporation, turnkey villas to CCTV installations, every service is orchestrated under one unified identity.
          </p>
        </div>

        <div className="grid-4" style={{ gap: '1.25rem' }}>
          {serviceCategories.map(cat => (
            <Link
              key={cat.id}
              to={cat.route}
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid #E2E8F0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#93C5FD';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(29, 78, 216, 0.08)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#E2E8F0';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: '#EFF6FF',
                    color: '#1D4ED8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #DBEAFE',
                  }}>
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <span className="badge badge-gray">{cat.count}+ Services</span>
                </div>

                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0A192F', marginBottom: '0.4rem' }}>
                  {language === 'hi' ? cat.nameHi : cat.name}
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#64748B', lineHeight: 1.45 }}>
                  {language === 'hi' ? cat.descriptionHi : cat.description}
                </p>
              </div>

              <div style={{
                marginTop: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                color: '#1D4ED8',
                fontWeight: 700,
                fontSize: '0.84rem',
              }}>
                <span>Explore Sector</span>
                <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. POPULAR FEATURED SERVICES */}
      <section className="container-wide">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div>
            <span className="badge badge-blue">DIRECT CITIZEN ASSISTANCE</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0A192F', marginTop: '0.4rem' }}>
              {t.popularServices}
            </h2>
          </div>
          <button onClick={() => navigate('/services')} className="btn-secondary">
            <span>View All Catalog ({services.length})</span>
            <ArrowRight size={15} />
          </button>
        </div>

        <div className="grid-4" style={{ gap: '1.25rem' }}>
          {popularServices.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* 5. QUANTUM AI PROMPT BANNER */}
      <section className="container-wide">
        <div style={{
          background: 'linear-gradient(135deg, #0A192F 0%, #0D2137 60%, #1D4ED8 100%)',
          borderRadius: '24px',
          padding: '3rem 2.5rem',
          color: '#FFFFFF',
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '2.5rem',
          alignItems: 'center',
          boxShadow: '0 20px 50px rgba(10, 25, 47, 0.2)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
        }} className="hero-grid">
          <div>
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
              <Sparkles size={14} />
              <span>QUANTUM AI SUPER BRAIN</span>
            </div>

            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, lineHeight: 1.2, marginBottom: '1rem' }}>
              Ask in Simple Hindi or English.
              <br />
              <span style={{ color: '#F59E0B' }}>AI Understands & Acts.</span>
            </h2>

            <p style={{ fontSize: '0.95rem', color: '#CBD5E1', lineHeight: 1.6, marginBottom: '1.75rem' }}>
              Whether you need to register a company, construct a residential villa, or check document eligibility, QUANTUM AI matches partners, verifies documents with OCR, and calculates transparent quotes in real-time.
            </p>

            <button
              onClick={() => openQuantumAI()}
              className="btn-gold btn-lg"
              style={{ fontWeight: 800 }}
            >
              <Sparkles size={18} />
              <span>Launch QUANTUM AI Assistant</span>
            </button>
          </div>

          {/* Sample Prompts Box */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(12px)',
            borderRadius: '18px',
            padding: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#F59E0B', textTransform: 'uppercase' }}>
              Sample Conversational Prompts:
            </div>
            {[
              '“मुझे कंपनी शुरू करनी है और GST भी चाहिए”',
              '“Calculate 4-Camera CCTV setup with 1TB HDD”',
              '“Check my Aadhaar documents for passport appointment”',
              '“Show pending applications in Bihar where documents are missing”',
            ].map((q, idx) => (
              <div
                key={idx}
                onClick={() => openQuantumAI(q.replace(/^[“”"']|[“”"']$/g, ''))}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
              >
                {q}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5.5 VEDIC ASTROLOGY SUITE SHOWCASE */}
      <section className="container-wide">
        <div style={{
          background: 'linear-gradient(135deg, #090E17 0%, #151D33 50%, #1E1B4B 100%)',
          borderRadius: '24px',
          padding: '3rem 2.5rem',
          color: '#FFFFFF',
          border: '1.5px solid rgba(245, 158, 11, 0.35)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(217, 119, 6, 0.15)',
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '2.5rem',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden'
        }} className="hero-grid">
          {/* Sacred ॐ Watermark */}
          <div style={{
            position: 'absolute',
            right: '-20px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '180px',
            color: 'rgba(245, 158, 11, 0.05)',
            userSelect: 'none',
            pointerEvents: 'none',
            fontFamily: 'serif'
          }}>
            ॐ
          </div>

          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(245, 158, 11, 0.15)',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              padding: '0.35rem 0.9rem',
              borderRadius: '999px',
              fontSize: '0.78rem',
              fontWeight: 700,
              color: '#FDE68A',
              marginBottom: '1rem',
            }}>
              <Sparkles size={14} color="#F59E0B" />
              <span>VEDIC ASTROLOGY & KUNDLI PLATFORM</span>
            </div>

            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, lineHeight: 1.2, marginBottom: '1rem' }}>
              प्रामाणिक वेदोक्त ज्योतिष,
              <br />
              <span style={{ color: '#F59E0B' }}>कुंडली, राशिफल एवं ज्योतिषी परामर्श</span>
            </h2>

            <p style={{ fontSize: '0.95rem', color: '#CBD5E1', lineHeight: 1.6, marginBottom: '1.75rem' }}>
              मुफ़्त उत्तर भारतीय जन्म कुंडली, 36 गुण अष्टकूट मिलान, दैनिक पंचांग, टैरो कार्ड, अंक ज्योतिष, एवं स्वर्ण पदक विजेता आचार्यों से लाइव ऑडियो/वीडियो व चैट परामर्श। साथ ही सरकारी लैब प्रमाणित रत्न एवं सिद्ध रुद्राक्ष।
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => navigate('/astrology/kundli')}
                style={{
                  background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '999px',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(217, 119, 6, 0.4)'
                }}
              >
                <Compass size={18} />
                <span>मुफ़्त जन्म कुंडली बनाएं</span>
              </button>

              <button
                onClick={() => navigate('/astrology')}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#FDE68A',
                  border: '1px solid rgba(245, 158, 11, 0.4)',
                  padding: '12px 24px',
                  borderRadius: '999px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                <span>एस्ट्रो हब में प्रवेश करें</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Feature Quick Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.85rem',
            position: 'relative',
            zIndex: 2
          }}>
            {[
              { title: 'लग्न कुंडली', desc: 'सटीक ग्रह स्थिति एवं विंशोत्तरी दशा', link: '/astrology/kundli' },
              { title: '36 गुण मिलान', desc: 'अष्टकूट स्कोरकार्ड व मांगलिक जांच', link: '/astrology/matching' },
              { title: 'दैनिक राशिफल', desc: '12 राशियों का आज का शुभ उपाय', link: '/astrology/rashifal' },
              { title: 'दैनिक पंचांग', desc: 'तिथि, वार, नक्षत्र, अभिजीत व राहुकाल', link: '/astrology/panchang' },
            ].map((item, idx) => (
              <div
                key={idx}
                onClick={() => navigate(item.link)}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(245, 158, 11, 0.25)',
                  borderRadius: '14px',
                  padding: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(245, 158, 11, 0.15)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#FDE68A', marginBottom: '0.25rem' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#CBD5E1', lineHeight: 1.4 }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5.8 ADCS ACADEMY & VOCATIONAL SKILLS LMS SHOWCASE */}
      <section className="container-wide">
        <div style={{
          background: 'linear-gradient(135deg, #0B132B 0%, #1C2541 50%, #1E3A8A 100%)',
          borderRadius: '24px',
          padding: '3rem 2.5rem',
          color: '#FFFFFF',
          border: '1.5px solid rgba(59, 130, 246, 0.4)',
          boxShadow: '0 20px 50px rgba(11, 19, 43, 0.4), 0 0 25px rgba(37, 99, 235, 0.15)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div style={{ maxWidth: '680px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'rgba(37, 99, 235, 0.25)',
                border: '1px solid #60A5FA',
                borderRadius: '9999px',
                padding: '0.35rem 0.9rem',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: '#93C5FD',
                marginBottom: '1rem',
              }}>
                <GraduationCap size={15} color="#60A5FA" />
                <span>ADCS ACADEMY OF EXCELLENCE • 16-MODULE VOCATIONAL LMS</span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', fontWeight: 900, lineHeight: 1.2, margin: '0 0 0.75rem', color: '#FFFFFF' }}>
                Job-Ready Vocational Skills &
                <br />
                <span style={{ color: '#F59E0B' }}>Tamper-Proof QR Certifications</span>
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#CBD5E1', lineHeight: 1.6, margin: 0 }}>
                16 comprehensive bilingual modules across AI Engineering, PC Essentials, CCTV Systems, and Digital Growth. Featuring interactive lab readers, instant code copy, proctored computer exams, and verifiable private skill credentials.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => navigate('/portal/student')}
                className="btn-gold btn-lg"
                style={{ fontWeight: 800 }}
              >
                <BookOpen size={18} />
                <span>Launch Academy LMS</span>
              </button>
              <button
                onClick={() => navigate('/verify-certificate')}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  padding: '12px 22px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
              >
                <QrCode size={18} />
                <span>Verify Certificate</span>
              </button>
            </div>
          </div>

          {/* 4 Course Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
            marginBottom: '2rem'
          }}>
            {[
              {
                id: 'CRS-AI-101',
                title: 'AI Mastery & Prompt Engineering',
                titleHi: 'एआई मास्टरी एवं प्रॉम्प्ट इंजीनियरिंग',
                tag: 'High Demand • 4 Modules',
                desc: 'LLM token architecture, few-shot prompt crafting, multi-agent frameworks, and autonomous coding orchestration.',
                badgeColor: '#10B981',
                icon: <Sparkles size={20} color="#F59E0B" />
              },
              {
                id: 'CRS-COMP-102',
                title: 'Computer Pro & Windows Fundamentals',
                titleHi: 'कंप्यूटर प्रो एवं विंडोज ऑपरेटिंग',
                tag: 'Essential Core • 4 Modules',
                desc: 'Windows 11 administration, keyboard shortcuts, advanced MS Office/Excel mastery, cloud backup, and cyber safety.',
                badgeColor: '#3B82F6',
                icon: <Monitor size={20} color="#60A5FA" />
              },
              {
                id: 'CRS-CCTV-103',
                title: 'CCTV & IP Surveillance Technician',
                titleHi: 'सीसीटीवी एवं सर्विलांस इंस्टालेशन',
                tag: 'Field Hardware • 4 Modules',
                desc: 'Coaxial & Cat6 PoE topology, NVR/DVR storage calculations, RTSP mobile streaming, and troubleshooting field networks.',
                badgeColor: '#F59E0B',
                icon: <ShieldCheck size={20} color="#FBBF24" />
              },
              {
                id: 'CRS-MKT-104',
                title: 'Digital Marketing & WhatsApp Specialist',
                titleHi: 'डिजिटल मार्केटिंग व व्हाट्सऐप ऑटोमेशन',
                tag: 'Revenue & Growth • 4 Modules',
                desc: 'Meta & Google ad funnels, WhatsApp Cloud API webhooks, local SEO business mapping, and conversion analytics.',
                badgeColor: '#8B5CF6',
                icon: <Zap size={20} color="#C084FC" />
              }
            ].map((course, idx) => (
              <div
                key={idx}
                onClick={() => navigate('/portal/student')}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = '#60A5FA';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {course.icon}
                    </div>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.6rem',
                      borderRadius: '999px',
                      background: 'rgba(255, 255, 255, 0.12)',
                      color: '#E2E8F0'
                    }}>
                      {course.tag}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#93C5FD', marginBottom: '0.25rem' }}>
                    {course.id}
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                    {language === 'hi' ? course.titleHi : course.title}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: '#CBD5E1', lineHeight: 1.5, marginBottom: '1rem' }}>
                    {course.desc}
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: '#F59E0B'
                }}>
                  <span>Open Interactive Lab & Quiz</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            ))}
          </div>

          {/* Footer Callout */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.25)',
            borderRadius: '12px',
            padding: '1rem 1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.85rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#E2E8F0' }}>
              <Award size={18} color="#F59E0B" />
              <span>
                <strong>Statutory Standard:</strong> ADCS Academy certificates are certified private vocational credentials with unique cryptographic hashes (SHA-256) and live verification URLs.
              </span>
            </div>
            <Link to="/portal/student" style={{ color: '#93C5FD', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span>View All 16 Modules in Student Portal</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. FRANCHISE OPPORTUNITY BANNER */}
      <section className="container-wide">
        <div style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          padding: '3rem 2.5rem',
          border: '1.5px solid #FDE68A',
          boxShadow: '0 12px 40px rgba(245, 158, 11, 0.08)',
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '2.5rem',
          alignItems: 'center',
        }} className="hero-grid">
          <div>
            <span className="badge badge-gold">FRANCHISE SUPER NETWORK</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0A192F', marginTop: '0.5rem', marginBottom: '0.75rem' }}>
              Start Your Own Akul Dravin Digital Center
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748B', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Transform your cyber café or start a brand-new digital branch. Provide 150+ citizen, business, courier, finance, and CCTV services with comprehensive software, brand kit, and guaranteed commission payouts.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => navigate('/franchise')}
                className="btn-primary"
              >
                <span>Apply for Franchise</span>
                <ArrowRight size={15} />
              </button>
              <button
                onClick={() => navigate('/center/dashboard')}
                className="btn-secondary"
              >
                <span>View VLE Counter Console</span>
              </button>
            </div>
          </div>

          <div style={{
            background: '#F8FAFC',
            borderRadius: '16px',
            padding: '1.5rem',
            border: '1px solid #E2E8F0',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}>
            <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0A192F' }}>
              FRANCHISE OPERATING METRICS:
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: '#64748B' }}>Average Monthly Center Revenue:</span>
              <span style={{ fontWeight: 700, color: '#059669' }}>₹1,25,000 - ₹3,50,000</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: '#64748B' }}>Services Supported:</span>
              <span style={{ fontWeight: 700, color: '#0A192F' }}>150+ Certified Verticals</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: '#64748B' }}>Territory Exclusivity:</span>
              <span style={{ fontWeight: 700, color: '#1D4ED8' }}>PIN Code Protected</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: '#64748B' }}>Software Provided:</span>
              <span style={{ fontWeight: 700, color: '#0A192F' }}>VLE POS + PC Billing + ERP</span>
            </div>
          </div>
        </div>
      </section>

      {/* Inline styles for responsive hero */}
      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};
