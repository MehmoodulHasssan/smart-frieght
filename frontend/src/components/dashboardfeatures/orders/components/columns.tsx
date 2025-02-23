import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { labels, priorities, statuses } from '../data/data';
// import { Task } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { IOrderRes } from '@/utils/queries';

export const columns: ColumnDef<IOrderRes['data'][number]>[] = [
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
    accessorKey: '_id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order ID" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.original?._id || ''}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'driver',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Driver" />
    ),
    cell: ({ row }) => {
      const isDriver = row.original?.driver;

      return (
        <div className="flex space-x-2">
          {/* {label && <Badge variant='outline'>{}</Badge>} */}
          <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
            {isDriver ? isDriver.full_name : 'unknown'}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'consignor',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Consignor" />
    ),
    cell: ({ row }) => {
      const isConsignor = row.original?.consignor;

      return (
        <div className="flex space-x-2">
          {/* {label && <Badge variant='outline'>{}</Badge>} */}
          <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
            {isConsignor ? isConsignor.full_name : 'unknown'}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'vehicle',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vehicle" />
    ),
    cell: ({ row }) => {
      const isVehicle = row.original?.vehicle;

      return (
        <div className="flex space-x-2">
          {/* {label && <Badge variant='outline'>{}</Badge>} */}
          <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
            {isVehicle ? isVehicle.vehicle_model : 'unknown'}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue('status')
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // {
  //   accessorKey: 'order_details',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Order Details' />
  //   ),
  //   cell: ({ row }) => {
  //     const priority = priorities.find(
  //       (priority) => priority.value === row.getValue('priority')
  //     )

  //     if (!priority) {
  //       return null
  //     }

  //     return (
  //       <div className='flex items-center'>
  //         {priority.icon && (
  //           <priority.icon className='mr-2 h-4 w-4 text-muted-foreground' />
  //         )}
  //         <span>{priority.label}</span>
  //       </div>
  //     )
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  // },
  // {
  //   accessorKey: 'details',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Order Details" />
  //   ),
  //   cell: ({ row }) => {
  //     // const driver = row.original?.driver.full_name || 'unknown';

  //     return (
  //       <div className="flex space-x-2">
  //         {/* {label && <Badge variant='outline'>{}</Badge>} */}
  //         <span className="max-w-32 url truncate font-medium sm:max-w-72 md:max-w-[31rem] underline hover:text-blue-400 hover:cursor-pointer">
  //           View Details
  //         </span>
  //       </div>
  //     );
  //   },
  // },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
