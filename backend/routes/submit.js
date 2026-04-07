import express from 'express';
import { submitToAirtable } from '../services/airtable.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const payload = req.body;

    if (!payload || Object.keys(payload).length === 0) {
      return res.status(400).json({ error: 'Aucune donnée fournie' });
    }

    const result = await submitToAirtable(payload);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('[SUBMIT ERROR]', error);
    res.status(500).json({ error: error.message || 'Erreur lors de la soumission' });
  }
});

export default router;
