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
  FileCheck,
  Landmark,
  Monitor,
  Briefcase,
  Zap,
  Building2,
  Hammer,
  Truck,
  Coins,
  Shield,
  Code2
} from 'lucide-react';

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
    t
  } = useApp();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const primaryNavItems = [
    { label: language === 'en' ? 'Home' : 'होम', path: '/' },
    { label: language === 'en' ? 'Government' : 'सरकारी सेवा', path: '/government', icon: <Landmark size={15} /> },
    { label: language === 'en' ? 'Cyber Café' : 'साइबर कैफ़े', path: '/cyber-cafe', icon: <Monitor size={15} /> },
    { label: language === 'en' ? 'Business' : 'व्यापार', path: '/business', icon: <Briefcase size={15} /> },
    { label: language === 'en' ? 'Property & Rent' : 'प्रॉपर्टी व किराया', path: '/property', icon: <Building2 size={15} /> },
    { label: language === 'en' ? 'Construction' : 'कंस्ट्रक्शन', path: '/construction', icon: <Hammer size={15} /> },
    { label: language === 'en' ? 'CCTV' : 'सीसीटीवी', path: '/cctv', icon: <ShieldCheck size={15} /> },
    { label: language === 'en' ? 'Courier' : 'कूरियर', path: '/courier', icon: <Truck size={15} /> },
    { label: language === 'en' ? 'Finance & Insurance' : 'लोन व बीमा', path: '/finance', icon: <Coins size={15} /> },
    { label: language === 'en' ? 'Astrology & Kundli' : 'ज्योतिष व कुंडली', path: '/astrology', icon: <Sparkles size={15} /> },
    { label: language === 'en' ? 'IT & SaaS' : 'आईटी एवं सॉफ्टवेयर', path: '/website-it', icon: <Code2 size={15} /> },
    { label: language === 'en' ? 'Franchise' : 'फ़्रैंचाइज़ी', path: '/franchise' },
  ];

  const megaMenuServices = [
    { name: 'CSC Digital Seva (VLE)', path: '/digitalseva', desc: 'CSC Connect SSO, DigiPay AEPS, Tele-Law & PMGDISHA' },
    { name: 'CSC Main Portal (e-Gov)', path: '/csc', desc: 'National CSC Schemes & VLE Registration with TEC' },
    { name: 'Vedic Astrology & Kundli', path: '/astrology', desc: 'Janam Kundli, 36 Guna Milan, Rashifal, Astrologers, Store' },
    { name: 'Government Seva', path: '/government', desc: 'Aadhaar, PAN, Passport, Certificates' },
    { name: 'Cyber Café Station', path: '/cyber-cafe', desc: 'PC access, Online Forms, Xerox, Printing' },
    { name: 'Business Setup', path: '/business', desc: 'Pvt Ltd, LLP, GST, MSME, DSC, Bookkeeping' },
    { name: 'Document Vault', path: '/documents', desc: 'Document Center & PDF Tools (Demo)' },
    { name: 'Recharge & Bills', path: '/bills', desc: 'Electricity, FASTag, Gas, Mobile BBPS' },
    { name: 'Travel Super App', path: '/travel', desc: 'Flights, Tatkal Trains, Buses, Hotels' },
    { name: 'Property Hub', path: '/property', desc: 'Buy, Sell, Plots, Commercial spaces' },
    { name: 'Rental Lifecycle', path: '/rental', desc: 'Rent agreements, police verification, rent pay' },
    { name: 'Construction & BOQ', path: '/construction', desc: 'Turnkey villa builder, 2D/3D house plans' },
    { name: 'CCTV & Security', path: '/cctv', desc: 'HD/IP Cameras, NVR, DVR, AMC maintenance' },
    { name: 'Courier & Logistics', path: '/courier', desc: 'Express air & surface parcel booking, live AWB' },
    { name: 'Loans & Mortgages', path: '/finance', desc: 'Business, Personal, Home, Mudra loans' },
    { name: 'Insurance Desk', path: '/insurance', desc: 'Health mediclaim, Term life, Motor cover' },
    { name: 'IT, Cloud & SaaS', path: '/website-it', desc: 'Domain, Hosting, Custom Apps, CRM/ERP' },
    { name: 'Professional Consulting', path: '/consulting', desc: 'CA, CS, Legal and Startup advisors' },
    { name: 'Education & Jobs', path: '/education', desc: 'Govt exam forms, admissions, admit cards' },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 90,
      background: 'rgba(255, 255, 255, 0.94)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid #E2E8F0',
      boxShadow: '0 4px 20px rgba(10, 25, 47, 0.05)',
    }}>
      <div className="container-wide" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '74px',
      }}>
        {/* Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #0A192F 0%, #1D4ED8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            boxShadow: '0 4px 14px rgba(29, 78, 216, 0.3)',
            border: '1.5px solid rgba(245, 158, 11, 0.6)',
            position: 'relative',
          }}>
            <span style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: '1.3rem', color: '#F59E0B' }}>AD</span>
            <div style={{
              position: 'absolute',
              bottom: '-2px',
              right: '-2px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#059669',
              border: '2px solid #FFFFFF',
            }} />
          </div>

          <div>
            <div style={{
              fontFamily: 'Outfit',
              fontWeight: 800,
              fontSize: '1.18rem',
              letterSpacing: '-0.02em',
              color: '#0A192F',
              lineHeight: 1.1,
            }}>
              AKUL DRAVIN
            </div>
            <div style={{
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: '#1D4ED8',
              textTransform: 'uppercase',
            }}>
              DIGITAL SERVICES
            </div>
            <div style={{
              fontSize: '0.64rem',
              color: '#D97706',
              fontWeight: 600,
              fontFamily: 'Noto Sans Devanagari, sans-serif',
            }}>
              {language === 'hi' ? 'हर काम डिजिटल • हर समाधान एक जगह' : 'One Platform. Every Service.'}
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav style={{
          display: 'none',
          alignItems: 'center',
          gap: '0.4rem',
        }} className="desktop-nav">
          {/* Mega Menu Dropdown for All Services */}
          <div 
            style={{ position: 'relative' }}
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <button 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.5rem 0.8rem',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '0.88rem',
                color: '#0A192F',
                background: servicesDropdownOpen ? '#F1F5F9' : 'transparent',
                transition: 'all 0.15s ease',
              }}
            >
              <span>{language === 'en' ? 'All Services' : 'सभी सेवाएँ'}</span>
              <ChevronDown size={14} style={{ transform: servicesDropdownOpen ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
            </button>

            {servicesDropdownOpen && (
              <div 
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '-120px',
                  width: '680px',
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '1.25rem',
                  boxShadow: '0 20px 50px rgba(10, 25, 47, 0.15)',
                  border: '1px solid #E2E8F0',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '0.75rem',
                  zIndex: 1000,
                  animation: 'fadeIn 0.2s ease-out',
                }}
              >
                {megaMenuServices.map(item => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setServicesDropdownOpen(false)}
                    style={{
                      padding: '0.65rem 0.85rem',
                      borderRadius: '10px',
                      textDecoration: 'none',
                      transition: 'all 0.15s ease',
                      border: '1px solid transparent',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#F8FAFC';
                      e.currentTarget.style.borderColor = '#CBD5E1';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.borderColor = 'transparent';
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#0A192F' }}>{item.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{item.desc}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {primaryNavItems.slice(1, 7).map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  padding: '0.5rem 0.75rem',
                  borderRadius: '8px',
                  fontSize: '0.86rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#1D4ED8' : '#334155',
                  background: isActive ? '#EFF6FF' : 'transparent',
                  transition: 'all 0.15s ease',
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
              padding: '0.5rem 0.75rem',
              borderRadius: '8px',
              fontSize: '0.86rem',
              fontWeight: 500,
              color: '#334155',
            }}
          >
            {language === 'en' ? 'Pricing' : 'शुल्क'}
          </Link>
        </nav>

        {/* Action Controls: Smart Search, Track, Ask AI, Cart, Login */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          {/* AI Smart Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#F1F5F9',
              border: '1px solid #CBD5E1',
              padding: '0.45rem 0.85rem',
              borderRadius: '10px',
              color: '#475569',
              fontSize: '0.84rem',
              transition: 'all 0.15s ease',
            }}
            title="Search any service / खोजें"
          >
            <Search size={15} color="#1D4ED8" />
            <span style={{ display: 'none' }} className="search-text-desktop">
              {language === 'hi' ? 'खोजें...' : 'Search...'}
            </span>
            <kbd style={{
              fontSize: '0.7rem',
              background: '#E2E8F0',
              padding: '0.1rem 0.35rem',
              borderRadius: '4px',
              color: '#475569',
              fontWeight: 600,
            }}>
              ⌘K
            </kbd>
          </button>

          {/* Track Application / Order */}
          <button
            onClick={() => setIsTrackerOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.45rem 0.75rem',
              borderRadius: '8px',
              fontSize: '0.84rem',
              fontWeight: 600,
              color: '#0A192F',
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
            }}
          >
            <Compass size={15} color="#D97706" />
            <span className="hide-mobile">{language === 'en' ? 'Track' : 'ट्रैक'}</span>
          </button>

          {/* Ask QUANTUM AI Button */}
          <button
            onClick={() => setIsQuantumAIOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'linear-gradient(135deg, #0A192F 0%, #1E3A8A 100%)',
              color: '#F59E0B',
              padding: '0.45rem 0.9rem',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '0.85rem',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              boxShadow: '0 2px 10px rgba(10, 25, 47, 0.15)',
              transition: 'all 0.2s ease',
            }}
          >
            <Sparkles size={14} className="animate-pulse-glow" />
            <span className="hide-mobile">QUANTUM AI</span>
          </button>

          {/* Unified Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              position: 'relative',
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: '#F1F5F9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0A192F',
              border: '1px solid #E2E8F0',
            }}
            title="View Cart"
          >
            <ShoppingCart size={17} />
            {cart.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: '#D97706',
                color: '#FFFFFF',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '0.7rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(217, 119, 6, 0.4)',
              }}>
                {cart.length}
              </span>
            )}
          </button>

          {/* Role Portal / Login Button */}
          <button
            onClick={() => {
              if (currentRole === 'customer') {
                navigate('/customer/dashboard');
              } else if (currentRole === 'admin') {
                navigate('/admin/dashboard');
              } else {
                navigate(`/${currentRole === 'cafe_operator' ? 'cyber-cafe/operator' : currentRole + '/dashboard'}`);
              }
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.85rem',
              borderRadius: '10px',
              background: '#EFF6FF',
              color: '#1D4ED8',
              fontWeight: 600,
              fontSize: '0.84rem',
              border: '1px solid #BFDBFE',
            }}
          >
            <UserCircle2 size={16} />
            <span className="hide-mobile" style={{ textTransform: 'capitalize' }}>
              {currentRole === 'cafe_operator' ? 'Cyber Café' : currentRole}
            </span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            style={{
              display: 'none',
              padding: '0.4rem',
              borderRadius: '8px',
              color: '#0A192F',
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          background: '#FFFFFF',
          borderTop: '1px solid #E2E8F0',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}>
          {primaryNavItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                padding: '0.65rem 0.85rem',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '0.92rem',
                color: '#0A192F',
                background: '#F8FAFC',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
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
              padding: '0.65rem 0.85rem',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.92rem',
              color: '#0A192F',
              background: '#F8FAFC',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <MapPin size={16} color="#D97706" />
            Find Nearest Center
          </Link>
        </div>
      )}

      {/* Inline styles for responsive rules */}
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
