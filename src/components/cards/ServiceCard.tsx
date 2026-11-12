import React from 'react';
import { ServiceItem } from '../../types';
import { useApp } from '../../store/AppContext';
import { 
  Clock, 
  FileText, 
  ArrowRight, 
  ShoppingCart, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

interface ServiceCardProps {
  service: ServiceItem;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { openApplyModal, addToCart, language } = useApp();

  return (
    <div 
      className="card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '16px',
        border: '1px solid #E2E8F0',
        padding: '1.4rem',
        background: '#FFFFFF',
        boxShadow: '0 4px 16px rgba(10, 25, 47, 0.04)',
        position: 'relative',
        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#93C5FD';
        e.currentTarget.style.boxShadow = '0 12px 30px rgba(29, 78, 216, 0.08)';
        e.currentTarget.style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#E2E8F0';
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(10, 25, 47, 0.04)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div>
        {/* Top Badges */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <span className="badge badge-blue" style={{ textTransform: 'capitalize' }}>
            {service.category.replace('-', ' ')}
          </span>
          {service.badge && (
            <span className="badge badge-gold">
              {service.badge}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: '1.08rem',
          fontWeight: 700,
          color: '#061A36',
          lineHeight: 1.35,
          marginBottom: '0.45rem',
        }}>
          {language === 'hi' ? service.titleHi : service.title}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: '0.84rem',
          color: '#64748B',
          lineHeight: 1.5,
          marginBottom: '1rem',
          minHeight: '2.5rem',
        }}>
          {language === 'hi' ? service.descriptionHi : service.description}
        </p>

        {/* Requirements & Timeline */}
        <div style={{
          background: '#F8FAFC',
          borderRadius: '10px',
          padding: '0.75rem',
          border: '1px solid #F1F5F9',
          marginBottom: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4rem',
          fontSize: '0.78rem',
          color: '#475569',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Clock size={13} color="#D97706" />
            <span><strong>Timeline:</strong> {language === 'hi' ? service.timelineHi : service.timeline}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <FileText size={13} color="#075ACB" />
            <span><strong>Docs:</strong> {service.requiredDocs && Array.isArray(service.requiredDocs) && service.requiredDocs.length > 0 ? `${service.requiredDocs.slice(0, 2).join(', ')}...` : (language === 'hi' ? 'पहचान एवं पता प्रमाण' : 'Identity & Address Proof')}</span>
          </div>
        </div>
      </div>

      {/* Pricing & Actions */}
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          paddingTop: '0.75rem',
          borderTop: '1px solid #F1F5F9',
          marginBottom: '1rem',
        }}>
          <div>
            <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block' }}>Fee Breakdown:</span>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#061A36' }}>
              {(() => {
                const priceVal = Number(service.basePrice ?? (service as any).price ?? 0);
                return priceVal === 0 ? 'Free Consultation' : `₹${priceVal.toLocaleString('en-IN')}`;
              })()}
            </span>
          </div>
          {service.govtFee && service.govtFee > 0 ? (
            <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 500 }}>
              + ₹{service.govtFee} Govt. Fee
            </span>
          ) : null}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.5rem' }}>
          <button
            onClick={() => openApplyModal(service)}
            className="btn-primary"
            style={{ width: '100%', fontSize: '0.88rem' }}
          >
            <span>Apply Now</span>
            <ArrowRight size={15} />
          </button>

          <button
            onClick={() => addToCart(service)}
            style={{
              padding: '0.65rem 0.85rem',
              borderRadius: '8px',
              background: '#F1F5F9',
              border: '1px solid #CBD5E1',
              color: '#061A36',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s ease',
            }}
            title="Add to Unified Cart"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
