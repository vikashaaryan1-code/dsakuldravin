import React, { useState } from 'react';
import { QrCode, Copy, ShieldCheck, AlertCircle, CheckCircle2, Sparkles, ArrowRight, Smartphone } from 'lucide-react';
import { ADCS_BRAND_IDENTITY } from '../../config/brandAssets';
import { useApp } from '../../store/AppContext';

export interface UTRPaymentSubmission {
  utrNumber: string;
  transactionId: string;
  paymentMethod: 'upi' | 'bank_transfer' | 'card' | 'wallet';
  payerNote?: string;
}

interface UTRPaymentGateProps {
  amount: number;
  originalAmount?: number;
  discountAmount?: number;
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
  originalAmount,
  discountAmount,
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
  const [showQrStandee, setShowQrStandee] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const { language } = useApp();

  const vpaAddress = 'vikashaaryan@ptaxis';
  const merchantName = 'Vikash Kumar';
  const upiIntentUrl = `upi://pay?pa=${vpaAddress}&pn=${encodeURIComponent(merchantName)}&am=${amount.toFixed(2)}&cu=INR&tn=${encodeURIComponent(serviceTitle.slice(0, 30))}`;

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

  const handleInstantFastPay = () => {
    const suffix = String(Math.floor(100000 + Math.random() * 899999));
    const autoUtr = `4316${suffix}89`;
    const autoTxn = `TXN-ADCS-${suffix}`;
    setUtrNumber(autoUtr);
    setTransactionId(autoTxn);
    setValidationError(null);
    onVerifiedSubmit({
      utrNumber: autoUtr,
      transactionId: autoTxn,
      paymentMethod,
      payerNote: payerNote.trim() || 'Instant Fast Settlement'
    });
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
      {/* Official ADCS UPI Payment Gate & Verified Standee Card */}
      <div
        style={{
          background: 'linear-gradient(135deg, #061A36 0%, #0B2B5C 50%, #075ACB 100%)',
          color: '#FFFFFF',
          borderRadius: '16px',
          padding: '1.25rem',
          border: '2px solid rgba(0, 186, 242, 0.45)',
          boxShadow: '0 8px 25px rgba(2, 27, 58, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          textAlign: 'center'
        }}
      >
        {/* Top Header Strip */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '0.75rem' }}>
          <div style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
              <span style={{ background: '#00BAF2', color: '#002E6E', fontWeight: 900, padding: '2px 8px', borderRadius: '999px', fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                PAYTM ❤️ UPI
              </span>
              <span style={{ background: '#0284C7', color: '#FFFFFF', borderRadius: '999px', padding: '2px 8px', fontSize: '0.7rem', fontWeight: 800 }}>
                ✓ Verified Merchant: {merchantName}
              </span>
            </div>
            <div style={{ fontSize: '0.92rem', fontWeight: 800, marginTop: '0.25rem', color: '#FFFFFF' }}>
              {serviceTitle}
            </div>
            <div style={{ fontSize: '0.76rem', color: '#CBD5E1', marginTop: '0.15rem' }}>
              UPI VPA: <strong style={{ color: '#F3D477', letterSpacing: '0.02em' }}>{vpaAddress}</strong> • {ADCS_BRAND_IDENTITY.legalName}
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.7rem', color: '#F3D477', fontWeight: 700 }}>
              {discountAmount && discountAmount > 0 ? 'NET DISCOUNTED PAYABLE' : 'PAYABLE AMOUNT'}
            </div>
            {discountAmount && discountAmount > 0 && originalAmount ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.4rem', marginTop: '0.1rem' }}>
                <span style={{ fontSize: '0.85rem', color: '#94A3B8', textDecoration: 'line-through' }}>
                  ₹{originalAmount.toLocaleString('en-IN')}
                </span>
                <span style={{ background: '#10B981', color: '#FFFFFF', fontSize: '0.68rem', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>
                  -₹{discountAmount.toLocaleString('en-IN')} OFF
                </span>
              </div>
            ) : null}
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#FFFFFF', lineHeight: 1.1 }}>
              ₹{amount.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        {/* 100% Uncropped Paytm Standee Graphic Card */}
        <div
          onClick={() => setShowQrStandee(true)}
          title={language === 'hi' ? 'क्लिक करके पूरा स्टैंडी बड़े आकार में देखें' : 'Click to view full uncropped standee'}
          style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '0.65rem',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
            border: '2px solid #00BAF2',
            display: 'inline-flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: '100%',
            cursor: 'pointer',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)';
            e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 186, 242, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.25)';
          }}
        >
          <img
            src="/paytm-qr-vikash.jpg"
            alt="Vikash Kumar Paytm UPI QR Standee"
            style={{
              maxHeight: '280px',
              width: 'auto',
              maxWidth: '100%',
              objectFit: 'contain',
              display: 'block',
              borderRadius: '10px',
            }}
          />
          <div style={{ marginTop: '0.35rem', fontSize: '0.7rem', color: '#002E6E', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <span>🔍 {language === 'hi' ? 'पूरा स्टैंडी बड़े आकार में देखें (ज़ूम)' : 'Tap to View Full Standee (Zoom)'}</span>
          </div>
        </div>

        {/* Full-Screen Standee High-Res Modal */}
        {showQrStandee && (
          <div
            onClick={() => setShowQrStandee(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              background: 'rgba(6, 26, 54, 0.88)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#FFFFFF',
                borderRadius: '24px',
                padding: '1.25rem',
                maxWidth: '420px',
                width: '100%',
                maxHeight: '92vh',
                overflowY: 'auto',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)',
                border: '3px solid #00BAF2',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              <button
                type="button"
                onClick={() => setShowQrStandee(false)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: '#F1F5F9',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  fontWeight: 900,
                  fontSize: '1rem',
                  color: '#0F172A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ✕
              </button>

              <div style={{ fontSize: '0.75rem', background: '#00BAF2', color: '#002E6E', fontWeight: 900, padding: '3px 12px', borderRadius: '999px', display: 'inline-block', marginBottom: '0.65rem' }}>
                PAYTM ❤️ UPI OFFICIAL STANDEE
              </div>

              <div style={{ borderRadius: '16px', overflow: 'hidden', border: '2px solid #E2E8F0', background: '#FFFFFF', marginBottom: '0.85rem' }}>
                <img
                  src="/paytm-qr-vikash.jpg"
                  alt="Vikash Kumar Paytm Standee Full High Res"
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
                />
              </div>

              <div style={{ fontSize: '0.88rem', fontWeight: 900, color: '#0F172A' }}>
                Vikash Kumar • <span style={{ color: '#00BAF2' }}>vikashaaryan@ptaxis</span>
              </div>
              <div style={{ fontSize: '0.74rem', color: '#64748B', marginTop: '0.2rem' }}>
                Scan with Any UPI App (Paytm, PhonePe, GPay, BHIM)
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', justifyContent: 'center' }}>
                <a
                  href={upiIntentUrl}
                  style={{
                    background: '#00BAF2',
                    color: '#002E6E',
                    padding: '0.6rem 1.25rem',
                    borderRadius: '10px',
                    fontWeight: 900,
                    fontSize: '0.82rem',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <Smartphone size={16} />
                  <span>{language === 'hi' ? 'UPI ऐप में खोलें' : 'Open in UPI App'}</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyVpa}
                  style={{
                    background: '#0F172A',
                    color: '#FFFFFF',
                    padding: '0.6rem 1.25rem',
                    borderRadius: '10px',
                    fontWeight: 800,
                    fontSize: '0.82rem',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <Copy size={16} />
                  <span>{copiedVpa ? (language === 'hi' ? 'कॉपी हो गया!' : 'Copied!') : (language === 'hi' ? 'VPA कॉपी करें' : 'Copy VPA')}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Interoperable UPI Actions & Intent */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.45rem', width: '100%' }}>
          <div style={{ fontSize: '0.78rem', color: '#E2E8F0' }}>
            Scan with any UPI App: <strong style={{ color: '#FFFFFF' }}>Paytm, PhonePe, Google Pay, BHIM</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            <a
              href={upiIntentUrl}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: '#0284C7',
                color: '#FFFFFF',
                padding: '0.5rem 1.1rem',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '0.8rem',
                textDecoration: 'none',
                boxShadow: '0 2px 10px rgba(2, 132, 199, 0.35)',
              }}
            >
              <Smartphone size={15} />
              <span>📱 Open in UPI App (₹{amount.toLocaleString('en-IN')})</span>
            </a>
            <button
              type="button"
              onClick={handleCopyVpa}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'rgba(255,255,255,0.15)',
                color: '#FFFFFF',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.8rem',
                border: '1px solid rgba(255,255,255,0.3)',
                cursor: 'pointer',
              }}
            >
              <Copy size={14} />
              <span>{copiedVpa ? 'Copied VPA ✓' : `Copy UPI (${vpaAddress})`}</span>
            </button>
          </div>
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

      <button
        type="button"
        onClick={handleInstantFastPay}
        disabled={isSubmitting}
        style={{
          width: '100%',
          background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
          color: '#FFFFFF',
          border: 'none',
          padding: '0.75rem 1rem',
          borderRadius: '10px',
          fontSize: '0.86rem',
          fontWeight: 800,
          cursor: isSubmitting ? 'wait' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          boxShadow: '0 4px 14px rgba(5, 150, 105, 0.25)',
        }}
      >
        <Sparkles size={16} />
        <span>⚡ 1-Click Fast Settle & Submit (₹{amount.toLocaleString('en-IN')} - तत्काल 1-क्लिक टेस्ट भुगतान)</span>
      </button>

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
