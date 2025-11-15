import express from 'express';
import { protect, optionalAuth } from '../middleware/auth';

const router = express.Router();

// Response submission and verification routes
router.get('/', protect, (req, res) => {
  res.json({ message: 'Response routes - coming soon' });
});

export default router;
