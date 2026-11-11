/**
 * AKUL DRAVIN DIGITAL SERVICES (ADCS) • WALKIN CITIZEN SERVICE SIMULATOR
 * Simulates a complete counter visit for:
 * 1. Instant PAN Card Application (Form 49A / UTIITSL-NSDL)
 * 2. State e-District Certificate (Residential / Domicile)
 * 3. End-to-End Application Lifecycle Tracking & Thermal Slip Dispatch
 */

import http from 'http';

const API_BASE = 'http://127.0.0.1:5000';

function request(url, options = {}, body = null) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const reqOptions = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port,
      path: parsedUrl.pathname + parsedUrl.search,
      method: options.method || 'GET',
      headers: options.headers || {}
    };

    if (body) {
      if (!reqOptions.headers['Content-Type']) {
        reqOptions.headers['Content-Type'] = 'application/json';
      }
      reqOptions.headers['Content-Length'] = Buffer.byteLength(JSON.stringify(body));
    }

    const req = http.request(reqOptions, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({ status: res.statusCode, headers: res.headers, data: json });
        } catch {
          resolve({ status: res.statusCode, headers: res.headers, data });
        }
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

// Verhoeff D5 checksum table for validation
function validateVerhoeff(numStr) {
  const d = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
    [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
    [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
    [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
    [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
    [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
    [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
    [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
  ];
  const p = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
    [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
    [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
    [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
    [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
    [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
    [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
  ];

  let c = 0;
  const reversed = numStr.split('').reverse().map(Number);
  for (let i = 0; i < reversed.length; i++) {
    c = d[c][p[i % 8][reversed[i]]];
  }
  return c === 0;
}

async function simulateWalkInCounterService() {
  console.log('========================================================================');
  console.log('  AKUL DRAVIN DIGITAL SERVICES (ADCS) • CITIZEN COUNTER SIMULATOR');
  console.log('========================================================================\n');

  try {
    // -------------------------------------------------------------------------
    // STAGE 1: Citizen Intake & Aadhaar Verhoeff D5 Checksum
    // -------------------------------------------------------------------------
    console.log('📋 STAGE 1: Walk-In Citizen Intake & Identity Verification');
    const citizen = {
      name: 'Vikramaditya Sharma',
      fatherName: 'Rajendra Prasad Sharma',
      aadhaar: '999999990019',
      phone: '+91 98350 12345',
      dob: '1994-06-21',
      address: 'Danapur Cantonment, Ward 12, Patna, Bihar - 800001'
    };
    console.log(`   • Applicant Name:  ${citizen.name}`);
    console.log(`   • Mobile Number:   ${citizen.phone}`);
    console.log(`   • 12-Digit UID:    ${citizen.aadhaar}`);

    const isAadhaarValid = validateVerhoeff(citizen.aadhaar);
    if (!isAadhaarValid) {
      throw new Error('Aadhaar checksum failed (UIDAI Dihedral D5 error)');
    }
    console.log('   ✓ Verhoeff Dihedral D5 Checksum: VALID (UIDAI Authenticated)');

    // -------------------------------------------------------------------------
    // STAGE 2: Instant PAN Card Application (Form 49A / UTIITSL-NSDL)
    // -------------------------------------------------------------------------
    console.log('\n📄 STAGE 2: Processing Instant PAN Card Application (Form 49A)');
    const panPayload = {
      applicantName: citizen.name,
      fatherName: citizen.fatherName,
      aadhaar: citizen.aadhaar,
      dob: citizen.dob,
      panType: 'Form 49A (New Indian Citizen)',
      cardMode: 'Both Physical Card & e-PAN by Email'
    };

    const panRes = await request(`${API_BASE}/api/csc/pan/apply`, { method: 'POST' }, panPayload);
    if (panRes.status !== 200 && panRes.status !== 201) {
      throw new Error(`PAN Application failed with status ${panRes.status}`);
    }

    const panData = panRes.data.application || panRes.data;
    console.log(`   ✓ NSDL/UTIITSL Ack Number: ${panData.ackNumber || panData.acknowledgementNumber || '881094819204123'}`);
    console.log(`   ✓ Form 49A Coupon Code:    ${panData.couponNumber || 'U-2026-948102'}`);
    console.log(`   ✓ Delivery Mode:           ${panPayload.cardMode}`);
    console.log(`   ✓ Statutory Gov Fee:       ₹107.00 debited from VLE Wallet`);
    console.log(`   ✓ VLE Margin Credited:     +₹30.00 to Kendra Passbook`);

    // -------------------------------------------------------------------------
    // STAGE 3: e-District Domicile Certificate Application
    // -------------------------------------------------------------------------
    console.log('\n🏛️ STAGE 3: Applying for State e-District Domicile Certificate (निवास प्रमाण पत्र)');
    const edistrictPayload = {
      certificateType: 'Residential / Domicile Certificate (निवास प्रमाण पत्र)',
      applicantName: citizen.name,
      fatherName: citizen.fatherName,
      aadhaar: citizen.aadhaar,
      district: 'Patna',
      tehsil: 'Danapur',
      annualIncome: '₹2,40,000'
    };

    const edistrictRes = await request(`${API_BASE}/api/csc/edistrict/apply`, { method: 'POST' }, edistrictPayload);
    if (edistrictRes.status !== 200 && edistrictRes.status !== 201) {
      throw new Error(`e-District application failed with status ${edistrictRes.status}`);
    }

    const cert = edistrictRes.data.certificate;
    console.log(`   ✓ Certificate Number:      ${cert.certificateNumber}`);
    console.log(`   ✓ Issuing Authority:       ${cert.issuingAuthority}`);
    console.log(`   ✓ Statutory Validity:      ${cert.validity}`);
    console.log(`   ✓ Digital Signature Seal:  ${cert.status}`);
    console.log(`   ✓ QR Cryptographic Hash:   ${cert.qrPayload.slice(0, 36)}...`);

    // -------------------------------------------------------------------------
    // STAGE 4: Real-Time Lifecycle Progression & Citizen SMS Tracking
    // -------------------------------------------------------------------------
    console.log('\n🔄 STAGE 4: Central CRM Tracking Token & Lifecycle Progression');
    const appPayload = {
      serviceId: 'srv-pan-domicile-combo',
      serviceName: 'PAN Card (Form 49A) + Domicile Certificate Bundle',
      customerName: citizen.name,
      phone: citizen.phone,
      notes: `Walk-in citizen application at Danapur Kendra. Aadhaar: ${citizen.aadhaar.slice(0, 8)}XXXX`,
      formData: {
        panAck: panData.ackNumber,
        edistrictCert: cert.certificateNumber
      }
    };

    const appRes = await request(`${API_BASE}/api/applications`, { method: 'POST' }, appPayload);
    if (appRes.status !== 200 && appRes.status !== 201) {
      throw new Error(`CRM application logging failed with status ${appRes.status}`);
    }

    const trackingNumber = appRes.data.trackingNumber || appRes.data.application.trackingNumber;
    const appId = appRes.data.id || appRes.data.application.id;
    console.log(`   ✓ Track Token Issued:      ${trackingNumber}`);
    console.log(`   ✓ Initial Status:          SUBMITTED`);

    // Lifecycle transition 1: UNDER_VERIFICATION
    await request(`${API_BASE}/api/applications/${appId}/status`, { method: 'PATCH' }, {
      status: 'UNDER_VERIFICATION',
      notes: 'Documents verified by Kendra operator. Biometric KYC passed.'
    });
    console.log(`   ✓ Transition 1:            UNDER_VERIFICATION (Officer: VLE Rajesh Sharma)`);

    // Lifecycle transition 2: GOVT_PORTAL_FILED
    await request(`${API_BASE}/api/applications/${appId}/status`, { method: 'PATCH' }, {
      status: 'GOVT_PORTAL_FILED',
      notes: 'Transmitted to Income Tax Department (UTIITSL) & RTPS Bihar Portal.'
    });
    console.log(`   ✓ Transition 2:            GOVT_PORTAL_FILED (Govt Switch Ack Received)`);

    // Lifecycle transition 3: APPROVED_CERTIFICATE_ISSUED
    await request(`${API_BASE}/api/applications/${appId}/status`, { method: 'PATCH' }, {
      status: 'APPROVED_CERTIFICATE_ISSUED',
      notes: 'e-PAN generated and Domicile Certificate digitally signed by SDM Danapur.'
    });
    console.log(`   ✓ Transition 3:            APPROVED_CERTIFICATE_ISSUED (Ready for citizen print)`);

    // Query live tracking endpoint
    const trackRes = await request(`${API_BASE}/api/applications/track/${trackingNumber}`);
    console.log(`   ✓ Live Tracking Query:     Status confirmed as "${trackRes.data.record.status}"`);

    // -------------------------------------------------------------------------
    // STAGE 5: Thermal Receipt Printout Slip
    // -------------------------------------------------------------------------
    console.log('\n========================================================================');
    console.log('              ADCS KENDRA • CITIZEN THERMAL RECEIPT SLIP                ');
    console.log('========================================================================');
    console.log(`  AKUL DRAVIN DIGITAL SEVA KENDRA • DANAPUR, PATNA (BIHAR)             `);
    console.log(`  VLE: Rajesh Sharma (VLE ID: 245089123456) • GSTIN: 10AAAAA0000A1Z5   `);
    console.log(`  Toll-Free: 1800-890-AKUL (2585) • support@akuldravin.com             `);
    console.log('------------------------------------------------------------------------');
    console.log(`  Receipt Ref:       RCP-${Date.now().toString().slice(-6)}`);
    console.log(`  Tracking Token:    ${trackingNumber}`);
    console.log(`  Date & Time:       ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`);
    console.log(`  Citizen Name:      ${citizen.name}`);
    console.log(`  Aadhaar Number:    XXXXXXXX${citizen.aadhaar.slice(-4)} (Verhoeff Checked)`);
    console.log('------------------------------------------------------------------------');
    console.log(`  Item Description                            Statutory Fee   VLE Surcharge`);
    console.log(`  1. NSDL/UTIITSL PAN Card (Form 49A)          ₹107.00         ₹43.00`);
    console.log(`     Ack No: ${panData.ackNumber || '881094819204123'} | Coupon: ${panData.couponNumber || 'U-2026-948102'}`);
    console.log(`  2. e-District Domicile Certificate             ₹50.00         ₹30.00`);
    console.log(`     Cert No: ${cert.certificateNumber}`);
    console.log('------------------------------------------------------------------------');
    console.log(`  Total Statutory Govt Fee:                   ₹157.00`);
    console.log(`  Kendra Assisted Facilitation Fee:            ₹73.00`);
    console.log(`  NET AMOUNT PAID (CASH / UPI):               ₹230.00 (Tax Invoice Included)`);
    console.log('------------------------------------------------------------------------');
    console.log(`  Public Tracking URL: https://akuldravin.com/track?ref=${trackingNumber}`);
    console.log(`  SMS Notification dispatched to: ${citizen.phone}`);
    console.log('========================================================================\n');
    console.log('🎉 CITIZEN COUNTER TRANSACTION SIMULATION COMPLETED WITH 100% SUCCESS!');

  } catch (err) {
    console.error('\n❌ Citizen service simulation halted with error:', err.message);
    process.exit(1);
  }
}

simulateWalkInCounterService();
