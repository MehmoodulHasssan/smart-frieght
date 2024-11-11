import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
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
export { loginSchema, consignorRegisterSchema, driverRegisterSchema };
