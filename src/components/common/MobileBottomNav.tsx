import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../store/AppContext';
import { Home, Grid, Compass, Sparkles, User } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsQuantumAIOpen, setIsTrackerOpen, currentRole, language, theme } = useApp();
  const isDark = theme === 'dark';

  const profileRouteMap: Record<string, string> = {
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

  const navItems = [
    { label: language === 'hi' ? 'होम' : 'Home', path: '/', icon: <Home size={19} /> },
    { label: language === 'hi' ? 'सेवाएँ' : 'Services', path: '/services', icon: <Grid size={19} /> },
    { label: language === 'hi' ? 'ट्रैक' : 'Track', action: () => setIsTrackerOpen(true), icon: <Compass size={19} /> },
    { label: 'QUANTUM AI', action: () => setIsQuantumAIOpen(true), icon: <Sparkles size={19} />, isAI: true },
    {
      label: language === 'hi' ? 'पोर्टल' : 'Portal',
      path: profileRouteMap[currentRole] || '/customer/dashboard',
      icon: <User size={19} />,
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="mobile-bottom-nav adcs-no-print"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '64px',
        background: isDark ? '#061A36' : 'rgba(255, 255, 255, 0.98)',
        borderTop: isDark ? '1px solid #1A365D' : '1px solid #DCE4EF',
        boxShadow: '0 -4px 18px rgba(3, 17, 38, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: 89,
      }}
    >
      {navItems.map((item, idx) => {
        const isActive = item.path ? location.pathname === item.path : false;
        return (
          <button
            key={idx}
            type="button"
            onClick={() => {
              if (item.action) item.action();
              else if (item.path) navigate(item.path);
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.2rem',
              flex: 1,
              height: '100%',
              color: item.isAI
                ? (isDark ? '#F3D477' : '#061A36')
                : isActive
                  ? '#075ACB'
                  : (isDark ? '#CBD5E1' : '#55677D'),
              fontWeight: isActive || item.isAI ? 700 : 500,
              fontSize: '0.68rem',
            }}
          >
            {item.isAI ? (
              <div
                style={{
                  background: 'linear-gradient(135deg, #061A36 0%, #075ACB 100%)',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#F3D477',
                  border: '1px solid #D6A12B',
                }}
              >
                <Sparkles size={15} />
              </div>
            ) : (
              item.icon
            )}
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
