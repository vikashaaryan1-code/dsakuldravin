import React, { useState } from 'react';
import { AstroProduct } from '../../types/astrology';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle, Tag, Truck } from 'lucide-react';

export interface AstroCartEntry {
  product: AstroProduct;
  quantity: number;
}

interface AstroCartModalProps {
  cartItems: AstroCartEntry[];
  onClose: () => void;
  onUpdateQty: (productId: string, delta: number) => void;
  onRemove: (productId: string) => void;
  onClear: () => void;
}

export const AstroCartModal: React.FC<AstroCartModalProps> = ({
  cartItems,
  onClose,
  onUpdateQty,
  onRemove,
  onClear
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscountPercent, setAppliedDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [orderId, setOrderId] = useState('');

  // Checkout inputs
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * appliedDiscountPercent) / 100);
  const deliveryCharge = subtotal > 1500 || subtotal === 0 ? 0 : 99;
  const finalTotal = subtotal - discountAmount + deliveryCharge;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'SHREE108') {
      setAppliedDiscountPercent(15);
      setCouponSuccess('15% की दिव्य छूट सफलतापूर्वक लागू हो गई!');
    } else if (code === 'VEDIC10') {
      setAppliedDiscountPercent(10);
      setCouponSuccess('10% की छूट लागू हो गई!');
    } else {
      setCouponError('अमान्य कूपन कोड। कृपया SHREE108 का उपयोग करें।');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrderId = `ASTRO-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(newOrderId);
    setStep('success');
    onClear();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div style={{
        background: '#0F172A',
        width: '100%',
        maxWidth: '560px',
        maxHeight: '90vh',
        borderRadius: '24px',
        border: '1px solid rgba(245, 158, 11, 0.4)',
        boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 35px rgba(217, 119, 6, 0.2)',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag color="#F59E0B" size={20} />
            <h4 style={{ margin: 0, fontSize: '17px', color: '#FDE68A', fontWeight: 700 }}>
              {step === 'cart' ? `एस्ट्रो स्टोर कार्ट (${cartItems.length})` : step === 'checkout' ? 'सुरक्षित चेकआउट' : 'ऑर्डर संपन्न'}
            </h4>
          </div>

          <button
            onClick={onClose}
            style={{ color: '#94A3B8', background: 'rgba(255, 255, 255, 0.05)', padding: '6px', borderRadius: '50%' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {step === 'success' ? (
            <div style={{ textAlign: 'center', padding: '24px 12px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <CheckCircle size={36} />
              </div>

              <h3 style={{ margin: '0 0 8px', color: '#FDE68A', fontSize: '20px', fontWeight: 700 }}>
                आपका ऑर्डर सफलतापूर्वक स्वीकार कर लिया गया है!
              </h3>
              <p style={{ margin: '0 0 16px', color: '#94A3B8', fontSize: '13px' }}>
                ऑर्डर संख्या: <strong style={{ color: '#F59E0B' }}>{orderId}</strong>
              </p>

              <div style={{
                background: '#1E293B',
                borderRadius: '12px',
                padding: '16px',
                textAlign: 'left',
                fontSize: '13px',
                lineHeight: 1.6,
                border: '1px solid rgba(255, 255, 255, 0.08)',
                marginBottom: '20px'
              }}>
                <p style={{ margin: '0 0 6px' }}><strong>ग्राहक का नाम:</strong> {customerName}</p>
                <p style={{ margin: '0 0 6px' }}><strong>डिलीवरी पता:</strong> {customerAddress}</p>
                <p style={{ margin: '0 0 6px' }}><strong>भुगतान माध्यम:</strong> {paymentMethod.toUpperCase()}</p>
                <p style={{ margin: 0 }}><strong>कुल भुगतान:</strong> ₹{finalTotal}</p>
              </div>

              <div style={{ fontSize: '12px', color: '#A7F3D0', background: 'rgba(16, 185, 129, 0.1)', padding: '10px', borderRadius: '8px', marginBottom: '20px' }}>
                🚚 आपके पवित्र वैदिक उत्पाद को वाराणसी वैदिक पंडितों द्वारा प्राण-प्रतिष्ठित कर 2 से 4 कार्य दिवसों में सुरक्षित पहुंचा दिया जाएगा।
              </div>

              <button
                onClick={onClose}
                style={{
                  background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '10px 24px',
                  borderRadius: '999px',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                शॉपिंग जारी रखें
              </button>
            </div>
          ) : step === 'checkout' ? (
            <form onSubmit={handlePlaceOrder} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E1', marginBottom: '4px' }}>
                  पूरा नाम:
                </label>
                <input
                  type="text"
                  required
                  placeholder="उदा. अमित कुमार"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: '#FFFFFF',
                    fontSize: '13px'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E1', marginBottom: '4px' }}>
                    मोबाइल नंबर:
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="9876543210"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: '#FFFFFF',
                      fontSize: '13px'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E1', marginBottom: '4px' }}>
                    ईमेल (रिपोर्ट हेतु):
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="amit@example.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: '#FFFFFF',
                      fontSize: '13px'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E1', marginBottom: '4px' }}>
                  डिलीवरी का पूरा पता (पिनकोड सहित):
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="मकान संख्या, मार्ग, क्षेत्र, शहर, पिनकोड"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: '#FFFFFF',
                    fontSize: '13px',
                    resize: 'none'
                  }}
                />
              </div>

              {/* Payment Option */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E1', marginBottom: '6px' }}>
                  भुगतान का माध्यम:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                  {[
                    { id: 'upi', label: 'UPI / QR' },
                    { id: 'card', label: 'कार्ड / नेटबैंकिंग' },
                    { id: 'cod', label: 'कैश ऑन डिलीवरी' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPaymentMethod(p.id as any)}
                      style={{
                        padding: '8px',
                        borderRadius: '8px',
                        border: paymentMethod === p.id ? '1px solid #F59E0B' : '1px solid rgba(255,255,255,0.1)',
                        background: paymentMethod === p.id ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255,255,255,0.03)',
                        color: paymentMethod === p.id ? '#FDE68A' : '#94A3B8',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div style={{
                background: '#1E293B',
                borderRadius: '10px',
                padding: '12px',
                fontSize: '12px',
                lineHeight: 1.6
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>उप-योग (Subtotal):</span>
                  <span>₹{subtotal}</span>
                </div>
                {appliedDiscountPercent > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10B981' }}>
                    <span>कूपन छूट ({appliedDiscountPercent}%):</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>डिलीवरी शुल्क:</span>
                  <span>{deliveryCharge === 0 ? 'मुफ़्त (Free)' : `₹${deliveryCharge}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '6px', marginTop: '6px', fontSize: '14px', fontWeight: 'bold' }}>
                  <span style={{ color: '#FDE68A' }}>कुल देय राशि:</span>
                  <span style={{ color: '#FDE68A' }}>₹{finalTotal}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  style={{
                    flex: 1,
                    background: 'rgba(255,255,255,0.08)',
                    color: '#CBD5E1',
                    border: 'none',
                    padding: '10px',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  कार्ट में वापस
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 2,
                    background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '10px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  ऑर्डर की पुष्टि करें (₹{finalTotal})
                </button>
              </div>
            </form>
          ) : (
            <div>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 10px', color: '#94A3B8' }}>
                  <ShoppingBag size={48} color="#64748B" style={{ margin: '0 auto 12px' }} />
                  <p style={{ margin: 0, fontSize: '15px' }}>आपकी एस्ट्रो कार्ट अभी खाली है।</p>
                  <p style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                    प्रमाणित रत्न, सिद्ध रुद्राक्ष एवं हस्तलिखित कुंडली रिपोर्ट का अन्वेषण करें।
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        background: '#1E293B',
                        borderRadius: '12px',
                        padding: '10px 14px',
                        border: '1px solid rgba(255,255,255,0.06)'
                      }}
                    >
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.titleHi}
                        style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }}
                      />
                      <div style={{ flex: 1 }}>
                        <h5 style={{ margin: 0, fontSize: '13px', color: '#FDE68A', fontWeight: 600 }}>
                          {item.product.titleHi}
                        </h5>
                        <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '2px' }}>
                          ₹{item.product.price} × {item.quantity} = <strong style={{ color: '#FFFFFF' }}>₹{item.product.price * item.quantity}</strong>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <button
                          onClick={() => onUpdateQty(item.product.id, -1)}
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '4px',
                            background: 'rgba(255,255,255,0.1)',
                            color: '#FFFFFF',
                            fontSize: '14px',
                            cursor: 'pointer'
                          }}
                        >
                          -
                        </button>
                        <span style={{ fontSize: '13px', fontWeight: 'bold', minWidth: '16px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQty(item.product.id, 1)}
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '4px',
                            background: 'rgba(255,255,255,0.1)',
                            color: '#FFFFFF',
                            fontSize: '14px',
                            cursor: 'pointer'
                          }}
                        >
                          +
                        </button>
                        <button
                          onClick={() => onRemove(item.product.id)}
                          style={{
                            color: '#EF4444',
                            background: 'none',
                            padding: '4px',
                            marginLeft: '6px',
                            cursor: 'pointer'
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Coupon Bar */}
                  <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                      <input
                        type="text"
                        placeholder="कूपन कोड डालें (उदा. SHREE108)"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        style={{
                          width: '100%',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(245, 158, 11, 0.3)',
                          borderRadius: '8px',
                          padding: '8px 12px',
                          color: '#FFFFFF',
                          fontSize: '12px',
                          textTransform: 'uppercase'
                        }}
                      />
                    </div>
                    <button
                      type="submit"
                      style={{
                        background: '#D97706',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '8px 14px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      लागू करें
                    </button>
                  </form>

                  {couponSuccess && (
                    <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#10B981' }}>{couponSuccess}</p>
                  )}
                  {couponError && (
                    <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#EF4444' }}>{couponError}</p>
                  )}

                  {/* Price breakdown */}
                  <div style={{
                    background: '#1E293B',
                    borderRadius: '10px',
                    padding: '12px',
                    fontSize: '12px',
                    lineHeight: 1.6,
                    marginTop: '8px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#94A3B8' }}>उप-योग:</span>
                      <span>₹{subtotal}</span>
                    </div>
                    {appliedDiscountPercent > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10B981' }}>
                        <span>छूट ({appliedDiscountPercent}%):</span>
                        <span>-₹{discountAmount}</span>
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#94A3B8' }}>डिलीवरी:</span>
                      <span>{deliveryCharge === 0 ? 'मुफ़्त' : `₹${deliveryCharge}`}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '6px', marginTop: '6px', fontSize: '14px', fontWeight: 'bold' }}>
                      <span style={{ color: '#FDE68A' }}>कुल योग:</span>
                      <span style={{ color: '#FDE68A' }}>₹{finalTotal}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setStep('checkout')}
                    style={{
                      marginTop: '6px',
                      background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '12px',
                      borderRadius: '999px',
                      fontWeight: 700,
                      fontSize: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 15px rgba(217, 119, 6, 0.4)'
                    }}
                  >
                    चेकआउट की ओर बढ़ें (₹{finalTotal})
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
