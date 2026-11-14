import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { printBrandedADCSDocument } from '../../utils/documentBranding';
import { getStatusMeta } from '../../utils/applicationStateMachine';
import { ApplicationStatus, Application } from '../../types';
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
  Download,
  AlertTriangle,
  Send,
  ExternalLink,
  Award,
  Filter
} from 'lucide-react';

export const EmployeePortal: React.FC = () => {
  const { 
    applications, 
    updateApplicationStatus, 
    createCorrectionRequest,
    recordExternalProviderSubmission,
    deliverFinalDocument,
    updateApplicationReviewStatus,
    showToast, 
    logAudit 
  } = useApp();

  const [selectedAppId, setSelectedAppId] = useState<string>(applications[0]?.id || '');
  const [executiveNotes, setExecutiveNotes] = useState('');
  const [queueFilter, setQueueFilter] = useState<'all' | 'pending' | 'corrections' | 'completed'>('all');

  // Correction Modal State
  const [isCorrectionModalOpen, setIsCorrectionModalOpen] = useState(false);
  const [selectedCorrectionDocs, setSelectedCorrectionDocs] = useState<string[]>([]);
  const [correctionReasonText, setCorrectionReasonText] = useState('Document scan is blurry / text unreadable');
  const [correctionGeneralNotes, setCorrectionGeneralNotes] = useState('');

  // External Reference Modal State
  const [isExternalRefModalOpen, setIsExternalRefModalOpen] = useState(false);
  const [externalRefInput, setExternalRefInput] = useState('');
  const [authorityInput, setAuthorityInput] = useState('');

  // Certificate Delivery Modal State
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [deliverableName, setDeliverableName] = useState('');
  const [deliverableUrl, setDeliverableUrl] = useState('');

  const selectedApp = applications.find(a => a.id === selectedAppId) || applications[0] || null;
  const filteredApps = applications.filter(app => {
    if (queueFilter === 'pending') return app.status !== 'DELIVERED' && app.status !== 'CLOSED' && app.status !== 'Completed';
    if (queueFilter === 'corrections') return app.status === 'CORRECTION_REQUIRED';
    if (queueFilter === 'completed') return app.status === 'DELIVERED' || app.status === 'CLOSED' || app.status === 'Completed';
    return true;
  });

  const handleUpdateStatus = (status: ApplicationStatus) => {
    if (!selectedApp) return;
    const remark = executiveNotes.trim() || `Officer Rahul Sharma transitioned stage to ${status}`;
    updateApplicationReviewStatus(selectedApp.id, status, remark);
    showToast('Workflow Stage Advanced', `${selectedApp.id} status transitioned to "${status}".`, 'success');
    logAudit(`Executive Advanced ${selectedApp.id}`, `New Status: ${status}`, 'Success');
    setExecutiveNotes('');
  };

  const handleRaiseCorrection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;
    if (selectedCorrectionDocs.length === 0) {
      showToast('Select Document', 'Please select at least one document that requires correction.', 'error');
      return;
    }

    const items = selectedCorrectionDocs.map(docKey => ({
      fieldOrDocKey: docKey,
      type: 'document' as const,
      label: docKey,
      issueReason: correctionReasonText,
      actionRequired: 'Please upload clear high-resolution document',
      targetKey: docKey,
      targetName: docKey,
      reason: correctionReasonText,
      itemType: 'document' as const,
    }));

    createCorrectionRequest(
      selectedApp.id,
      'Officer Rahul Sharma (Senior Verification Desk)',
      items,
      correctionGeneralNotes || 'Please upload a clear, high-resolution original scan without glare.'
    );

    setIsCorrectionModalOpen(false);
    setSelectedCorrectionDocs([]);
    setCorrectionGeneralNotes('');
    showToast('Correction Notice Dispatched', `Citizen notified via SMS/Portal for ${selectedApp.id}.`, 'warning');
  };

  const handleSaveExternalRef = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp || !externalRefInput.trim()) return;

    recordExternalProviderSubmission(
      selectedApp.id,
      externalRefInput.trim(),
      authorityInput.trim() || selectedApp.externalAuthorityName || 'Government Portal'
    );

    setIsExternalRefModalOpen(false);
    setExternalRefInput('');
    showToast('External ARN Recorded', `Assigned ${externalRefInput} to ${selectedApp.id} in PROVIDER_PROCESSING.`, 'success');
  };

  const handleDeliverCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp || !deliverableName.trim()) return;

    deliverFinalDocument(
      selectedApp.id,
      deliverableName.trim(),
      deliverableUrl.trim() || 'https://ds.akuldravin.com/documents/sample-certificate.pdf'
    );

    setIsDeliveryModalOpen(false);
    setDeliverableName('');
    setDeliverableUrl('');
    showToast('Certificate Delivered', `Final deliverable issued for ${selectedApp.id}.`, 'success');
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
        { label: 'Lifecycle Status', value: selectedApp.status },
        { label: 'Payment Order ID', value: selectedApp.paymentOrderId || 'N/A' },
        { label: 'Official Receipt Number', value: selectedApp.adcsReceiptNumber || 'N/A' },
        { label: 'External Authority Ref', value: selectedApp.externalReferenceNumber || 'Pending' },
        { label: 'Documents Checked', value: (selectedApp.documentsUploaded || []).join(', ') || 'None' },
        { label: 'Officer Scrutiny Notes', value: selectedApp.notes || executiveNotes || 'Standard verification cleared' },
      ],
      amountSummary: {
        total: Number(selectedApp.feePaid || 0),
        currency: '₹',
        paymentStatus: 'RECORDED ON APPLICATION LEDGER',
      },
    });
  };

  return (
    <div className="container-wide" style={{ padding: '2.5rem 1.5rem 4rem' }}>
      {/* Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #061A36 0%, #031126 60%, #075ACB 100%)',
        borderRadius: '24px',
        padding: '2.25rem 2.5rem',
        color: '#FFFFFF',
        marginBottom: '2.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem',
      }}>
        <div>
          <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>OPERATIONS & REVIEWER DESK</span>
          <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.2rem)', fontWeight: 900, marginBottom: '0.4rem', color: '#FFFFFF' }}>
            Officer Queue: Rahul Sharma
          </h1>
          <p style={{ fontSize: '0.92rem', color: '#CBD5E1', margin: 0 }}>
            Senior Verification Officer • Operations Division • 99.8% First-Pass Target SLA
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '0.85rem 1.25rem', borderRadius: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#F59E0B' }}>
              {applications.filter(a => a.status !== 'DELIVERED' && a.status !== 'CLOSED' && a.status !== 'Completed').length}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#CBD5E1' }}>Active in Queue</div>
          </div>
          <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '0.85rem 1.25rem', borderRadius: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#EF4444' }}>
              {applications.filter(a => a.status === 'CORRECTION_REQUIRED').length}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#CBD5E1' }}>Under Correction</div>
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
        gridTemplateColumns: '1fr 1.3fr',
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
              Scrutiny Queue ({filteredApps.length})
            </h3>
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
              {(['all', 'pending', 'corrections', 'completed'] as const).map(f => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setQueueFilter(f)}
                  style={{
                    padding: '0.3rem 0.65rem',
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
              const meta = getStatusMeta(app.status);
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
                    <span style={{
                      background: meta.badgeBg,
                      color: meta.badgeColor,
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '0.15rem 0.5rem',
                      borderRadius: '6px'
                    }}>
                      {meta.badgeText}
                    </span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#075ACB' }}>
                    {app.serviceName}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.2rem' }}>
                    Applicant: <strong>{app.applicantName}</strong> • {app.city}, {app.state}
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <span className="badge badge-gold" style={{ marginBottom: '0.4rem' }}>ACTIVE SCRUTINY DOSSIER</span>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#061A36', margin: '0.2rem 0' }}>
                    {selectedApp.id}
                  </h2>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#075ACB' }}>
                    {selectedApp.serviceName}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    background: getStatusMeta(selectedApp.status).badgeBg,
                    color: getStatusMeta(selectedApp.status).badgeColor,
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    padding: '0.25rem 0.65rem',
                    borderRadius: '8px'
                  }}>
                    {getStatusMeta(selectedApp.status).badgeText}
                  </span>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.25rem' }}>
                    Fee: ₹{(selectedApp.feePaid || 0).toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* The 4 Enterprise Identifiers */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.75rem',
                background: '#F8FAFC',
                borderRadius: '12px',
                padding: '1rem',
                border: '1px solid #E2E8F0',
                marginTop: '1rem',
                fontSize: '0.78rem',
              }}>
                <div>
                  <span style={{ color: '#64748B' }}>Applicant:</span> <strong>{selectedApp.applicantName}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748B' }}>Phone:</span> <strong>{selectedApp.applicantPhone}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748B' }}>Payment Order:</span> <code>{selectedApp.paymentOrderId || `PAY-${selectedApp.id.replace(/[^0-9]/g, '')}`}</code>
                </div>
                <div>
                  <span style={{ color: '#64748B' }}>Receipt No:</span> <code>{selectedApp.adcsReceiptNumber || `REC-${selectedApp.id.replace(/[^0-9]/g, '')}`}</code>
                </div>
                <div>
                  <span style={{ color: '#64748B' }}>Statutory Authority:</span> <strong>{selectedApp.externalAuthorityName || 'State Portal'}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748B' }}>External Reference:</span>{' '}
                  <strong style={{ color: selectedApp.externalReferenceNumber ? '#15803D' : '#64748B' }}>
                    {selectedApp.externalReferenceNumber || 'Pending Submission'}
                  </strong>
                </div>
              </div>
            </div>

            {/* Uploaded Documents Scrutiny List */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#061A36', margin: 0 }}>
                  Attached Documents & Digests:
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCorrectionDocs(selectedApp.documentsUploaded || ['Aadhaar_Document_Verified.pdf']);
                    setIsCorrectionModalOpen(true);
                  }}
                  style={{
                    background: '#FEF2F2',
                    color: '#DC2626',
                    border: '1px solid #FECACA',
                    borderRadius: '6px',
                    padding: '0.25rem 0.6rem',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                >
                  <AlertTriangle size={13} />
                  <span>Flag for Correction</span>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {(selectedApp.uploadedDocumentRecords && selectedApp.uploadedDocumentRecords.length > 0) ? (
                  selectedApp.uploadedDocumentRecords.map(doc => (
                    <div
                      key={doc.id}
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '10px',
                        background: '#F0FDF4',
                        border: '1px solid #BBF7D0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '0.8rem',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <FileText size={15} color="#059669" />
                        <div>
                          <span style={{ fontWeight: 700, color: '#065F46' }}>{doc.name}</span>{' '}
                          <span style={{ color: '#64748B', fontSize: '0.72rem' }}>({doc.fileName} • {doc.size})</span>
                          <div style={{ fontFamily: 'monospace', fontSize: '0.68rem', color: '#166534' }}>
                            SHA: {doc.sha256?.substring(0, 20)}...
                          </div>
                        </div>
                      </div>
                      <span className="badge badge-green">OCR {doc.ocrConfidence || 99}% Match</span>
                    </div>
                  ))
                ) : (
                  (selectedApp.documentsUploaded || ['Aadhaar_Document_Verified.pdf']).map((doc: string, dIdx: number) => (
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
                  ))
                )}
              </div>
            </div>

            {/* Reviewer Action Operations Strip */}
            <div style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '14px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#061A36', textTransform: 'uppercase' }}>
                Reviewer Operational Actions (Separation of Duties):
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.65rem' }}>
                <button
                  type="button"
                  onClick={() => handleUpdateStatus('READY_FOR_PROVIDER')}
                  style={{
                    background: '#075ACB',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0.6rem 0.85rem',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <CheckCircle2 size={15} />
                  <span>Approve for Provider</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsExternalRefModalOpen(true)}
                  style={{
                    background: '#059669',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0.6rem 0.85rem',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <Send size={15} />
                  <span>Record ARN / Portal Ref</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsDeliveryModalOpen(true)}
                  style={{
                    background: '#D97706',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0.6rem 0.85rem',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <Award size={15} />
                  <span>Deliver Final Certificate</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedCorrectionDocs(selectedApp.documentsUploaded || ['Aadhaar_Document_Verified.pdf']);
                    setIsCorrectionModalOpen(true);
                  }}
                  style={{
                    background: '#DC2626',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0.6rem 0.85rem',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <AlertTriangle size={15} />
                  <span>Request Correction</span>
                </button>
              </div>

              {/* Scrutiny Memo Download */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #E2E8F0', paddingTop: '0.75rem' }}>
                <button
                  type="button"
                  onClick={handleDownloadScrutinyMemo}
                  className="btn-outline btn-sm"
                  style={{ gap: '0.35rem' }}
                >
                  <Download size={13} />
                  <span>Download Officer Scrutiny Memo (PDF)</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#64748B' }}>
            Select an application from the queue to review documents.
          </div>
        )}
      </div>

      {/* MODAL 1: RAISE CORRECTION REQUEST */}
      {isCorrectionModalOpen && selectedApp && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(10, 25, 47, 0.75)',
          backdropFilter: 'blur(6px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
        }}>
          <form onSubmit={handleRaiseCorrection} style={{
            background: '#FFFFFF',
            borderRadius: '18px',
            width: '100%',
            maxWidth: '520px',
            padding: '1.75rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#991B1B', margin: 0 }}>
                  Raise Reviewer Correction Notice
                </h3>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Application: {selectedApp.id}</span>
              </div>
              <button type="button" onClick={() => setIsCorrectionModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Select Flagged Document(s) *</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {(selectedApp.documentsUploaded || ['Aadhaar_Document_Verified.pdf']).map((doc, idx) => (
                  <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={selectedCorrectionDocs.includes(doc)}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedCorrectionDocs([...selectedCorrectionDocs, doc]);
                        else setSelectedCorrectionDocs(selectedCorrectionDocs.filter(d => d !== doc));
                      }}
                    />
                    <span>{doc}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Specific Defect / Reason *</label>
              <select
                className="form-select"
                value={correctionReasonText}
                onChange={(e) => setCorrectionReasonText(e.target.value)}
              >
                <option value="Document scan is blurry / text unreadable">Document scan is blurry / text unreadable</option>
                <option value="Name / Date of birth mismatch with Aadhaar">Name / Date of birth mismatch with Aadhaar</option>
                <option value="Signature cut off or missing in upload">Signature cut off or missing in upload</option>
                <option value="Address proof is older than 3 months">Address proof is older than 3 months</option>
                <option value="Photo resolution below official portal spec">Photo resolution below official portal spec</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Officer Advisory to Citizen</label>
              <textarea
                rows={3}
                className="form-input"
                value={correctionGeneralNotes}
                onChange={(e) => setCorrectionGeneralNotes(e.target.value)}
                placeholder="Specific guidance (e.g. Please upload original colored scan of PAN card)..."
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button type="button" onClick={() => setIsCorrectionModalOpen(false)} className="btn-outline btn-sm">
                Cancel
              </button>
              <button type="submit" style={{
                background: '#DC2626',
                color: '#FFFFFF',
                border: 'none',
                padding: '0.55rem 1rem',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}>
                Dispatch Correction Request
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL 2: RECORD EXTERNAL PROVIDER REFERENCE */}
      {isExternalRefModalOpen && selectedApp && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(10, 25, 47, 0.75)',
          backdropFilter: 'blur(6px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
        }}>
          <form onSubmit={handleSaveExternalRef} style={{
            background: '#FFFFFF',
            borderRadius: '18px',
            width: '100%',
            maxWidth: '480px',
            padding: '1.75rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#061A36', margin: 0 }}>
                  Record Official External Reference
                </h3>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Application: {selectedApp.id}</span>
              </div>
              <button type="button" onClick={() => setIsExternalRefModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">External Reference Number (ARN / URN / EID / Token) *</label>
              <input
                type="text"
                required
                className="form-input"
                placeholder="e.g. ARN-2026-9810-7214"
                value={externalRefInput}
                onChange={(e) => setExternalRefInput(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Statutory Authority Name</label>
              <input
                type="text"
                className="form-input"
                placeholder={selectedApp.externalAuthorityName || 'e.g. Passport Seva Portal (MEA)'}
                value={authorityInput}
                onChange={(e) => setAuthorityInput(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button type="button" onClick={() => setIsExternalRefModalOpen(false)} className="btn-outline btn-sm">
                Cancel
              </button>
              <button type="submit" className="btn-primary btn-sm">
                Save Reference & Advance to PROVIDER_PROCESSING
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL 3: DELIVER FINAL CERTIFICATE */}
      {isDeliveryModalOpen && selectedApp && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(10, 25, 47, 0.75)',
          backdropFilter: 'blur(6px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
        }}>
          <form onSubmit={handleDeliverCertificate} style={{
            background: '#FFFFFF',
            borderRadius: '18px',
            width: '100%',
            maxWidth: '480px',
            padding: '1.75rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#061A36', margin: 0 }}>
                  Deliver Final Certificate / Document
                </h3>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Application: {selectedApp.id}</span>
              </div>
              <button type="button" onClick={() => setIsDeliveryModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Deliverable Name *</label>
              <input
                type="text"
                required
                className="form-input"
                placeholder={`Official Issued Certificate for ${selectedApp.serviceName}`}
                value={deliverableName}
                onChange={(e) => setDeliverableName(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Deliverable URL / Storage Key</label>
              <input
                type="text"
                className="form-input"
                placeholder="https://ds.akuldravin.com/documents/certificate.pdf"
                value={deliverableUrl}
                onChange={(e) => setDeliverableUrl(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button type="button" onClick={() => setIsDeliveryModalOpen(false)} className="btn-outline btn-sm">
                Cancel
              </button>
              <button type="submit" className="btn-gold btn-sm">
                Deliver to Citizen & Mark DELIVERED
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
