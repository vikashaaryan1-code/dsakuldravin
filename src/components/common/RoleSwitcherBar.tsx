import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { UserRole, LoginPanelKey } from '../../types';
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
  ChevronDown,
  Sun,
  Moon,
  Lock,
  LogOut,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ADCSLogo } from '../branding';

const PRIVILEGED_ROLES: UserRole[] = ['admin', 'finance', 'executive', 'employee'];

const ROLE_TO_PANEL: Record<UserRole, LoginPanelKey> = {
  customer: 'customer',
  vle: 'vle_rural',
  cafe_operator: 'cafe_operator',
  franchise: 'franchise',
  distributor: 'distributor',
  affiliate: 'affiliate',
  partner: 'partner',
  advocate: 'advocate',
  instructor: 'instructor',
  student: 'student',
  technician: 'technician',
  executive: 'employee',
  finance: 'finance',
  employee: 'employee',
  admin: 'admin',
};

export const RoleSwitcherBar: React.FC = () => {
  const {
    currentRole,
    setCurrentRole,
    authenticatedUser,
    logoutSession,
    walletBalance,
    language,
    setLanguage,
    theme,
    toggleTheme,
    setIsAuthModalOpen,
    setRequestedAuthPanel,
    showToast,
  } = useApp();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isPrivilegedSession = PRIVILEGED_ROLES.includes(currentRole) || authenticatedUser?.role === 'admin';

  const roles: { role: UserRole; label: string; icon: React.ReactNode; path: string; privileged?: boolean }[] = [
    { role: 'customer', label: 'Customer Portal', icon: <User size={13} />, path: '/customer/dashboard' },
    { role: 'vle', label: 'ADCS Kendra', icon: <Store size={13} />, path: '/digitalseva' },
    { role: 'cafe_operator', label: 'Cyber Café Console', icon: <Monitor size={13} />, path: '/cyber-cafe/operator' },
    { role: 'franchise', label: 'Franchise Owner', icon: <Building size={13} />, path: '/franchise/dashboard' },
    { role: 'distributor', label: 'Distributor Hub', icon: <Network size={13} />, path: '/distributor/dashboard' },
    { role: 'affiliate', label: 'Affiliate Portal', icon: <Gift size={13} />, path: '/affiliate/dashboard' },
    { role: 'partner', label: 'Partner Portal', icon: <Briefcase size={13} />, path: '/partner/dashboard' },
    { role: 'advocate', label: 'Advocate Portal', icon: <Scale size={13} />, path: '/portal/advocate' },
    { role: 'instructor', label: 'Instructor Portal', icon: <GraduationCap size={13} />, path: '/portal/instructor' },
    { role: 'student', label: 'Student Academy', icon: <BookOpen size={13} />, path: '/portal/student' },
    { role: 'technician', label: 'Technician Portal', icon: <Wrench size={13} />, path: '/portal/technician' },
    { role: 'executive', label: 'Service Executive', icon: <Headphones size={13} />, path: '/support-portal', privileged: true },
    { role: 'finance', label: 'Finance & Settlement', icon: <Landmark size={13} />, path: '/finance-portal', privileged: true },
    { role: 'employee', label: 'HRMS Employee', icon: <UserCheck size={13} />, path: '/employee/dashboard', privileged: true },
    { role: 'admin', label: 'Super Admin', icon: <ShieldAlert size={13} />, path: '/admin/dashboard', privileged: true },
  ];

  // Permission-aware portal visibility: Admin / Super Admin / Finance routes are only listed for authorized enterprise roles
  const visibleRoles = isPrivilegedSession ? roles : roles.filter((r) => !r.privileged);

  const handleRoleChange = (r: UserRole, path: string) => {
    setDropdownOpen(false);
    // Strict panel isolation: require verified credentials matching the target portal (or Super Admin session)
    if (authenticatedUser && (authenticatedUser.role === 'admin' || authenticatedUser.role === r)) {
      setCurrentRole(r);
      navigate(path);
      return;
    }
    if (r === 'customer' && !authenticatedUser) {
      setRequestedAuthPanel('customer');
      setIsAuthModalOpen(true);
      showToast('Customer Login Required', 'Please sign in via Retailer / Citizen Panel or switch workspace with valid Login ID.', 'info');
      return;
    }
    setRequestedAuthPanel(ROLE_TO_PANEL[r] || 'customer');
    setIsAuthModalOpen(true);
    showToast('Strict Panel Isolation', `Enter valid ${roles.find((x) => x.role === r)?.label || r} Login ID & Password to access this panel.`, 'warning');
  };

  const activeRoleObj = roles.find((r) => r.role === currentRole) || roles[0];

  return (
    <div
      className="role-switcher-bar adcs-no-print"
      style={{
        background: '#031126',
        borderBottom: '1px solid rgba(214, 161, 43, 0.25)',
        padding: '0.38rem 1rem',
        fontSize: '0.76rem',
        color: '#CBD5E1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.45rem',
        position: 'relative',
        zIndex: 100,
      }}
    >
      {/* Left: Permission-Aware Portal Selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', marginRight: '0.2rem' }}>
          <ADCSLogo variant="icon" height={20} decorative />
          <span style={{ fontWeight: 700, color: '#F3D477', whiteSpace: 'nowrap', letterSpacing: '0.02em' }}>
            {isPrivilegedSession ? 'ADCS Control Workspace:' : 'ADCS Portals:'}
          </span>
        </div>

        <div style={{ position: 'relative', display: 'inline-block' }}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-expanded={dropdownOpen}
            aria-label="Select ADCS portal workspace"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.24rem 0.68rem',
              borderRadius: '6px',
              background: '#061A36',
              color: '#FFFFFF',
              fontSize: '0.76rem',
              fontWeight: 700,
              border: '1px solid #0878F9',
              whiteSpace: 'nowrap',
            }}
          >
            {activeRoleObj.icon}
            <span>{activeRoleObj.label}</span>
            <ChevronDown size={12} />
          </button>

          {dropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                marginTop: '4px',
                background: '#061A36',
                border: '1px solid rgba(214, 161, 43, 0.35)',
                borderRadius: '10px',
                padding: '0.5rem',
                boxShadow: '0 14px 32px rgba(3, 17, 38, 0.65)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(175px, 1fr))',
                gap: '4px',
                zIndex: 9999,
                minWidth: 'min(540px, 92vw)',
              }}
            >
              {visibleRoles.map((item) => {
                const isActive = currentRole === item.role;
                return (
                  <button
                    key={item.role}
                    onClick={() => handleRoleChange(item.role, item.path)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      padding: '0.42rem 0.55rem',
                      borderRadius: '6px',
                      background: isActive ? '#075ACB' : 'rgba(255,255,255,0.04)',
                      color: isActive ? '#FFFFFF' : '#E2E8F0',
                      fontSize: '0.74rem',
                      fontWeight: isActive ? 700 : 500,
                      textAlign: 'left',
                    }}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              })}
              {!isPrivilegedSession && (
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  style={{
                    gridColumn: '1 / -1',
                    marginTop: '4px',
                    padding: '0.4rem 0.6rem',
                    borderRadius: '6px',
                    background: 'rgba(214, 161, 43, 0.14)',
                    border: '1px solid rgba(214, 161, 43, 0.35)',
                    color: '#F3D477',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.35rem',
                  }}
                >
                  <Lock size={12} /> Enterprise / Staff Sign-In Required for Control Portals
                </button>
              )}
            </div>
          )}
        </div>

        {/* Quick Access Public / Citizen / Partner Role Pills */}
        {visibleRoles.slice(1, 5).map((item) => {
          const isActive = currentRole === item.role;
          return (
            <button
              key={item.role}
              onClick={() => handleRoleChange(item.role, item.path)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.22rem 0.58rem',
                borderRadius: '6px',
                background: isActive ? '#075ACB' : 'rgba(255,255,255,0.05)',
                color: isActive ? '#FFFFFF' : '#D4E0EE',
                fontWeight: isActive ? 700 : 500,
                whiteSpace: 'nowrap',
                border: isActive ? '1px solid #0878F9' : '1px solid transparent',
              }}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Right: ADCS Connect, ADCS Hub, Wallet, Session, Theme & Bilingual Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto', flexWrap: 'wrap' }}>
        {authenticatedUser ? (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(16,185,129,0.14)', border: '1px solid rgba(16,185,129,0.38)', color: '#A7F3D0', padding: '0.2rem 0.55rem', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700 }}>
            <span>{authenticatedUser.designation}</span>
            <span style={{ opacity: 0.65 }}>({authenticatedUser.loginId})</span>
            <button
              type="button"
              onClick={() => {
                logoutSession();
                navigate('/');
              }}
              title="Sign Out"
              style={{ background: 'transparent', border: 'none', color: '#FCA5A5', display: 'inline-flex', alignItems: 'center', cursor: 'pointer', padding: 0, marginLeft: '0.2rem' }}
            >
              <LogOut size={12} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setRequestedAuthPanel('customer');
              setIsAuthModalOpen(true);
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.28rem',
              background: 'rgba(214, 161, 43, 0.18)',
              color: '#F3D477',
              padding: '0.22rem 0.58rem',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '0.72rem',
              border: '1px solid rgba(214, 161, 43, 0.4)',
            }}
          >
            <Lock size={12} /> Panel Login
          </button>
        )}

        <button
          onClick={() => navigate('/connect/csc')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            background: '#075ACB',
            color: '#FFFFFF',
            padding: '0.22rem 0.6rem',
            borderRadius: '6px',
            fontWeight: 700,
            fontSize: '0.72rem',
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
            color: '#FFFFFF',
            padding: '0.22rem 0.6rem',
            borderRadius: '6px',
            fontWeight: 600,
            fontSize: '0.72rem',
            border: '1px solid rgba(255, 255, 255, 0.18)',
          }}
          title="Open Akul Dravin Digital Services Hub"
        >
          🏛️ ADCS Hub
        </button>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            color: '#F3D477',
            fontWeight: 700,
            background: 'rgba(214, 161, 43, 0.14)',
            padding: '0.22rem 0.55rem',
            borderRadius: '6px',
            border: '1px solid rgba(214, 161, 43, 0.35)',
          }}
        >
          <Wallet size={13} />
          <span>₹{walletBalance.toLocaleString('en-IN')}</span>
        </div>

        <button
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          title={theme === 'dark' ? 'Light Theme' : 'Dark Theme'}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.28rem',
            background: 'rgba(255, 255, 255, 0.08)',
            color: '#F3D477',
            padding: '0.22rem 0.5rem',
            borderRadius: '6px',
            fontWeight: 600,
            border: '1px solid rgba(255, 255, 255, 0.18)',
          }}
        >
          {theme === 'dark' ? <Sun size={13} /> : <Moon size={13} />}
          <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>

        <button
          onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: 'rgba(255, 255, 255, 0.08)',
            color: '#FFFFFF',
            padding: '0.22rem 0.58rem',
            borderRadius: '6px',
            fontWeight: 600,
            border: '1px solid rgba(255, 255, 255, 0.18)',
          }}
          title="Switch Language / भाषा बदलें"
        >
          <Globe2 size={13} />
          <span>{language === 'en' ? 'EN | हिं' : 'हिं | EN'}</span>
        </button>
      </div>
    </div>
  );
};
