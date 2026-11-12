import React, { useState } from 'react';
import { AstroHeaderNav } from '../../components/astrology/AstroHeaderNav';
import { TODAY_PANCHANG } from '../../data/astrologyData';
import { Calendar, Sun, Moon, Sparkles, Clock, AlertTriangle, ShieldCheck, MapPin, Compass } from 'lucide-react';

export const PanchangPage: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('वाराणसी (Varanasi)');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const cities = [
    'वाराणसी (Varanasi)', 'नई दिल्ली (New Delhi)', 'मुंबई (Mumbai)', 'उज्जैन (Ujjain)', 
    'हरिद्वार (Haridwar)', 'जयपुर (Jaipur)', 'कोलकाता (Kolkata)', 'बेंगलुरु (Bengaluru)', 'प्रयागराज (Prayagraj)'
  ];

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
            <Calendar size={14} color="#10B981" /> दैनिक वेदोक्त पंचांग एवं शुभ मुहूर्त
          </div>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', color: '#FDE68A', margin: '0 0 8px', fontWeight: 800 }}>
            दैनिक वैदिक पंचांग (Vedic Panchang)
          </h1>
          <p style={{ color: '#CBD5E1', fontSize: '14px', margin: 0 }}>
            तिथि, वार, नक्षत्र, योग, करण, सूर्योदय/सूर्यास्त, अभिजीत मुहूर्त एवं राहुकाल की दैनिक सूक्ष्म गणना।
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1240px', margin: '30px auto 0', padding: '0 16px' }}>
        {/* City & Date Picker Controls */}
        <div style={{
          background: '#1E293B',
          borderRadius: '16px',
          padding: '16px 20px',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '28px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#CBD5E1' }}>
              <MapPin size={16} color="#F59E0B" /> स्थान:
            </div>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              style={{
                background: '#0F172A',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                borderRadius: '8px',
                padding: '8px 14px',
                fontSize: '13px'
              }}
            >
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '13px', color: '#CBD5E1' }}>दिनांक:</span>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{
                background: '#0F172A',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                borderRadius: '8px',
                padding: '8px 14px',
                fontSize: '13px'
              }}
            />
          </div>
        </div>

        {/* 5 Limbs of Panchang (पंचांग के पांच अंग) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '28px'
        }}>
          {/* 1. Tithi */}
          <div style={{ background: '#1E293B', borderRadius: '16px', padding: '18px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: '12px', color: '#F59E0B', fontWeight: 700, marginBottom: '4px' }}>१. तिथि (Tithi)</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#FDE68A' }}>{TODAY_PANCHANG.tithi.nameHi}</div>
            <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px' }}>{TODAY_PANCHANG.tithi.endTime}</div>
            <div style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '6px' }}>पक्ष: {TODAY_PANCHANG.pakshaHi}</div>
          </div>

          {/* 2. Vaar */}
          <div style={{ background: '#1E293B', borderRadius: '16px', padding: '18px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: '12px', color: '#3B82F6', fontWeight: 700, marginBottom: '4px' }}>२. वार (Vaar)</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF' }}>{TODAY_PANCHANG.dayOfWeekHi}</div>
            <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px' }}>स्वामी: मंगल देव (Mars)</div>
            <div style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '6px' }}>संवत: विक्रम संवत {TODAY_PANCHANG.vikramSamvat}</div>
          </div>

          {/* 3. Nakshatra */}
          <div style={{ background: '#1E293B', borderRadius: '16px', padding: '18px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: '12px', color: '#10B981', fontWeight: 700, marginBottom: '4px' }}>३. नक्षत्र (Nakshatra)</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF' }}>{TODAY_PANCHANG.nakshatra.nameHi}</div>
            <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px' }}>समाप्ति: {TODAY_PANCHANG.nakshatra.endTime}</div>
            <div style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '6px' }}>स्वामी: {TODAY_PANCHANG.nakshatra.lordHi}</div>
          </div>

          {/* 4. Yoga */}
          <div style={{ background: '#1E293B', borderRadius: '16px', padding: '18px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: '12px', color: '#EC4899', fontWeight: 700, marginBottom: '4px' }}>४. योग (Yoga)</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF' }}>{TODAY_PANCHANG.yoga.nameHi}</div>
            <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px' }}>समय: {TODAY_PANCHANG.yoga.endTime}</div>
            <div style={{ fontSize: '11px', color: '#A7F3D0', marginTop: '6px' }}>शुभ फलदायी योग</div>
          </div>

          {/* 5. Karana */}
          <div style={{ background: '#1E293B', borderRadius: '16px', padding: '18px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: '12px', color: '#8B5CF6', fontWeight: 700, marginBottom: '4px' }}>५. करण (Karana)</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF' }}>{TODAY_PANCHANG.karana.nameHi}</div>
            <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px' }}>समय: {TODAY_PANCHANG.karana.endTime}</div>
            <div style={{ fontSize: '11px', color: '#CBD5E1', marginTop: '6px' }}>व्यापार के लिए अनुकूल</div>
          </div>
        </div>

        {/* Sun & Moon Times Strip */}
        <div style={{
          background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
          borderRadius: '16px',
          padding: '20px 24px',
          border: '1px solid rgba(245, 158, 11, 0.25)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '28px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Sun size={28} color="#F59E0B" />
            <div>
              <div style={{ fontSize: '11px', color: '#94A3B8' }}>सूर्योदय एवं सूर्यास्त</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>
                {TODAY_PANCHANG.sunTimes.sunrise} | {TODAY_PANCHANG.sunTimes.sunset}
              </div>
              <div style={{ fontSize: '11px', color: '#FDE68A' }}>सूर्य राशि: {TODAY_PANCHANG.sunTimes.sunSignHi}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Moon size={28} color="#E2E8F0" />
            <div>
              <div style={{ fontSize: '11px', color: '#94A3B8' }}>चन्द्रोदय एवं चन्द्रास्त</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>
                {TODAY_PANCHANG.sunTimes.moonrise} | {TODAY_PANCHANG.sunTimes.moonset}
              </div>
              <div style={{ fontSize: '11px', color: '#E2E8F0' }}>चन्द्र राशि: {TODAY_PANCHANG.sunTimes.moonSignHi}</div>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: '#94A3B8' }}>ऋतु एवं अयन</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>{TODAY_PANCHANG.ritu}</div>
            <div style={{ fontSize: '11px', color: '#CBD5E1' }}>{TODAY_PANCHANG.ayana}</div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: '#94A3B8' }}>स्थान समन्वय</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#A7F3D0' }}>{selectedCity}</div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>मानक भारतीय समय (IST)</div>
          </div>
        </div>

        {/* Muhurat Dual Grid: Shubh vs Ashubh */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '28px' }}>
          
          {/* Shubh Muhurat (शुभ काल) */}
          <div style={{
            background: '#1E293B',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.4)'
          }}>
            <h3 style={{ margin: '0 0 16px', fontSize: '18px', color: '#A7F3D0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={20} color="#10B981" /> शुभ मुहूर्त समय (Auspicious Timings)
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '10px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF' }}>अभिजीत मुहूर्त (सर्वश्रेष्ठ):</span>
                <strong style={{ fontSize: '13px', color: '#A7F3D0' }}>{TODAY_PANCHANG.shubhMuhurat.abhijitMuhurat}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                <span style={{ fontSize: '13px', color: '#CBD5E1' }}>अमृत काल:</span>
                <strong style={{ fontSize: '13px', color: '#FFFFFF' }}>{TODAY_PANCHANG.shubhMuhurat.amritKaal}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                <span style={{ fontSize: '13px', color: '#CBD5E1' }}>ब्रह्म मुहूर्त:</span>
                <strong style={{ fontSize: '13px', color: '#FFFFFF' }}>{TODAY_PANCHANG.shubhMuhurat.brahmaMuhurat}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                <span style={{ fontSize: '13px', color: '#CBD5E1' }}>विजय मुहूर्त:</span>
                <strong style={{ fontSize: '13px', color: '#FFFFFF' }}>{TODAY_PANCHANG.shubhMuhurat.vijayaMuhurat}</strong>
              </div>
            </div>
          </div>

          {/* Ashubh Muhurat (अशुभ काल - राहुकाल आदि) */}
          <div style={{
            background: '#1E293B',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.4)'
          }}>
            <h3 style={{ margin: '0 0 16px', fontSize: '18px', color: '#FCA5A5', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle size={20} color="#EF4444" /> अशुभ काल (वर्जित समय)
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '10px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF' }}>राहुकाल (शुभ कार्य वर्जित):</span>
                <strong style={{ fontSize: '13px', color: '#FCA5A5' }}>{TODAY_PANCHANG.ashubhMuhurat.rahuKaal}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                <span style={{ fontSize: '13px', color: '#CBD5E1' }}>यमघण्ट:</span>
                <strong style={{ fontSize: '13px', color: '#FFFFFF' }}>{TODAY_PANCHANG.ashubhMuhurat.yamaganda}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                <span style={{ fontSize: '13px', color: '#CBD5E1' }}>गुलिक काल:</span>
                <strong style={{ fontSize: '13px', color: '#FFFFFF' }}>{TODAY_PANCHANG.ashubhMuhurat.gulikaKaal}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
                <span style={{ fontSize: '13px', color: '#CBD5E1' }}>दुर्मुहूर्त:</span>
                <strong style={{ fontSize: '13px', color: '#FFFFFF' }}>{TODAY_PANCHANG.ashubhMuhurat.durMuhurat}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Current Month Festivals & Vrats */}
        <div style={{
          background: 'radial-gradient(ellipse at top, #1E1B4B 0%, #0F172A 100%)',
          borderRadius: '20px',
          padding: '24px',
          border: '1px solid rgba(245, 158, 11, 0.3)'
        }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '18px', color: '#FDE68A', fontWeight: 700 }}>
            🎉 इस माह के प्रमुख व्रत एवं पर्व (Festivals & Vrats)
          </h3>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {TODAY_PANCHANG.festivalsAndVrats.map((fest, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(245, 158, 11, 0.25)',
                  borderRadius: '10px',
                  padding: '10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span style={{ fontSize: '16px' }}>🪔</span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>{fest.nameHi}</div>
                  <div style={{ fontSize: '11px', color: '#FDE68A' }}>{fest.nameEn} ({fest.type})</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
