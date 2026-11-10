import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { 
  Monitor, 
  Printer, 
  FileText, 
  Clock, 
  CheckCircle2, 
  PlusCircle, 
  Play, 
  Square, 
  Receipt, 
  CreditCard,
  Wifi,
  Sparkles,
  ArrowRight,
  Sliders
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const CyberCafePage: React.FC = () => {
  const { 
    workstations, 
    startWorkstationSession, 
    stopWorkstationSession, 
    printJobs, 
    addPrintJob,
    language 
  } = useApp();

  // Booking Modal / Form State
  const [selectedPc, setSelectedPc] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [activeTask, setActiveTask] = useState('Online Exam Form Submission');

  // Print Job Quick Order State
  const [printType, setPrintType] = useState<'B/W Print' | 'Color Print' | 'Scan' | 'Lamination' | 'Spiral Binding'>('Color Print');
  const [pageCount, setPageCount] = useState(5);
  const [copyCount, setCopyCount] = useState(1);
  const [orderCustomerName, setOrderCustomerName] = useState('');

  const rateMap: Record<string, number> = {
    'B/W Print': 3,
    'Color Print': 10,
    'Scan': 5,
    'Lamination': 25,
    'Spiral Binding': 40,
  };

  const calculatedPrintCost = (rateMap[printType] || 5) * pageCount * copyCount;

  const handleStartSession = () => {
    if (!selectedPc || !customerName) return;
    startWorkstationSession(selectedPc, customerName, customerPhone || '+91 98000 00000', activeTask);
    setSelectedPc(null);
    setCustomerName('');
  };

  const handleQueuePrint = () => {
    if (!orderCustomerName) return;
    addPrintJob({
      type: printType,
      customerName: orderCustomerName,
      pages: pageCount,
      copies: copyCount,
      ratePerPage: rateMap[printType] || 5,
      totalCost: calculatedPrintCost,
      status: 'Printing',
    });
    setOrderCustomerName('');
  };

  return (
    <div className="container-wide" style={{ padding: '2.5rem 1.5rem 4rem' }}>
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0A192F 0%, #0D2137 60%, #1E3A8A 100%)',
        borderRadius: '24px',
        padding: '3rem 2.5rem',
        color: '#FFFFFF',
        marginBottom: '2.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '2rem',
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
            <Monitor size={14} />
            <span>INTELLIGENT CYBER CAFÉ & WORKSTATION OPERATING SYSTEM</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 900, marginBottom: '0.75rem', color: '#FFFFFF' }}>
            {language === 'hi' ? 'साइबर कैफ़े एवं ऑनलाइन वर्कस्टेशन' : 'Cyber Café Super System'}
          </h1>
          <p style={{ fontSize: '1rem', color: '#CBD5E1', maxWidth: '640px', lineHeight: 1.6 }}>
            High-spec internet computer booths, high-DPI laser printing, dual-sided color photocopy, spiral binding, passport photo studio & assisted exam form filling.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Link to="/cyber-cafe/operator" className="btn-gold btn-lg" style={{ fontWeight: 800 }}>
            <span>Open Operator Console</span>
            <ArrowRight size={18} />
          </Link>
          <div style={{ fontSize: '0.75rem', color: '#94A3B8', textAlign: 'center' }}>
            For Counter Staff & PC Seat Billing
          </div>
        </div>
      </div>

      {/* Cyber Cafe Services Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.25rem',
        marginBottom: '3rem',
      }}>
        {[
          { title: 'Dedicated PC Workstation', rate: '₹40 / hour', desc: 'Gigabit fiber connection, scanner access, webcam for video interviews.', icon: <Monitor size={22} color="#1D4ED8" /> },
          { title: 'Color Laser Print & Xerox', rate: '₹10 / page', desc: 'Crisp vibrant output for project reports, certificates, and ID cards.', icon: <Printer size={22} color="#059669" /> },
          { title: 'Competitive Exam Filling', rate: '₹99 / form', desc: 'SSC, UPSC, Railway, Bank PO, admit card download & photo resizing.', icon: <FileText size={22} color="#D97706" /> },
          { title: 'Lamination & Binding', rate: '₹25 / doc', desc: 'Glossy thermal lamination and plastic spiral comb binding for booklets.', icon: <CheckCircle2 size={22} color="#7C3AED" /> },
        ].map((item, idx) => (
          <div key={idx} className="card" style={{ padding: '1.5rem', borderRadius: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {item.icon}
              </div>
              <span className="badge badge-gold">{item.rate}</span>
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0A192F', marginBottom: '0.35rem' }}>{item.title}</h3>
            <p style={{ fontSize: '0.82rem', color: '#64748B', lineHeight: 1.45 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* LIVE WORKSTATION MATRIX SECTION */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '2rem',
        border: '1px solid #E2E8F0',
        boxShadow: '0 8px 30px rgba(10, 25, 47, 0.05)',
        marginBottom: '3rem',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0A192F' }}>
                Live Workstation Terminal Grid
              </h2>
              <span className="badge badge-green">Real-Time Seat Map</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '0.2rem' }}>
              Select an available station to start a timed session or view active occupant tasks.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', fontWeight: 600 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }} />
              <span>Available ({workstations.filter(w => w.status === 'available').length})</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }} />
              <span>Occupied ({workstations.filter(w => w.status === 'in-use').length})</span>
            </div>
          </div>
        </div>

        {/* Grid of Terminals */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '1.25rem',
        }}>
          {workstations.map(pc => {
            const isAvail = pc.status === 'available';
            const isInUse = pc.status === 'in-use';

            return (
              <div
                key={pc.id}
                style={{
                  borderRadius: '16px',
                  padding: '1.25rem',
                  border: isAvail ? '1.5px solid #10B981' : isInUse ? '1.5px solid #EF4444' : '1px solid #CBD5E1',
                  background: isAvail ? '#F0FDF4' : isInUse ? '#FEF2F2' : '#F8FAFC',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1rem',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Monitor size={18} color={isAvail ? '#059669' : '#DC2626'} />
                      <span style={{ fontWeight: 800, fontSize: '1rem', color: '#0A192F' }}>{pc.id}</span>
                    </div>
                    <span className={`badge ${isAvail ? 'badge-green' : isInUse ? 'badge-red' : 'badge-gray'}`}>
                      {pc.status.toUpperCase()}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                    IP: {pc.ip} • Standard HD Terminal
                  </div>

                  {isInUse && pc.currentSession && (
                    <div style={{
                      marginTop: '0.75rem',
                      padding: '0.65rem',
                      background: '#FFFFFF',
                      borderRadius: '10px',
                      border: '1px solid #FECDD3',
                      fontSize: '0.78rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.25rem',
                    }}>
                      <div style={{ fontWeight: 700, color: '#0A192F' }}>{pc.currentSession.customerName}</div>
                      <div style={{ color: '#475569' }}>Task: {pc.currentSession.activeTask}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#DC2626', fontWeight: 600 }}>
                        <span>Elapsed: {pc.currentSession.elapsedMinutes} mins</span>
                        <span>₹{pc.currentSession.hourlyRate}/hr</span>
                      </div>
                    </div>
                  )}
                </div>

                {isAvail ? (
                  <button
                    onClick={() => setSelectedPc(pc.id)}
                    className="btn-primary btn-sm"
                    style={{ width: '100%', gap: '0.35rem' }}
                  >
                    <Play size={14} />
                    <span>Start Session</span>
                  </button>
                ) : isInUse ? (
                  <button
                    onClick={() => stopWorkstationSession(pc.id)}
                    style={{
                      width: '100%',
                      padding: '0.45rem',
                      borderRadius: '8px',
                      background: '#EF4444',
                      color: '#FFFFFF',
                      fontWeight: 700,
                      fontSize: '0.78rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.35rem',
                    }}
                  >
                    <Square size={14} />
                    <span>Stop & Bill Session</span>
                  </button>
                ) : (
                  <div style={{ fontSize: '0.75rem', color: '#64748B', textAlign: 'center' }}>
                    Under Maintenance
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* QUICK PRINT & SCAN QUEUE COUNTER */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: '2rem',
      }} className="hero-grid">
        {/* Left: Print Dispatch Form */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          padding: '2rem',
          border: '1px solid #E2E8F0',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <Printer size={22} color="#1D4ED8" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0A192F' }}>
              Instant Print / Scan / Xerox Dispatch Counter
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Job Type</label>
              <select
                className="form-select"
                value={printType}
                onChange={(e) => setPrintType(e.target.value as any)}
              >
                <option value="Color Print">Color Print (₹10/page)</option>
                <option value="B/W Print">Black & White Print (₹3/page)</option>
                <option value="Scan">Color Document Scan (₹5/page)</option>
                <option value="Lamination">A4 Glossy Lamination (₹25/doc)</option>
                <option value="Spiral Binding">Spiral Binding (₹40/booklet)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Customer Name</label>
              <input
                type="text"
                className="form-input"
                value={orderCustomerName}
                onChange={(e) => setOrderCustomerName(e.target.value)}
                placeholder="e.g. Saurabh Kumar"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div className="form-group">
              <label className="form-label">Total Pages / Sheets</label>
              <input
                type="number"
                min="1"
                className="form-input"
                value={pageCount}
                onChange={(e) => setPageCount(Math.max(1, Number(e.target.value)))}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Number of Copies</label>
              <input
                type="number"
                min="1"
                className="form-input"
                value={copyCount}
                onChange={(e) => setCopyCount(Math.max(1, Number(e.target.value)))}
              />
            </div>
          </div>

          <div style={{
            background: '#F8FAFC',
            padding: '1rem 1.25rem',
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.25rem',
          }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Total Counter Charge:</span>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0A192F' }}>
                ₹{calculatedPrintCost}
              </div>
            </div>
            <button
              onClick={handleQueuePrint}
              disabled={!orderCustomerName}
              className="btn-gold"
              style={{ fontWeight: 800 }}
            >
              <Printer size={16} />
              <span>Queue Job</span>
            </button>
          </div>
        </div>

        {/* Right: Active Print Queue */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          padding: '2rem',
          border: '1px solid #E2E8F0',
        }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0A192F', marginBottom: '1rem' }}>
            Active Print & Scan Queue
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {printJobs.slice(0, 5).map(job => (
              <div
                key={job.id}
                style={{
                  padding: '0.85rem',
                  borderRadius: '12px',
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0A192F' }}>
                    {job.customerName}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                    {job.type} • {job.pages} pgs x {job.copies} cp • {job.timestamp}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700, color: '#1D4ED8' }}>₹{job.totalCost}</div>
                  <span className="badge badge-green" style={{ fontSize: '0.68rem' }}>{job.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Start Session Modal */}
      {selectedPc && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(10, 25, 47, 0.7)',
          backdropFilter: 'blur(6px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            width: '100%',
            maxWidth: '440px',
            padding: '1.75rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0A192F', marginBottom: '0.5rem' }}>
              Start Session on {selectedPc}
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '1.25rem' }}>
              Standard Billing: ₹40/hour with minute-level precision billing.
            </p>

            <div className="form-group">
              <label className="form-label">Customer Name *</label>
              <input
                type="text"
                className="form-input"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Manoj Kumar"
                autoFocus
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                className="form-input"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="+91 98350 XXXXX"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Active Purpose / Task</label>
              <select
                className="form-select"
                value={activeTask}
                onChange={(e) => setActiveTask(e.target.value)}
              >
                <option value="Online Exam Form Submission">Online Exam Form Submission</option>
                <option value="Resume & Document Typing">Resume & Document Typing</option>
                <option value="Video Interview & Online Class">Video Interview & Online Class</option>
                <option value="High-Res Document Scanning">High-Res Document Scanning</option>
                <option value="General High-Speed Internet Access">General High-Speed Internet Access</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              <button
                onClick={() => setSelectedPc(null)}
                className="btn-secondary"
                style={{ flex: 1 }}
              >
                Cancel
              </button>
              <button
                onClick={handleStartSession}
                disabled={!customerName}
                className="btn-primary"
                style={{ flex: 2 }}
              >
                Start Timer & Login PC
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
