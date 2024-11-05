import express, { Request, Response } from 'express';
import {
  loginController,
  signupController,
  logoutController,
} from '../controllers/auth.controllers';

const router = express.Router();

router.post('/login', loginController);

router.post('/register', signupController);

router.post('/logout', logoutController);
