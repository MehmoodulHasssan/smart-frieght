import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError';
import { ExpressValidator, validationResult } from 'express-validator';
import { User, UserRole } from '../models/User';
import { DriverStatus, Driver } from '../models/Driver';
import ApiResponse from '../utils/ApiResponse';
import { comparePassword, generateToken } from '../utils/authUtils';
import { Types } from 'mongoose';
import { registerValidation } from '../utils/validations';

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
    const userResponse = {
      _id: user._id,
      email: user.email,
      role: user.role,
      full_name: user.full_name,
      phone_number: user.phone_number,
    };
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return new ApiResponse(
      200,
      userResponse,
      'User logged in successfully'
    ).send(res);
  } catch (error) {
    console.log(error);
    if (error instanceof ApiError) {
      return next(error);
    }
    return next(ApiError.internal('Internal Server Error'));
  }
};

// const consignorRegisterController = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return next(
//         ApiError.badRequest('Please enter valid credentials', errors.array())
//       );
//     }
//     const { full_name, email, phone_number, password } = req.body;

//     const user = await User.findOne().where('email').equals(email);

//     if (user) {
//       return next(ApiError.badRequest('This email is already registerd'));
//     }
//     const consignor = await User.create({
//       full_name,
//       email,
//       password,
//       phone_number,
//       role: UserRole.CONSIGNOR,
//     });

//     if (!consignor) {
//       return next(ApiError.internal('Failed to create user.Please try again'));
//     }
//     const userResponse = {
//       id: consignor._id,
//       full_name: consignor.full_name,
//       email: consignor.email,
//       phone_number: consignor.phone_number,
//       role: consignor.role,
//     };

//     return new ApiResponse(200, userResponse, 'User created successfully').send(
//       res
//     );
//   } catch (error) {
//     if (error instanceof ApiError) {
//       return next(error);
//     }
//     return next(ApiError.internal('Internal Server Error'));
//   }
// };

const userRegisterController = async (
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
    const {
      full_name,
      email,
      phone_number,
      password,
      licence_no,
      role,
    }: IUserReq = req.body;
    // console.log(req.body);
    const isUser = await User.findOne({ email });
    if (isUser) {
      return next(ApiError.badRequest('This email is already registerd'));
    }
    const newUser = await User.create({
      full_name,
      email,
      password,
      phone_number,
      role,
    });

    if (!newUser) {
      return next(ApiError.internal('Failed to create user.Please try again'));
    }

    if (newUser.role !== UserRole.DRIVER) {
      return new ApiResponse(200, undefined, 'User created successfully').send(
        res
      );
    }

    const newDriver = await Driver.create({
      licence_no,
      user_id: newUser._id,
      status: DriverStatus.UNAVAILABLE,
    });

    if (!newDriver) {
      await User.findByIdAndDelete(newUser._id);
      return next(
        ApiError.internal('Failed to create driver.Please try again')
      );
    }
    const driverResponse = {
      id: newUser._id,
      full_name: newUser.full_name,
      email: newUser.email,
      phone_number: newUser.phone_number,
      licence_no: newDriver.licence_no,
      role: newUser.role,
    };

    return new ApiResponse(
      201,
      driverResponse,
      'Driver created successfully'
    ).send(res);
  } catch (error) {
    console.log(error);
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
    return new ApiResponse(200, null, 'User logged out successfully').send(res);
  } catch (error) {
    return next(error);
  }
};

const verifyUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.body._user;
    if (!user) {
      return next(ApiError.badRequest('User not found'));
    }
    const userResponse = {
      _id: user._id,
      email: user.email,
      role: user.role,
      full_name: user.full_name,
      phone_number: user.phone_number,
    };
    return new ApiResponse(
      200,
      userResponse,
      'User verified successfully'
    ).send(res);
  } catch (error) {
    return next(error);
  }
};

export {
  loginController,
  // consignorRegisterController,
  userRegisterController,
  logoutController,
  verifyUserController,
};

export interface IUserReq {
  full_name: string;
  email: string;
  phone_number: string;
  password: string;
  licence_no?: string;
  role: string;
}
