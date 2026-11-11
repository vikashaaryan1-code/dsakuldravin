import { spawn } from 'child_process';
import http from 'http';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const chrome = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9222',
  '--no-sandbox',
  '--disable-gpu',
  'http://localhost:3000'
]);

setTimeout(async () => {
  try {
    const res = await fetch('http://localhost:9222/json');
    const tabs = await res.json();
    console.log('Open tabs:', tabs.map(t => ({ title: t.title, url: t.url, ws: t.webSocketDebuggerUrl })));
    
    if (tabs.length > 0 && tabs[0].webSocketDebuggerUrl) {
      // Connect to WebSocket using native WebSocket (Node 18+)
      const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);
      ws.onopen = () => {
        console.log('Connected to Chrome DevTools WebSocket');
        ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
        ws.send(JSON.stringify({ id: 2, method: 'Log.enable' }));
      };
      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.method === 'Runtime.consoleAPICalled') {
          console.log('[Console]', msg.params.type, msg.params.args.map(a => a.value || a.description).join(' '));
        }
        if (msg.method === 'Runtime.exceptionThrown') {
          console.error('[Exception Caught!]:', JSON.stringify(msg.params.exceptionDetails, null, 2));
        }
      };

      setTimeout(() => {
        ws.close();
        chrome.kill();
        process.exit(0);
      }, 5000);
    } else {
      chrome.kill();
      process.exit(0);
    }
  } catch (err) {
    console.error('Diagnostic error:', err.message);
    chrome.kill();
    process.exit(1);
  }
}, 2000);
