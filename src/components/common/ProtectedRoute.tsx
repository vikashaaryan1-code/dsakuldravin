import React from 'react';
import { useApp } from '../../store/AppContext';
import { LoginPanelKey, UserRole } from '../../types';
import { ShieldAlert, ArrowRight, Lock } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  portalName?: string;
}

const ROLE_TO_PANEL: Record<UserRole, LoginPanelKey> = {
  customer: 'customer',
  vle: 'vle_rural',
  cafe_operator: 'cafe_operator',
  franchise: 'franchise',
  distributor: 'distributor',
  affiliate: 'affiliate',
  executive: 'employee',
  partner: 'partner',
  admin: 'admin',
  advocate: 'advocate',
  instructor: 'instructor',
  student: 'student',
  technician: 'technician',
  finance: 'finance',
  employee: 'employee',
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles = ['admin'], 
  portalName = 'Restricted Operations Portal' 
}) => {
  const { currentRole, authenticatedUser, setRequestedAuthPanel, setIsAuthModalOpen } = useApp();

  const isSuperAdmin = currentRole === 'admin';
  const hasAccess = isSuperAdmin || allowedRoles.includes(currentRole);

  if (!hasAccess) {
    const targetPanel = ROLE_TO_PANEL[allowedRoles[0] || 'customer'] || 'customer';
    return (
      <div style={{
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem',
        background: 'var(--adcs-background)'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '540px',
          background: 'var(--adcs-surface)',
          borderRadius: '20px',
          padding: '2.25rem',
          boxShadow: 'var(--adcs-shadow-lg)',
          border: '1px solid var(--adcs-border)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '14px',
            background: '#FEF2F2',
            border: '1px solid #FECACA',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.15rem',
            color: '#B91C1C'
          }}>
            <ShieldAlert size={30} />
          </div>

          <span className="badge badge-red" style={{ marginBottom: '0.65rem' }}>
            STRICT PANEL ISOLATION • AUTHENTICATION REQUIRED
          </span>

          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--adcs-text)', marginBottom: '0.5rem' }}>
            {portalName}
          </h2>

          <p style={{ fontSize: '0.88rem', color: 'var(--adcs-muted)', lineHeight: 1.6, marginBottom: '1.35rem' }}>
            Your current session (<strong style={{ color: 'var(--adcs-text)', textTransform: 'uppercase' }}>{authenticatedUser?.designation || currentRole}</strong>) is strictly isolated and cannot access this workspace. Only verified credentials assigned to <strong>{allowedRoles.join(', ').toUpperCase()}</strong> may sign in here.
          </p>

          <div style={{
            background: 'var(--adcs-background)',
            borderRadius: '12px',
            padding: '0.95rem',
            border: '1px solid var(--adcs-border)',
            textAlign: 'left',
            marginBottom: '1.35rem',
            fontSize: '0.8rem',
            color: 'var(--adcs-text-secondary)'
          }}>
            <div style={{ fontWeight: 700, color: 'var(--adcs-text)', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Lock size={14} color="#075ACB" />
              <span>Multi-Tenant Panel Lock Enforcement:</span>
            </div>
            <div>• Cross-role & cross-tier logins (e.g. VLE into Distributor) are strictly blocked</div>
            <div>• Permissions, departments & access grants are managed exclusively by Super Admin</div>
          </div>

          <button
            type="button"
            onClick={() => {
              setRequestedAuthPanel(targetPanel);
              setIsAuthModalOpen(true);
            }}
            className="btn-primary btn-lg"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <span>Sign In to {portalName}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
