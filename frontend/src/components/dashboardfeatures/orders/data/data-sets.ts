import { OrderStatus } from '@/utils/queries';
export const statusOptions = [
  {
    label: 'Pending',
    value: OrderStatus.PENDING,
  },
  {
    label: 'In Progress',
    value: OrderStatus.IN_PROGRESS,
  },
  {
    label: 'Completed',
    value: OrderStatus.COMPLETED,
  },
  {
    label: 'Canceled',
    value: OrderStatus.CANCELED,
  },
];

export type ITrackingEvent = {
  driverId: string;
  location: ILocationEvent;
};

type ILocationEvent = {
  accuracy: number;
  latitude: number;
  longitude: number;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
};
