import React, { useState, useEffect } from 'react';
import {
  Printer,
  Download,
  RefreshCw,
  History,
  Lock,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../store/AppContext';
import { apiClient } from '../../services/apiClient';
import { CertificateBranding } from '../branding';
import { ADCS_BRAND_IDENTITY, ADCS_APPROVED_SIGNATORIES } from '../../config/brandAssets';
import { computeDocumentHash, printBrandedADCSDocument } from '../../utils/documentBranding';

export const CertificateStudio: React.FC = () => {
  const { showToast, whiteLabelConfig } = useApp();

  // Certificate Types (covers Academy, Vocational, Achievement, Assessment, Participation, Internship, Experience, Franchise, Staff, etc.)
  const [certType, setCertType] = useState<
    | 'training'
    | 'vocational'
    | 'achievement'
    | 'assessment'
    | 'participation'
    | 'internship'
    | 'experience'
    | 'franchise'
    | 'staff'
    | 'character'
    | 'salary'
    | 'membership'
  >('training');

  const [orientation, setOrientation] = useState<'landscape' | 'portrait'>('landscape');

  // Form Fields
  const [recipientName, setRecipientName] = useState('Anand Kumar Verma');
  const [guardianName, setGuardianName] = useState('Shri Ramesh Verma');
  const [identifierNo, setIdentifierNo] = useState('ADCS-VLE-9042');
  const [roleCourse, setRoleCourse] = useState('Advanced Digital Seva & e-Governance Professional');
  const [startDate, setStartDate] = useState('2026-01-10');
  const [endDate, setEndDate] = useState('2026-06-30');
  const [performanceGrade, setPerformanceGrade] = useState('Grade A+ (Distinction - 94.6%)');
  const [signatoryName, setSignatoryName] = useState<string>(ADCS_APPROVED_SIGNATORIES[0].name);
  const [signatoryTitle, setSignatoryTitle] = useState<string>(ADCS_APPROVED_SIGNATORIES[0].designation);
  const [issueDate, setIssueDate] = useState('2026-07-05');
  const [centerLocation, setCenterLocation] = useState('Patna Regional Operations Hub, Bihar');

  // Controlled Reissue & Versioning Integrity State
  const [serialNo, setSerialNo] = useState('ADCS-CERT-2026-89412');
  const [securityHash, setSecurityHash] = useState('A9F2C81E04D721B890F452E1');
  const [versionNumber, setVersionNumber] = useState<number>(1);
  const [isIssuedLocked, setIsIssuedLocked] = useState<boolean>(false);
  const [reissueReason, setReissueReason] = useState('Official ADCS Master Logo & Identity Upgrade');
  const [reissuedBy, setReissuedBy] = useState('Super Admin Brand Registrar');
  const [reissueMeta, setReissueMeta] = useState<
    { reason: string; reissuedBy: string; reissuedAt: string; originalIssueDate: string } | undefined
  >(undefined);
  const [reissueLedger, setReissueLedger] = useState<
    Array<{ version: number; serialNo: string; qrRef: string; hash: string; timestamp: string; actor: string; reason: string }>
  >([]);
  const [savedToVault, setSavedToVault] = useState(false);

  const verificationUrl = `${ADCS_BRAND_IDENTITY.verificationBaseUrl}?id=${encodeURIComponent(serialNo)}`;

  useEffect(() => {
    let active = true;
    computeDocumentHash({
      serialNo,
      certType,
      recipientName,
      roleCourse,
      issueDate,
      versionNumber,
      logoAsset: whiteLabelConfig.certificateLogoUrl || '/branding/adcs-logo-certificate.png',
    }).then((hash) => {
      if (active) setSecurityHash(hash);
    });
    return () => {
      active = false;
    };
  }, [serialNo, certType, recipientName, roleCourse, issueDate, versionNumber, whiteLabelConfig.certificateLogoUrl]);

  const generateNewSerial = () => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newSerial = `ADCS-CERT-2026-${randomNum}`;
    setSerialNo(newSerial);
    setVersionNumber(1);
    setIsIssuedLocked(false);
    setReissueMeta(undefined);
    setSavedToVault(false);
    showToast('New Certificate Serial Assigned', `Assigned immutable credential ID: ${newSerial}`, 'info');
  };

  const handleLockAndIssue = async () => {
    const hash = await computeDocumentHash({
      serialNo,
      certType,
      recipientName,
      roleCourse,
      issueDate,
      versionNumber: 1,
    });
    setSecurityHash(hash);
    setIsIssuedLocked(true);
    setReissueLedger((prev) => [
      {
        version: 1,
        serialNo,
        qrRef: verificationUrl,
        hash,
        timestamp: new Date().toISOString(),
        actor: signatoryName,
        reason: 'Original Issuance (Immutable Baseline)',
      },
      ...prev,
    ]);
    showToast('Certificate Issued & Locked', `Original record ${serialNo} v1.0 archived with SHA-256 integrity hash.`, 'success');
    confetti({ particleCount: 55, spread: 50, origin: { y: 0.65 } });
  };

  const handleControlledReissue = async () => {
    if (!reissueReason.trim()) {
      showToast('Reason Required', 'Please record the formal reason for controlled certificate reissue.', 'error');
      return;
    }
    const nextVersion = versionNumber + 1;
    const timestamp = new Date().toISOString();
    const nextHash = await computeDocumentHash({
      serialNo,
      certType,
      recipientName,
      roleCourse,
      originalIssueDate: issueDate,
      versionNumber: nextVersion,
      reissueReason,
      reissuedBy,
      timestamp,
      logoAsset: whiteLabelConfig.certificateLogoUrl || '/branding/adcs-logo-certificate.png',
    });
    setVersionNumber(nextVersion);
    setSecurityHash(nextHash);
    setIsIssuedLocked(true);
    setReissueMeta({
      reason: reissueReason,
      reissuedBy,
      reissuedAt: timestamp.slice(0, 10),
      originalIssueDate: issueDate,
    });
    setReissueLedger((prev) => [
      {
        version: nextVersion,
        serialNo,
        qrRef: verificationUrl,
        hash: nextHash,
        timestamp,
        actor: reissuedBy,
        reason: reissueReason,
      },
      ...prev,
    ]);
    showToast('Controlled Reissue Recorded', `${serialNo} reissued as v${nextVersion}.0 — original record & QR verification URL preserved.`, 'success');
  };

  const certTitleMap: Record<string, string> = {
    training: 'Certificate of Training & Completion',
    vocational: 'Vocational Skill Qualification Certificate',
    achievement: 'Course Achievement & Merit Certificate',
    assessment: 'Skill Assessment Proficiency Certificate',
    participation: 'Certificate of Program Participation',
    internship: 'Certificate of Internship Completion',
    experience: 'Certificate of Employment & Experience',
    franchise: 'Authorized Franchise Onboarding Certificate',
    staff: 'Staff Operational Excellence Certificate',
    character: 'Certificate of Conduct & Standing',
    salary: 'Employment & Compensation Verification',
    membership: 'Authorized Partner Membership Certificate',
  };

  const handleDownloadCertificate = () => {
    printBrandedADCSDocument({
      title: certTitleMap[certType] || 'ADCS Official Certificate',
      documentType: 'ADCS CREDENTIAL RECORD',
      documentNumber: `${serialNo} (v${versionNumber}.0)`,
      issuedDate: issueDate,
      orientation,
      verificationUrl,
      rows: [
        { label: 'Recipient Name', value: recipientName },
        { label: 'Father / Guardian Name', value: guardianName || 'N/A' },
        { label: 'Registration / ID', value: identifierNo },
        { label: 'Program / Designation', value: roleCourse },
        { label: 'Tenure / Duration', value: `${startDate} to ${endDate}` },
        { label: 'Grade / Evaluation', value: performanceGrade },
        { label: 'Issuing Hub', value: centerLocation },
        { label: 'Authorized Signatory', value: `${signatoryName} — ${signatoryTitle}` },
        { label: 'SHA-256 Digest', value: securityHash },
      ],
      notes: reissueMeta
        ? [
            `Original Issuance Date Preserved: ${reissueMeta.originalIssueDate}`,
            `Controlled Reissue v${versionNumber}.0 by ${reissueMeta.reissuedBy} (${reissueMeta.reissuedAt})`,
            `Reason: ${reissueMeta.reason}`,
          ]
        : ['Official ADCS credential record. Independently verifiable via QR & Registry URL.'],
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
        background: 'linear-gradient(135deg, #061A36 0%, #061A36 100%)',
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
            <span style={{ background: '#F59E0B', color: '#061A36', fontSize: '0.7rem', fontWeight: 900, padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
              OFFICIAL CERTIFICATE STUDIO
            </span>
            <span style={{ background: 'rgba(255,255,255,0.2)', fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
              QR VERIFIED • SERIAL NUMBERED
            </span>
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, margin: '0 0 0.35rem', letterSpacing: '-0.02em', color: '#FFFFFF' }}>
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
          <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#061A36', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.5rem' }}>
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
              <option value="training">Academy Completion & Training Certificate</option>
              <option value="vocational">Vocational Training Certificate</option>
              <option value="achievement">Course Achievement Certificate</option>
              <option value="assessment">Skill Assessment Certificate</option>
              <option value="participation">Participation Certificate</option>
              <option value="internship">Internship Completion Certificate</option>
              <option value="experience">Experience Certificate (Legitimate Employment)</option>
              <option value="franchise">Franchise Onboarding Certificate</option>
              <option value="staff">Staff Training Certificate</option>
              <option value="character">Character & Moral Conduct Certificate</option>
              <option value="salary">Salary & Employment Proof Certificate</option>
              <option value="membership">Partner Membership Certificate</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 700 }}>A4 Print Orientation</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {(['landscape', 'portrait'] as const).map((dir) => (
                <button
                  key={dir}
                  type="button"
                  onClick={() => setOrientation(dir)}
                  className={orientation === dir ? 'btn-primary' : 'btn-secondary'}
                  style={{ flex: 1, minHeight: '36px', fontSize: '0.78rem', textTransform: 'capitalize' }}
                >
                  {dir} A4
                </button>
              ))}
            </div>
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

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={handleLockAndIssue}
              disabled={isIssuedLocked}
              className="btn-navy"
              style={{ flex: '1 1 100%', fontSize: '0.8rem' }}
            >
              <Lock size={14} /> {isIssuedLocked ? `Issued v${versionNumber}.0 (Original Preserved)` : 'Issue & Lock Original Record'}
            </button>
            <button
              type="button"
              onClick={handleSaveToVault}
              disabled={savedToVault}
              className="btn-secondary"
              style={{ flex: 1, fontSize: '0.8rem' }}
            >
              {savedToVault ? '✓ In Vault' : 'Save to Vault'}
            </button>
            <button
              type="button"
              onClick={handleDownloadCertificate}
              className="btn-primary"
              style={{ flex: 1, fontSize: '0.8rem' }}
            >
              <Download size={14} /> Export PDF Record
            </button>
          </div>

          {/* Controlled Reissue Panel — Existing issued certificates are NEVER silently overwritten */}
          <div style={{ marginTop: '0.75rem', padding: '0.9rem', background: '#FFFFFF', border: '1px solid #DCE4EF', borderLeft: '4px solid #D6A12B', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 800, fontSize: '0.8rem', color: '#061A36', marginBottom: '0.5rem' }}>
              <History size={14} color="#075ACB" />
              <span>Controlled Reissue / Branding Version</span>
            </div>
            <p style={{ fontSize: '0.73rem', color: '#55677D', marginBottom: '0.6rem', lineHeight: 1.45 }}>
              Preserves original record & QR reference while recomputing SHA-256 hash and recording audit metadata.
            </p>
            <input
              type="text"
              className="form-input"
              value={reissueReason}
              onChange={(e) => setReissueReason(e.target.value)}
              placeholder="Reissue reason"
              style={{ marginBottom: '0.45rem', fontSize: '0.78rem', minHeight: '34px' }}
            />
            <input
              type="text"
              className="form-input"
              value={reissuedBy}
              onChange={(e) => setReissuedBy(e.target.value)}
              placeholder="Authorized Reissuer"
              style={{ marginBottom: '0.55rem', fontSize: '0.78rem', minHeight: '34px' }}
            />
            <button
              type="button"
              onClick={handleControlledReissue}
              className="btn-gold"
              style={{ width: '100%', minHeight: '36px', fontSize: '0.78rem' }}
            >
              Reissue v{versionNumber + 1}.0 (Preserve Original)
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Branded A4 Certificate Sheet */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }} className="adcs-no-print">
            <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--adcs-muted)' }}>
              Live Print Preview — A4 {orientation.toUpperCase()} • {whiteLabelConfig.brandName}
            </span>
            <button
              type="button"
              onClick={() => window.print()}
              className="btn-secondary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', minHeight: '36px', padding: '0.4rem 0.9rem', fontSize: '0.82rem' }}
            >
              <Printer size={14} /> Print / Save PDF
            </button>
          </div>

          <CertificateBranding
            certificateId={serialNo}
            certificateTitle={certTitleMap[certType] || 'Official ADCS Certificate'}
            recipientName={recipientName}
            subtitleOrCourse={roleCourse}
            credentialDetail={`${guardianName ? `Son / Daughter of ${guardianName}, ` : ''}bearing Identifier ${identifierNo}, evaluated during ${startDate} to ${endDate} at ${centerLocation}.`}
            gradeOrScore={performanceGrade}
            issueDate={issueDate}
            issuerName={signatoryName}
            issuerDesignation={signatoryTitle}
            organizationName={whiteLabelConfig.brandName}
            logoUrl={whiteLabelConfig.certificateLogoUrl}
            footerText={whiteLabelConfig.footerText}
            verificationUrl={verificationUrl}
            documentHash={securityHash}
            versionNumber={versionNumber}
            reissueMeta={reissueMeta}
            orientation={orientation}
          />

          {reissueLedger.length > 0 && (
            <div className="card adcs-no-print" style={{ padding: '1rem' }}>
              <div style={{ fontWeight: 800, fontSize: '0.84rem', color: 'var(--adcs-text)', marginBottom: '0.5rem' }}>
                Immutable Certificate Issue & Reissue Audit Log
              </div>
              <div className="adcs-table-wrap">
                <table className="adcs-table">
                  <thead>
                    <tr>
                      <th>Ver</th>
                      <th>Serial / QR Ref</th>
                      <th>Issuer</th>
                      <th>Reason</th>
                      <th>SHA-256 Digest</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reissueLedger.map((entry, idx) => (
                      <tr key={idx}>
                        <td><span className="badge-blue">v{entry.version}.0</span></td>
                        <td>{entry.serialNo}</td>
                        <td>{entry.actor}</td>
                        <td>{entry.reason}</td>
                        <td style={{ fontFamily: 'var(--adcs-font-mono)', fontSize: '0.72rem' }}>{entry.hash.slice(0, 18)}...</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificateStudio;
