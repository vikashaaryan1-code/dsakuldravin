/**
 * CENTRALIZED ADCS BRAND REGISTRY & DESIGN TOKEN METADATA
 * Single Source of Truth for AKUL DRAVIN DIGITAL SERVICES (ADCS)
 */

export const ADCS_BRAND_IDENTITY = {
  legalName: 'AKUL DRAVIN DIGITAL SERVICES',
  shortName: 'ADCS',
  slogan: 'HAR KAAM DIGITAL • HAR SAMADHAAN EK JAGAH',
  sloganHindi: 'हर काम डिजिटल • हर समाधान एक जगह',
  heroHeadline: 'One Platform. Every Service.',
  heroHeadlineHindi: 'एक मंच। हर सेवा।',
  divisionTag: 'AKUL DRAVIN GROUP OF ENTERPRISES',
  websiteUrl: 'https://ad-digital.in',
  supportEmail: 'contact@akuldravin.com',
  supportPhone: '+91 98765 43210',
  registeredAddress: 'Corporate Digital Tower, Sector 62, Noida / Delhi NCR, India - 201309',
  gstinPlaceholder: '07AAAAA0000A1Z5',
  cinPlaceholder: 'U72900DL2024PTC000001',
  verificationBaseUrl: 'https://ad-digital.in/verify-certificate',
} as const;

export const ADCS_LOGO_ASSETS = {
  originalJpg: '/branding/adcs-logo-original.jpg',
  master: '/branding/adcs-logo-master.png',
  light: '/branding/adcs-logo-light.png',
  dark: '/branding/adcs-logo-dark.png',
  emblem: '/branding/adcs-logo-emblem.png',
  header: '/branding/adcs-logo-header.png',
  footer: '/branding/adcs-logo-footer.png',
  certificate: '/branding/adcs-logo-certificate.png',
  login: '/branding/adcs-logo-login.png',
  favicon32: '/branding/adcs-favicon-32.png',
  icon192: '/branding/adcs-icon-192.png',
  icon512: '/branding/adcs-icon-512.png',
  faviconIco: '/branding/favicon.ico',
} as const;

export const ADCS_COLORS = {
  royalBlue: '#075ACB',
  royalBlueHover: '#064BA8',
  electricBlue: '#0878F9',
  deepNavy: '#061A36',
  midnightNavy: '#031126',
  metallicGold: '#D6A12B',
  champagneGold: '#F3D477',
  goldAccessibleText: '#946809',
  white: '#FFFFFF',
  softBg: '#F5F8FC',
  textPrimary: '#14243A',
  neutralSlate: '#64748B',
  accessibleSlate: '#55677D',
  border: '#DCE4EF',
} as const;

export const ADCS_APPROVED_SIGNATORIES = [
  {
    id: 'sig-director',
    name: 'Dr. Akul Dravin',
    designation: 'Managing Director & Authorized Signatory',
    organization: 'AKUL DRAVIN DIGITAL SERVICES',
  },
  {
    id: 'sig-registrar',
    name: 'A. K. Verma',
    designation: 'Controller of Examinations & Academic Registrar',
    organization: 'ADCS Academy of Excellence',
  },
  {
    id: 'sig-finance',
    name: 'R. S. Malhotra',
    designation: 'Chief Finance & Compliance Officer',
    organization: 'AKUL DRAVIN GROUP OF ENTERPRISES',
  },
] as const;

export type ADCSLogoVariant =
  | 'full'
  | 'compact'
  | 'icon'
  | 'header'
  | 'footer'
  | 'document'
  | 'certificate'
  | 'print'
  | 'dark'
  | 'light'
  | 'login'
  | 'splash';
