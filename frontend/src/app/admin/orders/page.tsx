'use client';
import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { Search } from '@/components/search';
import { ThemeSwitch } from '@/components/theme-switch';
import { columns } from '@/components/dashboardfeatures/orders/components/columns';
import { DataTable } from '@/components/dashboardfeatures/orders/components/data-table';
import { TasksDialogs } from '@/components/dashboardfeatures/orders/components/tasks-dialogs';
import { OrdersPrimaryButtons } from '@/components/dashboardfeatures/orders/components/orders-primary-buttons';
import TasksProvider from '@/components/dashboardfeatures/orders/context/orders-context';
import { tasks } from '@/components/dashboardfeatures/orders/data/tasks';
import { useQuery } from '@tanstack/react-query';
import { getAllOrders } from '@/utils/queries';
import { ApiError } from '@/utils/apiCall';

export default function Orders() {
  const {
    data: ordersData,
    isLoading: ordersLoading,
    error: ordersError,
    isError: isOrdersError,
  } = useQuery({
    queryKey: ['all-orders'],
    queryFn: getAllOrders,
  });
  console.log(ordersData?.data);
  return (
    <TasksProvider>
      <Header fixed>
        <Search />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className="mb-2 flex items-center justify-between space-y-2 flex-wrap gap-x-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Tasks</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <OrdersPrimaryButtons />
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <DataTable
            data={ordersData?.data || []}
            columns={columns}
            isLoading={ordersLoading}
            error={ordersError as unknown as ApiError}
          />
        </div>
      </Main>

      <TasksDialogs />
    </TasksProvider>
  );
}
