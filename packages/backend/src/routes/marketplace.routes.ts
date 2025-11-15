import express from 'express';
import { protect } from '../middleware/auth';

const router = express.Router();

// Marketplace routes for dataset requests and sales
router.get('/datasets', (req, res) => {
  res.json({ message: 'Marketplace routes - coming soon' });
});

export default router;
