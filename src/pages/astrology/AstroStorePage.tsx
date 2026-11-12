import React, { useState } from 'react';
import { AstroHeaderNav } from '../../components/astrology/AstroHeaderNav';
import { ASTRO_STORE_PRODUCTS } from '../../data/astrologyData';
import { AstroProduct } from '../../types/astrology';
import { AstroCartModal, AstroCartEntry } from '../../components/astrology/AstroCartModal';
import { ShoppingBag, Star, ShieldCheck, Tag, Sparkles, Filter, CheckCircle2, ArrowRight } from 'lucide-react';

export const AstroStorePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cartItems, setCartItems] = useState<AstroCartEntry[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductDetails, setSelectedProductDetails] = useState<AstroProduct | null>(null);

  const filteredProducts = ASTRO_STORE_PRODUCTS.filter((prod) => {
    if (selectedCategory === 'all') return true;
    return prod.category === selectedCategory;
  });

  const handleAddToCart = (product: AstroProduct) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQty = (productId: string, delta: number) => {
    setCartItems(prev => 
      prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as AstroCartEntry[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div style={{ background: '#031126', color: '#F8FAFC', minHeight: '100vh', paddingBottom: '80px' }}>
      <AstroHeaderNav />

      {/* Floating Cart Button */}
      {cartItems.length > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          style={{
            position: 'fixed',
            bottom: '85px',
            right: '24px',
            zIndex: 90,
            background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
            color: '#FFFFFF',
            border: '2px solid #F59E0B',
            borderRadius: '999px',
            padding: '12px 20px',
            boxShadow: '0 10px 30px rgba(217, 119, 6, 0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontWeight: 700,
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          <ShoppingBag size={18} />
          <span>कार्ट देखें ({cartItems.reduce((a, b) => a + b.quantity, 0)})</span>
        </button>
      )}

      {/* Hero Banner */}
      <div style={{
        background: 'radial-gradient(ellipse at top, #1E1B4B 0%, #0F172A 70%)',
        padding: '40px 16px',
        borderBottom: '1px solid rgba(245, 158, 11, 0.2)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#FDE68A', background: 'rgba(245, 158, 11, 0.15)', padding: '4px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, marginBottom: '12px' }}>
            <ShoppingBag size={14} color="#10B981" /> 100% लैब प्रमाणित एवं सिद्ध उत्पाद
          </div>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', color: '#FDE68A', margin: '0 0 8px', fontWeight: 800 }}>
            प्रामाणिक एस्ट्रो ई-स्टोर (Astro Store)
          </h1>
          <p style={{ color: '#CBD5E1', fontSize: '14px', margin: 0 }}>
            सरकारी लैब प्रमाणित प्राकृतिक रत्न, मूल नेपाली रुद्राक्ष, सिद्ध श्रीयंत्र एवं 50+ पृष्ठों की हस्तलिखित कुंडली रिपोर्ट्स।
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1240px', margin: '30px auto 0', padding: '0 16px' }}>
        {/* Promotional Coupon Strip */}
        <div style={{
          background: 'linear-gradient(90deg, #D97706 0%, #B45309 100%)',
          borderRadius: '16px',
          padding: '14px 20px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          color: '#FFFFFF',
          boxShadow: '0 6px 20px rgba(217, 119, 6, 0.35)',
          marginBottom: '28px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Tag size={20} />
            <div>
              <strong style={{ fontSize: '14px' }}>विशेष आध्यात्मिक छूट!</strong> कूपन कोड <strong style={{ textDecoration: 'underline' }}>SHREE108</strong> का उपयोग करें और पाएं 15% की तत्काल छूट।
            </div>
          </div>

          <div style={{ fontSize: '12px', background: 'rgba(0,0,0,0.2)', padding: '4px 12px', borderRadius: '999px' }}>
            मुफ़्त अखिल भारतीय डिलीवरी ₹1500+ पर
          </div>
        </div>

        {/* Category Selector Pills */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px', marginBottom: '28px' }}>
          {[
            { id: 'all', label: 'सभी उत्पाद (All)' },
            { id: 'gemstone', label: 'प्रमाणित रत्न (Gemstones)' },
            { id: 'rudraksha', label: 'मूल रुद्राक्ष (Rudraksha)' },
            { id: 'yantra', label: 'सिद्ध यंत्र (Yantras)' },
            { id: 'report', label: 'कुंडली रिपोर्ट्स (PDF Reports)' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: '8px 18px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: 600,
                border: selectedCategory === cat.id ? '1px solid #F59E0B' : '1px solid rgba(255, 255, 255, 0.1)',
                background: selectedCategory === cat.id ? '#D97706' : '#1E293B',
                color: '#FFFFFF',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Catalog Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              style={{
                background: '#1E293B',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.25s',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
              }}
            >
              <div>
                <div style={{ position: 'relative', height: '200px' }}>
                  <img
                    src={prod.imageUrl}
                    alt={prod.titleHi}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {prod.badgeHi && (
                    <span style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: 'rgba(217, 119, 6, 0.95)',
                      color: '#FFFFFF',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '3px 10px',
                      borderRadius: '6px',
                      backdropFilter: 'blur(4px)'
                    }}>
                      {prod.badgeHi}
                    </span>
                  )}
                </div>

                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', fontSize: '12px' }}>
                    <span style={{ color: '#F59E0B', fontWeight: 700 }}>★ {prod.rating}</span>
                    <span style={{ color: '#64748B' }}>({prod.reviewCount} समीक्षाएं)</span>
                  </div>

                  <h3 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: 700, color: '#FFFFFF' }}>
                    {prod.titleHi}
                  </h3>

                  <p style={{ margin: '0 0 14px', fontSize: '12px', color: '#94A3B8', lineHeight: 1.5 }}>
                    {prod.shortDescHi}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '14px' }}>
                    {prod.benefitsHi.map((b, bIdx) => (
                      <div key={bIdx} style={{ fontSize: '11px', color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <CheckCircle2 size={13} color="#10B981" /> {b}
                      </div>
                    ))}
                  </div>

                  <div style={{ fontSize: '11px', color: '#A7F3D0', background: 'rgba(16, 185, 129, 0.1)', padding: '6px 10px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldCheck size={14} color="#10B981" />
                    <span>{prod.certificationHi || '100% ओरिजिनल एवं प्रमाणित'}</span>
                  </div>
                </div>
              </div>

              <div style={{ padding: '0 20px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
                <div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#FDE68A' }}>
                    ₹{prod.price}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B', textDecoration: 'line-through' }}>
                    ₹{prod.originalPrice}
                  </div>
                </div>

                <button
                  onClick={() => handleAddToCart(prod)}
                  style={{
                    background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '10px 18px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <ShoppingBag size={16} /> कार्ट में जोड़ें
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Astro Cart Modal */}
      {isCartOpen && (
        <AstroCartModal
          cartItems={cartItems}
          onClose={() => setIsCartOpen(false)}
          onUpdateQty={handleUpdateQty}
          onRemove={handleRemoveItem}
          onClear={handleClearCart}
        />
      )}
    </div>
  );
};
