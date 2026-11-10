import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  Sparkles, 
  Compass, 
  Heart, 
  Sun, 
  Calendar, 
  Users, 
  ShoppingBag, 
  Layers, 
  Hash, 
  Gem, 
  BookOpen, 
  MessageSquare, 
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  Award,
  Store
} from 'lucide-react';

export const AstroHeaderNav: React.FC = () => {
  const navItems = [
    { label: 'एस्ट्रो हब', path: '/astrology', icon: <Sparkles size={14} /> },
    { label: 'कार्यप्रणाली', path: '/astrology/process', icon: <CheckCircle2 size={14} /> },
    { label: 'जन्म कुंडली', path: '/astrology/kundli', icon: <Compass size={14} /> },
    { label: '36 गुण मिलान', path: '/astrology/matching', icon: <Heart size={14} /> },
    { label: 'प्रमाण-पत्र', path: '/astrology/certificate', icon: <Award size={14} /> },
    { label: 'एजेंट पोर्टल', path: '/astrology/agent', icon: <Store size={14} /> },
    { label: 'दैनिक राशिफल', path: '/astrology/rashifal', icon: <Sun size={14} /> },
    { label: 'पंचांग व मुहूर्त', path: '/astrology/panchang', icon: <Calendar size={14} /> },
    { label: 'ज्योतिषी परामर्श', path: '/astrology/astrologers', icon: <Users size={14} /> },
    { label: 'एस्ट्रो स्टोर', path: '/astrology/store', icon: <ShoppingBag size={14} /> },
    { label: 'टैरो कार्ड', path: '/astrology/tarot', icon: <Layers size={14} /> },
    { label: 'अंक ज्योतिष', path: '/astrology/numerology', icon: <Hash size={14} /> },
    { label: 'रत्न व उपाय', path: '/astrology/gemstones', icon: <Gem size={14} /> },
    { label: 'ज्योतिष ब्लॉग', path: '/astrology/blog', icon: <BookOpen size={14} /> },
    { label: 'प्रश्न पूछें', path: '/astrology/contact', icon: <MessageSquare size={14} /> },
    { label: 'एडमिन', path: '/astrology/admin', icon: <ShieldAlert size={14} /> }
  ];

  return (
    <div style={{
      background: 'linear-gradient(90deg, #090E17 0%, #151D33 50%, #0B1120 100%)',
      borderBottom: '1px solid rgba(245, 158, 11, 0.25)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
      position: 'sticky',
      top: '72px',
      zIndex: 40,
      backdropFilter: 'blur(12px)'
    }}>
      <div style={{
        maxWidth: '1360px',
        margin: '0 auto',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px'
      }}>
        {/* Left Branding Badge */}
        <Link 
          to="/astrology" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            flexShrink: 0,
            textDecoration: 'none'
          }}
        >
          <span style={{
            fontSize: '18px',
            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
            borderRadius: '8px',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            boxShadow: '0 0 12px rgba(245, 158, 11, 0.4)'
          }}>
            🕉️
          </span>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '14px', fontWeight: 800, color: '#FDE68A', letterSpacing: '0.5px' }}>
              ज्योतिष महामंच
            </span>
            <span style={{ fontSize: '10px', color: '#94A3B8' }}>
              Vedic Astrology Suite
            </span>
          </div>
        </Link>

        {/* Scrollable Nav Pills */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          paddingBottom: '2px',
          scrollbarWidth: 'none'
        }}>
          {navItems.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.path}
              end={item.path === '/astrology'}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                background: isActive 
                  ? 'linear-gradient(135deg, #D97706 0%, #B45309 100%)' 
                  : 'rgba(255, 255, 255, 0.05)',
                color: isActive ? '#FFFFFF' : '#CBD5E1',
                border: isActive 
                  ? '1px solid #F59E0B' 
                  : '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: isActive ? '0 0 12px rgba(245, 158, 11, 0.35)' : 'none'
              })}
            >
              <span style={{ opacity: 0.9 }}>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>

        {/* Right Quick Action: Call / Chat */}
        <Link
          to="/astrology/astrologers"
          style={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
            color: '#FFFFFF',
            padding: '6px 14px',
            borderRadius: '999px',
            fontSize: '11px',
            fontWeight: 700,
            textDecoration: 'none',
            border: '1px solid #10B981',
            boxShadow: '0 0 12px rgba(16, 185, 129, 0.3)'
          }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34D399', display: 'inline-block' }} />
          लाइव परामर्श
          <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
};
