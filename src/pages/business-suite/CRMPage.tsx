import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { printBrandedADCSDocument } from '../../utils/documentBranding';
import { 
  PlusCircle, 
  Building2, 
  Phone, 
  FileText,
  Send
} from 'lucide-react';
import { CRMLead } from '../../types';

export const CRMPage: React.FC = () => {
  const { crmLeads, addLead, updateLeadStage, logAudit, showToast } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState<CRMLead | null>(null);

  // New Lead form state
  const [leadName, setLeadName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [serviceInterested, setServiceInterested] = useState('Pvt Ltd Company Incorporation');
  const [value, setValue] = useState<number>(14999);
  const [assignedTo, setAssignedTo] = useState('Rahul Saxena');

  // Quote generator state
  const [quoteDiscount, setQuoteDiscount] = useState<number>(10);
  const [quoteSent, setQuoteSent] = useState(false);

  const stages: { key: CRMLead['stage']; label: string; labelHi: string; color: string }[] = [
    { key: 'New', label: 'New Inquiries', labelHi: 'नए लीड', color: 'var(--primary-blue)' },
    { key: 'Contacted', label: 'Contacted / Discovery', labelHi: 'संपर्क किया', color: '#8B5CF6' },
    { key: 'Proposal', label: 'Proposal & Quote Sent', labelHi: 'प्रस्ताव भेजा', color: 'var(--primary-gold)' },
    { key: 'Won', label: 'Deals Won / Closed', labelHi: 'सफल सौदे', color: '#10B981' },
    { key: 'Lost', label: 'Lost / Disqualified', labelHi: 'निरस्त', color: '#EF4444' }
  ];

  const totalPipeline = crmLeads
    .filter(l => l.stage !== 'Lost')
    .reduce((sum, l) => sum + l.estimatedValue, 0);

  const wonDealsValue = crmLeads
    .filter(l => l.stage === 'Won')
    .reduce((sum, l) => sum + l.estimatedValue, 0);

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    const digitsOnly = phone.replace(/\D/g, '');
    if (!leadName.trim() || digitsOnly.length < 10) {
      showToast('Invalid Lead Details', 'Enter prospect name and valid 10-digit mobile number.', 'warning');
      return;
    }

    addLead({
      name: leadName.trim(),
      company: company.trim() || 'Self / Individual',
      phone: phone.trim(),
      email: email.trim() || `${leadName.toLowerCase().replace(/\s+/g, '')}@example.com`,
      serviceInterested: serviceInterested,
      estimatedValue: Math.max(100, Number(value) || 0),
      stage: 'New',
      assignedExecutive: assignedTo
    });

    logAudit('CREATE_LEAD', `Created CRM lead: ${leadName.trim()} for ${serviceInterested}`, 'Success');
    setShowAddModal(false);
    setLeadName('');
    setCompany('');
    setPhone('');
    setEmail('');
  };

  const handleDownloadQuote = (lead: CRMLead) => {
    const safeDisc = Math.max(0, Math.min(50, Number(quoteDiscount) || 0));
    const discounted = (lead.estimatedValue * (100 - safeDisc)) / 100;
    const gst = Math.round(discounted * 0.18);
    const finalPayable = Math.round(discounted + gst);
    printBrandedADCSDocument({
      title: 'Enterprise B2B / B2C Commercial Quotation',
      documentType: 'COMMERCIAL QUOTATION',
      documentNumber: lead.id,
      issuedDate: new Date().toLocaleDateString('en-IN'),
      rows: [
        { label: 'Client / Organization', value: `${lead.name} (${lead.company})` },
        { label: 'Client Contact', value: `${lead.phone} | ${lead.email}` },
        { label: 'Quoted Solution / Package', value: lead.serviceInterested },
        { label: `Commercial Discount (${safeDisc}%)`, value: `-₹${Math.round(lead.estimatedValue - discounted).toLocaleString('en-IN')}` },
      ],
      amountSummary: {
        subtotal: Math.round(discounted),
        tax: gst,
        total: finalPayable,
        currency: '₹',
        paymentStatus: 'COMMERCIAL PROPOSAL',
      },
    });
  };

  const handleSendQuote = (lead: CRMLead) => {
    handleDownloadQuote(lead);
    setQuoteSent(true);
    updateLeadStage(lead.id, 'Proposal');
    logAudit('SEND_QUOTE', `Generated and sent quotation to ${lead.name} (Value: ₹${lead.estimatedValue})`, 'Success');
    setTimeout(() => {
      setShowQuoteModal(null);
      setQuoteSent(false);
    }, 1200);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-light)', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
              <span className="badge badge-navy">SECTION 25 ENTERPRISE CRM</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>• Client Relationship & Revenue Engine</span>
            </div>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--primary-navy)', margin: 0 }}>
              Sales CRM & Lead Pipeline
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '4px 0 0' }}>
              Track citizen inquiries, corporate contracts, proposal generation, and automated cross-sell sequences.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button 
              onClick={() => setShowAddModal(true)}
              className="btn btn-primary"
            >
              <PlusCircle size={16} /> Add New Business Lead
            </button>
          </div>
        </div>

        {/* Metrics Overview */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem'
        }}>
          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL PIPELINE VALUE</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
              ₹{totalPipeline.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#10B981', marginTop: '4px' }}>Active leads across all stages</div>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>DEALS WON (CLOSED GMV)</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10B981' }}>
              ₹{wonDealsValue.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#10B981', marginTop: '4px' }}>Fulfilled & settled</div>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>ACTIVE LEADS</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-blue)' }}>
              {crmLeads.length} Prospects
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Pan-India franchise funnel</div>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>AI RECOMMENDATION</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary-gold)', marginTop: '6px' }}>
              High Cross-Sell Opportunity
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              3 GST clients ready for Web & CRM
            </div>
          </div>
        </div>

        {/* Kanban Board Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
          alignItems: 'start'
        }}>
          {stages.map(stage => {
            const stageLeads = crmLeads.filter(l => l.stage === stage.key);
            const stageValue = stageLeads.reduce((acc, l) => acc + l.estimatedValue, 0);

            return (
              <div 
                key={stage.key}
                style={{
                  background: '#FFFFFF',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-color)',
                  padding: '1.25rem',
                  minHeight: '460px',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                {/* Column Header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingBottom: '0.75rem',
                  borderBottom: `2px solid ${stage.color}`,
                  marginBottom: '1rem'
                }}>
                  <div>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>{stage.label}</h3>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{stage.labelHi}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="badge badge-navy" style={{ fontSize: '0.75rem' }}>{stageLeads.length}</span>
                    <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', marginTop: '2px' }}>
                      ₹{(stageValue / 1000).toFixed(0)}k
                    </div>
                  </div>
                </div>

                {/* Cards Container */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {stageLeads.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                      No active opportunities in this column
                    </div>
                  ) : (
                    stageLeads.map(lead => (
                      <div
                        key={lead.id}
                        style={{
                          background: 'var(--bg-light)',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--border-color)',
                          padding: '1rem',
                          transition: 'all 0.2s ease',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                          <h4 style={{ fontWeight: 700, fontSize: '0.92rem', margin: 0 }}>{lead.name}</h4>
                          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                            ₹{lead.estimatedValue.toLocaleString('en-IN')}
                          </span>
                        </div>

                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.75rem', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <Building2 size={12} /> {lead.company}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <Phone size={12} /> {lead.phone}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--primary-blue)', fontWeight: 600 }}>
                            {lead.serviceInterested}
                          </div>
                        </div>

                        {/* Card Footer Actions */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                          <button
                            onClick={() => setShowQuoteModal(lead)}
                            className="btn btn-sm btn-outline"
                            style={{ fontSize: '0.72rem', padding: '0.3rem 0.6rem' }}
                          >
                            <FileText size={12} /> Generate Quote
                          </button>

                          {/* Stage Transition Selector */}
                          <select
                            value={lead.stage}
                            onChange={(e) => updateLeadStage(lead.id, e.target.value as CRMLead['stage'])}
                            style={{
                              padding: '0.25rem 0.4rem',
                              fontSize: '0.72rem',
                              borderRadius: 'var(--radius-sm)',
                              border: '1px solid var(--border-color)',
                              background: '#fff'
                            }}
                          >
                            <option value="New">→ New</option>
                            <option value="Contacted">→ Contacted</option>
                            <option value="Proposal">→ Proposal</option>
                            <option value="Won">✓ Won</option>
                            <option value="Lost">✕ Lost</option>
                          </select>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ADD LEAD MODAL */}
        {showAddModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10, 25, 47, 0.7)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}>
            <div className="glass-card" style={{ maxWidth: '520px', width: '100%', padding: '2rem', background: '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: 'var(--primary-navy)' }}>
                  Add New Business Inquiry / Lead
                </h3>
                <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
              </div>

              <form onSubmit={handleCreateLead} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>Client Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Mahindra"
                    value={leadName}
                    onChange={e => setLeadName(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>Company / Firm</label>
                    <input
                      type="text"
                      placeholder="e.g. Mahindra Tech Ventures"
                      value={company}
                      onChange={e => setCompany(e.target.value)}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>Service of Interest</label>
                  <select
                    value={serviceInterested}
                    onChange={e => setServiceInterested(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
                  >
                    <option value="Pvt Ltd Company Incorporation">Pvt Ltd Company Incorporation</option>
                    <option value="GST Registration & Monthly Filing">GST Registration & Monthly Filing</option>
                    <option value="Enterprise CCTV Surveillance Setup">Enterprise CCTV Surveillance Setup</option>
                    <option value="Custom E-Commerce & Web Portal">Custom E-Commerce & Web Portal</option>
                    <option value="ERP & Accounting Migration">ERP & Accounting Migration</option>
                    <option value="Trademark & IP Registration">Trademark & IP Registration</option>
                    <option value="Civil Architecture & Turnkey Construction">Civil Architecture & Turnkey Construction</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>Estimated Value (₹)</label>
                    <input
                      type="number"
                      min="500"
                      value={value}
                      onChange={e => setValue(Number(e.target.value))}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>Assigned Executive</label>
                    <select
                      value={assignedTo}
                      onChange={e => setAssignedTo(e.target.value)}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
                    >
                      <option value="Rahul Saxena">Rahul Saxena (Senior CRM)</option>
                      <option value="Sunita Mishra">Sunita Mishra (Legal Lead)</option>
                      <option value="Vikram Jadhav">Vikram Jadhav (IT Specialist)</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                  <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline">Cancel</button>
                  <button type="submit" className="btn btn-primary">Save Lead to Pipeline</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* SECTION 73: UNIVERSAL QUOTE GENERATOR MODAL */}
        {showQuoteModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10, 25, 47, 0.7)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}>
            <div className="glass-card" style={{ maxWidth: '580px', width: '100%', padding: '2rem', background: '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div>
                  <span className="badge badge-gold" style={{ fontSize: '0.7rem' }}>SECTION 73 UNIVERSAL QUOTE ENGINE</span>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '4px 0 0', color: 'var(--primary-navy)' }}>
                    Commercial Proposal for {showQuoteModal.name}
                  </h3>
                </div>
                <button onClick={() => setShowQuoteModal(null)} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
              </div>

              <div style={{
                background: 'var(--bg-light)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                marginBottom: '1.25rem',
                border: '1px solid var(--border-color)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Service Package:</span>
                  <strong>{showQuoteModal.serviceInterested}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Base Commercial Price:</span>
                  <strong>₹{showQuoteModal.estimatedValue.toLocaleString('en-IN')}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', alignItems: 'center' }}>
                  <span>Promotional Discount (%):</span>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={quoteDiscount}
                    onChange={e => setQuoteDiscount(Number(e.target.value))}
                    style={{ width: '70px', padding: '0.3rem', textAlign: 'center', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Statutory GST (18%):</span>
                  <strong>₹{Math.round(((showQuoteModal.estimatedValue * (100 - quoteDiscount)) / 100) * 0.18).toLocaleString('en-IN')}</strong>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '0.75rem',
                  borderTop: '2px dashed var(--border-color)',
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  color: 'var(--primary-navy)'
                }}>
                  <span>Final Quotation Payable:</span>
                  <span style={{ color: 'var(--primary-blue)' }}>
                    ₹{Math.round(((showQuoteModal.estimatedValue * (100 - quoteDiscount)) / 100) * 1.18).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {quoteSent ? (
                <div style={{ textAlign: 'center', padding: '1rem', color: '#10B981', fontWeight: 700 }}>
                  ✓ Official PDF Quote Dispatched to {showQuoteModal.phone} & {showQuoteModal.email}!
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <button onClick={() => setShowQuoteModal(null)} className="btn btn-outline">Cancel</button>
                  <button onClick={() => handleSendQuote(showQuoteModal)} className="btn btn-primary">
                    <Send size={16} /> Transmit Quote to Customer
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
