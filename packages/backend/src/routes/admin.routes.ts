import express from 'express';
import { protect, authorize } from '../middleware/auth';
import { UserRole } from '../models/User.model';

const router = express.Router();

// Admin panel routes - restricted to admin role
router.use(protect, authorize(UserRole.ADMIN));

router.get('/dashboard', (req, res) => {
  res.json({ message: 'Admin routes - coming soon' });
});

export default router;
