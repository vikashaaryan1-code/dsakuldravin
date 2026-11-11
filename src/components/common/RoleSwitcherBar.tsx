import React, { useState } from 'react';
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
  Network,
  Gift,
  Scale,
  GraduationCap,
  BookOpen,
  Wrench,
  Landmark,
  Headphones,
  ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const RoleSwitcherBar: React.FC = () => {
  const { 
    currentRole, 
    setCurrentRole, 
    walletBalance, 
    language, 
    setLanguage
  } = useApp();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const roles: { role: UserRole; label: string; icon: React.ReactNode; path: string }[] = [
    { role: 'customer', label: 'Customer Portal', icon: <User size={13} />, path: '/customer/dashboard' },
    { role: 'vle', label: 'ADCS Kendra', icon: <Store size={13} />, path: '/digitalseva' },
    { role: 'cafe_operator', label: 'Cyber Café Console', icon: <Monitor size={13} />, path: '/cyber-cafe/operator' },
    { role: 'franchise', label: 'Franchise Owner', icon: <Building size={13} />, path: '/franchise/dashboard' },
    { role: 'distributor', label: 'Distributor Hub', icon: <Network size={13} />, path: '/distributor/dashboard' },
    { role: 'affiliate', label: 'Affiliate Portal', icon: <Gift size={13} />, path: '/affiliate/dashboard' },
    { role: 'executive', label: 'Service Executive', icon: <Headphones size={13} />, path: '/support-portal' },
    { role: 'partner', label: 'Partner Portal', icon: <Briefcase size={13} />, path: '/partner/dashboard' },
    { role: 'admin', label: 'Super Admin', icon: <ShieldAlert size={13} />, path: '/admin/dashboard' },
    { role: 'advocate', label: 'Advocate Portal', icon: <Scale size={13} />, path: '/portal/advocate' },
    { role: 'instructor', label: 'Instructor Portal', icon: <GraduationCap size={13} />, path: '/portal/instructor' },
    { role: 'student', label: 'Student Portal', icon: <BookOpen size={13} />, path: '/portal/student' },
    { role: 'technician', label: 'Technician Portal', icon: <Wrench size={13} />, path: '/portal/technician' },
    { role: 'finance', label: 'Finance & Settlement', icon: <Landmark size={13} />, path: '/finance-portal' },
    { role: 'employee', label: 'HRMS Employee Portal', icon: <UserCheck size={13} />, path: '/employee/dashboard' },
  ];

  const handleRoleChange = (r: UserRole, path: string) => {
    setCurrentRole(r);
    setDropdownOpen(false);
    navigate(path);
  };

  const activeRoleObj = roles.find(r => r.role === currentRole) || roles[0];

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
      {/* Left: Role Switcher Chips & Fast Dropdown */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', overflowX: 'auto', maxWidth: '78%' }}>
        <span style={{ fontWeight: 700, color: '#38BDF8', marginRight: '0.2rem', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span>🏢</span> 15 Portals:
        </span>

        {/* Dropdown for quick access to all 15 */}
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.22rem 0.65rem',
              borderRadius: '6px',
              background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
              color: '#F8FAFC',
              fontWeight: 700,
              border: '1px solid #38BDF8',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {activeRoleObj.icon}
            <span>{activeRoleObj.label}</span>
            <ChevronDown size={12} />
          </button>

          {dropdownOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              marginTop: '4px',
              background: '#0F172A',
              border: '1px solid #334155',
              borderRadius: '8px',
              padding: '0.4rem',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(180px, 1fr))',
              gap: '4px',
              zIndex: 9999,
              minWidth: '580px'
            }}>
              {roles.map(item => {
                const isActive = currentRole === item.role;
                return (
                  <button
                    key={item.role}
                    onClick={() => handleRoleChange(item.role, item.path)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.35rem 0.5rem',
                      borderRadius: '5px',
                      background: isActive ? '#2563EB' : 'rgba(255,255,255,0.04)',
                      color: isActive ? '#FFFFFF' : '#CBD5E1',
                      border: 'none',
                      fontSize: '0.74rem',
                      fontWeight: isActive ? 700 : 500,
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Horizontal Scroll Pills */}
        {roles.slice(0, 7).map(item => {
          const isActive = currentRole === item.role;
          return (
            <button
              key={item.role}
              onClick={() => handleRoleChange(item.role, item.path)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.2rem 0.55rem',
                borderRadius: '6px',
                background: isActive ? 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)' : 'rgba(255,255,255,0.05)',
                color: isActive ? '#FFFFFF' : '#CBD5E1',
                fontWeight: isActive ? 600 : 400,
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap',
                border: isActive ? '1px solid #3B82F6' : '1px solid transparent',
                cursor: 'pointer'
              }}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Right: Wallet & Language Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginLeft: 'auto' }}>
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
          title="Open ADCS Connect OAuth 2.0 Single Sign-On"
        >
          🔐 ADCS Connect
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
          title="Open Akul Dravin Digital Services Sovereign Hub"
        >
          🏛️ ADCS Hub
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
            cursor: 'pointer'
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
