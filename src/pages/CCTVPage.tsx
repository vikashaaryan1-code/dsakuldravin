import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { 
  ShieldCheck, 
  Video, 
  HardDrive, 
  Cable, 
  Wrench, 
  Smartphone, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  ShoppingCart,
  Eye
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CCTVPage: React.FC = () => {
  const { addToCart, showToast, logAudit, language } = useApp();

  // Configurator State
  const [cameraCount, setCameraCount] = useState<number>(4);
  const [cameraType, setCameraType] = useState<'2MP HD' | '4MP IP POE' | '4K AI Smart'>('4MP IP POE');
  const [storageDays, setStorageDays] = useState<number>(30); // in days
  const [includeAMC, setIncludeAMC] = useState<boolean>(true);

  // Dynamic Pricing Calculation
  const cameraUnitPrice = cameraType === '2MP HD' ? 1200 : cameraType === '4MP IP POE' ? 2100 : 3800;
  const nvrPrice = cameraCount <= 4 ? 3200 : cameraCount <= 8 ? 5800 : 9500;
  const hddPrice = storageDays <= 15 ? 2400 : storageDays <= 30 ? 3800 : storageDays <= 60 ? 6200 : 10500;
  const cablingAndPsu = cameraCount * 350;
  const installationLabour = cameraCount * 450;
  const amcCost = includeAMC ? 1500 : 0;

  const totalEstimate = (cameraCount * cameraUnitPrice) + nvrPrice + hddPrice + cablingAndPsu + installationLabour + amcCost;

  const handleAddToCart = () => {
    addToCart({
      id: 'cctv-custom-' + Date.now(),
      title: `Smart CCTV Package (${cameraCount}x ${cameraType}, ${storageDays}-Day HDD)`,
      titleHi: `स्मार्ट सीसीटीवी पैकेज (${cameraCount} कैमरे)`,
      category: 'cctv',
      description: `Includes ${cameraCount} cameras, NVR, ${storageDays}-day recording, cabling, mobile view & installation.`,
      descriptionHi: 'कैमरा, रिकॉर्डर, हार्ड डिस्क, केबलिंग एवं मोबाइल ऐप सेटअप।',
      icon: 'ShieldCheck',
      basePrice: totalEstimate,
      timeline: '24 - 48 Hours',
      timelineHi: '24 से 48 घंटे',
      requiredDocs: ['Premises Installation Address'],
      requiredDocsHi: ['इंस्टॉलेशन का पता'],
      slug: 'cctv-custom-quote',
    });

    logAudit(`CCTV System Configured: ${cameraCount}x ${cameraType}`, `Estimate: ₹${totalEstimate}`);
    confetti({ particleCount: 70, spread: 60 });
  };

  return (
    <div className="container-wide" style={{ padding: '2.5rem 1.5rem 4rem' }}>
      {/* Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0A192F 0%, #0D2137 60%, #1D4ED8 100%)',
        borderRadius: '24px',
        padding: '3rem 2.5rem',
        color: '#FFFFFF',
        marginBottom: '2.5rem',
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          background: 'rgba(245, 158, 11, 0.2)',
          border: '1px solid #F59E0B',
          borderRadius: '9999px',
          padding: '0.3rem 0.75rem',
          fontSize: '0.78rem',
          fontWeight: 700,
          color: '#F59E0B',
          marginBottom: '1rem',
        }}>
          <ShieldCheck size={14} />
          <span>SURVEILLANCE, IP CAMERAS & BIOMETRIC SECURITY</span>
        </div>

        <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 900, marginBottom: '0.75rem', color: '#FFFFFF' }}>
          {language === 'hi' ? 'स्मार्ट सीसीटीवी एवं सुरक्षा प्रणाली' : 'CCTV & Security Marketplace'}
        </h1>
        <p style={{ fontSize: '1rem', color: '#CBD5E1', maxWidth: '640px', lineHeight: 1.6 }}>
          Custom IP & HD camera setups, 24/7 night vision surveillance, NVR storage calculation, biometric attendance systems, and guaranteed annual maintenance (AMC).
        </p>
      </div>

      {/* DYNAMIC QUOTATION ENGINE (Section 20) */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '2.5rem',
        border: '1px solid #E2E8F0',
        boxShadow: '0 8px 30px rgba(10, 25, 47, 0.06)',
        marginBottom: '3.5rem',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span className="badge badge-gold">DYNAMIC QUOTATION BUILDER</span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0A192F', marginTop: '0.4rem' }}>
            Build Your Custom Surveillance Package
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#64748B' }}>
            Instant price transparency for cameras, recording storage, cabling, and technician installation.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '2.5rem',
          alignItems: 'center',
        }} className="hero-grid">
          {/* Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* 1. Camera Count */}
            <div>
              <label className="form-label">Number of Cameras Required</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                {[2, 4, 8, 16].map(count => (
                  <button
                    key={count}
                    onClick={() => setCameraCount(count)}
                    style={{
                      padding: '0.75rem 0.5rem',
                      borderRadius: '10px',
                      border: cameraCount === count ? '2px solid #1D4ED8' : '1px solid #E2E8F0',
                      background: cameraCount === count ? '#EFF6FF' : '#FFFFFF',
                      color: cameraCount === count ? '#1D4ED8' : '#475569',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                    }}
                  >
                    {count} Cameras
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Camera Grade */}
            <div>
              <label className="form-label">Camera Sensor & Resolution</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                {[
                  { type: '2MP HD', desc: 'Standard 1080p, IR 20m Night Vision' },
                  { type: '4MP IP POE', desc: 'Crisp 2K QHD, ColorVu Night Vision' },
                  { type: '4K AI Smart', desc: 'Ultra HD, Human/Vehicle Detection' },
                ].map(c => (
                  <button
                    key={c.type}
                    onClick={() => setCameraType(c.type as any)}
                    style={{
                      padding: '0.85rem 0.65rem',
                      borderRadius: '12px',
                      border: cameraType === c.type ? '2px solid #1D4ED8' : '1px solid #E2E8F0',
                      background: cameraType === c.type ? '#EFF6FF' : '#FFFFFF',
                      textAlign: 'left',
                      transition: 'all 0.15s',
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: cameraType === c.type ? '#1D4ED8' : '#0A192F' }}>
                      {c.type}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '0.2rem' }}>{c.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Storage Days */}
            <div>
              <label className="form-label">Surveillance HDD Video Recording Retention</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                {[
                  { days: 15, hdd: '500GB' },
                  { days: 30, hdd: '1TB' },
                  { days: 60, hdd: '2TB' },
                  { days: 120, hdd: '4TB' },
                ].map(s => (
                  <button
                    key={s.days}
                    onClick={() => setStorageDays(s.days)}
                    style={{
                      padding: '0.65rem 0.5rem',
                      borderRadius: '10px',
                      border: storageDays === s.days ? '2px solid #1D4ED8' : '1px solid #E2E8F0',
                      background: storageDays === s.days ? '#EFF6FF' : '#FFFFFF',
                      color: storageDays === s.days ? '#1D4ED8' : '#475569',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                    }}
                  >
                    <div>{s.days} Days</div>
                    <div style={{ fontSize: '0.68rem', color: '#64748B' }}>({s.hdd} HDD)</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. AMC Checkbox */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.85rem 1rem',
              borderRadius: '12px',
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0A192F' }}>
                  Include 1-Year Comprehensive AMC
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                  Quarterly camera lens cleaning, cabling check & priority 4-hour breakdown support.
                </div>
              </div>
              <input
                type="checkbox"
                checked={includeAMC}
                onChange={(e) => setIncludeAMC(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: '#1D4ED8' }}
              />
            </div>
          </div>

          {/* Quotation Summary Card */}
          <div style={{
            background: 'linear-gradient(135deg, #0A192F 0%, #0D2137 100%)',
            borderRadius: '20px',
            padding: '2rem',
            color: '#FFFFFF',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            boxShadow: '0 12px 40px rgba(10, 25, 47, 0.25)',
          }}>
            <div style={{ fontSize: '0.78rem', color: '#F59E0B', fontWeight: 700, textTransform: 'uppercase' }}>
              ITEMIZED DYNAMIC QUOTE:
            </div>
            <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#FFFFFF', margin: '0.2rem 0 1.25rem' }}>
              ₹{totalEstimate.toLocaleString('en-IN')}
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem',
              padding: '1rem 0',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              marginBottom: '1.5rem',
              fontSize: '0.82rem',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94A3B8' }}>{cameraCount}x {cameraType} Cameras:</span>
                <span style={{ fontWeight: 700 }}>₹{(cameraCount * cameraUnitPrice).toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94A3B8' }}>NVR / DVR System:</span>
                <span style={{ fontWeight: 700 }}>₹{nvrPrice.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94A3B8' }}>Surveillance HDD ({storageDays} Days):</span>
                <span style={{ fontWeight: 700 }}>₹{hddPrice.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94A3B8' }}>Cabling & Connectors:</span>
                <span style={{ fontWeight: 700 }}>₹{cablingAndPsu.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94A3B8' }}>Certified Installation & Mobile App:</span>
                <span style={{ fontWeight: 700 }}>₹{installationLabour.toLocaleString('en-IN')}</span>
              </div>
              {includeAMC && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#F59E0B' }}>
                  <span>1-Year AMC Maintenance:</span>
                  <span style={{ fontWeight: 700 }}>₹{amcCost.toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              className="btn-gold btn-lg"
              style={{ width: '100%', fontWeight: 800, gap: '0.5rem' }}
            >
              <ShoppingCart size={18} />
              <span>Add Package to Unified Cart</span>
            </button>

            <button
              onClick={() => {
                showToast('Site Survey Scheduled!', 'Technician Prakash Kumar Singh dispatched. Track under Technician Portal (/portal/technician).', 'success');
                logAudit('CCTV Site Survey Booked', `Package ${cameraCount}x ${cameraType}`);
                confetti({ particleCount: 50, spread: 60 });
              }}
              style={{
                width: '100%',
                marginTop: '0.75rem',
                padding: '0.75rem',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#38BDF8',
                border: '1px solid #38BDF8',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              <Wrench size={16} /> Schedule Site Survey & Dispatch Technician
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
