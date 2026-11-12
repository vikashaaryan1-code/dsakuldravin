import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { ServiceCard } from '../components/cards/ServiceCard';
import { ServiceBanners } from '../components/common/ServiceBanners';
import { serviceCategories } from '../data/servicesData';
import { 
  Grid, 
  Search, 
  Sparkles, 
  SlidersHorizontal, 
  Landmark, 
  Monitor, 
  Briefcase, 
  Layers 
} from 'lucide-react';

export const ServicesMarketplacePage: React.FC = () => {
  const { services, language } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filtered = services.filter(s => {
    const matchCat = selectedCategory === 'all' || s.category === selectedCategory;
    const matchSearch = (
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase())
    );
    return matchCat && matchSearch;
  });

  return (
    <div className="container-wide" style={{ padding: '2.5rem 1.5rem 4rem' }}>
      {/* Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #061A36 0%, #031126 60%, #075ACB 100%)',
        borderRadius: '24px',
        padding: '3rem 2.5rem',
        color: '#FFFFFF',
        marginBottom: '2.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem',
      }}>
        <div>
          <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>UNLIMITED SERVICE CATALOG</span>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 900, marginBottom: '0.75rem', color: '#FFFFFF' }}>
            {language === 'hi' ? 'संपूर्ण डिजिटल सेवा बाज़ार' : 'Complete Service Marketplace'}
          </h1>
          <p style={{ fontSize: '1rem', color: '#CBD5E1', maxWidth: '640px', lineHeight: 1.6 }}>
            Browse hundreds of citizen, legal, financial, infrastructure, and cyber café services. Continuously expandable via Super Admin zero-code engine.
          </p>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '1rem 1.5rem',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#F59E0B' }}>{services.length}</div>
          <div style={{ fontSize: '0.75rem', color: '#93C5FD' }}>Active Services Live</div>
        </div>
      </div>

      {/* Multi-Service Campaign Banners */}
      <ServiceBanners mode="strip" />

      {/* Filter and Search Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2rem',
      }}>
        {/* Category Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ width: 'auto', padding: '0.6rem 1.25rem', fontWeight: 600 }}
          >
            <option value="all">All Sectors ({services.length})</option>
            {serviceCategories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: '#FFFFFF',
          padding: '0.55rem 1rem',
          borderRadius: '10px',
          border: '1px solid #CBD5E1',
          width: '320px',
        }}>
          <Search size={16} color="#64748B" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search service catalog..."
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.85rem' }}
          />
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid-3" style={{ gap: '1.5rem' }}>
        {filtered.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};
