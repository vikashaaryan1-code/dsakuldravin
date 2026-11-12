/**
 * ADCS Document Hash & Print/PDF Export Helpers
 * Guarantees deterministic document hashes and A4 print-ready output.
 */

export async function computeDocumentHash(payload: Record<string, unknown> | string): Promise<string> {
  const serialized = typeof payload === 'string' ? payload : JSON.stringify(payload);
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const encoded = new TextEncoder().encode(serialized);
    const digest = await crypto.subtle.digest('SHA-256', encoded);
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase();
  }
  // Fallback deterministic 64-hex hash if subtle crypto unavailable
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < serialized.length; i += 1) {
    const ch = serialized.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  const partA = (h1 >>> 0).toString(16).padStart(8, '0');
  const partB = (h2 >>> 0).toString(16).padStart(8, '0');
  return `${partA}${partB}${partA}${partB}${partA}${partB}${partA}${partB}`.toUpperCase();
}

export interface PrintableSlipOptions {
  title: string;
  documentType: string;
  documentNumber: string;
  issuedDate?: string;
  orientation?: 'portrait' | 'landscape';
  rows: Array<{ label: string; value: string }>;
  amountSummary?: {
    subtotal?: number;
    tax?: number;
    total: number;
    currency?: string;
    paymentStatus?: string;
  };
  notes?: string[];
  disclaimer?: string;
  verificationUrl?: string;
}

/**
 * Opens a clean A4 print-ready ADCS branded window using official logo assets.
 * Can be saved cleanly via browser Print -> Save as PDF.
 */
