import { body } from 'express-validator';
import ApiError from './ApiError';
import { UserRole } from '../models/User';

const loginValidation = [
  body('email').isEmail().withMessage('Email is required'),
  body('password').isString().withMessage('Password is required'),
];

const commonUserValidation = [
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
];
const updateUserValidation = [
  ...commonUserValidation,
  body('password').custom((value) => {
    if (value && value.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }
    return true;
  }),
  body('confirm_password').custom((value, { req }) => {
    if (value && value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),
];
const registerValidation = [
  ...commonUserValidation,
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

const vehicleValidation = [
  body('licence_plate').isString().withMessage('License plate is required'),
  body('vehicle_model').isString().withMessage('Vehicle model is required'),
  body('capacity').isString().withMessage('Capacity is required'),
  body('avg_fuel_consumption')
    .isString()
    .withMessage('Avg fuel consumption is required'),
];

export {
  loginValidation,
  registerValidation,
  newOrderValidation,
  updateUserValidation,
  vehicleValidation,
};
