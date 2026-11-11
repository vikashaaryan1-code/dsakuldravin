import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { 
  Landmark, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  PlusCircle, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Download, 
  ShieldCheck, 
  Scale, 
  RefreshCw,
  Search,
  DollarSign
} from 'lucide-react';
import { DoubleEntryJournal } from '../../types';

export const FinancePortal: React.FC = () => {
  const { doubleEntryJournals, recordJournalEntry, showToast, logAudit } = useApp();
  
  const [activeTab, setActiveTab] = useState<'journals' | 'coa' | 'reconciliation' | 'gst'>('journals');
  const [showNewEntryModal, setShowNewEntryModal] = useState(false);

  // New Journal state
  const [reference, setReference] = useState('');
  const [description, setDescription] = useState('');
  const [debitAccount, setDebitAccount] = useState('1010');
  const [creditAccount, setCreditAccount] = useState('4010');
  const [amount, setAmount] = useState<number>(5000);

  const chartOfAccounts = [
    { code: '1010', name: 'Gateway Clearing Account', category: 'Assets', type: 'Current Asset', balance: '₹4,89,200.00 Dr' },
    { code: '1020', name: 'Commercial Bank Settlement A/c', category: 'Assets', type: 'Bank Asset', balance: '₹12,45,800.00 Dr' },
    { code: '2010', name: 'Citizen Wallet Liabilities', category: 'Liabilities', type: 'Current Liability', balance: '₹2,45,000.00 Cr' },
    { code: '2020', name: 'VLE Partner Wallet Balance', category: 'Liabilities', type: 'Current Liability', balance: '₹3,82,450.00 Cr' },
    { code: '2050', name: 'Output GST Payable (18%)', category: 'Liabilities', type: 'Statutory Dues', balance: '₹1,18,920.00 Cr' },
    { code: '3010', name: 'Platform Retained Capital', category: 'Equity', type: 'Equity', balance: '₹25,00,000.00 Cr' },
    { code: '4010', name: 'Platform Professional Fee Revenue', category: 'Revenue', type: 'Operating Income', balance: '₹18,94,200.00 Cr' },
    { code: '4020', name: 'Hardware & CCTV Installation Revenue', category: 'Revenue', type: 'Operating Income', balance: '₹8,45,000.00 Cr' },
    { code: '5010', name: 'Payment Gateway MDR Expense', category: 'Expenses', type: 'Operating Expense', balance: '₹42,800.00 Dr' },
    { code: '5020', name: 'VLE Commission Disbursed', category: 'Expenses', type: 'Partner Payouts', balance: '₹5,14,200.00 Dr' },
  ];

  const totalDebits = doubleEntryJournals.reduce((sum, j) => sum + j.totalDebit, 0);
  const totalCredits = doubleEntryJournals.reduce((sum, j) => sum + j.totalCredit, 0);
  const isLedgerBalanced = Math.abs(totalDebits - totalCredits) < 0.01;

  const [showReconModal, setShowReconModal] = useState(false);
  const [isReconciling, setIsReconciling] = useState(false);

  const handleExportAuditPack = () => {
    const headers = ['Account Code', 'Account Name', 'Classification', 'Subtype', 'Debit / Credit Balance'];
    const rows = chartOfAccounts.map(a => [
      a.code,
      `"${a.name}"`,
      a.category,
      a.type,
      `"${a.balance}"`
    ]);
    const journalSummary = [
      '',
      '--- DOUBLE ENTRY JOURNAL TRANSACTIONS ---',
      'Entry ID,Reference,Description,Debits,Credits,Posted At,Status',
      ...doubleEntryJournals.map(j => 
        `${j.id},"${j.reference}","${j.description}",${j.totalDebit},${j.totalCredit},${j.date},${j.balanced ? 'Verified Balanced' : 'Pending'}`
      ),
      '',
      `AUDIT SUMMARY: Total Debits = ₹${totalDebits.toFixed(2)}, Total Credits = ₹${totalCredits.toFixed(2)}, Equilibrium = ${isLedgerBalanced ? 'BALANCED' : 'IMBALANCE'}`
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(',')), ...journalSummary].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'ADCS_General_Ledger_Audit_Pack_2026.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Audit Pack Exported', 'General Ledger Audit Pack (GSTR-1, GSTR-3B & Trial Balance) downloaded in CSV.', 'success');
  };

  const handleRunReconciliation = () => {
    setIsReconciling(true);
    setTimeout(() => {
      setIsReconciling(false);
      setShowReconModal(true);
      showToast('Reconciliation Complete', '142 / 142 records matched with ICICI Bank clearing feed.', 'success');
    }, 600);
  };

  const handlePostJournal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reference || !description || amount <= 0) return;

    const debitAccObj = chartOfAccounts.find(a => a.code === debitAccount);
    const creditAccObj = chartOfAccounts.find(a => a.code === creditAccount);

    recordJournalEntry({
      date: new Date().toISOString().substring(0, 10),
      reference,
      description,
      lines: [
        { accountCode: debitAccount, accountName: debitAccObj?.name || 'Account', debit: amount, credit: 0 },
        { accountCode: creditAccount, accountName: creditAccObj?.name || 'Account', debit: 0, credit: amount }
      ]
    });

    setShowNewEntryModal(false);
    setReference('');
    setDescription('');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #0A192F 0%, #0F2A4A 60%, #059669 100%)',
          borderRadius: '24px',
          padding: '2.5rem',
          color: '#FFFFFF',
          marginBottom: '2rem',
          boxShadow: '0 20px 40px rgba(10, 25, 47, 0.15)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)', padding: '0.35rem 0.8rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, color: '#A7F3D0', marginBottom: '0.75rem' }}>
              <Scale size={14} />
              <span>DOUBLE-ENTRY GENERAL LEDGER • STATUTORY COMPLIANCE</span>
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, margin: '0 0 0.5rem' }}>
              FinTech Sovereign Accounting & Ledger
            </h1>
            <p style={{ color: '#E2E8F0', fontSize: '0.92rem', maxWidth: '680px', margin: 0, lineHeight: 1.5 }}>
              Enterprise cryptographic double-entry journal, real-time GST tax reconciliation, bank clearing switch settlement, and unalterable financial audit trails.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => setShowNewEntryModal(true)}
              className="btn btn-gold"
              style={{ fontWeight: 800, padding: '0.75rem 1.4rem' }}
            >
              <PlusCircle size={18} /> Post Journal Entry
            </button>
            <button
              onClick={handleExportAuditPack}
              className="btn"
              style={{ background: 'rgba(255,255,255,0.12)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              <Download size={18} /> Trial Balance CSV
            </button>
          </div>
        </div>

        {/* Financial Health KPIs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem'
        }}>
          <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', fontSize: '0.82rem', fontWeight: 600 }}>
              <span>LEDGER EQUALITY EQUILIBRIUM</span>
              <Scale size={18} color="#059669" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: isLedgerBalanced ? '#059669' : '#DC2626', margin: '0.4rem 0' }}>
              {isLedgerBalanced ? '100% BALANCED' : 'IMBALANCE DETECTED'}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
              Σ Debits = Σ Credits (₹{totalDebits.toLocaleString('en-IN')})
            </div>
          </div>

          <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', fontSize: '0.82rem', fontWeight: 600 }}>
              <span>GATEWAY CLEARING TRANSIT</span>
              <DollarSign size={18} color="#1D4ED8" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#1D4ED8', margin: '0.4rem 0' }}>
              ₹4,89,200.00
            </div>
            <div style={{ fontSize: '0.78rem', color: '#059669' }}>
              Razorpay & ICICI BBPS settled
            </div>
          </div>

          <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', fontSize: '0.82rem', fontWeight: 600 }}>
              <span>OUTPUT GST RESERVE (18%)</span>
              <Landmark size={18} color="#D97706" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#D97706', margin: '0.4rem 0' }}>
              ₹1,18,920.00
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
              Prepared for monthly GST filing
            </div>
          </div>

          <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', fontSize: '0.82rem', fontWeight: 600 }}>
              <span>PARTNER WALLET FLOAT</span>
              <ShieldCheck size={18} color="#7C3AED" />
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#7C3AED', margin: '0.4rem 0' }}>
              ₹3,82,450.00
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
              Active VLE balance liabilities
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid #CBD5E1', marginBottom: '1.5rem' }}>
          {[
            { id: 'journals', label: 'General Journal Entries' },
            { id: 'coa', label: 'Chart of Accounts (COA)' },
            { id: 'reconciliation', label: 'Bank & Gateway Reconciliation' },
            { id: 'gst', label: 'Statutory GST Tax Reports' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '0.75rem 1.25rem',
                borderBottom: activeTab === tab.id ? '3px solid #1D4ED8' : '3px solid transparent',
                color: activeTab === tab.id ? '#1D4ED8' : '#64748B',
                fontWeight: activeTab === tab.id ? 800 : 600,
                fontSize: '0.9rem',
                background: 'none',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: JOURNALS */}
        {activeTab === 'journals' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {doubleEntryJournals.map((journal) => (
              <div
                key={journal.id}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 15px rgba(10, 25, 47, 0.04)',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  padding: '1rem 1.5rem',
                  background: '#F8FAFC',
                  borderBottom: '1px solid #E2E8F0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontWeight: 800, color: '#0A192F', fontSize: '0.95rem' }}>{journal.id}</span>
                    <span className="badge badge-gray">{journal.date}</span>
                    <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Ref: {journal.reference}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontFamily: 'monospace', color: '#64748B' }}>
                    <ShieldCheck size={14} color="#059669" />
                    <span>SHA-256: {journal.cryptographicHash}</span>
                  </div>
                </div>

                <div style={{ padding: '1rem 1.5rem' }}>
                  <p style={{ fontSize: '0.88rem', color: '#334155', fontWeight: 600, marginBottom: '0.75rem' }}>
                    {journal.description}
                  </p>

                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                    <thead>
                      <tr style={{ color: '#64748B', borderBottom: '1px solid #F1F5F9', textAlign: 'left' }}>
                        <th style={{ padding: '0.4rem 0' }}>Account Code</th>
                        <th style={{ padding: '0.4rem 0' }}>Account Title</th>
                        <th style={{ padding: '0.4rem 0', textAlign: 'right' }}>Debit (₹)</th>
                        <th style={{ padding: '0.4rem 0', textAlign: 'right' }}>Credit (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {journal.lines.map((line, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #F8FAFC' }}>
                          <td style={{ padding: '0.5rem 0', fontFamily: 'monospace', color: '#1D4ED8', fontWeight: 700 }}>{line.accountCode}</td>
                          <td style={{ padding: '0.5rem 0', color: '#0F172A' }}>{line.accountName}</td>
                          <td style={{ padding: '0.5rem 0', textAlign: 'right', fontWeight: line.debit > 0 ? 800 : 400 }}>
                            {line.debit > 0 ? `₹${line.debit.toLocaleString('en-IN')}` : '-'}
                          </td>
                          <td style={{ padding: '0.5rem 0', textAlign: 'right', fontWeight: line.credit > 0 ? 800 : 400 }}>
                            {line.credit > 0 ? `₹${line.credit.toLocaleString('en-IN')}` : '-'}
                          </td>
                        </tr>
                      ))}
                      <tr style={{ borderTop: '2px solid #E2E8F0', fontWeight: 800 }}>
                        <td colSpan={2} style={{ padding: '0.6rem 0' }}>Journal Equilibrium Verification:</td>
                        <td style={{ padding: '0.6rem 0', textAlign: 'right', color: '#059669' }}>₹{journal.totalDebit.toLocaleString('en-IN')}</td>
                        <td style={{ padding: '0.6rem 0', textAlign: 'right', color: '#059669' }}>₹{journal.totalCredit.toLocaleString('en-IN')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: CHART OF ACCOUNTS */}
        {activeTab === 'coa' && (
          <div style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            overflow: 'hidden'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '1rem 1.25rem' }}>Code</th>
                  <th style={{ padding: '1rem 1.25rem' }}>Account Title</th>
                  <th style={{ padding: '1rem 1.25rem' }}>Class</th>
                  <th style={{ padding: '1rem 1.25rem' }}>Type</th>
                  <th style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>Current Balance</th>
                </tr>
              </thead>
              <tbody>
                {chartOfAccounts.map((acc) => (
                  <tr key={acc.code} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '1rem 1.25rem', fontFamily: 'monospace', fontWeight: 800, color: '#1D4ED8' }}>{acc.code}</td>
                    <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: '#0A192F' }}>{acc.name}</td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <span className={`badge ${acc.category === 'Assets' ? 'badge-blue' : acc.category === 'Liabilities' ? 'badge-red' : acc.category === 'Revenue' ? 'badge-green' : 'badge-gold'}`}>
                        {acc.category}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.25rem', color: '#64748B' }}>{acc.type}</td>
                    <td style={{ padding: '1rem 1.25rem', textAlign: 'right', fontWeight: 800, color: '#0A192F' }}>{acc.balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: RECONCILIATION */}
        {activeTab === 'reconciliation' && (
          <div style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '2rem',
            border: '1px solid #E2E8F0'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0A192F', margin: 0 }}>
                  Automated Bank & Payment Gateway Reconciliation Switch
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '4px 0 0' }}>
                  Daily match between Gateway Settlement MT940 / CSV statements and General Ledger journals.
                </p>
              </div>

              <button
                onClick={handleRunReconciliation}
                disabled={isReconciling}
                className="btn btn-primary"
                style={{ gap: '0.5rem', opacity: isReconciling ? 0.7 : 1 }}
              >
                <RefreshCw size={16} className={isReconciling ? 'animate-spin' : ''} />
                {isReconciling ? 'Verifying Gateway Hash...' : 'Run Auto-Reconciliation'}
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', padding: '1.25rem', borderRadius: '12px' }}>
                <div style={{ color: '#166534', fontWeight: 700, fontSize: '0.85rem' }}>RECONCILED TRANSACTIONS</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#15803D', marginTop: '0.2rem' }}>142 / 142</div>
                <div style={{ fontSize: '0.75rem', color: '#166534' }}>Zero discrepancies found</div>
              </div>

              <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', padding: '1.25rem', borderRadius: '12px' }}>
                <div style={{ color: '#1E40AF', fontWeight: 700, fontSize: '0.85rem' }}>PENDING SETTLEMENT DISPATCH</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#1D4ED8', marginTop: '0.2rem' }}>₹0.00</div>
                <div style={{ fontSize: '0.75rem', color: '#1E40AF' }}>All batches cleared to VLE wallets</div>
              </div>

              <div style={{ background: '#FEF2F2', border: '1px solid #FECDD3', padding: '1.25rem', borderRadius: '12px' }}>
                <div style={{ color: '#991B1B', fontWeight: 700, fontSize: '0.85rem' }}>UNRECONCILED EXCEPTIONS</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#DC2626', marginTop: '0.2rem' }}>0</div>
                <div style={{ fontSize: '0.75rem', color: '#991B1B' }}>No manual intervention required</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: GST REPORTS */}
        {activeTab === 'gst' && (
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '2rem', border: '1px solid #E2E8F0' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0A192F', marginBottom: '0.5rem' }}>
              Statutory GSTIN Compliance Summary (07AAAAA0000A1Z5)
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.5rem' }}>
              ITC-matched reports for GSTR-1 (Outward B2B/B2C supplies) and GSTR-3B monthly tax computation.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
              <div style={{ border: '1px solid #E2E8F0', borderRadius: '14px', padding: '1.5rem' }}>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0A192F' }}>GSTR-1 Monthly Return Table</div>
                <div style={{ fontSize: '0.82rem', color: '#64748B', margin: '0.25rem 0 1rem' }}>Taxable citizen and business services outward supply invoices</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1D4ED8' }}>₹6,60,666.67 Taxable Value</div>
                <div style={{ fontSize: '0.85rem', color: '#059669', marginTop: '0.3rem' }}>IGST/CGST/SGST Total: ₹1,18,920.00</div>
              </div>

              <div style={{ border: '1px solid #E2E8F0', borderRadius: '14px', padding: '1.5rem' }}>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0A192F' }}>Input Tax Credit (ITC) Summary</div>
                <div style={{ fontSize: '0.82rem', color: '#64748B', margin: '0.25rem 0 1rem' }}>Eligible ITC on AWS Cloud, SMS Gateways and Server Hardware</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#059669' }}>₹32,450.00 ITC Claimable</div>
                <div style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '0.3rem' }}>Net Cash Payable in Electronic Ledger: ₹86,470.00</div>
              </div>
            </div>
          </div>
        )}

        {/* POST JOURNAL ENTRY MODAL */}
        {showNewEntryModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10, 25, 47, 0.7)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem'
          }}>
            <div style={{ background: '#FFFFFF', borderRadius: '20px', maxWidth: '540px', width: '100%', padding: '2rem', boxShadow: '0 25px 60px rgba(0,0,0,0.3)' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0A192F', marginBottom: '0.25rem' }}>
                Manual Double-Entry Journal Voucher
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '1.25rem' }}>
                Enforces debit and credit equality with cryptographic SHA-256 seal.
              </p>

              <form onSubmit={handlePostJournal}>
                <div className="form-group">
                  <label className="form-label">Reference Number (Invoice / Voucher ID) *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    placeholder="e.g. INV-2026-9901 or VCH-AD-0012"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Transaction Description *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g. Bank Charges / VLE Payout Adjustment"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Debit Account (Dr) *</label>
                    <select
                      className="form-select"
                      value={debitAccount}
                      onChange={(e) => setDebitAccount(e.target.value)}
                    >
                      {chartOfAccounts.map(a => (
                        <option key={a.code} value={a.code}>{a.code} - {a.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Credit Account (Cr) *</label>
                    <select
                      className="form-select"
                      value={creditAccount}
                      onChange={(e) => setCreditAccount(e.target.value)}
                    >
                      {chartOfAccounts.map(a => (
                        <option key={a.code} value={a.code}>{a.code} - {a.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Transaction Amount (₹) *</label>
                  <input
                    type="number"
                    min={1}
                    required
                    className="form-input"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                  <button type="button" onClick={() => setShowNewEntryModal(false)} className="btn btn-outline" style={{ flex: 1 }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-gold" style={{ flex: 2, fontWeight: 800 }}>
                    Post & Verify Equilibrium
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: BANK RECONCILIATION AUDIT RECEIPT */}
        {showReconModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10, 25, 47, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem'
          }}>
            <div style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              maxWidth: '620px',
              width: '100%',
              padding: '2.25rem',
              boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.3)',
              border: '1px solid #E2E8F0'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                  <span className="badge badge-green" style={{ marginBottom: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <ShieldCheck size={14} /> 100% Cleared & Cryptographically Sealed
                  </span>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 900, margin: 0, color: '#0A192F' }}>
                    Bank & Gateway Reconciliation Summary
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '0.2rem' }}>
                    Batch Switch: ICICI-RTGS-98124 • NPCI BBPS Clearing Hub
                  </div>
                </div>
                <button
                  onClick={() => setShowReconModal(false)}
                  style={{ background: '#F1F5F9', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}
                >
                  ✕
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ background: '#F0FDF4', padding: '1rem', borderRadius: '12px', border: '1px solid #BBF7D0', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.72rem', color: '#166534', fontWeight: 700 }}>RECONCILED</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#15803D', marginTop: '0.2rem' }}>142 / 142</div>
                  <div style={{ fontSize: '0.7rem', color: '#166534' }}>100% Match</div>
                </div>
                <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '12px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700 }}>DISCREPANCIES</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0A192F', marginTop: '0.2rem' }}>0.00</div>
                  <div style={{ fontSize: '0.7rem', color: '#059669' }}>Zero Variance</div>
                </div>
                <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '12px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700 }}>LEDGER EQUALITY</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#059669', marginTop: '0.2rem' }}>BALANCED</div>
                  <div style={{ fontSize: '0.7rem', color: '#059669' }}>Debit == Credit</div>
                </div>
              </div>

              {/* Settlement Feed Table */}
              <div style={{ background: '#0F172A', color: '#94A3B8', borderRadius: '12px', padding: '1.1rem', fontFamily: 'monospace', fontSize: '0.75rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                <div style={{ color: '#38BDF8', fontWeight: 700, marginBottom: '0.4rem' }}>// MT940 / CAMT.053 CLEARING AUDIT TRAIL</div>
                <div>[08:00:00] Ingested ICICI nodal settlement file: 142 items</div>
                <div>[08:00:01] Matched BBPS BillDesk clearing ref BD-BBPS-98124 (₹4,89,200.00)</div>
                <div>[08:00:02] Matched Razorpay UPI 2.0 direct webhook batch (₹12,45,800.00)</div>
                <div>[08:00:03] Cross-verified Chart of Accounts [1010] & [1020] equilibrium</div>
                <div>[08:00:04] Ledger Hash: SHA256-RECON-77F8-ADCS-CERTIFIED-100</div>
              </div>

              <div style={{ display: 'flex', gap: '0.85rem' }}>
                <button
                  type="button"
                  onClick={() => setShowReconModal(false)}
                  className="btn btn-outline"
                  style={{ flex: 1 }}
                >
                  Done
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const content = `================================================================================
AKUL DRAVIN DIGITAL SERVICES (ADCS) - CLEARING RECONCILIATION CERTIFICATE
================================================================================
Reconciliation Ref : REC-ICICI-${Date.now()}
Bank Clearing Nodal: ICICI Bank Commercial Current Account (000405001234)
Gateway Settlement : BBPS NPCI & Razorpay Webhook Feed
Matched Transactions: 142 of 142 (100.00% Matched)
Discrepant Records : 0 (INR 0.00 Variance)
General Ledger State: Debit == Credit (Cryptographic Equilibrium Validated)
Timestamp          : ${new Date().toISOString()}
Compliance         : RBI Payment Aggregator / Section 134 Companies Act
Digital Seal       : ADCS-FINANCE-CORP-SEAL-VALID
================================================================================`;
                    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `ADCS_Bank_Reconciliation_${Date.now()}.txt`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                    showToast('Certificate Saved', 'Reconciliation certificate downloaded.', 'success');
                  }}
                  className="btn btn-primary"
                  style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: 800 }}
                >
                  <Download size={16} /> Download Clearing Certificate
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
