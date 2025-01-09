import { z } from 'zod';

export const vehicleSchema = z.object({
  vehicle_model: z.string().nonempty('Model is required'),
  licence_plate: z.string().nonempty('Licence plate is required'),
  avg_fuel_consumption: z.string().regex(/^\d+$/, 'Must be positive number'),
  capacity: z.string().regex(/^\d+$/, 'Must be a positive number'),
  // status: z.union([z.literal('AVAILABLE'), z.literal('UNAVAILABLE')]),
  status: z.string().nonempty('Status is required'),
  // createdAt: z.coerce.date(),
  // updatedAt: z.coerce.date(),
});

export type Vehicle = z.infer<typeof vehicleSchema>;

export const vehicleListSchema = z.array(vehicleSchema);
