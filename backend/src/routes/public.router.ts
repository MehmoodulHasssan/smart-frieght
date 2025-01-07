import express from 'express';
import { authenticateUser } from '../middlewares/authenticate.user';
import {
  getAllCities,
  getAllVehiclesController,
  getAvailableVehiclesController,
} from '../controllers/public.controllers';
const publicRouter = express.Router();

publicRouter.get('/all-vehicles', authenticateUser, getAllVehiclesController);
publicRouter.get('/all-cities', authenticateUser, getAllCities);
publicRouter.get('/available-vehicles', getAvailableVehiclesController);

export default publicRouter;
