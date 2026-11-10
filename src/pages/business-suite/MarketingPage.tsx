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
  Play
} from 'lucide-react';
import { MarketingCampaign } from '../../types';

export const MarketingPage: React.FC = () => {
  const { marketingCampaigns, createMarketingCampaign, launchCampaign, showToast, logAudit } = useApp();
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Active' | 'Scheduled' | 'Completed'>('All');

  // Form state
  const [campaignName, setCampaignName] = useState('');
  const [channel, setChannel] = useState<MarketingCampaign['channel']>('WhatsApp Business');
  const [segment, setSegment] = useState<MarketingCampaign['audienceSegment']>('All Citizens');
  const [targetCount, setTargetCount] = useState<number>(4500);
  const [templateText, setTemplateText] = useState('');

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
          background: 'linear-gradient(135deg, #0A192F 0%, #151D33 50%, #4F46E5 100%)',
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
            <h1 style={{ fontSize: '2rem', fontWeight: 900, margin: '0 0 0.5rem' }}>
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
              onClick={() => showToast('Consent Registry', 'TRAI DND Opt-in/Opt-out registry synchronized across 1,84,000+ mobile records.', 'info')}
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
              <Play size={18} color="#1D4ED8" />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0A192F', margin: '0.4rem 0' }}>
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
                  background: activeFilter === tab ? '#0A192F' : '#FFFFFF',
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
              if (ch === 'Email') return <Mail size={18} color="#1D4ED8" />;
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
                        <div style={{ fontWeight: 800, fontSize: '1rem', color: '#0A192F' }}>{camp.name}</div>
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
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0A192F' }}>{camp.targetCount.toLocaleString('en-IN')}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 600 }}>DELIVERED</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#059669' }}>{camp.deliveredCount.toLocaleString('en-IN')}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 600 }}>CONVERTED</div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1D4ED8' }}>{camp.conversionCount.toLocaleString('en-IN')}</div>
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
                    onClick={() => showToast('Campaign Analytics', `Funnel analytics for "${camp.name}" generated.`, 'info')}
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

        {/* MODAL: COMPOSE CAMPAIGN */}
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
              <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0A192F', marginBottom: '0.25rem' }}>
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
                      <option value="All Citizens">All Citizens (1,84,000+)</option>
                      <option value="VLE Franchisees">VLE Franchisees (2,450+)</option>
                      <option value="Pending Documents">Pending Documents (1,120+)</option>
                      <option value="Tax Compliance Leads">Tax Compliance Leads (3,800+)</option>
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
