import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../../store/AppContext';
import { 
  Search, 
  X, 
  Sparkles, 
  ArrowRight, 
  FileText, 
  Clock, 
  CheckCircle2, 
  Tag, 
  ExternalLink,
  Bot
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const UniversalSmartSearch: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    services, 
    openApplyModal, 
    language, 
    t 
  } = useApp();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Close on Escape key or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  // Suggested prompt chips from requirements
  const samplePrompts = [
    { text: 'मुझे कंपनी शुरू करनी है', tag: 'Business' },
    { text: 'मुझे GST करवाना है', tag: 'Tax' },
    { text: 'मुझे CCTV लगवाना है', tag: 'Security' },
    { text: 'मुझे घर बनवाना है', tag: 'Construction' },
    { text: 'मुझे passport बनवाना है', tag: 'Govt' },
    { text: 'मुझे loan चाहिए', tag: 'Finance' },
    { text: 'मुझे किराये पर मकान चाहिए', tag: 'Rental' },
    { text: 'मुझे courier भेजना है', tag: 'Logistics' },
    { text: 'मुझे वेबसाइट चाहिए', tag: 'IT / SaaS' },
  ];

  // Natural Language Intent Mapping
  const nlpKeywords: Record<string, string[]> = {
    'कंपनी': ['business', 'pvt-ltd', 'incorporation'],
    'gst': ['gst', 'tax', 'returns'],
    'cctv': ['cctv', 'security', 'camera'],
    'घर': ['construction', 'turnkey', 'property'],
    'मकान': ['property', 'rental', 'construction'],
    'किराये': ['rental', 'rent', 'agreement'],
    'passport': ['passport', 'government', 'visa'],
    'पासपोर्ट': ['passport', 'government'],
    'loan': ['finance', 'loan', 'mudra'],
    'लोन': ['finance', 'loan'],
    'courier': ['courier', 'logistics', 'pickup'],
    'कूरियर': ['courier', 'logistics'],
    'वेबसाइट': ['website', 'it', 'software'],
    'website': ['website', 'it', 'software'],
    'pan': ['pan', 'government'],
    'पैन': ['pan', 'government'],
    'aadhaar': ['government', 'identity'],
    'आधार': ['government', 'identity'],
  };

  const filteredServices = useMemo(() => {
    if (!query.trim()) return services.slice(0, 6);

    const q = query.toLowerCase().trim();
    
    // Check if query triggers any NLP intent
    let matchedCategoriesOrSlugs: string[] = [];
    Object.entries(nlpKeywords).forEach(([key, matches]) => {
      if (q.includes(key)) {
        matchedCategoriesOrSlugs.push(...matches);
      }
    });

    return services.filter(service => {
      const matchText = (
        service.title.toLowerCase().includes(q) ||
        service.titleHi.toLowerCase().includes(q) ||
        service.description.toLowerCase().includes(q) ||
        service.descriptionHi.toLowerCase().includes(q) ||
        service.category.toLowerCase().includes(q)
      );

      const matchNLP = matchedCategoriesOrSlugs.some(term => 
        service.category.toLowerCase().includes(term) ||
        service.slug.toLowerCase().includes(term) ||
        service.id.toLowerCase().includes(term)
      );

      return matchText || matchNLP;
    });
  }, [query, services]);

  if (!isSearchOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(10, 25, 47, 0.72)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '4rem 1rem 2rem',
      animation: 'fadeIn 0.2s ease-out',
    }}>
      <div 
        style={{
          width: '100%',
          maxWidth: '780px',
          background: '#FFFFFF',
          borderRadius: '20px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '85vh',
          border: '1px solid rgba(245, 158, 11, 0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid #E2E8F0',
          background: '#F8FAFC',
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)',
            borderRadius: '10px',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
          }}>
            <Sparkles size={20} color="#F59E0B" />
          </div>

          <div style={{ flex: 1, position: 'relative' }}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="आपको कौन-सी सेवा चाहिए? / What service do you need?"
              autoFocus
              style={{
                width: '100%',
                border: 'none',
                background: 'transparent',
                fontSize: '1.1rem',
                fontWeight: 600,
                color: '#0A192F',
                outline: 'none',
              }}
            />
          </div>

          {query && (
            <button
              onClick={() => setQuery('')}
              style={{ padding: '0.3rem', color: '#94A3B8', borderRadius: '50%' }}
            >
              <X size={18} />
            </button>
          )}

          <button
            onClick={() => setIsSearchOpen(false)}
            style={{
              padding: '0.4rem 0.75rem',
              borderRadius: '8px',
              background: '#E2E8F0',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: '#475569',
            }}
          >
            ESC
          </button>
        </div>

        {/* Quick NLP Prompt Chips */}
        <div style={{
          padding: '0.75rem 1.5rem',
          background: '#FFFFFF',
          borderBottom: '1px solid #F1F5F9',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
        }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
            AI Suggestions:
          </span>
          {samplePrompts.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => setQuery(sample.text)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.3rem 0.65rem',
                borderRadius: '16px',
                background: '#F1F5F9',
                color: '#1E293B',
                fontSize: '0.8rem',
                fontWeight: 500,
                border: '1px solid #E2E8F0',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#3B82F6'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E2E8F0'}
            >
              <span>{sample.text}</span>
            </button>
          ))}
        </div>

        {/* Results List */}
        <div style={{
          padding: '1.25rem 1.5rem',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem',
          flex: 1,
        }}>
          {filteredServices.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748B' }}>
              <Bot size={40} color="#94A3B8" style={{ margin: '0 auto 1rem' }} />
              <div style={{ fontWeight: 600, fontSize: '1.05rem', color: '#0A192F' }}>No direct service found</div>
              <p style={{ fontSize: '0.88rem', marginTop: '0.25rem' }}>
                Ask Quantum AI to auto-route or configure this custom service for you.
              </p>
            </div>
          ) : (
            filteredServices.map(item => (
              <div
                key={item.id}
                style={{
                  padding: '1rem',
                  borderRadius: '14px',
                  border: '1px solid #E2E8F0',
                  background: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#93C5FD';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(37, 99, 235, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span className="badge badge-blue" style={{ textTransform: 'capitalize' }}>
                      {item.category.replace('-', ' ')}
                    </span>
                    {item.badge && (
                      <span className="badge badge-gold">{item.badge}</span>
                    )}
                  </div>

                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0A192F', marginBottom: '0.25rem' }}>
                    {language === 'hi' ? item.titleHi : item.title}
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: '#64748B', lineHeight: 1.4, marginBottom: '0.5rem' }}>
                    {language === 'hi' ? item.descriptionHi : item.description}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap', fontSize: '0.78rem', color: '#475569' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Clock size={13} color="#D97706" />
                      <span>{language === 'hi' ? item.timelineHi : item.timeline}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <FileText size={13} color="#1D4ED8" />
                      <span>{item.requiredDocs.length} Docs Required</span>
                    </div>
                    <div style={{ fontWeight: 700, color: '#0A192F', fontSize: '0.92rem' }}>
                      {item.basePrice === 0 ? 'Free Discovery' : `₹${item.basePrice.toLocaleString('en-IN')}`}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      openApplyModal(item);
                    }}
                    className="btn-primary btn-sm"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    Apply Now
                    <ArrowRight size={14} />
                  </button>
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      navigate(`/${item.category}`);
                    }}
                    style={{
                      fontSize: '0.75rem',
                      color: '#64748B',
                      textAlign: 'center',
                      textDecoration: 'underline',
                    }}
                  >
                    View Sector
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info strip */}
        <div style={{
          padding: '0.75rem 1.5rem',
          background: '#F8FAFC',
          borderTop: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.78rem',
          color: '#64748B',
        }}>
          <span>AI-Powered Natural Query Parser Active • Bilingual (Hindi / English)</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
