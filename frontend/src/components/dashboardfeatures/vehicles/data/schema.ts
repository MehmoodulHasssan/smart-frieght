import { z } from 'zod';

export const vehicleSchema = z.object({
  model: z.string().nonempty('Model is required'),
  licence_plate: z.string().nonempty('Licence plate is required'),
  avg_fuel_consumption: z
    .number()
    .positive('Average fuel consumption must be a positive number'),
  capacity: z.number().positive('Capacity must be a positive number'),
  status: z.union([z.literal('available'), z.literal('unavailable')]),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Vehicle = z.infer<typeof vehicleSchema>;

export const vehicleListSchema = z.array(vehicleSchema);
