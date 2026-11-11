import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { 
  Scale, 
  Calendar, 
  Video, 
  Clock, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  Phone, 
  User, 
  AlertCircle,
  MessageSquare,
  Lock,
  Mic,
  Camera,
  FolderOpen
} from 'lucide-react';

export const AdvocatePortal: React.FC = () => {
  const { showToast, logAudit } = useApp();

  const [advocateProfile] = useState({
    name: 'Adv. Rakesh C. Mishra',
    barCouncilNumber: 'BR/2491/2014',
    stateBarCouncil: 'Bihar State Bar Council, Patna High Court',
    experienceYears: 12,
    specialization: ['Property & Land Titles', 'Civil Litigation', 'Consumer Dispute', 'Documentation'],
    status: 'VERIFIED'
  });

  const [appointments, setAppointments] = useState([
    {
      id: 'CAS-2026-891',
      clientName: 'Manoj Kumar Sharma',
      clientPhone: '+91 98765 43210',
      category: 'Property & Land Dispute',
      type: 'ADCS Private Consultation',
      scheduledDate: '2026-11-11',
      scheduledTime: '11:00 AM - 11:45 AM',
      status: 'SCHEDULED',
      documents: ['Sale_Deed_Khatiyan_1985.pdf', 'Mutation_Receipt.pdf'],
      notes: 'Dispute regarding ancestral agricultural plot in Bihta. Mutation challenged by co-sharer.'
    },
    {
      id: 'CAS-2026-892',
      clientName: 'Smt. Geeta Devi',
      clientPhone: '+91 94321 09876',
      category: 'Consumer Forum Dispute',
      type: 'ADCS Private Consultation',
      scheduledDate: '2026-11-11',
      scheduledTime: '02:30 PM - 03:15 PM',
      status: 'WAITING_ROOM',
      documents: ['Builder_Allotment_Letter.pdf', 'Payment_Receipts.pdf'],
      notes: 'Delayed possession of residential flat by 36 months without interest.'
    },
    {
      id: 'CAS-2026-890',
      clientName: 'Vikramaditya Sahay',
      clientPhone: '+91 91234 56789',
      category: 'Commercial Contract & Partnership',
      type: 'ADCS Private Consultation',
      scheduledDate: '2026-11-10',
      scheduledTime: '04:00 PM - 04:45 PM',
      status: 'COMPLETED',
      documents: ['Partnership_Deed_2022.pdf'],
      notes: 'Consultation concluded. Legal notice draft recommended under Section 138 / Civil Breach.'
    }
  ]);

  const [activeCallCaseId, setActiveCallCaseId] = useState<string | null>(null);
  const [micActive, setMicActive] = useState(true);
  const [camActive, setCamActive] = useState(true);
  const [newNote, setNewNote] = useState('');

  const handleStartConsultation = (caseId: string) => {
    setActiveCallCaseId(caseId);
    setAppointments(prev => prev.map(a => a.id === caseId ? { ...a, status: 'IN_CONSULTATION' } : a));
    showToast('Secure WebRTC Call Initiated', `Connected to confidential video room for ${caseId}`, 'success');
    logAudit(`Advocate started consultation for case ${caseId}`, 'ADCS Legal Desk');
  };

  const handleEndConsultation = (caseId: string) => {
    setActiveCallCaseId(null);
    setAppointments(prev => prev.map(a => a.id === caseId ? { ...a, status: 'COMPLETED' } : a));
    showToast('Consultation Concluded', `Case ${caseId} marked as completed. Legal notes archived.`, 'success');
    logAudit(`Advocate concluded consultation for case ${caseId}`, 'ADCS Legal Desk');
  };

  return (
    <div className="container-wide" style={{ padding: '2.5rem 1.5rem 4rem' }}>
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0A192F 0%, #1E1B4B 60%, #312E81 100%)',
        borderRadius: '24px',
        padding: '2.5rem',
        color: '#FFFFFF',
        marginBottom: '2.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{ background: '#F59E0B', color: '#000000', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800 }}>
              ADCS LEGAL DESK
            </span>
            <span style={{ background: '#10B981', color: '#FFFFFF', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={13} /> {advocateProfile.status} ADVOCATE
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 900, marginBottom: '0.3rem', color: '#FFFFFF' }}>
            {advocateProfile.name}
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem', margin: 0 }}>
            Enrolment No: <strong>{advocateProfile.barCouncilNumber}</strong> • {advocateProfile.stateBarCouncil}
          </p>
        </div>

        {/* Quick Stats */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.06)', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Today's Consultations</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#38BDF8' }}>3 Scheduled</div>
          </div>
          <div style={{ background: 'rgba(255, 255, 255, 0.06)', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Active Matters</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10B981' }}>18 Active</div>
          </div>
        </div>
      </div>

      {/* Statutory Bar Council Compliance Notice */}
      <div style={{
        background: '#EFF6FF',
        border: '1px solid #BFDBFE',
        borderRadius: '12px',
        padding: '1rem 1.25rem',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem',
        fontSize: '0.82rem',
        color: '#1E3A8A'
      }}>
        <AlertCircle size={18} style={{ color: '#2563EB', flexShrink: 0, marginTop: '2px' }} />
        <div>
          <strong>Bar Council of India (BCI) Rule 36 Compliance Notice:</strong> This portal is designed exclusively for client consultation intake, confidential document scrutiny, and scheduled video conferences. ADCS does not promote, solicit, or advertise advocate services, nor does it guarantee outcomes. All legal advisory is provided independently by enrolled practitioners.
        </div>
      </div>

      {/* Active WebRTC Video Consultation Room (When Active) */}
      {activeCallCaseId && (
        <div style={{
          background: '#0F172A',
          borderRadius: '20px',
          border: '2px solid #38BDF8',
          padding: '2rem',
          color: '#FFFFFF',
          marginBottom: '2.5rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#EF4444', animation: 'pulse 1.5s infinite' }} />
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#F8FAFC' }}>
                Secure WebRTC Legal Consultation Room • {activeCallCaseId}
              </h3>
            </div>
            <span style={{ fontSize: '0.8rem', background: 'rgba(56, 189, 248, 0.2)', color: '#38BDF8', padding: '0.3rem 0.75rem', borderRadius: '6px', fontWeight: 700 }}>
              🔒 256-Bit End-to-End Encrypted Session
            </span>
          </div>

          {/* Video Frames Simulation */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
            {/* Advocate Camera */}
            <div style={{ background: '#1E293B', height: '260px', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid #334155', position: 'relative' }}>
              <Scale size={48} color="#94A3B8" />
              <div style={{ marginTop: '0.75rem', fontWeight: 700, color: '#E2E8F0', fontSize: '0.9rem' }}>
                {advocateProfile.name} (You)
              </div>
              <div style={{ position: 'absolute', bottom: '12px', left: '12px', fontSize: '0.75rem', background: 'rgba(0,0,0,0.6)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                Status: Audio/Video Connected
              </div>
            </div>

            {/* Client Camera */}
            <div style={{ background: '#1E293B', height: '260px', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid #334155', position: 'relative' }}>
              <User size={48} color="#38BDF8" />
              <div style={{ marginTop: '0.75rem', fontWeight: 700, color: '#E2E8F0', fontSize: '0.9rem' }}>
                Citizen Client • In Session
              </div>
              <div style={{ position: 'absolute', bottom: '12px', left: '12px', fontSize: '0.75rem', background: 'rgba(0,0,0,0.6)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                Identity Verified via OTP & Aadhaar Masked
              </div>
            </div>
          </div>

          {/* Control Bar */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setMicActive(!micActive)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.6rem 1.25rem',
                borderRadius: '8px',
                background: micActive ? '#334155' : '#DC2626',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <Mic size={16} /> {micActive ? 'Mute Mic' : 'Unmute Mic'}
            </button>

            <button
              onClick={() => setCamActive(!camActive)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.6rem 1.25rem',
                borderRadius: '8px',
                background: camActive ? '#334155' : '#DC2626',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <Camera size={16} /> {camActive ? 'Turn Off Cam' : 'Turn On Cam'}
            </button>

            <button
              onClick={() => handleEndConsultation(activeCallCaseId)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.6rem 1.5rem',
                borderRadius: '8px',
                background: '#EF4444',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              End Consultation & Conclude
            </button>
          </div>
        </div>
      )}

      {/* Case In-Take & Scheduled Consultations */}
      <div style={{ background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '2rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              Assigned Legal Matters & Consultations
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#64748B', margin: '0.2rem 0 0' }}>
              Review customer briefs, attached title deeds, and conduct private video hearings
            </p>
          </div>
          <span style={{ fontSize: '0.8rem', color: '#059669', background: '#DCFCE7', padding: '0.3rem 0.75rem', borderRadius: '6px', fontWeight: 700 }}>
            {appointments.length} Consultations Recorded
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {appointments.map(apt => (
            <div
              key={apt.id}
              style={{
                border: '1px solid #CBD5E1',
                borderRadius: '12px',
                padding: '1.25rem',
                background: apt.status === 'IN_CONSULTATION' ? '#F0FDF4' : '#F8FAFC',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 800, color: '#0F172A', fontSize: '1.05rem' }}>
                      {apt.clientName}
                    </span>
                    <span style={{ fontSize: '0.72rem', background: '#E2E8F0', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 700, color: '#334155' }}>
                      {apt.id}
                    </span>
                    <span style={{ fontSize: '0.72rem', background: '#FEF3C7', color: '#92400E', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
                      {apt.category}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748B', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <span>📅 {apt.scheduledDate} ({apt.scheduledTime})</span>
                    <span>📞 {apt.clientPhone}</span>
                    <span>🏷️ {apt.type}</span>
                  </div>
                </div>

                {/* Action CTA */}
                <div>
                  {apt.status === 'SCHEDULED' && (
                    <button
                      onClick={() => handleStartConsultation(apt.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.45rem 1rem',
                        borderRadius: '6px',
                        background: '#2563EB',
                        color: '#FFFFFF',
                        border: 'none',
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        cursor: 'pointer'
                      }}
                    >
                      <Video size={14} /> Start Consultation
                    </button>
                  )}
                  {apt.status === 'WAITING_ROOM' && (
                    <button
                      onClick={() => handleStartConsultation(apt.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.45rem 1rem',
                        borderRadius: '6px',
                        background: '#16A34A',
                        color: '#FFFFFF',
                        border: 'none',
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        cursor: 'pointer'
                      }}
                    >
                      <Video size={14} /> Admit from Waiting Room
                    </button>
                  )}
                  {apt.status === 'COMPLETED' && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#059669', fontWeight: 700, fontSize: '0.82rem' }}>
                      <CheckCircle2 size={16} /> Completed
                    </span>
                  )}
                </div>
              </div>

              {/* Case Brief & Attached Documents */}
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '0.75rem', fontSize: '0.82rem', color: '#334155' }}>
                <div style={{ fontWeight: 700, marginBottom: '0.25rem', color: '#0F172A' }}>Case Intake Brief:</div>
                {apt.notes}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                  {apt.documents.map((doc, idx) => (
                    <span key={idx} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', background: '#F1F5F9', padding: '0.2rem 0.5rem', borderRadius: '4px', color: '#1E293B', fontWeight: 600 }}>
                      <FileText size={12} color="#2563EB" /> {doc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
