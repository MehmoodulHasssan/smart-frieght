import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError';
import { validationResult } from 'express-validator';
import { IUser, User, UserRole } from '../models/User';
import { DriverStatus, Driver } from '../models/Driver';
import ApiResponse from '../utils/ApiResponse';
import { comparePassword, generateToken } from '../utils/authUtils';
import { Types } from 'mongoose';
import { Order } from '../models/Order';
import { Vehicle, VehicleStatus } from '../models/Vehicle';
import { getOrdersQuery } from './contollers.utils';

export const getAllOrdersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const driver: IUser = req.body._user;
    if (driver.role !== UserRole.DRIVER) {
      return next(ApiError.unauthorized('You are not authorized'));
    }

    const orders = await Order.find({ driver: driver._id }).populate(
      getOrdersQuery
    );

    // console.log(orders);
    if (!orders || orders.length == 0) {
      return next(ApiError.notFound('No orders found'));
    }

    return new ApiResponse(200, orders, 'Orders fetched successfully').send(
      res
    );
  } catch (error) {
    console.log(error);
    return next(ApiError.internal('Internal Server Error Occured!'));
  }
};
