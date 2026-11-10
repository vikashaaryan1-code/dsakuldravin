import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { ServiceCard } from '../components/cards/ServiceCard';
import { 
  Landmark, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  HelpCircle, 
  Search, 
  AlertTriangle,
  CreditCard,
  BookOpen,
  Users,
  Award
} from 'lucide-react';

export const GovernmentServicesPage: React.FC = () => {
  const { services, language } = useApp();
  const [selectedSubCat, setSelectedSubCat] = useState<'all' | 'identity' | 'certificates' | 'employment' | 'welfare'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const govtServices = services.filter(s => s.category === 'government');

  const filteredServices = govtServices.filter(s => {
    const matchSearch = (
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (selectedSubCat === 'identity') {
      return matchSearch && (
        s.slug.includes('pan') || 
        s.slug.includes('passport') || 
        s.slug.includes('aadhaar') || 
        s.slug.includes('voter') || 
        s.slug.includes('driving') || 
        s.slug.includes('dl')
      );
    }
    if (selectedSubCat === 'certificates') {
      return matchSearch && (
        s.slug.includes('cert') || 
        s.slug.includes('income') || 
        s.slug.includes('ration')
      );
    }
    if (selectedSubCat === 'employment' || selectedSubCat === 'welfare') {
      return matchSearch && (
        s.slug.includes('eshram') || 
        s.slug.includes('welfare') || 
        s.slug.includes('scheme') || 
        s.slug.includes('ayushman') || 
        s.slug.includes('kisan')
      );
    }
    return matchSearch;
  });

  return (
    <div className="container-wide" style={{ padding: '2.5rem 1.5rem 4rem' }}>
      {/* Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0A192F 0%, #0D2137 60%, #1D4ED8 100%)',
        borderRadius: '24px',
        padding: '3rem 2.5rem',
        color: '#FFFFFF',
        marginBottom: '2.5rem',
        position: 'relative',
        overflow: 'hidden',
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
          <span>AUTHORIZED FACILITATOR & CITIZEN ASSISTANCE</span>
        </div>

        <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 900, marginBottom: '0.75rem', color: '#FFFFFF' }}>
          {language === 'hi' ? 'सरकारी एवं नागरिक सहायता सेवाएँ' : 'Government & Citizen Services'}
        </h1>
        <p style={{ fontSize: '1rem', color: '#CBD5E1', maxWidth: '680px', lineHeight: 1.6, marginBottom: '1.5rem' }}>
          Professional assisted online filing, form submissions, appointment bookings, and status tracking for Aadhaar, PAN, Passport, Income & Domicile certificates, and Welfare schemes.
        </p>

        {/* Statutory Notice */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '0.85rem 1.25rem',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          fontSize: '0.78rem',
          color: '#E2E8F0',
          maxWidth: '750px',
        }}>
          <AlertTriangle size={18} color="#F59E0B" style={{ flexShrink: 0 }} />
          <span>
            <strong>Statutory Transparency:</strong> Akul Dravin Digital Services provides technical guidance and assisted application facilitation. We are not a government body. All statutory decisions and approvals belong solely to the respective competent government authorities.
          </span>
        </div>
      </div>

      {/* Subcategory Filter Tabs & Search */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2rem',
      }}>
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
          {[
            { id: 'all', label: 'All Citizen Services' },
            { id: 'identity', label: 'Identity & IDs (PAN, Passport)' },
            { id: 'certificates', label: 'Certificates (Income, Caste, Domicile)' },
            { id: 'employment', label: 'Employment & Welfare (E-Shram)' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedSubCat(tab.id as any)}
              style={{
                padding: '0.6rem 1.1rem',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '0.85rem',
                background: selectedSubCat === tab.id ? '#1D4ED8' : '#FFFFFF',
                color: selectedSubCat === tab.id ? '#FFFFFF' : '#475569',
                border: selectedSubCat === tab.id ? '1px solid #1D4ED8' : '1px solid #CBD5E1',
                boxShadow: selectedSubCat === tab.id ? '0 4px 12px rgba(29, 78, 216, 0.25)' : 'none',
                transition: 'all 0.15s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: '#FFFFFF',
          padding: '0.5rem 0.95rem',
          borderRadius: '10px',
          border: '1px solid #CBD5E1',
          width: '280px',
        }}>
          <Search size={16} color="#64748B" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search citizen services..."
            style={{ border: 'none', outline: 'none', fontSize: '0.85rem', width: '100%' }}
          />
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid-3" style={{ gap: '1.5rem', marginBottom: '3rem' }}>
        {filteredServices.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {/* SLA & Process Explanation Strip */}
      <div style={{
        background: '#F8FAFC',
        borderRadius: '20px',
        padding: '2.5rem',
        border: '1px solid #E2E8F0',
      }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0A192F', marginBottom: '1.5rem', textAlign: 'center' }}>
          Standard Citizen Assistance Lifecycle
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
        }}>
          {[
            { step: '01', title: 'Document Verification', desc: 'Quantum AI scans documents for clarity and consistency before submission.' },
            { step: '02', title: 'Portal Application Filing', desc: 'Experienced digital executives submit forms on official government portals.' },
            { step: '03', title: 'Appointment & Biometrics', desc: 'Guidance and slot booking for physical biometric capture where required.' },
            { step: '04', title: 'Delivery & Archival', desc: 'Issued certificates delivered digitally to your encrypted Customer Vault.' },
          ].map((item, idx) => (
            <div key={idx} style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#F59E0B', marginBottom: '0.4rem' }}>{item.step}</div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0A192F', marginBottom: '0.25rem' }}>{item.title}</div>
              <p style={{ fontSize: '0.82rem', color: '#64748B', lineHeight: 1.45 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
