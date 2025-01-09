'use client';
import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { Search } from '@/components/search';
import { UsersDialogs } from '@/components/dashboardfeatures/users/components/users-dialogs';
import { VehiclesPrimaryButtons } from '@/components/dashboardfeatures/vehicles/components/vehicles-primary-buttons';
import { ThemeSwitch } from '@/components/theme-switch';
import { useQuery } from '@tanstack/react-query';
import { getAllVehicles } from '@/utils/queries';
import { VehiclesTable } from '@/components/dashboardfeatures/vehicles/components/vehicles-table';
import { columns } from '@/components/dashboardfeatures/vehicles/components/vehicles-columns';
import { ApiError } from '@/utils/apiCall';
import VehiclesProvider from '@/components/dashboardfeatures/vehicles/context/vehicles-context';

export default function Users() {
  const {
    data: vehiclesData,
    isLoading: vehiclesLoading,
    error: vehiclesError,
    isError: isVehiclesError,
  } = useQuery({
    queryKey: ['all-vehicles'],
    queryFn: getAllVehicles,
  });

  // console.log(vehiclesData);
  return (
    <VehiclesProvider>
      <Header fixed>
        <Search />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className="mb-2 flex items-center justify-between space-y-2 flex-wrap">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Vehicles List</h2>
            <p className="text-muted-foreground">
              Manage vehicles and their details here.
            </p>
          </div>
          <VehiclesPrimaryButtons />
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <VehiclesTable
            data={vehiclesData?.data || []}
            columns={columns}
            isLoading={vehiclesLoading}
            error={vehiclesError as ApiError | null}
          />
        </div>
      </Main>

      <UsersDialogs />
    </VehiclesProvider>
  );
}
