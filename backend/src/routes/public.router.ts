import express from 'express';
import { authenticateUser } from '../middlewares/authenticate.user';
import {
  getAllCities,
  getAvailableVehiclesController,
} from '../controllers/public.controllers';
const publicRouter = express.Router();

publicRouter.get('/all-cities', authenticateUser, getAllCities);
publicRouter.get('/available-vehicles', getAvailableVehiclesController);


export default publicRouter;
