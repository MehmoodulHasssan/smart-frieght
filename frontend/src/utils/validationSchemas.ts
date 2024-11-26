import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const consignorRegisterSchema = z.object({
  full_name: z.string(),
  email: z.string().email(),
  phone_number: z.string(),
  password: z.string().min(8),
});
const driverRegisterSchema = z.object({
  full_name: z.string(),
  email: z.string().email(),
  licence_no: z.string(),
  phone_number: z.string(),
  password: z.string().min(8),
});

const createOrderSchema = z.object({
  pickup_location: z.string(),
  dropoff_location: z.string(),
  weight_kg: z.number(),
  vehicle_type: z.string(),
  city: z.string(),
});

export {
  loginSchema,
  consignorRegisterSchema,
  driverRegisterSchema,
  createOrderSchema,
};
