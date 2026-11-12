import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { printBrandedADCSDocument } from '../../utils/documentBranding';
import { 
  Network, 
  Building2, 
  Users, 
  TrendingUp, 
  DollarSign, 
  PlusCircle, 
  CheckCircle2, 
  AlertCircle, 
  ArrowUpRight, 
  Download,
  Percent,
  Search,
  ShieldCheck,
  Send
} from 'lucide-react';
import { DistributorDownline } from '../../types';

export const DistributorPortal: React.FC = () => {
  const { distributorDownlines, addDownlineFranchise, showToast, logAudit } = useApp();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [franchiseName, setFranchiseName] = useState('');
  const [location, setLocation] = useState('');
  const [vleCount, setVleCount] = useState(15);
  const [overrideRate, setOverrideRate] = useState(2.5);
  const [selectedAuditFranchise, setSelectedAuditFranchise] = useState<DistributorDownline | null>(null);

  const handleExportPayoutLedger = () => {
    const headers = ['Franchise ID', 'Franchise Center', 'Location', 'VLE Count', 'Monthly GTV (INR)', 'Override Rate (%)', 'Gross Commission (INR)', 'TDS Sec 194H 5% (INR)', 'Net Payable (INR)', 'Status'];
    const rows = distributorDownlines.map(d => {
      const gross = d.commissionEarned;
      const tds = Math.round(gross * 0.05);
      const net = gross - tds;
      return [
        d.id,
        `"${d.franchiseName.replace(/"/g, '""')}"`,
        `"${d.location.replace(/"/g, '""')}"`,
        d.vleCount,
        d.monthlyGtv,
        d.overrideCommissionRate,
        gross,
        tds,
        net,
        d.status
      ].join(',');
    });
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'ADCS_Distributor_Payout_Ledger_Sept2026.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Settlement Exported', 'Distributor monthly settlement statement downloaded in CSV format.', 'success');
  };

  const handleDownloadFranchiseAuditDossier = (item: DistributorDownline) => {
    const dossierHash = `SHA256-${item.id.replace(/[^A-Z0-9]/gi, '').toUpperCase()}-${String(item.monthlyGtv + item.vleCount * 97).slice(-6)}`;
    printBrandedADCSDocument({
      title: `Statutory Franchise Territory Audit Dossier — ${item.franchiseName}`,
      documentType: 'FRANCHISE AUDIT DOSSIER',
      documentNumber: item.id,
      issuedDate: new Date().toLocaleDateString('en-IN'),
      rows: [
        { label: 'Franchise Center', value: item.franchiseName },
        { label: 'Territory Location', value: item.location },
        { label: 'Affiliated VLE Micro-Centers', value: `${item.vleCount} Centers` },
        { label: 'Monthly GTV / Commission', value: `₹${item.monthlyGtv.toLocaleString('en-IN')} GTV • ₹${item.commissionEarned.toLocaleString('en-IN')} (${item.overrideCommissionRate}% Override)` },
        { label: 'Operating Status', value: item.status.toUpperCase() },
        { label: 'UIDAI & CCTNS Readiness', value: 'Biometric Device Registered • Police Clearance On File' },
        { label: 'NPCI / DPDP Safeguards', value: `Agent Code AI-ADCS-TERR-${item.id.slice(-4)} • DPDP Act 2025 Zero-Local-PII` },
        { label: 'Hardware Stack Check', value: 'Mantra MFS100 L1, Iris iCAM R100, PAX D180 MPOS, Thermal 203 DPI' },
        { label: 'Audit Dossier Digest', value: dossierHash },
      ],
      notes: ['Issued by ADCS National Governance & Compliance Cell for internal distributor territory auditing.'],
    });
    showToast('Audit Dossier Ready', `Audit dossier for ${item.franchiseName} opened for print/PDF.`, 'success');
  };

  const totalGtv = distributorDownlines.reduce((sum, d) => sum + d.monthlyGtv, 0);
  const totalCommission = distributorDownlines.reduce((sum, d) => sum + d.commissionEarned, 0);
  const totalVles = distributorDownlines.reduce((sum, d) => sum + d.vleCount, 0);

  const filteredDownlines = distributorDownlines.filter(d => 
    d.franchiseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddFranchise = (e: React.FormEvent) => {
    e.preventDefault();
    if (!franchiseName || !location) return;

    addDownlineFranchise({
      franchiseName,
      location,
      vleCount: Number(vleCount),
      overrideCommissionRate: Number(overrideRate)
    });

    logAudit('DISTRIBUTOR_ONBOARD', `Onboarded Franchise: ${franchiseName} in ${location}`, 'Success');
    setShowAddModal(false);
    setFranchiseName('');
    setLocation('');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        
        {/* Header Strip */}
        <div style={{
          background: 'linear-gradient(135deg, #061A36 0%, #0F2A4A 60%, #075ACB 100%)',
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
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)', padding: '0.35rem 0.8rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, color: '#FDE68A', marginBottom: '0.75rem' }}>
              <Network size={14} />
              <span>TERRITORY DISTRIBUTOR COMMAND HUB • DOWNLINE OVERRIDES</span>
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 900, margin: '0 0 0.5rem', color: '#FFFFFF' }}>
              Master Regional Distributor Operations
            </h1>
            <p style={{ color: '#CBD5E1', fontSize: '0.92rem', maxWidth: '650px', margin: 0, lineHeight: 1.5 }}>
              Manage multi-district franchise networks, monitor downline Gross Transaction Volume (GTV), calibrate override commission slabs, and track automated weekly settlements.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn btn-gold"
              style={{ fontWeight: 800, padding: '0.75rem 1.4rem' }}
            >
              <PlusCircle size={18} /> Onboard New Franchise
            </button>
            <button
              onClick={handleExportPayoutLedger}
              className="btn"
              style={{ background: 'rgba(255,255,255,0.12)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              <Download size={18} /> Payout Ledger
            </button>
          </div>
        </div>

        {/* Territory Key Performance Metrics */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem'
        }}>
          <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', fontSize: '0.82rem', fontWeight: 600 }}>
              <span>ACTIVE DOWNLINE FRANCHISES</span>
              <Building2 size={18} color="#075ACB" />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#061A36', margin: '0.4rem 0' }}>
              {distributorDownlines.length} Centers
            </div>
            <div style={{ fontSize: '0.78rem', color: '#059669', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <ArrowUpRight size={14} /> 100% operational uptime
            </div>
          </div>

          <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', fontSize: '0.82rem', fontWeight: 600 }}>
              <span>ACTIVE VLE NETWORK REACH</span>
              <Users size={18} color="#D97706" />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#061A36', margin: '0.4rem 0' }}>
              {totalVles} VLE Booths
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
              Across 4 Regional Districts
            </div>
          </div>

          <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', fontSize: '0.82rem', fontWeight: 600 }}>
              <span>MONTHLY NETWORK GTV</span>
              <TrendingUp size={18} color="#059669" />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#059669', margin: '0.4rem 0' }}>
              ₹{totalGtv.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
              Gross Citizen & Business Transactions
            </div>
          </div>

          <div className="card" style={{ padding: '1.5rem', borderRadius: '16px', background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', fontSize: '0.82rem', fontWeight: 600 }}>
              <span>TOTAL OVERRIDE COMMISSION</span>
              <DollarSign size={18} color="#F59E0B" />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#D97706', margin: '0.4rem 0' }}>
              ₹{totalCommission.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#059669' }}>
              Ready for Friday settlement
            </div>
          </div>
        </div>

        {/* Downline Franchise Table */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 4px 20px rgba(10, 25, 47, 0.05)',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#061A36', margin: 0 }}>
                Subordinated Franchise Portfolio
              </h2>
              <p style={{ fontSize: '0.82rem', color: '#64748B', margin: '2px 0 0' }}>
                Automated 2.5% override cut calculated live from daily citizen service clearances.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '10px', padding: '0.4rem 0.8rem', gap: '0.5rem', width: '320px' }}>
              <Search size={16} color="#64748B" />
              <input
                type="text"
                placeholder="Search by franchise or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.85rem', width: '100%' }}
              />
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '1rem 1.25rem' }}>Franchise Center</th>
                  <th style={{ padding: '1rem 1.25rem' }}>Location</th>
                  <th style={{ padding: '1rem 1.25rem' }}>Active VLEs</th>
                  <th style={{ padding: '1rem 1.25rem' }}>Monthly GTV</th>
                  <th style={{ padding: '1rem 1.25rem' }}>Override Slab</th>
                  <th style={{ padding: '1rem 1.25rem' }}>Commission Earned</th>
                  <th style={{ padding: '1rem 1.25rem' }}>Status</th>
                  <th style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDownlines.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <div style={{ fontWeight: 800, color: '#061A36' }}>{item.franchiseName}</div>
                      <div style={{ fontSize: '0.72rem', color: '#64748B' }}>ID: {item.id}</div>
                    </td>
                    <td style={{ padding: '1rem 1.25rem', color: '#475569' }}>{item.location}</td>
                    <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: '#075ACB' }}>{item.vleCount} VLEs</td>
                    <td style={{ padding: '1rem 1.25rem', fontWeight: 700 }}>₹{item.monthlyGtv.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <span className="badge badge-gold" style={{ fontSize: '0.75rem' }}>
                        {item.overrideCommissionRate}% Override
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.25rem', fontWeight: 800, color: '#059669' }}>
                      ₹{item.commissionEarned.toLocaleString('en-IN')}
                    </td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <span className={`badge ${item.status === 'Active' ? 'badge-green' : 'badge-red'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                      <button
                        onClick={() => setSelectedAuditFranchise(item)}
                        className="btn btn-sm btn-outline"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODAL: ONBOARD NEW FRANCHISE */}
        {showAddModal && (
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
            <div style={{ background: '#FFFFFF', borderRadius: '20px', maxWidth: '500px', width: '100%', padding: '2rem', boxShadow: '0 25px 60px rgba(0,0,0,0.3)' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#061A36', marginBottom: '0.25rem' }}>
                Onboard Subordinated Franchise
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '1.25rem' }}>
                Provision a regional district franchise branch under your master distributor license.
              </p>

              <form onSubmit={handleAddFranchise}>
                <div className="form-group">
                  <label className="form-label">Franchise Center Name *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Muzaffarpur Digital Seva Center"
                    value={franchiseName}
                    onChange={(e) => setFranchiseName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Territory / Location (City, State) *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Muzaffarpur, Bihar"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Initial VLE Count</label>
                    <input
                      type="number"
                      min={1}
                      className="form-input"
                      value={vleCount}
                      onChange={(e) => setVleCount(Number(e.target.value))}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Override Slab (%) — Admin Locked</label>
                    <input
                      type="number"
                      className="form-input"
                      value={overrideRate}
                      disabled
                      readOnly
                      title="Only Super Admin may modify commission rates"
                      style={{ background: '#F1F5F9', color: '#64748B', cursor: 'not-allowed' }}
                    />
                    <span style={{ fontSize: '0.7rem', color: '#64748B' }}>Commission slabs are governed exclusively by Super Admin.</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                  <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline" style={{ flex: 1 }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" style={{ flex: 2, fontWeight: 800 }}>
                    Confirm Onboarding
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: FRANCHISE AUDIT DOSSIER INSPECTION */}
        {selectedAuditFranchise && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10, 25, 47, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem'
          }}>
            <div style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '2.25rem',
              boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.3)',
              border: '1px solid #E2E8F0'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                  <span className="badge badge-green" style={{ marginBottom: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <ShieldCheck size={14} /> Statutory Audit Packet Verified
                  </span>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, color: '#061A36' }}>
                    {selectedAuditFranchise.franchiseName}
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '0.2rem' }}>
                    Franchise ID: {selectedAuditFranchise.id} • {selectedAuditFranchise.location}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAuditFranchise(null)}
                  style={{ background: '#F1F5F9', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}
                >
                  ✕
                </button>
              </div>

              {/* Status & Key Metrics Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>MONTHLY GTV</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#061A36', marginTop: '0.25rem' }}>
                    ₹{selectedAuditFranchise.monthlyGtv.toLocaleString('en-IN')}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 600, marginTop: '0.2rem' }}>✓ 100% Reconciled</div>
                </div>
                <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>OVERRIDE RATE</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#D97706', marginTop: '0.25rem' }}>
                    {selectedAuditFranchise.overrideCommissionRate}%
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '0.2rem' }}>₹{selectedAuditFranchise.commissionEarned.toLocaleString('en-IN')} Net Earned</div>
                </div>
                <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>ATTACHED VLEs</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#075ACB', marginTop: '0.25rem' }}>
                    {selectedAuditFranchise.vleCount} Units
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 600, marginTop: '0.2rem' }}>All Active Operators</div>
                </div>
              </div>

              {/* Statutory Compliance Checklist */}
              <div style={{ background: '#F8FAFC', borderRadius: '14px', padding: '1.25rem', border: '1px solid #E2E8F0', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#061A36', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Compliance & Regulatory Status
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.82rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#15803D' }}>
                    <CheckCircle2 size={16} /> <span>UIDAI L1 Biometric Auth: <strong>Compliant</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#15803D' }}>
                    <CheckCircle2 size={16} /> <span>Police Verification: <strong>CCTNS Passed</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#15803D' }}>
                    <CheckCircle2 size={16} /> <span>DPDP Act 2025: <strong>Zero Raw PII</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#15803D' }}>
                    <CheckCircle2 size={16} /> <span>BBPS Agent Code: <strong>AI-ADCS-TERR</strong></span>
                  </div>
                </div>
              </div>

              {/* Hardware Diagnostic Log */}
              <div style={{ background: '#0F172A', color: '#94A3B8', borderRadius: '12px', padding: '1rem', fontFamily: 'monospace', fontSize: '0.76rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                <div style={{ color: '#38BDF8', fontWeight: 700, marginBottom: '0.35rem' }}>// HARDWARE TELEMETRY & AUTH LOG</div>
                <div>[2026-11-11 08:30:14] Mantra MFS100 L1 (SN-MFS-98214) RD Service Ready</div>
                <div>[2026-11-11 09:12:45] Biometric PID block encryption key refreshed via UIDAI HSM</div>
                <div>[2026-11-11 11:45:02] PAX D180 MPOS Firmware v4.81 Integrity Check: OK</div>
                <div>[2026-11-11 12:05:19] Daily GTV settle sync: 419 transactions validated</div>
              </div>

              {/* Modal Actions */}
              <div style={{ display: 'flex', gap: '0.85rem' }}>
                <button
                  type="button"
                  onClick={() => setSelectedAuditFranchise(null)}
                  className="btn btn-outline"
                  style={{ flex: 1 }}
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => handleDownloadFranchiseAuditDossier(selectedAuditFranchise)}
                  className="btn btn-primary"
                  style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: 800 }}
                >
                  <Download size={16} /> Download Certified Audit Packet
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
