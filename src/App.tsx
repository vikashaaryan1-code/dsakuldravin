import React, { useEffect, Suspense } from 'react';
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
import { RouteLoadingFallback } from './components/common/RouteLoadingFallback';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Eagerly Loaded Core Landing Page for instantaneous first contentful paint
import { HomePage } from './pages/HomePage';

// Code-Splitting Helper for Named Exports
function lazyNamed<T extends Record<string, React.ComponentType<any>>>(
  importer: () => Promise<T>,
  name: keyof T
) {
  return React.lazy(() => importer().then((mod) => ({ default: mod[name] })));
}

// Lazy Loaded Public Super Marketplace Pages
const ServicesMarketplacePage = lazyNamed(() => import('./pages/ServicesMarketplacePage'), 'ServicesMarketplacePage');
const GovernmentServicesPage = lazyNamed(() => import('./pages/GovernmentServicesPage'), 'GovernmentServicesPage');
const CyberCafePage = lazyNamed(() => import('./pages/CyberCafePage'), 'CyberCafePage');
const BusinessServicesPage = lazyNamed(() => import('./pages/BusinessServicesPage'), 'BusinessServicesPage');
const DocumentCenterPage = lazyNamed(() => import('./pages/DocumentCenterPage'), 'DocumentCenterPage');
const UtilityBillsPage = lazyNamed(() => import('./pages/UtilityBillsPage'), 'UtilityBillsPage');
const TravelPage = lazyNamed(() => import('./pages/TravelPage'), 'TravelPage');
const PropertyPage = lazyNamed(() => import('./pages/PropertyPage'), 'PropertyPage');
const RentalManagementPage = lazyNamed(() => import('./pages/RentalManagementPage'), 'RentalManagementPage');
const ConstructionPage = lazyNamed(() => import('./pages/ConstructionPage'), 'ConstructionPage');
const CCTVPage = lazyNamed(() => import('./pages/CCTVPage'), 'CCTVPage');
const CourierPage = lazyNamed(() => import('./pages/CourierPage'), 'CourierPage');
const FinanceLoansPage = lazyNamed(() => import('./pages/FinanceLoansPage'), 'FinanceLoansPage');
const InsurancePage = lazyNamed(() => import('./pages/InsurancePage'), 'InsurancePage');
const WebsiteITPage = lazyNamed(() => import('./pages/WebsiteITPage'), 'WebsiteITPage');
const ConsultingPage = lazyNamed(() => import('./pages/ConsultingPage'), 'ConsultingPage');
const EducationPage = lazyNamed(() => import('./pages/EducationPage'), 'EducationPage');
const FranchisePage = lazyNamed(() => import('./pages/FranchisePage'), 'FranchisePage');
const PricingPage = lazyNamed(() => import('./pages/PricingPage'), 'PricingPage');
const TrackPage = lazyNamed(() => import('./pages/TrackPage'), 'TrackPage');
const QuantumAIPage = lazyNamed(() => import('./pages/QuantumAIPage'), 'QuantumAIPage');

// Lazy Loaded Company & Support Pages
const AboutPage = lazyNamed(() => import('./pages/AboutContactPages'), 'AboutPage');
const ContactPage = lazyNamed(() => import('./pages/AboutContactPages'), 'ContactPage');
const SupportPage = lazyNamed(() => import('./pages/AboutContactPages'), 'SupportPage');
const FaqPage = lazyNamed(() => import('./pages/AboutContactPages'), 'FaqPage');
const BlogPage = lazyNamed(() => import('./pages/AboutContactPages'), 'BlogPage');
const LocationsPage = lazyNamed(() => import('./pages/AboutContactPages'), 'LocationsPage');
const AuthPage = lazyNamed(() => import('./pages/AboutContactPages'), 'AuthPage');

// Lazy Loaded Business Suite Pages
const CRMPage = lazyNamed(() => import('./pages/business-suite/CRMPage'), 'CRMPage');
const HRMSPage = lazyNamed(() => import('./pages/business-suite/HRMSPage'), 'HRMSPage');
const ERPPage = lazyNamed(() => import('./pages/business-suite/ERPPage'), 'ERPPage');
const MarketingPage = lazyNamed(() => import('./pages/business-suite/MarketingPage'), 'MarketingPage');

