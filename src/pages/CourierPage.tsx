import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { apiClient } from '../services/apiClient';
import { printBrandedADCSDocument } from '../utils/documentBranding';
import { 
  Truck, 
  Package, 
  MapPin, 
  Scale, 
  Ruler, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Search,
  Barcode,
  Sparkles,
  Download,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CourierPage: React.FC = () => {
  const { shipments, bookShipment, recordJournalEntry, showToast, setActiveTrackerQuery, setIsTrackerOpen, language } = useApp();

  // Booking State
  const [senderName, setSenderName] = useState('Vikram Malhotra');
  const [senderCity, setSenderCity] = useState('Patna');
  const [senderPincode, setSenderPincode] = useState('800001');
  const [receiverName, setReceiverName] = useState('Rajeev Sharma');
  const [receiverCity, setReceiverCity] = useState('Bengaluru');
  const [receiverPincode, setReceiverPincode] = useState('560001');
  const [weightKg, setWeightKg] = useState<number>(2.0);
  const [lengthCm, setLengthCm] = useState<number>(25);
  const [widthCm, setWidthCm] = useState<number>(20);
  const [heightCm, setHeightCm] = useState<number>(15);
  const [serviceType, setServiceType] = useState<'Express Air' | 'Surface Cargo'>('Express Air');

  const [generatedAwb, setGeneratedAwb] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  // Volumetric Weight Calculation (L x W x H / 5000)
  const volumetricWeight = Number(((lengthCm * widthCm * heightCm) / 5000).toFixed(2));
  const chargeableWeight = Math.max(weightKg, volumetricWeight);
  const ratePerKg = serviceType === 'Express Air' ? 140 : 65;
  const estimatedShippingCost = Math.round(chargeableWeight * ratePerKg + 40); // + docket fee

  const handleBookCourier = async () => {
    const pinRegex = /^[1-9][0-9]{5}$/;
    if (!senderName.trim() || !receiverName.trim() || !senderCity.trim() || !receiverCity.trim()) {
      showToast('Missing Shipment Details', 'Please enter sender name, receiver name, and origin/destination cities.', 'error');
      return;
    }
    if (!pinRegex.test(senderPincode.trim()) || !pinRegex.test(receiverPincode.trim())) {
      showToast('Invalid PIN Code', 'Please enter valid 6-digit Indian PIN codes for pickup and delivery.', 'error');
      return;
    }

    setIsBooking(true);
    try {
      const orderRes = await apiClient.createPaymentOrder({
        amount: estimatedShippingCost,
        customerName: senderName.trim(),
        customerPhone: '9800000000',
        items: [{ id: 'srv-courier-parcel', title: `${serviceType} (${senderCity} to ${receiverCity})`, price: estimatedShippingCost }],
      }).catch(() => ({ success: false, order: { id: 'order_courier_' + Date.now() } }));

      await apiClient.verifyPayment({
        orderId: orderRes?.order?.id || 'order_courier_' + Date.now(),
        paymentId: 'pay_courier_' + Math.floor(100000 + Math.random() * 900000),
        paymentMethod: 'ADCS Counter / UPI',
        amount: estimatedShippingCost,
      }).catch(() => ({}));

      const awb = bookShipment({
        senderName: senderName.trim(),
        senderCity: senderCity.trim(),
        receiverName: receiverName.trim(),
        receiverCity: receiverCity.trim(),
        serviceType,
        weightKg: chargeableWeight,
        price: estimatedShippingCost,
        currentLocation: `${senderCity.trim()} Regional Hub`,
        expectedDelivery: serviceType === 'Express Air' ? 'Within 48 Hours' : 'Within 4 - 5 Days',
      });

      const baseFreight = Math.round(estimatedShippingCost / 1.18);
      const gstOutput = estimatedShippingCost - baseFreight;
      recordJournalEntry({
        date: new Date().toISOString().split('T')[0],
        reference: awb,
        description: `Courier AWB ${awb}: ${senderCity} to ${receiverCity} (${chargeableWeight} kg ${serviceType})`,
        lines: [
          { accountCode: '1020', accountName: 'ADCS Settlement / Payment Gateway', debit: estimatedShippingCost, credit: 0 },
          { accountCode: '4040', accountName: 'Courier & Logistics Freight Revenue', debit: 0, credit: baseFreight },
          { accountCode: '2010', accountName: 'GST Output Tax Payable (18%)', debit: 0, credit: gstOutput },
        ],
      });

      setGeneratedAwb(awb);
      confetti({ particleCount: 70, spread: 60 });
    } finally {
      setIsBooking(false);
    }
  };

  const handleDownloadWaybill = (awbCode: string, fromCity: string, toCity: string, mode: string, weight: number, total: number) => {
    const baseAmt = Number((total / 1.18).toFixed(2));
    const gstAmt = Number((total - baseAmt).toFixed(2));
    printBrandedADCSDocument({
      title: 'ADCS Express Logistics Air Waybill & Freight Receipt',
      documentType: 'SHIPPING WAYBILL',
      documentNumber: awbCode,
      issuedDate: new Date().toLocaleString('en-IN'),
      rows: [
        { label: 'Consignor / Sender', value: `${senderName} (${fromCity} - ${senderPincode})` },
        { label: 'Consignee / Recipient', value: `${receiverName} (${toCity} - ${receiverPincode})` },
        { label: 'Service Tier / Mode', value: mode },
        { label: 'Chargeable Weight', value: `${weight} kg (Volumetric: ${volumetricWeight} kg | Scale: ${weightKg} kg)` },
      ],
      amountSummary: {
        subtotal: baseAmt,
        tax: gstAmt,
        total,
        currency: '₹',
        paymentStatus: 'FREIGHT PAID (INCL. 18% GST)',
      },
      notes: ['Attach or retain this waybill copy for doorstep dispatch & live consignment tracking.'],
      verificationUrl: `${typeof window !== 'undefined' ? window.location.origin : 'https://akuldravindigital.com'}/track?id=${encodeURIComponent(awbCode)}`,
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
          <Truck size={14} />
          <span>DOMESTIC & AIR EXPRESS PARCEL LOGISTICS</span>
        </div>

        <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 900, marginBottom: '0.75rem', color: '#FFFFFF' }}>
          {language === 'hi' ? 'कूरियर एवं पार्सल लॉजिस्टिक्स' : 'Courier & Logistics Hub'}
        </h1>
        <p style={{ fontSize: '1rem', color: '#CBD5E1', maxWidth: '640px', lineHeight: 1.6 }}>
          Doorstep parcel pickup, express air cargo, surface freight, volumetric weight calculation, and real-time visual milestone AWB tracking.
        </p>
      </div>

      {/* Booking Form & Volumetric Calculator */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '2.5rem',
        border: '1px solid #E2E8F0',
        boxShadow: '0 8px 30px rgba(10, 25, 47, 0.06)',
        marginBottom: '3.5rem',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span className="badge badge-gold">INSTANT PARCEL DISPATCH</span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#061A36', marginTop: '0.4rem' }}>
            Book Doorstep Parcel Pickup
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#64748B' }}>
            Enter package dimensions and destination to compute exact volumetric rate.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '2.5rem',
        }} className="hero-grid">
          {/* Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Sender & Receiver Names */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Sender Full Name *</label>
                <input
                  type="text"
                  className="form-input"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Consignor Name"
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Receiver Full Name *</label>
                <input
                  type="text"
                  className="form-input"
                  value={receiverName}
                  onChange={(e) => setReceiverName(e.target.value)}
                  placeholder="Consignee Name"
                />
              </div>
            </div>

            {/* Sender & Receiver Pincodes */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Pickup City & PIN *</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    className="form-input"
                    value={senderCity}
                    onChange={(e) => setSenderCity(e.target.value)}
                    placeholder="City"
                  />
                  <input
                    type="text"
                    className="form-input"
                    value={senderPincode}
                    onChange={(e) => setSenderPincode(e.target.value)}
                    placeholder="PIN"
                    style={{ width: '100px' }}
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Delivery City & PIN *</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    className="form-input"
                    value={receiverCity}
                    onChange={(e) => setReceiverCity(e.target.value)}
                    placeholder="City"
                  />
                  <input
                    type="text"
                    className="form-input"
                    value={receiverPincode}
                    onChange={(e) => setReceiverPincode(e.target.value)}
                    placeholder="PIN"
                    style={{ width: '100px' }}
                  />
                </div>
              </div>
            </div>

            {/* Dimensions: Length, Width, Height */}
            <div>
              <label className="form-label">Package Dimensions (cm) for Volumetric Weight</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Length (L)</span>
                  <input
                    type="number"
                    min="5"
                    className="form-input"
                    value={lengthCm}
                    onChange={(e) => setLengthCm(Number(e.target.value))}
                  />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Width (W)</span>
                  <input
                    type="number"
                    min="5"
                    className="form-input"
                    value={widthCm}
                    onChange={(e) => setWidthCm(Number(e.target.value))}
                  />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Height (H)</span>
                  <input
                    type="number"
                    min="5"
                    className="form-input"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>

            {/* Actual Weight vs Volumetric Weight */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Actual Scale Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.5"
                  className="form-input"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                />
              </div>

              <div style={{
                background: '#F8FAFC',
                padding: '0.65rem 1rem',
                borderRadius: '10px',
                border: '1px solid #E2E8F0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Volumetric Weight:</span>
                <span style={{ fontWeight: 800, color: '#061A36', fontSize: '1rem' }}>
                  {volumetricWeight} kg
                </span>
                <span style={{ fontSize: '0.68rem', color: '#D97706' }}>
                  (L x W x H / 5000 IATA Standard)
                </span>
              </div>
            </div>

            {/* Service Mode Selector */}
            <div>
              <label className="form-label">Shipping Mode</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[
                  { mode: 'Express Air', speed: '24 - 48 Hours', rate: '₹140/kg' },
                  { mode: 'Surface Cargo', speed: '4 - 6 Days', rate: '₹65/kg' },
                ].map(m => (
                  <button
                    key={m.mode}
                    onClick={() => setServiceType(m.mode as any)}
                    style={{
                      padding: '0.85rem',
                      borderRadius: '12px',
                      border: serviceType === m.mode ? '2px solid #075ACB' : '1px solid #E2E8F0',
                      background: serviceType === m.mode ? '#EFF6FF' : '#FFFFFF',
                      textAlign: 'left',
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: serviceType === m.mode ? '#075ACB' : '#061A36' }}>
                      {m.mode}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 600 }}>{m.speed}</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748B' }}>{m.rate}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing & Booking Action */}
          <div style={{
            background: 'linear-gradient(135deg, #061A36 0%, #031126 100%)',
            borderRadius: '20px',
            padding: '2rem',
            color: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '1px solid rgba(245, 158, 11, 0.4)',
          }}>
            <div>
              <div style={{ fontSize: '0.78rem', color: '#F59E0B', fontWeight: 700, textTransform: 'uppercase' }}>
                ESTIMATED SHIPPING COST:
              </div>
              <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#FFFFFF', margin: '0.2rem 0 1.25rem' }}>
                ₹{estimatedShippingCost}
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem',
                padding: '1rem 0',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                marginBottom: '1.5rem',
                fontSize: '0.82rem',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>Billable Weight:</span>
                  <span style={{ fontWeight: 700 }}>{chargeableWeight} kg</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>Route:</span>
                  <span style={{ fontWeight: 700 }}>{senderCity} ➔ {receiverCity}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>Transit Speed:</span>
                  <span style={{ fontWeight: 700 }}>{serviceType}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94A3B8' }}>Doorstep Pickup:</span>
                  <span style={{ fontWeight: 700, color: '#10B981' }}>FREE Included</span>
                </div>
              </div>
            </div>

            {generatedAwb ? (
              <div style={{
                background: 'rgba(245, 158, 11, 0.15)',
                border: '1px dashed #F59E0B',
                borderRadius: '12px',
                padding: '1rem',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '0.75rem', color: '#F59E0B', fontWeight: 700 }}>BOOKING CONFIRMED • LEDGER POSTED</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#FFFFFF' }}>{generatedAwb}</div>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                  <button
                    onClick={() => {
                      setActiveTrackerQuery(generatedAwb);
                      setIsTrackerOpen(true);
                    }}
                    className="btn-primary btn-sm"
                    style={{ flex: 1 }}
                  >
                    Track AWB Live
                  </button>
                  <button
                    onClick={() => handleDownloadWaybill(generatedAwb, senderCity, receiverCity, serviceType, chargeableWeight, estimatedShippingCost)}
                    className="btn-gold btn-sm"
                    style={{ flex: 1, fontWeight: 700 }}
                  >
                    <Download size={14} />
                    <span>Waybill</span>
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={handleBookCourier}
                disabled={isBooking}
                className="btn-gold btn-lg"
                style={{ width: '100%', fontWeight: 800, opacity: isBooking ? 0.7 : 1 }}
              >
                <span>{isBooking ? 'Generating AWB & Settling...' : 'Book Pickup & Generate AWB'}</span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Active Shipments Live Feed */}
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#061A36', marginBottom: '1.25rem' }}>
          Active Parcel Shipments in Transit
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {shipments.map(shp => (
            <div
              key={shp.id}
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid #E2E8F0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#061A36' }}>{shp.awb}</span>
                  <span className="badge badge-gold">{shp.status}</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#475569' }}>
                  {shp.senderCity} ➔ {shp.receiverCity} ({shp.serviceType}) • {shp.weightKg} kg
                </div>
                <div style={{ fontSize: '0.78rem', color: '#059669', marginTop: '0.2rem' }}>
                  Current Hub: {shp.currentLocation}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#64748B' }}>
                  Expected: <strong>{shp.expectedDelivery}</strong>
                </div>
                <button
                  onClick={() => {
                    setActiveTrackerQuery(shp.awb);
                    setIsTrackerOpen(true);
                  }}
                  className="btn-secondary btn-sm"
                >
                  View Timeline
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Authorized National Logistics & Statutory Portals */}
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
            AUTHORIZED STATUTORY & NATIONAL DISPATCH PORTALS
          </div>
          <div style={{ fontSize: '0.84rem', color: '#475569', marginTop: '0.2rem' }}>
            Direct citizen access for India Post Speed Post consignment tracking, PIN lookup, and GST e-Waybill compliance.
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
          {[
            { label: 'India Post Speed Post', url: 'https://www.indiapost.gov.in/' },
            { label: 'GST e-Waybill System', url: 'https://ewaybillgst.gov.in/' },
            { label: 'ONDC Open Logistics', url: 'https://ondc.org/' },
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
