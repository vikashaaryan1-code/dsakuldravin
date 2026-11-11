import { spawn } from 'child_process';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const targetUrl = process.argv[2] || 'http://localhost:3000';

const chrome = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9223',
  '--no-sandbox',
  '--disable-gpu',
  '--window-size=1440,900',
  targetUrl
]);

async function connectWithRetry(retries = 10, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      await new Promise(r => setTimeout(r, delay));
      const res = await fetch('http://localhost:9223/json');
      const tabs = await res.json();
      const pageTab = tabs.find(t => t.url.includes('localhost:3000') || t.url.includes(targetUrl));
      if (pageTab && pageTab.webSocketDebuggerUrl) {
        return pageTab.webSocketDebuggerUrl;
      }
    } catch (e) {
      // keep retrying
    }
  }
  throw new Error('Chrome remote debugging endpoint failed to respond');
}

(async () => {
  try {
    const wsUrl = await connectWithRetry();
    const ws = new WebSocket(wsUrl);
    ws.onopen = () => {
      ws.send(JSON.stringify({ id: 1, method: 'Page.enable' }));
      ws.send(JSON.stringify({ id: 2, method: 'Runtime.enable' }));
      
      const checkReady = setInterval(() => {
        ws.send(JSON.stringify({
          id: 100,
          method: 'Runtime.evaluate',
          params: { expression: 'JSON.stringify({ len: document.getElementById("root") ? document.getElementById("root").innerHTML.length : 0, loading: document.body.innerText.includes("Initializing Secure Module") })' }
        }));
      }, 500);

      setTimeout(() => {
        clearInterval(checkReady);
        if (!screenshotSent) {
          screenshotSent = true;
          ws.send(JSON.stringify({ id: 3, method: 'Page.captureScreenshot', params: { format: 'png' } }));
        }
      }, 15000);
    };

    let screenshotSent = false;
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Runtime.consoleAPICalled') {
        console.log('BROWSER_CONSOLE:', msg.params.type, msg.params.args.map(a => a.value || a.description).join(' '));
      }
      if (msg.method === 'Runtime.exceptionThrown') {
        console.error('BROWSER_EXCEPTION:', JSON.stringify(msg.params.exceptionDetails));
      }
      if (msg.id === 100 && msg.result?.result?.value) {
        try {
          const info = JSON.parse(msg.result.result.value);
          console.log('DOM Check:', info);
          if (info.len > 1000 && !info.loading && !screenshotSent) {
            screenshotSent = true;
            setTimeout(() => {
              ws.send(JSON.stringify({ id: 3, method: 'Page.captureScreenshot', params: { format: 'png' } }));
            }, 600);
          }
        } catch {}
      }
      if (msg.id === 3 && msg.result?.data) {
        const buffer = Buffer.from(msg.result.data, 'base64');
        fs.writeFileSync('scripts/rendered_homepage_screenshot.png', buffer);
        console.log('SCREENSHOT_SAVED: scripts/rendered_homepage_screenshot.png (' + buffer.length + ' bytes)');
        ws.close();
        chrome.kill();
        process.exit(0);
      }
    };
  } catch (err) {
    console.error('Screenshot err:', err.message);
    chrome.kill();
    process.exit(1);
  }
})();
