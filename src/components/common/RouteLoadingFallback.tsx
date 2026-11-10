import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

export const RouteLoadingFallback: React.FC = () => {
  return (
    <div style={{
      minHeight: '65vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      padding: '40px 20px',
      textAlign: 'center'
    }}>
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '64px',
        height: '64px',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(99, 102, 241, 0.15))',
        border: '1px solid rgba(245, 158, 11, 0.3)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
      }}>
        <Loader2 className="animate-spin text-amber-500" size={32} />
        <Sparkles size={16} className="text-amber-600 absolute -top-1 -right-1" />
      </div>

      <div>
        <h3 style={{
          fontSize: '1.1rem',
          fontWeight: 700,
          color: 'var(--text-dark, #1e293b)',
          marginBottom: '4px',
          letterSpacing: '-0.01em'
        }}>
          AKUL DRAVIN CLOUD AI
        </h3>
        <p style={{
          fontSize: '0.85rem',
          color: '#64748b'
        }}>
          लोड हो रहा है... कृपया प्रतीक्षा करें (Initializing Secure Module...)
        </p>
      </div>
    </div>
  );
};
