import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { 
  LifeBuoy, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  MessageSquare, 
  Send, 
  Phone, 
  ShieldAlert,
  ArrowRight,
  UserCheck,
  BookOpen,
  X,
  Copy,
  FileText,
  Check
} from 'lucide-react';
import { SupportTicket } from '../../types';

export const SupportPortal: React.FC = () => {
  const { supportTickets, createSupportTicket, replySupportTicket, resolveSupportTicket, showToast } = useApp();
  
  const [selectedTicketId, setSelectedTicketId] = useState<string>(supportTickets[0]?.id || '');
  const [replyText, setReplyText] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Open' | 'In Progress' | 'Critical SLA' | 'Resolved'>('All');
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [showSopModal, setShowSopModal] = useState(false);
  const [sopFilter, setSopFilter] = useState('');
  const [copiedSopIndex, setCopiedSopIndex] = useState<number | null>(null);

  // New ticket state
  const [newCustName, setNewCustName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newCategory, setNewCategory] = useState('Government Services');
  const [newSubject, setNewSubject] = useState('');
  const [newPriority, setNewPriority] = useState<SupportTicket['priority']>('High');
  const [newInitialMsg, setNewInitialMsg] = useState('');

  const activeTicket = supportTickets.find(t => t.id === selectedTicketId) || supportTickets[0];

  const filteredTickets = supportTickets.filter(t => {
    if (filterStatus === 'All') return true;
    if (filterStatus === 'Critical SLA') return t.priority === 'Critical SLA';
    return t.status === filterStatus;
  });

  const openTicketsCount = supportTickets.filter(t => t.status !== 'Resolved').length;
  const criticalSlaCount = supportTickets.filter(t => t.priority === 'Critical SLA' && t.status !== 'Resolved').length;

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeTicket) return;
    replySupportTicket(activeTicket.id, replyText);
    setReplyText('');
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustName.trim() || !newSubject.trim() || !newInitialMsg.trim()) {
      showToast('Required Fields Missing', 'Please enter citizen name, ticket subject, and issue description.', 'warning');
      return;
    }
    const digits = newPhone.replace(/\D/g, '');
    if (newPhone.trim() && digits.length !== 10 && digits.length !== 12) {
      showToast('Invalid Phone Number', 'Please enter a valid 10-digit Indian mobile number.', 'warning');
      return;
    }

    createSupportTicket({
      customerName: newCustName.trim(),
      customerPhone: newPhone.trim() || '+91 98000 00000',
      serviceCategory: newCategory,
      subject: newSubject.trim(),
      priority: newPriority,
      assignedAgent: 'Priority Response Desk',
      initialMessage: newInitialMsg.trim()
    });

    setShowNewTicketModal(false);
    setNewCustName('');
    setNewPhone('');
    setNewSubject('');
    setNewInitialMsg('');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #0A192F 0%, #151D33 50%, #B91C1C 100%)',
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
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)', padding: '0.35rem 0.8rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, color: '#FCA5A5', marginBottom: '0.75rem' }}>
              <LifeBuoy size={14} />
              <span>SLA ESCALATION COMMAND & CITIZEN SUPPORT DESK</span>
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, margin: '0 0 0.5rem', color: '#FFFFFF' }}>
              Customer Support & SLA Resolution Desk
            </h1>
            <p style={{ color: '#E2E8F0', fontSize: '0.92rem', maxWidth: '680px', margin: 0, lineHeight: 1.5 }}>
              4-hour statutory SLA guarantee for passport, Aadhaar, company filings, and emergency technical cyber café terminal assistance.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => setShowNewTicketModal(true)}
              className="btn btn-gold"
              style={{ fontWeight: 800, padding: '0.75rem 1.4rem' }}
            >
              + Create Incident Ticket
            </button>
            <button
              onClick={() => setShowSopModal(true)}
              className="btn"
              style={{ background: 'rgba(255,255,255,0.12)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              <BookOpen size={18} /> View SOPs
            </button>
          </div>
        </div>

        {/* SLA Telemetry Metrics */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem'
        }}>
          <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', fontSize: '0.82rem', fontWeight: 600 }}>
              <span>ACTIVE UNRESOLVED TICKETS</span>
              <MessageSquare size={18} color="#1D4ED8" />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0A192F', margin: '0.4rem 0' }}>
              {openTicketsCount} Incidents
            </div>
            <div style={{ fontSize: '0.78rem', color: '#059669' }}>
              Assigned to panel executives
            </div>
          </div>

          <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', fontSize: '0.82rem', fontWeight: 600 }}>
              <span>CRITICAL SLA AT-RISK</span>
              <AlertTriangle size={18} color="#DC2626" />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#DC2626', margin: '0.4rem 0' }}>
              {criticalSlaCount} Escalations
            </div>
            <div style={{ fontSize: '0.78rem', color: '#DC2626' }}>
              Require action within 2 hours
            </div>
          </div>

          <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', fontSize: '0.82rem', fontWeight: 600 }}>
              <span>AVERAGE FIRST RESPONSE TIME</span>
              <Clock size={18} color="#D97706" />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#D97706', margin: '0.4rem 0' }}>
              8.4 Minutes
            </div>
            <div style={{ fontSize: '0.78rem', color: '#059669' }}>
              99.2% SLA adherence rate
            </div>
          </div>

          <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', fontSize: '0.82rem', fontWeight: 600 }}>
              <span>CUSTOMER CSAT SCORE</span>
              <CheckCircle2 size={18} color="#059669" />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#059669', margin: '0.4rem 0' }}>
              4.92 / 5.0
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
              Based on 2,850+ citizen reviews
            </div>
          </div>
        </div>

        {/* Two-Column Support Workplace */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '400px 1fr',
          gap: '1.5rem',
          alignItems: 'start'
        }}>
          {/* Left Column: Ticket List & Filter */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 4px 20px rgba(10, 25, 47, 0.05)',
            overflow: 'hidden'
          }}>
            <div style={{ padding: '1.25rem', borderBottom: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                {(['All', 'Open', 'In Progress', 'Critical SLA', 'Resolved'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setFilterStatus(tab)}
                    style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      background: filterStatus === tab ? '#0A192F' : '#F1F5F9',
                      color: filterStatus === tab ? '#FFFFFF' : '#64748B',
                      border: 'none',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
              {filteredTickets.map(ticket => {
                const isSelected = activeTicket?.id === ticket.id;
                return (
                  <div
                    key={ticket.id}
                    onClick={() => setSelectedTicketId(ticket.id)}
                    style={{
                      padding: '1.25rem',
                      borderBottom: '1px solid #F1F5F9',
                      background: isSelected ? '#EFF6FF' : '#FFFFFF',
                      borderLeft: isSelected ? '4px solid #1D4ED8' : '4px solid transparent',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.85rem', color: isSelected ? '#1D4ED8' : '#0A192F' }}>
                        {ticket.id}
                      </span>
                      <span className={`badge ${ticket.priority === 'Critical SLA' ? 'badge-red' : ticket.priority === 'High' ? 'badge-gold' : 'badge-gray'}`} style={{ fontSize: '0.7rem' }}>
                        {ticket.priority}
                      </span>
                    </div>

                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0F172A', marginBottom: '0.25rem', lineHeight: 1.3 }}>
                      {ticket.subject}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#64748B' }}>
                      <span>{ticket.customerName}</span>
                      <span>{ticket.status}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Ticket Conversation Thread */}
          {activeTicket ? (
            <div style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 4px 20px rgba(10, 25, 47, 0.05)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '600px'
            }}>
              {/* Ticket Header */}
              <div style={{ padding: '1.5rem', borderBottom: '1px solid #E2E8F0', background: '#F8FAFC', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                    <span style={{ fontWeight: 900, fontSize: '1.15rem', color: '#0A192F' }}>{activeTicket.id}: {activeTicket.subject}</span>
                    <span className="badge badge-blue">{activeTicket.serviceCategory}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
                    Citizen: <strong>{activeTicket.customerName}</strong> ({activeTicket.customerPhone}) • Created: {activeTicket.createdAt}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {activeTicket.status !== 'Resolved' && (
                    <button
                      onClick={() => resolveSupportTicket(activeTicket.id)}
                      className="btn btn-sm btn-gold"
                    >
                      <CheckCircle2 size={15} /> Mark Resolved
                    </button>
                  )}
                  <span className={`badge ${activeTicket.status === 'Resolved' ? 'badge-green' : 'badge-blue'}`}>
                    {activeTicket.status}
                  </span>
                </div>
              </div>

              {/* Message Thread */}
              <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#F8FAFC' }}>
                {activeTicket.messages.map((msg, idx) => {
                  const isAgent = msg.role !== 'Citizen';
                  return (
                    <div
                      key={idx}
                      style={{
                        alignSelf: isAgent ? 'flex-end' : 'flex-start',
                        maxWidth: '75%',
                        background: isAgent ? '#1D4ED8' : '#FFFFFF',
                        color: isAgent ? '#FFFFFF' : '#0A192F',
                        borderRadius: '16px',
                        padding: '1rem',
                        boxShadow: '0 2px 10px rgba(10, 25, 47, 0.05)',
                        border: isAgent ? 'none' : '1px solid #E2E8F0'
                      }}
                    >
                      <div style={{ fontSize: '0.72rem', opacity: 0.8, marginBottom: '0.25rem', fontWeight: 700 }}>
                        {msg.sender} ({msg.role}) • {msg.timestamp}
                      </div>
                      <div style={{ fontSize: '0.88rem', lineHeight: 1.45 }}>
                        {msg.text}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Reply Input Form */}
              <form onSubmit={handleSendReply} style={{ padding: '1.25rem', borderTop: '1px solid #E2E8F0', background: '#FFFFFF', display: 'flex', gap: '0.75rem' }}>
                <input
                  type="text"
                  placeholder="Type an official SLA response or status clarification..."
                  className="form-input"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.25rem', gap: '0.4rem' }}>
                  <Send size={16} /> Send Response
                </button>
              </form>
            </div>
          ) : (
            <div style={{ background: '#FFFFFF', borderRadius: '20px', padding: '3rem', textAlign: 'center', color: '#64748B' }}>
              Select a support ticket from the queue.
            </div>
          )}
        </div>

        {/* MODAL: CREATE INCIDENT TICKET */}
        {showNewTicketModal && (
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
            <div style={{ background: '#FFFFFF', borderRadius: '20px', maxWidth: '520px', width: '100%', padding: '2rem', boxShadow: '0 25px 60px rgba(0,0,0,0.3)' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0A192F', marginBottom: '0.25rem' }}>
                Raise Citizen Support Incident
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '1.25rem' }}>
                Initiates tracked SLA workflow with automated SMS acknowledgement.
              </p>

              <form onSubmit={handleCreateTicket}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Citizen Name *</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      value={newCustName}
                      onChange={(e) => setNewCustName(e.target.value)}
                      placeholder="e.g. Ramesh Kumar"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      placeholder="+91 98765 00000"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Service Category</label>
                    <select className="form-select" value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
                      <option value="Government Services">Government Services</option>
                      <option value="Business Services">Business Services</option>
                      <option value="Cyber Café Workstations">Cyber Café Workstations</option>
                      <option value="FinTech & UPI Payments">FinTech & UPI Payments</option>
                      <option value="Courier Logistics">Courier Logistics</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">SLA Priority</label>
                    <select className="form-select" value={newPriority} onChange={(e) => setNewPriority(e.target.value as any)}>
                      <option value="Medium">Medium (12 Hours)</option>
                      <option value="High">High (4 Hours)</option>
                      <option value="Critical SLA">Critical SLA (2 Hours)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Subject / Issue Summary *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    placeholder="e.g. Passport appointment slot rebooking requested"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Detailed Description *</label>
                  <textarea
                    rows={3}
                    required
                    className="form-textarea"
                    value={newInitialMsg}
                    onChange={(e) => setNewInitialMsg(e.target.value)}
                    placeholder="Provide details regarding application token or portal issue..."
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                  <button type="button" onClick={() => setShowNewTicketModal(false)} className="btn btn-outline" style={{ flex: 1 }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" style={{ flex: 2, fontWeight: 800 }}>
                    Dispatch Ticket
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* GOVERNMENT & LEGAL SOPS KNOWLEDGE BASE MODAL */}
        {showSopModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10, 25, 47, 0.75)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem'
          }}>
            <div style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              maxWidth: '680px',
              width: '100%',
              padding: '2.25rem',
              boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div>
                  <span className="badge badge-navy">GOVERNANCE & VLE FILING COMPLIANCE</span>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0A192F', marginTop: '0.25rem' }}>
                    Standard Operating Procedures (SOPs) Repository
                  </h3>
                </div>
                <button onClick={() => setShowSopModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <X size={20} color="#64748B" />
                </button>
              </div>

              {/* Search Bar */}
              <div style={{ marginBottom: '1.25rem' }}>
                <input
                  type="text"
                  className="form-input"
                  value={sopFilter}
                  onChange={(e) => setSopFilter(e.target.value)}
                  placeholder="Search SOPs by keyword (e.g. PAN, AEPS, Passport, Domicile, GST)..."
                />
              </div>

              {/* SOP List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                {[
                  {
                    title: 'SOP-01: PAN Form 49A Scrutiny & Demographics Match',
                    circular: 'CBDT Instruction No. 12/2024 • NSDL/UTIITSL Spec',
                    steps: [
                      'Verify full name on Aadhaar matches Form 49A character-by-character.',
                      'Execute Verhoeff dihedral algorithm validation on applicant UID.',
                      'Ensure photo size is 3.5cm x 2.5cm at 300 DPI, signature file < 60KB.',
                      'Collect ₹107 statutory fee and provide acknowledgement coupon immediately.'
                    ]
                  },
                  {
                    title: 'SOP-02: Passport Seva Kendra Biometric Appointment Protocol',
                    circular: 'Ministry of External Affairs (MEA) Passport Rules 1980',
                    steps: [
                      'Check Annexure-E non-ECR proof (Class 10 marksheet or IT return).',
                      'Upload PDF file < 1MB under designated category in Document Vault.',
                      'Select nearest PSK (Patna / Ranchi / Varanasi) and verify ARN receipt.',
                      'Advise applicant to carry 2 original address proofs to the biometric counter.'
                    ]
                  },
                  {
                    title: 'SOP-03: e-District Domicile / Income / Caste Verification',
                    circular: 'Revenue & Land Reforms Department Statutory Standard',
                    steps: [
                      'Verify Khatiyan / Land tax receipt (LPC) or urban holding tax receipt.',
                      'Obtain self-declaration affidavit with Ward Councilor / Mukhiya endorsement.',
                      'File on RTPS portal switch and monitor Circle Officer (CO) SLA (10 days).',
                      'Print digitally signed certificate with QR hash on 100 GSM bond paper.'
                    ]
                  },
                  {
                    title: 'SOP-04: DigiPay AEPS Biometric Device (Mantra MFS100) Diagnostics',
                    circular: 'UIDAI Registered Device Specification v2.0 (L1 Compliant)',
                    steps: [
                      'Ensure RD Service is bound to localhost port 11100 in READY state.',
                      'Confirm zero-storage policy: raw biometric images must never touch disk/memory.',
                      'Capture encrypted PID token (<PidData>) with session key before NPCI dispatch.',
                      'If Error 300 occurs, instruct citizen to clean finger sensor and retry on thumb.'
                    ]
                  },
                  {
                    title: 'SOP-05: SPICe+ Part B MCA Company Name Reservation & Run Check',
                    circular: 'Ministry of Corporate Affairs (MCA) Companies Act 2013',
                    steps: [
                      'Perform TM Class check under trademark registry (IPIndia portal).',
                      'Ensure proposed name reflects principal business objects in Object Clause.',
                      'Attach DSC of at least 1 Director and submit SPICe+ Part A for approval.',
                      'Proceed to Part B (DIN, PAN, TAN, EPFO, ESIC & Professional Tax combo).'
                    ]
                  },
                  {
                    title: 'SOP-06: GST Revocation & Amnesty Scheme 2026 Late Fee Waiver',
                    circular: 'CBIC Notification No. 18/2026-Central Tax',
                    steps: [
                      'File all pending GSTR-3B and GSTR-1 returns with capped late fees (₹500/nil).',
                      'Submit Form GST REG-21 application for revocation of cancelled GSTIN.',
                      'Reconcile purchase invoices with GSTR-2B to prevent Section 73 ITC notices.',
                      'Provide compliance docket to applicant with jurisdictional tax officer reference.'
                    ]
                  }
                ].filter(s => s.title.toLowerCase().includes(sopFilter.toLowerCase()) || s.circular.toLowerCase().includes(sopFilter.toLowerCase())).map((sop, idx) => (
                  <div key={idx} style={{ background: '#F8FAFC', borderRadius: '14px', padding: '1.25rem', border: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                      <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0A192F', margin: 0 }}>
                        {sop.title}
                      </h4>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(sop.title + '\n' + sop.circular + '\n' + sop.steps.join('\n'));
                          setCopiedSopIndex(idx);
                          showToast('SOP Copied', 'SOP checklist copied to clipboard.', 'success');
                          setTimeout(() => setCopiedSopIndex(null), 2000);
                        }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1D4ED8', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', fontWeight: 700 }}
                      >
                        {copiedSopIndex === idx ? <Check size={14} /> : <Copy size={14} />}
                        <span>{copiedSopIndex === idx ? 'Copied' : 'Copy SOP'}</span>
                      </button>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#D97706', fontWeight: 600, marginBottom: '0.75rem' }}>
                      {sop.circular}
                    </div>
                    <ol style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.82rem', color: '#475569', lineHeight: 1.5 }}>
                      {sop.steps.map((st, i) => (
                        <li key={i} style={{ marginBottom: '0.25rem' }}>{st}</li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowSopModal(false)} className="btn btn-primary">
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
