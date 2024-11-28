import express from 'express';
import { authenticateUser } from '../middlewares/authenticate.user';
import {
  getAllCities,
  getAllVehiclesController,
} from '../controllers/public.controllers';
const publicRouter = express.Router();

publicRouter.get('/all-vehicles', authenticateUser, getAllVehiclesController);
publicRouter.get('/all-cities', authenticateUser, getAllCities);

export default publicRouter;
