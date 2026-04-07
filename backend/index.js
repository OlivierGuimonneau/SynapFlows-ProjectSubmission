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

// Middleware
app.use(cors());
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

// En production, servir les fichiers statiques depuis /public
if (!isDev) {
  app.use(express.static(path.join(__dirname, '../public')));
  
  // Serve index.html for all non-API routes (SPA fallback)
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
