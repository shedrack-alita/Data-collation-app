import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { UserRole } from '../models/User.model';
import { AppError } from './error';

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (req: AuthRequest, _res: Response, next: NextFunction) => {
  try {
    let token: string | undefined;

    // Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new AppError('Not authorized to access this route', 401);
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

      // Get user from database
      const user = await User.findById(decoded.id);

      if (!user) {
        throw new AppError('User not found', 401);
      }

      if (user.status !== 'active') {
        throw new AppError('Account is not active', 401);
      }

      req.user = user;
      next();
    } catch {
      throw new AppError('Not authorized to access this route', 401);
    }
  } catch (error) {
    next(error);
  }
};

export const authorize = (...roles: UserRole[]) => {
  return (req: AuthRequest, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Not authorized', 401));
    }

    const hasRole = roles.some(role => req.user.roles.includes(role));

    if (!hasRole) {
      return next(new AppError(`User role is not authorized to access this route`, 403));
    }

    next();
  };
};

export const optionalAuth = async (req: AuthRequest, _res: Response, next: NextFunction) => {
  try {
    let token: string | undefined;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
        const user = await User.findById(decoded.id);
        if (user && user.status === 'active') {
          req.user = user;
        }
      } catch {
        // Token invalid, continue without user
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};
