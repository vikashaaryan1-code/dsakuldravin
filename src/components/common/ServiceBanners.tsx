import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Layers, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { ADCSLogo } from '../branding';

interface ServiceBannersProps {
  sectorFilter?: string;
  mode?: 'carousel' | 'strip';
}

/**
 * Multi-Service Enterprise Campaign Banners for Homepage & Sector Pages.
 * Strictly follows ADCS Deep Navy / Royal Blue / Metallic Gold brand system.
 */
export const ServiceBanners: React.FC<ServiceBannersProps> = ({
  sectorFilter,
  mode = 'carousel',
}) => {
  const { serviceBanners, language, openQuantumAI } = useApp();
  const navigate = useNavigate();

  const matching = sectorFilter
    ? serviceBanners.filter((b) => b.sectorKey === sectorFilter || b.sectorKey === 'pricing')
    : serviceBanners;

  const list = matching.length > 0 ? matching : serviceBanners;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (mode !== 'carousel' || list.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % list.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [mode, list.length]);

  const themeBg = (variant: 'navy' | 'royal' | 'gold') => {
    if (variant === 'royal') {
      return 'linear-gradient(125deg, #075ACB 0%, #061A36 82%)';
    }
    if (variant === 'gold') {
      return 'linear-gradient(125deg, #031126 0%, #061A36 65%, #5C4106 100%)';
    }
    return 'linear-gradient(125deg, #031126 0%, #061A36 60%, #0B2A57 100%)';
  };

  if (mode === 'strip') {
    return (
      <div style={{ margin: '0 0 1.75rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        {list.slice(0, 3).map((b) => (
          <div
            key={b.id}
            style={{
              background: themeBg(b.themeVariant),
              color: '#FFFFFF',
              borderRadius: '14px',
              padding: '1.2rem 1.3rem',
              border: '1px solid rgba(214, 161, 43, 0.35)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '0.75rem',
            }}
          >
            <div>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  color: '#F3D477',
                  background: 'rgba(214, 161, 43, 0.16)',
                  padding: '0.2rem 0.55rem',
                  borderRadius: '999px',
                  marginBottom: '0.45rem',
                }}
              >
                <Layers size={11} />
                {b.badge}
              </span>
              <h3 style={{ fontSize: '1.02rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.3rem' }}>
                {language === 'hi' ? b.titleHi : b.title}
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#CBD5E1', lineHeight: 1.5, margin: 0 }}>
                {language === 'hi' ? b.subtitleHi : b.subtitle}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Link
                to={b.targetRoute}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: '8px',
                  background: '#F3D477',
                  color: '#061A36',
                  fontWeight: 800,
                  fontSize: '0.78rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  textDecoration: 'none',
                }}
              >
                <span>{b.ctaLabel}</span>
                <ArrowRight size={13} />
              </Link>
              <button
                type="button"
                onClick={() => openQuantumAI(`Explain workflow & pricing for: ${b.title}`)}
                style={{
                  padding: '0.45rem 0.75rem',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.1)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255,255,255,0.22)',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}
              >
                <Sparkles size={12} color="#F3D477" />
                <span>Ask AI</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const current = list[activeIndex % list.length];

  return (
    <section className="container-wide">
      <div
        style={{
          background: themeBg(current.themeVariant),
          color: '#FFFFFF',
          borderRadius: '18px',
          padding: '1.75rem 2rem',
          border: '1.5px solid rgba(214, 161, 43, 0.4)',
          boxShadow: 'var(--adcs-shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ flex: '1 1 320px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', background: 'rgba(214, 161, 43, 0.16)', border: '1px solid rgba(243, 212, 119, 0.4)', padding: '0.25rem 0.7rem', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 800, color: '#F3D477', marginBottom: '0.6rem' }}>
              <ShieldCheck size={13} />
              <span>{current.badge} • ADCS MULTI-SERVICE CAMPAIGN</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.25rem, 2.3vw, 1.85rem)', fontWeight: 900, color: '#FFFFFF', marginBottom: '0.45rem' }}>
              {language === 'hi' ? current.titleHi : current.title}
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#CBD5E1', lineHeight: 1.6, maxWidth: '720px' }}>
              {language === 'hi' ? current.subtitleHi : current.subtitle}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', marginTop: '1rem' }}>
              <button
                type="button"
                onClick={() => navigate(current.targetRoute)}
                className="btn-gold"
                style={{ fontWeight: 800 }}
              >
                <span>{current.ctaLabel}</span>
                <ArrowRight size={15} />
              </button>
              <button
                type="button"
                onClick={() => openQuantumAI(`Guide me on ${current.title} with UTR payment steps.`)}
                className="btn-outline-light"
              >
                <Sparkles size={14} color="#F3D477" />
                <span>AI Workflow Guide</span>
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem' }}>
            <ADCSLogo variant="compact" theme="dark" height={72} decorative />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <button
                type="button"
                aria-label="Previous service banner"
                onClick={() => setActiveIndex((prev) => (prev - 1 + list.length) % list.length)}
                style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'rgba(255,255,255,0.12)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <ChevronLeft size={16} />
              </button>
              <span style={{ fontSize: '0.76rem', fontWeight: 700, color: '#F3D477', minWidth: '40px', textAlign: 'center' }}>
                {(activeIndex % list.length) + 1} / {list.length}
              </span>
              <button
                type="button"
                aria-label="Next service banner"
                onClick={() => setActiveIndex((prev) => (prev + 1) % list.length)}
                style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'rgba(255,255,255,0.12)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Compact Banner Quick Switcher Pills */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))', gap: '0.55rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.12)' }}>
          {list.map((b, idx) => (
            <button
              key={b.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              style={{
                textAlign: 'left',
                padding: '0.55rem 0.75rem',
                borderRadius: '10px',
                background: idx === activeIndex ? 'rgba(243, 212, 119, 0.16)' : 'rgba(255,255,255,0.05)',
                border: idx === activeIndex ? '1px solid #F3D477' : '1px solid rgba(255,255,255,0.1)',
                color: '#FFFFFF',
                fontSize: '0.76rem',
              }}
            >
              <div style={{ fontWeight: 800, color: idx === activeIndex ? '#F3D477' : '#93C5FD', fontSize: '0.68rem' }}>
                {b.badge}
              </div>
              <div style={{ fontWeight: 700, marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {b.ctaLabel}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
