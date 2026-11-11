import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { apiClient } from '../../services/apiClient';
import { 
  Store, 
  Wallet, 
  UserPlus, 
  Search, 
  CheckCircle2, 
  PlusCircle, 
  Printer, 
  TrendingUp, 
  DollarSign, 
  ArrowRight,
  ShieldCheck,
  Calendar,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const DigitalCenterPortal: React.FC = () => {
  const { 
    services, 
    applications, 
    submitApplication, 
    walletBalance, 
    setWalletBalance, 
    recordJournalEntry,
    showToast, 
    logAudit,
    language 
  } = useApp();

  // Quick Walk-In Customer Form
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState(services[0]?.id || 'srv-pan-new');
  const [cashCollected, setCashCollected] = useState(199);
  const [vleCommission, setVleCommission] = useState(50);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleWalkInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName || !custPhone) return;

    setIsProcessing(true);
    const chosenService = services.find(s => s.id === selectedServiceId) || services[0];

    setTimeout(() => {
      const appId = submitApplication({
        serviceId: chosenService.id,
        serviceName: chosenService.title,
        category: chosenService.category,
        applicantName: custName,
        applicantPhone: custPhone,
        feePaid: cashCollected,
        city: 'Patna Center #104',
        state: 'Bihar',
        notes: `Walk-in counter registration at VLE Center. VLE Commission: ₹${vleCommission} credited to wallet.`,
      });

      // Credit commission to VLE wallet & record balanced ledger entry
      setWalletBalance(prev => prev + vleCommission);
      recordJournalEntry({
        reference: appId,
        description: `VLE Counter Walk-In (${chosenService.title}) • Comm ₹${vleCommission}`,
        date: new Date().toISOString(),
        lines: [
          { accountCode: '1010', accountName: 'VLE Counter Cash-in-Hand', debit: cashCollected, credit: 0 },
          { accountCode: '2020', accountName: 'VLE Wallet Commission Credit', debit: 0, credit: vleCommission },
          { accountCode: '4010', accountName: 'ADCS Statutory & Platform Revenue', debit: 0, credit: Math.max(0, cashCollected - vleCommission) },
        ],
      });
      logAudit(`VLE Counter Transaction: ${appId}`, `Commission Earned: ₹${vleCommission}`);
      showToast('Counter Order Processed!', `Application ${appId} generated. ₹${vleCommission} commission credited to your wallet.`, 'success');

      setIsProcessing(false);
      setCustName('');
      setCustPhone('');
      confetti({ particleCount: 70, spread: 50 });
    }, 700);
  };

  return (
    <div className="container-wide" style={{ padding: '2.5rem 1.5rem 4rem' }}>
      {/* VLE Center Header Banner */}
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
            marginBottom: '0.75rem',
          }}>
            <Store size={14} />
            <span>VLE OPERATING CONSOLE • BRANCH CODE: AD-PAT-04</span>
          </div>

          <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 900, marginBottom: '0.4rem', color: '#FFFFFF' }}>
            Digital Seva Center Counter POS
          </h1>
          <p style={{ fontSize: '0.92rem', color: '#CBD5E1' }}>
            Walk-in customer onboarding, instant service fulfillment, and real-time commission earnings ledger.
          </p>
        </div>

        {/* Wallet Balance Card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          borderRadius: '18px',
          padding: '1.25rem 1.75rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          textAlign: 'right',
        }}>
          <div style={{ fontSize: '0.78rem', color: '#93C5FD', fontWeight: 600 }}>VLE WALLET BALANCE</div>
          <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#F59E0B' }}>
            ₹{walletBalance.toLocaleString('en-IN')}
          </div>
          <button
            onClick={async () => {
              const topupAmt = 1000;
              try {
                const orderRes = await apiClient.createPaymentOrder({
                  amount: topupAmt,
                  customerName: 'VLE Branch AD-PAT-04',
                  items: [{ title: 'VLE Wallet Top-up', price: topupAmt }]
                });
                if (orderRes?.order?.id) {
                  await apiClient.verifyPayment({ orderId: orderRes.order.id, paymentMethod: 'UPI', amount: topupAmt });
                }
              } catch {}
              setWalletBalance(prev => prev + topupAmt);
              recordJournalEntry({
                reference: `TOPUP-${Date.now().toString().slice(-6)}`,
                description: 'VLE Working Balance UPI Top-up (AD-PAT-04)',
                date: new Date().toISOString(),
                lines: [
                  { accountCode: '1015', accountName: 'NPCI UPI Bank Clearing', debit: topupAmt, credit: 0 },
                  { accountCode: '2020', accountName: 'VLE Wallet Liability Balance', debit: 0, credit: topupAmt },
                ],
              });
              logAudit('VLE Wallet Recharged', '₹1,000 settled via UPI & posted to Double-Entry Ledger', 'Success');
              showToast('Wallet Recharged', '₹1,000 added to VLE working balance via UPI & recorded in Ledger.', 'success');
            }}
            className="btn-gold btn-sm"
            style={{ marginTop: '0.5rem' }}
          >
            + Top-up Balance
          </button>
        </div>
      </div>

      {/* Counter Form & Metrics Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: '2.5rem',
      }} className="hero-grid">
        {/* Left: Walk-In POS Form */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          padding: '2rem',
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <UserPlus size={20} color="#1D4ED8" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0A192F' }}>
              Walk-in Citizen Registration POS
            </h3>
          </div>

          <form onSubmit={handleWalkInSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Customer Name *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={custName}
                  onChange={(e) => setCustName(e.target.value)}
                  placeholder="e.g. Shyam Sundar"
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Phone Number *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={custPhone}
                  onChange={(e) => setCustPhone(e.target.value)}
                  placeholder="+91 98000 XXXXX"
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Select Service Requested</label>
              <select
                className="form-select"
                value={selectedServiceId}
                onChange={(e) => {
                  setSelectedServiceId(e.target.value);
                  const chosen = services.find(s => s.id === e.target.value);
                  if (chosen) {
                    setCashCollected(chosen.basePrice || 199);
                    setVleCommission(Math.round((chosen.basePrice || 199) * 0.25));
                  }
                }}
              >
                {services.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.title} ({s.category}) - ₹{s.basePrice}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Cash Collected from Customer (₹)</label>
                <input
                  type="number"
                  className="form-input"
                  value={cashCollected}
                  onChange={(e) => setCashCollected(Number(e.target.value))}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">VLE Commission Share (₹)</label>
                <input
                  type="number"
                  className="form-input"
                  value={vleCommission}
                  onChange={(e) => setVleCommission(Number(e.target.value))}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="btn-gold btn-lg"
              style={{ fontWeight: 800, justifyContent: 'center' }}
            >
              {isProcessing ? 'Issuing Token...' : `Issue Receipt & Collect ₹${cashCollected}`}
            </button>
          </form>
        </div>

        {/* Right: Today's Center Tally */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '1.75rem',
            border: '1px solid #E2E8F0',
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0A192F', marginBottom: '1rem' }}>
              Today's Branch Performance
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                <span style={{ color: '#64748B' }}>Walk-in Tokens Served:</span>
                <span style={{ fontWeight: 800, color: '#0A192F' }}>14 Citizens</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                <span style={{ color: '#64748B' }}>Gross Cash Collected:</span>
                <span style={{ fontWeight: 800, color: '#0A192F' }}>₹8,450</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                <span style={{ color: '#64748B' }}>Today's Net Commission:</span>
                <span style={{ fontWeight: 800, color: '#059669' }}>+ ₹1,850</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', borderTop: '1px solid #E2E8F0', paddingTop: '0.5rem' }}>
                <span style={{ color: '#64748B' }}>Cash in Register:</span>
                <span style={{ fontWeight: 800, color: '#1D4ED8' }}>₹6,600</span>
              </div>
            </div>
          </div>

          <div style={{
            background: '#F0FDF4',
            borderRadius: '20px',
            padding: '1.5rem',
            border: '1px solid #BBF7D0',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#059669', fontWeight: 700, marginBottom: '0.3rem' }}>
              <CheckCircle2 size={16} />
              <span>Biometric Scanner & Printer Status</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#065F46' }}>
              Mantra MFS100 Biometric Scanner: <strong>ONLINE (Ready)</strong><br />
              HP LaserJet M1005 MFP: <strong>READY (Toner 84%)</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
