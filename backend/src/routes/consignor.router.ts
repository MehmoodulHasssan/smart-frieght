import express from 'express';
import {
  placeOrderController,
  getAllOrdersController,
} from '../controllers/consignor.controllers';
import { newOrderValidation } from '../utils/validations';
import { authenticateUser } from '../middlewares/authenticate.user';

const consignorRouter = express.Router();

consignorRouter.post(
  '/place-order',
  authenticateUser,
  newOrderValidation,
  placeOrderController
);
consignorRouter.get('/all-orders', authenticateUser, getAllOrdersController);

export default consignorRouter;
