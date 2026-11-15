import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { apiClient } from '../services/apiClient';
import { printBrandedADCSDocument } from '../utils/documentBranding';
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
  Download,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const UtilityBillsPage: React.FC = () => {
  const { walletBalance, setWalletBalance, showToast, logAudit, recordJournalEntry, language } = useApp();
  const [activeBiller, setActiveBiller] = useState<'electricity' | 'mobile' | 'dth' | 'fastag' | 'gas'>('electricity');

  const billerConfig: Record<'electricity' | 'mobile' | 'dth' | 'fastag' | 'gas', {
    label: string;
    placeholder: string;
    helper: string;
    defaultNumber: string;
    operators: string[];
  }> = {
    electricity: {
      label: 'Consumer Number (CA Number) *',
      placeholder: 'e.g. 1029384756',
      helper: 'Enter 10-digit consumer / CA number from your paper electricity bill.',
      defaultNumber: '1029384756',
      operators: [
        'SBPDCL - South Bihar Power Distribution',
        'NBPDCL - North Bihar Power Distribution',
        'UPPCL - Uttar Pradesh Power Corporation',
        'Tata Power Delhi Distribution (TPDDL)',
        'MSEDCL - Maharashtra State Electricity',
        'BESCOM - Bangalore Electricity Supply',
        'WBSEDCL - West Bengal State Electricity',
        'TSSPDCL - Telangana Southern Power',
      ]
    },
    mobile: {
      label: 'Mobile Number *',
      placeholder: 'e.g. 9876543210',
      helper: 'Enter 10-digit prepaid/postpaid mobile number for instant recharge.',
      defaultNumber: '9876543210',
      operators: [
        'Reliance Jio Prepaid / Postpaid',
        'Bharti Airtel India',
        'Vi - Vodafone Idea',
        'BSNL Mobile GSM Prepaid'
      ]
    },
    dth: {
      label: 'Smart Card Number / Subscriber ID *',
      placeholder: 'e.g. 1092837465',
      helper: 'Press Home/Info on DTH remote to view your Subscriber ID.',
      defaultNumber: '1092837465',
      operators: [
        'Tata Play (Tata Sky)',
        'Airtel Digital TV',
        'Dish TV India',
        'Sun Direct DTH',
        'D2H (Videocon)'
      ]
    },
    fastag: {
      label: 'Vehicle Registration / VRN *',
      placeholder: 'e.g. BR01AB1234',
      helper: 'Enter registered vehicle plate number without spaces.',
      defaultNumber: 'BR01AB1234',
      operators: [
        'Paytm Payments Bank FASTag',
        'ICICI Bank FASTag',
        'State Bank of India (SBI) FASTag',
        'HDFC Bank FASTag',
        'Kotak Mahindra Bank FASTag',
        'Axis Bank FASTag'
      ]
    },
    gas: {
      label: 'LPG Consumer ID / Registered Mobile *',
      placeholder: 'e.g. 17-digit LPG ID or 10-digit Mobile',
      helper: 'Found on your LPG subscription voucher / blue book.',
      defaultNumber: '75001234567890123',
      operators: [
        'Indane Gas (Indian Oil Corporation)',
        'Bharat Gas (BPCL)',
        'HP Gas (HPCL)',
        'Adani Total Gas (PNG)',
        'Indraprastha Gas Limited (IGL PNG)'
      ]
    }
  };

  const [operator, setOperator] = useState(billerConfig.electricity.operators[0]);
  const [consumerNumber, setConsumerNumber] = useState(billerConfig.electricity.defaultNumber);
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

  const handleSelectBiller = (catId: 'electricity' | 'mobile' | 'dth' | 'fastag' | 'gas') => {
    setActiveBiller(catId);
    setOperator(billerConfig[catId].operators[0]);
    setConsumerNumber(billerConfig[catId].defaultNumber);
    setFetchedBill(null);
    setIsPaid(false);
  };

  const handleFetchBill = () => {
    if (!consumerNumber) return;
    setIsFetching(true);
    setFetchedBill(null);
    setIsPaid(false);

    setTimeout(() => {
      let units = 240;
      let amount = 1480;
      let consumerName = 'Shri Raghunath Prasad';
      if (activeBiller === 'mobile') {
        units = 28; // days validity
        amount = 299;
        consumerName = `Mobile Subscriber (+91 ${consumerNumber})`;
      } else if (activeBiller === 'dth') {
        units = 30; // days
        amount = 350;
        consumerName = `DTH Subscriber (${consumerNumber})`;
      } else if (activeBiller === 'fastag') {
        units = 1;
        amount = 500;
        consumerName = `Vehicle Owner (${consumerNumber.toUpperCase()})`;
      } else if (activeBiller === 'gas') {
        units = 1; // 1 cylinder
        amount = 853;
        consumerName = `LPG Beneficiary (${consumerNumber})`;
      }

      setFetchedBill({
        consumerName,
        dueDate: '28 Sep 2026',
        units,
        amount,
        billNumber: 'BBPS-' + Math.floor(100000 + Math.random() * 900000),
      });
      setIsFetching(false);
      showToast('Bill Fetched Successfully', `Verified with ${operator} via Bharat BillPay (BBPS).`, 'success');
    }, 700);
  };

  const handlePayBill = async () => {
    if (!fetchedBill) return;
    if (walletBalance < fetchedBill.amount) {
      showToast('Insufficient Wallet Balance', `Required ₹${fetchedBill.amount}, available ₹${walletBalance}. Please top up your ADCS wallet first.`, 'warning');
      return;
    }
    setIsPaying(true);

    try {
      const orderRes = await apiClient.createPaymentOrder({
        amount: fetchedBill.amount,
        customerName: fetchedBill.consumerName,
        items: [{ title: `${activeBiller.toUpperCase()} BBPS Bill (${operator})`, price: fetchedBill.amount }]
      });
      if (orderRes?.order?.id) {
        await apiClient.verifyPayment({
          orderId: orderRes.order.id,
          paymentMethod: 'ADCS Wallet / BBPS',
          amount: fetchedBill.amount,
        });
      }
    } catch {}

    setTimeout(() => {
      setIsPaying(false);
      setIsPaid(true);
      setWalletBalance(prev => Math.max(0, prev - fetchedBill.amount));

      recordJournalEntry({
        reference: fetchedBill.billNumber,
        description: `BBPS ${activeBiller.toUpperCase()} Settlement (${operator} - Acct ${consumerNumber})`,
        date: new Date().toISOString(),
        lines: [
          { accountCode: '2010', accountName: 'Citizen / VLE Wallet Liability', debit: fetchedBill.amount, credit: 0 },
          { accountCode: '1020', accountName: 'NPCI BBPS Clearing & Settlement Account', debit: 0, credit: fetchedBill.amount },
        ],
      });

      confetti({
        particleCount: 90,
        spread: 60,
        origin: { y: 0.6 }
      });

      logAudit(`BBPS Utility Payment Settled: ${fetchedBill.billNumber}`, `Amount: ₹${fetchedBill.amount}`);
      showToast('Bill Paid Successfully!', `Transaction ID: ${fetchedBill.billNumber}`, 'success');
    }, 650);
  };

  const handleDownloadReceipt = () => {
    if (!fetchedBill) return;
    const npciCode = `NPCI-ADCS-${String(fetchedBill.billNumber || consumerNumber).replace(/[^A-Z0-9]/gi, '').toUpperCase().slice(-8)}`;
    const digest = `SHA256-${String(fetchedBill.billNumber || 'BBPS').replace(/[^A-Z0-9]/gi, '').toUpperCase()}-${fetchedBill.amount}-BBPS-VALID`;
    printBrandedADCSDocument({
      title: 'Bharat Bill Payment System (BBPS) Transaction Receipt',
      documentType: 'BBPS UTILITY RECEIPT',
      documentNumber: String(fetchedBill.billNumber),
      issuedDate: new Date().toLocaleString('en-IN'),
      rows: [
        { label: 'Biller Category', value: activeBiller.toUpperCase() },
        { label: 'Biller Organization', value: operator },
        { label: 'Consumer Account Number', value: consumerNumber },
        { label: 'Consumer Name', value: String(fetchedBill.consumerName) },
        { label: 'Billing Cycle / Due', value: String(fetchedBill.dueDate) },
        { label: 'Units / Consumption', value: `${fetchedBill.units} Units` },
        { label: 'NPCI BBPS Approval Code', value: `${npciCode} (Agent AI-ADCS-09821)` },
        { label: 'Verification Digest', value: digest },
      ],
      amountSummary: {
        subtotal: Number(fetchedBill.amount),
        tax: 0,
        total: Number(fetchedBill.amount),
        currency: '₹',
        paymentStatus: 'SETTLED • CONVENIENCE FEE ₹0.00',
      },
      notes: ['Authorized ADCS BBPS Agent Institution Receipt (AI-ADCS-09821).'],
    });
    showToast('BBPS Receipt Ready', `Branded ADCS BBPS Receipt #${fetchedBill.billNumber} opened for print/PDF.`, 'success');
  };

  return (
    <div className="container-wide" style={{ padding: '2.5rem 1.5rem 4rem' }}>
      {/* Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #061A36 0%, #031126 60%, #075ACB 100%)',
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
            { id: 'gas', label: 'LPG Gas', icon: <Flame size={20} /> },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => handleSelectBiller(cat.id as any)}
              style={{
                padding: '1rem 0.5rem',
                borderRadius: '14px',
                border: activeBiller === cat.id ? '2px solid #075ACB' : '1px solid #E2E8F0',
                background: activeBiller === cat.id ? '#EFF6FF' : '#F8FAFC',
                color: activeBiller === cat.id ? '#075ACB' : '#475569',
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
              {billerConfig[activeBiller].operators.map((op) => (
                <option key={op} value={op}>{op}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              {billerConfig[activeBiller].label}
            </label>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <input
                type="text"
                className="form-input"
                value={consumerNumber}
                onChange={(e) => setConsumerNumber(e.target.value)}
                placeholder={billerConfig[activeBiller].placeholder}
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
              {billerConfig[activeBiller].helper}
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
                  <div style={{ fontWeight: 700, color: '#061A36' }}>{fetchedBill.consumerName}</div>
                </div>
                <div>
                  <div style={{ color: '#64748B' }}>
                    {activeBiller === 'electricity' ? 'Units Consumed:' : activeBiller === 'mobile' ? 'Plan Validity:' : activeBiller === 'dth' ? 'Cycle Period:' : activeBiller === 'fastag' ? 'Tag Status:' : 'Refill Qty:'}
                  </div>
                  <div style={{ fontWeight: 700, color: '#061A36' }}>
                    {activeBiller === 'electricity' ? `${fetchedBill.units} kWh` : activeBiller === 'mobile' ? `${fetchedBill.units} Days (1.5GB/Day)` : activeBiller === 'dth' ? `${fetchedBill.units} Days` : activeBiller === 'fastag' ? 'ACTIVE (Min Bal ₹150)' : `${fetchedBill.units} Cylinder (14.2kg)`}
                  </div>
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
                  <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#061A36' }}>
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

              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#061A36', marginBottom: '0.25rem' }}>
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

      {/* Authorized National Utility & Payment Portals Strip */}
      <div style={{
        marginTop: '2rem',
        background: '#F8FAFC',
        border: '1px solid #E2E8F0',
        borderRadius: '16px',
        padding: '1.25rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#061A36', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <ShieldCheck size={16} color="#059669" />
          <span>Authorized Utility & Regulatory Portals (NPCI BBPS / NHAI):</span>
        </div>
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          {[
            { label: 'Bharat BillPay (NPCI)', url: 'https://www.bharatbillpay.com/' },
            { label: 'NETC FASTag Portal', url: 'https://www.npci.org.in/what-we-do/netc-fastag/product-overview' },
            { label: 'myLPG.in Gas Booking', url: 'https://www.mylpg.in/' },
          ].map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.76rem',
                fontWeight: 600,
                color: '#075ACB',
                background: '#FFFFFF',
                border: '1px solid #BFDBFE',
                padding: '0.35rem 0.7rem',
                borderRadius: '8px',
                textDecoration: 'none',
              }}
            >
              <span>{link.label}</span>
              <ExternalLink size={12} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
