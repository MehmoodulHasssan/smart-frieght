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
const userRegistrationSchema = z
  .object({
    full_name: z.string().min(1, { message: 'Full Name is required.' }),
    email: z.string().min(1, { message: 'Email is required.' }).email(),
    licence_no: z.string().optional(),
    // .min(0)
    // .transform((lic) => lic.trim()),
    phone_number: z.string().min(1, { message: 'Phone number is required.' }),
    password: z.string().transform((pwd) => pwd.trim()),
    confirm_password: z.string().transform((pwd) => pwd.trim()),
    isEdit: z.boolean(),
    role: z.string().min(1, { message: 'Role is required.' }),
  })
  .superRefine(
    ({ isEdit, password, confirm_password, role, licence_no }, ctx) => {
      if (role == 'driver') {
        if (licence_no === '') {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Licence number is required.',
            path: ['licence_no'],
          });
        }
      }
      if (!isEdit || (isEdit && password !== '')) {
        if (password === '') {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Password is required.',
            path: ['password'],
          });
        }

        if (password.length < 8) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Password must be at least 8 characters long.',
            path: ['password'],
          });
        }

        if (password !== confirm_password) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Passwords don't match.",
            path: ['confirm_password'],
          });
        }
      }
    }
  );

const createOrderSchema = z.object({
  weight: z.string().regex(/^\d+$/, 'Must be a number greater than 0'),
  vehicle_type: z.string(),
  city: z.string(),
});

export {
  loginSchema,
  consignorRegisterSchema,
  userRegistrationSchema,
  createOrderSchema,
};
