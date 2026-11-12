import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Phone, Mail, Clock, Lock } from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { ADCSLogo } from '../branding';
import { ADCS_BRAND_IDENTITY } from '../../config/brandAssets';

export const Footer: React.FC = () => {
  const { currentRole, whiteLabelConfig } = useApp();
  const showPrivilegedLinks = ['admin', 'finance', 'executive', 'employee'].includes(currentRole);

  return (
    <footer
      className="adcs-no-print"
      style={{
        background: '#031126',
        color: '#D4E0EE',
        borderTop: '3px solid #D6A12B',
        paddingTop: '3.5rem',
        paddingBottom: '5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container-wide">
        {/* Enterprise Trust Architecture Strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.35rem',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '2.75rem',
          }}
        >
          {[
            { title: 'Structured Data Isolation', desc: 'Role-based access boundaries and auditable document logs' },
            { title: 'Assisted Citizen Network', desc: 'Unified Kendra, cyber café, and enterprise digital counters' },
            { title: 'Transparent Billing', desc: 'Itemized ADCS service fees clearly separated from statutory charges' },
            { title: 'QUANTUM AI Workflows', desc: 'Guided intake checklists, status tracking, and verification' },
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(7, 90, 203, 0.22)',
                  border: '1px solid rgba(8, 120, 249, 0.45)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#F3D477',
                  flexShrink: 0,
                }}
              >
                <ShieldCheck size={19} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#FFFFFF' }}>{item.title}</div>
                <div style={{ fontSize: '0.78rem', color: '#A9BDD6', marginTop: '0.2rem' }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* 5-Column Sitemap with Official ADCS Logo */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem',
          }}
        >
          <div>
            <div style={{ marginBottom: '1rem' }}>
              <ADCSLogo variant="footer" theme="dark" customSrc={whiteLabelConfig.darkLogoUrl} height={78} />
            </div>
            <p style={{ fontSize: '0.82rem', color: '#CBD5E1', lineHeight: 1.6, marginBottom: '1.1rem' }}>
              <strong style={{ color: '#F3D477' }}>{whiteLabelConfig.brandName || ADCS_BRAND_IDENTITY.legalName}</strong>
              <br />
              {ADCS_BRAND_IDENTITY.sloganHindi}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.48rem', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={14} color="#F3D477" />
                <span>Helpline: {whiteLabelConfig.supportPhone || ADCS_BRAND_IDENTITY.supportPhone}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={14} color="#0878F9" />
                <span>{whiteLabelConfig.supportEmail || ADCS_BRAND_IDENTITY.supportEmail}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={14} color="#34D399" />
                <span>Mon - Sun: 08:00 AM - 10:00 PM</span>
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.86rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Citizen & Kendra Services
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.82rem' }}>
              <Link to="/digitalseva" style={{ color: '#F3D477', fontWeight: 600 }}>ADCS Operator Console (VLE)</Link>
              <Link to="/connect/csc" style={{ color: '#60A5FA', fontWeight: 600 }}>ADCS Connect (SSO)</Link>
              <Link to="/csc" style={{ color: '#A9BDD6' }}>ADCS Hub</Link>
              <Link to="/pan" style={{ color: '#A9BDD6' }}>PAN Application Assist</Link>
              <Link to="/government" style={{ color: '#A9BDD6' }}>Passport & Certificates</Link>
              <Link to="/cyber-cafe" style={{ color: '#A9BDD6' }}>Cyber Café & Print Station</Link>
              <Link to="/documents" style={{ color: '#A9BDD6' }}>Document Vault & Studio</Link>
              <Link to="/bills" style={{ color: '#A9BDD6' }}>Utility Bill Payments</Link>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.86rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Business & Enterprise
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.82rem' }}>
              <Link to="/business" style={{ color: '#A9BDD6' }}>Company & LLP Incorporation</Link>
              <Link to="/business" style={{ color: '#A9BDD6' }}>GST & MSME Filings</Link>
              <Link to="/crm" style={{ color: '#A9BDD6' }}>Business CRM Suite</Link>
              <Link to="/hrms" style={{ color: '#A9BDD6' }}>HRMS & Payroll Desk</Link>
              <Link to="/erp" style={{ color: '#A9BDD6' }}>ERP & GST Invoicing</Link>
              <Link to="/website-it" style={{ color: '#A9BDD6' }}>IT & Software Engineering</Link>
              <Link to="/consulting" style={{ color: '#A9BDD6' }}>Legal & Tax Advisory</Link>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.86rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Academy, Franchise & Portals
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.82rem' }}>
              <Link to="/franchise" style={{ color: '#F3D477', fontWeight: 700 }}>Franchise Partnership</Link>
              <Link to="/portal/student" style={{ color: '#60A5FA', fontWeight: 600 }}>ADCS Academy LMS</Link>
              <Link to="/verify-certificate" style={{ color: '#34D399', fontWeight: 600 }}>Verify Digital Certificate</Link>
              <Link to="/portal/advocate" style={{ color: '#A9BDD6' }}>Advocate Consultation</Link>
              <Link to="/portal/technician" style={{ color: '#A9BDD6' }}>Field Technician Dispatch</Link>
              <Link to="/track" style={{ color: '#A9BDD6' }}>Live Application Tracker</Link>
              {showPrivilegedLinks && (
                <Link to="/admin/dashboard" style={{ color: '#F3D477', fontWeight: 700 }}>Super Admin Control Tower</Link>
              )}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.86rem', fontWeight: 800, color: '#F3D477', marginBottom: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Infra, Realty & Astrology
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.82rem' }}>
              <Link to="/property" style={{ color: '#A9BDD6' }}>Verified Property Hub</Link>
              <Link to="/rental" style={{ color: '#A9BDD6' }}>Rent Agreements & Receipts</Link>
              <Link to="/construction" style={{ color: '#A9BDD6' }}>Construction & BOQ</Link>
              <Link to="/cctv" style={{ color: '#A9BDD6' }}>CCTV & Security Desk</Link>
              <Link to="/courier" style={{ color: '#A9BDD6' }}>Courier & Waybill Tracking</Link>
              <Link to="/astrology/kundli" style={{ color: '#F3D477', fontWeight: 600 }}>Vedic Janam Kundli</Link>
              <Link to="/astrology" style={{ color: '#A9BDD6' }}>Astrology Hub & Reports</Link>
            </div>
          </div>
        </div>

        {/* Statutory Separation & Compliance Notice */}
        <div
          style={{
            background: '#061A36',
            borderRadius: '10px',
            padding: '1.1rem 1.25rem',
            border: '1px solid rgba(214, 161, 43, 0.3)',
            fontSize: '0.75rem',
            color: '#CBD5E1',
            lineHeight: 1.65,
            marginBottom: '1.75rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#F3D477', fontWeight: 800, marginBottom: '0.35rem' }}>
            <Lock size={13} />
            <span>STATUTORY CLARITY & CREDENTIAL INTEGRITY NOTICE</span>
          </div>
          {ADCS_BRAND_IDENTITY.legalName} ({ADCS_BRAND_IDENTITY.shortName}) is an independent private enterprise platform providing assisted digital filing, documentation workflows, enterprise SaaS, and vocational academy credentials. ADCS is not a statutory government authority and never overlays ADCS branding onto government-issued documents (Aadhaar, PAN, Passport, e-District, or third-party certificates).
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.78rem',
            color: '#94A3B8',
            paddingTop: '1.25rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div>
            © {new Date().getFullYear()} {ADCS_BRAND_IDENTITY.legalName}. All Rights Reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <Link to="/about" style={{ color: '#CBD5E1' }}>About & Policy</Link>
            <Link to="/pricing" style={{ color: '#CBD5E1' }}>Fee Schedule</Link>
            <Link to="/verify-certificate" style={{ color: '#CBD5E1' }}>Credential Verification</Link>
            <Link to="/contact" style={{ color: '#CBD5E1' }}>Contact Desk</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
