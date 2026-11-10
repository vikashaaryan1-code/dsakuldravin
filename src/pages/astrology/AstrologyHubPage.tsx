import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AstroHeaderNav } from '../../components/astrology/AstroHeaderNav';
import { AstrologerChatModal } from '../../components/astrology/AstrologerChatModal';
import { ConsultationBookingModal } from '../../components/astrology/ConsultationBookingModal';
import { AstroCartModal, AstroCartEntry } from '../../components/astrology/AstroCartModal';
import { AstroProcessSection } from '../../components/astrology/AstroProcessSection';
import { 
  TODAY_PANCHANG, 
  RASHI_HOROSCOPES, 
  VERIFIED_ASTROLOGERS, 
  ASTRO_STORE_PRODUCTS, 
  ASTRO_BLOG_POSTS,
  ASTRO_FAQS 
} from '../../data/astrologyData';
import { ZODIAC_SIGNS } from '../../utils/astrologyCalculators';
import { AstrologerProfile, AstroProduct } from '../../types/astrology';
import { 
  Sparkles, 
  Compass, 
  Heart, 
  Sun, 
  Calendar, 
  Users, 
  ShoppingBag, 
  Layers, 
  Hash, 
  Gem, 
  BookOpen, 
  MessageSquare, 
  ShieldCheck, 
  CheckCircle, 
  Star, 
  ArrowRight, 
  Clock, 
  PhoneCall, 
  HelpCircle,
  ChevronRight
} from 'lucide-react';

