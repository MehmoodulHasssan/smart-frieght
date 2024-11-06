import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError';
import { validationResult } from 'express-validator';
import { User, UserRole } from '../models/User';
import { DriverStatus, Driver } from '../models/Driver';
import ApiResponse from '../utils/ApiResponse';
import { comparePassword, generateToken } from '../utils/authUtils';
import { Types } from 'mongoose';

const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        ApiError.badRequest('Please enter valid credentials', errors.array())
      );
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(ApiError.badRequest('This email is not registerd'));
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return next(ApiError.badRequest('Your password is not correct'));
    }
    const token = generateToken(user._id as Types.ObjectId);
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });
    return new ApiResponse(200, user, 'User logged in successfully');
  } catch (error) {
    console.log(error);
    if (error instanceof ApiError) {
      return next(error);
    }
    return next(ApiError.internal('Internal Server Error'));
  }
};

const consignorRegisterController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        ApiError.badRequest('Please enter valid credentials', errors.array())
      );
    }
    const { full_name, email, phone_number, password } = req.body;

    const consignor = await User.create({
      full_name,
      email,
      password,
      phone_number,
      role: UserRole.CONSIGNOR,
    });

    return new ApiResponse(200, consignor, 'User created successfully');
  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }
    return next(ApiError.internal('Internal Server Error'));
  }
};
const driverRegisterController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return ApiError.badRequest(
        'Please enter valid credentials',
        errors.array()
      );
    }
    const { full_name, email, phone_number, password, licence_no } = req.body;
    const newUser = await User.create({
      full_name,
      email,
      password,
      phone_number,
      role: UserRole.DRIVER,
    });

    const newDriver = await Driver.create({
      licence_no,
      user_id: newUser._id,
      status: DriverStatus.UNAVAILABLE,
    });

    return new ApiResponse(
      201,
      { ...newDriver, ...newUser },
      'Driver created successfully'
    );
  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }
    return next(ApiError.internal('Failed to create driver.Please try again'));
  }
};

const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie('token');
    return new ApiResponse(200, null, 'User logged out successfully');
  } catch (error) {
    return next(error);
  }
};

export {
  loginController,
  consignorRegisterController,
  driverRegisterController,
  logoutController,
};
