import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError';
import { validationResult } from 'express-validator';
import { User, UserRole } from '../models/User';
import { DriverStatus, Driver } from '../models/Driver';
import ApiResponse from '../utils/ApiResponse';
import { comparePassword, generateToken } from '../utils/authUtils';
import { Types } from 'mongoose';
import { Order } from '../models/Order';
import { Vehicle, VehicleStatus } from '../models/Vehicle';
import { City } from '../models/City';

const getAvailableVehiclesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const vehicles = await Vehicle.find({ status: VehicleStatus.AVAILABLE });
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
const getAllVehiclesController = async (
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

const getAllCities = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cities = await City.find({});
    if (!cities || cities.length == 0) {
      return next(ApiError.notFound('No cities found'));
    }
    return new ApiResponse(200, cities, 'Cities fetched successfully').send(
      res
    );
  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }
    return next(ApiError.internal('Something went wrong'));
  }
};
export {
  getAllVehiclesController,
  getAllCities,
  getAvailableVehiclesController,
};
