import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { printBrandedADCSDocument } from '../utils/documentBranding';
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
  Layers,
  Download,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const PropertyPage: React.FC = () => {
  const { properties, showToast, submitApplication, addLead, logAudit, language } = useApp();
  const [purposeFilter, setPurposeFilter] = useState<'all' | 'buy' | 'rent'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPropertyForVisit, setSelectedPropertyForVisit] = useState<any | null>(null);
  const [visitDate, setVisitDate] = useState('2026-11-18');
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [bookedVisit, setBookedVisit] = useState<{
    appId: string;
    propertyTitle: string;
    location: string;
    priceFormatted: string;
    visitorName: string;
    visitorPhone: string;
    visitDate: string;
  } | null>(null);

  const filteredProps = properties.filter(p => {
    const matchPurpose = purposeFilter === 'all' || p.purpose === purposeFilter;
    const matchType = typeFilter === 'all' || p.type.toLowerCase().includes(typeFilter.toLowerCase());
    const q = searchQuery.trim().toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q) || p.city.toLowerCase().includes(q);
    return matchPurpose && matchType && matchSearch;
  });

  const handleBookVisit = () => {
    const cleanPhone = visitorPhone.replace(/\D/g, '').slice(-10);
    if (!visitorName.trim() || !/^[6-9]\d{9}$/.test(cleanPhone)) {
      showToast('Invalid Contact Details', 'Please enter your full name and a valid 10-digit Indian mobile number.', 'error');
      return;
    }

    const appId = submitApplication({
      serviceId: 'srv-property-visit',
      serviceName: `Property Inspection: ${selectedPropertyForVisit.title}`,
      category: 'property',
      applicantName: visitorName.trim(),
      applicantPhone: `+91 ${cleanPhone}`,
      city: selectedPropertyForVisit.city,
      feePaid: 0,
      documentsUploaded: ['Property_Visit_Pass.pdf'],
      notes: `Scheduled visit for ${visitDate} at ${selectedPropertyForVisit.location}, ${selectedPropertyForVisit.city}`,
    });

    addLead({
      name: visitorName.trim(),
      company: selectedPropertyForVisit.title,
      email: 'property.desk@akuldravindigital.com',
      phone: `+91 ${cleanPhone}`,
      serviceInterested: `${selectedPropertyForVisit.purpose.toUpperCase()} — ${selectedPropertyForVisit.title}`,
      estimatedValue: selectedPropertyForVisit.price || 0,
      stage: 'Contacted',
      assignedExecutive: 'ADCS Real Estate Field Desk',
    });

    logAudit(`Property Site Visit Booked (${appId})`, `${selectedPropertyForVisit.title} on ${visitDate}`);
    setBookedVisit({
      appId,
      propertyTitle: selectedPropertyForVisit.title,
      location: `${selectedPropertyForVisit.location}, ${selectedPropertyForVisit.city}`,
      priceFormatted: selectedPropertyForVisit.priceFormatted,
      visitorName: visitorName.trim(),
      visitorPhone: `+91 ${cleanPhone}`,
      visitDate,
    });
    showToast('Site Visit Scheduled!', `Pass ${appId} created & assigned for ${visitDate}.`, 'success');
    confetti({ particleCount: 60, spread: 50 });
    setSelectedPropertyForVisit(null);
    setVisitorName('');
    setVisitorPhone('');
  };

  const handleDownloadVisitSlip = () => {
    if (!bookedVisit) return;
    printBrandedADCSDocument({
      title: 'Verified Property Inspection & Site Visit Pass',
      documentType: 'PROPERTY VISIT PASS',
      documentNumber: bookedVisit.appId,
      issuedDate: bookedVisit.visitDate,
      rows: [
        { label: 'Visitor Legal Name', value: bookedVisit.visitorName },
        { label: 'Registered Mobile', value: bookedVisit.visitorPhone },
        { label: 'Listed Property Title', value: bookedVisit.propertyTitle },
        { label: 'Property Location', value: bookedVisit.location },
        { label: 'Listed Valuation', value: bookedVisit.priceFormatted },
        { label: 'Scheduled Inspection Date', value: bookedVisit.visitDate },
      ],
      verificationUrl: `${typeof window !== 'undefined' ? window.location.origin : 'https://akuldravindigital.com'}/track?id=${encodeURIComponent(bookedVisit.appId)}`,
    });
  };

  return (
    <div className="container-wide" style={{ padding: '2.5rem 1.5rem 4rem' }}>
      {/* Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #061A36 0%, #031126 60%, #075ACB 100%)',
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
                background: purposeFilter === btn.id ? '#075ACB' : '#F1F5F9',
                color: purposeFilter === btn.id ? '#FFFFFF' : '#475569',
                border: '1px solid',
                borderColor: purposeFilter === btn.id ? '#075ACB' : '#CBD5E1',
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Search & Type Selector */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <Search size={15} color="#64748B" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              className="form-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search city or locality..."
              style={{ padding: '0.45rem 0.85rem 0.45rem 2.2rem', width: '220px' }}
            />
          </div>
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

      {/* Site Visit Confirmation Banner */}
      {bookedVisit && (
        <div style={{
          background: '#F0FDF4',
          border: '2px solid #86EFAC',
          borderRadius: '18px',
          padding: '1.5rem 2rem',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.25rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <CheckCircle2 size={30} color="#059669" />
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669' }}>
                VERIFIED SITE VISIT CONFIRMED • {bookedVisit.appId}
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#061A36' }}>
                {bookedVisit.propertyTitle} ({bookedVisit.visitDate})
              </div>
              <div style={{ fontSize: '0.82rem', color: '#475569' }}>
                Visitor: {bookedVisit.visitorName} ({bookedVisit.visitorPhone}) • {bookedVisit.location}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleDownloadVisitSlip}
              className="btn-gold btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontWeight: 800 }}
            >
              <Download size={14} />
              <span>Visit Pass</span>
            </button>
            <Link to={`/track?id=${encodeURIComponent(bookedVisit.appId)}`} className="btn-primary btn-sm" style={{ textDecoration: 'none' }}>
              Track Pass
            </Link>
          </div>
        </div>
      )}

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
                  onError={(e) => {
                    e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='340'><rect width='600' height='340' fill='%23061A36'/><text x='300' y='175' fill='%23F3D477' font-family='sans-serif' font-size='20' text-anchor='middle'>ADCS VERIFIED PROPERTY</text></svg>";
                  }}
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

                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#061A36', marginBottom: '0.75rem', lineHeight: 1.35 }}>
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
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#061A36', marginBottom: '0.25rem' }}>
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
                placeholder="10-digit Mobile (e.g. 9835012345)"
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
                disabled={!visitorName || !visitorPhone}
                className="btn-gold"
                style={{ flex: 2, fontWeight: 800 }}
              >
                Confirm Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Authorized Land Registry, Bhulekh & RERA Verification Portals */}
      <div style={{
        marginTop: '3rem',
        background: '#F8FAFC',
        borderRadius: '18px',
        padding: '1.5rem 2rem',
        border: '1px solid #E2E8F0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div>
          <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#075ACB', textTransform: 'uppercase' }}>
            AUTHORIZED RERA, BHULEKH & PROPERTY REGISTRATION PORTALS
          </div>
          <div style={{ fontSize: '0.84rem', color: '#475569', marginTop: '0.2rem' }}>
            Verify builder RERA registration, state land Khatiyan/mutation records, and deed appointment slots on official portals.
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
          {[
            { label: 'Bihar RERA', url: 'https://rera.bihar.gov.in/' },
            { label: 'Bhumijankari Registry', url: 'https://bhumijankari.bihar.gov.in/' },
            { label: 'NGDRS National Deed', url: 'https://ngdrs.gov.in/' },
            { label: 'UP IGRS Portal', url: 'https://igrsup.gov.in/' },
          ].map(p => (
            <a
              key={p.label}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none' }}
            >
              <span>{p.label}</span>
              <ExternalLink size={13} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
