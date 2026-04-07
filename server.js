const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 5000;

const AIRTABLE_BASE_ID = 'appvGEsLWrImfUU9i';
const AIRTABLE_TABLE = 'Projets Soumis';
const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN_A && process.env.AIRTABLE_TOKEN_B
  ? `${process.env.AIRTABLE_TOKEN_A}.${process.env.AIRTABLE_TOKEN_B}`
  : process.env.AIRTABLE_TOKEN;

function serveStatic(res, filePath, contentType) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'POST' && pathname === '/api/submit') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      let payload;
      try {
        payload = JSON.parse(body);
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'JSON invalide' }));
        return;
      }

      // Convert any array values to comma-separated strings (Airtable text fields)
      const sanitized = {};
      for (const [key, val] of Object.entries(payload)) {
        sanitized[key] = Array.isArray(val) ? val.join(', ') : val;
      }
      console.log('[SUBMIT] Champs envoyés à Airtable:', JSON.stringify(sanitized, null, 2));
      const postData = JSON.stringify({ records: [{ fields: sanitized }] });
      const options = {
        hostname: 'api.airtable.com',
        path: `/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE)}`,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
      };

      const airtableReq = https.request(options, (airtableRes) => {
        let data = '';
        airtableRes.on('data', chunk => { data += chunk; });
        airtableRes.on('end', () => {
          console.log('[AIRTABLE] Status:', airtableRes.statusCode, '| Réponse:', data.substring(0, 500));
          res.writeHead(airtableRes.statusCode, { 'Content-Type': 'application/json' });
          res.end(data);
        });
      });

      airtableReq.on('error', (err) => {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      });

      airtableReq.write(postData);
      airtableReq.end();
    });
    return;
  }

  const ext = path.extname(pathname);
  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
  };

  let filePath;
  if (pathname === '/' || pathname === '') {
    filePath = path.join(__dirname, 'index.html');
  } else {
    filePath = path.join(__dirname, pathname);
  }

  const contentType = mimeTypes[ext] || 'application/octet-stream';
  serveStatic(res, filePath, contentType);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
