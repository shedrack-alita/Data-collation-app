import express from 'express';
import { protect } from '../middleware/auth';

const router = express.Router();

// User management routes will be implemented here
router.get('/', protect, (req, res) => {
  res.json({ message: 'User routes - coming soon' });
});

export default router;
