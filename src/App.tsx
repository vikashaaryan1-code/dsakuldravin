import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Common Interactive Components
import { RoleSwitcherBar } from './components/common/RoleSwitcherBar';
import { GlassNavbar } from './components/common/GlassNavbar';
import { Footer } from './components/common/Footer';
import { UniversalSmartSearch } from './components/common/UniversalSmartSearch';
import { QuantumAIPanel } from './components/common/QuantumAIPanel';
import { UnifiedCartModal } from './components/common/UnifiedCartModal';
import { UniversalTrackerModal } from './components/common/UniversalTrackerModal';
import { NotificationToaster } from './components/common/NotificationToaster';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { ServiceApplicationModal } from './components/modals/ServiceApplicationModal';
import { AuthModal } from './components/modals/AuthModal';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { ServiceBanners } from './components/common/ServiceBanners';

// Static Direct Page Imports (prevents transient dynamic chunk fetch failures across all routes)
import { HomePage } from './pages/HomePage';
import { ServicesMarketplacePage } from './pages/ServicesMarketplacePage';
import { GovernmentServicesPage } from './pages/GovernmentServicesPage';
import { CyberCafePage } from './pages/CyberCafePage';
import { BusinessServicesPage } from './pages/BusinessServicesPage';
import { DocumentCenterPage } from './pages/DocumentCenterPage';
import { UtilityBillsPage } from './pages/UtilityBillsPage';
import { TravelPage } from './pages/TravelPage';
import { PropertyPage } from './pages/PropertyPage';
import { RentalManagementPage } from './pages/RentalManagementPage';
import { ConstructionPage } from './pages/ConstructionPage';
import { CCTVPage } from './pages/CCTVPage';
import { CourierPage } from './pages/CourierPage';
import { FinanceLoansPage } from './pages/FinanceLoansPage';
import { InsurancePage } from './pages/InsurancePage';
import { WebsiteITPage } from './pages/WebsiteITPage';
import { ConsultingPage } from './pages/ConsultingPage';
import { EducationPage } from './pages/EducationPage';
import { FranchisePage } from './pages/FranchisePage';
import { PricingPage } from './pages/PricingPage';
import { TrackPage } from './pages/TrackPage';
import { QuantumAIPage } from './pages/QuantumAIPage';

// Company & Support Pages
import {
  AboutPage,
  ContactPage,
  SupportPage,
  FaqPage,
  BlogPage,
  LocationsPage,
  AuthPage,
} from './pages/AboutContactPages';

// Business Suite Pages
import { CRMPage } from './pages/business-suite/CRMPage';
import { HRMSPage } from './pages/business-suite/HRMSPage';
import { ERPPage } from './pages/business-suite/ERPPage';
import { MarketingPage } from './pages/business-suite/MarketingPage';

// Multi-Tenant Role Portals
import { CustomerPortal } from './pages/portals/CustomerPortal';
import { DigitalCenterPortal } from './pages/portals/DigitalCenterPortal';
import { CyberCafeOperatorPortal } from './pages/portals/CyberCafeOperatorPortal';
import { FranchisePortal } from './pages/portals/FranchisePortal';
import { DistributorPortal } from './pages/portals/DistributorPortal';
import { AffiliatePortal } from './pages/portals/AffiliatePortal';
import { FinancePortal } from './pages/portals/FinancePortal';
import { SupportPortal } from './pages/portals/SupportPortal';
import { EmployeePortal } from './pages/portals/EmployeePortal';
import { PartnerPortal } from './pages/portals/PartnerPortal';
import { SuperAdminPortal } from './pages/portals/SuperAdminPortal';
import { AdvocatePortal } from './pages/portals/AdvocatePortal';
import { InstructorPortal } from './pages/portals/InstructorPortal';
import { StudentPortal } from './pages/portals/StudentPortal';
import { TechnicianPortal } from './pages/portals/TechnicianPortal';
import { AcademyCertificateVerificationPage } from './pages/AcademyCertificateVerificationPage';
import { PANApplicationPage } from './pages/PANApplicationPage';

