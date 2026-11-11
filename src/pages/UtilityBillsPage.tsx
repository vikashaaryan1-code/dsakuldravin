import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { 
  Zap, 
  Smartphone, 
  Tv, 
  Car, 
  Flame, 
  Droplet, 
  CheckCircle2, 
  Receipt, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const UtilityBillsPage: React.FC = () => {
  const { walletBalance, setWalletBalance, showToast, logAudit, language } = useApp();
  const [activeBiller, setActiveBiller] = useState<'electricity' | 'mobile' | 'dth' | 'fastag' | 'gas'>('electricity');
  const [operator, setOperator] = useState('SBPDCL - South Bihar Power Distribution');
  const [consumerNumber, setConsumerNumber] = useState('1029384756');
  const [isFetching, setIsFetching] = useState(false);
  const [fetchedBill, setFetchedBill] = useState<{
    consumerName: string;
    dueDate: string;
    units: number;
    amount: number;
    billNumber: string;
  } | null>(null);

  const [isPaid, setIsPaid] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  const handleFetchBill = () => {
    if (!consumerNumber) return;
    setIsFetching(true);
    setFetchedBill(null);
    setIsPaid(false);

    setTimeout(() => {
      setFetchedBill({
        consumerName: 'Shri Raghunath Prasad',
        dueDate: '28 Sep 2026',
        units: 240,
        amount: 1480,
        billNumber: 'BBPS-' + Math.floor(100000 + Math.random() * 900000),
      });
      setIsFetching(false);
      showToast('Bill Fetched Successfully', 'Verified with State Electricity Board via Bharat BillPay (BBPS).', 'success');
    }, 700);
  };

  const handlePayBill = () => {
    if (!fetchedBill) return;
    setIsPaying(true);

    setTimeout(() => {
      setIsPaying(false);
      setIsPaid(true);
      setWalletBalance(prev => Math.max(0, prev - fetchedBill.amount));

      confetti({
        particleCount: 90,
        spread: 60,
        origin: { y: 0.6 }
      });

      logAudit(`BBPS Utility Payment Settled: ${fetchedBill.billNumber}`, `Amount: ₹${fetchedBill.amount}`);
      showToast('Bill Paid Successfully!', `Transaction ID: ${fetchedBill.billNumber}`, 'success');
    }, 900);
  };

  const handleDownloadReceipt = () => {
    if (!fetchedBill) return;
    const content = `================================================================================
BHARAT BILL PAYMENT SYSTEM (BBPS) - TRANSACTION RECEIPT
AKUL DRAVIN DIGITAL SERVICES (ADCS) AGENT INSTITUTION
================================================================================
Transaction Reference : ${fetchedBill.billNumber}
Payment Status        : SUCCESSFUL / SETTLED
Timestamp             : ${new Date().toLocaleString('en-IN')}
--------------------------------------------------------------------------------
BILL DETAILS:
Biller Category       : ${activeBiller.toUpperCase()}
Biller Organization   : ${operator}
Consumer Account No   : ${consumerNumber}
Consumer Name         : ${fetchedBill.consumerName}
Billing Cycle / Due   : ${fetchedBill.dueDate}
Units / Consumption   : ${fetchedBill.units} Units
--------------------------------------------------------------------------------
PAYMENT BREAKDOWN:
Bill Amount           : ₹${fetchedBill.amount.toLocaleString('en-IN')}.00
Convenience Fee       : ₹0.00
Platform Charges      : ₹0.00
TOTAL AMOUNT PAID     : ₹${fetchedBill.amount.toLocaleString('en-IN')}.00
Payment Mode          : ADCS Instant Citizen Wallet / BBPS Clearing
--------------------------------------------------------------------------------
NPCI BBPS Approval Code: NPCI-ADCS-${Math.floor(10000000 + Math.random() * 90000000)}
Agent Institution ID  : AI-ADCS-09821
Digital Verification  : SHA256-${Math.random().toString(36).substring(2, 10).toUpperCase()}-BBPS-VALID
================================================================================
This is a computer generated electronic receipt. No signature is required.
================================================================================`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `BBPS_Receipt_${fetchedBill.billNumber}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Receipt Downloaded', `Receipt for ${fetchedBill.billNumber} saved to your device.`, 'success');
  };

  return (
    <div className="container-wide" style={{ padding: '2.5rem 1.5rem 4rem' }}>
      {/* Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0A192F 0%, #0D2137 60%, #1D4ED8 100%)',
        borderRadius: '24px',
        padding: '3rem 2.5rem',
        color: '#FFFFFF',
        marginBottom: '2.5rem',
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          background: 'rgba(245, 158, 11, 0.2)',
          border: '1px solid #F59E0B',
          borderRadius: '9999px',
          padding: '0.3rem 0.75rem',
          fontSize: '0.78rem',
          fontWeight: 700,
          color: '#F59E0B',
          marginBottom: '1rem',
        }}>
          <Zap size={14} />
          <span>BHARAT BILL PAYMENT SYSTEM (BBPS) ASSISTED DESK • SIMULATION DEMO</span>
        </div>

        <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 900, marginBottom: '0.75rem', color: '#FFFFFF' }}>
          {language === 'hi' ? 'उपयोगिता बिल भुगतान एवं फास्टैग' : 'Recharge & Utility Bill Pay'}
        </h1>
        <p style={{ fontSize: '1rem', color: '#CBD5E1', maxWidth: '640px', lineHeight: 1.6 }}>
          Demonstration of bill lookup and simulated payment settlement across electricity boards, mobile operators, DTH, FASTag, and piped gas with sample GST-compliant receipts.
        </p>
      </div>

      {/* Operator Selectors & Bill Fetcher */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '2.5rem',
        border: '1px solid #E2E8F0',
        boxShadow: '0 8px 30px rgba(10, 25, 47, 0.05)',
        maxWidth: '780px',
        margin: '0 auto 3rem',
      }}>
        {/* Category Icons */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '0.75rem',
          marginBottom: '2rem',
        }}>
          {[
            { id: 'electricity', label: 'Electricity', icon: <Zap size={20} /> },
            { id: 'mobile', label: 'Mobile', icon: <Smartphone size={20} /> },
            { id: 'dth', label: 'DTH TV', icon: <Tv size={20} /> },
            { id: 'fastag', label: 'FASTag', icon: <Car size={20} /> },
            { id: 'gas', label: 'Piped Gas', icon: <Flame size={20} /> },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveBiller(cat.id as any);
                setFetchedBill(null);
                setIsPaid(false);
              }}
              style={{
                padding: '1rem 0.5rem',
                borderRadius: '14px',
                border: activeBiller === cat.id ? '2px solid #1D4ED8' : '1px solid #E2E8F0',
                background: activeBiller === cat.id ? '#EFF6FF' : '#F8FAFC',
                color: activeBiller === cat.id ? '#1D4ED8' : '#475569',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.4rem',
                fontWeight: 700,
                fontSize: '0.8rem',
                transition: 'all 0.15s',
              }}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Form Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="form-group">
            <label className="form-label">Select Utility Board / Service Provider</label>
            <select
              className="form-select"
              value={operator}
              onChange={(e) => setOperator(e.target.value)}
            >
              <option value="SBPDCL - South Bihar Power Distribution">SBPDCL - South Bihar Power Distribution</option>
              <option value="NBPDCL - North Bihar Power Distribution">NBPDCL - North Bihar Power Distribution</option>
              <option value="UPPCL - Uttar Pradesh Power Corporation">UPPCL - Uttar Pradesh Power Corporation</option>
              <option value="Tata Power Delhi Distribution (TPDDL)">Tata Power Delhi Distribution (TPDDL)</option>
              <option value="MSEDCL - Maharashtra State Electricity">MSEDCL - Maharashtra State Electricity</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              {activeBiller === 'electricity' ? 'Consumer Number (CA Number) *' : 'Account / Identifier *'}
            </label>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <input
                type="text"
                className="form-input"
                value={consumerNumber}
                onChange={(e) => setConsumerNumber(e.target.value)}
                placeholder="e.g. 1029384756"
              />
              <button
                onClick={handleFetchBill}
                disabled={isFetching || !consumerNumber}
                className="btn-primary"
                style={{ whiteSpace: 'nowrap' }}
              >
                {isFetching ? 'Fetching...' : 'Fetch Bill'}
              </button>
            </div>
            <span style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '0.3rem', display: 'block' }}>
              Enter consumer number printed on your paper electricity bill.
            </span>
          </div>

          {/* Fetched Bill Details Card */}
          {fetchedBill && !isPaid && (
            <div style={{
              background: '#F0FDF4',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '1.5px solid #86EFAC',
              animation: 'fadeIn 0.2s ease-out',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span className="badge badge-green">BBPS Bill Fetched</span>
                <span style={{ fontSize: '0.75rem', color: '#047857', fontWeight: 600 }}>Due Date: {fetchedBill.dueDate}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                <div>
                  <div style={{ color: '#64748B' }}>Consumer Name:</div>
                  <div style={{ fontWeight: 700, color: '#0A192F' }}>{fetchedBill.consumerName}</div>
                </div>
                <div>
                  <div style={{ color: '#64748B' }}>Units Consumed:</div>
                  <div style={{ fontWeight: 700, color: '#0A192F' }}>{fetchedBill.units} kWh</div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '1rem',
                borderTop: '1px solid #BBF7D0',
              }}>
                <div>
                  <span style={{ fontSize: '0.78rem', color: '#64748B' }}>Bill Amount Payable:</span>
                  <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0A192F' }}>
                    ₹{fetchedBill.amount.toLocaleString('en-IN')}
                  </div>
                </div>

                <button
                  onClick={handlePayBill}
                  disabled={isPaying}
                  className="btn-gold btn-lg"
                  style={{ fontWeight: 800 }}
                >
                  {isPaying ? 'Settling with Board...' : `Pay ₹${fetchedBill.amount}`}
                </button>
              </div>
            </div>
          )}

          {/* Payment Receipt */}
          {isPaid && fetchedBill && (
            <div style={{
              background: '#F8FAFC',
              borderRadius: '16px',
              padding: '2rem',
              border: '1px solid #CBD5E1',
              textAlign: 'center',
              animation: 'fadeIn 0.25s ease-out',
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: '#DCFCE7',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
              }}>
                <CheckCircle2 size={32} />
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0A192F', marginBottom: '0.25rem' }}>
                Payment Confirmed & Settled!
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '1.5rem' }}>
                Your payment of ₹{fetchedBill.amount} has been credited to {operator}.
              </p>

              <div style={{
                background: '#FFFFFF',
                borderRadius: '12px',
                padding: '1rem',
                border: '1px solid #E2E8F0',
                maxWidth: '400px',
                margin: '0 auto 1.5rem',
                textAlign: 'left',
                fontSize: '0.82rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>BBPS Ref ID:</span>
                  <span style={{ fontWeight: 700 }}>{fetchedBill.billNumber}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Consumer:</span>
                  <span style={{ fontWeight: 600 }}>{fetchedBill.consumerName}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Status:</span>
                  <span className="badge badge-green">SETTLED</span>
                </div>
              </div>

              <button
                onClick={handleDownloadReceipt}
                className="btn-primary"
              >
                <Download size={15} />
                <span>Download BBPS Tax Receipt</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
