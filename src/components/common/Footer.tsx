import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  HeartHandshake, 
  Building2, 
  ExternalLink,
  Lock
} from 'lucide-react';
import { useApp } from '../../store/AppContext';

export const Footer: React.FC = () => {
  const { language } = useApp();

  return (
    <footer style={{
      background: '#071324',
      color: '#CBD5E1',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      paddingTop: '4rem',
      paddingBottom: '5rem', // padding for mobile bottom bar
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative top accent line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, #1D4ED8 0%, #F59E0B 50%, #1D4ED8 100%)',
      }} />

      <div className="container-wide">
        {/* Trust Badges Strip */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          paddingBottom: '3rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          marginBottom: '3rem',
        }}>
          {[
            { title: 'Data Privacy Architecture', desc: 'Designed for statutory compliance, data isolation & access controls' },
            { title: 'Pan-India VLE Network', desc: 'Assisted digital service center network serving tier 1 to tier 4' },
            { title: 'Transparent Pricing', desc: 'Zero hidden charges with itemized statutory government fees' },
            { title: 'Quantum AI Powered', desc: 'AI-assisted intake workflows, smart routing & live tracking' },
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(29, 78, 216, 0.15)',
                border: '1px solid rgba(29, 78, 216, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#3B82F6',
                flexShrink: 0,
              }}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#FFFFFF' }}>{item.title}</div>
                <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '0.2rem' }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* 5-Column Sitemap */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '2rem',
          marginBottom: '3.5rem',
        }}>
          {/* Brand Col */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #1D4ED8 0%, #0A192F 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#F59E0B',
                fontFamily: 'Outfit',
                fontWeight: 900,
                fontSize: '1.2rem',
                border: '1px solid #F59E0B',
              }}>
                AD
              </div>
              <div>
                <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.1rem', color: '#FFFFFF' }}>
                  AKUL DRAVIN
                </div>
                <div style={{ fontSize: '0.65rem', color: '#60A5FA', letterSpacing: '0.1em' }}>
                  DIGITAL SERVICES
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.82rem', color: '#94A3B8', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              “हर काम डिजिटल • हर समाधान एक जगह”
              <br />
              India's Next-Generation Digital Service & Business Operating Platform.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#CBD5E1' }}>
                <Phone size={14} color="#F59E0B" />
                <span>Toll-Free: 1800-890-AKUL (2585)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#CBD5E1' }}>
                <Mail size={14} color="#60A5FA" />
                <span>support@akuldravin.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#CBD5E1' }}>
                <Clock size={14} color="#10B981" />
                <span>Mon - Sun: 08:00 AM - 10:00 PM</span>
              </div>
            </div>
          </div>

          {/* Citizen & Cyber Cafe */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Akul Dravin Digital Services (ADCS)
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.82rem' }}>
              <Link to="/digitalseva" style={{ color: '#38BDF8', fontWeight: 600 }}>ADCS Operator Console (VLE)</Link>
              <Link to="/connect/csc" style={{ color: '#4ADE80', fontWeight: 600 }}>ADCS Connect (OAuth SSO)</Link>
              <Link to="/csc" style={{ color: '#FCD34D', fontWeight: 600 }}>ADCS Sovereign Portal</Link>
              <Link to="/government" style={{ color: '#94A3B8', transition: 'color 0.15s' }}>Aadhaar & PAN Assistance</Link>
              <Link to="/government" style={{ color: '#94A3B8' }}>Passport Appointments</Link>
              <Link to="/government" style={{ color: '#94A3B8' }}>Birth, Caste & Domicile</Link>
              <Link to="/government" style={{ color: '#94A3B8' }}>E-Shram & Labour Schemes</Link>
              <Link to="/cyber-cafe" style={{ color: '#94A3B8' }}>Cyber Café PC Booking</Link>
              <Link to="/cyber-cafe" style={{ color: '#94A3B8' }}>Color Print & Xerox Counter</Link>
              <Link to="/documents" style={{ color: '#94A3B8' }}>Customer Document Vault</Link>
              <Link to="/bills" style={{ color: '#94A3B8' }}>BBPS Utility Bill Payments</Link>
            </div>
          </div>

          {/* Business & Corporate */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Business & Legal
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.82rem' }}>
              <Link to="/business" style={{ color: '#94A3B8' }}>Pvt Ltd & LLP Incorporation</Link>
              <Link to="/business" style={{ color: '#94A3B8' }}>GST Registration & Filing</Link>
              <Link to="/business" style={{ color: '#94A3B8' }}>MSME / Udyam Certificate</Link>
              <Link to="/business" style={{ color: '#94A3B8' }}>Class 3 DSC & E-Sign</Link>
              <Link to="/business" style={{ color: '#94A3B8' }}>Accounting & Bookkeeping</Link>
              <Link to="/crm" style={{ color: '#94A3B8' }}>Business CRM Suite</Link>
              <Link to="/hrms" style={{ color: '#94A3B8' }}>HRMS & Payroll System</Link>
              <Link to="/erp" style={{ color: '#94A3B8' }}>ERP & Inventory Ledgers</Link>
            </div>
          </div>

          {/* Property, CCTV & Logistics */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Real Estate & Infra
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.82rem' }}>
              <Link to="/property" style={{ color: '#94A3B8' }}>Verified Property Marketplace</Link>
              <Link to="/rental" style={{ color: '#94A3B8' }}>Online Rent Agreements</Link>
              <Link to="/construction" style={{ color: '#94A3B8' }}>Turnkey Construction & BOQ</Link>
              <Link to="/construction" style={{ color: '#94A3B8' }}>2D / 3D Architectural Maps</Link>
              <Link to="/cctv" style={{ color: '#94A3B8' }}>Smart CCTV 4-Cam Packages</Link>
              <Link to="/courier" style={{ color: '#94A3B8' }}>Doorstep Courier Pickup</Link>
              <Link to="/finance" style={{ color: '#94A3B8' }}>Loans & Mudra Finance</Link>
              <Link to="/insurance" style={{ color: '#94A3B8' }}>Health & Motor Insurance</Link>
            </div>
          </div>

          {/* Franchise & Ecosystem */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Franchise & Portals
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.82rem' }}>
              <Link to="/franchise" style={{ color: '#F59E0B', fontWeight: 700 }}>Franchise Partnership (Apply)</Link>
              <Link to="/center/dashboard" style={{ color: '#94A3B8' }}>Digital Center (VLE) Portal</Link>
              <Link to="/cyber-cafe/operator" style={{ color: '#94A3B8' }}>Cyber Café Operator Console</Link>
              <Link to="/employee/dashboard" style={{ color: '#94A3B8' }}>Service Executive Queue</Link>
              <Link to="/partner/dashboard" style={{ color: '#94A3B8' }}>Technician & Partner Desk</Link>
              <Link to="/admin/dashboard" style={{ color: '#94A3B8' }}>Super Admin Portal</Link>
              <Link to="/locations" style={{ color: '#94A3B8' }}>Pan-India Branch Locator</Link>
              <Link to="/track" style={{ color: '#94A3B8' }}>Live Application Tracker</Link>
            </div>
          </div>

          {/* Vedic Astrology Suite */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FDE68A', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              वैदिक ज्योतिष (Astrology)
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.82rem' }}>
              <Link to="/astrology/kundli" style={{ color: '#F59E0B', fontWeight: 700 }}>मुफ़्त जन्म कुंडली (Kundli)</Link>
              <Link to="/astrology/matching" style={{ color: '#94A3B8' }}>36 गुण मिलान (Kundli Milan)</Link>
              <Link to="/astrology/rashifal" style={{ color: '#94A3B8' }}>दैनिक राशिफल (Horoscope)</Link>
              <Link to="/astrology/panchang" style={{ color: '#94A3B8' }}>वैदिक पंचांग एवं शुभ मुहूर्त</Link>
              <Link to="/astrology/astrologers" style={{ color: '#94A3B8' }}>सत्यापित ज्योतिषी परामर्श</Link>
              <Link to="/astrology/store" style={{ color: '#94A3B8' }}>एस्ट्रो स्टोर (रत्न एवं रुद्राक्ष)</Link>
              <Link to="/astrology/tarot" style={{ color: '#94A3B8' }}>टैरो कार्ड एवं अंक ज्योतिष</Link>
              <Link to="/astrology/admin" style={{ color: '#94A3B8' }}>ज्योतिष एडमिन कंसोल</Link>
            </div>
          </div>
        </div>

        {/* Regulatory & Compliance Disclaimers */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '12px',
          padding: '1.25rem',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          fontSize: '0.74rem',
          color: '#94A3B8',
          lineHeight: 1.6,
          marginBottom: '2rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#F59E0B', fontWeight: 700, marginBottom: '0.4rem' }}>
            <Lock size={13} />
            <span>STATUTORY COMPLIANCE & LEGAL NOTICE:</span>
          </div>
          Akul Dravin Digital Services operates as an independent private enterprise and digital service aggregator. We provide assisted online filing, documentation, technical integration, and consultancy services. We are NOT a government ministry, authority, or official public agency. All trademarks, official logos, and statutory names (e.g. Aadhaar, PAN, GST, E-Shram, MCA) belong to their respective statutory owners. Regulated banking, lending, and insurance activities are facilitated strictly through licensed partner banks, NBFCs, and IRDAI-registered insurers without guaranteed approvals.
        </div>

        {/* Bottom copyright */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.78rem',
          color: '#64748B',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        }}>
          <div>
            © {new Date().getFullYear()} AKUL DRAVIN DIGITAL SERVICES PRIVATE LIMITED. All Rights Reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <Link to="/about" style={{ color: '#64748B' }}>Privacy Policy</Link>
            <Link to="/about" style={{ color: '#64748B' }}>Terms of Service</Link>
            <Link to="/about" style={{ color: '#64748B' }}>SLA Commitment</Link>
            <Link to="/contact" style={{ color: '#64748B' }}>Security Disclosure</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
