#!/usr/bin/env node

const https = require('https');

const SITE_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000';
const INTERVAL = 5 * 60 * 1000; // 5 minutes

function ping() {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] Pinging ${SITE_URL}...`);

  const url = new URL(SITE_URL);
  const options = {
    hostname: url.hostname,
    port: url.port || (url.protocol === 'https:' ? 443 : 80),
    path: '/api/health',
    method: 'GET',
    timeout: 10000
  };

  const client = url.protocol === 'https:' ? https : require('http');

  const req = client.request(options, (res) => {
    console.log(`✓ Response: ${res.statusCode}`);
  });

  req.on('error', (error) => {
    console.error('✗ Ping failed:', error.message);
  });

  req.on('timeout', () => {
    console.error('✗ Request timeout');
    req.destroy();
  });

  req.end();
}

ping();
setInterval(ping, INTERVAL);

console.log(`Keep-alive service started. Pinging every ${INTERVAL / 1000 / 60} minutes.`);
