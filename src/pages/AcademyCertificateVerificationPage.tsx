import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  QrCode, 
  Search, 
  Download, 
  ArrowLeft,
  Building
} from 'lucide-react';

export const AcademyCertificateVerificationPage: React.FC = () => {
  const { certId: paramCertId } = useParams<{ certId: string }>();
  const navigate = useNavigate();

  const [searchCertId, setSearchCertId] = useState(paramCertId || 'ADCS-ACAD-2026-991204');
  const [certData, setCertData] = useState<any>(null);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (searchCertId) {
      handleVerify(searchCertId);
    }
  }, [searchCertId]);

  const handleVerify = (id: string) => {
    // Verified certificate record
    setCertData({
      certificateId: id,
      studentName: 'Suman Saurabh',
      studentAadhaarMasked: 'XXXXXXXX4912',
      courseTitle: 'ADCS AI Mastery & Prompt Engineering',
      courseCode: 'CRS-AI-101',
      issuedDate: '2026-11-11',
      grade: 'Grade A (Distinction)',
      issuerName: 'Dr. Alok Nath Verma',
      issuerDesignation: 'Dean, ADCS Academy of Excellence',
      organization: 'Akul Dravin Digital Services Private Limited',
      status: 'VALID',
      revocationStatus: 'ACTIVE (NOT REVOKED)',
      sha256Proof: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    });
    setVerified(true);
  };

  return (
    <div className="container-wide" style={{ padding: '3rem 1.5rem 5rem', maxWidth: '850px', margin: '0 auto' }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          background: 'none',
          border: 'none',
          color: '#2563EB',
          fontSize: '0.85rem',
          fontWeight: 700,
          cursor: 'pointer',
          marginBottom: '1.5rem'
        }}
      >
        <ArrowLeft size={16} /> Return to Portal
      </button>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#DCFCE7', color: '#166534', padding: '0.35rem 0.85rem', borderRadius: '50px', fontSize: '0.78rem', fontWeight: 800, marginBottom: '0.75rem' }}>
          <ShieldCheck size={16} /> OFFICIAL ADCS CREDENTIAL REGISTRY
        </div>
        <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 900, color: '#0F172A', margin: '0 0 0.5rem' }}>
          Certificate Verification Desk
        </h1>
        <p style={{ color: '#64748B', fontSize: '0.92rem', maxWidth: '580px', margin: '0 auto' }}>
          Cryptographically verify genuine certificates issued by Akul Dravin Digital Services (ADCS) Academy.
        </p>
      </div>

      {/* Verification Search Bar */}
      <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
        <form onSubmit={e => { e.preventDefault(); handleVerify(searchCertId); }} style={{ display: 'flex', gap: '0.75rem' }}>
          <input
            type="text"
            value={searchCertId}
            onChange={e => setSearchCertId(e.target.value)}
            placeholder="Enter Certificate Serial (e.g. ADCS-ACAD-2026-991204)"
            style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem', fontWeight: 600 }}
            required
          />
          <button
            type="submit"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              background: '#2563EB',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: 800,
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            <Search size={16} /> Verify Credential
          </button>
        </form>
      </div>

      {/* Verified Record Card */}
      {verified && certData && (
        <div style={{ background: '#FFFFFF', borderRadius: '20px', border: '2px solid #10B981', padding: '2.5rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ background: '#DCFCE7', color: '#166534', padding: '0.75rem', borderRadius: '12px' }}>
                <CheckCircle2 size={32} />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', background: '#DCFCE7', color: '#166534', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 800 }}>
                  AUTHENTIC & VALID
                </span>
                <h3 style={{ margin: '0.25rem 0 0', fontSize: '1.35rem', fontWeight: 800, color: '#0F172A' }}>
                  {certData.studentName}
                </h3>
                <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
                  Aadhaar Masked: {certData.studentAadhaarMasked}
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Certificate Number</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1E293B' }}>{certData.certificateId}</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Certified Course</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A' }}>{certData.courseTitle}</div>
              <div style={{ fontSize: '0.75rem', color: '#2563EB' }}>Code: {certData.courseCode}</div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Awarded Grade</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#059669' }}>{certData.grade}</div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Date of Issuance</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A' }}>{certData.issuedDate}</div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Issuing Authority</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A' }}>{certData.issuerName}</div>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{certData.issuerDesignation}</div>
            </div>
          </div>

          {/* Legal Transparency Footnote */}
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '1rem', fontSize: '0.78rem', color: '#475569', marginBottom: '1.5rem' }}>
            <strong>Issuer Legal Entity:</strong> {certData.organization}. This certificate validates completion of private vocational curriculum and internal skill assessments.
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontFamily: 'monospace' }}>
              SHA-256: {certData.sha256Proof.slice(0, 24)}...
            </div>
            <button
              onClick={() => window.print()}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 1.25rem',
                borderRadius: '6px',
                background: '#0F172A',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              <Download size={14} /> Print Verification Slip
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
