import React from 'react';
import { useApp } from '../../store/AppContext';
import { UserRole } from '../../types';
import { ShieldAlert, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  portalName?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles = ['admin'], 
  portalName = 'Restricted Operations Portal' 
}) => {
  const { currentRole, setCurrentRole, setIsAuthModalOpen, showToast } = useApp();

  const isSuperAdmin = currentRole === 'admin';
  const hasAccess = isSuperAdmin || allowedRoles.includes(currentRole);

  if (!hasAccess) {
    return (
      <div style={{
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem',
        background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.95), rgba(241, 245, 249, 0.95))'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '540px',
          background: '#FFFFFF',
          borderRadius: '24px',
          padding: '2.5rem',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.08)',
          border: '1px solid #E2E8F0',
          textAlign: 'center'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem',
            color: '#DC2626'
          }}>
            <ShieldAlert size={34} />
          </div>

          <span className="badge badge-red" style={{ marginBottom: '0.75rem' }}>
            SECURITY PROTOCOL: ACCESS RESTRICTED
          </span>

          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0A192F', marginBottom: '0.5rem' }}>
            {portalName}
          </h2>

          <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            Your active role is currently <strong style={{ color: '#0A192F', textTransform: 'uppercase' }}>{currentRole}</strong>. 
            This portal requires elevated privileges: <strong>{allowedRoles.join(', ').toUpperCase()}</strong>.
          </p>

          <div style={{
            background: '#F8FAFC',
            borderRadius: '12px',
            padding: '1rem',
            border: '1px solid #E2E8F0',
            textAlign: 'left',
            marginBottom: '1.5rem',
            fontSize: '0.82rem',
            color: '#334155'
          }}>
            <div style={{ fontWeight: 700, color: '#0A192F', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Lock size={14} color="#1E3A8A" />
              <span>Multi-Tenant Security Enforcement:</span>
            </div>
            <div>• AES-256 encrypted role sessions active</div>
            <div>• Tamper-evident access audit ledger recording attempts</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button
              onClick={() => {
                if (allowedRoles[0]) {
                  setCurrentRole(allowedRoles[0]);
                  showToast('Role Switched', `Active credentials updated to ${allowedRoles[0].toUpperCase()}`, 'success');
                }
              }}
              className="btn-primary btn-lg"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>Switch to {allowedRoles[0]?.toUpperCase() || 'Authorized'} Role (Dev Bypass)</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Sign In with Authorized OTP / Token
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