// Lazy Loaded Multi-Tenant Role Portals
const CustomerPortal = lazyNamed(() => import('./pages/portals/CustomerPortal'), 'CustomerPortal');
const DigitalCenterPortal = lazyNamed(() => import('./pages/portals/DigitalCenterPortal'), 'DigitalCenterPortal');
const CyberCafeOperatorPortal = lazyNamed(() => import('./pages/portals/CyberCafeOperatorPortal'), 'CyberCafeOperatorPortal');
const FranchisePortal = lazyNamed(() => import('./pages/portals/FranchisePortal'), 'FranchisePortal');
const DistributorPortal = lazyNamed(() => import('./pages/portals/DistributorPortal'), 'DistributorPortal');
const AffiliatePortal = lazyNamed(() => import('./pages/portals/AffiliatePortal'), 'AffiliatePortal');
const FinancePortal = lazyNamed(() => import('./pages/portals/FinancePortal'), 'FinancePortal');
const SupportPortal = lazyNamed(() => import('./pages/portals/SupportPortal'), 'SupportPortal');
const EmployeePortal = lazyNamed(() => import('./pages/portals/EmployeePortal'), 'EmployeePortal');
const PartnerPortal = lazyNamed(() => import('./pages/portals/PartnerPortal'), 'PartnerPortal');
const SuperAdminPortal = lazyNamed(() => import('./pages/portals/SuperAdminPortal'), 'SuperAdminPortal');
const AdvocatePortal = lazyNamed(() => import('./pages/portals/AdvocatePortal'), 'AdvocatePortal');
const InstructorPortal = lazyNamed(() => import('./pages/portals/InstructorPortal'), 'InstructorPortal');
const StudentPortal = lazyNamed(() => import('./pages/portals/StudentPortal'), 'StudentPortal');
const TechnicianPortal = lazyNamed(() => import('./pages/portals/TechnicianPortal'), 'TechnicianPortal');
const AcademyCertificateVerificationPage = lazyNamed(() => import('./pages/AcademyCertificateVerificationPage'), 'AcademyCertificateVerificationPage');
const PANApplicationPage = lazyNamed(() => import('./pages/PANApplicationPage'), 'PANApplicationPage');

// Lazy Loaded CSC Connect & Digital Seva Sovereign Pages
const CSCConnectLoginPage = lazyNamed(() => import('./pages/csc/CSCConnectLoginPage'), 'CSCConnectLoginPage');
const CSCAuthCallbackPage = lazyNamed(() => import('./pages/csc/CSCAuthCallbackPage'), 'CSCAuthCallbackPage');
const DigitalSevaPortal = lazyNamed(() => import('./pages/csc/DigitalSevaPortal'), 'DigitalSevaPortal');
const CSCMainPortalPage = lazyNamed(() => import('./pages/csc/CSCMainPortalPage'), 'CSCMainPortalPage');

// Lazy Loaded Vedic Astrology Suite Pages
const AstrologyHubPage = lazyNamed(() => import('./pages/astrology/AstrologyHubPage'), 'AstrologyHubPage');
const KundliPage = lazyNamed(() => import('./pages/astrology/KundliPage'), 'KundliPage');
const KundliMatchingPage = lazyNamed(() => import('./pages/astrology/KundliMatchingPage'), 'KundliMatchingPage');
const RashifalPage = lazyNamed(() => import('./pages/astrology/RashifalPage'), 'RashifalPage');
const PanchangPage = lazyNamed(() => import('./pages/astrology/PanchangPage'), 'PanchangPage');
const TarotPage = lazyNamed(() => import('./pages/astrology/TarotPage'), 'TarotPage');
const NumerologyPage = lazyNamed(() => import('./pages/astrology/NumerologyPage'), 'NumerologyPage');
const GemstonePage = lazyNamed(() => import('./pages/astrology/GemstonePage'), 'GemstonePage');
const AstrologersDirectoryPage = lazyNamed(() => import('./pages/astrology/AstrologersDirectoryPage'), 'AstrologersDirectoryPage');
const AstroStorePage = lazyNamed(() => import('./pages/astrology/AstroStorePage'), 'AstroStorePage');
const AstroBlogPage = lazyNamed(() => import('./pages/astrology/AstroBlogPage'), 'AstroBlogPage');
const AstroContactPage = lazyNamed(() => import('./pages/astrology/AstroContactPage'), 'AstroContactPage');
const AstroAdminPage = lazyNamed(() => import('./pages/astrology/AstroAdminPage'), 'AstroAdminPage');
const AstroProcessPage = lazyNamed(() => import('./pages/astrology/AstroProcessPage'), 'AstroProcessPage');
const AstroAgentPage = lazyNamed(() => import('./pages/astrology/AstroAgentPage'), 'AstroAgentPage');
const AstroCertificatePage = lazyNamed(() => import('./pages/astrology/AstroCertificatePage'), 'AstroCertificatePage');

