import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError';
import { validationResult } from 'express-validator';
import { IUser, User, UserRole } from '../models/User';
import { DriverStatus, Driver } from '../models/Driver';
import ApiResponse from '../utils/ApiResponse';
import { Vehicle } from '../models/Vehicle';
import { IUserReq } from './auth.controllers';
import { strict } from 'assert';
import path from 'path';
import { Order } from '../models/Order';
import { Route } from '../models/Route';

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
    const validation = validationResult(req);
    if (!validation.isEmpty) {
      return next(
        ApiError.badRequest('Please enter valid credentials', validation)
      );
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

    const users = await User.find({}, { password: 0 }).populate({
      path: 'driver',
      select: ['_id', 'status', 'licence_no'],
    });
    if (!users || users.length == 0) {
      return next(ApiError.notFound('No users found'));
    }

    return new ApiResponse(200, users, 'Users fetched successfully').send(res);
  } catch (error) {
    console.log(error);
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
    const {
      _user: admin,
      licence_no,
      password,
      ...rest
    }: IUserReq & { _user: IUser } = req.body;
    const userId = req.params.id;
    if (admin.role !== UserRole.ADMIN) {
      return next(ApiError.unauthorized('You are not authorized'));
    }

    // console.log('User Id: ', userId);

    const validation = validationResult(req);
    if (!validation.isEmpty) {
      return next(
        ApiError.badRequest('Please enter valid credentials', validation)
      );
    }
    const isUser = await User.findById(userId).populate('driver');
    if (!isUser) {
      return next(ApiError.badRequest('User not found'));
    }
    let updatedUser;
    if (password) {
      if (
        isUser.role === UserRole.DRIVER &&
        //@ts-ignore
        isUser?.driver?.licence_no !== rest.licence_no
      ) {
        const isDriver = await Driver.findOne({ licence_no: licence_no });
        if (isDriver) {
          return next(ApiError.badRequest('Driver already exists'));
        }
        updatedUser = await User.findByIdAndUpdate(
          userId,
          { password, ...rest },
          { new: true }
        );
        if (updatedUser) {
          await Driver.findByIdAndUpdate(updatedUser.driver, { licence_no });
        }
      } else {
        updatedUser = await User.findByIdAndUpdate(
          userId,
          { password, ...rest },
          { new: true }
        );
      }
    } else {
      updatedUser = await User.findByIdAndUpdate(userId, rest, { new: true });
    }

    if (!updatedUser) {
      return next(ApiError.internal('Failed to update user'));
    }
    return new ApiResponse(200, undefined, 'User updated successfully').send(
      res
    );
  } catch (error) {
    console.log(error);
    return next(ApiError.internal('Internal Server Error Occured!'));
  }
};

export const createNewUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      _user: admin,
      licence_no,
      ...rest
    }: IUserReq & { _user: IUser } = req.body;
    if (admin.role !== UserRole.ADMIN) {
      return next(ApiError.unauthorized('You are not authorized'));
    }
    const validation = validationResult(req);
    if (!validation.isEmpty) {
      return next(
        ApiError.badRequest('Please enter valid credentials', validation)
      );
    }
    const isUser = await User.findOne({ email: rest.email });
    if (isUser) {
      return next(ApiError.badRequest('User already exists'));
    }

    const newUser = await User.create(rest);
    if (!newUser) {
      return next(ApiError.internal('Failed to create user'));
    }
    if (newUser.role !== UserRole.DRIVER) {
      return new ApiResponse(200, undefined, 'User created successfully').send(
        res
      );
    }

    const newDriver = await Driver.create({
      user: newUser._id,
      licence_no,
      status: DriverStatus.AVAILABLE,
    });
    if (!newDriver) {
      await User.findByIdAndDelete(newUser._id);
      return next(ApiError.internal('Failed to create driver'));
    }

    return new ApiResponse(200, undefined, 'Driver created successfully').send(
      res
    );
  } catch (error) {
    return next(ApiError.internal('Internal Server Error Occured!'));
  }
};

export const deleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _user: admin } = req.body;
    const { id: userId } = req.params;
    if (admin.role !== UserRole.ADMIN) {
      return next(ApiError.unauthorized('You are not authorized'));
    }

    const user = await User.findById(userId);
    if (!user) {
      return next(ApiError.badRequest('User not found'));
    }
    if (user.role === UserRole.DRIVER) {
      await Driver.findByIdAndDelete(user.driver);
    }
    await User.findByIdAndDelete(userId);
    return new ApiResponse(200, undefined, 'User deleted successfully').send(
      res
    );
  } catch (error) {
    return next(ApiError.internal('Internal Server Error Occured!'));
  }
};

