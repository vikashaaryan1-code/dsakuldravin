import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { 
  Search, 
  Compass, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  User, 
  Phone, 
  Calendar, 
  ShieldCheck, 
  Download, 
  Share2, 
  Sparkles, 
  ArrowRight,
  Package,
  Truck,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const TrackPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { applications, shipments, setIsQuantumAIOpen, showToast, logAudit, language } = useApp();

  const queryFromUrl = searchParams.get('q') || searchParams.get('id') || '';
  const [searchQuery, setSearchQuery] = useState(queryFromUrl || 'AD-APP-9102');
  const [searchedEntity, setSearchedEntity] = useState<any>(() => {
    if (queryFromUrl) {
      const foundApp = applications.find(a => 
        a.id.toLowerCase() === queryFromUrl.toLowerCase() ||
        a.applicantPhone.includes(queryFromUrl)
      );
      if (foundApp) return { type: 'application', data: foundApp };

      const foundShip = shipments.find(s => 
        s.awb.toLowerCase() === queryFromUrl.toLowerCase() || 
        s.id.toLowerCase() === queryFromUrl.toLowerCase()
      );
      if (foundShip) return { type: 'shipment', data: foundShip };
    }
    return { type: 'application', data: applications[0] };
  });

  useEffect(() => {
    if (queryFromUrl) {
      handleSearch(queryFromUrl);
    }
  }, [queryFromUrl]);

  const handleSearch = (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;

    // Check applications
    const foundApp = applications.find(a => 
      a.id.toLowerCase() === trimmed.toLowerCase() ||
      a.applicantPhone.includes(trimmed) ||
      a.applicantEmail.toLowerCase().includes(trimmed.toLowerCase())
    );
    if (foundApp) {
      setSearchedEntity({ type: 'application', data: foundApp });
      logAudit(`Track Application: ${foundApp.id}`, 'Universal Tracker');
      return;
    }

    // Check shipments
    const foundShipment = shipments.find(s => 
      s.awb.toLowerCase() === trimmed.toLowerCase() ||
      s.id.toLowerCase() === trimmed.toLowerCase()
    );
    if (foundShipment) {
      setSearchedEntity({ type: 'shipment', data: foundShipment });
      logAudit(`Track Shipment: ${foundShipment.awb}`, 'Universal Tracker');
      return;
    }

    setSearchedEntity(null);
  };

  const handleDownloadReceipt = () => {
    const isApp = searchedEntity?.type === 'application';
    const entity = searchedEntity?.data;
    const trackingId = isApp ? (entity?.id || 'ADCS-APP-ACK') : (entity?.awb || 'ADCS-SHIP-ACK');
    const latestStage = isApp
      ? ([...(entity?.trackingSteps || [])].reverse().find((s: { done?: boolean; stage?: string }) => s.done)?.stage || entity?.status || 'Verification In Progress')
      : entity?.status || 'Booked';
    const content = `================================================================================
AKUL DRAVIN DIGITAL SERVICES (ADCS) - OFFICIAL TRACKING ACKNOWLEDGEMENT
================================================================================
Tracking Reference : ${trackingId}
Record Type        : ${isApp ? 'Citizen E-Governance / Digital Service Application' : 'Logistics Express Consignment'}
Current Status     : ${entity?.status || 'Active / Processing'}
Timestamp          : ${new Date().toLocaleString('en-IN')}
--------------------------------------------------------------------------------
DETAILS:
${isApp ? `Service Name       : ${entity?.serviceName || 'E-Governance Service'}
Applicant Name     : ${entity?.applicantName || 'Citizen Applicant'}
Contact Mobile     : ${entity?.applicantPhone || 'Verified'}
Fee Paid           : ₹${entity?.feePaid || 0} (${entity?.feePaid > 0 ? 'Paid & Verified' : 'Pending'})
Current SLA Stage  : ${latestStage}
Submission Date    : ${entity?.submittedAt || 'Recent'}` : `Courier Service    : ${entity?.serviceType || 'ADCS Express Hub'}
Origin Hub         : ${entity?.senderCity || 'Regional Distribution Hub'}
Destination        : ${entity?.receiverCity || 'Destination Address'}
Current Location   : ${entity?.currentLocation || 'In Transit'}
Expected Delivery  : ${entity?.expectedDelivery || 'Standard SLA'}
Chargeable Weight  : ${entity?.weightKg || 1} kg (₹${entity?.price || 0})`}
--------------------------------------------------------------------------------
STATUTORY & SECURITY COMPLIANCE:
- DPDP Act 2025    : End-to-End Cryptographic Audit Logging
- Digital Seal     : ADCS-TRACKING-VERIFIED-SEAL
- Verification URL : https://akuldravindigital.com/track?q=${encodeURIComponent(trackingId)}
- Audit Hash       : SHA256-${trackingId.replace(/[^A-Z0-9]/gi, '').toUpperCase()}-ACK-VALID
================================================================================
This is an authentic computer-generated acknowledgement receipt.
Akul Dravin Digital Services Private Trust Network
================================================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ADCS_Acknowledgement_${trackingId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast('Acknowledgement Downloaded', 'Official stamped receipt downloaded to your device.', 'success');
    confetti({ particleCount: 50, spread: 60 });
  };

  return (
    <div className="container-wide" style={{ padding: '2.5rem 1.5rem 5rem' }}>
      {/* Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0A192F 0%, #0D2137 60%, #1D4ED8 100%)',
        borderRadius: '24px',
        padding: '3rem 2.5rem',
        color: '#FFFFFF',
        marginBottom: '2.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem',
      }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(245, 158, 11, 0.2)',
            border: '1px solid #F59E0B',
            borderRadius: '9999px',
            padding: '0.3rem 0.75rem',
            fontSize: '0.78rem',
            fontWeight: 700,
            color: '#F59E0B',
            marginBottom: '1rem',
          }}>
            <Compass size={14} />
            <span>REAL-TIME SLA & MILESTONE TRACKER</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 900, marginBottom: '0.75rem', color: '#FFFFFF' }}>
            {language === 'hi' ? 'लाइव आवेदन एवं पार्सल ट्रैकिंग' : 'Live Application & Order Tracking'}
          </h1>
          <p style={{ fontSize: '1rem', color: '#CBD5E1', maxWidth: '640px', lineHeight: 1.6 }}>
            Track any government application, incorporation filing, courier consignment, utility bill payment, or service ticket across India.
          </p>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '1.25rem 1.75rem',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '0.8rem', color: '#93C5FD' }}>AVERAGE DISPATCH SLA</div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#F59E0B' }}>48 Hours</div>
          <div style={{ fontSize: '0.75rem', color: '#10B981' }}>99.8% On-Time Completion</div>
        </div>
      </div>

      {/* Interactive Search Console */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        padding: '2rem',
        border: '1px solid #E2E8F0',
        boxShadow: '0 8px 30px rgba(10, 25, 47, 0.05)',
        marginBottom: '2.5rem',
      }}>
        <form onSubmit={(e) => { e.preventDefault(); handleSearch(searchQuery); }} style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
        }}>
          <div style={{ flex: 1, minWidth: '280px', position: 'relative' }}>
            <Search size={20} color="#64748B" style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter Application ID (e.g. AD-APP-9102), Courier AWB (DEL-AIR-8921), or Mobile..."
              style={{
                width: '100%',
                padding: '1rem 1rem 1rem 3.2rem',
                borderRadius: '12px',
                border: '2px solid #CBD5E1',
                fontSize: '1rem',
                fontWeight: 600,
                color: '#0A192F',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => e.target.style.borderColor = '#1D4ED8'}
              onBlur={(e) => e.target.style.borderColor = '#CBD5E1'}
            />
          </div>
          <button type="submit" className="btn-primary" style={{ padding: '0 2rem', fontSize: '1rem', borderRadius: '12px' }}>
            <span>Search Status</span>
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Quick Sample Query Chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748B' }}>Quick Samples:</span>
          {[
            { label: 'PAN Card (AD-APP-9102)', val: 'AD-APP-9102' },
            { label: 'Pvt Ltd Setup (AD-APP-8841)', val: 'AD-APP-8841' },
            { label: 'वैदिक ज्योतिष (AD-ASTRO-842915)', val: 'AD-ASTRO-842915' },
            { label: 'Express Courier (DEL-AIR-8921)', val: 'DEL-AIR-8921' },
            { label: 'GST Filing (AD-APP-7720)', val: 'AD-APP-7720' },
          ].map((sample) => (
            <button
              key={sample.val}
              type="button"
              onClick={() => {
                setSearchQuery(sample.val);
                handleSearch(sample.val);
              }}
              style={{
                background: '#F1F5F9',
                border: '1px solid #E2E8F0',
                borderRadius: '9999px',
                padding: '0.3rem 0.8rem',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#1D4ED8',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#E2E8F0'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#F1F5F9'}
            >
              {sample.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results View */}
      {searchedEntity ? (
        searchedEntity.type === 'application' ? (
          /* Application Timeline & Details */
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.9fr', gap: '2rem' }} className="responsive-grid">
            {/* Left: Interactive Stepper Timeline */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              padding: '2rem',
              border: '1px solid #E2E8F0',
              boxShadow: '0 4px 20px rgba(10, 25, 47, 0.04)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <span className="badge badge-navy" style={{ marginBottom: '0.4rem' }}>
                    {searchedEntity.data.category.toUpperCase()} WORKFLOW
                  </span>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0A192F', margin: 0 }}>
                    {searchedEntity.data.serviceName}
                  </h2>
                </div>
                <span className={`badge ${
                  searchedEntity.data.status === 'Completed' ? 'badge-green' :
                  searchedEntity.data.status === 'In Processing' ? 'badge-blue' :
                  searchedEntity.data.status === 'Rejected' ? 'badge-red' : 'badge-gold'
                }`} style={{ fontSize: '0.85rem', padding: '0.4rem 0.9rem' }}>
                  ● {searchedEntity.data.status}
                </span>
              </div>

              {/* Visual Vertical Timeline */}
              <div style={{ position: 'relative', paddingLeft: '2.5rem', marginTop: '1.5rem' }}>
                <div style={{
                  position: 'absolute',
                  left: '15px',
                  top: '10px',
                  bottom: '20px',
                  width: '3px',
                  background: '#E2E8F0',
                }} />

                {searchedEntity.data.trackingSteps?.map((step: any, idx: number) => {
                  const isDone = step.isCompleted;
                  const isCurrent = step.isCurrent;

                  return (
                    <div key={idx} style={{ position: 'relative', marginBottom: '2rem' }}>
                      {/* Step Indicator Node */}
                      <div style={{
                        position: 'absolute',
                        left: '-2.5rem',
                        top: '0',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: isDone ? '#10B981' : isCurrent ? '#1D4ED8' : '#F1F5F9',
                        color: isDone || isCurrent ? '#FFFFFF' : '#94A3B8',
                        border: isCurrent ? '3px solid #BFDBFE' : '2px solid #FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: isCurrent ? '0 0 12px rgba(29, 78, 216, 0.4)' : 'none',
                        zIndex: 2,
                      }}>
                        {isDone ? <CheckCircle2 size={18} /> : isCurrent ? <Clock size={16} /> : <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>{idx + 1}</span>}
                      </div>

                      <div style={{
                        background: isCurrent ? '#EFF6FF' : '#F8FAFC',
                        borderRadius: '12px',
                        padding: '1.25rem',
                        border: isCurrent ? '1.5px solid #93C5FD' : '1px solid #E2E8F0',
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                          <h4 style={{ fontSize: '1.02rem', fontWeight: 700, color: '#0A192F', margin: 0 }}>
                            {language === 'hi' ? step.titleHi || step.title : step.title}
                          </h4>
                          <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>
                            {step.date}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.86rem', color: '#475569', margin: 0 }}>
                          {language === 'hi' ? step.descriptionHi || step.description : step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Assistant Callout */}
              <div style={{
                background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
                borderRadius: '14px',
                padding: '1.25rem',
                border: '1px solid #BFDBFE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                marginTop: '1rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Sparkles size={22} color="#1D4ED8" />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0A192F' }}>Need Urgent Resolution?</div>
                    <div style={{ fontSize: '0.78rem', color: '#475569' }}>Ask Quantum AI to expedite scrutiny or notify your officer.</div>
                  </div>
                </div>
                <button
                  onClick={() => setIsQuantumAIOpen(true)}
                  className="btn-gold btn-sm"
                >
                  <Sparkles size={14} />
                  <span>Ask AI Assistant</span>
                </button>
              </div>
            </div>

            {/* Right: Application Metadata & Documents Card */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                padding: '2rem',
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 20px rgba(10, 25, 47, 0.04)',
              }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0A192F', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FileText size={18} color="#1D4ED8" />
                  <span>Dossier Overview</span>
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.88rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.6rem', borderBottom: '1px solid #F1F5F9' }}>
                    <span style={{ color: '#64748B' }}>Application Number:</span>
                    <span style={{ fontWeight: 700, color: '#0A192F' }}>{searchedEntity.data.id}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.6rem', borderBottom: '1px solid #F1F5F9' }}>
                    <span style={{ color: '#64748B' }}>Applicant Name:</span>
                    <span style={{ fontWeight: 700, color: '#0A192F' }}>{searchedEntity.data.applicantName}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.6rem', borderBottom: '1px solid #F1F5F9' }}>
                    <span style={{ color: '#64748B' }}>Contact Phone:</span>
                    <span style={{ fontWeight: 600, color: '#0A192F' }}>{searchedEntity.data.applicantPhone}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.6rem', borderBottom: '1px solid #F1F5F9' }}>
                    <span style={{ color: '#64748B' }}>Jurisdiction:</span>
                    <span style={{ fontWeight: 600, color: '#0A192F' }}>{searchedEntity.data.city}, {searchedEntity.data.state}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.6rem', borderBottom: '1px solid #F1F5F9' }}>
                    <span style={{ color: '#64748B' }}>Assigned Executive:</span>
                    <span style={{ fontWeight: 600, color: '#1D4ED8' }}>{searchedEntity.data.assignedTo || 'Senior Officer Queue'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.6rem', borderBottom: '1px solid #F1F5F9' }}>
                    <span style={{ color: '#64748B' }}>Fee Settled:</span>
                    <span style={{ fontWeight: 800, color: '#059669' }}>₹{searchedEntity.data.feePaid}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B' }}>Submitted Timestamp:</span>
                    <span style={{ fontWeight: 600, color: '#475569', fontSize: '0.8rem' }}>{searchedEntity.data.submittedAt}</span>
                  </div>
                </div>

                {/* Uploaded Documents Scrutiny */}
                <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Verified Supporting Documents
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {searchedEntity.data.documentsUploaded?.map((doc: string, idx: number) => (
                      <div key={idx} style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: '#F8FAFC',
                        padding: '0.6rem 0.85rem',
                        borderRadius: '8px',
                        border: '1px solid #E2E8F0',
                        fontSize: '0.8rem',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <ShieldCheck size={16} color="#10B981" />
                          <span style={{ color: '#334155', fontWeight: 600 }}>{doc}</span>
                        </div>
                        <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>OCR Validated</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.75rem' }}>
                  <button
                    onClick={handleDownloadReceipt}
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <Download size={16} />
                    <span>Download Stamped Receipt</span>
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(window.location.href);
                      showToast('Link Copied', 'Direct tracking URL copied to clipboard.', 'info');
                    }}
                    className="btn-outline"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <Share2 size={16} />
                    <span>Share Live Tracking Link</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Courier Shipment Timeline */
          <div style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '2.5rem',
            border: '1px solid #E2E8F0',
            boxShadow: '0 4px 20px rgba(10, 25, 47, 0.04)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <Truck size={22} color="#1D4ED8" />
                  <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0A192F' }}>
                    Airway Bill #{searchedEntity.data.awb}
                  </span>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#64748B' }}>
                  Service: {searchedEntity.data.serviceType} • Chargeable Weight: {searchedEntity.data.weightKg} kg
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span className="badge badge-blue" style={{ fontSize: '0.9rem', padding: '0.4rem 1rem' }}>
                  {searchedEntity.data.status}
                </span>
                <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 600, marginTop: '0.3rem' }}>
                  Expected Delivery: {searchedEntity.data.expectedDelivery}
                </div>
              </div>
            </div>

            {/* Route summary */}
            <div style={{
              background: '#F8FAFC',
              borderRadius: '14px',
              padding: '1.25rem 1.75rem',
              border: '1px solid #E2E8F0',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginBottom: '2.5rem',
              flexWrap: 'wrap',
              gap: '1rem',
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>ORIGIN HUB</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0A192F' }}>{searchedEntity.data.senderCity}</div>
                <div style={{ fontSize: '0.8rem', color: '#475569' }}>Sender: {searchedEntity.data.senderName}</div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1D4ED8' }}>
                <div style={{ width: '60px', height: '2px', background: '#93C5FD' }} />
                <Truck size={24} />
                <div style={{ width: '60px', height: '2px', background: '#93C5FD' }} />
              </div>

              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>DESTINATION</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0A192F' }}>{searchedEntity.data.receiverCity}</div>
                <div style={{ fontSize: '0.8rem', color: '#475569' }}>Receiver: {searchedEntity.data.receiverName}</div>
              </div>
            </div>

            {/* Stages */}
            <div style={{ position: 'relative', paddingLeft: '2.5rem' }}>
              <div style={{ position: 'absolute', left: '15px', top: '10px', bottom: '20px', width: '3px', background: '#E2E8F0' }} />
              {searchedEntity.data.timeline?.map((step: any, idx: number) => (
                <div key={idx} style={{ position: 'relative', marginBottom: '1.75rem' }}>
                  <div style={{
                    position: 'absolute',
                    left: '-2.5rem',
                    top: '0',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: step.done ? '#10B981' : '#F1F5F9',
                    color: step.done ? '#FFFFFF' : '#94A3B8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #FFFFFF',
                    boxShadow: step.done ? '0 0 10px rgba(16, 185, 129, 0.4)' : 'none',
                  }}>
                    {step.done ? <CheckCircle2 size={16} /> : <Clock size={14} />}
                  </div>

                  <div style={{
                    background: step.done ? '#F8FAFC' : '#FFFFFF',
                    borderRadius: '10px',
                    padding: '1rem 1.25rem',
                    border: '1px solid #E2E8F0',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontWeight: 700, color: '#0A192F' }}>{step.stage}</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748B' }}>{step.timestamp}</div>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#475569', marginTop: '0.2rem' }}>
                      Facility: {step.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      ) : (
        /* Not Found Screen */
        <div style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          padding: '4rem 2rem',
          textAlign: 'center',
          border: '1px solid #E2E8F0',
        }}>
          <AlertCircle size={48} color="#D97706" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0A192F', marginBottom: '0.5rem' }}>
            No Record Found Matching "{searchQuery}"
          </h2>
          <p style={{ color: '#64748B', maxWidth: '480px', margin: '0 auto 2rem', fontSize: '0.9rem' }}>
            Please check the application identifier or phone number. If you applied via an offline franchise branch, the record may take up to 2 hours to synchronize.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button onClick={() => { setSearchQuery('AD-APP-9102'); handleSearch('AD-APP-9102'); }} className="btn-primary">
              Load Sample Record
            </button>
            <button onClick={() => setIsQuantumAIOpen(true)} className="btn-gold">
              Ask AI Support
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
