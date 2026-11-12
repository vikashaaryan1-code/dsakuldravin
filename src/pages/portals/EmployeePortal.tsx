import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { printBrandedADCSDocument } from '../../utils/documentBranding';
import { ApplicationStatus } from '../../types';
import { 
  UserCheck, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Calendar, 
  ArrowRight,
  ShieldCheck,
  Check,
  X,
  Download
} from 'lucide-react';

export const EmployeePortal: React.FC = () => {
  const { applications, updateApplicationStatus, showToast, logAudit } = useApp();
  const [selectedAppId, setSelectedAppId] = useState<string>(applications[0]?.id || '');
  const [executiveNotes, setExecutiveNotes] = useState('');
  const [queueFilter, setQueueFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const selectedApp = applications.find(a => a.id === selectedAppId) || applications[0] || null;
  const filteredApps = applications.filter(app => {
    if (queueFilter === 'pending') return app.status !== 'Completed' && app.status !== 'Rejected';
    if (queueFilter === 'completed') return app.status === 'Completed';
    return true;
  });

  const handleUpdateStatus = (status: ApplicationStatus) => {
    if (!selectedApp) return;
    if (status === 'Rejected' && !executiveNotes.trim()) {
      showToast('Rejection Reason Required', 'Enter correction / objection remarks before returning application to citizen.', 'warning');
      return;
    }
    const remark = executiveNotes.trim() || `Officer Rahul Sharma transitioned stage to ${status}`;
    updateApplicationStatus(selectedApp.id, status, remark);
    showToast('Workflow Stage Advanced', `${selectedApp.id} status transitioned to "${status}".`, 'success');
    logAudit(`Executive Advanced ${selectedApp.id}`, `New Status: ${status}`, status === 'Rejected' ? 'Warning' : 'Success');
    setExecutiveNotes('');
  };

  const handleDownloadScrutinyMemo = () => {
    if (!selectedApp) return;
    printBrandedADCSDocument({
      title: 'ADCS Service Executive Verification & Scrutiny Memo',
      documentType: 'INTERNAL SCRUTINY MEMO',
      documentNumber: selectedApp.id,
      issuedDate: new Date().toLocaleDateString('en-IN'),
      rows: [
        { label: 'Service Requested', value: selectedApp.serviceName },
        { label: 'Applicant Details', value: `${selectedApp.applicantName} (${selectedApp.applicantPhone})` },
        { label: 'Location / District', value: `${selectedApp.city}, ${selectedApp.state}` },
        { label: 'Application Status', value: selectedApp.status },
        { label: 'Documents Checked', value: (selectedApp.documentsUploaded || []).join(', ') || 'None' },
        { label: 'Officer Scrutiny Notes', value: selectedApp.notes || executiveNotes || 'Standard verification cleared' },
      ],
      amountSummary: {
        total: Number(selectedApp.feePaid || 0),
        currency: '₹',
        paymentStatus: 'RECORDED ON APPLICATION',
      },
    });
  };

  return (
    <div className="container-wide" style={{ padding: '2.5rem 1.5rem 4rem' }}>
      {/* Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #061A36 0%, #031126 60%, #075ACB 100%)',
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
          <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>SERVICE EXECUTIVE DESK</span>
          <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 900, marginBottom: '0.4rem', color: '#FFFFFF' }}>
            Officer Queue: Rahul Sharma
          </h1>
          <p style={{ fontSize: '0.92rem', color: '#CBD5E1' }}>
            Operations Division • Senior Verification Officer • SLA Compliance Score: 98.4%
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '0.85rem 1.25rem', borderRadius: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#F59E0B' }}>
              {applications.filter(a => a.status !== 'Completed').length}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#CBD5E1' }}>Pending in Queue</div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '0.85rem 1.25rem', borderRadius: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#10B981' }}>100%</div>
            <div style={{ fontSize: '0.72rem', color: '#CBD5E1' }}>SLA Target</div>
          </div>
        </div>
      </div>

      {/* Two Column Workspace */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.2fr',
        gap: '2rem',
      }} className="hero-grid">
        {/* Left: Assigned Application Queue */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          padding: '1.75rem',
          border: '1px solid #E2E8F0',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#061A36', margin: 0 }}>
              Assigned Applications ({filteredApps.length})
            </h3>
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              {(['all', 'pending', 'completed'] as const).map(f => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setQueueFilter(f)}
                  style={{
                    padding: '0.25rem 0.65rem',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    background: queueFilter === f ? '#075ACB' : '#FFFFFF',
                    color: queueFilter === f ? '#FFFFFF' : '#475569',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    textTransform: 'capitalize',
                    cursor: 'pointer',
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {filteredApps.map(app => {
              const isSelected = selectedApp?.id === app.id;
              return (
                <div
                  key={app.id}
                  onClick={() => setSelectedAppId(app.id)}
                  style={{
                    padding: '1rem',
                    borderRadius: '12px',
                    background: isSelected ? '#EFF6FF' : '#F8FAFC',
                    border: isSelected ? '2px solid #075ACB' : '1px solid #E2E8F0',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.92rem', color: '#061A36' }}>{app.id}</span>
                    <span className="badge badge-blue">{app.status}</span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#075ACB' }}>
                    {app.serviceName}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.2rem' }}>
                    Applicant: {app.applicantName} ({app.city})
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Application Scrutiny Workspace */}
        {selectedApp ? (
          <div style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '2rem',
            border: '1px solid #E2E8F0',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span className="badge badge-gold" style={{ marginBottom: '0.4rem' }}>ACTIVE SCRUTINY</span>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#061A36' }}>
                    {selectedApp.id}
                  </h2>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#075ACB', marginTop: '0.2rem' }}>
                    {selectedApp.serviceName}
                  </div>
                </div>
                <span className="badge badge-green" style={{ fontSize: '0.8rem' }}>
                  {selectedApp.status}
                </span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.75rem',
                background: '#F8FAFC',
                borderRadius: '12px',
                padding: '1rem',
                border: '1px solid #E2E8F0',
                marginTop: '1rem',
                fontSize: '0.82rem',
              }}>
                <div>
                  <span style={{ color: '#64748B' }}>Applicant:</span> <strong>{selectedApp.applicantName}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748B' }}>Phone:</span> <strong>{selectedApp.applicantPhone}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748B' }}>Fee Paid:</span> <strong>₹{selectedApp.feePaid}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748B' }}>Submitted:</span> <strong>{selectedApp.submittedAt}</strong>
                </div>
              </div>
            </div>

            {/* Uploaded Documents Scrutiny List */}
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#061A36', marginBottom: '0.6rem' }}>
                Attached Verification Documents:
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {(selectedApp.documentsUploaded || []).map((doc: string, dIdx: number) => (
                  <div
                    key={dIdx}
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '10px',
                      background: '#F0FDF4',
                      border: '1px solid #BBF7D0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.82rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <FileText size={15} color="#059669" />
                      <span style={{ fontWeight: 600, color: '#065F46' }}>{doc}</span>
                    </div>
                    <span className="badge badge-green">OCR Verified</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Executive Notes & Stage Transition */}
            <div>
              <label className="form-label">Add Executive Officer Processing Notes</label>
              <textarea
                className="form-textarea"
                rows={3}
                value={executiveNotes}
                onChange={(e) => setExecutiveNotes(e.target.value)}
                placeholder="Enter remarks (e.g. Scrutiny cleared, submitted to department portal)..."
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => handleUpdateStatus('In Processing')}
                className="btn-primary"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                Mark In Processing
              </button>

              <button
                onClick={() => handleUpdateStatus('Completed')}
                className="btn-gold"
                style={{ flex: 1, justifyContent: 'center', fontWeight: 800 }}
              >
                Mark Completed & Dispatch
              </button>

                <button
                  onClick={() => handleUpdateStatus('Rejected')}
                  style={{
                    padding: '0.65rem 1rem',
                    borderRadius: '8px',
                    background: '#FEE2E2',
                    color: '#BE123C',
                    border: '1px solid #FECDD3',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                  }}
                >
                  Reject / Correction Required
                </button>

                <button
                  type="button"
                  onClick={handleDownloadScrutinyMemo}
                  className="btn-secondary"
                  style={{ gap: '0.35rem' }}
                >
                  <Download size={14} />
                  <span>Scrutiny Memo (PDF)</span>
                </button>
              </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#64748B' }}>
            Select an application from the queue to review documents.
          </div>
        )}
      </div>
    </div>
  );
};
