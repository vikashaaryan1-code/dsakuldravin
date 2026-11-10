import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { initialRentalAgreements } from '../data/initialState';
import { 
  Key, 
  FileText, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  DollarSign, 
  Wrench, 
  ArrowRight,
  Sparkles,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const RentalManagementPage: React.FC = () => {
  const { showToast, logAudit, language } = useApp();
  const [agreements, setAgreements] = useState(initialRentalAgreements);
  const [activeTab, setActiveTab] = useState<'agreements' | 'new-agreement' | 'maintenance'>('agreements');

  // Generator State
  const [ownerName, setOwnerName] = useState('Dr. Akhilesh Prasad');
  const [tenantName, setTenantName] = useState('');
  const [tenantPhone, setTenantPhone] = useState('');
  const [propertyTitle, setPropertyTitle] = useState('Flat 304, Green Heights, Bailey Road');
  const [monthlyRent, setMonthlyRent] = useState(18000);
  const [securityDeposit, setSecurityDeposit] = useState(36000);
  const [isGenerating, setIsGenerating] = useState(false);

  // Maintenance Ticket state
  const [ticketIssue, setTicketIssue] = useState('Plumbing Leakage in Master Bathroom');
  const [ticketUrgency, setTicketUrgency] = useState('Normal');

  const handlePayRent = (agreementId: string, rent: number) => {
    showToast('Rent Payment Settled', `Monthly rent of ₹${rent.toLocaleString('en-IN')} paid to Owner. Receipt issued.`, 'success');
    logAudit(`Monthly Rent Paid: ${agreementId}`, `Amount: ₹${rent}`);
    confetti({ particleCount: 70, spread: 50 });
  };

  const handleCreateAgreement = () => {
    if (!tenantName) return;
    setIsGenerating(true);

    setTimeout(() => {
      const newAgr = {
        id: 'RENT-AGR-' + Math.floor(100 + Math.random() * 900),
        propertyTitle,
        ownerName,
        tenantName,
        tenantPhone: tenantPhone || '+91 98000 00000',
        monthlyRent,
        securityDeposit,
        startDate: '01 Oct 2026',
        endDate: '30 Sep 2027',
        status: 'Active' as const,
        nextDueDate: '05 Nov 2026',
      };

      setAgreements(prev => [newAgr, ...prev]);
      setIsGenerating(false);
      setActiveTab('agreements');
      showToast('Rental Agreement Created', `Legal agreement ${newAgr.id} drafted with e-sign verification link.`, 'success');
      logAudit(`New Lease Drafted: ${newAgr.id}`, `Tenant: ${tenantName}`);
    }, 800);
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
          <Key size={14} />
          <span>OWNER & TENANT LIFECYCLE MANAGEMENT</span>
        </div>

        <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 900, marginBottom: '0.75rem', color: '#FFFFFF' }}>
          {language === 'hi' ? 'किराया एवं किरायेदार जीवनचक्र प्रबंधन' : 'Rental & Lease Management'}
        </h1>
        <p style={{ fontSize: '1rem', color: '#CBD5E1', maxWidth: '640px', lineHeight: 1.6 }}>
          Legally binding online rent agreements, police verification assistance, automated monthly rent collection, security deposit escrow & maintenance tickets.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2.5rem' }}>
        {[
          { id: 'agreements', label: 'Active Leases & Rent Collection', icon: <FileText size={16} /> },
          { id: 'new-agreement', label: 'Draft Online Rent Agreement', icon: <Sparkles size={16} /> },
          { id: 'maintenance', label: 'Maintenance & Repairs', icon: <Wrench size={16} /> },
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

      {/* Tab 1: Active Agreements */}
      {activeTab === 'agreements' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {agreements.map(agr => (
            <div
              key={agr.id}
              style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                padding: '1.75rem',
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 16px rgba(10, 25, 47, 0.04)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1.5rem',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0A192F' }}>{agr.id}</span>
                  <span className="badge badge-green">{agr.status}</span>
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1D4ED8', marginBottom: '0.25rem' }}>
                  {agr.propertyTitle}
                </h3>
                <div style={{ fontSize: '0.82rem', color: '#64748B' }}>
                  Tenant: <strong>{agr.tenantName}</strong> ({agr.tenantPhone}) • Landlord: <strong>{agr.ownerName}</strong>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#475569', marginTop: '0.4rem' }}>
                  Lease Duration: {agr.startDate} to {agr.endDate}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Monthly Rent</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0A192F' }}>
                    ₹{agr.monthlyRent.toLocaleString('en-IN')}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#D97706', fontWeight: 600 }}>
                    Next Due: {agr.nextDueDate}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <button
                    onClick={() => handlePayRent(agr.id, agr.monthlyRent)}
                    className="btn-gold"
                    style={{ fontWeight: 800 }}
                  >
                    <span>Pay Rent Online</span>
                    <ArrowRight size={15} />
                  </button>

                  <button
                    onClick={() => showToast('Agreement Downloaded', `PDF for ${agr.id} downloaded with digital seal.`, 'success')}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      fontSize: '0.78rem',
                      color: '#1D4ED8',
                      fontWeight: 600,
                      justifyContent: 'center',
                    }}
                  >
                    <Download size={13} />
                    <span>Download Lease Deed</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Online Rent Agreement Generator */}
      {activeTab === 'new-agreement' && (
        <div style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          padding: '2.5rem',
          border: '1px solid #E2E8F0',
          maxWidth: '720px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
        }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0A192F', marginBottom: '0.5rem' }}>
            Draft Verified Online Rent Agreement
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.75rem' }}>
            Instant digital stamp paper generation, customized clauses, and Aadhaar OTP e-signature workflow.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label">Rental Property Address</label>
              <input
                type="text"
                className="form-input"
                value={propertyTitle}
                onChange={(e) => setPropertyTitle(e.target.value)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Landlord / Owner Name *</label>
                <input
                  type="text"
                  className="form-input"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Tenant Full Name *</label>
                <input
                  type="text"
                  className="form-input"
                  value={tenantName}
                  onChange={(e) => setTenantName(e.target.value)}
                  placeholder="e.g. Saurabh Ganguly"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Monthly Rent (₹) *</label>
                <input
                  type="number"
                  className="form-input"
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(Number(e.target.value))}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Security Deposit (₹) *</label>
                <input
                  type="number"
                  className="form-input"
                  value={securityDeposit}
                  onChange={(e) => setSecurityDeposit(Number(e.target.value))}
                />
              </div>
            </div>

            <div style={{
              background: '#F0FDF4',
              padding: '1rem',
              borderRadius: '12px',
              border: '1px solid #BBF7D0',
              fontSize: '0.82rem',
              color: '#065F46',
            }}>
              ✓ Includes e-Stamp Certificate (₹100 / ₹500 as per state stamp act) + Aadhaar OTP e-Sign.
            </div>

            <button
              onClick={handleCreateAgreement}
              disabled={isGenerating || !tenantName}
              className="btn-gold btn-lg"
              style={{ fontWeight: 800 }}
            >
              {isGenerating ? 'Generating Legal Draft...' : 'Generate Legal Agreement & Send for e-Sign'}
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Maintenance & Repairs */}
      {activeTab === 'maintenance' && (
        <div style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          padding: '2.5rem',
          border: '1px solid #E2E8F0',
          maxWidth: '680px',
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0A192F', marginBottom: '0.5rem' }}>
            Raise Property Maintenance Ticket
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.5rem' }}>
            Verified technicians (Plumbers, Electricians, Carpenters) dispatched to your premises within 4 hours.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label">Describe Issue / Repair Needed</label>
              <textarea
                className="form-textarea"
                rows={3}
                value={ticketIssue}
                onChange={(e) => setTicketIssue(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Urgency Level</label>
              <select
                className="form-select"
                value={ticketUrgency}
                onChange={(e) => setTicketUrgency(e.target.value)}
              >
                <option value="Normal">Normal (Within 24 Hours)</option>
                <option value="High">High (Within 6 Hours)</option>
                <option value="Emergency">Emergency (Immediate Dispatch - Water/Short Circuit)</option>
              </select>
            </div>

            <button
              onClick={() => {
                showToast('Maintenance Ticket Raised', 'Technician assigned. Ticket ID: MNT-' + Math.floor(100 + Math.random() * 900), 'success');
              }}
              className="btn-primary"
            >
              Dispatch Certified Technician
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
