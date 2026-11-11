/**
 * AKUL DRAVIN DIGITAL SERVICES (ADCS) • 15 PORTALS DUAL-PORT VERIFIER
 * Tests all 15 Role Portals simultaneously across:
 * - Vite Frontend (Port 3000)
 * - Unified Express Gateway (Port 5000)
 */

import http from 'http';

const portals = [
  { role: 'Customer', path: '/portal/customer' },
  { role: 'VLE Kendra', path: '/digitalseva' },
  { role: 'Cyber Café', path: '/portal/cyber-cafe' },
  { role: 'Franchise', path: '/portal/franchise' },
  { role: 'Distributor', path: '/portal/distributor' },
  { role: 'Affiliate', path: '/portal/affiliate' },
  { role: 'Executive', path: '/portal/executive' },
  { role: 'Partner', path: '/portal/partner' },
  { role: 'Super Admin', path: '/portal/admin' },
  { role: 'Advocate', path: '/portal/advocate' },
  { role: 'Instructor', path: '/portal/instructor' },
  { role: 'Student', path: '/portal/student' },
  { role: 'Technician', path: '/portal/technician' },
  { role: 'Finance', path: '/finance-portal' },
  { role: 'Employee', path: '/portal/employee' },
];

function checkUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      resolve(res.statusCode);
    }).on('error', () => {
      resolve(0);
    });
  });
}

async function verifyAllPortals() {
  console.log('========================================================================');
  console.log('  AKUL DRAVIN DIGITAL SERVICES (ADCS) • 15 ROLE PORTALS DUAL-PORT MATRIX');
  console.log('========================================================================\n');

  let passed = 0;

  for (const portal of portals) {
    const status3000 = await checkUrl(`http://127.0.0.1:3000${portal.path}`);
    const status5000 = await checkUrl(`http://127.0.0.1:5000${portal.path}`);

    const isOk3000 = status3000 === 200;
    const isOk5000 = status5000 === 200;

    if (isOk3000 && isOk5000) {
      passed++;
      console.log(`  ✓ [200 OK] ${portal.role.padEnd(14)} (${portal.path.padEnd(20)}) -> Port 3000: OK | Port 5000: OK`);
    } else {
      console.log(`  ❌ [FAIL]   ${portal.role.padEnd(14)} (${portal.path.padEnd(20)}) -> Port 3000: ${status3000} | Port 5000: ${status5000}`);
    }
  }

  console.log('\n========================================================================');
  console.log(`  🎉 FINAL RESULT: ${passed} / ${portals.length} PORTALS PASSED ON BOTH PORTS!`);
  console.log('========================================================================\n');
}

verifyAllPortals();
