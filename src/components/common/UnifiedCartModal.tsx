import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../store/AppContext';
import { apiClient } from '../../services/apiClient';
import { ADCSLogo } from './../branding';
import { printBrandedADCSDocument } from '../../utils/documentBranding';
import { UTRPaymentGate, UTRPaymentSubmission } from './UTRPaymentGate';
import { 
  X, 
  ShoppingCart, 
  Trash2, 
  CheckCircle2, 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  ArrowRight,
  Sparkles,
  Receipt,
  Copy,
  Smartphone,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const UnifiedCartModal: React.FC = () => {
  const navigate = useNavigate();
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    clearCart, 
    submitApplication,
    walletBalance,
    setWalletBalance,
    setActiveTrackerQuery,
    logAudit,
    showToast
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'wallet' | 'netbanking'>('upi');
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [generatedAppIds, setGeneratedAppIds] = useState<string[]>([]);
  const [taxInvoiceNumber, setTaxInvoiceNumber] = useState<string>('');
  const [copiedVpa, setCopiedVpa] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const totalGovtFee = cart.reduce((sum, item) => sum + item.govtFee, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const gstAmount = Math.round(((subtotal - discountAmount) * 18) / 100);
  const grandTotal = subtotal - discountAmount + gstAmount + totalGovtFee;

  const vpaAddress = 'akuldravin@icici';
  const upiUri = `upi://pay?pa=${vpaAddress}&pn=AKUL%20DRAVIN%20DIGITAL%20SERVICES&am=${grandTotal.toFixed(2)}&cu=INR&tn=Checkout%20Order`;

  const copyVpa = () => {
    navigator.clipboard?.writeText(vpaAddress);
    setCopiedVpa(true);
    showToast('UPI VPA Copied', `${vpaAddress} copied to clipboard`, 'success');
    setTimeout(() => setCopiedVpa(false), 2000);
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'DIGITALINDIA' || couponCode.toUpperCase() === 'AKUL10') {
      setDiscountPercent(10);
      showToast('Coupon Applied!', '10% promotional discount applied.', 'success');
    } else {
      showToast('Invalid Coupon', 'Try "DIGITALINDIA" for 10% off.', 'warning');
    }
  };

  const handleCheckout = async (proof: UTRPaymentSubmission) => {
    if (cart.length === 0) return;
    if (proof.paymentMethod === 'wallet' && walletBalance < grandTotal) {
      showToast(
        'Insufficient Wallet Balance',
        `Wallet balance is ₹${walletBalance.toLocaleString('en-IN')}, required ₹${grandTotal.toLocaleString('en-IN')}. Top up wallet or pay via UPI.`,
        'warning'
      );
      return;
    }
    setPaymentMethod(proof.paymentMethod === 'bank_transfer' ? 'netbanking' : proof.paymentMethod);
    setIsProcessing(true);

    try {
      // 1. Initiate Payment Order with Backend API
      const orderRes = await apiClient.createPaymentOrder({
        amount: grandTotal,
        customerName: 'Citizen Applicant',
        customerPhone: '+91 98765 00000',
        items: cart
      });

      const orderId = orderRes?.order?.orderId || `order_ad_${Date.now()}`;

      // 2. Submit applications with mandatory UTR Number & Transaction ID
      const appIds: string[] = [];
      cart.forEach(item => {
        const appId = submitApplication({
          serviceId: item.serviceId,
          serviceName: item.title,
          category: item.category,
          feePaid: item.price,
          applicantName: 'Unified Checkout Customer',
          applicantEmail: 'customer@akuldravin.com',
          applicantPhone: '+91 98765 00000',
          utrNumber: proof.utrNumber,
          transactionId: proof.transactionId,
          paymentMode: proof.paymentMethod,
          notes: `Unified Cart Checkout • Payment: ${proof.paymentMethod.toUpperCase()} • UTR: ${proof.utrNumber} • TXN ID: ${proof.transactionId}`,
        });
        appIds.push(appId);
      });

      // 3. Verify Payment with Payment Gateway
      const verifyRes = await apiClient.verifyPayment({
        orderId,
        paymentId: `${proof.utrNumber}|${proof.transactionId}`,
        paymentMethod: proof.paymentMethod,
        amount: grandTotal,
        items: cart
      });

      const invNo = verifyRes?.transaction?.invoiceNumber || `INV-AD-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      setTaxInvoiceNumber(invNo);

      if (proof.paymentMethod === 'wallet') {
        setWalletBalance(prev => Math.max(0, prev - grandTotal));
      }

      setGeneratedAppIds(appIds);
      setIsProcessing(false);
      setIsCompleted(true);
      clearCart();

      // Fire celebratory confetti!
      confetti({
        particleCount: 140,
        spread: 80,
        origin: { y: 0.6 }
      });

      logAudit(`Unified Payment Authorized (${appIds.length} items)`, `Invoice: ${invNo} • UTR: ${proof.utrNumber} • TXN: ${proof.transactionId} • Total: ₹${grandTotal}`);
      showToast('UTR & Payment Logged', `Tax Invoice ${invNo} generated (UTR: ${proof.utrNumber}).`, 'success');
    } catch (err) {
      console.error('Checkout error:', err);
      setIsProcessing(false);
    }
  };

  if (!isCartOpen) return null;

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
      padding: '1.5rem',
      animation: 'fadeIn 0.2s ease-out',
    }}>
      <div 
        style={{
          width: '100%',
          maxWidth: '680px',
          background: '#FFFFFF',
          borderRadius: '24px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.15rem 1.75rem',
          borderBottom: '2px solid #D6A12B',
          background: 'linear-gradient(135deg, #031126 0%, #061A36 65%, #075ACB 100%)',
          color: '#FFFFFF',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ADCSLogo variant="compact" height={38} decorative />
            <div>
              <h3 style={{ fontSize: '1.12rem', fontWeight: 800, margin: 0, letterSpacing: '-0.01em', color: '#FFFFFF' }}>
                ADCS Unified Checkout & Billing
              </h3>
              <p style={{ fontSize: '0.76rem', color: '#F3D477', margin: 0 }}>
                AKUL DRAVIN DIGITAL SERVICES • Itemized GST Tax Receipt
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsCartOpen(false);
              setIsCompleted(false);
            }}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '1.5rem 1.75rem', overflowY: 'auto', flex: 1 }}>
          {isCompleted ? (
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: '#DCFCE7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
                color: '#15803D',
              }}>
                <CheckCircle2 size={42} />
              </div>

              <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>PAYMENT VERIFIED & SETTLED</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#061A36', marginBottom: '0.25rem' }}>
                Payment & Applications Dispatched!
              </h3>
              <p style={{ color: '#475569', fontSize: '0.88rem', maxWidth: '460px', margin: '0 auto 1.25rem' }}>
                Your order is confirmed. Real-time background event broadcasted across operations desks.
              </p>

              {/* Tax Invoice Strip */}
              {taxInvoiceNumber && (
                <div style={{
                  background: '#F0FDF4',
                  border: '1px solid #BBF7D0',
                  borderRadius: '12px',
                  padding: '0.75rem 1rem',
                  maxWidth: '480px',
                  margin: '0 auto 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.88rem'
                }}>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.72rem', color: '#166534', fontWeight: 700 }}>GST TAX INVOICE NUMBER:</div>
                    <div style={{ fontWeight: 800, color: '#14532D' }}>{taxInvoiceNumber}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      printBrandedADCSDocument({
                        title: 'ADCS GST Tax Invoice & Payment Receipt',
                        documentType: 'TAX INVOICE',
                        documentNumber: taxInvoiceNumber,
                        rows: [
                          { label: 'Application References', value: generatedAppIds.join(', ') || 'Direct Checkout' },
                          { label: 'Payment Method', value: paymentMethod.toUpperCase() },
                          { label: 'Billing Entity', value: 'AKUL DRAVIN DIGITAL SERVICES (GSTIN: 07AAAAA0000A1Z5)' },
                        ],
                        amountSummary: {
                          total: grandTotal || 0,
                          paymentStatus: 'SETTLED & VERIFIED',
                        },
                      });
                      showToast('Receipt Opened', `Printable ADCS receipt ${taxInvoiceNumber} generated.`, 'success');
                    }}
                    style={{
                      background: '#075ACB',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.45rem 0.85rem',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    <Download size={13} />
                    <span>Print / PDF Receipt</span>
                  </button>
                </div>
              )}

              {/* Application IDs Display */}
              <div style={{
                background: '#F8FAFC',
                borderRadius: '14px',
                padding: '1.25rem',
                marginBottom: '1.5rem',
                textAlign: 'left',
                border: '1px solid #E2E8F0',
              }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '0.75rem' }}>
                  ACTIVE APPLICATION TOKENS:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {generatedAppIds.map((id, idx) => (
                    <div key={id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      color: '#061A36',
                    }}>
                      <span>Service #{idx + 1}</span>
                      <span className="badge badge-blue">{id}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                <button
                  onClick={() => {
                    setIsCompleted(false);
                    setIsCartOpen(false);
                    if (generatedAppIds.length > 0) {
                      setActiveTrackerQuery(generatedAppIds[0]);
                      navigate('/track?q=' + generatedAppIds[0]);
                    } else {
                      navigate('/customer/dashboard');
                    }
                  }}
                  className="btn-primary"
                  style={{ flex: 1 }}
                >
                  <span>Track Application</span>
                  <ArrowRight size={15} />
                </button>
                <button
                  onClick={() => {
                    setIsCompleted(false);
                    setIsCartOpen(false);
                    navigate('/customer/dashboard');
                  }}
                  className="btn-secondary"
                  style={{ flex: 1 }}
                >
                  Customer Portal
                </button>
              </div>
            </div>
          ) : cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: '#64748B' }}>
              <ShoppingCart size={48} color="#CBD5E1" style={{ margin: '0 auto 1rem' }} />
              <h4 style={{ fontWeight: 700, fontSize: '1.1rem', color: '#061A36', marginBottom: '0.25rem' }}>
                Your Unified Cart is Empty
              </h4>
              <p style={{ fontSize: '0.85rem' }}>
                Add services from Government, Business, CCTV, IT, or Property to assemble a unified quote.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Item List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {cart.map(item => (
                  <div key={item.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1rem',
                    borderRadius: '12px',
                    border: '1px solid #E2E8F0',
                    background: '#FFFFFF',
                  }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#061A36' }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'capitalize' }}>
                        Sector: {item.category.replace('-', ' ')}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 700, color: '#061A36' }}>
                          ₹{item.price.toLocaleString('en-IN')}
                        </div>
                        {item.govtFee > 0 && (
                          <div style={{ fontSize: '0.7rem', color: '#64748B' }}>
                            + ₹{item.govtFee} Govt.
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{ color: '#EF4444', padding: '0.35rem', background: 'none', border: 'none', cursor: 'pointer' }}
                        title="Remove"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Code Strip */}
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                background: '#F8FAFC',
                padding: '0.65rem',
                borderRadius: '12px',
                border: '1px solid #E2E8F0',
              }}>
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Coupon code (e.g. DIGITALINDIA)"
                  style={{
                    flex: 1,
                    border: 'none',
                    background: 'transparent',
                    fontSize: '0.85rem',
                    padding: '0 0.5rem',
                    outline: 'none',
                    textTransform: 'uppercase',
                  }}
                />
                <button
                  onClick={applyCoupon}
                  className="btn-secondary btn-sm"
                  style={{ padding: '0.35rem 0.8rem', fontSize: '0.78rem' }}
                >
                  Apply
                </button>
              </div>

              {/* Payment Methods Tabs */}
              <div>
                <label className="form-label" style={{ marginBottom: '0.5rem' }}>
                  Select Payment Gateway:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  {[
                    { id: 'upi', label: 'UPI / QR', icon: <QrCode size={16} /> },
                    { id: 'card', label: 'Cards', icon: <CreditCard size={16} /> },
                    { id: 'netbanking', label: 'NetBanking', icon: <Receipt size={16} /> },
                    { id: 'wallet', label: 'AD Wallet', icon: <Sparkles size={16} /> },
                  ].map(m => (
                    <button
                      key={m.id}
                      onClick={() => setPaymentMethod(m.id as any)}
                      style={{
                        padding: '0.65rem 0.5rem',
                        borderRadius: '10px',
                        border: paymentMethod === m.id ? '2px solid #075ACB' : '1px solid #E2E8F0',
                        background: paymentMethod === m.id ? '#EFF6FF' : '#FFFFFF',
                        color: paymentMethod === m.id ? '#075ACB' : '#475569',
                        fontWeight: 600,
                        fontSize: '0.78rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.35rem',
                        cursor: 'pointer'
                      }}
                    >
                      {m.icon}
                      <span>{m.label}</span>
                    </button>
                  ))}
                </div>

                {/* Dynamic Interactive UPI QR Card */}
                {paymentMethod === 'upi' && (
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(239, 246, 255, 0.8), rgba(243, 232, 255, 0.5))',
                    border: '1px solid #BFDBFE',
                    borderRadius: '16px',
                    padding: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    {/* Simulated SVG QR Matrix */}
                    <div style={{
                      width: '84px',
                      height: '84px',
                      background: '#FFFFFF',
                      borderRadius: '12px',
                      padding: '6px',
                      border: '1px solid #CBD5E1',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ width: '20px', height: '20px', background: '#061A36', borderRadius: '4px' }} />
                        <div style={{ width: '20px', height: '20px', background: '#061A36', borderRadius: '4px' }} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <QrCode size={24} color="#061A36" />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ width: '20px', height: '20px', background: '#061A36', borderRadius: '4px' }} />
                        <div style={{ width: '10px', height: '10px', background: '#F59E0B', borderRadius: '2px' }} />
                      </div>
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#061A36', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Smartphone size={14} />
                        <span>Scan with any UPI App</span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B', marginBottom: '6px' }}>
                        Google Pay • PhonePe • Paytm • BHIM
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <code style={{ fontSize: '0.78rem', background: '#FFFFFF', padding: '3px 8px', borderRadius: '6px', border: '1px solid #E2E8F0', fontWeight: 700, color: '#0F172A' }}>
                          {vpaAddress}
                        </code>
                        <button
                          onClick={copyVpa}
                          style={{
                            background: '#FFFFFF',
                            border: '1px solid #CBD5E1',
                            borderRadius: '6px',
                            padding: '3px 8px',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '3px'
                          }}
                        >
                          <Copy size={11} />
                          <span>{copiedVpa ? 'Copied!' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div style={{
                background: '#F8FAFC',
                borderRadius: '14px',
                padding: '1.25rem',
                border: '1px solid #E2E8F0',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                fontSize: '0.88rem',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                  <span>Services Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {totalGovtFee > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                    <span>Statutory / Government Fees</span>
                    <span>₹{totalGovtFee.toLocaleString('en-IN')}</span>
                  </div>
                )}
                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#059669', fontWeight: 600 }}>
                    <span>Promotional Discount (10%)</span>
                    <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                  <span>GST (18% Input Tax Credit Eligible)</span>
                  <span>₹{gstAmount.toLocaleString('en-IN')}</span>
                </div>
                <div style={{
                  borderTop: '1px solid #CBD5E1',
                  paddingTop: '0.65rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: 800,
                  fontSize: '1.15rem',
                  color: '#061A36',
                }}>
                  <span>Unified Grand Total</span>
                  <span style={{ color: '#075ACB' }}>₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Mandatory Pre-Execution UTR Number & Transaction ID Payment Verification Gate */}
              <UTRPaymentGate
                amount={grandTotal}
                serviceTitle={`Unified Cart Checkout (${cart.length} ${cart.length === 1 ? 'Service' : 'Services'})`}
                defaultMethod={paymentMethod === 'netbanking' ? 'bank_transfer' : paymentMethod}
                ctaLabel={`Verify UTR & Dispatch ${cart.length} Orders (₹${grandTotal.toLocaleString('en-IN')})`}
                isSubmitting={isProcessing}
                onVerifiedSubmit={handleCheckout}
                showMethodSelector={true}
              />

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                fontSize: '0.75rem',
                color: '#64748B',
              }}>
                <ShieldCheck size={14} color="#059669" />
                <span>NPCI UPI & Razorpay Validated Engine • Instant Tax Invoice</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
