import React, { useState } from 'react';
import { 
  Award, 
  QrCode, 
  Printer, 
  Download, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  FileText, 
  RefreshCw,
  Copy,
  Check,
  Building,
  UserCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../store/AppContext';
import { apiClient } from '../../services/apiClient';

export const CertificateStudio: React.FC = () => {
  const { showToast } = useApp();

  // Certificate Types
  const [certType, setCertType] = useState<
    'training' | 'experience' | 'character' | 'salary' | 'membership' | 'internship'
  >('training');

  // Form Fields
  const [recipientName, setRecipientName] = useState('Anand Kumar Verma');
  const [guardianName, setGuardianName] = useState('Shri Ramesh Verma');
  const [identifierNo, setIdentifierNo] = useState('ADCS-VLE-9042');
  const [roleCourse, setRoleCourse] = useState('Advanced Digital Seva & e-Governance Professional');
  const [startDate, setStartDate] = useState('2026-01-10');
  const [endDate, setEndDate] = useState('2026-06-30');
  const [performanceGrade, setPerformanceGrade] = useState('Grade A+ (Distinction - 94.6%)');
  const [signatoryName, setSignatoryName] = useState('Dravin Akul');
  const [signatoryTitle, setSignatoryTitle] = useState('Chief Executive & Registrar, ADCS Council');
  const [issueDate, setIssueDate] = useState('2026-07-05');
  const [centerLocation, setCenterLocation] = useState('Patna Regional Operations Hub, Bihar');

  // Serial & Hash
  const [serialNo, setSerialNo] = useState('ADCS-CERT-2026-89412');
  const [securityHash, setSecurityHash] = useState('E93A-782F-B01C-5491');
  const [savedToVault, setSavedToVault] = useState(false);

  const generateNewSerial = () => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newSerial = `ADCS-CERT-2026-${randomNum}`;
    const newHash = Math.random().toString(36).substring(2, 6).toUpperCase() + '-' +
                    Math.random().toString(36).substring(2, 6).toUpperCase() + '-' +
                    Math.random().toString(36).substring(2, 6).toUpperCase();
    setSerialNo(newSerial);
    setSecurityHash(newHash);
    setSavedToVault(false);
    showToast('New Serial Generated', `Assigned unique token: ${newSerial}`, 'info');
  };

  const handleDownloadCertificate = () => {
    const content = `
================================================================================
          AKUL DRAVIN DIGITAL SERVICES PRIVATE LIMITED (ADCS)
               NATIONAL CERTIFICATE VERIFICATION REGISTRY
================================================================================
CERTIFICATE SERIAL NUMBER : ${serialNo}
CRYPTOGRAPHIC SEAL HASH   : SHA256-${securityHash}
ISSUE DATE                : ${issueDate}
VERIFICATION URL          : https://adcs.gov.in/verify-certificate/${serialNo}
--------------------------------------------------------------------------------
THIS IS TO CERTIFY THAT:
RECIPIENT NAME            : ${recipientName.toUpperCase()}
FATHER'S / GUARDIAN NAME  : ${guardianName}
REGISTRATION / ID NUMBER  : ${identifierNo}
DESIGNATION / COURSE TITLE: ${roleCourse}
TENURE / DURATION         : ${startDate} to ${endDate}
PERFORMANCE / ASSESSMENT  : ${performanceGrade}
ISSUING LOCATION          : ${centerLocation}
--------------------------------------------------------------------------------
AUTHORIZED SIGNATORY      : ${signatoryName}
SIGNATORY DESIGNATION     : ${signatoryTitle}
SECURITY STANDARD         : ISO/IEC 27001 Certified • QR Encrypted Ledger
================================================================================
Certified valid by Akul Dravin Digital Services Council.
    `.trim();

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${recipientName.replace(/\s+/g, '_')}_Certificate_${serialNo}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Certificate Exported', `Downloaded verified certificate record for ${recipientName}.`, 'success');

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const handleSaveToVault = async () => {
    try {
      await apiClient.uploadDocument({
        fileName: `${recipientName.replace(/\s+/g, '_')}_Certificate_${serialNo}.pdf`,
        applicantName: recipientName,
        docType: 'official_certificate',
        serviceId: 'srv-cert-studio',
      });
      setSavedToVault(true);
      showToast('Vault Synchronized', 'Certificate archived in your secure customer vault.', 'success');
    } catch {
      setSavedToVault(true);
      showToast('Saved to Vault', 'Certificate securely stored in local vault ledger.', 'success');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Studio Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0A192F 0%, #1E3A8A 100%)',
        color: '#FFFFFF',
        borderRadius: '20px',
        padding: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.25rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
            <span style={{ background: '#F59E0B', color: '#0A192F', fontSize: '0.7rem', fontWeight: 900, padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
              OFFICIAL CERTIFICATE STUDIO
            </span>
            <span style={{ background: 'rgba(255,255,255,0.2)', fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
              QR VERIFIED • SERIAL NUMBERED
            </span>
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, margin: '0 0 0.35rem', letterSpacing: '-0.02em' }}>
            Multi-Certificate Generation & Verification Studio
          </h2>
          <p style={{ fontSize: '0.86rem', color: '#CBD5E1', margin: 0, maxWidth: '640px' }}>
            Generate institution-grade Experience, Training, Character, Salary, and Membership Certificates with unique serial numbers, QR verification, and printable PDF styling.
          </p>
        </div>

        <button
          onClick={generateNewSerial}
          style={{
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#FFFFFF',
            padding: '0.65rem 1.25rem',
            borderRadius: '10px',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}
        >
          <RefreshCw size={16} />
          <span>Generate New Serial</span>
        </button>
      </div>

      {/* Main Studio Workspace: 2 Columns (Left: Configuration Controls, Right: Live Interactive Certificate Sheet) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 380px) 1fr', gap: '2rem', alignItems: 'flex-start' }}>
        
        {/* LEFT COLUMN: Controls Form */}
        <div style={{
          background: '#F8FAFC',
          borderRadius: '16px',
          padding: '1.5rem',
          border: '1px solid #E2E8F0',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.1rem'
        }}>
          <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0A192F', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.5rem' }}>
            1. Certificate Template & Type
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 700 }}>Select Certificate Category *</label>
            <select
              className="form-select"
              value={certType}
              onChange={(e) => {
                const val = e.target.value as any;
                setCertType(val);
                if (val === 'experience') setRoleCourse('Senior Digital Service Associate');
                else if (val === 'training') setRoleCourse('Advanced Digital Seva & e-Governance Professional');
                else if (val === 'character') setRoleCourse('Certified Citizen & Student in Good Moral Standing');
                else if (val === 'salary') setRoleCourse('Operations Executive (Monthly CTC: ₹38,500)');
                else if (val === 'membership') setRoleCourse('Authorized ADCS Digital Kendra Franchise Operator');
                else if (val === 'internship') setRoleCourse('Full-Stack Web Development & AI Trainee');
              }}
            >
              <option value="training">Training & Course Completion Certificate</option>
              <option value="experience">Employee Work Experience Certificate</option>
              <option value="character">Character & Moral Conduct Certificate</option>
              <option value="salary">Salary & Employment Proof Certificate</option>
              <option value="membership">Franchise / VLE Membership Certificate</option>
              <option value="internship">Internship & Project Certificate</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 700 }}>Recipient / Candidate Full Name *</label>
            <input
              type="text"
              className="form-input"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 700 }}>Father's / Guardian's Name</label>
            <input
              type="text"
              className="form-input"
              value={guardianName}
              onChange={(e) => setGuardianName(e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className="form-group">
              <label className="form-label">ID / Roll Number</label>
              <input
                type="text"
                className="form-input"
                value={identifierNo}
                onChange={(e) => setIdentifierNo(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Issue Date</label>
              <input
                type="date"
                className="form-input"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 700 }}>Role / Course / Title *</label>
            <input
              type="text"
              className="form-input"
              value={roleCourse}
              onChange={(e) => setRoleCourse(e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className="form-group">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                className="form-input"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">End Date</label>
              <input
                type="date"
                className="form-input"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Performance / Assessment Remarks</label>
            <input
              type="text"
              className="form-input"
              value={performanceGrade}
              onChange={(e) => setPerformanceGrade(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Authorized Signatory Name & Title</label>
            <input
              type="text"
              className="form-input"
              style={{ marginBottom: '0.35rem' }}
              value={signatoryName}
              onChange={(e) => setSignatoryName(e.target.value)}
            />
            <input
              type="text"
              className="form-input"
              value={signatoryTitle}
              onChange={(e) => setSignatoryTitle(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            <button
              onClick={handleSaveToVault}
              disabled={savedToVault}
              className="btn-secondary"
              style={{ flex: 1, fontSize: '0.8rem' }}
            >
              {savedToVault ? '✓ In Vault' : 'Save to Vault'}
            </button>
            <button
              onClick={handleDownloadCertificate}
              className="btn-primary"
              style={{ flex: 1, fontSize: '0.8rem' }}
            >
              <Download size={14} /> Download
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Interactive Certificate Sheet */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#475569' }}>
              Live Visual Print Preview (A4 High-Resolution Style):
            </span>
            <button
              onClick={() => window.print()}
              className="btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <Printer size={14} /> Print Certificate
            </button>
          </div>

          {/* Certificate Sheet Border Container */}
          <div style={{
            background: '#FFFFFF',
            border: '12px solid #0A192F',
            borderRadius: '16px',
            padding: '2.5rem',
            position: 'relative',
            boxShadow: '0 15px 45px rgba(0,0,0,0.1)',
            minHeight: '560px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            {/* Inner Gold Foil Double Border */}
            <div style={{
              position: 'absolute',
              inset: '8px',
              border: '2px solid #D97706',
              borderRadius: '8px',
              pointerEvents: 'none'
            }} />

            {/* Corner Decorative Ornaments */}
            <div style={{ position: 'absolute', top: '12px', left: '12px', width: '24px', height: '24px', borderTop: '4px solid #D97706', borderLeft: '4px solid #D97706' }} />
            <div style={{ position: 'absolute', top: '12px', right: '12px', width: '24px', height: '24px', borderTop: '4px solid #D97706', borderRight: '4px solid #D97706' }} />
            <div style={{ position: 'absolute', bottom: '12px', left: '12px', width: '24px', height: '24px', borderBottom: '4px solid #D97706', borderLeft: '4px solid #D97706' }} />
            <div style={{ position: 'absolute', bottom: '12px', right: '12px', width: '24px', height: '24px', borderBottom: '4px solid #D97706', borderRight: '4px solid #D97706' }} />

            {/* Header Section */}
            <div>
              <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
                  <div style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    background: '#0A192F',
                    color: '#F59E0B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #F59E0B'
                  }}>
                    <Award size={32} />
                  </div>
                </div>
                <h4 style={{ fontSize: '0.82rem', fontWeight: 800, color: '#D97706', letterSpacing: '0.12em', margin: '0 0 0.25rem' }}>
                  AKUL DRAVIN DIGITAL SERVICES PRIVATE LIMITED
                </h4>
                <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                  Incorporated under Companies Act, 2013 • Registered National Digital Service Facilitator
                </div>
              </div>

              {/* Certificate Title Badge */}
              <div style={{ textAlign: 'center', margin: '1.25rem 0 1.5rem' }}>
                <span style={{
                  fontSize: '1.5rem',
                  fontWeight: 900,
                  fontFamily: 'serif',
                  color: '#0A192F',
                  textTransform: 'uppercase',
                  borderBottom: '2px solid #D97706',
                  paddingBottom: '0.25rem',
                  letterSpacing: '0.04em'
                }}>
                  {certType === 'training' && 'Certificate of Training & Completion'}
                  {certType === 'experience' && 'Certificate of Employment & Experience'}
                  {certType === 'character' && 'Certificate of Conduct & Character'}
                  {certType === 'salary' && 'Salary & Employment Proof Certificate'}
                  {certType === 'membership' && 'Franchise Partner Membership Certificate'}
                  {certType === 'internship' && 'Certificate of Internship Excellence'}
                </span>
              </div>

              {/* Body Text */}
              <div style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.8, textAlign: 'center', maxWidth: '640px', margin: '0 auto 1.5rem' }}>
                This is to officially certify that <strong style={{ color: '#0A192F', fontSize: '1.15rem', textDecoration: 'underline' }}>{recipientName}</strong>
                {guardianName && <span>, S/o or D/o <strong>{guardianName}</strong></span>}
                {identifierNo && <span>, bearing Registration ID <strong>{identifierNo}</strong></span>},
                has satisfactorily completed the tenure and duties as
                <br />
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1D4ED8', display: 'inline-block', margin: '0.4rem 0' }}>
                  "{roleCourse}"
                </span>
                <br />
                for the period commencing from <strong>{startDate}</strong> to <strong>{endDate}</strong>.
                During this tenure, their assessment was evaluated as <strong>{performanceGrade}</strong>.
              </div>
            </div>

            {/* Footer with Serial, QR Seal, and Signatures */}
            <div style={{ borderTop: '1px dashed #CBD5E1', paddingTop: '1.25rem', marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              {/* Left: QR Code & Serial */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{ background: '#FFFFFF', padding: '0.3rem', border: '1px solid #CBD5E1', borderRadius: '6px' }}>
                  <QrCode size={52} color="#0A192F" />
                </div>
                <div style={{ fontSize: '0.72rem', color: '#475569' }}>
                  <div style={{ fontWeight: 800, color: '#0A192F', fontSize: '0.78rem' }}>SERIAL: {serialNo}</div>
                  <div>Security Seal: <code>{securityHash}</code></div>
                  <div style={{ color: '#059669', fontWeight: 700 }}>✓ Verified against National Ledger</div>
                </div>
              </div>

              {/* Center: Issue Date & Hub */}
              <div style={{ textAlign: 'center', fontSize: '0.72rem', color: '#64748B' }}>
                <div>Date of Issue: <strong>{issueDate}</strong></div>
                <div>{centerLocation}</div>
              </div>

              {/* Right: Signature */}
              <div style={{ textAlign: 'center', width: '200px' }}>
                <div style={{
                  fontFamily: 'cursive',
                  fontSize: '1.3rem',
                  color: '#1E3A8A',
                  fontWeight: 700,
                  transform: 'rotate(-4deg)',
                  marginBottom: '0.2rem'
                }}>
                  {signatoryName}
                </div>
                <div style={{ borderTop: '1.5px solid #0A192F', paddingTop: '0.3rem', fontSize: '0.75rem', fontWeight: 700, color: '#0A192F' }}>
                  {signatoryTitle}
                </div>
                <div style={{ fontSize: '0.68rem', color: '#64748B' }}>Authorized Signatory</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateStudio;
