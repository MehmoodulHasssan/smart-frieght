import { User } from '../models/User';

export const getOrdersQuery = [
  'pickup_location',
  'dropoff_location',
  'vehicle',
  'route',
  {
    path: 'consignor',
    select: ['_id', 'full_name', 'email', 'phone_number'],
  },
  {
    path: 'driver',
    select: ['_id', 'full_name', 'email', 'phone_number'],
  },
];
