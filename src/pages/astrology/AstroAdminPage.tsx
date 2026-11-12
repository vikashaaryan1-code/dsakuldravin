import React, { useState } from 'react';
import { AstroHeaderNav } from '../../components/astrology/AstroHeaderNav';
import { VERIFIED_ASTROLOGERS, ASTRO_STORE_PRODUCTS, ASTRO_BLOG_POSTS } from '../../data/astrologyData';
import { AstrologerProfile } from '../../types/astrology';
import { 
  ShieldAlert, 
  Users, 
  Calendar, 
  ShoppingBag, 
  BookOpen, 
  Award, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Edit3, 
  Trash2, 
  Plus, 
  Printer,
  TrendingUp,
  DollarSign
} from 'lucide-react';

interface MockAppointment {
  id: string;
  userName: string;
  userPhone: string;
  astrologerName: string;
  date: string;
  timeSlot: string;
  mode: 'video' | 'audio' | 'chat';
  topic: string;
  amount: number;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
}

export const AstroAdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'appointments' | 'astrologers' | 'orders' | 'cms'>('appointments');
  const [astrologersList, setAstrologersList] = useState<AstrologerProfile[]>(VERIFIED_ASTROLOGERS);

  // Mock appointments state
  const [appointments, setAppointments] = useState<MockAppointment[]>([
    {
      id: 'ASTRO-984210',
      userName: 'विकास चतुर्वेदी',
      userPhone: '9876543210',
      astrologerName: 'आचार्य देवेन्द्र शास्त्री',
      date: '2026-09-22',
      timeSlot: '11:00 AM',
      mode: 'video',
      topic: 'करियर एवं व्यापार पदोन्नति',
      amount: 525,
      status: 'Confirmed'
    },
    {
      id: 'ASTRO-741258',
      userName: 'स्नेहलता सिंह',
      userPhone: '9812345678',
      astrologerName: 'डॉ. गायत्री देवी',
      date: '2026-09-22',
      timeSlot: '02:30 PM',
      mode: 'audio',
      topic: '36 गुण कुंडली मिलान व विवाह योग',
      amount: 450,
      status: 'Pending'
    },
    {
      id: 'ASTRO-652314',
      userName: 'अमित कुमार',
      userPhone: '9456123789',
      astrologerName: 'पं. राजेश्वर शर्मा',
      date: '2026-09-21',
      timeSlot: '04:00 PM',
      mode: 'chat',
      topic: 'कालसर्प दोष निवारण उपाय',
      amount: 420,
      status: 'Completed'
    },
    {
      id: 'ASTRO-332145',
      userName: 'पूजा मिश्रा',
      userPhone: '9785412365',
      astrologerName: 'टैरो अनन्य सेन',
      date: '2026-09-22',
      timeSlot: '06:00 PM',
      mode: 'video',
      topic: 'प्रेम संबंध एवं दांपत्य सुख',
      amount: 420,
      status: 'Confirmed'
    }
  ]);

  // CMS new post state
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogCategory, setNewBlogCategory] = useState('Planetary Transits');
  const [newBlogExcerpt, setNewBlogExcerpt] = useState('');
  const [cmsMessage, setCmsMessage] = useState('');

  const handleToggleOnline = (id: string) => {
    setAstrologersList(prev => 
      prev.map(a => a.id === id ? { ...a, isOnline: !a.isOnline } : a)
    );
  };

  const handleUpdateStatus = (appId: string, newStatus: MockAppointment['status']) => {
    setAppointments(prev => 
      prev.map(a => a.id === appId ? { ...a, status: newStatus } : a)
    );
  };

  const handleCreateBlogPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlogTitle.trim()) return;
    setCmsMessage('नया ज्योतिषीय आलेख सफलतापूर्वक प्रकाशित कर दिया गया है!');
    setNewBlogTitle('');
    setNewBlogExcerpt('');
    setTimeout(() => setCmsMessage(''), 4000);
  };

  return (
    <div style={{ background: '#031126', color: '#F8FAFC', minHeight: '100vh', paddingBottom: '80px' }}>
      <AstroHeaderNav />

      {/* Header Banner */}
      <div style={{
        background: 'radial-gradient(ellipse at top, #1E1B4B 0%, #0F172A 70%)',
        padding: '36px 16px',
        borderBottom: '1px solid rgba(245, 158, 11, 0.2)'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#FDE68A', background: 'rgba(245, 158, 11, 0.15)', padding: '3px 12px', borderRadius: '999px', fontSize: '11px', fontWeight: 600, marginBottom: '8px' }}>
              <ShieldAlert size={13} color="#F59E0B" /> व्यवस्थापक नियंत्रण कक्ष (Astro Administration)
            </div>
            <h1 style={{ fontSize: '26px', color: '#FDE68A', margin: 0, fontWeight: 800 }}>
              ज्योतिष महामंच एडमिन डैशबोर्ड
            </h1>
            <p style={{ color: '#94A3B8', fontSize: '13px', margin: '4px 0 0' }}>
              परामर्श बुकिंग्स, ज्योतिषी प्रोफाइल, स्टोर ऑर्डर्स एवं कंटेंट का लाइव प्रबंधन।
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#A7F3D0',
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 700
            }}>
              ● सिस्टम सक्रिय (Online)
            </span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1240px', margin: '24px auto 0', padding: '0 16px' }}>
        
        {/* 4 Core Metrics Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '28px'
        }}>
          <div style={{ background: '#1E293B', borderRadius: '16px', padding: '18px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94A3B8', fontSize: '12px', marginBottom: '6px' }}>
              <span>कुल पंजीकृत जातक</span>
              <Users size={18} color="#3B82F6" />
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#FFFFFF' }}>18,450+</div>
            <div style={{ fontSize: '11px', color: '#10B981', marginTop: '4px' }}>↑ इस माह +1,240 नए उपयोगकर्ता</div>
          </div>

          <div style={{ background: '#1E293B', borderRadius: '16px', padding: '18px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94A3B8', fontSize: '12px', marginBottom: '6px' }}>
              <span>सक्रिय परामर्श सत्र</span>
              <Calendar size={18} color="#F59E0B" />
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#FDE68A' }}>42 सत्र</div>
            <div style={{ fontSize: '11px', color: '#A7F3D0', marginTop: '4px' }}>98.4% समय पर पूर्ण</div>
          </div>

          <div style={{ background: '#1E293B', borderRadius: '16px', padding: '18px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94A3B8', fontSize: '12px', marginBottom: '6px' }}>
              <span>स्टोर सकल राजस्व</span>
              <DollarSign size={18} color="#10B981" />
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#FFFFFF' }}>₹3,84,200</div>
            <div style={{ fontSize: '11px', color: '#10B981', marginTop: '4px' }}>↑ पिछले माह से +18% वृद्धि</div>
          </div>

          <div style={{ background: '#1E293B', borderRadius: '16px', padding: '18px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94A3B8', fontSize: '12px', marginBottom: '6px' }}>
              <span>जनरेट की गई कुंडलियां</span>
              <Award size={18} color="#C084FC" />
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#FFFFFF' }}>1,24,500+</div>
            <div style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '4px' }}>100% सटीक वैदिक गणना</div>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px', marginBottom: '24px', overflowX: 'auto' }}>
          {[
            { id: 'appointments', label: `परामर्श अपॉइंटमेंट्स (${appointments.length})` },
            { id: 'astrologers', label: `ज्योतिषी प्रबंधन (${astrologersList.length})` },
            { id: 'orders', label: 'एस्ट्रो स्टोर ऑर्डर्स' },
            { id: 'cms', label: 'सामग्री एवं ब्लॉग सीएमएस' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '9px 18px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                background: activeTab === tab.id ? '#D97706' : 'rgba(255,255,255,0.05)',
                color: '#FFFFFF',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Appointments Manager */}
        {activeTab === 'appointments' && (
          <div style={{
            background: '#1E293B',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            overflowX: 'auto'
          }}>
            <h3 style={{ margin: '0 0 16px', fontSize: '17px', color: '#FDE68A', fontWeight: 700 }}>
              परामर्श बुकिंग्स सूची
            </h3>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(245, 158, 11, 0.3)', color: '#FDE68A' }}>
                  <th style={{ padding: '10px' }}>टोकन आईडी</th>
                  <th style={{ padding: '10px' }}>जातक का नाम</th>
                  <th style={{ padding: '10px' }}>ज्योतिषी</th>
                  <th style={{ padding: '10px' }}>समय व माध्यम</th>
                  <th style={{ padding: '10px' }}>विषय</th>
                  <th style={{ padding: '10px' }}>शुल्क</th>
                  <th style={{ padding: '10px' }}>स्थिति</th>
                  <th style={{ padding: '10px', textAlign: 'right' }}>कार्रवाई</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((app) => (
                  <tr key={app.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '12px 10px', fontWeight: 700, color: '#F59E0B' }}>{app.id}</td>
                    <td style={{ padding: '12px 10px' }}>
                      <div style={{ fontWeight: 600, color: '#FFFFFF' }}>{app.userName}</div>
                      <div style={{ fontSize: '11px', color: '#94A3B8' }}>{app.userPhone}</div>
                    </td>
                    <td style={{ padding: '12px 10px' }}>{app.astrologerName}</td>
                    <td style={{ padding: '12px 10px' }}>
                      <div>{app.date} ({app.timeSlot})</div>
                      <div style={{ fontSize: '11px', color: '#A7F3D0' }}>
                        {app.mode === 'video' ? 'वीडियो कॉल' : app.mode === 'audio' ? 'ऑडियो कॉल' : 'चैट'}
                      </div>
                    </td>
                    <td style={{ padding: '12px 10px', maxWidth: '180px', fontSize: '12px', color: '#CBD5E1' }}>{app.topic}</td>
                    <td style={{ padding: '12px 10px', fontWeight: 700 }}>₹{app.amount}</td>
                    <td style={{ padding: '12px 10px' }}>
                      <span style={{
                        fontSize: '11px',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontWeight: 600,
                        background: app.status === 'Confirmed' ? 'rgba(16, 185, 129, 0.2)' : app.status === 'Pending' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255,255,255,0.1)',
                        color: app.status === 'Confirmed' ? '#10B981' : app.status === 'Pending' ? '#F59E0B' : '#CBD5E1'
                      }}>
                        {app.status === 'Confirmed' ? 'स्वीकृत' : app.status === 'Pending' ? 'प्रतीक्षारत' : 'संपन्न'}
                      </span>
                    </td>
                    <td style={{ padding: '12px 10px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                        {app.status === 'Pending' && (
                          <button
                            onClick={() => handleUpdateStatus(app.id, 'Confirmed')}
                            style={{ background: '#059669', color: '#FFFFFF', border: 'none', padding: '4px 10px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}
                          >
                            स्वीकारें
                          </button>
                        )}
                        {app.status === 'Confirmed' && (
                          <button
                            onClick={() => handleUpdateStatus(app.id, 'Completed')}
                            style={{ background: '#3B82F6', color: '#FFFFFF', border: 'none', padding: '4px 10px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}
                          >
                            पूर्ण चिन्हित करें
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Astrologers Manager */}
        {activeTab === 'astrologers' && (
          <div style={{
            background: '#1E293B',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <h3 style={{ margin: '0 0 16px', fontSize: '17px', color: '#FDE68A', fontWeight: 700 }}>
              पंजीकृत ज्योतिषी एवं स्थिति नियंत्रण
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {astrologersList.map((astro) => (
                <div
                  key={astro.id}
                  style={{
                    background: '#0F172A',
                    borderRadius: '12px',
                    padding: '14px 18px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '14px',
                    border: '1px solid rgba(255, 255, 255, 0.06)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={astro.avatarUrl}
                      alt={astro.nameHi}
                      style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <h4 style={{ margin: 0, fontSize: '15px', color: '#FFFFFF', fontWeight: 700 }}>
                        {astro.nameHi} ({astro.nameEn})
                      </h4>
                      <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#94A3B8' }}>
                        {astro.titleHi} | {astro.experienceYears}+ वर्ष अनुभव
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ fontSize: '12px', textAlign: 'right' }}>
                      <div>चैट: <strong style={{ color: '#FDE68A' }}>₹{astro.chatRatePerMin}/मि</strong></div>
                      <div>कॉल: <strong style={{ color: '#FDE68A' }}>₹{astro.callRatePerMin}/मि</strong></div>
                    </div>

                    <button
                      onClick={() => handleToggleOnline(astro.id)}
                      style={{
                        background: astro.isOnline ? '#059669' : '#64748B',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '6px 14px',
                        borderRadius: '999px',
                        fontSize: '11px',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {astro.isOnline ? '● ऑनलाइन (Active)' : '○ ऑफलाइन'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Store Orders */}
        {activeTab === 'orders' && (
          <div style={{
            background: '#1E293B',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <h3 style={{ margin: '0 0 16px', fontSize: '17px', color: '#FDE68A', fontWeight: 700 }}>
              हाल के ई-स्टोर ऑर्डर्स
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { id: 'ASTRO-ORD-918231', item: 'प्राकृतिक लैब प्रमाणित बर्मी माणिक्य (Ruby)', customer: 'मनोज कुमार, लखनऊ', amount: 8500, status: 'प्रेषित (Dispatched)' },
                { id: 'ASTRO-ORD-845120', item: 'सिद्ध 3D मेरु श्रीयंत्र (स्वर्ण पालिश)', customer: 'सुनीता त्रिपाठी, दिल्ली', amount: 2600, status: 'प्राण-प्रतिष्ठा जारी' },
                { id: 'ASTRO-ORD-712490', item: 'संपूर्ण जीवन फलित जन्म कुंडली रिपोर्ट (50+ पृष्ठ PDF)', customer: 'अजय शर्मा, जयपुर', amount: 999, status: 'वितरित (Email Delivered)' }
              ].map((ord) => (
                <div
                  key={ord.id}
                  style={{
                    background: '#0F172A',
                    borderRadius: '10px',
                    padding: '14px 18px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px',
                    border: '1px solid rgba(255,255,255,0.06)'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '12px', color: '#F59E0B', fontWeight: 700 }}>{ord.id}</span>
                    <h5 style={{ margin: '2px 0', fontSize: '14px', color: '#FFFFFF' }}>{ord.item}</h5>
                    <div style={{ fontSize: '11px', color: '#94A3B8' }}>ग्राहक: {ord.customer}</div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '16px', fontWeight: 800, color: '#FDE68A' }}>₹{ord.amount}</div>
                    <span style={{ fontSize: '11px', color: '#A7F3D0' }}>{ord.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Content & Blog CMS */}
        {activeTab === 'cms' && (
          <div style={{
            background: '#1E293B',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <h3 style={{ margin: '0 0 16px', fontSize: '17px', color: '#FDE68A', fontWeight: 700 }}>
              नया ज्योतिषीय आलेख प्रकाशित करें (CMS)
            </h3>

            {cmsMessage && (
              <div style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10B981', color: '#A7F3D0', padding: '10px 14px', borderRadius: '8px', marginBottom: '16px', fontSize: '13px' }}>
                ✓ {cmsMessage}
              </div>
            )}

            <form onSubmit={handleCreateBlogPost} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E1', marginBottom: '4px' }}>
                  आलेख का शीर्षक (Article Title):
                </label>
                <input
                  type="text"
                  required
                  placeholder="उदा. गुरु का वृषभ राशि में महागोचर: जानिए किन 5 राशियों का होगा भाग्योदय"
                  value={newBlogTitle}
                  onChange={(e) => setNewBlogTitle(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#0F172A',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: '#FFFFFF',
                    fontSize: '13px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E1', marginBottom: '4px' }}>
                  श्रेणी (Category):
                </label>
                <select
                  value={newBlogCategory}
                  onChange={(e) => setNewBlogCategory(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#0F172A',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    padding: '10px',
                    color: '#FFFFFF',
                    fontSize: '13px'
                  }}
                >
                  <option value="Planetary Transits">ग्रह गोचर (Planetary Transits)</option>
                  <option value="Kundli Yogas">कुंडली योग (Kundli Yogas)</option>
                  <option value="Gemology">रत्न विज्ञान (Gemology)</option>
                  <option value="Vastu Shastra">वास्तु शास्त्र (Vastu Shastra)</option>
                  <option value="Festivals & Vrats">पर्व-त्यौहार (Festivals & Vrats)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E1', marginBottom: '4px' }}>
                  संक्षिप्त सारांश (Excerpt):
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="आलेख का मुख्य सारांश जो पाठकों को आकर्षित करे..."
                  value={newBlogExcerpt}
                  onChange={(e) => setNewBlogExcerpt(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#0F172A',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    padding: '10px',
                    color: '#FFFFFF',
                    fontSize: '13px',
                    resize: 'none'
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  alignSelf: 'flex-start',
                  background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '10px 24px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                आलेख प्रकाशित करें
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
