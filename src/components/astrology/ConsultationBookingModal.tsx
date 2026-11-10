import React, { useState } from 'react';
import { AstrologerProfile } from '../../types/astrology';
import { X, Calendar, Clock, Video, Phone, MessageSquare, CheckCircle, ShieldCheck, CreditCard, Sparkles } from 'lucide-react';

interface ConsultationBookingModalProps {
  astrologer: AstrologerProfile;
  onClose: () => void;
  onSuccess?: (bookingId: string) => void;
}

export const ConsultationBookingModal: React.FC<ConsultationBookingModalProps> = ({
  astrologer,
  onClose,
  onSuccess
}) => {
  const [selectedMode, setSelectedMode] = useState<'video' | 'audio' | 'chat'>('video');
  const [selectedDuration, setSelectedDuration] = useState<number>(15); // 15, 30, 60 mins
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedSlot, setSelectedSlot] = useState<string>('11:00 AM');
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userTopic, setUserTopic] = useState('Career & Business (करियर एवं व्यापार)');
  const [userNotes, setUserNotes] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState('');

  const timeSlots = [
    '09:30 AM', '11:00 AM', '12:30 PM', '02:00 PM', '03:30 PM', '05:00 PM', '06:30 PM', '08:00 PM'
  ];

  const ratePerMin = selectedMode === 'chat' ? astrologer.chatRatePerMin : astrologer.callRatePerMin;
  const baseAmount = ratePerMin * selectedDuration;
  const taxAmount = Math.round(baseAmount * 0.18);
  const totalAmount = baseAmount + taxAmount;

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `ASTRO-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingId(newId);
    setIsConfirmed(true);
    if (onSuccess) onSuccess(newId);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: 'rgba(0, 0, 0, 0.78)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div style={{
        background: '#0F172A',
        width: '100%',
        maxWidth: '580px',
        maxHeight: '90vh',
        borderRadius: '24px',
        border: '1px solid rgba(245, 158, 11, 0.35)',
        boxShadow: '0 25px 50px rgba(0,0,0,0.8), 0 0 35px rgba(217, 119, 6, 0.18)',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
              src={astrologer.avatarUrl}
              alt={astrologer.nameHi}
              style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #F59E0B' }}
            />
            <div>
              <h4 style={{ margin: 0, fontSize: '16px', color: '#FDE68A', fontWeight: 700 }}>
                {astrologer.nameHi} के साथ स्लॉट बुक करें
              </h4>
              <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#94A3B8' }}>
                {astrologer.titleHi} | ★ {astrologer.rating}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{ color: '#94A3B8', background: 'rgba(255,255,255,0.05)', padding: '6px', borderRadius: '50%' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {isConfirmed ? (
            <div style={{ textAlign: 'center', padding: '20px 10px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <CheckCircle size={36} />
              </div>

              <h3 style={{ margin: '0 0 8px', color: '#FDE68A', fontSize: '20px' }}>
                परामर्श स्लॉट सफलतापूर्वक बुक हो गया!
              </h3>
              <p style={{ margin: '0 0 16px', color: '#94A3B8', fontSize: '13px' }}>
                बुकिंग टोकन: <strong style={{ color: '#F59E0B', letterSpacing: '1px' }}>{bookingId}</strong>
              </p>

              <div style={{
                background: '#1E293B',
                borderRadius: '12px',
                padding: '16px',
                textAlign: 'left',
                fontSize: '13px',
                lineHeight: 1.6,
                border: '1px solid rgba(255, 255, 255, 0.08)',
                marginBottom: '20px'
              }}>
                <p style={{ margin: '0 0 6px' }}><strong>ज्योतिषी:</strong> {astrologer.nameHi}</p>
                <p style={{ margin: '0 0 6px' }}><strong>तारीख व समय:</strong> {selectedDate} को {selectedSlot}</p>
                <p style={{ margin: '0 0 6px' }}><strong>माध्यम:</strong> {selectedMode === 'video' ? 'वीडियो कॉल' : selectedMode === 'audio' ? 'ऑडियो कॉल' : 'लाइव चैट'} ({selectedDuration} मिनट)</p>
                <p style={{ margin: 0 }}><strong>भुगतान राशि:</strong> ₹{totalAmount} (जीएसटी सहित)</p>
              </div>

              <p style={{ fontSize: '11px', color: '#64748B', marginBottom: '20px' }}>
                सत्र का लिंक आपके दर्ज मोबाइल नंबर व व्हाट्सएप पर भेज दिया गया है।
              </p>

              <button
                onClick={onClose}
                style={{
                  background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '10px 24px',
                  borderRadius: '999px',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                डैशबोर्ड पर वापस जाएं
              </button>
            </div>
          ) : (
            <form onSubmit={handleConfirmBooking} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Mode Selector */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E1', marginBottom: '8px', fontWeight: 600 }}>
                  परामर्श का माध्यम चुनें:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                  {[
                    { key: 'video', label: 'वीडियो कॉल', icon: <Video size={16} /> },
                    { key: 'audio', label: 'ऑडियो कॉल', icon: <Phone size={16} /> },
                    { key: 'chat', label: 'लाइव चैट', icon: <MessageSquare size={16} /> }
                  ].map((m) => (
                    <button
                      key={m.key}
                      type="button"
                      onClick={() => setSelectedMode(m.key as any)}
                      style={{
                        padding: '10px',
                        borderRadius: '10px',
                        border: selectedMode === m.key ? '1px solid #F59E0B' : '1px solid rgba(255,255,255,0.1)',
                        background: selectedMode === m.key ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255,255,255,0.03)',
                        color: selectedMode === m.key ? '#FDE68A' : '#94A3B8',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      {m.icon}
                      <span>{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration selector */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E1', marginBottom: '8px', fontWeight: 600 }}>
                  सत्र की अवधि:
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[15, 30, 45, 60].map((dur) => (
                    <button
                      key={dur}
                      type="button"
                      onClick={() => setSelectedDuration(dur)}
                      style={{
                        flex: 1,
                        padding: '8px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        border: selectedDuration === dur ? '1px solid #F59E0B' : '1px solid rgba(255,255,255,0.08)',
                        background: selectedDuration === dur ? '#D97706' : 'rgba(255,255,255,0.05)',
                        color: '#FFFFFF',
                        fontWeight: selectedDuration === dur ? 700 : 500,
                        cursor: 'pointer'
                      }}
                    >
                      {dur} मिनट
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Slot */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E1', marginBottom: '6px' }}>
                    दिनांक चुनें:
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    style={{
                      width: '100%',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: '#FFFFFF',
                      fontSize: '13px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E1', marginBottom: '6px' }}>
                    उपलब्ध समय स्लॉट:
                  </label>
                  <select
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#1E293B',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: '#FFFFFF',
                      fontSize: '13px'
                    }}
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* User Details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E1', marginBottom: '4px' }}>
                    आपका नाम:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. राहुल शर्मा"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: '#FFFFFF',
                      fontSize: '13px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E1', marginBottom: '4px' }}>
                    मोबाइल नंबर (व्हाट्सएप):
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="उदा. 9876543210"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: '#FFFFFF',
                      fontSize: '13px'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E1', marginBottom: '4px' }}>
                  परामर्श का मुख्य विषय:
                </label>
                <select
                  value={userTopic}
                  onChange={(e) => setUserTopic(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#1E293B',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: '#FFFFFF',
                    fontSize: '13px'
                  }}
                >
                  <option value="Career & Business (करियर एवं व्यापार)">करियर, नौकरी एवं व्यापार</option>
                  <option value="Marriage & Kundli Milan (विवाह एवं वैवाहिक सुख)">विवाह एवं दांपत्य जीवन</option>
                  <option value="Wealth & Finance (धन लाभ एवं आर्थिक स्थिति)">धन, संपत्ति एवं कर्ज मुक्ति</option>
                  <option value="Health & Medical Astrology (स्वास्थ्य एवं दीर्घायु)">स्वास्थ्य एवं दीर्घायु</option>
                  <option value="Foreign Travel (विदेश यात्रा एवं बसना)">विदेश यात्रा एवं शिक्षा</option>
                  <option value="Graha Dosha & Remedies (दोष शांति एवं उपाय)">ग्रह दोष निवारण (कालसर्प, मंगल, साढ़ेसाती)</option>
                </select>
              </div>

              {/* Price summary */}
              <div style={{
                background: 'rgba(245, 158, 11, 0.08)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                borderRadius: '12px',
                padding: '12px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#94A3B8' }}>कुल शुल्क ({selectedDuration} मिनट)</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#FDE68A' }}>
                    ₹{totalAmount} <span style={{ fontSize: '11px', color: '#A7F3D0', fontWeight: 'normal' }}>(जीएसटी सम्मिलित)</span>
                  </div>
                </div>

                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '10px 22px',
                    borderRadius: '999px',
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(217, 119, 6, 0.4)'
                  }}
                >
                  पुष्टि करें एवं स्लॉट लॉक करें
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
