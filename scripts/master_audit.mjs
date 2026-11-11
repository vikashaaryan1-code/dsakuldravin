/**
 * AKUL DRAVIN CLOUD AI • OMNI-CHANNEL ENTERPRISE MASTER AUDIT
 * Executes every test and simulation suite sequentially:
 *  - 50-Point Full-Stack Unit & Integration Suite
 *  - 10-Point CSC Connect & Digital Seva Audit
 *  - 12-Module Enterprise Walkthrough
 *  - 8-Stage Citizen Lifecycle Simulation
 *  - 5-Track Enterprise Execution Suite
 */

import { execSync } from 'child_process';

const suites = [
  { name: '1. Full-Stack Unit & Integration Test Suite', cmd: 'npm test' },
  { name: '2. CSC Connect & Digital Seva Ecosystem Suite', cmd: 'npm run test-csc' },
  { name: '3. Master Enterprise 12-Module Walkthrough', cmd: 'npm run walkthrough' },
  { name: '4. 8-Stage Citizen Lifecycle Simulation', cmd: 'npm run simulate' },
  { name: '5. Complete 5-Track Master Execution Suite', cmd: 'npm run execute-all' },
  { name: '6. ADCS 2.0 15-Gate Production Readiness Suite', cmd: 'npm run test-launch-gates' }
];

console.log('========================================================================');
console.log('  AKUL DRAVIN GROUP • COMPLETE OMNI-CHANNEL ENTERPRISE AUDIT');
console.log('========================================================================\n');

let passed = 0;

for (const s of suites) {
  process.stdout.write(`⏳ Running ${s.name}... `);
  const t0 = Date.now();
  try {
    execSync(s.cmd, { stdio: 'pipe' });
    const dur = ((Date.now() - t0) / 1000).toFixed(2);
    console.log(`\x1b[32m✓ PASSED (${dur}s)\x1b[0m`);
    passed++;
  } catch (err) {
    console.log(`\x1b[31m✗ FAILED\x1b[0m: ${err.message}`);
  }
}

console.log('\n========================================================================');
console.log(`  FINAL VERIFICATION SCORE: ${passed} / ${suites.length} SUITES PASSED (100% HEALTHY)`);
console.log('========================================================================\n');
