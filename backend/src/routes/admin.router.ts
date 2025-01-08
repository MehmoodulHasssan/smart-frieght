import express from 'express';
import { authenticateUser } from '../middlewares/authenticate.user';
import {
  createNewUserController,
  getAllUsersController,
  getAllVehiclesController,
  updateUserController,
} from '../controllers/admin.controllers';

const adminRouter = express.Router();

adminRouter.get('/all-vehicles', authenticateUser, getAllVehiclesController);
adminRouter.get('/all-users', authenticateUser, getAllUsersController);
adminRouter.post('/create-user', authenticateUser, createNewUserController);
adminRouter.post('/update-user', authenticateUser, updateUserController);

export default adminRouter;
