import { spawn } from 'child_process';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const chrome = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9223',
  '--no-sandbox',
  '--disable-gpu',
  '--window-size=1440,900',
  'http://localhost:3000'
]);

setTimeout(async () => {
  try {
    const res = await fetch('http://localhost:9223/json');
    const tabs = await res.json();
    const pageTab = tabs.find(t => t.url.includes('localhost:3000'));
    
    if (pageTab && pageTab.webSocketDebuggerUrl) {
      const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
      ws.onopen = () => {
        ws.send(JSON.stringify({ id: 1, method: 'Page.enable' }));
        setTimeout(() => {
          ws.send(JSON.stringify({ id: 2, method: 'Page.captureScreenshot', params: { format: 'png' } }));
        }, 2000);
      };

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === 2 && msg.result?.data) {
          const buffer = Buffer.from(msg.result.data, 'base64');
          fs.writeFileSync('scripts/rendered_homepage_screenshot.png', buffer);
          console.log('SCREENSHOT_SAVED: scripts/rendered_homepage_screenshot.png (' + buffer.length + ' bytes)');
          ws.close();
          chrome.kill();
          process.exit(0);
        }
      };
    } else {
      chrome.kill();
      process.exit(1);
    }
  } catch (err) {
    console.error('Screenshot err:', err.message);
    chrome.kill();
    process.exit(1);
  }
}, 2500);
