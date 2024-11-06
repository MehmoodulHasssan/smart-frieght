import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError';
import { verifyToken } from '../utils/authUtils';
import { User } from '../models/User';

const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //check
  const token =
    (req.cookies?.token as string) || req.headers?.authorization?.split(' ')[1];

  if (!token) {
    return ApiError.unauthorized('User not authorized');
  }
  try {
    const decoded = verifyToken(token);
    const isUser = await User.findById(decoded._id);
    if (!isUser) {
      return ApiError.badRequest('User not found');
    }
    req.user = isUser;
    next();
  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }
    console.log(error);
    return next(ApiError.unauthorized('User not authorized'));
  }
};

export { authenticateUser };
