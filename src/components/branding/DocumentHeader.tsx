import React from 'react';
import { ADCS_BRAND_IDENTITY } from '../../config/brandAssets';
import { ADCSLogo } from './ADCSLogo';
import { ADCSQrCode } from './BrandShells';

export type ADCSDocumentType =
  | 'TAX INVOICE'
  | 'PAYMENT RECEIPT'
  | 'APPLICATION RECEIPT'
  | 'APPLICATION ACKNOWLEDGEMENT'
  | 'OFFICIAL LETTERHEAD'
  | 'SERVICE REPORT'
  | 'WORK ORDER'
  | 'JOB CARD'
  | 'DELIVERY RECEIPT'
  | 'QUOTATION'
  | 'RENTAL RECEIPT'
  | 'UTILITY RECEIPT'
  | 'WAYBILL RECEIPT'
  | 'FRANCHISE AGREEMENT'
  | 'PARTNER ONBOARDING'
  | 'SETTLEMENT STATEMENT';

export interface DocumentHeaderProps {
  documentType: ADCSDocumentType | string;
  documentNumber: string;
  issuedDate: string;
  brandName?: string;
  tagline?: string;
  gstin?: string;
  supportPhone?: string;
  supportEmail?: string;
  logoUrl?: string;
  branchOrCenter?: string;
  verificationUrl?: string;
  showQr?: boolean;
}

/**
 * Standardized ADCS Official Document & Receipt Header
 * Note: Never apply to government-issued identity documents (Aadhaar, PAN, Passport, etc.).
 */
export const DocumentHeader: React.FC<DocumentHeaderProps> = ({
  documentType,
  documentNumber,
  issuedDate,
  brandName = ADCS_BRAND_IDENTITY.legalName,
  tagline = ADCS_BRAND_IDENTITY.slogan,
  gstin = ADCS_BRAND_IDENTITY.gstinPlaceholder,
  supportPhone = ADCS_BRAND_IDENTITY.supportPhone,
  supportEmail = ADCS_BRAND_IDENTITY.supportEmail,
  logoUrl,
  branchOrCenter,
  verificationUrl,
  showQr = true,
}) => {
  const qrTarget =
    verificationUrl ||
    `${ADCS_BRAND_IDENTITY.verificationBaseUrl}?doc=${encodeURIComponent(documentNumber)}`;

  return (
    <div
      style={{
        borderBottom: '3px solid #061A36',
        paddingBottom: '1rem',
        marginBottom: '1.25rem',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <ADCSLogo variant="document" customSrc={logoUrl} height={74} />
        <div>
          <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#075ACB', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {ADCS_BRAND_IDENTITY.divisionTag}
          </div>
          <h2 style={{ margin: '2px 0', fontSize: '1.22rem', fontWeight: 900, color: '#061A36', letterSpacing: '0.01em' }}>
            {brandName}
          </h2>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#55677D', letterSpacing: '0.04em' }}>
            {tagline}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#334861', marginTop: '4px' }}>
            GSTIN: <strong>{gstin}</strong> • Helpline: {supportPhone} • {supportEmail}
          </div>
          {branchOrCenter && (
            <div style={{ fontSize: '0.72rem', color: '#075ACB', fontWeight: 700, marginTop: '2px' }}>
              Issuing Desk: {branchOrCenter}
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginLeft: 'auto' }}>
        <div style={{ textAlign: 'right' }}>
          <div
            style={{
              display: 'inline-block',
              padding: '0.28rem 0.72rem',
              background: '#061A36',
              color: '#F3D477',
              fontWeight: 800,
              fontSize: '0.72rem',
              letterSpacing: '0.06em',
              borderRadius: '4px',
              marginBottom: '6px',
            }}
          >
            {documentType}
          </div>
          <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#061A36', fontFamily: 'var(--adcs-font-mono)' }}>
            No: {documentNumber}
          </div>
          <div style={{ fontSize: '0.74rem', color: '#55677D', fontWeight: 600 }}>
            Date: {issuedDate}
          </div>
        </div>
        {showQr && <ADCSQrCode value={qrTarget} size={64} />}
      </div>
    </div>
  );
};