// CSC Connect & Digital Seva Sovereign Pages
import { CSCConnectLoginPage } from './pages/csc/CSCConnectLoginPage';
import { CSCAuthCallbackPage } from './pages/csc/CSCAuthCallbackPage';
import { DigitalSevaPortal } from './pages/csc/DigitalSevaPortal';
import { CSCMainPortalPage } from './pages/csc/CSCMainPortalPage';

// Vedic Astrology Suite Pages
import { AstrologyHubPage } from './pages/astrology/AstrologyHubPage';
import { KundliPage } from './pages/astrology/KundliPage';
import { KundliMatchingPage } from './pages/astrology/KundliMatchingPage';
import { RashifalPage } from './pages/astrology/RashifalPage';
import { PanchangPage } from './pages/astrology/PanchangPage';
import { TarotPage } from './pages/astrology/TarotPage';
import { NumerologyPage } from './pages/astrology/NumerologyPage';
import { GemstonePage } from './pages/astrology/GemstonePage';
import { AstrologersDirectoryPage } from './pages/astrology/AstrologersDirectoryPage';
import { AstroStorePage } from './pages/astrology/AstroStorePage';
import { AstroBlogPage } from './pages/astrology/AstroBlogPage';
import { AstroContactPage } from './pages/astrology/AstroContactPage';
import { AstroAdminPage } from './pages/astrology/AstroAdminPage';
import { AstroProcessPage } from './pages/astrology/AstroProcessPage';
import { AstroAgentPage } from './pages/astrology/AstroAgentPage';
import { AstroCertificatePage } from './pages/astrology/AstroCertificatePage';

