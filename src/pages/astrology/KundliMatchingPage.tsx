import React, { useState } from 'react';
import { AstroHeaderNav } from '../../components/astrology/AstroHeaderNav';
import { calculateKundliMatching, ZODIAC_SIGNS, NAKSHATRAS } from '../../utils/astrologyCalculators';
import { MatchingResult } from '../../types/astrology';
import { Heart, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight, User } from 'lucide-react';

export const KundliMatchingPage: React.FC = () => {
  const [groomName, setGroomName] = useState('रोहन वर्मा');
  const [groomRashiIdx, setGroomRashiIdx] = useState(0); // Aries
  const [groomNakIdx, setGroomNakIdx] = useState(0); // Ashwini

  const [brideName, setBrideName] = useState('प्रिया शर्मा');
  const [brideRashiIdx, setBrideRashiIdx] = useState(4); // Leo
  const [brideNakIdx, setBrideNakIdx] = useState(9); // Magha

  const [matchResult, setMatchResult] = useState<MatchingResult>(() =>
    calculateKundliMatching(groomName, groomRashiIdx, groomNakIdx, brideName, brideRashiIdx, brideNakIdx)
  );

  const handleCalculateMatch = (e: React.FormEvent) => {
    e.preventDefault();
    const res = calculateKundliMatching(groomName, groomRashiIdx, groomNakIdx, brideName, brideRashiIdx, brideNakIdx);
    setMatchResult(res);
  };

  return (
    <div style={{ background: '#031126', color: '#F8FAFC', minHeight: '100vh', paddingBottom: '80px' }}>
      <AstroHeaderNav />

      {/* Header Banner */}
      <div style={{
        background: 'radial-gradient(ellipse at top, #311042 0%, #0F172A 70%)',
        padding: '40px 16px',
        borderBottom: '1px solid rgba(245, 158, 11, 0.2)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#FDE68A', background: 'rgba(245, 158, 11, 0.15)', padding: '4px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, marginBottom: '12px' }}>
            <Heart size={14} color="#F472B6" /> वेदोक्त अष्टकूट मिलान पद्धति
          </div>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', color: '#FDE68A', margin: '0 0 8px', fontWeight: 800 }}>
            36 गुण कुण्डली मिलान (Kundli Milan)
          </h1>
          <p style={{ color: '#CBD5E1', fontSize: '14px', margin: 0 }}>
            वर और वधू के 8 कूटों (वर्ण से नाड़ी तक) का सूक्ष्म विश्लेषण, मांगलिक दोष जांच एवं दांपत्य सुख फलित।
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1240px', margin: '30px auto 0', padding: '0 16px' }}>
        {/* Input Forms: Groom & Bride Grid */}
        <form onSubmit={handleCalculateMatch}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '24px' }}>
            {/* Groom Box */}
            <div style={{
              background: '#1E293B',
              borderRadius: '20px',
              padding: '20px',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              boxShadow: '0 10px 25px rgba(0,0,0,0.4)'
            }}>
              <h3 style={{ margin: '0 0 16px', fontSize: '16px', color: '#93C5FD', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={18} /> वर का विवरण (Groom Details)
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E1', marginBottom: '4px' }}>
                    वर का नाम:
                  </label>
                  <input
                    type="text"
                    required
                    value={groomName}
                    onChange={(e) => setGroomName(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: '#FFFFFF',
                      fontSize: '13px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E1', marginBottom: '4px' }}>
                    वर की राशि (Moon Sign):
                  </label>
                  <select
                    value={groomRashiIdx}
                    onChange={(e) => setGroomRashiIdx(parseInt(e.target.value, 10))}
                    style={{
                      width: '100%',
                      background: '#0F172A',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: '#FFFFFF',
                      fontSize: '13px'
                    }}
                  >
                    {ZODIAC_SIGNS.map((s, idx) => (
                      <option key={s.key} value={idx}>
                        {s.symbol} {s.nameHi} ({s.nameEn}) - स्वामी: {s.rulingPlanetHi}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E1', marginBottom: '4px' }}>
                    वर का जन्म नक्षत्र:
                  </label>
                  <select
                    value={groomNakIdx}
                    onChange={(e) => setGroomNakIdx(parseInt(e.target.value, 10))}
                    style={{
                      width: '100%',
                      background: '#0F172A',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: '#FFFFFF',
                      fontSize: '13px'
                    }}
                  >
                    {NAKSHATRAS.map((n, idx) => (
                      <option key={idx} value={idx}>
                        {idx + 1}. {n.nameHi} ({n.name}) - स्वामी: {n.lordHi}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Bride Box */}
            <div style={{
              background: '#1E293B',
              borderRadius: '20px',
              padding: '20px',
              border: '1px solid rgba(244, 114, 182, 0.3)',
              boxShadow: '0 10px 25px rgba(0,0,0,0.4)'
            }}>
              <h3 style={{ margin: '0 0 16px', fontSize: '16px', color: '#F472B6', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={18} /> वधू का विवरण (Bride Details)
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E1', marginBottom: '4px' }}>
                    वधू का नाम:
                  </label>
                  <input
                    type="text"
                    required
                    value={brideName}
                    onChange={(e) => setBrideName(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: '#FFFFFF',
                      fontSize: '13px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E1', marginBottom: '4px' }}>
                    वधू की राशि (Moon Sign):
                  </label>
                  <select
                    value={brideRashiIdx}
                    onChange={(e) => setBrideRashiIdx(parseInt(e.target.value, 10))}
                    style={{
                      width: '100%',
                      background: '#0F172A',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: '#FFFFFF',
                      fontSize: '13px'
                    }}
                  >
                    {ZODIAC_SIGNS.map((s, idx) => (
                      <option key={s.key} value={idx}>
                        {s.symbol} {s.nameHi} ({s.nameEn}) - स्वामी: {s.rulingPlanetHi}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E1', marginBottom: '4px' }}>
                    वधू का जन्म नक्षत्र:
                  </label>
                  <select
                    value={brideNakIdx}
                    onChange={(e) => setBrideNakIdx(parseInt(e.target.value, 10))}
                    style={{
                      width: '100%',
                      background: '#0F172A',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: '#FFFFFF',
                      fontSize: '13px'
                    }}
                  >
                    {NAKSHATRAS.map((n, idx) => (
                      <option key={idx} value={idx}>
                        {idx + 1}. {n.nameHi} ({n.name}) - स्वामी: {n.lordHi}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <button
              type="submit"
              style={{
                background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
                color: '#FFFFFF',
                border: 'none',
                padding: '12px 36px',
                borderRadius: '999px',
                fontWeight: 700,
                fontSize: '15px',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(217, 119, 6, 0.4)'
              }}
            >
              36 गुणों का मिलान करें (Match Kundli)
            </button>
          </div>
        </form>

        {/* Results Showcase */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', alignItems: 'start' }}>
          
          {/* Summary Score Card */}
          <div style={{
            background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.5)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '13px', color: '#94A3B8', fontWeight: 600 }}>
              कुल अष्टकूट गुण प्राप्तांक
            </div>

            <div style={{
              fontSize: '56px',
              fontWeight: 800,
              color: matchResult.totalPoints >= 18 ? '#FDE68A' : '#FCA5A5',
              margin: '8px 0',
              textShadow: '0 0 25px rgba(245, 158, 11, 0.3)'
            }}>
              {matchResult.totalPoints} <span style={{ fontSize: '24px', color: '#94A3B8' }}>/ 36</span>
            </div>

            <div style={{
              display: 'inline-block',
              padding: '6px 16px',
              borderRadius: '999px',
              fontSize: '14px',
              fontWeight: 700,
              background: matchResult.totalPoints >= 28 ? 'rgba(16, 185, 129, 0.2)' : matchResult.totalPoints >= 18 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)',
              color: matchResult.totalPoints >= 28 ? '#A7F3D0' : matchResult.totalPoints >= 18 ? '#FDE68A' : '#FCA5A5',
              border: '1px solid rgba(255,255,255,0.1)',
              marginBottom: '16px'
            }}>
              {matchResult.recommendationLevelHi}
            </div>

            {/* Progress Bar */}
            <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '999px', height: '10px', overflow: 'hidden', marginBottom: '20px' }}>
              <div style={{
                width: `${matchResult.percentage}%`,
                height: '100%',
                background: matchResult.totalPoints >= 18 ? 'linear-gradient(90deg, #F59E0B, #10B981)' : '#EF4444',
                borderRadius: '999px'
              }} />
            </div>

            {/* Mangal Dosha Card */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              borderRadius: '12px',
              padding: '14px',
              border: '1px solid rgba(255,255,255,0.08)',
              textAlign: 'left',
              fontSize: '12px',
              lineHeight: 1.5,
              marginBottom: '16px'
            }}>
              <div style={{ fontWeight: 700, color: '#FCD34D', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={16} color="#10B981" /> मांगलिक दोष स्थिति:
              </div>
              <p style={{ margin: 0, color: '#CBD5E1' }}>
                {matchResult.mangalDoshaVerdictHi}
              </p>
            </div>

            {/* Remedies Card */}
            <div style={{ textAlign: 'left', background: 'rgba(245, 158, 11, 0.06)', borderRadius: '12px', padding: '14px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
              <div style={{ fontWeight: 700, color: '#FDE68A', marginBottom: '6px', fontSize: '13px' }}>
                दांपत्य सुख हेतु वैदिक उपाय:
              </div>
              <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: '#E2E8F0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {matchResult.remediesHi.map((rem, idx) => (
                  <li key={idx}>{rem}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* 8 Kootas Detailed Breakdown Table */}
          <div style={{
            background: '#1E293B',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
          }}>
            <h3 style={{ margin: '0 0 16px', fontSize: '18px', color: '#FDE68A', fontWeight: 700 }}>
              अष्टकूट मिलान विस्तृत विवरण (8 Kootas Breakdown)
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {matchResult.scores.map((score, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(15, 23, 42, 0.6)',
                    borderRadius: '10px',
                    padding: '12px 16px',
                    border: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 700, fontSize: '14px', color: '#FFFFFF' }}>
                        {idx + 1}. {score.nameHi}
                      </span>
                      <span style={{
                        fontSize: '10px',
                        padding: '1px 6px',
                        borderRadius: '4px',
                        background: score.obtainedScore === score.maxScore ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                        color: score.obtainedScore === score.maxScore ? '#A7F3D0' : '#FDE68A'
                      }}>
                        {score.verdictHi}
                      </span>
                    </div>
                    <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#94A3B8' }}>
                      {score.descriptionHi}
                    </p>
                  </div>

                  <div style={{ textAlign: 'right', minWidth: '60px' }}>
                    <div style={{ fontSize: '16px', fontWeight: 800, color: score.obtainedScore === score.maxScore ? '#10B981' : score.obtainedScore > 0 ? '#F59E0B' : '#EF4444' }}>
                      {score.obtainedScore} / {score.maxScore}
                    </div>
                    <div style={{ fontSize: '10px', color: '#64748B' }}>अंक</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', fontSize: '11px', color: '#94A3B8' }}>
              💡 शास्त्रों के अनुसार 36 में से 18 से अधिक गुण मिलने पर विवाह शुभ माना जाता है। नाड़ी और भकूट दोष होने की स्थिति में योग्य ज्योतिषाचार्य से शांति उपाय कराना श्रेष्ठ रहता है।
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
