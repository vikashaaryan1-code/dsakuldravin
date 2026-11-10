import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AstroHeaderNav } from '../../components/astrology/AstroHeaderNav';
import { 
  Users, 
  Wallet, 
  TrendingUp, 
  Award, 
  FileText, 
  Compass, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Copy, 
  Check, 
  Download, 
  Share2, 
  QrCode, 
  Percent, 
  ShieldCheck, 
  Store, 
  Printer, 
  Clock, 
  DollarSign,
  UserCheck
} from 'lucide-react';

interface ClientEntry {
  id: string;
  name: string;
  service: string;
  date: string;
  commission: number;
  status: 'Completed' | 'In Progress' | 'Scheduled';
  token: string;
}

export const AstroAgentPage: React.FC = () => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'counter' | 'commissions' | 'marketing'>('overview');

  // Agent / VLE State
  const agentProfile = {
    vleId: 'VLE-DEL-8921',
    centerName: 'Akul Dravin Digital Services (ADCS) Kendra (Janakpuri Center)',
    operatorName: 'राजेश कुमार वर्मा (Rajesh Kumar Verma)',
    walletBalance: 14850,
    monthlyEarnings: 38400,
    totalKundlisIssued: 412,
    totalConsultationsBooked: 86,
    commissionTier: 'Gold Partner (25% Commission)'
  };

  // Quick Counter Client Form State
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [selectedService, setSelectedService] = useState('kundli');
  const [issuedToken, setIssuedToken] = useState<string | null>(null);

  const handleIssueKundli = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) return;
    const newToken = `VLE-ASTRO-${Math.floor(100000 + Math.random() * 900000)}`;
    setIssuedToken(newToken);
  };

  const clientHistory: ClientEntry[] = [
    {
      id: '1',
      name: 'संजय कुमार (Sanjay Kumar)',
      service: 'संपूर्ण जन्म पत्रिका + फलादेश',
      date: '22 Sep 2026, 09:15 AM',
      commission: 125,
      status: 'Completed',
      token: 'AD-ASTRO-842915'
    },
    {
      id: '2',
      name: 'अनिता देवी (Anita Devi)',
      service: '36 गुण वर-वधू कुंडली मिलान',
      date: '21 Sep 2026, 04:30 PM',
      commission: 150,
      status: 'Completed',
      token: 'AD-ASTRO-771829'
    },
    {
      id: '3',
      name: 'मुकेश गोयल (Mukesh Goyal)',
      service: 'आचार्य परामर्श (वीडियो कॉल 30 मिनट)',
      date: '21 Sep 2026, 01:00 PM',
      commission: 375,
      status: 'Completed',
      token: 'AD-ASTRO-651230'
    },
    {
      id: '4',
      name: 'रोहित मिश्रा (Rohit Mishra)',
      service: 'नेचुरल पन्ना रत्न (5.25 रत्ती लैब सर्टिफाइड)',
      date: '20 Sep 2026, 11:20 AM',
      commission: 1250,
      status: 'Completed',
      token: 'AD-STORE-992144'
    }
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://ad-digital.in/astrology?ref=${agentProfile.vleId}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#090E17', color: '#F8FAFC', paddingBottom: '80px' }}>
      {/* Sticky Secondary Celestial Header */}
      <AstroHeaderNav />

      {/* Hero / VLE Agent Header */}
      <section style={{
        position: 'relative',
        padding: '50px 16px 40px',
        background: 'radial-gradient(ellipse at top, #1E1B4B 0%, #0F172A 60%, #090E17 100%)',
        borderBottom: '1px solid rgba(245, 158, 11, 0.2)'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(245, 158, 11, 0.15)',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                padding: '4px 14px',
                borderRadius: '999px',
                fontSize: '12px',
                color: '#FDE68A',
                fontWeight: 700,
                marginBottom: '10px'
              }}>
                <Store size={14} color="#F59E0B" />
                वीएलई एवं डिजिटल केंद्र एजेंट पोर्टल • VLE Partner Franchise
              </div>

              <h1 style={{
                fontSize: 'clamp(24px, 4vw, 36px)',
                fontWeight: 800,
                margin: '0 0 6px',
                color: '#FFFFFF'
              }}>
                {agentProfile.centerName}
              </h1>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', fontSize: '13px', color: '#94A3B8' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <UserCheck size={15} color="#10B981" /> संचालक: <strong style={{ color: '#E2E8F0' }}>{agentProfile.operatorName}</strong>
                </span>
                <span>•</span>
                <span style={{ color: '#FDE68A' }}>VLE ID: {agentProfile.vleId}</span>
                <span>•</span>
                <span style={{
                  background: 'rgba(16, 185, 129, 0.2)',
                  color: '#A7F3D0',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  fontWeight: 700,
                  border: '1px solid #10B981'
                }}>
                  {agentProfile.commissionTier}
                </span>
              </div>
            </div>

            {/* Wallet Quick Balance Card */}
            <div style={{
              background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
              border: '2px solid #F59E0B',
              borderRadius: '18px',
              padding: '18px 24px',
              boxShadow: '0 10px 25px rgba(245, 158, 11, 0.25)',
              textAlign: 'right',
              minWidth: '220px'
            }}>
              <div style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                <Wallet size={15} color="#F59E0B" /> एजेंट वॉलेट शेष
              </div>
              <div style={{ fontSize: '28px', fontWeight: 900, color: '#FDE68A', margin: '4px 0' }}>
                ₹{agentProfile.walletBalance.toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '11px', color: '#10B981', fontWeight: 700 }}>
                +₹{agentProfile.monthlyEarnings.toLocaleString('en-IN')} इस माह अर्जित
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick KPI Strip */}
      <section style={{ maxWidth: '1240px', margin: '-20px auto 40px', padding: '0 16px', position: 'relative', zIndex: 10 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px'
        }}>
          {[
            {
              title: 'कुल जारी जन्म पत्रिकाएं',
              value: `${agentProfile.totalKundlisIssued}+`,
              sub: 'कस्टमर काउंटर से प्रिंटेड',
              icon: <Compass size={22} color="#F59E0B" />,
              border: 'rgba(245, 158, 11, 0.3)'
            },
            {
              title: 'परामर्श सत्र बुक किए गए',
              value: `${agentProfile.totalConsultationsBooked}`,
              sub: '25% प्रत्यक्ष कमीशन',
              icon: <Users size={22} color="#10B981" />,
              border: 'rgba(16, 185, 129, 0.3)'
            },
            {
              title: 'मासिक कमीशन आय',
              value: `₹${agentProfile.monthlyEarnings.toLocaleString('en-IN')}`,
              sub: 'प्रत्यक्ष बैंक ट्रांसफर उपलब्ध',
              icon: <TrendingUp size={22} color="#3B82F6" />,
              border: 'rgba(59, 130, 246, 0.3)'
            },
            {
              title: 'पार्टनर स्तर',
              value: 'गोल्ड स्टार वीएलई',
              sub: 'सर्वोच्च 25% स्लैब सक्रिय',
              icon: <Award size={22} color="#EC4899" />,
              border: 'rgba(236, 72, 153, 0.3)'
            }
          ].map((stat, i) => (
            <div key={i} style={{
              background: '#1E293B',
              borderRadius: '16px',
              padding: '18px 20px',
              border: `1px solid ${stat.border}`,
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)'
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {stat.icon}
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 600 }}>{stat.title}</div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', marginTop: '2px' }}>{stat.value}</div>
                <div style={{ fontSize: '11px', color: '#A7F3D0' }}>{stat.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Tab Navigation */}
      <div style={{ maxWidth: '1240px', margin: '0 auto 30px', padding: '0 16px' }}>
        <div style={{
          display: 'flex',
          gap: '10px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          paddingBottom: '12px',
          overflowX: 'auto'
        }}>
          {[
            { id: 'overview', label: 'डैशबोर्ड ओवरव्यू' },
            { id: 'counter', label: '⚡ त्वरित ग्राहक काउंटर' },
            { id: 'commissions', label: 'कमीशन व लेनदेन लेज़र' },
            { id: 'marketing', label: 'मार्केटिंग किट व बैनर' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              style={{
                background: activeTab === t.id ? '#F59E0B' : 'rgba(255, 255, 255, 0.05)',
                color: activeTab === t.id ? '#000000' : '#CBD5E1',
                border: 'none',
                borderRadius: '10px',
                padding: '10px 20px',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Overview & Quick Counter */}
      {activeTab === 'overview' && (
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {/* Quick Counter Service Launcher */}
            <div style={{
              background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
              borderRadius: '20px',
              padding: '24px',
              border: '1px solid rgba(245, 158, 11, 0.3)'
            }}>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#FDE68A', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Compass size={18} color="#F59E0B" /> काउंटर ग्राहक सेवा डेस्क
              </div>
              <p style={{ fontSize: '13px', color: '#94A3B8', marginBottom: '20px' }}>
                अपने केंद्र पर आने वाले ग्राहकों के लिए 1 मिनट में जन्म पत्रिका बनाएं अथवा वरिष्ठ ज्योतिषी से अपॉइंटमेंट बुक करें।
              </p>

              <form onSubmit={handleIssueKundli} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>
                    ग्राहक का नाम
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. अमित शर्मा"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      color: '#FFFFFF',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>
                    मोबाइल नंबर (व्हाट्सएप)
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      color: '#FFFFFF',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: '#CBD5E1', display: 'block', marginBottom: '4px' }}>
                    सेवा चयन
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#0F172A',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      color: '#FFFFFF',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  >
                    <option value="kundli">वैदिक जन्म पत्रिका निर्माण (कमीशन: ₹100)</option>
                    <option value="matching">36 गुण वर-वधू मिलान रिपोर्ट (कमीशन: ₹150)</option>
                    <option value="consultation">आचार्य लाइव वीडियो परामर्श (कमीशन: 25%)</option>
                    <option value="gemstone">लैब प्रमाणित रत्न व रुद्राक्ष ऑर्डर (कमीशन: 20%)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                    color: '#000000',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '12px',
                    fontSize: '14px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    marginTop: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <Sparkles size={16} /> सेवा पर्ची एवं टोकन जारी करें
                </button>
              </form>

              {issuedToken && (
                <div style={{
                  marginTop: '16px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid #10B981',
                  borderRadius: '12px',
                  padding: '14px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '12px', color: '#A7F3D0', fontWeight: 700 }}>
                    टोकन सफलता पूर्वक जारी हुआ:
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 900, color: '#FFFFFF', margin: '4px 0' }}>
                    {issuedToken}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '10px' }}>
                    <Link
                      to={`/astrology/kundli`}
                      style={{
                        background: '#10B981',
                        color: '#FFFFFF',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 700,
                        textDecoration: 'none'
                      }}
                    >
                      कुंडली बनाएं →
                    </Link>
                    <Link
                      to={`/track?id=${issuedToken}`}
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        color: '#FFFFFF',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 700,
                        textDecoration: 'none'
                      }}
                    >
                      ट्रैक करें
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Referral Link & Digital Promotion */}
            <div style={{
              background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
              borderRadius: '20px',
              padding: '24px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF', marginBottom: '6px' }}>
                  आपका अनूठा VLE रेफरल लिंक
                </div>
                <p style={{ fontSize: '13px', color: '#94A3B8', marginBottom: '18px' }}>
                  इस लिंक को अपने व्हाट्सएप ग्रुप्स, फेसबुक या केंद्र के क्यूआर कोड पर शेयर करें। इस लिंक से होने वाली हर ऑनलाइन बुकिंग पर आपको स्वतः कमीशन प्राप्त होगा।
                </p>

                <div style={{
                  background: 'rgba(15, 23, 42, 0.8)',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px',
                  marginBottom: '16px'
                }}>
                  <div style={{ fontSize: '13px', color: '#FDE68A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    https://ad-digital.in/astrology?ref={agentProfile.vleId}
                  </div>
                  <button
                    onClick={handleCopy}
                    style={{
                      background: copiedLink ? '#10B981' : '#F59E0B',
                      color: '#000000',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '6px 12px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      flexShrink: 0
                    }}
                  >
                    {copiedLink ? <Check size={14} /> : <Copy size={14} />}
                    {copiedLink ? 'कॉपी हुआ' : 'कॉपी'}
                  </button>
                </div>

                <div style={{
                  background: 'rgba(245, 158, 11, 0.08)',
                  borderRadius: '12px',
                  padding: '14px',
                  border: '1px dashed rgba(245, 158, 11, 0.3)'
                }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#FDE68A', marginBottom: '4px' }}>
                    💰 कमीशन दर सूची (Commission Rate Card):
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px', color: '#CBD5E1', lineHeight: 1.6 }}>
                    <li>डिजिटल जन्म पत्रिका (PDF प्रिंट): <strong>₹100 प्रति कॉपी</strong></li>
                    <li>36 गुण विवाह मिलान रिपोर्ट: <strong>₹150 प्रति रिपोर्ट</strong></li>
                    <li>ज्योतिषी ऑडियो / वीडियो परामर्श: <strong>कुल शुल्क का 25%</strong></li>
                    <li>प्रामाणिक नवरत्न एवं रुद्राक्ष बिक्री: <strong>कुल ऑर्डर का 20%</strong></li>
                  </ul>
                </div>
              </div>

              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#94A3B8' }}>भुगतान चक्र: प्रत्येक सोमवार स्वचालित पेआउट</span>
                <Link
                  to="/astrology/certificate"
                  style={{
                    color: '#F59E0B',
                    fontSize: '12px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  सर्टिफिकेट पोर्टल <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Commissions & Client Ledger */}
      {(activeTab === 'commissions' || activeTab === 'counter') && (
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '18px 24px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF' }}>
                हालिया जारी सेवाएं एवं कमीशन लेज़र
              </div>
              <span style={{ fontSize: '12px', color: '#10B981', fontWeight: 700 }}>
                कुल 4 रिकॉर्ड्स
              </span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: 'rgba(15, 23, 42, 0.7)', color: '#94A3B8', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <th style={{ padding: '12px 20px' }}>टोकन संख्या</th>
                    <th style={{ padding: '12px 20px' }}>ग्राहक का नाम</th>
                    <th style={{ padding: '12px 20px' }}>सेवा</th>
                    <th style={{ padding: '12px 20px' }}>तारीख व समय</th>
                    <th style={{ padding: '12px 20px' }}>अर्जित कमीशन</th>
                    <th style={{ padding: '12px 20px' }}>स्थिति</th>
                  </tr>
                </thead>
                <tbody>
                  {clientHistory.map((row) => (
                    <tr key={row.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      <td style={{ padding: '14px 20px', fontWeight: 700, color: '#FDE68A' }}>
                        <Link to={`/track?id=${row.token}`} style={{ color: 'inherit', textDecoration: 'underline' }}>
                          {row.token}
                        </Link>
                      </td>
                      <td style={{ padding: '14px 20px', fontWeight: 600, color: '#FFFFFF' }}>{row.name}</td>
                      <td style={{ padding: '14px 20px', color: '#CBD5E1' }}>{row.service}</td>
                      <td style={{ padding: '14px 20px', color: '#94A3B8' }}>{row.date}</td>
                      <td style={{ padding: '14px 20px', fontWeight: 800, color: '#10B981' }}>+₹{row.commission}</td>
                      <td style={{ padding: '14px 20px' }}>
                        <span style={{
                          background: 'rgba(16, 185, 129, 0.15)',
                          color: '#A7F3D0',
                          padding: '4px 10px',
                          borderRadius: '999px',
                          fontSize: '11px',
                          fontWeight: 700
                        }}>
                          {row.status}
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

      {/* Tab 3: Marketing Kit */}
      {activeTab === 'marketing' && (
        <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            <div style={{
              background: '#1E293B',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(245, 158, 11, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <Printer size={28} color="#F59E0B" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 8px' }}>
                केंद्र बैनर (Shop Flex Banner)
              </h3>
              <p style={{ fontSize: '13px', color: '#94A3B8', marginBottom: '16px' }}>
                "यहाँ वेदोक्त जन्म पत्रिका, कुंडली मिलान एवं ज्योतिष परामर्श उपलब्ध है" - 6x3 फ़ीट एचडी प्रिंटेबल फ्लेक्स डिज़ाइन।
              </p>
              <button
                onClick={() => alert('केंद्र बैनर पीडीएफ डाउनलोड प्रारंभ हो रहा है...')}
                style={{
                  background: '#F59E0B',
                  color: '#000000',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 18px',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Download size={15} /> बैनर PDF डाउनलोड करें
              </button>
            </div>

            <div style={{
              background: '#1E293B',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(59, 130, 246, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <QrCode size={28} color="#3B82F6" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 8px' }}>
                काउंटर स्टैंडी QR कोड
              </h3>
              <p style={{ fontSize: '13px', color: '#94A3B8', marginBottom: '16px' }}>
                अपने काउंटर पर रखने योग्य स्टैंडी क्यूआर कोड। ग्राहक स्कैन करके स्वतः आपके रेफरल से सेवा प्राप्त कर सकेंगे।
              </p>
              <button
                onClick={() => alert('काउंटर स्टैंडी QR कोड डाउनलोड हो रहा है...')}
                style={{
                  background: '#3B82F6',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 18px',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Download size={15} /> स्टैंडी QR डाउनलोड करें
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
