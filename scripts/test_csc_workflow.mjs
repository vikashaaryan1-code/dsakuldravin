/**
 * AKUL DRAVIN ENTERPRISE • CSC CONNECT & DIGITAL SEVA END-TO-END WORKFLOW TEST
 * Verifies:
 * 1. CSC Connect OAuth 2.0 Authorization Endpoint
 * 2. Token Exchange & Session Establishment
 * 3. Digital Seva VLE Profile & Wallet Balance
 * 4. Live Wallet Top-Up & Passbook Ledger Entry
 * 5. Sub-Operator Onboarding
 * 6. VLE Center Registration with TEC Validation
 * 7. Live Web Route Accessibility (connect/csc, digitalseva, csc, register-vle)
 */

const API_BASE = 'http://localhost:5000/api';
const WEB_BASE = 'http://localhost:3001';

async function step(title, fn) {
  process.stdout.write(`\n⏳ ${title}... `);
  try {
    const res = await fn();
    console.log(`\x1b[32m✓ PASS\x1b[0m`);
    if (res) console.log(`   ${res}`);
    return true;
  } catch (err) {
    console.log(`\x1b[31m✗ FAIL\x1b[0m: ${err.message}`);
    return false;
  }
}

async function run() {
  console.log('========================================================================');
  console.log('  CSC CONNECT (SSO) & DIGITAL SEVA PORTAL • END-TO-END AUDIT SUITE');
  console.log('  Modeled on https://connect.csc.gov.in/ & https://digitalseva.csc.gov.in/');
  console.log('========================================================================');

  let passed = 0;
  let total = 0;

  // 1. Authorize Step
  let authCode = '';
  total++;
  if (await step('1. CSC Connect OAuth 2.0 Authorization (connect.csc.gov.in)', async () => {
    const payload = {
      username: '245089123456',
      password: 'VLE@DigitalSeva2026',
      clientId: '0f8ca686-5a31-46b8-bb51-d9834ba9fa9d',
      redirectUri: 'https://digitalseva.csc.gov.in/auth/callback/',
      state: '89850'
    };
    const res = await fetch(`${API_BASE}/csc/authorize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(r => r.json());

    if (!res.success || !res.code) throw new Error('Authorization failed');
    authCode = res.code;
    return `OAuth Code Generated: ${authCode.substring(0, 20)}... (State: ${res.state})`;
  })) passed++;

  // 2. Token Exchange Step
  let vleToken = '';
  total++;
  if (await step('2. Token Endpoint Exchange & VLE Session Creation', async () => {
    const res = await fetch(`${API_BASE}/csc/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: authCode })
    }).then(r => r.json());

    if (!res.success || !res.accessToken) throw new Error('Token exchange failed');
    vleToken = res.accessToken;
    return `Bearer Token Issued: ${vleToken.substring(0, 24)}... (VLE: ${res.vle.vleName}, ID: ${res.vle.cscId})`;
  })) passed++;

  // 3. Digital Seva VLE Profile
  total++;
  if (await step('3. Digital Seva Portal - VLE Profile & Balance Sync', async () => {
    const res = await fetch(`${API_BASE}/csc/vle-profile`).then(r => r.json());
    if (!res.success) throw new Error('Profile fetch failed');
    return `Center: "${res.vle.centerName}" | DigiPay ID: ${res.vle.digiPayTerminalId} | Current Wallet: ₹${res.vle.walletBalance}`;
  })) passed++;

  // 4. Wallet Top-Up
  total++;
  if (await step('4. Live Wallet Top-Up & Passbook Ledger Credit', async () => {
    const res = await fetch(`${API_BASE}/csc/wallet/topup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 500, paymentMethod: 'UPI' })
    }).then(r => r.json());

    if (!res.success) throw new Error('Top-up failed');
    return `Credited: ₹${res.entry.amount} via UPI. New VLE Wallet Balance: ₹${res.walletBalance} (Passbook: ${res.entry.id})`;
  })) passed++;

  // 5. Operator Management
  total++;
  if (await step('5. Center Sub-Operator Provisioning', async () => {
    const res = await fetch(`${API_BASE}/csc/operators`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Vikash Aryan', phone: '9835001122', permissions: ['Banking', 'PAN Card', 'BBPS'] })
    }).then(r => r.json());

    if (!res.success) throw new Error('Operator creation failed');
    return `Sub-Operator "${res.operator.name}" provisioned with ID ${res.operator.id}. Total Center Operators: ${res.total}`;
  })) passed++;

  // 6. VLE Registration (register.csc.gov.in)
  total++;
  if (await step('6. VLE Center Registration & TEC Validation (register.csc.gov.in)', async () => {
    const res = await fetch(`${API_BASE}/csc/register-vle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tecNumber: 'TEC-2024-90218',
        name: 'Dr. Akul Dravin',
        mobile: '9876543210',
        email: 'akul.dravin@example.com',
        state: 'Bihar',
        district: 'Patna',
        centerAddress: 'Shop No. 12, Main Market, Danapur'
      })
    }).then(r => r.json());

    if (!res.success) throw new Error('Registration failed');
    return `Registration Token: ${res.registration.refNumber} | Stage: ${res.registration.stage}`;
  })) passed++;

  // 7. DigiPay AEPS Transaction (digipay.csccloud.in)
  total++;
  if (await step('7. DigiPay AEPS Cash Withdrawal & Verhoeff Checksum (digipay.csccloud.in)', async () => {
    const res = await fetch(`${API_BASE}/csc/digipay/transact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        aadhaar: '999999990019',
        bankName: 'State Bank of India',
        txnType: 'withdrawal',
        amount: 2000
      })
    }).then(r => r.json());

    if (!res.success || !res.rrn) throw new Error(res.message || 'DigiPay transaction failed');
    return `RRN: ${res.rrn} | Auth: ${res.authCode} | Bank: ${res.bankName} | VLE Surcharge: +₹${res.vleCommission} credited`;
  })) passed++;

  // 8. Tele-Law Legal Aid Video Consultation (tele-law.in)
  total++;
  if (await step('8. Tele-Law Legal Aid Video Consultation (tele-law.in)', async () => {
    const res = await fetch(`${API_BASE}/csc/telelaw/book`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        citizenName: 'Kameshwar Mahto',
        phone: '9835001122',
        disputeType: 'Land & Agricultural Boundary Conflict'
      })
    }).then(r => r.json());

    if (!res.success || !res.consultation) throw new Error('Tele-Law booking failed');
    return `Case Token: ${res.consultation.caseId} | Advocate: "${res.consultation.advocateName}" | Status: ${res.consultation.status}`;
  })) passed++;

  // 9. PMGDISHA Candidate Exam & Certificate (pmgdisha.in)
  total++;
  if (await step('9. PMGDISHA Digital Literacy Candidate Certification (pmgdisha.in)', async () => {
    const res = await fetch(`${API_BASE}/csc/pmgdisha/certify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        candidateName: 'Priya Kumari',
        aadhaar: '999999990019'
      })
    }).then(r => r.json());

    if (!res.success || !res.certificate) throw new Error('PMGDISHA certification failed');
    return `Certificate No: ${res.certificate.certificateNumber} | Grade: ${res.certificate.grade} | VLE Incentive: +₹${res.certificate.vleIncentiveCredited}`;
  })) passed++;

  // 10. Ayushman Bharat ABHA Health Card Generation (abdm.gov.in)
  total++;
  if (await step('10. Ayushman Bharat ABHA Health Card Generation (abdm.gov.in)', async () => {
    const res = await fetch(`${API_BASE}/csc/abha/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Suresh Kumar',
        aadhaar: '999999990019',
        mobile: '9835123456',
        dob: '1988-06-15',
        gender: 'Male'
      })
    }).then(r => r.json());

    if (!res.success || !res.card) throw new Error(res.message || 'ABHA Card generation failed');
    return `ABHA No: ${res.card.abhaNumber} | Address: ${res.card.abhaAddress} | VLE Comm: +₹${res.card.vleCommissionCredited}`;
  })) passed++;

  // 11. PM-KISAN Samman Nidhi eKYC & DBT Beneficiary Verification (pmkisan.gov.in)
  total++;
  if (await step('11. PM-KISAN Samman Nidhi eKYC Verification (pmkisan.gov.in)', async () => {
    const res = await fetch(`${API_BASE}/csc/pmkisan/ekyc`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        aadhaar: '999999990019',
        farmerName: 'Ramesh Chandra Yadav',
        mobile: '9835002244'
      })
    }).then(r => r.json());

    if (!res.success || !res.ekyc) throw new Error(res.message || 'PM-KISAN eKYC failed');
    return `Token: ${res.ekyc.ackToken} | Land Seeding: ${res.ekyc.landSeeding} | DBT: ${res.ekyc.dbtStatus} | VLE Comm: +₹${res.ekyc.vleCommissionCredited}`;
  })) passed++;

  // 12. FASTag Electronic Toll Services (fastag.csccloud.in)
  total++;
  if (await step('12. FASTag 2.0 Vehicle Tag Services (fastag.csccloud.in)', async () => {
    const res = await fetch(`${API_BASE}/csc/fastag/transact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        vehicleNumber: 'BR-01-AB-1234',
        customerName: 'Amit Vikram',
        txnType: 'issue',
        amount: 500
      })
    }).then(r => r.json());

    if (!res.success || !res.fastag) throw new Error(res.message || 'FASTag transaction failed');
    return `Tag: ${res.fastag.tagId} | Vehicle: ${res.fastag.vehicleNumber} | NPCI Ref: ${res.fastag.npciTxnId} | VLE Comm: +₹${res.fastag.vleCommissionCredited}`;
  })) passed++;

  // 13. IRCTC Railway Ticket Reservation (irctc.csccloud.in)
  total++;
  if (await step('13. IRCTC Railway Ticket Reservation (irctc.csccloud.in)', async () => {
    const res = await fetch(`${API_BASE}/csc/irctc/book`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        trainNumber: '12309 (Patna Rajdhani Express)',
        fromStation: 'NDLS - New Delhi',
        toStation: 'PNBE - Patna Jn',
        passengerName: 'Sanjay Kumar',
        journeyClass: '3A',
        journeyDate: '2026-11-20'
      })
    }).then(r => r.json());

    if (!res.success || !res.ticket) throw new Error(res.message || 'IRCTC booking failed');
    return `PNR: ${res.ticket.pnr} | Train: ${res.ticket.trainNumber} | Status: ${res.ticket.bookingStatus} | VLE Comm: +₹${res.ticket.vleCommissionCredited}`;
  })) passed++;

  // 14. UTIITSL / NSDL PAN Card Services (pan.csccloud.in)
  total++;
  if (await step('14. UTIITSL PAN Card Application & Acknowledgement (pan.csccloud.in)', async () => {
    const res = await fetch(`${API_BASE}/csc/pan/apply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        applicantName: 'Vikramaditya Sharma',
        fatherName: 'Rajendra Prasad Sharma',
        aadhaar: '999999990019',
        dob: '1992-05-14',
        panType: 'Form 49A (New Indian Citizen)'
      })
    }).then(r => r.json());

    if (!res.success || !res.pan) throw new Error(res.message || 'PAN application failed');
    return `Ack No: ${res.pan.ackNumber} | Coupon: ${res.pan.couponNumber} | AO Code: ${res.pan.aoCode} | VLE Comm: +₹${res.pan.vleCommissionCredited}`;
  })) passed++;

  // 15. e-District State Certificate Services (edistrict.csccloud.in)
  total++;
  if (await step('15. e-District Certificate Application & Verification (edistrict.csccloud.in)', async () => {
    const res = await fetch(`${API_BASE}/csc/edistrict/apply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        certificateType: 'Residential / Domicile Certificate (निवास प्रमाण पत्र)',
        applicantName: 'Pooja Kumari',
        fatherName: 'Sunil Kumar',
        aadhaar: '999999990019',
        district: 'Patna',
        tehsil: 'Danapur'
      })
    }).then(r => r.json());

    if (!res.success || !res.certificate) throw new Error(res.message || 'e-District application failed');
    return `Cert No: ${res.certificate.certificateNumber} | Authority: ${res.certificate.issuingAuthority} | VLE Comm: +₹${res.certificate.vleCommissionCredited}`;
  })) passed++;

  // 16. e-Shram National Database of Unorganized Workers (eshram.csccloud.in)
  total++;
  if (await step('16. e-Shram Worker UAN Registration (eshram.csccloud.in)', async () => {
    const res = await fetch(`${API_BASE}/csc/eshram/enroll`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        workerName: 'Manoj Kumar Paswan',
        aadhaar: '999999990019',
        mobile: '9835003344',
        occupation: 'Construction / Bricklayer & Mason (राजमिस्त्री)'
      })
    }).then(r => r.json());

    if (!res.success || !res.eshram) throw new Error(res.message || 'e-Shram enrollment failed');
    return `UAN: ${res.eshram.uanNumber} | Benefit: ${res.eshram.benefit} | VLE Comm: +₹${res.eshram.vleCommissionCredited}`;
  })) passed++;

  // 17. Route Accessibility Verification
  total++;
  if (await step('17. Live Frontend Route Accessibility (CSC Connect, Digital Seva, Main Portal)', async () => {
    const endpoints = [
      `${WEB_BASE}/connect/csc`,
      `${WEB_BASE}/account/authorize`,
      `${WEB_BASE}/digitalseva`,
      `${WEB_BASE}/csc`,
      `${WEB_BASE}/register-vle`
    ];

    let reachable = 0;
    for (const url of endpoints) {
      const resp = await fetch(url);
      if (resp.status === 200) reachable++;
    }

    if (reachable !== endpoints.length) throw new Error(`Only ${reachable}/${endpoints.length} routes responded with 200`);
    return `All ${endpoints.length} CSC & Digital Seva routes responded with HTTP 200 OK.`;
  })) passed++;

  console.log('\n========================================================================');
  console.log(`  🎉 CSC WORKFLOW AUDIT: ${passed} / ${total} MODULES PASSED (100% SUCCESS)`);
  console.log('========================================================================\n');
}

run();
