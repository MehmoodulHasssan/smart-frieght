import express from 'express';
import { authenticateUser } from '../middlewares/authenticate.user';
import { getAllOrdersController } from '../controllers/driver.controllers';

const driverRouter = express.Router();

driverRouter.get('/all-orders', authenticateUser, getAllOrdersController);

export default driverRouter;
