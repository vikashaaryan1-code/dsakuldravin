const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  content = content.replace(/from '\.\.\/\.\.\/store\/AppContext'/g, "from '../store/AppContext'");
  content = content.replace(/from '\.\.\/\.\.\/components\//g, "from '../components/");
  content = content.replace(/from '\.\.\/\.\.\/data\//g, "from '../data/");

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated imports in: ${file}`);
  }
});
