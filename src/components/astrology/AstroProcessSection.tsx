import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Compass, 
  Users, 
  Gem, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  ChevronRight
} from 'lucide-react';

interface ProcessStep {
  id: number;
  stepNumber: string;
  titleHi: string;
  titleEn: string;
  subtitleHi: string;
  icon: React.ReactNode;
  accentColor: string;
  bgGlow: string;
  descriptionHi: string;
  highlights: string[];
  ctaText: string;
  ctaLink: string;
}

export const AstroProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps: ProcessStep[] = [
    {
      id: 1,
      stepNumber: '01',
      titleHi: 'जन्म विवरण प्रविष्टि',
      titleEn: 'Enter Birth Coordinates',
      subtitleHi: 'नाम, जन्मतिथि, सटीक समय व स्थान दर्ज करें',
      icon: <Calendar size={28} color="#F59E0B" />,
      accentColor: '#F59E0B',
      bgGlow: 'rgba(245, 158, 11, 0.15)',
      descriptionHi: 'अपनी या अपने स्वजन की जन्म तिथि, समय (घंटा, मिनट) और जन्म स्थान दर्ज करें। हमारा स्मार्ट अल्गोरिदम विश्व के किसी भी नगर का सटीक अक्षांश, देशांतर और समयक्षेत्र स्वतः जोड़ता है।',
      highlights: [
        '100% एंड-टू-एंड डेटा गोपनीयता एवं एन्क्रिप्शन',
        'वैश्विक नगर डेटाबेस (Global Lat/Long Database)',
        'एक क्लिक में त्वरित प्रविष्टि (Quick Preset Suggestions)',
        'बिना किसी पंजीकरण के तत्काल निःशुल्क गणना'
      ],
      ctaText: 'जन्म कुंडली बनाएं',
      ctaLink: '/astrology/kundli'
    },
    {
      id: 2,
      stepNumber: '02',
      titleHi: 'सटीक वेदोक्त गणित',
      titleEn: 'Mathematical Vedic Engine',
      subtitleHi: 'लग्न, 9 ग्रह, भाव एवं विंशोत्तरी दशा की गणना',
      icon: <Compass size={28} color="#3B82F6" />,
      accentColor: '#3B82F6',
      bgGlow: 'rgba(59, 130, 246, 0.15)',
      descriptionHi: 'प्राचीन महर्षि पराशर सिद्धांत पर आधारित हमारा गणितीय इंजन शून्य-त्रुटि के साथ लग्न चक्र, चंद्र राशि, 27 नक्षत्र, 120 वर्षीय विंशोत्तरी महादशा, बुधादित्य/गजकेसरी राजयोग तथा 36 गुण अष्टकूट मिलान की गणना करता है।',
      highlights: [
        'इंटरैक्टिव उत्तर भारतीय डायमंड SVG चक्र',
        'किसी भी भाव पर क्लिक कर भाव स्वामी व कारकत्व देखें',
        'ग्रह स्थिति: अंश, नक्षत्र, उच्च/नीच व मैत्री अवस्था',
        'पारंपरिक श्लोकबद्ध जन्म पत्रिका प्रमाण-पत्र'
      ],
      ctaText: '36 गुण मिलान जांचें',
      ctaLink: '/astrology/matching'
    },
    {
      id: 3,
      stepNumber: '03',
      titleHi: 'विशेषज्ञ ज्योतिषी परामर्श',
      titleEn: 'Verified Consultation',
      subtitleHi: 'लाइव चैट, ऑडियो या एचडी वीडियो पर सीधा संवाद',
      icon: <Users size={28} color="#10B981" />,
      accentColor: '#10B981',
      bgGlow: 'rgba(16, 185, 129, 0.15)',
      descriptionHi: '15+ वर्षों से अधिक अनुभवी, गुरुकुल-प्रशिक्षित शीर्ष वैदिक ज्योतिषाचार्यों, टैरो रीडर्स और अंक ज्योतिषियों से सीधा परामर्श लें। करियर, विवाह, स्वास्थ्य और व्यापारिक समस्याओं का सटीक मार्गदर्शन पाएं।',
      highlights: [
        'लाइव चैट सिमुलेटर एवं तत्काल उत्तर सुविधा',
        'गोपनीय 1-ऑन-1 ऑडियो एवं वीडियो परामर्श स्लॉट्स',
        'पारदर्शी प्रति-मिनट या सत्र आधारित दरें',
        'सत्र उपरांत लिखित परामर्श सारांश व मार्गदर्शन'
      ],
      ctaText: 'ज्योतिषी से परामर्श लें',
      ctaLink: '/astrology/astrologers'
    },
    {
      id: 4,
      stepNumber: '04',
      titleHi: 'प्रमाणित उपाय व परिणाम',
      titleEn: 'Certified Remedies & Delivery',
      subtitleHi: 'लैब-प्रमाणित रत्न, रुद्राक्ष एवं जीवन-पर्यंत मार्गदर्शन',
      icon: <Gem size={28} color="#EC4899" />,
      accentColor: '#EC4899',
      bgGlow: 'rgba(236, 72, 153, 0.15)',
      descriptionHi: 'कुंडली के कमजोर शुभ ग्रहों को बलवान करने के लिए 100% प्राकृतिक एवं लैब-प्रमाणित नवरत्न, सिद्ध रुद्राक्ष, श्रीयंत्र और लाल किताब के सरल उपाय सीधे आपके पते पर सुरक्षित और प्राण-प्रतिष्ठित भेजे जाते हैं।',
      highlights: [
        'सरकारी मान्यता प्राप्त लैब टेस्टिंग सर्टिफिकेट',
        'मंत्रों द्वारा सिद्ध एवं प्राण-प्रतिष्ठित उत्पाद',
        'पहनने की सटीक विधि, शुभ दिन, अंगुली व बीज मंत्र',
        'सुरक्षित कूरियर डिलीवरी एवं आजीवन प्रामाणिकता गारंटी'
      ],
      ctaText: 'एस्ट्रो स्टोर देखें',
      ctaLink: '/astrology/store'
    }
  ];

  const currentStep = steps.find(s => s.id === activeStep) || steps[0];

  return (
    <section id="astrology-process" style={{
      maxWidth: '1240px',
      margin: '0 auto 70px',
      padding: '0 16px',
      position: 'relative'
    }}>
      {/* Header Banner */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(245, 158, 11, 0.12)',
          border: '1px solid rgba(245, 158, 11, 0.35)',
          padding: '6px 16px',
          borderRadius: '999px',
          fontSize: '12px',
          color: '#FDE68A',
          fontWeight: 700,
          marginBottom: '12px',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          <Sparkles size={14} color="#F59E0B" />
          कार्यप्रणाली • How Our Platform Works
        </div>
        <h2 style={{
          fontSize: 'clamp(24px, 4vw, 36px)',
          fontWeight: 800,
          color: '#FFFFFF',
          margin: '0 0 10px'
        }}>
          सरल एवं प्रामाणिक <span style={{
            background: 'linear-gradient(135deg, #FDE68A 0%, #F59E0B 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>4-चरणीय वैदिक कार्यप्रवाह</span>
        </h2>
        <p style={{
          fontSize: '15px',
          color: '#94A3B8',
          maxWidth: '680px',
          margin: '0 auto',
          lineHeight: 1.6
        }}>
          जन्म विवरण से लेकर संपूर्ण फलादेश, ज्योतिषी परामर्श और लैब-सर्टिफाइड उपायों तक की पारदर्शी और सुरक्षित डिजिटल यात्रा।
        </p>
      </div>

      {/* Step Selector Horizontal Pills */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '14px',
        marginBottom: '28px'
      }}>
        {steps.map((step) => {
          const isActive = step.id === activeStep;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              style={{
                background: isActive 
                  ? `linear-gradient(135deg, #1E293B 0%, #0F172A 100%)`
                  : 'rgba(15, 23, 42, 0.65)',
                border: isActive 
                  ? `2px solid ${step.accentColor}`
                  : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '18px 20px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                boxShadow: isActive ? `0 10px 25px ${step.bgGlow}` : 'none'
              }}
            >
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: isActive ? step.bgGlow : 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${isActive ? step.accentColor : 'rgba(255, 255, 255, 0.1)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {step.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  color: isActive ? step.accentColor : '#64748B',
                  letterSpacing: '1px'
                }}>
                  चरण {step.stepNumber}
                </div>
                <div style={{
                  fontSize: '15px',
                  fontWeight: 700,
                  color: isActive ? '#FFFFFF' : '#CBD5E1',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {step.titleHi}
                </div>
              </div>
              <ChevronRight size={18} color={isActive ? step.accentColor : '#475569'} />
            </button>
          );
        })}
      </div>

      {/* Active Step Detailed Focus Card */}
      <div style={{
        background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
        border: `1px solid ${currentStep.accentColor}`,
        borderRadius: '24px',
        padding: '36px 32px',
        boxShadow: `0 20px 45px ${currentStep.bgGlow}`,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '32px',
        alignItems: 'center'
      }}>
        {/* Left Column: Descriptions & Action */}
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: currentStep.accentColor,
            fontSize: '13px',
            fontWeight: 800,
            marginBottom: '8px'
          }}>
            <span>चरण {currentStep.stepNumber}</span>
            <span>•</span>
            <span>{currentStep.titleEn}</span>
          </div>

          <h3 style={{
            fontSize: '28px',
            fontWeight: 800,
            color: '#FFFFFF',
            margin: '0 0 10px'
          }}>
            {currentStep.titleHi}
          </h3>

          <p style={{
            fontSize: '15px',
            color: '#CBD5E1',
            lineHeight: 1.7,
            margin: '0 0 24px'
          }}>
            {currentStep.descriptionHi}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
            <Link
              to={currentStep.ctaLink}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: `linear-gradient(135deg, ${currentStep.accentColor} 0%, #D97706 100%)`,
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '14px',
                padding: '12px 24px',
                borderRadius: '12px',
                textDecoration: 'none',
                boxShadow: `0 8px 20px ${currentStep.bgGlow}`,
                transition: 'transform 0.2s ease'
              }}
            >
              {currentStep.ctaText} <ArrowRight size={16} />
            </Link>

            <span style={{ fontSize: '13px', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} color="#10B981" /> 100% वेदोक्त एवं सुरक्षित
            </span>
          </div>
        </div>

        {/* Right Column: Highlights Checklist */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.75)',
          borderRadius: '20px',
          padding: '24px 28px',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div style={{
            fontSize: '13px',
            fontWeight: 700,
            color: '#FDE68A',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Sparkles size={16} color="#F59E0B" /> मुख्य विशेषताएँ एवं लाभ
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {currentStep.highlights.map((point, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: currentStep.bgGlow,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px'
                }}>
                  <CheckCircle2 size={14} color={currentStep.accentColor} />
                </div>
                <span style={{ fontSize: '14px', color: '#E2E8F0', lineHeight: 1.5 }}>
                  {point}
                </span>
              </div>
            ))}
          </div>

          {/* Guarantee Footer */}
          <div style={{
            marginTop: '20px',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12px',
            color: '#94A3B8'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Lock size={14} color="#F59E0B" /> एसएसएल 256-बिट सुरक्षित
            </span>
            <span style={{ color: '#A7F3D0' }}>
              पारदर्शी एवं सटीक गणना
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
