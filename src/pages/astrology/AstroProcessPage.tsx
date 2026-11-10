import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AstroHeaderNav } from '../../components/astrology/AstroHeaderNav';
import { AstroProcessSection } from '../../components/astrology/AstroProcessSection';
import { 
  Sparkles, 
  Compass, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  Calendar, 
  Users, 
  Gem, 
  FileText, 
  HelpCircle,
  Clock,
  PhoneCall,
  Download,
  Share2,
  Award
} from 'lucide-react';

export const AstroProcessPage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Live Interactive Process Simulator State
  const [simName, setSimName] = useState('राहुल शर्मा');
  const [simDate, setSimDate] = useState('1995-10-15');
  const [simTime, setSimTime] = useState('08:30');
  const [simPlace, setSimPlace] = useState('नई दिल्ली');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStage, setProcessStage] = useState(0); // 0: idle, 1: coordinates, 2: planetary, 3: dasha/yoga, 4: done
  const [processResult, setProcessResult] = useState<any | null>(null);

  const handleRunProcess = () => {
    setIsProcessing(true);
    setProcessStage(1);
    setProcessResult(null);

    setTimeout(() => {
      setProcessStage(2);
    }, 600);

    setTimeout(() => {
      setProcessStage(3);
    }, 1200);

    setTimeout(() => {
      setProcessStage(4);
      setIsProcessing(false);
      setProcessResult({
        name: simName || 'जातक',
        lagna: 'तुला लग्न (Libra)',
        rashi: 'मिथुन राशि (Gemini)',
        nakshatra: 'आर्द्रा नक्षत्र (Ardra)',
        activeDasha: 'बृहस्पति महादशा (Jupiter MD)',
        rajYoga: 'बुधादित्य राजयोग एवं गजकेसरी योग',
        luckyGem: 'सफेद पुखराज / ओपल (White Sapphire / Opal)',
        assignedAstrologer: 'आचार्य देवेन्द्र शास्त्री (18 वर्ष अनुभव, स्वर्ण पदक)',
        compatibilityScore: '32/36 गुण (अति उत्तम मिलान)',
        token: `AD-ASTRO-${Math.floor(100000 + Math.random() * 900000)}`
      });
    }, 1800);
  };

  const processFaqs = [
    {
      q: 'मेरी जन्म जानकारी कितनी सुरक्षित और गोपनीय है?',
      a: 'आपकी जन्म तिथि, जन्म समय, नाम और जन्म स्थान पूर्णतया 256-बिट एसएसएल एन्क्रिप्शन द्वारा सुरक्षित हैं। हम आपकी जानकारी कभी भी किसी तृतीय पक्ष (Third-Party) को साझा नहीं करते। परामर्श के दौरान ज्योतिषी केवल कुंडली फलादेश के लिए इसका उपयोग करते हैं।'
    },
    {
      q: 'यदि मुझे अपना सटीक जन्म समय ज्ञात न हो, तो क्या फलादेश संभव है?',
      a: 'हां, यदि सटीक समय ज्ञात न हो तो हमारे विद्वान ज्योतिषाचार्य हस्तरेखा, प्रश्न कुंडली (Prashna Kundli) अथवा जन्म समय शोधन (Birth Time Rectification - BTR) पद्धति द्वारा आपकी सटीक जन्म लग्न का निर्धारण कर सकते हैं।'
    },
    {
      q: '36 गुण मिलान में न्यूनतम कितने गुण शुभ माने जाते हैं?',
      a: 'वैदिक ज्योतिष में 36 में से 18 या अधिक गुणों का मिलना विवाह के लिए न्यूनतम ग्राह्य माना जाता है। 18 से 24 गुण मध्यम, 25 से 32 गुण उत्तम, और 33 से 36 गुण अति-उत्तम माने जाते हैं। इसके साथ ही नाड़ी दोष एवं मांगलिक विचार भी अनिवार्य रूप से किया जाता है।'
    },
    {
      q: 'क्या एस्ट्रो स्टोर के सभी रत्न असली और सर्टिफाइड हैं?',
      a: 'हां, हमारे सभी 9 नवरत्न एवं उपरत्न 100% प्राकृतिक, अप्रशोधित (Unheated/Untreated) और ISO-मान्यता प्राप्त सरकारी पंजीकृत जेमोलॉजिकल प्रयोगशाला द्वारा प्रमाणित होते हैं। प्रत्येक रत्न के साथ मूल लैब टेस्टिंग सर्टिफिकेट भेजा जाता है।'
    },
    {
      q: 'ज्योतिषी से ऑनलाइन परामर्श कैसे काम करता है?',
      a: 'आप डायरेक्टरी से अपनी पसंद के ज्योतिषाचार्य का चयन कर "चैट करें" या "कॉल बुक करें" चुन सकते हैं। लाइव चैट में तत्काल संवाद होता है, जबकि ऑडियो/वीडियो स्लॉट बुकिंग में आपको निर्धारित समय पर सीधा लिंक व टोकन मिलता है।'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#090E17', color: '#F8FAFC', paddingBottom: '80px' }}>
      {/* Sticky Secondary Celestial Header */}
      <AstroHeaderNav />

      {/* Hero Header */}
      <section style={{
        position: 'relative',
        padding: '60px 16px 50px',
        background: 'radial-gradient(ellipse at top, #1E1B4B 0%, #0F172A 60%, #090E17 100%)',
        borderBottom: '1px solid rgba(245, 158, 11, 0.2)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(245, 158, 11, 0.15)',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            padding: '6px 16px',
            borderRadius: '999px',
            fontSize: '12px',
            color: '#FDE68A',
            fontWeight: 700,
            marginBottom: '16px'
          }}>
            <Sparkles size={14} color="#F59E0B" />
            पारदर्शी वैदिक प्रक्रिया • Transparent Vedic Workflow
          </div>

          <h1 style={{
            fontSize: 'clamp(28px, 5vw, 44px)',
            fontWeight: 800,
            lineHeight: 1.25,
            margin: '0 0 16px',
            background: 'linear-gradient(135deg, #FFFBEB 0%, #FDE68A 50%, #F59E0B 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            हमारी कार्यप्रणाली: जन्म विवरण से सटीक मार्गदर्शन तक
          </h1>

          <p style={{
            fontSize: '16px',
            color: '#CBD5E1',
            maxWidth: '720px',
            margin: '0 auto 28px',
            lineHeight: 1.7
          }}>
            जानिए किस प्रकार हमारे वैदिक गणितीय एल्गोरिदम, 15+ वर्ष अनुभवी गुरुकुल प्रशिक्षित ज्योतिषाचार्य और 100% लैब-प्रमाणित रत्न आपके जीवन के हर प्रश्न का समाधान प्रस्तुत करते हैं।
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px' }}>
            <Link
              to="/astrology/kundli"
              style={{
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                color: '#FFFFFF',
                padding: '12px 24px',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '14px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 8px 25px rgba(245, 158, 11, 0.35)'
              }}
            >
              <Compass size={18} /> निःशुल्क जन्म कुंडली बनाएं
            </Link>

            <Link
              to="/astrology/astrologers"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#FDE68A',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                padding: '12px 24px',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '14px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <PhoneCall size={18} /> ज्योतिषी से परामर्श लें
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Interactive Live Process Simulator Card */}
      <section style={{ maxWidth: '1240px', margin: '-30px auto 50px', padding: '0 16px', position: 'relative', zIndex: 10 }}>
        <div style={{
          background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
          borderRadius: '24px',
          padding: '32px',
          border: '2px solid rgba(245, 158, 11, 0.4)',
          boxShadow: '0 20px 45px rgba(0, 0, 0, 0.6)'
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', gap: '12px' }}>
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#F59E0B',
                fontSize: '12px',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '6px'
              }}>
                <Sparkles size={14} /> लाइव प्रोसेस सिमुलेटर • Interactive Pipeline Runner
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                एक क्लिक में संपूर्ण वेदोक्त प्रक्रिया का परीक्षण करें
              </h2>
            </div>

            <div style={{
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid #10B981',
              color: '#A7F3D0',
              padding: '6px 14px',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
              इंजन सक्रिय (Engine Ready)
            </div>
          </div>

          {/* Form Input Matrix */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#94A3B8', display: 'block', marginBottom: '6px' }}>
                जातक का नाम (Full Name)
              </label>
              <input
                type="text"
                value={simName}
                onChange={(e) => setSimName(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#94A3B8', display: 'block', marginBottom: '6px' }}>
                जन्म तिथि (Birth Date)
              </label>
              <input
                type="date"
                value={simDate}
                onChange={(e) => setSimDate(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#94A3B8', display: 'block', marginBottom: '6px' }}>
                जन्म समय (Birth Time)
              </label>
              <input
                type="time"
                value={simTime}
                onChange={(e) => setSimTime(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#94A3B8', display: 'block', marginBottom: '6px' }}>
                जन्म स्थान (Birth City)
              </label>
              <input
                type="text"
                value={simPlace}
                onChange={(e) => setSimPlace(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Action Button: PROCESS */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <button
              onClick={handleRunProcess}
              disabled={isProcessing}
              style={{
                background: isProcessing
                  ? 'rgba(245, 158, 11, 0.5)'
                  : 'linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%)',
                color: '#FFFFFF',
                border: '2px solid #FDE68A',
                borderRadius: '16px',
                padding: '16px 40px',
                fontSize: '16px',
                fontWeight: 800,
                cursor: isProcessing ? 'not-allowed' : 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 10px 30px rgba(245, 158, 11, 0.4)',
                letterSpacing: '0.5px',
                transition: 'all 0.2s ease'
              }}
            >
              {isProcessing ? (
                <>
                  <div style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    border: '2px solid #FFFFFF',
                    borderTopColor: 'transparent',
                    animation: 'spin 1s linear infinite'
                  }} />
                  <span>वैदिक इंजन गणना प्रोसेस कर रहा है...</span>
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  <span>PROCESS NOW • संपूर्ण प्रक्रिया प्रारंभ करें</span>
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </div>

          {/* Live Progress Stage Stepper */}
          {isProcessing && (
            <div style={{
              background: 'rgba(15, 23, 42, 0.9)',
              borderRadius: '16px',
              padding: '20px',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '12px' }}>
                <div style={{ height: '6px', borderRadius: '4px', background: processStage >= 1 ? '#F59E0B' : 'rgba(255, 255, 255, 0.1)' }} />
                <div style={{ height: '6px', borderRadius: '4px', background: processStage >= 2 ? '#3B82F6' : 'rgba(255, 255, 255, 0.1)' }} />
                <div style={{ height: '6px', borderRadius: '4px', background: processStage >= 3 ? '#10B981' : 'rgba(255, 255, 255, 0.1)' }} />
                <div style={{ height: '6px', borderRadius: '4px', background: processStage >= 4 ? '#EC4899' : 'rgba(255, 255, 255, 0.1)' }} />
              </div>
              <div style={{ fontSize: '14px', color: '#FDE68A', fontWeight: 600, textAlign: 'center' }}>
                {processStage === 1 && 'चरण 1: अक्षांश व देशांतर समन्वय तथा स्थानीय समयशोधन (28.6139° N, 77.2090° E)...'}
                {processStage === 2 && 'चरण 2: तात्कालिक लग्न व 9 ग्रहों के स्पष्ट देशांतर निर्धारण (तुला लग्न, मिथुन चंद्र)...'}
                {processStage === 3 && 'चरण 3: 120-वर्षीय विंशोत्तरी महादशा एवं बुधादित्य/गजकेसरी राजयोग विश्लेषण...'}
                {processStage === 4 && 'चरण 4: प्रमाणित ज्योतिषाचार्य मैपिंग एवं अंतिम वेदोक्त परिणाम तैयार...'}
              </div>
            </div>
          )}

          {/* Process Result Output Card */}
          {processResult && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)',
              border: '2px solid #10B981',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 15px 35px rgba(16, 185, 129, 0.2)',
              animation: 'fadeIn 0.4s ease'
            }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(16, 185, 129, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <CheckCircle2 size={20} color="#10B981" />
                  </div>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF' }}>
                      वेदोक्त प्रक्रिया सफलतापूर्वक पूर्ण • Process Output Generated
                    </div>
                    <div style={{ fontSize: '12px', color: '#94A3B8' }}>
                      टोकन संख्या: {processResult.token} | जातक: {processResult.name}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <Link
                    to={`/astrology/certificate?id=${processResult.token}`}
                    style={{
                      background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontWeight: 700,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Award size={14} /> प्रमाण-पत्र व PDF
                  </Link>

                  <Link
                    to="/astrology/kundli"
                    style={{
                      background: 'rgba(245, 158, 11, 0.2)',
                      color: '#FDE68A',
                      border: '1px solid #F59E0B',
                      padding: '8px 16px',
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontWeight: 700,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Compass size={14} /> पूरी जन्म पत्रिका
                  </Link>

                  <Link
                    to="/astrology/astrologers"
                    style={{
                      background: 'rgba(16, 185, 129, 0.2)',
                      color: '#A7F3D0',
                      border: '1px solid #10B981',
                      padding: '8px 16px',
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontWeight: 700,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <PhoneCall size={14} /> ज्योतिषी से परामर्श
                  </Link>
                </div>
              </div>

              {/* Matrix of Computed Results */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '14px',
                background: 'rgba(15, 23, 42, 0.6)',
                padding: '18px',
                borderRadius: '14px',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 700 }}>जन्म लग्न (Ascendant)</div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#FDE68A', marginTop: '2px' }}>{processResult.lagna}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 700 }}>जन्म राशि एवं नक्षत्र</div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#60A5FA', marginTop: '2px' }}>{processResult.rashi} • {processResult.nakshatra}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 700 }}>सक्रिय विंशोत्तरी महादशा</div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#34D399', marginTop: '2px' }}>{processResult.activeDasha}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 700 }}>कुंडली में उपस्थित शुभ योग</div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#F472B6', marginTop: '2px' }}>{processResult.rajYoga}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 700 }}>अनुकूल भाग्य रत्न (Gemstone)</div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#FBBF24', marginTop: '2px' }}>{processResult.luckyGem}</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 700 }}>मैप्ड मुख्य ज्योतिषाचार्य</div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#C084FC', marginTop: '2px' }}>{processResult.assignedAstrologer}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main 4-Step Interactive Process Section */}
      <div>
        <AstroProcessSection />
      </div>

      {/* Workflow Matrix Comparison */}
      <section style={{ maxWidth: '1240px', margin: '0 auto 70px', padding: '0 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#FDE68A', margin: '0 0 8px' }}>
            पारंपरिक बनाम AD Digital वेदोक्त प्रक्रिया
          </h2>
          <p style={{ fontSize: '14px', color: '#94A3B8' }}>
            जानिए क्यों 1,80,000+ से अधिक जातक हमारे डिजिटल प्लेटफॉर्म पर विश्वास करते हैं
          </p>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
          borderRadius: '20px',
          border: '1px solid rgba(245, 158, 11, 0.25)',
          overflow: 'hidden',
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.5)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            padding: '20px 24px',
            background: 'rgba(245, 158, 11, 0.1)',
            borderBottom: '1px solid rgba(245, 158, 11, 0.2)',
            fontWeight: 800,
            fontSize: '15px'
          }}>
            <div style={{ color: '#FDE68A' }}>सुविधा / मापदंड</div>
            <div style={{ color: '#F87171' }}>पारंपरिक व्यवस्था</div>
            <div style={{ color: '#34D399' }}>AD Digital वैदिक प्लेटफॉर्म</div>
          </div>

          {[
            {
              feature: 'कुंडली निर्माण समय',
              traditional: 'पंचांग द्वारा घंटों हाथ से लिखना',
              digital: 'शून्य सेकंड में 100% सटीक गणितीय SVG चक्र'
            },
            {
              feature: 'गणनाओं की सटीकता',
              traditional: 'मानवीय त्रुटियों की संभावना',
              digital: 'शुद्ध वैदिक पराशर अल्गोरिदम (शून्य त्रुटि)'
            },
            {
              feature: 'ज्योतिषी उपलब्धता',
              traditional: 'लंबी प्रतीक्षा व व्यक्तिगत यात्रा',
              digital: '24x7 तत्काल लाइव चैट एवं वीडियो परामर्श'
            },
            {
              feature: 'रत्नों की प्रामाणिकता',
              traditional: 'कांच या उपचारित रत्नों का जोखिम',
              digital: 'सरकारी लैब सर्टिफिकेट एवं आजीवन गारंटी'
            },
            {
              feature: 'दस्तावेज़ एवं प्रमाण-पत्र',
              traditional: 'कागज खोने का डर',
              digital: 'आजीवन क्लाउड स्टोर व प्रिंटेबल PDF सर्टिफिकेट'
            }
          ].map((row, idx) => (
            <div 
              key={idx}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                padding: '16px 24px',
                borderBottom: idx < 4 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                fontSize: '14px',
                alignItems: 'center',
                background: idx % 2 === 1 ? 'rgba(255, 255, 255, 0.02)' : 'transparent'
              }}
            >
              <div style={{ fontWeight: 700, color: '#E2E8F0' }}>{row.feature}</div>
              <div style={{ color: '#94A3B8' }}>{row.traditional}</div>
              <div style={{ color: '#A7F3D0', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="#10B981" /> {row.digital}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions on Process */}
      <section style={{ maxWidth: '960px', margin: '0 auto', padding: '0 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#FDE68A', margin: '0 0 8px' }}>
            कार्यप्रणाली से संबंधित अक्सर पूछे जाने वाले प्रश्न (FAQ)
          </h2>
          <p style={{ fontSize: '14px', color: '#94A3B8' }}>
            आपके हर संशय का समाधान और पारदर्शिता की गारंटी
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {processFaqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                style={{
                  background: '#1E293B',
                  borderRadius: '14px',
                  border: isOpen ? '1px solid #F59E0B' : '1px solid rgba(255, 255, 255, 0.08)',
                  overflow: 'hidden',
                  transition: 'all 0.2s'
                }}
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  style={{
                    width: '100%',
                    padding: '18px 22px',
                    textAlign: 'left',
                    background: 'transparent',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    cursor: 'pointer',
                    color: isOpen ? '#FDE68A' : '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '15px'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <HelpCircle size={18} color={isOpen ? '#F59E0B' : '#64748B'} />
                    {faq.q}
                  </span>
                  <span style={{ fontSize: '20px', color: '#F59E0B' }}>
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div style={{
                    padding: '0 22px 20px',
                    fontSize: '14px',
                    color: '#CBD5E1',
                    lineHeight: 1.7,
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)'
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