export const createVehicleController = async (
  req: IUpdateVehicleReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _user: admin, ...rest } = req.body;

    if (admin.role !== UserRole.ADMIN) {
      return next(ApiError.unauthorized('You are not authorized'));
    }

    const validation = validationResult(req);

    if (!validation.isEmpty) {
      return next(
        ApiError.badRequest('Please enter valid credentials', validation)
      );
    }

    const isVehicle = await Vehicle.findOne({
      licence_plate: rest.licence_plate,
    });

    if (isVehicle) {
      return next(ApiError.badRequest('Vehicle already exists'));
    }

    const newVehicle = await Vehicle.create(rest);
    if (!newVehicle) {
      return next(ApiError.internal('Failed to create vehicle'));
    }
    return new ApiResponse(200, undefined, 'Vehicle created successfully').send(
      res
    );
  } catch (error) {
    return next(ApiError.internal('Internal Server Error Occured!'));
  }
};

export const updateVehicleController = async (
  req: IUpdateVehicleReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _user: admin, ...rest } = req.body;
    if (admin.role !== UserRole.ADMIN) {
      return next(ApiError.unauthorized('You are not authorized'));
    }

    const vehicleId = req.params.id;
    // console.log('vehicleId: ', vehicleId);

    if (!vehicleId) {
      return next(ApiError.badRequest('Please enter valid credentials'));
    }

    const validation = validationResult(req);
    if (!validation.isEmpty) {
      return next(
        ApiError.badRequest('Please enter valid credentials', validation)
      );
    }

    const isVehicle = await Vehicle.findById(vehicleId);
    if (!isVehicle) {
      return next(ApiError.badRequest('Vehicle not found'));
    }
    const updatedVehicle = await Vehicle.findByIdAndUpdate(vehicleId, rest, {
      new: true,
    });
    if (!updatedVehicle) {
      return next(ApiError.internal('Failed to update vehicle'));
    }
    return new ApiResponse(200, undefined, 'Vehicle updated successfully').send(
      res
    );
  } catch (error) {
    console.log(error);
    return next(ApiError.internal('Internal Server Error Occured!'));
  }
};

export const deleteVehicleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _user: admin } = req.body;
    const { id: vehicleId } = req.params;
    if (admin.role !== UserRole.ADMIN) {
      return next(ApiError.unauthorized('You are not authorized'));
    }

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return next(ApiError.badRequest('Vehicle not found'));
    }
    await Vehicle.findByIdAndDelete(vehicleId);
    return new ApiResponse(200, undefined, 'Vehicle deleted successfully').send(
      res
    );
  } catch (error) {
    return next(ApiError.internal('Internal Server Error Occured!'));
  }
};

export const getAllOrdersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const admin: IUser = req.body._user;
    if (admin.role !== UserRole.ADMIN) {
      return next(ApiError.unauthorized('You are not authorized'));
    }

    const orders = await Order.find({}).populate([
      'pickup_location',
      'dropoff_location',
      'vehicle',
      'route',
      {
        path: 'consignor',
        select: ['_id', 'full_name', 'email', 'phone_number'],
      },
      {
        path: 'driver',
        select: ['_id', 'full_name', 'email', 'phone_number'],
      },
    ]);

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

export const addRouteToOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const admin: IUser = req.body._user;
    if (admin.role !== UserRole.ADMIN) {
      return next(ApiError.unauthorized('You are not authorized'));
    }

    const orderId = req.params.id;
    const routeDetails = req.body.route;
    const order = await Order.findById(orderId);
    if (!order) {
      return next(ApiError.badRequest('Order not found'));
    }
    const newRoute = await Route.create(req.body.route);
    if (!newRoute) {
      return next(ApiError.internal('Failed to create route'));
    }
    order.route = newRoute._id as any;
    await order.save();
    return new ApiResponse(200, undefined, 'Route added successfully').send(
      res
    );
  } catch (error) {
    return next(ApiError.internal('Internal Server Error Occured!'));
  }
};

interface IUpdateVehicleReq extends Request {
  body: {
    _user: IUser;
    licence_plate: string;
    vehicle_model: string;
    avg_fuel_consumption: number;
    capacity: number;
    notes?: string;
  };
}
