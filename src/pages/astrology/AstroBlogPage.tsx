import React, { useState } from 'react';
import { AstroHeaderNav } from '../../components/astrology/AstroHeaderNav';
import { ASTRO_BLOG_POSTS } from '../../data/astrologyData';
import { AstroBlogPost } from '../../types/astrology';
import { BookOpen, Calendar, Clock, User, Share2, ArrowRight, X, Sparkles, Tag } from 'lucide-react';

export const AstroBlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<AstroBlogPost | null>(null);

  const categories = [
    { id: 'all', label: 'सभी लेख (All)' },
    { id: 'Planetary Transits', label: 'ग्रह गोचर' },
    { id: 'Kundli Yogas', label: 'कुंडली योग' },
    { id: 'Gemology', label: 'रत्न विज्ञान' }
  ];

  const filteredPosts = ASTRO_BLOG_POSTS.filter((post) => {
    if (selectedCategory === 'all') return true;
    return post.category === selectedCategory;
  });

  return (
    <div style={{ background: '#031126', color: '#F8FAFC', minHeight: '100vh', paddingBottom: '80px' }}>
      <AstroHeaderNav />

      {/* Hero Banner */}
      <div style={{
        background: 'radial-gradient(ellipse at top, #1E1B4B 0%, #0F172A 70%)',
        padding: '40px 16px',
        borderBottom: '1px solid rgba(245, 158, 11, 0.2)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#FDE68A', background: 'rgba(245, 158, 11, 0.15)', padding: '4px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, marginBottom: '12px' }}>
            <BookOpen size={14} color="#F59E0B" /> वेदोक्त ज्योतिष ज्ञान एवं शोध
          </div>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', color: '#FDE68A', margin: '0 0 8px', fontWeight: 800 }}>
            ज्योतिष ब्लॉग एवं आलेख (Astro Knowledge Hub)
          </h1>
          <p style={{ color: '#CBD5E1', fontSize: '14px', margin: 0 }}>
            ग्रह गोचर, पर्व-त्यौहार, राजयोग, लाल किताब के अचूक उपाय और रत्न विज्ञान पर प्रमाणित वैदिक आलेख।
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1240px', margin: '30px auto 0', padding: '0 16px' }}>
        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px', marginBottom: '28px' }}>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              style={{
                padding: '8px 18px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: 600,
                border: selectedCategory === c.id ? '1px solid #F59E0B' : '1px solid rgba(255, 255, 255, 0.1)',
                background: selectedCategory === c.id ? '#D97706' : '#1E293B',
                color: '#FFFFFF',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '24px'
        }}>
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setActiveArticle(post)}
              style={{
                background: '#1E293B',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                cursor: 'pointer',
                transition: 'all 0.25s',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              }}
            >
              <div>
                <img
                  src={post.imageUrl}
                  alt={post.titleHi}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />

                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#F59E0B', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 700 }}>{post.categoryHi}</span>
                    <span>•</span>
                    <span>{post.readTimeHi}</span>
                  </div>

                  <h3 style={{ margin: '0 0 10px', fontSize: '18px', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.4 }}>
                    {post.titleHi}
                  </h3>

                  <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#94A3B8', lineHeight: 1.6 }}>
                    {post.excerptHi}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {post.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          color: '#CBD5E1',
                          fontSize: '11px',
                          padding: '2px 8px',
                          borderRadius: '4px'
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ padding: '0 20px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#64748B' }}>
                <span style={{ color: '#CBD5E1' }}>लेखक: {post.authorHi}</span>
                <span style={{ color: '#F59E0B', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  पढ़ें <ArrowRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            background: '#0F172A',
            width: '100%',
            maxWidth: '780px',
            maxHeight: '90vh',
            borderRadius: '24px',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.9), 0 0 35px rgba(217, 119, 6, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '16px 20px',
              background: '#1E293B',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: '12px', color: '#F59E0B', fontWeight: 700 }}>
                {activeArticle.categoryHi} • {activeArticle.readTimeHi}
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                style={{ color: '#94A3B8', background: 'rgba(255,255,255,0.05)', padding: '6px', borderRadius: '50%' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Article Content Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '28px' }}>
              <img
                src={activeArticle.imageUrl}
                alt={activeArticle.titleHi}
                style={{ width: '100%', height: '260px', objectFit: 'cover', borderRadius: '14px', marginBottom: '20px' }}
              />

              <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#FDE68A', lineHeight: 1.3, marginBottom: '12px' }}>
                {activeArticle.titleHi}
              </h2>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12px', color: '#94A3B8', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
                <span>लेखक: <strong style={{ color: '#FFFFFF' }}>{activeArticle.authorHi}</strong></span>
                <span>•</span>
                <span>प्रकाशन: {activeArticle.date}</span>
              </div>

              <div style={{ fontSize: '15px', lineHeight: 1.8, color: '#E2E8F0', marginBottom: '28px' }}>
                <p style={{ marginBottom: '16px' }}>{activeArticle.contentHi}</p>
                <p style={{ color: '#94A3B8', fontStyle: 'italic' }}>{activeArticle.contentEn}</p>
              </div>

              {/* Share & Disclaimer */}
              <div style={{ background: '#1E293B', padding: '16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ fontSize: '12px', color: '#94A3B8' }}>
                  ज्ञान बांटने से बढ़ता है। इसे अपने मित्रों व परिजनों के साथ साझा करें।
                </div>

                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(activeArticle.titleHi)}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    background: '#25D366',
                    color: '#FFFFFF',
                    padding: '6px 14px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  व्हाट्सएप पर शेयर करें
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
