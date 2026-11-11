import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { 
  Coins, 
  Calculator, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  AlertTriangle, 
  Percent, 
  Building, 
  Clock,
  Sparkles,
  Download,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const FinanceLoansPage: React.FC = () => {
  const { showToast, logAudit, submitApplication, addLead, language } = useApp();

  // EMI Calculator & Applicant Profile State
  const [loanAmount, setLoanAmount] = useState<number>(1000000); // 10 Lakhs
  const [tenureYears, setTenureYears] = useState<number>(5); // 5 Years
  const [interestRate, setInterestRate] = useState<number>(10.5); // 10.5% p.a.
  const [selectedLoanType, setSelectedLoanType] = useState('Business MSME Loan');
  const [applicantName, setApplicantName] = useState('Saurabh Verma');
  const [applicantPhone, setApplicantPhone] = useState('9835045678');
  const [applicantPan, setApplicantPan] = useState('ABCDE1234F');
  const [monthlyIncome, setMonthlyIncome] = useState<number>(65000);
  const [submittedLoanApp, setSubmittedLoanApp] = useState<{
    appId: string;
    bankName: string;
    loanType: string;
    amount: number;
    emi: number;
    tenureYears: number;
  } | null>(null);

  // Monthly EMI Formula: [P x R x (1+R)^N]/[(1+R)^N-1]
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;
  const monthlyEMI = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );
  const totalPayable = monthlyEMI * totalMonths;
  const totalInterest = totalPayable - loanAmount;
  const maxSafeEmi = Math.round(monthlyIncome * 0.5);
  const isEmiAffordable = monthlyEMI <= maxSafeEmi;

  const partnerLenders = [
    { bank: 'State Bank of India (SBI)', minRate: '9.85%', procFee: '0.35%', maxAmount: '₹50 Lakhs', tag: 'Lowest Interest' },
    { bank: 'HDFC Bank', minRate: '10.50%', procFee: '0.99%', maxAmount: '₹75 Lakhs', tag: 'Fastest 48h Disbursal' },
    { bank: 'ICICI Bank', minRate: '10.75%', procFee: '1.00%', maxAmount: '₹1.0 Crore', tag: 'Collateral-Free MSME' },
    { bank: 'Bank of Baroda', minRate: '9.90%', procFee: '0.50%', maxAmount: '₹40 Lakhs', tag: 'Mudra Scheme Approved' },
  ];

  const handleApplyLoan = (bankName: string) => {
    const cleanPhone = applicantPhone.replace(/\D/g, '').slice(-10);
    const cleanPan = applicantPan.trim().toUpperCase();
    if (!applicantName.trim() || !/^[6-9]\d{9}$/.test(cleanPhone)) {
      showToast('Missing Applicant Info', 'Please enter applicant name and a valid 10-digit Indian mobile number.', 'error');
      return;
    }
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(cleanPan)) {
      showToast('Invalid PAN Format', 'PAN must match 10-character format (e.g. ABCDE1234F).', 'error');
      return;
    }

    const appId = submitApplication({
      serviceId: 'srv-loan-assist',
      serviceName: `${selectedLoanType} — ${bankName}`,
      category: 'finance',
      applicantName: applicantName.trim(),
      applicantPhone: `+91 ${cleanPhone}`,
      feePaid: 0,
      documentsUploaded: [`PAN_${cleanPan}_KYC.pdf`, 'Bank_Statement_6M.pdf'],
      notes: `Amount: ₹${loanAmount.toLocaleString('en-IN')}, Tenure: ${tenureYears}y @ ${interestRate}%, Est EMI: ₹${monthlyEMI.toLocaleString('en-IN')}, Income: ₹${monthlyIncome.toLocaleString('en-IN')}/mo`,
    });

    addLead({
      name: applicantName.trim(),
      company: `${selectedLoanType} (${bankName})`,
      email: 'finance.desk@akuldravindigital.com',
      phone: `+91 ${cleanPhone}`,
      serviceInterested: `${selectedLoanType} (₹${loanAmount.toLocaleString('en-IN')})`,
      estimatedValue: loanAmount,
      stage: 'Proposal',
      assignedExecutive: 'ADCS Credit Facilitation Desk',
    });

    setSubmittedLoanApp({
      appId,
      bankName,
      loanType: selectedLoanType,
      amount: loanAmount,
      emi: monthlyEMI,
      tenureYears,
    });

    showToast('Loan Dossier Registered', `Application ${appId} logged & CRM lead routed for ${bankName}.`, 'success');
    logAudit(`Loan Application Submitted (${appId}) to ${bankName}`, `PAN: ${cleanPan}, Amount: ₹${loanAmount}`);
    confetti({ particleCount: 75, spread: 60 });
  };

  const handleDownloadLoanSheet = () => {
    if (!submittedLoanApp) return;
    const content = [
      'AKUL DRAVIN DIGITAL SERVICES (ADCS) — ASSISTED LOAN ELIGIBILITY DOSSIER',
      '========================================================================',
      `Tracking Reference   : ${submittedLoanApp.appId}`,
      `Date & Time          : ${new Date().toLocaleString('en-IN')}`,
      `Applicant Name       : ${applicantName}`,
      `Mobile / PAN         : ${applicantPhone} / ${applicantPan.toUpperCase()}`,
      `Product / Lender     : ${submittedLoanApp.loanType} (${submittedLoanApp.bankName})`,
      `Requested Principal  : ₹${submittedLoanApp.amount.toLocaleString('en-IN')}`,
      `Tenure & Indicative  : ${submittedLoanApp.tenureYears} Years @ ${interestRate}% p.a.`,
      `Computed Monthly EMI : ₹${submittedLoanApp.emi.toLocaleString('en-IN')}`,
      `Affordability Check  : ${isEmiAffordable ? 'WITHIN 50% FOIR LIMIT' : 'HIGH FOIR - CO-APPLICANT ADVISED'}`,
      `Track Application    : https://akuldravindigital.com/track?id=${encodeURIComponent(submittedLoanApp.appId)}`,
      '========================================================================',
    ].join('\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ADCS_Loan_Dossier_${submittedLoanApp.appId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
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
          <Coins size={14} />
          <span>MULTI-BANK LENDING AGGREGATOR & MSME DESK</span>
        </div>

        <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 900, marginBottom: '0.75rem', color: '#FFFFFF' }}>
          {language === 'hi' ? 'ऋण एवं वित्त बाज़ार' : 'Finance & Loans Marketplace'}
        </h1>
        <p style={{ fontSize: '1rem', color: '#CBD5E1', maxWidth: '640px', lineHeight: 1.6, marginBottom: '1.25rem' }}>
          Compare interest rates, calculate accurate monthly EMIs, and submit assisted loan applications across 35+ partner banks and regulated NBFCs.
        </p>

        {/* Regulatory Disclaimer */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '10px',
          padding: '0.75rem 1rem',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          fontSize: '0.78rem',
          color: '#E2E8F0',
          maxWidth: '720px',
        }}>
          <AlertTriangle size={16} color="#F59E0B" style={{ flexShrink: 0 }} />
          <span>
            <strong>Statutory Lending Notice:</strong> Akul Dravin Digital Services does not guarantee loan approvals or disburse credit directly. Final credit appraisal and sanctions rest strictly with the respective RBI-regulated lenders.
          </span>
        </div>
      </div>

      {/* INTERACTIVE EMI CALCULATOR */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '2.5rem',
        border: '1px solid #E2E8F0',
        boxShadow: '0 8px 30px rgba(10, 25, 47, 0.06)',
        marginBottom: '3.5rem',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span className="badge badge-gold">PRECISION EMI & FOIR ENGINE</span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0A192F', marginTop: '0.4rem' }}>
            Interactive Loan & EMI Calculator
          </h2>
        </div>

        {/* Applicant Eligibility Profile Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))',
          gap: '1rem',
          padding: '1.15rem',
          background: '#F8FAFC',
          borderRadius: '14px',
          border: '1px solid #E2E8F0',
          marginBottom: '2rem',
        }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Loan Product Type</label>
            <select
              className="form-select"
              value={selectedLoanType}
              onChange={(e) => setSelectedLoanType(e.target.value)}
            >
              <option value="Business MSME Loan">Business MSME Loan</option>
              <option value="PM Mudra Shishu / Kishore Loan">PM Mudra Scheme Loan</option>
              <option value="Home & Property Loan">Home & Property Loan</option>
              <option value="Education / Skill Loan">Education / Skill Loan</option>
              <option value="Commercial Vehicle Finance">Commercial Vehicle Finance</option>
            </select>
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Applicant Full Name *</label>
            <input
              type="text"
              className="form-input"
              value={applicantName}
              onChange={(e) => setApplicantName(e.target.value)}
              placeholder="Applicant Name"
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Mobile Number *</label>
            <input
              type="text"
              className="form-input"
              value={applicantPhone}
              onChange={(e) => setApplicantPhone(e.target.value)}
              placeholder="10-digit Mobile"
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">PAN Number *</label>
            <input
              type="text"
              className="form-input"
              value={applicantPan}
              onChange={(e) => setApplicantPan(e.target.value.toUpperCase())}
              placeholder="ABCDE1234F"
              maxLength={10}
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Net Monthly Income (₹)</label>
            <input
              type="number"
              min="10000"
              step="5000"
              className="form-input"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(Math.max(10000, Number(e.target.value)))}
            />
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '2.5rem',
          alignItems: 'center',
        }} className="hero-grid">
          {/* Sliders */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {/* Amount */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span className="form-label">Loan Amount Required:</span>
                <span style={{ fontWeight: 800, color: '#1D4ED8', fontSize: '1.1rem' }}>
                  ₹{(loanAmount / 100000).toFixed(1)} Lakhs
                </span>
              </div>
              <input
                type="range"
                min="50000"
                max="10000000"
                step="50000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#1D4ED8' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748B' }}>
                <span>₹50,000</span>
                <span>₹50 Lakhs</span>
                <span>₹1.0 Crore</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span className="form-label">Interest Rate (% p.a.):</span>
                <span style={{ fontWeight: 800, color: '#D97706', fontSize: '1.1rem' }}>
                  {interestRate}%
                </span>
              </div>
              <input
                type="range"
                min="8.5"
                max="24"
                step="0.25"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#D97706' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748B' }}>
                <span>8.5% (Subsidized MSME)</span>
                <span>15%</span>
                <span>24% (Unsecured)</span>
              </div>
            </div>

            {/* Tenure */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span className="form-label">Repayment Tenure:</span>
                <span style={{ fontWeight: 800, color: '#0A192F', fontSize: '1.1rem' }}>
                  {tenureYears} Years ({totalMonths} Months)
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#059669' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748B' }}>
                <span>1 Year</span>
                <span>10 Years</span>
                <span>20 Years</span>
              </div>
            </div>
          </div>

          {/* Results Display Card */}
          <div style={{
            background: 'linear-gradient(135deg, #0A192F 0%, #0D2137 100%)',
            borderRadius: '20px',
            padding: '2rem',
            color: '#FFFFFF',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            boxShadow: '0 12px 40px rgba(10, 25, 47, 0.25)',
          }}>
            <div style={{ fontSize: '0.78rem', color: '#F59E0B', fontWeight: 700, textTransform: 'uppercase' }}>
              MONTHLY EQUATED INSTALLMENT (EMI):
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#FFFFFF', margin: '0.2rem 0 1.25rem' }}>
              ₹{monthlyEMI.toLocaleString('en-IN')}
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem',
              padding: '1rem 0',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              marginBottom: '1.5rem',
              fontSize: '0.82rem',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94A3B8' }}>Principal Amount:</span>
                <span style={{ fontWeight: 700 }}>₹{loanAmount.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94A3B8' }}>Total Interest Payable:</span>
                <span style={{ fontWeight: 700, color: '#F59E0B' }}>₹{totalInterest.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94A3B8' }}>Total Repayment (P + I):</span>
                <span style={{ fontWeight: 700 }}>₹{totalPayable.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94A3B8' }}>FOIR Check (50% Income):</span>
                <span style={{ fontWeight: 700, color: isEmiAffordable ? '#10B981' : '#F87171' }}>
                  {isEmiAffordable ? `ELIGIBLE (Max ₹${maxSafeEmi.toLocaleString('en-IN')}/mo)` : `HIGH EMI (> ₹${maxSafeEmi.toLocaleString('en-IN')}/mo)`}
                </span>
              </div>
            </div>

            <button
              onClick={() => handleApplyLoan('SBI / HDFC Multi-Lender Desk')}
              className="btn-gold btn-lg"
              style={{ width: '100%', fontWeight: 800 }}
            >
              <span>Check Pre-Approved Eligibility</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Submitted Loan Dossier Banner */}
      {submittedLoanApp && (
        <div style={{
          background: '#F0FDF4',
          border: '2px solid #86EFAC',
          borderRadius: '18px',
          padding: '1.75rem 2rem',
          marginBottom: '2.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: '#DCFCE7',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <CheckCircle2 size={28} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669', textTransform: 'uppercase' }}>
                ASSISTED LOAN DOSSIER REGISTERED • {submittedLoanApp.appId}
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0A192F', margin: '0.15rem 0' }}>
                {submittedLoanApp.loanType} via {submittedLoanApp.bankName}
              </h3>
              <div style={{ fontSize: '0.84rem', color: '#475569' }}>
                Principal: <strong>₹{submittedLoanApp.amount.toLocaleString('en-IN')}</strong> • Tenure: <strong>{submittedLoanApp.tenureYears} yrs</strong> • Est. EMI: <strong>₹{submittedLoanApp.emi.toLocaleString('en-IN')}/mo</strong>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleDownloadLoanSheet}
              className="btn-gold btn-sm"
              style={{ fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <Download size={14} />
              <span>Download Dossier</span>
            </button>
            <Link
              to={`/track?id=${encodeURIComponent(submittedLoanApp.appId)}`}
              className="btn-primary btn-sm"
              style={{ textDecoration: 'none' }}
            >
              Track Application
            </Link>
          </div>
        </div>
      )}

      {/* MULTI-BANK COMPARISON TABLE */}
      <div>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0A192F', marginBottom: '1.25rem' }}>
          Compare Partner Lenders & Rates
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {partnerLenders.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1.5rem',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <Building size={18} color="#1D4ED8" />
                  <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0A192F' }}>{item.bank}</span>
                  <span className="badge badge-blue">{item.tag}</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                  Processing Fee: <strong>{item.procFee}</strong> • Max Limit: <strong>{item.maxAmount}</strong>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Interest Rates From</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#059669' }}>{item.minRate}</div>
                </div>

                <button
                  onClick={() => handleApplyLoan(item.bank)}
                  className="btn-primary"
                >
                  <span>Apply with {item.bank.split(' ')[0]}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Official Credit & Govt Subsidy Portals */}
      <div style={{
        marginTop: '3rem',
        background: '#F8FAFC',
        borderRadius: '18px',
        padding: '1.5rem 2rem',
        border: '1px solid #E2E8F0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div>
          <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#1D4ED8', textTransform: 'uppercase' }}>
            OFFICIAL GOVERNMENT CREDIT & RBI REGULATORY PORTALS
          </div>
          <div style={{ fontSize: '0.84rem', color: '#475569', marginTop: '0.2rem' }}>
            Apply directly for central subsidy-linked loans (PM Mudra, PMEGP, Education) on JanSamarth or verify lenders on RBI Sachet.
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
          {[
            { label: 'JanSamarth Portal', url: 'https://www.jansamarth.in/' },
            { label: 'MSME Udyam Portal', url: 'https://udyamregistration.gov.in/' },
            { label: 'RBI Sachet Check', url: 'https://sachet.rbi.org.in/' },
            { label: 'RBI CMS Ombudsman', url: 'https://cms.rbi.org.in/' },
          ].map(p => (
            <a
              key={p.label}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none' }}
            >
              <span>{p.label}</span>
              <ExternalLink size={13} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
