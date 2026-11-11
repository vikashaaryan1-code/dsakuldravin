import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
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
  BarChart3
} from 'lucide-react';

export const FranchisePortal: React.FC = () => {
  const { applications, inventory, employees, showToast, language } = useApp();

  const handleDownloadStatement = () => {
    const content = `================================================================================
AKUL DRAVIN DIGITAL SERVICES (ADCS)
FRANCHISE COMMISSION SETTLEMENT STATEMENT - WEEKLY CLEARING SUMMARY
================================================================================
Franchise Name  : Regional CSC & Digital Seva Enterprise Hub
Franchise ID    : FRN-DELHI-NORTH-048
Settlement Cycle: Weekly Bank Direct Credit (NEFT/RTGS)
Nodal Bank      : State Bank of India (A/C: *******8821)
--------------------------------------------------------------------------------
BATCH DISPATCHES:
Settlement ID | Period              | Tx Count | Gross GTV   | Commission | Status
--------------------------------------------------------------------------------
SETTL-W38     | 08 Sep - 14 Sep 2026| 94       | ₹48,500.00  | ₹36,200.00 | Settled to Bank
SETTL-W37     | 01 Sep - 07 Sep 2026| 88       | ₹42,100.00  | ₹32,400.00 | Settled to Bank
SETTL-W36     | 25 Aug - 31 Aug 2026| 102      | ₹56,000.00  | ₹41,800.00 | Settled to Bank
--------------------------------------------------------------------------------
TOTAL SETTLED (PAST 3 WEEKS): ₹1,10,400.00
TDS DEDUCTION (Sec 194H 5%)  : ₹5,520.00
NET DISBURSED TO BANK       : ₹1,04,880.00
================================================================================
Digitally Verified by: ADCS Automated Clearing Switch
Authentication Hash  : SHA256-${Math.random().toString(36).substring(2, 10).toUpperCase()}-SETTL-OK
================================================================================`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ADCS_Franchise_Commission_Statement_Sept2026.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Statement Downloaded', 'Commission settlement statement saved to your device.', 'success');
  };

  return (
    <div className="container-wide" style={{ padding: '2.5rem 1.5rem 4rem' }}>
      {/* Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0A192F 0%, #0D2137 60%, #1D4ED8 100%)',
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
            ₹1,48,250
          </div>
          <div style={{ fontSize: '0.72rem', color: '#10B981' }}>+18.4% growth vs last month</div>
        </div>
      </div>

      {/* Branch Metrics */}
      <div className="grid-4" style={{ gap: '1.25rem', marginBottom: '2.5rem' }}>
        <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Active Customers Served</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0A192F', marginTop: '0.2rem' }}>1,240</div>
          <div style={{ fontSize: '0.72rem', color: '#059669', marginTop: '0.2rem' }}>96.2% Repeat Rate</div>
        </div>

        <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Total Service Orders</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#1D4ED8', marginTop: '0.2rem' }}>384</div>
          <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '0.2rem' }}>This Calendar Month</div>
        </div>

        <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>Branch Staff Deployed</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0A192F', marginTop: '0.2rem' }}>
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
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0A192F' }}>
              Monthly Branch Target vs Achievement
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748B' }}>Target: ₹2,00,000 Net Commission for Q3 Incentive Bonus</p>
          </div>
          <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#1D4ED8' }}>74.1% Achieved</span>
        </div>

        {/* Progress Bar */}
        <div style={{ height: '12px', background: '#F1F5F9', borderRadius: '6px', overflow: 'hidden' }}>
          <div style={{ width: '74.1%', height: '100%', background: 'linear-gradient(90deg, #1D4ED8 0%, #F59E0B 100%)' }} />
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
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0A192F' }}>
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
                <div style={{ fontWeight: 800, color: '#0A192F' }}>{s.id} • {s.period}</div>
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
