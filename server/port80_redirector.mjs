import http from 'http';

const server = http.createServer((req, res) => {
  const host = req.headers.host || 'localhost';
  const targetPort = 3000;
  res.writeHead(302, {
    Location: `http://localhost:${targetPort}${req.url}`,
    'Cache-Control': 'no-cache'
  });
  res.end(`Redirecting to http://localhost:${targetPort}${req.url}`);
});

server.listen(80, '::', () => {
  console.log('[Port 80 Redirector] Dual-stack redirect active: http://localhost:80 -> http://localhost:3000');
});

server.on('error', (err) => {
  // If port 80 cannot be bound, fallback to IPv4
  if (err.code === 'EADDRINUSE' || err.code === 'EACCES') {
    server.listen(80, '0.0.0.0', () => {
      console.log('[Port 80 Redirector] IPv4 redirect active: http://127.0.0.1:80 -> http://localhost:3000');
    });
  } else {
    console.warn('[Port 80 Redirector] Bind warning:', err.message);
  }
});
