import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { printBrandedADCSDocument } from '../../utils/documentBranding';
import { 
  Monitor, 
  Printer, 
  Clock, 
  Play, 
  Square, 
  DollarSign, 
  CheckCircle2, 
  Layers, 
  AlertCircle,
  FileText,
  Download,
  PlusCircle
} from 'lucide-react';

export const CyberCafeOperatorPortal: React.FC = () => {
  const { 
    workstations, 
    startWorkstationSession, 
    stopWorkstationSession, 
    printJobs, 
    addPrintJob,
    recordJournalEntry,
    showToast,
    language 
  } = useApp();

  const [selectedStationId, setSelectedStationId] = useState<string>('PC-02');
  const [sessionCustomer, setSessionCustomer] = useState('');
  const [sessionTask, setSessionTask] = useState('Online Job Application');

  // Quick print counter form state
  const [printCustomer, setPrintCustomer] = useState('');
  const [printType, setPrintType] = useState<'B/W Print' | 'Color Print' | 'Scan' | 'Lamination' | 'Spiral Binding'>('B/W Print');
  const [printPages, setPrintPages] = useState(5);
  const [printCopies, setPrintCopies] = useState(1);

  const [lastCashReceipt, setLastCashReceipt] = useState<{
    ref: string;
    stationOrJob: string;
    customerName: string;
    detail: string;
    amount: number;
    timestamp: string;
  } | null>(null);

  const inUseCount = workstations.filter(w => w.status === 'in-use').length;
  const availCount = workstations.filter(w => w.status === 'available').length;

  const PRINT_RATES: Record<'B/W Print' | 'Color Print' | 'Scan' | 'Lamination' | 'Spiral Binding', number> = {
    'B/W Print': 5,
    'Color Print': 20,
    'Scan': 15,
    'Lamination': 30,
    'Spiral Binding': 50,
  };

  const postCafeRevenueLedger = (ref: string, description: string, grossAmount: number) => {
    const roundedGross = Number(grossAmount.toFixed(2));
    if (roundedGross <= 0) return;
    const gst = Number((roundedGross - roundedGross / 1.18).toFixed(2));
    const base = Number((roundedGross - gst).toFixed(2));
    recordJournalEntry({
      date: new Date().toISOString().split('T')[0],
      reference: ref,
      description,
      lines: [
        { accountCode: '1001', accountName: 'Cash Counter & Counter Drawer', debit: roundedGross, credit: 0 },
        { accountCode: '4061', accountName: 'Cyber Cafe Terminal & Print Revenue', debit: 0, credit: base },
        { accountCode: '2010', accountName: 'GST Output Tax Payable (18%)', debit: 0, credit: gst },
      ],
    });
  };

  const downloadReceiptTxt = (receipt: NonNullable<typeof lastCashReceipt>) => {
    const baseAmt = Number((receipt.amount / 1.18).toFixed(2));
    const gstAmt = Number((receipt.amount - baseAmt).toFixed(2));
    printBrandedADCSDocument({
      title: 'ADCS Cyber Cafe POS Cash Receipt & Job Slip',
      documentType: 'POS CASH RECEIPT',
      documentNumber: receipt.ref,
      issuedDate: receipt.timestamp,
      rows: [
        { label: 'Customer Name', value: receipt.customerName },
        { label: 'Terminal / Print Job', value: receipt.stationOrJob },
        { label: 'Service Particulars', value: receipt.detail },
        { label: 'Double-Entry Ledger', value: 'Posted (1001 Cash Dr / 4061 + 2010 Cr)' },
      ],
      amountSummary: {
        subtotal: baseAmt,
        tax: gstAmt,
        total: receipt.amount,
        currency: '₹',
        paymentStatus: 'CASH SETTLED (INCL. 18% GST)',
      },
    });
  };

  const handleLaunchSession = () => {
    if (!sessionCustomer.trim()) {
      showToast('Customer Name Required', 'Enter walk-in customer name before starting terminal.', 'warning');
      return;
    }
    startWorkstationSession(selectedStationId, sessionCustomer.trim(), '+91 98000 00000', sessionTask);
    setSessionCustomer('');
  };

  const handleEndSessionAndCollect = (pcId: string, customerName: string, activeTask: string) => {
    const bill = stopWorkstationSession(pcId);
    const ref = `CAFE-PC-${Date.now().toString().slice(-6)}`;
    postCafeRevenueLedger(ref, `Cyber Cafe Workstation Settlement (${pcId} — ${customerName})`, bill);
    setLastCashReceipt({
      ref,
      stationOrJob: pcId,
      customerName,
      detail: activeTask || 'Workstation Browsing Session',
      amount: bill,
      timestamp: new Date().toLocaleString('en-IN'),
    });
  };

  const handleQueuePrintJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!printCustomer.trim()) {
      showToast('Customer Name Required', 'Enter customer name for print counter slip.', 'warning');
      return;
    }
    const pages = Math.max(1, Number(printPages) || 1);
    const copies = Math.max(1, Number(printCopies) || 1);
    const rate = PRINT_RATES[printType];
    const totalCost = printType === 'Lamination' || printType === 'Spiral Binding' ? copies * rate : pages * copies * rate;
    addPrintJob({
      type: printType,
      customerName: printCustomer.trim(),
      pages,
      copies,
      ratePerPage: rate,
      totalCost,
      status: 'Completed',
    });
    const ref = `CAFE-PRT-${Date.now().toString().slice(-6)}`;
    postCafeRevenueLedger(ref, `Print/Xerox Counter (${printType} x ${copies} — ${printCustomer.trim()})`, totalCost);
    setLastCashReceipt({
      ref,
      stationOrJob: `Print Counter (${printType})`,
      customerName: printCustomer.trim(),
      detail: `${pages} pages x ${copies} copies @ INR ${rate}`,
      amount: totalCost,
      timestamp: new Date().toLocaleString('en-IN'),
    });
    setPrintCustomer('');
  };

  return (
    <div className="container-wide" style={{ padding: '2.5rem 1.5rem 4rem' }}>
      <div style={{
        background: 'linear-gradient(135deg, #061A36 0%, #031126 60%, #075ACB 100%)',
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
          <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>OPERATOR TERMINAL CONSOLE</span>
          <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 900, marginBottom: '0.4rem', color: '#FFFFFF' }}>
            Cyber Café Floor & Terminal Operations
          </h1>
          <p style={{ fontSize: '0.92rem', color: '#CBD5E1' }}>
            Real-time workstation seat management, hourly timer billing, print queue dispatch, and daily revenue reporting.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '0.85rem 1.25rem', borderRadius: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#10B981' }}>{availCount}</div>
            <div style={{ fontSize: '0.72rem', color: '#CBD5E1' }}>Seats Free</div>
          </div>
          <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '0.85rem 1.25rem', borderRadius: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#EF4444' }}>{inUseCount}</div>
            <div style={{ fontSize: '0.72rem', color: '#CBD5E1' }}>Seats In-Use</div>
          </div>
        </div>
      </div>

      {/* Live Cash Receipt Confirmation Banner */}
      {lastCashReceipt && (
        <div style={{
          background: '#ECFDF5',
          border: '1.5px solid #10B981',
          borderRadius: '18px',
          padding: '1.25rem 1.5rem',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.98rem', color: '#065F46' }}>
              Cash Settled & Double-Entry Posted • {lastCashReceipt.ref}
            </div>
            <div style={{ fontSize: '0.82rem', color: '#047857', marginTop: '0.2rem' }}>
              {lastCashReceipt.stationOrJob} — {lastCashReceipt.customerName} ({lastCashReceipt.detail}) • Total: ₹{lastCashReceipt.amount.toFixed(2)}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button
              onClick={() => downloadReceiptTxt(lastCashReceipt)}
              className="btn-primary btn-sm"
              style={{ gap: '0.35rem' }}
            >
              <Download size={14} />
              <span>Print / PDF POS Bill</span>
            </button>
            <button
              onClick={() => setLastCashReceipt(null)}
              style={{
                padding: '0.45rem 0.75rem',
                borderRadius: '8px',
                border: '1px solid #A7F3D0',
                background: '#FFFFFF',
                color: '#065F46',
                fontWeight: 700,
                fontSize: '0.78rem',
              }}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Custom Session Launcher Bar */}
      <div style={{
        background: '#F8FAFC',
        borderRadius: '20px',
        padding: '1.25rem 1.5rem',
        border: '1px solid #E2E8F0',
        marginBottom: '2rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '0.85rem',
        alignItems: 'end',
      }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '0.3rem' }}>
            Target Station
          </label>
          <select
            className="form-select"
            value={selectedStationId}
            onChange={(e) => setSelectedStationId(e.target.value)}
          >
            {workstations.map(w => (
              <option key={w.id} value={w.id} disabled={w.status !== 'available'}>
                {w.id} ({w.status})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '0.3rem' }}>
            Walk-In Customer Name
          </label>
          <input
            type="text"
            className="form-input"
            value={sessionCustomer}
            onChange={(e) => setSessionCustomer(e.target.value)}
            placeholder="e.g. Rohit Kumar"
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '0.3rem' }}>
            Workstation Purpose
          </label>
          <input
            type="text"
            className="form-input"
            value={sessionTask}
            onChange={(e) => setSessionTask(e.target.value)}
            placeholder="Exam Form / Aadhaar Print"
          />
        </div>
        <button
          onClick={handleLaunchSession}
          className="btn-primary"
          style={{ justifyContent: 'center', gap: '0.4rem' }}
        >
          <Play size={15} />
          <span>Assign & Start Timer</span>
        </button>
      </div>

      {/* Operator Terminal Grid */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '2rem',
        border: '1px solid #E2E8F0',
        marginBottom: '3rem',
      }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#061A36', marginBottom: '1.5rem' }}>
          Active Floor Workstation Matrix (PC-01 to PC-08)
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1.25rem',
        }}>
          {workstations.map(pc => {
            const isAvail = pc.status === 'available';
            const isInUse = pc.status === 'in-use';

            return (
              <div
                key={pc.id}
                style={{
                  borderRadius: '16px',
                  padding: '1.25rem',
                  border: isAvail ? '1.5px solid #10B981' : isInUse ? '1.5px solid #EF4444' : '1px solid #CBD5E1',
                  background: isAvail ? '#F0FDF4' : isInUse ? '#FEF2F2' : '#F8FAFC',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1rem',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Monitor size={18} color={isAvail ? '#059669' : '#DC2626'} />
                      <span style={{ fontWeight: 800, fontSize: '1.05rem', color: '#061A36' }}>{pc.id}</span>
                    </div>
                    <span className={`badge ${isAvail ? 'badge-green' : isInUse ? 'badge-red' : 'badge-gray'}`}>
                      {pc.status.toUpperCase()}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>IP: {pc.ip}</div>

                  {isInUse && pc.currentSession && (
                    <div style={{
                      marginTop: '0.75rem',
                      padding: '0.75rem',
                      background: '#FFFFFF',
                      borderRadius: '10px',
                      border: '1px solid #FECDD3',
                      fontSize: '0.8rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.25rem',
                    }}>
                      <div style={{ fontWeight: 800, color: '#061A36' }}>{pc.currentSession.customerName}</div>
                      <div style={{ color: '#475569' }}>Task: {pc.currentSession.activeTask}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#DC2626', fontWeight: 700, marginTop: '0.2rem' }}>
                        <span>Logged In: {pc.currentSession.startTime}</span>
                        <span>{pc.currentSession.elapsedMinutes} mins</span>
                      </div>
                    </div>
                  )}
                </div>

                {isAvail ? (
                  <button
                    onClick={() => {
                      setSelectedStationId(pc.id);
                      setSessionCustomer('Walk-in Customer ' + pc.id);
                      startWorkstationSession(pc.id, 'Walk-in Customer ' + pc.id, '+91 98000 00000', 'General Internet Access');
                    }}
                    className="btn-primary btn-sm"
                    style={{ width: '100%', gap: '0.35rem' }}
                  >
                    <Play size={14} />
                    <span>Quick Start Session</span>
                  </button>
                ) : isInUse ? (
                  <button
                    onClick={() => handleEndSessionAndCollect(
                      pc.id,
                      pc.currentSession?.customerName || 'Walk-In Customer',
                      pc.currentSession?.activeTask || 'Workstation Browsing'
                    )}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      borderRadius: '8px',
                      background: '#EF4444',
                      color: '#FFFFFF',
                      fontWeight: 700,
                      fontSize: '0.78rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.35rem',
                    }}
                  >
                    <Square size={14} />
                    <span>End Session & Collect Cash</span>
                  </button>
                ) : (
                  <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#64748B' }}>
                    Station Offline
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Print Queue Dispatch */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '2rem',
        border: '1px solid #E2E8F0',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#061A36' }}>
            Daily Print & Xerox Production Queue
          </h3>
          <span className="badge badge-blue">Toner Remaining: 84%</span>
        </div>

        <form
          onSubmit={handleQueuePrintJob}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '0.75rem',
            padding: '1rem',
            borderRadius: '14px',
            background: '#F8FAFC',
            border: '1px solid #CBD5E1',
            marginBottom: '1.25rem',
            alignItems: 'end',
          }}
        >
          <div>
            <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#475569', marginBottom: '0.25rem' }}>
              Customer Name
            </label>
            <input
              type="text"
              className="form-input"
              value={printCustomer}
              onChange={(e) => setPrintCustomer(e.target.value)}
              placeholder="Walk-in customer"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#475569', marginBottom: '0.25rem' }}>
              Job Type
            </label>
            <select
              className="form-select"
              value={printType}
              onChange={(e) => setPrintType(e.target.value as typeof printType)}
            >
              <option value="B/W Print">B/W Print (₹5/pg)</option>
              <option value="Color Print">Color Print (₹20/pg)</option>
              <option value="Scan">Document Scan (₹15/pg)</option>
              <option value="Lamination">Lamination (₹30/sheet)</option>
              <option value="Spiral Binding">Spiral Binding (₹50/book)</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#475569', marginBottom: '0.25rem' }}>
              Pages
            </label>
            <input
              type="number"
              min={1}
              className="form-input"
              value={printPages}
              onChange={(e) => setPrintPages(Math.max(1, Number(e.target.value)))}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#475569', marginBottom: '0.25rem' }}>
              Copies
            </label>
            <input
              type="number"
              min={1}
              className="form-input"
              value={printCopies}
              onChange={(e) => setPrintCopies(Math.max(1, Number(e.target.value)))}
            />
          </div>
          <button type="submit" className="btn-primary" style={{ justifyContent: 'center', gap: '0.35rem' }}>
            <PlusCircle size={15} />
            <span>Add &amp; Bill Print</span>
          </button>
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {printJobs.map(job => (
            <div
              key={job.id}
              style={{
                padding: '1rem',
                borderRadius: '12px',
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#061A36' }}>
                  {job.id} • {job.customerName}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                  {job.type} • {job.pages} pages x {job.copies} copies @ ₹{job.ratePerPage}/page
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#061A36' }}>
                    ₹{job.totalCost}
                  </div>
                  <span className="badge badge-green">{job.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
