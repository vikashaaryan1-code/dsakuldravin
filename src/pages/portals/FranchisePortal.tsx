import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { printBrandedADCSDocument } from '../../utils/documentBranding';
import { 
  Building, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Award, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Download,
  Sparkles,
  BarChart3,
  FileCheck2
} from 'lucide-react';

export const FranchisePortal: React.FC = () => {
  const { applications, inventory, employees, recordJournalEntry, logAudit, showToast } = useApp();
  const [ledgerSynced, setLedgerSynced] = useState(false);

  const liveOrderFees = applications.reduce((sum, app) => sum + (app.feePaid || 0), 0);
  const liveCommissionAdd = Math.round(liveOrderFees * 0.25);
  const netCommission = 148250 + liveCommissionAdd;
  const totalOrders = 384 + applications.length;
  const targetAmount = 200000;
  const achievementPct = Math.min(100, Number(((netCommission / targetAmount) * 100).toFixed(1)));

  const handleDownloadStatement = () => {
    printBrandedADCSDocument({
      title: 'Franchise Commission Settlement Statement — Weekly Clearing Summary',
      documentType: 'FRANCHISE STATEMENT',
      documentNumber: 'FRN-PATNA-CENTRAL-004',
      issuedDate: new Date().toLocaleDateString('en-IN'),
      rows: [
        { label: 'Franchise Branch Name', value: 'Patna Central Franchise Branch #04' },
        { label: 'Settlement Cycle', value: 'Weekly Bank Direct Credit (NEFT / RTGS)' },
        { label: 'Nodal Bank Account', value: 'State Bank of India (A/C: *******8821)' },
        { label: 'Live Portal Orders Included', value: `${applications.length} orders (₹${liveOrderFees.toLocaleString('en-IN')} GTV)` },
        { label: 'Batch SETTL-W38 (08-14 Sep)', value: '94 Tx • Gross ₹48,500 • Commission ₹36,200 (Settled)' },
        { label: 'Batch SETTL-W37 (01-07 Sep)', value: '88 Tx • Gross ₹42,100 • Commission ₹32,400 (Settled)' },
        { label: 'Batch SETTL-W36 (25-31 Aug)', value: '102 Tx • Gross ₹56,000 • Commission ₹41,800 (Settled)' },
      ],
      amountSummary: {
        subtotal: 110400,
        tax: -5520,
        total: 104880,
        currency: '₹',
        paymentStatus: 'NET DISBURSED AFTER SEC 194H TDS (5%)',
      },
      notes: ['Digitally verified by ADCS Automated Clearing Switch. Hash: SHA256-FRN004-SETTL-OK'],
    });
    showToast('Statement Ready', 'Commission settlement statement opened for print/PDF.', 'success');
  };

  const handleSyncBranchCommissionLedger = () => {
    const tds = Math.round(netCommission * 0.05);
    const netPayable = netCommission - tds;
    recordJournalEntry({
      date: new Date().toISOString().split('T')[0],
      reference: 'FRN-004-SETTL',
      description: 'Branch #04 Monthly Franchise Commission Accrual & TDS 194H Deduction',
      lines: [
        { accountCode: '5030', accountName: 'Franchise Commission Expense', debit: netCommission, credit: 0 },
        { accountCode: '2040', accountName: 'TDS Payable (Sec 194H - 5%)', debit: 0, credit: tds },
        { accountCode: '2035', accountName: 'Franchise Settlement Payable (Bank)', debit: 0, credit: netPayable },
      ],
    });
    logAudit('FRANCHISE_LEDGER_SYNC', `Branch #04 net commission ₹${netPayable} reconciled (TDS ₹${tds})`, 'Success');
    setLedgerSynced(true);
    showToast('Ledger Synchronized', `Balanced settlement (₹${netPayable.toLocaleString('en-IN')} net after 5% TDS) posted.`, 'success');
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
          <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>FRANCHISE MANAGEMENT CONSOLE</span>
          <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 900, marginBottom: '0.4rem', color: '#FFFFFF' }}>
            Patna Central Franchise Branch #04
          </h1>
          <p style={{ fontSize: '0.92rem', color: '#CBD5E1' }}>
            Territory: Bailey Road & Saguna More • PIN 800001 • Master Gold Franchise
          </p>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '1.25rem 1.75rem',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          textAlign: 'right',
        }}>
          <div style={{ fontSize: '0.78rem', color: '#93C5FD' }}>THIS MONTH NET COMMISSION</div>
          <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#F59E0B' }}>
            ₹{netCommission.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#10B981' }}>+18.4% growth vs last month</div>
        </div>
      </div>

      {/* Branch Metrics */}
      <div className="grid-4" style={{ gap: '1.25rem', marginBottom: '2.5rem' }}>
        <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Active Customers Served</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#061A36', marginTop: '0.2rem' }}>{1240 + applications.length}</div>
          <div style={{ fontSize: '0.72rem', color: '#059669', marginTop: '0.2rem' }}>96.2% Repeat Rate</div>
        </div>

        <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Total Service Orders</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#075ACB', marginTop: '0.2rem' }}>{totalOrders}</div>
          <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '0.2rem' }}>{applications.length} Live Queue Items</div>
        </div>

        <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Branch Staff Deployed</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#061A36', marginTop: '0.2rem' }}>
            {employees.length} Members
          </div>
          <div style={{ fontSize: '0.72rem', color: '#059669', marginTop: '0.2rem' }}>All Biometrically Present</div>
        </div>

        <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Stationery Consumables</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#D97706', marginTop: '0.2rem' }}>
            {inventory.length} SKUs
          </div>
          <div style={{ fontSize: '0.72rem', color: '#059669', marginTop: '0.2rem' }}>Above Reorder Threshold</div>
        </div>
      </div>

      {/* Target vs Achievement Strip */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        padding: '2rem',
        border: '1px solid #E2E8F0',
        marginBottom: '2.5rem',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#061A36' }}>
              Monthly Branch Target vs Achievement
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748B' }}>Target: ₹2,00,000 Net Commission for Q3 Incentive Bonus</p>
          </div>
          <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#075ACB' }}>{achievementPct}% Achieved</span>
        </div>

        {/* Progress Bar */}
        <div style={{ height: '12px', background: '#F1F5F9', borderRadius: '6px', overflow: 'hidden' }}>
          <div style={{ width: `${achievementPct}%`, height: '100%', background: 'linear-gradient(90deg, #075ACB 0%, #F59E0B 100%)' }} />
        </div>
      </div>

      {/* Live Branch Applications Feed */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        padding: '2rem',
        border: '1px solid #E2E8F0',
        marginBottom: '2.5rem',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#061A36', margin: 0 }}>
            Live Branch Customer Queue ({applications.length} Applications)
          </h3>
          <button
            type="button"
            onClick={handleSyncBranchCommissionLedger}
            disabled={ledgerSynced}
            className="btn-primary btn-sm"
            style={{ gap: '0.35rem', opacity: ledgerSynced ? 0.7 : 1 }}
          >
            <FileCheck2 size={14} />
            <span>{ledgerSynced ? 'Settlement Posted to Ledger' : 'Sync Monthly Settlement to Ledger'}</span>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {applications.slice(0, 5).map(app => (
            <div
              key={app.id}
              style={{
                padding: '0.85rem 1rem',
                borderRadius: '10px',
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.75rem',
              }}
            >
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#061A36' }}>
                  {app.id} • {app.serviceName}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                  Applicant: {app.applicantName} • {app.submittedAt}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontWeight: 800, color: '#075ACB', fontSize: '0.88rem' }}>
                  ₹{(app.feePaid || 0).toLocaleString('en-IN')}
                </span>
                <span className="badge badge-blue">{app.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Commission Settlement Statement */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        padding: '2rem',
        border: '1px solid #E2E8F0',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#061A36' }}>
            Recent Weekly Commission Settlement Dispatches
          </h3>
          <button
            onClick={handleDownloadStatement}
            className="btn-secondary btn-sm"
          >
            <Download size={14} />
            <span>Download Statement</span>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[
            { id: 'SETTL-W38', period: '08 Sep - 14 Sep 2026', txCount: 94, gross: 48500, comm: 36200, status: 'Settled to Bank' },
            { id: 'SETTL-W37', period: '01 Sep - 07 Sep 2026', txCount: 88, gross: 42100, comm: 32400, status: 'Settled to Bank' },
            { id: 'SETTL-W36', period: '25 Aug - 31 Aug 2026', txCount: 102, gross: 56000, comm: 41800, status: 'Settled to Bank' },
          ].map(s => (
            <div
              key={s.id}
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
                <div style={{ fontWeight: 800, color: '#061A36' }}>{s.id} • {s.period}</div>
                <div style={{ fontSize: '0.78rem', color: '#64748B' }}>{s.txCount} Service Transactions Completed</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#059669' }}>
                  ₹{s.comm.toLocaleString('en-IN')}
                </div>
                <span className="badge badge-green">{s.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
