import React, { useState } from 'react';
import { AstroHeaderNav } from '../../components/astrology/AstroHeaderNav';
import { ZODIAC_SIGNS } from '../../utils/astrologyCalculators';
import { Gem, Sparkles, ShieldCheck, CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface GemstoneData {
  nameHi: string;
  nameEn: string;
  planetHi: string;
  suitableSigns: string[];
  fingerHi: string;
  metalHi: string;
  dayHi: string;
  mantra: string;
  benefitsHi: string;
  cautionHi: string;
  imageUrl: string;
}

export const GemstonePage: React.FC = () => {
  const [selectedObjective, setSelectedObjective] = useState<string>('career');

  const gemstonesList: GemstoneData[] = [
    {
      nameHi: 'माणिक्य (Ruby)',
      nameEn: 'Ruby',
      planetHi: 'सूर्य (Sun)',
      suitableSigns: ['सिंह (Leo)', 'मेष (Aries)', 'धनु (Sagittarius)'],
      fingerHi: 'अनामिका (Ring finger)',
      metalHi: 'स्वर्ण या तांबा (Gold / Copper)',
      dayHi: 'रविवार (प्रातःकाल सूर्योदय के समय)',
      mantra: 'ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः (108 बार)',
      benefitsHi: 'सरकारी नौकरी, प्रशासनिक पद, नेत्र ज्योति, आत्म-सम्मान और पिता से मधुर संबंध।',
      cautionHi: 'शनि की राशि (मकर, कुंभ) वाले जातक बिना ज्योतिषी परामर्श के न पहनें।',
      imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80'
    },
    {
      nameHi: 'पीला पुखराज (Yellow Sapphire)',
      nameEn: 'Yellow Sapphire',
      planetHi: 'बृहस्पति / गुरु (Jupiter)',
      suitableSigns: ['धनु (Sagittarius)', 'मीन (Pisces)', 'मेष (Aries)', 'कर्क (Cancer)'],
      fingerHi: 'तर्जनी (Index finger)',
      metalHi: 'स्वर्ण या पीतल (Gold / Brass)',
      dayHi: 'गुरुवार (प्रातःकाल)',
      mantra: 'ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः (108 बार)',
      benefitsHi: 'विवाह में शीघ्रता, ज्ञान, उच्च शिक्षा, संतान सुख, आध्यात्मिक उन्नति और विपुल धन।',
      cautionHi: 'अत्यंत सात्विक रत्न है, धारण करने के बाद आचरण पवित्र रखें।',
      imageUrl: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&q=80'
    },
    {
      nameHi: 'पन्ना (Emerald)',
      nameEn: 'Emerald',
      planetHi: 'बुध (Mercury)',
      suitableSigns: ['मिथुन (Gemini)', 'कन्या (Virgo)', 'वृषभ (Taurus)', 'तुला (Libra)'],
      fingerHi: 'कनिष्ठिका (Little finger)',
      metalHi: 'स्वर्ण या चांदी (Gold / Silver)',
      dayHi: 'बुधवार (प्रातःकाल)',
      mantra: 'ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः (108 बार)',
      benefitsHi: 'व्यापार में लाभ, शेयर बाजार में सफलता, भाषण कला, तीव्र बुद्धि और स्मरण शक्ति।',
      cautionHi: 'टूटा या जालीदार पन्ना कभी न पहनें, पूर्ण पारदर्शी व चमकदार होना चाहिए।',
      imageUrl: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=400&q=80'
    },
    {
      nameHi: 'सच्चा मोती (Natural Pearl)',
      nameEn: 'Natural Pearl',
      planetHi: 'चन्द्रमा (Moon)',
      suitableSigns: ['कर्क (Cancer)', 'मीन (Pisces)', 'वृश्चिक (Scorpio)'],
      fingerHi: 'कनिष्ठिका (Little finger)',
      metalHi: 'शुद्ध चांदी (Pure Silver)',
      dayHi: 'सोमवार (सायंकाल)',
      mantra: 'ॐ श्रां श्रीं श्रौं सः चन्द्रमसे नमः (108 बार)',
      benefitsHi: 'मानसिक शांति, अनिद्रा से मुक्ति, क्रोध नियंत्रण और माता का स्वास्थ्य सुधार।',
      cautionHi: 'गोमेद या लहसुनिया के साथ मोती कभी धारण न करें।',
      imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80'
    },
    {
      nameHi: 'लाल मूंगा (Red Coral)',
      nameEn: 'Red Coral',
      planetHi: 'मंगल (Mars)',
      suitableSigns: ['मेष (Aries)', 'वृश्चिक (Scorpio)', 'धनु (Sagittarius)', 'सिंह (Leo)'],
      fingerHi: 'अनामिका (Ring finger)',
      metalHi: 'सोना या तांबा (Gold / Copper)',
      dayHi: 'मंगलवार (प्रातःकाल)',
      mantra: 'ॐ क्रां क्रीं क्रौं सः भौमाय नमः (108 बार)',
      benefitsHi: 'साहस, आत्मविश्वास, रक्त विकार से मुक्ति, भूमि-भवन लाभ और मांगलिक दोष शांति।',
      cautionHi: 'उच्च रक्तचाप वाले जातक ज्योतिषी से जांच कराकर ही पहनें।',
      imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80'
    },
    {
      nameHi: 'नीलम (Blue Sapphire)',
      nameEn: 'Blue Sapphire',
      planetHi: 'शनि (Saturn)',
      suitableSigns: ['मकर (Capricorn)', 'कुंभ (Aquarius)', 'वृषभ (Taurus)', 'तुला (Libra)'],
      fingerHi: 'मध्यमा (Middle finger)',
      metalHi: 'पंचधातु या अष्टधातु (Panchdhatu)',
      dayHi: 'शनिवार (सूर्यास्त के उपरांत)',
      mantra: 'ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः (108 बार)',
      benefitsHi: 'अथाह धन संपदा, अचानक भाग्योदय, दीर्घायु, उद्योग व राजनीतिक प्रभुत्व।',
      cautionHi: 'अत्यंत तीव्र प्रभाव वाला रत्न है। पहनने से पहले 3 दिन तक तकिये के नीचे रखकर परीक्षण करें।',
      imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&q=80'
    }
  ];

  return (
    <div style={{ background: '#090E17', color: '#F8FAFC', minHeight: '100vh', paddingBottom: '80px' }}>
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
            <Gem size={14} color="#EC4899" /> वेदोक्त रत्न विज्ञान एवं धारण विधान
          </div>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', color: '#FDE68A', margin: '0 0 8px', fontWeight: 800 }}>
            रत्न सुझाव एवं धारण विधि (Gemstones Guide)
          </h1>
          <p style={{ color: '#CBD5E1', fontSize: '14px', margin: 0 }}>
            अपनी राशि, लग्न एवं जीवन उद्देश्य के अनुसार शुभ रत्न जानें, साथ ही धारण करने की शुद्धिकरण विधि व मंत्र।
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1240px', margin: '30px auto 0', padding: '0 16px' }}>
        {/* Shuddhikaran Ritual Card */}
        <div style={{
          background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
          borderRadius: '20px',
          padding: '24px',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
          marginBottom: '32px'
        }}>
          <h3 style={{ margin: '0 0 12px', fontSize: '18px', color: '#FDE68A', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="#F59E0B" /> रत्न धारण करने की 5 पवित्र वेदोक्त चरण (Shuddhikaran Vidhi)
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', fontSize: '12px' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px' }}>
              <strong style={{ color: '#FDE68A', display: 'block', marginBottom: '4px' }}>१. पंचामृत स्नान</strong>
              अंगूठी को कच्चे गाय के दूध, गंगाजल, शहद, शक्कर और तुलसी पत्र के मिश्रण में 1 घंटे तक रखें।
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px' }}>
              <strong style={{ color: '#FDE68A', display: 'block', marginBottom: '4px' }}>२. गंगाजल से प्रक्षालन</strong>
              पंचामृत से निकालकर शुद्ध गंगाजल से धोएं और स्वच्छ लाल या पीले वस्त्र पर स्थापित करें।
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px' }}>
              <strong style={{ color: '#FDE68A', display: 'block', marginBottom: '4px' }}>३. धूप-दीप एवं तिलक</strong>
              चंदन या कुमकुम का तिलक लगाएं, अगरबत्ती और शुद्ध गाय के घी का दीपक जलाकर आरती करें।
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px' }}>
              <strong style={{ color: '#FDE68A', display: 'block', marginBottom: '4px' }}>४. 108 बार बीज मंत्र</strong>
              उस ग्रह के विशिष्ट बीज मंत्र का कम से कम 108 बार (एक माला) पूरी श्रद्धा से जप करें।
            </div>
          </div>
        </div>

        {/* Gemstone Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '24px'
        }}>
          {gemstonesList.map((gem, idx) => (
            <div
              key={idx}
              style={{
                background: '#1E293B',
                borderRadius: '20px',
                padding: '24px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', gap: '14px', marginBottom: '16px' }}>
                  <img
                    src={gem.imageUrl}
                    alt={gem.nameHi}
                    style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover', border: '1px solid #F59E0B' }}
                  />
                  <div>
                    <h3 style={{ margin: '0 0 4px', fontSize: '18px', color: '#FDE68A', fontWeight: 800 }}>
                      {gem.nameHi}
                    </h3>
                    <div style={{ fontSize: '12px', color: '#CBD5E1' }}>
                      शासक ग्रह: <strong style={{ color: '#FFFFFF' }}>{gem.planetHi}</strong>
                    </div>
                    <div style={{ fontSize: '11px', color: '#A7F3D0', marginTop: '4px' }}>
                      अनुकूल राशियां: {gem.suitableSigns.join(', ')}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', background: '#0F172A', padding: '12px', borderRadius: '10px', fontSize: '12px', marginBottom: '14px' }}>
                  <div>
                    <span style={{ color: '#94A3B8' }}>धारण उंगली:</span>
                    <div style={{ fontWeight: 600, color: '#FFFFFF' }}>{gem.fingerHi}</div>
                  </div>
                  <div>
                    <span style={{ color: '#94A3B8' }}>उचित धातु:</span>
                    <div style={{ fontWeight: 600, color: '#FFFFFF' }}>{gem.metalHi}</div>
                  </div>
                  <div>
                    <span style={{ color: '#94A3B8' }}>शुभ दिन:</span>
                    <div style={{ fontWeight: 600, color: '#FFFFFF' }}>{gem.dayHi}</div>
                  </div>
                  <div>
                    <span style={{ color: '#94A3B8' }}>बीज मंत्र:</span>
                    <div style={{ fontWeight: 600, color: '#FDE68A', fontSize: '11px' }}>{gem.mantra}</div>
                  </div>
                </div>

                <div style={{ fontSize: '12px', color: '#CBD5E1', lineHeight: 1.5, marginBottom: '8px' }}>
                  <strong style={{ color: '#10B981' }}>मुख्य लाभ:</strong> {gem.benefitsHi}
                </div>

                <div style={{ fontSize: '11px', color: '#FCA5A5', background: 'rgba(239, 68, 68, 0.08)', padding: '8px', borderRadius: '6px' }}>
                  <strong>सावधानी:</strong> {gem.cautionHi}
                </div>
              </div>

              <div style={{ marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '14px' }}>
                <Link
                  to="/astrology/store"
                  style={{
                    background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
                    color: '#FFFFFF',
                    padding: '10px 18px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    textDecoration: 'none'
                  }}
                >
                  <ShoppingBag size={16} /> प्रमाणित रत्न एस्ट्रो स्टोर से खरीदें
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