export const App: React.FC = () => {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--adcs-background)', color: 'var(--adcs-text)' }}>
      <a href="#main-content" className="adcs-skip-link">Skip to main content</a>
      {/* Top Universal Role Switcher & Portal Bar */}
      <RoleSwitcherBar />

      {/* Global ADCS Brand Navbar */}
      <GlassNavbar />

      {/* Main Content Viewport */}
      <main id="main-content" style={{ flex: 1, paddingBottom: '60px' }}>
        <ErrorBoundary key={pathname}>
          <Routes>
            {/* Public Super Marketplace Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesMarketplacePage />} />
            <Route path="/digital-services" element={<ServicesMarketplacePage />} />
            <Route path="/government" element={<GovernmentServicesPage />} />
            <Route path="/passport" element={<GovernmentServicesPage />} />
            <Route path="/pan" element={<PANApplicationPage />} />
            <Route path="/form49a" element={<PANApplicationPage />} />
            <Route path="/uti-pan" element={<PANApplicationPage />} />
            <Route path="/nsdl-pan" element={<PANApplicationPage />} />
            <Route path="/cyber-cafe" element={<CyberCafePage />} />
            <Route path="/business" element={<BusinessServicesPage />} />
            <Route path="/documents" element={<DocumentCenterPage />} />
            <Route path="/bills" element={<UtilityBillsPage />} />
            <Route path="/travel" element={<TravelPage />} />
            <Route path="/visa" element={<TravelPage />} />
            <Route path="/property" element={<PropertyPage />} />
            <Route path="/rental" element={<RentalManagementPage />} />
            <Route path="/construction" element={<ConstructionPage />} />
            <Route path="/cctv" element={<CCTVPage />} />
            <Route path="/courier" element={<CourierPage />} />
            <Route path="/finance" element={<FinanceLoansPage />} />
            <Route path="/insurance" element={<InsurancePage />} />
            <Route path="/website-it" element={<WebsiteITPage />} />
            <Route path="/design" element={<WebsiteITPage />} />
            <Route path="/consulting" element={<ConsultingPage />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/franchise" element={<FranchisePage />} />
            <Route path="/pricing" element={<PricingPage />} />

            {/* Company & Support Information */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/locations" element={<LocationsPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/register" element={<AuthPage />} />
            <Route path="/track" element={<TrackPage />} />
            <Route path="/ai" element={<QuantumAIPage />} />
            <Route path="/quantum-ai" element={<QuantumAIPage />} />

            {/* Business Suite Pages */}
            <Route path="/crm" element={<CRMPage />} />
            <Route path="/hrms" element={<HRMSPage />} />
            <Route path="/erp" element={<ERPPage />} />
            <Route path="/marketing" element={<MarketingPage />} />
            <Route path="/marketing-automation" element={<MarketingPage />} />

            {/* CSC National Ecosystem & Digital Seva Routes */}
            <Route path="/csc" element={<CSCMainPortalPage />} />
            <Route path="/register-vle" element={<CSCMainPortalPage />} />
            <Route path="/connect/csc" element={<CSCConnectLoginPage />} />
            <Route path="/account/authorize" element={<CSCConnectLoginPage />} />
            <Route path="/auth/callback" element={<CSCAuthCallbackPage />} />
            <Route path="/auth/callback/" element={<CSCAuthCallbackPage />} />
            <Route path="/digitalseva" element={<ProtectedRoute allowedRoles={['vle', 'admin']} portalName="ADCS Digital Seva Kendra & Management Portal"><DigitalSevaPortal /></ProtectedRoute>} />
            <Route path="/digitalseva/*" element={<ProtectedRoute allowedRoles={['vle', 'admin']} portalName="ADCS Digital Seva Kendra & Management Portal"><DigitalSevaPortal /></ProtectedRoute>} />

            {/* Multi-Tenant Protected Role Portals & Universal Aliases */}
            <Route path="/customer" element={<ProtectedRoute allowedRoles={['customer', 'admin']} portalName="Customer Operations Dashboard"><CustomerPortal /></ProtectedRoute>} />
            <Route path="/customer/*" element={<ProtectedRoute allowedRoles={['customer', 'admin']} portalName="Customer Operations Dashboard"><CustomerPortal /></ProtectedRoute>} />
            <Route path="/customer/dashboard" element={<ProtectedRoute allowedRoles={['customer', 'admin']} portalName="Customer Operations Dashboard"><CustomerPortal /></ProtectedRoute>} />
            <Route path="/portal/customer" element={<ProtectedRoute allowedRoles={['customer', 'admin']} portalName="Customer Operations Dashboard"><CustomerPortal /></ProtectedRoute>} />
            <Route path="/portal/customer/*" element={<ProtectedRoute allowedRoles={['customer', 'admin']} portalName="Customer Operations Dashboard"><CustomerPortal /></ProtectedRoute>} />

            <Route path="/vle" element={<ProtectedRoute allowedRoles={['vle', 'admin']} portalName="Digital Center VLE Portal"><DigitalCenterPortal /></ProtectedRoute>} />
            <Route path="/vle/*" element={<ProtectedRoute allowedRoles={['vle', 'admin']} portalName="Digital Center VLE Portal"><DigitalCenterPortal /></ProtectedRoute>} />
            <Route path="/center" element={<ProtectedRoute allowedRoles={['vle', 'admin']} portalName="Digital Center VLE Portal"><DigitalCenterPortal /></ProtectedRoute>} />
            <Route path="/center/*" element={<ProtectedRoute allowedRoles={['vle', 'admin']} portalName="Digital Center VLE Portal"><DigitalCenterPortal /></ProtectedRoute>} />
            <Route path="/center/dashboard" element={<ProtectedRoute allowedRoles={['vle', 'admin']} portalName="Digital Center VLE Portal"><DigitalCenterPortal /></ProtectedRoute>} />
            <Route path="/digital-center" element={<ProtectedRoute allowedRoles={['vle', 'admin']} portalName="Digital Center VLE Portal"><DigitalCenterPortal /></ProtectedRoute>} />
            <Route path="/digital-center/*" element={<ProtectedRoute allowedRoles={['vle', 'admin']} portalName="Digital Center VLE Portal"><DigitalCenterPortal /></ProtectedRoute>} />
            <Route path="/portal/kendra" element={<ProtectedRoute allowedRoles={['vle', 'admin']} portalName="Digital Center VLE Portal"><DigitalCenterPortal /></ProtectedRoute>} />
            <Route path="/portal/kendra/*" element={<ProtectedRoute allowedRoles={['vle', 'admin']} portalName="Digital Center VLE Portal"><DigitalCenterPortal /></ProtectedRoute>} />

            <Route path="/cyber-cafe-operator" element={<ProtectedRoute allowedRoles={['cafe_operator', 'admin']} portalName="Cyber Cafe Workstation Command"><CyberCafeOperatorPortal /></ProtectedRoute>} />
            <Route path="/cyber-cafe-operator/*" element={<ProtectedRoute allowedRoles={['cafe_operator', 'admin']} portalName="Cyber Cafe Workstation Command"><CyberCafeOperatorPortal /></ProtectedRoute>} />
            <Route path="/cyber-cafe/operator" element={<ProtectedRoute allowedRoles={['cafe_operator', 'admin']} portalName="Cyber Cafe Workstation Command"><CyberCafeOperatorPortal /></ProtectedRoute>} />
            <Route path="/cyber-cafe/operator/*" element={<ProtectedRoute allowedRoles={['cafe_operator', 'admin']} portalName="Cyber Cafe Workstation Command"><CyberCafeOperatorPortal /></ProtectedRoute>} />
            <Route path="/portal/cyber-cafe" element={<ProtectedRoute allowedRoles={['cafe_operator', 'admin']} portalName="Cyber Cafe Workstation Command"><CyberCafeOperatorPortal /></ProtectedRoute>} />
            <Route path="/portal/cyber-cafe/*" element={<ProtectedRoute allowedRoles={['cafe_operator', 'admin']} portalName="Cyber Cafe Workstation Command"><CyberCafeOperatorPortal /></ProtectedRoute>} />

            <Route path="/franchise" element={<ProtectedRoute allowedRoles={['franchise', 'admin']} portalName="Master Franchise Regional Operations"><FranchisePortal /></ProtectedRoute>} />
            <Route path="/franchise/*" element={<ProtectedRoute allowedRoles={['franchise', 'admin']} portalName="Master Franchise Regional Operations"><FranchisePortal /></ProtectedRoute>} />
            <Route path="/portal/franchise" element={<ProtectedRoute allowedRoles={['franchise', 'admin']} portalName="Master Franchise Regional Operations"><FranchisePortal /></ProtectedRoute>} />
            <Route path="/portal/franchise/*" element={<ProtectedRoute allowedRoles={['franchise', 'admin']} portalName="Master Franchise Regional Operations"><FranchisePortal /></ProtectedRoute>} />

            <Route path="/distributor" element={<ProtectedRoute allowedRoles={['distributor', 'admin']} portalName="Territory Distributor Command Hub"><DistributorPortal /></ProtectedRoute>} />
            <Route path="/distributor/*" element={<ProtectedRoute allowedRoles={['distributor', 'admin']} portalName="Territory Distributor Command Hub"><DistributorPortal /></ProtectedRoute>} />
            <Route path="/portal/distributor" element={<ProtectedRoute allowedRoles={['distributor', 'admin']} portalName="Territory Distributor Command Hub"><DistributorPortal /></ProtectedRoute>} />
            <Route path="/portal/distributor/*" element={<ProtectedRoute allowedRoles={['distributor', 'admin']} portalName="Territory Distributor Command Hub"><DistributorPortal /></ProtectedRoute>} />

            <Route path="/affiliate" element={<ProtectedRoute allowedRoles={['affiliate', 'admin']} portalName="Affiliate Growth & Referral Portal"><AffiliatePortal /></ProtectedRoute>} />
            <Route path="/affiliate/*" element={<ProtectedRoute allowedRoles={['affiliate', 'admin']} portalName="Affiliate Growth & Referral Portal"><AffiliatePortal /></ProtectedRoute>} />
            <Route path="/portal/affiliate" element={<ProtectedRoute allowedRoles={['affiliate', 'admin']} portalName="Affiliate Growth & Referral Portal"><AffiliatePortal /></ProtectedRoute>} />
            <Route path="/portal/affiliate/*" element={<ProtectedRoute allowedRoles={['affiliate', 'admin']} portalName="Affiliate Growth & Referral Portal"><AffiliatePortal /></ProtectedRoute>} />

            <Route path="/finance-portal" element={<ProtectedRoute allowedRoles={['finance', 'admin']} portalName="FinTech General Ledger & Compliance"><FinancePortal /></ProtectedRoute>} />
            <Route path="/finance-portal/*" element={<ProtectedRoute allowedRoles={['finance', 'admin']} portalName="FinTech General Ledger & Compliance"><FinancePortal /></ProtectedRoute>} />
            <Route path="/portal/finance" element={<ProtectedRoute allowedRoles={['finance', 'admin']} portalName="FinTech General Ledger & Compliance"><FinancePortal /></ProtectedRoute>} />
            <Route path="/portal/finance/*" element={<ProtectedRoute allowedRoles={['finance', 'admin']} portalName="FinTech General Ledger & Compliance"><FinancePortal /></ProtectedRoute>} />

            <Route path="/support-portal" element={<ProtectedRoute allowedRoles={['executive', 'employee', 'admin']} portalName="SLA Escalation & Citizen Support"><SupportPortal /></ProtectedRoute>} />
            <Route path="/support-portal/*" element={<ProtectedRoute allowedRoles={['executive', 'employee', 'admin']} portalName="SLA Escalation & Citizen Support"><SupportPortal /></ProtectedRoute>} />
            <Route path="/portal/support" element={<ProtectedRoute allowedRoles={['executive', 'employee', 'admin']} portalName="SLA Escalation & Citizen Support"><SupportPortal /></ProtectedRoute>} />
            <Route path="/portal/support/*" element={<ProtectedRoute allowedRoles={['executive', 'employee', 'admin']} portalName="SLA Escalation & Citizen Support"><SupportPortal /></ProtectedRoute>} />

            <Route path="/employee" element={<ProtectedRoute allowedRoles={['executive', 'employee', 'admin']} portalName="Employee Corporate Workspace"><EmployeePortal /></ProtectedRoute>} />
            <Route path="/employee/*" element={<ProtectedRoute allowedRoles={['executive', 'employee', 'admin']} portalName="Employee Corporate Workspace"><EmployeePortal /></ProtectedRoute>} />
            <Route path="/portal/employee" element={<ProtectedRoute allowedRoles={['executive', 'employee', 'admin']} portalName="Employee Corporate Workspace"><EmployeePortal /></ProtectedRoute>} />
            <Route path="/portal/employee/*" element={<ProtectedRoute allowedRoles={['executive', 'employee', 'admin']} portalName="Employee Corporate Workspace"><EmployeePortal /></ProtectedRoute>} />

            <Route path="/portal/executive" element={<ProtectedRoute allowedRoles={['executive', 'employee', 'admin']} portalName="Executive Dashboard"><EmployeePortal /></ProtectedRoute>} />
            <Route path="/portal/executive/*" element={<ProtectedRoute allowedRoles={['executive', 'employee', 'admin']} portalName="Executive Dashboard"><EmployeePortal /></ProtectedRoute>} />

            <Route path="/partner" element={<ProtectedRoute allowedRoles={['partner', 'admin']} portalName="B2B Channel Partner Hub"><PartnerPortal /></ProtectedRoute>} />
            <Route path="/partner/*" element={<ProtectedRoute allowedRoles={['partner', 'admin']} portalName="B2B Channel Partner Hub"><PartnerPortal /></ProtectedRoute>} />
            <Route path="/portal/partner" element={<ProtectedRoute allowedRoles={['partner', 'admin']} portalName="B2B Channel Partner Hub"><PartnerPortal /></ProtectedRoute>} />
            <Route path="/portal/partner/*" element={<ProtectedRoute allowedRoles={['partner', 'admin']} portalName="B2B Channel Partner Hub"><PartnerPortal /></ProtectedRoute>} />

            <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']} portalName="Super Admin Sovereign Console"><SuperAdminPortal /></ProtectedRoute>} />
            <Route path="/admin/*" element={<ProtectedRoute allowedRoles={['admin']} portalName="Super Admin Sovereign Console"><SuperAdminPortal /></ProtectedRoute>} />
            <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']} portalName="Super Admin Sovereign Console"><SuperAdminPortal /></ProtectedRoute>} />
            <Route path="/portal/admin" element={<ProtectedRoute allowedRoles={['admin']} portalName="Super Admin Sovereign Console"><SuperAdminPortal /></ProtectedRoute>} />
            <Route path="/portal/admin/*" element={<ProtectedRoute allowedRoles={['admin']} portalName="Super Admin Sovereign Console"><SuperAdminPortal /></ProtectedRoute>} />

            {/* 15 Role Portals & Academy Routes */}
            <Route path="/advocate" element={<ProtectedRoute allowedRoles={['advocate', 'admin']} portalName="Advocate Practice & Consultation Desk"><AdvocatePortal /></ProtectedRoute>} />
            <Route path="/advocate/*" element={<ProtectedRoute allowedRoles={['advocate', 'admin']} portalName="Advocate Practice & Consultation Desk"><AdvocatePortal /></ProtectedRoute>} />
            <Route path="/portal/advocate" element={<ProtectedRoute allowedRoles={['advocate', 'admin']} portalName="Advocate Practice & Consultation Desk"><AdvocatePortal /></ProtectedRoute>} />
            <Route path="/portal/advocate/*" element={<ProtectedRoute allowedRoles={['advocate', 'admin']} portalName="Advocate Practice & Consultation Desk"><AdvocatePortal /></ProtectedRoute>} />

            <Route path="/instructor" element={<ProtectedRoute allowedRoles={['instructor', 'admin']} portalName="ADCS Academy Instructor Desk"><InstructorPortal /></ProtectedRoute>} />
            <Route path="/instructor/*" element={<ProtectedRoute allowedRoles={['instructor', 'admin']} portalName="ADCS Academy Instructor Desk"><InstructorPortal /></ProtectedRoute>} />
            <Route path="/portal/instructor" element={<ProtectedRoute allowedRoles={['instructor', 'admin']} portalName="ADCS Academy Instructor Desk"><InstructorPortal /></ProtectedRoute>} />
            <Route path="/portal/instructor/*" element={<ProtectedRoute allowedRoles={['instructor', 'admin']} portalName="ADCS Academy Instructor Desk"><InstructorPortal /></ProtectedRoute>} />

            <Route path="/student" element={<ProtectedRoute allowedRoles={['student', 'admin', 'customer']} portalName="ADCS Academy Student Console"><StudentPortal /></ProtectedRoute>} />
            <Route path="/student/*" element={<ProtectedRoute allowedRoles={['student', 'admin', 'customer']} portalName="ADCS Academy Student Console"><StudentPortal /></ProtectedRoute>} />
            <Route path="/portal/student" element={<ProtectedRoute allowedRoles={['student', 'admin', 'customer']} portalName="ADCS Academy Student Console"><StudentPortal /></ProtectedRoute>} />
            <Route path="/portal/student/*" element={<ProtectedRoute allowedRoles={['student', 'admin', 'customer']} portalName="ADCS Academy Student Console"><StudentPortal /></ProtectedRoute>} />
            <Route path="/academy" element={<StudentPortal />} />
            <Route path="/academy/*" element={<StudentPortal />} />

            <Route path="/technician" element={<ProtectedRoute allowedRoles={['technician', 'admin']} portalName="Field Technician Dispatch Console"><TechnicianPortal /></ProtectedRoute>} />
            <Route path="/technician/*" element={<ProtectedRoute allowedRoles={['technician', 'admin']} portalName="Field Technician Dispatch Console"><TechnicianPortal /></ProtectedRoute>} />
            <Route path="/portal/technician" element={<ProtectedRoute allowedRoles={['technician', 'admin']} portalName="Field Technician Dispatch Console"><TechnicianPortal /></ProtectedRoute>} />
            <Route path="/portal/technician/*" element={<ProtectedRoute allowedRoles={['technician', 'admin']} portalName="Field Technician Dispatch Console"><TechnicianPortal /></ProtectedRoute>} />

            <Route path="/verify-certificate/:certId" element={<AcademyCertificateVerificationPage />} />
            <Route path="/verify-certificate" element={<AcademyCertificateVerificationPage />} />

            {/* Complete Astrology (ज्योतिष) Suite Routes */}
            <Route path="/astrology" element={<AstrologyHubPage />} />
            <Route path="/astrology/kundli" element={<KundliPage />} />
            <Route path="/kundli" element={<KundliPage />} />
            <Route path="/astrology/matching" element={<KundliMatchingPage />} />
            <Route path="/matchmaking" element={<KundliMatchingPage />} />
            <Route path="/kundli-matching" element={<KundliMatchingPage />} />
            <Route path="/astrology/rashifal" element={<RashifalPage />} />
            <Route path="/rashifal" element={<RashifalPage />} />
            <Route path="/horoscope" element={<RashifalPage />} />
            <Route path="/astrology/panchang" element={<PanchangPage />} />
            <Route path="/panchang" element={<PanchangPage />} />
            <Route path="/astrology/tarot" element={<TarotPage />} />
            <Route path="/tarot" element={<TarotPage />} />
            <Route path="/astrology/numerology" element={<NumerologyPage />} />
            <Route path="/numerology" element={<NumerologyPage />} />
            <Route path="/astrology/gemstones" element={<GemstonePage />} />
            <Route path="/gemstones" element={<GemstonePage />} />
            <Route path="/astrology/astrologers" element={<AstrologersDirectoryPage />} />
            <Route path="/astrologers" element={<AstrologersDirectoryPage />} />
            <Route path="/astrology/store" element={<AstroStorePage />} />
            <Route path="/astro-store" element={<AstroStorePage />} />
            <Route path="/astrology/blog" element={<AstroBlogPage />} />
            <Route path="/astro-blog" element={<AstroBlogPage />} />
            <Route path="/astrology/contact" element={<AstroContactPage />} />
            <Route path="/ask-astrologer" element={<AstroContactPage />} />
            <Route path="/astrology/admin" element={<AstroAdminPage />} />
            <Route path="/astro-admin" element={<AstroAdminPage />} />
            <Route path="/astrology/process" element={<AstroProcessPage />} />
            <Route path="/astro-process" element={<AstroProcessPage />} />
            <Route path="/process" element={<AstroProcessPage />} />
            <Route path="/astrology/agent" element={<AstroAgentPage />} />
            <Route path="/astro-agent" element={<AstroAgentPage />} />
            <Route path="/agent" element={<AstroAgentPage />} />
            <Route path="/astrology/certificate" element={<AstroCertificatePage />} />
            <Route path="/astro-certificate" element={<AstroCertificatePage />} />
            <Route path="/certificate" element={<AstroCertificatePage />} />

            {/* Fallback */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </ErrorBoundary>

        {/* Multi-Service Campaign Banners across Sector & Portal Routes */}
        {!['/', '/pricing', '/login', '/connect/csc', '/auth/callback', '/services', '/digital-services'].includes(pathname) && (
          <div className="container-wide adcs-no-print" style={{ marginTop: '1.5rem' }}>
            <ServiceBanners sectorFilter={pathname.split('/')[1] || undefined} mode="strip" />
          </div>
        )}
      </main>

      {/* Global Interactive Modals & Copilots */}
      <UniversalSmartSearch />
      <QuantumAIPanel />
      <UnifiedCartModal />
      <UniversalTrackerModal />
      <ServiceApplicationModal />
      <AuthModal />
      <NotificationToaster />

      {/* Responsive Mobile Bottom Navigation Bar */}
      <MobileBottomNav />

      {/* Master Institutional Footer */}
      <Footer />
    </div>
  );
};
