'use client';
import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { Search } from '@/components/search';
import { columns } from '@/components/dashboardfeatures/users/components/users-columns';
import { UsersDialogs } from '@/components/dashboardfeatures/users/components/users-dialogs';
import { UsersPrimaryButtons } from '@/components/dashboardfeatures/users/components/users-primary-buttons';
import { UsersTable } from '@/components/dashboardfeatures/users/components/users-table';
import UsersProvider from '@/components/dashboardfeatures/users/context/users-context';
import { userListSchema } from '@/components/dashboardfeatures/users/data/schema';
import { users } from '@/components/dashboardfeatures/users/data/users';
import ThemeToggleBtn from '@/components/ThemeToggleBtn';
import { ThemeSwitch } from '@/components/theme-switch';
import { useAuthContext } from '@/context/authContext';
import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '@/utils/queries';
import Loader from '@/components/Loader';
import { ApiError } from '@/utils/apiCall';

export default function Users() {
  const {
    data: usersData,
    isLoading: usersLoading,
    error: usersError,
    isError: isUsersError,
  } = useQuery({
    queryKey: ['all-users'],
    queryFn: getAllUsers,
  });

  // console.log(usersData?.data?.[0].full_name);

  return (
    <UsersProvider>
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
            <h2 className="text-2xl font-bold tracking-tight">User List</h2>
            <p className="text-muted-foreground">
              Manage your users and their roles here.
            </p>
          </div>
          <UsersPrimaryButtons />
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          {(() => {
            const tablesData = [];
            if (usersData?.data) {
              for (const user of usersData?.data) {
                if (user.driver) {
                  const { driver, ...rest } = user;
                  tablesData.push({
                    licence_no: driver.licence_no,
                    ...rest,
                  });
                } else {
                  tablesData.push(user);
                }
              }
            }
            return (
              <UsersTable
                data={tablesData}
                isLoading={usersLoading}
                error={usersError as ApiError | null}
                columns={columns}
              />
            );
          })()}
          {/* <UsersTable
            data={usersData?.data || []}
            columns={columns}
            isLoading={usersLoading}
            error={usersError as ApiError | null}
          /> */}
          {/* {usersLoading && <Loader />} */}
        </div>
      </Main>

      <UsersDialogs />
    </UsersProvider>
  );
}
