import { body } from 'express-validator';
import ApiError from './ApiError';
import { UserRole } from '../models/User';

const loginValidation = [
  body('email').isEmail().withMessage('Email is required'),
  body('password').isString().withMessage('Password is required'),
];

const registerValidation = [
  body('full_name').isString().withMessage('Full name is required'),
  body('email').isEmail().withMessage('Email is required'),
  body('phone_number').isString().withMessage('Phone number is required'),
  body('licence_no').custom((value, { req }) => {
    if (req.body.role === UserRole.DRIVER) {
      if (!value) {
        return ApiError.badRequest('Licence number is required');
      }
    }
    return true;
  }),
  body('role')
    .isIn([UserRole.CONSIGNOR, UserRole.DRIVER])
    .withMessage('Role is required'),
  body('password').isLength({ min: 8 }).withMessage('Password is required'),
  body('confirm_password')
    .equals('password')
    .withMessage('Passwords do not match'),
];

// const consignorRegisterValidation = [
//   body('full_name').isString().withMessage('Full name is required'),
//   body('email').isEmail().withMessage('Email is required'),
//   body('phone_number').isString().withMessage('Phone number is required'),
//   body('password').isLength({ min: 8 }).withMessage('Password is required'),
//   body('confirm_password')
//     .isLength({ min: 8 })
//     .withMessage('Password is required'),
//   // body('confirm_password')
//   //   .equals('password')
//   //   .withMessage('Passwords do not match'),
// ];

// const driverRegisterValidation = [
//   body('full_name').isString().withMessage('Full name is required'),
//   body('email').isEmail().withMessage('Email is required'),
//   body('phone_number').isString().withMessage('Phone number is required'),
//   body('licence_no').isString().withMessage('Licence number is required'),
//   body('password').isLength({ min: 8 }).withMessage('Password is required'),
//   body('confirm_password')
//     .equals('password')
//     .withMessage('Passwords do not match'),
// ];

const newOrderValidation = [
  body('pickup_location')
    .exists()
    .withMessage('Pickup Location is required.')
    .isObject()
    .withMessage('Location must be an object.'),

  // Validate and sanitize latitude inside the location object
  body('pickup_location.position.lat')
    .exists()
    .withMessage('Latitude is required.')
    .isFloat()
    .withMessage('Latitude must be a number ')
    .toFloat(),

  // Validate and sanitize longitude inside the location object
  body('pickup_location.position.lng')
    .exists()
    .withMessage('Longitude is required.')
    .isFloat()
    .withMessage('Latitude must be a number ')
    .toFloat(),

  // Validate and sanitize address inside the location object
  body('pickup_location.address')
    .exists()
    .withMessage('Address is required.')
    .isString()
    .withMessage('Address must be a valid string.')
    .notEmpty()
    .withMessage('Address cannot be empty.')
    .trim(), // Remove leading/trailing spaces

  body('dropoff_location')
    .exists()
    .withMessage('Dropoff Location is required.')
    .isObject()
    .withMessage('Dropoff Location must be an object.'),

  // Validate and sanitize latitude inside the location object
  body('dropoff_location.position.lat')
    .exists()
    .withMessage('Latitude is required.')
    .isFloat()
    .withMessage('Latitude must be a number ')
    .toFloat(),

  // Validate and sanitize longitude inside the location object
  body('dropoff_location.position.lng')
    .exists()
    .withMessage('Longitude is required.')
    .isFloat()
    .withMessage('Latitude must be a number ')
    .toFloat(),

  // Validate and sanitize address inside the location object
  body('dropoff_location.address')
    .exists()
    .withMessage('Address is required.')
    .isString()
    .withMessage('Address must be a valid string.')
    .notEmpty()
    .withMessage('Address must not be empty')
    .trim(),

  body('weight')
    .isString()
    .withMessage('Weight is required')
    .matches(/^\d+$/)
    .withMessage('Weight must be a number'),
  body('city_id').isString().withMessage('City is required'),
  body('vehicle_id').isString().withMessage('Valid Vehicle id is required'),
];

export { loginValidation, registerValidation, newOrderValidation };
