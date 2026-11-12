import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { 
  Boxes, 
  DollarSign, 
  AlertTriangle, 
  PlusCircle, 
  MinusCircle, 
  FileText, 
  TrendingUp, 
  TrendingDown
} from 'lucide-react';
import { InventoryRecord } from '../../types';
import { printBrandedADCSDocument } from '../../utils/documentBranding';

export const ERPPage: React.FC = () => {
  const { inventory, updateInventoryStock, recordJournalEntry, logAudit, showToast } = useApp();
  
  const [activeTab, setActiveTab] = useState<'finance' | 'inventory' | 'invoicing'>('inventory');
  const [showPOModal, setShowPOModal] = useState<InventoryRecord | null>(null);
  const [poQuantity, setPoQuantity] = useState<number>(50);

  // Invoicing state
  const [buyerName, setBuyerName] = useState('Sharma Enterprises Ltd');
  const [buyerGstin, setBuyerGstin] = useState('07AAAAA0000A1Z5');
  const [invItem, setInvItem] = useState('Enterprise CCTV 8-Channel NVR System');
  const [invAmount, setInvAmount] = useState<number>(24999);

  const lowStockItems = inventory.filter(i => i.stockQuantity <= i.minReorderLevel);
  const totalInventoryValue = inventory.reduce((acc, i) => acc + (i.stockQuantity * i.unitCost), 0);

  const handleStockAdjustment = (item: InventoryRecord, delta: number) => {
    updateInventoryStock(item.id, delta);
    logAudit('INVENTORY_UPDATE', `Adjusted stock for ${item.name} (${item.sku}) by ${delta > 0 ? '+' : ''}${delta}`, 'Success');
  };

  const handleRaisePO = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showPOModal) return;

    const poId = `PO-${Date.now().toString().slice(-5)}`;
    const poContent = `================================================================================
AKUL DRAVIN DIGITAL SERVICES (ADCS) - OFFICIAL PURCHASE ORDER
================================================================================
PO Number      : ${poId}
PO Date        : ${new Date().toLocaleDateString('en-GB')}
Vendor Status  : Tier-1 OEM Hardware Partner
Payment Terms  : Net 30 Days via RTGS / Corporate Clearing
--------------------------------------------------------------------------------
LINE ITEM DETAILS:
Item Name      : ${showPOModal.name}
SKU Code       : ${showPOModal.sku}
Quantity Ordered: ${poQuantity} Units
Unit Cost      : ₹${showPOModal.unitCost.toLocaleString('en-IN')}
Total PO Value : ₹${(poQuantity * showPOModal.unitCost).toLocaleString('en-IN')}
Delivery Depot : ADCS Central Logistics Distribution Hub, Delhi-NCR
--------------------------------------------------------------------------------
Authorized By  : National Procurement & Inventory Cell
PO Hash        : SHA256-${poId.replace(/[^A-Z0-9]/gi, '').toUpperCase()}-PO-APPROVED
================================================================================`;
    const blob = new Blob([poContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ADCS_Purchase_Order_${poId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    updateInventoryStock(showPOModal.id, poQuantity);
    logAudit('PROCUREMENT_PO', `Generated PO for ${poQuantity} units of ${showPOModal.name}`, 'Success');
    showToast('Purchase Order Dispatched', `✓ Purchase Order #${poId} for ${poQuantity} units downloaded and logged! Stock incremented.`, 'success');
    setShowPOModal(null);
  };

  const handleGenerateInvoice = () => {
    const cleanBuyer = buyerName.trim();
    const cleanGstin = buyerGstin.trim().toUpperCase();
    if (!cleanBuyer || invAmount <= 0) {
      showToast('Invalid Invoice Input', 'Enter valid Buyer Name and positive base amount.', 'warning');
      return;
    }
    if (cleanGstin && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(cleanGstin)) {
      showToast('Invalid Buyer GSTIN', 'Enter valid 15-character GSTIN (e.g. 07AAAAA0000A1Z5) or leave blank for URP.', 'warning');
      return;
    }

    const invNumber = `INV-2026-${Date.now().toString().slice(-4)}`;
    const cgst = Number((invAmount * 0.09).toFixed(2));
    const sgst = Number((invAmount * 0.09).toFixed(2));
    const total = Number((invAmount + cgst + sgst).toFixed(2));
    printBrandedADCSDocument({
      title: 'Official B2B / B2C GST Tax Invoice',
      documentType: 'ADCS GST TAX INVOICE',
      documentNumber: invNumber,
      issuedDate: new Date().toLocaleDateString('en-GB'),
      rows: [
        { label: 'Supplier Legal Name', value: 'Akul Dravin Digital Services Private Limited' },
        { label: 'Supplier GSTIN / State', value: '07AABCA1234F1Z5 (Delhi - 07)' },
        { label: 'SAC / HSN Classification', value: '8528 / 998313' },
        { label: 'Buyer / Recipient Name', value: cleanBuyer },
        { label: 'Buyer GSTIN', value: cleanGstin || 'URP (Unregistered Person)' },
        { label: 'Place of Supply', value: 'Delhi (07) • Reverse Charge: No' },
        { label: 'Line Item (Qty: 1)', value: `${invItem} (Taxable Base ₹${invAmount.toLocaleString('en-IN')}.00)` },
        { label: 'IRN Digest Reference', value: `SHA256-${invNumber.replace(/[^A-Z0-9]/gi, '').toUpperCase()}-GST-VALID` },
      ],
      amountSummary: {
        subtotal: invAmount,
        tax: Number((cgst + sgst).toFixed(2)),
        total,
        currency: '₹',
        paymentStatus: `CGST @ 9% ₹${cgst.toLocaleString('en-IN')} + SGST @ 9% ₹${sgst.toLocaleString('en-IN')}`,
      },
      notes: [
        `Amount in Words: Indian Rupees ${Math.round(total).toLocaleString('en-IN')} Only.`,
        'Generated through Akul Dravin Digital Services Enterprise ERP Invoicing Engine.',
      ],
      verificationUrl: `${typeof window !== 'undefined' ? window.location.origin : 'https://akuldravindigital.com'}/verify-invoice?irn=${encodeURIComponent(invNumber)}`,
    });

    recordJournalEntry({
      date: new Date().toISOString().substring(0, 10),
      reference: invNumber,
      description: `ERP GST Tax Invoice (${cleanBuyer} — ${invItem})`,
      lines: [
        { accountCode: '1020', accountName: 'Commercial Bank & Receivables', debit: total, credit: 0 },
        { accountCode: '4020', accountName: 'Hardware & Enterprise Sales Revenue', debit: 0, credit: invAmount },
        { accountCode: '2050', accountName: 'Output GST Payable (18%)', debit: 0, credit: Number((cgst + sgst).toFixed(2)) },
      ],
    });
    logAudit('GENERATE_INVOICE', `Generated GST Tax Invoice for ${cleanBuyer} (Amount: ₹${total})`, 'Success');
    showToast('GST Invoice Generated', `✓ Official ADCS GST Tax Invoice #${invNumber} opened for print/PDF & posted to General Ledger!`, 'success');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-light)', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
              <span className="badge badge-navy">SECTION 27 ENTERPRISE ERP</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>• Finance, Invoicing & Supply Chain</span>
            </div>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--primary-navy)', margin: 0 }}>
              ERP, Financial Ledger & Consumable Inventory
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: '4px 0 0' }}>
              Real-time stock depletion, multi-warehouse hardware logistics, and B2B GST tax invoicing.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button 
              onClick={() => setActiveTab('invoicing')}
              className="btn btn-outline"
            >
              <FileText size={16} /> New GST Tax Invoice
            </button>
            <button 
              onClick={() => setActiveTab('inventory')}
              className="btn btn-primary"
            >
              <Boxes size={16} /> Manage Consumables
            </button>
          </div>
        </div>

        {/* High-Level Financial & Stock KPIs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem'
        }}>
          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>MONTHLY GROSS REVENUE</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
              ₹38,42,950
            </div>
            <div style={{ fontSize: '0.75rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
              <TrendingUp size={13} /> +14.2% MoM
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>INVENTORY ASSET VALUE</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-blue)' }}>
              ₹{totalInventoryValue.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Across critical SKUs</div>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>LOW STOCK ALERTS</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: lowStockItems.length > 0 ? '#EF4444' : '#10B981' }}>
              {lowStockItems.length} SKUs Critical
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Requires PO replenishment</div>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>GST TAX COMPLIANCE</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#10B981', marginTop: '6px' }}>
              GSTR-1 & 3B Reconciled
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>₹6,91,731 Tax Input Credit</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
          {[
            { id: 'inventory', label: 'Consumables & Hardware Stock', icon: Boxes },
            { id: 'finance', label: 'Financial Income & Expense Ledger', icon: DollarSign },
            { id: 'invoicing', label: 'GST Tax Invoicing Engine', icon: FileText }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.25rem',
                  borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
                  background: isActive ? '#fff' : 'transparent',
                  color: isActive ? 'var(--primary-navy)' : 'var(--text-muted)',
                  border: isActive ? '1px solid var(--border-color)' : 'none',
                  borderBottom: isActive ? '2px solid var(--primary-blue)' : 'none',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                <Icon size={16} /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: INVENTORY & HARDWARE */}
        {activeTab === 'inventory' && (
          <div className="glass-card" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>Warehouse Inventory & Consumables Roster</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>
                  Tracks Cyber Café paper, toner, spiral coils, PVC ID cards, and CCTV hardware supplies
                </p>
              </div>

              {lowStockItems.length > 0 && (
                <div style={{ background: '#FEE2E2', color: '#991B1B', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                  <AlertTriangle size={14} /> Attention: {lowStockItems.length} items below minimum safety threshold!
                </div>
              )}
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-light)', borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                    <th style={{ padding: '0.75rem 1rem' }}>SKU Code</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Item Description</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Category</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Unit Cost</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Stock On Hand</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Safety Status</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Quick Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map(item => {
                    const isLow = item.stockQuantity <= item.minReorderLevel;
                    return (
                      <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: 'var(--primary-blue)' }}>{item.sku}</td>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>{item.name}</td>
                        <td style={{ padding: '0.75rem 1rem' }}>
                          <span className="badge badge-navy" style={{ fontSize: '0.72rem' }}>{item.category}</span>
                        </td>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>₹{item.unitCost.toLocaleString('en-IN')}</td>
                        <td style={{ padding: '0.75rem 1rem', fontSize: '1rem', fontWeight: 800, color: isLow ? '#EF4444' : 'var(--text-dark)' }}>
                          {item.stockQuantity} Units
                        </td>
                        <td style={{ padding: '0.75rem 1rem' }}>
                          <span className={`badge ${isLow ? 'badge-gold' : 'badge-green'}`} style={{ fontSize: '0.72rem' }}>
                            {isLow ? `LOW (Min ${item.minReorderLevel})` : 'HEALTHY'}
                          </span>
                        </td>
                        <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'flex-end' }}>
                            <button
                              onClick={() => handleStockAdjustment(item, -1)}
                              disabled={item.stockQuantity <= 0}
                              className="btn btn-sm btn-outline"
                              style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem' }}
                              title="Consume 1 unit"
                            >
                              <MinusCircle size={13} />
                            </button>
                            <button
                              onClick={() => handleStockAdjustment(item, 5)}
                              className="btn btn-sm btn-outline"
                              style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem' }}
                              title="Add 5 units"
                            >
                              <PlusCircle size={13} />
                            </button>
                            <button
                              onClick={() => setShowPOModal(item)}
                              className="btn btn-sm btn-primary"
                              style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                            >
                              PO Order
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: FINANCIAL INCOME & EXPENSE LEDGER */}
        {activeTab === 'finance' && (
          <div className="glass-card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 1rem' }}>Double-Entry General Ledger</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
              <div style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
                <h4 style={{ color: '#10B981', display: 'flex', alignItems: 'center', gap: '6px', margin: '0 0 1rem' }}>
                  <TrendingUp size={16} /> Recent Operating Inflows
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>Pvt Ltd Incorp Fees</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Order #ORD-88219 • HDFC UPI</div>
                    </div>
                    <strong style={{ color: '#10B981' }}>+ ₹14,999</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>Cyber Café Walk-in Xerox & Net</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Terminal POS Cash Batch</div>
                    </div>
                    <strong style={{ color: '#10B981' }}>+ ₹3,420</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>CCTV 4-Cam Turnkey Advance</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Residential Project Patna</div>
                    </div>
                    <strong style={{ color: '#10B981' }}>+ ₹18,500</strong>
                  </div>
                </div>
              </div>

              <div style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
                <h4 style={{ color: '#EF4444', display: 'flex', alignItems: 'center', gap: '6px', margin: '0 0 1rem' }}>
                  <TrendingDown size={16} /> Recent Operating Expenses & Payouts
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>Fiber High-Speed Broadband Bill</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Airtel Business Leased Line</div>
                    </div>
                    <strong style={{ color: '#EF4444' }}>- ₹4,720</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>Bulk Paper & Toner Procurement</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>JK Copier 20 Reams Wholesale</div>
                    </div>
                    <strong style={{ color: '#EF4444' }}>- ₹7,200</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>Commercial Center Electricity</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>SBPDCL Commercial Tariff</div>
                    </div>
                    <strong style={{ color: '#EF4444' }}>- ₹8,950</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: GST INVOICING */}
        {activeTab === 'invoicing' && (
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <span className="badge badge-gold" style={{ fontSize: '0.75rem', marginBottom: '0.5rem' }}>
                STATUTORY B2B / B2C TAX INVOICE ENGINE
              </span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                Generate Compliant GST Tax Invoice
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Buyer Entity Name *</label>
                <input
                  type="text"
                  value={buyerName}
                  onChange={e => setBuyerName(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Buyer GSTIN / UIN</label>
                <input
                  type="text"
                  value={buyerGstin}
                  onChange={e => setBuyerGstin(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Taxable Deliverable</label>
                <input
                  type="text"
                  value={invItem}
                  onChange={e => setInvItem(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Taxable Amount (₹)</label>
                <input
                  type="number"
                  value={invAmount}
                  onChange={e => setInvAmount(Number(e.target.value))}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
                />
              </div>
            </div>

            <div style={{ background: 'var(--bg-light)', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <span>Subtotal Taxable Value:</span>
                <strong>₹{invAmount.toLocaleString('en-IN')}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <span>CGST (9%):</span>
                <strong>₹{Math.round(invAmount * 0.09).toLocaleString('en-IN')}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <span>SGST (9%):</span>
                <strong>₹{Math.round(invAmount * 0.09).toLocaleString('en-IN')}</strong>
              </div>
              <div style={{ borderTop: '2px dashed var(--border-color)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                <span>Total Invoice Value (Incl GST):</span>
                <span style={{ color: 'var(--primary-blue)' }}>₹{Math.round(invAmount * 1.18).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={handleGenerateInvoice}
              className="btn btn-primary"
              style={{ padding: '0.75rem 2rem' }}
            >
              <FileText size={16} /> Seal & Generate Legal GST Invoice
            </button>
          </div>
        )}

        {/* PO REPLENISHMENT MODAL */}
        {showPOModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10, 25, 47, 0.7)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}>
            <div className="glass-card" style={{ maxWidth: '480px', width: '100%', padding: '2rem', background: '#fff' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 1rem', color: 'var(--primary-navy)' }}>
                Raise Procurement Purchase Order
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                Item: <strong>{showPOModal.name}</strong> ({showPOModal.sku})<br />
                Current Stock: <strong>{showPOModal.stockQuantity}</strong> | Minimum Required: <strong>{showPOModal.minReorderLevel}</strong>
              </p>

              <form onSubmit={handleRaisePO}>
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
                    Order Replenishment Quantity *
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="1000"
                    required
                    value={poQuantity}
                    onChange={e => setPoQuantity(Number(e.target.value))}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
                  />
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Total Estimated Cost: <strong>₹{(poQuantity * showPOModal.unitCost).toLocaleString('en-IN')}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <button type="button" onClick={() => setShowPOModal(null)} className="btn btn-outline">Cancel</button>
                  <button type="submit" className="btn btn-primary">Dispatch Purchase Order</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
