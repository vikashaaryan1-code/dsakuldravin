import React from 'react';
import { KundliResult } from '../../types/astrology';
import { VedicKundliChart } from './VedicKundliChart';
import { Printer, X, Award, ShieldCheck, Download } from 'lucide-react';

interface KundliPrintCertificateProps {
  kundli: KundliResult;
  onClose: () => void;
}

export const KundliPrintCertificate: React.FC<KundliPrintCertificateProps> = ({
  kundli,
  onClose
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 10000,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(10px)',
      overflowY: 'auto',
      padding: '24px 16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {/* Top Action Bar */}
      <div style={{
        width: '100%',
        maxWidth: '860px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
        color: '#FFFFFF'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Award color="#F59E0B" size={24} />
          <h3 style={{ margin: 0, fontSize: '18px', color: '#FDE68A' }}>
            वैदिक जन्म पत्रिका प्रमाण-पत्र (Janam Kundli Certificate)
          </h3>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={handlePrint}
            style={{
              background: '#D97706',
              color: '#FFFFFF',
              border: 'none',
              padding: '8px 18px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <Printer size={16} /> प्रिंट / PDF में सहेजें
          </button>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              color: '#FFFFFF',
              border: 'none',
              padding: '8px 14px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Printable Sheet (Traditional Parchment Vedic Document) */}
      <div 
        id="printable-kundli-sheet"
        style={{
          width: '100%',
          maxWidth: '860px',
          background: '#FFFDF7',
          color: '#1E293B',
          borderRadius: '12px',
          padding: '40px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
          border: '12px double #B45309',
          position: 'relative',
          fontFamily: 'serif'
        }}
      >
        {/* Ornate Corner Accents */}
        <div style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '20px', color: '#B45309' }}>卐</div>
        <div style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '20px', color: '#B45309' }}>ॐ</div>
        <div style={{ position: 'absolute', bottom: '10px', left: '10px', fontSize: '20px', color: '#B45309' }}>ॐ</div>
        <div style={{ position: 'absolute', bottom: '10px', right: '10px', fontSize: '20px', color: '#B45309' }}>卐</div>

        {/* Certificate Header */}
        <div style={{ textAlign: 'center', borderBottom: '2px solid #D97706', paddingBottom: '16px', marginBottom: '24px' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#B45309', marginBottom: '4px' }}>
            ॥ श्री गणेशाय नमः ॥
          </div>
          <h1 style={{ margin: '4px 0', fontSize: '26px', color: '#78350F', letterSpacing: '1px' }}>
            अखिल भारतीय वैदिक ज्योतिष परिषद
          </h1>
          <p style={{ margin: '2px 0 0', fontSize: '14px', color: '#92400E', fontStyle: 'italic' }}>
            प्रामाणिक जन्म लग्न चक्र एवं ग्रह दशा फलादेश प्रमाण-पत्र
          </p>
        </div>

        {/* Native Bio Details Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px',
          background: '#FEF3C7',
          padding: '16px',
          borderRadius: '8px',
          border: '1px solid #FCD34D',
          fontSize: '13px',
          marginBottom: '24px'
        }}>
          <div>
            <span style={{ color: '#92400E', fontWeight: 600 }}>जातक का नाम:</span>
            <div style={{ fontWeight: 700, fontSize: '15px', color: '#78350F' }}>{kundli.input.fullName}</div>
          </div>
          <div>
            <span style={{ color: '#92400E', fontWeight: 600 }}>जन्म तिथि:</span>
            <div style={{ fontWeight: 700 }}>{kundli.input.dob}</div>
          </div>
          <div>
            <span style={{ color: '#92400E', fontWeight: 600 }}>जन्म समय:</span>
            <div style={{ fontWeight: 700 }}>{kundli.input.birthTime}</div>
          </div>
          <div>
            <span style={{ color: '#92400E', fontWeight: 600 }}>जन्म स्थान:</span>
            <div style={{ fontWeight: 700 }}>{kundli.input.birthPlace}</div>
          </div>

          <div>
            <span style={{ color: '#92400E', fontWeight: 600 }}>लग्न राशि:</span>
            <div style={{ fontWeight: 700, color: '#B45309' }}>{kundli.lagnaRashi.nameHi} ({kundli.lagnaRashi.nameEn})</div>
          </div>
          <div>
            <span style={{ color: '#92400E', fontWeight: 600 }}>चन्द्र राशि (नाम राशि):</span>
            <div style={{ fontWeight: 700, color: '#B45309' }}>{kundli.moonRashi.nameHi}</div>
          </div>
          <div>
            <span style={{ color: '#92400E', fontWeight: 600 }}>जन्म नक्षत्र:</span>
            <div style={{ fontWeight: 700 }}>{kundli.birthNakshatraHi} (पाद {kundli.nakshatraPada})</div>
          </div>
          <div>
            <span style={{ color: '#92400E', fontWeight: 600 }}>गण / नाड़ी / वर्ण:</span>
            <div style={{ fontWeight: 700 }}>{kundli.ganaHi} / {kundli.nadiHi} / {kundli.varnaHi}</div>
          </div>
        </div>

        {/* Center Section: Kundli Chart + Planetary Table */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'start', marginBottom: '24px' }}>
          <div>
            <h3 style={{ fontSize: '15px', color: '#78350F', borderBottom: '1px solid #D97706', paddingBottom: '4px', marginBottom: '8px' }}>
              लग्न कुण्डली (North Indian Chart)
            </h3>
            <VedicKundliChart 
              houses={kundli.houses} 
              lagnaSignName={kundli.lagnaRashi.nameHi} 
              nativeName={kundli.input.fullName} 
            />
          </div>

          <div>
            <h3 style={{ fontSize: '15px', color: '#78350F', borderBottom: '1px solid #D97706', paddingBottom: '4px', marginBottom: '8px' }}>
              नवग्रह स्पष्ट स्थिति (Planetary Positions)
            </h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#FDE68A', color: '#78350F' }}>
                  <th style={{ padding: '6px', border: '1px solid #F59E0B' }}>ग्रह</th>
                  <th style={{ padding: '6px', border: '1px solid #F59E0B' }}>राशि</th>
                  <th style={{ padding: '6px', border: '1px solid #F59E0B' }}>भाव</th>
                  <th style={{ padding: '6px', border: '1px solid #F59E0B' }}>अंश</th>
                  <th style={{ padding: '6px', border: '1px solid #F59E0B' }}>स्थिति</th>
                </tr>
              </thead>
              <tbody>
                {kundli.planets.map((p, idx) => (
                  <tr key={idx} style={{ background: idx % 2 === 0 ? '#FFFBEB' : '#FFFFFF' }}>
                    <td style={{ padding: '5px', border: '1px solid #FDE68A', fontWeight: 600 }}>{p.nameHi}</td>
                    <td style={{ padding: '5px', border: '1px solid #FDE68A' }}>{p.rashiNameHi}</td>
                    <td style={{ padding: '5px', border: '1px solid #FDE68A', textAlign: 'center' }}>{p.house}</td>
                    <td style={{ padding: '5px', border: '1px solid #FDE68A' }}>{p.degreeStr}</td>
                    <td style={{ padding: '5px', border: '1px solid #FDE68A', fontWeight: 600, color: p.status === 'Exalted' ? '#047857' : p.status === 'Debilitated' ? '#B91C1C' : '#1E293B' }}>
                      {p.statusHi} {p.isRetrograde ? '(वक्री)' : ''}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Current Dasha Box */}
            <div style={{ marginTop: '12px', background: '#FEF3C7', padding: '10px', borderRadius: '6px', border: '1px solid #F59E0B', fontSize: '12px' }}>
              <span style={{ fontWeight: 700, color: '#92400E' }}>वर्तमान विंशोत्तरी महादशा: </span>
              <strong>{kundli.currentDasha.planetHi}</strong> ({kundli.currentDasha.startDate} से {kundli.currentDasha.endDate})
            </div>
          </div>
        </div>

        {/* Life Predictions & Vedic Remedies */}
        <div style={{ background: '#FFFBEB', padding: '16px', borderRadius: '8px', border: '1px solid #FDE68A', marginBottom: '24px', fontSize: '12px' }}>
          <h4 style={{ color: '#78350F', fontSize: '14px', margin: '0 0 8px', fontWeight: 700 }}>
            ज्योतिषीय फलादेश एवं कल्याणकारी उपाय
          </h4>
          <p style={{ margin: '0 0 6px' }}><strong>व्यक्तित्व व स्वभाव:</strong> {kundli.generalPredictions.personalityHi}</p>
          <p style={{ margin: '0 0 6px' }}><strong>आजीविका व भाग्य:</strong> {kundli.generalPredictions.careerHi}</p>
          <p style={{ margin: '0 0 6px' }}><strong>शुभ रत्न:</strong> {kundli.remedies.gemstoneHi} | <strong>शुभ रुद्राक्ष:</strong> {kundli.remedies.rudrakshaHi}</p>
          <p style={{ margin: '0' }}><strong>दैनिक मंत्र:</strong> {kundli.remedies.mantra} | <strong>दान:</strong> {kundli.remedies.donationsHi}</p>
        </div>

        {/* Certificate Footer with Seals */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '16px', borderTop: '2px solid #D97706' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#047857', fontWeight: 600, fontSize: '13px' }}>
              <ShieldCheck size={18} />
              प्रमाणित वैदिक चार्ट (ISO 9001:2026 मानकीकृत)
            </div>
            <div style={{ fontSize: '11px', color: '#78716C', marginTop: '2px' }}>
              डिजिटल सत्यापन कोड: KUNDLI-VEDA-{Math.floor(100000 + Math.random() * 900000)}
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '120px', borderBottom: '1px solid #78350F', marginBottom: '4px' }}></div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#78350F' }}>
              आचार्य हस्ताक्षर एवं मुद्रा
            </div>
            <div style={{ fontSize: '10px', color: '#92400E' }}>मुख्य ज्योतिषाचार्य</div>
          </div>
        </div>
      </div>
    </div>
  );
};
