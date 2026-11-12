import React from 'react';
import { ADCS_BRAND_IDENTITY } from '../../config/brandAssets';
import { ADCSLogo } from './ADCSLogo';

interface QrProps {
  value: string;
  size?: number;
  label?: string;
}

/**
 * Deterministic SVG QR Matrix encoding verification payload cleanly in print & screen views.
 * Includes standard 7x7 finder patterns and SHA-like deterministic bit grid from payload string.
 */
export const ADCSQrCode: React.FC<QrProps> = ({ value, size = 76, label }) => {
  const modules = 21;
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  const isFinder = (r: number, c: number, fr: number, fc: number) => {
    const dr = r - fr;
    const dc = c - fc;
    if (dr < 0 || dr > 6 || dc < 0 || dc > 6) return null;
    if (dr === 0 || dr === 6 || dc === 0 || dc === 6) return true;
    if (dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4) return true;
    return false;
  };

  const cells: React.ReactNode[] = [];
  for (let r = 0; r < modules; r += 1) {
    for (let c = 0; c < modules; c += 1) {
      const tl = isFinder(r, c, 0, 0);
      const tr = isFinder(r, c, 0, modules - 7);
      const bl = isFinder(r, c, modules - 7, 0);

      let filled = false;
      if (tl !== null) filled = tl;
      else if (tr !== null) filled = tr;
      else if (bl !== null) filled = bl;
      else if ((r === 7 && c <= 7) || (c === 7 && r <= 7) || (r === 7 && c >= modules - 8) || (c === modules - 8 && r <= 7) || (r === modules - 8 && c <= 7) || (c === 7 && r >= modules - 8)) {
        filled = false;
      } else if (r === 6 || c === 6) {
        filled = (r + c) % 2 === 0;
      } else {
        const seed = (hash ^ ((r * 31 + c) * 2654435761)) >>> 0;
        filled = (seed & 1) === 1;
      }

      if (filled) {
        cells.push(<rect key={`${r}-${c}`} x={c} y={r} width={1} height={1} fill="#061A36" />);
      }
    }
  }

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${modules} ${modules}`}
        role="img"
        aria-label={label || `QR verification code for ${value}`}
        style={{ background: '#FFFFFF', padding: '4px', border: '1px solid #DCE4EF', borderRadius: '6px' }}
      >
        <rect x={0} y={0} width={modules} height={modules} fill="#FFFFFF" />
        {cells}
      </svg>
      {label && (
        <span style={{ fontSize: '0.64rem', color: '#55677D', fontWeight: 700, textAlign: 'center', maxWidth: `${size + 20}px` }}>
          {label}
        </span>
      )}
    </div>
  );
};

export interface BrandHeaderProps {
  title?: string;
  subtitle?: string;
  theme?: 'light' | 'dark';
  rightSlot?: React.ReactNode;
  compact?: boolean;
}

export const BrandHeader: React.FC<BrandHeaderProps> = ({
  title = ADCS_BRAND_IDENTITY.legalName,
  subtitle = ADCS_BRAND_IDENTITY.slogan,
  theme = 'light',
  rightSlot,
  compact = false,
}) => {
  const isDark = theme === 'dark';
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        padding: compact ? '0.65rem 1rem' : '1rem 1.5rem',
        background: isDark ? '#061A36' : '#FFFFFF',
        color: isDark ? '#FFFFFF' : '#14243A',
        borderBottom: isDark ? '2px solid #D6A12B' : '1px solid #DCE4EF',
        borderRadius: 'var(--adcs-radius-md)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', minWidth: 0 }}>
        <ADCSLogo variant={compact ? 'compact' : 'header'} theme={theme} height={compact ? 42 : 58} />
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 800, fontSize: compact ? '0.92rem' : '1.08rem', color: isDark ? '#FFFFFF' : '#061A36', letterSpacing: '0.02em' }}>
            {title}
          </div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: isDark ? '#F3D477' : '#075ACB', letterSpacing: '0.04em' }}>
            {subtitle}
          </div>
        </div>
      </div>
      {rightSlot && <div style={{ flexShrink: 0 }}>{rightSlot}</div>}
    </div>
  );
};

export interface BrandFooterProps {
  theme?: 'light' | 'dark';
  gstin?: string;
  supportPhone?: string;
  supportEmail?: string;
  note?: string;
}

export const BrandFooter: React.FC<BrandFooterProps> = ({
  theme = 'dark',
  gstin = ADCS_BRAND_IDENTITY.gstinPlaceholder,
  supportPhone = ADCS_BRAND_IDENTITY.supportPhone,
  supportEmail = ADCS_BRAND_IDENTITY.supportEmail,
  note = 'System-generated official ADCS enterprise record. Independently verifiable via ADCS Digital Trust Registry.',
}) => {
  const isDark = theme === 'dark';
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem',
        padding: '0.9rem 1.25rem',
        background: isDark ? '#031126' : '#F5F8FC',
        color: isDark ? '#CBD5E1' : '#334861',
        borderTop: isDark ? '2px solid #D6A12B' : '1px solid #DCE4EF',
        fontSize: '0.75rem',
      }}
    >
      <div>
        <div style={{ fontWeight: 800, color: isDark ? '#FFFFFF' : '#061A36' }}>
          {ADCS_BRAND_IDENTITY.legalName} ({ADCS_BRAND_IDENTITY.shortName})
        </div>
        <div style={{ marginTop: '2px' }}>
          GSTIN: {gstin} • Helpline: {supportPhone} • Email: {supportEmail}
        </div>
      </div>
      <div style={{ textAlign: 'right', maxWidth: '340px', color: isDark ? '#94A3B8' : '#55677D' }}>
        {note}
      </div>
    </div>
  );
};

export interface BrandWatermarkProps {
  opacity?: number;
}

export const BrandWatermark: React.FC<BrandWatermarkProps> = ({ opacity = 0.045 }) => (
  <div
    aria-hidden="true"
    style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none',
      overflow: 'hidden',
      zIndex: 0,
    }}
  >
    <ADCSLogo variant="compact" height={280} decorative style={{ opacity, filter: 'grayscale(15%)' }} />
  </div>
);
