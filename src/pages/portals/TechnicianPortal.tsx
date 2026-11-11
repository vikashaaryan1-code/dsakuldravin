import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { 
  Wrench, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Camera, 
  CheckSquare, 
  DollarSign, 
  Navigation
} from 'lucide-react';

export const TechnicianPortal: React.FC = () => {
  const { showToast, logAudit } = useApp();

  const [technician] = useState({
    name: 'Prakash Kumar Singh',
    techId: 'TECH-PAT-4402',
    zone: 'Patna Central & Danapur Division',
    rating: 4.9,
    jobsCompleted: 142
  });

  const [assignedJobs, setAssignedJobs] = useState([
    {
      id: 'JOB-CCTV-881',
      customerName: 'Dr. Akhilesh Sen (Sen Diagnostics)',
      customerPhone: '+91 98350 11223',
      address: 'Near Saguna More, Bailey Road, Danapur, Patna',
      serviceType: 'CCTV 4-Camera IP Package Installation',
      scheduledSlot: 'Today, 11:30 AM',
      amount: 4500,
      status: 'DISPATCHED',
      checklist: [
        { item: 'Mount 4x 5MP IP Bullet Cameras', done: true },
        { item: 'Lay Cat-6 Cabling with PVC Conduit Casing', done: true },
        { item: 'Configure 4-Channel PoE NVR & 2TB Surveillance HDD', done: false },
        { item: 'Test Remote Mobile App P2P Live Viewing', done: false },
        { item: 'Handover Warranty Card & Obtain Customer Signature', done: false }
      ]
    },
    {
      id: 'JOB-BIO-882',
      customerName: 'Adarsh Digital Kendra (ADCS Kendra #4401)',
      customerPhone: '+91 97712 33445',
      address: 'Boring Road Crossing, Patna',
      serviceType: 'Biometric Morpho L1 RD Service Calibration',
      scheduledSlot: 'Today, 03:00 PM',
      amount: 1200,
      status: 'SCHEDULED',
      checklist: [
        { item: 'Inspect USB Connector & Cable Voltage', done: false },
        { item: 'Install Certified L1 Device Driver & HTTPS Certificate', done: false },
        { item: 'Execute Live Loopback Biometric PID Test with Bank Switch', done: false }
      ]
    }
  ]);

  const handleToggleChecklist = (jobId: string, itemIdx: number) => {
    setAssignedJobs(prev => prev.map(job => {
      if (job.id !== jobId) return job;
      const updated = [...job.checklist];
      updated[itemIdx].done = !updated[itemIdx].done;
      return { ...job, checklist: updated };
    }));
  };

  const handleCompleteJob = (jobId: string) => {
    setAssignedJobs(prev => prev.map(job => job.id === jobId ? { ...job, status: 'COMPLETED' } : job));
    showToast('Work Order Completed', `Job ${jobId} marked as completed. Payout logged to wallet.`, 'success');
    logAudit(`Technician completed work order ${jobId}`, 'CCTV & Hardware Operations');
  };

  return (
    <div className="container-wide" style={{ padding: '2.5rem 1.5rem 4rem' }}>
      {/* Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0A192F 0%, #115E59 60%, #0D9488 100%)',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <span style={{ background: '#F59E0B', color: '#000000', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800 }}>
              ADCS FIELD OPERATIONS
            </span>
            <span style={{ background: '#10B981', color: '#FFFFFF', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700 }}>
              CERTIFIED TECHNICIAN
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 900, marginBottom: '0.3rem', color: '#FFFFFF' }}>
            {technician.name}
          </h1>
          <p style={{ color: '#99F6E4', fontSize: '0.9rem', margin: 0 }}>
            Badge: <strong>{technician.techId}</strong> • Zone: {technician.zone}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ fontSize: '0.75rem', color: '#99F6E4' }}>Assigned Jobs Today</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF' }}>2 Scheduled</div>
          </div>
          <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ fontSize: '0.75rem', color: '#99F6E4' }}>Lifetime Jobs</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FDE047' }}>{technician.jobsCompleted} Completed</div>
          </div>
        </div>
      </div>

      {/* Assigned Field Jobs */}
      <div style={{ background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '2rem' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', margin: '0 0 1.5rem' }}>
          Assigned Installations & Dispatch Queue
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {assignedJobs.map(job => (
            <div
              key={job.id}
              style={{
                border: '1px solid #CBD5E1',
                borderRadius: '16px',
                padding: '1.5rem',
                background: job.status === 'COMPLETED' ? '#F0FDF4' : '#F8FAFC'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>
                      {job.serviceType}
                    </span>
                    <span style={{ fontSize: '0.72rem', background: '#0F766E', color: '#FFFFFF', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
                      {job.id}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#475569', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <span>👤 {job.customerName}</span>
                    <span>📞 {job.customerPhone}</span>
                    <span>📍 {job.address}</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0F766E' }}>
                    ₹{job.amount.toLocaleString('en-IN')}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                    Slot: {job.scheduledSlot}
                  </div>
                </div>
              </div>

              {/* Installation Checklist */}
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '1rem', marginBottom: '1rem' }}>
                <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0F172A', marginBottom: '0.5rem' }}>
                  Standard Operating Procedure & Verification Checklist:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {job.checklist.map((chk, idx) => (
                    <label
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.82rem',
                        color: chk.done ? '#059669' : '#334155',
                        textDecoration: chk.done ? 'line-through' : 'none',
                        cursor: job.status === 'COMPLETED' ? 'default' : 'pointer'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={chk.done}
                        disabled={job.status === 'COMPLETED'}
                        onChange={() => handleToggleChecklist(job.id, idx)}
                      />
                      <span>{chk.item}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              {job.status !== 'COMPLETED' ? (
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(job.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      background: '#F1F5F9',
                      color: '#0F172A',
                      textDecoration: 'none',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      border: '1px solid #CBD5E1'
                    }}
                  >
                    <Navigation size={14} color="#0D9488" /> Open Navigation
                  </a>

                  <button
                    onClick={() => handleCompleteJob(job.id)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.5rem 1.25rem',
                      borderRadius: '8px',
                      background: '#0D9488',
                      color: '#FFFFFF',
                      border: 'none',
                      fontWeight: 800,
                      fontSize: '0.82rem',
                      cursor: 'pointer'
                    }}
                  >
                    <CheckCircle2 size={16} /> Mark Installation Completed
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#059669', fontWeight: 800, fontSize: '0.85rem' }}>
                  <CheckCircle2 size={18} /> Installation Fully Verified & Signed Off by Customer
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
