import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { 
  Hammer, 
  Calculator, 
  Ruler, 
  CheckCircle2, 
  Layers, 
  Clock, 
  HardHat, 
  Compass, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Download,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ConstructionPage: React.FC = () => {
  const { showToast, logAudit, submitApplication, addLead, language } = useApp();

  // Calculator State
  const [builtUpArea, setBuiltUpArea] = useState(1500); // in sq.ft
  const [grade, setGrade] = useState<'Standard' | 'Premium' | 'Luxury'>('Premium');
  const [floors, setFloors] = useState<number>(2); // G+1
  const [clientName, setClientName] = useState('Anand Kumar');
  const [clientPhone, setClientPhone] = useState('9431012345');
  const [projectCity, setProjectCity] = useState('Patna');
  const [submittedQuote, setSubmittedQuote] = useState<{
    appId: string;
    totalCost: number;
    totalSqFt: number;
    grade: string;
    floors: number;
  } | null>(null);

  const ratePerSqFt = grade === 'Standard' ? 1650 : grade === 'Premium' ? 1950 : 2450;
  const totalSqFt = builtUpArea * floors;
  const totalCost = totalSqFt * ratePerSqFt;
  const estimatedMonths = Math.ceil(totalSqFt / 400);
  const steelTons = (totalSqFt * 0.004).toFixed(1);
  const cementBags = Math.round(totalSqFt * 0.45);

  const handleRequestQuote = () => {
    const cleanPhone = clientPhone.replace(/\D/g, '').slice(-10);
    if (!clientName.trim() || !/^[6-9]\d{9}$/.test(cleanPhone)) {
      showToast('Invalid Contact Details', 'Please enter client name and a valid 10-digit Indian mobile number.', 'error');
      return;
    }

    const appId = submitApplication({
      serviceId: 'srv-construction-boq',
      serviceName: `Turnkey Construction BOQ (${grade} • ${totalSqFt} sq.ft)`,
      category: 'construction',
      applicantName: clientName.trim(),
      applicantPhone: `+91 ${cleanPhone}`,
      city: projectCity.trim() || 'Patna',
      feePaid: 0,
      documentsUploaded: ['BOQ_Specification_Estimate.pdf'],
      notes: `Grade: ${grade} @ ₹${ratePerSqFt}/sq.ft, Floors: G+${floors - 1}, Est Budget: ₹${totalCost.toLocaleString('en-IN')}`,
    });

    addLead({
      name: clientName.trim(),
      company: `${grade} Turnkey Build (${projectCity})`,
      email: 'civil.desk@akuldravindigital.com',
      phone: `+91 ${cleanPhone}`,
      serviceInterested: `${totalSqFt} sq.ft ${grade} Construction`,
      estimatedValue: totalCost,
      stage: 'Proposal',
      assignedExecutive: 'ADCS Structural & Architect Desk',
    });

    setSubmittedQuote({
      appId,
      totalCost,
      totalSqFt,
      grade,
      floors,
    });

    showToast('Turnkey Estimate Generated!', `BOQ ${appId} (₹${(totalCost / 100000).toFixed(2)} Lakhs) logged for Architect Survey.`, 'success');
    logAudit(`Construction BOQ Estimated (${appId}): ₹${totalCost}`, `Area: ${totalSqFt} sq.ft, Grade: ${grade}`);
    confetti({ particleCount: 80, spread: 60 });
  };

  const handleDownloadBoq = () => {
    if (!submittedQuote) return;
    const content = [
      'AKUL DRAVIN DIGITAL SERVICES (ADCS) — TURNKEY CONSTRUCTION BOQ ESTIMATE',
      '========================================================================',
      `BOQ Reference     : ${submittedQuote.appId}`,
      `Date & Time       : ${new Date().toLocaleString('en-IN')}`,
      `Client Name       : ${clientName} (${clientPhone})`,
      `Site Location     : ${projectCity}`,
      `Specification     : ${submittedQuote.grade} Finish (@ ₹${ratePerSqFt}/sq.ft)`,
      `Total Built-Up    : ${submittedQuote.totalSqFt.toLocaleString('en-IN')} sq.ft (${submittedQuote.floors} Floors)`,
      `Estimated Cost    : ₹${submittedQuote.totalCost.toLocaleString('en-IN')} (₹${(submittedQuote.totalCost / 100000).toFixed(2)} Lakhs)`,
      `Estimated Steel   : ${steelTons} TMT Metric Tons`,
      `Estimated Cement  : ${cementBags} Bags (50kg OPC/PPC)`,
      `Target Duration   : ~${estimatedMonths} Months`,
      `Track Progress    : https://akuldravindigital.com/track?id=${encodeURIComponent(submittedQuote.appId)}`,
      '========================================================================',
    ].join('\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ADCS_BOQ_${submittedQuote.appId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container-wide" style={{ padding: '2.5rem 1.5rem 4rem' }}>
      {/* Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0A192F 0%, #0D2137 60%, #1D4ED8 100%)',
        borderRadius: '24px',
        padding: '3rem 2.5rem',
        color: '#FFFFFF',
        marginBottom: '2.5rem',
      }}>
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
          <Hammer size={14} />
          <span>CIVIL INFRASTRUCTURE & 3D ARCHITECTURAL DESIGN</span>
        </div>

        <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 900, marginBottom: '0.75rem', color: '#FFFFFF' }}>
          {language === 'hi' ? 'भवन निर्माण एवं वास्तु डिज़ाइन' : 'Construction Super Platform'}
        </h1>
        <p style={{ fontSize: '1rem', color: '#CBD5E1', maxWidth: '640px', lineHeight: 1.6 }}>
          Turnkey residential & commercial construction, 2D/3D architectural house plans, municipal sanction drawings, milestone QA inspections, and structural engineering.
        </p>
      </div>

      {/* INTERACTIVE TURNKEY BOQ COST ESTIMATOR (Section 19) */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '2.5rem',
        border: '1px solid #E2E8F0',
        boxShadow: '0 8px 30px rgba(10, 25, 47, 0.06)',
        marginBottom: '3.5rem',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span className="badge badge-gold">INTERACTIVE COST ENGINE</span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0A192F', marginTop: '0.4rem' }}>
            Instant Turnkey Construction & BOQ Estimator
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#64748B' }}>
            Calculate accurate material requirements, total budget, and construction timelines.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: '2.5rem',
          alignItems: 'center',
        }} className="hero-grid">
          {/* Inputs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.75rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Client Full Name *</label>
                <input
                  type="text"
                  className="form-input"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Client Name"
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Mobile Number *</label>
                <input
                  type="text"
                  className="form-input"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="10-digit Mobile"
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Project City</label>
                <input
                  type="text"
                  className="form-input"
                  value={projectCity}
                  onChange={(e) => setProjectCity(e.target.value)}
                  placeholder="City"
                />
              </div>
            </div>

            <div>
              <label className="form-label">
                Plot Ground Floor Built-up Area: <strong>{builtUpArea} sq.ft</strong>
              </label>
              <input
                type="range"
                min="500"
                max="5000"
                step="50"
                value={builtUpArea}
                onChange={(e) => setBuiltUpArea(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#1D4ED8' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748B' }}>
                <span>500 sq.ft</span>
                <span>2,500 sq.ft</span>
                <span>5,000 sq.ft</span>
              </div>
            </div>

            <div>
              <label className="form-label">Number of Floors (Storeys)</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                {[
                  { count: 1, label: 'G (Ground)' },
                  { count: 2, label: 'G + 1 (2 Floors)' },
                  { count: 3, label: 'G + 2 (3 Floors)' },
                  { count: 4, label: 'G + 3 (4 Floors)' },
                ].map(f => (
                  <button
                    key={f.count}
                    onClick={() => setFloors(f.count)}
                    style={{
                      padding: '0.65rem 0.4rem',
                      borderRadius: '10px',
                      border: floors === f.count ? '2px solid #1D4ED8' : '1px solid #E2E8F0',
                      background: floors === f.count ? '#EFF6FF' : '#FFFFFF',
                      color: floors === f.count ? '#1D4ED8' : '#475569',
                      fontWeight: 700,
                      fontSize: '0.78rem',
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="form-label">Material & Finishing Specification Grade</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                {[
                  { grade: 'Standard', rate: '₹1,650/sq.ft', desc: 'Ultratech/ACC, Tata Tiscon, Kajaria standard' },
                  { grade: 'Premium', rate: '₹1,950/sq.ft', desc: 'Granite flooring, Jaquar bath, Teak doors' },
                  { grade: 'Luxury', rate: '₹2,450/sq.ft', desc: 'Italian marble, Kohler smart fittings, False ceiling' },
                ].map(g => (
                  <button
                    key={g.grade}
                    onClick={() => setGrade(g.grade as any)}
                    style={{
                      padding: '0.85rem 0.65rem',
                      borderRadius: '12px',
                      border: grade === g.grade ? '2px solid #1D4ED8' : '1px solid #E2E8F0',
                      background: grade === g.grade ? '#EFF6FF' : '#FFFFFF',
                      textAlign: 'left',
                      transition: 'all 0.15s',
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: '0.92rem', color: grade === g.grade ? '#1D4ED8' : '#0A192F' }}>
                      {g.grade}
                    </div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#D97706' }}>{g.rate}</div>
                    <div style={{ fontSize: '0.68rem', color: '#64748B', marginTop: '0.25rem' }}>{g.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Box */}
          <div style={{
            background: 'linear-gradient(135deg, #0A192F 0%, #0D2137 100%)',
            borderRadius: '20px',
            padding: '2rem',
            color: '#FFFFFF',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            boxShadow: '0 12px 40px rgba(10, 25, 47, 0.25)',
          }}>
            <div style={{ fontSize: '0.78rem', color: '#F59E0B', fontWeight: 700, textTransform: 'uppercase' }}>
              TOTAL ESTIMATED PROJECT COST:
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#FFFFFF', margin: '0.2rem 0 1.25rem' }}>
              ₹{(totalCost / 100000).toFixed(2)} Lakhs
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem',
              padding: '1rem 0',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              marginBottom: '1.5rem',
              fontSize: '0.82rem',
            }}>
              <div>
                <div style={{ color: '#94A3B8' }}>Total Built-up:</div>
                <div style={{ fontWeight: 700, color: '#FFFFFF' }}>{totalSqFt.toLocaleString()} sq.ft</div>
              </div>
              <div>
                <div style={{ color: '#94A3B8' }}>Completion Timeline:</div>
                <div style={{ fontWeight: 700, color: '#F59E0B' }}>~ {estimatedMonths} Months</div>
              </div>
              <div>
                <div style={{ color: '#94A3B8' }}>Estimated Steel:</div>
                <div style={{ fontWeight: 700, color: '#FFFFFF' }}>{steelTons} TMT Tons</div>
              </div>
              <div>
                <div style={{ color: '#94A3B8' }}>Estimated Cement:</div>
                <div style={{ fontWeight: 700, color: '#FFFFFF' }}>{cementBags} Bags</div>
              </div>
            </div>

            <button
              onClick={handleRequestQuote}
              className="btn-gold btn-lg"
              style={{ width: '100%', fontWeight: 800 }}
            >
              <span>Book Architect Site Survey</span>
              <ArrowRight size={16} />
            </button>

            {submittedQuote && (
              <div style={{
                marginTop: '1rem',
                padding: '0.9rem 1rem',
                borderRadius: '12px',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid #10B981',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '0.75rem',
                flexWrap: 'wrap',
              }}>
                <div style={{ fontSize: '0.78rem' }}>
                  <div style={{ fontWeight: 800, color: '#34D399' }}>BOQ SAVED • {submittedQuote.appId}</div>
                  <div style={{ color: '#E2E8F0' }}>Survey scheduled & CRM lead synced</div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={handleDownloadBoq} className="btn-primary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Download size={13} />
                    <span>BOQ</span>
                  </button>
                  <Link to={`/track?id=${encodeURIComponent(submittedQuote.appId)}`} className="btn-gold btn-sm" style={{ textDecoration: 'none', fontWeight: 700 }}>
                    Track
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MILESTONE INSPECTION LIFECYCLE */}
      <div style={{
        background: '#F8FAFC',
        borderRadius: '24px',
        padding: '2.5rem',
        border: '1px solid #E2E8F0',
      }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0A192F', marginBottom: '1.5rem', textAlign: 'center' }}>
          Milestone Escrow & Quality Assurance Workflow
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          {[
            { step: '01', title: 'Architectural 3D Plan', pct: '10%' },
            { step: '02', title: 'Excavation & Plinth Beam', pct: '20%' },
            { step: '03', title: 'RCC Structural Slabs', pct: '25%' },
            { step: '04', title: 'Brickwork & Electrical', pct: '20%' },
            { step: '05', title: 'Plaster, Flooring & Paint', pct: '15%' },
            { step: '06', title: 'Final QA & Handover', pct: '10%' },
          ].map(m => (
            <div key={m.step} style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#1D4ED8', marginBottom: '0.25rem' }}>{m.step}</div>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0A192F' }}>{m.title}</div>
              <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700, marginTop: '0.2rem' }}>Milestone Payout: {m.pct}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Authorized Municipal Plan Approval & Building Code Portals */}
      <div style={{
        marginTop: '2.5rem',
        background: '#F8FAFC',
        borderRadius: '18px',
        padding: '1.5rem 2rem',
        border: '1px solid #E2E8F0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div>
          <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#1D4ED8', textTransform: 'uppercase' }}>
            AUTHORIZED MUNICIPAL SANCTION, BIS BUILDING CODE & RERA PORTALS
          </div>
          <div style={{ fontSize: '0.84rem', color: '#475569', marginTop: '0.2rem' }}>
            Verify National Building Code standards, RERA developer compliance, and MoHUA urban housing guidelines.
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
          {[
            { label: 'MoHUA Urban Portal', url: 'https://mohua.gov.in/' },
            { label: 'BIS Standards Portal', url: 'https://www.bis.gov.in/' },
            { label: 'Bihar RERA Desk', url: 'https://rera.bihar.gov.in/' },
          ].map(p => (
            <a
              key={p.label}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none' }}
            >
              <span>{p.label}</span>
              <ExternalLink size={13} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