export function printBrandedADCSDocument(opts: PrintableSlipOptions): boolean {
  if (typeof window === 'undefined') return false;
  const win = window.open('', '_blank', 'width=940,height=780');
  if (!win) {
    window.print();
    return false;
  }

  const origin = window.location.origin;
  const logoSrc = `${origin}/branding/adcs-logo-certificate.png`;
  const issued = opts.issuedDate || new Date().toLocaleString('en-IN');
  const verifyUrl =
    opts.verificationUrl ||
    `${origin}/verify-certificate?doc=${encodeURIComponent(opts.documentNumber)}`;

  const rowsHtml = opts.rows
    .map(
      (r) => `
      <tr>
        <td style="padding:9px 12px;border:1px solid #DCE4EF;font-weight:700;color:#334861;width:36%;background:#F5F8FC;">${escapeHtml(r.label)}</td>
        <td style="padding:9px 12px;border:1px solid #DCE4EF;color:#061A36;font-weight:600;">${escapeHtml(r.value)}</td>
      </tr>`
    )
    .join('');

  const amountHtml = opts.amountSummary
    ? `<div style="margin-top:16px;padding:12px 16px;border:1px solid #DCE4EF;border-left:4px solid #D6A12B;background:#F5F8FC;border-radius:6px;display:flex;justify-content:space-between;align-items:center;">
        <div>
          <div style="font-size:11px;font-weight:800;color:#55677D;text-transform:uppercase;">Payment / Financial Summary</div>
          ${opts.amountSummary.paymentStatus ? `<div style="font-size:12px;font-weight:700;color:#047857;margin-top:2px;">Status: ${escapeHtml(opts.amountSummary.paymentStatus)}</div>` : ''}
        </div>
        <div style="text-align:right;">
          ${typeof opts.amountSummary.subtotal === 'number' ? `<div style="font-size:12px;color:#334861;">Base: ₹${opts.amountSummary.subtotal.toLocaleString('en-IN')}</div>` : ''}
          ${typeof opts.amountSummary.tax === 'number' ? `<div style="font-size:12px;color:#334861;">GST / Fee: ₹${opts.amountSummary.tax.toLocaleString('en-IN')}</div>` : ''}
          <div style="font-size:18px;font-weight:900;color:#061A36;">Total: ₹${opts.amountSummary.total.toLocaleString('en-IN')}</div>
        </div>
      </div>`
    : '';

  const notesHtml =
    opts.notes && opts.notes.length > 0
      ? `<div style="margin-top:16px;padding:12px 14px;border:1px dashed #C2D0E3;border-radius:6px;font-size:12px;color:#334861;">
          <strong style="color:#061A36;">Notes & Instructions:</strong>
          <ul style="margin:6px 0 0 18px;padding:0;">
            ${opts.notes.map((n) => `<li style="margin-bottom:3px;">${escapeHtml(n)}</li>`).join('')}
          </ul>
        </div>`
      : '';

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(opts.title)} — ${escapeHtml(opts.documentNumber)}</title>
  <style>
    @page { size: A4 ${opts.orientation || 'portrait'}; margin: 14mm; }
    body { font-family: 'Plus Jakarta Sans', 'Segoe UI', Arial, sans-serif; color: #061A36; background: #FFFFFF; margin: 0; padding: 24px; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .sheet { max-width: 820px; margin: 0 auto; border: 2px solid #061A36; outline: 2px solid #D6A12B; outline-offset: -8px; padding: 26px; }
    .hdr { display:flex; justify-content:space-between; align-items:center; border-bottom:3px solid #061A36; padding-bottom:14px; margin-bottom:18px; }
    .badge { display:inline-block; padding:4px 10px; background:#061A36; color:#F3D477; font-weight:800; font-size:11px; letter-spacing:0.06em; border-radius:4px; }
    @media print { .no-print { display:none !important; } body { padding: 0; } }
  </style>
</head>
<body>
  <div class="no-print" style="max-width:820px;margin:0 auto 12px;display:flex;justify-content:flex-end;gap:8px;">
    <button onclick="window.print()" style="padding:8px 16px;background:#075ACB;color:#fff;border:none;border-radius:6px;font-weight:700;cursor:pointer;">Print / Save as PDF</button>
    <button onclick="window.close()" style="padding:8px 14px;background:#EDF2F9;color:#061A36;border:1px solid #C2D0E3;border-radius:6px;font-weight:700;cursor:pointer;">Close</button>
  </div>
  <div class="sheet">
    <div class="hdr">
      <div style="display:flex;align-items:center;gap:14px;">
        <img src="${logoSrc}" alt="AKUL DRAVIN DIGITAL SERVICES" style="height:68px;width:auto;object-fit:contain;" />
        <div>
          <div style="font-size:10px;font-weight:800;color:#075ACB;letter-spacing:0.08em;">AKUL DRAVIN GROUP OF ENTERPRISES</div>
          <div style="font-size:18px;font-weight:900;color:#061A36;">AKUL DRAVIN DIGITAL SERVICES</div>
          <div style="font-size:11px;font-weight:700;color:#55677D;">HAR KAAM DIGITAL • HAR SAMADHAAN EK JAGAH</div>
        </div>
      </div>
      <div style="text-align:right;">
        <div class="badge">${escapeHtml(opts.documentType)}</div>
        <div style="font-size:13px;font-weight:800;margin-top:6px;font-family:monospace;">${escapeHtml(opts.documentNumber)}</div>
        <div style="font-size:11px;color:#55677D;">Issued: ${escapeHtml(issued)}</div>
      </div>
    </div>

    <h2 style="margin:0 0 12px;font-size:16px;color:#061A36;">${escapeHtml(opts.title)}</h2>
    <table style="width:100%;border-collapse:collapse;font-size:13px;">${rowsHtml}</table>
    ${amountHtml}
    ${notesHtml}

    <div style="margin-top:22px;padding-top:12px;border-top:1px solid #DCE4EF;display:flex;justify-content:space-between;align-items:flex-end;font-size:11px;color:#55677D;">
      <div style="max-width:520px;">
        <div>${escapeHtml(opts.disclaimer || 'Official ADCS digital enterprise document. ADCS does not claim statutory authority over third-party government records.')}</div>
        <div style="margin-top:4px;color:#075ACB;">Verification Ref: ${escapeHtml(verifyUrl)}</div>
      </div>
      <div style="text-align:right;">
        <div style="font-weight:800;color:#061A36;">Authorized ADCS Digital Desk</div>
        <div>contact@akuldravin.com • +91 98765 43210</div>
      </div>
    </div>
  </div>
</body>
</html>`;

  win.document.open();
  win.document.write(html);
  win.document.close();
  return true;
}

function escapeHtml(raw: string): string {
  return String(raw)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
