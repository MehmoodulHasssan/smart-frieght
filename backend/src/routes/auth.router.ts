import express from 'express';
import {
  loginController,
  logoutController,
  verifyUserController,
  userRegisterController,
} from '../controllers/auth.controllers';
import { registerValidation, loginValidation } from '../utils/validations';
import { authenticateUser } from '../middlewares/authenticate.user';
const authRouter = express.Router();

authRouter.post('/login', loginValidation, loginController);

// authRouter.post(
//   '/register/consignor',
//   consignorRegisterValidation,
//   consignorRegisterController
// );
authRouter.post('/register', registerValidation, userRegisterController);

authRouter.post('/verify', authenticateUser, verifyUserController);

authRouter.post('/logout', authenticateUser, logoutController);

export default authRouter;
