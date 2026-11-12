import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { printBrandedADCSDocument } from '../utils/documentBranding';
import { 
  Plane, 
  Train, 
  Bus, 
  Building, 
  MapPin, 
  Calendar, 
  Users, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck,
  Ticket,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';

const ITINERARIES_BY_MODE: Record<'flights' | 'trains' | 'buses' | 'hotels', Array<{
  id: string;
  carrier: string;
  departure: string;
  arrival: string;
  duration: string;
  stops: string;
  price: number;
  seatsLeft: number;
}>> = {
  flights: [
    { id: 'FLT-101', carrier: 'IndiGo 6E-2412', departure: '08:45 AM', arrival: '10:30 AM', duration: '1h 45m', stops: 'Non-stop', price: 4850, seatsLeft: 4 },
    { id: 'FLT-102', carrier: 'Air India AI-410', departure: '02:15 PM', arrival: '04:05 PM', duration: '1h 50m', stops: 'Non-stop', price: 5200, seatsLeft: 7 },
    { id: 'FLT-103', carrier: 'Akasa Air QP-1421', departure: '06:30 PM', arrival: '08:20 PM', duration: '1h 50m', stops: 'Non-stop', price: 4590, seatsLeft: 3 },
  ],
  trains: [
    { id: 'TRN-201', carrier: '12309 Tejas Rajdhani Express (3AC)', departure: '07:10 PM', arrival: '07:40 AM', duration: '12h 30m', stops: 'DDU • PRYJ • CNB', price: 2145, seatsLeft: 6 },
    { id: 'TRN-202', carrier: '12393 Sampoorna Kranti SF (2AC)', departure: '07:25 PM', arrival: '07:55 AM', duration: '12h 30m', stops: 'DDU • CNB', price: 2680, seatsLeft: 3 },
    { id: 'TRN-203', carrier: '22347 Vande Bharat Executive (EC)', departure: '06:00 AM', arrival: '01:50 PM', duration: '7h 50m', stops: 'Limited Halts', price: 1890, seatsLeft: 9 },
  ],
  buses: [
    { id: 'BUS-301', carrier: 'Zingbus AC Sleeper (2+1 Volvo)', departure: '08:30 PM', arrival: '09:15 AM', duration: '12h 45m', stops: 'Lucknow Bypass', price: 1450, seatsLeft: 5 },
    { id: 'BUS-302', carrier: 'IntrCity SmartBus Multi-Axle', departure: '09:45 PM', arrival: '10:30 AM', duration: '12h 45m', stops: 'Express Highway', price: 1320, seatsLeft: 8 },
    { id: 'BUS-303', carrier: 'BSRTC Deluxe AC Seater', departure: '07:00 AM', arrival: '06:45 PM', duration: '11h 45m', stops: 'Direct Route', price: 980, seatsLeft: 12 },
  ],
  hotels: [
    { id: 'HTL-401', carrier: 'Lemon Tree Premier • Deluxe Twin', departure: '12:00 PM', arrival: '11:00 AM', duration: '1 Night', stops: 'Breakfast Included • Free WiFi', price: 3650, seatsLeft: 4 },
    { id: 'HTL-402', carrier: 'Ginger Business Hotel • Executive', departure: '01:00 PM', arrival: '11:00 AM', duration: '1 Night', stops: 'City Center • GST Invoice Ready', price: 2490, seatsLeft: 6 },
    { id: 'HTL-403', carrier: 'Taj City Centre • Superior Room', departure: '02:00 PM', arrival: '12:00 PM', duration: '1 Night', stops: 'Airport Pickup Available', price: 7800, seatsLeft: 2 },
  ],
};

export const TravelPage: React.FC = () => {
  const { showToast, logAudit, recordJournalEntry, language } = useApp();
  const [activeMode, setActiveMode] = useState<'flights' | 'trains' | 'buses' | 'hotels'>('flights');
  const [fromCity, setFromCity] = useState('Patna (PAT)');
  const [toCity, setToCity] = useState('New Delhi (DEL)');
  const [travelDate, setTravelDate] = useState('2026-09-25');
  const [passengers, setPassengers] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState<any | null>(null);

  const activeItineraries = ITINERARIES_BY_MODE[activeMode];

  const handleBook = (itinerary: typeof activeItineraries[0]) => {
    const pnr = 'AD' + Math.floor(100000 + Math.random() * 900000);
    const totalPaid = itinerary.price * passengers;
    const booking = {
      pnr,
      mode: activeMode.toUpperCase(),
      carrier: itinerary.carrier,
      from: fromCity,
      to: toCity,
      date: travelDate,
      passengers,
      totalPaid,
    };

    recordJournalEntry({
      reference: pnr,
      description: `Travel Booking (${activeMode.toUpperCase()}): ${itinerary.carrier} (${fromCity} -> ${toCity})`,
      date: new Date().toISOString(),
      lines: [
        { accountCode: '1010', accountName: 'ADCS Settlement Clearing Account', debit: totalPaid, credit: 0 },
        { accountCode: '4020', accountName: 'Travel & Ticketing Facilitation Revenue', debit: 0, credit: totalPaid },
      ],
    });

    setBookingConfirmed(booking);
    confetti({ particleCount: 80, spread: 60 });
    logAudit(`Travel Ticket Booked: PNR ${pnr}`, `${itinerary.carrier} (${fromCity} to ${toCity})`);
    showToast('Travel Ticket Confirmed!', `PNR: ${pnr}. E-Ticket generated and logged.`, 'success');
  };

  const handleDownloadTicket = () => {
    if (!bookingConfirmed) return;
    printBrandedADCSDocument({
      title: 'ADCS Authorized Electronic Travel Voucher / E-Ticket',
      documentType: 'E-TICKET VOUCHER',
      documentNumber: bookingConfirmed.pnr,
      issuedDate: new Date().toLocaleString('en-IN'),
      rows: [
        { label: 'Travel Mode', value: String(bookingConfirmed.mode) },
        { label: 'Carrier / Property', value: String(bookingConfirmed.carrier) },
        { label: 'Sector / Route', value: `${bookingConfirmed.from} -> ${bookingConfirmed.to}` },
        { label: 'Travel / Check-in Date', value: String(bookingConfirmed.date) },
        { label: 'Passengers / Guests', value: String(bookingConfirmed.passengers) },
      ],
      amountSummary: {
        total: Number(bookingConfirmed.totalPaid),
        currency: '₹',
        paymentStatus: 'CONFIRMED & LOGGED',
      },
      notes: ['Carry valid Government Photo ID during check-in or boarding.'],
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
          <Plane size={14} />
          <span>TRAVEL SUPER APP & TICKETING ASSISTANCE</span>
        </div>

        <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 900, marginBottom: '0.75rem', color: '#FFFFFF' }}>
          {language === 'hi' ? 'यात्रा एवं टिकट बुकिंग सुपर-ऐप' : 'Travel Super App'}
        </h1>
        <p style={{ fontSize: '1rem', color: '#CBD5E1', maxWidth: '640px', lineHeight: 1.6 }}>
          Domestic & international flights, IRCTC Tatkal train assistance, Volvo intercity buses, hotel reservations, and travel documentation.
        </p>
      </div>

      {/* Mode Selector & Search Widget */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '2rem',
        boxShadow: '0 8px 30px rgba(10, 25, 47, 0.06)',
        border: '1px solid #E2E8F0',
        marginBottom: '3rem',
      }}>
        {/* Mode Selector & Search Widget */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.75rem', overflowX: 'auto' }}>
          {[
            { id: 'flights', label: 'Flights', icon: <Plane size={18} /> },
            { id: 'trains', label: 'Trains & Tatkal (IRCTC)', icon: <Train size={18} /> },
            { id: 'buses', label: 'Intercity Buses', icon: <Bus size={18} /> },
            { id: 'hotels', label: 'Hotels & Resorts', icon: <Building size={18} /> },
          ].map(m => (
            <button
              key={m.id}
              onClick={() => {
                setActiveMode(m.id as any);
                setBookingConfirmed(null);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.7rem 1.25rem',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '0.88rem',
                background: activeMode === m.id ? '#075ACB' : '#F1F5F9',
                color: activeMode === m.id ? '#FFFFFF' : '#475569',
                border: '1px solid',
                borderColor: activeMode === m.id ? '#075ACB' : '#E2E8F0',
                transition: 'all 0.15s',
              }}
            >
              {m.icon}
              <span>{m.label}</span>
            </button>
          ))}
        </div>

        {/* IRCTC Tatkal Statutory Compliance Notice (when trains selected) */}
        {activeMode === 'trains' && (
          <div style={{
            background: '#EFF6FF',
            border: '1px solid #BFDBFE',
            borderRadius: '12px',
            padding: '1rem 1.25rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
            fontSize: '0.82rem',
            color: '#061A36'
          }}>
            <ShieldCheck size={20} color="#075ACB" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ display: 'block', marginBottom: '0.2rem', color: '#1E40AF' }}>
                IRCTC & Railway Board Statutory Compliance (Circular 08/2025):
              </strong>
              <span>
                Under Railway regulations, passenger Aadhaar OTP authentication is mandatory for Tatkal bookings. 
                ADCS provides assisted scheduling and status tracking; official tickets are booked directly via official 
                IRCTC channels without CAPTCHA manipulation or unauthorized credential storage.
              </span>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                <a
                  href="https://www.irctc.co.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem' }}
                >
                  Official IRCTC Portal <ArrowRight size={12} />
                </a>
                <a
                  href="https://www.operations.irctc.co.in/AgentInterface/loginHome.jsf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem' }}
                >
                  Authorized Agent Interface <ArrowRight size={12} />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Search Inputs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr)) 140px',
          gap: '1rem',
          alignItems: 'flex-end',
        }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">From City / Station</label>
            <input
              type="text"
              className="form-input"
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">To Destination</label>
            <input
              type="text"
              className="form-input"
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Travel Date</label>
            <input
              type="date"
              className="form-input"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Passengers</label>
            <select
              className="form-select"
              value={passengers}
              onChange={(e) => setPassengers(Number(e.target.value))}
            >
              <option value="1">1 Passenger</option>
              <option value="2">2 Passengers</option>
              <option value="3">3 Passengers</option>
              <option value="4">4 Passengers</option>
            </select>
          </div>

          <button
            onClick={() => {
              setIsSearching(true);
              setBookingConfirmed(null);
              setTimeout(() => setIsSearching(false), 500);
            }}
            className="btn-primary"
            style={{ height: '42px' }}
          >
            <Search size={16} />
            <span>Search</span>
          </button>
        </div>
      </div>

      {/* Search Results */}
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#061A36', marginBottom: '1.25rem' }}>
          Available Options for {fromCity} ➔ {toCity}
        </h3>

        {bookingConfirmed ? (
          <div style={{
            background: '#F0FDF4',
            border: '2px solid #86EFAC',
            borderRadius: '20px',
            padding: '2.5rem',
            textAlign: 'center',
            maxWidth: '620px',
            margin: '0 auto',
            animation: 'fadeIn 0.25s ease-out',
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: '#DCFCE7',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
            }}>
              <CheckCircle2 size={36} />
            </div>

            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#061A36', marginBottom: '0.25rem' }}>
              Booking Confirmed!
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.5rem' }}>
              Your electronic ticket voucher has been generated and archived in your Document Vault.
            </p>

            <div style={{
              background: '#FFFFFF',
              borderRadius: '14px',
              padding: '1.25rem',
              border: '1px solid #BBF7D0',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
              fontSize: '0.85rem',
              marginBottom: '1.5rem',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Confirmed PNR:</span>
                <span style={{ fontWeight: 800, color: '#075ACB', fontSize: '1rem' }}>{bookingConfirmed.pnr}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Flight / Train:</span>
                <span style={{ fontWeight: 700 }}>{bookingConfirmed.carrier}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Sector:</span>
                <span style={{ fontWeight: 600 }}>{bookingConfirmed.from} ➔ {bookingConfirmed.to}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Travel Date:</span>
                <span style={{ fontWeight: 600 }}>{bookingConfirmed.date}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #E2E8F0', paddingTop: '0.5rem', marginTop: '0.2rem' }}>
                <span style={{ fontWeight: 700 }}>Total Paid:</span>
                <span style={{ fontWeight: 800, color: '#061A36' }}>₹{bookingConfirmed.totalPaid.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={handleDownloadTicket}
                className="btn-primary"
              >
                <Download size={15} />
                <span>Download E-Ticket Voucher</span>
              </button>
              <button
                onClick={() => setBookingConfirmed(null)}
                className="btn-secondary"
              >
                Search More Itineraries
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {activeItineraries.map(itn => (
              <div
                key={itn.id}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1.5rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                }}
              >
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#061A36' }}>
                    {itn.carrier}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '0.2rem' }}>
                    {fromCity} ➔ {toCity} • {itn.stops}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#061A36' }}>{itn.departure}</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Depart</div>
                  </div>

                  <div style={{ textAlign: 'center', color: '#64748B', fontSize: '0.75rem' }}>
                    <Clock size={14} style={{ margin: '0 auto 0.2rem' }} />
                    <div>{itn.duration}</div>
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#061A36' }}>{itn.arrival}</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Arrive</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#061A36' }}>
                      ₹{itn.price.toLocaleString('en-IN')}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#EF4444' }}>
                      Only {itn.seatsLeft} seats left!
                    </div>
                  </div>

                  <button
                    onClick={() => handleBook(itn)}
                    className="btn-gold"
                    style={{ fontWeight: 800 }}
                  >
                    <span>Instant Book</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
