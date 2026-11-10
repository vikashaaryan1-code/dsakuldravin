import React from 'react';
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
  ShieldCheck
} from 'lucide-react';

export const ConsultingPage: React.FC = () => {
  const { services, showToast, language } = useApp();

  const advisors = [
    { name: 'CA Arvind Singhal, FCA', title: 'Senior Tax & Corporate Structuring Partner', exp: '18+ Years', rate: '₹1,500 / 30 mins', slots: 'Today, 04:00 PM' },
    { name: 'Adv. Meenakshi Sundaram', title: 'High Court Legal Counsel & Trademark Attorney', exp: '14+ Years', rate: '₹2,000 / 30 mins', slots: 'Tomorrow, 11:30 AM' },
    { name: 'Dr. Vivek Ranade', title: 'Startup Pitch Deck & VC Funding Strategist', exp: '12+ Years', rate: '₹2,500 / 45 mins', slots: 'Tomorrow, 03:00 PM' },
  ];

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
                onClick={() => showToast('Consultation Booked', `Video consultation with ${adv.name} booked for ${adv.slots}. Meeting link generated.`, 'success')}
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
