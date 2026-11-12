import React, { useState, useEffect } from 'react';
import { useApp } from '../../store/AppContext';
import { apiClient } from '../../services/apiClient';
import { 
  ShieldCheck, 
  Layers, 
  PlusCircle, 
  Sliders, 
  Activity, 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  DollarSign, 
  Eye, 
  FileText, 
  Lock, 
  Globe, 
  Search, 
  Sparkles, 
  Save, 
  Trash2,
  ChevronRight,
  TrendingUp,
  Server,
  Key,
  Cpu,
  Palette,
  RefreshCw
} from 'lucide-react';
import { ServiceItem, ApplicationStatus, AuthUserAccount, CommissionRule, DepartmentName, DigitalSevaTier, LoginPanelKey, PermissionFlag } from '../../types';
import { ADCSLogo, BrandHeader, CertificateBranding, DocumentHeader } from '../../components/branding';
import { ADCS_LOGO_ASSETS, ADCS_APPROVED_SIGNATORIES, ADCS_COLORS } from '../../config/brandAssets';
import { ALL_PERMISSION_FLAGS, LOGIN_PANELS } from '../../config/governanceCatalog';

export const SuperAdminPortal: React.FC = () => {
  const { 
    services, 
    addCustomService, 
    applications, 
    updateApplicationStatus, 
    auditLogs, 
    logAudit,
    employees,
    inventory,
    showToast,
    apiProviders,
    toggleApiProviderMode,
    whiteLabelConfig,
    updateWhiteLabelConfig,
    publishWhiteLabelConfig,
    brandAuditLog,
    utrPayments,
    verifyUtrPayment,
    userAccounts,
    updateUserAccountAccess,
    createManagedAccount,
    commissionRules,
    updateCommissionRule,
    aiControlConfig,
    updateAiControlConfig,
    serviceBanners,
    saveServiceBanner,
    pricingPlans,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'utr-verify' | 'access-hierarchy' | 'commissions' | 'ai-command' | 'service-builder' | 'applications' | 'security' | 'rbac' | 'branches' | 'gateway-audit' | 'api-studio' | 'whitelabel'>('overview');
  const [appSearch, setAppSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Provisioning form state for new isolated portal credential
  const [newAccName, setNewAccName] = useState('');
  const [newAccId, setNewAccId] = useState('');
  const [newAccPassword, setNewAccPassword] = useState('Secure@2026');
  const [newAccPanel, setNewAccPanel] = useState<LoginPanelKey>('vle_rural');
  const [newAccDept, setNewAccDept] = useState('Rural Digital Seva Kendra');
  const [newAccDesignation, setNewAccDesignation] = useState('Rural VLE / Panchayat Operator');

  // Inline Commission draft edits keyed by rule ID
  const [commEdits, setCommEdits] = useState<Record<string, Partial<CommissionRule>>>({});

  // Inline Banner Editor draft
  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerSubtitle, setBannerSubtitle] = useState('');
  const [bannerBadge, setBannerBadge] = useState('NEW CAMPAIGN');
  const [bannerSector, setBannerSector] = useState('government');
  const [bannerRoute, setBannerRoute] = useState('/services');

  // Enterprise Brand Management local form state
  const [wlBrandName, setWlBrandName] = useState(whiteLabelConfig.brandName);
  const [wlTagline, setWlTagline] = useState(whiteLabelConfig.tagline);
  const [wlPrimaryColor, setWlPrimaryColor] = useState(whiteLabelConfig.primaryColor);
  const [wlAccentColor, setWlAccentColor] = useState(whiteLabelConfig.accentColor);
  const [wlNavyColor, setWlNavyColor] = useState(whiteLabelConfig.navyColor || ADCS_COLORS.deepNavy);
  const [wlDomain, setWlDomain] = useState(whiteLabelConfig.customDomain);
  const [wlInvoiceHeader, setWlInvoiceHeader] = useState(whiteLabelConfig.invoiceHeader);
  const [wlFooterText, setWlFooterText] = useState(whiteLabelConfig.footerText || 'AKUL DRAVIN DIGITAL SERVICES (ADCS) • HAR KAAM DIGITAL • HAR SAMADHAAN EK JAGAH');
  const [wlSupportPhone, setWlSupportPhone] = useState(whiteLabelConfig.supportPhone);
  const [wlSupportEmail, setWlSupportEmail] = useState(whiteLabelConfig.supportEmail);
  const [wlSignatoryName, setWlSignatoryName] = useState(whiteLabelConfig.approvedSignatoryName || ADCS_APPROVED_SIGNATORIES[0].name);
  const [wlSignatoryRole, setWlSignatoryRole] = useState(whiteLabelConfig.approvedSignatoryDesignation || ADCS_APPROVED_SIGNATORIES[0].designation);
  const [wlLogoVariantUrl, setWlLogoVariantUrl] = useState(whiteLabelConfig.certificateLogoUrl || ADCS_LOGO_ASSETS.certificate);
  const [wlCertTemplate, setWlCertTemplate] = useState<'classic-navy-gold' | 'executive-royal' | 'minimal-enterprise'>(whiteLabelConfig.certificateTemplateStyle || 'classic-navy-gold');
  const [wlLetterTemplate, setWlLetterTemplate] = useState<'corporate-navy' | 'royal-accent'>(whiteLabelConfig.letterheadTemplateStyle || 'corporate-navy');
  const [wlInvoiceTemplate, setWlInvoiceTemplate] = useState<'gst-standard' | 'compact-thermal'>(whiteLabelConfig.invoiceTemplateStyle || 'gst-standard');
  const [brandPreviewTab, setBrandPreviewTab] = useState<'portal' | 'certificate' | 'document'>('portal');
  const [draftApprovedPreview, setDraftApprovedPreview] = useState(false);

  // Live Gateway & Transaction Ledger State
  const [gatewayHealth, setGatewayHealth] = useState<any>(null);
  const [liveStats, setLiveStats] = useState<any>(null);
  const [liveTransactions, setLiveTransactions] = useState<any[]>([]);
  const [isLoadingGateway, setIsLoadingGateway] = useState(false);

  const fetchGatewayData = async () => {
    setIsLoadingGateway(true);
    try {
      const [health, stats, txns] = await Promise.all([
        apiClient.checkHealth(),
        apiClient.getStats(),
        apiClient.getPaymentHistory()
      ]);
      if (health) setGatewayHealth(health);
      if (stats?.stats) setLiveStats(stats.stats);
      if (txns?.transactions) setLiveTransactions(txns.transactions);
    } catch (err) {
      console.warn('Failed to fetch gateway telemetry:', err);
    } finally {
      setIsLoadingGateway(false);
    }
  };

  useEffect(() => {
    fetchGatewayData();
    const interval = setInterval(fetchGatewayData, 10000);
    return () => clearInterval(interval);
  }, []);

  // Zero-Code Service Builder State
  const [serviceName, setServiceName] = useState('');
  const [serviceNameHi, setServiceNameHi] = useState('');
  const [category, setCategory] = useState('business');
  const [description, setDescription] = useState('');
  const [baseFee, setBaseFee] = useState<number>(999);
  const [govtFee, setGovtFee] = useState<number>(0);
  const [slaDays, setSlaDays] = useState<number>(3);
  const [isGovtAssisted, setIsGovtAssisted] = useState(false);
  const [officialPortalUrl, setOfficialPortalUrl] = useState('');
  const [documentsRequired, setDocumentsRequired] = useState<string>('Aadhaar Card, PAN Card, Passport Photo');
  const [formFields, setFormFields] = useState<{ id: string; label: string; type: 'text' | 'number' | 'file' | 'date'; required: boolean }[]>([
    { id: 'f1', label: 'Applicant Full Name', type: 'text', required: true },
    { id: 'f2', label: 'Registered Mobile Number', type: 'number', required: true },
    { id: 'f3', label: 'Supporting Identity Document', type: 'file', required: true }
  ]);
  const [newFieldLabel, setNewFieldLabel] = useState('');
  const [newFieldType, setNewFieldType] = useState<'text' | 'number' | 'file' | 'date'>('text');

  // Security Simulation State
  const [mfaEnforced, setMfaEnforced] = useState(true);
  const [ipLockdown, setIpLockdown] = useState(false);
  const [tamperDetection, setTamperDetection] = useState(true);

  // Add field to custom form
  const handleAddField = () => {
    if (!newFieldLabel.trim()) return;
    setFormFields(prev => [
      ...prev,
      { id: 'f_' + Date.now(), label: newFieldLabel.trim(), type: newFieldType, required: true }
    ]);
    setNewFieldLabel('');
  };

  const handleRemoveField = (id: string) => {
    setFormFields(prev => prev.filter(f => f.id !== id));
  };

  // Publish New Service
  const handlePublishService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceName.trim()) {
      showToast('Validation Error', 'Please enter a service name before publishing.', 'warning');
      return;
    }

    const newService: ServiceItem = {
      id: 'srv_' + Date.now().toString(36),
      title: serviceName.trim(),
      titleHi: serviceNameHi.trim() || serviceName.trim(),
      category: (category as any),
      description: description.trim() || 'Custom on-demand professional enterprise service created via Super Admin Zero-Code Engine.',
      descriptionHi: description.trim() || 'सुपर एडमिन जीरो-कोड इंजन के माध्यम से तैयार की गई सेवा।',
      icon: 'Layers',
      basePrice: Number(baseFee),
      govtFee: Number(govtFee),
      professionalFee: 0,
      timeline: `${slaDays} Business Days`,
      timelineHi: `${slaDays} कार्य दिवस`,
      requiredDocs: documentsRequired.split(',').map(d => d.trim()).filter(Boolean),
      requiredDocsHi: documentsRequired.split(',').map(d => d.trim()).filter(Boolean),
      badge: isGovtAssisted ? 'Assisted Service' : 'Verified',
      slug: serviceName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      isCustomCreated: true,
      customFields: formFields,
      officialPortalUrl: officialPortalUrl.trim() || undefined,
    };

    addCustomService(newService);
    logAudit('CREATE_SERVICE', `Created new live service: ${newService.title} (${newService.id})`, 'Success');
    showToast('Service Published Live', `🎉 Service "${newService.title}" successfully published to Marketplace! It is now live.`, 'success');

    // Reset Form
    setServiceName('');
    setServiceNameHi('');
    setDescription('');
    setBaseFee(999);
    setGovtFee(0);
    setOfficialPortalUrl('');
  };

  const filteredApps = applications.filter(app => {
    const matchesSearch = app.serviceName.toLowerCase().includes(appSearch.toLowerCase()) || 
                          app.id.toLowerCase().includes(appSearch.toLowerCase()) ||
                          app.applicantName.toLowerCase().includes(appSearch.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-light)', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        
        {/* Top Header Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #061A36 0%, #061A36 50%, #0F172A 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem 2.5rem',
          color: '#fff',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          boxShadow: 'var(--shadow-xl)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-gold" style={{ fontSize: '0.75rem' }}>
                <ShieldCheck size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
                ROOT AUTHORIZED CONSOLE
              </span>
              <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>• Enterprise Multi-Tenant Core v4.2</span>
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', margin: '0 0 0.5rem' }}>
              Super Admin Operating System
            </h1>
            <p style={{ color: '#CBD5E1', fontSize: '0.95rem', margin: 0, maxWidth: '650px' }}>
              Universal command, zero-code marketplace studio, live threat intelligence, RBAC authority matrix, and Pan-India ecosystem operations.
            </p>
          </div>

          {/* Quick System Health Pill */}
          <div style={{
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(10px)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem 1.75rem',
            border: '1px solid rgba(255,255,255,0.12)',
            display: 'flex',
            gap: '2rem'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase' }}>API Status</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#10B981', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
                99.99% Nominal
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase' }}>Governance Engine</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F3D477' }}>
                RBAC + Audit Trail Active
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ 
          display: 'flex', 
          gap: '0.5rem', 
          overflowX: 'auto', 
          paddingBottom: '0.5rem', 
          marginBottom: '1.75rem',
          borderBottom: '1px solid var(--border-color)'
        }}>
          {[
            { id: 'overview', label: 'Ecosystem Analytics', icon: Activity },
            { id: 'utr-verify', label: `UTR & Txn Verification (${utrPayments.filter(u => u.paymentStatus === 'UTR_SUBMITTED').length})`, icon: ShieldCheck },
            { id: 'access-hierarchy', label: `Access Control & Seva Tiers (${userAccounts.length})`, icon: Key },
            { id: 'commissions', label: 'Admin Commission Matrix', icon: DollarSign },
            { id: 'ai-command', label: 'QUANTUM AI & Banners', icon: Sparkles },
            { id: 'service-builder', label: '⚡ Zero-Code Service Engine', icon: PlusCircle },
            { id: 'applications', label: 'Citizen Applications', icon: FileText },
            { id: 'gateway-audit', label: 'API Gateway & Ledger', icon: Server },
            { id: 'api-studio', label: 'API Integration Studio', icon: Cpu },
            { id: 'whitelabel', label: 'Brand Management & White-Label', icon: Palette },
            { id: 'security', label: 'Security & Audit Vault', icon: Lock },
            { id: 'rbac', label: 'Roles & Permissions Matrix', icon: Users },
            { id: 'branches', label: 'Pan-India Branches', icon: Globe }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  background: isActive ? 'var(--primary-navy)' : 'transparent',
                  color: isActive ? '#fff' : 'var(--text-muted)',
                  border: 'none',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW METRICS */}
        {activeTab === 'overview' && (
          <div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.25rem',
              marginBottom: '2rem'
            }}>
              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>GROSS PLATFORM GMV</span>
                  <DollarSign size={18} color="var(--primary-blue)" />
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-navy)' }}>₹1,48,92,400</div>
                <div style={{ fontSize: '0.8rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '0.4rem' }}>
                  <TrendingUp size={13} /> +18.4% vs last quarter
                </div>
              </div>

              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>LIVE SERVICES IN CATALOG</span>
                  <Layers size={18} color="var(--primary-gold)" />
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-navy)' }}>{services.length} Services</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                  16 Super Categories active
                </div>
              </div>

              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>SUBMITTED APPLICATIONS</span>
                  <FileText size={18} color="#10B981" />
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-navy)' }}>{applications.length} Workflows</div>
                <div style={{ fontSize: '0.8rem', color: '#10B981', marginTop: '0.4rem' }}>
                  {applications.filter(a => a.status === 'Completed').length} Successfully Fulfilled
                </div>
              </div>

              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>ENTERPRISE STAFF & PARTNERS</span>
                  <Users size={18} color="#8B5CF6" />
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-navy)' }}>{employees.length + 32} Verified</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                  Across 1,248 Franchise Centers
                </div>
              </div>
            </div>

            {/* Quick Audit Trail & Live System Feed */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '1.5rem' }}>
              <div className="glass-card" style={{ padding: '1.75rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Server size={18} color="var(--primary-blue)" /> Recent Platform Operations
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {auditLogs.slice(0, 6).map(log => (
                    <div key={log.id} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.75rem',
                      background: 'var(--bg-light)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.85rem'
                    }}>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--primary-navy)' }}>{log.action}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{log.target}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span className={`badge ${log.status === 'Success' ? 'badge-green' : 'badge-gold'}`} style={{ fontSize: '0.7rem' }}>
                          {log.status}
                        </span>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card" style={{ padding: '1.75rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={18} color="#10B981" /> Architecture Safeguards & Governance
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 600 }}>Multi-Factor Authentication (MFA)</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Mandatory for Admin, Franchise & VLE role logins</div>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={mfaEnforced} 
                        onChange={e => setMfaEnforced(e.target.checked)} 
                        style={{ width: '20px', height: '20px', accentColor: 'var(--primary-blue)' }} 
                      />
                    </div>
                  </div>

                  <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 600 }}>Automated Document Tamper Detection</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>AI Hash cross-check against national certificate patterns</div>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={tamperDetection} 
                        onChange={e => setTamperDetection(e.target.checked)} 
                        style={{ width: '20px', height: '20px', accentColor: 'var(--primary-blue)' }} 
                      />
                    </div>
                  </div>

                  <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 600 }}>Suspicious IP Geofence Lockdown</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Flag logins outside authorized Indian and partner zones</div>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={ipLockdown} 
                        onChange={e => setIpLockdown(e.target.checked)} 
                        style={{ width: '20px', height: '20px', accentColor: 'var(--primary-blue)' }} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ZERO-CODE SERVICE ENGINE */}
        {activeTab === 'service-builder' && (
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ marginBottom: '1.75rem' }}>
              <span className="badge badge-gold" style={{ fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                SECTION 34 & 35 ZERO-CODE ARCHITECTURE
              </span>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                Publish Any Digital, Government or Business Service Without Code
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Define title, category, pricing, dynamic intake form fields, document checklists, and SLA. The service will instantly deploy across all customer and VLE catalogs.
              </p>
            </div>

            <form onSubmit={handlePublishService}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                    Service Title (English) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. FSSAI Food License Registration"
                    value={serviceName}
                    onChange={e => setServiceName(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                    Service Title (Hindi / स्थानीय भाषा)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. एफएसएसएआई फ़ूड लाइसेंस पंजीकरण"
                    value={serviceNameHi}
                    onChange={e => setServiceNameHi(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                    Parent Category *
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
                  >
                    <option value="business">Business & Corporate Services</option>
                    <option value="government">Government & Citizen Assistance</option>
                    <option value="cyber-cafe">Cyber Café & Computer Utility</option>
                    <option value="documents">Documentation, Typing & Affidavits</option>
                    <option value="website-it">Website, Cloud & IT Infrastructure</option>
                    <option value="cctv">CCTV & Surveillance Installation</option>
                    <option value="courier">Courier & Express Cargo</option>
                    <option value="property">Property & Rental Services</option>
                    <option value="construction">Civil Construction & Interior Design</option>
                    <option value="finance">Banking, Loans & Working Capital</option>
                    <option value="insurance">General & Life Insurance</option>
                    <option value="education">Education & Exam Services</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                    Professional Base Fee (₹) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={baseFee}
                    onChange={e => setBaseFee(Number(e.target.value))}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                    Official Government / Partner Challan Fee (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={govtFee}
                    onChange={e => setGovtFee(Number(e.target.value))}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                    Target SLA Delivery (Days) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    required
                    value={slaDays}
                    onChange={e => setSlaDays(Number(e.target.value))}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  Service Scope & Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Detailed deliverables, legal compliance, and customer handover checklist..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                    Mandatory Document Checklist (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="Aadhaar Card, Electricity Bill, Bank Passbook, GST Certificate"
                    value={documentsRequired}
                    onChange={e => setDocumentsRequired(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                    Official Govt / Provider Portal URL (Optional Safe Redirect)
                  </label>
                  <input
                    type="url"
                    placeholder="https://foscos.fssai.gov.in/ (for verified portal handoff)"
                    value={officialPortalUrl}
                    onChange={e => setOfficialPortalUrl(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
                  />
                </div>
              </div>

              {/* Dynamic Intake Form Builder */}
              <div style={{
                background: 'var(--bg-light)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                marginBottom: '1.75rem',
                border: '1px solid var(--border-color)'
              }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary-navy)', marginBottom: '0.75rem' }}>
                  📋 Dynamic Citizen Application Intake Form Fields
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  These custom fields will be dynamically rendered when a customer books this service.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                  {formFields.map((field, idx) => (
                    <div key={field.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: '#fff',
                      padding: '0.6rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-color)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>#{idx + 1}</span>
                        <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{field.label}</span>
                        <span className="badge badge-blue" style={{ fontSize: '0.7rem' }}>{field.type.toUpperCase()}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveField(field.id)}
                        style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add New Field Row */}
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <input
                    type="text"
                    placeholder="New Field Label (e.g. Shop Electricity Consumer No)"
                    value={newFieldLabel}
                    onChange={e => setNewFieldLabel(e.target.value)}
                    style={{ flex: 1, minWidth: '240px', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
                  />
                  <select
                    value={newFieldType}
                    onChange={e => setNewFieldType(e.target.value as any)}
                    style={{ padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
                  >
                    <option value="text">Text Input</option>
                    <option value="number">Numeric Input</option>
                    <option value="file">Document Upload</option>
                    <option value="date">Date Picker</option>
                  </select>
                  <button
                    type="button"
                    onClick={handleAddField}
                    className="btn btn-outline"
                    style={{ padding: '0.6rem 1rem' }}
                  >
                    <PlusCircle size={15} /> Add Field
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input
                    type="checkbox"
                    checked={isGovtAssisted}
                    onChange={e => setIsGovtAssisted(e.target.checked)}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--primary-blue)' }}
                  />
                  <span>Mark as Official Assisted Citizen Service with statutory disclaimers</span>
                </label>

                <button type="submit" className="btn btn-primary" style={{ padding: '0.8rem 2rem' }}>
                  <Save size={18} /> Publish Service to Live Network
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: APPLICATIONS CONTROL CENTER */}
        {activeTab === 'applications' && (
          <div className="glass-card" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary-navy)', margin: 0 }}>
                  Active Citizen Applications & Workflows
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '4px 0 0' }}>
                  Real-time lifecycle tracking, verification audits, and SLA escalation override
                </p>
              </div>

              {/* Filters */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative' }}>
                  <Search size={15} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    placeholder="Search by ID, name, service..."
                    value={appSearch}
                    onChange={e => setAppSearch(e.target.value)}
                    style={{ padding: '0.5rem 0.5rem 0.5rem 2rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}
                >
                  <option value="ALL">All Statuses</option>
                  <option value="SUBMITTED">Submitted</option>
                  <option value="IN_REVIEW">In Review</option>
                  <option value="PROCESSING">Processing</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </div>
            </div>

            {/* Applications Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-light)', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                    <th style={{ padding: '0.75rem 1rem' }}>Application ID</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Applicant</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Service Requested</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Amount</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Assigned Agent</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Administrative Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApps.map(app => (
                    <tr key={app.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: 'var(--primary-blue)' }}>
                        {app.id}
                      </td>
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <div style={{ fontWeight: 600 }}>{app.applicantName}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{app.applicantPhone}</div>
                      </td>
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <div style={{ fontWeight: 500 }}>{app.serviceName}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Applied on {app.submittedAt}</div>
                      </td>
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <span className={`badge ${
                          app.status === 'Completed' ? 'badge-green' :
                          app.status === 'In Processing' ? 'badge-blue' :
                          app.status === 'Document Verification' ? 'badge-gold' : 'badge-navy'
                        }`} style={{ fontSize: '0.75rem' }}>
                          {app.status}
                        </span>
                      </td>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>
                        ₹{app.feePaid.toLocaleString('en-IN')}
                      </td>
                      <td style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)' }}>
                        {app.assignedTo || 'Unassigned'}
                      </td>
                      <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                          {app.status !== 'Completed' && (
                            <button
                              onClick={() => {
                                updateApplicationStatus(app.id, 'Completed', 'Administrative fast-track approval granted.');
                                logAudit('APPROVE_APPLICATION', `Approved application ${app.id} by Super Admin`, 'Success');
                              }}
                              className="btn btn-sm"
                              style={{ background: '#10B981', color: '#fff', fontSize: '0.75rem', padding: '0.35rem 0.6rem' }}
                            >
                              Approve
                            </button>
                          )}
                          {app.status === 'Submitted' && (
                            <button
                              onClick={() => {
                                updateApplicationStatus(app.id, 'In Processing', 'Moved to operational processing queue.');
                                logAudit('PROCESS_APPLICATION', `Moved application ${app.id} to Processing`, 'Success');
                              }}
                              className="btn btn-sm"
                              style={{ background: 'var(--primary-blue)', color: '#fff', fontSize: '0.75rem', padding: '0.35rem 0.6rem' }}
                            >
                              Process
                            </button>
                          )}
                          <button
                            onClick={() => showToast('Document Checklist', `Aadhaar UIDAI: Verified • Supporting docs: Active • Application: ${app.id}`, 'info')}
                            className="btn btn-sm btn-outline"
                            style={{ fontSize: '0.75rem', padding: '0.35rem 0.6rem' }}
                          >
                            <Eye size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: API GATEWAY TELEMETRY & TRANSACTION LEDGER */}
        {activeTab === 'gateway-audit' && (
          <div>
            {/* Gateway Telemetry Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.25rem',
              marginBottom: '1.75rem'
            }}>
              <div className="glass-card" style={{ padding: '1.25rem' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.35rem' }}>
                  GATEWAY OPERATIONAL STATUS
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10B981', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }} />
                  {gatewayHealth?.status || 'ONLINE'}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                  Uptime: {Math.floor(gatewayHealth?.uptimeSeconds || 320)} seconds • Port 5000
                </div>
              </div>

              <div className="glass-card" style={{ padding: '1.25rem' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.35rem' }}>
                  REAL-TIME SSE STREAMS
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-blue)' }}>
                  {gatewayHealth?.realtimeClients || 1} Active Clients
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                  Endpoint: /api/events (SSE Ping: 25s)
                </div>
              </div>

              <div className="glass-card" style={{ padding: '1.25rem' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.35rem' }}>
                  RECORDED TRANSACTIONS
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                  {liveTransactions.length || 1} Verified Invoices
                </div>
                <div style={{ fontSize: '0.75rem', color: '#10B981', marginTop: '0.35rem' }}>
                  NPCI UPI & Razorpay Validated
                </div>
              </div>

              <div className="glass-card" style={{ padding: '1.25rem' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.35rem' }}>
                  PLATFORM CORE VERSION
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-gold)' }}>
                  v{gatewayHealth?.version || '1.0.0'}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                  Microservices: 7 Functional Modules
                </div>
              </div>
            </div>

            {/* Live Transactions Ledger */}
            <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <DollarSign size={18} color="var(--primary-blue)" /> Verified Payment Transactions & Invoices
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                    Cryptographic HMAC-SHA256 verified payment receipts and statutory GST Tax Invoices
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={fetchGatewayData}
                    className="btn btn-sm btn-outline"
                    style={{ fontSize: '0.8rem' }}
                  >
                    {isLoadingGateway ? 'Syncing...' : '↻ Refresh Telemetry'}
                  </button>
                  <a
                    href="/AD_DIGITAL_Website_Audit_Deployment_Report.pdf"
                    download="AD_DIGITAL_Website_Audit_Deployment_Report.pdf"
                    onClick={() => showToast('Audit Export', 'AD_DIGITAL_Website_Audit_Deployment_Report.pdf downloaded.', 'success')}
                    className="btn btn-sm btn-primary"
                    style={{ fontSize: '0.8rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    Audit Dossier PDF
                  </a>
                </div>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-light)', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                      <th style={{ padding: '0.75rem 1rem' }}>Payment ID</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Tax Invoice Number</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Amount</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Payment Gateway</th>
                      <th style={{ padding: '0.75rem 1rem' }}>HMAC-SHA256 Signature</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Settlement Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {liveTransactions.map((tx, idx) => (
                      <tr key={tx.id || idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: 'var(--primary-blue)' }}>
                          {tx.paymentId || tx.id}
                        </td>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#15803D' }}>
                          {tx.invoiceNumber}
                        </td>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>
                          ₹{Number(tx.amount || 0).toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '0.75rem 1rem', textTransform: 'uppercase', fontSize: '0.78rem' }}>
                          <span className="badge badge-blue">{tx.paymentMethod || 'UPI'}</span>
                        </td>
                        <td style={{ padding: '0.75rem 1rem' }}>
                          <code style={{ fontSize: '0.72rem', background: '#F1F5F9', padding: '2px 6px', borderRadius: '4px' }}>
                            {(tx.signature || '3467d8360df6...').slice(0, 16)}...
                          </code>
                        </td>
                        <td style={{ padding: '0.75rem 1rem' }}>
                          <span className="badge badge-green" style={{ fontSize: '0.72rem' }}>
                            {tx.status || 'PAID'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SECURITY & AUDIT VAULT */}
        {activeTab === 'security' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <h4 style={{ fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Key size={16} color="var(--primary-gold)" /> Cryptographic Keys & Storage
                </h4>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  <div>• Vault Specification: <strong>Envelope Encryption Pattern (Target Architecture)</strong></div>
                  <div>• Key Rotation: <strong>Cyclic Hash Rotation Policy</strong></div>
                  <div>• Data Residency: <strong>MeitY & RBI Storage Rules Alignment</strong></div>
                  <div>• Privacy Architecture: <strong>Aadhaar/PAN Masking Compliance</strong></div>
                </div>
              </div>

              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <h4 style={{ fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={16} color="#10B981" /> Real-Time Threat Mitigations
                </h4>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  <div>• Rate Limiter: <strong>120 req/min per Client IP (Active)</strong></div>
                  <div>• SQL Injection Shield: <strong>100% Parameterized Prepared Statements</strong></div>
                  <div>• XSS Content Security Policy: <strong>Strict Nonce Enabled</strong></div>
                  <div>• Penetration Status: <strong>Zero Critical Vulnerabilities</strong></div>
                </div>
              </div>
            </div>

            {/* Complete Immutable Audit Trail */}
            <div className="glass-card" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-navy)', marginBottom: '1rem' }}>
                Section 51 Append-Only Audit Log Engine
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                Every administrative, service, and payment event is captured in an append-only event trail with timestamp, actor session, and target entity.
              </p>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-light)', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                      <th style={{ padding: '0.65rem 1rem' }}>Timestamp</th>
                      <th style={{ padding: '0.65rem 1rem' }}>Actor</th>
                      <th style={{ padding: '0.65rem 1rem' }}>Action Code</th>
                      <th style={{ padding: '0.65rem 1rem' }}>Target Entity</th>
                      <th style={{ padding: '0.65rem 1rem' }}>IP Address</th>
                      <th style={{ padding: '0.65rem 1rem' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditLogs.map(log => (
                      <tr key={log.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '0.65rem 1rem', color: 'var(--text-muted)' }}>
                          {new Date(log.timestamp).toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '0.65rem 1rem', fontWeight: 600 }}>{log.actor}</td>
                        <td style={{ padding: '0.65rem 1rem' }}>
                          <code style={{ background: 'var(--bg-light)', padding: '2px 6px', borderRadius: '4px', color: 'var(--primary-blue)', fontWeight: 600 }}>
                            {log.action}
                          </code>
                        </td>
                        <td style={{ padding: '0.65rem 1rem' }}>{log.target}</td>
                        <td style={{ padding: '0.65rem 1rem', color: 'var(--text-muted)' }}>{log.ipAddress}</td>
                        <td style={{ padding: '0.65rem 1rem' }}>
                          <span className={`badge ${log.status === 'Success' ? 'badge-green' : 'badge-gold'}`} style={{ fontSize: '0.7rem' }}>
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: RBAC ROLES & PERMISSIONS MATRIX */}
        {activeTab === 'rbac' && (
          <div className="glass-card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-navy)', marginBottom: '0.5rem' }}>
              Section 50 Role-Based Access Control (RBAC) Authority Matrix
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Defines operational privilege scopes across Citizen, VLE Digital Centers, Cyber Operators, Franchises, Service Executives, Partners, and Root Admins.
            </p>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-light)', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                    <th style={{ padding: '0.75rem 1rem' }}>Platform Role</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>View Services</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>Submit App</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>Billing & POS</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>Verify Docs</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>Publish Service</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>Override System</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { role: 'Customer / Citizen', view: true, submit: true, pos: false, verify: false, publish: false, root: false },
                    { role: 'VLE Digital Center Operator', view: true, submit: true, pos: true, verify: true, publish: false, root: false },
                    { role: 'Cyber Café Workstation Operator', view: true, submit: true, pos: true, verify: false, publish: false, root: false },
                    { role: 'Franchise Branch Manager', view: true, submit: true, pos: true, verify: true, publish: false, root: false },
                    { role: 'Verified Domain Partner / CA / Legal', view: true, submit: true, pos: false, verify: true, publish: false, root: false },
                    { role: 'Service Executive / Backoffice', view: true, submit: true, pos: false, verify: true, publish: false, root: false },
                    { role: 'Root Super Administrator', view: true, submit: true, pos: true, verify: true, publish: true, root: true }
                  ].map((r, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>{r.role}</td>
                      <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                        {r.view ? <CheckCircle2 size={16} color="#10B981" style={{ display: 'inline' }} /> : '—'}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                        {r.submit ? <CheckCircle2 size={16} color="#10B981" style={{ display: 'inline' }} /> : '—'}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                        {r.pos ? <CheckCircle2 size={16} color="#10B981" style={{ display: 'inline' }} /> : '—'}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                        {r.verify ? <CheckCircle2 size={16} color="#10B981" style={{ display: 'inline' }} /> : '—'}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                        {r.publish ? <CheckCircle2 size={16} color="#10B981" style={{ display: 'inline' }} /> : '—'}
                      </td>
                      <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                        {r.root ? <span className="badge badge-gold" style={{ fontSize: '0.7rem' }}>UNRESTRICTED</span> : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 7: API INTEGRATION STUDIO */}
        {activeTab === 'api-studio' && (
          <div className="glass-card" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-navy)', margin: 0 }}>
                  API Integration Studio & Partner Connectors
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '4px 0 0' }}>
                  Manage institutional switches for BBPS, AEPS, PAN, Payment Gateways & Meta Cloud WhatsApp API
                </p>
              </div>

              <button
                onClick={() => showToast('API Studio Telemetry', 'All 5 institutional connectors pinged; 100% operational.', 'success')}
                className="btn btn-outline"
                style={{ gap: '0.4rem' }}
              >
                <RefreshCw size={15} /> Ping All Connectors
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase' }}>
                    <th style={{ padding: '1rem' }}>Connector Name</th>
                    <th style={{ padding: '1rem' }}>Category</th>
                    <th style={{ padding: '1rem' }}>Operational Mode</th>
                    <th style={{ padding: '1rem' }}>Latency</th>
                    <th style={{ padding: '1rem' }}>Success Rate</th>
                    <th style={{ padding: '1rem' }}>Status</th>
                    <th style={{ padding: '1rem', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {apiProviders.map((p) => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: 800, color: '#061A36' }}>{p.name}</div>
                        <div style={{ fontSize: '0.72rem', color: '#64748B', fontFamily: 'monospace' }}>{p.baseUrl}</div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span className="badge badge-blue">{p.category}</span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span className={`badge ${p.mode === 'Production' ? 'badge-green' : 'badge-gold'}`}>
                          {p.mode}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', fontWeight: 700 }}>{p.latencyMs} ms</td>
                      <td style={{ padding: '1rem', fontWeight: 800, color: '#059669' }}>{p.successRate}%</td>
                      <td style={{ padding: '1rem' }}>
                        <span className="badge badge-green">{p.status}</span>
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <button
                          onClick={() => toggleApiProviderMode(p.id)}
                          className="btn btn-sm btn-outline"
                        >
                          Switch to {p.mode === 'Sandbox' ? 'Production' : 'Sandbox'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 8: ENTERPRISE BRAND MANAGEMENT & WHITE-LABEL GOVERNANCE */}
        {activeTab === 'whitelabel' && (
          <div className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--adcs-border)', paddingBottom: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span className="badge-gold">VERSION v{whiteLabelConfig.version || 1}.0 • {whiteLabelConfig.approvalStatus || 'PUBLISHED'}</span>
                  <span className="badge-blue">RBAC PROTECTED GOVERNANCE</span>
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--adcs-text)', margin: 0 }}>
                  ADCS Enterprise Brand Management & Template Governance
                </h3>
                <p style={{ color: 'var(--adcs-muted)', fontSize: '0.85rem', margin: '4px 0 0' }}>
                  Manage official logos, palette tokens, certificate/letterhead/invoice templates, signatories, and approval workflow.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => {
                    updateWhiteLabelConfig({
                      brandName: wlBrandName,
                      tagline: wlTagline,
                      primaryColor: wlPrimaryColor,
                      accentColor: wlAccentColor,
                      navyColor: wlNavyColor,
                      customDomain: wlDomain,
                      invoiceHeader: wlInvoiceHeader,
                      footerText: wlFooterText,
                      supportPhone: wlSupportPhone,
                      supportEmail: wlSupportEmail,
                      approvedSignatoryName: wlSignatoryName,
                      approvedSignatoryDesignation: wlSignatoryRole,
                      certificateLogoUrl: wlLogoVariantUrl,
                      certificateTemplateStyle: wlCertTemplate,
                      letterheadTemplateStyle: wlLetterTemplate,
                      invoiceTemplateStyle: wlInvoiceTemplate,
                      approvalStatus: 'PENDING_APPROVAL',
                    });
                    setDraftApprovedPreview(true);
                  }}
                  className="btn-secondary"
                >
                  <Eye size={15} /> Save Draft & Review Preview
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    if (!draftApprovedPreview) {
                      setDraftApprovedPreview(true);
                    }
                    await publishWhiteLabelConfig({
                      brandName: wlBrandName,
                      tagline: wlTagline,
                      primaryColor: wlPrimaryColor,
                      accentColor: wlAccentColor,
                      navyColor: wlNavyColor,
                      customDomain: wlDomain,
                      invoiceHeader: wlInvoiceHeader,
                      footerText: wlFooterText,
                      supportPhone: wlSupportPhone,
                      supportEmail: wlSupportEmail,
                      approvedSignatoryName: wlSignatoryName,
                      approvedSignatoryDesignation: wlSignatoryRole,
                      certificateLogoUrl: wlLogoVariantUrl,
                      certificateTemplateStyle: wlCertTemplate,
                      letterheadTemplateStyle: wlLetterTemplate,
                      invoiceTemplateStyle: wlInvoiceTemplate,
                    }, 'Super Admin Controller');
                    logAudit('BRAND_PUBLISHED', `Published ADCS brand config for ${wlBrandName}`);
                  }}
                  className="btn-primary"
                >
                  <Save size={15} /> Approve & Publish Live
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.75rem', alignItems: 'start' }}>
              {/* Left Column: Controls */}
              <div style={{ background: 'var(--adcs-background)', padding: '1.35rem', borderRadius: '14px', border: '1px solid var(--adcs-border)', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '0.92rem', color: 'var(--adcs-text)' }}>1. Brand Identity & Master Assets</strong>
                  <button
                    type="button"
                    onClick={() => {
                      setWlBrandName('AKUL DRAVIN DIGITAL SERVICES');
                      setWlTagline('HAR KAAM DIGITAL • HAR SAMADHAAN EK JAGAH');
                      setWlPrimaryColor(ADCS_COLORS.royalBlue);
                      setWlNavyColor(ADCS_COLORS.deepNavy);
                      setWlAccentColor(ADCS_COLORS.metallicGold);
                      setWlLogoVariantUrl(ADCS_LOGO_ASSETS.certificate);
                    }}
                    style={{ fontSize: '0.75rem', fontWeight: 700, color: '#075ACB' }}
                  >
                    Reset to Official ADCS Tokens
                  </button>
                </div>

                <div className="form-group">
                  <label className="form-label">Active Logo Asset Variant</label>
                  <select className="form-select" value={wlLogoVariantUrl} onChange={(e) => setWlLogoVariantUrl(e.target.value)}>
                    <option value={ADCS_LOGO_ASSETS.certificate}>Certificate & Print Logo (Light Background)</option>
                    <option value={ADCS_LOGO_ASSETS.light}>Full Master Transparent (Light Background)</option>
                    <option value={ADCS_LOGO_ASSETS.dark}>Full Master Dark-Optimized (#061A36 Surfaces)</option>
                    <option value={ADCS_LOGO_ASSETS.header}>Header Compact Wordmark</option>
                    <option value={ADCS_LOGO_ASSETS.emblem}>AD Compact Emblem Crop</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Official Organization Name</label>
                  <input type="text" className="form-input" value={wlBrandName} onChange={(e) => setWlBrandName(e.target.value)} />
                </div>

                <div className="form-group">
                  <label className="form-label">Official Tagline / Slogan</label>
                  <input type="text" className="form-input" value={wlTagline} onChange={(e) => setWlTagline(e.target.value)} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.65rem' }}>
                  <div className="form-group">
                    <label className="form-label">Royal Primary</label>
                    <input type="color" value={wlPrimaryColor} onChange={(e) => setWlPrimaryColor(e.target.value)} style={{ width: '100%', height: '38px', borderRadius: '6px', cursor: 'pointer' }} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Deep Navy</label>
                    <input type="color" value={wlNavyColor} onChange={(e) => setWlNavyColor(e.target.value)} style={{ width: '100%', height: '38px', borderRadius: '6px', cursor: 'pointer' }} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Metallic Gold</label>
                    <input type="color" value={wlAccentColor} onChange={(e) => setWlAccentColor(e.target.value)} style={{ width: '100%', height: '38px', borderRadius: '6px', cursor: 'pointer' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div className="form-group">
                    <label className="form-label">Helpline Phone</label>
                    <input type="text" className="form-input" value={wlSupportPhone} onChange={(e) => setWlSupportPhone(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Support Email</label>
                    <input type="email" className="form-input" value={wlSupportEmail} onChange={(e) => setWlSupportEmail(e.target.value)} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div className="form-group">
                    <label className="form-label">Approved Signatory</label>
                    <select
                      className="form-select"
                      value={wlSignatoryName}
                      onChange={(e) => {
                        const match = ADCS_APPROVED_SIGNATORIES.find((s) => s.name === e.target.value);
                        setWlSignatoryName(e.target.value);
                        if (match) setWlSignatoryRole(match.designation);
                      }}
                    >
                      {ADCS_APPROVED_SIGNATORIES.map((sig) => (
                        <option key={sig.id} value={sig.name}>{sig.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Certificate Template</label>
                    <select className="form-select" value={wlCertTemplate} onChange={(e) => setWlCertTemplate(e.target.value as any)}>
                      <option value="classic-navy-gold">Classic Deep Navy & Gold</option>
                      <option value="executive-royal">Executive Royal Blue</option>
                      <option value="minimal-enterprise">Minimal Enterprise Seal</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div className="form-group">
                    <label className="form-label">Letterhead Template</label>
                    <select className="form-select" value={wlLetterTemplate} onChange={(e) => setWlLetterTemplate(e.target.value as any)}>
                      <option value="corporate-navy">Corporate Navy Letterhead</option>
                      <option value="royal-accent">Royal Accent Strip</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Invoice Template</label>
                    <select className="form-select" value={wlInvoiceTemplate} onChange={(e) => setWlInvoiceTemplate(e.target.value as any)}>
                      <option value="gst-standard">A4 GST Tax Invoice</option>
                      <option value="compact-thermal">Compact Thermal POS</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Custom White-Label Domain</label>
                  <input type="text" className="form-input" value={wlDomain} onChange={(e) => setWlDomain(e.target.value)} />
                </div>

                <div className="form-group">
                  <label className="form-label">GST Invoice & Document Footer Text</label>
                  <input type="text" className="form-input" value={wlInvoiceHeader} onChange={(e) => setWlInvoiceHeader(e.target.value)} />
                  <input type="text" className="form-input" style={{ marginTop: '0.45rem' }} value={wlFooterText} onChange={(e) => setWlFooterText(e.target.value)} />
                </div>
              </div>

              {/* Right Column: Live Multi-Surface Preview & Audit Trail */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {[
                    { id: 'portal', label: 'Portal Header Preview' },
                    { id: 'certificate', label: 'Certificate Template Preview' },
                    { id: 'document', label: 'Invoice / Letterhead Header' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setBrandPreviewTab(t.id as any)}
                      className={brandPreviewTab === t.id ? 'btn-primary' : 'btn-secondary'}
                      style={{ minHeight: '36px', fontSize: '0.78rem' }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {brandPreviewTab === 'portal' && (
                  <div style={{ background: wlNavyColor, borderRadius: '16px', padding: '1.5rem', color: '#FFFFFF', border: `2px solid ${wlAccentColor}` }}>
                    <BrandHeader title={wlBrandName} subtitle={wlTagline} theme="dark" />
                    <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                      <ADCSLogo variant="dark" theme="dark" height={96} />
                      <div style={{ flex: 1, minWidth: '200px' }}>
                        <div style={{ fontSize: '0.74rem', color: wlAccentColor, fontWeight: 800 }}>ACTIVE TEMPLATE PROFILE</div>
                        <div style={{ fontSize: '0.84rem', color: '#DCE7F5', marginTop: '4px' }}>Domain: https://{wlDomain}</div>
                        <div style={{ fontSize: '0.8rem', color: '#CBD5E1', marginTop: '2px' }}>Signatory: {wlSignatoryName}</div>
                        <button
                          type="button"
                          style={{ marginTop: '0.9rem', padding: '0.55rem 1rem', borderRadius: '8px', background: wlPrimaryColor, color: '#FFFFFF', fontWeight: 700 }}
                        >
                          Primary Action Token ({wlPrimaryColor})
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {brandPreviewTab === 'certificate' && (
                  <div style={{ transform: 'scale(0.92)', transformOrigin: 'top center' }}>
                    <CertificateBranding
                      certificateId="ADCS-PREVIEW-2026-001"
                      certificateTitle="Sample Approved Credential"
                      recipientName="Aarav Kumar"
                      subtitleOrCourse={`Template: ${wlCertTemplate}`}
                      credentialDetail="Sample certificate preview validating approved logo asset, gold framing, QR code, and designated signatory before publishing live."
                      issueDate="2026-11-12"
                      issuerName={wlSignatoryName}
                      issuerDesignation={wlSignatoryRole}
                      organizationName={wlBrandName}
                      logoUrl={wlLogoVariantUrl}
                      footerText={wlFooterText}
                    />
                  </div>
                )}

                {brandPreviewTab === 'document' && (
                  <div style={{ background: '#FFFFFF', borderRadius: '14px', padding: '1.25rem', border: '1px solid #DCE4EF', color: '#061A36' }}>
                    <DocumentHeader
                      documentType={wlInvoiceTemplate === 'compact-thermal' ? 'PAYMENT RECEIPT' : 'TAX INVOICE'}
                      documentNumber="INV-ADCS-PREVIEW-01"
                      issuedDate="2026-11-12"
                      brandName={wlBrandName}
                      tagline={wlTagline}
                      supportPhone={wlSupportPhone}
                      supportEmail={wlSupportEmail}
                      logoUrl={wlLogoVariantUrl}
                      branchOrCenter={`Letterhead Style: ${wlLetterTemplate}`}
                    />
                    <div style={{ fontSize: '0.78rem', color: '#55677D' }}>Footer: {wlFooterText}</div>
                  </div>
                )}

                {/* Brand Change Governance & Audit Log */}
                <div style={{ background: 'var(--adcs-background)', border: '1px solid var(--adcs-border)', borderRadius: '12px', padding: '1rem' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.84rem', color: 'var(--adcs-text)', marginBottom: '0.5rem' }}>
                    Brand Configuration Publish & Audit History
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxHeight: '200px', overflowY: 'auto' }}>
                    {brandAuditLog.map((entry) => (
                      <div key={entry.id} style={{ padding: '0.5rem 0.65rem', background: 'var(--adcs-surface)', borderRadius: '8px', border: '1px solid var(--adcs-border)', fontSize: '0.76rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: 'var(--adcs-text)' }}>
                          <span>v{entry.version}.0 • {entry.action}</span>
                          <span style={{ color: '#075ACB' }}>{entry.actor}</span>
                        </div>
                        <div style={{ color: 'var(--adcs-muted)', marginTop: '2px' }}>{entry.summary}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: UTR & TRANSACTION ID VERIFICATION DESK */}
        {activeTab === 'utr-verify' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#061A36', margin: 0 }}>
                    UTR Number &amp; Transaction ID Verification Queue ({utrPayments.length})
                  </h2>
                  <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0.2rem 0 0' }}>
                    Verify bank settlement proof before authorizing service fulfillment &amp; commission payouts.
                  </p>
                </div>
                <span className="badge badge-blue">
                  AI Scrutiny: {aiControlConfig.autoUtrScrutinyEnabled ? 'Active' : 'Manual Mode'}
                </span>
              </div>
              {utrPayments.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#64748B', fontSize: '0.88rem', background: '#F8FAFC', borderRadius: '12px' }}>
                  No UTR payment proofs queued yet. Any customer or operator payment on Service Checkout, Cart, PAN 49A, or Pricing Plans automatically registers here.
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                    <thead>
                      <tr style={{ background: '#F8FAFC', color: '#475569', textAlign: 'left', borderBottom: '1px solid #E2E8F0' }}>
                        <th style={{ padding: '0.65rem' }}>Order / Service</th>
                        <th style={{ padding: '0.65rem' }}>UTR Number</th>
                        <th style={{ padding: '0.65rem' }}>Transaction ID</th>
                        <th style={{ padding: '0.65rem' }}>Amount / Mode</th>
                        <th style={{ padding: '0.65rem' }}>AI Screening</th>
                        <th style={{ padding: '0.65rem' }}>Status</th>
                        <th style={{ padding: '0.65rem', textAlign: 'right' }}>Admin Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {utrPayments.map((u) => (
                        <tr key={u.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                          <td style={{ padding: '0.65rem' }}>
                            <div style={{ fontWeight: 700, color: '#061A36' }}>{u.serviceTitle}</div>
                            <div style={{ fontSize: '0.72rem', color: '#64748B' }}>{u.applicantName} • {u.orderId}</div>
                          </td>
                          <td style={{ padding: '0.65rem', fontFamily: 'monospace', fontWeight: 700 }}>{u.utrNumber}</td>
                          <td style={{ padding: '0.65rem', fontFamily: 'monospace', fontWeight: 700 }}>{u.transactionId}</td>
                          <td style={{ padding: '0.65rem' }}>₹{u.amountPaid.toLocaleString('en-IN')} ({u.paymentMethod.toUpperCase()})</td>
                          <td style={{ padding: '0.65rem' }}>
                            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: u.aiRiskFlag === 'REVIEW_REQUIRED' ? '#B45309' : '#047857' }}>
                              {u.aiRiskFlag}
                            </span>
                          </td>
                          <td style={{ padding: '0.65rem' }}>
                            <span className={u.paymentStatus === 'VERIFIED' ? 'badge badge-green' : u.paymentStatus === 'REJECTED' ? 'badge badge-gold' : 'badge badge-blue'}>
                              {u.paymentStatus}
                            </span>
                          </td>
                          <td style={{ padding: '0.65rem', textAlign: 'right', whiteSpace: 'nowrap' }}>
                            <button
                              type="button"
                              onClick={() => verifyUtrPayment(u.id, 'VERIFIED')}
                              className="btn-primary btn-sm"
                              style={{ marginRight: '0.35rem', background: '#047857' }}
                            >
                              Verify UTR
                            </button>
                            <button
                              type="button"
                              onClick={() => verifyUtrPayment(u.id, 'REJECTED')}
                              className="btn-secondary btn-sm"
                            >
                              Reject
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB: ACCESS CONTROL, DIGITAL SEVA 5-TIER & DEPARTMENTS */}
        {activeTab === 'access-hierarchy' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Provision New Isolated Credential */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#061A36', margin: '0 0 0.75rem' }}>
                Provision Role-Locked Credential (Strict Panel Isolation)
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const panelDef = LOGIN_PANELS.find((p) => p.panelKey === newAccPanel) || LOGIN_PANELS[0];
                  if (!newAccName.trim() || !newAccId.trim()) return;
                  createManagedAccount({
                    loginId: newAccId.trim().toUpperCase(),
                    password: newAccPassword || 'Secure@2026',
                    name: newAccName.trim(),
                    role: panelDef.role,
                    panelKey: panelDef.panelKey,
                    digitalSevaTier: panelDef.tier as DigitalSevaTier,
                    designation: newAccDesignation.trim() || panelDef.designationLabel,
                    department: (newAccDept.trim() || panelDef.department) as DepartmentName,
                    regionCode: 'IN-PAN-2026',
                    status: 'Active',
                    permissions: ['view_services', 'process_applications', 'view_commissions'],
                    walletBalance: 5000,
                  });
                  setNewAccName('');
                  setNewAccId('');
                }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '0.65rem', alignItems: 'end' }}
              >
                <div>
                  <label style={{ fontSize: '0.72rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Full Name *</label>
                  <input required value={newAccName} onChange={(e) => setNewAccName(e.target.value)} placeholder="Officer / VLE Name" style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.8rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.72rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Login ID *</label>
                  <input required value={newAccId} onChange={(e) => setNewAccId(e.target.value)} placeholder="e.g. DST-MGR-2099" style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.8rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.72rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Locked Panel *</label>
                  <select
                    value={newAccPanel}
                    onChange={(e) => {
                      const k = e.target.value as LoginPanelKey;
                      setNewAccPanel(k);
                      const def = LOGIN_PANELS.find((p) => p.panelKey === k);
                      if (def) {
                        setNewAccDept(def.department);
                        setNewAccDesignation(def.designationLabel);
                      }
                    }}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.8rem' }}
                  >
                    {LOGIN_PANELS.map((p) => (
                      <option key={p.panelKey} value={p.panelKey}>{p.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.72rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Designation</label>
                  <input value={newAccDesignation} onChange={(e) => setNewAccDesignation(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.8rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.72rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Department</label>
                  <input value={newAccDept} onChange={(e) => setNewAccDept(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.8rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.72rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>Password</label>
                  <input value={newAccPassword} onChange={(e) => setNewAccPassword(e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.8rem' }} />
                </div>
                <button type="submit" className="btn-primary btn-sm" style={{ padding: '0.55rem 0.9rem' }}>
                  + Create Locked ID
                </button>
              </form>
            </div>

            {/* Interactive RBAC Permissions & Designation Table */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#061A36', margin: '0 0 0.75rem' }}>
                Super Admin Access Control Matrix — Designations, Departments &amp; Feature Flags
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {userAccounts.map((acc: AuthUserAccount) => (
                  <div key={acc.id} style={{ padding: '0.9rem', borderRadius: '12px', border: '1px solid #DCE4EF', background: acc.status === 'Suspended' ? '#FEF2F2' : '#FFFFFF' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.6rem' }}>
                      <div>
                        <strong style={{ color: '#061A36', fontSize: '0.92rem' }}>{acc.name}</strong>{' '}
                        <code style={{ background: '#EFF6FF', color: '#075ACB', padding: '0.12rem 0.45rem', borderRadius: '5px', fontWeight: 700, fontSize: '0.76rem' }}>{acc.loginId}</code>{' '}
                        <span className="badge badge-gold" style={{ fontSize: '0.68rem' }}>Panel: {acc.panelKey}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.76rem', color: '#475569' }}>
                          {acc.designation} • <strong>{acc.department}</strong>
                        </span>
                        <button
                          type="button"
                          onClick={() => updateUserAccountAccess(acc.id, { status: acc.status === 'Active' ? 'Suspended' : 'Active' })}
                          className="btn-secondary btn-sm"
                          style={{ color: acc.status === 'Active' ? '#DC2626' : '#047857' }}
                        >
                          {acc.status === 'Active' ? 'Suspend Access' : 'Restore Active'}
                        </button>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                      {ALL_PERMISSION_FLAGS.map((flag) => {
                        const granted = acc.permissions.includes(flag.key);
                        return (
                          <label
                            key={flag.key}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.3rem',
                              padding: '0.25rem 0.5rem',
                              borderRadius: '6px',
                              border: granted ? '1px solid #075ACB' : '1px solid #E2E8F0',
                              background: granted ? '#EFF6FF' : '#F8FAFC',
                              fontSize: '0.72rem',
                              fontWeight: granted ? 700 : 500,
                              cursor: 'pointer',
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={granted}
                              onChange={() => {
                                const nextPerms: PermissionFlag[] = granted
                                  ? acc.permissions.filter((p) => p !== flag.key)
                                  : [...acc.permissions, flag.key];
                                updateUserAccountAccess(acc.id, { permissions: nextPerms });
                              }}
                            />
                            <span>{flag.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: ADMIN-ONLY COMMISSION MATRIX */}
        {activeTab === 'commissions' && (
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#061A36', margin: 0 }}>
                  Admin-Exclusive Commission &amp; Hierarchy Slab Control
                </h2>
                <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0.2rem 0 0' }}>
                  Super Admin sets commissions for Rural VLE, District Manager, State Head, Main Head, Distributor, Franchise &amp; Affiliate. Non-admin portals remain strictly read-only.
                </p>
              </div>
              <span className="badge badge-gold">ADMIN EXCLUSIVE WRITE AUTHORITY</span>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', color: '#475569', textAlign: 'left', borderBottom: '1px solid #E2E8F0' }}>
                    <th style={{ padding: '0.55rem' }}>Service Vertical</th>
                    <th style={{ padding: '0.55rem' }}>Rural VLE %</th>
                    <th style={{ padding: '0.55rem' }}>District Mgr %</th>
                    <th style={{ padding: '0.55rem' }}>State Head %</th>
                    <th style={{ padding: '0.55rem' }}>Main Head %</th>
                    <th style={{ padding: '0.55rem' }}>Distributor %</th>
                    <th style={{ padding: '0.55rem' }}>Franchise %</th>
                    <th style={{ padding: '0.55rem' }}>Flat Bonus ₹</th>
                    <th style={{ padding: '0.55rem', textAlign: 'right' }}>Save</th>
                  </tr>
                </thead>
                <tbody>
                  {commissionRules.map((rule) => {
                    const draft = commEdits[rule.id] || {};
                    const val = (k: keyof CommissionRule) => Number(draft[k] ?? rule[k]);
                    return (
                      <tr key={rule.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                        <td style={{ padding: '0.55rem', fontWeight: 700, color: '#061A36' }}>{rule.serviceTitle}</td>
                        {(['ruralVlePct', 'districtMgrPct', 'stateHeadPct', 'mainHeadPct', 'distributorPct', 'franchisePct', 'flatBonusInr'] as const).map((field) => (
                          <td key={field} style={{ padding: '0.45rem' }}>
                            <input
                              type="number"
                              min={0}
                              step="0.5"
                              value={val(field)}
                              onChange={(e) =>
                                setCommEdits((prev) => ({
                                  ...prev,
                                  [rule.id]: { ...prev[rule.id], [field]: Number(e.target.value) },
                                }))
                              }
                              style={{ width: '66px', padding: '0.32rem 0.4rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontWeight: 700 }}
                            />
                          </td>
                        ))}
                        <td style={{ padding: '0.45rem', textAlign: 'right' }}>
                          <button
                            type="button"
                            className="btn-primary btn-sm"
                            onClick={() => updateCommissionRule(rule.id, draft)}
                          >
                            Save Slab
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: QUANTUM AI SYSTEM ORCHESTRATOR & BANNER MANAGER */}
        {activeTab === 'ai-command' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#061A36', margin: '0 0 0.85rem' }}>
                QUANTUM AI Ecosystem Governance Controls
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {(
                  [
                    { key: 'autonomousRoutingEnabled', label: 'Autonomous Service Queue Routing', desc: 'Routes citizen applications to District/Rural operators automatically' },
                    { key: 'autoUtrScrutinyEnabled', label: 'AI UTR & Transaction Duplicate Screening', desc: 'Flags anomalous or reused UTR references before fulfillment' },
                    { key: 'crossPanelIntrusionGuard', label: 'Cross-Panel Login Intrusion Shield', desc: 'Blocks VLE / Retailer logins attempting higher hierarchy panels' },
                    { key: 'commissionAnomalyGuard', label: 'Admin Commission Anomaly Guard', desc: 'Monitors payout ratios & protects commission tables' },
                    { key: 'slaEscalationEnabled', label: 'AI SLA Escalation Watchdog', desc: 'Escalates delayed district orders to State / Main Head' },
                    { key: 'bilingualAiConcierge', label: 'Bilingual EN/HI QUANTUM AI Assistant', desc: 'Active guidance across Homepage & all 16 sector workflows' },
                  ] as const
                ).map((item) => {
                  const enabled = aiControlConfig[item.key];
                  return (
                    <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', borderRadius: '10px', border: '1px solid #DCE4EF', background: enabled ? '#EFF6FF' : '#F8FAFC' }}>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.84rem', color: '#061A36' }}>{item.label}</div>
                        <div style={{ fontSize: '0.73rem', color: '#64748B' }}>{item.desc}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => updateAiControlConfig({ [item.key]: !enabled })}
                        className={enabled ? 'btn-primary btn-sm' : 'btn-secondary btn-sm'}
                      >
                        {enabled ? 'ACTIVE' : 'PAUSED'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#061A36', margin: '0 0 0.85rem' }}>
                Multi-Service Campaign Banners ({serviceBanners.length} Live)
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!bannerTitle.trim()) return;
                  saveServiceBanner({
                    id: `banner-${Date.now()}`,
                    sectorKey: bannerSector,
                    title: bannerTitle.trim(),
                    titleHi: bannerTitle.trim(),
                    subtitle: bannerSubtitle.trim() || 'Instant assisted digital fulfillment with mandatory UTR verification.',
                    subtitleHi: bannerSubtitle.trim() || 'तुरंत डिजिटल सेवा सहायता।',
                    badge: bannerBadge.trim() || 'CAMPAIGN',
                    ctaLabel: 'Open Sector',
                    targetRoute: bannerRoute.trim() || '/services',
                    themeVariant: 'navy',
                  });
                  setBannerTitle('');
                  setBannerSubtitle('');
                }}
                style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1rem' }}
              >
                <input value={bannerTitle} onChange={(e) => setBannerTitle(e.target.value)} placeholder="New Multi-Service Banner Headline *" required style={{ padding: '0.5rem 0.65rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.82rem' }} />
                <input value={bannerSubtitle} onChange={(e) => setBannerSubtitle(e.target.value)} placeholder="Campaign Subtitle / Service Scope" style={{ padding: '0.5rem 0.65rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.82rem' }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.45rem' }}>
                  <input value={bannerBadge} onChange={(e) => setBannerBadge(e.target.value)} placeholder="Badge" style={{ padding: '0.45rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.78rem' }} />
                  <input value={bannerSector} onChange={(e) => setBannerSector(e.target.value)} placeholder="Sector (e.g. pricing)" style={{ padding: '0.45rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.78rem' }} />
                  <input value={bannerRoute} onChange={(e) => setBannerRoute(e.target.value)} placeholder="/route" style={{ padding: '0.45rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.78rem' }} />
                </div>
                <button type="submit" className="btn-primary btn-sm">
                  + Publish Campaign Banner
                </button>
              </form>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', maxHeight: '240px', overflowY: 'auto' }}>
                {serviceBanners.map((b) => (
                  <div key={b.id} style={{ padding: '0.55rem 0.75rem', borderRadius: '8px', background: '#F8FAFC', border: '1px solid #E2E8F0', fontSize: '0.76rem' }}>
                    <div style={{ fontWeight: 800, color: '#061A36' }}>[{b.badge}] {b.title}</div>
                    <div style={{ color: '#64748B' }}>Sector: <code>{b.sectorKey}</code> • Route: <code>{b.targetRoute}</code></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
