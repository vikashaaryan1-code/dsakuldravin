import React from 'react';
import { useApp } from '../../store/AppContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const NotificationToaster: React.FC = () => {
  const { toasts } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '5rem',
      right: '1.5rem',
      zIndex: 10000,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.65rem',
      pointerEvents: 'none',
    }}>
      {toasts.map(toast => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';
        const isError = toast.type === 'error';

        const borderColor = isSuccess ? '#10B981' : isWarning ? '#F59E0B' : isError ? '#EF4444' : '#3B82F6';
        const icon = isSuccess ? (
          <CheckCircle2 size={18} color="#10B981" />
        ) : isWarning ? (
          <AlertTriangle size={18} color="#F59E0B" />
        ) : isError ? (
          <AlertCircle size={18} color="#EF4444" />
        ) : (
          <Info size={18} color="#3B82F6" />
        );

        return (
          <div
            key={toast.id}
            style={{
              width: '340px',
              maxWidth: 'calc(100vw - 2rem)',
              background: '#FFFFFF',
              borderRadius: '12px',
              boxShadow: '0 8px 30px rgba(10, 25, 47, 0.15)',
              borderLeft: `4px solid ${borderColor}`,
              borderTop: '1px solid #E2E8F0',
              borderRight: '1px solid #E2E8F0',
              borderBottom: '1px solid #E2E8F0',
              padding: '0.85rem 1rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
              pointerEvents: 'auto',
              animation: 'fadeIn 0.2s ease-out',
            }}
          >
            <div style={{ marginTop: '0.1rem' }}>{icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#061A36', lineHeight: 1.2 }}>
                {toast.title}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '0.2rem', lineHeight: 1.35 }}>
                {toast.message}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
