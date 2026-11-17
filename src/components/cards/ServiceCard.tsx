import React from 'react';
import { ServiceItem } from '../../types';
import { useApp } from '../../store/AppContext';
import { resolveStatutoryProfile } from '../../data/statutoryDocumentRegistry';
import { 
  Clock, 
  FileText, 
  ArrowRight, 
  ShoppingCart, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck,
  Building2,
  Landmark,
  CreditCard,
  Plane,
  HeartHandshake,
  Car,
  Fingerprint,
  Zap,
  Coins,
  Sun
} from 'lucide-react';

interface ServiceCardProps {
  service: ServiceItem;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { openApplyModal, addToCart, language } = useApp();

  const statutoryProfile = service.category === 'government' ? resolveStatutoryProfile(service.id || service.slug) : null;
  const docsList = statutoryProfile 
    ? statutoryProfile.documentChecklist.map(d => language === 'hi' ? d.nameHi : d.name) 
    : service.requiredDocs;
  const officialAuthority = statutoryProfile?.officialAuthority;
  const displayTimeline = statutoryProfile 
    ? (language === 'hi' ? statutoryProfile.slaTimelineHi : statutoryProfile.slaTimeline)
    : (language === 'hi' ? service.timelineHi : service.timeline);

  // Helper to determine the rich service-related visual template banner
  const getBannerTemplate = () => {
    const sId = (service.id || service.slug || '').toLowerCase();
    const title = (service.title || '').toLowerCase();
    const cat = service.category;

    if (sId.includes('aadhaar') || title.includes('aadhaar')) {
      return {
        bg: 'linear-gradient(135deg, #075ACB 0%, #031126 100%)',
        accent: '#00BAF2',
        tag: 'UIDAI myAadhaar',
        icon: <Fingerprint size={16} color="#00BAF2" />,
        pattern: 'Aadhaar 12-Digit Security',
        borderAccent: '#00BAF2'
      };
    }
    if (sId.includes('pan') || title.includes('pan')) {
      return {
        bg: 'linear-gradient(135deg, #061A36 0%, #1E3A8A 50%, #B45309 100%)',
        accent: '#F59E0B',
        tag: 'NSDL & UTIITSL',
        icon: <CreditCard size={16} color="#F59E0B" />,
        pattern: '10-Char PAN Card 49A',
        borderAccent: '#F59E0B'
      };
    }
    if (sId.includes('passport') || title.includes('passport')) {
      return {
        bg: 'linear-gradient(135deg, #4C0519 0%, #881337 60%, #061A36 100%)',
        accent: '#F3D477',
        tag: 'Passport Seva MEA',
        icon: <Plane size={16} color="#F3D477" />,
        pattern: 'Tatkal & Normal Seva',
        borderAccent: '#F43F5E'
      };
    }
    if (sId.includes('ayushman') || title.includes('ayushman') || sId.includes('health') || title.includes('health')) {
      return {
        bg: 'linear-gradient(135deg, #064E3B 0%, #047857 60%, #061A36 100%)',
        accent: '#6EE7B7',
        tag: 'PM-JAY ABHA',
        icon: <HeartHandshake size={16} color="#6EE7B7" />,
        pattern: '₹5 Lakhs Cashless Cover',
        borderAccent: '#10B981'
      };
    }
    if (sId.includes('dl') || title.includes('driving') || title.includes('sarathi')) {
      return {
        bg: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 60%, #061A36 100%)',
        accent: '#93C5FD',
        tag: 'MoRTH Sarathi RTO',
        icon: <Car size={16} color="#93C5FD" />,
        pattern: 'Smart Driving License',
        borderAccent: '#3B82F6'
      };
    }
    if (cat === 'astrology' || sId.includes('astro') || title.includes('kundli')) {
      return {
        bg: 'linear-gradient(135deg, #2E1065 0%, #581C87 50%, #78350F 100%)',
        accent: '#F3D477',
        tag: 'Vedic Kundli Research',
        icon: <Sun size={16} color="#F3D477" />,
        pattern: '12 Bhavas & Navagraha',
        borderAccent: '#F3D477'
      };
    }
    if (cat === 'business' || sId.includes('gst') || sId.includes('pvt-ltd') || sId.includes('msme')) {
      return {
        bg: 'linear-gradient(135deg, #061A36 0%, #0B2A57 60%, #075ACB 100%)',
        accent: '#F3D477',
        tag: 'Corporate & MSME',
        icon: <Building2 size={16} color="#F3D477" />,
        pattern: 'MCA SPICe+ & 15-Digit GST',
        borderAccent: '#075ACB'
      };
    }
    if (cat === 'bills' || sId.includes('bill') || sId.includes('bbps')) {
      return {
        bg: 'linear-gradient(135deg, #042F2E 0%, #0D9488 60%, #061A36 100%)',
        accent: '#F59E0B',
        tag: 'Bharat BillPay (BBPS)',
        icon: <Zap size={16} color="#F59E0B" />,
        pattern: 'Instant Bill Settle',
        borderAccent: '#0D9488'
      };
    }

    // Default Fallback Template
    return {
      bg: 'linear-gradient(135deg, #061A36 0%, #075ACB 100%)',
      accent: '#F3D477',
      tag: 'ADCS Verified Digital',
      icon: <Sparkles size={16} color="#F3D477" />,
      pattern: 'Statutory Facilitation',
      borderAccent: '#075ACB'
    };
  };

  const banner = getBannerTemplate();

