import express from 'express';
import { protect } from '../middleware/auth';

const router = express.Router();

// Wallet and transaction routes
router.get('/', protect, (req, res) => {
  res.json({ message: 'Wallet routes - coming soon' });
});

export default router;
