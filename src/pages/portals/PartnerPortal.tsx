import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { 
  Briefcase, 
  DollarSign, 
  Star, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Calendar, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const PartnerPortal: React.FC = () => {
  const { showToast, logAudit, language } = useApp();

  const [partnerLeads, setPartnerLeads] = useState([
    { id: 'JOB-901', service: 'CCTV 4-Camera Installation & Cabling', customer: 'Amitabh Verma (Store Owner)', location: 'Ranchi, Jharkhand', payout: 2200, status: 'New Lead' },
    { id: 'JOB-902', service: 'Residential Turnkey 3D Architectural Blueprint', customer: 'Sunil Mathur', location: 'Bihta, Patna', payout: 8500, status: 'New Lead' },
    { id: 'JOB-903', service: 'CA Private Limited Filing & Share Capital Audit', customer: 'Deepak Agrawal', location: 'Patna Central', payout: 3500, status: 'In Progress' },
  ]);

  const handleAcceptJob = (jobId: string) => {
    setPartnerLeads(prev => prev.map(j => j.id === jobId ? { ...j, status: 'Accepted & Dispatched' } : j));
    showToast('Job Accepted', `Work order ${jobId} allocated to you. Customer contact unlocked.`, 'success');
    logAudit(`Partner Accepted Job: ${jobId}`, `Technician Desk`);
  };

  return (
    <div className="container-wide" style={{ padding: '2.5rem 1.5rem 4rem' }}>
      {/* Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0A192F 0%, #0D2137 60%, #1D4ED8 100%)',
        borderRadius: '24px',
        padding: '2.5rem',
        color: '#FFFFFF',
        marginBottom: '2.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
            <span className="badge badge-gold">VERIFIED SERVICE PARTNER</span>
            <span className="badge badge-green">KYC Cleared</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 900, marginBottom: '0.3rem', color: '#FFFFFF' }}>
            Santosh Kumar (Certified CCTV & Telecom Engineer)
          </h1>
          <p style={{ fontSize: '0.92rem', color: '#CBD5E1' }}>
            Partner ID: AD-PTR-5520 • Field Coverage: Patna & Ranchi Metro
          </p>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '1rem 1.5rem',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          textAlign: 'right',
        }}>
          <div style={{ fontSize: '0.78rem', color: '#93C5FD' }}>WALLET PAYOUT BALANCE</div>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#F59E0B' }}>
            ₹14,200
          </div>
          <button
            onClick={() => showToast('Payout Initiated', '₹14,200 transferred to your linked bank account.', 'success')}
            className="btn-gold btn-sm"
            style={{ marginTop: '0.4rem' }}
          >
            Withdraw to Bank
          </button>
        </div>
      </div>

      {/* Leads Table */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        padding: '2rem',
        border: '1px solid #E2E8F0',
      }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0A192F', marginBottom: '1.25rem' }}>
          Assigned Service Work Orders & Leads
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {partnerLeads.map(job => (
            <div
              key={job.id}
              style={{
                padding: '1.25rem',
                borderRadius: '14px',
                background: '#F8FAFC',
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
                  <span style={{ fontWeight: 800, color: '#0A192F' }}>{job.id}</span>
                  <span className="badge badge-blue">{job.status}</span>
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#1D4ED8' }}>
                  {job.service}
                </h4>
                <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '0.2rem' }}>
                  Client: {job.customer} • Location: {job.location}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Partner Fee Payout</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#059669' }}>
                    ₹{job.payout.toLocaleString('en-IN')}
                  </div>
                </div>

                {job.status === 'New Lead' ? (
                  <button
                    onClick={() => handleAcceptJob(job.id)}
                    className="btn-gold"
                    style={{ fontWeight: 800 }}
                  >
                    Accept Work Order
                  </button>
                ) : (
                  <button
                    onClick={() => showToast('Job Marked Complete', `Payment of ₹${job.payout} credited to wallet.`, 'success')}
                    className="btn-primary btn-sm"
                  >
                    Mark Handover Complete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
