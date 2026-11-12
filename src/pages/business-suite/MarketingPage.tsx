import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { 
  Send, 
  Users, 
  MessageSquare, 
  Mail, 
  Smartphone, 
  Bell, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  PlusCircle, 
  Sparkles, 
  Filter,
  ShieldCheck,
  Play,
  X,
  Search,
  Download,
  BarChart2,
  Eye,
  Shield
} from 'lucide-react';
import { MarketingCampaign } from '../../types';

export const MarketingPage: React.FC = () => {
  const { marketingCampaigns, createMarketingCampaign, launchCampaign, showToast, logAudit } = useApp();
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [selectedAnalyticsCamp, setSelectedAnalyticsCamp] = useState<MarketingCampaign | null>(null);
  const [consentQueryPhone, setConsentQueryPhone] = useState('+91 98350 12345');
  const [consentResult, setConsentResult] = useState<{
    phone: string;
    optedIn: boolean;
    category: string;
    timestamp: string;
  } | null>({
    phone: '+91 98350 12345',
    optedIn: true,
    category: 'Transactional & Statutory Updates (Explicit Opt-In)',
    timestamp: '2026-08-14 10:22:04 IST'
  });

  // Form state
  const [campaignName, setCampaignName] = useState('');
  const [channel, setChannel] = useState<MarketingCampaign['channel']>('WhatsApp Business');
  const [segment, setSegment] = useState<MarketingCampaign['audienceSegment']>('All Citizens');
  const [targetCount, setTargetCount] = useState<number>(4500);
  const [templateText, setTemplateText] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const totalDelivered = marketingCampaigns.reduce((sum, c) => sum + c.deliveredCount, 0);
  const totalConversions = marketingCampaigns.reduce((sum, c) => sum + c.conversionCount, 0);
  const avgConversionRate = totalDelivered > 0 ? ((totalConversions / totalDelivered) * 100).toFixed(1) : '0';

  const filteredCampaigns = marketingCampaigns.filter(c => {
    if (activeFilter === 'All') return true;
    return c.status === activeFilter;
  });

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!campaignName || !templateText) return;

    createMarketingCampaign({
      name: campaignName,
      channel,
      audienceSegment: segment,
      scheduledDate: new Date().toISOString().substring(0, 10),
      targetCount,
      templateText
    });

    logAudit('CREATE_CAMPAIGN', `Created campaign: ${campaignName} (${channel})`, 'Success');
    setShowCreateModal(false);
    setCampaignName('');
    setTemplateText('');
  };

  const handleLaunchNow = (id: string) => {
    launchCampaign(id);
    logAudit('DISPATCH_CAMPAIGN', `Dispatched broadcast campaign ID: ${id}`, 'Success');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        
        {/* Header Strip */}
        <div style={{
          background: 'linear-gradient(135deg, #061A36 0%, #151D33 50%, #4F46E5 100%)',
          borderRadius: '24px',
          padding: '2.5rem',
          color: '#FFFFFF',
          marginBottom: '2rem',
          boxShadow: '0 20px 40px rgba(10, 25, 47, 0.15)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)', padding: '0.35rem 0.8rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, color: '#C7D2FE', marginBottom: '0.75rem' }}>
              <Sparkles size={14} color="#F59E0B" />
              <span>ADVANCED MARKETING AUTOMATION & AUDIENCE ORCHESTRATION</span>
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, margin: '0 0 0.5rem', color: '#FFFFFF' }}>
              Multi-Channel Campaign & WhatsApp Automation
            </h1>
            <p style={{ color: '#E2E8F0', fontSize: '0.92rem', maxWidth: '680px', margin: 0, lineHeight: 1.5 }}>
              Deliver personalized Meta-approved WhatsApp Business notifications, TRAI DND-compliant transactional SMS, and targeted email broadcasts to accelerate citizen adoption.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn btn-gold"
              style={{ fontWeight: 800, padding: '0.75rem 1.4rem' }}
            >
              <PlusCircle size={18} /> Compose New Campaign
            </button>
            <button
              onClick={() => setShowConsentModal(true)}
              className="btn"
              style={{ background: 'rgba(255,255,255,0.12)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              <ShieldCheck size={18} /> Consent & DND Status
            </button>
          </div>
        </div>

        {/* Marketing KPIs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem'
        }}>
          <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', fontSize: '0.82rem', fontWeight: 600 }}>
              <span>ACTIVE CAMPAIGNS</span>
              <Play size={18} color="#075ACB" />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#061A36', margin: '0.4rem 0' }}>
              {marketingCampaigns.filter(c => c.status === 'Active').length} Live
            </div>
            <div style={{ fontSize: '0.78rem', color: '#059669' }}>
              Continuous drip triggers engaged
            </div>
          </div>

          <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', fontSize: '0.82rem', fontWeight: 600 }}>
              <span>BROADCAST DELIVERIES</span>
              <Send size={18} color="#059669" />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#059669', margin: '0.4rem 0' }}>
              {totalDelivered.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
              98.4% Meta / SMS gateway delivery
            </div>
          </div>

          <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', fontSize: '0.82rem', fontWeight: 600 }}>
              <span>CITIZEN CONVERSIONS</span>
              <TrendingUp size={18} color="#D97706" />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#D97706', margin: '0.4rem 0' }}>
              {totalConversions.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#059669' }}>
              Avg. Conversion: {avgConversionRate}%
            </div>
          </div>

          <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', fontSize: '0.82rem', fontWeight: 600 }}>
              <span>CONSENT & DND COMPLIANCE</span>
              <ShieldCheck size={18} color="#7C3AED" />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#7C3AED', margin: '0.4rem 0' }}>
              100%
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
              Zero spam complaints logged
            </div>
          </div>
        </div>

        {/* Campaign Filter Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {(['All', 'Active', 'Scheduled', 'Completed'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  background: activeFilter === tab ? '#061A36' : '#FFFFFF',
                  color: activeFilter === tab ? '#FFFFFF' : '#64748B',
                  border: '1px solid #E2E8F0',
                  cursor: 'pointer'
                }}
              >
                {tab} Campaigns
              </button>
            ))}
          </div>
        </div>

        {/* Campaign Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
          {filteredCampaigns.map(camp => {
            const getChannelIcon = (ch: MarketingCampaign['channel']) => {
              if (ch === 'WhatsApp Business') return <MessageSquare size={18} color="#059669" />;
              if (ch === 'Email') return <Mail size={18} color="#075ACB" />;
              if (ch === 'SMS') return <Smartphone size={18} color="#D97706" />;
              return <Bell size={18} color="#7C3AED" />;
            };

            return (
              <div
                key={camp.id}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '20px',
                  border: '1px solid #E2E8F0',
                  padding: '1.5rem',
                  boxShadow: '0 4px 20px rgba(10, 25, 47, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1rem'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {getChannelIcon(camp.channel)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '1rem', color: '#061A36' }}>{camp.name}</div>
                        <div style={{ fontSize: '0.72rem', color: '#64748B' }}>{camp.channel} • {camp.audienceSegment}</div>
                      </div>
                    </div>

                    <span className={`badge ${camp.status === 'Active' ? 'badge-green' : camp.status === 'Scheduled' ? 'badge-blue' : 'badge-gray'}`}>
                      {camp.status}
                    </span>
                  </div>

                  <div style={{
                    background: '#F8FAFC',
                    borderRadius: '12px',
                    padding: '0.85rem',
                    border: '1px solid #F1F5F9',
                    fontSize: '0.82rem',
                    color: '#334155',
                    fontStyle: 'italic',
                    marginBottom: '1rem',
                    lineHeight: 1.45
                  }}>
                    "{camp.templateText}"
                  </div>

                  {/* Delivery & Conversion Funnel */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', textAlign: 'center', background: '#FAFAFA', borderRadius: '10px', padding: '0.75rem', border: '1px solid #E5E7EB' }}>
                    <div>
                      <div style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 600 }}>AUDIENCE</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#061A36' }}>{camp.targetCount.toLocaleString('en-IN')}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 600 }}>DELIVERED</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#059669' }}>{camp.deliveredCount.toLocaleString('en-IN')}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 600 }}>CONVERTED</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#075ACB' }}>{camp.conversionCount.toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid #F1F5F9', paddingTop: '0.75rem' }}>
                  {camp.status === 'Scheduled' && (
                    <button
                      onClick={() => handleLaunchNow(camp.id)}
                      className="btn btn-sm btn-primary"
                      style={{ flex: 1, gap: '0.35rem' }}
                    >
                      <Play size={14} /> Dispatch Broadcast Now
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedAnalyticsCamp(camp)}
                    className="btn btn-sm btn-outline"
                    style={{ flex: camp.status === 'Scheduled' ? 0.7 : 1 }}
                  >
                    View Analytics
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* MODAL: TRAI DND & DPDP 2025 CONSENT REGISTRY */}
        {showConsentModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10, 25, 47, 0.75)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem'
          }}>
            <div style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              maxWidth: '620px',
              width: '100%',
              padding: '2rem',
              boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div>
                  <span className="badge badge-green">DPDP ACT 2025 COMPLIANT</span>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#061A36', marginTop: '0.25rem' }}>
                    TRAI DND & Purpose-Limitation Consent Registry
                  </h3>
                </div>
                <button onClick={() => setShowConsentModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <X size={20} color="#64748B" />
                </button>
              </div>

              {/* Top Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ background: '#F8FAFC', padding: '0.85rem', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Total Active Consents</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#075ACB' }}>1,84,210</div>
                </div>
                <div style={{ background: '#F8FAFC', padding: '0.85rem', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Verified Opt-In Rate</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#059669' }}>99.2%</div>
                </div>
                <div style={{ background: '#F8FAFC', padding: '0.85rem', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>TRAI DND Violations</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#10B981' }}>0 (Zero)</div>
                </div>
              </div>

              {/* Number Checker */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label className="form-label" style={{ fontSize: '0.8rem' }}>Check Mobile Number Consent & DND Status</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    className="form-input"
                    value={consentQueryPhone}
                    onChange={(e) => setConsentQueryPhone(e.target.value)}
                    placeholder="e.g. +91 98350 12345"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setConsentResult({
                        phone: consentQueryPhone,
                        optedIn: true,
                        category: 'Transactional & Statutory Updates (Explicit Opt-In)',
                        timestamp: new Date().toLocaleDateString('en-GB') + ' 10:14:00 IST'
                      });
                      showToast('Consent Verified', `Record verified for ${consentQueryPhone}.`, 'success');
                    }}
                    className="btn btn-primary"
                    style={{ padding: '0.6rem 1rem' }}
                  >
                    <Search size={15} /> Check
                  </button>
                </div>
              </div>

              {consentResult && (
                <div style={{
                  background: '#F0FDF4',
                  borderRadius: '12px',
                  padding: '1rem',
                  border: '1px solid #86EFAC',
                  marginBottom: '1.25rem',
                  fontSize: '0.85rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div style={{ fontWeight: 800, color: '#166534' }}>✓ Explicit DPDP Consent On Record</div>
                    <span className="badge badge-green">Safe to Broadcast</span>
                  </div>
                  <div style={{ color: '#15803D' }}>Phone: <strong>{consentResult.phone}</strong></div>
                  <div style={{ color: '#15803D' }}>Purpose: <strong>{consentResult.category}</strong></div>
                  <div style={{ fontSize: '0.75rem', color: '#166534', marginTop: '0.35rem' }}>
                    Timestamp: {consentResult.timestamp} • Cryptographic Hash: SHA256:77f19024a...
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => {
                    showToast('Registry Exported', 'TRAI_DND_Suppression_List_2026.csv downloaded.', 'success');
                  }}
                  className="btn btn-outline"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <Download size={14} /> Export DND Suppression List
                </button>
                <button type="button" onClick={() => setShowConsentModal(false)} className="btn btn-primary">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: CAMPAIGN FUNNEL ANALYTICS */}
        {selectedAnalyticsCamp && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10, 25, 47, 0.75)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem'
          }}>
            <div style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              maxWidth: '640px',
              width: '100%',
              padding: '2.25rem',
              boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                <div>
                  <span className="badge badge-blue">{selectedAnalyticsCamp.channel}</span>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#061A36', margin: '0.25rem 0' }}>
                    {selectedAnalyticsCamp.name}
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
                    Target: {selectedAnalyticsCamp.audienceSegment} • Status: <strong>{selectedAnalyticsCamp.status}</strong>
                  </div>
                </div>
                <button onClick={() => setSelectedAnalyticsCamp(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  <X size={20} color="#64748B" />
                </button>
              </div>

              {/* Conversion Funnel Breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {[
                  { step: '1. Dispatched Messages', count: (selectedAnalyticsCamp.deliveredCount || 5000).toLocaleString('en-IN'), pct: '100%', color: '#075ACB' },
                  { step: '2. Successfully Delivered', count: Math.round((selectedAnalyticsCamp.deliveredCount || 5000) * 0.994).toLocaleString('en-IN'), pct: '99.4%', color: '#2563EB' },
                  { step: '3. Read / Opened', count: Math.round((selectedAnalyticsCamp.deliveredCount || 5000) * 0.882).toLocaleString('en-IN'), pct: '88.2%', color: '#059669' },
                  { step: '4. Action Links Clicked (CTR)', count: Math.round((selectedAnalyticsCamp.deliveredCount || 5000) * 0.416).toLocaleString('en-IN'), pct: '41.6%', color: '#D97706' },
                  { step: '5. Completed Filings / Purchases', count: Math.round((selectedAnalyticsCamp.deliveredCount || 5000) * 0.184).toLocaleString('en-IN'), pct: '18.4%', color: '#7C3AED' }
                ].map((f, i) => (
                  <div key={i} style={{ background: '#F8FAFC', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: 700, color: '#061A36' }}>{f.step}</span>
                      <strong style={{ color: f.color }}>{f.count} ({f.pct})</strong>
                    </div>
                    <div style={{ height: '6px', background: '#E2E8F0', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{ width: f.pct, height: '100%', background: f.color, borderRadius: '999px' }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* ROI Metric */}
              <div style={{ background: '#EFF6FF', borderRadius: '12px', padding: '1rem', border: '1px solid #BFDBFE', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#1E40AF', fontWeight: 600 }}>ATTRIBUTED GMV REVENUE</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#075ACB' }}>₹78,400.00</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.78rem', color: '#1E40AF', fontWeight: 600 }}>COST PER ACQUISITION (CPA)</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#059669' }}>₹3.80 / filing</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => {
                    showToast('Report Downloaded', `Campaign_Analytics_${selectedAnalyticsCamp.id}.csv downloaded.`, 'success');
                  }}
                  className="btn btn-outline"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <Download size={14} /> Download Funnel Report (.CSV)
                </button>
                <button type="button" onClick={() => setSelectedAnalyticsCamp(null)} className="btn btn-primary">
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
        {showCreateModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10, 25, 47, 0.7)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem'
          }}>
            <div style={{ background: '#FFFFFF', borderRadius: '20px', maxWidth: '540px', width: '100%', padding: '2rem', boxShadow: '0 25px 60px rgba(0,0,0,0.3)' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#061A36', marginBottom: '0.25rem' }}>
                Compose Automated Marketing Campaign
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '1.25rem' }}>
                Multi-channel broadcast with TRAI DND suppression and Meta verified template formatting.
              </p>

              <form onSubmit={handleCreateCampaign}>
                <div className="form-group">
                  <label className="form-label">Campaign Title *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    placeholder="e.g. Pan-India Voter ID Correction Drive"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Channel</label>
                    <select className="form-select" value={channel} onChange={(e) => setChannel(e.target.value as any)}>
                      <option value="WhatsApp Business">WhatsApp Business API</option>
                      <option value="Email">Email Broadcast</option>
                      <option value="SMS">Transactional SMS</option>
                      <option value="Push">Mobile Push Notification</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Audience Segment</label>
                    <select className="form-select" value={segment} onChange={(e) => setSegment(e.target.value as any)}>
                      <option value="All Citizens">All Registered Citizens</option>
                      <option value="VLE Franchisees">Active VLE & Kendra Partners</option>
                      <option value="Pending Documents">Citizens with Pending Documents</option>
                      <option value="Tax Compliance Leads">MSME & Tax Compliance Leads</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Broadcast Target Count</label>
                  <input
                    type="number"
                    min={100}
                    className="form-input"
                    value={targetCount}
                    onChange={(e) => setTargetCount(Number(e.target.value))}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Broadcast Message Template *</label>
                  <textarea
                    rows={4}
                    required
                    className="form-textarea"
                    value={templateText}
                    onChange={(e) => setTemplateText(e.target.value)}
                    placeholder="Type official notification body. Dynamic tags allowed: {{name}}, {{service}}..."
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                  <button type="button" onClick={() => setShowCreateModal(false)} className="btn btn-outline" style={{ flex: 1 }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" style={{ flex: 2, fontWeight: 800 }}>
                    Schedule Broadcast
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
