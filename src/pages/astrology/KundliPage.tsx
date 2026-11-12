import React, { useState } from 'react';
import { AstroHeaderNav } from '../../components/astrology/AstroHeaderNav';
import { VedicKundliChart } from '../../components/astrology/VedicKundliChart';
import { KundliPrintCertificate } from '../../components/astrology/KundliPrintCertificate';
import { calculateJanamKundli } from '../../utils/astrologyCalculators';
import { KundliInput, KundliResult } from '../../types/astrology';
import { 
  Compass, 
  Sparkles, 
  Printer, 
  Share2, 
  Award, 
  ShieldCheck, 
  Layers, 
  Star, 
  ChevronRight, 
  HelpCircle,
  Clock,
  MapPin,
  Calendar,
  User
} from 'lucide-react';

export const KundliPage: React.FC = () => {
  const [formData, setFormData] = useState<KundliInput>({
    fullName: 'राहुल शर्मा',
    gender: 'male',
    dob: '1996-05-15',
    birthTime: '06:30',
    birthPlace: 'वाराणसी (Varanasi), उत्तर प्रदेश'
  });

  const [activeTab, setActiveTab] = useState<'chart' | 'planets' | 'dasha' | 'yogas' | 'predictions'>('chart');
  const [kundliResult, setKundliResult] = useState<KundliResult>(() => calculateJanamKundli(formData));
  const [showPrintModal, setShowPrintModal] = useState(false);

  const majorCities = [
    'वाराणसी', 'नई दिल्ली', 'मुंबई', 'उज्जैन', 'हरिद्वार', 'जयपुर', 'कोलकाता', 'बेंगलुरु', 'लखनऊ', 'पटना'
  ];

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const result = calculateJanamKundli(formData);
    setKundliResult(result);
  };

  return (
    <div style={{ background: '#031126', color: '#F8FAFC', minHeight: '100vh', paddingBottom: '80px' }}>
      <AstroHeaderNav />

      {/* Header Banner */}
      <div style={{
        background: 'radial-gradient(ellipse at top, #1E1B4B 0%, #0F172A 70%)',
        padding: '40px 16px',
        borderBottom: '1px solid rgba(245, 158, 11, 0.2)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#FDE68A', background: 'rgba(245, 158, 11, 0.15)', padding: '4px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, marginBottom: '12px' }}>
            <Sparkles size={14} /> वेदोक्त पराशर पद्धति द्वारा संचालित
          </div>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', color: '#FDE68A', margin: '0 0 8px', fontWeight: 800 }}>
            मुफ़्त जन्म कुंडली निर्माण एवं फलित विश्लेषण
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '14px', margin: 0 }}>
            अपनी जन्म तिथि, समय व स्थान दर्ज करें और उत्तर भारतीय लग्न चक्र, नवग्रह स्थिति व विंशोत्तरी महादशा प्राप्त करें।
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1240px', margin: '30px auto 0', padding: '0 16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '30px', alignItems: 'start' }}>
          
          {/* Input Form Column */}
          <div style={{
            background: '#1E293B',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)'
          }}>
            <h3 style={{ margin: '0 0 18px', fontSize: '18px', color: '#FDE68A', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Compass size={18} color="#F59E0B" /> जन्म विवरण दर्ज करें
            </h3>

            <form onSubmit={handleCalculate} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E1', marginBottom: '4px' }}>
                  पूरा नाम:
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      color: '#FFFFFF',
                      fontSize: '13px'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E1', marginBottom: '4px' }}>
                    लिंग:
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
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
                    <option value="male">पुरुष (Male)</option>
                    <option value="female">स्त्री (Female)</option>
                    <option value="other">अन्य (Other)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E1', marginBottom: '4px' }}>
                    जन्म तिथि:
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                      padding: '10px',
                      color: '#FFFFFF',
                      fontSize: '13px'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E1', marginBottom: '4px' }}>
                  जन्म का सटीक समय (घंटा:मिनट):
                </label>
                <input
                  type="time"
                  required
                  value={formData.birthTime}
                  onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'rgba(15, 23, 42, 0.8)',
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
                  जन्म स्थान (शहर / राज्य):
                </label>
                <input
                  type="text"
                  required
                  value={formData.birthPlace}
                  onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                  style={{
                    width: '100%',
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: '#FFFFFF',
                    fontSize: '13px'
                  }}
                />
                
                {/* Quick cities pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                  {majorCities.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setFormData({ ...formData, birthPlace: `${c}, भारत` })}
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#94A3B8',
                        fontSize: '11px',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                style={{
                  marginTop: '10px',
                  background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 15px rgba(217, 119, 6, 0.4)'
                }}
              >
                <Sparkles size={16} /> कुण्डली बनाएं एवं गणना करें
              </button>
            </form>
          </div>

          {/* Kundli Output Column */}
          <div>
            {/* Quick Astrological Metrics Bar */}
            <div style={{
              background: '#1E293B',
              borderRadius: '16px',
              padding: '16px 20px',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '12px',
              marginBottom: '20px'
            }}>
              <div>
                <span style={{ fontSize: '11px', color: '#94A3B8' }}>लग्न राशि:</span>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#FDE68A' }}>
                  {kundliResult.lagnaRashi.nameHi}
                </div>
                <div style={{ fontSize: '10px', color: '#CBD5E1' }}>स्वामी: {kundliResult.lagnaRashi.rulingPlanetHi}</div>
              </div>

              <div>
                <span style={{ fontSize: '11px', color: '#94A3B8' }}>चन्द्र राशि:</span>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#FDE68A' }}>
                  {kundliResult.moonRashi.nameHi}
                </div>
                <div style={{ fontSize: '10px', color: '#CBD5E1' }}>तत्व: {kundliResult.moonRashi.elementHi}</div>
              </div>

              <div>
                <span style={{ fontSize: '11px', color: '#94A3B8' }}>जन्म नक्षत्र:</span>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#FFFFFF' }}>
                  {kundliResult.birthNakshatraHi}
                </div>
                <div style={{ fontSize: '10px', color: '#A7F3D0' }}>पाद: {kundliResult.nakshatraPada}</div>
              </div>

              <div>
                <span style={{ fontSize: '11px', color: '#94A3B8' }}>वर्ण / गण / नाड़ी:</span>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#FCD34D' }}>
                  {kundliResult.varnaHi} | {kundliResult.ganaHi}
                </div>
                <div style={{ fontSize: '10px', color: '#CBD5E1' }}>नाड़ी: {kundliResult.nadiHi}</div>
              </div>
            </div>

            {/* Tabbed Explorer Navigation */}
            <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px', marginBottom: '16px', overflowX: 'auto' }}>
              {[
                { id: 'chart', label: 'लग्न चक्र (Chart)' },
                { id: 'planets', label: 'ग्रह स्थिति (Planets)' },
                { id: 'dasha', label: 'विंशोत्तरी दशा (Dasha)' },
                { id: 'yogas', label: 'शुभ योग (Yogas)' },
                { id: 'predictions', label: 'फलादेश व उपाय (Remedies)' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: activeTab === tab.id ? '#D97706' : 'rgba(255,255,255,0.05)',
                    color: '#FFFFFF',
                    border: 'none',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'chart' && (
              <div>
                <VedicKundliChart
                  houses={kundliResult.houses}
                  lagnaSignName={kundliResult.lagnaRashi.nameHi}
                  nativeName={kundliResult.input.fullName}
                />
              </div>
            )}

            {activeTab === 'planets' && (
              <div style={{
                background: '#1E293B',
                borderRadius: '16px',
                padding: '20px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                overflowX: 'auto'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(245, 158, 11, 0.3)', color: '#FDE68A', textAlign: 'left' }}>
                      <th style={{ padding: '8px' }}>ग्रह</th>
                      <th style={{ padding: '8px' }}>राशि</th>
                      <th style={{ padding: '8px' }}>भाव</th>
                      <th style={{ padding: '8px' }}>अंश (Degrees)</th>
                      <th style={{ padding: '8px' }}>नक्षत्र</th>
                      <th style={{ padding: '8px' }}>अवस्था</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kundliResult.planets.map((p, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '10px 8px', fontWeight: 700, color: '#FDE68A' }}>{p.nameHi} ({p.nameEn})</td>
                        <td style={{ padding: '10px 8px' }}>{p.rashiNameHi}</td>
                        <td style={{ padding: '10px 8px', textAlign: 'center', fontWeight: 'bold' }}>{p.house}</td>
                        <td style={{ padding: '10px 8px', color: '#94A3B8' }}>{p.degreeStr}</td>
                        <td style={{ padding: '10px 8px' }}>{p.nakshatraHi} ({p.pada})</td>
                        <td style={{ padding: '10px 8px' }}>
                          <span style={{
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontSize: '11px',
                            background: p.status === 'Exalted' ? 'rgba(16, 185, 129, 0.2)' : p.status === 'Debilitated' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.1)',
                            color: p.status === 'Exalted' ? '#10B981' : p.status === 'Debilitated' ? '#EF4444' : '#E2E8F0'
                          }}>
                            {p.statusHi} {p.isRetrograde ? '(वक्री)' : ''}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'dasha' && (
              <div style={{
                background: '#1E293B',
                borderRadius: '16px',
                padding: '20px',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                <div style={{ background: 'rgba(245, 158, 11, 0.15)', padding: '12px 16px', borderRadius: '10px', marginBottom: '16px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                  <div style={{ fontSize: '12px', color: '#FDE68A' }}>वर्तमान सक्रिय महादशा:</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', marginTop: '2px' }}>
                    {kundliResult.currentDasha.planetHi} महादशा ({kundliResult.currentDasha.years} वर्ष)
                  </div>
                  <div style={{ fontSize: '12px', color: '#CBD5E1' }}>
                    अवधि: {kundliResult.currentDasha.startDate} से {kundliResult.currentDasha.endDate}
                  </div>
                </div>

                <div style={{ fontSize: '13px', fontWeight: 700, color: '#94A3B8', marginBottom: '8px' }}>
                  विंशोत्तरी महादशा चक्र (120 वर्ष):
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {kundliResult.dashaSequence.map((d, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        background: d.isCurrent ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255,255,255,0.03)',
                        border: d.isCurrent ? '1px solid #F59E0B' : '1px solid rgba(255,255,255,0.05)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontWeight: 700, color: d.isCurrent ? '#FDE68A' : '#FFFFFF' }}>
                          {d.planetHi} की महादशा
                        </span>
                        {d.isCurrent && (
                          <span style={{ fontSize: '10px', background: '#D97706', color: '#FFFFFF', padding: '2px 6px', borderRadius: '4px' }}>
                            सक्रिय
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '12px', color: '#94A3B8' }}>
                        {d.startDate.split('-')[0]} - {d.endDate.split('-')[0]} ({d.years} वर्ष)
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'yogas' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {kundliResult.yogas.map((yoga, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: '#1E293B',
                      borderRadius: '14px',
                      padding: '18px',
                      border: '1px solid rgba(245, 158, 11, 0.3)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <h4 style={{ margin: 0, fontSize: '16px', color: '#FDE68A', fontWeight: 700 }}>
                        {yoga.nameHi}
                      </h4>
                      <span style={{ fontSize: '11px', background: 'rgba(16, 185, 129, 0.2)', color: '#A7F3D0', padding: '2px 8px', borderRadius: '4px' }}>
                        {yoga.typeHi}
                      </span>
                    </div>
                    <p style={{ margin: '0 0 8px', fontSize: '13px', color: '#CBD5E1', lineHeight: 1.5 }}>
                      {yoga.descriptionHi}
                    </p>
                    <div style={{ fontSize: '12px', color: '#10B981', background: 'rgba(16, 185, 129, 0.08)', padding: '8px 12px', borderRadius: '6px' }}>
                      <strong>शुभ प्रभाव:</strong> {yoga.favorableEffectHi}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'predictions' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ background: '#1E293B', padding: '16px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#F59E0B', marginBottom: '4px' }}>
                    🌟 व्यक्तित्व एवं स्वाभाविक प्रकृति
                  </div>
                  <p style={{ margin: 0, fontSize: '13px', color: '#E2E8F0', lineHeight: 1.6 }}>
                    {kundliResult.generalPredictions.personalityHi}
                  </p>
                </div>

                <div style={{ background: '#1E293B', padding: '16px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#3B82F6', marginBottom: '4px' }}>
                    💼 आजीविका, नौकरी एवं व्यापार योग
                  </div>
                  <p style={{ margin: 0, fontSize: '13px', color: '#E2E8F0', lineHeight: 1.6 }}>
                    {kundliResult.generalPredictions.careerHi}
                  </p>
                </div>

                <div style={{ background: '#1E293B', padding: '16px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#EC4899', marginBottom: '4px' }}>
                    💍 दांपत्य सुख एवं जीवनसाथी
                  </div>
                  <p style={{ margin: 0, fontSize: '13px', color: '#E2E8F0', lineHeight: 1.6 }}>
                    {kundliResult.generalPredictions.marriageHi}
                  </p>
                </div>

                {/* Vedic Remedies */}
                <div style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, #0F172A 100%)', padding: '20px', borderRadius: '14px', border: '1px solid rgba(245, 158, 11, 0.4)' }}>
                  <h4 style={{ margin: '0 0 12px', fontSize: '16px', color: '#FDE68A', fontWeight: 700 }}>
                    🙏 वेदोक्त शुभ रत्न एवं कल्याणकारी उपाय
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', fontSize: '12px' }}>
                    <div><strong>शुभ रत्न:</strong> <span style={{ color: '#FDE68A' }}>{kundliResult.remedies.gemstoneHi}</span></div>
                    <div><strong>शुभ रुद्राक्ष:</strong> <span style={{ color: '#FDE68A' }}>{kundliResult.remedies.rudrakshaHi}</span></div>
                    <div><strong>व्रत का दिन:</strong> <span style={{ color: '#FDE68A' }}>{kundliResult.remedies.fastingDayHi}</span></div>
                    <div><strong>कल्याणकारी मंत्र:</strong> <span style={{ color: '#A7F3D0' }}>{kundliResult.remedies.mantra}</span></div>
                  </div>
                </div>
              </div>
            )}

            {/* Print Certificate Action Button */}
            <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowPrintModal(true)}
                style={{
                  flex: 1,
                  background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 15px rgba(217, 119, 6, 0.35)'
                }}
              >
                <Printer size={16} /> संपूर्ण जन्म पत्रिका प्रमाण-पत्र प्रिंट करें
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Print Certificate Modal */}
      {showPrintModal && (
        <KundliPrintCertificate
          kundli={kundliResult}
          onClose={() => setShowPrintModal(false)}
        />
      )}
    </div>
  );
};
