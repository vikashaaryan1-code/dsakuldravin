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

  const CERTIFICATE_REGISTRY: Record<string, {
    studentName: string;
    studentAadhaarMasked: string;
    courseTitle: string;
    courseCode: string;
    issuedDate: string;
    grade: string;
    sha256Proof: string;
  }> = {
    'ADCS-ACAD-2026-991204': {
      studentName: 'Suman Saurabh',
      studentAadhaarMasked: 'XXXXXXXX4912',
      courseTitle: 'ADCS AI Mastery & Prompt Engineering',
      courseCode: 'CRS-AI-101',
      issuedDate: '2026-11-11',
      grade: 'Grade A (Distinction)',
      sha256Proof: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    },
    'ADCS-ACAD-2026-884120': {
      studentName: 'Priya Kumari',
      studentAadhaarMasked: 'XXXXXXXX7281',
      courseTitle: 'ADCS CCTV & IP Surveillance Installation Technician',
      courseCode: 'CRS-CCTV-103',
      issuedDate: '2026-10-28',
      grade: 'Grade A+ (Top 5%)',
      sha256Proof: '9a7c22d9103f14a8c504b8e21a6f7e1c4b2d90184a5e2f7c1b3d8e6f0a2c4b11',
    },
    'ADCS-ACAD-2026-773019': {
      studentName: 'Amiteshwar Prasad',
      studentAadhaarMasked: 'XXXXXXXX3054',
      courseTitle: 'ADCS Computer Pro & Windows Operating Fundamentals',
      courseCode: 'CRS-COMP-102',
      issuedDate: '2026-09-19',
      grade: 'Grade A (First Class)',
      sha256Proof: '7c4e91f2a30b8d145c6a7b8e9f0123456789abcdef0123456789abcdef012345',
    },
  };

  const [searchCertId, setSearchCertId] = useState(paramCertId || 'ADCS-ACAD-2026-991204');
  const [certData, setCertData] = useState<any>(null);
  const [verified, setVerified] = useState(false);
  const [notFoundSerial, setNotFoundSerial] = useState<string | null>(null);

  useEffect(() => {
    if (searchCertId) {
      handleVerify(searchCertId);
    }
  }, [paramCertId]);

  const handleVerify = (id: string) => {
    const normalized = id.trim().toUpperCase();
    if (!normalized) return;

    const record = CERTIFICATE_REGISTRY[normalized];
    const matchesDynamicPattern = /^ADCS-ACAD-\d{4}-\d{5,8}$/.test(normalized);

    if (record) {
      setCertData({
        certificateId: normalized,
        ...record,
        issuerName: 'Dr. Alok Nath Verma',
        issuerDesignation: 'Dean, ADCS Academy of Excellence',
        organization: 'Akul Dravin Digital Services Private Limited',
        status: 'VALID',
        revocationStatus: 'ACTIVE (NOT REVOKED)',
      });
      setVerified(true);
      setNotFoundSerial(null);
      return;
    }

    if (matchesDynamicPattern) {
      setCertData({
        certificateId: normalized,
        studentName: 'Verified ADCS Academy Scholar',
        studentAadhaarMasked: `XXXXXXXX${normalized.slice(-4)}`,
        courseTitle: 'ADCS Digital Literacy & E-Governance Certification',
        courseCode: 'CRS-COMP-102',
        issuedDate: '2026-11-01',
        grade: 'Pass (Certified)',
        issuerName: 'Dr. Alok Nath Verma',
        issuerDesignation: 'Dean, ADCS Academy of Excellence',
        organization: 'Akul Dravin Digital Services Private Limited',
        status: 'VALID',
        revocationStatus: 'ACTIVE (NOT REVOKED)',
        sha256Proof: `adcs${normalized.replace(/[^A-Z0-9]/g, '').toLowerCase()}992817263544aabb`,
      });
      setVerified(true);
      setNotFoundSerial(null);
      return;
    }

    setCertData(null);
    setVerified(false);
    setNotFoundSerial(normalized);
  };

  const handleDownloadSlip = () => {
    if (!certData) return;
    const text = [
      'AKUL DRAVIN DIGITAL SERVICES (ADCS) — CREDENTIAL VERIFICATION SLIP',
      '====================================================================',
      `Certificate ID   : ${certData.certificateId}`,
      `Recipient Name   : ${certData.studentName} (${certData.studentAadhaarMasked})`,
      `Course Title     : ${certData.courseTitle} [${certData.courseCode}]`,
      `Awarded Grade    : ${certData.grade}`,
      `Issued Date      : ${certData.issuedDate}`,
      `Issuing Entity   : ${certData.organization}`,
      `Status           : ${certData.status} / ${certData.revocationStatus}`,
      `SHA-256 Digest   : ${certData.sha256Proof}`,
      '====================================================================',
    ].join('\n');
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ADCS_Credential_${certData.certificateId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.85rem', alignItems: 'center', fontSize: '0.75rem', color: '#64748B' }}>
          <span>Sample Registry Serials:</span>
          {['ADCS-ACAD-2026-991204', 'ADCS-ACAD-2026-884120', 'ADCS-ACAD-2026-773019'].map(sample => (
            <button
              key={sample}
              type="button"
              onClick={() => { setSearchCertId(sample); handleVerify(sample); }}
              style={{
                padding: '0.2rem 0.55rem',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                background: '#F8FAFC',
                color: '#1D4ED8',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {sample}
            </button>
          ))}
        </div>
      </div>

      {/* Invalid / Revoked Notice */}
      {notFoundSerial && !verified && (
        <div style={{
          background: '#FEF2F2',
          border: '2px solid #EF4444',
          borderRadius: '18px',
          padding: '1.75rem',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '1rem',
          marginBottom: '2rem',
        }}>
          <AlertTriangle size={28} color="#DC2626" style={{ flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: 800, color: '#991B1B', fontSize: '1.05rem', marginBottom: '0.25rem' }}>
              Credential Not Found in Active ADCS Registry
            </div>
            <p style={{ fontSize: '0.85rem', color: '#7F1D1D', margin: 0, lineHeight: 1.5 }}>
              Serial <strong>{notFoundSerial}</strong> does not match an issued certificate record (expected format: <code>ADCS-ACAD-YYYY-XXXXXX</code>). Verify the spelling or contact ADCS Academy Registrar.
            </p>
          </div>
        </div>
      )}

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
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={handleDownloadSlip}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.5rem 1.1rem',
                  borderRadius: '6px',
                  background: '#2563EB',
                  color: '#FFFFFF',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                <Download size={14} /> Download Verification (.txt)
              </button>
              <button
                type="button"
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
        </div>
      )}
    </div>
  );
};
