import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { 
  Building2, 
  MapPin, 
  Search, 
  CheckCircle2, 
  Calendar, 
  Phone, 
  Tag, 
  SlidersHorizontal,
  Home,
  Store,
  Layers
} from 'lucide-react';

export const PropertyPage: React.FC = () => {
  const { properties, showToast, language } = useApp();
  const [purposeFilter, setPurposeFilter] = useState<'all' | 'buy' | 'rent'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedPropertyForVisit, setSelectedPropertyForVisit] = useState<any | null>(null);
  const [visitDate, setVisitDate] = useState('2026-09-24');
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');

  const filteredProps = properties.filter(p => {
    const matchPurpose = purposeFilter === 'all' || p.purpose === purposeFilter;
    const matchType = typeFilter === 'all' || p.type.toLowerCase().includes(typeFilter.toLowerCase());
    return matchPurpose && matchType;
  });

  const handleBookVisit = () => {
    if (!visitorName) return;
    showToast('Site Visit Scheduled!', `Visit for ${selectedPropertyForVisit.title} booked for ${visitDate}. Our local field agent will contact you.`, 'success');
    setSelectedPropertyForVisit(null);
    setVisitorName('');
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
          <Building2 size={14} />
          <span>VERIFIED REAL ESTATE & LAND REGISTRY MARKETPLACE</span>
        </div>

        <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 900, marginBottom: '0.75rem', color: '#FFFFFF' }}>
          {language === 'hi' ? 'सत्यापित प्रॉपर्टी बाज़ार' : 'Property Super Marketplace'}
        </h1>
        <p style={{ fontSize: '1rem', color: '#CBD5E1', maxWidth: '640px', lineHeight: 1.6 }}>
          Buy, sell, rent, or lease residential flats, independent villas, commercial shops, and verified gated community plots with zero broker hassle.
        </p>
      </div>

      {/* Filter Bar */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '18px',
        padding: '1.25rem 1.75rem',
        boxShadow: '0 4px 20px rgba(10, 25, 47, 0.05)',
        border: '1px solid #E2E8F0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2.5rem',
      }}>
        {/* Purpose Filter */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[
            { id: 'all', label: 'All Properties' },
            { id: 'buy', label: 'Buy' },
            { id: 'rent', label: 'Rent' },
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setPurposeFilter(btn.id as any)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.85rem',
                background: purposeFilter === btn.id ? '#1D4ED8' : '#F1F5F9',
                color: purposeFilter === btn.id ? '#FFFFFF' : '#475569',
                border: '1px solid',
                borderColor: purposeFilter === btn.id ? '#1D4ED8' : '#CBD5E1',
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Type Selector */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 600 }}>Type:</span>
          <select
            className="form-select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            style={{ padding: '0.45rem 0.8rem', width: 'auto' }}
          >
            <option value="all">All Types (Residential, Commercial, Plot)</option>
            <option value="residential">Residential Flats & Houses</option>
            <option value="commercial">Commercial Offices & Shops</option>
            <option value="plot">Plots & Land</option>
          </select>
        </div>
      </div>

      {/* Property Cards Grid */}
      <div className="grid-3" style={{ gap: '1.75rem' }}>
        {filteredProps.map(prop => (
          <div
            key={prop.id}
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #E2E8F0',
              overflow: 'hidden',
              boxShadow: '0 6px 20px rgba(10, 25, 47, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div>
              {/* Photo Banner with Badges */}
              <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <img
                  src={prop.image}
                  alt={prop.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  display: 'flex',
                  gap: '0.4rem',
                }}>
                  <span className="badge badge-blue" style={{ textTransform: 'uppercase' }}>
                    FOR {prop.purpose}
                  </span>
                  {prop.isVerified && (
                    <span className="badge badge-green">
                      Registry Verified
                    </span>
                  )}
                </div>

                <div style={{
                  position: 'absolute',
                  bottom: '0.75rem',
                  right: '0.75rem',
                  background: 'rgba(10, 25, 47, 0.85)',
                  backdropFilter: 'blur(6px)',
                  color: '#FFFFFF',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '8px',
                  fontWeight: 800,
                  fontSize: '1rem',
                }}>
                  {prop.priceFormatted}
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#64748B', fontSize: '0.8rem', marginBottom: '0.4rem' }}>
                  <MapPin size={14} color="#D97706" />
                  <span>{prop.location}, {prop.city}</span>
                </div>

                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0A192F', marginBottom: '0.75rem', lineHeight: 1.35 }}>
                  {prop.title}
                </h3>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '0.5rem',
                  background: '#F8FAFC',
                  borderRadius: '10px',
                  padding: '0.75rem',
                  fontSize: '0.78rem',
                  color: '#475569',
                }}>
                  <div>
                    <span style={{ color: '#64748B' }}>Area:</span> <strong>{prop.areaSqFt} sq.ft</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748B' }}>Type:</span> <strong>{prop.type}</strong>
                  </div>
                  {prop.bhk && (
                    <div>
                      <span style={{ color: '#64748B' }}>Config:</span> <strong>{prop.bhk}</strong>
                    </div>
                  )}
                  {prop.furnishing && (
                    <div>
                      <span style={{ color: '#64748B' }}>Furnishing:</span> <strong>{prop.furnishing}</strong>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div style={{ padding: '0 1.5rem 1.5rem' }}>
              <button
                onClick={() => setSelectedPropertyForVisit(prop)}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Calendar size={15} />
                <span>Book Free Site Visit</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Book Visit Modal */}
      {selectedPropertyForVisit && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(10, 25, 47, 0.7)',
          backdropFilter: 'blur(6px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            width: '100%',
            maxWidth: '460px',
            padding: '1.75rem',
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0A192F', marginBottom: '0.25rem' }}>
              Schedule Free Site Visit
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '1.25rem' }}>
              {selectedPropertyForVisit.title}
            </p>

            <div className="form-group">
              <label className="form-label">Your Full Name *</label>
              <input
                type="text"
                className="form-input"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                placeholder="e.g. Anand Kishor"
                autoFocus
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number *</label>
              <input
                type="text"
                className="form-input"
                value={visitorPhone}
                onChange={(e) => setVisitorPhone(e.target.value)}
                placeholder="+91 98350 XXXXX"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Preferred Visit Date</label>
              <input
                type="date"
                className="form-input"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              <button
                onClick={() => setSelectedPropertyForVisit(null)}
                className="btn-secondary"
                style={{ flex: 1 }}
              >
                Cancel
              </button>
              <button
                onClick={handleBookVisit}
                disabled={!visitorName}
                className="btn-gold"
                style={{ flex: 2, fontWeight: 800 }}
              >
                Confirm Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
