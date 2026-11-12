import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../store/AppContext';
import {
  Search,
  Sparkles,
  ShoppingCart,
  MapPin,
  ChevronDown,
  Menu,
  X,
  ShieldCheck,
  Compass,
  UserCircle2,
  Landmark,
  Monitor,
  Briefcase,
  Building2,
  Hammer,
  Truck,
  Coins,
  Code2,
} from 'lucide-react';
import { ADCSLogo } from '../branding';
import { ADCS_BRAND_IDENTITY } from '../../config/brandAssets';

export const GlassNavbar: React.FC = () => {
  const {
    cart,
    setIsSearchOpen,
    setIsCartOpen,
    setIsQuantumAIOpen,
    setIsTrackerOpen,
    setIsAuthModalOpen,
    currentRole,
    language,
    theme,
    whiteLabelConfig,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isDark = theme === 'dark';

  const primaryNavItems = [
    { label: language === 'en' ? 'Home' : 'होम', path: '/' },
    { label: language === 'en' ? 'All Services' : 'सेवाएँ', path: '/services', icon: <Landmark size={15} /> },
    { label: language === 'en' ? 'Government' : 'सरकारी सेवा', path: '/government', icon: <Landmark size={15} /> },
    { label: language === 'en' ? 'Cyber Café' : 'साइबर कैफ़े', path: '/cyber-cafe', icon: <Monitor size={15} /> },
    { label: language === 'en' ? 'Business' : 'व्यापार', path: '/business', icon: <Briefcase size={15} /> },
    { label: language === 'en' ? 'Academy' : 'अकादमी', path: '/portal/student', icon: <Code2 size={15} /> },
    { label: language === 'en' ? 'Franchise' : 'फ़्रैंचाइज़ी', path: '/franchise', icon: <Building2 size={15} /> },
    { label: language === 'en' ? 'Verify Cert' : 'प्रमाणपत्र जांच', path: '/verify-certificate', icon: <ShieldCheck size={15} /> },
    { label: language === 'en' ? 'Astrology' : 'ज्योतिष', path: '/astrology', icon: <Sparkles size={15} /> },
  ];

  const megaMenuServices = [
    { name: 'ADCS Portal (VLE / Kendra)', path: '/digitalseva', desc: 'ADCS Connect SSO, DigiPay AEPS, Tele-Law & PMGDISHA' },
    { name: 'ADCS Hub (Digital Seva)', path: '/csc', desc: 'Akul Dravin Digital Services Kendra & Partner Desk' },
    { name: 'Government & Citizen Docs', path: '/government', desc: 'PAN, Passport, Birth/Domicile & Assisted Filing' },
    { name: 'Cyber Café Station', path: '/cyber-cafe', desc: 'PC Booking, Online Forms, Scanning & Printing' },
    { name: 'Business Setup & Compliance', path: '/business', desc: 'Pvt Ltd, LLP, GST, MSME, DSC & Accounting' },
    { name: 'Document Vault & Studio', path: '/documents', desc: 'Certificates, Official Letterheads & Verified PDFs' },
    { name: 'Recharge & Utility Bills', path: '/bills', desc: 'Electricity, FASTag, Gas & Mobile BBPS Receipts' },
    { name: 'Travel & Ticketing Desk', path: '/travel', desc: 'Flights, Rail Reservations, Buses & Hotels' },
    { name: 'Property & Rental Suite', path: '/property', desc: 'Verified Listings, Rent Agreements & Police Verification' },
    { name: 'Construction & BOQ', path: '/construction', desc: 'Turnkey Villa Builder & Architectural Plans' },
    { name: 'CCTV & Security Systems', path: '/cctv', desc: 'HD/IP Surveillance, NVR, DVR & AMC Service' },
    { name: 'Courier & Logistics', path: '/courier', desc: 'Express Air/Surface Dispatch & Live AWB Tracking' },
    { name: 'Loans & Insurance Desk', path: '/finance', desc: 'Partner Banking, Business Finance & Insurance' },
    { name: 'IT, Cloud & Enterprise SaaS', path: '/website-it', desc: 'Domains, Websites, CRM, HRMS & ERP Ledgers' },
    { name: 'ADCS Academy LMS', path: '/portal/student', desc: 'Certification Tracks across AI, Computer Pro, CCTV & Marketing' },
    { name: 'Certificate Verification Registry', path: '/verify-certificate', desc: 'QR & Hash Lookup for Issued ADCS Credentials' },
    { name: 'Vedic Astrology & Kundli', path: '/astrology', desc: 'Janam Kundli, 36 Guna Milan, Rashifal & Reports' },
    { name: 'Professional Consulting & Jobs', path: '/consulting', desc: 'CA, CS, Advocate Consultation & Career Portal' },
  ];

  const handlePortalNavigate = () => {
    const routeMap: Record<string, string> = {
      customer: '/customer/dashboard',
      vle: '/digitalseva',
      cafe_operator: '/cyber-cafe/operator',
      franchise: '/franchise/dashboard',
      distributor: '/distributor/dashboard',
      affiliate: '/affiliate/dashboard',
      partner: '/partner/dashboard',
      advocate: '/portal/advocate',
      instructor: '/portal/instructor',
      student: '/portal/student',
      technician: '/portal/technician',
      executive: '/support-portal',
      finance: '/finance-portal',
      employee: '/employee/dashboard',
      admin: '/admin/dashboard',
    };
    navigate(routeMap[currentRole] || '/customer/dashboard');
  };

  return (
    <header
      className="adcs-no-print"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 90,
        background: isDark ? 'rgba(6, 26, 54, 0.96)' : 'rgba(255, 255, 255, 0.97)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: isDark ? '1px solid rgba(214, 161, 43, 0.25)' : '1px solid #DCE4EF',
        boxShadow: 'var(--adcs-shadow-sm)',
      }}
    >
      <div
        className="container-wide"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
          height: '74px',
        }}
      >
        {/* Official ADCS Master Brand Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.7rem',
            textDecoration: 'none',
            flexShrink: 0,
          }}
          aria-label={ADCS_BRAND_IDENTITY.legalName}
        >
          <ADCSLogo
            variant="header"
            theme={isDark ? 'dark' : 'light'}
            customSrc={isDark ? whiteLabelConfig.darkLogoUrl : undefined}
            height={52}
          />
          <div style={{ display: 'none' }} className="brand-wordmark-meta">
            <div style={{ fontWeight: 800, fontSize: '0.94rem', color: isDark ? '#FFFFFF' : '#061A36' }}>
              {whiteLabelConfig.shortName || ADCS_BRAND_IDENTITY.shortName}
            </div>
            <div style={{ fontSize: '0.62rem', fontWeight: 700, color: isDark ? '#F3D477' : '#075ACB' }}>
              {ADCS_BRAND_IDENTITY.heroHeadline}
            </div>
          </div>
        </Link>

        {/* Desktop Primary Navigation */}
        <nav
          aria-label="Primary Navigation"
          style={{ display: 'none', alignItems: 'center', gap: '0.18rem', minWidth: 0 }}
          className="desktop-nav"
        >
          <div
            style={{ position: 'relative', flexShrink: 0 }}
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => setServicesDropdownOpen((p) => !p)}
              aria-expanded={servicesDropdownOpen}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.48rem 0.7rem',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.84rem',
                color: isDark ? '#FFFFFF' : '#061A36',
                background: servicesDropdownOpen ? (isDark ? '#0B2447' : '#EDF2F9') : 'transparent',
                whiteSpace: 'nowrap',
              }}
            >
              <span>{language === 'en' ? '16 Sectors' : '16 सेक्टर'}</span>
              <ChevronDown size={14} style={{ transform: servicesDropdownOpen ? 'rotate(180deg)' : 'none', transition: '0.18s' }} />
            </button>

            {servicesDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '-80px',
                  width: 'min(700px, 90vw)',
                  background: 'var(--adcs-surface)',
                  borderRadius: '14px',
                  padding: '1.15rem',
                  boxShadow: 'var(--adcs-shadow-xl)',
                  border: '1px solid var(--adcs-border)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '0.55rem',
                  zIndex: 1000,
                }}
              >
                {megaMenuServices.map((item) => (
                  <Link
                    key={item.path + item.name}
                    to={item.path}
                    onClick={() => setServicesDropdownOpen(false)}
                    style={{
                      padding: '0.6rem 0.8rem',
                      borderRadius: '8px',
                      border: '1px solid transparent',
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.84rem', color: 'var(--adcs-text)' }}>{item.name}</div>
                    <div style={{ fontSize: '0.73rem', color: 'var(--adcs-muted)' }}>{item.desc}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {primaryNavItems.slice(1, 6).map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  padding: '0.46rem 0.62rem',
                  borderRadius: '8px',
                  fontSize: '0.83rem',
                  fontWeight: isActive ? 700 : 600,
                  color: isActive ? '#FFFFFF' : isDark ? '#DCE7F5' : '#14243A',
                  background: isActive ? '#075ACB' : 'transparent',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.label}
              </Link>
            );
          })}

          <Link
            to="/pricing"
            style={{
              padding: '0.46rem 0.62rem',
              borderRadius: '8px',
              fontSize: '0.83rem',
              fontWeight: location.pathname === '/pricing' ? 700 : 600,
              color: location.pathname === '/pricing' ? '#FFFFFF' : isDark ? '#DCE7F5' : '#14243A',
              background: location.pathname === '/pricing' ? '#075ACB' : 'transparent',
              whiteSpace: 'nowrap',
            }}
          >
            {language === 'en' ? 'Pricing' : 'शुल्क'}
          </Link>
        </nav>

        {/* Action Controls: Search, Track, QUANTUM AI, Cart, Portal/Login */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexShrink: 0 }}>
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: isDark ? '#0B2447' : '#F5F8FC',
              border: isDark ? '1px solid #274A7A' : '1px solid #DCE4EF',
              padding: '0.42rem 0.72rem',
              borderRadius: '8px',
              color: isDark ? '#E2E8F0' : '#334861',
              fontSize: '0.82rem',
              whiteSpace: 'nowrap',
            }}
            title="Search any service / खोजें"
          >
            <Search size={15} color="#0878F9" />
            <span style={{ display: 'none' }} className="search-text-desktop">
              {language === 'hi' ? 'खोजें...' : 'Search...'}
            </span>
            <kbd
              className="hide-mobile"
              style={{
                fontSize: '0.7rem',
                background: isDark ? '#061A36' : '#DCE4EF',
                padding: '0.1rem 0.35rem',
                borderRadius: '4px',
                color: isDark ? '#CBD5E1' : '#334861',
                fontWeight: 700,
              }}
            >
              ⌘K
            </kbd>
          </button>

          <button
            type="button"
            onClick={() => setIsTrackerOpen(true)}
            className="hide-mobile"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.45rem 0.75rem',
              borderRadius: '8px',
              fontSize: '0.83rem',
              fontWeight: 700,
              color: isDark ? '#FFFFFF' : '#061A36',
              background: isDark ? '#0B2447' : '#F5F8FC',
              border: isDark ? '1px solid #274A7A' : '1px solid #DCE4EF',
            }}
          >
            <Compass size={15} color="#D6A12B" />
            <span className="hide-mobile">{language === 'en' ? 'Track' : 'ट्रैक'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsQuantumAIOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'linear-gradient(135deg, #061A36 0%, #075ACB 100%)',
              color: '#F3D477',
              padding: '0.46rem 0.88rem',
              borderRadius: '8px',
              fontWeight: 800,
              fontSize: '0.82rem',
              border: '1px solid rgba(214, 161, 43, 0.55)',
            }}
          >
            <Sparkles size={14} />
            <span className="hide-mobile">QUANTUM AI</span>
          </button>

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            style={{
              position: 'relative',
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: isDark ? '#0B2447' : '#F5F8FC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isDark ? '#FFFFFF' : '#061A36',
              border: isDark ? '1px solid #274A7A' : '1px solid #DCE4EF',
            }}
            aria-label="Open Service Cart"
          >
            <ShoppingCart size={17} />
            {cart.length > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  background: '#075ACB',
                  color: '#FFFFFF',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {cart.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={handlePortalNavigate}
            onContextMenu={(e) => {
              e.preventDefault();
              setIsAuthModalOpen(true);
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.46rem 0.88rem',
              borderRadius: '8px',
              background: '#075ACB',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.83rem',
              border: '1px solid #064BA8',
            }}
            title="Open Active Workspace Portal"
          >
            <UserCircle2 size={16} />
            <span className="hide-mobile" style={{ textTransform: 'capitalize' }}>
              {currentRole === 'cafe_operator' ? 'Cyber Café' : currentRole}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setIsAuthModalOpen(true)}
            className="hide-mobile"
            style={{
              padding: '0.46rem 0.78rem',
              borderRadius: '8px',
              border: isDark ? '1px solid rgba(243, 212, 119, 0.5)' : '1px solid #DCE4EF',
              color: isDark ? '#F3D477' : '#061A36',
              background: 'transparent',
              fontWeight: 700,
              fontSize: '0.82rem',
            }}
          >
            {language === 'hi' ? 'लॉगिन' : 'Login'}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            style={{
              display: 'none',
              padding: '0.42rem',
              borderRadius: '8px',
              color: isDark ? '#FFFFFF' : '#061A36',
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            background: 'var(--adcs-surface)',
            borderTop: '1px solid var(--adcs-border)',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.45rem',
          }}
        >
          {primaryNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                padding: '0.7rem 0.9rem',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '0.92rem',
                color: 'var(--adcs-text)',
                background: 'var(--adcs-background)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.55rem',
              }}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
          <Link
            to="/locations"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              padding: '0.7rem 0.9rem',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.92rem',
              color: 'var(--adcs-text)',
              background: 'var(--adcs-background)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.55rem',
            }}
          >
            <MapPin size={16} color="#075ACB" />
            Find Nearest Center
          </Link>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              setIsAuthModalOpen(true);
            }}
            className="btn-primary"
            style={{ width: '100%', marginTop: '0.35rem' }}
          >
            Login / Switch Workspace
          </button>
        </div>
      )}

      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav { display: flex !important; }
          .search-text-desktop { display: inline !important; }
        }
        @media (max-width: 1023px) {
          .mobile-menu-btn { display: flex !important; }
          .hide-mobile { display: none !important; }
        }
      `}</style>
    </header>
  );
};
