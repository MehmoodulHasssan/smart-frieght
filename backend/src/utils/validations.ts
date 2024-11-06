import { body } from 'express-validator';

const loginValidation = [
  body('email').isEmail().withMessage('Email is required'),
  body('password').isString().withMessage('Password is required'),
];

const consignorRegisterValidation = [
  body('full_name').isString().withMessage('Full name is required'),
  body('email').isEmail().withMessage('Email is required'),
  body('phone_number').isString().withMessage('Phone number is required'),
  body('password').isLength({ min: 8 }).withMessage('Password is required'),
  body('confirm_password')
    .equals('password')
    .withMessage('Passwords do not match'),
];

const driverRegisterValidation = [
  body('full_name').isString().withMessage('Full name is required'),
  body('email').isEmail().withMessage('Email is required'),
  body('phone_number').isString().withMessage('Phone number is required'),
  body('licence_no').isString().withMessage('Licence number is required'),
  body('password').isLength({ min: 8 }).withMessage('Password is required'),
  body('confirm_password')
    .equals('password')
    .withMessage('Passwords do not match'),
];

export {
  loginValidation,
  consignorRegisterValidation,
  driverRegisterValidation,
};
