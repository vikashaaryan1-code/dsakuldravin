import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../store/AppContext';
import { 
  Home, 
  Grid, 
  Compass, 
  Sparkles, 
  User, 
  PlusCircle, 
  ShoppingCart
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    setIsQuantumAIOpen, 
    setIsTrackerOpen, 
    cart, 
    setIsCartOpen,
    currentRole,
    language 
  } = useApp();

  const navItems = [
    { label: language === 'hi' ? 'होम' : 'Home', path: '/', icon: <Home size={19} /> },
    { label: language === 'hi' ? 'सेवाएँ' : 'Services', path: '/services', icon: <Grid size={19} /> },
    { label: language === 'hi' ? 'ट्रैक' : 'Orders', action: () => setIsTrackerOpen(true), icon: <Compass size={19} /> },
    { label: 'QUANTUM AI', action: () => setIsQuantumAIOpen(true), icon: <Sparkles size={19} color="#F59E0B" />, isAI: true },
    { 
      label: language === 'hi' ? 'प्रोफ़ाइल' : 'Profile', 
      path: currentRole === 'customer' ? '/customer/dashboard' : '/admin/dashboard', 
      icon: <User size={19} /> 
    },
  ];

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '64px',
      background: 'rgba(255, 255, 255, 0.96)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderTop: '1px solid #E2E8F0',
      boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.06)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      zIndex: 89,
    }} className="mobile-bottom-nav">
      {navItems.map((item, idx) => {
        const isActive = item.path ? location.pathname === item.path : false;

        return (
          <button
            key={idx}
            onClick={() => {
              if (item.action) {
                item.action();
              } else if (item.path) {
                navigate(item.path);
              }
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.2rem',
              flex: 1,
              height: '100%',
              color: item.isAI ? '#D97706' : isActive ? '#1D4ED8' : '#64748B',
              fontWeight: isActive ? 700 : 500,
              fontSize: '0.68rem',
              position: 'relative',
            }}
          >
            {item.isAI ? (
              <div style={{
                background: 'linear-gradient(135deg, #0A192F 0%, #1D4ED8 100%)',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#F59E0B',
                boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)',
              }}>
                <Sparkles size={16} />
              </div>
            ) : (
              item.icon
            )}
            <span>{item.label}</span>
          </button>
        );
      })}

      <style>{`
        @media (min-width: 1024px) {
          .mobile-bottom-nav { display: none !important; }
        }
      `}</style>
    </div>
  );
};
