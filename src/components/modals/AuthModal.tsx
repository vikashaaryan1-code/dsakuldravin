import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../store/AppContext';
import { 
  X, 
  User, 
  Store, 
  Monitor, 
  Building, 
  UserCheck, 
  Briefcase, 
  ShieldAlert, 
  Lock, 
  Phone, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { UserRole } from '../../types';
import confetti from 'canvas-confetti';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    currentRole, 
    setCurrentRole, 
    showToast, 
    logAudit,
    language 
  } = useApp();

  const [authMode, setAuthMode] = useState<'otp' | 'roles'>('otp');
  const [isLogin, setIsLogin] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  if (!isAuthModalOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    setOtpSent(true);
    setOtpCode('7729'); // Simulated pre-fill or hint
    showToast('OTP Transmitted', `Security verification code sent to +91 ${phoneNumber}. (Test Code: 7729)`, 'info');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      setIsAuthModalOpen(false);
      showToast('Authentication Successful', 'Welcome to Akul Dravin Digital Services Ecosystem.', 'success');
      logAudit('User Login OTP', `Phone: +91 ${phoneNumber}`);
      confetti({ particleCount: 60, spread: 50 });
      navigate('/customer/dashboard');
    }, 600);
  };

  const handleQuickRoleSwitch = (role: UserRole, path: string) => {
    setCurrentRole(role);
    setIsAuthModalOpen(false);
    showToast('Role Switched', `Logged into ${role.toUpperCase()} Workspace.`, 'success');
    logAudit(`Role Switched to ${role}`, 'Auth Modal');
    confetti({ particleCount: 50, spread: 45 });
    navigate(path);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(10, 25, 47, 0.72)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      animation: 'fadeIn 0.2s ease-out',
    }}>
      <div style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        maxWidth: '520px',
        width: '100%',
        boxShadow: '0 25px 60px rgba(10, 25, 47, 0.25)',
        border: '1px solid #E2E8F0',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Header Bar */}
        <div style={{
          background: 'linear-gradient(135deg, #0A192F 0%, #0D2137 60%, #1D4ED8 100%)',
          padding: '1.75rem 2rem',
          color: '#FFFFFF',
          position: 'relative',
        }}>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            style={{
              position: 'absolute',
              right: '1.5rem',
              top: '1.5rem',
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <X size={16} />
          </button>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(245, 158, 11, 0.2)',
            border: '1px solid #F59E0B',
            borderRadius: '9999px',
            padding: '0.2rem 0.65rem',
            fontSize: '0.72rem',
            fontWeight: 700,
            color: '#F59E0B',
            marginBottom: '0.5rem',
          }}>
            <ShieldCheck size={12} />
            <span>SECURE CITIZEN & ENTERPRISE GATEWAY</span>
          </div>

          <h2 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#FFFFFF', margin: '0 0 0.3rem' }}>
            {authMode === 'otp' 
              ? (isLogin ? 'Sign In to Your Account' : 'Create Unified Citizen Account') 
              : 'Enterprise Role Workspaces'}
          </h2>
          <p style={{ fontSize: '0.84rem', color: '#CBD5E1', margin: 0 }}>
            {authMode === 'otp'
              ? 'One Phone Number. Instant Biometric & SMS OTP Access.'
              : 'Select a pre-configured role to inspect specialized operating portals.'}
          </p>

          {/* Mode Switcher */}
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem' }}>
            <button
              type="button"
              onClick={() => setAuthMode('otp')}
              style={{
                flex: 1,
                padding: '0.4rem',
                borderRadius: '8px',
                border: 'none',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                background: authMode === 'otp' ? '#FFFFFF' : 'rgba(255,255,255,0.1)',
                color: authMode === 'otp' ? '#0A192F' : '#E2E8F0',
              }}
            >
              Citizen / Business Login
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('roles')}
              style={{
                flex: 1,
                padding: '0.4rem',
                borderRadius: '8px',
                border: 'none',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                background: authMode === 'roles' ? '#FFFFFF' : 'rgba(255,255,255,0.1)',
                color: authMode === 'roles' ? '#0A192F' : '#E2E8F0',
              }}
            >
              Direct Role Portals (Dev)
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '2rem' }}>
          {authMode === 'otp' ? (
            <div>
              {!otpSent ? (
                <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#0A192F', marginBottom: '0.4rem' }}>
                      Registered Mobile Number
                    </label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontWeight: 700, color: '#64748B', fontSize: '0.9rem' }}>
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder="98765 43210"
                        style={{
                          width: '100%',
                          padding: '0.8rem 1rem 0.8rem 3.5rem',
                          borderRadius: '10px',
                          border: '1.5px solid #CBD5E1',
                          fontSize: '1rem',
                          fontWeight: 700,
                          color: '#0A192F',
                          outline: 'none',
                        }}
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}>
                    <span>Send Secure 4-Digit OTP</span>
                    <ArrowRight size={16} />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{
                    background: '#EFF6FF',
                    borderRadius: '10px',
                    padding: '0.75rem 1rem',
                    border: '1px solid #BFDBFE',
                    fontSize: '0.82rem',
                    color: '#1D4ED8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                    <span>OTP sent to +91 {phoneNumber}</span>
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      style={{ background: 'none', border: 'none', color: '#1D4ED8', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Change
                    </button>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#0A192F', marginBottom: '0.4rem' }}>
                      Enter 4-Digit Security OTP (Test: 7729)
                    </label>
                    <input
                      type="text"
                      maxLength={4}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="7729"
                      style={{
                        width: '100%',
                        padding: '0.85rem',
                        borderRadius: '10px',
                        border: '1.5px solid #CBD5E1',
                        textAlign: 'center',
                        letterSpacing: '8px',
                        fontSize: '1.5rem',
                        fontWeight: 900,
                        color: '#0A192F',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={isVerifying}
                    style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
                  >
                    {isVerifying ? 'Verifying Credentials...' : 'Verify OTP & Access Account'}
                  </button>
                </form>
              )}

              <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.84rem', color: '#64748B' }}>
                {isLogin ? "Don't have a profile yet? " : "Already registered? "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  style={{ background: 'none', border: 'none', color: '#1D4ED8', fontWeight: 700, cursor: 'pointer' }}
                >
                  {isLogin ? 'Register New Citizen ID' : 'Sign In'}
                </button>
              </div>
            </div>
          ) : (
            /* Direct Role Portals Switcher */
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
              {[
                { role: 'customer', label: 'Verified Citizen', icon: <User size={16} />, path: '/customer/dashboard', color: '#1D4ED8' },
                { role: 'vle', label: 'VLE Center Operator', icon: <Store size={16} />, path: '/center/dashboard', color: '#059669' },
                { role: 'cafe_operator', label: 'Cyber Café Desk', icon: <Monitor size={16} />, path: '/cyber-cafe/operator', color: '#7C3AED' },
                { role: 'franchise', label: 'Franchise Partner', icon: <Building size={16} />, path: '/franchise/dashboard', color: '#D97706' },
                { role: 'employee', label: 'Service Executive', icon: <UserCheck size={16} />, path: '/employee/dashboard', color: '#2563EB' },
                { role: 'partner', label: 'Certified Partner', icon: <Briefcase size={16} />, path: '/partner/dashboard', color: '#0891B2' },
                { role: 'admin', label: 'Super Administrator', icon: <ShieldAlert size={16} />, path: '/admin/dashboard', color: '#DC2626' },
              ].map((item) => (
                <button
                  key={item.role}
                  type="button"
                  onClick={() => handleQuickRoleSwitch(item.role as UserRole, item.path)}
                  style={{
                    padding: '0.85rem',
                    borderRadius: '12px',
                    border: '1px solid #E2E8F0',
                    background: currentRole === item.role ? '#EFF6FF' : '#F8FAFC',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#F1F5F9';
                    e.currentTarget.style.borderColor = '#CBD5E1';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = currentRole === item.role ? '#EFF6FF' : '#F8FAFC';
                    e.currentTarget.style.borderColor = '#E2E8F0';
                  }}
                >
                  <div style={{ color: item.color }}>{item.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0A192F' }}>{item.label}</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Access Console →</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
