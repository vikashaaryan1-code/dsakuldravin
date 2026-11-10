import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { 
  Monitor, 
  Printer, 
  Clock, 
  Play, 
  Square, 
  DollarSign, 
  CheckCircle2, 
  Layers, 
  AlertCircle,
  FileText
} from 'lucide-react';

export const CyberCafeOperatorPortal: React.FC = () => {
  const { 
    workstations, 
    startWorkstationSession, 
    stopWorkstationSession, 
    printJobs, 
    addPrintJob, 
    showToast,
    language 
  } = useApp();

  const [selectedStationId, setSelectedStationId] = useState<string>('PC-02');
  const [sessionCustomer, setSessionCustomer] = useState('');
  const [sessionTask, setSessionTask] = useState('Online Job Application');

  const inUseCount = workstations.filter(w => w.status === 'in-use').length;
  const availCount = workstations.filter(w => w.status === 'available').length;

  const handleLaunchSession = () => {
    if (!sessionCustomer) return;
    startWorkstationSession(selectedStationId, sessionCustomer, '+91 98000 00000', sessionTask);
    setSessionCustomer('');
  };

  return (
    <div className="container-wide" style={{ padding: '2.5rem 1.5rem 4rem' }}>
      <div style={{
        background: 'linear-gradient(135deg, #0A192F 0%, #0D2137 60%, #1D4ED8 100%)',
        borderRadius: '24px',
        padding: '2.5rem',
        color: '#FFFFFF',
        marginBottom: '2.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem',
      }}>
        <div>
          <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>OPERATOR TERMINAL CONSOLE</span>
          <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 900, marginBottom: '0.4rem', color: '#FFFFFF' }}>
            Cyber Café Floor & Terminal Operations
          </h1>
          <p style={{ fontSize: '0.92rem', color: '#CBD5E1' }}>
            Real-time workstation seat management, hourly timer billing, print queue dispatch, and daily revenue reporting.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '0.85rem 1.25rem', borderRadius: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#10B981' }}>{availCount}</div>
            <div style={{ fontSize: '0.72rem', color: '#CBD5E1' }}>Seats Free</div>
          </div>
          <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '0.85rem 1.25rem', borderRadius: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#EF4444' }}>{inUseCount}</div>
            <div style={{ fontSize: '0.72rem', color: '#CBD5E1' }}>Seats In-Use</div>
          </div>
        </div>
      </div>

      {/* Operator Terminal Grid */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '2rem',
        border: '1px solid #E2E8F0',
        marginBottom: '3rem',
      }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0A192F', marginBottom: '1.5rem' }}>
          Active Floor Workstation Matrix (PC-01 to PC-08)
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Monitor size={18} color={isAvail ? '#059669' : '#DC2626'} />
                      <span style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0A192F' }}>{pc.id}</span>
                    </div>
                    <span className={`badge ${isAvail ? 'badge-green' : isInUse ? 'badge-red' : 'badge-gray'}`}>
                      {pc.status.toUpperCase()}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>IP: {pc.ip}</div>

                  {isInUse && pc.currentSession && (
                    <div style={{
                      marginTop: '0.75rem',
                      padding: '0.75rem',
                      background: '#FFFFFF',
                      borderRadius: '10px',
                      border: '1px solid #FECDD3',
                      fontSize: '0.8rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.25rem',
                    }}>
                      <div style={{ fontWeight: 800, color: '#0A192F' }}>{pc.currentSession.customerName}</div>
                      <div style={{ color: '#475569' }}>Task: {pc.currentSession.activeTask}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#DC2626', fontWeight: 700, marginTop: '0.2rem' }}>
                        <span>Logged In: {pc.currentSession.startTime}</span>
                        <span>{pc.currentSession.elapsedMinutes} mins</span>
                      </div>
                    </div>
                  )}
                </div>

                {isAvail ? (
                  <button
                    onClick={() => {
                      setSelectedStationId(pc.id);
                      setSessionCustomer('Walk-in Customer ' + pc.id);
                      startWorkstationSession(pc.id, 'Walk-in Customer ' + pc.id, '+91 98000 00000', 'General Internet Access');
                    }}
                    className="btn-primary btn-sm"
                    style={{ width: '100%', gap: '0.35rem' }}
                  >
                    <Play size={14} />
                    <span>Quick Start Session</span>
                  </button>
                ) : isInUse ? (
                  <button
                    onClick={() => stopWorkstationSession(pc.id)}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
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
                    <span>End Session & Collect Cash</span>
                  </button>
                ) : (
                  <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#64748B' }}>
                    Station Offline
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Print Queue Dispatch */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '2rem',
        border: '1px solid #E2E8F0',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0A192F' }}>
            Daily Print & Xerox Production Queue
          </h3>
          <span className="badge badge-blue">Toner Remaining: 84%</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {printJobs.map(job => (
            <div
              key={job.id}
              style={{
                padding: '1rem',
                borderRadius: '12px',
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#0A192F' }}>
                  {job.id} • {job.customerName}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                  {job.type} • {job.pages} pages x {job.copies} copies @ ₹{job.ratePerPage}/page
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0A192F' }}>
                    ₹{job.totalCost}
                  </div>
                  <span className="badge badge-green">{job.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
