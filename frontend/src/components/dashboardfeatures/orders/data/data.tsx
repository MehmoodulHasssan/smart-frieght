import { OrderStatus } from '@/utils/queries';
import {
  IconArrowDown,
  IconArrowRight,
  IconArrowUp,
  IconCircle,
  IconCircleCheck,
  IconCircleX,
  IconExclamationCircle,
  IconStopwatch,
} from '@tabler/icons-react';

export const labels = [
  {
    value: 'bug',
    label: 'Bug',
  },
  {
    value: 'feature',
    label: 'Feature',
  },
  {
    value: 'documentation',
    label: 'Documentation',
  },
];

export const statuses = [
  {
    value: OrderStatus.PENDING,
    label: 'Pending',
    icon: IconExclamationCircle,
  },
  // {
  //   value: 'todo',
  //   label: 'Todo',
  //   icon: IconCircle,
  // },
  {
    value: OrderStatus.IN_PROGRESS,
    label: 'IN PROGRESS',
    icon: IconStopwatch,
  },
  {
    value: OrderStatus.COMPLETED,
    label: 'COMPLETED',
    icon: IconCircleCheck,
  },
  {
    value: OrderStatus.CANCELED,
    label: 'CANCELED',
    icon: IconCircleX,
  },
];

export const priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: IconArrowDown,
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: IconArrowRight,
  },
  {
    label: 'High',
    value: 'high',
    icon: IconArrowUp,
  },
];
