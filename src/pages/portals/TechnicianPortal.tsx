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
  Navigation,
  Download,
  PlusCircle
} from 'lucide-react';

export const TechnicianPortal: React.FC = () => {
  const { recordJournalEntry, showToast, logAudit } = useApp();

  const [technician, setTechnician] = useState({
    name: 'Prakash Kumar Singh',
    techId: 'TECH-PAT-4402',
    zone: 'Patna Central & Danapur Division',
    rating: 4.9,
    jobsCompleted: 142
  });

  const [newCustomer, setNewCustomer] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newServiceType, setNewServiceType] = useState('Biometric L1 RD Service Calibration');
  const [newAmount, setNewAmount] = useState(1200);
  const [lastWarrantyCert, setLastWarrantyCert] = useState<{
    certId: string;
    jobId: string;
    customerName: string;
    serviceType: string;
    amount: number;
    completedAt: string;
  } | null>(null);

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

  const remainingJobsCount = assignedJobs.filter(j => j.status !== 'COMPLETED').length;

  const handleToggleChecklist = (jobId: string, itemIdx: number) => {
    setAssignedJobs(prev => prev.map(job => {
      if (job.id !== jobId) return job;
      return {
        ...job,
        checklist: job.checklist.map((chk, i) => i === itemIdx ? { ...chk, done: !chk.done } : chk),
      };
    }));
  };

  const handleCompleteJob = (jobId: string) => {
    const target = assignedJobs.find(j => j.id === jobId);
    if (!target || target.status === 'COMPLETED') return;

    const remainingChecklist = target.checklist.filter(c => !c.done).length;
    if (remainingChecklist > 0) {
      showToast('SOP Checklist Incomplete', `Complete remaining ${remainingChecklist} verification step(s) before customer sign-off.`, 'warning');
      return;
    }

    const gross = Number(target.amount.toFixed(2));
    const gst = Number((gross - gross / 1.18).toFixed(2));
    const base = Number((gross - gst).toFixed(2));

    recordJournalEntry({
      date: new Date().toISOString().split('T')[0],
      reference: jobId,
      description: `Field Installation Completed: ${target.serviceType} (${target.customerName})`,
      lines: [
        { accountCode: '1010', accountName: 'Operating Bank & Field Collection', debit: gross, credit: 0 },
        { accountCode: '4071', accountName: 'Field Hardware & Installation Revenue', debit: 0, credit: base },
        { accountCode: '2010', accountName: 'GST Output Tax Payable (18%)', debit: 0, credit: gst },
      ],
    });

    setAssignedJobs(prev => prev.map(job => job.id === jobId ? { ...job, status: 'COMPLETED' } : job));
    setTechnician(prev => ({ ...prev, jobsCompleted: prev.jobsCompleted + 1 }));
    setLastWarrantyCert({
      certId: `WCERT-${jobId}`,
      jobId,
      customerName: target.customerName,
      serviceType: target.serviceType,
      amount: gross,
      completedAt: new Date().toLocaleString('en-IN'),
    });
    showToast('Work Order Completed', `Job ${jobId} verified, ledger posted & warranty certificate issued.`, 'success');
    logAudit(`Technician completed work order ${jobId}`, 'CCTV & Hardware Operations');
  };

  const handleAddFieldJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomer.trim() || !newAddress.trim()) {
      showToast('Missing Site Details', 'Enter client name and site address to log a field dispatch.', 'warning');
      return;
    }
    const jobId = `JOB-FLD-${Math.floor(100 + Math.random() * 900)}`;
    setAssignedJobs(prev => [{
      id: jobId,
      customerName: newCustomer.trim(),
      customerPhone: newPhone.trim() || '+91 98000 00000',
      address: newAddress.trim(),
      serviceType: newServiceType,
      scheduledSlot: 'On-Site Urgent Dispatch',
      amount: Math.max(250, Number(newAmount) || 500),
      status: 'DISPATCHED',
      checklist: [
        { item: 'Site Inspection & Hardware Health Diagnostic', done: false },
        { item: 'Primary Installation / Repair Execution', done: false },
        { item: 'Customer Acceptance Sign-off & Serial Capture', done: false },
      ],
    }, ...prev]);
    setNewCustomer('');
    setNewPhone('');
    setNewAddress('');
    logAudit(`Technician logged ad-hoc field ticket ${jobId}`, 'Field Operations');
    showToast('Field Job Queued', `${jobId} added to active dispatch queue.`, 'success');
  };

  const handleDownloadWarrantyCertificate = (cert: NonNullable<typeof lastWarrantyCert>) => {
    const text = [
      'AKUL DRAVIN DIGITAL SERVICES (ADCS) — FIELD INSTALLATION & WARRANTY CERTIFICATE',
      '================================================================================',
      `Certificate ID : ${cert.certId}`,
      `Work Order     : ${cert.jobId}`,
      `Technician     : ${technician.name} (${technician.techId})`,
      `Client         : ${cert.customerName}`,
      `Service        : ${cert.serviceType}`,
      `Total Billed   : INR ${cert.amount.toFixed(2)} (Incl. 18% GST)`,
      `Completed At   : ${cert.completedAt}`,
      'Warranty       : 12-Month ADCS On-Site Hardware & Calibration Warranty',
      'Ledger Sync    : Posted to Double-Entry Ledger (1010 Dr / 4071 + 2010 Cr)',
      '================================================================================',
    ].join('\n');
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ADCS_Warranty_Certificate_${cert.jobId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
            <div style={{ fontSize: '0.75rem', color: '#99F6E4' }}>Active Field Queue</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF' }}>{remainingJobsCount} Pending</div>
          </div>
          <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ fontSize: '0.75rem', color: '#99F6E4' }}>Lifetime Jobs</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FDE047' }}>{technician.jobsCompleted} Completed</div>
          </div>
        </div>
      </div>

      {/* Warranty Certificate Banner */}
      {lastWarrantyCert && (
        <div style={{
          background: '#ECFDF5',
          border: '1.5px solid #10B981',
          borderRadius: '18px',
          padding: '1.25rem 1.5rem',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div>
            <div style={{ fontWeight: 800, color: '#065F46', fontSize: '0.98rem' }}>
              Field Installation Signed Off • Certificate {lastWarrantyCert.certId}
            </div>
            <div style={{ fontSize: '0.82rem', color: '#047857' }}>
              {lastWarrantyCert.serviceType} — {lastWarrantyCert.customerName} • ₹{lastWarrantyCert.amount.toFixed(2)} Ledger Posted
            </div>
          </div>
          <button
            onClick={() => handleDownloadWarrantyCertificate(lastWarrantyCert)}
            className="btn-primary btn-sm"
            style={{ gap: '0.35rem' }}
          >
            <Download size={14} />
            <span>Download Warranty Cert (.txt)</span>
          </button>
        </div>
      )}

      {/* Log Urgent On-Site Work Order */}
      <form
        onSubmit={handleAddFieldJob}
        style={{
          background: '#F8FAFC',
          borderRadius: '18px',
          padding: '1.25rem 1.5rem',
          border: '1px solid #CBD5E1',
          marginBottom: '2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: '0.75rem',
          alignItems: 'end',
        }}
      >
        <div>
          <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#475569', marginBottom: '0.25rem' }}>
            Site Client / Kendra
          </label>
          <input
            type="text"
            className="form-input"
            value={newCustomer}
            onChange={(e) => setNewCustomer(e.target.value)}
            placeholder="Client / Shop Name"
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#475569', marginBottom: '0.25rem' }}>
            Phone Number
          </label>
          <input
            type="tel"
            className="form-input"
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
            placeholder="+91 98..."
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#475569', marginBottom: '0.25rem' }}>
            Site Address
          </label>
          <input
            type="text"
            className="form-input"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            placeholder="Area / Landmark, City"
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#475569', marginBottom: '0.25rem' }}>
            Hardware / Field Task
          </label>
          <select
            className="form-select"
            value={newServiceType}
            onChange={(e) => setNewServiceType(e.target.value)}
          >
            <option value="Biometric L1 RD Service Calibration">Biometric L1 Calibration (₹1,200)</option>
            <option value="CCTV 4-Camera Maintenance & NVR Reset">CCTV NVR Maintenance (₹1,800)</option>
            <option value="Thermal Printer & POS Terminal Setup">POS Terminal Setup (₹950)</option>
            <option value="Fiber Router & Static IP Configuration">Networking & Static IP (₹1,500)</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#475569', marginBottom: '0.25rem' }}>
            Fee (₹)
          </label>
          <input
            type="number"
            min={250}
            className="form-input"
            value={newAmount}
            onChange={(e) => setNewAmount(Math.max(250, Number(e.target.value)))}
          />
        </div>
        <button type="submit" className="btn-primary" style={{ justifyContent: 'center', gap: '0.35rem' }}>
          <PlusCircle size={15} />
          <span>Log Field Ticket</span>
        </button>
      </form>

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
