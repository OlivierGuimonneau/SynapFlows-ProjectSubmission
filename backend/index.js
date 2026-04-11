import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import submitRoute from './routes/submit.js';

dotenv.config();

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 5000;
const isDev = process.env.NODE_ENV === 'development';

// Log configuration au démarrage
console.log('\n========== Configuration Airtable ==========');
console.log('BASE_ID:', process.env.AIRTABLE_BASE_ID);
console.log('TABLE:', process.env.AIRTABLE_TABLE);
console.log('TOKEN exists:', !!process.env.AIRTABLE_TOKEN);
console.log('TOKEN length:', process.env.AIRTABLE_TOKEN?.length);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', PORT);
console.log('==========================================\n');

// 🔒 Middleware de sécurité HTTP (en-têtes essentiels)
app.use((req, res, next) => {
  // Content-Security-Policy (CSP) - restrictive par défaut
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https:; connect-src 'self' https://api.airtable.com; frame-ancestors 'none';");
  
  // Strict-Transport-Security (HSTS) - force HTTPS
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  
  // Anti-clickjacking - refuse framing
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Masquer Express version (sécurité par obscurité)
  res.removeHeader('X-Powered-By');
  
  // MIME sniffing protection
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Referrer-Policy - limite l'exposition du Referer
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Permissions-Policy - restreint les APIs navigateur
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=()');
  
  next();
});

// Middleware CORS restrictif
const allowedOrigins = isDev 
  ? ['http://localhost:5000', 'http://localhost:5174', 'http://127.0.0.1:5000', 'http://127.0.0.1:5174']
  : ['https://project.synapflows.fr'];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Endpoint de test configuration
app.get('/api/config-test', (req, res) => {
  res.json({
    baseId: process.env.AIRTABLE_BASE_ID,
    table: process.env.AIRTABLE_TABLE,
    hasToken: !!process.env.AIRTABLE_TOKEN,
    tokenLength: process.env.AIRTABLE_TOKEN?.length,
    nodeEnv: process.env.NODE_ENV,
    port: PORT
  });
});

// API Routes
app.use('/api/submit', submitRoute);

// Servir les fichiers statiques (en dev et prod)
app.use(express.static(path.join(__dirname, '../public')));

// En production, serve index.html pour SPA fallback
if (!isDev) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
}

// Error handling
app.use((err, req, res, next) => {
  console.error('[ERROR]', err);
  res.status(500).json({ error: 'Erreur serveur' });
});

app.listen(PORT, () => {
  console.log(`✅ Serveur SynapFlows lancé sur http://localhost:${PORT}`);
});
