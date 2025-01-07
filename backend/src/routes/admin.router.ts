import express from 'express';
import { authenticateUser } from '../middlewares/authenticate.user';
import {
  getAllUsersController,
  getAllVehiclesController,
} from '../controllers/admin.controllers';

const adminRouter = express.Router();

adminRouter.get('/all-vehicles', authenticateUser, getAllVehiclesController);
adminRouter.get('/all-users', authenticateUser, getAllUsersController);

export default adminRouter;
