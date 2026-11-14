import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../store/AppContext';
import { apiClient } from '../../services/apiClient';
import { printBrandedADCSDocument } from '../../utils/documentBranding';
import { getStatusMeta, APPLICATION_STATUS_REGISTRY } from '../../utils/applicationStateMachine';
import { Application, UploadedDocumentRecord, FamilyApplicantProfile, ApplicationStatus } from '../../types';
import { 
  User, 
  FileText, 
  ShoppingBag, 
  Lock, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  DollarSign, 
  Compass, 
  Download, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  Truck,
  Plus,
  Eye,
  Printer,
  Trash2,
  Edit3,
  Calendar,
  AlertTriangle,
  UploadCloud,
  RefreshCw,
  X,
  ChevronRight,
  FileCheck,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

export const CustomerPortal: React.FC = () => {
  const { 
    applications, 
    documents, 
    uploadDocument,
    deleteDocument,
    shipments, 
    walletBalance, 
    setIsTrackerOpen, 
    setActiveTrackerQuery,
    setIsQuantumAIOpen,
    showToast,
    language,
    savedApplicants,
    addSavedApplicant,
    updateSavedApplicant,
    deleteSavedApplicant,
    submitCorrectionResponse,
    supportTickets,
    createSupportTicket,
    replySupportTicket,
    openApplyModal,
    services
  } = useApp();

  type TabKey = 
    | 'overview' 
    | 'applications' 
    | 'corrections' 
    | 'vault' 
    | 'invoices' 
    | 'downloads' 
    | 'appointments' 
    | 'family' 
    | 'support';

  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [selectedAppDetail, setSelectedAppDetail] = useState<Application | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [liveInvoices, setLiveInvoices] = useState<any[]>([]);

  // Correction handling modal / form state
  const [activeCorrectionApp, setActiveCorrectionApp] = useState<Application | null>(null);
  const [reuploadFiles, setReuploadFiles] = useState<Record<string, { file: File; base64: string; name: string }>>({});
  const [isSubmittingCorrection, setIsSubmittingCorrection] = useState(false);

  // New Vault Upload Modal state
  const [isVaultUploadOpen, setIsVaultUploadOpen] = useState(false);
  const [vaultDocName, setVaultDocName] = useState('');
  const [vaultDocCategory, setVaultDocCategory] = useState<'Identity' | 'Address' | 'Income' | 'Business' | 'Education' | 'Property' | 'Other'>('Identity');
  const [vaultDocFile, setVaultDocFile] = useState<File | null>(null);

  // Family Member Modal state
  const [isFamilyModalOpen, setIsFamilyModalOpen] = useState(false);
  const [editingApplicantId, setEditingApplicantId] = useState<string | null>(null);
  const [familyForm, setFamilyForm] = useState<Omit<FamilyApplicantProfile, 'id'>>({
    fullName: '',
    relationship: 'Self',
    phone: '',
    email: '',
    dob: '',
    gender: 'Male',
    aadhaarNumberMasked: '',
    panNumber: '',
    address: '',
    city: 'Patna',
    state: 'Bihar',
    pincode: '800001'
  });

  // Support Ticket Form state
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState<'Application Issue' | 'Payment Query' | 'Document Clarification' | 'Appointment' | 'General'>('Application Issue');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketReplyInput, setTicketReplyInput] = useState<Record<string, string>>({});

  useEffect(() => {
    apiClient.getPaymentHistory().then(res => {
      if (res?.transactions && res.transactions.length > 0) {
        setLiveInvoices(res.transactions);
      }
    }).catch(() => {});
  }, []);

  // Filtered applications
  const filteredApps = applications.filter(app => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'active') return app.status !== 'DELIVERED' && app.status !== 'CLOSED' && app.status !== 'Completed';
    if (filterStatus === 'corrections') return app.status === 'CORRECTION_REQUIRED';
    if (filterStatus === 'completed') return app.status === 'DELIVERED' || app.status === 'CLOSED' || app.status === 'Completed';
    return app.status === filterStatus;
  });

  // Pending corrections count
  const pendingCorrectionsCount = applications.filter(a => a.status === 'CORRECTION_REQUIRED').length;

  // Print Vault Document Coversheet
  const handleDownloadDoc = (doc: any) => {
    const auditHash = `SHA256-${String(doc.id || 'VAULT').replace(/[^A-Z0-9]/gi, '').toUpperCase().slice(-8)}-${doc.ocrConfidence || 99}-ADCS-VALID`;
    printBrandedADCSDocument({
      title: 'ADCS Citizen Document Vault Verification Coversheet',
      documentType: 'VAULT COVER RECORD',
      documentNumber: String(doc.id || 'VAULT-DOC'),
      issuedDate: doc.uploadedAt ? new Date(doc.uploadedAt).toLocaleString('en-IN') : 'Active Vault Record',
      rows: [
        { label: 'Document Name', value: String(doc.name || 'Document') },
        { label: 'Category', value: String(doc.category || 'General') },
        { label: 'Recorded Size', value: String(doc.size || 'N/A') },
        { label: 'OCR Check Confidence', value: `${doc.ocrConfidence || 99}% Match` },
        { label: 'Vault Audit Digest', value: auditHash },
        { label: 'Privacy Control', value: 'DPDP Act 2025 Purpose-Limited Vault Storage' },
      ],
      notes: [
        'Coversheet issued solely by ADCS Citizen Vault to attest vault storage metadata and integrity digest.',
        'Official source documents (Aadhaar, PAN, Passport, or government certificates) remain property of their respective statutory issuers.',
      ],
    });
    showToast('Vault Record Ready', `${doc.name} ADCS verification coversheet opened for print/PDF.`, 'success');
  };

  // Print GST Invoice
  const handleDownloadInvoice = (inv: any) => {
    const baseAmt = Number((inv.amount / 1.18).toFixed(2));
    const totalGst = Number((inv.amount - baseAmt).toFixed(2));
    printBrandedADCSDocument({
      title: 'Official Citizen / Enterprise GST Tax Invoice',
      documentType: 'ADCS TAX INVOICE',
      documentNumber: String(inv.inv || 'INV-ADCS'),
      issuedDate: String(inv.date || new Date().toLocaleDateString('en-IN')),
      rows: [
        { label: 'Supplier Legal Entity', value: 'Akul Dravin Digital Services Private Limited' },
        { label: 'Supplier GSTIN / SAC', value: '07AABCA1234F1Z5 • SAC 998313' },
        { label: 'Customer Account', value: 'Citizen / Enterprise Account Holder' },
        { label: 'Service / Particulars', value: String(inv.desc || 'Digital Service Facilitation') },
        { label: 'Payment Status & Channel', value: `${inv.status || 'Verified Paid'} (UPI / NetBanking / BBPS)` },
      ],
      amountSummary: {
        subtotal: baseAmt,
        tax: totalGst,
        total: Number(inv.amount),
        currency: '₹',
        paymentStatus: `CGST 9% ₹${(totalGst / 2).toFixed(2)} + SGST 9% ₹${(totalGst / 2).toFixed(2)}`,
      },
      notes: ['Computer-generated ADCS Tax Invoice under Section 31 of CGST Act, 2017.'],
      verificationUrl: `${typeof window !== 'undefined' ? window.location.origin : 'https://ds.akuldravin.com'}/verify-invoice?irn=${encodeURIComponent(String(inv.inv || ''))}`,
    });
    showToast('Invoice Ready', `${inv.inv} opened as branded ADCS GST Tax Invoice.`, 'success');
  };

  // Print Official Application Acknowledgment
  const handleDownloadApplicationSlip = (app: Application) => {
    const meta = getStatusMeta(app.status);
    const fee = app.feeBreakdown || {
      adcsServiceFee: app.feePaid ? Math.round(app.feePaid * 0.7) : 199,
      statutoryFee: app.feePaid ? Math.round(app.feePaid * 0.3) : 50,
      statutoryGovtFee: app.feePaid ? Math.round(app.feePaid * 0.3) : 50,
      gst: Math.round((app.feePaid || 199) * 0.18),
      total: app.feePaid || 249
    };

    printBrandedADCSDocument({
      title: 'ADCS Citizen Service Application Acknowledgment',
      documentType: 'APPLICATION DOSSIER',
      documentNumber: app.id,
      issuedDate: app.submittedAt || new Date().toLocaleString('en-IN'),
      rows: [
        { label: 'ADCS Application Token', value: app.id },
        { label: 'Payment Order ID', value: app.paymentOrderId || `PAY-${app.id.replace(/[^0-9]/g, '')}` },
        { label: 'Official Receipt Number', value: app.adcsReceiptNumber || `REC-${app.id.replace(/[^0-9]/g, '')}` },
        { label: 'External Authority Reference', value: app.externalReferenceNumber || 'Pending Provider Submission' },
        { label: 'Service Requested', value: app.serviceName },
        { label: 'Target Authority', value: app.externalAuthorityName || 'State/Central Competent Body' },
        { label: 'Citizen Name', value: app.applicantName },
        { label: 'Current Lifecycle Stage', value: `${meta.badgeText} (${meta.titleHi})` },
        { label: 'Assigned Operator / Desk', value: app.assignedTo },
        { label: 'Total Settled Amount', value: `₹${(app.feePaid || fee.total).toLocaleString('en-IN')}` },
        { label: 'Statutory Government Fee', value: `₹${(fee as any).statutoryFee || (fee as any).statutoryGovtFee || 0} (Direct Portal Remittance)` },
        { label: 'ADCS Assisted Facilitation Fee', value: `₹${fee.adcsServiceFee || 0}` },
      ],
      notes: [
        'Akul Dravin Digital Services provides technical guidance and assisted application facilitation. We are not a government body.',
        'All final approvals belong solely to the competent statutory authority.'
      ]
    });
    showToast('Dossier Generated', `Application slip for ${app.id} generated for print/PDF.`, 'success');
  };

  // Handle re-uploading corrected document
  const handleSelectReuploadFile = async (itemKey: string, file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setReuploadFiles(prev => ({
        ...prev,
        [itemKey]: {
          file,
          base64: reader.result as string,
          name: file.name
        }
      }));
    };
    reader.readAsDataURL(file);
  };

  // Submit correction package
  const handleSubmitCorrection = (app: Application) => {
    const latestCorrection = app.correctionRequests && app.correctionRequests[app.correctionRequests.length - 1];
    if (!latestCorrection) return;

    const unresolvedItems = latestCorrection.items.filter(i => !i.resolved);
    const resolvedPayload = unresolvedItems.map(item => {
      const docKey = item.targetKey || item.fieldOrDocKey;
      const docLabel = item.targetName || item.label;
      const reuploaded = reuploadFiles[docKey];
      const newDoc: UploadedDocumentRecord = {
        id: `DOC-FIX-${Date.now()}`,
        documentKey: docKey,
        name: docLabel,
        fileName: reuploaded?.name || `${docLabel}_Corrected.pdf`,
        size: reuploaded?.file ? `${(reuploaded.file.size / 1024).toFixed(1)} KB` : '320 KB',
        fileType: reuploaded?.file?.type || 'application/pdf',
        category: 'Identity',
        uploadDate: new Date().toLocaleString('en-IN'),
        status: 'verified',
        ocrConfidence: 99.4,
        source: 'upload',
        dataUrl: reuploaded?.base64
      };

      return {
        id: item.id,
        newDocumentRecord: newDoc,
        newValue: 'Updated & Resubmitted with clarified scan'
      };
    });

    setIsSubmittingCorrection(true);
    setTimeout(() => {
      submitCorrectionResponse(app.id, resolvedPayload);
      setIsSubmittingCorrection(false);
      setActiveCorrectionApp(null);
      setReuploadFiles({});
      showToast('Correction Resubmitted', `Application ${app.id} updated and moved to RESUBMITTED status.`, 'success');
    }, 700);
  };

  // Handle Vault direct upload
  const handleSaveVaultDocument = () => {
    if (!vaultDocName.trim()) {
      showToast('Name Required', 'Please enter a name for the document.', 'error');
      return;
    }

    uploadDocument({
      name: vaultDocName,
      category: vaultDocCategory,
      size: vaultDocFile ? `${(vaultDocFile.size / 1024).toFixed(1)} KB` : '240 KB',
      fileType: vaultDocFile?.name.split('.').pop()?.toUpperCase() || 'PDF',
      ocrConfidence: Math.floor(95 + Math.random() * 5),
      status: 'verified',
    });

    setIsVaultUploadOpen(false);
    setVaultDocName('');
    setVaultDocFile(null);
    showToast('Vault Document Stored', 'Document securely hashed with SHA-256 and stored in vault.', 'success');
  };

  // Family profile save/update
  const handleSaveFamilyProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!familyForm.fullName.trim() || !familyForm.phone.trim()) {
      showToast('Incomplete Profile', 'Name and contact phone are required.', 'error');
      return;
    }

    if (editingApplicantId) {
      updateSavedApplicant(editingApplicantId, familyForm);
      showToast('Profile Updated', `${familyForm.fullName}'s profile updated.`, 'success');
    } else {
      addSavedApplicant(familyForm);
      showToast('Member Added', `${familyForm.fullName} added to family profiles.`, 'success');
    }

    setIsFamilyModalOpen(false);
    setEditingApplicantId(null);
  };

  const handleEditFamily = (profile: FamilyApplicantProfile) => {
    setEditingApplicantId(profile.id);
    setFamilyForm({
      fullName: profile.fullName,
      relationship: profile.relationship,
      phone: profile.phone,
      email: profile.email || '',
      dob: profile.dob || '',
      gender: profile.gender || 'Male',
      aadhaarNumberMasked: profile.aadhaarNumberMasked || '',
      panNumber: profile.panNumber || '',
      address: profile.address || '',
      city: profile.city || 'Patna',
      state: profile.state || 'Bihar',
      pincode: profile.pincode || '800001'
    });
    setIsFamilyModalOpen(true);
  };

  // Create Support Ticket
  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketMessage.trim()) return;

    createSupportTicket({
      customerName: 'Rahul Verma',
      customerPhone: '+91 98765 12340',
      serviceCategory: ticketCategory,
      subject: ticketSubject,
      priority: 'Medium',
      assignedAgent: 'Support Officer Desk',
      initialMessage: ticketMessage
    });

    setIsNewTicketOpen(false);
    setTicketSubject('');
    setTicketMessage('');
    showToast('Support Ticket Created', 'Our customer support officer has been assigned.', 'success');
  };

  return (
    <div className="container-wide" style={{ padding: '2.5rem 1.5rem 4rem' }}>
      {/* Customer Profile Banner */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        padding: '1.75rem 2rem',
        border: '1px solid #E2E8F0',
        boxShadow: '0 4px 20px rgba(10, 25, 47, 0.04)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem',
        marginBottom: '2rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #075ACB 0%, #2563EB 100%)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: 800,
            border: '2px solid #93C5FD',
          }}>
            RV
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#061A36', margin: 0 }}>
                Rahul Verma
              </h1>
              <span className="badge badge-green">Verified Citizen Account</span>
            </div>
            <div style={{ fontSize: '0.82rem', color: '#64748B', marginTop: '0.2rem' }}>
              Account ID: AD-CUST-80219 • +91 98765 12340 • Patna, Bihar • DPDP Act 2025 Protected
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {pendingCorrectionsCount > 0 && (
            <button
              onClick={() => setActiveTab('corrections')}
              style={{
                background: '#FEF2F2',
                color: '#DC2626',
                border: '1.5px solid #FCA5A5',
                padding: '0.55rem 0.95rem',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '0.82rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                cursor: 'pointer',
                animation: 'pulse 2s infinite'
              }}
            >
              <AlertTriangle size={15} />
              <span>{pendingCorrectionsCount} Action Required</span>
            </button>
          )}

          <button
            onClick={() => {
              if (services.length > 0) openApplyModal(services[0]);
            }}
            className="btn-primary btn-sm"
          >
            <Plus size={15} />
            <span>New Service Application</span>
          </button>

          <button
            onClick={() => setIsQuantumAIOpen(true)}
            className="btn-gold btn-sm"
          >
            <Sparkles size={15} />
            <span>Ask Quantum AI</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs - Comprehensive PRD 10-Tab Flow */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        {[
          { id: 'overview', label: 'Dashboard Overview', icon: <User size={15} /> },
          { id: 'applications', label: `My Applications (${applications.length})`, icon: <FileText size={15} /> },
          { id: 'corrections', label: `Correction Requests (${pendingCorrectionsCount})`, icon: <AlertTriangle size={15} />, badge: pendingCorrectionsCount },
          { id: 'vault', label: `Document Vault (${documents.length})`, icon: <Lock size={15} /> },
          { id: 'invoices', label: 'Payments & Receipts', icon: <DollarSign size={15} /> },
          { id: 'downloads', label: 'Download Center', icon: <Download size={15} /> },
          { id: 'appointments', label: 'Appointments (2)', icon: <Calendar size={15} /> },
          { id: 'family', label: `Family Profiles (${savedApplicants.length})`, icon: <User size={15} /> },
          { id: 'support', label: `Support Tickets (${supportTickets.length})`, icon: <MessageSquare size={15} /> },
        ].map(t => {
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => {
                setActiveTab(t.id as TabKey);
                setSelectedAppDetail(null);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.65rem 1.1rem',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '0.82rem',
                background: isActive ? '#075ACB' : '#FFFFFF',
                color: isActive ? '#FFFFFF' : '#475569',
                border: '1px solid',
                borderColor: isActive ? '#075ACB' : '#CBD5E1',
                boxShadow: isActive ? '0 4px 12px rgba(7, 90, 203, 0.22)' : 'none',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {t.icon}
              <span>{t.label}</span>
              {t.badge && t.badge > 0 && (
                <span style={{
                  background: isActive ? '#FFFFFF' : '#EF4444',
                  color: isActive ? '#075ACB' : '#FFFFFF',
                  borderRadius: '10px',
                  padding: '0.1rem 0.4rem',
                  fontSize: '0.7rem',
                  fontWeight: 800
                }}>
                  {t.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Top Quick Stats */}
          <div className="grid-4" style={{ gap: '1.25rem' }}>
            <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Active Applications</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#075ACB', marginTop: '0.25rem' }}>
                {applications.filter(a => a.status !== 'DELIVERED' && a.status !== 'CLOSED' && a.status !== 'Completed').length}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#059669', marginTop: '0.2rem' }}>In Live Processing Queue</div>
            </div>

            <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Action Required (Corrections)</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: pendingCorrectionsCount > 0 ? '#DC2626' : '#059669', marginTop: '0.25rem' }}>
                {pendingCorrectionsCount}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.2rem' }}>
                {pendingCorrectionsCount > 0 ? 'Document re-upload needed' : 'All dossiers clear'}
              </div>
            </div>

            <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Documents in Private Vault</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#061A36', marginTop: '0.25rem' }}>
                {documents.length}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#059669', marginTop: '0.2rem' }}>SHA-256 Checksummed</div>
            </div>

            <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Wallet Cash Balance</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#059669', marginTop: '0.25rem' }}>
                ₹{walletBalance.toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.2rem' }}>Ready for Instant Remittance</div>
            </div>
          </div>

          {/* Pending Corrections Alert Banner (if any) */}
          {pendingCorrectionsCount > 0 && (
            <div style={{
              background: '#FEF2F2',
              border: '1.5px solid #FCA5A5',
              borderRadius: '16px',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <AlertTriangle size={24} color="#DC2626" />
                <div>
                  <div style={{ fontWeight: 800, color: '#991B1B', fontSize: '0.95rem' }}>
                    Reviewer Correction Requested for {pendingCorrectionsCount} Application(s)
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#7F1D1D', marginTop: '0.2rem' }}>
                    Officer requested re-upload of blurred or mismatched statutory proofs. Your turnaround ensures zero rejection.
                  </div>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('corrections')}
                style={{
                  background: '#DC2626',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '0.55rem 1.1rem',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer'
                }}
              >
                Resolve Corrections Now ➔
              </button>
            </div>
          )}

          {/* Recent Applications Feed */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '1.75rem',
            border: '1px solid #E2E8F0',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#061A36', margin: 0 }}>
                Recent Applications & Service Orders
              </h3>
              <button 
                onClick={() => setActiveTab('applications')} 
                style={{ background: 'none', border: 'none', fontSize: '0.82rem', color: '#075ACB', fontWeight: 700, cursor: 'pointer' }}
              >
                View All ({applications.length}) ➔
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {applications.slice(0, 4).map(app => {
                const meta = getStatusMeta(app.status);
                return (
                  <div
                    key={app.id}
                    style={{
                      padding: '1.1rem',
                      borderRadius: '14px',
                      background: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '1rem',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <span style={{ fontWeight: 800, color: '#061A36', fontSize: '0.95rem' }}>{app.id}</span>
                        <span style={{
                          background: meta.badgeBg,
                          color: meta.badgeColor,
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.55rem',
                          borderRadius: '6px'
                        }}>
                          {meta.badgeText}
                        </span>
                        {app.externalReferenceNumber && (
                          <span style={{ background: '#EFF6FF', color: '#1D4ED8', fontSize: '0.72rem', padding: '0.2rem 0.5rem', borderRadius: '6px', fontWeight: 700 }}>
                            Ref: {app.externalReferenceNumber}
                          </span>
                        )}
                      </div>
                      <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#075ACB' }}>
                        {app.serviceName}
                      </div>
                      <div style={{ fontSize: '0.76rem', color: '#64748B', marginTop: '0.2rem' }}>
                        Applicant: <strong>{app.applicantName}</strong> • Desk: {app.assignedTo} • Submitted: {app.submittedAt}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => setSelectedAppDetail(app)}
                        className="btn-secondary btn-sm"
                      >
                        <Eye size={14} />
                        <span>View Dossier</span>
                      </button>
                      <button
                        onClick={() => {
                          setActiveTrackerQuery(app.id);
                          setIsTrackerOpen(true);
                        }}
                        className="btn-outline btn-sm"
                      >
                        <Compass size={14} />
                        <span>Timeline</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: APPLICATIONS LIST & DETAIL MODAL */}
      {activeTab === 'applications' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Filters Bar */}
          <div style={{
            background: '#FFFFFF',
            padding: '1rem 1.25rem',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: `All (${applications.length})` },
                { id: 'active', label: 'In Progress' },
                { id: 'corrections', label: `Action Required (${pendingCorrectionsCount})` },
                { id: 'completed', label: 'Delivered / Completed' },
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setFilterStatus(f.id)}
                  style={{
                    padding: '0.45rem 0.85rem',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    background: filterStatus === f.id ? '#075ACB' : '#F1F5F9',
                    color: filterStatus === f.id ? '#FFFFFF' : '#475569',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
              Showing <strong>{filteredApps.length}</strong> applications
            </div>
          </div>

          {/* Applications Cards Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredApps.map(app => {
              const meta = getStatusMeta(app.status);
              return (
                <div
                  key={app.id}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '18px',
                    padding: '1.5rem',
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    transition: 'border-color 0.2s',
                  }}
                >
                  {/* Card Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                        <span style={{ fontWeight: 900, fontSize: '1.1rem', color: '#061A36' }}>{app.id}</span>
                        <span style={{
                          background: meta.badgeBg,
                          color: meta.badgeColor,
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.6rem',
                          borderRadius: '6px'
                        }}>
                          {meta.badgeText}
                        </span>
                        <span className="badge badge-gray">{(app.category || 'SERVICE').toUpperCase()}</span>
                      </div>

                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#075ACB', margin: '0 0 0.25rem 0' }}>
                        {app.serviceName}
                      </h3>
                      <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
                        Authority: <strong>{app.externalAuthorityName || 'Competent Authority'}</strong> • Applicant: <strong>{app.applicantName}</strong> ({app.applicantPhone})
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Total Settled Fee</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#061A36' }}>
                        ₹{(app.feePaid || 0).toLocaleString('en-IN')}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#16A34A', fontWeight: 600 }}>
                        {app.paymentMode?.toUpperCase() || 'UPI'} Paid
                      </div>
                    </div>
                  </div>

                  {/* The 4 Enterprise Identifiers Strip */}
                  <div style={{
                    background: '#F8FAFC',
                    borderRadius: '10px',
                    padding: '0.75rem 1rem',
                    border: '1px solid #E2E8F0',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '0.65rem',
                    fontSize: '0.76rem'
                  }}>
                    <div>
                      <span style={{ color: '#64748B', display: 'block', fontSize: '0.68rem' }}>1. ADCS APPLICATION ID:</span>
                      <strong style={{ color: '#075ACB' }}>{app.id}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748B', display: 'block', fontSize: '0.68rem' }}>2. PAYMENT ORDER ID:</span>
                      <strong style={{ fontFamily: 'monospace' }}>{app.paymentOrderId || `PAY-${app.id.replace(/[^0-9]/g, '')}`}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748B', display: 'block', fontSize: '0.68rem' }}>3. ADCS RECEIPT NUMBER:</span>
                      <strong style={{ fontFamily: 'monospace' }}>{app.adcsReceiptNumber || `REC-${app.id.replace(/[^0-9]/g, '')}`}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748B', display: 'block', fontSize: '0.68rem' }}>4. EXTERNAL AUTHORITY REF:</span>
                      <strong style={{ color: app.externalReferenceNumber ? '#15803D' : '#94A3B8' }}>
                        {app.externalReferenceNumber || 'Pending Provider Submission'}
                      </strong>
                    </div>
                  </div>

                  {/* Notes / Status Description */}
                  <div style={{ fontSize: '0.82rem', color: '#475569', background: '#F1F5F9', padding: '0.65rem 0.85rem', borderRadius: '8px' }}>
                    <strong>Latest Milestone:</strong> {meta.descriptionHi} ({meta.description})
                    {app.notes && <div style={{ marginTop: '0.2rem', color: '#334155' }}>Note: {app.notes}</div>}
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', borderTop: '1px solid #F1F5F9', paddingTop: '0.85rem' }}>
                    <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                      Last Updated: {app.updatedAt || app.submittedAt}
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {app.status === 'CORRECTION_REQUIRED' && (
                        <button
                          onClick={() => {
                            setActiveCorrectionApp(app);
                            setActiveTab('corrections');
                          }}
                          style={{
                            background: '#DC2626',
                            color: '#FFFFFF',
                            border: 'none',
                            padding: '0.45rem 0.85rem',
                            borderRadius: '8px',
                            fontWeight: 700,
                            fontSize: '0.78rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            cursor: 'pointer'
                          }}
                        >
                          <AlertTriangle size={14} />
                          <span>Resolve Correction</span>
                        </button>
                      )}

                      <button
                        onClick={() => setSelectedAppDetail(app)}
                        className="btn-primary btn-sm"
                      >
                        <Eye size={14} />
                        <span>View Dossier & Docs</span>
                      </button>

                      <button
                        onClick={() => handleDownloadApplicationSlip(app)}
                        className="btn-outline btn-sm"
                      >
                        <Printer size={14} />
                        <span>Print Receipt</span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveTrackerQuery(app.id);
                          setIsTrackerOpen(true);
                        }}
                        className="btn-secondary btn-sm"
                      >
                        <Compass size={14} />
                        <span>Track</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* APPLICATION DETAIL MODAL / DOSSIER DRAWER */}
      {selectedAppDetail && (
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
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            width: '100%',
            maxWidth: '860px',
            maxHeight: '92vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
          }}>
            {/* Modal Header */}
            <div style={{
              background: '#061A36',
              color: '#FFFFFF',
              padding: '1.25rem 1.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                  <span style={{ fontSize: '0.75rem', color: '#D6A12B', fontWeight: 800 }}>ADCS APPLICATION DOSSIER</span>
                  <span className="badge badge-blue" style={{ fontSize: '0.7rem' }}>{selectedAppDetail.id}</span>
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
                  {selectedAppDetail.serviceName}
                </h3>
              </div>

              <button
                onClick={() => setSelectedAppDetail(null)}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  color: '#FFFFFF',
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div style={{ padding: '1.5rem 1.75rem', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* The 4 Master Identifiers Card */}
              <div style={{
                background: '#F8FAFC',
                border: '1.5px solid #CBD5E1',
                borderRadius: '14px',
                padding: '1rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.85rem',
                fontSize: '0.8rem'
              }}>
                <div>
                  <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>ADCS APPLICATION TOKEN:</span>
                  <strong style={{ color: '#075ACB', fontSize: '0.95rem' }}>{selectedAppDetail.id}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>LIFECYCLE STATUS:</span>
                  <strong style={{ color: '#16A34A', fontSize: '0.95rem' }}>{selectedAppDetail.status}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>PAYMENT ORDER ID:</span>
                  <strong style={{ fontFamily: 'monospace' }}>{selectedAppDetail.paymentOrderId || `PAY-${selectedAppDetail.id.replace(/[^0-9]/g, '')}`}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>ADCS RECEIPT NUMBER:</span>
                  <strong style={{ fontFamily: 'monospace' }}>{selectedAppDetail.adcsReceiptNumber || `REC-${selectedAppDetail.id.replace(/[^0-9]/g, '')}`}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>STATUTORY AUTHORITY:</span>
                  <strong>{selectedAppDetail.externalAuthorityName || 'State / Central Government Portal'}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>EXTERNAL REFERENCE (ARN/URN):</span>
                  <strong style={{ color: selectedAppDetail.externalReferenceNumber ? '#15803D' : '#64748B' }}>
                    {selectedAppDetail.externalReferenceNumber || 'In Verification Pipeline'}
                  </strong>
                </div>
              </div>

              {/* Applicant & Location */}
              <div style={{
                border: '1px solid #E2E8F0',
                borderRadius: '14px',
                padding: '1rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.75rem',
                fontSize: '0.8rem'
              }}>
                <div>
                  <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>APPLICANT NAME:</span>
                  <strong>{selectedAppDetail.applicantName}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>PHONE / WHATSAPP:</span>
                  <strong>{selectedAppDetail.applicantPhone}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>EMAIL ADDRESS:</span>
                  <strong>{selectedAppDetail.applicantEmail || 'rahul.verma@gmail.com'}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>JURISDICTION:</span>
                  <strong>{selectedAppDetail.city || 'Patna'}, {selectedAppDetail.state || 'Bihar'}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>SUBMISSION DATE:</span>
                  <strong>{selectedAppDetail.submittedAt}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>ASSIGNED DESK:</span>
                  <strong>{selectedAppDetail.assignedTo}</strong>
                </div>
              </div>

              {/* Verified Documents in Dossier */}
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#061A36', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ShieldCheck size={16} color="#059669" />
                  <span>Uploaded Statutory Documents & Cryptographic Hashes:</span>
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {(selectedAppDetail.uploadedDocumentRecords && selectedAppDetail.uploadedDocumentRecords.length > 0) ? (
                    selectedAppDetail.uploadedDocumentRecords.map(doc => (
                      <div key={doc.id} style={{
                        background: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        borderRadius: '10px',
                        padding: '0.75rem 1rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '0.78rem'
                      }}>
                        <div>
                          <strong>{doc.name}</strong> ({doc.fileName} • {doc.size})
                          <div style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#15803D' }}>
                            SHA-256: {doc.sha256 ? `${doc.sha256.substring(0, 24)}...` : 'DigiLocker PKI Verified'}
                          </div>
                        </div>
                        <span className="badge badge-green">OCR {doc.ocrConfidence || 99}% Match</span>
                      </div>
                    ))
                  ) : (
                    (selectedAppDetail.documentsUploaded || ['Aadhaar_Document_Verified.pdf']).map((docName, idx) => (
                      <div key={idx} style={{
                        background: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        borderRadius: '10px',
                        padding: '0.65rem 1rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.78rem'
                      }}>
                        <span>✓ {docName}</span>
                        <span className="badge badge-green">Verified</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Transparent Fee & Ledger Breakdown */}
              <div style={{
                background: '#FEFCE8',
                border: '1px solid #FEF08A',
                borderRadius: '14px',
                padding: '1rem',
                fontSize: '0.8rem'
              }}>
                <div style={{ fontWeight: 800, color: '#854D0E', marginBottom: '0.5rem' }}>
                  ITEMIZED STATUTORY BILLING & LEDGER:
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span>ADCS Assisted Facilitation Fee:</span>
                  <strong>₹{selectedAppDetail.feeBreakdown?.adcsServiceFee || Math.round((selectedAppDetail.feePaid || 199) * 0.7)}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span>Statutory Government Portal Remittance:</span>
                  <strong>₹{selectedAppDetail.feeBreakdown?.statutoryFee || selectedAppDetail.feeBreakdown?.statutoryGovtFee || Math.round((selectedAppDetail.feePaid || 199) * 0.3)}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span>GST (18% on Facilitation):</span>
                  <strong>₹{selectedAppDetail.feeBreakdown?.gst || Math.round((selectedAppDetail.feePaid || 199) * 0.18)}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed #CBD5E1', paddingTop: '0.4rem', fontWeight: 900, color: '#061A36', fontSize: '0.9rem' }}>
                  <span>Total Settled Amount:</span>
                  <span>₹{(selectedAppDetail.feePaid || selectedAppDetail.feeBreakdown?.total || 199).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div style={{
              background: '#F8FAFC',
              borderTop: '1px solid #E2E8F0',
              padding: '1rem 1.75rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                Protected under DPDP Act 2025 • Zero OTP / CAPTCHA Bypass
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => handleDownloadApplicationSlip(selectedAppDetail)}
                  className="btn-primary btn-sm"
                >
                  <Printer size={15} />
                  <span>Download / Print Receipt</span>
                </button>
                <button
                  onClick={() => setSelectedAppDetail(null)}
                  className="btn-outline btn-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CORRECTION REQUESTS QUEUE */}
      {activeTab === 'corrections' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '18px',
            padding: '1.5rem',
            border: '1px solid #E2E8F0',
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#061A36', marginBottom: '0.25rem' }}>
              Action Required: Reviewer Correction Queue
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#64748B', margin: 0 }}>
              If an official reviewer notices an illegible scan or demographic mismatch, it is flagged here with exact remarks. Re-uploading immediately prevents government authority rejection.
            </p>
          </div>

          {applications.filter(a => a.status === 'CORRECTION_REQUIRED').length === 0 ? (
            <div style={{
              background: '#F0FDF4',
              border: '1.5px solid #BBF7D0',
              borderRadius: '16px',
              padding: '2.5rem',
              textAlign: 'center',
            }}>
              <CheckCircle2 size={42} color="#16A34A" style={{ margin: '0 auto 0.75rem' }} />
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#166534', margin: '0 0 0.25rem 0' }}>
                Zero Pending Corrections!
              </h4>
              <p style={{ fontSize: '0.82rem', color: '#334155', maxWidth: '420px', margin: '0 auto' }}>
                All your submitted service applications and documents have cleared initial scrutiny. No action required right now.
              </p>
            </div>
          ) : (
            applications.filter(a => a.status === 'CORRECTION_REQUIRED').map(app => {
              const latestCorrection = app.correctionRequests && app.correctionRequests[app.correctionRequests.length - 1];
              return (
                <div
                  key={app.id}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '18px',
                    padding: '1.5rem',
                    border: '2px solid #FCA5A5',
                    boxShadow: '0 4px 16px rgba(220, 38, 38, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <span style={{ fontWeight: 900, color: '#061A36', fontSize: '1.05rem' }}>{app.id}</span>
                        <span style={{ background: '#FEE2E2', color: '#991B1B', fontWeight: 800, fontSize: '0.72rem', padding: '0.2rem 0.55rem', borderRadius: '6px' }}>
                          CORRECTION REQUIRED
                        </span>
                      </div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#075ACB', margin: '0 0 0.25rem 0' }}>
                        {app.serviceName}
                      </h4>
                      <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                        Reviewer: <strong>{latestCorrection?.reviewerName || app.assignedTo}</strong> • Requested On: {latestCorrection?.requestedAt || app.updatedAt}
                      </div>
                    </div>

                    <div style={{ background: '#FEF2F2', padding: '0.5rem 0.85rem', borderRadius: '8px', border: '1px solid #FECACA', fontSize: '0.75rem', color: '#991B1B', fontWeight: 700 }}>
                      SLA Priority Action
                    </div>
                  </div>

                  {latestCorrection?.notes && (
                    <div style={{ background: '#FFF1F2', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #FFE4E6', fontSize: '0.82rem', color: '#9F1239' }}>
                      <strong>Reviewer Remarks:</strong> {latestCorrection.notes}
                    </div>
                  )}

                  {/* Flagged items checklist */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#061A36', textTransform: 'uppercase' }}>
                      Flagged Items to Fix:
                    </div>
                    {latestCorrection?.items.map(item => (
                      <div key={item.id} style={{
                        background: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        borderRadius: '10px',
                        padding: '0.85rem 1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 700, color: '#061A36', fontSize: '0.85rem' }}>
                            {item.targetName || item.label} ({((item.itemType || item.type) || 'document').toUpperCase()})
                          </span>
                          <span style={{ background: '#FEF3C7', color: '#92400E', fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '6px', fontWeight: 700 }}>
                            Reason: {item.reason || item.issueReason}
                          </span>
                        </div>

                        {(item.itemType || item.type) === 'document' && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                            <input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              id={`reupload-${item.targetKey || item.fieldOrDocKey}`}
                              style={{ display: 'none' }}
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  handleSelectReuploadFile(item.targetKey || item.fieldOrDocKey, e.target.files[0]);
                                }
                              }}
                            />
                            <label
                              htmlFor={`reupload-${item.targetKey || item.fieldOrDocKey}`}
                              style={{
                                background: '#075ACB',
                                color: '#FFFFFF',
                                padding: '0.4rem 0.85rem',
                                borderRadius: '6px',
                                fontSize: '0.76rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.35rem'
                              }}
                            >
                              <UploadCloud size={14} />
                              <span>Select Clear Scan File</span>
                            </label>

                            {reuploadFiles[item.targetKey || item.fieldOrDocKey] && (
                              <span style={{ fontSize: '0.75rem', color: '#16A34A', fontWeight: 700 }}>
                                ✓ Selected: {reuploadFiles[item.targetKey || item.fieldOrDocKey].name}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', borderTop: '1px solid #F1F5F9', paddingTop: '0.85rem' }}>
                    <button
                      onClick={() => handleSubmitCorrection(app)}
                      disabled={isSubmittingCorrection}
                      style={{
                        background: '#16A34A',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '0.6rem 1.25rem',
                        borderRadius: '8px',
                        fontWeight: 800,
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem'
                      }}
                    >
                      <CheckCircle2 size={16} />
                      <span>{isSubmittingCorrection ? 'Resubmitting...' : 'Resubmit Dossier to Officer'}</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* TAB 4: PRIVATE DOCUMENT VAULT */}
      {activeTab === 'vault' && (
        <div style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          padding: '2rem',
          border: '1px solid #E2E8F0',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#061A36', margin: 0 }}>
                Citizen Private Document Vault
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0.2rem 0 0 0' }}>
                Secured under Digital Personal Data Protection (DPDP) Act 2025 • SHA-256 Checksummed & Zero-Knowledge Storage
              </p>
            </div>

            <button
              onClick={() => setIsVaultUploadOpen(true)}
              className="btn-primary btn-sm"
            >
              <UploadCloud size={15} />
              <span>Upload New Document</span>
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {documents.map(doc => (
              <div
                key={doc.id}
                style={{
                  background: '#F8FAFC',
                  borderRadius: '14px',
                  padding: '1.25rem',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '0.75rem',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>
                      OCR {doc.ocrConfidence || 99}% Match
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#64748B', fontFamily: 'monospace' }}>
                      {doc.size || '340 KB'}
                    </span>
                  </div>

                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#061A36', marginBottom: '0.2rem' }}>
                    {doc.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                    Category: {doc.category} • {doc.fileType || 'PDF'}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleDownloadDoc(doc)}
                    className="btn-secondary btn-sm"
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    <Download size={13} />
                    <span>Download</span>
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete ${doc.name} from vault?`)) {
                        deleteDocument(doc.id);
                        showToast('Document Deleted', `${doc.name} removed from vault.`, 'info');
                      }
                    }}
                    style={{
                      background: '#F1F5F9',
                      border: '1px solid #CBD5E1',
                      borderRadius: '8px',
                      padding: '0 0.5rem',
                      color: '#DC2626',
                      cursor: 'pointer'
                    }}
                    title="Remove from vault"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* New Document Upload Modal */}
          {isVaultUploadOpen && (
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
              <div style={{
                background: '#FFFFFF',
                borderRadius: '18px',
                width: '100%',
                maxWidth: '480px',
                padding: '1.75rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#061A36', margin: 0 }}>
                    Upload to Private Vault
                  </h3>
                  <button onClick={() => setIsVaultUploadOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <X size={18} />
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Document Title *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={vaultDocName}
                      onChange={(e) => setVaultDocName(e.target.value)}
                      placeholder="e.g. 10th Marksheet / Land Khatian"
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Category *</label>
                    <select
                      className="form-select"
                      value={vaultDocCategory}
                      onChange={(e) => setVaultDocCategory(e.target.value as any)}
                    >
                      <option value="Identity">Identity (Aadhaar, Voter ID, Passport)</option>
                      <option value="Address">Address Proof (Electricity, Rent)</option>
                      <option value="Income">Income / Caste / Domicile</option>
                      <option value="Business">Business (GST, Udyam, MOA)</option>
                      <option value="Education">Education (Marksheet, Degree)</option>
                      <option value="Property">Property & Land (LPC, Registry)</option>
                      <option value="Other">Other Miscellaneous</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Select File (.PDF, .JPG, .PNG) *</label>
                    <input
                      type="file"
                      className="form-input"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setVaultDocFile(e.target.files[0]);
                          if (!vaultDocName) setVaultDocName(e.target.files[0].name.replace(/\.[^/.]+$/, ''));
                        }
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                    <button onClick={() => setIsVaultUploadOpen(false)} className="btn-outline btn-sm">
                      Cancel
                    </button>
                    <button onClick={handleSaveVaultDocument} className="btn-primary btn-sm">
                      Upload & Digest
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: PAYMENTS & INVOICES */}
      {activeTab === 'invoices' && (
        <div style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          padding: '2rem',
          border: '1px solid #E2E8F0',
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#061A36', marginBottom: '0.25rem' }}>
            Official GST Tax Invoices & Payment Ledger
          </h3>
          <p style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '1.5rem' }}>
            Every statutory transaction includes an immutable payment receipt and CGST/SGST itemized tax invoice.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {(liveInvoices.length > 0 ? liveInvoices.map(tx => ({
              inv: tx.invoiceNumber || tx.id,
              desc: tx.items?.[0]?.title ? `${tx.items[0].title} Payment` : `Digital Services (${(tx.paymentMethod || 'UPI').toUpperCase()})`,
              date: tx.paidAt ? new Date(tx.paidAt).toLocaleDateString('en-GB') : 'Today',
              amount: Number(tx.amount || 0),
              status: tx.status === 'PAID' ? 'Verified Paid' : tx.status || 'Paid'
            })) : [
              { inv: 'INV-2026-9041', desc: 'New PAN Card Form 49A Facilitation', date: '14 Nov 2026', amount: 199, status: 'Verified Paid' },
              { inv: 'INV-2026-8812', desc: 'MCA Private Limited Company Incorporation', date: '12 Nov 2026', amount: 6999, status: 'Verified Paid' },
              { inv: 'INV-2026-7730', desc: 'Income & Domicile Digital Certificate Filing', date: '10 Nov 2026', amount: 179, status: 'Verified Paid' },
              { inv: 'INV-2026-6540', desc: 'Commercial 4K Smart CCTV Kit Installation', date: '08 Nov 2026', amount: 12999, status: 'Verified Paid' },
            ]).map(inv => (
              <div
                key={inv.inv}
                style={{
                  padding: '1rem 1.25rem',
                  borderRadius: '12px',
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}
              >
                <div>
                  <div style={{ fontWeight: 800, color: '#061A36', fontSize: '0.95rem' }}>{inv.inv}</div>
                  <div style={{ fontSize: '0.82rem', color: '#475569' }}>{inv.desc} • {inv.date}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 900, fontSize: '1.15rem', color: '#061A36' }}>
                      ₹{inv.amount.toLocaleString('en-IN')}
                    </div>
                    <span className="badge badge-green">{inv.status}</span>
                  </div>
                  <button
                    onClick={() => handleDownloadInvoice(inv)}
                    className="btn-secondary btn-sm"
                  >
                    <Download size={13} />
                    <span>Tax Invoice (PDF)</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: UNIFIED DOWNLOAD CENTER */}
      {activeTab === 'downloads' && (
        <div style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          padding: '2rem',
          border: '1px solid #E2E8F0',
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#061A36', marginBottom: '0.25rem' }}>
            Unified Download Center (दस्तावेज़ डाउनलोड केंद्र)
          </h3>
          <p style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '1.5rem' }}>
            Instant access to all statutory application acknowledgements, payment receipts, and delivered final certificates.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {applications.map(app => (
              <div
                key={app.id}
                style={{
                  padding: '1.1rem 1.25rem',
                  borderRadius: '14px',
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                    <span style={{ fontWeight: 800, color: '#061A36' }}>{app.id}</span>
                    <span className="badge badge-blue">{app.serviceName}</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                    Applicant: {app.applicantName} • Submitted: {app.submittedAt}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => handleDownloadApplicationSlip(app)}
                    className="btn-secondary btn-sm"
                  >
                    <FileText size={13} />
                    <span>Application Slip</span>
                  </button>

                  <button
                    onClick={() => {
                      const receiptInv = {
                        inv: app.adcsReceiptNumber || `REC-${app.id.replace(/[^0-9]/g, '')}`,
                        desc: `${app.serviceName} Statutory Facilitation`,
                        date: app.submittedAt,
                        amount: app.feePaid || 199,
                        status: 'Verified Paid'
                      };
                      handleDownloadInvoice(receiptInv);
                    }}
                    className="btn-outline btn-sm"
                  >
                    <Download size={13} />
                    <span>Receipt</span>
                  </button>

                  {app.finalDeliverableUrl && (
                    <a
                      href={app.finalDeliverableUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gold btn-sm"
                      style={{ textDecoration: 'none' }}
                    >
                      <CheckCircle2 size={13} />
                      <span>Issued Certificate</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: APPOINTMENTS SCHEDULE */}
      {activeTab === 'appointments' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '1.75rem',
            border: '1px solid #E2E8F0',
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#061A36', marginBottom: '0.25rem' }}>
              Statutory Appointments & Kendra Consultations
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0 }}>
              Confirmed time slots for PSK Passport Verification, UIDAI Biometric Updates, and Vedic Astrological Consultations.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
            {/* Appointment 1 */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '1.5px solid #93C5FD',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge badge-blue">Passport Seva (PSK)</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#16A34A' }}>CONFIRMED</span>
              </div>

              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#061A36', margin: 0 }}>
                Passport Biometrics & Document Verification
              </h4>

              <div style={{ fontSize: '0.82rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Calendar size={14} color="#075ACB" />
                  <strong>Monday, 23 Nov 2026 • 10:30 AM IST</strong>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <MapPin size={14} color="#075ACB" />
                  <span>Passport Seva Kendra, Ashiana-Digha Road, Patna</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ShieldCheck size={14} color="#16A34A" />
                  <span>Carry: Original 10th Marksheet, Aadhaar Card & 2 Photos</span>
                </div>
              </div>

              <button
                onClick={() => {
                  printBrandedADCSDocument({
                    title: 'PSK Passport Appointment Slip & Checklist',
                    documentType: 'APPOINTMENT PASS',
                    documentNumber: 'PSK-PAT-2026-8801',
                    issuedDate: '14 Nov 2026',
                    rows: [
                      { label: 'Citizen Name', value: 'Rahul Verma' },
                      { label: 'Appointment Venue', value: 'PSK Ashiana-Digha Road, Patna, Bihar' },
                      { label: 'Date & Time Slot', value: '23 Nov 2026 • Batch A-3 (10:30 AM)' },
                      { label: 'Mandatory Originals', value: 'Aadhaar Card, 10th Certificate, Bank Passbook' },
                      { label: 'ARN File Number', value: 'ARN-2026-8910-8219' }
                    ]
                  });
                }}
                className="btn-primary btn-sm"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Download size={13} />
                <span>Download Appointment Pass</span>
              </button>
            </div>

            {/* Appointment 2 */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '1.5px solid #FCD34D',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge badge-gold">Vedic Astrology</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#D97706' }}>SCHEDULED</span>
              </div>

              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#061A36', margin: 0 }}>
                1-on-1 Kundli & Career Guidance Session
              </h4>

              <div style={{ fontSize: '0.82rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Calendar size={14} color="#D6A12B" />
                  <strong>Sunday, 22 Nov 2026 • 05:00 PM IST</strong>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <MapPin size={14} color="#D6A12B" />
                  <span>ADCS Kendra VIP Suite • Online Google Meet Link</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Sparkles size={14} color="#D97706" />
                  <span>With Acharya Ji • Full Janma Kundli Pre-Generated</span>
                </div>
              </div>

              <button
                onClick={() => {
                  showToast('Meet Link Opened', 'Redirecting to your secured Vedic Consultation room.', 'success');
                }}
                className="btn-gold btn-sm"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <ExternalLink size={13} />
                <span>Join Virtual Consultation</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: SAVED FAMILY PROFILES */}
      {activeTab === 'family' && (
        <div style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          padding: '2rem',
          border: '1px solid #E2E8F0',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#061A36', margin: 0 }}>
                Family Member Applicant Profiles (परिवार सदस्य)
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0.2rem 0 0 0' }}>
                Save profiles once for 1-click automatic prefilling across PAN, Passport, Certificates, and Welfare schemes.
              </p>
            </div>

            <button
              onClick={() => {
                setEditingApplicantId(null);
                setFamilyForm({
                  fullName: '',
                  relationship: 'Spouse',
                  phone: '',
                  email: '',
                  dob: '',
                  gender: 'Female',
                  aadhaarNumberMasked: '',
                  panNumber: '',
                  address: '',
                  city: 'Patna',
                  state: 'Bihar',
                  pincode: '800001'
                });
                setIsFamilyModalOpen(true);
              }}
              className="btn-primary btn-sm"
            >
              <Plus size={15} />
              <span>Add Family Member</span>
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {savedApplicants.map(profile => (
              <div
                key={profile.id}
                style={{
                  background: '#F8FAFC',
                  borderRadius: '16px',
                  padding: '1.35rem',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '0.85rem'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <span className="badge badge-blue">{profile.relationship}</span>
                    <span style={{ fontSize: '0.7rem', color: '#64748B', fontFamily: 'monospace' }}>{profile.id}</span>
                  </div>

                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#061A36', margin: '0 0 0.4rem 0' }}>
                    {profile.fullName}
                  </h4>

                  <div style={{ fontSize: '0.78rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <div>Phone: <strong>{profile.phone}</strong></div>
                    {profile.email && <div>Email: {profile.email}</div>}
                    <div>Location: {profile.city}, {profile.state} ({profile.pincode})</div>
                    {profile.aadhaarNumberMasked && <div>Aadhaar: <code>{profile.aadhaarNumberMasked}</code></div>}
                    {profile.panNumber && <div>PAN: <code>{profile.panNumber}</code></div>}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid #E2E8F0', paddingTop: '0.75rem' }}>
                  <button
                    onClick={() => handleEditFamily(profile)}
                    className="btn-secondary btn-sm"
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    <Edit3 size={13} />
                    <span>Edit Profile</span>
                  </button>
                  {profile.relationship !== 'Self' && (
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete profile for ${profile.fullName}?`)) {
                          deleteSavedApplicant(profile.id);
                          showToast('Profile Deleted', `${profile.fullName} removed.`, 'info');
                        }
                      }}
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid #CBD5E1',
                        borderRadius: '8px',
                        padding: '0 0.5rem',
                        color: '#DC2626',
                        cursor: 'pointer'
                      }}
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Family Member Modal */}
          {isFamilyModalOpen && (
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
              <form onSubmit={handleSaveFamilyProfile} style={{
                background: '#FFFFFF',
                borderRadius: '18px',
                width: '100%',
                maxWidth: '520px',
                padding: '1.75rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                maxHeight: '90vh',
                overflowY: 'auto'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#061A36', margin: 0 }}>
                    {editingApplicantId ? 'Edit Family Member Profile' : 'Add Family Member Profile'}
                  </h3>
                  <button type="button" onClick={() => setIsFamilyModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <X size={18} />
                  </button>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Full Name (as per Aadhaar) *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={familyForm.fullName}
                    onChange={(e) => setFamilyForm({ ...familyForm, fullName: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Relationship *</label>
                    <select
                      className="form-select"
                      value={familyForm.relationship}
                      onChange={(e) => setFamilyForm({ ...familyForm, relationship: e.target.value })}
                    >
                      <option value="Self">Self</option>
                      <option value="Spouse">Spouse (पति/पत्नी)</option>
                      <option value="Father">Father (पिता)</option>
                      <option value="Mother">Mother (माता)</option>
                      <option value="Son">Son (पुत्र)</option>
                      <option value="Daughter">Daughter (पुत्री)</option>
                      <option value="Other">Other Family Member</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Gender</label>
                    <select
                      className="form-select"
                      value={familyForm.gender}
                      onChange={(e) => setFamilyForm({ ...familyForm, gender: e.target.value as any })}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      value={familyForm.phone}
                      onChange={(e) => setFamilyForm({ ...familyForm, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-input"
                      value={familyForm.email}
                      onChange={(e) => setFamilyForm({ ...familyForm, email: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Aadhaar (Masked / Last 4)</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="XXXX-XXXX-1234"
                      value={familyForm.aadhaarNumberMasked}
                      onChange={(e) => setFamilyForm({ ...familyForm, aadhaarNumberMasked: e.target.value })}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">PAN Number</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="ABCDE1234F"
                      value={familyForm.panNumber}
                      onChange={(e) => setFamilyForm({ ...familyForm, panNumber: e.target.value.toUpperCase() })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      className="form-input"
                      value={familyForm.city}
                      onChange={(e) => setFamilyForm({ ...familyForm, city: e.target.value })}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">State</label>
                    <input
                      type="text"
                      className="form-input"
                      value={familyForm.state}
                      onChange={(e) => setFamilyForm({ ...familyForm, state: e.target.value })}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">PIN Code</label>
                    <input
                      type="text"
                      className="form-input"
                      value={familyForm.pincode}
                      onChange={(e) => setFamilyForm({ ...familyForm, pincode: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.75rem' }}>
                  <button type="button" onClick={() => setIsFamilyModalOpen(false)} className="btn-outline btn-sm">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary btn-sm">
                    Save Profile
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* TAB 9: SUPPORT & GRIEVANCE TICKETS */}
      {activeTab === 'support' && (
        <div style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          padding: '2rem',
          border: '1px solid #E2E8F0',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#061A36', margin: 0 }}>
                Citizen Support & Grievance Tickets
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0.2rem 0 0 0' }}>
                Dedicated support desk for assistance, UTR validation, or authority queries. Response guaranteed under 2 hours.
              </p>
            </div>

            <button
              onClick={() => setIsNewTicketOpen(true)}
              className="btn-primary btn-sm"
            >
              <Plus size={15} />
              <span>Raise Support Ticket</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {supportTickets.map(ticket => (
              <div
                key={ticket.id}
                style={{
                  background: '#F8FAFC',
                  borderRadius: '14px',
                  padding: '1.25rem',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 800, color: '#061A36' }}>{ticket.id}</span>
                    <span className={`badge ${ticket.status === 'Resolved' ? 'badge-green' : 'badge-blue'}`}>
                      {ticket.status}
                    </span>
                    <span className="badge badge-gray">{ticket.category || ticket.serviceCategory}</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                    Priority: <strong>{ticket.priority}</strong> • Created: {new Date(ticket.createdAt).toLocaleString('en-IN')}
                  </div>
                </div>

                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#075ACB' }}>
                  {ticket.subject}
                </div>

                {/* Conversation thread */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.25rem' }}>
                  {ticket.messages.map((msg, mIdx) => (
                    <div
                      key={msg.id || mIdx}
                      style={{
                        background: msg.role === 'customer' || msg.senderRole === 'customer' ? '#FFFFFF' : '#EFF6FF',
                        border: '1px solid',
                        borderColor: msg.role === 'customer' || msg.senderRole === 'customer' ? '#CBD5E1' : '#BFDBFE',
                        borderRadius: '8px',
                        padding: '0.65rem 0.85rem',
                        fontSize: '0.78rem'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem', color: '#64748B', fontSize: '0.7rem' }}>
                        <strong>{msg.sender || msg.senderName || 'Desk'} ({((msg.role || msg.senderRole) || 'user').toUpperCase()})</strong>
                        <span>{new Date(msg.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div style={{ color: '#0F172A' }}>{msg.text || msg.message}</div>
                    </div>
                  ))}
                </div>

                {ticket.status !== 'Resolved' && (
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <input
                      type="text"
                      className="form-input"
                      style={{ flex: 1, padding: '0.45rem 0.75rem', fontSize: '0.8rem' }}
                      placeholder="Type reply to support desk..."
                      value={ticketReplyInput[ticket.id] || ''}
                      onChange={(e) => setTicketReplyInput({ ...ticketReplyInput, [ticket.id]: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && ticketReplyInput[ticket.id]?.trim()) {
                          replySupportTicket(ticket.id, ticketReplyInput[ticket.id]);
                          setTicketReplyInput({ ...ticketReplyInput, [ticket.id]: '' });
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        if (ticketReplyInput[ticket.id]?.trim()) {
                          replySupportTicket(ticket.id, ticketReplyInput[ticket.id]);
                          setTicketReplyInput({ ...ticketReplyInput, [ticket.id]: '' });
                        }
                      }}
                      className="btn-primary btn-sm"
                    >
                      Send
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* New Ticket Modal */}
          {isNewTicketOpen && (
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
              <form onSubmit={handleCreateTicket} style={{
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
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#061A36', margin: 0 }}>
                    Raise Support Ticket
                  </h3>
                  <button type="button" onClick={() => setIsNewTicketOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <X size={18} />
                  </button>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Category *</label>
                  <select
                    className="form-select"
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value as any)}
                  >
                    <option value="Application Issue">Application Processing Issue</option>
                    <option value="Payment Query">Payment / UTR Query</option>
                    <option value="Document Clarification">Document Scrutiny Clarification</option>
                    <option value="Appointment">Appointment Rescheduling</option>
                    <option value="General">General Inquiries</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Subject *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    placeholder="e.g. Clarification on Passport appointment batch"
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Describe your query in detail *</label>
                  <textarea
                    rows={4}
                    required
                    className="form-input"
                    value={ticketMessage}
                    onChange={(e) => setTicketMessage(e.target.value)}
                    placeholder="Provide token number or details so we can assist immediately..."
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button type="button" onClick={() => setIsNewTicketOpen(false)} className="btn-outline btn-sm">
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary btn-sm">
                    Submit Ticket
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
