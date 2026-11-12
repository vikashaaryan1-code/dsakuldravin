import React, { useState } from 'react';
import { AstroHeaderNav } from '../../components/astrology/AstroHeaderNav';
import { calculateNumerology } from '../../utils/astrologyCalculators';
import { NumerologyResult } from '../../types/astrology';
import { Hash, Sparkles, Award, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export const NumerologyPage: React.FC = () => {
  const [nameInput, setNameInput] = useState('अमित कुमार (Amit Kumar)');
  const [dobInput, setDobInput] = useState('1994-08-19');
  const [result, setResult] = useState<NumerologyResult>(() => calculateNumerology(nameInput, dobInput));

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(calculateNumerology(nameInput, dobInput));
  };

  return (
    <div style={{ background: '#031126', color: '#F8FAFC', minHeight: '100vh', paddingBottom: '80px' }}>
      <AstroHeaderNav />

      {/* Hero Banner */}
      <div style={{
        background: 'radial-gradient(ellipse at top, #1E1B4B 0%, #0F172A 70%)',
        padding: '40px 16px',
        borderBottom: '1px solid rgba(245, 158, 11, 0.2)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#FDE68A', background: 'rgba(245, 158, 11, 0.15)', padding: '4px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, marginBottom: '12px' }}>
            <Hash size={14} color="#3B82F6" /> वेदोक्त एवं काल्डियन अंक विज्ञान
          </div>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', color: '#FDE68A', margin: '0 0 8px', fontWeight: 800 }}>
            अंक ज्योतिष कैलकुलेटर (Numerology)
          </h1>
          <p style={{ color: '#CBD5E1', fontSize: '14px', margin: 0 }}>
            अपनी जन्मतिथि और नाम से जानें अपना मूलांक, भाग्यांक, नामांक, अनुकूल रंग, शुभ तिथियां एवं करियर।
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1240px', margin: '30px auto 0', padding: '0 16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', alignItems: 'start' }}>
          
          {/* Form Input Box */}
          <div style={{
            background: '#1E293B',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)'
          }}>
            <h3 style={{ margin: '0 0 16px', fontSize: '18px', color: '#FDE68A', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Hash size={18} color="#F59E0B" /> विवरण दर्ज करें
            </h3>

            <form onSubmit={handleCalculate} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E1', marginBottom: '4px' }}>
                  पूरा नाम (अंग्रेज़ी या हिंदी):
                </label>
                <input
                  type="text"
                  required
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#0F172A',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: '#FFFFFF',
                    fontSize: '13px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E1', marginBottom: '4px' }}>
                  जन्म तिथि (Date of Birth):
                </label>
                <input
                  type="date"
                  required
                  value={dobInput}
                  onChange={(e) => setDobInput(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#0F172A',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: '#FFFFFF',
                    fontSize: '13px'
                  }}
                />
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
                  boxShadow: '0 4px 15px rgba(217, 119, 6, 0.4)'
                }}
              >
                अंक फलित की गणना करें
              </button>
            </form>
          </div>

          {/* Numerology Output Result */}
          <div>
            {/* 3 Master Numbers Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '14px',
              marginBottom: '20px'
            }}>
              {/* Mulank */}
              <div style={{ background: '#1E293B', borderRadius: '16px', padding: '18px', border: '1px solid rgba(245, 158, 11, 0.3)', textAlign: 'center' }}>
                <span style={{ fontSize: '11px', color: '#94A3B8' }}>मूलांक (Driver Number)</span>
                <div style={{ fontSize: '40px', fontWeight: 800, color: '#FDE68A', margin: '4px 0' }}>
                  {result.mulank}
                </div>
                <div style={{ fontSize: '11px', color: '#CBD5E1' }}>स्वामी: {result.rulingPlanetHi}</div>
              </div>

              {/* Bhagyank */}
              <div style={{ background: '#1E293B', borderRadius: '16px', padding: '18px', border: '1px solid rgba(59, 130, 246, 0.3)', textAlign: 'center' }}>
                <span style={{ fontSize: '11px', color: '#94A3B8' }}>भाग्यांक (Destiny Number)</span>
                <div style={{ fontSize: '40px', fontWeight: 800, color: '#93C5FD', margin: '4px 0' }}>
                  {result.bhagyank}
                </div>
                <div style={{ fontSize: '11px', color: '#CBD5E1' }}>जीवन पथ अंक</div>
              </div>

              {/* Namank */}
              <div style={{ background: '#1E293B', borderRadius: '16px', padding: '18px', border: '1px solid rgba(16, 185, 129, 0.3)', textAlign: 'center' }}>
                <span style={{ fontSize: '11px', color: '#94A3B8' }}>नामांक (Name Number)</span>
                <div style={{ fontSize: '40px', fontWeight: 800, color: '#A7F3D0', margin: '4px 0' }}>
                  {result.namank}
                </div>
                <div style={{ fontSize: '11px', color: '#CBD5E1' }}>काल्डियन पद्धति</div>
              </div>
            </div>

            {/* Detailed Characteristics */}
            <div style={{
              background: '#1E293B',
              borderRadius: '20px',
              padding: '24px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
            }}>
              <h4 style={{ margin: '0 0 12px', fontSize: '16px', color: '#FDE68A', fontWeight: 700 }}>
                व्यक्तित्व एवं चारित्रिक विशेषताएं (मूलांक {result.mulank})
              </h4>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '18px' }}>
                {result.personalityTraitsHi.map((trait, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: 'rgba(245, 158, 11, 0.15)',
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                      color: '#FDE68A',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      fontSize: '12px',
                      fontWeight: 600
                    }}
                  >
                    ✓ {trait}
                  </span>
                ))}
              </div>

              {/* Attributes Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '20px' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '11px', color: '#94A3B8' }}>शुभ तिथियां:</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>{result.favorableDates.join(', ')}</div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '11px', color: '#94A3B8' }}>शुभ वार:</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>{result.favorableDaysHi.join(', ')}</div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '11px', color: '#94A3B8' }}>शुभ रंग:</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>{result.favorableColorsHi.join(', ')}</div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '11px', color: '#94A3B8' }}>अनुकूल मित्र अंक:</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#10B981' }}>{result.compatibleNumbers.join(', ')}</div>
                </div>
              </div>

              {/* Career Guidance */}
              <div style={{ background: 'rgba(245, 158, 11, 0.08)', borderRadius: '12px', padding: '14px', border: '1px solid rgba(245, 158, 11, 0.25)' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#FDE68A', marginBottom: '4px' }}>
                  💼 अंक ज्योतिष अनुसार सबसे उपयुक्त करियर:
                </div>
                <p style={{ margin: 0, fontSize: '13px', color: '#CBD5E1', lineHeight: 1.5 }}>
                  {result.careerGuidanceHi}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
