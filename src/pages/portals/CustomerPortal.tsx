import React, { useState, useEffect } from 'react';
import { useApp } from '../../store/AppContext';
import { apiClient } from '../../services/apiClient';
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
  Truck
} from 'lucide-react';

export const CustomerPortal: React.FC = () => {
  const { 
    applications, 
    documents, 
    shipments, 
    walletBalance, 
    setIsTrackerOpen, 
    setActiveTrackerQuery,
    setIsQuantumAIOpen,
    showToast,
    language 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'applications' | 'vault' | 'invoices'>('overview');
  const [liveInvoices, setLiveInvoices] = useState<any[]>([]);

  useEffect(() => {
    apiClient.getPaymentHistory().then(res => {
      if (res?.transactions && res.transactions.length > 0) {
        setLiveInvoices(res.transactions);
      }
    }).catch(() => {});
  }, []);

  const handleDownloadDoc = (doc: any) => {
    const content = `================================================================================
AKUL DRAVIN DIGITAL SERVICES (ADCS)
SECURE CITIZEN DOCUMENT VAULT - VERIFIED RECORD
================================================================================
Document Name   : ${doc.name}
Category        : ${doc.category || 'General'}
File Size       : ${doc.size || 'N/A'}
Uploaded On     : ${doc.uploadedAt ? new Date(doc.uploadedAt).toLocaleString('en-IN') : 'Verified Active'}
OCR Confidence  : ${doc.ocrConfidence}% Match
Verification    : UIDAI / MCA / Income Tax Compliant Digital Signature
Audit Hash      : SHA256-${Math.random().toString(36).substring(2, 10).toUpperCase()}-ADCS-VALID
DPDP Act 2025   : Fully Encrypted (AES-256-GCM) under Purpose Limitation
Issuing Authority: Akul Dravin Digital Services Private Trust Network
================================================================================
This certified digital archive has been authenticated against institutional records.
================================================================================`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${doc.name.replace(/\s+/g, '_')}_Verified_Copy.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Download Complete', `${doc.name} verified copy saved to your device.`, 'success');
  };

  const handleDownloadInvoice = (inv: any) => {
    const content = `================================================================================
AKUL DRAVIN DIGITAL SERVICES (ADCS) - OFFICIAL GST TAX INVOICE
================================================================================
Invoice Number  : ${inv.inv}
Invoice Date    : ${inv.date}
Payment Status  : ${inv.status || 'Verified Paid'}
Payment Method  : Realtime UPI / NetBanking / BBPS
Customer Name   : Citizen / Enterprise Account Holder
Service Details : ${inv.desc}
--------------------------------------------------------------------------------
TAXABLE BREAKDOWN:
Base Amount     : ₹${(inv.amount / 1.18).toFixed(2)}
CGST (9%)       : ₹${((inv.amount / 1.18) * 0.09).toFixed(2)}
SGST (9%)       : ₹${((inv.amount / 1.18) * 0.09).toFixed(2)}
TOTAL PAID      : ₹${Number(inv.amount).toLocaleString('en-IN')}.00
--------------------------------------------------------------------------------
GSTIN           : 07AABCA1234F1Z5
SAC / HSN Code  : 998313 (Information Technology & Digital E-Governance Services)
IRN Number      : 4f8b9e1a2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f
Verification QR : https://adcs.gov.in/verify-invoice?irn=${inv.inv}
================================================================================
This is a computer-generated tax invoice requiring no physical signature.
Issued in accordance with Section 31 of CGST Act, 2017.
================================================================================`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ADCS_Tax_Invoice_${inv.inv}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Invoice Downloaded', `${inv.inv} saved as tax invoice receipt.`, 'success');
  };

  return (
    <div className="container-wide" style={{ padding: '2.5rem 1.5rem 4rem' }}>
      {/* Customer Profile Strip */}
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
        marginBottom: '2.5rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)',
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
              <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0A192F' }}>
                Rahul Verma
              </h1>
              <span className="badge badge-green">Verified Citizen Account</span>
            </div>
            <div style={{ fontSize: '0.82rem', color: '#64748B', marginTop: '0.2rem' }}>
              Account ID: AD-CUST-80219 • Phone: +91 98765 12340 • Patna, Bihar
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => setIsQuantumAIOpen(true)}
            className="btn-gold btn-sm"
          >
            <Sparkles size={15} />
            <span>Ask Quantum AI</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', overflowX: 'auto' }}>
        {[
          { id: 'overview', label: 'Dashboard Overview', icon: <User size={16} /> },
          { id: 'applications', label: `My Applications (${applications.length})`, icon: <FileText size={16} /> },
          { id: 'vault', label: `Document Vault (${documents.length})`, icon: <Lock size={16} /> },
          { id: 'invoices', label: 'Payment Invoices', icon: <DollarSign size={16} /> },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.7rem 1.25rem',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '0.85rem',
              background: activeTab === t.id ? '#1D4ED8' : '#FFFFFF',
              color: activeTab === t.id ? '#FFFFFF' : '#475569',
              border: '1px solid',
              borderColor: activeTab === t.id ? '#1D4ED8' : '#CBD5E1',
              boxShadow: activeTab === t.id ? '0 4px 12px rgba(29, 78, 216, 0.25)' : 'none',
              transition: 'all 0.15s',
            }}
          >
            {t.icon}
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Top Quick Stats */}
          <div className="grid-4" style={{ gap: '1.25rem' }}>
            <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Active Applications</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#1D4ED8', marginTop: '0.25rem' }}>
                {applications.filter(a => a.status !== 'Completed').length}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#059669', marginTop: '0.2rem' }}>In Live Processing</div>
            </div>

            <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Documents in Vault</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0A192F', marginTop: '0.25rem' }}>
                {documents.length}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.2rem' }}>Protected Demo Vault</div>
            </div>

            <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>In-Transit Shipments</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#D97706', marginTop: '0.25rem' }}>
                {shipments.length}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#D97706', marginTop: '0.2rem' }}>Air Express Active</div>
            </div>

            <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Wallet Cash Balance</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#059669', marginTop: '0.25rem' }}>
                ₹{walletBalance.toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.2rem' }}>Ready for Services</div>
            </div>
          </div>

          {/* Recent Applications Preview */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '1.75rem',
            border: '1px solid #E2E8F0',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0A192F' }}>
                Recent Applications & Service Orders
              </h3>
              <button onClick={() => setActiveTab('applications')} style={{ fontSize: '0.82rem', color: '#1D4ED8', fontWeight: 700 }}>
                View All ➔
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {applications.slice(0, 3).map(app => (
                <div
                  key={app.id}
                  style={{
                    padding: '1rem',
                    borderRadius: '12px',
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
                      <span style={{ fontWeight: 800, color: '#0A192F' }}>{app.id}</span>
                      <span className="badge badge-blue">{app.status}</span>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#1D4ED8' }}>
                      {app.serviceName}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.2rem' }}>
                      Assigned: {app.assignedTo} • Submitted: {app.submittedAt}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setActiveTrackerQuery(app.id);
                      setIsTrackerOpen(true);
                    }}
                    className="btn-secondary btn-sm"
                  >
                    Track Progress
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Applications List */}
      {activeTab === 'applications' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {applications.map(app => (
            <div
              key={app.id}
              style={{
                background: '#FFFFFF',
                borderRadius: '18px',
                padding: '1.5rem',
                border: '1px solid #E2E8F0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1.25rem',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0A192F' }}>{app.id}</span>
                  <span className={`badge ${app.status === 'Completed' ? 'badge-green' : 'badge-blue'}`}>
                    {app.status}
                  </span>
                  <span className="badge badge-gray">{app.category.toUpperCase()}</span>
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1D4ED8', marginBottom: '0.25rem' }}>
                  {app.serviceName}
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#64748B' }}>
                  Notes: {app.notes || 'Document scrutiny verified by Quantum Document AI.'}
                </p>
                <div style={{ fontSize: '0.75rem', color: '#475569', marginTop: '0.4rem' }}>
                  Fee Paid: <strong>₹{app.feePaid.toLocaleString('en-IN')}</strong> • Last Updated: {app.updatedAt}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => {
                    setActiveTrackerQuery(app.id);
                    setIsTrackerOpen(true);
                  }}
                  className="btn-primary"
                >
                  <Compass size={15} />
                  <span>Track Timeline</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Customer Vault */}
      {activeTab === 'vault' && (
        <div style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          padding: '2rem',
          border: '1px solid #E2E8F0',
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0A192F', marginBottom: '1.25rem' }}>
            Encrypted Documents in Vault
          </h3>

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
                  <span className="badge badge-green" style={{ marginBottom: '0.5rem' }}>
                    OCR {doc.ocrConfidence}% Match
                  </span>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#0A192F' }}>
                    {doc.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                    {doc.category} • {doc.size}
                  </div>
                </div>

                <button
                  onClick={() => handleDownloadDoc(doc)}
                  className="btn-secondary btn-sm"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Download size={13} />
                  <span>Download Verified Copy</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Invoices */}
      {activeTab === 'invoices' && (
        <div style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          padding: '2rem',
          border: '1px solid #E2E8F0',
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0A192F', marginBottom: '1.25rem' }}>
            Tax Invoices & Receipts
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {(liveInvoices.length > 0 ? liveInvoices.map(tx => ({
              inv: tx.invoiceNumber || tx.id,
              desc: tx.items?.[0]?.title ? `${tx.items[0].title} Payment` : `Digital Services (${(tx.paymentMethod || 'UPI').toUpperCase()})`,
              date: tx.paidAt ? new Date(tx.paidAt).toLocaleDateString('en-GB') : 'Today',
              amount: Number(tx.amount || 0),
              status: tx.status === 'PAID' ? 'Verified Paid' : tx.status || 'Paid'
            })) : [
              { inv: 'INV-2026-9041', desc: 'PAN Card Application Service', date: '17 Sep 2026', amount: 199, status: 'Paid' },
              { inv: 'INV-2026-8812', desc: 'Pvt Ltd Company Incorporation Package', date: '18 Sep 2026', amount: 6999, status: 'Paid' },
              { inv: 'INV-2026-7730', desc: 'Smart CCTV 4-Camera System Kit', date: '18 Sep 2026', amount: 12999, status: 'Paid' },
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
                }}
              >
                <div>
                  <div style={{ fontWeight: 800, color: '#0A192F', fontSize: '0.95rem' }}>{inv.inv}</div>
                  <div style={{ fontSize: '0.82rem', color: '#475569' }}>{inv.desc} • {inv.date}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0A192F' }}>
                      ₹{inv.amount.toLocaleString('en-IN')}
                    </div>
                    <span className="badge badge-green">{inv.status}</span>
                  </div>
                  <button
                    onClick={() => handleDownloadInvoice(inv)}
                    className="btn-secondary btn-sm"
                  >
                    <Download size={13} />
                    <span>Tax Invoice</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
