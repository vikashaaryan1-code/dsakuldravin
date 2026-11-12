import React, { useState } from 'react';
import { AstroHeaderNav } from '../../components/astrology/AstroHeaderNav';
import { RASHI_HOROSCOPES } from '../../data/astrologyData';
import { ZODIAC_SIGNS } from '../../utils/astrologyCalculators';
import { Sun, Calendar, Sparkles, Clock, Compass, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const RashifalPage: React.FC = () => {
  const [selectedSignKey, setSelectedSignKey] = useState<string>('aries');
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const activeSign = ZODIAC_SIGNS.find(s => s.key === selectedSignKey) || ZODIAC_SIGNS[0];
  const activeHoroscope = RASHI_HOROSCOPES[selectedSignKey] || RASHI_HOROSCOPES['aries'];

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
            <Sun size={14} color="#F59E0B" /> दैनिक, साप्ताहिक एवं मासिक ग्रह गोचर फलित
          </div>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', color: '#FDE68A', margin: '0 0 8px', fontWeight: 800 }}>
            संपूर्ण 12 राशियों का राशिफल (Horoscope)
          </h1>
          <p style={{ color: '#CBD5E1', fontSize: '14px', margin: 0 }}>
            अपनी राशि चुनें और जानें आज के ग्रह आपके भाग्य, आजीविका और संबंधों को कैसे प्रभावित कर रहे हैं।
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1240px', margin: '30px auto 0', padding: '0 16px' }}>
        {/* 12 Zodiac Pills Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(92px, 1fr))',
          gap: '10px',
          marginBottom: '28px'
        }}>
          {ZODIAC_SIGNS.map((sign) => (
            <button
              key={sign.key}
              onClick={() => setSelectedSignKey(sign.key)}
              style={{
                background: selectedSignKey === sign.key 
                  ? 'linear-gradient(135deg, #D97706 0%, #B45309 100%)' 
                  : '#1E293B',
                border: selectedSignKey === sign.key 
                  ? '1px solid #F59E0B' 
                  : '1px solid rgba(255, 255, 255, 0.08)',
                color: '#FFFFFF',
                borderRadius: '14px',
                padding: '12px 6px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: selectedSignKey === sign.key ? '0 6px 20px rgba(217, 119, 6, 0.4)' : 'none'
              }}
            >
              <span style={{ fontSize: '24px' }}>{sign.symbol}</span>
              <span style={{ fontSize: '13px', fontWeight: 700 }}>{sign.nameHi}</span>
              <span style={{ fontSize: '10px', color: selectedSignKey === sign.key ? '#FEF3C7' : '#94A3B8' }}>{sign.nameEn}</span>
            </button>
          ))}
        </div>

        {/* Timeframe Switcher Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
          {[
            { id: 'daily', label: 'आज का राशिफल (Daily)' },
            { id: 'weekly', label: 'साप्ताहिक राशिफल (Weekly)' },
            { id: 'monthly', label: 'मासिक राशिफल (Monthly)' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTimeframe(t.id as any)}
              style={{
                padding: '10px 24px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                background: timeframe === t.id ? '#D97706' : 'rgba(255, 255, 255, 0.06)',
                color: '#FFFFFF',
                boxShadow: timeframe === t.id ? '0 4px 15px rgba(217, 119, 6, 0.35)' : 'none'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Main Horoscope Card */}
        <div style={{
          background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
          borderRadius: '24px',
          padding: '32px',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)'
        }}>
          {/* Active Sign Header */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', gap: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '48px', color: '#F59E0B' }}>{activeSign.symbol}</span>
              <div>
                <h2 style={{ margin: 0, fontSize: '24px', color: '#FDE68A', fontWeight: 800 }}>
                  {activeSign.nameHi} राशि ({activeSign.nameEn})
                </h2>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#94A3B8' }}>
                  स्वामी ग्रह: <strong style={{ color: '#FFFFFF' }}>{activeSign.rulingPlanetHi}</strong> | तत्व: <strong style={{ color: '#FFFFFF' }}>{activeSign.elementHi}</strong> | शुभ रत्न: <strong style={{ color: '#F59E0B' }}>{activeSign.favorableGemHi}</strong>
                </p>
              </div>
            </div>

            {/* Lucky Attributes Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '6px 14px', fontSize: '12px' }}>
                <span style={{ color: '#94A3B8' }}>शुभ रंग:</span> <strong style={{ color: '#FDE68A' }}>{activeHoroscope.daily.luckyColorHi}</strong>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '6px 14px', fontSize: '12px' }}>
                <span style={{ color: '#94A3B8' }}>शुभ अंक:</span> <strong style={{ color: '#FDE68A' }}>{activeHoroscope.daily.luckyNumber}</strong>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '6px 14px', fontSize: '12px' }}>
                <span style={{ color: '#94A3B8' }}>शुभ दिशा:</span> <strong style={{ color: '#FDE68A' }}>{activeHoroscope.daily.luckyDirectionHi}</strong>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '6px 14px', fontSize: '12px' }}>
                <span style={{ color: '#94A3B8' }}>शुभ समय:</span> <strong style={{ color: '#A7F3D0' }}>{activeHoroscope.daily.auspiciousTime}</strong>
              </div>
            </div>
          </div>

          {/* Timeframe Specific Content */}
          {timeframe === 'daily' && (
            <div>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px 20px', borderRadius: '12px', marginBottom: '24px', fontSize: '15px', lineHeight: 1.7, color: '#E2E8F0', borderLeft: '4px solid #F59E0B' }}>
                <strong>दैनिक सिंहावलोकन:</strong> {activeHoroscope.daily.overviewHi}
              </div>

              {/* 4 Pillars Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                <div style={{ background: '#0F172A', borderRadius: '12px', padding: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#F59E0B', marginBottom: '6px' }}>
                    💼 करियर एवं नौकरी
                  </div>
                  <p style={{ margin: 0, fontSize: '13px', color: '#CBD5E1', lineHeight: 1.5 }}>
                    {activeHoroscope.daily.careerHi}
                  </p>
                </div>

                <div style={{ background: '#0F172A', borderRadius: '12px', padding: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#EC4899', marginBottom: '6px' }}>
                    ❤️ प्रेम व दांपत्य जीवन
                  </div>
                  <p style={{ margin: 0, fontSize: '13px', color: '#CBD5E1', lineHeight: 1.5 }}>
                    {activeHoroscope.daily.loveHi}
                  </p>
                </div>

                <div style={{ background: '#0F172A', borderRadius: '12px', padding: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#10B981', marginBottom: '6px' }}>
                    🌿 स्वास्थ्य एवं जीवनशैली
                  </div>
                  <p style={{ margin: 0, fontSize: '13px', color: '#CBD5E1', lineHeight: 1.5 }}>
                    {activeHoroscope.daily.healthHi}
                  </p>
                </div>

                <div style={{ background: '#0F172A', borderRadius: '12px', padding: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#3B82F6', marginBottom: '6px' }}>
                    💰 धन, बचत एवं निवेश
                  </div>
                  <p style={{ margin: 0, fontSize: '13px', color: '#CBD5E1', lineHeight: 1.5 }}>
                    {activeHoroscope.daily.financeHi}
                  </p>
                </div>
              </div>

              {/* Special Daily Remedy Box */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.15) 0%, rgba(180, 83, 9, 0.05) 100%)',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                borderRadius: '14px',
                padding: '18px 22px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
              }}>
                <span style={{ fontSize: '28px' }}>🪔</span>
                <div>
                  <h4 style={{ margin: '0 0 4px', fontSize: '15px', color: '#FDE68A', fontWeight: 700 }}>
                    आज का अचूक वेदोक्त उपाय:
                  </h4>
                  <p style={{ margin: 0, fontSize: '13px', color: '#FFFFFF', lineHeight: 1.5 }}>
                    {activeHoroscope.daily.remedyHi}
                  </p>
                </div>
              </div>
            </div>
          )}

          {timeframe === 'weekly' && (
            <div>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '20px', borderRadius: '12px', marginBottom: '20px', fontSize: '15px', lineHeight: 1.7, color: '#E2E8F0' }}>
                <h4 style={{ margin: '0 0 8px', color: '#FDE68A', fontSize: '16px' }}>सप्ताहिक फलादेश सारांश:</h4>
                <p style={{ margin: 0 }}>{activeHoroscope.weekly.summaryHi}</p>
              </div>

              <div style={{ background: '#0F172A', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <strong style={{ color: '#F59E0B' }}>सप्ताह की विशेष सलाह:</strong> {activeHoroscope.weekly.keyAdviceHi}
              </div>
            </div>
          )}

          {timeframe === 'monthly' && (
            <div>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '20px', borderRadius: '12px', marginBottom: '20px', fontSize: '15px', lineHeight: 1.7, color: '#E2E8F0' }}>
                <h4 style={{ margin: '0 0 8px', color: '#FDE68A', fontSize: '16px' }}>मासिक ग्रह गोचर प्रभाव:</h4>
                <p style={{ margin: 0 }}>{activeHoroscope.monthly.summaryHi}</p>
              </div>

              <div style={{ background: '#0F172A', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <strong style={{ color: '#10B981' }}>मुख्य ग्रह स्थिति:</strong> {activeHoroscope.monthly.planetaryTransitNotesHi}
              </div>
            </div>
          )}

          {/* Quick CTA to Speak with Astrologer */}
          <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ fontSize: '13px', color: '#94A3B8' }}>
              अपनी व्यक्तिगत जन्म कुंडली के आधार पर सूक्ष्म फलादेश जानने के लिए:
            </div>
            <Link
              to="/astrology/astrologers"
              style={{
                background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
                color: '#FFFFFF',
                padding: '10px 20px',
                borderRadius: '999px',
                fontWeight: 700,
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none'
              }}
            >
              ज्योतिषी से व्यक्तिगत सलाह लें <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
