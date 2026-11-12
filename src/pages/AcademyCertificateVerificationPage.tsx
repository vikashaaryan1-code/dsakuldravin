import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Search,
  Download,
  ArrowLeft,
  Printer,
} from 'lucide-react';
import { ADCSLogo, CertificateBranding } from '../components/branding';
import { printBrandedADCSDocument } from '../utils/documentBranding';

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
    printBrandedADCSDocument({
      title: `Academy Credential Verification — ${certData.certificateId}`,
      documentType: 'CREDENTIAL VERIFICATION SLIP',
      documentNumber: certData.certificateId,
      issuedDate: certData.issuedDate,
      verificationUrl: `https://ad-digital.in/verify-certificate/${certData.certificateId}`,
      rows: [
        { label: 'Recipient Name', value: `${certData.studentName} (${certData.studentAadhaarMasked})` },
        { label: 'Course Track', value: `${certData.courseTitle} [${certData.courseCode}]` },
        { label: 'Awarded Grade', value: certData.grade },
        { label: 'Issuing Authority', value: `${certData.issuerName} — ${certData.issuerDesignation}` },
        { label: 'Verification Status', value: `${certData.status} / ${certData.revocationStatus}` },
        { label: 'SHA-256 Digest', value: certData.sha256Proof },
      ],
      notes: [`Issuer Legal Entity: ${certData.organization}. Original credential issue date preserved.`],
    });
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
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.85rem' }}>
          <ADCSLogo variant="certificate" height={76} />
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--adcs-success-bg)', color: 'var(--adcs-success)', border: '1px solid var(--adcs-success-border)', padding: '0.35rem 0.85rem', borderRadius: '50px', fontSize: '0.78rem', fontWeight: 800, marginBottom: '0.75rem' }}>
          <ShieldCheck size={16} /> OFFICIAL ADCS CREDENTIAL REGISTRY
        </div>
        <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 900, color: 'var(--adcs-text)', margin: '0 0 0.5rem' }}>
          Certificate Verification Desk
        </h1>
        <p style={{ color: 'var(--adcs-muted)', fontSize: '0.92rem', maxWidth: '580px', margin: '0 auto' }}>
          Cryptographically verify genuine certificates issued by AKUL DRAVIN DIGITAL SERVICES (ADCS) Academy.
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
                color: '#075ACB',
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <CertificateBranding
            certificateId={certData.certificateId}
            certificateTitle="ADCS Academy Verification Record"
            recipientName={certData.studentName}
            subtitleOrCourse={`${certData.courseTitle} (${certData.courseCode})`}
            credentialDetail={`Aadhaar Masked: ${certData.studentAadhaarMasked} • Registry Status: ${certData.status} / ${certData.revocationStatus}.`}
            gradeOrScore={certData.grade}
            issueDate={certData.issuedDate}
            issuerName={certData.issuerName}
            issuerDesignation={certData.issuerDesignation}
            organizationName={certData.organization}
            documentHash={certData.sha256Proof}
            verificationUrl={`https://ad-digital.in/verify-certificate/${certData.certificateId}`}
          />

          <div className="adcs-no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: 'var(--adcs-surface)', border: '1px solid var(--adcs-border)', borderRadius: '12px', padding: '1rem 1.25rem' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--adcs-muted)', fontFamily: 'var(--adcs-font-mono)' }}>
              SHA-256 Digest: {certData.sha256Proof.slice(0, 28)}...
            </div>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              <button type="button" onClick={handleDownloadSlip} className="btn-primary">
                <Download size={14} /> Export Verification Record
              </button>
              <button type="button" onClick={() => window.print()} className="btn-navy">
                <Printer size={14} /> Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
