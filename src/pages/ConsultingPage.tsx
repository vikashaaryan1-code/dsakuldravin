import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { ServiceCard } from '../components/cards/ServiceCard';
import { 
  Users2, 
  Scale, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  ArrowRight,
  ShieldCheck,
  X,
  Video,
  PhoneCall,
  Clock,
  User,
  ExternalLink
} from 'lucide-react';

export const ConsultingPage: React.FC = () => {
  const { services, showToast, logAudit, language } = useApp();

  const advisors = [
    { name: 'CA Arvind Singhal, FCA', title: 'Senior Tax & Corporate Structuring Partner', exp: '18+ Years', rate: '₹1,500 / 30 mins', slots: 'Today, 04:00 PM' },
    { name: 'Adv. Meenakshi Sundaram', title: 'High Court Legal Counsel & Trademark Attorney', exp: '14+ Years', rate: '₹2,000 / 30 mins', slots: 'Tomorrow, 11:30 AM' },
    { name: 'Dr. Vivek Ranade', title: 'Startup Pitch Deck & VC Funding Strategist', exp: '12+ Years', rate: '₹2,500 / 45 mins', slots: 'Tomorrow, 03:00 PM' },
  ];

  const [bookingAdvisor, setBookingAdvisor] = useState<{
    name: string;
    title: string;
    rate: string;
    slots: string;
  } | null>(null);

  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [chosenMode, setChosenMode] = useState<'video' | 'phone'>('video');
  const [topic, setTopic] = useState('');
  const [confirmedPass, setConfirmedPass] = useState<{
    passId: string;
    advisorName: string;
    slot: string;
    roomUrl: string;
  } | null>(null);

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone || !topic || !bookingAdvisor) {
      showToast('Validation Error', 'Please fill in all booking fields.', 'warning');
      return;
    }

    const passId = 'CNS-' + Math.floor(1000 + Math.random() * 9000);
    const roomUrl = `https://meet.akuldravin.com/room-${Math.random().toString(36).substring(2, 9)}`;

    setConfirmedPass({
      passId,
      advisorName: bookingAdvisor.name,
      slot: bookingAdvisor.slots,
      roomUrl
    });

    logAudit(`Consultation Booked: ${passId}`, `Advisor: ${bookingAdvisor.name} | Client: ${clientName}`);
    showToast('Consultation Confirmed', `Meeting token ${passId} generated with ${bookingAdvisor.name}.`, 'success');
  };

  return (
    <div className="container-wide" style={{ padding: '2.5rem 1.5rem 4rem' }}>
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
          <Users2 size={14} />
          <span>VERIFIED CHARTERED ACCOUNTANTS & LEGAL COUNSELS</span>
        </div>

        <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 900, marginBottom: '0.75rem', color: '#FFFFFF' }}>
          {language === 'hi' ? 'पेशेवर एवं कानूनी परामर्श' : 'Professional Consulting Marketplace'}
        </h1>
        <p style={{ fontSize: '1rem', color: '#CBD5E1', maxWidth: '640px', lineHeight: 1.6 }}>
          Book 1-on-1 audio/video consultations with certified Chartered Accountants, Company Secretaries, Trademark Attorneys, and Startup Growth Advisors.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {advisors.map((adv, idx) => (
          <div
            key={idx}
            style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              padding: '1.75rem',
              border: '1px solid #E2E8F0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1.5rem',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0A192F' }}>{adv.name}</h3>
                <span className="badge badge-green">Verified Fellow</span>
              </div>
              <div style={{ fontSize: '0.88rem', color: '#1D4ED8', fontWeight: 600 }}>{adv.title}</div>
              <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '0.3rem' }}>
                Experience: <strong>{adv.exp}</strong> • Next Available Slot: <strong>{adv.slots}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Consultation Fee</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0A192F' }}>{adv.rate}</div>
              </div>

              <button
                onClick={() => {
                  setBookingAdvisor(adv);
                  setConfirmedPass(null);
                }}
                className="btn-gold"
                style={{ fontWeight: 800 }}
              >
                <Calendar size={15} />
                <span>Book Slot</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* BOOKING MODAL */}
      {bookingAdvisor && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(10, 25, 47, 0.75)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1rem'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            maxWidth: '560px',
            width: '100%',
            padding: '2rem',
            boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            {!confirmedPass ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                  <div>
                    <span className="badge badge-gold">SECURE CONSULTATION INTAKE</span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0A192F', margin: '0.3rem 0' }}>
                      Book Session with {bookingAdvisor.name}
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: '#64748B', margin: 0 }}>
                      {bookingAdvisor.title} • {bookingAdvisor.rate}
                    </p>
                  </div>
                  <button
                    onClick={() => setBookingAdvisor(null)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.4rem' }}
                  >
                    <X size={20} color="#64748B" />
                  </button>
                </div>

                <form onSubmit={handleConfirmBooking} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ background: '#EFF6FF', borderRadius: '12px', padding: '0.85rem 1rem', border: '1px solid #BFDBFE' }}>
                    <div style={{ fontSize: '0.82rem', color: '#1E40AF', fontWeight: 700 }}>
                      Scheduled Slot: <strong>{bookingAdvisor.slots}</strong>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label className="form-label" style={{ fontSize: '0.8rem' }}>Your Name *</label>
                      <input
                        type="text"
                        required
                        className="form-input"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g. Alok Verma"
                      />
                    </div>
                    <div>
                      <label className="form-label" style={{ fontSize: '0.8rem' }}>Phone Number *</label>
                      <input
                        type="tel"
                        required
                        className="form-input"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="+91 98000 00000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label" style={{ fontSize: '0.8rem' }}>Consultation Mode</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <button
                        type="button"
                        onClick={() => setChosenMode('video')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          justifyContent: 'center',
                          padding: '0.75rem',
                          borderRadius: '10px',
                          border: chosenMode === 'video' ? '2px solid #2563EB' : '1px solid #E2E8F0',
                          background: chosenMode === 'video' ? '#EFF6FF' : '#FFFFFF',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          color: chosenMode === 'video' ? '#1D4ED8' : '#64748B',
                          cursor: 'pointer'
                        }}
                      >
                        <Video size={16} />
                        <span>WebRTC Video Call</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setChosenMode('phone')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          justifyContent: 'center',
                          padding: '0.75rem',
                          borderRadius: '10px',
                          border: chosenMode === 'phone' ? '2px solid #2563EB' : '1px solid #E2E8F0',
                          background: chosenMode === 'phone' ? '#EFF6FF' : '#FFFFFF',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          color: chosenMode === 'phone' ? '#1D4ED8' : '#64748B',
                          cursor: 'pointer'
                        }}
                      >
                        <PhoneCall size={16} />
                        <span>Phone Callback</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="form-label" style={{ fontSize: '0.8rem' }}>Topic / Legal Query *</label>
                    <textarea
                      required
                      rows={3}
                      className="form-textarea"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="Briefly state your inquiry, e.g. GST appeal representation or Section 138 legal notice..."
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => setBookingAdvisor(null)}
                      className="btn-secondary"
                      style={{ flex: 1, justifyContent: 'center' }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-gold"
                      style={{ flex: 1.5, justifyContent: 'center', fontWeight: 800 }}
                    >
                      Confirm Booking ({bookingAdvisor.rate.split('/')[0].trim()})
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: '#DCFCE7',
                  color: '#16A34A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem'
                }}>
                  <CheckCircle2 size={32} />
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0A192F', marginBottom: '0.5rem' }}>
                  Consultation Pass Issued
                </h3>
                <div style={{
                  background: '#F8FAFC',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  border: '1px solid #E2E8F0',
                  margin: '1.25rem 0',
                  textAlign: 'left'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Meeting Pass:</span>
                    <strong style={{ fontSize: '0.9rem', color: '#1D4ED8' }}>{confirmedPass.passId}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Advisor:</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0A192F' }}>{confirmedPass.advisorName}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', color: '#64748B' }}>Scheduled Time:</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#D97706' }}>{confirmedPass.slot}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#059669', marginTop: '0.5rem', background: '#DCFCE7', padding: '0.4rem 0.6rem', borderRadius: '6px' }}>
                    Encrypted Room Code: {confirmedPass.roomUrl.split('/').pop()}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                  <button
                    onClick={() => {
                      showToast('Calendar Sync', 'Consultation slot added to Google / Outlook Calendar.', 'success');
                    }}
                    className="btn-secondary"
                  >
                    Add to Calendar
                  </button>
                  <button
                    onClick={() => {
                      setBookingAdvisor(null);
                      setConfirmedPass(null);
                    }}
                    className="btn-primary"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Consulting & Legal Advisory Services Catalog */}
      <div style={{ marginTop: '3.5rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <span className="badge badge-blue" style={{ marginBottom: '0.4rem' }}>DIRECT ASSISTED FILINGS</span>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0A192F' }}>
            {language === 'hi' ? 'विशेषज्ञ कानूनी एवं वित्तीय सेवाएं' : 'CA, Tax & Legal Filing Services'}
          </h2>
        </div>

        <div className="grid-3" style={{ gap: '1.5rem' }}>
          {services.filter(s => s.category === 'consulting').map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};
