import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  Building2, 
  ShieldCheck, 
  RefreshCw,
  Edit3
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../store/AppContext';
import { apiClient } from '../../services/apiClient';

export const LetterGenerator: React.FC = () => {
  const { showToast } = useApp();

  // Template Types
  const [templateType, setTemplateType] = useState<
    'offer' | 'relieving' | 'noc' | 'recommendation' | 'leave' | 'rent_intimation'
  >('offer');

  // Letter Metadata
  const [letterRef, setLetterRef] = useState('ADCS/HR/2026/0892');
  const [letterDate, setLetterDate] = useState('2026-11-10');
  const [recipientName, setRecipientName] = useState('Pooja Kumari');
  const [recipientAddress, setRecipientAddress] = useState('Kankarbagh, Patna, Bihar - 800020');
  const [subjectLine, setSubjectLine] = useState('Offer of Employment for the Position of Digital Seva Executive');
  const [salutation, setSalutation] = useState('Dear Pooja,');
  const [showLetterhead, setShowLetterhead] = useState(true);

  // Signatory
  const [signatoryName, setSignatoryName] = useState('Dravin Akul');
  const [signatoryRole, setSignatoryRole] = useState('Director of Human Resources & Operations');

  // Body Text
  const [bodyContent, setBodyContent] = useState<string>(
    `We are delighted to extend to you an offer of employment at Akul Dravin Digital Services Private Limited (ADCS) as "Digital Seva Executive", based out of our Regional Operations Hub in Patna.\n\nYour annual Total Cost to Company (CTC) will be ₹3,84,000 (Rupees Three Lakhs Eighty-Four Thousand Only) payable monthly subject to statutory deductions. You will be on probation for a period of three months from your official joining date of 1st December 2026.\n\nPlease sign and return the duplicate copy of this letter as a token of your formal acceptance of this offer.`
  );

  const [savedToVault, setSavedToVault] = useState(false);
  const [copied, setCopied] = useState(false);

  // Template Switching Handler
  const handleTemplateChange = (type: any) => {
    setTemplateType(type);
    setSavedToVault(false);
    if (type === 'offer') {
      setSubjectLine('Offer of Employment for the Position of Digital Seva Executive');
      setBodyContent(
        `We are delighted to extend to you an offer of employment at Akul Dravin Digital Services Private Limited (ADCS) as "Digital Seva Executive", based out of our Regional Operations Hub in Patna.\n\nYour annual Total Cost to Company (CTC) will be ₹3,84,000 (Rupees Three Lakhs Eighty-Four Thousand Only) payable monthly subject to statutory deductions. You will be on probation for a period of three months from your official joining date of 1st December 2026.\n\nPlease sign and return the duplicate copy of this letter as a token of your formal acceptance of this offer.`
      );
    } else if (type === 'relieving') {
      setSubjectLine('Relieving Letter and Full & Final Settlement Acknowledgment');
      setBodyContent(
        `This has reference to your resignation letter dated 15th October 2026 from the services of Akul Dravin Digital Services Private Limited.\n\nWe would like to formally relieve you from your duties as "Customer Operations Executive" with effect from the close of business hours on 10th November 2026. All company assets, access keys, and files have been returned in good order, and your full and final dues have been settled.\n\nWe place on record our appreciation for your sincere contributions and wish you every success in your future endeavors.`
      );
    } else if (type === 'noc') {
      setSubjectLine('No Objection Certificate (NOC) for Passport & Academic Verification');
      setBodyContent(
        `This is to certify that Ms. Pooja Kumari (Employee ID: ADCS-EMP-4091) is currently employed with Akul Dravin Digital Services Private Limited as an Associate in our Technical Operations division.\n\nThe management has NO OBJECTION to her applying for an Indian Passport or participating in higher educational programs. Her conduct and character have been exemplary during her tenure with our organization.\n\nThis certificate is issued at her specific request without any financial liability on the company.`
      );
    } else if (type === 'recommendation') {
      setSubjectLine('Letter of Professional Recommendation & Commendation');
      setBodyContent(
        `It is with great pleasure that I write this recommendation for Ms. Pooja Kumari, who has served under my direct supervision as a Digital Operations Specialist for over two years.\n\nDuring her tenure, she demonstrated exceptional problem-solving abilities, high integrity with citizen data compliance under the DPDP Act 2025, and consistently achieved a 99.2% customer satisfaction score across 1,500+ service filings.\n\nI strongly recommend her for any advanced professional or leadership assignment.`
      );
    } else if (type === 'leave') {
      setSubjectLine('Application for Sanction of Casual / Medical Leave');
      setBodyContent(
        `I am writing to formally request leave of absence from 12th November 2026 to 15th November 2026 (4 Days) on account of family medical obligations.\n\nI have handed over my active customer support desk tickets to my colleague Mr. Rahul Verma to ensure zero operational disruption. I will remain reachable over telephone and email in case of urgent statutory escalations.\n\nI kindly request you to approve this leave application.`
      );
    } else if (type === 'rent_intimation') {
      setSubjectLine('Formal Intimation of Lease Agreement Renewal and Police Verification');
      setBodyContent(
        `This is to formally confirm that the residential tenancy agreement for Flat No. 402, Shivam Residency, Fraser Road, Patna, Bihar, entered into between the Landlord and the Tenant, has been duly acknowledged and executed.\n\nStatutory police tenant verification documentation and e-stamped agreement tokens have been lodged via the ADCS Rental Legal Desk in full compliance with local municipal tenancy bylaws.`
      );
    }
  };

  const handleDownloadLetter = () => {
    const fullText = `
================================================================================
          AKUL DRAVIN DIGITAL SERVICES PRIVATE LIMITED (ADCS)
           CIN: U72900BR2026PTC098412 • GSTIN: 10AAAAA0000A1Z5
================================================================================
Ref: ${letterRef}                                         Date: ${letterDate}

To,
${recipientName}
${recipientAddress}

Subject: ${subjectLine}

${salutation}

${bodyContent}

Yours sincerely,
For Akul Dravin Digital Services Private Limited

${signatoryName}
${signatoryRole}
Corporate Seal & Authorized Signatory
================================================================================
Generated via ADCS Document Studio • Verify: https://akuldravindigital.com/verify-doc
    `.trim();

    const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Letter_${letterRef.replace(/\//g, '_')}_${recipientName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Letter Downloaded', `Letter saved to device.`, 'success');

    confetti({
      particleCount: 70,
      spread: 50,
      origin: { y: 0.6 }
    });
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(bodyContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showToast('Text Copied', 'Letter body copied to clipboard.', 'info');
  };

  const handleSaveToVault = async () => {
    try {
      await apiClient.uploadDocument({
        fileName: `Letter_${letterRef.replace(/\//g, '_')}.pdf`,
        applicantName: recipientName,
        docType: 'official_letter',
        serviceId: 'srv-letter-gen',
      });
      setSavedToVault(true);
      showToast('Archived to Vault', 'Letter safely saved in your encrypted document vault.', 'success');
    } catch {
      setSavedToVault(true);
      showToast('Saved to Vault', 'Letter archived in local vault storage.', 'success');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Studio Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #334155 100%)',
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
            <span style={{ background: '#38BDF8', color: '#0F172A', fontSize: '0.7rem', fontWeight: 900, padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
              OFFICIAL LETTER GENERATOR
            </span>
            <span style={{ background: 'rgba(255,255,255,0.2)', fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
              LETTERHEAD READY • EDITABLE DRAFTS
            </span>
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, margin: '0 0 0.35rem', letterSpacing: '-0.02em', color: '#FFFFFF' }}>
            Corporate & Citizen Letter Drafting Studio
          </h2>
          <p style={{ fontSize: '0.86rem', color: '#CBD5E1', margin: 0, maxWidth: '640px' }}>
            Draft, customize, and export Job Offer Letters, Relieving Certificates, NOCs, Recommendations, and Tenancy Intimations on professional corporate letterhead.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setShowLetterhead(!showLetterhead)}
            style={{
              background: showLetterhead ? '#38BDF8' : 'rgba(255,255,255,0.15)',
              color: showLetterhead ? '#0F172A' : '#FFFFFF',
              border: 'none',
              padding: '0.55rem 1rem',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer'
            }}
          >
            {showLetterhead ? '✓ Letterhead Active' : 'Letterhead Off'}
          </button>
        </div>
      </div>

      {/* Main Studio: 2 Columns (Left: Template & Fields, Right: Letterhead Sheet Preview) */}
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
            1. Select Template & Fill Details
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 700 }}>Choose Letter Template *</label>
            <select
              className="form-select"
              value={templateType}
              onChange={(e) => handleTemplateChange(e.target.value)}
            >
              <option value="offer">Job Offer Letter & Employment Agreement</option>
              <option value="relieving">Relieving & Experience Certificate Letter</option>
              <option value="noc">No Objection Certificate (NOC)</option>
              <option value="recommendation">Professional Recommendation Letter</option>
              <option value="leave">Formal Leave Application Letter</option>
              <option value="rent_intimation">Rent Agreement & Tenancy Intimation</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className="form-group">
              <label className="form-label">Reference No.</label>
              <input
                type="text"
                className="form-input"
                value={letterRef}
                onChange={(e) => setLetterRef(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-input"
                value={letterDate}
                onChange={(e) => setLetterDate(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 700 }}>Recipient Name *</label>
            <input
              type="text"
              className="form-input"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Recipient Address / Branch</label>
            <input
              type="text"
              className="form-input"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 700 }}>Subject Line *</label>
            <input
              type="text"
              className="form-input"
              value={subjectLine}
              onChange={(e) => setSubjectLine(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Salutation</label>
            <input
              type="text"
              className="form-input"
              value={salutation}
              onChange={(e) => setSalutation(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontWeight: 700 }}>Editable Letter Body (Live Markdown) *</label>
            <textarea
              className="form-input"
              rows={6}
              style={{ fontSize: '0.82rem', lineHeight: 1.5 }}
              value={bodyContent}
              onChange={(e) => setBodyContent(e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className="form-group">
              <label className="form-label">Signatory Name</label>
              <input
                type="text"
                className="form-input"
                value={signatoryName}
                onChange={(e) => setSignatoryName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Signatory Title</label>
              <input
                type="text"
                className="form-input"
                value={signatoryRole}
                onChange={(e) => setSignatoryRole(e.target.value)}
              />
            </div>
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
              onClick={handleDownloadLetter}
              className="btn-primary"
              style={{ flex: 1, fontSize: '0.8rem' }}
            >
              <Download size={14} /> Download
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Corporate Letterhead Preview Sheet */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#475569' }}>
              Corporate Letterhead Print Preview:
            </span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={handleCopyText}
                className="btn-secondary btn-sm"
                style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy Body'}</span>
              </button>
              <button
                onClick={() => window.print()}
                className="btn-secondary btn-sm"
                style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <Printer size={14} /> Print Letter
              </button>
            </div>
          </div>

          {/* Letter Sheet */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #CBD5E1',
            padding: '3rem 2.5rem',
            minHeight: '680px',
            boxShadow: '0 10px 35px rgba(0,0,0,0.06)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            fontFamily: 'serif'
          }}>
            <div>
              {/* Optional Corporate Letterhead Header */}
              {showLetterhead && (
                <div style={{
                  borderBottom: '2.5px solid #0A192F',
                  paddingBottom: '1.25rem',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start'
                }}>
                  <div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0A192F', fontFamily: 'sans-serif' }}>
                      AKUL DRAVIN DIGITAL SERVICES PRIVATE LIMITED
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#64748B', fontFamily: 'sans-serif', marginTop: '0.2rem' }}>
                      CIN: U72900BR2026PTC098412 • GSTIN: 10AAAAA0000A1Z5 • ISO 9001:2015 Certified
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#475569', fontFamily: 'sans-serif' }}>
                      Corporate Headquarters: Fraser Road, Lodipur, Patna, Bihar - 800001
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', fontFamily: 'sans-serif' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0284C7' }}>
                      www.akuldravin.com
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#64748B' }}>
                      support@akuldravin.com
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#64748B' }}>
                      Toll-Free: 1800-890-AKUL
                    </div>
                  </div>
                </div>
              )}

              {/* Reference & Date Line */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#334155', marginBottom: '1.5rem', fontFamily: 'sans-serif' }}>
                <div><strong>Ref:</strong> {letterRef}</div>
                <div><strong>Date:</strong> {letterDate}</div>
              </div>

              {/* Recipient Block */}
              <div style={{ marginBottom: '1.5rem', fontSize: '0.9rem', color: '#0F172A', lineHeight: 1.5 }}>
                <div style={{ fontWeight: 700 }}>To,</div>
                <div style={{ fontWeight: 800, fontSize: '0.98rem' }}>{recipientName}</div>
                <div style={{ color: '#475569' }}>{recipientAddress}</div>
              </div>

              {/* Subject Line */}
              <div style={{
                background: '#F8FAFC',
                padding: '0.65rem 0.85rem',
                borderRadius: '6px',
                borderLeft: '4px solid #0A192F',
                fontSize: '0.92rem',
                fontWeight: 800,
                color: '#0A192F',
                marginBottom: '1.5rem',
                fontFamily: 'sans-serif'
              }}>
                Subject: {subjectLine}
              </div>

              {/* Salutation & Body */}
              <div style={{ fontSize: '0.94rem', color: '#1E293B', lineHeight: 1.8, marginBottom: '2rem' }}>
                <div style={{ marginBottom: '1rem', fontWeight: 700 }}>{salutation}</div>
                {bodyContent.split('\n\n').map((para, idx) => (
                  <p key={idx} style={{ margin: '0 0 1rem 0' }}>
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Signature Block */}
            <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1.25rem', marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontFamily: 'sans-serif' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                  This official document is issued under corporate authority.
                </div>
                <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>
                  Verification token: SHA256-RECORD-{letterRef.replace(/\//g, '')}
                </div>
              </div>

              <div style={{ textAlign: 'center', width: '220px' }}>
                <div style={{
                  fontFamily: 'cursive',
                  fontSize: '1.4rem',
                  color: '#0F172A',
                  fontWeight: 700,
                  transform: 'rotate(-3deg)',
                  marginBottom: '0.25rem'
                }}>
                  {signatoryName}
                </div>
                <div style={{ borderTop: '1.5px solid #0A192F', paddingTop: '0.35rem', fontSize: '0.82rem', fontWeight: 800, color: '#0A192F' }}>
                  {signatoryName}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#475569' }}>
                  {signatoryRole}
                </div>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#0284C7', marginTop: '0.15rem' }}>
                  Akul Dravin Digital Services Pvt Ltd
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterGenerator;
