import { Request, Response, NextFunction } from 'express';

const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export { loginController, signupController, logoutController };
