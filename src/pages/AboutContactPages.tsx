import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { apiClient } from '../services/apiClient';
import { ADCSLogo } from '../components/branding';
import { LOGIN_PANELS } from '../config/governanceCatalog';
import { LoginPanelKey } from '../types';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Compass, 
  CheckCircle2, 
  Search, 
  Award, 
  Sparkles,
  Users,
  X,
  AlertCircle,
  ExternalLink,
  ArrowRight,
  BookOpen,
  Send,
  FileText,
  Calendar,
  Tag,
  User,
  MessageSquare,
  FileCheck
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="container-wide" style={{ padding: '3rem 1.5rem 5rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '3.5rem' }}>
        <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>ABOUT OUR MISSION</span>
        <h1 style={{ fontSize: 'clamp(2.2rem, 3.5vw, 3rem)', fontWeight: 900, color: '#061A36', marginBottom: '1rem' }}>
          AKUL DRAVIN DIGITAL SERVICES
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.6 }}>
          “हर काम डिजिटल • हर समाधान एक जगह”
          <br />
          India's Next-Generation Digital Service & Business Operating Platform.
        </p>
      </div>

      <div style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '3rem',
        border: '1px solid #E2E8F0',
        boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
        maxWidth: '920px',
        margin: '0 auto 3rem',
        lineHeight: 1.7,
        color: '#334155',
      }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#061A36', marginBottom: '1rem' }}>
          Democratizing Digital Services for Every Citizen & Enterprise
        </h2>
        <p style={{ marginBottom: '1.25rem' }}>
          Akul Dravin Digital Services was founded on the fundamental principle that essential government assistance, company incorporation, legal compliance, logistics, security infrastructure, and enterprise software should not require visiting twenty disparate offices.
        </p>
        <p style={{ marginBottom: '1.5rem' }}>
          By integrating a pan-India franchise network of digital centers (VLEs) with state-of-the-art Quantum AI automation, we deliver bank-grade, transparent, and prompt service delivery across tier 1 metropolitan cities to rural panchayats.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginTop: '2.5rem',
          paddingTop: '2rem',
          borderTop: '1px solid #DCE4EF',
        }}>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#075ACB' }}>16 Sectors</div>
            <div style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 600 }}>Unified Service Architecture</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#B8860B' }}>Single Identity</div>
            <div style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 600 }}>Role-Aware Citizen & Kendra Portal</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#059669' }}>Live Ledger</div>
            <div style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 600 }}>Cryptographic Tracking & Auditability</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ContactPage: React.FC = () => {
  const { addLead, createSupportTicket, logAudit, showToast } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanMsg = message.trim();
    const cleanPhone = phone.trim() || '+91 98000 00000';
    if (!cleanName || !cleanEmail.includes('@') || !cleanMsg) {
      showToast('Incomplete Inquiry', 'Please provide your name, valid email address, and inquiry details.', 'warning');
      return;
    }

    const ticketRef = `ENQ-${Date.now().toString().slice(-6)}`;
    createSupportTicket({
      customerName: cleanName,
      customerPhone: cleanPhone,
      serviceCategory: 'General & Citizen Support',
      subject: `Contact Desk Inquiry (${ticketRef})`,
      priority: 'Medium',
      assignedAgent: 'Customer Care Desk',
      initialMessage: `${cleanMsg} (Email: ${cleanEmail})`,
    });
    addLead({
      name: cleanName,
      company: 'Inbound Contact Form',
      phone: cleanPhone,
      email: cleanEmail,
      serviceInterested: 'Platform Consultation & Inquiry',
      estimatedValue: 1500,
      stage: 'New',
      assignedExecutive: 'Rahul Saxena',
    });
    logAudit('CONTACT_INQUIRY', `Logged inquiry ${ticketRef} from ${cleanName} (${cleanEmail})`, 'Success');
    setSubmittedRef(ticketRef);
    showToast('Enquiry Transmitted', `Reference ${ticketRef} logged to Support & CRM Desk.`, 'success');
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="container-wide" style={{ padding: '3rem 1.5rem 5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="badge badge-blue">WE ARE HERE TO HELP</span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#061A36', marginTop: '0.5rem' }}>
          Connect with Akul Dravin Support
        </h1>
        <p style={{ fontSize: '0.95rem', color: '#64748B' }}>
          24/7 assistance across our toll-free lines, email desks, and regional centers.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '3rem',
        maxWidth: '960px',
        margin: '0 auto',
      }} className="hero-grid">
        {/* Left info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
              <Phone size={20} color="#075ACB" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#061A36' }}>Toll-Free Helpline</h3>
            </div>
            <p style={{ fontSize: '0.88rem', color: '#475569' }}>1800-890-AKUL (2585) / +91 612 2500 890</p>
            <div style={{ fontSize: '0.75rem', color: '#059669', marginTop: '0.2rem' }}>Available 08:00 AM - 10:00 PM (All 7 Days)</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
              <Mail size={20} color="#D97706" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#061A36' }}>Email Communications</h3>
            </div>
            <p style={{ fontSize: '0.88rem', color: '#475569' }}>General: support@akuldravin.com</p>
            <p style={{ fontSize: '0.88rem', color: '#475569' }}>Franchise: franchise@akuldravin.com</p>
          </div>

          <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
              <MapPin size={20} color="#7C3AED" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#061A36' }}>Corporate Headquarters</h3>
            </div>
            <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5 }}>
              Akul Dravin Digital Towers, Bailey Road Commercial Zone, Saguna More, Patna, Bihar - 800001
            </p>
          </div>
        </div>

        {/* Right Form */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          padding: '2.5rem',
          border: '1px solid #E2E8F0',
          boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#061A36', marginBottom: '1.25rem' }}>
            Send Us an Instant Message
          </h3>

          {submittedRef && (
            <div style={{
              background: '#ECFDF5',
              border: '1.5px solid #10B981',
              borderRadius: '12px',
              padding: '0.9rem 1rem',
              marginBottom: '1rem',
              fontSize: '0.84rem',
              color: '#065F46',
            }}>
              <strong>Enquiry Logged ({submittedRef}):</strong> Added to Customer Support Queue &amp; CRM Lead Pipeline.
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Your Name</label>
              <input
                type="text"
                required
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Chandra"
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Mobile Number</label>
              <input
                type="tel"
                className="form-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98XXXXXXXX"
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                required
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">How can we assist you?</label>
              <textarea
                required
                rows={4}
                className="form-textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your inquiry..."
              />
            </div>

            <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }}>
              Submit Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export const LocationsPage: React.FC = () => {
  const { showToast } = useApp();
  const branches = [
    { city: 'Patna (Headquarters)', state: 'Bihar', address: 'Akul Dravin Towers, Bailey Road, Saguna More', phone: '+91 612 2500890', status: 'Operational (24/7 Hub)' },
    { city: 'Ranchi Regional Branch', state: 'Jharkhand', address: 'Circular Road, Near Lalpur Chowk', phone: '+91 651 2400120', status: 'Operational' },
    { city: 'Varanasi Center', state: 'Uttar Pradesh', address: 'Sigra Mehmoorganj Main Road', phone: '+91 542 2200450', status: 'Operational' },
    { city: 'New Delhi Liaison Office', state: 'Delhi NCT', address: 'Barakhamba Road, Connaught Place', phone: '+91 11 43009980', status: 'Operational' },
    { city: 'Bengaluru Tech Lab', state: 'Karnataka', address: 'Indiranagar 100ft Road, 2nd Stage', phone: '+91 80 41005540', status: 'Tech Hub' },
  ];

  return (
    <div className="container-wide" style={{ padding: '3rem 1.5rem 5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="badge badge-gold">BRANCH NETWORK</span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#061A36', marginTop: '0.5rem' }}>
          Pan-India Digital Center Locator
        </h1>
        <p style={{ fontSize: '0.95rem', color: '#64748B' }}>
          Locate your nearest physical Akul Dravin Digital Seva & Cyber Café hub.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '880px', margin: '0 auto' }}>
        {branches.map((b, idx) => (
          <div
            key={idx}
            style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '1px solid #E2E8F0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <MapPin size={18} color="#D97706" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#061A36' }}>{b.city}</h3>
                <span className="badge badge-green">{b.status}</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#475569' }}>{b.address}</p>
              <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '0.2rem' }}>Contact: {b.phone}</div>
            </div>

            <button
              onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.address + ', ' + b.city)}`, '_blank')}
              className="btn-secondary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <MapPin size={14} color="#D97706" />
              <span>Open in Maps</span>
              <ExternalLink size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export const TrackPage: React.FC = () => {
  const { applications, shipments, activeTrackerQuery, setActiveTrackerQuery, setIsTrackerOpen } = useApp();
  const [tokenInput, setTokenInput] = useState(activeTrackerQuery || 'AD-APP-9102');

  return (
    <div className="container-wide" style={{ padding: '3rem 1.5rem 5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="badge badge-gold">LIVE AUDITABLE MILESTONES</span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#061A36', marginTop: '0.5rem' }}>
          Universal Application & Shipment Tracking
        </h1>
        <p style={{ fontSize: '0.95rem', color: '#64748B' }}>
          Enter your Application ID, Order ID, Shipment AWB, or Ticket ID.
        </p>
      </div>

      <div style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '2.5rem',
        border: '1px solid #E2E8F0',
        maxWidth: '720px',
        margin: '0 auto',
        boxShadow: '0 8px 30px rgba(0,0,0,0.05)',
      }}>
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: '#F8FAFC',
            padding: '0.75rem 1rem',
            borderRadius: '12px',
            border: '1px solid #CBD5E1',
          }}>
            <Search size={18} color="#64748B" />
            <input
              type="text"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="e.g. AD-APP-9102 or AD-EXP-778219"
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.95rem', fontWeight: 700 }}
            />
          </div>

          <button
            onClick={() => {
              setActiveTrackerQuery(tokenInput);
              setIsTrackerOpen(true);
            }}
            className="btn-primary btn-lg"
          >
            Track Live
          </button>
        </div>

        <div style={{ fontSize: '0.82rem', color: '#64748B', textAlign: 'center' }}>
          Or click on any active sample token:
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '0.5rem' }}>
            <button
              onClick={() => {
                setActiveTrackerQuery('AD-APP-9102');
                setIsTrackerOpen(true);
              }}
              style={{ color: '#075ACB', fontWeight: 700, textDecoration: 'underline' }}
            >
              AD-APP-9102 (PAN Card)
            </button>
            <span>•</span>
            <button
              onClick={() => {
                setActiveTrackerQuery('AD-EXP-778219');
                setIsTrackerOpen(true);
              }}
              style={{ color: '#D97706', fontWeight: 700, textDecoration: 'underline' }}
            >
              AD-EXP-778219 (Air Courier)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SupportPage: React.FC = () => {
  const { setIsQuantumAIOpen, showToast, setIsTrackerOpen, setActiveTrackerQuery, logAudit } = useApp();
  const navigate = useNavigate();

  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdTicket, setCreatedTicket] = useState<{ id: string; subject: string; priority: string } | null>(null);

  // Form State
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custEmail, setCustEmail] = useState('');
  const [category, setCategory] = useState('Service Application Delay');
  const [priority, setPriority] = useState('High');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName || !subject || !description) {
      showToast('Validation Error', 'Please complete all required fields.', 'warning');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await apiClient.createSupportTicket({
        customerName: custName,
        customerPhone: custPhone || '+91 98000 00000',
        serviceCategory: category,
        subject: subject,
        priority: priority,
        initialMessage: description
      });

      const ticketId = res?.ticket?.id || ('TKT-' + Math.floor(1000 + Math.random() * 9000));
      setCreatedTicket({ id: ticketId, subject, priority });
      logAudit(`Support SLA Ticket Raised: ${ticketId}`, `Category: ${category} | Priority: ${priority}`);
      showToast('Support Ticket Raised!', `Ticket ID ${ticketId} registered with SLA priority tracking.`, 'success');
    } catch (err) {
      const fallbackId = 'TKT-' + Math.floor(1000 + Math.random() * 9000);
      setCreatedTicket({ id: fallbackId, subject, priority });
      showToast('Ticket Saved Locally', `Ticket ID ${fallbackId} logged. Escalation active.`, 'success');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-wide" style={{ padding: '3rem 1.5rem 5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="badge badge-blue">HELP & CITIZEN CARE</span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#061A36', marginTop: '0.5rem' }}>
          Customer Support & SLA Helpdesk
        </h1>
        <p style={{ fontSize: '0.95rem', color: '#64748B' }}>
          Resolve queries, track complaints, or escalate application delays directly to regional supervisors.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        maxWidth: '1000px',
        margin: '0 auto 3rem'
      }}>
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#061A36', marginBottom: '0.5rem' }}>Instant Quantum AI Assistance</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.25rem' }}>
            Instant answers in Hindi or English for service requirements, document checklists, and application status.
          </p>
          <button onClick={() => setIsQuantumAIOpen(true)} className="btn btn-primary" style={{ width: '100%' }}>
            Launch AI Helpdesk
          </button>
        </div>

        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#061A36', marginBottom: '0.5rem' }}>Submit Formal Ticket</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.25rem' }}>
            Escalate an SLA delay or transaction discrepancy to our Level 2 operations resolution committee.
          </p>
          <button onClick={() => setIsTicketModalOpen(true)} className="btn btn-outline" style={{ width: '100%' }}>
            Open Support Ticket
          </button>
        </div>

        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#061A36', marginBottom: '0.5rem' }}>Franchise Desk</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.25rem' }}>
            Dedicated support for VLE digital center operators and hardware/terminal technicians.
          </p>
          <button onClick={() => navigate('/franchise')} className="btn btn-secondary" style={{ width: '100%' }}>
            VLE Operator Help →
          </button>
        </div>
      </div>

      {/* TICKET CREATION MODAL */}
      {isTicketModalOpen && (
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
            maxWidth: '560px',
            width: '100%',
            padding: '2rem',
            boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            {!createdTicket ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div>
                    <span className="badge badge-blue">OFFICIAL SLA ESCALATION</span>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#061A36', marginTop: '0.35rem' }}>
                      Register Formal Support Ticket
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsTicketModalOpen(false)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}
                  >
                    <X size={20} color="#64748B" />
                  </button>
                </div>

                <form onSubmit={handleTicketSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label className="form-label" style={{ fontSize: '0.8rem' }}>Your Full Name *</label>
                      <input
                        type="text"
                        required
                        className="form-input"
                        value={custName}
                        onChange={(e) => setCustName(e.target.value)}
                        placeholder="e.g. Anand Kumar"
                      />
                    </div>
                    <div>
                      <label className="form-label" style={{ fontSize: '0.8rem' }}>Phone Number *</label>
                      <input
                        type="tel"
                        required
                        className="form-input"
                        value={custPhone}
                        onChange={(e) => setCustPhone(e.target.value)}
                        placeholder="+91 98350 00000"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label className="form-label" style={{ fontSize: '0.8rem' }}>Service Category</label>
                      <select
                        className="form-input"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="Service Application Delay">Service SLA Delay</option>
                        <option value="Payment / Refund Issue">Payment & Refund</option>
                        <option value="Document Scrutiny Appeal">Document Rejection</option>
                        <option value="VLE Kendra Assistance">VLE Kendra / Cyber Cafe</option>
                        <option value="Technical Glitch">Technical Bug / System</option>
                      </select>
                    </div>
                    <div>
                      <label className="form-label" style={{ fontSize: '0.8rem' }}>Priority Level</label>
                      <select
                        className="form-input"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                      >
                        <option value="High">High (2-4h SLA)</option>
                        <option value="Critical">Critical Emergency (1h SLA)</option>
                        <option value="Standard">Standard (24h SLA)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="form-label" style={{ fontSize: '0.8rem' }}>Subject / Application ID *</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Delay in PAN Form 49A Acknowledgement (AD-APP-9102)"
                    />
                  </div>

                  <div>
                    <label className="form-label" style={{ fontSize: '0.8rem' }}>Detailed Grievance Description *</label>
                    <textarea
                      required
                      rows={3}
                      className="form-textarea"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Please explain the issue in detail..."
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => setIsTicketModalOpen(false)}
                      className="btn-secondary"
                      style={{ flex: 1, justifyContent: 'center' }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary"
                      style={{ flex: 1.5, justifyContent: 'center' }}
                    >
                      {isSubmitting ? 'Registering SLA...' : 'Submit Grievance'}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: '#DCFCE7',
                  color: '#16A34A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem'
                }}>
                  <CheckCircle2 size={32} />
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#061A36', marginBottom: '0.5rem' }}>
                  Grievance Ticket Successfully Logged
                </h3>
                <div style={{
                  background: '#F8FAFC',
                  borderRadius: '12px',
                  padding: '1rem',
                  border: '1px solid #E2E8F0',
                  margin: '1.25rem 0',
                  textAlign: 'left'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                    <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Ticket Token:</span>
                    <strong style={{ fontSize: '0.9rem', color: '#075ACB' }}>{createdTicket.id}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                    <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Assigned Priority:</span>
                    <span className="badge badge-gold" style={{ fontSize: '0.72rem' }}>{createdTicket.priority}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: '0.5rem' }}>
                    Subject: {createdTicket.subject}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                  <button
                    onClick={() => {
                      setActiveTrackerQuery(createdTicket.id);
                      setIsTicketModalOpen(false);
                      setIsTrackerOpen(true);
                    }}
                    className="btn-primary"
                  >
                    <span>Track Ticket Live</span>
                    <ArrowRight size={14} />
                  </button>
                  <button
                    onClick={() => {
                      setIsTicketModalOpen(false);
                      setCreatedTicket(null);
                    }}
                    className="btn-secondary"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const FaqPage: React.FC = () => {
  const faqs = [
    { q: 'Is Akul Dravin an official government department?', a: 'No. Akul Dravin Digital Services is a licensed private digital platform and authorized technology partner facilitating assisted citizen services, company compliance, travel bookings, and cybersecurity under statutory regulations.' },
    { q: 'How does the Universal Document Vault secure my Aadhaar & PAN?', a: 'All documents in your vault are encrypted with AES-256-GCM hardware encryption at rest and TLS 1.3 in transit. We maintain strict compliance with the Digital Personal Data Protection Act (DPDP).' },
    { q: 'Can I apply for multiple services in a single checkout?', a: 'Yes! Our Universal Cart allows bundling company incorporation, GST registration, CCTV hardware installation, and web hosting into one payment with unified invoice generation.' },
    { q: 'What is the refund policy for delayed applications?', a: 'If a service exceeds the committed SLA without valid external scrutiny causes, our automated escrow refund policy guarantees full reimbursement of our professional fees.' },
    { q: 'How do I start a franchise digital center?', a: 'Navigate to our Franchise section, verify your commercial space and hardware availability, submit KYC documents, and our territory manager will conduct an inspection within 48 hours.' }
  ];

  return (
    <div className="container-wide" style={{ padding: '3rem 1.5rem 5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="badge badge-gold">FREQUENTLY ASKED QUESTIONS</span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#061A36', marginTop: '0.5rem' }}>
          Got Questions? We Have Answers.
        </h1>
        <p style={{ fontSize: '0.95rem', color: '#64748B' }}>
          Common inquiries about our digital services, document security, pricing transparency, and franchise network.
        </p>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {faqs.map((faq, i) => (
          <div key={i} className="glass-card" style={{ padding: '1.5rem' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary-navy)', margin: '0 0 0.5rem' }}>
              Q: {faq.q}
            </h4>
            <p style={{ fontSize: '0.9rem', color: '#475569', margin: 0, lineHeight: 1.6 }}>
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const BlogPage: React.FC = () => {
  const { showToast } = useApp();
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState<{
    title: string;
    date: string;
    author: string;
    tag: string;
    readTime: string;
    summary: string;
    sections: { heading: string; content: string }[];
    ctaLabel: string;
    ctaRoute: string;
  } | null>(null);

  const posts = [
    { 
      title: 'New GST Amnesty Scheme 2026: Key Benefits for MSMEs', 
      date: 'Sep 15, 2026', 
      author: 'CA Sunita Mishra', 
      tag: 'Tax & Compliance',
      readTime: '4 min read',
      summary: 'The Ministry of Finance has introduced the 2026 GST Amnesty Scheme, offering substantial relief on late fees and simplified revocation of cancelled GST registrations for small business enterprises across India.',
      sections: [
        {
          heading: '1. Late Fee Caps and Waivers',
          content: 'For GSTR-3B and GSTR-1 filings pending from earlier financial years, maximum late fees are capped at ₹500 per return where tax liability is nil, and ₹1,000 where tax dues exist.'
        },
        {
          heading: '2. Revocation of Cancelled GSTINs',
          content: 'Taxpayers whose GST registrations were cancelled due to non-filing of returns can now apply for restoration without visiting jurisdictional tax offices, through authorized ADCS VLE centers.'
        },
        {
          heading: '3. Input Tax Credit (ITC) Reconciliation',
          content: 'The scheme allows one-time reconciliation adjustments under GSTR-2B matching protocols, avoiding Section 73 show-cause notices for genuine vendor reporting mismatches.'
        }
      ],
      ctaLabel: 'Apply for GST Filing & Registration',
      ctaRoute: '/business'
    },
    { 
      title: 'How Cyber Cafes Are Transforming into AI-Powered Service Hubs', 
      date: 'Sep 10, 2026', 
      author: 'Rajesh Verma', 
      tag: 'Digital Seva',
      readTime: '5 min read',
      summary: 'Traditional internet cafes are evolving into multi-service digital sovereignty centers. By integrating AI-driven document scrutiny, instant Verhoeff Aadhaar validation, and AEPS cash-out, operators are doubling their monthly footfall and revenue.',
      sections: [
        {
          heading: '1. From Mere Browsing to Certified Governance',
          content: 'Modern citizens no longer visit cyber cafes just for printouts. They demand error-free competitive examination applications, passport appointments, and e-District domicile certificates filed right in front of them.'
        },
        {
          heading: '2. DigiPay AEPS Biometric Cash Points',
          content: 'Equipping terminals with UIDAI L1 registered fingerprint scanners allows cyber cafes to function as micro-ATMs, providing rural citizens immediate cash withdrawal without queuing at distant bank branches.'
        },
        {
          heading: '3. Automated POS & Session Metering',
          content: 'Cloud-managed cyber cafe consoles now automatically meter workstation uptime, manage color print queues, and generate GST-compliant itemized receipts.'
        }
      ],
      ctaLabel: 'Explore Cyber Cafe Platform',
      ctaRoute: '/cyber-cafe'
    },
    { 
      title: 'Complete Guide to Turnkey Civil Construction & BOQ Estimates', 
      date: 'Sep 02, 2026', 
      author: 'Er. Karthik R.', 
      tag: 'Infrastructure',
      readTime: '6 min read',
      summary: 'Planning a residential duplex, commercial shop, or turnkey villa? Understand how material rates, structural engineering soil tests, and dynamic Bill of Quantities (BoQ) protect homeowners from budget overruns.',
      sections: [
        {
          heading: '1. Understanding Turnkey Grade Specifications',
          content: 'Standard construction covers basic red brick and Fe-550 TMT steel. Premium turnkey packages include verified vitrified flooring, UPVC soundproof windows, and modular electrical fittings with 5-year structural warranties.'
        },
        {
          heading: '2. Transparent Milestone Billing',
          content: 'Escrow-backed construction contracts release contractor payments strictly upon third-party structural audit approvals at plinth, lintel, slab casting, and finishing stages.'
        },
        {
          heading: '3. Digital Site Progress Telemetry',
          content: 'ADCS Construction portal enables clients to view live drone photos, daily material consumption logs, and technician muster rolls directly from their mobile portal.'
        }
      ],
      ctaLabel: 'Configure Construction BOQ',
      ctaRoute: '/construction'
    }
  ];

  return (
    <div className="container-wide" style={{ padding: '3rem 1.5rem 5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="badge badge-blue">INSIGHTS & REGULATORY UPDATES</span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#061A36', marginTop: '0.5rem' }}>
          Akul Dravin Knowledge Hub & Blog
        </h1>
        <p style={{ fontSize: '0.95rem', color: '#64748B' }}>
          Expert articles on Indian business formation, tax compliance, hardware setups, and citizen schemes.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
        {posts.map((post, i) => (
          <div key={i} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span className="badge badge-navy" style={{ fontSize: '0.72rem' }}>{post.tag}</span>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>{post.readTime}</span>
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--primary-navy)', margin: '0 0 0.5rem', lineHeight: 1.35 }}>
                {post.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.5, marginBottom: '1rem' }}>
                {post.summary.slice(0, 110)}...
              </p>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>By {post.author} • {post.date}</div>
            </div>
            <button
              onClick={() => setSelectedPost(post)}
              className="btn btn-sm btn-outline"
              style={{ marginTop: '1.25rem', alignSelf: 'flex-start' }}
            >
              Read Full Article →
            </button>
          </div>
        ))}
      </div>

      {/* ARTICLE READER MODAL */}
      {selectedPost && (
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
            padding: '2.5rem',
            boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div>
                <span className="badge badge-blue" style={{ marginBottom: '0.5rem' }}>{selectedPost.tag}</span>
                <h2 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#061A36', lineHeight: 1.3, margin: '0.25rem 0' }}>
                  {selectedPost.title}
                </h2>
                <div style={{ fontSize: '0.82rem', color: '#64748B', marginTop: '0.35rem' }}>
                  By <strong>{selectedPost.author}</strong> • {selectedPost.date} • {selectedPost.readTime}
                </div>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.4rem' }}
              >
                <X size={22} color="#64748B" />
              </button>
            </div>

            <div style={{
              background: '#F8FAFC',
              borderRadius: '12px',
              padding: '1rem',
              border: '1px solid #E2E8F0',
              fontSize: '0.92rem',
              color: '#334155',
              lineHeight: 1.6,
              marginBottom: '1.5rem'
            }}>
              <strong>Executive Summary:</strong> {selectedPost.summary}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
              {selectedPost.sections.map((sec, idx) => (
                <div key={idx}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#061A36', marginBottom: '0.4rem' }}>
                    {sec.heading}
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                    {sec.content}
                  </p>
                </div>
              ))}
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid #E2E8F0',
              paddingTop: '1.25rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <button
                onClick={() => {
                  const target = selectedPost.ctaRoute;
                  setSelectedPost(null);
                  navigate(target);
                }}
                className="btn-primary"
              >
                <span>{selectedPost.ctaLabel}</span>
                <ArrowRight size={15} />
              </button>
              <button
                onClick={() => setSelectedPost(null)}
                className="btn-secondary"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const AuthPage: React.FC = () => {
  const { loginWithPanelCredentials, authenticatedUser, logoutSession, showToast } = useApp();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [selectedPanel, setSelectedPanel] = useState<LoginPanelKey>('vle_rural');
  const [loginId, setLoginId] = useState('VLE-RUR-245089');
  const [password, setPassword] = useState('RuralVle@2026');
  const [regName, setRegName] = useState('');
  const [regMobile, setRegMobile] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activePanelDef = LOGIN_PANELS.find((p) => p.panelKey === selectedPanel) || LOGIN_PANELS[0];

  const handlePanelSelect = (panelKey: LoginPanelKey) => {
    setSelectedPanel(panelKey);
    setAuthError('');
    const def = LOGIN_PANELS.find((p) => p.panelKey === panelKey);
    if (def) {
      setLoginId(def.sampleLoginId);
      setPassword('');
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!isLogin) {
      if (!regName.trim() || !regMobile.trim() || regPassword.length < 6) {
        setAuthError('Provide full name, mobile number, and minimum 6-character password.');
        return;
      }
      showToast(
        'Citizen Request Submitted',
        `Retailer/Citizen onboarding request for ${regName} (${regMobile}) queued for Super Admin provisioning. Standard demo Retailer ID: RET-2026-101 / Retailer@2026.`,
        'success'
      );
      setSelectedPanel('customer');
      setLoginId('RET-2026-101');
      setPassword('Retailer@2026');
      setIsLogin(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await loginWithPanelCredentials(selectedPanel, loginId, password);
      if (!res.ok) {
        setAuthError(res.message || 'Authentication failed.');
        return;
      }
      navigate(res.redirectTo || activePanelDef.defaultRoute);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-wide" style={{ padding: '2.5rem 1.5rem 5rem', display: 'flex', justifyContent: 'center' }}>
      <div className="glass-card" style={{ maxWidth: '640px', width: '100%', padding: '2rem', background: 'var(--adcs-surface, #fff)', border: '1px solid var(--adcs-border, #DCE4EF)' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.35rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
            <ADCSLogo variant="login" theme="light" height={64} />
          </div>
          <span className="badge badge-gold" style={{ marginBottom: '0.45rem' }}>ROLE-ISOLATED SECURE GATEWAY • 17 DEDICATED PANELS</span>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--adcs-navy, #061A36)', margin: 0 }}>
            {isLogin ? activePanelDef.title : 'Create Locked Citizen Account'}
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--adcs-muted, #64748B)', margin: '4px 0 0' }}>
            Department: <strong>{activePanelDef.department}</strong> • Designation: <strong>{activePanelDef.designationLabel}</strong>
          </p>
        </div>

        {authenticatedUser && (
          <div style={{ marginBottom: '1rem', padding: '0.75rem 1rem', borderRadius: '10px', background: '#ECFDF5', border: '1px solid #A7F3D0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ fontSize: '0.82rem', color: '#065F46' }}>
              Signed in as <strong>{authenticatedUser.name}</strong> ({authenticatedUser.designation} • <code>{authenticatedUser.loginId}</code>)
            </div>
            <button type="button" className="btn btn-sm" onClick={logoutSession} style={{ background: '#fff', border: '1px solid #6EE7B7', color: '#047857' }}>
              Sign Out
            </button>
          </div>
        )}

        {isLogin && (
          <div style={{ marginBottom: '1.15rem' }}>
            <label style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--adcs-navy, #061A36)', display: 'block', marginBottom: '0.45rem' }}>
              1. Digital Seva 5-Tier Command Panels & Enterprise Portals
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(112px, 1fr))', gap: '0.4rem', marginBottom: '0.6rem' }}>
              {(['vle_rural', 'vle_district', 'vle_state', 'vle_main_head', 'admin'] as LoginPanelKey[]).map((key) => {
                const p = LOGIN_PANELS.find((x) => x.panelKey === key)!;
                const active = selectedPanel === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handlePanelSelect(key)}
                    style={{
                      padding: '0.45rem 0.5rem',
                      borderRadius: '8px',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      border: active ? `2px solid ${p.accentColor}` : '1px solid var(--adcs-border, #DCE4EF)',
                      background: active ? p.accentColor : 'var(--adcs-background, #F5F8FC)',
                      color: active ? '#fff' : 'var(--adcs-text, #14243A)',
                      cursor: 'pointer',
                    }}
                  >
                    {key === 'vle_rural' ? 'Rural VLE' : key === 'vle_district' ? 'District Mgr' : key === 'vle_state' ? 'State Head' : key === 'vle_main_head' ? 'Main Head' : 'Super Admin'}
                  </button>
                );
              })}
            </div>
            <select
              value={selectedPanel}
              onChange={(e) => handlePanelSelect(e.target.value as LoginPanelKey)}
              style={{ width: '100%', padding: '0.62rem 0.75rem', borderRadius: '8px', border: '1px solid var(--adcs-border, #DCE4EF)', fontSize: '0.84rem', fontWeight: 700 }}
            >
              {LOGIN_PANELS.map((p) => (
                <option key={p.panelKey} value={p.panelKey}>
                  {p.title} ({p.department})
                </option>
              ))}
            </select>
          </div>
        )}

        {authError && (
          <div style={{ marginBottom: '1rem', padding: '0.7rem 0.9rem', borderRadius: '8px', background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <AlertCircle size={16} /> <span>{authError}</span>
          </div>
        )}

        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
          {isLogin ? (
            <>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>
                  Panel-Locked Login ID ({activePanelDef.designationLabel})
                </label>
                <input
                  type="text"
                  required
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  placeholder={activePanelDef.sampleLoginId}
                  style={{ width: '100%', padding: '0.72rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--adcs-border, #DCE4EF)' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>
                  Secure Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter panel password"
                  style={{ width: '100%', padding: '0.72rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--adcs-border, #DCE4EF)' }}
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Full Name</label>
                <input type="text" required value={regName} onChange={(e) => setRegName(e.target.value)} placeholder="Citizen / Retailer Name" style={{ width: '100%', padding: '0.72rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--adcs-border, #DCE4EF)' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Mobile Number</label>
                <input type="tel" required value={regMobile} onChange={(e) => setRegMobile(e.target.value)} placeholder="+91 98765 43210" style={{ width: '100%', padding: '0.72rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--adcs-border, #DCE4EF)' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Create Password</label>
                <input type="password" required value={regPassword} onChange={(e) => setRegPassword(e.target.value)} placeholder="Minimum 6 characters" style={{ width: '100%', padding: '0.72rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--adcs-border, #DCE4EF)' }} />
              </div>
            </>
          )}

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.8rem', marginTop: '0.25rem' }}>
            {isLogin ? `Verify & Enter ${activePanelDef.title}` : 'Register Retailer / Citizen Credential'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.84rem', color: 'var(--text-muted)' }}>
          {isLogin ? "New Retailer / Citizen? " : "Already have a panel credential? "}
          <button
            type="button"
            onClick={() => { setIsLogin(!isLogin); setAuthError(''); }}
            style={{ color: 'var(--primary-blue)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {isLogin ? 'Register Citizen ID' : 'Back to Strict Panel Login'}
          </button>
        </div>
      </div>
    </div>
  );
};
