import React, { useState } from 'react';
import { HouseInfo, PlanetPosition } from '../../types/astrology';
import { Sparkles, Info, X } from 'lucide-react';

interface VedicKundliChartProps {
  houses: HouseInfo[];
  lagnaSignName?: string;
  nativeName?: string;
}

export const VedicKundliChart: React.FC<VedicKundliChartProps> = ({ 
  houses, 
  lagnaSignName = 'मेष', 
  nativeName = 'जातक' 
}) => {
  const [selectedHouse, setSelectedHouse] = useState<HouseInfo | null>(null);

  // Map 1-12 house index to SVG polygon coordinates and text positioning
  // North Indian Chart standard 400x400 SVG coordinate grid:
  // Center is (200, 200). Outer box: (0,0) to (400, 400).
  // Diagonals: (0,0)-(400,400) and (0,400)-(400,0).
  // Inner diamond: (200,0)-(400,200)-(200,400)-(0,200).
  
  const housePolygons: Record<number, { points: string; signPos: [number, number]; planetPos: [number, number] }> = {
    // House 1: Top Center Diamond
    1: { 
      points: '200,0 300,100 200,200 100,100', 
      signPos: [200, 75], 
      planetPos: [200, 125] 
    },
    // House 2: Top Left Triangle
    2: { 
      points: '0,0 200,0 100,100', 
      signPos: [110, 45], 
      planetPos: [85, 75] 
    },
    // House 3: Middle Left Triangle
    3: { 
      points: '0,0 100,100 0,200', 
      signPos: [45, 110], 
      planetPos: [45, 145] 
    },
    // House 4: Left Center Diamond
    4: { 
      points: '0,200 100,100 200,200 100,300', 
      signPos: [85, 200], 
      planetPos: [120, 200] 
    },
    // House 5: Lower Left Triangle
    5: { 
      points: '0,200 100,300 0,400', 
      signPos: [45, 290], 
      planetPos: [45, 325] 
    },
    // House 6: Bottom Left Triangle
    6: { 
      points: '0,400 100,300 200,400', 
      signPos: [110, 355], 
      planetPos: [85, 325] 
    },
    // House 7: Bottom Center Diamond
    7: { 
      points: '200,200 300,300 200,400 100,300', 
      signPos: [200, 325], 
      planetPos: [200, 275] 
    },
    // House 8: Bottom Right Triangle
    8: { 
      points: '200,400 300,300 400,400', 
      signPos: [290, 355], 
      planetPos: [315, 325] 
    },
    // House 9: Lower Right Triangle
    9: { 
      points: '300,300 400,200 400,400', 
      signPos: [355, 290], 
      planetPos: [355, 325] 
    },
    // House 10: Right Center Diamond
    10: { 
      points: '200,200 300,100 400,200 300,300', 
      signPos: [315, 200], 
      planetPos: [280, 200] 
    },
    // House 11: Middle Right Triangle
    11: { 
      points: '300,100 400,0 400,200', 
      signPos: [355, 110], 
      planetPos: [355, 145] 
    },
    // House 12: Top Right Triangle
    12: { 
      points: '200,0 400,0 300,100', 
      signPos: [290, 45], 
      planetPos: [315, 75] 
    }
  };

  const getPlanetAbbr = (p: PlanetPosition) => {
    switch (p.nameEn) {
      case 'Sun': return 'सूर्य';
      case 'Moon': return 'चं';
      case 'Mars': return 'मं';
      case 'Mercury': return 'बु';
      case 'Jupiter': return 'गु';
      case 'Venus': return 'शु';
      case 'Saturn': return 'श';
      case 'Rahu': return 'रा';
      case 'Ketu': return 'के';
      default: return p.nameHi.substring(0, 2);
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0B1120 0%, #161F37 50%, #0F172A 100%)',
      borderRadius: '20px',
      padding: '24px',
      border: '1px solid rgba(245, 158, 11, 0.35)',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(217, 119, 6, 0.15)',
      color: '#FFFFFF',
      position: 'relative'
    }}>
      {/* Header bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '18px', color: '#F59E0B' }}>🕉️</span>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#FDE68A', letterSpacing: '0.5px' }}>
              लग्न कुंडली (जन्म चक्र)
            </h3>
          </div>
          <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#94A3B8' }}>
            जातक: <strong style={{ color: '#FFFFFF' }}>{nativeName}</strong> | लग्न: <strong style={{ color: '#F59E0B' }}>{lagnaSignName}</strong>
          </p>
        </div>
        <div style={{
          fontSize: '11px',
          background: 'rgba(245, 158, 11, 0.15)',
          color: '#FDE68A',
          padding: '4px 10px',
          borderRadius: '999px',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }}>
          <Sparkles size={13} />
          उत्तर भारतीय पद्धति
        </div>
      </div>

      {/* SVG Container */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0' }}>
        <svg
          viewBox="0 0 400 400"
          style={{
            width: '100%',
            maxWidth: '380px',
            height: 'auto',
            filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.6))',
            cursor: 'pointer'
          }}
        >
          <defs>
            {/* Outer Box Gradient */}
            <linearGradient id="kundliBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#111827" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>
            {/* Kendra House Highlight */}
            <linearGradient id="kendraBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(245, 158, 11, 0.15)" />
              <stop offset="100%" stopColor="rgba(217, 119, 6, 0.05)" />
            </linearGradient>
            <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Box */}
          <rect x="0" y="0" width="400" height="400" fill="url(#kundliBg)" stroke="#D97706" strokeWidth="3" rx="4" />

          {/* Clickable House Polygons */}
          {houses.map((house) => {
            const hNum = house.houseNumber;
            const poly = housePolygons[hNum];
            if (!poly) return null;

            const isSelected = selectedHouse?.houseNumber === hNum;
            const isKendra = [1, 4, 7, 10].includes(hNum);
            const isTrikona = [1, 5, 9].includes(hNum);

            let fillColor = 'rgba(255, 255, 255, 0.02)';
            if (isSelected) fillColor = 'rgba(245, 158, 11, 0.35)';
            else if (isKendra) fillColor = 'url(#kendraBg)';
            else if (isTrikona) fillColor = 'rgba(16, 185, 129, 0.08)';

            return (
              <g key={`house-${hNum}`} onClick={() => setSelectedHouse(house)}>
                <polygon
                  points={poly.points}
                  fill={fillColor}
                  stroke="#D97706"
                  strokeWidth={isSelected ? '2.5' : '1.2'}
                  style={{ transition: 'all 0.2s ease' }}
                />
                
                {/* Rashi Sign Number */}
                <text
                  x={poly.signPos[0]}
                  y={poly.signPos[1]}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#F59E0B"
                  fontSize="13"
                  fontWeight="bold"
                  fontFamily="sans-serif"
                >
                  {house.rashiNumber}
                </text>

                {/* Planets Present in this House */}
                {house.planetsPresent.length > 0 && (
                  <text
                    x={poly.planetPos[0]}
                    y={poly.planetPos[1]}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#FFFFFF"
                    fontSize="11"
                    fontWeight="600"
                    fontFamily="sans-serif"
                  >
                    {house.planetsPresent.map((p, idx) => (
                      <tspan
                        key={idx}
                        x={poly.planetPos[0]}
                        dy={idx === 0 ? 0 : 13}
                        fill={
                          p.nameEn === 'Sun' ? '#FBBF24' :
                          p.nameEn === 'Moon' ? '#E2E8F0' :
                          p.nameEn === 'Mars' ? '#F87171' :
                          p.nameEn === 'Mercury' ? '#34D399' :
                          p.nameEn === 'Jupiter' ? '#FCD34D' :
                          p.nameEn === 'Venus' ? '#F472B6' :
                          p.nameEn === 'Saturn' ? '#60A5FA' :
                          '#A78BFA'
                        }
                      >
                        {getPlanetAbbr(p)}
                        {p.isRetrograde ? '(व)' : ''}
                      </tspan>
                    ))}
                  </text>
                )}
              </g>
            );
          })}

          {/* Central Vedic Decorative Motif */}
          <circle cx="200" cy="200" r="14" fill="#0B1120" stroke="#F59E0B" strokeWidth="1.5" />
          <text x="200" y="204" textAnchor="middle" dominantBaseline="middle" fill="#FDE68A" fontSize="11" fontWeight="bold">
            ॐ
          </text>
        </svg>
      </div>

      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <p style={{ fontSize: '11px', color: '#94A3B8', margin: 0 }}>
          💡 किसी भी भाव (1-12) पर क्लिक करके उसके कारकत्व एवं फलित का विश्लेषण देखें।
        </p>
      </div>

      {/* House Inspector Drawer / Modal */}
      {selectedHouse && (
        <div style={{
          marginTop: '16px',
          background: 'rgba(15, 23, 42, 0.95)',
          borderRadius: '14px',
          padding: '16px',
          border: '1px solid #D97706',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ 
                background: '#D97706', 
                color: '#FFFFFF', 
                fontWeight: 'bold', 
                fontSize: '12px', 
                width: '24px', 
                height: '24px', 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {selectedHouse.houseNumber}
              </span>
              <div>
                <h4 style={{ margin: 0, fontSize: '15px', color: '#FDE68A', fontWeight: 700 }}>
                  {selectedHouse.nameHi}
                </h4>
                <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#CBD5E1' }}>
                  राशि: <strong>{selectedHouse.rashiNameHi} ({selectedHouse.rashiName})</strong> | भावेश (स्वामी): <strong style={{ color: '#F59E0B' }}>{selectedHouse.signLordHi}</strong>
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedHouse(null)}
              style={{ color: '#94A3B8', padding: '4px', borderRadius: '4px' }}
            >
              <X size={16} />
            </button>
          </div>

          <div style={{ margin: '10px 0', padding: '10px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '8px', fontSize: '12px', color: '#E2E8F0' }}>
            <div style={{ fontWeight: 600, color: '#FCD34D', marginBottom: '4px' }}>भाव कारकत्व (Signification):</div>
            <div>{selectedHouse.significationHi}</div>
          </div>

          <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#94A3B8', marginBottom: '6px' }}>
              स्थित ग्रह ({selectedHouse.planetsPresent.length}):
            </div>
            {selectedHouse.planetsPresent.length === 0 ? (
              <p style={{ fontSize: '12px', color: '#64748B', fontStyle: 'italic', margin: 0 }}>
                इस भाव में कोई ग्रह स्थित नहीं है (दृष्टि प्रभाव लागू होगा)।
              </p>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {selectedHouse.planetsPresent.map((p, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'rgba(217, 119, 6, 0.2)',
                      border: '1px solid rgba(245, 158, 11, 0.4)',
                      borderRadius: '8px',
                      padding: '4px 8px',
                      fontSize: '11px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span style={{ fontWeight: 700, color: '#FDE68A' }}>{p.nameHi}</span>
                    <span style={{ color: '#94A3B8' }}>{p.degreeStr}</span>
                    <span style={{ 
                      fontSize: '10px', 
                      background: p.status === 'Exalted' ? '#059669' : p.status === 'Debilitated' ? '#DC2626' : 'rgba(255,255,255,0.1)',
                      padding: '1px 5px',
                      borderRadius: '4px'
                    }}>
                      {p.statusHi}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
