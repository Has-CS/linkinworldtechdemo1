// Inlines the client's images and the globe land data into one self-contained ../index.html
const fs = require('fs'), path = require('path');
const a = f => path.join(__dirname, 'assets', f);
const uri = (f, type) => `data:${type};base64,` + fs.readFileSync(a(f)).toString('base64');
const html = fs.readFileSync(path.join(__dirname, 'index.src.html'), 'utf8')
  .split('{{HERO}}').join(uri('hero.webp', 'image/webp'))
  .split('{{LOGO}}').join(uri('logo.png', 'image/png'))
  .split('{{PORTRAIT}}').join(uri('portrait.webp', 'image/webp'))
  .split('{{LAND}}').join(fs.readFileSync(a('land.b64'), 'utf8').trim());
fs.writeFileSync(path.join(__dirname, '..', 'index.html'), html);
console.log('index.html', (html.length / 1024 / 1024).toFixed(2) + ' MB');
