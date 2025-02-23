import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError';
import { validationResult } from 'express-validator';
import { IUser, User, UserRole } from '../models/User';
import { DriverStatus, Driver } from '../models/Driver';
import ApiResponse from '../utils/ApiResponse';
import { comparePassword, generateToken } from '../utils/authUtils';
import { Types } from 'mongoose';
import { IOrder, Order } from '../models/Order';
import { Location } from '../models/Location';
import { getOrdersQuery } from './contollers.utils';
import axios from 'axios';
import { Route } from '../models/Route';

export const placeOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // console.log(req.body._user);
    if (req.body._user.role !== UserRole.CONSIGNOR) {
      return next(ApiError.forbidden('User is not a consignor'));
    }

    const { pickup_location, dropoff_location, weight, city_id, vehicle_id } =
      req.body;

    // console.log(pickup_location, dropoff_location, weight, city_id, vehicle_id);

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

    const routeDetails = await axios.get(
      `http://router.project-osrm.org/route/v1/car/${pickup_location.position.lng},${pickup_location.position.lat};${dropoff_location.position.lng},${dropoff_location.position.lat}`
    );

    if (!routeDetails?.data) {
      return next(ApiError.internal('Error creating route'));
    }

    const { geometry, duration, distance } = routeDetails?.data.routes[0];

    const newRoute = await Route.create({
      geometry,
      duration,
      distance,
    });

    if (!newRoute) {
      return next(ApiError.internal('Error creating route'));
    }

    const newOrder = await Order.create({
      consignor: consignor_id,
      pickup_location: createPickupLocation._id,
      dropoff_location: createDropoffLocation._id,
      weight: +weight,
      vehicle: vehicle_id,
      route: newRoute._id,
    });

    if (!newOrder) {
      return next(ApiError.internal('Error creating order'));
    }

    return new ApiResponse(201, undefined, 'Order placed successfully').send(
      res
    );
  } catch (error) {
    console.log(error);
    if (error instanceof ApiError) {
      return next(error);
    }
    return next(ApiError.internal('Something went wrong'));
  }
};

export const getAllOrdersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const consignor: IUser = req.body._user;
    if (consignor.role !== UserRole.CONSIGNOR) {
      return next(ApiError.unauthorized('You are not authorized'));
    }

    const orders = await Order.find({ consignor: consignor._id }).populate(
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
