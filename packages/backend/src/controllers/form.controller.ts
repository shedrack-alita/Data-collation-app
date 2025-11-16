import { Request, Response, NextFunction } from 'express';
import Form, { FormStatus } from '../models/Form.model';
import { AppError } from '../middleware/error';
import logger from '../utils/logger';

// Get all forms (public)
export const getAllForms = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status, limit = 20, skip = 0 } = req.query;

    const query: any = {};

    // If not authenticated or not creator, only show published forms
    if (!(req as any).user || !(req as any).user.roles?.includes('creator')) {
      query.status = FormStatus.PUBLISHED;
    } else if (status) {
      query.status = status;
    }

    const forms = await Form.find(query)
      .limit(Number(limit))
      .skip(Number(skip))
      .sort({ createdAt: -1 })
      .select('-sections'); // Don't send full sections in list view

    const total = await Form.countDocuments(query);

    res.json({
      success: true,
      data: forms,
      pagination: {
        total,
        limit: Number(limit),
        skip: Number(skip)
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get single form by ID (public)
export const getFormById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const form = await Form.findById(req.params.id);

    if (!form) {
      throw new AppError('Form not found', 404);
    }

    // If form is not published, only creator can view it
    if (form.status !== FormStatus.PUBLISHED) {
      const user = (req as any).user;
      if (!user || (form.creatorId !== user.id && !user.roles?.includes('admin'))) {
        throw new AppError('Form not found', 404);
      }
    }

    // Increment view count
    form.stats.views += 1;
    await form.save();

    res.json({
      success: true,
      data: form
    });
  } catch (error) {
    next(error);
  }
};

// Create new form (protected)
export const createForm = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { title, description, sections, settings } = req.body;

    const form = await Form.create({
      title,
      description,
      sections,
      settings,
      creatorId: req.user.id,
      status: FormStatus.DRAFT
    });

    logger.info(`Form created: ${form.id} by user: ${req.user.id}`);

    res.status(201).json({
      success: true,
      data: form
    });
  } catch (error) {
    next(error);
  }
};

// Update form (protected)
export const updateForm = async (req: any, res: Response, next: NextFunction) => {
  try {
    const form = await Form.findById(req.params.id);

    if (!form) {
      throw new AppError('Form not found', 404);
    }

    // Check ownership
    if (form.creatorId !== req.user.id && !req.user.roles?.includes('admin')) {
      throw new AppError('Not authorized to update this form', 403);
    }

    // Don't allow editing published forms
    if (form.status === FormStatus.PUBLISHED && form.stats.responses > 0) {
      throw new AppError('Cannot edit form with responses. Create a new version instead.', 400);
    }

    const { title, description, sections, settings } = req.body;

    if (title) form.title = title;
    if (description !== undefined) form.description = description;
    if (sections) form.sections = sections;
    if (settings) form.settings = { ...form.settings, ...settings };

    await form.save();

    logger.info(`Form updated: ${form.id} by user: ${req.user.id}`);

    res.json({
      success: true,
      data: form
    });
  } catch (error) {
    next(error);
  }
};

// Delete form (protected)
export const deleteForm = async (req: any, res: Response, next: NextFunction) => {
  try {
    const form = await Form.findById(req.params.id);

    if (!form) {
      throw new AppError('Form not found', 404);
    }

    // Check ownership
    if (form.creatorId !== req.user.id && !req.user.roles?.includes('admin')) {
      throw new AppError('Not authorized to delete this form', 403);
    }

    // Don't allow deleting forms with responses
    if (form.stats.responses > 0) {
      throw new AppError('Cannot delete form with responses. Archive it instead.', 400);
    }

    await form.deleteOne();

    logger.info(`Form deleted: ${form.id} by user: ${req.user.id}`);

    res.json({
      success: true,
      message: 'Form deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Publish form (protected)
export const publishForm = async (req: any, res: Response, next: NextFunction) => {
  try {
    const form = await Form.findById(req.params.id);

    if (!form) {
      throw new AppError('Form not found', 404);
    }

    // Check ownership
    if (form.creatorId !== req.user.id && !req.user.roles?.includes('admin')) {
      throw new AppError('Not authorized to publish this form', 403);
    }

    // Validate form has sections and fields
    if (!form.sections || form.sections.length === 0) {
      throw new AppError('Form must have at least one section', 400);
    }

    const hasFields = form.sections.some(section => section.fields && section.fields.length > 0);
    if (!hasFields) {
      throw new AppError('Form must have at least one field', 400);
    }

    form.status = FormStatus.PUBLISHED;
    await form.save();

    logger.info(`Form published: ${form.id} by user: ${req.user.id}`);

    res.json({
      success: true,
      data: form
    });
  } catch (error) {
    next(error);
  }
};

// Get forms by creator (protected)
export const getMyForms = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { status, limit = 20, skip = 0 } = req.query;

    const query: any = { creatorId: req.user.id };
    if (status) {
      query.status = status;
    }

    const forms = await Form.find(query)
      .limit(Number(limit))
      .skip(Number(skip))
      .sort({ createdAt: -1 });

    const total = await Form.countDocuments(query);

    res.json({
      success: true,
      data: forms,
      pagination: {
        total,
        limit: Number(limit),
        skip: Number(skip)
      }
    });
  } catch (error) {
    next(error);
  }
};
