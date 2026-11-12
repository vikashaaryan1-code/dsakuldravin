import React from 'react';
import { ShieldCheck, CheckCircle2, History } from 'lucide-react';
import { ADCS_BRAND_IDENTITY } from '../../config/brandAssets';
import { ADCSLogo } from './ADCSLogo';
import { ADCSQrCode, BrandWatermark } from './BrandShells';

export interface CertificateBrandingProps {
  certificateId: string;
  certificateTitle: string;
  recipientName: string;
  credentialDetail: string;
  subtitleOrCourse?: string;
  issueDate: string;
  gradeOrScore?: string;
  issuerName: string;
  issuerDesignation: string;
  organizationName?: string;
  credentialTypeLabel?: string;
  disclaimer?: string;
  verificationUrl?: string;
  documentHash?: string;
  versionNumber?: number;
  reissueMeta?: {
    reason: string;
    reissuedBy: string;
    reissuedAt: string;
    originalIssueDate: string;
  };
  orientation?: 'landscape' | 'portrait';
  logoUrl?: string;
  footerText?: string;
}

/**
 * Enterprise A4 Certificate Renderer with Official ADCS Identity
 * Deep Navy typography (#061A36), Metallic Gold ornamental borders (#D6A12B / #F3D477),
 * Royal Blue accents (#075ACB), QR verification code, SHA-256 hash & reissue integrity history.
 */
