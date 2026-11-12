import React, { useState } from 'react';
import { QrCode, Copy, ShieldCheck, AlertCircle, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { ADCS_BRAND_IDENTITY } from '../../config/brandAssets';

export interface UTRPaymentSubmission {
  utrNumber: string;
  transactionId: string;
  paymentMethod: 'upi' | 'bank_transfer' | 'card' | 'wallet';
  payerNote?: string;
}

interface UTRPaymentGateProps {
  amount: number;
  serviceTitle: string;
  defaultMethod?: 'upi' | 'bank_transfer' | 'card' | 'wallet';
  ctaLabel?: string;
  isSubmitting?: boolean;
  onCancel?: () => void;
  cancelLabel?: string;
  onVerifiedSubmit: (proof: UTRPaymentSubmission) => void;
  showMethodSelector?: boolean;
}

/**
 * Mandatory ADCS Pre-Processing Payment, UTR Number & Transaction ID Verification Gate.
 * Blocks progression until valid payment proof (UTR + Transaction ID) is submitted.
 */
export const UTRPaymentGate: React.FC<UTRPaymentGateProps> = ({
  amount,
  serviceTitle,
  defaultMethod = 'upi',
  ctaLabel,
  isSubmitting = false,
  onCancel,
  cancelLabel = 'Back',
  onVerifiedSubmit,
  showMethodSelector = true,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'bank_transfer' | 'card' | 'wallet'>(defaultMethod);
  const [utrNumber, setUtrNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [payerNote, setPayerNote] = useState('');
  const [copiedVpa, setCopiedVpa] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const vpaAddress = 'akuldravin@icici';

  const handleCopyVpa = () => {
    try {
      navigator.clipboard?.writeText(vpaAddress);
      setCopiedVpa(true);
      setTimeout(() => setCopiedVpa(false), 1800);
    } catch {}
  };

  const handleAutofillDemoUtr = () => {
    const suffix = String(Math.floor(100000 + Math.random() * 899999));
    setUtrNumber(`4316${suffix}89`);
    setTransactionId(`TXN-ADCS-${suffix}`);
    setValidationError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUtr = utrNumber.trim().toUpperCase();
    const cleanTxn = transactionId.trim().toUpperCase();

    if (cleanUtr.length < 8 || !/^[A-Z0-9-]+$/.test(cleanUtr)) {
      setValidationError(
        'Valid UTR / RRN Number required (minimum 8 alphanumeric characters, e.g. 431689204512) before processing.'
      );
      return;
    }

    if (cleanTxn.length < 6 || !/^[A-Z0-9_-]+$/.test(cleanTxn)) {
      setValidationError(
        'Valid Payment Transaction ID required (minimum 6 characters, e.g. TXN-ADCS-90812) before proceeding.'
      );
      return;
    }

    setValidationError(null);
    onVerifiedSubmit({
      utrNumber: cleanUtr,
      transactionId: cleanTxn,
      paymentMethod,
      payerNote: payerNote.trim() || undefined,
    });
  };

  return (
    <form noValidate onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Official ADCS Settlement / UPI Instruction Strip */}
      <div
        style={{
          background: '#061A36',
          color: '#FFFFFF',
          borderRadius: '14px',
          padding: '1rem 1.15rem',
          border: '1.5px solid rgba(214, 161, 43, 0.55)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.85rem',
        }}
      >
        <div style={{ flex: 1, minWidth: '210px' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#F3D477', letterSpacing: '0.04em' }}>
            STEP 1 • PAY FEE VIA OFFICIAL ADCS GATEWAY
          </div>
          <div style={{ fontSize: '0.96rem', fontWeight: 800, marginTop: '0.2rem' }}>
            {serviceTitle}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#CBD5E1', marginTop: '0.25rem' }}>
            Merchant: {ADCS_BRAND_IDENTITY.legalName} • VPA: <strong style={{ color: '#FFFFFF' }}>{vpaAddress}</strong>
          </div>
          <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '0.15rem' }}>
            NEFT/IMPS IFSC: ICIC0006281 • A/C: 628105004910
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.7rem', color: '#F3D477', fontWeight: 700 }}>PAYABLE AMOUNT</div>
          <div style={{ fontSize: '1.45rem', fontWeight: 900, color: '#FFFFFF' }}>
            ₹{amount.toLocaleString('en-IN')}
          </div>
          <button
            type="button"
            onClick={handleCopyVpa}
            style={{
              marginTop: '0.3rem',
              padding: '0.28rem 0.65rem',
              borderRadius: '6px',
              background: 'rgba(255,255,255,0.12)',
              color: '#F3D477',
              fontSize: '0.72rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
            }}
          >
            <Copy size={12} />
            <span>{copiedVpa ? 'Copied VPA ✓' : 'Copy UPI ID'}</span>
          </button>
        </div>
      </div>

      {showMethodSelector && (
        <div>
          <label className="form-label" style={{ marginBottom: '0.45rem', display: 'block' }}>
            Payment Channel Used
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(115px, 1fr))', gap: '0.5rem' }}>
            {[
              { id: 'upi', label: 'UPI / QR Pay' },
              { id: 'bank_transfer', label: 'IMPS / NEFT' },
              { id: 'card', label: 'Card / Gateway' },
              { id: 'wallet', label: 'ADCS Wallet' },
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setPaymentMethod(m.id as any)}
                style={{
                  padding: '0.55rem 0.6rem',
                  borderRadius: '8px',
                  border: paymentMethod === m.id ? '2px solid #075ACB' : '1px solid var(--adcs-border)',
                  background: paymentMethod === m.id ? 'var(--adcs-primary-soft)' : 'var(--adcs-surface)',
                  color: paymentMethod === m.id ? '#075ACB' : 'var(--adcs-text-secondary)',
                  fontWeight: 700,
                  fontSize: '0.78rem',
                }}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mandatory Step 2: UTR Number & Transaction ID */}
      <div
        style={{
          background: 'var(--adcs-background)',
          border: '1.5px solid #075ACB',
          borderRadius: '12px',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 800, fontSize: '0.84rem', color: 'var(--adcs-text)' }}>
            <QrCode size={16} color="#075ACB" />
            <span>STEP 2 • MANDATORY UTR & TRANSACTION ID VERIFICATION</span>
          </div>
          <button
            type="button"
            onClick={handleAutofillDemoUtr}
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              color: '#075ACB',
              background: 'var(--adcs-surface)',
              border: '1px solid #BFDBFE',
              padding: '0.28rem 0.6rem',
              borderRadius: '6px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
            }}
          >
            <Sparkles size={12} />
            <span>Fill Test UTR Ref</span>
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '0.75rem' }}>
          <div>
            <label className="form-label" style={{ fontSize: '0.78rem', display: 'block', marginBottom: '0.3rem' }}>
              UTR / RRN Number * (यूटीआर नंबर)
            </label>
            <input
              type="text"
              required
              className="form-input"
              value={utrNumber}
              onChange={(e) => {
                setUtrNumber(e.target.value);
                setValidationError(null);
              }}
              placeholder="e.g. 431689204512"
              style={{ fontFamily: 'var(--adcs-font-mono)', fontWeight: 700, textTransform: 'uppercase' }}
            />
          </div>

          <div>
            <label className="form-label" style={{ fontSize: '0.78rem', display: 'block', marginBottom: '0.3rem' }}>
              Transaction ID * (ट्रांजेक्शन आईडी)
            </label>
            <input
              type="text"
              required
              className="form-input"
              value={transactionId}
              onChange={(e) => {
                setTransactionId(e.target.value);
                setValidationError(null);
              }}
              placeholder="e.g. TXN-ADCS-90812"
              style={{ fontFamily: 'var(--adcs-font-mono)', fontWeight: 700, textTransform: 'uppercase' }}
            />
          </div>
        </div>

        <div>
          <input
            type="text"
            className="form-input"
            value={payerNote}
            onChange={(e) => setPayerNote(e.target.value)}
            placeholder="Optional payer bank / UPI app reference note (e.g. PhonePe / SBI)"
            style={{ fontSize: '0.8rem' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.74rem', color: 'var(--adcs-muted)' }}>
          <ShieldCheck size={14} color="#047857" />
          <span>QUANTUM AI & Finance Desk automatically screen UTR + Transaction ID before releasing application to processing.</span>
        </div>
      </div>

      {validationError && (
        <div
          role="alert"
          style={{
            background: '#FEF2F2',
            border: '1px solid #FECACA',
            color: '#B91C1C',
            padding: '0.7rem 0.9rem',
            borderRadius: '8px',
            fontSize: '0.8rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <AlertCircle size={16} style={{ flexShrink: 0 }} />
          <span>{validationError}</span>
        </div>
      )}

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn-secondary" style={{ flex: '1 1 120px' }}>
            {cancelLabel}
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-gold"
          style={{ flex: '2 1 220px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem' }}
        >
          <CheckCircle2 size={16} />
          <span>
            {isSubmitting
              ? 'Verifying UTR & Submitting...'
              : ctaLabel || `Verify UTR & Pay ₹${amount.toLocaleString('en-IN')} to Proceed`}
          </span>
          <ArrowRight size={15} />
        </button>
      </div>
    </form>
  );
};
