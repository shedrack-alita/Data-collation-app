import express from 'express';
import { protect } from '../middleware/auth';

const router = express.Router();

// Analytics routes
router.get('/', protect, (req, res) => {
  res.json({ message: 'Analytics routes - coming soon' });
});

export default router;
