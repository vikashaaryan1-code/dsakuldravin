import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AstroHeaderNav } from '../../components/astrology/AstroHeaderNav';
import { VedicKundliChart } from '../../components/astrology/VedicKundliChart';
import { calculateJanamKundli } from '../../utils/astrologyCalculators';
import { ADCSLogo, ADCSQrCode } from '../../components/branding';
import { printBrandedADCSDocument } from '../../utils/documentBranding';
import {
  Award,
  Search,
  Printer,
  Download,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  FileText,
  ExternalLink,
  Info,
} from 'lucide-react';

export const AstroCertificatePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const queryCert = searchParams.get('id') || searchParams.get('code') || 'KUNDLI-2026-SHREE-8429';

  const [searchCode, setSearchCode] = useState(queryCert);
  const [activeCertType, setActiveCertType] = useState<'kundli' | 'gemstone'>('kundli');
  const [isVerified, setIsVerified] = useState(true);

  React.useEffect(() => {
    if (queryCert) {
      setSearchCode(queryCert);
      setIsVerified(true);
    }
  }, [queryCert]);

  const defaultKundli = calculateJanamKundli({
    fullName: 'राहुल शर्मा',
    gender: 'male',
    dob: '1995-10-15',
    birthTime: '08:30',
    birthPlace: 'नई दिल्ली'
  });

  const sampleKundliData = {
    certId: searchCode || queryCert || 'KUNDLI-2026-SHREE-8429',
    holderName: 'राहुल शर्मा (Rahul Sharma)',
    fatherName: 'श्री सतीश शर्मा',
    dob: '15 अक्टूबर 1995 (रविवार)',
    tob: '08:30:00 AM (प्रातः)',
    pob: 'नई दिल्ली, भारत (28.6139° N, 77.2090° E)',
    ayanamsa: 'लाहिड़ी अयनांश (Lahiri Ayanamsa: 23° 47\' 52")',
    lagna: 'तुला (Libra) • 14° 22\'',
    rashi: 'मिथुन (Gemini) • 08° 45\'',
    nakshatra: 'आर्द्रा (Ardra) • 3 चरण',
    varna: 'विप्र',
    vashya: 'द्विपद',
    yoni: 'श्वान (Dog)',
    gana: 'मनुष्य (Manushya)',
    nadi: 'आदि नाड़ी (Adi Nadi)',
    activeDasha: 'बृहस्पति महादशा में शुक्र अंतर्दशा',
    rajYogas: 'बुधादित्य राजयोग, गजकेसरी योग, शश महापुरुष योग',
    issuedDate: '22 सितम्बर 2026',
    verifiedBy: 'आचार्य देवेन्द्र शास्त्री (स्वर्ण पदक विजेता, वैदिक ज्योतिष संस्थान)'
  };

  const sampleGemData = {
    certId: 'GEM-2026-RUBY-9912',
    gemstone: 'प्राकृतिक माणिक्य (Natural Pigeon Blood Ruby)',
    weightCarat: '4.85 कैरेट (Carat)',
    weightRatti: '5.33 रत्ती (Ratti)',
    origin: 'बर्मा (Myanmar / Old Mine)',
    color: 'गहरा लाल (Pigeon Blood Red)',
    cutShape: 'ओवल मिक्स्ड कट (Oval Mixed Cut)',
    refractiveIndex: '1.762 - 1.770',
    specificGravity: '4.00',
    treatment: '100% प्राकृतिक अप्रशोधित (Unheated & Untreated)',
    beneficPlanet: 'सूर्य देव (Surya / Sun)',
    suitableRashi: 'सिंह राशि (Leo) एवं मेष लग्न',
    testingLab: 'गवर्नमेंट रजिस्टर्ड जेमोलॉजिकल रिसर्च लेबोरेटरी',
    issuedDate: '22 सितम्बर 2026'
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCode.trim()) return;
    setIsVerified(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ minHeight: '100vh', background: '#031126', color: '#F8FAFC', paddingBottom: '80px' }}>
      {/* Sticky Secondary Celestial Header */}
      <AstroHeaderNav />

      {/* Verification Header */}
      <section style={{
        padding: '40px 16px 30px',
        background: 'radial-gradient(ellipse at top, #1E1B4B 0%, #0F172A 60%, #031126 100%)',
        borderBottom: '1px solid rgba(245, 158, 11, 0.2)'
      }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
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
            marginBottom: '12px'
          }}>
            <Award size={14} color="#F59E0B" />
            डिजिटल प्रमाण-पत्र सत्यापन एवं पीडीएफ पोर्टल • Certificate Verification & Acrobat Export
          </div>

          <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: '#FFFFFF', margin: '0 0 10px' }}>
            वेदोक्त जन्म पत्रिका एवं रत्न प्रमाण-पत्र
          </h1>

          <p style={{ fontSize: '14px', color: '#94A3B8', maxWidth: '640px', margin: '0 auto 24px', lineHeight: 1.6 }}>
            अपने प्रमाण-पत्र की प्रामाणिकता जांचें अथवा उच्च-रिज़ॉल्यूशन में प्रिंट / Adobe Acrobat में सहेजें।
          </p>

          {/* Search Certificate Form */}
          <form onSubmit={handleSearch} style={{
            display: 'flex',
            maxWidth: '560px',
            margin: '0 auto 20px',
            background: '#1E293B',
            borderRadius: '14px',
            border: '2px solid rgba(245, 158, 11, 0.4)',
            overflow: 'hidden',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)'
          }}>
            <input
              type="text"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              placeholder="प्रमाण-पत्र संख्या दर्ज करें (उदा. KUNDLI-2026-SHREE-8429)"
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                padding: '14px 18px',
                color: '#FFFFFF',
                fontSize: '14px',
                outline: 'none',
                fontWeight: 600
              }}
            />
            <button
              type="submit"
              style={{
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                color: '#000000',
                border: 'none',
                padding: '0 24px',
                fontWeight: 800,
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Search size={16} /> सत्यापित करें
            </button>
          </form>

          {/* Certificate Type Switcher */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <button
              onClick={() => setActiveCertType('kundli')}
              style={{
                background: activeCertType === 'kundli' ? '#F59E0B' : 'rgba(255, 255, 255, 0.06)',
                color: activeCertType === 'kundli' ? '#000000' : '#CBD5E1',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 18px',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              📜 जन्म पत्रिका प्रमाण-पत्र (Kundli)
            </button>
            <button
              onClick={() => setActiveCertType('gemstone')}
              style={{
                background: activeCertType === 'gemstone' ? '#F59E0B' : 'rgba(255, 255, 255, 0.06)',
                color: activeCertType === 'gemstone' ? '#000000' : '#CBD5E1',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 18px',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              💎 लैब रत्न प्रमाण-पत्र (Gemstone Lab)
            </button>
          </div>
        </div>
      </section>

      {/* Action Toolbar */}
      <div style={{ maxWidth: '960px', margin: '20px auto', padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid #10B981',
          color: '#A7F3D0',
          padding: '6px 14px',
          borderRadius: '999px',
          fontSize: '12px',
          fontWeight: 700
        }}>
          <CheckCircle2 size={16} color="#10B981" />
          सरकारी एवं वैदिक प्रामाणिकता सत्यापित (Digitally Verified & Sealed)
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handlePrint}
            style={{
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '10px',
              padding: '10px 20px',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 6px 15px rgba(16, 185, 129, 0.3)'
            }}
          >
            <Printer size={16} /> प्रिंट करें / Adobe Acrobat में खोलें
          </button>

          <button
            type="button"
            onClick={() =>
              printBrandedADCSDocument({
                title: activeCertType === 'kundli' ? 'प्रामाणिक जन्म चक्र प्रमाण-पत्र (Certified Horoscope)' : 'रत्न शुद्धता एवं प्रामाणिकता प्रमाण-पत्र (Gemstone Lab Certificate)',
                documentType: activeCertType === 'kundli' ? 'ASTROLOGY CERTIFICATE' : 'GEMSTONE LAB REPORT',
                documentNumber: activeCertType === 'kundli' ? sampleKundliData.certId : sampleGemData.certId,
                issuedDate: '2026-09-22',
                verificationUrl: `https://ad-digital.in/astrology/certificate?id=${encodeURIComponent(activeCertType === 'kundli' ? sampleKundliData.certId : sampleGemData.certId)}`,
                rows: [
                  { label: 'Certificate Holder / Native', value: sampleKundliData.holderName },
                  { label: 'Certificate Serial', value: activeCertType === 'kundli' ? sampleKundliData.certId : sampleGemData.certId },
                  { label: 'Issued Organization', value: 'AKUL DRAVIN DIGITAL SERVICES — Vedic Research Desk' },
                  { label: 'Verification Code', value: 'SHA-256: 8F4A-91BC' },
                ],
                notes: ['Official ADCS printed horoscope/gemstone report.'],
              })
            }
            style={{
              background: 'rgba(214, 161, 43, 0.2)',
              color: '#F3D477',
              border: '1px solid rgba(243, 212, 119, 0.5)',
              borderRadius: '10px',
              padding: '10px 16px',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Download size={16} /> PDF डाउनलोड
          </button>
        </div>
      </div>

      {/* Ornate Certificate Presentation Card */}
      <section style={{ maxWidth: '960px', margin: '0 auto', padding: '0 16px' }}>
        <div id="printable-certificate" style={{
          background: '#FFFDF9',
          color: '#1E293B',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)',
          border: '16px solid #8B2500',
          outline: '3px solid #D97706',
          outlineOffset: '-10px',
          position: 'relative',
          fontFamily: 'serif'
        }}>
          {/* Top Sacred Invocation + Official ADCS Logo */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', borderBottom: '2px solid #8B2500', paddingBottom: '16px', marginBottom: '24px' }}>
            <ADCSLogo variant="certificate" height={64} />
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontSize: '20px', color: '#8B2500', fontWeight: 900, letterSpacing: '1.5px' }}>
                卐 || श्री गणेशाय नमः || ॐ
              </div>
              <h2 style={{ fontSize: '24px', color: '#061A36', margin: '6px 0 2px', fontWeight: 900, textTransform: 'uppercase' }}>
                {activeCertType === 'kundli' ? 'अखिल भारतीय वैदिक ज्योतिष शोध संस्थान' : 'जेमोलॉजिकल रिसर्च एवं टेस्टिंग लैबोरेटरी'}
              </h2>
              <div style={{ fontSize: '12px', color: '#55677D', fontWeight: 700 }}>
                AKUL DRAVIN DIGITAL SERVICES (ADCS) • वैदिक प्रमाणन केंद्र
              </div>
              <div style={{
                display: 'inline-block',
                background: '#061A36',
                color: '#F3D477',
                padding: '4px 18px',
                borderRadius: '4px',
                fontSize: '13px',
                fontWeight: 800,
                marginTop: '8px',
                letterSpacing: '0.5px',
                border: '1px solid #D6A12B'
              }}>
                {activeCertType === 'kundli' ? '★ प्रामाणिक जन्म चक्र प्रमाण-पत्र (CERTIFIED HOROSCOPE) ★' : '★ रत्न शुद्धता एवं प्रामाणिकता प्रमाण-पत्र (GEMSTONE CERTIFICATE) ★'}
              </div>
            </div>
          </div>

          {/* Certificate Metadata Strip */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '12px',
            color: '#78350F',
            fontWeight: 700,
            borderBottom: '1px dashed #D97706',
            paddingBottom: '10px',
            marginBottom: '20px'
          }}>
            <div>प्रमाण-पत्र संख्या: <strong>{activeCertType === 'kundli' ? sampleKundliData.certId : sampleGemData.certId}</strong></div>
            <div>जारी करने की तिथि: <strong>22 सितम्बर 2026</strong></div>
            <div>सत्यापन कोड: <strong>SHA-256: 8F4A-91BC</strong></div>
          </div>

          {/* Body: Kundli Certificate View */}
          {activeCertType === 'kundli' && (
            <div>
              {/* Holder Personal Details Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px',
                background: '#FEF3C7',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #F59E0B',
                marginBottom: '24px',
                fontSize: '13px'
              }}>
                <div><strong>जातक का नाम:</strong> {sampleKundliData.holderName}</div>
                <div><strong>पिता का नाम:</strong> {sampleKundliData.fatherName}</div>
                <div><strong>जन्म तिथि:</strong> {sampleKundliData.dob}</div>
                <div><strong>जन्म समय:</strong> {sampleKundliData.tob}</div>
                <div style={{ gridColumn: 'span 2' }}><strong>जन्म स्थान:</strong> {sampleKundliData.pob}</div>
              </div>

              {/* Astrological Parameters */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '10px',
                marginBottom: '24px',
                fontSize: '12px',
                border: '1px solid #E2E8F0',
                padding: '12px',
                borderRadius: '8px'
              }}>
                <div><strong>जन्म लग्न:</strong> {sampleKundliData.lagna}</div>
                <div><strong>जन्म राशि:</strong> {sampleKundliData.rashi}</div>
                <div><strong>जन्म नक्षत्र:</strong> {sampleKundliData.nakshatra}</div>
                <div><strong>वर्ण / वश्य:</strong> {sampleKundliData.varna} / {sampleKundliData.vashya}</div>
                <div><strong>योनि / गण:</strong> {sampleKundliData.yoni} / {sampleKundliData.gana}</div>
                <div><strong>नाड़ी:</strong> {sampleKundliData.nadi}</div>
                <div style={{ gridColumn: 'span 2' }}><strong>सक्रिय विंशोत्तरी दशा:</strong> {sampleKundliData.activeDasha}</div>
                <div style={{ gridColumn: 'span 2' }}><strong>कुंडली में उपस्थित योग:</strong> {sampleKundliData.rajYogas}</div>
              </div>

              {/* Kundli SVG Chart Representation */}
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#8B2500', marginBottom: '10px' }}>
                  || लग्न कुण्डली (प्रथम भाव - तनु भाव) ||
                </div>
                <div style={{ display: 'inline-block', background: '#FFFFFF', padding: '16px', borderRadius: '12px', border: '1px solid #CBD5E1' }}>
                  <VedicKundliChart 
                    houses={defaultKundli.houses} 
                    lagnaSignName={defaultKundli.lagnaRashi.nameHi} 
                    nativeName={defaultKundli.input.fullName} 
                  />
                </div>
              </div>
            </div>
          )}

          {/* Body: Gemstone Certificate View */}
          {activeCertType === 'gemstone' && (
            <div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '14px',
                background: '#FEF3C7',
                padding: '20px',
                borderRadius: '8px',
                border: '1px solid #F59E0B',
                marginBottom: '24px',
                fontSize: '13px'
              }}>
                <div><strong>रत्न का नाम:</strong> {sampleGemData.gemstone}</div>
                <div><strong>कुल वजन:</strong> {sampleGemData.weightCarat} ({sampleGemData.weightRatti})</div>
                <div><strong>उत्पत्ति स्थल:</strong> {sampleGemData.origin}</div>
                <div><strong>रंग एवं शेड:</strong> {sampleGemData.color}</div>
                <div><strong>आकार एवं कटाई:</strong> {sampleGemData.cutShape}</div>
                <div><strong>अपवर्तनांक (R.I.):</strong> {sampleGemData.refractiveIndex}</div>
                <div><strong>विशिष्ट गुरुत्व (S.G.):</strong> {sampleGemData.specificGravity}</div>
                <div><strong>प्राकृतिक शुद्धता:</strong> {sampleGemData.treatment}</div>
                <div><strong>अनुकूल ग्रह:</strong> {sampleGemData.beneficPlanet}</div>
                <div><strong>अनुकूल राशि:</strong> {sampleGemData.suitableRashi}</div>
              </div>

              <div style={{
                background: '#F8FAFC',
                border: '1px solid #CBD5E1',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '24px',
                fontSize: '12px',
                color: '#475569',
                lineHeight: 1.6
              }}>
                <strong>लैब परीक्षण टिप्पणी:</strong> यह रत्न 100% प्राकृतिक कोरन्डम (Natural Corundum) वर्ग का माणिक्य है। स्पेक्ट्रोस्कोपिक, रिफ्रेक्टोमीटर एवं माइक्रोस्कोपिक परीक्षण में किसी भी प्रकार का कृत्रिम रंग, हीट-ट्रीटमेंट अथवा ग्लास-फिलिंग नहीं पाई गई है। यह रत्न वैदिक ज्योतिषीय धारण हेतु सर्वोत्तम एवं पूर्ण प्रभावी है।
              </div>
            </div>
          )}

          {/* Signatures & Seal Section */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderTop: '2px solid #8B2500',
            paddingTop: '24px',
            marginTop: '20px'
          }}>
            {/* Verification QR Code */}
            <div style={{ textAlign: 'center' }}>
              <ADCSQrCode
                value={`https://ad-digital.in/astrology/certificate?id=${encodeURIComponent(activeCertType === 'kundli' ? sampleKundliData.certId : sampleGemData.certId)}`}
                size={68}
                label="डिजिटल सत्यापन क्यूआर"
              />
            </div>

            {/* Official Seal Watermark */}
            <div style={{
              width: '96px',
              height: '96px',
              borderRadius: '50%',
              border: '3px double #061A36',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#061A36',
              fontSize: '10px',
              fontWeight: 800,
              textAlign: 'center',
              background: 'rgba(214, 161, 43, 0.08)',
              padding: '4px',
            }}>
              <ADCSLogo variant="compact" height={34} decorative />
              <span style={{ fontSize: '8.5px', marginTop: '2px' }}>ADCS AUTHORIZED</span>
            </div>

            {/* Authorized Signature */}
            <div style={{ textAlign: 'right', minWidth: '180px' }}>
              <div style={{ fontStyle: 'italic', fontSize: '16px', color: '#8B2500', fontFamily: 'cursive', marginBottom: '4px' }}>
                Devendra Shastri
              </div>
              <div style={{ borderTop: '1px solid #8B2500', paddingTop: '4px', fontSize: '11px', fontWeight: 800, color: '#1E293B' }}>
                आचार्य देवेन्द्र शास्त्री
              </div>
              <div style={{ fontSize: '10px', color: '#64748B' }}>
                मुख्य वेदोक्त ज्योतिषाचार्य एवं प्राधिकृत हस्ताक्षरकर्ता
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructions for Adobe Acrobat */}
      <section style={{ maxWidth: '960px', margin: '30px auto 0', padding: '0 16px' }}>
        <div style={{
          background: '#1E293B',
          borderRadius: '16px',
          padding: '20px 24px',
          border: '1px solid rgba(245, 158, 11, 0.25)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '14px'
        }}>
          <Info size={22} color="#F59E0B" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '13px', color: '#CBD5E1', lineHeight: 1.6 }}>
            <strong style={{ color: '#FDE68A' }}>Adobe Acrobat में खोलने की विधि:</strong> "प्रिंट करें / Adobe Acrobat में खोलें" बटन पर क्लिक करने के बाद प्रिंटर गंतव्य (Destination) में <em>"Save as PDF"</em> चुनें। सेव होने के बाद फ़ाइल पर राइट क्लिक करके <em>"Open with Adobe Acrobat"</em> चुनें ताकि सभी वैदिक ग्राफिक्स, संस्कृत श्लोक एवं क्यूआर कोड 100% उच्च-गुणवत्ता में सुरक्षित रहें।
          </div>
        </div>
      </section>
    </div>
  );
};
