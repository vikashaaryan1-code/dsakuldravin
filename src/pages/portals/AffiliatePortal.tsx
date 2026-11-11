import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { 
  Sparkles, 
  Link as LinkIcon, 
  Copy, 
  Check, 
  TrendingUp, 
  DollarSign, 
  Users, 
  ArrowUpRight, 
  Wallet, 
  Share2, 
  Download, 
  ExternalLink,
  Gift,
  X,
  Image,
  Video,
  FileText,
  CheckCircle2
} from 'lucide-react';

export const AffiliatePortal: React.FC = () => {
  const { affiliateReferrals, requestAffiliatePayout, showToast } = useApp();
  const [copiedLink, setCopiedLink] = useState(false);
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [showCreativeKitModal, setShowCreativeKitModal] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState(2100);
  const [payoutUpi, setPayoutUpi] = useState('rahul.affiliate@okaxis');

  const referralCode = 'AD-REF-RAHUL99';
  const referralUrl = `https://cloud.akuldravin.com/?ref=${referralCode}`;

  const totalReferrals = affiliateReferrals.length;
  const totalEarned = affiliateReferrals.reduce((sum, r) => sum + r.commissionAmount, 0);
  const totalVolume = affiliateReferrals.reduce((sum, r) => sum + r.orderValue, 0);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopiedLink(true);
    showToast('Link Copied!', 'Unique referral link copied to clipboard.', 'success');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handlePayoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (payoutAmount <= 0) return;
    requestAffiliatePayout(payoutAmount);
    setShowPayoutModal(false);
  };

  const handleDownloadFlyer = () => {
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" viewBox="0 0 1080 1920">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A192F"/>
      <stop offset="50%" stop-color="#0D2137"/>
      <stop offset="100%" stop-color="#1D4ED8"/>
    </linearGradient>
  </defs>
  <rect width="1080" height="1920" fill="url(#bg)"/>
  <circle cx="540" cy="400" r="180" fill="#F59E0B" opacity="0.15"/>
  <text x="540" y="320" font-family="Arial, sans-serif" font-size="42" font-weight="900" fill="#F59E0B" text-anchor="middle">AKUL DRAVIN DIGITAL SERVICES</text>
  <text x="540" y="420" font-family="Arial, sans-serif" font-size="72" font-weight="900" fill="#FFFFFF" text-anchor="middle">DIGITAL SEVA PORTAL</text>
  <text x="540" y="520" font-family="Arial, sans-serif" font-size="36" fill="#94A3B8" text-anchor="middle">Pan-India E-Governance &amp; Citizen Services</text>
  
  <rect x="120" y="650" width="840" height="700" rx="30" fill="#FFFFFF" opacity="0.08"/>
  <text x="180" y="750" font-family="Arial, sans-serif" font-size="44" font-weight="bold" fill="#38BDF8">✓ Instant PAN Card 49A &amp; Correction</text>
  <text x="180" y="850" font-family="Arial, sans-serif" font-size="44" font-weight="bold" fill="#38BDF8">✓ e-District Income / Caste Certificate</text>
  <text x="180" y="950" font-family="Arial, sans-serif" font-size="44" font-weight="bold" fill="#38BDF8">✓ Private Limited &amp; GST Registration</text>
  <text x="180" y="1050" font-family="Arial, sans-serif" font-size="44" font-weight="bold" fill="#38BDF8">✓ Smart CCTV Security &amp; Turnkey IT</text>
  <text x="180" y="1150" font-family="Arial, sans-serif" font-size="44" font-weight="bold" fill="#38BDF8">✓ Vedic Kundli &amp; Astrological Advisory</text>
  <text x="180" y="1250" font-family="Arial, sans-serif" font-size="44" font-weight="bold" fill="#38BDF8">✓ Bharat BillPay &amp; Fast Cash AEPS</text>

  <rect x="180" y="1450" width="720" height="140" rx="70" fill="#F59E0B"/>
  <text x="540" y="1535" font-family="Arial, sans-serif" font-size="48" font-weight="900" fill="#0A192F" text-anchor="middle">APPLY ONLINE TODAY</text>
  <text x="540" y="1700" font-family="Arial, sans-serif" font-size="34" fill="#FFFFFF" text-anchor="middle">Referral Link: ${referralUrl}</text>
  <text x="540" y="1760" font-family="Arial, sans-serif" font-size="28" fill="#64748B" text-anchor="middle">Authorized ADCS Partner Network • Govt Compliant</text>
</svg>`;
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'WhatsApp_Story_Flyer_ADCS.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Asset Downloaded', 'WhatsApp_Story_Flyer_ADCS.svg saved in HD.', 'success');
  };

  const handleDownloadSquare = () => {
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080">
  <defs>
    <linearGradient id="sqbg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A"/>
      <stop offset="100%" stop-color="#1E3A8A"/>
    </linearGradient>
  </defs>
  <rect width="1080" height="1080" fill="url(#sqbg)"/>
  <rect x="80" y="80" width="920" height="920" rx="40" fill="none" stroke="#F59E0B" stroke-width="4" stroke-opacity="0.3"/>
  <text x="540" y="220" font-family="Arial, sans-serif" font-size="38" font-weight="bold" fill="#F59E0B" text-anchor="middle">COMPANY INCORPORATION PACKAGE</text>
  <text x="540" y="320" font-family="Arial, sans-serif" font-size="70" font-weight="900" fill="#FFFFFF" text-anchor="middle">START YOUR PVT LTD</text>
  <text x="540" y="430" font-family="Arial, sans-serif" font-size="90" font-weight="900" fill="#10B981" text-anchor="middle">JUST ₹6,999/-</text>
  <text x="540" y="520" font-family="Arial, sans-serif" font-size="34" fill="#CBD5E1" text-anchor="middle">Includes MCA SPICe+, 2 DINs, Name Approval, PAN &amp; TAN</text>
  <text x="540" y="600" font-family="Arial, sans-serif" font-size="34" fill="#CBD5E1" text-anchor="middle">Free MSME Udyam + GST Registration Included</text>
  
  <rect x="240" y="700" width="600" height="110" rx="55" fill="#3B82F6"/>
  <text x="540" y="768" font-family="Arial, sans-serif" font-size="40" font-weight="bold" fill="#FFFFFF" text-anchor="middle">BOOK CONSULTATION</text>
  <text x="540" y="900" font-family="Arial, sans-serif" font-size="28" fill="#94A3B8" text-anchor="middle">Exclusive Referral: ${referralCode} • Akul Dravin Digital Services</text>
</svg>`;
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Company_Incorporation_Square.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Asset Downloaded', 'Company_Incorporation_Square.svg saved in HD.', 'success');
  };

  const handleDownloadKitBundle = () => {
    const bundleSummary = `================================================================================
AKUL DRAVIN DIGITAL SERVICES (ADCS)
AFFILIATE GROWTH & MARKETING MASTER KIT
================================================================================
Affiliate Partner : Authorized Growth Partner
Referral Code     : ${referralCode}
Referral URL      : ${referralUrl}
Commission Slabs  : 15% E-Governance | 20% IT & Turnkey | 25% Vedic Advisory
Payout Cycle      : Real-time Wallet Credit with Weekly Bank Auto-Sweep
--------------------------------------------------------------------------------
MARKETING ASSETS INCLUDED:
1. WhatsApp Story Flyer (1080x1920) - WhatsApp_Story_Flyer_ADCS.svg
2. Social Feed Square (1080x1080)   - Company_Incorporation_Square.svg
3. 30-Second High-Conversion Script:
   "अब सरकारी दफ्तरों के चक्कर लगाना बंद! Akul Dravin Digital Services से अपने घर
   बैठे या नजदीकी VLE सेंटर से पैन कार्ड, आय प्रमाण पत्र, कंपनी रजिस्ट्रेशन
   करवाएं। लिंक बायो में है: ${referralUrl}"
--------------------------------------------------------------------------------
COMPLIANCE & BRAND GUIDELINES:
- Use only official brand name "Akul Dravin Digital Services" or "ADCS"
- Ensure transparent disclosures in accordance with ASCI Guidelines
- Zero spam policy: Share exclusively with opt-in contacts and social audiences
================================================================================
Authorized by: ADCS National Partner Growth Cell
================================================================================`;
    const blob = new Blob([bundleSummary], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ADCS_Affiliate_Marketing_Kit_${referralCode}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Bundle Downloaded', 'Complete Affiliate Marketing Kit saved to your device.', 'success');
    setShowCreativeKitModal(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        
        {/* Hero Header */}
        <div style={{
          background: 'linear-gradient(135deg, #0A192F 0%, #151D33 50%, #4338CA 100%)',
          borderRadius: '24px',
          padding: '2.5rem',
          color: '#FFFFFF',
          marginBottom: '2rem',
          boxShadow: '0 20px 40px rgba(10, 25, 47, 0.15)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(245, 158, 11, 0.2)', border: '1px solid #F59E0B', padding: '0.35rem 0.8rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, color: '#FDE68A', marginBottom: '0.75rem' }}>
              <Gift size={14} color="#F59E0B" />
              <span>OFFICIAL AFFILIATE PARTNER ACCELERATOR</span>
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, margin: '0 0 0.5rem' }}>
              Affiliate Growth & Referral Monetization
            </h1>
            <p style={{ color: '#CBD5E1', fontSize: '0.92rem', maxWidth: '650px', margin: 0, lineHeight: 1.5 }}>
              Share your tracked referral code across social networks, digital creator channels, and local community groups. Earn flat 10% instant commissions on every citizen, legal, and business filing.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => setShowPayoutModal(true)}
              className="btn btn-gold"
              style={{ fontWeight: 800, padding: '0.75rem 1.4rem' }}
            >
              <Wallet size={18} /> Request Payout
            </button>
            <button
              onClick={() => setShowCreativeKitModal(true)}
              className="btn"
              style={{ background: 'rgba(255,255,255,0.12)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              <Download size={18} /> Creative Kit
            </button>
          </div>
        </div>

        {/* Unique Referral Link Card */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          padding: '1.75rem',
          border: '1.5px solid #E2E8F0',
          boxShadow: '0 6px 25px rgba(10, 25, 47, 0.05)',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1D4ED8', textTransform: 'uppercase' }}>
              YOUR PERSONAL TRACKED REFERRAL LINK
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0A192F', marginTop: '0.2rem', fontFamily: 'monospace' }}>
              {referralUrl}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '0.3rem' }}>
              Affiliate Code: <strong>{referralCode}</strong> • Lifetime 30-day cookie window
            </div>
          </div>

          <button
            onClick={handleCopyLink}
            className="btn btn-primary"
            style={{ padding: '0.75rem 1.5rem', fontWeight: 800, gap: '0.5rem' }}
          >
            {copiedLink ? <Check size={18} /> : <Copy size={18} />}
            <span>{copiedLink ? 'Copied to Clipboard!' : 'Copy Referral Link'}</span>
          </button>
        </div>

        {/* Metrics Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem'
        }}>
          <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', fontSize: '0.82rem', fontWeight: 600 }}>
              <span>TOTAL REFERRED LEADS</span>
              <Users size={18} color="#1D4ED8" />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0A192F', margin: '0.4rem 0' }}>
              {totalReferrals} Enquiries
            </div>
            <div style={{ fontSize: '0.78rem', color: '#059669' }}>
              From WhatsApp & social campaigns
            </div>
          </div>

          <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', fontSize: '0.82rem', fontWeight: 600 }}>
              <span>CONVERTED ORDER VOLUME</span>
              <TrendingUp size={18} color="#D97706" />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0A192F', margin: '0.4rem 0' }}>
              ₹{totalVolume.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
              Total GMV generated
            </div>
          </div>

          <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', fontSize: '0.82rem', fontWeight: 600 }}>
              <span>TOTAL COMMISSION ACCRUED</span>
              <DollarSign size={18} color="#059669" />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#059669', margin: '0.4rem 0' }}>
              ₹{totalEarned.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#059669', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <ArrowUpRight size={14} /> Instant UPI withdrawable
            </div>
          </div>
        </div>

        {/* Referrals Activity Table */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 20px rgba(10, 25, 47, 0.05)',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #E2E8F0' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0A192F', margin: 0 }}>
              Referred Clients & Earnings Ledger
            </h2>
            <p style={{ fontSize: '0.82rem', color: '#64748B', margin: '2px 0 0' }}>
              Real-time audit log of citizen service orders attributed to your referral identity.
            </p>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '1rem 1.25rem' }}>Customer Name</th>
                  <th style={{ padding: '1rem 1.25rem' }}>Service Selected</th>
                  <th style={{ padding: '1rem 1.25rem' }}>Date</th>
                  <th style={{ padding: '1rem 1.25rem' }}>Order Value</th>
                  <th style={{ padding: '1rem 1.25rem' }}>Your 10% Cut</th>
                  <th style={{ padding: '1rem 1.25rem' }}>Payout Status</th>
                </tr>
              </thead>
              <tbody>
                {affiliateReferrals.map((ref) => (
                  <tr key={ref.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: '#0A192F' }}>
                      {ref.customerName}
                    </td>
                    <td style={{ padding: '1rem 1.25rem', color: '#475569' }}>{ref.serviceEnquired}</td>
                    <td style={{ padding: '1rem 1.25rem', color: '#64748B' }}>{ref.date}</td>
                    <td style={{ padding: '1rem 1.25rem', fontWeight: 700 }}>₹{ref.orderValue.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '1rem 1.25rem', fontWeight: 800, color: '#059669' }}>
                      ₹{ref.commissionAmount.toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <span className={`badge ${ref.status === 'Settled' ? 'badge-green' : ref.status === 'Purchased' ? 'badge-blue' : 'badge-gold'}`}>
                        {ref.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PAYOUT REQUEST MODAL */}
        {showPayoutModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10, 25, 47, 0.7)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem'
          }}>
            <div style={{ background: '#FFFFFF', borderRadius: '20px', maxWidth: '480px', width: '100%', padding: '2rem', boxShadow: '0 25px 60px rgba(0,0,0,0.3)' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0A192F', marginBottom: '0.25rem' }}>
                Instant Commission Withdrawal
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '1.25rem' }}>
                Disburse accrued affiliate earnings directly to your verified bank UPI VPA or account.
              </p>

              <form onSubmit={handlePayoutSubmit}>
                <div className="form-group">
                  <label className="form-label">Withdrawal Amount (₹) *</label>
                  <input
                    type="number"
                    required
                    min={100}
                    max={totalEarned}
                    className="form-input"
                    value={payoutAmount}
                    onChange={(e) => setPayoutAmount(Number(e.target.value))}
                  />
                  <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '0.25rem' }}>
                    Available Balance: ₹{totalEarned.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Beneficiary UPI ID / VPA *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={payoutUpi}
                    onChange={(e) => setPayoutUpi(e.target.value)}
                    placeholder="e.g. mobile@upi or name@okaxis"
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                  <button type="button" onClick={() => setShowPayoutModal(false)} className="btn btn-outline" style={{ flex: 1 }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-gold" style={{ flex: 2, fontWeight: 800 }}>
                    Confirm Withdrawal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* CREATIVE MARKETING ASSETS KIT MODAL */}
        {showCreativeKitModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10, 25, 47, 0.75)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem'
          }}>
            <div style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              maxWidth: '640px',
              width: '100%',
              padding: '2.25rem',
              boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div>
                  <span className="badge badge-gold">GROWTH & AFFILIATE TOOLKIT</span>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0A192F', marginTop: '0.25rem' }}>
                    Official Promotional Creative Kit
                  </h3>
                </div>
                <button
                  onClick={() => setShowCreativeKitModal(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.4rem' }}
                >
                  <X size={20} color="#64748B" />
                </button>
              </div>

              <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.5rem' }}>
                Use these verified marketing creatives and copy templates to promote services across WhatsApp status, Instagram stories, YouTube descriptions, and Telegram groups.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                {/* Asset 1: WhatsApp Flyer */}
                <div style={{ background: '#F8FAFC', borderRadius: '14px', padding: '1rem 1.25rem', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16A34A' }}>
                      <Image size={22} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0A192F' }}>WhatsApp Story Flyer (1080x1920)</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B' }}>PAN, Aadhaar, e-District & Government schemes with referral stamp</div>
                    </div>
                  </div>
                  <button
                    onClick={handleDownloadFlyer}
                    className="btn btn-sm btn-outline"
                  >
                    Download SVG
                  </button>
                </div>

                {/* Asset 2: Social Square */}
                <div style={{ background: '#F8FAFC', borderRadius: '14px', padding: '1rem 1.25rem', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1D4ED8' }}>
                      <Image size={22} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0A192F' }}>Company Incorporation Square (1080x1080)</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Pvt Ltd ₹6,999 + GST registration promotion banner</div>
                    </div>
                  </div>
                  <button
                    onClick={handleDownloadSquare}
                    className="btn btn-sm btn-outline"
                  >
                    Download SVG
                  </button>
                </div>

                {/* Asset 3: Video Reel Script */}
                <div style={{ background: '#F8FAFC', borderRadius: '14px', padding: '1rem 1.25rem', border: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Video size={18} color="#7C3AED" />
                      <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0A192F' }}>Reels / Shorts Script (30 Seconds)</span>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText('अब सरकारी दफ्तरों के चक्कर लगाना बंद! Akul Dravin Digital Services से अपने घर बैठे या नजदीकी VLE सेंटर से पैन कार्ड, आय प्रमाण पत्र, कंपनी रजिस्ट्रेशन और सीलिंग करवाएं। लिंक बायो में है: ' + referralUrl);
                        showToast('Script Copied', '30-second reel script copied to clipboard.', 'success');
                      }}
                      className="btn btn-sm btn-secondary"
                      style={{ fontSize: '0.75rem' }}
                    >
                      Copy Script
                    </button>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#475569', fontStyle: 'italic', background: '#FFFFFF', padding: '0.65rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    "अब सरकारी दफ्तरों के चक्कर लगाना बंद! Akul Dravin Digital Services से अपने घर बैठे या नजदीकी VLE सेंटर से पैन कार्ड, आय प्रमाण पत्र, कंपनी रजिस्ट्रेशन करवाएं। लिंक बायो में है..."
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button
                  onClick={handleDownloadKitBundle}
                  className="btn btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <Download size={15} />
                  <span>Download Master Kit</span>
                </button>
                <button onClick={() => setShowCreativeKitModal(false)} className="btn btn-outline">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