export const AstrologyHubPage: React.FC = () => {
  const [selectedAstrologerForChat, setSelectedAstrologerForChat] = useState<AstrologerProfile | null>(null);
  const [selectedAstrologerForBooking, setSelectedAstrologerForBooking] = useState<AstrologerProfile | null>(null);
  const [cartItems, setCartItems] = useState<AstroCartEntry[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedSignKey, setSelectedSignKey] = useState<string>('aries');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const activeHoroscope = RASHI_HOROSCOPES[selectedSignKey] || RASHI_HOROSCOPES['aries'];

  const handleAddToCart = (product: AstroProduct) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQty = (productId: string, delta: number) => {
    setCartItems(prev => 
      prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as AstroCartEntry[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSuccess(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSuccess(false), 5000);
    }
  };

  return (
    <div style={{ background: '#090E17', color: '#F8FAFC', minHeight: '100vh' }}>
      {/* Astrology Dedicated Header Navigation */}
      <AstroHeaderNav />

      {/* Floating Cart Button */}
      {cartItems.length > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          style={{
            position: 'fixed',
            bottom: '85px',
            right: '24px',
            zIndex: 90,
            background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
            color: '#FFFFFF',
            border: '2px solid #F59E0B',
            borderRadius: '999px',
            padding: '12px 20px',
            boxShadow: '0 10px 30px rgba(217, 119, 6, 0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontWeight: 700,
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          <ShoppingBag size={18} />
          <span>एस्ट्रो कार्ट ({cartItems.reduce((a, b) => a + b.quantity, 0)})</span>
        </button>
      )}

      {/* 1. Celestial Hero Section */}
      <section style={{
        position: 'relative',
        padding: '60px 16px 80px',
        background: 'radial-gradient(ellipse at top, #1E1B4B 0%, #0F172A 50%, #090E17 100%)',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(245, 158, 11, 0.2)'
      }}>
        {/* Sacred Decorative Watermark */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '320px',
          color: 'rgba(245, 158, 11, 0.03)',
          userSelect: 'none',
          pointerEvents: 'none',
          fontFamily: 'serif'
        }}>
          ॐ
        </div>

        <div style={{ maxWidth: '1240px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(245, 158, 11, 0.15)',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            padding: '6px 16px',
            borderRadius: '999px',
            fontSize: '13px',
            color: '#FDE68A',
            fontWeight: 600,
            marginBottom: '20px',
            boxShadow: '0 0 20px rgba(245, 158, 11, 0.2)'
          }}>
            <Sparkles size={16} color="#F59E0B" />
            भारत का सर्वाधिक विश्वसनीय एवं प्रामाणिक वैदिक ज्योतिष महामंच
          </div>

          <h1 style={{
            fontSize: 'clamp(28px, 5vw, 52px)',
            fontWeight: 800,
            lineHeight: 1.2,
            margin: '0 0 16px',
            background: 'linear-gradient(135deg, #FFFBEB 0%, #FDE68A 50%, #F59E0B 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.5px'
          }}>
            ग्रह, नक्षत्र और भाग्य का सटीक वेदोक्त फलादेश
          </h1>

          <p style={{
            fontSize: 'clamp(15px, 2vw, 18px)',
            color: '#CBD5E1',
            maxWidth: '820px',
            margin: '0 auto 36px',
            lineHeight: 1.6
          }}>
            मुफ़्त जन्म कुंडली निर्माण, 36 गुण अष्टकूट मिलान, दैनिक राशिफल, वैदिक पंचांग और देश के शीर्ष स्वर्ण पदक विजेता ज्योतिषाचार्यों से प्रत्यक्ष परामर्श।
          </p>

          {/* Key CTA Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px' }}>
            <Link
              to="/astrology/kundli"
              style={{
                background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
                color: '#FFFFFF',
                padding: '14px 28px',
                borderRadius: '999px',
                fontWeight: 700,
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 10px 25px rgba(217, 119, 6, 0.4)',
                border: '1px solid #F59E0B'
              }}
            >
              <Compass size={20} /> मुफ़्त जन्म कुंडली बनाएं
            </Link>

            <Link
              to="/astrology/matching"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#FDE68A',
                padding: '14px 28px',
                borderRadius: '999px',
                fontWeight: 700,
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                backdropFilter: 'blur(8px)'
              }}
            >
              <Heart size={20} color="#F472B6" /> 36 गुण कुंडली मिलान
            </Link>

            <Link
              to="/astrology/astrologers"
              style={{
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                color: '#FFFFFF',
                padding: '14px 28px',
                borderRadius: '999px',
                fontWeight: 700,
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 10px 25px rgba(5, 150, 105, 0.35)',
                border: '1px solid #10B981'
              }}
            >
              <PhoneCall size={20} /> ज्योतिषी से बात करें
            </Link>
          </div>

          {/* Social Proof Strip */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '28px',
            marginTop: '44px',
            paddingTop: '24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            fontSize: '13px',
            color: '#94A3B8'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} color="#10B981" />
              <span>100% सत्यापित वैदिक ज्योतिषाचार्य</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Star size={18} color="#F59E0B" fill="#F59E0B" />
              <span>4.9/5 औसत संतुष्टि (1.8 लाख+ उपयोगकर्ता)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <LockSecurityIcon />
              <span>पूर्णतया गोपनीय एवं सुरक्षित सत्र</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Today's Panchang Live Strip */}
      <section style={{ maxWidth: '1240px', margin: '-30px auto 40px', padding: '0 16px', position: 'relative', zIndex: 10 }}>
        <div style={{
          background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
          borderRadius: '20px',
          padding: '20px 24px',
          border: '1px solid rgba(245, 158, 11, 0.35)',
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.6)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#F59E0B', fontSize: '12px', fontWeight: 700 }}>
              <Calendar size={14} /> आज का वैदिक पंचांग
            </div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#FDE68A', marginTop: '2px' }}>
              {TODAY_PANCHANG.tithi.nameHi}
            </div>
            <div style={{ fontSize: '12px', color: '#94A3B8' }}>{TODAY_PANCHANG.pakshaHi} | {TODAY_PANCHANG.monthPurnimantaHi}</div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: '#94A3B8' }}>नक्षत्र एवं वार</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>{TODAY_PANCHANG.nakshatra.nameHi}</div>
            <div style={{ fontSize: '12px', color: '#A7F3D0' }}>{TODAY_PANCHANG.dayOfWeekHi}</div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: '#10B981', fontWeight: 600 }}>शुभ मुहूर्त (अभिजीत)</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#FDE68A' }}>
              {TODAY_PANCHANG.shubhMuhurat.abhijitMuhurat}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: '#EF4444', fontWeight: 600 }}>राहुकाल (वर्जित समय)</div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#FCA5A5' }}>
              {TODAY_PANCHANG.ashubhMuhurat.rahuKaal}
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <Link
              to="/astrology/panchang"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(245, 158, 11, 0.15)',
                color: '#FDE68A',
                padding: '8px 16px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: 700,
                border: '1px solid rgba(245, 158, 11, 0.3)'
              }}
            >
              सम्पूर्ण पंचांग <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Daily Horoscope (आज का राशिफल) Interactive Matrix */}
      <section style={{ maxWidth: '1240px', margin: '0 auto 60px', padding: '0 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#FDE68A', margin: '0 0 8px' }}>
            ✨ आज का राशिफल (Daily Horoscope)
          </h2>
          <p style={{ fontSize: '14px', color: '#94A3B8', margin: 0 }}>
            अपनी राशि चुनें और जानें आज का दिन आपके स्वास्थ्य, करियर, धन एवं प्रेम संबंधों के लिए कैसा रहेगा।
          </p>
        </div>

        {/* 12 Signs Pills */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
          gap: '8px',
          marginBottom: '24px'
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
                borderRadius: '12px',
                padding: '10px 6px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: selectedSignKey === sign.key ? '0 4px 15px rgba(217, 119, 6, 0.35)' : 'none'
              }}
            >
              <span style={{ fontSize: '20px' }}>{sign.symbol}</span>
              <span style={{ fontSize: '12px', fontWeight: 700 }}>{sign.nameHi}</span>
              <span style={{ fontSize: '10px', color: selectedSignKey === sign.key ? '#FEF3C7' : '#94A3B8' }}>{sign.nameEn}</span>
            </button>
          ))}
        </div>

        {/* Active Sign Horoscope Card */}
        <div style={{
          background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
          borderRadius: '20px',
          padding: '24px',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '32px' }}>
                {ZODIAC_SIGNS.find(s => s.key === selectedSignKey)?.symbol}
              </span>
              <div>
                <h3 style={{ margin: 0, fontSize: '20px', color: '#FDE68A', fontWeight: 800 }}>
                  {ZODIAC_SIGNS.find(s => s.key === selectedSignKey)?.nameHi} राशि फलादेश
                </h3>
                <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#94A3B8' }}>
                  स्वामी: <strong>{ZODIAC_SIGNS.find(s => s.key === selectedSignKey)?.rulingPlanetHi}</strong> | तत्व: <strong>{ZODIAC_SIGNS.find(s => s.key === selectedSignKey)?.elementHi}</strong>
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '8px', fontSize: '12px' }}>
                शुभ रंग: <strong style={{ color: '#FDE68A' }}>{activeHoroscope.daily.luckyColorHi}</strong>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '8px', fontSize: '12px' }}>
                शुभ अंक: <strong style={{ color: '#FDE68A' }}>{activeHoroscope.daily.luckyNumber}</strong>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '8px', fontSize: '12px' }}>
                शुभ दिशा: <strong style={{ color: '#FDE68A' }}>{activeHoroscope.daily.luckyDirectionHi}</strong>
              </div>
            </div>
          </div>

          <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#E2E8F0', marginBottom: '20px' }}>
            {activeHoroscope.daily.overviewHi}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '20px' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '12px', color: '#F59E0B', fontWeight: 700, marginBottom: '4px' }}>💼 करियर एवं व्यापार</div>
              <div style={{ fontSize: '13px', color: '#CBD5E1' }}>{activeHoroscope.daily.careerHi}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '12px', color: '#EC4899', fontWeight: 700, marginBottom: '4px' }}>❤️ प्रेम एवं दांपत्य</div>
              <div style={{ fontSize: '13px', color: '#CBD5E1' }}>{activeHoroscope.daily.loveHi}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '12px', color: '#10B981', fontWeight: 700, marginBottom: '4px' }}>🌿 स्वास्थ्य एवं ऊर्जा</div>
              <div style={{ fontSize: '13px', color: '#CBD5E1' }}>{activeHoroscope.daily.healthHi}</div>
            </div>
          </div>

          <div style={{
            background: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '10px',
            padding: '12px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ fontSize: '13px', color: '#FDE68A' }}>
              <strong>आज का अचूक उपाय:</strong> {activeHoroscope.daily.remedyHi}
            </div>
            <Link
              to="/astrology/rashifal"
              style={{
                color: '#F59E0B',
                fontSize: '12px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              साप्ताहिक व मासिक राशिफल देखें <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Complete Astrology Services Grid */}
      <section style={{ maxWidth: '1240px', margin: '0 auto 70px', padding: '0 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#FDE68A', margin: '0 0 8px' }}>
            🔮 समस्त वैदिक ज्योतिष सेवाएँ एवं साधन
          </h2>
          <p style={{ fontSize: '14px', color: '#94A3B8', margin: 0 }}>
            हजारों वर्षों की वेदोक्त परंपरा और आधुनिक कम्प्यूटेशनल सटीकता का संगम।
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {[
            {
              title: 'जन्म कुंडली निर्माण',
              desc: 'सटीक लग्न चार्ट, नवग्रह स्थिति, विंशोत्तरी महादशा, राजयोग एवं संपूर्ण जीवन फलित।',
              icon: <Compass size={24} color="#F59E0B" />,
              link: '/astrology/kundli',
              tag: '100% Free'
            },
            {
              title: '36 गुण अष्टकूट मिलान',
              desc: 'वर-वधू के 8 कूटों (वर्ण, वश्य, तारा, योनि, ग्रह मैत्री, गण, भकूट, नाड़ी) व मांगलिक दोष की सूक्ष्म जांच।',
              icon: <Heart size={24} color="#F472B6" />,
              link: '/astrology/matching',
              tag: 'विवाह विशेष'
            },
            {
              title: 'दैनिक पंचांग व मुहूर्त',
              desc: 'तिथि, वार, नक्षत्र, योग, करण, सूर्योदय/सूर्यास्त, चौघड़िया, राहुकाल एवं अभिजीत मुहूर्त।',
              icon: <Calendar size={24} color="#10B981" />,
              link: '/astrology/panchang',
              tag: 'लाइव अपडेट'
            },
            {
              title: 'टैरो कार्ड रीडिंग',
              desc: '3-कार्ड स्प्रेड (भूत, वर्तमान, भविष्य) के माध्यम से अपने अंतर्मन व करियर का रहस्यमयी मार्गदर्शन।',
              icon: <Layers size={24} color="#8B5CF6" />,
              link: '/astrology/tarot',
              tag: '3D Flip Deck'
            },
            {
              title: 'अंक ज्योतिष (Numerology)',
              desc: 'मूलांक, भाग्यांक और नामांक गणना। लकी नंबर, अनुकूल तिथियां, रंग और करियर मार्गदर्शन।',
              icon: <Hash size={24} color="#3B82F6" />,
              link: '/astrology/numerology',
              tag: 'काल्डियन पद्धति'
            },
            {
              title: 'रत्न सुझाव एवं विधि',
              desc: 'अपनी कुंडली के अनुसार अनुकूल रत्न, उपरत्न, धारण करने की धातु, उंगली और बीज मंत्र।',
              icon: <Gem size={24} color="#EC4899" />,
              link: '/astrology/gemstones',
              tag: 'प्रामाणिक गाइड'
            },
            {
              title: 'लाल किताब एवं ग्रह दोष उपाय',
              desc: 'कालसर्प दोष, मांगलिक दोष, शनि साढ़ेसाती और पितृ दोष के 43 दिनों के अचूक वेदोक्त उपाय।',
              icon: <Sparkles size={24} color="#F59E0B" />,
              link: '/astrology/contact',
              tag: 'अचूक समाधान'
            },
            {
              title: 'एस्ट्रो ई-स्टोर',
              desc: 'प्राकृतिक लैब प्रमाणित रत्न, मूल नेपाली रुद्राक्ष, सिद्ध त्रि-आयामी श्रीयंत्र व हस्तलिखित रिपोर्ट्स।',
              icon: <ShoppingBag size={24} color="#10B981" />,
              link: '/astrology/store',
              tag: 'प्रमाण-पत्र सहित'
            }
          ].map((service, idx) => (
            <Link
              key={idx}
              to={service.link}
              style={{
                background: '#1E293B',
                borderRadius: '16px',
                padding: '22px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.25s',
                textDecoration: 'none',
                color: 'inherit'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.5)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {service.icon}
                  </div>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#FDE68A',
                    background: 'rgba(245, 158, 11, 0.15)',
                    padding: '3px 8px',
                    borderRadius: '999px',
                    border: '1px solid rgba(245, 158, 11, 0.25)'
                  }}>
                    {service.tag}
                  </span>
                </div>

                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 8px' }}>
                  {service.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#94A3B8', lineHeight: 1.5, margin: 0 }}>
                  {service.desc}
                </p>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#F59E0B',
                fontSize: '12px',
                fontWeight: 700,
                marginTop: '16px'
              }}>
                <span>उपयोग करें</span>
                <ChevronRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4.5. Interactive 4-Step Vedic Process Section */}
      <AstroProcessSection />

      {/* 5. Verified Astrologers Carousel / Spotlight */}
      <section style={{
        background: 'linear-gradient(180deg, #090E17 0%, #111827 50%, #090E17 100%)',
        padding: '60px 16px',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', gap: '16px' }}>
            <div>
              <div style={{ color: '#10B981', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
                लाइव उपलब्ध विशेषज्ञ
              </div>
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#FDE68A', margin: '4px 0 0' }}>
                शीर्ष सत्यापित ज्योतिषाचार्य
              </h2>
            </div>

            <Link
              to="/astrology/astrologers"
              style={{
                color: '#F59E0B',
                fontSize: '14px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              सभी ज्योतिषी देखें (8+) <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '20px'
          }}>
            {VERIFIED_ASTROLOGERS.slice(0, 3).map((astro) => (
              <div
                key={astro.id}
                style={{
                  background: '#1E293B',
                  borderRadius: '18px',
                  padding: '20px',
                  border: '1px solid rgba(245, 158, 11, 0.25)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', gap: '14px', marginBottom: '14px' }}>
                    <div style={{ position: 'relative' }}>
                      <img
                        src={astro.avatarUrl}
                        alt={astro.nameHi}
                        style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #F59E0B' }}
                      />
                      {astro.isOnline && (
                        <span style={{
                          position: 'absolute',
                          bottom: '2px',
                          right: '2px',
                          width: '14px',
                          height: '14px',
                          borderRadius: '50%',
                          background: '#10B981',
                          border: '2px solid #1E293B'
                        }} />
                      )}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#FDE68A' }}>
                          {astro.nameHi}
                        </h4>
                        <ShieldCheck size={16} color="#10B981" />
                      </div>
                      <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#94A3B8' }}>
                        {astro.titleHi}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px', fontSize: '11px' }}>
                        <span style={{ color: '#F59E0B', fontWeight: 700 }}>★ {astro.rating}</span>
                        <span style={{ color: '#64748B' }}>•</span>
                        <span style={{ color: '#CBD5E1' }}>{astro.experienceYears}+ वर्ष</span>
                        <span style={{ color: '#64748B' }}>•</span>
                        <span style={{ color: '#A7F3D0' }}>{astro.languagesHi.join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  <p style={{ fontSize: '12px', color: '#CBD5E1', lineHeight: 1.5, margin: '0 0 16px' }}>
                    {astro.bioHi}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '14px' }}>
                  <button
                    onClick={() => setSelectedAstrologerForChat(astro)}
                    style={{
                      flex: 1,
                      background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '8px',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <MessageSquare size={14} />
                    चैट (₹{astro.chatRatePerMin}/मि)
                  </button>

                  <button
                    onClick={() => setSelectedAstrologerForBooking(astro)}
                    style={{
                      flex: 1,
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: '#FDE68A',
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                      padding: '8px',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <PhoneCall size={14} />
                    कॉल स्लॉट (₹{astro.callRatePerMin}/मि)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Astro Store Bestsellers */}
      <section style={{ maxWidth: '1240px', margin: '60px auto', padding: '0 16px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', gap: '16px' }}>
          <div>
            <div style={{ color: '#F59E0B', fontSize: '13px', fontWeight: 700 }}>
              काशी विश्वनाथ एवं वेदोक्त ब्राह्मणों द्वारा अभिमंत्रित
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#FDE68A', margin: '4px 0 0' }}>
              प्रामाणिक एस्ट्रो स्टोर (Astro Store)
            </h2>
          </div>

          <Link
            to="/astrology/store"
            style={{
              color: '#F59E0B',
              fontSize: '14px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            पूरा स्टोर देखें <ArrowRight size={16} />
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '20px'
        }}>
          {ASTRO_STORE_PRODUCTS.slice(0, 4).map((prod) => (
            <div
              key={prod.id}
              style={{
                background: '#1E293B',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s'
              }}
            >
              <div>
                <div style={{ position: 'relative', height: '170px' }}>
                  <img
                    src={prod.imageUrl}
                    alt={prod.titleHi}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {prod.badgeHi && (
                    <span style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      background: 'rgba(217, 119, 6, 0.9)',
                      color: '#FFFFFF',
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '4px',
                      backdropFilter: 'blur(4px)'
                    }}>
                      {prod.badgeHi}
                    </span>
                  )}
                </div>

                <div style={{ padding: '16px' }}>
                  <h4 style={{ margin: '0 0 6px', fontSize: '15px', fontWeight: 700, color: '#FFFFFF' }}>
                    {prod.titleHi}
                  </h4>
                  <p style={{ margin: '0 0 12px', fontSize: '12px', color: '#94A3B8', lineHeight: 1.4 }}>
                    {prod.shortDescHi}
                  </p>
                  <div style={{ fontSize: '11px', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                    <ShieldCheck size={14} /> {prod.certificationHi || 'सरकारी लैब प्रमाणित'}
                  </div>
                </div>
              </div>

              <div style={{ padding: '0 16px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#FDE68A' }}>
                    ₹{prod.price}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748B', textDecoration: 'line-through' }}>
                    ₹{prod.originalPrice}
                  </div>
                </div>

                <button
                  onClick={() => handleAddToCart(prod)}
                  style={{
                    background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <ShoppingBag size={14} /> कार्ट में जोड़ें
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Astrological Articles & Blog */}
      <section style={{ maxWidth: '1240px', margin: '0 auto 70px', padding: '0 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#FDE68A', margin: '0 0 4px' }}>
              📚 ज्योतिषीय ज्ञान एवं ग्रह गोचर
            </h2>
            <p style={{ fontSize: '14px', color: '#94A3B8', margin: 0 }}>
              वेदिक शास्त्रों, पर्व-त्यौहारों और ज्योतिष विज्ञान पर शोधपरक आलेख।
            </p>
          </div>
          <Link to="/astrology/blog" style={{ color: '#F59E0B', fontSize: '14px', fontWeight: 700 }}>
            सभी लेख पढ़ें <ArrowRight size={14} style={{ display: 'inline' }} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {ASTRO_BLOG_POSTS.map((post) => (
            <Link
              key={post.id}
              to="/astrology/blog"
              style={{
                background: '#1E293B',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.06)',
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <img
                  src={post.imageUrl}
                  alt={post.titleHi}
                  style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                />
                <div style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', gap: '8px', fontSize: '11px', color: '#F59E0B', marginBottom: '8px' }}>
                    <span>{post.categoryHi}</span>
                    <span>•</span>
                    <span>{post.readTimeHi}</span>
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF', margin: '0 0 8px', lineHeight: 1.4 }}>
                    {post.titleHi}
                  </h3>
                  <p style={{ fontSize: '12px', color: '#94A3B8', lineHeight: 1.5, margin: 0 }}>
                    {post.excerptHi}
                  </p>
                </div>
              </div>

              <div style={{ padding: '0 16px 16px', fontSize: '11px', color: '#64748B', display: 'flex', justifyContent: 'space-between' }}>
                <span>लेखक: {post.authorHi}</span>
                <span>{post.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 8. FAQs & WhatsApp Direct Support Strip */}
      <section style={{ maxWidth: '1240px', margin: '0 auto 80px', padding: '0 16px' }}>
        <div style={{
          background: 'radial-gradient(ellipse at center, #1E1B4B 0%, #0F172A 100%)',
          borderRadius: '24px',
          padding: '36px',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          alignItems: 'center'
        }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#10B981', textTransform: 'uppercase', letterSpacing: '1px' }}>
              तुरंत समाधान (Instant Help)
            </span>
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#FDE68A', margin: '8px 0 12px' }}>
              क्या आपके मन में कोई गहरा प्रश्न है?
            </h2>
            <p style={{ fontSize: '14px', color: '#CBD5E1', lineHeight: 1.6, marginBottom: '24px' }}>
              विवाह, करियर, संतान या कालसर्प-मांगलिक दोष के समाधान हेतु हमारे वरिष्ठ आचार्यों से सीधे व्हाट्सएप पर संवाद करें।
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <a
                href="https://wa.me/919876543210?text=नमस्ते%20आचार्य%20जी,%20मुझे%20अपनी%20कुंडली%20के%20बारे%20में%20परामर्श%20चाहिए।"
                target="_blank"
                rel="noreferrer"
                style={{
                  background: '#25D366',
                  color: '#FFFFFF',
                  padding: '12px 24px',
                  borderRadius: '999px',
                  fontWeight: 700,
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                  boxShadow: '0 8px 20px rgba(37, 211, 102, 0.3)'
                }}
              >
                <span>💬</span> व्हाट्सएप पर ज्योतिषी से पूछें
              </a>

              <Link
                to="/astrology/contact"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  color: '#FDE68A',
                  padding: '12px 20px',
                  borderRadius: '999px',
                  fontWeight: 600,
                  fontSize: '14px',
                  border: '1px solid rgba(245, 158, 11, 0.3)'
                }}
              >
                प्रश्न कुंडली प्रपत्र भरें
              </Link>
            </div>
          </div>

          {/* Newsletter Box */}
          <div style={{ background: '#1E293B', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h3 style={{ margin: '0 0 6px', fontSize: '18px', color: '#FFFFFF', fontWeight: 700 }}>
              दैनिक पंचांग व राशिफल बुलेटिन
            </h3>
            <p style={{ margin: '0 0 16px', fontSize: '12px', color: '#94A3B8' }}>
              प्रतिदिन प्रातः 6:00 बजे अपने ईमेल पर आज का शुभ समय, राहुकाल और विशेष उपाय प्राप्त करें।
            </p>

            <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input
                type="email"
                required
                placeholder="अपना ईमेल पता दर्ज करें"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                style={{
                  background: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  color: '#FFFFFF',
                  fontSize: '13px'
                }}
              />
              <button
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '10px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                निःशुल्क सदस्यता लें
              </button>
              {newsletterSuccess && (
                <div style={{ fontSize: '12px', color: '#10B981', textAlign: 'center' }}>
                  ✓ धन्यवाद! आप वैदिक पंचांग सेवा से जुड़ चुके हैं।
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Modals */}
      {selectedAstrologerForChat && (
        <AstrologerChatModal
          astrologer={selectedAstrologerForChat}
          onClose={() => setSelectedAstrologerForChat(null)}
        />
      )}

      {selectedAstrologerForBooking && (
        <ConsultationBookingModal
          astrologer={selectedAstrologerForBooking}
          onClose={() => setSelectedAstrologerForBooking(null)}
        />
      )}

      {isCartOpen && (
        <AstroCartModal
          cartItems={cartItems}
          onClose={() => setIsCartOpen(false)}
          onUpdateQty={handleUpdateQty}
          onRemove={handleRemoveItem}
          onClear={handleClearCart}
        />
      )}
    </div>
  );
};

// Helper internal lock icon
const LockSecurityIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);
