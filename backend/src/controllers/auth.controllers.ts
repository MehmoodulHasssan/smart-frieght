import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError';
import { ExpressValidator, validationResult } from 'express-validator';
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
    const user = await User.findOne(
      { email },
      '-createdAt -updatedAt -driver -__v'
    ).lean();
    console.log('User: ', user);
    if (!user) {
      return next(ApiError.badRequest('This email is not registerd'));
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return next(ApiError.badRequest('Your password is not correct'));
    }
    const token = generateToken(user._id as Types.ObjectId);

    //@ts-ignore
    delete user.password;

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return new ApiResponse(200, user, 'User logged in successfully').send(res);
  } catch (error) {
    console.log(error);
    if (error instanceof ApiError) {
      return next(error);
    }
    return next(ApiError.internal('Internal Server Error'));
  }
};

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
    const isUserWithSameEmail = await User.findOne({ email });
    if (isUserWithSameEmail) {
      return next(ApiError.badRequest('This email is already registerd'));
    }
    const isUserWithSamePhone = await User.findOne({ phone_number });

    if (isUserWithSamePhone) {
      return next(ApiError.badRequest('This phone number is already taken'));
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

    //handle creation of driver
    const isDriver = await Driver.findOne({ licence_no });
    if (isDriver) {
      await User.findByIdAndDelete(newUser._id);
      return next(
        ApiError.badRequest(
          'The driver with the same licence no already exists'
        )
      );
    }

    const newDriver = await Driver.create({
      licence_no,
      status: DriverStatus.UNAVAILABLE,
      user: newUser._id,
    });

    if (!newDriver) {
      return next(
        ApiError.internal('Failed to create driver.Please try again')
      );
    }
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
      profile_picture: user.profile_picture,
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