export const CertificateBranding: React.FC<CertificateBrandingProps> = ({
  certificateId,
  certificateTitle,
  recipientName,
  credentialDetail,
  subtitleOrCourse,
  issueDate,
  gradeOrScore,
  issuerName,
  issuerDesignation,
  organizationName = ADCS_BRAND_IDENTITY.legalName,
  credentialTypeLabel = 'Official ADCS Private Enterprise & Academic Credential',
  disclaimer = 'Issued exclusively by AKUL DRAVIN DIGITAL SERVICES (ADCS). Not a statutory government degree unless explicitly counter-certified by a recognized statutory board.',
  verificationUrl,
  documentHash,
  versionNumber = 1,
  reissueMeta,
  orientation = 'landscape',
  logoUrl,
  footerText = `${ADCS_BRAND_IDENTITY.slogan} • ${ADCS_BRAND_IDENTITY.supportEmail}`,
}) => {
  const verifyTarget =
    verificationUrl || `${ADCS_BRAND_IDENTITY.verificationBaseUrl}?id=${encodeURIComponent(certificateId)}`;
  const isLandscape = orientation === 'landscape';

  return (
    <div
      id="printable-certificate-area"
      className="adcs-print-sheet"
      style={{
        position: 'relative',
        background: '#FFFFFF',
        color: '#061A36',
        border: '10px double #061A36',
        outline: '3px solid #D6A12B',
        outlineOffset: '-16px',
        padding: isLandscape ? '2.5rem 2.75rem' : '2.75rem 2.25rem',
        borderRadius: '4px',
        maxWidth: isLandscape ? '1040px' : '760px',
        minHeight: isLandscape ? '660px' : '940px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 'var(--adcs-shadow-lg)',
        overflow: 'hidden',
      }}
    >
      <BrandWatermark opacity={0.04} />

      {/* Top Ornamental Header */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '1rem',
            borderBottom: '2px solid #F3D477',
            paddingBottom: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <ADCSLogo variant="certificate" customSrc={logoUrl} height={88} />
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#075ACB', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {credentialTypeLabel}
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#061A36', letterSpacing: '0.03em', marginTop: '2px' }}>
                {organizationName}
              </div>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#55677D', letterSpacing: '0.04em' }}>
                {ADCS_BRAND_IDENTITY.slogan}
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '0.28rem 0.65rem', background: '#061A36', color: '#F3D477', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800 }}>
              <ShieldCheck size={14} /> VERIFIED CREDENTIAL
            </div>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#061A36', fontFamily: 'var(--adcs-font-mono)', marginTop: '6px' }}>
              Cert No: {certificateId}
            </div>
            {versionNumber > 1 && (
              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#075ACB', marginTop: '2px' }}>
                Reissue Edition v{versionNumber}.0 (Original Preserved)
              </div>
            )}
          </div>
        </div>

        {/* Certificate Title */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <h1
            style={{
              fontSize: isLandscape ? '2.05rem' : '1.75rem',
              fontWeight: 900,
              color: '#061A36',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '0.45rem',
            }}
          >
            {certificateTitle}
          </h1>
          <div style={{ width: '120px', height: '3px', background: 'linear-gradient(90deg, #075ACB, #D6A12B)', margin: '0 auto 1.25rem' }} />

          <p style={{ fontSize: '0.96rem', color: '#334861', marginBottom: '0.4rem' }}>
            This credential is proudly conferred upon
          </p>

          <div
            style={{
              fontSize: isLandscape ? '2.25rem' : '1.9rem',
              fontWeight: 900,
              color: '#075ACB',
              borderBottom: '2px solid #D6A12B',
              display: 'inline-block',
              padding: '0.2rem 2rem 0.35rem',
              margin: '0.25rem 0 0.85rem',
            }}
          >
            {recipientName}
          </div>

          {subtitleOrCourse && (
            <div style={{ fontSize: '1.12rem', fontWeight: 800, color: '#061A36', marginBottom: '0.6rem' }}>
              {subtitleOrCourse}
            </div>
          )}

          <p style={{ fontSize: '0.96rem', color: '#14243A', lineHeight: 1.75, maxWidth: '760px', margin: '0 auto' }}>
            {credentialDetail}
          </p>

          {gradeOrScore && (
            <div style={{ marginTop: '0.95rem' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '0.35rem 1rem',
                  background: '#FEF6DF',
                  border: '1px solid #D6A12B',
                  color: '#061A36',
                  borderRadius: '999px',
                  fontSize: '0.84rem',
                  fontWeight: 800,
                }}
              >
                <CheckCircle2 size={15} color="#075ACB" /> {gradeOrScore}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Reissue Audit Notice (if controlled reissue) */}
      {reissueMeta && (
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            margin: '1rem 0',
            padding: '0.55rem 0.85rem',
            background: '#F5F8FC',
            border: '1px solid #DCE4EF',
            borderLeft: '4px solid #075ACB',
            borderRadius: '6px',
            fontSize: '0.72rem',
            color: '#334861',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <History size={14} color="#075ACB" />
          <span>
            <strong>Controlled Branding Reissue (v{versionNumber}.0):</strong> Original issue date {reissueMeta.originalIssueDate} preserved • Reissued on {reissueMeta.reissuedAt} by {reissueMeta.reissuedBy} • Reason: {reissueMeta.reason}
          </span>
        </div>
      )}

      {/* Bottom Verification & Signatory Block */}
      <div style={{ position: 'relative', zIndex: 1, marginTop: '1.5rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '1.5rem',
            paddingTop: '1.1rem',
            borderTop: '1px solid #DCE4EF',
          }}
        >
          <div>
            <div style={{ fontSize: '0.74rem', color: '#55677D', fontWeight: 700 }}>DATE OF ISSUE</div>
            <div style={{ fontSize: '0.94rem', fontWeight: 800, color: '#061A36' }}>{issueDate}</div>
            <div style={{ fontSize: '0.68rem', color: '#55677D', marginTop: '4px', maxWidth: '280px', wordBreak: 'break-all' }}>
              Verify: {verifyTarget}
            </div>
            {documentHash && (
              <div style={{ fontSize: '0.66rem', color: '#075ACB', fontFamily: 'var(--adcs-font-mono)', marginTop: '2px' }}>
                SHA-256: {documentHash.slice(0, 24)}...
              </div>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <ADCSQrCode value={verifyTarget} size={74} label="Scan to Verify" />
            <div style={{ textAlign: 'right', minWidth: '210px' }}>
              <div
                style={{
                  fontFamily: 'Georgia, serif',
                  fontStyle: 'italic',
                  fontSize: '1.15rem',
                  color: '#075ACB',
                  fontWeight: 700,
                }}
              >
                {issuerName}
              </div>
              <div style={{ borderTop: '2px solid #061A36', marginTop: '4px', paddingTop: '4px' }}>
                <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#061A36' }}>{issuerName}</div>
                <div style={{ fontSize: '0.72rem', color: '#55677D', fontWeight: 600 }}>{issuerDesignation}</div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: '0.95rem',
            paddingTop: '0.6rem',
            borderTop: '1px dashed #DCE4EF',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '0.5rem',
            fontSize: '0.68rem',
            color: '#55677D',
          }}
        >
          <span>{disclaimer}</span>
          <strong style={{ color: '#061A36' }}>{footerText}</strong>
        </div>
      </div>
    </div>
  );
};
