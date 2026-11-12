import React from 'react';
import { ADCS_BRAND_IDENTITY, ADCS_LOGO_ASSETS, ADCSLogoVariant } from '../../config/brandAssets';

export interface ADCSLogoProps {
  variant?: ADCSLogoVariant;
  theme?: 'light' | 'dark';
  height?: number | string;
  width?: number | string;
  className?: string;
  style?: React.CSSProperties;
  alt?: string;
  decorative?: boolean;
  /** Optional override image URL from White-Label / Brand Management config */
  customSrc?: string;
}

const DEFAULT_HEIGHTS: Record<ADCSLogoVariant, number> = {
  icon: 32,
  compact: 40,
  header: 52,
  footer: 76,
  document: 68,
  certificate: 96,
  print: 76,
  full: 140,
  light: 120,
  dark: 120,
  login: 136,
  splash: 180,
};

function resolveLogoSrc(variant: ADCSLogoVariant, theme: 'light' | 'dark', customSrc?: string): string {
  if (customSrc && customSrc.trim().length > 0) {
    return customSrc;
  }
  switch (variant) {
    case 'icon':
      return ADCS_LOGO_ASSETS.favicon32;
    case 'compact':
      return ADCS_LOGO_ASSETS.emblem;
    case 'header':
      return theme === 'dark' ? ADCS_LOGO_ASSETS.dark : ADCS_LOGO_ASSETS.header;
    case 'footer':
      return ADCS_LOGO_ASSETS.footer;
    case 'dark':
      return ADCS_LOGO_ASSETS.dark;
    case 'certificate':
      return ADCS_LOGO_ASSETS.certificate;
    case 'document':
    case 'print':
    case 'light':
      return ADCS_LOGO_ASSETS.light;
    case 'login':
    case 'splash':
      return theme === 'dark' ? ADCS_LOGO_ASSETS.dark : ADCS_LOGO_ASSETS.login;
    case 'full':
    default:
      return theme === 'dark' ? ADCS_LOGO_ASSETS.dark : ADCS_LOGO_ASSETS.light;
  }
}

/**
 * Universal ADCS Logo Component
 * Renders exact official AKUL DRAVIN DIGITAL SERVICES brand artwork without distortion.
 */
export const ADCSLogo: React.FC<ADCSLogoProps> = ({
  variant = 'full',
  theme = 'light',
  height,
  width,
  className = '',
  style,
  alt = `${ADCS_BRAND_IDENTITY.legalName} — ${ADCS_BRAND_IDENTITY.slogan}`,
  decorative = false,
  customSrc,
}) => {
  const src = resolveLogoSrc(variant, theme, customSrc);
  const resolvedHeight = height ?? DEFAULT_HEIGHTS[variant];

  return (
    <img
      src={src}
      alt={decorative ? '' : alt}
      aria-hidden={decorative ? true : undefined}
      className={`adcs-logo adcs-logo-${variant} ${className}`.trim()}
      style={{
        height: typeof resolvedHeight === 'number' ? `${resolvedHeight}px` : resolvedHeight,
        width: width ? (typeof width === 'number' ? `${width}px` : width) : 'auto',
        maxWidth: '100%',
        objectFit: 'contain',
        display: 'block',
        userSelect: 'none',
        flexShrink: 0,
        ...style,
      }}
      loading="eager"
      decoding="async"
    />
  );
};
