import express from 'express';
import {
  loginController,
  driverRegisterController,
  logoutController,
  consignorRegisterController,
  verifyUserController,
} from '../controllers/auth.controllers';
import {
  consignorRegisterValidation,
  driverRegisterValidation,
  loginValidation,
} from '../utils/validations';
import { authenticateUser } from '../middlewares/authenticate.user';
const authRouter = express.Router();

authRouter.post('/login', loginValidation, loginController);

authRouter.post(
  '/register/consignor',
  consignorRegisterValidation,
  consignorRegisterController
);
authRouter.post(
  '/register/driver',
  driverRegisterValidation,
  driverRegisterController
);

authRouter.get('/verify', authenticateUser, verifyUserController);

authRouter.post('/logout', authenticateUser, logoutController);

export default authRouter;
