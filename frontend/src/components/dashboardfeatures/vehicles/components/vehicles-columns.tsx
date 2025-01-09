import { ColumnDef } from '@tanstack/react-table';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import LongText from '@/components/long-text';
import { callTypes } from '../data/data';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { IVehicleRes } from '@/utils/queries';

export const columns: ColumnDef<IVehicleRes['data'][number]>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    meta: {
      className: cn(
        'sticky md:table-cell left-0 z-10 rounded-tl',
        'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted'
      ),
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'vehicle_model',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Model" />
    ),
    cell: ({ row }) => {
      // console.log(row.getAllCells());
      // console.log(row.getValue('vehicle_model'));
      return (
        <LongText className="max-w-36">
          {row.getValue('vehicle_model')}
        </LongText>
      );
    },
    meta: {
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none',
        'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
        'sticky left-6 md:table-cell'
      ),
    },
    enableHiding: false,
  },
  {
    accessorKey: 'licence_plate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="License Plate" />
    ),
    cell: ({ row }) => (
      <div className="w-fit text-nowrap">{row.getValue('licence_plate')}</div>
    ),
  },
  {
    accessorKey: 'avg_fuel_consumption',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fuel Consumption" />
    ),
    cell: ({ row }) => (
      <div className="w-fit text-nowrap">
        {row.getValue('avg_fuel_consumption') + ' km/L'}
      </div>
    ),
  },
  {
    accessorKey: 'capacity',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Capacity (kg)" />
    ),
    cell: ({ row }) => <div>{row.getValue('capacity')}</div>,
    enableSorting: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const { status } = row.original;
      const badgeColor = callTypes.get(status);
      return (
        <div className="flex space-x-2">
          <Badge variant="outline" className={cn('capitalize', badgeColor)}>
            {row.getValue('status')}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableHiding: false,
    enableSorting: false,
  },
  // {
  //   accessorKey: 'role',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Role" />
  //   ),
  //   cell: ({ row }) => {
  //     const { role } = row.original;
  //     const userType = userTypes.find(({ value }) => value === role);

  //     if (!userType) {
  //       return null;
  //     }

  //     return (
  //       <div className="flex gap-x-2 items-center">
  //         {userType.icon && (
  //           <userType.icon size={16} className="text-muted-foreground" />
  //         )}
  //         <span className="capitalize text-sm">{row.getValue('role')}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
];
