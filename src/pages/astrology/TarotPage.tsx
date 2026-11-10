import React, { useState } from 'react';
import { AstroHeaderNav } from '../../components/astrology/AstroHeaderNav';
import { TAROT_DECK } from '../../data/astrologyData';
import { TarotCard } from '../../types/astrology';
import { Layers, Sparkles, RefreshCw, HelpCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export const TarotPage: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<'general' | 'love' | 'career'>('general');
  const [userQuestion, setUserQuestion] = useState('');
  const [cardsDealt, setCardsDealt] = useState<TarotCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<boolean[]>([false, false, false]);
  const [isShuffling, setIsShuffling] = useState(false);

  const shuffleAndDeal = () => {
    setIsShuffling(true);
    setFlippedCards([false, false, false]);

    setTimeout(() => {
      // Pick 3 unique random cards
      const shuffled = [...TAROT_DECK].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);
      setCardsDealt(selected);
      setIsShuffling(false);
    }, 1000);
  };

  const handleFlipCard = (index: number) => {
    setFlippedCards(prev => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  const flipAll = () => {
    setFlippedCards([true, true, true]);
  };

  const spreadLabels = [
    { title: 'भूतकाल (Past)', desc: 'मूल कारण एवं संचित कर्म' },
    { title: 'वर्तमान (Present)', desc: 'तात्कालिक ऊर्जा एवं वास्तविक स्थिति' },
    { title: 'भविष्य (Future)', desc: 'संभावित परिणाम एवं दिव्य मार्गदर्शन' }
  ];

  return (
    <div style={{ background: '#090E17', color: '#F8FAFC', minHeight: '100vh', paddingBottom: '80px' }}>
      <AstroHeaderNav />

      {/* Hero Banner */}
      <div style={{
        background: 'radial-gradient(ellipse at top, #2E1065 0%, #0F172A 70%)',
        padding: '40px 16px',
        borderBottom: '1px solid rgba(245, 158, 11, 0.2)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#FDE68A', background: 'rgba(245, 158, 11, 0.15)', padding: '4px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, marginBottom: '12px' }}>
            <Layers size={14} color="#C084FC" /> 3-कार्ड दिव्य टैरो स्प्रेड
          </div>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', color: '#FDE68A', margin: '0 0 8px', fontWeight: 800 }}>
            टैरो कार्ड रीडिंग (Tarot Reading)
          </h1>
          <p style={{ color: '#CBD5E1', fontSize: '14px', margin: 0 }}>
            अपने अंतर्मन पर ध्यान केंद्रित करें, अपना प्रश्न सोचें और 3 जादुई कार्ड्स के माध्यम से मार्गदर्शन प्राप्त करें।
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '30px auto 0', padding: '0 16px' }}>
        {/* Question & Setup Bar */}
        <div style={{
          background: '#1E293B',
          borderRadius: '20px',
          padding: '24px',
          border: '1px solid rgba(245, 158, 11, 0.25)',
          boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
          marginBottom: '32px'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', alignItems: 'center' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E1', marginBottom: '6px' }}>
                अपना प्रश्न या ध्यान का विषय दर्ज करें:
              </label>
              <input
                type="text"
                placeholder="उदा. क्या मुझे इस नए करियर अवसर को स्वीकार करना चाहिए?"
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                style={{
                  width: '100%',
                  background: '#0F172A',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  color: '#FFFFFF',
                  fontSize: '13px'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
              <button
                onClick={shuffleAndDeal}
                disabled={isShuffling}
                style={{
                  flex: 1,
                  background: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '12px 20px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: isShuffling ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 15px rgba(124, 58, 237, 0.4)'
                }}
              >
                <RefreshCw size={16} className={isShuffling ? 'animate-spin' : ''} />
                {isShuffling ? 'कार्ड्स शफ़ल हो रहे हैं...' : 'कार्ड्स शफ़ल करें और निकालें'}
              </button>

              {cardsDealt.length > 0 && !flippedCards.every(Boolean) && (
                <button
                  onClick={flipAll}
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    color: '#FDE68A',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    padding: '12px 18px',
                    borderRadius: '10px',
                    fontWeight: 600,
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  तीनों कार्ड्स खोलें
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 3-Cards Spread Arena */}
        {cardsDealt.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: 'rgba(30, 41, 59, 0.5)',
            borderRadius: '24px',
            border: '2px dashed rgba(245, 158, 11, 0.25)'
          }}>
            <span style={{ fontSize: '56px', display: 'block', marginBottom: '16px' }}>🎴</span>
            <h3 style={{ margin: '0 0 8px', color: '#FDE68A', fontSize: '20px' }}>
              टैरो डेक तैयार है!
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '14px', maxWidth: '500px', margin: '0 auto 24px' }}>
              ऊपर अपना प्रश्न सोचें और <strong>"कार्ड्स शफ़ल करें"</strong> बटन दबाएं। ब्रह्मांड आपके प्रश्न का उत्तर देने को तैयार है।
            </p>
            <button
              onClick={shuffleAndDeal}
              style={{
                background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
                color: '#FFFFFF',
                border: 'none',
                padding: '12px 30px',
                borderRadius: '999px',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              शुरू करें
            </button>
          </div>
        ) : (
          <div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
              marginBottom: '40px'
            }}>
              {cardsDealt.map((card, idx) => {
                const isFlipped = flippedCards[idx];
                const label = spreadLabels[idx];

                return (
                  <div key={card.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* Position Label */}
                    <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                      <span style={{
                        fontSize: '11px',
                        background: 'rgba(245, 158, 11, 0.15)',
                        color: '#FDE68A',
                        padding: '3px 10px',
                        borderRadius: '999px',
                        fontWeight: 700
                      }}>
                        {label.title}
                      </span>
                      <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#94A3B8' }}>{label.desc}</p>
                    </div>

                    {/* Tarot Card Object */}
                    <div
                      onClick={() => !isFlipped && handleFlipCard(idx)}
                      style={{
                        width: '100%',
                        maxWidth: '280px',
                        height: '420px',
                        perspective: '1000px',
                        cursor: isFlipped ? 'default' : 'pointer'
                      }}
                    >
                      <div style={{
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                        transformStyle: 'preserve-3d',
                        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                      }}>
                        {/* Card Back (Unflipped) */}
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          backfaceVisibility: 'hidden',
                          borderRadius: '18px',
                          background: 'linear-gradient(135deg, #1E1B4B 0%, #311042 50%, #0F172A 100%)',
                          border: '4px double #F59E0B',
                          boxShadow: '0 15px 35px rgba(0,0,0,0.6), 0 0 20px rgba(245, 158, 11, 0.2)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '20px',
                          textAlign: 'center'
                        }}>
                          <div style={{ fontSize: '48px', marginBottom: '10px' }}>🔮</div>
                          <div style={{ fontSize: '18px', fontWeight: 800, color: '#FDE68A' }}>
                            कार्ड खोलें
                          </div>
                          <p style={{ fontSize: '11px', color: '#94A3B8', marginTop: '6px' }}>
                            क्लिक करके रहस्य प्रकट करें
                          </p>
                        </div>

                        {/* Card Front (Flipped) */}
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          backfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)',
                          borderRadius: '18px',
                          background: 'linear-gradient(180deg, #1E293B 0%, #0F172A 100%)',
                          border: '2px solid #F59E0B',
                          boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
                          padding: '20px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          textAlign: 'center'
                        }}>
                          <div>
                            <span style={{ fontSize: '36px' }}>{card.cardSymbol}</span>
                            <h3 style={{ margin: '8px 0 2px', fontSize: '17px', fontWeight: 800, color: '#FDE68A' }}>
                              {card.nameHi}
                            </h3>
                            <div style={{ fontSize: '11px', color: '#CBD5E1', fontStyle: 'italic', marginBottom: '10px' }}>
                              {card.nameEn} ({card.archetype})
                            </div>

                            <p style={{ fontSize: '12px', color: '#E2E8F0', lineHeight: 1.5, margin: '0 0 12px' }}>
                              {card.uprightMeaningHi}
                            </p>
                          </div>

                          <div style={{
                            background: 'rgba(245, 158, 11, 0.1)',
                            border: '1px solid rgba(245, 158, 11, 0.25)',
                            borderRadius: '8px',
                            padding: '8px',
                            fontSize: '11px',
                            color: '#FDE68A'
                          }}>
                            <strong>मार्गदर्शन:</strong> {card.adviceHi}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Overall Tarot Synthesis Box */}
            {flippedCards.every(Boolean) && (
              <div style={{
                background: 'radial-gradient(ellipse at center, #1E1B4B 0%, #0F172A 100%)',
                borderRadius: '20px',
                padding: '28px',
                border: '1px solid rgba(245, 158, 11, 0.35)',
                boxShadow: '0 15px 40px rgba(0,0,0,0.6)',
                textAlign: 'center'
              }}>
                <Sparkles size={24} color="#F59E0B" style={{ margin: '0 auto 8px' }} />
                <h3 style={{ margin: '0 0 8px', fontSize: '20px', color: '#FDE68A', fontWeight: 800 }}>
                  समग्र टैरो फलादेश एवं निष्कर्ष
                </h3>
                <p style={{ color: '#E2E8F0', fontSize: '14px', lineHeight: 1.7, maxWidth: '800px', margin: '0 auto 20px' }}>
                  यह 3-कार्ड स्प्रेड दर्शाता है कि अतीत के अनुभवों ने आपको दृढ़ बनाया है। वर्तमान परिस्थिति आपके संकल्प और धैर्य की परीक्षा ले रही है, परंतु भविष्य का कार्ड स्पष्ट संकेत देता है कि यदि आप सत्य और संतुलन के मार्ग पर चलेंगे तो सफलता और आत्मिक शांति अवश्य प्राप्त होगी।
                </p>

                <button
                  onClick={shuffleAndDeal}
                  style={{
                    background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '10px 26px',
                    borderRadius: '999px',
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  नया प्रश्न पूछें एवं पुनः कार्ड निकालें
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
