import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { 
  Receipt, 
  Search, 
  CheckCircle2, 
  HelpCircle, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const PricingPage: React.FC = () => {
  const { services, openApplyModal, language } = useApp();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filtered = services.filter(s => {
    const matchSearch = s.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === 'all' || s.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="container-wide" style={{ padding: '2.5rem 1.5rem 4rem' }}>
      <div style={{
        background: 'linear-gradient(135deg, #0A192F 0%, #0D2137 60%, #1D4ED8 100%)',
        borderRadius: '24px',
        padding: '3rem 2.5rem',
        color: '#FFFFFF',
        marginBottom: '2.5rem',
        textAlign: 'center',
      }}>
        <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>100% TRANSPARENCY</span>
        <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 900, marginBottom: '0.75rem', color: '#FFFFFF' }}>
          {language === 'hi' ? 'पारदर्शी सेवा शुल्क सूचकांक' : 'Transparent Pricing & Tariff Index'}
        </h1>
        <p style={{ fontSize: '1rem', color: '#CBD5E1', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
          Itemized government fees, professional consultation, and platform service charges. Zero hidden surcharges.
        </p>
      </div>

      {/* Pricing Formula Callout (Section 37) */}
      <div style={{
        background: '#EFF6FF',
        borderRadius: '16px',
        padding: '1.25rem 1.75rem',
        border: '1px solid #BFDBFE',
        marginBottom: '2.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Sparkles size={22} color="#1D4ED8" />
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0A192F' }}>
              Universal Pricing Formula Engine
            </div>
            <div style={{ fontSize: '0.8rem', color: '#1E40AF', marginTop: '0.1rem' }}>
              Base Fee + Statutory Government Fee + Professional Fee + Tax (GST) - Discount = Final Price
            </div>
          </div>
        </div>
        <span className="badge badge-blue">ITC Input Tax Credit Applicable</span>
      </div>

      {/* Search and Category Filter */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2rem',
      }}>
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
            placeholder="Search price for any service..."
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.85rem' }}
          />
        </div>

        <select
          className="form-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ width: 'auto', padding: '0.55rem 1rem' }}
        >
          <option value="all">All Sectors</option>
          <option value="government">Government Services</option>
          <option value="business">Business & Incorporation</option>
          <option value="cyber-cafe">Cyber Café & Xerox</option>
          <option value="cctv">CCTV & Hardware</option>
          <option value="construction">Construction & BOQ</option>
          <option value="courier">Courier & Logistics</option>
          <option value="website-it">IT & Software</option>
        </select>
      </div>

      {/* Pricing Data Table */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid #E2E8F0',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '1rem 1.5rem' }}>Service Offering</th>
                <th style={{ padding: '1rem' }}>Category</th>
                <th style={{ padding: '1rem' }}>Govt / Portal Fee</th>
                <th style={{ padding: '1rem' }}>Platform Fee</th>
                <th style={{ padding: '1rem' }}>Total Starting Fee</th>
                <th style={{ padding: '1rem' }}>SLA Timeline</th>
                <th style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr
                  key={s.id}
                  style={{ borderBottom: '1px solid #F1F5F9', transition: 'background 0.1s' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFC'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ fontWeight: 700, color: '#0A192F' }}>{s.title}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{s.requiredDocs.length} Verification Documents</div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span className="badge badge-gray" style={{ textTransform: 'capitalize' }}>
                      {s.category.replace('-', ' ')}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', color: '#64748B' }}>
                    {s.govtFee && s.govtFee > 0 ? `₹${s.govtFee}` : '₹0 (Included)'}
                  </td>
                  <td style={{ padding: '1rem', color: '#64748B' }}>
                    ₹{s.professionalFee || s.basePrice}
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 800, color: '#0A192F', fontSize: '0.98rem' }}>
                    {s.basePrice === 0 ? 'Free Consultation' : `₹${s.basePrice.toLocaleString('en-IN')}`}
                  </td>
                  <td style={{ padding: '1rem', color: '#475569', fontSize: '0.82rem' }}>
                    <Clock size={13} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle', color: '#D97706' }} />
                    {s.timeline}
                  </td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    <button
                      onClick={() => openApplyModal(s)}
                      className="btn-primary btn-sm"
                    >
                      <span>Apply</span>
                      <ArrowRight size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