export const App: React.FC = () => {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-light)' }}>
      {/* Top Universal Role Switcher & Dev Toolbar */}
      <RoleSwitcherBar />

      {/* Global Cinematic Glass Navbar */}
      <GlassNavbar />

      {/* Main Content Viewport with Responsive Lazy Route Loading */}
      <main style={{ flex: 1, paddingBottom: '60px' }}>
        <Suspense fallback={<RouteLoadingFallback />}>
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
            <Route path="/digitalseva" element={<DigitalSevaPortal />} />
            <Route path="/digitalseva/*" element={<DigitalSevaPortal />} />

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

            <Route path="/finance-portal" element={<ProtectedRoute allowedRoles={['admin']} portalName="FinTech General Ledger & Compliance"><FinancePortal /></ProtectedRoute>} />
            <Route path="/finance-portal/*" element={<ProtectedRoute allowedRoles={['admin']} portalName="FinTech General Ledger & Compliance"><FinancePortal /></ProtectedRoute>} />
            <Route path="/portal/finance" element={<ProtectedRoute allowedRoles={['admin']} portalName="FinTech General Ledger & Compliance"><FinancePortal /></ProtectedRoute>} />
            <Route path="/portal/finance/*" element={<ProtectedRoute allowedRoles={['admin']} portalName="FinTech General Ledger & Compliance"><FinancePortal /></ProtectedRoute>} />

            <Route path="/support-portal" element={<ProtectedRoute allowedRoles={['employee', 'admin']} portalName="SLA Escalation & Citizen Support"><SupportPortal /></ProtectedRoute>} />
            <Route path="/support-portal/*" element={<ProtectedRoute allowedRoles={['employee', 'admin']} portalName="SLA Escalation & Citizen Support"><SupportPortal /></ProtectedRoute>} />
            <Route path="/portal/support" element={<ProtectedRoute allowedRoles={['employee', 'admin']} portalName="SLA Escalation & Citizen Support"><SupportPortal /></ProtectedRoute>} />
            <Route path="/portal/support/*" element={<ProtectedRoute allowedRoles={['employee', 'admin']} portalName="SLA Escalation & Citizen Support"><SupportPortal /></ProtectedRoute>} />

            <Route path="/employee" element={<ProtectedRoute allowedRoles={['employee', 'admin']} portalName="Employee Corporate Workspace"><EmployeePortal /></ProtectedRoute>} />
            <Route path="/employee/*" element={<ProtectedRoute allowedRoles={['employee', 'admin']} portalName="Employee Corporate Workspace"><EmployeePortal /></ProtectedRoute>} />
            <Route path="/portal/employee" element={<ProtectedRoute allowedRoles={['employee', 'admin']} portalName="Employee Corporate Workspace"><EmployeePortal /></ProtectedRoute>} />
            <Route path="/portal/employee/*" element={<ProtectedRoute allowedRoles={['employee', 'admin']} portalName="Employee Corporate Workspace"><EmployeePortal /></ProtectedRoute>} />

            <Route path="/portal/executive" element={<ProtectedRoute allowedRoles={['employee', 'admin']} portalName="Executive Dashboard"><EmployeePortal /></ProtectedRoute>} />
            <Route path="/portal/executive/*" element={<ProtectedRoute allowedRoles={['employee', 'admin']} portalName="Executive Dashboard"><EmployeePortal /></ProtectedRoute>} />

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
        </Suspense>
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
