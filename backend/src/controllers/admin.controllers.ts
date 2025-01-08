import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError';
import { validationResult } from 'express-validator';
import { User, UserRole } from '../models/User';
import { DriverStatus, Driver } from '../models/Driver';
import ApiResponse from '../utils/ApiResponse';
import { Vehicle } from '../models/Vehicle';
import { IUserReq } from './auth.controllers';

export const getAllVehiclesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.body._user;
    if (user.role !== UserRole.ADMIN) {
      return next(ApiError.unauthorized('User not authorized'));
    }
    const vehicles = await Vehicle.find({});
    if (!vehicles || vehicles.length == 0) {
      return next(ApiError.notFound('No vehicles found'));
    }
    return new ApiResponse(200, vehicles, 'Vehicles fetched successfully').send(
      res
    );
  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }
    return next(ApiError.internal('Something went wrong'));
  }
};

export const getAllUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.body._user;
    if (user.role !== UserRole.ADMIN) {
      return next(ApiError.unauthorized('User not authorized'));
    }

    const users = await User.find({}, { password: 0 });
    if (!users || users.length == 0) {
      return next(ApiError.notFound('No users found'));
    }
    return new ApiResponse(200, users, 'Users fetched successfully').send(res);
  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }
    return next(ApiError.internal('Something went wrong'));
  }
};

export const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _user: admin, _id, password, ...rest }: IUpdateUserReq = req.body;
    if (admin.role !== UserRole.ADMIN) {
      return next(ApiError.unauthorized('You are not authorized'));
    }

    const isUser = await User.findById(_id);
    if (!isUser) {
      return next(ApiError.badRequest('User not found'));
    }
    let updatedUser;
    if (password) {
      updatedUser = await User.findByIdAndUpdate(
        _id,
        { password, ...rest },
        { new: true }
      );
    } else {
      updatedUser = await User.findByIdAndUpdate(_id, rest, { new: true });
    }

    if (!updatedUser) {
      return next(ApiError.internal('Failed to update user'));
    }
    return new ApiResponse(200, undefined, 'User updated successfully').send(
      res
    );
  } catch (error) {
    return next(ApiError.internal('Internal Server Error Occured!'));
  }
};

export const createNewUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _user: admin, ...rest }: IUpdateUserReq = req.body;
    if (admin.role !== UserRole.ADMIN) {
      return next(ApiError.unauthorized('You are not authorized'));
    }
    const isUser = await User.findOne({ email: rest.email });
    if (isUser) {
      return next(ApiError.badRequest('User already exists'));
    }
    const newUser = await User.create(rest);
    if (!newUser) {
      return next(ApiError.internal('Failed to create user'));
    }
    return new ApiResponse(200, undefined, 'User created successfully').send(
      res
    );
  } catch (error) {
    return next(ApiError.internal('Internal Server Error Occured!'));
  }
};

interface IUpdateUserReq extends IUserReq {
  _id: string;
  _user: any;
}
