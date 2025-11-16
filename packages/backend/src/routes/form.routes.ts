import express from 'express';
import { protect, authorize, optionalAuth } from '../middleware/auth';
import { UserRole } from '../models/User.model';

const router = express.Router();

// Public routes - anyone can view forms
router.get('/', optionalAuth, (req, res) => {
  res.json({
    message: 'List of published forms',
    note: 'This will show all published forms. Authentication is optional.'
  });
});

router.get('/:id', optionalAuth, (req, res) => {
  res.json({
    message: `View form ${req.params.id}`,
    note: 'Anyone can view published forms'
  });
});

// Protected routes - require authentication
router.post('/', protect, authorize(UserRole.CREATOR, UserRole.ADMIN), (req, res) => {
  res.json({
    message: 'Create new form',
    note: 'Requires authentication and creator role'
  });
});

router.put('/:id', protect, authorize(UserRole.CREATOR, UserRole.ADMIN), (req, res) => {
  res.json({
    message: `Update form ${req.params.id}`,
    note: 'Requires authentication and ownership'
  });
});

router.delete('/:id', protect, authorize(UserRole.CREATOR, UserRole.ADMIN), (req, res) => {
  res.json({
    message: `Delete form ${req.params.id}`,
    note: 'Requires authentication and ownership'
  });
});

router.post('/:id/publish', protect, authorize(UserRole.CREATOR, UserRole.ADMIN), (req, res) => {
  res.json({
    message: `Publish form ${req.params.id}`,
    note: 'Requires authentication and ownership'
  });
});

export default router;
