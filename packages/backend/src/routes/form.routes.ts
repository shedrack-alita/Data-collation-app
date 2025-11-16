import express from 'express';
import { protect, authorize, optionalAuth } from '../middleware/auth';
import { UserRole } from '../models/User.model';
import * as formController from '../controllers/form.controller';

const router = express.Router();

// Public routes - anyone can view forms
router.get('/', optionalAuth, formController.getAllForms);
router.get('/:id', optionalAuth, formController.getFormById);

// Protected routes - require authentication
router.get('/my/forms', protect, formController.getMyForms);
router.post('/', protect, authorize(UserRole.CREATOR, UserRole.ADMIN), formController.createForm);
router.put('/:id', protect, authorize(UserRole.CREATOR, UserRole.ADMIN), formController.updateForm);
router.delete('/:id', protect, authorize(UserRole.CREATOR, UserRole.ADMIN), formController.deleteForm);
router.post('/:id/publish', protect, authorize(UserRole.CREATOR, UserRole.ADMIN), formController.publishForm);

export default router;
