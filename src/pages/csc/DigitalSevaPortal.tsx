import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { 
  Building2, 
  Wallet, 
  PlusCircle, 
  Search, 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Users, 
  HelpCircle, 
  TrendingUp, 
  Bell, 
  LogOut, 
  ShieldCheck, 
  Printer, 
  ArrowRight, 
  QrCode,
  DollarSign,
  Layers,
  Sparkles,
  RefreshCw,
  Landmark,
  BadgeCheck,
  Eye,
  SlidersHorizontal
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Link, useNavigate } from 'react-router-dom';

export const DigitalSevaPortal: React.FC = () => {
  const navigate = useNavigate();
  const { 
    services, 
    applications, 
    submitApplication, 
    walletBalance, 
    setWalletBalance, 
    showToast, 
    logAudit,
    language 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'services' | 'wallet' | 'orders' | 'operators' | 'support'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServiceCategory, setSelectedServiceCategory] = useState<string>('all');

  // Top-Up Modal State
  const [isTopupOpen, setIsTopupOpen] = useState(false);
  const [topupAmount, setTopupAmount] = useState<number>(1000);
  const [topupMethod, setTopupMethod] = useState<'UPI' | 'NetBanking' | 'DebitCard'>('UPI');
  const [isTopupProcessing, setIsTopupProcessing] = useState(false);

  // Quick Application Drawer State
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantAadhaar, setApplicantAadhaar] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  // Sub-Operator Management State
  const [operators, setOperators] = useState([
    { id: 'OP-01', name: 'Manoj Kumar', phone: '9835112233', role: 'Operator', status: 'Active', permissions: ['Banking', 'PAN Card', 'Utility Bills'] },
    { id: 'OP-02', name: 'Sunita Devi', phone: '9835445566', role: 'Operator', status: 'Active', permissions: ['Certificates', 'E-Shram', 'Print'] }
  ]);
  const [newOpName, setNewOpName] = useState('');
  const [newOpPhone, setNewOpPhone] = useState('');

  // Passbook transactions
  const [passbook, setPassbook] = useState([
    { id: 'TXN-PB-9941', date: '2026-11-10', type: 'CR', desc: 'VLE Commission: Form 49A PAN Application', amount: 50, balance: 2450.00 },
    { id: 'TXN-PB-9940', date: '2026-11-10', type: 'DR', desc: 'Govt Application Fee: Birth Certificate', amount: 50, balance: 2400.00 },
    { id: 'TXN-PB-9939', date: '2026-11-09', type: 'CR', desc: 'Wallet Top-up via ICICI NetBanking', amount: 2000, balance: 2450.00 },
    { id: 'TXN-PB-9938', date: '2026-11-09', type: 'CR', desc: 'DigiPay AEPS Cash Out Surcharge', amount: 35, balance: 450.00 },
  ]);

  // Handle Wallet Top-Up
  const handleTopup = async () => {
    if (topupAmount <= 0) return;
    setIsTopupProcessing(true);

    try {
      const res = await fetch('http://localhost:5000/api/csc/wallet/topup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: topupAmount, paymentMethod: topupMethod })
      }).then(r => r.json()).catch(() => null);

      const newBal = (walletBalance || 2450) + topupAmount;
      setWalletBalance(newBal);

      const newEntry = {
        id: 'TXN-PB-' + Math.floor(1000 + Math.random() * 9000),
        date: new Date().toISOString().split('T')[0],
        type: 'CR',
        desc: `Wallet Top-up via ${topupMethod}`,
        amount: topupAmount,
        balance: newBal
      };
      setPassbook(prev => [newEntry, ...prev]);

      showToast('Wallet Top-Up Successful', `₹${topupAmount} added to your VLE Wallet. New Balance: ₹${newBal.toFixed(2)}`, 'success');
      logAudit('CSC VLE Wallet Top-up', `Added ₹${topupAmount} via ${topupMethod}. Current Balance: ₹${newBal}`);
      confetti({ particleCount: 70, spread: 60 });
      setIsTopupOpen(false);
    } finally {
      setIsTopupProcessing(false);
    }
  };

  // Handle Instant Application Filing
  const handleServiceFiling = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !applicantName || !applicantPhone) return;

    const govtFee = selectedService.govtFee ?? 107;
    const vleCommission = 50;

    if (walletBalance < govtFee) {
      showToast('Insufficient Wallet Balance', `Govt fee is ₹${govtFee}. Please top up your VLE wallet.`, 'error');
      setIsTopupOpen(true);
      return;
    }

    setIsApplying(true);

    setTimeout(() => {
      const trackingId = submitApplication({
        serviceId: selectedService.id,
        serviceName: selectedService.title,
        category: selectedService.category,
        applicantName,
        applicantPhone,
        feePaid: govtFee + vleCommission,
        city: 'Patna Center #104',
        state: 'Bihar',
        notes: `Filing through Digital Seva Portal. Applicant Aadhaar: ${applicantAadhaar || 'Verified'}`
      });

      // Deduct govt fee and credit commission
      const newBal = Number((walletBalance - govtFee + vleCommission).toFixed(2));
      setWalletBalance(newBal);

      setPassbook(prev => [
        { id: 'TXN-PB-' + Math.floor(1000 + Math.random() * 9000), date: new Date().toISOString().split('T')[0], type: 'CR', desc: `Commission: ${selectedService.title}`, amount: vleCommission, balance: newBal },
        { id: 'TXN-PB-' + Math.floor(1000 + Math.random() * 9000), date: new Date().toISOString().split('T')[0], type: 'DR', desc: `Govt Fee: ${selectedService.title}`, amount: govtFee, balance: Number((walletBalance - govtFee).toFixed(2)) },
        ...prev
      ]);

      showToast('Service Application Submitted', `Token: ${trackingId} generated. Receipt dispatched to customer.`, 'success');
      logAudit('Digital Seva Service Filing', `Filed ${selectedService.title} for ${applicantName}. Token: ${trackingId}`);
      confetti({ particleCount: 90, spread: 70 });

      setIsApplying(false);
      setSelectedService(null);
      setApplicantName('');
      setApplicantPhone('');
      setApplicantAadhaar('');
    }, 600);
  };

  // Add new sub-operator
  const handleAddOperator = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOpName || !newOpPhone) return;

    const newOp = {
      id: 'OP-0' + (operators.length + 1),
      name: newOpName,
      phone: newOpPhone,
      role: 'Operator',
      status: 'Active',
      permissions: ['General Services', 'Print & Scan']
    };
    setOperators(prev => [...prev, newOp]);
    showToast('Sub-Operator Added', `Operator ${newOpName} registered with center credentials.`, 'success');
    setNewOpName('');
    setNewOpPhone('');
  };

  const filteredServicesList = services.filter(s => {
    const matchSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = selectedServiceCategory === 'all' || s.category === selectedServiceCategory;
    return matchSearch && matchCat;
  });

  return (
    <div style={{ minHeight: '100vh', background: '#F1F5F9', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* 1. Official CSC Digital Seva Top Bar */}
      <header style={{ background: '#0F172A', color: '#FFFFFF', borderBottom: '3px solid #16A34A', position: 'sticky', top: 0, zIndex: 40 }}>
        {/* Tier 1 Header */}
        <div style={{ padding: '0.6rem 2rem', borderBottom: '1px solid #1E293B', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ width: '38px', height: '38px', background: '#16A34A', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.2rem', color: '#FFFFFF' }}>
                CSC
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.02em', color: '#FFFFFF' }}>
                  DIGITAL SEVA PORTAL
                </div>
                <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                  CSC e-Governance Services India Limited
                </div>
              </div>
            </div>

            <span style={{ color: '#334155' }}>|</span>

            {/* VLE Center Identity */}
            <div style={{ fontSize: '0.8rem', color: '#CBD5E1' }}>
              <span style={{ color: '#34D399', fontWeight: 700 }}>VLE ID:</span> 245089123456 &nbsp;•&nbsp;
              <span style={{ color: '#FCD34D', fontWeight: 700 }}>Kendra:</span> Akul Dravin Digital Seva Kendra (Patna, Bihar)
            </div>
          </div>

          {/* Right Utility Counters */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Live Wallet Box */}
            <div style={{
              background: '#1E293B',
              padding: '0.45rem 1rem',
              borderRadius: '10px',
              border: '1px solid #334155',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <div>
                <div style={{ fontSize: '0.68rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>VLE Wallet</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#34D399' }}>
                  ₹{(walletBalance || 2450).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
              </div>
              <button
                onClick={() => setIsTopupOpen(true)}
                title="Add Money to Wallet"
                style={{
                  background: '#16A34A',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '0.35rem 0.65rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
              >
                <PlusCircle size={14} /> Topup
              </button>
            </div>

            {/* VLE Profile Avatar & Log Out */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', borderLeft: '1px solid #334155', paddingLeft: '1rem' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#F8FAFC' }}>Rajesh Sharma</div>
                <div style={{ fontSize: '0.7rem', color: '#34D399' }}>Certified VLE</div>
              </div>
              <button
                onClick={() => navigate('/connect/csc')}
                title="Logout of CSC Connect"
                style={{
                  background: 'transparent',
                  border: '1px solid #475569',
                  color: '#94A3B8',
                  padding: '0.4rem',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Tier 2 Announcements Ticker */}
        <div style={{ background: '#16A34A', color: '#FFFFFF', padding: '0.35rem 2rem', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ background: '#0F172A', color: '#34D399', fontWeight: 800, padding: '0.15rem 0.5rem', borderRadius: '4px', textTransform: 'uppercase', fontSize: '0.7rem' }}>
            Live Notice
          </span>
          <div style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            PM Kisan Samman Nidhi mandatory biometric eKYC enabled • DigiPay AEPS Micro-ATM 4.2 firmware active • Fastag 2.0 issuance live • All VLE commissions credited daily at 23:59 IST.
          </div>
        </div>

        {/* Tier 3 Navigation Tabs */}
        <div style={{ background: '#1E293B', padding: '0 2rem', display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
          {[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'services', label: 'Services Catalogue (64+)' },
            { id: 'wallet', label: 'Wallet & Passbook' },
            { id: 'orders', label: 'Order History & Receipts' },
            { id: 'operators', label: 'Operator Management' },
            { id: 'support', label: 'Grievance & Support Desk' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.id ? '3px solid #16A34A' : '3px solid transparent',
                color: activeTab === tab.id ? '#34D399' : '#94A3B8',
                padding: '0.75rem 1.1rem',
                fontSize: '0.84rem',
                fontWeight: activeTab === tab.id ? 700 : 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* 2. Main Portal Body */}
      <main style={{ maxWidth: '1300px', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Top KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
              <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Available VLE Wallet</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A', marginTop: '0.25rem' }}>
                  ₹{(walletBalance || 2450).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#16A34A', marginTop: '0.35rem', fontWeight: 600 }}>
                  ✓ Ready for Portal Deductions
                </div>
              </div>

              <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Today's Walk-in Footfall</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A', marginTop: '0.25rem' }}>
                  48 Citizens
                </div>
                <div style={{ fontSize: '0.75rem', color: '#2563EB', marginTop: '0.35rem', fontWeight: 600 }}>
                  ↑ +14% compared to yesterday
                </div>
              </div>

              <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Today's VLE Commission</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#16A34A', marginTop: '0.25rem' }}>
                  ₹1,850.00
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.35rem' }}>
                  32 Successful Transactions
                </div>
              </div>

              <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>DigiPay Terminal ID</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginTop: '0.25rem' }}>
                  DP-PATNA-0912
                </div>
                <div style={{ fontSize: '0.75rem', color: '#16A34A', marginTop: '0.35rem', fontWeight: 600 }}>
                  ● Micro-ATM Online
                </div>
              </div>
            </div>

            {/* Quick 1-Click Flagship Service Launcher */}
            <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    Flagship Government & Citizen Services
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0 }}>
                    Click any service to launch instant assisted filing drawer for walk-in citizens
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('services')}
                  style={{
                    background: '#F1F5F9',
                    border: '1px solid #CBD5E1',
                    padding: '0.45rem 0.9rem',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    color: '#334155'
                  }}
                >
                  View All 64 Services ➔
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                {[
                  { id: 'srv-pan-new', title: 'PAN Card (Form 49A / Correction)', fee: 107, comm: 50, tag: 'Income Tax' },
                  { id: 'srv-abha-health-card', title: 'Ayushman Bharat ABHA Card', fee: 0, comm: 50, tag: 'Health' },
                  { id: 'srv-pm-kisan-ekyc', title: 'PM Kisan Samman Nidhi eKYC', fee: 0, comm: 50, tag: 'Agriculture' },
                  { id: 'srv-driving-license', title: 'Driving License Slot & Test', fee: 350, comm: 150, tag: 'Transport' },
                  { id: 'srv-eshram-reg', title: 'E-Shram Unorganized Worker Card', fee: 0, comm: 40, tag: 'Labor' },
                  { id: 'srv-elec-bill', title: 'Electricity BBPS Bill Payment', fee: 0, comm: 20, tag: 'Utility' }
                ].map(svc => (
                  <div
                    key={svc.id}
                    onClick={() => {
                      const match = services.find(s => s.id === svc.id) || { id: svc.id, title: svc.title, category: 'government', govtFee: svc.fee };
                      setSelectedService(match);
                    }}
                    style={{
                      background: '#F8FAFC',
                      padding: '1rem',
                      borderRadius: '12px',
                      border: '1px solid #E2E8F0',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#16A34A'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E2E8F0'}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <span style={{ fontSize: '0.68rem', fontWeight: 700, background: '#E2E8F0', color: '#475569', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                        {svc.tag}
                      </span>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#16A34A' }}>
                        Comm: ₹{svc.comm}
                      </span>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0F172A', marginBottom: '0.5rem' }}>
                      {svc.title}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#64748B' }}>
                      <span>Govt Fee: ₹{svc.fee}</span>
                      <span style={{ color: '#16A34A', fontWeight: 700 }}>Apply ➔</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Passbook & Activity Table */}
            <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  Recent VLE Transactions & Passbook Entries
                </h3>
                <span style={{ fontSize: '0.78rem', color: '#64748B' }}>Real-Time Wallet Sync</span>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                  <thead>
                    <tr style={{ background: '#F8FAFC', color: '#475569', textAlign: 'left', borderBottom: '1px solid #E2E8F0' }}>
                      <th style={{ padding: '0.65rem 0.8rem' }}>Txn ID</th>
                      <th style={{ padding: '0.65rem 0.8rem' }}>Date</th>
                      <th style={{ padding: '0.65rem 0.8rem' }}>Type</th>
                      <th style={{ padding: '0.65rem 0.8rem' }}>Description</th>
                      <th style={{ padding: '0.65rem 0.8rem', textAlign: 'right' }}>Amount</th>
                      <th style={{ padding: '0.65rem 0.8rem', textAlign: 'right' }}>Closing Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {passbook.slice(0, 5).map(txn => (
                      <tr key={txn.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                        <td style={{ padding: '0.65rem 0.8rem', fontFamily: 'monospace', fontWeight: 600 }}>{txn.id}</td>
                        <td style={{ padding: '0.65rem 0.8rem', color: '#64748B' }}>{txn.date}</td>
                        <td style={{ padding: '0.65rem 0.8rem' }}>
                          <span style={{
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px',
                            fontWeight: 700,
                            fontSize: '0.7rem',
                            background: txn.type === 'CR' ? '#DCFCE7' : '#FEE2E2',
                            color: txn.type === 'CR' ? '#166534' : '#991B1B'
                          }}>
                            {txn.type === 'CR' ? '+ CREDIT' : '- DEBIT'}
                          </span>
                        </td>
                        <td style={{ padding: '0.65rem 0.8rem', color: '#334155' }}>{txn.desc}</td>
                        <td style={{ padding: '0.65rem 0.8rem', textAlign: 'right', fontWeight: 700, color: txn.type === 'CR' ? '#16A34A' : '#DC2626' }}>
                          {txn.type === 'CR' ? '+' : '-'}₹{txn.amount.toFixed(2)}
                        </td>
                        <td style={{ padding: '0.65rem 0.8rem', textAlign: 'right', fontWeight: 700, color: '#0F172A' }}>
                          ₹{txn.balance.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SERVICES CATALOGUE */}
        {activeTab === 'services' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  Master Service Catalogue (64+ Configured Services)
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '0.25rem 0 0' }}>
                  Search and launch government, banking, travel, utility, and business compliance services
                </p>
              </div>

              {/* Search & Filter */}
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <div style={{ position: 'relative', width: '260px' }}>
                  <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search any service..."
                    style={{
                      width: '100%',
                      padding: '0.55rem 0.75rem 0.55rem 2rem',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>

                <select
                  value={selectedServiceCategory}
                  onChange={(e) => setSelectedServiceCategory(e.target.value)}
                  style={{
                    padding: '0.55rem 0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    background: '#FFFFFF',
                    fontSize: '0.85rem',
                    color: '#334155'
                  }}
                >
                  <option value="all">All Categories</option>
                  <option value="government">Government & Citizen</option>
                  <option value="business">Business & Compliance</option>
                  <option value="bills">Utility & BBPS</option>
                  <option value="finance">Banking & Loans</option>
                  <option value="travel">Travel & Tickets</option>
                  <option value="insurance">Insurance</option>
                </select>
              </div>
            </div>

            {/* Services Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {filteredServicesList.map(s => (
                <div
                  key={s.id}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '14px',
                    padding: '1.25rem',
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.68rem', fontWeight: 700, background: '#F1F5F9', color: '#475569', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                        {s.category.toUpperCase()}
                      </span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#16A34A' }}>
                        Comm: ₹{s.professionalFee || 50}
                      </span>
                    </div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', margin: '0 0 0.4rem' }}>
                      {s.title}
                    </h4>
                    <p style={{ fontSize: '0.78rem', color: '#64748B', lineHeight: 1.4, margin: '0 0 1rem' }}>
                      {s.description.substring(0, 95)}...
                    </p>
                  </div>

                  <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.78rem', color: '#334155' }}>
                      Govt Fee: <strong>₹{s.govtFee ?? 100}</strong>
                    </div>
                    <button
                      onClick={() => setSelectedService(s)}
                      style={{
                        background: '#16A34A',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}
                    >
                      Apply Now <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: WALLET & PASSBOOK */}
        {activeTab === 'wallet' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '1.75rem', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase' }}>Current VLE Wallet Balance</div>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#16A34A', margin: '0.4rem 0' }}>
                  ₹{(walletBalance || 2450).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
                <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 1.25rem' }}>
                  Funds are automatically debited when submitting citizen applications on central & state portals.
                </p>
                <button
                  onClick={() => setIsTopupOpen(true)}
                  style={{
                    background: '#16A34A',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0.65rem 1.25rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <PlusCircle size={16} /> Top-Up Wallet (Instant UPI / Card)
                </button>
              </div>

              <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '1.75rem', border: '1px solid #E2E8F0' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', margin: '0 0 0.75rem' }}>
                  Banking & Settlement Details
                </h4>
                <div style={{ fontSize: '0.82rem', color: '#334155', lineHeight: 1.8 }}>
                  <div><strong>Linked Bank:</strong> ICICI Bank (Patna Main Branch)</div>
                  <div><strong>Account Number:</strong> XXXXXXXX4912</div>
                  <div><strong>IFSC Code:</strong> ICIC0000019</div>
                  <div><strong>DigiPay Terminal ID:</strong> DP-PATNA-0912</div>
                  <div><strong>Daily AEPS Payout:</strong> Auto-Settlement at 23:00 IST</div>
                </div>
              </div>
            </div>

            {/* Full Passbook Table */}
            <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  Complete Wallet Passbook Ledger
                </h3>
                <button
                  onClick={() => alert('Downloading official VLE Passbook PDF statement...')}
                  style={{
                    background: '#F1F5F9',
                    border: '1px solid #CBD5E1',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  Export PDF Statement
                </button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                  <thead>
                    <tr style={{ background: '#F8FAFC', color: '#475569', textAlign: 'left', borderBottom: '1px solid #E2E8F0' }}>
                      <th style={{ padding: '0.65rem 0.8rem' }}>Transaction ID</th>
                      <th style={{ padding: '0.65rem 0.8rem' }}>Date & Time</th>
                      <th style={{ padding: '0.65rem 0.8rem' }}>Type</th>
                      <th style={{ padding: '0.65rem 0.8rem' }}>Transaction Description</th>
                      <th style={{ padding: '0.65rem 0.8rem', textAlign: 'right' }}>Amount</th>
                      <th style={{ padding: '0.65rem 0.8rem', textAlign: 'right' }}>Running Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {passbook.map(txn => (
                      <tr key={txn.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                        <td style={{ padding: '0.65rem 0.8rem', fontFamily: 'monospace', fontWeight: 600 }}>{txn.id}</td>
                        <td style={{ padding: '0.65rem 0.8rem', color: '#64748B' }}>{txn.date}</td>
                        <td style={{ padding: '0.65rem 0.8rem' }}>
                          <span style={{
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px',
                            fontWeight: 700,
                            fontSize: '0.7rem',
                            background: txn.type === 'CR' ? '#DCFCE7' : '#FEE2E2',
                            color: txn.type === 'CR' ? '#166534' : '#991B1B'
                          }}>
                            {txn.type === 'CR' ? '+ CREDIT' : '- DEBIT'}
                          </span>
                        </td>
                        <td style={{ padding: '0.65rem 0.8rem', color: '#334155' }}>{txn.desc}</td>
                        <td style={{ padding: '0.65rem 0.8rem', textAlign: 'right', fontWeight: 700, color: txn.type === 'CR' ? '#16A34A' : '#DC2626' }}>
                          {txn.type === 'CR' ? '+' : '-'}₹{txn.amount.toFixed(2)}
                        </td>
                        <td style={{ padding: '0.65rem 0.8rem', textAlign: 'right', fontWeight: 700, color: '#0F172A' }}>
                          ₹{txn.balance.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ORDERS & HISTORY */}
        {activeTab === 'orders' && (
          <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  VLE Service Application Orders
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0 }}>
                  Track applications filed by you or your operators with instant receipt reprint
                </p>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', color: '#475569', textAlign: 'left', borderBottom: '1px solid #E2E8F0' }}>
                    <th style={{ padding: '0.65rem 0.8rem' }}>Order / Token ID</th>
                    <th style={{ padding: '0.65rem 0.8rem' }}>Applicant Name</th>
                    <th style={{ padding: '0.65rem 0.8rem' }}>Service Name</th>
                    <th style={{ padding: '0.65rem 0.8rem' }}>Fee Collected</th>
                    <th style={{ padding: '0.65rem 0.8rem' }}>Status</th>
                    <th style={{ padding: '0.65rem 0.8rem', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.slice(0, 8).map(app => (
                    <tr key={app.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '0.65rem 0.8rem', fontFamily: 'monospace', fontWeight: 600, color: '#1D4ED8' }}>
                        {app.id}
                      </td>
                      <td style={{ padding: '0.65rem 0.8rem', fontWeight: 600, color: '#0F172A' }}>
                        {app.applicantName}
                      </td>
                      <td style={{ padding: '0.65rem 0.8rem', color: '#334155' }}>{app.serviceName}</td>
                      <td style={{ padding: '0.65rem 0.8rem', fontWeight: 700, color: '#16A34A' }}>
                        ₹{app.feePaid || 199}
                      </td>
                      <td style={{ padding: '0.65rem 0.8rem' }}>
                        <span style={{
                          padding: '0.2rem 0.55rem',
                          borderRadius: '6px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          background: app.status === 'Completed' ? '#DCFCE7' : app.status === 'In Processing' ? '#FEF3C7' : '#EFF6FF',
                          color: app.status === 'Completed' ? '#166534' : app.status === 'In Processing' ? '#92400E' : '#1E40AF'
                        }}>
                          {app.status}
                        </span>
                      </td>
                      <td style={{ padding: '0.65rem 0.8rem', textAlign: 'right' }}>
                        <button
                          onClick={() => alert(`Reprinting official CSC acknowledgement receipt for Token: ${app.id}...`)}
                          style={{
                            background: '#F1F5F9',
                            border: '1px solid #CBD5E1',
                            padding: '0.35rem 0.7rem',
                            borderRadius: '6px',
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem'
                          }}
                        >
                          <Printer size={13} /> Receipt
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: OPERATOR MANAGEMENT */}
        {activeTab === 'operators' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {/* Operator List */}
            <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: '0 0 1rem' }}>
                Center Sub-Operators
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {operators.map(op => (
                  <div key={op.id} style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: 700, color: '#0F172A' }}>{op.name} ({op.id})</span>
                      <span style={{ background: '#DCFCE7', color: '#166534', padding: '0.15rem 0.45rem', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 700 }}>
                        {op.status}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#64748B', marginBottom: '0.4rem' }}>
                      Mobile: {op.phone} • Role: {op.role}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                      {op.permissions.map((p, idx) => (
                        <span key={idx} style={{ background: '#E2E8F0', color: '#334155', padding: '0.15rem 0.4rem', borderRadius: '4px', fontSize: '0.68rem' }}>
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Operator Form */}
            <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.5rem' }}>
                Add New Sub-Operator
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 1.25rem' }}>
                Authorize staff members to handle citizen walk-ins using delegated credentials.
              </p>

              <form onSubmit={handleAddOperator}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                    Operator Full Name
                  </label>
                  <input
                    type="text"
                    value={newOpName}
                    onChange={(e) => setNewOpName(e.target.value)}
                    placeholder="e.g. Anand Kumar"
                    style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                  />
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                    Mobile Number (For OTP Verification)
                  </label>
                  <input
                    type="tel"
                    value={newOpPhone}
                    onChange={(e) => setNewOpPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    background: '#0F172A',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0.65rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  Create Operator Credentials ➔
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 6: SUPPORT & GRIEVANCE */}
        {activeTab === 'support' && (
          <div style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.5rem' }}>
              CSC Digital Seva Grievance & SLA Support Desk
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#64748B', margin: '0 0 1.5rem' }}>
              Direct district manager escalation, technical helpdesk, and transaction refund tickets.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
              <div style={{ background: '#F8FAFC', padding: '1.25rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>District Manager (DM) Patna</div>
                <div style={{ fontSize: '0.8rem', color: '#334155', lineHeight: 1.6 }}>
                  <div><strong>Name:</strong> Shri Alok Verma</div>
                  <div><strong>Email:</strong> dm.patna@csc.gov.in</div>
                  <div><strong>Phone:</strong> +91 94310 99881</div>
                </div>
              </div>

              <div style={{ background: '#F8FAFC', padding: '1.25rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>CSC Central Helpdesk</div>
                <div style={{ fontSize: '0.8rem', color: '#334155', lineHeight: 1.6 }}>
                  <div><strong>Toll-Free:</strong> 1800 121 3468</div>
                  <div><strong>DigiPay AEPS Desk:</strong> 011-49754975</div>
                  <div><strong>Working Hours:</strong> Mon-Sat (09:00 - 18:00)</div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* 3. MODAL: Instant VLE Wallet Top-Up */}
      {isTopupOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '1rem'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            maxWidth: '440px',
            width: '100%',
            padding: '2rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.25)'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.5rem' }}>
              Add Funds to VLE Wallet
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 1.25rem' }}>
              Current Balance: <strong>₹{(walletBalance || 2450).toFixed(2)}</strong>
            </p>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '0.4rem' }}>
                Top-Up Amount (₹)
              </label>
              <input
                type="number"
                value={topupAmount}
                onChange={(e) => setTopupAmount(Number(e.target.value))}
                min={100}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.8rem',
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1'
                }}
              />
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                {[500, 1000, 2000, 5000].map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setTopupAmount(val)}
                    style={{
                      background: topupAmount === val ? '#DCFCE7' : '#F1F5F9',
                      color: topupAmount === val ? '#166534' : '#475569',
                      border: '1px solid #CBD5E1',
                      padding: '0.3rem 0.6rem',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    +₹{val}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '0.4rem' }}>
                Payment Method
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                {[
                  { id: 'UPI', label: 'UPI / QR' },
                  { id: 'NetBanking', label: 'NetBanking' },
                  { id: 'DebitCard', label: 'Debit Card' }
                ].map(m => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setTopupMethod(m.id as any)}
                    style={{
                      background: topupMethod === m.id ? '#16A34A' : '#F8FAFC',
                      color: topupMethod === m.id ? '#FFFFFF' : '#334155',
                      border: topupMethod === m.id ? '1px solid #16A34A' : '1px solid #CBD5E1',
                      padding: '0.5rem',
                      borderRadius: '6px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setIsTopupOpen(false)}
                style={{
                  flex: 1,
                  background: '#F1F5F9',
                  border: '1px solid #CBD5E1',
                  color: '#475569',
                  padding: '0.65rem',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleTopup}
                disabled={isTopupProcessing}
                style={{
                  flex: 2,
                  background: '#16A34A',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '0.65rem',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                {isTopupProcessing ? 'Processing Payment...' : `Confirm & Add ₹${topupAmount}`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. MODAL: Instant Service Application Filing Drawer */}
      {selectedService && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '1rem'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            maxWidth: '520px',
            width: '100%',
            padding: '2rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.25)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, background: '#DCFCE7', color: '#166534', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                  CSC Assisted Portal Filing
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: '0.4rem 0 0' }}>
                  {selectedService.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.2rem', color: '#94A3B8', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ background: '#F8FAFC', padding: '0.85rem', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '1.25rem', fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between' }}>
              <span>Govt Official Fee: <strong>₹{selectedService.govtFee ?? 107}</strong></span>
              <span style={{ color: '#16A34A', fontWeight: 700 }}>Your Commission: +₹50</span>
            </div>

            <form onSubmit={handleServiceFiling}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                  Applicant Citizen Name
                </label>
                <input
                  type="text"
                  required
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder="Full name as per Aadhaar"
                  style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                  Citizen Mobile Number
                </label>
                <input
                  type="tel"
                  required
                  value={applicantPhone}
                  onChange={(e) => setApplicantPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '0.3rem' }}>
                  Aadhaar Number (Optional for e-KYC validation)
                </label>
                <input
                  type="text"
                  value={applicantAadhaar}
                  onChange={(e) => setApplicantAadhaar(e.target.value)}
                  placeholder="12-digit Aadhaar UID"
                  maxLength={12}
                  style={{ width: '100%', padding: '0.6rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  style={{ flex: 1, background: '#F1F5F9', border: '1px solid #CBD5E1', padding: '0.65rem', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isApplying}
                  style={{
                    flex: 2,
                    background: '#16A34A',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0.65rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {isApplying ? 'Submitting & Printing...' : `Submit & Deduct ₹${selectedService.govtFee ?? 107}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
