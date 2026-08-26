import express from 'express';
import { protect, authorize, AuthRequest } from '../middleware/auth';
import { UserRole } from '../models/User.model';

const router = express.Router();

// Submit response - requires authentication to track contributor and payment
router.post('/', protect, authorize(UserRole.CONTRIBUTOR, UserRole.CREATOR, UserRole.ADMIN), (req: AuthRequest, res) => {
  res.json({
    message: 'Submit form response',
    note: 'Requires authentication to track contributor for payment',
    user: req.user?.email
  });
});

// Get responses for a form - only form creator or admin
router.get('/form/:formId', protect, (req, res) => {
  res.json({
    message: `Get responses for form ${req.params.formId}`,
    note: 'Only form creator or admin can view responses'
  });
});

// Verify response - requires verifier role
router.post('/:id/verify', protect, authorize(UserRole.VERIFIER, UserRole.ADMIN), (req, res) => {
  res.json({
    message: `Verify response ${req.params.id}`,
    note: 'Requires verifier role'
  });
});

// Flag response - requires authentication
router.post('/:id/flag', protect, (req, res) => {
  res.json({
    message: `Flag response ${req.params.id}`,
    note: 'Any authenticated user can flag suspicious responses'
  });
});

// Export responses - only form creator or admin
router.get('/export/:formId', protect, (req, res) => {
  res.json({
    message: `Export responses for form ${req.params.formId}`,
    note: 'Only form creator or admin can export'
  });
});

export default router;
