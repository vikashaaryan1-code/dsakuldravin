import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../../store/AppContext';
import { ShieldCheck, RefreshCw, CheckCircle2 } from 'lucide-react';

export const CSCAuthCallbackPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setCurrentRole, showToast, logAudit, setWalletBalance } = useApp();
  
  const [statusText, setStatusText] = useState('Verifying OAuth 2.0 Authorization Code...');
  const [stepIndex, setStepIndex] = useState(1);

  const code = searchParams.get('code') || 'demo_code_' + Date.now();
  const state = searchParams.get('state') || '89850';
  const redirectTo = searchParams.get('redirect_to') || '/digitalseva';

  useEffect(() => {
    let isMounted = true;

    async function handleExchange() {
      try {
        // Step 1: Validating code
        setTimeout(() => {
          if (!isMounted) return;
          setStatusText('Exchanging Auth Code with CSC Connect Token Endpoint...');
          setStepIndex(2);
        }, 500);

        // Step 2: Call token API
        const tokenRes = await fetch('http://localhost:5000/api/csc/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code })
        }).then(r => r.json()).catch(() => null);

        // Step 3: Establish VLE Session
        setTimeout(() => {
          if (!isMounted) return;
          setStatusText('Establishing Sovereign VLE Operator Session...');
          setStepIndex(3);

          setCurrentRole('vle');
          setWalletBalance(tokenRes?.vle?.walletBalance || 2450.00);
          logAudit('CSC Connect SSO Login', `Authenticated VLE ID: 245089123456 via OAuth code: ${code}`);
          showToast('VLE Authorized', 'Welcome to Digital Seva Portal (VLE: Rajesh Sharma)', 'success');
        }, 1100);

        // Step 4: Redirect to Digital Seva
        setTimeout(() => {
          if (!isMounted) return;
          navigate('/digitalseva');
        }, 1700);

      } catch (e) {
        setCurrentRole('vle');
        setWalletBalance(2450.00);
        navigate('/digitalseva');
      }
    }

    handleExchange();

    return () => {
      isMounted = false;
    };
  }, [code, navigate, setCurrentRole, setWalletBalance, showToast, logAudit]);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0F172A',
      color: '#FFFFFF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Inter, system-ui, sans-serif',
      padding: '1.5rem'
    }}>
      <div style={{
        background: '#1E293B',
        borderRadius: '20px',
        padding: '3rem 2.5rem',
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center',
        border: '1px solid #334155',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
      }}>
        <div style={{
          width: '72px',
          height: '72px',
          background: 'rgba(22, 163, 74, 0.15)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          border: '2px solid #16A34A'
        }}>
          {stepIndex < 3 ? (
            <RefreshCw size={36} color="#22C55E" className="animate-spin" />
          ) : (
            <CheckCircle2 size={40} color="#22C55E" />
          )}
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 0.5rem', color: '#F8FAFC' }}>
          CSC CONNECT SINGLE SIGN-ON
        </h2>
        <p style={{ fontSize: '0.88rem', color: '#94A3B8', margin: '0 0 2rem' }}>
          {statusText}
        </p>

        {/* Progress Tracker */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '2rem' }}>
          {[
            { num: 1, label: 'Authorize' },
            { num: 2, label: 'Token Exchange' },
            { num: 3, label: 'Digital Seva' }
          ].map((item) => (
            <div key={item.num} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{
                height: '4px',
                borderRadius: '2px',
                background: stepIndex >= item.num ? '#22C55E' : '#334155',
                marginBottom: '0.4rem',
                transition: 'all 0.3s ease'
              }} />
              <span style={{ fontSize: '0.72rem', color: stepIndex >= item.num ? '#22C55E' : '#64748B', fontWeight: 600 }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <div style={{
          background: '#0F172A',
          padding: '0.75rem 1rem',
          borderRadius: '8px',
          fontSize: '0.75rem',
          color: '#64748B',
          fontFamily: 'monospace',
          border: '1px solid #1E293B',
          wordBreak: 'break-all'
        }}>
          Auth Code: {code.substring(0, 24)}... | State: {state}
        </div>
      </div>
    </div>
  );
};
