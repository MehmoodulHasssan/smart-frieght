import {
  IconCash,
  IconShield,
  IconUsersGroup,
  IconUserShield,
} from '@tabler/icons-react';
import { UserStatus } from './schema';
import DriverIcon from '@/components/svgs/DriverIcon';

export const callTypes = new Map<UserStatus, string>([
  ['active', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['inactive', 'bg-neutral-300/40 border-neutral-300'],
  // ['invited', 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300'],
  [
    'suspended',
    'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10',
  ],
]);

export const userTypes = [
  {
    label: 'Admin',
    value: 'admin',
    icon: IconShield,
  },
  {
    label: 'Consignor',
    value: 'consignor',
    icon: IconUserShield,
  },
  {
    label: 'Driver',
    value: 'driver',
    icon: DriverIcon,
  },
  // {
  //   label: 'Cashier',
  //   value: 'cashier',
  //   icon: IconCash,
  // },
] as const;
