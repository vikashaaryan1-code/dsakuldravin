import React, { useState } from 'react';
import { AstroHeaderNav } from '../../components/astrology/AstroHeaderNav';
import { VERIFIED_ASTROLOGERS } from '../../data/astrologyData';
import { AstrologerProfile } from '../../types/astrology';
import { AstrologerChatModal } from '../../components/astrology/AstrologerChatModal';
import { ConsultationBookingModal } from '../../components/astrology/ConsultationBookingModal';
import { Users, Search, Filter, ShieldCheck, Star, MessageSquare, PhoneCall, Award, Sparkles } from 'lucide-react';

export const AstrologersDirectoryPage: React.FC = () => {
  const [selectedSpeciality, setSelectedSpeciality] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [onlineOnly, setOnlineOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [activeChatAstrologer, setActiveChatAstrologer] = useState<AstrologerProfile | null>(null);
  const [activeBookingAstrologer, setActiveBookingAstrologer] = useState<AstrologerProfile | null>(null);

  const filteredAstrologers = VERIFIED_ASTROLOGERS.filter((astro) => {
    if (onlineOnly && !astro.isOnline) return false;
    if (selectedSpeciality !== 'all') {
      const match = astro.specialitiesHi.some(s => s.toLowerCase().includes(selectedSpeciality.toLowerCase())) ||
                    astro.specialities.some(s => s.toLowerCase().includes(selectedSpeciality.toLowerCase()));
      if (!match) return false;
    }
    if (selectedLanguage !== 'all') {
      const match = astro.languages.some(l => l.toLowerCase() === selectedLanguage.toLowerCase()) ||
                    astro.languagesHi.some(l => l.toLowerCase() === selectedLanguage.toLowerCase());
      if (!match) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = astro.nameHi.toLowerCase().includes(q) || 
                    astro.nameEn.toLowerCase().includes(q) ||
                    astro.titleHi.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

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
            <Users size={14} color="#10B981" /> 100% सत्यापित एवं अनुभवी वैदिक ज्योतिषी
          </div>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', color: '#FDE68A', margin: '0 0 8px', fontWeight: 800 }}>
            ज्योतिषी डायरेक्टरी एवं लाइव परामर्श
          </h1>
          <p style={{ color: '#CBD5E1', fontSize: '14px', margin: 0 }}>
            देश के शीर्ष वैदिक विद्वानों, टैरो रीडर्स और अंकशास्त्रियों से चैट या कॉल पर सीधा व्यक्तिगत समाधान पाएं।
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1240px', margin: '30px auto 0', padding: '0 16px' }}>
        {/* Filters and Search Bar */}
        <div style={{
          background: '#1E293B',
          borderRadius: '18px',
          padding: '18px 20px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '14px',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '28px'
        }}>
          {/* Search box */}
          <div style={{ position: 'relative', minWidth: '260px', flex: 1 }}>
            <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="ज्योतिषी का नाम या विशेषज्ञता खोजें..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: '#0F172A',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '8px',
                padding: '9px 12px 9px 36px',
                color: '#FFFFFF',
                fontSize: '13px'
              }}
            />
          </div>

          {/* Speciality filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: '#94A3B8' }}>विशेषज्ञता:</span>
            <select
              value={selectedSpeciality}
              onChange={(e) => setSelectedSpeciality(e.target.value)}
              style={{
                background: '#0F172A',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#FFFFFF',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '12px'
              }}
            >
              <option value="all">सभी विधाएं (All)</option>
              <option value="वैदिक">वैदिक ज्योतिष</option>
              <option value="केपी">केपी पद्धति (KP)</option>
              <option value="लाल किताब">लाल किताब उपाय</option>
              <option value="टैरो">टैरो कार्ड रीडिंग</option>
              <option value="वास्तु">वास्तु शास्त्र</option>
              <option value="अंकशास्त्र">अंक ज्योतिष</option>
              <option value="हस्तरेखा">हस्तरेखा / प्रश्न</option>
            </select>
          </div>

          {/* Language filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: '#94A3B8' }}>भाषा:</span>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              style={{
                background: '#0F172A',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#FFFFFF',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '12px'
              }}
            >
              <option value="all">सभी भाषाएँ</option>
              <option value="hindi">हिंदी</option>
              <option value="english">English</option>
              <option value="sanskrit">संस्कृत</option>
              <option value="gujarati">गुजराती</option>
              <option value="punjabi">पंजाबी</option>
              <option value="bengali">बंगाली</option>
            </select>
          </div>

          {/* Online Toggle */}
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '12px', color: '#CBD5E1' }}>
            <input
              type="checkbox"
              checked={onlineOnly}
              onChange={(e) => setOnlineOnly(e.target.checked)}
              style={{ accentColor: '#10B981', width: '16px', height: '16px' }}
            />
            <span>केवल ऑनलाइन ज्योतिषी</span>
          </label>
        </div>

        {/* Astrologers Directory Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '24px'
        }}>
          {filteredAstrologers.map((astro) => (
            <div
              key={astro.id}
              style={{
                background: '#1E293B',
                borderRadius: '20px',
                padding: '22px',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s'
              }}
            >
              <div>
                {/* Profile Top */}
                <div style={{ display: 'flex', gap: '16px', marginBottom: '14px' }}>
                  <div style={{ position: 'relative' }}>
                    <img
                      src={astro.avatarUrl}
                      alt={astro.nameHi}
                      style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #F59E0B' }}
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
                      <h3 style={{ margin: 0, fontSize: '17px', color: '#FDE68A', fontWeight: 800 }}>
                        {astro.nameHi}
                      </h3>
                      <ShieldCheck size={16} color="#10B981" />
                    </div>

                    <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#94A3B8' }}>
                      {astro.titleHi}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px', fontSize: '11px' }}>
                      <span style={{ color: '#F59E0B', fontWeight: 700 }}>★ {astro.rating}</span>
                      <span style={{ color: '#64748B' }}>({astro.reviewCount})</span>
                      <span style={{ color: '#64748B' }}>•</span>
                      <span style={{ color: '#CBD5E1' }}>{astro.experienceYears}+ वर्ष</span>
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                  {astro.badgesHi.map((b, bIdx) => (
                    <span
                      key={bIdx}
                      style={{
                        background: 'rgba(245, 158, 11, 0.15)',
                        border: '1px solid rgba(245, 158, 11, 0.3)',
                        color: '#FDE68A',
                        fontSize: '10px',
                        fontWeight: 600,
                        padding: '2px 8px',
                        borderRadius: '4px'
                      }}
                    >
                      ✓ {b}
                    </span>
                  ))}
                </div>

                {/* Specialties tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                  {astro.specialitiesHi.map((spec, sIdx) => (
                    <span
                      key={sIdx}
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: '#E2E8F0',
                        fontSize: '11px',
                        padding: '2px 8px',
                        borderRadius: '4px'
                      }}
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                <p style={{ fontSize: '12px', color: '#94A3B8', lineHeight: 1.5, margin: '0 0 16px' }}>
                  {astro.bioHi}
                </p>

                <div style={{ fontSize: '11px', color: '#A7F3D0', marginBottom: '14px' }}>
                  🌐 भाषाएँ: {astro.languagesHi.join(', ')} | परामर्श: {astro.consultationsCount}+
                </div>
              </div>

              {/* Bottom Actions */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px', display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setActiveChatAstrologer(astro)}
                  style={{
                    flex: 1,
                    background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '10px',
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
                  <MessageSquare size={15} />
                  चैट (₹{astro.chatRatePerMin}/मि)
                </button>

                <button
                  onClick={() => setActiveBookingAstrologer(astro)}
                  style={{
                    flex: 1,
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: '#FDE68A',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    padding: '10px',
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
                  <PhoneCall size={15} />
                  कॉल स्लॉट (₹{astro.callRatePerMin}/मि)
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {activeChatAstrologer && (
        <AstrologerChatModal
          astrologer={activeChatAstrologer}
          onClose={() => setActiveChatAstrologer(null)}
        />
      )}

      {activeBookingAstrologer && (
        <ConsultationBookingModal
          astrologer={activeBookingAstrologer}
          onClose={() => setActiveBookingAstrologer(null)}
        />
      )}
    </div>
  );
};
