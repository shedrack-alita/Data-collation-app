import express from 'express';
import { protect, authorize } from '../middleware/auth';
import { UserRole } from '../models/User.model';

const router = express.Router();

// Form builder routes will be implemented here
router.get('/', (req, res) => {
  res.json({ message: 'Form routes - coming soon' });
});

export default router;
