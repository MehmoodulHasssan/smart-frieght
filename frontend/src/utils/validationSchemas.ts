import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const commonFields = {
  full_name: z.string().min(1, { message: 'Full Name is required.' }),
  email: z.string().min(1, { message: 'Email is required.' }).email(),
  phone_number: z.string().min(1, { message: 'Phone number is required.' }),
  password: z.string().transform((pwd) => pwd.trim()),
  confirm_password: z.string().transform((pwd) => pwd.trim()),
  isEdit: z.boolean().default(false),
  role: z.string().min(1, { message: 'Role is required.' }),
};

const FieldsSuperRefinement = (
  {
    isEdit,
    password,
    confirm_password,
  }: {
    isEdit: boolean;
    password: string;
    confirm_password: string;
  },
  ctx: any
) => {
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
};

const driverRegisterSchema = z
  .object({
    ...commonFields,
    licence_no: z.string().min(1, { message: 'Licence Number is required.' }),
  })
  .superRefine(FieldsSuperRefinement);

const consignorRegisterSchema = z
  .object(commonFields)
  .superRefine(FieldsSuperRefinement);

const createOrderSchema = z.object({
  weight: z.string().regex(/^\d+$/, 'Must be a number greater than 0'),
  vehicle_type: z.string(),
  city: z.string(),
});

export {
  loginSchema,
  consignorRegisterSchema,
  driverRegisterSchema,
  createOrderSchema,
};
