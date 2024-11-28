import express from 'express';
import { placeOrderController } from '../controllers/consignor.controllers';
import { newOrderValidation } from '../utils/validations';
import { authenticateUser } from '../middlewares/authenticate.user';

const consignorRouter = express.Router();

consignorRouter.post(
  '/place-order',
  authenticateUser,
  newOrderValidation,
  placeOrderController
);
consignorRouter.get('/get-all-orders', authenticateUser, placeOrderController);

export default consignorRouter;
