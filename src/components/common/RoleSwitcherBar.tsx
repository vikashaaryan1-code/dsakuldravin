import React from 'react';
import { useApp } from '../../store/AppContext';
import { UserRole } from '../../types';
import { 
  User, 
  Store, 
  Monitor, 
  Building, 
  UserCheck, 
  Briefcase, 
  ShieldAlert, 
  Wallet,
  Globe2,
  Bell,
  Network,
  Gift
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const RoleSwitcherBar: React.FC = () => {
  const { 
    currentRole, 
    setCurrentRole, 
    walletBalance, 
    language, 
    setLanguage,
    t,
    toasts
  } = useApp();
  const navigate = useNavigate();

  const roles: { role: UserRole; label: string; icon: React.ReactNode; path: string }[] = [
    { role: 'customer', label: t.roleCustomer, icon: <User size={13} />, path: '/customer/dashboard' },
    { role: 'vle', label: 'Digital Seva (CSC VLE)', icon: <Store size={13} />, path: '/digitalseva' },
    { role: 'cafe_operator', label: t.roleCafe, icon: <Monitor size={13} />, path: '/cyber-cafe/operator' },
    { role: 'franchise', label: t.roleFranchise, icon: <Building size={13} />, path: '/franchise/dashboard' },
    { role: 'distributor', label: 'Distributor Hub', icon: <Network size={13} />, path: '/distributor/dashboard' },
    { role: 'affiliate', label: 'Affiliate Portal', icon: <Gift size={13} />, path: '/affiliate/dashboard' },
    { role: 'employee', label: t.roleEmployee, icon: <UserCheck size={13} />, path: '/employee/dashboard' },
    { role: 'partner', label: t.rolePartner, icon: <Briefcase size={13} />, path: '/partner/dashboard' },
    { role: 'admin', label: t.roleAdmin, icon: <ShieldAlert size={13} />, path: '/admin/dashboard' },
  ];

  const handleRoleChange = (r: UserRole, path: string) => {
    setCurrentRole(r);
    navigate(path);
  };

  return (
    <div style={{
      background: '#071324',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      padding: '0.35rem 1rem',
      fontSize: '0.78rem',
      color: '#94A3B8',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '0.5rem',
      position: 'relative',
      zIndex: 100,
    }}>
      {/* Left: Role Switcher Chips */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', overflowX: 'auto', maxWidth: '80%' }}>
        <span style={{ fontWeight: 600, color: '#E2E8F0', marginRight: '0.2rem', whiteSpace: 'nowrap' }}>
          Role Portal:
        </span>
        {roles.map(item => {
          const isActive = currentRole === item.role;
          return (
            <button
              key={item.role}
              onClick={() => handleRoleChange(item.role, item.path)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.2rem 0.6rem',
                borderRadius: '6px',
                background: isActive ? 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)' : 'rgba(255,255,255,0.05)',
                color: isActive ? '#FFFFFF' : '#CBD5E1',
                fontWeight: isActive ? 600 : 400,
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap',
                border: isActive ? '1px solid #3B82F6' : '1px solid transparent',
              }}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Right: Wallet & Language Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: 'auto' }}>
        <button
          onClick={() => navigate('/connect/csc')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            background: 'linear-gradient(135deg, #15803D 0%, #16A34A 100%)',
            color: '#FFFFFF',
            padding: '0.2rem 0.55rem',
            borderRadius: '6px',
            fontWeight: 700,
            fontSize: '0.72rem',
            border: 'none',
            cursor: 'pointer'
          }}
          title="Open CSC Connect OAuth 2.0 Single Sign-On"
        >
          🔐 CSC Connect
        </button>

        <button
          onClick={() => navigate('/csc')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            background: 'rgba(255, 255, 255, 0.08)',
            color: '#E2E8F0',
            padding: '0.2rem 0.55rem',
            borderRadius: '6px',
            fontWeight: 600,
            fontSize: '0.72rem',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            cursor: 'pointer'
          }}
          title="Open CSC Official National Portal"
        >
          🏛️ CSC.gov.in
        </button>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          color: '#F59E0B',
          fontWeight: 600,
          background: 'rgba(245, 158, 11, 0.1)',
          padding: '0.2rem 0.5rem',
          borderRadius: '6px',
          border: '1px solid rgba(245, 158, 11, 0.25)',
        }}>
          <Wallet size={13} />
          <span>₹{walletBalance.toLocaleString('en-IN')}</span>
        </div>

        {/* Bilingual Toggle */}
        <button
          onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: 'rgba(255, 255, 255, 0.08)',
            color: '#FFFFFF',
            padding: '0.2rem 0.55rem',
            borderRadius: '6px',
            fontWeight: 600,
            border: '1px solid rgba(255, 255, 255, 0.15)',
          }}
          title="Switch Language / भाषा बदलें"
        >
          <Globe2 size={13} />
          <span>{language === 'en' ? 'English | हिन्दी' : 'हिन्दी | English'}</span>
        </button>
      </div>
    </div>
  );
};