  return (
    <div 
      className="card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '20px',
        border: '1.5px solid rgba(7, 90, 203, 0.16)',
        padding: '0',
        background: '#FFFFFF',
        boxShadow: '0 8px 24px rgba(10, 25, 47, 0.06)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = banner.borderAccent;
        e.currentTarget.style.boxShadow = '0 16px 36px rgba(7, 90, 203, 0.15)';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(7, 90, 203, 0.16)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(10, 25, 47, 0.06)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* 1. SERVICE-RELATED VISUAL TEMPLATE BANNER (TOP STRIP) */}
      <div style={{
        background: banner.bg,
        color: '#FFFFFF',
        padding: '0.85rem 1.25rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: `2px solid ${banner.borderAccent}`,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', zIndex: 1 }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {banner.icon}
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 900, color: banner.accent, letterSpacing: '0.04em' }}>
              {banner.tag}
            </div>
            <div style={{ fontSize: '0.66rem', color: '#CBD5E1', opacity: 0.9 }}>
              {banner.pattern}
            </div>
          </div>
        </div>

        {service.badge && (
          <span style={{
            background: 'rgba(243, 212, 119, 0.25)',
            border: '1px solid #F3D477',
            color: '#F3D477',
            fontSize: '0.64rem',
            fontWeight: 900,
            padding: '2px 7px',
            borderRadius: '999px',
            letterSpacing: '0.03em',
            zIndex: 1
          }}>
            {service.badge}
          </span>
        )}
      </div>

      {/* 2. CARD CONTENT BODY */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          {/* Category & Authority Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{
              background: '#EFF6FF',
              color: '#075ACB',
              fontSize: '0.68rem',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '999px',
              textTransform: 'capitalize'
            }}>
              {service.category.replace('-', ' ')}
            </span>
            {officialAuthority && (
              <span style={{
                background: '#FEF3C7',
                color: '#92400E',
                fontSize: '0.68rem',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '999px',
                maxWidth: '170px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }} title={officialAuthority}>
                🏛️ {officialAuthority.split('(')[0].trim()}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 style={{
            fontSize: '1.05rem',
            fontWeight: 800,
            color: '#061A36',
            lineHeight: 1.35,
            marginBottom: '0.45rem',
          }}>
            {language === 'hi' ? service.titleHi : service.title}
          </h3>

          {/* Description */}
          <p style={{
            fontSize: '0.82rem',
            color: '#64748B',
            lineHeight: 1.48,
            marginBottom: '0.85rem',
            minHeight: '2.4rem',
          }}>
            {language === 'hi' ? service.descriptionHi : service.description}
          </p>

          {/* Requirements & Timeline */}
          <div style={{
            background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
            borderRadius: '12px',
            padding: '0.65rem 0.85rem',
            border: '1px solid #E2E8F0',
            marginBottom: '0.85rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem',
            fontSize: '0.76rem',
            color: '#475569',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Clock size={13} color="#D97706" />
              <span><strong>Timeline:</strong> {displayTimeline}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <FileText size={13} color="#075ACB" />
              <span><strong>Docs:</strong> {docsList && docsList.length > 0 ? `${docsList.slice(0, 2).join(', ')}...` : (language === 'hi' ? 'पहचान एवं पता प्रमाण' : 'Identity & Address Proof')}</span>
            </div>
          </div>
        </div>

        {/* Pricing, Discount Badge & Actions */}
        <div>
          {/* Customer Discount Highlight Chip */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
            color: '#065F46',
            border: '1px solid #A7F3D0',
            padding: '3px 8px',
            borderRadius: '6px',
            fontSize: '0.72rem',
            fontWeight: 800,
            marginBottom: '0.65rem'
          }}>
            <span>🎁</span>
            <span>छूट उपलब्ध • Discount as per Customer (₹25/₹50/10%)</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            paddingTop: '0.6rem',
            borderTop: '1px solid #F1F5F9',
            marginBottom: '0.85rem',
          }}>
            <div>
              <span style={{ fontSize: '0.7rem', color: '#64748B', display: 'block' }}>Fee Breakdown:</span>
              <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#061A36' }}>
                {(() => {
                  const priceVal = statutoryProfile ? statutoryProfile.adcsFacilitationFee : Number(service.basePrice ?? (service as any).price ?? 0);
                  return priceVal === 0 ? 'Free Consultation' : `₹${priceVal.toLocaleString('en-IN')}`;
                })()}
              </span>
            </div>
            {(() => {
              const govtFeeVal = statutoryProfile ? statutoryProfile.statutoryGovtFee : (service.govtFee || 0);
              return govtFeeVal > 0 ? (
                <span style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: 600 }}>
                  + ₹{govtFeeVal} Govt. Fee
                </span>
              ) : null;
            })()}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.5rem' }}>
            <button
              onClick={() => openApplyModal(service)}
              className="btn-primary"
              style={{
                width: '100%',
                fontSize: '0.86rem',
                borderRadius: '10px',
                padding: '0.65rem 1rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.45rem',
                boxShadow: '0 4px 14px rgba(7, 90, 203, 0.25)'
              }}
            >
              <span>Apply Now</span>
              <ArrowRight size={15} />
            </button>

            <button
              onClick={() => addToCart(service)}
              style={{
                padding: '0.65rem 0.85rem',
                borderRadius: '10px',
                background: '#F1F5F9',
                border: '1px solid #CBD5E1',
                color: '#061A36',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease',
                cursor: 'pointer'
              }}
              title="Add to Unified Cart"
            >
              <ShoppingCart size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
