import express from 'express';
import { authenticateUser } from '../middlewares/authenticate.user';
import {
  addRouteToOrderController,
  createNewUserController,
  createVehicleController,
  deleteUserController,
  deleteVehicleController,
  getAllOrdersController,
  getAllUsersController,
  getAllVehiclesController,
  updateUserController,
  updateVehicleController,
} from '../controllers/admin.controllers';
import {
  registerValidation,
  updateUserValidation,
  vehicleValidation,
} from '../utils/validations';

const adminRouter = express.Router();

adminRouter.get('/all-vehicles', authenticateUser, getAllVehiclesController);
adminRouter.get('/all-users', authenticateUser, getAllUsersController);
adminRouter.post(
  '/create-user',
  authenticateUser,
  registerValidation,
  createNewUserController
);
adminRouter.put(
  '/update-user/:id',
  authenticateUser,
  updateUserValidation,
  updateUserController
);

adminRouter.delete('/delete-user/:id', authenticateUser, deleteUserController);

adminRouter.post(
  '/create-vehicle',
  authenticateUser,
  vehicleValidation,
  createVehicleController
);
adminRouter.put(
  '/update-vehicle/:id',
  authenticateUser,
  vehicleValidation,
  updateVehicleController
);
adminRouter.delete(
  '/delete-vehicle/:id',
  authenticateUser,
  deleteVehicleController
);

adminRouter.get('/all-orders', authenticateUser, getAllOrdersController);

adminRouter.put('/add-route/:id', authenticateUser, addRouteToOrderController);

export default adminRouter;
