import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../store/AppContext';
import { apiClient } from '../../services/apiClient';
import { 
  X, 
  CheckCircle2, 
  UploadCloud, 
  FileText, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  CreditCard, 
  QrCode, 
  Sparkles,
  AlertCircle,
  Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ServiceApplicationModal: React.FC = () => {
  const navigate = useNavigate();
  const { 
    isApplyModalOpen, 
    setIsApplyModalOpen, 
    selectedServiceForApply, 
    submitApplication,
    setIsTrackerOpen,
    setActiveTrackerQuery,
    language 
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [applicantName, setApplicantName] = useState('Rahul Verma');
  const [applicantPhone, setApplicantPhone] = useState('+91 98765 12340');
  const [applicantEmail, setApplicantEmail] = useState('rahul.verma@gmail.com');
  const [state, setState] = useState('Bihar');
  const [city, setCity] = useState('Patna');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [docNumberInput, setDocNumberInput] = useState('999999990019');
  const [scrutinyResult, setScrutinyResult] = useState<{ isValid: boolean; reason: string } | null>(null);
  const [isScrutinizing, setIsScrutinizing] = useState(false);
  const [isOCRValidating, setIsOCRValidating] = useState(false);
  const [isDigiLockerFetching, setIsDigiLockerFetching] = useState(false);
  const [ocrScore, setOcrScore] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'wallet'>('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedAppId, setGeneratedAppId] = useState<string | null>(null);
  const [showPrintSlip, setShowPrintSlip] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsApplyModalOpen(false);
        setStep(1);
        setGeneratedAppId(null);
      }
    };
    if (isApplyModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isApplyModalOpen, setIsApplyModalOpen]);

  if (!isApplyModalOpen || !selectedServiceForApply) return null;

  const service = selectedServiceForApply;
  const basePrice = service.basePrice;
  const govtFee = service.govtFee || 0;
  const professionalFee = service.professionalFee || 0;
  const gst = Math.round((basePrice * 18) / 100);
  const totalAmount = basePrice + govtFee + gst;

  const handleLiveDocumentScrutiny = async () => {
    if (!docNumberInput) return;
    setIsScrutinizing(true);
    const docType = service.title.toLowerCase().includes('pan') ? 'pan' : 'aadhaar';
    const result = await apiClient.scrutinizeDocument(docType, docNumberInput);
    if (result) {
      setScrutinyResult({ isValid: result.isValid, reason: result.reason });
      if (result.isValid) {
        setUploadedFiles(prev => [...prev, `${docType.toUpperCase()}_Verified_${docNumberInput.slice(-4)}.pdf`]);
      }
    }
    setIsScrutinizing(false);
  };

  const handleSimulatedUpload = (docName: string) => {
    setIsOCRValidating(true);
    setTimeout(() => {
      setUploadedFiles(prev => [...prev, `${docName.replace(/\s+/g, '_')}_verified.pdf`]);
      setOcrScore(Math.floor(95 + Math.random() * 5));
      setIsOCRValidating(false);
    }, 600);
  };

  const handleDigiLockerFetch = (docName: string) => {
    setIsDigiLockerFetching(true);
    setTimeout(() => {
      setUploadedFiles(prev => [...prev, `${docName.replace(/\s+/g, '_')}_DigiLocker_Verified.xml`]);
      setOcrScore(99);
      setIsDigiLockerFetching(false);
    }, 700);
  };

  const handleConfirmAndPay = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const newId = submitApplication({
        serviceId: service.id,
        serviceName: service.title,
        category: service.category,
        applicantName,
        applicantPhone,
        applicantEmail,
        city,
        state,
        feePaid: totalAmount,
        documentsUploaded: uploadedFiles.length > 0 ? uploadedFiles : ['Aadhaar_Document_Verified.pdf'],
        notes: `Application initiated online. Payment mode: ${paymentMethod.toUpperCase()}. Simulated OCR score: 98.2% (Demo Scrutiny).`,
      });

      setGeneratedAppId(newId);
      setIsSubmitting(false);
      setStep(4);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1000);
  };

  const closeModal = () => {
    setIsApplyModalOpen(false);
    setStep(1);
    setGeneratedAppId(null);
  };

  return (
    <div 
      onClick={closeModal}
      style={{
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
      }}
    >
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
          border: '1px solid rgba(245, 158, 11, 0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid #E2E8F0',
          background: '#F8FAFC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
              <span className="badge badge-blue">{service.category.toUpperCase()}</span>
              {service.badge && <span className="badge badge-gold">{service.badge}</span>}
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0A192F' }}>
              {language === 'hi' ? service.titleHi : service.title}
            </h3>
          </div>

          <button 
            type="button"
            onClick={closeModal} 
            className="btn-outline" 
            style={{ 
              padding: '0.4rem 0.75rem', 
              color: '#475569', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              fontSize: '0.82rem',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              background: '#FFFFFF',
              cursor: 'pointer'
            }}
            title="Press Esc or click to close"
          >
            <X size={16} />
            <span>बंद करें / Close</span>
          </button>
        </div>

        {/* Multi-Step Wizard Indicator */}
        {step < 4 && (
          <div style={{
            display: 'flex',
            borderBottom: '1px solid #E2E8F0',
            background: '#FFFFFF',
            fontSize: '0.78rem',
            fontWeight: 700,
          }}>
            {[
              { num: 1, label: 'Applicant Details' },
              { num: 2, label: 'Document Checklist & OCR' },
              { num: 3, label: 'Transparent Pricing & Pay' },
            ].map(s => {
              const isActive = step === s.num;
              const isPast = step > s.num;
              return (
                <div
                  key={s.num}
                  style={{
                    flex: 1,
                    padding: '0.65rem 0.5rem',
                    textAlign: 'center',
                    borderBottom: isActive ? '3px solid #1D4ED8' : '3px solid transparent',
                    color: isActive ? '#1D4ED8' : isPast ? '#059669' : '#94A3B8',
                    background: isActive ? '#EFF6FF' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.35rem',
                  }}
                >
                  <span>{isPast ? '✓' : s.num}.</span>
                  <span>{s.label}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Wizard Body */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
          {/* STEP 1: Applicant Details */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                background: '#F8FAFC',
                borderRadius: '12px',
                padding: '0.85rem',
                border: '1px solid #E2E8F0',
                fontSize: '0.82rem',
                color: '#475569',
              }}>
                <div style={{ fontWeight: 700, color: '#0A192F', marginBottom: '0.2rem' }}>
                  Service SLA Commitment:
                </div>
                Estimated processing timeline: <strong>{service.timeline}</strong>. Guaranteed expert assistance with regular SMS and in-app alerts.
              </div>

              <div className="form-group">
                <label className="form-label">Applicant / Business Full Name *</label>
                <input
                  type="text"
                  className="form-input"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder="e.g. Vikram Sharma"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Phone (WhatsApp enabled) *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={applicantPhone}
                    onChange={(e) => setApplicantPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    className="form-input"
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">State *</label>
                  <select
                    className="form-select"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option value="Bihar">Bihar</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Delhi">Delhi NCT</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">District / City *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Patna"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn-secondary"
                  style={{ flex: 1 }}
                >
                  रद्द करें / Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="btn-primary btn-lg"
                  style={{ flex: 2 }}
                >
                  <span>Continue to Document Checklist</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Document Checklist & OCR Scrutiny */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0A192F', marginBottom: '0.25rem' }}>
                  Required Document Uploads
                </h4>
                <p style={{ fontSize: '0.82rem', color: '#64748B' }}>
                  Our Quantum AI Document engine will perform instant OCR quality check, readability verification, and duplicate screening.
                </p>
              </div>

              <div style={{
                background: '#F8FAFC',
                borderRadius: '14px',
                padding: '1rem',
                border: '1px solid #E2E8F0',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0A192F', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldCheck size={16} color="#1D4ED8" />
                    <span>Real-Time Verhoeff & Statutory ID Checksum</span>
                  </div>
                  <span className="badge badge-blue" style={{ fontSize: '0.68rem' }}>AI Powered</span>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    value={docNumberInput}
                    onChange={(e) => setDocNumberInput(e.target.value)}
                    placeholder="Enter Aadhaar (12 digits) or PAN (e.g. ABCDE1234F)"
                    style={{
                      flex: 1,
                      padding: '0.5rem 0.75rem',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.85rem',
                      outline: 'none'
                    }}
                  />
                  <button
                    onClick={handleLiveDocumentScrutiny}
                    disabled={isScrutinizing}
                    className="btn-primary btn-sm"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    {isScrutinizing ? 'Verifying...' : 'Validate ID'}
                  </button>
                </div>

                {scrutinyResult && (
                  <div style={{
                    padding: '0.5rem 0.75rem',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    background: scrutinyResult.isValid ? '#DCFCE7' : '#FEE2E2',
                    color: scrutinyResult.isValid ? '#15803D' : '#B91C1C',
                    border: `1px solid ${scrutinyResult.isValid ? '#86EFAC' : '#FCA5A5'}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    {scrutinyResult.isValid ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                    <span>{scrutinyResult.reason}</span>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {service.requiredDocs.map((doc, idx) => {
                  const isUploaded = uploadedFiles.some(f => f.toLowerCase().includes(doc.slice(0, 5).toLowerCase()));
                  return (
                    <div
                      key={idx}
                      style={{
                        padding: '1rem',
                        borderRadius: '12px',
                        border: isUploaded ? '1.5px solid #10B981' : '1px solid #E2E8F0',
                        background: isUploaded ? '#F0FDF4' : '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          background: isUploaded ? '#DCFCE7' : '#F1F5F9',
                          color: isUploaded ? '#059669' : '#64748B',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          {isUploaded ? <CheckCircle2 size={18} /> : <FileText size={18} />}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0A192F' }}>
                            {doc}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                            {isUploaded ? 'Verified via Quantum OCR (98.4% Confidence)' : 'Required for statutory filing'}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                        <button
                          type="button"
                          onClick={() => handleSimulatedUpload(doc)}
                          disabled={isUploaded || isOCRValidating || isDigiLockerFetching}
                          style={{
                            padding: '0.4rem 0.7rem',
                            borderRadius: '8px',
                            background: isUploaded ? '#10B981' : '#1D4ED8',
                            color: '#FFFFFF',
                            fontWeight: 600,
                            fontSize: '0.76rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            opacity: (isOCRValidating || isDigiLockerFetching) ? 0.6 : 1,
                            cursor: isUploaded ? 'default' : 'pointer',
                            border: 'none',
                          }}
                          title="Option A: Direct upload with Quantum OCR"
                        >
                          <UploadCloud size={13} />
                          <span>{isUploaded ? 'Verified' : 'Upload & Scan (Opt A)'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDigiLockerFetch(doc)}
                          disabled={isUploaded || isOCRValidating || isDigiLockerFetching}
                          style={{
                            padding: '0.4rem 0.7rem',
                            borderRadius: '8px',
                            background: isUploaded ? '#F1F5F9' : '#047857',
                            color: isUploaded ? '#64748B' : '#FFFFFF',
                            fontWeight: 600,
                            fontSize: '0.76rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            opacity: (isOCRValidating || isDigiLockerFetching) ? 0.6 : 1,
                            cursor: isUploaded ? 'default' : 'pointer',
                            border: isUploaded ? '1px solid #CBD5E1' : 'none',
                          }}
                          title="Option B: Consent-based DigiLocker retrieval"
                        >
                          <Sparkles size={13} />
                          <span>DigiLocker (Opt B)</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {isOCRValidating && (
                <div style={{
                  padding: '0.75rem',
                  borderRadius: '10px',
                  background: '#EFF6FF',
                  border: '1px solid #BFDBFE',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.82rem',
                  color: '#1D4ED8',
                }}>
                  <Sparkles size={16} className="animate-pulse-glow" />
                  <span>Quantum AI Scanning: Checking tamper signatures & OCR name consistency...</span>
                </div>
              )}

              {isDigiLockerFetching && (
                <div style={{
                  padding: '0.75rem',
                  borderRadius: '10px',
                  background: '#ECFDF5',
                  border: '1px solid #A7F3D0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.82rem',
                  color: '#047857',
                }}>
                  <ShieldCheck size={16} className="animate-pulse-glow" />
                  <span>DigiLocker Gateway: Fetching citizen consent-verified document payload with PKI signature...</span>
                </div>
              )}

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  onClick={() => setStep(1)}
                  className="btn-secondary"
                  style={{ flex: 1 }}
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="btn-primary"
                  style={{ flex: 2 }}
                >
                  <span>Review Quote & Proceed</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Transparent Pricing & Checkout */}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{
                background: '#F8FAFC',
                borderRadius: '16px',
                padding: '1.25rem',
                border: '1px solid #E2E8F0',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
                fontSize: '0.88rem',
              }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0A192F', marginBottom: '0.25rem' }}>
                  TRANSPARENT PRICING BREAKDOWN:
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                  <span>Platform / Base Professional Fee</span>
                  <span style={{ fontWeight: 600 }}>₹{basePrice.toLocaleString('en-IN')}</span>
                </div>
                {govtFee > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                    <span>Statutory Department / Portal Fee</span>
                    <span style={{ fontWeight: 600 }}>₹{govtFee.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                  <span>GST (18% - ITC Eligible)</span>
                  <span style={{ fontWeight: 600 }}>₹{gst.toLocaleString('en-IN')}</span>
                </div>
                <div style={{
                  borderTop: '1px solid #CBD5E1',
                  paddingTop: '0.75rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  color: '#0A192F',
                }}>
                  <span>Final Total to Pay</span>
                  <span style={{ color: '#1D4ED8' }}>₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Payment Gateway choice */}
              <div>
                <label className="form-label" style={{ marginBottom: '0.5rem' }}>
                  Select Payment Method:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                  {[
                    { id: 'upi', label: 'Instant UPI / QR', icon: <QrCode size={18} /> },
                    { id: 'card', label: 'Debit / Credit Card', icon: <CreditCard size={18} /> },
                    { id: 'wallet', label: 'AD Wallet Balance', icon: <Sparkles size={18} /> },
                  ].map(m => (
                    <button
                      key={m.id}
                      onClick={() => setPaymentMethod(m.id as any)}
                      style={{
                        padding: '0.85rem 0.65rem',
                        borderRadius: '12px',
                        border: paymentMethod === m.id ? '2px solid #1D4ED8' : '1px solid #E2E8F0',
                        background: paymentMethod === m.id ? '#EFF6FF' : '#FFFFFF',
                        color: paymentMethod === m.id ? '#1D4ED8' : '#475569',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.35rem',
                      }}
                    >
                      {m.icon}
                      <span>{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  onClick={() => setStep(2)}
                  className="btn-secondary"
                  style={{ flex: 1 }}
                >
                  Back
                </button>
                <button
                  onClick={handleConfirmAndPay}
                  disabled={isSubmitting}
                  className="btn-gold btn-lg"
                  style={{ flex: 2, fontWeight: 800 }}
                >
                  {isSubmitting ? 'Processing Payment...' : `Pay ₹${totalAmount.toLocaleString('en-IN')} & Generate Token`}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Success & Token Dispatch */}
          {step === 4 && (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#ECFDF5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
              }}>
                <CheckCircle2 size={36} />
              </div>

              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0A192F', marginBottom: '0.25rem' }}>
                Application Generated Successfully!
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#64748B', marginBottom: '1.5rem' }}>
                Assigned to regional verification queue with live SMS notification alerts.
              </p>

              {/* Official Acknowledgement Slip Preview Modal/Section */}
              {showPrintSlip ? (
                <div style={{
                  background: '#FFFFFF',
                  border: '2px solid #0B3B60',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  textAlign: 'left',
                  marginBottom: '1.5rem',
                  color: '#0F172A',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
                }}>
                  <div style={{ borderBottom: '2px solid #0B3B60', paddingBottom: '0.75rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#0B3B60', letterSpacing: '0.04em' }}>
                        AKUL DRAVIN DIGITAL SERVICES (ADCS)
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>
                        Akul Dravin Digital Services • ADCS Sovereign Citizen Network
                      </div>
                    </div>
                    <div style={{
                      background: '#EFF6FF',
                      border: '1px solid #BFDBFE',
                      padding: '0.25rem 0.6rem',
                      borderRadius: '6px',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      color: '#1D4ED8'
                    }}>
                      OFFICIAL RECEIPT
                    </div>
                  </div>

                  <div style={{ background: '#F8FAFC', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '1rem', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.6rem', fontSize: '0.8rem' }}>
                    <div>
                      <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>APPLICATION TOKEN / टोकन:</span>
                      <strong style={{ color: '#0B3B60', fontSize: '0.92rem' }}>{generatedAppId}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>DATE & TIME / दिनांक:</span>
                      <strong>{new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>SERVICE NAME / सेवा:</span>
                      <strong>{service.title}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>APPLICANT NAME / आवेदक:</span>
                      <strong>{applicantName}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>MOBILE / संपर्क:</span>
                      <strong>{applicantPhone}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>DISTRICT & STATE / राज्य:</span>
                      <strong>{city}, {state}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>ADCS KENDRA / केंद्र:</span>
                      <strong>Akul Dravin Digital Services Kendra (Operator ID: 245089123456)</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>FEE PAID / भुगतान राशि:</span>
                      <strong style={{ color: '#16A34A' }}>₹{totalAmount.toLocaleString('en-IN')} ({paymentMethod.toUpperCase()})</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px dashed #CBD5E1', paddingTop: '0.75rem', fontSize: '0.75rem', color: '#64748B' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <ShieldCheck size={16} color="#16A34A" />
                      <span>Security Digitally Signed & Verified (ADCS Connect OAuth 2.0 Gateway)</span>
                    </div>
                    <div style={{ fontWeight: 700, color: '#16A34A' }}>
                      STATUS: SUBMITTED
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => window.print()}
                      style={{
                        background: '#0B3B60',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '0.55rem 1rem',
                        borderRadius: '6px',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem'
                      }}
                    >
                      <Printer size={15} />
                      <span>Print Slip (प्रिंट करें)</span>
                    </button>
                    <button
                      onClick={() => setShowPrintSlip(false)}
                      style={{
                        background: '#F1F5F9',
                        color: '#475569',
                        border: '1px solid #CBD5E1',
                        padding: '0.55rem 1rem',
                        borderRadius: '6px',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Back to Overview
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{
                  background: '#EFF6FF',
                  border: '1.5px dashed #93C5FD',
                  borderRadius: '16px',
                  padding: '1.25rem',
                  marginBottom: '1.75rem',
                  display: 'inline-block',
                  minWidth: '280px',
                }}>
                  <div style={{ fontSize: '0.75rem', color: '#1D4ED8', fontWeight: 700, textTransform: 'uppercase' }}>
                    YOUR UNIQUE APPLICATION TOKEN
                  </div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0A192F', letterSpacing: '0.05em' }}>
                    {generatedAppId}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#475569', marginTop: '0.25rem' }}>
                    Use this token anytime to track progress live
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                {!showPrintSlip && (
                  <button
                    onClick={() => setShowPrintSlip(true)}
                    style={{
                      background: '#0B3B60',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '0.65rem 1.15rem',
                      borderRadius: '8px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      fontSize: '0.88rem'
                    }}
                  >
                    <Printer size={16} />
                    <span>Print ADCS Acknowledgement Slip</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    closeModal();
                    if (generatedAppId) {
                      setActiveTrackerQuery(generatedAppId);
                      navigate('/track?q=' + generatedAppId);
                    }
                  }}
                  className="btn-primary"
                >
                  <span>Track Status Live</span>
                  <ArrowRight size={15} />
                </button>

                <button
                  onClick={closeModal}
                  className="btn-secondary"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
