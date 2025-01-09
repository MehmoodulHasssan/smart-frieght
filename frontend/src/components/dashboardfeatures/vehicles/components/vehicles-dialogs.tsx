import { useVehicles } from '../context/vehicles-context';
import { VehiclesActionDialog } from './vehicles-action-dialog';
import { VehiclesDeleteDialog } from './vehicles-delete';
import { UsersInviteDialog } from './users-invite-dialog';

export function UsersDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useVehicles();
  return (
    <>
      <VehiclesActionDialog
        key="user-add"
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      <UsersInviteDialog
        key="user-invite"
        open={open === 'invite'}
        onOpenChange={() => setOpen('invite')}
      />

      {currentRow && (
        <>
          <VehiclesActionDialog
            key={`vehicle-edit-${currentRow._id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit');
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
            }}
            currentRow={currentRow}
          />

          <VehiclesDeleteDialog
            key={`vehicle-delete-${currentRow._id}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete');
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  );
}
