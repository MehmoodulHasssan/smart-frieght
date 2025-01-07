import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError';
import { validationResult } from 'express-validator';
import { User, UserRole } from '../models/User';
import { DriverStatus, Driver } from '../models/Driver';
import ApiResponse from '../utils/ApiResponse';
import { Vehicle } from '../models/Vehicle';

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
