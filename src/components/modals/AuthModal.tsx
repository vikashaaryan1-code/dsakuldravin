import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../store/AppContext';
import {
  X,
  Lock,
  UserCheck,
  ShieldAlert,
  ShieldCheck,
  ArrowRight,
  Eye,
  EyeOff,
  Building2,
  KeyRound,
  LogOut,
  CheckCircle2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ADCSLogo } from '../branding';
import { LOGIN_PANELS, DEFAULT_USER_ACCOUNTS } from '../../config/governanceCatalog';
import { LoginPanelKey } from '../../types';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    requestedAuthPanel,
    setRequestedAuthPanel,
    authenticatedUser,
    loginWithPanelCredentials,
    logoutSession,
    showToast,
  } = useApp();

  const [selectedPanel, setSelectedPanel] = useState<LoginPanelKey>(requestedAuthPanel || 'customer');
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showDemoHints, setShowDemoHints] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (requestedAuthPanel) {
      setSelectedPanel(requestedAuthPanel);
      setErrorMsg(null);
    }
  }, [requestedAuthPanel, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const activePanelMeta = LOGIN_PANELS.find((p) => p.panelKey === selectedPanel) || LOGIN_PANELS[0];
  const sampleAccForPanel = DEFAULT_USER_ACCOUNTS.find((a) => a.panelKey === selectedPanel);

  const handlePanelSelect = (panelKey: LoginPanelKey) => {
    setSelectedPanel(panelKey);
    setRequestedAuthPanel(panelKey);
    setErrorMsg(null);
  };

  const handleFillSampleCredentials = () => {
    if (sampleAccForPanel) {
      setLoginId(sampleAccForPanel.loginId);
      setPassword(sampleAccForPanel.password);
      setErrorMsg(null);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);
    const result = await loginWithPanelCredentials(selectedPanel, loginId, password);
    setIsLoading(false);

    if (!result.ok) {
      setErrorMsg(result.message);
      showToast('Authentication Blocked', result.message, 'error');
      return;
    }

    setIsAuthModalOpen(false);
    setLoginId('');
    setPassword('');
    confetti({ particleCount: 55, spread: 45 });
    if (result.redirectTo) {
      navigate(result.redirectTo);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="ADCS Strict Panel Authentication Gateway"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(3, 17, 38, 0.82)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div
        style={{
          background: 'var(--adcs-surface)',
          color: 'var(--adcs-text)',
          borderRadius: '20px',
          maxWidth: '720px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: 'var(--adcs-shadow-xl)',
          border: '1px solid var(--adcs-border)',
          position: 'relative',
        }}
      >
        {/* Header Bar in Deep Navy + Gold */}
        <div
          style={{
            background: 'linear-gradient(135deg, #031126 0%, #061A36 65%, #075ACB 100%)',
            padding: '1.35rem 1.6rem',
            color: '#FFFFFF',
            position: 'relative',
            borderBottom: '2px solid #D6A12B',
          }}
        >
          <button
            type="button"
            onClick={() => setIsAuthModalOpen(false)}
            aria-label="Close login modal"
            style={{
              position: 'absolute',
              right: '1.15rem',
              top: '1.15rem',
              background: 'rgba(255,255,255,0.14)',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={16} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <ADCSLogo variant="login" theme="dark" height={54} />
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  background: 'rgba(214, 161, 43, 0.2)',
                  border: '1px solid #F3D477',
                  borderRadius: '999px',
                  padding: '0.16rem 0.6rem',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  color: '#F3D477',
                  marginBottom: '0.25rem',
                }}
              >
                <ShieldCheck size={12} />
                <span>ROLE-ISOLATED SECURE LOGIN PANEL</span>
              </div>
              <h2 style={{ fontSize: '1.22rem', fontWeight: 900, color: '#FFFFFF', margin: 0 }}>
                {activePanelMeta.title}
              </h2>
              <div style={{ fontSize: '0.76rem', color: '#CBD5E1', marginTop: '2px' }}>
                Department: <strong style={{ color: '#F3D477' }}>{activePanelMeta.department}</strong> • Designation: {activePanelMeta.designationLabel}
              </div>
            </div>
          </div>
        </div>

        {/* Active Signed-In Session Banner */}
        {authenticatedUser && (
          <div
            style={{
              background: '#ECFDF5',
              borderBottom: '1px solid #A7F3D0',
              padding: '0.75rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.65rem',
              fontSize: '0.8rem',
              color: '#065F46',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <CheckCircle2 size={16} color="#047857" />
              <span>
                Signed in as <strong>{authenticatedUser.name}</strong> ({authenticatedUser.loginId}) • {authenticatedUser.designation}
              </span>
            </div>
            <button
              type="button"
              onClick={logoutSession}
              style={{
                padding: '0.3rem 0.65rem',
                borderRadius: '6px',
                background: '#FFFFFF',
                border: '1px solid #047857',
                color: '#047857',
                fontWeight: 700,
                fontSize: '0.74rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}
            >
              <LogOut size={12} />
              <span>Sign Out</span>
            </button>
          </div>
        )}

        {/* Body */}
        <div style={{ padding: '1.35rem 1.6rem', display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
          {/* Digital Seva 5-Tier Hierarchy Strip */}
          <div>
            <div style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--adcs-muted)', marginBottom: '0.45rem', textTransform: 'uppercase' }}>
              Digital Seva 5-Level Hierarchy & Management Panels
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(128px, 1fr))', gap: '0.45rem' }}>
              {LOGIN_PANELS.filter((p) =>
                ['vle_rural', 'vle_district', 'vle_state', 'vle_main_head', 'admin'].includes(p.panelKey)
              ).map((p) => {
                const isSel = selectedPanel === p.panelKey;
                return (
                  <button
                    key={p.panelKey}
                    type="button"
                    onClick={() => handlePanelSelect(p.panelKey)}
                    style={{
                      padding: '0.5rem 0.55rem',
                      borderRadius: '8px',
                      border: isSel ? `2px solid ${p.accentColor}` : '1px solid var(--adcs-border)',
                      background: isSel ? 'var(--adcs-primary-soft)' : 'var(--adcs-background)',
                      color: isSel ? '#075ACB' : 'var(--adcs-text)',
                      textAlign: 'left',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                    }}
                  >
                    <div style={{ fontSize: '0.64rem', color: p.accentColor, fontWeight: 800 }}>
                      {p.tier === 'super_admin' ? 'SUPER ADMIN' : p.tier.replace('_', ' ').toUpperCase()}
                    </div>
                    <div style={{ marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {p.designationLabel.split('/')[0].trim()}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Portal Selector Dropdown for All 17 Panels */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.9rem', alignItems: 'end' }}>
            <div>
              <label className="form-label" htmlFor="panel-select" style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.8rem' }}>
                Select Login Panel (Strict Role Isolation)
              </label>
              <select
                id="panel-select"
                className="form-select"
                value={selectedPanel}
                onChange={(e) => handlePanelSelect(e.target.value as LoginPanelKey)}
              >
                {LOGIN_PANELS.map((p) => (
                  <option key={p.panelKey} value={p.panelKey}>
                    {p.title} ({p.department})
                  </option>
                ))}
              </select>
            </div>

            <div
              style={{
                background: 'var(--adcs-background)',
                border: '1px solid var(--adcs-border)',
                borderRadius: '8px',
                padding: '0.55rem 0.85rem',
                fontSize: '0.76rem',
                color: 'var(--adcs-text-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
              }}
            >
              <Building2 size={15} color="#075ACB" style={{ flexShrink: 0 }} />
              <div>
                <strong>Strict Lock:</strong> Only <em>{activePanelMeta.designationLabel}</em> IDs authenticate here.
              </div>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
              <div>
                <label className="form-label" htmlFor="panel-login-id" style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.8rem' }}>
                  Secure Login ID * (लॉगिन आईडी)
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="panel-login-id"
                    type="text"
                    required
                    className="form-input"
                    value={loginId}
                    onChange={(e) => {
                      setLoginId(e.target.value);
                      setErrorMsg(null);
                    }}
                    placeholder={`e.g. ${activePanelMeta.sampleLoginId}`}
                    style={{ fontFamily: 'var(--adcs-font-mono)', fontWeight: 700, paddingLeft: '2.2rem' }}
                  />
                  <UserCheck size={15} color="#075ACB" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
                </div>
              </div>

              <div>
                <label className="form-label" htmlFor="panel-password" style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.8rem' }}>
                  Password * (पासवर्ड)
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="panel-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="form-input"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrorMsg(null);
                    }}
                    placeholder="Enter panel password"
                    style={{ paddingLeft: '2.2rem', paddingRight: '2.4rem' }}
                  />
                  <Lock size={15} color="#075ACB" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <button
                    type="button"
                    aria-label="Toggle password visibility"
                    onClick={() => setShowPassword((prev) => !prev)}
                    style={{ position: 'absolute', right: '0.65rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--adcs-muted)' }}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
            </div>

            {errorMsg && (
              <div
                role="alert"
                style={{
                  background: '#FEF2F2',
                  border: '1px solid #FECACA',
                  color: '#B91C1C',
                  padding: '0.75rem 0.9rem',
                  borderRadius: '10px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <ShieldAlert size={18} style={{ flexShrink: 0 }} />
                <span>{errorMsg}</span>
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary"
                style={{ flex: '2 1 220px' }}
              >
                <KeyRound size={16} />
                <span>{isLoading ? 'Verifying Credentials...' : `Authenticate & Enter ${activePanelMeta.designationLabel.split('/')[0].trim()}`}</span>
                <ArrowRight size={15} />
              </button>

              {sampleAccForPanel && (
                <button
                  type="button"
                  onClick={handleFillSampleCredentials}
                  className="btn-secondary"
                  style={{ flex: '1 1 160px', fontSize: '0.78rem' }}
                  title="Fill verified panel credentials for testing"
                >
                  Fill {sampleAccForPanel.loginId}
                </button>
              )}
            </div>
          </form>

          {/* Expandable Reference Panel Credential Directory for Admin / QA Verification */}
          <div style={{ borderTop: '1px solid var(--adcs-border)', paddingTop: '0.75rem' }}>
            <button
              type="button"
              onClick={() => setShowDemoHints((p) => !p)}
              style={{ fontSize: '0.76rem', fontWeight: 700, color: '#075ACB', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <span>{showDemoHints ? 'Hide Panel Credential Reference ▲' : 'View Panel Credential IDs & Isolation Rules ▼'}</span>
            </button>
            {showDemoHints && (
              <div style={{ marginTop: '0.55rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '0.45rem', maxHeight: '150px', overflowY: 'auto' }}>
                {DEFAULT_USER_ACCOUNTS.map((acc) => (
                  <div
                    key={acc.id}
                    style={{
                      background: 'var(--adcs-background)',
                      border: '1px solid var(--adcs-border)',
                      borderRadius: '8px',
                      padding: '0.45rem 0.6rem',
                      fontSize: '0.72rem',
                    }}
                  >
                    <div style={{ fontWeight: 800, color: 'var(--adcs-text)' }}>{acc.designation}</div>
                    <div style={{ fontFamily: 'var(--adcs-font-mono)', color: '#075ACB' }}>
                      ID: {acc.loginId} | PW: {acc.password}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
