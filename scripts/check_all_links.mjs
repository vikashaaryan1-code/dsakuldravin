import fs from 'fs';

const appText = fs.readFileSync('src/App.tsx', 'utf8');
const routeMatches = [...appText.matchAll(/path=["']([^"']+)["']/g)].map(m => m[1]);
const validRoutes = new Set(routeMatches);
console.log('Registered Routes in App.tsx count:', validRoutes.size);

const filesToCheck = [
  'src/pages/HomePage.tsx',
  'src/components/common/GlassNavbar.tsx',
  'src/components/common/Footer.tsx'
];

for (const file of filesToCheck) {
  const content = fs.readFileSync(file, 'utf8');
  // Match to="/path" or href="/path" or navigate('/path')
  const toLinks = [...content.matchAll(/to=["']([^"'#?]+)["']/g)].map(m => m[1]);
  const hrefLinks = [...content.matchAll(/href=["']([^"'#?]+)["']/g)].map(m => m[1]);
  const navLinks = [...content.matchAll(/navigate\(["']([^"'#?]+)["']/g)].map(m => m[1]);
  const allLinks = [...toLinks, ...hrefLinks, ...navLinks];
  const internalLinks = allLinks.filter(l => l.startsWith('/') && !l.startsWith('//') && !l.endsWith('.pdf'));
  
  const invalid = internalLinks.filter(l => {
    if (validRoutes.has(l)) return false;
    // Check wildcard routes e.g. /verify-certificate/:certId
    for (const vr of validRoutes) {
      if (vr.includes(':')) {
        const prefix = vr.split(':')[0];
        if (l.startsWith(prefix)) return false;
      }
    }
    return true;
  });
  console.log(file, 'Internal links:', internalLinks.length, 'Unmatched:', [...new Set(invalid)]);
}
