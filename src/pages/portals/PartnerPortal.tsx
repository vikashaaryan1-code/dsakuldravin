import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { printBrandedADCSDocument } from '../../utils/documentBranding';
import { 
  Briefcase, 
  DollarSign, 
  Star, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Calendar, 
  ArrowRight,
  ShieldCheck,
  Download
} from 'lucide-react';

export const PartnerPortal: React.FC = () => {
  const { recordJournalEntry, showToast, logAudit } = useApp();

  const [walletBalance, setWalletBalance] = useState(14200);
  const [lastSlip, setLastSlip] = useState<{
    ref: string;
    type: string;
    detail: string;
    amount: number;
    timestamp: string;
  } | null>(null);

  const [partnerLeads, setPartnerLeads] = useState([
    { id: 'JOB-901', service: 'CCTV 4-Camera Installation & Cabling', customer: 'Amitabh Verma (Store Owner)', location: 'Ranchi, Jharkhand', payout: 2200, status: 'New Lead' },
    { id: 'JOB-902', service: 'Residential Turnkey 3D Architectural Blueprint', customer: 'Sunil Mathur', location: 'Bihta, Patna', payout: 8500, status: 'New Lead' },
    { id: 'JOB-903', service: 'CA Private Limited Filing & Share Capital Audit', customer: 'Deepak Agrawal', location: 'Patna Central', payout: 3500, status: 'In Progress' },
  ]);

  const handleAcceptJob = (jobId: string) => {
    setPartnerLeads(prev => prev.map(j => j.id === jobId ? { ...j, status: 'Accepted & Dispatched' } : j));
    showToast('Job Accepted', `Work order ${jobId} allocated to you. Customer contact unlocked.`, 'success');
    logAudit(`Partner Accepted Job: ${jobId}`, `Partner Desk`);
  };

  const handleCompleteHandover = (jobId: string) => {
    const job = partnerLeads.find(j => j.id === jobId);
    if (!job || job.status === 'Completed') return;

    setPartnerLeads(prev => prev.map(j => j.id === jobId ? { ...j, status: 'Completed' } : j));
    setWalletBalance(prev => prev + job.payout);

    recordJournalEntry({
      date: new Date().toISOString().split('T')[0],
      reference: jobId,
      description: `Partner Work Order Handover: ${job.service} (${job.customer})`,
      lines: [
        { accountCode: '5020', accountName: 'Partner Service Payout Expense', debit: job.payout, credit: 0 },
        { accountCode: '2030', accountName: 'Partner Wallet Payout Payable', debit: 0, credit: job.payout },
      ],
    });

    setLastSlip({
      ref: `HND-${jobId}`,
      type: 'Work Order Completion Credit',
      detail: `${job.service} — ${job.customer}`,
      amount: job.payout,
      timestamp: new Date().toLocaleString('en-IN'),
    });
    logAudit(`Partner Completed Handover: ${jobId}`, `Credited ₹${job.payout} to Wallet`);
    showToast('Handover Complete', `₹${job.payout.toLocaleString('en-IN')} credited to your partner wallet.`, 'success');
  };

  const handleWithdrawToBank = () => {
    if (walletBalance <= 0) {
      showToast('Zero Balance', 'Complete an assigned work order before requesting bank payout.', 'warning');
      return;
    }
    const amt = walletBalance;
    const ref = `PTR-NEFT-${Date.now().toString().slice(-6)}`;
    recordJournalEntry({
      date: new Date().toISOString().split('T')[0],
      reference: ref,
      description: 'Partner Wallet NEFT Withdrawal to Linked Bank Account',
      lines: [
        { accountCode: '2030', accountName: 'Partner Wallet Payout Payable', debit: amt, credit: 0 },
        { accountCode: '1010', accountName: 'Operating Bank Account', debit: 0, credit: amt },
      ],
    });
    setWalletBalance(0);
    setLastSlip({
      ref,
      type: 'NEFT Bank Withdrawal Advice',
      detail: 'Direct Settlement to Linked Partner Bank Account',
      amount: amt,
      timestamp: new Date().toLocaleString('en-IN'),
    });
    logAudit(`Partner Bank Payout Initiated (${ref})`, `Disbursed ₹${amt}`);
    showToast('Payout Initiated', `₹${amt.toLocaleString('en-IN')} transferred to your linked bank account.`, 'success');
  };

  const handleDownloadSlip = (slip: NonNullable<typeof lastSlip>) => {
    printBrandedADCSDocument({
      title: 'ADCS Field Partner Settlement & Work-Order Advice',
      documentType: 'PARTNER SETTLEMENT SLIP',
      documentNumber: slip.ref,
      issuedDate: slip.timestamp,
      rows: [
        { label: 'Advice Category', value: slip.type },
        { label: 'Registered Partner', value: 'Santosh Kumar (AD-PTR-5520)' },
        { label: 'Work Order / Particulars', value: slip.detail },
        { label: 'Ledger Sync', value: 'Balanced Double-Entry Recorded' },
      ],
      amountSummary: {
        total: slip.amount,
        currency: '₹',
        paymentStatus: 'CREDITED / ADVICE ISSUED',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
            <span className="badge badge-gold">VERIFIED SERVICE PARTNER</span>
            <span className="badge badge-green">KYC Cleared</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 900, marginBottom: '0.3rem', color: '#FFFFFF' }}>
            Santosh Kumar (Certified CCTV & Telecom Engineer)
          </h1>
          <p style={{ fontSize: '0.92rem', color: '#CBD5E1' }}>
            Partner ID: AD-PTR-5520 • Field Coverage: Patna & Ranchi Metro
          </p>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '1rem 1.5rem',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          textAlign: 'right',
        }}>
          <div style={{ fontSize: '0.78rem', color: '#93C5FD' }}>WALLET PAYOUT BALANCE</div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#F59E0B' }}>
            ₹{walletBalance.toLocaleString('en-IN')}
          </div>
          <button
            onClick={handleWithdrawToBank}
            className="btn-gold btn-sm"
            style={{ marginTop: '0.4rem' }}
          >
            Withdraw to Bank
          </button>
        </div>
      </div>

      {lastSlip && (
        <div style={{
          background: '#ECFDF5',
          border: '1.5px solid #10B981',
          borderRadius: '16px',
          padding: '1.1rem 1.5rem',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div>
            <div style={{ fontWeight: 800, color: '#065F46', fontSize: '0.95rem' }}>
              {lastSlip.type} • {lastSlip.ref}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#047857' }}>
              {lastSlip.detail} • Amount: ₹{lastSlip.amount.toLocaleString('en-IN')} (Ledger Synced)
            </div>
          </div>
          <button
            onClick={() => handleDownloadSlip(lastSlip)}
            className="btn-primary btn-sm"
            style={{ gap: '0.35rem' }}
          >
            <Download size={14} />
            <span>Print / PDF Settlement Advice</span>
          </button>
        </div>
      )}

      {/* Leads Table */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        padding: '2rem',
        border: '1px solid #E2E8F0',
      }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#061A36', marginBottom: '1.25rem' }}>
          Assigned Service Work Orders & Leads
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {partnerLeads.map(job => (
            <div
              key={job.id}
              style={{
                padding: '1.25rem',
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
                  <span style={{ fontWeight: 800, color: '#061A36' }}>{job.id}</span>
                  <span className="badge badge-blue">{job.status}</span>
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#075ACB' }}>
                  {job.service}
                </h4>
                <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '0.2rem' }}>
                  Client: {job.customer} • Location: {job.location}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Partner Fee Payout</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#059669' }}>
                    ₹{job.payout.toLocaleString('en-IN')}
                  </div>
                </div>

                {job.status === 'New Lead' ? (
                  <button
                    onClick={() => handleAcceptJob(job.id)}
                    className="btn-gold"
                    style={{ fontWeight: 800 }}
                  >
                    Accept Work Order
                  </button>
                ) : job.status === 'Completed' ? (
                  <span className="badge badge-green" style={{ padding: '0.45rem 0.9rem' }}>
                    ✓ Payout Credited
                  </span>
                ) : (
                  <button
                    onClick={() => handleCompleteHandover(job.id)}
                    className="btn-primary btn-sm"
                  >
                    Mark Handover Complete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
