import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError';
import { validationResult } from 'express-validator';
import { User, UserRole } from '../models/User';
import { DriverStatus, Driver } from '../models/Driver';
import ApiResponse from '../utils/ApiResponse';
import { comparePassword, generateToken } from '../utils/authUtils';
import { Types } from 'mongoose';
import { IOrder, Order } from '../models/Order';
import { Location } from '../models/Location';

const placeOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // console.log(req.body._user);
    if (req.body._user.role !== UserRole.CONSIGNOR) {
      return next(ApiError.forbidden('User is not a consignor'));
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        ApiError.badRequest('Please enter valid credentials', errors.array())
      );
    }
    const { pickup_location, dropoff_location, weight, city_id, vehicle_id } =
      req.body;

    if (
      !pickup_location ||
      !dropoff_location ||
      !weight ||
      !city_id ||
      !vehicle_id
    ) {
      return next(ApiError.badRequest('Please enter valid credentials'));
    }

    const createPickupLocation = await Location.create({
      latitude: +pickup_location.position.lat,
      longitude: +pickup_location.position.lng,
      address: pickup_location.address,
    });
    const createDropoffLocation = await Location.create({
      latitude: +dropoff_location.position.lat,
      longitude: +dropoff_location.position.lng,
      address: dropoff_location.address,
    });

    if (!createPickupLocation || !createDropoffLocation) {
      return next(ApiError.internal('Error creating location'));
    }
    const consignor_id = req.body._user._id as string;

    const newOrder = await Order.create({
      consignor_id,
      pickup_location_id: createPickupLocation._id,
      dropoff_location_id: createDropoffLocation._id,
      weight: +weight,
      vehicle_id,
    });

    if (!newOrder) {
      return next(ApiError.internal('Error creating order'));
    }

    return new ApiResponse(201, undefined, 'Order placed successfully').send(
      res
    );
  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }
    return next(ApiError.internal('Something went wrong'));
  }
};

const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.body._user.role !== UserRole.CONSIGNOR) {
      return next(ApiError.forbidden('User is not a consignor'));
    }
    const _id = req.body._user._id as string;
    const orders = Order.find({ consignor_id: _id });
    if (!orders || (Array.isArray(orders) && orders.length == 0)) {
      return next(ApiError.notFound('No orders found'));
    }
    return new ApiResponse(200, orders, 'Orders fetched successfully').send(
      res
    );
  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }
    return next(ApiError.internal('Something went wrong'));
  }
};

export { placeOrderController, getAllOrders };
